import type { Locale } from "./config";

export type Dictionary = {
  heroTitle: string;
  siteDescription: string;
  featuredHeading: string;
  hygraphMissing: string;
  loadError: string;
  emptyFeatured: string;
  reviewTitle: string;
  coverAlt: (title: string) => string;
  aboutArtist: string;
  noBio: string;
  notFoundTitle: string;
  notFoundDescription: string;
  errorTitle: string;
  errorDescription: string;
  albumFallbackTitle: string;
  albumNotFoundTitle: string;
  albumMetaDescription: (title: string, artist: string) => string;
  languageNav: string;
  tracksTitle: string;
  emptyTracks: string;
  discTitle: (position: number, title?: string | null) => string;
};

const dictionaries: Record<Locale, Dictionary> = {
  pt: {
    heroTitle: "Uma pequena seleção de alguns dos meus álbuns favoritos",
    siteDescription:
      "Uma pequena seleção de alguns dos meus álbuns favoritos",
    featuredHeading: "Álbuns em destaque",
    hygraphMissing:
      "Configure HYGRAPH_ENDPOINT em .env.local para carregar os álbuns.",
    loadError: "Não foi possível carregar o conteúdo do Hygraph.",
    emptyFeatured:
      "Nenhum álbum em destaque no momento. Marque featured no Hygraph para aparecer aqui.",
    reviewTitle: "Resenha",
    coverAlt: (title) => `Capa de ${title}`,
    aboutArtist: "Sobre o artista",
    noBio: "Nenhuma biografia cadastrada no Hygraph.",
    notFoundTitle: "Página não encontrada",
    notFoundDescription:
      "Este álbum não existe ou ainda não foi publicado no Hygraph.",
    errorTitle: "Algo deu errado",
    errorDescription:
      "Não foi possível carregar esta página. Verifique a conexão com o Hygraph e tente novamente.",
    albumFallbackTitle: "Álbum",
    albumNotFoundTitle: "Álbum não encontrado",
    albumMetaDescription: (title, artist) => `${title}, de ${artist}.`,
    languageNav: "Idioma",
    tracksTitle: "Faixas",
    emptyTracks: "Nenhuma faixa disponível no MusicBrainz.",
    discTitle: (position, title) => title?.trim() || `Disco ${position}`,
  },
  en: {
    heroTitle: "A short selection of some of my favorite albums",
    siteDescription: "A short selection of some of my favorite albums",
    featuredHeading: "Featured albums",
    hygraphMissing:
      "Set HYGRAPH_ENDPOINT in .env.local to load the albums.",
    loadError: "Could not load content from Hygraph.",
    emptyFeatured:
      "No featured albums right now. Set featured in Hygraph to show them here.",
    reviewTitle: "Review",
    coverAlt: (title) => `Cover of ${title}`,
    aboutArtist: "About the artist",
    noBio: "No biography has been added in Hygraph.",
    notFoundTitle: "Page not found",
    notFoundDescription:
      "This album does not exist or has not been published in Hygraph yet.",
    errorTitle: "Something went wrong",
    errorDescription:
      "This page could not be loaded. Check the Hygraph connection and try again.",
    albumFallbackTitle: "Album",
    albumNotFoundTitle: "Album not found",
    albumMetaDescription: (title, artist) => `${title}, by ${artist}.`,
    languageNav: "Language",
    tracksTitle: "Tracks",
    emptyTracks: "No tracks available from MusicBrainz.",
    discTitle: (position, title) => title?.trim() || `Disc ${position}`,
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
