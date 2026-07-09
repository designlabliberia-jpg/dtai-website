export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  context: string;
  stakeholders: string[];
  technicalApproach: string;
  architectureOverview: string;
  implementationProcess: string[];
  securityConsiderations: string;
  outcomes: { metric: string; label: string }[];
  lessonsLearned: string;
}

export const caseStudies: CaseStudy[] = [];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
