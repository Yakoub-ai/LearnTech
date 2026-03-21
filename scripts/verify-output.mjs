import { content as pythonContent } from '../src/data/languages/python-content.js';
import { content as jsContent } from '../src/data/languages/javascript-content.js';
import { content as sqlContent } from '../src/data/languages/sql-content.js';
import { content as tsContent } from '../src/data/languages/typescript-content.js';
import { content as htmlCssContent } from '../src/data/languages/html-css-content.js';

console.log('Python beginner length:', pythonContent.beginner.length);
console.log('Python mid length:', pythonContent.mid.length);
console.log('Python senior length:', pythonContent.senior.length);
console.log('JS beginner length:', jsContent.beginner.length);
console.log('SQL beginner length:', sqlContent.beginner.length);
console.log('TypeScript beginner length:', tsContent.beginner.length);
console.log('HTML-CSS beginner length:', htmlCssContent.beginner.length);
console.log('');
console.log('All imports OK!');
