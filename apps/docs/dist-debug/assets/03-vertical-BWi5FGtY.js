import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as DescriptionList, a as DescriptionListItem, b as DescriptionTerm, c as DescriptionDetails } from "./description-list-DbCz6cCA.js";
import "./copy-button-B3gSj0u1.js";
import "./copy-CMgYpHr5.js";
const meta = { title: "垂直布局", description: "名称在值的上方，适合窄栏或值较长的情形。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionList, { className: "w-full max-w-sm", divided: true, layout: "vertical", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: "API 访问地址" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { className: "break-all font-mono text-[0.8125rem]", copyLabel: "复制 API 访问地址", copyValue: "https://api.yanqing.cn/v2/stores/xh-001/devices", children: "https://api.yanqing.cn/v2/stores/xh-001/devices" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: "回调说明" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { children: "设备状态变化时向该地址推送事件，5 秒内未返回 200 会按 1、5、30 分钟重试三次，仍失败则记入告警。" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
