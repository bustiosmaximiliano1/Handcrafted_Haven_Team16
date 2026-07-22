import { cookies } from "next/headers";
import { logoutAction } from "@/app/login/actions";
import { prisma } from "@/lib/prisma";
import styles from "./Navbar.module.css";

export default async function Navbar() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null;
  const isAuthenticated = Boolean(user);
  const isArtisan = user?.role === "ARTISAN";
  const isAdmin = user?.role === "ADMIN";

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
          <a href="/products">Products</a>
          <a href="/artisans">Artisans</a>
          <a href="/about">About</a>

          {isArtisan && (
            <>
              <a href="/artisan/products">My Products</a>
              <a href="/artisan/products/profile">Profile</a>
            </>
          )}

          {isAdmin && <a href="/admin/products">Admin Panel</a>}

          {!isArtisan && !isAdmin && isAuthenticated && (
            <>
              <a href="/customer">Dashboard</a>
              <a href="/customer/orders">Orders</a>
              <a href="/customer/cart">Cart</a>
              <a href="/customer/profile">Profile</a>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <form action={logoutAction}>
              <button type="submit" className={styles.logoutButton}>
                Logout
              </button>
            </form>
          ) : (
            <a href="/login" className={styles.signIn}>
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
