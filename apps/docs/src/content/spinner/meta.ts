import type { ComponentMeta } from "@/lib/types";

export default {
  title: "加载指示 Spinner",
  description: "表示正在加载或处理中的旋转指示器。用于等待时间不确定、且不值得显示进度的场景。",
  category: "反馈",
  source: "coss",
  exports: ["Spinner"],
  keywords: ["spinner", "loader", "loading", "加载", "转圈"],
  api: [
    {
      name: "Spinner",
      description: "一个 role=\"status\" 的旋转图标，无障碍名来自 UI 语言（默认「正在加载」）。",
      props: [
        { name: "className", type: "string", description: "用 size-* 控制大小；默认继承父级字号（图标 1em）。" },
      ],
    },
  ],
  notes: [
    "按钮内加载用 Button 的 loading 属性，不要自己塞 Spinner。",
    "小于 200ms 的操作不要显示加载态，否则只会造成闪烁。",
    "已知耗时且有进度时用 Progress，进度不确定才用 Spinner。",
    "容器已有 role=\"status\" 或 aria-busy 时，用 aria-hidden 标记本组件，避免重复播报。",
  ],
} satisfies ComponentMeta;
