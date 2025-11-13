'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(() => {
    const selected = options.find((opt) => opt.value === value);
    return selected ? selected.label : placeholder;
  }, [value, options, placeholder]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3.5 bg-white border border-[var(--color-secondary-light)] rounded-xl text-left text-[var(--color-secondary)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all duration-300 hover:border-gray-300 hover:shadow-sm flex items-center justify-between group"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? 'text-[var(--color-secondary)]' : 'text-[var(--color-text-muted)]'}>
          {selectedLabel}
        </span>
        <svg
          className={`w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-all duration-300 ${
            isOpen ? 'rotate-180 text-[var(--color-accent)]' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-[var(--color-secondary-light)] rounded-xl shadow-2xl overflow-hidden animate-slideDown">
          <ul role="listbox" className="max-h-60 overflow-y-auto py-2">
            {options.map((option) => (
              <li key={option.value} role="option" aria-selected={value === option.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 ${
                    value === option.value
                      ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)] font-semibold border-l-4 border-[var(--color-accent)]'
                      : 'text-[var(--color-secondary)] hover:bg-gray-50 hover:pl-6'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slideDown {
          animation: slideDown 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
