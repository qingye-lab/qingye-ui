import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ThemeProvider,useTheme} from '@qingye_lab/ui/components/theme-provider';
import {Button} from '@qingye_lab/ui/components/button';
import {Input} from '@qingye_lab/ui/components/input';
import {Textarea} from '@qingye_lab/ui/components/textarea';
import {Checkbox} from '@qingye_lab/ui/components/checkbox';
import {Field,FieldError,FieldGroup,FieldLabel} from '@qingye_lab/ui/components/field';
import {Form} from '@qingye_lab/ui/components/form';
import {Empty} from '@qingye_lab/ui/components/empty';
import {InputGroup,InputGroupInput,InputGroupAddon} from '@qingye_lab/ui/components/input-group';
import {Card} from '@qingye_lab/ui/components/card';
import {Table,TableContainer,TableHeader,TableBody,TableRow,TableHead,TableCell} from '@qingye_lab/ui/components/table';
import {Menu,MenuTrigger,MenuPortal,MenuPositioner,MenuPopup,MenuItem} from '@qingye_lab/ui/components/menu';
import {Select,SelectTrigger,SelectValue,SelectPopup,SelectItem} from '@qingye_lab/ui/components/select';
import {Dialog,DialogTrigger,DialogPopup,DialogTitle,DialogDescription,DialogHeader,DialogPanel,DialogFooter,DialogClose} from '@qingye_lab/ui/components/dialog';
import {ToastProvider,toastManager} from '@qingye_lab/ui/components/toast';
import {IconSearch} from '@tabler/icons-react';
import {libraryTheme,type FrameSettings} from './shared';
import './style.css';

function Preview(){
  const [settings,setSettings]=useState<FrameSettings>({theme:libraryTheme,css:'',scheme:'light',density:'default',mode:'class',inspect:false});
  useEffect(()=>{function receive(event:MessageEvent){if(event.origin!==window.location.origin||event.source!==window.parent||event.data?.type!=='qingye-preview')return;setSettings(event.data.settings);}window.addEventListener('message',receive);window.parent.postMessage({type:'qingye-ready'},window.location.origin);return()=>window.removeEventListener('message',receive);},[]);
  return <ThemeProvider storageKey={null} attribute={settings.mode} defaultTheme="light"><ToastProvider><PreviewContent settings={settings}/></ToastProvider></ThemeProvider>;
}
export function PreviewContent({settings}:{settings:FrameSettings}){
  const initial={title:'组件接入',notes:'主题、组件与接入规范。',category:'a' as string|null,selected:['a']};
  const {setTheme}=useTheme(),[draft,setDraft]=useState(initial.title),[notes,setNotes]=useState(initial.notes),[query,setQuery]=useState(''),[category,setCategory]=useState<string|null>(initial.category),[selected,setSelected]=useState<string[]>(initial.selected),[invalid,setInvalid]=useState(false),[dialogOpen,setDialogOpen]=useState(false),[applied,setApplied]=useState(initial);
  const items=[{label:'开发',value:'a'},{label:'设计',value:'b'},{label:'记录',value:'c'}];
  const documents=[{id:'a',label:'设计指南'},{id:'b',label:'组件目录'}];
  const visibleDocuments=documents.filter(document=>document.label.includes(query));
  const dirty=draft!==applied.title||notes!==applied.notes||category!==applied.category||selected.join()!==applied.selected.join();
  function restore(){setDraft(applied.title);setNotes(applied.notes);setCategory(applied.category);setSelected(applied.selected);setInvalid(false);}
  function apply(){if(!draft.trim()){setInvalid(true);document.getElementById('draft-title')?.focus();return;}setInvalid(false);setApplied({title:draft,notes,category,selected:[...selected]});toastManager.add({title:'已应用到当前预览',type:'info'});}
  useEffect(()=>{
    const html=document.documentElement;html.setAttribute('data-brand',settings.theme.brand);html.setAttribute('data-density',settings.density);setTheme(settings.scheme);
    // The provider owns its chosen axis; the independent document removes the other mode marker.
    if(settings.mode==='class')html.removeAttribute('data-theme');else html.classList.remove('light','dark');
    let style=document.getElementById('qingye-project-theme');if(!style){style=document.createElement('style');style.id='qingye-project-theme';document.head.append(style);}style.textContent=settings.css;
  },[settings,setTheme]);
  useEffect(()=>{if(!settings.inspect)return;function inspect(event:MouseEvent){const slot=(event.target as Element).closest?.('[data-slot]');if(!slot)return;event.preventDefault();event.stopPropagation();window.parent.postMessage({type:'qingye-slot',slot:slot.getAttribute('data-slot')},window.location.origin);}document.addEventListener('click',inspect,true);return()=>document.removeEventListener('click',inspect,true);},[settings.inspect]);
  return <main className="preview-page">
    <header className="preview-header"><h1 className="m-0 text-title">编辑文档</h1><div className="preview-actions">
      <Button type="submit" form="preview-document">应用到预览</Button>
      <Button variant="quiet" disabled={!dirty} onClick={restore}>还原</Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogTrigger render={<Button variant="bordered"/>}>查看内容</DialogTrigger><DialogPopup><DialogHeader><DialogTitle>{draft.trim()||'未命名文档'}</DialogTitle><DialogDescription>{items.find(item=>item.value===category)?.label}</DialogDescription></DialogHeader><DialogPanel>{notes&&<p className="m-0 text-body">{notes}</p>}<ul className="m-0 text-body">{documents.filter(document=>selected.includes(document.id)).map(document=><li key={document.id}>{document.label}</li>)}</ul></DialogPanel><DialogFooter><DialogClose render={<Button variant="quiet"/>}>返回编辑</DialogClose></DialogFooter></DialogPopup></Dialog>
      <Menu><MenuTrigger render={<Button variant="quiet"/>}>更多</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem disabled={!notes} onClick={()=>setNotes('')}>清空备注</MenuItem><MenuItem disabled={!dirty} onClick={restore}>撤销修改</MenuItem></MenuPopup></MenuPositioner></MenuPortal></Menu>
    </div></header>
    <Form id="preview-document" noValidate onSubmit={event=>{event.preventDefault();apply();}}><Card className="p-(--qy-panel-padding)"><FieldGroup>
      <Field name="title" invalid={invalid}><FieldLabel>名称</FieldLabel><Input id="draft-title" required value={draft} onChange={event=>{setDraft(event.target.value);if(event.target.value.trim())setInvalid(false);}}/><FieldError errors={invalid?[{message:'请输入文档名称。'}]:[]}/></Field>
      <Field><FieldLabel>分类</FieldLabel><Select items={items} value={category} onValueChange={setCategory}><SelectTrigger><SelectValue/></SelectTrigger><SelectPopup>{items.map(item=><SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup></Select></Field>
      <Field><FieldLabel>备注</FieldLabel><Textarea id="draft-notes" value={notes} onChange={event=>setNotes(event.target.value)}/></Field>
    </FieldGroup></Card></Form>
    <section className="preview-section" aria-labelledby="preview-documents"><div className="preview-header"><h2 id="preview-documents" className="m-0 text-heading">关联资料</h2><output className="text-support text-muted-foreground" data-testid="selected-count">已选 {selected.length} 项</output></div>
      <Field><FieldLabel>筛选资料</FieldLabel><InputGroup><InputGroupAddon><IconSearch aria-hidden="true"/></InputGroupAddon><InputGroupInput id="preview-query" value={query} onChange={event=>setQuery(event.target.value)}/></InputGroup></Field>
      {visibleDocuments.length?<TableContainer><Table aria-label="关联资料"><TableHeader><TableRow><TableHead>关联</TableHead><TableHead>名称</TableHead></TableRow></TableHeader><TableBody>{visibleDocuments.map(document=><TableRow key={document.id}><TableCell><Checkbox aria-label={`选择 ${document.label}`} checked={selected.includes(document.id)} onCheckedChange={checked=>setSelected(ids=>checked?[...ids,document.id]:ids.filter(value=>value!==document.id))}/></TableCell><TableHead scope="row">{document.label}</TableHead></TableRow>)}</TableBody></Table></TableContainer>:<Empty state="empty">没有匹配的资料</Empty>}
    </section>
  </main>;
}
const root=document.getElementById('root');
if(root)createRoot(root).render(<Preview/>);
