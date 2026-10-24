# 消费项目迁移反馈处置

本次核对基于 `3d7f3d2` 及其后的本地修复。反馈引用的消费包为带消费端补丁的 4.1.0；未取得消费项目源码、补丁和登录后的页面证据，不将其构建、测试或视觉退化陈述视为本库已复验结果。

## 已处理

- DialogPopup 与 AlertDialogPopup 缺少稳定的定位上下文。入场缩放结束后，绝对定位后代会锚到 fixed viewport。两个 Popup 均补上 relative，调用方样式仍在最后合并。
- Field 文档明确 FieldLabel、FieldDescription 需要 Field 或 FieldPrimitive.Root 上下文。独立标签使用现有 Label；独立说明通过原生文本 id 与控件 aria-describedby 显式关联。
- Pagination 文档明确默认方向文字，以及替换为纯图标时提供可访问名称的责任。保留调用方自定义文字，不用默认 aria-label 覆盖它。

## 消费端应采用的现有入口

| 反馈 | 当前实现与接入方式 |
|---|---|
| 左侧 Sheet 方向冲突 | Drawer 的 swipeDirection 同时决定所在边缘和退出方向。左侧使用 left；不要固定 right 后只覆盖几何。motion.css 已接通四向退出及原语手势变量。 |
| 不确定进度变为闪烁块 | Progress 使用 value=null，组合 ProgressTrack 与 ProgressIndicator；motion.css 已有 qy-progress-slide，不需要在适配层用 animate-pulse 模拟。 |
| Select 空字符串被当作占位 | null 表示未选；空字符串、0 可作为带名称的真实候选。仅在消费项目确实将空字符串用作未选哨兵时转换，不能无条件丢弃真实选项。 |
| Alert 未自动播报 | 静态就地说明默认不宣告；需要宣告时显式传 role=alert 或 status。色调不决定事件是否需要播报。 |
| StatusDot 文字颜色 | status 决定圆点颜色，文字默认 text-foreground；className 可覆写文字，尺寸由状态点角色控制。role=img 与隐藏内部重复文字不等同于无障碍退化。 |
| 表格嵌入卡片 | TableContainer 使用 framed=false，保留溢出时的键盘滚动和焦点信号；表格密度使用 data-density。 |
| 浮层与宿主层级冲突 | 项目主题协调浮层角色及步长，与宿主层序一起验证；默认层级数字不是所有宿主的全局约定。 |

## 能力扩展的边界

- Badge 无底色、随行文字尺寸是已明确的设计选择；Button 当前只提供 neutral/danger。消费适配层忽略旧 size/tone 必须被记录，不以类型或构建通过作为无损迁移证明。
- Menu 新增 `inset` 与勾选/单选项 `markerPosition`，复用已有五档尺寸与填值角色。默认标记仍在尾部；前导图标、标记及留位文字在窄屏和 RTL 中按实际几何对齐。
- ScrollArea 保留原生入口；新增显式的 Root/Viewport/Content/Scrollbar/Thumb/Corner 高级组合。Viewport 拥有原生 ref 和滚动事件，两轴均有真实滑块，不再以空组件模拟已迁移。
- VirtualList 新增动态高度测量、独立 actionsRef 的定位动作、稳定 key 阅读锚点和显式尾部跟随。未测量行仍为估计；followEnd 仅在原先位于尾部时跟随追加，不抢走历史阅读。
- Sparkline 新增显式 tooltip/getPointLabel，覆盖指针、键盘与触摸逐点读数，未知值与零值分开表达；默认静态摘要保留。
- DataTable 两层入口新增列尺寸、非交互内容省略、选择外观与独立行激活，并提供实际测量的可选虚拟化。高级入口仍消费调用方 TanStack 实例；Pattern 仍由项目拥有数据、请求、草稿与活动对象事实。

## 已执行的验证

- Dialog、AlertDialog、Drawer、Confirm、ConfirmAction 共 5 个测试文件、54 个用例通过；库类型检查与构建通过。
- Field 与分页的中英文契约已生成到包内指南、网站 Markdown、catalog 与 llms-full；文档类型检查及 5 项 AI/API 文档一致性检查通过。
- 单浏览器串行验证两个弹窗在 1200px / 390px、浅色 / 深色、普通 / 减少动画下共 16 组定位、居中与关闭焦点返回。每组临时移除定位作反向校验，均能检测原缺陷，恢复后通过。观测保存于 `/tmp/qingye-dialog-positioning-20261023/report.json`，该临时路径不作为持久验收附件。
- 新能力第一轮公共 demo 浏览器检查：1200px / 390px × 浅深主题，共 20 组组件检查及 1 项触摸双击关闭检查通过。覆盖列表插入/增高锚点、跟随与历史阅读、表格真实列宽/焦点/选择/删除、趋势图未知与零值/逃逸裁剪/悬停关闭、滚动条拖动/极长内容/溢出消失、菜单 LTR/RTL 对齐。最终构建进一步加入弹窗定位反向校验，共 25 项 PASS；190 页几何审计、完整工作区测试、四种真实 tarball 安装与 Tooling 消费检查均通过。详见收尾计划。
- 全工作区首轮测试中，UI 117 文件 / 1093 用例通过；docs 的 API 事实门禁识别出三处 DataTable 嵌套属性误写为顶层，已修文档且 check:api 重新通过，未放宽 baseline。独立复核进一步要求表格换模型取消旧滚动命令、趋势图保留修饰键，均纳入最终验证。
- 消费项目位于外部，用户明确“不是本地的”；本地 UI-AI 与远端默认分支均不能替代报告对应迁移版本。未改本地消费项目。登录后逐页视觉、真实辅助技术播报和实体设备触摸仍需对应环境。
- 2026-10-24 库侧已通过 [GitHub v4.2.0](https://github.com/qingye-lab/qingye-ui/releases/tag/v4.2.0) 与 [npm 4.2.0](https://www.npmjs.com/package/@qingye_lab/ui/v/4.2.0) 交付；官方 registry latest=4.2.0。匿名下载与 CI / GitHub tarball 逐字节一致；隔离安装后的 12 个公共导出及动态列表、交互趋势图、虚拟表格 SSR 检查通过。外部项目的页面验收边界保持上述待提供迁移版本与环境。

## Dependency decision — accepted

### Context

新增可变高度窗口需要测量、索引定位校正、焦点行保留和插入锚点；原手写等高窗口不足以承担这些契约。

### Evidence

核实 npm 与官方 TanStack 文档后选择精确 `@tanstack/react-virtual@3.14.22`，传递依赖 `@tanstack/virtual-core@3.19.7`。二者 MIT，无 install 生命周期脚本；React 19 在 peer 范围内。仅增加这两个锁文件依赖项，不复制归档组件实现或设计值。

### Decision

复用虚拟化计算与浏览器测量引擎；本库拥有原生结构、稳定身份、焦点、键盘、选择范围、读数与外观。列表与表格使用显式 opt-in，不自动把远端全部结果解释为本地完整集合。

### Alternatives considered

继续扩展手写窗口会重复实现动态尺寸校正及取消协议；引入完整表格/聊天外观会侵入本库设计和应用状态。采用现有引擎保留公共语义和设计所有权。

### Consequences

新增两个运行时包；未测量行仍有估计误差。稳定唯一 key 是调用方契约，应用仍拥有异步请求与跟随策略。新功能不要求旧调用方开启。

### Verification

针对性单测和公共 demo 实测覆盖实际尺寸、锚点、尾部、焦点、数据模型变化与取消。独立 tarball 消费检验分发依赖及两种 CSS 路径；最终结果记录在收尾计划。

### Revisit when

引擎取消、测量或锚点契约变化，或出现可复现的当前页/身份/焦点边界问题时重新评估。升级依赖前重跑对应行为，不以源码引用或构建成功替代运行时证据。
