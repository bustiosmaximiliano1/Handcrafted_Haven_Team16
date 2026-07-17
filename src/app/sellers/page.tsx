import PageHeader from "@/components/PageHeader/PageHeader";
import StubNotice from "@/components/StubNotice/StubNotice";

/**
 * Sellers directory — SCAFFOLDED (optional).
 *
 * The project description only requires a seller PROFILE page (/sellers/[id]),
 * not a directory. This index exists so the "Artisans" nav link resolves.
 * The team can build it out or remove it — it is not one of the ten stories.
 */
export default function SellersPage() {
  return (
    <>
      <PageHeader
        title="Artisans"
        subtitle="Meet the makers behind the pieces."
      />

      <StubNotice
        story="(Optional) A directory that links to each seller's profile."
        todo={[
          "List sellers with a link to /sellers/[id] for each",
          "Reuse the mock `sellers` data, then swap for a DB query",
          "Or remove this page if the team decides it's out of scope",
        ]}
      />
    </>
  );
}
