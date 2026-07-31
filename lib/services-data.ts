export interface Service {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  solutions: string[];
  methodology: string[];
  proofPoints: string[];
  codeLang: string;
  codeFilename: string;
  codeSnippet: string;
}

export const services: Service[] = [
  {
    slug: "digital-technology",
    title: "Digital Technology Solutions",
    icon: "Monitor",
    summary:
      "Professional digital systems, from custom software and mobile apps to AI, cloud, and enterprise platforms, engineered for institutional scale and long term reliability.",
    solutions: [
      "Custom Software Development",
      "Mobile Applications",
      "AI & Machine Learning",
      "Cloud Computing",
      "Cybersecurity",
      "GIS & Spatial Information Systems",
      "Election Technology",
      "Hospital Information Systems",
      "Enterprise Resource Planning (ERP)",
    ],
    methodology: [
      "Architecture review before implementation begins",
      "Typed, tested codebases with enforced review gates",
      "Documented handover for long-term maintainability",
    ],
    proofPoints: [
      "Standardized development workflows applied across every engagement",
      "Ongoing software maintenance and technical support included",
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
    slug: "environmental-technology",
    title: "Eco Technology Sustainability",
    icon: "Leaf",
    summary:
      "Digital platforms and data systems that support environmental monitoring, sustainability reporting, and climate-informed decision-making.",
    solutions: [
      "Environmental Information Management Systems",
      "Environmental Impact Assessment (digital data collection)",
      "GIS Mapping for forests, mining, agriculture, and protected areas",
      "Air, Water, and Soil Quality Monitoring Systems",
      "Climate Change Data Analytics",
      "Carbon Footprint Calculators",
      "ESG Reporting Software",
      "Waste Management Information Systems",
      "Smart Recycling Solutions",
      "Renewable Energy Monitoring Platforms",
      "Smart Agriculture Solutions",
      "Disaster Risk Mapping and Early Warning Systems",
    ],
    methodology: [
      "Spatial data modeling matched to environmental decision needs",
      "Real-time sensor integration and data pipeline design",
      "Reporting frameworks aligned to international ESG standards",
    ],
    proofPoints: [
      "Systems built for field data collection in low-connectivity environments",
      "Dashboards designed around regulatory and institutional reporting cycles",
    ],
    codeLang: "python",
    codeFilename: "env_monitor.py",
    codeSnippet: `def process_sensor_reading(reading: SensorReading) -> Alert | None:
    if reading.value > THRESHOLD[reading.parameter]:
        return Alert(
            station=reading.station_id,
            parameter=reading.parameter,
            value=reading.value,
            severity=classify_severity(reading),
        )
    store_reading(reading)
    return None`,
  },
  {
    slug: "environmental-consulting",
    title: "Environmental Advisory",
    icon: "TreePine",
    summary:
      "Expert advisory and technical services for environmental compliance, auditing, and sustainability strategy.",
    solutions: [
      "Environmental Compliance",
      "Environmental Audits",
      "Sustainability Strategies",
      "Biodiversity Mapping",
      "Water Resource Management",
      "Pollution Monitoring",
      "Environmental Database Development",
    ],
    methodology: [
      "Baseline environmental assessment before any recommendation",
      "Compliance frameworks mapped to applicable national and international standards",
      "Findings documented for regulatory submission and institutional use",
    ],
    proofPoints: [
      "Advisory grounded in field data, not desktop assumptions",
      "Deliverables structured for regulatory acceptance",
    ],
    codeLang: "sql",
    codeFilename: "compliance_report.sql",
    codeSnippet: `SELECT site_id, parameter, AVG(value) AS avg_value,
       MAX(value) AS peak_value, standard_limit,
       CASE WHEN MAX(value) > standard_limit THEN 'EXCEEDANCE' ELSE 'COMPLIANT' END AS status
FROM monitoring_readings
WHERE sampled_at >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY site_id, parameter, standard_limit
ORDER BY status DESC, peak_value DESC;`,
  },
  {
    slug: "smart-city-infrastructure",
    title: "Smart City & Green Infrastructure",
    icon: "Building2",
    summary:
      "IoT-enabled urban systems that improve city services, reduce resource waste, and provide real-time operational visibility.",
    solutions: [
      "Smart Waste Collection",
      "Smart Street Lighting",
      "Smart Water Management",
      "Flood Monitoring Systems",
      "Traffic Monitoring",
      "Environmental Sensors (IoT)",
    ],
    methodology: [
      "Sensor network design matched to city infrastructure and connectivity",
      "Centralized monitoring dashboards for operations teams",
      "Interoperability with existing municipal systems",
    ],
    proofPoints: [
      "IoT deployments designed for low-maintenance, long-term operation",
      "Data pipelines built for real-time alerting and historical analysis",
    ],
    codeLang: "typescript",
    codeFilename: "sensor-gateway.ts",
    codeSnippet: `export async function ingestReading(payload: IoTPayload) {
  const reading = parseReading(payload);
  await timeseries.insert(reading);

  if (reading.value > thresholds[reading.metric]) {
    await alertOpsChannel({ sensor: reading.sensorId, metric: reading.metric, value: reading.value });
  }
}`,
  },
  {
    slug: "climate-disaster-management",
    title: "Climate & Disaster Management",
    icon: "ShieldAlert",
    summary:
      "Early warning systems, predictive analytics, and emergency response platforms that help institutions prepare for and respond to climate-driven hazards.",
    solutions: [
      "Flood Prediction Systems",
      "Wildfire Monitoring",
      "Coastal Erosion Mapping",
      "Drought Monitoring",
      "Emergency Response Systems",
    ],
    methodology: [
      "Hazard modeling grounded in historical and real-time climate data",
      "Alert thresholds defined with emergency management stakeholders",
      "Response workflows integrated with existing institutional protocols",
    ],
    proofPoints: [
      "Systems designed for 24/7 unattended monitoring with automated alerting",
      "Spatial analysis tools built for multi-agency coordination",
    ],
    codeLang: "python",
    codeFilename: "flood_predictor.py",
    codeSnippet: `def predict_flood_risk(station_id: str, hours_ahead: int = 6) -> RiskLevel:
    readings = fetch_recent_readings(station_id, window_hours=24)
    rainfall_trend = compute_trend(readings["rainfall_mm"])
    river_level = readings["river_level_m"].iloc[-1]

    if river_level > CRITICAL_LEVEL or rainfall_trend > SURGE_THRESHOLD:
        trigger_early_warning(station_id, level="HIGH")
        return RiskLevel.HIGH
    return RiskLevel.MONITOR`,
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
