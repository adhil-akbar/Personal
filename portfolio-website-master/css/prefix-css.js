const fs = require('fs');

const INPUT = 'assets/css/shine.css';
const OUTPUT = 'assets/css/shine-prefixed.css';
const PREFIX = '.shine-scope ';

// Read the CSS file
let css = fs.readFileSync(INPUT, 'utf8');

// Regex to match selectors (not @media, @keyframes, etc.)
css = css.replace(/(^|})\s*([^{@}][^{]*?){/g, (match, brace, selector) => {
  // Split selectors by comma, trim, and prefix each
  const prefixed = selector
    .split(',')
    .map(s => {
      s = s.trim();
      // Don't prefix if already prefixed or is an at-rule
      if (s.startsWith(PREFIX) || s.startsWith('@')) return s;
      return PREFIX + s;
    })
    .join(', ');
  return `${brace}\n${prefixed}{`;
});

// Write the new CSS file
fs.writeFileSync(OUTPUT, css, 'utf8');
console.log(`Prefixed CSS written to ${OUTPUT}`);