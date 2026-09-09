import Link from "next/link";
import { Rating } from "@/components/Rating/Rating";
import { RichText } from "@/components/RichText/RichText";
import type { Locale } from "@/i18n/config";
import type { FeaturedAlbum } from "@/lib/hygraph/types";
import styles from "./AlbumCard.module.css";

type AlbumCardProps = {
  album: FeaturedAlbum;
  locale: Locale;
  coverAlt: string;
  ratingLabel: string;
};

export function AlbumCard({
  album,
  locale,
  coverAlt,
  ratingLabel,
}: AlbumCardProps) {
  return (
    <article className={styles.card}>
      <Link className={styles.link} href={`/${locale}/album/${album.slug}`}>
        <div className={styles.cover}>
          {album.cover?.url ? (
            // Hygraph CDN hosts vary by project region.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={album.cover.url} alt={coverAlt} />
          ) : (
            <div className={styles.placeholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.headline}>
            <h2 className={styles.title}>{album.title}</h2>
            <span className={styles.sep} aria-hidden="true">
              —
            </span>
            <span className={styles.meta}>{album.releaseYear}</span>
            <span className={styles.sep} aria-hidden="true">
              —
            </span>
            <Rating value={album.rating} label={ratingLabel} />
          </div>

          <p className={styles.artist}>{album.artist.name}</p>

          {album.review ? (
            <div className={styles.excerpt}>
              <RichText content={album.review} />
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
