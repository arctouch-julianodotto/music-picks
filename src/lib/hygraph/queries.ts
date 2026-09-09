import { gql } from "graphql-request";
import { hygraphLocales, type Locale } from "@/i18n/config";
import { getHygraphClient } from "./client";
import type { Album, FeaturedAlbum } from "./types";

const featuredAlbumFields = gql`
  title
  slug
  releaseYear
  rating
  review {
    raw
  }
  cover {
    url
  }
  artist {
    name
    slug
  }
`;

const GET_FEATURED_ALBUMS = gql`
  query GetFeaturedAlbums($locales: [Locale!]!) {
    albums(where: { featured: true }, locales: $locales) {
      ${featuredAlbumFields}
    }
  }
`;

const GET_ALBUMS = gql`
  query GetAlbums($locales: [Locale!]!) {
    albums(locales: $locales) {
      ${featuredAlbumFields}
    }
  }
`;

const GET_ALBUM_BY_SLUG = gql`
  query GetAlbumBySlug($slug: String!, $locales: [Locale!]!) {
    album(where: { slug: $slug }, locales: $locales) {
      title
      slug
      releaseYear
      rating
      featured
      review {
        raw
      }
      cover {
        url
      }
      artist {
        name
        slug
        bio {
          raw
        }
        image {
          url
        }
      }
      musicBrainzReleaseId
      musicBrainzRelease {
        title
        media {
          title
          position
          tracks {
            position
            title
            length
            recording {
              title
            }
          }
        }
      }
    }
  }
`;

type FeaturedAlbumsResponse = {
  albums: FeaturedAlbum[];
};

type AlbumBySlugResponse = {
  album: Album | null;
};

export async function getFeaturedAlbums(
  locale: Locale,
): Promise<FeaturedAlbum[]> {
  const data = await getHygraphClient().request<FeaturedAlbumsResponse>(
    GET_FEATURED_ALBUMS,
    { locales: hygraphLocales[locale] },
  );
  return data.albums;
}

export async function getAlbums(locale: Locale): Promise<FeaturedAlbum[]> {
  const data = await getHygraphClient().request<FeaturedAlbumsResponse>(
    GET_ALBUMS,
    { locales: hygraphLocales[locale] },
  );
  return data.albums;
}

export async function getAlbumBySlug(
  slug: string,
  locale: Locale,
): Promise<Album | null> {
  const data = await getHygraphClient().request<AlbumBySlugResponse>(
    GET_ALBUM_BY_SLUG,
    { slug, locales: hygraphLocales[locale] },
  );
  return data.album;
}
