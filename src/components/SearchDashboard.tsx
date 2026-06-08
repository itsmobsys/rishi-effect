import React, { useState, useEffect, useRef } from "react";
import { Search, X, Megaphone, Palette, Share2, TrendingUp, HelpCircle, FileText, ArrowRight } from "lucide-react";
import { SERVICES, VERTICALS, CASE_STUDIES, INSIGHTS } from "../data";
import { Service, Vertical, CaseStudy, Insight } from "../types";

interface SearchDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (category: string, targetId: string) => void;
}

interface SearchItem {
  id: string;
  category: "Service" | "Vertical" | "Case Outcome" | "Insights Blog";
  title: string;
  description: string;
  subtext?: string;
  sourceId: string;
}

export const SearchDashboard: React.FC<SearchDashboardProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle outside click to close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      // Disable background scrolling
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Keyboard navigation inside search results
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, searchResults.length));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + searchResults.length) % Math.max(1, searchResults.length));
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (searchResults.length > 0 && searchResults[selectedIndex]) {
          const item = searchResults[selectedIndex];
          handleSelect(item);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, searchResults, selectedIndex]);

  // Aggregate search index and filter on input change
  useEffect(() => {
    if (!searchQuery.trim()) {
      // Setup some default recommended results
      const defaults: SearchItem[] = [
        ...SERVICES.map(s => ({
          id: `srv-${s.id}`,
          category: "Service" as const,
          title: s.title,
          description: s.shortDescription,
          sourceId: s.id
        })),
        ...VERTICALS.slice(0, 2).map(v => ({
          id: `vert-${v.id}`,
          category: "Vertical" as const,
          title: v.name,
          description: v.tagline,
          sourceId: v.id
        }))
      ];
      setSearchResults(defaults);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const matches: SearchItem[] = [];

    // 1. Search Services
    SERVICES.forEach(s => {
      if (s.title.toLowerCase().includes(query) || s.shortDescription.toLowerCase().includes(query) || s.longDescription.toLowerCase().includes(query)) {
        matches.push({
          id: `srv-${s.id}`,
          category: "Service",
          title: s.title,
          description: s.shortDescription,
          sourceId: s.id
        });
      }
    });

    // 2. Search Verticals
    VERTICALS.forEach(v => {
      if (v.name.toLowerCase().includes(query) || v.tagline.toLowerCase().includes(query) || v.description.toLowerCase().includes(query)) {
        matches.push({
          id: `vert-${v.id}`,
          category: "Vertical",
          title: v.name,
          description: v.tagline,
          sourceId: v.id
        });
      }
    });

    // 3. Search Case Outcomes
    CASE_STUDIES.forEach(c => {
      if (
        c.title.toLowerCase().includes(query) ||
        c.client.toLowerCase().includes(query) ||
        c.impactResult.toLowerCase().includes(query) ||
        c.challenge.toLowerCase().includes(query) ||
        c.solution.toLowerCase().includes(query)
      ) {
        matches.push({
          id: `case-${c.id}`,
          category: "Case Outcome",
          title: c.title,
          description: `Client: ${c.client} • Impact: ${c.impactResult}`,
          subtext: `${c.solution.substring(0, 100)}...`,
          sourceId: c.id
        });
      }
    });

    // 4. Search Insights Blogs
    INSIGHTS.forEach(inItem => {
      if (
        inItem.title.toLowerCase().includes(query) ||
        inItem.excerpt.toLowerCase().includes(query) ||
        inItem.content.toLowerCase().includes(query) ||
        inItem.tags.some(t => t.toLowerCase().includes(query))
      ) {
        matches.push({
          id: `ins-${inItem.id}`,
          category: "Insights Blog",
          title: inItem.title,
          description: inItem.excerpt,
          subtext: `Category: ${inItem.category} • Written by ${inItem.author}`,
          sourceId: inItem.id
        });
      }
    });

    setSearchResults(matches);
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleSelect = (item: SearchItem) => {
    onSelectResult(item.category, item.sourceId);
    onClose();
  };

  const getRandomIcon = (category: string) => {
    switch (category) {
      case "Service":
        return <Megaphone className="w-4 h-4 text-royal-blue" />;
      case "Vertical":
        return <Palette className="w-4 h-4 text-indigo-400" />;
      case "Case Outcome":
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      default:
        return <FileText className="w-4 h-4 text-amber-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brand-black/94 backdrop-blur-xl z-50 flex items-start justify-center p-4 sm:p-10 md:pt-24 transition-opacity duration-300">
      <div 
        ref={modalRef}
        id="search-overlay-box"
        className="w-full max-w-2xl bg-brand-gray border border-brand-border rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh] md:max-h-[70vh] scale-in"
        role="dialog"
        aria-modal="true"
        aria-label="Universal Search Engine"
      >
        {/* Glow ambient lines */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-royal-blue to-transparent" />

        {/* Input Bar */}
        <div className="flex items-center px-4 py-4 border-b border-brand-border">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 font-sans text-base outline-none pr-4"
            placeholder="Search our services, verticals, case outcomes, or insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-royal-light transition-colors group"
            title="Close Search Menu"
            aria-label="Close search menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories indicator info */}
        <div className="bg-brand-black px-4 py-1.5 border-b border-brand-border flex items-center justify-between text-2xs text-slate-500 font-mono tracking-wider uppercase">
          <span>
            {searchResults.length === 0 ? "No matches found" : `${searchResults.length} matching indexes`}
          </span>
          <span className="hidden sm:inline">
            Use ↑↓ to navigate • ↵ to select • Esc to exit
          </span>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
          {searchResults.length > 0 ? (
            <ul className="space-y-1">
              {searchResults.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSelect(item)}
                      className={`w-full text-left p-3 rounded-lg flex items-start gap-3.5 border transition-all duration-150 ${
                        isSelected
                          ? "bg-royal-blue/10 border-royal-blue text-slate-100 shadow-[0_0_15px_rgba(65,105,225,0.15)]"
                          : "bg-transparent border-transparent hover:bg-slate-900/40 hover:border-slate-800 text-slate-300"
                      }`}
                      aria-selected={isSelected}
                    >
                      {/* Icon status representation */}
                      <span className={`p-2 rounded-md shrink-0 border mt-0.5 ${
                        isSelected 
                          ? "bg-royal-blue/20 border-royal-blue/30 text-royal-light" 
                          : "bg-brand-black border-brand-border text-slate-400"
                      }`}>
                        {getRandomIcon(item.category)}
                      </span>

                      <div className="flex-1 min-w-0">
                        {/* Title & category tag */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-display font-medium text-sm truncate sm:max-w-[70%]">
                            {item.title}
                          </span>
                          <span className={`text-[10px] uppercase font-mono tracking-wider font-semibold px-2 py-0.5 rounded shrink-0 self-start sm:self-center ${
                            item.category === "Service" ? "bg-royal-dark/30 text-royal-light border border-royal-blue/20" :
                            item.category === "Vertical" ? "bg-indigo-950/40 text-indigo-300 border border-indigo-500/20" :
                            item.category === "Case Outcome" ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/20" :
                            "bg-amber-950/40 text-amber-300 border border-amber-500/20"
                          }`}>
                            {item.category}
                          </span>
                        </div>

                        {/* Description */}
                        <p className={`text-xs mt-1 truncate ${
                          isSelected ? "text-slate-200" : "text-slate-400"
                        }`}>
                          {item.description}
                        </p>

                        {/* Optional subtext */}
                        {item.subtext && (
                          <div className="text-[11px] mt-1.5 font-mono text-slate-500 line-clamp-1 border-t border-brand-border/30 pt-1">
                            {item.subtext}
                          </div>
                        )}
                      </div>

                      {/* Accent highlight vector */}
                      {isSelected && (
                        <ArrowRight className="w-4 h-4 text-royal-blue self-center shrink-0 animate-pulse ml-1" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <HelpCircle className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-sm font-display">No matching services, outlets, or records.</p>
              <p className="text-xs text-slate-600 font-mono mt-1">Try searching for &quot;PR&quot;, &quot;EV&quot;, &quot;Crisis&quot;, &quot;Trust&quot; or &quot;Hospitality&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
