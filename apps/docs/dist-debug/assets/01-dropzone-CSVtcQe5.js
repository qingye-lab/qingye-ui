import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as FileUpload } from "./file-upload-CTuBjOUn.js";
import "./file-image-B9HNmRf2.js";
import "./file-code-hnUPkPAB.js";
import "./file-text-BKTUvRr9.js";
import "./file-tUYWJKRx.js";
const meta = { title: "拖放区", description: "点击或拖入文件；不符合类型或大小的文件会被拒绝并说明原因。" };
const sample = (name, type, size) => new File([new Uint8Array(size)], name, { type });
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FileUpload,
    {
      className: "w-full max-w-md",
      accept: "image/*,.pdf",
      maxSize: 10 * 1024 * 1024,
      label: "上传发票",
      description: "支持 PNG、JPG、PDF，单个不超过 10 MB",
      defaultFiles: [
        sample("2026年9月差旅发票.pdf", "application/pdf", 248e3),
        sample("酒店住宿水单-杭州.jpg", "image/jpeg", 186e4)
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
