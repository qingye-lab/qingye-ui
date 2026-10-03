// Serial final runtime owner. Use --phase risks to inspect the changed danger
// edge before the complete matrix. No dev/preview server is launched here.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { withBrowser, closeWithTimeout } from './browser-runtime.mjs';
import { probeBrandBeforeMount, probeDanger, probeDangerFocus, probeFixedReserves, probeInputTypography } from './ui-foundations-runtime.mjs';
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
    const fine = await browser.newContext({ viewport: { width: 1100, height: 900 }, reducedMotion: 'reduce', colorScheme: 'light' });
    try {
      const page = await fine.newPage();
      page.on('pageerror', error => evidence.errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') evidence.errors.push(message.text()); });
      evidence.brand = await probeBrandBeforeMount(page, base); console.log('brand '+evidence.brand.pass);
      evidence.danger = await probeDanger(page, base); console.log('danger '+JSON.stringify(evidence.danger.map(x => ({theme:x.theme,variant:x.variant,state:x.state,text:x.textContrast,border:x.borderOuterContrast,pass:x.pass}))));
      evidence.dangerFocus = await probeDangerFocus(page, base); console.log('danger focus '+JSON.stringify(evidence.dangerFocus.map(x => ({theme:x.theme,failures:x.failures,pass:x.pass}))));
      for (const width of [1100]) {
        evidence.fixedReserves.push(...await probeFixedReserves(page, base, { width }));
        for (const theme of ['light', 'dark']) evidence.typography.push(...await probeInputTypography(page, base, { width, theme }));
      }
      console.log('reserves '+JSON.stringify(evidence.fixedReserves.map(x => ({component:x.component,width:x.width,pass:x.pass,states:x.states}))));
      if (phase === 'all') {
        for (const width of [1100]) {
          evidence.dimensions.push(...await probeDimensions(page, base, { width, expectedCoarse: false }));
          evidence.spacingAndType.push(...await probeSpacingAndType(page, base, { width }));
        }
        evidence.radiusAndFocus.push(...await probeRadiusAndFocus(page, base));
        ledger = await runTokenLedgerProbe(page, { ledger, baseURL: base, modes: [{ theme: 'light', viewport: 'desktop', width: 1100, height: 900 }, { theme: 'dark', viewport: 'desktop', width: 1100, height: 900 }], onProgress: ({ observation }) => console.log('ledger '+observation.id+' '+observation.observation) });
      }
    } finally { await closeWithTimeout(fine, 'fine context'); }
  });
} catch (error) { evidence.errors.push(error.message); }
finally {
  evidence.completedAt = new Date().toISOString();
  evidence.controlFindings = [
    ...evidence.typography.filter(x => !x.pass).map(x => `typography ${x.component} ${x.width} ${x.theme}: ${x.failures.join(",")}`),
    ...evidence.dimensions.filter(x => !x.pointerMatches || !x.defaultHeightMatches || x.before?.missing || x.changed?.missing || Math.abs(x.changed.height - 35) > 0.1).map(x => `dimensions ${x.component} ${x.width}`),
    ...evidence.spacingAndType.filter(x => x.roleGeometryStable === false || x.capacityPass === false || x.states.some(s => s.missing)).map(x => `spacing ${x.component} ${x.width}: ${x.capacityFailures.map(failure => failure.reason).join(',')}`),
    ...evidence.radiusAndFocus.filter(x => x.before?.missing || x.roles?.missing || x.zero?.missing || x.focus.some(s => !s.focusVisible)).map(x => `radius/focus ${x.component}`),
  ];
  evidence.dangerBorderFindings = (evidence.danger ?? []).filter(x => x.variant === 'bordered' && x.state === 'normal' && x.boundaryRequired !== false && x.borderOuterContrast < 3).map(x => `${x.theme}: ${x.borderOuterContrast}`);
  evidence.dangerFocusFindings = (evidence.dangerFocus ?? []).filter(x => !x.pass).map(x => `${x.theme}: ${x.failures.join(',')}`);
  if (phase === 'all') { evidence.ledgerCounts = ledger.computation.counts; evidence.staticPathStatus = ledger.computation.counts.UNVERIFIED ? 'UNVERIFIED' : ledger.computation.counts.NOT_RUN ? 'NOT_RUN' : 'PASS'; evidence.ledgerFindings = (ledger.runtime?.observations ?? []).filter(row => row.error || row.observation === 'NOT_OBSERVED' || !row.validOverride).map(row => ({ id: row.id, observation: row.observation, error: row.error })); writeFileSync(`${out}/token-ledger.json`, JSON.stringify(ledger, null, 2)+'\n'); }
  evidence.runtimeStatus = evidence.errors.length || evidence.controlFindings.length || evidence.ledgerFindings?.length || evidence.dangerBorderFindings.length || evidence.dangerFocusFindings.length || !evidence.brand?.pass || evidence.danger?.some(row => !row.pass) || evidence.fixedReserves.some(row => !row.pass) ? 'FAIL' : 'PASS';
  evidence.acceptance = 'Runtime computed contracts and unresolved static paths are reported separately; runtime PASS does not promote a static UNVERIFIED path.';
  writeFileSync(`${out}/runtime.json`, JSON.stringify(evidence, null, 2)+'\n');
}
const failures = evidence.errors.length || evidence.controlFindings.length || evidence.ledgerFindings?.length || evidence.dangerBorderFindings.length || evidence.dangerFocusFindings.length || !evidence.brand?.pass || evidence.danger?.some(x => !x.pass) || evidence.fixedReserves.some(x => !x.pass);
if (failures) process.exitCode = 1;
// Radius/focus/spacing rows and border contrast are measured facts for explicit
// review; missing data is never promoted to an overall acceptance assertion.
