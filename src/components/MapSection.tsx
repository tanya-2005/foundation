import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Users, Heart, BookOpen, AlertCircle } from "lucide-react";
import { LiveStateImpact } from "../types";

const activeRegions: LiveStateImpact[] = [
  {
    id: "up-east",
    stateName: "Uttar Pradesh (Kanpur & Lucknow)",
    paths: [],
    activeProjects: 14,
    livesImpacted: "18,500+",
    volunteersCount: 420,
    highlightStory: "NayePankh's primary base. 8 digital adult literacy classrooms successfully launched and 4,000+ girls empowered through sanitary distribution drives.",
    centerCoordinates: { x: 45, y: 38 },
  },
  {
    id: "delhi-ncr",
    stateName: "Delhi NCR (Noida & Ghaziabad)",
    paths: [],
    activeProjects: 9,
    livesImpacted: "12,200+",
    volunteersCount: 290,
    highlightStory: "Primary focused on slum children's remedial education centers, enrolling 850+ first-generation learners into private and state schools.",
    centerCoordinates: { x: 38, y: 30 },
  },
  {
    id: "maharashtra",
    stateName: "Maharashtra (Mumbai & Pune)",
    paths: [],
    activeProjects: 6,
    livesImpacted: "6,400+",
    volunteersCount: 150,
    highlightStory: "Supporting children of migrant construction laborers with mobile schools and tailoring training drives for single mothers.",
    centerCoordinates: { x: 30, y: 62 },
  },
  {
    id: "karnataka",
    stateName: "Karnataka (Bengaluru Urban)",
    paths: [],
    activeProjects: 4,
    livesImpacted: "3,100+",
    volunteersCount: 110,
    highlightStory: "Focused on community waste managers' healthcare & immunization camps and distributing school kits to girl students.",
    centerCoordinates: { x: 35, y: 80 },
  },
  {
    id: "bihar",
    stateName: "Bihar (Patna & Rural)",
    paths: [],
    activeProjects: 5,
    livesImpacted: "5,800+",
    volunteersCount: 95,
    highlightStory: "Winter relief drives and establishing mobile health checkup units supporting agricultural widow families.",
    centerCoordinates: { x: 58, y: 40 },
  },
];

export default function MapSection() {
  const [selectedRegion, setSelectedRegion] = useState<LiveStateImpact>(activeRegions[0]);

  return (
    <div id="impact-map-section" className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Stylized interactive hub */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="mb-6 text-center lg:text-left w-full">
            <span className="text-xs font-semibold tracking-wider text-rose-500 dark:text-rose-400 uppercase bg-rose-50 dark:bg-rose-950/40 px-3.5 py-1.5 rounded-full inline-block">
              Operations Hub
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2 font-sans tracking-tight">
              Interactive Field Map
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md">
              Hover or click the radar hotspots to view active field metrics, success insights, and regional volunteer programs.
            </p>
          </div>

          {/* Interactive stylized Map design */}
          <div className="relative w-full max-w-[480px] aspect-[4/5] bg-slate-100/70 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
            {/* Background Map Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.1] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Simulated abstract SVG of India map outline for elite visual design */}
            <svg
              viewBox="0 0 100 100"
              className="absolute w-5/6 h-5/6 text-slate-300 dark:text-slate-800 stroke-2 opacity-50 dark:opacity-40"
              style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
            >
              {/* Artistic northern border */}
              <path
                d="M 38 10 L 45 15 L 42 22 L 48 24 L 52 20 L 53 26 L 47 32 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              {/* Western and Eastern main outline borders */}
              <path
                d="M 38 10 L 32 15 L 28 25 L 22 30 L 25 38 L 22 45 L 25 50 L 22 58 L 28 65 L 30 75 L 35 85 L 38 95 L 40 95 L 42 85 L 45 78 L 50 68 L 55 60 L 58 52 L 62 45 L 68 38 L 74 38 L 68 32 L 60 30 L 53 26"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="2,2"
              />
              {/* South Peninsular Coast border */}
              <path
                d="M 30 75 L 35 83 L 38 95 L 42 90 L 45 80 L 50 65"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
            </svg>

            {/* Compass label */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-400 dark:text-slate-500 flex flex-col">
              <span>LAT: 20.5937° N</span>
              <span>LON: 78.9629° E</span>
            </div>

            {/* Target nodes mapper */}
            {activeRegions.map((region) => {
              const isActive = selectedRegion.id === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className="absolute p-2 focus:outline-none group z-10 cursor-pointer"
                  style={{
                    left: `${region.centerCoordinates.x}%`,
                    top: `${region.centerCoordinates.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  id={`map-node-${region.id}`}
                >
                  {/* Radar Wave Effect */}
                  <span className="absolute inline-flex h-10 w-10 -left-1 -top-1 rounded-full bg-rose-400 opacity-20 group-hover:scale-150 animate-ping" />
                  
                  {/* Primary Center dot */}
                  <span
                    className={`relative block h-4.5 w-4.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-rose-500 scale-125 shadow-lg shadow-rose-500/40 ring-4 ring-rose-500/20"
                        : "bg-slate-400 dark:bg-slate-600 group-hover:bg-rose-400 group-hover:scale-110"
                    }`}
                  />

                  {/* Micro label */}
                  <span
                    className={`absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900/90 dark:bg-slate-800/95 text-white dark:text-slate-100 text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-sans font-medium border border-slate-700/50`}
                  >
                    {region.stateName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Region Metrics Display */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRegion.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-md"
            >
              {/* Header */}
              <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-900 pb-4 mb-4">
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 dark:text-rose-400">
                  <MapPin className="h-5.5 w-5.5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-rose-500 dark:text-rose-400">
                    Active Operational Node
                  </span>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">
                    {selectedRegion.stateName}
                  </h4>
                </div>
              </div>

              {/* Statistical Grid */}
              <div className="grid grid-cols-2 gap-4 my-5">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 block">
                    Lives Restructured
                  </span>
                  <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight font-sans block mt-1">
                    {selectedRegion.livesImpacted}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 block">
                    Active Campaigns
                  </span>
                  <span className="text-2xl font-extrabold text-[#10b981] tracking-tight font-sans block mt-1">
                    {selectedRegion.activeProjects}
                  </span>
                </div>
              </div>

              {/* Volunteer list */}
              <div className="flex items-center gap-3 text-xs bg-rose-50/40 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 p-3 rounded-xl border border-rose-100/55 dark:border-rose-950/35 mb-6">
                <Users className="h-4.5 w-4.5 flex-shrink-0" />
                <span>
                  <strong>{selectedRegion.volunteersCount}+ Registered Volunteers</strong> actively managing food, health, and classroom programs weekly.
                </span>
              </div>

              {/* Local Success Segment Story */}
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500 block mb-2">
                  Impact Focus area & Activities
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-sans italic bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border-l-[3.5px] border-rose-500">
                  "{selectedRegion.highlightStory}"
                </p>
              </div>

              {/* Interactive redirection tag */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-mono">
                  <AlertCircle className="h-4 w-4" /> State ID: {selectedRegion.id}
                </span>
                <button
                  onClick={() => {
                    const formElement = document.getElementById("advanced-join-form");
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-rose-500 dark:text-rose-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Apply to this branch &rarr;
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
