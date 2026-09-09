"use client";

import { useParams } from "next/navigation";
import { resolveLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import styles from "./page.module.css";

export default function ErrorPage() {
  const params = useParams();
  const dictionary = getDictionary(resolveLocale(params.locale));

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{dictionary.errorTitle}</h1>
      <p className={styles.description}>{dictionary.errorDescription}</p>
    </main>
  );
}
