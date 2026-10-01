import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as Tree } from "./tree-BoKp-XxC.js";
import { F as FileCode } from "./file-code-hnUPkPAB.js";
import { F as FileText } from "./file-text-BKTUvRr9.js";
import { F as FolderOpen } from "./folder-open-CKxl7dlO.js";
import { F as Folder } from "./folder-CBRvho5z.js";
const __iconNode = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    { d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1", key: "1oajmo" }
  ],
  [
    "path",
    { d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1", key: "mpwhp6" }
  ]
];
const FileBraces = createLucideIcon("file-braces", __iconNode);
const meta = { title: "文件目录", description: "文件夹展开时切换图标；参考线标出所在分支。" };
const folder = { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, {}), expandedIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, {}) };
const nodes = [
  {
    id: "src",
    label: "src",
    ...folder,
    children: [
      {
        id: "components",
        label: "components",
        ...folder,
        children: [
          { id: "button", label: "button.tsx", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, {}) },
          { id: "dialog", label: "dialog.tsx", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, {}) },
          { id: "table", label: "table.tsx", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, {}) }
        ]
      },
      { id: "hooks", label: "hooks", ...folder, children: [{ id: "media", label: "use-media-query.ts", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, {}) }] },
      { id: "index", label: "index.ts", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, {}) }
    ]
  },
  { id: "docs", label: "docs", ...folder, children: [{ id: "guide", label: "快速上手.md", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}) }] },
  { id: "package", label: "package.json", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileBraces, {}) },
  { id: "readme", label: "README.md", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}) }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Tree, { className: "w-full max-w-xs", defaultExpanded: ["src", "components"], defaultValue: "table", label: "项目文件", nodes });
}
export {
  Demo as default,
  meta
};
