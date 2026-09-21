import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const isNoiseError = (message: string) =>
  /WebSocket connection to .*\/_next\/hmr/i.test(message) ||
  /Failed to load resource: net::ERR_CONNECTION_REFUSED/i.test(message);

test('mobile navigation traps focus, closes with Escape, and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'Open navigation' });
  await expect(opener).toBeVisible();
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Site navigation' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close navigation' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('tracks the visible section and exposes explicit project actions', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 960 });
  await page.goto('/');
  await page.locator('.desktop-nav').getByRole('button', { name: 'Projects' }).click();
  await expect(page.locator('.desktop-nav button[aria-current="page"]')).toHaveText('Projects', { timeout: 10_000 });
  await expect(page.locator('.orbital-campaign__sector strong')).toHaveText('03 / Projects');
  await expect(page.getByText('Live project').first()).toBeVisible();
  await expect(page.getByText('Source').first()).toBeVisible();
  await page.locator('.desktop-nav').getByRole('button', { name: 'Skills', exact: true }).click();
  await expect(page.locator('#skills')).toBeInViewport();
  await expect(page.locator('.orbital-campaign__sector strong')).toHaveText('05 / Skills');
});

test('renders the requested Alejo spelling and animates project promotion without remounting', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 960 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.orbital-campaign')).toBeAttached();
  await expect(page.locator('.campaign-scene')).toHaveCount(6);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Reychie Alejo');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('.project-card--featured h3')).toHaveText('USEAPP');
  const neAttendCard = page.locator('.project-card', { hasText: 'NE-Attend' });
  await page.getByRole('button', { name: 'Feature NE-Attend' }).click();
  await page.waitForTimeout(100);
  await expect(neAttendCard).toHaveClass(/project-card--promoting/);
  await page.waitForTimeout(850);
  await expect(page.locator('.project-card--featured h3')).toHaveCount(1);
  await expect(page.locator('.project-card--featured h3')).toHaveText('NE-Attend');
  await expect(page.getByText('Showing NE-Attend as the featured project.')).toBeAttached();
  await page.getByRole('button', { name: 'Feature USEAPP' }).click();
  await page.waitForTimeout(900);
  await expect(page.locator('.project-card--featured h3')).toHaveText('USEAPP');
});

test('renders the requested portfolio copy, supplied Projects plate, and contact availability state', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 960 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Reychie Alejo');
  await expect(page.locator('.hero-description')).toHaveText('I build real-world applications across frontend, backend, data, and AI-enabled workflows that turn complex requirements into reliable products people can use.');
  await expect(page.locator('.hero-description')).not.toContainText('—');
  await expect(page.locator('.hero-status')).toContainText('Open to new opportunities');

  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('#projects h2')).toContainText(/Projects I’ve\s*Built/);
  await expect(page.locator('.projects-intro > p')).toHaveText('A selection of systems and applications I’ve developed across professional, academic, and personal projects.');
  await expect(page.locator('.projects-atmosphere img')).toHaveAttribute('src', /lunar-contact/);

  await page.locator('#experience').scrollIntoViewIfNeeded();
  await expect(page.locator('.experience-heading > p')).toHaveText('My professional experience, including the roles, projects, and responsibilities I’ve worked on.');

  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('#contact h2')).toContainText(/Open to new\s*opportunities/);
  await expect(page.locator('.contact-copy > p')).toHaveText('I’m available for professional opportunities, projects, collaborations, and other development work.');
  await expect(page.getByText('Available for new roles', { exact: true })).toBeVisible();
  await expect(page.locator('.contact-email')).toHaveCount(0);
  await expect(page.getByText('alejo.angeloreychie@gmail.com', { exact: true })).toHaveCount(0);
  const emailLink = page.getByRole('link', { name: 'Send an Email' });
  await expect(emailLink).toHaveAttribute('href', 'https://mail.google.com/mail/?view=cm&fs=1&to=alejo.angeloreychie%40gmail.com');
  await expect(emailLink).toHaveAttribute('target', '_blank');
  await expect(emailLink).toHaveAttribute('rel', /noopener/);
  await expect(emailLink).toHaveAttribute('rel', /noreferrer/);
  await expect(page.locator('.linkedin-link')).toHaveAttribute('href', 'https://www.linkedin.com/in/angelo-reychie-alejo-41970225b/');
});

test('keeps the Hero J and Skills S unclipped and replays scroll entrances', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 960 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.hero h1')).toBeVisible();

  const heroType = await page.locator('.hero h1').evaluate((heading) => {
    const style = getComputedStyle(heading);
    return { clipPath: style.clipPath, overflow: style.overflow };
  });
  expect(heroType).toEqual({ clipPath: 'none', overflow: 'visible' });

  const skillsIntro = page.locator('.skills-intro');
  await skillsIntro.scrollIntoViewIfNeeded();
  await expect(skillsIntro).toBeVisible();
  await expect(page.locator('.skills-intro h2')).toContainText(/Tools &\s*Technologies/);
  const skillsType = await page.locator('.skills-intro h2').evaluate((heading) => {
    const headingRect = heading.getBoundingClientRect();
    const wrapperRect = heading.parentElement!.getBoundingClientRect();
    return {
      clipPath: getComputedStyle(heading.parentElement!).clipPath,
      fitsWrapper: headingRect.right <= wrapperRect.right + 1,
    };
  });
  expect(skillsType).toEqual({ clipPath: 'none', fitsWrapper: true });

  await page.locator('#home').scrollIntoViewIfNeeded();
  await expect.poll(() => skillsIntro.evaluate((node) => Number(getComputedStyle(node).opacity))).toBeLessThan(0.1);
  await skillsIntro.scrollIntoViewIfNeeded();
  await expect.poll(() => skillsIntro.evaluate((node) => Number(getComputedStyle(node).opacity))).toBeGreaterThan(0.99);
});

test('renders the exact five Skills categories with 22 unique technologies', async ({ page }) => {
  const expectedGroups = [
    { title: 'Languages', technologies: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'Java'] },
    { title: 'Frontend & Mobile', technologies: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Vite'] },
    { title: 'Backend & APIs', technologies: ['Node.js', 'Express.js', 'Socket.IO'] },
    { title: 'Databases & Backend Services', technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'] },
    { title: 'Development & Deployment', technologies: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel'] },
  ];

  await page.setViewportSize({ width: 1536, height: 960 });
  await page.goto('/');
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await expect(page.locator('.skills-console__head span').first()).toHaveText('Technical skills');
  await expect(page.locator('.skills-console__head span').last()).toHaveText('05 categories / 22 technologies');

  const groups = page.locator('.skill-group');
  await expect(groups).toHaveCount(5);
  for (const [index, expected] of expectedGroups.entries()) {
    const group = groups.nth(index);
    await expect(group.locator('.skill-group__head > span')).toHaveText(String(index + 1).padStart(2, '0'));
    await expect(group.getByRole('heading', { level: 3 })).toHaveText(expected.title);
    expect(await group.locator('li small').allTextContents()).toEqual(expected.technologies);
  }

  const technologies = await groups.locator('li small').allTextContents();
  expect(technologies).toHaveLength(22);
  expect(new Set(technologies).size).toBe(22);
});

test('mounts both Three.js fields and keeps the verified experience visible with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 960 });
  await page.goto('/');
  const orbitalField = page.locator('canvas.orbital-field--webgl');
  await expect(orbitalField).toBeAttached();
  await expect.poll(async () => orbitalField.evaluate((node) => {
    const canvas = node as HTMLCanvasElement;
    return canvas.width > 0 && canvas.height > 0;
  })).toBe(true);
  await page.locator('#about').scrollIntoViewIfNeeded();
  const aboutField = page.locator('canvas.about-orbit-field');
  await expect(aboutField).toBeAttached();
  await expect.poll(async () => aboutField.evaluate((node) => (node as HTMLCanvasElement).width > 0)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('.orbital-campaign')).toHaveCSS('display', 'none');
  await expect(page.locator('.campaign-scene').first()).toHaveCSS('display', 'none');
  await page.locator('#experience').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Full-Stack Developer' })).toBeVisible();
  await expect(page.getByText('Compassionate Home Health Services')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'On-the-Job Training' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Capstone Systems' })).toHaveCount(0);
  for (const technology of ['TypeScript', 'Next.js', 'Node.js', 'Python', 'Supabase', 'Vercel']) {
    await expect(page.locator('.experience-tech', { hasText: technology })).toBeVisible();
  }
});

test('has no serious WCAG violations at desktop or mobile widths', async ({ page }) => {
  for (const viewport of [{ width: 1536, height: 960 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.waitForTimeout(1200);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const material = results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical');
    expect(material, JSON.stringify(material, null, 2)).toEqual([]);
  }
});

test('hydrates cleanly with reduced motion', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' && !isNoiseError(message.text())) errors.push(message.text());
  });
  page.on('pageerror', (error) => {
    if (!isNoiseError(error.message)) errors.push(error.message);
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
});

test('loads every section asset and exposes verified destinations without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' && !isNoiseError(message.text())) errors.push(message.text());
  });
  page.on('pageerror', (error) => {
    if (!isNoiseError(error.message)) errors.push(error.message);
  });
  await page.goto('/');
  for (const id of ['about', 'projects', 'experience', 'skills', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(180);
  }
  const result = await page.evaluate(() => ({
    brokenImages: [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
    hrefs: [...document.querySelectorAll<HTMLAnchorElement>('a[href]')].map((link) => link.href),
  }));
  expect(result.brokenImages).toEqual([]);
  for (const name of ['Express.js', 'Socket.IO', 'MySQL']) {
    const logo = page.locator(`img[title="${name} logo"]`);
    await expect(logo).toBeVisible();
    await expect.poll(async () => logo.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  for (const destination of [
    'https://github.com/Reychie/NE_ATTEND-Update',
    'https://github.com/Reychie/USEAPP',
    'https://useapp-f783.vercel.app/',
    'https://github.com/Reychie',
    'https://www.linkedin.com/in/angelo-reychie-alejo-41970225b/',
    'https://mail.google.com/mail/?view=cm&fs=1&to=alejo.angeloreychie%40gmail.com',
  ]) {
    expect(result.hrefs).toContain(destination);
  }
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Feature NE-Attend' }).click();
  await page.waitForTimeout(900);
  await expect(page.locator('.project-card--featured .project-card__media')).toHaveAttribute('href', 'https://ne-attend-update.vercel.app/');
  expect(errors).toEqual([]);
});

test('stays within every requested viewport', async ({ page }) => {
  for (const width of [1920, 1600, 1536, 1440, 1366, 1280, 1024, 768, 430, 390, 375]) {
    await page.setViewportSize({ width, height: width <= 768 ? 844 : 900 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  }
});
