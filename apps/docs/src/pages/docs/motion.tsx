import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { Stack } from "@qingye/ui/components/layout";
import { useMediaQuery } from "@qingye/ui/hooks/use-media-query";
import { useState } from "react";
import { A, Code, H2, P, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
export default function MotionPage() {
  const en = useDocsLocale() === "en";
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [open,setOpen] = useState(true);
  return <article><PageHeader title={en ? "Motion" : "动效"} description={en ? "Motion explains a state change. State and recovery must remain understandable without it." : "动效交代真实变化；没有动画，状态与恢复入口仍须清楚。"} />
    <H2 id="continuity">{en ? "Keep work through a transition" : "变化保留已有工作"}</H2><Stack gap="fields" className="my-(--qy-section-gap)"><Collapsible open={open} onOpenChange={setOpen}><CollapsibleTrigger>{open ? (en ? "Hide draft" : "收起草稿") : (en ? "Show draft" : "展开草稿")}</CollapsibleTrigger><CollapsiblePanel><Field><FieldLabel>{en ? "Draft" : "草稿"}</FieldLabel><Input defaultValue="A" /></Field></CollapsiblePanel></Collapsible></Stack><P>{en ? "Collapsible keeps this draft-bearing panel mounted. Closing it changes visibility; it does not submit or cancel anything." : "Collapsible 保留承载草稿的面板。收起只改变可见状态，不代表提交或取消。"}</P>
    <H2 id="policy">{en ? "One policy" : "集中策略"}</H2><P><Code>motion.css</Code>{en ? " owns press feedback and popup entry and exit. Components provide state and positioning hooks. Add no second animation owner for the same transition." : " 管理按压反馈与浮层入退，组件提供状态及位置入口。同一过渡不设置第二个动画 owner。"} <A href="/docs/tokens#motion">{en ? "Motion roles" : "动效角色"}</A></P>
    <H2 id="keyboard">{en ? "Keyboard input" : "键盘输入"}</H2><P><Code>MotionProvider</Code>{en ? " records input modality. Keyboard interaction bypasses transitions on library state hooks; focus and actions still follow the public component contract." : " 记录输入方式，键盘交互跳过库状态入口上的过渡；焦点与动作仍遵守组件公开契约。"}</P>
    <H2 id="reduced-motion">{en ? "Reduced motion" : "减少动态效果"}</H2><P>{en ? "The reduced-motion policy removes decorative movement while preserving actual state. It does not turn pending work into a confirmed result." : "减少动态效果移除装饰性位移，保留实际状态，不把处理中变成已确认结果。"}</P><P>{en ? "Current preference: " : "当前偏好："}{reduced ? (en ? "reduce" : "减少") : (en ? "no preference" : "无偏好")}</P>
  </article>;
}
