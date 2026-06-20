import React, { useState } from "react";
import { BookOpen, Heart, Award, ArrowUpRight, Check, Users, Sparkles } from "lucide-react";
import { Initiative } from "../types";

const initiativesList: Initiative[] = [
  {
    id: "init-edu",
    title: "Primary Education",
    description: "Establishing remedial teaching hubs, supplying uniforms and textbook bags inside urban margins.",
    longDescription: "Our primary education vertical ensures first-generation children drop back into high schools. Over 91% of our digital literacy and coding camps are fully sponsored by individual donors globally.",
    iconName: "BookOpen",
    impactGoal: "15,000 students enrolled",
    beneficiariesCount: "4,600+ tutoring hours spent",
    color: "emerald",
  },
  {
    id: "init-health",
    title: "Healthcare Access",
    description: "Organizing state authorized clinical blood camps and distributing feminine sanitizer kits weekly.",
    longDescription: "We operate medical health buses carrying licensed child physicians to municipal slum regions, providing vaccines, diagnostics, and high-quality, reusable hygiene supplies for adolescent girls.",
    iconName: "Heart",
    impactGoal: "8,000 hygienic packets delivered",
    beneficiariesCount: "12,200+ healthy immunizations",
    color: "pink",
  },
  {
    id: "init-women",
    title: "Women Empowerment",
    description: "Intense skill mentoring in garment handcrafting, sewing machinery, and basic digital bookkeeping.",
    longDescription: "Our vocational tailoring centers allow widows and marginalized single-mothers to learn stitching and boutique design. Upon successful completion, they obtain trade machine sponsorship.",
    iconName: "Award",
    impactGoal: "3,500 women self-reliant",
    beneficiariesCount: "2,400+ finished trade items sold",
    color: "rose",
  },
  {
    id: "init-env",
    title: "Eco Sustainability",
    description: "Sustaining plastic-free neighborhood sanitation camps and direct seed sapling distribution.",
    longDescription: "NayePankh environment ambassadors drive continuous neighborhood waste cleanups, distributing seeds, water storage jars, and promoting non-plastic alternatives to village markets.",
    iconName: "Sparkles",
    impactGoal: "10,000 tree saplings grown",
    beneficiariesCount: "115+ plastic collection camps",
    color: "amber",
  },
];

export default function ProgramsSlider() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(initiativesList[0].id);

  const activeFocus = initiativesList.find((i) => i.id === selectedId) || initiativesList[0];

  const getIcon = (name: string) => {
    switch (name) {
      case "BookOpen":
        return <BookOpen className="h-5.5 w-5.5" />;
      case "Heart":
        return <Heart className="h-5.5 w-5.5" />;
      case "Award":
        return <Award className="h-5.5 w-5.5" />;
      default:
        return <Sparkles className="h-5.5 w-5.5" />;
    }
  };

  const getCol = (col: string) => {
    if (col === "emerald") return "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900";
    if (col === "pink") return "text-pink-500 bg-pink-50 dark:bg-pink-950/40 border-pink-100 dark:border-pink-900";
    if (col === "rose") return "text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900";
    return "text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
      {/* Cards list */}
      <div className="lg:col-span-7 space-y-4">
        {initiativesList.map((item) => {
          const hovered = hoveredId === item.id;
          const selected = selectedId === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedId(item.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 ${
                selected
                  ? "bg-white dark:bg-slate-950 border-[#10b981] shadow-md shadow-emerald-500/5 translate-x-1"
                  : "bg-slate-50/75 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-950"
              }`}
            >
              <div className={`p-3 rounded-xl border self-start shrink-0 ${getCol(item.color)}`}>
                {getIcon(item.iconName)}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {item.title}
                  </h4>
                  <span className={`text-[11px] font-mono font-bold uppercase transition-colors ${selected ? "text-[#10b981]" : "text-slate-400"}`}>
                    Active Status &rarr;
                  </span>
                </div>
                <p className="text-xs text-slate-450 mt-1 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100/10 text-[10px] font-mono text-slate-400">
                  <span>Target: <strong className="text-slate-700 dark:text-slate-300">{item.impactGoal}</strong></span>
                  <span>•</span>
                  <span>Impacted: <strong className="text-emerald-500">{item.beneficiariesCount}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory Details card */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-[#10b981] bg-emerald-500/10 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
            In-Focus Strategic Area
          </span>
          <h4 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 mt-3 font-sans tracking-tight">
            {activeFocus.title}
          </h4>
          <p className="text-xs text-slate-450 leading-relaxed mt-2.5">
            {activeFocus.longDescription}
          </p>

          <div className="mt-6 border-t border-slate-100 dark:border-slate-900 pt-5 space-y-3.5">
            <h5 className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-450">
              Active Project Benchmarks
            </h5>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-350">
              <Check className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
              <span>Full compliance with central government NGO guidelines (NITI Aayog Darpan registered).</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-350">
              <Check className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
              <span>Expenditure fully audited by neutral 3rd-party accounting systems.</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-350">
              <Check className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
              <span>Geotagged assets map verification sent directly to child sponsor's desk.</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById("advanced-join-form");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-8 w-full bg-[#10b981] hover:bg-[#059669] text-white py-3 rounded-xl font-bold text-xs tracking-tight shadow-md hover:shadow-lg hover:shadow-emerald-500/10 flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <span>Become a volunteer for this program</span>
          <ArrowUpRight className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}
