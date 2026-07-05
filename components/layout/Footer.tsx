export default function Footer() {
    return (
        <footer className="relative z-20">
            <div className="halftone-strip w-full opacity-25" />
            <div className="border-t-[3px] border-manga-border-strong">
                <div className="bg-manga-surface py-4 px-6">
                    <p className="text-manga-text-muted text-center font-comic text-[9px] tracking-wider">
                        <span className="text-manga-accent">✦</span> Made w{" "}
                        <span className="text-manga-accent-pink animate-pulse">&hearts;</span> by{" "}
                        <span className="text-manga-text font-medium">keiwv</span>{" "}
                        <span className="text-manga-accent">✦</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
