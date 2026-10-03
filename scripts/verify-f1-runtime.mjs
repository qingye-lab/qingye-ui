// F1 §§1/2/3/8/12: computed CSS from built, real component markup.
// One task-owned browser, one page; contexts and browser close on every path.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { withBrowser, closeWithTimeout } from './browser-runtime.mjs';
const require = createRequire(new URL('../packages/ui/package.json', import.meta.url));
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { Button } = await import('../packages/ui/dist/components/button.js');
const { Input } = await import('../packages/ui/dist/components/input.js');
const { NativeSelect } = await import('../packages/ui/dist/components/native-select.js');
const { Field, FieldGroup, FieldLabel } = await import('../packages/ui/dist/components/field.js');
const { Card, CardHeader, CardTitle, CardPanel } = await import('../packages/ui/dist/components/card.js');
const { Stack, Inline } = await import('../packages/ui/dist/components/layout.js');
const { InputGroup, InputGroupInput, InputGroupTextarea, InputGroupAddon, InputGroupButton } = await import('../packages/ui/dist/components/input-group.js');
const { DatePicker } = await import('../packages/ui/dist/components/date-picker.js');
const { DateRangePicker } = await import('../packages/ui/dist/components/date-range-picker.js');
const { DateTimePicker } = await import('../packages/ui/dist/components/date-time-picker.js');
const h = React.createElement;
const steps = ['xs', 'sm', 'md', 'lg', 'xl'];
const heights = [24, 28, 32, 36, 40];
const paddings = [10, 12, 14, 16, 16];
const textDesktop = [12, 13, 14, 14, 16];
const textNarrow = [14, 14, 15, 15, 17];
const css = readFileSync(new URL('../packages/ui/dist/ui.css', import.meta.url), 'utf8');
const typeSource = readFileSync(new URL('../packages/ui/src/text-steps.ts', import.meta.url), 'utf8');
const typeSteps = [...typeSource.slice(typeSource.indexOf('export const TEXT_STEPS'), typeSource.indexOf('] as const;')).matchAll(/"([a-z-]+)"/g)].map(x => x[1]);
const svg = h('svg', { viewBox: '0 0 16 16', 'aria-hidden': true }, h('path', { d: 'M2 8h12M8 2v12' }));
const fixtures = steps.flatMap((step, i) => [
  h(Button, { key: step, size: step === 'md' ? 'default' : step, 'data-probe': `button-${step}` }, 'Save'),
  h(Button, { key: `icon-${step}`, size: step === 'md' ? 'icon' : `icon-${step}`, 'aria-label': 'Add', 'data-probe': `icon-${step}` }, svg),
  h('span', { key: `origin-${step}`, 'data-probe': `origin-${step}`, style: { display: 'inline-block', paddingInline: `${paddings[i]}px` } }, 'Save'),
]);
for (const size of ['sm', 'default', 'lg']) {
  fixtures.push(h(Input, { key: `input-${size}`, size, 'aria-label': size, 'data-probe': `input-${size}` }));
  fixtures.push(h(NativeSelect, { key: `native-${size}`, size, 'aria-label': size, 'data-probe': `native-${size}` }, h('option', {}, 'Selected')));
}
fixtures.push(h(FieldGroup, { key: 'fields' }, h(Field, {}, h(FieldLabel, {}, 'Name'), h(Input, { 'aria-label': 'Name' }))), h(Card, { key: 'panel' }, h(CardHeader, {}, h(CardTitle, {}, 'Panel')), h(CardPanel, {}, 'Contents')));
fixtures.push(...typeSteps.map(step => h('span', { key: `type-${step}`, className: `text-${step}`, lang: 'en', 'data-probe': `type-${step}` }, 'Sample')));
fixtures.push(h('span', { key: 'cjk', className: 'text-display', lang: 'zh-CN', 'data-probe': 'cjk' }, '中文标题'));
fixtures.push(h(Stack, { key: 'spacing', gap: 'section', 'data-probe': 'role-geometry' }, h(Inline, {}, 'Actions')));
fixtures.push(h(InputGroup, { key:'mixed', 'data-probe':'mixed-group' }, h(InputGroupInput, {'aria-label':'Mixed input'}), h(InputGroupAddon, {align:'inline-end'}, h(InputGroupButton, {size:'sm'}, 'Action'))));
for (const size of ['sm','lg']) fixtures.push(h(InputGroup, {key:`textarea-${size}`, 'data-probe':`textarea-group-${size}`}, h(InputGroupTextarea,{size,'aria-label':size})));
for (const size of ['sm','default','lg']) for(const [name,Component,value] of [
  ['date',DatePicker,new Date(2026,9,3)], ['range',DateRangePicker,{from:new Date(2026,9,3),to:new Date(2026,9,5)}], ['time',DateTimePicker,'2026-10-03T12:00'],
]) fixtures.push(h('section', {key:`${name}-${size}`,'data-date':`${name}-${size}`,style:{width:'280px'}},h(Component,{size,value,clearable:true})));
const html = '<!doctype html><html lang="en"><head><style>' + css + '</style></head><body>' + renderToStaticMarkup(h('main', { style: { display: 'grid', justifyItems: 'start', gap: '12px', padding: '24px' } }, fixtures)) + '</body></html>';
const out = process.argv[2] ?? 'test-results/f1';
mkdirSync(out, { recursive: true });
const evidence = { status: 'NOT_RUN', startedAt: new Date().toISOString(), cssHash: createHash('sha256').update(css).digest('hex'), measurements: [], assertions: [], errors: [] };
function check(name, pass, detail) { evidence.assertions.push({ name, status: pass ? 'PASS' : 'FAIL', detail }); }
const sample = async page => page.evaluate(() => {
  const measure = e => {
    const s = getComputedStyle(e), r = e.getBoundingClientRect(), svg = e.querySelector('svg');
    const range = document.createRange(); if (e.firstChild?.nodeType === Node.TEXT_NODE) range.selectNode(e.firstChild);
    return { height: r.height, outerHeight: ['input', 'native-select'].includes(e.dataset.slot) ? e.parentElement.getBoundingClientRect().height : r.height, width: r.width, fontSize: s.fontSize, lineHeight: s.lineHeight, weight: s.fontWeight, tracking: s.letterSpacing, paddingStart: s.paddingInlineStart, paddingEnd: s.paddingInlineEnd, border: s.borderInlineStartWidth, gap: s.gap, textOrigin: range.getClientRects().length ? range.getBoundingClientRect().left - r.left : null, icon: svg ? { width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height } : null };
  };
  return { controls: Object.fromEntries([...document.querySelectorAll('[data-probe]')].map(e => [e.dataset.probe, measure(e)])), fields: { inner: getComputedStyle(document.querySelector('[data-slot=field]')).gap, group: getComputedStyle(document.querySelector('[data-slot=field-group]')).gap }, card: { padding: getComputedStyle(document.querySelector('[data-slot=card-panel]')).paddingTop }, type: Object.fromEntries([...document.querySelectorAll('[data-probe^="type-"]')].map(e => [e.dataset.probe.slice(5), measure(e)])), textareas: ['sm','lg'].map(size=>({size,...measure(document.querySelector(`[data-probe="textarea-group-${size}"] textarea`)),paddingBlock:getComputedStyle(document.querySelector(`[data-probe="textarea-group-${size}"] textarea`)).paddingTop})), dates: [...document.querySelectorAll('[data-date]')].map(e=>{const trigger=e.querySelector('[data-slot="date-picker-trigger"]'),clear=e.querySelector('[data-slot="date-picker-clear"]');if(!trigger||!clear)return {id:e.dataset.date,missing:true};const s=getComputedStyle(trigger),r=trigger.getBoundingClientRect(),c=clear.getBoundingClientRect();return {id:e.dataset.date,paddingEnd:s.paddingInlineEnd,height:r.height,clearWidth:c.width,gap:c.left-(r.right-parseFloat(s.borderRightWidth)-parseFloat(s.paddingInlineEnd))};}) };
});
try {
  await withBrowser(async (browser, lifecycle) => {
    evidence.lifecycle = lifecycle;
    const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, reducedMotion: 'no-preference' });
    try {
      const page = await context.newPage();
      page.on('pageerror', e => evidence.errors.push(e.message));
      for (const width of [1280, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const theme of ['light', 'dark']) {
          await page.setContent(html);
          await page.evaluate(theme => document.documentElement.className = theme, theme);
          const before = await sample(page);
          evidence.measurements.push({ width, theme, before });
          steps.forEach((step, i) => {
            const b = before.controls[`button-${step}`], icon = before.controls[`icon-${step}`];
            const height = heights[i] + (width < 640 ? 4 : 0);
            check(`${width}/${theme}/${step} height/text/padding`, b.height === height && Number.parseFloat(b.fontSize) === (width < 640 ? textNarrow[i] : textDesktop[i]) && Number.parseFloat(b.paddingStart) === paddings[i] - 1, b);
            check(`${width}/${theme}/${step} icon geometry`, icon.height === height && icon.width === height && icon.icon?.width === (i < 2 ? 14 : i < 4 ? 16 : 18) + (width < 640 ? 2 : 0), icon);
            check(`${width}/${theme}/${step} text origin`, Math.abs(b.textOrigin - before.controls[`origin-${step}`].textOrigin) < 0.1, { bordered: b.textOrigin, borderless: before.controls[`origin-${step}`].textOrigin });
            if (width === 1280) check(`${step} ratio (table rounds to whole percent) and cap`, Math.round(paddings[i] / b.height * 100) >= 40 && Math.round(paddings[i] / b.height * 100) <= 44 && paddings[i] <= b.height / 2, { ratio: paddings[i] / b.height, padding: paddings[i], height: b.height });
          });
          for (const kind of ['input', 'native']) for (const [size, i] of [['sm',1], ['default',2], ['lg',3]]) {
            const value=before.controls[`${kind}-${size}`];
            check(`${width}/${theme}/${kind}-${size} outer and text profile`, value.outerHeight===heights[i]+(width<640?4:0) && Number.parseFloat(value.fontSize)===(width<640?textNarrow[i]:textDesktop[i]) && Number.parseFloat(value.paddingStart)===paddings[i]-1, value);
          }
          check(`${width}/${theme} actual section role`, before.controls['role-geometry'].gap==='20px', before.controls['role-geometry']);
          check(`${width}/${theme} mixed action does not select the input's text step`, before.controls['mixed-group'].height===(width<640?36:32) && parseFloat(before.controls['mixed-group'].fontSize)===(width<640?15:14), before.controls['mixed-group']);
          for(const value of before.textareas) check(`${width}/${theme} ${value.size} textarea remainder`, parseFloat(value.paddingBlock)===(value.size==='sm'?(width<640?5:4):(width<640?8:7)), value);
          for(const value of before.dates) check(`${width}/${theme} ${value.id} clear reserve`, !value.missing && value.gap>=3.9, value);
          await page.evaluate(() => document.documentElement.style.setProperty('--qy-space-1', '8px'));
          const spaced = await sample(page);
          evidence.measurements.at(-1).spacing8 = spaced;
          check(`${width}/${theme} spacing changes relationships, keeps control geometry`, steps.every(step => spaced.controls[`button-${step}`].height === before.controls[`button-${step}`].height && spaced.controls[`button-${step}`].paddingStart === before.controls[`button-${step}`].paddingStart && spaced.controls[`icon-${step}`].icon.width === before.controls[`icon-${step}`].icon.width) && spaced.fields.inner === '16px' && spaced.fields.group === '40px', { fields: spaced.fields });
          await page.evaluate(() => { document.documentElement.style.removeProperty('--qy-space-1'); document.documentElement.style.setProperty('--qy-text-body-size', '30px'); });
          const contentChanged = await sample(page);
          check(`${width}/${theme} body is independent from controls`, contentChanged.type.body.fontSize === '30px' && steps.every(step => contentChanged.controls[`button-${step}`].fontSize === before.controls[`button-${step}`].fontSize), contentChanged.type.body);
          await page.evaluate(() => { document.documentElement.style.removeProperty('--qy-text-body-size'); document.documentElement.style.setProperty('--qy-text-control-md-size', '13px'); });
          const controlChanged = await sample(page);
          check(`${width}/${theme} control is independent from body`, controlChanged.type.body.fontSize === before.type.body.fontSize && controlChanged.type['control-md'].fontSize === '13px', controlChanged.type['control-md']);
          check(`${width}/${theme} CJK tracking`, ['normal', '0px'].includes(before.controls.cjk.tracking), before.controls.cjk);
          await page.evaluate(() => document.documentElement.style.removeProperty('--qy-text-control-md-size'));
          await page.screenshot({ path: `${out}/${theme}-${width}.png`, fullPage: true });
        }
      }
      // All popup families are measured at the layer's state boundary; actual
      // React open/close behavior is covered separately by the component suite.
      await page.setViewportSize({ width: 1280, height: 1000 });
      await page.setContent(html);
      evidence.popup = await page.evaluate(async () => {
        const slots = ['select-popup','menu-popup','context-menu-popup','autocomplete-popup','combobox-popup','popover-popup','preview-card-content','tooltip-popup','dialog-popup','alert-dialog-popup','navigation-menu-popup'];
        const rows = [];
        for (const slot of slots) {
          const e = document.createElement('div'); e.dataset.slot = slot; document.body.append(e);
          const read = () => { const s = getComputedStyle(e); return { opacity:s.opacity, scale:s.scale, duration:s.transitionDuration, property:s.transitionProperty }; };
          e.style.transitionProperty = 'none'; e.setAttribute('data-starting-style',''); const start=read();
          e.removeAttribute('data-starting-style'); const open=read();
          e.setAttribute('data-ending-style',''); const end=read();
          e.removeAttribute('data-ending-style'); e.style.removeProperty('transition-property'); const timing=read();
          e.setAttribute('data-ending-style',''); const exitTiming=read(); e.remove();
          rows.push({slot,start,open,end,timing,exitTiming});
        }
        return rows;
      });
      for (const row of evidence.popup) check(`popup ${row.slot} start/end ownership`, row.start.opacity==='0' && row.end.opacity==='0' && row.start.scale==='0.98' && row.end.scale==='0.98', row);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      evidence.reduced = await page.evaluate(() => { const e=document.createElement('div');e.dataset.slot='menu-popup';e.setAttribute('data-starting-style','');document.body.append(e);const s=getComputedStyle(e);const result={scale:s.scale,opacity:s.opacity,property:s.transitionProperty};e.remove();return result; });
      check('reduced popup movement', ['none','1'].includes(evidence.reduced.scale) && evidence.reduced.opacity==='0', evidence.reduced);
      // Reuse the existing user-owned docs server for real interrupted cycles.
      for (const reducedMotion of ['no-preference','reduce']) {
        await page.emulateMedia({ reducedMotion });
        await page.goto((process.env.DOCS_URL??'http://localhost:5180')+'/playground/dialog', {waitUntil:'networkidle'});
        const trigger=page.getByRole('button',{name:'编辑资料',exact:true}).first();
        await trigger.click();
        await page.locator('[data-slot="dialog-popup"]').waitFor();
        await page.keyboard.press('Escape');
        await trigger.click();
        await page.locator('[data-slot="dialog-popup"]').waitFor();
        await page.getByRole('button',{name:'取消',exact:true}).last().click();
        await page.locator('[data-slot="dialog-popup"]').waitFor({state:'detached'});
        check(`real dialog keyboard exit/reentry ${reducedMotion}`, await trigger.evaluate(e=>e===document.activeElement), {focusReturned:true});
        await trigger.click();
        await page.locator('[data-slot="dialog-popup"]').waitFor();
        await page.evaluate(()=>document.documentElement.dataset.uiInput='pointer');
        await page.getByRole('button',{name:'取消',exact:true}).last().evaluate(e=>e.click());
        await page.waitForFunction(()=>{const e=document.querySelector('[data-slot="dialog-popup"]');return !e||e.hasAttribute('data-ending-style');},null,{timeout:1000});
        const interrupted=await page.evaluate(()=>{const e=document.querySelector('[data-slot="dialog-popup"]');return e?{ending:e.hasAttribute('data-ending-style'),opacity:getComputedStyle(e).opacity,scale:getComputedStyle(e).scale}:{instantClose:true};});
        await trigger.evaluate(e=>e.click());
        await page.waitForFunction(()=>{const e=document.querySelector('[data-slot="dialog-popup"]');return e&&!e.hasAttribute('data-ending-style')&&!e.hasAttribute('data-starting-style');});
        check(`real dialog interrupted exit/reentry ${reducedMotion}`, (interrupted.ending || (reducedMotion==='reduce'&&interrupted.instantClose)) && await page.locator('[data-slot="dialog-popup"]').isVisible(), interrupted);
        await page.getByRole('button',{name:'取消',exact:true}).last().click();
        await page.locator('[data-slot="dialog-popup"]').waitFor({state:'detached'});
      }
    } finally { await closeWithTimeout(context, 'F1 context'); }
  });
} catch (error) { evidence.errors.push(error.message); }
evidence.status = evidence.errors.length || evidence.assertions.some(x=>x.status==='FAIL') ? 'FAIL' : 'PASS';
evidence.finishedAt = new Date().toISOString();
writeFileSync(`${out}/runtime.json`, JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({status:evidence.status,assertions:evidence.assertions.length,failed:evidence.assertions.filter(x=>x.status==='FAIL'),errors:evidence.errors,out},null,2));
if (evidence.status!=='PASS') process.exitCode=1;
