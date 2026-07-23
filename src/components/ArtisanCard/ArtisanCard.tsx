import Link from "next/link";
import styles from "./ArtisanCard.module.css";

interface ArtisanCardProps {
  artisan: {
    id: string;
    name: string | null;
    profileImageUrl?: string | null;
    productCount: number;
  };
}

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  const fallbackInitial = (artisan.name?.trim()?.charAt(0) || "A").toUpperCase();

  return (
    <div className={`surface-card ${styles.card}`}>
      <div>
        {artisan.profileImageUrl ? (
          <img
            src={artisan.profileImageUrl}
            alt={`Portrait of ${artisan.name || "artisan"}`}
            className={styles.avatar}
          />
        ) : (
          <div aria-hidden="true" className={styles.avatarFallback}>
            {fallbackInitial}
          </div>
        )}

        <h2 className={styles.name}>
          {artisan.name || "Anonymous Artisan"}
        </h2>
        <p className={`text-muted ${styles.meta}`}>
          {artisan.productCount} {artisan.productCount === 1 ? "Product" : "Products"} available
        </p>
      </div>

      <Link
        href={`/artisans/${artisan.id}/profile`}
        className={`button button--primary ${styles.profileButton}`}
      >
        View Profile & Story
      </Link>
    </div>
  );
}
