export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  division: "Executive" | "Engineering" | "Operations" | "Directorate" | "Management";
  focus: string;
  bio: string;
  image: string | null;
  linkedin: string;
}

export const leadershipTeam: LeadershipMember[] = [
    {
    id: "DTAI-L04",
    name: "Emmanuel Cheeseman",
    title: "IT Manager",
    division: "Operations",
    focus: "Systems Reliability & IT Governance",
    bio: "Oversees IT operations, systems reliability, and internal technology governance at DTAI.",
    image: "/assets/team/Emmanuel.jpeg",
    linkedin: "https://www.linkedin.com/in/emmanuelcheeseman",
  },
  {
    id: "DTAI-L02",
    name: "Garrison Nyunti Sayor III",
    title: "Senior Software Engineer",
    division: "Engineering",
    focus: "Software Engineering, Agile Delivery & Technical Standards",
    bio: "Garrison Nyunti Sayor III is a software engineer with a BSc in Software Engineering and hands-on experience in agile software development and delivery. He has progressed from Agile Technology Developer to Agile Technology Owner through remote engagements, bringing structured agile practices and technical leadership to DTAI's software and infrastructure projects. At DTAI, he leads technical delivery and upholds engineering standards across the organization's digital solutions.",
    image: "/assets/team/Garrison.jpeg",
    linkedin: "http://linkedin.com/in/garrison-sayor-iii-aa3699313",
  },
   {
    id: "DTAI-L01",
    name: "Floyd Oxley Sayor",
    title: "Chief Executive Officer",
    division: "Executive",
    focus: "Strategic Direction & Institutional Partnerships",
    bio: "Leads DTAI's strategic direction and institutional partnerships, guiding the company's mission to engineer trusted digital infrastructure across Africa.",
    image: "/assets/team/Floyd.jpeg",
    linkedin: "",
  },
   {
    id: "DTAI-L03",
    name: "Floyd Oxley Sayor Jr",
    title: "Director of Environmental Protection & Sustainability",
    division: "Directorate",
    focus: "Environmental Protection, Sustainability & Conservation",
    bio: "Floyd Oxley Sayor Jr. leads DTAI's environmental protection and sustainability initiatives, ensuring the company's operations align with responsible environmental standards. He holds a BSc in Environmental Management and Conservation, and brings focused expertise in environmental governance, resource conservation, and sustainable development practices to DTAI's directorate.",
    image: "/assets/default-profile.jpg",
    linkedin: "",
  },
   {
    id: "DTAI-L05",
    name: "Yassah Robertson",
    title: "Chief Business Development Officer",
    division: "Management",
    focus: "Business Development, Trade & Private Sector Growth",
    bio: "Yassah Robertson is a business management professional, educator, and YALI Fellow with over a decade of experience in business operations, administration, and strategic management. As Chief Business Development Officer at DTAI, she drives growth strategy, stakeholder engagement, and partnership development. She also serves as Secretary of the European Chamber of Commerce in Liberia (ECCL), contributing to institutional governance and economic cooperation between Liberia and Europe. A lecturer at Starz University, Yassah holds an MBA and BBA and is passionate about bridging academia, industry, and policy to foster inclusive economic growth across Africa.",
    image: "/assets/team/Yass.jpeg",
    linkedin: "",
  },
];
