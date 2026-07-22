import Link from "next/link";
import styles from "@/app/page.module.css";

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
    <div className={styles.container} style={{ maxWidth: "600px", margin: "4rem auto", padding: "2rem" }}>
      <section className={styles.card}>
        <span className={styles.badge}>Success</span>
        <h1 className={styles.title} style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          {message}
        </h1>
        <p className={styles.subtitle} style={{ marginBottom: "2rem" }}>
          Everything is ready for the next step.
        </p>

        <Link
          href={redirectPath}
          className={styles.submitBtn}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
        >
          {buttonText}
        </Link>
      </section>
    </div>
  );
}
