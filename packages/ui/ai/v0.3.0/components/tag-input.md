# 标签输入 TagInput

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/tag-input
Source: packages/ui/src/components/tag-input.tsx
Source SHA-256: 3a97b165ec52d138d8a2e66397f3cfd1aa9b684d7cb4a7515e12cfec27de75cb

在输入框里录入一组自由文本标签，例如关键词、邮箱或技能。回车或逗号确认，粘贴一列文本会自动拆分；从固定选项中多选时用 Combobox。

## Use and ownership
- 输入并核对可自由定义的标签或收件人，逐项修改。
- Avoid: 重复值不应再加入；被规则拒绝的文字保留用于修正，而非悄悄丢弃。
- Library: 确认、去重、IME、键盘移除、焦点与继承禁用。
- Application: 标签业务规则、集合上限、草稿和持久化。

## Composition
- 标签、待确认文本与校验消息围绕同一集合；隐藏 inputs 提交已确认项。

## Responsive behavior
- 标签可在框内换行，长项有截断但完整值继续保留；键盘焦点定位到当前项。

## Customization
- validate 返回真实可修正原因；removeLabel 为自定义对象命名，size 调整密度。

## Current exports
- TagInput: function; owner tag-input; PASS; props: TagInputProps
- TagInputProps: interface; owner tag-input; PASS
- TagInputSize: type; owner tag-input; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### TagInput
渲染控件框与内部的文本输入；id、placeholder、aria-*、onKeyDown 等属性落在文本输入上。放在 Field 中时自动关联 FieldLabel。
- value / defaultValue: string[]. 受控 / 非受控的标签列表。
- onValueChange: (value: string[]) => void. 标签增删时回调。
- name: string. 每个标签提交一个同名隐藏字段，服务端用 formData.getAll(name) 读取。
- max: number. 标签数量上限；超出时提示且保留输入。
- validate: (tag, tags) => string | null. 返回文案即拒绝该标签并在下方显示，输入内容保留以便修改。
- size: "sm" | "default" | "lg"; default "default". 与 Combobox 多选框一致的尺寸。
- addOnBlur: boolean; default true. 失去焦点时把未确认的文字加为标签。
- removeLabel: (tag: string) => string. 移除按钮的无障碍名称，默认“移除 {标签}”。
- disabled / readOnly / required: boolean. 只读时隐藏移除按钮；required 在没有任何标签时阻止提交。
- className / inputClassName: string. 分别作用于控件框与内部文本输入。

## Keyboard
- Enter / ,: 把输入内容确认为标签（支持全角逗号）；输入为空时 Enter 照常提交表单。
- Backspace: 输入为空时移除最后一个标签。
- ← / →: 光标在开头时进入标签，在标签之间移动；越过最后一个回到输入框。
- Backspace / Delete: 移除当前聚焦的标签。
- Esc: 清空未确认的输入与提示。

## Source examples
### 基础用法
Source: apps/docs/src/content/tag-input/demos/01-basic.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { TagInput } from "@qingye/ui/components/tag-input";

export const meta = { title: "基础用法", description: "回车或逗号确认；粘贴“设计, 运营, 增长”会拆成三个标签。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel>文章关键词</FieldLabel>
      <TagInput defaultValue={["产品设计", "用户研究"]} name="keywords" placeholder="输入关键词后按回车" />
      <FieldDescription>用于站内搜索与推荐，最多选取最相关的几个。</FieldDescription>
    </Field>
  );
}
```

### 尺寸
Source: apps/docs/src/content/tag-input/demos/02-sizes.tsx
```tsx
import { TagInput } from "@qingye/ui/components/tag-input";

export const meta = { title: "尺寸", description: "高度与 Combobox 多选框一致，标签随尺寸缩放。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <TagInput aria-label="小尺寸" defaultValue={["前端", "React"]} size="sm" />
      <TagInput aria-label="默认尺寸" defaultValue={["前端", "React"]} />
      <TagInput aria-label="大尺寸" defaultValue={["前端", "React"]} size="lg" />
    </div>
  );
}
```

### 校验与上限
Source: apps/docs/src/content/tag-input/demos/03-validation.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { TagInput } from "@qingye/ui/components/tag-input";

export const meta = {
  title: "校验与上限",
  description: "validate 返回文案即拒绝该标签，输入保留以便修改；max 限制数量。",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Demo() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel>抄送成员</FieldLabel>
      <TagInput
        defaultValue={["lin.yue@qingyun.design"]}
        max={5}
        name="cc"
        placeholder="输入邮箱，以逗号分隔"
        validate={(tag) => (emailPattern.test(tag) ? null : `“${tag}”不是有效的邮箱地址`)}
      />
      <FieldDescription>最多 5 人。试试输入一个不完整的地址。</FieldDescription>
    </Field>
  );
}
```

### 只读与禁用
Source: apps/docs/src/content/tag-input/demos/04-states.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { TagInput } from "@qingye/ui/components/tag-input";
import { useState } from "react";

export const meta = { title: "只读与禁用" };

export default function Demo() {
  const [editable, setEditable] = useState(false);
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <Field>
        <FieldLabel>项目标签（只读）</FieldLabel>
        <TagInput defaultValue={["已归档", "2025 Q4", "品牌升级"]} readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>技能（禁用）</FieldLabel>
        <TagInput defaultValue={["Figma", "原型设计"]} />
      </Field>
      <div className="flex flex-col gap-3">
        <Fieldset disabled={!editable}>
          <FieldsetLegend variant="label">交接标签</FieldsetLegend>
          <TagInput aria-label="交接标签" defaultValue={["优先评审", "需要法务参与"]} />
        </Fieldset>
        <Button className="self-start" onClick={() => setEditable((current) => !current)} size="sm" variant="outline">
          {editable ? "锁定标签" : "编辑标签"}
        </Button>
      </div>
    </div>
  );
}
```

### 受控与表单提交
Source: apps/docs/src/content/tag-input/demos/05-controlled.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { TagInput } from "@qingye/ui/components/tag-input";
import { useState } from "react";

export const meta = {
  title: "受控与表单提交",
  description: "value 与 onValueChange 受控；每个标签提交一个同名隐藏字段。",
};

const suggestions = ["退款", "物流延迟", "发票", "账号安全"];

export default function Demo() {
  const [tags, setTags] = useState<string[]>(["物流延迟"]);
  const [submitted, setSubmitted] = useState<string[] | null>(null);

  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(new FormData(event.currentTarget).getAll("labels").map(String));
      }}
    >
      <Field>
        <FieldLabel>工单标签</FieldLabel>
        <TagInput name="labels" onValueChange={setTags} placeholder="添加标签" value={tags} />
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="me-0.5 text-muted-foreground text-xs">常用</span>
          {suggestions.map((item) => (
            <Button
              disabled={tags.includes(item)}
              key={item}
              onClick={() => setTags([...tags, item])}
              size="xs"
              type="button"
              variant="outline"
            >
              {item}
            </Button>
          ))}
        </div>
      </Field>
      <div className="flex items-center gap-3">
        <Button type="submit">保存工单</Button>
        {submitted ? (
          <p className="truncate text-muted-foreground text-sm">
            已提交 {submitted.length} 个：{submitted.join("、") || "无"}
          </p>
        ) : null}
      </div>
    </form>
  );
}
```

