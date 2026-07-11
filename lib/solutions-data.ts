export interface SolutionSnippet {
  filename: string;
  language: string;
  code: string;
}

export interface Solution {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  focusAreas: string[];
  proofPoints: string[];
  snippet: SolutionSnippet;
}

export const solutions: Solution[] = [
  {
    slug: "government-technology",
    title: "Government Technology",
    summary:
      "Core digital platforms that government agencies rely on for daily service delivery and public accountability.",
    overview:
      "Government platforms have to work for every citizen who needs them, on the first try, without a support ticket. That means designing for the widest possible range of devices, connectivity, and technical literacy — while still meeting the reliability and auditability standards public institutions are held to.",
    focusAreas: [
      "Citizen-facing service platforms",
      "Internal agency operations systems",
      "Cross-agency data interoperability",
    ],
    proofPoints: [
      "Built to documented reliability and auditability standards",
      "Designed for handover across administrations, not tied to one team",
    ],
    snippet: {
      filename: "auditLog.middleware.ts",
      language: "typescript",
      code: `export async function auditLog(req: Request, res: Response, next: NextFunction) {
  const entry = {
    actor: req.user?.id ?? "anonymous",
    action: req.method + " " + req.path,
    agency: req.headers["x-agency-id"],
    timestamp: new Date().toISOString(),
  };

  await db.auditTrail.insert(entry);
  next();
}`,
    },
  },
  {
    slug: "election-technology",
    title: "Election Technology",
    summary:
      "End-to-end technical workflows covering the full election data lifecycle, from polling station to verified results.",
    overview:
      "Every stage of an election workflow has to be independently verifiable — not just secure, but demonstrably secure to observers, candidates, and the public. That requirement shapes everything from how data is captured at a polling station to how results are aggregated and reported.",
    focusAreas: [
      "Polling station data capture",
      "Observer and monitoring tooling",
      "Secure data transmission and verification",
      "Results aggregation and reporting dashboards",
    ],
    proofPoints: [
      "Workflow designed around independent verification at every stage",
      "Security review required before any election-facing deployment",
    ],
    snippet: {
      filename: "verifyTally.ts",
      language: "typescript",
      code: `export function verifyTally(station: PollingStation) {
  const localSum = station.ballots.reduce((sum, b) => sum + b.count, 0);

  if (localSum !== station.reportedTotal) {
    return { verified: false, reason: "tally_mismatch" };
  }

  const signature = signPayload(station.id, localSum, station.timestamp);
  return { verified: true, signature };
}`,
    },
  },
  {
    slug: "public-sector-platforms",
    title: "Public Sector Platforms",
    summary:
      "Institutional platforms built for public bodies operating under regulatory and compliance scrutiny.",
    overview:
      "Public bodies often inherit compliance requirements from multiple regulatory frameworks at once, and those requirements rarely stay static. Platforms need audit trails and access controls built into the foundation, so compliance is a property of the system rather than a process bolted on afterward.",
    focusAreas: [
      "Regulatory reporting systems",
      "Public records and case management",
      "Institutional workflow digitization",
    ],
    proofPoints: [
      "Compliance requirements mapped before implementation",
      "Access and audit trails built into the platform layer",
    ],
    snippet: {
      filename: "recordAccess.sql",
      language: "sql",
      code: `CREATE TRIGGER log_record_access
AFTER SELECT ON public_records
BEGIN
  INSERT INTO access_log (record_id, accessed_by, accessed_at)
  VALUES (NEW.id, current_user(), NOW());
END;

SELECT record_id, COUNT(*) AS access_count
FROM access_log
WHERE accessed_at > NOW() - INTERVAL '30 days'
GROUP BY record_id;`,
    },
  },
  {
    slug: "enterprise-systems",
    title: "Enterprise Systems",
    summary:
      "Scalable systems for enterprises operating complex, multi-department, or multi-location operations.",
    overview:
      "The hard part of enterprise systems usually isn't the new functionality — it's making that functionality talk cleanly to whatever the organization already runs across departments and locations. Integration-first design prevents new systems from becoming yet another disconnected silo.",
    focusAreas: [
      "Operations and resource management platforms",
      "Enterprise data integration",
      "Internal tooling and workflow automation",
    ],
    proofPoints: [
      "Architected for multi-team, multi-department scale",
      "Integration-first design to fit existing enterprise systems",
    ],
    snippet: {
      filename: "syncInventory.service.ts",
      language: "typescript",
      code: `export async function syncInventory(locationId: string) {
  const [erp, warehouse] = await Promise.all([
    erpClient.getStock(locationId),
    warehouseClient.getStock(locationId),
  ]);

  const drift = reconcile(erp, warehouse);
  if (drift.length > 0) {
    await notifyOpsTeam(locationId, drift);
  }

  return drift;
}`,
    },
  },
  {
    slug: "custom-digital-platforms",
    title: "Custom Digital Platforms",
    summary:
      "Purpose-built platforms for institutions whose requirements don't fit off-the-shelf software.",
    overview:
      "Off-the-shelf software works until an institution's workflow doesn't match the assumptions baked into it — and then every workaround adds friction. Custom platforms start from the institution's actual requirements and data model, not from what a generic product happened to support.",
    focusAreas: [
      "Requirements-driven architecture",
      "Bespoke workflow and data modeling",
      "Long-term maintenance and evolution planning",
    ],
    proofPoints: [
      "Every custom platform begins with a documented requirements and architecture phase",
      "Built for handover and long-term institutional ownership",
    ],
    snippet: {
      filename: "workflow.schema.ts",
      language: "typescript",
      code: `export interface WorkflowStage {
  id: string;
  name: string;
  requiredRole: Role;
  nextStages: string[];
  slaHours?: number;
}

export const intakeWorkflow: WorkflowStage[] = [
  { id: "submitted", name: "Submitted", requiredRole: "applicant", nextStages: ["review"] },
  { id: "review", name: "Under Review", requiredRole: "officer", nextStages: ["approved", "rejected"] },
];`,
    },
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
