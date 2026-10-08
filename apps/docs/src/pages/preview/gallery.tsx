import type * as React from "react";
import { Heading } from "@qingye_lab/ui/components/typography";

/* 组件页共用的版式：「名称列 + 内容列」。
 * 名称说明这是什么，内容列里的控件按真实尺寸排；同一节共用一条左边线，方便横向比对——
 * 比「一格一张卡」更接近组件在真实界面里的样子。这里只有版式，不新造任何控件。 */

export function GalleryPage({ children }: { children: React.ReactNode }) {
  return <main id="main" tabIndex={-1} className="mx-auto grid w-full max-w-[72rem] gap-(--qy-section-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">{children}</main>;
}

export function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return <section className="grid gap-(--qy-field-group-gap)">
    <div>
      <Heading level={2} step="heading">{title}</Heading>
      {note && <p className="m-0 mt-(--qy-field-gap) text-support text-muted-foreground">{note}</p>}
    </div>
    {children}
  </section>;
}

/*
 * 名称与内容的对齐（基础层 §19）：名称说的是内容的第一行，二者落在同一条行中线上。
 * - 行内内容：名称与整行等高、居中，行里元素高低不一时也对齐整行的中线。
 * - 整块内容：第一行是什么就取多高的行盒——一行字（一材）、一行标题（6 分）、小节标题（7 分）、
 *   一个控件（填值外高）、一个列表行（行高）、带小内缘的面板（内缘 + 一材 + 内缘）、一条读数轨道。
 *   每一种都是材与分的关系，偏移全是整数。
 */
const LEAD = {
  text: "min-h-(--qy-cai)",
  heading: "min-h-[calc(6*var(--qy-fen))]",
  chapter: "min-h-[calc(7*var(--qy-fen))]",
  control: "min-h-(--qy-fill-height)",
  row: "min-h-(--qy-row-default)",
  panel: "min-h-[calc(2*var(--qy-panel-padding-sm)+var(--qy-cai))]",
  // 带一道线与小内缘的框，第一行是一个控件（如侧栏的收起）。
  "framed-control": "min-h-[calc(2*(1px+var(--qy-panel-padding-sm))+var(--qy-fill-height))]",
  // 带一道线与浮层内缩（1 分）的框，第一行是一个控件（如侧栏右上的收起）。
  "inset-control": "min-h-[calc(2*(1px+var(--qy-overlay-inset))+var(--qy-fill-height))]",
  "framed-heading": "min-h-[calc(2*(1px+var(--qy-panel-padding-sm))+6*var(--qy-fen))]",
  // 图的纸：一道线、面板内缘，第一行是标题栏（图名与「查看数据」同一行，高一个小号控件）。
  "framed-panel-heading": "min-h-[calc(2*(1px+var(--qy-panel-padding))+var(--qy-control-sm))]",
  // 表格的纸：一道线、小面板内缘，第一行是表名（一材）。
  "framed-caption": "min-h-[calc(2*(1px+var(--qy-panel-padding-sm))+var(--qy-cai))]",
  // 长文的纸：一道线、面板内缘，第一行是节标题（text-prose-h2 的行高）。
  "framed-prose": "min-h-[calc(2*(1px+var(--qy-panel-padding))+var(--qy-text-prose-h2-leading))]",
  "control-sm": "min-h-(--qy-control-sm)",
  "padded-text": "min-h-[calc(2*var(--qy-field-gap)+var(--qy-cai))]",
  "framed-row": "min-h-[calc(2px+var(--qy-row-default))]",
  track: "h-(--qy-readout-track-size)",
} as const;
export function Row({ label, note, children, block = false, lead }: { label: string; note?: string; children: React.ReactNode; block?: boolean; lead?: keyof typeof LEAD }) {
  // 对齐（基础层 §19）：按行居中，不按拉丁基线。名称放在一个控件高的行盒里居中，
  // 行内内容也在同高的行盒里居中，偏移都是整数。整块内容从顶部开始，它的第一行通常是
  // 一行文字（字段名、标题），所以名称的行盒取一材。
  return <div className="grid items-start gap-x-(--qy-panel-gap) gap-y-(--qy-field-gap) sm:grid-cols-[6rem_minmax(0,1fr)]">
    <div className={block ? "min-w-0" : "flex min-w-0 flex-col self-stretch"}>
      <p className={`m-0 flex items-center text-caption text-muted-foreground ${block ? LEAD[lead ?? "text"] : note ? LEAD.control : "flex-1"}`}>{label}</p>
      {note && <p className="m-0 text-caption text-muted-foreground">{note}</p>}
    </div>
    {/* block：内容本身是一块（表格、列表、图表），占满内容列，不按行内元素排。 */}
    <div className={block ? "min-w-0" : "flex min-h-(--qy-fill-height) min-w-0 flex-wrap items-center gap-x-(--qy-field-group-gap) gap-y-(--qy-field-group-gap)"}>{children}</div>
  </div>;
}

/* 字段宽度由版式决定：一行的列数定好，字段填满自己的列。
 * 不逐个写死宽度——写死会让同一页出现五六种宽度，横向比对时对不齐。 */
export const fieldGrid = "grid w-full gap-x-(--qy-field-group-gap) gap-y-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3";

/** 同一领域的示例数据：所有页面讲的是同一个工作区，不编新的业务流程。 */
export type Collection = { id: string; name: string; owner: string; records: number; synced: string; state: "已同步" | "同步中" | "未同步" };
export const COLLECTIONS: readonly Collection[] = [
  { id: "devices", name: "接入设备", owner: "陈致远", records: 1284, synced: "3 分钟前", state: "已同步" },
  { id: "roles", name: "权限与角色", owner: "李一鸣", records: 42, synced: "3 分钟前", state: "已同步" },
  { id: "sync", name: "同步与导出", owner: "陈致远", records: 0, synced: "2 天前", state: "未同步" },
  { id: "audit", name: "操作记录", owner: "王一帆", records: 90512, synced: "12 分钟前", state: "已同步" },
  { id: "webhooks", name: "回调地址", owner: "李一鸣", records: 6, synced: "12 分钟前", state: "已同步" },
  { id: "groups", name: "成员分组", owner: "王一帆", records: 17, synced: "1 小时前", state: "同步中" },
  { id: "tokens", name: "访问令牌", owner: "陈致远", records: 3, synced: "1 小时前", state: "已同步" },
  { id: "templates", name: "通知模板", owner: "赵子纯", records: 11, synced: "昨天", state: "已同步" },
  { id: "quotas", name: "配额限制", owner: "赵子纯", records: 5, synced: "昨天", state: "未同步" },
  { id: "backups", name: "备份策略", owner: "李一鸣", records: 2, synced: "3 天前", state: "同步中" },
  { id: "regions", name: "区域与节点", owner: "王一帆", records: 28, synced: "3 天前", state: "已同步" },
  { id: "keys", name: "加密密钥", owner: "赵子纯", records: 4, synced: "5 天前", state: "已同步" },
];
