import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader/PageHeader";
import StubNotice from "@/components/StubNotice/StubNotice";
import { getSellerById } from "@/lib/placeholder-data";

/**
 * Seller profile page — SCAFFOLDED.
 *
 * Routing + lookup already work (try /sellers/s1). The header shows the real
 * seller from mock data. What's left is the profile layout + their collection.
 */
export default async function SellerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seller = getSellerById(id);

  if (!seller) notFound();

  return (
    <>
      <PageHeader title={seller.name} subtitle={seller.story} />

      <StubNotice
        story="As a user, I want to view a seller's profile and their collection."
        todo={[
          "Show the seller's photo and full story",
          "List this seller's products using ProductCard (filter products by sellerId)",
          "Later: fetch the seller + their products from the database",
        ]}
      />
    </>
  );
}
