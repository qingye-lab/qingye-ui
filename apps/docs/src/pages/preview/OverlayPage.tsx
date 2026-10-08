import * as React from "react";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye_lab/ui/components/accordion";
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye_lab/ui/components/alert-dialog";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { ConfirmAction, type ConfirmActionSnapshot } from "@qingye_lab/ui/components/confirm-action";
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye_lab/ui/components/hover-card";
import { Input } from "@qingye_lab/ui/components/input";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { LocaleSwitch } from "@qingye_lab/ui/components/locale-switch";
import { PendingValue } from "@qingye_lab/ui/components/pending-value";
import { Popover, PopoverClose, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Separator } from "@qingye_lab/ui/components/separator";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { toastManager } from "@qingye_lab/ui/components/toast";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { UILocaleProvider, zhCN } from "@qingye_lab/ui/locale";
import { enUS } from "@qingye_lab/ui/locales/en-US";
import { IconAlertCircle, IconCircleCheck, IconInfoCircle, IconPencil, IconAlertTriangle } from "@tabler/icons-react";
import { COLLECTIONS, GalleryPage, Row, Section } from "./gallery";

/* 浮层与反馈：对话框按「是否必须先回应」区分；轻量浮层不阻断工作面；
 * 反馈分就地说明、通知、结果未知与确认。危险动作都带可见后果。 */


export default function OverlayPage() {
  const [name, setName] = React.useState("接入设备");
  const [note, setNote] = React.useState("");
  const [cleared, setCleared] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [version, setVersion] = React.useState(3);
  const [confirmed, setConfirmed] = React.useState<ConfirmActionSnapshot>();
  const [locale, setLocale] = React.useState(zhCN);
  const [targets, setTargets] = React.useState(() => COLLECTIONS.slice(0, 4).map(row => ({ id: row.id, label: row.name, version: 1, marked: false })));
  const [selected, setSelected] = React.useState<string[]>(["devices", "roles"]);
  const [bulkResult, setBulkResult] = React.useState("尚未执行");
  const consequenceId = React.useId();

  return <GalleryPage>
    <Section title="对话框">
      <Row label="对话框">
        <Dialog>
          <DialogTrigger>重命名集合</DialogTrigger>
          <DialogPopup>
            <DialogHeader><DialogTitle>重命名集合</DialogTitle><DialogDescription>最多 20 个字，成员会在列表里看到新名字。</DialogDescription></DialogHeader>
            <DialogPanel><Field><FieldLabel>集合名称</FieldLabel><Input value={name} onChange={event => setName(event.target.value)} maxLength={20} /></Field></DialogPanel>
            <DialogFooter><DialogClose render={<Button variant="quiet" />}>取消</DialogClose><DialogClose render={<Button />}>保存</DialogClose></DialogFooter>
          </DialogPopup>
        </Dialog>
        <span className="text-support text-muted-foreground">当前名称：{name}</span>
      </Row>
      <Row label="确认框">
        <p id={consequenceId} className="m-0 text-support text-muted-foreground">清空后，同步说明无法恢复。</p>
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogTrigger render={<Button variant="bordered" tone="danger" aria-describedby={consequenceId} />}>清空说明</AlertDialogTrigger>
          <AlertDialogPopup>
            <AlertDialogHeader><AlertDialogTitle>清空同步说明？</AlertDialogTitle><AlertDialogDescription id={`${consequenceId}-popup`}>当前说明会被清空，成员不再看到它。</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose render={<Button variant="bordered" />}>返回</AlertDialogClose>
              <Button tone="danger" aria-describedby={`${consequenceId}-popup`} onClick={() => { setCleared(true); setAlertOpen(false); }}>清空说明</Button>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialog>
        {cleared && <span className="text-support text-muted-foreground">说明已清空</span>}
      </Row>
      <Row label="抽屉">
        {(["right", "left", "down"] as const).map(direction => <Drawer key={direction} swipeDirection={direction}>
          <DrawerTrigger>{direction === "right" ? "从右侧打开" : direction === "left" ? "从左侧打开" : "从底部打开"}</DrawerTrigger>
          <DrawerPopup>
            <DrawerTitle>集合详情</DrawerTitle>
            <DrawerContent>
              <Field><FieldLabel>集合名称</FieldLabel><Input defaultValue="接入设备" /></Field>
              <DrawerClose />
            </DrawerContent>
          </DrawerPopup>
        </Drawer>)}
      </Row>
    </Section>

    <Separator />

    <Section title="轻量浮层">
      <Row label="气泡">
        <Popover>
          <PopoverTrigger render={<Button variant="bordered" />}>编辑备注</PopoverTrigger>
          <PopoverPopup className="w-80">
            <Stack gap="fields">
              <Field><FieldLabel>备注</FieldLabel><Textarea value={note} onChange={event => setNote(event.target.value)} placeholder="写给成员的说明" /></Field>
              <Inline gap="actions" className="justify-end"><PopoverClose render={<Button />}>完成</PopoverClose></Inline>
            </Stack>
          </PopoverPopup>
        </Popover>
        <span className="text-support text-muted-foreground">{note ? `备注：${note}` : "尚无备注"}</span>
      </Row>
      <Row label="提示">
        <Tooltip>
          <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="重命名" />}><IconPencil aria-hidden="true" /></TooltipTrigger>
          <TooltipPopup>重命名集合</TooltipPopup>
        </Tooltip>
        <span className="text-support text-muted-foreground">悬停或聚焦图标按钮</span>
      </Row>
      <Row label="悬浮卡">
        <HoverCard>
          <HoverCardTrigger href="#owner">陈致远</HoverCardTrigger>
          <HoverCardPopup>
            <Stack gap="field"><span className="text-body-strong">陈致远</span><span className="text-support text-muted-foreground">管理员 · 负责 3 个集合</span></Stack>
          </HoverCardPopup>
        </HoverCard>
      </Row>
    </Section>

    <Separator />

    <Section title="反馈">
      <Row label="就地说明" block lead="panel">
        <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
          <Alert><IconInfoCircle aria-hidden="true" /><div className="grid gap-1"><AlertTitle>草稿已保留</AlertTitle><AlertDescription>离开这一页不会丢失本次填写的内容。</AlertDescription></div></Alert>
          <Alert tone="success"><IconCircleCheck aria-hidden="true" /><div className="grid gap-1"><AlertTitle>规则已启用</AlertTitle><AlertDescription>新的匹配条件对之后导入的记录生效。</AlertDescription></div></Alert>
          <Alert tone="warning"><IconAlertTriangle aria-hidden="true" /><div className="grid gap-1"><AlertTitle>同步时间较旧</AlertTitle><AlertDescription>最近一次同步在 3 天前，数字可能不是最新的。</AlertDescription></div></Alert>
          <Alert tone="danger"><IconAlertCircle aria-hidden="true" /><div className="grid gap-1"><AlertTitle>导出未完成</AlertTitle><AlertDescription>连接中断，原数据仍在，可以重新导出。</AlertDescription></div></Alert>
        </div>
      </Row>
      <Row label="通知">
        {([["info", "已加入导出队列"], ["success", "同步已完成"], ["in-progress", "正在同步接入设备"], ["unknown", "保存结果尚未确认"], ["failed", "导出失败"]] as const).map(([type, title]) => <Button key={type} variant="bordered" size="sm" onClick={() => toastManager.add({ type, title, timeout: 5000 })}>{title}</Button>)}
      </Row>
      <Row label="结果未知" block>
        <PendingValue label="保留天数" actions={<Button variant="bordered" size="sm">核实当前值</Button>}>90 天</PendingValue>
      </Row>
    </Section>

    <Separator />

    <Section title="确认与批量">
      <Row label="核对后执行">
        <ConfirmAction
          snapshot={{ objectId: "devices", objectLabel: "接入设备", version, change: "保留 90 天 → 30 天", consequence: "30 天前的记录会被立即删除，无法恢复。" }}
          title="核对保留策略的变更"
          triggerLabel="缩短保留天数"
          actionLabel="确认缩短"
          confirmationText="接入设备"
          confirmationLabel="输入集合名称以确认"
          onConfirm={setConfirmed}
        >
          <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
            <Button variant="quiet" size="sm" onClick={() => setVersion(value => value + 1)}>模拟他人修改（版本 +1）</Button>
            {confirmed && <span className="text-support text-muted-foreground" role="status">已请求：{confirmed.objectLabel} · 版本 {confirmed.version}</span>}
          </div>
        </ConfirmAction>
      </Row>
      <Row label="批量动作" block>
        <Stack gap="field" className="max-w-xl">
          {targets.map(item => <Inline key={item.id} gap="field">
            <Checkbox aria-label={`选择${item.label}`} checked={selected.includes(item.id)} onCheckedChange={checked => setSelected(value => checked ? [...value, item.id] : value.filter(id => id !== item.id))} />
            <span className="text-body">{item.label}</span>
            <span className="text-support text-muted-foreground">{item.marked ? "已标记为待核实" : ""}</span>
          </Inline>)}
          <BulkActionBar targets={targets.filter(item => selected.includes(item.id))} scope="所选集合" onClear={() => setSelected([])}>
            <BulkActionBarActions>
              <BulkActionBarAction onExecute={snapshot => { const ids = new Set(snapshot.targets.map(item => item.id)); setTargets(value => value.map(item => ids.has(item.id) ? { ...item, marked: true, version: item.version + 1 } : item)); setBulkResult(`已标记 ${snapshot.targets.length} 个集合`); }}>标记为待核实</BulkActionBarAction>
              <BulkActionBarClear />
            </BulkActionBarActions>
          </BulkActionBar>
          <span className="text-support text-muted-foreground" role="status">{bulkResult}</span>
        </Stack>
      </Row>
    </Section>

    <Separator />

    <Section title="展开与工具">
      <Row label="分组折叠" block lead="row">
        <Accordion multiple defaultValue={["sync"]} className="max-w-xl">
          <AccordionItem value="sync"><AccordionHeader render={<h4 />}><AccordionTrigger>同步</AccordionTrigger></AccordionHeader><AccordionPanel><Field><FieldLabel>同步说明</FieldLabel><Input placeholder="写给成员的说明" /></Field></AccordionPanel></AccordionItem>
          <AccordionItem value="retention"><AccordionHeader render={<h4 />}><AccordionTrigger>保留策略</AccordionTrigger></AccordionHeader><AccordionPanel><p className="m-0 text-body">滚动保留最近 90 天，更早的记录按周归档。</p></AccordionPanel></AccordionItem>
          <AccordionItem value="danger" disabled><AccordionHeader render={<h4 />}><AccordionTrigger>危险操作（需要管理员）</AccordionTrigger></AccordionHeader><AccordionPanel>删除集合</AccordionPanel></AccordionItem>
        </Accordion>
      </Row>
      <Row label="单项折叠">
        <Collapsible>
          <CollapsibleTrigger>高级选项</CollapsibleTrigger>
          <CollapsiblePanel><Field className="mt-(--qy-field-gap)"><FieldLabel>重试次数</FieldLabel><Input type="number" defaultValue="3" /></Field></CollapsiblePanel>
        </Collapsible>
      </Row>
      <Row label="复制">
        <code className="text-body numeric">qingye.dev/ingest</code><CopyButton value="qingye.dev/ingest" /><CopyButton value="qingye.dev/ingest" shape="icon" />
      </Row>
      <Row label="快捷键">
        <span className="inline-flex items-center gap-(--qy-field-gap) text-support text-muted-foreground">搜索 <Kbd aria-label="Command">⌘</Kbd><Kbd>K</Kbd></span>
        <span className="inline-flex items-center gap-(--qy-field-gap) text-support text-muted-foreground">保存 <Kbd aria-label="Command">⌘</Kbd><Kbd>S</Kbd></span>
      </Row>
      <Row label="界面语言">
        <UILocaleProvider locale={locale}>
          <Inline gap="actions"><LocaleSwitch className="w-auto" options={[{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }]} onLocaleChange={setLocale} /><CopyButton value="Qingye" /></Inline>
        </UILocaleProvider>
        <span className="text-support text-muted-foreground">内置文字随语言切换</span>
      </Row>
    </Section>
  </GalleryPage>;
}
