# Music Picks

A small Next.js frontend for the **Hygraph Developer Certification: Fundamentals**.

It shows a short editorial list of albums stored in Hygraph. Hygraph is the only content source.

## Certification Goals

This project demonstrates:

- a Hygraph schema with `Artist` and `Album` models;
- a 1:N reference from Artist to Album;
- GraphQL queries against the Hygraph Content API;
- GraphQL field selection (each page asks only for the fields it renders);
- DRAFT vs PUBLISHED as Hygraph content stages, with the public site reading PUBLISHED content;
- Next.js App Router Server Components consuming Hygraph;
- environment variables kept on the server.

## Architecture

```text
Hygraph
   │
   │ GraphQL
   ▼
Next.js
   │
   ▼
User
```

Hygraph owns artists, albums, covers, reviews, ratings, and featured state. The site does not call a third-party music API.

## Hygraph Models

```text
Artist
Album
```

```text
Artist 1 → N Album
```

See [docs/hygraph-schema.md](docs/hygraph-schema.md) for fields and [docs/architecture.md](docs/architecture.md) for the request flow.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values from your Hygraph project.

```env
HYGRAPH_ENDPOINT=
HYGRAPH_TOKEN=
```

- `HYGRAPH_ENDPOINT` is required for content.
- `HYGRAPH_TOKEN` is optional if Public Content API permissions allow PUBLISHED reads.

Never prefix private credentials with `NEXT_PUBLIC_`.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts already in the repository:

```bash
npm run lint
npm run build
npx tsc --noEmit
```

## Routes

```text
/
/album/[slug]
```

- `/` shows featured albums (`featured = true` in Hygraph).
- `/album/[slug]` shows the album, the related artist, and Rich Text review/bio.
