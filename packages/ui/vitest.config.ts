import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  // Documentation examples use public entries; unit tests must resolve current
  // source even in a fresh checkout, before dist has been built.
  resolve: {
    alias: [{ find: /^@qingye_lab\/ui\/components\/(.+)$/, replacement: fileURLToPath(new URL("./src/components/", import.meta.url)) + "$1" }],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["test/**/*.test.{ts,tsx}"],
    css: false,
    // 交互测试在本机并行负载下会超过默认 5 秒；超时不是断言失败，放宽后只留真实失败。
    testTimeout: 20_000,
  },
});
