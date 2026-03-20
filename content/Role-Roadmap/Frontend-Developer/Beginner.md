# Frontend Developer – Beginner Concept Reference


## HTML – Structure and Semantics

HTML (HyperText Markup Language) is the language used to describe the structure and content of a web page. Every visible element you see in a browser — headings, paragraphs, images, buttons — is defined by an HTML element.

HTML elements are not just containers for content; they carry meaning. This is called semantics. A `<h1>` element does not just make text large — it tells the browser, search engines, and assistive technologies that this text is the primary heading of the page. Using the right element for the right purpose is one of the most important habits a frontend developer can build.

**Code walkthrough:**

```html
<!-- Step 1: Why we use semantic elements instead of generic divs
     Semantic elements tell browsers and screen readers WHAT the content is,
     not just how it looks. This improves accessibility and SEO. -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- Step 2: The viewport meta tag is required for responsive design
       Without it, mobile browsers render the page at desktop width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Campaign Dashboard</title>
</head>
<body>
  <!-- Step 3: Landmark elements create navigable regions for screen readers
       A screen reader user can jump directly to <main> or <nav> -->
  <header>
    <nav aria-label="Primary navigation">
      <ul>
        <li><a href="/campaigns">Campaigns</a></li>
        <li><a href="/analytics">Analytics</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- Step 4: Heading hierarchy must be sequential (h1 → h2 → h3)
         Skipping levels (h1 → h4) breaks the document outline -->
    <h1>Campaign Performance</h1>
    <section>
      <h2>Active Campaigns</h2>
      <!-- Step 5: The <label> 'for' attribute links to the input's 'id'
           This lets screen readers announce what the input is for -->
      <label for="campaign-search">Search campaigns:</label>
      <input type="search" id="campaign-search" name="q">
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Marketing Team</p>
  </footer>
</body>
</html>
```

**Why it matters:** Semantic HTML forms the foundation of accessibility. Screen readers rely on correct element choices to guide users through a page. It also improves search engine optimisation and makes code easier to read and maintain.

**Key things to understand:**

- Block-level elements (such as `<div>`, `<p>`, `<section>`, `<article>`) start on a new line and take up the full width available. Inline elements (such as `<span>`, `<a>`, `<strong>`) sit within the flow of text.
- Landmark elements such as `<header>`, `<nav>`, `<main>`, `<footer>`, and `<aside>` describe regions of a page and help screen reader users navigate.
- Form elements — `<input>`, `<label>`, `<button>`, `<select>` — have built-in browser behaviour and accessibility support that custom `<div>`-based controls do not.
- The `<head>` section of a document contains metadata (title, charset, viewport settings) that browsers and search engines use but do not display directly.

**Common pitfalls:**

- Using `<div>` and `<span>` for everything instead of choosing meaningful elements. This produces structurally correct but semantically empty documents.
- Skipping heading levels (for example, jumping from `<h1>` to `<h4>`) because of how they look rather than their hierarchy.
- Forgetting to associate `<label>` elements with their corresponding form inputs using the `for` attribute.

---

## The DOM (Document Object Model)

The DOM is a programming interface created by the browser when it parses an HTML document. It represents the page as a tree of objects (called nodes), where each HTML element, text node, and attribute becomes an object in memory that JavaScript can read and modify.

When a browser loads a page, it reads the HTML source and constructs this tree. JavaScript then interacts with the DOM to make the page dynamic — changing text, showing or hiding elements, updating styles, and responding to user actions.

**Code walkthrough:**

```javascript
// Step 1: Why querySelector is preferred — it accepts any CSS selector,
// making it more flexible than getElementById or getElementsByClassName
const heading = document.querySelector('h1');
const cards = document.querySelectorAll('.campaign-card');

// Step 2: Reading and modifying text content
// textContent is safe; innerHTML can introduce XSS vulnerabilities
heading.textContent = 'Active Campaigns (3)';

// Step 3: Why classList is better than directly setting className
// classList.add/remove/toggle modify individual classes without
// accidentally removing other classes already on the element
cards[0].classList.add('highlighted');
cards[0].classList.toggle('expanded'); // Adds if absent, removes if present

// Step 4: Creating new elements and appending to the DOM
const newCard = document.createElement('div');
newCard.className = 'campaign-card';
newCard.textContent = 'New Q3 Campaign';
// Step 5: setAttribute for ARIA attributes improves accessibility
newCard.setAttribute('role', 'article');
newCard.setAttribute('aria-label', 'New Q3 Campaign');

// Step 6: append is preferred over appendChild — it accepts strings too
document.querySelector('.card-grid').append(newCard);

// Step 7: Batch DOM updates — modifying the DOM in a loop causes a reflow
// on each iteration. Build in a fragment first, then append once.
const fragment = document.createDocumentFragment();
const campaignNames = ['Email Blast', 'Display Retarget', 'Search Brand'];
campaignNames.forEach(name => {
  const li = document.createElement('li');
  li.textContent = name;
  fragment.append(li); // No reflow — fragment is not in the DOM yet
});
document.querySelector('#campaign-list').append(fragment); // ONE reflow
```

**Why it matters:** Understanding the DOM explains how JavaScript controls a web page. Without this mental model, DOM manipulation feels like magic rather than a predictable system.

**Key things to understand:**

- The DOM tree starts at the `document` object. From there you can navigate to `document.documentElement` (the `<html>` element) and down through every element on the page.
- Selecting elements is done via methods like `document.getElementById`, `document.querySelector` (returns the first match for a CSS selector), and `document.querySelectorAll` (returns all matches).
- Nodes have parent, child, and sibling relationships that mirror the HTML hierarchy.
- The DOM is a live representation. Changing the DOM triggers the browser to reflow and repaint the relevant portions of the page.

**Common pitfalls:**

- Confusing the DOM with the HTML source. If JavaScript or the browser modifies the DOM after page load, the source code does not change — but the live DOM does.
- Running JavaScript that tries to select an element before the HTML for that element has been parsed, resulting in `null` references. This is solved by placing scripts at the bottom of the body or using the `DOMContentLoaded` event.
- Performing large numbers of DOM operations in a loop, which causes repeated reflows and degrades performance.

---

## CSS – Selectors, Specificity and the Box Model

CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. Understanding how CSS decides which rules apply to an element — and how it calculates the size and spacing of that element — is fundamental to predictable, maintainable styling.

**Selectors** are patterns that target HTML elements. Type selectors target element names (e.g. `p`), class selectors target elements with a given class (e.g. `.card`), and ID selectors target a single element with a specific ID (e.g. `#header`). Combinators such as descendant (` `), child (`>`), and adjacent sibling (`+`) let you target elements based on their position in the DOM.

**Specificity** is the algorithm the browser uses to decide which CSS rule wins when multiple rules target the same element. Inline styles beat ID selectors, which beat class selectors, which beat type selectors. Understanding this hierarchy prevents the common trap of adding !important everywhere.

**The box model** defines how the browser calculates the space an element occupies. Every element is a rectangular box made of four layers: content, padding, border, and margin. By default (`box-sizing: content-box`), width and height apply only to the content area. Setting `box-sizing: border-box` makes width and height include padding and border, which is almost always easier to reason about.

**Code walkthrough:**

```css
/* Step 1: Why specificity matters — the browser uses it to decide which rule wins
   Specificity ranking: inline styles > #id > .class > element
   Understanding this prevents the "why isn't my style applying?" problem */

/* Type selector — lowest specificity (0,0,1) */
p {
  color: grey;
}

/* Class selector — medium specificity (0,1,0) */
.campaign-card {
  color: navy;
}

/* ID selector — high specificity (1,0,0) — avoid for styling */
#main-title {
  color: black;
}

/* Step 2: Why border-box is essential
   Without it, padding and border ADD to the width you set,
   making layout calculations unpredictable */
*,
*::before,
*::after {
  box-sizing: border-box; /* width now INCLUDES padding + border */
}

/* Step 3: Demonstrating the box model layers */
.campaign-card {
  width: 300px;        /* with border-box, this is the TOTAL width */
  padding: 16px;       /* space between content and border */
  border: 1px solid #ddd; /* visible edge of the box */
  margin: 12px;        /* space OUTSIDE the border, between elements */

  /* Step 4: Margin collapse — vertical margins between siblings collapse
     Two cards with margin: 12px will have 12px gap, NOT 24px */
}

/* Step 5: Combining selectors — descendant selector targets p inside .card */
.campaign-card p {
  margin-bottom: 0; /* Override default paragraph margin */
}
```

**Why it matters:** Misunderstanding specificity leads to style conflicts and debugging nightmares. Misunderstanding the box model leads to layouts that do not match designs.

**Key things to understand:**

- The cascade means that when specificity is equal, the rule that appears later in the stylesheet wins.
- Margin collapse: vertical margins between adjacent block elements collapse into a single margin equal to the larger of the two.
- `border-box` sizing is almost universally applied via a CSS reset at the start of a project.

**Common pitfalls:**

- Over-using ID selectors for styling, making it very hard to override styles later.
- Expecting margins to behave the same horizontally and vertically — they do not, due to margin collapse.

---

## CSS Layout – Flexbox and Grid

Before Flexbox and Grid, CSS layouts relied on floats and positioning — techniques that were fragile and hard to maintain. Flexbox and Grid are purpose-built layout systems that solve the majority of common layout problems clearly and predictably.

**Flexbox** is a one-dimensional layout model. You apply `display: flex` to a container element, and its direct children become flex items. You can control how those items are distributed along a main axis (horizontal or vertical) and aligned along the cross axis. Key properties include `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, and the shorthand `flex` applied to individual items to control how they grow and shrink.

**CSS Grid** is a two-dimensional layout model. You define rows and columns on a container and place items into the resulting cells. Grid is ideal for page-level layouts and complex component arrangements. Key properties include `grid-template-columns`, `grid-template-rows`, `gap`, `grid-column`, and `grid-row`.

**Why it matters:** The majority of modern UI layouts — navigation bars, card grids, sidebars, form layouts — are solved naturally with Flexbox or Grid. Choosing the right tool for each job produces simpler, more maintainable CSS.

**Key things to understand:**

- Flexbox is suited for one-dimensional arrangements: a row of buttons, a vertical stack of items in a sidebar.
- Grid is suited for two-dimensional arrangements: a photo gallery, a dashboard with multiple panels, a full-page layout.
- The two systems can be combined: a Grid layout for the page structure, with Flexbox used inside individual components.
- The `gap` property works for both Flexbox and Grid and is generally preferred over margins for spacing between items.

**Code walkthrough:**

```css
/* Step 1: Why Flexbox — it solves one-dimensional alignment problems
   that were historically painful with floats and clearfixes */
.nav-bar {
  display: flex;
  /* Step 2: justify-content controls the main axis (horizontal by default)
     'space-between' pushes items to edges with equal space between */
  justify-content: space-between;
  /* Step 3: align-items controls the cross axis (vertical by default)
     'center' vertically centres items regardless of their height */
  align-items: center;
  gap: 16px; /* Step 4: gap is preferred over margin for spacing flex items */
}

/* Step 5: Why Grid — it solves two-dimensional layout problems
   You define both rows AND columns, then place items into cells */
.campaign-dashboard {
  display: grid;
  /* Step 6: repeat(auto-fill, minmax(280px, 1fr)) creates a responsive grid
     Cards will be at least 280px wide and fill available space evenly.
     No media queries needed — the grid adapts automatically */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Step 7: Combining Grid (page layout) with Flexbox (component internals) */
.card {
  display: flex;
  flex-direction: column;        /* Stack content vertically inside card */
  justify-content: space-between; /* Push footer to the bottom */
}
```

**Common pitfalls:**

- Applying `display: flex` to every element regardless of whether it is the right tool.
- Forgetting that Flexbox and Grid properties apply to the container, with a separate set of properties for the individual items.

---

## Responsive Design

Responsive design is the practice of building web interfaces that adapt their layout and presentation to suit different screen sizes, from small mobile phones to large desktop monitors.

The foundation of responsive design is the CSS media query. A media query applies a block of CSS rules only when certain conditions are met — most commonly, when the viewport is above or below a particular width. This allows you to write one set of styles for small screens and override or extend them for larger screens.

The mobile-first approach means writing your default styles for small screens and then using `min-width` media queries to enhance the layout for larger screens. This is generally preferred because it forces you to prioritise essential content and progressively enhance rather than progressively strip down.

Relative units such as percentages, `em`, `rem`, `vw`, and `vh` allow elements to scale with their container or the viewport rather than being fixed at a pixel size.

**Code walkthrough:**

```css
/* Step 1: Why mobile-first — write defaults for small screens,
   then use min-width queries to ADD complexity for larger ones.
   This forces you to prioritise essential content first. */

.container {
  /* Step 2: Use relative units, not fixed pixels, for fluid sizing
     rem is relative to the root font size (usually 16px) */
  padding: 1rem;
  width: 100%; /* Fills the screen on mobile */
}

/* Step 3: min-width media queries progressively enhance for larger screens
   This breakpoint is not arbitrary — it's where the layout breaks */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto; /* Centre the container on wider screens */
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

/* Step 4: Responsive images — prevent overflow on small screens */
img {
  max-width: 100%;  /* Never wider than its container */
  height: auto;     /* Maintain aspect ratio */
}

/* Step 5: Using clamp() for fluid typography — no media query needed
   Font size scales smoothly between 1rem (min) and 2rem (max) */
h1 {
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
}
```

**Why it matters:** The majority of web traffic comes from mobile devices. A layout that only works at desktop widths provides a broken experience for most users.

**Key things to understand:**

- The viewport meta tag (`<meta name="viewport" content="width=device-width, initial-scale=1">`) must be present in the HTML `<head>` or the browser will scale the page as if it were a desktop site.
- Common breakpoints are not fixed standards — they should reflect where your specific layout breaks, not arbitrary screen sizes.
- Images should use `max-width: 100%` to prevent them from overflowing their containers on small screens.
- CSS Grid and Flexbox with `flex-wrap` can handle a great deal of responsive behaviour without any media queries.

**Common pitfalls:**

- Using fixed pixel widths for layout containers, which causes horizontal scrolling on small screens.
- Designing only for desktop and attempting to retrofit mobile support late in development.
- Forgetting the viewport meta tag, which causes media queries to behave unexpectedly on real devices.

---

## JavaScript – Variables, Types and Functions

JavaScript is the programming language of the web browser. It allows developers to add behaviour to a page: responding to user input, modifying the DOM, fetching data, and running logic.

**Variables** store values. In modern JavaScript, `let` declares a variable whose value can be reassigned, and `const` declares a variable whose binding cannot be reassigned (though the contents of objects and arrays declared with `const` can still be mutated). `var` is the older declaration and has function scope rather than block scope — it is generally avoided in modern code.

**Types** in JavaScript include: `string`, `number`, `bigint`, `boolean`, `null`, `undefined`, `object`, and `symbol`. JavaScript is dynamically typed, meaning a variable can hold any type and the type can change at runtime. The `typeof` operator returns a string describing the type of a value.

**Functions** are reusable blocks of code. They can be declared with the `function` keyword or written as arrow functions (`=>`). Functions can accept parameters and return values. Arrow functions are commonly preferred for their concise syntax and because they do not have their own `this` binding.

**Code walkthrough:**

```javascript
// Step 1: Why const is the default — it prevents accidental reassignment
// Use let only when the value genuinely needs to change
const campaignName = 'Summer Sale 2026';
let impressions = 0; // Will be updated as data comes in

// Step 2: Why typeof matters — JavaScript is dynamically typed,
// so you must check types to avoid unexpected coercion bugs
console.log(typeof campaignName); // 'string'
console.log(typeof impressions);  // 'number'
console.log(typeof undefined);    // 'undefined'
console.log(typeof null);         // 'object' — a famous JS quirk

// Step 3: Why strict equality (===) — loose equality (==) coerces types
// and produces surprising results
console.log(0 == '');     // true  — type coercion, dangerous
console.log(0 === '');    // false — strict, predictable

// Step 4: Why arrow functions are preferred in modern code
// They are concise and do not create their own 'this' binding
const calculateCTR = (clicks, impressions) => {
  // Step 5: Always guard against division by zero
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
};

// Step 6: Functions are first-class values — they can be passed as arguments
// This pattern is fundamental to callbacks, event handlers, and React
const campaigns = ['Email', 'Display', 'Search'];
const formatted = campaigns.map((name) => name.toUpperCase());
console.log(formatted); // ['EMAIL', 'DISPLAY', 'SEARCH']
```

**Why it matters:** Variables, types, and functions are the basic vocabulary of JavaScript. Everything else — DOM manipulation, API calls, React components — is built on top of them.

**Key things to understand:**

- `null` and `undefined` are distinct: `undefined` means a variable has been declared but not assigned a value; `null` is an explicit assignment indicating the absence of a value.
- Type coercion — JavaScript automatically converting one type to another — is the source of many surprising bugs. Prefer strict equality (`===`) over loose equality (`==`).
- Functions in JavaScript are first-class values: they can be assigned to variables, passed as arguments, and returned from other functions.

**Common pitfalls:**

- Using `var` and being surprised by its function-scoping and hoisting behaviour.
- Confusing `null`, `undefined`, and `0` or `""` (empty string), all of which are falsy but mean different things.
- Writing functions that silently return `undefined` because a `return` statement was omitted.

---

## JavaScript – DOM Manipulation and Events

DOM manipulation is the process of using JavaScript to read and change the content, structure, and styles of a web page after it has loaded. Events are signals fired by the browser when something happens — a user clicks a button, types in a field, or the page finishes loading.

To manipulate the DOM, you first select the element you want to work with using methods like `document.querySelector`. You can then read or set properties: `element.textContent` changes the text, `element.style.color` changes an inline style, `element.classList.add('active')` adds a CSS class, and `element.setAttribute('aria-expanded', 'true')` sets an attribute.

To respond to events, you attach an event listener to an element using `element.addEventListener('click', handlerFunction)`. The browser calls the handler function whenever the event occurs, passing an event object that contains information about what happened.

**Code walkthrough:**

```javascript
// Step 1: Why we wait for DOMContentLoaded — the script may load before
// the HTML is fully parsed, so elements would be null without this
document.addEventListener('DOMContentLoaded', () => {

  // Step 2: querySelector uses CSS selectors to find elements
  const form = document.querySelector('#campaign-form');
  const output = document.querySelector('#result');

  // Step 3: Why we listen for 'submit' on the form, not 'click' on the button
  // 'submit' fires for both button clicks AND Enter key presses
  form.addEventListener('submit', (event) => {
    // Step 4: preventDefault stops the browser's default form submission
    // which would cause a full page reload
    event.preventDefault();

    const nameInput = document.querySelector('#campaign-name');
    // Step 5: Use textContent (not innerHTML) for user-supplied data
    // innerHTML would execute any HTML/script in the input — XSS risk
    output.textContent = `Campaign created: ${nameInput.value}`;
  });

  // Step 6: Why event delegation — instead of one listener per list item,
  // attach ONE listener to the parent and check event.target
  const list = document.querySelector('#campaign-list');
  list.addEventListener('click', (event) => {
    if (event.target.matches('.delete-btn')) {
      // Step 7: Navigate from the clicked button up to its parent <li>
      const item = event.target.closest('li');
      item.remove();
    }
  });
});
```

**Why it matters:** DOM manipulation and events are how JavaScript makes a page interactive. Every dropdown menu, form validation message, modal dialog, and live search field relies on these mechanisms.

**Key things to understand:**

- Event delegation: rather than attaching a listener to every item in a list, you attach one listener to the parent and check `event.target` inside the handler. This is more efficient and works for items added to the DOM later.
- `event.preventDefault()` stops the browser's default behaviour for an event — for example, preventing a form from submitting or a link from navigating.
- `event.stopPropagation()` stops an event from bubbling up to parent elements.
- Creating new elements: `document.createElement('div')` creates a new element, which you then configure and append to the DOM using `parent.appendChild(newElement)` or `parent.append(newElement)`.

**Common pitfalls:**

- Attaching event listeners inside loops, which creates one listener per iteration rather than one shared listener.
- Forgetting that `innerHTML` accepts HTML strings and can introduce cross-site scripting vulnerabilities if it is populated with user-supplied data. Use `textContent` for plain text.
- Not removing event listeners when elements are removed from the DOM, which can cause memory leaks.

---

## JavaScript – Asynchronous Programming (callbacks, promises, async/await)

JavaScript runs on a single thread, meaning it can only do one thing at a time. However, many operations — fetching data from an API, reading a file, waiting for a timer — would block the thread for an unacceptable amount of time if done synchronously. Asynchronous programming is the set of patterns JavaScript uses to initiate these operations, continue with other work, and handle the result when it arrives.

**Callbacks** were the original approach. You pass a function as an argument to an asynchronous operation, and that function is called when the operation completes. The problem is that nested callbacks become deeply indented and hard to read — a situation nicknamed "callback hell".

**Promises** are objects that represent the eventual result of an asynchronous operation. A promise is either pending, fulfilled (resolved with a value), or rejected (failed with an error). You chain `.then()` to handle a successful result and `.catch()` to handle errors. Promises can be chained, which is more readable than nested callbacks.

**async/await** is syntax built on top of promises that allows you to write asynchronous code that reads like synchronous code. An `async` function always returns a promise. Inside it, `await` pauses execution until a promise settles and then returns the resolved value. Error handling is done with standard `try/catch` blocks.

**Code walkthrough:**

```javascript
// Step 1: Why async/await — it makes asynchronous code read like synchronous code
// This is the modern pattern; callbacks and .then() chains are older alternatives
async function fetchCampaignData(campaignId) {
  try {
    // Step 2: fetch returns a promise. 'await' pauses here until the
    // network request completes, but does NOT block the main thread
    const response = await fetch(`/api/campaigns/${campaignId}`);

    // Step 3: Why we check response.ok — fetch does NOT reject on 404 or 500
    // This is the most common beginner mistake with fetch
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    // Step 4: response.json() is ALSO async — it returns a promise
    // because the body is a stream that must be fully read
    const data = await response.json();
    return data;

  } catch (error) {
    // Step 5: This catches both network failures (no connection)
    // AND the error we threw for non-OK status codes
    console.error('Failed to fetch campaign:', error.message);
    return null;
  }
}

// Step 6: Why Promise.all — when you need multiple independent requests,
// run them in parallel instead of sequentially (much faster)
async function loadDashboard() {
  const [campaigns, metrics, alerts] = await Promise.all([
    fetch('/api/campaigns').then(r => r.json()),
    fetch('/api/metrics').then(r => r.json()),
    fetch('/api/alerts').then(r => r.json()),
  ]);
  // All three requests ran concurrently — total time is the slowest one,
  // not the sum of all three
  console.log(campaigns, metrics, alerts);
}
```

**Why it matters:** Almost all real-world JavaScript involves asynchronous operations, particularly API calls. Understanding this model is essential for building anything that fetches or sends data.

**Key things to understand:**

- `await` can only be used inside an `async` function (or at the top level of a module).
- `Promise.all` accepts an array of promises and resolves when all of them resolve, or rejects as soon as any one of them rejects.
- The browser's `fetch` API returns a promise. The response body must also be read asynchronously using methods like `response.json()`, which also returns a promise.

**Common pitfalls:**

- Forgetting that `async` functions always return a promise, so calling an async function and using the return value directly (without `await`) gives you a promise object, not the resolved value.
- Not handling rejected promises, which produces unhandled rejection warnings and silent failures.
- Using `await` inside a standard `forEach` loop — it does not work as expected because `forEach` does not wait for async callbacks. Use a `for...of` loop instead.

---
