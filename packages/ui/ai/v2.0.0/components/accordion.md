# 分组展开 Accordion

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/accordion
Source: packages/ui/src/components/accordion.tsx
Source SHA-256: aa24243efe72e90fae36646c29fea4fa06b1094a13b3f7e6762bb3cb0e37c1ec

按各项名称主动展开内容。

## Decision
标题、触发与内容保持同一项关系；关闭不删除输入或宣告业务取消。

## Notes
- 名称必须说明被展开的内容。
- 单段内容使用 Collapsible；不得用隐藏内容暗示已经阅读或完成。
- keepMounted 保留真实表单字段，应用决定是否禁用隐藏字段。

## Use and ownership
- 有限的同组内容需要主动选择展开。
- Avoid: 唯一关键后果仅存在于默认隐藏内容。
- Library: 展开状态、ARIA 关联与原语键盘。
- Application: 项内容、稳定标识、输入和业务事实。

## Composition
- Item 包含 Header/Trigger 与 Panel；默认 Trigger 复用 Button。

## Responsive behavior
- 长名称与内容换行；不以固定高度裁去文字。

## Customization
- 使用现有 field gap 和文字角色，入退归 motion.css。

## Current exports
- Accordion: function; owner accordion; PASS; props: AccordionPrimitive.Root.Props<Value>
- AccordionHeader: function; owner accordion; PASS; props: AccordionPrimitive.Header.Props
- AccordionItem: function; owner accordion; PASS; props: AccordionPrimitive.Item.Props
- AccordionPanel: function; owner accordion; PASS; props: AccordionPrimitive.Panel.Props
- AccordionPrimitive: reexport; owner accordion; UNVERIFIED
- AccordionTrigger: function; owner accordion; PASS; props: AccordionPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Accordion
同组展开的状态与保留策略。
- value / defaultValue / onValueChange: AccordionPrimitive.Root.Props. 应用控制或原语持有展开项；事件可取消。
- multiple: boolean; default false. 允许多项共同展开。
- keepMounted: boolean; default true. 保留关闭内容和原生字段；需要移除时显式关闭。
- disabled: boolean. 禁用整组。

### AccordionItem
一项的身份与禁用。
- value / disabled: AccordionPrimitive.Item.Props. 稳定项标识与单项禁用。

### AccordionHeader / AccordionTrigger / AccordionPanel
原生 heading、Button 组合与关联内容；支持 render/ref/事件和状态 className。标题层级由调用方 render 调整。

## Keyboard
- Enter / Space: 切换当前项。
- Tab / Shift+Tab: 访问启用触发与展开内容中的控件。

## Source examples
### 展开与禁用
Source: apps/docs/src/content/accordion/demos/01-states.tsx
```tsx
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye_lab/ui/components/accordion";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
export const meta = { title: "展开与禁用", titleEn: "Open and disabled" };
export default function AccordionDemo() {
  return <Accordion multiple defaultValue={["first"]} className="w-full max-w-sm">
    <AccordionItem value="first"><AccordionHeader render={<h4 />}><AccordionTrigger>第一项</AccordionTrigger></AccordionHeader><AccordionPanel><Label htmlFor="accordion-value">输入</Label><Input id="accordion-value" defaultValue="" /></AccordionPanel></AccordionItem>
    <AccordionItem value="second"><AccordionHeader render={<h4 />}><AccordionTrigger>第二项</AccordionTrigger></AccordionHeader><AccordionPanel>第二项内容</AccordionPanel></AccordionItem>
    <AccordionItem value="disabled" disabled><AccordionHeader render={<h4 />}><AccordionTrigger>禁用项</AccordionTrigger></AccordionHeader><AccordionPanel>禁用项内容</AccordionPanel></AccordionItem>
  </Accordion>;
}
```
