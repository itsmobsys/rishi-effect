export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string; // Used to select Lucide icons dynamically
  metrics: { label: string; value: string }[];
  features: string[];
}

export interface Vertical {
  id: string;
  name: string;
  image: string; // Thematic background vector/image representation
  tagline: string;
  description: string;
  caseCount: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  verticalId: string;
  serviceId: string;
  impactResult: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  videoUrl?: string; // Showcase or showreel placeholder link
  imageUrl: string;
  featured: boolean;
}

export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "PR" | "Branding" | "Social Media" | "Strategy" | "Public Affairs";
  readTime: string;
  date: string;
  author: string;
  tags: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  company: string;
  vertical: string;
  serviceNeeded: string;
  message: string;
  budget?: string;
}
