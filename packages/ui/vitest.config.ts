import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/*
 * 测试分三组，按「会不会污染同一进程里的后续文件」划分，而不是按组件分类：
 *
 *   node     纯逻辑、不碰 DOM 的 .ts 测试：node 环境，不加载 setup.ts。
 *   isolated 改了全局或原型的文件（stubGlobal、window/document/matchMedia、
 *            Element/HTMLElement 原型、模块级单例等）：每个文件一个全新环境。
 *   shared   其余：同一 worker 内复用环境与模块（isolate: false），省掉每个文件
 *            重建 jsdom 的开销。新增测试默认落在这一组；若它改了全局/原型而没有
 *            在 afterEach 还原，就把文件名加进 `isolatedFiles`。
 *
 * 三组合起来必须覆盖 test/ 下的全部测试文件：shared 的 include 是全集，再排除前两组。
 */
const nodeFiles = [
  "chart-geometry", "color-check", "contrast-check", "contrast-more", "conventions", "foundation-tokens",
  "prose-stylesheet", "public-guidance", "radius-role-merging", "state-surfaces", "style-contract", "system-roles", "text-role-css",
].map((name) => `test/${name}.test.ts`);

const isolatedFiles = [
  // 主题、媒体查询、剪贴板、滚动与虚拟化：直接改 window/document/navigator 或依赖其全局行为。
  "theme-provider", "theme-axes", "use-media-query", "use-copy-to-clipboard", "toc", "virtual-list", "scroll-area",
  "workspace", "code-block", "copy-button", "description-list",
  // 改 Element/HTMLElement 原型、Intl、matchMedia、getComputedStyle、Image、IntersectionObserver，或操作 documentElement / body 样式。
  "form", "input-modality-provider", "locale", "resizable", "sidebar", "data-table", "table", "slider", "color-picker",
  "dialog", "tag-input", "avatar", "bulk-action-bar",
  // toast 的管理器是模块级单例。
  "toast",
].map((name) => `test/${name}.test.{ts,tsx}`);

export default defineConfig({
  plugins: [react()],
  // Documentation examples use public entries; unit tests must resolve current
  // source even in a fresh checkout, before dist has been built.
  resolve: {
    alias: [{ find: /^@qingye_lab\/ui\/components\/(.+)$/, replacement: fileURLToPath(new URL("./src/components/", import.meta.url)) + "$1" }],
  },
  test: {
    css: false,
    // 交互测试在本机并行负载下会超过默认 5 秒；超时不是断言失败，放宽后只留真实失败。
    testTimeout: 20_000,
    projects: [
      { extends: true, test: { name: "node", environment: "node", include: nodeFiles } },
      { extends: true, test: { name: "isolated", environment: "jsdom", setupFiles: ["./test/setup.ts"], include: isolatedFiles, isolate: true } },
      {
        extends: true,
        test: {
          name: "shared",
          environment: "jsdom",
          setupFiles: ["./test/setup.ts"],
          include: ["test/**/*.test.{ts,tsx}"],
          exclude: [...nodeFiles, ...isolatedFiles],
          isolate: false,
        },
      },
    ],
  },
});
