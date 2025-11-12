# Agent Guidelines for Recueil

## Commands
- **Dev**: `pnpm dev` - Start development server on port 3000
- **Build**: `pnpm build` - Build production bundle
- **Lint**: `pnpm lint` - Run ESLint
- **Tests**: No test framework configured

## Code Style
- **TypeScript**: Strict mode enabled, ES2017 target, explicit return types preferred
- **Imports**: Use `@/*` path alias for src imports (e.g., `@/app/...`), single quotes
- **Formatting**: 2-space indentation, semicolons required
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Components**: Use function declarations with explicit types, export default for pages
- **Error Handling**: Use assertValue pattern for env vars (see sanity/env.ts:14)
- **Styling**: Tailwind CSS v4 with custom theme, use className prop
- **Next.js**: App Router, use `type Metadata` for SEO, prefer Server Components
- **Sanity**: Client in sanity/lib/client.ts, env vars in sanity/env.ts

## Key Files
- Config: next.config.ts, tsconfig.json, eslint.config.mjs
- Sanity: sanity/lib/client.ts, sanity/env.ts, sanity/schemaTypes/
