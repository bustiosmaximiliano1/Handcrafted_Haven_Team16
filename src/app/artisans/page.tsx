import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ArtisanCard from "@/components/ArtisanCard/ArtisanCard";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function ArtisansListPage() {
  const artisans = await prisma.user.findMany({
    where: { role: "ARTISAN" },
    select: {
      id: true,
      name: true,
      profileImageUrl: true,
      email: true,
      createdAt: true,
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className="page-title">Meet Our Artisans</h1>
          <p className="section-subtitle">
            Discover the talented creators behind our handcrafted items and read their stories.
          </p>
        </header>

        {artisans.length === 0 ? (
          <p className={`section-subtitle ${styles.empty}`}>
            No artisans found at the moment.
          </p>
        ) : (
          <div className={styles.grid}>
            {artisans.map((artisan) => (
              <ArtisanCard
                key={artisan.id}
                artisan={{
                  id: artisan.id,
                  name: artisan.name,
                  profileImageUrl: artisan.profileImageUrl,
                  productCount: artisan._count.products,
                }}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
