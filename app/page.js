import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Promotions from "./components/Promotions";
import About from "./components/About";
import Delivery from "./components/Delivery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="section-divider" />
      <Menu />
      <div className="section-divider" />
      <Promotions />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Delivery />
      <div className="section-divider" />
      <Reviews />
      <div className="section-divider" />
      <Contact />
    </main>
  );
}
