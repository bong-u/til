const {BetaAnalyticsDataClient} = require('@google-analytics/data');
const fs = require('fs');
const path = require('path');

const PROPERTY_ID = process.env.GA4_PROPERTY_ID || '360054304';
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'popular.json');

async function fetchPopularPages() {
  const client = new BetaAnalyticsDataClient();

  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dimensions: [{name: 'pagePath'}],
    metrics: [{name: 'screenPageViews'}],
    dateRanges: [{startDate: '30daysAgo', endDate: 'today'}],
    orderBys: [{metric: {metricName: 'screenPageViews'}, desc: true}],
    limit: 50,
  });

  const pages = (response.rows || [])
    .map(row => ({
      path: row.dimensionValues[0].value.replace(/^\/til/, ''),
      views: parseInt(row.metricValues[0].value, 10),
    }))
    // /til/ 하위의 실제 게시물 경로만 필터링 (인덱스, 태그 등 제외)
    .filter(p => {
      // /{section}/{slug}/ 형태의 실제 게시물만 포함
      const parts = p.path.replace(/^\//, '').replace(/\/$/, '').split('/');
      return parts.length === 2 && parts[0] !== 'tags' && parts[1] !== '' && !parts[1].startsWith('page');
    });

  fs.mkdirSync(path.dirname(OUTPUT_PATH), {recursive: true});
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(pages, null, 2));
  console.log(`Saved ${pages.length} popular pages to ${OUTPUT_PATH}`);
}

fetchPopularPages().catch(err => {
  console.error('Failed to fetch popular pages:', err.message);
  process.exit(1);
});
