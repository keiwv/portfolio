import dynamic from "next/dynamic";
import MobileNavItem from "./MobileNavItem";

const GlassSurface = dynamic(() => import("../GlassSurface"), {
    ssr: false,
});

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    navItems: { label: string; href: string }[];
}

export default function MobileSidebar({ isOpen, onClose, navItems }: MobileSidebarProps) {
    return (
        <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
            isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}>
            
            
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <GlassSurface
                    width="100%"
                    height="100%"
                    redOffset={15}
                    greenOffset={10}
                    blueOffset={5}
                    className="h-full"
                    displace={2}
>
                    <div className="absolute inset-0 flex flex-col pt-20 pointer-events-auto">

                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={onClose}
                                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                                aria-label="Close menu"
                            >
                            </button>
                        </div>

                        <div className="flex flex-col">
                            {navItems.map((item, index) => (
                                <MobileNavItem 
                                    key={index} 
                                    item={item} 
                                    onClick={onClose}
                                />
                            ))}
                        </div>
                    </div>
                </GlassSurface>
            </div>
        </div>
    );
}