import { existsSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadProject, json, hash, read, inside } from './project.js';
export function getImpact(projectPath: string, token?: string, slot?: string) {
  const project = loadProject(projectPath);
  if (!project.config.ledger || !project.config.ledgerRoot) return { status: 'NOT_RUN', records: [], observations: [], limitation: 'No explicit existing token-ledger and source root configured. Missing evidence is unknown impact.' };
  const ledgerPath = resolve(project.root,project.config.ledger), sourceRoot = realpathSync(resolve(project.root,project.config.ledgerRoot)), ledger = json(ledgerPath);
  const inputs = ledger.static?.fingerprint?.inputs;
  if (!Array.isArray(inputs) || !Array.isArray(ledger.static?.records)) return { status: 'UNVERIFIED', records: [], observations: [], limitation: 'Unsupported existing ledger shape' };
  const changedInputs = inputs.filter((entry: any) => { const path = inside(sourceRoot,entry.path); return !existsSync(path) || hash(read(path)) !== entry.sha256; }).map((entry: any) => entry.path);
  const fresh = !changedInputs.length && ledger.runtime?.fingerprint === ledger.static.fingerprint.sha256;
  const records = ledger.static.records.filter((entry: any) => (!token || entry.token === token) && (!slot || entry.part === slot || entry.selector?.includes(`data-slot=${slot}`) || entry.selector?.includes(`data-slot="${slot}"`)));
  const observations = (ledger.computation?.cases ?? []).filter((entry: any) => (!token || entry.token === token) && (!slot || entry.part === slot)).map((entry: any) => ({ ...entry, status: fresh ? entry.status : 'NOT_RUN', reason: fresh ? entry.reason : 'Existing source fingerprint/runtime observation is stale or missing' }));
  return { status: changedInputs.length ? 'UNVERIFIED' : records.length ? 'PASS' : 'UNVERIFIED', staticFresh: !changedInputs.length, runtimeFresh: fresh, changedInputs, generatedAt: ledger.generatedAt, fingerprint: ledger.static.fingerprint.sha256, records, observations, unresolved: ledger.static.unresolved, layer: 'P for registered project overrides; L for public anatomy/behavior changes', limitation: 'Reads the existing two-layer token ledger. No record or stale measurement never means no effect. Recorded observations cover only their stated cases.' };
}
