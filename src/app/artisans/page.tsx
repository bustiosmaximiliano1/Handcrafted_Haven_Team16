import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ArtisanCard from "@/components/ArtisanCard/ArtisanCard";
import { prisma } from "@/lib/prisma";

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
      <main style={{ maxWidth: "1200px", margin: "2.5rem auto", padding: "0 1.5rem" }}>
        <header style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <h1 className="page-title">Meet Our Artisans</h1>
          <p className="section-subtitle">
            Discover the talented creators behind our handcrafted items and read their stories.
          </p>
        </header>

        {artisans.length === 0 ? (
          <p className="section-subtitle" style={{ textAlign: "center" }}>
            No artisans found at the moment.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
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
