# Copilot Instructions for Vikban Groups Website

## Project Overview
This is a **static website** for Vikban Groups, showcasing AI-powered software development services. Built with vanilla HTML/CSS/JavaScript (no build tools, no frameworks).

**Key Tech Stack:**
- HTML5 with modular components (templates in `src/templates/`)
- CSS3 with responsive design patterns (mobile-first breakpoints at `768px`, `1024px`)
- Vanilla JavaScript (no jQuery, no external frameworks)
- Font Awesome icons (CDN)
- Google Fonts (Orbitron for headings, Inter for body text)

---

## Architecture & Data Flows

### Page Structure
- **Entry point:** `src/index.html` (homepage)
- **Other pages:** `src/{about,services,portfolio,contact,ai-solutions}.html`
- **Template:** `src/templates/base.html` (reference template with meta tags and structure)
- **No backend:** All pages are static; no database or API integration

### Component System
- **Header & Footer:** Loaded dynamically via `src/js/main.js` using `fetch()`
  - Header: not actively fetched (commented in current code)
  - Footer: `src/components/footer.html` is fetched and injected into `#footer` element
- **Why split:** Enables easy maintenance of shared UI elements across all pages

### JavaScript Initialization (main.js)
The codebase uses **single responsibility principle** in `src/js/main.js`:

```javascript
// 1. Load shared layout first
await loadHeaderFooter();

// 2. Initialize header behavior (REQUIRED on all pages)
initHeader();           // Sets active nav link, manages hamburger menu
initHeaderScroll();     // Adds "scrolled" class for header visual feedback

// 3. Page-specific features
initClientScroller();   // Portfolio only (auto-scrolls client logos)
initStats();            // Home/About only (animates stat counters on scroll)
```

**Bootstrap pattern:** All initialization happens in `DOMContentLoaded` event via `bootstrap()` function. Each `init*()` function safely checks for required DOM elements before running.

### CSS Architecture

**CSS Cascade (all in `src/css/styles.css`):**
1. **CSS Variables (Root):** Defines spacing, colors, dimensions
   - `--topbar-height: 40px` (top email/social bar)
   - `--header-height: 72px` (main navigation)
   - `--site-header-total: calc(topbar-height + header-height)` (used to push body content below fixed header)
   - `--accent-1: #4a90e2` (primary blue)
   - `--accent-2: #764ba2` (secondary purple)
   - `--bg-dark: #0b1a2e` (dark background)

2. **Global Reset:** Box-sizing border-box, semantic font families

3. **Component Sections:**
   - Header/Navigation (hamburger, logo, brand name)
   - Main content wrapper
   - Hero sections (gradient backgrounds with animation)
   - Cards (client cards, team members, offices)
   - Buttons and typography
   - Footer

4. **Responsive Strategy:**
   - **Mobile-first CSS Variables:** Tablet/mobile header sizes override at `@media (max-width: 768px)`
   - **Hamburger menu:** Hidden on desktop, appears on mobile
   - **Grid layouts:** Use `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` for flexible layouts
   - **Touch-friendly:** Scroll buttons have `44px` height; scrollable containers use `touch-action: pan-x`

---

## Critical Patterns & Conventions

### DOM Query Helpers (main.js)
```javascript
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
```
- **Usage:** `$('.class')`, `$$('nav a')` for brevity
- **Important:** Uses native DOM API, NOT jQuery

### Active Navigation
- Sets `active` class on navigation link matching current page pathname
- Example: `href="portfolio.html"` matches when `location.pathname` ends with `portfolio.html`

### Client Logo Scrolling
- **Auto-scroll:** Uses `requestAnimationFrame()` with direction toggle (bounces back and forth)
- **Manual scroll:** Left/Right buttons calculate scroll distance as `cardWidth + gap`
- **Pause on interaction:** Pauses auto-scroll on `mouseenter` or `touchstart`
- **Key elements:** `.scroll-wrapper`, `#clientScroll` (container), `.scroll-btn` (buttons)

### Stat Counter Animation
- **Trigger:** IntersectionObserver fires when stat is 40% visible (`threshold: 0.4`)
- **Method:** Increments from 0 to target in 40 steps, 30ms intervals
- **Extraction:** Parses target number from text using regex `/\D/g` (removes non-digits)
- **Result:** Replaces content with animated count, preserves suffix (e.g., `+` in `50+`)

### Chat Widget
- Located in `src/js/chatbot.js` (independently manages its own state)
- Collects user info (name, phone) before chat starts
- Sends chat log via email on close (calls `sendChatToEmail()` function)
- Uses localStorage to prevent duplicate emails
- **Event pattern:** `DOMContentLoaded` → collect DOM refs → attach listeners → initialize state

---

## File Organization & Conventions

### CSS Structure
- **Modular but unified:** Empty directories exist (`base.css/`, `components.css/`, `responsive.css/`) but all styles are in `src/css/styles.css`
- **Future refactoring:** These directories suggest intention to split CSS but not yet implemented
- **Recommendation:** Keep adding to `styles.css` unless migrating to CSS-in-JS or CSS modules

### JavaScript Files
- **main.js** (222 lines) — Core orchestrator for all pages
- **utils.js** — Generic helpers (localStorage, class toggles, date formatting)
- **animations_.js** — Reusable fade-in/fade-out functions
- **chatbot.js** — Isolated chat widget (120 lines, self-contained)
- **clients-scroll.js** — Likely legacy; logic now in main.js
- **main_old.js** — Backup; do NOT use

### Asset Structure
- **Images:** `src/assets/images/` (includes client logos, brand imagery, CDR file)
- **Fonts:** `src/assets/fonts/` (likely custom fonts, but currently using Google Fonts)
- **Icons:** Font Awesome via CDN

---

## Developer Workflows

### Adding a New Page
1. Create `src/newpage.html` (copy structure from `index.html`)
2. Include in header navigation markup (update all pages manually — no templating engine)
3. Ensure `main.js` loads (it runs on all pages)
4. Add page-specific `init*()` function if needed (update bootstrap)

### Styling Changes
1. Edit `src/css/styles.css` directly
2. Use CSS variables for colors (`var(--accent-1)`, etc.)
3. For mobile-specific: add `@media (max-width: 768px)` rules at bottom of file
4. Avoid inline styles; maintain separation of concerns

### Testing Locally
- Open any `.html` file in browser (no dev server needed)
- Use browser DevTools to debug
- Check responsive design using mobile emulation (`768px` breakpoint)

### Common Commands (if local server used)
- **Live Server Extension:** Right-click `.html` file → "Open with Live Server"
- **Python:** `python -m http.server 8000` (Python 3)
- **Node:** `npx http-server`

---

## Important Implementation Notes

### Header/Topbar Layout
- **Fixed positioning:** Header stays at top during scroll (managed by `scrolled` class)
- **Topbar:** Email + social links (40px height)
- **Main header:** Logo + brand name + navigation (72px height)
- **Total spacing:** `--site-header-total` used to set `margin-top` on body content

### Animations
- **Scroll animations:** Use IntersectionObserver for performance
- **Transition timing:** Typically `0.2s` - `0.3s` ease for hover states
- **Auto-animations:** RequestAnimationFrame preferred over setInterval (60fps)

### Accessibility
- **Focus outlines:** 3px dashed outline on interactive elements (`:focus` pseudo-class)
- **Semantic HTML:** Uses `role="banner"` on header, proper heading hierarchy
- **Color contrast:** Primary text on white background meets WCAG AA

### Browser Support
- Modern browsers (ES6+ JavaScript, CSS Grid, CSS Variables)
- Mobile-first responsive design (viewport meta tag required)
- No polyfills for older browsers

---

## Common Pitfalls & Gotchas

1. **Navigation Links:** Must match exact page filenames (`portfolio.html`, not `/portfolio`)
2. **Footer Fetch:** Ensure `src/components/footer.html` exists; missing it will silently fail
3. **CSS Variables:** Defined in `:root`; child elements override with new `:root` rules in media queries
4. **Hamburger Menu:** Only toggles nav visibility; does NOT close on link click (add listener if needed)
5. **Stats Counter:** Only runs if `<h3>` elements inside `.stat-item` exist; safe to omit on non-home pages
6. **Client Scroll:** Requires specific DOM structure (`.scroll-wrapper` → `#clientScroll` → `.client-card` children)

---

## Next Steps for Contributors

- Use this doc as a reference before making changes
- Preserve the vanilla JS approach (avoid introducing frameworks)
- Keep CSS unified in `styles.css` unless significantly refactoring
- Test mobile responsiveness at `768px` and `1024px` breakpoints
- Maintain active navigation highlighting for consistent UX
