import React, { useState, useEffect } from "react";
import { Search, Menu, X, ArrowUpRight, Terminal, Instagram } from "lucide-react";

interface SleekNavigationProps {
  onOpenSearch: () => void;
  activeSection: string;
}

export const SleekNavigation: React.FC<SleekNavigationProps> = ({
  onOpenSearch,
  activeSection
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor custom scrolling triggers
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Agency", href: "#about-rishi" },
    { label: "Offerings", href: "#offerings" },
    { label: "Framework", href: "#framework" },
    { label: "Sandbox", href: "#sandbox-crisis" },
    { label: "Insights", href: "#insights" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetElement = document.getElementById(href.substring(1));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <nav
      id="sleek-nav-container"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-black/85 backdrop-blur-md border-b border-brand-border py-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-transparent py-6"
      }`}
      aria-label="Primary Agency Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Identity */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          aria-label="The Rishi Effect Home"
        >
          <span className="p-1 px-1.5 bg-royal-blue/15 border border-royal-blue/40 rounded text-royal-blue font-mono text-[10px] uppercase font-bold tracking-widest relative overflow-hidden shrink-0 shadow-sm">
            <span className="absolute inset-0 bg-royal-blue/10 animate-pulse pointer-events-none" />
            RE
          </span>
          <span className="font-display font-black tracking-widest text-lg text-slate-100 group-hover:text-royal-blue transition-colors">
            THE RISHI EFFECT
          </span>
        </a>

        {/* Center Links (Desktop only) */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-semibold text-xs font-mono uppercase tracking-widest transition-all hover:text-royal-blue relative py-1 focus:outline-none focus:text-royal-blue ${
                  isActive ? "text-royal-blue font-bold" : "text-slate-400"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-royal-blue shadow-[0_0_8px_rgba(65,105,225,0.8)]" />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Blocks */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/therishieffect"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded bg-brand-gray border border-brand-border hover:border-[#E1306C]/70 hover:bg-[#E1306C]/10 text-slate-400 hover:text-[#E1306C] flex items-center justify-center transition-all cursor-pointer focus:outline-none shadow-sm hover:shadow-[0_0_15px_rgba(225,48,108,0.25)] duration-300"
            title="Instagram Profile (@therishieffect)"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Cmd K Search indicator button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 bg-brand-black/60 border border-brand-border hover:border-royal-blue/60 hover:bg-slate-900 px-3.5 py-1.5 rounded text-slate-400 hover:text-royal-blue font-mono text-[10px] tracking-wider transition-all shadow-inner group cursor-pointer focus:outline-none"
            title="Search Site Database (⌘K)"
            aria-label="Open global search engine"
          >
            <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>Search</span>
            <span className="bg-brand-gray border border-brand-border/80 px-1 rounded text-[9px] text-slate-500 font-bold group-hover:text-royal-blue group-hover:border-royal-blue/30">
              ⌘K
            </span>
          </button>

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="bg-gradient-to-r from-royal-blue to-royal-light hover:from-royal-light hover:to-royal-blue text-white hover:scale-[1.02] relative group overflow-hidden px-4 py-2 rounded text-[11px] font-mono tracking-widest uppercase font-black transition-all border border-royal-blue/30 cursor-pointer shadow-[0_4px_14px_rgba(65,105,225,0.2)] focus:outline-none"
          >
            <span className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
              Pitch Brand
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white" />
            </span>
          </a>
        </div>

        {/* Mobile controls (Mobile only) */}
        <div className="flex md:hidden items-center gap-3">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 border border-brand-border rounded hover:border-royal-blue text-slate-400 hover:text-royal-blue cursor-pointer focus:outline-none"
            aria-label="Open search engine"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-brand-border rounded hover:border-royal-blue text-slate-400 hover:text-royal-blue cursor-pointer focus:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation drawer"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-brand-black border-b border-brand-border h-[calc(100vh-73px)] z-30 flex flex-col p-6 animate-fade-in font-sans">
          {/* Accent decorative background line */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-royal-blue/5 blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-6 py-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-display text-lg tracking-wider font-semibold transition-all hover:text-royal-blue py-1 flex items-center justify-between border-b border-brand-border/40 pb-2 ${
                    isActive ? "text-royal-blue pl-2" : "text-slate-300"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-slate-500">[{link.label.substring(0,3)}]</span>
                </a>
              );
            })}
          </div>

          <div className="mt-auto space-y-4 pt-6 border-t border-brand-border/40">
            <div className="flex items-center justify-between">
              <p className="text-2xs font-mono text-slate-500 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-royal-blue animate-pulse" />
                THE RISHI EFFECT OFFICE
              </p>
              <a
                href="https://www.instagram.com/therishieffect"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 hover:text-[#E1306C] transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@therishieffect</span>
              </a>
            </div>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="w-full text-center block bg-gradient-to-r from-royal-blue to-royal-light text-white px-5 py-3.5 rounded text-xs font-mono tracking-widest uppercase font-black cursor-pointer shadow-[0_4px_12px_rgba(65,105,225,0.2)]"
            >
              Start Collaboration
              <ArrowUpRight className="w-4 h-4 inline-block ml-1" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
