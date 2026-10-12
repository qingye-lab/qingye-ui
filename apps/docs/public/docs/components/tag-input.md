# 标签集合 TagInput

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/tag-input
Source: packages/ui/src/components/tag-input.tsx
Source SHA-256: a0d2bdcd810595687a989f8f74992df54b1849c4f01cec019261f64821a831cb

确认字符串集合，保留尚未确认的编辑草稿。

## Decision
Enter 或添加按钮才确认；两端空白去除，精确字符串去重且区分大小写。空项、重复项及受控拒绝不会清空草稿。

## Notes
- FieldLabel 命名草稿入口，FieldDescription 可明示确认和去重规则。
- 提交表单时草稿里若有字，先按 Enter 的规则收下；收不下（重复、validate 拒绝、受控调用方不接受）就拦住提交并在字段旁说明。拦住的是 submit 事件本身，onSubmit 不会执行。
- 粘贴默认只编辑草稿；设了 splitOn 才拆分并批量收下。
- 添加/移除不是保存结果；库不发请求、不清失败草稿。
- 模拟 composition 已验证，真实中文输入法与辅助技术另验。

## Use and ownership
- 由用户逐项确认的短字符串集合
- Avoid: 只能从候选选择时用 Select/Combobox；单值用 Input
- Library: 非受控集合与草稿、焦点、约束提示
- Application: 受控集合/草稿、权限、刷新、失败与持久化

## Composition
- Field + FieldLabel + TagInput + FieldDescription / Error

## Responsive behavior
- 确认项允许换行，草稿取剩余宽度；一套几何，跟随密度轴，紧凑不缩小文字

## Customization
- root render/ref 与 inputProps 的真实输入出口分开

## Current exports
- TagInput: function; owner tag-input; PASS; props: TagInputProps
- TagInputChangeDetails: type; owner tag-input; PASS
- TagInputProps: type; owner tag-input; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### TagInput
- `addOnBlur?`: `boolean`. 草稿输入失焦时，把非空草稿当作一次 Enter 收下；焦点只是移到本组件的其他按钮时不触发。默认 false。
- `defaultDraft?`: `string`.
- `defaultValue?`: `readonly string[]`.
- `disabled?`: `boolean`.
- `draft?`: `string`.
- `form?`: `string`.
- `inputProps?`: `Omit<InputProps, "value" | "defaultValue" | "onValueChange" | "name" | "size" | "required">`. FieldLabel 注册真实草稿入口；额外属性、render 与 ref 也属于该入口。`required` 属于 TagInput 本身。
- `max?`: `number`. 标签数量上限，正整数。达到后草稿输入与添加按钮禁用并说明原因；已有集合超出时完整呈现，不截断。
- `name?`: `string`.
- `onDraftChange?`: `(draft: string) => void`.
- `onValueChange?`: `(value: string[], details: TagInputChangeDetails) => void`.
- `readOnly?`: `boolean`.
- `required?`: `boolean`. 至少要有一个已确认的标签。原生校验落在草稿输入上，但只在没有任何标签时才带 `required`： 有标签而草稿为空不算缺失。草稿里有字、尚无标签时，提交前先按 Enter 的规则收下（见 `validate`）。
- `splitOn?`: `string | RegExp`. 键入或粘贴到分隔符时拆成多个标签（字符串按字面，正则按匹配；不要带捕获组，捕获内容会被当作标签）。 默认不拆：逗号、空格在有些任务里就是标签的一部分。键入分隔符收下其前的部分，粘贴则收下全部。
- `validate?`: `(tag: string, tags: readonly string[]) => string | undefined`. 自定义拒绝：返回文案即拒绝该标签，文案就地显示并进入草稿输入的可访问描述；返回 undefined 即接受。 在空值、重复与数量上限判断之后才调用，第二个参数是当前已确认的标签。
- `value?`: `readonly string[]`.
- plus 278 inherited (@types/react 277, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, react-dom, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### TagInput
已确认项、草稿输入与非提交动作的公共组合。
- value / defaultValue: readonly string[]; default defaultValue: []. 已确认集合；外部事实不重新去重、裁切或清理。
- onValueChange: (value: string[], details: TagInputChangeDetails) => void. details 有 add/remove、tag、event、cancel() 与 isCanceled；受控添加接受前保留草稿。
- draft / defaultDraft / onDraftChange: string / string / (draft: string) => void; default defaultDraft: ''. 独立的待确认编辑文本；刷新集合不清草稿。
- name / form: string. 只提交确认项，使用同名表单键；草稿不提交为集合项。
- required: boolean; default false. 至少一个已确认标签。草稿输入只在没有任何标签时带原生 required，有标签而草稿为空不算缺失；aria-required 始终跟随。inputProps.required 被忽略，开发环境警告。
- splitOn: string | RegExp. 键入分隔符时，其前的部分被收下；粘贴时全部收下。被拒绝的片段留在草稿里并说明原因。默认不拆（逗号与空格有时就是标签的一部分）。正则不要带捕获组。
- max: number. 标签数量上限（正整数，否则抛 RangeError）。达到后草稿输入与添加按钮禁用，说明写入描述（“最多 N 个标签”）；已确认标签与同名表单项不受影响，已有集合超出上限时完整呈现。
- addOnBlur: boolean; default false. 草稿输入失焦时把非空草稿当作一次 Enter；焦点只是移到添加或移除按钮时不触发，不合规则的草稿保留并说明。
- validate: (tag: string, tags: readonly string[]) => string | undefined. 返回文案即拒绝：文案就地显示并进入草稿输入的可访问描述，草稿保留。在空值、重复与数量判断之后调用。
- inputProps: Input props (excluding collection-owned value/name/size/required). 真实草稿 Input 的 render/ref/ARIA/事件/样式；FieldLabel 注册此入口。
- disabled / readOnly: boolean; default false. 同时约束草稿与确认项操作；只读仍提交确认项，禁用不提交。
- render / ref / className / style / native props: useRender.ComponentProps<'div'>. 属于根容器；改渲染元素须保持结构与子控件。

## Keyboard
- Enter: 非组字时确认草稿，阻止表单提交；组字中的 Enter 不添加。
- Backspace / ArrowLeft（草稿起点，RTL 为 ArrowRight）: 空草稿的 Backspace 或起点的左箭头先聚焦最后一项，不立即删除。
- Delete / Backspace（移除按钮）: 移除已聚焦项，保留相邻焦点位置。
- ArrowLeft / ArrowRight（移除按钮）: 在确认项间移动，边界返回草稿；方向随实际排版，RTL 下对调。

## Source examples
### 集合与草稿
Source: apps/docs/src/content/tag-input/demos/01-collections.tsx
```tsx
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TagInput } from "@qingye_lab/ui/components/tag-input";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "集合与草稿", titleEn: "Collection and draft" } satisfies DemoMeta;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>分类</FieldLabel><TagInput name="tags" defaultValue={["React", "TypeScript"]} /><FieldDescription>Enter 确认，区分大小写去重</FieldDescription></Field>
    <Field invalid><FieldLabel>待核对</FieldLabel><TagInput defaultValue={["界面"]} defaultDraft="交互" /><FieldError>分类尚未核对。</FieldError></Field>
    <Field><FieldLabel>只读</FieldLabel><TagInput defaultValue={["React", "TypeScript"]} readOnly /></Field>
    <Field disabled><FieldLabel>禁用</FieldLabel><TagInput defaultValue={["React", "TypeScript"]} defaultDraft="草稿" /></Field>
  </FieldGroup>;
}
```

### 密度
Source: apps/docs/src/content/tag-input/demos/02-density.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TagInput } from "@qingye_lab/ui/components/tag-input";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "密度", titleEn: "Density" } satisfies DemoMeta;

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <TagInput defaultValue={["前端", "设计"]} />
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```

### 拆分、上限与校验
Source: apps/docs/src/content/tag-input/demos/03-rules.tsx
```tsx
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TagInput } from "@qingye_lab/ui/components/tag-input";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "拆分、上限与校验", titleEn: "Splitting, limit and validation" } satisfies DemoMeta;

const email = (tag: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag) ? undefined : "不是邮箱地址";

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>收件人</FieldLabel><TagInput name="to" required splitOn={/\s*[,，;；]\s*|\s+/} validate={email} addOnBlur /><FieldDescription>可一次粘贴多个地址</FieldDescription></Field>
    <Field><FieldLabel>分类</FieldLabel><TagInput max={3} defaultValue={["界面", "交互"]} /></Field>
  </FieldGroup>;
}
```
