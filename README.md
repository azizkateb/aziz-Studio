# Aziz Studio — Dark Editorial Agency Site

A cinematic, motion-driven design-agency website built to the exact spec, inspired by
[azizstudio.webflow.io](http://azizstudio.webflow.io/). Brutalist dark editorial aesthetic,
raw typography, GSAP-driven scroll animations.

## Stack

- **Next.js 14** (App Router) + React 18
- **GSAP 3 + ScrollTrigger** for scroll & load animations
- **IntersectionObserver** for fade-up reveals
- Google Fonts: **Archivo / Barlow** (900 display) + **Space Mono** (labels)
- No UI libraries, no Tailwind, no Bootstrap — hand-written CSS design system

## Run it

```bash
cd nextjs
npm install
npm run dev
```

Open http://localhost:3000 — the contact page is at http://localhost:3000/contact

## Design system (`app/globals.css`)

| Token | Value |
|---|---|
| bg hero / section / card | `#0a0a0a` / `#141414` / `#111111` |
| text / dim / muted | `#ffffff` / `#282828` / `#666666` |
| accent (hover, labels, active nav only) | `#ff4f00` |
| border | `#1e1e1e` |
| display font | Archivo / Barlow 800–900 |
| label font | Space Mono, 9–11px, 3px tracking, uppercase |
| ease / spring | `power3.out` / `back.out(1.6)` |

## Structure

```
nextjs/
  app/
    layout.tsx          Root layout + metadata
    globals.css         Full design system + every section's styles
    page.tsx            Home: load timeline + reveal observer, composes sections
    contact/page.tsx    Contact page (reuses logotype, Nav, Footer)
  components/
    Nav.tsx             Fixed transparent nav, center links, hamburger
    FloatingCTA.tsx     Bottom-center pill, slides up at t=900ms
    Hero.tsx            Split-color logotype, live LA clock, 0.35x parallax portrait
    Brands.tsx          Header meta row + 2x4 logo card grid
    About.tsx           ⭐ Sequential line-by-line clip-path text fill (scrub 1.5, +=2000)
    Projects.tsx        4 stacked entries, IntersectionObserver fade-up + col stagger
    Services.tsx        2-col type grid, dim siblings on hover, lerp cursor-follow image
    Process.tsx         3 rotating gem cards with pause toggle
    Reel.tsx            PLAY [thumb] REEL + YouTube lightbox (scale/opacity in)
    Testimonials.tsx    5 scattered cards, GSAP spring fan entrance
    CTA.tsx             "PROJECT IN BRAIN?" + pill button
    Footer.tsx          Contact block, indexed nav, socials + utility bar
  public/               lava / eye / gem1–3 / portrait1–2 .png assets
```

## Animation map

1. **Load** — hero words slide up (`yPercent 100→0`, stagger, delay 0.2s), nav fades, floating CTA slides up at 0.9s.
2. **Live clock** — `setInterval` 1s, `America/Los_Angeles`.
3. **Hero parallax** — portrait `yPercent 32` tied to scroll (scrub).
4. **Line-by-line fill** — 4 lines, each base `#282828` + white fill layer animating `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)`, sequential on one timeline, tall `end:'+=2000'`, `scrub:1.5`.
5. **Section fade-up** — `.reveal` via IntersectionObserver (threshold 0.15).
6. **Services** — cursor-follow image (lerp 0.1) + dim non-hovered items.
7. **Process** — CSS 3D gem spin, per-card pause button.
8. **Reel** — hover scale 1.04, click → lightbox with scale/opacity entrance.
9. **Testimonials** — GSAP `back.out` spring stagger fan-out on scroll entry.

## Notes

- The **"Studio"** word uses `background-clip:text` over `lava.png` for the warm/fiery fill (with a gradient fallback in the spec).
- **Spline 3D** is substituted with CSS-3D rotating gems (`Process`) so the project runs fully offline; swap in a `<spline-viewer>` / `@splinetool/react-spline` embed if desired.
- Fully responsive: multi-column layouts collapse to one column, hero shrinks to `clamp(60px,15vw,100px)`, scattered testimonials stack.
- Replace the placeholder logos, copy, project images, and the YouTube reel ID (`dQw4w9WgXcQ`) with real assets.
