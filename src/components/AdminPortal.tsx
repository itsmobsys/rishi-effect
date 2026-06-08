import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Trash2, 
  Download, 
  RefreshCw, 
  LogOut, 
  Calendar, 
  Mail, 
  Tag, 
  SlidersHorizontal, 
  User, 
  Search, 
  FileText, 
  Check, 
  Copy, 
  Info,
  Layers,
  ArrowRight
} from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  timestamp: string;
}

interface AdminPortalProps {
  onNavigateHome: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onNavigateHome }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem("rishi_admin_token");
  });

  // State for dashboard metrics and data
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Interface filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterest, setSelectedInterest] = useState<string>("all");
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResettingVisitors, setIsResettingVisitors] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
        setVisitorCount(data.visitorCount || 0);
        setError("");
      } else {
        localStorage.removeItem("rishi_admin_token");
        setAuthToken(null);
        setError("Session expired or unauthorized. Please log in again.");
      }
    } catch {
      setError("Failed to fetch administrative data from secure channel.");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger load when authorized
  useEffect(() => {
    if (authToken) {
      fetchDashboardData(authToken);
    }
  }, [authToken]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsAuthenticating(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("rishi_admin_token", data.token);
        setAuthToken(data.token);
        setPassword("");
        setError("");
      } else {
        setError(data.error || "Incorrect administrator portal credentials.");
      }
    } catch {
      setError("Offline or unable to connect securely to authentication nodes.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rishi_admin_token");
    setAuthToken(null);
    setSearchTerm("");
    setSelectedInterest("all");
    setExpandedSubmission(null);
  };

  const handleDeleteSubmit = async (id: string) => {
    if (!authToken) return;
    setIsDeleting(true);
    try {
      const response = await fetch("/api/admin/delete-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        if (expandedSubmission === id) setExpandedSubmission(null);
        setConfirmDeleteId(null);
      } else {
        setError("Failed to delete the selected brief.");
      }
    } catch {
      setError("Network error occurs during deletion request.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetVisitors = async () => {
    if (!authToken || !window.confirm("Are you absolutely sure you want to reset the unique visitor list? This action is irreversible.")) return;
    setIsResettingVisitors(true);
    try {
      const response = await fetch("/api/admin/reset-visitors", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        setVisitorCount(0);
      }
    } catch {
      setError("Could not complete visitor count reset.");
    } finally {
      setIsResettingVisitors(false);
    }
  };

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `rishi_effect_briefings_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredSubmissions = submissions.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInterest = selectedInterest === "all" || item.interest === selectedInterest;
    return matchesSearch && matchesInterest;
  });

  const getInterestBadgeColor = (interest: string) => {
    switch (interest) {
      case "pr": return "bg-royal-blue/15 border-royal-blue/30 text-royal-blue";
      case "branding": return "bg-purple-500/15 border-purple-500/30 text-purple-400";
      case "strategy": return "bg-emerald-500/15 border-emerald-500/30 text-emerald-400";
      case "social_media": return "bg-orange-500/15 border-orange-500/30 text-orange-400";
      default: return "bg-zinc-800 border-zinc-700 text-slate-300";
    }
  };

  const getInterestName = (interest: string) => {
    switch (interest) {
      case "pr": return "PR & Media";
      case "branding": return "Brand Identity";
      case "strategy": return "Business Strategy";
      case "social_media": return "Social Dominance";
      default: return interest.toUpperCase();
    }
  };

  // Prevent background scrolling when opened
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 overflow-hidden font-sans">
      {/* Absolute background blur overlay */}
      <div 
        className="absolute inset-0 bg-brand-black/95 backdrop-blur-lg cursor-default"
        onClick={() => {
          onNavigateHome();
        }}
      />

      <div className="w-full h-full max-w-7xl relative z-10 bg-[#0A0A0E] md:border-l md:border-r border-brand-border flex flex-col overflow-hidden text-left shadow-[0_0_80px_rgba(0,0,0,0.95)]">
        
        {/* HEADER SECTION */}
        <header className="border-b border-brand-border bg-brand-black/80 px-6 py-4.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-1 px-2 bg-royal-blue/15 border border-royal-blue/30 rounded text-royal-blue font-mono text-[10px] uppercase font-black tracking-widest relative overflow-hidden">
              <span className="absolute inset-0 bg-royal-blue/10 animate-pulse" />
              HQ DESK
            </span>
            <div>
              <h2 className="font-display font-black tracking-widest text-sm text-slate-100 uppercase">
                THE RISHI EFFECT ADVISORY CONSOLE
              </h2>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Secure Administrative Dashboard • Operational Placements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {authToken && (
              <button
                onClick={handleLogout}
                className="p-1.5 px-3.5 border border-brand-border hover:border-red-500/50 bg-brand-black hover:text-red-400 font-mono text-2xs font-extrabold uppercase tracking-widest rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Console</span>
              </button>
            )}

            <button
              onClick={onNavigateHome}
              className="p-1 px-2.5 rounded bg-brand-black border border-brand-border text-slate-400 hover:text-white hover:border-slate-500 transition-colors text-2xs font-mono font-bold cursor-pointer"
            >
              ESC #[X]
            </button>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <div className="flex-1 overflow-y-auto relative p-6 md:p-8 lg:p-10">
          
          <AnimatePresence mode="wait">
            {!authToken ? (
              
              /* LOGIN PANE */
              <motion.div
                key="login-pane"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-md mx-auto my-12"
              >
                <div className="bg-brand-gray border border-brand-border rounded-3xl p-6 sm:p-9 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-36 h-36 bg-royal-blue/5 blur-3xl pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-serif italic text-[#F8FAFC] font-black text-center uppercase tracking-wide">
                    Access Executive Portal
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 text-center uppercase tracking-wider mt-2 mb-8">
                    Strict Privileged Session Entry Required
                  </p>

                  {error && (
                    <div className="mb-6 bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono p-3 rounded-xl flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="admin-pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-brand-black border border-brand-border outline-none text-slate-100 font-mono text-xs pr-11 transition-colors hover:border-slate-700 focus:border-royal-blue focus:shadow-[0_0_15px_rgba(65,105,225,0.15)] placeholder:text-slate-700"
                        placeholder="ENTER ACCESS ACCESS CODE"
                        required
                        disabled={isAuthenticating}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-royal-blue transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isAuthenticating}
                      className="w-full bg-gradient-to-r from-royal-blue to-royal-light text-white font-mono text-2xs font-extrabold uppercase tracking-widest py-3.5 rounded-xl border border-royal-blue/30 hover:shadow-[0_0_15px_rgba(65,105,225,0.2)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{isAuthenticating ? "VERIFYING CONSOLE LINK..." : "TRANSMIT ACCESS CODE"}</span>
                      {!isAuthenticating && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-brand-border/40 text-center text-[10px] font-mono text-slate-600">
                    <p>All interaction records are heavily restricted under internal agency regulatory statutes. Authorized staff only.</p>
                  </div>
                </div>
              </motion.div>

            ) : (
              
              /* MAIN DASHBOARD PANEL */
              <motion.div
                key="dashboard-pane"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* GLOBAL METRIC CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div className="bg-brand-gray border border-brand-border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[140px] shadow-lg">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                        Total Audience Impact
                      </span>
                      <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                        <User className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div>
                      <h4 className="text-4xl font-serif italic font-black text-white leading-tight mt-3">
                        {visitorCount}
                      </h4>
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        Live Unique Viewers (No duplicates)
                      </p>
                    </div>
                    {/* Clear action */}
                    <div className="absolute right-4 bottom-4">
                      <button
                        onClick={handleResetVisitors}
                        disabled={isResettingVisitors}
                        className="text-[9px] font-mono text-slate-605 uppercase hover:text-red-400 font-bold tracking-wide transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                        title="Reset Visitor Metric"
                      >
                        <RefreshCw className={`w-2.5 h-2.5 ${isResettingVisitors ? 'animate-spin' : ''}`} />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-brand-gray border border-brand-border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[140px] shadow-lg">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                        Active Strategic Inquiries
                      </span>
                      <span className="w-6 h-6 rounded bg-royal-blue/10 text-royal-blue border border-royal-blue/20 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div>
                      <h4 className="text-4xl font-serif italic font-black text-royal-light leading-tight mt-3">
                        {submissions.length}
                      </h4>

                    </div>
                  </div>

                  <div className="bg-brand-gray border border-brand-border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[140px] shadow-lg sm:col-span-2 lg:col-span-1">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                        Operational Utilities
                      </span>
                      <span className="w-6 h-6 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                        <Layers className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2.5 mt-4">
                        <button
                          onClick={handleDownloadJSON}
                          disabled={submissions.length === 0}
                          className="px-3.5 py-2 bg-brand-black border border-brand-border hover:border-royal-blue hover:text-royal-blue text-slate-300 font-mono text-2xs rounded-lg flex items-center gap-1.5 uppercase tracking-wider font-extrabold transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
                        >
                          <Download className="w-3 h-3" />
                          <span>Export Briefs</span>
                        </button>
                        <button
                          onClick={() => fetchDashboardData(authToken || "")}
                          disabled={isLoading}
                          className="px-3.5 py-2 bg-brand-black border border-brand-border hover:border-royal-blue hover:text-royal-blue text-slate-300 font-mono text-2xs rounded-lg flex items-center gap-1.5 uppercase tracking-wider font-extrabold transition-all cursor-pointer focus:outline-none"
                        >
                          <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
                          <span>Sync Data</span>
                        </button>
                      </div>

                    </div>
                  </div>

                </div>

                {/* SEARCH, FILTERS & ACTION CONTROLS */}
                <div className="bg-brand-gray border border-brand-border rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  
                  {/* Search text bar */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-505" />
                    <input
                      type="text"
                      id="dashboard-search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-11 pr-4.5 py-2.5 rounded-xl bg-brand-black border border-brand-border outline-none font-sans text-xs text-slate-100 placeholder:text-slate-600 transition-colors focus:border-royal-blue"
                      placeholder="FILTER BY CANDIDATE NAME, EMAIL OR MESSAGE STATEMENT..."
                    />
                  </div>

                  {/* dropdown filters and counters */}
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
                    <div className="flex items-center gap-2 border border-brand-border/80 bg-brand-black px-3 py-1.5 rounded-xl shrink-0">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[10px] font-mono uppercase text-slate-500 font-extrabold">Intent:</span>
                      <select
                        id="dashboard-intent-filter"
                        value={selectedInterest}
                        onChange={(e) => setSelectedInterest(e.target.value)}
                        className="bg-transparent text-slate-205 border-none outline-none font-sans text-xs font-semibold cursor-pointer py-0.5"
                      >
                        <option value="all">ALL INTERESTS</option>
                        <option value="pr">PR & MEDIA</option>
                        <option value="branding">BRAND IDENTITY</option>
                        <option value="strategy">BUSINESS STRATEGY</option>
                        <option value="social_media">SOCIAL DOMINANCE</option>
                      </select>
                    </div>

                    <div className="text-2xs font-mono text-slate-500 uppercase tracking-widest shrink-0 py-2 border-l border-brand-border/40 pl-3">
                      Matching: <span className="text-royal-blue font-bold">{filteredSubmissions.length}</span> / {submissions.length}
                    </div>
                  </div>

                </div>

                {/* BRIEFINGS ACCORDION TABLE LIST */}
                <div className="bg-brand-gray border border-brand-border rounded-2xl overflow-hidden min-h-[300px] shadow-lg flex flex-col">
                  
                  {isLoading ? (
                    <div className="flex-1 py-24 flex flex-col items-center justify-center text-slate-500 gap-3">
                      <RefreshCw className="w-8 h-8 animate-spin text-royal-blue" />
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-black">Decrypting briefings database...</span>
                    </div>
                  ) : filteredSubmissions.length === 0 ? (
                    <div className="flex-1 py-24 flex flex-col items-center justify-center text-slate-550 gap-2">
                      <Info className="w-8 h-8 text-slate-600" />
                      <span className="text-xs font-mono uppercase tracking-widest">No matching briefings recorded in logs</span>
                      <p className="text-[10px] text-slate-505 font-mono max-w-xs text-center mt-1">Adjust search parameters or check live network connection link.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-brand-border/60">
                      
                      {/* Accordion List Row */}
                      {filteredSubmissions.map((sub, sIdx) => {
                        const isExpanded = expandedSubmission === sub.id;
                        const formattedDate = new Date(sub.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false
                        });

                        return (
                          <div 
                            key={sub.id} 
                            className={`transition-colors duration-200 ${
                              isExpanded ? "bg-brand-black/45" : "bg-transparent hover:bg-brand-black/20"
                            }`}
                          >
                            
                            {/* Summary Header of Row */}
                            <div 
                              onClick={() => setExpandedSubmission(isExpanded ? null : sub.id)}
                              className="px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                            >
                              <div className="flex items-center gap-4.5">
                                <span className="font-mono text-2xs text-slate-600 font-bold">
                                  #{(filteredSubmissions.length - sIdx).toString().padStart(2, "0")}
                                </span>
                                <div>
                                  <h4 className="text-sm font-sans font-bold text-slate-100 flex items-center gap-2">
                                    {sub.name}
                                    <span className={`text-[8.5px] px-2 py-0.5 border font-mono rounded-full font-black uppercase tracking-widest ${getInterestBadgeColor(sub.interest)}`}>
                                      {getInterestName(sub.interest)}
                                    </span>
                                  </h4>
                                  <p className="text-[11px] font-mono text-slate-500 mt-1 flex items-center gap-1.5">
                                    <Mail className="w-3 h-3 text-slate-600" />
                                    <span>{sub.email}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-5">
                                <span className="text-[10px] font-mono text-slate-505 uppercase tracking-widest flex items-center gap-1.5 bg-brand-black/40 px-2 py-1 border border-brand-border/50 rounded-lg shrink-0">
                                  <Calendar className="w-3 h-3 text-slate-600" />
                                  {formattedDate}
                                </span>
                                
                                <span className="text-[10px] font-mono text-royal-blue shrink-0 uppercase tracking-widest font-black select-none hidden sm:inline">
                                  {isExpanded ? "COLLAPSE [-]" : "EXPAND BRIEF [+]"}
                                </span>
                              </div>
                            </div>

                            {/* Detailed Body of Row */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className="overflow-hidden border-t border-brand-border/40 bg-brand-black/60 shadow-inner"
                                >
                                  <div className="px-6 py-6 sm:px-11 sm:py-7 space-y-6">
                                    
                                    <div className="space-y-2">
                                      <span className="block text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                                        Candidate Placement Brief Details:
                                      </span>
                                      <p className="text-xs sm:text-sm text-slate-205 bg-brand-black border border-brand-border rounded-xl p-4.5 sm:p-5 font-sans leading-relaxed whitespace-pre-line select-text">
                                        {sub.message}
                                      </p>
                                    </div>

                                    {/* Actions toolbox */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2.5">
                                      <div className="flex flex-wrap items-center gap-2.5">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopyEmail(sub.email, sub.id);
                                          }}
                                          className="px-3 py-1.5 border border-brand-border hover:border-royal-blue bg-brand-black text-slate-300 hover:text-royal-blue font-mono text-3xs rounded-lg flex items-center gap-1.5 uppercase tracking-wider font-extrabold transition-all cursor-pointer focus:outline-none"
                                        >
                                          {copiedId === sub.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                          <span>{copiedId === sub.id ? "Copied" : "Copy Email"}</span>
                                        </button>
                                        
                                        <a
                                          href={`mailto:${sub.email}?subject=RE: Inquiry Placement Advisory - The Rishi Effect&body=Dear ${sub.name},%0D%0A%0D%0AThank you for contacting our desk...`}
                                          onClick={(e) => e.stopPropagation()}
                                          className="px-3 py-1.5 border border-brand-border hover:border-royal-blue bg-brand-black text-slate-300 hover:text-royal-blue font-mono text-3xs rounded-lg flex items-center gap-1.5 uppercase tracking-wider font-extrabold transition-all cursor-pointer focus:outline-none"
                                        >
                                          <Mail className="w-3.5 h-3.5" />
                                          <span>Direct Reply</span>
                                        </a>
                                      </div>

                                      <div>
                                        {confirmDeleteId === sub.id ? (
                                          <div className="flex items-center gap-2 bg-red-950/20 border border-red-500/30 p-1.5 px-3 rounded-lg">
                                            <span className="text-[10px] font-mono text-red-400 font-extrabold uppercase tracking-wide">Confirm permanent wipe?</span>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteSubmit(sub.id);
                                              }}
                                              disabled={isDeleting}
                                              className="px-2 py-0.5 bg-red-650 hover:bg-red-700 text-white font-mono text-3xs rounded font-bold uppercase transition-colors shrink-0 cursor-pointer focus:outline-none bg-red-650"
                                            >
                                              WIPE
                                            </button>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setConfirmDeleteId(null);
                                              }}
                                              className="px-2 py-0.5 bg-brand-black border border-brand-border font-mono text-3xs rounded font-bold uppercase hover:text-white shrink-0 cursor-pointer focus:outline-none"
                                            >
                                              ABORT
                                            </button>
                                          </div>
                                        ) : (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setConfirmDeleteId(sub.id);
                                            }}
                                            className="px-3 py-1.5 border border-brand-border hover:border-red-500/50 hover:bg-red-500/5 bg-brand-black text-slate-400 hover:text-red-400 font-mono text-3xs rounded-lg flex items-center gap-1.5 uppercase tracking-wider font-extrabold transition-colors cursor-pointer focus:outline-none"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Wipe Briefing</span>
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                          </div>
                        );
                      })}

                    </div>
                  )}

                </div>

                {/* STATS DISCLAIMER FOOTNOTE */}
                <div className="bg-brand-gray/40 border border-brand-border rounded-xl p-4.5 flex gap-3 text-left">
                  <Info className="w-5 h-5 text-royal-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-royal-blue tracking-widest font-extrabold mb-1 select-none">
                      Operational Placement Protocol Warnings
                    </span>
                    <p className="text-[10px] font-mono text-slate-500 leading-relaxed uppercase">
                      All briefings are synchronized and maintained under strict system parameters. Do not disclose private enterprise placement briefs to external media sectors. Discretion remains maximum.
                    </p>
                  </div>
                </div>

              </motion.div>

            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
};
