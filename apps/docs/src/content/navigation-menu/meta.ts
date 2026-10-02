import type { ComponentMeta } from "@/lib/types";

export default {
  title: "导航菜单 NavigationMenu",
  description:
    "网站顶部的主导航：顶层触发器展开内容面板，面板之间切换时弹层平滑改变尺寸、内容沿移动方向淡入。适合官网与文档站；手机上建议改用 Sheet 抽屉菜单。",
  design: {
    "methods": [
      "名实相符",
      "展开有据",
      "随境取度"
    ],
    "whenToUse": [
      "让网站导航地址及其必要分类可直达，面板提供目标选择依据。"
    ],
    "avoid": [
      "不能为了面板效果强迫高频地址逐层探索；内容容量由任务决定，不机械限制为六条链接。"
    ],
    "composition": [
      "直接目标用 Link，分类用 Trigger + Content；需要移动导航时复用 Sheet，完整地址保持一致。"
    ],
    "stateOwner": {
      "library": [
        "管理真实链接的 aria-current、触发面板、焦点与共享定位；内容与退出保持可达。"
      ],
      "application": [
        "维护信息架构、实际路由、权限和进入目标后的返回依据。"
      ]
    },
    "responsive": [
      "触屏不依赖 hover；长标题与描述保留辨认信息，面板超过可用范围时调整布局或提供滚动。"
    ],
    "customization": [
      "共享外观只表达分类与当前页；集中主题调整表面，side / align 依据实际导航对象选择。"
    ]
  },
  category: "导航",
  source: "local",
  exports: [
    "NavigationMenu",
    "NavigationMenuList",
    "NavigationMenuItem",
    "NavigationMenuTrigger",
    "NavigationMenuContent",
    "NavigationMenuLink",
  ],
  keywords: ["navigation menu", "nav", "mega menu", "导航", "顶部导航", "主导航", "下拉导航"],
  api: [
    {
      name: "NavigationMenu",
      description: "根部件，渲染 <nav>，并默认附带一个 NavigationMenuViewport。",
      props: [
        { name: "value / defaultValue / onValueChange", type: "any | null", description: "当前展开的项（受控 / 非受控）；null 表示收起。" },
        { name: "delay / closeDelay", type: "number", default: "50 / 50", description: "悬停打开 / 关闭前的等待毫秒数。" },
        { name: "viewport", type: "boolean", default: "true", description: "设为 false 后可自行放置 NavigationMenuViewport 以调整对齐。" },
      ],
    },
    { name: "NavigationMenuList", description: "顶层项的列表（<ul>）。" },
    { name: "NavigationMenuItem", description: "一个顶层项（<li>）；value 用于受控模式。" },
    { name: "NavigationMenuTrigger", description: "展开面板的按钮，箭头在展开时旋转 180°。" },
    { name: "NavigationMenuContent", description: "面板内容，激活时移入弹层；宽度由内容决定，最大不超过屏幕宽度减 2rem。" },
    {
      name: "NavigationMenuLink",
      description: "面板中的链接；通过 render 接入路由库的 Link。",
      props: [
        { name: "active", type: "boolean", default: "false", description: "当前页面，设置 aria-current=\"page\" 并显示选中底色。" },
        { name: "closeOnClick", type: "boolean", default: "false", description: "点击后收起面板。" },
        { name: "render", type: "ReactElement", description: "例如 <NextLink href=\"/docs\" />。" },
      ],
    },
    {
      name: "NavigationMenuLinkIcon · NavigationMenuLinkTitle · NavigationMenuLinkDescription",
      description: "富链接的图标块、标题与两行以内的说明，放在 NavigationMenuLink 内自动排成两列。",
    },
    {
      name: "navigationMenuTriggerStyle",
      description: "顶层触发器的样式函数；给顶层的普通链接加上 className={navigationMenuTriggerStyle()} 以保持一致。",
    },
    {
      name: "NavigationMenuViewport",
      description: "承载面板的弹层。",
      props: [
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "相对当前触发器的对齐方式。" },
        { name: "sideOffset", type: "number", default: "8", description: "与触发器的距离；间隙内保持悬停不中断。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "在顶层项之间移动；面板展开时进入面板内的链接。" },
    { keys: "Enter / Space", description: "展开或收起当前触发器的面板。" },
    { keys: "← / →", description: "在顶层项之间移动。" },
    { keys: "↓", description: "从触发器进入已展开的面板。" },
    { keys: "Esc", description: "收起面板，焦点回到触发器。" },
  ],
  notes: [
    "面板尺寸与位置的过渡只用 220ms 的缓出，退出更快；减少动态效果时只保留淡入淡出，键盘操作时立即切换。",
    "手机上悬停不可用、面板空间有限，推荐窄屏改用 Sheet 抽屉菜单（见“响应式”示例）；组件本身在窄屏仍可点击使用，面板宽度不会超出屏幕。",
    "按目的地层级与可扫描容量组织面板；空间不足时使用真实分组或独立目录页，不能用截断说明掩盖不同目的地。",
  ],
} satisfies ComponentMeta;
