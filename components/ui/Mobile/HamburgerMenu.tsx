interface HamburgerMenuProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function HamburgerMenu({ isOpen, onClick }: HamburgerMenuProps) {
    return (
        <button
            onClick={onClick}
            className="relative w-8 h-8 flex flex-col justify-center items-center cursor-pointer z-50"
            aria-label="Toggle menu"
        >
            <span 
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`}
            />
            <span 
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <span 
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`}
            />
        </button>
    );
}