const _02Header = 'import { CodeBlock } from "@yanqing/ui";\n\nexport const meta = { title: "文件名、行号与高亮", description: "标题栏显示文件名与语言；highlightLines 强调关键行。" };\n\nconst code = `import tailwindcss from "@tailwindcss/vite";\nimport react from "@vitejs/plugin-react";\nimport { defineConfig } from "vite";\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n  server: { port: 5180 },\n});`;\n\nexport default function Demo() {\n  return (\n    <CodeBlock\n      className="w-full"\n      code={code}\n      filename="vite.config.ts"\n      highlightLines={[6]}\n      language="TypeScript"\n      lineNumbers\n    />\n  );\n}\n';
export {
  _02Header as default
};
