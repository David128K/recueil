import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { urlFor } from '../../../../sanity/lib/image';
import RecipeContent from '@/components/RecipeContent';
import MuxVideoPlayer from '@/components/MuxVideoPlayer';
import { getRecipe } from '@/lib/sanity/queries';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    return {
      title: 'Rezept nicht gefunden',
    };
  }

  return {
    title: `${recipe.title} - Recueil`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [urlFor(recipe.mainImage).width(1200).height(630).url()],
    },
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-dominant)] animate-fadeIn">
      {/* Header */}
      <header className="bg-[var(--color-dominant-light)]/95 backdrop-blur-md border-b border-[var(--color-secondary-light)] shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-all duration-300 group hover:gap-3"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Zurück zur Übersicht</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <article className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-slideUp">
          {/* Hero Video or Image */}
          {recipe.video?.asset?.playbackId ? (
            <MuxVideoPlayer
              playbackId={recipe.video.asset.playbackId}
              thumbTime={recipe.video.asset.thumbTime}
              categoryName={recipe.category.name}
            />
          ) : (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={urlFor(recipe.mainImage).width(1200).height(675).url()}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute top-5 left-5">
                <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-[var(--color-accent)] rounded-full shadow-md">
                  {recipe.category.name}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-secondary)] mb-4 leading-tight">
              {recipe.title}
            </h1>

            <p className="text-lg text-[var(--color-text-muted)] mb-6 leading-relaxed">
              {recipe.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-6 pb-6 mb-6 border-b border-gray-200 flex-wrap">
              <div className="flex items-center gap-2 text-[var(--color-secondary)]">
                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{recipe.prepTime} Minuten</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-secondary)]">
                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">{recipe.servings} Portionen</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-secondary)]">
                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-medium capitalize">{recipe.difficulty}</span>
              </div>
            </div>

            {/* Recipe Content with Portion Adjuster and Modular Blocks */}
            <RecipeContent
              content={recipe.content}
              originalServings={recipe.servings}
            />

            {/* Main Image at the end if video exists */}
            {recipe.video?.asset?.playbackId && (
              <div className="mt-10 pt-10 border-t border-gray-200">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={urlFor(recipe.mainImage).width(1200).height(675).url()}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
