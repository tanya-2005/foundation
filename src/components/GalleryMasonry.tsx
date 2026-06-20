import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, Sparkles, MapPin, Calendar, Heart } from "lucide-react";

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  location: string;
  date: string;
  caption: string;
  category: "Classrooms" | "Sanitation" | "Food" | "Blankets";
}

const galleryData: GalleryItem[] = [
  {
    id: "g-1",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
    title: "Slum Remedial Schooling",
    location: "Noida Sector-15 Slums",
    date: "May 2026",
    caption: "Distributed textbook backpacks, pens, and organized standard basic spelling-bee competition for first-generation learners.",
    category: "Classrooms",
  },
  {
    id: "g-2",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
    title: "Sanitation Kit Drive",
    location: "Rural Kakwan, Kanpur",
    date: "April 2026",
    caption: "Over 850 adolescent young girls attended our medical counselor session and accepted reusable sanitary hygiene pads packs.",
    category: "Sanitation",
  },
  {
    id: "g-3",
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
    title: "Remedial Coding Literacy",
    location: "Kakadev Center, Kanpur",
    date: "June 2026",
    caption: "Teaching local women basic digital spreadsheet logging, keyboard typing patterns, and secure online mobile banking.",
    category: "Classrooms",
  },
  {
    id: "g-4",
    url: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?q=80&w=600&auto=format&fit=crop",
    title: "Nutrition Food Distribution",
    location: "Yamuna Ghat, Delhi",
    date: "June 2026",
    caption: "Provided 1,200 bowls of warm high-protein lentil soup, rice, and fresh dynamic fruits to homeless and children of construction workers.",
    category: "Food",
  },
];

export default function GalleryMasonry() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredItems = galleryData.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  return (
    <div className="font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold tracking-wider text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full inline-block">
            On-Ground Snapshots
          </span>
          <h4 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-2 font-sans tracking-tight">
            Transparent Media Highlights
          </h4>
        </div>

        {/* Categories selector */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-1 rounded-xl">
          {["All", "Classrooms", "Sanitation", "Food"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-white dark:bg-slate-950 text-[#10b981] shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square border border-slate-200/30 dark:border-slate-800 cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
            id={`gallery-item-${item.id}`}
          >
            {/* Visual asset */}
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            {/* Premium backdrop overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div>
                <span className="text-[10px] font-mono tracking-wider font-bold text-[#10b981] bg-emerald-500/10 px-2 py-0.5 rounded-md inline-block">
                  {item.category}
                </span>
                <h5 className="text-sm font-semibold text-white mt-1.5 flex items-center justify-between">
                  <span>{item.title}</span>
                  <Maximize2 className="h-4 w-4 bg-white/10 p-1 rounded hover:bg-white/20" />
                </h5>
                <span className="text-[9px] text-slate-300 mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-rose-400" /> {item.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox zoomed modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden max-w-xl w-full border border-slate-100 dark:border-slate-800/80 shadow-2xl relative"
              id="lightbox-container"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute right-4 top-4 bg-slate-900/80 text-white hover:bg-slate-950 p-2.5 rounded-full z-10 cursor-pointer leading-none"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="relative aspect-video">
                <img
                  src={activeItem.url}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider font-bold text-rose-500 dark:text-rose-450 uppercase">
                      Campaign Archive : {activeItem.category}
                    </span>
                    <h5 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {activeItem.title}
                    </h5>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-mono font-medium">
                    <Calendar className="h-3.5 w-3.5" /> {activeItem.date}
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic mb-5">
                  "{activeItem.caption}"
                </p>

                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-rose-500" /> {activeItem.location}
                  </span>
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      const el = document.getElementById("calculator-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-rose-500 dark:text-rose-450 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Heart className="h-3 w-3 fill-rose-500 inline mr-0.5" /> Sponsor similar drive
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
