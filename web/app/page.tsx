import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GamesSection from "./components/GamesSection";
import Gallery from "./components/Gallery";
import FindUs from "./components/FindUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <GamesSection />
        <Gallery />
        <FindUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
