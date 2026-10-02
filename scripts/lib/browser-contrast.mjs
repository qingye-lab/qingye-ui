// Browser-only evaluator: pass to page/frame/locator.evaluate. No inferred token ratios.
export function measureTextContrast(root = document.body) {
  const canvas = document.createElement('canvas'); canvas.width=canvas.height=1;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  function color(value) { ctx.clearRect(0,0,1,1);ctx.fillStyle=value;ctx.fillRect(0,0,1,1);const v=ctx.getImageData(0,0,1,1).data;return [v[0],v[1],v[2],v[3]/255]; }
  function over(f,b){const a=f[3]+b[3]*(1-f[3]);return a===0?[0,0,0,0]:[0,1,2].map(i=>(f[i]*f[3]+b[i]*b[3]*(1-f[3]))/a).concat(a);}
  function background(el){const chain=[];for(let node=el;node;node=node.parentElement)chain.unshift(getComputedStyle(node));let bg=[255,255,255,1];for(const s of chain){if(s.backgroundImage!=='none')return null;bg=over(color(s.backgroundColor),bg);}return bg;}
  function lum(v){const s=v.slice(0,3).map(x=>{const c=x/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;});return .2126*s[0]+.7152*s[1]+.0722*s[2];}
  const records=[],unverified=[];
  for(const el of [root,...root.querySelectorAll('*')]){
    // Closed details descendants can retain layout boxes from an earlier open
    // state. They are not painted; only the summary participates in contrast.
    let collapsed=false;
    for(let node=el.parentElement;node;node=node.parentElement){if(node.tagName==='DETAILS'&&!node.open){const summary=node.querySelector(':scope > summary');if(!summary?.contains(el)){collapsed=true;break;}}}
    if(collapsed || (el.checkVisibility && !el.checkVisibility({checkVisibilityCSS:true,checkOpacity:true,contentVisibilityAuto:true})))continue;
    if(!el.getClientRects().length||el.closest('[hidden], [inert], [disabled], [aria-disabled="true"]'))continue;
    const inputValue=(el instanceof HTMLTextAreaElement || (el instanceof HTMLInputElement && !['checkbox','radio','range','color','file','hidden'].includes(el.type))) ? el.value : '';
    if(!inputValue && ![...el.childNodes].some(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim()))continue;
    const s=getComputedStyle(el);if(s.visibility==='hidden'||s.display==='none')continue;
    const rect=el.getBoundingClientRect();if(rect.width<=1||rect.height<=1)continue;
    const text=(inputValue || [...el.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent.trim()).join(' ')).slice(0,100);
    const bg=background(el), opacity=[];for(let n=el;n;n=n.parentElement)if(Number(getComputedStyle(n).opacity)<1)opacity.push(Number(getComputedStyle(n).opacity));
    if(!bg||opacity.length){unverified.push({text,reason:!bg?'Background image needs pixel sampling':'Ancestor opacity needs group compositing'});continue;}
    const fg=over(color(s.color),bg),a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05),fontSize=parseFloat(s.fontSize),fontWeight=parseInt(s.fontWeight,10),threshold=fontSize>=24||(fontSize>=18.666&&fontWeight>=700)?3:4.5;
    records.push({tag:el.tagName,slot:el.getAttribute('data-slot'),text,foreground:s.color,background:bg,fontSize,fontWeight,ratio,threshold,status:ratio+.02>=threshold?'PASS':'FAIL'});
  }
  return {records,unverified,failures:records.filter(r=>r.status==='FAIL'),scope:'Actual computed text over solid ancestor colors; no claim about placeholders, images, disabled controls or graphical boundaries.'};
}
