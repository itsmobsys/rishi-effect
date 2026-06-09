import React, { useState, useEffect } from "react";
import { Shield, Lock, LogOut, Trash2, Calendar, Briefcase, Mail, CheckCircle, RefreshCw } from "lucide-react";
import { AudioEngine } from "./AudioEngine";

interface Lead {
  id: string;
  name: string;
  brand: string;
  goal: string;
  budget: string;
  message: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  // Check session storage for existing auth session
  useEffect(() => {
    const authStatus = sessionStorage.getItem("rishi_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadLeads();
    }
  }, []);

  const loadLeads = () => {
    try {
      const storedLeads = JSON.parse(localStorage.getItem("rishi_leads") || "[]");
      setLeads(storedLeads);
    } catch (err) {
      console.error("Failed to load leads from localStorage", err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Accept interpretations: "admin123" or "admin123 admin123"
    const trimmedPass = password.trim();
    const trimmedUser = username.trim().toLowerCase();

    const isPassValid = trimmedPass === "admin123" || trimmedPass === "admin123 admin123";
    const isUserValid = trimmedUser === "admin" || trimmedUser === "admin123" || trimmedUser === "";

    if (isPassValid && isUserValid) {
      AudioEngine.playChimeChord();
      setIsAuthenticated(true);
      sessionStorage.setItem("rishi_admin_auth", "true");
      loadLeads();
    } else {
      AudioEngine.playTick();
      setError("Invalid password credentials. Try again.");
    }
  };

  const handleLogout = () => {
    AudioEngine.playTick();
    setIsAuthenticated(false);
    sessionStorage.removeItem("rishi_admin_auth");
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      AudioEngine.playTick();
      const updatedLeads = leads.filter((lead) => lead.id !== id);
      localStorage.setItem("rishi_leads", JSON.stringify(updatedLeads));
      setLeads(updatedLeads);
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete ALL leads? This cannot be undone.")) {
      AudioEngine.playTick();
      localStorage.setItem("rishi_leads", "[]");
      setLeads([]);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#111118] border border-white/[0.04] rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0062FF]/5 blur-3xl rounded-full" />
          
          <div className="text-center mb-8 relative z-10">
            <div className="w-12 h-12 bg-[#0062FF]/10 border border-[#0062FF]/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-[#0062FF]" />
            </div>
            <h1 className="font-display text-2xl font-black tracking-tight uppercase">Rishi Lead Control</h1>
            <p className="font-mono text-[10px] text-[#F5F0E8]/40 uppercase tracking-widest mt-1">Lead Management Access Point</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-2.5 px-3.5 rounded-xl text-center font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block font-mono text-[9px] text-[#F5F0E8]/40 uppercase tracking-widest mb-1.5">Username (Optional)</label>
              <input 
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl p-3 text-sm focus:outline-none focus:border-[#0062FF] transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] text-[#F5F0E8]/40 uppercase tracking-widest mb-1.5">Admin Password</label>
              <div className="relative">
                <input 
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#0062FF] transition-colors"
                />
                <Lock className="w-4 h-4 text-white/20 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0062FF] hover:bg-[#0062FF]/90 text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_25px_rgba(0,98,255,0.25)] mt-6"
            >
              AUTHENTICATE ACCESS
            </button>
          </form>

          <div className="text-center mt-6">
            <a 
              href="/"
              onClick={() => {
                AudioEngine.playTick();
                window.history.pushState({}, "", "/");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              className="text-white/45 hover:text-[#0062FF] font-mono text-[10px] tracking-widest uppercase transition-colors"
            >
              ← Return to public site
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#111118] border border-white/[0.04] p-6 rounded-3xl mb-8 gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight">Leads Dashboard</h1>
              <span className="font-mono text-[9px] text-[#F5F0E8]/40 uppercase tracking-widest">{leads.length} Active Submissions</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadLeads}
              className="p-3 bg-[#0A0A0A] hover:bg-[#0A0A0A]/80 border border-white/5 hover:border-[#0062FF] rounded-xl text-white/65 hover:text-white transition-all text-xs flex items-center gap-2 font-mono uppercase tracking-wider"
              title="Refresh spreadsheet list"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {leads.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-500 rounded-xl transition-all text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                title="Wipe leads index"
              >
                <Trash2 className="w-4 h-4" />
                <span>Wipe All</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/80 transition-all text-xs flex items-center gap-2 font-mono uppercase tracking-wider"
              title="Log out of console"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Lead Spreadsheet grid card container */}
        <div className="bg-[#111118] border border-white/[0.04] rounded-3xl overflow-hidden shadow-2xl">
          {leads.length === 0 ? (
            <div className="py-24 text-center px-4">
              <Briefcase className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <h2 className="font-display text-lg font-bold text-white/70">No Leads Received Yet</h2>
              <p className="text-white/40 text-xs max-w-xs mx-auto mt-2 leading-relaxed">
                Leads sent via the main contact registration dispatch will index automatically here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/[0.04] bg-[#0A0A0A] font-mono text-[10px] tracking-widest uppercase text-[#F5F0E8]/40">
                    <th className="py-4 px-6 font-bold">Client / Company Name</th>
                    <th className="py-4 px-6 font-bold">Goal Target</th>
                    <th className="py-4 px-6 font-bold">Monthly Budget</th>
                    <th className="py-4 px-6 font-bold">Notes / Brief</th>
                    <th className="py-4 px-6 font-bold">Received At</th>
                    <th className="py-4 px-6 text-right font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.01] transition-all">
                      {/* Name & Brand */}
                      <td className="py-5 px-6">
                        <div className="font-sans text-sm font-semibold text-white">{lead.name}</div>
                        <div className="font-mono text-[10px] text-[#C9A84C]/80 mt-1 uppercase tracking-wider flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-[#C9A84C]" />
                          {lead.brand}
                        </div>
                      </td>

                      {/* Goal Description */}
                      <td className="py-5 px-6 max-w-xs">
                        <span className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                          {lead.goal}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="py-5 px-6">
                        <span className="inline-block text-[10px] font-mono font-black tracking-wider text-[#0062FF] bg-[#0062FF]/10 border border-[#0062FF]/20 px-2.5 py-1 rounded-md uppercase">
                          {lead.budget}
                        </span>
                      </td>

                      {/* Message details */}
                      <td className="py-5 px-6 max-w-sm">
                        <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                          {lead.message || <span className="text-white/20 italic">No notes provided</span>}
                        </p>
                      </td>

                      {/* Created date/time */}
                      <td className="py-5 px-6">
                        <div className="font-mono text-[10px] text-white/40 flex items-center gap-1.5 shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="text-[10px] text-white/30 font-mono block mt-1">
                          {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      {/* Delete option */}
                      <td className="py-5 px-6 text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors border border-red-500/10"
                          title="Erase submission record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back and summary bar */}
        <div className="mt-8 flex justify-between items-center text-[11px] font-mono text-white/35">
          <span>SECURE SYSTEM PANEL PROTOCOL ACTIVE</span>
          <button
            onClick={() => {
              AudioEngine.playTick();
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            className="hover:text-[#0062FF] transition-colors py-1.5 px-3 border border-white/5 bg-[#111118] rounded-lg"
          >
            ← Return to public site
          </button>
        </div>

      </div>
    </div>
  );
}
