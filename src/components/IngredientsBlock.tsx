'use client';

import type { Ingredient } from '@/types';

type IngredientsBlockProps = {
  title?: string;
  ingredients: Ingredient[];
  originalServings: number;
  currentServings: number;
};

export default function IngredientsBlock({
  title,
  ingredients,
  originalServings,
  currentServings,
}: IngredientsBlockProps): JSX.Element {
  const calculateAmount = (originalAmount: string): string => {
    const amount = parseFloat(originalAmount) || 0;
    if (amount === 0) return '';

    const calculatedAmount = (amount / originalServings) * currentServings;

    // Format the number nicely
    if (calculatedAmount % 1 === 0) {
      return calculatedAmount.toString();
    } else if (calculatedAmount < 1) {
      return calculatedAmount.toFixed(2);
    } else {
      return calculatedAmount.toFixed(1);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 flex items-center gap-3">
        <span className="w-1 h-8 bg-[var(--color-accent)] rounded-full"></span>
        {title || 'Zutaten'}
      </h2>
      
      <div className="bg-gray-50/50 rounded-2xl p-6 sm:p-8 border border-gray-100">
        <ul className="space-y-3.5">
          {ingredients.map((ingredient, index) => {
            const amount = parseFloat(ingredient.amount) || 0;
            const displayAmount = calculateAmount(ingredient.amount);
            
            return (
              <li key={index} className="flex items-start gap-4 group">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></span>
                <div className="flex-1">
                  {amount > 0 && (
                    <span className="text-[var(--color-secondary)] font-medium tabular-nums">
                      {displayAmount}
                      {ingredient.unit && ` ${ingredient.unit}`}
                    </span>
                  )}
                  <span className={`text-[var(--color-secondary)] ${amount > 0 ? 'ml-2' : ''}`}>
                    {ingredient.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {currentServings !== originalServings && (
        <div className="mt-3 text-center animate-slideUp">
          <p className="text-sm text-[var(--color-text-muted)] bg-[var(--color-accent-light)] px-4 py-2 rounded-lg inline-block">
            💡 Angepasst von {originalServings} auf {currentServings}{' '}
            {currentServings === 1 ? 'Portion' : 'Portionen'}
          </p>
        </div>
      )}
    </section>
  );
}
