'use client';

import { useState } from 'react';
import PortionAdjuster from './PortionAdjuster';
import IngredientsBlock from './IngredientsBlock';
import StepsBlock from './StepsBlock';
import type { ContentBlock } from '@/types';

type RecipeContentProps = {
  content: ContentBlock[];
  originalServings: number;
};

export default function RecipeContent({
  content,
  originalServings,
}: RecipeContentProps): JSX.Element {
  const [currentServings, setCurrentServings] = useState(originalServings);

  // Check if there are any ingredient blocks
  const hasIngredients = content.some((block) => block._type === 'ingredientsBlock');

  return (
    <>
      {/* Portion Adjuster - only show if there are ingredients */}
      {hasIngredients && (
        <PortionAdjuster
          originalServings={originalServings}
          onServingsChange={setCurrentServings}
        />
      )}

      {/* Modular Content Blocks */}
      <div className="space-y-10">
        {content.map((block) => {
          switch (block._type) {
            case 'textBlock':
              return (
                <section key={block._key}>
                  {block.title && (
                    <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 flex items-center gap-3">
                      <span className="w-1 h-8 bg-[var(--color-accent)] rounded-full"></span>
                      {block.title}
                    </h2>
                  )}
                  <p className="text-[var(--color-text-muted)] leading-relaxed whitespace-pre-wrap">
                    {block.text}
                  </p>
                </section>
              );

            case 'ingredientsBlock':
              return (
                <IngredientsBlock
                  key={block._key}
                  title={block.title}
                  ingredients={block.ingredients}
                  originalServings={originalServings}
                  currentServings={currentServings}
                />
              );

            case 'stepsBlock':
              return (
                <StepsBlock
                  key={block._key}
                  title={block.title}
                  steps={block.steps}
                />
              );

            default:
              return null;
          }
        })}
      </div>
    </>
  );
}
