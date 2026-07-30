import styles from "./StarRating.module.css";

interface StarRatingProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

function getFillLevel(value: number, starIndex: number) {
  if (value >= starIndex) {
    return 1;
  }

  if (value >= starIndex - 0.5) {
    return 0.5;
  }

  return 0;
}

export default function StarRating({ value, max = 5, label, showValue = true }: StarRatingProps) {
  const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(max, value)) : 0;
  const roundedValue = Math.round(safeValue * 10) / 10;

  return (
    <div className={styles.rating} aria-label={label ?? `Rated ${roundedValue} out of ${max}`}>
      <span className={styles.stars} aria-hidden="true">
        {Array.from({ length: max }, (_, index) => {
          const starFill = getFillLevel(safeValue, index + 1);

          return (
            <span
              key={index}
              className={styles.star}
              style={{ ["--fill" as string]: `${starFill * 100}%` }}
            >
              ★
            </span>
          );
        })}
      </span>

      {showValue && <span className={styles.value}>{roundedValue.toFixed(1)}/5</span>}
    </div>
  );
}