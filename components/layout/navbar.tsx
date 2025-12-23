import Button from "../ui/button";
import { navData } from "@/lib/data";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-4">
            <div className="flex space-x-6">
                {navData.map((item) => (
                    <Button key={item.name}>{item.name}</Button>
                ))}
            </div>
        </nav>
    );
}
