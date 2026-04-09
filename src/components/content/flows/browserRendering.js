import { MarkerType } from '@xyflow/react'

const nodeDefaults = {
  style: {
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 13,
    fontFamily: 'Inter, system-ui, sans-serif',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface-2)',
    color: 'var(--color-text)',
    cursor: 'pointer',
  },
}

const primaryStyle = {
  ...nodeDefaults.style,
  background: '#6366f1',
  color: '#fff',
  border: '1px solid #4f46e5',
}

const accentStyle = {
  ...nodeDefaults.style,
  background: '#0ea5e9',
  color: '#fff',
  border: '1px solid #0284c7',
}

const greenStyle = {
  ...nodeDefaults.style,
  background: '#10b981',
  color: '#fff',
  border: '1px solid #059669',
}

const amberStyle = {
  ...nodeDefaults.style,
  background: '#f59e0b',
  color: '#fff',
  border: '1px solid #d97706',
}

const nodes = [
  {
    id: 'html',
    position: { x: 0, y: 0 },
    data: {
      label: '📄 HTML Parsing',
      detail: 'The browser reads the HTML document byte by byte, converts bytes to characters, tokenises the characters into tags, and constructs the DOM tree. Parsing is incremental — the browser starts rendering before the entire document is downloaded.',
      tips: ['The parser is blocked by synchronous <script> tags — use defer or async', 'Malformed HTML is corrected by the parser (e.g., unclosed tags)', 'The <head> is parsed first, which is why CSS links belong there'],
    },
    style: primaryStyle,
  },
  {
    id: 'dom',
    position: { x: 200, y: 0 },
    data: {
      label: '🌳 DOM Tree',
      detail: 'The Document Object Model is a tree representation of every HTML element. Each node has properties, methods, and relationships (parent, child, sibling). JavaScript interacts with the page through the DOM API.',
      code: '<!-- HTML -->\n<div id="app">\n  <h1>Title</h1>\n  <p>Text</p>\n</div>\n\n// DOM tree:\n// document\n//   └── html\n//       └── body\n//           └── div#app\n//               ├── h1 → "Title"\n//               └── p  → "Text"',
      tips: ['DOM manipulation is expensive — batch changes where possible', 'Virtual DOM (React) minimises direct DOM operations', 'Use document.querySelector() for element selection'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'css',
    position: { x: 0, y: 140 },
    data: {
      label: '🎨 CSS Parsing',
      detail: 'The browser parses CSS files and inline styles into the CSSOM (CSS Object Model). CSS is render-blocking — the browser will not render until it has processed all CSS to avoid a flash of unstyled content.',
      tips: ['CSS in <head> is render-blocking by design — this prevents FOUC', 'Minimise CSS file size with purging unused styles', 'Critical CSS can be inlined in <head> for faster first paint'],
    },
    style: primaryStyle,
  },
  {
    id: 'cssom',
    position: { x: 200, y: 140 },
    data: {
      label: '📐 CSSOM',
      detail: 'The CSS Object Model is a tree of style rules matching the DOM structure. Each node carries its computed styles, including inherited properties from parent elements.',
      tips: ['Specificity determines which rule wins when multiple rules match', 'Inherited properties (color, font) cascade down the tree', 'The cascade: origin → specificity → source order'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'rendertree',
    position: { x: 400, y: 70 },
    data: {
      label: '🌲 Render Tree',
      detail: 'The browser combines the DOM and CSSOM to build the render tree. Only visible elements are included — elements with display:none are excluded. Each node in the render tree knows what to display and how to style it.',
      tips: ['display:none removes an element from the render tree entirely', 'visibility:hidden keeps the element in the render tree but invisible', 'Pseudo-elements (::before, ::after) are in the render tree but not the DOM'],
    },
    style: accentStyle,
  },
  {
    id: 'layout',
    position: { x: 400, y: 190 },
    data: {
      label: '📏 Layout (Reflow)',
      detail: 'Calculate the exact position and size of every element in the render tree. The browser walks the tree, applying the box model (content + padding + border + margin) and resolving percentage widths, flexbox, and grid.',
      tips: ['Layout is expensive — triggered by reading offsetWidth/Height after DOM changes', 'Batch DOM reads and writes to avoid layout thrashing', 'Flexbox and Grid are more efficient than float-based layouts'],
    },
    style: amberStyle,
  },
  {
    id: 'paint',
    position: { x: 600, y: 70 },
    data: {
      label: '🖌️ Paint',
      detail: 'Fill in the pixels: draw text, colours, images, borders, shadows. The browser paints each layer separately. Complex paint operations (shadows, gradients, filters) are more expensive.',
      tips: ['will-change: transform promotes an element to its own layer', 'Avoid animating properties that trigger paint (background-color, box-shadow)', 'Use the Paint Flashing tool in DevTools to see what repaints'],
    },
    style: greenStyle,
  },
  {
    id: 'composite',
    position: { x: 600, y: 190 },
    data: {
      label: '🧩 Composite',
      detail: 'Combine painted layers in the correct order (z-index, stacking contexts) and send to the GPU for display. Compositing is cheap because it only moves pre-painted bitmaps.',
      tips: ['transform and opacity are the cheapest properties to animate (compositor-only)', 'Too many layers waste GPU memory — use will-change sparingly', 'The compositor runs on a separate thread from the main thread'],
    },
    style: greenStyle,
  },
]

const edgeDefaults = {
  style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-primary)' },
  animated: true,
}

const edges = [
  { id: 'e1', source: 'html', target: 'dom', label: 'build', ...edgeDefaults },
  { id: 'e2', source: 'css', target: 'cssom', label: 'build', ...edgeDefaults },
  { id: 'e3', source: 'dom', target: 'rendertree', label: 'combine', ...edgeDefaults },
  { id: 'e4', source: 'cssom', target: 'rendertree', label: 'combine', ...edgeDefaults },
  { id: 'e5', source: 'rendertree', target: 'layout', label: 'calculate', ...edgeDefaults },
  { id: 'e6', source: 'layout', target: 'paint', label: 'fill pixels', ...edgeDefaults },
  { id: 'e7', source: 'paint', target: 'composite', label: 'layer', ...edgeDefaults },
]

export default {
  title: 'Browser Rendering Pipeline — Critical Rendering Path',
  nodes,
  edges,
}
