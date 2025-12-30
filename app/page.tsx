import Background from "@/components/background";
import Navbar from "@/components/layout/navbar";
import { Home, About, Projects, Contact } from "./sections";

export default function Page() {
  return (
    <div>
      <Navbar />
      <Background />

      <main className="relative z-10">
          <Home />
          <About />
          <Projects />
          <Contact />
        
      </main>
    </div>
  );
}
