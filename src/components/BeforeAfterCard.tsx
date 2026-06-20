import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeftRight, Heart, Sparkles, MessageSquare } from "lucide-react";
import { BeneficiaryStory } from "../types";

const stories: BeneficiaryStory[] = [
  {
    id: "story-1",
    name: "Anjali Kumari",
    age: 14,
    location: "Sanjay Nagar Slum, Kanpur",
    category: "Primary Education",
    storyBefore: "Anjali was working at a roadside tea stall with her elder brother after dropping out of school in the 4th grade to help pay for her mother's dialysis.",
    storyAfter: "NayePankh team sponsored her family's medical kits and enrolled Anjali into a remedial tutorial camp. Today, she is in the 8th grade, scoring 92% in mathematics and dreams of becoming a pediatric physician.",
    imageBefore: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop",
    imageAfter: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
  },
  {
    id: "story-2",
    name: "Sarita Devi",
    age: 32,
    location: "Rural Unnao Outskirts",
    category: "Women Empowerment",
    storyBefore: "An illiterate single mother of three, Sarita depended on inconsistent seasonal farming wages, struggling with deep financial debt and food insecurity.",
    storyAfter: "Enrolled in our 3-month intensive digital sewing and garment tailoring curriculum. NayePankh provided her a brand-new mechanical tailoring machine. She now runs a home boutique earning over ₹8,500 monthly.",
    imageAfter: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
    imageBefore: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&auto=format&fit=crop",
  },
];

export default function BeforeAfterCard() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  const activeStory = stories[activeIndex];

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const containerRect = e.currentTarget.getBoundingClientRect();
    const touchX = e.touches[0].clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (touchX / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1 || isSwiping) {
      const containerRect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const percentage = Math.max(0, Math.min(100, (mouseX / containerRect.width) * 100));
      setSliderPosition(percentage);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-900 pb-5">
        <div>
          <span className="text-xs font-semibold tracking-wider text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full inline-block">
            Proven Interventions
          </span>
          <h4 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-2 font-sans tracking-tight">
            Before & After Transformations
          </h4>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 max-w-md">
            Drag the slider over the photos below to see the physical transformation in health, school apparel, and living standards.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800/60 shrink-0">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => {
                setActiveIndex(index);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                activeIndex === index
                  ? "bg-white dark:bg-slate-950 text-[#10b981] shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
              }`}
            >
              {story.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Visual Slider */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            className="relative w-full max-w-[380px] aspect-square rounded-2xl overflow-hidden shadow-md select-none touch-none cursor-ew-resize border border-slate-200 dark:border-slate-800"
            onTouchMove={handleTouchMove}
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsSwiping(true)}
            onMouseUp={() => setIsSwiping(false)}
            onMouseLeave={() => setIsSwiping(false)}
          >
            {/* Before Image (Right Side) */}
            <div className="absolute inset-0">
              <img
                src={activeStory.imageAfter}
                alt={`${activeStory.name} After`}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-3 right-3 bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-xs">
                After
              </div>
            </div>

            {/* Before Image Overlay (Left Side) */}
            <div
              className="absolute inset-0 border-r border-[#10b981]"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeStory.imageBefore}
                alt={`${activeStory.name} Before`}
                className="absolute inset-0 w-[380px] max-w-none h-full object-cover pointer-events-none"
                style={{ width: "380px" }}
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Before
              </div>
            </div>

            {/* Handle Bar Control */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white hover:bg-emerald-400 flex items-center justify-center transition-colors pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-8 w-8 rounded-full bg-white text-slate-800 dark:bg-slate-950 dark:text-[#10b981] flex items-center justify-center shadow-lg border border-slate-200 pointer-events-none">
                <ArrowLeftRight className="h-4.5 w-4.5" />
              </div>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-3 font-mono">
            ★ Drag handle to witness the paradigm shift
          </span>
        </div>

        {/* Story details */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 block uppercase">
            Beneficiary Case Study — {activeStory.category}
          </span>
          <h5 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 font-sans tracking-tight mt-1">
            {activeStory.name}, {activeStory.age} Years Old
          </h5>
          <span className="text-xs text-slate-500 dark:text-slate-450 mt-0.5 block">
            Representing: {activeStory.location}
          </span>

          {/* Side-by-side details block */}
          <div className="space-y-4 my-5">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-l-[3.5px] border-slate-400">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
                The Struggle (Previous State)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans font-light">
                {activeStory.storyBefore}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border-l-[3.5px] border-emerald-500">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-500 block mb-1">
                The Upliftment (Sponsorship Effect)
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-normal italic">
                "{activeStory.storyAfter}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-rose-50/50 dark:bg-rose-950/20 p-3 rounded-xl border border-rose-100/50 dark:border-rose-950/30">
            <Heart className="h-4.5 w-4.5 text-rose-500 fill-rose-500 animate-pulse flex-shrink-0" />
            <span className="text-[11px] text-rose-800 dark:text-rose-300 font-sans font-medium">
              You can sponsor another girl's education desk or training kit for as low as ₹500.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
