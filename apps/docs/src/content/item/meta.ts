import type { ComponentMeta } from "@/lib/types";

export default {
  title: "条目 Item",
  description: "由媒体、标题、描述和操作组成的一行内容，用于成员列表、设置项、文件、通知等。API 与 shadcn/ui 的 Item 一致。",
  category: "数据展示",
  source: "local",
  exports: [
    "ItemGroup",
    "Item",
    "ItemMedia",
    "ItemContent",
    "ItemTitle",
    "ItemDescription",
    "ItemActions",
    "ItemHeader",
    "ItemFooter",
    "ItemSeparator",
  ],
  keywords: ["item", "list item", "row", "条目", "列表项", "设置项", "成员"],
  api: [
    { name: "ItemGroup", description: "条目列表，role=\"list\"；其中未设置 render 的 Item 自动成为 listitem。默认无间距，配合 ItemSeparator 或 gap-* 使用。" },
    {
      name: "Item",
      description: "一行条目。通过 render 渲染为链接或按钮后获得悬停与键盘焦点样式。",
      props: [
        { name: "variant", type: '"default" | "outline" | "muted"', default: '"default"', description: "default 透明；outline 为带内高光的卡片面；muted 为浅底。" },
        { name: "size", type: '"default" | "sm"', default: '"default"', description: "内边距 16px / 10×12px；sm 在粗指针下最低 44px。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "例如 render={<a href=\"…\" />}。" },
      ],
    },
    {
      name: "ItemMedia",
      description: "左侧媒体；有描述时自动顶部对齐。",
      props: [{ name: "variant", type: '"default" | "icon" | "avatar" | "image"', default: '"default"', description: "icon：带边框的小方块；avatar：对齐 Avatar；image：裁切缩略图并加发丝边。" }],
    },
    { name: "ItemContent", description: "标题与描述的纵向容器，占据剩余宽度。" },
    { name: "ItemTitle", description: "标题，500 字重，可并排放 Badge。" },
    { name: "ItemDescription", description: "描述，弱化色，最多两行。" },
    { name: "ItemActions", description: "右侧操作区。" },
    { name: "ItemHeader / ItemFooter", description: "占满整行的上方 / 下方区域，用于封面图、元信息。" },
    { name: "ItemSeparator", description: "条目间的分隔线。" },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦渲染为链接或按钮的条目，或条目内的操作。" },
    { keys: "Enter", description: "打开链接条目。" },
  ],
  notes: [
    "整个条目可点击时用 render 渲染为 <a>，不要在内部再嵌套按钮或链接。",
    "需要内部操作（如「移除」）时保持 Item 为 div，把操作放在 ItemActions 中。",
    "仅图标的操作按钮必须有 aria-label，并写清对象，例如「移除 林嘉怡」。",
  ],
} satisfies ComponentMeta;
