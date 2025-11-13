import { NextRequest, NextResponse } from 'next/server';
import { getRecipeCount } from '@/lib/sanity/queries';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;

  try {
    const count = await getRecipeCount({
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching recipe count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipe count' },
      { status: 500 }
    );
  }
}
