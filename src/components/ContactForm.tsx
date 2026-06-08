import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, AlertTriangle, Mail, Phone, Calendar, Sparkles } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  interest: string;
  message: string;
}

interface ConfettiPart {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    interest: "pr",
    message: ""
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPart[]>([]);

  // Helper to run comprehensive validation for "bad or wrong data" in real-time
  const computeValidationError = (field: keyof FormState, value: string): string => {
    const v = value.trim();
    if (field === "name") {
      if (v.length < 2) return "Name must be at least 2 characters.";
      if (v.length > 50) return "Name must be under 50 characters.";
      if (/[0-9]/.test(v)) return "Names cannot contain numbers/digits.";
      if (/[@#$%^&*()_+={}\[\]|\\:;'"<>,.?/~`]/.test(v)) return "Name cannot contain special symbols.";
      const repeats = /(.)\1\1/.test(v.toLowerCase());
      const keyboardMash = /(asdf|qwer|zxcv|ghjk|hjkl|asdfasdf|test|admin|placeholder)/i.test(v);
      if (repeats) return "Name contains excessive repeated letters.";
      if (keyboardMash) return "Please enter a valid human name.";
    } else if (field === "email") {
      if (!v) return "Email address is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(v)) return "Please enter a valid business email.";
      const invalidDomains = [
        "test.com", "example.com", "dummy.com", "tempmail.com", "tempmail.org",
        "mailinator.com", "yopmail.com", "dispostable.com", "trashmail.com", "user.com"
      ];
      const domain = v.toLowerCase().split("@")[1];
      if (invalidDomains.includes(domain)) {
        return "We do not accept disposable or dummy test domains.";
      }
      const emailLower = v.toLowerCase();
      if (emailLower.startsWith("test@") || emailLower.startsWith("random@") || emailLower.startsWith("aaa@") || emailLower.startsWith("asdf@")) {
        return "Please enter an authentic, active email address.";
      }
    } else if (field === "message") {
      if (!v) return "Message is required.";
      if (v.length < 15) return "Please provide more details (at least 15 characters).";
      if (v.length > 2000) return "Message must be under 2000 characters.";
      const repeats = /(.)\1\1\1\1/.test(v.toLowerCase());
      const hasSpaces = v.includes(" ");
      const longWords = v.split(/\s+/).some(word => word.length > 30);
      const spamWords = /(free cash|casino|slot machine|viagra|instant rich|cheap bitcoin|cheap pharmacy)/i.test(v);
      if (repeats) return "Message contains repetitious spam patterns.";
      if (!hasSpaces && v.length > 25) return "Please enter standard spaced sentences.";
      if (longWords) return "Message contains excessive lengthy character blocks.";
      if (spamWords) return "Submission contains flagged spam keywords.";
    }
    return "";
  };

  // Real-time validations
  const validateField = (field: keyof FormState, value: string) => {
    const err = computeValidationError(field, value);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const triggerConfetti = () => {
    const colors = ["#4169E1", "#6495ED", "#F8FAFC", "#000080"];
    const burst: ConfettiPart[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 350,
      y: (Math.random() - 0.5) * 200 - 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setConfetti(burst);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation check across all fields
    const finalErrors: Partial<FormState> = {};
    const nameErr = computeValidationError("name", form.name);
    const emailErr = computeValidationError("email", form.email);
    const messageErr = computeValidationError("message", form.message);

    if (nameErr) finalErrors.name = nameErr;
    if (emailErr) finalErrors.email = emailErr;
    if (messageErr) finalErrors.message = messageErr;

    setErrors(finalErrors);

    if (Object.keys(finalErrors).length > 0) return;

    setIsSubmitting(true);

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setIsSubmitting(false);
          setIsSuccess(true);
          triggerConfetti();
          // Reset standard forms
          setForm({ name: "", email: "", interest: "pr", message: "" });
        } else {
          setIsSubmitting(false);
          if (data.errors) {
            setErrors(data.errors);
          } else {
            setErrors({ message: data.error || "An error occurred while transmitting." });
          }
        }
      })
      .catch(() => {
        setIsSubmitting(false);
        setErrors({ message: "Network connection failure. Please try again." });
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch relative">
      
      {/* Left Column: Bold call-to-action & credentials */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="lg:col-span-5 flex flex-col justify-between py-2 text-left bg-zinc-900/35 border border-brand-border rounded-3xl p-6 sm:p-9 relative overflow-hidden"
      >
        {/* Gloss background element */}
        <div className="absolute top-0 left-0 w-36 h-36 bg-royal-blue/5 blur-3xl pointer-events-none" />

        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase font-bold border border-brand-border px-2.5 py-1 bg-brand-gray rounded-full">
            Connect With Our Team
          </span>

          <h3 className="text-3xl sm:text-4xl font-serif italic text-white font-black mt-5 leading-tight">
            Let's build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-royal-light font-extrabold text-glow-blue">
              Your Legacy.
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed font-sans">
            Ready to establish dynamic market dominance, scale your digital authority, or manage critical brand reputations? Contact our advisory desk to start the conversation.
          </p>

          <div className="mt-8 space-y-4.5 font-sans">
            <div className="flex gap-4 items-center">
              <span className="w-9 h-9 rounded-full bg-brand-gray border border-brand-border text-royal-blue flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <span className="block text-[9px] font-mono text-slate-505 uppercase tracking-widest leading-none mb-1">
                  General Desk
                </span>
                <span className="block text-xs sm:text-sm text-slate-205 hover:text-royal-blue transition-colors font-semibold">
                  direct@therishieffect.com
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <span className="w-9 h-9 rounded-full bg-brand-gray border border-brand-border text-royal-blue flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <span className="block text-[9px] font-mono text-slate-505 uppercase tracking-widest leading-none mb-1">
                  Primary Line
                </span>
                <span className="block text-xs sm:text-sm text-slate-205 font-semibold">
                  +91 (022) 4890 2310
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <span className="w-9 h-9 rounded-full bg-brand-gray border border-brand-border text-royal-blue flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </span>
              <div>
                <span className="block text-[9px] font-mono text-slate-505 uppercase tracking-widest leading-none mb-1">
                  Active Locations
                </span>
                <span className="block text-xs sm:text-sm text-royal-blue font-bold uppercase tracking-wide">
                  Serving Ambitious Brands Nationally
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom micro signature */}
        <div className="mt-12 pt-6 border-t border-brand-border/60 text-2xs text-slate-505 font-mono flex justify-end items-center bg-brand-black/60 p-3.5 rounded-xl">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ONLINE DESK ACTIVE
          </span>
        </div>
      </motion.div>

      {/* Right Column: Custom interactive form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="lg:col-span-7 bg-brand-gray border border-brand-border rounded-3xl p-6 sm:p-9 md:p-11 shadow-xl relative min-h-[500px] flex flex-col justify-center"
      >
        
        {/* Render Confetti */}
        {isSuccess && confetti.map((part) => (
          <motion.div
            key={part.id}
            initial={{ opacity: 1, scale: 0.8, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: [1, 1.2, 0.5],
              x: part.x,
              y: part.y,
              rotate: Math.random() * 360
            }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 w-2.5 h-2.5 pointer-events-none rounded-full z-40"
            style={{ backgroundColor: part.color }}
          />
        ))}

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6.5 text-left"
            >
              <h4 className="text-xs font-mono uppercase text-royal-blue tracking-widest font-extrabold flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                GET IN TOUCH
              </h4>

              {/* Floating Input: Name */}
              <div className="relative">
                <input
                  type="text"
                  id="form-name"
                  value={form.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4.5 py-3.5 rounded-xl bg-brand-black/50 border outline-none text-slate-100 font-sans text-sm pt-5 pb-2.5 transition-colors peer ${
                    errors.name ? "border-amber-600" : "border-brand-border hover:border-slate-700 focus:border-royal-blue"
                  }`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="form-name"
                  className={`absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none font-mono text-2xs uppercase tracking-wider text-slate-550 transition-all ${
                    form.name.trim().length > 0 ? "top-2.5 text-[9px] text-royal-blue" : "peer-placeholder-shown:top-1/2"
                  }`}
                >
                  Full Name
                </label>
                {errors.name && (
                  <span className="text-[10px] font-mono text-amber-500 flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3" /> {errors.name}
                  </span>
                )}
              </div>

              {/* Floating Input: Email */}
              <div className="relative">
                <input
                  type="email"
                  id="form-email"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4.5 py-3.5 rounded-xl bg-brand-black/50 border outline-none text-slate-100 font-sans text-sm pt-5 pb-2.5 transition-colors peer ${
                    errors.email ? "border-amber-600" : "border-brand-border hover:border-slate-700 focus:border-royal-blue"
                  }`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="form-email"
                  className={`absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none font-mono text-2xs uppercase tracking-wider text-slate-550 transition-all ${
                    form.email.trim().length > 0 ? "top-2.5 text-[9px] text-royal-blue" : "peer-placeholder-shown:top-1/2"
                  }`}
                >
                  Email Address
                </label>
                {errors.email && (
                  <span className="text-[10px] font-mono text-amber-500 flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3" /> {errors.email}
                  </span>
                )}
              </div>

              {/* Custom selection wrapper */}
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold select-none">
                  What can we help you with?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "pr", label: "PR & Media" },
                    { id: "branding", label: "Brand Identity" },
                    { id: "strategy", label: "Business Strategy" },
                    { id: "social_media", label: "Social Dominance" }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleInputChange("interest", opt.id)}
                      className={`py-3 px-2.5 rounded-xl border text-2xs font-mono font-bold uppercase transition-all tracking-wider text-center cursor-pointer focus:outline-none ${
                        form.interest === opt.id
                          ? "bg-royal-blue/15 border-royal-blue text-royal-blue shadow-[0_0_15px_rgba(65,105,225,0.15)]"
                          : "bg-brand-black/40 border-brand-border hover:border-slate-700 text-slate-400 focus:outline-none"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Input: Message */}
              <div className="relative">
                <textarea
                  id="form-message"
                  value={form.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={4}
                  className={`w-full px-4.5 py-3.5 rounded-xl bg-brand-black/50 border outline-none text-slate-105 font-sans text-sm pt-7 pb-2.5 transition-colors resize-none peer ${
                    errors.message ? "border-amber-600" : "border-brand-border hover:border-slate-700 focus:border-royal-blue"
                  }`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="form-message"
                  className={`absolute left-4.5 top-5 pointer-events-none font-mono text-2xs uppercase tracking-wider text-slate-550 transition-all ${
                    form.message.trim().length > 0 ? "top-2.5 text-[9px] text-royal-blue" : "peer-placeholder-shown:top-5"
                  }`}
                >
                  Describe your project or business needs
                </label>
                {errors.message && (
                  <span className="text-[10px] font-mono text-amber-500 flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3" /> {errors.message}
                  </span>
                )}
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-royal-blue to-royal-light text-white font-mono text-xs font-black uppercase tracking-widest py-4 rounded-xl border border-royal-blue/30 hover:shadow-[0_0_20px_rgba(65,105,225,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? "SENDING INQUIRY..." : "SEND MESSAGE"}</span>
                {!isSubmitting && <Send className="w-3.5 h-3.5" />}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success-screen"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="text-center p-6"
            >
              {/* Illustrated checkmark draw animation */}
              <div className="w-20 h-20 rounded-full bg-royal-blue/15 border-2 border-royal-blue flex items-center justify-center mx-auto mb-6 text-royal-blue relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
                </motion.div>
                <div className="absolute inset-0 rounded-full border border-royal-blue filter blur-sm opacity-50 font-black animate-pulse" />
              </div>

              <h4 className="text-xl sm:text-2xl font-serif italic font-extrabold text-[#F8FAFC]">
                Message Sent.
              </h4>

              <p className="text-xs font-mono text-royal-blue uppercase tracking-widest mt-2">
                Thank you for reaching out
              </p>

              <p className="text-xs sm:text-sm text-slate-400 mt-4 max-w-sm mx-auto leading-relaxed font-sans">
                Our team is reviewing your inquiry and will contact you within 24 hours to schedule a consultation.
              </p>

              <button
                onClick={() => setIsSuccess(false)}
                className="mt-8 px-6 py-2.5 border border-brand-border bg-brand-black hover:border-royal-blue hover:text-royal-blue text-slate-300 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-colors cursor-pointer focus:outline-none"
              >
                Submit another inquiry
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
