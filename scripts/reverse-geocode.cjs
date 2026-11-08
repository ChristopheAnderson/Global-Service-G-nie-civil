const https = require('https');

const lat = 6.3561359;
const lon = 2.4275849;
const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

https.get(url, {
  headers: {
    'User-Agent': 'GlobalServiceBTPProject/1.0 (contact@globalservice-geniecivil.bj)'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Reverse geocoding result:');
      console.log('Display name:', json.display_name);
      console.log('Address:', JSON.stringify(json.address, null, 2));
    } catch (e) {
      console.log('Raw data:', data);
    }
  });
});

