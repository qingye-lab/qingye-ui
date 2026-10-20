# 消费端常用组合的边界

Status: accepted · 2026-10-20 · additive APIs

## Context

用户提供六项消费端反馈并授权对照最新代码实施有价值的方向。起点为 `e20148b`，工作区干净。此次只修改本库与第一方文档消费项目，不修改外部项目，不发布包。

## Evidence

| 反馈 | 起点代码的实际能力与缺口 | 取舍 |
|---|---|---|
| 配置式 DataTable | `data-table.tsx` 要求调用方提供 TanStack 实例及 getRowId；排序头、选择列和模型仍由应用装配 | 新增 DataTablePattern；高级实例入口保留 |
| 标准分页 | `pagination.tsx` 已有未知总数语义及前后页部件，但没有完整页窗、pageSize 与总数校正组合 | 新增 PaginationPattern 和同一个 `{page,pageSize}` 更新事件 |
| 通用确认 | ConfirmAction 明确要求对象/版本快照；AlertDialog 是声明式原语 | 新增 ConfirmProvider/useConfirm；快照确认继续用于对象变化后的重新审阅 |
| 异步内容 | Empty、Alert、Skeleton 能呈现部件，但页面要自己决定首次加载和刷新时是否卸载有效内容 | 新增 AsyncContent，只组合呈现，不管理请求或缓存 |
| 搜索单选 | Combobox 已支持值与草稿分离、只读、清空与状态部件；简单任务仍需装配；异步示例缺少不遵守取消的迟到响应保护 | 新增 ComboboxSelect，远程竞态留在应用参考实现 |
| 工作台 | Workspace 已有尺寸/焦点/滚动部件，示例主要是外壳与顶栏插槽 | 增加真实列表与详情参考页，复用本轮表格组合；不另建外壳框架 |

核对安装的 TanStack v8 类型及官方 [选择说明](https://tanstack.com/table/v8/docs/guide/row-selection)、[分页说明](https://tanstack.com/table/v8/docs/guide/pagination)和[排序说明](https://tanstack.com/table/v8/docs/guide/sorting)。不能将 Context7 `latest` 的 v9 API 套用到本库 v8 peer。

## Decision

- **表格**：普通平铺列表使用 DataTablePattern 的列配置。`getRowId` 必填且须跨排序、刷新和分页稳定。client 模式本地排序/分页；server 模式不二次排序或切片，应用负责请求、取消与迟到响应隔离。单个 state 事件同时传递排序、分页、完整选择 ID 图和活动行；排序变更与归第一页一次通知。外部 page 从 1 起，与 TanStack 的 pageIndex 边界转换。表头全选只改当前页可选行，跨页选择保留，绝不冒充“全服务器结果已选”。活动行用真实按钮激活，与复选框选择独立；过滤、翻页不自动清除它。服务器批量动作须重查对象与权限。
- **分页**：总数为非负整数或显式 null；未知总数必须给出 hasNextPage。pageSize 改变同时归第一页。零条数据内部保留 page=1 作为请求基准，但不渲染“第 1 页存在”的页码；总数下降归到最后有效页并通知应用。受控应用必须接收校正状态后再请求。筛选重置由拥有筛选事实的应用完成。
- **通用确认**：一个 Provider 同刻一个请求，后续调用立即返回 false，不排队积攒失效意图。取消、Escape、AbortSignal、调用方卸载和 Provider 卸载返回 false。true 只表示用户做出确认决定，不表示执行成功；请求 busy、错误与结果由应用持有。需要提交期间保留对话框、对象版本失效保护时，继续使用 ConfirmAction 或声明式 AlertDialog。返回已连接的调用入口；入口被移除时由 popup 的 finalFocus 提供有效上级。
- **异步内容**：`status` 是最新请求事实，`hasContent` 是当前内容仍可呈现的事实。pending/error 且 hasContent=true 时保留同一内容子树；success 且 hasContent=false 才为空态。组件不改变焦点、不禁用有效内容。权限、只读和局部失败独立组合；权限失效后应用必须撤下旧内容，不因“保留内容”继续展示失效数据。
- **Combobox**：便捷入口只覆盖平铺单选，保留完整 Root/部件入口。确认值与输入草稿分离；输入命名与对象文字映射显式提供。远程结果由应用提供；取消是资源控制，generation 守卫才保证忽略迟到成功与失败。模拟 composition 事件只验证代码路径，不能证明真实中文输入法体验。
- **工作台**：`/examples/records` 和 Workspace 文档示例共享一个参考实现。WorkspaceContent 是唯一纵向滚动 owner；TableContainer 只承接横向溢出；筛选、表格、分页和详情在内容区中按阅读顺序排列，顶栏固定。关闭详情即普通列表；详情在 xl 以上与列表并排，以下堆叠。长标题换行，密度通过 data-density 变化，草稿按稳定记录 ID 保存在页面状态。2:1 网格是此页面容量的选择，未新建库 token，也未宣称它由理念唯一推导。

这些判断对应 design.md 的名实相符（请求与有效内容、选择范围）、相成相制（活动行与批选、权限与状态独立）、进退相承（刷新保留草稿与焦点）和随境取度（窄屏与密度）。

## Alternatives considered

- 把所有便利逻辑塞回高级 DataTable：会让实例与配置两种 owner 混用，选择独立 Pattern。
- 仅补示例：不能消除表格/分页/普通确认的重复装配；它适合工作台这类仍由项目拥有的结构。
- 建通用请求/权限状态机：会越过组件职责，无法判断业务数据何时失效；不采用。
- 通用 confirm 内部执行异步业务：会混淆确认决定与执行结果，并重复 ConfirmAction 的生命周期；不采用。
- 重建另一套列表外壳、远程 Combobox 查询缓存或分页游标协议：当前无必要，不引入。

## Consequences

已有实例、部件与快照 API 保留；新入口是 additive。新增 AsyncContent/Confirm 文档、类型和 catalog 资源须一起分发。未增加依赖，未修改全局主题或 token。新工作台参考页是本轮可见新增，现有页面不做视觉重构。

## Verification

本轮执行结果见 [实施记录](../implementation/2026-10-20-consumer-compositions.md)。文档页、生成资源、类型、行为测试与浏览器证据分别记录，不以一种证据代替另一种。

## Revisit when

真实消费者需要树表、虚拟化、列分组/调整、批量“所有结果”选择或服务端游标时，优先使用高级入口并提交明确任务证据；不向简单 Pattern 预先堆叠选项。真实中文 IME、辅助技术与远端请求协议仍须在消费项目环境验收。
