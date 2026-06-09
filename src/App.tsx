/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  ArrowRight, 
  Flame, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  Play, 
  Pause,
  ArrowDown,
  Trophy,
  Star,
  Phone
} from "lucide-react";

import { AudioEngine } from "./components/AudioEngine";
import CustomCursor from "./components/CustomCursor";
import GrainOverlay from "./components/GrainOverlay";
import ThreeCanvas from "./components/ThreeCanvas";
import WarRoomMeters from "./components/WarRoomMeters";
import BentoServices from "./components/BentoServices";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import RoiCalculator from "./components/RoiCalculator";
import ContactForm from "./components/ContactForm";
import FirstVisitGreeting from "./components/FirstVisitGreeting";
import AdminPanel from "./components/AdminPanel";

// Milestone timeline checkpoints
const MILESTONES = [
  { year: "2018", title: "Genesis", desc: "Started experimenting with short-form algorithms & rapid visual storytelling." },
  { year: "2020", title: "Scale Phase", desc: "Built 12 category-leader personal brands, unlocking 100M+ views cumulatively." },
  { year: "2022", title: "Agency Shift", desc: "Inaugurated The Rishi Effect agency model, coordinating 30+ growth portfolios." },
  { year: "2024", title: "Outright Dominance", desc: "Crossed 53+ highly active scale campaigns with absolute category authority." }
];

// Interactive client speech list
const DM_TESTIMONIALS = [
  {
    id: "dm_1",
    senderName: "Arjun Mehta",
    senderHandle: "@arjun_creates",
    avatarUrl: "https://picsum.photos/seed/arjun/100/100",
    message: "Bro the hook scripting guide you built literally doubled my average retention overnight. 3 videos crossed 300k+ views in one week. Unreal! 🤯",
    replyMessage: "Told you, man! It is pure positioning mechanics. Let's scale it further! 🔥",
    timestamp: "10:42 AM",
    stars: 5,
  },
  {
    id: "dm_2",
    senderName: "Priya Sharma",
    senderHandle: "@priya_sharma_hq",
    avatarUrl: "https://picsum.photos/seed/priya/100/100",
    message: "Literally got 14 qualified corporate inbound leads inside our DM funnel within 14 days of running the content roadmap. Never spending a dime on ads again.",
    replyMessage: "Organic compounding always beats paid ad friction. Let's close those deals! 🚀",
    timestamp: "Yesterday",
    stars: 5,
  },
  {
    id: "dm_3",
    senderName: "Vikram R.",
    senderHandle: "@vik_tech_growth",
    avatarUrl: "https://picsum.photos/seed/vik/100/100",
    message: "Just signed two premium multi-lakh retainers solely because of our personal brand credibility on LinkedIn. The ROI is already 10x.",
    replyMessage: "Credibility works while you sleep. Proud of what we built, Vik!",
    timestamp: "2 days ago",
    stars: 5,
  }
];

// Process Stages Details
const PROCESS_PHASES = [
  { num: "01", title: "We Dig Deep", desc: "Audit your existing metrics, analyze algorithm friction, scan competitor loops, and map the absolute gap in the market." },
  { num: "02", title: "The Blueprint", desc: "Draft a custom content structure manual. No template models, purely personalized messaging guidelines." },
  { num: "03", title: "We Go to War", desc: "Relentless content execution, pristine video production edits, active scheduling, and narrative distribution structures." },
  { num: "04", title: "Reach Scale", desc: "Track subscriber indices, follower retention curves, views, inbound messaging leads, and organic pipelines." },
  { num: "05", title: "Multiply", desc: "Iterate on analytics feedback, double-down on high-traction angles, and deploy high-ticket funnels to scale returns." }
];

export default function App() {
  // Global States
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [visitorName, setVisitorName] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Routing state for /admin router
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    const interval = setInterval(handleLocationChange, 500);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      clearInterval(interval);
    };
  }, []);
  
  // Hero dynamic stats & Typewriter
  const [liveCounter, setLiveCounter] = useState(42047);
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Marketing Expert", "Brand Strategist", "Viral Growth Hacker", "Content Architect"];

  // Interactive story tab selection
  const [storyStep, setStoryStep] = useState(0);

  // Easter egg counter
  const [copyrightClicks, setCopyrightClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // DM Carousel States
  const [activeDmIdx, setActiveDmIdx] = useState(0);

  // Video Testimonial Play State
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Loading Screen Progression (Exactly 2.5 seconds total)
  useEffect(() => {
    const duration = 2300; // 2.3 seconds loading compile
    const intervalTime = 23;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.round((currentStep / steps) * 100));
      setLoadProgress(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Soft delay for reveal splitting curtain
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Sync scroll percentage indicator
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      setScrollProgress(window.scrollY / totalHeight);
    };
    window.addEventListener("scroll", handleScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollProgress);
  }, []);

  // Typewriter Loop
  useEffect(() => {
    if (loading) return;
    
    let isDeleting = false;
    let charIndex = 0;
    let timer: NodeJS.Timeout;

    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        setRoleText(currentRole.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setRoleText(currentRole.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 45 : 95;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 1800; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setRoleIndex((prev) => (prev + 1) % roles.length);
        speed = 500; // Short pause before next word
      }

      timer = setTimeout(type, speed);
    };

    timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, [loading, roleIndex]);

  // Live Community stat TICK up (Simulating viral feed live)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Sound Controller Toggle
  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    AudioEngine.setMute(!nextState);
  };

  // Toggle Theme Switcher (Modifies CSS vars seamlessly)
  const handleToggleTheme = () => {
    AudioEngine.playTick();
    const nextDarkState = !isDarkMode;
    setIsDarkMode(nextDarkState);
    
    const root = document.documentElement;
    if (nextDarkState) {
      root.style.setProperty("--color-void", "#0A0A0A");
      root.style.setProperty("--color-cream", "#F5F0E8");
      root.style.setProperty("--color-abyss", "#111118");
      root.style.setProperty("--color-smoke", "#1C1C1C");
    } else {
      root.style.setProperty("--color-void", "#F4EFE6"); // Deep luxury off white
      root.style.setProperty("--color-cream", "#121212"); // Pitch text
      root.style.setProperty("--color-abyss", "#ECE7DE"); // Soft cream cards bg
      root.style.setProperty("--color-smoke", "#E0DCD2"); // Borders/dividers
    }
  };

  // Easter Egg clicked action handler
  const handleCopyrightClick = () => {
    AudioEngine.playTick();
    const clicks = copyrightClicks + 1;
    setCopyrightClicks(clicks);

    if (clicks >= 3) {
      AudioEngine.playChimeChord();
      setShowEasterEgg(true);
      setCopyrightClicks(0);
      triggerConfettiBurst();
    }
  };

  // Micro client-side confetti particles dispatcher canvas loop
  const triggerConfettiBurst = () => {
    const canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; color: string; r: number }[] = [];
    const colors = ["#0062FF", "#00D5FF", "#C9A84C", "#FFFFFF"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        r: Math.random() * 5 + 3,
      });
    }

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.vy += 0.22; // Gravity mapping
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      if (frame < 120) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    draw();
  };

  if (currentPath === "/admin" || currentPath === "/admin/" || window.location.hash === "#/admin") {
    return (
      <div className={`selection:bg-orange-500 selection:text-white transition-colors duration-500 relative ${isDarkMode ? "dark" : ""}`}>
        <CustomCursor />
        <GrainOverlay />
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className={`selection:bg-orange-500 selection:text-white transition-colors duration-500 relative ${isDarkMode ? "dark" : ""}`}>
      
      {/* GLOBAL HUD DESIGN METRICS */}
      <CustomCursor />
      <GrainOverlay />
      
      {/* Hidden static canvas wrapper for confetti bursts */}
      <canvas id="confetti-canvas" className="fixed inset-0 pointer-events-none z-[13000]" />

      {/* Top 2px Progress bar indicators */}
      <div 
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-[#0062FF] via-[#00D5FF] to-[#C9A84C] z-[10001] transition-all duration-75"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* 2.5 SECOND MAX FIRST INTRO LOADER SCREEN */}
      {loading && (
        <div className="fixed inset-0 bg-black z-[12000] flex flex-col justify-between items-center p-8 select-none transition-colors duration-500">
          
          {/* Top banner: Only show in second phase */}
          <div className={`w-full flex justify-between font-mono text-[9px] tracking-widest uppercase transition-all duration-500 ${loadProgress >= 45 ? "opacity-100 text-[#0062FF]/80" : "opacity-0 text-[#0062FF]/0"}`}>
            <span>SECURE SYSTEM COMPILE</span>
            <span>GRID COGNITION: ONLINE</span>
          </div>

          {/* Core visual drawing text */}
          <div className="text-center space-y-4">
            {/* SVG Draw Logo Vector: First state is centered & glowing blue, pulses based on loading progress */}
            <div className={`transition-all duration-700 transform ${loadProgress < 45 ? "scale-125 translate-y-8" : "scale-100"}`}>
              <svg 
                className={`w-20 h-20 mx-auto stroke-[#0062FF] fill-none stroke-2 transition-all duration-500 filter drop-shadow-[0_0_15px_rgba(0,114,255,0.6)]`} 
                viewBox="0 0 50 50"
              >
                <path d="M10 10 L40 10 L25 40 Z" />
                <circle cx="25" cy="22" r="6" />
              </svg>
            </div>

            {/* Title: Transition in together with the second phase */}
            <h1 className={`font-display text-2xl md:text-3xl font-black tracking-widest uppercase py-2 transition-all duration-500 ${loadProgress >= 45 ? "opacity-100 scale-100 text-white" : "opacity-0 scale-95 text-white/25"}`}>
              THE RISHI EFFECT
            </h1>
          </div>

          {/* Bottom details: Transition/reveal only in second phase which is colored in nice blue */}
          <div className={`w-full max-w-md space-y-3 transition-all duration-500 ${loadProgress >= 45 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex justify-between font-mono text-[10px] text-white/50 tracking-wider">
              <span className="text-[#00D5FF] font-black animate-pulse">LOADING SYSTEMS...</span>
              <span className="font-bold text-[#0062FF]">{loadProgress}%</span>
            </div>
            
            {/* Blue Progress Bar */}
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#0062FF] to-[#00D5FF] transition-all duration-75 shadow-[0_0_8px_rgba(0,98,255,0.5)]"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            
            <div className="text-center font-mono text-[8px] text-[#0062FF]/50 tracking-widest uppercase">
              CREATIVE DISTRIBUTION CAMPAIGN MODEL v9.16
            </div>
          </div>
        </div>
      )}

      {/* FIRST-TIME ENTRANCE VISIT SIGN GREETING */}
      <FirstVisitGreeting onNameSubmitted={(name) => setVisitorName(name)} />

      {/* EASTER EGG BONUS MODAL POPUP */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-[11100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-void/90 backdrop-blur-md" onClick={() => setShowEasterEgg(false)} />
          <div className="bg-[#111118] border border-[#C9A84C] rounded-2xl p-8 max-w-md text-center space-y-6 relative shadow-[0_0_50px_rgba(201,168,76,0.3)] z-10 animate-scaleIn">
            <Trophy className="w-16 h-16 text-[#C9A84C] mx-auto animate-bounce" />
            
            <h4 className="font-display text-xl font-extrabold text-white tracking-tight leading-none uppercase">
              EASTER EGG DETECTED!
            </h4>
            <p className="font-sans text-xs text-[#F5F0E8]/70 leading-relaxed uppercase tracking-wide">
              You clicked the copyrighted bottom anchor 3 times. As a reward, Rishi's system has unlocked his high-concept brand blueprint audits!
            </p>

            <div className="bg-void p-4 border border-[#0062FF]/40 rounded-xl text-center">
              <span className="block font-mono text-[10px] text-[#00D5FF] font-black uppercase tracking-widest mb-1.5 flex items-center justify-center space-x-1">
                <span>⚡ MASTER BRAND AUDIT MANUAL</span>
              </span>
              <span className="block font-sans text-xs text-[#F5F0E8]/40 mb-3">18 pages of detailed scripting guides, loop frameworks, and monetization checklists.</span>
              
              <a 
                href="/docs/brand_audit_manifesto.pdf"
                download
                onClick={() => {
                  AudioEngine.playTick();
                  setShowEasterEgg(false);
                }}
                className="block text-center py-2.5 bg-gradient-to-r from-[#0062FF] to-[#00D5FF] hover:opacity-90 text-white font-mono text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all"
              >
                DOWNLOAD AUDIT LIST PDF
              </a>
            </div>

            <button 
              onClick={() => setShowEasterEgg(false)}
              className="font-mono text-[9px] text-[#F5F0E8]/30 hover:text-white uppercase tracking-widest underline"
            >
              CLOSE DEPLOYED GATE
            </button>
          </div>
        </div>
      )}

      {/* FLOATING CONTROL ACTIONS BAR (NAV BAR AREA) */}
      <header className="sticky top-0 left-0 w-full bg-void/45 backdrop-blur-lg border-b border-white/[0.04] z-[9990] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between">
          
          {/* Brand Logo & First-time Welcome Greet */}
          <div className="flex items-center space-x-4">
            <a href="#" className="font-sans text-xl md:text-2xl font-black tracking-tighter text-[#F5F0E8] uppercase hover:text-white transition-colors flex items-center space-x-2">
              <span>The Rishi <span className="text-[#0062FF]">Effect</span></span>
            </a>

            {/* Persistence greetings identifier label */}
            {visitorName && (
              <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 bg-[#0062FF]/10 border border-[#0062FF]/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] text-[#00D5FF] tracking-wider uppercase font-bold">
                  GREETS // {visitorName.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Control widgets block */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick action list for navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase mr-6">
              <a href="#services-arsenal" className="hover:text-[#0062FF] text-[#F5F0E8]/80 transition-all uppercase">Services</a>
              <a href="#the-process-stage" className="hover:text-[#0062FF] text-[#F5F0E8]/80 transition-all uppercase">Strategy</a>
              <a href="#result-reports" className="hover:text-[#0062FF] text-[#F5F0E8]/80 transition-all uppercase">Case Studies</a>
              <a href="#brand-intel-quiz" className="hover:text-[#0062FF] text-[#F5F0E8]/80 transition-all uppercase">Growth Quiz</a>
            </nav>



            {/* Book Now top CTA from Design HTML */}
            <a 
              href="#contact"
              style={{ contentVisibility: "auto" }}
              className="px-4 py-1.5 border border-[#F5F0E8] text-[10px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-[#F5F0E8] hover:text-black transition-all"
            >
              Work With Me
            </a>

          </div>
        </div>
      </header>

      {/* SECTION 01 // CORE DEEP CINEMATIC HERO */}
      <section className="relative min-h-[calc(100vh-68px)] w-full flex items-center justify-center overflow-hidden py-16">
        
        {/* Floating Rotating Three Canvas Wireframe Globe & Sparks */}
        <ThreeCanvas />

        {/* Diagonal skewed visual hero photo on right for larger screens */}
        <div className="absolute right-12 bottom-12 w-[420px] h-[580px] lg:block hidden z-10 select-none overflow-hidden skew-x-[-4deg] bg-[#111118] border-l border-t border-[#0062FF]/30 rounded-lg">
          {/* Gradient backdrop overlays from design */}
          <div className="absolute inset-0 bg-gradient-to-tr from-void to-transparent opacity-80 z-10 pointer-events-none" />
          
          {/* Repeating linear gradient pattern (scanlines) from design */}
          <div className="absolute inset-0 grayscale opacity-40 mix-blend-overlay z-[12] pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, #0A0A0A, #0A0A5A 1px, transparent 1px, transparent 2px)", backgroundSize: "100% 2px" }} />
          
          {/* Decorative Elements from design */}
          <div className="absolute top-10 right-10 text-right z-20 pointer-events-none">
            <div className="text-[110px] font-black text-white/5 leading-none tracking-tighter select-none font-sans">RRR</div>
            <div className="text-[9px] font-mono text-[#0062FF] tracking-[0.4em] uppercase font-bold">Personal Branding Architect</div>
          </div>

          {/* Photo Image embedded */}
          <img 
            src="/src/assets/images/rishi_portrait_1780987074152.png" 
            alt="Ristunjay Rao Rajput Portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-[1.03] transition-transform duration-[2000ms] grayscale opacity-75 group-hover:scale-100"
          />
        </div>

        {/* Content Centered Stack */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 relative z-20 flex flex-col justify-center min-h-[500px]">
          
          <div className="max-w-xl md:max-w-3xl text-left space-y-6">
            
            {/* Animated small tagline pill */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0062FF] animate-pulse"></span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#F5F0E8]/60">Marketing · Branding · Viral Growth</span>
            </div>

            {/* Major word staged H1 Headline - Bold Design Theme */}
            <h1 className="font-sans text-[52px] sm:text-[72px] md:text-[88px] leading-[0.85] font-black uppercase tracking-tighter py-1">
              I Don't Just<br />Market. I Make<br />You <span className="text-[#0062FF] italic">Unforgettable.</span>
            </h1>

            {/* Typewriter text block */}
            <div className="flex items-center space-x-2 font-mono text-xs sm:text-sm text-cream/70 select-none tracking-wider uppercase font-bold">
              <span>ACTIVE ROLE //</span>
              <span className="text-[#0062FF] font-black pr-1 animate-pulse">
                {roleText.toUpperCase()}
              </span>
            </div>

            {/* Dual interactive design stats layout block */}
            <div className="flex flex-wrap items-center gap-8 md:gap-10 pb-4 select-none">
              <div className="flex flex-col">
                <span className="text-[26px] md:text-[28px] font-mono font-bold text-[#0062FF] leading-none">53+</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#F5F0E8]/50 mt-1">Clients Scaled</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[26px] md:text-[28px] font-mono font-bold text-[#0062FF] leading-none">
                  {liveCounter.toLocaleString("en-IN")}+
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#F5F0E8]/50 mt-1">Live Community</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[26px] md:text-[28px] font-mono font-bold text-[#0062FF] leading-none">3.4x</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#F5F0E8]/50 mt-1">Avg Engagement</span>
              </div>
            </div>

            {/* Dual Hero CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#contact"
                style={{ contentVisibility: "auto" }}
                data-magnetic
                className="px-10 py-4 bg-[#0062FF] hover:bg-[#0062FF]/95 text-white font-mono text-xs font-black uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(0,98,255,0.35)] text-center hover:shadow-[0_0_24px_rgba(0,98,255,0.5)] transform hover:scale-[1.02]"
              >
                ⚡ START THE EFFECT
              </a>
              <a 
                href="#services-arsenal"
                data-magnetic
                className="px-10 py-4 border border-white/20 hover:bg-[#F5F0E8] hover:text-black text-[#F5F0E8] font-mono text-xs font-black uppercase tracking-widest transition-all text-center transform hover:scale-[1.02]"
              >
                WATCH STORY
              </a>
            </div>

          </div>
        </div>

        {/* Animated downward arrow bouncing indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 z-20 pointer-events-none opacity-45 select-none animate-bounce">
          <span className="font-mono text-[8px] uppercase tracking-widest text-[#F5F0E8]/50">SCROLL TO UNLOCK</span>
          <ArrowDown className="w-4 h-4 text-[#0062FF]" />
        </div>

      </section>

      {/* SECTION 02 // SKEWED FIRE MARQUEE RUNNERS */}
      <section className="relative h-28 w-full bg-[#111118] overflow-hidden flex flex-col justify-center border-y border-white/[0.04] z-30 transform -skew-y-2 mt-4">
        
        {/* Strip 1 moves left. Black BG, cream text */}
        <div className="bg-void/90 py-1.5 border-y border-white/[0.03] select-none text-xs sm:text-sm tracking-widest font-mono uppercase font-black overflow-hidden flex items-center">
          <div className="animate-marquee-left flex whitespace-nowrap space-x-12">
            {Array(4).fill([
              "MARKETING ◆ BRANDING ◆ GROWTH ◆ VIRAL CONTENT ◆ SOCIAL MEDIA ◆ 53+ CLIENTS ◆ 8 YEARS",
            ]).flatMap((txt, idx) => (
              <span key={idx} className="flex items-center space-x-6">
                <span className="text-[#0062FF]">⚡</span>
                <span>{txt}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Strip 2 moves right. Ember BG, black text */}
        <div className="bg-[#0062FF] py-1.5 select-none text-xs sm:text-sm tracking-widest font-mono uppercase font-black overflow-hidden flex items-center text-void">
          <div className="animate-marquee-right flex whitespace-nowrap space-x-12">
            {Array(4).fill([
              "THE RISHI EFFECT ◆ DOMINATE YOUR MARKET ◆ VIRAL CODE ◆ CONVERSION FUELS ◆ PERSISTENCE",
            ]).flatMap((txt, idx) => (
              <span key={idx} className="flex items-center space-x-6">
                <span>⚡</span>
                <span>{txt}</span>
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* SECTION 03 // THE EFFECT STORIES (3 PHASE INTERACTIVE CONTAINER) */}
      <section 
        id="the-process-stage"
        className="py-24 px-4 md:px-12 bg-void border-b border-white/[0.04] relative z-20"
      >
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left selector menu with details and descriptions */}
            <div className="lg:col-span-5 space-y-8 select-none">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1.5 rounded-full border border-[#C9A84C]/20 mb-4 tracking-widest uppercase">
                  <span>CHRONICLES // THE STORY</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-black text-[#F5F0E8] tracking-tight uppercase leading-none">
                  THE RISHI <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0062FF] via-[#00D5FF] to-[#C9A84C]">EFFECT FORCE</span>
                </h2>
                <p className="mt-4 font-sans text-sm text-[#F5F0E8]/50">
                  Most marketing consultants regurgitate standard boilerplate playbooks. Rishi constructs targeted algorithmic weapons. Click through our operations.
                </p>
              </div>

              {/* Selector tabs corresponding to story stages */}
              <div className="flex flex-col space-y-3 font-mono text-xs">
                {[
                  "PHASE 01 : UNFLINCHING RESULTS",
                  "PHASE 02 : CHRONICLE MILESTONES"
                ].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      AudioEngine.playTick();
                      setStoryStep(idx);
                    }}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                      storyStep === idx 
                        ? "bg-[#0062FF]/15 border-[#0062FF] text-[#F5F0E8]" 
                        : "bg-[#111118]/60 border-white/[0.04] text-[#F5F0E8]/50 hover:border-white/10"
                    }`}
                  >
                    <span>{tag}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${storyStep === idx ? "translate-x-1 text-[#0062FF]" : ""}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right container containing dynamic panels */}
            <div className="lg:col-span-7 bg-[#111118]/60 border border-white/[0.04] rounded-2xl p-8 relative min-h-[420px] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0062FF]/5 blur-2xl rounded-full" />
              
              {/* PHASE 1: RESULTS VALUE */}
              {storyStep === 0 && (
                <div className="space-y-6 animate-fadeIn select-none">
                  <div className="text-xs font-mono text-[#C9A84C] tracking-widest">ST_LOG // RESULTS_VS_TALK</div>
                  <h3 className="font-display text-3xl font-black text-[#F5F0E8] leading-tight">
                    "MOST MARKETERS TALK RESULTS. <span className="text-[#0062FF]">RISHI DELIVERS</span> THEM."
                  </h3>
                  <div className="w-12 h-0.5 bg-[#0062FF] rounded" />
                  <p className="font-sans text-sm text-[#F5F0E8]/70 leading-relaxed">
                    Most agencies measure efficiency in CPC and click impressions. We measure efficacy in qualified community acquisitions and inbound corporate funnel sales pipeline margins. We align content with emotional human hooks that force action.
                  </p>
                  <p className="font-sans text-sm text-[#F5F0E8]/70">
                    If your current strategist is not studying character-arc triggers or cognitive hook frames inside standard 3-second formats, they are throwing ad budget into a black hole.
                  </p>
                </div>
              )}

              {/* PHASE 2: TIMELINE CHECKPOINTS */}
              {storyStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-xs font-mono text-[#0062FF] tracking-widest">ST_LOG // CHRONOLOGICAL_GRID</div>
                  <h3 className="font-display text-2xl font-extrabold text-[#F5F0E8]">8 YEARS BUILD</h3>
                  
                  {/* Milestones grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MILESTONES.map((m, idx) => (
                      <div key={idx} className="p-4 bg-void/60 border border-white/5 rounded-xl space-y-1.5 relative group hover:border-[#0062FF]/30 transition-all duration-300">
                        <span className="absolute top-2 right-2 font-mono text-[10px] text-[#C9A84C] font-black">{m.year}</span>
                        <h4 className="font-display text-sm font-extrabold text-[#F5F0E8]">{m.title}</h4>
                        <p className="font-sans text-xs text-[#F5F0E8]/50 leading-relaxed">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}



              {/* Box Footer meta */}
              <div className="mt-8 pt-4 border-t border-white/[0.03] flex justify-between items-center font-mono text-[9px] text-[#F5F0E8]/35">
                <span>WORKFLOW CAPACITIES // REV2025</span>
                <span>STATUS: STABLE</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 04 // WAR ROOM STATS (RADIAL GAUGE INTERFACES) */}
      <WarRoomMeters />

      {/* SECTION 05 // SERVICES ARSENAL (BENTO GRID COGNITIVE STRUCTURES) */}
      <BentoServices />

      {/* SECTION 06 // THE PROCESS (HORIZONTAL TIMELINE VECTORS WHEEL) */}
      <section className="py-24 px-4 md:px-12 bg-void relative border-b border-white/[0.04] z-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Section title */}
          <div className="mb-16">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#0062FF] bg-[#0062FF]/10 px-3 py-1.5 rounded-full border border-[#0062FF]/20 mb-4 tracking-widest uppercase">
              <span>DEPLOYMENT ROADMAP</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#F5F0E8] tracking-tight leading-none uppercase">
              THE WAR <span className="text-[#C9A84C]">FLOW</span>
            </h2>
            <p className="mt-3 font-sans text-sm text-[#F5F0E8]/60 max-w-md">
              A continuous, highly strategic 5-phase content distribution framework to scale category attention.
            </p>
          </div>

          {/* Interactive Flow timeline stages list */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            
            {/* Horizontal connected SVG indicator line trail background */}
            <div className="absolute top-[88px] left-0 w-full h-[1px] bg-gradient-to-r from-[#0062FF] via-[#C9A84C] to-[#00D5FF]/20 z-0 hidden md:block" />

            {PROCESS_PHASES.map((stage, idx) => (
              <div 
                key={idx}
                className="bg-[#111118]/70 border border-white/[0.04] rounded-2xl p-6 relative flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:border-[#0062FF] group z-10"
              >
                <div>
                  {/* Custom big glowing marker number nodes */}
                  <div className="w-12 h-12 rounded-full bg-void border border-white/10 group-hover:border-[#0062FF]/70 flex items-center justify-center font-mono text-sm font-black text-[#00D5FF] tracking-tighter shadow-inner mb-6 relative">
                    <span>{stage.num}</span>
                    <span className="absolute inset-0 rounded-full border border-blue-600 scale-100 opacity-0 group-hover:animate-ping" style={{ animationDuration: "1000ms" }} />
                  </div>

                  <h3 className="font-display text-sm font-black text-[#F5F0E8] mb-2 uppercase group-hover:text-[#0062FF] transition-colors">{stage.title}</h3>
                  <p className="font-sans text-xs text-[#F5F0E8]/65 leading-relaxed">{stage.desc}</p>
                </div>

                <div className="font-mono text-[9px] text-[#C9A84C]/40 border-t border-white/[0.03] pt-3 mt-4">
                  ROUTE // STG_0{idx + 1}
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* SECTION 07 // BATTLE RESULTS (PREMIUM CASE STUDY REPORT CLIPS) */}
      <section 
        id="result-reports"
        className="py-24 px-4 md:px-12 bg-void relative border-b border-white/[0.04] z-20"
      >
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-16">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#0062FF] bg-[#0062FF]/10 px-3 py-1.5 rounded-full border border-[#0062FF]/20 tracking-widest uppercase">
                <span>PROVEN BATTLE METRICS</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-black text-[#F5F0E8] tracking-tight leading-none uppercase">
                BRANDS WE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0062FF] to-[#00D5FF]">AMPLIFY</span> ⚡
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="font-sans text-sm text-[#F5F0E8]/60 leading-relaxed max-w-md">
                No theories, no fluff. Real performance reports documenting the transformation from complete offline noise to absolute viral community powerhouses.
              </p>
            </div>
          </div>

          {/* Interactive Slider comparison split & Case reports cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: 1 High intensity Before/After slider showcase */}
            <div className="lg:col-span-7 bg-[#111118]/60 border border-white/[0.04] rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">VISUAL TRANSFORMATION DEBRiEF</h3>
              <BeforeAfterSlider />
            </div>

            {/* Right Column: Case Reports item blocks grid scroll list */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Card 1 */}
              <div className="p-6 bg-[#111118]/80 border-l-4 border-[#0062FF] border-y border-r border-white/[0.04] rounded-r-2xl space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-widest text-[#C9A84C] uppercase">
                  <span>REAL ESTATE PORTAL</span>
                  <span>[ F&B // HOUSING ]</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-sans text-xs text-[#F5F0E8]/50">CHALLENGE: No online presence, 200 stagnant views.</span>
                  <p className="font-display text-lg font-extrabold text-[#F5F5F3] leading-snug">
                    "0 → 18,400 active followers & organic leads inside 90 operating strategy days."
                  </p>
                </div>
                <div className="font-mono text-xs text-[#00D5FF] border-t border-white/[0.04] pt-2.5 flex justify-between">
                  <span>+3.2x Engagement force</span>
                  <span className="font-bold">40% Inbound Growth</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 bg-[#111118]/80 border-l-4 border-[#C9A84C] border-y border-r border-white/[0.04] rounded-r-2xl space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-widest text-[#C9A84C] uppercase">
                  <span>EDTECH PLATFORM / COGNITION</span>
                  <span>[ COACHING ]</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-sans text-xs text-[#F5F0E8]/50">CHALLENGE: Spent Lakhs on paid marketing with zero results.</span>
                  <p className="font-display text-lg font-extrabold text-[#F5F5F3] leading-snug">
                    "Built 12,000 subscriber warm community, generating 24+ monthly direct pipeline retainers."
                  </p>
                </div>
                <div className="font-mono text-xs text-[#00D5FF] border-t border-white/[0.04] pt-2.5 flex justify-between">
                  <span>10x Content impression Multipliers</span>
                  <span className="font-bold">₹8.5L Campaign conversions</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 10 // BRAND INTEL DUAL BOARD (BUDGET CALCULATOR) */}
      <section 
        id="brand-intel-quiz"
        className="py-24 px-4 md:px-12 bg-[#0A0A0A] border-t border-white/[0.04] relative z-20"
      >
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-16 select-none">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#0062FF] bg-[#0062FF]/10 px-3 py-1.5 rounded-full border border-[#0062FF]/20 mb-3 tracking-widest uppercase">
              <span>ESTIMATE YOUR GROWTH MULTIPLIERS</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#F5F0E8] tracking-tight leading-none uppercase">
              ROI & BUDGET <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0062FF] via-[#C9A84C] to-[#00D5FF]">CALCULATOR</span>
            </h2>
            <p className="mt-3 font-sans text-xs sm:text-sm text-[#F5F0E8]/50 uppercase tracking-widest font-bold">
              Check budget parameters and estimate your growth multiplier return.
            </p>
          </div>

          <RoiCalculator />

        </div>
      </section>

      {/* SECTION 11 // IMMERSIVE CONTACT WAR ROOM (rotating custom globe & map details) */}
      <ContactForm />

      {/* SECTION 12 // FOOTER & HIDDEN EASTER EGG ANCHORS */}
      <footer className="bg-void border-t border-white/[0.04] relative z-20 py-16 px-4 md:px-12 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Top massive crawling continuous slow marquee banner */}
          <div className="border-y border-white/[0.04] py-3 overflow-hidden flex items-center transform -skew-y-1">
            <div className="animate-marquee-left flex whitespace-nowrap space-x-12">
              {Array(3).fill([
                "THE RISHI EFFECT ◆ BRANDING ◆ DESIGN ◆ VIRAL SCALING ◆ DOMINATION ◆ ESTABLISHED 2018 ◆",
              ]).flatMap((txt, idx) => (
                <span key={idx} className="font-display text-4xl sm:text-6xl font-black text-[#1C1C1E]/50 tracking-tighter uppercase whitespace-nowrap">
                  {txt}
                </span>
              ))}
            </div>
          </div>

          {/* Primary footer navigation grids columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            
            {/* Column 1 Logo details */}
            <div className="space-y-4">
              <h5 className="font-display text-base font-black text-white tracking-widest uppercase">THE RISHI EFFECT</h5>
              <p className="font-sans text-xs text-[#F5F0E8]/55 leading-relaxed max-w-xs mx-auto md:mx-0">
                A highly-systematized, elite vertical-brand growth machine helping founders and creators dominate modern algorithms.
              </p>
            </div>

            {/* Column 2 Services links */}
            <div className="space-y-3">
              <h6 className="font-mono text-[9px] font-black text-[#0062FF] uppercase tracking-widest">DEPLOYMENTS</h6>
              <ul className="space-y-2 text-xs font-sans text-[#F5F0E8]/40">
                <li><a href="#services-arsenal" className="hover:text-white transition-colors">Client Brand Strategy</a></li>
                <li><a href="#services-arsenal" className="hover:text-white transition-colors">Scripting & Content Blueprints</a></li>
                <li><a href="#services-arsenal" className="hover:text-white transition-colors">Ecosystem Distribution Channels</a></li>
                <li><a href="#services-arsenal" className="hover:text-white transition-colors">Fractional CMO Operations</a></li>
              </ul>
            </div>

            {/* Column 3 Connect socials */}
            <div className="space-y-3">
              <h6 className="font-mono text-[9px] font-black text-[#C9A84C] uppercase tracking-widest">CONNECT HUBS</h6>
              <ul className="space-y-2 text-xs font-sans text-[#F5F0E8]/40">
                <li><a href="https://instagram.com/therishieffect" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram Profile</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn Portal</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube Distribution</a></li>
                <li><a href="https://wa.me/917043206427" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Direct</a></li>
              </ul>
            </div>

            {/* Column 4 Direct parameters */}
            <div className="space-y-3">
              <h6 className="font-mono text-[9px] font-black text-[#00D5FF] uppercase tracking-widest">WAR OFFICE</h6>
              <ul className="space-y-2 text-xs font-mono text-[#F5F0E8]/40">
                <li className="flex items-center justify-center md:justify-start space-x-2">
                  <Phone className="w-3.5 h-3.5" />
                  <a href="tel:7043206427" className="hover:text-white transition-colors">+91 70432 06427</a>
                </li>
                <li>SYS_LOC: NEW DELHI, INDIA</li>
                <li>OPERATIONAL // CLS2026 // GLBAL</li>
              </ul>
            </div>

          </div>



        </div>
      </footer>

    </div>
  );
}
