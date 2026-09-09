# Architecture

Music Picks keeps Hygraph as the editorial source of truth and Next.js as a thin frontend.

## Primary flow

```text
Hygraph
   ↓ GraphQL
Next.js Server Components
   ↓
React UI
```

The Home page and the album detail page fetch content on the server with `graphql-request`. GraphQL queries live in `src/lib/hygraph/queries.ts`, not in UI components.

Hygraph owns artists, albums, the Artist → Album relationship, covers, reviews, ratings, and the featured flag.

The frontend renders only the fields each page needs. That is intentional: the project demonstrates GraphQL field selection.

The project does not call a third-party music API and does not use Hygraph Remote Sources.

## Secrets

`HYGRAPH_TOKEN` stays on the server and is not prefixed with `NEXT_PUBLIC_`.
