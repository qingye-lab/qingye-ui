import * as React from "react";
import { createRoot } from "react-dom/client";
import { getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldControl, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Form } from "@qingye_lab/ui/components/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye_lab/ui/components/input-group";
import { NativeSelect } from "@qingye_lab/ui/components/native-select";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@qingye_lab/ui/components/tabs";
import { Tree } from "@qingye_lab/ui/components/tree";
import { Input } from "@qingye_lab/ui/components/input";
import { Dialog, DialogTrigger, DialogPopup, DialogHeader, DialogTitle, DialogDescription, DialogPanel, DialogFooter, DialogClose } from "@qingye_lab/ui/components/dialog";
import { DataTable } from "@qingye_lab/ui/components/data-table";
import { Chart, type ChartRow } from "@qingye_lab/ui/components/chart";
import { ThemeProvider } from "@qingye_lab/ui/components/theme-provider";
import "./style.css";

type Entry = { id: string; label: string; raw: string };
const columns: ColumnDef<Entry>[] = [{ accessorKey: "label", header: "项" }, { accessorKey: "raw", header: "输入值" }];
function App() {
  const [text, setText] = React.useState("保留草稿");
  const [count, setCount] = React.useState(0);
  const [busy, setBusy] = React.useState(false);
  const [entries, setEntries] = React.useState<Entry[]>([{ id: "a", label: "A", raw: "0" }, { id: "b", label: "B", raw: "0" }]);
  const table = useReactTable({ data: entries, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel() });
  const rows: ChartRow[] = entries.map(entry => ({ id: entry.id, label: entry.label, values: { value: entry.raw.trim() && Number.isFinite(Number(entry.raw)) ? Number(entry.raw) : { state: "unknown", label: "数值未完整" } } }));
  const [groupValue, setGroupValue] = React.useState("保留这一输入");
  const [invalid, setInvalid] = React.useState(false);
  const [submits, setSubmits] = React.useState(0);
  const [formData, setFormData] = React.useState("");
  const [tab, setTab] = React.useState("first");
  const [activations, setActivations] = React.useState(0);
  const [child, setChild] = React.useState(true);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return <ThemeProvider defaultTheme="light" storageKey={null} disableTransitionOnChange>
    <main>
      <h1>包消费</h1>
      <Button id="counter" onClick={() => setCount(value => value + 1)}>已操作 {count} 次</Button>
      <FieldGroup id="field-group">
        <Field><FieldLabel>草稿名称</FieldLabel><Input id="draft" value={text} onChange={event => setText(event.target.value)} /></Field>
        <Field><FieldLabel>备注</FieldLabel><Input defaultValue="既有内容" /></Field>
      </FieldGroup>
      <Dialog>
        <DialogTrigger render={<Button id="open-dialog" variant="bordered" />}>打开浮层</DialogTrigger>
        <DialogPopup>
          <DialogHeader><DialogTitle>草稿</DialogTitle><DialogDescription>当前值</DialogDescription></DialogHeader>
          <DialogPanel><Input aria-label="浮层草稿" value={text} onChange={event => setText(event.target.value)} /><Button id="portal-button">浮层操作</Button></DialogPanel>
          <DialogFooter><DialogClose render={<Button variant="quiet" />}>返回</DialogClose></DialogFooter>
        </DialogPopup>
      </Dialog>
      <section aria-label="表格状态"><Button id="table-busy" variant="bordered" aria-pressed={busy} onClick={() => setBusy(value => !value)}>表格 busy 属性</Button><DataTable table={table} caption="输入值" emptyContent="没有输入项" busy={busy} /></section>
      <section aria-label="输入共同边界">
        <Form noValidate onSubmit={event => { event.preventDefault(); setSubmits(value => value + 1); setFormData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)))); }}>
          <Field name="text" invalid={invalid}><FieldLabel>文本</FieldLabel><InputGroup id="contract-group"><InputGroupAddon>文本</InputGroupAddon><InputGroupInput id="group-input" value={groupValue} onChange={event => setGroupValue(event.target.value)} /><InputGroupAddon><Button type="button" variant="quiet" size="md" className="min-h-0 self-stretch sm:min-h-0" aria-label="清空文本" onClick={() => setGroupValue("")}>清空</Button></InputGroupAddon></InputGroup><FieldError errors={invalid ? [{ message: "当前显式错误" }] : []} /></Field>
          <Field name="unit"><FieldLabel>单位</FieldLabel><FieldControl defaultValue="px" render={<NativeSelect><optgroup label="单位"><option value="px">px</option><option value="em">em</option><option disabled value="disabled">禁用</option></optgroup></NativeSelect>} /></Field>
          <Button type="submit" id="native-submit">提交字段</Button><output id="group-submits">提交次数 {submits}</output><output id="native-values">{formData}</output>
        </Form><Button id="group-invalid" onClick={() => setInvalid(value => !value)}>切换字段错误</Button>
      </section>
      <section aria-label="手动页签"><Tabs value={tab} onValueChange={value => { setTab(String(value)); setActivations(value => value + 1); }}><TabsList activateOnFocus={false} aria-label="输入视角"><TabsTab value="first">名称</TabsTab><TabsTab value="second">数值</TabsTab></TabsList><TabsPanel value="first"><Input aria-label="页签草稿" defaultValue="保留页签输入" /></TabsPanel><TabsPanel value="second">0</TabsPanel></Tabs><output id="tab-activations">激活次数 {activations}</output></section>
      <section aria-label="树焦点恢复"><Button id="remove-tree-child" onClick={() => { clearTimeout(timer.current); timer.current = setTimeout(() => setChild(false), 500); }}>延迟移除子项</Button><Tree aria-label="层级集合" defaultExpandedIds={["parent"]} nodes={[{ id: "parent", label: "父项", children: child ? [{ id: "child", label: "子项" }] : [] }, { id: "neighbor", label: "相邻项" }]} /><Button id="outside-tree">树外操作</Button></section>
      <section aria-label="同源图表">{entries.map(entry => <Field key={entry.id}><FieldLabel>{entry.label} 数值</FieldLabel><Input type="number" value={entry.raw} onChange={event => setEntries(value => value.map(item => item.id === entry.id ? { ...item, raw: event.target.value } : item))} /></Field>)}<Chart type="bar" label="输入数值" categoryLabel="项" valueLabel="数值" rows={rows} series={[{ key: "value", label: "数值" }]} /></section>
    </main>
  </ThemeProvider>;
}
createRoot(document.getElementById("root")!).render(<App />);
