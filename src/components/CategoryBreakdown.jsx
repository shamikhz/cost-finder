import React from 'react';
import { PieChart, Tv, Apple, Zap, Dumbbell, PlusCircle } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { EXPENSE_CATEGORIES } from '../data/categories';

const CATEGORY_ICONS = {
  subscriptions: Tv,
  food_waste: Apple,
  electricity: Zap,
  memberships: Dumbbell,
  custom: PlusCircle,
};

const CATEGORY_COLORS = {
  subscriptions: 'bg-indigo-600',
  food_waste: 'bg-emerald-600',
  electricity: 'bg-amber-500',
  memberships: 'bg-violet-600',
  custom: 'bg-teal-600',
};

export default function CategoryBreakdown({
  breakdown = [],
  annualTotal = 0,
  currency,
}) {
  if (!breakdown || breakdown.length === 0 || annualTotal <= 0) {
    return null;
  }

  return (
    <div id="breakdown" className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs card-print">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
          <PieChart className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Category-Wise Breakdown
          </h2>
          <p className="text-xs text-slate-500">
            Proportional distribution of identified everyday costs.
          </p>
        </div>
      </div>

      {/* Multi-segment horizontal bar */}
      <div className="mt-5">
        <div className="h-4 rounded-full bg-slate-100 flex overflow-hidden p-0.5 gap-0.5">
          {breakdown.map((item) => {
            const widthPct = Math.max(2, item.percentageOfTotal);
            const colorClass = CATEGORY_COLORS[item.category] || 'bg-slate-400';
            return (
              <div
                key={item.category}
                style={{ width: `${widthPct}%` }}
                className={`h-full rounded-sm ${colorClass} transition-all`}
                title={`${item.category}: ${item.percentageOfTotal.toFixed(1)}%`}
              />
            );
          })}
        </div>
      </div>

      {/* Grid of category cards */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {breakdown.map((item) => {
          const catConfig = EXPENSE_CATEGORIES.find((c) => c.id === item.category) || {
            shortName: item.category,
            badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
          };
          const Icon = CATEGORY_ICONS[item.category] || PlusCircle;
          const barColor = CATEGORY_COLORS[item.category] || 'bg-slate-500';

          return (
            <div
              key={item.category}
              className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 flex items-start justify-between gap-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 ${barColor} shrink-0`} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {catConfig.shortName}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.count} {item.count === 1 ? 'item' : 'items'} analyzed
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-extrabold text-slate-900 text-sm">
                  {formatCurrency(item.annualCost, currency)}
                  <span className="text-[10px] font-normal text-slate-500"> / yr</span>
                </div>
                <div className="text-xs font-semibold text-teal-700">
                  {item.percentageOfTotal.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
