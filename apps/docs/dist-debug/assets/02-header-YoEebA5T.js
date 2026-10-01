import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as CodeBlock } from "./code-block-BmCAJUBV.js";
import "./copy-button-B3gSj0u1.js";
import "./copy-CMgYpHr5.js";
const meta = { title: "文件名、行号与高亮", description: "标题栏显示文件名与语言；highlightLines 强调关键行。" };
const code = `import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5180 },
});`;
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CodeBlock,
    {
      className: "w-full",
      code,
      filename: "vite.config.ts",
      highlightLines: [6],
      language: "TypeScript",
      lineNumbers: true
    }
  );
}
export {
  Demo as default,
  meta
};
