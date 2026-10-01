import { useId, useMemo, useRef, useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Card, CardPanel } from "@qingye/ui/components/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, RechartsPrimitive } from "@qingye/ui/components/chart";
import { DatePicker, formatLocalDate, parseLocalDate } from "@qingye/ui/components/date-picker";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { AspectRatio } from "@qingye/ui/components/aspect-ratio";
import { Badge } from "@qingye/ui/components/badge";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@qingye/ui/components/item";
import { SearchInput } from "@qingye/ui/components/search-input";
import { Stat, StatDelta, StatDescription, StatLabel, StatValue } from "@qingye/ui/components/stat";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { Progress } from "@qingye/ui/components/progress";
import { Heading as UIHeading } from "@qingye/ui/components/typography";
import { toastManager } from "@qingye/ui/components/toast";
import { ArrowDownToLine, ArrowRight, CalendarDays, ChartNoAxesCombined, Check, ChevronRight, FileText, Folder, LayoutDashboard, MoreHorizontal, Target, Users, UserPlus } from "lucide-react";
import { AppFrame, EmptyResult, ExampleSelect, type DemoProps } from "./shared";

const { Area, AreaChart, CartesianGrid, XAxis, YAxis } = RechartsPrimitive;
type Project = { id: string; name: string; client: string; status: "active" | "complete"; start: string; due: string; amount: number; progress: number; category: string; image: string };
const initialProjects: Project[] = [
  { id: "p1", name: "山间民宿品牌设计", client: "山间民宿", status: "active", start: "2026-08-01", due: "2026-10-15", amount: 48000, progress: 80, category: "品牌设计", image: "architecture" },
  { id: "p2", name: "FIELD 摄影网站", client: "FIELD", status: "active", start: "2026-07-10", due: "2026-09-20", amount: 36000, progress: 60, category: "网站开发", image: "forest" },
  { id: "p3", name: "观物电商体验", client: "观物", status: "active", start: "2026-08-15", due: "2026-11-30", amount: 28000, progress: 35, category: "产品设计", image: "desk" },
  { id: "p4", name: "松间咖啡包装", client: "松间咖啡", status: "complete", start: "2026-06-01", due: "2026-08-10", amount: 16000, progress: 100, category: "包装设计", image: "coffee" },
];
const monthRevenue = [15000, 24000, 32000, 28000, 40000, 36000, 49000, 58000, 68430];

function exportProjects(projects: Project[]) {
  const rows = [["项目", "客户", "状态", "开始日期", "截止日期", "金额"], ...projects.map((project) => [project.name, project.client, project.status === "active" ? "进行中" : "已完成", project.start, project.due, String(project.amount)])];
  const csv = "\uFEFF" + rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "qingye-projects.csv";
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toastManager.add({ title: `已导出 ${projects.length} 个项目`, description: "CSV 已下载到本机。", type: "success" });
}

export function DashboardDemo({ embedded = false }: DemoProps) {
  const [section, setSection] = useState("overview");
  const [period, setPeriod] = useState("month");
  const [month, setMonth] = useState("09");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [client, setClient] = useState("all");
  const [sort, setSort] = useState("newest");
  const [series, setSeries] = useState("revenue");
  const chartConfig = { revenue: { label: series === "expenses" ? "支出" : "收入", color: "var(--qy-chart-1)" } };
  const [projects, setProjects] = useState(initialProjects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [editName, setEditName] = useState("");
  const [editDue, setEditDue] = useState("");
  const tableRef = useRef<HTMLDivElement>(null);
  const gradientId = useId().replaceAll(":", "");
  const editDueId = `project-due-${gradientId}`;
  const minimumDue = parseLocalDate(editing?.start);
  const filteredProjects = useMemo(() => projects.filter((project) => (status === "all" || project.status === status) && (client === "all" || project.client === client) && `${project.name} ${project.client} ${project.category}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "amount" ? b.amount - a.amount : sort === "due" ? a.due.localeCompare(b.due) : b.start.localeCompare(a.start)), [projects, status, client, query, sort]);
  const chartData = useMemo(() => {
    const multiplier = month === "08" ? 0.86 : month === "07" ? 0.72 : 1;
    const source = period === "week" ? [2800, 3600, 3100, 4700, 3900, 5200, 6800] : period === "quarter" ? [71000, 104000, 175430] : monthRevenue;
    return source.map((value, index) => ({ label: period === "week" ? ["一", "二", "三", "四", "五", "六", "日"][index] : period === "quarter" ? `Q${index + 1}` : `${index + 1}月`, revenue: Math.round(value * multiplier * (series === "expenses" ? 0.36 : 1)) }));
  }, [month, period, series]);
  const scale = month === "08" ? 0.87 : month === "07" ? 0.74 : 1;
  const resetFilters = () => { setQuery(""); setStatus("all"); setClient("all"); };
  const openEdit = (project: Project) => { setEditName(project.name); setEditDue(project.due); setEditing(project); };
  const nav = [{ id: "overview", label: "概览", icon: LayoutDashboard }, { id: "projects", label: "项目", icon: Folder }, { id: "clients", label: "客户", icon: Users }, { id: "files", label: "文件", icon: FileText }];

  return <AppFrame embedded={embedded} active={section} onNavigate={setSection} nav={nav} footer={<Button className="example-nav-item" variant="ghost" onClick={() => setInviteOpen(true)}><UserPlus size={17} aria-hidden />邀请成员</Button>}>
    <div className="dashboard-content">
      <header className="dashboard-heading"><div><UIHeading className="example-screen-title" level={embedded ? 2 : 1} size="display">{section === "overview" ? "经营概览" : section === "projects" ? "项目管理" : section === "clients" ? "客户" : "项目文件"}</UIHeading><p className="text-body text-muted-foreground">{section === "overview" ? "收入趋势、项目进度与项目列表。" : section === "projects" ? "筛选、排序和编辑项目资料。" : section === "clients" ? "按客户查看合作项目。" : "项目交付与设计资料。"}</p></div><div className="dashboard-heading-actions"><ExampleSelect label="选择月份" value={month} onChange={setMonth} options={[{ value: "09", label: "2026 年 9 月" }, { value: "08", label: "2026 年 8 月" }, { value: "07", label: "2026 年 7 月" }]} icon={<CalendarDays size={15} aria-hidden />} /><ExampleSelect label="统计周期" value={period} onChange={setPeriod} options={[{ value: "month", label: "按月" }, { value: "week", label: "按周" }, { value: "quarter", label: "按季度" }]} /><Button className="example-primary" onClick={() => exportProjects(filteredProjects)}><ArrowDownToLine aria-hidden /><span>导出数据</span></Button></div></header>
      {section === "overview" && <>
        <section className="dashboard-metrics" aria-label="经营指标">{[
          { label: "总收入", value: `¥ ${Math.round(128430 * scale).toLocaleString("zh-CN")}`, change: "12.8%", icon: ChartNoAxesCombined },
          { label: "活跃客户", value: String(Math.round(248 * scale)), change: "8.2%", icon: Users },
          { label: "进行中项目", value: "12", change: "持平", icon: Folder },
          { label: "完成率", value: month === "09" ? "94.6%" : month === "08" ? "92.3%" : "91.8%", change: "2.3%", icon: Target },
        ].map(({ label, value, change, icon: Icon }) => <Card key={label} size="sm" className="metric-card"><CardPanel><Stat><StatLabel><Icon aria-hidden />{label}</StatLabel><StatValue>{value}</StatValue><StatDescription><StatDelta trend={change === "持平" ? "flat" : "up"}>{change}</StatDelta>较上月</StatDescription></Stat></CardPanel></Card>)}</section>
        <section className="dashboard-chart-grid">
          <Card className="example-panel revenue-panel"><div className="example-panel-heading"><UIHeading level={embedded ? 3 : 2} size="heading">{series === "revenue" ? "收入趋势" : "支出趋势"}</UIHeading><ExampleSelect label="图表指标" value={series} onChange={setSeries} options={[{ value: "revenue", label: "收入" }, { value: "expenses", label: "支出" }]} /></div><ChartContainer config={chartConfig} className="dashboard-chart"><AreaChart accessibilityLayer data={chartData} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}><defs><linearGradient id={`revenue-${gradientId}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--qy-chart-1)" stopOpacity={0.19} /><stop offset="100%" stopColor="var(--qy-chart-1)" stopOpacity={0.015} /></linearGradient></defs><CartesianGrid vertical={false} stroke="var(--qy-border-subtle)" /><XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={12} /><YAxis axisLine={false} tickLine={false} width={72} tickMargin={9} tickFormatter={(value: number) => value.toLocaleString("zh-CN")} /><ChartTooltip content={<ChartTooltipContent valueFormatter={(value) => `¥${Number(value).toLocaleString("zh-CN")}`} />} /><Area dataKey="revenue" type="linear" stroke="var(--qy-chart-1)" strokeWidth={2} fill={`url(#revenue-${gradientId})`} dot={{ r: 3, fill: "var(--qy-chart-1)", stroke: "var(--qy-surface)", strokeWidth: 1.5 }} activeDot={{ r: 5 }} isAnimationActive={false} /></AreaChart></ChartContainer></Card>
          <Card className="example-panel progress-panel"><div className="example-panel-heading"><UIHeading level={embedded ? 3 : 2} size="heading">项目进度</UIHeading><Button size="sm" variant="ghost" className="example-text-link" onClick={() => { setSection("projects"); tableRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }}>查看全部<ArrowRight aria-hidden /></Button></div><div className="project-progress-list">{projects.filter((project) => project.status === "active").map((project) => <div key={project.id} className="project-progress"><div><Button className="project-progress-name" variant="link" onClick={() => openEdit(project)}>{project.name}</Button><p className="text-caption text-muted-foreground">{project.category} · 预计 {Number(project.due.slice(5, 7))} 月完成</p></div><span className="numeric">{project.progress}%</span><Progress aria-label={`${project.name}进度`} value={project.progress} /></div>)}</div></Card>
        </section>
      </>}
      {(section === "overview" || section === "projects") && <Card className="example-panel projects-panel" ref={tableRef}><div className="project-table-toolbar"><UIHeading level={embedded ? 3 : 2} size="heading">项目列表</UIHeading><SearchInput className="example-search" aria-label="搜索项目" placeholder="搜索项目名称、客户或标签…" value={query} onValueChange={setQuery} /><div className="project-table-filters"><ExampleSelect label="项目状态" value={status} onChange={setStatus} options={[{ value: "all", label: "全部状态" }, { value: "active", label: "进行中" }, { value: "complete", label: "已完成" }]} /><ExampleSelect label="客户筛选" value={client} onChange={setClient} options={[{ value: "all", label: "全部客户" }, ...initialProjects.map((project) => ({ value: project.client, label: project.client }))]} /><ExampleSelect label="项目排序" value={sort} onChange={setSort} options={[{ value: "newest", label: "最新创建" }, { value: "due", label: "截止时间" }, { value: "amount", label: "项目金额" }]} /></div></div><div className="project-table-scroll"><Table className="project-table" density="compact"><TableHeader><TableRow><TableHead>项目名称</TableHead><TableHead>客户</TableHead><TableHead>状态</TableHead><TableHead>开始时间</TableHead><TableHead>截止时间</TableHead><TableHead>项目金额</TableHead><TableHead><span className="sr-only">操作</span></TableHead></TableRow></TableHeader><TableBody>{filteredProjects.map((project) => <TableRow key={project.id}><TableCell><div className="project-name-cell"><ItemMedia variant="image"><img src={`/examples/${project.image}.jpg`} alt="" /></ItemMedia><div><strong>{project.name}</strong><small className="text-caption text-muted-foreground">{project.category}</small></div></div></TableCell><TableCell>{project.client}</TableCell><TableCell><Badge variant={project.status === "complete" ? "success" : "info"} size="sm">{project.status === "active" ? "进行中" : "已完成"}</Badge></TableCell><TableCell className="numeric">{project.start}</TableCell><TableCell className="numeric">{project.due}</TableCell><TableCell className="numeric">¥{project.amount.toLocaleString("zh-CN")}</TableCell><TableCell><Button variant="ghost" size="icon-sm" aria-label={`编辑${project.name}`} onClick={() => openEdit(project)}><MoreHorizontal aria-hidden /></Button></TableCell></TableRow>)}</TableBody></Table></div>{filteredProjects.length === 0 && <EmptyResult title="没有找到项目" description="试试其他关键词，或清除筛选条件。" action={<Button variant="outline" onClick={resetFilters}>清除筛选</Button>} />}</Card>}
      {section === "clients" && <div className="dashboard-clients">{projects.map((project) => <Card key={project.id} className="example-panel client-card"><AspectRatio ratio={16 / 9}><img className="object-cover" src={`/examples/${project.image}.jpg`} alt="" /></AspectRatio><UIHeading level={embedded ? 3 : 2} size="heading">{project.client}</UIHeading><p>{project.name}</p><div><Badge variant={project.status === "active" ? "info" : "success"}>{project.status === "active" ? "合作中" : "已交付"}</Badge><strong className="numeric">¥{project.amount.toLocaleString("zh-CN")}</strong></div><Button variant="outline" onClick={() => { setClient(project.client); setSection("projects"); }}>查看项目<ChevronRight aria-hidden /></Button></Card>)}</div>}
      {section === "files" && <Card className="files-panel"><UIHeading level={embedded ? 3 : 2} size="heading">交付文件</UIHeading><ItemGroup>{projects.map((project) => <Item key={project.id}><ItemMedia variant="icon"><FileText aria-hidden /></ItemMedia><ItemContent><ItemTitle>{project.name} · 项目摘要</ItemTitle><ItemDescription>CSV · 项目状态、日期和金额</ItemDescription></ItemContent><ItemActions><Button variant="outline" size="sm" onClick={() => exportProjects([project])}><ArrowDownToLine aria-hidden />下载</Button></ItemActions></Item>)}</ItemGroup></Card>}
    </div>
    <Dialog open={editing !== null} onOpenChange={(open) => { if (!open) setEditing(null); }}><DialogPopup className="sm:max-w-sm"><DialogHeader><DialogTitle>编辑项目</DialogTitle><DialogDescription>{editing?.client} · 修改当前演示中的项目资料。</DialogDescription></DialogHeader><form className="contents" onSubmit={(event) => { event.preventDefault(); if (!editing || !editName.trim()) return; if (!parseLocalDate(editDue) || editDue < editing.start) { toastManager.add({ title: "请选择不早于项目开始时间的截止日期", type: "error" }); return; } setProjects((items) => items.map((project) => project.id === editing.id ? { ...project, name: editName.trim(), due: editDue } : project)); setEditing(null); toastManager.add({ title: "项目已更新", type: "success" }); }}><DialogPanel className="grid gap-4"><Field><FieldLabel>项目名称</FieldLabel><Input required value={editName} onChange={(event) => setEditName(event.target.value)} /></Field><Field><FieldLabel htmlFor={editDueId}>截止日期</FieldLabel><DatePicker id={editDueId} required clearable={false} value={parseLocalDate(editDue) ?? null} onValueChange={(date) => setEditDue(date ? formatLocalDate(date) : "")} disabledDates={minimumDue ? { before: minimumDue } : []} /></Field></DialogPanel><DialogFooter><DialogClose render={<Button variant="ghost" />}>取消</DialogClose><Button type="submit" className="example-primary">保存修改</Button></DialogFooter></form></DialogPopup></Dialog>
    <Dialog open={inviteOpen} onOpenChange={setInviteOpen}><DialogPopup className="sm:max-w-sm"><DialogHeader><DialogTitle>邀请团队成员</DialogTitle><DialogDescription>输入邮箱，将成员添加到当前演示工作区。</DialogDescription></DialogHeader><form className="contents" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const email = String(form.get("email") ?? "").trim(); if (invitedEmails.includes(email)) { toastManager.add({ title: "该成员已添加", type: "info" }); return; } setInvitedEmails((emails) => [...emails, email]); setInviteOpen(false); toastManager.add({ title: "成员已添加到演示", description: email, type: "success" }); }}><DialogPanel className="grid gap-4"><Field><FieldLabel>邮箱地址</FieldLabel><Input name="email" type="email" placeholder="name@example.com" required /></Field>{invitedEmails.length > 0 && <p className="example-member-count"><Check size={14} aria-hidden />已添加 {invitedEmails.length} 位成员</p>}</DialogPanel><DialogFooter><DialogClose render={<Button variant="ghost" />}>取消</DialogClose><Button type="submit" className="example-primary">添加成员</Button></DialogFooter></form></DialogPopup></Dialog>
  </AppFrame>;
}
