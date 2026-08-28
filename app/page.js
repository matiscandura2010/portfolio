import NavBar from '@/components/ui/NavBar';
import CursorGlow from '@/components/ui/CursorGlow';
import ScrollSplashCursor from '@/components/ui/ScrollSplashCursor';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Statement from '@/components/sections/Statement';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <CursorGlow />
      <ScrollSplashCursor />
      <NavBar />
      <main>
        <Hero />
        <About />
        <Services />
        <Statement />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
