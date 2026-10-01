import { j as jsxRuntimeExports, bq as ScrollArea, r as reactExports } from "./index-DM02Iz28.js";
import { S as Separator } from "./separator-CcYO5Zxi.js";
const meta = { title: "纵向" };
const releases = Array.from({ length: 24 }, (_, i) => `v2.${24 - i}.0`);
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-64 w-48 rounded-lg border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 font-medium text-sm", children: "版本记录" }),
    releases.map((tag, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      i > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "numeric text-muted-foreground text-sm", children: tag })
    ] }, tag))
  ] }) });
}
export {
  Demo as default,
  meta
};
