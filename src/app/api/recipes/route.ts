import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../../sanity/lib/client';

const RECIPES_PER_PAGE = 12;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const lastPublishedAt = searchParams.get('lastPublishedAt');
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');
  const sort = searchParams.get('sort') || 'newest';

  try {
    // Build GROQ query
    let filter = `*[_type == "recipe"`;

    // Add search filter
    if (search) {
      filter += ` && (title match "${search}*" || description match "${search}*")`;
    }

    // Add category filter
    if (category) {
      filter += ` && category._ref == "${category}"`;
    }

    // Add difficulty filter
    if (difficulty) {
      filter += ` && difficulty == "${difficulty}"`;
    }

    // Add pagination filter
    if (lastPublishedAt) {
      if (sort === 'oldest') {
        filter += ` && publishedAt > "${lastPublishedAt}"`;
      } else {
        filter += ` && publishedAt < "${lastPublishedAt}"`;
      }
    }

    filter += `]`;

    // Add sorting
    const orderBy = sort === 'oldest' ? 'publishedAt asc' : 'publishedAt desc';

    // Build full query
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

    const recipes = await client.fetch(query);
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
