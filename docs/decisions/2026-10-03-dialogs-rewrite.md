# Dialog 与 AlertDialog 从零重写

## 语义与关系（先于代码）

依据根 [design.md](../../design.md) 的语义、状态归属、展开有据、进退相承，以及[浮层族决定 1、2、4、5、6](2026-10-03-family-overlay.md)和[动作族后果关联](2026-10-03-family-action.md)。未读取归档组件或冻结来源。

Dialog 阻断整个工作面，承载需要暂时停下主线才能完成的编辑或决定；不需要中断时用就地表单、面板或 Popover。AlertDialog 同样阻断，但专用于必须回应的决定；遮罩不是选择，不能点击遮罩关闭。二者不以大小、位置或颜色区分意图。

打开、关闭与业务提交是不同事实。组件只管理 open 和可访问行为，不清草稿、不发请求、不判断版本、不宣布取消或撤销。AlertDialog 的 Esc 表示离开本次决定，不能执行危险动作，也不能宣布后台动作已取消；应用需要一个清楚的保留/返回选择供触屏与读屏用户操作。

## 焦点、阻断与返回

- Dialog 默认使用原语的初始焦点规则：键盘/鼠标进入首个可 Tab 控件，触摸进入面板以避免意外唤起键盘。编辑任务可用 initialFocus 指向字段；需要先阅读的复杂内容可指向面板或内部可聚焦标题。
- AlertDialog 默认聚焦面板，使标题和后果先进入阅读顺序，即使危险按钮排在最前也不自动聚焦它。应用可显式指向保留选择或确认字段，不能把危险按钮作为默认落点。
- 两者不公开 modal 配置；Popup 明确声明 aria-modal=true，焦点困住、背景不可操作和页面滚动锁定交给安装版 Base UI 原语。Popup 的 initialFocus/finalFocus 不提供 false 出口，以免破坏进入与返回契约。
- Esc、显式关闭默认返回实际触发者。触发者会被移除时，调用方通过 finalFocus 指向仍存在的上级（需可聚焦），或提供函数在触发者还存在时返回它、移除时返回上级。受控/初始打开且没有触发者时也须指定有意义的返回目标。
- 嵌套仅让最上层接收 Tab/Esc；关闭子层返回子层触发者，再关闭父层返回外部触发者。不新增缩放/位移来表示嵌套。

## API 与组合

Root 保留 open/defaultOpen、onOpenChange、handle 等原语入口。Popup 组合 Portal、Backdrop、Viewport、Popup，并暴露各承载层的 props。Title/Description 使用原语建立可访问关联；Trigger/Close 默认组合本库 Button，替换 render 时由替换控件承接表达与焦点。DialogClose 缺少 children 时复用 locale.close；AlertDialogClose 由调用方明确写出选择，不提供默认“取消”或危险 Action 别名。

DialogHeader、DialogPanel、DialogFooter 承接当前官网邀请表单的实际组合消费，提供 useRender/ref/原生属性；它们不自行围合、不增加状态。AlertDialog 复用这些无业务的分组关系，命名保持所属浮层可查询。

## 表达、数值与修改入口

不提供尺寸变体：任务内容决定固有宽度，视口提供上限；Popup 用 fit-content、max-width/max-height:100%，Viewport 留出既有 panel-padding。段落行宽由内容组合选择（例如 max-w-prose），不是组件固定宽度。长内容在面板内滚动，调用方无需选择 sm/md/lg 对话框。

| 部位 | 入口/值 | 定位 |
|---|---|---|
| 面板 | rounded-overlay、surface-raised、shadow-overlay | 角色消费是选择，圆角/颜色/阴影参数为既有预设；阴影不是阻断证据 |
| 边界 | 1px border-strong；focus-visible:border-ring | 1px 与强边界角色是表达选择；聚焦只变色不加粗、无外圈是用户约束 |
| 遮罩 | overlay | 阻断承载角色，透明度为既有预设 |
| 内缘、内容关系、动作关系 | panel-padding、panel-gap、field-gap、action-gap | 既有角色，具体值为预设；不新增 token |
| 入退 | motion.css 已登记 dialog/alert-dialog popup/backdrop | 220ms 进入、140ms 退出和桌面 .98 起止缩放均为既有预设；退出快于进入是策略选择，减少动态效果后去掉缩放 |
| 层级 | Portal 在 body 末尾的自然绘制顺序 | 当前用户要求；不写 z-50、不新增 token。与高 z-index 消费者共处可能遮挡，须如实记 UNVERIFIED |

所有入退场只由 motion.css 提供。既有 slot 已覆盖新结构，无需额外登记。强制颜色回退继续由 styles.css 持有。

## 真实情境及应用归属

编辑设备名称：应用在 Popup 外持有 savedName/draft。关闭保留本页草稿，重开接续；“放弃草稿”才重置为已保存名称；“保存名称”先完成本地示例状态写入再关闭。空白输入就地报错并保留输入。离开/刷新页面不宣称草稿持久化。

永久删除杭州网关：持续工作面显示对象 ID、版本及不可逆后果；打开时应用捕获当前版本，确认必须输入当前对象名。确认前再次核对当前版本，发生变化就拒绝提交并要求重新核对；关闭不删除，不宣称取消。示例仅删除本页记录，不调用服务端。删除入口随记录移除后，finalFocus 返回设备列表标题；实际产品仍须由服务端验证版本与权限。

## 验收边界

新测试覆盖打开/关闭焦点、Esc、标题/说明、受控/非受控、遮罩、嵌套与组合透传。桌面（≥1100px）浏览器串行验证实际焦点困住、aria-modal、背景不可操作、滚动锁、草稿/版本拒绝路径、减少动态效果与浅深色表达。不开移动会话，不运行 build 或生成 catalog/AI/registry；索引仅通过 gen:index 更新。最终结果和未验证项见批次 K 报告。
