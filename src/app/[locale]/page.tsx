import { AlbumCard } from "@/components/AlbumCard/AlbumCard";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/config";
import { getFeaturedAlbums } from "@/lib/hygraph/queries";
import { isHygraphConfigured } from "@/lib/hygraph/client";
import type { FeaturedAlbum } from "@/lib/hygraph/types";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  if (!isHygraphConfigured()) {
    return (
      <main className={styles.main}>
        <Hero title={dictionary.heroTitle} />
        <p className={styles.state}>{dictionary.hygraphMissing}</p>
      </main>
    );
  }

  let albums: FeaturedAlbum[] = [];
  let hasError = false;

  try {
    albums = await getFeaturedAlbums(locale);
  } catch {
    hasError = true;
  }

  return (
    <main className={styles.main}>
      <Hero title={dictionary.heroTitle} />

      {hasError ? (
        <p className={styles.state}>{dictionary.loadError}</p>
      ) : albums.length === 0 ? (
        <p className={styles.state}>{dictionary.emptyFeatured}</p>
      ) : (
        <section className={styles.section} aria-labelledby="featured-heading">
          <h2 id="featured-heading" className={styles.sectionTitle}>
            {dictionary.featuredHeading}
          </h2>
          <div className={styles.list}>
            {albums.map((album) => (
              <AlbumCard
                key={album.slug}
                album={album}
                locale={locale}
                coverAlt={dictionary.coverAlt(album.title)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Hero({ title }: { title: string }) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{title}</h1>
    </section>
  );
}
