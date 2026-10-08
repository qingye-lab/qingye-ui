// Built current components and simple compositions; one browser and one page.
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { withBrowser, closeWithTimeout } from './browser-runtime.mjs';
import { measureTextContrast } from './lib/browser-contrast.mjs';

const base = process.env.DOCS_URL ?? 'http://127.0.0.1:5181';
const out = resolve('test-results/task-patterns');
mkdirSync(out, { recursive: true });
const report = { startedAt: new Date().toISOString(), base, cases: [], errors: [], limitations: ['Current public component demos; no backend or business-task fixtures.', 'Desktop keyboard and viewport checks do not verify physical touch, Chinese IME, or screen-reader speech.', 'CSS text-role doubling is a capacity probe; native browser 200% zoom/text resize and assistive technology remain unverified.'] };
const check = (name, evidence) => { report.cases.push({ name, status: 'PASS', evidence }); console.log(`PASS ${name}`); };
function errorStacks(error, seen = new Set()) {
  if (seen.has(error)) return [];
  seen.add(error);
  return [error?.stack ?? error?.message ?? String(error),
    ...Array.from(error?.errors ?? []).flatMap(cause => errorStacks(cause, seen)),
    ...(error?.cause ? errorStacks(error.cause, seen) : []),
  ];
}
// Capture content and form facts before typography overrides. Whitespace may
// reflow; words, action names, values, selected options and disabled states may
// not disappear or change as a consequence of layout.
function snapshotTask(root) {
  const normalize = text => (text ?? '').replace(/\s+/g, ' ').trim();
  return {
    text: normalize(root.innerText),
    controls: [...root.querySelectorAll('input,textarea,select,button,a[href]')].map(element => ({
      tag: element.tagName, type: element.getAttribute('type'), name: normalize(element.getAttribute('aria-label') ?? element.textContent),
      value: 'value' in element ? element.value : null, checked: 'checked' in element ? element.checked : null,
      disabled: 'disabled' in element ? element.disabled : null, href: element.getAttribute('href'),
    })),
    rows: root.querySelectorAll('tbody tr').length,
    paragraphs: root.querySelectorAll('article p').length,
    files: [...root.querySelectorAll('[data-slot="file-upload-item"]')].map(element => normalize(element.textContent)),
  };
}

// CSS text roles scale from each element's original computed font and numeric
// line-height together, preserving their proportion without compounding nested
// inheritance. This is a capacity probe, not native browser text resize or zoom.
function setTypography(root, mode) {
  const originals = [root, ...root.querySelectorAll('*')].map(element => {
    const computed = getComputedStyle(element), leading = parseFloat(computed.lineHeight);
    return { element, style: element.getAttribute('style'), font: parseFloat(computed.fontSize), lineHeight: computed.lineHeight, leading: Number.isFinite(leading) ? leading : null };
  });
  root.__taskTypographyOriginals = originals;
  for (const { element, font, leading } of originals) {
    if (mode.scale === 2) {
      element.style.setProperty('font-size', `${font * 2}px`, 'important');
      if (leading !== null) element.style.setProperty('line-height', `${leading * 2}px`, 'important');
    }
    if (mode.spacing) {
      element.style.setProperty('line-height', '1.5', 'important');
      element.style.setProperty('letter-spacing', '0.12em', 'important');
      element.style.setProperty('word-spacing', '0.16em', 'important');
      if (element.tagName === 'P') element.style.setProperty('margin-block-end', '2em', 'important');
    }
  }
  const textElements = originals.filter(({ element }) => [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()));
  const scaleFailures = mode.scale === 2 ? textElements.filter(({ element, font }) => !Number.isFinite(parseFloat(getComputedStyle(element).fontSize)) || Math.abs(parseFloat(getComputedStyle(element).fontSize) - font * 2) > 0.1).map(({ element }) => element.outerHTML.slice(0, 180)) : [];
  const leadingScaleFailures = mode.scale === 2 ? textElements.filter(({ element, leading }) => leading !== null && (!Number.isFinite(parseFloat(getComputedStyle(element).lineHeight)) || Math.abs(parseFloat(getComputedStyle(element).lineHeight) - leading * 2) > 0.1)).map(({ element, lineHeight }) => ({ element: element.outerHTML.slice(0, 180), original: lineHeight, actual: getComputedStyle(element).lineHeight })) : [];
  const spacingFailures = mode.spacing ? textElements.filter(({ element }) => {
    const computed = getComputedStyle(element), size = parseFloat(computed.fontSize);
    return Math.abs(parseFloat(computed.lineHeight) / size - 1.5) > 0.02 || Math.abs(parseFloat(computed.letterSpacing) / size - 0.12) > 0.01 || Math.abs(parseFloat(computed.wordSpacing) / size - 0.16) > 0.01;
  }).map(({ element }) => element.outerHTML.slice(0, 180)) : [];
  if (mode.spacing) for (const { element } of originals) {
    if (element.tagName === 'P' && Math.abs(parseFloat(getComputedStyle(element).marginBlockEnd) / parseFloat(getComputedStyle(element).fontSize) - 2) > 0.01) spacingFailures.push(element.outerHTML.slice(0, 180));
  }
  return { textElements: textElements.length, scaleFailures, leadingScaleFailures, spacingFailures, scope: 'task subtree', scale: mode.scale, spacing: mode.spacing, scaleMethod: mode.scale === 2 ? 'CSS font-size and numeric computed line-height doubled together; normal line-height retained.' : 'Independent text spacing override; font-size is unchanged.', nonNumericLeading: textElements.filter(({ leading }) => leading === null).map(({ element, lineHeight }) => ({ element: element.outerHTML.slice(0, 180), original: lineHeight })) };
}

function restoreTypography(root) {
  for (const { element, style } of root.__taskTypographyOriginals ?? []) {
    if (style === null) element.removeAttribute('style'); else element.setAttribute('style', style);
  }
  delete root.__taskTypographyOriginals;
}

// Check paint clipping, rather than trusting textContent or scrollWidth alone.
// Within the recipe, only Table's horizontal container and the reading
// article's vertical container may expose content by local scrolling. Normal
// document scrolling remains available for the page's vertical flow.
function inspectTaskGeometry(root) {
  const failures = [], scrollEvidence = [];
  const describe = element => `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}${element.dataset.slot ? `[data-slot=${element.dataset.slot}]` : ''}`;
  const visible = element => {
    for (let ancestor = element; ancestor; ancestor = ancestor.parentElement) {
      const style = getComputedStyle(ancestor);
      if (style.display === 'none' || ['hidden', 'collapse'].includes(style.visibility) || Number(style.opacity) === 0 || ancestor.hidden) return false;
      if (ancestor.classList.contains('sr-only') || ancestor.getAttribute('aria-hidden') === 'true') return false;
      if (ancestor.tagName === 'DETAILS' && !ancestor.open) {
        const summary = ancestor.querySelector(':scope > summary');
        if (!summary?.contains(element)) return false;
      }
    }
    return element.getClientRects().length > 0;
  };
  const bounds = element => {
    const rect = element.getBoundingClientRect();
    return { left: rect.left + element.clientLeft, top: rect.top + element.clientTop, right: rect.left + element.clientLeft + element.clientWidth, bottom: rect.top + element.clientTop + element.clientHeight };
  };
  const clips = overflow => ['hidden', 'clip', 'auto', 'scroll'].includes(overflow);
  const knownX = element => element.matches('[data-slot="table-container"]') && element.scrollWidth > element.clientWidth + 2;
  const knownY = element => element.matches('.qy-reading-scroll') && element.scrollHeight > element.clientHeight + 2;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node, textNodes = 0;
  while ((node = walker.nextNode())) {
    if (!node.textContent.trim() || !visible(node.parentElement)) continue;
    textNodes += 1;
    const range = document.createRange(); range.selectNodeContents(node);
    for (const rect of range.getClientRects()) {
      if (!rect.width || !rect.height) continue;
      let canScrollX = false, canScrollY = false;
      for (let ancestor = node.parentElement; ancestor; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor), box = bounds(ancestor);
        canScrollX ||= knownX(ancestor); canScrollY ||= knownY(ancestor) || ancestor === document.scrollingElement;
        if (!canScrollX && clips(style.overflowX) && ancestor.clientWidth && (rect.left < box.left - 2 || rect.right > box.right + 2)) failures.push({ kind: 'clipped-text-x', text: node.textContent.trim(), owner: describe(ancestor), rect: { left: rect.left, right: rect.right }, box });
        if (!canScrollY && clips(style.overflowY) && ancestor.clientHeight && (rect.top < box.top - 2 || rect.bottom > box.bottom + 2)) failures.push({ kind: 'clipped-text-y', text: node.textContent.trim(), owner: describe(ancestor), rect: { top: rect.top, bottom: rect.bottom }, box });
      }
    }
  }

  const edgeVisible = (element, container, edge, axis) => {
    const glyphs = document.createTreeWalker(element, NodeFilter.SHOW_TEXT); let text; while ((text = glyphs.nextNode()) && !text.textContent.trim()) {}
    if (!text) { failures.push({ kind: 'missing-scroll-edge-text', owner: describe(element) }); return; }
    const trimmed = text.textContent;
    const index = edge === 'first' ? trimmed.search(/\S/) : trimmed.search(/\S\s*$/);
    const range = document.createRange(); range.setStart(text, index); range.setEnd(text, index + 1);
    // A wide final column can contain left-aligned text before the maximum
    // scroll position. Reach the glyph itself rather than assuming max scroll
    // makes every final-column label visible.
    let rect = range.getBoundingClientRect();
    const box = bounds(container);
    if (axis === 'x') {
      if (rect.left < box.left) container.scrollLeft += rect.left - box.left;
      else if (rect.right > box.right) container.scrollLeft += rect.right - box.right;
      rect = range.getBoundingClientRect();
    }
    if (axis === 'x' ? rect.left < box.left - 2 || rect.right > box.right + 2 : rect.top < box.top - 2 || rect.bottom > box.bottom + 2) failures.push({ kind: 'unreachable-scroll-edge', owner: describe(container), edge, axis, text: text.textContent.trim(), rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom }, box });
  };
  for (const container of root.querySelectorAll('[data-slot="table-container"]')) {
    const headers = [...container.querySelectorAll('thead th')];
    if (!headers.length) { failures.push({ kind: 'missing-table-headers' }); continue; }
    container.scrollLeft = 0; edgeVisible(headers[0], container, 'first', 'x');
    container.scrollLeft = container.scrollWidth; edgeVisible(headers.at(-1), container, 'last', 'x');
    scrollEvidence.push({ owner: 'table-container', clientWidth: container.clientWidth, scrollWidth: container.scrollWidth, reached: container.scrollLeft, headers: headers.map(header => header.textContent.trim()), rows: container.querySelectorAll('tbody tr').length });
    container.scrollLeft = 0;
  }
  for (const container of root.querySelectorAll('.qy-reading-scroll')) {
    const paragraphs = container.querySelectorAll('article > p');
    container.scrollTop = 0; edgeVisible(paragraphs[0], container, 'first', 'y');
    container.scrollTop = container.scrollHeight; edgeVisible(paragraphs[paragraphs.length - 1], container, 'last', 'y');
    scrollEvidence.push({ owner: 'reading-scroll', clientHeight: container.clientHeight, scrollHeight: container.scrollHeight, reached: container.scrollTop, paragraphs: container.querySelectorAll('article p').length });
    container.scrollTop = 0;
  }

  let actions = 0;
  for (const element of root.querySelectorAll('button,a[href],input:not([type="hidden"]),textarea,select,[role="checkbox"],summary')) {
    if (!visible(element)) continue;
    actions += 1;
    element.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
    const rect = element.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) failures.push({ kind: 'missing-action-target', owner: describe(element), text: element.textContent.trim() });
    if (rect.left < -2 || rect.right > innerWidth + 2) failures.push({ kind: 'action-outside-viewport', owner: describe(element), text: element.textContent.trim(), rect: { left: rect.left, right: rect.right }, viewport: innerWidth });
    if (!element.disabled && getComputedStyle(element).pointerEvents !== 'none') {
      const hit = document.elementFromPoint(Math.min(innerWidth - 1, Math.max(1, rect.left + rect.width / 2)), Math.min(innerHeight - 1, Math.max(1, rect.top + rect.height / 2)));
      if (!hit || !(hit === element || element.contains(hit))) failures.push({ kind: 'action-covered', owner: describe(element), text: element.textContent.trim(), hit: hit ? describe(hit) : null });
    }
  }
  return { viewport: innerWidth, documentWidth: document.documentElement.scrollWidth, textNodes, actions, scrollEvidence, failures };
}
try {
  await withBrowser(async (browser, lifecycle) => {
    report.lifecycle = lifecycle;
    const context = await browser.newContext({ viewport: { width: 1100, height: 1000 }, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage(); page.setDefaultTimeout(10000);
      page.on('pageerror', error => report.errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
      const open = async (slug, demo = 'task', theme = 'light') => {
        await page.goto(`${base}/playground/${slug}?theme=${theme}`, { waitUntil: 'networkidle' });
        const region = page.locator(`[data-playground] [data-demo="${demo}"]`); await region.waitFor(); return region;
      };
      let region = await open('filter-bar');
      const draft = region.getByRole('textbox', { name: '名称包含', exact: true });
      const filterTarget = await region.locator('ul > li').first().innerText();
      await draft.fill(filterTarget);
      assert.equal(await region.locator('ul > li').count(), 3, 'Draft alone does not change applied results');
      await region.locator('[data-slot="filter-bar-apply"]').click();
      await region.locator('[data-slot="filter-bar"][data-state="applied"]').waitFor({ state: 'attached' });
      assert.equal(await region.locator('ul > li').count(), 1);
      await draft.fill('未应用文字'); await region.locator('[data-slot="filter-bar-cancel"]').click();
      await region.locator('[data-slot="filter-bar"][data-state="applied"]').waitFor({ state: 'attached' });
      assert.equal(await draft.inputValue(), filterTarget);
      assert.equal(await region.locator('ul > li').count(), 1);
      await region.locator('[data-slot="filter-bar-clear"]').click();
      await page.waitForFunction(element => element?.value === '', await draft.elementHandle());
      assert.equal(await draft.inputValue(), ''); assert.equal(await region.locator('ul > li').count(), 3);
      check('Filter draft/apply/cancel/clear', 'Actual local results change only on explicit apply or clear');

      region = await open('tabs');
      const tabDraft = region.getByRole('textbox', { name: '名称草稿', exact: true });
      await tabDraft.fill('保留输入');
      const retainedPanelId = await tabDraft.evaluate(element => element.closest('[role="tabpanel"]').id);
      assert.ok(retainedPanelId, 'The retained panel must have a real id');
      await region.getByRole('tab', { name: '事实', exact: true }).click();
      // Base UI sets hidden when the outgoing panel's transition completes.
      // Wait for that owning fact, then keep the accessible-role exclusion check.
      await page.waitForFunction(id => document.getElementById(id)?.hidden === true, retainedPanelId);
      assert.equal(await region.getByRole('textbox', { name: '名称草稿', exact: true }).count(), 0);
      await region.getByRole('tab', { name: '名称', exact: true }).click();
      await tabDraft.waitFor({ state: 'visible' });
      assert.equal(await region.getByRole('textbox', { name: '名称草稿', exact: true }).inputValue(), '保留输入');
      await region.getByRole('tab', { name: '名称', exact: true }).focus(); await page.keyboard.press('End');
      const disabledTab = region.getByRole('tab', { name: '历史', exact: true });
      assert.equal(await disabledTab.getAttribute('aria-disabled'), 'true');
      assert.equal(await disabledTab.evaluate(element => element === document.activeElement && element.matches(':focus-visible')), true, 'Disabled tab remains discoverable by keyboard');
      await page.keyboard.press('Enter');
      assert.equal(await disabledTab.getAttribute('aria-selected'), 'false', 'Disabled tab cannot activate');
      assert.equal(await region.getByRole('tab', { name: '名称', exact: true }).getAttribute('aria-selected'), 'true');
      assert.equal(await tabDraft.inputValue(), '保留输入');
      await page.keyboard.press('Home');
      assert.equal(await region.getByRole('tab', { name: '名称', exact: true }).evaluate(element => element === document.activeElement && element.matches(':focus-visible')), true);
      check('Tabs hidden panel retains draft and disabled boundary', 'Only active panel is accessible; disabled tab is focusable but cannot activate');

      region = await open('tree');
      await region.getByRole('treeitem', { name: '通知', exact: true }).focus(); await page.keyboard.press('ArrowDown');
      assert.equal(await region.getByRole('treeitem', { name: '成员', exact: true }).evaluate(element => element === document.activeElement), true);
      await page.keyboard.press('Enter'); await region.getByText('已选：成员', { exact: true }).waitFor();
      await region.getByRole('treeitem', { name: '设置', exact: true }).focus(); await page.keyboard.press('ArrowLeft');
      await region.getByRole('treeitem', { name: '通知', exact: true }).waitFor({ state: 'hidden' });
      assert.equal(await region.getByRole('treeitem', { name: '通知', exact: true }).count(), 0);
      await page.keyboard.press('ArrowRight'); await region.getByRole('treeitem', { name: '通知', exact: true }).waitFor();
      check('Tree expansion, selection and disabled item', 'Keyboard selection names stable id; collapse hides children');

      region = await open('bulk-action-bar');
      await region.getByRole('checkbox').nth(1).check();
      await region.getByRole('button', { name: '标记', exact: true }).click();
      await region.getByText('已标记 2 项', { exact: true }).waitFor();
      assert.ok((await region.locator('[data-slot="bulk-action-bar-targets"]').innerText()).includes('版本 2'));
      await region.locator('[data-slot="bulk-action-bar-clear"]').click();
      await region.locator('[data-slot="bulk-action-bar-action"]:disabled').waitFor({ state: 'attached' });
      assert.equal(await region.getByRole('button', { name: '标记', exact: true }).isDisabled(), true);
      check('Bulk action current target/version and empty scope', 'Explicit local action updates selected ids; cleared scope cannot execute');

      region = await open('data-table');
      const tableFacts = await region.locator('tbody tr').evaluateAll(rows => rows.map(row => ({ id: row.getAttribute('data-row-id'), value: Number(row.lastElementChild.textContent) })));
      assert.ok(tableFacts.every(row => row.id && Number.isFinite(row.value)), 'Sort uses named finite input facts');
      assert.ok(tableFacts.some(row => row.value === 0), 'Zero remains an actual sortable value');
      const selectedId = tableFacts[1].id;
      const selectedRow = region.locator(`tbody tr[data-row-id=${JSON.stringify(selectedId)}]`);
      const selectedLabel = await selectedRow.getByRole('rowheader').innerText();
      const selectedCheckbox = selectedRow.getByRole('checkbox');
      await selectedCheckbox.check();
      assert.ok((await region.locator('output').innerText()).includes(selectedLabel));
      await region.locator('[data-slot="data-table-sort-button"]').click();
      const ascending = [...tableFacts].sort((a, b) => a.value - b.value).map(row => row.id);
      await region.locator(`tbody tr:first-child[data-row-id=${JSON.stringify(ascending[0])}]`).waitFor({ state: 'visible' });
      assert.deepEqual(await region.locator('tbody tr').evaluateAll(rows => rows.map(row => row.getAttribute('data-row-id'))), ascending);
      assert.equal(await selectedCheckbox.isChecked(), true);
      await region.locator('[data-slot="data-table-sort-button"]').click();
      const descending = [...tableFacts].sort((a, b) => b.value - a.value).map(row => row.id);
      await region.locator(`tbody tr:first-child[data-row-id=${JSON.stringify(descending[0])}]`).waitFor({ state: 'visible' });
      assert.deepEqual(await region.locator('tbody tr').evaluateAll(rows => rows.map(row => row.getAttribute('data-row-id'))), descending);
      assert.equal(await selectedCheckbox.isChecked(), true);
      check('DataTable zero/sort/stable-id selection', 'Ascending then descending sorting preserves checked stable row');

      region = await open('form', 'error-and-reset');
      const field = region.getByRole('textbox');
      const defaultValue = await field.inputValue();
      const error = region.locator('[data-slot="field-error"]');
      const callerError = await error.innerText();
      assert.ok(callerError.trim(), 'The caller supplies a real error');
      await field.fill('保留错误草稿');
      await region.getByRole('button', { name: '提交', exact: true }).click();
      assert.equal(await field.inputValue(), '保留错误草稿'); assert.equal(await field.getAttribute('aria-invalid'), 'true');
      assert.equal(await error.innerText(), callerError);
      await region.getByRole('button', { name: '重置', exact: true }).click();
      await page.waitForFunction(([element, value]) => element?.value === value, [await field.elementHandle(), defaultValue]);
      check('Native canceled form submit/reset and explicit error', 'Canceled submit preserves input; platform reset restores default; caller invalid remains explicit');

      report.typography = [];
      for (const theme of ['light', 'dark']) for (const slug of ['input-group', 'tabs', 'filter-bar', 'bulk-action-bar', 'data-table', 'toolbar']) {
        region = await open(slug, slug === 'input-group' ? 'addon' : slug === 'toolbar' ? 'format' : 'task', theme);
        const before = await region.evaluate(snapshotTask);
        for (const mode of [{ scale: 2, spacing: false }, { scale: 1, spacing: true }]) {
          try {
            const applied = await region.evaluate(setTypography, mode);
            assert.deepEqual(applied.scaleFailures, [], `${slug}: CSS text-role font doubled`);
            assert.deepEqual(applied.leadingScaleFailures, [], `${slug}: CSS text-role numeric line-height doubled`);
            assert.deepEqual(applied.spacingFailures, [], `${slug}: actual text spacing`);
            assert.deepEqual(await region.evaluate(snapshotTask), before, `${slug}: words and field facts survive typography override`);
            const geometry = await region.evaluate(inspectTaskGeometry);
            assert.ok(geometry.documentWidth <= geometry.viewport + 2, `${slug}: page overflow after typography override`);
            assert.deepEqual(geometry.failures, [], `${slug}: clipped text or unreachable action`);
            const contrast = await region.evaluate(measureTextContrast);
            assert.deepEqual(contrast.failures, [], `${slug}: actual text contrast ${theme}`);
            report.typography.push({ slug, theme, mode, applied, geometry, contrast });
          } finally { await region.evaluate(restoreTypography); }
        }
      }
      check('Current composition typography, capacity and contrast', { cases: report.typography.length, width: 1100, boundary: 2 });
      assert.deepEqual(report.errors, [], 'Current composition runtime errors');
    } finally { await closeWithTimeout(context, 'current composition context'); }
  });
} catch (error) { report.errors.push(...errorStacks(error)); process.exitCode = 1; }
finally {
  report.completedAt = new Date().toISOString(); report.status = report.errors.length ? 'FAIL' : 'PASS';
  writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(join(out, 'report.json'));
}
