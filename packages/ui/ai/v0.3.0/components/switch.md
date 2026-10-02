# 开关 Switch

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/switch
Source: packages/ui/src/components/switch.tsx
Source SHA-256: 6039cba5cae7cf2b38d2c1cbfe8d70bf12eaa1c227f750cc6d88a5165a8435bd

切换一项立即生效的设置，例如启用通知。需要提交后才生效的选择用 Checkbox。

## Use and ownership
- 切换一项立即生效的设置，例如启用通知。需要提交后才生效的选择用 Checkbox。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- Switch: function; owner switch; PASS; props: SwitchPrimitive.Root.Props
- SwitchPrimitive: reexport; owner switch; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Switch
Base UI Switch.Root，渲染为 <button role="switch"> 加隐藏的原生输入。
- checked / defaultChecked / onCheckedChange: boolean / (checked, details) => void. 受控 / 非受控的开关状态。
- name / value: string. 表单字段名与提交值。
- disabled / readOnly / required: boolean. 禁用、只读、必填。

## Keyboard
- Space / Enter: 切换开关。
- Tab: 移到下一个控件。

## Source examples
### 基础用法
Source: apps/docs/src/content/switch/demos/01-basic.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "基础用法" };

export default function Demo() {
  return (
    <Label>
      <Switch defaultChecked />
      夜间免打扰
    </Label>
  );
}
```

### 状态
Source: apps/docs/src/content/switch/demos/02-states.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "状态" };

export default function Demo() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
      <Label><Switch />关闭</Label>
      <Label><Switch defaultChecked />开启</Label>
      <Label><Switch disabled />禁用</Label>
      <Label><Switch disabled defaultChecked />禁用开启</Label>
    </div>
  );
}
```

### 组合：设置列表
Source: apps/docs/src/content/switch/demos/03-settings.tsx
```tsx
import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "组合：设置列表", description: "标签与说明在左，开关靠右对齐。" };

const settings = [
  { id: "offline", label: "设备离线提醒", description: "设备连续 5 分钟无心跳时推送通知。", checked: true },
  { id: "digest", label: "每日运行摘要", description: "每天 08:30 发送前一天的告警与能耗汇总。", checked: true },
  { id: "beta", label: "参与新功能内测", description: "提前体验新版控制台，可能存在不稳定的情况。" },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col divide-y rounded-xl border">
      {settings.map((item) => (
        <Field key={item.id} orientation="horizontal" className="gap-4 px-4 py-3">
          <FieldContent>
            <FieldLabel>{item.label}</FieldLabel>
            <FieldDescription>{item.description}</FieldDescription>
          </FieldContent>
          <Switch defaultChecked={item.checked} />
        </Field>
      ))}
    </div>
  );
}
```

### 卡片开关
Source: apps/docs/src/content/switch/demos/04-card.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";
import { ShieldCheckIcon } from "lucide-react";

export const meta = { title: "卡片开关", description: "开启时卡片边框与底色随之变化。" };

export default function Demo() {
  return (
    <Label className="flex w-full max-w-sm items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50">
      <ShieldCheckIcon aria-hidden="true" className="mt-px size-4.5 shrink-0 opacity-80 sm:size-4" />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span>登录二次验证</span>
        <span className="font-normal text-muted-foreground text-xs">在新设备登录时要求输入短信验证码。</span>
      </span>
      <Switch defaultChecked />
    </Label>
  );
}
```

