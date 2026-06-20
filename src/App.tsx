import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  BookOpen,
  Users,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Award,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  TrendingUp,
  Award as PrizeIcon,
  ChevronDown
} from "lucide-react";

// Import custom elite modular components
import MapSection from "./components/MapSection";
import DonationCalculator from "./components/DonationCalculator";
import BeforeAfterCard from "./components/BeforeAfterCard";
import ProgramsSlider from "./components/ProgramsSlider";
import GalleryMasonry from "./components/GalleryMasonry";
import EventsList from "./components/EventsList";
import ContactForm from "./components/ContactForm";
import ChatbotDrawer from "./components/ChatbotDrawer";

export default function App() {
  // Theme state
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Stats Counters live ticking simulator
  const [livesCount, setLivesCount] = useState<number>(31240);
  const [fundsRaised, setFundsRaised] = useState<number>(4580200);

  // Newsletter email state
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);

  useEffect(() => {
    // Ticking animations to show real-time citizen micro-contributions
    const livesInterval = setInterval(() => {
      setLivesCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 12000);

    const fundsInterval = setInterval(() => {
      setFundsRaised((prev) => prev + Math.floor(Math.random() * 125) + 40);
    }, 7000);

    return () => {
      clearInterval(livesInterval);
      clearInterval(fundsInterval);
    };
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterMsg(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      setNewsletterMsg(data.message);
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterMsg("Technical latency error. Please try again in a minute.");
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-rose-500 selection:text-white flex flex-col">
        
        {/* Floating Quick Action Widgets */}
        <div className="fixed bottom-6 left-6 z-40 hidden md:block">
          <button
            onClick={() => scrollToSection("calculator-section")}
            className="flex items-center gap-2 px-5 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400"
            id="floating-easy-donate-action"
          >
            <Heart className="h-4 w-4 fill-white animate-pulse" />
            <span>₹ Instant Sponsor desk</span>
          </button>
        </div>

        {/* Top Header Navigation */}
        <nav className="sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-6 md:px-12 py-4.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-850 z-50 transition-colors duration-200">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("html-hero-section")}>
            <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-850 dark:text-white font-sans">
              NayePankh<span className="text-[#10b981]">Foundation</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-wider uppercase font-bold text-slate-600 dark:text-slate-400">
            <button onClick={() => scrollToSection("our-mission-block")} className="hover:text-[#10b981] transition-colors cursor-pointer">Mission</button>
            <button onClick={() => scrollToSection("impact-map-section")} className="hover:text-[#10b981] transition-colors cursor-pointer">Operations map</button>
            <button onClick={() => scrollToSection("programs-and-initiatives")} className="hover:text-[#10b981] transition-colors cursor-pointer">Programs</button>
            <button onClick={() => scrollToSection("gallery-section")} className="hover:text-[#10b981] transition-colors cursor-pointer">Gallery Highlights</button>
            <button onClick={() => scrollToSection("event-highlights-section")} className="hover:text-[#10b981] transition-colors cursor-pointer">Camps</button>
            <button onClick={() => scrollToSection("advanced-join-form")} className="hover:text-[#10b981] transition-colors cursor-pointer">Join movement</button>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme switcher toggle pill */}
            <button
              onClick={() => setDarkTheme(!darkTheme)}
              className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800/80 transition-colors"
              title="Toggle Theme Preset"
              id="theme-toggler"
            >
              {darkTheme ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-slate-700" />}
            </button>

            {/* CTA action buttons */}
            <button
              onClick={() => scrollToSection("advanced-join-form")}
              className="hidden sm:inline-flex px-5 py-2.5 text-xs font-bold text-[#10b981] border border-[#10b981] rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all cursor-pointer tracking-tight"
            >
              Become Volunteer
            </button>
            <button
              onClick={() => scrollToSection("calculator-section")}
              className="px-6 py-2.5 text-xs font-extrabold text-white bg-[#10b981] rounded-full tracking-tight hover:bg-[#059669] shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 border-b border-emerald-400/20 cursor-pointer transform active:scale-95 transition-all"
            >
              Donate Now
            </button>

            {/* Mobile hamburger icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/20 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer Screen */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-slate-50 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-5 space-y-3 z-40 overflow-hidden flex flex-col font-mono text-[10px] uppercase font-bold"
            >
              <button onClick={() => scrollToSection("our-mission-block")} className="text-left py-2 hover:text-emerald-500">Mission</button>
              <button onClick={() => scrollToSection("impact-map-section")} className="text-left py-2 hover:text-emerald-500">Operations map</button>
              <button onClick={() => scrollToSection("programs-and-initiatives")} className="text-left py-2 hover:text-emerald-500">Programs</button>
              <button onClick={() => scrollToSection("gallery-section")} className="text-left py-2 hover:text-emerald-500">Gallery highlights</button>
              <button onClick={() => scrollToSection("event-highlights-section")} className="text-left py-2 hover:text-emerald-500">Camps</button>
              <button onClick={() => scrollToSection("advanced-join-form")} className="text-left py-2 hover:text-emerald-500">Join movement</button>
              <button
                onClick={() => scrollToSection("calculator-section")}
                className="w-full text-center py-2.5 bg-emerald-500 text-white rounded-lg block font-sans"
              >
                ₹ Open Sponsor Desk
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Sections */}
        <main className="flex-1 space-y-24 pb-12">
          
          {/* Section 1: HERO VIEW SECTION */}
          <section id="html-hero-section" className="relative h-[680px] bg-slate-950 overflow-hidden flex items-center justify-center p-6 md:p-12">
            
            {/* Background Image with elegant darkness matrix filter overlay */}
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1400&h=800&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-90 saturate-[0.85]"
              alt="Underprivileged children educational program workspace"
            />
            {/* Soft Sleek Green radial light projection */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />

            <div className="relative max-w-5xl w-full z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
              
              {/* Left text Column */}
              <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
                <div className="inline-flex items-center gap-2 mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full backdrop-blur-xs w-fit mx-auto lg:mx-0">
                  <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                    Central NGO NITI Aayog Verified NayePankh
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-sans">
                  Transforming Lives, <br/>
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-rose-300 bg-clip-text text-transparent italic">
                    Spreading True Wings.
                  </span>
                </h1>

                <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed mt-4 max-w-xl mx-auto lg:mx-0 text-justify md:text-left">
                  We are a premium non-profit foundation in India building modular, transparent infrastructure for child tutoring classrooms, hygiene kits for local women, and immediate winter shelter relief campaigns.
                </p>

                {/* Main Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start">
                  <button
                    onClick={() => scrollToSection("calculator-section")}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-sm rounded-full shadow-lg shadow-emerald-500/20 transform active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <span>Instant Donate (Tax Exempt)</span>
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                  
                  <button
                    onClick={() => scrollToSection("advanced-join-form")}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-full border border-white/20 backdrop-blur-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    Become localized volunteers
                  </button>
                </div>
              </div>

              {/* Right Hero Statistics board Column */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900/40 dark:bg-slate-950/65 border border-slate-700/35 p-6 rounded-3xl backdrop-blur-md shadow-2xl relative">
                  
                  {/* Grid of counters */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-widest font-bold text-slate-400 uppercase block mb-1">
                      Verified Field Metrics
                    </span>
                    
                    <div className="border-b border-slate-800pb-3 flex justify-between items-baseline">
                      <div>
                        <span className="text-[9px] font-mono tracking-wider font-bold text-emerald-400 uppercase block">
                          Lives Restructured
                        </span>
                        <span className="text-4xl font-extrabold text-white tracking-tight leading-none mt-1 inline-block">
                          {livesCount.toLocaleString()}+
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 italic">slum children & women</span>
                    </div>

                    <div className="border-b border-slate-800 pb-3 flex justify-between items-baseline">
                      <div>
                        <span className="text-[9px] font-mono tracking-wider font-bold text-emerald-400 uppercase block">
                          Total Program Outlay (INR)
                        </span>
                        <span className="text-3xl font-extrabold text-emerald-300 tracking-tight leading-none mt-1 inline-block">
                          ₹ {(fundsRaised).toLocaleString()}+
                        </span>
                      </div>
                      <span className="text-xs text-[#10b981]">91% direct fields</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 uppercase block">
                          Registered Volunteers
                        </span>
                        <span className="text-xl font-bold font-sans text-white block mt-0.5">
                          1,420+
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 uppercase block">
                          Completed Hubs
                        </span>
                        <span className="text-xl font-bold font-sans text-white block mt-0.5">
                          142+ Villages
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Quote */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs">
                    <TrendingUp className="h-4.5 w-4.5 text-rose-400 flex-shrink-0" />
                    <span className="text-slate-400 italic text-[11px] leading-tight font-light col-span-2">
                       "Every child receives direct textbooks geolocated report."
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scroll indicators down */}
            <button
               onClick={() => scrollToSection("our-mission-block")}
               className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer hidden md:flex items-center justify-center animate-bounce"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </section>

          {/* Section 2: OUR MISSION, VISION & ETHOS VIEW */}
          <section id="our-mission-block" className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold tracking-wider text-[#10b981] bg-emerald-500/10 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full inline-block uppercase">
                NGO Ethos & Objectives
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mt-2 font-sans tracking-tight">
                Empowering Marginal Slum Lines
              </h2>
              <p className="text-sm text-slate-450 dark:text-slate-500 mt-3 leading-relaxed">
                NayePankh was initiated by civic students aiming to provide structural, non-corrupt mechanisms to channel resources. See below the parameters we obey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Mission Card */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-850 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-[#10b981] flex items-center justify-center mb-5">
                    <BookOpen className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-150 font-sans">
                    The Vision
                  </h3>
                  <p className="text-xs text-slate-450 leading-relaxed mt-2.5">
                    To establish a world where poverty doesn't restrict standard healthcare options, basic computing literacy, or safe personal hygiene for rural adolescent girls.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 mt-6 block uppercase">
                  ✓ NITI Aayog registered guidelines
                </span>
              </div>

              {/* Integrity Card */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-850 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-5">
                    <Heart className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-150 font-sans">
                    Absolute Transparency
                  </h3>
                  <p className="text-xs text-slate-450 leading-relaxed mt-2.5">
                    Every donation is geolocated on-site. Donors receive direct PDF reports displaying child schoolbooks handed-over, sanitizers packed, or food camps served.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 mt-6 block uppercase">
                  ✓ 3rd-party audits open
                </span>
              </div>

              {/* Action Card */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-850 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-5">
                    <Award className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-150 font-sans">
                    Civic Integration
                  </h3>
                  <p className="text-xs text-slate-450 leading-relaxed mt-2.5">
                    Enabling common citizens, corporate strategic planners, and college students to coordinate directly via organized, certifiable field chapters.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#10b981] mt-6 block uppercase">
                  ✓ 1,420+ Certificates Distributed
                </span>
              </div>

            </div>
          </section>

          {/* Section 3: THE FIELD OPERATIONS INTERACTIVE MAP */}
          <section className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold tracking-wider text-[#10b981] bg-emerald-500/10 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full inline-block uppercase">
                Active Ground Presence
              </span>
              <h2 className="text-3xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1.5 font-sans tracking-tight">
                Interactive National Nodes Status
              </h2>
            </div>
            {/* Modular active maps widget */}
            <MapSection />
          </section>

          {/* Section 4: PROGRAMS & TARGET INTERVENTIONS SLIDER */}
          <section id="programs-and-initiatives" className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold tracking-wider text-[#10b981] bg-emerald-500/10 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full inline-block uppercase font-bold">
                Five Strategic Hubs
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mt-1.5 font-sans tracking-tight animate-pulse">
                Targeted Initiatives & Activities
              </h2>
              <p className="text-sm text-slate-450 dark:text-slate-500 mt-2 max-w-lg mx-auto">
                Select any custom strategic vertical below to read deep metrics, compliance benchmarks, and field goals.
              </p>
            </div>
            {/* Program slider widget */}
            <ProgramsSlider />
          </section>

          {/* Section 5: BEFORE & AFTER TRANSFORMATION CASE STORIES */}
          <section className="max-w-7xl mx-auto px-6 md:px-12">
            <BeforeAfterCard />
          </section>

          {/* Section 6: GALLERY ON-GROUND HIGHLIGHT MEDIA */}
          <section id="gallery-section" className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Lightboxed masonry widget */}
            <GalleryMasonry />
          </section>

          {/* Section 7: THE HOW YOU CAN HELP SPONSOR-TIER CALCULATOR DESK */}
          <section className="max-w-7xl mx-auto px-6 md:px-12">
            <DonationCalculator />
          </section>

          {/* Section 8: EVENTS Countdowns */}
          <section id="event-highlights-section" className="max-w-7xl mx-auto px-6 md:px-12">
            <EventsList />
          </section>

          {/* Section 9: TRUSTED PARTNERS & LEGAL SHOWCASE */}
          <section className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-850 py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto text-center">
              <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-slate-400 block mb-6">
                TRUSTED BY LEADING SOCIAL & AUDITING INSTITUTIONS
              </span>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-65 dark:opacity-50">
                <div className="text-center font-sans tracking-tight font-black text-slate-400 text-lg">
                  UN GDC COMMITTED
                </div>
                <div className="text-center font-sans tracking-tight font-black text-slate-400 text-lg">
                  DARPAN NGO REGISTERED
                </div>
                <div className="text-center font-sans tracking-tight font-black text-[#10b981] text-lg">
                  ISO-9000 AUDITED
                </div>
                <div className="text-center font-sans tracking-tight font-black text-rose-500 text-lg">
                  81 TAX EXEMPTION
                </div>
              </div>

              <p className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-8 max-w-2xl mx-auto">
                "NayePankh Foundation is a fully verified, NITI Aayog registered non-governmental organization (ID: UP/2021/0214815). All contributions fall under direct section 80G Indian Income Tax exemptions."
              </p>
            </div>
          </section>

          {/* Section 10: ADVANCED CONTACT & ENGAGEMENT REGISTRY FORM */}
          <section className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold tracking-wider text-[#10b981] bg-emerald-500/10 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full inline-block uppercase">
                Strategic Alliance Desk
              </span>
              <h2 className="text-3xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2 font-sans tracking-tight">
                Submit Your Wings Coordinator Channel
              </h2>
            </div>
            {/* Multi-step form with submissions showcase */}
            <ContactForm />
          </section>

        </main>

        {/* Global Footer */}
        <footer className="bg-slate-950 text-slate-300 px-6 md:px-12 py-14 border-t border-slate-900 font-sans">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            {/* Col 1 */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  NayePankh<span className="text-[#10b981]">Foundation</span>
                </span>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed text-justify">
                NayePankh is an innovative, youth-led, verified social-improvement NGO operating extensively inside multiple cities of Uttar Pradesh, Delhi NCR, and Karnataka.
              </p>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Registered Headquarters
                </span>
                <span className="text-xs text-slate-350 block">
                  C-5, Sanjay Nagar, Govind Nagar, Kanpur, Uttar Pradesh (Pin Code: 208006), India.
                </span>
              </div>
            </div>

            {/* Col 2 */}
            <div className="md:col-span-2 space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider font-mono text-[10px] text-emerald-400">
                Strategic Focus
              </h5>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection("programs-and-initiatives")} className="hover:text-white transition-colors">Primary Education</button></li>
                <li><button onClick={() => scrollToSection("programs-and-initiatives")} className="hover:text-white transition-colors">Women Sanitary Packs</button></li>
                <li><button onClick={() => scrollToSection("programs-and-initiatives")} className="hover:text-white transition-colors">Vocational Tailoring</button></li>
                <li><button onClick={() => scrollToSection("programs-and-initiatives")} className="hover:text-white transition-colors">Warm Blanket Relief</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="md:col-span-2 space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider font-mono text-[10px] text-emerald-400">
                Organization links
              </h5>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection("our-mission-block")} className="hover:text-white transition-colors">Our Ethos & Values</button></li>
                <li><button onClick={() => scrollToSection("impact-map-section")} className="hover:text-white transition-colors">Regional Map Hub</button></li>
                <li><button onClick={() => scrollToSection("event-highlights-section")} className="hover:text-white transition-colors">Active Camps</button></li>
                <li><button onClick={() => scrollToSection("advanced-join-form")} className="hover:text-white transition-colors">Career Internships</button></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="font-bold text-white uppercase tracking-wider font-mono text-[10px] text-emerald-400">
                Join our newsletter digest
              </h5>
              <p className="text-xs text-slate-400 leading-snug">
                Subscribe to accept geolocated ground project PDF statements directly in your inbox. No spam.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500"
                  id="newsletter-email-field"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-colors"
                  id="newsletter-subscribe-button"
                >
                  Join
                </button>
              </form>

              {newsletterMsg && (
                <p className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                  {newsletterMsg}
                </p>
              )}
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 text-center text-[11px] text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span>&copy; {new Date().getFullYear()} NayePankh Foundation Registered NGO Office. All rights reserved.</span>
            </div>
            <div className="flex gap-4 font-mono">
              <a href="#" className="hover:text-white">Privacy Regulations</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Tax Code 80G Exemption Audit</a>
            </div>
            <div className="text-[10px] text-[#10b981] font-mono">
              Trustpilot rating ★★★★★ 4.9/5
            </div>
          </div>
        </footer>

        {/* Global Floating AI Chatbot Ambassador Panel */}
        <ChatbotDrawer />

      </div>
    </div>
  );
}
