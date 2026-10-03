# Qingye UI 重写路线图

2026-10-03 起草。覆盖从当前状态到发布的全部后续任务。依据：根 `design.md`（唯一设计依据）、
`docs/decisions/component-layering.md`（83 个组件的分层与取舍）、`docs/decisions/2026-10-03-value-adjudication.md`（逐值裁决）。

## 一、目标与边界

全部 83 个组件按 `design.md` 从零重写，不以保留任何既存实现为目标；仓库内不保留上游派生代码。

| 层 | 数量 | 说明 |
|---|---|---|
| Foundation | 6 | 值、角色与底线，不含交互 |
| Primitive | 44 | 不能继续拆分而不破坏交互语义 |
| Pattern | 33 | 无业务对象仍成立的组合结构 |
| **合计** | **83** | 另有 9 个已判删除，永不恢复：sheet、disclosure、frame、preview-card、spinner、skeleton、command、menubar、resizable |

## 二、持续有效的用户裁决

| 裁决 | 落实方式 |
|---|---|
| 组件完全按用户理念重写，不抄上游 | 子代理禁止读取归档与冻结的组件源码；值无唯一依据时标「选择/预设」 |
| 每个值说明「哪条关系决定了它」 | 基础层与各族决策文档逐值定性：推导 / 约束 / 选择 / 预设 |
| 控件外面不出现任何一圈焦点 | 有边框的只变色不加粗；有填充的在填充内侧反色线；无边界的自身盒内 1px |
| 按钮三档 solid / bordered / quiet | bordered 为白底、50% 边框（与输入框同强度） |
| 尺寸五档各用同名文字档 | 留白 4/5/6/6/7，不得只涨高度不涨字号 |
| 页面不需要适配移动端 | 审查页、演示、文档只做桌面验证；组件既有窄屏接线保留但不新增工作 |
| 演示只展示组件与简单组合 | 不编排业务流程、假数据、假服务；`design.md` 的 Examples 定义已改 |
| 组件库不含业务内容 | 源码、测试、文案中不出现虚构业务对象或故事 |
| 执行交给 Codex 子代理 | gpt-6.1-sol / xhigh；每批 2–4 个；主 agent 只下发、审核与统一验收 |
| 发布前不重新发布 | 全部重写并测试完成后，经用户批准才发布 |

## 三、当前状态（2026-10-03 22:00）

### 已在仓库（20 个）

| 层 | 已完成 | 数量 |
|---|---|---|
| Foundation | layout、typography、separator；theme-provider、motion-provider（**保留未重审**，见阶段四） | 5 / 6 |
| Primitive | button、input、checkbox、radio-group、select、switch、textarea、field、fieldset、popover、tooltip、toast、dialog | 13 / 44 |
| Pattern | card、alert-dialog | 2 / 33 |

库验收（第三批末）：typecheck 0 错误，389 测试通过，构建成功；第四批新增组件的统一验收在第五批结束后进行。

### 进行中：第五批

| 子代理 | 任务 | 状态 |
|---|---|---|
| L1 | 审查页去业务场景；`design.md` Examples 定义改写 | 运行中 |
| L2 / L3 | 18 个组件的演示去业务场景 | 运行中 |
| L4 | radio-group、select 的演示与审查段落去业务场景 | 排队（上次被连带中断，重派） |
| L5 | 组件源码、测试、内置文案中的业务内容清理 | 排队 |
| M | 删除 `useIsMobile` → 重新取证 → 通过后删除 MIT 声明、来源清单、上游检查脚本 | 运行中 |

## 四、待用户裁决（阻塞相关任务）

| # | 事项 | 现状与证据 | 阻塞 |
|---|---|---|---|
| D1 | Card 默认要不要阴影 | 审查页「Card 表面」对照：浅色下去掉阴影后卡片与页面底对比仅 1.08:1 | Card 定稿；所有承载面类 Pattern |
| D2 | 浮层层级（z-index）是否设角色 | 已删除继承的 `z-50`，依赖 Portal 自然顺序；Dialog、Popover、Toast、Tooltip 同时出现的遮挡未验证 | 阶段三的菜单、日期、组合框 |
| D3 | 归档区与冻结副本何时删除 | 位于仓库外，是取证依据 | 仅阶段七 |
| D4 | 官网首页与组件页的视觉方向 | 外壳当前打不开（已接受） | 阶段五 |

## 五、阶段与批次

每批最多 4 个子代理，按族分配、文件归属不重叠。每批结束：主 agent 统一重建生成物 → typecheck / test / build → 桌面浏览器实测 → 审报告 → 向用户汇报，并更新本文件第三节。

### 阶段一：清理与来源收尾（第五批，进行中）

见第三节。完成标准：演示、审查页、库源码中无业务内容；`src` 与 token 取证通过；MIT 声明与来源清单删除；`AGENTS.md` 记录完成日期。

### 阶段二：原语（31 个 + 基础层 1 个）

| 批 | 子代理 1 | 子代理 2 | 子代理 3 | 子代理 4 |
|---|---|---|---|---|
| 第六批 · 表单 | label、form、input-group | number-field、otp-field、tag-input | checkbox-group、toggle、toggle-group、segmented-control | slider、native-select、button-group、group |
| 第七批 · 展示与反馈 | badge、avatar、kbd、status-dot | alert、pending-value（新增）、meter | progress、progress-circle | accordion、collapsible、drawer、hover-card |
| 第八批 · 工具与基础 | copy-button、scroll-area、aspect-ratio | locale-switch（新增）、virtual-list（新增） | 重审 theme-provider、motion-provider | 基础层补遗：浮层层级角色（依 D2） |

要点：
- `pending-value` 承担「写入结果未知」，与 Button、Toast 的状态词汇一致。
- `drawer` 吸收 sheet 的方向参数；`collapsible` 吸收 disclosure。
- `copy-button` 复用已重写的 `useCopyToClipboard`（成功只在真实写入之后）。
- `virtual-list` 只承担可达性与渲染边界，不带业务列定义。

### 阶段三：模式（31 个）

依赖顺序：先菜单与集合基础，再组合框与日期，最后复合模式。

| 批 | 子代理 1 | 子代理 2 | 子代理 3 | 子代理 4 |
|---|---|---|---|---|
| 第九批 · 菜单与导航 | menu、context-menu | navigation-menu、breadcrumb | tabs、steps | timeline、tree |
| 第十批 · 输入组合与日期 | combobox、autocomplete | calendar、date-picker | date-range-picker、date-time-picker | code-block、chart |
| 第十一批 · 集合 | table、data-table、pagination | filter-bar（新增）、bulk-action-bar（新增）、empty | item、description-list、stat | page-header、sidebar、toolbar |
| 第十二批 · 复合 | confirm-action（新增） | carousel | file-upload | 全库一致性复核（焦点、尺寸、文字档、token 消费） |

要点：
- `menu` 是命令，`select` 是值；命令面板（原 command）用 menu + input 组合表达，不恢复独立组件。
- `confirm-action` 针对当前对象、版本与变更内容，与 alert-dialog 分工（容器 vs 契约）。
- `data-table` 依赖 `table`，`date-*` 依赖 `calendar` 与 `popover`，`combobox` 依赖 `input` 与浮层层级（D2）。

### 阶段四：基础层与文档定稿

- 依 D1、D2 的裁决更新基础层 §5、§6、§15 与相关族文档。
- 重审 theme-provider、motion-provider（第八批）后，基础层 6 个全部按 `design.md` 定稿。
- 七份族文档与基础层逐节对照现状，删除已不成立的表述。
- `STANDARDS.md` 只保留实现规则，设计要求一律引用 `design.md`（已有测试约束）。

### 阶段五：官网（第一方消费端）

- 依 D4 定首页与组件页视觉。官网外壳只消费本库公共组件（`website-as-consumer.md`）。
- 恢复 `/playground/<name>`、组件页、`/design.md` 投影；删除 `review.html` 之外的临时审查入口。
- 演示遵守「组件与简单组合」；只做桌面。
- `scripts/audit.mjs` 与 CI：审计视口与「页面不适配移动端」对齐（需改审计变体，单独决策记录）；恢复 CI 绿灯。
- 原 Pattern 文档页（编辑、集合、审阅、队列、阅读、详情）按新规则改写为模式契约说明，不带业务故事，或删除——随阶段三的对应模式决定。

### 阶段六：分发资产与本地化

- 重建 `catalog.json`、`ai/SKILL.md`、`ai/style.md`、registry；核对生成物与源码一致。
- 英文本地化：除示例外的全部非示例内容（组件元数据、决策摘要、站点文案）；示例不翻译（用户裁决）。
- 打包消费验证（Tailwind 与预编译两条路径）。

### 阶段七：发布

- 用户批准后发布新主版本（破坏性变更清单单列：Button 变体、Field 删除别名与自动校验、`useIsMobile` 删除、9 个删除组件、视觉基线变化）。
- 依 D3 处置仓库外归档区与冻结副本。

## 六、每批的固定流程与验收

1. **任务书**：语义与关系先行（决策文档），再写代码；只依据 `design.md`；禁止读取归档/冻结源码；
   文件归属不重叠；生成物与 build 由主 agent 统一；测试不得为通过而放宽；演示只展示组件与简单组合；只做桌面。
2. **监视**：以 `^EXIT=` 判定子代理结束，不以日志片段推断。
3. **主 agent 验收**：`gen:index` → `build` → `typecheck` → 全量 `test` → 审查页浅深两主题桌面实测
   （pageerror / console.error 为 0、无水平溢出、真实 Tab 焦点、尺寸不变）→ 审读报告，核对其声称与源码一致。
4. **汇报**：结果、新增破坏性变更、待裁决事项；更新本文件。

## 七、风险与已知未验证项

| 项 | 状态 |
|---|---|
| 浮层同时出现的遮挡顺序 | UNVERIFIED，待 D2 |
| Base UI 对话框背景未使用原生 `inert`（以 ARIA 隐藏、焦点管理与遮罩截获实现） | 已记录，接受原语机制 |
| 辅助技术真实朗读、强制颜色完整矩阵、RTL、200% 缩放 | NOT_RUN，阶段五前补测 |
| 官网外壳与 CI | FAIL（已接受），阶段五恢复 |
| 窄屏 | 不验证（用户裁决） |
