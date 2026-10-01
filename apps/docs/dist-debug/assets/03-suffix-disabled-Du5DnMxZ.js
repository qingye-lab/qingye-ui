import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { T as Tree } from "./tree-BoKp-XxC.js";
import { U as Users } from "./users-9eux0I7r.js";
const __iconNode = [
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3", key: "cabbwy" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" }]
];
const Building = createLucideIcon("building", __iconNode);
const meta = {
  title: "行尾信息与禁用",
  description: "suffix 放人数或徽章；disabled 节点不可聚焦和选中。guides={false} 去掉参考线。"
};
const team = /* @__PURE__ */ jsxRuntimeExports.jsx(Users, {});
const nodes = [
  {
    id: "company",
    label: "云杉科技",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building, {}),
    suffix: 128,
    children: [
      {
        id: "product",
        label: "产品研发中心",
        icon: team,
        suffix: 64,
        children: [
          { id: "platform", label: "平台组", icon: team, suffix: 18 },
          { id: "growth", label: "增长组", icon: team, suffix: 12 },
          { id: "design", label: "体验组", icon: team, suffix: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: "招聘中" }), textValue: "体验组" }
        ]
      },
      { id: "sales", label: "销售部", icon: team, suffix: 41 },
      { id: "legacy", label: "旧数据迁移组（已撤销）", icon: team, disabled: true }
    ]
  }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Tree, { className: "w-full max-w-xs", defaultExpanded: ["company", "product"], guides: false, label: "组织架构", nodes });
}
export {
  Demo as default,
  meta
};
