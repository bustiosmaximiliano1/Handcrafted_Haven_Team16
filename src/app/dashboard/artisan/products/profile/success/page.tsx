import Link from "next/link";
import styles from "@/app/page.module.css";

export default function ArtisanProfileSuccessPage() {
  return (
    <div className={styles.container} style={{ maxWidth: "600px", margin: "4rem auto", padding: "2rem" }}>
      <section className={`${styles.card} surface-card`}>
        <span className={styles.badge}>Success</span>
        <h1 className={styles.title} style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Your changes have been saved successfully.
        </h1>
        <p className={`${styles.subtitle} text-muted`} style={{ marginBottom: "2rem" }}>
          Your artisan profile has been updated and is ready for customers to see.
        </p>

        <Link
              href="/dashboard/artisan/products"
          className={`${styles.submitBtn} button button--primary`}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
        >
          Return to Dashboard
        </Link>
      </section>
    </div>
  );
}
