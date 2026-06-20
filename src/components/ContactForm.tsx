import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, User, Mail, Phone, Map, ShieldAlert, Sparkles, Send, Clock, Users } from "lucide-react";

interface SubmissionsRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  city: string;
  timestamp: string;
}

export default function ContactForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "India",
    interest: "Volunteer",
    message: "",
    skills: "",
    availability: "Weekends",
    preferredContact: "Email",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [recents, setRecents] = useState<SubmissionsRecord[]>([]);

  // Fetch recent submissions in real-time to demonstrate persistence
  const fetchRecentSubmissions = async () => {
    try {
      const res = await fetch("/api/submissions");
      if (res.ok) {
        const data = await res.json();
        setRecents(data.slice(0, 4)); // Show top 4
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecentSubmissions();
  }, []);

  const validateStep = (currentStep: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) stepErrors.fullName = "Please enter your full name.";
      if (!formData.email.trim() || !formData.email.includes("@")) {
        stepErrors.email = "Please specify a valid email address.";
      }
      if (!formData.phone.trim() || formData.phone.length < 8) {
        stepErrors.phone = "Provide a valid phone number (min 8 digits).";
      }
      if (!formData.city.trim()) stepErrors.city = "Please tell us your current city.";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((p) => Math.min(3, p + 1));
    }
  };

  const handleBack = () => {
    setStep((p) => Math.max(1, p - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSuccessResponse(null);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate submission.");
      }

      const data = await response.json();
      setSuccessResponse(data.message);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        country: "India",
        interest: "Volunteer",
        message: "",
        skills: "",
        availability: "Weekends",
        preferredContact: "Email",
      });
      setStep(1);
      // Refresh board
      fetchRecentSubmissions();
    } catch (error) {
      alert("We encountered an error recording your interest. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div id="advanced-join-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
      {/* Dynamic Multi-Step Form desk */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[10px] font-mono tracking-wider font-bold text-emerald-500 uppercase">
                Active Civic Desk
              </span>
              <h4 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-0.5 tracking-tight">
                Submit Your Wings
              </h4>
            </div>

            {/* Stepper Progress bar */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2.5 rounded-xl shrink-0">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`h-6.5 w-6.5 rounded-full text-xs font-bold font-mono flex items-center justify-center transition-all ${
                      step >= s
                        ? "bg-[#10b981] text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-550"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-6 h-0.5 mx-1 transition-all ${
                        step > s ? "bg-[#10b981]" : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {successResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 p-4.5 rounded-xl text-xs text-emerald-700 dark:text-emerald-350 mb-5 leading-relaxed"
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Sparkles className="h-4.5 w-4.5 text-emerald-500" />
                  <span>Submission Successful!</span>
                </div>
                <p>{successResponse}</p>
                <button
                  onClick={() => setSuccessResponse(null)}
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline block mt-2 cursor-pointer"
                >
                  ✕ Dismiss Notification
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actual Form steps */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <p className="text-xs text-slate-450 mb-4">
                Step 1 of 3: Provide your profile details so our local regional lead can locate your coordinate proximity.
              </p>

              <div>
                <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Meera Deshmukh"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-rose-400 text-xs shadow-inner"
                    id="join-full-name-input"
                  />
                </div>
                {errors.fullName && <p className="text-[10px] text-rose-500 mt-1 font-mono font-bold">⚠ {errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="meera@outlook.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-rose-400 text-xs shadow-inner"
                      id="join-email-input"
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-rose-500 mt-1 font-mono font-bold">⚠ {errors.email}</p>}
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-rose-400 text-xs shadow-inner"
                      id="join-phone-input"
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-1 font-mono font-bold">⚠ {errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                    City *
                  </label>
                  <div className="relative">
                    <Map className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Kanpur"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-rose-400 text-xs shadow-inner"
                      id="join-city-input"
                    />
                  </div>
                  {errors.city && <p className="text-[10px] text-rose-500 mt-1 font-mono font-bold">⚠ {errors.city}</p>}
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none text-xs"
                    id="join-country-select"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <p className="text-xs text-slate-450 mb-3">
                Step 2 of 3: Select your exact engagement model. We support vocational internships, corporate strategic associations, and donor setups.
              </p>

              <div>
                <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-3">
                  Choose Engagement Channel
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { val: "Volunteer", label: "Become Volunteer", desc: "Work on fields" },
                    { val: "Donate", label: "Make Donation", desc: "Flexible aid options" },
                    { val: "Sponsor", label: "Sponsor Child", desc: "Pay direct kits" },
                    { val: "Partner Organization", label: "Partner NGO", desc: "CSR strategic tie" },
                    { val: "Internship", label: "Uplift Internship", desc: "Get certificates" },
                    { val: "General Inquiry", label: "General Ask", desc: "Info queries" },
                  ].map((ch) => {
                    const active = formData.interest === ch.val;
                    return (
                      <button
                        type="button"
                        key={ch.val}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, interest: ch.val }));
                        }}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                          active
                            ? "bg-[#10b981]/5 dark:bg-[#10b981]/10 border-[#10b981] ring-2 ring-[#10b981]/25"
                            : "bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800 hover:bg-slate-100/60 hover:dark:bg-slate-800/80"
                        }`}
                        id={`interest-pill-${ch.val}`}
                      >
                        <span className={`block text-xs font-bold ${active ? "text-[#10b981]" : "text-slate-700 dark:text-slate-350"}`}>
                          {ch.label}
                        </span>
                        <span className="block text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">
                          {ch.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <p className="text-xs text-slate-450 mb-3">
                Step 3 of 3: Share additional parameters about your schedule, available skills, and leave a brief introduction.
              </p>

              <div>
                <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                  Custom Message / Remarks
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about yourself or ask the team any queries..."
                  className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-rose-400 text-xs"
                  id="join-message-textarea"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                    Your Core Skillset
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. Teaching, Design, Excel"
                    className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-rose-400 text-xs"
                    id="join-skills-input"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                    Availability Mode
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none text-xs"
                    id="join-avail-select"
                  >
                    <option value="Weekends">Weekends Only</option>
                    <option value="Weekdays">Weekdays Only</option>
                    <option value="Full-Time Remote">Full-Time Remote</option>
                    <option value="Flexible Schedule">Flexible Hours</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                    Preferred Contact
                  </label>
                  <select
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none text-xs"
                    id="join-preferred-contact"
                  >
                    <option value="Email">Email Address</option>
                    <option value="Phone Call">Direct Phone Call</option>
                    <option value="WhatsApp">WhatsApp Message</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Buttons drawer */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100 dark:border-slate-900">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 text-slate-600 dark:text-slate-350 text-xs font-bold rounded-xl cursor-pointer"
            >
              Back Setup
            </button>
          ) : (
            <div className="text-[10px] font-mono text-slate-450">
              * required categories to route
            </div>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-850 text-xs font-bold rounded-xl cursor-pointer"
              id="stepper-next-button"
            >
              Continue Desk
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
              id="stepper-submit-button"
            >
              <Send className="h-3.5 w-3.5" /> {isSubmitting ? "Submitting Inquiry..." : "Submit My Association"}
            </button>
          )}
        </div>
      </div>

      {/* Persistence Showcase Side: Real-time Citizen Registry */}
      <div className="lg:col-span-5 bg-gradient-to-tr from-slate-900 to-[#064e3b] text-white p-6 md:p-8 rounded-3xl flex flex-col justify-between border border-emerald-950 shadow-lg relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono tracking-widest font-semibold uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full">
              Live Registry Status
            </span>
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <h4 className="text-xl font-black tracking-tight mt-1">
            Global Supporter Board
          </h4>
          <p className="text-xs text-emerald-200/85 mt-1 leading-relaxed">
            In compliance with open registry mandates, see citizens registering their support for NayePankh's activities. Submissions list dynamically updates from database records.
          </p>

          <div className="mt-6 space-y-4">
            {recents.length === 0 ? (
              <div className="text-center py-8 text-emerald-350/50 text-xs border border-dashed border-emerald-900/40 rounded-xl relative">
                No active records. Submitting your detail will instantly register your name on this board!
              </div>
            ) : (
              recents.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex justify-between items-start text-xs relative"
                >
                  <div>
                    <span className="font-bold block text-slate-100">{item.fullName}</span>
                    <div className="flex items-center gap-2 text-[10px] text-emerald-300 mt-1">
                      <span className="bg-emerald-500/20 px-1.5 py-0.5 rounded uppercase font-mono font-bold tracking-wider">
                        {item.interest}
                      </span>
                      <span>•</span>
                      <span>{item.city}</span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-slate-400 font-mono font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-emerald-800/40 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-emerald-400" /> Multi-session syncing
          </span>
          <span>Verified Security Active</span>
        </div>
      </div>
    </div>
  );
}
