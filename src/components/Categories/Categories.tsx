import Link from "next/link";
import styles from "./Categories.module.css";

// Craft categories. Later these link to a filtered catalog view.
const categories = [
  {
    name: "Ceramics",
    blurb: "Bowls, mugs, and vessels thrown and glazed by hand.",
    href: "/products?category=ceramics",
    icon: (
      <path
        d="M6 9c0 5 2.5 11 6 11s6-6 6-11c0-1.5-2.7-2.5-6-2.5S6 7.5 6 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    ),
  },
  {
    name: "Textiles",
    blurb: "Woven, knitted, and dyed goods with real texture.",
    href: "/products?category=textiles",
    icon: (
      <>
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    name: "Jewelry",
    blurb: "Small metalwork and stones, one piece at a time.",
    href: "/products?category=jewelry",
    icon: (
      <path
        d="M12 5l4 4-4 10-4-10 4-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "Woodwork",
    blurb: "Turned, carved, and joined pieces built to last.",
    href: "/products?category=woodwork",
    icon: (
      <path
        d="M4 16l9-9 4 4-9 9H4v-4Zm9-9l3-3 4 4-3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function Categories() {
  return (
    <section className={styles.section} aria-labelledby="cat-title">
      <div className="container">
        <div className={styles.head}>
          <h2 id="cat-title" className={styles.title}>
            Browse by craft
          </h2>
          <p className={styles.lead}>
            Four traditions, hundreds of makers. Start wherever your eye lands.
          </p>
        </div>

        <ul className={styles.grid}>
          {categories.map((c) => (
            <li key={c.name}>
              <Link href={c.href} className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="28" height="28">
                    {c.icon}
                  </svg>
                </span>
                <h3 className={styles.cardTitle}>{c.name}</h3>
                <p className={styles.blurb}>{c.blurb}</p>
                <span className={styles.link} aria-hidden="true">
                  Browse {c.name.toLowerCase()} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
