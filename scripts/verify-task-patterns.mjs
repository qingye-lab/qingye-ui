// Built docs: task behavior and public content, one browser and one active page.
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { withBrowser, closeWithTimeout } from './browser-runtime.mjs';
import { measureTextContrast } from './lib/browser-contrast.mjs';
import { fixtureSecretMarkers, projectResources } from '../apps/docs/test/fixtures/permissions.mjs';

const base = process.env.DOCS_URL ?? 'http://127.0.0.1:5181';
const out = resolve('test-results/task-patterns');
mkdirSync(out, { recursive: true });
const report = { startedAt: new Date().toISOString(), base, cases: [], errors: [], limitations: ['Deterministic application fixtures, no production backend.', 'Viewport and keyboard automation do not verify physical touch, Chinese IME, or screen reader output.', 'Visual direction remains deferred by user.'] };
const check = (name, evidence) => { report.cases.push({ name, status: 'PASS', evidence }); console.log(`PASS ${name}`); };
const restrictedTerms = [...fixtureSecretMarkers(), 'privateReview'];
const assertPublic = (text, boundary) => {
  for (const term of restrictedTerms) assert.ok(!text.includes(term), `${boundary} contains restricted fixture material: ${term}`);
};

// This is a build-output check, not a substitute for requesting the DTO or
// checking rendered (including hidden) DOM through the running docs preview.
function inspectBuiltProjection() {
  const directory = resolve('apps/docs/dist');
  assert.ok(existsSync(join(directory, 'index.html')), 'Build docs before running task-pattern verification');
  let count = 0, bytes = 0, scripts = 0;
  function visit(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const path = join(folder, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) {
        const content = readFileSync(path);
        for (const term of restrictedTerms) assert.ok(!content.includes(Buffer.from(term)), `Built file ${relative(directory, path)} contains restricted fixture material: ${term}`);
        count += 1; bytes += content.length;
        if (entry.name.endsWith('.js')) scripts += 1;
      }
    }
  }
  visit(directory);
  assert.ok(scripts > 0, 'Built bundle must contain JavaScript assets');
  const dto = JSON.parse(readFileSync(join(directory, 'authorized-resources.json'), 'utf8'));
  assert.deepEqual(dto, { visibility: 'public-projection', rows: projectResources() });
  return { directory, files: count, bytes, scripts, markers: restrictedTerms.length, dtoRows: dto.rows.length };
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

// Full text-size scaling is applied from each element's original computed
// size, so nested font inheritance cannot accidentally scale text four times.
// This deliberately does not use CSS zoom (which also scales geometry).
function setTypography(root, mode) {
  const originals = [root, ...root.querySelectorAll('*')].map(element => ({
    element, style: element.getAttribute('style'), font: parseFloat(getComputedStyle(element).fontSize),
  }));
  root.__taskTypographyOriginals = originals;
  for (const { element, font } of originals) {
    if (mode.scale === 2) element.style.setProperty('font-size', `${font * 2}px`, 'important');
    if (mode.spacing) {
      element.style.setProperty('line-height', '1.5', 'important');
      element.style.setProperty('letter-spacing', '0.12em', 'important');
      element.style.setProperty('word-spacing', '0.16em', 'important');
      if (element.tagName === 'P') element.style.setProperty('margin-block-end', '2em', 'important');
    }
  }
  const textElements = originals.filter(({ element }) => [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()));
  const scaleFailures = mode.scale === 2 ? textElements.filter(({ element, font }) => Math.abs(parseFloat(getComputedStyle(element).fontSize) - font * 2) > 0.1).map(({ element }) => element.outerHTML.slice(0, 180)) : [];
  const spacingFailures = mode.spacing ? textElements.filter(({ element }) => {
    const computed = getComputedStyle(element), size = parseFloat(computed.fontSize);
    return Math.abs(parseFloat(computed.lineHeight) / size - 1.5) > 0.02 || Math.abs(parseFloat(computed.letterSpacing) / size - 0.12) > 0.01 || Math.abs(parseFloat(computed.wordSpacing) / size - 0.16) > 0.01;
  }).map(({ element }) => element.outerHTML.slice(0, 180)) : [];
  if (mode.spacing) for (const { element } of originals) {
    if (element.tagName === 'P' && Math.abs(parseFloat(getComputedStyle(element).marginBlockEnd) / parseFloat(getComputedStyle(element).fontSize) - 2) > 0.01) spacingFailures.push(element.outerHTML.slice(0, 180));
  }
  return { textElements: textElements.length, scaleFailures, spacingFailures, scope: 'task subtree', scale: mode.scale, spacing: mode.spacing };
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
    const text = [...element.childNodes].find(child => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
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
  report.projectionBuild = inspectBuiltProjection();
  check('Authorized projection excludes restricted markers from every built file', report.projectionBuild);
  await withBrowser(async (browser, lifecycle) => {
    report.lifecycle = lifecycle;
    const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      const open = async (slug) => {
        await page.goto(`${base}/docs/patterns/${slug}`, { waitUntil: 'networkidle' });
        const region = page.locator(`[data-pattern="${slug.split('?')[0].split('/')[0]}"]`);
        await region.waitFor();
        return region;
      };
      const settings = async (region) => { await region.locator('summary').click(); };
      const expectText = async (region, text) => { await region.getByText(text, { exact: true }).first().waitFor(); };
      const readEdit = async () => page.evaluate(() => JSON.parse(sessionStorage.getItem('qingye-task:edit')));
      const waitEditState = async (key, value, timeout = 10000) => page.waitForFunction(({ key, value }) => {
        const state = JSON.parse(sessionStorage.getItem('qingye-task:edit') ?? 'null');
        return state?.[key] === value;
      }, { key, value }, { timeout });
      const freshEdit = async () => {
        // Unmount the previous instance before deleting session facts, so its
        // pending timers/effects cannot repopulate a supposedly fresh fixture.
        await open('collection');
        await page.evaluate(() => { sessionStorage.removeItem('qingye-task:edit'); sessionStorage.removeItem('qingye-task:edit-recovery'); });
        const region = await open('edit');
        await settings(region);
        return region;
      };
      const freshCollection = async () => {
        await page.evaluate(() => sessionStorage.removeItem('qingye-task:collection-selection'));
        return open('collection');
      };
      const titleField = region => region.getByRole('textbox', { name: '资料名称', exact: true });
      const bodyField = region => region.getByRole('textbox', { name: '观察正文', exact: true });
      const save = async region => {
        await region.getByRole('button', { name: '保存草稿', exact: true }).click();
        await expectText(region, '本次操作已完成');
        await waitEditState('status', 'success');
        return readEdit();
      };
      await page.goto(base, { waitUntil: 'networkidle' });
      await page.evaluate(() => sessionStorage.clear());
      let task = await open('edit');
      let edit;
      await bodyField(task).fill('缩窄前的未保存正文');
      await titleField(task).focus();
      await page.setViewportSize({ width: 320, height: 900 });
      assert.equal(await titleField(task).evaluate(el => el === document.activeElement), true);
      assert.equal(await bodyField(task).inputValue(), '缩窄前的未保存正文');
      await task.getByRole('button', { name: '保存草稿', exact: true }).click();
      await expectText(task, '请填写资料名称。');
      assert.equal(await bodyField(task).inputValue(), '缩窄前的未保存正文');
      await titleField(task).focus();
      assert.equal(await titleField(task).evaluate(el => el === document.activeElement), true);
      await page.setViewportSize({ width: 1280, height: 1000 });
      assert.equal(await titleField(task).evaluate(el => el === document.activeElement), true);
      check('P01 resize and field validation preserve the draft and reachable field focus', { widths: [320, 1280], body: '缩窄前的未保存正文' });
      await task.getByRole('textbox', { name: '资料名称', exact: true }).fill('编辑保留验收');
      await task.getByRole('textbox', { name: '观察正文', exact: true }).fill('当前输入不可被失败或过期结果清空。');
      await settings(task);
      await task.getByLabel('下次模拟响应').selectOption('failure');
      await task.getByRole('button', { name: '保存草稿', exact: true }).click();
      await expectText(task, '保存未完成');
      assert.equal(await task.getByRole('textbox', { name: '资料名称', exact: true }).inputValue(), '编辑保留验收');
      await task.getByLabel('下次模拟响应').selectOption('unknown');
      await task.getByRole('button', { name: '保存草稿', exact: true }).click();
      await expectText(task, '结果待核实');
      assert.equal(await task.getByRole('button', { name: '保存草稿', exact: true }).isDisabled(), true);
      await task.getByRole('button', { name: '核实原操作' }).click();
      await expectText(task, '本次操作已完成');
      await task.getByRole('textbox', { name: '观察正文', exact: true }).fill('放弃后仍可恢复');
      await task.getByRole('button', { name: '放弃这次修改' }).click();
      await page.getByRole('button', { name: '继续编辑', exact: true }).click();
      assert.equal(await task.getByRole('textbox', { name: '观察正文', exact: true }).inputValue(), '放弃后仍可恢复');
      await task.getByRole('button', { name: '放弃这次修改' }).click();
      await page.getByRole('button', { name: '放弃并保留草稿' }).click();
      await task.getByRole('button', { name: '恢复草稿', exact: true }).click();
      assert.equal(await task.getByRole('textbox', { name: '观察正文', exact: true }).inputValue(), '放弃后仍可恢复');
      await task.getByRole('link', { name: '返回资料集合' }).click();
      task = await open('edit');
      assert.equal(await task.getByRole('textbox', { name: '观察正文', exact: true }).inputValue(), '放弃后仍可恢复');
      check('P01 validation, failure and unknown are distinct; retry blocked until verification; abandon/recover/return preserve draft', 'Actual fields, dialogs, disabled state, session return');

      task = await freshEdit();
      assert.equal(await titleField(task).inputValue(), '');
      assert.equal(await bodyField(task).inputValue(), '');
      await expectText(task, '河岸的草木开始转黄，一条新踩出的路径穿过旧石阶。');
      assert.equal(await task.getByRole('button', { name: '采用这段示例', exact: true }).isEnabled(), true);
      assert.deepEqual((await readEdit()).draft, { title: '', body: '' });
      assert.deepEqual((await readEdit()).saved, { title: '', body: '' });
      await task.getByRole('button', { name: '切换为发布', exact: true }).click();
      await expectText(task, '发布会使资料进入可阅读状态；本示例只在当前浏览器模拟此结果。');
      assert.equal(await task.getByRole('button', { name: '保存草稿', exact: true }).count(), 0);
      await titleField(task).fill('明确发布动作验收');
      await bodyField(task).fill('作者自行写下的正文，没有自动采用示例。');
      await task.getByRole('button', { name: '发布资料', exact: true }).click();
      await expectText(task, '正在发布');
      await waitEditState('status', 'saving');
      const publishRequest = (await readEdit()).request;
      assert.equal(publishRequest.action, 'publish');
      assert.equal(publishRequest.objectId, 'field-note-01');
      assert.equal(publishRequest.draft.body, '作者自行写下的正文，没有自动采用示例。');
      await expectText(task, '本次操作已完成');
      await waitEditState('status', 'success');
      assert.equal((await readEdit()).undo.action, 'publish');
      assert.equal(await task.getByRole('button', { name: '撤销这次发布', exact: true }).isEnabled(), true);
      check('P01 blank initial authorship and explicit publication contract', { initialDraft: { title: '', body: '' }, exampleAutoAdopted: false, action: publishRequest.action, consequenceVisibleBeforeSubmit: true, undoName: '撤销这次发布' });

      for (const outcome of ['success', 'failure', 'unknown']) {
        task = await freshEdit();
        await task.getByLabel('下次模拟响应').selectOption(outcome);
        await titleField(task).fill(`在途输入 ${outcome}`);
        await bodyField(task).fill('请求提交时的正文。');
        await task.getByRole('button', { name: '保存草稿', exact: true }).click();
        await waitEditState('status', 'saving');
        const submitted = (await readEdit()).request;
        await bodyField(task).fill('等待结果期间继续写的正文。');
        assert.equal(await task.getByRole('button', { name: '保存草稿', exact: true }).isDisabled(), true);
        assert.equal(await task.getByRole('button', { name: '放弃这次修改', exact: true }).isDisabled(), true);
        await titleField(task).press('Enter');
        edit = await readEdit();
        assert.equal(edit.status, 'saving');
        assert.equal(edit.request.id, submitted.id);
        assert.equal(edit.request.revision, submitted.revision);
        assert.equal(edit.request.draft.body, '请求提交时的正文。');
        assert.ok(edit.revision > submitted.revision);
        await waitEditState('status', outcome);
        edit = await readEdit();
        assert.equal(edit.draft.body, '等待结果期间继续写的正文。');
        assert.equal(edit.saved.body, outcome === 'success' ? '请求提交时的正文。' : '');
        assert.equal(edit.ignoredResponses, 0);
        if (outcome === 'unknown') {
          assert.equal(await task.getByRole('button', { name: '保存草稿', exact: true }).isDisabled(), true);
          await task.getByLabel('当前编辑对象').selectOption('field-note-02');
          await waitEditState('objectId', 'field-note-02');
          await titleField(task).fill('B 未提交的草稿');
          await task.getByLabel('当前编辑对象').selectOption('field-note-01');
          await waitEditState('objectId', 'field-note-01');
          edit = await readEdit();
          assert.equal(edit.status, 'unknown'); assert.equal(edit.request.id, submitted.id);
          assert.equal(await task.getByRole('button', { name: '保存草稿', exact: true }).isDisabled(), true);
          assert.equal(await bodyField(task).isDisabled(), true);
          assert.equal(edit.objectDrafts['field-note-02'].draft.title, 'B 未提交的草稿');
          await task.getByRole('button', { name: '核实原操作', exact: true }).click();
          await waitEditState('status', 'success');
          edit = await readEdit();
          assert.equal(edit.saved.body, '请求提交时的正文。');
          assert.equal(edit.draft.body, '等待结果期间继续写的正文。');
          assert.equal(edit.objectDrafts['field-note-02'].saved.body, '');
        }
        check(`P01 pending input and ${outcome} preserve submitted identity and later draft`, { requestId: submitted.id, requestRevision: submitted.revision, finalSaved: edit.saved, finalDraft: edit.draft, duplicateSubmitBlocked: true, unknownCannotBypassViaObjectSwitch: outcome === 'unknown' });
      }

      task = await freshEdit();
      await titleField(task).fill('提交时有效的资料名称');
      await bodyField(task).fill('这是原请求的提交快照。');
      await task.getByRole('button', { name: '保存草稿', exact: true }).click();
      await waitEditState('status', 'saving');
      const validTitleRequest = (await readEdit()).request;
      await titleField(task).fill('');
      await task.locator('form').evaluate(form => form.requestSubmit());
      edit = await readEdit();
      assert.equal(edit.status, 'saving'); assert.equal(edit.request.id, validTitleRequest.id);
      assert.equal(edit.error, ''); assert.equal(edit.draft.title, '');
      await waitEditState('status', 'success');
      edit = await readEdit();
      assert.equal(edit.saved.title, '提交时有效的资料名称'); assert.equal(edit.draft.title, '');
      check('P01 empty later title cannot turn a second native submit intent into a failed pending request', { requestId: validTitleRequest.id, savedTitle: edit.saved.title, laterDraftTitle: edit.draft.title });

      task = await freshEdit();
      const aDraft = { title: '对象 A 的待保存资料', body: 'A 请求快照，只属于资料 A。' };
      const bSaved = { title: '对象 B 的资料', body: 'B 独立提交的正文。' };
      await titleField(task).fill(aDraft.title); await bodyField(task).fill(aDraft.body);
      const aRevision = (await readEdit()).revision;
      await task.getByRole('button', { name: '保存草稿', exact: true }).click();
      await expectText(task, '正在保存草稿');
      await waitEditState('status', 'saving');
      const aRequest = (await readEdit()).request;
      assert.equal(aRequest.action, 'save');
      assert.equal(aRequest.objectId, 'field-note-01');
      assert.equal(aRequest.revision, aRevision);
      await task.getByLabel('当前编辑对象').selectOption('field-note-02');
      await waitEditState('objectId', 'field-note-02');
      assert.equal(await titleField(task).inputValue(), '');
      assert.equal(await bodyField(task).inputValue(), '');
      assert.equal((await readEdit()).request, null);
      await titleField(task).fill(bSaved.title); await bodyField(task).fill(bSaved.body);
      await task.getByRole('button', { name: '保存草稿', exact: true }).click();
      await waitEditState('status', 'saving');
      const bRequest = (await readEdit()).request;
      assert.equal(bRequest.objectId, 'field-note-02');
      assert.notEqual(bRequest.id, aRequest.id);
      await expectText(task, '本次操作已完成');
      await waitEditState('status', 'success');
      await waitEditState('ignoredResponses', 1);
      edit = await readEdit();
      assert.equal(edit.objectId, 'field-note-02');
      assert.deepEqual(edit.saved, bSaved); assert.deepEqual(edit.draft, bSaved);
      assert.deepEqual(edit.objectDrafts['field-note-01'].draft, aDraft);
      assert.deepEqual(edit.objectDrafts['field-note-01'].saved, { title: '', body: '' });
      await bodyField(task).fill('B 保存后继续写的草稿。');
      await task.getByLabel('当前编辑对象').selectOption('field-note-01');
      await waitEditState('objectId', 'field-note-01');
      assert.equal(await titleField(task).inputValue(), aDraft.title);
      assert.equal(await bodyField(task).inputValue(), aDraft.body);
      edit = await readEdit();
      assert.deepEqual(edit.saved, { title: '', body: '' });
      assert.equal(edit.status, 'unknown'); assert.equal(edit.request.id, aRequest.id);
      assert.equal(await task.getByRole('button', { name: '保存草稿', exact: true }).isDisabled(), true);
      assert.deepEqual(edit.objectDrafts['field-note-02'].saved, bSaved);
      assert.equal(edit.objectDrafts['field-note-02'].draft.body, 'B 保存后继续写的草稿。');
      await task.getByRole('button', { name: '核实原操作', exact: true }).click();
      await waitEditState('status', 'success');
      assert.deepEqual((await readEdit()).saved, aDraft);
      assert.deepEqual((await readEdit()).objectDrafts['field-note-02'].saved, bSaved);
      await task.getByLabel('当前编辑对象').selectOption('field-note-02');
      await waitEditState('objectId', 'field-note-02');
      assert.equal(await bodyField(task).inputValue(), 'B 保存后继续写的草稿。');
      assert.deepEqual((await readEdit()).saved, bSaved);
      check('P01 old A response cannot save into B; A return requires verification and both drafts remain isolated', { aRequest, bRequest, ignoredResponses: edit.ignoredResponses, aSavedBeforeVerification: { title: '', body: '' }, aSavedAfterVerification: aDraft, bSaved, laterBDraft: 'B 保存后继续写的草稿。' });

      task = await freshEdit();
      const firstSaved = { title: '限时撤销验收', body: '版本一：操作前已保存的正文。' };
      await titleField(task).fill(firstSaved.title); await bodyField(task).fill(firstSaved.body);
      await save(task);
      await bodyField(task).fill('版本二：这次保存的正文。');
      const secondSaved = (await save(task)).saved;
      assert.deepEqual((await readEdit()).undo.before, firstSaved);
      await bodyField(task).fill('版本三：保存之后尚未提交的草稿。');
      await task.getByRole('button', { name: '撤销这次保存', exact: true }).click();
      await expectText(task, '正在撤销已保存操作');
      await waitEditState('undoStatus', 'pending');
      assert.deepEqual((await readEdit()).saved, secondSaved);
      assert.equal(await bodyField(task).isDisabled(), true);
      assert.equal(await task.getByLabel('当前编辑对象').isDisabled(), true);
      assert.equal((await readEdit()).objectId, 'field-note-01');
      await expectText(task, '撤销已完成');
      await waitEditState('undoStatus', 'success');
      edit = await readEdit();
      assert.deepEqual(edit.saved, firstSaved);
      assert.equal(edit.draft.body, '版本三：保存之后尚未提交的草稿。');
      assert.equal(await bodyField(task).inputValue(), edit.draft.body);
      check('P01 successful undo restores saved version without discarding subsequent draft', { before: firstSaved, undone: secondSaved, draft: edit.draft, pendingDidNotPrematurelyUndo: true });

      const failedUndoSaved = (await save(task)).saved;
      await bodyField(task).fill('版本四：失败撤销期间保留的后续草稿。');
      await task.getByLabel('撤销响应').selectOption('failure');
      await task.getByRole('button', { name: '撤销这次保存', exact: true }).click();
      await expectText(task, '正在撤销已保存操作');
      await expectText(task, '撤销未完成');
      await waitEditState('undoStatus', 'failure');
      edit = await readEdit();
      assert.deepEqual(edit.saved, failedUndoSaved);
      assert.equal(edit.draft.body, '版本四：失败撤销期间保留的后续草稿。');
      assert.equal(await task.getByRole('button', { name: '撤销这次保存', exact: true }).isEnabled(), true);
      const failedUndoRequestId = edit.undo.requestId;
      await task.getByLabel('撤销响应').selectOption('success');
      await task.getByRole('button', { name: '撤销这次保存', exact: true }).click();
      await expectText(task, '撤销已完成');
      await waitEditState('undoStatus', 'success');
      edit = await readEdit();
      assert.equal(edit.undo.requestId, failedUndoRequestId);
      assert.deepEqual(edit.saved, firstSaved);
      assert.equal(edit.draft.body, '版本四：失败撤销期间保留的后续草稿。');
      check('P01 failed undo leaves saved result intact and retry preserves later draft', { failureSaved: failedUndoSaved, retrySaved: edit.saved, draft: edit.draft, sameSavedOperation: failedUndoRequestId });

      for (const recoveryCase of [{ exit: 'navigate', outcome: 'success' }, { exit: 'reload', outcome: 'failure' }]) {
        task = await freshEdit();
        const beforeUndo = { title: `中断撤销 ${recoveryCase.exit}`, body: '原已保存版本' };
        await titleField(task).fill(beforeUndo.title);await bodyField(task).fill(beforeUndo.body);await save(task);
        await bodyField(task).fill('随后保存版本');const submittedUndo = (await save(task)).saved;
        await bodyField(task).fill('撤销前继续输入的草稿');
        await task.getByRole('button', { name: '撤销这次保存', exact: true }).click();
        await waitEditState('undoStatus', 'pending');
        if (recoveryCase.exit === 'navigate') {
          await task.getByRole('link', { name: '返回资料集合', exact: true }).click();
          task = await open('edit');
        } else {
          await page.reload({ waitUntil: 'networkidle' });
          task = page.locator('[data-pattern="edit"]');await task.waitFor();
        }
        await waitEditState('undoStatus', 'unknown');
        await page.waitForTimeout(850);
        edit = await readEdit();assert.equal(edit.undoStatus, 'unknown');
        assert.deepEqual(edit.saved, submittedUndo);assert.equal(edit.draft.body, '撤销前继续输入的草稿');
        assert.equal(await task.getByRole('button', { name: '保存草稿', exact: true }).isDisabled(), true);
        assert.equal(await task.getByRole('button', { name: '核实撤销结果', exact: true }).isEnabled(), true);
        await settings(task);await task.getByLabel('撤销响应').selectOption(recoveryCase.outcome);
        await task.getByRole('button', { name: '核实撤销结果', exact: true }).click();
        await waitEditState('undoStatus', recoveryCase.outcome);
        edit = await readEdit();assert.deepEqual(edit.saved, recoveryCase.outcome === 'success' ? beforeUndo : submittedUndo);
        assert.equal(edit.draft.body, '撤销前继续输入的草稿');assert.equal(await bodyField(task).isEnabled(), true);
        await bodyField(task).fill('核实后可以继续编辑');assert.equal((await readEdit()).draft.body, '核实后可以继续编辑');
        check(`P01 interrupted undo after ${recoveryCase.exit} remains unknown until ${recoveryCase.outcome} verification`, { priorSaved: beforeUndo, submittedSaved: submittedUndo, actualSaved: edit.saved, preservedDraft: edit.draft.body, continuationEnabled: true });
      }

      task = await freshEdit();
      const expirySaved = { title: '实际期限验收', body: '已保存版本保持有效。' };
      await titleField(task).fill(expirySaved.title); await bodyField(task).fill(expirySaved.body);
      const expiryStart = await save(task);
      const expiresAt = expiryStart.undo.expiresAt;
      const availableAt = await page.evaluate(() => Date.now());
      assert.ok(expiresAt > availableAt && expiresAt - availableAt <= 15000);
      assert.equal(await task.getByRole('button', { name: '撤销这次保存', exact: true }).isEnabled(), true);
      await bodyField(task).fill('期限之后也不可丢弃的草稿。');
      // Use the actual application timer; never press the debug expiry replay.
      await waitEditState('undoStatus', 'expired', 20000);
      const expiredAt = await page.evaluate(() => Date.now());
      assert.ok(expiredAt >= expiresAt, 'Undo expired before the saved operation deadline');
      await expectText(task, '撤销期限已过');
      assert.equal(await task.getByRole('button', { name: '撤销这次保存', exact: true }).isDisabled(), true);
      edit = await readEdit();
      assert.deepEqual(edit.saved, expirySaved);
      assert.equal(edit.draft.body, '期限之后也不可丢弃的草稿。');
      assert.equal(await task.getByText('撤销已完成', { exact: true }).count(), 0);
      await task.getByRole('button', { name: '放弃这次修改', exact: true }).click();
      await page.getByRole('button', { name: '放弃并保留草稿', exact: true }).click();
      assert.equal(await bodyField(task).inputValue(), expirySaved.body);
      assert.deepEqual((await readEdit()).saved, expirySaved);
      await task.getByRole('button', { name: '恢复草稿', exact: true }).click();
      assert.equal(await bodyField(task).inputValue(), '期限之后也不可丢弃的草稿。');
      assert.deepEqual((await readEdit()).saved, expirySaved);
      check('P01 actual 15-second undo expiry differs from abandoning a recoverable draft', { availableAt, expiresAt, expiredAt, elapsed: expiredAt - availableAt, saved: expirySaved, restoredDraft: (await readEdit()).draft });

      task = await open('collection');
      await task.getByRole('button', { name: '选择当前页' }).click();
      await task.getByRole('button', { name: '下一页', exact: true }).click();
      await task.getByRole('button', { name: '选择当前页' }).click();
      await task.getByRole('button', { name: '处理所选 5 项', exact: true }).click();
      await expectText(task, '已完成 3 项，未完成 1 项，待核实 1 项');
      await task.getByRole('button', { name: '只重试失败项' }).click();
      await expectText(task, '已完成 4 项，未完成 0 项，待核实 1 项');
      await settings(task);
      await task.getByRole('button', { name: '重放过期查询' }).click();
      await page.waitForTimeout(1850);
      assert.equal(await task.locator('#resource-search').inputValue(), '陈禾');
      assert.equal(await task.locator('tbody tr').count(), 2);
      assert.ok((await task.textContent()).includes('已忽略旧查询：1'));
      await task.getByRole('link', { name: '城南步行观察', exact: true }).click();
      await page.locator('[data-pattern="detail"]').waitFor();
      await page.getByRole('link', { name: '返回原集合' }).click();
      task = page.locator('[data-pattern="collection"]');
      assert.equal(await task.locator('#resource-search').inputValue(), '陈禾');
      assert.ok((await task.textContent()).includes('5 项已选'));
      check('P02/P03 cross-page IDs, partial batch, retry failures only, stale query and return context', '5 IDs over 2 pages; unknown excluded from retry; query and selection retained');
      task = await open('detail/missing');
      await expectText(task, '这个对象已不可用');
      assert.equal(await task.getByRole('link', { name: '前往资料集合' }).getAttribute('href'), '/docs/patterns/collection');
      task = await open('detail/r1');
      await settings(task);
      await task.getByRole('button', { name: '重放对象消失' }).click();
      await expectText(task, '资料已不可用');
      assert.equal(await task.locator('h2').evaluate(el => el === document.activeElement), true);
      check('P03 missing direct entry and disappearing object', 'Stable parent link and focus on unavailable-object heading');

      task = await freshCollection();
      await task.getByRole('checkbox', { name: '选择秋日田野笔记', exact: true }).check();
      await task.getByRole('button', { name: /^预览\s*秋日田野笔记$/ }).click();
      const preview = page.getByRole('dialog');
      await preview.getByRole('heading', { name: '秋日田野笔记', exact: true }).waitFor();
      assertPublic(await page.content(), 'Collection preview DOM before removal');
      await preview.getByText('预览状态演示', { exact: true }).click();
      await preview.getByRole('button', { name: '重放预览对象消失', exact: true }).click();
      await preview.getByRole('heading', { name: '资料已不可用', exact: true }).waitFor();
      await expectText(preview, '这个对象已从集合移除');
      assert.equal(await task.getByRole('link', { name: '秋日田野笔记', exact: true }).count(), 0);
      assert.equal(await preview.getByRole('link', { name: '打开完整详情', exact: true }).count(), 0);
      await preview.getByRole('button', { name: '关闭', exact: true }).click();
      await preview.waitFor({ state: 'hidden' });
      await page.waitForFunction(() => document.activeElement === document.querySelector('[data-pattern="collection"] h2'));
      assert.equal(await task.getByRole('heading', { name: '查找与比较', exact: true }).evaluate(element => element === document.activeElement), true);
      const selectionAfterRemoval = await page.evaluate(() => JSON.parse(sessionStorage.getItem('qingye-task:collection-selection')));
      assert.deepEqual(selectionAfterRemoval, []);
      check('P02 removing an open preview object returns focus to the collection heading', { triggerRemoved: true, detailActionRemoved: true, selectedIds: selectionAfterRemoval, finalFocus: '查找与比较' });

      task = await freshCollection();
      await settings(task);
      const factTitles = { empty: '还没有资料', 'no-results': '没有符合当前查询的资料', forbidden: '当前没有访问权限', failure: '资料载入未完成' };
      const assertCollectionFact = async state => {
        await task.getByLabel('集合事实状态').selectOption(state);
        if (state === 'populated') assert.equal(await task.locator('tbody tr').count(), 3);
        else await expectText(task, factTitles[state]);
        for (const [other, title] of Object.entries(factTitles)) assert.equal(await task.getByText(title, { exact: true }).count(), other === state ? 1 : 0, `${state} must not claim the mutually exclusive ${other} fact`);
        if (state !== 'populated') {
          assert.equal(await task.locator('tbody tr').count(), 0);
          assert.equal(await task.locator('a[href^="/docs/patterns/detail/"]').count(), 0);
          assert.equal(await task.getByRole('button', { name: '选择当前页', exact: true }).isDisabled(), true);
          assert.equal(await task.getByRole('button', { name: /^处理所选 / }).isDisabled(), true);
        }
        assertPublic(await page.content(), `Collection ${state} DOM`);
      };
      await assertCollectionFact('populated');
      await task.getByRole('button', { name: '选择当前页', exact: true }).click();
      const selectedBeforeFacts = await page.evaluate(() => JSON.parse(sessionStorage.getItem('qingye-task:collection-selection')));
      assert.deepEqual(selectedBeforeFacts, ['r1', 'r2', 'r3']);
      await assertCollectionFact('empty');
      assert.equal(await task.getByRole('link', { name: '创建第一份资料', exact: true }).getAttribute('href'), '/docs/patterns/edit');
      assert.equal(await task.getByRole('button', { name: '重试载入资料', exact: true }).count(), 0);
      await assertCollectionFact('no-results');
      await task.getByRole('button', { name: '清除查询并重新查找', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('[data-pattern="collection"] tbody')?.children.length === 3);
      assert.equal(await task.locator('#resource-search').inputValue(), '');
      assert.deepEqual(await page.evaluate(() => JSON.parse(sessionStorage.getItem('qingye-task:collection-selection'))), selectedBeforeFacts);
      await assertCollectionFact('forbidden');
      assert.equal(await task.getByRole('link', { name: '新建资料', exact: true }).count(), 0);
      await task.getByRole('button', { name: '申请资料访问', exact: true }).click();
      await expectText(task, '访问申请等待回复，尚未获得权限。');
      assert.equal(await task.getByRole('button', { name: '申请资料访问', exact: true }).isDisabled(), true);
      assert.equal(await task.locator('tbody tr').count(), 0);
      assert.equal(await task.getByText('当前没有访问权限', { exact: true }).count(), 1);
      await assertCollectionFact('populated');
      await task.locator('#resource-search').fill('陈禾');
      await page.waitForFunction(() => document.querySelector('[data-pattern="collection"] tbody')?.children.length === 2 && new URL(location.href).searchParams.get('q') === '陈禾');
      const failedQueryURL = page.url();
      await assertCollectionFact('failure');
      assert.equal(await task.locator('#resource-search').inputValue(), '陈禾');
      assert.equal(page.url(), failedQueryURL);
      assert.deepEqual(await page.evaluate(() => JSON.parse(sessionStorage.getItem('qingye-task:collection-selection'))), selectedBeforeFacts);
      await task.getByRole('button', { name: '重试载入资料', exact: true }).click();
      assert.equal(await task.locator('tbody tr').count(), 2);
      assert.equal(await task.locator('#resource-search').inputValue(), '陈禾');
      assert.deepEqual(await page.evaluate(() => JSON.parse(sessionStorage.getItem('qingye-task:collection-selection'))), selectedBeforeFacts);
      check('P02 five collection facts have distinct exits and preserve prior query/selection', { facts: ['populated', ...Object.keys(factTitles)], selectedIds: selectedBeforeFacts, retryQuery: '陈禾', permissionRequestDoesNotGrantAccess: true });

      const dtoResponse = await page.request.get(`${base}/authorized-resources.json`);
      assert.equal(dtoResponse.status(), 200);
      const dtoText = await dtoResponse.text();
      assertPublic(dtoText, 'Authorized DTO HTTP response');
      const dto = JSON.parse(dtoText);
      assert.deepEqual(dto, { visibility: 'public-projection', rows: projectResources() });
      for (const row of dto.rows) assert.deepEqual(Object.keys(row).sort(), ['author', 'date', 'id', 'size', 'title', 'type']);
      task = await freshCollection();
      assertPublic(await page.content(), 'Authorized collection DOM');
      await task.getByRole('button', { name: /^预览\s*秋日田野笔记$/ }).click();
      await page.getByRole('dialog').getByRole('heading', { name: dto.rows[0].title, exact: true }).waitFor();
      assertPublic(await page.content(), 'Authorized preview DOM including hidden nodes');
      await page.getByRole('dialog').getByRole('button', { name: '关闭', exact: true }).click();
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
      for (const row of dto.rows) {
        task = await open(`detail/${row.id}`);
        await task.getByRole('heading', { name: row.title, exact: true }).waitFor();
        assertPublic(await page.content(), `Authorized detail ${row.id} DOM including hidden nodes`);
        assert.equal(await task.getByText(row.author, { exact: true }).count(), 1);
      }
      check('Authorized DTO HTTP response, collection, preview and all five details exclude restricted fixture material', { status: dtoResponse.status(), exactDTOKeys: ['id', 'title', 'type', 'size', 'author', 'date'], rows: dto.rows.map(row => row.id), DOMBoundary: 'page.content includes hidden nodes', builtFiles: report.projectionBuild.files, scope: 'synthetic projection fixture, no production authorization claim' });

      task = await freshCollection();
      const tableFacts = async () => task.locator('table').evaluate(table => ({ headers: [...table.querySelectorAll('th')].map(e => e.textContent), rows: [...table.querySelectorAll('tbody tr')].map(e => e.textContent) }));
      const standardFacts = await tableFacts();
      await settings(task);
      await task.getByRole('button', { name: '紧凑密度', exact: true }).click();
      assert.deepEqual(await tableFacts(), standardFacts);
      await task.evaluate(setTypography, { scale: 2, spacing: false });
      assert.deepEqual(await tableFacts(), standardFacts);
      await task.evaluate(restoreTypography);
      await task.getByRole('button', { name: '标准密度', exact: true }).click();
      assert.deepEqual(await tableFacts(), standardFacts);
      check('P02 compact density and larger text retain comparison columns, units and rows', standardFacts);

      task = await open('review');
      const adopt = task.getByRole('button', { name: '采用已确认建议', exact: true });
      assert.equal(await adopt.isDisabled(), true);
      await task.getByRole('button', { name: '核对并确认 2 项' }).click();
      assert.equal(await adopt.isEnabled(), true);
      await settings(task);
      await task.getByRole('button', { name: '重放建议版本变化' }).click();
      assert.equal(await adopt.isDisabled(), true);
      await task.getByRole('button', { name: '核对并确认 2 项' }).click();
      await task.getByLabel('下次模拟响应').selectOption('unknown');
      await adopt.click();
      await expectText(task, '采用结果待核实');
      assert.equal(await adopt.isDisabled(), true);
      await task.getByRole('button', { name: '核实采用结果' }).click();
      await expectText(task, '已采用 2 项建议');
      check('P04 scope-bound confirmation and unknown result', 'Version change invalidates confirmation; unknown blocks repeated adoption');

      task = await open('queue');
      await settings(task);
      await task.getByRole('button', { name: '载入三份样例文件' }).click();
      await task.getByRole('button', { name: '开始处理 3 个文件' }).click();
      await expectText(task, '已完成 1，未完成 1，待核实 1，已取消 0');
      await task.getByRole('button', { name: '只重试失败文件' }).click();
      await expectText(task, '已完成 2，未完成 0，待核实 1，已取消 0');
      await task.getByRole('button', { name: /^请求取消\s*声音记录\.wav$/ }).click();
      await expectText(task, '取消中');
      assert.equal(await task.getByText('已取消', { exact: true }).count(), 0);
      await expectText(task, '已完成 2，未完成 0，待核实 0，已取消 1');
      await task.getByRole('button', { name: '载入三份样例文件' }).click();
      await task.getByRole('checkbox', { name: '取消过晚，返回已完成' }).check();
      await task.getByRole('button', { name: '开始处理 3 个文件' }).click();
      await task.getByRole('button', { name: /^请求取消\s*田野笔记\.pdf$/ }).click();
      await expectText(task, '取消中');
      await expectText(task, '取消过晚，已完成');
      check('P05 transfer vs processing, partial result, safe retry and cancellation race', 'Unknown excluded from retry; cancel request visibly pending before acknowledged or too-late result');

      task = await open('read?chapter=relation');
      assert.ok(page.url().includes('chapter=relation'));
      assert.ok((await task.locator('article').textContent()).length > 100);
      const reader=task.getByLabel('文章正文，可滚动阅读');assert.ok(await reader.evaluate(el=>el.scrollTop>0));await task.getByRole('button',{name:'记下阅读位置',exact:true}).click();const position=await reader.evaluate(el=>el.scrollTop);await reader.evaluate(el=>el.scrollTop=0);await task.getByRole('button',{name:'继续上次阅读',exact:true}).click();assert.equal(await reader.evaluate(el=>el.scrollTop),position);
      check('P06 direct chapter entry', 'Reading content present for explicit URL chapter');
      const layoutFailures = [];
      const layoutModes = ['light', 'dark'].flatMap(theme => [
        ...[1280, 390, 320].map(width => ({ theme, width, scale: 1, spacing: false, name: 'normal' })),
        ...[1280, 320].flatMap(width => [
          { theme, width, scale: 2, spacing: false, name: 'text-200' },
          { theme, width, scale: 1, spacing: true, name: 'text-spacing' },
          { theme, width, scale: 2, spacing: true, name: 'text-200-spacing' },
        ]),
      ]);
      report.typographyMethod = { scale: 'Task text computed font sizes multiplied by 2; geometry is not scaled with CSS zoom.', spacing: 'line-height 1.5; letter-spacing 0.12em; word-spacing 0.16em; paragraph end margin 2em', viewports: [1280, 390, 320], scope: 'Six rendered public task recipes. Native browser text settings and physical devices remain separate verification.' };
      for (const slug of ['edit', 'collection', 'detail', 'review', 'queue', 'read']) {
        // Exercise real populated work, including upload error/unknown actions;
        // an empty queue or an empty editor would hide relevant layout defects.
        if (slug === 'edit') {
          task = await freshEdit();
          await titleField(task).fill('仍在编辑的田野资料');
          await bodyField(task).fill('这份尚未保存的正文需要在小屏和文字放大以后完整保留。\n输入、说明和操作仍须有各自的位置。');
          await settings(task);
        } else if (slug === 'collection') {
          task = await freshCollection();
          await task.getByRole('button', { name: '选择当前页', exact: true }).click();
        } else {
          task = await open(slug);
          if (slug === 'queue') {
            await settings(task);
            await task.getByRole('button', { name: '载入三份样例文件', exact: true }).click();
            await task.getByRole('button', { name: '开始处理 3 个文件', exact: true }).click();
            await expectText(task, '已完成 1，未完成 1，待核实 1，已取消 0');
            await settings(task);
            assert.equal(await task.locator('[data-slot="file-upload-item"]').count(), 3);
          }
          if (slug === 'review') await task.getByRole('button', { name: '核对并确认 2 项', exact: true }).click();
        }
        for (const mode of layoutModes) {
          const name = `P-${slug} ${mode.theme}/${mode.width} ${mode.name} content and geometry`;
          let evidence;
          try {
            await page.setViewportSize({ width: mode.width, height: 1000 });
            await page.evaluate(theme => { document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.classList.toggle('light', theme === 'light'); document.documentElement.style.colorScheme = theme; }, mode.theme);
            const before = await task.evaluate(snapshotTask);
            const typography = await task.evaluate(setTypography, mode);
            await page.waitForTimeout(120);
            const geometry = await task.evaluate(inspectTaskGeometry);
            const after = await task.evaluate(snapshotTask);
            const screenshot = resolve(out, `${slug}-${mode.theme}-${mode.width}-${mode.name}.png`);
            await page.screenshot({ path: screenshot, fullPage: true });
            const contrast = await task.evaluate(measureTextContrast);
            report.contrast ??= []; report.contrast.push({ slug, ...mode, ...contrast });
            evidence = { slug, ...mode, typography, geometry, screenshot, content: { textCharacters: before.text.length, controls: before.controls.length, rows: before.rows, paragraphs: before.paragraphs, files: before.files.length } };
            report.readability ??= []; report.readability.push(evidence);
            assert.deepEqual(after, before, `${name}: rendered content or form facts were lost`);
            assert.ok(typography.textElements > 0, `${name}: typography fixture did not inspect text`);
            assert.deepEqual(typography.scaleFailures, [], `${name}: actual computed fonts are not 200%`);
            assert.deepEqual(typography.spacingFailures, [], `${name}: requested text spacing was not applied`);
            assert.ok(geometry.textNodes > 0 && geometry.actions > 0, `${name}: geometry fixture inspected no content/actions`);
            assert.ok(geometry.documentWidth <= geometry.viewport + 2, `${name}: document overflow ${geometry.documentWidth}/${geometry.viewport}`);
            assert.deepEqual(geometry.failures, [], `${name}: clipped content or unreachable actions`);
            assert.deepEqual(contrast.failures, [], `${name}: computed text contrast`);
            check(name, evidence);
          } catch (error) {
            // Complete the independent matrix without treating any failed
            // geometry as a pass, then fail the invocation after public checks.
            layoutFailures.push(error);
            report.cases.push({ name, status: 'FAIL', evidence, error: error.message });
            console.error(`FAIL ${name}: ${error.message}`);
          } finally { await task.evaluate(restoreTypography); }
        }
      }
      await page.setViewportSize({width:1280,height:1000});
      for (const route of ['/','/docs/design-philosophy','/docs/foundations','/docs/patterns','/docs/theming','/docs/ai']) {
        const response = await page.goto(`${base}${route}`,{waitUntil:'networkidle'});
        assert.equal(response.status(),200);
        assert.ok((await page.locator('main').innerText()).length > 50,`public route content ${route}`);
        const text=await page.locator('body').innerText();
        assert.ok(!/\/Volumes\/|\/Users\/|\bC0\d{2}\b|\bV(?:0\d|[12]\d|30)\b|\bW(?:0\d|1[012])\b/.test(text),`internal material leaked ${route}`);
        check(`Public route ${route}`,'Rendered body with no internal paths/work-package IDs');
      }
      const guide=await page.request.get(`${base}/design.md`);
      assert.equal(guide.status(),200);
      assert.ok((await guide.text()).includes('器用为本'));
      check('Public design.md','Public source available as text');
      assert.deepEqual(errors,[],'No runtime console/page errors');
      report.runtimeErrors=errors;
      if (layoutFailures.length) throw new AggregateError(layoutFailures, `${layoutFailures.length} task content/layout cases failed`);
    } finally { await closeWithTimeout(context,'task-pattern context'); }
  });
} catch(error) { report.errors.push(error.stack ?? error.message); process.exitCode=1; console.error(error); }
finally { report.completedAt=new Date().toISOString();report.status=report.errors.length?'FAIL':'PASS';writeFileSync(resolve(out,'report.json'),JSON.stringify(report,null,2)+'\n'); }
