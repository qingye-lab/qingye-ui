# 输入框 Input

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/input
Source: packages/ui/src/components/input.tsx
Source SHA-256: a6ac174d2cf4e53776243dd5d194b31848eb16fed60851392dc8cd89e6ea6d89

单行文本输入。配合 Field 提供标签、说明与校验信息；需要前后缀、图标或按钮时用 InputGroup。

## Use and ownership
- 单行文本输入。配合 Field 提供标签、说明与校验信息；需要前后缀、图标或按钮时用 InputGroup。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- Input: function; owner input; PASS; props: InputProps
- InputPrimitive: reexport; owner input; UNVERIFIED
- InputProps: type; owner input; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Input
基于 Base UI Input，外层 <span data-slot="input-control"> 承载边框与焦点环，className 作用于外层；其余属性透传给 <input>。
- size: "sm" | "default" | "lg" | number; default "default". 高度：28 / 32 / 36px（移动端各加 4px）；传数字时作为原生 size 属性。
- type: string; default "text". 原生类型。search 会隐藏浏览器自带的清除按钮；file 复用 Input 的外框样式，但控件本身是浏览器原生的，文案不可本地化（见下方说明）。
- aria-invalid: boolean. 标记为无效；在 Field 中由校验自动设置。
- unstyled: boolean; default false. 去掉外层样式，供 InputGroup 等组合使用。
- nativeInput: boolean; default false. 渲染原生 <input> 而不注册到 Base UI Field。

## Keyboard
- Tab: 移入、移出焦点；键盘聚焦时显示焦点环。

## Source examples
### 默认
Source: apps/docs/src/content/input/demos/01-default.tsx
```tsx
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "默认" };

export default function Demo() {
  return <Input aria-label="设备名称" className="max-w-xs" placeholder="例如：3 号楼东侧摄像头" />;
}
```

### 尺寸
Source: apps/docs/src/content/input/demos/02-sizes.tsx
```tsx
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "尺寸", description: "sm 用于筛选栏与表格内，lg 用于登录等突出表单。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input aria-label="小" placeholder="小 sm" size="sm" />
      <Input aria-label="默认" placeholder="默认 default" />
      <Input aria-label="大" placeholder="大 lg" size="lg" />
    </div>
  );
}
```

### 配合标签
Source: apps/docs/src/content/input/demos/03-with-label.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "配合标签", description: "放在 Field 中，标签、说明与输入框自动关联。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>
        联系电话 <span className="text-destructive-foreground">*</span>
      </FieldLabel>
      <Input autoComplete="tel" inputMode="tel" placeholder="138 0000 0000" required type="tel" />
      <FieldDescription>仅用于工单进度通知。</FieldDescription>
    </Field>
  );
}
```

### 状态
Source: apps/docs/src/content/input/demos/04-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "状态", description: "无效、只读与禁用。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <Field invalid>
        <FieldLabel>邮箱</FieldLabel>
        <Input defaultValue="li.na@company" type="email" />
        <FieldError>邮箱格式不正确，例如 li.na@company.com</FieldError>
      </Field>
      <Field>
        <FieldLabel>工号</FieldLabel>
        <Input defaultValue="YQ-20481" readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>所属部门</FieldLabel>
        <Input defaultValue="运维中心" />
      </Field>
    </div>
  );
}
```

### 文件选择
Source: apps/docs/src/content/input/demos/05-file.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { FileUpload } from "@qingye/ui/components/file-upload";

export const meta = {
  title: "文件选择",
  description: "附件、证件、导入文件用 FileUpload：文案随界面语言、可校验格式与大小、可显示进度。用 htmlFor + id 关联标签。",
};

export default function Demo() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel htmlFor="license-file">营业执照</FieldLabel>
      <FileUpload
        accept="image/*,.pdf"
        description="支持 JPG、PNG、PDF，不超过 10 MB"
        id="license-file"
        maxFiles={1}
        maxSize={10 * 1024 * 1024}
        name="license"
        variant="button"
      />
      <FieldDescription>审核通过后可在“企业信息”中重新上传。</FieldDescription>
    </Field>
  );
}
```

### 字数提示
Source: apps/docs/src/content/input/demos/06-character-count.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = { title: "字数提示", description: "用 maxLength 限制长度，并在说明里实时显示剩余字数。" };

export default function Demo() {
  const max = 20;
  const [value, setValue] = useState("杭州滨江仓");
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>仓库简称</FieldLabel>
      <Input maxLength={max} onChange={(event) => setValue(event.target.value)} value={value} />
      <FieldDescription aria-live="polite" className="numeric">
        还可输入 {max - value.length} 个字
      </FieldDescription>
    </Field>
  );
}
```

### 原生文件选择
Source: apps/docs/src/content/input/demos/07-native-file.tsx
```tsx
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "原生文件选择",
  description:
    "type=\"file\" 使用浏览器自带控件，外框沿用 Input 的样式，但“Choose File / No file chosen”由浏览器按其语言绘制，CSS 无法翻译或替换（::file-selector-button 不接受 content）。界面为中文时请用 FileUpload。",
};

export default function Demo() {
  return <Input aria-label="导入设备清单" className="max-w-xs" type="file" />;
}
```

