import React,{useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {createRoot} from 'react-dom/client';
import {Button} from '@qingye_lab/ui/components/button';
import {Input} from '@qingye_lab/ui/components/input';
import {Label} from '@qingye_lab/ui/components/label';
import {NativeSelect} from '@qingye_lab/ui/components/native-select';
import {Checkbox} from '@qingye_lab/ui/components/checkbox';
import {linkClassName} from '@qingye_lab/ui/components/link';
import {amber,type FrameSettings} from './shared';
import {StudioProjectState} from './project-state';
import './style.css';

async function api(url:string,body?:unknown,nonce?:string){const response=await fetch(url,body===undefined?undefined:{method:'POST',headers:{'Content-Type':'application/json','X-Qingye-Session':nonce??''},body:JSON.stringify(body)});const result=await response.json();if(!response.ok)throw new Error(`${result.code}: ${result.error}`);return result;}
function App(){
  const [session,setSession]=useState<{nonce:string;projects:{id:string;path:string}[]}|null>(null),[sessionError,setSessionError]=useState('');
  const [model]=useState(()=>new StudioProjectState(api));
  const {project,current,candidate,info,compatibility,candidateCss,previewCandidate,diff,error,message,busy,loading,ready,impact,reports,check,candidateRevision,previewPending}=useSyncExternalStore(model.subscribe,model.getSnapshot);
  const [inspect,setInspect]=useState(false),[editAxis,setEditAxis]=useState<'common'|'light'|'dark'|'compact'>('light');
  const [leftScheme,setLeftScheme]=useState<'light'|'dark'>('light'),[rightScheme,setRightScheme]=useState<'light'|'dark'>('dark'),[leftDensity,setLeftDensity]=useState<'default'|'compact'>('default'),[rightDensity,setRightDensity]=useState<'default'|'compact'>('compact');
  const left=useRef<HTMLIFrameElement>(null),right=useRef<HTMLIFrameElement>(null);
  const editable=model.canEdit();
  useEffect(()=>{let active=true;api('/api/session').then(s=>{if(!active)return;setSession(s);model.load(s.projects[0]?.id??'');}).catch(e=>{if(active)setSessionError(e.message);});return()=>{active=false;model.dispose();};},[model]);
  useEffect(()=>{if(!candidate||!current||!session||!ready||busy||!previewPending)return;const timeout=window.setTimeout(()=>{model.preview(session.nonce);},150);return()=>window.clearTimeout(timeout);},[candidate,current,project,session,ready,busy,candidateRevision,previewPending,model]);
  const mode=info?.theme?.mode??'class';
  const send=(frame:HTMLIFrameElement|null,settings:FrameSettings)=>frame?.contentWindow?.postMessage({type:'qingye-preview',settings},window.location.origin);
  function sync(){if(!compatibility?.available)return;if(current?.theme&&current.status!=='FAIL')send(left.current,{theme:current.theme,css:current.css??'',scheme:leftScheme,density:leftDensity,mode,inspect});if(previewCandidate&&candidateCss)send(right.current,{theme:previewCandidate,css:candidateCss,scheme:rightScheme,density:rightDensity,mode,inspect});}
  useEffect(sync,[current,previewCandidate,candidateCss,leftScheme,rightScheme,leftDensity,rightDensity,mode,inspect,compatibility]);
  useEffect(()=>{function onMessage(event:MessageEvent){if(event.origin!==window.location.origin||![left.current?.contentWindow,right.current?.contentWindow].includes(event.source as Window))return;if(event.data?.type==='qingye-ready')sync();if(event.data?.type==='qingye-slot'&&typeof event.data.slot==='string')queryImpact(undefined,event.data.slot);}window.addEventListener('message',onMessage);return()=>window.removeEventListener('message',onMessage);});
  function tokenValue(token:string){return candidate?.[editAxis]?.[token]??candidate?.common?.[token]??current?.registry.find(t=>t.name===token)?.definitions[0]?.value??'';}
  function setToken(token:string,value:string){model.setCandidate(t=>t?{...t,[editAxis]:{...t[editAxis],[token]:value}}:t);}
  const queryImpact=(token?:string,slot?:string)=>model.queryImpact(token,slot);
  function exportTheme(){if(!candidate)return;const blob=new Blob([JSON.stringify(candidate,null,2)+'\n'],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='ui.theme.json';link.click();URL.revokeObjectURL(url);}
  const basicTokens=['--qy-primary','--qy-primary-foreground','--qy-control-md','--qy-radius-control','--qy-radius-panel'];
  const advanced=current?.registry.filter(t=>/^--qy-(text-|space-|gap-|panel-|section-|focus-|duration-|ease-)/.test(t.name))??[];
  function field(token:string){return <div className="token-field" key={token}><Label htmlFor={token}>{token}</Label><div className="token-row"><Input id={token} disabled={!editable} value={tokenValue(token)} onChange={e=>setToken(token,e.target.value)} /><Button variant="quiet" size="sm" disabled={!ready} onClick={()=>queryImpact(token)}>影响</Button><Button variant="quiet" size="sm" disabled={!editable} aria-label={`移除覆盖 ${token}`} onClick={()=>model.setCandidate(t=>{if(!t)return t;const values={...t[editAxis]};delete values[token];return {...t,[editAxis]:values};})}>移除</Button></div></div>;}
  return <main className="studio-shell" aria-busy={loading||busy}><header className="studio-header"><div><h1>Theme Studio</h1></div><label>已登记项目<NativeSelect value={project} onChange={e=>{model.load(e.target.value);}} aria-label="已登记项目"><option value="">选择项目</option>{session?.projects.map(p=><option key={p.id} value={p.id}>{p.path}</option>)}</NativeSelect><span className="project-path">{session?.projects.find(p=>p.id===project)?.path}</span></label></header>
    {!session?.projects.length&&<p role="status">暂无项目。用 QINGYE_STUDIO_PROJECTS 登记项目目录。</p>}
    {loading&&<p className="notice" role="status">正在读取所选项目…</p>}{(error||sessionError)&&<p className="notice error" role="alert">{error||sessionError}</p>}{message&&<p className="notice" role="status">{message}</p>}
    {project&&!current&&!loading&&<Button variant="quiet" onClick={()=>{model.load(project);}}>重新读取</Button>}
    {current&&<><div className="actions"><Button variant="bordered" disabled={!editable} onClick={()=>document.getElementById('theme-import')?.click()}>导入 JSON</Button><input id="theme-import" type="file" accept="application/json,.json" hidden disabled={!editable} onChange={e=>{if(e.target.files?.[0]&&session)model.importTheme(e.target.files[0],session.nonce);e.target.value='';}}/><Button variant="bordered" disabled={!editable||!candidate} onClick={exportTheme}>导出候选</Button><Button variant="quiet" disabled={!editable} onClick={()=>model.setCandidate(current.theme,'未应用的修改已重置。')}>重置未应用修改</Button><Button disabled={!model.canApply()} onClick={()=>{if(session)model.apply(session.nonce);}}>{busy?'应用中…':'应用主题'}</Button><Button variant="quiet" disabled={loading||busy} onClick={()=>{model.load(project);}}>重新读取</Button></div>
    <div className="workspace"><aside className="editor"><h2>项目主题</h2><p className="muted">安装版本 {info?.version} · {info?.theme?.source}</p>{!current.generatedMatches&&<p role="status">生成 CSS 与主题源尚未一致。应用可重生成；手写目标会被拒绝。</p>}
      <Label htmlFor="brand">品牌标识</Label><Input id="brand" disabled={!editable} value={candidate?.brand??''} onChange={e=>model.setCandidate(t=>t?{...t,brand:e.target.value}:t)}/>
      <label>编辑范围<NativeSelect aria-label="编辑范围" disabled={!editable} value={editAxis} onChange={e=>setEditAxis(e.target.value as any)}><option value="common">共用</option><option value="light">浅色</option><option value="dark">深色</option><option value="compact">紧凑</option></NativeSelect></label>
      <h3>外观</h3>{basicTokens.filter(t=>current.registry.some(r=>r.name===t)).map(field)}
      <Button variant="bordered" disabled={!editable} onClick={()=>model.setCandidate(amber,'Amber 配色已载入，尚未应用。')}>试用 Amber 配色</Button>
      <details><summary>高级：文字、关系间距、焦点与动效</summary>{advanced.map(t=>field(t.name))}</details>
      <details><summary>只读既有 CSS 与迁移候选</summary><pre>{JSON.stringify(current.legacy,null,2)}</pre></details>
    </aside><section className="comparison"><div className="preview-toolbar"><h2>预览</h2><a className={linkClassName} href="/preview.html" target="_blank" rel="noreferrer">库默认</a><label><Checkbox checked={inspect} onCheckedChange={setInspect}/>查看部位引用</label></div><p className="muted">预览版本 {compatibility?.version} · {compatibility?.source} · {compatibility?.status}</p>{!compatibility?.available&&<p role="status">{compatibility?.limitation}</p>}<div className="frames">{compatibility?.available&&[['已应用',left,leftScheme,setLeftScheme,leftDensity,setLeftDensity],['候选',right,rightScheme,setRightScheme,rightDensity,setRightDensity]].map(([title,frame,scheme,setScheme,density,setDensity],i)=><section className="frame-panel" key={i}><div className="frame-heading"><h3>{title as string}</h3><NativeSelect aria-label={`${title}明暗`} value={scheme as string} onChange={e=>(setScheme as any)(e.target.value)}><option value="light">浅色</option><option value="dark">深色</option></NativeSelect><NativeSelect aria-label={`${title}密度`} value={density as string} onChange={e=>(setDensity as any)(e.target.value)}><option value="default">标准</option><option value="compact">紧凑</option></NativeSelect></div><iframe ref={frame as React.RefObject<HTMLIFrameElement>} title={`${title}真实组件预览`} src="/preview.html" onLoad={sync}/></section>)}</div>
      <details open><summary>候选差异 · {diff.length} 项</summary><pre>{JSON.stringify(diff,null,2)}</pre></details>
      <section className="evidence"><h3>影响与元素归属</h3>{impact?<><p>{impact.status} · 静态来源 {impact.staticFresh?'匹配':'未知/陈旧'} · 测量 {impact.runtimeFresh?'匹配':'NOT_RUN'}</p><p className="muted">{impact.limitation}</p><pre>{JSON.stringify({layer:impact.layer,records:impact.records,observations:impact.observations,changedInputs:impact.changedInputs},null,2)}</pre></>:<p className="muted">点击参数的“影响”，或开启查询后点击预览中的 data-slot 部位。没有记录不代表没有影响。</p>}</section>
    </section></div><section className="reports"><h2>项目诊断与已有报告</h2><div className="actions"><Button variant="bordered" disabled={!ready} onClick={()=>{if(session)model.checkProject(session.nonce);}}>运行当前项目报告</Button><Button variant="bordered" disabled={!ready} onClick={()=>{model.readReports();}}>读取多项目已有报告</Button></div><p className="muted">默认 report；不修改旧问题基线，不自动升级。退出 0 不代表全部诊断通过。</p>{check&&<pre>{JSON.stringify(check,null,2)}</pre>}{reports&&<pre>{JSON.stringify(reports,null,2)}</pre>}</section></>}
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
