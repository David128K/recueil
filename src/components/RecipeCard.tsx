import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';
import type { RecipeCard as RecipeCardType } from '@/types';

type RecipeCardProps = {
  recipe: RecipeCardType;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/rezept/${recipe.slug.current}`} className="group block h-full">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out h-full flex flex-col border border-gray-100 group-hover:border-[var(--color-accent)]/20 group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={urlFor(recipe.mainImage).width(600).height(450).url()}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
            <span className="inline-block px-4 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] rounded-full shadow-md backdrop-blur-sm">
              {recipe.category.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-[var(--color-secondary)] mb-3 line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-tight">
            {recipe.title}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2 flex-grow leading-relaxed">
            {recipe.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-gray-500 pt-4 border-t border-gray-100 group-hover:border-[var(--color-accent)]/20 transition-colors duration-300 flex-wrap">
            <div className="flex items-center gap-1.5 group/meta">
              <svg className="w-4 h-4 text-[var(--color-accent)] group-hover/meta:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{recipe.prepTime} Min</span>
            </div>
            <div className="flex items-center gap-1.5 group/meta">
              <svg className="w-4 h-4 text-[var(--color-accent)] group-hover/meta:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">{recipe.servings} Portionen</span>
            </div>
            <div className="flex items-center gap-1.5 group/meta">
              <svg className="w-4 h-4 text-[var(--color-accent)] group-hover/meta:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium capitalize">{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
