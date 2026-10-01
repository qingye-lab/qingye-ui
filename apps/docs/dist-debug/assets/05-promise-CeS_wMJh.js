import { j as jsxRuntimeExports, B as Button, t as toastManager } from "./index-DM02Iz28.js";
const meta = {
  title: "跟随 Promise",
  description: "toastManager.promise 在加载、成功、失败之间自动切换；这里随机成功或失败。"
};
function uploadFirmware() {
  return new Promise((resolve, reject) => {
    setTimeout(() => Math.random() > 0.3 ? resolve("v2.8.0") : reject(new Error("校验失败")), 1800);
  });
}
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      onClick: () => toastManager.promise(uploadFirmware(), {
        loading: { title: "正在上传固件…", description: "请勿断开设备电源。" },
        success: (version) => ({ title: "固件已更新", description: `12 台设备已升级到 ${version}。` }),
        error: (error) => ({ title: "固件上传失败", description: `${error.message}，请重新下载安装包。` })
      }).catch(() => {
      }),
      variant: "outline",
      children: "上传固件"
    }
  );
}
export {
  Demo as default,
  meta
};
