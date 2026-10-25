import { ShieldCheck, Lock, ArrowUp } from 'lucide-react';

export default function Footer({ onClearLocalData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="privacy" className="bg-slate-900 text-slate-300 pt-12 pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top: Privacy & Transparency Statement */}
        <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700/80">
          <div className="flex items-center gap-2.5 text-teal-400 font-bold text-sm mb-3">
            <Lock className="w-4 h-4" />
            <span className="tracking-wide uppercase text-xs">Privacy & Transparency Notice</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
            <div>
              <h4 className="font-bold text-white text-sm mb-1">100% Client-Side Processing</h4>
              <p>
                Hidden Cost Finder operates entirely within your browser runtime. We have no external servers, databases, or user accounts. None of your entered expenses or numbers are sent over the internet.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">Optional LocalStorage</h4>
              <p>
                If you choose to save a calculation scenario, it is stored strictly inside your browser's local sandbox on this device. You can erase all cached scenarios at any time with one click.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">Non-Advisory Estimates</h4>
              <p>
                All figures, totals, and recommendations provided by this tool are mathematical approximations for informational clarity. They do not constitute formal accounting, tax, or legal advice.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Zero telemetry • Zero third-party trackers • No sign-up required
            </span>
            <button
              type="button"
              onClick={onClearLocalData}
              className="text-slate-400 hover:text-red-400 underline underline-offset-2 transition-colors"
            >
              Erase Local Browser Data
            </button>
          </div>
        </div>

        {/* Middle: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
          <div>
            <span className="text-lg font-black text-white tracking-tight">
              Hidden Cost Finder
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Making small everyday waste visible and manageable.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#calculator" className="hover:text-white transition-colors">
              Calculator
            </a>
            <a href="#results" className="hover:text-white transition-colors">
              Results Summary
            </a>
            <a href="#breakdown" className="hover:text-white transition-colors">
              Breakdown
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Hidden Cost Finder. Free, open, and private utility.</p>
        </div>
      </div>
    </footer>
  );
}
