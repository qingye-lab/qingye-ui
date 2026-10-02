import type { ComponentMeta } from "@/lib/types";

export default {
  title: "页头 PageHeader",
  description: "页面顶部的标题区：可选面包屑、返回按钮、标题、描述、元信息与操作。操作在空间足够时与标题同行，空间不足时换到下方。",
  category: "布局",
  source: "local",
  exports: [
    "PageHeader",
    "PageHeaderNav",
    "PageHeaderBack",
    "PageHeaderContent",
    "PageHeaderTitle",
    "PageHeaderDescription",
    "PageHeaderMeta",
    "PageHeaderActions",
  ],
  keywords: ["page header", "title", "header", "页头", "页面标题", "标题栏", "返回"],
  api: [
    { name: "PageHeader", description: "<header> 容器。直接放入的 Breadcrumb 会占满一行。布局按自身宽度换行，与视口无关，放在侧栏布局中同样适用。" },
    { name: "PageHeaderNav", description: "占满一行的导航区，放面包屑以外的返回链接、页签等。" },
    {
      name: "PageHeaderBack",
      description: "标题左侧的返回按钮（outline 小图标按钮），aria-label 默认取 locale.back。接受 Button 的全部属性。",
      props: [
        { name: "render", type: "ReactElement", description: "更换返回命令的载体，仍遵循 Button 语义；目的地导航使用 a / Link 配合 buttonVariants。" },
        { name: "onClick", type: "() => void", description: "例如调用 history.back()。" },
      ],
    },
    { name: "PageHeaderContent", description: "标题、描述、元信息的纵向容器，占据剩余宽度。" },
    { name: "PageHeaderTitle", description: "<h1>，移动端 20px、桌面 24px，600 字重。" },
    { name: "PageHeaderDescription", description: "一两句说明，弱化色，最宽 72 个字符。" },
    { name: "PageHeaderMeta", description: "元信息行：Badge、StatusDot、创建时间等，自动换行。" },
    { name: "PageHeaderActions", description: "相关操作区，按当前任务安排次序与强调。" },
  ],
  keyboard: [{ keys: "Tab", description: "依次聚焦面包屑链接、返回按钮与操作按钮。" }],
  notes: [
    "一页只有一个 PageHeaderTitle（<h1>）。",
    "操作不超过三个；更多操作收进「更多」菜单，窄屏时整行换到标题下方。",
    "有面包屑时通常不需要返回按钮，二者择一即可。",
  ],
  design: {
    "methods": [
      "名实相符",
      "展开有据"
    ],
    "whenToUse": [
      "进入一个对象或任务页面时识别主体、范围和返回依据。"
    ],
    "avoid": [
      "标题旁堆满设计解释；历史为空时只有无效返回；把导航链接转成 button 角色。"
    ],
    "composition": [
      "Title 为真实 h1；Nav 承担来路，Meta 说明对象事实，Actions 作用于当前对象；直达页有明确父级出口。"
    ],
    "stateOwner": {
      "library": [
        "标题/事实/动作的解剖、固有换行和 Back 的控件外观。"
      ],
      "application": [
        "路由、返回目标、对象名称、权限与动作状态。"
      ]
    },
    "responsive": [
      "动作按内容空间换到下一行，长标题断行；不靠隐藏关键动作解决窄屏。"
    ],
    "customization": [
      "render 接入合法链接与标题；标题层级、文字角色和强调分别判断。"
    ]
  },
} satisfies ComponentMeta;
