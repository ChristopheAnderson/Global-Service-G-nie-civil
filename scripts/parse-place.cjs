const fs = require('fs');
const html = fs.readFileSync('./scripts/maps-dump.html', 'utf8');
const key = '0x102355bc82777863:0x6205e8910aba809e';
const start = html.indexOf(key);
if (start !== -1) {
  console.log(html.substring(start - 20, start + 3000));
} else {
  console.log('Not found');
}

