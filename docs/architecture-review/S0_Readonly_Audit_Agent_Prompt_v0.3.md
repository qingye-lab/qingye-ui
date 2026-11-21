# S0｜React Design System 只读盘点：Coding Agent 执行指令

> **可以直接复制本文件完整内容交给 Claude Code 或 Codex。**  
> 版本：2026-11-18 / v0.3（针对 v0.2.1 双轨安全边界增补）  
> 工作性质：**只读审计 / 证据收集 / 决策建议**。**不是实现任务，不是升级任务，不是重构任务。**  
> 背景：已有 advanced React 组件库，Claude Design 参与设计，Claude Code/Codex 实施开发；正在评估 AI 开发期检索与运行期 Agent UI 操作。候选包括：D0（现状）、D0.5（静态组件目录+源码直读+精准 lint）、D1（Registry+CLI，暂缓）；D（页面/表单级 Tool）、C（ARIA 语义自动化）、A（Vercel UI SDK Primitive/Agent Bridge，React 19+，Beta）。S2 未来分 **BIZ（高频确定性业务任务）与 OPEN（未建模通用 UI）两组独立实验**，但 **S0 不执行任何实验**。

---

## A. 你的任务目标

在**当前本地仓库里进行 S0 事实盘点**，输出带证据的报告，帮助决定：

1. 是否需要任何新 Dev Plane 工具，还是现有代码/类型/Story/规则足够？
2. 真实应用是否存在高价值 Agent 操作任务；应该先接入表单/业务层，还是需要操作实际 UI？
3. Vercel UI SDK 的 React 19+ 门槛与现有 Headless 交互实现是否冲突？
4. 如何以**最低改造成本**进行 S1/S2 对照实验？

**不要写代码，不要安装包，不要修改配置、依赖或锁文件，不要创建 PR。**

## B. 强制工作边界

### B1. 允许

- 阅读仓库目录、`package.json`、lockfile、TypeScript/React 源码、类型定义、Storybook、测试、已有文档及流水线配置。
- 阅读 Git status 与最近提交/PR 本地信息（如有），取最近 5–10 个与 UI 有关的变更进行根因归纳。
- 使用不修改文件的检索和分析命令，例如 `git status --short`、`git log`、`rg`、`find`、`cat`、`sed`、`node -p`。
- 从**非敏感源文件**提取必要的事实、路径、行号、版本号和少量代码片段作为证据。
- 报告输出到对话；如果环境支持指定仓库**外部**路径，也可将报告另存，但不能修改仓库内文件。

### B2. 严禁

- 运行 `npm install`、`pnpm install`、`yarn install`、React 升级、代码生成器、脚手架、编译/测试/格式化命令（它们可能写缓存或生成文件）。
- 修改 `AGENTS.md`、`CLAUDE.md`、组件文件、Story、lint、CI、lockfile、环境变量。
- 调用任何会对业务产生实际写入/部署/网络副作用的脚本、接口或浏览器操作。
- 读取或复制 `.env*`、密钥、凭据、生产数据、真实客户/用户隐私、内部业务标识与商业敏感内容。
- 除当前用户明确授权使用的 Coding Agent 环境外，不得再通过额外 API、云服务、外部检索或其他模型转发私有源代码/完整文件；提供给无仓库权限评审者的报告仅包含脱敏事实与极短必要引用。
- 创建分支、提交 commit、清空/修改已有工作区状态。

如果无法在不运行脚本或不读取敏感资料的情况下取证：**记录“未核实”及缺失原因，不要突破限制**。

### B3. 证据与严谨性要求

每个重要结论附 `文件相对路径:行号`（可用 `rg -n`、`nl -ba` 定位）；版本以实际文件为准，避免根据 README 口头表述推断已安装版本。按四种标签：

- `FACT`：代码/锁文件/CI 直接支持。
- `INFERENCE`：基于事实的工程推断，写出依据。
- `UNKNOWN`：仓库中暂时无法确认。
- `EXTERNAL`：来自公开官方文档而不是仓库；给链接。

不要把“存在某文件”写成“此能力经过验证”。测试是否运行、CI 是否成功如不可核实，标记 `UNKNOWN`。

---

## C. 建议的只读检查顺序

### C1. 识别仓库与技术栈

- 当前工作区 Git status（只读）；Monorepo/多仓/包管理器与 package exports。
- React、React DOM、TypeScript、Next/Vite、Node、测试工具的**声明版本与实际锁定版本**；发现多版本要分别标明应用。
- SSR / RSC / hydration；客户端异步回填与初始化流程；是否存在多个 React Root/微前端与独立 Portal 宿主。
- React 19+ 适配门槛：哪些目标应用满足？升级依赖有哪些潜在阻塞？**不升级，只记录**。

建议命令（按环境选择，不要求原样执行）：

```bash
git status --short
rg -n '"(react|react-dom|@types/react|typescript|next|vite|@radix-ui/[^" ]+|react-aria|react-hook-form|zustand|redux)"' --glob 'package.json' --glob '!node_modules/**'
rg -n '"exports"|"workspaces"|"packageManager"' --glob 'package.json' --glob '!node_modules/**'
rg -n 'use client|useForm\(|createStore\(|create\(|useReducer\(|hydrate|Hydration' --glob '*.{ts,tsx}' --glob '!node_modules/**'
```

### C2. 组件库事实清单

- 实际公共导出组件的数量/分类；不要把私有辅助函数计入“可用组件”。
- `Input`、`Select`、`Dialog` 三个代表组件：公开 Props、controlled/uncontrolled、状态归属、portal/focus、键盘/ARIA、异步选项与错误处理、重要测试；静态源码只能证明意图和实现路径，**不能直接证明浏览器最终 ARIA Tree 正确**。
- 复杂组件是否建立在 Radix/React Aria/Headless UI 或自研状态机上；是否有焦点陷阱、键盘事件两套逻辑的潜在冲突。
- 设计 Tokens、主题、Storybook、文档、代码示例的真实路径；是否有生成 API docs 或 CI 检查。
- 已有 lint、单测、可访问性测试、视觉回归、E2E 规则及覆盖的目标目录。

每个组件用下面一行归纳（缺失则标 UNKNOWN）：

| Component | Public export | Controlled? | Headless base | A11y evidence | Story/types/tests | React API risk |
|---|---|---|---|---|---|---|
| Select | （路径:行号） | ... | ... | ... | ... | ... |

### C3. 开发期（Dev Plane）实际问题

- 当前 `AGENTS.md`、`CLAUDE.md`、Skills、Storybook/Docsite、示例文件是否已经教 Agent 搜索和正确引用组件？
- 最近 5–10 个代表性 UI 变更（若能从本地记录判断）：哪些问题来自**组件发现失败、API 幻觉、Token 违反、重复造轮子、A11y、样式偏差**，哪些问题其实来自需求不清/评审缺失？
- 找 10 个**已存在的高频真实组件**，验证是否能从公共导出找到真实类型 + 示例 + 用途说明。
- 只设计、不执行 5–6 个 S1 Benchmark 任务，覆盖：组件选型歧义、泛型/复合 Props、Token、复用、防幻觉、无障碍。
- 明确 D0.5 静态目录是否只需基于现有文档生成，哪些源文件本来就可以直接被 Agent 搜索。

### C4. 运行期（Runtime Plane）真实业务入口

- 寻找 1–2 个**可在隔离环境模拟**的真实业务操作需求。若仓库无法推断“用户确实需要 Agent”，必须写 UNKNOWN，**不能捏造需求**。
- 找出页面的权威草稿状态（react-hook-form、Zustand、Redux、局部 state、服务端状态），确认 Agent 是否可以经页面/业务 Tool 读取/修改**限定字段**，不侵入 UI 组件。**用表格盘点代表性页面交互**：哪些字段共享同一 Form/Store、哪些组件持有独立内部状态、哪些 Portal/异步列表只是 UI 展示、哪些状态最终由服务端持有；若无法准确计量覆盖率，给出分子/分母范围及 UNKNOWN，不编造百分比。
- 检查状态初始化、SSR/Hydration、远程数据回填、异步校验、保存接口的状态收敛路径。
- 检查是否已有可访问名称/role/aria-*，以便未来 C（A11y/Playwright）对照；**不运行真实浏览器或触发真实业务 API**。
- 识别打开菜单、输入搜索或聚焦可能造成网络请求/业务副作用的路径。
- 检查现有服务端身份、资源权限、版本控制与幂等支持的代码迹象（不要访问真实环境）。特别标出 **Save/Delete/Send 等 R2 持久化接口是否可能由浏览器 UI 点击直接触发**；页面 Tool 禁止后 Agent 若改用 ARIA/DOM 点击同一按钮，服务端是否存在独立门禁。**只能静态推断，不执行写入验证**。
- 检查应用是否已有可区分的 Agent 执行身份或受限会话、可信人工确认通道；如果 Agent 与人类共用可写 Cookie，明确记为跨通道绕过风险，而非假设前端 `allow` 能阻止。
- 区分：用户真实目标是**业务草稿修改**还是**可视化逐步 UI 控制**，或两者都有。分别寻找一个 BIZ 候选和一个 OPEN 候选；没有真实场景就写 UNKNOWN，禁止凭空设计“用户需要 Agent”的前提。

### C5. Vercel UI SDK 接入可行性（静态判断）

- 只核对官方要求与当前仓库版本，不安装任何东西：React 19/React DOM 19 门槛；与现有 Headless 实现重叠范围。
- `Select/Dialog` 是否可以隔离测试 `definePrimitive`，还是需要重写整个交互状态机？只提供初步风险，不得假称已验证。
- 如果 React <19：标注“UI SDK React 适配器当前应用不满足门槛”；不要由此推断独立 `@ui-sdk/core` 在所有环境均不可研究。
- 标明隔离实验能否与现有 app 分离，避免主库依赖被 Beta 污染。

官方依据：https://ui-sdk.dev/docs/react/installation 、https://ui-sdk.dev/docs/agents/connect-an-agent/your-components 、https://ui-sdk.dev/docs/agents/connect-an-agent/permissions

---

## D. 输出格式（必须逐节填写）

请用 Markdown 输出一份可发给没有仓库权限的架构评审 AI 的**脱敏 S0 报告**：

### D1. 项目快照与证据可信度

- Git 状态概况（不展示敏感路径/分支名，如涉及商业信息请脱敏）
- 技术栈：React/React DOM/TS/构建工具及来源证据
- SSR / Hydration / 应用数量 / 底层 Headless 依赖
- `FACT / INFERENCE / UNKNOWN` 数量或关键覆盖范围

### D2. 组件能力盘点

- 对外导出组件大类及数量（有依据的数量）
- Input / Select / Dialog 事实表及证据
- Tokens / Story / Types / Docs / Tests / CI 现状
- 现有公共 API 的高风险兼容点

### D3. Dev Plane 问题分类

- 现状检索能力，近期失败案例及根因分布（只统计有证据样本）
- 哪些问题可用 AGENTS + Catalog + lint 解决？
- 哪些问题真正需要 D1（Registry + CLI）？若无证据则写“尚无必要性证据”
- 提供 5–6 个**取自项目实际组件**的 S1 任务草案

### D4. Runtime Plane 业务抽象判断

- 真实业务场景（最多 2 个，来源与是否经确认）
- 是否已有稳定、可审计的页面/表单状态层；列出代表性页面的**同源状态与封闭内部状态**分布，并说明 D/C/A 是否可能观察同一草稿
- 是否必须做细粒度 UI 操作？如是，为什么不能用领域级 Tool 代替？
- 受控状态、异步回填、SSR/Portal 的风险
- 可访问性语义树是否足以支持候选 C？只写静态推断

### D5. 安全与隐私

- 可能读取/修改的字段类别（只写类型，不展示真实值）
- 现有授权、确认、幂等与审计能力的证据
- 潜在用户生成内容 Prompt Injection 入口
- 开弹层/查选项/聚焦是否隐含请求副作用
- 需要作为 S2 阻断用例的风险点；单独提供 **跨通道 R2 绕过路径清单**（Tool 被拒后点击 Save/Delete/Send 的备用途径、最终服务端授权门禁），只列静态路径与风险，不实际尝试触发

### D6. 关键事实对架构路线的影响

| 证据/未知项 | 关联路线 | 影响 | 置信度 | 后续验证方式 |
|---|---|---|---|---|
| React 版本 | A | 可接入/不可接入 | FACT/UNKNOWN | ... |
| 表单状态 | D | 可行/有风险 | FACT/INFERENCE | ... |
| ARIA 语义 | C | 可行/有风险 | FACT/INFERENCE | ... |
| Catalog/Docs | D0.5 | 是否多余 | FACT/INFERENCE | ... |

### D7. S1 / S2 实验建议（只能给计划，不实施）

- **S1**：D0 vs D0.5 的任务集合、可复现条件、输入、输出、成功指标、失败条件。D1 不得默认进入首轮。
- **S2-BIZ（确定性业务任务）**：以已证实的业务操作为目标，优先 D（领域/页面/表单 Tool）对比现状 R0，评估成本、状态正确率、确认与服务端读回；不能用 BIZ 组胜负判定 UI SDK 在通用 UI 中无价值。
- **S2-OPEN（未建模通用 UI）**：以复杂动态 UI（多步 Dialog、重复 Select、异步筛选、动态 Portal）为目标，在满足 React 19+ 与隔离接入前提下直接比较 C（ARIA）与 A（UI SDK Bridge）；没有场景证据时不得宣称存在产品收益。
- **两组共用的安全硬断言**：R0 读取白名单、R1 Scoped Intent、**D 拒绝 R2 后经 C/A 点击保存也不能提交**、D/C/A 与人类界面共享一份权威草稿状态、受控回调拒绝、异步回填、确认取消、提交后端幂等与读回。
- 对每条路线写可行性和改造代价；清楚区分静态推断和未来执行验证，不在 S0 运行任何对照测试。
- 说明是否需要真实用户提供一个明确的 Agent 业务场景；如没有场景证据，不建议进行高成本 Runtime 改造。

### D8. 最终 S0 裁决

必须在以下状态中选择：

- `READY_FOR_S1`：开发期可设计对照；说明为何；
- `READY_FOR_S2_POC`：存在明确场景且版本/权限门槛有解；说明为何；
- `NEED_MORE_EVIDENCE`：关键事实不足；列具体缺失项；
- `BLOCKED`：存在结构性冲突，先处理风险。

这些状态可以组合，例如 `READY_FOR_S1 + NEED_MORE_EVIDENCE_FOR_S2`。逐一列出**下一步批准/暂不批准的工作**，不要自动创建实施计划或 PR。

---

## E. 结束前自检

- [ ] 仓库 Git status 与开始时一致；没有新文件/依赖/提交。
- [ ] 所有重要判断有文件路径:行号或标 UNKNOWN。
- [ ] 没有把 Story/README 当作已运行测试的证据。
- [ ] 没有私有代码整文件、敏感值、用户数据或真实生产日志进入脱敏报告。
- [ ] 没有安装 UI SDK、改 React 版本、自建 CLI、执行测试或调用真实业务服务。
- [ ] D（业务状态）、C（ARIA）、A（UI SDK）的价值判断以场景驱动，而非以工具偏好驱动。
- [ ] 已分别列出 BIZ 与 OPEN 场景（或明确 UNKNOWN），没有拿同一表单结论推断开放式 UI。
- [ ] 已盘点同一表单/页面的唯一状态源、R2 后端提交入口、可能的备用 UI 点击路径。
- [ ] 已检查 Agent 若共用人类可写会话是否存在无法靠前端阻断的安全风险。
- [ ] 最终报告可以脱离私有 GitHub 权限独立评审。

**完成后停止，等待架构裁决。不要自作主张进入 S1/S2 编码。**
