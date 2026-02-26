const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=2',
  'https://sanand0.github.io/tdsdata/js_table/?seed=3',
  'https://sanand0.github.io/tdsdata/js_table/?seed=4',
  'https://sanand0.github.io/tdsdata/js_table/?seed=5',
  'https://sanand0.github.io/tdsdata/js_table/?seed=6',
  'https://sanand0.github.io/tdsdata/js_table/?seed=7',
  'https://sanand0.github.io/tdsdata/js_table/?seed=8',
  'https://sanand0.github.io/tdsdata/js_table/?seed=9',
  'https://sanand0.github.io/tdsdata/js_table/?seed=10',
  'https://sanand0.github.io/tdsdata/js_table/?seed=11',
];

(async () => {
  // Launch a headless (invisible) browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for the table to appear (it loads dynamically via JS)
    await page.waitForSelector('table');

    // Grab all cell text from the table
    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(cell => parseFloat(cell.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((acc, n) => acc + n, 0);
    console.log(`Seed URL: ${url} | Sum: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`\nTotal sum across all pages: ${grandTotal}`);

  await browser.close();
})();
