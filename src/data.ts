import { Service, Vertical, CaseStudy, Insight } from "./types";

export interface Offering {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  embeddedVideo: string;
  keyOutcomes: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
}

export const OFFERINGS: Offering[] = [
  {
    id: "speaking",
    title: "National Keynotes & PR Assemblies",
    tagline: "Driving collective public opinion and market momentum.",
    iconName: "Volume2",
    shortDesc: "High-impact narrative alignment programs designed for top-tier summits, C-suite roundtables, and tech launches.",
    longDesc: "Rishi commands national stages with immersive, interactive PR keynotes. We leverage live behavioral insights and market-shaping consensus to dissolve communication fatigue. Since 2015, we have helped India's most ambitious business leaders align their corporate messages with clear national perspectives.",
    embeddedVideo: "https://www.youtube.com/embed/u4ZoJKF_VuA?autoplay=1",
    keyOutcomes: [
      "99.4% Attendee Alignment Index score on subsequent executive follow-ups.",
      "Custom brand message guides provided to every attending member.",
      "Actionable corporate communication playbooks structured during sessions."
    ],
    metrics: [
      { label: "Country Assemblies", value: "350+" },
      { label: "Message Retention", value: "96%" },
      { label: "Est. Leader Reached", value: "1.2M+" }
    ],
    accentColor: "var(--color-royal-blue)"
  },
  {
    id: "coaching",
    title: "Confidential Brand Advisory",
    tagline: "Absolute discretion for high-value reputation management.",
    iconName: "ShieldCheck",
    shortDesc: "Under-the-radar strategic advisory for visionary founders, corporate CEOs, and family offices.",
    longDesc: "A highly selective executive partnership built on ultimate confidentiality. Operating out of Prayagraj and advising across the country, we guide founders and key heirs through brand identity transitions, social media crisis management, and strategic market positioning.",
    embeddedVideo: "https://www.youtube.com/embed/qp0HIF3SfI4?autoplay=1",
    keyOutcomes: [
      "Immediate strategic crisis containment response and media firewalls within 24 hours.",
      "Robust personal brand audit for executives matching organizational culture.",
      "Sustainable business growth and legacy planning roadmaps for next-gen leaders."
    ],
    metrics: [
      { label: "Retainers Maintained", value: "8 Years+" },
      { label: "Capital Guarded", value: "₹250B+" },
      { label: "Active Leaders", value: "15 Max" }
    ],
    accentColor: "var(--color-royal-silver)"
  },
  {
    id: "workshops",
    title: "Full-Scale Strategy War-Rooms",
    tagline: "Developing modern campaigns in highly collaborative clinics.",
    iconName: "Grid",
    shortDesc: "Pragmatic workshops translating ambitious corporate metrics into unified multi-channel public dominance.",
    longDesc: "Tailor-made for quick-scaling companies and enterprise giants. These intensive multi-day clinics offer live competitor analysis, social media platform friction audits, and mock crisis resolution runs using our simulated sandboxes. Walk away with a complete, integrated quarterly growth blueprint.",
    embeddedVideo: "https://www.youtube.com/embed/u4ZoJKF_VuA?autoplay=1",
    keyOutcomes: [
      "Clear, actionable strategy map across PR, visual branding, and social media channels.",
      "Streamlined narrative templates customized for immediate team mobilization.",
      "Direct positioning manuals to maintain market authority."
    ],
    metrics: [
      { label: "Corporate War-Rooms", value: "180+" },
      { label: "Cross-Team Alignment", value: "98.5%" },
      { label: "Success Rate achieved", value: "95%" }
    ],
    accentColor: "var(--color-royal-light)"
  }
];

export const SERVICES: Service[] = [
  {
    id: "pr",
    title: "Elite Public Relations",
    shortDescription: "High-precision media placements, crisis management, authority building, and narrative firewalls for India's ambitious companies.",
    longDescription: "We engineer strategic narrative frameworks that capture national mindshare and protect executive reputation. Delivering major tier-1 business press, television profiles, and category authoritative features that establish permanent dominance.",
    iconName: "Megaphone",
    metrics: [
      { label: "Brand Mindshare Gained", value: "A+" },
      { label: "Crisis Containment Rate", value: "99.8%" },
      { label: "Press Placement Success", value: "100%" }
    ],
    features: [
      "Crisis PR & Narrative Containment",
      "Executive Profiling & Keynote Design",
      "Media Relations across India's Metros",
      "National Consensus Campaigns"
    ]
  },
  {
    id: "branding",
    title: "Brand Architecture",
    shortDescription: "Visual blueprints, premium corporate identities, and verbal guidelines designed to bypass visual skepticism instantly.",
    longDescription: "We build the visual frameworks and language directives of India's market leaders. Originated in Prayagraj and executed across the country, our typographic signatures, royal color palettes, and structural layouts ensure permanent modern brand legacies.",
    iconName: "Palette",
    metrics: [
      { label: "Sectors Rebranded", value: "24+" },
      { label: "Design IP Protections", value: "100%" },
      { label: "Brand Recall Multiplier", value: "3.4x" }
    ],
    features: [
      "Visual Identity System Design",
      "Verbal Strategy & Typography pairing",
      "Corporate Culture Styleguides",
      "Market Entry Positioning Blueprints"
    ]
  },
  {
    id: "strategy",
    title: "Business Strategy Advisory",
    shortDescription: "Relentless market gap analysis, geopolitical risk dockets, and growth modeling for category captains.",
    longDescription: "Before launching public campaigns, we draft comprehensive tactical battle cards. We analyze regulatory systems, market shifts, competitor blind-spots, and consumer micro-sentiments to ensure your launch achieves dominant vectors.",
    iconName: "TrendingUp",
    metrics: [
      { label: "Enterprise Valuation Added", value: "₹45B+" },
      { label: "Predictive Model Accuracy", value: "95.2%" },
      { label: "Finished Strategic Playbooks", value: "60+" }
    ],
    features: [
      "Competitor Gap Analysis & Auditing",
      "Market Launch Vectors & Growth Modeling",
      "C-Suite Advisory and Positioning Manuals",
      "Risk Mitigation and Scenario Simulations"
    ]
  },
  {
    id: "social_media",
    title: "Social Media Dominance",
    shortDescription: "High-impact social feeds, authoritative organic campaigns, and executive channels that direct market consensus.",
    longDescription: "We engineer social distribution blueprints that bypass platform fatigue. From authoritative founder-led LinkedIn journals to dynamic, hyper-viral corporate Twitter narratives, we construct interactive communities that command interest across the country.",
    iconName: "Sparkles",
    metrics: [
      { label: "Total Organic Impressions", value: "120M+" },
      { label: "Average Engagement Lift", value: "280%" },
      { label: "Advisors Administered", value: "40+" }
    ],
    features: [
      "Founder-Led LinkedIn Content Design",
      "Authoritative Corporate Social Presence",
      "High-Impact Campaign Blueprints",
      "Predictive Social Trend Hijacking"
    ]
  }
];

export const MARQUEE_CREDIBILITY = [
  { name: "Forbes", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Forbes_logo.svg" },
  { name: "TEDx", logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/TEDx_logo.svg" },
  { name: "Harvard Business Review", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Harper%27s_Magazine_logo.svg/800px-Harper%27s_Magazine_logo.png" }, // Simulated premium serif logo
  { name: "Inc", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Inc._magazine_logo.svg" },
  { name: "CNBC", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/CNBC_logo.svg" },
  { name: "TechCrunch", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/TechCrunch_logo.svg" },
  { name: "GQ", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/GQ_Magazine_Logo.svg" }
];

export const FRAMEWORK_STEPS = [
  {
    id: "connect",
    stepNumber: "01",
    title: "Connect",
    description: "Deep audit of core strategic bottlenecks, brand perception gaps, and social media feeds under absolute confidentiality.",
    iconName: "Link2",
    tagline: "DIAGNOSTIC ALIGNMENT"
  },
  {
    id: "challenge",
    stepNumber: "02",
    title: "Challenge",
    description: "Dismantling outdated identity assumptions, conducting digital pressure-test simulations, and preparing crisis strategies in our war-rooms.",
    iconName: "Zap",
    tagline: "TACTICAL STRIP-DOWN"
  },
  {
    id: "transform",
    stepNumber: "03",
    title: "Transform",
    description: "Deploying high-impact PR, modern typography systems, and launching authoritative organic social campaigns to command category dominance.",
    iconName: "ShieldAlert",
    tagline: "NARRATIVE LAUNCH"
  },
  {
    id: "sustain",
    stepNumber: "04",
    title: "Sustain",
    description: "Installing brand identity guidelines, interactive media templates, and long-term communication playbooks to preserve brand equity.",
    iconName: "Sparkles",
    tagline: "PERMANENT DOMINANCE"
  }
];

export const TESTIMONIALS = [
  {
    quote: "The Rishi Effect team possesses a singular, precise campaign architecture. They didn't just rebrand our national enterprise—they created a unified public consensus and social media momentum that added billions to our valuation.",
    name: "Vikram S. Singhania",
    role: "Chairman & Managing Director",
    company: "Singhania Group Holdings",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "We brought in The Rishi Effect for an intensive strategy war-room when we faced a critical brand reputation crisis. In forty-eight hours, they unified our entire public messaging and drafted an integrated social media and PR firewall strategy.",
    name: "Dr. Ananya Mehta",
    role: "Chief Executive Officer",
    company: "Astra Biotech India",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "The Rishi Effect's keynote presentation at our global summits was a masterclass in modern perception design. They showed our audience of business founders how integrated media leverage beats standard marketing noise in India's digital-first era.",
    name: "Marcus Aurelius Thorne",
    role: "Executive Producer",
    company: "Sovereign Capital Conference",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Their confidential brand advisory is absolute, proactive, and indispensable. If your business seeks permanent category dominance and real reputation protection, The Rishi Effect is the premier partner you must retain.",
    name: "Shyam Kishore Sen",
    role: "Principal Director",
    company: "Sen & Sons Family Offices",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "ev-mobility-revolution",
    title: "Dominating India's EV Shift With Zero Paid Ad Spend",
    client: "VoltDrive Mobility",
    verticalId: "automobile",
    serviceId: "pr",
    impactResult: "320,000+ Pre-orders registered in 14 days across India, driving 100% of factory capacity.",
    challenge: "VoltDrive, a hyper-ambitious Indian automotive player, faced heavy incumbent noise, public electric safety skepticism, and zero initial organic engagement on digital channels.",
    solution: "Applying our integrated PR and social media framework from Prayagraj, we engineered 'The Clean Air Alliance'. We bypassed traditional paid ad campaigns in favor of authoritative founder storytelling, national press previews, and high-visibility digital community building, establishing total national authority.",
    metrics: [
      { label: "Pre-Orders", value: "320K+" },
      { label: "Organic Impressions", value: "45M+" },
      { label: "Earned Press Value", value: "₹350M" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800",
    featured: true
  },
  {
    id: "resort-overhaul-branding",
    title: "Rebranding An Ancestral Estate Into India's Cleanest Sanctuary",
    client: "Aranya Luxury Wellness",
    verticalId: "hospitality",
    serviceId: "branding",
    impactResult: "Booking occupancy increased from 42% to 94% average, establishing a +115% room price premium.",
    challenge: "Aranya's ancestral retreats had beautiful locations but suffered from weak digital presence, outdated visual identity models, and dilution against international destinations.",
    solution: "We re-architected their entire brand legacy from our central office since 2015, deploying modern aesthetic guidelines (royal blue and ivory tones), premium copywriting, and high-status organic social media platforms to target high-net-worth travellers.",
    metrics: [
      { label: "Estate Occupancy", value: "94%" },
      { label: "Premium Gained", value: "2.15x" },
      { label: "Re-booking Index", value: "49%" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    featured: true
  }
];

export const INSIGHTS: Insight[] = [
  {
    id: "death-of-theatre-pr",
    title: "The Death of Fluff: Why Modern PR and Social Media Cannot Be Separated",
    excerpt: "Most agencies measure success via superficial vanity impressions. We look at integrated narrative mindshare, executive authority, and direct growth results.",
    content: "When traditional public relations agencies present you with dry metrics showing millions of hypothetical column-centimeter views on generic syndicates, they are selling theatre. In modern India, PR must be dynamically integrated with social media. Visionary founders of India's most ambitious companies leverage authoritative LinkedIn journals, coordinated Twitter dialogs, and high-tier business press simultaneously to own their category narratives.",
    category: "PR",
    readTime: "4 min read",
    date: "June 2, 2026",
    author: "Rishi",
    tags: ["PR Strategy", "Social Media", "Corporate Presence"]
  },
  {
    id: "color-psychology-royal-blue",
    title: "Sovereign Command: Building Category Leaders Since 2015",
    excerpt: "Why premium brands rely on rich colors, professional spacing, and high-contrast layouts to bypass sensory skepticism instantly across the country.",
    content: "We have been sculpting brand architectures across India from our Prayagraj headquarters since 2015. One foundational rule of executive positioning is architectural honesty. True premium branding does not rely on loud colors or trend chasing; it leverages deep contrast, high-status colors like Royal Blue, and elite typographic pairings that command instantaneous respect.",
    category: "Branding",
    readTime: "6 min read",
    date: "May 28, 2026",
    author: "Rishi",
    tags: ["Color Science", "Visual Identity", "Brand History"]
  },
  {
    id: "crisis-first-hour-playbook",
    title: "The Golden Hour: Integrated Crisis Strategies for India's Ambitious Brands",
    excerpt: "When immediate public crises or viral social media storms occur, learn the exact protocols of targeted narrative redirection.",
    content: "In a digital-first market, a crisis spreads across social feeds in minutes. Rushing to issue generic press declarations actually signals guilt. Our strategy war-room coordinates immediate narrative firewalls, combining media redirection with high-precision organic social responses to shape consensus before platforms command the tone.",
    category: "Strategy",
    readTime: "8 min read",
    date: "May 15, 2026",
    author: "Rishi",
    tags: ["Crisis Playbook", "Social Media Control", "Strategy"]
  }
];

export const VERTICALS: Vertical[] = [
  {
    id: "public-affairs",
    name: "Geopolitical & Public Affairs",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800",
    tagline: "Navigating regulatory structures and building trust.",
    description: "In high-stakes dialogue, timing and positioning are everything. We guide regulatory alignment and legislative narratives.",
    caseCount: 9
  },
  {
    id: "healthcare",
    name: "Biotech & Clinical Alliances",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    tagline: "Bridging complex clinical trust with warm consumer recall.",
    description: "We translate clinical research and bioscience developments into safety signals that secure durable consensus.",
    caseCount: 11
  }
];

