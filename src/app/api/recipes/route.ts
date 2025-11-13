import { NextRequest, NextResponse } from 'next/server';
import { getRecipes } from '@/lib/sanity/queries';
import { RECIPES_PER_PAGE } from '@/constants';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  
  try {
    const recipes = await getRecipes({
      lastPublishedAt: searchParams.get('lastPublishedAt') || undefined,
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
      sort: searchParams.get('sort') || 'newest',
    });

    const hasMore = recipes.length === RECIPES_PER_PAGE;
    const lastDate = recipes.length > 0 ? recipes[recipes.length - 1].publishedAt : null;

    return NextResponse.json({
      recipes,
      hasMore,
      lastPublishedAt: lastDate,
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}
