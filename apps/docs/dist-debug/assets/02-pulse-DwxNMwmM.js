const _02Pulse = 'import { StatusDot } from "@yanqing/ui";\n\nexport const meta = {\n  title: "实时光环",\n  description: "pulse 用于正在发生的状态；减少动态效果时只保留圆点。",\n};\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">\n      <StatusDot pulse status="online">\n        直播中\n      </StatusDot>\n      <StatusDot pulse status="info">\n        正在同步\n      </StatusDot>\n      <StatusDot pulse status="error">\n        告警未处理\n      </StatusDot>\n    </div>\n  );\n}\n';
export {
  _02Pulse as default
};
