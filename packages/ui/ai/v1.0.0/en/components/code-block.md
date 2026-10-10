# CodeBlock

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/code-block
Source: packages/ui/src/components/code-block.tsx
Source SHA-256: 348cf21a2208d634c4a1eeb9a6f06dfe230fc8c487d99b447c8fc2de8c179c45

Literal text with actual copy results.

## Decision
pre/code retain whitespace, characters and full width without simulated highlighting. useCopyToClipboard reports success only after writing; failure keeps manual-copy content.

## Notes
- A language label is not parsing; no extra dependencies, fetching or false-success clipboard fallback.

## Use and ownership
- Read and copy code or preformatted text unchanged.
- Avoid: Use Textarea for editable text; a language label does not imply syntax highlighting.
- Library: Text capacity and actual clipboard success/failure feedback.
- Application: Original text, language names, and actions following a copy result.

## Composition
- CodeBlock: Code presentation with an optional copy action.

## Responsive behavior
- Complete code scrolls horizontally without truncation or character changes.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

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
Code presentation with an optional copy action.
- code: string. Required literal text, rendered and copied without trimming or formatting.
- language: string. Optional identifying label that never changes the text.
- copyable: boolean; default true. Whether to provide the copy button and actual feedback.
- onCopySuccess / onCopyError: () => void / (error: unknown) => void. Callbacks after actual write success or failure; the native onCopy event is forwarded independently.
- render / ref / ARIA / className / style / native props: useRender.ComponentProps<div>. Props target the outer div; code is the single source of text.

## Keyboard
- Tab / Enter / Space: Native text scrolling and Button activation.

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
