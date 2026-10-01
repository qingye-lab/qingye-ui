import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { G as Grid, S as Stack, T as Text } from "./layout-I2EQ_Vmi.js";
const meta = { title: "Grid", description: "columns={3}：手机一列，640px 起两列，1024px 起三列。" };
const stats = [
  { label: "本月部署", value: "126", note: "较上月 +18" },
  { label: "平均构建时长", value: "48 秒", note: "较上月 −6 秒" },
  { label: "成功率", value: "99.2%", note: "失败 1 次" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { className: "w-full", columns: 3, gap: 3, children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { className: "rounded-xl border p-4", gap: 1, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "caption", tone: "muted", children: stat.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "numeric font-semibold text-2xl", children: stat.value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "caption", tone: "muted", children: stat.note })
  ] }, stat.label)) });
}
export {
  Demo as default,
  meta
};
