import styles from "./Rating.module.css";

const MAX_STARS = 5;

type RatingProps = {
  value: number;
  label: string;
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={filled ? styles.filled : styles.empty}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.4l2.7 6.4 7 .7-5.3 4.7 1.5 6.8L12 17.6 5.9 21l1.6-6.8L2.2 9.5l7-.7L12 2.4z" />
    </svg>
  );
}

export function Rating({ value, label }: RatingProps) {
  const filled = Math.min(MAX_STARS, Math.max(0, Math.round(value)));

  return (
    <p className={styles.rating} role="img" aria-label={label}>
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <Star key={index} filled={index < filled} />
      ))}
    </p>
  );
}
