import type { ComponentMeta } from "@/lib/types";

export default {
  title: "标签 Label",
  description: "表单控件的可见标签。简单场景直接关联控件；需要说明与校验信息时改用 Field 与 FieldLabel。",
  category: "表单",
  source: "coss",
  exports: ["Label"],
  keywords: ["label", "标签", "表单标签"],
  api: [
    {
      name: "Label",
      description: "渲染 <label>，通过 htmlFor 关联控件，或直接包裹复选框、开关。支持 render 替换元素。",
      props: [
        { name: "htmlFor", type: "string", description: "关联控件的 id。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换渲染元素。" },
      ],
    },
  ],
  notes: [
    "点击标签会聚焦或切换关联的控件，包裹复选框时整行都可点击。",
    "在 Field 中请用 FieldLabel，它会自动关联控件并跟随禁用状态。",
    "必填标记用文字或星号加说明，不要只靠颜色。",
  ],
  design: {
    "methods": [
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "为输入、选择或按钮式字段提供持续可见的名称。"
    ],
    "avoid": [
      "placeholder 独自命名；同一 htmlFor 指向多个控件；装饰的必填星号被当成校验。"
    ],
    "composition": [
      "Label 的 htmlFor 对应唯一控件 id；复杂字段用 Field 的 Label/Description/Error 关系，标签保持对象名称。"
    ],
    "stateOwner": {
      "library": [
        "原生 label、render 和标签文字角色。"
      ],
      "application": [
        "字段 id、名称、必填规则、帮助与校验事实。"
      ]
    },
    "responsive": [
      "长标签允许换行，与对应字段保持邻接；调整密度不缩小可读文字。"
    ],
    "customization": [
      "语义颜色与文字角色集中定义，必要时使用 render 接入原语标签而保留关联。"
    ]
  },
} satisfies ComponentMeta;
