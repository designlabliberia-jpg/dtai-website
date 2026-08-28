import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PartnersTable } from "./PartnersTable";

export default async function PartnersPage() {
  const partners = await db.partner.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }],
    select: { id: true, title: true, type: true, slug: true, order: true, logoUrl: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Partners"
        description="Manage partner logos and category partner profiles."
        action={
          <Link
            href="/admin/partners/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            <Plus size={13} />
            New Partner
          </Link>
        }
      />
      <Panel accent padding="none">
        <PartnersTable partners={partners} />
      </Panel>
    </div>
  );
}
