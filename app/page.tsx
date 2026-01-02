import Background from "@/components/background";
import Navbar from "@/components/layout/navbar";
import { Home, About, Projects, Contact, Experience } from "./sections";

export default function Page() {
  return (
    <div>
      <Navbar />

      <main className="relative z-10">
          <Home />
          <Experience />
          <Projects />
          <About />
          <Contact />
      </main>
      <Background />
    </div>
  );
}
