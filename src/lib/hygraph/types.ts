import type { ComponentProps } from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";

export type HygraphRichText = {
  raw: ComponentProps<typeof RichText>["content"];
};

export type HygraphAsset = {
  url: string;
};

export type Artist = {
  name: string;
  slug: string;
  bio?: HygraphRichText | null;
  image?: HygraphAsset | null;
};

export type MusicBrainzRecording = {
  title?: string | null;
};

export type MusicBrainzTrack = {
  position?: number | null;
  title?: string | null;
  length?: number | null;
  recording?: MusicBrainzRecording | null;
};

export type MusicBrainzMedia = {
  title?: string | null;
  position?: number | null;
  tracks?: MusicBrainzTrack[] | null;
};

export type MusicBrainzRelease = {
  title?: string | null;
  media?: MusicBrainzMedia[] | null;
};

export type Album = {
  title: string;
  slug: string;
  releaseYear: number;
  rating: number;
  review?: HygraphRichText | null;
  cover: HygraphAsset;
  featured: boolean;
  artist: Artist;
  musicBrainzReleaseId?: string | null;
  musicBrainzRelease?: MusicBrainzRelease | null;
};

export type FeaturedAlbum = Pick<
  Album,
  "title" | "slug" | "releaseYear" | "rating" | "review" | "cover" | "artist"
>;
