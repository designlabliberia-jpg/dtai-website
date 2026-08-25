import {
  Mail,
  Briefcase,
  Users,
  Package,
  Layers,
  FileText,
} from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { KpiTile } from "@/components/admin/KpiTile";
import { BarChart } from "@/components/admin/BarChart";
import { DonutChart } from "@/components/admin/DonutChart";
import { ColumnChart } from "@/components/admin/ColumnChart";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import type { ActivityItem } from "@/components/admin/ActivityFeed";
import { ContentHealthBar } from "@/components/admin/ContentHealthBar";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function dayLabel(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2);
}

function startOf(daysAgo: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOf(daysAgo: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(23, 59, 59, 999);
  return d;
}

function deltaPercent(current: number, prior: number): number {
  if (prior === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - prior) / prior) * 100);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminDashboard() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo  = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // ── KPI counts ──────────────────────────────────────────────────────────────
  const [
    newContacts,
    newApplications,
    pipelineLeads,
    activeJobs,
    publishedProducts,
    totalArticles,
    // Prior period for deltas
    priorContacts,
    priorApplications,
    priorLeads,
    // Pipeline stage counts
    pipelineStages,
    // Application status counts
    appStatuses,
    // Content totals
    totalProducts,
    totalServices,
    publishedServices,
    totalSolutions,
    publishedSolutions,
    // Top jobs by application count
    topJobs,
    // Recent contacts (last 10)
    recentContacts,
    // Recent applications (last 10)
    recentApplications,
    // Recent pipeline (last 5)
    recentPipeline,
  ] = await Promise.all([
    db.contactSubmission.count({ where: { status: "new", deletedAt: null } }),
    db.jobApplication.count({ where: { status: "new", deletedAt: null } }),
    db.client.count({ where: { status: "lead", deletedAt: null } }),
    db.jobListing.count({ where: { active: true, deletedAt: null } }),
    db.product.count({ where: { published: true, deletedAt: null } }),
    db.article.count({ where: { published: true, deletedAt: null } }),
    // Deltas
    db.contactSubmission.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }, deletedAt: null } }),
    db.jobApplication.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }, deletedAt: null } }),
    db.client.count({ where: { status: "lead", createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }, deletedAt: null } }),
    // Pipeline funnel
    db.client.groupBy({ by: ["status"], where: { deletedAt: null }, _count: { id: true } }),
    // App statuses
    db.jobApplication.groupBy({ by: ["status"], where: { deletedAt: null }, _count: { id: true } }),
    // Content health
    db.product.count({ where: { deletedAt: null } }),
    db.service.count({ where: { deletedAt: null } }),
    db.service.count({ where: { published: true, deletedAt: null } }),
    db.solution.count({ where: { deletedAt: null } }),
    db.solution.count({ where: { published: true, deletedAt: null } }),
    // Top jobs
    db.jobListing.findMany({
      where: { active: true, deletedAt: null },
      include: { _count: { select: { applications: true } } },
      orderBy: { applications: { _count: "desc" } },
      take: 5,
    }),
    // Recent contacts
    db.contactSubmission.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, subject: true, createdAt: true },
    }),
    // Recent applications
    db.jobApplication.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, fullName: true, createdAt: true, jobListing: { select: { title: true } } },
    }),
    // Recent pipeline
    db.client.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 2,
      select: { id: true, companyName: true, status: true, createdAt: true },
    }),
  ]);

  // ── 7-day daily trends ───────────────────────────────────────────────────────
  const days = [6, 5, 4, 3, 2, 1, 0];

  const [contactTrend, appTrend] = await Promise.all([
    Promise.all(
      days.map((d) =>
        db.contactSubmission.count({
          where: { createdAt: { gte: startOf(d), lte: endOf(d) }, deletedAt: null },
        })
      )
    ),
    Promise.all(
      days.map((d) =>
        db.jobApplication.count({
          where: { createdAt: { gte: startOf(d), lte: endOf(d) }, deletedAt: null },
        })
      )
    ),
  ]);

  const contactChartData = days.map((d, i) => ({ label: dayLabel(d), value: contactTrend[i] }));
  const appChartData     = days.map((d, i) => ({ label: dayLabel(d), value: appTrend[i] }));

  // ── Pipeline funnel data ─────────────────────────────────────────────────────
  const PIPELINE_ORDER = ["lead", "proposal_sent", "negotiating", "won", "lost"] as const;
  const PIPELINE_LABELS: Record<string, string> = {
    lead: "Lead", proposal_sent: "Proposal", negotiating: "Negotiating", won: "Won", lost: "Lost",
  };
  const PIPELINE_COLORS: Record<string, string> = {
    lead: "var(--admin-brand)",
    proposal_sent: "var(--admin-accent)",
    negotiating: "var(--chart-4)",
    won: "var(--admin-success)",
    lost: "var(--chart-muted)",
  };
  const stageMap = Object.fromEntries(pipelineStages.map((s) => [s.status, s._count.id]));
  const pipelineData = PIPELINE_ORDER.map((s) => ({
    label: PIPELINE_LABELS[s],
    value: stageMap[s] ?? 0,
    color: PIPELINE_COLORS[s],
  }));

  // ── Application donut data ───────────────────────────────────────────────────
  const APP_COLORS: Record<string, string> = {
    new: "var(--admin-brand)",
    reviewing: "var(--admin-accent)",
    interviewed: "var(--chart-4)",
    hired: "var(--admin-success)",
    rejected: "var(--chart-muted)",
  };
  const APP_LABELS: Record<string, string> = {
    new: "New", reviewing: "Reviewing", interviewed: "Interviewed",
    hired: "Hired", rejected: "Rejected",
  };
  const statusMap = Object.fromEntries(appStatuses.map((s) => [s.status, s._count.id]));
  const donutData = Object.entries(APP_LABELS)
    .map(([key, label]) => ({ label, value: statusMap[key] ?? 0, color: APP_COLORS[key] }))
    .filter((d) => d.value > 0);

  // ── Activity feed ────────────────────────────────────────────────────────────
  const activity: ActivityItem[] = [
    ...recentContacts.map((c) => ({
      id: `c-${c.id}`,
      type: "contact" as const,
      description: `${c.name} submitted a contact — "${c.subject}"`,
      createdAt: c.createdAt,
    })),
    ...recentApplications.map((a) => ({
      id: `a-${a.id}`,
      type: "application" as const,
      description: `${a.fullName} applied for ${a.jobListing.title}`,
      createdAt: a.createdAt,
    })),
    ...recentPipeline.map((p) => ({
      id: `p-${p.id}`,
      type: "pipeline" as const,
      description: `${p.companyName} added as ${p.status.replace("_", " ")}`,
      createdAt: p.createdAt,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10);

  // ── Spark data (7-day) ───────────────────────────────────────────────────────
  const contactSpark = contactTrend;
  const appSpark     = appTrend;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Command Center"
        description="Live operational intelligence across all platform systems."
      />

      {/* ── Zone A: KPI Strip ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <KpiTile
          label="New Contacts"
          value={newContacts}
          icon={Mail}
          delta={deltaPercent(newContacts, priorContacts)}
          spark={contactSpark}
        />
        <KpiTile
          label="New Applications"
          value={newApplications}
          icon={Briefcase}
          delta={deltaPercent(newApplications, priorApplications)}
          spark={appSpark}
        />
        <KpiTile
          label="Pipeline Leads"
          value={pipelineLeads}
          icon={Users}
          delta={deltaPercent(pipelineLeads, priorLeads)}
        />
        <KpiTile
          label="Active Jobs"
          value={activeJobs}
          icon={Layers}
        />
        <KpiTile
          label="Published Products"
          value={publishedProducts}
          icon={Package}
        />
        <KpiTile
          label="Live Articles"
          value={totalArticles}
          icon={FileText}
        />
      </div>

      {/* ── Zone B + C: Main grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">

        {/* ── Left column (3/5) ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 xl:col-span-3">

          {/* Pipeline Funnel */}
          <Panel accent title="Client Pipeline — Stage Funnel">
            <BarChart data={pipelineData} showValues showPercent={false} />
          </Panel>

          {/* Application Status + 7-day trend side by side */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Panel accent title="Application Status Breakdown">
              {donutData.length > 0 ? (
                <DonutChart data={donutData} size={110} thickness={16} />
              ) : (
                <p
                  className="py-4 text-center font-technical text-[10px] uppercase tracking-widest"
                  style={{ color: "var(--admin-text-muted)" }}
                >
                  No applications yet
                </p>
              )}
            </Panel>

            <Panel accent title="Applications — 7-Day Trend">
              <ColumnChart data={appChartData} height={90} color="var(--chart-4)" />
            </Panel>
          </div>

          {/* Top Jobs by Applications */}
          <Panel accent title="Top Job Listings by Applications">
            {topJobs.length > 0 ? (
              <BarChart
                data={topJobs.map((j) => ({
                  label: j.title.length > 22 ? j.title.slice(0, 22) + "…" : j.title,
                  value: j._count.applications,
                  color: "var(--admin-brand)",
                }))}
                showValues
              />
            ) : (
              <p
                className="py-4 text-center font-technical text-[10px] uppercase tracking-widest"
                style={{ color: "var(--admin-text-muted)" }}
              >
                No active job listings
              </p>
            )}
          </Panel>
        </div>

        {/* ── Right column (2/5) ────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 xl:col-span-2">

          {/* Contact Inbox Trend */}
          <Panel accent title="Contact Submissions — 7-Day Trend">
            <ColumnChart data={contactChartData} height={90} color="var(--admin-brand)" />
          </Panel>

          {/* Content Health */}
          <Panel accent title="Content Health">
            <div className="flex flex-col gap-4">
              <ContentHealthBar label="Products"  published={publishedProducts} total={totalProducts} />
              <ContentHealthBar label="Services"  published={publishedServices} total={totalServices} />
              <ContentHealthBar label="Solutions" published={publishedSolutions} total={totalSolutions} />
              <ContentHealthBar label="Articles"  published={totalArticles}     total={totalArticles} />
            </div>
          </Panel>

          {/* Activity Feed */}
          <Panel accent title="Recent Activity" className="flex-1">
            <ActivityFeed items={activity} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
