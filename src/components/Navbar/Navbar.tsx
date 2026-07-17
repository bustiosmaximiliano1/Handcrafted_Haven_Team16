import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo} aria-label="Handcrafted Haven, home">
          <span className={styles.mark} aria-hidden="true">
            ✿
          </span>
          Handcrafted&nbsp;Haven
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <a href="/products">Shop</a>
          <a href="/sellers">Artisans</a>
          <a href="/about">About</a>
        </nav>

        <div className={styles.actions}>
          <a href="/login" className={styles.signIn}>
            Sign in
          </a>
          <a href="/register" className={styles.cta}>
            Become a seller
          </a>
        </div>
      </div>
    </header>
  );
}
