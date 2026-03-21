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
    }
  ]
}
