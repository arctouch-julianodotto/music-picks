# My Fav Albums

A Next.js frontend for an editorial album selection. Content lives in Hygraph: artists, albums, covers, ratings, reviews, and which albums appear as featured on the Home page.

This repository is the project for the **Hygraph Developer Certification**. It demonstrates a Hygraph schema, an Artist → Album relationship, the GraphQL Content API, DRAFT vs PUBLISHED stages, field localization, and Content Federation with the MusicBrainz REST API (tracklists via a Remote Source).

Next.js only talks to the Hygraph GraphQL API. Tracks are not fetched from MusicBrainz in the app. Hygraph resolves the `musicBrainzRelease` Remote Field from each album’s `musicBrainzReleaseId`.

```text
Hygraph (CMS + MusicBrainz federation)
        │ GraphQL
        ▼
Next.js (App Router, Server Components)
        │
        ▼
Visitor  (/pt or /en)
```

## How to run the project

Requirements: Node.js 18.18+ and npm.

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment file and fill it with values from your Hygraph project (**Project Settings → Access**):

```bash
cp .env.example .env.local
```

```env
HYGRAPH_ENDPOINT=
HYGRAPH_TOKEN=
```

- `HYGRAPH_ENDPOINT` is required (Content API).
- `HYGRAPH_TOKEN` is optional if the Public Content API already allows **PUBLISHED** reads.
- Do not prefix these variables with `NEXT_PUBLIC_`. The token stays on the server.

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000). The root URL redirects to `/pt`. Use the header switcher to go to `/en`.

Other commands:

```bash
npm run lint
npm run build
npm start
npx tsc --noEmit
```

## What the site shows

- **Home** (`/pt`, `/en`): albums with `featured = true` in Hygraph.
- **Album** (`/pt/album/[slug]`): cover, rating, review, federated MusicBrainz tracks, and artist details.

Only **published** content appears on the public API. After you attach a cover or image, publish both the Asset and the entry. Without a published `musicBrainzReleaseId`, the tracklist does not load.

Schema details: [docs/hygraph-schema.md](docs/hygraph-schema.md). Query flow: [docs/architecture.md](docs/architecture.md).
