const fs = require('fs');
const vm = require('vm');

// Parse source
const src = fs.readFileSync('src/data/languageMarkdownContent.js', 'utf8');
let objStr = src.replace(/^\/\/[^\n]*\n/gm, '').replace(/^export const languageMarkdownContent = /, '');
objStr = objStr.trimEnd();
if (objStr.endsWith(';')) objStr = objStr.slice(0, -1);
const context = {};
vm.createContext(context);
const data = vm.runInContext('(' + objStr + ')', context);

// Parse each output file
const langMap = [
  ['Python', 'python'],
  ['JavaScript', 'javascript'],
  ['SQL', 'sql'],
  ['TypeScript', 'typescript'],
  ['HTML-CSS', 'html-css'],
];

let allMatch = true;

for (const [key, fileId] of langMap) {
  const outSrc = fs.readFileSync(`src/data/languages/${fileId}-content.js`, 'utf8');
  const outContext = {};
  vm.createContext(outContext);
  // Wrap as variable assignment
  vm.runInContext('var content;', outContext);
  // Replace export with var assignment
  const wrapped = outSrc.replace('export const content = ', 'content = ');
  vm.runInContext(wrapped, outContext);
  const outContent = outContext.content;

  const srcData = data[key];
  if (!srcData) {
    console.log(`SKIP ${key}: no source data`);
    continue;
  }

  for (const level of ['beginner', 'mid', 'senior']) {
    const srcStr = srcData[level] || '';
    const outStr = outContent[level] || '';
    if (srcStr === outStr) {
      console.log(`OK: ${key}.${level} (${outStr.length} chars)`);
    } else {
      allMatch = false;
      console.log(`MISMATCH: ${key}.${level}`);
      console.log('  Source length:', srcStr.length, 'Output length:', outStr.length);
      // Find first difference
      let diffIdx = 0;
      while (diffIdx < srcStr.length && diffIdx < outStr.length && srcStr[diffIdx] === outStr[diffIdx]) diffIdx++;
      console.log('  First diff at index:', diffIdx);
      console.log('  Source:', JSON.stringify(srcStr.substring(Math.max(0,diffIdx-20), diffIdx+30)));
      console.log('  Output:', JSON.stringify(outStr.substring(Math.max(0,diffIdx-20), diffIdx+30)));
    }
  }
}

console.log(allMatch ? '\nAll content matches!' : '\nSome content mismatches found!');
