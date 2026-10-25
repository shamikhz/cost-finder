import React from 'react';
import { BookOpen, Calculator, Clock, HelpCircle, Lightbulb, Zap, CheckCircle2 } from 'lucide-react';

export default function EducationalContent() {
  return (
    <section id="how-it-works" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-10">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2 border border-teal-200">
          <BookOpen className="w-3.5 h-3.5 text-teal-700" />
          <span>Educational Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          How Everyday Hidden Costs Add Up: Methodology & Science
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          Small, routine habits and recurring services rarely feel expensive on a day-to-day basis. Here is how the mathematics and physical consumption compound over months and years, and how you can reclaim clarity.
        </p>
      </div>

      {/* Grid of detailed educational guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
        {/* Article 1: Definition */}
        <article className="space-y-2.5">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <span>1. What is a "Hidden Cost"?</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Frictionless expenses that evade daily attention
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In consumer economics, "hidden costs" are not concealed charges or illegal fees on a bank statement. Rather, they represent routine, frictionless micro-transactions and automatic renewals: a ₹399 streaming service left unwatched, perishables that spoil in refrigerator crisper drawers, or electronics drawing power in sleep mode 24 hours a day. Because each incident costs less than a single convenience purchase, loss aversion fails to trigger.
          </p>
        </article>

        {/* Article 2: The Math of Compounding */}
        <article className="space-y-2.5">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>2. The Annual Math: How Frequency Multiplies</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Why small frequencies turn into large annual numbers
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Frequency multiplication is simple, predictable arithmetic:
          </p>
          <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc pl-5">
            <li><strong>Daily leaks:</strong> Just ₹50/day = ₹1,500/month = <strong>₹18,250/year</strong>.</li>
            <li><strong>Weekly waste:</strong> ₹200/week in discarded groceries = <strong>₹10,400/year</strong>.</li>
            <li><strong>Monthly subscriptions:</strong> ₹649/month unused 4K plan = <strong>₹7,788/year</strong>.</li>
          </ul>
          <p className="text-xs text-slate-500 italic">
            Combined together across three common habits, an individual can easily leak ₹36,000+ each year without noticing a single large transaction.
          </p>
        </article>

        {/* Article 3: Calculating Subscriptions */}
        <article className="space-y-2.5">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
            <Calculator className="w-4 h-4 text-teal-600" />
            <span>3. How to Calculate Unused Subscriptions Accurately</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Normalizing billing intervals with reported utilization
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Financial decisions should be sustainable, not extreme. Hidden Cost Finder normalizes your billing interval to an annual value and accounts for partial utilization:
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
            Annual Unused Cost = (Base Price × Qty × Annual Multiplier) × (Unused % ÷ 100)
          </div>
          <p className="text-xs text-slate-600 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
            <strong>Hypothetical Example:</strong> If you pay ₹1,200 quarterly for a productivity suite but only use it during one quarter per year (75% unused), your annual idle cost is: (₹1,200 × 1 × 4) × 0.75 = <strong>₹3,600/year</strong>.
          </p>
        </article>

        {/* Article 4: Standby Electricity Physics */}
        <article className="space-y-2.5">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
            <Zap className="w-4 h-4 text-teal-600" />
            <span>4. The Physics of Standby Vampire Electricity</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Measuring phantom load from plugged-in appliances
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Electrical appliances with remote sensors, digital clocks, internal transformers, or Wi-Fi standby circuits draw continuous electricity even when turned "off":
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
            Daily kWh = (Watts × Quantity × Standby Hours) ÷ 1,000<br />
            Annual Cost = Daily kWh × Regional Tariff per kWh × 365 Days
          </div>
          <p className="text-xs text-slate-600 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
            <strong>Hypothetical Example:</strong> A smart TV and set-top box drawing 25W on standby 20 hours daily uses 0.5 kWh/day (25 × 1 × 20 / 1000). At an illustrative tariff of ₹8.00/kWh, the annual cost is: 0.5 × 8 × 365 = <strong>₹1,460/year</strong>.
          </p>
        </article>
      </div>

      {/* Practical Actionable Habits */}
      <div className="pt-8 border-t border-slate-100">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-sm mb-2">
          <Lightbulb className="w-4 h-4 text-teal-600" />
          <span>Practical, Nonjudgmental Strategies</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Four High-Impact Habits to Keep More of Your Money
        </h3>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/80 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-900 mb-1">90-Day Statement Audit</div>
              <p className="text-slate-600 leading-relaxed">
                Every quarter, review card statements for recurring auto-debits. Cancel or pause services you haven't opened in 30 days.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-teal-700 font-semibold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Easy quarterly routine</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/80 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-900 mb-1">The "Eat First" Shelf</div>
              <p className="text-slate-600 leading-relaxed">
                Designate one front shelf in your refrigerator for open jars, leftovers, and delicate vegetables nearing expiry before opening new items.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-teal-700 font-semibold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero extra cost</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/80 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-900 mb-1">Master Switch Power Strips</div>
              <p className="text-slate-600 leading-relaxed">
                Plug entertainment consoles, desktops, and mobile chargers into a switchable power strip. Flip one switch off at night to stop vampire power.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-teal-700 font-semibold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Eliminates phantom load</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/80 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-900 mb-1">Pass-Based Memberships</div>
              <p className="text-slate-600 leading-relaxed">
                If work or travel prevents regular gym visits, switch to prepaid multi-visit punchcards or freeze memberships during busy quarters.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-teal-700 font-semibold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aligns cost with use</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
