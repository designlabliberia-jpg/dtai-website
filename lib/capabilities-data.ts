export interface Capability {
  slug: string;
  title: string;
  summary: string;
  methodology: string[];
  proofPoints: string[];
  codeLang: string;
  codeFilename: string;
  codeSnippet: string;
}

export const capabilities: Capability[] = [
  {
    slug: "software-engineering",
    title: "Custom Software Development",
    summary:
      "Production-grade custom software, web applications, and enterprise systems built on disciplined engineering practice, designed to be maintained for years, not months.",
    methodology: [
      "Architecture review before implementation begins",
      "Typed, tested codebases with enforced review gates",
      "Documented handover for long-term maintainability",
    ],
    proofPoints: [
      "Standardized development workflows applied across every engagement",
      "Ongoing software maintenance and technical support included, not an afterthought",
    ],
    codeLang: "typescript",
    codeFilename: "deployment.service.ts",
    codeSnippet: `export async function deployRelease(release: Release): Promise<DeployResult> {
  await runTestSuite(release);
  await requireCodeReview(release, { minApprovals: 2 });
  const build = await buildArtifact(release);
  return deployToEnvironment(build, "production");
}`,
  },
  {
    slug: "mobile-application-development",
    title: "Mobile Application Development",
    summary:
      "Native and cross-platform mobile applications for Android and iOS, built for real-world conditions — including low-connectivity environments.",
    methodology: [
      "Platform strategy decided against real user device and network conditions",
      "Offline-capable design where connectivity can't be assumed",
      "Release and update process built in from day one",
    ],
    proofPoints: [
      "Android and iOS delivery under a single engineering standard",
      "Field-tested design for African connectivity realities",
    ],
    codeLang: "kotlin",
    codeFilename: "SyncManager.kt",
    codeSnippet: `class SyncManager(private val localDb: AppDatabase) {
    suspend fun sync() {
        if (!NetworkState.isOnline()) {
            return queueForOfflineSync()
        }
        val pending = localDb.pendingRecordsDao().getAll()
        pending.forEach { record -> api.upload(record) }
    }
}`,
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    summary:
      "Web platforms and applications — from public-facing institutional websites to complex internal systems — engineered for performance and reliability.",
    methodology: [
      "Modern web architecture matched to actual traffic and usage patterns",
      "Accessibility and performance treated as requirements, not extras",
      "Deployed through the same reviewed pipeline as every DTAI system",
    ],
    proofPoints: [
      "Same engineering discipline applied to web platforms as backend systems",
      "Built for institutional-grade uptime, not campaign-site lifespans",
    ],
    codeLang: "tsx",
    codeFilename: "DashboardPanel.tsx",
    codeSnippet: `export function DashboardPanel({ metrics }: { metrics: Metric[] }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics().then(() => setLoading(false));
  }, []);

  return loading ? <Skeleton /> : <MetricsGrid data={metrics} />;
}`,
  },
  {
    slug: "enterprise-systems-development",
    title: "Enterprise Systems Development",
    summary:
      "Enterprise information systems that coordinate operations across departments, locations, and teams.",
    methodology: [
      "Requirements mapped across every affected department before design",
      "Integration-first architecture to fit existing organizational systems",
      "Phased rollout to reduce operational disruption",
    ],
    proofPoints: [
      "Designed for multi-department, multi-location scale from the outset",
      "Built to integrate with, not replace, existing institutional systems",
    ],
    codeLang: "sql",
    codeFilename: "inventory_sync.sql",
    codeSnippet: `CREATE TRIGGER sync_inventory_across_branches
AFTER UPDATE ON warehouse_stock
FOR EACH ROW
BEGIN
  UPDATE branch_inventory
  SET quantity = NEW.quantity, updated_at = NOW()
  WHERE sku = NEW.sku AND branch_id = NEW.branch_id;
END;`,
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Computing Solutions",
    summary:
      "Scalable cloud architecture matched to sovereignty, compliance, and cost requirements.",
    methodology: [
      "Environment architecture matched to data sovereignty needs",
      "Cost and scalability modeling before deployment",
      "Automated infrastructure provisioning where appropriate",
    ],
    proofPoints: [
      "Architecture decisions documented against compliance requirements",
      "Environments separated and access-controlled by design",
    ],
    codeLang: "yaml",
    codeFilename: "infrastructure.tf",
    codeSnippet: `resource "aws_instance" "app_server" {
  ami           = var.approved_ami
  instance_type = "t3.medium"
  subnet_id     = var.private_subnet_id

  tags = {
    Environment = "production"
    ManagedBy   = "dtai-infra"
  }
}`,
  },
  {
    slug: "artificial-intelligence-solutions",
    title: "Artificial Intelligence Solutions",
    summary:
      "Applied AI capabilities — from intelligent assistants to automated data processing — built to solve specific institutional problems, not AI for its own sake.",
    methodology: [
      "Problem defined and validated before any model is selected",
      "Grounded in real institutional data, not open-ended generation",
      "Human oversight built into any AI-assisted decision workflow",
    ],
    proofPoints: [
      "AI systems scoped to verifiable, bounded tasks",
      "No AI deployment without a clear accountability path",
    ],
    codeLang: "python",
    codeFilename: "document_classifier.py",
    codeSnippet: `def classify_document(text: str, categories: list[str]) -> str:
    embedding = model.encode(text)
    scores = [similarity(embedding, cat_embeddings[c]) for c in categories]
    best = categories[scores.index(max(scores))]
    return best if max(scores) > CONFIDENCE_THRESHOLD else "needs_review"`,
  },
  {
    slug: "data-platforms",
    title: "Data Analytics & Business Intelligence",
    summary:
      "Structured, governed data platforms — including database design and administration — that turn institutional data into decisions leadership can act on.",
    methodology: [
      "Database design and governance defined alongside data architecture",
      "Clear data lineage and access controls",
      "Dashboards and reporting built around real decision-making needs",
    ],
    proofPoints: [
      "Governed data models and administered databases, not ad hoc spreadsheets",
      "Access and audit controls built into the platform layer",
    ],
    codeLang: "sql",
    codeFilename: "quarterly_report.sql",
    codeSnippet: `SELECT region, SUM(revenue) AS total_revenue,
       COUNT(DISTINCT client_id) AS active_clients
FROM transactions
WHERE quarter = CURRENT_QUARTER
GROUP BY region
ORDER BY total_revenue DESC;`,
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity Services",
    summary:
      "Security engineered in from architecture, not layered on after deployment.",
    methodology: [
      "Threat modeling at the design stage",
      "Dependency and vulnerability scanning in every pipeline",
      "Least-privilege access across all environments",
    ],
    proofPoints: [
      "Security requirements defined before implementation, not after",
      "Verified at every deployment gate, not only at launch",
    ],
    codeLang: "nginx",
    codeFilename: "security-headers.conf",
    codeSnippet: `add_header Strict-Transport-Security "max-age=63072000" always;
add_header X-Frame-Options "DENY" always;
add_header Content-Security-Policy "default-src 'self'" always;
limit_req zone=api_limit burst=20 nodelay;`,
  },
  {
    slug: "digital-infrastructure",
    title: "ICT Infrastructure Design",
    summary:
      "Resilient ICT infrastructure foundations, systems integration, and network design engineered for national-scale reliability and long-term operation.",
    methodology: [
      "Redundancy planning built into infrastructure design",
      "Environment separation across development, staging, and production",
      "Monitoring and alerting from day one of deployment",
    ],
    proofPoints: [
      "Infrastructure designed against defined uptime targets",
      "Documented disaster recovery and failover procedures",
    ],
    codeLang: "yaml",
    codeFilename: "docker-compose.yml",
    codeSnippet: `services:
  api:
    image: dtai/api:latest
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      retries: 3`,
  },
  {
    slug: "it-consulting-systems-integration",
    title: "IT Consulting & Systems Integration",
    summary:
      "Independent technical advisory and systems integration for institutions navigating technology decisions and connecting existing systems together.",
    methodology: [
      "Current-state technical assessment before any recommendation",
      "Vendor-neutral advisory, not tied to selling a specific product",
      "Integration architecture designed around what already exists",
    ],
    proofPoints: [
      "Advisory grounded in engineering assessment, not sales targets",
      "Integration work scoped to minimize disruption to running systems",
    ],
    codeLang: "bash",
    codeFilename: "integration_audit.sh",
    codeSnippet: `#!/bin/bash
for system in "\${LEGACY_SYSTEMS[@]}"; do
  echo "Auditing \$system..."
  check_api_compatibility "\$system"
  check_data_format "\$system"
done
generate_integration_report`,
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation Advisory",
    summary:
      "Structured modernization of institutional systems and workflows, from manual process to digital operation.",
    methodology: [
      "Current-state process mapping before any system is built",
      "Phased migration planning to reduce operational risk",
      "Change management built into the delivery timeline",
    ],
    proofPoints: [
      "Manual-to-digital workflow transitions documented step by step",
      "Migration phased to avoid service disruption",
    ],
    codeLang: "json",
    codeFilename: "migration_plan.json",
    codeSnippet: `{
  "phase": 1,
  "process": "manual_permit_intake",
  "target": "digital_workflow",
  "rollback_enabled": true,
  "parallel_run_days": 30
}`,
  },
  {
    slug: "gis-spatial-technology",
    title: "GIS & Spatial Technology",
    summary:
      "Geographic and spatial systems that turn location data into institutional decisions.",
    methodology: [
      "Spatial data modeling matched to decision-support needs",
      "Layered map architecture for infrastructure and demographic data",
      "Analysis tools built around real operational workflows",
    ],
    proofPoints: [
      "Map layers built from verified infrastructure and spatial datasets",
      "Decision-support tooling, not static map displays",
    ],
    codeLang: "sql",
    codeFilename: "spatial_query.sql",
    codeSnippet: `SELECT county_name, population
FROM counties
WHERE ST_DWithin(
  geom,
  ST_MakePoint(-10.7969, 6.3156)::geography,
  50000
);`,
  },
];

export function getCapabilityBySlug(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}
