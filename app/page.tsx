import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    Home,
    Stack,
    Projects,
    Experience,
    About,
    Contact,
} from "@/components/sections";

export default function Page() {
    return (
        <div id="top" className="min-h-screen-safe overflow-x-clip">
            <Navbar />

            <main>
                <Home />
                <Stack />
                <Projects />
                <Experience />
                <About />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}
