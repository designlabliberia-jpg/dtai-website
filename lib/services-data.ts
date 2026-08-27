import type { ProfileSection } from "@/lib/about-data";

export interface MethodologyStep {
  title: string;
  description: string;
  icon: string;
}

export interface Service {
  slug: string;
  icon: string;
  solutions: string[];
  methodology: MethodologyStep[];
  profile: ProfileSection;
}

export const services: Service[] = [
  {
    slug: "digital-technology",
    icon: "Monitor",
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
      { title: "Architecture Review", description: "System design and architecture assessed before any implementation begins.", icon: "ScanSearch" },
      { title: "Build & Test", description: "Typed, tested codebases with enforced peer review gates at every stage.", icon: "Code2" },
      { title: "Documented Handover", description: "Full documentation delivered for long-term maintainability and team ownership.", icon: "FileCheck2" },
    ],
    profile: {
      eyebrow: "Digital Technology Solutions",
      heading: "Engineering Digital Systems",
      headingAccent: "Built to Last",
      paragraphs: [
        "Professional digital systems, from custom software and mobile apps to AI, cloud, and enterprise platforms, engineered for institutional scale and long-term reliability.",
        "Every engagement starts with an architecture review and ends with documented handover, ensuring your team can maintain and evolve what we build together.",
      ],
      collage: {
        primary: { src: "/assets/services/digital-transformation.jpg", alt: "Digital Technology Solutions" },
      },
    },
  },
  {
    slug: "environmental-technology",
    icon: "Leaf",
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
      { title: "Spatial Data Modeling", description: "Data models matched to environmental decision needs and field realities.", icon: "Map" },
      { title: "Sensor Integration", description: "Real-time sensor pipelines designed for reliability in low-connectivity environments.", icon: "Wifi" },
      { title: "ESG Reporting", description: "Reporting frameworks aligned to international ESG and regulatory standards.", icon: "BarChart3" },
    ],
    
    profile: {
      eyebrow: "Eco Technology Sustainability",
      heading: "Digital Tools for a",
      headingAccent: "Sustainable Future",
      paragraphs: [
        "Digital platforms and data systems that support environmental monitoring, sustainability reporting, and climate-informed decision-making.",
        "From real-time sensor integration to ESG reporting frameworks, we build systems that turn environmental data into actionable insight.",
      ],
      collage: {
        primary: { src: "/assets/services/gis-spatial-technology.jpg", alt: "Eco Technology Sustainability" },
      },
    },
  },
  {
    slug: "environmental-consulting",
    icon: "TreePine",
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
      { title: "Baseline Assessment", description: "Environmental baseline established from field data before any recommendation.", icon: "ClipboardList" },
      { title: "Compliance Mapping", description: "Frameworks mapped to applicable national and international standards.", icon: "ShieldCheck" },
      { title: "Regulatory Documentation", description: "Findings structured for regulatory submission and institutional acceptance.", icon: "FileText" },
    ],
    
    profile: {
      eyebrow: "Environmental Advisory",
      heading: "Expert Guidance for",
      headingAccent: "Environmental Compliance",
      paragraphs: [
        "Expert advisory and technical services for environmental compliance, auditing, and sustainability strategy.",
        "Our advisory is grounded in field data and structured for regulatory acceptance, not desktop assumptions.",
      ],
      collage: {
        primary: { src: "/assets/services/data-platforms.jpg", alt: "Environmental Advisory" },
      },
    },
  },
  {
    slug: "smart-city-infrastructure",
    icon: "Building2",
    solutions: [
      "Smart Waste Collection",
      "Smart Street Lighting",
      "Smart Water Management",
      "Flood Monitoring Systems",
      "Traffic Monitoring",
      "Environmental Sensors (IoT)",
    ],
      methodology: [
      { title: "Network Design", description: "Sensor networks designed around city infrastructure and connectivity constraints.", icon: "Network" },
      { title: "Ops Dashboard", description: "Centralized monitoring dashboards built for operations teams and real-time alerting.", icon: "LayoutDashboard" },
      { title: "System Integration", description: "Full interoperability with existing municipal and third-party systems.", icon: "Plug" },
    ],
    profile: {
      eyebrow: "Smart City & Green Infrastructure",
      heading: "IoT Systems for",
      headingAccent: "Smarter Cities",
      paragraphs: [
        "IoT-enabled urban systems that improve city services, reduce resource waste, and provide real-time operational visibility.",
        "From smart waste collection to flood monitoring, we design sensor networks and dashboards built for long-term, low-maintenance city operations.",
      ],
      collage: {
        primary: { src: "/assets/services/digital-infrastructure.jpg", alt: "Smart City & Green Infrastructure" },
      },
    },
  },
  {
    slug: "climate-disaster-management",
    icon: "ShieldAlert",
    solutions: [
      "Flood Prediction Systems",
      "Wildfire Monitoring",
      "Coastal Erosion Mapping",
      "Drought Monitoring",
      "Emergency Response Systems",
    ],
      methodology: [
      { title: "Hazard Modeling", description: "Risk models grounded in historical and real-time climate data sources.", icon: "Activity" },
      { title: "Alert Thresholds", description: "Thresholds defined collaboratively with emergency management stakeholders.", icon: "BellRing" },
      { title: "Response Integration", description: "Workflows integrated with existing institutional emergency protocols.", icon: "GitMerge" },
    ],
    profile: {
      eyebrow: "Climate & Disaster Management",
      heading: "Early Warning Systems for",
      headingAccent: "Climate Resilience",
      paragraphs: [
        "Early warning systems, predictive analytics, and emergency response platforms that help institutions prepare for and respond to climate-driven hazards.",
        "Built for 24/7 unattended monitoring with automated alerting and spatial analysis tools designed for multi-agency coordination.",
      ],
      collage: {
        primary: { src: "/assets/services/artificial-intelligence-solutions.jpg", alt: "Climate & Disaster Management" },
      },
    },
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const companyLinks = [
  { label: "About Us", href: "/company/overview" },
  { label: "Our Team", href: "/company/overview#team" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks = [
  { icon: "MessageCircle", label: "WhatsApp", href: "https://wa.me/231XXXXXXXX" },
  { icon: "Mail", label: "Email", href: "mailto:info@dtai.com.lr" },
  { icon: "Facebook", label: "Facebook", href: "https://facebook.com/dtailiberia" },
  { icon: "Share2", label: "Share", href: "#share" },
];
