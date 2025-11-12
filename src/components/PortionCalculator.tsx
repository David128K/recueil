'use client';

import { useState } from 'react';

type Ingredient = {
  amount: number;
  unit: string;
  name: string;
};

type PortionCalculatorProps = {
  originalServings: number;
  ingredients: Ingredient[];
};

export default function PortionCalculator({ originalServings, ingredients }: PortionCalculatorProps) {
  const [currentServings, setCurrentServings] = useState(originalServings);

  const calculateAmount = (originalAmount: number): string => {
    const calculatedAmount = (originalAmount / originalServings) * currentServings;
    
    // Format the number nicely
    if (calculatedAmount % 1 === 0) {
      return calculatedAmount.toString();
    } else if (calculatedAmount < 1) {
      return calculatedAmount.toFixed(2);
    } else {
      return calculatedAmount.toFixed(1);
    }
  };

  const increment = () => {
    setCurrentServings(prev => prev + 1);
  };

  const decrement = () => {
    if (currentServings > 1) {
      setCurrentServings(prev => prev - 1);
    }
  };

  return (
    <section className="mb-12">
      {/* Portion Adjuster */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-secondary)] flex items-center gap-3">
          <span className="w-1 h-8 bg-[var(--color-accent)] rounded-full"></span>
          Zutaten
        </h2>
        
        <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 shadow-sm p-2">
          <button
            onClick={decrement}
            disabled={currentServings <= 1}
            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[var(--color-accent)] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center font-bold text-lg group disabled:hover:bg-gray-100 disabled:hover:text-current"
            aria-label="Portionen verringern"
          >
            <span className="group-hover:scale-110 transition-transform duration-200">−</span>
          </button>
          
          <div className="flex flex-col items-center min-w-[80px]">
            <span className="text-2xl font-bold text-[var(--color-accent)] tabular-nums">
              {currentServings}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium">
              {currentServings === 1 ? 'Portion' : 'Portionen'}
            </span>
          </div>
          
          <button
            onClick={increment}
            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 flex items-center justify-center font-bold text-lg group"
            aria-label="Portionen erhöhen"
          >
            <span className="group-hover:scale-110 transition-transform duration-200">+</span>
          </button>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="bg-gray-50/50 rounded-2xl p-6 sm:p-8 border border-gray-100">
        <ul className="space-y-3.5">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-4 group">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></span>
              <div className="flex-1">
                <span className="text-[var(--color-secondary)] font-medium tabular-nums">
                  {calculateAmount(ingredient.amount)} {ingredient.unit}
                </span>
                <span className="text-[var(--color-secondary)] ml-2">
                  {ingredient.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {currentServings !== originalServings && (
        <div className="mt-4 text-center animate-slideUp">
          <p className="text-sm text-[var(--color-text-muted)] bg-[var(--color-accent-light)] px-4 py-2 rounded-lg inline-block">
            💡 Angepasst von {originalServings} auf {currentServings} {currentServings === 1 ? 'Portion' : 'Portionen'}
          </p>
        </div>
      )}
    </section>
  );
}
