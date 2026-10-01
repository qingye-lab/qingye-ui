import { CodeBlock } from "@qingye/ui/components/code-block";

export const meta = { title: "文件名、行号与高亮", description: "标题栏显示文件名与语言；highlightLines 强调关键行。" };

const code = `import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5180 },
});`;

export default function Demo() {
  return (
    <CodeBlock
      className="w-full"
      code={code}
      filename="vite.config.ts"
      highlightLines={[6]}
      language="TypeScript"
      lineNumbers
    />
  );
}
