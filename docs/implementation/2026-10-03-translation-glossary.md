# Docs translation glossary · 2026-10-03

Use these forms for English component reference text. English leads; retain the Chinese method name in full-width parentheses when naming a design method. The runtime outlets in `apps/docs/src/lib/design-guidance.ts` use the same labels.

| Settled method name | Meaning for a design engineer |
| --- | --- |
| Name matches substance （名实相符） | Labels and states describe the actual object, action, and outcome. A sent request is not a confirmed save. |
| Complementary roles and safeguards （相成相制） | Content, actions, explanations, and safeguards share responsibility for the task; protection receives the emphasis the situation needs. |
| Space supports the task （布白有用） | Spacing expresses relationships, preserves working capacity, and leaves room to compare and decide. |
| Adapt to context （随境取度） | Emphasis, duration, and interruption follow the task and its consequences. |
| Purposeful progressive disclosure （展开有据） | Reveal detail for a reason, with direct access and a reliable way back. |
| Continuity through change （进退相承） | Preserve the same object and its work across waiting, failure, uncertainty, cancellation, and recovery. |

## API vocabulary

The middle column fixes the term, not a sentence template. Explain the component's actual behavior and limits; do not infer behavior merely from a prop name. In particular, distinguish a requested change from a confirmed business outcome.

| Identifier or source term | Fixed English wording | Usage boundary |
| --- | --- | --- |
| `variant` / 变体 | visual variant | Describe emphasis or appearance; a variant does not grant permission or define business risk. |
| `size` / 尺寸 | control size; size for a non-control | Distinguish occupied dimensions from the touch target and available inner space. |
| `density` / 密度 | density; compact density | Describe spacing or information density, separately from size and brand. |
| `render` / 渲染替换 | rendered element; render prop | Say which element is replaced and which props, handlers, or ref must be preserved. Do not call it an `as` prop. |
| `loading` / 加载中 | loading; pending while an action waits | Name what is waiting. Loading does not mean saved, successful, or cancelled. |
| `disabled` / 禁用 | disabled | State which interaction is blocked. Distinguish it from read-only. |
| `placeholder` / 占位文字 | placeholder text | It is a hint for empty input, not the field's accessible label or a default value. |
| `value` / 当前值 | controlled value | The host owns the value; identify its shape for this component. |
| `defaultValue` / 默认值 | initial uncontrolled value | It initializes state; it is not a controlled value or a later reset command. |
| `onValueChange` / 值变化回调 | value change callback | Identify the next value and any details actually supplied; do not describe it as a successful save. |
| `aria-*` / 无障碍属性 | ARIA attributes; accessible name, description, or state as applicable | Keep each attribute name intact. State its actual accessible purpose. |
| popup / 浮层 | popup | Use dialog, menu, popover, or tooltip when that specific semantic role is intended; do not call every popup a modal. |
| trigger / 触发器 | trigger | Identify the control that opens, closes, or selects something and the required relationship. |
| portal / 传送门 | portal; portal container | Describe where content mounts. A portal is not itself a popup or a positioning policy. |
| `open` / 打开状态 | controlled open state | The host owns whether the content is open. |
| `defaultOpen` / 默认打开 | initial uncontrolled open state | Initializes open state; later updates do not control it. |
| `onOpenChange` / 打开状态变化 | open state change callback | Identify the requested next state and any supported reason details. Closing UI does not confirm background cancellation. |
| `multiple` / 多选 | multiple selection | Identify whether the value becomes an array and any actual selection limit. |
| `orientation` / 方向 | orientation; horizontal or vertical | Distinguish layout and keyboard navigation when both are affected. |
| `inset` / 内缩 | inset; inset alignment | Describe what is indented or aligned; do not confuse it with popup offset. |
| `side` / 侧边 | placement side | Identify the side relative to the trigger or anchor. |
| `align` / 对齐 | alignment | Identify what aligns with what; preserve code values such as `start`, `center`, and `end`. |
| `offset`, `sideOffset`, `alignOffset` / 偏移 | offset; side offset; alignment offset | Identify the axis, reference, and units actually accepted. |
| `name` / 表单名称 | form field name | Identify the submitted field; it does not supply an accessible label. |
| `readOnly` / 只读 | read-only | The value cannot be edited; do not imply disabled focus, copying, or submission. |
| `required` / 必填 | required | State the actual validation or semantic effect; do not promise business validation the library does not perform. |
| `children` / 子内容 | children; content | Identify the supported composition or placement. |
| `className` / 样式类 | CSS class; additional CSS classes | Identify the styled part; shared visual changes belong in the project theme. |
| `ref` / 引用 | ref; element ref | Identify the element or handle exposed by this component. |
| 受控 / 非受控 | controlled / uncontrolled | Controlled state belongs to the host; uncontrolled state is initialized and then owned by the component. |
| 透传 | forwarded; forwards native props | Name the destination element and any exceptions. |
| 焦点 / 键盘焦点 | focus / keyboard focus | State where focus moves or returns; distinguish focus from selection. |
| 空值 / 未知 / 零 | empty / unknown / zero | Preserve these distinct states instead of treating all three as no data. |
| 触摸目标 | touch target | Describe the hit area separately from visual control size. |

An AST inventory of `api[].props[].name` on 2026-10-03, splitting grouped names such as `value / defaultValue`, found these identifiers in at least 10 prop entries: `disabled` (39), `size` (36), `value` (33), `variant` (29), `defaultValue` (21), `onValueChange` (21), `open` (18), `defaultOpen` (18), `onOpenChange` (18), `render` (18), `orientation` (12), `name` (12), `align` (12), `readOnly` (11), `required` (10). All are covered above; counts describe this working tree, not a permanent coverage guarantee.

## What stays untranslated

Keep component and prop names, exported names, CSS class names, CSS custom properties, file paths, package/import paths, code identifiers, enum/string-literal values, and keyboard key identifiers unchanged. Keep code spans in backticks. Translate the surrounding explanation, not the API surface. Do not rename `onValueChange` to an English synonym or turn `start` into a different code value.

## Tone and fallback contract

Say what a reader would get wrong about **this component**. Prefer “Set this when …” or “Use … only when …” where a condition matters; use a direct statement where it explains a concrete effect. Reject filler such as “This prop allows you to …”, marketing adjectives, and sentences that merely rename the prop. For example, prefer “Use `loading` while the save request is pending; keep the accessible action name.” over “The loading prop enables a beautiful loading state.”

Do not invent unsupported behavior. Retain technical qualifications and recovery implications from the Chinese source. A short explanation of an actual effect is better than a generic warning copied across components.

Translate into the parallel English fields, leaving Chinese source fields intact. `notesEn[i]` belongs to `notes[i]`: never filter, reorder, or remove entries to close a translation gap. Keep a blank string for an untranslated interior slot; a shorter array leaves the remaining tail untranslated. Missing or whitespace-only English fields fall back to Chinese at that field or index. Do not write explicit `undefined` optional properties. Extra `notesEn` entries beyond `notes.length` do not render.
