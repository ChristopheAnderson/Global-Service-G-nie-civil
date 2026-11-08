const https = require('https');

const url = 'https://www.google.com/maps/place/Global+Service+%E2%80%93+G%C3%A9nie+civil/@6.3561359,2.4275849,17z/data=!3m1!4b1!4m6!3m5!1s0x102355bc82777863:0x6205e8910aba809e!8m2!3d6.3561359!4d2.4275849!16s%2Fg%2F11y09b_7_1?entry=ttu';

https.get(url, { 
  headers: { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8'
  } 
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    
    // Title
    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    if (titleMatch) console.log('Title:', titleMatch[1]);
    
    // Meta description
    const metaDesc = data.match(/<meta content="([^"]+)" itemprop="description"/i) || data.match(/name="description" content="([^"]+)"/i);
    if (metaDesc) console.log('Meta Desc:', metaDesc[1]);

    // Coordinates check
    console.log('Target Lat/Lng: 6.3561359, 2.4275849');

    // Look for string patterns like addresses or phone numbers
    const matches = data.match(/\+229[\d\s]{8,15}/g);
    if (matches) console.log('Phone matches:', [...new Set(matches)]);

    // Check for plus code or street name
    const plusCode = data.match(/[2-9CFGHJMPQRVWX]{4}\+[2-9CFGHJMPQRVWX]{2,3}/);
    if (plusCode) console.log('Plus code:', plusCode[0]);

    // Check snippets around "Cotonou"
    let idx = 0;
    const snippets = [];
    while ((idx = data.indexOf('Cotonou', idx + 1)) !== -1 && snippets.length < 5) {
      snippets.push(data.substring(Math.max(0, idx - 40), Math.min(data.length, idx + 60)));
    }
    console.log('Snippets around Cotonou:', snippets);
  });
}).on('error', err => console.error(err));

