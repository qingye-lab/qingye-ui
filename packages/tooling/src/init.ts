import { existsSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import { inside, read, hash, writeAtomic } from './project.js';
import { themeCss } from './theme.js';
import { ToolError, type ProjectConfig, type Theme } from './types.js';
export function initProject(projectPath: string, options: { apply?: boolean } = {}) {
  if (!projectPath) throw new ToolError('init requires explicit --project','PROJECT_REQUIRED');
  const root=realpathSync(resolve(projectPath));
  if(!existsSync(resolve(root,'package.json'))) throw new ToolError('Explicit project package.json is required','PROJECT_REQUIRED');
  try { createRequire(resolve(root,'package.json')).resolve('@qingye/ui/package.json'); } catch { throw new ToolError('Install @qingye/ui in this project before init; no automatic downloads','MISSING_DEPENDENCY'); }
  const theme:Theme={schemaVersion:1,brand:'project',common:{},light:{},dark:{},compact:{}};
  const config:ProjectConfig={schemaVersion:1,package:'@qingye/ui',publicEntry:'src/ui.ts',styleEntry:'src/ui.css',theme:{source:'ui.theme.json',generated:'ui.theme.generated.css',mode:'class'},scan:['src'],compositions:[],tokenSources:[],adapters:[],diagnostics:{preset:'personal',mode:'report',report:'.qingye/report.json'}};
  const contents:Record<string,string>={
    'ui.config.json':`${JSON.stringify(config,null,2)}\n`,
    'ui.theme.json':`${JSON.stringify(theme,null,2)}\n`,
    'ui.theme.generated.css':themeCss(theme,'class'),
    'src/ui.ts':'// Shared project UI entry; add approved public compositions here.\nexport { Button } from "@qingye/ui/components/button";\nexport { Input } from "@qingye/ui/components/input";\n',
    'src/ui.css':'@import "tailwindcss";\n@import "@qingye/ui/styles.css";\n@import "../ui.theme.generated.css";\n',
  };
  const changes=Object.entries(contents).map(([name,after])=>{const file=inside(root,name),before=existsSync(file)?read(file):null;return {path:name,before,after,status:before===after?'unchanged':before===null?'create':'conflict',fingerprint:before===null?null:hash(before)};});
  const conflicts=changes.filter(c=>c.status==='conflict');
  if(options.apply && conflicts.length) throw new ToolError(`init conflicts: ${conflicts.map(c=>c.path).join(', ')}; no files written`,'INIT_CONFLICT');
  if(options.apply) {
    // Recheck the whole whitelist before the first mutation.
    for(const c of changes) {const p=inside(root,c.path);if((existsSync(p)?hash(read(p)):null)!==c.fingerprint) throw new ToolError(`init source changed: ${c.path}`,'SOURCE_CONFLICT');}
    for(const c of changes.filter(c=>c.status==='create')) writeAtomic(root,c.path,c.after,null);
  }
  return {status:conflicts.length?'FAIL':'PASS',applied:Boolean(options.apply),changes,conflicts:conflicts.map(c=>c.path),next:'Import the explicit src/ui.css once in the application entry. Choose source CSS or precompiled CSS according to your build; init does not rewrite an existing application or install dependencies.'};
}
