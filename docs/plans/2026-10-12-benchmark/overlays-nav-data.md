# 浮层 / 导航 / 反馈 / 数据展示 / 布局排版 对标研究

范围:只读调研。仓库 `/Volumes/SUNSANG 1/Codex/qingye-ui`(Base UI 1.7.0 已装,latest 为 1.9.0;React 19;Tailwind 4)。图表族不在范围。
判据:`CLAUDE.md`、`design.md`(NG1–NG12)、`STANDARDS.md`;一个组件一件事;只做真实任务;状态真实;危险后果归对话框。
记号:「已读源码」= 本次读过该文件全文;「UNVERIFIED」= 未在浏览器/运行时复现,只凭源码或二手资料;「未取到」= 抓取失败。外部值、类名、代码一律不抄。

---

## 一、最值得做的 12 项(按 价值/成本 排序)

| # | 项 | 谁在什么任务里受益 | 对标(≥2) | 与 design.md | 成本 | 建议 | 接口提议 / 状态归属 |
|---|---|---|---|---|---|---|---|
| 1 | Field 内多控件重复 id(Radio / SegmentedControlItem / Checkbox) | 屏幕阅读器用户在表单里点标签、`htmlFor` 命中错控件;自动化测试按 id 取元素 | Base UI `Field.Item` 即为此设计(node_modules `field/item/FieldItem.mjs`、`labelable-provider/LabelableProvider.mjs`) | 状态真实性(NG:标签必须指向真实控件) | 小,非破坏 | 采纳 | `Radio`/`SegmentedControlItem` 在 Field 内自动包一层 `FieldItem`(或在组内提供嵌套 LabelableProvider),不新增 prop;状态归 Base UI。见第五节 D1 |
| 2 | Popover 触发器 `controlFocus` 类与 `render={<Button/>}` 冲突 | 键盘用户看到的焦点环被两处样式叠加或互相覆盖 | 同类库触发器只由一处负责焦点样式(未逐库核实) | 焦点一处负责(STANDARDS §5) | 小 | 采纳(先 UNVERIFIED 复现) | 不加 prop;`PopoverTrigger` 检测 `render` 为 Button 时不再附 `controlFocus`。见 D2 |
| 3 | Sidebar 窄轨模式 `PopoverTrigger` 丢 `{...props}`;`side="right"` 物理方向 | 自定义 `aria-label`/`data-*`/事件的使用者无效;RTL 用户弹层出在错侧 | Base UI popover/menu 文档均给 `side` 逻辑值 `inline-start/inline-end`(`docs/react/components/popover.md`,已读) | STANDARDS §9 逻辑方向 | 小 | 采纳 | `side` 改 `inline-end`;trigger 转发 props。见 D3 |
| 4 | TableContainer 永远 `tabIndex=0` | 键盘用户每张表多一个无意义 Tab 停靠点;只有真正可横向滚动时才需要 | React Aria Table、MUI X 的可滚动区只在溢出时可聚焦(React Aria 文档 https://react-aria.adobe.com/Table 已取到;MUI 细节未逐项核) | 不为装饰留可聚焦物 | 小 | 采纳 | 内部用 ResizeObserver/`scrollWidth>clientWidth` 判断后再设 tabIndex;或加 `focusable?: "auto"\|boolean` 默认 `auto`。状态归内部 |
| 5 | Command palette(命令面板) | 重度用户用键盘在大量命令/页面间跳转 | cmdk https://github.com/dip/cmdk ;Mantine Spotlight https://mantine.dev/x/spotlight/ ;Base UI 文档内有 autocomplete 做命令面板的示例(本地 `docs/react/components/autocomplete`,已读) | 真实任务;本库已有 Autocomplete + Dialog,可组合而非新原语 | 中,新增 | 采纳为「组合 + 文档示例」,暂不新建独立原语 | 如新建:`CommandPalette` = `Dialog` + `Autocomplete`,`open/onOpenChange` 受控;快捷键由使用者绑定(不内置全局监听,避免与站点快捷键冲突) |
| 6 | VirtualList 每次渲染 O(n) 且无动态高度 | 长列表(数千行)滚动掉帧 | TanStack Virtual https://tanstack.com/virtual/latest(注意:本仓库**未依赖**);React Aria Table/Tree 内置虚拟化(https://react-aria.adobe.com/Table) | 状态真实;能力要有真实用例 | 中,可非破坏 | 采纳(先做前缀和/二分,再评估是否引入 TanStack Virtual 作为可选 peer) | 保持现有 props;内部用累计偏移数组 + 二分;动态高度走 `measureElement`(待定,观察) |
| 7 | Accordion / Collapsible 未用 `hiddenUntilFound` | 用户在页内查找(Ctrl+F)能命中折叠内容并自动展开 | Base UI accordion/collapsible 文档提供 `hiddenUntilFound`(本地 docs 已读);`hidden="until-found"` Baseline limited:Chrome 102、Firefox 148,Safari 无(webstatus,见第四节) | 内容可发现性 | 小,非破坏 | 采纳为可选 prop,默认关 | `hiddenUntilFound?: boolean`(默认 `false`);展开状态仍归 `open`/`value`。注意与 `motion.css` L236–239 的过渡配合需实测(UNVERIFIED) |
| 8 | Tabs / Breadcrumb / Toolbar 无溢出处理 | 窄容器或项目很多时,标签被截断或撑破布局 | Mantine OverflowList https://mantine.dev/core/overflow-list/ ;Primer Breadcrumbs 溢出(https://primer.style/product/components/breadcrumbs/);Fluent Overflow(storybook **未取到**) | 一件事:溢出项收进菜单是导航自身任务;但不新建通用 Overflow 原语 | 中,新增 | 先对 Breadcrumb 采纳(折叠中间项为 Menu),Tabs/Toolbar 观察 | `Breadcrumb` 增 `maxItems?: number`(默认不折叠),折叠项用 `Menu`;状态无 |
| 9 | Tree 的 ARIA 结构与可访问名 | 屏幕阅读器用户:treeitem 带 `aria-label` 会覆盖内容文本;嵌套 toggle 按钮在 treeitem 内重复朗读 | React Aria Tree https://react-aria.adobe.com/Tree ;MUI X Tree View https://mui.com/x/react-tree-view/ ;均以 treeitem 自身承载名称与展开 | a11y 为硬要求 | 小–中,可能影响现有 API | 采纳(先 UNVERIFIED 用读屏复现) | `tree.tsx` L131;不新增 prop,改为 treeitem 自带名称,展开图标 `aria-hidden` |
| 10 | 标题与短文本的 `text-wrap: balance / pretty` | 阅读者:标题、Empty/Alert 短句不再出现孤字行 | 浏览器能力(webstatus):`balance` Baseline newly 2024-05-13;`pretty` limited(Chrome 117、Safari 26,无 Firefox) | 排版合宜 | 小,纯 CSS | 采纳 `balance`(标题族);`pretty` 观察 | 在 `typography.tsx` 标题档、`page-header`、`empty` 标题用工具类;无 prop。当前 `packages/ui` 内 grep 无任何 text-wrap 使用 |
| 11 | HoverCard `delay` 默认 0 | 鼠标划过触发器就弹出,用户路过也触发 | Radix / Base UI 的 hover-card 都有非零打开延迟(Radix 文档未取到页面;Base UI 本地 docs 已读,具体默认值本报告未逐字核对 → UNVERIFIED) | 不打扰 | 小,行为变更(破坏外观约定,须在提交说明写明) | 采纳需用户裁决;`docs/content/hover-card/meta.ts` 把 0 标为「当前选择」,属预设而非推导 | 沿用 `delay` / 增 `closeDelay`;默认值待裁决 |
| 12 | TanStack Table v9 兼容 | 使用者升级后 `DataTable` 不可用 | npm `latest` 现为 9.2.8(https://registry.npmjs.org/@tanstack/react-table);v9 用 `tableFeatures()` 新 API;迁移指南**未取到**(HTTP 500) | 维护 | 大,可能破坏 | 观察;peer 保持 ^8.21.3,在文档写明 | 无 |

---

## 二、逐组件表

格式:缺口(对标)/ 本库更好(保留)/ 建议。「—」= 无需动。只列有结论者;未列出的细项见第五节缺陷。

### 浮层

| 组件 | 缺口 | 本库更好 | 建议 |
|---|---|---|---|
| dialog | `modal` 被 `Omit`(dialog.tsx L12/L17),固定完整阻断:与 design.md「一件事」一致;peers(Base UI dialog.md、Radix)允许 `modal=false`/trap-focus。 | 阻断模式固定,不给「半模态」组合爆炸 | 不采纳 `modal`;非模态场景归 Popover/Drawer |
| alert-dialog | — | 与 ConfirmAction 配合,后果归对话框,符合 design.md | 保持 |
| drawer | `swipe` 手势/吸附点(Vaul https://vaul.emilkowal.ski/api;Base UI drawer.md 有 snap points) | 窄屏 Sidebar 浮层复用 Drawer | 观察;无桌面真实任务(用户已裁:页面无需移动适配) |
| popover | D2 | — | 修缺陷 |
| hover-card | 第一节 #11 | — | 待裁决 |
| tooltip | 无「提供者共享延迟」之外缺口(Base UI tooltip.md 已读) | 文案走 locale | — |
| menu / context-menu | `Menubar`(Base UI 有 menubar.md,已读)缺失,见第三节 | — | 观察 |
| toast | 见 D4;peers:Sonner https://sonner.emilkowal.ski/toast 、React Aria Toast https://react-aria.adobe.com/Toast 、shadcn 2026-07 toast 更新 https://ui.shadcn.com/docs/changelog/2026-07-toast(页面已取到,本报告未据此下具体结论) | `limit` 默认 3、promise/close 规则已在 meta 写明;自带 role/aria-live 策略比库默认更克制 | 复核 D4 |

### 导航

| 组件 | 缺口 | 本库更好 | 建议 |
|---|---|---|---|
| breadcrumb | 溢出折叠(Primer、Mantine) | 逻辑方向与 RTL 翻转已做 | 第一节 #8 |
| navigation-menu | — | 复用 nav-line | — |
| pagination | 对标 Mantine https://mantine.dev/core/pagination/ 、MUI https://mui.com/material-ui/react-pagination/ 、Primer https://primer.style/product/components/pagination/ 有 `siblings/boundaries` 概念 | 已读源码,页码窗口逻辑在本库内(未逐行比较)| UNVERIFIED:是否已有省略号窗口;需 owner 对照 |
| tabs | 溢出滚动/菜单(Ant Tabs https://ant.design/components/tabs 有) | 下划线由 nav-line 统一 | 观察 |
| sidebar | D3 | shadcn Sidebar https://ui.shadcn.com/docs/components/sidebar 功能更多(可折叠分组、键盘快捷键),本库收敛更小 | 保持小;不追 shadcn 全量 |
| toc / steps / link / toolbar / page-header / locale-switch | 无高价值缺口 | — | — |

### 反馈

| 组件 | 缺口 | 本库更好 | 建议 |
|---|---|---|---|
| alert | Banner/Callout 区分见第三节 | — | — |
| empty | Carbon https://carbondesignsystem.com/components/empty-state/usage/ **未取到**;Mantine https://mantine.dev/core/empty-state/ 已取到 | 不带说明书式文案 | — |
| skeleton / progress / meter / status-dot / badge / corner-mark / pending-value | 无通用缺口。`pending-value`、`corner-mark` 是本库独有 | 真实状态、等待周期统一 | 保持 |

### 数据展示

| 组件 | 缺口 | 本库更好 | 建议 |
|---|---|---|---|
| table / data-table | 列固定(TanStack https://tanstack.com/table/latest/docs/framework/react/guide/column-pinning)、虚拟化 | `aria-sort` 与排序按钮的 sr-only 文案已做(data-table.tsx L36/L46);`aria-busy` 已有(L32) | 列固定观察;D5 |
| virtual-list | 第一节 #6 | — | — |
| tree | #9 | — | — |
| accordion / collapsible | #7 | 过渡只动 opacity,避免布局抖动 | — |
| 其余(description-list、timeline、stat、item、card、avatar、code-block、kbd、bulk-action-bar) | 无高价值缺口。Chakra CodeBlock https://www.chakra-ui.com/docs/components/code-block 有行高亮/文件标签,观察 | `copy-button` 复用 `use-copy-to-clipboard` | — |

### 布局排版

layout、section、separator、scroll-area(Base UI scroll-area.md 已读)、button、button-group、typography、prose:无高价值缺口;唯一项是 #10。

---

## 三、缺失组件

| 组件 | 真实任务 | 对标 | 建议与理由 |
|---|---|---|---|
| Command palette | 键盘跳转 | cmdk、Mantine Spotlight、Base UI 示例 | **采纳(组合)**,见 #5 |
| Spinner | 等待中的不定量指示 | 多库自带 | 不采纳(沿用已有裁决):已有 Progress / Skeleton / pending-value 覆盖;无新证据推翻 |
| Banner / Callout | 页面级持久通知 | Primer Banner https://primer.style/product/components/banner/ | 观察:`Alert` 已覆盖内联;页面级持久条需真实场景才加 |
| Carousel | 横向切换内容 | shadcn、Mantine | 不采纳(沿用已有裁决)。CSS `scroll-markers` 仍为 limited(webstatus,仅 Chromium) |
| Splitter / Resizable | 用户调整两栏宽度 | Ant https://ant.design/components/splitter ;shadcn https://ui.shadcn.com/docs/components/resizable | **观察→倾向采纳**:IDE/邮件类布局的真实任务,必须键盘可调(窗口分隔条 ARIA 角色);成本中。需用户裁决 |
| Stepper 交互 | 向导中的步骤导航 | — | `Steps` 为展示;交互步骤应由页面状态驱动,不采纳新组件 |
| Tour | 新手引导 | — | 不采纳:易成说明书式 UI(CLAUDE.md 网站规则) |
| Popconfirm | 行内二次确认 | Ant | 不采纳:本库已有 AlertDialog + ConfirmAction,后果归对话框 |
| Notification Center | 通知列表 | — | 观察:无真实用例 |
| Kanban | 看板拖拽 | — | 不采纳:业务组件 |
| Calendar / Scheduler | 日期 | 本库已有 calendar / date-picker | Scheduler 不采纳 |
| Image / Lightbox | 看大图 | — | 观察 |
| QRCode / Watermark / Marquee | 装饰或特定业务 | — | 不采纳 |
| Affix / BackToTop | 固定与回顶 | — | 不采纳:`position: sticky` 已是平台能力 |
| Masonry | 瀑布流 | CSS `grid-lanes`(webstatus:Baseline limited,仅 Safari 26.4) | 观察 |
| Menubar | 应用菜单栏 | Base UI menubar.md | 观察:仅桌面应用式场景 |
| Chip / Tag | 已确认项 | 本库 TagInput、Combobox 多选共用 `chip.ts` | 已有,不单列 |
| List / Listbox | 可选项列表 | Select / Combobox 内部已有 | 不单列 |
| Comment / Chat | 对话 | shadcn 2026-06 chat components https://ui.shadcn.com/docs/changelog/2026-06-chat-components | 不采纳(沿用「无 AI chat」裁决) |
| Diff view / JSON viewer | 代码比对 / 数据查看 | — | 观察:`CodeBlock` 已有 |

---

## 四、2025–2026 趋势(数据来自 api.webstatus.dev)

| 趋势 | 事实与来源 | 兼容性(Baseline) | 本库现状 | 建议 |
|---|---|---|---|---|
| `dialog closedby` | https://api.webstatus.dev/v1/features/dialog-closedby | limited;Chrome 134(2025-03-04)、Firefox 141(2025-07-22),Safari 无 | 对话框由 Base UI 管理,不用原生 `<dialog>`;packages/ui 内 grep 无 `closedby` | 不采纳:Base UI 自处理外部点击/Esc |
| Popover API | https://api.webstatus.dev/v1/features?q=name:%22popover%22 | `popover` baseline low,low_date 2025-01-27(Safari iOS 18.3) | 未用,浮层走 Base UI | 观察 |
| `popover=hint` | 同上 | baseline none;Chrome 151(2026-07-28)、Firefox 153(2026-07-21),Safari 无 | 未用 | 不采纳 |
| Invoker Commands(`commandfor`) | https://api.webstatus.dev/v1/features/invoker-commands | newly,low_date 2025-12-12;Chrome 135、Firefox 144、Safari 26.2 | 未用(事件由 React 处理) | 观察:React 内无收益 |
| CSS anchor positioning | https://api.webstatus.dev/v1/features/anchor-positioning | 聚合结果只列 Safari 27(2026-09-14),baseline limited;**该聚合似不完整,UNVERIFIED**。子特征:动画 Chrome 125/Safari 26;transforms Chrome 144 | Base UI 用 JS 定位并暴露 `--available-height` 等变量(combobox.tsx L93 等使用) | 不采纳:现方案可用;待 baseline 变 newly 再评估 |
| `@starting-style` | https://api.webstatus.dev/v1/features/starting-style | newly,low_date 2024-08-06 | 本库用 Base UI 的 `data-starting-style`/`data-ending-style`(`motion.css`),grep 无 `@starting-style` 规则 | 不需要:现机制完整 |
| `transition-behavior: allow-discrete` | https://api.webstatus.dev/v1/features/transition-behavior | newly,low_date 2024-08-06 | grep 无 | 同上 |
| `interpolate-size` / `calc-size()` | https://api.webstatus.dev/v1/features?q=name:%22calc-size%22%20OR%20name:%22interpolate%22 | limited,仅 Chromium 129 | 折叠动画仅 opacity(motion.css L236–239) | 观察:Firefox/Safari 缺,不可依赖 |
| View Transitions | https://api.webstatus.dev/v1/features/view-transitions | **未取到可读结果** | grep 无 | 观察 |
| scroll-driven animations | https://api.webstatus.dev/v1/features/scroll-driven-animations | **未取到可读结果** | grep 无 | 观察 |
| `scrollbar-gutter` | https://api.webstatus.dev/v1/features/scrollbar-gutter | newly,low_date 2024-12-11 | Dialog/ScrollArea 内 grep 无 `scrollbar-gutter`;Base UI 自带锁滚处理(UNVERIFIED 是否补偿滚动条宽度) | 采纳(小):弹层打开时避免页面横向抖动;先在浏览器实测 |
| 容器查询(尺寸) | https://api.webstatus.dev/v1/features?q=name:container&page_size=20 | `container-queries` widely(low 2023-02-14,high 2025-08-14);name-only newly 2026-05-07;style queries newly 2026-05-19 | grep `@container` 无使用 | 观察:组件内联响应可用,但无紧迫任务 |
| `scroll-state()` 容器查询 | https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries | limited,仅 Chromium 133 | 无 | 不采纳(无法跨浏览器) |
| `content-visibility` | https://api.webstatus.dev/v1/features/content-visibility | newly,low_date 2025-09-15 | 无 | 观察:对长 Table/列表有收益,须实测滚动条与查找行为 |
| `text-wrap: balance / pretty` | .../text-wrap-balance、.../text-wrap-pretty | balance newly 2024-05-13;pretty limited(Chrome 117、Safari 26) | grep 无 | 采纳 balance,见 #10 |
| `<details name>` | https://api.webstatus.dev/v1/features/details-name | newly,low_date 2024-09-03 | Accordion 基于 Base UI,不用原生 details | 不采纳:已有 `Accordion` |
| `inert` | https://api.webstatus.dev/v1/features/inert | widely(low 2023-04-11,high 2025-10-11) | grep 无直接使用;Base UI 自管 | 观察 |
| `overscroll-behavior` | https://api.webstatus.dev/v1/features/overscroll-behavior | 结果显示 limited(Chrome 144、Firefox 150,Safari 无条目)——与常识不符,**UNVERIFIED**;MDN 页**未取到** | 已在 select/combobox/autocomplete 的 List 使用 `overscroll-contain`;drawer 也有(drawer.tsx L39) | 保持 |
| `hidden="until-found"` | https://api.webstatus.dev/v1/features?q=name:%22until-found%22 | limited;Chrome 102、Firefox 148,Safari 无 | 未用 | 见 #7 |

---

## 五、已有缺陷(a11y / 键盘 / 焦点 / RTL / id)

均凭源码,**未跑浏览器**,除非另注。

- **D1 Field 内重复 id(UNVERIFIED 运行时,源码证据明确)**。机制:Base UI `useLabelableId` 返回 `controlId ?? defaultId`,即使显式传了 `id`;`Field` 只建一个共享 `controlId`,只有 `Field.Item` 才建嵌套 provider(`field/item/FieldItem.mjs`、`labelable-provider/LabelableProvider.mjs`)。受影响:
  - `segmented-control.tsx` `SegmentedControlItem`(`nativeButton=true`,`render=<button/>`):Field 内每段拿到同一个 `controlId`。复现页:`apps/docs/src/content/segmented-control/demos/01-values.tsx`、`02-states.tsx`。
  - `radio-group.tsx` `Radio`:同机制。
  - `Checkbox`:`CheckboxRoot` 用 `idProp || controlId`,仅在未传 id 且置于同一 Field 的多个 Checkbox 时重复。`checkbox-group.tsx` 已读,建议核对。
  - `Switch`:`SwitchRoot` 同类,未逐项核对。
- **D2 popover.tsx L28–43**:`controlFocus` 同时加在触发器与关闭上,即使 `render={<Button/>}`;Button 自带焦点类,可能叠加。UNVERIFIED。
- **D3 sidebar.tsx L177**:窄轨模式 `PopoverTrigger` 未展开 `{...props}`;L137 `side="right"` 为物理方向,RTL 下错侧。menu.tsx L63 的子菜单箭头已用 `rtl:rotate-180`,作为对照。
- **D4 toast.tsx**:L87 的 role/aria-live 逻辑与 L124–133 viewport `aria-live="off"` 覆盖了 Base UI 默认(region + polite + 隐藏 `role=alert` 高优先级播报,见 `toast/viewport/ToastViewport.mjs`、`toast/root/ToastRoot.mjs`)。逐条 `role="status"` 在 viewport 关闭 live 后,新增 toast 是否被读出,**UNVERIFIED**,须读屏实测。
- **D5 table.tsx L32**:`TableContainer` 永远 `tabIndex: 0`(见 #4)。
- **D6 virtual-list.tsx L24–25、L46**:每次渲染 O(n)(见 #6)。
- **D7 tree.tsx L131、L122**:`aria-label` + 嵌套 toggle 按钮;L122 仅首字符 typeahead(见 #9)。
- **D8 accordion.tsx L21 / collapsible.tsx L16** 不用 `hiddenUntilFound`(见 #7)。
- **D9 TanStack**:仓库未依赖 TanStack Virtual,任务背景若写「已用」应更正;Table v9 已为 latest(见 #12)。

---

## 六、未取到 / 未验证

- 未取到:Ark UI 文档(404 两次)、MDN overscroll-behavior(连接被关)、Carbon EmptyState(404)、TanStack Table 迁移指南(HTTP 500)、React Aria releases(无列表)、Fluent Overflow storybook(仅标题)、Radix releases 与 Mantine 8.0 changelog 仅取到页面,未据此下结论。
- webstatus 对 `view-transitions`、`scroll-driven-animations` 的返回本报告未保留可读数据,不下结论。
- `anchor-positioning` 聚合只列 Safari 27、`overscroll-behavior` 显示 limited,两处与常识不符,疑似数据不全,均 UNVERIFIED。
- 未做:任何浏览器/读屏实测;`prose.tsx` 仅浏览头部注释;未逐库核对 hover-card 延迟默认值、pagination 窗口逻辑。
- 外部库只比较了能力名称与 API 概念,未复制任何值/代码。
