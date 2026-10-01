const n=`import { CodeBlock } from "@qingye/ui/components/code-block";

export const meta = { title: "基础", description: "没有标题栏时，复制按钮在右上角，悬停或聚焦时出现。" };

const code = \`pnpm add @qingye/ui
pnpm add -D tailwindcss @tailwindcss/vite\`;

export default function Demo() {
  return <CodeBlock className="w-full" code={code} />;
}
`;export{n as default};
