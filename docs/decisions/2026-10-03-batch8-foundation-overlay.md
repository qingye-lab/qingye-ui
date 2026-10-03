# 第八批：基础约束与展开返回

2026-10-03。依据当前根 design.md、STANDARDS.md、基础层、组件分层与展示/浮层族。当前 HEAD 为 a94e8b4；工作区已有多代理新组件与文档，本批只修改指定拥有边界，不读取归档、冻结或 Coss。

## 语义先于表达

Accordion 是一组独立内容的展开关系，保留原语的单项/多项、受控/非受控、禁用与取消事件；标题使用实际 heading，触发是原生 Button 组合，不造业务阶段。Collapsible 是同一对象的单段展开关系，内容能保留有效输入，关闭不宣称业务取消。两者使用 Base UI 原语公共 ARIA/键盘，不把已废弃的方向参数误写成当前键盘约束。

Drawer 是边缘工作面，吸收 sheet 的方向表达，仍由实际 modal 属性决定阻断行为；swipeDirection 是公开原语方向，不另造冲突位置轴。默认为 modal；名称、关闭与焦点返回由原语和现有 Button 组合承接，关闭不表达撤销。不会用尺寸变体代替实际内容容量，表面和间隔使用已重写共享角色。

HoverCard 使用成熟 Base UI PreviewCard 原语的悬停和 focus 同源展开。公开 Trigger 是实际可到达对象的链接，focus 是键盘等价路径；卡内补充内容不唯一承载后果。不得把仅有 hover 的漂亮预览当作等价入口。Popover/Tooltip/Select 继续使用自身原语上下文，Portal 不替换成另一个浮层上下文。

## D2 层级决策（已批准并实现）

最小独立 utility 为 `src/floating-layer.tsx`：`FloatingLayerScope active` 在 modal 根保留 React 所属上下文，`useFloatingLayer(role)` 返回可合并 style。role 为 backdrop / surface / popup / notification；Portal 逃离 CSS 祖先但保留 React context，独立 Combobox/Autocomplete/Menu Positioner 可以直接消费，render/ref/style 继续透传。公开包入口为 `@qingye/ui/floating-layer`，root index 由主 agent 统一生成。

集中默认预设为 notification5、文档 popup10、modal base30、modal activation step10、surface offset1、popup offset2。关系约束是：父工作面的候选高于该工作面，嵌套或后开启 modal 遮罩高于旧面所属候选，通知低于非阻断候选和关键 modal 动作。具体整数是可覆写的集中预设，不是理念唯一推导。首个开启 backdrop30/surface31/所属候选32；第二个开启 backdrop40，遮住旧候选32。不以多个 z50 token 改名替代上下文关系。不计新增组件库存。六个角色参数均由 utility 实际读取，各浮层承载层消费返回值。

纯深度无法覆盖两个同时开启的独立 modal：新面31仍低于旧面所属候选32。主 agent 批准最小补充：scope 的 active 接收公开开关事实，客户端真实开启分配单调 activation order，嵌套 order 必须高于父；一个模块 serial 与各 scope React state，不增加全局订阅或业务 manager。SSR 不推进 serial；StrictMode replay 不重新提升既有开启。Root 先调用消费者回调，details.cancel 或受控拒绝不改变 active；关闭保留退出层，重新真实开启更前。调用方 style/状态回调最后合并，覆盖 zIndex 可破坏默认关系，文档明确承担点。

精准测试发现的 optional 边界已由主 agent 真实浏览器确认：纯安装 Base UI 两个并列 Dialog.Root，旧面初始 open，新 Portal keepMounted 且初始 closed 后打开，虽 data-open 和焦点/Tab 在新面，Portal 祖先仍 aria-hidden=true/data-base-ui-inert，named role count=0。有无旧 controlled Popover 都相同；默认卸载 Portal 新角色可达。关闭待 effect 稳定后返回旧入口正常，即时异步观测不算新焦点缺陷。共享 CSS 排序不代替可访问性证据。

主 agent 批准基于该 ARIA 事实收窄公共契约：Dialog / AlertDialog / Drawer Popup 的 portalProps 移除 keepMounted，公开 Portal 固定 false，JS 传 true 也不能保留关闭 DOM。当前消费者检索无对应生产用法，唯一是新精准测试，已改成公共 hook 探针；不改就地 Accordion/Collapsible/Tabs 的内容保持。应用须显式持有草稿，这是破坏性 API 收窄，不声称 Primitive 命名空间自行组合缺陷已修复，不复制原语内部 manager。保留 container/render/ref/style/事件和其余 Portal API。

## 基础 owning 缺口

Layout 的容量保护应为默认值；其父子选择器必须整体位于 :where 内，不能依特异性盖过调用方显式 max-width。未给尺寸的子项仍受容器容量约束，不以 demo 的 !important 修复共享默认。已有样式镜像断言会改为保留真实内容及公共组合的语义断言；实际宽度由唯一浏览器 owner 检查。

Card 默认移除未证独立用途的 shadow-panel。此为主 agent 可逆的默认选择，用户没有对此作已确认裁决；不是宣称“所有卡永远不得有阴影”。当前默认线承担对象范围，面承担独立承载身份，项目仍可按真实背景组合修改。视觉 baseline 改变明确记录；不附加标题槽或默认 padding。

强制颜色 fallback 的 outline 宽度和内缩 offset 使用同一局部 `--qy-focus-ring-width`；quiet 局部1px 不再和固定2px outline 组合导致外扩1px。系统色继续接管，正常主题的盒内焦点机制不改，完整组合由主 agent实测。

ThemeProvider 只在确证缺口处修复：服务端/客户端首渲染稳定，再读取实际存储和系统选择；首屏脚本与 Provider 共享实际选择且存储不可用时仍适用。`yq-theme` 保留，因为当前官网/既有消费者已存储真实用户偏好，换名会丢失选择，不能因改品牌制造兼容断点。监听与临时抑制过渡样式须清理，跨标签页删除偏好按 defaultTheme 恢复。品牌、明暗、密度保持独立。

MotionProvider 现有文档级输入监听、SSR 和清理有明确职责；系统 reduce 由 CSS media 跟随。不为制造字节变化重写已正确行为。Drawer/新展开部位只消费共享 motion.css 参数，减少动态效果移除入退位移，实际状态与退出不等待动画。

Accordion / Collapsible 默认 keepMounted 为保持原生字段与草稿的组合选择，调用方仍持有字段及隐藏字段是否禁用。原语 boolean hidden 须胜过面板 grid；hidden="until-found" 保留原语平台搜索路径。HoverCard hover delay=0 为即时补充的本次选择，不写成硬要求。Drawer 初次测试发现安装原语完整 modal 的 Popup 未声明 aria-modal，本库按实际 modal===true 补充该事实；非阻断和 trap-focus 不伪造完整 modal。

## 验证边界

只补/跑本批相关正常、禁用、取消、键盘、嵌套退出、SSR、存储不可用与清理契约，不重复全部已通过测试。共享层级真实 z/computed、子候选与嵌套遮罩、Card 视觉 baseline、:where 容量及焦点返回由主 agent唯一浏览器验收。本代理不运行浏览器、全库测试、build、生成器或 Git 发布。
