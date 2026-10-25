import React, { useState } from 'react';
import {
  AlertCircle,
  Copy,
  Check,
  Printer,
  Sparkles,
  Award,
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { calculateAggregateResults } from '../utils/calculations';

export default function ResultsSummary({
  items,
  currency,
  onPrint,
}) {
  const [copied, setCopied] = useState(false);
  const [timeframe, setTimeframe] = useState('annual'); // 'annual' | 'monthly'

  const results = calculateAggregateResults(items);

  // If no items have been added
  if (!results.hasItems) {
    return (
      <div id="results" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center shadow-xs">
        <div className="max-w-md mx-auto">
          <div className="w-12 h-12 mx-auto rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Results Will Appear Once You Add Expenses
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Add at least one subscription, wasted food item, or standby electronic device to see your monthly and annual cost estimates.
          </p>
        </div>
      </div>
    );
  }

  const primaryTotal = timeframe === 'annual' ? results.annualTotal : results.monthlyTotal;
  const secondaryTotal = timeframe === 'annual' ? results.monthlyTotal : results.annualTotal;

  // Copy summary to clipboard
  const handleCopySummary = async () => {
    const text = [
      `HIDDEN COST FINDER SUMMARY`,
      `=========================`,
      `Analyzed Items: ${results.itemCount}`,
      `Estimated Annual Waste: ${formatCurrency(results.annualTotal, currency)} / yr`,
      `Estimated Monthly Waste: ~${formatCurrency(results.monthlyTotal, currency)} / mo`,
      results.largestContributor
        ? `Largest Contributor: ${results.largestContributor.name} (${formatCurrency(results.largestContributor.calculatedAnnual, currency)}/yr)`
        : '',
      `\nCategory Breakdown:`,
      ...results.categoryBreakdown.map(
        (c) => `- ${c.category}: ${formatCurrency(c.annualCost, currency)}/yr (${c.percentageOfTotal.toFixed(1)}%)`
      ),
      `\nCalculated privately with Hidden Cost Finder (https://hiddencostfinder.pages.dev/)`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.warn('Clipboard write failed', err);
    }
  };

  return (
    <div id="results" className="space-y-6">
      {/* Main Results Card */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden card-print">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-teal-700/50">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold mb-2 border border-teal-400/20">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>Financial Impact Estimate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Total Estimated Hidden Cost
              </h2>
              <p className="text-xs sm:text-sm text-teal-100/80 mt-1">
                Based on {results.itemCount} reported expense {results.itemCount === 1 ? 'item' : 'items'}.
              </p>
            </div>

            {/* Timeframe toggle buttons (no-print) */}
            <div className="flex items-center bg-teal-950/60 p-1 rounded-xl border border-teal-700/60 self-start sm:self-center no-print">
              <button
                type="button"
                onClick={() => setTimeframe('annual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeframe === 'annual'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-teal-200 hover:text-white'
                }`}
              >
                Annual View
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeframe === 'monthly'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-teal-200 hover:text-white'
                }`}
              >
                Monthly View
              </button>
            </div>
          </div>

          {/* Large display figures */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="md:col-span-2">
              <div className="text-xs sm:text-sm uppercase font-extrabold text-teal-300 tracking-wider">
                {timeframe === 'annual' ? 'Potential Yearly Cost' : 'Potential Monthly Cost'}
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mt-1 flex items-baseline gap-2">
                <span>{formatCurrency(primaryTotal, currency)}</span>
                <span className="text-lg sm:text-2xl font-normal text-teal-200">
                  {timeframe === 'annual' ? '/ year' : '/ month'}
                </span>
              </div>
              <div className="text-sm text-teal-200/90 mt-2 font-medium">
                Equivalent to ~{formatCurrency(secondaryTotal, currency)} {timeframe === 'annual' ? 'per month' : 'per year'}.
              </div>
            </div>

            {/* Actions: Copy & Print */}
            <div className="flex sm:flex-col items-center sm:items-end justify-start sm:justify-center gap-2.5 no-print">
              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-semibold text-white transition-all shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-teal-300" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onPrint}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-xs sm:text-sm font-semibold text-white transition-all shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Report</span>
              </button>
            </div>
          </div>

          {/* Legal / Transparency statement */}
          <div className="mt-6 pt-4 border-t border-teal-700/40 text-[11px] text-teal-200/70 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>
              All totals are mathematical estimates based on user-supplied numbers and frequencies. Actual recoverable savings depend on contract terms and habits.
            </span>
          </div>
        </div>
      </div>

      {/* Largest Contributor Highlight Card */}
      {results.largestContributor && (
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-print">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold text-amber-800 tracking-wider">
                Largest Cost Contributor
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                {results.largestContributor.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {results.largestContributor.formulaExplanation}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <div className="text-lg sm:text-xl font-black text-amber-900">
              {formatCurrency(results.largestContributor.calculatedAnnual, currency)}
              <span className="text-xs font-normal text-slate-600"> / yr</span>
            </div>
            <div className="text-xs font-semibold text-amber-800">
              {results.annualTotal > 0
                ? `${((results.largestContributor.calculatedAnnual / results.annualTotal) * 100).toFixed(0)}% of total calculated waste`
                : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
