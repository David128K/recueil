import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-dominant)] flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fadeIn">
        <div className="animate-bounce-slow mb-6">
          <h1 className="text-8xl font-bold text-[var(--color-accent)] mb-2">404</h1>
        </div>
        <h2 className="text-3xl font-semibold text-[var(--color-secondary)] mb-4 animate-slideUp" style={{animationDelay: '200ms', animationFillMode: 'backwards'}}>
          Rezept nicht gefunden
        </h2>
        <p className="text-[var(--color-text-muted)] mb-10 leading-relaxed animate-slideUp" style={{animationDelay: '400ms', animationFillMode: 'backwards'}}>
          Das gesuchte Rezept existiert leider nicht oder wurde entfernt.
        </p>
        <div className="animate-slideUp" style={{animationDelay: '600ms', animationFillMode: 'backwards'}}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-4 bg-[var(--color-accent)] text-white rounded-xl hover:bg-[var(--color-accent-hover)] transition-all duration-300 font-medium shadow-md hover:shadow-xl hover:scale-105 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
