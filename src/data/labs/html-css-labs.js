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
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
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
    <p>&copy; 2026 My Blog. All rights reserved.</p>
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
     - A <p> containing: &copy; 2026 Tech Learning -->

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
  <p>&copy; 2026 Tech Learning</p>
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
  },

  // ============================================================
  // LAB 7 — Box Model & Positioning
  // ============================================================
  {
    id: 'hc-lab-7',
    languageId: 'html-css',
    level: 'beginner',
    title: 'Box Model & Positioning',
    description: 'Master the CSS box model (content-box vs border-box, margin collapse) and all five position values — static, relative, absolute, fixed, and sticky.',
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
        title: 'Step 2: box-sizing — content-box vs border-box',
        instruction: 'WHAT: Create two boxes of the same declared width. One uses the default content-box model; the other uses border-box. Add equal padding to both and observe how their rendered widths differ. Then apply box-sizing: border-box globally. WHY: With content-box, padding is added outside the declared width, so a 200px wide element with 20px padding renders as 240px. With border-box, padding is included inside the declared width — 200px stays 200px. The global reset (*, *::before, *::after) is the first rule in virtually every modern stylesheet. HOW: Create two <div> elements with identical CSS except box-sizing. Use DevTools (Elements → Computed) to compare their actual widths.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Box Model</title>
  <style>
    /* TODO: Add a global box-sizing reset here */

    .box {
      width: 200px;
      padding: 20px;
      border: 2px solid steelblue;
      margin-bottom: 1rem;
      background: lightblue;
    }

    /* TODO: Create .box-content that uses box-sizing: content-box */
    /* TODO: Create .box-border that uses box-sizing: border-box */
  </style>
</head>
<body>
  <h1>Box Sizing Demo</h1>

  <!-- TODO: Add two divs — one with class "box box-content", one with "box box-border" -->
  <!-- Label each one with a <p> inside explaining which model it uses -->
</body>
</html>`,
        hints: [
          'The global reset is: *, *::before, *::after { box-sizing: border-box; }',
          'content-box: rendered width = declared width + padding-left + padding-right + border-left + border-right',
          'border-box: rendered width = declared width (padding and border eat into the interior)',
          'Check actual rendered width in DevTools → Elements → Computed → width'
        ],
        expectedOutput: 'Two boxes both declared at 200px width.\nThe content-box box renders wider (240px or more) due to padding being added outside.\nThe border-box box stays at exactly 200px.\nAfter the global reset, all new elements default to border-box.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Box Model</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      font-family: sans-serif;
      padding: 2rem;
    }

    .box {
      width: 200px;
      padding: 20px;
      border: 2px solid steelblue;
      margin-bottom: 1rem;
      background: lightblue;
    }

    .box-content {
      box-sizing: content-box;
    }

    .box-border {
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <h1>Box Sizing Demo</h1>

  <div class="box box-content">
    <p>content-box: declared 200px → renders wider (200 + padding + border)</p>
  </div>

  <div class="box box-border">
    <p>border-box: declared 200px → stays exactly 200px</p>
  </div>
</body>
</html>`
      },
      {
        title: 'Step 3: Margin Collapse',
        instruction: 'WHAT: Demonstrate vertical margin collapse between sibling elements and between a parent and its first child. WHY: When two vertical margins meet they collapse into one — the larger margin wins. This happens between siblings (the gap is the max, not the sum) and between a parent and child when there is no border, padding, or block formatting context separating them. It never happens with horizontal margins or with flexbox/grid children. HOW: Create two paragraphs with margin-bottom and margin-top; inspect the gap. Then wrap a child in a parent with no padding — observe the child\'s margin bleeding outside the parent. Fix it by adding padding-top: 1px or overflow: hidden to the parent.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Margin Collapse</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    body { font-family: sans-serif; padding: 2rem; }

    .sibling {
      background: lightcoral;
      padding: 1rem;
      /* TODO: Add margin-bottom: 40px */
    }

    .sibling + .sibling {
      /* TODO: Add margin-top: 20px */
      /* The gap should be 40px (larger wins), not 60px (sum) */
    }

    .parent {
      background: lightyellow;
      border: 2px dashed orange;
      /* TODO: To prevent child margin bleed, try: padding-top: 1px
         or overflow: hidden */
    }

    .child {
      background: lightgreen;
      padding: 1rem;
      /* TODO: Add margin-top: 30px — observe it bleeds outside .parent */
    }
  </style>
</head>
<body>
  <h1>Margin Collapse</h1>

  <h2>Sibling collapse</h2>
  <div class="sibling">Sibling A (margin-bottom: 40px)</div>
  <div class="sibling">Sibling B (margin-top: 20px) — gap is 40px, not 60px</div>

  <h2>Parent/child collapse</h2>
  <div class="parent">
    <div class="child">Child (margin-top: 30px bleeds out of parent)</div>
  </div>
</body>
</html>`,
        hints: [
          'Margins collapse only in the block direction (vertically for horizontal writing modes)',
          'Collapse is prevented by: padding, border, overflow (not visible), display: flex/grid on the parent',
          'Use DevTools box model diagram (Elements → Computed → scroll to the box diagram) to see margin values visually',
          'Negative margins can cancel out positive ones — the result is the largest positive plus the smallest (most negative)'
        ],
        expectedOutput: 'Sibling gap is 40px (larger of 40 and 20), not 60px.\nChild margin-top bleeds outside the parent when parent has no padding/border.\nAdding padding-top: 1px or overflow: hidden to parent contains the child margin.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Margin Collapse</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: 2rem; }

    .sibling {
      background: lightcoral;
      padding: 1rem;
      margin-bottom: 40px;
    }

    .sibling + .sibling {
      margin-top: 20px;
    }

    .parent {
      background: lightyellow;
      border: 2px dashed orange;
      /* overflow: hidden also works */
      padding-top: 1px;
    }

    .child {
      background: lightgreen;
      padding: 1rem;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <h1>Margin Collapse</h1>

  <h2>Sibling collapse</h2>
  <div class="sibling">Sibling A (margin-bottom: 40px)</div>
  <div class="sibling">Sibling B (margin-top: 20px) — gap is 40px, not 60px</div>

  <h2>Parent/child collapse — fixed with padding-top: 1px</h2>
  <div class="parent">
    <div class="child">Child margin is now contained inside parent</div>
  </div>
</body>
</html>`
      },
      {
        title: 'Step 4: Relative and Absolute Positioning',
        instruction: 'WHAT: Build a card with a tooltip badge positioned absolutely relative to its parent. WHY: position: relative keeps the element in normal flow but establishes a positioning context for absolutely positioned descendants. position: absolute removes the element from normal flow and places it relative to the nearest ancestor with a non-static position. Without a positioned ancestor, absolute elements escape to the viewport. HOW: Give the card container position: relative. Absolutely position a "New" badge in the top-right corner using top and right offsets. The badge must sit inside the card regardless of card size.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Positioning</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: 4rem 2rem; }

    .card {
      width: 280px;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      /* TODO: Add position: relative so the badge anchors to this card */
    }

    .badge {
      background: crimson;
      color: white;
      font-size: 0.75rem;
      font-weight: bold;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      /* TODO: position this badge at top: -10px, right: -10px
         using absolute positioning */
    }
  </style>
</head>
<body>
  <h1>Relative + Absolute Positioning</h1>

  <div class="card">
    <!-- TODO: Add the badge INSIDE the card div -->
    <h2>Article Title</h2>
    <p>This card has a "New" badge positioned absolutely in its top-right corner.</p>
  </div>
</body>
</html>`,
        hints: [
          'position: absolute positions relative to the nearest ancestor with position !== static',
          'If no positioned ancestor exists, the element positions relative to the initial containing block (viewport)',
          'top/right/bottom/left offsets move the element from the specified edge',
          'Negative offset values move the element outside the parent boundary'
        ],
        expectedOutput: 'A card with a red "New" badge overlapping its top-right corner.\nThe badge stays anchored to the card regardless of card width.\nRemoving position: relative from .card causes the badge to escape to the viewport corner.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Positioning</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: 4rem 2rem; }

    .card {
      width: 280px;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: relative;
    }

    .badge {
      position: absolute;
      top: -10px;
      right: -10px;
      background: crimson;
      color: white;
      font-size: 0.75rem;
      font-weight: bold;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>Relative + Absolute Positioning</h1>

  <div class="card">
    <span class="badge">New</span>
    <h2>Article Title</h2>
    <p>This card has a "New" badge positioned absolutely in its top-right corner.</p>
  </div>
</body>
</html>`
      },
      {
        title: 'Step 5: Fixed and Sticky Positioning',
        instruction: 'WHAT: Build a sticky site header that stays at the top as the page scrolls, plus a fixed "back to top" button in the bottom-right corner. WHY: position: fixed removes the element from flow and pins it to the viewport — it never scrolls. position: sticky is a hybrid: the element scrolls normally until it hits a threshold (top: 0), then sticks. Sticky requires a defined top/bottom/left/right offset and only sticks within its scroll container. HOW: Add a <header> with position: sticky; top: 0. Add a "↑ Top" anchor with position: fixed; bottom: 1rem; right: 1rem. Give the page enough content to scroll. Note the z-index on the header to stay above content.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fixed & Sticky</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    body {
      font-family: sans-serif;
      margin: 0;
    }

    .site-header {
      background: #1e3a5f;
      color: white;
      padding: 1rem 2rem;
      /* TODO: Make this sticky — stays at top: 0 when scrolling */
      /* TODO: Add z-index: 100 so it overlaps content */
    }

    .back-to-top {
      background: #1e3a5f;
      color: white;
      text-decoration: none;
      padding: 0.75rem 1rem;
      border-radius: 50%;
      font-size: 1.25rem;
      /* TODO: position: fixed, bottom: 1.5rem, right: 1.5rem */
    }

    .content {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    /* Generate enough content to scroll */
    .content p { margin-bottom: 2rem; line-height: 1.8; }
  </style>
</head>
<body id="top">
  <header class="site-header">
    <nav>My Sticky Site</nav>
  </header>

  <div class="content">
    <h1>Scroll down to test sticky and fixed positioning</h1>
    <!-- TODO: Add 10 or more <p> elements with filler text so the page scrolls -->
  </div>

  <!-- TODO: Add an <a href="#top"> with class "back-to-top" and text ↑ -->
</body>
</html>`,
        hints: [
          'position: sticky requires a threshold offset (top: 0) — without it the element never sticks',
          'position: sticky only works within its scroll container; if a parent has overflow: hidden it will not stick',
          'position: fixed always positions relative to the viewport, never relative to a parent element',
          'Add z-index to stacked positioned elements — higher values appear on top'
        ],
        expectedOutput: 'Header sticks to the top of the viewport as the page scrolls.\nThe ↑ button remains fixed in the bottom-right corner at all scroll positions.\nClicking ↑ jumps back to the top of the page.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fixed & Sticky</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    body {
      font-family: sans-serif;
      margin: 0;
    }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #1e3a5f;
      color: white;
      padding: 1rem 2rem;
    }

    .back-to-top {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      background: #1e3a5f;
      color: white;
      text-decoration: none;
      padding: 0.75rem 1rem;
      border-radius: 50%;
      font-size: 1.25rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    .content {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .content p { margin-bottom: 2rem; line-height: 1.8; }
  </style>
</head>
<body id="top">
  <header class="site-header">
    <nav>My Sticky Site</nav>
  </header>

  <div class="content">
    <h1>Scroll down to test sticky and fixed positioning</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem.</p>
    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores.</p>
    <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam.</p>
    <p>Ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem.</p>
    <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.</p>
    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.</p>
  </div>

  <a href="#top" class="back-to-top" aria-label="Back to top">↑</a>
</body>
</html>`
      }
    ]
  },

  // ============================================================
  // LAB 8 — Accessible Forms
  // ============================================================
  {
    id: 'hc-lab-8',
    languageId: 'html-css',
    level: 'mid',
    title: 'Accessible Forms',
    description: 'Build forms that work for everyone — correct label associations, grouped controls with fieldset/legend, ARIA validation states, and visible focus styling.',
    estimatedMinutes: 30,
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
        title: 'Step 2: Proper Label Associations',
        instruction: 'WHAT: Build a login form using both label association patterns — the for/id pattern and the wrapping pattern. WHY: Screen readers announce the label text when focus moves to an input. Without an association, the user hears only the input type with no context. The for/id pattern is most common; the wrapping pattern (label contains the input) also works but can confuse some older assistive technology. Every interactive control must have an accessible name. HOW: Create an email field with <label for="email"> and <input id="email">. Create a password field where the label wraps the input. Add a submit button. Test by tabbing through — a screen reader (or DevTools Accessibility panel) should announce each label.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Login Form</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    body {
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      padding: 3rem 1rem;
      background: #f5f5f5;
    }

    form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 1.25rem;
    }

    label {
      font-weight: 600;
      font-size: 0.9rem;
    }

    input {
      padding: 0.6rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    button[type="submit"] {
      width: 100%;
      padding: 0.75rem;
      background: #1e3a5f;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <form novalidate>
    <h1>Log in</h1>

    <!-- TODO: for/id pattern — label with for="email", input with id="email" -->
    <div class="field">
    </div>

    <!-- TODO: wrapping pattern — label element wraps the input directly -->
    <div class="field">
    </div>

    <button type="submit">Log in</button>
  </form>
</body>
</html>`,
        hints: [
          'for/id pattern: <label for="email">Email</label> <input id="email" type="email">',
          'Wrapping pattern: <label>Password <input type="password"></label>',
          'Both the for/id and wrapping patterns give the input an accessible name',
          'Check DevTools → Elements → Accessibility tab → "Computed Properties" → "Name" to verify the accessible name'
        ],
        expectedOutput: 'A login form with two fields.\nEach input has an accessible name visible in DevTools Accessibility panel.\nTabbing through the form moves focus: Email input → Password input → Submit button.\nScreen readers announce "Email, edit text" and "Password, edit text".',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Login Form</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    body {
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      padding: 3rem 1rem;
      background: #f5f5f5;
    }

    form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 1.25rem;
    }

    label {
      font-weight: 600;
      font-size: 0.9rem;
    }

    input {
      padding: 0.6rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    button[type="submit"] {
      width: 100%;
      padding: 0.75rem;
      background: #1e3a5f;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <form novalidate>
    <h1>Log in</h1>

    <!-- for/id pattern -->
    <div class="field">
      <label for="email">Email address</label>
      <input type="email" id="email" name="email" autocomplete="email">
    </div>

    <!-- wrapping pattern -->
    <div class="field">
      <label>
        Password
        <input type="password" name="password" autocomplete="current-password">
      </label>
    </div>

    <button type="submit">Log in</button>
  </form>
</body>
</html>`
      },
      {
        title: 'Step 3: fieldset and legend for Grouped Controls',
        instruction: 'WHAT: Use <fieldset> and <legend> to group a set of radio buttons and a mailing address section. WHY: Radio buttons and checkboxes that belong to the same question need a group label. <fieldset>/<legend> provides this — screen readers prepend the legend text to each radio button\'s label ("Preferred contact: Phone, radio button"). Without it, the user hears only "Phone, radio button" with no context. <fieldset> also works for logically grouped text inputs (like an address block) to communicate their shared purpose. HOW: Wrap the "Preferred contact" radio group in a <fieldset> with <legend>Preferred contact method</legend>. Wrap street/city/postcode inputs in a second <fieldset> with <legend>Mailing address</legend>.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fieldset & Legend</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: 2rem; max-width: 500px; }

    fieldset {
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 1rem 1.25rem;
      margin-bottom: 1.5rem;
    }

    legend {
      font-weight: 700;
      padding: 0 0.5rem;
    }

    .radio-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 1rem;
    }

    .field label { font-weight: 600; font-size: 0.9rem; }

    .field input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <form>
    <!-- TODO: Wrap in <fieldset> with <legend>Preferred contact method</legend> -->
    <div class="radio-group">
      <label><input type="radio" name="contact" value="email"> Email</label>
      <label><input type="radio" name="contact" value="phone"> Phone</label>
      <label><input type="radio" name="contact" value="post"> Post</label>
    </div>

    <!-- TODO: Wrap in <fieldset> with <legend>Mailing address</legend> -->
    <div>
      <div class="field">
        <label for="street">Street address</label>
        <input type="text" id="street" name="street" autocomplete="street-address">
      </div>
      <div class="field">
        <label for="city">City</label>
        <input type="text" id="city" name="city" autocomplete="address-level2">
      </div>
      <div class="field">
        <label for="postcode">Postcode</label>
        <input type="text" id="postcode" name="postcode" autocomplete="postal-code">
      </div>
    </div>

    <button type="submit">Submit</button>
  </form>
</body>
</html>`,
        hints: [
          '<fieldset> wraps the group; <legend> is its first child and provides the group name',
          'Screen readers announce: "[legend text], [label text], radio button" for each option',
          'autocomplete attribute helps browsers prefill — use values from the HTML autocomplete spec',
          '<fieldset> can be styled — remove default border with border: none, or keep it for visual grouping'
        ],
        expectedOutput: 'Radio buttons grouped in a fieldset with "Preferred contact method" legend.\nAddress inputs grouped in a second fieldset with "Mailing address" legend.\nScreen reader announces "Preferred contact method: Email, radio button" for the first option.\nAutocomplete attributes allow browser autofill for address fields.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fieldset & Legend</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: 2rem; max-width: 500px; }

    fieldset {
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 1rem 1.25rem;
      margin-bottom: 1.5rem;
    }

    legend {
      font-weight: 700;
      padding: 0 0.5rem;
    }

    .radio-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 1rem;
    }

    .field label { font-weight: 600; font-size: 0.9rem; }

    .field input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    button[type="submit"] {
      padding: 0.75rem 2rem;
      background: #1e3a5f;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <form>
    <fieldset>
      <legend>Preferred contact method</legend>
      <div class="radio-group">
        <label><input type="radio" name="contact" value="email"> Email</label>
        <label><input type="radio" name="contact" value="phone"> Phone</label>
        <label><input type="radio" name="contact" value="post"> Post</label>
      </div>
    </fieldset>

    <fieldset>
      <legend>Mailing address</legend>
      <div class="field">
        <label for="street">Street address</label>
        <input type="text" id="street" name="street" autocomplete="street-address">
      </div>
      <div class="field">
        <label for="city">City</label>
        <input type="text" id="city" name="city" autocomplete="address-level2">
      </div>
      <div class="field">
        <label for="postcode">Postcode</label>
        <input type="text" id="postcode" name="postcode" autocomplete="postal-code">
      </div>
    </fieldset>

    <button type="submit">Submit</button>
  </form>
</body>
</html>`
      },
      {
        title: 'Step 4: ARIA for Validation States',
        instruction: 'WHAT: Add ARIA attributes to communicate validation errors to assistive technology. WHY: Visual error styling (red border) is invisible to screen readers. aria-invalid="true" tells the AT the field is in an error state. aria-describedby links the input to an error message element so the screen reader reads the message when focus enters the field. aria-required="true" announces the field as required (the HTML required attribute achieves the same thing natively — use both for maximum compatibility). HOW: Build an email field with aria-required="true". On "submit", if empty: add aria-invalid="true" to the input, set aria-describedby to point to an error <span>, and populate that span with the error text. Remove the attributes when the error clears.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ARIA Validation</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: 2rem; max-width: 420px; }

    .field { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 1.25rem; }
    label { font-weight: 600; font-size: 0.9rem; }

    input {
      padding: 0.6rem 0.75rem;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    /* TODO: Style input[aria-invalid="true"] with a red border */

    .error-msg {
      color: crimson;
      font-size: 0.85rem;
      min-height: 1.2em;
      /* Hidden by default — shown when aria-invalid is present */
    }

    button {
      padding: 0.75rem 2rem;
      background: #1e3a5f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <form id="signup-form" novalidate>
    <h1>Sign up</h1>
    <div class="field">
      <label for="signup-email">Email address</label>
      <!--
        TODO: Add to the input:
          aria-required="true"
          aria-describedby="email-error"
          (and aria-invalid="true" only when there IS an error)
      -->
      <input type="email" id="signup-email" name="email">
      <!-- TODO: Add a <span id="email-error" class="error-msg" role="alert"></span> -->
    </div>
    <button type="submit">Sign up</button>
  </form>

  <script>
    const form = document.getElementById('signup-form');
    const emailInput = document.getElementById('signup-email');
    // TODO: get reference to the error span

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: if emailInput.value is empty:
      //   - set aria-invalid="true" on emailInput
      //   - set errorSpan.textContent to 'Email address is required'
      // else:
      //   - remove aria-invalid attribute from emailInput
      //   - clear errorSpan.textContent
    });
  </script>
</body>
</html>`,
        hints: [
          'aria-invalid="true" is the string "true" (set via setAttribute), not a boolean',
          'aria-describedby takes the id of the element that describes this input — multiple ids are space-separated',
          'role="alert" on the error span causes screen readers to announce it immediately when its content changes',
          'Remove aria-invalid with removeAttribute("aria-invalid") when the error is cleared — do not set it to "false"'
        ],
        expectedOutput: 'Submitting with an empty email shows a visible red error message.\nThe input gains a red border (aria-invalid="true" styling).\nA screen reader announces the error message when focus is on the input.\nFixing the email and resubmitting clears both the error message and the red border.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ARIA Validation</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: 2rem; max-width: 420px; }

    .field { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 1.25rem; }
    label { font-weight: 600; font-size: 0.9rem; }

    input {
      padding: 0.6rem 0.75rem;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    input[aria-invalid="true"] {
      border-color: crimson;
    }

    .error-msg {
      color: crimson;
      font-size: 0.85rem;
      min-height: 1.2em;
    }

    button {
      padding: 0.75rem 2rem;
      background: #1e3a5f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <form id="signup-form" novalidate>
    <h1>Sign up</h1>
    <div class="field">
      <label for="signup-email">Email address</label>
      <input
        type="email"
        id="signup-email"
        name="email"
        aria-required="true"
        aria-describedby="email-error"
      >
      <span id="email-error" class="error-msg" role="alert"></span>
    </div>
    <button type="submit">Sign up</button>
  </form>

  <script>
    const form = document.getElementById('signup-form');
    const emailInput = document.getElementById('signup-email');
    const errorSpan = document.getElementById('email-error');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!emailInput.value.trim()) {
        emailInput.setAttribute('aria-invalid', 'true');
        errorSpan.textContent = 'Email address is required';
        emailInput.focus();
      } else {
        emailInput.removeAttribute('aria-invalid');
        errorSpan.textContent = '';
        alert('Form submitted successfully!');
      }
    });
  </script>
</body>
</html>`
      },
      {
        title: 'Step 5: Focus Styling and Keyboard Navigation',
        instruction: 'WHAT: Add visible :focus-visible styles, verify logical tab order, and add a skip navigation link. WHY: Keyboard users navigate by pressing Tab. Without visible focus indicators, they cannot tell where they are. :focus-visible shows the outline only for keyboard focus (not mouse clicks), avoiding the unwanted ring on click. Skip links let keyboard/screen reader users jump past repeated navigation directly to main content — they should be the first interactive element on the page and are typically visible only on focus. tabindex="0" makes non-interactive elements focusable; tabindex="-1" removes elements from tab order while keeping them programmatically focusable. HOW: Remove any outline: none from inputs/buttons. Add a :focus-visible rule with a high-contrast outline. Add a "Skip to main content" link as the first element in <body>. Verify tab order matches reading order.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Focus & Keyboard Nav</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; margin: 0; }

    /* TODO: Add a .skip-link style:
       - position: absolute; top: -100%; left: 0
       - when focused: top: 0 (use :focus-within or :focus)
       - high contrast background, white text, padding */

    nav {
      background: #1e3a5f;
      padding: 1rem 2rem;
      display: flex;
      gap: 1.5rem;
    }

    nav a {
      color: white;
      text-decoration: none;
    }

    main {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    /* TODO: Style :focus-visible for a, input, button, select, textarea
       Use outline: 3px solid #f90; outline-offset: 2px (or similar high-contrast) */

    /* REMOVE THIS — bad practice: */
    /* *:focus { outline: none; } */

    input, select, textarea {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    button {
      padding: 0.5rem 1.5rem;
      background: #1e3a5f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <!-- TODO: Add a skip link as the FIRST element:
       <a class="skip-link" href="#main-content">Skip to main content</a> -->

  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>

  <!-- TODO: Add id="main-content" and tabindex="-1" to <main>
       tabindex="-1" lets the skip link programmatically focus the main element -->
  <main>
    <h1>Contact us</h1>
    <form>
      <div style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1rem;">
        <label for="name">Your name</label>
        <input type="text" id="name" name="name">
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1rem;">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4"></textarea>
      </div>
      <button type="submit">Send message</button>
    </form>
  </main>
</body>
</html>`,
        hints: [
          ':focus-visible targets keyboard focus only (not mouse/touch); :focus targets all focus',
          'Skip links are typically positioned off-screen (top: -100%) and brought on-screen on :focus',
          'tabindex="-1" on <main> lets the skip link call main.focus() to move keyboard focus past the nav',
          'Never remove outline entirely — instead replace it with a custom outline that meets contrast requirements'
        ],
        expectedOutput: 'Pressing Tab shows a visible orange outline on the focused element.\nThe first Tab press reveals the "Skip to main content" link.\nActivating the skip link moves focus directly to the <main> element, bypassing navigation.\nAll interactive elements are reachable and visibly focused via keyboard.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Focus & Keyboard Nav</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; margin: 0; }

    .skip-link {
      position: absolute;
      top: -100%;
      left: 0;
      background: #1e3a5f;
      color: white;
      padding: 0.75rem 1.5rem;
      z-index: 200;
      text-decoration: none;
      font-weight: 600;
    }

    .skip-link:focus {
      top: 0;
    }

    nav {
      background: #1e3a5f;
      padding: 1rem 2rem;
      display: flex;
      gap: 1.5rem;
    }

    nav a {
      color: white;
      text-decoration: none;
    }

    main {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    :focus-visible {
      outline: 3px solid #f90;
      outline-offset: 2px;
    }

    input, select, textarea {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    button {
      padding: 0.5rem 1.5rem;
      background: #1e3a5f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>

  <main id="main-content" tabindex="-1">
    <h1>Contact us</h1>
    <form>
      <div style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1rem;">
        <label for="name">Your name</label>
        <input type="text" id="name" name="name" autocomplete="name">
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1rem;">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4"></textarea>
      </div>
      <button type="submit">Send message</button>
    </form>
  </main>
</body>
</html>`
      }
    ]
  },

  // ============================================================
  // LAB 9 — CSS Animations
  // ============================================================
  {
    id: 'hc-lab-9',
    languageId: 'html-css',
    level: 'mid',
    title: 'CSS Animations',
    description: 'Build smooth UI animations using CSS transitions and @keyframes, transform functions, and make them accessible with prefers-reduced-motion.',
    estimatedMinutes: 30,
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
        title: 'Step 2: CSS Transitions',
        instruction: 'WHAT: Add smooth hover transitions to a button — background colour, scale, and box-shadow — and chain multiple properties. Experiment with easing functions. WHY: transition interpolates CSS property values between states over time. The shorthand is transition: property duration easing delay. You can animate multiple properties with a comma-separated list. Easing functions (ease, ease-in-out, cubic-bezier()) control the acceleration curve. HOW: Create a button with default and :hover styles. Use transition to animate background-color, transform, and box-shadow. Try changing the easing from ease to cubic-bezier(0.34, 1.56, 0.64, 1) for a springy overshoot effect.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Transitions</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f4f8;
    }

    .btn {
      padding: 0.875rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #1e3a5f;
      color: white;
      /* TODO: Add transition for background-color, transform, and box-shadow
         Use duration: 200ms and easing: ease */
    }

    .btn:hover {
      /* TODO: Change background to a lighter blue */
      /* TODO: Scale up slightly: transform: scale(1.05) */
      /* TODO: Add a box-shadow */
    }

    .btn-spring {
      padding: 0.875rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #2d6a4f;
      color: white;
      /* TODO: Same transition but use cubic-bezier(0.34, 1.56, 0.64, 1) as easing */
    }

    .btn-spring:hover {
      transform: scale(1.1);
      background: #40916c;
    }
  </style>
</head>
<body>
  <button class="btn">Hover me (ease)</button>
  <button class="btn-spring">Hover me (spring)</button>
</body>
</html>`,
        hints: [
          'transition shorthand: transition: property duration easing delay',
          'Chain multiple: transition: background-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
          'Or use transition: all 200ms ease (convenient but transitions every animatable property — can be expensive)',
          'cubic-bezier() lets you define custom easing curves — cubic-bezier.com is a great visual editor'
        ],
        expectedOutput: 'Hovering the first button smoothly transitions background, scale, and shadow over 200ms.\nHovering the spring button overshoots the target scale before settling — a springy feel.\nThe transitions reverse smoothly when the mouse leaves.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Transitions</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f4f8;
    }

    .btn {
      padding: 0.875rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #1e3a5f;
      color: white;
      transition: background-color 200ms ease,
                  transform 200ms ease,
                  box-shadow 200ms ease;
    }

    .btn:hover {
      background: #2d5f8a;
      transform: scale(1.05);
      box-shadow: 0 8px 24px rgba(30, 58, 95, 0.35);
    }

    .btn-spring {
      padding: 0.875rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #2d6a4f;
      color: white;
      transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
                  background-color 200ms ease;
    }

    .btn-spring:hover {
      transform: scale(1.1);
      background: #40916c;
    }
  </style>
</head>
<body>
  <button class="btn">Hover me (ease)</button>
  <button class="btn-spring">Hover me (spring)</button>
</body>
</html>`
      },
      {
        title: 'Step 3: @keyframes Animations',
        instruction: 'WHAT: Create a loading spinner using a rotation @keyframes animation, and a pulsing circle using scale. WHY: @keyframes defines the animation sequence as a set of waypoints. The animation property attaches it to an element. animation-iteration-count: infinite loops it forever. animation-timing-function inside @keyframes controls easing per segment. Spinners use transform: rotate() rather than animating left/top because transforms do not trigger layout — only the composite layer repaints, which is GPU-accelerated. HOW: Create a circular div with a partial border (transparent on one side). Animate with @keyframes spin { to { transform: rotate(360deg) } }. For the pulse, animate transform: scale(1) to scale(1.15) and back, with animation-direction: alternate and iteration-count: infinite.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keyframe Animations</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      display: flex;
      gap: 4rem;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f4f8;
    }

    /* TODO: Define @keyframes spin — from 0deg to 360deg rotate */

    /* TODO: Define @keyframes pulse — scale from 1 to 1.15 */

    .spinner {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 4px solid #ddd;
      /* TODO: Make one side of the border a strong colour (e.g. border-top-color: #1e3a5f) */
      /* TODO: Apply the spin animation: 0.8s linear infinite */
    }

    .pulse {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #1e3a5f;
      /* TODO: Apply the pulse animation:
         1s ease-in-out infinite alternate */
    }
  </style>
</head>
<body>
  <div class="spinner" role="status" aria-label="Loading"></div>
  <div class="pulse"></div>
</body>
</html>`,
        hints: [
          '@keyframes name { from { } to { } } or use percentage stops: 0% { } 50% { } 100% { }',
          'animation shorthand: animation: name duration easing iteration-count direction fill-mode',
          'animation-direction: alternate makes the animation play forward then backward',
          'Use role="status" and aria-label on loading indicators so screen readers announce them'
        ],
        expectedOutput: 'A spinning circle that rotates continuously at a constant speed.\nA pulsing circle that smoothly grows and shrinks in a breathing rhythm.\nBoth animations run independently and loop indefinitely.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keyframe Animations</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      display: flex;
      gap: 4rem;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f4f8;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes pulse {
      from {
        transform: scale(1);
        opacity: 1;
      }
      to {
        transform: scale(1.15);
        opacity: 0.7;
      }
    }

    .spinner {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 4px solid #ddd;
      border-top-color: #1e3a5f;
      animation: spin 0.8s linear infinite;
    }

    .pulse {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #1e3a5f;
      animation: pulse 1s ease-in-out infinite alternate;
    }
  </style>
</head>
<body>
  <div class="spinner" role="status" aria-label="Loading"></div>
  <div class="pulse" aria-hidden="true"></div>
</body>
</html>`
      },
      {
        title: 'Step 4: Transform Functions and Card Flip',
        instruction: 'WHAT: Animate a card flip with rotateY, stack multiple transforms, and understand transform-origin. WHY: transform applies geometric transformations without affecting layout. Multiple functions are applied right-to-left: transform: translateX(50px) rotate(45deg) first rotates then translates. transform-origin sets the pivot point — the default is 50% 50% (centre). For a card flip, you need two faces (front/back), perspective on the container, and backface-visibility: hidden to hide the back face when it is pointing away. HOW: Create a .card-container with perspective: 800px. Inside, a .card with transform-style: preserve-3d that rotates on hover. Add .card-front and .card-back faces; hide the back face initially with rotateY(180deg) and backface-visibility: hidden on both.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Flip</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f4f8;
    }

    .card-container {
      width: 240px;
      height: 320px;
      /* TODO: perspective: 800px — creates the 3D depth */
      cursor: pointer;
    }

    .card {
      width: 100%;
      height: 100%;
      position: relative;
      /* TODO: transform-style: preserve-3d — children render in 3D space */
      /* TODO: transition: transform 0.6s ease */
    }

    .card-container:hover .card {
      /* TODO: transform: rotateY(180deg) */
    }

    .card-front,
    .card-back {
      position: absolute;
      inset: 0;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      text-align: center;
      /* TODO: backface-visibility: hidden — hides the face pointing away */
    }

    .card-front {
      background: linear-gradient(135deg, #1e3a5f, #2d6a4f);
      color: white;
    }

    .card-back {
      background: linear-gradient(135deg, #f0f4f8, #e2e8f0);
      color: #1e3a5f;
      /* TODO: Start rotated 180deg so it is initially hidden */
    }
  </style>
</head>
<body>
  <div class="card-container">
    <div class="card">
      <div class="card-front">
        <h2>Hover me</h2>
        <p>CSS Card Flip</p>
      </div>
      <div class="card-back">
        <h2>Back side!</h2>
        <p>transform: rotateY(180deg)</p>
      </div>
    </div>
  </div>
</body>
</html>`,
        hints: [
          'perspective on the parent sets the viewpoint distance — lower values = more extreme 3D effect',
          'transform-style: preserve-3d tells the browser children should exist in 3D space',
          'backface-visibility: hidden hides an element when it is rotated more than 90deg away from the viewer',
          'The back face needs transform: rotateY(180deg) so it starts face-down and ends face-up after the flip'
        ],
        expectedOutput: 'A card that smoothly flips to reveal its back side on hover.\nThe flip uses perspective to simulate depth.\nOnly one face is visible at a time — the hidden face is invisible.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Flip</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f4f8;
    }

    .card-container {
      width: 240px;
      height: 320px;
      perspective: 800px;
      cursor: pointer;
    }

    .card {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.6s ease;
    }

    .card-container:hover .card {
      transform: rotateY(180deg);
    }

    .card-front,
    .card-back {
      position: absolute;
      inset: 0;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      text-align: center;
      backface-visibility: hidden;
    }

    .card-front {
      background: linear-gradient(135deg, #1e3a5f, #2d6a4f);
      color: white;
    }

    .card-back {
      background: linear-gradient(135deg, #f0f4f8, #e2e8f0);
      color: #1e3a5f;
      transform: rotateY(180deg);
    }
  </style>
</head>
<body>
  <div class="card-container">
    <div class="card">
      <div class="card-front">
        <h2>Hover me</h2>
        <p>CSS Card Flip</p>
      </div>
      <div class="card-back">
        <h2>Back side!</h2>
        <p>transform: rotateY(180deg)</p>
      </div>
    </div>
  </div>
</body>
</html>`
      },
      {
        title: 'Step 5: Performance and Accessibility',
        instruction: 'WHAT: Add will-change: transform to animated elements, and wrap all animations in @media (prefers-reduced-motion: no-preference) so users who prefer reduced motion see no animations. WHY: will-change hints to the browser that an element will be animated, promoting it to its own compositor layer before animation starts — this avoids jank on the first frame. Over-using it wastes memory; only apply it to elements about to animate. prefers-reduced-motion: reduce is a user OS setting (on macOS: System Settings → Accessibility → Reduce Motion) that signals motion sensitivity. Vestibular disorders, epilepsy, and motion sickness can all be triggered by animation. WCAG 2.1 criterion 2.3.3 (AAA) and 2.3.1 cover this. HOW: Move all @keyframes and transition declarations inside @media (prefers-reduced-motion: no-preference) { }. Add will-change: transform to spinner and flip card.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Animations</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      display: flex;
      gap: 3rem;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f4f8;
      padding: 2rem;
    }

    /* Spinner — base styles (no animation yet) */
    .spinner {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 4px solid #ddd;
      border-top-color: #1e3a5f;
      /* TODO: Add will-change: transform */
    }

    /* Button — base styles */
    .btn {
      padding: 0.875rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #1e3a5f;
      color: white;
    }

    /* TODO: Wrap ALL animation/transition declarations inside:
       @media (prefers-reduced-motion: no-preference) {
         @keyframes spin { to { transform: rotate(360deg); } }

         .spinner { animation: spin 0.8s linear infinite; }

         .btn {
           transition: transform 200ms ease, background-color 200ms ease;
         }
         .btn:hover {
           transform: scale(1.05);
           background: #2d5f8a;
         }
       }
    */
  </style>
</head>
<body>
  <div class="spinner" role="status" aria-label="Loading"></div>
  <button class="btn">Hover me</button>
  <p style="max-width:360px;color:#444;font-size:0.9rem;">
    Enable "Reduce Motion" in your OS accessibility settings to see animations disabled.
    On macOS: System Settings → Accessibility → Display → Reduce Motion.
  </p>
</body>
</html>`,
        hints: [
          '@media (prefers-reduced-motion: no-preference) targets users who have NOT requested reduced motion',
          '@media (prefers-reduced-motion: reduce) targets users who HAVE requested it — use to override to instant/fade',
          'will-change: transform should be added just before animation starts and removed after — in CSS, add it to the element that will animate',
          'A safe fallback: if reduced motion is preferred, provide an instant state change instead of removing the feature entirely'
        ],
        expectedOutput: 'Spinner and button hover both animate normally in default OS settings.\nWith OS "Reduce Motion" enabled, the spinner does not spin and the button has no hover transition.\nThe spinner and flip card have will-change: transform for GPU promotion.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Animations</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      display: flex;
      gap: 3rem;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f4f8;
      padding: 2rem;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 4px solid #ddd;
      border-top-color: #1e3a5f;
      will-change: transform;
    }

    .btn {
      padding: 0.875rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #1e3a5f;
      color: white;
      will-change: transform;
    }

    @media (prefers-reduced-motion: no-preference) {
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .spinner {
        animation: spin 0.8s linear infinite;
      }

      .btn {
        transition: transform 200ms ease,
                    background-color 200ms ease;
      }

      .btn:hover {
        transform: scale(1.05);
        background: #2d5f8a;
      }
    }
  </style>
</head>
<body>
  <div class="spinner" role="status" aria-label="Loading"></div>
  <button class="btn">Hover me</button>
  <p style="max-width:360px;color:#444;font-size:0.9rem;">
    Enable "Reduce Motion" in your OS accessibility settings to see animations disabled.
    On macOS: System Settings → Accessibility → Display → Reduce Motion.
  </p>
</body>
</html>`
      }
    ]
  },

  // ============================================================
  // LAB 10 — Design System Tokens
  // ============================================================
  {
    id: 'hc-lab-10',
    languageId: 'html-css',
    level: 'senior',
    title: 'Design System Tokens',
    description: 'Build a CSS design token system with primitive and semantic tokens, light/dark theming via data-theme, and component-scoped overrides.',
    estimatedMinutes: 35,
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
        title: 'Step 2: Primitive Tokens',
        instruction: 'WHAT: Define primitive (raw) CSS custom properties for colour, spacing, and typography on :root. WHY: Primitive tokens are the atomic values of your design system — every possible colour, every spacing step, every font size. They are never used directly in component styles; instead they are referenced by semantic tokens. The naming convention is --category-scale-variant (e.g. --color-blue-500, --space-4). A consistent spacing scale (multiples of a base unit, often 4px or 8px) prevents arbitrary spacing and makes the UI feel cohesive. HOW: Define at least 6 colour primitives across a blue and neutral scale. Define a spacing scale from --space-1 (4px) through --space-8 (32px) using multiples of 4px. Define font-size primitives --text-sm through --text-2xl.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design Tokens — Primitives</title>
  <style>
    :root {
      /* ── Colour primitives ── */
      /* TODO: Define a blue scale:
         --color-blue-100: #dbeafe
         --color-blue-300: #93c5fd
         --color-blue-500: #3b82f6
         --color-blue-700: #1d4ed8
         --color-blue-900: #1e3a8a */

      /* TODO: Define a neutral scale:
         --color-neutral-0: #ffffff
         --color-neutral-100: #f5f7fa
         --color-neutral-300: #d1d5db
         --color-neutral-500: #6b7280
         --color-neutral-700: #374151
         --color-neutral-900: #111827 */

      /* TODO: Define an error scale:
         --color-red-500: #ef4444
         --color-red-700: #b91c1c */

      /* ── Spacing primitives (base unit = 4px) ── */
      /* TODO: Define --space-1 through --space-8
         1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 7=28px, 8=32px */

      /* ── Typography primitives ── */
      /* TODO: Define font sizes:
         --text-xs: 0.75rem
         --text-sm: 0.875rem
         --text-base: 1rem
         --text-lg: 1.125rem
         --text-xl: 1.25rem
         --text-2xl: 1.5rem */

      /* TODO: Define font weights:
         --font-normal: 400
         --font-semibold: 600
         --font-bold: 700 */
    }

    /* Visualise the tokens */
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: var(--space-8); background: var(--color-neutral-100); }

    .swatch-grid { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-6); }
    .swatch {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      display: flex;
      align-items: flex-end;
      padding: var(--space-1);
      font-size: var(--text-xs);
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
  </style>
</head>
<body>
  <h1>Primitive Tokens</h1>
  <h2>Blue scale</h2>
  <div class="swatch-grid">
    <div class="swatch" style="background: var(--color-blue-100); color: #111">100</div>
    <div class="swatch" style="background: var(--color-blue-300); color: #111">300</div>
    <div class="swatch" style="background: var(--color-blue-500)">500</div>
    <div class="swatch" style="background: var(--color-blue-700)">700</div>
    <div class="swatch" style="background: var(--color-blue-900)">900</div>
  </div>
  <h2>Spacing scale</h2>
  <div style="display:flex;flex-direction:column;gap:var(--space-2)">
    <div style="background:var(--color-blue-300);height:var(--space-1);width:var(--space-1)"></div>
    <div style="background:var(--color-blue-500);height:var(--space-2);width:var(--space-2)"></div>
    <div style="background:var(--color-blue-700);height:var(--space-4);width:var(--space-4)"></div>
    <div style="background:var(--color-blue-900);height:var(--space-8);width:var(--space-8)"></div>
  </div>
</body>
</html>`,
        hints: [
          'CSS custom properties are defined on :root (the html element) to make them globally available',
          'Naming convention: --category-scale (--color-blue-500) or --category-subcategory-variant',
          'Use var(--token-name) to consume a token anywhere in CSS',
          'The var() function accepts a fallback: var(--color-brand, #3b82f6) returns #3b82f6 if the token is not defined'
        ],
        expectedOutput: 'Colour swatches visible for the blue scale from lightest to darkest.\nSpacing visualisation shows progressively larger squares using the spacing scale.\nAll values reference CSS custom properties defined on :root.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design Tokens — Primitives</title>
  <style>
    :root {
      /* Colour primitives */
      --color-blue-100: #dbeafe;
      --color-blue-300: #93c5fd;
      --color-blue-500: #3b82f6;
      --color-blue-700: #1d4ed8;
      --color-blue-900: #1e3a8a;

      --color-neutral-0: #ffffff;
      --color-neutral-100: #f5f7fa;
      --color-neutral-300: #d1d5db;
      --color-neutral-500: #6b7280;
      --color-neutral-700: #374151;
      --color-neutral-900: #111827;

      --color-red-500: #ef4444;
      --color-red-700: #b91c1c;

      /* Spacing primitives */
      --space-1: 4px;
      --space-2: 8px;
      --space-3: 12px;
      --space-4: 16px;
      --space-5: 20px;
      --space-6: 24px;
      --space-7: 28px;
      --space-8: 32px;

      /* Typography primitives */
      --text-xs: 0.75rem;
      --text-sm: 0.875rem;
      --text-base: 1rem;
      --text-lg: 1.125rem;
      --text-xl: 1.25rem;
      --text-2xl: 1.5rem;

      --font-normal: 400;
      --font-semibold: 600;
      --font-bold: 700;
    }

    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: var(--space-8); background: var(--color-neutral-100); }

    .swatch-grid { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-6); }
    .swatch {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      display: flex;
      align-items: flex-end;
      padding: var(--space-1);
      font-size: var(--text-xs);
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
  </style>
</head>
<body>
  <h1>Primitive Tokens</h1>
  <h2>Blue scale</h2>
  <div class="swatch-grid">
    <div class="swatch" style="background: var(--color-blue-100); color: #111">100</div>
    <div class="swatch" style="background: var(--color-blue-300); color: #111">300</div>
    <div class="swatch" style="background: var(--color-blue-500)">500</div>
    <div class="swatch" style="background: var(--color-blue-700)">700</div>
    <div class="swatch" style="background: var(--color-blue-900)">900</div>
  </div>
  <h2>Spacing scale</h2>
  <div style="display:flex;flex-direction:column;gap:var(--space-2)">
    <div style="background:var(--color-blue-300);height:var(--space-1);width:var(--space-1)"></div>
    <div style="background:var(--color-blue-500);height:var(--space-2);width:var(--space-2)"></div>
    <div style="background:var(--color-blue-700);height:var(--space-4);width:var(--space-4)"></div>
    <div style="background:var(--color-blue-900);height:var(--space-8);width:var(--space-8)"></div>
  </div>
</body>
</html>`
      },
      {
        title: 'Step 3: Semantic Tokens',
        instruction: 'WHAT: Create semantic tokens that reference primitives and expose a meaningful API for component styles. WHY: Semantic tokens describe intent, not appearance. --color-primary does not say "blue" — it says "the brand action colour". When you swap --color-primary from --color-blue-500 to --color-purple-500, every component that uses --color-primary updates automatically. This decoupling is what makes theming scalable. Categories include surface (backgrounds), content (text), border, feedback (success/error/warning), and interactive (states). HOW: On :root define semantic tokens that var() reference primitive tokens. Component styles should only ever reference semantic tokens, never primitives directly.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic Tokens</title>
  <style>
    :root {
      /* ── Primitives (copy from Step 2) ── */
      --color-blue-100: #dbeafe; --color-blue-300: #93c5fd;
      --color-blue-500: #3b82f6; --color-blue-700: #1d4ed8; --color-blue-900: #1e3a8a;
      --color-neutral-0: #ffffff; --color-neutral-100: #f5f7fa;
      --color-neutral-300: #d1d5db; --color-neutral-500: #6b7280;
      --color-neutral-700: #374151; --color-neutral-900: #111827;
      --color-red-500: #ef4444; --color-red-700: #b91c1c;
      --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
      --space-5: 20px; --space-6: 24px; --space-7: 28px; --space-8: 32px;
      --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem;
      --text-lg: 1.125rem; --text-xl: 1.25rem; --text-2xl: 1.5rem;
      --font-normal: 400; --font-semibold: 600; --font-bold: 700;

      /* ── Semantic tokens (reference primitives) ── */
      /* TODO: Interactive/brand */
      /* --color-primary: var(--color-blue-500);
         --color-primary-hover: var(--color-blue-700);
         --color-primary-subtle: var(--color-blue-100); */

      /* TODO: Surface (backgrounds) */
      /* --color-surface-base: var(--color-neutral-0);
         --color-surface-raised: var(--color-neutral-100);
         --color-surface-sunken: var(--color-neutral-100); */

      /* TODO: Content (text) */
      /* --color-content-primary: var(--color-neutral-900);
         --color-content-secondary: var(--color-neutral-500);
         --color-content-on-primary: var(--color-neutral-0); */

      /* TODO: Border */
      /* --color-border-default: var(--color-neutral-300);
         --color-border-strong: var(--color-neutral-700); */

      /* TODO: Feedback */
      /* --color-error: var(--color-red-500);
         --color-error-hover: var(--color-red-700); */
    }

    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      padding: var(--space-8);
      background: var(--color-surface-raised, #f5f7fa);
      color: var(--color-content-primary, #111827);
    }

    /* Component uses ONLY semantic tokens */
    .btn-primary {
      padding: var(--space-3) var(--space-6);
      background: var(--color-primary);
      color: var(--color-content-on-primary);
      border: none;
      border-radius: 6px;
      font-size: var(--text-base);
      font-weight: var(--font-semibold);
      cursor: pointer;
    }

    .btn-primary:hover {
      background: var(--color-primary-hover);
    }

    .card {
      padding: var(--space-6);
      background: var(--color-surface-base);
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      max-width: 360px;
      margin-top: var(--space-6);
    }

    .card p {
      color: var(--color-content-secondary);
      font-size: var(--text-sm);
    }

    .error-text {
      color: var(--color-error);
      font-size: var(--text-sm);
    }
  </style>
</head>
<body>
  <h1>Semantic Tokens</h1>
  <button class="btn-primary">Primary action</button>

  <div class="card">
    <h2>Card title</h2>
    <p>Secondary text uses --color-content-secondary.</p>
    <p class="error-text">Error text uses --color-error.</p>
  </div>
</body>
</html>`,
        hints: [
          'Semantic token names describe role/intent, not the value: --color-primary not --color-blue',
          'Layers: primitive (--color-blue-500) → semantic (--color-primary) → component (--button-bg)',
          'Components should ONLY use semantic tokens — this makes theming a matter of redefining semantics, not touching components',
          'If you change --color-primary to reference --color-purple-500, every button, link, and badge updates automatically'
        ],
        expectedOutput: 'Blue primary button and card render using only semantic token references.\nChanging --color-primary to a different primitive (e.g. --color-neutral-700) updates the button colour instantly.\nNo component rule contains a raw hex value — all colours flow from tokens.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic Tokens</title>
  <style>
    :root {
      /* Primitives */
      --color-blue-100: #dbeafe; --color-blue-300: #93c5fd;
      --color-blue-500: #3b82f6; --color-blue-700: #1d4ed8; --color-blue-900: #1e3a8a;
      --color-neutral-0: #ffffff; --color-neutral-100: #f5f7fa;
      --color-neutral-300: #d1d5db; --color-neutral-500: #6b7280;
      --color-neutral-700: #374151; --color-neutral-900: #111827;
      --color-red-500: #ef4444; --color-red-700: #b91c1c;
      --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
      --space-5: 20px; --space-6: 24px; --space-7: 28px; --space-8: 32px;
      --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem;
      --text-lg: 1.125rem; --text-xl: 1.25rem; --text-2xl: 1.5rem;
      --font-normal: 400; --font-semibold: 600; --font-bold: 700;

      /* Semantic tokens */
      --color-primary: var(--color-blue-500);
      --color-primary-hover: var(--color-blue-700);
      --color-primary-subtle: var(--color-blue-100);

      --color-surface-base: var(--color-neutral-0);
      --color-surface-raised: var(--color-neutral-100);
      --color-surface-sunken: var(--color-neutral-100);

      --color-content-primary: var(--color-neutral-900);
      --color-content-secondary: var(--color-neutral-500);
      --color-content-on-primary: var(--color-neutral-0);

      --color-border-default: var(--color-neutral-300);
      --color-border-strong: var(--color-neutral-700);

      --color-error: var(--color-red-500);
      --color-error-hover: var(--color-red-700);
    }

    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: sans-serif;
      padding: var(--space-8);
      background: var(--color-surface-raised);
      color: var(--color-content-primary);
    }

    .btn-primary {
      padding: var(--space-3) var(--space-6);
      background: var(--color-primary);
      color: var(--color-content-on-primary);
      border: none;
      border-radius: 6px;
      font-size: var(--text-base);
      font-weight: var(--font-semibold);
      cursor: pointer;
      transition: background-color 150ms ease;
    }

    .btn-primary:hover {
      background: var(--color-primary-hover);
    }

    .card {
      padding: var(--space-6);
      background: var(--color-surface-base);
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      max-width: 360px;
      margin-top: var(--space-6);
    }

    .card p {
      color: var(--color-content-secondary);
      font-size: var(--text-sm);
    }

    .error-text {
      color: var(--color-error);
      font-size: var(--text-sm);
    }
  </style>
</head>
<body>
  <h1>Semantic Tokens</h1>
  <button class="btn-primary">Primary action</button>

  <div class="card">
    <h2>Card title</h2>
    <p>Secondary text uses --color-content-secondary.</p>
    <p class="error-text">Error text uses --color-error.</p>
  </div>
</body>
</html>`
      },
      {
        title: 'Step 4: Theming with data-theme',
        instruction: 'WHAT: Implement a light/dark theme by redefining semantic tokens on [data-theme="dark"]. Toggle the theme with JavaScript. WHY: The data-theme pattern gives full control over theming without duplicating component styles. Only the token definitions change — every component that uses semantic tokens adapts automatically. This is far more maintainable than maintaining two separate stylesheets. The attribute can be set with JS (document.documentElement.setAttribute("data-theme", "dark")) and persisted in localStorage. You can also set the initial value based on prefers-color-scheme. HOW: Add [data-theme="dark"] { } block that redefines the semantic tokens. Add a toggle button that switches the attribute on <html>.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Theming</title>
  <style>
    :root {
      /* Primitives */
      --color-blue-100: #dbeafe; --color-blue-500: #3b82f6; --color-blue-700: #1d4ed8;
      --color-neutral-0: #ffffff; --color-neutral-100: #f5f7fa;
      --color-neutral-200: #e5e7eb; --color-neutral-300: #d1d5db;
      --color-neutral-500: #6b7280; --color-neutral-700: #374151;
      --color-neutral-800: #1f2937; --color-neutral-850: #18202d;
      --color-neutral-900: #111827;
      --space-2: 8px; --space-3: 12px; --space-4: 16px;
      --space-6: 24px; --space-8: 32px;
      --text-sm: 0.875rem; --text-base: 1rem; --text-2xl: 1.5rem;
      --font-semibold: 600;

      /* Semantic tokens — light theme (default) */
      --color-primary: var(--color-blue-500);
      --color-primary-hover: var(--color-blue-700);
      --color-surface-base: var(--color-neutral-0);
      --color-surface-raised: var(--color-neutral-100);
      --color-content-primary: var(--color-neutral-900);
      --color-content-secondary: var(--color-neutral-500);
      --color-content-on-primary: var(--color-neutral-0);
      --color-border-default: var(--color-neutral-300);
    }

    /* TODO: Define [data-theme="dark"] with overridden semantic tokens:
       --color-primary: var(--color-blue-300);            (lighter blue on dark bg)
       --color-primary-hover: var(--color-blue-100);
       --color-surface-base: var(--color-neutral-800);
       --color-surface-raised: var(--color-neutral-850);
       --color-content-primary: var(--color-neutral-100);
       --color-content-secondary: var(--color-neutral-300);
       --color-content-on-primary: var(--color-neutral-900);
       --color-border-default: var(--color-neutral-700); */

    *, *::before, *::after { box-sizing: border-box; }

    body {
      font-family: sans-serif;
      min-height: 100vh;
      background: var(--color-surface-raised);
      color: var(--color-content-primary);
      padding: var(--space-8);
      transition: background-color 200ms ease, color 200ms ease;
    }

    .card {
      background: var(--color-surface-base);
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      padding: var(--space-6);
      max-width: 400px;
      margin-bottom: var(--space-4);
    }

    .card p { color: var(--color-content-secondary); font-size: var(--text-sm); }

    .btn-primary {
      padding: var(--space-3) var(--space-6);
      background: var(--color-primary);
      color: var(--color-content-on-primary);
      border: none; border-radius: 6px;
      font-size: var(--text-base); font-weight: var(--font-semibold);
      cursor: pointer;
      transition: background-color 150ms ease;
    }

    .btn-primary:hover { background: var(--color-primary-hover); }

    .theme-toggle {
      position: fixed; top: var(--space-4); right: var(--space-4);
      padding: var(--space-2) var(--space-4);
      background: var(--color-surface-base);
      color: var(--color-content-primary);
      border: 1px solid var(--color-border-default);
      border-radius: 6px; cursor: pointer; font-size: var(--text-sm);
    }
  </style>
</head>
<body>
  <button class="theme-toggle" id="theme-btn">🌙 Dark mode</button>

  <h1>Design Token Theming</h1>

  <div class="card">
    <h2>Card component</h2>
    <p>This card uses only semantic tokens — it adapts to any theme automatically.</p>
    <br>
    <button class="btn-primary">Primary action</button>
  </div>

  <script>
    const btn = document.getElementById('theme-btn');
    const html = document.documentElement;

    // TODO: Read persisted theme from localStorage
    // TODO: Apply the theme on load based on localStorage or prefers-color-scheme

    btn.addEventListener('click', () => {
      // TODO: Toggle data-theme attribute on html element
      // TODO: Update button text (🌙 Dark mode / ☀️ Light mode)
      // TODO: Persist choice to localStorage
    });
  </script>
</body>
</html>`,
        hints: [
          '[data-theme="dark"] overrides only the semantic tokens — primitive tokens and component styles are untouched',
          'document.documentElement is the <html> element — set the attribute there so all descendants inherit it',
          'localStorage.getItem("theme") / localStorage.setItem("theme", value) persists the preference',
          'window.matchMedia("(prefers-color-scheme: dark)").matches reads the OS setting for the initial default'
        ],
        expectedOutput: 'Page starts in light mode with white card and dark text.\nClicking the toggle switches to dark mode — card becomes dark, text becomes light.\nRefreshing the page preserves the chosen theme (via localStorage).\nAll colour changes happen by redefining semantic tokens — no component CSS changes.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Theming</title>
  <style>
    :root {
      --color-blue-100: #dbeafe; --color-blue-500: #3b82f6; --color-blue-700: #1d4ed8;
      --color-neutral-0: #ffffff; --color-neutral-100: #f5f7fa;
      --color-neutral-200: #e5e7eb; --color-neutral-300: #d1d5db;
      --color-neutral-500: #6b7280; --color-neutral-700: #374151;
      --color-neutral-800: #1f2937; --color-neutral-850: #18202d;
      --color-neutral-900: #111827;
      --space-2: 8px; --space-3: 12px; --space-4: 16px;
      --space-6: 24px; --space-8: 32px;
      --text-sm: 0.875rem; --text-base: 1rem; --text-2xl: 1.5rem;
      --font-semibold: 600;

      --color-primary: var(--color-blue-500);
      --color-primary-hover: var(--color-blue-700);
      --color-surface-base: var(--color-neutral-0);
      --color-surface-raised: var(--color-neutral-100);
      --color-content-primary: var(--color-neutral-900);
      --color-content-secondary: var(--color-neutral-500);
      --color-content-on-primary: var(--color-neutral-0);
      --color-border-default: var(--color-neutral-300);
    }

    [data-theme="dark"] {
      --color-primary: var(--color-blue-300);
      --color-primary-hover: var(--color-blue-100);
      --color-surface-base: var(--color-neutral-800);
      --color-surface-raised: var(--color-neutral-850);
      --color-content-primary: var(--color-neutral-100);
      --color-content-secondary: var(--color-neutral-300);
      --color-content-on-primary: var(--color-neutral-900);
      --color-border-default: var(--color-neutral-700);
    }

    *, *::before, *::after { box-sizing: border-box; }

    body {
      font-family: sans-serif;
      min-height: 100vh;
      background: var(--color-surface-raised);
      color: var(--color-content-primary);
      padding: var(--space-8);
      transition: background-color 200ms ease, color 200ms ease;
    }

    .card {
      background: var(--color-surface-base);
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      padding: var(--space-6);
      max-width: 400px;
      margin-bottom: var(--space-4);
      transition: background-color 200ms ease, border-color 200ms ease;
    }

    .card p { color: var(--color-content-secondary); font-size: var(--text-sm); }

    .btn-primary {
      padding: var(--space-3) var(--space-6);
      background: var(--color-primary);
      color: var(--color-content-on-primary);
      border: none; border-radius: 6px;
      font-size: var(--text-base); font-weight: var(--font-semibold);
      cursor: pointer;
      transition: background-color 150ms ease;
    }

    .btn-primary:hover { background: var(--color-primary-hover); }

    .theme-toggle {
      position: fixed; top: var(--space-4); right: var(--space-4);
      padding: var(--space-2) var(--space-4);
      background: var(--color-surface-base);
      color: var(--color-content-primary);
      border: 1px solid var(--color-border-default);
      border-radius: 6px; cursor: pointer; font-size: var(--text-sm);
      transition: background-color 200ms ease, color 200ms ease;
    }
  </style>
</head>
<body>
  <button class="theme-toggle" id="theme-btn">🌙 Dark mode</button>

  <h1>Design Token Theming</h1>

  <div class="card">
    <h2>Card component</h2>
    <p>This card uses only semantic tokens — it adapts to any theme automatically.</p>
    <br>
    <button class="btn-primary">Primary action</button>
  </div>

  <script>
    const btn = document.getElementById('theme-btn');
    const html = document.documentElement;

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');

    if (initial === 'dark') {
      html.setAttribute('data-theme', 'dark');
      btn.textContent = '☀️ Light mode';
    }

    btn.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark) {
        html.removeAttribute('data-theme');
        btn.textContent = '🌙 Dark mode';
        localStorage.setItem('theme', 'light');
      } else {
        html.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️ Light mode';
        localStorage.setItem('theme', 'dark');
      }
    });
  </script>
</body>
</html>`
      },
      {
        title: 'Step 5: Component Tokens',
        instruction: 'WHAT: Build a Button component that uses component-scoped tokens, allowing per-instance overrides without touching global tokens. WHY: Component tokens are the third layer of the token hierarchy: primitive → semantic → component. They reference semantic tokens by default, but can be overridden at the component or instance level. This enables patterns like "make all buttons in this sidebar compact" with a single CSS variable override on the parent, without a utility class proliferation. HOW: Define --button-* tokens on the .btn selector itself, referencing semantic tokens. Variants override only the relevant component token. A wrapper can override component tokens to create context-specific sizing.',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Tokens</title>
  <style>
    :root {
      /* Primitives */
      --color-blue-500: #3b82f6; --color-blue-700: #1d4ed8;
      --color-red-500: #ef4444; --color-red-700: #b91c1c;
      --color-green-500: #22c55e; --color-green-700: #15803d;
      --color-neutral-0: #ffffff; --color-neutral-100: #f5f7fa;
      --color-neutral-200: #e5e7eb; --color-neutral-300: #d1d5db;
      --color-neutral-700: #374151; --color-neutral-900: #111827;
      --space-1: 4px; --space-2: 8px; --space-3: 12px;
      --space-4: 16px; --space-6: 24px; --space-8: 32px;
      --text-sm: 0.875rem; --text-base: 1rem;
      --font-semibold: 600;
      --radius-md: 6px;

      /* Semantic tokens */
      --color-primary: var(--color-blue-500);
      --color-primary-hover: var(--color-blue-700);
      --color-content-on-primary: var(--color-neutral-0);
      --color-surface-base: var(--color-neutral-0);
      --color-border-default: var(--color-neutral-300);
      --color-content-primary: var(--color-neutral-900);
    }

    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: var(--space-8); background: var(--color-neutral-100); }

    /* ── Button component with component-scoped tokens ── */
    .btn {
      /* TODO: Define component tokens that reference semantic tokens:
         --button-bg: var(--color-primary);
         --button-bg-hover: var(--color-primary-hover);
         --button-color: var(--color-content-on-primary);
         --button-border: transparent;
         --button-padding-y: var(--space-3);
         --button-padding-x: var(--space-6);
         --button-font-size: var(--text-base);
         --button-radius: var(--radius-md); */

      /* TODO: Use the component tokens in the actual properties:
         background: var(--button-bg);
         color: var(--button-color);
         padding: var(--button-padding-y) var(--button-padding-x);
         etc. */
      border: none;
      cursor: pointer;
      font-weight: var(--font-semibold);
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
    }

    .btn:hover {
      /* TODO: background: var(--button-bg-hover) */
    }

    /* Variant: danger — override only the colour tokens */
    .btn-danger {
      /* TODO: --button-bg: var(--color-red-500);
              --button-bg-hover: var(--color-red-700); */
    }

    /* Variant: ghost — override to a transparent/outline style */
    .btn-ghost {
      /* TODO:
         --button-bg: transparent;
         --button-bg-hover: var(--color-neutral-200);
         --button-color: var(--color-content-primary);
         --button-border: var(--color-border-default); */
    }

    /* Context override: compact toolbar shrinks all buttons inside */
    .toolbar {
      display: flex;
      gap: var(--space-2);
      padding: var(--space-3);
      background: var(--color-surface-base);
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      margin-top: var(--space-6);
      /* TODO: Override component tokens to create compact buttons:
         --button-padding-y: var(--space-1);
         --button-padding-x: var(--space-3);
         --button-font-size: var(--text-sm); */
    }
  </style>
</head>
<body>
  <h1>Component Tokens</h1>

  <h2>Normal size</h2>
  <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;margin-bottom:var(--space-6)">
    <button class="btn">Default</button>
    <button class="btn btn-danger">Delete</button>
    <button class="btn btn-ghost">Cancel</button>
  </div>

  <h2>Compact toolbar (context override)</h2>
  <div class="toolbar">
    <button class="btn">Bold</button>
    <button class="btn">Italic</button>
    <button class="btn btn-ghost">Clear</button>
  </div>
</body>
</html>`,
        hints: [
          'Component tokens are defined on the component selector itself (not :root) so they inherit but can be locally overridden',
          'Variants only override the component tokens they need — all other tokens fall through to the component defaults',
          'A parent element can override component tokens; all matching components inside that parent will use the new values',
          'This pattern is also called "CSS variable API" — you are exposing a documented API for customisation'
        ],
        expectedOutput: 'Three buttons of normal size: a blue default, a red danger, and a ghost outline.\nThe toolbar section shows the same button classes but compact — overriding tokens on the parent shrinks all buttons.\nNo button variant touches background or padding directly — only component tokens.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Tokens</title>
  <style>
    :root {
      --color-blue-500: #3b82f6; --color-blue-700: #1d4ed8;
      --color-red-500: #ef4444; --color-red-700: #b91c1c;
      --color-green-500: #22c55e; --color-green-700: #15803d;
      --color-neutral-0: #ffffff; --color-neutral-100: #f5f7fa;
      --color-neutral-200: #e5e7eb; --color-neutral-300: #d1d5db;
      --color-neutral-700: #374151; --color-neutral-900: #111827;
      --space-1: 4px; --space-2: 8px; --space-3: 12px;
      --space-4: 16px; --space-6: 24px; --space-8: 32px;
      --text-sm: 0.875rem; --text-base: 1rem;
      --font-semibold: 600;
      --radius-md: 6px;

      --color-primary: var(--color-blue-500);
      --color-primary-hover: var(--color-blue-700);
      --color-content-on-primary: var(--color-neutral-0);
      --color-surface-base: var(--color-neutral-0);
      --color-border-default: var(--color-neutral-300);
      --color-content-primary: var(--color-neutral-900);
    }

    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; padding: var(--space-8); background: var(--color-neutral-100); }

    .btn {
      /* Component-scoped tokens */
      --button-bg: var(--color-primary);
      --button-bg-hover: var(--color-primary-hover);
      --button-color: var(--color-content-on-primary);
      --button-border: transparent;
      --button-padding-y: var(--space-3);
      --button-padding-x: var(--space-6);
      --button-font-size: var(--text-base);
      --button-radius: var(--radius-md);

      /* Consume component tokens */
      background: var(--button-bg);
      color: var(--button-color);
      border: 1px solid var(--button-border);
      padding: var(--button-padding-y) var(--button-padding-x);
      font-size: var(--button-font-size);
      border-radius: var(--button-radius);
      cursor: pointer;
      font-weight: var(--font-semibold);
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      transition: background-color 150ms ease, border-color 150ms ease;
    }

    .btn:hover {
      background: var(--button-bg-hover);
    }

    .btn-danger {
      --button-bg: var(--color-red-500);
      --button-bg-hover: var(--color-red-700);
    }

    .btn-ghost {
      --button-bg: transparent;
      --button-bg-hover: var(--color-neutral-200);
      --button-color: var(--color-content-primary);
      --button-border: var(--color-border-default);
    }

    .toolbar {
      display: flex;
      gap: var(--space-2);
      padding: var(--space-3);
      background: var(--color-surface-base);
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      margin-top: var(--space-6);
      /* Context-level component token override */
      --button-padding-y: var(--space-1);
      --button-padding-x: var(--space-3);
      --button-font-size: var(--text-sm);
    }
  </style>
</head>
<body>
  <h1>Component Tokens</h1>

  <h2>Normal size</h2>
  <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;margin-bottom:var(--space-6)">
    <button class="btn">Default</button>
    <button class="btn btn-danger">Delete</button>
    <button class="btn btn-ghost">Cancel</button>
  </div>

  <h2>Compact toolbar (context override)</h2>
  <div class="toolbar">
    <button class="btn">Bold</button>
    <button class="btn">Italic</button>
    <button class="btn btn-ghost">Clear</button>
  </div>
</body>
</html>`
      }
    ]
  }
]
