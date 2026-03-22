export const content = {
  beginner: `# HTML & CSS — Beginner Deep Dive

Welcome to the foundational deep dive into **HTML & CSS**. These two technologies form the bedrock of every website on the internet. HTML provides the structure and meaning, while CSS controls the visual presentation. Mastering them is essential for every web developer, regardless of specialization.

> **Role connection:** Whether you become a front-end engineer, full-stack developer, or even a back-end developer who occasionally touches templates, understanding semantic HTML and CSS layout is non-negotiable. Designers, QA engineers, and product managers also benefit from knowing how the web is built.

---

## 1. Semantic HTML5

Semantic HTML means using elements that convey **meaning** about the content they contain, rather than relying solely on generic \\\`<div>\\\` and \\\`<span>\\\` tags. HTML5 introduced a rich set of semantic elements that improve accessibility, SEO, and code readability.

### DOM Parsing Pipeline

\\\`\\\`\\\`mermaid
flowchart TB
    A[HTML Source] --> B[Tokenizer]
    B --> C[Token Stream]
    C --> D[Tree Builder]
    D --> E[DOM Tree]
    E --> F[CSSOM Merge]
    F --> G[Render Tree]
    G --> H[Layout and Paint]
\\\`\\\`\\\`

### Why Semantic Elements Matter

Before HTML5, developers structured pages almost entirely with \\\`<div>\\\` elements, adding classes like \\\`class="header"\\\` or \\\`class="nav"\\\` to indicate purpose. Search engines and assistive technologies had to guess what each \\\`<div>\\\` meant. Semantic elements remove that guesswork.

**Why it matters:** Screen readers announce semantic elements by role (e.g., "navigation" or "main content"), enabling users with disabilities to jump between sections. Search engines use semantic structure to better understand and rank your pages.

### Core Semantic Elements

\\\`\\\`\\\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Semantic HTML5 Example</title>
</head>
<body>

  <!-- The <header> element represents introductory content -->
  <!-- Typically contains the site logo, title, and primary navigation -->
  <header>
    <h1>Tech Hubben Learning</h1>
    <nav aria-label="Primary navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- The <main> element wraps the dominant content of the page -->
  <!-- There should be only ONE <main> per page -->
  <main>
    <!-- <article> is a self-contained composition that could be -->
    <!-- independently distributed or reused (blog post, news story) -->
    <article>
      <h2>Understanding Semantic HTML</h2>
      <p>Published on <time datetime="2026-03-15">March 15, 2026</time></p>

      <!-- <section> groups thematically related content -->
      <section>
        <h3>What Are Semantic Elements?</h3>
        <p>Semantic elements clearly describe their meaning to both
           the browser and the developer.</p>
      </section>

      <section>
        <h3>Benefits of Semantic HTML</h3>
        <p>Improved accessibility, better SEO, and cleaner code.</p>
      </section>

      <!-- <figure> wraps self-contained content like images, -->
      <!-- diagrams, or code snippets with an optional caption -->
      <figure>
        <img src="/images/semantic-diagram.png"
             alt="Diagram showing semantic HTML5 element hierarchy" />
        <figcaption>Figure 1: Semantic HTML5 element hierarchy</figcaption>
      </figure>
    </article>

    <!-- <aside> holds content tangentially related to the main content -->
    <aside>
      <h3>Related Articles</h3>
      <ul>
        <li><a href="/css-basics">CSS Basics</a></li>
        <li><a href="/accessibility">Web Accessibility</a></li>
      </ul>
    </aside>
  </main>

  <!-- The <footer> element represents the footer of its nearest -->
  <!-- sectioning content or the entire page -->
  <footer>
    <p>&copy; 2026 Tech Hubben Learning. All rights reserved.</p>
    <nav aria-label="Footer navigation">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
    </nav>
  </footer>

</body>
</html>
\\\`\\\`\\\`

### The \\\`<details>\\\` and \\\`<summary>\\\` Elements

These elements provide native, interactive disclosure widgets without JavaScript:

\\\`\\\`\\\`html
<!-- <details> creates an expandable/collapsible section -->
<!-- The <summary> is the always-visible clickable heading -->
<details>
  <summary>What browsers support semantic HTML5?</summary>
  <p>All modern browsers fully support HTML5 semantic elements.
     For legacy IE support, you can use the html5shiv polyfill,
     though this is rarely needed in 2026.</p>
</details>

<details open>
  <!-- The "open" attribute makes it expanded by default -->
  <summary>Can I nest semantic elements?</summary>
  <p>Yes! For example, an <code>&lt;article&gt;</code> can contain
     multiple <code>&lt;section&gt;</code> elements, each with its
     own <code>&lt;header&gt;</code> and <code>&lt;footer&gt;</code>.</p>
</details>

<!-- EXERCISE: Create a FAQ page with at least 5 <details> elements -->
<!-- covering HTML5 semantic elements. Each answer should contain -->
<!-- at least one code example. -->
\\\`\\\`\\\`

### The \\\`<dialog>\\\` Element

The \\\`<dialog>\\\` element provides a native modal or non-modal dialog box. It handles focus trapping, backdrop styling, and the Escape key automatically — no JavaScript library needed.

\\\`\\\`\\\`html
<!-- A native modal dialog -->
<dialog id="myDialog">
  <h2>Welcome!</h2>
  <p>This is a native HTML dialog element.</p>
  <form method="dialog">
    <!-- method="dialog" closes the dialog on submit -->
    <button>Close</button>
  </form>
</dialog>

<button onclick="document.getElementById('myDialog').showModal()">
  Open Dialog
</button>
\\\`\\\`\\\`

### The Popover API

The Popover API provides a declarative way to create tooltips, menus, and toggletips without JavaScript. Elements with the \\\`popover\\\` attribute are hidden by default and dismiss when clicking outside.

\\\`\\\`\\\`html
<!-- Declarative popover — no JavaScript required -->
<button popovertarget="my-popover">Help</button>

<div id="my-popover" popover>
  <p>This is a popover with built-in light dismiss behavior.</p>
</div>
\\\`\\\`\\\`

> **Role connection:** Front-end developers structure every page with these elements. Accessibility specialists audit sites for proper semantic usage. Even back-end developers writing server-rendered templates need to produce semantically correct HTML.

---

## 2. Forms & Inputs

Forms are the primary way users interact with web applications — from login screens to search bars to multi-step wizards. HTML5 introduced powerful built-in validation and new input types that reduce the need for JavaScript.

### Building a Complete Form

\\\`\\\`\\\`html
<!-- The <form> element groups all form controls -->
<!-- action: where data is sent; method: HTTP method -->
<form action="/api/register" method="POST" novalidate>

  <!-- Always wrap inputs with <label> for accessibility -->
  <!-- The "for" attribute must match the input's "id" -->
  <div class="form-group">
    <label for="fullName">Full Name</label>
    <input
      type="text"
      id="fullName"
      name="fullName"
      required
      minlength="2"
      maxlength="100"
      placeholder="Enter your full name"
      autocomplete="name"
    />
    <!-- The "required" attribute prevents form submission if empty -->
    <!-- "minlength" and "maxlength" set character limits -->
  </div>

  <div class="form-group">
    <label for="email">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder="you@example.com"
      autocomplete="email"
    />
    <!-- type="email" triggers built-in email format validation -->
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
      pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      title="Must contain at least one number, one uppercase
             and lowercase letter, and at least 8 characters"
      autocomplete="new-password"
    />
    <!-- "pattern" uses a regex for custom validation rules -->
    <!-- "title" shows on hover and in validation messages -->
  </div>

  <div class="form-group">
    <label for="birthdate">Date of Birth</label>
    <input
      type="date"
      id="birthdate"
      name="birthdate"
      min="1920-01-01"
      max="2010-12-31"
    />
    <!-- type="date" provides a native date picker -->
  </div>

  <div class="form-group">
    <label for="experience">Years of Experience</label>
    <input
      type="number"
      id="experience"
      name="experience"
      min="0"
      max="50"
      step="1"
      value="0"
    />
  </div>

  <!-- Grouping related controls with <fieldset> and <legend> -->
  <fieldset>
    <legend>Preferred Role</legend>

    <div>
      <input type="radio" id="frontend" name="role" value="frontend" />
      <label for="frontend">Front-End Developer</label>
    </div>
    <div>
      <input type="radio" id="backend" name="role" value="backend" />
      <label for="backend">Back-End Developer</label>
    </div>
    <div>
      <input type="radio" id="fullstack" name="role" value="fullstack" checked />
      <label for="fullstack">Full-Stack Developer</label>
    </div>
  </fieldset>

  <!-- Dropdown select -->
  <div class="form-group">
    <label for="framework">Favorite Framework</label>
    <select id="framework" name="framework">
      <option value="" disabled selected>Choose one...</option>
      <optgroup label="JavaScript">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
      </optgroup>
      <optgroup label="CSS">
        <option value="tailwind">Tailwind CSS</option>
        <option value="bootstrap">Bootstrap</option>
      </optgroup>
    </select>
  </div>

  <!-- Textarea for multi-line input -->
  <div class="form-group">
    <label for="bio">Short Bio</label>
    <textarea
      id="bio"
      name="bio"
      rows="4"
      maxlength="500"
      placeholder="Tell us about yourself..."
    ></textarea>
  </div>

  <!-- Checkbox for boolean options -->
  <div class="form-group">
    <input type="checkbox" id="terms" name="terms" required />
    <label for="terms">I agree to the Terms of Service</label>
  </div>

  <button type="submit">Register</button>
  <button type="reset">Clear Form</button>
</form>

<!-- EXERCISE: Build a contact form with fields for name, email, -->
<!-- subject (dropdown), message (textarea), and a file upload. -->
<!-- Use appropriate validation attributes on every field. -->
\\\`\\\`\\\`

### HTML5 Input Types Reference

\\\`\\\`\\\`html
<!-- These input types provide built-in UI and validation -->
<input type="text" />       <!-- Plain text -->
<input type="email" />      <!-- Email validation -->
<input type="url" />        <!-- URL validation -->
<input type="tel" />        <!-- Telephone (mobile keyboard) -->
<input type="search" />     <!-- Search with clear button -->
<input type="number" />     <!-- Numeric with spinners -->
<input type="range" />      <!-- Slider control -->
<input type="date" />       <!-- Date picker -->
<input type="time" />       <!-- Time picker -->
<input type="datetime-local" /> <!-- Date + time picker -->
<input type="month" />      <!-- Month/year picker -->
<input type="week" />       <!-- Week picker -->
<input type="color" />      <!-- Color picker -->
<input type="file" />       <!-- File upload -->
<input type="hidden" />     <!-- Hidden data -->

<!-- The datalist element provides autocomplete suggestions -->
<input type="text" list="languages" id="langInput" />
<datalist id="languages">
  <option value="JavaScript" />
  <option value="Python" />
  <option value="TypeScript" />
  <option value="Rust" />
  <option value="Go" />
</datalist>
\\\`\\\`\\\`

**Why it matters:** Proper form construction is critical for usability, accessibility, and data quality. Native validation attributes reduce JavaScript bundle size, improve performance, and work even when scripts fail to load.

---

## 3. CSS Selectors & Specificity

Selectors determine which HTML elements your styles apply to. Understanding specificity — how the browser decides which rule wins when multiple rules target the same element — is fundamental to writing predictable CSS.

### Selector Types

\\\`\\\`\\\`css
/* --- Type (element) selectors --- */
/* Targets ALL elements of that type */
/* Specificity: 0-0-1 */
p {
  line-height: 1.6;
}

h1 {
  font-size: 2.5rem;
}

/* --- Class selectors --- */
/* Targets elements with the specified class */
/* Specificity: 0-1-0 */
.card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
}

.card--featured {
  border-color: #3b82f6;
}

/* --- ID selectors --- */
/* Targets the ONE element with that ID */
/* Specificity: 1-0-0 (very high — use sparingly!) */
#main-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

/* --- Attribute selectors --- */
/* Target elements based on their attributes */
/* Specificity: 0-1-0 (same as a class) */
input[type="email"] {
  background-image: url('/icons/email.svg');
  background-repeat: no-repeat;
  padding-inline-start: 2rem;
}

a[href^="https://"] {
  /* ^= means "starts with" */
  color: green;
}

a[href$=".pdf"] {
  /* $= means "ends with" */
  color: red;
}

a[href*="example"] {
  /* *= means "contains" */
  text-decoration: underline;
}

/* --- Universal selector --- */
/* Matches everything; specificity: 0-0-0 */
* {
  margin: 0;
  padding: 0;
}
\\\`\\\`\\\`

### Combinators

\\\`\\\`\\\`css
/* Descendant combinator (space) */
/* Selects ALL <p> elements inside .article, at any depth */
.article p {
  margin-bottom: 1em;
}

/* Child combinator (>) */
/* Selects only DIRECT <li> children of .nav-list */
.nav-list > li {
  display: inline-block;
}

/* Adjacent sibling combinator (+) */
/* Selects the <p> immediately after an <h2> */
h2 + p {
  font-size: 1.125rem;
  color: #4a5568;
}

/* General sibling combinator (~) */
/* Selects ALL <p> elements that follow an <h2> at the same level */
h2 ~ p {
  line-height: 1.8;
}

/* Combining multiple selectors */
/* A nav link that is hovered and has the .active class */
nav a.active:hover {
  color: #2563eb;
  text-decoration: none;
}
\\\`\\\`\\\`

### Specificity Calculation

\\\`\\\`\\\`css
/*
Specificity is calculated as a three-part value: (ID, Class, Type)

  Selector                  | Specificity
  --------------------------|-----------
  p                         | 0-0-1
  .card                     | 0-1-0
  p.card                    | 0-1-1
  #header                   | 1-0-0
  #header .nav a            | 1-1-1
  #header .nav a:hover      | 1-2-1
  style="..."  (inline)     | Beats all normal rules
  !important                | Beats inline (avoid this!)

  Higher specificity always wins, regardless of source order.
  When specificity is equal, the LAST rule in source order wins.
*/

/* Example: Which color wins? */
p { color: black; }            /* 0-0-1 */
.intro { color: blue; }       /* 0-1-0  — this wins over the p rule */
#hero .intro { color: red; }  /* 1-1-0  — this wins over .intro */

/* EXERCISE: Calculate the specificity of each selector below */
/* and determine which background-color would be applied to */
/* <div id="app" class="container main"> */
/*   div            -> ??? */
/*   .container     -> ??? */
/*   div.container  -> ??? */
/*   #app           -> ??? */
/*   #app.container -> ??? */
\\\`\\\`\\\`

**Why it matters:** Specificity bugs are among the most common CSS issues. Understanding how specificity works prevents the temptation to use \\\`!important\\\` everywhere, leading to maintainable stylesheets.

> **Role connection:** Every front-end developer spends significant time debugging CSS specificity issues. Understanding the cascade and specificity model saves hours of frustration and produces cleaner code.

---

## 4. The Box Model

Every HTML element is a rectangular box. The CSS box model describes how the browser calculates the total size of each element by combining content, padding, border, and margin.

### Box Model Layers

\\\`\\\`\\\`mermaid
flowchart LR
    A[Content] --> B[Padding]
    B --> C[Border]
    C --> D[Margin]
    A --- A1["Actual text or image"]
    B --- B1["Space inside border"]
    C --- C1["Visible edge"]
    D --- D1["Space outside border"]
\\\`\\\`\\\`

\\\`\\\`\\\`css
/*
  The Box Model (from inside out):

  +----------------------------------+
  |            MARGIN                |
  |  +---------------------------+   |
  |  |         BORDER            |   |
  |  |  +--------------------+   |   |
  |  |  |      PADDING       |   |   |
  |  |  |  +-------------+   |   |   |
  |  |  |  |   CONTENT   |   |   |   |
  |  |  |  +-------------+   |   |   |
  |  |  +--------------------+   |   |
  |  +---------------------------+   |
  +----------------------------------+
*/

/* Without box-sizing: border-box */
/* Total width = width + padding-left + padding-right
                       + border-left + border-right */
.box-content {
  box-sizing: content-box; /* default behavior */
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width: 300 + 20 + 20 + 5 + 5 = 350px */
}

/* With box-sizing: border-box */
/* Total width = width (padding and border included) */
.box-border {
  box-sizing: border-box; /* much easier to work with */
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width: 300px (content shrinks to 250px) */
}

/* Best practice: Apply border-box globally */
*,
*::before,
*::after {
  box-sizing: border-box;
}
\\\`\\\`\\\`

### Display Types

\\\`\\\`\\\`css
/* Block elements take the full available width */
/* They start on a new line */
.block-element {
  display: block;
  /* <div>, <p>, <h1>-<h6>, <section> are block by default */
}

/* Inline elements only take as much width as needed */
/* They flow within text; width/height have no effect */
.inline-element {
  display: inline;
  /* <span>, <a>, <strong>, <em> are inline by default */
  /* width: 200px;  <-- this would be IGNORED */
}

/* Inline-block: flows inline but respects width/height */
.inline-block-element {
  display: inline-block;
  width: 200px;
  height: 100px;
  vertical-align: top;
}

/* None: removes the element from the document flow entirely */
.hidden {
  display: none;
  /* The element is not rendered and takes up no space */
  /* Compare with visibility: hidden which hides but keeps space */
}
\\\`\\\`\\\`

### Margin Collapsing

\\\`\\\`\\\`css
/*
  Vertical margins collapse: when two block elements are stacked,
  their vertical margins don't add up — the larger one wins.
*/

.paragraph-a {
  margin-bottom: 20px;
}

.paragraph-b {
  margin-top: 30px;
}

/*
  The gap between .paragraph-a and .paragraph-b is 30px, NOT 50px.
  This is margin collapsing — the larger margin wins.

  Margin collapsing does NOT happen:
  - With horizontal (left/right) margins
  - On flex or grid items
  - When there is padding or border between elements
  - On floated or absolutely positioned elements
*/

/* EXERCISE: Create a card component that is 350px wide, has */
/* 24px of internal spacing, a 2px border, and 16px of space */
/* between cards. Use border-box sizing. Calculate the content */
/* area width. */
\\\`\\\`\\\`

**Why it matters:** If you do not understand the box model, every layout you build will behave unpredictably. The \\\`border-box\\\` fix alone prevents countless layout bugs.

---

## 5. Flexbox

Flexbox is a one-dimensional layout model designed for distributing space among items in a container. It excels at alignment, direction, and order control.

### Flex Container Properties

\\\`\\\`\\\`css
/* A flex container is created with display: flex */
.flex-container {
  display: flex;

  /* flex-direction: controls the main axis */
  flex-direction: row;           /* default: left to right */
  /* flex-direction: row-reverse;   right to left */
  /* flex-direction: column;        top to bottom */
  /* flex-direction: column-reverse; bottom to top */

  /* flex-wrap: should items wrap to new lines? */
  flex-wrap: nowrap;             /* default: single line */
  /* flex-wrap: wrap;               wrap to new lines */
  /* flex-wrap: wrap-reverse;       wrap upward */

  /* Shorthand: flex-flow combines direction + wrap */
  /* flex-flow: row wrap; */

  /* justify-content: alignment along the MAIN axis */
  justify-content: flex-start;   /* default: packed at start */
  /* justify-content: flex-end;     packed at end */
  /* justify-content: center;       centered */
  /* justify-content: space-between; first/last at edges, equal gaps */
  /* justify-content: space-around;  equal space around each item */
  /* justify-content: space-evenly;  equal space between all */

  /* align-items: alignment along the CROSS axis */
  align-items: stretch;          /* default: fill container height */
  /* align-items: flex-start;      top of container */
  /* align-items: flex-end;        bottom of container */
  /* align-items: center;          vertically centered */
  /* align-items: baseline;        aligned by text baseline */

  /* gap: space BETWEEN flex items (modern approach) */
  gap: 1rem;
}
\\\`\\\`\\\`

### Flex Item Properties

\\\`\\\`\\\`css
.flex-item {
  /* flex-grow: how much extra space should this item take? */
  /* 0 = don't grow (default), 1 = take equal share */
  flex-grow: 0;

  /* flex-shrink: how much should this item shrink? */
  /* 1 = shrink equally (default), 0 = don't shrink */
  flex-shrink: 1;

  /* flex-basis: the initial size before growing/shrinking */
  /* auto = use width/height, or a specific value like 200px */
  flex-basis: auto;

  /* Shorthand: flex combines grow, shrink, basis */
  /* flex: 1;           same as flex: 1 1 0% */
  /* flex: 0 0 200px;   fixed 200px, won't grow or shrink */
  /* flex: 2 1 auto;    grows 2x, shrinks normally */

  /* align-self: override align-items for this item only */
  align-self: center;

  /* order: change visual order without changing HTML */
  order: 0; /* default; lower numbers appear first */
}
\\\`\\\`\\\`

### Practical Flexbox Layouts

\\\`\\\`\\\`html
<!-- Classic navigation bar -->
<nav class="navbar">
  <a href="/" class="logo">TechHub</a>
  <ul class="nav-links">
    <li><a href="/courses">Courses</a></li>
    <li><a href="/paths">Paths</a></li>
    <li><a href="/community">Community</a></li>
  </ul>
  <div class="nav-actions">
    <button class="btn btn-outline">Log In</button>
    <button class="btn btn-primary">Sign Up</button>
  </div>
</nav>
\\\`\\\`\\\`

\\\`\\\`\\\`css
/* Navigation bar using flexbox */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #1a202c;
  color: white;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-actions {
  display: flex;
  gap: 0.75rem;
}

/* Centering an element perfectly (the "holy grail" of CSS) */
.perfect-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh; /* dvh accounts for mobile browser chrome */
}

/* Card row that wraps */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card-grid .card {
  flex: 1 1 300px; /* grow, shrink, minimum 300px */
  max-width: 400px;
}

/* EXERCISE: Create a footer with three columns: */
/* company info (left), navigation links (center), */
/* and social media icons (right). Use flexbox to */
/* distribute them evenly. On small screens, they */
/* should stack vertically. */
\\\`\\\`\\\`

**Why it matters:** Flexbox solves layout problems that plagued CSS for years — vertical centering, equal-height columns, and dynamic spacing. It is the go-to tool for component-level layouts.

---

## 6. CSS Grid

CSS Grid is a two-dimensional layout system that handles both rows and columns simultaneously. It is ideal for page-level layouts and complex grid-based designs.

### Grid Container Properties

\\\`\\\`\\\`css
.grid-container {
  display: grid;

  /* Define columns using grid-template-columns */
  /* Three equal columns using the fr (fraction) unit */
  grid-template-columns: 1fr 1fr 1fr;

  /* Shorthand: repeat(count, size) */
  /* grid-template-columns: repeat(3, 1fr); */

  /* Mixed units: fixed sidebar + flexible main + fixed aside */
  /* grid-template-columns: 250px 1fr 200px; */

  /* Define rows */
  grid-template-rows: auto 1fr auto;

  /* gap: space between grid cells */
  gap: 1.5rem;
  /* Or separately: row-gap and column-gap */

  /* grid-template-areas: name regions of the grid */
  grid-template-areas:
    "header  header  header"
    "sidebar main    aside"
    "footer  footer  footer";
}

/* Place items into named areas */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.aside   { grid-area: aside; }
.footer  { grid-area: footer; }
\\\`\\\`\\\`

### Auto-Fit and Auto-Fill

\\\`\\\`\\\`css
/* Responsive grid WITHOUT media queries */
.responsive-grid {
  display: grid;
  gap: 1.5rem;

  /* auto-fit: columns expand to fill available space */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* auto-fill: keeps empty columns if there is space */
.auto-fill-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/*
  auto-fit vs auto-fill:
  - auto-fit: if there are fewer items than columns, items STRETCH
  - auto-fill: if there are fewer items than columns, empty tracks remain
*/
\\\`\\\`\\\`

### Placing Items on the Grid

\\\`\\\`\\\`css
/* Grid items can span multiple columns/rows */
.featured-card {
  /* Span from column line 1 to column line 3 (2 columns) */
  grid-column: 1 / 3;

  /* Span 2 rows */
  grid-row: span 2;
}

.full-width {
  /* Span all columns, regardless of how many there are */
  grid-column: 1 / -1;
}
\\\`\\\`\\\`

### Complete Page Layout

\\\`\\\`\\\`html
<div class="page-layout">
  <header class="page-header">Header</header>
  <nav class="page-nav">Navigation</nav>
  <main class="page-main">
    <h2>Main Content</h2>
    <div class="card-grid">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
      <div class="card">Card 4</div>
      <div class="card">Card 5</div>
      <div class="card">Card 6</div>
    </div>
  </main>
  <aside class="page-sidebar">Sidebar</aside>
  <footer class="page-footer">Footer</footer>
</div>
\\\`\\\`\\\`

\\\`\\\`\\\`css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header  header"
    "nav    main    sidebar"
    "footer footer  footer";
  grid-template-columns: 220px 1fr 280px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 0;
}

.page-header  { grid-area: header;  background: #1a202c; color: white; padding: 1rem; }
.page-nav     { grid-area: nav;     background: #f7fafc; padding: 1rem; }
.page-main    { grid-area: main;    padding: 2rem; }
.page-sidebar { grid-area: sidebar; background: #f7fafc; padding: 1rem; }
.page-footer  { grid-area: footer;  background: #2d3748; color: white; padding: 1rem; }

/* Nested responsive card grid inside main */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

/* EXERCISE: Build a photo gallery layout where the first image */
/* spans 2 columns and 2 rows, while the rest are 1x1. Use */
/* grid-template-columns with auto-fit and minmax. */
\\\`\\\`\\\`

**Why it matters:** CSS Grid is the most powerful layout tool in CSS. Combined with Flexbox, you can build any layout imaginable without hacks, floats, or external frameworks.

> **Role connection:** Grid is essential for front-end developers building dashboards, landing pages, and any multi-column layout. Understanding when to use Grid vs. Flexbox is a key interview topic.

---

## 7. Responsive Design

Responsive design ensures your website works well on all screen sizes — from phones to ultra-wide monitors. The core tools are media queries, relative units, and a mobile-first approach.

### Mobile-First Approach

\\\`\\\`\\\`css
/*
  Mobile-first means you write base styles for mobile,
  then use min-width media queries to ADD styles for larger screens.
  This is the recommended approach because:
  1. Mobile styles are simpler (single column)
  2. Mobile users don't download desktop CSS
  3. It forces you to prioritize content
*/

/* Base styles (mobile) */
.container {
  width: 100%;
  padding: 0 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet (768px and up) */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }

  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px and up) */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }

  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large desktop (1280px and up) */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }

  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
\\\`\\\`\\\`

### Relative Units

\\\`\\\`\\\`css
/*
  Relative units scale with context, making designs flexible.

  rem  — relative to root font-size (usually 16px)
  em   — relative to parent's font-size
  %    — relative to parent's dimension
  vw   — 1% of viewport width
  vh   — 1% of viewport height
  dvh  — 1% of dynamic viewport height (accounts for mobile browser chrome)
  svh  — 1% of small viewport height (smallest possible viewport)
  lvh  — 1% of large viewport height (largest possible viewport)
  vmin — 1% of the smaller viewport dimension
  vmax — 1% of the larger viewport dimension
  ch   — width of the "0" character in the current font
*/

html {
  font-size: 16px; /* 1rem = 16px */
}

body {
  font-size: 1rem;       /* 16px */
  line-height: 1.5;       /* 24px (1.5 * 16px) */
}

h1 {
  font-size: 2.5rem;     /* 40px */
}

h2 {
  font-size: 2rem;       /* 32px */
}

/* Fluid typography: scales between a min and max size */
.fluid-heading {
  /* Minimum 1.5rem, preferred 4vw, maximum 3rem */
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Use ch units for readable line lengths */
.prose {
  max-width: 65ch; /* Roughly 65 characters per line — ideal for reading */
}

/* EXERCISE: Create a hero section that takes up the full viewport */
/* height, centers its content, and uses fluid typography for the */
/* heading (min 2rem, max 5rem). */
\\\`\\\`\\\`

### The Viewport Meta Tag

\\\`\\\`\\\`html
<!-- This tag is REQUIRED for responsive design to work on mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!--
  width=device-width — sets viewport width to the device width
  initial-scale=1.0  — sets the initial zoom level to 100%

  Without this tag, mobile browsers render the page at ~980px wide
  and then shrink it down, making everything tiny.
-->
\\\`\\\`\\\`

**Why it matters:** Over 50% of web traffic comes from mobile devices. A site that is not responsive loses half its potential audience. Mobile-first design also produces cleaner, more performant CSS.

---

## 8. Links, Images & Media

Properly handling links, images, and media elements is essential for performance, accessibility, and user experience.

### Responsive Images

\\\`\\\`\\\`html
<!-- The <picture> element provides art direction -->
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="/images/hero-wide.avif"
    type="image/avif"
  />
  <source
    media="(min-width: 1024px)"
    srcset="/images/hero-wide.webp"
    type="image/webp"
  />
  <source
    media="(min-width: 640px)"
    srcset="/images/hero-medium.webp"
    type="image/webp"
  />
  <img
    src="/images/hero-small.jpg"
    alt="Team collaborating on a web project"
    width="800"
    height="400"
    loading="lazy"
  />
</picture>

<!-- Using srcset for resolution switching -->
<img
  src="/images/profile-200.jpg"
  srcset="
    /images/profile-200.jpg 200w,
    /images/profile-400.jpg 400w,
    /images/profile-800.jpg 800w
  "
  sizes="
    (min-width: 1024px) 400px,
    (min-width: 640px) 50vw,
    100vw
  "
  alt="Portrait of a developer"
  width="400"
  height="400"
  loading="lazy"
  decoding="async"
/>

<!--
  Key attributes:
  - alt: REQUIRED for accessibility (describe the image content)
  - width/height: prevents layout shift (CLS) as the image loads
  - loading="lazy": defers loading until near the viewport
  - decoding="async": lets the browser decode off the main thread
-->
\\\`\\\`\\\`

### Video and Audio

\\\`\\\`\\\`html
<!-- HTML5 video with multiple formats -->
<video
  controls
  width="640"
  height="360"
  poster="/images/video-poster.jpg"
  preload="metadata"
>
  <source src="/videos/intro.webm" type="video/webm" />
  <source src="/videos/intro.mp4" type="video/mp4" />

  <!-- Captions for accessibility -->
  <track
    kind="captions"
    src="/captions/intro-en.vtt"
    srclang="en"
    label="English"
    default
  />

  <p>Your browser does not support HTML5 video.
     <a href="/videos/intro.mp4">Download the video</a>.</p>
</video>

<!-- HTML5 audio -->
<audio controls preload="metadata">
  <source src="/audio/podcast-ep1.ogg" type="audio/ogg" />
  <source src="/audio/podcast-ep1.mp3" type="audio/mpeg" />
  <p>Your browser does not support the audio element.</p>
</audio>

<!-- Responsive iframe for embedded content -->
<div class="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/rg7Fvvl3taU"
    title="Tutorial: CSS Grid Layout"
    allow="accelerometer; autoplay; clipboard-write;
           encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>
\\\`\\\`\\\`

\\\`\\\`\\\`css
/* Make iframes responsive with aspect-ratio */
.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 800px;
}

.video-wrapper iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 8px;
}

/* Responsive images should never overflow their container */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* EXERCISE: Create an image gallery page with at least 6 images */
/* using the <picture> element. Each image should have: */
/*   - AVIF and WebP sources for large screens */
/*   - A JPEG fallback */
/*   - Proper alt text */
/*   - Lazy loading */
/*   - Width and height attributes to prevent CLS */
\\\`\\\`\\\`

### Link Best Practices

\\\`\\\`\\\`html
<!-- External links should open in new tabs with security attributes -->
<a href="https://developer.mozilla.org"
   target="_blank"
   rel="noopener noreferrer">
  MDN Web Docs
</a>

<!-- Skip navigation link for keyboard/screen reader users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Download link -->
<a href="/files/cheatsheet.pdf" download="html-css-cheatsheet.pdf">
  Download Cheat Sheet (PDF)
</a>

<!-- Email and phone links -->
<a href="mailto:hello@techhub.dev">Email Us</a>
<a href="tel:+15551234567">Call Us</a>
\\\`\\\`\\\`

\\\`\\\`\\\`css
/* Style the skip link: hidden until focused */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: #1a202c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0 0 4px 4px;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
\\\`\\\`\\\`

**Why it matters:** Images often account for the majority of a page's total weight. Proper image optimization through responsive formats, lazy loading, and correct sizing can cut load times in half. Accessible links and media make your site usable by everyone.

> **Role connection:** Performance optimization through responsive images directly impacts Core Web Vitals scores, which affect SEO rankings and user experience metrics that product teams track.

---

## Beginner Level Summary

\\\`\\\`\\\`mermaid
graph TD
    A[HTML & CSS Fundamentals] --> B[Semantic HTML5]
    A --> C[Forms & Inputs]
    A --> D[CSS Selectors]
    A --> E[Box Model]
    A --> F[Flexbox]
    A --> G[CSS Grid]
    A --> H[Responsive Design]
    A --> I[Links Images & Media]

    B --> J[Accessible Structure]
    C --> J
    D --> K[Predictable Styling]
    E --> K
    F --> L[Modern Layouts]
    G --> L
    H --> M[Works Everywhere]
    I --> M

    J --> N[Production-Ready Web Pages]
    K --> N
    L --> N
    M --> N
\\\`\\\`\\\`

These eight topics form the complete foundation for building modern web pages. With semantic HTML, proper form handling, the box model, Flexbox, Grid, and responsive design, you can construct any layout and ensure it works across devices and is accessible to all users.

---

## Recommended Videos — Beginner

- **freeCodeCamp** — "Learn HTML5 and CSS3 From Scratch – Full Course" — https://www.youtube.com/watch?v=mU6anWqZJcc
- **Fireship** — "HTML in 100 Seconds" — https://www.youtube.com/watch?v=ok-plXXHlWw
- **freeCodeCamp** — "CSS Tutorial – Full Course for Beginners" — https://www.youtube.com/watch?v=OXGznpKZ_sA
`,
  mid: `# HTML & CSS — Mid-Level Deep Dive

Welcome to the mid-level deep dive. You have a solid foundation in HTML and CSS. Now it is time to learn the techniques that separate functional code from professional, scalable, and polished work. These topics cover maintainability, interactivity, accessibility, and advanced layout capabilities.

> **Role connection:** Mid-level front-end developers are expected to build component libraries, implement design systems, write accessible interfaces, and deliver smooth animations. These skills are also critical for full-stack developers building production UIs.

---

## 1. CSS Custom Properties (Variables)

CSS Custom Properties (commonly called CSS variables) enable dynamic, reusable values throughout your stylesheets. Unlike preprocessor variables (Sass/Less), they are live in the browser and can be updated at runtime with JavaScript.

### Defining and Using Variables

\\\`\\\`\\\`css
/* Define custom properties on :root for global scope */
:root {
  /* Color palette */
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #93c5fd;
  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Neutral scale */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Fira Code', 'Cascadia Code', monospace;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  /* Layout */
  --border-radius: 8px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}

/* Use variables with var() */
.button {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.button:hover {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
}
\\\`\\\`\\\`

### Fallback Values

\\\`\\\`\\\`css
/* var() accepts a second argument as a fallback */
.card {
  padding: var(--card-padding, 1.5rem);
  color: var(--card-text-color, var(--color-gray-800, #333));
  background: var(--card-bg, white);
  border-radius: var(--card-radius, var(--border-radius));
}
\\\`\\\`\\\`

### Theming with Custom Properties

\\\`\\\`\\\`css
/* Light theme (default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --border-color: #e5e7eb;
}

/* Dark theme via a data attribute on <html> or <body> */
[data-theme="dark"] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --border-color: #374151;
}

/* Also respect OS preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --border-color: #374151;
  }
}

/* Components automatically adapt */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color var(--transition-base),
              color var(--transition-base);
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}
\\\`\\\`\\\`

### Dynamic Updates via JavaScript

\\\`\\\`\\\`html
<div class="color-picker-demo">
  <label for="themeColor">Choose accent color:</label>
  <input type="color" id="themeColor" value="#3b82f6" />
</div>

<script>
  const colorInput = document.getElementById('themeColor');
  colorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty(
      '--color-primary', e.target.value
    );
  });

  // Read a custom property value
  const styles = getComputedStyle(document.documentElement);
  const currentPrimary = styles.getPropertyValue('--color-primary').trim();
</script>

<!-- EXERCISE: Create a theme customizer panel that lets users -->
<!-- adjust primary color, border-radius, and font-size using -->
<!-- range sliders and a color picker. All changes should be -->
<!-- reflected in real-time across the entire page via CSS variables. -->
\\\`\\\`\\\`

**Why it matters:** CSS Custom Properties are the foundation of modern theming and design tokens. They enable dark mode, user preferences, and dynamic styling without CSS-in-JS overhead.

> **Role connection:** Design system engineers and front-end architects use custom properties as the bridge between design tokens and implementation. This is a core skill for building themeable component libraries.

---

### CSS Cascade and Specificity Hierarchy

\\\`\\\`\\\`mermaid
flowchart TB
    A["Highest Priority"] --> B["Inline styles"]
    B --> C["ID selectors - 1-0-0"]
    C --> D["Class / Attribute / Pseudo-class - 0-1-0"]
    D --> E["Element / Pseudo-element - 0-0-1"]
    E --> F["Universal selector - 0-0-0"]
    F --> G["Inherited styles"]
    G --> H["Browser defaults"]
    H --> I["Lowest Priority"]
\\\`\\\`\\\`

### Layout Algorithm Choice

\\\`\\\`\\\`mermaid
flowchart LR
    A[Layout Need] --> B{What type?}
    B -->|"1D row or column"| C[Flexbox]
    B -->|"2D grid"| D[CSS Grid]
    B -->|"Text flow"| E[Normal Flow]
    B -->|"Overlapping layers"| F["Position absolute/fixed"]
    C --> G["justify-content, align-items"]
    D --> H["grid-template-rows/columns"]
    E --> I["Block and inline formatting"]
\\\`\\\`\\\`

## 2. Animations & Transitions

Smooth animations and transitions make interfaces feel responsive and polished. CSS provides two primary mechanisms: transitions for simple state changes and keyframe animations for complex sequences.

### Transitions

\\\`\\\`\\\`css
.button {
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  /* transition: property duration timing-function delay */
  transition: background-color 200ms ease,
              transform 200ms ease,
              box-shadow 200ms ease;
}

.button:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(59, 130, 246, 0.3);
}

/* Timing functions control the animation curve */
.ease-examples {
  /* ease:        slow start, fast middle, slow end (default) */
  /* linear:      constant speed */
  /* ease-in:     slow start, fast end */
  /* ease-out:    fast start, slow end */
  /* ease-in-out: slow start and end */
  /* cubic-bezier(x1, y1, x2, y2): custom curve */

  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
\\\`\\\`\\\`

### Keyframe Animations

\\\`\\\`\\\`css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Apply animations */
.fade-in-element {
  animation: fadeIn 0.6s ease-out forwards;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-gray-200);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Skeleton loading placeholder */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}
\\\`\\\`\\\`

### Transform Property

\\\`\\\`\\\`css
/* Transforms change an element visually WITHOUT affecting document flow */
.transform-examples {
  transform: translate(20px, -10px);
  transform: translateX(50%);
  transform: scale(1.5);
  transform: rotate(45deg);
  transform: skew(10deg, 5deg);

  /* Combine multiple transforms */
  transform: translateX(20px) rotate(15deg) scale(1.1);
}

/* Performance: transform and opacity are GPU-accelerated */
/* They do NOT trigger layout recalculation (reflow) */
/* ALWAYS prefer transform over changing top/left/width/height */

/* Card flip animation */
.card-flip {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

.card-flip-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  position: relative;
}

.card-flip:hover .card-flip-inner {
  transform: rotateY(180deg);
}

.card-flip-front,
.card-flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.card-flip-front {
  background: var(--color-primary);
  color: white;
}

.card-flip-back {
  background: var(--color-secondary);
  color: white;
  transform: rotateY(180deg);
}

/* EXERCISE: Create a notification toast that slides in from the */
/* right side, stays for 3 seconds, then slides out. Use */
/* @keyframes with animation-fill-mode: forwards. */
\\\`\\\`\\\`

### Respecting User Preferences

\\\`\\\`\\\`css
/* CRITICAL: Respect users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
\\\`\\\`\\\`

**Why it matters:** Animations improve perceived performance (loading skeletons feel faster than blank screens) and make interactions feel natural. But uncontrolled animations can cause performance problems and accessibility issues.

---

## 3. BEM Methodology

BEM (Block-Element-Modifier) is a naming convention for CSS classes that makes your code more readable, maintainable, and scalable. It solves the problem of CSS class name collisions and specificity wars.

### BEM Structure

\\\`\\\`\\\`css
/*
  Block:    A standalone component (.card, .menu, .form)
  Element:  A part of a block (.card__title, .menu__item)
  Modifier: A variation (.card--featured, .menu__item--active)

  Pattern:
    .block {}
    .block__element {}
    .block--modifier {}
    .block__element--modifier {}
*/

/* --- BLOCK: card --- */
.card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: box-shadow var(--transition-fast);
}

/* --- ELEMENTS: parts of the card --- */
.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card__content {
  padding: var(--space-6);
}

.card__title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--space-2);
  color: var(--text-primary);
}

.card__description {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-gray-200);
}

.card__tag {
  font-size: var(--font-size-sm);
  padding: var(--space-1) var(--space-2);
  background: var(--color-gray-100);
  border-radius: 4px;
}

/* --- MODIFIERS: variations --- */
.card--featured {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.card--compact .card__content {
  padding: var(--space-4);
}

.card--horizontal {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.card__tag--primary {
  background: var(--color-primary-light);
  color: var(--color-primary-dark);
}

.card__tag--success {
  background: #d1fae5;
  color: #065f46;
}
\\\`\\\`\\\`

### BEM in HTML

\\\`\\\`\\\`html
<article class="card">
  <img class="card__image" src="/img/course.jpg" alt="CSS Course" />
  <div class="card__content">
    <h3 class="card__title">Advanced CSS Techniques</h3>
    <p class="card__description">
      Master animations, custom properties, and modern layout methods.
    </p>
  </div>
  <footer class="card__footer">
    <span class="card__tag card__tag--primary">CSS</span>
    <span class="card__tag">12 lessons</span>
  </footer>
</article>

<!-- Featured modifier adds special styling -->
<article class="card card--featured">
  <img class="card__image" src="/img/featured.jpg" alt="Featured Course" />
  <div class="card__content">
    <h3 class="card__title">Design Systems from Scratch</h3>
    <p class="card__description">
      Build a complete design system with tokens, components, and docs.
    </p>
  </div>
  <footer class="card__footer">
    <span class="card__tag card__tag--success">New</span>
    <span class="card__tag">8 lessons</span>
  </footer>
</article>

<!-- EXERCISE: Design a navigation component using BEM with -->
<!-- .nav, .nav__list, .nav__item, .nav__link, and modifiers -->
<!-- for --active, --disabled, and --mobile. -->
\\\`\\\`\\\`

**Why it matters:** As projects grow, CSS without a naming convention becomes a tangled mess of overrides and \\\`!important\\\` hacks. BEM provides a clear contract: every class tells you what component it belongs to, what part it is, and what variation it represents.

> **Role connection:** Teams building shared component libraries rely on BEM or similar methodologies to prevent class name collisions and make code reviewable.

---

## 4. Accessibility / ARIA

Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites. ARIA (Accessible Rich Internet Applications) provides attributes that bridge gaps in native HTML semantics.

### Fundamental ARIA Attributes

\\\`\\\`\\\`html
<!-- ARIA roles describe what an element IS -->
<div role="alert">
  Your changes have been saved successfully.
</div>

<div role="tablist" aria-label="Course sections">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">
    Overview
  </button>
  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">
    Curriculum
  </button>
  <button role="tab" id="tab-3" aria-selected="false" aria-controls="panel-3" tabindex="-1">
    Reviews
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  <p>Course overview content goes here.</p>
</div>

<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <p>Curriculum details go here.</p>
</div>

<div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
  <p>Reviews content goes here.</p>
</div>
\\\`\\\`\\\`

### ARIA States and Properties

\\\`\\\`\\\`html
<!-- aria-expanded: for collapsible content -->
<button aria-expanded="false" aria-controls="dropdown-menu" id="menu-trigger">
  Menu
</button>
<ul id="dropdown-menu" role="menu" hidden>
  <li role="menuitem"><a href="/profile">Profile</a></li>
  <li role="menuitem"><a href="/settings">Settings</a></li>
  <li role="menuitem"><a href="/logout">Log Out</a></li>
</ul>

<!-- aria-live: for dynamic content updates -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  <span id="search-status">Showing 24 results for "CSS Grid"</span>
</div>

<!-- aria-describedby: links an element to its description -->
<label for="username">Username</label>
<input type="text" id="username"
  aria-describedby="username-hint username-error"
  aria-invalid="true" />
<p id="username-hint" class="hint">Must be 3-20 characters</p>
<p id="username-error" class="error" role="alert">
  Username is already taken
</p>

<!-- aria-label: provides a label when no visible text exists -->
<button aria-label="Close dialog" class="close-btn">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>

<!-- aria-hidden: hides decorative elements from screen readers -->
<span aria-hidden="true" class="icon">&#9733;</span>
<span>4.5 out of 5 stars</span>
\\\`\\\`\\\`

### Focus Management

\\\`\\\`\\\`css
/* Default focus styles — NEVER remove without a replacement */
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* :focus-visible targets only keyboard focus (not mouse clicks) */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
\\\`\\\`\\\`

### Accessible Modal Dialog

\\\`\\\`\\\`html
<dialog id="confirmDialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Deletion</h2>
  <p>Are you sure you want to delete this course? This action cannot be undone.</p>
  <div class="dialog-actions">
    <button class="btn btn-secondary" id="cancelBtn">Cancel</button>
    <button class="btn btn-danger" id="confirmBtn">Delete</button>
  </div>
</dialog>

<button id="openDialogBtn">Delete Course</button>

<script>
  const dialog = document.getElementById('confirmDialog');
  document.getElementById('openDialogBtn').addEventListener('click', () => {
    dialog.showModal();
  });
  document.getElementById('cancelBtn').addEventListener('click', () => {
    dialog.close();
  });
</script>
\\\`\\\`\\\`

\\\`\\\`\\\`css
dialog {
  border: none;
  border-radius: var(--border-radius);
  padding: var(--space-8);
  max-width: 480px;
  width: 90vw;
  box-shadow: var(--shadow-lg);
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.dialog-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
  margin-top: var(--space-6);
}

/* EXERCISE: Build an accessible dropdown menu that: */
/* 1. Toggles with aria-expanded */
/* 2. Traps focus within the menu when open */
/* 3. Closes on Escape key */
/* 4. Returns focus to the trigger button on close */
/* 5. Uses role="menu" and role="menuitem" */
\\\`\\\`\\\`

**Why it matters:** Approximately 15% of the world's population has some form of disability. Accessible websites are not just a moral imperative — they are often a legal requirement (ADA, WCAG 2.2 AA, EAA in Europe).

---

## 5. SVG (Scalable Vector Graphics)

SVG provides resolution-independent graphics that look sharp on any screen. They are XML-based, can be styled with CSS, animated, and manipulated with JavaScript.

### Inline SVG Basics

\\\`\\\`\\\`html
<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24" width="24" height="24"
  fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true" class="icon">
  <!--
    viewBox="minX minY width height"
    Defines the coordinate system for the SVG.
    The SVG scales to fit its container while
    maintaining the aspect ratio defined by viewBox.
  -->
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>

<!-- SVG icon with accessible label -->
<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24" width="24" height="24"
  role="img" aria-label="Notification bell"
  class="icon icon--bell">
  <title>Notification bell</title>
  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
</svg>
\\\`\\\`\\\`

### Styling SVG with CSS

\\\`\\\`\\\`css
.icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.icon:hover { transform: scale(1.1); }

/* Color variants */
.icon--primary { color: var(--color-primary); }
.icon--success { color: var(--color-success); }
.icon--error   { color: var(--color-error); }

/* Size variants */
.icon--sm { width: 16px; height: 16px; }
.icon--lg { width: 32px; height: 32px; }
.icon--xl { width: 48px; height: 48px; }

/* Animated SVG drawing effect */
@keyframes draw {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: 0; }
}

.icon--animated path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 1.5s ease forwards;
}
\\\`\\\`\\\`

### Creating SVG Shapes

\\\`\\\`\\\`html
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="illustration">
  <rect x="10" y="10" width="100" height="80" rx="8" ry="8" fill="#3b82f6" opacity="0.8" />
  <circle cx="200" cy="50" r="40" fill="#8b5cf6" />
  <ellipse cx="320" cy="50" rx="60" ry="30" fill="#10b981" opacity="0.7" />
  <line x1="10" y1="130" x2="390" y2="130" stroke="#e5e7eb" stroke-width="2" />
  <polyline points="50,200 100,160 150,220 200,180 250,240"
            fill="none" stroke="#f59e0b" stroke-width="3" />
  <polygon points="320,160 360,240 280,240" fill="#ef4444" opacity="0.8" />
  <!-- Path: M=move, L=line, C=cubic bezier, Z=close -->
  <path d="M 50 280 C 50 260, 100 250, 150 270 S 250 290, 350 260"
        fill="none" stroke="#3b82f6" stroke-width="2" />
  <text x="200" y="295" text-anchor="middle" font-size="14" fill="#4b5563">
    SVG Shapes Demo
  </text>
</svg>

<!-- EXERCISE: Create an SVG bar chart showing monthly revenue -->
<!-- data for 6 months. Use <rect> for bars, <text> for labels, -->
<!-- and CSS for colors. Add a hover highlight effect. -->
\\\`\\\`\\\`

**Why it matters:** SVG icons are smaller than icon fonts, can be individually styled and animated, and provide better accessibility. SVG illustrations scale perfectly on retina displays.

---

## 6. Advanced Grid Layouts

Building on Grid fundamentals, advanced techniques include subgrid, named grid lines, and combining Grid with Flexbox for complex layouts.

### Named Grid Lines

\\\`\\\`\\\`css
.dashboard {
  display: grid;
  grid-template-columns:
    [sidebar-start] 260px
    [sidebar-end main-start] 1fr
    [main-end panel-start] 320px
    [panel-end];
  grid-template-rows:
    [header-start] 64px
    [header-end content-start] 1fr
    [content-end footer-start] auto
    [footer-end];
  min-height: 100vh;
}

.dashboard__header  { grid-column: sidebar-start / panel-end; grid-row: header-start / header-end; }
.dashboard__sidebar { grid-column: sidebar-start / sidebar-end; grid-row: content-start / footer-end; }
.dashboard__main    { grid-column: main-start / main-end; grid-row: content-start / content-end; padding: var(--space-6); overflow-y: auto; }
.dashboard__panel   { grid-column: panel-start / panel-end; grid-row: content-start / content-end; }
\\\`\\\`\\\`

### CSS Subgrid

\\\`\\\`\\\`css
/*
  Subgrid lets child elements participate in the parent's grid.
  Without subgrid, nested grids create independent track sizing.
  With subgrid, inner items align to the outer grid tracks.
*/

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Each card aligns its internal layout to consistent row heights */
.card-list .card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 4; /* image, title, description, footer */
  gap: 0;
}

/* Now all card titles align across cards */
.card-list .card__title  { padding: var(--space-4); }
.card-list .card__desc   { padding: 0 var(--space-4); }
.card-list .card__footer { padding: var(--space-4); align-self: end; }
\\\`\\\`\\\`

### Combining Grid and Flexbox

\\\`\\\`\\\`css
/*
  Rule of thumb:
  - Grid for PAGE LAYOUT (2D, rows + columns)
  - Flexbox for COMPONENT LAYOUT (1D, row OR column)
*/

/* Page layout with Grid */
.app-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

/* Navigation items use Flexbox inside a Grid area */
.app-nav {
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
  gap: var(--space-2);
  background: var(--bg-secondary);
  width: 240px;
}

.app-nav__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

/* Main content uses Grid for its children */
.app-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  padding: var(--space-6);
  align-content: start;
}

/* Each widget card uses Flexbox internally */
.widget-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.widget-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-color);
}

.widget-card__body {
  flex: 1;
  padding: var(--space-4);
}

/* EXERCISE: Build a Kanban board layout with Grid for the */
/* columns and Flexbox for the vertically stacked cards. */
\\\`\\\`\\\`

**Why it matters:** Real-world layouts require combining layout tools. Knowing when to use Grid vs. Flexbox (and how to nest them) is what distinguishes mid-level from junior CSS developers.

---

## 7. Pseudo-Elements & Pseudo-Classes

Pseudo-elements create virtual elements you can style without adding HTML. Pseudo-classes select elements based on their state or position in the DOM.

### Pseudo-Elements

\\\`\\\`\\\`css
/* ::before and ::after insert content before/after an element */
/* They REQUIRE the content property (even if empty) */

.section-title {
  position: relative;
  display: inline-block;
  margin-bottom: var(--space-6);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--color-primary);
  border-radius: 2px;
}

/* Quotation marks on blockquotes */
.fancy-quote {
  position: relative;
  padding-inline-start: var(--space-8);
  font-style: italic;
  color: var(--text-secondary);
}

.fancy-quote::before {
  content: '\\201C';
  position: absolute;
  inset-inline-start: 0;
  top: -0.25rem;
  font-size: 4rem;
  color: var(--color-primary);
  line-height: 1;
  font-style: normal;
}

/* Required field indicator */
.required-label::after {
  content: ' *';
  color: var(--color-error);
  font-weight: bold;
}

/* Custom bullet list */
.custom-list {
  list-style: none;
  padding-inline-start: 0;
}

.custom-list li {
  position: relative;
  padding-inline-start: 1.75rem;
  margin-bottom: var(--space-2);
}

.custom-list li::before {
  content: '\\2713';
  position: absolute;
  inset-inline-start: 0;
  color: var(--color-success);
  font-weight: bold;
}
\\\`\\\`\\\`

### Advanced Pseudo-Classes

\\\`\\\`\\\`css
/* :nth-child patterns */
.table tr:nth-child(odd) { background: var(--color-gray-50); }
.grid-item:nth-child(3n) { grid-column: span 2; }
.list-item:nth-child(-n+3) { font-weight: bold; }
.list-item:nth-child(n+4):nth-child(-n+7) { opacity: 0.8; }

/* :focus-visible — keyboard focus only */
.button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* :has() — the "parent selector" */
.card:has(img) { grid-template-rows: 200px auto; }
.form-group:has(input:invalid) {
  border-left: 3px solid var(--color-error);
  padding-left: var(--space-3);
}
.form-group:has(input:focus) label {
  color: var(--color-primary);
  font-weight: 600;
}

/* :not() — exclude matching elements */
a:not(.btn) {
  color: var(--color-primary);
  text-decoration: underline;
}

input:not([type="submit"]):not([type="button"]) {
  border: 1px solid var(--border-color);
  padding: var(--space-2) var(--space-3);
}

/* :empty — select elements with no children or text */
.message:empty { display: none; }
.message:not(:empty) {
  padding: var(--space-3);
  border-radius: var(--border-radius);
  background: var(--color-gray-100);
}

/* EXERCISE: Create a pricing table where: */
/* 1. The middle plan uses :nth-child(2) for emphasis */
/* 2. Each feature list uses ::before with a checkmark or X */
/* 3. The :has() selector highlights the hovered card */
\\\`\\\`\\\`

**Why it matters:** Pseudo-elements reduce HTML clutter. Advanced pseudo-classes like \\\`:has()\\\` and \\\`:focus-visible\\\` are game-changers that reduce the need for JavaScript.

---

## 8. CSS Functions

CSS includes powerful built-in functions that enable dynamic calculations, responsive sizing, and logic-like behavior without JavaScript.

### calc()

\\\`\\\`\\\`css
.sidebar { width: calc(100vw - 260px); }
.container { width: calc(100% - 2 * var(--space-6)); margin: 0 auto; }
.content-area {
  --header-height: 64px;
  --footer-height: 48px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}
\\\`\\\`\\\`

### min(), max(), and clamp()

\\\`\\\`\\\`css
/* min() returns the smallest value */
.container { width: min(1200px, 90%); margin: 0 auto; }

/* max() returns the largest value */
.sidebar { width: max(200px, 25%); }

/* clamp(minimum, preferred, maximum) */
.fluid-text { font-size: clamp(1rem, 2.5vw, 2rem); }
.fluid-heading { font-size: clamp(1.75rem, 5vw, 4rem); }
.responsive-padding { padding: clamp(1rem, 3vw, 3rem); }

/* Fluid spacing system */
:root {
  --space-fluid-sm: clamp(0.5rem, 1vw, 1rem);
  --space-fluid-md: clamp(1rem, 2vw, 2rem);
  --space-fluid-lg: clamp(1.5rem, 4vw, 4rem);
  --space-fluid-xl: clamp(2rem, 6vw, 6rem);
}
\\\`\\\`\\\`

### counter() and env()

\\\`\\\`\\\`css
/* CSS Counters — automatic numbering */
.chapter-list { counter-reset: chapter; }
.chapter-list h2 { counter-increment: chapter; }
.chapter-list h2::before {
  content: "Chapter " counter(chapter) ": ";
  color: var(--color-primary);
  font-weight: 700;
}

/* Nested counters */
.outline { counter-reset: section; }
.outline h3 { counter-increment: section; counter-reset: subsection; }
.outline h3::before { content: counter(chapter) "." counter(section) " "; }
.outline h4 { counter-increment: subsection; }
.outline h4::before { content: counter(chapter) "." counter(section) "." counter(subsection) " "; }

/* env() — access environment variables for safe areas */
.app-container {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

.bottom-nav {
  padding-bottom: max(var(--space-4), env(safe-area-inset-bottom));
}

/* EXERCISE: Create a table of contents component that: */
/* 1. Automatically numbers chapters and sections using CSS counters */
/* 2. Uses clamp() for fluid font sizing */
/* 3. Handles safe-area-inset for mobile devices */
/* 4. Uses min() for a responsive max-width */
\\\`\\\`\\\`

**Why it matters:** CSS functions replace much of what previously required JavaScript calculations. \\\`clamp()\\\` alone can eliminate most media queries for typography.

> **Role connection:** Design system engineers use these functions to create fluid design tokens. Every front-end developer should know \\\`clamp()\\\` for responsive typography and \\\`calc()\\\` for dynamic spacing.

---

## Mid-Level Summary

\\\`\\\`\\\`mermaid
graph TD
    A[Mid-Level HTML & CSS] --> B[CSS Custom Properties]
    A --> C[Animations & Transitions]
    A --> D[BEM Methodology]
    A --> E[Accessibility / ARIA]
    A --> F[SVG]
    A --> G[Advanced Grid]
    A --> H[Pseudo-elements & Pseudo-classes]
    A --> I[CSS Functions]

    B --> J[Theming & Design Tokens]
    C --> K[Polished UX]
    D --> L[Scalable CSS Architecture]
    E --> M[Inclusive Interfaces]
    F --> N[Resolution-Independent Graphics]
    G --> O[Complex Layouts]
    H --> P[Less HTML Smarter CSS]
    I --> Q[Dynamic Without JS]

    J --> R[Professional Front-End Development]
    K --> R
    L --> R
    M --> R
    N --> R
    O --> R
    P --> R
    Q --> R
\\\`\\\`\\\`

These mid-level topics elevate your CSS from functional to professional. You can now build themeable component systems, create smooth animations, structure CSS with BEM, make interfaces accessible, leverage SVG, construct complex layouts, and reduce JavaScript with modern CSS features.

---

## Recommended Videos — Mid Level

- **Kevin Powell** — "Learn flexbox the easy way" — https://www.youtube.com/watch?v=u044iM9xsWU
- **Kevin Powell** — "Learn CSS Grid the easy way" — https://www.youtube.com/watch?v=rg7Fvvl3taU
- **Slaying The Dragon** — "Learn CSS Grid – A 13 Minute Deep Dive" — https://www.youtube.com/watch?v=EiNiSFIPIQE
`,
  senior: `# HTML & CSS — Senior Deep Dive

Welcome to the senior deep dive. At this level, you are not just writing CSS — you are architecting CSS systems that scale across teams, products, and platforms. These topics cover the decisions that affect entire organizations: architecture, performance, design tokens, and cutting-edge CSS capabilities.

> **Role connection:** Senior and staff front-end engineers, design system architects, and tech leads need to make decisions about CSS strategy that affect dozens of developers and millions of users. These topics directly inform those architectural decisions.

---

### Browser Rendering Pipeline

\\\`\\\`\\\`mermaid
flowchart LR
    A[Parse HTML + CSS] --> B[Style Calculation]
    B --> C[Layout]
    C --> D[Paint]
    D --> E[Composite]
    A --- A1["Build DOM + CSSOM"]
    B --- B1["Match selectors to elements"]
    C --- C1["Calculate geometry"]
    D --- D1["Fill in pixels"]
    E --- E1["Layer composition on GPU"]
\\\`\\\`\\\`

### CSS Architecture Patterns

\\\`\\\`\\\`mermaid
flowchart TB
    A[CSS Architecture Decision] --> B{Project Scale?}
    B -->|"Small project"| C[BEM Naming Convention]
    B -->|"Component library"| D[CSS Modules]
    B -->|"JS framework app"| E[CSS-in-JS]
    B -->|"Large design system"| F[ITCSS + Cascade Layers]
    C --> G["Predictable class names"]
    D --> H["Scoped styles per component"]
    E --> I["Co-located styles with logic"]
    F --> J["Layered specificity control"]
\\\`\\\`\\\`

## 1. CSS Architecture at Scale

Choosing the right CSS architecture is one of the most impactful decisions for a front-end team. The wrong choice leads to specificity wars, bloated bundles, and developer frustration.

### ITCSS (Inverted Triangle CSS)

\\\`\\\`\\\`css
/*
  ITCSS organizes CSS from generic to specific:

  Layer 1: Settings    — variables, config (no CSS output)
  Layer 2: Tools       — mixins, functions (no CSS output)
  Layer 3: Generic     — reset, normalize, box-sizing
  Layer 4: Elements    — bare HTML element styles (h1, a, p)
  Layer 5: Objects     — layout patterns (container, grid)
  Layer 6: Components  — UI components (card, button, modal)
  Layer 7: Utilities   — overrides, helpers (!important ok here)
*/

/* === Layer 1: Settings === */
:root {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
  --font-family-base: 'Inter', sans-serif;
  --max-width-content: 1200px;
  --grid-gutter: 1.5rem;
}

/* === Layer 3: Generic === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  text-size-adjust: 100%;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

/* === Layer 4: Elements === */
body {
  font-family: var(--font-family-base);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 { line-height: 1.2; font-weight: 700; }
a { color: var(--color-brand-primary); text-decoration: none; }
a:hover { text-decoration: underline; }

/* === Layer 5: Objects === */
.o-container {
  width: min(var(--max-width-content), 100% - var(--grid-gutter) * 2);
  margin-inline: auto;
}

.o-stack > * + * { margin-block-start: var(--stack-space, 1.5rem); }
.o-cluster { display: flex; flex-wrap: wrap; gap: var(--cluster-space, 1rem); }

/* === Layer 6: Components === */
.c-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 150ms ease;
}

.c-button--primary { background: var(--color-brand-primary); color: white; }

/* === Layer 7: Utilities === */
.u-visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
}

.u-text-center { text-align: center !important; }
\\\`\\\`\\\`

### CUBE CSS

\\\`\\\`\\\`css
/*
  CUBE CSS: Composition, Utility, Block, Exception
  Embraces the cascade rather than fighting it.
*/

/* === COMPOSITION: Layout primitives === */
.flow > * + * { margin-block-start: var(--flow-space, 1em); }

.sidebar-layout {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter, var(--space-6));
}
.sidebar-layout > :first-child { flex-basis: 20rem; flex-grow: 1; }
.sidebar-layout > :last-child { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }

.grid-layout {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, auto-fit), minmax(var(--grid-min, 250px), 1fr));
  gap: var(--gutter, var(--space-6));
}

/* === BLOCK: Component-level styles === */
.card {
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

/* === EXCEPTION: Data-attribute driven states === */
.card[data-variant="featured"] { border: 2px solid var(--color-brand-primary); }
.card[data-state="loading"] { opacity: 0.6; pointer-events: none; }
.button[data-size="sm"] { padding: var(--space-1) var(--space-3); font-size: var(--font-size-sm); }
.button[data-size="lg"] { padding: var(--space-3) var(--space-8); font-size: var(--font-size-lg); }
\\\`\\\`\\\`

### Utility-First Approach

\\\`\\\`\\\`css
/*
  Utility-first composes styles from small utility classes.
  Pros: Fast development, consistent design, small production CSS
  Cons: Verbose HTML, learning curve
*/

/* Spacing utilities */
.m-0 { margin: 0; }
.mt-4 { margin-block-start: var(--space-4); }
.p-4 { padding: var(--space-4); }
.px-6 { padding-inline: var(--space-6); }

/* Display and flex utilities */
.flex { display: flex; }
.grid { display: grid; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: var(--space-4); }

/* Width utilities */
.w-full { width: 100%; }
.max-w-prose { max-width: 65ch; }

/* EXERCISE: Design a CSS architecture for a medium-sized SaaS */
/* application. Document your approach and create the first 3 layers. */
\\\`\\\`\\\`

**Why it matters:** CSS architecture determines how quickly your team can ship features and how maintainable your codebase remains at scale.

> **Role connection:** Senior engineers make these foundational decisions. You need to evaluate trade-offs and ensure the chosen approach works for your team.

---

## 2. Container Queries

Container queries are a paradigm shift in responsive design. Instead of adapting to the **viewport** width, components adapt to the width of their **container**.

### Basic Container Queries

\\\`\\\`\\\`css
/* Step 1: Establish a containment context */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
  /* Shorthand: container: card / inline-size; */
}

/* Step 2: Write @container rules */
.card {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  padding: var(--space-4);
}

@container card (min-width: 500px) {
  .card {
    grid-template-columns: 200px 1fr;
    padding: var(--space-6);
  }
}

@container card (min-width: 800px) {
  .card {
    grid-template-columns: 300px 1fr auto;
    align-items: center;
  }
}
\\\`\\\`\\\`

### Responsive Components

\\\`\\\`\\\`html
<!-- Same card component works in any context -->
<!-- In a narrow sidebar: renders vertically -->
<aside class="sidebar">
  <div class="card-wrapper">
    <article class="card">
      <img class="card__image" src="/img/course.jpg" alt="Course" />
      <div class="card__body">
        <h3 class="card__title">Advanced CSS</h3>
        <p class="card__desc">Master modern CSS techniques.</p>
      </div>
    </article>
  </div>
</aside>

<!-- In a wide main area: renders horizontally -->
<main class="content">
  <div class="card-wrapper">
    <article class="card">
      <img class="card__image" src="/img/course.jpg" alt="Course" />
      <div class="card__body">
        <h3 class="card__title">Advanced CSS</h3>
        <p class="card__desc">Master modern CSS techniques.</p>
      </div>
    </article>
  </div>
</main>
\\\`\\\`\\\`

\\\`\\\`\\\`css
/* Container query units */
.card__title {
  font-size: clamp(1rem, 3cqi, 1.5rem);
}

/* Style queries (experimental) */
@container style(--theme: dark) {
  .card { background: var(--color-gray-800); color: var(--color-gray-100); }
}

/* EXERCISE: Build a responsive dashboard widget that adapts */
/* at 300px, 500px container widths using container queries only. */
\\\`\\\`\\\`

**Why it matters:** Container queries solve the "component reusability" problem that media queries cannot. A card that adapts to its container works everywhere without modification.

---

## 3. Cascade Layers

\\\`@layer\\\` gives you explicit control over the cascade ordering. This is transformative for managing specificity at scale, especially with third-party CSS.

### Defining and Ordering Layers

\\\`\\\`\\\`css
/* Declare layer order — later layers have HIGHER priority */
@layer reset, base, components, utilities;

@layer utilities {
  .text-center { text-align: center; }
  .hidden { display: none; }
}

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
}

@layer base {
  body { font-family: var(--font-family-base); line-height: 1.6; }
  h1 { font-size: 2.5rem; }
  a { color: var(--color-brand-primary); }
}

@layer components {
  .card { background: white; border-radius: var(--border-radius); box-shadow: var(--shadow-sm); padding: var(--space-6); }
  .button { padding: var(--space-2) var(--space-4); border-radius: 6px; font-weight: 600; cursor: pointer; }
}
\\\`\\\`\\\`

### Managing Third-Party CSS

\\\`\\\`\\\`css
/* Third-party gets lowest priority */
@layer third-party, reset, tokens, base, layouts, components, utilities;

/* Import third-party CSS into a named layer */
@import url('https://cdn.example.com/datepicker.css') layer(third-party);
@import url('https://cdn.example.com/rich-text-editor.css') layer(third-party);

/* Your component styles ALWAYS override third-party */
@layer components {
  .datepicker-trigger {
    background: var(--color-brand-primary);
    border-radius: var(--border-radius);
  }
}
\\\`\\\`\\\`

### Nested Layers

\\\`\\\`\\\`css
@layer components {
  @layer buttons {
    .btn { padding: 0.5rem 1rem; }
    .btn--primary { background: blue; color: white; }
  }
  @layer cards {
    .card { padding: 1.5rem; border-radius: 8px; }
  }
  @layer modals {
    .modal { position: fixed; inset: 0; z-index: 1000; }
  }
}

/* Reference nested layers with dot notation */
@layer components.buttons {
  .btn--danger { background: red; color: white; }
}

/*
  IMPORTANT: Unlayered styles beat ALL layered styles.
  This is by design — it provides an escape hatch.
*/

/* EXERCISE: Refactor a project's CSS into cascade layers */
/* handling reset, third-party, base, layouts, components, utilities. */
\\\`\\\`\\\`

**Why it matters:** Cascade layers solve the specificity management problem that has plagued CSS since its inception. They are critical for large codebases and design systems.

> **Role connection:** Architects and tech leads defining CSS strategy need to decide whether and how to adopt cascade layers. This affects build tooling, workflows, and migration paths.

---

## 4. Performance Optimization

CSS directly impacts Core Web Vitals — the metrics Google uses for search ranking.

### Core Web Vitals and CSS

\\\`\\\`\\\`css
/*
  LCP (Largest Contentful Paint) — main content load speed
  CLS (Cumulative Layout Shift)  — layout stability
  INP (Interaction to Next Paint) — interaction responsiveness
  CSS affects ALL THREE.
*/

/* === Reducing CLS === */
img, video { max-width: 100%; height: auto; }

/* Use aspect-ratio for responsive containers */
.video-wrapper { aspect-ratio: 16 / 9; width: 100%; background: var(--color-gray-200); }

/* Prevent web font FOUT */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

/* Match fallback font metrics to minimize shift */
@font-face {
  font-family: 'Inter-fallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 107%;
}

body { font-family: 'Inter', 'Inter-fallback', sans-serif; }

/* Reserve space for dynamic content */
.ad-slot { min-height: 250px; contain: layout; }
\\\`\\\`\\\`

### Content Visibility and Containment

\\\`\\\`\\\`css
/* content-visibility: skips rendering off-screen content */
.below-fold-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}

.article-card {
  content-visibility: auto;
  contain-intrinsic-size: auto 300px;
}

/* CSS containment */
.sidebar-widget {
  contain: layout style paint;
}
\\\`\\\`\\\`

### Animation Performance

\\\`\\\`\\\`css
/*
  Rendering pipeline: Style > Layout > Paint > Composite

  - Layout (reflow): width, height, margin, padding
  - Paint: color, background, box-shadow
  - Composite: transform, opacity (GPU-accelerated, cheapest)

  ALWAYS prefer transform/opacity for animations.
*/

/* GOOD: GPU accelerated */
.animate-slide {
  transition: transform 300ms ease, opacity 300ms ease;
}
.animate-slide.is-hidden {
  transform: translateX(-100%);
  opacity: 0;
}

/* BAD: Triggers layout on every frame */
.animate-slide-bad { transition: left 300ms ease; position: relative; }
.animate-slide-bad.is-hidden { left: -100%; }

/* will-change hint */
.card:hover { will-change: transform; }
.card:hover .card__image { transform: scale(1.05); }

/*
  CAUTION with will-change:
  - Don't apply to everything (wastes GPU memory)
  - Apply BEFORE animation starts
  - Never use: will-change: all
*/

.complex-animation { isolation: isolate; }

/* EXERCISE: Audit a real website using DevTools Performance tab. */
/* Identify CSS-caused layout shifts and document fixes. */
\\\`\\\`\\\`

**Why it matters:** A 100ms increase in load time can reduce conversions by 7%. CSS performance directly affects LCP and CLS.

---

## 5. Design Systems & Tokens

Design tokens are the atomic values of a design system — colors, typography, spacing — stored in a platform-agnostic format.

### Token Architecture

\\\`\\\`\\\`css
/*
  Three-tier token architecture:
  Tier 1: Global tokens (raw values)
  Tier 2: Alias tokens (semantic meaning)
  Tier 3: Component tokens (specific usage)
*/

/* === Tier 1: Global Tokens === */
:root {
  --global-color-blue-50: #eff6ff;
  --global-color-blue-100: #dbeafe;
  --global-color-blue-500: #3b82f6;
  --global-color-blue-600: #2563eb;
  --global-color-blue-700: #1d4ed8;
  --global-color-blue-900: #1e3a8a;

  --global-color-gray-50: #f9fafb;
  --global-color-gray-200: #e5e7eb;
  --global-color-gray-600: #4b5563;
  --global-color-gray-900: #111827;

  --global-color-red-500: #ef4444;
  --global-color-green-500: #10b981;

  --global-space-1: 0.25rem;
  --global-space-2: 0.5rem;
  --global-space-4: 1rem;
  --global-space-6: 1.5rem;
  --global-space-8: 2rem;

  --global-font-size-sm: 0.875rem;
  --global-font-size-base: 1rem;
  --global-font-size-xl: 1.25rem;
  --global-font-size-2xl: 1.5rem;
  --global-font-size-4xl: 2.25rem;

  --global-font-weight-normal: 400;
  --global-font-weight-semibold: 600;
  --global-font-weight-bold: 700;

  --global-radius-sm: 4px;
  --global-radius-md: 8px;
  --global-radius-lg: 12px;
  --global-radius-full: 9999px;

  --global-shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --global-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --global-shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
}

/* === Tier 2: Alias / Semantic Tokens === */
:root {
  --color-surface-primary: var(--global-color-gray-50);
  --color-surface-secondary: white;
  --color-text-primary: var(--global-color-gray-900);
  --color-text-secondary: var(--global-color-gray-600);
  --color-text-inverse: white;
  --color-action-primary: var(--global-color-blue-600);
  --color-action-primary-hover: var(--global-color-blue-700);
  --color-action-danger: var(--global-color-red-500);
  --color-border-default: var(--global-color-gray-200);
  --color-border-focus: var(--global-color-blue-500);
}

/* Dark theme: only alias tokens change */
[data-theme="dark"] {
  --color-surface-primary: var(--global-color-gray-900);
  --color-surface-secondary: #1f2937;
  --color-text-primary: var(--global-color-gray-50);
  --color-text-secondary: #d1d5db;
  --color-border-default: #374151;
}

/* === Tier 3: Component Tokens === */
.c-button {
  --_button-padding-x: var(--global-space-4);
  --_button-padding-y: var(--global-space-2);
  --_button-radius: var(--global-radius-md);
  --_button-font-size: var(--global-font-size-base);

  display: inline-flex;
  align-items: center;
  gap: var(--global-space-2);
  padding: var(--_button-padding-y) var(--_button-padding-x);
  font-size: var(--_button-font-size);
  font-weight: var(--global-font-weight-semibold);
  border-radius: var(--_button-radius);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 150ms ease;
}

.c-button--primary {
  background: var(--color-action-primary);
  color: var(--color-text-inverse);
}

.c-button--primary:hover {
  background: var(--color-action-primary-hover);
}
\\\`\\\`\\\`

### Multi-Platform Token Format

\\\`\\\`\\\`css
/*
  Tokens stored in platform-agnostic JSON, transformed via
  Style Dictionary or Tokens Studio into:
  - CSS:     --color-brand-primary: #3b82f6;
  - iOS:     static let brandPrimary = UIColor(hex: "#3b82f6")
  - Android: <color name="brand_primary">#3b82f6</color>

  Example token source:
  {
    "color": {
      "brand": {
        "primary": {
          "$value": "#3b82f6",
          "$type": "color"
        }
      }
    }
  }
*/

/* EXERCISE: Design a complete token architecture for a SaaS product */
/* with color, typography, spacing, radius, and shadow scales. */
/* Include semantic aliases and a dark theme. */
\\\`\\\`\\\`

**Why it matters:** Design tokens ensure consistency across platforms and enable theming. They are the single source of truth for a design system.

---

## 6. Advanced Selectors

Modern CSS selectors enable more expressive, maintainable CSS with precise specificity control.

### :is() and :where()

\\\`\\\`\\\`css
/*
  :is() — matches any selector in its list
  Specificity: takes the HIGHEST in the list

  :where() — same behavior but specificity is ALWAYS 0
*/

/* Before :is() */
.header a:hover, .header a:focus,
.footer a:hover, .footer a:focus,
.sidebar a:hover, .sidebar a:focus {
  color: var(--color-action-primary);
}

/* After :is() */
:is(.header, .footer, .sidebar) a:is(:hover, :focus) {
  color: var(--color-action-primary);
  text-decoration: underline;
}

/* :where() for zero-specificity base styles */
:where(h1, h2, h3, h4, h5, h6) {
  line-height: 1.25;
  font-weight: 700;
}

/* Easy to override */
h2 { font-size: var(--global-font-size-2xl); }

/* :where() for reset styles */
:where(ul, ol) { list-style: none; padding: 0; }
.article-content ul { list-style: disc; padding-inline-start: 1.5rem; }
\\\`\\\`\\\`

### Complex :not() and :has()

\\\`\\\`\\\`css
/* :not() with multiple selectors */
input:not([type="submit"], [type="button"], [type="hidden"]) {
  border: 1px solid var(--color-border-default);
  padding: var(--global-space-2) var(--global-space-4);
  border-radius: var(--global-radius-md);
}

/* :has() — the parent selector */
.form-group:has(:focus-visible) {
  background: var(--global-color-blue-50);
  border-radius: var(--global-radius-md);
}

.card:has(> img) { padding-top: 0; }
.card:not(:has(> img)) { border-top: 4px solid var(--color-action-primary); }

/* Layout changes based on content */
body:has(.modal[open]) { overflow: hidden; }
body:has(.sidebar.is-collapsed) .main-content { grid-column: 1 / -1; }

/* Quantity queries */
.tag-list:has(:nth-child(4)) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--global-space-2);
}

.tag-list:has(:only-child) { justify-content: center; }
\\\`\\\`\\\`

### Selector Performance

\\\`\\\`\\\`css
/*
  Browser matching is RIGHT-TO-LEFT.
  Avoid: .wrapper * { }  (matches every element)
  Avoid: .a .b .c .d .e { }  (deep chains)
  Prefer: .card { }  (single class)

  :has() can be expensive on large DOMs.
  Avoid complex descendant selectors with :has()
  on elements appearing thousands of times.
*/

/* EXERCISE: Refactor these selectors using :is(), :where(), :has(): */
/*   div.container > ul > li.active > a.link:hover { } */
/*   .nav a:hover, .nav a:focus, .nav a:active { } */
\\\`\\\`\\\`

**Why it matters:** \\\`:is()\\\`, \\\`:where()\\\`, and \\\`:has()\\\` are the biggest selector additions in a decade, drastically reducing repetition and enabling patterns that previously required JavaScript.

> **Role connection:** Design system architects use \\\`:where()\\\` for zero-specificity base styles. \\\`:has()\\\` reduces the need for JavaScript-based conditional styling.

---

## 7. Modern CSS Features

CSS is evolving rapidly. These cutting-edge features are shipping in browsers now.

### Modern Color Functions

\\\`\\\`\\\`css
/*
  OKLCH: perceptually uniform color space.
  oklch(lightness chroma hue / alpha)
*/

:root {
  --brand-hue: 250;
  --color-brand-100: oklch(95% 0.05 var(--brand-hue));
  --color-brand-300: oklch(78% 0.15 var(--brand-hue));
  --color-brand-500: oklch(58% 0.20 var(--brand-hue));
  --color-brand-700: oklch(38% 0.18 var(--brand-hue));
  --color-brand-900: oklch(18% 0.08 var(--brand-hue));
  /* Changing --brand-hue generates a new palette with */
  /* consistent perceived lightness */
}

/* color-mix() — blend colors */
.button--primary:hover {
  background: color-mix(in oklch, var(--color-brand-500) 80%, black);
}

.overlay {
  background: color-mix(in srgb, var(--color-brand-500) 30%, transparent);
}

.badge--light {
  background: color-mix(in oklch, var(--color-brand-500) 15%, white);
  color: var(--color-brand-700);
}

/* Relative color syntax — derive new colors from existing ones */
.button--primary {
  --base: var(--color-brand-500);
  background: var(--base);
}
.button--primary:hover {
  /* Take the base color, keep hue/chroma, reduce lightness by 10% */
  background: oklch(from var(--base) calc(l - 0.1) c h);
}
.button--primary:active {
  background: oklch(from var(--base) calc(l - 0.2) c h);
}
\\\`\\\`\\\`

### View Transitions

\\\`\\\`\\\`css
/* Cross-fade between DOM states */
::view-transition-old(root) { animation: fade-out 300ms ease; }
::view-transition-new(root) { animation: fade-in 300ms ease; }

@keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

/* Named transitions for specific elements */
.page-title { view-transition-name: page-title; }
.hero-image  { view-transition-name: hero-image; }

::view-transition-old(page-title) { animation: slide-out-left 300ms ease; }
::view-transition-new(page-title) { animation: slide-in-right 300ms ease; }

@keyframes slide-out-left {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100px); opacity: 0; }
}
@keyframes slide-in-right {
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* MPA transitions */
@view-transition { navigation: auto; }
\\\`\\\`\\\`

### Scroll-Driven Animations

\\\`\\\`\\\`css
/* Reading progress bar tied to scroll */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--color-brand-500);
  transform-origin: left;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Reveal on scroll */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: reveal auto ease both;
  animation-timeline: view();
  animation-range: entry 20% entry 60%;
}

@keyframes reveal {
  to { opacity: 1; transform: translateY(0); }
}

/* Parallax */
.hero-bg {
  animation: parallax auto linear;
  animation-timeline: scroll();
}

@keyframes parallax {
  from { transform: translateY(0); }
  to { transform: translateY(-20%); }
}

/* Sticky header shrink */
.site-header {
  --_header-height: 80px;
  height: var(--_header-height);
  animation: shrink-header auto linear forwards;
  animation-timeline: scroll();
  animation-range: 0 200px;
}

@keyframes shrink-header {
  to { --_header-height: 56px; box-shadow: var(--global-shadow-md); }
}

/* EXERCISE: Build a storytelling page with scroll-driven animations */
/* for revealing sections, fading backgrounds, and a progress bar. */
\\\`\\\`\\\`

### Additional Modern Features

\\\`\\\`\\\`css
/* Native CSS nesting */
.card {
  background: white;
  border-radius: var(--global-radius-md);

  & .card__title { font-size: var(--global-font-size-xl); }
  &:hover { box-shadow: var(--global-shadow-md); }
  &.card--featured { border: 2px solid var(--color-brand-500); }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

/* Popover API */
[popover] {
  border: 1px solid var(--color-border-default);
  border-radius: var(--global-radius-md);
  box-shadow: var(--global-shadow-lg);
  padding: var(--global-space-4);
  max-width: 300px;
}

/* Anchor positioning (experimental) */
.tooltip {
  position: absolute;
  position-anchor: --trigger;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
}

/* EXERCISE: Create a page showcasing 5 modern CSS features: */
/* nesting, color-mix(), container queries, scroll-driven */
/* animations, and view transitions. */
\\\`\\\`\\\`

**Why it matters:** Modern CSS features eliminate the need for JavaScript in many UI patterns — scroll effects, color manipulation, component responsiveness, page transitions. Staying current means shipping faster, lighter code.

> **Role connection:** Senior engineers evaluate which modern features are production-ready, plan migration strategies from JS-based solutions to CSS-native ones, and mentor teams on adoption.

---

## Senior Level Summary

\\\`\\\`\\\`mermaid
graph TD
    A[Senior HTML & CSS] --> B[CSS Architecture]
    A --> C[Container Queries]
    A --> D[Cascade Layers]
    A --> E[Performance]
    A --> F[Design Tokens]
    A --> G[Advanced Selectors]
    A --> H[Modern CSS Features]

    B --> I[ITCSS / CUBE / Utility-First]
    C --> J[Context-Aware Components]
    D --> K[Specificity Control at Scale]
    E --> L[Core Web Vitals Optimization]
    F --> M[Cross-Platform Design Systems]
    G --> N[Expressive Low-Specificity CSS]
    H --> O[JS-Free Interactions]

    I --> P[Scalable CSS Strategy]
    J --> P
    K --> P
    L --> Q[Fast User Experience]
    M --> Q
    N --> R[Maintainable Codebase]
    O --> R

    P --> S[Production Excellence]
    Q --> S
    R --> S
\\\`\\\`\\\`

At the senior level, your CSS decisions have organizational impact. You architect systems that support dozens of developers, optimize for millions of users, and adopt modern features strategically. The combination of cascade layers, container queries, design tokens, and performance optimization defines the state-of-the-art in CSS engineering.

---

## Recommended Videos — Senior Level

- **Kevin Powell** — "CSS :has() is more than a parent selector" — https://www.youtube.com/watch?v=Gu3E-IF9GkA
- **Google Chrome Developers** — "View Transitions API" — https://www.youtube.com/watch?v=JCJUPJ_zDQ4
- **Una Kravets** — "What's new in CSS" — https://www.youtube.com/watch?v=rEFgAQBmBSA
`,
}
