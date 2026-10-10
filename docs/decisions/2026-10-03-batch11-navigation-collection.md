# 第十一批：导航、命令与集合

依据根 design.md、STANDARDS.md、组件分层与 action/overlay/layout/display/selector 族判据独立实现。9 项均属 Pattern；未读取归档、冻结副本或 Coss 实现。已有其它 owner 改动保持原样。

| 组件 | 任务与原生/原语语义 | 事实与修改归属 |
| --- | --- | --- |
| Menu | Base UI 命令选择，真实 menuitem、组、勾选/单选与子菜单。 | 原语管理打开、键盘、取消与返回；应用提供动作、禁用、选择事实和后果。 |
| ContextMenu | Base UI 上下文命令；右键只是增强入口。 | 与可见 Menu 入口共享应用命令，不把右键变成唯一方式。 |
| NavigationMenu | Base UI nav/list/link 与可返回的展开内容。 | 应用显式 active 与真实 href；不读 URL，不把命令放进导航项。 |
| Tabs | Base UI 同对象视角切换；手动激活，面板到达后保留。 | 当前值可受控或非受控；保留输入，应用决定是否批准切换。 |
| Tree | 稳定 id 的真实层级；roving focus、上下/Home/End/左右、字首导航与独立选择。 | expandedIds 与 selectedId 分开，可受控/默认值；取消不提交。应用提供节点、禁用与数据变化。 |
| Sidebar | aside 中长期导航，nav 与真实链接；本地收起可逆。 | collapsed 可受控或非受控，链接 active 属于应用；不推断路由，不删除导航能力。 |
| FilterBar | 原生 form、Field/Input 组合、草稿待应用标记与已应用摘要。 | dirty、appliedSummary、条件草稿与结果都由应用持有；提交/取消/清除只发出意图，不自行改条件或请求。 |
| BulkActionBar | 明确目标 id/名称/version 与 scope，操作始终携带当前快照。 | 目标/版本/范围由应用确认；零选择禁用批量动作，清除选择不推断服务取消。 |
| DataTable | 调用方 TanStack table 实例 + 本库 Table/Checkbox/Button。 | 应用提供真实数据、稳定 getRowId、排序/筛选/选择状态及结果内容。库不请求、不造总数、不自动隐藏列。 |

## 值与关系

- **推导**：命令采用 menuitem，导航采用 a/aria-current，视角采用 tab/tabpanel，层级采用 tree/treeitem/group，表格保留 table/th/td。选择与展开、筛选草稿与已应用条件、当前集合与批量作用范围是独立事实。
- **约束**：事件、ref、ARIA、render 与消费者样式传到实际部位；取消沿原语事件或自有明确 cancel 协议保留状态。数据 key 不使用位置或标签，Tree 重复 id / DataTable 缺少 getRowId 明确拒绝。加载不替换有效 rows。
- **选择**：组内 action-gap、内容 field-gap、群组/层级 panel-gap、章节 section-gap；Tree 行占位使用 row-default。筛选不是自动提交的搜索输入；应用可明确选择自动应用策略。批量版本必填并可为 0。
- **预设**：菜单行复用 Button 的五档公开 variants，默认 md/quiet 并左对齐；浮层 rounded-overlay、surface-raised、border、shadow-raised、panel-padding-sm 都是既有选择/预设，不作必要性证明。没有新增全局 token、局部动效或字面 z 值。
- **预设**：Tabs 默认手动激活是连续性选择；面板默认「到达后保留」（keepMounted="visited"，2026-10-10）——保留是为了不丢已经做过的事，没到过的面板没有可丢的东西，提前挂载只会让它的请求先发生；此前默认 keepMounted=true。Sidebar 默认展开。Tree 单选不跟随焦点，字首导航以真实标签为依据，缩进复用 panel-gap。DataTable 不自动提供分页或列删除。
- **层级约束**：各自 Positioner 消费 useFloatingLayer('popup')，调用方 style/state callback 最后合并。按 floating-layer owner 的确认，Menu/ContextMenu/NavigationMenu 不新建 Scope；它们属于父工作面，真正 modal 工作面的 Scope 由其 owner 管理。
- **预设/命中**：焦点落在自身盒内；Menu/Tabs/命令复用 Button，独立导航链接复用 touch-target。Tree 焦点标记只落在节点行，不围住后代。
- **文案**：现有 locale 覆盖命令、展开、取消、应用与选择；filterUnapplied/bulkVersion/treeEmpty 由 locale owner 合并。本批不写共享 locale。

## 精准修正

- 安装版 TanStack 的 getIsSomeRowsSelected 按全局 rowSelection 键数判断，不能表达 filtered 范围的半选。本库 SelectAll 的 checked/mixed 与修改集合都从明确 scope 内的可选择 flatRows 得出；过滤外的选择、false 键与禁用行不虚构该范围已选事实。
- Tree 清空时曾使已拥有的焦点落到 body；真实容器 ref 与调用方 ref 合并，无可用节点时回到容器，外部焦点不受影响。
- SidebarContent 的显式 id 与 Toggle 的 aria-controls 同步，避免合法 native id 覆盖后失去真实控制关系。
- Tree 空/全禁用容器是新的真实焦点落点，使用 quiet 焦点角色在自身盒内表达。
- FilterBar/BulkActionBar 的 Button 组合同时尊重 DOM preventDefault() 与公开 preventBaseUIHandler()；SidebarToggle/DataTableSortButton 同类组合亦保持这一取消边界。
- Menu/Tabs 的 Base UI 默认允许禁用项接收组合键盘焦点；精准检查要求其不可执行/不可激活，不把“跳过禁用项”强加给成熟原语。

## 验证边界

只写本批组件、对应精准测试与 meta/demos、78-batch11-navigation-collection 与本批记录。测试覆盖键盘、合法 render/ref、禁用、取消、面板输入保留、稳定节点焦点、草稿/已应用分离、批量快照、零/未知/空数据与选择范围。定点 strict TS；不运行全库、build、gen、Git 或浏览器。浅/深色实际组合、浮层嵌套、滚动和触摸容量交唯一浏览器 owner。
