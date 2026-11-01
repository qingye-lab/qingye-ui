# CodeBlock

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/code-block
Source: packages/ui/src/components/code-block.tsx
Source SHA-256: 1217799cec61621af3b4b3e2351b19de2c3197655267d7fc87ada9b27b9890ae

Literal text with an optional title bar and actual copy results.

## Decision
pre/code retain whitespace, characters and full width; the library does no syntax highlighting itself: pre-highlighted markup comes from the caller through children, while code is still what is copied. The code surface is delimited by one ink container line and a ground only half a wash step deeper than what it sits on. useCopyToClipboard reports success only after writing; failure keeps manual-copy content.

## Notes
- A language label is not parsing; no extra dependencies, fetching or false-success clipboard fallback.
- When a SegmentedControl in the title bar switches the content, change code and children together so what is copied is what is shown.
- When the code does not overflow, the code surface is not a tab stop; when it overflows it is a named region, and Tab stops on it so the arrow keys can scroll.

## Use and ownership
- Read and copy code or preformatted text unchanged.
- Avoid: Use Textarea for editable text; a language label does not imply syntax highlighting.
- Library: Text capacity and actual clipboard success/failure feedback.
- Application: Original text, language names, and actions following a copy result.

## Composition
- CodeBlock: Code presentation with an optional copy action.

## Responsive behavior
- Complete code scrolls horizontally by default without truncation or character changes; wrap switches to wrapping.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- CodeBlock: function; owner code-block; PASS; props: CodeBlockProps
- CodeBlockProps: type; owner code-block; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### CodeBlock
- `children?`: `React.ReactNode`. 已高亮的标记：给出时放进 code 元素，代替纯文本 code 的显示。
- `code`: `string`. 被复制的文本；渲染内容由 children 替换时，复制的仍是它。
- `copyable?`: `boolean`.
- `language?`: `string`.
- `maxLines?`: `number`. 代码面最多显示的行数，超出后代码面纵向滚动（可聚焦、有名称）。折行后按视觉行计。 选行数而不是 CSS 长度：读代码的人数的是行，行高由系统的「材」决定（正文一行 = 1 材）， 给长度的话字号或密度一变，能看到的行数就悄悄变了。
- `onCopyError?`: `(error: unknown) => void`.
- `onCopySuccess?`: `() => void`.
- `title?`: `React.ReactNode`. 标题栏的起始内容。字符串或数字是文件名一类的标签；其他节点（如 SegmentedControl）原样放入。有 title 才有标题栏。
- `wrap?`: `boolean`. 长行折行，而不是横向滚动。
- plus 279 inherited (@types/react 278, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### CodeBlock
Code presentation with an optional copy action.
- code: string. Required literal text, rendered and copied without trimming or formatting.
- language: string. Optional identifying label that never changes the text.
- title: ReactNode. Content at the start of the title bar; the bar exists only when given (2 modules tall, with the copy button moved to its end). A string or number is shown in mono support text aligned with the code's start edge; any other node, such as a SegmentedControl, is placed as given, and tracks inside the bar are transparent so they show the code surface.
- children: ReactNode. Pre-highlighted markup placed inside the code element in place of the plain text; code remains what is copied, and the two should carry the same text.
- wrap: boolean; default false. Wrap long lines at any position instead of scrolling horizontally.
- maxLines: number. The most lines the code surface shows (a positive integer); more scroll vertically. Wrapped lines count as visual lines. Lines rather than a CSS length because readers count lines, and a line is one module of the system (one body line = 1 module), so a change of type size or density does not silently change the count. While scrolling the code surface is focusable and named (the title, then the language, then "Code"), and the copy button does not scroll with the code.
- copyable: boolean; default true. Whether to provide the copy button and actual feedback.
- onCopySuccess / onCopyError: () => void / (error: unknown) => void. Callbacks after actual write success or failure; the native onCopy event is forwarded independently.
- render / ref / ARIA / className / style / native props: useRender.ComponentProps<div>. Props target the outer div (the native title attribute is replaced by the title slot); code is the single source of copied text.

## Keyboard
- Tab / Enter / Space: Overflowing code is focusable and scrolls with native arrow keys; Button activation.

## Source examples
### 原样文本与复制
Source: apps/docs/src/content/code-block/demos/01-text.tsx
```tsx
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "原样文本与复制", titleEn: "Literal text and copy" } satisfies DemoMeta;
export default function Demo() {
  return <CodeBlock language="JavaScript" code={'const values = [0, null];\n\nfunction getValue(index) {\n  return values[index];\n}\n'} />;
}
```

### 文件名标题栏
Source: apps/docs/src/content/code-block/demos/02-title.tsx
```tsx
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "文件名标题栏", titleEn: "File-name title bar" } satisfies DemoMeta;
export default function Demo() {
  return <CodeBlock title="values.js" code={'const values = [0, null];\n\nfunction getValue(index) {\n  return values[index];\n}\n'} />;
}
```

### 标题栏里的切换
Source: apps/docs/src/content/code-block/demos/03-switch.tsx
```tsx
import { useState } from "react";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "标题栏里的切换", titleEn: "Switch in the title bar" } satisfies DemoMeta;
const commands = { pnpm: "pnpm add @qingye_lab/ui", npm: "npm install @qingye_lab/ui", yarn: "yarn add @qingye_lab/ui" } as const;
type Manager = keyof typeof commands;
export default function Demo() {
  const [manager, setManager] = useState<Manager>("pnpm");
  return <CodeBlock
    title={<SegmentedControl size="sm" aria-label="包管理器" value={manager} onValueChange={value => setManager(value as Manager)}>
      {(Object.keys(commands) as Manager[]).map(name => <SegmentedControlItem key={name} value={name}>{name}</SegmentedControlItem>)}
    </SegmentedControl>}
    code={commands[manager]}
  />;
}
```

### 已高亮的内容
Source: apps/docs/src/content/code-block/demos/04-highlighted.tsx
```tsx
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "已高亮的内容", titleEn: "Highlighted content" } satisfies DemoMeta;
const code = 'const values = [0, null];\n\n// 取第 index 项\nfunction getValue(index) {\n  return values[index];\n}\n';
export default function Demo() {
  return <CodeBlock title="values.js" code={code} wrap>
    <span className="text-info-foreground">const</span> values = [<span className="text-warning-foreground">0</span>, <span className="text-warning-foreground">null</span>];{"\n\n"}
    <span className="text-muted-foreground">{"// 取第 index 项"}</span>{"\n"}
    <span className="text-info-foreground">function</span> <span className="text-success-foreground">getValue</span>(index) {"{"}{"\n  "}
    <span className="text-info-foreground">return</span> values[index];{"\n"}
    {"}"}{"\n"}
  </CodeBlock>;
}
```

### 限定行数
Source: apps/docs/src/content/code-block/demos/05-max-lines.tsx
```tsx
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "限定行数", titleEn: "Limited lines" } satisfies DemoMeta;
const code = Array.from({ length: 30 }, (_, i) => `const value${i + 1} = ${i + 1};`).join("\n") + "\n";
export default function Demo() {
  return <CodeBlock title="values-long.js" maxLines={8} code={code} />;
}
```
