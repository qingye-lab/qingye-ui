import type { ComponentMeta } from "@/lib/types";

export default {
  title: "单选框组 RadioGroup",
  description: "在少量互斥选项中选一个，选项需要同时可见时使用；选项多时改用 Select。",
  category: "表单",
  source: "coss",
  exports: ["RadioGroup", "Radio"],
  keywords: ["radio", "单选", "单选框", "radio group"],
  design: {
    "methods": [
      "名实相符",
      "布白有用"
    ],
    "whenToUse": [
      "同时比较少量互斥方案并选择其中一个。"
    ],
    "avoid": [
      "不可把不同维度的选择混进同一组；选中状态不等于已保存。"
    ],
    "composition": [
      "FieldsetLegend 提供共同问题，每个 Radio 的标签说明不同选项及必要差异。"
    ],
    "stateOwner": {
      "library": [
        "单选值、组内方向键导航、焦点与禁用项。"
      ],
      "application": [
        "方案数据、默认选项与提交结果。"
      ]
    },
    "responsive": [
      "窄屏可以改为纵排，仍同时保留互斥方案；每项命中区不随密度缩小。"
    ],
    "customization": [
      "卡片或文本行都以 Label 组合 Radio，不能重做独立点击状态。"
    ]
  },
  api: [
    {
      name: "RadioGroup",
      description: "Base UI RadioGroup。",
      props: [
        { name: "value / defaultValue / onValueChange", type: "unknown", description: "受控 / 非受控的选中值。" },
        { name: "name / required / disabled / readOnly", type: "string / boolean", description: "表单字段名与状态。" },
        { name: "aria-labelledby", type: "string", description: "指向组标题；或放进 Fieldset 用 FieldsetLegend 命名。" },
      ],
    },
    {
      name: "Radio",
      description: "单个选项（别名 RadioGroupItem）。触屏设备上点击区扩大到 44px。",
      props: [
        { name: "value", type: "unknown", description: "此选项的值。" },
        { name: "disabled", type: "boolean", description: "禁用此选项。" },
        { name: "aria-invalid", type: "boolean", description: "错误边框。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "进入组时聚焦选中项（无选中时为第一项）。" },
    { keys: "↑ ↓ ← →", description: "移动并选中上一个 / 下一个选项。" },
    { keys: "Space", description: "选中当前聚焦项。" },
  ],
  notes: ["整组只有一个 Tab 停靠点，用方向键在选项间移动。", "卡片式选项把整张卡片做成 Label，点击任意处都能选中。"],
} satisfies ComponentMeta;
