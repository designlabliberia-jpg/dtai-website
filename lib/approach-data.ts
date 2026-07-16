export interface ApproachStep {
  slug: string;
  title: string;
  detail: string;
  deliverables: string[];
  relatedCapabilities: string[]; // real service slugs
  governanceLink?: { label: string; href: string };
}

export const approachSteps: ApproachStep[] = [
  {
    slug: "requirements-context",
    title: "Requirements & Context",
    detail:
      "Understand the institutional, operational, and regulatory context before any design begins. This phase exists because the biggest cause of failed institutional systems is designing against assumptions instead of reality.",
    deliverables: [
      "Stakeholder interview notes",
      "Constraint and compliance document",
      "Risk register",
      "Current-state process map",
    ],
    relatedCapabilities: ["it-consulting-systems-integration", "digital-transformation"],
  },
  {
    slug: "architecture-review",
    title: "Architecture & Review",
    detail:
      "Document the technical architecture and subject it to review before implementation. Nothing gets built against an unreviewed design — this is where security requirements and long-term maintainability get decided, not retrofitted later.",
    deliverables: [
      "Architecture decision record (ADR)",
      "Data model and system diagram",
      "Security and threat model review",
      "Sign-off from technical review",
    ],
    relatedCapabilities: ["software-engineering", "cybersecurity", "digital-infrastructure"],
    governanceLink: { label: "Development Standards", href: "/security-and-governance/development-standards" },
  },
  {
    slug: "build-verify",
    title: "Build & Verify",
    detail:
      "Implement against documented standards, with security and testing gates at each stage. Code review and testing are enforced steps in the pipeline, not optional practices left to individual discretion.",
    deliverables: [
      "Tested, reviewed codebase",
      "Automated test coverage",
      "Dependency and vulnerability scan results",
      "Staging environment sign-off",
    ],
    relatedCapabilities: ["software-engineering", "cybersecurity", "artificial-intelligence-solutions"],
    governanceLink: { label: "Security Philosophy", href: "/security-and-governance/philosophy" },
  },
  {
    slug: "deploy-operate",
    title: "Deploy & Operate",
    detail:
      "Deploy with monitoring, documentation, and handover in place from day one. A system isn't done at launch — it's done when it can be operated and understood by someone who wasn't in the room when it was built.",
    deliverables: [
      "Deployment runbook",
      "Monitoring and alerting configuration",
      "Disaster recovery procedure",
      "Operational handover documentation",
    ],
    relatedCapabilities: ["digital-infrastructure", "cloud-solutions"],
    governanceLink: { label: "Reliability Practices", href: "/security-and-governance/reliability-practices" },
  },
  {
    slug: "maintain-evolve",
    title: "Maintain & Evolve",
    detail:
      "Support long-term operation and evolution as institutional needs change. Systems are built expecting to be modified for years — by people, teams, and even administrations that don't exist yet.",
    deliverables: [
      "Ongoing maintenance and support plan",
      "Change management process",
      "Periodic security and performance review",
    ],
    relatedCapabilities: ["digital-transformation", "data-platforms"],
    governanceLink: { label: "Governance Model", href: "/security-and-governance/governance-model" },
  },
];
