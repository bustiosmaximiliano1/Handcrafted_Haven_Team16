import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/actions/auth-actions";
import { prisma } from "@/lib/prisma";
import NavbarSearch from "./NavbarSearch";
import styles from "./Navbar.module.css";

export default async function Navbar() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const user = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        include: {
          cart: {
            include: {
              items: {
                select: {
                  quantity: true,
                },
              },
            },
          },
        },
      })
    : null;
  const isAuthenticated = Boolean(user);
  const isArtisan = user?.role === "ARTISAN";
  const isAdmin = user?.role === "ADMIN";
  const canShop = isAuthenticated && !isAdmin;
  const cartItemCount = user?.cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Handcrafted Haven, home">
          <Image
            src="/crane-logo.svg"
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
          <Link href="/auth/register/artisan">Become a seller</Link>

          {isArtisan && (
            <>
              <Link href="/dashboard/artisan/products">My Products</Link>
              <Link href="/dashboard/artisan/products/profile">Profile</Link>
              <Link href="/dashboard/customer/orders">Orders</Link>
              <Link href="/dashboard/customer/cart">Cart</Link>
            </>
          )}

          {isAdmin && <Link href="/dashboard/admin/products">Admin Panel</Link>}

          {!isArtisan && !isAdmin && isAuthenticated && (
            <>
              <Link href="/dashboard/customer">Dashboard</Link>
              <Link href="/dashboard/customer/orders">Orders</Link>
              <Link href="/dashboard/customer/cart">Cart</Link>
              <Link href="/dashboard/customer/profile">Profile</Link>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          {canShop && (
            <Link href="/cart" className={styles.cartButton} aria-label={`Cart with ${cartItemCount} items`}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.cartIcon}>
                <path
                  d="M7 4a1 1 0 0 0 0 2h1l1.2 6.1a2 2 0 0 0 2 1.6h6.5a2 2 0 0 0 2-1.5L21 8H10.3l-.3-2A2 2 0 0 0 8 4H7Zm5 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                  fill="currentColor"
                />
              </svg>
              {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
            </Link>
          )}

          <NavbarSearch />

          {isAuthenticated ? (
            <form action={logoutAction}>
              <button type="submit" className={styles.authLinkButton}>
                Logout
              </button>
            </form>
          ) : (
            <Link href="/auth/login" className={styles.authLink}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
