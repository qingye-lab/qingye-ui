import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { I as Input } from "./input-D9i-AULz.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "必填与选填", description: "用星号或“选填”文字标示，并在控件上设 required。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xs gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "label-name", children: [
        "收件人 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "text-destructive-foreground", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "label-name", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "label-company", children: [
        "公司 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "选填" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "label-company" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
