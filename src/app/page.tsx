import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import Values from "@/components/Values/Values";
import CtaBanner from "@/components/CtaBanner/CtaBanner";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      {/* Keyboard users can skip navigation and jump to the content */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Categories />
        <HowItWorks />
        <Values />
        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
