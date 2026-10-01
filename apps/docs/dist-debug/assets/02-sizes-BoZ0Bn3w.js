import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { N as NativeSelect, a as NativeSelectOption } from "./native-select-3N5bSCwi.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "尺寸", description: "与 Select 触发器相同的三档尺寸；移动端自动加高 4px。" };
const sizes = [
  { size: "sm", label: "小" },
  { size: "default", label: "默认" },
  { size: "lg", label: "大" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full max-w-xs flex-col gap-3", children: sizes.map(({ size, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(NativeSelect, { "aria-label": `${label}尺寸`, defaultValue: "week", size, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "day", children: "按天汇总" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "week", children: "按周汇总" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "month", children: "按月汇总" })
  ] }, size)) });
}
export {
  Demo as default,
  meta
};
