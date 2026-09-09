export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeLabels: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

/** Hygraph Locale enum values, preferred first, then fallback. */
export const hygraphLocales: Record<Locale, string[]> = {
  pt: ["pt_BR", "en"],
  en: ["en", "pt_BR"],
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value: string | string[] | undefined): Locale {
  const locale = Array.isArray(value) ? value[0] : value;
  return locale && isLocale(locale) ? locale : defaultLocale;
}
