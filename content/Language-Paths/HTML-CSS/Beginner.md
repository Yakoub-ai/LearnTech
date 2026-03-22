# HTML & CSS — Beginner Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/html-css/beginner)

## Topics Covered

- Semantic HTML Elements (including `<dialog>` and Popover API)
- Forms and Input Types
- CSS Selectors and Specificity
- The Box Model
- Flexbox Layout
- CSS Grid Layout
- Responsive Design and Media Queries
- Links, Images & Media

## Prerequisites

- No prior web development experience required
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor or IDE (VS Code recommended)

## Estimated Time

35 hours

---

## 1. Semantic HTML5

Semantic HTML means using elements that convey **meaning** about the content they contain, rather than relying solely on generic `<div>` and `<span>` tags.

### Why Semantics Matter

- **Accessibility:** Screen readers announce semantic elements by role ("navigation", "main content"), letting users jump between page regions.
- **SEO:** Search engines use element types to understand page structure and determine which content is most important.
- **Maintainability:** Code is self-documenting when tags describe their purpose.

### Core Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title — Site Name</title>
</head>
<body>
  <header>
    <h1>Site Name</h1>
    <nav aria-label="Primary navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>Article Title</h2>
      <p>Article content goes here.</p>

      <section>
        <h3>Sub-section Heading</h3>
        <p>Related grouped content.</p>
      </section>

      <figure>
        <img src="photo.jpg" alt="Description of the image" />
        <figcaption>Caption for the image</figcaption>
      </figure>
    </article>

    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="/topic">Related topic</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 Site Name</p>
  </footer>
</body>
</html>
```

### Key Semantic Elements

| Element       | Purpose                                                  |
|---------------|----------------------------------------------------------|
| `<header>`    | Introductory content for a page or section               |
| `<nav>`       | Navigation links (use `aria-label` when multiple navs)   |
| `<main>`      | The dominant, unique content of the page (only one!)     |
| `<article>`   | Self-contained content that could be distributed alone   |
| `<section>`   | Thematically related content grouped together            |
| `<aside>`     | Tangentially related content (sidebars, pull quotes)     |
| `<footer>`    | Footer of the nearest sectioning content or the page     |
| `<figure>`    | Self-contained media with an optional `<figcaption>`     |
| `<time>`      | Machine-readable date/time via `datetime` attribute      |
| `<details>`   | Native expandable/collapsible disclosure widget          |
| `<dialog>`    | Native modal or non-modal dialog box                     |

### The `<dialog>` Element

The `<dialog>` element provides native modal behavior: focus trapping, backdrop styling, and Escape-key dismissal -- no JavaScript library needed.

```html
<dialog id="myDialog">
  <h2>Welcome</h2>
  <p>This is a native modal.</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>
<button onclick="document.getElementById('myDialog').showModal()">
  Open Dialog
</button>
```

### The Popover API

Declarative popovers (tooltips, menus, toggletips) without JavaScript:

```html
<button popovertarget="my-popover">Help</button>
<div id="my-popover" popover>
  <p>Built-in light-dismiss behavior.</p>
</div>
```

---

## 2. Forms & Inputs

Forms are the primary mechanism for user interaction. HTML5 provides powerful built-in validation that works even when JavaScript is disabled.

### Building an Accessible Form

```html
<form action="/api/register" method="POST">
  <div class="form-group">
    <label for="name">Full Name</label>
    <input type="text" id="name" name="name"
           required minlength="2" maxlength="100"
           autocomplete="name" />
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email"
           required autocomplete="email" />
  </div>

  <div class="form-group">
    <label for="dob">Date of Birth</label>
    <input type="date" id="dob" name="dob"
           min="1920-01-01" max="2010-12-31" />
  </div>

  <fieldset>
    <legend>Preferred Role</legend>
    <input type="radio" id="fe" name="role" value="frontend" />
    <label for="fe">Front-End</label>
    <input type="radio" id="be" name="role" value="backend" />
    <label for="be">Back-End</label>
  </fieldset>

  <div class="form-group">
    <label for="lang">Language</label>
    <input type="text" id="lang" list="languages" />
    <datalist id="languages">
      <option value="JavaScript" />
      <option value="Python" />
      <option value="TypeScript" />
    </datalist>
  </div>

  <button type="submit">Register</button>
</form>
```

### Key Validation Attributes

| Attribute     | Purpose                                          |
|---------------|--------------------------------------------------|
| `required`    | Field must be filled before submission            |
| `minlength`   | Minimum character count                           |
| `maxlength`   | Maximum character count                           |
| `min` / `max` | Numeric or date range boundaries                  |
| `pattern`     | Regular expression the value must match           |
| `type="email"`| Built-in email format validation                  |
| `step`        | Allowed numeric increments                        |

### HTML5 Input Types

`text`, `email`, `url`, `tel`, `search`, `number`, `range`, `date`, `time`, `datetime-local`, `month`, `week`, `color`, `file`, `hidden`, `password`.

Each type triggers appropriate mobile keyboards and browser-native UI controls.

---

## 3. CSS Selectors & Specificity

Selectors determine which HTML elements your styles apply to. Specificity determines which rule wins when multiple selectors target the same element.

### Selector Types

| Selector              | Example               | Specificity |
|-----------------------|-----------------------|-------------|
| Type (element)        | `p`, `h1`             | 0-0-1       |
| Class                 | `.card`               | 0-1-0       |
| ID                    | `#header`             | 1-0-0       |
| Attribute             | `[type="email"]`      | 0-1-0       |
| Universal             | `*`                   | 0-0-0       |
| Pseudo-class          | `:hover`, `:focus`    | 0-1-0       |
| Pseudo-element        | `::before`, `::after` | 0-0-1       |

### Combinators

| Combinator         | Syntax    | Selects                                   |
|--------------------|-----------|-------------------------------------------|
| Descendant         | `A B`     | All B inside A at any depth               |
| Child              | `A > B`   | Only direct B children of A               |
| Adjacent sibling   | `A + B`   | The single B immediately after A          |
| General sibling    | `A ~ B`   | All B siblings that follow A              |

### Attribute Selectors

- `[attr^="val"]` -- starts with
- `[attr$="val"]` -- ends with
- `[attr*="val"]` -- contains

### Specificity Rules

1. Higher specificity always wins, regardless of source order.
2. When specificity is equal, the **last rule** in source order wins.
3. Inline styles beat all normal selectors.
4. `!important` beats everything (avoid using it).

```css
p { color: black; }           /* 0-0-1 */
.intro { color: blue; }       /* 0-1-0 -- wins over p */
#hero .intro { color: red; }  /* 1-1-0 -- wins over .intro */
```

---

## 4. The Box Model

Every HTML element is a rectangular box with four layers: **content**, **padding**, **border**, and **margin** (from inside out).

### `content-box` vs `border-box`

```css
/* content-box (default): width = content only */
.box { width: 300px; padding: 20px; border: 5px solid; }
/* Rendered width: 300 + 20 + 20 + 5 + 5 = 350px */

/* border-box: width includes padding + border */
.box { box-sizing: border-box; width: 300px; padding: 20px; border: 5px solid; }
/* Rendered width: 300px (content shrinks to 250px) */
```

### Best Practice: Global Reset

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

### Display Types

- **block** -- takes full width, starts on a new line (`div`, `p`, `h1`)
- **inline** -- only as wide as content, flows within text (`span`, `a`, `strong`)
- **inline-block** -- flows inline but respects width/height
- **none** -- removed from document flow entirely

### Margin Collapsing

Vertical margins between adjacent block elements collapse: the larger margin wins.

- Does NOT happen with flex/grid items, floated elements, or when padding/border separates them.

---

## 5. Flexbox

Flexbox is a one-dimensional layout model for distributing space along a single axis (row or column).

### Container Properties

```css
.flex-container {
  display: flex;
  flex-direction: row;          /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap;              /* nowrap | wrap | wrap-reverse */
  justify-content: center;     /* flex-start | flex-end | center | space-between | space-around | space-evenly */
  align-items: center;         /* stretch | flex-start | flex-end | center | baseline */
  gap: 1rem;                   /* space between items */
}
```

### Item Properties

```css
.flex-item {
  flex-grow: 1;       /* how much extra space to absorb */
  flex-shrink: 1;     /* how much to shrink if needed */
  flex-basis: 0%;     /* initial size before growing/shrinking */
  /* Shorthand: flex: 1;  equals flex: 1 1 0% */
  align-self: center; /* override align-items for this item */
  order: 0;           /* visual reordering (lower numbers first) */
}
```

### Common Patterns

```css
/* Perfect centering */
.center { display: flex; justify-content: center; align-items: center; min-height: 100dvh; }

/* Navigation bar */
.navbar { display: flex; align-items: center; justify-content: space-between; }

/* Wrapping card row */
.cards { display: flex; flex-wrap: wrap; gap: 1.5rem; }
.cards .card { flex: 1 1 300px; max-width: 400px; }
```

---

## 6. CSS Grid

CSS Grid is a two-dimensional layout system for rows AND columns simultaneously.

### Core Syntax

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* three equal columns */
  grid-template-rows: auto 1fr auto;
  gap: 1.5rem;
}
```

### Named Areas

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  grid-template-columns: 220px 1fr 280px;
}
.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
.aside  { grid-area: aside; }
.footer { grid-area: footer; }
```

### Responsive Grid Without Media Queries

```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
```

### `auto-fit` vs `auto-fill`

- **auto-fit**: empty columns collapse, items stretch to fill space.
- **auto-fill**: empty columns are preserved, items do not over-stretch.

### Spanning Items

```css
.featured { grid-column: 1 / 3; }    /* span 2 columns */
.full-width { grid-column: 1 / -1; } /* span all columns */
.tall { grid-row: span 2; }          /* span 2 rows */
```

---

## 7. Responsive Design

Responsive design ensures your site works on all screen sizes. The core tools are media queries, relative units, and a mobile-first approach.

### Mobile-First Pattern

```css
/* Base styles (mobile) */
.container { width: 100%; padding: 0 1rem; }
.cards { grid-template-columns: 1fr; }

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .container { max-width: 720px; margin: 0 auto; }
  .cards { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container { max-width: 960px; }
  .cards { grid-template-columns: repeat(3, 1fr); }
}
```

### Relative Units

| Unit  | Relative to                                         |
|-------|-----------------------------------------------------|
| `rem` | Root (`<html>`) font size (typically 16px)          |
| `em`  | Parent element's font size                          |
| `vw`  | 1% of viewport width                               |
| `vh`  | 1% of viewport height                              |
| `dvh` | 1% of dynamic viewport height (mobile-safe)        |
| `ch`  | Width of the "0" character in the current font      |
| `%`   | Parent element's dimension                          |

### Fluid Typography with `clamp()`

```css
h1 { font-size: clamp(1.75rem, 5vw, 3.5rem); }
p  { font-size: clamp(1rem, 2.5vw, 1.25rem); }
```

This scales with viewport width but never goes below the minimum or above the maximum.

### The Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Without this tag, mobile browsers render at ~980px wide and shrink everything down.

---

## 8. Links, Images & Media

### Responsive Images

```html
<img src="photo.jpg"
     srcset="photo-400.jpg 400w, photo-800.jpg 800w"
     sizes="(min-width: 768px) 50vw, 100vw"
     alt="Description of image content"
     width="800" height="600"
     loading="lazy" decoding="async" />
```

Key attributes:
- **`alt`**: Required for accessibility; describes image content for screen readers.
- **`width` / `height`**: Prevents layout shift (CLS) as the image loads.
- **`loading="lazy"`**: Defers loading until near the viewport.
- **`srcset` / `sizes`**: Lets the browser choose the best source for the device.

### The `<picture>` Element (Art Direction)

```html
<picture>
  <source media="(min-width: 1024px)" srcset="wide.avif" type="image/avif" />
  <source media="(min-width: 640px)" srcset="medium.webp" type="image/webp" />
  <img src="small.jpg" alt="Descriptive text" width="800" height="400" />
</picture>
```

### Video and Audio

```html
<video controls width="640" height="360" poster="poster.jpg" preload="metadata">
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
  <track kind="captions" src="captions-en.vtt" srclang="en" label="English" default />
</video>
```

### Link Best Practices

```html
<!-- External links: security attributes -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External</a>

<!-- Skip navigation for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Download link -->
<a href="/files/doc.pdf" download="document.pdf">Download PDF</a>
```

### Responsive Image CSS

```css
img { max-width: 100%; height: auto; display: block; }

.video-wrapper iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
}
```

---

## Beginner Exercises

1. Build a personal portfolio page using only semantic HTML elements (no `<div>` for structure).
2. Create a registration form with at least 6 input types and proper validation attributes.
3. Style a card component using the box model with `border-box` sizing.
4. Build a responsive navigation bar with Flexbox that collapses on mobile.
5. Create a responsive photo gallery using `auto-fit` Grid without media queries.
6. Build a full page layout (header, sidebar, main, footer) using Grid named areas.
7. Make the layout responsive using mobile-first media queries.
8. Implement a responsive image gallery with `<picture>`, `srcset`, `lazy` loading, and proper `alt` text.

---

## Key Takeaways

- Use **semantic HTML** to communicate meaning to browsers, search engines, and assistive technologies.
- Use **native form validation** attributes to reduce JavaScript and improve reliability.
- Understand **specificity** to write predictable CSS and avoid `!important`.
- Use **`border-box`** globally to simplify layout math.
- Use **Flexbox** for one-dimensional component layouts and **Grid** for two-dimensional page layouts.
- Always design **mobile-first** and use `min-width` media queries to enhance for larger screens.
- Optimize images with **`srcset`**, **`loading="lazy"`**, and **`width`/`height`** attributes.

---

## Recommended Videos

- **freeCodeCamp** -- "Learn HTML5 and CSS3 From Scratch -- Full Course" -- https://www.youtube.com/watch?v=mU6anWqZJcc
- **Fireship** -- "HTML in 100 Seconds" -- https://www.youtube.com/watch?v=ok-plXXHlWw
- **freeCodeCamp** -- "CSS Tutorial -- Full Course for Beginners" -- https://www.youtube.com/watch?v=OXGznpKZ_sA

---

## Next Steps

After completing this level, proceed to [HTML-CSS Mid](../HTML-CSS/Mid.md).
