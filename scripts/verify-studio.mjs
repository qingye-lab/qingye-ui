import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, cpSync, symlinkSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { withBrowser, closeWithTimeout } from './browser-runtime.mjs';
import { measureTextContrast } from './lib/browser-contrast.mjs';

const root=process.cwd(),outBase=resolve('test-results/studio');mkdirSync(outBase,{recursive:true});
const out=mkdtempSync(join(outBase,'run-')),port=5182,base=`http://127.0.0.1:${port}`;
const fixtures=['azure','amber'].map(brand=>{const dest=join(out,brand);cpSync(resolve('apps/studio/fixtures',brand),dest,{recursive:true});symlinkSync(resolve('apps/studio/node_modules'),join(dest,'node_modules'));const config=JSON.parse(readFileSync(join(dest,'ui.config.json'),'utf8'));config.ledger=resolve('docs/token-ledger.json');config.ledgerRoot=root;writeFileSync(join(dest,'ui.config.json'),JSON.stringify(config,null,2)+'\n');return dest;});
const report={startedAt:new Date().toISOString(),fixtures,cases:[],errors:[],limitations:['Uses isolated local fixture projects; no real product theme was written.','Computed properties and keyboard checks do not prove physical-device, IME or screen-reader acceptance.']};
const members=group=>execFileSync('ps',['-axo','pid=,ppid=,pgid='],{encoding:'utf8'}).trim().split('\n').map(line=>line.trim().split(/\s+/).map(Number)).filter(row=>row[2]===group);
const server=spawn('pnpm',['--filter','@qingye/studio','exec','vite','preview','--host','127.0.0.1','--port',String(port),'--strictPort'],{cwd:root,env:{...process.env,QINGYE_STUDIO_PROJECTS:fixtures.join(',')},detached:true,stdio:['ignore','pipe','pipe']});
report.server={pid:server.pid,parent:process.pid,processGroup:server.pid,base,closed:false};
let logs='',launchError;server.stdout.on('data',d=>logs+=d);server.stderr.on('data',d=>logs+=d);server.once('error',e=>launchError=e);
const check=(name,evidence)=>{report.cases.push({name,status:'PASS',evidence});console.log(`PASS ${name}`);};
try {
  let ready=false;for(let i=0;i<120;i++){if(launchError)throw launchError;if(server.exitCode!==null)throw Error(logs);try{const r=await fetch(`${base}/api/session`,{signal:AbortSignal.timeout(500)});const s=await r.json();if(r.ok&&s.projects?.length===2){ready=true;break;}}catch{}await delay(250);}assert.ok(ready,'Studio readiness');
  await withBrowser(async(browser,lifecycle)=>{report.lifecycle=lifecycle;const context=await browser.newContext({viewport:{width:1600,height:1100},reducedMotion:'reduce',acceptDownloads:true});try{
    const page=await context.newPage(),errors=[];page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push({text:m.text(),url:m.location().url});});
    await page.goto(base,{waitUntil:'networkidle'});await page.getByLabel('品牌标识').waitFor();
    const left=page.frameLocator('iframe[title="已应用真实组件预览"]'),right=page.frameLocator('iframe[title="候选真实组件预览"]');
    await left.getByRole('textbox',{name:'标题',exact:true}).fill('左侧独立草稿');await right.getByRole('textbox',{name:'标题',exact:true}).fill('右侧独立草稿');
    await right.getByRole('checkbox',{name:'选择异常与恢复'}).check();await right.getByRole('button',{name:'模拟保存失败'}).click();
    await page.getByLabel('候选明暗',{exact:true}).selectOption('light');
    await page.getByRole('button',{name:'载入 Amber 合成主题'}).click();
    await page.waitForTimeout(500);
    assert.equal(await right.locator('#draft-title').inputValue(),'右侧独立草稿');assert.equal(await left.getByRole('textbox',{name:'标题',exact:true}).inputValue(),'左侧独立草稿');assert.equal(await right.getByRole('checkbox',{name:'选择异常与恢复'}).isChecked(),true);assert.ok((await right.locator('[data-testid="draft-result"]').innerText()).includes('保存失败'));
    const axes=await Promise.all([left.locator('html').evaluate(el=>({brand:el.dataset.brand,classes:el.className,density:el.dataset.density})),right.locator('html').evaluate(el=>({brand:el.dataset.brand,classes:el.className,density:el.dataset.density}))]);assert.equal(axes[0].brand,'azure');assert.equal(axes[1].brand,'amber');check('Two document brands and independent task state',axes);
    const colors=await Promise.all([left.getByRole('button',{name:'主要动作',exact:true}).evaluate(el=>getComputedStyle(el).backgroundColor),right.getByRole('button',{name:'主要动作',exact:true}).evaluate(el=>getComputedStyle(el).backgroundColor)]);assert.notEqual(...colors);check('Independent brand CSS reaches real button',colors);
    const portalPaint = async (locator) => locator.evaluate(element => {
      const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');
      const rgba=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data];};
      const probe=document.createElement('div');probe.style.backgroundColor='var(--qy-surface-raised)';element.ownerDocument.body.append(probe);
      const expected=rgba(getComputedStyle(probe).backgroundColor);probe.remove();
      return {actual:rgba(getComputedStyle(element).backgroundColor),expected,brand:document.documentElement.dataset.brand,density:document.documentElement.dataset.density,dark:document.documentElement.classList.contains('dark')};
    });
    const paints=[];
    const verifyPortal = async (name,locator) => {const value=await portalPaint(locator);assert.deepEqual(value.actual,value.expected,`${name} actual portal surface inherits own document token`);paints.push({name,...value});};
    for(const [name,frame]of [['left',left],['right',right]]){
      await frame.getByRole('combobox',{name:'用途'}).click();await verifyPortal(`${name} Select`,frame.locator('[data-slot=select-popup] .bg-popover').first());await frame.getByRole('option',{name:'比较',exact:true}).click();
      await frame.getByRole('button',{name:'记录操作',exact:true}).click();await verifyPortal(`${name} Menu`,frame.locator('[data-slot=menu-popup]'));await frame.getByRole('menuitem',{name:'标记为待补充'}).click();
      await frame.getByRole('button',{name:'预览变更',exact:true}).click();await frame.getByRole('dialog').waitFor();assert.equal(await page.getByRole('dialog').count(),0,'no portal in parent document');
      await verifyPortal(`${name} Dialog initial`,frame.locator('[data-slot=dialog-popup]'));
      if(name==='right') {
        await page.getByLabel('候选明暗',{exact:true}).selectOption('dark');await page.getByLabel('候选密度',{exact:true}).selectOption('default');await page.waitForTimeout(200);assert.equal(await right.locator('html').evaluate(el=>el.classList.contains('dark')&&el.dataset.density==='default'),true);
        await verifyPortal('right Dialog changed while open',frame.locator('[data-slot=dialog-popup]'));
        assert.equal(await left.locator('html').evaluate(el=>el.classList.contains('dark')),false);
        assert.equal(await left.getByRole('textbox',{name:'标题',exact:true}).inputValue(),'左侧独立草稿');
        assert.equal(await right.locator('#draft-title').inputValue(),'右侧独立草稿');
        await frame.getByRole('dialog').click();
      }
      await page.keyboard.press('Escape');await frame.getByRole('dialog').waitFor({state:'hidden'});assert.equal(await frame.getByRole('button',{name:'预览变更',exact:true}).evaluate(el=>el===document.activeElement),true);
      await frame.getByRole('button',{name:'展示 Toast',exact:true}).click();await frame.getByText('本地通知预览',{exact:true}).waitFor();await verifyPortal(`${name} Toast`,frame.locator('[data-slot=toast-root]').first());
      check(`${name} Select/Menu/Dialog/Toast in owned document`,'Dialog Escape returns focus; parent contains no dialog');
    }
    check('Portal computed surfaces follow each document through independent theme/density changes',paints);
    await page.getByLabel('候选明暗',{exact:true}).selectOption('light');await page.getByLabel('候选密度',{exact:true}).selectOption('default');
    await page.getByRole('button',{name:'重置未应用修改'}).click();await page.getByLabel('编辑范围',{exact:true}).selectOption('common');
    const radius=page.getByLabel('--qy-radius-control',{exact:true});await radius.fill('19px');await page.waitForTimeout(500);
    assert.equal(await right.getByRole('button',{name:'主要动作',exact:true}).evaluate(el=>getComputedStyle(el).borderTopLeftRadius),'19px');
    assert.notEqual(await left.getByRole('button',{name:'主要动作',exact:true}).evaluate(el=>getComputedStyle(el).borderTopLeftRadius),'19px');
    await page.getByRole('button',{name:'应用主题',exact:true}).click();await page.getByText('主题源与生成 CSS 已应用。实际浏览器效果需要继续核验。',{exact:true}).waitFor();
    assert.equal(JSON.parse(readFileSync(join(fixtures[0],'ui.theme.json'),'utf8')).common['--qy-radius-control'],'19px');
    await page.waitForFunction(()=>{
      const frame=document.querySelector('iframe[title="已应用真实组件预览"]');
      const button=[...(frame?.contentDocument?.querySelectorAll('button')??[])].find(el=>el.textContent==='主要动作');
      return button&&frame.contentWindow.getComputedStyle(button).borderTopLeftRadius==='19px';
    });
    assert.equal(await left.getByRole('button',{name:'主要动作',exact:true}).evaluate(el=>getComputedStyle(el).borderTopLeftRadius),'19px');
    check('Diff/apply writes source and CSS then updates applied preview','19px reaches both real buttons after explicit apply');
    await radius.fill('21px');await page.waitForTimeout(400);
    const source=join(fixtures[0],'ui.theme.json'),external=JSON.parse(readFileSync(source,'utf8'));external.common['--qy-radius-control']='23px';writeFileSync(source,JSON.stringify(external,null,2)+'\n');
    const conflictWait=page.waitForResponse(r=>r.url()===`${base}/api/theme?project=0`&&r.status()===409);await page.getByRole('button',{name:'应用主题',exact:true}).click();const conflict=await conflictWait;report.expectedConflict={url:conflict.url(),status:conflict.status(),body:await conflict.json()};await page.getByRole('alert').filter({hasText:'SOURCE_CONFLICT'}).waitFor();assert.equal(JSON.parse(readFileSync(source,'utf8')).common['--qy-radius-control'],'23px');
    check('Concurrent source edit rejected','23px external source preserved; stale 21px candidate not applied');
    await page.getByRole('button',{name:'重新读取',exact:true}).click();await page.waitForTimeout(300);
    const downloadWait=page.waitForEvent('download');await page.getByRole('button',{name:'导出候选'}).click();const download=await downloadWait;await download.saveAs(join(out,'export.json'));assert.equal(JSON.parse(readFileSync(join(out,'export.json'),'utf8')).common['--qy-radius-control'],'23px');
    await page.locator('#theme-import').setInputFiles({name:'import.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...external,common:{...external.common,'--qy-radius-control':'17px'}}))});await page.waitForTimeout(500);assert.equal(await radius.inputValue(),'17px');await page.getByRole('button',{name:'重置未应用修改'}).click();assert.equal(await radius.inputValue(),'23px');check('Export/import/reset','Candidate-only import/reset preserves applied source');
    await page.waitForFunction(()=>{
      const frame=document.querySelector('iframe[title="候选真实组件预览"]');
      const button=[...(frame?.contentDocument?.querySelectorAll('button')??[])].find(el=>el.textContent==='主要动作');
      return button&&frame.contentWindow.getComputedStyle(button).borderTopLeftRadius==='23px';
    });
    await page.getByLabel('点击查询元素归属').check();
    await right.locator('body').evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const impactResponse=page.waitForResponse(r=>r.url()===`${base}/api/impact?project=0&slot=button`);
    await right.getByRole('button',{name:'主要动作',exact:true}).click();assert.equal((await impactResponse).status(),200);
    await page.waitForFunction(()=>document.querySelector('.evidence')?.textContent.includes('button'));
    assert.ok((await page.locator('.evidence').innerText()).includes('button'));await page.getByLabel('点击查询元素归属').uncheck();
    const checkResponse=page.waitForResponse(r=>r.url()===`${base}/api/check?project=0`);await page.getByRole('button',{name:'运行当前项目报告'}).click();assert.equal((await checkResponse).status(),200);const reportsResponse=page.waitForResponse(r=>r.url()===`${base}/api/reports`);await page.getByRole('button',{name:'读取多项目已有报告'}).click();assert.equal((await reportsResponse).status(),200);await page.waitForFunction(()=>document.querySelector('.reports')?.textContent.includes('NOT_RUN'));check('Element owner lookup and stored reports','Missing other-project report remains NOT_RUN');
    await page.getByLabel('已登记项目',{exact:true}).selectOption('1');await page.waitForTimeout(500);assert.equal(await left.locator('html').getAttribute('data-theme'),'light');assert.equal(await left.locator('html').evaluate(el=>el.classList.contains('light')||el.classList.contains('dark')),false);check('Attribute-mode project','data-theme mode keeps brand and density independent');
    // Force the older project response to arrive last. Requests use the real
    // isolated fixture service; only delivery order is controlled here.
    let releaseA, releaseB, markA, markB;
    const heldA=new Promise(resolve=>{releaseA=resolve;}),heldB=new Promise(resolve=>{releaseB=resolve;});
    const sawA=new Promise(resolve=>{markA=resolve;}),sawB=new Promise(resolve=>{markB=resolve;});
    const projectRoute='**/api/project?project=*';
    await page.route(projectRoute,async route=>{
      const id=new URL(route.request().url()).searchParams.get('project');
      const response=await route.fetch();
      if(id==='0'){markA();await heldA;}else if(id==='1'){markB();await heldB;}
      await route.fulfill({response});
    });
    try {
      const aUnchanged=readFileSync(source,'utf8');
      await page.getByLabel('已登记项目',{exact:true}).selectOption('0');await sawA;
      const applying=page.getByRole('button',{name:'应用主题',exact:true});
      assert.ok(await applying.count()===0||await applying.isDisabled(),'loading cannot apply the prior project candidate');
      await page.getByLabel('已登记项目',{exact:true}).selectOption('1');await sawB;
      assert.ok(await applying.count()===0||await applying.isDisabled(),'second project loading cannot apply the prior candidate');
      releaseB();await page.waitForFunction(()=>document.querySelector('#brand')?.value==='amber');
      const oldResponse=page.waitForResponse(r=>r.url()===`${base}/api/project?project=0`);releaseA();await oldResponse;
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      assert.equal(await page.getByLabel('已登记项目',{exact:true}).inputValue(),'1');
      assert.equal(await page.getByLabel('品牌标识',{exact:true}).inputValue(),'amber','late A cannot replace the current B editor');
      await page.unroute(projectRoute);
      await page.getByLabel('编辑范围',{exact:true}).selectOption('common');
      await radius.fill('29px');
      await page.waitForFunction(()=>!Array.from(document.querySelectorAll('button')).find(button=>button.textContent==='应用主题')?.disabled);
      const appliedB=page.waitForRequest(request=>request.url()===`${base}/api/theme?project=1`&&request.method()==='POST'&&request.postDataJSON()?.apply===true);
      await page.getByRole('button',{name:'应用主题',exact:true}).click();
      const body=(await appliedB).postDataJSON();assert.equal(body.theme.brand,'amber');
      await page.getByText('主题源与生成 CSS 已应用。实际浏览器效果需要继续核验。',{exact:true}).waitFor();
      assert.equal(readFileSync(source,'utf8'),aUnchanged,'switching projects must not write to A');
      assert.equal(JSON.parse(readFileSync(join(fixtures[1],'ui.theme.json'),'utf8')).common['--qy-radius-control'],'29px');
      check('Reordered project responses preserve the selected editor and apply target',{arrivalOrder:['B','A'],selected:'1',brand:body.theme.brand,appliedRadius:'29px',otherProjectUnchanged:true,blockedWhileLoading:true});
    }finally{releaseA();releaseB();await page.unroute(projectRoute);}
    for(const width of [1600,390]){await page.setViewportSize({width,height:1100});await page.waitForTimeout(200);await page.screenshot({path:join(out,`studio-${width}.png`),fullPage:true}); const geometry=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].map(el=>({tag:el.tagName,cls:el.className,left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right,width:el.getBoundingClientRect().width,text:(el.textContent??'').slice(0,120)})).filter(e=>e.right>innerWidth+2||e.left < -2).slice(0,20)}));report.geometry??=[];report.geometry.push(geometry);assert.ok(geometry.scroll<=geometry.width+2,`Studio page overflow ${width}: ${JSON.stringify(geometry)}`);}
    const expectedErrors=errors.filter(e=>e.url===report.expectedConflict.url&&e.text==='Failed to load resource: the server responded with a status of 409 (Conflict)');assert.equal(expectedErrors.length,1);assert.deepEqual(errors.filter(e=>!expectedErrors.includes(e)),[]);report.expectedConsoleErrors=expectedErrors;report.runtimeErrors=[];report.contrast=[];for(const frame of [left,right]){const contrast=await frame.locator('body').evaluate(measureTextContrast);report.contrast.push(contrast);assert.deepEqual(contrast.failures,[],'Preview computed text contrast');}const shellContrast=await page.locator('main').evaluate(measureTextContrast);report.contrast.push(shellContrast);assert.deepEqual(shellContrast.failures,[],'Studio computed text contrast');
  }finally{await closeWithTimeout(context,'Studio context');}});
}catch(error){report.errors.push(error.stack??error.message);console.error(error);process.exitCode=1;}
finally{writeFileSync(join(out,'server.log'),logs);if(server.pid&&members(server.pid).length){process.kill(-server.pid,'SIGTERM');for(let i=0;i<20&&members(server.pid).length;i++)await delay(250);if(members(server.pid).length){process.kill(-server.pid,'SIGKILL');await delay(250);}if(members(server.pid).length){report.errors.push('owned server cleanup failure');process.exitCode=1;}else report.server.closed=true;}report.completedAt=new Date().toISOString();report.status=report.errors.length?'FAIL':'PASS';writeFileSync(join(out,'report.json'),JSON.stringify(report,null,2)+'\n');console.log(join(out,'report.json'));}
