import { useSyncExternalStore, type ReactNode } from "react";
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye/ui/components/accordion";
import { Alert, AlertTitle } from "@qingye/ui/components/alert";
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Badge } from "@qingye/ui/components/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
import { Button } from "@qingye/ui/components/button";
import { ButtonGroup } from "@qingye/ui/components/button-group";
import { Calendar } from "@qingye/ui/components/calendar";
import { Card } from "@qingye/ui/components/card";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { CheckboxGroup } from "@qingye/ui/components/checkbox-group";
import { CodeBlock } from "@qingye/ui/components/code-block";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
import { CopyButton } from "@qingye/ui/components/copy-button";
import { DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm } from "@qingye/ui/components/description-list";
import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@qingye/ui/components/disclosure";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Frame, FrameHeader, FramePanel, FrameTitle } from "@qingye/ui/components/frame";
import { Group, GroupText } from "@qingye/ui/components/group";
import { Input } from "@qingye/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@qingye/ui/components/item";
import { Kbd } from "@qingye/ui/components/kbd";
import { Label } from "@qingye/ui/components/label";
import { Inline, Stack, Text } from "@qingye/ui/components/layout";
import { Meter } from "@qingye/ui/components/meter";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";
import { OTPField, OTPFieldInput } from "@qingye/ui/components/otp-field";

import { Progress } from "@qingye/ui/components/progress";
import { ProgressCircle } from "@qingye/ui/components/progress-circle";
import { Radio, RadioGroup, RadioGroupPrimitive, RadioPrimitive } from "@qingye/ui/components/radio-group";

import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";
import { Separator } from "@qingye/ui/components/separator";
import { Skeleton } from "@qingye/ui/components/skeleton";
import { Slider } from "@qingye/ui/components/slider";
import { Spinner } from "@qingye/ui/components/spinner";
import { Stat, StatDelta, StatLabel, StatSparkline, StatValue } from "@qingye/ui/components/stat";
import { StatusDot } from "@qingye/ui/components/status-dot";
import { Steps } from "@qingye/ui/components/steps";
import { Switch } from "@qingye/ui/components/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";
import { TagInput } from "@qingye/ui/components/tag-input";
import { Textarea } from "@qingye/ui/components/textarea";
import { Timeline } from "@qingye/ui/components/timeline";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { ToastPrimitive } from "@qingye/ui/components/toast";
import { Toggle } from "@qingye/ui/components/toggle";
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@qingye/ui/components/toolbar";
import { Tree } from "@qingye/ui/components/tree";
import { Heading, TextLink } from "@qingye/ui/components/typography";
import { AlignCenter, AlignLeft, AlignRight, ArrowRight, Bell, Bold, Check, FileText, Folder, Inbox, Italic, Mail, Moon, Plus, Sun, Underline } from "lucide-react";

const column = "flex w-full max-w-56 flex-col gap-(--qy-space-3)";
const row = "flex flex-wrap items-center justify-center gap-(--qy-space-2)";

function ThemeThumbnail() {
  const { resolvedTheme } = useTheme();
  return <div className={row}><Button aria-pressed={resolvedTheme === "light"} size="sm" variant={resolvedTheme === "light" ? "solid" : "quiet"}><Sun aria-hidden="true" />浅色</Button><Button aria-pressed={resolvedTheme === "dark"} size="sm" variant={resolvedTheme === "dark" ? "solid" : "quiet"}><Moon aria-hidden="true" />深色</Button></div>;
}

function subscribeInputModality(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ui-input"] });
  return () => observer.disconnect();
}

function MotionThumbnail() {
  // The site's one MotionProvider owns this attribute; previews only observe it.
  const input = useSyncExternalStore(subscribeInputModality, () => document.documentElement.getAttribute("data-ui-input") ?? "—", () => "—");
  return <div className={row}><Kbd>Tab</Kbd><Badge variant="outline">{input}</Badge><Button shape="icon" aria-label="添加" size="sm" variant="quiet"><Plus aria-hidden="true" /></Button></div>;
}

function ToastThumbnail() {
  // Consume the root provider without adding notifications during rendering.
  const { add } = ToastPrimitive.useToastManager();
  return <Button onClick={() => add({ title: "资料已保存", type: "success" })} size="sm" variant="quiet"><Bell aria-hidden="true" />显示通知</Button>;
}

// These are small compositions of the current library, not another set of controls.
// The containing directory card owns inert / aria-hidden and its navigation link.
const previews: Record<string, () => ReactNode> = {
  accordion: () => (
    <Accordion className="w-full max-w-56" defaultValue={["files"]}>
      <AccordionItem value="files"><AccordionTrigger>最近文件</AccordionTrigger><AccordionPanel>品牌规范.pdf</AccordionPanel></AccordionItem>
      <AccordionItem value="members"><AccordionTrigger>团队成员</AccordionTrigger><AccordionPanel>林晚、周屿</AccordionPanel></AccordionItem>
    </Accordion>
  ),
  alert: () => (
    <div className={column}>
      <Alert><Check aria-hidden="true" /><AlertTitle>修改已保存</AlertTitle></Alert>
      <Alert variant="destructive"><AlertTitle>连接已断开</AlertTitle></Alert>
    </div>
  ),
  avatar: () => (
    <div className={row}><Avatar size="lg"><AvatarFallback>林</AvatarFallback></Avatar><Avatar><AvatarFallback>周</AvatarFallback></Avatar><Avatar size="sm"><AvatarFallback>陈</AvatarFallback></Avatar></div>
  ),
  badge: () => (
    <div className="flex max-w-52 flex-wrap justify-center gap-(--qy-space-2)"><Badge>默认</Badge><Badge variant="outline">设计</Badge><Badge variant="success">已发布</Badge><Badge variant="warning">审核中</Badge><Badge variant="destructive">已过期</Badge></div>
  ),
  breadcrumb: () => (
    <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#">首页</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="#">项目</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>资料</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
  ),
  button: () => (
    <div className="flex max-w-52 flex-wrap justify-center gap-(--qy-space-2)"><Button size="sm">保存</Button><Button size="sm" variant="quiet">取消</Button><Button shape="icon" aria-label="添加" size="sm" variant="quiet"><Plus aria-hidden="true" /></Button><Button size="sm" variant="quiet">查看记录</Button></div>
  ),
  "button-group": () => (
    <ButtonGroup><Button size="sm" variant="quiet">日</Button><Button size="sm" variant="quiet">周</Button><Button size="sm" variant="quiet">月</Button></ButtonGroup>
  ),
  calendar: () => (
    <Calendar className="shrink-0 scale-[0.62]" defaultMonth={new Date(2026, 9, 1)} mode="single" selected={new Date(2026, 9, 12)} />
  ),
  card: () => (
    <Card className="w-full max-w-56" ><header className="grid gap-(--qy-panel-gap)"><h3 className="text-heading">青野设计</h3></header><div className="p-(--qy-panel-padding) flex items-center justify-between"><Avatar size="sm"><AvatarFallback>青</AvatarFallback></Avatar><Badge variant="success">已发布</Badge></div></Card>
  ),
  checkbox: () => (
    <div className={column}><Label><Checkbox defaultChecked />邮件通知</Label><Label><Checkbox />桌面通知</Label></div>
  ),
  "checkbox-group": () => (
    <CheckboxGroup className="flex flex-col gap-(--qy-space-3)" defaultValue={["design", "code"]}><Label><Checkbox value="design" />设计</Label><Label><Checkbox value="code" />开发</Label><Label><Checkbox value="research" />研究</Label></CheckboxGroup>
  ),
  "code-block": () => (
    <CodeBlock className="w-full max-w-60" code={'import { Button } from "@qingye/ui";\n\n<Button>保存</Button>'} copyable={false} filename="app.tsx" lineNumbers />
  ),
  collapsible: () => (
    <Collapsible className={column} defaultOpen><CollapsibleTrigger render={<Button size="sm" variant="quiet" />}>最近项目</CollapsibleTrigger><CollapsiblePanel><Item size="sm" variant="outline"><ItemContent><ItemTitle>青野设计</ItemTitle></ItemContent></Item></CollapsiblePanel></Collapsible>
  ),
  "copy-button": () => <CopyButton size="sm" value="pnpm add @qingye/ui">复制命令</CopyButton>,
  "description-list": () => (
    <DescriptionList className="w-full max-w-56"><DescriptionListItem><DescriptionTerm>名称</DescriptionTerm><DescriptionDetails>设计规范</DescriptionDetails></DescriptionListItem><DescriptionListItem><DescriptionTerm>状态</DescriptionTerm><DescriptionDetails><Badge variant="success">已发布</Badge></DescriptionDetails></DescriptionListItem><DescriptionListItem><DescriptionTerm>版本</DescriptionTerm><DescriptionDetails>3.0</DescriptionDetails></DescriptionListItem></DescriptionList>
  ),
  disclosure: () => (
    <Disclosure className="w-full max-w-56" defaultOpen variant="inset"><DisclosureTrigger>高级设置</DisclosureTrigger><DisclosurePanel><Label><Switch defaultChecked />邮件通知</Label></DisclosurePanel></Disclosure>
  ),
  empty: () => (
    <Empty className="gap-(--qy-space-3) p-(--qy-space-4)"><EmptyHeader><EmptyMedia variant="icon"><Inbox aria-hidden="true" /></EmptyMedia><EmptyTitle size="sm">暂无文件</EmptyTitle></EmptyHeader><Button size="sm" variant="quiet"><Plus aria-hidden="true" />添加文件</Button></Empty>
  ),
  field: () => <Field className="w-full max-w-56"><FieldLabel>显示名称</FieldLabel><Input defaultValue="林晚" readOnly /></Field>,
  fieldset: () => <Fieldset className="w-full max-w-56"><FieldsetLegend>联系信息</FieldsetLegend><Field><FieldLabel>邮箱</FieldLabel><Input defaultValue="lin@qingye.io" readOnly /></Field></Fieldset>,
  frame: () => (
    <Frame className="w-full max-w-56"><FrameHeader className="py-(--qy-space-2)"><FrameTitle>自定义域名</FrameTitle></FrameHeader><FramePanel className="flex items-center justify-between gap-(--qy-space-2) p-(--qy-space-3)"><span className="text-caption">qingye.io</span><Badge variant="success">已生效</Badge></FramePanel></Frame>
  ),
  group: () => <Group><GroupText>https://</GroupText><Input className="w-36" defaultValue="qingye.io" readOnly /></Group>,
  input: () => <div className={column}><Input aria-label="姓名" defaultValue="林晚" readOnly /><Input aria-label="邮箱" placeholder="name@qingye.io" readOnly /></div>,
  "input-group": () => <InputGroup className="w-full max-w-56"><InputGroupInput aria-label="邮箱" defaultValue="lin@qingye.io" readOnly /><InputGroupAddon><Mail aria-hidden="true" /></InputGroupAddon></InputGroup>,
  item: () => (
    <Item className="w-full max-w-56" size="sm" variant="outline"><ItemMedia variant="icon"><FileText aria-hidden="true" /></ItemMedia><ItemContent><ItemTitle>品牌规范.pdf</ItemTitle></ItemContent><Badge variant="secondary">PDF</Badge></Item>
  ),
  kbd: () => <div className={row}><Kbd>⌘</Kbd><Kbd>K</Kbd><span className="text-caption text-muted-foreground">/</span><Kbd>Ctrl</Kbd><Kbd>K</Kbd></div>,
  label: () => <Label className="flex-col items-start"><span>显示名称</span><Input className="w-56" defaultValue="林晚" readOnly /></Label>,
  layout: () => <Stack className="w-full max-w-56" gap={3}><Inline align="center" justify="between"><Text size="label">团队成员</Text><Badge variant="secondary">3</Badge></Inline><Inline gap={2}><Avatar size="sm"><AvatarFallback>林</AvatarFallback></Avatar><Avatar size="sm"><AvatarFallback>周</AvatarFallback></Avatar><Avatar size="sm"><AvatarFallback>陈</AvatarFallback></Avatar></Inline></Stack>,
  meter: () => <div className={column}><div className="flex items-center justify-between text-caption"><span>存储用量</span><span className="numeric">64%</span></div><Meter aria-label="存储用量" value={64} /></div>,
  "native-select": () => <NativeSelect aria-label="项目" className="w-full max-w-56" defaultValue="design"><NativeSelectOption value="design">青野设计</NativeSelectOption><NativeSelectOption value="research">用户研究</NativeSelectOption></NativeSelect>,
  "number-field": () => <NumberField aria-label="数量" className="w-40" defaultValue={12} min={0}><NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup></NumberField>,
  "otp-field": () => <OTPField aria-label="验证码" defaultValue="4802" length={4}>{Array.from({ length: 4 }, (_, index) => <OTPFieldInput key={index} />)}</OTPField>,
  progress: () => <div className={column}><div className="flex items-center justify-between text-caption"><span>正在上传</span><span className="numeric">68%</span></div><Progress aria-label="上传进度" value={68} /></div>,
  "progress-circle": () => <div className={row}><ProgressCircle aria-label="上传进度" showValue size="lg" value={68} /><ProgressCircle aria-label="下载进度" size="sm" value={32} /></div>,
  "radio-group": () => <RadioGroup aria-label="计费周期" defaultValue="monthly"><Label><Radio value="monthly" />按月付费</Label><Label><Radio value="yearly" />按年付费</Label></RadioGroup>,
  "segmented-control": () => <RadioGroupPrimitive aria-label="计费周期" className={segmentedControlRootClassName} defaultValue="monthly"><RadioPrimitive.Root className={segmentedControlItemVariants({ state: "checked" })} value="monthly">按月</RadioPrimitive.Root><RadioPrimitive.Root className={segmentedControlItemVariants({ state: "checked" })} value="yearly">按年</RadioPrimitive.Root></RadioGroupPrimitive>,
  separator: () => <div className={column}><span className="text-caption">个人资料</span><Separator /><span className="text-caption text-muted-foreground">安全设置</span></div>,
  skeleton: () => <div className={column}><div className="flex items-center gap-(--qy-space-3)"><Skeleton className="size-10 rounded-full" /><div className="flex flex-1 flex-col gap-(--qy-space-2)"><Skeleton className="h-3 w-24" /><Skeleton className="h-3 w-36" /></div></div><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-3/4" /></div>,
  slider: () => <div className={column}><Slider aria-label="音量" defaultValue={64} /><Slider aria-label="价格范围" defaultValue={[25, 72]} /></div>,
  spinner: () => <div className="flex items-center gap-(--qy-space-5)"><Spinner className="size-4" /><Spinner className="size-8" /></div>,
  stat: () => <Stat className="w-44" size="sm"><StatLabel>本月访问</StatLabel><div className="flex items-center justify-between"><StatValue>12,840</StatValue><StatDelta trend="up">18.6%</StatDelta></div><StatSparkline data={[12, 18, 16, 28, 24, 32, 38]} /></Stat>,
  "status-dot": () => <div className={column}><span className="flex items-center gap-(--qy-space-2) text-caption"><StatusDot status="online" />在线</span><span className="flex items-center gap-(--qy-space-2) text-caption"><StatusDot status="warning" />等待中</span><span className="flex items-center gap-(--qy-space-2) text-caption"><StatusDot status="error" />已断开</span></div>,
  steps: () => <Steps className="max-w-60" current={1} items={[{ id: "info", title: "信息" }, { id: "confirm", title: "确认" }, { id: "done", title: "完成" }]} size="sm" />,
  switch: () => <div className={column}><Label><Switch defaultChecked />邮件通知</Label><Label><Switch />桌面通知</Label></div>,
  table: () => <Table className="w-56" density="compact"><TableHeader><TableRow><TableHead>名称</TableHead><TableHead className="text-end">状态</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>设计规范</TableCell><TableCell className="text-end"><Badge variant="success">已发布</Badge></TableCell></TableRow><TableRow><TableCell>访谈纪要</TableCell><TableCell className="text-end"><Badge variant="outline">草稿</Badge></TableCell></TableRow></TableBody></Table>,
  tabs: () => <Tabs className="w-full max-w-56" defaultValue="files"><TabsList><TabsTab value="files">文件</TabsTab><TabsTab value="members">成员</TabsTab><TabsTab value="settings">设置</TabsTab></TabsList><TabsPanel value="files"><Item size="sm"><ItemMedia><FileText aria-hidden="true" /></ItemMedia><ItemContent><ItemTitle>设计规范</ItemTitle></ItemContent></Item></TabsPanel></Tabs>,
  "tag-input": () => <TagInput aria-label="标签" className="w-full max-w-56" defaultValue={["设计", "研究"]} placeholder="添加标签" />,
  textarea: () => <Textarea aria-label="备注" className="w-full max-w-56" defaultValue="河岸的草木开始转黄。" readOnly rows={3} />,
  timeline: () => <Timeline className="w-full max-w-56" items={[{ id: "review", title: "审核完成", time: "14:32", status: "success" }, { id: "submit", title: "提交资料", time: "09:05" }]} label="资料时间线" />,
  toggle: () => <div className={row}><Toggle aria-label="加粗" defaultPressed><Bold aria-hidden="true" /></Toggle><Toggle aria-label="斜体"><Italic aria-hidden="true" /></Toggle><Toggle aria-label="下划线"><Underline aria-hidden="true" /></Toggle></div>,
  "toggle-group": () => <ToggleGroup aria-label="对齐方式" defaultValue={["left"]} variant="outline"><ToggleGroupItem aria-label="左对齐" value="left"><AlignLeft aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem aria-label="居中" value="center"><AlignCenter aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem aria-label="右对齐" value="right"><AlignRight aria-hidden="true" /></ToggleGroupItem></ToggleGroup>,
  toolbar: () => <Toolbar aria-label="正文格式"><ToolbarGroup><ToolbarButton aria-label="加粗" render={<Toggle defaultPressed />}><Bold aria-hidden="true" /></ToolbarButton><ToolbarButton aria-label="斜体" render={<Toggle />}><Italic aria-hidden="true" /></ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarButton aria-label="左对齐" render={<Toggle />}><AlignLeft aria-hidden="true" /></ToolbarButton></Toolbar>,
  tree: () => <Tree className="w-full max-w-56" defaultExpanded={["project"]} defaultValue="guide" label="项目文件" nodes={[{ id: "project", label: "青野设计", icon: <Folder aria-hidden="true" />, children: [{ id: "guide", label: "设计规范", icon: <FileText aria-hidden="true" /> }, { id: "notes", label: "访谈纪要", icon: <FileText aria-hidden="true" /> }] }]} />,
  typography: () => <div className={column}><Heading level={3} size="title">青野设计</Heading><TextLink href="#">查看项目<ArrowRight aria-hidden="true" /></TextLink><Text size="caption" tone="muted">2026 年 10 月</Text></div>,
  "theme-provider": () => <ThemeThumbnail />,
  "motion-provider": () => <MotionThumbnail />,
  toast: () => <ToastThumbnail />,
};

export const componentThumbnailSlugs = Object.freeze(Object.keys(previews));

export function hasComponentThumbnail(slug: string): boolean {
  return Object.hasOwn(previews, slug);
}

export function ComponentThumbnail({ slug }: { slug: string }) {
  const Preview = previews[slug];
  if (!Preview) return null;
  return <div className="flex size-full items-center justify-center" data-component-thumbnail={slug}>{Preview()}</div>;
}
