# Pokédex Next.js

## Overview
A polished Pokédex interface built with Next.js 14 and TypeScript. The home page lists Pokémon with server-rendered pagination, per-type filtering, and localized UI strings powered by PokéAPI data.

## Feature Highlights
- Server components fetch and render data on the server (`app/page.tsx`, `app/components/PokemonPageContent.tsx`) ensuring fast loads and SEO-friendly markup.
- Typed PokéAPI client (`lib/pokeapi.ts`) caches responses for one hour and supports filtering by Pokémon type.
- Client components (`TypeFilter`, `LocaleSwitcher`) use `useTransition` and `next/navigation` for smooth URL updates without full reloads.
- Detail route (`/pokemon/[id]`) presents height, weight, abilities, and base stats along with a return link that preserves filters and pagination state.
- Responsive styling (`app/globals.css`) delivers a modern card grid, themed type pills, and subtle entrance animations.
- Internationalization with English default and optional Vietnamese toggle via the locale switcher or `?lang=` query parameter.

## Tech Stack
- Next.js 14 (App Router, Server & Client Components)
- React 18
- TypeScript (strict mode)
- ESLint (`next/core-web-vitals` config)

## Getting Started
1. Install dependencies: `npm install`
2. Optionally copy `.env.example` to `.env.local` and adjust endpoints.
3. Start the development server: `npm run dev`
4. Visit `http://localhost:3000`

## Environment Variables
| Name              | Description                                      | Default                                                               |
| ----------------- | ------------------------------------------------ | --------------------------------------------------------------------- |
| `API_BASE_URL`    | PokéAPI base endpoint                            | `https://pokeapi.co/api/v2`                                           |
| `ARTWORK_BASE_URL`| Official artwork sprite base URL                 | `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork` |

## Project Structure
```
app/
  components/
    LocaleSwitcher.tsx
    Pagination.tsx
    PokemonCard.tsx
    PokemonGrid.tsx
    PokemonPageContent.tsx
    TypeFilter.tsx
  globals.css
  layout.tsx
  loading.tsx
  page.tsx
lib/
  i18n.ts
  pokeapi.ts
types/
  index.ts
  i18n.ts
  pokemon.ts
locales/
  en.ts
  vi.ts
```

## Additional Notes
- PokéAPI is a public service and may enforce rate limits; responses are cached for 1 hour via `next` fetch revalidation to reduce outbound calls.
- Changing the type filter resets the pagination to page 1 to avoid empty result sets.
- The UI defaults to English. Switch to Vietnamese using the header selector or by appending `?lang=vi` to the URL.

## Development Effort
- Total time invested: roughly 3 hours.
- Structure and core features: ~1.5–2 hours.
- Styling, animations, and i18n polish: ~45–60 minutes (with occasional AI-assisted syntax suggestions).
