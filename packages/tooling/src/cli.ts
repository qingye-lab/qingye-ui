import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadProject, projectInfo, componentDocs, json } from './project.js';
import { getTheme,validateTheme,updateTheme } from './theme.js';
import { checkProject,readReports } from './check.js';
import { getImpact } from './impact.js';
import { initProject } from './init.js';
import { ToolError } from './types.js';

const HELP=`qingye-ui <command> --project <explicit application directory> [--json]
  info                       installed version, exports and configured entries
  docs <component|pattern>   installed version catalog facts
  check [--mode report|gate] [--save]  explicit AST diagnostics; default report
  init [--dry-run|--apply]   whitelist plan; default dry-run, no dependency install
  theme get|validate|update [--input <JSON file>] [--apply]
                             update input: theme or {theme,fingerprint,generatedFingerprint,configFingerprint}
                             apply requires the complete fingerprint envelope from theme get
  impact [--token <token>] [--slot <data-slot>]  existing ledger evidence only
  report --projects <comma-separated explicit directories>  existing reports only
Exit codes: report completion 0 (may contain FAIL); gate new FAIL 1; execution/config failure 2.
No command downloads a package, publishes, changes baseline or runs a browser.`;
export async function main(args: string[]) {
  try {
    const flags:Record<string,string|boolean>={},positionals:string[]=[];
    for(let i=0;i<args.length;i++){const arg=args[i]!;if(arg.startsWith('--')) {const key=arg.slice(2);if(['json','apply','dry-run','save','help','version'].includes(key)) flags[key]=true;else {if(!['project','projects','mode','input','token','slot'].includes(key))throw new ToolError(`Unknown --${key}`,'INVALID_ARGUMENT');if(!args[i+1]||(args[i+1]!.startsWith('--')&&!(key==='token'&&/^--qy-[a-zA-Z0-9-]+$/.test(args[i+1]!))))throw new ToolError(`Missing --${key} value`,'INVALID_ARGUMENT');flags[key]=args[++i]!;}}else positionals.push(arg);}
    if(flags.version){console.log(JSON.parse(readFileSync(fileURLToPath(new URL('../package.json',import.meta.url)),'utf8')).version);return 0;}
    if(flags.help||!positionals.length){console.log(HELP);return 0;}
    const [command,subject]=positionals, project=typeof flags.project==='string'?flags.project:'';
    let result:any;
    if(command==='info')result=projectInfo(project);
    else if(command==='docs'){if(!subject)throw new ToolError('docs needs a component or pattern','INVALID_ARGUMENT');result=componentDocs(project,subject);}
    else if(command==='init'){if(flags.apply&&flags['dry-run'])throw new ToolError('Choose apply or dry-run','INVALID_ARGUMENT');result=initProject(project,{apply:Boolean(flags.apply)});}
    else if(command==='check'){if(flags.mode&&!['report','gate'].includes(String(flags.mode)))throw new ToolError('mode must be report or gate','INVALID_ARGUMENT');result=checkProject(project,{mode:flags.mode as any,save:Boolean(flags.save)});}
    else if(command==='impact')result=getImpact(project,flags.token as string|undefined,flags.slot as string|undefined);
    else if(command==='report'){if(typeof flags.projects!=='string')throw new ToolError('report requires --projects','INVALID_ARGUMENT');result=readReports(flags.projects.split(',').filter(Boolean));}
    else if(command==='theme'){
      const current=getTheme(project);
      if(subject==='get')result=current;
      else if(subject==='validate'||subject==='update'){
        if(typeof flags.input!=='string')throw new ToolError('theme validate/update requires --input JSON file','INVALID_ARGUMENT');
        const input=json(flags.input),theme=input.theme??input;
        if(subject==='validate')result=validateTheme(loadProject(project),theme);
        else {if(flags.apply&&(!Object.hasOwn(input,'fingerprint')||!Object.hasOwn(input,'generatedFingerprint')||!Object.hasOwn(input,'configFingerprint')))throw new ToolError('apply requires a source fingerprint envelope obtained from theme get','SOURCE_CONFLICT');result=updateTheme(project,theme,{apply:Boolean(flags.apply),fingerprint:Object.hasOwn(input,'fingerprint')?input.fingerprint:current.fingerprint,generatedFingerprint:Object.hasOwn(input,'generatedFingerprint')?input.generatedFingerprint:current.generatedFingerprint,configFingerprint:Object.hasOwn(input,'configFingerprint')?input.configFingerprint:current.configFingerprint});}
      } else throw new ToolError('theme needs get, validate or update','INVALID_ARGUMENT');
    } else throw new ToolError(`Unknown command ${command}`,'INVALID_ARGUMENT');
    console.log(flags.json?JSON.stringify(result,null,2):human(result));
    return result.exitCode??(command==='theme'&&subject==='validate'&&result.status==='FAIL'?1:0);
  }catch(error){console.error(JSON.stringify({status:'NOT_RUN',completed:false,code:error instanceof ToolError?error.code:'EXECUTION_FAILURE',error:(error as Error).message,exitCode:2},null,2));return 2;}
}
function human(result:any){if(result.diagnostics)return `${result.status} · installed ${result.installedVersion} · ${result.mode}\n${result.diagnostics.map((d:any)=>`${d.status} ${d.rule} ${d.file}:${d.line} ${d.evidence}${d.disposition?` [${d.disposition}]`:''}`).join('\n')}\nBrowser: NOT_RUN · report exit 0 is not diagnostic PASS`;return JSON.stringify(result,null,2);}
