import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, readFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { ROOT, OUT, cssDeclarations, recursiveFiles, exists, files } from './ui-facts.mjs';
import { generateCapabilities, writeCapabilities } from '../gen-capabilities.mjs';
import { generateStaticLedger } from './token-ledger-static.mjs';
import { computeLedger, staticMatches } from '../token-ledger.mjs';
import { PROBES } from './token-ledger-probes.mjs';
import { isExpectedTheme } from '../token-ledger-runtime.mjs';

const cap = generateCapabilities();
const card = cap.components.find((entry) => entry.name === 'card');
assert.deepEqual(card.exports.filter(entry => entry.kind === 'value').map(entry => entry.name), ['Card']);
assert.equal(card.exports.find((entry) => entry.name === 'CardProps').kind, 'type');
assert.equal(cap.components.find((entry) => entry.name === 'checkbox-group').metadata.usageResolution.find((entry) => entry.name === 'CheckboxGroup').status, 'PRESENT');
assert.ok(cap.components.find((entry) => entry.name === 'copy-button').metadata.usageResolution.find((entry) => entry.name === 'CopyButton').rootEntry);
assert.ok(cap.tokens.some((token) => token.name === '--qy-control-md'));
assert.ok(cap.scriptFiles.some((file) => file.endsWith('gen-index.mjs')));
for (const name of ['button-group', 'hover-card']) {
  const item = cap.components.find((entry) => entry.name === name);
  assert.equal(item.provenance.trackingStatus, 'PRESENT');
  assert.equal(item.provenance.aliasOf, undefined);
  assert.equal(item.provenance.verificationStatus, 'NOT_RUN', 'Author classification is not independent provenance verification');
}
assert.equal(card.provenance.aliasOf, undefined);
assert.deepEqual(cssDeclarations('/* --qy-fake: red; */ :root { --qy-real: color-mix(in srgb, var(--qy-primary) 50%, transparent); }', 'fixture.css').map((entry) => entry.name), ['--qy-real']);
assert.deepEqual(cssDeclarations(':root { --qy-a: var(--qy-b); }', 'fixture.css')[0].references, ['--qy-b']);
assert.equal(cssDeclarations(':root { --qy-a: calc(1px', 'fixture.css')[0].complete, false);
const stat = generateStaticLedger();
assert.deepEqual(stat.coveredComponents.map((entry) => entry.sourceComponent), files('packages/ui/src/components', /\.tsx?$/).map((path) => path.split('/').pop().replace(/\.tsx?$/, '')));
assert.ok(stat.records.some((record) => record.sourceComponent === 'field' && record.part === 'field'));
assert.ok(stat.records.some((record) => record.sourceComponent === 'card' && record.part === 'card' && record.token === '--qy-radius-panel' && record.property === 'border-radius'));
assert.ok(stat.records.some((record) => record.sourceComponent === 'table' && record.part === 'table-row' && record.token === '--qy-row-default' && record.property === 'height'));
assert.ok(!stat.records.some((record) => record.sourceComponent === 'card' && ['card-title', 'card-header', 'card-panel'].includes(record.part)), 'Card owns a content boundary, not caller headings or padding');
assert.ok(stat.records.some((record) => record.sourceComponent === 'field' && record.part === 'field-label' && record.token === '--qy-text-label-size' && record.property === 'font-size'));
assert.ok(stat.records.some((record) => record.sourceComponent === 'field' && record.part === 'field-label' && record.token === '--qy-text-label-leading' && record.property === 'line-height'));
assert.ok(stat.records.some((record) => record.sourceComponent === 'input' && record.part === 'input-control' && record.token === '--qy-touch-target' && record.property === 'min-height'));
assert.ok(!stat.records.some((record) => record.sourceComponent === 'button' && record.part === 'button-loading-indicator' && record.property === 'background-color' && record.token === '--qy-primary'));
assert.equal(isExpectedTheme({ classes: ['light'], dataTheme: null, colorScheme: 'light' }, 'light', 'class'), true);
assert.equal(isExpectedTheme({ classes: [], dataTheme: 'light', colorScheme: 'light' }, 'light', 'class'), false);
assert.equal(isExpectedTheme({ classes: ['light'], dataTheme: 'dark', colorScheme: 'light' }, 'light', 'class'), false);
assert.equal(isExpectedTheme({ classes: ['light', 'dark'], dataTheme: null, colorScheme: 'light' }, 'light', 'class'), false);
assert.equal(isExpectedTheme({ classes: [], dataTheme: 'dark', colorScheme: 'dark' }, 'dark', 'data-theme'), true);
assert.ok(stat.fingerprint.inputs.some((input) => input.path.endsWith('apps/docs/src/content/select/demos/01-sizes.tsx')));
assert.ok(stat.fingerprint.inputs.some((input) => input.path.endsWith('scripts/lib/token-ledger-probes.mjs')));
for (const path of ['pnpm-lock.yaml', 'apps/docs/index.html', 'apps/docs/vite.config.ts'].filter(exists)) assert.ok(stat.fingerprint.inputs.some((input) => input.path === path));
const primary = PROBES.find((probe) => probe.id === 'field-relationship-gap');
assert.equal(primary.demo, 'default');
assert.ok(staticMatches(stat, primary).length);
for (const id of ['field-relationship-gap', 'card-role-radius', 'table-default-height']) {
  assert.ok(staticMatches(stat, PROBES.find((probe) => probe.id === id)).length, `${id} has an exact static path before runtime verification`);
}
for (const probe of PROBES) assert.ok(!/^\d+-/.test(probe.demo));
const observed = { id: 'field-relationship-gap:light:desktop', probeId: primary.id, theme: 'light', viewport: 'desktop', observation: 'OBSERVED_CHANGE', validOverride: true };
assert.equal(computeLedger(stat, { fingerprint: stat.fingerprint.sha256, observations: [observed] }).cases.find((entry) => entry.probeId === primary.id).status, 'PASS');
assert.equal(computeLedger(stat, { fingerprint: stat.fingerprint.sha256, observations: [{ ...observed, observation: 'OBSERVED_NO_CHANGE' }] }).cases.find((entry) => entry.probeId === primary.id).status, 'UNVERIFIED');
assert.equal(computeLedger(stat, { fingerprint: 'stale', observations: [observed] }).cases.find((entry) => entry.probeId === primary.id).status, 'NOT_RUN');
assert.equal(computeLedger(stat, { fingerprint: stat.fingerprint.sha256, observations: [{ ...observed, validOverride: false }] }).cases.find((entry) => entry.probeId === primary.id).status, 'UNVERIFIED');
assert.equal(computeLedger(stat, { fingerprint: stat.fingerprint.sha256, observations: [{ ...observed, observation: 'NOT_OBSERVED', skipReason: 'Required pointer not available' }] }).cases.find((entry) => entry.probeId === primary.id).status, 'NOT_RUN');
assert.ok(computeLedger(stat, { fingerprint: null, observations: [] }).cases.every((entry) => entry.status === 'NOT_RUN'));
const noPathProbe = PROBES.find((probe) => !staticMatches(stat, probe).length);
assert.ok(noPathProbe, 'Unresolved dynamic consumption remains represented rather than fabricated');
const noPath = { ...observed, id: 'overlay', probeId: noPathProbe.id, observation: 'OBSERVED_NO_CHANGE' };
// This only applies while source has no path; later token wiring changes the expectation.
if (!staticMatches(stat, noPathProbe).length) {
  assert.equal(computeLedger(stat, { fingerprint: stat.fingerprint.sha256, observations: [noPath] }).cases.find((entry) => entry.probeId === noPathProbe.id).status, 'PASS');
  assert.equal(computeLedger(stat, { fingerprint: stat.fingerprint.sha256, observations: [{ ...noPath, observation: 'OBSERVED_CHANGE' }] }).cases.find((entry) => entry.probeId === noPathProbe.id).status, 'UNVERIFIED');
}

// A clean checkout without built artifacts still inventories source facts.
// Copy only readable inputs to a task-owned temporary fixture; no repo mutation.
const fixture = mkdtempSync(resolve(tmpdir(), 'qy-capabilities-no-dist-'));
for (const path of cap.fingerprint.inputs.map((input) => input.path)) {
  mkdirSync(dirname(resolve(fixture, path)), { recursive: true });
  writeFileSync(resolve(fixture, path), readFileSync(resolve(ROOT, path)));
}
mkdirSync(resolve(fixture, 'packages/ui/scripts'), { recursive: true });
symlinkSync(resolve(ROOT, 'packages/ui/node_modules'), resolve(fixture, 'packages/ui/node_modules'));
symlinkSync(resolve(ROOT, '.git'), resolve(fixture, '.git'));
const moduleURL = new URL('../gen-capabilities.mjs', import.meta.url).href;
try {
  const response = execFileSync(process.execPath, ['--input-type=module', '-e', `const {generateCapabilities}=await import(${JSON.stringify(moduleURL)});const c=generateCapabilities();console.log(JSON.stringify({count:c.counts.components,dist:c.counts.dist,status:c.buildArtifacts.status,allNotRun:c.components.every(x=>x.dist.status==='NOT_RUN')}));`], { env: { ...process.env, QY_UI_ROOT: fixture, QY_UI_FACTS_OUT: resolve(fixture, 'docs') }, encoding: 'utf8' });
  assert.deepEqual(JSON.parse(response), { count: cap.counts.components, dist: 0, status: 'NOT_RUN', allNotRun: true });
  const componentDir = resolve(fixture, 'packages/ui/src/components');
  const facades = {
    'forward-a.tsx': 'export * from "./forward-b";',
    'forward-b.tsx': 'export { Group } from "./group";',
    'wrapper.tsx': 'export { Group } from "./group"; export const localBehavior = 1;',
    'mixed.tsx': 'export { Group } from "./group"; export { Card } from "./card";',
    'cycle-a.tsx': 'export * from "./cycle-b";',
    'cycle-b.tsx': 'export * from "./cycle-a";',
    'external.tsx': 'export * from "some-package";',
    'types-only.tsx': 'export type { GroupProps } from "./group";',
  };
  for (const [name, source] of Object.entries(facades)) writeFileSync(resolve(componentDir, name), source);
  const provenanceURL = new URL('./component-provenance.mjs', import.meta.url).href;
  const outcome = execFileSync(process.execPath, ['--input-type=module', '-e', `
    const {componentProvenance}=await import(${JSON.stringify(provenanceURL)});
    const entries=[{file:'src/components/group.tsx'},{file:'src/components/card.tsx'}];
    const results=Object.fromEntries(${JSON.stringify(Object.keys(facades))}.map(name=>[name,componentProvenance('packages/ui/src/components/'+name,entries)]));
    console.log(JSON.stringify(results));
  `], { env: { ...process.env, QY_UI_ROOT: fixture }, encoding: 'utf8' });
  const proven = JSON.parse(outcome);
  assert.equal(proven['forward-a.tsx'].implementation, 'packages/ui/src/components/group.tsx');
  assert.deepEqual(proven['forward-a.tsx'].chain, ['packages/ui/src/components/forward-b.tsx', 'packages/ui/src/components/group.tsx']);
  for (const name of ['wrapper.tsx', 'mixed.tsx', 'cycle-a.tsx', 'cycle-b.tsx', 'external.tsx', 'types-only.tsx']) assert.equal(proven[name], null, name);
} finally { rmSync(fixture, { recursive: true, force: true }); }
console.log('facts-ledger checks passed: exports/aliases, source-only checkout, forwarding/typography, exact className parts, real demo ids, conflict/invalid/stale/NOT_RUN. Temporary fixture removed.');
