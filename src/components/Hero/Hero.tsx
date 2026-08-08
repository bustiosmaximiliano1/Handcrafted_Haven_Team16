import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

const heroImageUrl =
  "https://images.unsplash.com/photo-1635184549784-90a9f799d68d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image
        src={heroImageUrl}
        alt="Modern handcrafted products displayed in a minimalist studio"
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />
      <span className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={styles.contentPanel}>
          <p className={styles.eyebrow}>Handcrafted Haven</p>
          <h1 id="hero-title" className={styles.title}>
            Modern craft. Timeless pieces.
          </h1>
          <p className={styles.sub}>
            Discover curated handmade work from independent artisans.
          </p>

          <div className={styles.buttons}>
            <Link href="/products" className="button button--light">
              Shop collection
            </Link>
            <Link href="/artisans" className="button button--light">
              Meet artisans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
