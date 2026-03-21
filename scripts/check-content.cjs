const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync('src/data/languageMarkdownContent.js', 'utf8');
let objStr = src.replace(/^\/\/[^\n]*\n/gm, '').replace(/^export const languageMarkdownContent = /, '');
objStr = objStr.trimEnd();
if (objStr.endsWith(';')) objStr = objStr.slice(0, -1);
const context = {};
vm.createContext(context);
const data = vm.runInContext('(' + objStr + ')', context);

const py = data['Python'].beginner;
// Check for backtick characters in the runtime string
const idx = py.indexOf('`');
console.log('First backtick at index:', idx);
if (idx >= 0) {
  console.log('Context around it:', JSON.stringify(py.substring(Math.max(0,idx-10), idx+20)));
}

// Check for backslashes
let backslashCount = 0;
for (let i = 0; i < py.length; i++) {
  if (py[i] === '\\') backslashCount++;
}
console.log('Total backslashes in Python beginner:', backslashCount);

// Show a snippet with escaped chars
const snippet = py.substring(0, 500);
console.log('First 500 chars (JSON):', JSON.stringify(snippet).substring(0, 300));

// Check HTML-CSS
const html = data['HTML-CSS'].beginner;
const htmlBacktickIdx = html.indexOf('`');
console.log('HTML-CSS first backtick at:', htmlBacktickIdx);
if (htmlBacktickIdx >= 0) {
  console.log('Context:', JSON.stringify(html.substring(Math.max(0,htmlBacktickIdx-5), htmlBacktickIdx+15)));
}
let htmlBackslashCount = 0;
for (let i = 0; i < html.length; i++) {
  if (html[i] === '\\') htmlBackslashCount++;
}
console.log('Total backslashes in HTML-CSS beginner:', htmlBackslashCount);
