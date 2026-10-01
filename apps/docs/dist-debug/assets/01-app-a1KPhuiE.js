import { j as jsxRuntimeExports, f as Menu, i as MenuItem, dv as MenuShortcut, dA as MenuSub, dB as MenuSubTrigger, dC as MenuSubPopup, k as MenuSeparator } from "./index-DM02Iz28.js";
import { M as Menubar, a as MenubarTrigger, b as MenubarPopup } from "./menubar-vrFJaGn8.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
const meta = { title: "桌面应用", description: "点击打开一个菜单后，左右方向键或悬停即可切换到相邻菜单。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menubar, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenubarTrigger, { children: "文件" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenubarPopup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "新建文档 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘N" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "打开… ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘O" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSub, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSubTrigger, { children: "最近打开" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSubPopup, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "季度复盘.md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "品牌规范.pdf" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "首页改版.fig" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "清除记录" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "保存 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘S" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "另存为… ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⇧⌘S" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "打印… ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘P" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenubarTrigger, { children: "编辑" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenubarPopup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "撤销 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘Z" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "重做 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⇧⌘Z" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "剪切 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘X" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "复制 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘C" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "粘贴 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘V" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "查找与替换 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘F" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { variant: "destructive", children: "删除选中内容" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenubarTrigger, { children: "视图" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenubarPopup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "放大 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘+" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "缩小 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘−" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "实际大小 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "进入全屏 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌃⌘F" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenubarTrigger, { children: "帮助" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenubarPopup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "使用指南" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          "键盘快捷键 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘/" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "反馈问题" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
