import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { T as Tree } from "./tree-BoKp-XxC.js";
const meta = { title: "受控展开与选中", description: "用 expanded 与 value 在外部控制，例如“全部展开”和联动详情。" };
const nodes = [
  {
    id: "east",
    label: "华东大区",
    children: [
      { id: "sh", label: "上海", children: [{ id: "sh-xh", label: "徐汇店" }, { id: "sh-ja", label: "静安店" }] },
      { id: "hz", label: "杭州", children: [{ id: "hz-xh", label: "西湖店" }] }
    ]
  },
  {
    id: "south",
    label: "华南大区",
    children: [{ id: "sz", label: "深圳", children: [{ id: "sz-ns", label: "南山店" }, { id: "sz-ft", label: "福田店" }] }]
  }
];
const parents = ["east", "sh", "hz", "south", "sz"];
function Demo() {
  const [expanded, setExpanded] = reactExports.useState(["east"]);
  const [value, setValue] = reactExports.useState("hz");
  const [name, setName] = reactExports.useState("杭州");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xs flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setExpanded(parents), size: "sm", variant: "outline", children: "全部展开" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setExpanded([]), size: "sm", variant: "outline", children: "全部收起" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tree,
      {
        expanded,
        label: "门店",
        nodes,
        onExpandedChange: setExpanded,
        onValueChange: (id, node) => {
          setValue(id);
          setName(node.label);
        },
        value
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
      "当前选中：",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: name })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
