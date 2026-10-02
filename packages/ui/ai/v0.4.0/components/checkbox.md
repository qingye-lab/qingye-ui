# 复选框 Checkbox

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/checkbox
Source: packages/ui/src/components/checkbox.tsx
Source SHA-256: 4bcc8bd38ca1ae1d1206fd5cf3e5ffb4ef18d1f7d672b035d2b8c53829a658f9

独立的是 / 否选择，或在一组选项中多选。选择立即生效的开关设置改用 Switch。

## Use and ownership
- 表达一个可勾选条件，或在多个独立条件中选择若干项。
- Avoid: 半选只能表示部分成员选中，不能假装用户已确认全部。
- Library: checked、indeterminate、键盘切换和原生提交语义。
- Application: 同意内容、批量范围及提交后果。

## Composition
- 标签扩大行的操作范围；必要描述与错误放在同一 Field。

## Responsive behavior
- 小方框保留触屏命中区；长标签换行时仍与所属选项对应。

## Customization
- checked 与外观主题分离，项目组合决定卡片或列表载体。

## Current exports
- Checkbox: function; owner checkbox; PASS; props: CheckboxPrimitive.Root.Props
- CheckboxPrimitive: reexport; owner checkbox; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Checkbox
Base UI Checkbox.Root，渲染为 <button role="checkbox"> 加隐藏的原生输入。
- checked / defaultChecked / onCheckedChange: boolean / (checked, details) => void. 受控 / 非受控的勾选状态。
- indeterminate: boolean; default false. 半选状态，常用于「全选」。
- name / value: string. 表单字段名与提交值（默认 "on"）。
- disabled / readOnly / required: boolean. 禁用、只读、必填。
- aria-invalid: boolean. 错误边框；在 Field 中由校验状态自动设置。
- parent: boolean. 在 CheckboxGroup 中作为控制全部子项的父复选框。

## Keyboard
- Space: 切换勾选。
- Tab: 移到下一个复选框。

## Source examples
### 基础用法
Source: apps/docs/src/content/checkbox/demos/01-basic.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "基础用法", description: "Label 包住复选框，整段文字都可点击。" };

export default function Demo() {
  return (
    <Label>
      <Checkbox defaultChecked />
      记住此设备，30 天内免登录
    </Label>
  );
}
```

### 状态
Source: apps/docs/src/content/checkbox/demos/02-states.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "状态" };

export default function Demo() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
      <Label><Checkbox />未选</Label>
      <Label><Checkbox defaultChecked />已选</Label>
      <Label><Checkbox indeterminate />半选</Label>
      <Label><Checkbox disabled />禁用</Label>
      <Label><Checkbox disabled defaultChecked />禁用已选</Label>
      <Label><Checkbox aria-invalid />错误</Label>
    </div>
  );
}
```

### 带说明
Source: apps/docs/src/content/checkbox/demos/03-description.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye/ui/components/field";

export const meta = { title: "带说明", description: "放进 Field，说明会作为复选框的描述读出。" };

export default function Demo() {
  return (
    <Field orientation="horizontal" className="max-w-sm items-start">
      <Checkbox defaultChecked className="mt-px" />
      <FieldContent>
        <FieldLabel>同步到企业通讯录</FieldLabel>
        <FieldDescription>新成员入职后自动加入「研发中心」部门，并开通邮箱与 VPN。</FieldDescription>
      </FieldContent>
    </Field>
  );
}
```

### 卡片选项
Source: apps/docs/src/content/checkbox/demos/04-card.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "卡片选项", description: "整张卡片是标签；选中时边框与底色一起变化。" };

const addons = [
  { id: "backup", title: "自动备份", detail: "每日 03:00 快照，保留 7 天", price: "¥30/月", checked: true },
  { id: "waf", title: "Web 应用防火墙", detail: "拦截 SQL 注入、XSS 与恶意爬虫", price: "¥199/月" },
  { id: "monitor", title: "高级监控", detail: "秒级指标与短信告警", price: "¥49/月" },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {addons.map((addon) => (
        <Label
          key={addon.id}
          className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
        >
          <Checkbox defaultChecked={addon.checked} className="mt-px" />
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span>{addon.title}</span>
            <span className="font-normal text-muted-foreground text-xs">{addon.detail}</span>
          </span>
          <span className="font-normal text-muted-foreground text-xs numeric">{addon.price}</span>
        </Label>
      ))}
    </div>
  );
}
```

### 组合：提交前确认
Source: apps/docs/src/content/checkbox/demos/05-agreement.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Label } from "@qingye/ui/components/label";
import { useState } from "react";

export const meta = { title: "组合：提交前确认", description: "未勾选时禁用提交按钮。" };

export default function Demo() {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Label className="items-start font-normal leading-5">
        <Checkbox checked={agreed} onCheckedChange={setAgreed} className="mt-0.5" />
        <span>
          我已阅读并同意<a className="font-medium underline underline-offset-2" href="#terms">《数据处理协议》</a>，并确认上传的设备数据不含个人敏感信息。
        </span>
      </Label>
      <Button disabled={!agreed} className="self-start">开始导入</Button>
    </div>
  );
}
```

