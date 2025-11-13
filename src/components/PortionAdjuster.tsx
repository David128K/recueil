'use client';

import { useState } from 'react';

type PortionAdjusterProps = {
  originalServings: number;
  onServingsChange: (servings: number) => void;
};

export default function PortionAdjuster({
  originalServings,
  onServingsChange,
}: PortionAdjusterProps) {
  const [currentServings, setCurrentServings] = useState(originalServings);

  const increment = () => {
    const newServings = currentServings + 1;
    setCurrentServings(newServings);
    onServingsChange(newServings);
  };

  const decrement = () => {
    if (currentServings > 1) {
      const newServings = currentServings - 1;
      setCurrentServings(newServings);
      onServingsChange(newServings);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 gap-2">
        <div className="flex items-center">
          <span className="text-[var(--color-secondary)] font-semibold text-sm sm:text-base">Portionen:</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={decrement}
            disabled={currentServings <= 1}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 hover:bg-[var(--color-accent)] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center font-bold text-base sm:text-lg disabled:hover:bg-gray-100 disabled:hover:text-current overflow-hidden"
            aria-label="Portionen verringern"
          >
            <span>−</span>
          </button>

          <div className="flex flex-col items-center min-w-[70px] sm:min-w-[80px]">
            <span className="text-xl sm:text-2xl font-bold text-[var(--color-accent)] tabular-nums">
              {currentServings}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium whitespace-nowrap">
              {currentServings === 1 ? 'Portion' : 'Portionen'}
            </span>
          </div>

          <button
            onClick={increment}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 flex items-center justify-center font-bold text-base sm:text-lg overflow-hidden"
            aria-label="Portionen erhöhen"
          >
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
}
