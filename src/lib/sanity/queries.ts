import { client } from '../../../sanity/lib/client';
import type { Recipe, RecipeCard, Category } from '@/types';
import { RECIPES_PER_PAGE } from '@/constants';

type RecipeFilters = {
  search?: string;
  category?: string;
  difficulty?: string;
  sort?: string;
  lastPublishedAt?: string;
};

function buildRecipeFilter(filters: RecipeFilters): string {
  let filter = `*[_type == "recipe"`;

  if (filters.search) {
    filter += ` && (title match "${filters.search}*" || description match "${filters.search}*")`;
  }

  if (filters.category) {
    filter += ` && category._ref == "${filters.category}"`;
  }

  if (filters.difficulty) {
    filter += ` && difficulty == "${filters.difficulty}"`;
  }

  if (filters.lastPublishedAt) {
    const operator = filters.sort === 'oldest' ? '>' : '<';
    filter += ` && publishedAt ${operator} "${filters.lastPublishedAt}"`;
  }

  filter += `]`;
  return filter;
}

export async function getRecipes(filters: RecipeFilters = {}): Promise<RecipeCard[]> {
  const filter = buildRecipeFilter(filters);
  const orderBy = filters.sort === 'oldest' ? 'publishedAt asc' : 'publishedAt desc';

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

export async function getRecipe(slug: string): Promise<Recipe | null> {
  const query = `*[_type == "recipe" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    video {
      asset-> {
        playbackId,
        thumbTime
      }
    },
    category->{
      name,
      slug
    },
    prepTime,
    servings,
    difficulty,
    content[] {
      _type,
      _key,
      title,
      text,
      ingredients,
      steps[] {
        step,
        image
      }
    },
    publishedAt
  }`;

  return await client.fetch(query, { slug });
}

export async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"] | order(name asc) {
    _id,
    name,
    slug
  }`;

  return await client.fetch(query);
}

export async function getRecipeCount(filters: RecipeFilters = {}): Promise<number> {
  const filter = buildRecipeFilter(filters);
  const query = `count(${filter})`;
  return await client.fetch(query);
}
