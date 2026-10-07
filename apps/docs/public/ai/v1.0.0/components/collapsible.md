# 单段展开 Collapsible

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/collapsible
Source: packages/ui/src/components/collapsible.tsx
Source SHA-256: 464332e8cb94b91e8854df37c5d5d3c696dee2af73bd1c3695a6beaa19f5e66a

主动展开同一对象的补充内容。

## Decision
触发名称与单段内容关联；默认保留输入，关闭只结束呈现。

## Notes
- 多项同组展开使用 Accordion。
- 关闭不声明取消、撤销或保存。

## Use and ownership
- 同一对象有可主动展开的补充内容。
- Avoid: 把必要后果只放在默认隐藏内容。
- Library: open、键盘和 ARIA。
- Application: 内容、输入和业务状态。

## Composition
- Trigger 与 Panel 保留公共原语关联。

## Responsive behavior
- 内容换行且自然增长。

## Customization
- field gap、Button 和 motion.css 共享角色。

## Current exports
- Collapsible: function; owner collapsible; PASS; props: CollapsiblePrimitive.Root.Props
- CollapsiblePanel: function; owner collapsible; PASS; props: CollapsiblePrimitive.Panel.Props
- CollapsiblePrimitive: reexport; owner collapsible; UNVERIFIED
- CollapsibleTrigger: function; owner collapsible; PASS; props: CollapsiblePrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Collapsible
单段内容的展开状态。
- open / defaultOpen / onOpenChange: CollapsiblePrimitive.Root.Props. 真实展开状态与可取消变更请求。
- disabled: boolean. 禁用切换。

### CollapsibleTrigger
默认 Button quiet，支持原语 render/ref/事件。

### CollapsiblePanel
关联内容与保持策略。
- keepMounted: boolean; default true. 保留关闭内容和原生字段；应用决定隐藏字段是否禁用。
- render / ref / className / style: CollapsiblePrimitive.Panel.Props. 透传呈现及原语状态。

## Keyboard
- Enter / Space: 展开或收起。
- Tab / Shift+Tab: 访问触发者与展开内容。

## Source examples
### 展开与保留输入
Source: apps/docs/src/content/collapsible/demos/01-states.tsx
```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "展开与保留输入", titleEn: "Reveal and retain input" };
export default function CollapsibleDemo() {
  return <Stack gap="fields" className="w-full max-w-sm"><Collapsible><CollapsibleTrigger>补充内容</CollapsibleTrigger><CollapsiblePanel><Label htmlFor="collapsible-value">输入</Label><Input id="collapsible-value" /></CollapsiblePanel></Collapsible><Collapsible disabled><CollapsibleTrigger>禁用展开</CollapsibleTrigger><CollapsiblePanel>内容</CollapsiblePanel></Collapsible></Stack>;
}
```
