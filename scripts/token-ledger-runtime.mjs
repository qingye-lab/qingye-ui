import { PROBES } from './lib/token-ledger-probes.mjs';
import { computeLedger, saveLedger } from './token-ledger.mjs';
import { generateStaticLedger } from './lib/token-ledger-static.mjs';

export const DEFAULT_MODES = [
  { theme: 'light', viewport: 'desktop', width: 1100, height: 900 },
  { theme: 'dark', viewport: 'desktop', width: 1100, height: 900 }
];
export function isExpectedTheme(evidence, requested, attribute) {
  const opposite = requested === 'dark' ? 'light' : 'dark';
  const hasClass = evidence.classes.includes(requested);
  const hasOpposite = evidence.classes.includes(opposite);
  const attributeMatches = evidence.dataTheme === requested;
  const attributeConflicts = evidence.dataTheme !== null && evidence.dataTheme !== requested;
  return evidence.colorScheme === requested && !hasOpposite && !attributeConflicts && (attribute === 'class' ? hasClass : attributeMatches);
}
const themeSnapshot = () => ({ classes: [...document.documentElement.classList], dataTheme: document.documentElement.getAttribute('data-theme'), colorScheme: document.documentElement.style.colorScheme });

async function activate(page, probe) {
  if (probe.action === 'select-table-row') {
    await page.locator(`[data-demo="${probe.demo}"] tbody [role="checkbox"]`).first().click();
    await page.locator(probe.selector).first().waitFor({ state: 'visible' });
  }
  if (probe.action === 'open-dialog') {
    await page.locator(`[data-demo="${probe.demo}"] [data-slot="dialog-trigger"]`).first().click();
    await page.locator('[data-slot="dialog-popup"]').first().waitFor({ state: 'visible' });
  }
  if (['open-select', 'highlight-select'].includes(probe.action)) {
    await page.locator(`[data-demo="${probe.demo}"] [data-slot="select-trigger"]`).first().click();
    await page.locator('[data-slot="select-popup"]').first().waitFor({ state: 'visible' });
    if (probe.action === 'highlight-select') {
      // Mouse hover verifies the actual Base UI highlighted state without global
      // keyboard motion suppression changing unrelated computed values.
      await page.locator('[data-slot="select-item"]').first().hover();
      await page.locator(probe.selector).first().waitFor({ state: 'visible' });
    }
  }
  if (probe.action === 'invalid-input') await page.locator(`[data-demo="${probe.demo}"] [data-slot="input"]`).first().evaluate((input) => input.setAttribute('aria-invalid', 'true'));
}
async function snapshot(page, probe) {
  return page.locator(probe.selector).first().evaluate((element, data) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return { properties: Object.fromEntries(data.properties.map((property) => [property, style.getPropertyValue(property)])), token: style.getPropertyValue(data.token).trim(), rootToken: getComputedStyle(document.documentElement).getPropertyValue(data.token).trim(), rect: { width: rect.width, height: rect.height }, tag: element.tagName, slot: element.getAttribute('data-slot'), attributes: Object.fromEntries([...element.attributes].filter((attribute) => attribute.name.startsWith('data-') || attribute.name.startsWith('aria-')).map((attribute) => [attribute.name, attribute.value])), pointer: matchMedia('(pointer: coarse)').matches ? 'coarse' : 'fine' };
  }, probe);
}

// The caller owns the only browser/context/page and its lifecycle. This module
// never imports Playwright, launches a browser, opens a tab, or creates a context.
// Call serially after the docs server is ready. save:false returns data for review.
export async function runTokenLedgerProbe(page, { ledger, baseURL = 'http://localhost:5180', modes = DEFAULT_MODES, probeIds, themeAttribute = 'class', save = true, onProgress = () => {} } = {}) {
  if (!page || typeof page.goto !== 'function' || !ledger?.static?.fingerprint?.sha256) throw new Error('Existing page and generated ledger.static are required');
  if (generateStaticLedger().fingerprint.sha256 !== ledger.static.fingerprint.sha256) throw new Error('Static ledger is stale; regenerate before measuring');
  const observations = [];
  if (modes.some(mode => mode.width < 1024)) throw new Error('This delivery verifier is scoped to desktop widths >=1024.');
  const plan = probeIds ? PROBES.filter((probe) => probeIds.includes(probe.id)) : PROBES;
  if (probeIds?.some((id) => !PROBES.some((probe) => probe.id === id))) throw new Error('Unknown probe id');
  const originalURL = page.url();
  const originalViewport = page.viewportSize();
  let activeMutation = null;
  // 每个探针都要导航到 playground 并注入一次根变量。浏览器在这个长序列里到达第 21 个
  // 探针前后会断开（隔离运行同样探针正常，说明不是某个探针本身的问题，而是同一页面
  // 反复导航累积的会话资源）。这里每隔若干探针重载一次当前文档：重载是幂等的——
  // 探针只读计算样式，不留任何跨探针状态——因此不会改变任何被测量的值。
  const RECYCLE_EVERY = 8;
  let sinceRecycle = 0;
  const recycle = async () => {
    await page.goto('about:blank', { waitUntil: 'domcontentloaded', timeout: 15000 });
    sinceRecycle = 0;
  };
  try {
    for (const mode of modes) {
      await page.setViewportSize({ width: mode.width, height: mode.height });
      const contextPointer = await page.evaluate(() => matchMedia('(pointer: coarse)').matches ? 'coarse' : 'fine');
      for (const probe of plan) {
        if (probe.themes && !probe.themes.includes(mode.theme)) continue;
        if (probe.viewports && !probe.viewports.includes(mode.viewport)) continue;
        if (sinceRecycle >= RECYCLE_EVERY) await recycle();
        sinceRecycle += 1;
        const observation = { id: `${probe.id}:${mode.theme}:${mode.viewport}:${mode.width}x${mode.height}:${contextPointer}`, pointer: contextPointer, probeId: probe.id, token: probe.token, sourceComponent: probe.sourceComponent, publicName: probe.sourceComponent === 'card' ? 'Card' : probe.sourceComponent[0].toUpperCase() + probe.sourceComponent.slice(1), part: probe.part, selector: probe.selector, state: probe.state, theme: mode.theme, viewport: mode.viewport, size: { width: mode.width, height: mode.height }, route: `/playground/${probe.sourceComponent}`, override: probe.override, measuredAt: new Date().toISOString(), observation: 'NOT_OBSERVED', validOverride: false };
        if (probe.pointer && contextPointer !== probe.pointer) {
          observation.skipReason = `Required pointer=${probe.pointer}; existing context reports ${contextPointer}. Skipped before navigation.`;
          observations.push(observation);
          await onProgress({ completed: observations.length, observation });
          continue;
        }
        try {
          await page.goto(`${baseURL}${observation.route}?theme=${mode.theme}`, { waitUntil: 'networkidle', timeout: 30000 });
          await page.locator(`[data-demo="${probe.demo}"]`).waitFor({ state: 'visible', timeout: 15000 });
          await page.waitForFunction(({ theme, attribute }) => {
            const root = document.documentElement;
            const opposite = theme === 'dark' ? 'light' : 'dark';
            const dataTheme = root.getAttribute('data-theme');
            return root.style.colorScheme === theme && !root.classList.contains(opposite) && (dataTheme === null || dataTheme === theme) && (attribute === 'class' ? root.classList.contains(theme) : dataTheme === theme);
          }, { theme: mode.theme, attribute: themeAttribute }, { timeout: 10000 });
          observation.themeEvidence = { attribute: themeAttribute, ...await page.evaluate(themeSnapshot) };
          if (!isExpectedTheme(observation.themeEvidence, mode.theme, themeAttribute)) throw new Error('Conflicting theme markers');
          await activate(page, probe);
          await page.locator(probe.selector).first().waitFor({ state: 'visible', timeout: 10000 });
          await page.waitForTimeout(400);
          const before = await snapshot(page, probe);
          observation.pointer = before.pointer;
          observation.id = `${probe.id}:${mode.theme}:${mode.viewport}:${mode.width}x${mode.height}:${before.pointer}`;
          if (probe.pointer && before.pointer !== probe.pointer) {
            observation.skipReason = `Required pointer=${probe.pointer}; existing context reports ${before.pointer}. No replacement context was launched.`;
          } else {
            activeMutation = await page.evaluate(({ token, override }) => {
              const root = document.documentElement;
              const previous = { token, value: root.style.getPropertyValue(token), priority: root.style.getPropertyPriority(token) };
              root.style.setProperty(token, override, 'important');
              return previous;
            }, probe);
            await page.waitForTimeout(400);
            const after = await snapshot(page, probe);
            observation.before = before;
            observation.after = after;
            observation.validOverride = before.rootToken !== after.rootToken && before.token !== after.token;
            observation.changedProperties = probe.properties.filter((property) => before.properties[property] !== after.properties[property]);
            observation.observation = observation.changedProperties.length ? 'OBSERVED_CHANGE' : 'OBSERVED_NO_CHANGE';
          }
        } catch (error) {
          observation.error = error.message;
          observation.observation = 'NOT_OBSERVED';
        } finally {
          if (activeMutation) {
            await page.evaluate(({ token, value, priority }) => { if (value) document.documentElement.style.setProperty(token, value, priority); else document.documentElement.style.removeProperty(token); }, activeMutation);
            activeMutation = null;
          }
        }
        observations.push(observation);
        await onProgress({ completed: observations.length, observation });
      }
    }
  } finally {
    if (originalViewport) await page.setViewportSize(originalViewport);
    if (originalURL && originalURL !== 'about:blank') await page.goto(originalURL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }
  // A subset run replaces only those exact cases. Stale runs are never mixed.
  const previous = ledger.runtime?.fingerprint === ledger.static.fingerprint.sha256 ? ledger.runtime.observations || [] : [];
  const ids = new Set(observations.map((entry) => entry.id));
  const runtime = { fingerprint: ledger.static.fingerprint.sha256, measuredAt: new Date().toISOString(), browser: { userAgent: await page.evaluate(() => navigator.userAgent), owner: 'caller-provided page' }, observations: [...previous.filter((entry) => !ids.has(entry.id)), ...observations], status: 'OBSERVED', method: 'Root inline important custom-property override; computed styles and geometry on real existing rendered parts; value restored after each probe.' };
  const currentStatic = generateStaticLedger();
  const result = { ...ledger, static: currentStatic, runtime, computation: computeLedger(currentStatic, runtime) };
  if (save) saveLedger(result);
  return result;
}
