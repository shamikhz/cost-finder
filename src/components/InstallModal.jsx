import React, { useState } from 'react';
import { X, Smartphone, Monitor, Share2, PlusSquare, MoreVertical, Download, CheckCircle2, Wifi } from 'lucide-react';

export default function InstallModal({
  isOpen,
  onClose,
  isInstalled,
  hasNativePrompt,
  onNativeInstall,
}) {
  // Determine default active tab based on user agent
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof navigator === 'undefined') return 'desktop';
    const ua = navigator.userAgent || '';
    if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
    if (/Android/i.test(ua)) return 'android';
    return 'desktop';
  });

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-200 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close install modal"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
            {isInstalled ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <Download className="w-6 h-6" />}
          </div>
          <div>
            <h2 id="install-modal-title" className="text-xl font-bold text-white tracking-tight">
              {isInstalled ? 'App Is Already Installed' : 'Install Hidden Cost Finder'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {isInstalled
                ? 'Hidden Cost Finder is installed and accessible from your home screen or app launcher.'
                : 'Install this utility on your mobile device or computer for instant access without app store downloads.'}
            </p>
          </div>
        </div>

        {/* If native prompt available, offer 1-click install button */}
        {hasNativePrompt && !isInstalled && (
          <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Direct Installation Ready</p>
              <p className="text-xs text-teal-300/80">Your browser supports one-click PWA installation.</p>
            </div>
            <button
              type="button"
              onClick={onNativeInstall}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Install Now</span>
            </button>
          </div>
        )}

        {/* Platform Selection Tabs */}
        <div>
          <div className="flex border-b border-slate-800 text-xs font-semibold mb-4">
            <button
              type="button"
              onClick={() => setActiveTab('ios')}
              className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-colors ${
                activeTab === 'ios'
                  ? 'border-teal-400 text-teal-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iOS / iPhone</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('android')}
              className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-colors ${
                activeTab === 'android'
                  ? 'border-teal-400 text-teal-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('desktop')}
              className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-colors ${
                activeTab === 'desktop'
                  ? 'border-teal-400 text-teal-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop / PC / Mac</span>
            </button>
          </div>

          {/* Instructions Body */}
          <div className="space-y-3 text-xs text-slate-300">
            {activeTab === 'ios' && (
              <ol className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <span>Tap the Share Button</span>
                      <Share2 className="w-3.5 h-3.5 text-teal-400 inline" />
                    </p>
                    <p className="text-slate-400">
                      In Apple Safari, tap the Share icon at the bottom of your screen (square with arrow pointing up).
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <span>Select "Add to Home Screen"</span>
                      <PlusSquare className="w-3.5 h-3.5 text-teal-400 inline" />
                    </p>
                    <p className="text-slate-400">
                      Scroll down the list of options and select <strong>Add to Home Screen</strong>.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Tap "Add"</p>
                    <p className="text-slate-400">
                      Tap <strong>Add</strong> in the top-right corner. The app icon will appear on your home screen.
                    </p>
                  </div>
                </li>
              </ol>
            )}

            {activeTab === 'android' && (
              <ol className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <span>Open Browser Menu</span>
                      <MoreVertical className="w-3.5 h-3.5 text-teal-400 inline" />
                    </p>
                    <p className="text-slate-400">
                      Tap the three vertical dots (<strong>⋮</strong>) in the top-right corner of Google Chrome.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Tap "Install App" or "Add to Home screen"</p>
                    <p className="text-slate-400">
                      Select <strong>Install app</strong> or <strong>Add to Home screen</strong> from the dropdown menu.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Confirm Installation</p>
                    <p className="text-slate-400">
                      Tap <strong>Install</strong> when prompted to place the app on your home screen and app drawer.
                    </p>
                  </div>
                </li>
              </ol>
            )}

            {activeTab === 'desktop' && (
              <ol className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Use the Address Bar Install Icon</p>
                    <p className="text-slate-400">
                      In Chrome, Edge, or Brave, look for the install icon (<Download className="w-3 h-3 inline text-teal-400" /> or ➕) on the right side of the address bar.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Or Select from Browser Menu</p>
                    <p className="text-slate-400">
                      Click the three dots (<strong>⋮</strong>) in your browser toolbar and select <strong>Install Hidden Cost Finder...</strong>
                    </p>
                  </div>
                </li>
              </ol>
            )}
          </div>
        </div>

        {/* Offline Disclaimer Notice */}
        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-2.5 text-xs text-slate-400">
          <Wifi className="w-4 h-4 text-teal-400 shrink-0" />
          <span>
            <strong>Connectivity notice:</strong> This utility requires an active internet connection to run and does not work offline.
          </span>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
