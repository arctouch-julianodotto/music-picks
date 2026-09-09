import Link from "next/link";
import { Rating } from "@/components/Rating/Rating";
import type { Locale } from "@/i18n/config";
import type { FeaturedAlbum } from "@/lib/hygraph/types";
import styles from "./AlbumCard.module.css";

type AlbumCardProps = {
  album: FeaturedAlbum;
  locale: Locale;
  coverAlt: string;
};

export function AlbumCard({ album, locale, coverAlt }: AlbumCardProps) {
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
          <h2 className={styles.title}>{album.title}</h2>
          <p className={styles.artist}>{album.artist.name}</p>
          <p className={styles.meta}>{album.releaseYear}</p>
          <Rating value={album.rating} />
        </div>
      </Link>
    </article>
  );
}
