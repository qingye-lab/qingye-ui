// Page-only checks. The caller owns browser, context and tab lifecycle.
export function readContrast(element) {
  const canvas = new OffscreenCanvas(1, 1);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const rgba = (color) => {
    ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1);
    return [...ctx.getImageData(0, 0, 1, 1).data].map((n, i) => i === 3 ? n / 255 : n);
  };
  const compose = (over, under) => over.slice(0, 3).map((n, i) => n * over[3] + under[i] * (1 - over[3]));
  const luminance = (rgb) => rgb.map((n) => n / 255).map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4).reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
  const ratio = (a, b) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const parents = []; for (let p = element.parentElement; p; p = p.parentElement) parents.unshift(p);
  let outer = [255, 255, 255];
  const unsupported = [];
  const ancestors = parents.map((p) => {
    const s = getComputedStyle(p); if (s.opacity !== '1' || s.backgroundImage !== 'none' || s.mixBlendMode !== 'normal') unsupported.push(p.tagName);
    const color = rgba(s.backgroundColor); outer = compose(color, outer);
    return { tag: p.tagName, slot: p.dataset.slot, background: s.backgroundColor, opacity: s.opacity, rgba: color };
  });
  const s = getComputedStyle(element);
  if (s.opacity !== '1' || s.backgroundImage !== 'none' || s.mixBlendMode !== 'normal') unsupported.push('element');
  const bg = rgba(s.backgroundColor), fg = rgba(s.color), border = rgba(s.borderTopColor);
  const effectiveBackground = compose(bg, outer), effectiveForeground = compose(fg, effectiveBackground);
  const borderBackground = s.backgroundClip.split(',')[0].trim() === 'padding-box' ? outer : effectiveBackground;
  const effectiveBorder = compose(border, borderBackground);
  const threshold = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.6667 && Number(s.fontWeight) >= 700) ? 3 : 4.5;
  return { text: element.textContent.trim(), fgCSS: s.color, bgCSS: s.backgroundColor, borderCSS: s.borderTopColor, foreground: fg, background: bg, border, outer, effectiveBackground, effectiveForeground, effectiveBorder, textContrast: ratio(effectiveForeground, effectiveBackground), textThreshold: threshold, borderOuterContrast: ratio(effectiveBorder, outer), borderWidth: s.borderTopWidth, opacity: s.opacity, fontSize: s.fontSize, fontWeight: s.fontWeight, ancestors, unsupported, backgroundClip: s.backgroundClip, pseudoState: { hover: element.matches(':hover'), active: element.matches(':active') } };
}
async function visit(page, baseURL, slug, theme = 'light') {
  await page.goto(`${baseURL}/playground/${slug}?theme=${theme}`, { waitUntil: 'networkidle' });
  await page.locator('[data-playground] [data-demo]').first().waitFor();
  await page.waitForFunction(theme => document.documentElement.classList.contains(theme) && document.documentElement.style.colorScheme === theme, theme);
}
export async function probeBrandBeforeMount(page, baseURL) {
  const url = `${baseURL}/playground/button`;
  const handler = async (route) => {
    const response = await route.fetch();
    let body = await response.text();
    body = body.replace('<html ', '<html data-brand="audit-project" data-density="compact" ');
    body = body.replace('<head>', `<head><style>html[data-brand="audit-project"]{--qy-primary:rgb(32,96,192)}html[data-brand="audit-project"].dark{--qy-primary:rgb(128,176,240)}</style><script>window.__auditBeforeMount={brand:document.documentElement.dataset.brand,density:document.documentElement.dataset.density,rootExists:!!document.getElementById('root')};</script>`);
    await route.fulfill({ response, body });
  };
  await page.route(url + '**', handler);
  const result = { modes: [] };
  try {
    await visit(page, baseURL, 'button', 'light');
    result.beforeMount = await page.evaluate(() => window.__auditBeforeMount);
    for (const theme of ['light', 'dark', 'light']) {
      // Exercise the real Provider's storage-event listener after mount.
      await page.evaluate(theme => window.dispatchEvent(new StorageEvent('storage', { key: 'yq-theme', newValue: theme })), theme);
      await page.waitForFunction(theme => document.documentElement.classList.contains(theme) && document.documentElement.style.colorScheme === theme, theme);
      const sample = await page.locator('[data-demo="variants"] [data-slot="button"]').first().evaluate(button => ({ brand: document.documentElement.dataset.brand, density: document.documentElement.dataset.density, classes: [...document.documentElement.classList], colorScheme: document.documentElement.style.colorScheme, primary: getComputedStyle(document.documentElement).getPropertyValue('--qy-primary').trim(), buttonBackground: getComputedStyle(button).backgroundColor }));
      result.modes.push({ theme, ...sample });
    }
    result.pass = result.beforeMount?.brand === 'audit-project' && result.beforeMount.density === 'compact' && result.beforeMount.rootExists === false && result.modes.every(x => x.brand === 'audit-project' && x.density === 'compact' && x.buttonBackground === (x.theme === 'dark' ? 'rgb(128, 176, 240)' : 'rgb(32, 96, 192)'));
  } finally { await page.unroute(url + '**', handler); await visit(page, baseURL, 'button'); }
  return result;
}
export async function probeDanger(page, baseURL) {
  const rows = [];
  for (const theme of ['light', 'dark']) {
    await visit(page, baseURL, 'button', theme);
    for (const [variant, label] of [['filled', '删除设备'], ['outline', '解除绑定']]) {
      const button = page.locator('[data-demo="variants"]').getByRole('button', { name: label, exact: true });
      for (const state of ['normal', 'hover', 'pressed']) {
        await button.scrollIntoViewIfNeeded();
        if (state === 'normal') await page.mouse.move(0, 0); else await button.hover();
        if (state === 'pressed') await page.mouse.down();
        let sample;
        try { await page.waitForTimeout(250); sample = await button.evaluate(readContrast); }
        finally { if (state === 'pressed') { await page.mouse.move(0, 0); await page.mouse.up(); } }
        rows.push({ theme, variant, state, ...sample, pass: !sample.unsupported.length && sample.textContrast >= sample.textThreshold });
      }
    }
    // Read the danger foreground on a page text node using the existing role.
    const text = page.locator('[data-demo="variants"] [data-slot="button"]').first();
    await text.evaluate(button => {
      const label = document.createElement('span'); label.dataset.auditDangerForeground = '';
      label.className = 'text-destructive-foreground text-sm'; label.textContent = '危险操作辅助文字';
      button.parentElement.append(label);
    });
    let sample;
    try { sample = await page.locator('[data-audit-danger-foreground]').evaluate(readContrast); }
    finally { await page.locator('[data-audit-danger-foreground]').evaluate(label => label.remove()); }
    rows.push({ theme, variant: 'danger-foreground', state: 'normal', ...sample, pass: !sample.unsupported.length && sample.textContrast >= sample.textThreshold });
  }
  return rows;
}
export async function probeFixedReserves(page, baseURL, { width = 1280 } = {}) {
  const priorViewport = page.viewportSize(); await page.setViewportSize({ width, height: 900 });
  const rows = [];
  try {
    for (const [component, controlSelector, iconSelector] of [
      ['date-picker', '[data-demo="basic"] [data-slot="date-picker-trigger"]', '[data-demo="basic"] [data-slot="date-picker-clear"]'],
      ['native-select', '[data-demo="sizes"] [data-slot="native-select-control"][data-size="sm"] select', '[data-demo="sizes"] [data-slot="native-select-control"][data-size="sm"] [data-slot="native-select-icon"]'],
      ['combobox', '[data-demo="clear"] input', '[data-demo="clear"] [data-slot="combobox-clear"] svg'],
    ]) {
      await visit(page, baseURL, component);
      const oldStyle = await page.evaluate(() => document.documentElement.getAttribute('style'));
      const states = [];
      try {
        for (const space of [4, 2]) {
          await page.evaluate(space => document.documentElement.style.setProperty('--qy-space-1', `${space}px`), space);
          const sample = await page.evaluate(({ controlSelector, iconSelector }) => {
            const control = document.querySelector(controlSelector), icon = document.querySelector(iconSelector);
            if (!control || !icon) return { missing: { control: !control, icon: !icon } };
            const r = control.getBoundingClientRect(), i = icon.getBoundingClientRect(), s = getComputedStyle(control);
            const padding = parseFloat(s.paddingInlineEnd), border = parseFloat(s.borderRightWidth), contentRight = r.right - border - padding;
            return { padding, border, contentRight, control: { left: r.left, right: r.right, height: r.height, width: r.width }, icon: { left: i.left, right: i.right, width: i.width, height: i.height }, gapToIcon: i.left - contentRight, pointer: matchMedia('(pointer:coarse)').matches ? 'coarse' : 'fine' };
          }, { controlSelector, iconSelector });
          states.push({ space, ...sample });
        }
      } finally { await page.evaluate(style => style === null ? document.documentElement.removeAttribute('style') : document.documentElement.setAttribute('style', style), oldStyle); }
      rows.push({ component, width, states, pass: states.every(s => !s.missing && s.gapToIcon >= -0.5) && states[0].icon.width === states[1].icon.width && states[0].control.height === states[1].control.height });
    }
  } finally { if (priorViewport) await page.setViewportSize(priorViewport); }
  return rows;
}
export async function probeInputTypography(page, baseURL, { width = 1280, theme = 'light' } = {}) {
  const prior = page.viewportSize(); await page.setViewportSize({ width, height: 900 });
  const rows = [];
  try {
    for (const [component, selector, parts] of [
      ['input', '[data-demo="default"] [data-slot="input-control"]', [['wrapper', null], ['inner', 'input']]],
      ['select', '[data-demo="basic"] [data-slot="select-trigger"]', [['trigger', null], ['value', '[data-slot="select-value"]']]],
      ['input-group', '[data-demo="icon"] [data-slot="input-group"]', [['wrapper', null], ['addon', '[data-slot="input-group-addon"]'], ['inner', 'input']]],
    ]) {
      await visit(page, baseURL, component, theme);
      const samples = await page.locator(selector).first().evaluate((wrapper, parts) => {
        const canvas = new OffscreenCanvas(1, 1), ctx = canvas.getContext('2d', { willReadFrequently: true });
        const rgba = color => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data]; };
        const root = getComputedStyle(document.documentElement);
        const foreground = rgba(root.getPropertyValue('--foreground').trim());
        const borderInput = rgba(root.getPropertyValue('--input').trim());
        return parts.map(([part, selector]) => {
          const element = selector ? wrapper.querySelector(selector) : wrapper;
          if (!element) return { part, missing: true };
          const s = getComputedStyle(element), parent = getComputedStyle(element.parentElement);
          return { part, fontSize: s.fontSize, lineHeight: s.lineHeight, color: s.color, rgba: rgba(s.color), foreground, borderInput, parentColor: parent.color, parentRGBA: rgba(parent.color), height: element.getBoundingClientRect().height };
        });
      }, parts);
      const expectedSize = width >= 640 ? 14 : 16;
      const expectedLeading = width >= 640 ? 20 : 24;
      const failures = samples.filter(x => x.missing || parseFloat(x.fontSize) !== expectedSize || (x.part !== 'inner' && parseFloat(x.lineHeight) !== expectedLeading) || (x.part !== 'addon' && JSON.stringify(x.rgba) !== JSON.stringify(x.foreground))).map(x => x.part);
      rows.push({ component, width, theme, expectedSize, expectedLeading, samples, failures, pass: failures.length === 0 });
    }
  } finally { if (prior) await page.setViewportSize(prior); }
  return rows;
}
