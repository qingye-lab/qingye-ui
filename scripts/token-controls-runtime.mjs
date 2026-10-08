// Caller owns page/context/browser lifecycle. Every export uses only the supplied tab.
const slots = {
  button: '[data-slot="button"]', input: '[data-slot="input-control"]',
  select: '[data-slot="select-trigger"]', group: '[data-slot="input-group"]',
  card: '[data-slot="card"]', field: '[data-slot="field"]',
};
async function route(page, baseURL, component, theme) {
  if (!['light','dark'].includes(theme)) throw new Error('theme must be light or dark');
  const url=new URL(`/playground/${component}`,baseURL);url.searchParams.set('theme',theme);
  await page.goto(url.href);
  await page.locator('[data-playground] [data-demo]').first().waitFor();
  await page.waitForFunction(theme => {
    const root=document.documentElement,c=getComputedStyle(root);
    return root.classList.contains(theme) && !root.classList.contains(theme==='dark'?'light':'dark') && c.colorScheme===theme && c.getPropertyValue('--qy-control-md').trim();
  },theme);
  await page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
}
async function preserve(page, fn) {
  const before = await page.evaluate(() => ({ style: document.documentElement.getAttribute('style'), class: document.documentElement.getAttribute('class'), brand: document.documentElement.getAttribute('data-brand'), theme: document.documentElement.getAttribute('data-theme'), density: document.documentElement.getAttribute('data-density') }));
  try { return await fn(); } finally {
    await page.evaluate(before => {
      for (const [key, attr] of [['style','style'],['class','class'],['brand','data-brand'],['theme','data-theme'],['density','data-density']]) {
        const value=before[key]; if(value===null) document.documentElement.removeAttribute(attr); else document.documentElement.setAttribute(attr,value);
      }
      document.querySelector('[data-token-probe-fixture]')?.remove();
    }, before);
  }
}
async function token(page, name, value, {settle=false}={}) {
  await page.evaluate(({name,value}) => document.documentElement.style.setProperty(name,value), {name,value});
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  if (settle) {
    // Honor actual CSS transition durations; reduced motion is not presumed to remove shadows.
    const duration=await page.evaluate(() => Math.max(0,...[...document.querySelectorAll('[data-slot=button],[data-slot=input-control],[data-slot=input-group]')].map(e => {
      const c=getComputedStyle(e),dur=c.transitionDuration.split(',').map(v=>parseFloat(v)*(v.trim().endsWith('ms')?1:1000)),del=c.transitionDelay.split(',').map(v=>parseFloat(v)*(v.trim().endsWith('ms')?1:1000));
      return Math.max(...dur.map((d,i)=>d+(del[i%del.length]||0)));
    })));
    await page.waitForTimeout(duration+40);
  }
}
async function sample(page, selector, {defaultMd=false}={}) {
  return page.evaluate(({selector,defaultMd}) => {
    const candidates=[...document.querySelectorAll(selector)].filter(e => e.getBoundingClientRect().height>0 && !e.disabled);
    const e=(defaultMd?candidates.find(e=>e.dataset.size==='md'):null)||candidates[0];
    if(!e) return {missing:selector};
    const c=getComputedStyle(e),a=getComputedStyle(e,'::after'),b=getComputedStyle(e,'::before'),r=e.getBoundingClientRect(),svg=e.querySelector('svg'),sr=svg?.getBoundingClientRect();
    const bounds=rect=>({left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom,width:rect.width,height:rect.height});
    const value=e.querySelector('[data-slot="select-value"]');
    let content=null;
    if(value){
      const rect=value.getBoundingClientRect(),walker=document.createTreeWalker(value,NodeFilter.SHOW_TEXT),glyphs=[];let node;
      while((node=walker.nextNode()))if(node.textContent.trim()){const range=document.createRange();range.selectNodeContents(node);for(const glyph of range.getClientRects())if(glyph.width&&glyph.height)glyphs.push(bounds(glyph));}
      content={text:value.textContent.trim(),rect:bounds(rect),clientWidth:value.clientWidth,scrollWidth:value.scrollWidth,glyphs};
    }
    return {slot:e.dataset.slot, className:String(e.className), text:(e.textContent||'').trim().slice(0,60), width:r.width,height:r.height,minHeight:c.minHeight,bounds:bounds(r),paddingInlineStart:c.paddingInlineStart,paddingInlineEnd:c.paddingInlineEnd,paddingBlockStart:c.paddingBlockStart,paddingBlockEnd:c.paddingBlockEnd,gap:c.gap,fontSize:c.fontSize,lineHeight:c.lineHeight,letterSpacing:c.letterSpacing,fontWeight:c.fontWeight,borderTopWidth:c.borderTopWidth,borderBottomWidth:c.borderBottomWidth,borderTopColor:c.borderTopColor,borderRadius:c.borderRadius,beforeRadius:b.borderRadius,boxShadow:c.boxShadow,focusVisible:e.matches(':focus-visible')||!!e.querySelector(':focus-visible'),theme:{light:document.documentElement.classList.contains('light'),dark:document.documentElement.classList.contains('dark'),colorScheme:getComputedStyle(document.documentElement).colorScheme},ringWidth:c.getPropertyValue('--tw-ring-shadow'),after:{content:a.content,width:a.width,height:a.height,minWidth:a.minWidth,minHeight:a.minHeight},icon:sr?{width:sr.width,height:sr.height}:null,iconBounds:sr?bounds(sr):null,content,pointerCoarse:matchMedia('(pointer: coarse)').matches,narrow:innerWidth<640};
  },{selector,defaultMd});
}
export async function probeDimensions(page,baseURL,{width=1280,expectedCoarse=false,theme='light'}={}) {
  const viewport=page.viewportSize();await page.setViewportSize({width,height:1000});const rows=[];
  try {
    for(const [component,selector] of [['button',slots.button],['input',slots.input],['select',slots.select],['input-group',slots.group]]) {
      await route(page,baseURL,component,theme);
      rows.push(await preserve(page,async()=>{
        const before=await sample(page,selector,{defaultMd:true});
        await token(page,'--qy-control-md','35px');const changed=await sample(page,selector,{defaultMd:true});
        const expected=expectedCoarse&&['input','input-group'].includes(component)?44:width<640?36:32;
        return {component,width,expectedCoarse,pointerMatches:before.pointerCoarse===expectedCoarse,before,changed,expectedDefaultHeight:expected,defaultHeightMatches:Math.abs(before.height-expected)<.1,heightDelta:changed.height-before.height,coarseTarget:expectedCoarse?{inputMin:['input','input-group'].includes(component)?before.height:null,afterMinHeight:before.after?.minHeight}:null};
      }));
    }
  } finally {if(viewport)await page.setViewportSize(viewport);}
  return rows;
}
export function spacingGeometryAssessment(component,states) {
  // Keep observed outer height separate from role stability. Select's minimum
  // height and icon/padding roles must survive a spacing override, while its
  // readable value may wrap when the containing five-column grid gets narrower.
  const first=states[0],capacityFailures=[];
  const measured=!!first&&states.every(x=>!x.missing);
  const geometryStable=measured&&states.every(x=>x.height===first.height&&JSON.stringify(x.icon)===JSON.stringify(first.icon));
  const keys=['minHeight','paddingInlineStart','paddingInlineEnd','paddingBlockStart','paddingBlockEnd','fontSize','lineHeight','borderTopWidth','borderBottomWidth'];
  const rolesStable=measured&&keys.every(key=>first[key]!==undefined&&states.every(x=>x[key]===first[key]))&&states.every(x=>JSON.stringify(x.icon)===JSON.stringify(first.icon));
  if(component==='select')for(const state of states){
    const {content,bounds,iconBounds}=state;
    if(!content?.text||!content.glyphs?.length||!bounds||!iconBounds){capacityFailures.push({base:state.base,reason:'missing-value-paint'});continue;}
    if(content.text!==first.content?.text)capacityFailures.push({base:state.base,reason:'value-changed'});
    // Use the existing 2px audit tolerance for device rounding, not a new
    // overflow allowance. Both glyphs and icon must fit their real boundary.
    const contained=rect=>rect.left>=bounds.left-2&&rect.right<=bounds.right+2&&rect.top>=bounds.top-2&&rect.bottom<=bounds.bottom+2;
    if(!content.glyphs.every(contained)||!contained(content.rect)||!contained(iconBounds)||content.scrollWidth>content.clientWidth+2||content.glyphs.some(rect=>rect.right>iconBounds.left+2))capacityFailures.push({base:state.base,reason:'value-or-icon-overflow'});
    const minHeight=parseFloat(state.minHeight),vertical=parseFloat(state.paddingBlockStart)+parseFloat(state.paddingBlockEnd)+parseFloat(state.borderTopWidth)+parseFloat(state.borderBottomWidth);
    const expectedHeight=Math.max(minHeight,content.rect.height+vertical,iconBounds.height+vertical);
    if(!Number.isFinite(expectedHeight)||state.height<minHeight-2||Math.abs(state.height-expectedHeight)>2)capacityFailures.push({base:state.base,reason:'unexplained-height',expectedHeight,height:state.height});
  }
  return {geometryStable,roleGeometryStable:component==='select'?rolesStable:geometryStable&&rolesStable,capacityPass:component==='select'?measured&&capacityFailures.length===0:null,capacityFailures};
}
export async function probeSpacingAndType(page,baseURL,{width=1280,theme='light',components=['button','input','select','field','card','input-group']}={}) {
  const viewport=page.viewportSize();await page.setViewportSize({width,height:1000});const rows=[];
  try {
    for(const [component,selector] of [['button',slots.button],['input',slots.input],['select',slots.select],['field',slots.field],['card',slots.card],['input-group',slots.group]].filter(([component])=>components.includes(component))) {
      await route(page,baseURL,component,theme);
      rows.push(await preserve(page,async()=>{
        const states=[];for(const px of [4,2,8]) {await token(page,'--qy-space-1',`${px}px`);states.push({base:px,...await sample(page,selector,{defaultMd:true})});}
        const type=await page.evaluate(()=>{
          const group=document.querySelector('[data-slot=input-group]');
          const records=group?[group,...group.querySelectorAll('[data-slot=input-group-addon],input')].map(e=>({slot:e.dataset.slot,fontSize:getComputedStyle(e).fontSize,lineHeight:getComputedStyle(e).lineHeight})):[];
          const button=document.querySelector('[data-slot=button]');if(!button)return {group:records};
          const parent=document.createElement('div');parent.dataset.tokenProbeFixture='';document.body.append(parent);
          const values=[];for(const lang of ['en','zh-CN']){const copy=button.cloneNode(true);copy.lang=lang;copy.textContent=lang==='en'?'Latin text':'中文文字';parent.append(copy);const c=getComputedStyle(copy);values.push({lang,size:c.fontSize,lineHeight:c.lineHeight,tracking:c.letterSpacing});}
          parent.remove();return {group:records,language:values};
        });
        return {component,width,states,type,...(['button','input','select','input-group'].includes(component)?spacingGeometryAssessment(component,states):{geometryStable:null,roleGeometryStable:null,capacityPass:null,capacityFailures:[]})};
      }));
    }
  }finally{if(viewport)await page.setViewportSize(viewport);}
  return rows;
}
export async function probeRadiusAndFocus(page,baseURL,{theme='light'}={}) {
  const rows=[];
  for(const [component,selector]of [['button',slots.button],['input',slots.input],['card',slots.card]]) {
    await route(page,baseURL,component,theme);
    rows.push(await preserve(page,async()=>{
      const before=await sample(page,selector);await token(page,'--qy-radius-control','2px');const root=await sample(page,selector);
      await token(page,'--qy-radius-control','3px');await token(page,'--qy-radius-panel','17px');const roles=await sample(page,selector);
      await token(page,'--qy-radius-control','0px');const zero=await sample(page,selector);
      const focus=[];
      if(component!=='card'){
        const target=component==='input'?page.locator(`${slots.input} input`).first():page.locator(selector).first();
        // A keyboard event establishes focus-visible before programmatic focus.
        await page.keyboard.press('Tab');await target.focus();
        await token(page,'--qy-ring','rgb(12,130,210)',{settle:true});
        focus.push({state:'default',...await sample(page,selector)});
        await token(page,'--qy-focus-ring-width','3px',{settle:true});focus.push({state:'button3',...await sample(page,selector)});
        await token(page,'--qy-focus-ring-width','5px',{settle:true});focus.push({state:'button5',...await sample(page,selector)});
      }
      return {component,before,root,roles,zero,focus};
    }));
  }
  return rows;
}
