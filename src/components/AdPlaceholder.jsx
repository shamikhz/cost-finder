import React from 'react';

/**
 * Reserved-dimension advertisement slot to prevent Cumulative Layout Shift (CLS).
 * Transparently labeled as sponsored placement.
 */
export default function AdPlaceholder({
  slotId = 'ad-slot',
  slotLabel = 'Advertisement',
  format = 'leaderboard', // 'leaderboard' | 'rectangle' | 'banner'
  className = '',
}) {
  const getFormatClasses = () => {
    switch (format) {
      case 'rectangle':
        return 'w-full max-w-[300px] h-[250px] sm:max-w-[336px] sm:h-[280px]';
      case 'banner':
        return 'w-full max-w-4xl h-[90px] sm:h-[120px]';
      case 'leaderboard':
      default:
        return 'w-full max-w-4xl min-h-[90px] sm:min-h-[100px]';
    }
  };

  return (
    <div
      id={slotId}
      className={`my-6 flex flex-col items-center justify-center no-print ${className}`}
      aria-label="Advertisement placeholder"
    >
      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-600 mb-1">
        {slotLabel}
      </div>
      <div
        className={`${getFormatClasses()} border border-dashed border-slate-300 rounded-lg bg-slate-50 flex flex-col items-center justify-center p-3 text-center transition-colors`}
      >
        <span className="text-xs font-medium text-slate-600">
          Ad Space Reserved (No Layout Shift)
        </span>
        <span className="text-[11px] text-slate-600 mt-0.5">
          Standard ad units will render here once live platform approval is configured.
        </span>
      </div>
    </div>
  );
}
