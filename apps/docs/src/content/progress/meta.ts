import type { ComponentMeta } from "@/lib/types";

export default {
  title: "进度条 Progress",
  description: "显示一项任务的完成进度，如上传、导出、安装。进度未知时用不确定状态；表示容量、占比等静态度量请用 Meter。",
  category: "反馈",
  source: "coss",
  exports: ["Progress", "ProgressLabel", "ProgressValue", "ProgressTrack", "ProgressIndicator"],
  keywords: ["progress", "进度条", "进度", "上传", "upload", "加载", "loading", "indeterminate", "不确定"],
  api: [
    {
      name: "Progress",
      description: "根元素（role=\"progressbar\"）。不传子元素时自动渲染轨道与指示条；需要标签或数值时自行组合各部件。",
      props: [
        { name: "value", type: "number | null", description: "当前进度；传 null 进入不确定状态，指示条改为循环扫过的光带。" },
        { name: "min", type: "number", default: "0", description: "最小值。" },
        { name: "max", type: "number", default: "100", description: "最大值。" },
        { name: "format", type: "Intl.NumberFormatOptions", description: "ProgressValue 与 aria-valuetext 的数字格式；不传时显示百分比。" },
        { name: "locale", type: "Intl.LocalesArgument", description: "格式化数字使用的语言，默认取运行环境。" },
        { name: "getAriaValueText", type: "(formattedValue: string, value: number | null) => string", description: "自定义读屏朗读的进度文本。" },
      ],
    },
    { name: "ProgressLabel", description: "任务名称，自动与进度条关联为可访问名称。" },
    {
      name: "ProgressValue",
      description: "显示当前进度，默认为格式化后的百分比，使用等宽数字。",
      props: [
        { name: "children", type: "(formattedValue: string | null, value: number | null) => ReactNode", description: "自定义显示内容，例如 “302 / 512 MB”。" },
      ],
    },
    { name: "ProgressTrack", description: "轨道，默认 6px 高、全圆角；用 className 调整高度，如 h-1、h-2。" },
    {
      name: "ProgressIndicator",
      description: "指示条，默认主色。用 className 换颜色，可结合状态属性 data-complete / data-progressing / data-indeterminate。",
    },
  ],
  notes: [
    "进度条必须有可访问名称：用 ProgressLabel，或在 Progress 上传 aria-label。",
    "颜色不单独表达结果：完成或失败时同时给出文字或图标。",
    "进度条描述随时间推进的任务；磁盘占用、配额等不会“完成”的数值用 Meter。",
    "不确定状态在系统减少动态效果时改为缓慢的明暗变化。",
  ],
} satisfies ComponentMeta;
