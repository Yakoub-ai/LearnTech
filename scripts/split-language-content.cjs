const fs = require('fs');
const vm = require('vm');

// Read the source file
const src = fs.readFileSync('src/data/languageMarkdownContent.js', 'utf8');

// Create output directory
const outDir = 'src/data/languages';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Parse the object - strip export declaration and leading comments
let objStr = src.replace(/^\/\/[^\n]*\n/gm, '').replace(/^export const languageMarkdownContent = /, '');
objStr = objStr.trimEnd();
if (objStr.endsWith(';')) objStr = objStr.slice(0, -1);

const context = {};
vm.createContext(context);
const data = vm.runInContext('(' + objStr + ')', context);

console.log('Keys found:', Object.keys(data));

// Helper: escape backticks, backslashes, and ${ for template literal embedding
function escapeForTemplateLiteral(str) {
  // Order matters: escape backslashes first, then backticks, then ${
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '\\') {
      result += '\\\\';
    } else if (ch === '`') {
      result += '\\`';
    } else if (ch === '$' && str[i + 1] === '{') {
      result += '\\$';
    } else {
      result += ch;
    }
  }
  return result;
}

// Map of key -> filename prefix
const langMap = [
  ['Python', 'python'],
  ['JavaScript', 'javascript'],
  ['SQL', 'sql'],
  ['TypeScript', 'typescript'],
  ['HTML-CSS', 'html-css'],
];

for (const [key, fileId] of langMap) {
  const langData = data[key];

  let beginner, mid, senior;
  if (langData && (langData.beginner || langData.mid || langData.senior)) {
    beginner = langData.beginner || '';
    mid = langData.mid || '';
    senior = langData.senior || '';
  } else {
    // Skeleton for missing/empty languages
    beginner = `# HTML & CSS \u2014 Beginner\n\nContent coming soon.`;
    mid = `# HTML & CSS \u2014 Mid\n\nContent coming soon.`;
    senior = `# HTML & CSS \u2014 Senior\n\nContent coming soon.`;
  }

  const fileContent = 'export const content = {\n'
    + '  beginner: `' + escapeForTemplateLiteral(beginner) + '`,\n'
    + '  mid: `' + escapeForTemplateLiteral(mid) + '`,\n'
    + '  senior: `' + escapeForTemplateLiteral(senior) + '`,\n'
    + '}\n';

  const outPath = outDir + '/' + fileId + '-content.js';
  fs.writeFileSync(outPath, fileContent, 'utf8');
  console.log('Written: ' + outPath + ' (' + fileContent.length + ' bytes)');
}

console.log('All files written successfully.');
