<div align="center">
  <h1>Daniel Mekonnen</h1>
  <p><strong>Software Engineer — Backend Architecture &amp; Systems</strong></p>
  <p>
    <a href="https://github.com/DanielKinnito/daniel-mekonnen-portfolio/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License MIT" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14.0.4-black.svg?style=flat-square&logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.3-38B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.npmjs.com/package/hexpic"><img src="https://img.shields.io/badge/HexPic-v0.3.1-F54E00.svg?style=flat-square" alt="HexPic Engine" /></a>
  </p>
</div>

---

### Overview

Personal engineering portfolio and interactive developer workspace designed with a tactile, developer-focused aesthetic inspired by [PostHog](https://posthog.com). The site highlights production backend microservices, distributed APIs, databases, and open-source tooling, featuring an interactive TrueColor ASCII avatar powered by [HexPic](https://github.com/DanielKinnito/hexpic) and an embedded developer terminal (`⌘K` / `doom`).

- **Tactile Keycap Design**: 3D mechanical keyboard keycaps with physical travel depression (`active:translate-y-1`) and keyboard navigation shortcuts (`[E]`, `[P]`, `[R]`, `[↵]`).
- **Interactive TrueColor ASCII Canvas**: Real-time pointer physics using spring-damping algorithms and Atkinson error-diffusion dithering via `hexpic`.
- **Embedded Developer Terminal**: Fast in-browser CLI (`⌘K` or `` ` ``) providing interactive commands (`help`, `experience`, `projects`, `hexpic`, `resume`, `skills`, `theme`, and secret `doom`).
- **Secret DOOM Easter Egg**: In-place swap embedding DOOM (1993) via `dos.zone` with zero initial bundle overhead and complete audio/input sandboxing.
- **Dual Tactile Themes**: Carefully balanced warm sand light mode (`#F8F7F2`) and deep carbon dark mode (`#121316`) anchored with PostHog's warm ember (`#F54E00`).
- **Engineered Hierarchy**: Work experience, backend microservices, and production projects front-and-center, with dedicated sections for skills and academic achievements.

---

### Key Capabilities & Architecture

| Module | Implementation | Description |
|---|---|---|
| **ASCII Avatar** | `app/components/home/hexpic-avatar.tsx` | TrueColor ASCII matrix on `<canvas>` with Atkinson dithering & pointer physics displacement. |
| **Desktop Window** | `app/components/home/home-section.tsx` | PostHog-inspired tactile desktop window with macOS status controls and terminal launcher. |
| **CLI Terminal** | `app/components/terminal/terminal-drawer.tsx` | Interactive CLI supporting command history, arrow navigation, and quick chips. |
| **Work Experience** | `app/components/experience/` | Detailed timeline covering AI reasoning rubrics at AfterQuery and code auditing at Revelo. |
| **Projects Showcase** | `app/components/projects/` | Tactile project cards with live demo links, source code, and "+ View more" disclosure toggle. |
| **Education Section** | `app/components/education/` | AASTU Software Engineering BSc (CGPA 3.58) and A2SV Google-backed incubator credentials (800+ solved DSA). |
| **Design Tokens** | `tailwind.config.ts`, `globals.css` | 1px hairline borders, monospace metadata, and tactile mechanical shadows. |

---

### Project Structure

```
.
├── app/
│   ├── components/
│   │   ├── education/          # Academic degrees & A2SV incubator section
│   │   ├── experience/         # Professional experience cards & timeline
│   │   ├── header/             # Tactile navbar, theme toggle & brand monogram
│   │   ├── home/               # Desktop window wrapper, intro panel & HexPic canvas
│   │   ├── projects/           # Featured & additional project cards
│   │   ├── skills/             # 4-category technical matrix
│   │   ├── terminal/           # In-browser CLI drawer & command processor
│   │   └── ui/                 # Section headings & tactile theme toggles
│   ├── globals.css             # PostHog tactile CSS variables & keycap shadows
│   ├── icon.svg                # Vector-sharp tab favicon
│   ├── layout.tsx              # Root layout & SEO metadata
│   └── page.tsx                # Ordered section flow
├── components/
│   ├── contact/                # Direct contact form & channels
│   └── ui/                     # Mechanical 3D button keycaps & inputs
├── lib/
│   ├── data/                   # Data sources for experience, projects, skills & education
│   ├── animation.tsx           # Framer motion variants & spring physics
│   └── constants.ts            # Centralized social & resume links
└── public/
    └── favicon.svg             # Razor-sharp browser tab favicon
```

---

### Local Development

#### Prerequisites
- Node.js `18.x` or higher
- npm, yarn, or pnpm

#### Setup

```bash
# 1. Clone the repository
git clone https://github.com/DanielKinnito/daniel-mekonnen-portfolio.git
cd daniel-mekonnen-portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Build & Verification

```bash
# Run ESLint validation
npm run lint

# Generate optimized production build
npm run build
```

---

### Shortcuts

- `⌘K` or `Ctrl+K` or `` ` `` : Toggle interactive developer terminal
- `E` : Jump to Work Experience
- `P` : Jump to Featured Projects
- `R` : Open Resume in Google Drive

---

### License

This project is open-source under the [MIT License](LICENSE).
Created and maintained by [Daniel Mekonnen](https://github.com/DanielKinnito).
