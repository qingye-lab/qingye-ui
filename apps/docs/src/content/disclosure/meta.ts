import type { ComponentMeta } from "@/lib/types";

export default {
  title: "展开区 Disclosure",
  description:
    "带样式的单个折叠区：一个标题行加箭头，点击展开次要内容，例如表单里的“高级设置”、卡片里的“构建日志”。并列的多个分节用 Accordion；需要完全自定义触发器用 Collapsible。",
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
