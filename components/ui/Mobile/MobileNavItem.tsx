interface MobileNavItemProps {
    item: { label: string; href: string };
    onClick: () => void;
    isActive?: boolean;
}

export default function MobileNavItem({ item, onClick, isActive = false }: MobileNavItemProps) {
    const handleClick = () => {
        const element = document.getElementById(item.href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        onClick(); 
    };

    return (
        <button
            onClick={handleClick}
            className={`w-full max-w-xs text-left py-4 px-6 transition-colors duration-200 text-lg font-medium border-b rounded-lg border-white/10 last:border-b-0 ${
                isActive 
                    ? 'text-black bg-white' 
                    : 'text-white'
            }`}
        >
            {item.label}
        </button>
    );
}