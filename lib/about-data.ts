export interface ValueItem {
  label: string;
  desc: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
}

export interface ImageCollage {
  primary: { src: string; alt: string };
  secondary: { src: string; alt: string };
}

export interface ContentSection {
  eyebrow: string;
  heading?: string;
  body: string;
  points: string[];
  collage: ImageCollage;
  imageLeft?: boolean;
}

export interface ProfileSection {
  eyebrow: string;
  heading?: string;
  headingAccent: string;
  paragraphs: string[];
  collage: ImageCollage;
  badgeLabel: string;
}


export const aboutProfile: ProfileSection = {
  eyebrow: "About",
  heading: "Crafting Digital Excellence",
  headingAccent: "Across Africa",
  paragraphs: [
    "Digital Technologies Associates Incorporated (DTAI) is an innovative technology and environmental solutions company dedicated to delivering cutting-edge digital transformation services across Africa and beyond.",
    "We specialize in software engineering, artificial intelligence, GIS and geospatial technologies, cybersecurity, health information systems, election technology, environmental monitoring, sustainability solutions, and smart city innovations.",
    "By combining advanced digital technologies with environmental expertise, DTAI helps governments, development partners, private enterprises, and communities make informed decisions through data-driven solutions that promote efficiency, transparency, resilience, and sustainable development.",
  ],
  collage: {
    primary: { src: "/assets/hero/team-at-work2.jpg", alt: "DTAI team at work" },
    secondary: { src: "/assets/dtai-logo.png", alt: "DTAI logo" },
  },
  badgeLabel: "DTAI",
};

export const aboutMission: ContentSection = {
  eyebrow: "Our Mission",
  heading: "Our Mission",
  body: "To design and deliver innovative digital and environmental solutions that transform organizations, improve governance, protect the environment, and enhance the quality of life through technology.",
  points: [
    "Design innovative digital and environmental solutions",
    "Transform organizations and improve governance",
    "Protect the environment through technology",
    "Enhance quality of life across Africa and beyond",
  ],
  collage: {
    primary: { src: "/assets/services/software-engineering.jpg", alt: "Software engineering" },
    secondary: { src: "/assets/services/digital-transformation.jpg", alt: "Digital transformation" },
  },
  imageLeft: true,
};

export const aboutVision: ContentSection = {
  eyebrow: "Our Vision",
  heading: "Our Vision",
  body: "To become Africa's leading provider of digital innovation and sustainable environmental technology solutions, building a future where technology drives equity, resilience, and prosperity across the continent.",
  points: [
    "Africa's leading digital innovation provider",
    "Pioneering sustainable environmental technology",
    "Empowering communities through data-driven decisions",
    "Setting the standard for tech excellence in Africa",
  ],
  collage: {
    primary: { src: "/assets/services/gis-spatial-technology.jpg", alt: "GIS and spatial technology" },
    secondary: { src: "/assets/services/artificial-intelligence-solutions.jpg", alt: "AI solutions" },
  },
  imageLeft: false,
};

export const coreValues: ValueItem[] = [
  { label: "Innovation", desc: "Pioneering solutions that push the boundaries of what technology can achieve." },
  { label: "Integrity", desc: "Operating with transparency, honesty, and ethical standards in everything we do." },
  { label: "Excellence", desc: "Delivering the highest quality in every project, product, and partnership." },
  { label: "Professionalism", desc: "Maintaining world-class standards of conduct, communication, and delivery." },
  { label: "Accountability", desc: "Taking full ownership of our commitments and outcomes for every client." },
  { label: "Customer Satisfaction", desc: "Placing client success at the center of every decision we make." },
  { label: "Collaboration", desc: "Building strong partnerships with clients, communities, and global partners." },
  { label: "Continuous Learning", desc: "Staying ahead through relentless curiosity, research, and skill development." },
  { label: "Security", desc: "Embedding robust protection into every system, platform, and process we build." },
  { label: "Social Responsibility", desc: "Using technology as a force for positive impact across Africa and beyond." },
];

export const whyChooseUsReasons: WhyChooseItem[] = [
  {
    title: "Innovative & Customer-Focused",
    description: "Every solution we deliver starts with a deep understanding of your goals. We combine creative problem-solving with customer-first thinking to build software that is intuitive, impactful, and aligned with the real-world needs of your users and organization.",
  },
  {
    title: "Secure, Scalable & Reliable",
    description: "Our systems are engineered to perform under pressure. With advanced cybersecurity protocols, resilient cloud architecture, and rigorous quality assurance, your platforms remain protected, highly available, and ready to scale as your operations grow.",
  },
  {
    title: "Customized to Your Exact Needs",
    description: "We do not believe in off-the-shelf software. Whether you need a hospital information system, a secure e-voting platform, or a GIS mapping tool, every solution is purpose-built to address the precise operational challenges of your institution.",
  },
  {
    title: "Experienced & Engineering-Led",
    description: "Our team brings deep expertise across enterprise software, cloud infrastructure, and systems integration. We apply proven software engineering practices and rigorous development standards to deliver solutions that are robust, maintainable, and built to last.",
  },
  {
    title: "Modern & Globally Standardized",
    description: "We build with the latest technologies and adhere to international software engineering standards. From cloud-native architectures to compliant data environments, our solutions keep your organization current, competitive, and aligned with global best practices.",
  },
  {
    title: "Dedicated to Your Long-Term Success",
    description: "Our commitment does not end at deployment. We provide comprehensive onboarding, continuous technical maintenance, and responsive long-term support — ensuring your systems evolve with your needs and your team is always empowered to perform at its best.",
  },
];

export const aboutCommitment: ContentSection = {
  eyebrow: "Our Commitment",
  heading: "Innovating Today. Transforming Tomorrow.",
  body: "At Digital Technology Associates Incorporated, we believe technology should solve real-world challenges and create lasting value. We are committed to building trusted partnerships with our clients by delivering solutions that are innovative, secure, efficient, and sustainable.",
  points: [
    "Supporting digital government and public sector transformation",
    "Improving healthcare delivery through health information systems",
    "Enabling smarter businesses with data-driven solutions",
    "Developing next-generation mobile and enterprise applications",
  ],
  collage: {
    primary: { src: "/assets/services/digital-transformation.jpg", alt: "Digital transformation" },
    secondary: { src: "/assets/contact.jpg", alt: "DTAI logo" },
  },
  imageLeft: true,
};
