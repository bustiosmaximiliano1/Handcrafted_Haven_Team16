import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Handcrafted Haven, home">
          <span className={styles.mark} aria-hidden="true">
            ✿
          </span>
          Handcrafted&nbsp;Haven
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link href="/products">Shop</Link>
          <Link href="/sellers">Artisans</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/login" className={styles.signIn}>
            Sign in
          </Link>
          <Link href="/register" className={styles.cta}>
            Become a seller
          </Link>
        </div>
      </div>
    </header>
  );
}
