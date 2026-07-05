# Brayan Ivan Perez Ventura - Portfolio

> A manga-styled interactive portfolio — black ink on white paper, a living ocean scene, and a scroll-driven day-to-night transformation.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16.1-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)

## Features

### **Manga Visual Experience**
- **Ink & Paper Theme** - Comic panels with thick ink outlines, hard offset shadows, halftone screentones, speech bubbles, and sticker badges
- **Scroll-Driven Night Transition** - A black "ink tide" rises as you scroll; once it covers the screen, the entire palette inverts to white ink on black
- **Living Ocean Scene** - Canvas-drawn greyscale waves with ink contours, a rotating ink sun, and the Thousand Sunny bobbing on the front wave in perfect sync with the water
- **Character Art** - Gear 5 Luffy bounces over the hero with toon physics; a relaxing Luffy drifts through the night sky among stars, bursts, and screentone patches
- **Intro Loading Screen** - Luffy holds center stage while the page loads, then glides up to his hero position as the intro dissolves

### **Internationalization**
- **Multi-language Support** (English/Spanish) using next-intl
- **Dynamic Language Switching** with persistent preferences
- **Localized Content** for global accessibility

### **Advanced Navigation**
- **Liquid Glass Navbar** - Glassmorphism surface with a gooey ink-bullet click effect that fills the active pill
- **Intersection Observer** - Smart section detection and active state management
- **Smooth Scrolling** - Seamless transitions between sections
- **Mobile-Optimized** - Touch-friendly hamburger menu and sidebar

### **Content Sections**
- **Hero** - Name lettering with ink outlines, manga speed-lines burst, speech-bubble subtitle, and social links
- **Experience** - Manga-chapter panels (CH.01, CH.02…) in a two-column masonry layout, with a bouncing CURRENT marker over the present role
- **Projects** - Carousel of retro window-chrome cards with award stickers
- **About** - Tilted comic-panel portrait and skills marquee
- **Contact** - Speech-bubble intro and ink-panel social cards

### **Engineering Details**
- **Shared Wave Math** (`lib/waves.ts`) - One source of truth for wave geometry; the ocean canvas and the ship canvas share a global animation clock so they can never desync
- **Viewport-Stable Mobile Rendering** - Scene sized with measured `svh`/`lvh` pixels so iOS URL-bar collapse never resizes or cuts the background; device-pixel-ratio-aware canvases for crisp art on high-DPI phones
- **Screens-Scrolled Triggers** - All scroll transitions measured in viewport units, so timing is identical across phone, 1080p, and 1440p

## Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/keiwv/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css              # Manga theme tokens + ink utilities
│   ├── fonts.ts                 # Local display font (next/font/local)
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Main portfolio page
├── components/
│   ├── background.tsx           # Fixed scene: ocean, tide, characters
│   ├── Waves.tsx                # Canvas ocean (ink-contoured swells)
│   ├── Ship.tsx                 # Thousand Sunny riding the front wave
│   ├── Sun.tsx                  # Ink-outlined sun with rotating rays
│   ├── MangaFigures.tsx         # Night-sky figures (moon, stars, bursts)
│   ├── Gear5Luffy.tsx           # Shared, phase-locked Luffy artwork
│   ├── IntroLoader.tsx          # Loading screen with Luffy hand-off
│   ├── hook/                    # Custom React hooks
│   ├── layout/                  # Navbar, Footer, skills marquee
│   ├── providers/               # DynamicIntlProvider (i18n)
│   ├── sections/                # home, experience, projects, about, contact
│   └── ui/                      # GooeyNav, GlassSurface, cards, mobile nav
├── lib/
│   ├── waves.ts                 # Shared wave geometry + animation clock
│   └── data.ts                  # Social links and static data
├── messages/                    # en.json / es.json translations
├── public/                      # Artwork, fonts, project screenshots, CV
└── types/                       # TypeScript type definitions
```

## Key Technologies

### **Frontend Framework**
- **Next.js 16.1** - React framework with App Router
- **React 19** - Latest React features and concurrent rendering
- **TypeScript 5** - Type-safe development experience

### **Styling & Animation**
- **TailwindCSS 4** - Utility-first CSS framework
- **Motion (Framer Motion 12)** - Scroll-linked transforms, springs, and presence animations
- **HTML Canvas** - Hand-rolled ocean, ship, sun, and night-sky rendering
- **GSAP** - Text and marquee animations

### **UI/UX Libraries**
- **Lucide React / React Icons** - Icon sets
- **Embla Carousel** - Smooth, performant project carousel
- **React Intersection Observer** - Efficient scroll detection

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+ (including iOS toolbar-aware rendering)
- ✅ Edge 90+

## License

This project is open source and available under the [MIT License](LICENSE).

## Connect

- **Portfolio**: [Live Demo](https://keiwv.dev/)
- **GitHub**: [@keiwv](https://github.com/keiwv)
- **LinkedIn**: [keiwv](https://linkedin.com/in/keiwv)
- **Email**: [Contact me](mailto:contact@keiwv.dev)

---

Built with ❤️ by keiwv
