const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync('./src/data/imagesManifest.json', 'utf8'));

let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Gallery</title>
<style>
body { background: #101c35; color: white; font-family: sans-serif; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.card { background: #173d65; border-radius: 12px; overflow: hidden; }
img { width: 100%; height: 200px; object-fit: cover; }
p { padding: 8px; margin: 0; font-size: 12px; font-family: monospace; }
</style>
</head><body><h2>Images Catalog</h2><div class="grid">`;

manifest.filter(m => m.semanticName.endsWith('.jpg')).forEach(m => {
  html += `<div class="card"><img src="/images/${m.semanticName}" loading="lazy"><p>${m.semanticName} (${m.sizeKb} KB)</p></div>`;
});

html += `</div></body></html>`;

fs.writeFileSync('./public/gallery-preview.html', html);
console.log('Created public/gallery-preview.html');

