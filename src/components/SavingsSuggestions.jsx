import React from 'react';
import { Lightbulb, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function SavingsSuggestions({ suggestions = [] }) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div id="savings-opportunities" className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs card-print">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Identified Savings Opportunities
          </h2>
          <p className="text-xs text-slate-500">
            Tailored, nonjudgmental actions derived strictly from the items you entered.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((sug) => (
          <div
            key={sug.id}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-teal-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-bold text-slate-900 text-sm">
                  {sug.title}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    sug.impactLevel === 'High'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-teal-50 text-teal-800 border-teal-200'
                  }`}
                >
                  {sug.impactLevel} Impact
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {sug.description}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-start gap-2 text-xs font-medium text-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span>{sug.action}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Realistic nonjudgmental disclaimer */}
      <div className="mt-5 p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          Suggestions are exploratory ideas to help prioritize decisions. We never assume every single rupee can or should be eliminated—only you know what provides true daily value.
        </span>
      </div>
    </div>
  );
}
