import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ThemeProvider,useTheme} from '@qingye/ui/components/theme-provider';
import {Button} from '@qingye/ui/components/button';
import {Input} from '@qingye/ui/components/input';
import {Textarea} from '@qingye/ui/components/textarea';
import {Checkbox} from '@qingye/ui/components/checkbox';
import {Field,FieldError,FieldLabel} from '@qingye/ui/components/field';
import {InputGroup,InputGroupInput,InputGroupAddon} from '@qingye/ui/components/input-group';
import {Card} from '@qingye/ui/components/card';
import {Table,TableContainer,TableHeader,TableBody,TableRow,TableHead,TableCell} from '@qingye/ui/components/table';
import {Menu,MenuTrigger,MenuPortal,MenuPositioner,MenuPopup,MenuItem} from '@qingye/ui/components/menu';
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
export function PreviewContent({settings}:{settings:FrameSettings}){
  const {setTheme}=useTheme(),[draft,setDraft]=useState('草稿'),[notes,setNotes]=useState(''),[query,setQuery]=useState(''),[category,setCategory]=useState<string|null>('a'),[selected,setSelected]=useState<string[]>(['a']),[invalid,setInvalid]=useState(false),[dialogOpen,setDialogOpen]=useState(false);
  const items=[{label:'选项 A',value:'a'},{label:'选项 B',value:'b'},{label:'选项 C',value:'c'}];
  useEffect(()=>{
    const html=document.documentElement;html.setAttribute('data-brand',settings.theme.brand);html.setAttribute('data-density',settings.density);setTheme(settings.scheme);
    // The provider owns its chosen axis; the independent document removes the other mode marker.
    if(settings.mode==='class')html.removeAttribute('data-theme');else html.classList.remove('light','dark');
    let style=document.getElementById('qingye-project-theme');if(!style){style=document.createElement('style');style.id='qingye-project-theme';document.head.append(style);}style.textContent=settings.css;
  },[settings,setTheme]);
  useEffect(()=>{if(!settings.inspect)return;function inspect(event:MouseEvent){const slot=(event.target as Element).closest?.('[data-slot]');if(!slot)return;event.preventDefault();event.stopPropagation();window.parent.postMessage({type:'qingye-slot',slot:slot.getAttribute('data-slot')},window.location.origin);}document.addEventListener('click',inspect,true);return()=>document.removeEventListener('click',inspect,true);},[settings.inspect]);
  return <main className="preview-page">
    <section className="preview-section"><p className="eyebrow">{settings.theme.brand} · {settings.scheme} · {settings.density}</p><h1>组件预览</h1><div className="actions"><Button>主要动作</Button><Button variant="bordered">辅助动作</Button><Button disabled>不可用</Button></div><Field><FieldLabel>输入组</FieldLabel><InputGroup><InputGroupAddon>文本</InputGroupAddon><InputGroupInput id="preview-query" value={query} onChange={event=>setQuery(event.target.value)}/></InputGroup></Field></section>
    <Card className="p-(--qy-panel-padding)"><h2>字段</h2><div className="form-fields"><Field invalid={invalid}><FieldLabel>标题</FieldLabel><Input id="draft-title" value={draft} onChange={event=>setDraft(event.target.value)}/><FieldError errors={invalid?[{message:'当前显式错误'}]:[]}/></Field><Field><FieldLabel>选项</FieldLabel><Select items={items} value={category} onValueChange={setCategory}><SelectTrigger><SelectValue/></SelectTrigger><SelectPopup>{items.map(item=><SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup></Select></Field><Field><FieldLabel>备注</FieldLabel><Textarea id="draft-notes" value={notes} onChange={event=>setNotes(event.target.value)}/></Field><Button variant="bordered" aria-pressed={invalid} onClick={()=>setInvalid(value=>!value)}>切换输入错误</Button></div></Card>
    <section className="preview-section"><h2>选择</h2><output className="state" data-testid="selected-count">已选择 {selected.length} 项</output><TableContainer><Table aria-label="选择范围"><TableHeader><TableRow><TableHead>选择</TableHead><TableHead>项</TableHead></TableRow></TableHeader><TableBody>{['a','b'].map(id=><TableRow key={id}><TableCell><Checkbox aria-label={`选择 ${id.toUpperCase()}`} checked={selected.includes(id)} onCheckedChange={checked=>setSelected(ids=>checked?[...ids,id]:ids.filter(value=>value!==id))}/></TableCell><TableHead scope="row">{id.toUpperCase()}</TableHead></TableRow>)}</TableBody></Table></TableContainer></section>
    <section className="preview-section"><h2>浮层</h2><div className="actions"><Menu><MenuTrigger render={<Button variant="bordered"/>}>菜单</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem onClick={()=>setInvalid(value=>!value)}>切换输入错误</MenuItem><MenuItem disabled>不可用</MenuItem></MenuPopup></MenuPositioner></MenuPortal></Menu><Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogTrigger render={<Button variant="bordered"/>}>预览变更</DialogTrigger><DialogPopup><DialogHeader><DialogTitle>当前输入</DialogTitle><DialogDescription>草稿与选择</DialogDescription></DialogHeader><DialogPanel><p>{draft}</p><p>{notes}</p><p>已选择 {selected.length} 项</p></DialogPanel><DialogFooter><DialogClose render={<Button variant="bordered"/>}>返回编辑</DialogClose></DialogFooter></DialogPopup></Dialog><Button variant="bordered" onClick={()=>toastManager.add({title:'本地通知预览',type:'info'})}>展示 Toast</Button></div></section>
  </main>;
}
const root=document.getElementById('root');
if(root)createRoot(root).render(<Preview/>);
