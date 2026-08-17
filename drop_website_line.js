const fs = require('fs');
const path = 'privacy-policy.md';
let content = fs.readFileSync(path, 'utf8');

const old = `\n**Website:** huddleyouthsports.com`;
const count = content.split(old).length - 1;
if (count !== 1) {
  console.error(`ABORT: found ${count} matches, expected 1. Nothing written.`);
  process.exit(1);
}
content = content.replace(old, '');
fs.writeFileSync(path, content, 'utf8');
console.log('SUCCESS: removed the dead website line.');
