import React from 'react';
import { ArrowDown, ShieldCheck, Calculator, Eye, Sparkles } from 'lucide-react';

export default function Hero({ onQuickSample }) {
  return (
    <section id="hero" className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-teal-50/60 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
          <Eye className="w-3.5 h-3.5 text-teal-700" />
          <span>YOUR MONEY, MADE VISIBLE</span>
        </div>

        {/* H1 Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
          Find the Hidden Cost of Everyday Expenses
        </h1>

        {/* Description */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Unused subscriptions, wasted food, standby electricity, and forgotten memberships can quietly add up. Calculate what they may cost you each month and year.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all focus:ring-4 focus:ring-teal-200"
          >
            <Calculator className="w-5 h-5" />
            <span>Calculate My Hidden Costs</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onQuickSample}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Load Example Scenario</span>
          </button>
        </div>

        {/* Secondary trust text */}
        <p className="mt-3 text-xs sm:text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Free to use. No sign-up required. 100% private in your browser.</span>
        </p>

        {/* Quick highlight pillars */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-3xl mx-auto text-xs sm:text-sm">
          <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-xs flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span className="font-semibold text-slate-700">Subscriptions</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-xs flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-700">Food Waste</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-xs flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="font-semibold text-slate-700">Standby Power</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-xs flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
            <span className="font-semibold text-slate-700">Memberships</span>
          </div>
        </div>
      </div>
    </section>
  );
}
