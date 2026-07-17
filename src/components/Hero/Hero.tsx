import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>A marketplace for independent makers</p>

          <h1 id="hero-title" className={styles.title}>
            Objects with a maker&rsquo;s{" "}
            <em className={styles.accent}>fingerprints</em> on them.
          </h1>

          <p className={styles.sub}>
            Browse ceramics, textiles, jewelry, and woodwork made by hand — then
            buy directly from the artisan who made the piece.
          </p>

          <div className={styles.buttons}>
            <a href="/products" className={styles.primary}>
              Explore the catalog
            </a>
            <a href="/sellers" className={styles.secondary}>
              Meet the makers
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          {/*
            Placeholder image block. Replace with a real photo later using
            next/image, e.g.:
            <Image src="/hero.jpg" alt="An artisan glazing a ceramic bowl" ... />
          */}
          <div className={styles.imageCard} role="img" aria-label="A potter shaping clay on a wheel">
            <span className={styles.imageHint} aria-hidden="true">
              your product photo
            </span>
          </div>

          {/* Signature element: a small letterpress-style "handmade" seal */}
          <div className={styles.seal} aria-hidden="true">
            <svg viewBox="0 0 120 120" width="96" height="96">
              <circle
                cx="60"
                cy="60"
                r="56"
                fill="var(--ochre)"
              />
              <circle
                cx="60"
                cy="60"
                r="47"
                fill="none"
                stroke="var(--paper)"
                strokeWidth="1.5"
                strokeDasharray="2 4"
              />
              <text
                x="60"
                y="52"
                textAnchor="middle"
                fill="var(--paper)"
                fontFamily="var(--font-display)"
                fontSize="17"
                fontStyle="italic"
              >
                Hand
              </text>
              <text
                x="60"
                y="74"
                textAnchor="middle"
                fill="var(--paper)"
                fontFamily="var(--font-display)"
                fontSize="17"
                fontStyle="italic"
              >
                made
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
