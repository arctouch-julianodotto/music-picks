# Hygraph schema

The project expects two models and a one-to-many relationship.

```text
┌──────────────┐
│    Artist    │
├──────────────┤
│ name         │
│ slug         │
│ bio          │
│ image        │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│    Album     │
├──────────────┤
│ title        │
│ slug         │
│ releaseYear  │
│ rating       │
│ review       │
│ cover        │
│ featured     │
│ artist       │
└──────────────┘
```

## Artist

| Field | Type | Notes |
| --- | --- | --- |
| `name` | String | Required |
| `slug` | String | Required, unique |
| `bio` | Rich Text | Optional |
| `image` | Asset | Optional |

## Album

| Field | Type | Notes |
| --- | --- | --- |
| `title` | String | Required |
| `slug` | String | Required, unique |
| `releaseYear` | Integer | Required |
| `rating` | Integer | Required |
| `review` | Rich Text | Optional |
| `cover` | Asset | Required |
| `featured` | Boolean | Required, default `false`. Home shows only `featured = true`. |
| `artist` | Reference → Artist | Required |

## Relationship

```text
Artist 1 → N Album
```

One artist can have many albums. Each album belongs to one artist.

## Content stages

The frontend reads the Content API default stage, which should be **PUBLISHED**.

Draft entries stay in Hygraph until they are published. That is how the project demonstrates DRAFT vs PUBLISHED without making Draft the source of truth for the public site.

## GraphQL names

Hygraph usually generates:

- `albums(where: { featured: true })`
- `album(where: { slug: $slug })`

If the generated API names differ, update `src/lib/hygraph/queries.ts` to match the schema.
