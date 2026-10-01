import type { ComponentMeta } from "@/lib/types";

export default {
  title: "消息提示 Toast",
  description: "操作完成后在屏幕角落短暂出现的反馈，不打断当前任务。多条消息自动层叠，悬停或聚焦时展开；需要用户立即处理的信息改用 Alert 或 AlertDialog。",
  category: "反馈",
  source: "coss",
  exports: ["ToastProvider", "toastManager"],
  keywords: ["toast", "notification", "snackbar", "消息", "通知", "轻提示"],
  api: [
    {
      name: "ToastProvider",
      description: "在应用根部挂载一次，负责渲染全部消息。",
      props: [
        { name: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"', description: "消息出现的位置。" },
        { name: "limit", type: "number", default: "3", description: "同时可见的最大数量，超出的旧消息淡出。" },
        { name: "timeout", type: "number", default: "5000", description: "默认自动关闭时间（毫秒），0 表示不自动关闭。" },
      ],
    },
    {
      name: "toastManager.add(options)",
      description: "添加一条消息并返回 id；传入已存在的 id 会原地更新并重新计时。",
      props: [
        { name: "title / description", type: "ReactNode", description: "标题与补充说明。" },
        { name: "type", type: '"success" | "error" | "warning" | "info" | "loading"', description: "决定图标与颜色；loading 显示旋转图标。" },
        { name: "timeout", type: "number", default: "5000", description: "本条的自动关闭时间；带操作按钮时建议延长。" },
        { name: "priority", type: '"low" | "high"', default: '"low"', description: "high 会被读屏器立即播报，用于错误。" },
        { name: "actionProps", type: "ButtonProps", description: "操作按钮，例如“撤销”。" },
        { name: "id", type: "string", description: "自定义 id，用于去重或更新。" },
      ],
    },
    { name: "toastManager.update(id, options)", description: "原地更新一条消息的内容或类型。" },
    { name: "toastManager.promise(promise, { loading, success, error })", description: "随 Promise 状态自动切换：加载中 → 成功 / 失败。" },
    { name: "toastManager.close(id?)", description: "关闭指定消息；不传 id 时关闭全部。" },
    {
      name: "AnchoredToastProvider / anchoredToastManager",
      description: "锚定在某个元素旁的消息，例如复制成功的小提示。用法同上，额外传 positionerProps.anchor；data.tooltipStyle 使用紧凑样式。",
    },
  ],
  keyboard: [
    { keys: "F6", description: "把焦点移到消息区域。" },
    { keys: "Tab", description: "在消息内的操作与关闭按钮之间移动。" },
    { keys: "Esc", description: "关闭当前聚焦的消息。" },
  ],
  notes: [
    "整个应用只挂载一个 ToastProvider，在任何地方调用 toastManager 即可。",
    "标题说结果（“已保存”），说明补充细节；不要把唯一的操作入口只放在消息里，它会自动消失。",
    "悬停或聚焦消息区域时暂停计时并展开层叠；移动端可以左右或向下滑动关闭。",
    "错误消息使用 priority: \"high\"，并给出下一步怎么做。",
  ],
} satisfies ComponentMeta;
