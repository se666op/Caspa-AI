const https = require('https');

const COUPON_URL = 'https://caspa.ai/?ref=amine';
const API_HOST = 'api.caspa.ai';

function fetchJobStatus(jobId) {
  return new Promise((resolve, reject) => {
    const opts = { hostname: API_HOST, path: `/v1/jobs/${jobId}`, method: 'GET' };
    https.get(opts, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

console.log(`Deal page: ${COUPON_URL}`);

fetchJobStatus('demo-456')
  .then((data) => console.log('Job status:', JSON.stringify(data, null, 2)))
  .catch((err) => console.error('API error:', err.message));
