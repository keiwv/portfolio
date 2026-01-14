import Background from "@/components/background";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundToggle from "@/components/ui/BackgroundToggle";
import ClientWrapper from "@/components/ClientWrapper";
import {
    Home,
    About,
    Projects,
    Contact,
    Experience,
} from "@/components/sections";

export default function Page() {
  return (
    <ClientWrapper>
      <div className="min-h-screen-safe flex flex-col relative overflow-x-hidden">
        <Navbar />

        <main className="relative z-10 flex-1 overflow-x-hidden">
          <section id="home">
            <Home />
          </section>

          <section id="experience">
            <Experience />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </main>

        <Footer />

        <Background />
        <BackgroundToggle />
      </div>
    </ClientWrapper>
  );
}
