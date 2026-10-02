# 理念驱动改造：本地交付变更说明

本次为基线 `f0de477` 上的未发布实现，包版本仍为 0.3.0；本地打包件用于验证，不代表新增公开版本。未采用此前被拒绝的三张提案；用户后续指定官网首页参考 coss 的简短介绍和组件目录，当前以此为准。

## 可见结果

- 官网首页采用简短介绍、安装/示例入口与 88 个实际公共组件预览；六种完整任务留在示例入口中。设计理念、基础规则、主题和 AI 使用各有直接入口。编辑/发布、集合比较、主从详情、差异审阅、上传队列、阅读各自具有明确的失败与恢复流程。
- 新增本地 `@qingye/tooling` CLI 与 Theme Studio：读取目标项目实际安装包，集中主题源、预览差异、带指纹应用、AST 诊断与影响查询共用核心。Studio 用两个独立 iframe 保持主题和工作状态隔离。
- 同源生成公开 `design.md`、schema 2 catalog、llms.txt、组件/任务资料与 registry。公开内容只陈述实际能力，内部要求矩阵与执行记录不进入公开包/站点。

## 公共组件与 API

- `TreeNode.hasChildren?: boolean` 为可选加法扩展，支持尚无 children 的惰性父节点；加载、缓存和错误仍归应用。节点删除或折叠时恢复合理焦点，用户已离开树则不抢回。
- InputGroup 合并调用方鼠标事件与外框聚焦，`preventDefault()` 可取消默认聚焦；内部按钮保持独立动作且不提交表单。
- FileUpload 先去重再计算新增限额，描述关联和长错误展示修正；真实上传、取消确认和重试条件仍归应用。
- DataTable 保持搜索工具和已有行，刷新标记 busy；初始无数据时才显示骨架。TagInput 移除重复 live announcement。
- 新增字段内、字段组和动作组的关系 token，并由真实公共组件消费；字段默认 8/20px、动作默认 space-2。三轴与控件尺寸约定延续。
- reduced-motion 下 Input 的自动填充背景过渡只影响 background-color，避免深色切换时文字停留在旧颜色。

## 显式外观变化

DataTable 批量动作从覆盖式工具区改为正常文档流，选中时会多占一行；搜索不会被隐藏。FileUpload 长错误可增高。任务示例动作可换行，长文件名和状态不被截断。首页、文档与新增 Studio 布局均有变化。这些是可见布局调整，不以 refactor 名义隐藏。

coss 继续是部分组件的真实来源，本轮修复登记在 coss-source.json；upstream 基线未改。没有证据要求整库重写，保留 Base UI 的无障碍原语并不限制未来在共享边界自建。

## 消费与迁移

已存在的两种样式入口仍分别使用：Tailwind 源入口或预编译 ui.css，不要叠加两者。Button-only 不要求无关的表格/图表可选依赖。新增工具是独立开发工具包，不是 UI 运行时依赖。

主题新源是 ui.theme.json，生成 CSS 只作为派生文件。旧手写 CSS 默认只读；迁移候选不会覆盖未知规则或第三方 CSS。工具默认报告模式不修改消费端 CI；显式 gate 才按设定阻断，扫描故障单独退出。

Studio 仅支持与自身构建版本、catalog 和源码指纹相符的目标 UI；旧版本/同版本不同源码会明确阻止预览与应用，避免用新源码冒充旧消费项目。真实业务接入、生产权限、后端幂等不在本轮范围。

## 验证和交付状态

以 [执行记录](2026-10-02-execution.md) 和 [联合验收矩阵](scenario-results.json) 为准。单元、浏览器、实际安装包和 AI 试验分别登记。真实 IME、物理触屏、读屏、人工视觉/任务评审及远端 CI/发布仍需独立证据；不能称为全部验收通过。

## 官网与全组件设计追加

全部 88 个组件公开具体的采用、避免、组合、状态归属、响应式和主题修改判断；消费项目可以复制同源的 AGENTS.md / design.md 合并片段，持续引用实际安装版本。官网控件使用本库公共入口，新增 AST 正反例约束；原生结构与导航链接保留正确语义。

本轮新增与修正的真实合同包括：

- Accordion 新增可选 `headerProps`；CopyButton 新增可选 `loading`，复制 Hook 新增 `isCopying`，复制等待和过期结果按实际请求归属处理。空字符串按原文复制，值读取异常可重试。
- NumberField / NativeSelect 消费现有控件尺寸角色；显式输入名称优先。TagInput 的 Field / Fieldset 禁用、移除动作与提交值保持一致。FileUpload 不因拒绝或重复选取而丢掉已接受文件的原生表单值。
- DateRangePicker 的快捷项和完整选择统一遵守端点、min/max、excludeDisabled；DateTimePicker 的时间及“此刻”遵守禁用日期。Carousel 保留嵌套控件的方向键；Tree 用自身标签命名并恢复被禁用节点的焦点；零宽 Resizable 面板保留草稿但退出键盘路径。
- StatSparkline 缺测保持时间位置并断线；Timeline 保留数值零；Chart 的 id 转发到实际容器；CodeBlock 修正行号、换行和高亮内容复制。

外观及消费影响需显式接受：

- 占位、快捷键、辅助文字与危险 Badge 使用可读的完整语义色；颜色实际变深。OTP 在粗指针下每格至少 44px，窄容器提供内部滚动与焦点留位。
- ComboboxChip 新增标签包装元素、键盘焦点和完整长标签换行，针对直接子元素编写的消费端 CSS 需复核。
- 默认纵向 ToggleGroup 真正纵排；移动 Sidebar 新增可见导航标题与关闭入口；Dialog / Sheet / Drawer 标题为直接内置关闭按钮留位。
- Menu、ContextMenu、PreviewCard、Tooltip 与 Toast 支持较长内容和可用视口。NavigationMenu 会按空间翻转，并将过高内容限制在可滚动视口内。
- Pagination 禁用的自定义路由 render 改为无目的地的原生占位链接，保留内容、名称和样式；启用时仍挂载原路由组件。依赖禁用态自定义子组件生命周期的消费者必须调整。
- Accordion / Collapsible / Tabs 使用已有公共展开与退出时长；不将这些可见变化称为无影响重构。

逐项依据与验证边界见 [输入家族](2026-10-02-component-forms.md)、[操作与浮层](2026-10-02-component-surfaces.md)、[内容与数据](2026-10-02-component-content.md)。
