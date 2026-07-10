// The exhaustive, real set of pages DTAI Agent is allowed to navigate to.
// Keeping this as an explicit whitelist means the model can never send the
// visitor to a URL that doesn't exist.
export const SITE_ROUTES: { path: string; label: string; keywords: string[] }[] = [
  { path: "/", label: "Home", keywords: ["home", "homepage", "main page"] },
  { path: "/capabilities", label: "Capabilities", keywords: ["capabilities", "services", "what you do", "engineering domains"] },
  { path: "/solutions", label: "Solutions", keywords: ["solutions", "government technology", "election technology"] },
  { path: "/industries", label: "Industries", keywords: ["industries", "sectors"] },
  { path: "/case-studies", label: "Case Studies", keywords: ["case studies", "projects", "portfolio", "past work"] },
  { path: "/security-and-governance/philosophy", label: "Security & Governance", keywords: ["security", "governance", "data protection", "compliance"] },
  { path: "/partners/technology-partners", label: "Partners", keywords: ["partners", "partnerships", "ecosystem"] },
  { path: "/insights", label: "Insights", keywords: ["insights", "articles", "blog", "research", "knowledge platform"] },
  { path: "/company/overview", label: "Company Overview", keywords: ["about", "company", "who are you"] },
  { path: "/company/leadership", label: "Leadership", keywords: ["leadership", "team", "who runs", "executives", "ceo"] },
  { path: "/company/careers", label: "Careers", keywords: ["careers", "jobs", "hiring", "work here"] },
  { path: "/contact", label: "Contact", keywords: ["contact", "talk to someone", "get in touch", "reach out"] },
];
