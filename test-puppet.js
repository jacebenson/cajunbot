const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ Referer: 'https://sparktoro.com/' })
  await page.goto('https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0597477');
  await page.waitForSelector('.kb-permalink');

  const availablePatchLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('li > a'))
    console.log(links);
    var patchLinks = links.filter(link => {
      if (link.title.indexOf('Patch') >= 0) {
        return true;
      }
    })
    return patchLinks.map(link => {
      return {
        "href": link.href,
        "title": link.title
      }
    })
  })
  console.log(availablePatchLinks);
  /*let patches = {}
  availablePatchLinks.forEach(async (patch) => {
    patches[patch.title] = [];
    
    const browser2 = await puppeteer.launch();
    const page2 = await browser2.newPage();
    await page2.setExtraHTTPHeaders({ Referer: 'https://sparktoro.com/' })
    await page2.goto(patch.href);
    await page2.waitForSelector('.kb-permalink');
    await page2.evaluate(() => {
      const links = Array.from(document.querySelectorAll('li > a'))
      console.log(links);
      patches[patch.title] = links.map(link => {
        return {
          "href": link.href,
          "title": link.title
        }
      })
    })
    console.log(availablePatchLinks);
  })
  */
  await browser.close();
  //console.log(patches);
})();