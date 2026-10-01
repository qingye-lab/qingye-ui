import type { ComponentMeta } from "@/lib/types";

export default {
  title: "树 Tree",
  description: "展示层级数据并支持展开、收起与单选，例如文件目录、组织架构、商品类目。完整遵循 WAI-ARIA 树形视图的键盘模型。",
  category: "数据展示",
  source: "local",
  exports: ["Tree", "type TreeNode"],
  keywords: ["tree", "树", "目录", "层级", "文件", "treeview"],
  api: [
    {
      name: "Tree",
      description: "渲染 role=\"tree\" 的 <ul>，子节点位于 role=\"group\" 中；其余属性透传到根元素。",
      props: [
        { name: "nodes", type: "TreeNode[]", description: "节点：{ id, label, children?, icon?, expandedIcon?, suffix?, textValue?, disabled? }。" },
        { name: "label", type: "string", description: "无障碍名称；也可传 aria-labelledby。" },
        { name: "value / defaultValue", type: "string | null", description: "选中的节点 id（单选）。" },
        { name: "onValueChange", type: "(id, node) => void", description: "选中变化。" },
        { name: "expanded / defaultExpanded", type: "string[]", description: "展开的节点 id。" },
        { name: "onExpandedChange", type: "(ids) => void", description: "展开变化。" },
        { name: "expandOnClick", type: "boolean", default: "true", description: "点击父节点整行时同时展开或收起；关闭后只有箭头切换。" },
        { name: "guides", type: "boolean", default: "true", description: "沿展开的分支显示缩进参考线。" },
      ],
    },
    {
      name: "TreeNode",
      description: "节点数据。",
      props: [
        { name: "icon / expandedIcon", type: "ReactNode", description: "前置图标；expandedIcon 在展开时替换，如打开的文件夹。" },
        { name: "suffix", type: "ReactNode", description: "行尾内容，如数量、大小或徽章。" },
        { name: "textValue", type: "string", description: "label 不是纯文本时用于键入查找。" },
        { name: "disabled", type: "boolean", description: "不可聚焦、选中或展开。" },
      ],
    },
  ],
  keyboard: [
    { keys: "↓ / ↑", description: "移动到下一个 / 上一个可见节点，跳过禁用节点。" },
    { keys: "→", description: "展开收起的节点；已展开时移动到第一个子节点。" },
    { keys: "←", description: "收起展开的节点；否则移动到父节点。" },
    { keys: "Home / End", description: "移动到第一个 / 最后一个可见节点。" },
    { keys: "Enter", description: "选中节点；父节点同时展开或收起。" },
    { keys: "Space", description: "选中节点。" },
    { keys: "*", description: "展开当前层级的所有兄弟节点。" },
    { keys: "字母或文字", description: "跳到下一个以输入内容开头的可见节点。" },
  ],
  notes: [
    "树只有一个 Tab 停留点：进入时聚焦上次的节点或选中项，其余节点用方向键到达。",
    "label 为自定义节点时提供 textValue，让键入查找可用。",
    "节点很多时考虑默认只展开第一层，避免一次渲染过深的层级。",
  ],
} satisfies ComponentMeta;
