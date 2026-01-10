import Background from "@/components/background";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    Home,
    About,
    Projects,
    Contact,
    Experience,
} from "@/components/sections";

export default function Page() {

    return (
        <div>
            <Navbar />

            <main className="relative z-10">
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
        </div>
    );
}
