import { RichText } from "@/components/RichText/RichText";
import type { Artist } from "@/lib/hygraph/types";
import styles from "./ArtistInfo.module.css";

type ArtistInfoProps = {
  artist: Artist;
  heading: string;
  emptyBio: string;
};

export function ArtistInfo({ artist, heading, emptyBio }: ArtistInfoProps) {
  return (
    <section className={styles.section} aria-labelledby="artist-heading">
      <h2 id="artist-heading" className={styles.heading}>
        {heading}
      </h2>
      <div className={styles.layout}>
        <div className={styles.image}>
          {artist.image?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={artist.image.url} alt={artist.name} />
          ) : (
            <div className={styles.placeholder} aria-hidden="true" />
          )}
        </div>
        <div className={styles.copy}>
          <h3 className={styles.name}>{artist.name}</h3>
          {artist.bio ? (
            <RichText content={artist.bio} />
          ) : (
            <p className={styles.empty}>{emptyBio}</p>
          )}
        </div>
      </div>
    </section>
  );
}
