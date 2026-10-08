import { fileURLToPath } from "node:url";
const dependencies = fileURLToPath(new URL("../../../packages/ui/node_modules/", import.meta.url));
const source = fileURLToPath(new URL("../../../packages/ui/src/components/", import.meta.url));
export default {
  resolve: { alias: [{ find: "@testing-library/react", replacement: `${dependencies}@testing-library/react` }, { find: "@testing-library/user-event", replacement: `${dependencies}@testing-library/user-event` }, { find: "vitest", replacement: `${dependencies}vitest` }, { find: /^@qingye_lab\/ui\/components\/(.+)$/, replacement: `${source}$1` }] },
  test: { environment: "jsdom", css: false, setupFiles: [fileURLToPath(new URL("../../../packages/ui/test/setup.ts", import.meta.url))], include: [fileURLToPath(new URL("./preview.test.tsx", import.meta.url))] },
};
