import Link from "next/link";
import styles from "@/app/page.module.css";

interface ArtisanCardProps {
  artisan: {
    id: string;
    name: string | null;
    productCount: number;
  };
}

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <div
      className={styles.card}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 className={styles.label} style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>
          {artisan.name || "Anonymous Artisan"}
        </h2>
        <p className={styles.subtitle} style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
          {artisan.productCount} {artisan.productCount === 1 ? "Product" : "Products"} available
        </p>
      </div>

      <Link
        href={`/artisans/${artisan.id}/profile`}
        className={styles.submitBtn}
        style={{
          display: "inline-block",
          textAlign: "center",
          textDecoration: "none",
          padding: "0.65rem 1rem",
          fontSize: "0.95rem",
          backgroundColor: "var(--pine, #33503f)",
          color: "var(--paper, #ffffff)",
        }}
      >
        View Profile & Story
      </Link>
    </div>
  );
}
