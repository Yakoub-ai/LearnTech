# HTML & CSS — Senior Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/html-css/senior)

## Topics Covered

- CSS Architecture (ITCSS, CUBE CSS, Utility-First)
- Container Queries
- Cascade Layers (@layer)
- Performance Optimization (Core Web Vitals, content-visibility, containment)
- Design Systems and Token-Based Theming
- Advanced Selectors (:is(), :where(), :has())
- Modern CSS Features (nesting, color-mix(), view transitions, scroll-driven animations, popover styling, anchor positioning)

## Prerequisites

- Completion of the HTML-CSS Mid guide or equivalent knowledge
- Strong understanding of accessibility, animations, and BEM
- Experience maintaining large-scale CSS codebases

## Estimated Time

50 hours

---

## 1. CSS Architecture at Scale

Choosing the right CSS architecture determines how quickly your team ships features and how maintainable the codebase remains over time.

### ITCSS (Inverted Triangle CSS)

ITCSS organizes CSS from generic to specific in seven layers:

| Layer       | Description                                       | CSS Output? |
|-------------|---------------------------------------------------|-------------|
| Settings    | Variables, configuration                          | No          |
| Tools       | Mixins, functions (preprocessors)                 | No          |
| Generic     | Reset, normalize, box-sizing                      | Yes         |
| Elements    | Bare HTML element styles (h1, a, p)               | Yes         |
| Objects     | Layout primitives (container, stack, grid)         | Yes         |
| Components  | UI components (card, button, modal)                | Yes         |
| Utilities   | Override helpers with `!important`                 | Yes         |

Each subsequent layer can override the previous, moving from low to high specificity.

### CUBE CSS (Composition, Utility, Block, Exception)

CUBE embraces the cascade rather than fighting it:

```css
/* Composition: layout primitives */
.flow > * + * { margin-block-start: var(--flow-space, 1em); }

.sidebar-layout {
  display: flex; flex-wrap: wrap;
  gap: var(--gutter, 1.5rem);
}
.sidebar-layout > :first-child { flex-basis: 20rem; flex-grow: 1; }
.sidebar-layout > :last-child  { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }

/* Block: component styles */
.card { background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

/* Exception: data-attribute-driven states */
.card[data-variant="featured"] { border: 2px solid var(--color-primary); }
.card[data-state="loading"]    { opacity: 0.6; pointer-events: none; }
```

### Utility-First (Tailwind CSS Approach)

```css
/* Small, composable atomic classes */
.flex { display: flex; }
.items-center { align-items: center; }
.gap-4 { gap: 1rem; }
.p-4 { padding: 1rem; }
.text-center { text-align: center; }
```

**Pros:** Rapid development, consistent design, CSS bundle size bounded by utility count.
**Cons:** Verbose HTML, learning curve.

### Choosing an Architecture

| Team Size | Recommended Approach                          |
|-----------|-----------------------------------------------|
| Solo/small| BEM or utility-first                          |
| Medium    | CUBE CSS or ITCSS                             |
| Large/org | ITCSS with layers, or utility-first + tokens  |

---

## 2. Container Queries

Container queries are a paradigm shift: components adapt to the size of their **container**, not the viewport.

### Establishing Containment

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
  /* Shorthand: container: card / inline-size; */
}
```

### Writing Container Rules

```css
.card {
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;
}

@container card (min-width: 500px) {
  .card {
    grid-template-columns: 200px 1fr;
    padding: 1.5rem;
  }
}

@container card (min-width: 800px) {
  .card {
    grid-template-columns: 300px 1fr auto;
    align-items: center;
  }
}
```

### Container Query Units

- `cqi` -- 1% of the container's inline size
- `cqb` -- 1% of the container's block size

```css
.card__title { font-size: clamp(1rem, 3cqi, 1.5rem); }
```

### Why Container Queries Matter

A card in a narrow sidebar and the same card in a wide main area now **automatically** adapt without any viewport-based media queries or wrapper classes. Components become truly context-agnostic.

### Style Queries (Experimental)

```css
@container style(--theme: dark) {
  .card { background: #1f2937; color: #f9fafb; }
}
```

---

## 3. Cascade Layers (`@layer`)

`@layer` gives explicit control over cascade ordering, solving specificity management at scale.

### Defining Layer Order

```css
/* Later layers have HIGHER priority */
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
}

@layer base {
  body { font-family: 'Inter', sans-serif; line-height: 1.6; }
}

@layer components {
  .card { background: white; border-radius: 8px; padding: 1.5rem; }
}

@layer utilities {
  .text-center { text-align: center; }
  .hidden { display: none; }
}
```

### Managing Third-Party CSS

```css
@layer third-party, reset, base, components, utilities;

/* Third-party CSS imported into the lowest-priority layer */
@import url('datepicker.css') layer(third-party);

/* Your styles always override third-party regardless of specificity */
@layer components {
  .datepicker { border-radius: 8px; }
}
```

### Nested Layers

```css
@layer components {
  @layer buttons { .btn { padding: 0.5rem 1rem; } }
  @layer cards   { .card { border-radius: 8px; } }
}

/* Reference with dot notation */
@layer components.buttons { .btn--danger { background: red; } }
```

### Key Rules

- **Unlayered styles beat ALL layered styles** (escape hatch by design).
- Layer order, not specificity within layers, determines the winner.
- Layers declared later have higher priority.

---

## 4. Performance Optimization

CSS directly impacts Core Web Vitals: LCP (load speed), CLS (layout stability), and INP (interaction responsiveness).

### Preventing Layout Shift (CLS)

```css
/* Always set width/height on images */
img, video { max-width: 100%; height: auto; }

/* Use aspect-ratio for media containers */
.video-wrapper { aspect-ratio: 16 / 9; width: 100%; }

/* Reserve space for dynamic content */
.ad-slot { min-height: 250px; contain: layout; }
```

### Font Loading Strategy

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap; /* show fallback immediately, swap when ready */
}

/* Match fallback metrics to minimize shift */
@font-face {
  font-family: 'Inter-fallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  size-adjust: 107%;
}

body { font-family: 'Inter', 'Inter-fallback', sans-serif; }
```

### Content Visibility

```css
/* Skip rendering for off-screen sections */
.below-fold {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

### CSS Containment

```css
.widget {
  contain: layout style paint;
  /* Changes inside do not affect outside -- browser can optimize */
}
```

### Animation Performance

```css
/* GOOD: GPU-composited (transform + opacity only) */
.slide { transition: transform 300ms ease, opacity 300ms ease; }

/* BAD: triggers layout recalculation every frame */
.slide-bad { transition: left 300ms ease; }
```

The rendering pipeline: **Style > Layout > Paint > Composite**. `transform` and `opacity` skip Layout and Paint, operating only at the Composite step via the GPU.

### `will-change` Best Practices

```css
/* Apply BEFORE animation, not globally */
.card:hover { will-change: transform; }
/* NEVER: will-change: all; -- wastes GPU memory */
```

---

## 5. Design Systems & Tokens

Design tokens are the atomic values of a design system, stored in a platform-agnostic format.

### Three-Tier Token Architecture

```
Tier 1: Global tokens    -- raw values     (--global-color-blue-500: #3b82f6)
Tier 2: Alias tokens     -- semantic names  (--color-action-primary: var(--global-color-blue-600))
Tier 3: Component tokens -- scoped usage    (--_button-bg: var(--color-action-primary))
```

### Implementation

```css
/* Tier 1: Global */
:root {
  --global-color-blue-500: #3b82f6;
  --global-color-blue-700: #1d4ed8;
  --global-color-gray-900: #111827;
  --global-space-4: 1rem;
  --global-radius-md: 8px;
}

/* Tier 2: Alias (semantic) */
:root {
  --color-action-primary: var(--global-color-blue-600);
  --color-action-primary-hover: var(--global-color-blue-700);
  --color-text-primary: var(--global-color-gray-900);
  --color-surface-primary: white;
}

/* Dark theme: only alias tokens change */
[data-theme="dark"] {
  --color-text-primary: #f9fafb;
  --color-surface-primary: var(--global-color-gray-900);
}

/* Tier 3: Component tokens */
.c-button {
  --_button-bg: var(--color-action-primary);
  --_button-radius: var(--global-radius-md);
  background: var(--_button-bg);
  border-radius: var(--_button-radius);
}
```

### Multi-Platform Tokens

Tokens stored as JSON, transformed via **Style Dictionary** into:
- **CSS**: `--color-brand-primary: #3b82f6;`
- **iOS**: `static let brandPrimary = UIColor(hex: "#3b82f6")`
- **Android**: `<color name="brand_primary">#3b82f6</color>`

### Why Three Tiers?

- Global tokens hold raw values that never change between themes.
- Alias tokens give semantic meaning and change per theme.
- Component tokens allow per-component customization without breaking the system.

---

## 6. Advanced Selectors

### `:is()` and `:where()`

Both match any selector in their list, but differ in specificity:

```css
/* :is() -- specificity = highest in the list */
:is(.header, .footer, .sidebar) a:is(:hover, :focus) {
  color: var(--color-primary);
}

/* :where() -- specificity = ALWAYS 0 */
:where(h1, h2, h3, h4, h5, h6) {
  line-height: 1.25;
  font-weight: 700;
}
/* Easy to override: any class selector beats :where() */
```

Use `:where()` for resets and base styles. Use `:is()` to reduce selector repetition.

### Complex `:has()` Patterns

```css
/* Style parent based on descendant state */
.form-group:has(:focus-visible) { background: #eff6ff; }

/* Layout changes based on content */
.card:has(> img) { padding-top: 0; }
.card:not(:has(> img)) { border-top: 4px solid var(--color-primary); }

/* Global state management */
body:has(.modal[open]) { overflow: hidden; }
body:has(.sidebar.is-collapsed) .main { grid-column: 1 / -1; }

/* Quantity queries */
.tag-list:has(:nth-child(4)) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
```

### `:not()` with Multiple Selectors

```css
input:not([type="submit"], [type="button"], [type="hidden"]) {
  border: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
}
```

### Selector Performance

Browsers match selectors right-to-left. Tips:
- Prefer single-class selectors (`.card`) over deep chains (`.a .b .c .d`).
- Avoid universal descendant selectors (`.wrapper *`).
- Use `:has()` carefully on elements appearing thousands of times.

---

## 7. Modern CSS Features (2025-2026)

### Native CSS Nesting

No preprocessor needed:

```css
.card {
  background: white;
  border-radius: 8px;

  & .card__title { font-size: 1.25rem; }
  &:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
  &.card--featured { border: 2px solid var(--color-primary); }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

### Modern Color Functions

```css
:root {
  --brand-hue: 250;
  --color-brand-500: oklch(58% 0.20 var(--brand-hue));
  --color-brand-700: oklch(38% 0.18 var(--brand-hue));
}

/* color-mix() -- blend colors */
.button:hover {
  background: color-mix(in oklch, var(--color-brand-500) 80%, black);
}

/* Relative color syntax */
.button:active {
  background: oklch(from var(--color-brand-500) calc(l - 0.2) c h);
}
```

**OKLCH** is perceptually uniform: colors at the same lightness value appear equally bright across all hues, making it superior to HSL for systematic palette design.

### View Transitions API

```css
/* Cross-fade between page states */
::view-transition-old(root) { animation: fade-out 300ms ease; }
::view-transition-new(root) { animation: fade-in 300ms ease; }

/* Named element transitions */
.hero-image { view-transition-name: hero-image; }

/* Multi-page app transitions */
@view-transition { navigation: auto; }
```

### Scroll-Driven Animations

```css
/* Reading progress bar */
.progress-bar {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 4px;
  background: var(--color-primary);
  transform-origin: left;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Reveal-on-scroll */
.scroll-reveal {
  opacity: 0; transform: translateY(30px);
  animation: reveal auto ease both;
  animation-timeline: view();
  animation-range: entry 20% entry 60%;
}

@keyframes reveal {
  to { opacity: 1; transform: translateY(0); }
}
```

### Anchor Positioning (Experimental)

```css
.tooltip {
  position: absolute;
  position-anchor: --trigger;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
}
```

### Popover API Styling

```css
[popover] {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  padding: 1rem;
  max-width: 300px;
}
```

---

## Senior Exercises

1. Refactor an existing project's CSS into ITCSS layers with a clear file structure.
2. Build a responsive dashboard widget that uses **container queries** to adapt at 300px, 500px, and 800px container widths.
3. Set up cascade layers for a project with two third-party CSS libraries and verify that your component styles always win.
4. Audit a website using Chrome DevTools Performance tab. Identify CSS-caused layout shifts and document fixes for each.
5. Design a complete three-tier token architecture for a SaaS product, including light/dark themes.
6. Create a storytelling page with scroll-driven animations for section reveals, parallax backgrounds, and a reading progress bar -- all without JavaScript.
7. Build a page with View Transitions that animates between list and detail views.
8. Implement a complete design system component (button with size/variant/state variants) using CSS layers, container queries, and design tokens.

---

## Key Takeaways

- **CSS Architecture** determines long-term maintainability. Choose based on team size and project scale.
- **Container queries** make components truly reusable across layout contexts.
- **Cascade layers** solve specificity management at scale, especially with third-party CSS.
- **Performance** is a feature. Use `content-visibility`, `contain`, proper font loading, and GPU-only animations.
- **Design tokens** are the single source of truth. Three tiers (global, alias, component) enable flexible theming.
- **`:is()` and `:where()`** reduce repetition and give precise specificity control.
- **Modern CSS** (nesting, `color-mix()`, view transitions, scroll-driven animations) eliminates JavaScript for many UI patterns.

---

## Recommended Videos

- **Kevin Powell** -- "CSS :has() is more than a parent selector" -- https://www.youtube.com/watch?v=Gu3E-IF9GkA
- **Google Chrome Developers** -- "View Transitions API" -- https://www.youtube.com/watch?v=JCJUPJ_zDQ4
- **Una Kravets** -- "What's new in CSS" -- https://www.youtube.com/watch?v=rEFgAQBmBSA

---

This is the final level of the HTML & CSS path. Consider exploring [JavaScript Beginner](../JavaScript/Beginner.md) or role-specific learning tracks on the platform.
