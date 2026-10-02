# 文档、事实与任务模式交付记录

状态：六模式及补充应用夹具实现、静态/状态契约检查完成；真实浏览器集成验收由主任务持有的唯一浏览器完成。最终视觉定稿、真实辅助技术、触屏/IME 和真实后端协议没有因本记录而获得验收。

## 范围与设计决定

承担 W02、W04、W09、W10 的库事实、公开文档、六模式和 AI 资料。在用户确认的新立场下，首页先试用编辑/恢复与正文阅读，然后解释“器用为本，关系为法，合宜为度”。不再以组件数量或未证明的 AI 效果承担价值叙事。没有新增图片或视觉候选，也未要求图像选择确认；最终视觉表达后置。

保留 `/docs`、所有 `/docs/components/:slug`、`/playground/:slug` 和 `/examples` 既有路径。增加方法、基础判断、模式和 AI 入口，导航与搜索读取同一指南索引。

公共源码和 tokens 由库实施者修改，本边界只消费。正常关系布局集中在 `apps/docs/src/patterns/patterns.css`，使用 `--qy-field-gap`、`--qy-section-gap` 与 `--qy-action-gap`。动作间隔 token 有六模式、主页及 Tree 惰性示例的真实引用。Table 的二维比较需要窄容器横向阅读；不删关键列以制造紧凑。

## 同源事实与公开内容

`packages/ui/scripts/gen-catalog.mjs` 是 catalog、包内/站点 design.md、版本化 Markdown、llms、Skill 和 Registry 的生成入口。

- schemaVersion 2 保留旧 catalog 字段；新增真实导出、声明签名、类型声明、来源 SHA、API 元数据、示例源码、依赖和公开设计判断。
- 实际导出从 TypeScript AST 解析；别名递归追踪到 group 和 preview-card 的实现。`usageImports` 为元数据中组合所需的跨模块名称提供真实归属，例如 CheckboxGroup 使用的 Checkbox，以及 CopyButton 使用的根导出 hook。
- `actualExports` 是声明事实，`api` 是已有人工元数据；完整继承类型图没有解析。缺失签名与类型解析明确为 UNVERIFIED，不能据此宣称任意 prop 受支持。
- Provider 导出、示例中出现的 Provider 和既有说明分别记录。required 不从导出猜测；要求状态保留 UNVERIFIED。调用方仍需读取示例和安装版声明。
- 可选 peer 从实际导入和 package.json 推导。Chart 的 recharts、DataTable 的 TanStack 依赖进入对应组件事实。
- 全部 88 组件保留现有 metadata API，公开设计判断由 `design-guidance.ts` 同源提供，并由组件页显示。Button 使用判断改为按任务安排完成/保护动作，撤除机械的固定主按钮承诺。
- Tree 的 hasChildren、DataTable 刷新保留已有行与 ids/rows 范围已同步文案，增加惰性 Tree 的应用加载/失败/重试示例。
- 两份公开稿作为明确允许的内容源进入 `src/public-content`；理念专页完整呈现公开文本和来源简注，并提供六种方法到实际任务的入口。内部源文件、私有路径、C/V 台账没有进入下载或搜索。
- `/design.md` 和包内 design.md 与仓库根源逐字一致；没有手写另一个指南版本。
- Registry 是 shadcn 标准 JSON：项目 Provider、主题入口、项目编辑组合。基础控件从公共包导入，依赖固定当前包版本。实际 Registry/MCP 客户端安装与检索没有在本 agent 运行。

## 六模式的应用状态边界

| 模式 | 地址与关键入口 | 实现与保留边界 |
|---|---|---|
| 编辑 | `/docs/patterns/edit`；“下次模拟响应”“保存草稿”“放弃这次修改”“恢复草稿” | 原位名称校验、明确失败保留输入、超时进入未知并先核实；在途请求身份与提交快照不会被新输入清除，保存回执只推进 saved 并保留新 draft。A/B 切换缓存各自草稿、已保存版本与未决请求，切离在途保存后回来须先核实；恢复仍未保存。限时撤销与放弃草稿分别执行，撤销 pending 时不能切换对象或替换草稿。草稿和放弃快照在浏览器会话保留。保存/发布各自命名。 |
| 集合 | `/docs/patterns/collection`；搜索、当前页选择、跨页、“选择全部五份夹具”“重放过期查询” | 查询代次保护、查询/页码写入 URL、选择按 ID 在会话保留；初始空、查询无结果、无权限、载入失败互斥，各有出口。五项分为三成功一失败一未知，安全重试仅针对失败 ID，未知项先核实。 |
| 详情 | `/docs/patterns/detail/r1` 等；列表摘要、直达、返回、“重放对象消失” | 列表路径带明确来源查询/页码；直达提供稳定集合入口。消失状态绑定 objectId，不污染随后对象。集合预览触发项消失后，Dialog finalFocus 返回集合标题；详情独立消失后聚焦合理标题。 |
| 审核 | `/docs/patterns/review`；原值/建议值、核对、采用、“重放建议版本变化” | 确认绑定提案版本和字段范围，范围/版本变化使确认失效；失败保留选择，未知先核实。只有本页局部结果记录，不表示真实业务授权。 |
| 队列 | `/docs/patterns/queue`；FileUpload、“载入三份样例文件”、开始、失败重试、核实、请求取消 | 真实 FileUpload files/getProgress/getError/renderActions；应用管理阶段/attempt。传输与处理分开，取消中等待确认，过晚取消显示完成。活跃/未知列表不能直接移除；离开只终止本地夹具，不声称取消后台任务。 |
| 阅读 | `/docs/patterns/read?chapter=relation`；章节、记下位置、继续阅读、返回开头 | 正文有独立阅读宽度和可键盘滚动区域。章节可直达，位置在会话保存；重新进入无章节时恢复。文本阅读遵循本轮不使用图的决定；远程媒体生命周期未执行。 |

六模式均有 `data-pattern` 定位。异常夹具在 `details > summary`“演示与状态”，不塞入正常业务操作的说明文案。

集合有意使用 Table 组合，为二维比较、明确查询归属与范围记录留出边界；模式页链接现有真实 DataTable 的 `#server-selection` 示例。该示例实际使用 manualPagination 和 bulkActions，ids 包含跨页选择，rows 只有当前 data 中的对象。

原始权限数据仅存在 Node 测试夹具，白名单投影同时生成浏览器源 JSON 与 `/authorized-resources.json`；列表、预览和详情只使用同一 DTO，受限原字段不进入公开资料或浏览器源码。纯 Node 测试检查原字段与标记未出现在载荷。访问申请只记录本地待回复状态，不改变权限。

所有写入、核实、取消和权限均为合成本地应用事件。公共库不承担后端状态；真实持久化、操作 ID、幂等、授权和取消协议由宿主接入后另行验证。

## 实际检查

- `node packages/ui/scripts/gen-catalog.mjs`：PASS，88 组件、6 模式、3 Registry 项及版本化公开资料生成。主任务最终集成后需重新执行，以覆盖随后源码/文案修改。
- `pnpm --filter docs typecheck`：PASS，当前最后修改后已运行。
- `pnpm --filter docs build`：PASS，首次完整文档改造构建；随后链接角色、Tree 示例和补充应用夹具修改后的最终构建交由主任务运行。
- `pnpm --filter docs test`：PASS，17/17。覆盖失败保留、未知禁止重提、未决提交快照与后续草稿分别保留、空标题不能降级在途状态、未知对象往返不能绕过核实、放弃/恢复、批量重试范围、确认版本、取消分支、跨对象迟到响应、保存撤销成功/失败/过期及 pending 保护、敏感字段投影、别名/可选依赖、指南同源及公开内容边界，以及原生链接角色。
- 后续编辑状态修复先运行回归证明缺口：原实现 16 项中 5 FAIL，分别涉及 pending 输入忘掉身份、同请求结果丢失、返回原对象忘掉未知状态、对象缓存缺少 request 和 pending undo 可切走。修复后 16/16 PASS。再补“pending 改空标题后再次提交”先实测 1 FAIL，前移提交防重入后最终 17/17 PASS。
- `node --check scripts/verify-task-patterns.mjs`：PASS。本次补充预览触发项消失回焦、集合五事实及出口、A/B 与在途输入状态隔离、实际 15 秒撤销期限、发布 action/后果说明、空正文/不自动采用、DTO HTTP/隐藏 DOM/全构建产物敏感标记扫描。增加六模式 × 两主题的 108 项内容/几何检查：正常 1280/390/320px，1280/320px 的 200% 文本、规定文本间距及组合条件。保留内容和字段值，检查裁切与动作遮盖，验证表格/长文局部滚动首尾可达；失败不得当通过。脚本的真实浏览器执行仍交由主任务负责。
- `apps/docs/package.json` 新增 test，接入现有根递归测试链。
- 主任务浏览器首轮实际发现 Button render 链接仍为 button role，已修成原生 Link/a + buttonVariants。保留命令 Button。SSR 和模式 AST 回归证明新导航结构，真实浏览器复验仍由主任务负责。
- 曾出现 generator 检查失败：元数据组合导出不一定由当前模块导出。已修在事实归属层，没有增加伪导出或删去 API；根 hook 与跨组件名称使用 usageImports。
- 公开边界检查最初误匹配已有合成设备名 HZ-CORE-SW01 的 W01 子串。按完整 ID 词边界修正判据；真实私有路径、内部编号与工作资料仍被检查。

本 agent 没有运行浏览器/E2E，没有新增依赖、提交、推送、发布、迁移真实项目或调用远程模型。没有宣称视觉、辅助技术、触屏、真实中文输入法、后端协议、成熟客户端接入或 AI 使用效果已经通过。

## 可见变化与兼容影响

首页从组件/既有产品展示改为工作台与阅读并列的操作入口；组件页增加使用判断，文档导航新增任务和方法。属于明确可见的结构变化，不以 refactor 隐藏。旧产品 examples 与组件/游乐场地址保留。

catalog 是增量 schema 变化，旧字段仍保留；机器使用者应优先使用 actualExports 和 usageImports 查询实际归属。Schema 版本、来源 hash 与不确定状态避免把公开说明等同于运行时保证。

后续依赖：主任务重生成/构建后运行唯一浏览器验收，包括新增权限/消失/集合事实/跨对象/撤销夹具；包 exports/files 与工具链由主任务集成；当前客户端的资料检索与 AI 对照单独留证；人工视觉定稿继续后置。
