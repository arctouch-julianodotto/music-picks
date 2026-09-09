import styles from "./Rating.module.css";

type RatingProps = {
  value: number;
};

export function Rating({ value }: RatingProps) {
  return (
    <p className={styles.rating}>
      <span className={styles.label}>Nota</span>
      <span className={styles.value}>{value}</span>
    </p>
  );
}
