# 消费端组合实施记录 · 2026-10-20

起点：`e20148b`，工作区干净。分析与公共契约见 [决策记录](../decisions/2026-10-20-consumer-compositions.md)。以下保留首轮实施时的证据快照；后续审查修复和 4.1.0 发布准备见末节。未修改外部消费仓库。

## 实施结果

| 方向 | 已实施入口 | 行为与边界 |
|---|---|---|
| 配置式表格 | `components/data-table` 的 `DataTablePattern` | 内建实例、排序头、当页选择列和分页；client/server 模型明确；稳定 ID、完整跨页选择图、活动行和原子状态更新；原 `DataTable` 保留 |
| 分页组合 | `components/pagination` 的 `PaginationPattern` | 页窗、每页条数、总数和边界；page 从 1 起；pageSize 变更原子归第一页；0 结果、总数下降、末页删除和未知总数有单独契约 |
| 通用确认 | `components/confirm` 的 `ConfirmProvider` / `useConfirm` | await 布尔决定；重复调用、退出期、取消、中止、卸载、焦点回返；执行 busy 与失败恢复由应用示例展示；ConfirmAction 快照重审不变 |
| 异步内容 | `components/async-content` 的 `AsyncContent` | 请求状态与内容有效性分开；刷新失败保留子树、草稿、选择和焦点；反馈与 busy 内容互为兄弟，默认加载播报不处于 busy 祖先中 |
| 搜索单选 | `components/combobox` 的 `ComboboxSelect` | 平铺单选便捷组合；确认值/查询草稿分离、清空、禁用/只读、空/加载；应用远程示例采用 Abort + generation，忽略同查询重入的迟到回包 |
| 工作台 | `/examples/records`，Workspace 文档中的同源参考 | 可切换列表/列表加详情；一个纵向滚动 owner；表格横向溢出；稳定 ID 草稿；密度切换、长名称与零结果 |

根 index、catalog、API 漂移报告、包内 AI 资源、网站 Markdown/AI 副本及 sitemap 已由原生成器更新。未手工编辑生成副本。原语与高级实例 API 保留，未新增依赖或 token。

## 已执行验证

| 状态 | 检查 | 证据与限制 |
|---|---|---|
| PASS | 13 个相关 Vitest 文件，合计 96 项 | 主线 10 文件 63 项；确认负责人额外 3 文件 33 项；重叠 conventions 不重复计数。表格焦点修复后 data-table 两文件 13 项复验，AsyncContent busy 修复后 4 项复验 |
| PASS | UI / docs typecheck | 各负责人和主线均执行；最终两项 build 也运行 TypeScript 编译 |
| PASS | `pnpm --filter docs test` | 61 项通过，0 失败；现有 Vite 测试进程曾输出 24678 HMR 端口占用提示，未影响最终测试退出或结果 |
| PASS | `pnpm --filter docs check:components` | 419 个 docs TSX、4 个合法 render 原语、0 控件违规 |
| PASS | UI build / docs build | 最终源码生成 catalog、声明、CSS 和官网静态产物；95 个组件资源，legacy 独立 pattern fixture 元数据仍为 0，不与组件的 pattern layer 混淆 |
| PASS | `pnpm --filter @qingye_lab/ui check:pack` | 实际 tarball 703 文件；121 个声明映射均指向包内源码；publint strict / attw esm-only 通过。此项不等于已发布或完整外部消费应用验收 |
| PASS | `git diff --check` | 无空白错误 |
| PASS | 最终构建官网浏览器 | `DOCS_URL=http://127.0.0.1:5181 COMPOSITIONS_OUT=test-results/consumer-compositions-built node scripts/verify-consumer-compositions.mjs`：21 项串行检查，0 页面/控制台错误 |
| UNVERIFIED | 真实中文 IME、真实读屏器、触屏硬件、WebKit/Firefox | composition 模拟、Chromium 键盘与自动扫描不替代这些验收 |
| NOT_RUN | 真实消费项目迁移、生产接口/权限/幂等协议、发布 | 本次只实现库和第一方合成数据参考页 |

相关单测文件：`async-content`、`locale`、`workspace`、`conventions`、`data-table`、`data-table-pattern`、`pagination`、`pagination-pattern`、`combobox`、`combobox-async-demo`、`confirm`、`confirm-action`、`alert-dialog`。

## 浏览器与视觉证据

脚本：[verify-consumer-compositions.mjs](../../scripts/verify-consumer-compositions.mjs)。证据位于被 git 忽略的 `test-results/consumer-compositions-built/`，其中 `report.json` 记录检查、截图、运行时错误和进程生命周期。

- 1440×960 / 390×960，浅色/深色均检查真实主题类。页面与工作台横向溢出均为 0，文档高度等于视口，纵向滚动在 WorkspaceContent 内；手机表格宽 640px，由它的容器承接横向滚动。键盘 PageDown 实际滚动内容区，页面 scrollY 保持 0。
- 当页全选→下一页再全选→返回，完整 20 个选择 ID 保留；活动详情与跨页勾选独立。关闭/重开详情、零结果筛选和密度变化保留本地草稿。
- 刷新→失败→重试→完成保持同一 input 身份、草稿与焦点。首次加载/零结果/首次失败另由组件测试覆盖。
- Combobox 检查查询草稿不改变 FormData、方向键/Enter 确认、显式清空、只读和禁用。远程竞态由实际示例的测试覆盖，未连接真实远端服务。
- 通用确认检查 Escape 的 false 与焦点回返、true 决定、调用方 busy、失败保留草稿。卸载、中止、连续触发、嵌套对话框及 signal 清理由单测覆盖。
- 4 个工作台主题/宽度组合与 DataTable、Pagination、Combobox、Confirm 的深色示例通过 axe 的 WCAG 2 A/AA、2.1 AA 自动检查，包含可自动判断的对比度；这不是完整 WCAG 或人工辅助技术验收。

逐张查看桌面、手机和深色截图后，修复了排序列名被 Button 折行、窄屏长记录名被挤成逐字换行的问题。前者收敛在 DataTableSortButton，后者是参考页的列阅读容量选择。未更新既有截图基线。

## 资源归属与收尾

全部浏览器工作由主线单独拥有；每轮只有一个浏览器和一个 tab。`browser-runtime.mjs` 在 finally 中关闭 context/browser 并核验后代退出。最终构建验证 Node PID 99635、浏览器 PID 99646，临时 profile `playwright_chromiumdev_profile-nFhbNO`；report 中 `closed=true` 且 `remainingProcesses=[]`。

主线 dev 为 85605→85629（5180），built preview 先为 94233→94250，最终复验为 99189→99207（5181）。收尾按 PID、父子链与完整命令核实，只关闭本轮启动的进程；用户原有 4174 服务保持原样。

## 审查修复与 4.1.0 发布准备

后续独立只读审查复现：ConfirmProvider 在 Activity 中隐藏/恢复后，请求已取消但旧 view 保留；StrictMode 中从 layout effect 请求确认也会遇到同一断连。原 cleanup 只释放 active，且 hook 的 passive 恢复晚于调用方 layout effect。

修复在 Provider 的 layout 生命周期重连时按请求身份清理过期 view，清理时结算未决请求并移除监听；useConfirm 的可用状态也在 layout 阶段恢复。隐藏期间不依赖 setState 或退出动画；恢复过程中由 layout effect 发起的新请求不被误删。

回归先观测到 Activity Provider 与 StrictMode 两项失败，修复后确认测试 19 项及相关 25 项通过。4.1.0 的本地完整验证已通过：116 个 UI 测试文件／1040 项测试，docs 61 项、tooling 31 项、Studio 14 项，另有 Studio preview 3 项；workspace typecheck、facts-ledger、process/delivery tests、UI/Studio/docs build、API 漂移检查和实际 tarball 的 publint/attw 检查通过。

版本化资源生成到 `ai/v4.1.0/`；既有 `ai/v4.0.0/` 恢复并保留原版本快照，且排除在新 tarball 外。发布说明为 [v4.1.0](../releases/v4.1.0.md)。GitHub 和 npm 的最终发布状态应以对应远端查询为准。

首轮远端 CI 还发现异步 Combobox 示例测试隐式依赖已有 dist：Vite 在 mock 生效前先解析公共包入口，全新检出没有构建产物而失败。已在 Vitest 配置把公共组件入口映射到当前源码，移除该示例测试的包 mock。通过暂存并恢复本地产物复现构建前失败，再在无 dist 的同一条件运行完整 UI 测试，保持 CI 的先测后构建顺序。
