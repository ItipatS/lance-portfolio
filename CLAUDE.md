# lance-portfolio — CLAUDE.md

Personal portfolio site for Itipat "Lance" Songsampansakul.
**Stack:** React 18 + TypeScript + Tailwind CSS v4 + Vite → GitHub Pages

---

## Project structure

```
src/
  App.tsx                   — main layout, filter logic, smooth scroll
  index.css                 — all custom CSS (animations, gradients, etc.)
  main.tsx
  data/
    profile.ts              — name, headline, summary, metrics, links
    projects.ts             — Project[] with categories, links, youtubeIds
  components/
    SocialCards.tsx         — Discord/YouTube/Email cards + floating Contact pill
    ProjectCard.tsx         — project card with video thumb, pills, tech highlights
    YouTubeThumb.tsx        — lazy YouTube thumbnail image
  hooks/
    useSmoothScroll.ts      — lerp-based wheel scroll (skipped on touch)
```

---

## Key constants to fill in

- `src/components/SocialCards.tsx` line 4: `DISCORD_UID = "443066299078279178"` ✅
- `src/components/SocialCards.tsx` line 8: `YOUTUBE_CHANNEL_ID = ""` ← **fill in from YouTube Studio → Settings → Channel → Advanced settings**
  - When empty, falls back to first video found in `projects` data
  - Must also join `discord.gg/lanyard` for Spotify Now Playing to work

---

## Architecture decisions

### Floating Contact pill
- `IntersectionObserver` on a sentinel `div` at the end of the inline social cards
- `boundingClientRect.top < 0` distinguishes "scrolled past" from "hasn't reached yet"
- Two states: `showFloat` (DOM presence) + `floatVisible` (CSS transition target)
- Enter: double `requestAnimationFrame` to let DOM mount before triggering transition
- Exit: `setFloatVisible(false)` → 300ms timeout → `setShowFloat(false)`
- **Do not use CSS animation classes for this** — inline style transitions are used instead because class-swap on completed animation doesn't restart reliably

### Expandable hover panels (Spotify / YouTube latest video)
- `ExpandPanel` component: `grid-template-rows: open ? "1fr" : "0fr"` with CSS transition
- Inner div has `overflow: hidden` — this is the trick that makes height animate without knowing the content height
- Triggered by `hovered` state via `onMouseEnter/Leave`

### Category filter transition
- `filter` = active tab, `displayFilter` = what's rendered, `isOut` = fade-out state, `animKey` = remount key
- `handleFilter` → `setIsOut(true)` → 160ms → `setDisplayFilter` + `setIsOut(false)` + `setAnimKey(k+1)`
- Staggered card entrance: `animationDelay: ${i * 0.07}s` with `.card-in` CSS animation

### Smooth scroll
- `useSmoothScroll(0.06)` in App.tsx
- Intercepts `wheel` events (`passive: false`, `preventDefault()`)
- `currentY += (targetY - currentY) * lerpFactor` each rAF frame
- Skips on `pointer: coarse` (touch devices have native momentum)

### Rotating gradient borders
- `@property --grad-angle` + `@keyframes grad-spin` in `index.css`
- Classes: `.card-border-discord`, `.card-border-youtube`, `.card-border-email`, `.card-border-contact`
- Each has staggered `animation-delay` so they're not in sync

---

## Data types

```ts
// projects.ts
type ProjectCategory = "Roblox" | "Unity" | "Tooling" | "Frontend" | "Bedrock Addon";

type Project = {
  id: string; title: string; category: ProjectCategory;
  pitch: string; summary: string;
  technicalHighlights: string[];
  metrics?: string[];
  youtubeIds?: string[];
  links: { label: string; href: string }[];
  isPrivate?: boolean;
  liveDemoUrl?: string;
};
```

---

## CSS classes defined in index.css

| Class | Purpose |
|---|---|
| `.card-border-discord/youtube/email/contact` | Rotating gradient border via `--grad-angle` |
| `.contact-label` | Cycling cyan → red → magenta glow animation |
| `.eq-bar` | Spotify equalizer bar bounce animation |
| `.card-in` | Project card entrance animation |
| `.float-btn-enter/exit` | Kept but unused — replaced by inline style transitions |
| `.panel-enter` | Floating panel slide-up |

---

## Known gotchas / lint rules

- **`Date.now()` in render is impure** — store in state with `useState(() => Date.now() - start)`, update via `setInterval`
- **Synchronous `setState` in `useEffect`** — wrap in `requestAnimationFrame(() => ...)` if called immediately on mount
- **CSS animation class-swap doesn't restart** — use inline style transitions + `floatVisible` state instead
- **`overflow-hidden` required on inner rounded div** — prevents inner content spilling outside rounded corners when paired with `p-px` gradient border wrapper

---

## Deployment

GitHub Pages via `gh-pages` package:
```bash
npm run build
npm run deploy   # or: npx gh-pages -d dist
```
Ensure `vite.config.ts` has `base: "/repo-name/"` set.

---

## Owner info

- Name: Itipat "Lance" Songsampansakul
- Discord UID: `443066299078279178`
- YouTube: `@mirukunoneko1375`
- Email: `itipat.dev@gmail.com`
- GitHub: `https://github.com/ItipatS`
