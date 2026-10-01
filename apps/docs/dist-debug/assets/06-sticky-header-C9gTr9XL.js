import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
const meta = { title: "表头吸顶", description: "stickyHeader 配合 render 给容器限高，表体在固定表头下滚动。", flush: true };
const cities = ["上海", "北京", "深圳", "杭州", "成都", "武汉", "南京", "西安"];
const readings = Array.from({ length: 16 }, (_, index) => ({
  id: `TH-${String(index + 101)}`,
  city: cities[index % cities.length],
  temperature: (18 + index * 7 % 9 + index / 10).toFixed(1),
  humidity: 42 + index * 11 % 37,
  time: `14:${String(59 - index * 3).padStart(2, "0")}`
}));
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-72 rounded-xl" }), stickyHeader: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "ps-4", children: "传感器" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "城市" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "温度 °C" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "湿度 %" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "pe-4 text-end", children: "上报时间" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: readings.map((reading) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "ps-4 font-medium numeric", children: reading.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: reading.city }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: reading.temperature }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: reading.humidity }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "pe-4 text-end text-muted-foreground numeric", children: reading.time })
    ] }, reading.id)) })
  ] });
}
export {
  Demo as default,
  meta
};
