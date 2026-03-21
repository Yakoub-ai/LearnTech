// HTML & CSS per-topic quiz questions
// Generated from html-css-content.js — grounded in actual section content.
// Format: { topicId, topicTitle, objectiveIndex, questions: [] }
// objectiveIndex is the 0-based index of the most relevant learning objective.

export const topicQuizzes = {
  // ─────────────────────────────────────────────────────────────────────────
  // BEGINNER
  // ─────────────────────────────────────────────────────────────────────────
  beginner: [
    {
      topicId: 'semantic-html5',
      topicTitle: 'Semantic HTML5',
      objectiveIndex: 0,
      questions: [
        {
          question: 'Which HTML5 element is used to wrap the primary navigation links of a page?',
          options: ['<header>', '<nav>', '<aside>', '<section>'],
          correctIndex: 1,
          explanation:
            'The <nav> element is specifically designed to hold navigation links. Screen readers announce it as "navigation", helping users jump directly to the navigation region.',
        },
        {
          question: 'How many <main> elements should a valid HTML page contain?',
          options: ['As many as needed', 'Two — one for desktop, one for mobile', 'Exactly one', 'At least three'],
          correctIndex: 2,
          explanation:
            'The <main> element represents the dominant content of a page and must appear only once. Multiple <main> elements are invalid and confuse assistive technologies.',
        },
        {
          question: 'Which element best represents a self-contained piece of content that could be independently distributed, such as a blog post?',
          options: ['<section>', '<div>', '<article>', '<aside>'],
          correctIndex: 2,
          explanation:
            '<article> is intended for self-contained compositions that make sense in isolation, like a news story or blog post. <section> groups thematically related content but is not self-contained.',
        },
        {
          question: 'What is the primary benefit of using semantic HTML elements over generic <div> tags?',
          options: [
            'Semantic elements load faster in the browser',
            'They convey meaning to browsers, search engines, and assistive technologies',
            'They automatically apply default CSS styles',
            'They prevent JavaScript errors',
          ],
          correctIndex: 1,
          explanation:
            'Semantic elements describe their purpose, enabling screen readers to announce roles like "navigation" or "main content" and helping search engines understand page structure.',
        },
        {
          question: 'Which element wraps content tangentially related to the main content, such as a sidebar or pull quote?',
          options: ['<section>', '<footer>', '<aside>', '<nav>'],
          correctIndex: 2,
          explanation:
            '<aside> holds content that is related but not central to the main content — like related articles, advertisements, or author bios displayed in a sidebar.',
        },
        {
          question: 'The <details> and <summary> elements provide which native behavior without JavaScript?',
          options: [
            'Image lazy loading',
            'Form validation',
            'Expandable/collapsible disclosure widget',
            'Smooth scroll navigation',
          ],
          correctIndex: 2,
          explanation:
            '<details> creates a native disclosure widget and <summary> provides its always-visible heading. Clicking the summary toggles the visibility of the details content — no JavaScript required.',
        },
        {
          question: 'Which attribute on <details> makes its content expanded by default?',
          options: ['expanded', 'open', 'visible', 'checked'],
          correctIndex: 1,
          explanation:
            'The boolean attribute `open` on a <details> element renders it in the expanded state on page load. Removing the attribute collapses it.',
        },
        {
          question: 'Which element wraps self-contained content like images or diagrams with an optional caption?',
          options: ['<picture>', '<section>', '<figure>', '<aside>'],
          correctIndex: 2,
          explanation:
            '<figure> groups self-contained content such as images, illustrations, code snippets, and diagrams, optionally paired with a <figcaption> that describes them.',
        },
      ],
    },

    {
      topicId: 'forms-inputs',
      topicTitle: 'Forms & Inputs',
      objectiveIndex: 1,
      questions: [
        {
          question: 'What attribute on a <label> element links it to its corresponding input?',
          options: ['name', 'for', 'ref', 'bind'],
          correctIndex: 1,
          explanation:
            'The `for` attribute on a <label> must match the `id` attribute of its associated input. This improves accessibility — clicking the label focuses the input.',
        },
        {
          question: 'Which input type triggers built-in email format validation in the browser?',
          options: ['type="text"', 'type="email"', 'type="username"', 'type="address"'],
          correctIndex: 1,
          explanation:
            'type="email" causes the browser to validate that the entered value matches email format (e.g., user@example.com) before form submission.',
        },
        {
          question: 'What is the purpose of the `pattern` attribute on an <input> element?',
          options: [
            'It applies a CSS pattern to the input field',
            'It specifies a JavaScript function for validation',
            'It defines a regular expression the input value must match',
            'It sets the input placeholder text',
          ],
          correctIndex: 2,
          explanation:
            'The `pattern` attribute accepts a regular expression. The input value must match the regex for the form to submit when native validation is enabled.',
        },
        {
          question: 'Which element groups related form controls (like radio buttons) under a shared legend?',
          options: ['<group>', '<section>', '<fieldset>', '<form>'],
          correctIndex: 2,
          explanation:
            '<fieldset> semantically groups related controls and <legend> provides the group label, helping screen readers understand that the contained inputs belong together.',
        },
        {
          question: 'What HTML attribute prevents a form from submitting if any required field is empty?',
          options: ['validate', 'mandatory', 'required', 'nosubmit'],
          correctIndex: 2,
          explanation:
            'The boolean `required` attribute on an input tells the browser to block submission and show a validation error if the field is empty.',
        },
        {
          question: 'Which input type renders a native date picker in modern browsers?',
          options: ['type="calendar"', 'type="datetime"', 'type="date"', 'type="picker"'],
          correctIndex: 2,
          explanation:
            'type="date" displays a native date picker UI in supporting browsers and produces a value in YYYY-MM-DD format.',
        },
        {
          question: 'The <datalist> element provides which behavior?',
          options: [
            'A dropdown that replaces the input field',
            'Autocomplete suggestions for a text input',
            'A multi-select list',
            'Form validation rules',
          ],
          correctIndex: 1,
          explanation:
            'A <datalist> element linked to an input via its `list` attribute provides a dropdown of autocomplete suggestions while still allowing free-text entry.',
        },
        {
          question: 'Why is using native HTML5 validation attributes (required, minlength, pattern) preferred over JavaScript-only validation?',
          options: [
            'Native validation prevents all XSS attacks',
            'It works even when JavaScript fails to load and reduces bundle size',
            'It is the only way to validate forms in modern browsers',
            'It prevents server-side validation from being bypassed',
          ],
          correctIndex: 1,
          explanation:
            'Native validation attributes work without JavaScript, are built into the browser, and reduce bundle size. They are progressive enhancements — server-side validation is still required for security.',
        },
      ],
    },

    {
      topicId: 'css-selectors-specificity',
      topicTitle: 'CSS Selectors & Specificity',
      objectiveIndex: 2,
      questions: [
        {
          question: 'What is the specificity value of a class selector like `.card`?',
          options: ['0-0-1', '0-1-0', '1-0-0', '1-1-0'],
          correctIndex: 1,
          explanation:
            'Class selectors have a specificity of 0-1-0 (0 IDs, 1 class, 0 type). This is higher than type selectors (0-0-1) but lower than ID selectors (1-0-0).',
        },
        {
          question: 'Which CSS selector targets only direct children of `.nav-list`?',
          options: ['.nav-list .item', '.nav-list + .item', '.nav-list > .item', '.nav-list ~ .item'],
          correctIndex: 2,
          explanation:
            'The child combinator `>` selects only direct children. `.nav-list .item` (descendant) would match items at any depth, while `>` restricts to immediate children only.',
        },
        {
          question: 'When two CSS rules have the same specificity, which one is applied?',
          options: [
            'The first rule in source order',
            'The rule with more properties',
            'The last rule in source order',
            'The rule with the shorter selector',
          ],
          correctIndex: 2,
          explanation:
            'When specificity is equal, the cascade uses source order — the last rule defined wins. This is why source order matters in CSS files.',
        },
        {
          question: 'What does the `^=` attribute selector operator mean?',
          options: ['Attribute value ends with', 'Attribute value contains', 'Attribute value starts with', 'Attribute value equals exactly'],
          correctIndex: 2,
          explanation:
            '`^=` means "starts with". For example, `a[href^="https://"]` selects all anchors whose href attribute value begins with "https://".',
        },
        {
          question: 'What is the specificity of the selector `#header .nav a:hover`?',
          options: ['0-2-1', '1-0-1', '1-2-1', '1-1-1'],
          correctIndex: 2,
          explanation:
            'Counting: 1 ID (#header) = 1-0-0, 1 class (.nav) = 0-1-0, 1 type (a) = 0-0-1, 1 pseudo-class (:hover) = 0-1-0. Total: 1-2-1.',
        },
        {
          question: 'What does the adjacent sibling combinator `+` select?',
          options: [
            'All siblings following the first element',
            'The element immediately after the first element at the same level',
            'All descendant elements',
            'The parent of the first element',
          ],
          correctIndex: 1,
          explanation:
            '`h2 + p` selects the single <p> element that immediately follows an <h2> at the same DOM level. The general sibling combinator `~` would match all following siblings.',
        },
        {
          question: 'Why should `!important` be avoided in most CSS?',
          options: [
            'It is not supported in modern browsers',
            'It dramatically slows down page rendering',
            'It overrides everything and makes future overrides nearly impossible to manage',
            'It only works on class selectors',
          ],
          correctIndex: 2,
          explanation:
            '`!important` beats all normal specificity rules and even inline styles, making it very hard to override later. Overuse leads to specificity wars where everything requires `!important`.',
        },
        {
          question: 'The universal selector `*` has which specificity?',
          options: ['0-0-1', '0-1-0', '1-0-0', '0-0-0'],
          correctIndex: 3,
          explanation:
            'The universal selector `*` has a specificity of 0-0-0, the lowest possible. It matches every element but contributes nothing to specificity calculations.',
        },
      ],
    },

    {
      topicId: 'the-box-model',
      topicTitle: 'The Box Model',
      objectiveIndex: 3,
      questions: [
        {
          question: 'With the default `box-sizing: content-box`, a `.box` with `width: 300px`, `padding: 20px`, and `border: 5px` renders at what total width?',
          options: ['300px', '325px', '350px', '270px'],
          correctIndex: 2,
          explanation:
            'With content-box, total width = content + padding-left + padding-right + border-left + border-right = 300 + 20 + 20 + 5 + 5 = 350px.',
        },
        {
          question: 'With `box-sizing: border-box`, a `.box` with `width: 300px`, `padding: 20px`, and `border: 5px` renders at what total width?',
          options: ['350px', '300px', '250px', '270px'],
          correctIndex: 1,
          explanation:
            'With border-box, the declared `width` includes padding and border. The total rendered width is exactly 300px — the content area shrinks to accommodate padding and border.',
        },
        {
          question: 'What is the recommended best-practice global reset for box-sizing?',
          options: [
            '* { box-sizing: content-box; }',
            '*, *::before, *::after { box-sizing: border-box; }',
            'html { box-sizing: border-box; }',
            'body { box-sizing: border-box; }',
          ],
          correctIndex: 1,
          explanation:
            'Applying border-box to `*`, `*::before`, and `*::after` ensures every element (including pseudo-elements) uses the more predictable border-box model.',
        },
        {
          question: 'Two stacked block elements have `margin-bottom: 20px` and `margin-top: 30px`. What is the gap between them?',
          options: ['50px', '30px', '20px', '10px'],
          correctIndex: 1,
          explanation:
            'Vertical margins collapse between adjacent block elements — the larger margin wins. So the gap is 30px, not 50px (20+30). This is called margin collapsing.',
        },
        {
          question: 'Which display value removes an element from the document flow entirely, so it takes up no space?',
          options: ['visibility: hidden', 'display: none', 'opacity: 0', 'display: invisible'],
          correctIndex: 1,
          explanation:
            '`display: none` removes the element from the rendering tree entirely — it takes up no space. `visibility: hidden` hides the element visually but preserves its space in the layout.',
        },
        {
          question: 'What does `display: inline-block` allow that `display: inline` does not?',
          options: [
            'The element starts on a new line',
            'Width and height properties have an effect',
            'The element spans the full available width',
            'The element is removed from the document flow',
          ],
          correctIndex: 1,
          explanation:
            'Inline-block elements flow inline with text (like inline elements) but also respect explicitly set `width` and `height` values, unlike pure inline elements.',
        },
        {
          question: 'In which scenario does margin collapsing NOT occur between two elements?',
          options: [
            'When both are block-level elements',
            'When the elements are stacked vertically',
            'When the elements are flex or grid items',
            'When neither has padding',
          ],
          correctIndex: 2,
          explanation:
            'Margin collapsing only occurs between block-level elements in normal flow. Flex items and grid items do not experience margin collapsing.',
        },
      ],
    },

    {
      topicId: 'flexbox',
      topicTitle: 'Flexbox',
      objectiveIndex: 4,
      questions: [
        {
          question: 'Which CSS property on a flex container controls alignment along the main axis?',
          options: ['align-items', 'align-content', 'justify-content', 'justify-items'],
          correctIndex: 2,
          explanation:
            '`justify-content` controls how flex items are distributed along the main axis. `align-items` controls alignment along the cross axis.',
        },
        {
          question: 'What is the default value of `flex-direction`?',
          options: ['column', 'row-reverse', 'column-reverse', 'row'],
          correctIndex: 3,
          explanation:
            'The default `flex-direction` is `row`, which places flex items left to right along the horizontal main axis.',
        },
        {
          question: 'Which `justify-content` value places the first and last items at the container edges with equal gaps between remaining items?',
          options: ['space-around', 'space-evenly', 'space-between', 'center'],
          correctIndex: 2,
          explanation:
            '`space-between` places the first item at the start and the last at the end, with remaining space distributed equally between items. `space-around` adds equal space on both sides of each item.',
        },
        {
          question: 'What does `flex: 1` expand to in its longhand form?',
          options: ['flex: 1 0 auto', 'flex: 0 1 auto', 'flex: 1 1 0%', 'flex: 1 0 0%'],
          correctIndex: 2,
          explanation:
            '`flex: 1` is shorthand for `flex: 1 1 0%` — grow factor 1, shrink factor 1, and a base size of 0%. This makes items share available space equally.',
        },
        {
          question: 'Which property overrides `align-items` for a single flex item?',
          options: ['self-align', 'item-align', 'align-self', 'justify-self'],
          correctIndex: 2,
          explanation:
            '`align-self` on a flex item overrides the parent container\'s `align-items` value for that specific item only.',
        },
        {
          question: 'To vertically and horizontally center a single child element inside a flex container, which combination is needed?',
          options: [
            'justify-content: center; align-content: center;',
            'justify-content: center; align-items: center;',
            'align-items: center; flex-direction: center;',
            'justify-items: center; align-items: center;',
          ],
          correctIndex: 1,
          explanation:
            '`justify-content: center` centers along the main axis and `align-items: center` centers along the cross axis. Together they achieve perfect centering.',
        },
        {
          question: 'What does `flex-wrap: wrap` do?',
          options: [
            'Items wrap from right to left',
            'Prevents items from overflowing',
            'Allows items to wrap onto multiple lines',
            'Reverses the direction of items',
          ],
          correctIndex: 2,
          explanation:
            'By default (`nowrap`) flex items stay on a single line and may overflow. `flex-wrap: wrap` allows items to break onto new lines when they run out of space.',
        },
        {
          question: 'Which property changes the visual order of a flex item without altering the HTML?',
          options: ['z-index', 'position', 'order', 'flex-index'],
          correctIndex: 2,
          explanation:
            'The `order` property sets the visual order of a flex item. Lower values appear first. The default is 0 for all items. It does not affect tab order or DOM structure.',
        },
      ],
    },

    {
      topicId: 'css-grid',
      topicTitle: 'CSS Grid',
      objectiveIndex: 5,
      questions: [
        {
          question: 'What does the `fr` unit represent in CSS Grid?',
          options: [
            'Fixed ratio unit — a fixed pixel value',
            'Fragment unit — a fraction of the remaining available space',
            'Full-row unit — the full width of one row',
            'Font-relative unit — relative to font size',
          ],
          correctIndex: 1,
          explanation:
            'The `fr` (fraction) unit represents a fraction of the available space in the grid container after fixed and content-based track sizes are resolved.',
        },
        {
          question: 'Which shorthand creates three equal-width columns using `repeat()`?',
          options: [
            'grid-template-columns: repeat(3, auto);',
            'grid-template-columns: 1fr 1fr 1fr;',
            'grid-template-columns: repeat(3, 1fr);',
            'Both B and C are correct',
          ],
          correctIndex: 3,
          explanation:
            'Both `1fr 1fr 1fr` and `repeat(3, 1fr)` create three equal-width columns. `repeat()` is the shorthand that avoids repetition.',
        },
        {
          question: 'What is the difference between `auto-fit` and `auto-fill` in `repeat()`?',
          options: [
            'auto-fit removes empty columns; auto-fill keeps them',
            'auto-fill removes empty columns; auto-fit keeps them',
            'auto-fit limits items to a maximum count; auto-fill has no limit',
            'There is no difference — they are interchangeable',
          ],
          correctIndex: 0,
          explanation:
            'With `auto-fit`, empty tracks collapse to 0 so existing items stretch to fill the space. With `auto-fill`, empty tracks are preserved, preventing items from over-stretching.',
        },
        {
          question: 'What does `grid-column: 1 / -1` do?',
          options: [
            'Places the item in the first column only',
            'Makes the item span the last column backwards',
            'Makes the item span from the first to the last column line',
            'Removes the item from the grid',
          ],
          correctIndex: 2,
          explanation:
            'Line -1 refers to the last explicit grid line. So `grid-column: 1 / -1` makes the item span from the first to the last column line, covering the full width regardless of column count.',
        },
        {
          question: 'What does `grid-template-areas` enable?',
          options: [
            'Responsive column counts',
            'Named regions in the grid for placing items by name',
            'Animation of grid tracks',
            'Automatic item placement',
          ],
          correctIndex: 1,
          explanation:
            '`grid-template-areas` lets you define named regions (like "header", "sidebar", "main") and then assign elements to those areas using `grid-area`, making layouts highly readable.',
        },
        {
          question: 'Which CSS Grid property creates space between grid cells?',
          options: ['margin', 'padding', 'gap', 'gutter'],
          correctIndex: 2,
          explanation:
            '`gap` (formerly `grid-gap`) creates space between rows and columns in a grid. You can use `row-gap` and `column-gap` separately or the `gap` shorthand for both.',
        },
        {
          question: 'When should you prefer CSS Grid over Flexbox?',
          options: [
            'When aligning a single row of navigation items',
            'When vertically centering a single element',
            'When building two-dimensional layouts with both rows and columns',
            'When you need items to wrap automatically',
          ],
          correctIndex: 2,
          explanation:
            'Grid excels at two-dimensional layouts (rows AND columns simultaneously), such as page layouts and dashboards. Flexbox is better for one-dimensional arrangements (a row or a column).',
        },
      ],
    },

    {
      topicId: 'responsive-design',
      topicTitle: 'Responsive Design',
      objectiveIndex: 6,
      questions: [
        {
          question: 'What does "mobile-first" CSS mean in practice?',
          options: [
            'Writing desktop styles first and using max-width media queries to reduce them',
            'Writing base styles for mobile and using min-width media queries to add styles for larger screens',
            'Having separate CSS files for mobile and desktop',
            'Using viewport units exclusively instead of media queries',
          ],
          correctIndex: 1,
          explanation:
            'Mobile-first means starting with base styles for small screens (simpler layouts) and progressively enhancing with `min-width` media queries for tablet and desktop breakpoints.',
        },
        {
          question: 'What is the purpose of the viewport meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">`?',
          options: [
            'It enables CSS Grid in all browsers',
            'It prevents horizontal scrolling',
            'It prevents mobile browsers from scaling down a desktop-width page',
            'It sets the base font size to 16px',
          ],
          correctIndex: 2,
          explanation:
            'Without this tag, mobile browsers render the page at ~980px and then zoom out. The tag sets the viewport to the device width at 1:1 scale so media queries work correctly.',
        },
        {
          question: 'What unit is relative to the root element\'s font size?',
          options: ['em', 'rem', 'vw', 'ch'],
          correctIndex: 1,
          explanation:
            '`rem` (root em) is always relative to the font size set on the `<html>` element (typically 16px). `em` is relative to the current element\'s parent font size, which can cascade unpredictably.',
        },
        {
          question: 'What does `clamp(1.5rem, 4vw, 3rem)` produce?',
          options: [
            'A fixed size of 4vw always',
            'A size that grows with viewport width but is never smaller than 1.5rem or larger than 3rem',
            'A size that clamps at the viewport width boundary',
            'An error — clamp() only accepts pixel values',
          ],
          correctIndex: 1,
          explanation:
            '`clamp(min, preferred, max)` returns the preferred value (4vw) unless it falls below the minimum (1.5rem) or exceeds the maximum (3rem), enabling fluid scaling without media queries.',
        },
        {
          question: 'Which unit represents 1% of the viewport width?',
          options: ['vh', 'vw', '%', 'vmin'],
          correctIndex: 1,
          explanation:
            '`vw` (viewport width) is 1% of the current viewport width. `vh` is 1% of viewport height. `vmin` is 1% of the smaller dimension.',
        },
        {
          question: 'Which responsive image attribute lets the browser choose the best image source based on viewport conditions?',
          options: ['src', 'alt', 'srcset', 'sizes'],
          correctIndex: 2,
          explanation:
            '`srcset` provides a list of image sources with width descriptors or pixel density descriptors. The browser selects the most appropriate source based on device capabilities.',
        },
        {
          question: 'What is the `ch` unit based on?',
          options: [
            '1% of the container width',
            'Character count of the font',
            'The width of the "0" character in the current font',
            'The character height of the font',
          ],
          correctIndex: 2,
          explanation:
            '`ch` equals the width of the "0" (zero) glyph in the current font. It is commonly used with `max-width` on prose elements (e.g., `max-width: 65ch`) to control readable line lengths.',
        },
      ],
    },

    {
      topicId: 'links-images-media',
      topicTitle: 'Links, Images & Media',
      objectiveIndex: 7,
      questions: [
        {
          question: 'Why should external links include `rel="noopener noreferrer"` alongside `target="_blank"`?',
          options: [
            'It makes external links open faster',
            'It prevents the opened page from accessing the opener window via `window.opener`',
            'It adds styling to external links automatically',
            'It tells search engines to follow the link',
          ],
          correctIndex: 1,
          explanation:
            'Without `rel="noopener"`, the newly opened page can access your page via `window.opener`, a security risk. `noreferrer` additionally prevents sending the referrer header.',
        },
        {
          question: 'What does `loading="lazy"` on an `<img>` element do?',
          options: [
            'Prevents the image from ever loading',
            'Loads the image at reduced quality',
            'Defers image loading until it is near the viewport',
            'Loads the image asynchronously in a web worker',
          ],
          correctIndex: 2,
          explanation:
            '`loading="lazy"` tells the browser to defer downloading the image until the user scrolls near it, reducing initial page load bytes and improving LCP for above-the-fold content.',
        },
        {
          question: 'Why should `width` and `height` attributes always be set on `<img>` elements?',
          options: [
            'They control the image quality',
            'They prevent browsers from loading the image at full resolution',
            'They allow the browser to reserve space before the image loads, preventing layout shift (CLS)',
            'They are required for `srcset` to work',
          ],
          correctIndex: 2,
          explanation:
            'When the browser knows the image dimensions before it loads, it reserves the correct space in the layout, preventing content from jumping (Cumulative Layout Shift).',
        },
        {
          question: 'Which HTML element provides art direction for responsive images — serving different image files at different screen sizes?',
          options: ['<img>', '<figure>', '<source>', '<picture>'],
          correctIndex: 3,
          explanation:
            'The <picture> element contains multiple <source> elements, each with a `media` condition, allowing entirely different image compositions to be served at different breakpoints.',
        },
        {
          question: 'What is the `alt` attribute on an `<img>` element used for?',
          options: [
            'To set the image title tooltip',
            'To provide alternative text for screen readers and when the image fails to load',
            'To define the image loading priority',
            'To specify the image format',
          ],
          correctIndex: 1,
          explanation:
            'The `alt` attribute provides a text description of the image for screen readers (accessibility) and is displayed when the image fails to load. Decorative images should have `alt=""`.',
        },
        {
          question: 'Which CSS rule prevents images from overflowing their containers?',
          options: [
            'img { width: 100px; }',
            'img { max-width: 100%; height: auto; }',
            'img { overflow: hidden; }',
            'img { display: block; width: 100%; }',
          ],
          correctIndex: 1,
          explanation:
            '`max-width: 100%` prevents an image from growing wider than its container. `height: auto` maintains the aspect ratio. This is the standard responsive image CSS pattern.',
        },
        {
          question: 'What does the `<track>` element inside a `<video>` provide?',
          options: [
            'A progress bar for the video player',
            'Audio track selection options',
            'Captions, subtitles, or descriptions for accessibility',
            'Chapter markers for navigation',
          ],
          correctIndex: 2,
          explanation:
            'The `<track>` element links WebVTT (.vtt) caption, subtitle, or description files to a video. Using `kind="captions"` provides synchronised text for deaf or hard-of-hearing users.',
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // MID
  // ─────────────────────────────────────────────────────────────────────────
  mid: [
    {
      topicId: 'css-custom-properties',
      topicTitle: 'CSS Custom Properties (Variables)',
      objectiveIndex: 0,
      questions: [
        {
          question: 'Where are CSS custom properties most commonly defined to give them global scope?',
          options: ['body {}', ':root {}', 'html body {}', '* {}'],
          correctIndex: 1,
          explanation:
            'Custom properties defined on `:root` are available throughout the entire document. `:root` matches the `<html>` element with higher specificity than the `html` type selector.',
        },
        {
          question: 'What is the correct syntax to use a CSS custom property named `--color-primary`?',
          options: ['$(--color-primary)', 'var(--color-primary)', '@color-primary', '#color-primary'],
          correctIndex: 1,
          explanation:
            'Custom properties are consumed using the `var()` function. Custom property names must start with two hyphens (--) and are case-sensitive.',
        },
        {
          question: 'What does the second argument in `var(--card-padding, 1.5rem)` represent?',
          options: [
            'A CSS unit conversion factor',
            'The maximum allowed value',
            'A fallback value used if --card-padding is not defined',
            'An alternate property name',
          ],
          correctIndex: 2,
          explanation:
            'The second argument to `var()` is a fallback value. If the custom property is not defined or is invalid, the fallback is used instead.',
        },
        {
          question: 'What is a key advantage of CSS custom properties over Sass/Less variables?',
          options: [
            'They compile to smaller CSS files',
            'They support nesting syntax',
            'They are live in the browser and can be updated at runtime with JavaScript',
            'They are supported in more browsers',
          ],
          correctIndex: 2,
          explanation:
            'Unlike preprocessor variables which are resolved at compile time, CSS custom properties exist in the browser and can be read and updated at runtime via JavaScript, enabling dynamic theming.',
        },
        {
          question: 'How can you update a CSS custom property value using JavaScript?',
          options: [
            'document.css.setProperty("--color-primary", "#ff0000")',
            'document.documentElement.style.setProperty("--color-primary", "#ff0000")',
            'CSS.setVariable("--color-primary", "#ff0000")',
            'document.style.updateProperty("--color-primary", "#ff0000")',
          ],
          correctIndex: 1,
          explanation:
            'Custom properties are set on the element\'s style object. Since `:root` maps to the `<html>` element, `document.documentElement.style.setProperty()` updates global custom properties.',
        },
        {
          question: 'Which media query is used to implement an automatic dark theme when the user\'s OS prefers dark mode?',
          options: [
            '@media (dark-mode: enabled)',
            '@media (color-scheme: dark)',
            '@media (prefers-color-scheme: dark)',
            '@media (theme: dark)',
          ],
          correctIndex: 2,
          explanation:
            '`@media (prefers-color-scheme: dark)` detects the user\'s OS color preference. You can override custom property values inside it to switch to dark theme automatically.',
        },
        {
          question: 'Which approach lets a CSS custom property cascade from a component\'s own scope?',
          options: [
            'Defining the property inside the * {} selector',
            'Defining the property on the component\'s own element or its scope, overriding the :root value',
            'Using !important on the custom property',
            'Custom properties cannot be scoped to components',
          ],
          correctIndex: 1,
          explanation:
            'Custom properties cascade like regular CSS properties. Defining `--card-bg` on `.card` overrides any `:root` value for that element and its descendants, enabling component-level theming.',
        },
      ],
    },

    {
      topicId: 'animations-transitions',
      topicTitle: 'Animations & Transitions',
      objectiveIndex: 1,
      questions: [
        {
          question: 'What is the correct shorthand order for the `transition` property?',
          options: [
            'property duration delay timing-function',
            'property timing-function duration delay',
            'property duration timing-function delay',
            'duration property timing-function delay',
          ],
          correctIndex: 2,
          explanation:
            'The `transition` shorthand order is: `property duration timing-function delay`. For example: `transition: background-color 200ms ease 0s`.',
        },
        {
          question: 'Which CSS at-rule defines a keyframe animation?',
          options: ['@animation', '@keyframes', '@transition', '@motion'],
          correctIndex: 1,
          explanation:
            '`@keyframes` defines the animation sequence, specifying CSS states at various percentages from `0%` (or `from`) to `100%` (or `to`).',
        },
        {
          question: 'Why should `transform` and `opacity` be preferred over `left`/`top` for animations?',
          options: [
            'transform and opacity are the only properties that can be animated',
            'They are GPU-composited and do not trigger layout recalculation, resulting in smoother performance',
            'left and top cause JavaScript errors when animated',
            'transform animations loop automatically',
          ],
          correctIndex: 1,
          explanation:
            '`transform` and `opacity` are handled by the GPU compositor and skip the Layout and Paint phases of the rendering pipeline, resulting in silky 60fps animations.',
        },
        {
          question: 'What does `animation-fill-mode: forwards` do?',
          options: [
            'Makes the animation play in reverse at the end',
            'The element retains the final keyframe styles after the animation ends',
            'Starts the animation from the current CSS state',
            'Repeats the animation forwards after it finishes',
          ],
          correctIndex: 1,
          explanation:
            '`forwards` means the element keeps the styles from the last keyframe (`100%` or `to`) after the animation completes, instead of reverting to its original state.',
        },
        {
          question: 'Which media query should be used to disable or reduce animations for accessibility?',
          options: [
            '@media (no-animation: true)',
            '@media (animation-preference: minimal)',
            '@media (prefers-reduced-motion: reduce)',
            '@media (motion: none)',
          ],
          correctIndex: 2,
          explanation:
            '`prefers-reduced-motion: reduce` detects users who have enabled the reduced-motion accessibility preference in their OS. You should set `animation-duration: 0.01ms` or `transition-duration: 0.01ms` inside it.',
        },
        {
          question: 'What does `animation: spin 0.8s linear infinite` do?',
          options: [
            'Plays the spin animation once for 0.8 seconds',
            'Plays the spin animation 0.8 times, then stops',
            'Plays the spin animation continuously at a constant speed, repeating forever',
            'Plays the spin animation with an ease curve over 0.8 seconds',
          ],
          correctIndex: 2,
          explanation:
            '`linear` means constant speed (no easing curve). `infinite` means the animation repeats indefinitely. This pattern is commonly used for loading spinners.',
        },
        {
          question: 'Which CSS property is used to create a 3D card flip effect by preserving the 3D perspective of children?',
          options: ['perspective-origin', 'backface-visibility', 'transform-style: preserve-3d', 'z-index'],
          correctIndex: 2,
          explanation:
            '`transform-style: preserve-3d` on a container allows its children to exist in 3D space. Without it, children are flattened. `backface-visibility: hidden` hides the back face during the flip.',
        },
        {
          question: 'What does the `cubic-bezier()` timing function allow you to define?',
          options: [
            'A repeating animation loop',
            'A custom animation curve that controls the rate of change',
            'A multi-step color transition',
            'The number of animation iterations',
          ],
          correctIndex: 1,
          explanation:
            '`cubic-bezier(x1, y1, x2, y2)` defines a custom easing curve using two control points. This lets you create unique "spring" or "bounce" feel animations beyond the built-in `ease`, `linear` presets.',
        },
      ],
    },

    {
      topicId: 'bem-methodology',
      topicTitle: 'BEM Methodology',
      objectiveIndex: 2,
      questions: [
        {
          question: 'What do the letters B, E, and M stand for in BEM?',
          options: [
            'Base, Extended, Modified',
            'Block, Element, Modifier',
            'Build, Export, Minify',
            'Block, Event, Module',
          ],
          correctIndex: 1,
          explanation:
            'BEM stands for Block, Element, Modifier. Block is a standalone component, Element is a part of a block, and Modifier is a variation or state.',
        },
        {
          question: 'Which BEM class name correctly represents the title element inside a card block?',
          options: ['.card-title', '.card.title', '.card__title', '.card--title'],
          correctIndex: 2,
          explanation:
            'BEM elements use double underscores: `.block__element`. So the title inside a card is `.card__title`.',
        },
        {
          question: 'Which BEM class name correctly represents a featured variation of a card?',
          options: ['.card__featured', '.card.featured', '.card--featured', '.featured-card'],
          correctIndex: 2,
          explanation:
            'BEM modifiers use double hyphens: `.block--modifier`. A featured card variant is `.card--featured`. It is applied alongside the base `.card` class.',
        },
        {
          question: 'Why does BEM use low-specificity class selectors instead of nested selectors like `.card h3`?',
          options: [
            'Because nested selectors are not valid CSS',
            'To avoid specificity conflicts and keep styles predictable regardless of nesting depth',
            'Because classes load faster than type selectors',
            'To ensure compatibility with CSS-in-JS tools',
          ],
          correctIndex: 1,
          explanation:
            'BEM\'s flat class structure keeps all selectors at the same specificity (0-1-0), preventing the specificity wars that arise when combining element types with classes in nested selectors.',
        },
        {
          question: 'Given a `.card--compact` modifier, how would you write the CSS to reduce padding only for compact cards using BEM?',
          options: [
            '.card.compact .card__content { padding: 1rem; }',
            '.card--compact .card__content { padding: 1rem; }',
            '.card > .compact .card__content { padding: 1rem; }',
            '.compact-card .content { padding: 1rem; }',
          ],
          correctIndex: 1,
          explanation:
            '`.card--compact .card__content` is the correct BEM pattern. The modifier class is on the block, and you target child elements using their full BEM class names.',
        },
        {
          question: 'What is the primary problem BEM solves in large CSS codebases?',
          options: [
            'Slow CSS parsing performance',
            'Browser compatibility of modern CSS features',
            'Class name collisions and unclear component ownership',
            'Excessive use of media queries',
          ],
          correctIndex: 2,
          explanation:
            'As codebases grow, generic class names like `.title` or `.button` collide across components. BEM\'s naming convention makes every class name self-documenting and scoped to its block.',
        },
      ],
    },

    {
      topicId: 'accessibility-aria',
      topicTitle: 'Accessibility / ARIA',
      objectiveIndex: 3,
      questions: [
        {
          question: 'What does ARIA stand for?',
          options: [
            'Accessible Rendering Interface API',
            'Accessible Rich Internet Applications',
            'Advanced Responsive Interface Architecture',
            'Automated Responsive Input Attributes',
          ],
          correctIndex: 1,
          explanation:
            'ARIA stands for Accessible Rich Internet Applications. It is a set of HTML attributes that communicate roles, states, and properties to assistive technologies like screen readers.',
        },
        {
          question: 'What is the first rule of ARIA?',
          options: [
            'Always use ARIA roles on every interactive element',
            'Use a native HTML element with the required semantics instead of ARIA when possible',
            'ARIA roles override native HTML semantics',
            'Never combine ARIA with semantic HTML',
          ],
          correctIndex: 1,
          explanation:
            'The first rule of ARIA is: "If you can use a native HTML element with the required semantics, use it." ARIA should supplement, not replace, semantic HTML.',
        },
        {
          question: 'Which ARIA attribute communicates that a dropdown menu is currently expanded?',
          options: ['aria-open="true"', 'aria-visible="true"', 'aria-expanded="true"', 'aria-active="true"'],
          correctIndex: 2,
          explanation:
            '`aria-expanded="true"` on a button communicates to screen readers that the associated element (identified by `aria-controls`) is currently open/visible.',
        },
        {
          question: 'What is the purpose of `aria-live="polite"` on an element?',
          options: [
            'It prevents the element from receiving focus',
            'Screen readers announce changes to the element after finishing the current announcement',
            'It hides the element from all users',
            'It adds a live region that interrupts the screen reader immediately',
          ],
          correctIndex: 1,
          explanation:
            '`aria-live="polite"` marks a region as "live" — screen readers will announce changes when idle. `aria-live="assertive"` interrupts immediately and should be used only for critical alerts.',
        },
        {
          question: 'Which CSS class pattern makes content visible to screen readers but visually hidden?',
          options: [
            '{ display: none; }',
            '{ visibility: hidden; }',
            '{ position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }',
            '{ opacity: 0; }',
          ],
          correctIndex: 2,
          explanation:
            'The `.sr-only` pattern visually hides an element by making it tiny and clipping it, while keeping it in the DOM and accessibility tree. `display: none` removes it from both.',
        },
        {
          question: 'What is the purpose of `:focus-visible` compared to `:focus`?',
          options: [
            'They are identical — :focus-visible is just an alias',
            ':focus-visible shows the focus ring only during keyboard navigation, not on mouse clicks',
            ':focus-visible adds a visible border to all elements at all times',
            ':focus-visible is only for touch devices',
          ],
          correctIndex: 1,
          explanation:
            '`:focus-visible` applies only when the browser determines the focus indicator is needed (typically keyboard navigation), preventing focus rings from appearing on mouse-clicked buttons while preserving them for keyboard users.',
        },
        {
          question: 'What is the `aria-hidden="true"` attribute used for?',
          options: [
            'To make an element invisible to all users',
            'To hide decorative or redundant elements from the accessibility tree',
            'To prevent mouse interaction with an element',
            'To disable JavaScript events on an element',
          ],
          correctIndex: 1,
          explanation:
            '`aria-hidden="true"` removes the element from the accessibility tree without affecting its visual appearance. It is commonly used on decorative icons that have adjacent visible text.',
        },
        {
          question: 'Which attribute links a tab button to its tab panel in an accessible tab interface?',
          options: ['aria-controls', 'aria-labelledby', 'aria-owns', 'aria-describedby'],
          correctIndex: 0,
          explanation:
            '`aria-controls` on the tab button references the `id` of its associated panel, telling screen readers about the relationship. `aria-labelledby` on the panel references the tab that labels it.',
        },
      ],
    },

    {
      topicId: 'svg',
      topicTitle: 'SVG (Scalable Vector Graphics)',
      objectiveIndex: 4,
      questions: [
        {
          question: 'What does the `viewBox` attribute on an SVG element define?',
          options: [
            'The visible area of the browser window',
            'The SVG\'s internal coordinate system (minX, minY, width, height)',
            'The maximum size the SVG can render at',
            'The color space used for the SVG',
          ],
          correctIndex: 1,
          explanation:
            '`viewBox="0 0 24 24"` defines the internal coordinate system. The SVG scales to fill its container while maintaining the aspect ratio defined by viewBox.',
        },
        {
          question: 'Which SVG property makes an icon inherit the text color of its parent element?',
          options: ['fill: inherit', 'color: currentColor', 'stroke: currentColor', 'color: auto'],
          correctIndex: 2,
          explanation:
            '`stroke: currentColor` (or `fill: currentColor`) makes the SVG path inherit the CSS `color` property from the parent, allowing icon colors to be controlled with a single `color` rule.',
        },
        {
          question: 'Which attribute makes a decorative SVG icon invisible to screen readers?',
          options: ['role="none"', 'hidden="true"', 'aria-hidden="true"', 'display="none"'],
          correctIndex: 2,
          explanation:
            '`aria-hidden="true"` removes the SVG from the accessibility tree. Decorative icons should be hidden from screen readers when adjacent visible text already describes their purpose.',
        },
        {
          question: 'What does the SVG `<title>` element provide?',
          options: [
            'A CSS tooltip on hover',
            'An accessible name for screen readers when the SVG has `role="img"`',
            'A title bar for the SVG container',
            'An alternative image format fallback',
          ],
          correctIndex: 1,
          explanation:
            'When an SVG has `role="img"`, a `<title>` element inside it provides the accessible name that screen readers announce — equivalent to the `alt` attribute on an `<img>`.',
        },
        {
          question: 'Why are inline SVG icons preferable to icon fonts for UI icons?',
          options: [
            'Icon fonts are deprecated in HTML5',
            'SVGs have smaller file sizes in all cases',
            'SVGs can be individually styled and animated, are accessible, and scale perfectly',
            'SVGs automatically load faster than icon fonts',
          ],
          correctIndex: 2,
          explanation:
            'Inline SVGs can be styled with CSS, animated, given accessible labels, and scale infinitely without blurriness. Icon fonts can render with inconsistent anti-aliasing and are harder to make accessible.',
        },
        {
          question: 'Which SVG animation technique creates a "drawing" effect by animating `stroke-dashoffset`?',
          options: [
            'Animating stroke-width from 0 to its final value',
            'Animating stroke-dashoffset from its full value to 0 with `stroke-dasharray` set',
            'Animating the path\'s `d` attribute',
            'Animating `fill-opacity` from 0 to 1',
          ],
          correctIndex: 1,
          explanation:
            'Setting `stroke-dasharray` to the path length and animating `stroke-dashoffset` from full length to 0 creates a "drawing" reveal effect as the dashes offset to 0.',
        },
      ],
    },

    {
      topicId: 'advanced-grid-layouts',
      topicTitle: 'Advanced Grid Layouts',
      objectiveIndex: 5,
      questions: [
        {
          question: 'What does CSS Subgrid allow child elements to do?',
          options: [
            'Create an independent nested grid within a grid area',
            'Participate in the parent grid\'s track sizing, aligning with outer grid lines',
            'Span across multiple parent grid containers',
            'Define their own custom grid areas',
          ],
          correctIndex: 1,
          explanation:
            'Subgrid (`grid-template-rows: subgrid` or `grid-template-columns: subgrid`) makes a child\'s grid tracks inherit the parent\'s track definitions, enabling inner content alignment across sibling grid items.',
        },
        {
          question: 'In the general rule for Grid vs. Flexbox, which should be used for page-level layout?',
          options: [
            'Flexbox, because it handles both axes',
            'Grid, because it is two-dimensional (rows and columns)',
            'Either — they are interchangeable',
            'Float layout for maximum browser compatibility',
          ],
          correctIndex: 1,
          explanation:
            'Grid handles two-dimensional layouts — rows and columns simultaneously — making it ideal for full-page layouts. Flexbox is one-dimensional and better for component-level arrangements.',
        },
        {
          question: 'What are named grid lines useful for?',
          options: [
            'Adding animation to grid tracks',
            'Creating more readable `grid-column` and `grid-row` placement rules using descriptive names',
            'Defining the gap between grid areas',
            'Enabling subgrid inheritance',
          ],
          correctIndex: 1,
          explanation:
            'Named grid lines (e.g., `[sidebar-start] 260px [sidebar-end main-start]`) let you place items using meaningful names instead of numeric line indices, improving readability.',
        },
        {
          question: 'How do you make a grid item span from the first to the last grid line regardless of column count?',
          options: [
            'grid-column: full-width',
            'grid-column: 1 / -1',
            'grid-column: span all',
            'grid-column: 1 / 100',
          ],
          correctIndex: 1,
          explanation:
            'In CSS Grid, `-1` refers to the last explicit grid line. `grid-column: 1 / -1` always spans the full width of the explicit grid, regardless of how many columns are defined.',
        },
        {
          question: 'When combining Grid and Flexbox in a dashboard layout, a common pattern is:',
          options: [
            'Use Grid for the navigation items inside a flex container',
            'Use Grid for the overall page layout and Flexbox for the contents within each grid area',
            'Use nested Grid containers for all UI elements including buttons',
            'Use Flexbox exclusively — Grid is only for simple two-column layouts',
          ],
          correctIndex: 1,
          explanation:
            'Grid handles macro-level page layout (defining sidebar, header, main areas). Flexbox is applied inside those areas for one-dimensional component layouts (navigation items, button groups, card internals).',
        },
      ],
    },

    {
      topicId: 'pseudo-elements-pseudo-classes',
      topicTitle: 'Pseudo-Elements & Pseudo-Classes',
      objectiveIndex: 6,
      questions: [
        {
          question: 'What required CSS property must always be set on `::before` and `::after` pseudo-elements?',
          options: ['display', 'position', 'content', 'visibility'],
          correctIndex: 2,
          explanation:
            'The `content` property is mandatory for `::before` and `::after`. Without it, the pseudo-element is not rendered. It can be set to an empty string (`content: ""`) for decorative purposes.',
        },
        {
          question: 'Which pseudo-class selector matches every odd-numbered row of a table?',
          options: [':first-child', ':nth-child(2n)', ':nth-child(odd)', ':nth-of-type(2)'],
          correctIndex: 2,
          explanation:
            '`:nth-child(odd)` matches 1st, 3rd, 5th, etc. children. This is equivalent to `:nth-child(2n+1)` and is used to create zebra-striped table rows.',
        },
        {
          question: 'What makes `:has()` unique compared to other CSS pseudo-classes?',
          options: [
            'It only matches elements with a specific ID',
            'It allows selecting a parent or ancestor based on its descendants — a CSS "parent selector"',
            'It matches only the first matching element on the page',
            'It works exclusively with form elements',
          ],
          correctIndex: 1,
          explanation:
            '`:has()` checks if a selected element *contains* a matching descendant, effectively giving CSS a parent selector. For example, `.card:has(img)` selects cards that contain images.',
        },
        {
          question: 'What does `:not(.btn)` on an anchor selector do?',
          options: [
            'Selects all anchors that have the .btn class',
            'Selects all anchors that do NOT have the .btn class',
            'Removes the .btn class from all anchors',
            'Hides all anchors with the .btn class',
          ],
          correctIndex: 1,
          explanation:
            '`:not()` excludes matching elements. `a:not(.btn)` applies styles to all anchor elements except those with the `.btn` class.',
        },
        {
          question: 'Which pseudo-class targets an element only when focused via keyboard, not when clicked with a mouse?',
          options: [':focus', ':focus-within', ':focus-visible', ':active'],
          correctIndex: 2,
          explanation:
            '`:focus-visible` is applied by the browser only when a visible focus indicator is needed — typically keyboard navigation. Mouse clicks do not trigger it, enabling cleaner visual design while preserving keyboard accessibility.',
        },
        {
          question: 'The `:nth-child(-n+3)` selector matches which elements?',
          options: [
            'Every 3rd element',
            'Elements from the 3rd position onwards',
            'The first 3 elements only',
            'Elements 3, 6, 9 etc.',
          ],
          correctIndex: 2,
          explanation:
            '`-n+3` resolves to positions 3, 2, 1 (as n goes 0, 1, 2). This is the CSS way to select "at most the first 3" elements.',
        },
        {
          question: 'What does the `:empty` pseudo-class select?',
          options: [
            'Elements with no visible text',
            'Elements with `display: none`',
            'Elements that have no child nodes (including text nodes)',
            'Elements with empty `alt` attributes',
          ],
          correctIndex: 2,
          explanation:
            '`:empty` matches elements that have no children — no elements, no text nodes, not even whitespace. It is useful for conditionally hiding empty placeholders.',
        },
      ],
    },

    {
      topicId: 'css-functions',
      topicTitle: 'CSS Functions',
      objectiveIndex: 7,
      questions: [
        {
          question: 'What does `calc(100vw - 260px)` compute?',
          options: [
            'The viewport width as a percentage',
            'The viewport width minus 260 pixels',
            'The width of a 260px element relative to the viewport',
            'A value only valid inside a grid container',
          ],
          correctIndex: 1,
          explanation:
            '`calc()` allows mixing different CSS units in arithmetic expressions. `100vw - 260px` computes the viewport width minus a fixed 260px sidebar, useful for dynamic layout widths.',
        },
        {
          question: 'What does `clamp(1rem, 2.5vw, 2rem)` return when the viewport is very wide?',
          options: ['1rem', '2.5vw', '2rem', 'It depends on the base font size'],
          correctIndex: 2,
          explanation:
            'When 2.5vw exceeds the maximum (2rem), `clamp()` caps the value at 2rem. `clamp(min, preferred, max)` ensures the value is always between min and max.',
        },
        {
          question: 'Which CSS function returns the smaller of its arguments?',
          options: ['clamp()', 'min()', 'max()', 'calc()'],
          correctIndex: 1,
          explanation:
            '`min()` evaluates all its arguments and returns the smallest. `min(1200px, 90%)` gives a container that is at most 1200px but shrinks to 90% on smaller viewports.',
        },
        {
          question: 'What are CSS counters used for?',
          options: [
            'Counting JavaScript events triggered on a page',
            'Tracking the number of CSS rules applied to an element',
            'Generating automatic sequential numbering in CSS without JavaScript',
            'Measuring animation frame rate',
          ],
          correctIndex: 2,
          explanation:
            'CSS counters (`counter-reset`, `counter-increment`, `counter()`) generate automatic numbering — for chapters, list items, or sections — entirely in CSS using `::before` pseudo-elements.',
        },
        {
          question: 'What is `env(safe-area-inset-bottom)` used for?',
          options: [
            'Getting the user\'s browser environment version',
            'Accessing OS-level safe area insets to avoid notches and home bars on mobile devices',
            'Setting the minimum padding for all browsers',
            'Reading the current color environment preference',
          ],
          correctIndex: 1,
          explanation:
            '`env()` accesses environment variables. The `safe-area-inset-*` values provide the inset distances to avoid iPhone notches, home indicators, and other device-specific UI elements.',
        },
        {
          question: 'Which CSS function is the most effective replacement for most typography-related media queries?',
          options: ['calc()', 'max()', 'min()', 'clamp()'],
          correctIndex: 3,
          explanation:
            '`clamp(min, preferred, max)` enables fluid typography that scales with viewport width between defined bounds, often eliminating the need for multiple media query breakpoints for font sizes.',
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // SENIOR
  // ─────────────────────────────────────────────────────────────────────────
  senior: [
    {
      topicId: 'css-architecture-at-scale',
      topicTitle: 'CSS Architecture at Scale',
      objectiveIndex: 0,
      questions: [
        {
          question: 'In ITCSS, what is the correct order of layers from least to most specific?',
          options: [
            'Components → Objects → Elements → Generic → Tools → Settings → Utilities',
            'Settings → Tools → Generic → Elements → Objects → Components → Utilities',
            'Utilities → Components → Objects → Elements → Generic → Tools → Settings',
            'Generic → Settings → Elements → Tools → Objects → Components → Utilities',
          ],
          correctIndex: 1,
          explanation:
            'ITCSS layers go from generic/low-specificity to specific/high-specificity: Settings, Tools, Generic, Elements, Objects, Components, Utilities. Each layer can override the previous.',
        },
        {
          question: 'In ITCSS, which two layers produce no CSS output?',
          options: [
            'Generic and Elements',
            'Settings and Tools',
            'Objects and Components',
            'Utilities and Components',
          ],
          correctIndex: 1,
          explanation:
            'The Settings layer (custom properties, config variables) and Tools layer (mixins, functions) are preprocessor concepts that do not generate CSS output directly.',
        },
        {
          question: 'What does CUBE CSS stand for?',
          options: [
            'Component, Utility, Block, Extension',
            'Cascade, Utility, Block, Exception',
            'Composition, Utility, Block, Exception',
            'Component, Universal, Base, Element',
          ],
          correctIndex: 2,
          explanation:
            'CUBE CSS stands for Composition, Utility, Block, Exception. It embraces the cascade and works with it rather than against it, unlike more prescriptive methodologies.',
        },
        {
          question: 'In CUBE CSS, what does the "Exception" layer handle?',
          options: [
            'Error handling in CSS animations',
            'Global reset styles',
            'Data-attribute-driven state variations on blocks',
            'Fallback styles for unsupported properties',
          ],
          correctIndex: 2,
          explanation:
            'Exceptions in CUBE CSS are data-attribute-driven state changes like `[data-variant="featured"]` or `[data-state="loading"]`, keeping variant logic out of block CSS.',
        },
        {
          question: 'What is the primary advantage of a utility-first approach (like Tailwind CSS)?',
          options: [
            'Zero learning curve compared to BEM',
            'Fast development with a consistent design system and small final CSS size after purging',
            'Generates cleaner, more semantic HTML',
            'Eliminates the need for a design system',
          ],
          correctIndex: 1,
          explanation:
            'Utility-first CSS enables rapid development by composing styles from small atomic classes. Production CSS is kept small by purging unused utilities. Trade-offs include verbose HTML markup.',
        },
        {
          question: 'In ITCSS, the "Objects" layer contains what type of styles?',
          options: [
            'UI component styles like buttons and cards',
            'Layout-pattern abstractions like grids and containers (non-cosmetic)',
            'Bare HTML element styles',
            'Utility overrides with !important',
          ],
          correctIndex: 1,
          explanation:
            'The Objects layer holds layout primitives and patterns (e.g., `.o-container`, `.o-stack`, `.o-grid`) that are non-cosmetic and reusable. Components sit above, adding visual design.',
        },
      ],
    },

    {
      topicId: 'container-queries',
      topicTitle: 'Container Queries',
      objectiveIndex: 1,
      questions: [
        {
          question: 'What is the fundamental difference between container queries and media queries?',
          options: [
            'Container queries only work in Grid layouts',
            'Media queries are deprecated in modern browsers',
            'Container queries respond to the size of the element\'s container, not the viewport',
            'Media queries can only test width, while container queries test both width and height',
          ],
          correctIndex: 2,
          explanation:
            'Container queries (`@container`) adapt a component based on the size of its containing element. Media queries (`@media`) adapt based on viewport dimensions, making components less reusable.',
        },
        {
          question: 'Which CSS property establishes a containment context for container queries?',
          options: ['container: query', 'contain: inline-size', 'container-type: inline-size', 'container-query: enabled'],
          correctIndex: 2,
          explanation:
            '`container-type: inline-size` establishes the element as a query container for inline-size (width) based container queries. You can also use the `container` shorthand.',
        },
        {
          question: 'What are container query units (`cqi`, `cqw`) relative to?',
          options: [
            'The root font size',
            'The viewport dimensions',
            'The nearest container query ancestor\'s size',
            'The element\'s own computed size',
          ],
          correctIndex: 2,
          explanation:
            'Container query units like `cqi` (inline-size) and `cqb` (block-size) are percentages of the nearest query container\'s dimensions, enabling fluid sizing within a component scope.',
        },
        {
          question: 'Why do container queries solve a problem that media queries cannot?',
          options: [
            'Container queries have better browser support',
            'A component can be placed in any layout context and adapt without media query changes',
            'Container queries support JavaScript triggers',
            'Container queries can test for OS color preferences',
          ],
          correctIndex: 1,
          explanation:
            'With media queries, a card component in a sidebar requires different breakpoints than the same card in a main area. Container queries let the component adapt based on where it is placed — context-agnostic.',
        },
        {
          question: 'What does `container-name` allow you to do in container query rules?',
          options: [
            'It labels the container for accessibility',
            'It lets you target specific named containers in @container rules when multiple containers are nested',
            'It sets the container\'s display name in DevTools',
            'It assigns an ID to the container element',
          ],
          correctIndex: 1,
          explanation:
            'When multiple ancestor containers exist, `container-name` allows `@container card (min-width: 500px)` to query a specifically named container rather than the nearest ancestor.',
        },
      ],
    },

    {
      topicId: 'cascade-layers',
      topicTitle: 'Cascade Layers',
      objectiveIndex: 2,
      questions: [
        {
          question: 'What is the primary problem that `@layer` solves in CSS?',
          options: [
            'Making CSS compile faster in build tools',
            'Enabling CSS nesting without preprocessors',
            'Giving developers explicit control over cascade order and specificity at scale',
            'Reducing the number of HTTP requests for CSS files',
          ],
          correctIndex: 2,
          explanation:
            '`@layer` lets you declare the priority order of your CSS explicitly. Layers declared later win over earlier ones regardless of selector specificity within them, solving specificity management at scale.',
        },
        {
          question: 'Given `@layer reset, base, components, utilities;`, which layer\'s styles win when there is a conflict?',
          options: ['reset', 'base', 'components', 'utilities'],
          correctIndex: 3,
          explanation:
            'Later-declared layers have higher priority. `utilities` is declared last, so its rules override `components`, `base`, and `reset` — regardless of specificity within those layers.',
        },
        {
          question: 'What happens to CSS that is NOT placed in any `@layer`?',
          options: [
            'It is ignored and not applied',
            'It is automatically placed in a default base layer',
            'It has lower priority than all layered styles',
            'It beats all layered styles, regardless of specificity',
          ],
          correctIndex: 3,
          explanation:
            'Unlayered (normal) CSS beats ALL layered CSS, regardless of specificity. This is intentional — it provides an escape hatch and ensures existing code is not accidentally overridden by layered styles.',
        },
        {
          question: 'How can you import a third-party stylesheet into a named cascade layer?',
          options: [
            '@layer third-party { @import url(...); }',
            '@import url(...) layer(third-party);',
            'import url(...) as layer("third-party");',
            '@use url(...) as layer(third-party);',
          ],
          correctIndex: 1,
          explanation:
            '`@import url("...") layer(layer-name)` imports an external stylesheet directly into a named layer. This is the standard way to confine third-party CSS to low-priority layers.',
        },
        {
          question: 'How do you reference a nested layer (`buttons` inside `components`) when adding rules later?',
          options: [
            '@layer components > buttons { }',
            '@layer components.buttons { }',
            '@layer buttons in components { }',
            '@layer components[buttons] { }',
          ],
          correctIndex: 1,
          explanation:
            'Nested layers are referenced using dot notation: `@layer components.buttons { }`. This appends rules to the nested layer without changing the cascade order.',
        },
      ],
    },

    {
      topicId: 'performance-optimization',
      topicTitle: 'Performance Optimization',
      objectiveIndex: 3,
      questions: [
        {
          question: 'Which Core Web Vital measures layout stability — how much content jumps as the page loads?',
          options: [
            'LCP (Largest Contentful Paint)',
            'FID (First Input Delay)',
            'CLS (Cumulative Layout Shift)',
            'INP (Interaction to Next Paint)',
          ],
          correctIndex: 2,
          explanation:
            'CLS (Cumulative Layout Shift) measures unexpected layout shifts. CSS causes CLS when images lack width/height attributes, web fonts cause text reflow, or dynamic content is inserted without reserved space.',
        },
        {
          question: 'What does `font-display: swap` do in a `@font-face` declaration?',
          options: [
            'Swaps the font to system fonts on slow connections',
            'Displays a fallback font immediately and swaps to the custom font when it loads',
            'Prevents the custom font from loading on mobile devices',
            'Enables font smoothing on high-DPI displays',
          ],
          correctIndex: 1,
          explanation:
            '`font-display: swap` shows a fallback font while the custom font downloads, preventing invisible text (FOIT). The fallback is swapped when the custom font is ready, minimizing blank text time.',
        },
        {
          question: 'Which CSS property improves rendering performance for off-screen sections by skipping their render work?',
          options: [
            'display: lazy',
            'contain: layout',
            'content-visibility: auto',
            'visibility: deferred',
          ],
          correctIndex: 2,
          explanation:
            '`content-visibility: auto` tells the browser to skip rendering work (layout, paint, compositing) for off-screen elements, dramatically improving initial load performance for long pages.',
        },
        {
          question: 'Why is animating `transform` preferred over animating `left` or `top`?',
          options: [
            'transform works without JavaScript',
            'left and top are not valid CSS properties for positioned elements',
            'transform is GPU-composited and does not trigger layout recalculation',
            'transform animations automatically respect prefers-reduced-motion',
          ],
          correctIndex: 2,
          explanation:
            'Animating `left`/`top` triggers the full rendering pipeline (Layout → Paint → Composite). `transform` skips Layout and Paint, operating only at the Composite step via the GPU — resulting in 60fps animations.',
        },
        {
          question: 'What is the risk of overusing `will-change: transform`?',
          options: [
            'It causes the element to render at a lower resolution',
            'It disables GPU acceleration for that element',
            'It forces the browser to promote elements to GPU layers, consuming excessive memory',
            'It breaks CSS transitions on the element',
          ],
          correctIndex: 2,
          explanation:
            '`will-change` hints to the browser to promote the element to a compositor layer. Applying it to many elements simultaneously wastes GPU memory and can degrade performance rather than improving it.',
        },
        {
          question: 'To prevent web font layout shift (CLS), what technique matches fallback font metrics to the custom font?',
          options: [
            'Using system-ui as the only font stack',
            'Overriding font metrics with ascent-override, descent-override, and size-adjust in a @font-face for the fallback',
            'Preloading the web font with <link rel="preload">',
            'Setting font-display: optional to prevent font swapping',
          ],
          correctIndex: 1,
          explanation:
            'By defining a `@font-face` for the fallback font (e.g., `src: local("Arial")`) with `ascent-override`, `descent-override`, and `size-adjust`, you make the fallback match the custom font\'s metrics, minimizing layout shift on swap.',
        },
      ],
    },

    {
      topicId: 'design-systems-tokens',
      topicTitle: 'Design Systems & Tokens',
      objectiveIndex: 4,
      questions: [
        {
          question: 'What are design tokens?',
          options: [
            'JavaScript configuration files for UI components',
            'Platform-agnostic named values for the atomic decisions of a design system (color, spacing, typography)',
            'SVG icons used across a design system',
            'CSS class names generated by a design tool',
          ],
          correctIndex: 1,
          explanation:
            'Design tokens are named values representing design decisions (e.g., `color.brand.primary = #3b82f6`). They are platform-agnostic and can be transformed into CSS variables, iOS constants, Android resources, and more.',
        },
        {
          question: 'In a three-tier token architecture, what do Tier 2 (alias/semantic) tokens reference?',
          options: [
            'Component-specific usage values',
            'Raw global token values, giving them semantic meaning',
            'Third-party design system tokens',
            'Media query breakpoints',
          ],
          correctIndex: 1,
          explanation:
            'Alias tokens reference global tokens and give them semantic meaning. For example, `--color-action-primary` references `--global-color-blue-600`, making it easy to retheme by changing alias mappings.',
        },
        {
          question: 'Why do dark themes only need to change alias tokens, not global tokens?',
          options: [
            'Global tokens are locked and cannot be overridden',
            'Because alias tokens map global raw values to semantic purposes, so remapping aliases changes all component colors',
            'Dark themes require a completely separate stylesheet',
            'Global tokens always produce the same visual output',
          ],
          correctIndex: 1,
          explanation:
            'Global tokens hold raw values (`--global-color-gray-900: #111827`). Alias tokens map them semantically (`--color-surface-primary: var(--global-color-gray-900)` in dark mode). Only aliases change for theming.',
        },
        {
          question: 'What tool is commonly used to transform JSON design tokens into platform-specific output (CSS, iOS, Android)?',
          options: [
            'PostCSS',
            'Style Dictionary',
            'Sass',
            'Webpack',
          ],
          correctIndex: 1,
          explanation:
            'Style Dictionary (by Amazon) is the most widely adopted tool for transforming a JSON token source into CSS custom properties, iOS Swift constants, Android XML colors, and other platform formats.',
        },
        {
          question: 'What are component tokens (Tier 3) in the three-tier model?',
          options: [
            'Global raw color and spacing values',
            'Internal custom properties scoped to a specific component that reference alias tokens',
            'JavaScript prop types for React components',
            'CSS class names for UI kit components',
          ],
          correctIndex: 1,
          explanation:
            'Component tokens are internal CSS custom properties (often named with `--_` convention) that reference alias tokens. They allow per-component customization without breaking the global system.',
        },
      ],
    },

    {
      topicId: 'advanced-selectors',
      topicTitle: 'Advanced Selectors',
      objectiveIndex: 5,
      questions: [
        {
          question: 'What is the key specificity difference between `:is()` and `:where()`?',
          options: [
            ':is() has zero specificity; :where() takes the highest specificity in its list',
            ':is() takes the highest specificity in its list; :where() always has zero specificity',
            'Both have zero specificity',
            'Both take the highest specificity from their argument lists',
          ],
          correctIndex: 1,
          explanation:
            '`:is()` contributes the specificity of its most specific argument. `:where()` always contributes zero specificity, making it ideal for base/reset styles that are easy to override.',
        },
        {
          question: 'How does `:where()` improve reusable base styles?',
          options: [
            'It makes all its styles !important',
            'It adds zero specificity, so any class or type selector can easily override the base styles',
            'It enables inline styles inside CSS files',
            'It prevents styles from cascading to child elements',
          ],
          correctIndex: 1,
          explanation:
            'Because `:where()` adds no specificity, base styles like `:where(ul, ol) { list-style: none; }` can be overridden by any class selector (0-1-0) without needing to increase specificity.',
        },
        {
          question: 'What makes `:has()` the "parent selector" in CSS?',
          options: [
            'It selects parent elements from a list of siblings',
            'It matches an element based on matching descendants it contains',
            'It selects elements only when they have no children',
            'It matches the direct parent of an element in the DOM',
          ],
          correctIndex: 1,
          explanation:
            '`:has()` allows selecting an element based on what it *contains*. `body:has(.modal[open])` selects `<body>` if it contains an open modal — effectively a parent/ancestor selector.',
        },
        {
          question: 'Why should complex `:has()` selectors be used carefully on large DOMs?',
          options: [
            'They are not supported in Firefox',
            'They can trigger layout thrashing',
            'Descendant matching within :has() can be expensive for the browser when applied to thousands of elements',
            'They break CSS cascade layers',
          ],
          correctIndex: 2,
          explanation:
            'Browser CSS matching works right-to-left. `:has()` with complex descendant selectors forces the browser to check containment for every matching element, which can be costly in large DOMs.',
        },
        {
          question: 'Which pattern uses `:is()` to reduce repetition when styling links in multiple page regions?',
          options: [
            ':is(.header, .footer, .sidebar) a:is(:hover, :focus) { }',
            '.header a:hover, .header a:focus, .footer a:hover { }',
            ':where(a):is(.header) { }',
            'a:is-in(.header, .footer) { }',
          ],
          correctIndex: 0,
          explanation:
            '`:is(.header, .footer, .sidebar) a:is(:hover, :focus)` is a compact way to style link hover/focus states across multiple containers, replacing six separate selectors with one rule.',
        },
      ],
    },

    {
      topicId: 'modern-css-features',
      topicTitle: 'Modern CSS Features',
      objectiveIndex: 6,
      questions: [
        {
          question: 'What is the advantage of OKLCH over hex/HSL color formats?',
          options: [
            'OKLCH has wider browser support than HSL',
            'OKLCH is perceptually uniform — colors at the same lightness value appear equally bright',
            'OKLCH automatically generates dark mode variants',
            'OKLCH produces smaller CSS file sizes',
          ],
          correctIndex: 1,
          explanation:
            'OKLCH is a perceptually uniform color space. In HSL, colors at the same `l` value appear to have different perceived brightness. OKLCH ensures equal perceived lightness, producing more predictable color palettes.',
        },
        {
          question: 'What does the `color-mix()` function do?',
          options: [
            'Generates random color combinations',
            'Blends two colors in a specified color space at a given ratio',
            'Converts colors between formats (hex to HSL)',
            'Creates a CSS gradient from two colors',
          ],
          correctIndex: 1,
          explanation:
            '`color-mix(in oklch, var(--color-brand) 80%, black)` blends the brand color with black at 80%/20% in the OKLCH color space — useful for hover state darkening without hardcoding a second color.',
        },
        {
          question: 'What does `animation-timeline: scroll()` enable?',
          options: [
            'An animation that plays on a specific scroll position trigger',
            'An animation whose progress is directly tied to the page scroll position',
            'An animation that only plays when the user scrolls to the element',
            'A JavaScript scroll event handler in CSS',
          ],
          correctIndex: 1,
          explanation:
            '`animation-timeline: scroll()` links the animation\'s playback position to the document\'s scroll progress — 0% animation at the top, 100% at the bottom. This powers pure-CSS scroll progress bars.',
        },
        {
          question: 'What does `view-transition-name` enable?',
          options: [
            'Named CSS animation keyframes for page transitions',
            'Cross-document and same-document animated transitions where specific elements morph between states',
            'Viewport-based animation starting points',
            'Named CSS layers for view-specific styles',
          ],
          correctIndex: 1,
          explanation:
            'Assigning `view-transition-name` to elements pairs them across DOM states (or page navigations), allowing the browser to animate the morph between old and new positions using the View Transitions API.',
        },
        {
          question: 'What does native CSS nesting with `& .child { }` inside `.parent { }` do?',
          options: [
            'It is invalid CSS and requires a preprocessor like Sass',
            'It applies styles to .child elements only when they are ancestors of .parent',
            'It selects .child elements that are descendants of .parent, compiled at parse time',
            'It scopes .child styles to .parent without any output to the cascade',
          ],
          correctIndex: 2,
          explanation:
            'Native CSS nesting (without a preprocessor) is now supported in all modern browsers. `& .child` inside `.parent { }` compiles to `.parent .child` — the `&` refers to the parent selector.',
        },
        {
          question: 'What does `animation-timeline: view()` and `animation-range: entry 20% entry 60%` do?',
          options: [
            'Plays the animation when the element enters the visual viewport, progressing from 20% to 60% scroll',
            'Animates the element as it enters the viewport scroll intersection, starting at 20% entry and finishing at 60% entry',
            'Delays the animation by 20% of the total scroll and ends at 60%',
            'Applies the animation only in the 20-60% range of the element\'s own size',
          ],
          correctIndex: 1,
          explanation:
            '`animation-timeline: view()` ties animation progress to the element\'s intersection with the viewport. `animation-range: entry 20% entry 60%` means the animation plays as the element goes from 20% entered to 60% entered — creating a scroll-reveal effect.',
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // EXAMS
  // ─────────────────────────────────────────────────────────────────────────
  exams: {
    beginner: [
      {
        question: 'Which HTML5 element is specifically designed for introductory content at the top of a page or section?',
        options: ['<top>', '<hero>', '<header>', '<banner>'],
        correctIndex: 2,
        explanation: '<header> represents introductory content and is typically used for a site logo, page title, and primary navigation.',
      },
      {
        question: 'A form input with `type="number"` and `min="0" max="10" step="2"` — which value would be valid?',
        options: ['3', '5', '6', '11'],
        correctIndex: 2,
        explanation: '`step="2"` means valid values are 0, 2, 4, 6, 8, 10. Only 6 is in the list.',
      },
      {
        question: 'What specificity does an inline style (`style="color: red"`) have?',
        options: ['0-0-1', '0-1-0', '1-0-0', 'It beats all normal rules'],
        correctIndex: 3,
        explanation: 'Inline styles have the highest specificity of normal CSS rules (above ID selectors). Only `!important` can override them.',
      },
      {
        question: 'Two block elements have `margin-bottom: 40px` and `margin-top: 20px`. What is the actual space between them?',
        options: ['60px', '40px', '20px', '0px'],
        correctIndex: 1,
        explanation: 'Vertical margin collapsing means the larger margin wins. The gap is 40px, not 60px.',
      },
      {
        question: '`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` creates:',
        options: [
          'A fixed 250px column layout',
          'A responsive grid where columns are at least 250px and expand to fill space',
          'A layout that always has exactly 4 columns',
          'A grid that only works on screens wider than 250px',
        ],
        correctIndex: 1,
        explanation: '`auto-fit` with `minmax(250px, 1fr)` creates as many 250px-minimum columns as fit, expanding them with `1fr` to fill remaining space — a responsive grid without media queries.',
      },
      {
        question: 'Which `justify-content` value evenly distributes flex items with equal space between all items, including before the first and after the last?',
        options: ['space-between', 'space-around', 'space-evenly', 'center'],
        correctIndex: 2,
        explanation: '`space-evenly` places equal space between every pair of adjacent items, including before the first and after the last. `space-between` places no space at the edges.',
      },
      {
        question: 'The `<picture>` element is used to:',
        options: [
          'Embed a canvas drawing',
          'Provide art direction — serving different image files based on media conditions',
          'Create an image with a caption',
          'Lazy-load images automatically',
        ],
        correctIndex: 1,
        explanation: '<picture> contains <source> elements with media conditions, enabling entirely different image compositions (not just resolutions) for different screen sizes.',
      },
      {
        question: 'Which CSS combinator selects ALL `<p>` elements that follow an `<h2>` at the same level?',
        options: ['h2 + p', 'h2 > p', 'h2 ~ p', 'h2 p'],
        correctIndex: 2,
        explanation: 'The general sibling combinator `~` selects all matching siblings after the first element. `+` selects only the immediately following sibling.',
      },
      {
        question: 'Which relative CSS unit is always relative to the root (`<html>`) element\'s font size?',
        options: ['em', 'rem', 'vw', '%'],
        correctIndex: 1,
        explanation: '`rem` is always 1× the `<html>` element\'s font size (typically 16px), making it predictable regardless of nesting. `em` is relative to the nearest ancestor font size.',
      },
      {
        question: 'What does `flex: 0 0 200px` mean?',
        options: [
          'The item will grow to 200px then stop',
          'The item has a fixed size of 200px and will neither grow nor shrink',
          'The item starts at 200px and shrinks as needed',
          'The item shrinks but never grows beyond 200px',
        ],
        correctIndex: 1,
        explanation: '`flex: grow shrink basis`. `0 0 200px` means grow=0 (don\'t grow), shrink=0 (don\'t shrink), basis=200px (fixed size). The item stays at exactly 200px.',
      },
      {
        question: 'Which attribute on an `<img>` is required for screen reader accessibility?',
        options: ['title', 'id', 'alt', 'src'],
        correctIndex: 2,
        explanation: 'The `alt` attribute provides a text alternative for screen readers. All meaningful images must have descriptive alt text. Decorative images should use `alt=""`.',
      },
      {
        question: 'In mobile-first CSS, base styles target which screen size?',
        options: ['Desktop (1024px+)', 'Large desktop (1440px+)', 'Mobile (smallest screens)', 'Tablet (768px)'],
        correctIndex: 2,
        explanation: 'Mobile-first means writing the simplest styles for the smallest screens first, then progressively enhancing with `min-width` media queries for larger viewports.',
      },
      {
        question: 'What does `display: none` differ from `visibility: hidden`?',
        options: [
          'display: none makes the element invisible but keeps its space; visibility: hidden removes it from the layout',
          'display: none removes the element from layout entirely; visibility: hidden hides it but preserves its space',
          'They are identical in behavior',
          'display: none only works on block elements; visibility: hidden works on all elements',
        ],
        correctIndex: 1,
        explanation: '`display: none` removes the element from the rendering flow — it takes no space. `visibility: hidden` makes the element invisible but it still occupies its original space.',
      },
      {
        question: 'The `<fieldset>` element is used to:',
        options: [
          'Style groups of inputs with a shared border',
          'Group related form controls under a shared legend label',
          'Prevent form fields from being submitted',
          'Define the HTTP method of a form',
        ],
        correctIndex: 1,
        explanation: '<fieldset> semantically groups related form controls. The <legend> inside it provides a label for the group, which is announced by screen readers.',
      },
      {
        question: 'What is the purpose of `grid-template-areas`?',
        options: [
          'To set the minimum and maximum row heights',
          'To name regions of a grid for placement using `grid-area`',
          'To create responsive columns without media queries',
          'To define the number of rows in a grid',
        ],
        correctIndex: 1,
        explanation: '`grid-template-areas` defines named regions using ASCII art syntax. Child elements use `grid-area: name` to place themselves in those regions, making layouts highly readable.',
      },
      {
        question: 'Which selector targets `<a>` elements whose `href` attribute value ends with `.pdf`?',
        options: ['a[href*=".pdf"]', 'a[href^=".pdf"]', 'a[href$=".pdf"]', 'a[href=".pdf"]'],
        correctIndex: 2,
        explanation: '`$=` is the "ends with" attribute selector operator. `a[href$=".pdf"]` matches all anchor links whose href value ends with ".pdf".',
      },
      {
        question: 'Why is the viewport meta tag essential for responsive design?',
        options: [
          'It enables CSS Grid in older browsers',
          'It instructs mobile browsers to set the viewport to the device width at 1:1 scale instead of scaling down a 980px page',
          'It automatically applies media queries based on the device type',
          'It prevents horizontal scrolling on all devices',
        ],
        correctIndex: 1,
        explanation: 'Without the viewport meta tag, mobile browsers render at ~980px then zoom out, making everything tiny and breaking media queries. The tag sets the viewport to device width at actual scale.',
      },
      {
        question: '`loading="lazy"` on an `<img>` element defers loading until:',
        options: [
          'The user explicitly clicks the image',
          'JavaScript enables it via IntersectionObserver',
          'The image is near the viewport',
          'All other page resources have loaded',
        ],
        correctIndex: 2,
        explanation: '`loading="lazy"` is a native browser feature that delays image loading until the element is near the viewport scroll position, reducing initial page load.',
      },
      {
        question: 'Which element wraps content that is tangentially related to the main content, like a sidebar advertisement?',
        options: ['<section>', '<note>', '<aside>', '<secondary>'],
        correctIndex: 2,
        explanation: '<aside> holds content related to the surrounding content but not central to it — sidebars, pull quotes, advertisements, and related article links.',
      },
      {
        question: 'The CSS `gap` property in a flex or grid container:',
        options: [
          'Adds margin around the container itself',
          'Creates space between flex or grid items without affecting outer edges',
          'Sets the minimum distance between items and the container wall',
          'Only works in Grid, not Flexbox',
        ],
        correctIndex: 1,
        explanation: '`gap` creates space between items (gutters) without adding space on the outer edges of the container. It replaces the older pattern of using margins on items.',
      },
    ],

    mid: [
      {
        question: 'Which CSS property scope makes custom properties available to all elements on the page?',
        options: ['body { --color: red; }', ':root { --color: red; }', '* { --color: red; }', 'html { --color: red; }'],
        correctIndex: 1,
        explanation: '`:root` has the highest specificity among element selectors and maps to `<html>`, making custom properties defined there accessible throughout the document.',
      },
      {
        question: 'A CSS keyframe animation uses `animation-fill-mode: backwards`. What does this mean?',
        options: [
          'The element keeps the last keyframe styles after the animation ends',
          'The element applies the first keyframe styles during the delay period before the animation starts',
          'The animation plays in reverse',
          'The animation only runs from 50% to 0%',
        ],
        correctIndex: 1,
        explanation: '`backwards` applies the `from`/`0%` keyframe styles during the animation delay period, so the element starts in the correct initial animation state immediately.',
      },
      {
        question: 'In BEM, `.nav__item--active` classifies as:',
        options: [
          'A block with an active modifier',
          'An element (item) of the nav block with an active modifier',
          'A modifier of the nav block',
          'An active element with a nav prefix',
        ],
        correctIndex: 1,
        explanation: '`.nav__item--active` follows the pattern `.block__element--modifier`. It is the `item` element inside the `nav` block, modified by `active`.',
      },
      {
        question: 'Which ARIA attribute should be updated dynamically when a dropdown opens?',
        options: ['aria-visible', 'aria-open', 'aria-expanded', 'aria-active'],
        correctIndex: 2,
        explanation: '`aria-expanded` communicates the open/closed state of a collapsible element to screen readers. It should toggle between `"true"` and `"false"` as the dropdown opens and closes.',
      },
      {
        question: 'SVG uses `currentColor` as a stroke/fill value to:',
        options: [
          'Apply a random color from the color palette',
          'Inherit the CSS `color` property from the parent element',
          'Use the browser\'s default link color',
          'Apply the last color set by JavaScript',
        ],
        correctIndex: 1,
        explanation: '`currentColor` is a CSS keyword that inherits the element\'s computed `color` property. This lets you control SVG stroke or fill color with a single CSS `color` rule on the parent.',
      },
      {
        question: 'What does CSS Subgrid (`grid-template-rows: subgrid`) enable in a card list?',
        options: [
          'Makes cards stack vertically automatically',
          'Aligns internal card content (titles, descriptions) to consistent row heights across sibling cards',
          'Allows cards to span multiple parent grid containers',
          'Overrides the parent grid gap with the card\'s own gap',
        ],
        correctIndex: 1,
        explanation: 'Subgrid makes a child participate in the parent\'s track sizing. Cards in a list can align their titles, content, and footers to shared row tracks — the "card alignment" problem solved natively.',
      },
      {
        question: '`::before` and `::after` pseudo-elements require which property to render?',
        options: ['display', 'position', 'content', 'visibility'],
        correctIndex: 2,
        explanation: 'Pseudo-elements are not rendered without the `content` property. It can be set to an empty string (`""`) for decorative use.',
      },
      {
        question: 'Which CSS function creates a fluid font size that is viewport-width-proportional but clamped within a range?',
        options: ['calc()', 'min()', 'max()', 'clamp()'],
        correctIndex: 3,
        explanation: '`clamp(min, viewport-relative-value, max)` — e.g., `clamp(1rem, 2.5vw, 2rem)` — creates a fluid size that scales with viewport width while respecting minimum and maximum bounds.',
      },
      {
        question: 'Which media query is required to accommodate users who have enabled accessibility motion reduction preferences?',
        options: [
          '@media (reduced-animation: true)',
          '@media (prefers-reduced-motion: reduce)',
          '@media (animation: minimal)',
          '@media (motion-preference: reduced)',
        ],
        correctIndex: 1,
        explanation: '`@media (prefers-reduced-motion: reduce)` is the standard media query to detect users who prefer minimal animation. You should disable or drastically reduce animations within this query.',
      },
      {
        question: 'What BEM modifier pattern would apply different padding to a "compact" version of a card?',
        options: [
          '.card.compact { padding: 0.5rem; }',
          '.card.card-compact { padding: 0.5rem; }',
          '.card--compact { padding: 0.5rem; }',
          '.card > compact { padding: 0.5rem; }',
        ],
        correctIndex: 2,
        explanation: 'BEM modifiers use double hyphens: `.block--modifier`. `.card--compact` is the compact modifier of the card block.',
      },
      {
        question: 'The `:has()` pseudo-class allows CSS to select an element based on:',
        options: [
          'Whether it has a specific CSS class',
          'Whether it contains specified descendant elements',
          'Whether it is the first child of its parent',
          'Whether it has been previously focused',
        ],
        correctIndex: 1,
        explanation: '`:has()` matches an element if it contains descendants matching the argument. `body:has(.modal[open])` selects body when it contains an open modal — the parent selector.',
      },
      {
        question: 'When must `aria-live="assertive"` be used instead of `"polite"`?',
        options: [
          'For search results updates',
          'For non-critical UI changes like loading spinners',
          'For critical, time-sensitive alerts like authentication errors or security warnings',
          'For all dynamic content updates',
        ],
        correctIndex: 2,
        explanation: '`assertive` immediately interrupts the screen reader. Use it only for critical information (errors, alerts). For non-critical updates, `polite` waits until the reader is idle.',
      },
      {
        question: 'What is the CSS counters pattern for automatic chapter numbering?',
        options: [
          'auto-counter on each h2 element',
          'counter-reset on the list and counter-increment on each h2, with counter() in ::before content',
          'Using the :nth-child selector with content()',
          'CSS counters require JavaScript to function',
        ],
        correctIndex: 1,
        explanation: '`counter-reset: chapter` on the parent, `counter-increment: chapter` on each `h2`, and `content: counter(chapter)` in `h2::before` creates automatic sequential numbers.',
      },
      {
        question: 'What is the transition shorthand `transition: all 0.3s ease` considered problematic?',
        options: [
          'It is invalid — you must specify the property',
          '`all` transitions every animatable property, including expensive layout properties, impacting performance',
          'It is not supported in Safari',
          'Ease is not a valid timing function with all',
        ],
        correctIndex: 1,
        explanation: '`transition: all` will animate every property that changes, including layout-triggering properties like `width` and `height`. Always explicitly list the properties you want to transition.',
      },
      {
        question: 'Which CSS function gives a container a max-width but ensures it never exceeds the screen width?',
        options: [
          'clamp(0, 1200px, 100%)',
          'max(1200px, 100%)',
          'min(1200px, 90%)',
          'calc(min(1200px) + 10vw)',
        ],
        correctIndex: 2,
        explanation: '`min(1200px, 90%)` returns whichever is smaller. On large viewports it returns 1200px; on smaller screens, 90% — providing a max-width with viewport-relative padding.',
      },
      {
        question: 'What does `env(safe-area-inset-bottom)` provide?',
        options: [
          'The browser window\'s bottom bar height',
          'The device\'s safe area inset to avoid home indicator and navigation bars',
          'The user\'s preferred bottom padding setting',
          'The computed padding-bottom of the root element',
        ],
        correctIndex: 1,
        explanation: '`env()` accesses browser environment variables. `safe-area-inset-bottom` is the space required to avoid the iPhone home indicator or Android navigation bar.',
      },
      {
        question: 'In an accessible modal dialog using the native `<dialog>` element, which method opens it with focus trapping and backdrop?',
        options: ['dialog.open()', 'dialog.toggle()', 'dialog.showModal()', 'dialog.activate()'],
        correctIndex: 2,
        explanation: '`dialog.showModal()` opens the native `<dialog>` as a modal: it traps focus inside the dialog, adds the `::backdrop` pseudo-element, and closes with the Escape key.',
      },
      {
        question: 'Inline SVG icons can be styled with CSS because:',
        options: [
          'SVG elements are part of the HTML DOM and inherit CSS from their parent context',
          'SVG has its own separate styling system compatible with CSS',
          'The browser treats inline SVG as an image element',
          'Only specific SVG properties can be styled with CSS',
        ],
        correctIndex: 0,
        explanation: 'Inline SVG is part of the HTML DOM. SVG elements and their attributes (`fill`, `stroke`) can be controlled with CSS, and they inherit `color` from their parent elements.',
      },
      {
        question: 'Which specificity pattern is used in ITCSS utilities layer and why?',
        options: [
          'ID selectors for maximum precedence',
          'Class selectors with !important to ensure utility overrides always win',
          'Type selectors for broad reach',
          'Attribute selectors for semantic clarity',
        ],
        correctIndex: 1,
        explanation: 'Utility classes in ITCSS use `!important` to ensure they always override component and object styles. This is the one sanctioned use of `!important` in the system.',
      },
      {
        question: 'What is the purpose of `aria-describedby` on an input element?',
        options: [
          'It labels the input for accessibility',
          'It links the input to descriptive text (hints, error messages) announced after the label',
          'It sets the input\'s placeholder text for screen readers',
          'It prevents the described element from being announced by default',
        ],
        correctIndex: 1,
        explanation: '`aria-describedby` links an input to one or more elements containing supplementary descriptions. Screen readers announce the linked text after the main label, providing hints or error messages.',
      },
      {
        question: 'A `.form-group:has(input:invalid)` rule with a left red border provides what UX benefit?',
        options: [
          'It highlights the submit button when the form is invalid',
          'It visually marks the entire form group containing an invalid input without JavaScript',
          'It prevents form submission on invalid inputs',
          'It changes the input type to text on validation failure',
        ],
        correctIndex: 1,
        explanation: '`:has(input:invalid)` selects the form group only when it contains an invalid input — applying visual error styling to the entire group without any JavaScript, using CSS alone.',
      },
      {
        question: 'What does `transform-style: preserve-3d` on a card flip container do?',
        options: [
          'It enables 3D transforms on the container itself',
          'It allows child elements to exist in 3D space rather than being flattened',
          'It adds a perspective to all child elements automatically',
          'It prevents 3D transforms from affecting layout',
        ],
        correctIndex: 1,
        explanation: 'Without `transform-style: preserve-3d`, child elements are flattened into a 2D plane. `preserve-3d` allows children to exist in 3D space, enabling card flip effects where front and back faces are visible.',
      },
    ],

    senior: [
      {
        question: 'In ITCSS layer ordering, which assertion is correct?',
        options: [
          'Components override Utilities because they are more specific',
          'Utilities override Components because they appear later in the source order',
          'Settings override all other layers because they contain the design tokens',
          'Objects and Components share the same specificity level',
        ],
        correctIndex: 1,
        explanation: 'ITCSS organizes layers so Utilities come last in the CSS output, giving them higher specificity through source order over Components, Objects, and Elements.',
      },
      {
        question: 'Which @layer declaration order gives utilities the highest priority?',
        options: [
          '@layer utilities, components, base, reset;',
          '@layer reset, base, components, utilities;',
          '@layer base, utilities, components, reset;',
          '@layer components, reset, utilities, base;',
        ],
        correctIndex: 1,
        explanation: 'Layer priority goes to the last declared layer. `@layer reset, base, components, utilities` gives utilities the highest priority and reset the lowest.',
      },
      {
        question: 'What is the main benefit of using `:where()` for CSS resets?',
        options: [
          'It applies styles globally without any limitations',
          'It adds zero specificity, so any selector can easily override reset styles',
          'It prevents styles from being inherited by children',
          'It enables JavaScript to be triggered by CSS resets',
        ],
        correctIndex: 1,
        explanation: '`:where()` contributes zero specificity. Reset styles wrapped in `:where()` can be overridden by even the simplest class or type selector without needing higher-specificity rules.',
      },
      {
        question: 'Container queries differ from media queries in that they query:',
        options: [
          'CSS variables instead of dimensions',
          'The parent container\'s size instead of the viewport',
          'The rendered font size of the element',
          'The device\'s hardware capabilities',
        ],
        correctIndex: 1,
        explanation: 'Container queries enable component-driven responsiveness. A card adapts based on where it is placed (sidebar vs. main area) rather than the viewport size.',
      },
      {
        question: 'Why is CSS architecture (ITCSS, CUBE, Utility-First) more critical for large teams than small projects?',
        options: [
          'It prevents specificity conflicts and class name collisions when multiple developers write CSS simultaneously',
          'Large teams require slower build tools',
          'Architecture frameworks have better browser support on enterprise browsers',
          'Small projects cannot use ITCSS',
        ],
        correctIndex: 0,
        explanation: 'Without an architecture, large teams produce CSS with conflicting specificity, duplicate rules, and unclear ownership. Architecture methodologies prevent these issues by providing shared conventions.',
      },
      {
        question: 'What happens to styles defined outside of any `@layer` in a stylesheet that uses cascade layers?',
        options: [
          'They are placed in a default anonymous first layer',
          'They are ignored',
          'They always win over all layered styles',
          'They are treated as part of the last declared layer',
        ],
        correctIndex: 2,
        explanation: 'Unlayered styles win over ALL layered styles regardless of specificity. This is intentional — it provides an escape hatch and prevents accidentally breaking existing code when adopting layers.',
      },
      {
        question: 'In the three-tier design token architecture, why are component tokens (Tier 3) useful?',
        options: [
          'They allow components to break out of the design system',
          'They define the global color palette used everywhere',
          'They scope customizable values to a specific component, referencing alias tokens and allowing per-component overrides',
          'They are the same as Tier 2 alias tokens but with different naming conventions',
        ],
        correctIndex: 2,
        explanation: 'Component tokens (often prefixed `--_`) encapsulate a component\'s design choices, referencing alias tokens. They enable component-level theming via CSS custom property inheritance.',
      },
      {
        question: 'Which of the following best describes `content-visibility: auto`?',
        options: [
          'It hides elements until they are clicked',
          'It skips rendering work for off-screen elements while reserving space via contain-intrinsic-size',
          'It automatically detects and hides duplicate content',
          'It enables content to be visible only in certain color schemes',
        ],
        correctIndex: 1,
        explanation: '`content-visibility: auto` skips layout, paint, and compositing for off-screen content. Combined with `contain-intrinsic-size`, the browser reserves approximate space, preventing layout jumps on scroll.',
      },
      {
        question: 'OKLCH color space is preferred for design systems because:',
        options: [
          'It has wider CSS syntax support than HSL',
          'Colors at the same L (lightness) value have consistent perceived brightness across hues',
          'It automatically generates dark mode variants from light colors',
          'It uses fewer parameters than HSL',
        ],
        correctIndex: 1,
        explanation: 'In OKLCH, the L axis is perceptually uniform. A palette generated at L=58% across different hues appears equally bright, making it far superior to HSL for systematic color design.',
      },
      {
        question: 'What is the purpose of `animation-range: entry 20% entry 60%` in a scroll-driven animation?',
        options: [
          'Delays the animation to start 20% into the page scroll',
          'Plays the animation as the element progresses from 20% entered to 60% entered in the viewport',
          'Limits the animation to run only in the visible 20-60% of the page',
          'Sets a 20% to 60% opacity range for the animation',
        ],
        correctIndex: 1,
        explanation: '`animation-range` with the `view()` timeline controls which portion of the element\'s viewport intersection triggers the animation. `entry 20% entry 60%` means the animation plays as the element moves from 20% to 60% into the viewport.',
      },
      {
        question: 'What does `@import url("third-party.css") layer(third-party)` accomplish?',
        options: [
          'It imports the stylesheet and gives it the highest priority',
          'It imports the stylesheet into the named layer, allowing your own layers to override it',
          'It conditionally loads the stylesheet based on screen size',
          'It prevents the stylesheet from affecting the cascade',
        ],
        correctIndex: 1,
        explanation: 'Importing into a named layer places the third-party styles in a specific cascade layer. If that layer is declared before your own layers, your styles always win — a clean solution for third-party specificity conflicts.',
      },
      {
        question: 'Which modern CSS feature enables cross-page animated transitions without JavaScript?',
        options: [
          'Scroll-driven animations with animation-timeline',
          'CSS View Transitions API with @view-transition { navigation: auto }',
          'Container queries with transition animations',
          'Cascade layers with animation ordering',
        ],
        correctIndex: 1,
        explanation: '`@view-transition { navigation: auto }` enables browser-native animated transitions between page navigations in multi-page applications — a cross-fade by default, customizable with `::view-transition-old/new`.',
      },
      {
        question: 'Native CSS nesting uses `&` to:',
        options: [
          'Escape CSS selector characters',
          'Reference the parent selector in nested rules',
          'Apply universal selector matching',
          'Declare CSS custom properties',
        ],
        correctIndex: 1,
        explanation: 'In native CSS nesting, `&` refers to the parent selector. `.card { & .card__title { } }` compiles to `.card .card__title { }`. It is equivalent to Sass nesting syntax.',
      },
      {
        question: 'Why is `will-change: all` an anti-pattern?',
        options: [
          'It is a syntax error in CSS',
          'It promotes every element to a GPU layer, consuming excessive memory and potentially harming performance',
          'It prevents CSS transitions from running on the element',
          'It only works in Chrome and not other browsers',
        ],
        correctIndex: 1,
        explanation: '`will-change: all` hints to the browser to prepare compositor layers for ALL properties on the element. This wastes GPU memory and can degrade overall rendering performance across the page.',
      },
      {
        question: 'What is `font-display: swap` in a `@font-face` declaration?',
        options: [
          'Prevents the custom font from loading at all',
          'Shows a fallback font immediately, then swaps to the custom font when it loads',
          'Loads the custom font and shows a blank space until it is ready',
          'Swaps between two custom fonts based on screen size',
        ],
        correctIndex: 1,
        explanation: '`swap` shows a fallback font (FOUT strategy) immediately while the custom font downloads. This prevents invisible text (FOIT) while the custom font loads.',
      },
      {
        question: 'In CUBE CSS, data-attribute exceptions like `[data-variant="featured"]` are preferred over BEM modifiers because:',
        options: [
          'Data attributes have higher specificity than class modifiers',
          'They separate structural component styles from behavioral/state variations, keeping block CSS clean',
          'Data attributes are faster for the browser to parse',
          'BEM modifiers cannot express multiple simultaneous states',
        ],
        correctIndex: 1,
        explanation: 'Data attributes in CUBE CSS communicate intent — a variant or state is a behavioral concern. This separates variation logic from the core block definition, making component APIs more explicit.',
      },
      {
        question: '`body:has(.modal[open]) { overflow: hidden; }` demonstrates which advanced CSS capability?',
        options: [
          'Using :has() to detect state of a descendant element and style an ancestor',
          'Using CSS to simulate JavaScript event listeners',
          'Querying the body element\'s own attributes',
          'Applying styles only when overflow is already hidden',
        ],
        correctIndex: 0,
        explanation: '`:has()` allows selecting an ancestor based on the state of a descendant. When an open modal exists in the body, the body gets `overflow: hidden` — preventing scroll without JavaScript.',
      },
      {
        question: 'What is the `contain: layout style paint` property combination used for?',
        options: [
          'Applying containment to prevent layout, style, and paint from escaping the element',
          'Locking the element\'s size to its intrinsic dimensions',
          'Preventing CSS animations from affecting sibling elements',
          'Enabling subgrid within the contained element',
        ],
        correctIndex: 0,
        explanation: 'CSS containment (`contain: layout style paint`) tells the browser that changes inside the element do not affect the outside world. This allows the browser to optimize rendering, skipping outside recalculations.',
      },
      {
        question: 'Why are alias design tokens the recommended mechanism for dark mode implementation?',
        options: [
          'Because global tokens cannot be overridden',
          'Because you remap aliases from light to dark global values, and all components using aliases automatically update',
          'Alias tokens have a higher CSS specificity than global tokens',
          'Dark mode requires separate stylesheets — tokens cannot handle it',
        ],
        correctIndex: 1,
        explanation: 'Alias tokens map semantic purpose to values (`--color-surface-primary`). In dark mode, only the alias-to-global mapping changes. Every component using aliases automatically gets the correct dark colors.',
      },
      {
        question: 'Style Dictionary\'s primary role in a design system pipeline is:',
        options: [
          'Generating Storybook documentation automatically',
          'Linting CSS for specificity violations',
          'Transforming platform-agnostic design token JSON into platform-specific code (CSS, iOS, Android)',
          'Compiling Sass into CSS',
        ],
        correctIndex: 2,
        explanation: 'Style Dictionary takes design tokens defined in JSON (or YAML) and transforms them into CSS custom properties, iOS constants, Android XML, JavaScript objects, and more — making tokens the single source of truth across platforms.',
      },
      {
        question: 'Which `@layer` feature makes it safe to import low-priority third-party CSS without specificity conflicts?',
        options: [
          'Third-party layers are automatically reset on import',
          'By assigning third-party imports to a layer declared first, they always have lower priority than your own layers',
          'Layers force all third-party selectors to have zero specificity',
          'The browser blocks third-party layers from affecting host styles',
        ],
        correctIndex: 1,
        explanation: 'In `@layer third-party, reset, base, components, utilities`, the `third-party` layer is declared first, giving it the lowest priority. Your layers always win regardless of how specific the third-party selectors are.',
      },
      {
        question: 'What does `color-mix(in oklch, var(--color-brand-500) 80%, black)` produce?',
        options: [
          'An 80% opacity version of the brand color',
          'A darker version of the brand color by mixing 80% brand with 20% black in OKLCH color space',
          'A gradient from the brand color to black',
          'The brand color converted to OKLCH format',
        ],
        correctIndex: 1,
        explanation: '`color-mix()` blends two colors at a specified ratio. `80%, black` means 80% of the brand color mixed with 20% black — a controlled darkening without hardcoding a second color value.',
      },
      {
        question: 'A scroll-driven reading progress bar uses `animation-timeline: scroll()`. What does this mean?',
        options: [
          'The animation triggers once when the user starts scrolling',
          'The animation progress tracks 1:1 with how far the user has scrolled down the page',
          'The animation plays at each scroll event',
          'The animation speed increases as the user scrolls faster',
        ],
        correctIndex: 1,
        explanation: '`animation-timeline: scroll()` ties the animation\'s playback state directly to the scroll position. At the top: 0% progress. At the bottom: 100% progress — creating a pure CSS progress bar.',
      },
    ],
  },
};
