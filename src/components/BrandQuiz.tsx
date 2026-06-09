/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, RefreshCw, Star, Info, Trophy } from "lucide-react";
import { AudioEngine } from "./AudioEngine";
import { QuizQuestion } from "../types";

const BRAND_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "What's your current monthly digital content reach?",
    options: [
      { label: "Under 1,000 views", points: 10, description: "Virtually invisible online." },
      { label: "1K to 10K views", points: 20, description: "Whispering into a small room." },
      { label: "10K to 100K views", points: 40, description: "Flickers of momentum popping." },
      { label: "100K+ views", points: 60, description: "Commanding decent traction." },
    ]
  },
  {
    id: 2,
    text: "How consistent is your current posting schedule?",
    options: [
      { label: "Never / Ghost town", points: 5, description: "Algorithm actively penalizes you." },
      { label: "Sometimes / When inspired", points: 15, description: "No rhythm, purely impulsive." },
      { label: "3x per week minimum", points: 35, description: "Decent rhythm, needs systematization." },
      { label: "Daily content machine", points: 50, description: "Absolute powerhouse distribution." },
    ]
  },
  {
    id: 3,
    text: "Do you have a clearly defined brand voice guide?",
    options: [
      { label: "What is that?", points: 10, description: "Complete identity crisis." },
      { label: "Kinda, in my head", points: 25, description: "Lacks structural handbook rules." },
      { label: "Yes, but loose rules", points: 35, description: "Good start, inconsistent execution." },
      { label: "Crystal clear & systemic", points: 55, description: "Unshakeable market presence." },
    ]
  },
  {
    id: 4,
    text: "What is your current single biggest operational struggle?",
    options: [
      { label: "Fresh content ideas", points: 15, description: "Creative pipeline blockages." },
      { label: "Engagement ratios", points: 15, description: "Lacks visual hooks, zero sticky index." },
      { label: "Follower growth velocity", points: 15, description: "Stuck in distribution limits." },
      { label: "Direct pipeline monetization", points: 20, description: "Attention is high, conversions zero." },
    ]
  },
  {
    id: 5,
    text: "How serious are you about scaling your brand?",
    options: [
      { label: "Just exploring options", points: 10, description: "Tire kicker, treating it like a hobby." },
      { label: "Fairly interested", points: 25, description: "Wants growth but fears workload." },
      { label: "Highly committed", points: 40, description: "Ready to deploy real resources." },
      { label: "ABSOLUTELY OBSESSED", points: 65, description: "Wants total category domination now." },
    ]
  }
];

export default function BrandQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [pointsTotal, setPointsTotal] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [renderedScore, setRenderedScore] = useState(0);

  const handleSelectOption = (points: number, optionIdx: number) => {
    AudioEngine.playTick();
    const newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = optionIdx;
    setSelectedAnswers(newAnswers);

    // Proceed to next step or compile
    if (currentStep < BRAND_QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300);
    } else {
      // Complete and compile score percentages (Max points is 280)
      const finalScorePoints = newAnswers.reduce((sum, idx, qId) => {
        return sum + BRAND_QUIZ_QUESTIONS[qId].options[idx].points;
      }, 0);
      
      const percentageScore = Math.min(100, Math.round((finalScorePoints / 280) * 100));
      
      setTimeout(() => {
        setQuizFinished(true);
        AudioEngine.playChimeChord();
        
        // Count score up dynamically
        let count = 0;
        const speed = Math.max(10, 800 / percentageScore);
        const interval = setInterval(() => {
          count++;
          setRenderedScore(count);
          if (count >= percentageScore) {
            clearInterval(interval);
          }
        }, speed);
      }, 400);
    }
  };

  const handleReset = () => {
    AudioEngine.playTick();
    setCurrentStep(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
    setRenderedScore(0);
  };

  // Generate dynamic, witty custom assesment and roasts
  const generateRoastAndAdvice = (score: number, answers: number[]) => {
    const mainStruggleIdx = answers[3] ?? 0;
    const consistencyIdx = answers[1] ?? 0;
    
    let advice = "";
    let roast = "";

    if (score < 40) {
      roast = "Your brand isn't just asleep; it is on life support in a deep digital void. You have zero consistency and the algorithm doesn't even know you exist.";
      advice = "Stop treating content like a diary. You need structural posting systems, instant visual hooks, and immediate brand architecture before you spend even one rupee on ads.";
    } else if (score >= 40 && score < 70) {
      roast = "You have flashes of decent ideas, but your execution makes you look like an amateur hobbyist. You show up when inspired, which is why your pipeline is a desert.";
      advice = "Transition from impulsive posting to a factory execution pipeline. Build 10 high-impact assets in advance, write crystal-clear scripts, and focus on capturing leads.";
    } else {
      roast = "Formidable base foundations. Your reach or consistency is working. But you're likely leaving millions on the table due to loose packaging and weak monetized conversions.";
      advice = "You are ready for elite scaling. Optimize your high-retention frameworks, deploy high-ticket funnel traps, and partner with a premium agency to unleash war.";
    }

    return { roast, advice };
  };

  const getDiagnostics = () => {
    if (renderedScore < 40) {
      return {
        tier: "BEGINNER ZONE // DIGITAL SILENCE",
        colorClass: "text-[#0062FF]",
        bgClass: "bg-[#0062FF]/10 border-[#0062FF]/20",
        cta: "Your brand is in a critical crisis. Book a repair call immediately."
      };
    } else if (renderedScore >= 40 && renderedScore < 70) {
      return {
        tier: "GROWING ZONE // FRICTION STAGE",
        colorClass: "text-[#00D5FF]",
        bgClass: "bg-[#00D5FF]/10 border-[#00D5FF]/20",
        cta: "You're close to breakthrough. Let's close the gap."
      };
    } else {
      return {
        tier: "THE EFFECT ZONE // OUTRIGHT DOMINATION",
        colorClass: "text-[#C9A84C]",
        bgClass: "bg-[#C9A84C]/10 border-[#C9A84C]/20",
        cta: "Your systems are ready for war. Connect premium operations now."
      };
    }
  };

  const diag = getDiagnostics();
  const evaluation = quizFinished ? generateRoastAndAdvice(renderedScore, selectedAnswers) : { roast: "", advice: "" };

  return (
    <div className="w-full bg-[#111118] border border-white/[0.04] rounded-2xl overflow-hidden shadow-2xl relative">
      <div className="p-1 bg-gradient-to-r from-[#0062FF] via-[#C9A84C] to-[#00D5FF]" />

      {!quizFinished ? (
        // ACTIVE QUIZ INTERFACE
        <div className="p-6 md:p-10 relative">
          {/* Question Stepper Indicator */}
          <div className="flex justify-between items-center mb-8 border-b border-white/[0.04] pb-5">
            <div>
              <span className="font-mono text-[10px] text-[#C9A84C] uppercase tracking-widest block mb-1">BRAND DIAGNOSTICS</span>
              <span className="font-sans text-xs text-[#F5F0E8]/50">STAGE {currentStep + 1} OF {BRAND_QUIZ_QUESTIONS.length}</span>
            </div>
            {/* Visual Progress Line */}
            <div className="flex space-x-1">
              {BRAND_QUIZ_QUESTIONS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    idx <= currentStep ? "bg-[#0062FF]" : "bg-[#1C1C1C]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h3 className="font-display text-lg md:text-2xl font-extrabold text-[#F5F0E8] tracking-tight leading-snug">
              {BRAND_QUIZ_QUESTIONS[currentStep].text}
            </h3>
          </div>

          {/* Answer Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {BRAND_QUIZ_QUESTIONS[currentStep].options.map((opt, oIdx) => {
              const isActive = selectedAnswers[currentStep] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.points, oIdx)}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? "bg-[#0062FF]/15 border-[#0062FF] text-[#F5F0E8]"
                      : "bg-[#0A0A0A] border-white/[0.04] text-[#F5F0E8]/70 hover:border-white/10 hover:text-[#F5F0E8]"
                  }`}
                >
                  <div className="flex flex-col space-y-0.5">
                    <span className="font-sans text-xs md:text-sm font-semibold">{opt.label}</span>
                    <span className="font-mono text-[10px] text-[#F5F0E8]/40 group-hover:text-[#F5F0E8]/60 transition-colors duration-300">
                      {opt.description}
                    </span>
                  </div>
                  {/* Select indicator */}
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isActive ? "border-[#0062FF] bg-[#0062FF]" : "border-white/10"
                  }`}>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        // DIAGNOSTIC SCORE REVEAL INTERFACE
        <div className="p-6 md:p-10 text-center animate-fadeIn">
          <Trophy className="w-12 h-12 text-[#C9A84C] mx-auto mb-4 animate-bounce" />
          
          <h3 className="font-display text-sm font-extrabold text-[#F5F0E8]/60 tracking-widest uppercase mb-1">
            BRAND EVALUATION METRIC
          </h3>
          
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="text-6xl md:text-8xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0062FF] to-[#C9A84C] tracking-tighter shadow-sm">
              {renderedScore}
            </div>
            <div className={`mt-2 font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded border ${diag.bgClass} ${diag.colorClass}`}>
              {diag.tier}
            </div>
          </div>

          {/* Brutal Assessment */}
          <div className="bg-[#0A0A0A]/80 border border-white/[0.04] rounded-xl p-5 md:p-6 mb-8 text-left space-y-4 max-w-xl mx-auto">
            <div>
              <div className="flex items-center space-x-1.5 font-mono text-[10px] text-[#0062FF] font-bold uppercase tracking-widest mb-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>BRUTAL ANALYSIS</span>
              </div>
              <p className="font-sans text-xs md:text-sm text-[#F5F0E8]/70 leading-relaxed italic">
                "{evaluation.roast}"
              </p>
            </div>

            <div className="border-t border-white/[0.03] pt-4">
              <div className="flex items-center space-x-1.5 font-mono text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1.5">
                <Star className="w-3.5 h-3.5 text-emerald-500" />
                <span>STRATEGIC FIRST STEPS</span>
              </div>
              <p className="font-sans text-xs md:text-sm text-[#F5F0E8]/90 leading-relaxed font-medium">
                {evaluation.advice}
              </p>
            </div>
          </div>

          {/* Custom Action Recommendation */}
          <div className="max-w-md mx-auto space-y-4">
            <p className="font-sans text-xs text-[#F5F0E8]/60 uppercase tracking-widest">
              WHAT ACTION TO TAKE NEXT:
            </p>
            
            <a 
              href="#contact"
              style={{ contentVisibility: "auto" }}
              className="block w-full text-center py-4 bg-[#0062FF] hover:bg-[#0062FF]/90 text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,98,255,0.3)] hover:shadow-[0_4px_30px_rgba(0,98,255,0.5)] transform hover:scale-[1.02]"
            >
              {diag.cta}
            </a>

            <button
              onClick={handleReset}
              className="flex items-center justify-center space-x-2 text-[10px] font-mono font-bold text-[#F5F0E8]/40 hover:text-[#F5F0E8]/80 transition-colors duration-300 mx-auto"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RETAKE DIAGNOSTIC SYSTEM</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
