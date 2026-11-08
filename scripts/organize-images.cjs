const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../Images');
const destDir = path.resolve(__dirname, '../public/images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
console.log(`Found ${files.length} images in Images directory.`);

const sorted = files.map(f => {
  const stat = fs.statSync(path.join(srcDir, f));
  return { name: f, size: stat.size };
}).sort((a,b) => b.size - a.size);

const manifest = [];

sorted.forEach((item, index) => {
  const ext = path.extname(item.name) || '.jpg';
  const newName = `btp-asset-${String(index + 1).padStart(2, '0')}${ext}`;
  
  // Copy to newName
  fs.copyFileSync(path.join(srcDir, item.name), path.join(destDir, newName));
  // Also keep original name
  fs.copyFileSync(path.join(srcDir, item.name), path.join(destDir, item.name));
  
  manifest.push({
    index: index + 1,
    originalName: item.name,
    semanticName: newName,
    sizeKb: Math.round(item.size / 1024),
    path: `/images/${newName}`
  });
});

fs.writeFileSync(
  path.resolve(__dirname, '../src/data/imagesManifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`Successfully copied ${manifest.length} images to ${destDir} and generated imagesManifest.json`);

