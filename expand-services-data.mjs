import fs from "fs";

const path = "lib/services-data.ts";
let content = fs.readFileSync(path, "utf8");

const oldInterface = `export interface Service {
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
}`;

const newInterface = `export interface Service {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  overview: string;
  representativeExample: "code" | "report" | "dashboard";
  whoThisIsFor: string[];
  solutions: { label: string; icon: string }[];
  methodology: string[];
  proofPoints: string[];
  codeLang: string;
  codeFilename: string;
  codeSnippet: string;
}`;

if (!content.includes(oldInterface)) {
  console.log("WARNING: interface block not found — aborting, no changes made");
  process.exit(1);
}
content = content.replace(oldInterface, newInterface);

// Digital Technology
content = content.replace(
  `    summary:
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
    ],`,
  `    summary:
      "Professional digital systems, from custom software and mobile apps to AI, cloud, and enterprise platforms, engineered for institutional scale and long term reliability.",
    overview:
      "DTAI builds and operates the core digital systems institutions depend on daily — from public-facing platforms to internal enterprise tools. Every system is engineered with the same discipline: documented architecture, reviewed code, and a maintenance plan that outlives the original project team.",
    representativeExample: "code",
    whoThisIsFor: [
      "Government ministries and agencies",
      "Election management bodies",
      "Hospitals and healthcare networks",
      "Enterprises modernizing legacy systems",
    ],
    solutions: [
      { label: "Custom Software Development", icon: "Code2" },
      { label: "Mobile Applications", icon: "Smartphone" },
      { label: "AI & Machine Learning", icon: "Bot" },
      { label: "Cloud Computing", icon: "Cloud" },
      { label: "Cybersecurity", icon: "ShieldCheck" },
      { label: "GIS & Spatial Information Systems", icon: "Map" },
      { label: "Election Technology", icon: "Vote" },
      { label: "Hospital Information Systems", icon: "HeartPulse" },
      { label: "Enterprise Resource Planning (ERP)", icon: "Building2" },
    ],`
);

// Eco Technology Sustainability
content = content.replace(
  `    summary:
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
    ],`,
  `    summary:
      "Digital platforms and data systems that support environmental monitoring, sustainability reporting, and climate-informed decision-making.",
    overview:
      "Environmental institutions need to see problems before they become crises — a water source degrading, a forest boundary encroached, an emissions target slipping. DTAI builds the monitoring, mapping, and reporting systems that turn scattered field data into a live operational picture, in environments where connectivity and infrastructure can't always be assumed.",
    representativeExample: "dashboard",
    whoThisIsFor: [
      "Environmental protection agencies",
      "Mining and extractive industry operators",
      "Agricultural cooperatives",
      "Conservation and research NGOs",
    ],
    solutions: [
      { label: "Environmental Information Management Systems", icon: "Database" },
      { label: "Environmental Impact Assessment (digital data collection)", icon: "ClipboardCheck" },
      { label: "GIS Mapping for forests, mining, agriculture, and protected areas", icon: "Map" },
      { label: "Air, Water, and Soil Quality Monitoring Systems", icon: "Droplet" },
      { label: "Climate Change Data Analytics", icon: "BarChart3" },
      { label: "Carbon Footprint Calculators", icon: "Leaf" },
      { label: "ESG Reporting Software", icon: "FileText" },
      { label: "Waste Management Information Systems", icon: "Trash2" },
      { label: "Smart Recycling Solutions", icon: "Recycle" },
      { label: "Renewable Energy Monitoring Platforms", icon: "Zap" },
      { label: "Smart Agriculture Solutions", icon: "Wheat" },
      { label: "Disaster Risk Mapping and Early Warning Systems", icon: "AlertTriangle" },
    ],`
);

// Environmental Advisory
content = content.replace(
  `    summary:
      "Expert advisory and technical services for environmental compliance, auditing, and sustainability strategy.",
    solutions: [
      "Environmental Compliance",
      "Environmental Audits",
      "Sustainability Strategies",
      "Biodiversity Mapping",
      "Water Resource Management",
      "Pollution Monitoring",
      "Environmental Database Development",
    ],`,
  `    summary:
      "Expert advisory and technical services for environmental compliance, auditing, and sustainability strategy.",
    overview:
      "Regulatory compliance depends on evidence, not intentions. DTAI's environmental advisory practice combines field assessment with the technical systems to document it — producing findings that hold up to regulatory review, not just internal reporting.",
    representativeExample: "report",
    whoThisIsFor: [
      "Regulatory and compliance agencies",
      "Industrial and extractive operators",
      "Development finance institutions",
      "Organizations preparing for environmental audit",
    ],
    solutions: [
      { label: "Environmental Compliance", icon: "ShieldCheck" },
      { label: "Environmental Audits", icon: "ClipboardCheck" },
      { label: "Sustainability Strategies", icon: "Leaf" },
      { label: "Biodiversity Mapping", icon: "Map" },
      { label: "Water Resource Management", icon: "Droplet" },
      { label: "Pollution Monitoring", icon: "AlertTriangle" },
      { label: "Environmental Database Development", icon: "Database" },
    ],`
);

// Smart City & Green Infrastructure
content = content.replace(
  `    summary:
      "IoT-enabled urban systems that improve city services, reduce resource waste, and provide real-time operational visibility.",
    solutions: [
      "Smart Waste Collection",
      "Smart Street Lighting",
      "Smart Water Management",
      "Flood Monitoring Systems",
      "Traffic Monitoring",
      "Environmental Sensors (IoT)",
    ],`,
  `    summary:
      "IoT-enabled urban systems that improve city services, reduce resource waste, and provide real-time operational visibility.",
    overview:
      "City services generate constant operational data — waste levels, water pressure, traffic flow, flood risk — that most municipalities never see in real time. DTAI builds the sensor networks and monitoring dashboards that give city operations teams live visibility instead of reactive guesswork.",
    representativeExample: "dashboard",
    whoThisIsFor: [
      "Municipal and city governments",
      "Public utility operators",
      "Urban planning authorities",
      "Public works departments",
    ],
    solutions: [
      { label: "Smart Waste Collection", icon: "Trash2" },
      { label: "Smart Street Lighting", icon: "Lightbulb" },
      { label: "Smart Water Management", icon: "Droplet" },
      { label: "Flood Monitoring Systems", icon: "AlertTriangle" },
      { label: "Traffic Monitoring", icon: "Truck" },
      { label: "Environmental Sensors (IoT)", icon: "Radio" },
    ],`
);

// Climate & Disaster Management
content = content.replace(
  `    summary:
      "Early warning systems, predictive analytics, and emergency response platforms that help institutions prepare for and respond to climate-driven hazards.",
    solutions: [
      "Flood Prediction Systems",
      "Wildfire Monitoring",
      "Coastal Erosion Mapping",
      "Drought Monitoring",
      "Emergency Response Systems",
    ],`,
  `    summary:
      "Early warning systems, predictive analytics, and emergency response platforms that help institutions prepare for and respond to climate-driven hazards.",
    overview:
      "The gap between a hazard forming and an institution responding is where damage happens. DTAI builds early warning and monitoring systems designed for that gap specifically — automated detection, defined alert thresholds, and response workflows that connect directly to the teams who act on them.",
    representativeExample: "dashboard",
    whoThisIsFor: [
      "Disaster management agencies",
      "Meteorological and hydrological services",
      "Emergency response coordinators",
      "Coastal and flood-prone municipalities",
    ],
    solutions: [
      { label: "Flood Prediction Systems", icon: "AlertTriangle" },
      { label: "Wildfire Monitoring", icon: "Flame" },
      { label: "Coastal Erosion Mapping", icon: "Map" },
      { label: "Drought Monitoring", icon: "Sun" },
      { label: "Emergency Response Systems", icon: "Siren" },
    ],`
);

fs.writeFileSync(path, content);
console.log("Updated lib/services-data.ts with overview, whoThisIsFor, representativeExample, and solution icons");
