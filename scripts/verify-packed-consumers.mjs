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
    dependencies: { '@qingye/ui': `file:${tarball}`, react: docs.dependencies.react, 'react-dom': docs.dependencies['react-dom'] },
    devDependencies: { vite: docs.devDependencies.vite, typescript: docs.devDependencies.typescript, '@types/react': docs.devDependencies['@types/react'], '@types/react-dom': docs.devDependencies['@types/react-dom'] },
  };
  // Peer auto-install is deliberately disabled. Recharts declares react-is as
  // its own required peer, so the full consumer supplies that contract too.
  if (feature === 'full') Object.assign(pkg.dependencies, { '@tanstack/react-table': docs.dependencies['@tanstack/react-table'], recharts: docs.dependencies.recharts, 'react-is': docs.dependencies.react });
  if (style === 'tailwind') Object.assign(pkg.devDependencies, { tailwindcss: docs.devDependencies.tailwindcss, '@tailwindcss/vite': docs.devDependencies['@tailwindcss/vite'] });
  writeFileSync(join(directory, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
  writeFileSync(join(directory, '.npmrc'), 'auto-install-peers=false\n');
  writeFileSync(join(directory, 'index.html'), '<!doctype html><html lang="zh-CN" data-brand="consumer-a"><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><title>包消费验收</title></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>');
  writeFileSync(join(directory, 'tsconfig.json'), JSON.stringify({ compilerOptions: { target: 'ES2022', lib: ['ES2022','DOM','DOM.Iterable'], module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true, skipLibCheck: true, noEmit: true }, include: ['main.tsx','registry/*.tsx'] }, null, 2));
  copyFileSync(resolve(root, `scripts/fixtures/package-consumer/${feature === 'full' ? 'full' : 'button'}.tsx`), join(directory, 'main.tsx'));
  writeFileSync(join(directory, 'style.css'), (style === 'tailwind' ? '@import "tailwindcss";\n@import "@qingye/ui/styles.css";\n' : '@import "@qingye/ui/ui.css";\n') + sharedCSS);
  writeFileSync(join(directory, 'vite.config.mjs'), (style === 'tailwind' ? 'import tailwindcss from "@tailwindcss/vite";\n' : '') + `export default { ${style === 'tailwind' ? 'plugins: [tailwindcss()],' : ''} server: {host:'127.0.0.1', strictPort:true} };\n`);
  const item = { name, style, feature, directory, assertions: [], status: 'NOT_RUN', commands: [] };
  evidence.cases.push(item);
  item.commands.push(await run('pnpm', ['install', '--ignore-workspace', '--no-frozen-lockfile', '--ignore-scripts'], directory, 'install'));
  const installed = realpathSync(join(directory, 'node_modules/@qingye/ui'));
  assert.ok(!installed.startsWith(resolve(root, 'packages/ui')), 'consumer must resolve installed package, not workspace source');
  const actual = JSON.parse(readFileSync(join(installed, 'package.json'), 'utf8'));
  assert.equal(actual.version, ui.version);
  item.installedPackage = { path: installed, version: actual.version, sourceAlias: false };
  if(feature==='full') {
    const registry=JSON.parse(readFileSync(join(installed,'registry/registry.json'),'utf8'));
    mkdirSync(join(directory,'registry'),{recursive:true});
    for(const entry of registry.items) for(const file of entry.files ?? []) if(file.path.endsWith('.tsx')) {
      assert.ok(file.content.includes('@qingye/ui/'),'registry must reference shared package');
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
            await page.locator('[data-slot="dialog-popup"]').waitFor();
            assert.equal(await page.locator('#portal-button').evaluate(el=>getComputedStyle(el).backgroundColor),changed,'Portal button inherits brand');
            await page.getByRole('textbox',{name:'浮层草稿'}).fill('浮层保留修改');
            await page.keyboard.press('Escape');
            await page.locator('[data-slot="dialog-popup"]').waitFor({state:'hidden'});
            assert.equal(await page.locator('#draft').inputValue(),'浮层保留修改');
            assert.equal(await page.evaluate(()=>document.activeElement?.id),'open-dialog');
            await page.getByRole('cell',{name:'有效内容',exact:true}).evaluate(el=>el.setAttribute('data-persist-check','same-node'));
            await page.locator('#refresh').click();
            assert.equal(await page.getByRole('cell',{name:'有效内容',exact:true}).getAttribute('data-persist-check'),'same-node');
            await page.locator('#refresh').click();
            await page.locator('[data-slot="chart"] svg').first().waitFor();
            await page.locator('#contract-group [data-slot="input-group-addon"]').first().click();
            assert.equal(await page.evaluate(()=>document.activeElement?.id),'group-input');
            await page.getByRole('button',{name:'清空长度',exact:true}).click();
            assert.equal(await page.locator('#group-input').inputValue(),'');
            assert.equal(await page.locator('#group-submits').textContent(),'提交次数 0');
            assert.equal(await page.getByRole('button',{name:'清空长度',exact:true}).evaluate(el=>el===document.activeElement),true);
            await page.locator('#group-invalid').click();
            await page.locator('#group-input').focus();
            assert.equal(await page.locator('#group-input').getAttribute('aria-invalid'),'true');
            assert.equal(await page.locator('#contract-group').evaluate(el=>getComputedStyle(el).borderTopWidth),'1px');
            assert.equal(await page.locator('#group-input').evaluate(el=>getComputedStyle(el).borderTopWidth),'0px');
            const firstTab=page.getByRole('tab',{name:'概览',exact:true}),secondTab=page.getByRole('tab',{name:'慢加载详情',exact:true});
            await firstTab.focus();await page.keyboard.press('ArrowRight');
            assert.equal(await secondTab.evaluate(el=>el===document.activeElement),true);
            assert.equal(await firstTab.getAttribute('aria-selected'),'true');
            assert.equal(await secondTab.getAttribute('aria-selected'),'false');
            assert.equal(await page.locator('#tab-loads').textContent(),'载入次数 0');
            await page.keyboard.press('Enter');
            assert.equal(await secondTab.getAttribute('aria-selected'),'true');
            assert.equal(await page.locator('#tab-loads').textContent(),'载入次数 1');
            await page.locator('#remove-tree-child').click();
            await page.getByRole('treeitem',{name:'即将移除',exact:true}).focus();
            await page.getByRole('treeitem',{name:'即将移除',exact:true}).waitFor({state:'detached'});
            assert.equal(await page.locator('[data-slot="tree-item"][data-id="parent"]').evaluate(el=>el===document.activeElement),true);
            item.assertions.push('InputGroup composes caller focus, child action never submits, actual single border; manual Tabs separate focus/selection and load only on activation; removal restores tree parent focus');
            item.assertions.push('Real field relationship token changes computed gap and preserves draft; Portal inherits brand and returns focus; refresh retains rows; Table/Chart render with explicit peers');
          }
          item.screenshots=[];
          for(const mode of [{theme:'light',width:1100},{theme:'dark',width:1100},{theme:'light',width:390},{theme:'dark',width:390}]) {
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
        if(item.feature==='full') {
          const touchContext=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
          try {
            const touchPage=await touchContext.newPage();touchPage.setDefaultTimeout(10000);await touchPage.goto(url,{waitUntil:'networkidle'});
            assert.equal(await touchPage.evaluate(()=>matchMedia('(pointer: coarse)').matches),true);
            await touchPage.locator('#touch-actions').scrollIntoViewIfNeeded();
            const geometry=await touchPage.locator('#touch-actions').evaluate(el=>[...el.querySelectorAll('button')].map(button=>{const r=button.getBoundingClientRect(),a=getComputedStyle(button,'::after');return{id:button.id,x:r.x,y:r.y,width:r.width,height:r.height,hitWidth:Math.max(r.width,parseFloat(a.minWidth)||0),hitHeight:Math.max(r.height,parseFloat(a.minHeight)||0)};}));
            const hits=[];let count=0;
            for(const g of geometry){assert.ok(g.hitWidth>=44&&g.hitHeight>=44);for(const dx of [0,-g.hitWidth/2+1,g.hitWidth/2-1]){const point={x:g.x+g.width/2+dx,y:g.y+g.height/2};const owner=await touchPage.evaluate(p=>document.elementFromPoint(p.x,p.y)?.closest('button')?.id,point);assert.equal(owner,g.id,'coarse hit extension must not steal adjacent action');await touchPage.touchscreen.tap(point.x,point.y);count+=g.id==='touch-left'?10:100;assert.equal(await touchPage.locator('#counter').textContent(),`已操作 ${count} 次`);hits.push({...point,owner});}}
            item.touch={status:'PASS',pointer:'coarse emulated',geometry,hits,limitation:'Coordinate hit testing and browser touch events; physical touchscreen not tested'};
          }finally{await closeWithTimeout(touchContext,'consumer coarse context');}
        }
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
