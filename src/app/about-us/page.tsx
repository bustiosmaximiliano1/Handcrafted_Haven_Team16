import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Our Story */}
        <section className={styles.section}>
          <div className="container">
            <h2>Our Story</h2>

            <p>
              Handcrafted Haven was founded with a simple vision: to create a
              marketplace where talented artisans can share their craftsmanship
              with customers who appreciate authentic handmade products. Every
              item tells a story of creativity, passion, and dedication.
            </p>
            <p>
              We believe handmade products deserve a platform that celebrates
              the people behind them. Our marketplace connects skilled artisans
              with customers looking for meaningful, high-quality creations that
              cannot be found in mass-produced goods.
            </p>
          </div>
        </section>
        {/* Mission */}
        <section className={styles.section}>
          <div className="container">
            <h2>Our Mission</h2>
            <p>
              To empower artisans by providing an accessible digital marketplace
              where they can grow their businesses while enabling customers to
              discover unique handcrafted products with confidence.
            </p>
          </div>
        </section>
        {/* Vision */}
        <section className={styles.section}>
          <div className="container">
            <h2>Our Vision</h2>
            <p>
              To become the leading destination for handcrafted goods by
              building a community that values creativity, sustainability, and
              meaningful connections between makers and buyers around the world.
            </p>
          </div>
        </section>
        {/* Core Values */}
        <section className={styles.section}>
          <div className="container">
            <h2>Our Core Values</h2>

            <div className={styles.valueGrid}>
              <article className={styles.card}>
                <h3>Creativity</h3>
                <p>
                  We celebrate originality and encourage artisans to express
                  their unique talents through every creation.
                </p>
              </article>

              <article className={styles.card}>
                <h3>Community</h3>
                <p>
                  We build meaningful relationships between artisans, customers,
                  and everyone who believes in supporting handmade
                  craftsmanship.
                </p>
              </article>

              <article className={styles.card}>
                <h3>Quality</h3>

                <p>
                  We are committed to showcasing products crafted with care,
                  attention to detail, and lasting value.
                </p>
              </article>

              <article className={styles.card}>
                <h3>Sustainability</h3>
                <p>
                  We encourage responsible production and conscious shopping to
                  help create a better future for our communities.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
