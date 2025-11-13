export type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type Slug = {
  _type: 'slug';
  current: string;
};

export type Category = {
  _id: string;
  name: string;
  slug: Slug;
};

export type Difficulty = 'einfach' | 'fortgeschritten' | 'professionell';

export type Ingredient = {
  amount: string;
  unit?: string;
  name: string;
};

export type Step = {
  step: string;
  image?: SanityImage;
};

export type TextBlock = {
  _type: 'textBlock';
  _key: string;
  title?: string;
  text: string;
};

export type IngredientsBlock = {
  _type: 'ingredientsBlock';
  _key: string;
  title?: string;
  ingredients: Ingredient[];
};

export type StepsBlock = {
  _type: 'stepsBlock';
  _key: string;
  title?: string;
  steps: Step[];
};

export type ContentBlock = TextBlock | IngredientsBlock | StepsBlock;

export type MuxVideo = {
  asset?: {
    playbackId?: string;
    thumbTime?: number;
  };
};

export type Recipe = {
  _id: string;
  title: string;
  slug: Slug;
  description: string;
  mainImage: SanityImage;
  video?: MuxVideo;
  category: Category;
  prepTime: number;
  servings: number;
  difficulty: Difficulty;
  content: ContentBlock[];
  publishedAt: string;
};

export type RecipeCard = Pick<Recipe, '_id' | 'title' | 'slug' | 'description' | 'mainImage' | 'category' | 'prepTime' | 'servings' | 'difficulty' | 'publishedAt'>;
