import { expect, test } from '@playwright/test';
import path from 'node:path';

const captureRoot = process.env.TEMP ?? process.cwd();
const isNoiseError = (message: string) => /WebSocket connection to .*\/_next\/hmr/i.test(message);

test('visually verifies the five-category Skills layout', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error' && !isNoiseError(message.text())) errors.push(message.text()); });
  page.on('pageerror', (error) => { if (!isNoiseError(error.message)) errors.push(error.message); });

  for (const viewport of [
    { width: 1536, height: 960 },
    { width: 1180, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.querySelector('#skills')?.scrollIntoView({ block: 'start' });
    });
    await expect.poll(() => page.locator('.skills-intro').evaluate((node) => Number(getComputedStyle(node).opacity))).toBeGreaterThan(0.99);
    await page.waitForTimeout(900);

    const metrics = await page.locator('#skills').evaluate((section) => {
      const grid = section.querySelector<HTMLElement>('.skill-groups')!;
      const groups = [...section.querySelectorAll<HTMLElement>('.skill-group')];
      const items = [...section.querySelectorAll<HTMLElement>('.skill-group li')];
      const headings = [...section.querySelectorAll<HTMLElement>('.skill-group h3')];
      const labels = [...section.querySelectorAll<HTMLElement>('.skill-group small')];
      const rects = groups.map((group) => ({
        left: group.offsetLeft,
        right: group.offsetLeft + group.offsetWidth,
        top: group.offsetTop,
        bottom: group.offsetTop + group.offsetHeight,
      }));
      const overlaps = rects.flatMap((rect, index) => rects.slice(index + 1).filter((other) => (
        Math.min(rect.right, other.right) - Math.max(rect.left, other.left) > 1
        && Math.min(rect.bottom, other.bottom) - Math.max(rect.top, other.top) > 1
      ))).length;

      return {
        documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        groupCount: groups.length,
        itemCount: items.length,
        overlaps,
        groupsInsideConsole: rects.every((rect) => rect.left >= 0 && rect.right <= grid.clientWidth + 1),
        headingOverflow: headings.some((heading) => heading.scrollWidth > heading.clientWidth + 1),
        labelOverflow: labels.some((label) => label.scrollWidth > label.clientWidth + 1),
        clippedIcons: items.some((item) => {
          const icon = item.querySelector<HTMLElement>(':scope > span')!;
          return icon.offsetWidth < 48 || icon.offsetHeight < 48;
        }),
      };
    });

    expect(metrics).toEqual({
      documentOverflow: 0,
      groupCount: 5,
      itemCount: 22,
      overlaps: 0,
      groupsInsideConsole: true,
      headingOverflow: false,
      labelOverflow: false,
      clippedIcons: false,
    });

    await page.screenshot({ path: path.join(captureRoot, `skills-five-categories-${viewport.width}.png`) });
  }

  expect(errors).toEqual([]);
});
