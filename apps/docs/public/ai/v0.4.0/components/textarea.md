# 多行输入 Textarea

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/textarea
Source: packages/ui/src/components/textarea.tsx
Source SHA-256: 34c663ac7d40f6a36ea8a7e002217464a9235e67e58942a7316ebbbe49e1a9c0

多行文本输入，高度随内容增长。用于备注、描述、反馈等较长的文字。

## Use and ownership
- 编辑备注、正文或反馈，工作空间随内容增长。
- Avoid: 不要用固定矮框隐藏长草稿；字符上限不能靠截断用户输入来表达。
- Library: 多行编辑、字段关联与最小输入空间。
- Application: 草稿、字数规则、自动保存及恢复策略。

## Composition
- Field 提供名称和原位错误；底部工具栏用 InputGroupTextarea 与 block-end addon。

## Responsive behavior
- 限制高度时让内部滚动，保留完整文本；原生 rows 作为不支持自动高度时的起点。

## Customization
- size 决定起始空间；外框 className 与原生 textarea 属性分别调整。

## Current exports
- FieldPrimitive: reexport; owner textarea; UNVERIFIED
- Textarea: function; owner textarea; PASS; props: TextareaProps
- TextareaProps: type; owner textarea; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Textarea
基于 Base UI Field.Control。外层 <span data-slot="textarea-control"> 承载边框与焦点环，className 作用于外层；其余属性透传给 <textarea>。
- size: "sm" | "default" | "lg"; default "default". 最小高度与内边距。
- rows: number. 初始行数；内容增长时自动加高（field-sizing: content）。
- unstyled: boolean; default false. 去掉外层样式，供 InputGroup 组合使用。

## Keyboard
- Tab: 移入、移出焦点。

## Source examples
### 默认
Source: apps/docs/src/content/textarea/demos/01-default.tsx
```tsx
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "默认", description: "高度随内容自动增长。" };

export default function Demo() {
  return <Textarea aria-label="备注" className="max-w-sm" placeholder="补充说明，例如送货前请电话联系" />;
}
```

### 尺寸
Source: apps/docs/src/content/textarea/demos/02-sizes.tsx
```tsx
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Textarea aria-label="小" placeholder="小 sm" size="sm" />
      <Textarea aria-label="默认" placeholder="默认 default" />
      <Textarea aria-label="大" placeholder="大 lg" size="lg" />
    </div>
  );
}
```

### 配合标签与字数
Source: apps/docs/src/content/textarea/demos/03-field.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Textarea } from "@qingye/ui/components/textarea";
import { useState } from "react";

export const meta = { title: "配合标签与字数", description: "放在 Field 中，并用 maxLength 提示剩余字数。" };

export default function Demo() {
  const max = 200;
  const [value, setValue] = useState("");
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>问题描述</FieldLabel>
      <Textarea
        maxLength={max}
        onChange={(event) => setValue(event.target.value)}
        placeholder="请描述故障现象、出现时间和影响范围"
        value={value}
      />
      <FieldDescription aria-live="polite" className="numeric self-end">
        {value.length} / {max}
      </FieldDescription>
    </Field>
  );
}
```

### 状态
Source: apps/docs/src/content/textarea/demos/04-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "状态", description: "无效、只读与禁用。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field invalid>
        <FieldLabel>退款原因</FieldLabel>
        <Textarea defaultValue="不想要了" />
        <FieldError>请至少填写 10 个字，便于客服核实。</FieldError>
      </Field>
      <Field>
        <FieldLabel>审核意见</FieldLabel>
        <Textarea defaultValue="资料齐全，同意开通企业账户。—— 王敏，9 月 28 日" readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>内部备注</FieldLabel>
        <Textarea placeholder="仅管理员可编辑" />
      </Field>
    </div>
  );
}
```

### 组合：评论框
Source: apps/docs/src/content/textarea/demos/05-with-actions.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "组合：评论框", description: "多行输入下方放操作按钮，主按钮靠末端。" };

export default function Demo() {
  return (
    <Form className="flex w-full max-w-sm flex-col gap-3" onSubmit={(event) => event.preventDefault()}>
      <Field name="comment">
        <FieldLabel>添加评论</FieldLabel>
        <Textarea placeholder="@张伟 这台设备上周也报过同样的错误" required />
      </Field>
      <div className="flex justify-end gap-2">
        <Button type="reset" variant="ghost">
          清空
        </Button>
        <Button type="submit">发表</Button>
      </div>
    </Form>
  );
}
```

