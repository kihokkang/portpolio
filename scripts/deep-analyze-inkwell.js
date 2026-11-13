const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('--- Launching Playwright to inspect inkwell.tech ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  // Collect network scripts
  const scripts = [];
  page.on('response', async (res) => {
    const url = res.url();
    if (url.endsWith('.js') || url.includes('/_next/') || url.includes('/static/')) {
      try {
        const text = await res.text();
        scripts.push({ url, length: text.length, snippet: text.slice(0, 500) });
      } catch (e) {}
    }
  });

  await page.goto('https://inkwell.tech/', { waitUntil: 'networkidle', timeout: 45000 });
  console.log('Page loaded. Dismissing modals/cookies...');

  // Dismiss cookies or legal modals
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const acceptBtn = buttons.find(b => b.innerText.includes('Accept'));
    if (acceptBtn) acceptBtn.click();
    const closeBtn = document.querySelector('.legal-close, .modal-close');
    if (closeBtn) closeBtn.click();
  });

  await page.waitForTimeout(1500);

  // Analyze DOM, Canvas, Libraries
  const analysis = await page.evaluate(async () => {
    // 1. Detect libraries
    const libs = {
      three: typeof THREE !== 'undefined' || !!window.__THREE__,
      gsap: typeof gsap !== 'undefined' || !!window.gsap,
      lenis: typeof Lenis !== 'undefined' || !!window.Lenis,
      framerMotion: !!window.__framer_motion || document.querySelector('[data-framer-motion]') !== null
    };

    // 2. Look for WebGL canvases
    const canvases = Array.from(document.querySelectorAll('canvas')).map(c => {
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      return {
        width: c.width,
        height: c.height,
        style: c.getAttribute('style'),
        className: c.className,
        hasGL: !!gl,
        glRenderer: gl ? gl.getParameter(gl.RENDERER) : null,
        glVendor: gl ? gl.getParameter(gl.VENDOR) : null
      };
    });

    // 3. Look for elements with CSS transitions or transforms
    const allElements = Array.from(document.querySelectorAll('*'));
    const animatedElements = [];

    for (const el of allElements) {
      const style = window.getComputedStyle(el);
      const hasTransform = style.transform && style.transform !== 'none';
      const hasTransition = style.transition && style.transition !== 'all 0s ease 0s' && !style.transition.includes('0s');
      const hasAnimation = style.animationName && style.animationName !== 'none';

      if (hasTransform || hasTransition || hasAnimation) {
        animatedElements.push({
          tag: el.tagName,
          className: el.className,
          id: el.id,
          transform: style.transform,
          transition: style.transition,
          animation: style.animation,
          opacity: style.opacity
        });
      }
    }

    // 4. Inspect Step Navigation & Text Indicators
    const indicators = Array.from(document.querySelectorAll('.step-name, .text-indicator, .indicator-wrapper, [class*="step"], [class*="indicator"]')).map(el => ({
      className: el.className,
      text: el.innerText.trim(),
      style: el.getAttribute('style'),
      computedTransform: window.getComputedStyle(el).transform,
      computedOpacity: window.getComputedStyle(el).opacity,
      computedColor: window.getComputedStyle(el).color
    }));

    return {
      libs,
      canvases,
      animatedCount: animatedElements.length,
      sampleAnimated: animatedElements.slice(0, 15),
      indicators
    };
  });

  console.log('Basic Analysis:', JSON.stringify(analysis, null, 2));

  // Now let's record scroll interaction at multiple intervals
  console.log('Recording scroll sequence...');
  const scrollKeyframes = [];

  for (let scrollY = 0; scrollY <= 15000; scrollY += 2500) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(400);

    const frameData = await page.evaluate((y) => {
      const indicator = document.querySelector('.indicator-wrapper');
      const activeStep = document.querySelector('.step-name.active') || document.querySelector('.active');
      const heading = document.querySelector('h1, h2, .headline');
      const text = document.body.innerText.split('\n').filter(t => t.trim().length > 0).slice(0, 8);

      return {
        scrollY: y,
        indicatorTransform: indicator ? window.getComputedStyle(indicator).transform : null,
        activeStepText: activeStep ? activeStep.innerText : null,
        visibleHeading: heading ? heading.innerText : null,
        textSample: text
      };
    }, scrollY);

    scrollKeyframes.push(frameData);
  }

  console.log('Scroll Keyframes:', JSON.stringify(scrollKeyframes, null, 2));

  // Save report
  fs.writeFileSync('scripts/inkwell-playwright-analysis.json', JSON.stringify({
    analysis,
    scrollKeyframes,
    scriptsCount: scripts.length,
    scripts: scripts.slice(0, 10)
  }, null, 2));

  await browser.close();
  console.log('--- Playwright Analysis Finished! Saved to scripts/inkwell-playwright-analysis.json ---');
})();
