import React from 'react';
import { Search, Printer } from 'lucide-react';
import { SUPPORTED_CURRENCIES } from '../utils/currency';

export default function Header({
  currency,
  onCurrencyChange,
  onPrint,
  itemCount,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-teal-700 transition-colors">
                Hidden Cost Finder
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-medium">
                Calculator
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#calculator" className="hover:text-teal-700 transition-colors">
              Calculator
            </a>
            <a href="#results" className="hover:text-teal-700 transition-colors">
              Results
            </a>
            <a href="#breakdown" className="hover:text-teal-700 transition-colors">
              Breakdown
            </a>
            <a href="#how-it-works" className="hover:text-teal-700 transition-colors">
              How It Works
            </a>
            <a href="#faq" className="hover:text-teal-700 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Controls: Currency & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency selector */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="currency-select" className="sr-only">
                Select Currency
              </label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg px-2.5 py-1.5 border border-slate-300 focus:ring-2 focus:ring-teal-500 transition-colors cursor-pointer"
                title="Select preferred currency"
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Print button */}
            {itemCount > 0 && (
              <button
                type="button"
                onClick={onPrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors"
                title="Print financial summary report"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            )}

            {/* Quick jump to calculator CTA */}
            <a
              href="#calculator"
              className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm hover:shadow transition-all"
            >
              Start Calculating
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
