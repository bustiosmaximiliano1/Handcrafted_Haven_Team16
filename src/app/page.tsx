import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import Values from "@/components/Values/Values";
import CtaBanner from "@/components/CtaBanner/CtaBanner";

// The home page. Navbar, <main>, and Footer are provided by the root layout,
// so this page just returns its sections.
export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <Values />
      <CtaBanner />
    </>
  );
}
