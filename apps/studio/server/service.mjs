import { randomBytes, timingSafeEqual } from 'node:crypto';
import {createRequire} from 'node:module';
import {existsSync,readdirSync,readFileSync,realpathSync} from 'node:fs';
import {dirname,resolve,relative} from 'node:path';
import { loadProject, projectInfo, getTheme, updateTheme, checkProject, readReports, getImpact, ToolError,hash } from '@qingye/tooling';

const ownPackageRoot=dirname(realpathSync(createRequire(new URL('../package.json',import.meta.url)).resolve('@qingye/ui/package.json')));
function sourceFingerprint(root){
  const files=[];
  const walk=path=>{if(!existsSync(path))return;for(const entry of readdirSync(path,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){const child=resolve(path,entry.name);if(entry.isDirectory())walk(child);else if(/\.(tsx?|css)$/.test(entry.name))files.push(child);}};
  walk(resolve(root,'src'));walk(resolve(root,'tokens'));
  for(const name of ['theme.css','styles.css','motion.css','utilities.css'])if(existsSync(resolve(root,name)))files.push(resolve(root,name));
  return files.length?hash(JSON.stringify(files.sort().map(file=>({path:relative(root,file),sha256:hash(readFileSync(file,'utf8'))})))):null;
}
export function studioSourceSnapshot(){
  const own=JSON.parse(readFileSync(resolve(ownPackageRoot,'package.json'),'utf8'));
  return {version:own.version,source:'Studio local @qingye/ui source (Vite alias)',catalogFingerprint:hash(readFileSync(resolve(ownPackageRoot,'catalog.json'),'utf8')),sourceFingerprint:sourceFingerprint(ownPackageRoot)};
}
export function previewCompatibility(projectPath,snapshot=studioSourceSnapshot()){
  const target=loadProject(projectPath),targetCatalog=hash(readFileSync(resolve(target.packageRoot,'catalog.json'),'utf8')),targetSource=sourceFingerprint(target.packageRoot);
  const available=snapshot.version===target.packageJson.version && snapshot.catalogFingerprint===targetCatalog && snapshot.sourceFingerprint!==null && snapshot.sourceFingerprint===targetSource;
  return {status:available?'PASS':'UNVERIFIED',available,...snapshot,targetVersion:target.packageJson.version,targetCatalogFingerprint:targetCatalog,targetSourceFingerprint:targetSource,limitation:available?'Preview uses the same version/catalog/source as this project; browser interaction and visual acceptance still require testing.':'Target installed package differs from the built Studio source, or published source is unavailable. Component preview and Studio apply are disabled. CLI source operations remain explicit and independent.'};
}

export function createService(projectPaths, options = {}) {
  const projects = projectPaths.map((path,index) => ({ id: String(index), path: loadProject(path).root }));
  const nonce = randomBytes(32).toString('hex');
  const maxBytes = options.maxBytes ?? 512 * 1024;
  async function middleware(req,res,next) {
    if (!req.url?.startsWith('/api/')) return next();
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Cache-Control','no-store');
    res.setHeader('X-Content-Type-Options','nosniff');
    try {
      const host = req.headers.host;
      if (!host || !/^(127\.0\.0\.1|localhost):\d+$/.test(host)) throw new ToolError('Local Host header required','REQUEST_ORIGIN');
      const origin = `http://${host}`;
      if (req.headers.origin && req.headers.origin !== origin) throw new ToolError('Cross-origin request refused','REQUEST_ORIGIN');
      const url = new URL(req.url,origin);
      if (req.method === 'GET' && url.pathname === '/api/session') return send(res,200,{ nonce, projects:projects.map(p => ({id:p.id,path:p.path})) });
      if (req.method === 'GET' && url.pathname === '/api/reports') return send(res,200,readReports(projects.map(p=>p.path)));
      const project = projects.find(p=>p.id===url.searchParams.get('project'));
      if(!project) throw new ToolError('Project was not registered at service startup','PROJECT_REQUIRED');
      if(req.method==='GET' && url.pathname==='/api/project') return send(res,200,{info:projectInfo(project.path),current:getTheme(project.path),preview:previewCompatibility(project.path,options.previewSnapshot)});
      if(req.method==='GET' && url.pathname==='/api/impact') return send(res,200,getImpact(project.path,url.searchParams.get('token')??undefined,url.searchParams.get('slot')??undefined));
      if(req.method!=='POST') return send(res,404,{error:'Unknown endpoint'});
      if(req.headers.origin!==origin) throw new ToolError('Mutation requires same-origin request','REQUEST_ORIGIN');
      const supplied=String(req.headers['x-qingye-session']??'');
      if(!/^[0-9a-f]{64}$/.test(supplied) || !timingSafeEqual(Buffer.from(supplied),Buffer.from(nonce))) throw new ToolError('Invalid session token','REQUEST_ORIGIN');
      if(!String(req.headers['content-type']).startsWith('application/json')) throw new ToolError('JSON content type required','INVALID_REQUEST');
      const body=await readBody(req,maxBytes);
      if(url.pathname==='/api/theme') {if(body.apply===true&&!previewCompatibility(project.path,options.previewSnapshot).available)throw new ToolError('Studio preview source differs from target installation; use the explicit CLI or matching Studio version','PREVIEW_MISMATCH');return send(res,200,updateTheme(project.path,body.theme,{apply:body.apply===true,fingerprint:body.fingerprint,generatedFingerprint:body.generatedFingerprint,configFingerprint:body.configFingerprint}));}
      if(url.pathname==='/api/check') return send(res,200,checkProject(project.path,{save:body.save===true,mode:'report'}));
      return send(res,404,{error:'Unknown endpoint'});
    }catch(error){send(res,error.code==='REQUEST_ORIGIN'?403:error.code==='SOURCE_CONFLICT'?409:400,{status:'NOT_RUN',completed:false,error:error.message,code:error.code??'EXECUTION_FAILURE'});}
  }
  return { middleware, projectCount:projects.length };
}
function send(res,status,value){res.statusCode=status;res.end(JSON.stringify(value));}
async function readBody(req,max){let bytes=0;const chunks=[];for await(const chunk of req){bytes+=chunk.length;if(bytes>max)throw new ToolError('Request body exceeds limit','INVALID_REQUEST');chunks.push(chunk);}try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new ToolError('Malformed JSON','INVALID_REQUEST');}}
