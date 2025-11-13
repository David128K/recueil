'use client';

type FilterChipProps = {
  label: string;
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
};

export default function FilterChip({ label, value, isSelected, onSelect }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 border-2 ${
        isSelected
          ? 'bg-[var(--color-accent)] text-white shadow-md border-[var(--color-accent)]'
          : 'bg-white text-[var(--color-secondary)] border-[var(--color-secondary-light)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
      }`}
    >
      {label}
    </button>
  );
}
