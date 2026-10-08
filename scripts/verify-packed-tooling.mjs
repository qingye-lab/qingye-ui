import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, realpathSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';

const [uiArg, toolingArg] = process.argv.slice(2);
if (!uiArg || !toolingArg) throw new Error('usage: node scripts/verify-packed-tooling.mjs <ui.tgz> <tooling.tgz>');
const ui = realpathSync(resolve(uiArg)), tooling = realpathSync(resolve(toolingArg));
const base = resolve('test-results/packed-tooling'); mkdirSync(base, { recursive: true });
const directory = mkdtempSync(join(base, 'run-'));
const sha = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const report = { directory, artifacts: [{path:ui,sha256:sha(ui)},{path:tooling,sha256:sha(tooling)}], checks: [], errors: [] };
const put = (name, data) => writeFileSync(join(directory, name), typeof data === 'string' ? data : JSON.stringify(data,null,2)+'\n');
const command = (args, expected = 0) => {
  const result = spawnSync('pnpm', args, { cwd:directory, encoding:'utf8', timeout:120000 });
  put(`command-${report.checks.length}.log`, result.stdout + result.stderr);
  assert.equal(result.status, expected, result.stderr || result.stdout);
  report.checks.push({args,exitCode:result.status}); return result.stdout;
};
try {
  put('package.json', { name:'packed-tooling-check', private:true, type:'module', dependencies:{'@qingye_lab/ui':`file:${ui}`,'@qingye/tooling':`file:${tooling}`,react:'19.2.1','react-dom':'19.2.1'} });
  put('.npmrc','auto-install-peers=false\n');
  command(['install','--ignore-workspace','--no-frozen-lockfile','--ignore-scripts']);
  for (const [name, packageName] of [['ui','@qingye_lab/ui'],['tooling','@qingye/tooling']]) assert.ok(!realpathSync(join(directory,`node_modules/${packageName}`)).startsWith(resolve(`packages/${name}`)));
  const cli = (args, exit=0) => JSON.parse(command(['exec','qingye-ui',...args,'--project',directory,'--json'],exit));
  const info = cli(['info']); assert.equal(info.missingConfig,'ui.config.json');
  const dry = cli(['init']); assert.equal(dry.applied,false); assert.equal(existsSync(join(directory,'ui.config.json')),false);
  assert.equal(cli(['init','--apply']).applied,true);
  assert.ok(cli(['init','--apply']).changes.every(change=>change.status==='unchanged'));
  const docs = cli(['docs','Button']); assert.ok(JSON.stringify(docs).includes('Button'));
  assert.equal(cli(['impact','--token','--qy-primary']).status,'NOT_RUN');
  const current = cli(['theme','get']); current.theme.common['--qy-radius-control']='0.875rem'; put('candidate.json',current);
  assert.equal(cli(['theme','update','--input',join(directory,'candidate.json')]).applied,false);
  assert.equal(cli(['theme','update','--input',join(directory,'candidate.json'),'--apply']).applied,true);
  assert.ok(readFileSync(join(directory,'ui.theme.generated.css'),'utf8').includes('0.875rem'));
  command(['exec','qingye-ui','theme','update','--input',join(directory,'candidate.json'),'--apply','--project',directory,'--json'],2);
  put('src/issue.tsx','export const Issue=()=> <div className="bg-[#191919]"/>;\n');
  const findings = cli(['check']); assert.equal(findings.status,'FAIL'); assert.ok(findings.diagnostics.some(d=>d.rule==='visual/hardcoded'));
  cli(['check','--mode','gate'],1);
  cli(['check','--save']);
  const storedBefore=readFileSync(join(directory,'.qingye/report.json'),'utf8');
  const fresh=cli(['report','--projects',directory]);assert.equal(fresh.projects[0].stale,false);
  put('src/new-issue.tsx','export const NewIssue=()=> <div className="bg-[rgb(25,25,25)]"/>;\n');
  const stale=cli(['report','--projects',directory]);assert.equal(stale.projects[0].stale,true);assert.equal(stale.projects[0].status,'UNVERIFIED');
  assert.equal(readFileSync(join(directory,'.qingye/report.json'),'utf8'),storedBefore,'freshness check must not rewrite the stored report');

  report.status='PASS';
} catch (error) {report.status='FAIL'; report.errors.push(error.stack); process.exitCode=1;console.error(error);}
finally {put('report.json',report);console.log(`Packed tooling ${report.status}: ${join(directory,'report.json')}`);}
