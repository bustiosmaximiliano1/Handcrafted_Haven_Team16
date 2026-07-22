import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
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
        <Link href="/" className={styles.logo} aria-label="Handcrafted Haven, home">
          <Image
            src="/icon.svg"
            alt=""
            aria-hidden="true"
            width={22}
            height={22}
            className={styles.logoIcon}
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link href="/products">Products</Link>
          <Link href="/artisans">Artisans</Link>
          <Link href="/register/artisan">Become a seller</Link>

          {isArtisan && (
            <>
              <Link href="/artisan/products">My Products</Link>
              <Link href="/artisan/products/profile">Profile</Link>
            </>
          )}

          {isAdmin && <Link href="/admin/products">Admin Panel</Link>}

          {!isArtisan && !isAdmin && isAuthenticated && (
            <>
              <Link href="/customer">Dashboard</Link>
              <Link href="/customer/orders">Orders</Link>
              <Link href="/customer/cart">Cart</Link>
              <Link href="/customer/profile">Profile</Link>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <form action={logoutAction}>
              <button type="submit" className={styles.authLinkButton}>
                Logout
              </button>
            </form>
          ) : (
            <Link href="/login" className={styles.authLink}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
