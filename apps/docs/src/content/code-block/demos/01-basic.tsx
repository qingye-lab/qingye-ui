import { CodeBlock } from "@yanqing/ui";

export const meta = { title: "基础", description: "没有标题栏时，复制按钮在右上角，悬停或聚焦时出现。" };

const code = `pnpm add @yanqing/ui
pnpm add -D tailwindcss @tailwindcss/vite`;

export default function Demo() {
  return <CodeBlock className="w-full" code={code} />;
}
