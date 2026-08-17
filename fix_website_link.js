const fs = require('fs');
const path = 'privacy-policy.md';
let content = fs.readFileSync(path, 'utf8');

const old = `**Website:** huddleyouthsports.com`;
const count = content.split(old).length - 1;
if (count !== 1) {
  console.error(`ABORT: found ${count} matches, expected 1. No changes written.`);
  process.exit(1);
}

content = content.replace(old, `**About Huddle:** https://joenazzaro5.github.io/huddle-legal/about`);
fs.writeFileSync(path, content, 'utf8');
console.log('SUCCESS: website line now points to the live about page.');
