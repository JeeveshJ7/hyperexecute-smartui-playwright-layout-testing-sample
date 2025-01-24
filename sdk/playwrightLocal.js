const { chromium } = require("playwright");
const smartuiSnapshot = require("@lambdatest/playwright-driver");

(async () => {
  // Launch a local browser instance
  const browser = await chromium.launch({
    headless: false, // Set to false to see the browser UI
  });

  const page = await browser.newPage();

await page.setViewportSize({ width: 1280, height: 1024 });

    let comparisonType = {
        ignoreType: ['layout']
    };

    await page.goto("https://kaneai.my.salesforce.com/");
    const username =process.env.username 
    const password=process.env.password
    // Locate and fill in the username field
    await page.fill("#username", username);
    // Locate and fill in the password field
    await page.fill("#password", password);
    // Locate and click the login button
    await page.click("#Login");
    // Wait for navigation to the dashboard (or a specific element to be loaded)
    await page.waitForURL("**/home", { timeout: 10000 });
    console.log("Login successful, navigated to dashboard");
    await page.waitForTimeout(20000);

    console.log("Login successful, waited for 20 seconds after login");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await smartuiSnapshot.smartuiSnapshot(page, "salesForce", comparisonType);

    await page.goto("https://www.atlassian.com/");
    await page.waitForTimeout(5000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    await smartuiSnapshot.smartuiSnapshot(page, "atlassian", comparisonType);

    await page.goto("https://www.netflix.com/in/");
    await page.waitForTimeout(5000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    await smartuiSnapshot.smartuiSnapshot(page, "netflix", comparisonType);

    // await page.goto("https://www.atlassian.com/de");
    // await page.waitForTimeout(5000);
    // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // await page.waitForTimeout(2000);
    // await smartuiSnapshot.smartuiSnapshot(page, "atlassian", comparisonType);

    // await page.goto("https://www.netflix.com/in-hi/");
    // await page.waitForTimeout(5000);
    // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // await page.waitForTimeout(2000);
    // await smartuiSnapshot.smartuiSnapshot(page, "netflix", comparisonType);

  // Close the browser
  await browser.close();
})();