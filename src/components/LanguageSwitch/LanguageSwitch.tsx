"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import styles from "./LanguageSwitch.module.css";

type LanguageSwitchProps = {
  locale: Locale;
  label: string;
};

function hrefForLocale(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = nextLocale;
  return segments.join("/") || `/${nextLocale}`;
}

export function LanguageSwitch({ locale, label }: LanguageSwitchProps) {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label={label}>
      {locales.map((item, index) => (
        <span key={item} className={styles.item}>
          {index > 0 ? (
            <span className={styles.sep} aria-hidden="true">
              /
            </span>
          ) : null}
          <Link
            className={styles.link}
            href={hrefForLocale(pathname, item)}
            hrefLang={item === "pt" ? "pt-BR" : "en"}
            lang={item === "pt" ? "pt-BR" : "en"}
            aria-current={locale === item ? "true" : undefined}
          >
            {localeLabels[item]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
