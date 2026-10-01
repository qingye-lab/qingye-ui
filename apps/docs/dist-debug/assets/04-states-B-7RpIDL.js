import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as FileUpload } from "./file-upload-CTuBjOUn.js";
import "./file-image-B9HNmRf2.js";
import "./file-code-hnUPkPAB.js";
import "./file-text-BKTUvRr9.js";
import "./file-tUYWJKRx.js";
const meta = { title: "状态", description: "禁用与错误。错误状态要同时给出文字说明。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-2xl gap-6 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FileUpload, { disabled: true, label: "上传固件包", description: "设备在线升级期间不可上传" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileUpload, { invalid: true, "aria-describedby": "id-card-error", label: "上传身份证照片", description: "正反面各一张，JPG 或 PNG", accept: "image/*" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "id-card-error", className: "text-destructive-foreground text-xs", children: "请上传身份证正反面照片" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
