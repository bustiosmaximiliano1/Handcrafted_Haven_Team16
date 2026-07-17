import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader/PageHeader";
import StubNotice from "@/components/StubNotice/StubNotice";
import {
  getProductById,
  getSellerById,
  formatPrice,
} from "@/lib/placeholder-data";

/**
 * Product detail page — SCAFFOLDED.
 *
 * The routing and data lookup already work (try /products/p1). The header
 * shows the real product from mock data, so the routing is proven. What's
 * left is the full detail layout + the reviews section, listed below.
 *
 * Note: in Next.js 15/16 `params` is a Promise, so the component is async
 * and awaits it.
 */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  // If the id doesn't exist, show the 404 page.
  if (!product) notFound();

  const seller = getSellerById(product.sellerId);

  return (
    <>
      <PageHeader
        title={product.title}
        subtitle={`${formatPrice(product.price)} · by ${seller?.name ?? "Unknown maker"}`}
      />

      <StubNotice
        story="As a user, I want to see a product's detail page (with its reviews)."
        todo={[
          "Show the product image, full description, price, and seller link",
          "List the reviews for this product (getReviewsForProduct)",
          "Show the average rating with the StarRating component",
          "Add the 'leave a review' form (its own user story)",
          "Later: fetch the product from the database instead of mock data",
        ]}
      />
    </>
  );
}
