import { r as reactExports, j as jsxRuntimeExports, aa as Spinner } from "./index-DM02Iz28.js";
import { A as Autocomplete, a as AutocompleteInput, b as AutocompletePopup, j as AutocompleteStatus, d as AutocompleteList, e as AutocompleteItem } from "./autocomplete-DlyiU5Sk.js";
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
const meta = { title: "远程建议", description: "filter={null}，由接口返回建议；请求进行中显示加载状态。" };
const addresses = [
  "浙江省杭州市西湖区文三路 478 号",
  "浙江省杭州市滨江区网商路 699 号",
  "浙江省杭州市余杭区文一西路 969 号",
  "上海市浦东新区张江路 368 号",
  "北京市朝阳区望京东园四区 9 号"
];
const suggest = (query) => new Promise((resolve) => setTimeout(() => resolve(addresses.filter((item) => item.includes(query))), 450));
function Demo() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const latest = reactExports.useRef(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Autocomplete,
    {
      items,
      filter: null,
      onValueChange: async (next) => {
        const query = next.trim();
        const ticket = ++latest.current;
        if (!query) return setItems([]);
        setLoading(true);
        const found = await suggest(query);
        if (ticket !== latest.current) return;
        setItems(found);
        setLoading(false);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteInput, { "aria-label": "安装地址", placeholder: "输入街道或小区，例如 杭州" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AutocompletePopup, { "aria-busy": loading || void 0, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteStatus, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { className: "size-3.5" }),
            "正在获取地址建议…"
          ] }) : null }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteList, { children: (address) => /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteItem, { value: address, children: address }, address) })
        ] })
      ]
    }
  ) });
}
export {
  Demo as default,
  meta
};
