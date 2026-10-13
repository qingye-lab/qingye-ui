# 代码 CodeBlock

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/code-block
Source: packages/ui/src/components/code-block.tsx
Source SHA-256: e0e34388389dc6b87dd13b6e8f94a92e8ccf7c45b3d1a49a3fe97913a7ce36d1

文本原样展示、可选标题栏与真实复制结果。

## Decision
pre/code 保留空白、字符与完整宽度，库自己不做语法高亮：已高亮的标记由调用方经 children 给出，复制的仍是 code。代码面只用一条清墨容器线划出范围，底只比所坐之处深半个清染。复制复用 useCopyToClipboard；只有写入成功才显示已复制，失败保留手动复制内容。

## Notes
- 语言名称不是语法解析；没有额外依赖、请求或剪贴板 fallback 伪成功。
- 标题栏里放 SegmentedControl 切换内容时，code 与 children 要随所选值一起换，复制的才是眼前这一条。

## Use and ownership
- 原样阅读和复制一段代码或预格式文本。
- Avoid: 可编辑文字使用 Textarea；不把语言标签当作语法高亮。
- Library: 文本容量与真实剪贴板成功/失败反馈。
- Application: 原始文本、语言名称与对复制结果的后续动作。

## Composition
- CodeBlock：代码呈现与可选复制动作。

## Responsive behavior
- 完整代码默认横向滚动，不截断或改写字符；wrap 改为折行。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

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
代码呈现与可选复制动作。
- code: string. 必填，原样渲染并复制，不 trim 或格式化。
- language: string. 可选名称，只作识别，不改变文本。
- title: ReactNode. 标题栏的起始内容；给出才有标题栏（高 2 材，复制按钮移到栏尾）。字符串或数字按等宽辅助字显示，起始边与代码文字对齐；其他节点（如 SegmentedControl）原样放入，栏内的轨道面透明，显示代码面。
- children: ReactNode. 已高亮的标记，放进 code 元素代替纯文本显示；复制与可访问内容以 code 为准，两者文字应一致。
- wrap: boolean; default false. 长行折行（在任意位置断开），而不是横向滚动。
- copyable: boolean; default true. 是否提供复制按钮与真实反馈。
- onCopySuccess / onCopyError: () => void / (error: unknown) => void. 实际写入成功或失败后的回调；原生 onCopy 事件另行透传。
- render / ref / ARIA / className / style / native props: useRender.ComponentProps<div>. 属性属于外部 div（原生 title 属性被 title 槽取代）；复制的文本由 code 参数唯一提供。

## Keyboard
- Tab / Enter / Space: 原生文本滚动与 Button 激活。

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
