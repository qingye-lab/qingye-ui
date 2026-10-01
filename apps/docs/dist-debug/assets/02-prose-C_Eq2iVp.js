import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as CodeBlock } from "./code-block-BmCAJUBV.js";
import { P as Prose } from "./typography-Co1wZ35x.js";
import "./copy-button-B3gSj0u1.js";
import "./copy-CMgYpHr5.js";
import "./arrow-up-right-CCvFLBck.js";
const meta = { title: "长文 Prose", description: "段落、列表、链接、引用、行内代码、表格、分隔线；内部的组件保持自身样式。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { className: "w-full max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "门店设备接入指南" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "新门店开业前，需要把收银机、厨房打印机和自助点餐屏接入管理后台。接入完成后，设备状态、订单与告警会实时同步，运营人员可以在",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#devices", children: "设备列表" }),
      "中远程查看和重启。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "准备工作" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "确认门店网络可以访问 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "api.yanqing.cn" }),
        " 的 443 端口。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "在后台创建门店并记下门店编号，例如 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "XH-001" }),
        "。"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "每台设备准备好序列号，通常贴在机身底部。",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "收银机：以 T2S 开头" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "打印机：以 GP 开头" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "接入步骤" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "设备开机后进入「设置 → 管理平台」，填写门店编号。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "在后台点击「添加设备」，输入序列号完成绑定。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "绑定后约 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "30 秒" }),
        " 内状态变为「在线」。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `curl -s https://api.yanqing.cn/v2/stores/XH-001/devices \\
  -H "Authorization: Bearer $TOKEN"`, filename: "查询设备" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "如果 5 分钟后仍显示离线，请先检查门店路由器是否拦截了出站连接，再联系技术支持。" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "常见设备型号" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "类型" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "型号" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "接入方式" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "收银机" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "SUNMI T2s" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "后台绑定序列号" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "厨房打印机" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "佳博 GP-L80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "通过收银机局域网发现" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "自助点餐屏" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "SUNMI K2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "扫码绑定" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "更新于 2026 年 9 月 30 日。发现文档有误？请在",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#feedback", children: "反馈页" }),
      "告诉我们。"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
