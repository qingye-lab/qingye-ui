# 第八批工具关系判断

2026-10-03，基线 a94e8b4。从 design.md / STANDARDS.md 和当前公共 API 重建，未读取冻结、归档或上游视觉实现。

- CopyButton 是附属复制动作。useCopyToClipboard 持有实际 writeText 请求，成功只能由该 Promise resolve 建立；等待、失败和手动复制恢复需要可感知。继承 Button 的五档几何、同档文字、disabled/render/ref/事件取消与盒内焦点。反馈保留 2000ms 是 hook 已有预设，只清反馈，不证明结果。
- ScrollArea 是真实原生滚动视口。overflow:auto、tabIndex=0 和盒内 quiet 焦点使鼠标与键盘可到达；尺寸由消费布局给出。原生滚动条沿用平台设置，不覆盖用户自动隐藏设置。选择原生出口，避免无任务依据的自定义条宽/表面/命中尺寸。无新增 token。
- AspectRatio 是无状态的宽高关系，直接消费 CSS aspect-ratio。默认 1 是正方形选择，不是理念推导；有限正比率是约束。不自动设 object-fit、overflow:hidden 或裁剪，内容仍决定其最小需求。
- LocaleSwitch 与 UILocaleProvider 相成：Provider.code 是当前事实，NativeSelect 的 value 始终来自它；onLocaleChange 只提出应用可接受/拒绝的请求。选项与可见名称由消费项目给出，不隐式修改文档 lang、URL、存储或系统语言。Provider code 未列入选项时显示实际 code 的禁用选项。五档几何/文字和原生键盘沿用 NativeSelect；新增内置名称键 language。
- VirtualList 是长集合的有限渲染边界，不是选择器或业务表格。安装依赖没有虚拟列表包；此实现只支持明确的等高项 itemSize 与 viewport height（调用方给出，有限正数）。总高、偏移和可见窗口从这些关系算出。getKey 必须给稳定唯一 key；overscan=2 是渲染预算预设。方向/Home/End 从视口或行本身可达任意项；嵌套控件保留原生键盘；已聚焦行移出可见窗口时保留，避免卸载焦点。动态高度与全内容搜索/打印不属于此窗口契约，使用普通集合/ScrollArea。原生滚动条与盒内 quiet 焦点，不新增视觉尺寸。

角色消费均复用当前 Button/NativeSelect、focus-quiet-width / ring / action-gap 等已有角色；尺寸入口是组件 size、比率 ratio、消费布局 style 和 VirtualList 数据几何。没有修改 global tokens。示例是组件和简单组合，无业务列、假写入/假服务。
