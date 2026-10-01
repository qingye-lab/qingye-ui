// Serial final runtime owner. Use --phase risks to inspect the changed danger
// edge before the complete matrix. No dev/preview server is launched here.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { withBrowser, closeWithTimeout, variants } from './browser-runtime.mjs';
import { probeBrandBeforeMount, probeDanger, probeFixedReserves, probeInputTypography } from './ui-foundations-runtime.mjs';
import { probeDimensions, probeSpacingAndType, probeRadiusAndFocus } from './token-controls-runtime.mjs';
import { runTokenLedgerProbe } from './token-ledger-runtime.mjs';
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  if (!['--out', '--phase'].includes(args[i]) || !args[i + 1] || args[i + 1].startsWith('--')) throw new Error('usage: node scripts/verify-ui-foundations.mjs [--out dir] [--phase risks|all]');
}
const value = key => args.includes(key) ? args[args.indexOf(key) + 1] : undefined;
const out = value('--out') ?? 'test-results/ui-foundations-final';
const phase = value('--phase') ?? 'all';
if (!['risks', 'all'].includes(phase)) throw new Error('unknown phase');
const base = process.env.DOCS_URL ?? 'http://localhost:5180';
mkdirSync(out, { recursive: true });
const scripts = ['verify-ui-foundations.mjs', 'ui-foundations-runtime.mjs', 'token-controls-runtime.mjs', 'token-ledger-runtime.mjs', 'browser-runtime.mjs', 'run-browser-audit.mjs'];
const evidence = { phase, base, startedAt: new Date().toISOString(), scripts: scripts.map(name => ({ path: `scripts/${name}`, sha256: createHash('sha256').update(readFileSync(new URL(name, import.meta.url))).digest('hex') })), typography: [], dimensions: [], spacingAndType: [], radiusAndFocus: [], fixedReserves: [], screenshots: [], errors: [] };
let ledger = JSON.parse(readFileSync(new URL('../docs/token-ledger.json', import.meta.url)));
evidence.sourceFingerprint = ledger.static.fingerprint;
try {
  await withBrowser(async (browser, lifecycle) => {
    evidence.lifecycle = lifecycle;
    const fine = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce', colorScheme: 'light' });
    try {
      const page = await fine.newPage();
      page.on('pageerror', error => evidence.errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') evidence.errors.push(message.text()); });
      evidence.brand = await probeBrandBeforeMount(page, base); console.log('brand '+evidence.brand.pass);
      evidence.danger = await probeDanger(page, base); console.log('danger '+JSON.stringify(evidence.danger.map(x => ({theme:x.theme,variant:x.variant,state:x.state,text:x.textContrast,border:x.borderOuterContrast,pass:x.pass}))));
      for (const width of [1280, 390]) {
        evidence.fixedReserves.push(...await probeFixedReserves(page, base, { width }));
        for (const theme of ['light', 'dark']) evidence.typography.push(...await probeInputTypography(page, base, { width, theme }));
      }
      console.log('reserves '+JSON.stringify(evidence.fixedReserves.map(x => ({component:x.component,width:x.width,pass:x.pass,states:x.states}))));
      if (phase === 'all') {
        for (const width of [1280, 390]) {
          evidence.dimensions.push(...await probeDimensions(page, base, { width, expectedCoarse: false }));
          evidence.spacingAndType.push(...await probeSpacingAndType(page, base, { width }));
        }
        evidence.radiusAndFocus.push(...await probeRadiusAndFocus(page, base));
        ledger = await runTokenLedgerProbe(page, { ledger, baseURL: base, onProgress: ({ observation }) => console.log('ledger '+observation.id+' '+observation.observation) });
      }
    } finally { await closeWithTimeout(fine, 'fine context'); }
    if (phase === 'all') {
      const coarse = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce', colorScheme: 'light' });
      try {
        const page = await coarse.newPage();
        evidence.dimensions.push(...await probeDimensions(page, base, { width: 390, expectedCoarse: true }));
        ledger = await runTokenLedgerProbe(page, { ledger, baseURL: base, probeIds: ['input-touch-inner'], onProgress: ({ observation }) => console.log('ledger coarse '+observation.id+' '+observation.observation) });
      } finally { await closeWithTimeout(coarse, 'coarse context'); }
      mkdirSync(`${out}/shots`, { recursive: true });
      for (const variant of variants) {
        const context = await browser.newContext({ viewport: { width: variant.width, height: variant.height }, deviceScaleFactor: 2, isMobile: Boolean(variant.mobile), hasTouch: Boolean(variant.mobile), colorScheme: variant.theme, reducedMotion: 'reduce' });
        try {
          const page = await context.newPage();
          for (const slug of ['button', 'input', 'select', 'dialog', 'card', 'table']) {
            await page.goto(`${base}/playground/${slug}?theme=${variant.theme}`, { waitUntil: 'networkidle' });
            await page.locator('[data-playground] [data-demo]').first().waitFor(); await page.waitForTimeout(300);
            const file = `${out}/shots/${slug}-${variant.name}.png`;
            await page.screenshot({ path: file, fullPage: true });
            evidence.screenshots.push({ slug, variant, path: file, sha256: createHash('sha256').update(readFileSync(file)).digest('hex') });
            console.log('shot '+file);
          }
        } finally { await closeWithTimeout(context, 'shot context'); }
      }
    }
  });
} catch (error) { evidence.errors.push(error.message); }
finally {
  evidence.completedAt = new Date().toISOString();
  evidence.controlFindings = [
    ...evidence.typography.filter(x => !x.pass).map(x => `typography ${x.component} ${x.width} ${x.theme}: ${x.failures.join(",")}`),
    ...evidence.dimensions.filter(x => !x.pointerMatches || !x.defaultHeightMatches || x.before?.missing || x.changed?.missing || Math.abs(x.changed.height - (x.expectedCoarse && ['input', 'input-group'].includes(x.component) ? 44 : x.width < 640 ? 39 : 35)) > 0.1).map(x => `dimensions ${x.component} ${x.width}`),
    ...evidence.spacingAndType.filter(x => x.geometryStable === false || x.states.some(s => s.missing)).map(x => `spacing ${x.component} ${x.width}`),
    ...evidence.radiusAndFocus.filter(x => x.before?.missing || x.roles?.missing || x.zero?.missing || x.focus.some(s => !s.focusVisible)).map(x => `radius/focus ${x.component}`),
  ];
  evidence.dangerBorderFindings = (evidence.danger ?? []).filter(x => x.variant === 'filled' && x.state === 'normal' && x.borderOuterContrast < 3).map(x => `${x.theme}: ${x.borderOuterContrast}`);
  if (phase === 'all') { evidence.ledgerCounts = ledger.computation.counts; writeFileSync(`${out}/token-ledger.json`, JSON.stringify(ledger, null, 2)+'\n'); }
  writeFileSync(`${out}/runtime.json`, JSON.stringify(evidence, null, 2)+'\n');
}
const failures = evidence.errors.length || evidence.controlFindings.length || evidence.dangerBorderFindings.length || !evidence.brand?.pass || evidence.danger?.some(x => !x.pass) || evidence.fixedReserves.some(x => !x.pass);
if (failures) process.exitCode = 1;
// Radius/focus/spacing rows and border contrast are measured facts for explicit
// review; missing data is never promoted to an overall acceptance assertion.
