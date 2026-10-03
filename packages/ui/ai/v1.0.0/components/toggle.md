# 按压按钮 Toggle

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/toggle
Source: packages/ui/src/components/toggle.tsx
Source SHA-256: 4c2e32ceae7b39accaf0736cf6c6f87afc11f3bb29b333865483550c1ae384ff

保持名称的二态按压按钮。

## Notes
- 名称不随 pressed 改写，aria-pressed 表达状态。
- pressed 不表示保存、请求或持久化已完成。
- 布尔表单值用 Checkbox，即时开关用 Switch。

## Use and ownership
- 稳定名称的二态工具按钮
- Avoid: 单次动作使用 Button
- Avoid: 表单布尔值使用 Checkbox
- Avoid: 异步结果不由 Toggle 推断
- Library: 非受控 pressed、按压、焦点
- Application: 受控 pressed、相关内容、持久化

## Composition
- 可组合进 ToggleGroup；图标必须给 aria-label

## Responsive behavior
- 既有 control 五档和 touch-target；实际命中未在本批浏览器验证

## Customization
- 未按压 bordered，按压 solid；复用 Button 的几何与焦点角色

## Current exports
- Toggle: function; owner toggle; PASS; props: ToggleProps<Value>
- TogglePrimitive: reexport; owner toggle; UNVERIFIED
- ToggleProps: type; owner toggle; PASS
- ToggleSize: type; owner toggle; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Toggle
独立的 pressed 布尔事实。
- pressed / defaultPressed: boolean. 受控事实或非受控初值。默认未按压。
- onPressedChange: (pressed: boolean, details) => void. 提供按压事实，可用 details.cancel() 取消。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 五档 control 与同名 text-control，窄屏 +4px。
- shape: "label" | "icon"; default "label". 文字与图标几何；纯图标按钮必须有可访问名称。
- disabled: boolean; default false. 原生禁用，无法改变 pressed。
- value: string. 仅在 ToggleGroup 内标识该项；独立 Toggle 的状态仍是 boolean，不是表单值输入。
- render / nativeButton / ref / className / style: Base UI composition. 保留元素、ARIA、事件和原语样式回调。

### TogglePrimitive
Base UI 按压原语公共出口。

## Keyboard
- Tab / Shift+Tab: 到达可用按钮。
- Space / Enter: 在 pressed 与 unpressed 之间切换。

## Source examples
### 按压
Source: apps/docs/src/content/toggle/demos/01-pressed.tsx
```tsx
import { useState } from "react";
import { BoldIcon } from "lucide-react";
import { Toggle } from "@qingye/ui/components/toggle";

export const meta = { title: "按压", titleEn: "Pressed" };
export default function Demo() {
  const [pressed, setPressed] = useState(false);
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
    <Toggle pressed={pressed} onPressedChange={setPressed}>加粗</Toggle>
    <Toggle shape="icon" aria-label="斜体">I</Toggle>
    <Toggle disabled defaultPressed><BoldIcon aria-hidden="true" />加粗</Toggle>
    <span className={pressed ? "text-body-strong text-foreground" : "text-body text-foreground"}>Aa 字</span>
  </div>;
}
```

### 尺寸
Source: apps/docs/src/content/toggle/demos/02-sizes.tsx
```tsx
import { Toggle, type ToggleSize } from "@qingye/ui/components/toggle";

export const meta = { title: "尺寸", titleEn: "Sizes" };
const sizes: ToggleSize[] = ["xs", "sm", "md", "lg", "xl"];
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">{sizes.map(size => <Toggle key={size} size={size}>{size}</Toggle>)}</div>;
}
```
