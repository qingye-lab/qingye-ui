# 交互、浮层与导航家族：逐组件设计处置

日期：2026-10-02。负责人：`component_surfaces`；主 agent 是本轮唯一浏览器 owner。

本批从根 `design.md` 的任务、对象、语义、内容关系与进入退出判断出发，覆盖 28 个组件。coss 只作为可替换实现来源；Base UI 的键盘、模态、定位等能力另行评价。保留成熟实现不等于全项验收通过。原始上游目录、共享 token、locale、index、派生 catalog 与来源 manifest 均不由本 agent 修改；主 agent 统一生成并归档。保留官网、指南与其他家族的并行改动。

## 设计取舍与真实消费

- 命令、地址、保持模式、字段值与切换面板分别采用 Button、真实链接、Toggle、Radio/Select 与 Tabs 语义。没有为了统一外观把它们改成同一种状态机。
- 浮层为当前对象提供必要的工作空间或补充信息。只读预览与 Tooltip 保留直达来源；可交互内容采用 Popover；独立任务采用 Dialog/Sheet/Drawer；需要明确回应的危险后果采用 AlertDialog。关闭界面与撤销、取消请求、业务成功仍由应用分别定义。
- 发现并修复了具体的公共缺口：纵向 ToggleGroup 默认变体方向不实；Sidebar 非受控观察回调阻止更新、快捷键干扰编辑、受控请求被错误持久化、移动关闭隐藏与属性丢失；Pagination 自定义 render 可以重新恢复已禁用目的地；Accordion 无法调整标题层级；长标签和浮层容量不足、危险菜单高亮语义被覆盖。
- 所有 28 个 `apps/docs/src/content/<slug>/meta.ts` 写入独立 `design`：使用与避免条件、组合关系、库与应用状态归属、响应式取舍和修改入口。纠正了固定按钮数量、六链接限制、分页必须 render Button 等与任务或当前 API 不符的旧说明。主 agent 修复 design 合并优先级后统一发布。

## 28 项处置表

“保留”表示有具体保留理由；表内证据范围以实际运行记录为准。颜色、几何、浏览器焦点循环与触屏不能由 jsdom 结果代替。

| 组件 | 处置与任务关系 | 状态、键盘与进入退出 | 验证边界 |
| --- | --- | --- | --- |
| Button | 保留命令按钮、尺寸角色与 loading 保宽结构；动作强调依据当前后果，不固定四级。地址导航在真实 a/Link 上应用 `buttonVariants`。 | 原生 type 默认 button、提交显式 submit；loading 表示忙碌与禁止重复激活，成功/失败由应用决定。 | 原生角色、禁用与 form 默认 type 测试 PASS；本批未修改源。真实 loading 视觉与触屏须主 agent 验证。 |
| ButtonGroup | 保留 Group 的别名导出，不为命名别名复制实现；拼接表达围绕同一对象的相关动作。 | 不创建互斥选择或方向键；子控件保留本身语义与焦点。 | 别名和组合源核对；相邻粗指针命中区 UNVERIFIED。 |
| Group | 保留组边界、拼接圆角、焦点层次；子项可有不同动作强度。GroupText 的单位不能代替标签。 | `render` 可接 Label；字段值和提交由应用，方向键漫游需要 Toolbar。 | 源核对与 metadata 完成；窄屏输入可用宽度、命中区 UNVERIFIED。 |
| Toggle | 保留 Base UI pressed 状态与稳定动作名称，适用于保持模式或格式。 | aria-pressed 表达已选状态，方向键焦点不被冒充执行；即时命令采用 Button。 | 源核对；通过 ToggleGroup 组合回归覆盖按下与禁用。独立视觉 UNVERIFIED。 |
| ToggleGroup | 修复 default 与 outline 的 vertical 布局一致性；纵向示例同时呈现两种变体。 | 保留单/多选、方向键移动与 Enter 激活，焦点移动不自动选择。 | 两变体焦点、End、Enter、disabled 与 pressed 测试 PASS；布局 bbox 和触屏待主 agent。 |
| SegmentedControl | 保留纯样式工具，外形不自动决定 role。RadioGroup 选择值，ToggleGroup 保持模式，Link 表示地址，Tabs 表示面板。 | 只响应 checked/pressed/aria-current 属性；状态机由所选原语负责。 | 样式与真实组合源核对；各组合长文本和命中区 UNVERIFIED。 |
| Tabs | 保留 tab/tablist/tabpanel 关联和四种关系边界；指示器使用共享展开时长、缓动。 | 选中面板与键盘焦点由原语；需要保留的编辑采用 keepMounted 或稳定应用状态 owner。 | 四项关联/默认/键盘/disabled 测试 PASS；指示器几何及减少动态效果待浏览器。 |
| Accordion | 增加 `headerProps`，允许真实 h2/h3 标题层级；触发器与箭头分别占位，收起更快。 | 保留单开/多开和 aria-expanded/controls；keepMounted 明确保留字段，关键后果不能仅藏于关闭章节。 | 标题 level、关联、禁用和收起后字段保留测试 PASS；长标题与动画待浏览器。 |
| Collapsible | 保留自定义单块展开原语；统一公共进入/退出时长与缓动，不新增业务状态。 | open/aria-expanded/panel 关系保留；关闭仅表示收起，应用决定草稿保留。 | 源核对及 Sidebar 实际组合回归；动画中断与 reduced-motion UNVERIFIED。 |
| Disclosure | 保留已区分 plain/inset/separated 的关系结构；没有强制全部内容套卡片。 | 默认 keepMounted 保留字段；触发名称、展开与箭头共享状态，应用决定敏感数据清除。 | 三变体、字段保留、aria-expanded、键盘展开测试 PASS；长标签与真实焦点可见性待浏览器。 |
| Dialog | 在存在直接内置 Close 时为 Header 保留逻辑末端空间，防止长标题覆盖退出。 | 保留模态、名称说明、close 请求与焦点返回；保存/撤销/取消请求不与关闭等同。 | 打开、名称、Escape、Close、背景隐藏和焦点返回测试 PASS；几何与真实 Tab 循环待浏览器。 |
| AlertDialog | 保留需要明确回应的危险任务结构与遮罩不关闭语义；没有增加通用确认障碍。 | 对象与后果明确，初始焦点按任务显式设置；异步失败或未知结果由应用处理，不能请求发出就关闭当成功。 | alertdialog 名称、后果内容与 Escape 测试 PASS；实际取消初始焦点和长后果操作可达性 UNVERIFIED。 |
| Sheet | 与 Dialog 同步保留有内置 Close 时的 Header 退出空间；侧向详情工作保留列表上下文。 | 名称、焦点限制/返回与退出由原语；草稿、保存与应用筛选由应用。 | 名称、side 与 Escape 测试 PASS；移动安全区、长内容与关闭空间待浏览器。 |
| Drawer | 有内置 Close 时保留标题退出空间；危险动作在 hover/focus 下保持危险文字，已有 450ms 手势过渡读取公共 drawer 缓动。 | 保留拖动/吸附/嵌套原语与可点退出；手势关闭不被视作已取消后台任务。 | 名称、打开与关闭测试 PASS；真实拖动/嵌套/snap 与触屏 NOT_RUN。 |
| Popover | 保留与触发对象相邻的短表单或可交互帮助；不把它混成纯悬停提示。 | 原语负责位置、碰撞、焦点及 close 请求；应用负责字段验证、保存与错误恢复。 | 源和组合核对；长表单、短视口、焦点及真实点击退出 UNVERIFIED。 |
| PreviewCard | 增加可用宽高限制、长词换行与内部滚动；保留真实链接直达完整内容。 | 悬停/焦点预览仅供补充，不承载唯一任务或唯一关键事实；交互帮助采用 Popover。 | 源与 link 组合核对；短视口、长摘要和 hover/focus 真实行为待浏览器。 |
| HoverCard | 保留 PreviewCard 别名，共享修复而不分裂状态与主题。 | 同一链接可以直接抵达；触屏不依赖 hover 才获得必需内容。 | 别名源核对；继承 PreviewCard 的浏览器验证边界。 |
| Tooltip | 增加可用宽度与长词换行；保留延迟和焦点补充用途。 | 控件仍有独立 aria-label；Tooltip 不承载交互、关键后果或唯一错误恢复。 | 源核对；长词、Esc、触屏替代与共享 popup resize 动画待浏览器。 |
| Menu | 公共 min/max 宽度、可滚动内容部位、长标签网格修复；危险项高亮仍危险；Shortcut 不再额外降低辅助文字对比；RTL 子菜单箭头跟随方向。 | Item/LinkItem/Checkbox/Radio 对应命令/地址/保持值；继续复用原语键盘、高亮与焦点返回。 | 静态颜色规则 PASS；长词、危险高亮、真实对比、子菜单与触屏待浏览器。 |
| ContextMenu | 与 Menu 保持同一内容、危险状态和长文本边界，按右键/长按定位当前对象。 | 仅提供加速入口；应用仍需可见等价操作与真实对象/权限，原语管理上下文键盘与返回。 | 静态颜色规则 PASS；上下文菜单键盘、长按及可见替代的消费验证 UNVERIFIED。 |
| Menubar | 保留局部命令工作面的顶层漫游结构，内容复用 Menu 修复；网站地址层级不用 menubar 冒充。 | 原语负责相邻菜单切换；快捷键展示不代表已注册，应用维护正文选中内容与命令后果。 | 源核对；顶层漫游、触屏目标、真实正文选择恢复 UNVERIFIED。 |
| NavigationMenu | 保留真实地址、分类触发与共享 popup，不因为 coss 来源决定重写；文档去掉机械六链接上限。 | 链接 aria-current 与分类展开由原语；信息架构和目标页返回由应用，窄屏可改用 Sheet。 | 源核对；短视口多内容、默认截断后的辨认性与 overflow-hidden 可达性 UNVERIFIED，已单独交主 agent。 |
| Breadcrumb | 保留命名 nav/ol、当前页和装饰分隔；真实层级不同于浏览历史。 | 上级保持真实 href；中间层折叠必须用有名 Menu trigger 保留可达性，应用恢复筛选/滚动。 | nav 名称、aria-current 与自定义链接测试 PASS；长层级及触屏组合 UNVERIFIED。 |
| Pagination | render 路由链接也获得公共页码样式；disabled 转为无 href 原生链接占位，保留内容、名称、className/style，opaque Link 不再生成 to 对应 href；省略页说明可被辅助技术读取。 | disabled 退出 Tab、阻止 click/auxclick；enabled 保留真实链接。过滤、数据加载、失败后旧内容由应用。 | 七项 native/element/function/opaque-router/样式内容/禁用/ellipsis/Tab 相关回归 PASS；浏览器 native context menu 待主 agent。 |
| Steps | 错误标记改为现有成对 destructive-fill/on-fill 角色，长文本换行，可点击步骤粗指针最小 44px。 | 有序步骤与真实 aria-current；current 默认推导可被 item.status 覆盖；完成、错误、可跳步条件由应用。 | 四项状态覆盖、disabled 与横竖方向键测试 PASS；错误真实对比、长名称和触屏待浏览器。 |
| Sidebar | 修复状态 owner、快捷键冲突、受控持久化、属性和 style 转发；手机有可见工作区导航标题与关闭，当前项有 aria-current。 | onOpenChange 可仅观察非受控变化；preventDefault 可取消 Trigger；编辑/IME/repeat/已处理按键不抢占；Cookie 仅反映已接受状态。 | 八项回归 PASS，含移动标题/关闭名称、返回焦点、默认宽度与调用方 style 同时保留；真实布局与命中区待主 agent。 |
| Toolbar | 保留对同一对象工作的方向键漫游，Group 与 Separator 提供真实关系；按钮外观复用 Button/Toggle。 | ToolbarInput 保留字段键盘编辑；正文选择与执行结果属于编辑器应用，不能由焦点漫游自动恢复。 | 源和 docs 组合核对；方向键、输入冲突与编辑选择恢复 UNVERIFIED。 |
| Command | 保留 Base UI 搜索/高亮/执行入口和外部 Dialog owner；Shortcut 文字不再额外淡化或压缩。 | 空匹配不等于加载/失败；执行入口不等于请求成功；内嵌输入 autoFocus=false 可保留既有工作。 | 七项列表、过滤、空态、click、ArrowDown/Enter、Dialog Escape/焦点返回、分组测试 PASS；窄屏长目标与 Shortcut 实际对比待浏览器。 |

## 外观与组合合同变化

这些变化明确列出，不归入“无外观影响 refactor”：

1. **Sidebar 手机**增加可见“工作区导航”标题行与“关闭”按钮；内容从满高改为剩余空间的可收缩列。18rem 默认宽度受视口减 3rem 限制，原生属性/className/style 正确进入移动 Popup。第一方三个局部 demo 将 `absolute h-full` 改为 `md:absolute md:h-full`，避免修正转发后定位污染手机 Sheet。
2. **ToggleGroup 默认纵向**现在真正纵向排列。outline 视觉不改变。纵向 demo 同时展示两变体，以暴露曾被单一 outline 示例掩盖的问题。
3. **Dialog/Sheet/Drawer Header**在存在直接内置 Close 时增加逻辑末端留位，长标题可换行而不与退出重叠；无 Close 时不增加这项空间。内置 Close 获得明确 data-slot。
4. **Menu/ContextMenu**默认 min-width=8rem 且最大宽度受可用窗口限制；过长标签、Checkbox/Radio 标签换行，快捷键保持独立宽度且颜色更清楚；危险项被高亮时仍显示危险文字；RTL 子菜单箭头镜像。Menubar 通过复用 Menu 继承这些差异。
5. **PreviewCard/HoverCard/Tooltip**的长词会换行；预览卡长内容在可用高度内滚动，而非超出视口。
6. **Steps**错误标记使用主题成对语义色；长标题/描述可换行；粗指针下可点击步骤独立维持最小 44px 命中尺寸。
7. **Accordion/Collapsible/Tabs**进入相关过渡从 200ms 改为现有 base 220ms 和 ease-out；Accordion/Collapsible 收起读取 fast 140ms。Accordion 焦点宽度读取现有按钮角色，触发器不再 transition-all；可用 headerProps 改变真实标题层级。Drawer 缓动数值与原来相同，仍为既有 450ms。
8. **Pagination render**现在与默认页码共享样式；disabled 时不实例化 opaque 路由组件，输出无目的地原生链接占位。这会切换 render 子组件挂载生命周期，但保留标签、可访问名称、className 与 style；enabled 仍用真实组件。第一方目前没有依赖 disabled render 内部生命周期的消费者。函数 render 仍会被求值以提取元素内容，必须遵守 React render 的纯函数约定。省略号辅助说明现在可被读取。
9. **Command Shortcut**移除额外 /72 文字透明度，并不再被 flex 压缩。真实主题对比由浏览器复核。

## 实际运行的检查

| 检查 | 结果 | 覆盖范围 |
| --- | --- | --- |
| 修复前定向 Sidebar 回归 | FAIL，随后修复 | 非受控观察回调、取消点击、编辑快捷键、aria-expanded 等四个问题有复现。 |
| 修复前定向 Pagination render 回归 | FAIL，随后修复 | 自带 href 的 render 元素重新恢复已禁用目的地；后续增加 opaque RouterLink `to` 和函数 render 回归。 |
| focused 4 文件 | PASS：19 tests | Accordion 2、ToggleGroup 2、Pagination 7、Sidebar 8。 |
| 相关家族检查 12 文件 | PASS：55 tests | 上述四文件，加 Button 2、Breadcrumb 2、Command 7、Conventions 7、Disclosure 3、Overlays 7、Steps 4、Tabs 4。 |
| `pnpm --filter @qingye/ui typecheck` | PASS | 库声明、Accordion Header 新 API、Pagination render callback 等。 |
| `pnpm --filter docs typecheck` | PASS | 28 metadata 与第一方组合。 |
| `git diff --check` | PASS | 当时整个共享工作区无 whitespace error；不表示其他 agent 的改动完成验收。 |
| 本 agent 浏览器/截图 | NOT_RUN | 遵守单浏览器 owner 规则，由主 agent 串行执行。 |
| 真实触屏、中文 IME、读屏 | NOT_RUN | 模拟 composing 与 jsdom 名称/焦点断言不替代设备或辅助技术验收。 |

相关家族命令：

```bash
pnpm --filter @qingye/ui exec vitest run test/accordion.test.tsx test/breadcrumb.test.tsx test/button.test.tsx test/command.test.tsx test/conventions.test.ts test/disclosure.test.tsx test/overlays.test.tsx test/pagination.test.tsx test/sidebar.test.tsx test/steps.test.tsx test/tabs.test.tsx test/toggle-group.test.tsx
```

## 主 agent 浏览器状态与待验点

当前状态：**UNVERIFIED（本批未收到主 agent 对本次源版本的浏览器结果）**。源码与 metadata 稳定点已交付；本 agent 没有启动浏览器。主 agent 的后续结果应补充到本节或根执行证据，不能把上表测试结果升级成浏览器 PASS。

- 浅/深色 × 桌面/390px：Sidebar 手机关闭命中区与标题/内容不重叠、打开关闭焦点返回、三个局部 demo 的桌面定位；ToggleGroup default/outline 纵向 bbox；长 Dialog/Sheet/Drawer 标题的条件关闭留位。
- Menu/ContextMenu/继承 Menu 的 Menubar：极长无空格名称、Checkbox/Radio 标签、短视口内部滚动、危险 keyboard-highlighted 前景背景、Shortcut 真实对比、RTL 子菜单指向。
- PreviewCard/Tooltip 长词与可用视口；Steps 错误标记真实主题对比与可点击步骤 44px；Accordion/Collapsible/Tabs 减少动态效果及中断过渡。
- Pagination：disabled 的 router render 在真实浏览器中不提供 contextmenu 打开目的地，enabled 的 Link 继续有地址及标签；render-only 名称与样式在两种状态保留。
- 尚需实际证据的结构：NavigationMenu 的短视口多内容和 Viewport overflow-hidden，Tooltip/NavigationMenu 的既有 resize 动画是否造成不可接受抖动；Sidebar 图标/子项粗指针 hit 区是否被 overflow-hidden 裁剪，以及紧密 ToggleGroup 每项命中区。
- Sidebar 桌面与移动渲染树会在跨断点时重新挂载。本批没有增加业务保留状态；需跨断点保留的字段、树节点等状态提升到稳定应用 owner，metadata 已明确。该限制不能写成库自动保留所有草稿。

## 主 agent 来源 manifest 的 adaptation 摘要

以下 14 个 coss 派生文件保留真实来源。主 agent 统一更新 `coss-source.json` 的摘要和 hash，未修改 upstream baseline。

| 文件 | 本轮 adaptation 一句话 |
| --- | --- |
| accordion.tsx | Add configurable document heading props, separate trigger/indicator motion, and apply shared enter/exit timing while retaining Base UI panel semantics. |
| collapsible.tsx | Apply shared expand easing and faster exit timing to interruptible panel height transitions. |
| tabs.tsx | Drive the active indicator with shared expansion timing and ease-out while preserving Base UI measurements and panel relationships. |
| dialog.tsx | Mark the built-in close part and reserve header space only when that close control is present. |
| sheet.tsx | Mark the built-in close part and reserve header space only when that close control is present. |
| drawer.tsx | Reserve header close space, read the shared drawer easing, and preserve destructive item text on hover and focus. |
| menu.tsx | Constrain scrollable menus to available width, wrap complete labels, retain destructive highlights, improve shortcut text, and mirror submenu arrows in RTL. |
| context-menu.tsx | Apply the same viewport, long-label, destructive-highlight, readable-shortcut, and RTL submenu treatment to context menus. |
| command.tsx | Keep command shortcut labels readable and prevent their flex width from shrinking. |
| preview-card.tsx | Bound read-only previews by available width and height with long-word wrapping and internal scrolling. |
| tooltip.tsx | Limit tooltip content to available width and wrap long words without changing its supplemental semantics. |
| pagination.tsx | Style custom link renderers consistently and use a named, styled native destination-free placeholder for disabled renderers, while exposing ellipsis help text. |
| sidebar.tsx | Correct controlled/uncontrolled state, persist accepted state, avoid editable shortcut conflicts, forward styles and native props, and expose mobile exit plus current-page semantics. |
| toggle-group.tsx | Align default and outline vertical layouts with the orientation already used by keyboard navigation. |

本地 Steps 修改不重新标为 coss；ButtonGroup/HoverCard 等别名文件未独立改写实现。

## 主 agent 后续集成

真实浏览器后续修复了两项交接待验点：NavigationMenu 短视口禁止翻转导致面板完全超出屏幕，现恢复碰撞避让并限制可滚动高度；Menu / ContextMenu / Command 的深色高亮快捷键 4.08:1，现继承当前项的前景色，危险项实测 4.57:1。最后定向 32 项弹层/代码展示检查及 12 页受影响组件复验通过。

Sidebar 手机退出和焦点返回、两种纵向 ToggleGroup、NavigationMenu 末项可达已有实际验证。完整集成结果及仍未覆盖的真机/读屏边界以 [根执行记录](2026-10-02-execution.md) 为准；上文的初始 NOT_RUN / UNVERIFIED 是本代理交接时状态。
