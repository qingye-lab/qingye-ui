import { j as jsxRuntimeExports, ek as AnchoredToastProvider, r as reactExports, B as Button, el as anchoredToastManager } from "./index-DM02Iz28.js";
import { C as Copy } from "./copy-CMgYpHr5.js";
const meta = {
  title: "锚定提示",
  description: "anchoredToastManager 把消息显示在触发元素旁，适合复制成功这类就地反馈。AnchoredToastProvider 同样只在应用根部挂载一次。"
};
function CopyLink() {
  const ref = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      onClick: () => {
        void navigator.clipboard?.writeText("https://yanqing.cn/t/2318");
        anchoredToastManager.add({
          title: "已复制",
          timeout: 1500,
          positionerProps: { anchor: ref.current },
          data: { tooltipStyle: true }
        });
      },
      ref,
      variant: "outline",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, {}),
        "复制工单链接"
      ]
    }
  );
}
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnchoredToastProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CopyLink, {}) });
}
export {
  Demo as default,
  meta
};
