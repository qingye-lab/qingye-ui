# Composer

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/composer
Source: packages/ui/src/components/composer.tsx
Source SHA-256: 4acac907848fbc6389ee0d83b6f3e65e5f5daab6e8e704a343432f76724fee2b

Multi-line input with @ mentions, / commands and atomic tokens; its value is an array of text and token segments.

## Decision
The editor is contenteditable because tokens must be inline atoms (deleted whole, unreachable by the caret, read by name), which a native text box cannot do. The value is an array of segments, not a string, so a token keeps a stable id and apps need not parse text back. The candidate popup follows the combobox pattern, but the editor's role is textbox since no multi-line combobox exists. Message lists and bubbles are not in the library.

## Notes
- Paste and drop accept plain text only; copy and cut emit plain text with a token written as trigger + label.
- composerValueToText writes a token as trigger + label by default; composerValueFromText accepts known tokens and restores them by literal match, only at the start of a word ("a@Ann.com" and "@Anna" stay text). Plain text drops token ids, so store the segment array itself for a lossless round trip.
- There is no name or form submission and no Field integration: the value is an array of segments with no form-field form, so the app reads and sends it in onSubmit, as conversational inputs commonly do.
- jsdom cannot verify a real IME, per-browser contenteditable caret and beforeinput behavior, popup collision flipping or Range geometry; verify these in real browsers.

## Use and ownership
- Conversational input: multi-line text with mentions and commands.
- Avoid: Use Input for short single-line text, Textarea for plain multi-line text, and Combobox when values must come from candidates.
- Library: Uncontrolled value, undo stack, candidate highlight and stale-result discarding.
- Application: Controlled value, candidate sources, clearing and sending after submit, the message list.

## Composition
- Composer + ComposerInput + ComposerToolbar + ComposerSubmit

## Responsive behavior
- One geometry; starting height and cap derive from rows and follow the density axis.

## Customization
- Root render/ref; ComposerInput className applies to the editor.

## Current exports
- Composer: function; owner composer; PASS; props: ComposerProps
- ComposerChangeDetails: type; owner composer; PASS
- ComposerChangeReason: type; owner composer; PASS
- ComposerInput: function; owner composer; PASS; props: ComposerInputProps
- ComposerInputProps: type; owner composer; PASS
- ComposerItem: type; owner composer; PASS
- ComposerProps: type; owner composer; PASS
- ComposerSegment: type; owner external; PASS
- ComposerSubmit: function; owner composer; PASS; props: ComposerSubmitProps
- ComposerSubmitDetails: type; owner composer; PASS
- ComposerSubmitProps: type; owner composer; PASS
- ComposerTextSegment: type; owner external; PASS
- ComposerTokenSegment: type; owner external; PASS
- ComposerToolbar: function; owner composer; PASS; props: ComposerToolbarProps
- ComposerToolbarProps: type; owner composer; PASS
- ComposerTrigger: type; owner composer; PASS
- ComposerValue: type; owner external; PASS
- composerValueFromText: function; owner external; PASS; props: string
- composerValueLength: function; owner external; PASS; props: ComposerValue
- composerValueToText: function; owner external; PASS; props: ComposerValue
- emptyComposerValue: const; owner external; PASS
- isComposerValueEmpty: function; owner external; PASS; props: ComposerValue
- normalizeComposerValue: function; owner external; PASS; props: ComposerValue
- parseComposerValue: function; owner external; PASS; props: string | ComposerValue | null | undefined

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Composer
- `defaultValue?`: `ComposerValue | undefined`.
- `disabled?`: `boolean`.
- `onSubmit?`: `((value: ComposerSegment[], details: ComposerSubmitDetails) => void) | undefined`. 提交（Enter 或 ComposerSubmit）。内容为空（没有令牌且文字全是空白）时不会调用。
- `onValueChange?`: `((value: ComposerSegment[], details: ComposerChangeDetails) => void) | undefined`.
- `readOnly?`: `boolean`.
- `submitOn?`: `"enter" | "mod-enter"`. enter：Enter 提交、Shift+Enter 换行；mod-enter：Ctrl/⌘+Enter 提交、Enter 换行。
- `value?`: `ComposerValue | undefined`. 受控值。片段数组：文字片段与令牌片段。
- plus 278 inherited (@types/react 277, @base-ui/react 1); not expanded, see the installed declarations

### ComposerInput
- `aria-label`: `string`.
- `aria-labelledby?`: `string | undefined`.
- `maxRows?`: `number | undefined`. 增长上限，行数（默认 8）。超过后在输入区内滚动，不再撑高。 上限同时不超过视口高度的一半（50dvh）：输入区不能把它所回应的内容挤出视野。 两个数都是预设（见组件内注释），不是由理念推出的。
- `minRows?`: `number | undefined`. 起始行数（默认 1）。几何读填值控件角色层：一行 = 一个填值控件高， 之后每多一行加一个行高（--qy-fill-text-leading），与 Textarea 的 rows 同一换算。
- `placeholder?`: `string | undefined`.
- `triggers?`: `readonly ComposerTrigger[] | undefined`.
- plus 274 inherited (@types/react 274); not expanded, see the installed declarations

### ComposerSubmit
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### ComposerToolbar
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context ComposerContext: without a provider throws; provided by Composer

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Composer
Root: fill-control frame and state; owns value, submit and disabled/readOnly.
- value / defaultValue: readonly ComposerSegment[]; default defaultValue: []. Controlled/uncontrolled value: text segments and token segments. Adjacent text segments are merged.
- onValueChange: (value: ComposerSegment[], details: ComposerChangeDetails) => void. details.reason is input/paste/cut/newline/token/action/delete-token/undo/redo/clear. cancel() rejects the change and the editor reverts.
- onSubmit: (value: ComposerSegment[], details: { event, clear }) => void. Fired by Enter or ComposerSubmit; not called when there is no token and the text is whitespace only. clear() empties the value through onValueChange.
- submitOn: 'enter' | 'mod-enter'; default 'enter'. enter: Enter submits and Shift+Enter breaks the line. mod-enter: Ctrl/Cmd+Enter submits and Enter breaks the line.
- disabled / readOnly: boolean; default false. Neither edits, submits nor opens candidates; read-only stays focusable and copyable.

### ComposerInput
The editor and candidate popup.
- aria-label / aria-labelledby: string. One is required, otherwise it throws.
- placeholder: string. Shown when empty and exposed as aria-placeholder.
- triggers: readonly ComposerTrigger[]. Triggers: char, getItems(query, { signal }), select (token or action), onSelect, startOnly, label, emptyText. getItems may return an array or a Promise; loading and no-result copy match Combobox and late results are discarded. A ComposerItem is { id, label, group?, description?, icon?, disabled?, select? }: id is the token identity and label the display name, so a token reads as trigger + label; items with the same group are grouped in order of first appearance; select overrides the trigger's select (token inserts a token, action removes the trigger text and only calls onSelect).
- minRows / maxRows: number; default 1 / 8. Starting rows and growth cap. Beyond the cap the editor scrolls, and never exceeds half the viewport height.

### ComposerToolbar / ComposerSubmit
The toolbar holds xs buttons; ComposerSubmit is unavailable when empty, disabled or read-only.
- ComposerSubmit aria-label: string; default messages.composerSubmit. Defaults to “Send”.

## Keyboard
- Enter / Shift+Enter: Submit or break the line per submitOn; ignored during composition (isComposing or keyCode 229).
- ArrowDown / ArrowUp: Move the highlight while candidates are open, wrapping and skipping disabled items.
- Enter / Tab: Select the highlight while candidates are open, without submitting.
- Escape: Close the candidates and keep the typed text.
- Backspace / Delete: Delete an adjacent token as a whole.
- Ctrl/⌘+Z、Ctrl/⌘+Shift+Z: Undo and redo using the component's own snapshot stack.

## Source examples
### 输入与提交
Source: apps/docs/src/content/composer/demos/01-basic.tsx
```tsx
import { useState } from "react";
import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, composerValueToText, type ComposerSegment } from "@qingye_lab/ui/components/composer";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "输入与提交", titleEn: "Input and submit" } satisfies DemoMeta;

export default function Demo() {
  const [sent, setSent] = useState<string[]>([]);
  return <div className="flex w-full flex-col gap-(--qy-space-3)">
    <Composer onSubmit={(value: ComposerSegment[], { clear }) => { setSent((list) => [...list, composerValueToText(value)]); clear(); }}>
      <ComposerInput aria-label="消息" placeholder="Enter 发送，Shift+Enter 换行" />
      <ComposerToolbar><ComposerSubmit /></ComposerToolbar>
    </Composer>
    {sent.length > 0 && <ul className="m-0 flex list-none flex-col gap-(--qy-space-1) p-0 whitespace-pre-wrap">{sent.map((text, index) => <li key={index}>{text}</li>)}</ul>}
  </div>;
}
```

### 提及与命令
Source: apps/docs/src/content/composer/demos/02-triggers.tsx
```tsx
import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, type ComposerItem, type ComposerTrigger } from "@qingye_lab/ui/components/composer";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "提及与命令", titleEn: "Mentions and commands" } satisfies DemoMeta;

const people: ComposerItem[] = [
  { id: "u1", label: "林青", group: "成员", description: "设计" },
  { id: "u2", label: "苏野", group: "成员", description: "前端" },
  { id: "t1", label: "设计组", group: "团队" },
];

const mention: ComposerTrigger = {
  char: "@",
  getItems: (query) => people.filter((item) => item.label.includes(query)),
};

const commands: ComposerItem[] = [
  { id: "clear", label: "清空", description: "/clear" },
  { id: "topic", label: "话题", description: "/topic", select: "token" },
];

const command: ComposerTrigger = {
  char: "/",
  startOnly: true,
  select: "action",
  getItems: (query) => commands.filter((item) => item.label.includes(query) || item.description?.includes(query)),
};

export default function Demo() {
  return <Composer className="w-full">
    <ComposerInput aria-label="消息" placeholder="@ 提及，/ 命令" triggers={[mention, command]} />
    <ComposerToolbar><ComposerSubmit /></ComposerToolbar>
  </Composer>;
}
```

### 异步候选
Source: apps/docs/src/content/composer/demos/03-async.tsx
```tsx
import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, type ComposerTrigger } from "@qingye_lab/ui/components/composer";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "异步候选", titleEn: "Async candidates" } satisfies DemoMeta;

const names = ["林青", "林野", "苏青", "苏野", "顾远", "周衡"];

const mention: ComposerTrigger = {
  char: "@",
  getItems: (query, { signal }) => new Promise((resolve) => {
    const timer = setTimeout(() => resolve(names.filter((name) => name.includes(query)).map((name) => ({ id: name, label: name }))), 600);
    signal.addEventListener("abort", () => clearTimeout(timer));
  }),
};

export default function Demo() {
  return <Composer className="w-full">
    <ComposerInput aria-label="消息" placeholder="@ 后稍候显示结果" triggers={[mention]} />
    <ComposerToolbar><ComposerSubmit /></ComposerToolbar>
  </Composer>;
}
```

### 状态与行数
Source: apps/docs/src/content/composer/demos/04-states.tsx
```tsx
import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, type ComposerSegment } from "@qingye_lab/ui/components/composer";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "状态与行数", titleEn: "States and rows" } satisfies DemoMeta;

const filled: ComposerSegment[] = [
  { type: "text", text: "请 " },
  { type: "token", trigger: "@", id: "u1", label: "林青" },
  { type: "text", text: " 看一下这份稿子。" },
];

export default function Demo() {
  return <div className="grid w-full grid-cols-1 gap-(--qy-space-4) sm:grid-cols-2">
    <Composer defaultValue={filled} readOnly><ComposerInput aria-label="只读" /></Composer>
    <Composer defaultValue={filled} disabled><ComposerInput aria-label="禁用" /><ComposerToolbar><ComposerSubmit /></ComposerToolbar></Composer>
    <Composer><ComposerInput aria-label="三行起始，最多五行" placeholder="三行起始，最多五行" minRows={3} maxRows={5} /></Composer>
    <Composer submitOn="mod-enter"><ComposerInput aria-label="Ctrl/⌘+Enter 发送" placeholder="Ctrl/⌘+Enter 发送" /><ComposerToolbar><ComposerSubmit /></ComposerToolbar></Composer>
  </div>;
}
```
