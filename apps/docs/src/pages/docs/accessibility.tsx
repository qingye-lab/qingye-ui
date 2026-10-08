import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Label } from "@qingye_lab/ui/components/label";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye_lab/ui/components/progress";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { useId, useState } from "react";
import { A, H2, P, PageHeader } from "@/components/prose";
// The coarse-pointer target is the library preset --qy-touch-target (2.75rem = 44px).
import { useDocsLocale } from "@/lib/docs-locale";
export default function AccessibilityPage() {
  const en = useDocsLocale() === "en";
  const base = useId(); const [checked,setChecked] = useState<Set<number>>(new Set());
  const items = en ? ["The keyboard reaches every control of the task in reading order, and focus stays visible inside each control's boundary.", "Every control has an accurate name and state; each field's label and error are associated with its input.", "Normal text, supporting text included, reaches 4.5:1 in both themes; large text and necessary non-text content meet their own requirements.", "Closing an overlay returns focus somewhere useful; failure and cancellation keep the work needed to recover."] : ["键盘按阅读顺序到达任务中的每个控件，焦点在控件边界内始终可见。", "每个控件的名称与状态准确，字段的标签和错误与输入关联。", "普通文字（含辅助文字）在浅色与深色下都达到 4.5:1；大号文字与必要的非文本元素按各自要求检查。", "浮层关闭后焦点回到有用的位置；失败与取消保留恢复所需的工作。"];
  return <article><PageHeader title={en ? "Accessibility" : "无障碍"} description={en ? "Components supply keyboard, focus and ARIA behaviour; names, content and page structure come from your application." : "组件提供键盘、焦点与 ARIA 行为；名称、内容与页面结构由你的应用提供。"} />
    <H2 id="targets">{en ? "Contrast and targets" : "对比度与命中区"}</H2><P>{en ? "A token name does not prove contrast: test the rendered foreground against its actual background, in light and dark. Under a coarse pointer the library's target is 44px. That is this library's choice; WCAG 2.2 AA (2.5.8) asks for 24×24px, with exceptions." : "令牌名称不能证明对比度：在浅色与深色下分别检查实际的前景与背景。粗指针下本库的命中区为 44px，这是本库的取值；WCAG 2.2 AA（2.5.8）的基础要求是 24×24px，并有例外。"}</P>
    <H2 id="checklist">{en ? "Checklist" : "检查清单"}</H2><Stack className="mb-(--qy-space-module) max-w-(--docs-measure)" gap="fields"><Inline align="end"><Progress value={checked.size} max={items.length} getAriaValueText={(_, value) => `${value ?? 0} / ${items.length}`} className="w-(--docs-toc)"><div className="flex items-baseline justify-between gap-(--qy-field-gap)"><ProgressLabel>{en ? "Checked" : "已勾选"}</ProgressLabel><ProgressValue>{(_, value) => `${value ?? 0} / ${items.length}`}</ProgressValue></div><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress><Button variant="quiet" disabled={checked.size === 0} onClick={() => setChecked(new Set())}>{en ? "Clear" : "清空"}</Button></Inline>{items.map((item,index) => <Inline align="start" key={index}><Checkbox id={`${base}-${index}`} checked={checked.has(index)} onCheckedChange={next => setChecked(prev => { const value = new Set(prev); next ? value.add(index) : value.delete(index); return value; })} /><Label className="flex-1" htmlFor={`${base}-${index}`}>{item}</Label></Inline>)}</Stack>
    <H2 id="evidence">{en ? "What counts as verified" : "验证边界"}</H2><P>{en ? "Static checks and screenshots do not replace keyboard, screen-reader and real-device testing. Record a check that was not run as unverified, never as passed. Each component's keyboard behaviour is listed on its " : "静态检查与截图不能代替键盘、读屏与真机测试。没有运行的检查记为未验证，不记为通过。各组件的键盘行为见"}<A href="/docs/components">{en ? "page" : "组件页"}</A>{en ? "." : "。"}</P>
  </article>;
}
