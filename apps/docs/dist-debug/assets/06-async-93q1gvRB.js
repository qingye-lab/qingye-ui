import { r as reactExports, j as jsxRuntimeExports, aa as Spinner } from "./index-DM02Iz28.js";
import { C as Combobox, a as ComboboxInput, b as ComboboxPopup, n as ComboboxStatus, c as ComboboxEmpty, d as ComboboxList, e as ComboboxItem } from "./combobox-HQR3mXiu.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./ComboboxEmpty-BQp7q2Mg.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./stringifyLocale-DOx30wH1.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = { title: "远程搜索", description: "filter={null} 关闭本地筛选；ComboboxStatus 播报加载状态。" };
const directory = [
  { label: "HZ-CORE-SW01", value: "sw01", site: "杭州 A 栋 3F" },
  { label: "HZ-CORE-SW02", value: "sw02", site: "杭州 A 栋 3F" },
  { label: "HZ-EDGE-RT07", value: "rt07", site: "杭州 B 栋 1F" },
  { label: "SH-ACC-SW15", value: "sw15", site: "上海 张江 2F" },
  { label: "SH-UPS-03", value: "ups03", site: "上海 张江 B1" },
  { label: "BJ-FW-02", value: "fw02", site: "北京 望京 5F" }
];
const search = (query) => new Promise(
  (resolve) => setTimeout(() => resolve(directory.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))), 500)
);
function Demo() {
  const [results, setResults] = reactExports.useState([]);
  const [query, setQuery] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const latest = reactExports.useRef(0);
  const onInputValueChange = async (next, details) => {
    setQuery(next);
    if (details.reason === "item-press" || !next.trim()) return;
    const ticket = ++latest.current;
    setLoading(true);
    const found = await search(next.trim());
    if (ticket !== latest.current) return;
    setResults(found);
    setLoading(false);
  };
  const status = loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { className: "size-3.5" }),
    "正在搜索设备…"
  ] }) : !query.trim() ? "输入设备名，例如 SW" : results.length ? `找到 ${results.length} 台设备` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Combobox, { items: results, filter: null, onInputValueChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxInput, { "aria-label": "关联设备", placeholder: "搜索设备名" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ComboboxPopup, { "aria-busy": loading || void 0, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxStatus, { children: status }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxEmpty, { children: !loading && query.trim() ? `没有名称包含「${query.trim()}」的设备` : null }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxList, { children: (device) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItem, { value: device, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: device.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: device.site })
      ] }) }, device.value) })
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
