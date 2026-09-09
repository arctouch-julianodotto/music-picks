"use client";

import { useParams } from "next/navigation";
import { resolveLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import styles from "./page.module.css";

export default function NotFoundPage() {
  const params = useParams();
  const dictionary = getDictionary(resolveLocale(params.locale));

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{dictionary.notFoundTitle}</h1>
      <p className={styles.description}>{dictionary.notFoundDescription}</p>
    </main>
  );
}
