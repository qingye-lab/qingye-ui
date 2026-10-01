import type { ComponentMeta } from "@/lib/types";

export default {
  title: "时间线 Timeline",
  description: "按时间顺序列出事件：物流轨迹、部署记录、审批与评论动态。",
  category: "数据展示",
  source: "local",
  exports: ["Timeline", "TimelineItem", "TimelineMarker", "TimelineContent", "TimelineHeader", "TimelineTitle", "TimelineTime", "TimelineDescription"],
  keywords: ["timeline", "时间线", "动态", "活动", "日志", "activity", "feed"],
  api: [
    {
      name: "Timeline",
      description: "渲染 <ol>。简单场景传 items；需要头像、评论等丰富内容时用子组件组合。",
      props: [
        { name: "items", type: "TimelineEntry[]", description: "{ id, title, description?, time?, dateTime?, icon?, status?, content? }。" },
        { name: "density", type: '"default" | "compact"', default: '"default"', description: "compact 收紧间距与标记尺寸（24px → 20px），适合日志。" },
        { name: "connector", type: '"solid" | "dashed" | "none"', default: '"solid"', description: "标记之间的连接线样式。" },
        { name: "label", type: "string", default: '"时间线"', description: "列表的无障碍名称。" },
      ],
    },
    { name: "TimelineItem", description: "单个事件 <li>，连接线画在标记列下方，最后一项自动省略。" },
    {
      name: "TimelineMarker",
      description: "标记列，装饰性（aria-hidden）；含义由标题承担。",
      props: [
        { name: "status", type: '"default" | "primary" | "success" | "warning" | "error" | "info"', default: '"default"', description: "标记颜色。" },
        { name: "variant", type: '"dot" | "icon" | "plain"', description: "无子元素时为 dot，有子元素时为带边框的 icon；放头像时用 plain。" },
      ],
    },
    { name: "TimelineContent", description: "内容列，首行与标记垂直居中对齐。" },
    { name: "TimelineHeader", description: "标题与时间同行，空间不足时换行。" },
    { name: "TimelineTitle", description: "标题，默认 500 字重；动态语句可用 font-normal 并以 <strong> 标出人名。" },
    { name: "TimelineTime", description: "<time> 元素，等宽数字；传 dateTime 给出机器可读时间。" },
    { name: "TimelineDescription", description: "补充说明。" },
  ],
  notes: [
    "时间写成用户熟悉的形式（“14:32”“昨天”），同时用 dateTime 提供 ISO 时间。",
    "状态颜色只作辅助，标题文字要能单独说明发生了什么。",
    "新事件在上的倒序最常见；保持同一页面内顺序一致。",
  ],
} satisfies ComponentMeta;
