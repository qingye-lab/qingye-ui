import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

// Execute the same state owner used by React, without starting a browser or service.
const source=readFileSync(new URL('../src/project-state.ts',import.meta.url),'utf8');
const javascript=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
const {StudioProjectState}=await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`);
const theme=brand=>({schemaVersion:1,brand,common:{},light:{'--qy-control-md':'32px'},dark:{},compact:{}});
const projectResult=brand=>({info:{version:brand,theme:{mode:'class'}},preview:{available:true},current:{status:'PASS',validation:{errors:[]},theme:theme(brand),css:`css-${brand}`,fingerprint:`source-${brand}`,generatedFingerprint:`generated-${brand}`,configFingerprint:`config-${brand}`,registry:[],generatedMatches:true,legacy:[]}});
const previewResult=(brand,diff=[{token:'--qy-control-md'}])=>({theme:theme(brand),css:`candidate-css-${brand}`,diff});
function deferred(){let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});return {promise,resolve,reject};}
function setup(){
  const requests=[];
  const model=new StudioProjectState((url,body,nonce)=>{const response=deferred();requests.push({url,body,nonce,...response});return response.promise;});
  return {model,requests};
}
async function load(model,requests,brand){const task=model.load(brand);requests.at(-1).resolve(projectResult(brand));await task;}
async function preview(model,requests,brand){const task=model.preview('session');requests.at(-1).resolve(previewResult(brand));await task;}

test('project switches reject late success and failure, even A → B → A',async()=>{
  for(const obsoleteOutcome of ['success','failure']){
    const {model,requests}=setup();
    const oldA=model.load('A'),oldB=model.load('B'),newA=model.load('A');
    assert.equal(model.getSnapshot().loading,true);
    assert.equal(model.getSnapshot().current,null);
    assert.equal(model.canApply(),false);
    requests[2].resolve(projectResult('new-A'));await newA;
    if(obsoleteOutcome==='success')requests[0].resolve(projectResult('old-A'));
    else requests[0].reject(new Error('old-A failed'));
    requests[1].reject(new Error('old-B failed'));await Promise.all([oldA,oldB]);
    assert.equal(model.getSnapshot().project,'A');
    assert.equal(model.getSnapshot().candidate.brand,'new-A');
    assert.equal(model.getSnapshot().info.version,'new-A');
    assert.equal(model.getSnapshot().error,'');
  }
});

test('reread locks the old candidate and invalidates old preview, while failure retains useful work',async()=>{
  const {model,requests}=setup();await load(model,requests,'A');
  model.setCandidate(theme('draft-A'));await preview(model,requests,'draft-A');
  assert.equal(model.canApply(),true);
  const oldPreview=model.preview('session'),oldRequest=requests.at(-1);
  const reread=model.load('A'),readRequest=requests.at(-1);
  assert.equal(model.getSnapshot().candidate.brand,'draft-A');
  assert.equal(model.canEdit(),false);
  assert.equal(model.canApply(),false);
  const requestCount=requests.length;await model.apply('session');assert.equal(requests.length,requestCount);
  oldRequest.resolve(previewResult('obsolete'));await oldPreview;
  assert.equal(model.getSnapshot().candidateCss,'');
  readRequest.reject(new Error('reread failed'));await reread;
  assert.equal(model.getSnapshot().candidate.brand,'draft-A');
  assert.equal(model.getSnapshot().current.theme.brand,'A');
  assert.equal(model.getSnapshot().error,'reread failed');
  assert.equal(model.canApply(),false);
  await load(model,requests,'A');assert.equal(model.canEdit(),true);
});

test('candidate edits invalidate preview immediately and late preview failure cannot replace a newer result',async()=>{
  const {model,requests}=setup();await load(model,requests,'B');await preview(model,requests,'B');
  assert.equal(model.canApply(),true);
  const old=model.preview('session'),oldRequest=requests.at(-1);
  model.setCandidate(theme('new-B'));
  assert.equal(model.getSnapshot().candidateCss,'');assert.equal(model.canApply(),false);
  const newest=model.preview('session'),newRequest=requests.at(-1);
  newRequest.resolve(previewResult('new-B'));await newest;
  oldRequest.reject(new Error('obsolete preview failed'));await old;
  assert.equal(model.getSnapshot().previewCandidate.brand,'new-B');
  assert.equal(model.getSnapshot().error,'');assert.equal(model.canApply(),true);
  const resetRevision=model.getSnapshot().candidateRevision;
  model.setCandidate(model.getSnapshot().candidate);
  assert.ok(model.getSnapshot().candidateRevision>resetRevision);
  assert.equal(model.canApply(),false);
});

test('older previews cannot write into a switched project, including an error during B loading',async()=>{
  for(const obsoleteOutcome of ['success','failure']){
    const {model,requests}=setup();await load(model,requests,'A');
    const pending=model.preview('session'),oldRequest=requests.at(-1);
    const next=model.load('B'),newRequest=requests.at(-1);
    if(obsoleteOutcome==='success')oldRequest.resolve(previewResult('A'));
    else oldRequest.reject(new Error('A preview failed'));
    await pending;
    assert.equal(model.getSnapshot().previewCandidate,null);assert.equal(model.getSnapshot().error,'');
    newRequest.resolve(projectResult('B'));await next;
    assert.equal(model.getSnapshot().candidate.brand,'B');
  }
});

test('apply fixes its project, theme and fingerprints at dispatch, and ignores obsolete completion',async()=>{
  for(const obsoleteOutcome of ['success','failure']){
    const {model,requests}=setup();await load(model,requests,'A');
    model.setCandidate(theme('draft-A'));await preview(model,requests,'draft-A');
    const applying=model.apply('session'),write=requests.at(-1);
    assert.equal(write.url,'/api/theme?project=A');
    assert.equal(write.body.theme.brand,'draft-A');assert.equal(write.body.fingerprint,'source-A');
    assert.equal(write.body.generatedFingerprint,'generated-A');assert.equal(write.body.configFingerprint,'config-A');
    assert.equal(write.body.apply,true);assert.equal(write.nonce,'session');
    await load(model,requests,'B');
    const count=requests.length;
    if(obsoleteOutcome==='success')write.resolve({completed:true});
    else write.reject(new Error('A write failed'));
    await applying;
    assert.equal(requests.length,count,'obsolete apply must not reload A or B');
    assert.equal(model.getSnapshot().candidate.brand,'B');assert.equal(model.getSnapshot().busy,false);
    assert.equal(model.getSnapshot().message,'');assert.equal(model.getSnapshot().error,'');
  }
});

test('current apply rereads only its own project; write success remains explicit if reread fails',async()=>{
  const {model,requests}=setup();await load(model,requests,'B');await preview(model,requests,'B');
  const applying=model.apply('session'),write=requests.at(-1);write.resolve({completed:true});
  await Promise.resolve();
  assert.equal(requests.at(-1).url,'/api/project?project=B');assert.equal(model.getSnapshot().loading,true);
  requests.at(-1).reject(new Error('read after write failed'));await applying;
  assert.match(model.getSnapshot().message,/已应用/);assert.equal(model.getSnapshot().error,'read after write failed');
  assert.equal(model.canApply(),false);
});

test('import binds identity before file reading and does not send a switched project the old file',async()=>{
  const {model,requests}=setup();await load(model,requests,'A');
  const contents=deferred(),importing=model.importTheme({text:()=>contents.promise},'session');
  await load(model,requests,'B');
  const count=requests.length;contents.resolve(JSON.stringify(theme('file-A')));await importing;
  assert.equal(requests.length,count);assert.equal(model.getSnapshot().candidate.brand,'B');
});

test('import validation success and failure cannot overwrite another project or a newer local edit',async()=>{
  for(const obsoleteOutcome of ['success','failure']){
    const {model,requests}=setup();await load(model,requests,'A');
    const importing=model.importTheme({text:async()=>JSON.stringify(theme('file-A'))},'session');
    await Promise.resolve();const oldRequest=requests.at(-1);
    assert.equal(oldRequest.url,'/api/theme?project=A');assert.equal(oldRequest.body.fingerprint,'source-A');
    await load(model,requests,'B');
    if(obsoleteOutcome==='success')oldRequest.resolve(previewResult('file-A'));
    else oldRequest.reject(new Error('old import failed'));
    await importing;
    assert.equal(model.getSnapshot().candidate.brand,'B');assert.equal(model.getSnapshot().error,'');assert.equal(model.getSnapshot().message,'');
  }
  const {model,requests}=setup();await load(model,requests,'A');
  const contents=deferred(),importing=model.importTheme({text:()=>contents.promise},'session');
  model.setCandidate(theme('newer-local-edit'));
  contents.reject(new Error('file read failed'));await importing;
  assert.equal(model.getSnapshot().candidate.brand,'newer-local-edit');assert.equal(model.getSnapshot().error,'');
});

test('import suspends old preview and a failed import preserves the draft for correction',async()=>{
  const {model,requests}=setup();await load(model,requests,'A');
  model.setCandidate(theme('draft-A'));
  const oldPreview=model.preview('session'),oldRequest=requests.at(-1),contents=deferred();
  const importing=model.importTheme({text:()=>contents.promise},'session');
  const count=requests.length;await model.preview('session');assert.equal(requests.length,count);
  oldRequest.resolve(previewResult('obsolete-preview'));await oldPreview;
  assert.equal(model.getSnapshot().previewCandidate,null);assert.equal(model.canApply(),false);
  contents.resolve('{malformed');await importing;
  assert.equal(model.getSnapshot().candidate.brand,'draft-A');assert.match(model.getSnapshot().error,/导入失败/);
  model.setCandidate(theme('corrected-A'));await preview(model,requests,'corrected-A');assert.equal(model.canApply(),true);
});

test('impact, current report and multi-project report responses stay with the selected project',async()=>{
  for(const operation of ['queryImpact','checkProject','readReports']){
    for(const obsoleteOutcome of ['success','failure']){
      const {model,requests}=setup();await load(model,requests,'A');
      const old=model[operation]('session'),oldRequest=requests.at(-1);
      await load(model,requests,'B');
      const newest=model[operation]('session'),newRequest=requests.at(-1);
      newRequest.resolve({project:'B'});await newest;
      if(obsoleteOutcome==='success')oldRequest.resolve({project:'A'});
      else oldRequest.reject(new Error('old-A result failed'));
      await old;
      const field={queryImpact:'impact',checkProject:'check',readReports:'reports'}[operation];
      assert.equal(model.getSnapshot()[field].project,'B');assert.equal(model.getSnapshot().error,'');
    }
  }
});

test('latest impact request wins within a project and clearing selection invalidates pending work',async()=>{
  const {model,requests}=setup();await load(model,requests,'A');
  const first=model.queryImpact('--qy-primary'),firstRequest=requests.at(-1);
  const second=model.queryImpact('--qy-control-md'),secondRequest=requests.at(-1);
  secondRequest.resolve({token:'--qy-control-md'});await second;
  firstRequest.reject(new Error('obsolete impact failed'));await first;
  assert.equal(model.getSnapshot().impact.token,'--qy-control-md');assert.equal(model.getSnapshot().error,'');
  const pending=model.checkProject('session'),pendingRequest=requests.at(-1);await model.load('');
  pendingRequest.resolve({project:'A'});await pending;
  assert.equal(model.getSnapshot().current,null);assert.equal(model.getSnapshot().check,null);assert.equal(model.canEdit(),false);
});
