import * as React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@qingye/ui/components/button";
import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton, InputGroupText } from "@qingye/ui/components/input-group";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@qingye/ui/components/tabs";
import { Tree } from "@qingye/ui/components/tree";
import { Input } from "@qingye/ui/components/input";
import { Dialog, DialogTrigger, DialogPopup, DialogHeader, DialogTitle, DialogDescription, DialogPanel, DialogFooter, DialogClose } from "@qingye/ui/components/dialog";
import { DataTable } from "@qingye/ui/components/data-table";
import { ChartContainer, RechartsPrimitive } from "@qingye/ui/components/chart";
import { ThemeProvider } from "@qingye/ui/components/theme-provider";
import "./style.css";

const { BarChart, Bar, XAxis, CartesianGrid } = RechartsPrimitive;
const data = [{ id: "alpha", title: "有效内容", amount: 3 }, { id: "beta", title: "另一条内容", amount: 6 }];
const columns = [{ accessorKey: "title", header: "内容" }, { accessorKey: "amount", header: "数量" }];

function App() {
  const [text, setText] = React.useState("保留草稿");
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [groupValue, setGroupValue] = React.useState("保留这一输入");
  const [invalid, setInvalid] = React.useState(false);
  const [submits, setSubmits] = React.useState(0);
  const [tab, setTab] = React.useState("first");
  const [loads, setLoads] = React.useState(0);
  const [child, setChild] = React.useState(true);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return <ThemeProvider defaultTheme="light" disableTransitionOnChange>
    <main>
      <h1>真实包消费</h1>
      <Button id="counter" onClick={() => setCount((value) => value + 1)}>已操作 {count} 次</Button>
      <FieldGroup id="field-group">
        <Field><FieldLabel>草稿名称</FieldLabel><Input id="draft" value={text} onChange={(event) => setText(event.target.value)} /></Field>
        <Field><FieldLabel>备注</FieldLabel><Input defaultValue="既有内容" /></Field>
      </FieldGroup>
      <Dialog>
        <DialogTrigger render={<Button id="open-dialog" variant="outline" />}>打开详情</DialogTrigger>
        <DialogPopup>
          <DialogHeader><DialogTitle>确认对象</DialogTitle><DialogDescription>这一浮层读取当前文档的主题。</DialogDescription></DialogHeader>
          <DialogPanel><Input aria-label="浮层草稿" value={text} onChange={(event) => setText(event.target.value)} /><Button id="portal-button">浮层操作</Button></DialogPanel>
          <DialogFooter><DialogClose render={<Button variant="ghost" />}>返回</DialogClose></DialogFooter>
        </DialogPopup>
      </Dialog>
      <section aria-label="按需表格"><Button id="refresh" variant="outline" onClick={() => setLoading((value) => !value)}>{loading ? "完成刷新" : "开始刷新"}</Button><DataTable columns={columns} data={data} getRowId={(row) => row.id} label="内容" loading={loading} /></section>
      <section aria-label="输入共同边界">
        <form onSubmit={(event) => { event.preventDefault(); setSubmits((value) => value + 1); }}>
          <Field invalid={invalid}><FieldLabel>长度</FieldLabel><InputGroup id="contract-group"><InputGroupAddon onMouseDown={() => setCount((value) => value + 1)}><InputGroupText>长度</InputGroupText></InputGroupAddon><InputGroupInput id="group-input" value={groupValue} onChange={(event) => setGroupValue(event.target.value)} /><InputGroupAddon align="inline-end"><InputGroupText>米</InputGroupText><InputGroupButton aria-label="清空长度" onClick={() => setGroupValue("")}>×</InputGroupButton></InputGroupAddon></InputGroup></Field>
          <p id="group-submits">提交次数 {submits}</p>
        </form><Button id="group-invalid" onClick={() => setInvalid((value) => !value)}>切换字段错误</Button>
      </section>
      <section aria-label="手动页签"><Tabs value={tab} onValueChange={(value) => { setTab(String(value)); setLoads((value) => value + 1); }}><TabsList activateOnFocus={false}><TabsTab value="first">概览</TabsTab><TabsTab value="second">慢加载详情</TabsTab></TabsList><TabsPanel value="first">现有概览</TabsPanel><TabsPanel value="second">按显式激活载入的内容</TabsPanel></Tabs><p id="tab-loads">载入次数 {loads}</p></section>
      <section aria-label="树焦点恢复"><Button id="remove-tree-child" onClick={() => { clearTimeout(timer.current); timer.current=setTimeout(() => setChild(false),500); }}>延迟移除子项</Button><Tree label="资料树" defaultExpanded={["parent"]} nodes={[{id:"parent",label:"资料目录",hasChildren:true,children:child?[{id:"child",label:"即将移除"}]:[]},{id:"neighbor",label:"相邻对象"}]} /><Button id="outside-tree">树外操作</Button></section>
      <section aria-label="相邻触摸动作" id="touch-actions" style={{display:"flex",gap:"12px"}}><Button id="touch-left" size="icon-sm" aria-label="前一个动作" onClick={() => setCount(value=>value+10)}>←</Button><Button id="touch-right" size="icon-sm" aria-label="后一个动作" onClick={() => setCount(value=>value+100)}>→</Button></section>
      <section aria-label="按需图表"><ChartContainer config={{ amount: { label: "数量", color: "var(--chart-1)" } }} style={{ height: 220, width: "100%" }}><BarChart data={data} accessibilityLayer><CartesianGrid vertical={false} /><XAxis dataKey="title" /><Bar dataKey="amount" fill="var(--color-amount)" isAnimationActive={false} /></BarChart></ChartContainer></section>
    </main>
  </ThemeProvider>;
}
createRoot(document.getElementById("root")!).render(<App />);
