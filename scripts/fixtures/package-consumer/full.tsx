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
import { DataTable, DataTablePattern, type DataTablePatternColumn, type DataTablePatternState, type DataTableVirtualization } from "@qingye_lab/ui/components/data-table";
import { Chart, type ChartRow } from "@qingye_lab/ui/components/chart";
import { VirtualList, type VirtualListActions, type VirtualListScrollOptions } from "@qingye_lab/ui/components/virtual-list";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import { Menu, MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuItem, MenuLinkItem, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuSubmenu, MenuSubmenuTrigger, MenuTrigger, type MenuMarkerPosition } from "@qingye_lab/ui/components/menu";
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "@qingye_lab/ui/components/scroll-area";
import { ThemeProvider } from "@qingye_lab/ui/components/theme-provider";
import "./style.css";

type Entry = { id: string; label: string; raw: string };
const columns: ColumnDef<Entry>[] = [{ accessorKey: "label", header: "项" }, { accessorKey: "raw", header: "输入值" }];

type ConsumerRow = { id: string; label: string; count: number };
const completeColumnText = "完整列文字：中文与 English / the complete rendered value stays available";
const windowRows: ConsumerRow[] = Array.from({ length: 200 }, (_, index) => ({ id: `entry-${index}`, label: `${completeColumnText} ${index}`, count: 199 - index }));
const rowId = (row: ConsumerRow) => row.id;
const virtualization: DataTableVirtualization = { height: 240, estimateRowHeight: 48, overscan: 1 };
const sizedColumns: ColumnDef<ConsumerRow>[] = [{ id: "group", header: "组合列", columns: [
  { accessorKey: "label", header: "完整名称", size: 200, minSize: 180, maxSize: 240, meta: { rowHeader: true, ellipsis: true } },
  { accessorKey: "count", header: "计数", size: 100, meta: { numeric: true } },
] }];
function ConsumerTables() {
  const [data, setData] = React.useState(windowRows);
  const [sizing, setSizing] = React.useState<Record<string, number>>({});
  const [drafts, setDrafts] = React.useState<Record<string, string>>({});
  const [rowActions, setRowActions] = React.useState(0);
  const [appearance, setAppearance] = React.useState<"row" | "checkbox">("checkbox");
  const [state, setState] = React.useState<DataTablePatternState>({ sorting: [], pagination: { page: 1, pageSize: 10 }, rowSelection: {}, activeRowId: null });
  const removal = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(removal.current), []);
  const table = useReactTable({ data: windowRows.slice(0, 2), columns: sizedColumns, getRowId: rowId, getCoreRowModel: getCoreRowModel(), autoResetAll: false, state: { columnSizing: sizing } });
  const configured: DataTablePatternColumn<ConsumerRow>[] = [
    { id: "label", header: "记录名称", accessor: row => row.label, rowHeader: true, size: 220, minSize: 180, maxSize: 240, ellipsis: true },
    { id: "count", header: "记录计数", accessor: row => row.count, size: 100, numeric: true, sortable: true, sortDescFirst: false },
    { id: "draft", header: "记录草稿", accessor: row => drafts[row.id] ?? "", size: 160, cell: row => <Input aria-label={`表格草稿 ${row.id}`} value={drafts[row.id] ?? ""} onChange={event => { const value = event.currentTarget.value; setDrafts(previous => ({ ...previous, [row.id]: value })); }} /> },
    { id: "action", header: "记录操作", accessor: row => row.id, size: 100, cell: row => <Button size="sm" variant="quiet" aria-label={`记录行操作 ${row.id}`} onClick={() => setRowActions(value => value + 1)}>操作</Button> },
  ];
  return <section aria-label="包内表格能力">
    <Button id="resize-table-column" onClick={() => setSizing({ label: 500 })}>请求 500px 列宽</Button>
    <Button id="shrink-table-column" onClick={() => setSizing({ label: 20 })}>请求 20px 列宽</Button>
    <DataTable id="sized-table" table={table} caption="列宽与分组" emptyContent="没有记录" />
    <Button id="table-selection-look" onClick={() => setAppearance(value => value === "checkbox" ? "row" : "checkbox")}>切换选择外观</Button>
    <Button id="remove-window-row" onClick={() => { clearTimeout(removal.current); removal.current = setTimeout(() => setData(previous => previous.filter(row => row.id !== "entry-0")), 1500); }}>延迟移除表格首项</Button>
    <DataTablePattern data={data} columns={configured} getRowId={rowId} caption="虚拟当前集合" emptyContent="没有记录" state={state} onStateChange={setState} selection={{ label: "选择完整当前集合", rowLabel: row => `选择记录 ${row.id}` }} selectionAppearance={appearance} activeRow={{ trigger: "row" }} virtualization={virtualization} tableProps={{ id: "window-table", containerProps: { id: "window-table-viewport" } }} />
    <output id="table-selected">{Object.values(state.rowSelection).filter(Boolean).length}</output><output id="table-active">{state.activeRowId ?? "none"}</output><output id="table-row-actions">{rowActions}</output>
  </section>;
}

type ListEntry = { id: string; index: number };
const listRows: ListEntry[] = Array.from({ length: 80 }, (_, index) => ({ id: `list-${index}`, index }));
const listKey = (item: ListEntry) => item.id;
const alignStart: VirtualListScrollOptions = { align: "start" };
function ConsumerVirtualList() {
  const [items, setItems] = React.useState(listRows);
  const next = React.useRef(80);
  const previous = React.useRef(-1);
  const viewport = React.useRef<HTMLDivElement>(null);
  const actions = React.useRef<VirtualListActions>(null);
  const [nativeRef, setNativeRef] = React.useState(false);
  React.useEffect(() => setNativeRef(viewport.current?.tagName === "DIV" && typeof actions.current?.scrollToIndex === "function"), []);
  return <section aria-label="包内可变集合">
    <Button id="list-middle" onClick={() => actions.current?.scrollToIndex(40, alignStart)}>跳到集合中段</Button>
    <Button id="list-end" onClick={() => actions.current?.scrollToEnd()}>跳到集合末尾</Button>
    <Button id="prepend-list" onClick={() => { const index = previous.current--; setItems(current => [{ id: `list-${index}`, index }, ...current]); }}>插入更早条目</Button>
    <Button id="append-list" onClick={() => { const index = next.current++; setItems(current => [...current, { id: `list-${index}`, index }]); }}>追加条目</Button>
    <VirtualList id="dynamic-list" aria-label="已测量条目" ref={viewport} actionsRef={actions} measurement="dynamic" followEnd items={items} getKey={listKey} itemSize={72} height={216} overscan={1} renderItem={item => <div data-consumer-list-key={item.id} style={{ minHeight: `calc(var(--qy-control-md) * ${item.index % 3 === 0 ? 3 : 2})`, padding: "var(--qy-field-gap)" }}>条目 {item.index}</div>} />
    <output id="list-native-ref">{nativeRef ? "native-scroll-element" : "pending"}</output><output id="list-count">{items.length}</output>
  </section>;
}

function ConsumerMenuAndScroll() {
  const [checked, setChecked] = React.useState(false);
  const [range, setRange] = React.useState("current");
  const [commands, setCommands] = React.useState(0);
  const native = React.useRef<HTMLDivElement>(null);
  const [nativeRef, setNativeRef] = React.useState(false);
  const markerPosition: MenuMarkerPosition = "start";
  React.useEffect(() => setNativeRef(native.current?.id === "native-scroll"), []);
  return <section aria-label="包内菜单与滚动">
    <Menu><MenuTrigger id="capability-menu">包内菜单</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
      <MenuGroup><MenuGroupLabel id="inset-menu-label" size="sm" inset>集合选项</MenuGroupLabel>
        <MenuItem id="inset-menu-command" size="sm" inset onClick={() => setCommands(value => value + 1)}>缩进命令</MenuItem>
        <MenuLinkItem size="sm" inset href="#native-scroll">查看原生滚动</MenuLinkItem>
        <MenuCheckboxItem size="sm" markerPosition={markerPosition} checked={checked} onCheckedChange={setChecked} closeOnClick={false}>显示编号</MenuCheckboxItem>
        <MenuRadioGroup value={range} onValueChange={setRange}><MenuRadioItem size="sm" markerPosition={markerPosition} value="current" closeOnClick={false}>当前范围</MenuRadioItem><MenuRadioItem size="sm" markerPosition={markerPosition} value="all" closeOnClick={false}>全部范围</MenuRadioItem></MenuRadioGroup>
        <MenuSubmenu><MenuSubmenuTrigger size="sm" inset>更多动作</MenuSubmenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuItem>子命令</MenuItem></MenuPopup></MenuPositioner></MenuPortal></MenuSubmenu>
      </MenuGroup>
    </MenuPopup></MenuPositioner></MenuPortal></Menu>
    <output id="menu-value">{checked ? "checked" : "unchecked"}:{range}:{commands}</output>
    <ScrollArea id="native-scroll" aria-label="原生完整内容" role="region" ref={native} style={{ height: 96 }}><div style={{ height: 384 }}>原生内容完整保留</div></ScrollArea>
    <output id="scroll-native-ref">{nativeRef ? "native-scroll-element" : "pending"}</output>
    <ScrollAreaRoot id="styled-scroll" style={{ height: 144, width: 320, maxWidth: "100%" }}>
      <ScrollAreaViewport id="styled-scroll-viewport" aria-label="双轴完整内容" role="region"><ScrollAreaContent><div style={{ minWidth: 640 }}>{Array.from({ length: 24 }, (_, index) => <div key={index} style={{ height: "var(--qy-control-md)" }}>完整行 {index} · 保留横向与纵向内容</div>)}</div></ScrollAreaContent></ScrollAreaViewport>
      <ScrollAreaScrollbar id="vertical-scrollbar"><ScrollAreaThumb id="vertical-thumb" /></ScrollAreaScrollbar><ScrollAreaScrollbar id="horizontal-scrollbar" orientation="horizontal"><ScrollAreaThumb id="horizontal-thumb" /></ScrollAreaScrollbar><ScrollAreaCorner id="scroll-corner" />
    </ScrollAreaRoot>
  </section>;
}
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
      <section aria-label="表格状态"><Button id="table-busy" variant="bordered" aria-pressed={busy} onClick={() => setBusy(value => !value)}>表格 busy 属性</Button><DataTable id="entered-table" table={table} caption="输入值" emptyContent="没有输入项" busy={busy} /></section>
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
      <ConsumerTables /><ConsumerVirtualList />
      <section aria-label="包内逐点读数"><Sparkline id="static-sparkline" label="静态包内趋势" values={[1, 3, 2]} /><Sparkline id="interactive-sparkline" label="包内逐点记录" values={[2, null, 0, 7]} tooltip getPointLabel={index => `观测 ${index + 1}`} format={value => `${value}次`} width={240} appearance="area" height={40} /></section>
      <ConsumerMenuAndScroll />
    </main>
  </ThemeProvider>;
}
createRoot(document.getElementById("root")!).render(<App />);
