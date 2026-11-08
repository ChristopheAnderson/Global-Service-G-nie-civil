const https = require('https');

// Decimal CID
const cid = BigInt('0x6205e8910aba809e').toString();
console.log('CID decimal:', cid);

// Try fetching using CID URL
const cidUrl = `https://maps.google.com/maps?cid=${cid}&output=classic`;
https.get(cidUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}, (res) => {
  console.log('Location header:', res.headers.location);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const title = data.match(/<title>(.*?)<\/title>/);
    console.log('Title:', title ? title[1] : 'none');
    // search for any phone number pattern (+229) or (229) or (01) or 8 digits
    const phones = data.match(/(?:\+?229[\s.-]?)?(?:[0-9]{2}[\s.-]?){4}/g);
    console.log('Potential phones:', phones ? phones.slice(0, 10) : 'none');
    
    // search for text around Global Service
    const idx = data.indexOf('Global Service');
    if (idx !== -1) {
      console.log('Context around Global Service:', data.substring(idx - 50, idx + 250));
    }
  });
});

