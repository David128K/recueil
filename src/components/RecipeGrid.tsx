'use client';

import { useEffect, useRef, useState } from 'react';
import RecipeCard from './RecipeCard';
import type { RecipeCard as RecipeCardType } from '@/types';

type RecipeGridProps = {
  initialRecipes: RecipeCardType[];
  hasMore: boolean;
  lastPublishedAt: string | null;
  searchParams: {
    search?: string;
    category?: string;
    difficulty?: string;
    sort?: string;
  };
};

export default function RecipeGrid({ initialRecipes, hasMore, lastPublishedAt, searchParams }: RecipeGridProps) {
  const [recipes, setRecipes] = useState<RecipeCardType[]>(initialRecipes);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreRecipes, setHasMoreRecipes] = useState(hasMore);
  const [lastDate, setLastDate] = useState(lastPublishedAt);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecipes(initialRecipes);
    setHasMoreRecipes(hasMore);
    setLastDate(lastPublishedAt);
  }, [initialRecipes, hasMore, lastPublishedAt]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMoreRecipes && !isLoading && lastDate) {
          setIsLoading(true);
          try {
            const params = new URLSearchParams({
              lastPublishedAt: lastDate,
              ...(searchParams.search && { search: searchParams.search }),
              ...(searchParams.category && { category: searchParams.category }),
              ...(searchParams.difficulty && { difficulty: searchParams.difficulty }),
              ...(searchParams.sort && { sort: searchParams.sort }),
            });

            const response = await fetch(`/api/recipes?${params.toString()}`);
            const data = await response.json();

            if (data.recipes.length > 0) {
              setRecipes((prev) => [...prev, ...data.recipes]);
              setLastDate(data.lastPublishedAt);
              setHasMoreRecipes(data.hasMore);
            } else {
              setHasMoreRecipes(false);
            }
          } catch (error) {
            console.error('Error loading more recipes:', error);
          } finally {
            setIsLoading(false);
          }
        }
      },
      { threshold: 0.5 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [hasMoreRecipes, isLoading, lastDate, searchParams]);

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-[var(--color-text-muted)]">
          Keine Rezepte gefunden. Versuchen Sie eine andere Suche.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
        {recipes.map((recipe, index) => (
          <div
            key={recipe._id}
            className="animate-slideUp"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'backwards'
            }}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMoreRecipes && (
        <div ref={observerRef} className="py-12 text-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-[var(--color-text-muted)] font-medium animate-pulse">
                Weitere Rezepte laden...
              </p>
            </div>
          )}
        </div>
      )}

      {!hasMoreRecipes && recipes.length > 0 && (
        <div className="text-center py-12">
          <div className="inline-block px-6 py-3 bg-gray-50 rounded-full">
            <p className="text-sm text-[var(--color-text-muted)] font-medium">
              ✨ Alle Rezepte geladen
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 600ms ease-out;
        }

        .animate-slideUp {
          animation: slideUp 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
