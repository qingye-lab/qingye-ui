# 标签 Label

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/label
Source: packages/ui/src/components/label.tsx
Source SHA-256: c1865b88555d0aae9aa6a934c6b19a68c3ec10eed26ed4cd4d13df8a6c14c18e

表单控件的可见标签。简单场景直接关联控件；需要说明与校验信息时改用 Field 与 FieldLabel。

## Use and ownership
- 表单控件的可见标签。简单场景直接关联控件；需要说明与校验信息时改用 Field 与 FieldLabel。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- Label: function; owner label; PASS; props: useRender.ComponentProps<"label">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Label
渲染 <label>，通过 htmlFor 关联控件，或直接包裹复选框、开关。支持 render 替换元素。
- htmlFor: string. 关联控件的 id。
- render: ReactElement | (props) => ReactElement. 替换渲染元素。

## Keyboard

## Source examples
### 关联输入框
Source: apps/docs/src/content/label/demos/01-default.tsx
```tsx
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "关联输入框", description: "htmlFor 指向控件 id，点击标签即可聚焦。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="label-project">项目名称</Label>
      <Input id="label-project" placeholder="例如：滨江仓储改造" />
    </div>
  );
}
```

### 包裹控件
Source: apps/docs/src/content/label/demos/02-with-control.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "包裹控件", description: "包裹复选框或开关时，文字也是点击区域。" };

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox defaultChecked />
        记住此设备 30 天
      </Label>
      <Label>
        <Switch />
        接收夜间告警
      </Label>
    </div>
  );
}
```

### 必填与选填
Source: apps/docs/src/content/label/demos/03-required.tsx
```tsx
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "必填与选填", description: "用星号或“选填”文字标示，并在控件上设 required。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-name">
          收件人 <span aria-hidden="true" className="text-destructive-foreground">*</span>
        </Label>
        <Input id="label-name" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-company">
          公司 <span className="font-normal text-muted-foreground">选填</span>
        </Label>
        <Input id="label-company" />
      </div>
    </div>
  );
}
```

