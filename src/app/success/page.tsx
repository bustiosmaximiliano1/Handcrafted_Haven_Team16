import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

interface SuccessPageProps {
  searchParams: Promise<{
    message?: string;
    redirect?: string;
    buttonText?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const message = params.message || "Your changes have been saved successfully.";
  const redirectPath = params.redirect || "/products";
  const buttonText = params.buttonText || "Return to Dashboard";

  return (
    <>
      <Navbar />
      <main className="container" style={{ maxWidth: "760px", margin: "4.5rem auto", paddingInline: "1.5rem" }}>
        <section className="surface-card" style={{ padding: "2rem", textAlign: "center" }}>
          <span className="section-label">Success</span>

          <h1 className="page-title" style={{ marginTop: "0.8rem", marginBottom: "0.8rem" }}>
            {message}
          </h1>

          <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
            Everything is ready for the next step.
          </p>

          <Link
            href={redirectPath}
            className="button button--primary button--subtle-lift"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          >
            {buttonText}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
