const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ Referer: 'https://sparktoro.com/' })
  await page.goto('https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0597477');
  await page.waitForSelector('.kb-permalink');

  const stories = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('li > a'))
    console.log(links);
    return links.map(link => {
      return {
        "href": link.href,
        "title": link.title
      }
    })
  })
  console.log(stories);
  await browser.close();
})();