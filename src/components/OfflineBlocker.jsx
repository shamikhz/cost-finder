import React from 'react';
import { WifiOff, RefreshCw, AlertCircle } from 'lucide-react';

/**
 * OfflineBlocker modal overlay.
 * Enforces the requirement that the application does NOT work offline.
 */
export default function OfflineBlocker({ isOnline, isChecking, onRetry }) {
  if (isOnline) {
    return null;
  }

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="offline-title"
      aria-describedby="offline-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-slate-900 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        {/* Warning Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
          <WifiOff className="w-8 h-8 animate-pulse" />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-semibold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Connection Required</span>
          </div>
          <h2 id="offline-title" className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Offline Mode Disabled
          </h2>
          <p id="offline-desc" className="text-sm text-slate-300 leading-relaxed">
            Hidden Cost Finder does not work offline. An active internet connection is required to use this tool and estimate recurring expenses.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            disabled={isChecking}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 text-white font-semibold text-sm shadow-lg shadow-teal-900/30 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Checking Connection...' : 'Retry Connection'}</span>
          </button>
          <p className="text-xs text-slate-400 mt-3">
            Please reconnect your Wi-Fi, Ethernet, or Mobile Data to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
