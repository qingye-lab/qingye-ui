# 对话输入框 Composer

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/composer
Source: packages/ui/src/components/composer.tsx
Source SHA-256: cf23ffe28f63bf58767ea6be5ea90c64e7ddde21ecbc68dab0655290dc9ab726

多行输入，支持 @ 提及、/ 命令与原子令牌，值是文字与令牌片段的数组。

## Decision
编辑区是 contenteditable，因为令牌必须是行内原子对象（整体删除、光标进不去、读屏读名字），原生文本框做不到。值是片段数组而不是字符串：令牌带稳定 id，应用不必从文字里反解。候选浮层按 combobox 模式接线，但编辑区的角色是 textbox（多行的 combobox 不存在）。消息列表与气泡不在库内。

## Notes
- 粘贴、拖放一律只收纯文字；复制与剪切输出纯文字，令牌写作“触发字符 + label”。
- composerValueToText 默认把令牌写作“触发字符 + label”；composerValueFromText 可传入已知令牌，按字面匹配还原，且只在词的开头处还原（“a@Ann.com”“@Anna”不会变成令牌）。纯文字会丢掉令牌 id，要无损保存就存片段数组本身。
- 没有 name 与表单提交，也未接入 Field：值是片段数组，没有对应的表单字段形态，由应用在 onSubmit 里取值并发送（同类对话输入的通行做法）。
- jsdom 无法验证真实输入法、各浏览器 contenteditable 的光标与 beforeinput 差异、浮层碰撞翻转与 Range 坐标，需在真实浏览器中另验。

## Use and ownership
- 对话式输入：多行文字夹带提及与命令
- Avoid: 单行短文本用 Input；纯多行文字用 Textarea；只能从候选选择用 Combobox
- Library: 非受控值、撤销栈、候选高亮与异步结果的新旧判断
- Application: 受控值、候选数据来源、提交后的清空与发送、消息列表

## Composition
- Composer + ComposerInput + ComposerToolbar + ComposerSubmit

## Responsive behavior
- 一套几何，起始高与上限按行数换算，跟随密度轴

## Customization
- root render/ref；ComposerInput 的 className 作用于编辑区

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
根：填值边界与状态，持有值、提交与禁用/只读。
- value / defaultValue: readonly ComposerSegment[]; default defaultValue: []. 受控/非受控值；文字片段 { type: 'text', text } 与令牌片段 { type: 'token', trigger, id, label }。相邻文字片段会被合并。
- onValueChange: (value: ComposerSegment[], details: ComposerChangeDetails) => void. details.reason 为 input/paste/cut/newline/token/action/delete-token/undo/redo/clear；cancel() 拒绝这次改动，编辑区随即恢复。
- onSubmit: (value: ComposerSegment[], details: { event, clear }) => void. Enter（或 ComposerSubmit）触发；没有令牌且文字全是空白时不调用。clear() 经 onValueChange 把值清空。
- submitOn: 'enter' | 'mod-enter'; default 'enter'. enter：Enter 提交，Shift+Enter 换行；mod-enter：Ctrl/⌘+Enter 提交，Enter 换行。
- disabled / readOnly: boolean; default false. 都不可编辑、不提交、不开候选；只读可聚焦与复制。

### ComposerInput
编辑区与候选浮层。
- aria-label / aria-labelledby: string. 必填其一，否则抛错。
- placeholder: string. 空时显示，同时写入 aria-placeholder。
- triggers: readonly ComposerTrigger[]. 触发项：char、getItems(query, { signal })、select（token 或 action）、onSelect、startOnly、label、emptyText。getItems 可返回数组或 Promise；加载中与无结果与 Combobox 同文案，迟到的结果被丢弃。候选项 ComposerItem 为 { id, label, group?, description?, icon?, disabled?, select? }：id 是令牌身份，label 是显示名，令牌读作“触发字符 + label”；同名 group 归为一组，按首次出现顺序排列；select 覆盖触发项的 select（token 插入令牌，action 删掉触发文字、只回调 onSelect）。
- minRows / maxRows: number; default 1 / 8. 起始行数与增长上限。超过上限在内部滚动，且不超过视口高度的一半。

### ComposerToolbar / ComposerSubmit
工具条放 xs 按钮；ComposerSubmit 在内容为空、禁用或只读时不可用。
- ComposerSubmit aria-label: string; default messages.composerSubmit. 默认“发送”。

## Keyboard
- Enter / Shift+Enter: 按 submitOn 提交或换行；组字中（isComposing 或 keyCode 229）不处理。
- ArrowDown / ArrowUp: 候选打开时移动高亮，循环并跳过禁用项。
- Enter / Tab: 候选打开且有高亮时选中，不提交。
- Escape: 关闭候选，保留已输入的文字。
- Backspace / Delete: 光标紧邻令牌时整体删除。
- Ctrl/⌘+Z、Ctrl/⌘+Shift+Z: 撤销与重做，用组件自己的快照栈。

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
