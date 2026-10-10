# 代码 CodeBlock

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/code-block
Source: packages/ui/src/components/code-block.tsx
Source SHA-256: 64c687b312485e84b125bdcc8b61db12ba06eb6cd4e4198840f46533dffac097

文本原样展示与真实复制结果。

## Decision
pre/code 保留空白、字符与完整宽度，不伪造高亮。复制复用 useCopyToClipboard；只有写入成功才显示已复制，失败保留手动复制内容。

## Notes
- 语言名称不是语法解析；没有额外依赖、请求或剪贴板 fallback 伪成功。

## Use and ownership
- 原样阅读和复制一段代码或预格式文本。
- Avoid: 可编辑文字使用 Textarea；不把语言标签当作语法高亮。
- Library: 文本容量与真实剪贴板成功/失败反馈。
- Application: 原始文本、语言名称与对复制结果的后续动作。

## Composition
- CodeBlock：代码呈现与可选复制动作。

## Responsive behavior
- 完整代码横向滚动，不截断或改写字符。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

## Current exports
- CodeBlock: function; owner code-block; PASS; props: CodeBlockProps
- CodeBlockProps: type; owner code-block; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CodeBlock
代码呈现与可选复制动作。
- code: string. 必填，原样渲染并复制，不 trim 或格式化。
- language: string. 可选名称，只作识别，不改变文本。
- copyable: boolean; default true. 是否提供复制按钮与真实反馈。
- onCopySuccess / onCopyError: () => void / (error: unknown) => void. 实际写入成功或失败后的回调；原生 onCopy 事件另行透传。
- render / ref / ARIA / className / style / native props: useRender.ComponentProps<div>. 属性属于外部 div；内部文本由 code 参数唯一提供。

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
