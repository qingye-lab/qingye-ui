import { mkdirSync, existsSync, readFileSync, writeFileSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { OUT, revision } from './lib/ui-facts.mjs';
import { generateStaticLedger } from './lib/token-ledger-static.mjs';
import { PROBES } from './lib/token-ledger-probes.mjs';

const compatibleProperties = (a, b) => a === b || (a === 'padding' && b.startsWith('padding-')) || (a === 'border-color' && /^border-(top|right|bottom|left)-color$/.test(b));
export function staticMatches(staticLayer, probe) {
  return staticLayer.records.filter((record) => record.sourceComponent === probe.sourceComponent && record.part === probe.part && ['EXACT_SLOT', 'EXACT_DESCENDANT'].includes(record.precision) && !record.pseudo && record.token === probe.token && probe.properties.some((property) => compatibleProperties(record.property, property)) && record.conditions.every((condition) => {
    if (/^variant=/.test(condition)) return condition.slice(8) === probe.variant;
    if (/^size=/.test(condition)) return condition.slice(5) === (probe.size || 'default');
    if (/^(hover|not-.*hover)/.test(condition)) return probe.state === 'hover';
    if (/^data-highlighted$/.test(condition)) return probe.state === 'highlighted';
    if (/^aria-invalid$/.test(condition)) return probe.state === 'invalid';
    if (/^focus-visible/.test(condition)) return probe.state === 'focus-visible';
    if (/^(disabled|data-disabled)$/.test(condition)) return probe.state === 'disabled';
    if (/^data-pressed$/.test(condition)) return probe.state === 'pressed';
    if (/^dark$/.test(condition)) return !probe.theme || probe.theme === 'dark';
    if (/^not-dark$/.test(condition)) return !probe.theme || probe.theme === 'light';
    return true;
  }));
}
export function computeLedger(staticLayer, runtimeLayer) {
  const stale = Boolean(runtimeLayer.fingerprint && runtimeLayer.fingerprint !== staticLayer.fingerprint.sha256);
  const cases = PROBES.flatMap((probe) => {
    const observations = (runtimeLayer.observations || []).filter((observation) => observation.probeId === probe.id);
    if (!observations.length) return [{ probeId: probe.id, token: probe.token, part: probe.part, status: 'NOT_RUN', observation: 'NOT_OBSERVED', reason: 'No runtime observation for this selected probe' }];
    return observations.map((observation) => {
      const matches = staticMatches(staticLayer, { ...probe, theme: observation.theme });
      let status, reason;
      if (stale) { status = 'NOT_RUN'; reason = 'Recorded runtime evidence is stale after source/style changes'; }
      else if (observation.skipReason) { status = 'NOT_RUN'; reason = observation.skipReason; }
      else if (observation.error || observation.observation === 'NOT_OBSERVED') { status = 'UNVERIFIED'; reason = observation.error || 'Target or injected token was not observed'; }
      else if (!observation.validOverride) { status = 'UNVERIFIED'; reason = 'Injected token did not change at the measured part'; }
      else if (matches.length && observation.observation === 'OBSERVED_NO_CHANGE') { status = 'UNVERIFIED'; reason = 'Static mapping predicts consumption but measured properties did not change'; }
      else if (!matches.length && observation.observation === 'OBSERVED_CHANGE') { status = 'UNVERIFIED'; reason = 'Runtime effect has no matching static path'; }
      else { status = 'PASS'; reason = matches.length ? 'Matching static path and observed property change in this case' : 'Valid injection and no measured effect; no static path in this case'; }
      return { probeId: probe.id, token: probe.token, part: probe.part, theme: observation.theme, viewport: observation.viewport, pointer: observation.pointer, status, observation: stale ? 'NOT_OBSERVED' : observation.observation, reason, staticRecordSources: matches.map((record) => ({ source: record.source, className: record.className, chain: record.chain })), evidenceId: observation.id };
    });
  });
  return { staleRuntime: stale, scope: 'Only the selected probes and recorded theme/viewport/state combinations. PASS for no-change proves measured non-effect, never universal non-consumption.', cases, counts: Object.fromEntries(['PASS', 'FAIL', 'UNVERIFIED', 'NOT_RUN'].map((status) => [status, cases.filter((entry) => entry.status === status).length])) };
}
export function generateLedger(previous = null) {
  const staticLayer = generateStaticLedger();
  const runtime = previous?.runtime || { fingerprint: null, observations: [], status: 'NOT_RUN' };
  return { schemaVersion: 1, generatedBy: 'scripts/token-ledger.mjs', generatedAt: new Date().toISOString(), revision: revision(), static: staticLayer, runtime, computation: computeLedger(staticLayer, runtime), probePlan: PROBES };
}
export function saveLedger(ledger) { mkdirSync(OUT, { recursive: true }); writeFileSync(resolve(OUT, 'token-ledger.json'), `${JSON.stringify(ledger, null, 2)}\n`); }
if (process.argv[1] && pathToFileURL(realpathSync(process.argv[1])).href === import.meta.url) {
  const path = resolve(OUT, 'token-ledger.json');
  const ledger = generateLedger(existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null);
  saveLedger(ledger);
  console.log(`token-ledger: ${ledger.static.records.length} static paths; ${JSON.stringify(ledger.computation.counts)}; stale=${ledger.computation.staleRuntime}`);
}
