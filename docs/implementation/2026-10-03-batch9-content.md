# 第九批内容与集合执行记录

执行跨 2026-10-03–04；决定依据与逐值定位见 `docs/decisions/2026-10-03-batch9-content.md`。

## 交付

- 12 个 Pattern 文件：breadcrumb、steps、timeline、table、pagination、empty、item、description-list、stat、page-header、toolbar、code-block。
- 对应 12 个精准测试、12 组 local/pattern metadata 与 12 个简单演示。静态 AST 复核 62 个运行时导出与 metadata 一致。
- `apps/docs/src/pages/review/sections/75-batch9-content.tsx`，section id 为 `batch9-content`；主 agent 接入统一 review 页面。
- 未读取归档、冻结副本或 Coss 源码；Toolbar 仅采用当前安装 Base UI 的公开可访问原语。未修改共享 locale/token/index/catalog/指南；现有 locale 已覆盖所有新增内建文字。

## 精准证据

| 检查 | 结果 | 覆盖与边界 |
| --- | --- | --- |
| 12 个对应测试文件 | PASS：27/27 | 原生导航/列表/表格/名称值关系、零与未知、排序归属、合法 render/ref/事件、可操作恢复、工具组焦点、真实复制成功与失败。 |
| 实现调整后的 5 文件回归 | PASS：11/11 | steps、table、item、toolbar、code-block；包括禁用组仍可聚焦但不能激活、垂直方向键恢复到可执行按钮。 |
| Toolbar 最后一次回归 | PASS：2/2 | 最终 render 转发形态、原语焦点策略与事件保护。 |
| CodeBlock 最后一次回归 | PASS：4/4 | 原样文本、失败保留内容、文本变化后不沿用旧反馈、原生 onCopy 与 onCopySuccess 分离。 |
| 定点 UI TypeScript | PASS | 仅本批 12 个组件、对应测试及既有 test/setup；noEmit，包含严格可选属性约束。 |
| 定点 docs TypeScript | PASS | 仅本批 12 组 meta/demos 与 75-batch9-content；noEmit。 |
| AST 库存 | PASS | 12 组源码/metadata/演示存在，62 个运行时导出逐项匹配。不是运行验收。 |
| 统一 build/gen | 主 agent 报告 PASS | 子 agent 未执行；报告的构建快照早于最后的 CodeBlock 回调命名与链接 touch-target 收尾，最终生成仍由主 agent 统一处理。 |
| 浏览器 / 全库测试 / build / gen / Git 提交 | NOT_RUN | 子 agent 未执行；浏览器唯一 owner 为主 agent。 |

本批当前共有 **28 条不同测试**；上表分轮记录，不能把重复运行相加。最后链接收尾只接回已有 touch-target 类，未追加镜像样式断言。

## 公共 API 边界

- Breadcrumb 是显式路径；Current 只标记当前页。Steps 每个 Step 必填 state，状态直接可见，位置不会自动完成前项。Timeline 保留输入顺序和原生 time。
- Table 的 TableContainer ref 属于滚动容器；Table ref 属于 table。TableHead 默认为 scope=col，行标题显式 scope=row；aria-sort 和重排由应用负责。
- Pagination 必填 totalPages，数字表示已知、null 表示未知；page 可在零结果时省略。Link page 与 root page 相等时标记当前项。Previous/Next 复用 Button，可用性必须由应用明确传入。
- Empty 必填 empty/unknown/not-applicable；Stat 必填 known/unknown/not-applicable。值与状态文字由调用方提供，零值原样呈现。DescriptionList 保留 dt/dd。
- Item 默认 div；在原生列表中 render 为 li。整体 render 为 a 时不能包含交互子项；含附属动作时使用独立 ItemLink 与兄弟 Button。
- PageHeaderTitle 默认 h1/chapter；演示嵌入页面时显式 level=3。Toolbar 原语接管方向键；默认 Button 保留 focusableWhenDisabled 的 ARIA 事实与焦点策略。
- CodeBlock 的 code 是文本唯一源，无高亮、trim 或格式化。onCopySuccess/onCopyError 报告实际 clipboard 写入结果；原生 onCopy/onError 仍透传。copyable=false 可省略动作。

## 未验证

桌面浅/深色的真实组合、长内容容量、横向滚动入口、盒内焦点 computed 值及粗指针触摸扩展仍为 **UNVERIFIED**，交主 agent 统一实测。没有以 jsdom、AST、TS 或主 agent 的较早构建报告代替这些验收。
