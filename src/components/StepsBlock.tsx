'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';
import type { Step } from '@/types';

type StepsBlockProps = {
  title?: string;
  steps: Step[];
};

export default function StepsBlock({ title, steps }: StepsBlockProps) {
  const [showImages, setShowImages] = useState(true);
  
  // Check if any step has an image
  const hasImages = steps.some((step) => step.image);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-secondary)] flex items-center gap-3">
          <span className="w-1 h-8 bg-[var(--color-accent)] rounded-full"></span>
          {title || 'Zubereitung'}
        </h2>
        
        {hasImages && (
          <button
            onClick={() => setShowImages(!showImages)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] bg-white border border-gray-200 rounded-lg hover:border-[var(--color-accent)] transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showImages ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              )}
            </svg>
            <span>{showImages ? 'Bilder' : 'Bilder'}</span>
          </button>
        )}
      </div>
      
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-5 group">
            <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white font-bold text-sm shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
              {index + 1}
            </span>
            <div className="flex-1 pt-2">
              {showImages && step.image && (
                <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={urlFor(step.image).width(800).height(450).url()}
                    alt={`Schritt ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}
              <p className="text-[var(--color-text-muted)] leading-relaxed">{step.step}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
