# HTML & CSS — Mid-Level Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/html-css/mid)

## Topics Covered

- Custom Properties (CSS Variables)
- Animations and Transitions
- BEM Naming Convention
- Accessibility (ARIA, semantic structure, WCAG 2.2)
- SVG Integration and Styling
- Advanced Grid Layouts (including Subgrid)
- Pseudo-elements and Pseudo-classes (including `:has()`)
- CSS Functions (calc, clamp, min, max, counters)

## Prerequisites

- Completion of the HTML-CSS Beginner guide or equivalent knowledge
- Comfortable with Flexbox, Grid, and responsive design
- Experience building multi-page websites

## Estimated Time

45 hours

---

## 1. CSS Custom Properties (Variables)

CSS Custom Properties are live values in the browser. Unlike Sass/Less variables that compile away, custom properties can be read, inherited, and updated at runtime with JavaScript.

### Defining and Using Variables

```css
:root {
  /* Color palette */
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #8b5cf6;
  --color-error: #ef4444;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;

  /* Spacing scale */
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;

  /* Layout */
  --border-radius: 8px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --transition-fast: 150ms ease;
}

.button {
  font-family: var(--font-sans);
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary);
  border-radius: var(--border-radius);
  transition: background var(--transition-fast);
}
```

### Fallback Values

```css
.card {
  /* Second argument is the fallback if --card-bg is not defined */
  background: var(--card-bg, white);
  padding: var(--card-padding, 1.5rem);
}
```

### Theming with Custom Properties

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
}

[data-theme="dark"] {
  --bg-primary: #111827;
  --text-primary: #f9fafb;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-primary: #111827;
    --text-primary: #f9fafb;
  }
}

body { background: var(--bg-primary); color: var(--text-primary); }
```

### Dynamic Updates via JavaScript

```js
// Set a custom property on :root
document.documentElement.style.setProperty('--color-primary', '#ff0000');

// Read a computed custom property value
const styles = getComputedStyle(document.documentElement);
const primary = styles.getPropertyValue('--color-primary').trim();
```

---

## 2. Animations & Transitions

### Transitions

Transitions animate property changes between two states (e.g., hover).

```css
.button {
  background: var(--color-primary);
  transition: background-color 200ms ease,
              transform 200ms ease,
              box-shadow 200ms ease;
}

.button:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}
```

### Keyframe Animations

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-in { animation: fadeIn 0.6s ease-out forwards; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  border: 4px solid #e5e7eb;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

### Timing Functions

- `ease` -- slow start, fast middle, slow end (default)
- `linear` -- constant speed
- `ease-in` -- slow start, fast end
- `ease-out` -- fast start, slow end
- `cubic-bezier(x1, y1, x2, y2)` -- custom curve

### Transform Property

Transforms are GPU-accelerated and do NOT trigger layout recalculation:

```css
.element {
  transform: translateX(20px) rotate(15deg) scale(1.1);
}
```

Always prefer `transform` and `opacity` for animations over `left`, `top`, `width`, or `height`.

### `animation-fill-mode`

- `forwards` -- keeps the final keyframe styles after animation ends
- `backwards` -- applies first keyframe styles during the delay period
- `both` -- applies both behaviors

### Respecting User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 3. BEM Methodology

BEM (Block-Element-Modifier) is a naming convention that makes CSS classes self-documenting and prevents collisions.

### Naming Pattern

```
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

### Example: Card Component

```css
.card { background: white; border-radius: 8px; overflow: hidden; }
.card__image { width: 100%; height: 200px; object-fit: cover; }
.card__title { font-size: 1.25rem; font-weight: 600; }
.card__description { color: #4b5563; line-height: 1.6; }
.card__footer { display: flex; justify-content: space-between; }

/* Modifiers */
.card--featured { border: 2px solid var(--color-primary); }
.card--compact .card__content { padding: 1rem; }
.card--horizontal { display: grid; grid-template-columns: 200px 1fr; }
```

```html
<article class="card card--featured">
  <img class="card__image" src="img.jpg" alt="Course" />
  <div class="card__content">
    <h3 class="card__title">Advanced CSS</h3>
    <p class="card__description">Master modern techniques.</p>
  </div>
  <footer class="card__footer">
    <span class="card__tag card__tag--primary">CSS</span>
  </footer>
</article>
```

### Why BEM?

- All selectors have the same specificity (0-1-0), preventing specificity wars.
- Class names describe what component they belong to, what part they are, and what variant they represent.
- Works well in large codebases with multiple developers.

---

## 4. Accessibility / ARIA

Web accessibility ensures people with disabilities can perceive, understand, navigate, and interact with websites. WCAG 2.2 AA is the standard target.

### The First Rule of ARIA

Use native HTML elements with built-in semantics **before** reaching for ARIA attributes. A `<button>` is better than `<div role="button">`.

### Key ARIA Attributes

| Attribute            | Purpose                                                   |
|----------------------|-----------------------------------------------------------|
| `role`               | Describes what an element IS (e.g., `tab`, `alert`)       |
| `aria-label`         | Provides a label when no visible text exists               |
| `aria-labelledby`    | References another element as the label                    |
| `aria-describedby`   | Links to supplementary description text                    |
| `aria-expanded`      | Communicates open/closed state of collapsibles             |
| `aria-live`          | Marks regions for dynamic content announcements            |
| `aria-hidden="true"` | Hides decorative elements from assistive technologies      |
| `aria-invalid`       | Indicates the element has a validation error               |

### Focus Management

```css
/* Never remove focus outlines without a replacement */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none; /* Remove focus ring for mouse clicks */
}
```

### Visually Hidden (Screen-Reader Only)

```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Accessible Dialog Pattern

```html
<dialog id="confirm" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Deletion</h2>
  <p>Are you sure? This cannot be undone.</p>
  <button id="cancelBtn">Cancel</button>
  <button id="confirmBtn">Delete</button>
</dialog>
```

The native `<dialog>` element with `showModal()` handles focus trapping, backdrop, and Escape-key dismissal automatically.

### `aria-live` Regions

- `polite` -- announces changes when the screen reader is idle (most updates)
- `assertive` -- interrupts immediately (only for critical alerts)

---

## 5. SVG (Scalable Vector Graphics)

SVG provides resolution-independent graphics that look sharp on any screen. They can be styled with CSS and animated.

### Inline SVG

```html
<svg viewBox="0 0 24 24" width="24" height="24"
     fill="none" stroke="currentColor" stroke-width="2"
     aria-hidden="true" class="icon">
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>
```

### Styling with CSS

```css
.icon {
  width: 24px; height: 24px;
  stroke: currentColor; /* inherits parent color */
  transition: transform 150ms ease;
}

.icon:hover { transform: scale(1.1); }
.icon--primary { color: var(--color-primary); }
.icon--sm { width: 16px; height: 16px; }
.icon--lg { width: 32px; height: 32px; }
```

### Accessible SVG Icons

- Decorative icons: use `aria-hidden="true"` to hide from screen readers.
- Meaningful icons: add `role="img"` and `<title>` inside the SVG.

```html
<svg role="img" aria-label="Notification bell" viewBox="0 0 24 24">
  <title>Notification bell</title>
  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
</svg>
```

### SVG Drawing Animation

```css
@keyframes draw {
  from { stroke-dashoffset: 100; }
  to   { stroke-dashoffset: 0; }
}

.icon--animated path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 1.5s ease forwards;
}
```

---

## 6. Advanced Grid Layouts

### Named Grid Lines

```css
.dashboard {
  display: grid;
  grid-template-columns:
    [sidebar-start] 260px
    [sidebar-end main-start] 1fr
    [main-end panel-start] 320px
    [panel-end];
}

.sidebar { grid-column: sidebar-start / sidebar-end; }
.main    { grid-column: main-start / main-end; }
```

### CSS Subgrid

Subgrid lets child elements participate in the parent's grid, aligning inner content across siblings.

```css
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card-list .card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 4; /* image, title, description, footer */
}
/* All card titles now align across cards */
```

### When to Use Grid vs Flexbox

| Scenario                         | Use         |
|----------------------------------|-------------|
| Page-level layout (2D)           | Grid        |
| Component internals (1D)         | Flexbox     |
| Rows AND columns simultaneously  | Grid        |
| Single row or column of items    | Flexbox     |
| Dashboard / admin layouts        | Grid + Flex |

### Combining Grid and Flexbox

```css
/* Grid for the page layout */
.app { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }

/* Flexbox for vertical navigation inside a grid area */
.app-nav { display: flex; flex-direction: column; gap: 0.5rem; }

/* Grid for the card grid inside main */
.app-main { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
```

---

## 7. Pseudo-Elements & Pseudo-Classes

### Pseudo-Elements

`::before` and `::after` insert virtual content. They require the `content` property.

```css
.section-title::after {
  content: '';
  display: block;
  width: 60px; height: 4px;
  background: var(--color-primary);
  margin-top: 0.5rem;
}

.required-label::after {
  content: ' *';
  color: var(--color-error);
}
```

### Advanced Pseudo-Classes

```css
/* Zebra-striped table rows */
tr:nth-child(odd) { background: #f9fafb; }

/* First 3 items only */
li:nth-child(-n+3) { font-weight: bold; }

/* :has() -- the parent selector */
.card:has(img) { padding-top: 0; }
.form-group:has(input:invalid) { border-left: 3px solid var(--color-error); }
.form-group:has(input:focus) label { color: var(--color-primary); }

/* :not() -- exclude elements */
a:not(.btn) { text-decoration: underline; }

/* :empty -- hide elements with no content */
.message:empty { display: none; }

/* :focus-visible -- keyboard focus only */
button:focus-visible { outline: 3px solid var(--color-primary); }
```

---

## 8. CSS Functions

### `calc()`

```css
.sidebar { width: calc(100vw - 260px); }
.content { min-height: calc(100vh - var(--header-height) - var(--footer-height)); }
```

### `min()`, `max()`, `clamp()`

```css
.container { width: min(1200px, 90%); margin: 0 auto; }
.sidebar { width: max(200px, 25%); }
.heading { font-size: clamp(1.5rem, 4vw, 3rem); }
```

`clamp(minimum, preferred, maximum)` -- the preferred value scales with the viewport but is constrained between the min and max. This often eliminates the need for media queries for typography.

### Fluid Spacing System

```css
:root {
  --space-fluid-sm: clamp(0.5rem, 1vw, 1rem);
  --space-fluid-md: clamp(1rem, 2vw, 2rem);
  --space-fluid-lg: clamp(1.5rem, 4vw, 4rem);
}
```

### CSS Counters

```css
.chapter-list { counter-reset: chapter; }
.chapter-list h2 { counter-increment: chapter; }
.chapter-list h2::before {
  content: "Chapter " counter(chapter) ": ";
  color: var(--color-primary);
}
```

### `env()` for Safe Areas

```css
.bottom-nav {
  padding-bottom: max(var(--space-4), env(safe-area-inset-bottom));
}
```

---

## Mid-Level Exercises

1. Build a theme customizer with CSS custom properties that lets users change primary color, border radius, and font size via form controls. All changes should update in real time via JavaScript.
2. Create a card flip animation using `transform`, `perspective`, and `backface-visibility`.
3. Build a complete component library (button, card, badge, alert, input) using BEM naming.
4. Audit a web page for accessibility: add proper ARIA attributes, focus styles, and skip navigation.
5. Create an SVG icon system with size and color variants controlled entirely via CSS.
6. Build a Kanban board layout using Grid for columns and Flexbox for card stacks.
7. Create a pricing table where `:has()` highlights the hovered card and `:nth-child(2)` emphasizes the middle plan.
8. Build an automatic table of contents using CSS counters for chapter and section numbering.

---

## Key Takeaways

- **CSS custom properties** are the foundation of modern theming and design tokens. They cascade, inherit, and can be updated at runtime.
- **Animations** should use `transform` and `opacity` for GPU-accelerated performance. Always respect `prefers-reduced-motion`.
- **BEM** keeps CSS flat, predictable, and scalable for teams.
- **Accessibility** is a requirement, not a feature. Use semantic HTML first, ARIA second.
- **Subgrid** solves cross-component alignment. Combine Grid and Flexbox for complex layouts.
- **`:has()`** reduces JavaScript dependencies for conditional styling.
- **`clamp()`** replaces many media queries for responsive typography and spacing.

---

## Recommended Videos

- **Kevin Powell** -- "Learn flexbox the easy way" -- https://www.youtube.com/watch?v=u044iM9xsWU
- **Kevin Powell** -- "Learn CSS Grid the easy way" -- https://www.youtube.com/watch?v=rg7Fvvl3taU
- **Slaying The Dragon** -- "Learn CSS Grid -- A 13 Minute Deep Dive" -- https://www.youtube.com/watch?v=EiNiSFIPIQE

---

## Next Steps

After completing this level, proceed to [HTML-CSS Senior](../HTML-CSS/Senior.md).
