import type { ComponentMeta } from "@/lib/types";

export default {
  title: "状态点 StatusDot",
  description: "用一个小圆点加文字表示对象当前的状态，如设备在线、任务运行、服务告警。实时状态可加柔和的呼吸光环。",
  category: "数据展示",
  source: "local",
  exports: ["StatusDot"],
  keywords: ["status", "dot", "indicator", "presence", "状态", "在线", "指示灯"],
  api: [
    {
      name: "StatusDot",
      description: "圆点 + 可选的可见文字（children）。没有可见文字时输出只供读屏的状态名，颜色不会是唯一信息。",
      props: [
        { name: "status", type: '"online" | "offline" | "warning" | "error" | "info" | "neutral"', default: '"neutral"', description: "状态；分别对应成功、空心灰、警告、危险、信息、灰色。离线为空心圆，与中性灰在形状上也能区分。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "圆点 6 / 8 / 10px；sm 同时使用 12px 文字。" },
        { name: "pulse", type: "boolean", default: "false", description: "向外扩散的柔和光环，用于「正在发生」的状态。用户偏好减少动态效果时停止。" },
        { name: "label", type: "string", default: "locale.statusLabel(status)", description: "没有可见文字时的读屏文本。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换外层 <span>。" },
      ],
    },
  ],
  notes: [
    "优先写可见文字；只有在表格的状态列等上下文已经说明含义时才单独使用圆点。",
    "pulse 只给真正实时变化的状态（直播中、正在同步、告警未处理），一屏不宜超过一两处。",
    "状态色只表达状态，不要拿来区分普通类别；类别请用 Badge 或图表色。",
  ],
} satisfies ComponentMeta;
