import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtistInfo } from "@/components/ArtistInfo/ArtistInfo";
import { Rating } from "@/components/Rating/Rating";
import { RichText } from "@/components/RichText/RichText";
import { TrackList } from "@/components/TrackList/TrackList";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/config";
import { getAlbumBySlug } from "@/lib/hygraph/queries";
import { isHygraphConfigured } from "@/lib/hygraph/client";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type AlbumPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: AlbumPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return { title: "My Fav Albums" };
  }

  const dictionary = getDictionary(locale);

  if (!isHygraphConfigured()) {
    return { title: dictionary.albumFallbackTitle };
  }

  try {
    const album = await getAlbumBySlug(slug, locale);
    if (!album) {
      return { title: dictionary.albumNotFoundTitle };
    }

    return {
      title: album.title,
      description: dictionary.albumMetaDescription(
        album.title,
        album.artist.name,
      ),
    };
  } catch {
    return { title: dictionary.albumFallbackTitle };
  }
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale) || !isHygraphConfigured()) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const album = await getAlbumBySlug(slug, locale);

  if (!album) {
    notFound();
  }

  const media = (album.musicBrainzRelease?.media ?? []).filter(
    (disc) => (disc.tracks?.length ?? 0) > 0,
  );

  return (
    <main className={styles.main}>
      <article className={styles.album}>
        <div className={styles.cover}>
          {album.cover?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={album.cover.url}
              alt={dictionary.coverAlt(album.title)}
            />
          ) : (
            <div className={styles.placeholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.content}>
          <p className={styles.kicker}>{album.artist.name}</p>
          <h1 className={styles.title}>{album.title}</h1>
          <p className={styles.year}>{album.releaseYear}</p>
          <Rating
            value={album.rating}
            label={dictionary.ratingLabel(album.rating)}
          />

          {album.review ? (
            <section className={styles.review}>
              <h2 className={styles.reviewTitle}>{dictionary.reviewTitle}</h2>
              <RichText content={album.review} />
            </section>
          ) : null}
        </div>
      </article>

      {media.length > 0 ? (
        <TrackList
          media={media}
          heading={dictionary.tracksTitle}
          discTitle={dictionary.discTitle}
        />
      ) : album.musicBrainzReleaseId ? (
        <p className={styles.emptyTracks}>{dictionary.emptyTracks}</p>
      ) : null}

      <ArtistInfo
        artist={album.artist}
        heading={dictionary.aboutArtist}
        emptyBio={dictionary.noBio}
      />
    </main>
  );
}
