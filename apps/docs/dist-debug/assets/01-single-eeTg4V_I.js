import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Calendar } from "./calendar-D2f3pu0H.js";
import "./chevron-left-CtqcxRzh.js";
import "./chevrons-up-down-BLzcfRd-.js";
const meta = { title: "单选", description: "今天以小圆点标出；补位的相邻月份日期也可点选。" };
function Demo() {
  const today = /* @__PURE__ */ new Date();
  const [date, setDate] = reactExports.useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { mode: "single", selected: date, onSelect: setDate });
}
export {
  Demo as default,
  meta
};
