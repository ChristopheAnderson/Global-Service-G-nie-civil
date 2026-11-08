const https = require('https');
const fs = require('fs');

const url = 'https://www.google.com/maps/place/Global+Service+%E2%80%93+G%C3%A9nie+civil/@6.3561359,2.4275849,17z/data=!3m1!4b1!4m6!3m5!1s0x102355bc82777863:0x6205e8910aba809e!8m2!3d6.3561359!4d2.4275849!16s%2Fg%2F11y09b_7_1?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('./scripts/maps-dump.html', data);
    console.log('Saved maps-dump.html, size:', data.length);
    // Find strings matching "+229"
    const p = data.match(/\+229[\d\s\-]{8,15}/g);
    console.log('+229 matches:', p ? [...new Set(p)] : 'none');
    // Find strings matching "01" (new 8/10 digit format in Benin)
    const p2 = data.match(/01[\d\s]{8,10}/g);
    console.log('01 matches:', p2 ? [...new Set(p2)] : 'none');
    // Find strings containing "Rue" or "Gbégamè"
    const r = data.match(/(?:Rue|Avenue|Boulevard|Quartier|Gb[eé]gam[eé])[^\"]{5,60}/gi);
    console.log('Street/Quarter matches:', r ? [...new Set(r)].slice(0, 5) : 'none');
  });
}).on('error', err => console.error(err));

