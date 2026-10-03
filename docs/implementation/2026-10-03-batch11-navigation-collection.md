# 第十一批：导航、命令与集合执行记录

执行跨越 2026-10-03 / 2026-10-04，沿用已授权批次文件名。本批唯一拥有 Menu、ContextMenu、NavigationMenu、Tabs、Tree、Sidebar、FilterBar、BulkActionBar、DataTable 的源码、精准测试、资料与 review section；保留其它 owner 的修改。设计决策先于实现写入同名 decisions 文件；仅依据根 design.md、STANDARDS.md、族定义、当前已重写公共组合与已安装可访问原语，没有读取归档、冻结实现或 Coss 来源。

## 完成内容

- 9 个 Pattern 源码；Menu/ContextMenu/NavigationMenu/Tabs 组合已安装 Base UI。3 种导航/菜单各自 Positioner 消费共享 useFloatingLayer('popup')，不另建 Scope，不跨 Root 套浮层。
- Tree 提供真实 tree/treeitem/group、唯一稳定 id、独立展开与单选、键盘定位、取消及数据更新后的焦点恢复。Sidebar 提供 aside/nav/真实 href、显式 active、可逆收起与焦点返回。
- FilterBar 使用原生 form/fieldset 与本库 Button，应用明确提供 dirty/appliedSummary、草稿与结果。BulkActionBar 必填目标 id/名称/version 与 scope，动作收到当前快照；零选择禁用。
- DataTable 接受调用方 TanStack 实例，复用 Table/Checkbox/Button，保留比较列、caption、row/column header、零值与有效 busy rows。page/filtered 选择仅依本范围可选择行，不污染范围外选择。
- 9 组 meta 与可操作简单演示，78-batch11-navigation-collection.tsx（id=batch11-navigation-collection）。所有非示例 description/decisions/API/prop/notes 英语字段完整。designEn 由指定公共资料 owner 后续统一入口，不机械填入中文。
- treeEmpty / filterUnapplied / bulkVersion 由 locale owner 合入，未修改共享 locale、token、全局 CSS、index、catalog、package 或根计划。

## 已观察的精准证据

| 检查 | 结果与边界 |
| --- | --- |
| 本批 9 文件 Vitest（26 个独立用例） | 初次 22 PASS，2 个失败来自测试误假设 Menu/Tabs 会跳过可聚焦禁用项；改为实际禁用执行契约后，Menu/Tabs 4 个用例 PASS。原 24 个用例已观察通过，没有重复全库。 |
| 两个新增 alternate 的最小复现 | 修复前：过滤外已选 a、过滤剩 b/c 使 header 错报 mixed；Tree 持焦点清空 nodes 后落 body。修复后在上述精准测试内 PASS。 |
| FilterBar/BulkActionBar 公共取消新增 2 用例 + 定点 6 用例 | 修复前 preventBaseUIHandler() 未阻止 wrapper 动作，最小复现 FAIL；新增 Base UI 取消与原有 DOM 取消/正常/零选择检查共 6 PASS。合计 26 个独立用例已有通过证据。 |
| Sidebar 定点 2 用例 | 显式 Content id 的 aria-controls、可逆收起、取消、受控收起焦点返回 PASS；该小修后仅重跑对应文件。 |
| 定点 strict TS：本批 9 源码 + 9 测试 + setup | PASS，临时 config 在 /tmp，根目录包含拥有的测试；未改项目配置。 |
| 定点 strict TS：本批 9 meta/demos + review section | PASS；只选择本批入口及其实际依赖。 |
| TypeScript AST 运行时导出对照 | 9 组、71 个运行时导出与各 meta.exports 双向一致；没有将接口/类型当成组件导出。英语非示例字段检查 PASS。 |

## API 与集成边界

- Menu/ContextMenu 的 disabled 项默认可由箭头聚焦但禁止执行；Tabs 默认手动激活，disabled 标签不激活，Panel 默认 keepMounted=true 保留草稿。
- Tree 是完整输入树的独立单选：没有请求、懒加载或多选服务。传入重复/空 id 或空标签明确拒绝；隐藏选择不会自动清空。
- Sidebar 应保留 Toggle；收起内容仍挂载但隐藏。应用提供 href/active/布局宽度，不内置路由。
- FilterBar 的取消/清除/应用只发出意图，应用负责实际改草稿、条件与结果。fieldset 与 form render 应保留等价原生语义。
- BulkActionBar 展示并传递版本，不推断版本有效性；应用执行时复核。危险动作仍需当前 Button 的明确后果保护，不把中性作用范围误当危险说明。
- DataTable 要求显式稳定 getRowId、至少一个可见比较列与 caller emptyContent。应用配置实际排序/筛选/分页模型和真实数据；多重排序只在主表头写 aria-sort，其余顺序由应用明确说明。

## 未验证事项

- NOT_RUN：全库测试、build、gen:index/gen:catalog、Git、浏览器，均遵守主 agent 的集中所有权。
- UNVERIFIED：桌面浅/深色真实 computed 对比度、浮层几何/嵌套关闭/返回、实际横向滚动与视口容量。optional keepMounted 的原语隔离由基础 owner 与 root 核对；本批未另造 manager。
- 这些源码与定点证据可交 root 集成；不据此声称 83 项官网、浏览器验收或包分发已完成。
