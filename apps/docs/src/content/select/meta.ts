import type { ComponentMeta } from "@/lib/types";

export default {
  title: "选择器 Select",
  description: "从一组固定选项中选择一个或多个。选项超过十几个或需要搜索时改用 Combobox。",
  category: "表单",
  source: "coss",
  exports: ["Select", "SelectTrigger", "SelectValue", "SelectPopup", "SelectItem", "SelectGroup", "SelectGroupLabel", "SelectSeparator"],
  keywords: ["select", "下拉", "选择", "dropdown", "picker"],
  design: {
    "methods": [
      "名实相符",
      "展开有据",
      "布白有用"
    ],
    "whenToUse": [
      "选择一个或多个离散值，不需要输入筛选。"
    ],
    "avoid": [
      "命令操作不要放进值选择器；关键选项差异不能只放 Tooltip。"
    ],
    "composition": [
      "Trigger 展示当前值，Popup 中 Item、分组与勾选反馈构成完整选择关系。"
    ],
    "stateOwner": {
      "library": [
        "选择、键盘导航、浮层定位和字段语义。"
      ],
      "application": [
        "选项可用性、当前业务值及提交结果。"
      ]
    },
    "responsive": [
      "触发器允许内容收缩；选项保留完整文字，窄屏不得遮住当前选择。"
    ],
    "customization": [
      "size 调整触发器；render 组合仍遵守值选择语义。"
    ]
  },
  api: [
    {
      name: "Select",
      description: "根组件（Base UI Select.Root）。",
      props: [
        { name: "value / defaultValue / onValueChange", type: "T | T[]", description: "受控 / 非受控的值；multiple 时为数组。" },
        { name: "items", type: "{ label, value }[] | Record<value, label>", description: "值到显示文字的映射，让 SelectValue 在弹层未打开时也能显示标签。" },
        { name: "multiple", type: "boolean", default: "false", description: "多选；弹层在选择后保持打开。" },
        { name: "name / required / disabled", type: "string / boolean", description: "表单字段名、必填与禁用。" },
        { name: "open / defaultOpen / onOpenChange", type: "boolean / (open) => void", description: "受控 / 非受控的弹出状态。" },
      ],
    },
    {
      name: "SelectTrigger",
      description: "触发按钮，外观同 Input。显式 aria-label 优先于 Base UI 自动生成的标签关联。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "与 Input、DatePicker 等高。" },
        { name: "aria-invalid", type: "boolean", description: "错误边框；在 Field 中由校验状态自动设置。" },
      ],
    },
    { name: "SelectValue", description: "显示当前值；placeholder 为空值时的占位文字，children 可为 (value) => ReactNode 自定义显示。" },
    {
      name: "SelectPopup",
      description: "弹出列表（别名 SelectContent）。默认与触发器同宽、贴在其正下方。",
      props: [
        { name: "alignItemWithTrigger", type: "boolean", default: "false", description: "设为 true 时改为 macOS 式：选中项与触发器重叠对齐。" },
        { name: "side / align / sideOffset", type: "string / number", default: '"bottom" / "start" / 4', description: "定位。" },
      ],
    },
    { name: "SelectItem", description: "选项；disabled 时不可选。触屏设备上行高 44px。" },
    { name: "SelectGroup / SelectGroupLabel / SelectSeparator", description: "分组、分组标题与分隔线。" },
    { name: "SelectButton", description: "外观相同的普通按钮，用作 Combobox 等其他弹层的触发器。" },
  ],
  keyboard: [
    { keys: "Enter / Space / ↓ / ↑", description: "打开列表。" },
    { keys: "↓ / ↑", description: "在选项间移动，跳过禁用项。" },
    { keys: "Home / End", description: "跳到第一项 / 最后一项。" },
    { keys: "字母或汉字", description: "跳到以该文字开头的选项。" },
    { keys: "Enter / Space", description: "选中高亮项；单选时关闭列表。" },
    { keys: "Esc / Tab", description: "关闭列表。" },
  ],
  notes: [
    "传入 items，SelectValue 才能在首次渲染时显示标签而不是原始值。",
    "没有可见标签时给 Select 或 SelectTrigger 提供 aria-label。",
    "多选时用 SelectValue 的 children 函数汇总显示，例如「前端、后端 等 3 项」。",
  ],
} satisfies ComponentMeta;
