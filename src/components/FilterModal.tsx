'use client';

import { Sheet } from 'react-modal-sheet';
import { useEffect, useState } from 'react';
import FilterChip from './FilterChip';

type Option = {
  readonly value: string;
  readonly label: string;
};

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categoryOptions: readonly Option[];
  difficultyOptions: readonly Option[];
  sortOptions: readonly Option[];
  selectedCategory: string;
  selectedDifficulty: string;
  selectedSort: string;
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
  searchQuery?: string;
};

export default function FilterModal({
  isOpen,
  onClose,
  categoryOptions,
  difficultyOptions,
  sortOptions,
  selectedCategory,
  selectedDifficulty,
  selectedSort,
  onCategoryChange,
  onDifficultyChange,
  onSortChange,
  onReset,
  searchQuery,
}: FilterModalProps) {
  const [recipeCount, setRecipeCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(false);

  // Fetch recipe count when filters change
  useEffect(() => {
    if (!isOpen) return;

    const fetchCount = async () => {
      setIsLoadingCount(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
        if (selectedSort) params.set('sort', selectedSort);

        const response = await fetch(`/api/recipes/count?${params.toString()}`);
        const data = await response.json();
        setRecipeCount(data.count);
      } catch (error) {
        console.error('Error fetching recipe count:', error);
        setRecipeCount(null);
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchCount();
  }, [isOpen, searchQuery, selectedCategory, selectedDifficulty, selectedSort]);
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      detent="content"
      tweenConfig={{ ease: 'easeOut', duration: 0.3 }}
    >
      <Sheet.Container
        style={{
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Sheet.Header
          style={{
            borderBottom: '1px solid var(--color-secondary-light)',
          }}
        >
          {/* iOS-style Drag Indicator */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Custom Header Content */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--color-secondary)]">Filter</h2>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Schließen"
              >
                <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </Sheet.Header>

        <Sheet.Content
          style={{
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {/* Filter Sections */}
          <div className="px-6 py-6 space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-secondary)] mb-3 uppercase tracking-wide">
                Kategorien
              </h3>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((option) => (
                  <FilterChip
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    isSelected={selectedCategory === option.value}
                    onSelect={onCategoryChange}
                  />
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-secondary)] mb-3 uppercase tracking-wide">
                Schwierigkeit
              </h3>
              <div className="flex flex-wrap gap-2">
                {difficultyOptions.map((option) => (
                  <FilterChip
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    isSelected={selectedDifficulty === option.value}
                    onSelect={onDifficultyChange}
                  />
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-secondary)] mb-3 uppercase tracking-wide">
                Sortierung
              </h3>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <FilterChip
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    isSelected={selectedSort === option.value}
                    onSelect={onSortChange}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 border-t border-[var(--color-secondary-light)] bg-gray-50">
            <div className="flex gap-3">
              {/* Reset Button */}
              <button
                type="button"
                onClick={() => {
                  onReset();
                  onClose();
                }}
                className="flex-1 py-3.5 bg-white text-[var(--color-secondary)] font-semibold rounded-xl border-2 border-[var(--color-secondary-light)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors active:scale-[0.98]"
              >
                Zurücksetzen
              </button>

              {/* Show Results Button */}
              <button
                type="button"
                onClick={onClose}
                disabled={isLoadingCount}
                className="flex-1 py-3.5 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors shadow-md active:scale-[0.98] disabled:opacity-50"
              >
                {isLoadingCount ? (
                  'Laden...'
                ) : recipeCount !== null ? (
                  `Anzeigen (${recipeCount})`
                ) : (
                  'Anzeigen'
                )}
              </button>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
}
