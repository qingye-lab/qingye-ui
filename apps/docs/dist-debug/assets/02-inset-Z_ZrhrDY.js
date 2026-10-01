import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { D as Disclosure, a as DisclosureTrigger, b as DisclosurePanel } from "./disclosure-seuRJb5m.js";
import { T as Terminal } from "./terminal-DPsb7hrp.js";
import "./chevron-down-DlWyuvnt.js";
import "./CollapsiblePanel-B5cYZztf.js";
import "./useCollapsiblePanel-Dpoq1n6_.js";
const meta = {
  title: "独立区块",
  description: "inset：自带边框，适合卡片中的详情或日志。"
};
const log = [
  "14:32:01  安装依赖  pnpm install --frozen-lockfile",
  "14:32:19  构建  pnpm build",
  "14:32:46  上传 128 个文件到 CDN",
  "14:32:49  部署完成，耗时 48 秒"
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Disclosure, { className: "w-full max-w-md", defaultOpen: true, variant: "inset", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DisclosureTrigger, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, {}),
      "构建日志",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "成功" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosurePanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "numeric overflow-x-auto rounded-lg bg-muted p-3 font-mono text-muted-foreground text-xs leading-relaxed", children: log.join("\n") }) })
  ] });
}
export {
  Demo as default,
  meta
};
