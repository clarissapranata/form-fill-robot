const puppeteer = require('puppeteer');

async function fillForm() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Get secrets from environment variables
  const FORM_URL = process.env.FORM_URL;
  const BPJS_NUMBER = process.env.BPJS_NUMBER;
  const EMAIL = process.env.EMAIL;
  const FULL_NAME = process.env.FULL_NAME;
  const PHONE_NUMBER = process.env.PHONE_NUMBER;
  const RADIASI_OPTION = process.env.RADIASI_OPTION;

  // Open the form
  await page.goto(FORM_URL, { waitUntil: 'networkidle2' });

  // Fill the form fields
  await page.type('input[name="entry.1554402701"]', BPJS_NUMBER);
  await page.type('input[name="entry.1284769295"]', EMAIL);
  await page.type('input[name="entry.1136100702"]', FULL_NAME);
  await page.type('input[name="entry.1843294849"]', PHONE_NUMBER);

  // Select the correct option for "Tujuan Kunjungan"
  await page.click(`div[aria-label="${RADIASI_OPTION}"]`);

  // Click submit
  await page.click('div[role="button"][aria-label="Submit"]');

  await page.waitForTimeout(2000); // optional wait
  await browser.close();
}

fillForm();
