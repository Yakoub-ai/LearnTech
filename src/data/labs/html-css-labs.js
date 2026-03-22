export const labs = [
  // ============================================================
  // LAB 1 — Responsive Layout (from interactiveLabs.js hc-lab-1)
  // ============================================================
  {
    id: 'hc-lab-1',
    languageId: 'html-css',
    level: 'beginner',
    title: 'Build a Responsive Layout',
    description: 'Create a responsive page layout using semantic HTML, Flexbox, Grid, and media queries.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your HTML/CSS Environment',
        setupReference: true,
        instruction: 'Before building web interfaces, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: a modern code editor (VS Code with Live Server extension), browser DevTools, and Node.js for build tools. Open your browser DevTools (F12) to inspect and debug your work. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Install the VS Code Live Server extension for instant preview',
          'Open Chrome DevTools (F12) and familiarize yourself with the Elements panel'
        ],
        expectedOutput: 'VS Code with Live Server extension installed\nBrowser DevTools accessible via F12\nLive Server running at localhost:5500',
        solution: null
      },
      {
        title: 'Step 2: Semantic HTML Structure',
        instruction: 'Create a page layout using proper semantic HTML5 elements: header, nav, main, aside, article, and footer.',
        starterCode: `<!-- TODO: Build a semantic HTML page structure -->
<!-- Include:
  - <header> with site title and <nav> with 4 links
  - <main> containing:
    - <article> with heading, paragraph, and image placeholder
    - <aside> with a "Related Posts" list
  - <footer> with copyright text
-->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Blog</title>
</head>
<body>
  <!-- TODO: Add semantic structure here -->
</body>
</html>`,
        hints: [
          'Use <header> for the top bar, <nav> inside it for navigation links',
          'Use <main> as the primary content area, <article> for the blog post',
          '<aside> is for related/supplementary content like sidebars'
        ],
        expectedOutput: `A well-structured HTML page with:
- Header with navigation
- Main content with article
- Sidebar with related posts
- Footer with copyright`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Blog</title>
</head>
<body>
  <header>
    <h1>My Blog</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Understanding CSS Grid</h2>
      <p>CSS Grid is a powerful layout system that makes building complex layouts simple...</p>
      <img src="placeholder.jpg" alt="CSS Grid illustration" />
    </article>

    <aside>
      <h3>Related Posts</h3>
      <ul>
        <li><a href="#">Flexbox Guide</a></li>
        <li><a href="#">Responsive Design</a></li>
        <li><a href="#">CSS Variables</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2025 My Blog. All rights reserved.</p>
  </footer>
</body>
</html>`
      },
      {
        title: 'Step 3: Flexbox Navigation',
        instruction: 'Style the header and navigation using Flexbox. Make the nav responsive with space-between alignment.',
        starterCode: `/* TODO: Style the header with Flexbox */
/* Requirements:
  - Header: horizontal flex, items centered vertically, space-between
  - Background color: #1e293b, text: white, padding: 1rem 2rem
  - Nav links: horizontal row with gap, no underlines
  - Links: white text, hover becomes #60a5fa (blue)
  - On mobile (<768px): stack nav below title
*/

header {
  /* TODO */
}

header h1 {
  /* TODO */
}

nav {
  /* TODO */
}

nav a {
  /* TODO */
}

nav a:hover {
  /* TODO */
}`,
        hints: [
          'display: flex; align-items: center; justify-content: space-between;',
          'nav links: display: flex; gap: 1.5rem;',
          '@media (max-width: 768px) { header { flex-direction: column; } }'
        ],
        expectedOutput: `Desktop: Title on left, nav links on right in a row
Mobile: Title stacked above nav links
Links turn blue on hover`,
        solution: `header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1e293b;
  color: white;
  padding: 1rem 2rem;
}

header h1 {
  font-size: 1.5rem;
  margin: 0;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  transition: color 0.2s;
}

nav a:hover {
  color: #60a5fa;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}`
      },
      {
        title: 'Step 4: CSS Grid Content Layout',
        instruction: 'Use CSS Grid to create a two-column layout: article (2/3 width) and aside (1/3 width). Stack on mobile.',
        starterCode: `/* TODO: Grid layout for main content area */
/* Requirements:
  - Main: 2-column grid — article 2fr, aside 1fr
  - Gap: 2rem
  - Max-width: 1200px, centered with auto margins
  - Padding: 2rem
  - On mobile (<768px): single column
  - Article: styled with padding, light background
  - Aside: styled with border and padding
*/

main {
  /* TODO */
}

article {
  /* TODO */
}

aside {
  /* TODO */
}

/* Responsive */`,
        hints: [
          'grid-template-columns: 2fr 1fr; creates the 2/3 + 1/3 split',
          'On mobile: grid-template-columns: 1fr; for single column',
          'Use max-width: 1200px; margin: 0 auto; for centering'
        ],
        expectedOutput: `Desktop: Article takes 2/3, sidebar takes 1/3
Mobile: Article stacks on top of sidebar
Both have padding and subtle styling`,
        solution: `main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

article {
  background-color: #f8fafc;
  padding: 2rem;
  border-radius: 8px;
}

article img {
  width: 100%;
  border-radius: 8px;
  margin-top: 1rem;
}

aside {
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  align-self: start;
}

aside ul {
  list-style: none;
  padding: 0;
}

aside li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

@media (max-width: 768px) {
  main {
    grid-template-columns: 1fr;
  }
}`
      }
    ]
  },

  // ============================================================
  // LAB 2 — Semantic HTML Page Structure (from sandbox hc-1)
  // ============================================================
  {
    id: 'hc-lab-2',
    languageId: 'html-css',
    level: 'beginner',
    title: 'Semantic HTML Page Structure',
    description: 'Build a properly structured semantic HTML page with accessibility attributes, ARIA roles, and meaningful element choices that improve SEO and screen-reader support.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your HTML/CSS Environment',
        setupReference: true,
        instruction: 'Before building web interfaces, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: a modern code editor (VS Code with Live Server extension), browser DevTools, and Node.js for build tools. Open your browser DevTools (F12) to inspect and debug your work. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Install the VS Code Live Server extension for instant preview',
          'Open Chrome DevTools (F12) and familiarize yourself with the Elements panel'
        ],
        expectedOutput: 'VS Code with Live Server extension installed\nBrowser DevTools accessible via F12\nLive Server running at localhost:5500',
        solution: null
      },
      {
        title: 'Step 2: Document Skeleton and Navigation',
        instruction: 'WHAT: Create a valid HTML5 document skeleton with a semantic <header> and accessible <nav>. WHY: Semantic elements communicate meaning to browsers, search engines, and assistive technologies — a <nav> tells screen readers this is a navigation landmark, not just a list. HOW: Add a <header> containing an aria-label="Main navigation" nav with an unordered list of links. Use lang="en" on the <html> element and the full charset/viewport meta tags.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic HTML Example</title>
</head>
<body>

  <!-- TODO: Add a <header> element -->
  <!-- Inside the header, add a <nav aria-label="Main navigation"> -->
  <!-- Inside the nav, add a <ul> with three <li><a> links:
       Home (#home), About (#about), Contact (#contact) -->

</body>
</html>`,
        hints: [
          'The aria-label attribute on <nav> distinguishes this nav from others on the page for screen readers',
          'Use <ul> inside <nav> — navigation links are semantically a list of items',
          'href="#home" links to an element with id="home" on the same page'
        ],
        expectedOutput: `Valid HTML5 document with:
- <html lang="en"> root element
- Full <head> with charset and viewport meta
- <header> containing <nav aria-label="Main navigation">
- Unordered list with three anchor links`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic HTML Example</title>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
</body>
</html>`
      },
      {
        title: 'Step 3: Main Content with Article and Sections',
        instruction: 'WHAT: Add the primary content area using <main>, <article>, <section>, <figure>, and <figcaption>. WHY: <article> marks self-contained content that makes sense on its own (it could be syndicated). <section> groups thematically related content within the article. <figure> wraps media that is referenced from the main content. HOW: Create a <main> element after the header. Inside it add an <article> with an <h1> title, a <time> element with a datetime attribute, and two <section> elements. The first section uses <h2> and a <figure> with <figcaption>. The second section uses <dl>, <dt>, and <dd> for a definition list of HTML elements.',
        starterCode: `<!-- Continue from Step 2. Add inside <body> after </header>: -->

<main>
  <article>
    <!-- TODO: Add h1: "Understanding Semantic HTML" -->

    <!-- TODO: Add a <p> with "Published " followed by a
         <time datetime="2025-01-15"> showing "January 15, 2025" -->

    <section>
      <!-- TODO: Add h2: "Why Semantics Matter" -->
      <!-- TODO: Add a <p> about semantic elements conveying meaning -->

      <!-- TODO: Add a <figure> containing:
           - <img src="diagram.png" alt="Diagram showing HTML element hierarchy">
           - <figcaption>HTML5 semantic element hierarchy</figcaption> -->
    </section>

    <section>
      <!-- TODO: Add h2: "Common Elements" -->
      <!-- TODO: Add a <dl> with three dt/dd pairs:
           header → "Introductory content or navigation"
           main   → "Primary content of the document"
           article → "Self-contained, independently distributable content" -->
    </section>
  </article>
</main>`,
        hints: [
          '<time datetime="2025-01-15"> uses the machine-readable ISO date in the attribute while displaying human-readable text as content',
          '<figure> does not have to be an image — it can wrap code, charts, or diagrams that are referenced from the text',
          '<dl> (definition list) is the right element for term-definition pairs — avoid using a table for this'
        ],
        expectedOutput: `<main> with one <article> containing:
- <h1> heading and <time> publication date
- First <section> with <h2>, <p>, and <figure>/<figcaption>
- Second <section> with <h2> and a <dl> definition list`,
        solution: `<main>
  <article>
    <h1>Understanding Semantic HTML</h1>
    <p>Published <time datetime="2025-01-15">January 15, 2025</time></p>

    <section>
      <h2>Why Semantics Matter</h2>
      <p>Semantic elements convey meaning to browsers and assistive technologies.</p>
      <figure>
        <img src="diagram.png" alt="Diagram showing HTML element hierarchy">
        <figcaption>HTML5 semantic element hierarchy</figcaption>
      </figure>
    </section>

    <section>
      <h2>Common Elements</h2>
      <dl>
        <dt>header</dt>
        <dd>Introductory content or navigation</dd>
        <dt>main</dt>
        <dd>Primary content of the document</dd>
        <dt>article</dt>
        <dd>Self-contained, independently distributable content</dd>
      </dl>
    </section>
  </article>
</main>`
      },
      {
        title: 'Step 4: Aside, Footer, and Accessibility Audit',
        instruction: 'WHAT: Complete the page with <aside> for related links and <footer> for site-wide information, then verify accessibility. WHY: <aside> marks content that is tangentially related to the surrounding content — sidebars, pull-quotes, or related links. <footer> belongs inside <body> for the page-level footer, or inside an <article> for article-specific metadata. WCAG 2.1 requires sufficient colour contrast (4.5:1 for body text) and all interactive elements to be keyboard-reachable. HOW: Add <aside> after </article> (inside <main>), add <footer> after </main>, then open Chrome DevTools Accessibility panel to check for any issues.',
        starterCode: `<!-- Continue from Step 3. After </article> inside <main>: -->

<!-- TODO: Add an <aside> with:
     - <h2>Related Topics</h2>
     - A <ul> with two links:
       "Accessibility Guide" (href="#accessibility")
       "SEO Best Practices" (href="#seo") -->

<!-- After </main>: -->

<!-- TODO: Add a <footer> with:
     - A <p> containing: &copy; 2025 Tech Learning -->

<!-- Accessibility checklist (verify in DevTools):
     - Every <img> has a descriptive alt attribute
     - Heading levels are sequential (h1 → h2, not h1 → h3)
     - All links have visible focus styles
     - Colour contrast ratio for text is at least 4.5:1 -->`,
        hints: [
          'Open DevTools → Lighthouse tab → run an Accessibility audit to get an automated score',
          'Use the DevTools Accessibility panel (Elements tab → Accessibility sub-tab) to inspect the accessibility tree for any element',
          'Heading levels must not skip — if you have an <h1> the next level should be <h2>, not <h3>'
        ],
        expectedOutput: `Complete page with:
- <aside> with related links inside <main>
- <footer> with copyright after </main>
- All images have descriptive alt text
- Heading hierarchy is sequential (h1 → h2)
- Lighthouse accessibility score of 90+`,
        solution: `<!-- Inside <main>, after </article>: -->
<aside>
  <h2>Related Topics</h2>
  <ul>
    <li><a href="#accessibility">Accessibility Guide</a></li>
    <li><a href="#seo">SEO Best Practices</a></li>
  </ul>
</aside>

<!-- After </main>: -->
<footer>
  <p>&copy; 2025 Tech Learning</p>
</footer>`
      },
      {
        title: 'Step 5: Interactive Elements — Details, Summary, and Dialog',
        instruction: 'WHAT: Add a native HTML <details>/<summary> disclosure widget and a <dialog> modal — no JavaScript required for basic functionality. WHY: These native elements provide built-in keyboard and screen-reader support for free, avoiding the need for custom ARIA roles and JS event handling. HOW: Add a <details> element with a <summary> as its first child (the always-visible toggle label). Add a <dialog id="info-dialog"> element and a <button> that uses onclick="document.getElementById(\'info-dialog\').showModal()" to open it. Inside the dialog add a close button calling dialog.close().',
        starterCode: `<!-- Add inside <main>, after the <aside>: -->

<!-- TODO: Add a <details> element with:
     - <summary>Frequently Asked Questions</summary>
     - A <p> with any FAQ answer text -->

<!-- TODO: Add a <button> to open a dialog:
     <button onclick="document.getElementById('info-modal').showModal()">
       Learn More
     </button> -->

<!-- TODO: Add a <dialog id="info-modal"> with:
     - <h2>More Information</h2>
     - <p> with some content
     - A <form method="dialog"> containing a <button>Close</button>
       (method="dialog" makes the button close the dialog natively) -->`,
        hints: [
          '<details> is open by default when it has the open attribute: <details open>',
          '<form method="dialog"> inside a <dialog> closes the dialog when any submit button inside it is clicked — no JS needed',
          'The ::backdrop pseudo-element lets you style the overlay behind an open <dialog>'
        ],
        expectedOutput: `- <details>/<summary> FAQ section toggles open/closed on click
- "Learn More" button opens the <dialog> as a modal overlay
- Close button inside the dialog dismisses it
- Both elements work with keyboard navigation (Enter/Space, Escape)`,
        solution: `<!-- Inside <main>, after </aside>: -->
<details>
  <summary>Frequently Asked Questions</summary>
  <p>Semantic HTML helps search engines and screen readers understand your content structure.</p>
</details>

<button onclick="document.getElementById('info-modal').showModal()">
  Learn More
</button>

<dialog id="info-modal">
  <h2>More Information</h2>
  <p>Using semantic HTML is the foundation of accessible, maintainable web development.</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>`
      }
    ]
  },

  // ============================================================
  // LAB 3 — Flexbox Layout Patterns (from sandbox hc-2)
  // ============================================================
  {
    id: 'hc-lab-3',
    languageId: 'html-css',
    level: 'beginner',
    title: 'Flexbox Layout Patterns',
    description: 'Learn essential Flexbox patterns for navigation bars, equal-height card grids, centred hero sections, sidebar layouts, and input groups — the building blocks of modern web UI.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your HTML/CSS Environment',
        setupReference: true,
        instruction: 'Before building web interfaces, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: a modern code editor (VS Code with Live Server extension), browser DevTools, and Node.js for build tools. Open your browser DevTools (F12) to inspect and debug your work. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Install the VS Code Live Server extension for instant preview',
          'Open Chrome DevTools (F12) and familiarize yourself with the Elements panel'
        ],
        expectedOutput: 'VS Code with Live Server extension installed\nBrowser DevTools accessible via F12\nLive Server running at localhost:5500',
        solution: null
      },
      {
        title: 'Step 2: Flexbox Navigation Bar',
        instruction: 'WHAT: Build a horizontal navigation bar using Flexbox that places the logo on the left and links on the right. WHY: Flexbox is the ideal tool for one-dimensional layouts — putting items in a row or column with control over spacing and alignment. justify-content: space-between is the most common pattern for nav bars because it pushes children to opposite ends. HOW: Create a <nav class="navbar"> with a logo span and a <ul class="nav-links">. Apply display: flex and justify-content: space-between to .navbar, and display: flex with gap and list-style: none to .nav-links.',
        starterCode: `<!-- HTML structure -->
<nav class="navbar">
  <span class="logo">MySite</span>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Blog</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<style>
/* TODO: Flex navbar */
.navbar {
  /* display, justify-content, align-items */
  /* padding: 1rem 2rem */
  /* background: #1a1a2e; color: white */
}

.nav-links {
  /* display, gap: 1.5rem */
  /* list-style: none; margin: 0; padding: 0 */
}

.nav-links a {
  /* color: white; text-decoration: none */
}

.nav-links a:hover {
  /* color: #60a5fa */
}
</style>`,
        hints: [
          'align-items: center vertically centres the logo and links even if they have different heights',
          'Set margin: 0 and padding: 0 on .nav-links to remove default <ul> spacing',
          'Add transition: color 0.2s to links for a smooth hover colour change'
        ],
        expectedOutput: `Dark navigation bar spanning full width
Logo text on the left, four links spaced evenly on the right
Links turn blue on hover with a smooth transition`,
        solution: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1a1a2e;
  color: white;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #60a5fa;
}`
      },
      {
        title: 'Step 3: Equal-Height Card Grid',
        instruction: 'WHAT: Build a wrapping card grid where all cards in a row have equal height and the card footer is always pinned to the bottom. WHY: flex-wrap: wrap lets cards flow onto new rows instead of overflowing. flex: 1 1 300px means each card can grow and shrink but never becomes narrower than 300px. Nesting Flexbox inside each card (flex-direction: column) combined with flex: 1 on the body pushes the footer down. HOW: Create .card-container with display: flex, flex-wrap: wrap, and gap. Each .card uses display: flex and flex-direction: column. Set flex: 1 on .card-body and margin-top: auto on .card-footer.',
        starterCode: `<!-- HTML structure -->
<div class="card-container">
  <div class="card">
    <div class="card-body">
      <h3>Card One</h3>
      <p>Short content.</p>
    </div>
    <div class="card-footer">
      <button>Read more</button>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3>Card Two</h3>
      <p>This card has a lot more content than the others to demonstrate equal-height behaviour across the row.</p>
    </div>
    <div class="card-footer">
      <button>Read more</button>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3>Card Three</h3>
      <p>Medium amount of content here.</p>
    </div>
    <div class="card-footer">
      <button>Read more</button>
    </div>
  </div>
</div>

<style>
/* TODO: Wrapping card container */
.card-container {
  /* display: flex; flex-wrap: wrap; gap: 1rem */
}

/* TODO: Individual card — column flex so footer pins to bottom */
.card {
  /* flex: 1 1 300px */
  /* display: flex; flex-direction: column */
  /* border, border-radius, padding */
}

/* TODO: Card body takes all available space */
.card-body {
  /* flex: 1 */
}

/* TODO: Footer stays at the bottom regardless of content height */
.card-footer {
  /* margin-top: auto; padding-top: 1rem; border-top */
}
</style>`,
        hints: [
          'flex: 1 1 300px is shorthand for flex-grow: 1; flex-shrink: 1; flex-basis: 300px',
          'margin-top: auto on the footer pushes it to the bottom of the flex column — this is the classic "sticky footer in a card" trick',
          'Use align-items: stretch (the default) on .card-container so all cards in a row match the tallest one'
        ],
        expectedOutput: `Three cards in a wrapping row, all the same height as the tallest card
"Read more" button is pinned to the bottom of every card
Cards wrap to a new row when the viewport narrows below 300px × 3`,
        solution: `.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
}

.card-body {
  flex: 1;
}

.card-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}`
      },
      {
        title: 'Step 4: Centred Hero and Sidebar Layout',
        instruction: 'WHAT: Implement two more essential Flexbox patterns: a vertically and horizontally centred hero section, and a fixed-width sidebar layout. WHY: Centring content was historically tricky — Flexbox makes it a two-property solution (justify-content + align-items on the container). The sidebar layout uses flex: 0 0 250px to create a fixed-width sidebar that never grows or shrinks, with the main content using flex: 1 to consume all remaining space. HOW: Create .centered with min-height: 100vh and both centering properties. Create .layout, .sidebar (flex: 0 0 250px), and .main-content (flex: 1).',
        starterCode: `<!-- Hero section -->
<div class="centered">
  <div class="hero-content">
    <h1>Welcome to LearnTech</h1>
    <p>Build modern web interfaces with CSS.</p>
  </div>
</div>

<!-- Sidebar layout -->
<div class="layout">
  <aside class="sidebar">
    <p>Sidebar</p>
  </aside>
  <section class="main-content">
    <p>Main content area takes all remaining space.</p>
  </section>
</div>

<style>
/* TODO: Full-viewport centered hero */
.centered {
  /* display: flex */
  /* justify-content: center */
  /* align-items: center */
  /* min-height: 100vh */
  /* background: #f0f4ff */
}

/* TODO: Sidebar layout — fixed sidebar, flexible main */
.layout {
  /* display: flex */
  /* min-height: 100vh */
}

.sidebar {
  /* flex: 0 0 250px — no grow, no shrink, fixed 250px */
  /* background: #f5f5f5 */
  /* padding: 1rem */
}

.main-content {
  /* flex: 1 — takes all remaining width */
  /* padding: 2rem */
}
</style>`,
        hints: [
          'justify-content controls the main axis (horizontal by default); align-items controls the cross axis (vertical by default)',
          'flex: 0 0 250px prevents the sidebar from growing OR shrinking — it is always exactly 250px wide',
          'flex: 1 on .main-content is shorthand for flex-grow: 1; flex-shrink: 1; flex-basis: 0 — it fills all leftover space'
        ],
        expectedOutput: `Hero: content is perfectly centred in the full viewport height
Sidebar layout: 250px sidebar on the left, main content fills the rest
Both panels fill the full viewport height`,
        solution: `.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f4ff;
}

.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 250px;
  background: #f5f5f5;
  padding: 1rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
}`
      },
      {
        title: 'Step 5: Input Group and Responsive Footer',
        instruction: 'WHAT: Build a search input group where the input stretches to fill available space and the button stays fixed-width, plus a three-column footer that stacks on mobile. WHY: Flexbox input groups keep the button visually attached to the input regardless of screen width — the input uses flex: 1 to grow while the button uses flex-shrink: 0 to maintain its width. For the footer, flex-wrap: wrap and a media query produce a stacked mobile layout from the same HTML. HOW: Create .input-group with display: flex. Set flex: 1 on the input. Add @media (max-width: 600px) on the footer columns to switch to flex-direction: column.',
        starterCode: `<!-- Search input group -->
<div class="input-group">
  <input type="search" placeholder="Search articles...">
  <button type="submit">Search</button>
</div>

<!-- Three-column footer -->
<footer class="site-footer">
  <div class="footer-col">
    <h4>Company</h4>
    <ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li></ul>
  </div>
  <div class="footer-col">
    <h4>Resources</h4>
    <ul><li><a href="#">Docs</a></li><li><a href="#">Blog</a></li></ul>
  </div>
  <div class="footer-col">
    <h4>Legal</h4>
    <ul><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li></ul>
  </div>
</footer>

<style>
/* TODO: Input group */
.input-group {
  /* display: flex */
}

.input-group input {
  /* flex: 1; padding: 0.5rem 1rem; border: 1px solid #ccc */
}

.input-group button {
  /* flex-shrink: 0; padding: 0.5rem 1.5rem */
}

/* TODO: Three-column footer */
.site-footer {
  /* display: flex; gap: 2rem; padding: 2rem; background: #1a1a2e; color: white */
}

.footer-col {
  /* flex: 1 */
}

/* TODO: Stack on small screens */
@media (max-width: 600px) {
  .site-footer {
    /* flex-direction: column */
  }
}
</style>`,
        hints: [
          'flex-shrink: 0 on the button prevents it from shrinking below its natural width when the input takes space',
          'Remove borders on adjacent sides of input and button, or use a negative margin, to make them look joined',
          'flex: 1 on .footer-col means all three columns are equal width — change to flex: 2 on one column to make it wider'
        ],
        expectedOutput: `Input group: input stretches to fill width, button stays at its natural size
Desktop footer: three equal-width columns side by side
Mobile footer (<600px): three columns stacked vertically`,
        solution: `.input-group {
  display: flex;
}

.input-group input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-right: none;
}

.input-group button {
  flex-shrink: 0;
  padding: 0.5rem 1.5rem;
  background: #4361ee;
  color: white;
  border: 1px solid #4361ee;
  cursor: pointer;
}

.site-footer {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #1a1a2e;
  color: white;
}

.footer-col {
  flex: 1;
}

@media (max-width: 600px) {
  .site-footer {
    flex-direction: column;
  }
}`
      }
    ]
  },

  // ============================================================
  // LAB 4 — CSS Grid Dashboard Layout (from sandbox hc-3)
  // ============================================================
  {
    id: 'hc-lab-4',
    languageId: 'html-css',
    level: 'mid',
    title: 'CSS Grid Dashboard Layout',
    description: 'Build a responsive admin dashboard using CSS Grid template areas, named grid lines, auto-fit widget grids, and column/row spanning — then make it fully responsive with a single-column mobile layout.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your HTML/CSS Environment',
        setupReference: true,
        instruction: 'Before building web interfaces, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: a modern code editor (VS Code with Live Server extension), browser DevTools, and Node.js for build tools. Open your browser DevTools (F12) to inspect and debug your work. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Install the VS Code Live Server extension for instant preview',
          'Open Chrome DevTools (F12) and familiarize yourself with the Elements panel'
        ],
        expectedOutput: 'VS Code with Live Server extension installed\nBrowser DevTools accessible via F12\nLive Server running at localhost:5500',
        solution: null
      },
      {
        title: 'Step 2: Define Grid Template Areas',
        instruction: 'WHAT: Define a CSS Grid dashboard layout with named template areas for header, sidebar, main content, widgets, and footer. WHY: grid-template-areas provides a visual ASCII-art map of your layout directly in CSS, making the structure instantly readable and maintainable. Assigning each child an area name with grid-area eliminates the need for hardcoded row/column numbers. HOW: Create a .dashboard container with display: grid and grid-template-areas using a four-row, three-column layout. Use grid-template-columns: 250px 1fr 1fr and grid-template-rows: auto 1fr auto auto. Assign each child the matching grid-area value.',
        starterCode: `<!-- Dashboard HTML structure -->
<div class="dashboard">
  <header class="dash-header">Header</header>
  <nav class="dash-sidebar">Sidebar</nav>
  <main class="dash-main">Main Content</main>
  <section class="dash-widgets">Widgets</section>
  <footer class="dash-footer">Footer</footer>
</div>

<style>
/* TODO: Grid container with named areas */
.dashboard {
  display: grid;
  /* grid-template-areas:
     "header  header  header"
     "sidebar main    main"
     "sidebar widgets widgets"
     "footer  footer  footer" */

  /* grid-template-columns: 250px 1fr 1fr */
  /* grid-template-rows: auto 1fr auto auto */
  /* min-height: 100vh; gap: 1rem; padding: 1rem */
}

/* TODO: Assign each element to its named area */
.dash-header  { /* grid-area: header  */ }
.dash-sidebar { /* grid-area: sidebar */ }
.dash-main    { /* grid-area: main    */ }
.dash-widgets { /* grid-area: widgets */ }
.dash-footer  { /* grid-area: footer  */ }

/* Add background colours so you can see the regions */
.dash-header  { background: #1e293b; color: white; padding: 1rem; }
.dash-sidebar { background: #f1f5f9; padding: 1rem; }
.dash-main    { background: #fff; padding: 1rem; }
.dash-widgets { background: #f8fafc; padding: 1rem; }
.dash-footer  { background: #334155; color: white; padding: 1rem; }
</style>`,
        hints: [
          'Each string in grid-template-areas represents one row; repeated area names span multiple columns',
          'The sidebar appears in two rows ("sidebar main main" and "sidebar widgets widgets") so it spans the full height of both rows automatically',
          'Open DevTools → Elements → select .dashboard → the Layout panel shows named grid areas as an overlay'
        ],
        expectedOutput: `Full-viewport dashboard with five coloured regions:
- Header spans all 3 columns at the top
- Sidebar spans rows 2-3 on the left (250px wide)
- Main content occupies row 2, columns 2-3
- Widgets occupy row 3, columns 2-3
- Footer spans all 3 columns at the bottom`,
        solution: `.dashboard {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar main    main"
    "sidebar widgets widgets"
    "footer  footer  footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: auto 1fr auto auto;
  min-height: 100vh;
  gap: 1rem;
  padding: 1rem;
}

.dash-header  { grid-area: header; }
.dash-sidebar { grid-area: sidebar; }
.dash-main    { grid-area: main; }
.dash-widgets { grid-area: widgets; }
.dash-footer  { grid-area: footer; }`
      },
      {
        title: 'Step 3: Auto-Fit Widget Grid with Spanning',
        instruction: 'WHAT: Replace the plain widgets section with an auto-fit grid of cards, where some cards span multiple columns or rows. WHY: repeat(auto-fit, minmax(200px, 1fr)) creates a self-organising grid — it adds as many columns as fit at 200px minimum width, expanding each to 1fr. This removes the need for breakpoint-specific column counts. grid-column: span 2 and grid-row: span 2 let specific widgets take more space. HOW: Add a .widget-grid inside .dash-widgets. Set grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)). Add .widget--wide (grid-column: span 2) and .widget--tall (grid-row: span 2) modifier classes.',
        starterCode: `<!-- Replace the widgets section content -->
<section class="dash-widgets">
  <div class="widget-grid">
    <div class="widget widget--wide">
      <h4>Revenue Overview</h4>
      <p>$128,430 this month</p>
    </div>
    <div class="widget">
      <h4>New Users</h4>
      <p>1,204</p>
    </div>
    <div class="widget widget--tall">
      <h4>Recent Activity</h4>
      <p>Long list of events...</p>
    </div>
    <div class="widget">
      <h4>Conversion Rate</h4>
      <p>3.4%</p>
    </div>
    <div class="widget">
      <h4>Page Views</h4>
      <p>48,200</p>
    </div>
  </div>
</section>

<style>
/* TODO: Auto-fit widget grid */
.widget-grid {
  /* display: grid */
  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) */
  /* gap: 1rem */
}

.widget {
  /* padding: 1.5rem; border-radius: 12px; background: white */
  /* box-shadow: 0 1px 3px rgba(0,0,0,0.1) */
}

/* TODO: Spanning modifiers */
.widget--wide {
  /* grid-column: span 2 */
}

.widget--tall {
  /* grid-row: span 2 */
}
</style>`,
        hints: [
          'minmax(200px, 1fr) means "at least 200px wide, but grow to fill an equal share of leftover space"',
          'grid-auto-flow: dense fills in gaps left by spanning items — useful for masonry-like layouts',
          'If a spanning item would overflow the grid, it moves to the next row — you may need to add enough non-spanning items to fill the gaps'
        ],
        expectedOutput: `Widget grid with auto-calculated column count based on container width
Revenue Overview card spans 2 columns (wide)
Recent Activity card spans 2 rows (tall)
All cards have white background, rounded corners, and shadow`,
        solution: `.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.widget {
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.widget--wide {
  grid-column: span 2;
}

.widget--tall {
  grid-row: span 2;
}`
      },
      {
        title: 'Step 4: Responsive Mobile Layout',
        instruction: 'WHAT: Redefine the grid template areas for screens under 768px so the layout collapses into a single column with a logical reading order. WHY: Named grid areas make responsive redesigns straightforward — you only change the area map, not every child element. The mobile order should prioritise content: header → main → widgets → sidebar → footer, so the sidebar does not block content on small screens. HOW: Add a @media (max-width: 768px) block that overrides grid-template-areas to a single-column layout and sets grid-template-columns: 1fr.',
        starterCode: `/* Continue from Step 3 — add to your stylesheet */

/* TODO: Mobile layout — single column, reordered areas */
@media (max-width: 768px) {
  .dashboard {
    /* Override grid-template-areas to single column:
       "header"
       "main"
       "widgets"
       "sidebar"
       "footer"
    */
    /* grid-template-columns: 1fr */
  }
}

/* Bonus: Make widget--wide not span 2 columns on mobile
   (it would overflow a 1-column grid) */
@media (max-width: 768px) {
  .widget--wide {
    /* grid-column: span 1 */
  }
}`,
        hints: [
          'Switching grid-template-areas is all that is needed — each child already has its grid-area assigned and will move automatically',
          'A wide-spanning widget in a 1-column grid would try to span 2 columns that do not exist — reset it to span 1 to avoid overflow',
          'Use DevTools device toolbar (Ctrl+Shift+M) to preview your layout at different viewport widths without resizing the browser window'
        ],
        expectedOutput: `At viewport widths below 768px:
- Single-column layout (no sidebar column)
- Order: Header → Main → Widgets → Sidebar → Footer
- widget--wide resets to full width (no column spanning)
- No horizontal scroll`,
        solution: `@media (max-width: 768px) {
  .dashboard {
    grid-template-areas:
      "header"
      "main"
      "widgets"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }

  .widget--wide {
    grid-column: span 1;
  }
}`
      }
    ]
  },

  // ============================================================
  // LAB 5 — Dark Mode Toggle with CSS Variables (from sandbox hc-4)
  // ============================================================
  {
    id: 'hc-lab-5',
    languageId: 'html-css',
    level: 'mid',
    title: 'Dark Mode Toggle with CSS Variables',
    description: 'Implement a complete light/dark theming system using CSS custom properties, system preference detection via prefers-color-scheme, and a JavaScript toggle that swaps a data-theme attribute — all without any CSS framework.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your HTML/CSS Environment',
        setupReference: true,
        instruction: 'Before building web interfaces, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: a modern code editor (VS Code with Live Server extension), browser DevTools, and Node.js for build tools. Open your browser DevTools (F12) to inspect and debug your work. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Install the VS Code Live Server extension for instant preview',
          'Open Chrome DevTools (F12) and familiarize yourself with the Elements panel'
        ],
        expectedOutput: 'VS Code with Live Server extension installed\nBrowser DevTools accessible via F12\nLive Server running at localhost:5500',
        solution: null
      },
      {
        title: 'Step 2: Define CSS Custom Property Tokens',
        instruction: 'WHAT: Define a complete set of design tokens as CSS custom properties on :root for the light theme, and override them on [data-theme="dark"]. WHY: CSS custom properties (variables) are live — when you change a property on :root or a parent element, every descendant that references it updates instantly. This makes theme switching a single attribute change instead of toggling dozens of classes. HOW: Declare --color-bg, --color-surface, --color-text, --color-text-secondary, --color-primary, --color-primary-light, --color-border, --color-shadow, --radius, and --transition on :root. Then redefine the colour tokens only inside [data-theme="dark"].',
        starterCode: `<style>
/* TODO: Light theme tokens on :root */
:root {
  /* Backgrounds */
  /* --color-bg: #ffffff */
  /* --color-surface: #f8f9fa */

  /* Text */
  /* --color-text: #1a1a2e */
  /* --color-text-secondary: #6c757d */

  /* Accent */
  /* --color-primary: #4361ee */
  /* --color-primary-light: #5a7bff */

  /* Borders and shadows */
  /* --color-border: #dee2e6 */
  /* --color-shadow: rgba(0, 0, 0, 0.1) */

  /* Shared non-colour tokens */
  /* --radius: 8px */
  /* --transition: 200ms ease */
}

/* TODO: Dark theme — override colour tokens only */
[data-theme="dark"] {
  /* --color-bg: #0f0f23 */
  /* --color-surface: #1a1a2e */
  /* --color-text: #e8e8e8 */
  /* --color-text-secondary: #9ca3af */
  /* --color-primary: #7c8cf8 */
  /* --color-primary-light: #9baaf9 */
  /* --color-border: #2d2d44 */
  /* --color-shadow: rgba(0, 0, 0, 0.3) */
}

/* TODO: Apply tokens to body */
body {
  /* background: var(--color-bg) */
  /* color: var(--color-text) */
  /* transition: background var(--transition), color var(--transition) */
}
</style>

<body>
  <p>Page content here</p>
</body>`,
        hints: [
          'Custom properties cascade like any CSS property — [data-theme="dark"] overrides :root values for the entire subtree',
          'Non-colour tokens like --radius and --transition do not need a dark variant — only redefine what changes between themes',
          'Open DevTools → Elements → :root → Styles panel to see all custom properties and their resolved values'
        ],
        expectedOutput: `Light theme active by default: white background, dark text
No visual change yet (no data-theme attribute on <body>)
Custom properties visible in DevTools Styles panel under :root`,
        solution: `:root {
  --color-bg: #ffffff;
  --color-surface: #f8f9fa;
  --color-text: #1a1a2e;
  --color-text-secondary: #6c757d;
  --color-primary: #4361ee;
  --color-primary-light: #5a7bff;
  --color-border: #dee2e6;
  --color-shadow: rgba(0, 0, 0, 0.1);
  --radius: 8px;
  --transition: 200ms ease;
}

[data-theme="dark"] {
  --color-bg: #0f0f23;
  --color-surface: #1a1a2e;
  --color-text: #e8e8e8;
  --color-text-secondary: #9ca3af;
  --color-primary: #7c8cf8;
  --color-primary-light: #9baaf9;
  --color-border: #2d2d44;
  --color-shadow: rgba(0, 0, 0, 0.3);
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  transition: background var(--transition), color var(--transition);
}`
      },
      {
        title: 'Step 3: Style Components Using Tokens',
        instruction: 'WHAT: Build .card and .btn-primary components that reference your CSS token variables instead of hardcoded colour values. WHY: Components that consume tokens inherit theme changes for free — you never touch the component CSS when adding a new theme; you only add a new set of token overrides. HOW: Style .card to use var(--color-surface), var(--color-border), var(--radius), and var(--color-shadow). Style .btn-primary and its hover state using var(--color-primary) and var(--color-primary-light). Add transition using var(--transition).',
        starterCode: `<!-- Add cards and a button to your HTML -->
<main style="padding: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
  <div class="card">
    <h3>Card Title</h3>
    <p style="color: var(--color-text-secondary)">Supporting text for this card.</p>
    <button class="btn-primary">Primary Action</button>
  </div>
  <div class="card">
    <h3>Another Card</h3>
    <p style="color: var(--color-text-secondary)">More supporting text here.</p>
    <button class="btn-primary">Primary Action</button>
  </div>
</main>

<style>
/* TODO: Card component using tokens */
.card {
  /* background: var(--color-surface) */
  /* border: 1px solid var(--color-border) */
  /* border-radius: var(--radius) */
  /* box-shadow: 0 2px 8px var(--color-shadow) */
  /* padding: 1.5rem */
  /* min-width: 250px */
}

/* TODO: Primary button using tokens */
.btn-primary {
  /* background: var(--color-primary) */
  /* color: white */
  /* border: none */
  /* padding: 0.5rem 1rem */
  /* border-radius: var(--radius) */
  /* cursor: pointer */
  /* transition: background var(--transition) */
}

.btn-primary:hover {
  /* background: var(--color-primary-light) */
}
</style>`,
        hints: [
          'Hardcoding a colour in a component (e.g., background: white) breaks theming — always use var(--token-name)',
          'The fallback syntax var(--color-border, #ddd) provides a safe default if the custom property is not defined',
          'In DevTools, you can temporarily set document.body.setAttribute("data-theme", "dark") in the Console to preview the dark theme'
        ],
        expectedOutput: `Two cards visible with surface background, border, rounded corners, and shadow
Primary action buttons use the blue primary colour
Hovering a button lightens it with a smooth transition`,
        solution: `.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 2px 8px var(--color-shadow);
  padding: 1.5rem;
  min-width: 250px;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background var(--transition);
  margin-top: 1rem;
}

.btn-primary:hover {
  background: var(--color-primary-light);
}`
      },
      {
        title: 'Step 4: System Preference Detection and Toggle Button',
        instruction: 'WHAT: Detect the user\'s OS colour preference with prefers-color-scheme and add a JavaScript toggle button that switches between themes while persisting the choice to localStorage. WHY: Respecting prefers-color-scheme means users who prefer dark mode see your site dark by default without any interaction. Persisting to localStorage means the preference survives page reloads. HOW: Add the @media (prefers-color-scheme: dark) block to auto-apply dark tokens. Add a toggle <button> to the page. Write a small JS script that reads localStorage on load, sets data-theme on <html>, and toggles it on button click.',
        starterCode: `<!-- Add a toggle button to <body> -->
<button id="theme-toggle" aria-label="Toggle dark mode" style="
  position: fixed; top: 1rem; right: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
">
  Toggle Theme
</button>

<style>
/* TODO: Detect system dark mode preference
   Apply dark tokens when OS is in dark mode,
   but not if the user has explicitly chosen light mode */
@media (prefers-color-scheme: dark) {
  /* :root:not([data-theme="light"]) {
       ... same dark token overrides as Step 2 ...
     } */
}
</style>

<script>
// TODO: On page load, apply saved theme preference
const saved = localStorage.getItem('theme');
if (saved) {
  // Set data-theme attribute on document.documentElement (the <html> element)
}

// TODO: Toggle button click handler
document.getElementById('theme-toggle').addEventListener('click', () => {
  // If current theme is "dark", switch to "light" and save
  // Otherwise switch to "dark" and save
  // Update button label to reflect the current state
});
</script>`,
        hints: [
          ':root:not([data-theme="light"]) targets the root only when it does NOT have data-theme="light" — this lets an explicit light choice override the system preference',
          'document.documentElement is the <html> element — setting data-theme there lets all descendant elements inherit the theme',
          'localStorage.setItem("theme", "dark") persists the value; localStorage.getItem("theme") retrieves it (returns null if not set)'
        ],
        expectedOutput: `Page automatically uses dark theme when OS is set to dark mode
"Toggle Theme" button in the top-right corner switches between light and dark
Theme choice persists across page reloads (check localStorage in DevTools Application tab)
Smooth colour transition on theme switch`,
        solution: `/* CSS */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #0f0f23;
    --color-surface: #1a1a2e;
    --color-text: #e8e8e8;
    --color-text-secondary: #9ca3af;
    --color-primary: #7c8cf8;
    --color-primary-light: #9baaf9;
    --color-border: #2d2d44;
    --color-shadow: rgba(0, 0, 0, 0.3);
  }
}

/* JavaScript */
const saved = localStorage.getItem('theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
}

const btn = document.getElementById('theme-toggle');
btn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  btn.textContent = next === 'dark' ? 'Switch to Light' : 'Switch to Dark';
});`
      }
    ]
  },

  // ============================================================
  // LAB 6 — Container Query Components (from sandbox hc-5)
  // ============================================================
  {
    id: 'hc-lab-6',
    languageId: 'html-css',
    level: 'senior',
    title: 'Container Query Components',
    description: 'Build truly responsive components using CSS container queries — components that adapt to their parent container\'s width rather than the viewport width, enabling reusable UI that works correctly in sidebars, main content areas, and full-width sections alike.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your HTML/CSS Environment',
        setupReference: true,
        instruction: 'Before building web interfaces, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: a modern code editor (VS Code with Live Server extension), browser DevTools, and Node.js for build tools. Open your browser DevTools (F12) to inspect and debug your work. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Install the VS Code Live Server extension for instant preview',
          'Open Chrome DevTools (F12) and familiarize yourself with the Elements panel'
        ],
        expectedOutput: 'VS Code with Live Server extension installed\nBrowser DevTools accessible via F12\nLive Server running at localhost:5500',
        solution: null
      },
      {
        title: 'Step 2: Establish Container Contexts',
        instruction: 'WHAT: Set up container contexts with container-type and container-name on wrapper elements. WHY: A CSS container query (@container) checks the size of the nearest container ancestor, not the viewport. To enable this, the parent must opt in with container-type: inline-size (which measures the container\'s inline — horizontal — dimension). Without this, @container rules are ignored. HOW: Add container-type: inline-size and container-name: card to .card-container. Add a second named container .widget-area with container-name: widgets. Create a basic stacked (mobile-first) layout for .responsive-card using CSS Grid.',
        starterCode: `<!-- Two different placements of the same card component -->
<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; padding: 2rem;">

  <!-- Narrow context — simulates a sidebar -->
  <div class="card-container">
    <div class="responsive-card">
      <img class="card-image" src="https://picsum.photos/400/300" alt="Sample photo">
      <div class="card-content">
        <h3 class="card-title">Sidebar Card</h3>
        <div class="card-meta">
          <span>5 min read</span>
          <span>March 2025</span>
        </div>
        <p>This card adapts to its container width.</p>
      </div>
      <div class="card-actions">
        <button>Save</button>
        <button>Share</button>
      </div>
    </div>
  </div>

  <!-- Wide context — simulates main content area -->
  <div class="card-container">
    <div class="responsive-card">
      <img class="card-image" src="https://picsum.photos/400/300" alt="Sample photo">
      <div class="card-content">
        <h3 class="card-title">Main Content Card</h3>
        <div class="card-meta">
          <span>12 min read</span>
          <span>March 2025</span>
        </div>
        <p>This card also adapts — but its container is wider so it uses a different layout.</p>
      </div>
      <div class="card-actions">
        <button>Save</button>
        <button>Share</button>
      </div>
    </div>
  </div>

</div>

<style>
/* TODO: Opt in to container queries */
.card-container {
  /* container-type: inline-size */
  /* container-name: card */
}

/* TODO: Mobile-first card layout (stacked) */
.responsive-card {
  /* display: grid; gap: 1rem; padding: 1rem */
  /* border: 1px solid #ddd; border-radius: 12px; background: white */
}

.card-image {
  /* width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 8px */
}

.card-meta {
  /* display: none — hidden in small containers */
}

.card-actions {
  /* display: none — hidden in small containers */
}
</style>`,
        hints: [
          'container-type: inline-size means the container is measured along the inline axis (horizontal in English/LTR layouts)',
          'container-name is optional but required when you have nested containers and need to target a specific ancestor by name',
          'The card-meta and card-actions are hidden by default (mobile-first) and shown only when the container is wide enough'
        ],
        expectedOutput: `Both card containers opt in with container-type: inline-size
Stacked card layout in both containers (image above, content below)
card-meta and card-actions are hidden (display: none)`,
        solution: `.card-container {
  container-type: inline-size;
  container-name: card;
}

.responsive-card {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
}

.card-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 8px;
}

.card-meta {
  display: none;
}

.card-actions {
  display: none;
}`
      },
      {
        title: 'Step 3: Write Container Query Rules',
        instruction: 'WHAT: Add @container card rules that change the card layout at two breakpoints: medium (400px+) and large (600px+). WHY: Container queries let the same component be in a sidebar at 250px wide and a content area at 700px wide — and look correct in both places without any JavaScript or extra CSS classes. The component is responsive to its context, not the page. HOW: At min-width: 400px change .responsive-card to a 2-column grid (150px image + 1fr content), make .card-meta visible. At min-width: 600px change to a 3-column grid (200px + 1fr + auto for actions), increase font size, and show .card-actions.',
        starterCode: `/* Continue from Step 2 — add container query rules */

/* TODO: Medium container (400px+) */
@container card (min-width: 400px) {
  .responsive-card {
    /* grid-template-columns: 150px 1fr */
    /* align-items: center */
  }

  .card-image {
    /* aspect-ratio: 1 */
    /* border-radius: 8px */
  }

  .card-meta {
    /* display: flex; gap: 1rem; font-size: 0.85rem; color: #666 */
  }
}

/* TODO: Large container (600px+) */
@container card (min-width: 600px) {
  .responsive-card {
    /* grid-template-columns: 200px 1fr auto */
    /* padding: 1.5rem */
  }

  .card-title {
    /* font-size: 1.25rem */
  }

  .card-actions {
    /* display: flex; align-items: center; gap: 0.5rem */
  }
}`,
        hints: [
          '@container card targets the container named "card" specifically — without a name it would match the nearest container ancestor',
          'align-items: center on the grid container vertically centres the image, content, and actions columns',
          'Resize the outer grid columns in DevTools to see both cards respond to their own container width independently'
        ],
        expectedOutput: `Narrow container (sidebar card, ~280px):
- Stacked layout, no meta, no actions

Medium container (400px+):
- Side-by-side: square image (150px) + content
- Meta row (read time, date) becomes visible

Large container (600px+):
- Three columns: wide image (200px) + content + actions
- Larger card title
- Save and Share buttons visible`,
        solution: `@container card (min-width: 400px) {
  .responsive-card {
    grid-template-columns: 150px 1fr;
    align-items: center;
  }

  .card-image {
    aspect-ratio: 1;
    border-radius: 8px;
  }

  .card-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #666;
  }
}

@container card (min-width: 600px) {
  .responsive-card {
    grid-template-columns: 200px 1fr auto;
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .card-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}`
      },
      {
        title: 'Step 4: Nested Containers for a Widget Area',
        instruction: 'WHAT: Create a .widget-area container with a nested .widget-grid inside it, where the grid column count changes based on the widget-area container\'s width. WHY: Container queries compose — you can have containers inside containers, each responding to its own parent. This allows a widget panel to go from 1 column to 2 to 3 columns as the panel itself grows, completely independently of the viewport width or any other container on the page. HOW: Add a .widget-area div with container-type: inline-size and container-name: widgets. Create .widget-grid inside it. Write @container widgets rules at 500px (2 columns) and 800px (3 columns).',
        starterCode: `<!-- Widget area HTML (add below the card demo) -->
<div class="widget-area" style="padding: 2rem; border-top: 1px solid #ddd; margin-top: 2rem;">
  <h2>Dashboard Widgets</h2>
  <div class="widget-grid">
    <div class="widget-card"><h4>Users</h4><p>1,204</p></div>
    <div class="widget-card"><h4>Revenue</h4><p>$48,200</p></div>
    <div class="widget-card"><h4>Orders</h4><p>342</p></div>
    <div class="widget-card"><h4>Returns</h4><p>12</p></div>
    <div class="widget-card"><h4>Satisfaction</h4><p>4.8/5</p></div>
    <div class="widget-card"><h4>Uptime</h4><p>99.9%</p></div>
  </div>
</div>

<style>
/* TODO: Widget area container context */
.widget-area {
  /* container-type: inline-size */
  /* container-name: widgets */
}

/* Base: single column */
.widget-grid {
  /* display: grid; grid-template-columns: 1fr; gap: 1rem */
}

.widget-card {
  /* padding: 1.5rem; background: white; border-radius: 8px */
  /* border: 1px solid #e2e8f0 */
}

/* TODO: 2 columns when widget area is 500px+ */
@container widgets (min-width: 500px) {
  .widget-grid {
    /* grid-template-columns: repeat(2, 1fr) */
  }
}

/* TODO: 3 columns when widget area is 800px+ */
@container widgets (min-width: 800px) {
  .widget-grid {
    /* grid-template-columns: repeat(3, 1fr) */
  }
}
</style>`,
        hints: [
          'Each container is independent — the card container and widget container can fire their breakpoints at completely different moments',
          'Try placing the widget-area inside a CSS Grid cell that changes width with a resize handle to see the container query respond',
          'Container query units (cqw, cqh) let you size elements relative to the container: font-size: 5cqw sets the font to 5% of the container width'
        ],
        expectedOutput: `Widget area with 6 stat cards:
- Narrow widget area: 1 column
- Widget area 500px+: 2-column grid
- Widget area 800px+: 3-column grid
- Changes are independent of viewport width`,
        solution: `.widget-area {
  container-type: inline-size;
  container-name: widgets;
}

.widget-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.widget-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

@container widgets (min-width: 500px) {
  .widget-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container widgets (min-width: 800px) {
  .widget-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`
      },
      {
        title: 'Step 5: Responsive Navigation via Container Query',
        instruction: 'WHAT: Build a navigation component that shows a horizontal link list when its container is wide enough, and a hamburger menu button when the container is narrow. WHY: This is the classic use case that makes container queries shine over media queries — a nav component inside a modal is narrow; the same nav in a full-width header is wide. With media queries you would need separate CSS for each placement. With container queries, the component handles both cases itself. HOW: Create .nav-container with container-type: inline-size. Show .nav-hamburger and hide .nav-links by default (narrow). At @container nav (min-width: 600px), hide the hamburger and show the links as a flex row.',
        starterCode: `<!-- Navigation component -->
<div class="nav-container" style="border: 2px dashed #ccc; padding: 0.5rem; margin: 2rem;">
  <div class="responsive-nav">
    <!-- Hamburger (shown in narrow containers) -->
    <button class="nav-hamburger" aria-label="Open menu">
      &#9776; Menu
    </button>

    <!-- Horizontal links (shown in wide containers) -->
    <ul class="nav-links">
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Reports</a></li>
      <li><a href="#">Settings</a></li>
      <li><a href="#">Help</a></li>
    </ul>
  </div>
</div>

<style>
/* TODO: Container context for the nav wrapper */
.nav-container {
  /* container-type: inline-size */
  /* container-name: nav */
}

.responsive-nav {
  /* display: flex; align-items: center */
}

/* Default: show hamburger, hide links */
.nav-hamburger {
  /* display: block; padding: 0.5rem 1rem; cursor: pointer */
}

.nav-links {
  /* display: none */
  /* list-style: none; margin: 0; padding: 0 */
}

/* TODO: When nav container is 600px or wider */
@container nav (min-width: 600px) {
  .nav-hamburger {
    /* display: none */
  }

  .nav-links {
    /* display: flex; gap: 1.5rem */
  }

  .nav-links a {
    /* text-decoration: none; color: inherit */
  }
}
</style>`,
        hints: [
          'Resize the dashed border container by changing its width in DevTools to see the nav switch between hamburger and horizontal modes',
          'The container does not have to be the direct parent — container queries scan up the DOM tree to the nearest container ancestor with a matching name',
          'For a production hamburger menu, add aria-expanded and JavaScript to toggle a mobile menu; this exercise focuses on the CSS container query mechanism'
        ],
        expectedOutput: `Narrow nav container (<600px): hamburger button visible, nav links hidden
Wide nav container (600px+): hamburger hidden, nav links shown as a horizontal flex row
Same HTML, same CSS file — behaviour determined entirely by container width`,
        solution: `.nav-container {
  container-type: inline-size;
  container-name: nav;
}

.responsive-nav {
  display: flex;
  align-items: center;
}

.nav-hamburger {
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.nav-links {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
}

@container nav (min-width: 600px) {
  .nav-hamburger {
    display: none;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    text-decoration: none;
    color: inherit;
  }
}`
      }
    ]
  }
]
