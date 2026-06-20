import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Gift, BookOpen, ShieldCheck, ShoppingBag, Sparkles, AlertCircle, Copy, Check } from "lucide-react";

interface DonationTier {
  amount: number;
  label: string;
  cause: string;
  impactDescription: string;
  statsLabel: string;
  deliverables: string[];
}

const tiers: DonationTier[] = [
  {
    amount: 500,
    label: "Essential Books",
    cause: "Primary Education Support",
    impactDescription: "Provides a monthly supply of textbook materials, notebook packets, and school colors for 1 underprivileged slum student.",
    statsLabel: "1 Child Educated / Month",
    deliverables: ["2 Textbooks & 4 Notebooks", "Complete Writing Set", "Tuition Center Attendance Certificate"],
  },
  {
    amount: 1200,
    label: "Safe Growth Kit",
    cause: "Women Sanitation & Hygiene",
    impactDescription: "Distributes customized, reusable sanitary pads, antiseptic liquid soaps, and educational hygiene pamphlets to 3 rural adolescent girls.",
    statsLabel: "3 Girls Assisted / Month",
    deliverables: ["6 Premium Reusable Sanitary Kits", "3 Antiseptic Disinfactant Soaps", "Hygiene & Safe-Health Booklet"],
  },
  {
    amount: 2500,
    label: "Empowerment Loom",
    cause: "Women Vocational Training",
    impactDescription: "Sponsors specialized tailoring tools, handcraft raw materials, and digital sewing tutorials for 1 marginalized single-mother.",
    statsLabel: "1 Mother Self-Employed",
    deliverables: ["1 Month Sewing Lesson Tuition", "Textile Fabrics & Measuring Kits", "Job-Market Connection Portal Access"],
  },
  {
    amount: 5000,
    label: "Community Health Seed",
    cause: "Medical Clinic Sponsor",
    impactDescription: "Funds primary physician health checkups, blood grouping campaigns, and child polio-immunization drops for an entire street colony.",
    statsLabel: "approx. 45 Residents Treated",
    deliverables: ["Colony Doctor On-ground Session", "Child Polio/Vitamin Immunization", "Blood Pressure & Diabetes Diagnostics"],
  },
  {
    amount: 10000,
    label: "NayePankh Fellow",
    cause: "Corporate Social Responsibility Impact",
    impactDescription: "Funds structural renovation of clean water micro-pumps and repairs computer laboratory terminals inside a municipal village school.",
    statsLabel: "1 Complete Smart-Room Set UP",
    deliverables: ["1 Drinking Water Pump Restructured", "1 Refurbished Desktop Computer", "Lifetime Wall Recognition Tile Plate"],
  },
];

export default function DonationCalculator() {
  const [selectedTier, setSelectedTier] = useState<DonationTier>(tiers[1]);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentSimulationActive, setPaymentSimulationActive] = useState<boolean>(false);
  const [pastedStatus, setPastedStatus] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<"form" | "confirmed">("form");

  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedTier.amount;

  // Dynamically compute custom impact calculations to offer high user interaction
  const getDynamicCalculations = (amount: number) => {
    if (amount <= 0) return "Please enter a contribution amount.";
    const booksCount = Math.floor(amount / 500);
    const sanitaryKitsCount = Math.floor(amount / 400);
    const warmMealsCount = Math.floor(amount / 80);

    if (amount < 500) {
      return `Your support of ₹${amount.toLocaleString()} is immense! It will fund exactly ${warmMealsCount} warm organic meals distributed to homeless shelter rows.`;
    }

    return `By selecting ₹${amount.toLocaleString()}, you sponsor:
• ${booksCount} Child ${booksCount === 1 ? "Sponsorship" : "Sponsorships"} (Books + Remedial Tuition) OR
• Distribution of ${sanitaryKitsCount} complete women hygiene sanitation kits or ${warmMealsCount} fresh meals.`;
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("donate@nayepankh");
    setPastedStatus(true);
    setTimeout(() => setPastedStatus(false), 2000);
  };

  const handleSimulatedPaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anonymous && (!donorName || !donorEmail)) {
      alert("Please provide name and email or donate anonymously.");
      return;
    }
    setSimulationStep("confirmed");
  };

  const resetSimulation = () => {
    setPaymentSimulationActive(false);
    setSimulationStep("form");
    setDonorName("");
    setDonorEmail("");
    setCustomAmount("");
  };

  return (
    <div id="calculator-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Interactive Selection Side */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-white dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <span className="text-xs font-semibold tracking-wider text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-full inline-block">
            Transparency Calculator
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2 font-sans tracking-tight">
            See Your Real-world Impact
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-lg leading-relaxed">
            Leading international benchmarks ensure NayePankh directs over 91% of raised donations explicitly to on-ground student classrooms, healthcare programs, and tools procurement.
          </p>

          {/* Quick Amount Selector Pills */}
          <div className="flex flex-wrap gap-2.5 my-6">
            {tiers.map((tier) => {
              const matches = !customAmount && selectedTier.amount === tier.amount;
              return (
                <button
                  key={tier.amount}
                  onClick={() => {
                    setCustomAmount("");
                    setSelectedTier(tier);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                    matches
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/20 scale-102"
                      : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  id={`tier-pill-${tier.amount}`}
                >
                  ₹ {tier.amount.toLocaleString()}
                </button>
              );
            })}
          </div>

          {/* Custom Input */}
          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-lg">
              ₹
            </span>
            <input
              type="number"
              placeholder="Enter Custom Amount (INR)"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
              }}
              min="50"
              className="w-full pl-10 pr-24 py-3.5 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:border-rose-400 text-sm font-bold shadow-inner"
              id="custom-donation-input"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-wider text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800 px-2.5 py-1 rounded-md">
              INR (₹)
            </span>
          </div>

          {/* Computed Dynamic Display Card */}
          <div className="bg-rose-50/40 dark:bg-rose-950/20 p-5 rounded-2xl border border-rose-100/50 dark:border-rose-900/30">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 flex items-center gap-1.5 mb-2.5">
              <Sparkles className="h-4 w-4" /> Live Impact Metric
            </h4>
            <div className="text-sm font-sans font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {getDynamicCalculations(activeAmount)}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-mono">
            <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
            <span>80G Tax Exemption Certificate Enabled</span>
          </div>
          <button
            onClick={() => {
              setPaymentSimulationActive(true);
            }}
            disabled={activeAmount <= 0}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              activeAmount > 0
                ? "bg-[#10b981] hover:bg-[#059669] shadow-emerald-500/10 hover:shadow-emerald-500/20 transform active:scale-95"
                : "bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60"
            }`}
            id="donate-now-calc-button"
          >
            <Heart className="h-4 w-4 fill-white" /> Sponsor This Now
          </button>
        </div>
      </div>

      {/* Details Display Side */}
      <div className="lg:col-span-5 bg-gradient-to-tr from-rose-500 to-rose-600 dark:from-rose-950/80 dark:to-slate-950 text-white p-6 md:p-8 rounded-3xl flex flex-col justify-between border border-rose-500/20 shadow-lg relative overflow-hidden">
        {/* Background subtle art */}
        <div className="absolute right-0 bottom-0 opacity-[0.04] text-white">
          <Heart className="h-72 w-72" strokeWidth="0.5" />
        </div>

        <div>
          <span className="text-[10px] font-mono tracking-widest font-semibold uppercase bg-white/20 px-2.5 py-1 rounded-full inline-block">
            Campaign Highlights
          </span>
          <h4 className="text-2xl font-extrabold tracking-tight mt-3 mb-1">
            {customAmount ? "Direct Intervention" : selectedTier.cause}
          </h4>
          <span className="text-xs text-rose-100 italic bg-white/10 px-3 py-1 rounded-md inline-block">
            {customAmount ? "Flexible Area Allocation" : selectedTier.statsLabel}
          </span>

          <p className="text-sm text-rose-50/90 leading-relaxed font-normal mt-5">
            {customAmount
              ? "Your direct contribution fuels urgent rescue programs, distributing school items, organic dry-ration packets to orphan lines, or emergency clinical medicines instantly where fields state high indicators."
              : selectedTier.impactDescription}
          </p>

          <div className="mt-6 border-t border-white/20 pt-5">
            <h5 className="text-[10px] font-mono tracking-wider text-rose-100 uppercase mb-3 font-semibold">
              Delivered Materials Checklist
            </h5>
            <ul className="space-y-2">
              {(customAmount
                ? ["Immediate meal support packs", "Child school books sponsor", "Community awareness training guides"]
                : selectedTier.deliverables
              ).map((del, index) => (
                <li key={index} className="flex items-center gap-2.5 text-xs text-rose-50 font-sans">
                  <div className="h-2 w-2 bg-emerald-300 rounded-full flex-shrink-0" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/20 flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl">
            <Gift className="h-5 w-5 text-rose-200" />
          </div>
          <span className="text-[11px] text-rose-100 leading-snug">
            All donors receive a digital direct certificate and an expenditure report with exact geolocated asset images.
          </span>
        </div>
      </div>

      {/* Simulated Payment Drawer Modal */}
      <AnimatePresence>
        {paymentSimulationActive && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-100 dark:border-slate-800"
              id="payment-modal-frame"
            >
              <div className="bg-rose-500 text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Heart className="h-5.5 w-5.5 fill-white" />
                  <div>
                    <h4 className="font-extrabold text-sm uppercase font-sans tracking-wide">
                      Secure Donation Desk
                    </h4>
                    <span className="text-[10px] text-rose-100 block">
                      Exemption 80G Compliant NGO Office
                    </span>
                  </div>
                </div>
                <button
                  onClick={resetSimulation}
                  className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg text-xs font-bold leading-none cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {simulationStep === "form" ? (
                <form onSubmit={handleSimulatedPaySubmit} className="p-6">
                  {/* Amount Reminder */}
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 flex justify-between items-center mb-5">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Total Sponsor Amount:
                    </span>
                    <span className="text-xl font-black text-rose-500 dark:text-rose-400">
                      ₹ {activeAmount.toLocaleString()}
                    </span>
                  </div>

                  {/* Payment Details Form */}
                  <div className="space-y-3.5 mb-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                        className="h-4 w-4 text-rose-500 border-slate-300 rounded focus:ring-rose-400 cursor-pointer"
                        id="anonymous-checkbox"
                      />
                      <label htmlFor="anonymous-checkbox" className="text-xs text-slate-600 dark:text-slate-350 cursor-pointer">
                        Donate anonymously (Hide name in global stats board)
                      </label>
                    </div>

                    {!anonymous && (
                      <>
                        <div>
                          <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="e.g. Priyanjali Sen"
                            className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg focus:outline-none focus:border-rose-400 text-slate-800 dark:text-slate-150"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="e.g. priya@outlook.com"
                            className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg focus:outline-none focus:border-rose-400 text-slate-800 dark:text-slate-150"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Simulated QR Code or UPI block */}
                  <div className="border border-dashed border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center mb-6">
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase mb-2">
                      Direct UPI NGO ID
                    </span>
                    <div className="inline-flex items-center gap-2 font-mono text-xs font-bold bg-slate-100 dark:bg-slate-950 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      <span>donate@nayepankh</span>
                      <button
                        type="button"
                        onClick={handleCopyUPI}
                        className="text-rose-500 hover:text-rose-600 cursor-pointer"
                        title="Copy Address"
                      >
                        {pastedStatus ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <span className="text-[9px] text-slate-400 block mt-2">
                      Copy our registered UPI ID to transfer directly from GPay, BHIM, PhonePe, or Paytm.
                    </span>
                  </div>

                  {/* Submission */}
                  <button
                    type="submit"
                    className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-3 rounded-xl font-bold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="h-4.5 w-4.5" /> Direct Pay Simulation
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center">
                  <div className="h-14 w-14 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-800">
                    <Check className="h-8 w-8 stroke-2" />
                  </div>
                  <h5 className="text-lg font-black text-slate-800 dark:text-slate-100 font-sans tracking-tight">
                    Thank You, Fellow Wings!
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2.5 max-w-sm mx-auto">
                    {anonymous ? "Your anonymous contribution " : `Dear ${donorName}, your sponsor of `}
                    <strong>₹ {activeAmount.toLocaleString()}</strong> has been simulated successfully! A real NGO integration would now route to standard Razorpay / Stripe rails.
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-450 font-semibold bg-emerald-50 dark:bg-emerald-950/40 py-1.5 px-3 rounded-md inline-block mt-4">
                    Inquiry reference ID: NYP-{Math.floor(Math.random() * 900000 + 100000)}
                  </p>

                  <button
                    onClick={resetSimulation}
                    className="w-full mt-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-200 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
                  >
                    Done & Close Desk
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
