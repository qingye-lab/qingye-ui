# TagInput

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/tag-input
Source: packages/ui/src/components/tag-input.tsx
Source SHA-256: a0d2bdcd810595687a989f8f74992df54b1849c4f01cec019261f64821a831cb

Confirm a string collection while keeping its unconfirmed draft.

## Decision
Only Enter or Add confirms a tag. Confirmation trims surrounding whitespace and deduplicates exact case-sensitive strings. Empty, duplicate, and rejected changes retain the draft.

## Notes
- FieldLabel names the draft; FieldDescription may state confirmation and duplicate rules.
- On form submit a non-empty draft is first taken in by the Enter rule; if it cannot be (duplicate, rejected by validate, not accepted by a controlled caller) the submit is stopped and the reason is shown beside the field. The submit event itself is stopped, so onSubmit does not run.
- Paste only edits the draft by default; with splitOn it splits and takes in every part.
- Adding/removing is not persistence. The library sends no requests and retains failed drafts.
- Synthetic composition is checked; real IME and assistive tech need separate verification.

## Use and ownership
- Short strings confirmed individually by the user.
- Avoid: Use Select/Combobox when values must come from candidates, and Input for a single value.
- Library: Uncontrolled collection/draft, focus, and constraint feedback.
- Application: Controlled collection/draft, permissions, refresh, failure, and persistence.

## Composition
- Field + FieldLabel + TagInput + FieldDescription / Error

## Responsive behavior
- Confirmed items wrap and drafts take remaining width; five matching control/text profiles.

## Customization
- Root render/refs stay separate from inputProps for the actual input.

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
Public composition of confirmed items, a draft input, and non-submitting actions.
- value / defaultValue: readonly string[]; default defaultValue: []. Confirmed collection. External facts are not re-deduplicated, truncated, or cleaned.
- onValueChange: (value: string[], details: TagInputChangeDetails) => void. Details includes add/remove, tag, event, cancel(), and isCanceled. Controlled additions retain the draft until accepted.
- draft / defaultDraft / onDraftChange: string / string / (draft: string) => void; default defaultDraft: ''. Independent unconfirmed text. Refreshing the collection retains the draft.
- name / form: string. Submit confirmed items as repeated form keys; the draft does not become a collection item.
- required: boolean; default false. At least one confirmed tag. The draft input carries native required only while there are no tags, so tags with an empty draft are not missing; aria-required always follows. inputProps.required is ignored with a development warning.
- splitOn: string | RegExp. Typing a separator takes in what precedes it; pasting takes in every part. Rejected parts stay in the draft with the reason. Off by default, since commas and spaces are sometimes part of a tag. Avoid capture groups in a RegExp.
- max: number. Maximum number of tags (positive integer, otherwise RangeError). At the limit the draft and Add are disabled and the reason is in the description; confirmed tags and their form fields are unaffected, and an existing larger collection is shown in full.
- addOnBlur: boolean; default false. Treat a non-empty draft as Enter when the draft input loses focus. Moving to Add or Remove does not trigger it; a draft that fails the rules is kept with the reason.
- validate: (tag: string, tags: readonly string[]) => string | undefined. Return a message to reject: it is shown in place, joins the draft input's accessible description, and the draft is kept. Called after the empty, duplicate and limit checks.
- inputProps: Input props (excluding collection-owned value/name/size/required). The real draft Input's render, refs, ARIA, events, and styling. FieldLabel registers this input.
- disabled / readOnly: boolean; default false. Constrain the draft and item actions together. Read-only confirmed items submit; disabled items do not.
- render / ref / className / style / native props: useRender.ComponentProps<'div'>. Applied to the root container. Render must retain its structure and children.

## Keyboard
- Enter: Confirm the draft outside composition without submitting a form. Composition Enter does not add.
- Backspace / ArrowLeft (start of draft; ArrowRight under RTL): Backspace on an empty draft or Left at its start focuses the last item without deleting it.
- Delete / Backspace (remove button): Remove the focused item and preserve an adjacent focus position.
- ArrowLeft / ArrowRight (remove button): Move among confirmed items; boundaries return to the draft. The direction follows the rendered layout and swaps under RTL.

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
