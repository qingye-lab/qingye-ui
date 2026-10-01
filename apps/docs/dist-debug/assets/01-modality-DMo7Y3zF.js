import { j as jsxRuntimeExports, dJ as MotionProvider, B as Button, K as Kbd, r as reactExports } from "./index-DM02Iz28.js";
const meta = {
  title: "输入方式",
  description: "移动鼠标或按 Tab 键，观察 <html data-ui-input> 的变化。实际应用中 MotionProvider 放在根部。"
};
function useInputModality() {
  const [input, setInput] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    const read = () => setInput(root.getAttribute("data-ui-input"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributeFilter: ["data-ui-input"] });
    return () => observer.disconnect();
  }, []);
  return input;
}
function Readout() {
  const input = useInputModality();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
    "data-ui-input = ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-foreground", children: input ?? "—" })
  ] });
}
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MotionProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Readout, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "保存草稿" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "发布" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
      "按 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Tab" }),
      " 切换焦点时焦点环立即出现；用鼠标点击按钮可以看到 0.97 的按压缩放。"
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
