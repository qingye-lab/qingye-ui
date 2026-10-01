import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Calendar } from "./calendar-D2f3pu0H.js";
import "./chevron-left-CtqcxRzh.js";
import "./chevrons-up-down-BLzcfRd-.js";
const meta = { title: "多选", description: "最多选择 5 个值班日；周末不可选。" };
function Demo() {
  const today = /* @__PURE__ */ new Date();
  const [days, setDays] = reactExports.useState([]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Calendar,
      {
        mode: "multiple",
        max: 5,
        selected: days,
        onSelect: setDays,
        disabled: { dayOfWeek: [0, 6] },
        defaultMonth: today
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm numeric", children: [
      "已选 ",
      days?.length ?? 0,
      " / 5 天"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
