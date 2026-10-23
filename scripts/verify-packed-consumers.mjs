// Install the actual tarball into isolated consumer projects. No workspace alias.
// Four builds share one serial browser owner; previews are task-owned processes.
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, copyFileSync, realpathSync, existsSync } from 'node:fs';
import { createServer } from 'node:net';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { withBrowser, closeWithTimeout } from './browser-runtime.mjs';
import { measureTextContrast } from './lib/browser-contrast.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== '--tgz') throw new Error('usage: node scripts/verify-packed-consumers.mjs --tgz <built-package.tgz>');
const tarball = realpathSync(resolve(args[1]));
const outputBase = resolve(root, 'test-results/packed-consumers');
mkdirSync(outputBase, { recursive: true });
const output = mkdtempSync(join(outputBase, 'run-'));
const ui = JSON.parse(readFileSync(resolve(root, 'packages/ui/package.json'), 'utf8'));
const docs = JSON.parse(readFileSync(resolve(root, 'apps/docs/package.json'), 'utf8'));
const sha = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');
const evidence = { startedAt: new Date().toISOString(), tarball, sha256: sha(tarball), version: ui.version, output, cases: [], errors: [] };
const archive = execFileSync('tar', ['-tzf', tarball], { encoding: 'utf8' }).trim().split('\n');
assert.ok(archive.includes('package/dist/ui.css'));
assert.ok(archive.includes('package/styles.css'));
assert.ok(archive.includes('package/prose.css'));
assert.ok(archive.includes('package/design.md'));
assert.ok(archive.includes('package/design.en.md'));
for (const component of ['data-table', 'virtual-list', 'sparkline', 'menu', 'scroll-area']) for (const extension of ['js', 'd.ts']) assert.ok(archive.includes(`package/dist/components/${component}.${extension}`), `missing installed ${component} ${extension} entry`);
assert.ok(!archive.some((path) => /(?:^|\/)(?:plans|implementation|baseline|test-results)(?:\/|$)/.test(path)), 'private development artifacts in package');
evidence.archive = { files: archive.length, forbiddenInternalPaths: false };

function run(command, commandArgs, cwd, label) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, commandArgs, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
    let log = '';
    child.stdout.on('data', (data) => { log += data; });
    child.stderr.on('data', (data) => { log += data; });
    child.on('error', reject);
    child.on('exit', (code) => {
      writeFileSync(join(cwd, `${label}.log`), log);
      if (code === 0) resolveRun({ command: [command, ...commandArgs], code });
      else reject(new Error(`${label} exited ${code}: ${log.slice(-6000)}`));
    });
  });
}

const sharedCSS = `
html[data-brand="consumer-a"] { --qy-primary: #194732; --qy-primary-foreground: #ffffff; }
html[data-brand="consumer-b"] { --qy-primary: #283d80; --qy-primary-foreground: #ffffff; }
body { margin: 0; } main { max-width: 860px; margin: auto; padding: 24px; display: grid; gap: 24px; }
main > h1 { font-size: 24px; } main > section { min-width: 0; display: grid; gap: 16px; }
`;

async function prepare(style, feature) {
  const name = `${style}-${feature}`;
  const directory = join(output, name);
  mkdirSync(directory, { recursive: true });
  const pkg = {
    name: `packed-${name}`, private: true, type: 'module',
    scripts: { typecheck: 'tsc --noEmit', build: 'vite build' },
    dependencies: { '@qingye_lab/ui': `file:${tarball}`, react: docs.dependencies.react, 'react-dom': docs.dependencies['react-dom'] },
    devDependencies: { vite: docs.devDependencies.vite, typescript: docs.devDependencies.typescript, '@types/react': docs.devDependencies['@types/react'], '@types/react-dom': docs.devDependencies['@types/react-dom'] },
  };
  // Peer auto-install is deliberately disabled. Recharts declares react-is as
  // its own required peer, so the full consumer supplies that contract too.
  if (feature === 'full') Object.assign(pkg.dependencies, { '@tanstack/react-table': docs.dependencies['@tanstack/react-table'], recharts: docs.dependencies.recharts, 'react-is': docs.dependencies.react });
  if (style === 'tailwind') Object.assign(pkg.devDependencies, { tailwindcss: docs.devDependencies.tailwindcss, '@tailwindcss/vite': docs.devDependencies['@tailwindcss/vite'] });
  writeFileSync(join(directory, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
  writeFileSync(join(directory, '.npmrc'), 'auto-install-peers=false\n');
  writeFileSync(join(directory, 'index.html'), '<!doctype html><html lang="zh-CN" data-brand="consumer-a"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><title>包消费验收</title></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>');
  writeFileSync(join(directory, 'tsconfig.json'), JSON.stringify({ compilerOptions: { target: 'ES2022', lib: ['ES2022','DOM','DOM.Iterable'], module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true, skipLibCheck: true, noEmit: true }, include: ['main.tsx','registry/*.tsx'] }, null, 2));
  copyFileSync(resolve(root, `scripts/fixtures/package-consumer/${feature === 'full' ? 'full' : 'button'}.tsx`), join(directory, 'main.tsx'));
  writeFileSync(join(directory, 'style.css'), (style === 'tailwind' ? '@import "tailwindcss";\n@import "@qingye_lab/ui/styles.css";\n' : '@import "@qingye_lab/ui/ui.css";\n') + sharedCSS);
  writeFileSync(join(directory, 'vite.config.mjs'), (style === 'tailwind' ? 'import tailwindcss from "@tailwindcss/vite";\n' : '') + `export default { ${style === 'tailwind' ? 'plugins: [tailwindcss()],' : ''} server: {host:'127.0.0.1', strictPort:true} };\n`);
  const item = { name, style, feature, directory, assertions: [], status: 'NOT_RUN', commands: [] };
  evidence.cases.push(item);
  item.commands.push(await run('pnpm', ['install', '--ignore-workspace', '--no-frozen-lockfile', '--ignore-scripts'], directory, 'install'));
  const installed = realpathSync(join(directory, 'node_modules/@qingye_lab/ui'));
  assert.ok(!installed.startsWith(resolve(root, 'packages/ui')), 'consumer must resolve installed package, not workspace source');
  const actual = JSON.parse(readFileSync(join(installed, 'package.json'), 'utf8'));
  assert.equal(actual.version, ui.version);
  item.installedPackage = { path: installed, version: actual.version, sourceAlias: false };
  if(feature==='full') {
    const registry=JSON.parse(readFileSync(join(installed,'registry/registry.json'),'utf8'));
    mkdirSync(join(directory,'registry'),{recursive:true});
    for(const entry of registry.items) for(const file of entry.files ?? []) if(file.path.endsWith('.tsx')) {
      assert.ok(file.content.includes('@qingye_lab/ui/'),'registry must reference shared package');
      writeFileSync(join(directory,'registry',file.path.split('/').at(-1)),file.content);
    }
    item.assertions.push('Published Registry TSX templates typecheck against installed public package');
  }
  if (feature === 'button') {
    for (const dependency of ['@tanstack/react-table', 'recharts']) assert.ok(!existsSync(join(directory, 'node_modules', dependency)), `button-only unexpectedly installed ${dependency}`);
    item.assertions.push('Button-only consumer has no installed Table/Chart peer dependency at its entry');
  }
  item.commands.push(await run('pnpm', ['exec', 'tsc', '--noEmit'], directory, 'typecheck'));
  item.commands.push(await run('pnpm', ['exec', 'vite', 'build'], directory, 'build'));
  item.status = 'BUILT';
  console.log(`packed consumer built ${name}`);
  return item;
}

async function reservePort() {
  const server = createServer();
  return new Promise((resolvePort, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', () => { const port = server.address().port; server.close((error) => error ? reject(error) : resolvePort(port)); }); });
}
function groupMembers(group) {
  return execFileSync('ps', ['-axo','pid=,ppid=,pgid='], {encoding:'utf8'}).trim().split('\n').map(line => line.trim().split(/\s+/).map(Number)).filter(row => row[2] === group);
}
async function preview(item, task) {
  const port = await reservePort();
  const url = `http://127.0.0.1:${port}`;
  const child = spawn('pnpm', ['exec','vite','preview','--host','127.0.0.1','--port',String(port),'--strictPort'], { cwd:item.directory, detached:true, stdio:['ignore','pipe','pipe'] });
  item.preview = { pid:child.pid, parent:process.pid, processGroup:child.pid, url, closed:false };
  let log = '';
  child.stdout.on('data', data => { log += data; }); child.stderr.on('data', data => { log += data; });
  let launchError; child.once('error', error => { launchError=error; });
  try {
    let ready = false;
    for (let attempt=0;attempt<120;attempt++) {
      if (launchError) throw launchError;
      if (child.exitCode !== null) throw new Error(`preview exited ${child.exitCode}: ${log}`);
      try { const response=await fetch(url,{signal:AbortSignal.timeout(500)}); if(response.ok && (await response.text()).includes('id="root"')) {ready=true;break;} } catch {}
      await delay(250);
    }
    assert.ok(ready,'packed preview readiness');
    await task(url);
  } finally {
    writeFileSync(join(item.directory,'preview.log'),log);
    if(child.pid && groupMembers(child.pid).length) {
      process.kill(-child.pid,'SIGTERM');
      for(let i=0;i<20 && groupMembers(child.pid).length;i++) await delay(250);
      if(groupMembers(child.pid).length) {process.kill(-child.pid,'SIGKILL');await delay(250);}
      assert.equal(groupMembers(child.pid).length,0,'owned consumer preview must exit');
    }
    item.preview.closed=true;
  }
}

async function verifyNewCapabilities(page, item) {
  const sized = page.locator('#sized-table');
  const nameColumn = sized.locator('tbody th[scope="row"]').first();
  const width = () => nameColumn.evaluate(element => element.getBoundingClientRect().width);
  assert.ok(Math.abs(await width() - 200) < 1, 'installed explicit column width reaches the cell');
  const fullText = await nameColumn.innerText();
  assert.equal(await nameColumn.locator('[data-slot="data-table-cell-content"]').getAttribute('title'), fullText);
  assert.equal(await nameColumn.locator('[data-slot="data-table-cell-content"]').evaluate(element => getComputedStyle(element).textOverflow), 'ellipsis');
  assert.equal(await sized.getByRole('columnheader', { name: '组合列', exact: true }).getAttribute('colspan'), '2');
  await page.locator('#shrink-table-column').click();
  assert.ok(Math.abs(await width() - 180) < 1, 'installed minSize clamps a smaller controlled size');
  await page.locator('#resize-table-column').click();
  assert.ok(Math.abs(await width() - 240) < 1, 'installed maxSize clamps a larger controlled size');
  assert.ok(Math.abs(await sized.getByRole('columnheader', { name: '组合列', exact: true }).evaluate(element => element.getBoundingClientRect().width) - 340) < 1, 'grouped header sums actual leaf widths');
  assert.equal(await page.locator('#entered-table').evaluate(element => getComputedStyle(element).tableLayout), 'auto', 'unsized legacy table keeps auto layout');

  const table = page.locator('#window-table');
  const viewport = page.locator('#window-table-viewport');
  const first = table.locator('tbody tr[data-row-id="entry-0"]');
  const second = table.locator('tbody tr[data-row-id="entry-1"]');
  const selectedBackground = await first.evaluate(element => getComputedStyle(element).backgroundColor);
  assert.equal(await table.getAttribute('aria-rowcount'), '201');
  assert.equal(await table.locator('thead').evaluate(element => element.tagName), 'THEAD');
  assert.equal(await table.locator('tbody').evaluate(element => element.tagName), 'TBODY');
  assert.ok(await table.locator('tbody tr[data-row-id]').count() <= 12, 'installed table renders a bounded row window');
  await first.getByRole('checkbox').click();
  assert.equal(await page.locator('#table-selected').textContent(), '1');
  assert.equal(await page.locator('#table-active').textContent(), 'none');
  assert.equal(await first.evaluate(element => getComputedStyle(element).backgroundColor), selectedBackground, 'checkbox selection does not add selected-row fill');
  await first.locator('th[scope="row"]').click();
  assert.equal(await page.locator('#table-active').textContent(), 'entry-0');
  assert.equal(await page.locator('#table-selected').textContent(), '1');
  await second.getByRole('button', { name: '记录行操作 entry-1', exact: true }).click();
  assert.equal(await page.locator('#table-row-actions').textContent(), '1');
  assert.equal(await page.locator('#table-active').textContent(), 'entry-0', 'nested action does not activate a different row');
  const editor = second.getByRole('textbox', { name: '表格草稿 entry-1', exact: true });
  await editor.fill('安装后的编辑草稿');
  await editor.press('End');
  assert.equal(await editor.evaluate(element => element === document.activeElement), true, 'native editor keeps End');
  assert.equal(await page.locator('#table-active').textContent(), 'entry-0');
  await second.getByRole('checkbox').click();
  const checkboxBackground = await second.evaluate(element => getComputedStyle(element).backgroundColor);
  await page.locator('#table-selection-look').click();
  assert.notEqual(await second.evaluate(element => getComputedStyle(element).backgroundColor), checkboxBackground, 'row selection appearance restores actual fill');
  await table.getByRole('checkbox', { name: '选择完整当前集合', exact: true }).click();
  assert.equal(await page.locator('#table-selected').textContent(), '200', 'select-all includes the complete model, not only mounted rows');
  const sort = table.getByRole('button', { name: /记录计数/ });
  await sort.click();
  assert.equal(await table.getByRole('columnheader', { name: /记录计数/ }).getAttribute('aria-sort'), 'ascending');
  assert.equal(await table.locator('tbody tr[data-row-id]').first().getAttribute('data-row-id'), 'entry-199', 'actual ascending model reaches rendered rows');
  await sort.click();
  await sort.click();
  assert.equal(await table.getByRole('columnheader', { name: /记录计数/ }).getAttribute('aria-sort'), null);
  await viewport.focus();
  await page.keyboard.press('End');
  await page.waitForFunction(() => document.activeElement?.getAttribute('data-row-id') === 'entry-199');
  assert.equal(await table.locator('tr[data-row-id="entry-199"]').getAttribute('aria-rowindex'), '201');
  assert.ok(await table.locator('tbody tr[data-row-id]').count() <= 12);
  await page.keyboard.press('Home');
  await page.waitForFunction(() => document.activeElement?.getAttribute('data-row-id') === 'entry-0');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#table-active').textContent(), 'entry-0');
  assert.equal(await page.locator('#table-selected').textContent(), '200');
  await page.locator('#remove-window-row').click();
  const removedEditor = first.getByRole('textbox', { name: '表格草稿 entry-0', exact: true });
  await removedEditor.fill('离屏编辑仍保留');
  await viewport.evaluate(element => element.scrollTo({ top: 6000 }));
  await page.waitForFunction(() => [...document.querySelectorAll('#window-table tbody tr[data-row-id]')].some(element => Number(element.getAttribute('data-index')) > 100));
  assert.equal(await removedEditor.evaluate(element => element === document.activeElement), true);
  assert.equal(await removedEditor.inputValue(), '离屏编辑仍保留');
  assert.ok(await table.locator('tbody tr[data-row-id]').count() <= 12);
  await first.waitFor({ state: 'detached' });
  await page.waitForFunction(() => document.activeElement?.id === 'window-table-viewport');
  assert.equal(await table.getAttribute('aria-rowcount'), '200');
  item.assertions.push('Installed DataTable widths/min/max and grouped headers affect actual cells; complete ellipsis text remains; default auto layout survives');
  item.assertions.push('Installed virtual DataTable retains native structure and truthful model positions; bounded DOM, complete selection scope, independent activation/controls, sorting, editing and removal focus work');

  const list = page.locator('#dynamic-list');
  assert.equal(await page.locator('#list-native-ref').textContent(), 'native-scroll-element');
  assert.equal(await list.evaluate(element => element.scrollTop), 0, 'followEnd does not initially jump to the end');
  const measuredHeights = await list.getByRole('listitem').evaluateAll(elements => [...new Set(elements.map(element => Math.round(element.getBoundingClientRect().height)))]);
  assert.ok(measuredHeights.length > 1, 'dynamic rows have actual different outer heights');
  await page.locator('#list-middle').click();
  await page.waitForFunction(() => {
    const viewport = document.querySelector('#dynamic-list');
    const row = viewport?.querySelector('[data-consumer-list-key="list-40"]')?.closest('[role="listitem"]');
    return viewport && row && viewport.scrollTop > 0 && Math.abs(row.getBoundingClientRect().top - viewport.getBoundingClientRect().top) < 2;
  });
  const reading = await list.evaluate(element => {
    const top = element.getBoundingClientRect().top;
    const row = [...element.querySelectorAll('[role="listitem"]')].find(row => row.getBoundingClientRect().top <= top + 1 && row.getBoundingClientRect().bottom > top + 1);
    return { key: row?.querySelector('[data-consumer-list-key]')?.getAttribute('data-consumer-list-key'), top: row?.getBoundingClientRect().top - top };
  });
  assert.equal(reading.key, 'list-40');
  await page.locator('#prepend-list').click();
  await page.waitForFunction(anchor => {
    const viewport = document.querySelector('#dynamic-list');
    const row = [...(viewport?.querySelectorAll('[role="listitem"]') ?? [])].find(row => row.querySelector('[data-consumer-list-key]')?.getAttribute('data-consumer-list-key') === anchor.key);
    return viewport && row && Math.abs(row.getBoundingClientRect().top - viewport.getBoundingClientRect().top - anchor.top) < 2;
  }, reading);
  await page.locator('#append-list').click();
  assert.equal(await page.locator('#list-count').textContent(), '82');
  assert.ok(await list.evaluate(element => element.scrollTop + element.clientHeight < element.scrollHeight - 100), 'append does not pull a reader at the middle to the end');
  await page.locator('#list-end').click();
  await page.waitForFunction(() => { const viewport = document.querySelector('#dynamic-list'); return viewport && Math.abs(viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop) < 2; });
  await page.locator('#append-list').click();
  await page.waitForFunction(() => {
    const viewport = document.querySelector('#dynamic-list');
    const last = viewport?.querySelector('[role="listitem"][aria-posinset="83"]');
    return viewport && last?.getAttribute('aria-setsize') === '83' && Math.abs(viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop) < 2;
  });
  assert.ok(await list.getByRole('listitem').count() <= 8, 'dynamic list remains bounded after jumps, insertion and append');
  item.assertions.push('Installed VirtualList keeps native ref separate from actions; measures varied heights, jumps accurately, preserves prepended reading anchor and follows append only at the tail');

  assert.equal(await page.locator('#static-sparkline button').count(), 0, 'static Sparkline does not acquire an interactive entry');
  const spark = page.locator('#interactive-sparkline').getByRole('button', { name: '包内逐点记录', exact: true });
  const readout = page.locator('[data-slot="sparkline-tooltip"]');
  await spark.focus();
  await page.waitForFunction(() => document.querySelector('[data-slot="sparkline-tooltip"]')?.textContent.includes('观测 1：2次'));
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('[data-slot="sparkline-tooltip"]')?.textContent.includes('观测 2：未知'));
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('[data-slot="sparkline-tooltip"]')?.textContent.includes('观测 3：0次'));
  await page.keyboard.press('End');
  await page.waitForFunction(() => document.querySelector('[data-slot="sparkline-tooltip"]')?.textContent.includes('观测 4：7次'));
  await page.keyboard.press('Escape');
  await readout.waitFor({ state: 'hidden' });
  assert.equal(await spark.evaluate(element => element === document.activeElement), true);
  await page.locator('#counter').focus();
  await spark.hover({ position: { x: 4, y: 10 } });
  await page.waitForFunction(() => document.querySelector('[data-slot="sparkline-tooltip"]')?.textContent.includes('观测 1：2次'));
  await page.locator('#counter').focus();
  await page.mouse.move(1, 1);
  await readout.waitFor({ state: 'hidden' });
  item.assertions.push('Installed opt-in Sparkline exposes category/readout by keyboard and pointer, distinguishes null from zero, dismisses with Escape/blur and preserves static default');

  const menuTrigger = page.locator('#capability-menu');
  await menuTrigger.click();
  const checkbox = page.getByRole('menuitemcheckbox', { name: '显示编号', exact: true });
  await checkbox.waitFor();
  assert.equal(await checkbox.getAttribute('data-marker-position'), 'start');
  assert.equal(await checkbox.evaluate(element => element.firstElementChild?.getAttribute('data-slot')), 'menu-checkbox-marker');
  assert.ok(await page.locator('#inset-menu-command').evaluate(element => Number.parseFloat(getComputedStyle(element).paddingInlineStart) > Number.parseFloat(getComputedStyle(element).paddingInlineEnd)), 'inset produces real logical leading space');
  await checkbox.click();
  assert.equal(await checkbox.getAttribute('aria-checked'), 'true');
  await page.getByRole('menuitemradio', { name: '全部范围', exact: true }).click();
  assert.equal(await page.locator('#menu-value').textContent(), 'checked:all:0');
  await page.locator('#inset-menu-command').click();
  await page.locator('[data-slot="menu-popup"]').waitFor({ state: 'hidden' });
  assert.equal(await page.locator('#menu-value').textContent(), 'checked:all:1');
  await menuTrigger.focus();
  await page.keyboard.press('ArrowDown');
  await checkbox.waitFor();
  await page.keyboard.press('Escape');
  await page.locator('[data-slot="menu-popup"]').waitFor({ state: 'hidden' });
  assert.equal(await menuTrigger.evaluate(element => element === document.activeElement), true);
  item.assertions.push('Installed Menu inset affects computed spacing; leading marks retain real checkbox/radio state, command behavior and keyboard return');

  assert.equal(await page.locator('#scroll-native-ref').textContent(), 'native-scroll-element');
  await page.locator('#native-scroll').evaluate(element => element.scrollTo({ top: 64 }));
  assert.equal(await page.locator('#native-scroll').evaluate(element => element.scrollTop), 64);
  const styled = page.locator('#styled-scroll-viewport');
  await page.locator('#styled-scroll').hover();
  await page.waitForFunction(() => { const viewport = document.querySelector('#styled-scroll-viewport'); return viewport && viewport.scrollHeight > viewport.clientHeight && viewport.scrollWidth > viewport.clientWidth; });
  const beforeThumb = await page.locator('#vertical-thumb').boundingBox();
  const beforeHorizontal = await page.locator('#horizontal-thumb').boundingBox();
  assert.ok(beforeThumb?.height > 0 && beforeHorizontal?.width > 0);
  assert.ok(beforeThumb.height < (await page.locator('#vertical-scrollbar').boundingBox()).height);
  assert.ok(beforeHorizontal.width < (await page.locator('#horizontal-scrollbar').boundingBox()).width);
  await styled.evaluate(element => element.scrollTo({ top: 180, left: 100 }));
  await page.waitForFunction(() => { const viewport = document.querySelector('#styled-scroll-viewport'); return viewport?.scrollTop === 180 && viewport.scrollLeft === 100; });
  await page.waitForFunction(before => document.querySelector('#vertical-thumb').getBoundingClientRect().y > before + 1, beforeThumb.y);
  assert.ok((await page.locator('#horizontal-thumb').boundingBox()).x > beforeHorizontal.x + 1, 'horizontal thumb follows actual viewport');
  const drag = await page.locator('#vertical-thumb').boundingBox();
  const beforeDrag = await styled.evaluate(element => element.scrollTop);
  await page.mouse.move(drag.x + drag.width / 2, drag.y + drag.height / 2);
  await page.mouse.down();
  await page.mouse.move(drag.x + drag.width / 2, drag.y + drag.height / 2 + 20, { steps: 4 });
  await page.mouse.up();
  await page.waitForFunction(before => document.querySelector('#styled-scroll-viewport').scrollTop > before + 10, beforeDrag);
  assert.ok((await page.locator('#scroll-corner').boundingBox()).width > 0);
  item.assertions.push('Installed native ScrollArea retains its scrolling-element ref; advanced Root/Viewport/Content/Scrollbar/Thumb/Corner measure both axes, follow scroll and drag the real viewport');
}

try {
  for(const style of ['tailwind','precompiled']) for(const feature of ['button','full']) await prepare(style,feature);
  await withBrowser(async(browser,lifecycle)=>{
    evidence.lifecycle=lifecycle;
    for(const item of evidence.cases) {
      await preview(item,async(url)=>{
        const context=await browser.newContext({viewport:{width:1100,height:900},reducedMotion:'reduce',colorScheme:'light'});
        try {
          const page=await context.newPage();
          const errors=[];
          page.on('pageerror',error=>errors.push(error.message));
          page.on('console',message=>{if(message.type()==='error')errors.push({message:message.text(),location:message.location()});});
          await page.goto(url,{waitUntil:'networkidle'});
          await page.locator('#counter').waitFor();
          const geometry=await page.locator('#counter').evaluate(el=>({height:el.getBoundingClientRect().height,color:getComputedStyle(el).backgroundColor}));
          assert.ok(Math.abs(geometry.height-32)<1,`${item.name}: styled control height ${geometry.height}`);
          await page.locator('#counter').click();
          assert.equal(await page.locator('#counter').textContent(),'已操作 1 次');
          await page.evaluate(()=>document.documentElement.dataset.brand='consumer-b');
          await page.mouse.move(1,1);
          await page.waitForFunction(()=>getComputedStyle(document.querySelector('#counter')).backgroundColor==='rgb(40, 61, 128)');
          const changed=await page.locator('#counter').evaluate(el=>getComputedStyle(el).backgroundColor);
          assert.notEqual(changed,geometry.color,'brand token must affect installed button');
          item.assertions.push('Compiled CSS controls real height; event works; independent project brand changes button');
          if(item.feature==='full') {
            await page.locator('#draft').fill('保存前的草稿');
            const before=await page.locator('#field-group').evaluate(el=>getComputedStyle(el).rowGap);
            await page.evaluate(()=>document.documentElement.style.setProperty('--qy-field-group-gap','37px','important'));
            assert.equal(await page.locator('#field-group').evaluate(el=>getComputedStyle(el).rowGap),'37px');
            assert.notEqual(before,'37px');
            assert.equal(await page.locator('#draft').inputValue(),'保存前的草稿');
            await page.locator('#open-dialog').click();
            await page.getByRole('dialog',{name:'草稿',exact:true}).waitFor();
            assert.equal(await page.locator('#portal-button').evaluate(el=>getComputedStyle(el).backgroundColor),changed,'Portal button inherits brand');
            await page.getByRole('textbox',{name:'浮层草稿'}).fill('浮层保留修改');
            await page.keyboard.press('Escape');
            await page.locator('[data-slot="dialog-popup"]').waitFor({state:'hidden'});
            assert.equal(await page.locator('#draft').inputValue(),'浮层保留修改');
            assert.equal(await page.evaluate(()=>document.activeElement?.id),'open-dialog');
            const dataTable = page.locator('#entered-table');
            await dataTable.getByRole('cell',{name:'A',exact:true}).evaluate(el=>el.setAttribute('data-persist-check','same-node'));
            await page.locator('#table-busy').click();
            assert.equal(await dataTable.getAttribute('aria-busy'),'true');
            assert.equal(await dataTable.getByRole('cell',{name:'A',exact:true}).getAttribute('data-persist-check'),'same-node');
            await page.locator('#table-busy').click();
            assert.equal(await dataTable.getAttribute('aria-busy'),'false');
            await page.locator('[data-slot="chart"] svg').first().waitFor();
            const chartTable = page.getByRole('table',{name:'输入数值',exact:true});
            assert.equal(await chartTable.count(),0,'Chart equivalent data starts collapsed');
            await page.locator('[data-slot="chart"]').getByRole('button',{name:'查看数据',exact:true}).click();
            await chartTable.waitFor();
            assert.equal(await chartTable.getByRole('cell',{name:'0',exact:true}).count(),2);
            await page.getByRole('spinbutton',{name:'A 数值',exact:true}).fill('');
            await chartTable.getByRole('cell',{name:'数值未完整',exact:true}).waitFor();
            assert.equal(await dataTable.getByRole('row').nth(1).getByRole('cell').nth(1).innerText(),'');
            await page.getByRole('spinbutton',{name:'A 数值',exact:true}).fill('4');
            await chartTable.getByRole('cell',{name:'4',exact:true}).waitFor();
            await page.locator('#counter').focus();
            await page.locator('#contract-group [data-slot="input-group-addon"]').first().click();
            assert.notEqual(await page.evaluate(()=>document.activeElement?.id),'group-input','Static attachment does not commandeer input focus');
            await page.getByRole('button',{name:'清空文本',exact:true}).click();
            assert.equal(await page.locator('#group-input').inputValue(),'');
            assert.equal(await page.locator('#group-submits').textContent(),'提交次数 0');
            assert.equal(await page.getByRole('button',{name:'清空文本',exact:true}).evaluate(el=>el===document.activeElement),true);
            await page.locator('#group-invalid').click();
            await page.locator('#group-input').focus();
            assert.equal(await page.locator('#group-input').getAttribute('aria-invalid'),'true');
            assert.equal(await page.locator('#contract-group').evaluate(el=>getComputedStyle(el).borderTopWidth),'1px');
            assert.equal(await page.locator('#group-input').evaluate(el=>getComputedStyle(el).borderTopWidth),'0px');
            await page.locator('#group-input').fill('保留表单值');
            await page.getByRole('combobox',{name:'单位',exact:true}).selectOption('em');
            await page.locator('#native-submit').click();
            assert.equal(await page.locator('#group-submits').textContent(),'提交次数 1');
            assert.deepEqual(JSON.parse(await page.locator('#native-values').textContent()),{text:'保留表单值',unit:'em'});
            assert.equal(await page.locator('#group-input').inputValue(),'保留表单值','Canceled native submit preserves draft');
            const firstTab=page.getByRole('tab',{name:'名称',exact:true}),secondTab=page.getByRole('tab',{name:'数值',exact:true});
            await page.getByRole('textbox',{name:'页签草稿',exact:true}).fill('保留输入');
            await firstTab.focus();await page.keyboard.press('ArrowRight');
            assert.equal(await secondTab.evaluate(el=>el===document.activeElement),true);
            assert.equal(await firstTab.getAttribute('aria-selected'),'true');
            assert.equal(await secondTab.getAttribute('aria-selected'),'false');
            assert.equal(await page.locator('#tab-activations').textContent(),'激活次数 0');
            await page.keyboard.press('Enter');
            assert.equal(await secondTab.getAttribute('aria-selected'),'true');
            assert.equal(await page.locator('#tab-activations').textContent(),'激活次数 1');
            await firstTab.click();
            assert.equal(await page.getByRole('textbox',{name:'页签草稿',exact:true}).inputValue(),'保留输入');
            await page.locator('#remove-tree-child').click();
            await page.getByRole('treeitem',{name:'子项',exact:true}).focus();
            await page.getByRole('treeitem',{name:'子项',exact:true}).waitFor({state:'detached'});
            await page.waitForFunction(()=>{const el=document.activeElement;const ref=el?.getAttribute('aria-labelledby');return el?.getAttribute('role')==='treeitem'&&(ref?ref.split(/\s+/).map(id=>document.getElementById(id)?.textContent??'').join(' ').trim():el.getAttribute('aria-label'))==='父项';});
            item.assertions.push('Static InputGroup attachment leaves focus to platform; child action never submits; explicit invalid owns single border; actual native FormData and canceled submit preserve input');
            item.assertions.push('Manual Tabs separate focus/selection and retain panel input; focused tree removal restores parent');
            item.assertions.push('Field relationship token changes computed gap and preserves draft; named Portal inherits brand and returns focus; explicit busy retains rows; Table and Chart share actual entered zero/unknown/value data');
            await verifyNewCapabilities(page, item);
          }
          item.screenshots=[];
          for(const mode of [{theme:'light',width:1100},{theme:'dark',width:1100}]) {
            await page.setViewportSize({width:mode.width,height:900});
            await page.evaluate(theme=>{document.documentElement.classList.toggle('dark',theme==='dark');document.documentElement.classList.toggle('light',theme==='light');document.documentElement.style.colorScheme=theme;},mode.theme);
            await page.waitForTimeout(150);
            const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);
            assert.equal(overflow,false,`${item.name} page overflow ${mode.theme}/${mode.width}`);
            const shot=join(item.directory,`${mode.theme}-${mode.width}.png`);
            await page.screenshot({path:shot,fullPage:true});item.screenshots.push({path:shot,sha256:sha(shot)});
            const contrast=await page.locator('main').evaluate(measureTextContrast);
            item.contrast??=[];item.contrast.push({...mode,...contrast});
            assert.deepEqual(contrast.failures,[],`${item.name} text/value contrast ${mode.theme}/${mode.width}`);
          }
          assert.deepEqual(errors,[],'runtime errors in installed consumer');
          item.status='PASS';item.runtimeErrors=errors;
          console.log(`packed consumer PASS ${item.name}`);
        } finally {await closeWithTimeout(context,'consumer context');}

      });
    }
  });
} catch(error) {
  evidence.errors.push(error.stack ?? error.message);process.exitCode=1;
  console.error(error.stack ?? error);
} finally {
  evidence.completedAt=new Date().toISOString();
  evidence.status=evidence.errors.length?'FAIL':evidence.cases.length===4 && evidence.cases.every(item=>item.status==='PASS')?'PASS':'NOT_RUN';
  writeFileSync(join(output,'report.json'),JSON.stringify(evidence,null,2)+'\n');
  console.log(`packed consumer report ${join(output,'report.json')}`);
}
