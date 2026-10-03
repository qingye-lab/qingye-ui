import type { ComponentMeta } from "@/lib/types";
export default {
  title: "时间序列 Timeline", titleEn: "Timeline", description: "保留输入顺序与真实时间。", descriptionEn: "Preserve input order and actual times.",
  category: "数据展示", layer: "pattern", source: "local", exports: ["Timeline", "TimelineItem", "TimelineTime", "TimelineTitle", "TimelineDescription"],
  decisions: "ol/li 表达传入序列，time 保存可解析时间；不排序、不补事件、不伪造时间。", decisionsEn: "ol/li express the input sequence; time preserves machine time. No sorting or invented events and times.",
  design: { methods: ["名实相符", "布白有用"], whenToUse: ["呈现输入的时间事件序列。"], avoid: ["可执行的有序过程用 Steps；二维比较用 Table。"], stateOwner: { library: ["序列、time 与内容关系。"], application: ["事件、输入顺序、时间格式与未知事实。"] }, responsive: ["内容完整换行，未知时间保持文字表达。"] }, designEn: {"whenToUse":["Present an input sequence of time events."],"avoid":["Use Steps for actionable ordered processes and Table for two-dimensional comparison."],"stateOwner":{"library":["Sequence, time elements, and content relationships."],"application":["Events, input order, time formatting, and unknown facts."]},"responsive":["Content wraps fully and unknown times remain explicit text."]},
  api: [
    { name: "Timeline / TimelineItem", description: "ol / li 按 children 顺序呈现。", descriptionEn: "ol / li render in children order.", props: [{ name: "children / aria-label / render / ref / native props", type: "useRender.ComponentProps<ol | li>", description: "名称和事件由应用提供，未知时间可用文字。", descriptionEn: "The caller supplies names and events; unknown times may use text." }] },
    { name: "TimelineTime", description: "原生 time。", descriptionEn: "A native time element.", props: [{ name: "dateTime / children / render / ref", type: "useRender.ComponentProps<time>", description: "机器时间与显示文本独立，应用负责真实性。", descriptionEn: "Machine time and display text are independent application facts." }] },
    { name: "TimelineTitle / TimelineDescription", description: "div / p 内容槽。", descriptionEn: "div / p content slots.", props: [{ name: "children / render / ref / native props", type: "useRender.ComponentProps<div | p>", description: "不推断成功、失败或业务对象。", descriptionEn: "Infers no result or business object." }] },
  ], notes: ["正序、逆序和相同时间输入都原样保留；空序列不补占位事件。"], notesEn: ["Ascending, descending and tied times keep input order; an empty sequence generates no entries."],
} satisfies ComponentMeta;
