import type { ComponentMeta } from "@/lib/types";

export default {
  title: "展开区 Disclosure",
  description:
    "带样式的单个折叠区：一个标题行加箭头，点击展开次要内容，例如表单里的“高级设置”、卡片里的“构建日志”。并列的多个分节用 Accordion；需要完全自定义触发器用 Collapsible。",
  design: {
    "methods": [
      "布白有用",
      "展开有据",
      "进退相承"
    ],
    "whenToUse": [
      "展开可以跳过的高级设置、日志或次要细节，标题直接说明内容对象。"
    ],
    "avoid": [
      "不能因展开区便利而隐藏关键警告、必填字段或唯一的恢复入口。"
    ],
    "composition": [
      "plain 放入已有表单关系，inset 表达独立边界，separated 承接已有分节；面板默认保留字段。"
    ],
    "stateOwner": {
      "library": [
        "管理单块 open 状态、稳定触发名称、箭头与 aria-expanded；keepMounted 默认保留内容。"
      ],
      "application": [
        "定义内容重要性、有效草稿与敏感字段清除时机；保留 DOM 不等于无限期保存。"
      ]
    },
    "responsive": [
      "整行触发器支持长标签；改变 variant 或布局时检查字段值与焦点仍有效。"
    ],
    "customization": [
      "variant 选择关系边界，不改变提交策略；外部 className 应用于公开触发器与内容部位。"
    ]
  },
  category: "布局",
  source: "local",
  exports: ["Disclosure", "DisclosureTrigger", "DisclosurePanel"],
  keywords: ["disclosure", "展开", "折叠", "高级设置", "更多选项", "详情"],
  api: [
    {
      name: "Disclosure",
      description: "根组件，基于 Collapsible。",
      props: [
        { name: "variant", type: '"plain" | "inset" | "separated"', default: '"plain"', description: "plain：行内文字触发器，放在表单或卡片里；inset：自带边框的独立区块；separated：分隔线下的整行，收尾一个区域。" },
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "展开状态（受控 / 非受控）。" },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "展开状态变化时调用。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用。" },
      ],
    },
    { name: "DisclosureTrigger", description: "标题按钮，末尾的箭头随展开旋转；可放图标或徽章，内容按一行排列。" },
    {
      name: "DisclosurePanel",
      description: "折叠内容，高度与透明度一同过渡，收起比展开更快，可中途反向。别名 DisclosureContent。",
      props: [
        { name: "keepMounted", type: "boolean", default: "true", description: "收起时保留在 DOM 中：其中的表单字段保持取值，页内搜索仍能找到文字。" },
        { name: "className", type: "string", description: "作用于内层内容盒（负责内边距）。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦标题按钮。" },
    { keys: "Enter / Space", description: "展开或收起。" },
  ],
  notes: [
    "只放可以跳过的内容：必填字段、关键警告不要藏进默认收起的展开区。",
    "标题写清楚里面是什么，例如“高级设置（超时、重试）”，而不是“更多”。",
    "需要同时管理多个分节的展开状态时，用 Accordion。",
  ],
} satisfies ComponentMeta;
