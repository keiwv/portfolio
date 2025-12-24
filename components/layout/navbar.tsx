"use client";

import Button from "../ui/button";
import { navData } from "@/lib/data";

export default function Navbar() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="flex justify-center items-center">
        <div className="flex gap-4 px-4 py-2 rounded-lg backdrop-blur-md border border-white/5">
          {navData.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleScroll(item.id)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
