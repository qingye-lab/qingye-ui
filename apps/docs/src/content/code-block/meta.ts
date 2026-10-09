import type { ComponentMeta } from "@/lib/types";
export default {
  title: "代码 CodeBlock", titleEn: "CodeBlock", description: "文本原样展示与真实复制结果。", descriptionEn: "Literal text with actual copy results.",
  category: "排版", layer: "pattern", source: "local", exports: ["CodeBlock"],
  decisions: "pre/code 保留空白、字符与完整宽度，不伪造高亮。复制复用 useCopyToClipboard；只有写入成功才显示已复制，失败保留手动复制内容。", decisionsEn: "pre/code retain whitespace, characters and full width without simulated highlighting. useCopyToClipboard reports success only after writing; failure keeps manual-copy content.",
  design: { methods: ["名实相符", "布白有用", "进退相承"], whenToUse: ["原样阅读和复制一段代码或预格式文本。"], avoid: ["可编辑文字使用 Textarea；不把语言标签当作语法高亮。"], stateOwner: { library: ["文本容量与真实剪贴板成功/失败反馈。"], application: ["原始文本、语言名称与对复制结果的后续动作。"] }, responsive: ["完整代码横向滚动，不截断或改写字符。"] }, designEn: {"whenToUse":["Read and copy code or preformatted text unchanged."],"avoid":["Use Textarea for editable text; a language label does not imply syntax highlighting."],"stateOwner":{"library":["Text capacity and actual clipboard success/failure feedback."],"application":["Original text, language names, and actions following a copy result."]},"responsive":["Complete code scrolls horizontally without truncation or character changes."]},
  keywords: ["code", "snippet", "syntax", "代码", "代码块", "高亮"],
  api: [{ name: "CodeBlock", description: "代码呈现与可选复制动作。", descriptionEn: "Code presentation with an optional copy action.", props: [
    { name: "code", type: "string", description: "必填，原样渲染并复制，不 trim 或格式化。", descriptionEn: "Required literal text, rendered and copied without trimming or formatting." },
    { name: "language", type: "string", description: "可选名称，只作识别，不改变文本。", descriptionEn: "Optional identifying label that never changes the text." },
    { name: "copyable", type: "boolean", default: "true", description: "是否提供复制按钮与真实反馈。", descriptionEn: "Whether to provide the copy button and actual feedback." },
    { name: "onCopySuccess / onCopyError", type: "() => void / (error: unknown) => void", description: "实际写入成功或失败后的回调；原生 onCopy 事件另行透传。", descriptionEn: "Callbacks after actual write success or failure; the native onCopy event is forwarded independently." },
    { name: "render / ref / ARIA / className / style / native props", type: "useRender.ComponentProps<div>", description: "属性属于外部 div；内部文本由 code 参数唯一提供。", descriptionEn: "Props target the outer div; code is the single source of text." },
  ] }], keyboard: [{ keys: "Tab / Enter / Space", description: "原生文本滚动与 Button 激活。", descriptionEn: "Native text scrolling and Button activation." }],
  notes: ["语言名称不是语法解析；没有额外依赖、请求或剪贴板 fallback 伪成功。"], notesEn: ["A language label is not parsing; no extra dependencies, fetching or false-success clipboard fallback."],
} satisfies ComponentMeta;
