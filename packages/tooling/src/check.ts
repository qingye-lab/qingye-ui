import ts from 'typescript';
import postcss from 'postcss';
import { existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { createRequire } from 'node:module';
import { loadProject, walkFiles, inside, tokenRegistry, read, json, hash, writeAtomic } from './project.js';
import { inspectColors } from './color-check.js';
import { ToolError, type Diagnostic, type Project } from './types.js';

const paintProperty = /^(color|background(?:-color)?|border(?:-(?:top|right|bottom|left))?(?:-color)?|outline(?:-color)?|fill|stroke|box-shadow|text-shadow)$/;
const rawPaint = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|hwb|lab|lch|color)\s*\(/i;
const designProperty = /^(font-size|font-family|font-weight|letter-spacing|border-radius|transition-duration|animation-duration)$/;
const designStyle = /^(fontSize|fontFamily|fontWeight|letterSpacing|borderRadius|transitionDuration|animationDuration)$/;
const designClass = /(?:^|\s)(?:[^\s]*:)?(?:rounded|text|font|tracking|duration)-\[(?!.*?var\().*?\]/g;
const references = (value: string) => [...new Set(value.match(/--qy-[a-zA-Z0-9-]+/g) ?? [])];
type SourceInput = { path: string; sha256: string };
function sourceInputs(project: Project, files = walkFiles(project.root,project.config.scan)): SourceInput[] {
  return files.map(path => ({ path:relative(project.root,path), sha256:hash(read(path)) }));
}
function savedReportFreshness(project: Project, report: any): boolean {
  if (report.configFingerprint !== project.configFingerprint || report.installedVersion !== project.packageJson.version || !Array.isArray(report.sourceInputs)) return false;
  // Re-enumerate the same scan boundary so new, removed and renamed files invalidate
  // saved evidence without running diagnostics or changing the saved report.
  const current = sourceInputs(project);
  return current.length === report.sourceInputs.length && current.every((entry,index) => {
    const saved = report.sourceInputs[index];
    return saved?.path === entry.path && saved?.sha256 === entry.sha256;
  });
}
export const PRESET_POLICIES={
  recommended:{visualSeverity:'warning',gateSeverity:'error',guidance:'Public contract/token/axis errors block an explicit gate; visual choices remain reported warnings.'},
  personal:{visualSeverity:'error',gateSeverity:'error',guidance:'Full known deterministic failures block an explicit gate. Unknown and browser-only checks stay unverified.'},
  legacy:{visualSeverity:'error',gateSeverity:'error',guidance:'Full known deterministic failures; only an explicitly configured exact baseline identifies existing issues. New failures remain separate and no baseline is generated.'},
} as const;

function compiler(project: Project, files: string[]) {
  const configPath = resolve(project.root,'tsconfig.json');
  let options: ts.CompilerOptions = { target: ts.ScriptTarget.ES2022, moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX, allowJs: true, skipLibCheck: true };
  if (existsSync(configPath)) {
    const loaded = ts.readConfigFile(configPath,ts.sys.readFile);
    if (loaded.error) throw new ToolError('Cannot parse project tsconfig', 'SCAN_FAILURE');
    const parsed = ts.parseJsonConfigFileContent(loaded.config,ts.sys,project.root);
    if (parsed.errors.length) throw new ToolError(ts.flattenDiagnosticMessageText(parsed.errors[0]!.messageText,' '), 'SCAN_FAILURE');
    options = { ...options,...parsed.options };
  }
  return ts.createProgram(files.filter(path => !path.endsWith('.css')),options);
}
export function checkProject(projectPath: string, options: { mode?: 'report' | 'gate'; save?: boolean } = {}) {
  const project = loadProject(projectPath), files = walkFiles(project.root,project.config.scan), registry = new Set(tokenRegistry(project).map(t => t.name));
  const program = compiler(project,files), checker = program.getTypeChecker(), diagnostics: Diagnostic[] = [], seen = new Set<string>(), executionFaults:string[]=[];
  const policy=PRESET_POLICIES[project.config.diagnostics.preset], req=createRequire(resolve(project.root,'package.json'));
  const definitionPaths = new Set([...project.config.tokenSources,...project.config.theme.legacyCss ?? [],project.config.theme.generated].map(name => inside(project.root,name)));
  const inAdapter = (path: string) => project.config.adapters.some(name => path === inside(project.root,name) || path.startsWith(`${inside(project.root,name)}/`));
  function add(rule: string, status: Diagnostic['status'], file: string, line: number, evidence: string, decision: string, severity: Diagnostic['severity'] = status === 'FAIL' ? 'error' : 'warning', limitation = 'Static syntax evidence; browser layout/focus/state behavior remains NOT_RUN') {
    const rel = relative(project.root,file), id = hash(JSON.stringify({ rule, file: rel, line, evidence }));
    if (seen.has(id)) return; seen.add(id);
    if(rule.startsWith('visual/') && status==='FAIL')severity=policy.visualSeverity;
    diagnostics.push({ id,rule,ruleVersion:1,status,certainty:status==='UNVERIFIED'?'unknown':'certain',severity,file:rel,line,evidence,decision,layer:'P',safeAutofix:false,limitation });
  }
  for (const path of files) {
    const text = read(path);
    if (path.endsWith('.css')) {
      let ast: postcss.Root;
      try { ast = postcss.parse(text,{ from:path }); } catch(error) { throw new ToolError(`CSS scanner failed: ${relative(project.root,path)} ${(error as Error).message}`, 'SCAN_FAILURE'); }
      ast.walkDecls(decl => {
        const line = decl.source?.start?.line ?? 1;
        if (decl.prop.startsWith('--qy-') && !registry.has(decl.prop)) add('token/undefined','FAIL',path,line,decl.toString(),'Register a meaningful shared/project token at its owning source');
        for (const ref of references(decl.value)) if (!registry.has(ref)) add('token/undefined','FAIL',path,line,ref,'Use an installed registered token or explicit project token definition');
        if (!definitionPaths.has(path) && !inAdapter(path) && ((paintProperty.test(decl.prop) && rawPaint.test(decl.value)) || (designProperty.test(decl.prop) && !decl.value.includes('var(')))) add('visual/hardcoded','FAIL',path,line,decl.toString(),'Move repeated visual decisions into the configured project theme/recipe');
      });
      ast.walkRules(rule => { const match = /\[data-theme\s*=\s*['"]?([^'"\]\s]+)/.exec(rule.selector); if (match && !['light','dark'].includes(match[1]!)) add('theme/axes','FAIL',path,rule.source?.start?.line ?? 1,rule.selector,'Use data-brand for brand and reserve data-theme for light/dark'); });
      continue;
    }
    const source = program.getSourceFile(path) ?? ts.createSourceFile(path,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    const syntax = program.getSyntacticDiagnostics(source);
    if (syntax.length) throw new ToolError(`TS scanner failed: ${relative(project.root,path)} ${ts.flattenDiagnosticMessageText(syntax[0]!.messageText,' ')}`, 'SCAN_FAILURE');
    if (!definitionPaths.has(path) && !inAdapter(path)) {
      const inspection = inspectColors(text,path);
      for (const entry of inspection.violations) add('visual/hardcoded','FAIL',path,entry.line,entry.value,'Use registered project/theme paint roles instead of scattered colors');
      for (const entry of inspection.unresolved) add('visual/dynamic','UNVERIFIED',path,1,entry,'Review runtime visual expression; static scan cannot determine its value');
    }
    const lineOf = (node: ts.Node) => source.getLineAndCharacterOfPosition(node.getStart(source)).line+1;
    const usedBindings=new Set<ts.Symbol>();
    function indexUses(node:ts.Node){if(ts.isImportDeclaration(node))return;if(ts.isIdentifier(node)){const symbol=checker.getSymbolAtLocation(node);if(symbol)usedBindings.add(symbol);}ts.forEachChild(node,indexUses);}
    indexUses(source);
    function componentPeers(name:string,node:ts.Node) {
      const entry=project.catalog.components.find(c=>c.exports?.includes(name)||c.actualExports?.some((e:any)=>e.name===name));
      if(!entry)return;
      for(const peer of entry.dependencies?.optionalPeers??[]) {
        if(typeof peer!=='string')continue;
        try{req.resolve(peer);}catch{
          add('imports/missing-peer','FAIL',path,lineOf(node),`${entry.name} requires ${peer}`,'Install the optional peer required by this actually used component, or choose a component without it');
          if(!executionFaults.includes(peer))executionFaults.push(peer);
        }
      }
    }
    function values(node: ts.Node): string[] {
      if (ts.isStringLiteralLike(node)) return [node.text];
      if (ts.isJsxExpression(node) && node.expression) return values(node.expression);
      if (ts.isConditionalExpression(node)) return [...values(node.whenTrue),...values(node.whenFalse)];
      if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) return values(node.expression);
      if (ts.isObjectLiteralExpression(node)) return node.properties.flatMap(p => ts.isPropertyAssignment(p) ? values(p.initializer) : []);
      if (ts.isCallExpression(node) && ['cn','clsx','cva'].includes(node.expression.getText(source))) return node.arguments.flatMap(values);
      return [];
    }
    function moduleRule(node: ts.ImportDeclaration | ts.ExportDeclaration) {
      if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) return;
      const moduleName = node.moduleSpecifier.text;
      if (moduleName.startsWith('@qingye_lab/ui/') && !isPublicSubpath(project,moduleName.slice('@qingye_lab/ui'.length))) {add('imports/private','FAIL',path,lineOf(node),moduleName,'Import through an installed package public export');return;}
      const resolved = ts.resolveModuleName(moduleName,path,program.getCompilerOptions(),ts.sys).resolvedModule;
      if (!resolved) { add('imports/unresolved','UNVERIFIED',path,lineOf(node),moduleName,'Resolve the actual dependency/alias; unresolved modules are not validated'); return; }
      const symbol = checker.getSymbolAtLocation(node.moduleSpecifier);
      if (!symbol) { add('imports/unresolved','UNVERIFIED',path,lineOf(node),moduleName,'Module resolved but exports could not be inspected'); return; }
      const exported = new Set(checker.getExportsOfModule(symbol).map(s => s.name));
      const names = ts.isImportDeclaration(node) && node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings) ? node.importClause.namedBindings.elements : ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause) ? node.exportClause.elements : [];
      for (const item of names) {
        const imported = item.propertyName?.text ?? item.name.text;
        if (!exported.has(imported)) add('imports/invalid-export','FAIL',path,lineOf(item),`${moduleName}:${imported}`,'Use the actual installed module exports');
        if(ts.isImportDeclaration(node) && ts.isImportSpecifier(item) && !item.isTypeOnly && !node.importClause?.isTypeOnly){const local=checker.getSymbolAtLocation(item.name);if(local&&usedBindings.has(local)){
          let actual=local.flags&ts.SymbolFlags.Alias?checker.getAliasedSymbol(local):local;
          if(actual.declarations?.some(d=>d.getSourceFile().fileName.startsWith(`${project.packageRoot}/`)))componentPeers(actual.name,item);
        }}
      }
      if(ts.isImportDeclaration(node)&&node.importClause?.namedBindings&&ts.isNamespaceImport(node.importClause.namedBindings)&&!node.importClause.isTypeOnly){const binding=checker.getSymbolAtLocation(node.importClause.namedBindings.name);const visitNamespace=(child:ts.Node)=>{if(ts.isPropertyAccessExpression(child)&&checker.getSymbolAtLocation(child.expression)===binding){const symbol=checker.getSymbolAtLocation(child.name);const actual=symbol&&(symbol.flags&ts.SymbolFlags.Alias?checker.getAliasedSymbol(symbol):symbol);if(actual?.declarations?.some(d=>d.getSourceFile().fileName.startsWith(`${project.packageRoot}/`)))componentPeers(actual.name,child.name);}ts.forEachChild(child,visitNamespace);};visitNamespace(source);}
    }
    function visit(node: ts.Node) {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) moduleRule(node);
      if (ts.isJsxAttribute(node) && node.initializer) {
        const name = node.name.getText(source);
        if (['className','style'].includes(name)) {
          for (const value of values(node.initializer)) {
            for (const token of references(value)) if (!registry.has(token)) add('token/undefined','FAIL',path,lineOf(node),token,'Use a registered token');
            if (!inAdapter(path) && name === 'className') for (const match of value.matchAll(designClass)) add('visual/hardcoded','FAIL',path,lineOf(node),match[0].trim(),'Use a registered visual role; structural grid/flex dimensions and data are allowed');
          }
          if (name === 'style' && ts.isJsxExpression(node.initializer) && node.initializer.expression && ts.isObjectLiteralExpression(node.initializer.expression) && !inAdapter(path)) for (const prop of node.initializer.expression.properties) if (ts.isPropertyAssignment(prop) && designStyle.test(prop.name.getText(source).replace(/['"]/g,'')) && (ts.isNumericLiteral(prop.initializer) || values(prop.initializer).some(v => !v.includes('var(')))) add('visual/hardcoded','FAIL',path,lineOf(prop),prop.getText(source),'Move visual type/radius/motion decisions to the configured source');
        }
        if (name === 'data-theme') {
          const possible = values(node.initializer);
          if (!possible.length) add('theme/dynamic','UNVERIFIED',path,lineOf(node),node.getText(source),'Verify dynamic theme axis at runtime');
          for (const value of possible) if (!['light','dark'].includes(value)) add('theme/axes','FAIL',path,lineOf(node),value,'Brand belongs in data-brand');
        }
      }
      ts.forEachChild(node,visit);
    }
    visit(source);
  }
  applyDispositions(project,diagnostics);
  const mode = options.mode ?? project.config.diagnostics.mode;
  const counts = Object.fromEntries(['PASS','FAIL','UNVERIFIED','NOT_RUN'].map(status => [status,diagnostics.filter(d=>d.status===status).length]));
  const newFailures = diagnostics.filter(d => d.status==='FAIL' && !d.disposition).length;
  const gateFailures=diagnostics.filter(d=>d.status==='FAIL'&&d.severity==='error'&&!d.disposition).length;
  const inputs = sourceInputs(project,files);
  const report = { schemaVersion:1, status: executionFaults.length?'NOT_RUN':diagnostics.some(d=>d.status==='FAIL') ? 'FAIL' : 'UNVERIFIED', completed:!executionFaults.length, executionFaults, generatedAt:new Date().toISOString(), project:project.root, installedVersion:project.packageJson.version, preset:project.config.diagnostics.preset, presetPolicy:policy, legacyBaseline:project.config.diagnostics.baseline?'EXPLICIT':'NOT_CONFIGURED', mode, diagnostics, counts, newFailures, gateFailures, sourceFingerprint: hash(JSON.stringify(inputs)), sourceInputs:inputs, configFingerprint:project.configFingerprint, checks:{syntax:'PASS',imports:'PASS',visual:'PASS',deprecatedTokens:'N/A',publicControlBypass:'UNVERIFIED',browser:'NOT_RUN'}, coverage:{deprecatedTokens:'Installed token/catalog registry contains no authoritative deprecation records; no deprecation claim is made.',publicControlBypass:'Native tags and local wrappers do not prove bypass. Equivalent-control ownership needs bindings/interface/approved adapter evidence; no blanket tag rule is applied.'}, limitations:['AST scan covers explicit configured roots only. It does not prove accessibility, business state, cascade or human visual acceptance. Native structural tags, layout/data numbers and declared third-party adapters are allowed.'], exitCode:executionFaults.length?2:mode==='gate' && gateFailures ? 1 : 0 };
  report.checks.imports = diagnostics.some(d=>d.rule.startsWith('imports/') && d.status==='UNVERIFIED') ? 'UNVERIFIED' : diagnostics.some(d=>d.rule.startsWith('imports/')) ? 'FAIL' : 'PASS';
  report.checks.visual = diagnostics.some(d=>d.rule.startsWith('visual/') && d.status==='FAIL') ? 'FAIL' : diagnostics.some(d=>d.rule.startsWith('visual/')) ? 'UNVERIFIED' : 'PASS';
  if (options.save) { const name = project.config.diagnostics.report, file = inside(project.root,name); writeAtomic(project.root,name,`${JSON.stringify(report,null,2)}\n`,existsSync(file)?hash(read(file)):null); }
  return report;
}
function isPublicSubpath(project: Project, subpath: string) { return Object.keys(project.packageJson.exports ?? {}).some(k => k === `.${subpath}` || (k.includes('*') && `.${subpath}`.startsWith(k.split('*')[0]!) && `.${subpath}`.endsWith(k.split('*')[1]!))); }
function applyDispositions(project: Project, diagnostics: Diagnostic[]) {
  const cfg = project.config.diagnostics;
  if (cfg.baseline) {
    const baseline = json(inside(project.root,cfg.baseline));
    if (baseline.schemaVersion!==1 || !Array.isArray(baseline.issues) || baseline.issues.some((i:any)=>typeof i.id!=='string' || typeof i.reason!=='string')) throw new ToolError('Invalid exact legacy baseline','INVALID_BASELINE');
    for (const d of diagnostics) { const match = baseline.issues.find((i:any)=>i.id===d.id); if(match) { d.disposition='baseline'; d.reason=match.reason; } }
  }
  if (cfg.exceptions) {
    const exceptions = json(inside(project.root,cfg.exceptions));
    if (exceptions.schemaVersion!==1 || !Array.isArray(exceptions.exceptions) || exceptions.exceptions.some((i:any)=>!i.rule || !i.file || !Number.isInteger(i.line) || typeof i.evidence!=='string' || !i.reason || !i.reviewAfter || i.file.includes('*') || Number.isNaN(Date.parse(i.reviewAfter)))) throw new ToolError('Invalid precise exceptions; require rule/file/line/evidence/reason/reviewAfter','INVALID_EXCEPTIONS');
    for (const d of diagnostics) { const match=exceptions.exceptions.find((i:any)=>i.rule===d.rule && i.file===d.file && i.line===d.line && i.evidence===d.evidence && Date.parse(i.reviewAfter)>Date.now()); if(match) { d.disposition='exception'; d.reason=match.reason; } }
  }
}
export function readReports(projectPaths: string[]) {
  return { schemaVersion:1, generatedAt:new Date().toISOString(), projects:projectPaths.map(path=>{
    try {
      const project=loadProject(path), file=inside(project.root,project.config.diagnostics.report);
      if(!existsSync(file)) return { project:project.root,installedVersion:project.packageJson.version,status:'NOT_RUN',reason:'No previously saved diagnostic report' };
      const report=json(file);
      const stale=!savedReportFreshness(project,report);
      return {project:project.root,installedVersion:project.packageJson.version,status:stale?'UNVERIFIED':report.status,stale,generatedAt:report.generatedAt,counts:report.counts,newFailures:report.newFailures,baselineIssues:report.diagnostics?.filter((d:any)=>d.disposition==='baseline').length,exceptions:report.diagnostics?.filter((d:any)=>d.disposition==='exception').length,upgradeCandidate:'NOT_RUN: no remote version query'};
    } catch(error) { return {project:path,status:'NOT_RUN',error:(error as Error).message}; }
  }), limitation:'Only explicit projects and existing reports are read. No scan or upgrade is initiated.' };
}
