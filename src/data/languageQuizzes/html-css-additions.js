// Additional HTML & CSS quiz questions
// These supplement the base questions in languageQuizzes.js
// Format mirrors src/data/quizzes/ai-engineer-additions.js

export const additions = {
  beginner: [
    {
      question: 'What is the purpose of the alt attribute on an <img> element?',
      options: [
        'It sets the image title shown on hover',
        'It provides a text description read by screen readers and displayed when the image fails to load',
        'It controls the image dimensions',
        'It specifies a fallback image URL'
      ],
      correctIndex: 1,
      explanation: 'The alt attribute provides alternative text for an image. Screen readers announce it to visually impaired users, and browsers display it when the image cannot be loaded. An empty alt="" tells assistive technology to ignore the image (suitable for decorative images).'
    },
    {
      question: 'Which CSS unit is relative to the font-size of the root (<html>) element?',
      options: ['em', 'rem', 'px', 'vh'],
      correctIndex: 1,
      explanation: 'rem (root em) is always relative to the font-size set on the <html> element (typically 16px by default). Unlike em, which is relative to the current element\'s font-size and can compound unpredictably, rem stays consistent no matter how deeply nested the element is.'
    },
    {
      question: 'What does box-sizing: border-box do in CSS?',
      options: [
        'It removes the margin from the box model calculation',
        'It makes the element\'s width and height include padding and border, not just the content area',
        'It forces all elements to have a visible border',
        'It sets the display type to block'
      ],
      correctIndex: 1,
      explanation: 'By default (content-box), width and height apply only to the content area — padding and border are added on top. With border-box, the specified width and height include padding and border, making layout arithmetic much more intuitive. Most modern CSS resets apply box-sizing: border-box to all elements.'
    },
    {
      question: 'Which HTML element is the most appropriate for the primary navigation links of a website?',
      options: [
        '<div class="nav">',
        '<nav>',
        '<menu>',
        '<header>'
      ],
      correctIndex: 1,
      explanation: 'The <nav> element is a semantic landmark specifically meant to wrap major navigation link groups. Screen readers and assistive technologies use it to let users jump directly to navigation. Using a plain <div> loses that semantic meaning, whereas <menu> is intended for toolbar-style interactive menus.'
    },
    {
      question: 'What is the purpose of the meta viewport tag (<meta name="viewport" content="width=device-width, initial-scale=1">)?',
      options: [
        'It sets the background color of the page on mobile devices',
        'It tells the browser to match the page width to the device\'s screen width and sets the initial zoom level to 1',
        'It enables hardware-accelerated rendering on mobile',
        'It prevents users from zooming in on the page'
      ],
      correctIndex: 1,
      explanation: 'Without the viewport meta tag, mobile browsers render pages at a desktop-like width (often 980px) and then scale them down, making text tiny. Setting width=device-width makes the layout canvas match the physical screen width so CSS media queries and responsive layouts work correctly.'
    },
    {
      question: 'In CSS specificity, which selector type carries the highest weight?',
      options: [
        'A class selector (.btn)',
        'An element selector (div)',
        'An inline style attribute (style="...")',
        'An ID selector (#header)'
      ],
      correctIndex: 2,
      explanation: 'Specificity is calculated in four tiers: inline styles > ID selectors > class/attribute/pseudo-class selectors > element/pseudo-element selectors. Inline styles (style="...") sit at the top and override all stylesheet rules unless !important is used. IDs come next, followed by classes, then elements.'
    },
    {
      question: 'What is the difference between display: inline and display: inline-block?',
      options: [
        'They are visually identical; the difference is only in accessibility',
        'inline-block allows you to set width and height, while inline does not respect those properties',
        'inline-block removes the element from the document flow',
        'inline displays the element as a block-level element'
      ],
      correctIndex: 1,
      explanation: 'Inline elements flow with text and ignore explicit width/height settings. inline-block elements flow inline like text, but they do respect width, height, margin, and padding on all sides. This makes inline-block useful for things like navigation items or icon buttons that need sizing without breaking the text flow.'
    },
    {
      question: 'Which HTML input type should be used to collect an email address with built-in browser validation?',
      options: [
        '<input type="text">',
        '<input type="string">',
        '<input type="email">',
        '<input type="url">'
      ],
      correctIndex: 2,
      explanation: 'type="email" instructs the browser to validate that the entered value looks like an email address (contains an @ sign and a domain) before the form is submitted. On mobile devices, it also brings up a keyboard layout optimised for email entry. type="text" accepts any string with no built-in validation.'
    },
    {
      question: 'What does the srcset attribute on an <img> element do?',
      options: [
        'It specifies multiple fallback images in case the primary image fails to load',
        'It provides a list of image sources at different resolutions so the browser can choose the most appropriate one for the device',
        'It lazy-loads the image when it enters the viewport',
        'It sets the image source for different CSS media query breakpoints'
      ],
      correctIndex: 1,
      explanation: 'srcset lets you list the same image at multiple resolutions (e.g., image@1x.jpg 1x, image@2x.jpg 2x) or widths. The browser then selects the best candidate based on the device\'s pixel density and viewport size, downloading only what is needed. This saves bandwidth on low-DPI screens and ensures sharp images on high-DPI (Retina) displays.'
    },
    {
      question: 'Which CSS pseudo-class applies styles to a link that has already been visited by the user?',
      options: [
        ':active',
        ':focus',
        ':hover',
        ':visited'
      ],
      correctIndex: 3,
      explanation: ':visited matches anchor (<a>) elements whose href URL is in the browser\'s history. For privacy reasons, browsers restrict what CSS properties can be changed via :visited (mostly color-related ones). Common use: styling visited links in a different color so users know which pages they have already seen.'
    },
    {
      question: 'What is the difference between an ID selector and a class selector in CSS?',
      options: [
        'ID selectors use a dot (.) and class selectors use a hash (#)',
        'ID selectors carry higher specificity and should be unique per page; class selectors are reusable and carry lower specificity',
        'ID selectors only work in JavaScript, not in CSS stylesheets',
        'Class selectors are faster to render than ID selectors'
      ],
      correctIndex: 1,
      explanation: 'An ID (#myId) has higher specificity than a class (.myClass) — roughly equivalent to 100 vs 10 specificity points. IDs are also supposed to be unique per HTML document, while classes can be applied to multiple elements. Because of their high specificity, heavy use of IDs in CSS can make overriding styles painful; classes are generally preferred.'
    },
    {
      question: 'Which HTML element should wrap the main content that is unique to a page, excluding repeated elements like navigation, headers, and footers?',
      options: [
        '<section>',
        '<article>',
        '<main>',
        '<div id="content">'
      ],
      correctIndex: 2,
      explanation: 'The <main> element is a landmark that represents the dominant, unique content of the <body>. There should only be one visible <main> per page. Screen readers surface it as a skip target so keyboard users can bypass navigation. <section> and <article> are for subdividing content within the page.'
    }
  ],
  mid: [
    {
      question: 'What is the difference between display: none and visibility: hidden?',
      options: [
        'They are identical — both hide the element and remove it from the document flow',
        'display: none removes the element from layout entirely; visibility: hidden hides it but keeps its space in the layout',
        'visibility: hidden also removes the element from the layout',
        'display: none only works on block elements'
      ],
      correctIndex: 1,
      explanation: 'display: none collapses the element completely — it takes up no space and is not rendered. visibility: hidden makes the element invisible but it still occupies its original space in the document flow. A third option, opacity: 0, also keeps the space but retains pointer events unlike visibility: hidden.'
    },
    {
      question: 'In a CSS Grid layout, what does the fr unit represent?',
      options: [
        'A fixed pixel fraction of the container',
        'A fraction of the available free space in the grid container after fixed-size tracks are allocated',
        'Font-relative units, identical to rem',
        'A minimum size constraint'
      ],
      correctIndex: 1,
      explanation: 'fr stands for fractional unit. After fixed and min-content tracks are placed, the remaining space in the grid container is divided proportionally among fr-sized tracks. For example, grid-template-columns: 1fr 2fr creates two columns where the second is twice the width of the first.'
    },
    {
      question: 'Which ARIA attribute should be added to a button that controls an expandable panel to communicate its current state?',
      options: [
        'role="toggle"',
        'aria-expanded="true" or aria-expanded="false"',
        'aria-hidden="false"',
        'aria-selected="true"'
      ],
      correctIndex: 1,
      explanation: 'aria-expanded tells assistive technologies whether the element the button controls is currently expanded (true) or collapsed (false). This must be toggled with JavaScript when the panel opens or closes. Without it, screen reader users cannot determine the state of the UI.'
    },
    {
      question: 'How do CSS custom properties (variables) differ from preprocessor variables like Sass variables?',
      options: [
        'CSS custom properties are compiled away at build time; Sass variables persist at runtime',
        'CSS custom properties exist in the browser at runtime, cascade through the DOM, and can be updated with JavaScript; Sass variables are resolved at compile time',
        'CSS custom properties only work in modern Chromium browsers',
        'Sass variables support fallback values while CSS custom properties do not'
      ],
      correctIndex: 1,
      explanation: 'CSS custom properties (e.g., --color-primary: #005fcc) are live in the browser and participate in the cascade — a child element can redefine them and all its descendants pick up the new value. You can also read and write them via JavaScript (element.style.setProperty(\'--color-primary\', \'red\')). Sass variables, by contrast, are resolved during compilation and no longer exist in the delivered CSS.'
    },
    {
      question: 'What does the CSS clamp() function do, and why is it useful for typography?',
      options: [
        'It clamps a color value between two stops, creating gradients',
        'It restricts an element\'s z-index to a safe range',
        'It sets a value that scales between a minimum and maximum based on a preferred middle value, enabling fluid sizing without media queries',
        'It prevents text from overflowing its container by truncating it'
      ],
      correctIndex: 2,
      explanation: 'clamp(min, preferred, max) returns the preferred value as long as it falls between min and max. For typography you might write font-size: clamp(1rem, 2.5vw, 2rem), which scales the font smoothly between 1rem and 2rem as the viewport changes — no breakpoints needed. This eliminates stepped jumps and produces naturally fluid layouts.'
    },
    {
      question: 'What is the CSS aspect-ratio property used for?',
      options: [
        'It sets the ratio of font-size to line-height',
        'It locks an element\'s width-to-height ratio so it scales proportionally without JavaScript',
        'It configures the aspect ratio of background images',
        'It applies only to <video> and <img> elements'
      ],
      correctIndex: 1,
      explanation: 'aspect-ratio: 16 / 9 (or any ratio) tells the browser to maintain that width-to-height proportion as the element\'s size changes. Before this property, developers used the "padding-top hack" (padding-top: 56.25%) to achieve the same result, which was fragile and unintuitive. aspect-ratio works on any element and integrates naturally with Flexbox and Grid.'
    },
    {
      question: 'What does the prefers-color-scheme media query allow you to do?',
      options: [
        'It detects whether the user has a color blindness accessibility setting enabled',
        'It lets you apply different styles based on whether the user\'s OS or browser is set to a light or dark theme',
        'It adjusts color rendering for HDR displays',
        'It sets the color profile used for image rendering'
      ],
      correctIndex: 1,
      explanation: '@media (prefers-color-scheme: dark) matches when the user\'s operating system is in dark mode. Inside that block you can redefine CSS custom properties or apply dark-mode-specific rules. Combined with CSS custom properties, this enables a clean dark-mode implementation without duplicating entire stylesheets.'
    },
    {
      question: 'How do the :is() and :where() pseudo-classes differ from each other?',
      options: [
        ':is() matches only one selector at a time; :where() accepts a comma-separated list',
        ':is() takes the specificity of its most specific argument; :where() always has zero specificity',
        ':where() is a newer alias for :is() with identical behaviour',
        ':is() only works with class selectors; :where() works with any selector'
      ],
      correctIndex: 1,
      explanation: 'Both accept a forgiving selector list, but they differ in specificity. :is(.card, #hero) takes the highest specificity of its arguments — in this case the ID contributes (1,0,0). :where(.card, #hero) always contributes zero specificity, making it ideal for base styles that are easy to override without fighting the cascade.'
    },
    {
      question: 'What are CSS logical properties (e.g., margin-inline, padding-block), and why are they preferred over physical properties?',
      options: [
        'Logical properties are shorthand aliases with no functional difference from physical properties',
        'Logical properties map to the start/end and block/inline axes of the writing mode, making layouts automatically adapt to right-to-left and vertical writing systems',
        'Logical properties improve rendering performance by reducing reflow calculations',
        'Logical properties only affect elements inside a flex or grid container'
      ],
      correctIndex: 1,
      explanation: 'Physical properties like margin-left and margin-top are tied to screen directions. Logical properties like margin-inline-start and margin-block-start map to the flow of the text direction. In a left-to-right document margin-inline-start equals margin-left, but in a right-to-left document it equals margin-right — so the layout stays correct without writing direction-specific overrides.'
    },
    {
      question: 'What is the purpose of scroll-snap-type and scroll-snap-align in CSS?',
      options: [
        'They prevent the page from scrolling past a certain element',
        'They implement lazy-loading by snapping images into the viewport as the user scrolls',
        'They make scroll containers snap to predefined alignment points on child elements, creating carousel-like or paginated scroll experiences without JavaScript',
        'They synchronise scroll position across two containers'
      ],
      correctIndex: 2,
      explanation: 'scroll-snap-type on a scroll container (e.g., scroll-snap-type: x mandatory) activates snapping. scroll-snap-align on children (e.g., scroll-snap-align: start) declares where each child should snap to. The browser handles the snap animation natively, eliminating the need for JavaScript-based carousel libraries for many common use cases.'
    },
    {
      question: 'What does grid-template-areas allow you to do in CSS Grid?',
      options: [
        'It restricts which DOM elements are allowed to be grid items',
        'It assigns named regions to grid cells using an ASCII-art-like syntax, letting you place items by name instead of line numbers',
        'It defines the minimum and maximum size of each grid track',
        'It creates implicit grid tracks for items that overflow the explicit grid'
      ],
      correctIndex: 1,
      explanation: 'grid-template-areas: "header header" "sidebar main" "footer footer" lets you visually map your layout in CSS. You then assign grid-area: header (or sidebar, main, footer) to corresponding elements, and the browser positions them accordingly. This is far more readable than specifying grid-column and grid-row line numbers for every element.'
    },
    {
      question: 'What is the :has() pseudo-class used for, and what makes it architecturally significant?',
      options: [
        'It selects elements that have a specific CSS property applied',
        'It is a parent selector — it matches an element if it contains a descendant that matches the argument, enabling CSS to style parents based on their children for the first time',
        'It checks whether a CSS custom property is defined on an element',
        'It selects elements that have a matching aria- attribute'
      ],
      correctIndex: 1,
      explanation: 'For years CSS had no parent selector, forcing developers to use JavaScript to add classes to parent elements. :has() changes that: figure:has(figcaption) selects any <figure> that contains a <figcaption>. It can also be used for sibling detection and complex relational patterns, making entire categories of JavaScript-based DOM manipulation unnecessary.'
    }
  ],
  senior: [
    {
      question: 'What problem do CSS cascade layers (@layer) primarily solve?',
      options: [
        'They allow CSS to be lazy-loaded in layers for performance',
        'They give authors explicit control over the order of precedence between groups of styles, removing the need to fight specificity wars between third-party libraries and custom code',
        'They create z-index stacking contexts automatically',
        'They scope CSS variables to specific components'
      ],
      correctIndex: 1,
      explanation: '@layer lets you define named layers (e.g., @layer reset, base, components, utilities) where later-declared layers always win over earlier ones regardless of selector specificity. This solves the classic problem of a third-party library\'s high-specificity selectors overriding your own styles — just put library styles in an earlier layer.'
    },
    {
      question: 'What is the key architectural advantage of utility-first CSS (e.g., Tailwind CSS) over component-based CSS (e.g., BEM)?',
      options: [
        'Utility-first produces smaller HTML file sizes',
        'Utility-first eliminates the need for any CSS files',
        'Utility-first avoids naming abstractions and stylesheet growth — the CSS bundle size is bounded by the number of utilities, not the number of components',
        'Utility-first is easier to read for developers unfamiliar with CSS'
      ],
      correctIndex: 2,
      explanation: 'In component-based CSS, every new component typically adds new CSS rules, causing the stylesheet to grow unboundedly over time. With utility-first CSS, you compose design directly in the HTML from a fixed set of atomic classes. The CSS bundle stops growing after all utilities are generated — new components add HTML but no new CSS. This is a fundamental difference in how stylesheet size scales.'
    },
    {
      question: 'What distinguishes CSS container queries from media queries in terms of component design?',
      options: [
        'Container queries are faster to evaluate than media queries',
        'Container queries allow a component to adapt its styles based on the size of its own parent container, making it reusable regardless of where in the page it is placed',
        'Container queries only work on flex containers',
        'Container queries require JavaScript to function'
      ],
      correctIndex: 1,
      explanation: 'Media queries respond to the viewport width, which means a component\'s responsive behaviour is tied to the page layout. Container queries (@container) respond to the nearest containment ancestor\'s size, so the same component can render differently in a narrow sidebar and a wide main area — without any layout-aware wrappers or JavaScript.'
    },
    {
      question: 'What does content-visibility: auto do, and what rendering performance problem does it address?',
      options: [
        'It prevents content from being indexed by search engines',
        'It hides content until a user interaction triggers it, similar to display: none',
        'It skips rendering and layout work for off-screen content, allowing the browser to avoid painting elements the user cannot currently see',
        'It caches rendered content to avoid repaints when the user scrolls back to it'
      ],
      correctIndex: 2,
      explanation: 'content-visibility: auto instructs the browser to skip layout, paint, and compositing for elements outside the viewport. Combined with contain-intrinsic-size (to give the browser a size estimate so the scrollbar stays stable), it can dramatically reduce initial render time on long pages. The browser still calculates rough positions for scrolling purposes but does the full rendering work only when content enters the viewport.'
    },
    {
      question: 'What is CSS subgrid, and what layout problem did it solve?',
      options: [
        'Subgrid creates a nested grid that is independent of the parent grid, useful for isolation',
        'Subgrid allows a grid item that is itself a grid container to inherit and align to the parent grid\'s tracks, solving the "card content alignment across rows" problem',
        'Subgrid is a polyfill term for browsers that do not support CSS Grid',
        'Subgrid enables fractional track sizing inside nested grids'
      ],
      correctIndex: 1,
      explanation: 'Before subgrid, a grid item acting as a sub-container had its own independent tracks and could not align its children to the outer grid\'s lines. With grid-template-columns: subgrid (or grid-template-rows: subgrid), the child container participates in the parent\'s track definition. This is essential for aligning card titles, body text, and CTAs across a row of cards without JavaScript measurement.'
    },
    {
      question: 'What is the CSS @scope rule, and how does it improve on existing style-scoping approaches?',
      options: [
        '@scope is a PostCSS plugin syntax that does not exist in native CSS',
        '@scope lets you define a scoping root and an optional lower boundary so that styles only apply to elements between those two selectors, without requiring BEM naming or Shadow DOM',
        '@scope creates an isolated rendering context similar to an iframe',
        '@scope is equivalent to :where() but with element-level scoping'
      ],
      correctIndex: 1,
      explanation: '@scope (.card) { .title { color: red } } applies the .title rule only to .title elements that are descendants of .card. An optional lower boundary (@scope (.card) to (.card__body)) stops the styles from bleeding into nested components. Unlike Shadow DOM, @scope works in the regular document cascade with no JavaScript or web components required.'
    },
    {
      question: 'How does native CSS nesting (the & combinator) work, and how does it differ from Sass nesting?',
      options: [
        'CSS nesting is identical to Sass nesting in every way; Sass merely compiled it ahead of time',
        'Native CSS nesting requires the & selector to be the first character of any nested rule, whereas Sass allows bare element selectors to be nested directly',
        'CSS nesting only supports pseudo-class nesting, not element or class selectors',
        'Native CSS nesting uses & to reference the parent selector, similar to Sass. Modern browsers (2024+) support bare element selectors like `.card { p { } }` without &. The main difference from Sass is that native nesting resolves at runtime in the browser\'s cascade, while Sass compiles to flat selectors at build time.'
      ],
      correctIndex: 3,
      explanation: 'Native CSS nesting uses & to reference the parent selector. Since Chrome 120+, Firefox 117+, and Safari 17.2+, bare element selectors like .card { p { } } work without &. The key difference from Sass is that native CSS nesting resolves at runtime in the browser\'s cascade, meaning specificity and inheritance follow live cascade rules, while Sass compiles nesting to flat selectors at build time.'
    },
    {
      question: 'What is the View Transitions API, and what problem did it eliminate?',
      options: [
        'It is a CSS animation shorthand for animating between display: none and display: block',
        'It enables smooth animated transitions between page states or full navigations by capturing before/after snapshots and cross-fading them, without requiring manual clone-and-animate JavaScript',
        'It replaces CSS @keyframes with a declarative transition syntax',
        'It synchronises CSS transitions across multiple elements using a shared timeline'
      ],
      correctIndex: 1,
      explanation: 'Before the View Transitions API, creating smooth page-transition animations required significant JavaScript: capturing the old DOM state, rendering the new state, then orchestrating a fade or slide between them. document.startViewTransition(() => updateDOM()) handles the snapshot and cross-fade automatically. Named view-transition elements (view-transition-name) can be individually animated, enabling native app-like shared-element transitions in the browser.'
    },
    {
      question: 'What does the color-mix() CSS function do, and where is it particularly useful?',
      options: [
        'It blends two background images together using a compositing mode',
        'It mixes two colors in a specified color space by a given percentage, enabling dynamic tint and shade generation in pure CSS',
        'It converts a color from one color space (e.g., sRGB to P3) for wide-gamut displays',
        'It interpolates between two gradient stops at a fixed midpoint'
      ],
      correctIndex: 1,
      explanation: 'color-mix(in oklch, var(--brand) 70%, white) returns a color that is 70% brand color and 30% white, blended in the oklch color space. This is especially powerful with design tokens: a single --brand custom property can generate all tints and shades dynamically without pre-computing a full palette. The choice of color space (srgb, hsl, oklch, etc.) affects how natural the blend looks.'
    },
    {
      question: 'What is the light-dark() CSS function and how does it differ from using prefers-color-scheme media queries directly?',
      options: [
        'light-dark() is a JavaScript API for reading the current theme; it has no CSS equivalent',
        'light-dark(lightValue, darkValue) returns one of two values based on the current color-scheme context, keeping light and dark values co-located in a single declaration instead of duplicated across two media query blocks',
        'light-dark() is identical in function to prefers-color-scheme but uses a shorter syntax',
        'light-dark() only works inside @layer and has no effect outside cascade layers'
      ],
      correctIndex: 1,
      explanation: 'color: light-dark(#111, #eee) sets the color to #111 in light mode and #eee in dark mode. The active value is determined by the computed color-scheme property on the element (which itself can be set to "light dark" to opt in to both). This keeps related theme values on a single line, avoiding the maintenance burden of duplicate declarations inside separate @media (prefers-color-scheme: dark) blocks.'
    },
    {
      question: 'What distinguishes :user-valid and :user-invalid from :valid and :invalid in CSS?',
      options: [
        ':user-valid and :user-invalid only apply to custom form elements built with Web Components',
        ':valid and :invalid match immediately on page load before the user has interacted with the field; :user-valid and :user-invalid only match after the user has actually engaged with and then left the field',
        ':user-valid fires a JavaScript event while :valid only applies a CSS style',
        ':user-invalid requires a novalidate attribute on the form to function'
      ],
      correctIndex: 1,
      explanation: 'A classic UX problem with :invalid is that required fields are styled as errors the moment the page loads — before the user has touched them. :user-invalid (and :user-valid) are activated only after the user has interacted with the field (focused it and moved away). This produces validation feedback at the right moment without any JavaScript and removes the need to add/remove "touched" classes manually.'
    },
    {
      question: 'What is CSS anchor positioning, and what long-standing CSS limitation does it address?',
      options: [
        'Anchor positioning pins a fixed element to the top of the scroll container',
        'It allows a positioned element (e.g., a tooltip) to be placed relative to another arbitrary element anywhere in the DOM — its anchor — without requiring them to share a containing block',
        'It is a new name for position: sticky with enhanced scroll-margin support',
        'It enables elements to be positioned relative to CSS Grid lines by name'
      ],
      correctIndex: 1,
      explanation: 'Historically, positioning an element relative to another required them to share the same positioned ancestor, or involved complex JavaScript to read getBoundingClientRect and set coordinates manually. CSS anchor positioning (anchor-name on the reference element, position-anchor and anchor() function on the positioned element) decouples the two elements in the DOM while still allowing precise positional relationships — critical for tooltips, popovers, and dropdowns.'
    }
  ]
}
