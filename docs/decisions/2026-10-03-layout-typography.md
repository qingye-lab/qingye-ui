# Layout 与 Typography：基础层的关系出口

## Status

Decided（2026-10-03）。设计依据只取根 [design.md](../../design.md) 的「三件事的顺序」「空间与表面」「强调与内容」「视觉基调」和「必须」。[基础层](2026-10-03-foundation.md)、[逐值裁决](2026-10-03-value-adjudication.md)、[布局族](2026-10-03-family-layout.md)与[分层](component-layering.md)用于核对现有角色与约束，不作为独立设计来源。先记录语义与关系，再实现。

## Layout 的语义与关系

Layout 属于 Foundation，无交互、路由、数据或业务状态。纵向关系由 Stack 表达；同排内容/动作由 Inline 表达。分区用 Stack 的 `gap="section"` 与 `render={<section aria-labelledby="…" />}` 组合，不新增与 Stack 重叠的 Section、Grid 或页面骨架。原生 grid 用于真实二维比较。

公开 `gap` 只接受下列关系，不能传数字阶梯或任意 CSS 值：

| gap | 实际入口 | 所连接的关系 |
|---|---|---|
| field | --qy-field-gap | 一个字段或一个对象的名称、内容、说明 |
| fields | --qy-field-group-gap | 同一问题下多个字段 |
| actions | --qy-action-gap | 同组动作，不能代替动作组到字段的距离 |
| panel | --qy-panel-gap | 一个内容面里的相邻内容组 |
| section | --qy-section-gap | 分节之间的关系 |

角色表达可独立修改的关系；数值仍是主题预设。Stack 默认 panel、Inline 默认 actions，是接口**选择**，不是理念的唯一解。默认未加线、面、padding、外边距；需要独立对象边界时组合 Card。Inline 默认换行、居中对齐，Stack 默认伸展，均为选择；min-width:0 与长词换行用于保留长内容，不能用裁切隐藏关键内容。

**例外出口**：项目确有不同关系时，可用原生 CSS/grid 或 className/style 覆写，并在项目组合说明理由。这个出口支持特殊结构，不是公开 gap 的数值默认路径；优先覆写已有角色值，只有独立消费关系成立才申请新 token。本批不新增 token。当前用户的具名角色要求优先于 AGENTS 中旧 `gap-(--qy-space-N)` 建议。

语言、方向、密度按真实 DOM 祖先继承；render 不搬动子树或创建 Portal。原生属性、事件、ref 和 render 可传递。Layout 不自动给予 role=group、region 或 toolbar；语义由真实标签/调用方命名决定。

## Typography 的语义与关系

Typography 是已有文字档的语义出口，不是第二套排版系统。

- Heading 的 `level` 决定 h1–h6，`step` 独立决定视觉档。默认 level=2、step=heading 是**选择**；不会从 h1 推断 display，也不会把视觉档当文档大纲。
- Text 默认 p、step=body；正文、阅读与辅助文字选用 `src/text-steps.ts` 已有档。内联说明、数字用 render 成 span；不增加 variant 别名、as 或新文字档。
- `numeric` 只启用既有等宽数字工具类，不解析/格式化值，不把未知、空或不适用转为 0。metric 本身也有既有等宽数字规则。
- 所有 TextStep 映射用完整且可静态提取的文字类，TypeScript 对照统一清单检查；support、dense 与 control 档继续消费现有 mobile 类、sm 回到桌面，不新增窄屏设计。
- 中文字距由 utilities.css 既有 :lang(zh/ja/ko) 接管，组件不叠加负字距。混排中明确 lang=en 的片段可采用拉丁预设；语言标记由调用方提供。
- min-width:0、max-width:100%、正常换行与 overflow-wrap:anywhere 是长文本容量策略**选择**。文字颜色继承真实承载面；辅助颜色由调用方选择，普通辅助文字仍验证 4.5:1。

render 替换真实标签后，语义跟随最终标签；组件不伪造 aria-level/role 去补偿调用方换成非标题。需要标题大纲时保留 h1–h6。原生属性、事件、ref、className/style 透传。

## 消费修复与验收

Card、Popover 使用新 Stack/Inline/Heading/Text；账单改为原生 table/th/caption，保持二维关系。主题入口用现有 Popover + 原生 select；设置页用原生 fieldset/legend/radio，避免依赖并行 RadioGroup/Select/Dialog。原生 select 的 1px 边框只变色；radio 使用既有 quiet 宽度角色画自身盒内线，移除浏览器默认外扩焦点，强制颜色由 styles.css 统一回退。MotionProvider 用原生 kbd 与真实本页状态，不让保存结果依赖动画。

验收分层：单元检查标签/文字档分离、render/ref/事件、角色 class 与长文本内容保留；桌面浏览器检查真实 gap、角色覆写、compact、中文字距、numeric、长中英文本和演示操作；docs typecheck 的六个目标目录及新增审查段落错误必须为 0。整站归档依赖错误单独报告。

## 明确变化与边界

新公开布局只提供 Stack/Inline 和具名关系，不恢复旧数值 gap、Grid 或页面骨架。Typography 只提供 Heading/Text，视觉档用 step，不恢复旧别名。此为重新定义的 API/视觉基线，不宣称兼容全部旧消费者。四个指定内容目录已列为本批消费者，其余由主任务处理。

不改 Card 默认阴影、不新增 z-index、不加 z-50。Portal 依自然绘制顺序；跨任意页面堆叠遮挡为 UNVERIFIED。页面按用户裁决仅验证 ≥1100px 桌面；不声称移动端页面验收。最终证据见[本批报告](../implementation/2026-10-03-batch4-i-layout-type.md)。
