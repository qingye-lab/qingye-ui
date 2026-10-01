const _01Basic = 'import { CodeBlock } from "@yanqing/ui";\n\nexport const meta = { title: "基础", description: "没有标题栏时，复制按钮在右上角，悬停或聚焦时出现。" };\n\nconst code = `pnpm add @yanqing/ui\npnpm add -D tailwindcss @tailwindcss/vite`;\n\nexport default function Demo() {\n  return <CodeBlock className="w-full" code={code} />;\n}\n';
export {
  _01Basic as default
};
