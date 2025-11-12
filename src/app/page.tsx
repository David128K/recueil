import { Suspense } from 'react';
import { client } from '../../sanity/lib/client';
import Header from '@/components/Header';
import RecipeGrid from '@/components/RecipeGrid';

const RECIPES_PER_PAGE = 12;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getRecipes(search?: string, category?: string, difficulty?: string, sort?: string) {
  let filter = `*[_type == "recipe"`;

  if (search) {
    filter += ` && (title match "${search}*" || description match "${search}*")`;
  }

  if (category) {
    filter += ` && category._ref == "${category}"`;
  }

  if (difficulty) {
    filter += ` && difficulty == "${difficulty}"`;
  }

  filter += `]`;

  const orderBy = sort === 'oldest' ? 'publishedAt asc' : 'publishedAt desc';

  const query = `${filter} | order(${orderBy}) [0...${RECIPES_PER_PAGE}] {
    _id,
    title,
    slug,
    description,
    mainImage,
    category->{
      name,
      slug
    },
    prepTime,
    servings,
    difficulty,
    publishedAt
  }`;

  return await client.fetch(query);
}

async function getCategories() {
  const query = `*[_type == "category"] | order(name asc) {
    _id,
    name,
    slug
  }`;

  return await client.fetch(query);
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const difficulty = typeof params.difficulty === 'string' ? params.difficulty : undefined;
  const sort = typeof params.sort === 'string' ? params.sort : 'newest';

  const [recipes, categories] = await Promise.all([
    getRecipes(search, category, difficulty, sort),
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
