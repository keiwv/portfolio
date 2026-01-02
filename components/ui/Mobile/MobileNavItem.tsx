interface MobileNavItemProps {
    item: { label: string; href: string };
    onClick: () => void;
}

export default function MobileNavItem({ item, onClick }: MobileNavItemProps) {
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
            className="w-full text-left py-4 px-6 text-white hover:text-blue-300 transition-colors duration-200 text-lg font-medium border-b border-white/10 last:border-b-0"
        >
            {item.label}
        </button>
    );
}