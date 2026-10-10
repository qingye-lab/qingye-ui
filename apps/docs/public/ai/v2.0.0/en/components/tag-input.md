# TagInput

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/tag-input
Source: packages/ui/src/components/tag-input.tsx
Source SHA-256: 7a6fdadbf8dd3ccdbe03222ab79607d43201aef7ff7b0d65cc60c1c3d3ed5381

Confirm a string collection while keeping its unconfirmed draft.

## Decision
Only Enter or Add confirms a tag. Confirmation trims surrounding whitespace and deduplicates exact case-sensitive strings. Empty, duplicate, and rejected changes retain the draft.

## Notes
- FieldLabel names the draft; FieldDescription may state confirmation and duplicate rules.
- Paste edits the draft without splitting or bulk confirmation.
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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### TagInput
Public composition of confirmed items, a draft input, and non-submitting actions.
- value / defaultValue: readonly string[]; default defaultValue: []. Confirmed collection. External facts are not re-deduplicated, truncated, or cleaned.
- onValueChange: (value: string[], details: TagInputChangeDetails) => void. Details includes add/remove, tag, event, cancel(), and isCanceled. Controlled additions retain the draft until accepted.
- draft / defaultDraft / onDraftChange: string / string / (draft: string) => void; default defaultDraft: ''. Independent unconfirmed text. Refreshing the collection retains the draft.
- name / form: string. Submit confirmed items as repeated form keys; the draft does not become a collection item.
- inputProps: Input props (excluding collection-owned value/name/size). The real draft Input's render, refs, ARIA, events, and styling. FieldLabel registers this input.
- disabled / readOnly: boolean; default false. Constrain the draft and item actions together. Read-only confirmed items submit; disabled items do not.
- render / ref / className / style / native props: useRender.ComponentProps<'div'>. Applied to the root container. Render must retain its structure and children.

## Keyboard
- Enter: Confirm the draft outside composition without submitting a form. Composition Enter does not add.
- Backspace / ArrowLeft (start of draft): Backspace on an empty draft or Left at its start focuses the last item without deleting it.
- Delete / Backspace (remove button): Remove the focused item and preserve an adjacent focus position.
- ArrowLeft / ArrowRight (remove button): Move among confirmed items; boundaries return to the draft.

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
