import styles from "./StarRating.module.css";

interface StarRatingProps {
  /** Average rating, 0 to 5. */
  value: number;
  /** Optional number of reviews to show next to the stars. */
  count?: number;
}

/**
 * Presentational only — it just displays a rating, it does not collect one.
 * Collecting a rating (the review form) is a separate user story.
 */
export default function StarRating({ value, count }: StarRatingProps) {
  const rounded = Math.round(value);
  const label =
    count === 0
      ? "No reviews yet"
      : `Rated ${value.toFixed(1)} out of 5`;

  return (
    <span className={styles.wrap} aria-label={label}>
      <span className={styles.stars} aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} viewBox="0 0 24 24" width="16" height="16">
            <path
              d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 21.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z"
              fill={i <= rounded ? "var(--ochre)" : "none"}
              stroke="var(--ochre)"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </span>
      {typeof count === "number" && (
        <span className={styles.count}>
          {count > 0 ? `${value.toFixed(1)} (${count})` : "No reviews"}
        </span>
      )}
    </span>
  );
}
