// Focused proof for the states demo's implicit grid track. Caller runner owns
// the built-preview server; this script owns one browser and one active tab.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {withBrowser,closeWithTimeout,variants} from './browser-runtime.mjs';
import {measurePlayground} from './audit-measure.mjs';
import {runTokenLedgerProbe} from './token-ledger-runtime.mjs';
const args=process.argv.slice(2);
if(args.length && (args.length!==2||args[0]!=='--report'||!args[1]||args[1].startsWith('--')))throw new Error('usage: node scripts/date-range-demo-proof.mjs [--report path]');
const report=args[1]??'test-results/date-range-ci-followup/proof.json';
const out=dirname(report);mkdirSync(out,{recursive:true});
const base=process.env.DOCS_URL??'http://localhost:5180';
const evidence={base,startedAt:new Date().toISOString(),pressure:[],audits:[],installation:[],errors:[]};
let ledger=JSON.parse(readFileSync(new URL('../docs/token-ledger.json',import.meta.url)));
evidence.sourceFingerprint=ledger.static.fingerprint.sha256;
const navigate=async(page,theme)=>{await page.goto(`${base}/playground/date-range-picker?theme=${theme}`,{waitUntil:'networkidle'});await page.locator('[data-demo="states"] [data-slot="field"]').first().waitFor();await page.evaluate(()=>document.fonts.ready);};
const inspectStates=page=>page.locator('[data-demo="states"] .grid').evaluate(grid=>{
 const box=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{width:r.width,left:r.left,right:r.right,minWidth:s.minWidth,fontSize:s.fontSize,lineHeight:s.lineHeight,overflow:s.overflow,textOverflow:s.textOverflow,clientWidth:e.clientWidth,scrollWidth:e.scrollWidth}};
 return{grid:box(grid),columns:getComputedStyle(grid).gridTemplateColumns,fields:[...grid.querySelectorAll('[data-slot="field"]')].map(field=>{
  const trigger=field.querySelector('[data-slot="date-picker-trigger"]'),value=trigger.querySelector('[id]');
  return{field:box(field),trigger:box(trigger),value:value?{...box(value),text:value.textContent}:null,text:trigger.textContent,disabled:trigger.disabled,labelledBy:trigger.getAttribute('aria-labelledby'),describedBy:trigger.getAttribute('aria-describedby'),labelText:(trigger.getAttribute('aria-labelledby')??'').split(' ').map(id=>document.getElementById(id)?.textContent??'').join(' ')};
 })};
});
try{
 await withBrowser(async(browser,lifecycle)=>{
  evidence.lifecycle=lifecycle;
  const context=await browser.newContext({viewport:{width:390,height:844},colorScheme:'light',reducedMotion:'reduce'});
  try{
   const page=await context.newPage();page.on('pageerror',e=>evidence.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')evidence.errors.push(m.text())});
   for(const theme of ['light','dark']){
    for(const width of [300,280])for(const inputFont of [16,18]){
     await navigate(page,theme);
     const grid=page.locator('[data-demo="states"] .grid');
     await grid.evaluate((grid,{width,inputFont})=>{grid.style.width=`${width}px`;grid.style.setProperty('--qy-text-input-mobile-size',`${inputFont}px`);grid.style.gridTemplateColumns='none';},{width,inputFont});
     const before=await inspectStates(page),beforeMeasurement=await page.evaluate(measurePlayground);
     await grid.evaluate(grid=>grid.style.removeProperty('grid-template-columns'));
     const after=await inspectStates(page),afterMeasurement=await page.evaluate(measurePlayground);
     assert(Math.abs(parseFloat(after.fields[1].trigger.fontSize)-inputFont)<0.1,'stress font reaches trigger');
     assert(after.fields.every(f=>f.field.width<=width+0.5),'minmax(0,1fr) track must fit available width');
     assert(!afterMeasurement.over.some(x=>x.demo==='states'),'fixed demo must not overflow internally');
     assert(after.fields[1].text.includes('2025年12月20日')&&after.fields[1].text.includes('2026年1月5日'),'full range remains in rendered control text');
     const trigger=page.locator('[data-demo="states"] [data-slot="date-picker-trigger"]').nth(1);
     const accessible=await trigger.ariaSnapshot();
     await trigger.click();const popup=page.locator('[data-slot="popover-popup"]').first();await popup.waitFor({state:'visible'});
     const interaction={opened:true,popup:await popup.boundingBox(),calendarCount:await popup.locator('[data-slot="calendar"]').count(),accessibleBeforeOpen:accessible};
     assert(interaction.calendarCount>0,'opened range popup renders calendar');
     await page.keyboard.press('Escape');await popup.waitFor({state:'hidden'});interaction.closedWithEscape=true;
     if(width===280&&inputFont===18)await page.locator('[data-demo="states"]').screenshot({path:`${out}/states-${theme}-280-font18.png`});
     evidence.pressure.push({theme,width,inputFont,before,beforeMeasurement,after,afterMeasurement,interaction});
     console.log(`pressure ${theme} ${width} font${inputFont}: ${before.fields[0].field.width}→${after.fields[0].field.width}`);
    }
   }
   assert(evidence.pressure.some(x=>x.before.fields.some(f=>f.field.width>x.width+2)),'pressure must reproduce original auto-track overflow');
   for(const v of variants){await page.setViewportSize({width:v.width,height:v.height});await navigate(page,v.theme);const measurement=await page.evaluate(measurePlayground);assert.equal(measurement.over.length,0,v.name);assert.equal(measurement.overflow,0,v.name);evidence.audits.push({variant:v,measurement});}
   await page.setViewportSize({width:390,height:844});
   await page.goto(`${base}/docs/installation`,{waitUntil:'networkidle'});
   const tabs=page.getByRole('tablist',{name:'包管理器'}).first();await tabs.waitFor();
   for(const manager of ['pnpm','npm','yarn']){
    const tab=tabs.getByRole('tab',{name:manager,exact:true});
    await tab.click();
    const panelId=await tab.getAttribute('aria-controls');
    assert(panelId,'tab exposes owned panel id');
    const expected=manager==='npm'?'npm install':`${manager} add`;
    await page.waitForFunction(({panelId,expected})=>{
      const panel=document.getElementById(panelId);
      const tab=[...document.querySelectorAll('[role="tab"]')].find(t=>t.getAttribute('aria-controls')===panelId);
      return tab?.getAttribute('aria-selected')==='true'&&panel?.textContent.includes(expected);
    },{panelId,expected});
    const panel=page.locator(`[id=${JSON.stringify(panelId)}]`);
    await panel.waitFor({state:'visible'});
    const code=await panel.textContent();
    assert(code.includes('gh release download')&&code.includes('&&'),'complete download and install command');
    assert(code.includes(manager==='npm'?'npm install':`${manager} add`),'matching install manager');
    assert(!code.includes('v0.2.0'),'latest command must not pin v0.2.0');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert(overflow<=1,'narrow installation page must not overflow');
    evidence.installation.push({manager,panelId,ariaSelected:await tab.getAttribute('aria-selected'),code:code.trim(),width:390,overflow});
   }
   ledger=await runTokenLedgerProbe(page,{ledger,baseURL:base,onProgress:({observation})=>console.log(`ledger ${observation.id} ${observation.observation}`)});
  }finally{await closeWithTimeout(context,'fine context')}
  const coarse=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,colorScheme:'light',reducedMotion:'reduce'});
  try{ledger=await runTokenLedgerProbe(await coarse.newPage(),{ledger,baseURL:base,probeIds:['input-touch-inner'],onProgress:({observation})=>console.log(`ledger coarse ${observation.id} ${observation.observation}`)});}finally{await closeWithTimeout(coarse,'coarse context')}
 });
}catch(error){evidence.errors.push(error.message)}finally{
 evidence.completedAt=new Date().toISOString();evidence.ledgerCounts=ledger.computation.counts;
 writeFileSync(report,JSON.stringify(evidence,null,2)+'\n');writeFileSync(`${out}/token-ledger.json`,JSON.stringify(ledger,null,2)+'\n');
}
if(evidence.errors.length||ledger.computation.counts.FAIL||ledger.computation.counts.UNVERIFIED)process.exitCode=1;
