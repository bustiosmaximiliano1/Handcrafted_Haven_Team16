import Link from "next/link";
import styles from "../ProfilePage.module.css";

export default function ArtisanProfileSuccessPage() {
  return (
    <div className={styles.successWrap}>
      <section className={`${styles.successCard} surface-card`}>
        <span className={styles.badge}>Success</span>
        <h1 className={styles.successTitle}>
          Your changes have been saved successfully.
        </h1>
        <p className={`${styles.successSubtitle} text-muted`}>
          Your artisan profile has been updated and is ready for customers to see.
        </p>

        <Link
          href="/dashboard/artisan/products"
          className={`${styles.successButton} button button--primary`}
        >
          Return to Dashboard
        </Link>
      </section>
    </div>
  );
}
