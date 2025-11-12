'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import CustomSelect from './CustomSelect';

type Category = {
  _id: string;
  name: string;
  slug: { current: string };
};

type HeaderProps = {
  categories: Category[];
};

export default function Header({ categories }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const sortOptions = [
    { value: 'newest', label: 'Neueste zuerst' },
    { value: 'oldest', label: 'Älteste zuerst' },
  ];

  const difficultyOptions = [
    { value: '', label: 'Alle Schwierigkeiten' },
    { value: 'einfach', label: 'Einfach' },
    { value: 'fortgeschritten', label: 'Fortgeschritten' },
    { value: 'professionell', label: 'Professionell' },
  ];

  const handleDifficultyChange = (value: string) => {
    updateParams('difficulty', value);
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-dominant-light)]/95 backdrop-blur-md border-b border-[var(--color-secondary-light)] shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-secondary)] tracking-tight">
              Recueil
            </h1>
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

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
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
  );
}
