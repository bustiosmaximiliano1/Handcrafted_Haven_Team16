import Link from "next/link";

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
    <div className="surface-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem", padding: "1.25rem" }}>
      <div>
        {artisan.profileImageUrl ? (
          <img
            src={artisan.profileImageUrl}
            alt={`Portrait of ${artisan.name || "artisan"}`}
            style={{ width: "72px", height: "72px", borderRadius: "999px", objectFit: "cover", marginBottom: "0.85rem", border: "1px solid var(--line)" }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{ width: "72px", height: "72px", borderRadius: "999px", marginBottom: "0.85rem", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontWeight: 700, color: "var(--ink-soft)", background: "var(--paper-soft)" }}
          >
            {fallbackInitial}
          </div>
        )}

        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>
          {artisan.name || "Anonymous Artisan"}
        </h2>
        <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
          {artisan.productCount} {artisan.productCount === 1 ? "Product" : "Products"} available
        </p>
      </div>

      <Link
        href={`/artisans/${artisan.id}/profile`}
        className="button button--primary"
        style={{ width: "100%" }}
      >
        View Profile & Story
      </Link>
    </div>
  );
}
