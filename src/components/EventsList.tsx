import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Heart, AlertCircle, Clock, Check } from "lucide-react";
import { NGOEvent } from "../types";

const initEvents: NGOEvent[] = [
  {
    id: "evt-1",
    title: "Slum Remedial School Teaching Camp",
    date: "July 02, 2026",
    time: "10:30 AM IST",
    location: "Noida Sec-21 Municipal Shala",
    slotsLeft: 12,
    category: "Education",
    description: "Volunteer as a tutor to conduct interactive reading, mathematics exercises, and basic storytelling with adolescent slum boys and girls.",
  },
  {
    id: "evt-2",
    title: "Monsoon Health Clinic Distribution",
    date: "July 12, 2026",
    time: "09:00 AM IST",
    location: "Sanjay Nagar Slum ground, Kanpur",
    slotsLeft: 4,
    category: "Health",
    description: "Join registered general physicians in setting up temporary medical counters to distribute safe hydration fluids, sanitizers, and immune pills.",
  },
];

export default function EventsList() {
  const [events, setEvents] = useState<NGOEvent[]>(initEvents);
  const [registeredList, setRegisteredList] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<string>("11d 16h 24m");

  // Simulate subtle digital interval countdown
  useEffect(() => {
    const timer = setInterval(() => {
      // simulate realistic progressive time updates
      const min = Math.floor(Math.random() * 60);
      setTimeLeft(`11d 15h ${min}m`);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleRegister = (id: string) => {
    if (registeredList.includes(id)) return;
    setRegisteredList((prev) => [...prev, id]);
    setEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, slotsLeft: Math.max(0, evt.slotsLeft - 1) } : evt))
    );
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-slate-100 dark:border-slate-900 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.2 rounded-full inline-block">
            Field Opportunities
          </span>
          <h4 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1.5 font-sans tracking-tight">
            Upcoming Campaigns & Camps
          </h4>
        </div>

        {/* Global indicator */}
        <div className="bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-100/50 dark:border-rose-900/30 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
          <Clock className="h-4.5 w-4.5 animate-pulse" />
          <span>Next Drive starts in: <strong>{timeLeft}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => {
          const isRegistered = registeredList.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800/80 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              id={`event-card-${evt.id}`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[9px] font-mono tracking-widest font-extrabold uppercase px-2.5 py-1 rounded-md ${
                    evt.category === "Education"
                      ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                      : "text-amber-500 bg-amber-50 dark:bg-amber-950/40"
                  }`}>
                    {evt.category} Camp
                  </span>
                  
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-slate-500" /> {evt.slotsLeft} Slots remaining
                  </span>
                </div>

                <h5 className="text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">
                  {evt.title}
                </h5>

                <div className="space-y-1.5 my-3.5 text-[11px] text-slate-450">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-450 leading-relaxed font-light mb-4 text-justify">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100/10 flex justify-between items-center">
                <span className="text-[9px] text-[#10b981] font-mono flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" /> Certificate Provided
                </span>

                <button
                  onClick={() => handleRegister(evt.id)}
                  className={`px-4.5 py-2 rounded-xl text-xs font-bold tracking-tight cursor-pointer transition-all ${
                    isRegistered
                      ? "bg-slate-100 dark:bg-slate-900 text-slate-500 cursor-default"
                      : "bg-[#10b981] hover:bg-[#059669] text-white"
                  }`}
                >
                  {isRegistered ? "✓ Slots reserved" : "Quick Register"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
