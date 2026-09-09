import { RichText as HygraphRichText } from "@graphcms/rich-text-react-renderer";
import type { HygraphRichText as HygraphRichTextValue } from "@/lib/hygraph/types";
import styles from "./RichText.module.css";

type RichTextProps = {
  content?: HygraphRichTextValue | null;
};

export function RichText({ content }: RichTextProps) {
  if (!content?.raw) {
    return null;
  }

  return (
    <div className={styles.richText}>
      <HygraphRichText content={content.raw} />
    </div>
  );
}
