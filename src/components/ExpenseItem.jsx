import React from 'react';
import {
  Tv,
  Apple,
  Zap,
  Dumbbell,
  PlusCircle,
  Pencil,
  Trash2,
  HelpCircle,
} from 'lucide-react';
import { calculateItemCost } from '../utils/calculations';
import { formatCurrency } from '../utils/currency';
import { EXPENSE_CATEGORIES } from '../data/categories';

const CATEGORY_ICONS = {
  subscriptions: Tv,
  food_waste: Apple,
  electricity: Zap,
  memberships: Dumbbell,
  custom: PlusCircle,
};

export default function ExpenseItem({
  item,
  currency,
  onEdit,
  onDelete,
}) {
  const calc = calculateItemCost(item);
  const catConfig = EXPENSE_CATEGORIES.find((c) => c.id === item.category) || EXPENSE_CATEGORIES[0];
  const Icon = CATEGORY_ICONS[item.category] || PlusCircle;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 hover:border-teal-300 transition-all shadow-xs group card-print">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Left: Info */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
            <Icon className="w-4 h-4" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                {item.name}
              </h3>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${catConfig.badgeColor}`}>
                {catConfig.shortName}
              </span>
            </div>

            {/* Formula explanation */}
            <p className="mt-1 text-xs text-slate-500 font-mono flex items-center gap-1.5">
              <HelpCircle className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{calc.formulaExplanation}</span>
            </p>

            {/* User notes */}
            {item.notes && (
              <p className="mt-1 text-xs text-slate-600 italic bg-slate-50 px-2 py-0.5 rounded inline-block">
                “{item.notes}”
              </p>
            )}
          </div>
        </div>

        {/* Right: Calculated figures & Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-left sm:text-right">
            <div className="text-base sm:text-lg font-black text-slate-900">
              {formatCurrency(calc.annual, currency)}
              <span className="text-xs font-normal text-slate-500"> / yr</span>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              ~{formatCurrency(calc.monthly, currency)} / mo
            </div>
          </div>

          {/* Action buttons (hidden when printing) */}
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
              title="Edit this item"
              aria-label={`Edit ${item.name}`}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="p-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete this item"
              aria-label={`Delete ${item.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
