import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ArtisanProfile from "@/components/ArtisanProfile/ArtisanProfile";
import { prisma } from "@/lib/prisma";

interface ArtisanProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtisanProfilePage({ params }: ArtisanProfilePageProps) {
  const { id } = await params;

  const artisan = await prisma.user.findFirst({
    where: {
      id,
      role: "ARTISAN",
    },
    include: {
      products: {
        include: {
          category: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!artisan) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <ArtisanProfile artisan={artisan} />
      </main>
      <Footer />
    </>
  );
}