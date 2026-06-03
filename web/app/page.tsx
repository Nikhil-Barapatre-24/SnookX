import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeTicker from "./components/MarqueeTicker";
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
        <MarqueeTicker />
        <GamesSection />
        <Gallery />
        <FindUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
