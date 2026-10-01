const _01Statuses = 'import { StatusDot } from "@yanqing/ui";\n\nexport const meta = { title: "状态", description: "离线为空心圆，与中性灰在形状上也能区分。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">\n      <StatusDot status="online">在线</StatusDot>\n      <StatusDot status="offline">离线</StatusDot>\n      <StatusDot status="warning">电量低</StatusDot>\n      <StatusDot status="error">连接异常</StatusDot>\n      <StatusDot status="info">升级中</StatusDot>\n      <StatusDot status="neutral">未激活</StatusDot>\n    </div>\n  );\n}\n';
export {
  _01Statuses as default
};
