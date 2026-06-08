import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, ShieldCheck, Zap, Award, Globe } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What exactly is 'The Rishi Effect' and how does it differ from traditional PR?",
      answer: "Unlike standard agencies focused on passive press release logs and routine pitch follow-ups, we curate authoritative brand narratives from a standpoint of absolute category dominance. We represent our clients at the strategic intersection of national media positioning, premium digital architecture, and narrative defense. We do not look for mere traffic; we establish permanent, unassailable market authority.",
      icon: <Award className="w-4 h-4 text-royal-blue" />,
    },
    {
      question: "How quickly can your Crisis Control & Narrative Defense unit deploy?",
      answer: "Our triage team operates 24/7/365. In high-exposure industrial incidents, regulatory shifts, or sudden targeted media campaigns, we assemble our strategic defense council within 45 minutes. We immediately establish perimeter monitoring, coordinate with global press stakeholders, and deploy counter-narratives to neutralize institutional liability before it cascades.",
      icon: <ShieldCheck className="w-4 h-4 text-royal-blue" />,
    },
    {
      question: "What profile of clients do you typically represent?",
      answer: "We exclusively advise ambitious category captains, venture-backed hypergrowth startups, legacy family conglomerates, and high-visibility leadership figures who understand that public reputation is their single most valuable strategic asset. Our client slots are strictly limited to ensure direct partner-level dedication.",
      icon: <Zap className="w-4 h-4 text-royal-blue" />,
    },
    {
      question: "Do you handle national campaigns or regional mandates?",
      answer: "While our heritage and strategic war-rooms are anchored in the historic city of Prayagraj, our operational framework and executive outreach cover India and critical international financial corridors. We regularly coordinate cross-regional campaigns covering all tier-1 hubs, public indexes, and national broadcast networks.",
      icon: <Globe className="w-4 h-4 text-royal-blue" />,
    },
    {
      question: "What metrics are used to calculate tactical campaign outcomes?",
      answer: "We bypass superficial vanity metrics like 'Estimated PR Value'. We measure what actually moves markets: Share of Voice (SOV) dominance relative to top competitors, primary executive reputation score upgrades, high-intent brand discovery index improvements, and defense rates under negative campaign tests.",
      icon: <HelpCircle className="w-4 h-4 text-royal-blue" />,
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-brand-border bg-brand-black relative z-10 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-royal-blue/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-royal-blue/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-mono tracking-widest text-royal-blue uppercase font-black border border-royal-blue/20 px-3 py-1 bg-royal-blue/5 rounded-full">
            SYSTEM INQUIRIES & ADVISORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif italic text-white font-black mt-4 uppercase pb-1 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-450 max-w-xl mx-auto mt-3.5 leading-relaxed font-sans">
            Meticulously clarifying our elite PR operations, operational speed guidelines, regional coverage networks, and advisory engagement guidelines.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "bg-brand-gray/60 border-royal-blue/40 shadow-[0_10px_35px_rgba(65,105,225,0.06)]"
                    : "bg-brand-gray/25 border-brand-border/60 hover:border-brand-border hover:bg-brand-gray/45"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none focus:ring-0 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-black border border-brand-border flex items-center justify-center text-royal-blue shadow-inner">
                      {faq.icon}
                    </span>
                    <span className="font-serif italic text-sm sm:text-base text-slate-100 font-extrabold tracking-wide uppercase group-hover:text-royal-blue transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-black border border-brand-border/80 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pt-1 px-6 sm:px-8 pl-14 sm:pl-[60px] border-t border-brand-border/20 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
