# Collapsible

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/collapsible
Source: packages/ui/src/components/collapsible.tsx
Source SHA-256: 12c54767186d874e7c90f740a8b425bbaaaebbfdf1bb31ea2123aeb2b8f77b7e

Reveal additional content for the same object.

## Decision
Relate the named trigger to one content region. Retain input by default; closing only ends its presentation.

## Notes
- Use Accordion for a group of expandable sections.
- CollapsiblePanel defaults to keepMounted: closed content stays in the DOM, so typed values and native fields are not lost; the cost is that closed content remains in the document tree. Set keepMounted={false} when the content need not retain values, and hiddenUntilFound when find-in-page should match it.
- Closing establishes no cancellation, undo, or save result.
- With a coarse pointer the hit area grows to the touch target; the visible size does not change.

## Use and ownership
- One object has supplementary content to disclose deliberately.
- Avoid: Putting necessary consequences solely in initially hidden content.
- Library: Open state, keyboard, and ARIA.
- Application: Content, inputs, and business states.

## Composition
- Trigger and Panel retain public primitive associations.

## Responsive behavior
- Content wraps and grows naturally.

## Customization
- Shared field gap, Button, and motion.css roles.

## Current exports
- Collapsible: function; owner collapsible; PASS; props: CollapsiblePrimitive.Root.Props
- CollapsiblePanel: function; owner collapsible; PASS; props: CollapsiblePrimitive.Panel.Props
- CollapsiblePrimitive: reexport; owner collapsible; UNVERIFIED
- CollapsibleTrigger: function; owner collapsible; PASS; props: CollapsibleTriggerProps
- CollapsibleTriggerProps: type; owner collapsible; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Collapsible
- no props declared by this library
- plus 282 inherited (@types/react 275, @base-ui/react 7); not expanded, see the installed declarations

### CollapsiblePanel
- no props declared by this library
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### CollapsibleTrigger
- `indicator?`: `boolean`. 是否显示尾部展开箭头，默认显示。设为 false 时触发器只剩文字（预设：二值，不接受自定义图标，因为箭头的旋转由 DisclosureIcon 与展开态绑定）。
- plus 289 inherited (@types/react 285, @base-ui/react 4); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Collapsible
Expansion state for one section.
- open / defaultOpen / onOpenChange: CollapsiblePrimitive.Root.Props. Actual open state and cancelable change requests.
- disabled: boolean. Disable toggling.

### CollapsibleTrigger
An inline expand entry of text plus a trailing arrow; supports primitive render, refs, and events.
- indicator: boolean; default true. Whether the trailing arrow shows. With false only the text remains; the trigger's name, keyboard behavior and aria-expanded are unchanged. Use render for a fully custom form.

### CollapsiblePanel
Associated content and retention policy.
- hiddenUntilFound: boolean; default false. Closed, the content stays in the document as hidden="until-found": find-in-page (Ctrl/Cmd+F) matching text inside it, or a URL fragment pointing at an element inside it, opens it automatically. Supported in Chrome 102+ and Firefox 148+, not Safari; where unsupported it behaves as the default. keepMounted is ignored while it is on. A find match opens it immediately without the transition.
- keepMounted: boolean; default true. Retain closed content and native fields; the application decides whether hidden fields are disabled.
- render / ref / className / style: CollapsiblePrimitive.Panel.Props. Forward presentation and primitive states.

## Keyboard
- Enter / Space: Expand or collapse.
- Tab / Shift+Tab: Reach the trigger and expanded content.

## Source examples
### 展开与保留输入
Source: apps/docs/src/content/collapsible/demos/01-states.tsx
```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "展开与保留输入", titleEn: "Reveal and retain input" };
export default function CollapsibleDemo() {
  return <Stack gap="fields" className="w-full max-w-sm"><Collapsible><CollapsibleTrigger>补充内容</CollapsibleTrigger><CollapsiblePanel><Label htmlFor="collapsible-value">输入</Label><Input id="collapsible-value" /></CollapsiblePanel></Collapsible><Collapsible disabled><CollapsibleTrigger>禁用展开</CollapsibleTrigger><CollapsiblePanel>内容</CollapsiblePanel></Collapsible></Stack>;
}
```

### 页内查找
Source: apps/docs/src/content/collapsible/demos/02-until-found.tsx
```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
export const meta = { title: "页内查找", titleEn: "Find in page" };
export default function CollapsibleDemo() {
  return <Collapsible className="w-full max-w-sm"><CollapsibleTrigger>更新记录</CollapsibleTrigger><CollapsiblePanel hiddenUntilFound>修正了导出时丢失表头的问题，并让大文件的进度可以取消。</CollapsiblePanel></Collapsible>;
}
```

### 无箭头
Source: apps/docs/src/content/collapsible/demos/03-no-indicator.tsx
```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { useUILocale } from "@qingye_lab/ui/locale";
export const meta = { title: "无箭头", titleEn: "Without arrow" };
export default function CollapsibleNoIndicatorDemo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  return <Collapsible className="w-full max-w-sm"><CollapsibleTrigger indicator={false}>{en ? "Show more" : "查看更多"}</CollapsibleTrigger><CollapsiblePanel>{en ? "Additional content for the same object." : "同一对象的补充内容。"}</CollapsiblePanel></Collapsible>;
}
```
