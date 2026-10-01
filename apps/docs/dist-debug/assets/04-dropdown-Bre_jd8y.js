import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Calendar } from "./calendar-D2f3pu0H.js";
import "./chevron-left-CtqcxRzh.js";
import "./chevrons-up-down-BLzcfRd-.js";
const meta = {
  title: "年月下拉",
  description: 'captionLayout="dropdown" 适合跨度大的日期，例如出生日期。'
};
function Demo() {
  const [date, setDate] = reactExports.useState(new Date(1994, 5, 18));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Calendar,
    {
      mode: "single",
      captionLayout: "dropdown",
      startMonth: new Date(1950, 0),
      endMonth: /* @__PURE__ */ new Date(),
      defaultMonth: new Date(1994, 5),
      selected: date,
      onSelect: setDate
    }
  );
}
export {
  Demo as default,
  meta
};
