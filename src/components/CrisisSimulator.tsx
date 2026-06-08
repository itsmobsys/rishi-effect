import React, { useState } from "react";
import { ShieldAlert, Play, CheckCircle, Flame, ArrowRight, ShieldCheck, HelpCircle, Terminal, Info } from "lucide-react";

interface DecisionStep {
  text: string;
  score: number;
  rationale: string;
}

interface Scenario {
  id: string;
  title: string;
  incident: string;
  steps: {
    label: string;
    options: DecisionStep[];
  }[];
}

const CRISIS_SCENARIOS: Scenario[] = [
  {
    id: "data-breach",
    title: "Category A: Infrastructure Cybersecurity Intrusion",
    incident: "A hostile threat actor claims access to 4.2 Million customer diagnostics files and leaks a sample on public developer forums, demanding a cryptocurrency ransom. Media agencies are contacting your communication lead with a 60-minute commentary expiry.",
    steps: [
      {
        label: "Immediate T=15m Action Vector:",
        options: [
          {
            text: "Issue a sweeping generic apology statement, promising total investigation while shutting down community server messaging channels.",
            score: 25,
            rationale: "Defensive lockouts and premature apologetic posts signal critical panic, prompting media sources to spin severe speculative stories in the absence of verified facts."
          },
          {
            text: "Launch a structured facts-index docket: declare exact numbers breached, mobilize data engineers, and communicate transparently to customers.",
            score: 95,
            rationale: "Rishi Playbook gold standard. Transparency bounds the incident scale, prevents rumors, and captures the technical authority before third-party speculation grows."
          },
          {
            text: "Defer comments to legal teams, maintaining absolute silence for 48 hours to ensure complete intelligence gather.",
            score: 55,
            rationale: "While legally safe, total silence creates a content void. Media editors will fill this space with interviews from adversarial consultants or angry consumers."
          }
        ]
      },
      {
        label: "Follow-up T=180m Containment Vector:",
        options: [
          {
            text: "Coordinate a live executive video address highlighting the exact corrective blueprint and security patches engineered.",
            score: 90,
            rationale: "Direct, humble, and technical leader communication redirects emotional user distress toward structural solutions."
          },
          {
            text: "Publish aggressive editorial advertisements emphasizing previous positive security certifications from compliance bodies.",
            score: 30,
            rationale: "Referring to historic accolades during an active failure is perceived as diversionary gaslighting, compounding consumer irritation."
          },
          {
            text: "Directly dispute the file count leaked by the threat actors via aggressive corporate legal warnings.",
            score: 40,
            rationale: "Poymics over file details look defensive and unsympathetic. Keep the public dialogue focused exclusively on user protection protocols."
          }
        ]
      }
    ]
  },
  {
    id: "product-recall",
    title: "Category B: Electric Assembly Quality Thermal Leak",
    incident: "Two reports emerge of battery thermal incidents in your company's new electric vehicle within the same city. Private cellular footage of one smoking vehicle is trending on national video applications with 12M organic views.",
    steps: [
      {
        label: "Immediate T=15m Action Vector:",
        options: [
          {
            text: "Publish a legal release suggesting incorrect third-party device usage as the primary driver behind thermal failure.",
            score: 20,
            rationale: "Blaming customers before completing an internal analysis triggers instant public rage and brand dilution."
          },
          {
            text: "Issue a localized recall of that specific batch, publish raw video teardown of the faulty module, and invite engineering analysts to inspect.",
            score: 95,
            rationale: "Over-compliance and radical transparency disarm critics. Demonstrating engineering mastery rebuilds complete consumer trust."
          },
          {
            text: "Initiate silent, rapid direct contact replacements to the two vehicle owners, keeping generic press statements deactivated.",
            score: 60,
            rationale: "Solves the direct risk but ignores the 12 million viral viewers. The brand remains framed as producing unsafe hardware by omission."
          }
        ]
      },
      {
        label: "Follow-up T=180m Containment Vector:",
        options: [
          {
            text: "Form an independent 'Climate Grid Advisory Panel' to audit your entire lithium-battery assembly line.",
            score: 85,
            rationale: "Third-party validation represents an objective shield that validates your high long-term manufacturing standards."
          },
          {
            text: "Launch a heavy discount promo drive to offset negative sales dip in other markets.",
            score: 35,
            rationale: "Discounting premium hardware during safety emergencies cheapens the vehicle, reading as desperation rather than care."
          }
        ]
      }
    ]
  },
  {
    id: "regulatory-strategy",
    title: "Category C: Brand Disruption & Growth Protection",
    incident: "A major competitor spreads viral rumors on short-form video platforms that your client's logistics network relies on unsafe automated sorting units, causing an immediate 25% dip in organic delivery orders.",
    steps: [
      {
        label: "Immediate T=1 Hour Action Vector:",
        options: [
          {
            text: "Coordinate a transparent live broadcast of the automated facility with zero-cut video feeds, while inviting trade journalists for a walk-through.",
            score: 95,
            rationale: "Rishi Effect Playbook gold standard. Radical transparency and live press access dismantle viral safety claims before public outrage turns into consumer boycotts."
          },
          {
            text: "Initiate aggressive media attack campaigns targeting the competitor brand for anti-competitive defamation.",
            score: 15,
            rationale: "Adversarial corporate wars sound defensive to third-party consumers, making the brand appear combative and guilty by proxy."
          },
          {
            text: "Remain completely neutral, leaving digital accounts silent while directing lawyers to prepare formal cease-and-desist indices.",
            score: 50,
            rationale: "Temporary silence allows the viral rumors to dominate search results and social feeds without any voice defending your brand."
          }
        ]
      },
      {
        label: "Follow-up PR Campaign & Trust Alignment Vector:",
        options: [
          {
            text: "Co-create a regional safety-certification ledger with independent safety councils to verify and publish safety ratings.",
            score: 90,
            rationale: "Credible third-party endorsements equip public relations spokespersons with objective credentials to defend brand equity."
          },
          {
            text: "Engage in private corporate negotiations with competitors without preparing public communications files.",
            score: 25,
            rationale: "Solving matters privately does not address the public viral video. Unaddressed public narratives continue to degrade organic customer acquisition."
          }
        ]
      }
    ]
  }
];

export const CrisisSimulator: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [gameRoute, setGameRoute] = useState<"welcome" | "playing" | "results">("welcome");
  const [runningScores, setRunningScores] = useState<number[]>([]);
  const [cumulativeRationale, setCumulativeRationale] = useState<string[]>([]);

  const activeScenario = CRISIS_SCENARIOS[activeScenarioIdx];

  const handleStartGame = (idx: number) => {
    setActiveScenarioIdx(idx);
    setCurrentStepIdx(0);
    setSelectedOptionIdx(null);
    setRunningScores([]);
    setCumulativeRationale([]);
    setGameRoute("playing");
  };

  const handleOptionSelect = (idx: number) => {
    setSelectedOptionIdx(idx);
  };

  const handleNextStep = () => {
    if (selectedOptionIdx === null) return;

    const chosenOption = activeScenario.steps[currentStepIdx].options[selectedOptionIdx];
    const newScores = [...runningScores, chosenOption.score];
    const newRationales = [...cumulativeRationale, chosenOption.rationale];
    setRunningScores(newScores);
    setCumulativeRationale(newRationales);

    if (currentStepIdx < activeScenario.steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
      setSelectedOptionIdx(null);
    } else {
      setGameRoute("results");
    }
  };

  const calculateFinalAverage = () => {
    if (runningScores.length === 0) return 0;
    const sum = runningScores.reduce((a, b) => a + b, 0);
    return Math.round(sum / runningScores.length);
  };

  const finalScore = calculateFinalAverage();

  const getRankInterpretation = (score: number) => {
    if (score >= 85) return {
      label: "Narrative Champion",
      color: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
      description: "You follow premium PR strategic protocols. You protect design recall assets, contain incident parameters, and direct social media dynamics with authority."
    };
    if (score >= 55) return {
      label: "Vulnerable Stabilizer",
      color: "text-amber-400 bg-amber-950/40 border-amber-500/30",
      description: "You mitigate legal damages but sacrifice emotional trust. Strategic third-party content voids could still dilute your enterprise market share."
    };
    return {
      label: "Narrative Deficit Crisis",
      color: "text-rose-400 bg-rose-950/40 border-rose-500/30",
      description: "Catastrophic containment error. Defensive denials, premature apologies, and community lockouts invite complete public panic and regulatory intervention."
    };
  };

  const rating = getRankInterpretation(finalScore);

  return (
    <div className="w-full bg-brand-gray border border-brand-border rounded-xl p-5 md:p-8 flex flex-col justify-between min-h-[450px] relative overflow-hidden shadow-2xl">
      {/* Visual wireframes background */}
      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-royal-blue/40 via-royal-blue/40 to-royal-silver/20" />
      <div className="absolute -top-[10px] -right-[10px] w-28 h-28 bg-gradient-to-tr from-royal-blue/5 to-royal-silver/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header telemetry info */}
      <div className="flex items-center justify-between border-b border-brand-border pb-3.5 mb-5 text-2xs font-mono text-slate-400 uppercase tracking-widest">
        <span className="flex items-center gap-1.5 font-bold">
          <Terminal className="w-4 h-4 text-royal-blue shrink-0" />
          PR & Brand Defense Sandbox
        </span>
        <span className="bg-royal-blue/15 border border-royal-blue/25 px-2.5 py-0.5 rounded text-royal-blue font-bold text-[10px]">
          The Rishi Effect v4.0 • BLUE COGNIZANT
        </span>
      </div>

      {gameRoute === "welcome" ? (
        <div className="flex-1 flex flex-col justify-center py-4">
          <h4 className="text-xl font-display font-semibold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-royal-blue" />
            <span className="bg-gradient-to-r from-slate-100 via-royal-silver to-royal-blue bg-clip-text text-transparent">Corporate PR & Social Media Crisis Simulator</span>
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed mt-2 max-w-xl font-sans">
            In India's high-growth business landscape, communication errors destroy decades of brand equity. Test your PR and social media responses below:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-6">
            {CRISIS_SCENARIOS.map((sc, scIdx) => (
              <button
                key={sc.id}
                onClick={() => handleStartGame(scIdx)}
                className="text-left bg-brand-black border border-brand-border/80 hover:border-royal-blue p-4 rounded-lg group transition-all duration-300 cursor-pointer focus:outline-none flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest">
                      VECT_0{scIdx + 1}
                    </span>
                    <Play className="w-3 h-3 text-royal-blue group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h5 className="font-display font-medium text-sm text-slate-100 mt-2.5 group-hover:text-royal-blue transition-colors">
                    {sc.title}
                  </h5>
                  <p className="text-xs text-slate-400 leading-snug mt-2 line-clamp-3">
                    {sc.incident}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-brand-border/30 text-[10px] font-mono text-slate-505 group-hover:text-royal-silver">
                  Launch Command Sequence →
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2.5 text-2xs font-mono text-slate-400 bg-brand-black/40 p-3 rounded border border-brand-border/40">
            <Info className="w-4 h-4 text-royal-blue shrink-0" />
            <span>Simulations are modeled directly on live corporate PR and social media cases from The Rishi Effect's premium experience.</span>
          </div>
        </div>
      ) : gameRoute === "playing" ? (
        <div className="flex-1 flex flex-col">
          {/* Step metrics tracker */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-royal-silver font-bold">
              Active incident: {activeScenario.title}
            </span>
            <span className="text-2xs font-mono text-slate-400 bg-brand-black px-2 py-0.5 rounded border border-brand-border">
              Phase {currentStepIdx + 1}/{activeScenario.steps.length}
            </span>
          </div>

          {/* Incident prompt */}
          <div className="bg-brand-black/95 p-4 rounded border border-brand-border/80 mb-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-royal-blue" />
            <h5 className="text-xs font-mono font-bold text-royal-blue flex items-center gap-2 mb-1.5">
              <Flame className="w-4 h-4 text-royal-blue shrink-0" />
              CRITICAL ADVISORY DIRECTIVE:
            </h5>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {currentStepIdx === 0 ? activeScenario.incident : "The communications landscape shifts. Corporate rivals and digital media outlets escalate coverage. Strategic counter required:"}
            </p>
          </div>

          {/* Question text */}
          <p className="text-xs font-mono text-royal-silver uppercase tracking-widest mb-3 font-semibold">
            {activeScenario.steps[currentStepIdx].label}
          </p>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {activeScenario.steps[currentStepIdx].options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => handleOptionSelect(oIdx)}
                className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all duration-300 flex items-start gap-3 cursor-pointer focus:outline-none ${
                  selectedOptionIdx === oIdx
                    ? "bg-royal-blue/10 border-royal-blue text-slate-100 shadow-[0_0_15px_-3px_rgba(65,105,225,0.15)]"
                    : "bg-brand-black/50 border-brand-border/65 text-slate-300 hover:bg-slate-900/60 hover:border-royal-silver/60"
                }`}
              >
                <span className={`w-5 h-5 rounded-md border shrink-0 flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  selectedOptionIdx === oIdx
                    ? "border-royal-blue bg-gradient-to-b from-royal-blue to-royal-light text-white shadow"
                    : "border-slate-700 bg-brand-black/40 text-slate-400"
                }`}>
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <span className="leading-relaxed font-sans">{opt.text}</span>
              </button>
            ))}
          </div>

          {/* Step control footer */}
          <div className="mt-8 pt-4 border-t border-brand-border flex justify-end">
            <button
              onClick={handleNextStep}
              disabled={selectedOptionIdx === null}
              className={`px-6 py-2.5 rounded text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 transition-all outline-none duration-300 ${
                selectedOptionIdx === null
                  ? "bg-brand-black border border-brand-border text-slate-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-royal-blue to-royal-light text-white font-extrabold cursor-pointer hover:shadow-[0_0_20px_rgba(65,105,225,0.25)] stroke-white"
              }`}
            >
              <span>{currentStepIdx < activeScenario.steps.length - 1 ? "Evaluate & Proceed" : "Transmit Strategic Plan"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between animate-fade-in">
          <div className="text-center py-4 flex flex-col items-center">
            <div className="w-16 h-16 bg-royal-blue/15 border border-royal-blue/30 rounded-full flex items-center justify-center text-royal-blue mb-4 shadow-[0_0_15px_rgba(65,105,225,0.15)]">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <span className="text-2xs font-mono text-royal-silver tracking-wider uppercase font-bold">
              Consensus Formed • Protocol Transmitted
            </span>

            <h5 className="text-xl font-display font-semibold text-slate-100 mt-1 mb-4">
              Premium PR & Media Evaluation
            </h5>

            {/* Score Ring indicator with metallic accents */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              {/* background ring */}
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  className="stroke-brand-black fill-none stroke-[6px]"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  className="stroke-royal-blue fill-none stroke-[6px] transition-all duration-1000 ease-out"
                  strokeDasharray={`${2 * Math.PI * 68}`}
                  strokeDashoffset={`${2 * Math.PI * 68 * (1 - finalScore / 100)}`}
                />
              </svg>
              <div className="text-center">
                <span className="text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-royal-silver to-royal-blue">{finalScore}%</span>
                <span className="block text-[9px] font-mono text-royal-silver mt-1.5 uppercase tracking-widest font-bold">PR & Narrative Defense Index</span>
              </div>
            </div>

            {/* Classification Card */}
            <div className={`p-4 rounded border text-left max-w-md w-full mb-6 ${rating.color} shadow-sm`}>
              <h6 className="font-mono text-xs uppercase font-bold tracking-widest mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-current inline-block animate-pulse" />
                Strategic Rank: {rating.label}
              </h6>
              <p className="text-xs leading-relaxed font-sans opacity-95">
                {rating.description}
              </p>
            </div>

            {/* Rationales Breakdown logs */}
            <div className="w-full text-left bg-brand-black border border-brand-border rounded-lg p-4 text-xs max-w-md shadow-inner">
              <span className="block text-2xs font-mono text-royal-silver uppercase tracking-wider mb-2.5 border-b border-brand-border/50 pb-1.5 font-bold">
                Operational Feedback & PR Alignment:
              </span>
              <ul className="space-y-4 divide-y divide-brand-border/40">
                {cumulativeRationale.map((rat, rIdx) => (
                  <li key={rIdx} className={`${rIdx > 0 ? "pt-3" : ""}`}>
                    <span className="block text-[9px] font-mono text-royal-blue font-bold uppercase tracking-wide">
                      Phase {rIdx + 1} System Evaluation:
                    </span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">{rat}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-brand-border mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-2xs font-mono text-slate-400">
              Need expert PR, branding, or social media counsel? Let's consult.
            </span>
            <button
              onClick={() => setGameRoute("welcome")}
              className="text-2xs font-mono bg-brand-black border border-brand-border hover:border-royal-blue text-slate-300 hover:text-royal-blue px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Recalibrate Coordinates</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
