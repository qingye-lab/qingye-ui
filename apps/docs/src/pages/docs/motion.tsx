import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";
import { useMediaQuery } from "@qingye_lab/ui/hooks/use-media-query";
import { useState } from "react";
import { A, Code, H2, P, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
export default function MotionPage() {
  const en = useDocsLocale() === "en";
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [open,setOpen] = useState(true);
  return <article><PageHeader title={en ? "Motion" : "动效"} description={en ? "One stylesheet, motion.css, owns transitions; components only expose state." : "过渡由 motion.css 一处管理，组件只提供状态。"} />
    <H2 id="policy">{en ? "One owner" : "一处管理"}</H2><P><Code>motion.css</Code>{en ? " defines press feedback (scaling to 0.97) and popup entry and exit (from 0.98 with a fade). Durations and easing come from the " : " 定义按压反馈（缩到 0.97）与浮层进出（自 0.98 缩放并淡入），时长与缓动取自"}<A href="/docs/tokens#dong">{en ? "motion tokens" : "动效令牌"}</A>{en ? ". Components supply data-slot and state attributes and declare no second set of entry values." : "。组件提供 data-slot 与状态属性，不另设第二套进出值。"}</P>
    <H2 id="continuity">{en ? "A transition keeps the work" : "过渡不丢工作"}</H2><P>{en ? "Collapsible keeps its panel mounted while closed, so a draft inside survives. Closing changes visibility only; it neither submits nor cancels." : "Collapsible 收起时面板仍然挂载，里面的草稿保留。收起只改变可见性，既不提交也不取消。"}</P><Stack gap="fields" className="mb-(--qy-space-module)"><Collapsible open={open} onOpenChange={setOpen}><CollapsibleTrigger>{open ? (en ? "Hide draft" : "收起草稿") : (en ? "Show draft" : "展开草稿")}</CollapsibleTrigger><CollapsiblePanel><Field><FieldLabel>{en ? "Draft" : "草稿"}</FieldLabel><Input defaultValue="A" /></Field></CollapsiblePanel></Collapsible></Stack>
    <H2 id="keyboard">{en ? "Keyboard input" : "键盘输入"}</H2><P><Code>MotionProvider</Code>{en ? " records on html whether the last input came from a keyboard or a pointer. During keyboard use, state transitions and press scaling finish at once, so repeated arrow keys never wait on an animation." : " 在 html 上记录最近一次输入来自键盘还是指针。键盘操作时，状态过渡与按压缩放立即完成，连续按方向键不必等动画。"}</P>
    <H2 id="reduced-motion">{en ? "Reduced motion" : "减少动态效果"}</H2><P>{en ? "With the system setting on, movement and size changes are removed; colour and opacity changes stay, so every state remains visible." : "系统开启「减少动态效果」时，位移与尺寸变化被移除，颜色与透明度变化保留，每个状态仍然看得见。"}</P><P>{en ? "This device: " : "本机设置："}{reduced ? (en ? "reduce" : "减少") : (en ? "no preference" : "无偏好")}</P>
  </article>;
}
