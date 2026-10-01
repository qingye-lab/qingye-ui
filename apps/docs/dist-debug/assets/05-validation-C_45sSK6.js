import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as FileUpload } from "./file-upload-CTuBjOUn.js";
import "./file-image-B9HNmRf2.js";
import "./file-code-hnUPkPAB.js";
import "./file-text-BKTUvRr9.js";
import "./file-tUYWJKRx.js";
const meta = {
  title: "数量与大小限制",
  description: "最多 3 个文件、单个 2 MB。拖入超出的文件试试，被拒绝的文件会逐条列出原因。"
};
function Demo() {
  const [rejected, setRejected] = reactExports.useState([]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-md flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FileUpload,
      {
        maxFiles: 3,
        maxSize: 2 * 1024 * 1024,
        accept: ".csv,.xlsx",
        label: "导入设备台账",
        description: "CSV 或 Excel，最多 3 个，单个不超过 2 MB",
        onReject: setRejected
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs numeric", children: [
      "本次拒绝 ",
      rejected.length,
      " 个文件"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
