const { chromium } = require('playwright');

(async () => {
  console.log('--- Running Automated Playwright Test on http://localhost:3000/ ---');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('pageerror', err => errors.push(err.toString()));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // 1. Check initial state
  const initial = await page.evaluate(() => {
    const activeBtn = document.querySelector('.nav-step.active');
    const orbital = document.getElementById('orbital-circle');
    const ringCards = document.querySelectorAll('.ring-card');
    return {
      activeCategory: activeBtn?.innerText,
      orbitalRadius: orbital?.getAttribute('r'),
      cardCount: ringCards.length,
      headline: document.getElementById('center-title')?.innerText
    };
  });
  console.log('Initial State:', initial);
  await page.screenshot({ path: 'playwright-test-01-home.png' });

  // 2. Test Category click on AX FRONTIER
  console.log('Testing navigateCategory("frontier")...');
  await page.evaluate(() => window.navigateCategory('frontier'));
  await page.waitForTimeout(1000);

  const frontierState = await page.evaluate(() => {
    const activeBtn = document.querySelector('.nav-step.active');
    const wrapper = document.getElementById('indicator-wrapper');
    const activeCard = document.querySelector('.ring-card.active-top');
    return {
      activeCategory: activeBtn?.innerText,
      wrapperTransform: wrapper?.style.transform,
      activeCardTitle: activeCard?.title,
      headline: document.getElementById('center-title')?.innerText
    };
  });
  console.log('Frontier State:', frontierState);
  await page.screenshot({ path: 'playwright-test-02-frontier.png' });

  // 3. Test Lightbox Modal on Slide 2
  console.log('Testing Lightbox Modal...');
  await page.evaluate(() => window.openCardModal(5));
  await page.waitForTimeout(600);

  const modalState = await page.evaluate(() => {
    const modal = document.getElementById('card-modal');
    const img = document.getElementById('modal-card-img');
    const rect = img?.getBoundingClientRect();
    return {
      isOpen: modal?.classList.contains('open'),
      imgSrc: img?.src.split('/').pop(),
      imgWidth: rect?.width,
      imgHeight: rect?.height
    };
  });
  console.log('Modal State:', modalState);
  await page.screenshot({ path: 'playwright-test-03-modal.png' });

  // 4. Close modal and test smooth wheel rotation
  await page.evaluate(() => window.closeCardModal());
  await page.waitForTimeout(400);

  console.log('Testing wheel scroll simulation...');
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(1000);

  const wheelState = await page.evaluate(() => {
    const activeCard = document.querySelector('.ring-card.active-top');
    const activeBtn = document.querySelector('.nav-step.active');
    return {
      activeCategory: activeBtn?.innerText,
      activeCardTitle: activeCard?.title
    };
  });
  console.log('After Wheel Scroll State:', wheelState);
  await page.screenshot({ path: 'playwright-test-04-scrolled.png' });

  // 5. Mobile Viewport Check
  console.log('Testing Mobile Viewport (390x844)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  const mobileCheck = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    orbitalRadius: document.getElementById('orbital-circle')?.getAttribute('r')
  }));
  console.log('Mobile Check:', mobileCheck);
  await page.screenshot({ path: 'playwright-test-05-mobile.png' });

  console.log('Total Console/Page Errors:', errors.length);
  if (errors.length > 0) console.error('Errors:', errors);

  await browser.close();
  console.log('--- Playwright Automated Test Completed Successfully! ---');
})();
