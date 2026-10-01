import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Command, a as CommandInput, b as CommandPanel, c as CommandEmpty, d as CommandList, h as CommandItem } from "./command-BRcGQYa0.js";
import "./autocomplete-DlyiU5Sk.js";
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
const meta = {
  title: "空状态",
  description: "没有匹配项时显示 CommandEmpty；不传内容时使用内置文案。"
};
const devices = ["仓库 3 号扫码枪", "前台标签打印机", "冷库温控器"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-xs rounded-2xl border bg-muted/72", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { defaultValue: "投影仪", items: devices, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { "aria-label": "搜索设备", autoFocus: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandPanel, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandList, { children: (device) => /* @__PURE__ */ jsxRuntimeExports.jsx(CommandItem, { value: device, children: device }, device) })
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
