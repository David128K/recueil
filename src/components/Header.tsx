'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import CustomSelect from './CustomSelect';
import FilterModal from './FilterModal';
import { DIFFICULTY_OPTIONS, SORT_OPTIONS } from '@/constants';
import type { Category } from '@/types';

type HeaderProps = {
  categories: Category[];
};

export default function Header({ categories }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const updateParams = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  }, [router, searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams('search', e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    updateParams('category', value);
  };

  const handleSortChange = (value: string) => {
    updateParams('sort', value);
  };

  const categoryOptions = useMemo(() => [
    { value: '', label: 'Alle Kategorien' },
    ...categories.map((cat) => ({ value: cat._id, label: cat.name }))
  ], [categories]);

  const sortOptions = SORT_OPTIONS;
  const difficultyOptions = DIFFICULTY_OPTIONS;

  const handleDifficultyChange = (value: string) => {
    updateParams('difficulty', value);
  };

  const handleReset = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--color-dominant-light)]/95 backdrop-blur-md border-b border-[var(--color-secondary-light)] shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            {/* Logo and Filter Button (Mobile) */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-secondary)] tracking-tight">
                Recueil
              </h1>
              {/* Filter Button - Mobile Only */}
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors shadow-sm active:scale-95"
                aria-label="Filter öffnen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="w-full">
              <div className="relative group">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-accent)] transition-colors duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  defaultValue={searchParams.get('search') || ''}
                  onChange={handleSearchChange}
                  placeholder="Rezepte suchen..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--color-secondary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-white text-[var(--color-secondary)] placeholder:text-[var(--color-text-muted)] transition-all duration-200 hover:border-gray-300"
                />
              </div>
            </div>

            {/* Filters - Desktop Only */}
            <div className="hidden md:flex flex-col sm:flex-row gap-3">
              {/* Category Filter */}
              <CustomSelect
                options={categoryOptions}
                value={searchParams.get('category') || ''}
                onChange={handleCategoryChange}
                placeholder="Alle Kategorien"
                className="flex-1"
              />

              {/* Difficulty Filter */}
              <CustomSelect
                options={difficultyOptions}
                value={searchParams.get('difficulty') || ''}
                onChange={handleDifficultyChange}
                placeholder="Alle Schwierigkeiten"
                className="flex-1"
              />

              {/* Sort Filter */}
              <CustomSelect
                options={sortOptions}
                value={searchParams.get('sort') || 'newest'}
                onChange={handleSortChange}
                placeholder="Sortierung"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Filter Modal - Mobile Only */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        categoryOptions={categoryOptions}
        difficultyOptions={difficultyOptions}
        sortOptions={sortOptions}
        selectedCategory={searchParams.get('category') || ''}
        selectedDifficulty={searchParams.get('difficulty') || ''}
        selectedSort={searchParams.get('sort') || 'newest'}
        onCategoryChange={handleCategoryChange}
        onDifficultyChange={handleDifficultyChange}
        onSortChange={handleSortChange}
        onReset={handleReset}
        searchQuery={searchParams.get('search') || ''}
      />
    </>
  );
}
