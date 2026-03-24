import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Modules from "@/components/modules";
import Schedule from "@/components/schedule";
import TrainingDetails from "@/components/training-details";
import Outcomes from "@/components/outcomes";
import Footer from "@/components/footer";
import ScrollAnimations from "@/components/scroll-animations";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <main>
        <Hero />
        <About />
        <Modules />
        <Schedule />
        <TrainingDetails />
        <Outcomes />
      </main>
      <Footer />
    </>
  );
}
