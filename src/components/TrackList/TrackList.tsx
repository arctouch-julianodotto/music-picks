import type { Dictionary } from "@/i18n/dictionary";
import type { MusicBrainzMedia, MusicBrainzTrack } from "@/lib/hygraph/types";
import styles from "./TrackList.module.css";

type TrackListProps = {
  media: MusicBrainzMedia[];
  heading: string;
  discTitle: Dictionary["discTitle"];
};

function formatLength(length?: number | null): string | null {
  if (!length || length <= 0) {
    return null;
  }

  const totalSeconds = Math.round(length / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function trackTitle(track: MusicBrainzTrack): string {
  return track.title?.trim() || track.recording?.title?.trim() || "—";
}

export function TrackList({ media, heading, discTitle }: TrackListProps) {
  const showDiscHeadings = media.length > 1;

  return (
    <section className={styles.section} aria-labelledby="tracks-heading">
      <h2 id="tracks-heading" className={styles.heading}>
        {heading}
      </h2>

      {media.map((disc, index) => {
        const tracks = disc.tracks ?? [];
        const position = disc.position ?? index + 1;

        return (
          <div key={`${position}-${disc.title ?? index}`} className={styles.disc}>
            {showDiscHeadings ? (
              <h3 className={styles.discTitle}>
                {discTitle(position, disc.title)}
              </h3>
            ) : null}

            <ol className={styles.list}>
              {tracks.map((track, trackIndex) => {
                const length = formatLength(track.length);
                const number = track.position ?? trackIndex + 1;

                return (
                  <li
                    key={`${number}-${trackTitle(track)}`}
                    className={styles.track}
                  >
                    <span className={styles.number}>{number}</span>
                    <span className={styles.title}>{trackTitle(track)}</span>
                    {length ? (
                      <span className={styles.length}>{length}</span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </section>
  );
}
