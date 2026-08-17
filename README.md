<div align="center">

<!--
  👉 PROJECT BANNER
  Drop a screenshot (or a nice hero shot) of the site at:
    docs/banner.png
  It will appear right here at the top of the README automatically.
  Recommended size: ~1600×900, exported as PNG or JPG.
-->
<img src="/public/Home.png" alt="Omar Wassim — Portfolio banner" width="100%" />

<h1>Omar Wassim — Portfolio</h1>

<p>
  A dark, cinematic personal portfolio built with React, Vite, TypeScript,
  Tailwind CSS, and Framer Motion.
</p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-black?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/license-MIT-lightgrey" alt="MIT License" />
</p>

<p>
  <a href="#-getting-started">Getting Started</a> ·
  <a href="#-project-structure">Project Structure</a> ·
  <a href="#-customization">Customization</a> ·
  <a href="#-tech-stack">Tech Stack</a>
</p>

</div>

<br />

## ✨ Overview

This repository is the source for **Omar Wassim Mohamed's** personal portfolio —
an Intelligent Systems Engineering student, full-stack developer, and scouts
team leader based in Cairo, Egypt. The site is a single-page React
application composed of five sections:

| Section | What it shows |
|---|---|
| **Hero** | Name, role, and a generative animated node/circuit background |
| **Profile** | Bio with a scroll-linked text reveal, plus education history |
| **Projects** | Featured builds — an AI kids' avatar, a university platform, and a healthtech assistant |
| **Moments** | A photo gallery of hackathons, scouting, and milestones |
| **Skills** | Front-end, back-end, data, deployment, and engineering capabilities |
| **Contact** | Direct contact details and a card of external links |

All animations (pull-up text reveals, scroll-based opacity, staggered card
entrances) are built with Framer Motion; icons are from `lucide-react`.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (bundled with Node.js)

### Installation

```bash
git clone <your-repo-url>
cd omar-portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL Vite prints in your terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

The production build is emitted to `dist/`, ready to deploy to Vercel,
Netlify, GitHub Pages, or any static host.

---

## 🗂 Project Structure

```
omar-portfolio/
├── docs/
│   └── banner.png            ← README banner (see above)
├── public/
│   ├── hero.jpg               ← hero background photo (optional)
│   ├── track-record.jpg       ← "Track record" card photo (optional)
│   └── gallery/
│       ├── gallery-1.jpg      ← photos for the Moments section
│       └── ...
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Gallery.tsx
│   │   ├── Skills.tsx
│   │   ├── Footer.tsx
│   │   ├── WordsPullUp.tsx
│   │   ├── WordsPullUpMultiStyle.tsx
│   │   ├── AnimatedLetter.tsx
│   │   └── CircuitBackground.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

---

## 🎨 Customization

### Add the hero photo
Drop an image at **`public/hero.jpg`** — it appears automatically behind
the hero text, layered over the animated background.

### Add a photo to the "Track record" card
Drop an image at **`public/track-record.jpg`** — it shows behind the stats
on the first card of the Projects section.

### Add gallery photos
Drop images into **`public/gallery/`** named `gallery-1.jpg` through
`gallery-6.jpg` (see `src/components/Gallery.tsx` to add more slots or
edit captions).

### Add project links
Open `src/components/Projects.tsx` and fill in the `url` field for each
entry in the `PROJECTS` array — the "Learn more" button activates
automatically once a URL is set.

### Add external links (GitHub, portfolio, etc.)
Open `src/components/Footer.tsx` and fill in the `url` field for each
entry in the `LINKS` array.

### Colors & fonts
Edit `tailwind.config.js` (`colors.primary`, `colors.signal`,
`fontFamily.serif`) and the Google Fonts `<link>` tags in `index.html`
(Almarai + Instrument Serif).

---

## 🛠 Tech Stack

- **[React 18](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite](https://vitejs.dev/)** — build tool & dev server
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** — animation
- **[Lucide React](https://lucide.dev/)** — icon set

---

## 📄 License

This project is open-sourced for personal/portfolio use. Feel free to fork
it as a template for your own site — attribution appreciated but not
required.

---

<div align="center">

**Omar Wassim Mohamed** · Intelligent Systems Engineering Student · Cairo, Egypt

[LinkedIn](https://www.linkedin.com/in/omar-wassim-b34b192ba) · [omarwassim05@gmail.com](mailto:omarwassim05@gmail.com)

</div>
