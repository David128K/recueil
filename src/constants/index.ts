export const RECIPES_PER_PAGE = 12;

export const DIFFICULTY_OPTIONS = [
  { value: '', label: 'Alle Schwierigkeiten' },
  { value: 'einfach', label: 'Einfach' },
  { value: 'fortgeschritten', label: 'Fortgeschritten' },
  { value: 'professionell', label: 'Professionell' },
] as const;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Neueste zuerst' },
  { value: 'oldest', label: 'Älteste zuerst' },
] as const;
