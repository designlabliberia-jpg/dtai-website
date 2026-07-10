export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  division: "Executive" | "Engineering" | "Operations";
  focus: string;
  bio: string;
  image: string | null;
  linkedin: string;
}

export const leadershipTeam: LeadershipMember[] = [
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
    id: "DTAI-L02",
    name: "Garrison Nyunti Sayor III",
    title: "Senior Software Engineer",
    division: "Engineering",
    focus: "Technical Delivery & Engineering Standards",
    bio: "Leads technical delivery and engineering standards across DTAI's software and infrastructure projects.",
    image: "/assets/team/Garrison.jpeg",
    linkedin: "http://linkedin.com/in/garrison-sayor-iii-aa3699313",
  },
  {
    id: "DTAI-L03",
    name: "Emmanuel Cheeseman",
    title: "IT Manager",
    division: "Operations",
    focus: "Systems Reliability & IT Governance",
    bio: "Oversees IT operations, systems reliability, and internal technology governance at DTAI.",
    image: "/assets/team/Emmanuel.jpeg",
    linkedin: "https://www.linkedin.com/in/emmanuelcheeseman",
  },
];
