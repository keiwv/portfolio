# Brayan Ivan Perez Ventura - Portfolio

> A modern, interactive portfolio showcasing software engineering projects and skills with cutting-edge web technologies.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16.1-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)

## Features

### **Neo-Brutalist Design**
- **Type-led layout** - Giant uppercase Inter Tight headlines, JetBrains Mono for UI chrome
- **One hot accent** - Near-black and warm-paper sections with a single accent (`--accent` in `app/globals.css`)
- **Architectural split header** - Role title top-left, photo bottom-left, full name anchored bottom-right
- **Hairlines, no shadows** - Numbered section labels, split layouts, no gradients or glass effects
- **Restrained motion** - One stack ticker and fade-ups only; both disabled under `prefers-reduced-motion`
- **Responsive Design** - Checked at 375px, 820px and 1440px

### **Internationalization**
- **Multi-language Support** (English/Spanish) using next-intl
- **Dynamic Language Switching** with persistent preferences
- **Localized Content** for global accessibility

### **Advanced Navigation**
- **Sticky Navbar** - Active section tracking via Intersection Observer
- **Smooth Scrolling** - Anchor links offset below the sticky header
- **Mobile-Optimized** - Full-screen menu with language and social links

### **Content Sections**
- **Header** - Role, focus areas, photo with current position, intro and full name
- **Tech Stack Ticker** - Scrolling list of languages and tools
- **Projects** - Alternating rows with screenshot galleries, skills and expandable contributions
- **Experience** - Accordion of roles plus a month-by-month timeline
- **About Me** - Personal story, CV and LinkedIn
- **Contact** - Accent band where the email address is the headline

### **Developer Experience**
- **TypeScript** - Full type safety and IntelliSense
- **Component Architecture** - Modular, reusable React components
- **Custom Hooks** - Shared logic for mobile detection, active sections
- **ESLint Configuration** - Code quality and consistency

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd portfolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Main portfolio page
├── components/
│   ├── hook/                    # Custom React hooks
│   │   ├── useActiveSection.tsx # Section intersection logic
│   │   └── useLanguage.tsx     # Internationalization
│   ├── layout/                  # Layout components
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── providers/               # React context providers
│   │   └── DynamicIntlProvider.tsx
│   ├── sections/                # Main content sections
│   │   ├── home.tsx
│   │   ├── stack.tsx
│   │   ├── projects.tsx
│   │   ├── experience.tsx
│   │   ├── about.tsx
│   │   └── contact.tsx
│   └── ui/                      # Reusable UI components
│       ├── LanguageSwitcher.tsx
│       ├── Marquee.tsx
│       ├── Reveal.tsx
│       └── SectionLabel.tsx
├── i18n/                        # Internationalization config
├── lib/                         # Utility functions and data
├── messages/                    # Translation files
│   ├── en.json
│   └── es.json
├── public/                      # Static assets
└── types/                       # TypeScript type definitions
```

## Key Technologies

### **Frontend Framework**
- **Next.js 16.1** - React framework with App Router
- **React 19** - Latest React features and concurrent rendering
- **TypeScript 5** - Type-safe development experience

### **Styling**
- **TailwindCSS 4** - Utility-first CSS framework, design tokens in `app/globals.css`
- **next/font** - Inter Tight, Inter and JetBrains Mono

### **UI/UX Libraries**
- **Lucide React** - Line icons
- **React Intersection Observer** - Scroll-triggered reveals

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **class-variance-authority** - Type-safe component variants

## Unique Features

### **Smart Section Navigation**
- Automatic active section detection
- Keyboard shortcuts (Arrow keys, Page Up/Down, Home/End)
- Smooth scrolling with customizable offsets

### **Mobile-First Design**
- Touch-optimized navigation
- Responsive components that adapt to screen size
- Performance-optimized for mobile devices

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Optimized with Next.js automatic code splitting

## License

This project is open source and available under the [MIT License](LICENSE).

## Connect

- **Portfolio**: [Live Demo](https://keiwv.dev/)
- **GitHub**: [@keiwv](https://github.com/keiwv)
- **LinkedIn**: [brayanperez56](https://linkedin.com/in/brayanperez56)
- **Email**: [Contact Me](mailto:contact@keiwv.dev)

---

Built with ❤️ by Brayan Ivan Perez Ventura
