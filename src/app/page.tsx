import { Suspense } from 'react';
import Header from '@/components/Header';
import RecipeGrid from '@/components/RecipeGrid';
import { getRecipes, getCategories } from '@/lib/sanity/queries';
import { RECIPES_PER_PAGE } from '@/constants';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const difficulty = typeof params.difficulty === 'string' ? params.difficulty : undefined;
  const sort = typeof params.sort === 'string' ? params.sort : 'newest';

  const [recipes, categories] = await Promise.all([
    getRecipes({ search, category, difficulty, sort }),
    getCategories(),
  ]);

  const hasMore = recipes.length === RECIPES_PER_PAGE;
  const lastPublishedAt = recipes.length > 0 ? recipes[recipes.length - 1].publishedAt : null;

  return (
    <div className="min-h-screen bg-[var(--color-dominant)]">
      <Suspense fallback={<div>Loading...</div>}>
        <Header categories={categories} />
      </Suspense>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <RecipeGrid
          initialRecipes={recipes}
          hasMore={hasMore}
          lastPublishedAt={lastPublishedAt}
          searchParams={{ search, category, difficulty, sort }}
        />
      </main>
    </div>
  );
}
