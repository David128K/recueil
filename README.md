# Recueil - Modern Recipe Collection

A modern, German-language recipe collection platform built with Next.js 16, Sanity CMS, and Tailwind CSS. Features include advanced filtering, infinite scroll, portion adjustment, and video recipe support.

## Features

- **Modern UI/UX**: Clean, responsive design with smooth animations and transitions
- **Advanced Search & Filtering**: Search by title/description, filter by category and difficulty
- **Infinite Scroll**: Seamless recipe browsing with automatic pagination
- **Portion Adjustment**: Dynamic ingredient scaling based on serving size
- **Video Support**: Mux video integration for recipe demonstrations
- **Mobile-Optimized**: Bottom sheet filters and touch-friendly interface
- **Modular Content**: Flexible content blocks for recipes (text, ingredients, steps)
- **SEO-Optimized**: Proper meta tags and Open Graph support
- **Type-Safe**: Full TypeScript coverage with strict mode

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity v4
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Video**: Mux Player
- **Package Manager**: pnpm

## Project Structure

```
recueil/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   └── recipes/       # Recipe endpoints
│   │   ├── rezept/[slug]/     # Recipe detail page
│   │   ├── studio/            # Sanity Studio
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── CustomSelect.tsx   # Custom dropdown
│   │   ├── FilterChip.tsx     # Filter chips
│   │   ├── FilterModal.tsx    # Mobile filter modal
│   │   ├── Header.tsx         # Main header
│   │   ├── IngredientsBlock.tsx
│   │   ├── MuxVideoPlayer.tsx
│   │   ├── PortionAdjuster.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── RecipeContent.tsx
│   │   ├── RecipeGrid.tsx
│   │   └── StepsBlock.tsx
│   ├── constants/             # App constants
│   │   └── index.ts
│   ├── lib/                   # Utility functions
│   │   └── sanity/
│   │       └── queries.ts     # Sanity query helpers
│   └── types/                 # TypeScript type definitions
│       └── index.ts
├── sanity/                    # Sanity CMS configuration
│   ├── components/
│   │   └── IngredientInput.tsx
│   ├── lib/                   # Sanity utilities
│   │   ├── client.ts
│   │   ├── image.ts
│   │   └── live.ts
│   ├── schemaTypes/           # Content schemas
│   │   ├── category.ts
│   │   ├── contentBlocks.ts
│   │   ├── index.ts
│   │   └── recipe.ts
│   ├── env.ts
│   └── structure.ts
└── public/                    # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20 or later)
- pnpm (or npm/yarn)
- Sanity account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recueil
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-11
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

6. Access Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)

## Development

### Available Scripts

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Code Style

- **TypeScript**: Strict mode enabled, ES2017 target
- **Imports**: Use `@/*` path alias for src imports
- **Formatting**: 2-space indentation, semicolons required
- **Naming**: 
  - camelCase for variables/functions
  - PascalCase for components/types
- **Components**: Function declarations with explicit types
- **Error Handling**: Use assertValue pattern for env vars

## Content Management

### Sanity Studio

Access the CMS at `/studio` to manage:

- **Recipes**: Title, description, images, video, ingredients, steps
- **Categories**: Recipe categories
- **Content Blocks**: Modular recipe content (text, ingredients, preparation)

### Recipe Schema

Recipes support flexible content blocks:

1. **Text Block**: Rich text for descriptions, tips, notes
2. **Ingredients Block**: List of ingredients with portions
3. **Steps Block**: Numbered preparation steps with optional images

### Video Integration

Upload videos through Sanity's Mux plugin. Videos automatically generate thumbnails and adaptive streaming.

## API Routes

### GET `/api/recipes`

Fetch paginated recipes with filters.

**Query Parameters:**
- `search` - Search term
- `category` - Category ID
- `difficulty` - einfach | fortgeschritten | professionell
- `sort` - newest | oldest
- `lastPublishedAt` - Pagination cursor

**Response:**
```json
{
  "recipes": [...],
  "hasMore": true,
  "lastPublishedAt": "2025-11-13T10:00:00Z"
}
```

### GET `/api/recipes/count`

Get recipe count with filters.

**Query Parameters:** Same as above (except `lastPublishedAt`)

**Response:**
```json
{
  "count": 42
}
```

## Type System

All types are defined in `src/types/index.ts`:

- `Recipe` - Full recipe with all fields
- `RecipeCard` - Minimal recipe for list view
- `Category` - Recipe category
- `Ingredient` - Recipe ingredient
- `Step` - Preparation step
- `ContentBlock` - Recipe content blocks
- `SanityImage` - Sanity image type
- `Difficulty` - Difficulty levels

## Styling

### Tailwind CSS

Using Tailwind CSS v4 with custom theme. CSS variables defined in `globals.css`:

- `--color-dominant` - Background color
- `--color-secondary` - Text color
- `--color-accent` - Primary accent
- `--color-text-muted` - Muted text

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile: Bottom sheet filters
- Desktop: Inline filters

## Best Practices

### Performance

- Server Components by default
- Client Components only when needed
- Image optimization with Next.js Image
- Infinite scroll with Intersection Observer
- Memoization in client components

### Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management

### SEO

- Dynamic metadata generation
- Open Graph tags
- Structured data ready
- Optimized images with alt text

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the project:
```bash
pnpm build
```

Start the production server:
```bash
pnpm start
```

## Environment Variables

Required variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name
- `NEXT_PUBLIC_SANITY_API_VERSION` - API version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm lint` to check code quality
5. Submit a pull request

## License

[Add your license here]

## Support

For issues or questions, please open an issue on GitHub.
