# Brayan Ivan Perez Ventura - Portfolio

> A modern, interactive portfolio showcasing software engineering projects and skills with cutting-edge web technologies.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16.1-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)

## Features

### **Dynamic Visual Experience**
- **Switchable Shader Backgrounds** - Toggle between stunning Warp and Grain visual effects
- **Smooth Animations** - Powered by Framer Motion for fluid interactions
- **Glassmorphism UI** - Modern glass-like components with backdrop blur effects
- **Responsive Design** - Optimized for all device sizes

### **Internationalization**
- **Multi-language Support** (English/Spanish) using next-intl
- **Dynamic Language Switching** with persistent preferences
- **Localized Content** for global accessibility

### **Advanced Navigation**
- **Intersection Observer** - Smart section detection and active state management
- **Smooth Scrolling** - Seamless transitions between sections
- **Keyboard Navigation** - Arrow keys and page navigation support
- **Mobile-Optimized** - Touch-friendly hamburger menu and sidebar

### **Content Sections**
- **Hero Section** - Dynamic text animations and social links
- **Experience Timeline** - Interactive career journey showcase
- **Projects Gallery** - Carousel with detailed project cards
- **About Me** - Personal story and technical skills
- **Contact Form** - Direct communication interface

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
│   ├── background.tsx           # Shader background component
│   ├── hook/                    # Custom React hooks
│   │   ├── useActiveSection.tsx # Section intersection logic
│   │   ├── useIsMobile.tsx     # Mobile device detection
│   │   └── useLanguage.tsx     # Internationalization
│   ├── layout/                  # Layout components
│   │   ├── Footer.tsx
│   │   ├── HorizontalLoop.tsx
│   │   └── Navbar.tsx
│   ├── providers/               # React context providers
│   │   ├── BackgroundProvider.tsx
│   │   └── DynamicIntlProvider.tsx
│   ├── sections/                # Main content sections
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── experience.tsx
│   │   ├── home.tsx
│   │   └── projects.tsx
│   └── ui/                      # Reusable UI components
│       ├── BackgroundToggle.tsx
│       ├── Button.tsx
│       ├── GlassSurface.tsx
│       └── Cards/
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

### **Styling & Animation**
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Production-ready motion library
- **@paper-design/shaders-react** - GPU-accelerated shader effects

### **UI/UX Libraries**
- **Lucide React** - Beautiful, customizable icons
- **React Icons** - Popular icon libraries
- **Embla Carousel** - Smooth, performant carousels
- **React Intersection Observer** - Efficient scroll detection

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **class-variance-authority** - Type-safe component variants

## Unique Features

### **Shader Background System**
Toggle between two stunning visual experiences:
- **Warp Effect** - Dynamic, flowing geometric patterns
- **Grain Effect** - Smooth gradient transitions with noise texture

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

- **Portfolio**: [Live Demo](https://keiwv.dev)
- **GitHub**: [@keiwv](https://github.com/keiwv)
- **LinkedIn**: [brayanperez56](https://linkedin.com/in/brayanperez56)
- **Email**: [Contact Me](mailto:your-email@domain.com)

---

Built with ❤️ by Brayan Ivan Perez Ventura
