import { r as reactExports, j as jsxRuntimeExports, f as Menu, dw as MenuGroup, dx as MenuGroupLabel, cH as MenuCheckboxItem, k as MenuSeparator, dy as MenuRadioGroup, dz as MenuRadioItem } from "./index-DM02Iz28.js";
import { M as Menubar, a as MenubarTrigger, b as MenubarPopup } from "./menubar-vrFJaGn8.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
const meta = { title: "勾选与单选", description: "视图选项用 CheckboxItem，互斥选项用 RadioGroup。" };
function Demo() {
  const [rulers, setRulers] = reactExports.useState(true);
  const [grid, setGrid] = reactExports.useState(false);
  const [zoom, setZoom] = reactExports.useState("fit");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menubar, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenubarTrigger, { children: "视图" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenubarPopup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuGroup, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuGroupLabel, { children: "辅助线" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuCheckboxItem, { checked: rulers, onCheckedChange: setRulers, children: "显示标尺" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuCheckboxItem, { checked: grid, onCheckedChange: setGrid, children: "显示网格" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuGroup, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuGroupLabel, { children: "缩放" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuRadioGroup, { onValueChange: (value) => setZoom(String(value)), value: zoom, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRadioItem, { value: "fit", children: "适应窗口" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRadioItem, { value: "100", children: "100%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRadioItem, { value: "200", children: "200%" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenubarTrigger, { children: "排列" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenubarPopup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuCheckboxItem, { defaultChecked: true, children: "吸附到像素" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuCheckboxItem, { children: "吸附到对象" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { disabled: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MenubarTrigger, { children: "插件" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs numeric", children: [
      "标尺",
      rulers ? "开" : "关",
      " · 网格",
      grid ? "开" : "关",
      " · 缩放 ",
      zoom === "fit" ? "适应窗口" : `${zoom}%`
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
