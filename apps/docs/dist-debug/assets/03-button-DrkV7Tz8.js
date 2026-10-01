import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as FileUpload } from "./file-upload-CTuBjOUn.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./file-image-B9HNmRf2.js";
import "./file-code-hnUPkPAB.js";
import "./file-text-BKTUvRr9.js";
import "./file-tUYWJKRx.js";
const meta = { title: "按钮触发", description: 'variant="button" 适合表单中的单个附件；maxFiles=1 时新文件替换旧文件。' };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-md flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contract-file", children: "签署版合同" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FileUpload,
      {
        id: "contract-file",
        variant: "button",
        accept: ".pdf",
        maxFiles: 1,
        maxSize: 20 * 1024 * 1024,
        chooseLabel: "选择 PDF",
        description: "仅 PDF，不超过 20 MB"
      }
    )
  ] });
}
export {
  Demo as default,
  meta
};
