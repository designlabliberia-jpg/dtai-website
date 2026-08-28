export interface SolutionSnippet {
  path: string;
  language: string;
  code: string;
}

export interface Solution {
  slug: string;
  title: string;
  summary: string;
  snippet?: SolutionSnippet;
}

export const solutions: Solution[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    summary: "Production-grade software built to institutional requirements, designed for years of operation.",
    snippet: {
      path: "deployment.service.ts",
      language: "typescript",
      code: `export async function deployRelease(release: Release): Promise<DeployResult> {
  await runTestSuite(release);
  await requireCodeReview(release, { minApprovals: 2 });
  const build = await buildArtifact(release);
  return deployToEnvironment(build, "production");
}`,
    },
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    summary: "Native and cross-platform mobile apps for Android and iOS, built for real-world field conditions.",
    snippet: {
      path: "SyncManager.kt",
      language: "kotlin",
      code: `class SyncManager(private val localDb: AppDatabase) {
    suspend fun sync() {
        if (!NetworkState.isOnline()) return queueForOfflineSync()
        val pending = localDb.pendingRecordsDao().getAll()
        pending.forEach { record -> api.upload(record) }
    }
}`,
    },
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    summary: "Applied AI services built to solve specific institutional problems with human oversight.",
    snippet: {
      path: "document_classifier.py",
      language: "python",
      code: `def classify_document(text: str, categories: list[str]) -> str:
    embedding = model.encode(text)
    scores = [similarity(embedding, cat_embeddings[c]) for c in categories]
    best = categories[scores.index(max(scores))]
    return best if max(scores) > CONFIDENCE_THRESHOLD else "needs_review"`,
    },
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing",
    summary: "Scalable cloud architecture matched to sovereignty, compliance, and cost requirements.",
    snippet: {
      path: "infrastructure.tf",
      language: "yaml",
      code: `resource "aws_instance" "app_server" {
  ami           = var.approved_ami
  instance_type = "t3.medium"
  subnet_id     = var.private_subnet_id
  tags = {
    Environment = "production"
    ManagedBy   = "dtai-infra"
  }
}`,
    },
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    summary: "Security engineered in from architecture, not layered on after deployment.",
    snippet: {
      path: "security-headers.conf",
      language: "nginx",
      code: `add_header Strict-Transport-Security "max-age=63072000" always;
add_header X-Frame-Options "DENY" always;
add_header Content-Security-Policy "default-src 'self'" always;
limit_req zone=api_limit burst=20 nodelay;`,
    },
  },
  {
    slug: "gis-spatial-information-systems",
    title: "GIS & Spatial Information Systems",
    summary: "Geographic and spatial systems that turn location data into institutional decisions.",
    snippet: {
      path: "spatial_query.sql",
      language: "sql",
      code: `SELECT county_name, population
FROM counties
WHERE ST_DWithin(
  geom,
  ST_MakePoint(-10.7969, 6.3156)::geography,
  50000
);`,
    },
  },
  {
    slug: "election-technology",
    title: "Election Technology",
    summary: "End-to-end technical workflows covering the full election data lifecycle.",
    snippet: {
      path: "verifyTally.ts",
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
    slug: "hospital-information-systems",
    title: "Hospital Information Systems",
    summary: "Integrated health information platforms for clinical and administrative operations.",
    snippet: {
      path: "patient_record.sql",
      language: "sql",
      code: `SELECT p.patient_id, p.name, v.visit_date, v.diagnosis, v.prescribed_by
FROM patients p
JOIN visits v ON v.patient_id = p.patient_id
WHERE v.facility_id = :facility_id
  AND v.visit_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY v.visit_date DESC;`,
    },
  },
  {
    slug: "enterprise-resource-planning",
    title: "Enterprise Resource Planning (ERP)",
    summary: "Enterprise information systems that coordinate operations across departments, locations, and teams.",
    snippet: {
      path: "inventory_sync.sql",
      language: "sql",
      code: `CREATE TRIGGER sync_inventory_across_branches
AFTER UPDATE ON warehouse_stock FOR EACH ROW
BEGIN
  UPDATE branch_inventory
  SET quantity = NEW.quantity, updated_at = NOW()
  WHERE sku = NEW.sku AND branch_id = NEW.branch_id;
END;`,
    },
  },
  {
    slug: "environmental-information-management",
    title: "Environmental Information Management Systems",
    summary: "Centralized platforms for collecting, managing, and reporting environmental data.",
  },
  {
    slug: "environmental-impact-assessment",
    title: "Environmental Impact Assessment",
    summary: "Digital data collection and analysis tools for environmental impact assessments.",
  },
  {
    slug: "gis-mapping-environment",
    title: "GIS Mapping for Environment",
    summary: "Spatial mapping for forests, mining, agriculture, and protected areas.",
  },
  {
    slug: "air-water-soil-monitoring",
    title: "Air, Water, and Soil Quality Monitoring",
    summary: "Real-time monitoring systems for air, water, and soil quality parameters.",
  },
  {
    slug: "climate-change-data-analytics",
    title: "Climate Change Data Analytics",
    summary: "Analytics platforms that turn climate datasets into actionable institutional intelligence.",
  },
  {
    slug: "carbon-footprint-calculators",
    title: "Carbon Footprint Calculators",
    summary: "Tools that quantify organizational carbon emissions against recognized accounting frameworks.",
  },
  {
    slug: "esg-reporting-software",
    title: "ESG Reporting Software",
    summary: "Platforms that structure and automate Environmental, Social & Governance reporting.",
  },
  {
    slug: "waste-management-systems",
    title: "Waste Management Information Systems",
    summary: "Digital platforms for tracking, routing, and reporting waste collection and disposal.",
  },
  {
    slug: "smart-recycling",
    title: "Smart Recycling Solutions",
    summary: "IoT-enabled recycling infrastructure with real-time fill monitoring and collection optimization.",
  },
  {
    slug: "renewable-energy-monitoring",
    title: "Renewable Energy Monitoring Platforms",
    summary: "Real-time monitoring and performance analytics for renewable energy installations.",
  },
  {
    slug: "smart-agriculture",
    title: "Smart Agriculture Solutions",
    summary: "Precision agriculture platforms that use sensor data and analytics to improve crop outcomes.",
  },
  {
    slug: "disaster-risk-mapping",
    title: "Disaster Risk Mapping and Early Warning Systems",
    summary: "Spatial risk mapping and automated early warning platforms for natural hazards.",
  },
  {
    slug: "environmental-compliance",
    title: "Environmental Compliance",
    summary: "Advisory and technical services to help organizations meet environmental regulatory requirements.",
  },
  {
    slug: "environmental-audits",
    title: "Environmental Audits",
    summary: "Independent environmental audits against regulatory and voluntary standards.",
  },
  {
    slug: "sustainability-strategies",
    title: "Sustainability Strategies",
    summary: "Institutional sustainability strategies grounded in data and aligned to recognized frameworks.",
  },
  {
    slug: "biodiversity-mapping",
    title: "Biodiversity Mapping",
    summary: "Spatial mapping and assessment of biodiversity assets for conservation and compliance.",
  },
  {
    slug: "water-resource-management",
    title: "Water Resource Management",
    summary: "Technical advisory and data systems for sustainable water resource management.",
  },
  {
    slug: "pollution-monitoring",
    title: "Pollution Monitoring",
    summary: "Monitoring systems and advisory services for air, water, and soil pollution.",
  },
  {
    slug: "environmental-database-development",
    title: "Environmental Database Development",
    summary: "Governed environmental data platforms for institutional data management and reporting.",
  },
  {
    slug: "smart-waste-collection",
    title: "Smart Waste Collection",
    summary: "IoT-enabled waste collection systems with real-time monitoring and route optimization.",
  },
  {
    slug: "smart-street-lighting",
    title: "Smart Street Lighting",
    summary: "Adaptive street lighting systems that reduce energy consumption through real-time control.",
  },
  {
    slug: "smart-water-management",
    title: "Smart Water Management",
    summary: "Real-time water network monitoring and management platforms for utilities and municipalities.",
  },
  {
    slug: "flood-monitoring-systems",
    title: "Flood Monitoring Systems",
    summary: "Real-time flood monitoring networks with automated early warning and response integration.",
  },
  {
    slug: "traffic-monitoring",
    title: "Traffic Monitoring",
    summary: "Real-time traffic monitoring and analytics platforms for urban traffic management.",
  },
  {
    slug: "environmental-sensors-iot",
    title: "Environmental Sensors (IoT)",
    summary: "IoT sensor networks for environmental monitoring across urban and rural deployments.",
  },
  {
    slug: "flood-prediction-systems",
    title: "Flood Prediction Systems",
    summary: "Predictive flood modeling platforms that provide advance warning of flood events.",
  },
  {
    slug: "wildfire-monitoring",
    title: "Wildfire Monitoring",
    summary: "Satellite and sensor-based wildfire detection and monitoring platforms.",
  },
  {
    slug: "coastal-erosion-mapping",
    title: "Coastal Erosion Mapping",
    summary: "Spatial monitoring and analysis of coastal erosion for planning and risk management.",
  },
  {
    slug: "drought-monitoring",
    title: "Drought Monitoring",
    summary: "Data platforms that monitor drought conditions and support early response.",
  },
  {
    slug: "emergency-response-systems",
    title: "Emergency Response Systems",
    summary: "Digital platforms that coordinate emergency response operations across agencies.",
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}


