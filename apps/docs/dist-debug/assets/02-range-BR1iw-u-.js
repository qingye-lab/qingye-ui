import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Calendar } from "./calendar-D2f3pu0H.js";
import "./chevron-left-CtqcxRzh.js";
import "./chevrons-up-down-BLzcfRd-.js";
const meta = {
  title: "范围与双月",
  description: 'mode="range" 选择起止日期，numberOfMonths 并排显示两个月；今天之前不可选。'
};
function Demo() {
  const today = /* @__PURE__ */ new Date();
  const [range, setRange] = reactExports.useState({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Calendar,
    {
      mode: "range",
      numberOfMonths: 2,
      selected: range,
      onSelect: setRange,
      disabled: { before: today }
    }
  );
}
export {
  Demo as default,
  meta
};
