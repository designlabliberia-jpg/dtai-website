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
  relatedServices: string[];
  snippet?: SolutionSnippet;
}

export const solutions: Solution[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    summary: "Production-grade software built to institutional requirements, designed for years of operation.",
    overview:
      "Off-the-shelf software works until an institution's workflow doesn't match the assumptions baked into it. Custom software starts from the institution's actual requirements and data model.",
    focusAreas: ["Requirements-driven architecture", "Typed, tested codebases", "Documented handover"],
    proofPoints: ["Architecture review before implementation", "Ongoing maintenance included"],
    relatedServices: ["digital-technology"],
    snippet: {
      filename: "deployment.service.ts",
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
    overview:
      "Mobile applications for institutional use must work in low-connectivity environments and across a wide range of devices.",
    focusAreas: ["Offline-capable design", "Android and iOS delivery", "Field-tested UX"],
    proofPoints: ["Offline sync built in from day one", "Release pipeline managed from the start"],
    relatedServices: ["digital-technology"],
    snippet: {
      filename: "SyncManager.kt",
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
    overview:
      "AI systems scoped to verifiable, bounded tasks — from document classification to predictive analytics — with accountability paths built in.",
    focusAreas: ["Problem-first model selection", "Grounded in real institutional data", "Human oversight workflows"],
    proofPoints: ["No AI deployment without a clear accountability path", "Confidence thresholds enforced"],
    relatedServices: ["digital-technology"],
    snippet: {
      filename: "document_classifier.py",
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
    overview:
      "Cloud environments designed against data sovereignty needs, with cost modeling and automated infrastructure provisioning.",
    focusAreas: ["Sovereignty-aware architecture", "Cost and scalability modeling", "Automated provisioning"],
    proofPoints: ["Architecture decisions documented against compliance requirements", "Environments access-controlled by design"],
    relatedServices: ["digital-technology"],
    snippet: {
      filename: "infrastructure.tf",
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
    overview:
      "Threat modeling at the design stage, dependency scanning in every pipeline, and least-privilege access across all environments.",
    focusAreas: ["Threat modeling", "Vulnerability scanning", "Least-privilege access"],
    proofPoints: ["Security requirements defined before implementation", "Verified at every deployment gate"],
    relatedServices: ["digital-technology"],
    snippet: {
      filename: "security-headers.conf",
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
    overview:
      "Layered map architecture for infrastructure and demographic data, with decision-support tooling built around real operational workflows.",
    focusAreas: ["Spatial data modeling", "Layered map architecture", "Decision-support tooling"],
    proofPoints: ["Map layers built from verified spatial datasets", "Decision-support, not static displays"],
    relatedServices: ["digital-technology", "environmental-technology"],
    snippet: {
      filename: "spatial_query.sql",
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
    overview:
      "Every stage of an election workflow must be independently verifiable — from polling station data capture to results aggregation.",
    focusAreas: ["Polling station data capture", "Secure data transmission", "Results aggregation dashboards"],
    proofPoints: ["Workflow designed around independent verification", "Security review before any election-facing deployment"],
    relatedServices: ["digital-technology"],
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
    slug: "hospital-information-systems",
    title: "Hospital Information Systems",
    summary: "Integrated health information platforms for clinical and administrative operations.",
    overview:
      "Hospital systems that coordinate patient records, clinical workflows, and administrative operations across departments and facilities.",
    focusAreas: ["Patient records management", "Clinical workflow digitization", "Cross-department integration"],
    proofPoints: ["Built to health data privacy and compliance standards", "Designed for multi-facility operation"],
    relatedServices: ["digital-technology"],
    snippet: {
      filename: "patient_record.sql",
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
    overview:
      "ERP platforms designed with integration-first architecture to fit existing organizational systems, with phased rollout to reduce disruption.",
    focusAreas: ["Multi-department requirements mapping", "Integration-first architecture", "Phased rollout"],
    proofPoints: ["Designed for multi-location scale from the outset", "Built to integrate with existing systems"],
    relatedServices: ["digital-technology"],
    snippet: {
      filename: "inventory_sync.sql",
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
    overview:
      "Systems that aggregate field data, sensor feeds, and institutional records into a governed environmental data platform.",
    focusAreas: ["Field data collection", "Sensor integration", "Regulatory reporting"],
    proofPoints: ["Built for low-connectivity field environments", "Reporting aligned to international standards"],
    relatedServices: ["environmental-technology", "environmental-consulting"],
  },
  {
    slug: "environmental-impact-assessment",
    title: "Environmental Impact Assessment",
    summary: "Digital data collection and analysis tools for environmental impact assessments.",
    overview:
      "Mobile and web tools that replace paper-based EIA data collection with structured, auditable digital workflows.",
    focusAreas: ["Digital field data collection", "Structured assessment workflows", "Audit-ready outputs"],
    proofPoints: ["Offline-capable mobile collection tools", "Outputs structured for regulatory submission"],
    relatedServices: ["environmental-technology", "environmental-consulting"],
  },
  {
    slug: "gis-mapping-environment",
    title: "GIS Mapping for Environment",
    summary: "Spatial mapping for forests, mining, agriculture, and protected areas.",
    overview:
      "GIS platforms that map land use, resource extraction, and protected area boundaries for environmental monitoring and compliance.",
    focusAreas: ["Land use mapping", "Protected area monitoring", "Resource extraction tracking"],
    proofPoints: ["Layers built from verified spatial and satellite datasets", "Integrated with environmental compliance workflows"],
    relatedServices: ["environmental-technology", "environmental-consulting"],
  },
  {
    slug: "air-water-soil-monitoring",
    title: "Air, Water, and Soil Quality Monitoring",
    summary: "Real-time monitoring systems for air, water, and soil quality parameters.",
    overview:
      "IoT sensor networks and data platforms that provide continuous environmental quality monitoring with automated alerting.",
    focusAreas: ["Sensor network design", "Real-time data pipelines", "Automated threshold alerting"],
    proofPoints: ["Designed for 24/7 unattended operation", "Data pipelines built for regulatory reporting"],
    relatedServices: ["environmental-technology", "environmental-consulting", "smart-city-infrastructure"],
  },
  {
    slug: "climate-change-data-analytics",
    title: "Climate Change Data Analytics",
    summary: "Analytics platforms that turn climate datasets into actionable institutional intelligence.",
    overview:
      "Data platforms that aggregate historical and real-time climate data, with analysis tools built around institutional decision-making needs.",
    focusAreas: ["Historical climate data analysis", "Trend modeling", "Decision-support dashboards"],
    proofPoints: ["Analysis grounded in verified climate datasets", "Dashboards built around real decision cycles"],
    relatedServices: ["environmental-technology", "climate-disaster-management"],
  },
  {
    slug: "carbon-footprint-calculators",
    title: "Carbon Footprint Calculators",
    summary: "Tools that quantify organizational carbon emissions against recognized accounting frameworks.",
    overview:
      "Carbon accounting platforms aligned to GHG Protocol and other recognized standards, with reporting outputs for ESG disclosure.",
    focusAreas: ["Emissions data collection", "GHG Protocol alignment", "ESG reporting outputs"],
    proofPoints: ["Methodology documented against recognized standards", "Outputs structured for disclosure requirements"],
    relatedServices: ["environmental-technology", "environmental-consulting"],
  },
  {
    slug: "esg-reporting-software",
    title: "ESG Reporting Software",
    summary: "Platforms that structure and automate Environmental, Social & Governance reporting.",
    overview:
      "ESG data management systems that aggregate metrics across the organization and produce structured reports aligned to disclosure frameworks.",
    focusAreas: ["ESG data aggregation", "Framework alignment", "Automated report generation"],
    proofPoints: ["Aligned to GRI, SASB, and TCFD frameworks", "Audit trail built into the reporting layer"],
    relatedServices: ["environmental-technology", "environmental-consulting"],
  },
  {
    slug: "waste-management-systems",
    title: "Waste Management Information Systems",
    summary: "Digital platforms for tracking, routing, and reporting waste collection and disposal.",
    overview:
      "Waste management systems that digitize collection workflows, track disposal chains, and provide compliance reporting.",
    focusAreas: ["Collection route optimization", "Disposal chain tracking", "Compliance reporting"],
    proofPoints: ["Real-time fleet and collection tracking", "Reporting aligned to waste regulation requirements"],
    relatedServices: ["environmental-technology", "smart-city-infrastructure"],
  },
  {
    slug: "smart-recycling",
    title: "Smart Recycling Solutions",
    summary: "IoT-enabled recycling infrastructure with real-time fill monitoring and collection optimization.",
    overview:
      "Smart bin networks and collection optimization platforms that reduce operational costs and improve recycling rates.",
    focusAreas: ["Smart bin sensor networks", "Collection optimization", "Recycling rate analytics"],
    proofPoints: ["Sensor networks designed for low-maintenance operation", "Collection routes optimized from real fill data"],
    relatedServices: ["environmental-technology", "smart-city-infrastructure"],
  },
  {
    slug: "renewable-energy-monitoring",
    title: "Renewable Energy Monitoring Platforms",
    summary: "Real-time monitoring and performance analytics for renewable energy installations.",
    overview:
      "Platforms that monitor solar, wind, and other renewable energy assets in real time, with performance analytics and fault alerting.",
    focusAreas: ["Asset performance monitoring", "Fault detection and alerting", "Energy yield analytics"],
    proofPoints: ["Designed for 24/7 unattended monitoring", "Performance benchmarked against design specifications"],
    relatedServices: ["environmental-technology", "smart-city-infrastructure"],
  },
  {
    slug: "smart-agriculture",
    title: "Smart Agriculture Solutions",
    summary: "Precision agriculture platforms that use sensor data and analytics to improve crop outcomes.",
    overview:
      "IoT and data platforms for soil monitoring, irrigation management, and crop health tracking, designed for smallholder and commercial agriculture.",
    focusAreas: ["Soil and crop monitoring", "Irrigation management", "Yield analytics"],
    proofPoints: ["Designed for field use in low-connectivity environments", "Analytics grounded in local agronomic data"],
    relatedServices: ["environmental-technology"],
  },
  {
    slug: "disaster-risk-mapping",
    title: "Disaster Risk Mapping and Early Warning Systems",
    summary: "Spatial risk mapping and automated early warning platforms for natural hazards.",
    overview:
      "GIS-based risk mapping combined with real-time sensor data to provide early warning of floods, landslides, and other hazards.",
    focusAreas: ["Hazard risk mapping", "Real-time sensor integration", "Automated early warning"],
    proofPoints: ["Alert thresholds defined with emergency management stakeholders", "Spatial analysis for multi-agency coordination"],
    relatedServices: ["environmental-technology", "climate-disaster-management"],
  },
  {
    slug: "environmental-compliance",
    title: "Environmental Compliance",
    summary: "Advisory and technical services to help organizations meet environmental regulatory requirements.",
    overview:
      "Compliance frameworks mapped to applicable national and international standards, with documentation structured for regulatory submission.",
    focusAreas: ["Regulatory framework mapping", "Compliance gap analysis", "Regulatory documentation"],
    proofPoints: ["Advisory grounded in current regulatory requirements", "Deliverables structured for regulatory acceptance"],
    relatedServices: ["environmental-consulting"],
  },
  {
    slug: "environmental-audits",
    title: "Environmental Audits",
    summary: "Independent environmental audits against regulatory and voluntary standards.",
    overview:
      "Structured audit processes that assess environmental performance against applicable standards, with findings documented for institutional and regulatory use.",
    focusAreas: ["Audit planning and scoping", "Field assessment", "Findings documentation"],
    proofPoints: ["Audit methodology aligned to ISO 14001 and applicable standards", "Findings structured for regulatory and board reporting"],
    relatedServices: ["environmental-consulting"],
  },
  {
    slug: "sustainability-strategies",
    title: "Sustainability Strategies",
    summary: "Institutional sustainability strategies grounded in data and aligned to recognized frameworks.",
    overview:
      "Sustainability roadmaps developed from baseline assessment through to measurable targets, aligned to GRI, SDGs, and sector-specific frameworks.",
    focusAreas: ["Baseline assessment", "Target setting", "Implementation roadmaps"],
    proofPoints: ["Strategies grounded in institutional data, not generic templates", "Targets measurable and time-bound"],
    relatedServices: ["environmental-consulting"],
  },
  {
    slug: "biodiversity-mapping",
    title: "Biodiversity Mapping",
    summary: "Spatial mapping and assessment of biodiversity assets for conservation and compliance.",
    overview:
      "GIS-based biodiversity mapping that documents species and habitat distribution for environmental impact assessment and conservation planning.",
    focusAreas: ["Species and habitat mapping", "Impact assessment support", "Conservation planning"],
    proofPoints: ["Mapping grounded in field survey data", "Outputs structured for EIA and regulatory use"],
    relatedServices: ["environmental-consulting", "environmental-technology"],
  },
  {
    slug: "water-resource-management",
    title: "Water Resource Management",
    summary: "Technical advisory and data systems for sustainable water resource management.",
    overview:
      "Water resource assessments, monitoring systems, and management frameworks for surface water, groundwater, and watershed management.",
    focusAreas: ["Water resource assessment", "Monitoring system design", "Management framework development"],
    proofPoints: ["Assessment grounded in hydrological data", "Monitoring systems designed for long-term operation"],
    relatedServices: ["environmental-consulting", "environmental-technology"],
  },
  {
    slug: "pollution-monitoring",
    title: "Pollution Monitoring",
    summary: "Monitoring systems and advisory services for air, water, and soil pollution.",
    overview:
      "Pollution monitoring programs combining sensor networks, field sampling, and laboratory analysis with data management and regulatory reporting.",
    focusAreas: ["Monitoring program design", "Sensor and sampling integration", "Regulatory reporting"],
    proofPoints: ["Monitoring protocols aligned to applicable standards", "Data management built for regulatory submission"],
    relatedServices: ["environmental-consulting", "environmental-technology"],
  },
  {
    slug: "environmental-database-development",
    title: "Environmental Database Development",
    summary: "Governed environmental data platforms for institutional data management and reporting.",
    overview:
      "Custom environmental databases designed around institutional data models, with access controls, audit trails, and reporting tools built in.",
    focusAreas: ["Data model design", "Access and audit controls", "Reporting integration"],
    proofPoints: ["Database design grounded in institutional data requirements", "Built for long-term institutional ownership"],
    relatedServices: ["environmental-consulting", "environmental-technology"],
  },
  {
    slug: "smart-waste-collection",
    title: "Smart Waste Collection",
    summary: "IoT-enabled waste collection systems with real-time monitoring and route optimization.",
    overview:
      "Smart bin networks and fleet management platforms that optimize collection routes from real fill-level data, reducing operational costs.",
    focusAreas: ["Smart bin sensor networks", "Route optimization", "Fleet management"],
    proofPoints: ["Sensor networks designed for low-maintenance operation", "Routes optimized from real-time fill data"],
    relatedServices: ["smart-city-infrastructure"],
  },
  {
    slug: "smart-street-lighting",
    title: "Smart Street Lighting",
    summary: "Adaptive street lighting systems that reduce energy consumption through real-time control.",
    overview:
      "IoT-controlled street lighting networks with centralized management, adaptive dimming, and fault detection.",
    focusAreas: ["IoT lighting control", "Adaptive dimming", "Fault detection and alerting"],
    proofPoints: ["Energy savings documented against baseline consumption", "Centralized management for operations teams"],
    relatedServices: ["smart-city-infrastructure"],
  },
  {
    slug: "smart-water-management",
    title: "Smart Water Management",
    summary: "Real-time water network monitoring and management platforms for utilities and municipalities.",
    overview:
      "Sensor networks and data platforms that monitor water distribution networks for leaks, pressure anomalies, and quality issues.",
    focusAreas: ["Network monitoring", "Leak detection", "Quality monitoring"],
    proofPoints: ["Designed for 24/7 unattended monitoring", "Alerts integrated with operations workflows"],
    relatedServices: ["smart-city-infrastructure", "environmental-technology"],
  },
  {
    slug: "flood-monitoring-systems",
    title: "Flood Monitoring Systems",
    summary: "Real-time flood monitoring networks with automated early warning and response integration.",
    overview:
      "River gauge and rainfall sensor networks combined with predictive modeling to provide early warning of flood events.",
    focusAreas: ["Sensor network deployment", "Predictive flood modeling", "Early warning integration"],
    proofPoints: ["Alert thresholds defined with emergency management stakeholders", "Systems designed for 24/7 unattended operation"],
    relatedServices: ["smart-city-infrastructure", "climate-disaster-management"],
  },
  {
    slug: "traffic-monitoring",
    title: "Traffic Monitoring",
    summary: "Real-time traffic monitoring and analytics platforms for urban traffic management.",
    overview:
      "Camera and sensor-based traffic monitoring systems with centralized dashboards for traffic management and incident response.",
    focusAreas: ["Traffic sensor networks", "Real-time monitoring dashboards", "Incident detection"],
    proofPoints: ["Sensor networks designed for urban infrastructure integration", "Data pipelines built for real-time and historical analysis"],
    relatedServices: ["smart-city-infrastructure"],
  },
  {
    slug: "environmental-sensors-iot",
    title: "Environmental Sensors (IoT)",
    summary: "IoT sensor networks for environmental monitoring across urban and rural deployments.",
    overview:
      "Sensor network design, deployment, and data management for air quality, noise, temperature, and other environmental parameters.",
    focusAreas: ["Sensor network design", "Data pipeline management", "Multi-parameter monitoring"],
    proofPoints: ["Networks designed for low-maintenance, long-term operation", "Data pipelines built for real-time alerting"],
    relatedServices: ["smart-city-infrastructure", "environmental-technology"],
  },
  {
    slug: "flood-prediction-systems",
    title: "Flood Prediction Systems",
    summary: "Predictive flood modeling platforms that provide advance warning of flood events.",
    overview:
      "Hydrological models combined with real-time sensor data to predict flood events and trigger early warning alerts.",
    focusAreas: ["Hydrological modeling", "Real-time sensor integration", "Predictive alerting"],
    proofPoints: ["Models calibrated against historical flood data", "Alert lead times validated with emergency management teams"],
    relatedServices: ["climate-disaster-management"],
  },
  {
    slug: "wildfire-monitoring",
    title: "Wildfire Monitoring",
    summary: "Satellite and sensor-based wildfire detection and monitoring platforms.",
    overview:
      "Platforms that integrate satellite imagery, weather data, and ground sensors to detect and monitor wildfire events in real time.",
    focusAreas: ["Satellite imagery integration", "Real-time fire detection", "Spread modeling"],
    proofPoints: ["Detection latency minimized through automated satellite data processing", "Alerts integrated with emergency response workflows"],
    relatedServices: ["climate-disaster-management"],
  },
  {
    slug: "coastal-erosion-mapping",
    title: "Coastal Erosion Mapping",
    summary: "Spatial monitoring and analysis of coastal erosion for planning and risk management.",
    overview:
      "GIS-based coastal monitoring that tracks shoreline change over time using satellite and field survey data.",
    focusAreas: ["Shoreline change monitoring", "Risk zone mapping", "Planning support"],
    proofPoints: ["Monitoring grounded in multi-year satellite and survey datasets", "Outputs structured for coastal planning and regulatory use"],
    relatedServices: ["climate-disaster-management", "environmental-consulting"],
  },
  {
    slug: "drought-monitoring",
    title: "Drought Monitoring",
    summary: "Data platforms that monitor drought conditions and support early response.",
    overview:
      "Platforms that integrate rainfall, soil moisture, and vegetation data to monitor drought onset and severity.",
    focusAreas: ["Rainfall and soil moisture monitoring", "Vegetation index analysis", "Drought severity classification"],
    proofPoints: ["Monitoring grounded in multi-source climate datasets", "Alerts calibrated with agricultural and water management stakeholders"],
    relatedServices: ["climate-disaster-management", "environmental-technology"],
  },
  {
    slug: "emergency-response-systems",
    title: "Emergency Response Systems",
    summary: "Digital platforms that coordinate emergency response operations across agencies.",
    overview:
      "Incident management and coordination platforms that support multi-agency emergency response with real-time situational awareness.",
    focusAreas: ["Incident management", "Multi-agency coordination", "Real-time situational awareness"],
    proofPoints: ["Workflows designed with emergency management practitioners", "Systems tested against real response scenarios"],
    relatedServices: ["climate-disaster-management"],
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export function getSolutionsByService(serviceSlug: string) {
  return solutions.filter((s) => s.relatedServices.includes(serviceSlug));
}
