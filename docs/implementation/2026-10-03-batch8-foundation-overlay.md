# 第八批：基础与浮层实施记录

2026-10-03 开始，2026-10-04 收尾。依据当前根 design.md、STANDARDS 与本批决策。保留多代理工作；未读取归档、冻结或 Coss。未提交 Git、发布、运行浏览器、全库测试、build 或生成器。

## 当前实现

- 新增 Accordion、Collapsible、Drawer、HoverCard 四个 Primitive 源、对应测试、meta 与状态 demo；review76 复用 demo，名称与子标题采用同级文字角色。
- 新增公开 FloatingLayerScope/useFloatingLayer utility，六个集中层级预设实际消费。Dialog、AlertDialog、Drawer 以真实开启状态持有 scope；Popover、Tooltip、Select、Toast 在各自原语承载层消费角色。公开入口配置和 gen-index 增加 utility export，生成物由 root 统一处理。
- Layout 的父子默认 min/max 容量选择器整体放入 :where，调用方显式 max-width 优先；未设尺寸仍有容量保护。Card 移除默认 shadow-panel，保留对象线、面、圆角；**视觉 baseline 改变**，这是主 agent 可逆默认选择，用户未裁决偏好。
- 强制颜色 outline 宽度与内缩同读局部 focus width，quiet1px 不再与默认2px组合外扩。HoverCard 与 Drawer/展开面板只消费 motion.css；减少动态效果删除入退位移，实际手势事实保留。
- ThemeProvider 修复稳定 SSR/hydration 首渲染、真实存储读取前不覆盖首屏主题、存储不可用、跨页 clear 和临时 transition 样式/rAF 清理。保留实际消费者 yq-theme 偏好。MotionProvider 已有生命周期正确，源不为重构而改；新增必要卸载回归。主题 demo 改为当前 NativeSelect/Radio 组合。
- Separator metadata 为 Foundation，AlertDialog 为 Pattern；分层目标统一83，STANDARDS/基础层删除随批变化的11文件现状。更新对应展示/浮层/动效事实。

## 已观察的精准检查

| 检查 | 结果与边界 |
|---|---|
| 新四组件9个行为路径 | PASS：Accordion 组/键盘/禁用/取消/字段保持2项，Collapsible 字段保持/键盘/禁用/取消2项，Drawer 名称/modal/render/ref/退出返回、嵌套Dialog逐层Esc、取消/非阻断3项，HoverCard hover/focus/Esc/主动Tab与真实href2项。初次 Drawer aria-modal 失败，补实际完整 modal 属性后只重跑该项 PASS，其余通过项未重复。 |
| floating-layer 6项 | PASS：默认Portal下旧面controlledPopover与后开独立Dialog的角色可达/序列/重开；同时初始嵌套Scope StrictMode及重渲染；取消/受控拒绝不提升（Portal收窄后该项定向重跑PASS）；Dialog/AlertDialog/Drawer 的JS keepMounted=true请求不保留关闭DOM且后开新面named role可达3项。层级关系观测公共样式变量，真实computed另验。 |
| Theme/Motion B8筛选4项 | PASS，原有9项未重跑：SSRhydrate真实存储与recoverable错误、存储读写失败/临时样式清理/首屏脚本、跨页clear与缺matchMedia、Motion卸载恢复属性和移除监听。 |
| Layout long bilingual 筛选1项 | PASS，8项未重跑。保留长内容组合语义；不造选择器镜像断言。 |
| 定点15源入口 strict tsc | PASS；独立临时配置，无全库build。 |
| 定点23个docs/meta/review入口 strict tsc | PASS；补齐ApiPart说明并采用真实LayoutGap名称后通过，非全docs检查。 |
| Layout真实computed（root唯一浏览器） | PASS：832px父容器下batch6所有max-w-sm子项及batch7三个Stack子项均width/max-width=384px，旧832覆盖消失。此条只证明受影响容量值，没有重跑行为矩阵。 |
| 三modal库边界（root唯一浏览器） | PASS：JS keepMounted=true请求初始关闭无Portal DOM；Dialog/AlertDialog/Drawer新面named role可见、aria-modal=true、无hidden祖先、初焦与Tab在新面、viewport41高于旧31；显式关闭effect稳定后返回“打开新面”。首次夹具缺Tailwind产生static/zauto，补实际CSS入口后通过，不算产品缺陷。 |
| 新四组件（root唯一浏览器） | root确认浅深呈现、草稿与嵌套退出；此记录不推定未提供数值的完整对比/手势矩阵。 |

以上20个本批相关行为/生命周期路径各自通过，分次有选择地运行；不是一次全库suite。

## 定向诊断与未验证

纯安装 Base UI 公共原语四条件诊断：两个并列Root，旧Dialog初始open，新Dialog先closed再open。新Portal默认卸载时新面无aria-hidden祖先；keepMounted时新面祖先仍被aria-hidden，有无旧controlledPopover都相同。诊断通过只表示data-open成立，不表示ARIA成立。root真实浏览器确认keepMounted时named role count=0、祖先aria-hidden/data-base-ui-inert，但实际focus/Tab在新面；effect稳定后关闭返回正常，不报新焦点缺陷。

**破坏性契约收窄**：当前无生产消费者依赖三个modal的保留Portal，主agent批准portalProps删除keepMounted并Portal固定false，JS传true也不保留关闭DOM；应用显式持有草稿。精准三项运行时绕过类型请求均保持named role可达。原语命名空间自行组合仍受原缺陷影响；本库不复制内部manager。临时Vitest probe已删除，真实浏览器夹具`apps/docs/.__layer-probe.*`交root核对修复，最终不交付。

NOT_RUN（本代理）：全库suite、生成、build、浏览器、真实屏幕阅读器、触摸拖拽/所有snap路径、200%放大。UNVERIFIED至对应实际证据：完整浅深对比数值、Card视觉baseline、强制颜色quiet盒内回退与所有手势snap组合。三库modal并列可达/层级/退出返回已获root实际PASS；optional keepMounted原语隔离缺陷已确认，本库通过收窄契约规避。网站常驻header旧z40高于首modal层的宿主跟踪由website owner收尾。

新增locale：无，复用close。新增tokens：notification/popup/modal/modal-step/surface-offset/owned-popup-offset六项，唯一入口components.css，作用于共享层级utility，所有role有实际消费；不是散落值机械改名。
