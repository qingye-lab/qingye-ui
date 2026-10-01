import { r as reactExports, j as jsxRuntimeExports, D as Search, B as Button } from "./index-DM02Iz28.js";
import { E as Empty, a as EmptyHeader, d as EmptyMedia, b as EmptyTitle, c as EmptyDescription, e as EmptyContent } from "./empty-UZzeYbXj.js";
import { S as SearchInput } from "./search-input-DR84Mv-7.js";
import "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "搜索无结果", description: "标题带上关键词，并提供清除搜索的出口。" };
const devices = ["客厅网关 Mini", "智能门锁 S2", "温湿度传感器", "人体感应器", "智能插座 Pro"];
function Demo() {
  const [query, setQuery] = reactExports.useState("摄像头");
  const results = devices.filter((device) => device.includes(query.trim()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchInput, { "aria-label": "搜索设备", placeholder: "搜索设备", value: query, onValueChange: setQuery }),
    results.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y rounded-xl border", children: results.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-3 py-2.5 text-sm", children: device }, device)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Empty, { className: "rounded-xl border border-dashed py-8 md:py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMedia, { variant: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyTitle, { className: "text-base", children: [
          "没有找到“",
          query,
          "”"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyDescription, { children: "换个关键词试试，或检查拼写。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setQuery(""), children: "清除搜索" }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
