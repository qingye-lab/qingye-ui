# 标签集合 TagInput

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/tag-input
Source: packages/ui/src/components/tag-input.tsx
Source SHA-256: 5f00a0f9d344ee255eb9e0998fd3f2498a37a213aff73b04cd355d1fd6bf6e68

确认字符串集合，保留尚未确认的编辑草稿。

## Decision
Enter 或添加按钮才确认；两端空白去除，精确字符串去重且区分大小写。空项、重复项及受控拒绝不会清空草稿。

## Notes
- FieldLabel 命名草稿入口，FieldDescription 可明示确认和去重规则。
- 粘贴只编辑草稿，不自动拆分或批量确认。
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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### TagInput
已确认项、草稿输入与非提交动作的公共组合。
- value / defaultValue: readonly string[]; default defaultValue: []. 已确认集合；外部事实不重新去重、裁切或清理。
- onValueChange: (value: string[], details: TagInputChangeDetails) => void. details 有 add/remove、tag、event、cancel() 与 isCanceled；受控添加接受前保留草稿。
- draft / defaultDraft / onDraftChange: string / string / (draft: string) => void; default defaultDraft: ''. 独立的待确认编辑文本；刷新集合不清草稿。
- name / form: string. 只提交确认项，使用同名表单键；草稿不提交为集合项。
- inputProps: Input props (excluding collection-owned value/name/size). 真实草稿 Input 的 render/ref/ARIA/事件/样式；FieldLabel 注册此入口。
- disabled / readOnly: boolean; default false. 同时约束草稿与确认项操作；只读仍提交确认项，禁用不提交。
- render / ref / className / style / native props: useRender.ComponentProps<'div'>. 属于根容器；改渲染元素须保持结构与子控件。

## Keyboard
- Enter: 非组字时确认草稿，阻止表单提交；组字中的 Enter 不添加。
- Backspace / ArrowLeft（草稿起点）: 空草稿的 Backspace 或起点的左箭头先聚焦最后一项，不立即删除。
- Delete / Backspace（移除按钮）: 移除已聚焦项，保留相邻焦点位置。
- ArrowLeft / ArrowRight（移除按钮）: 在确认项间移动，边界返回草稿。

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
