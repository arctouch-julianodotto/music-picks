import { Fraunces, Geist } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageSwitch } from "@/components/LanguageSwitch/LanguageSwitch";
import { getDictionary } from "@/i18n/dictionary";
import { htmlLang, isLocale } from "@/i18n/config";
import "@/styles/globals.css";
import styles from "./layout.module.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    description: getDictionary(locale).siteDescription,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <html lang={htmlLang[locale]}>
      <body className={`${geistSans.variable} ${fraunces.variable}`}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <Link className={styles.brand} href={`/${locale}`}>
              My Fav Albums
            </Link>
            <LanguageSwitch locale={locale} label={dictionary.languageNav} />
          </header>
          {children}
          <footer className={styles.footer}>
            Hygraph Project Certification by Juliano Dotto
          </footer>
        </div>
      </body>
    </html>
  );
}
