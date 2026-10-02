import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ThemeProvider,useTheme} from '@qingye/ui/components/theme-provider';
import {Button} from '@qingye/ui/components/button';
import {Input} from '@qingye/ui/components/input';
import {Textarea} from '@qingye/ui/components/textarea';
import {Label} from '@qingye/ui/components/label';
import {Checkbox} from '@qingye/ui/components/checkbox';
import {InputGroup,InputGroupInput,InputGroupAddon,InputGroupText} from '@qingye/ui/components/input-group';
import {Card,CardHeader,CardTitle,CardPanel} from '@qingye/ui/components/card';
import {Table,TableHeader,TableBody,TableRow,TableHead,TableCell} from '@qingye/ui/components/table';
import {Menu,MenuTrigger,MenuPopup,MenuItem} from '@qingye/ui/components/menu';
import {Select,SelectTrigger,SelectValue,SelectPopup,SelectItem} from '@qingye/ui/components/select';
import {Dialog,DialogTrigger,DialogPopup,DialogTitle,DialogDescription,DialogHeader,DialogPanel,DialogFooter,DialogClose} from '@qingye/ui/components/dialog';
import {ToastProvider,toastManager} from '@qingye/ui/components/toast';
import {azure,type FrameSettings} from './shared';
import './style.css';

function Preview(){
  const [settings,setSettings]=useState<FrameSettings>({theme:azure,css:'',scheme:'light',density:'default',mode:'class',inspect:false});
  useEffect(()=>{function receive(event:MessageEvent){if(event.origin!==window.location.origin||event.source!==window.parent||event.data?.type!=='qingye-preview')return;setSettings(event.data.settings);}window.addEventListener('message',receive);window.parent.postMessage({type:'qingye-ready'},window.location.origin);return()=>window.removeEventListener('message',receive);},[]);
  return <ThemeProvider storageKey={null} attribute={settings.mode} defaultTheme="light"><ToastProvider><PreviewContent settings={settings}/></ToastProvider></ThemeProvider>;
}
function PreviewContent({settings}:{settings:FrameSettings}){
  const {setTheme}=useTheme(),[draft,setDraft]=useState('工作台主题验收'),[notes,setNotes]=useState('保留正在编辑的内容，核对明暗与密度变化。'),[query,setQuery]=useState(''),[category,setCategory]=useState<string|null>('reading'),[selected,setSelected]=useState<string[]>(['a']),[result,setResult]=useState('尚未模拟保存'),[dialogOpen,setDialogOpen]=useState(false);
  const items=[{label:'阅读',value:'reading'},{label:'编辑',value:'editing'},{label:'比较',value:'compare'}];
  useEffect(()=>{
    const html=document.documentElement;html.setAttribute('data-brand',settings.theme.brand);html.setAttribute('data-density',settings.density);setTheme(settings.scheme);
    // Remove the unselected mode's marker; the provider owns only its chosen axis.
    if(settings.mode==='class')html.removeAttribute('data-theme');else html.classList.remove('light','dark');
    let style=document.getElementById('qingye-project-theme');if(!style){style=document.createElement('style');style.id='qingye-project-theme';document.head.append(style);}style.textContent=settings.css;
  },[settings,setTheme]);
  useEffect(()=>{if(!settings.inspect)return;function inspect(event:MouseEvent){const slot=(event.target as Element).closest?.('[data-slot]');if(!slot)return;event.preventDefault();event.stopPropagation();window.parent.postMessage({type:'qingye-slot',slot:slot.getAttribute('data-slot')},window.location.origin);}document.addEventListener('click',inspect,true);return()=>document.removeEventListener('click',inspect,true);},[settings.inspect]);
  return <main className="preview-page"><section className="preview-section"><p className="eyebrow">{settings.theme.brand} · {settings.scheme} · {settings.density}</p><h1>整理一份工作记录</h1><p>真实组件预览。输入与选择由本 document 保留，主题切换不提交业务动作。</p><div className="actions"><Button>主要动作</Button><Button variant="outline">辅助动作</Button><Button disabled>不可用</Button><Button loading>处理中</Button></div><Label htmlFor="preview-query">检索记录</Label><InputGroup><InputGroupAddon><InputGroupText>查找</InputGroupText></InputGroupAddon><InputGroupInput id="preview-query" value={query} onChange={e=>setQuery(e.target.value)} placeholder="输入关键词"/></InputGroup></section>
    <Card><CardHeader><CardTitle>编辑工作记录</CardTitle></CardHeader><CardPanel><div className="form-fields"><div><Label htmlFor="draft-title">标题</Label><Input id="draft-title" value={draft} onChange={e=>setDraft(e.target.value)}/></div><div><Label htmlFor="draft-category">用途</Label><Select items={items} value={category} onValueChange={setCategory}><SelectTrigger id="draft-category"><SelectValue/></SelectTrigger><SelectPopup>{items.map(item=><SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup></Select></div><div><Label htmlFor="draft-notes">备注</Label><Textarea id="draft-notes" value={notes} onChange={e=>setNotes(e.target.value)}/></div><div className="actions"><Button onClick={()=>setResult('保存失败（模拟）。草稿已保留，可继续编辑。')}>模拟保存失败</Button><Button variant="outline" onClick={()=>{setResult('保存成功（模拟）。这是本地状态展示。');toastManager.add({title:'保存成功（模拟）',description:'主题没有改变业务结果。',type:'success'});}}>模拟保存成功</Button></div><p role="status" className="state" data-testid="draft-result">{result}</p></div></CardPanel></Card>
    <section className="preview-section"><h2>集合与选择</h2><p className="state" data-testid="selected-count">已选择 {selected.length} 项</p><Table density={settings.density==='compact'?'compact':'default'}><TableHeader><TableRow><TableHead>选择</TableHead><TableHead>记录</TableHead><TableHead>状态</TableHead></TableRow></TableHeader><TableBody>{[{id:'a',title:'字段与说明',state:'已整理'},{id:'b',title:'异常与恢复',state:'待补充'}].map(row=><TableRow key={row.id}><TableCell><Checkbox aria-label={`选择${row.title}`} checked={selected.includes(row.id)} onCheckedChange={checked=>setSelected(ids=>checked?[...ids,row.id]:ids.filter(id=>id!==row.id))}/></TableCell><TableCell>{row.title}</TableCell><TableCell>{row.state}</TableCell></TableRow>)}</TableBody></Table></section>
    <section className="reading preview-section"><h2>阅读与判断</h2><p>一份记录既要说明当前事实，也要保留继续工作的入口。主题调整可以改变色彩、关系间距和表面轮廓；标题、草稿、对象与选择范围继续由应用状态承担。</p><p>较长的中文内容与 English phrases 同时存在时，检查文字、边界与焦点是否清楚。紧凑模式仍保留字段名称与必要说明。</p></section>
    <section className="preview-section"><h2>浮层与 Portal</h2><div className="actions"><Menu><MenuTrigger render={<Button variant="outline"/>}>记录操作</MenuTrigger><MenuPopup><MenuItem onClick={()=>setResult('已选择标记动作（预览）')}>标记为待补充</MenuItem><MenuItem onClick={()=>toastManager.add({title:'通知示例',description:'Toast 位于当前 iframe document。',type:'info'})}>展示通知</MenuItem></MenuPopup></Menu><Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogTrigger render={<Button variant="outline"/>}>预览变更</DialogTrigger><DialogPopup><DialogHeader><DialogTitle>当前工作记录</DialogTitle><DialogDescription>关闭预览会返回，草稿和选择继续保留。</DialogDescription></DialogHeader><DialogPanel><p>{draft}</p><p>{notes}</p><p>选择范围：{selected.length} 项</p></DialogPanel><DialogFooter><DialogClose render={<Button variant="outline"/>}>返回编辑</DialogClose></DialogFooter></DialogPopup></Dialog><Button variant="outline" onClick={()=>toastManager.add({title:'本地通知预览',description:'不写入业务数据。',type:'info'})}>展示 Toast</Button></div></section>
  </main>;
}
createRoot(document.getElementById('root')!).render(<Preview/>);
