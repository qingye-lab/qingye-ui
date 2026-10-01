import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as SearchInput } from "./search-input-DR84Mv-7.js";
import "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "组合：筛选列表", description: "受控使用，实时过滤下方列表。" };
const devices = [
  { name: "SH-204 门禁控制器", place: "上海 · 张江园区" },
  { name: "HZ-031 温湿度传感器", place: "杭州 · 滨江仓" },
  { name: "HZ-112 网络摄像机", place: "杭州 · 滨江仓" },
  { name: "SZ-008 智能电表", place: "深圳 · 南山办公室" }
];
function Demo() {
  const [query, setQuery] = reactExports.useState("");
  const results = devices.filter((device) => `${device.name}${device.place}`.includes(query.trim()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchInput, { "aria-label": "搜索设备", onValueChange: setQuery, placeholder: "搜索设备名称或位置", value: query }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "divide-y rounded-lg border", children: [
      results.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col gap-0.5 px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: device.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: device.place })
      ] }, device.name)),
      results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "px-3 py-6 text-center text-muted-foreground text-sm", children: [
        "没有找到“",
        query,
        "”相关的设备"
      ] }) : null
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
