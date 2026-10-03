// P1：测量真实 React 控件与构建样式；只启动一个浏览器，页面、主题与输入环境串行。
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { withBrowser, closeWithTimeout } from './browser-runtime.mjs';
const out = process.argv[2] ?? 'test-results/p1';
mkdirSync(out, {recursive:true});
const evidence={status:'NOT_RUN',startedAt:new Date().toISOString(),cssHash:createHash('sha256').update(readFileSync('packages/ui/dist/ui.css')).digest('hex'),measurements:[],assertions:[],errors:[]};
const check=(name,pass,detail)=>evidence.assertions.push({name,status:pass?'PASS':'FAIL',detail});
const sizes=['xs','sm','md','lg','xl'],heights=[24,28,32,36,40],paddings=[10,12,14,16,16],text=[12,13,14,14,16],narrowText=[14,14,15,15,17];
const url=(process.env.DOCS_URL??'http://127.0.0.1:5180')+'/test/fixtures/p1-probes.html';
async function sample(page){return page.evaluate(()=>{
 const measure=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return{slot:e.dataset.slot,height:r.height,width:r.width,fontSize:s.fontSize,lineHeight:s.lineHeight,paddingStart:s.paddingInlineStart,paddingEnd:s.paddingInlineEnd,border:s.borderInlineStartWidth,borderColor:s.borderInlineStartColor,radius:s.borderTopLeftRadius,background:s.backgroundColor,color:s.color,boxShadow:s.boxShadow,overflowX:s.overflowX,overflowY:s.overflowY}};
 const items=Object.fromEntries([...document.querySelectorAll('[data-probe]')].map(e=>[e.dataset.probe,{...measure(e),...(e.tagName==='INPUT'?{control:measure(e.closest('[data-slot=input-control]'))}:{})}]));
 const outer=document.querySelector('[data-probe=outer-card]'),inner=document.querySelector('[data-probe=inner-card]');const a=outer.getBoundingClientRect(),b=inner.getBoundingClientRect();
 return{items,cardInset:b.left-a.left,bodyOverflow:document.documentElement.scrollWidth>innerWidth,pointerCoarse:matchMedia('(pointer:coarse)').matches};
 });}
try{await withBrowser(async(browser,lifecycle)=>{
 evidence.lifecycle=lifecycle;
 for(const config of [{width:1280,touch:false},{width:390,touch:false},{width:390,touch:true}]){
  const context=await browser.newContext({viewport:{width:config.width,height:1000},hasTouch:config.touch,isMobile:config.touch});
  try{const page=await context.newPage();page.on('pageerror',error=>evidence.errors.push(error.message));page.on('console',msg=>{if(msg.type()==='error')evidence.errors.push(msg.text())});
   for(const theme of ['light','dark']){
    await page.goto(url,{waitUntil:'networkidle'});await page.locator('[data-probe=button-md]').waitFor();await page.evaluate(t=>document.documentElement.className=t,theme);
    const before=await sample(page);evidence.measurements.push({width:config.width,theme,touch:config.touch,...before});
    sizes.forEach((size,i)=>{const b=before.items[`button-${size}`],q=before.items[`quiet-${size}`],inp=before.items[`input-${size}`],icon=before.items[`icon-${size}`];
     const nominal=heights[i]+(config.width<640?4:0),font=config.width<640?narrowText[i]:text[i];
     check(`${config.width}/${theme}/touch=${config.touch}/${size} control profiles`,b.height===nominal&&q.height===nominal&&parseFloat(b.paddingStart)===paddings[i]&&parseFloat(q.paddingStart)===paddings[i]&&parseFloat(b.fontSize)===font&&parseFloat(inp.paddingStart)===paddings[i]-1&&inp.control.height===(config.touch?Math.max(nominal,44):nominal),{button:b,quiet:q,input:inp});
     check(`${config.width}/${theme}/${size} icon form`,icon.height===nominal&&icon.width===nominal,icon);
    });
    for(const kind of ['autocomplete','combobox']) {const input=before.items[`${kind}-composition`];check(`${config.width}/${theme} ${kind} input composition reserve`,input.slot===`${kind}-input`&&parseFloat(input.paddingStart)===(config.width<640?31:29)&&parseFloat(input.paddingEnd)===(config.width<640?31:29),input);}
    const actionLines=await page.locator('[data-probe=input-group] [data-slot=button-content]').evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);return r.getClientRects().length});check(`${config.width}/${theme} composed action retains one line`,actionLines===1,actionLines);
    check(`${config.width}/${theme} composed input touch footprint`,before.items['input-group'].height===(config.touch?44:config.width<640?36:32),before.items['input-group']);
    const bare=before.items['bare-card'];check(`${config.width}/${theme} card no automatic padding`,parseFloat(bare.paddingStart)===0&&parseFloat(bare.paddingEnd)===0,bare);
    const outer=before.items['outer-card'],inner=before.items['inner-card'];check(`${config.width}/${theme} concentric nested radii`,parseFloat(outer.radius)-before.cardInset===parseFloat(inner.radius),{outerRadius:outer.radius,inset:before.cardInset,innerRadius:inner.radius});
    check(`${config.width}/${theme} nested control keeps own identity`,before.items['nested-control'].radius==='8px',before.items['nested-control']);
    check(`${config.width}/${theme} no horizontal overflow`,!before.bodyOverflow,before.bodyOverflow);
    const invalid=before.items['invalid-true'].control,valid=before.items['invalid-false'].control;check(`${config.width}/${theme} explicit invalid presentation`,invalid.borderColor!==valid.borderColor&&parseFloat(valid.border)===1,{valid,invalid});
    await page.evaluate(()=>document.documentElement.style.setProperty('--qy-space-1','8px'));const spacing=await sample(page);
    check(`${config.width}/${theme} spacing cannot change control identity`,sizes.every(s=>before.items[`button-${s}`].height===spacing.items[`button-${s}`].height&&before.items[`button-${s}`].paddingStart===spacing.items[`button-${s}`].paddingStart),spacing.items['button-md']);
    await page.evaluate(()=>{document.documentElement.style.removeProperty('--qy-space-1');document.documentElement.style.setProperty('--qy-text-body-size','30px')});const body=await sample(page);
    check(`${config.width}/${theme} content step does not change control text`,sizes.every(s=>body.items[`button-${s}`].fontSize===before.items[`button-${s}`].fontSize),body.items['button-md']);
    await page.evaluate(()=>{document.documentElement.style.removeProperty('--qy-text-body-size');document.documentElement.style.setProperty('--qy-text-control-md-size','20px');document.documentElement.style.setProperty('--qy-text-control-md-mobile-size','20px')});const type=await sample(page);
    check(`${config.width}/${theme} control type adjustment preserves padding`,type.items['button-md'].fontSize==='20px'&&type.items['button-md'].paddingStart===before.items['button-md'].paddingStart,type.items['button-md']);
    await page.evaluate(()=>{document.documentElement.style.removeProperty('--qy-text-control-md-size');document.documentElement.style.removeProperty('--qy-text-control-md-mobile-size')});
    // 状态由测试调用方切换；从不让按钮根据时间或动画推断结果。
    for(const state of ['waiting','in-progress','unknown','failed','idle']){
     await page.getByLabel('对象状态').selectOption(state);const action=page.getByRole('button',{name:'提交设备配置',exact:true});await action.focus();
     const count=await page.locator('[data-probe=activation-count]').textContent();await page.keyboard.press('Enter');
     const after=await page.locator('[data-probe=activation-count]').textContent();const blocked=['waiting','in-progress','unknown'].includes(state);
     check(`${config.width}/${theme}/${state} focus/name/activation`,await action.evaluate(e=>document.activeElement===e&&e.textContent.includes('提交设备配置'))&&(blocked?after===count:Number(after)===Number(count)+1),{before:count,after,ariaDisabled:await action.getAttribute('aria-disabled'),description:await action.getAttribute('aria-describedby')});
    }
    // 焦点与入退均来自真实原语，Esc、显式关闭、退出中重入串行检查。
    const gridIcon=page.locator('[data-probe=state-icon]');check(`${config.width}/${theme} icon identity in a grid track`,await gridIcon.evaluate(e=>{const r=e.getBoundingClientRect();return r.width===r.height}));
    const trigger=page.locator('[data-probe=popover-trigger]');await trigger.focus();await page.keyboard.press('Enter');const popup=page.locator('[data-probe=popover-popup]');await popup.waitFor();
    const popupStyle=await popup.evaluate(e=>{const s=getComputedStyle(e);return{radius:s.borderRadius,background:s.backgroundColor,overflowX:s.overflowX,overflowY:s.overflowY,transformOrigin:s.transformOrigin,transition:s.transitionProperty,role:e.getAttribute('role'),modal:e.getAttribute('aria-modal')}});
    check(`${config.width}/${theme} raised non-modal surface`,popupStyle.radius==='12px'&&popupStyle.modal!=='true'&&popupStyle.overflowX==='visible'&&popupStyle.overflowY==='visible',popupStyle);
    await page.getByRole('textbox',{name:'备注',exact:true}).focus();await page.keyboard.press('Tab');const focused=await page.evaluate(()=>{const e=document.activeElement,s=getComputedStyle(e),r=e.getBoundingClientRect(),v=e.closest('[data-slot=popover-viewport]'),b=v.getBoundingClientRect();return{slot:e.dataset.slot,boxShadow:s.boxShadow,focusVisible:e.matches(':focus-visible'),clearance:Math.min(r.left-b.left,r.top-b.top,b.right-r.right,b.bottom-r.bottom)}});
    check(`${config.width}/${theme} focus ring visible/unclipped`,focused.focusVisible&&focused.boxShadow!=='none'&&focused.clearance>=3,focused);
    await page.screenshot({path:`${out}/popup-${theme}-${config.width}${config.touch?'-touch':''}.png`,fullPage:true});
    await page.keyboard.press('Escape');await popup.waitFor({state:'detached'});check(`${config.width}/${theme} Esc returns focus`,await trigger.evaluate(e=>e===document.activeElement));
    for(const reducedMotion of ['no-preference','reduce']){
     await page.emulateMedia({reducedMotion});await trigger.click();await popup.waitFor();await page.getByRole('button',{name:'返回设备',exact:true}).click();await trigger.click();await popup.waitFor();await page.keyboard.press('Escape');await popup.waitFor({state:'detached'});check(`${config.width}/${theme}/${reducedMotion} interrupted close/reopen returns`,await trigger.evaluate(e=>e===document.activeElement));
    }
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.getByLabel('搜索设备').fill('扫码枪');await page.getByRole('button',{name:'清除搜索',exact:true}).click();check(`${config.width}/${theme} search clear retains focus`,await page.getByLabel('搜索设备').inputValue()===''&&await page.getByLabel('搜索设备').evaluate(e=>e===document.activeElement));
    await page.getByRole('button',{name:'显示密码',exact:true}).click();check(`${config.width}/${theme} visibility preserves value`,await page.getByLabel('访问口令').getAttribute('type')==='text'&&await page.getByLabel('访问口令').inputValue()==='qingye');
    evidence.measurements.at(-1).contrast=await page.evaluate(()=>{
     const rgba=color=>{const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.clearRect(0,0,1,1);x.fillStyle=color;x.fillRect(0,0,1,1);return [...x.getImageData(0,0,1,1).data].map((v,i)=>i===3?v/255:v)};
     const blend=(top,base)=>top.slice(0,3).map((v,i)=>v*top[3]+base[i]*(1-top[3]));
     const bg=e=>{const chain=[];for(let n=e;n;n=n.parentElement)chain.unshift(n);let rgb=[255,255,255];for(const n of chain)rgb=blend(rgba(getComputedStyle(n).backgroundColor),rgb);return rgb};
     const luminance=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
     const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
     return ['button-md','quiet-md','input-md','contrast-boundary'].map(id=>{const e=document.querySelector(`[data-probe=${id}]`),s=getComputedStyle(e),background=bg(e),color=blend(rgba(s.color),background);const row={id,color,background,textRatio:ratio(color,background)};if(id==='contrast-boundary'){row.borderRatio=ratio(blend(rgba(s.borderColor),background),bg(e.parentElement));row.fillRatio=1;row.paddingStart=s.paddingInlineStart;}if(id==='input-md'){const host=e.closest('[data-slot=input-control]'),hs=getComputedStyle(host);row.borderRatio=ratio(blend(rgba(hs.borderColor),bg(host)),bg(host));}else if(id==='button-md'){row.fillRatio=ratio(background,bg(e.parentElement));}return row});
    });
    for(const row of evidence.measurements.at(-1).contrast)check(`${config.width}/${theme}/${row.id} contrast`,row.textRatio>=4.5&&(row.borderRatio===undefined||row.borderRatio>=3)&&(row.id==='contrast-boundary'?row.paddingStart==='13px':row.fillRatio===undefined||row.fillRatio>=3),row);
    await page.evaluate(()=>document.documentElement.dir='rtl');check(`${config.width}/${theme} RTL does not overflow`,!(await sample(page)).bodyOverflow);await page.evaluate(()=>document.documentElement.dir='ltr');
    await page.screenshot({path:`${out}/${theme}-${config.width}${config.touch?'-touch':''}.png`,fullPage:true});
   }
  }finally{await closeWithTimeout(context,'P1 context')}
 }
})}catch(error){evidence.errors.push(error.stack??error.message)}
evidence.status=evidence.errors.length||evidence.assertions.some(a=>a.status==='FAIL')?'FAIL':'PASS';evidence.finishedAt=new Date().toISOString();writeFileSync(`${out}/runtime.json`,JSON.stringify(evidence,null,2)+'\n');console.log(JSON.stringify({status:evidence.status,assertions:evidence.assertions.length,failed:evidence.assertions.filter(a=>a.status==='FAIL'),errors:evidence.errors,lifecycle:evidence.lifecycle,out},null,2));if(evidence.status!=='PASS')process.exitCode=1;
