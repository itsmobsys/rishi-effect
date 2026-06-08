import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  Play, 
  ArrowUpRight, 
  ArrowUp, 
  FileText, 
  Quote, 
  Clock, 
  X, 
  Calendar,
  AlertTriangle,
  Camera,
  BookOpen,
  Instagram
} from "lucide-react";

import { OFFERINGS, SERVICES, INSIGHTS, TESTIMONIALS, VERTICALS, Offering } from "./data";
import { Insight } from "./types";

// Import custom extracted elements
import { Preloader } from "./components/Preloader";
import { InteractiveParticles } from "./components/InteractiveParticles";
import { SleekNavigation } from "./components/SleekNavigation";
import { CredibilityMarquee } from "./components/CredibilityMarquee";
import { OfferingModal } from "./components/OfferingModal";
import { ShowreelModal } from "./components/ShowreelModal";
import { SignatureFramework } from "./components/SignatureFramework";
import { TestimonialCarousel } from "./components/TestimonialCarousel";
import { ContactForm } from "./components/ContactForm";
import { CrisisSimulator } from "./components/CrisisSimulator";
import { SearchDashboard } from "./components/SearchDashboard";
import { AdminPortal } from "./components/AdminPortal";
import { PageNotFound } from "./components/PageNotFound";
import { FAQSection } from "./components/FAQSection";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeSection, setActiveSection] = useState("hero");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Set up SPA history detection and intercept click bindings
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    
    // Intercept default clicks on relative route triggers
    const handleAnchorLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a") || target.closest("button");
      if (anchor) {
        const href = anchor.getAttribute("href") || anchor.getAttribute("data-href");
        if (href && (href === "/admin" || href === "/")) {
          e.preventDefault();
          window.history.pushState(null, "", href);
          setCurrentPath(href);
          window.scrollTo(0, 0);
        }
      }
    };
    document.addEventListener("click", handleAnchorLink);
    
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleAnchorLink);
    };
  }, []);

  const navigateTo = (newPath: string) => {
    window.history.pushState(null, "", newPath);
    setCurrentPath(newPath);
    window.scrollTo(0, 0);
  };

  // Focus modal states
  const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  // Register secure unique viewer on initial mount
  useEffect(() => {
    let viewerId = localStorage.getItem("rishi_viewer_id");
    if (!viewerId) {
      viewerId = `viewer_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem("rishi_viewer_id", viewerId);
    }
    
    // Transmit unique identity to check/register
    fetch("/api/visitors/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ viewerId })
    }).catch((err) => {
      console.warn("Failed to register viewer footprint", err);
    });
  }, []);

  // Rotating slogans list hook
  const slogans = [
    "Elite PR & Narrative Defense.",
    "Bespoke Brand Architecture.",
    "Integrated Social Media Dominance.",
    "Strategic Growth since 2015.",
    "Prayagraj to Across the Country."
  ];
  const [sloganIdx, setSloganIdx] = useState(0);
  const [currentSloganText, setCurrentSloganText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = slogans[sloganIdx];
    const updateText = () => {
      if (!isDeleting) {
        setCurrentSloganText(fullText.substring(0, currentSloganText.length + 1));
        if (currentSloganText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setCurrentSloganText(fullText.substring(0, currentSloganText.length - 1));
        if (currentSloganText === "") {
          setIsDeleting(false);
          setSloganIdx((prev) => (prev + 1) % slogans.length);
          return;
        }
      }
      timer = setTimeout(updateText, isDeleting ? 40 : 85);
    };
    timer = setTimeout(updateText, 100);
    return () => clearTimeout(timer);
  }, [currentSloganText, isDeleting, sloganIdx]);

  // Stat auto-counter logic
  const [countingStats, setCountingStats] = useState({ years: 0, keynotes: 0, assetBillions: 0 });
  useEffect(() => {
    const handleScrollCount = () => {
      const el = document.getElementById("about-rishi");
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          const yearsTimer = setInterval(() => {
            setCountingStats((prev) => {
              if (prev.years >= 11) {
                clearInterval(yearsTimer);
                return prev;
              }
              return { ...prev, years: prev.years + 1 };
            });
          }, 60);

          const keynotesTimer = setInterval(() => {
            setCountingStats((prev) => {
              if (prev.keynotes >= 500) {
                clearInterval(keynotesTimer);
                return prev;
              }
              return { ...prev, keynotes: Math.min(prev.keynotes + 20, 500) };
            });
          }, 30);

          const assetTimer = setInterval(() => {
            setCountingStats((prev) => {
              if (prev.assetBillions >= 14) {
                clearInterval(assetTimer);
                return prev;
              }
              return { ...prev, assetBillions: prev.assetBillions + 1 };
            });
          }, 60);

          window.removeEventListener("scroll", handleScrollCount);
        }
      }
    };
    window.addEventListener("scroll", handleScrollCount);
    return () => window.removeEventListener("scroll", handleScrollCount);
  }, []);

  // Keyboard escape handlers
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSelectedOffering(null);
        setSelectedInsight(null);
        setIsSearchOpen(false);
        setIsShowreelOpen(false);
      }
    };
    window.addEventListener("keydown", handleGlobalKeys);
    return () => window.removeEventListener("keydown", handleGlobalKeys);
  }, []);

  // Track active section and scroll-to-top visibility
  useEffect(() => {
    const handleScrollStatus = () => {
      setShowScrollTop(window.scrollY > 600);

      const secs = ["hero", "about-rishi", "offerings", "framework", "testimonials", "sandbox-crisis", "insights", "contact"];
      for (const sectionId of secs) {
        const el = document.getElementById(sectionId);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 250 && r.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollStatus);
    return () => window.removeEventListener("scroll", handleScrollStatus);
  }, []);

  const handleSelectSearchResult = (category: string, targetId: string) => {
    if (category === "Service") {
      const targetOff = OFFERINGS[0]; // Map default service to Speaking offerings
      setSelectedOffering(targetOff);
    } else if (category === "Insights Blog") {
      const match = INSIGHTS.find((i) => i.id === targetId);
      if (match) setSelectedInsight(match);
    } else {
      const el = document.getElementById("offerings");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentPath === "/admin") {
    return (
      <div className="min-h-screen bg-[#0A0A0E] text-slate-100 font-sans tracking-tight relative overflow-hidden">
        <div className="bg-grain" />
        <AdminPortal onNavigateHome={() => navigateTo("/")} />
      </div>
    );
  }

  if (currentPath !== "/" && currentPath !== "" && currentPath !== "/index.html") {
    return (
      <div className="min-h-screen bg-brand-black text-slate-100 font-sans tracking-tight relative overflow-hidden">
        <PageNotFound onNavigateHome={() => navigateTo("/")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-slate-100 font-sans tracking-tight relative overflow-hidden">
      {/* 1. Global Preloader Animation overlay */}
      <Preloader />

      {/* Background film-grain and glowing particle layer */}
      <div className="bg-grain" />
      <InteractiveParticles />

      {/* 2. Glassmorphic Header Nav */}
      <SleekNavigation
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
      />

      {/* 3. HERO VIEWPORT AREA */}
      <header
        id="hero"
        className="min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden z-10"
      >
        <div className="max-w-5xl mx-auto text-center relative px-8 sm:px-14 md:px-0">
          
          {/* Shimmer Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-gray/80 rounded-full border border-royal-blue/30 px-4 py-1.5 mb-7.5 animate-shimmer shadow-lg shadow-royal-blue/5"
          >
            <Sparkles className="w-3.5 h-3.5 text-royal-blue animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#F8FAFC] font-semibold uppercase">
              PR • BRANDING • STRATEGY • SOCIAL MEDIA
            </span>
          </motion.div>

          {/* Main Headline with Cormorant/Playfair serif */}
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "-0.02em" }}
            animate={{ opacity: 1, letterSpacing: "0.01em" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-serif italic text-white uppercase font-black leading-[1.03] tracking-wide"
          >
            The Rishi Effect
          </motion.h1>

          {/* Typewriter text slogan loop (Only on PC / Big Displays to maximize mobile space) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="hidden lg:block min-h-[40px] mt-6.5"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-royal-blue font-mono tracking-wide">
              {currentSloganText}
              <span className="inline-block w-1.5 h-6 ml-1 bg-white animate-pulse" />
            </p>
          </motion.div>

          {/* Core Description Paragraph (Only on PC / Big Displays) */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="hidden lg:block text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-6 font-sans leading-relaxed"
          >
            The Rishi Effect is a premier PR, branding, strategy, and social media agency working with India's most ambitious businesses. Operating out of Prayagraj and delivering impact across the country since 2015. Outcomes, not theatre.
          </motion.p>



          {/* Premium Metallic styled Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-9 relative z-20"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto bg-gradient-to-r from-royal-blue to-royal-light hover:from-royal-light hover:to-royal-blue text-white hover:scale-[1.02] active:scale-95 font-mono text-xs font-black uppercase tracking-widest px-8.5 py-4 rounded-xl border border-royal-blue/30 shadow-lg shadow-royal-blue/15 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              Book Rishi Effect
            </a>
          </motion.div>
        </div>

        {/* Floating bottom arrow chevron indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 flex flex-col items-center gap-1.5 text-2xs font-mono tracking-widest text-[#94A3B8]/65 cursor-pointer select-none"
          onClick={() => {
            document.getElementById("about-rishi")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>ASCEND FURTHER</span>
          <ChevronDown className="w-4 h-4 text-royal-blue" />
        </motion.div>
      </header>

      {/* 4. MARQUEE & BRIEF PARALLAX INTRO SECTION */}
      <section className="relative z-10">
        <CredibilityMarquee />
        
        {/* Parallax Split-Text paragraph concept */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8 }}
            className="font-serif italic text-2xl sm:text-3.5xl md:text-4xl text-slate-100 leading-relaxed font-bold"
          >
            "The Rishi Effect operates as a <span className="text-royal-blue text-glow-blue">catalyst for brand growth</span> and public mindshare, forging communication systems of absolute category leadership."
          </motion.p>
        </div>
      </section>

      {/* 5. MEET RISHI ABOUT SECTION */}
      <section
        id="about-rishi"
        className="py-24 sm:py-32 border-t border-brand-border relative z-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Left side: Animated image with drop shadows and float */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85 }}
                animate={{
                  y: [0, -10, 0]
                }}
                // Slow continuous float movement
                className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden border border-royal-blue/20 shadow-[0_20px_50px_rgba(65,105,225,0.08)] bg-brand-gray block"
              >
                {/* Premium speaker portrait placeholder */}
                <img
                  src="https://images.unsplash.com/photo-1507152832244-10d45a7e3b93?auto=format&fit=crop&q=80&w=700"
                  alt="The Rishi Effect Campaign Board"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-[1.04] brightness-105"
                />
                
                {/* Visual grid / glint mesh overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute top-3.5 left-3.5 right-3.5 bottom-3.5 border border-royal-blue/15 rounded-2xl pointer-events-none z-10" />
              </motion.div>
            </div>

            {/* Right side: Biography & stat tickers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 text-left space-y-6"
            >

              <h2 className="text-3xl sm:text-5xl font-serif italic text-white font-black leading-tight uppercase">
                The Rishi Effect
              </h2>

              <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
                The Rishi Effect is a premier PR, branding, strategy, and social media agency working with India's most ambitious businesses. Operating out of Prayagraj and delivering impact across the country since 2015, we formulate absolute clarity and commanding presence for modern category captains, high-growth startups, and visionary leaders.
              </p>

              <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
                We believe executive transformation and brand authority are forged inside focused strategy war-rooms. By integrating elite public relations, visual storytelling design, and authoritative social media distribution, we transform public and digital perception into a permanent competitive advantage. Outcomes, not theatre.
              </p>

              {/* Ticking counter metrics */}
              <div className="grid grid-cols-3 gap-4.5 pt-6 border-t border-brand-border/80">
                <div className="text-left">
                  <span className="block text-2xl sm:text-4xl font-serif font-black text-royal-blue leading-none pb-1.5 text-glow-blue">
                    {countingStats.years}+ Years Active
                  </span>
                  <span className="block text-[9px] font-mono text-slate-505 uppercase tracking-widest font-semibold leading-snug">
                    ESTABLISHED IN 2015
                  </span>
                </div>

                <div className="text-left">
                  <span className="block text-2xl sm:text-4xl font-serif font-black text-royal-blue leading-none pb-1.5 text-glow-blue">
                    {countingStats.keynotes}+ Campaigns
                  </span>
                  <span className="block text-[9px] font-mono text-slate-505 uppercase tracking-widest font-semibold leading-snug">
                    ACROSS THE COUNTRY
                  </span>
                </div>

                <div className="text-left">
                  <span className="block text-2xl sm:text-4xl font-serif font-black text-royal-blue leading-none pb-1.5 text-glow-blue">
                    {countingStats.assetBillions}B+
                  </span>
                  <span className="block text-[9px] font-mono text-slate-505 uppercase tracking-widest font-semibold leading-snug">
                    VALUATION CREATED
                  </span>
                </div>
              </div>

              {/* Blockquote pullout with sweeping glass glint hover */}
              <div className="relative group p-5 bg-brand-gray/65 border border-brand-border rounded-2xl overflow-hidden mt-8">
                {/* Hover glow line sweep */}
                <div className="absolute top-0 left-0 w-[2px] h-full bg-royal-blue transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                
                <h4 className="font-serif italic text-slate-200 text-sm leading-relaxed relative z-10 text-left font-medium">
                  "Brand dominance isn't given; it is strategically formulated. The enterprises India remembers are those that master silent precision before launching authoritative national narratives."
                </h4>
                
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-royal-blue uppercase tracking-widest mt-3.5 relative z-10">
                  <Quote className="w-3.5 h-3.5 shrink-0 rotate-180" />
                  <span>The Rishi Effect Mandate</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. SERVICES / OFFERINGS CARDS GRID */}
      <section
        id="offerings"
        className="py-24 sm:py-32 border-t border-brand-border bg-brand-gray/20 backdrop-blur-[2px] relative z-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-5xl font-serif italic text-white font-black mt-4 uppercase pb-1 leading-tight">
              Our Services & Offerings
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-450 max-w-xl mx-auto mt-3.5 leading-relaxed font-sans">
              Modular campaigns engineered to optimize public relations, brand architecture, strategic growth, and social media dominance. Click to expand details.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-12 text-left">
            {OFFERINGS.map((off, oIdx) => (
              <motion.div
                key={off.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: oIdx * 0.15 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedOffering(off)}
                className="bg-brand-gray border border-brand-border/90 rounded-2xl p-6.5 sm:p-8 flex flex-col justify-between hover:border-royal-blue/45 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_15px_30px_rgba(65,105,225,0.06)] relative group overflow-hidden"
              >
                {/* Decorative border highlight sweep */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-royal-blue to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div>
                  <div className="w-11 h-11 rounded-lg bg-brand-black border border-brand-border text-royal-blue flex items-center justify-center mb-6.5 shrink-0 group-hover:bg-royal-blue group-hover:text-white transition-all shadow-inner">
                    {off.id === "speaking" ? <Quote className="w-5 h-5 fill-current" /> : off.id === "coaching" ? <Sparkles className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  </div>

                  <h3 className="font-serif italic text-xl text-white font-extrabold mb-1.5 leading-snug">
                    {off.title}
                  </h3>

                  <p className="text-[10px] font-mono text-royal-blue uppercase tracking-wider font-extrabold pb-3 mb-4 border-b border-brand-border/40">
                    {off.tagline}
                  </p>

                  <p className="text-2xs sm:text-xs text-[#94A3B8] leading-relaxed mb-6 font-sans">
                    {off.shortDesc}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-border/30">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-black">
                    ACTIVATE_ALIGNMENT
                  </span>
                  <span className="text-royal-gold hover:translate-x-1.5 transition-transform flex items-center gap-1 font-mono text-[10px] font-bold">
                    <span>LEARN MORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. THE RISHI EXPERIENCE SIGNATURE TIMELINE */}
      <section
        id="framework"
        className="py-24 sm:py-32 border-t border-brand-border relative z-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-14.5"
          >
            <h2 className="text-3xl sm:text-5xl font-serif italic text-white font-black mt-4 uppercase pb-1 leading-tight">
              The Rishi Effect Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-455 max-w-xl mx-auto mt-3.5 leading-relaxed font-sans">
              A chronological sequence of high-impact strategic milestones, leading to permanent category leadership and public authority.
            </p>
          </motion.div>

          <SignatureFramework />
        </div>
      </section>

      {/* 8. TESTIMONIAL CAROUSEL */}
      <section
        id="testimonials"
        className="py-24 sm:py-32 border-t border-brand-border bg-brand-gray/10 backdrop-blur-[2px] relative z-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase font-bold border border-brand-border px-3 py-1 bg-brand-gray rounded-full">
              VALIDATED BRAND ENDORSEMENTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif italic text-white font-black mt-4 uppercase pb-1 leading-tight">
              Trusted by the Vanguard
            </h2>
            <p className="text-xs sm:text-sm text-slate-450 max-w-xl mx-auto mt-3 leading-relaxed font-sans">
              Objective operational accounts of narrative restructuring, high-impact campaigns, and brand legacy preservation across the country.
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* 9. TACTICAL CRISIS DISASTER SIMULATOR SANDBOX (INTEGRATED EXCLUSIVE PORTFOLIO INTERACTION) */}
      <section
        id="sandbox-crisis"
        className="py-24 sm:py-32 border-t border-brand-border bg-brand-black/40 relative z-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono tracking-widest text-royal-blue uppercase font-black border border-royal-blue/20 px-3 py-1 bg-royal-blue/5 rounded-full">
              The Rishi Effect Sandbox
            </span>
            <h2 className="text-3xl sm:text-4.5xl font-serif italic text-white font-black mt-4 uppercase pb-1">
              Crisis Briefing Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-450 max-w-xl mx-auto mt-3.5 leading-relaxed font-sans">
              Test your corporate communications defense index in real-time under simulated PR and social media crisis scenarios.
            </p>
          </motion.div>

          <CrisisSimulator />
        </div>
      </section>

      {/* 10. NOTABLE INSIGHTS / BLOG GRID */}
      <section
        id="insights"
        className="py-24 sm:py-32 border-t border-brand-border relative z-10 px-4 sm:px-6 lg:px-8 bg-brand-gray/10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4"
          >
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase font-bold border border-brand-border px-3 py-1 bg-brand-gray rounded-full">
                EXCLUSIVE AGENCY BRAND INSIGHTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif italic text-white font-black mt-4 uppercase pb-1 leading-none">
                Latest Insights
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-royal-blue to-transparent mt-4 rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {INSIGHTS.map((ins, iIdx) => (
              <motion.div
                key={ins.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: iIdx * 0.1 }}
                onClick={() => setSelectedInsight(ins)}
                className="bg-brand-gray border border-brand-border rounded-2xl overflow-hidden shadow-lg cursor-pointer group flex flex-col justify-between"
              >
                {/* Visual placeholder box */}
                <div className="aspect-[16/10] bg-brand-black border-b border-brand-border relative overflow-hidden flex items-center justify-center p-6 bg-gradient-to-b from-brand-gray to-brand-black">
                  <div className="absolute inset-0 bg-royal-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <span className="p-3 bg-brand-gray border border-brand-border rounded-xl text-royal-blue group-hover:scale-110 transition-transform shadow flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </span>

                  <span className="absolute bottom-3 left-3 text-[9px] font-mono font-bold uppercase py-1 px-2.5 rounded bg-brand-gray/90 border border-brand-border/60 text-royal-blue">
                    {ins.category}
                  </span>
                </div>

                <div className="p-6 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest block mb-1.5">
                      {ins.date} • {ins.readTime}
                    </span>
                    
                    <h3 className="font-serif italic text-lg sm:text-xl text-white font-extrabold group-hover:text-royal-blue transition-colors duration-300 leading-snug">
                      {ins.title}
                    </h3>

                    <p className="text-2xs sm:text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3 font-sans">
                      {ins.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-royal-blue font-mono text-2xs font-extrabold uppercase mt-6 pt-3.5 border-t border-brand-border/30">
                    <span>ACCESS BRIEFING</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 duration-300 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10.5 FREQUENTLY ASKED QUESTIONS SECTION */}
      <FAQSection />

      {/* 11. CONTACT / BOOK RISHI CODES */}
      <section
        id="contact"
        className="py-24 sm:py-32 border-t border-brand-border relative z-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* 12. MINIMALIST DARK FOOTER */}
      <footer className="bg-brand-black border-t border-brand-border relative z-10 py-12 px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1 px-1.5 bg-royal-blue/15 border border-royal-blue/40 rounded text-royal-blue font-mono text-[9px] uppercase font-bold tracking-widest">
                RE
              </span>
              <span className="font-display font-black tracking-widest text-sm text-slate-100">
                THE RISHI EFFECT
              </span>
            </div>
            
            <a
              href="https://www.instagram.com/therishieffect"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-brand-gray border border-brand-border text-slate-400 hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(225,48,108,0.2)] duration-300"
              title="Follow our Instagram Page"
              aria-label="Instagram Link"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick links block */}
          <div className="flex flex-wrap justify-center gap-6 text-2xs font-mono text-slate-500 uppercase tracking-widest">
            <a href="#about-rishi" className="hover:text-royal-blue transition-colors">ABOUT</a>
            <a href="#offerings" className="hover:text-royal-blue transition-colors">SERVICES & OFFERINGS</a>
            <a href="#framework" className="hover:text-royal-blue transition-colors">THE FRAMEWORK</a>
            <a href="#sandbox-crisis" className="hover:text-royal-blue transition-colors">CRISIS SIMULATOR</a>
            <a href="#insights" className="hover:text-royal-blue transition-colors">AGENCY INSIGHTS</a>
            <a href="#faq" className="hover:text-royal-blue transition-colors">FAQ</a>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-full bg-brand-gray border border-brand-border hover:bg-royal-blue hover:text-white text-slate-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow focus:outline-none"
            title="Return to peak"
            aria-label="Back to peak"
          >
            <ArrowUp className="w-4 h-4 shrink-0" />
          </button>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-brand-border/40 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-505">
          <p className="flex flex-wrap items-center justify-center sm:justify-start gap-1 pb-2 sm:pb-0 select-none whitespace-normal">
            <span>© 2015-2026 THE RISHI EFFECT. ALL RIGHTS RESERVED.</span>
            <span className="text-slate-600/65 mx-1.5 font-bold">|</span>
            <button
              onClick={() => navigateTo("/admin")}
              className="text-slate-500 hover:text-royal-blue transition-colors font-bold uppercase tracking-widest cursor-pointer focus:outline-none flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
              AGENCY CONSOLE
            </button>
          </p>
          <p className="mt-2 sm:mt-0 uppercase font-bold">PRAYAGRAJ • ACROSS THE COUNTRY</p>
        </div>
      </footer>

      {/* Floating Small widget Scroll-To-Top trigger */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-gradient-to-r from-royal-blue to-royal-light hover:from-royal-light hover:to-royal-blue border border-royal-blue/30 hover:shadow-[0_0_15px_rgba(65,105,225,0.4)] text-white flex items-center justify-center shadow-lg transition-all cursor-pointer focus:outline-none"
            title="Scroll back to top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4.5 h-4.5 shrink-0" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- ALL INVISIBLE MODAL OVERLAYS --- */}

      {/* Offering Programs Expansion Drawer Modal */}
      <OfferingModal
        offering={selectedOffering}
        onClose={() => setSelectedOffering(null)}
      />

      {/* Cinematic Showreel Trailer Embed Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* General Site Database Command K Search Engine panel overlay */}
      <SearchDashboard
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />



      {/* Individual Notable Insight Blog Detailed Sheet overlay modal */}
      <AnimatePresence>
        {selectedInsight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInsight(null)}
              className="absolute inset-0 bg-brand-black/90 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="bg-brand-gray border border-brand-border w-full max-w-2xl rounded-2xl p-6 sm:p-9.5 md:p-11 overflow-y-auto max-h-[85vh] shadow-[0_20px_50px_rgba(0,0,0,0.95)] relative z-10 text-left"
            >
              {/* Close button */}
              <div className="absolute top-4 right-4 animate-shimmer">
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="p-1 px-2.5 rounded bg-brand-black border border-brand-border hover:bg-royal-blue hover:text-white transition-all text-slate-300 flex items-center gap-1 text-2xs font-mono font-bold cursor-pointer"
                  aria-label="Close insight"
                >
                  <span>ESC</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mb-4">
                <span className="p-1 px-2 rounded bg-royal-blue/15 border border-royal-blue/25 text-royal-blue font-mono text-[9px] uppercase tracking-wider font-extrabold select-none">
                  THEORETICAL BRIEFING
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2">
                  {selectedInsight.date} • {selectedInsight.readTime}
                </span>
              </div>

              <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-black leading-tight mb-4 uppercase">
                {selectedInsight.title}
              </h3>

              <p className="text-xs font-mono text-royal-blue uppercase tracking-wider mb-6 pb-2.5 border-b border-brand-border/40">
                AUTHOR: {selectedInsight.author} • CATEGORY: {selectedInsight.category}
              </p>

              <div className="text-sm text-slate-300 font-sans leading-relaxed space-y-4 mb-8">
                <p className="font-bold text-[#F8FAFC]">{selectedInsight.excerpt}</p>
                <p>{selectedInsight.content}</p>
                <p>Establishing narrative firewalls during initial operational shifts allows leaders to govern significant market sectors without the typical media overhead. This protocol is discussed and implemented live inside C-suite advisory war-rooms.</p>
              </div>

              <div className="border-t border-[#22222A]/60 pt-5 flex items-center justify-between">
                {/* Visual tags loop */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedInsight.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono uppercase bg-brand-black border border-brand-border px-2 py-0.5 rounded text-slate-500">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="font-mono text-2xs uppercase text-[#94A3B8] hover:text-white transition-colors flex items-center gap-1"
                >
                  Close Briefing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
