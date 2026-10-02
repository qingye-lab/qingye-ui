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
  design: {
    "methods": [
      "名实相符",
      "随境取度"
    ],
    "whenToUse": [
      "已知正在等待但无法准确计量，且用户需要辨认等待对象。"
    ],
    "avoid": [
      "重复 status 打断读屏；旋转等于任务成功；关键等待没有名称、失败或退出。"
    ],
    "composition": [
      "独立 Spinner 使用等待名称；Button loading 内部 Spinner 装饰隐藏，由按钮保持动作名称和 aria-busy。"
    ],
    "stateOwner": {
      "library": [
        "加载标记、默认语言与旋转视觉。"
      ],
      "application": [
        "任务等待、上下文名称、结果和中断/退出。"
      ]
    },
    "responsive": [
      "图标大小跟随宿主角色；等待不改变按钮宽度或隐藏仍有效的内容。"
    ],
    "customization": [
      "aria-label 按实际任务覆盖默认加载，重复状态中的图标用 aria-hidden。"
    ]
  },
} satisfies ComponentMeta;
