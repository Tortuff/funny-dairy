'use strict';

const fs = require('fs');

let html = fs
  .readFileSync('docs/index.html', 'utf8')
  .replace('href="favicon.png"', 'href="funny-dairy/favicon.png"')
  .replaceAll('src="', 'src="funny-dairy/')
  .replaceAll('href="styles', 'href="funny-dairy/styles');

fs.writeFileSync('docs/index.html', html, 'utf8');

console.log('Replacing has been ended without errors!');
