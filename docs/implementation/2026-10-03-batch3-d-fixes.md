# 批次 3 · D：两处缺陷与 Card 表面对照

2026-10-03。**两处缺陷修复 PASS；Card 对照与桌面实测 PASS。** Card 默认阴影的必要性仍待用户裁决。生成同步与全站类型检查的未完成项见下表。

## 语义与关系决定（先于实现）

设计依据只有根 `design.md`。本批不决定新的 Card 默认值。

- **规范关系**：对比规则和交付判据由指南维护；STANDARDS 只保留组件实现入口，并链接指南的「人和 AI 的交付检查」与基础层 §16。发现其他重复的设计要求时同样改为引用，避免两处维护。
- **诊断关系**：danger 的可见后果契约继续成立。开发环境的挂载检查是开发诊断；没有 `process` 的消费者无法提供该运行时事实，按用户明确裁定视作生产环境，跳过诊断，保持页面渲染。既有开发/生产分支与两条合法后果关联不改变。
- **对象关系**：对照中三个设备分区分别有独立身份；另一个对象是网关名称编辑。八组使用相同数据、相同内容布局、真实 Card、Input 和 Button。保存只更新本组本地名称，不伪造服务端结果。
- **表达选择**：①线+面+默认阴影；②仅取消阴影；③透明边框隐藏线，保持边框占位与内容几何；④透明面、无阴影，保留默认线。覆盖只在审查文件的 className / 局部样式中，Card 源码与 token 默认值不改。
- **承载面选择**：页面底实际读取 `--qy-background`；白面读取固定 `--qy-white`，深色主题也保持白色，不冒充主题的 `--qy-surface`。透明 Card 在固定白面上用现有深色文字原料保证内容可读；其中真实 Input 的 `controlClassName` 局部覆写前景、内嵌面、输入线与焦点色，采用已有浅色组合预设。未改 Card 的线、面或阴影预设。间距、字号与颜色均复用现有预设，未称为理念唯一推导。
- **实测关系**：页面事实行读取真实 computed 颜色，以浏览器 Canvas 转为 sRGB 后合成背景、填充与半透明边框，报告边线/承载面、填充面/承载面。无可见边线明确写「无线」；模糊阴影不假设为单一实色，不用该比值代替阴影必要性的用户裁决。

## 范围与阅读边界

开工目录为 `/Volumes/SUNSANG 1/Codex/qingye-ui`；HEAD `275d730`，前两提交 `b93bfe4`、`9d51f7a`。工作区大量已有及并行改动全部保留。本批只写 STANDARDS、Button、Button 测试、`sections/10-card-surface.tsx` 与本报告；未提交、checkout、stash、重置、build 或改生成物。

已读当前 AGENTS、根 design、STANDARDS、基础层、逐值裁决、动作/展示/布局族及 batch2 A/B/C 报告；已读上一批完成的原创 Button/Card 当前实现、原创 Input 的 props 与样式透传部位、Button 与 style-contract 测试、review 入口、当前主题 token 与配置。未读归档组件源码、未读 provenance-freeze；没有重写现存上游派生文件，不需要读取其函数体、className 或样式。无需新增来源删除条目，来源声明文件未改。

## STANDARDS 去重清单

保留本库当前 API、部位、数值预设与具体测试采样方式；以下与指南重叠的要求改为引用，避免分别维护。没有修改 design 或 style-contract 测试。

| STANDARDS 位置 | 改为引用的条款 | 当前来源 |
|---|---|---|
| §0 | 设计硬要求 | design「必须」 |
| §1 | 库/应用职责、请求事实与结果推断 | design「明确修改归属」「名称与状态」 |
| §3 | 围合、表面、删去检验；必要边界的对比数值 | design「空间与表面」「判据」；基础层 §16 |
| §5 | 状态归属与叠加判据 | design「名称与状态」 |
| §6 | 动效的真实性、可中断、任务连续性与减少动态效果验收 | design「变化与恢复」、NG6、交付检查 |
| §7 | 文字层级、混排与容量验收；关键后果与空/零/未知区分 | design「强调与内容」「名称与状态」、NG7、交付检查 |
| §8 | 普通文字/必要非文本比值、半透明合成；焦点标准适用范围与目标尺寸 | design「人和 AI 的交付检查」；基础层 §5、§15、§16；「图形状态不能仅靠颜色」属于实现规则，保留原文 |
| §9 | 三轴不可混用、紧凑表达的设计限制 | design「必须」「空间与表面」；基础层 §13 仍记录当前接线 |
| §10 | 真实浅深组合验收 | design 交付检查；基础层 §16 |
| §11 | 组件文档协议、界面文案、交付范围与证据状态 | design「可执行的协议」「文案」「人和 AI 的交付检查」 |

直接核查 STANDARDS 不再含 `4.5:1` 或 `3:1`；交付检查与基础层 §16 的链接存在，全部本地文件链接及标题锚点可解析，**PASS**。移除旧的「本次仅更新文档」结尾，避免将历史批次声明当作当前规范。

## Button 缺少运行时环境

挂载 effect 在读取环境前增加 `typeof process === "undefined"` 短路；缺少该全局时按生产处理，跳过开发诊断。普通按钮和无关联的 danger 均继续渲染；有环境时原开发/生产策略不变。没有添加 polyfill，也不改变状态、后果关联、ref 或外观。

新增两条参数化测试：neutral 与 danger 在无 `process` 全局上下文中挂载，不抛错且按钮可用。测试读取实际 Button 源码，TypeScript 仅转译 JSX/模块语法，将模块放入不含 process 的 VM 全局，注入真实 React、Base UI、locale、icons、cva 与 cn；挂载 effect 保持该词法环境，未替换 NODE_ENV、未仿写诊断逻辑。

最初直接遮蔽 Node 测试进程的 process，React 测试框架先发生 env 访问错误；改为隔离 Button 模块的全局环境，让测试实际触达目标 effect，没有取消或放宽「挂载不抛」断言。AST 对比确认修改前的 **29 个测试声明逐字保留**，涵盖原开发抛错与生产不抛两条路径；只新增一个声明展开出的两个用例。最终 Button **50/50 PASS**。

## Card 实测

入口：[review.html#card-surface](http://localhost:5180/review.html#card-surface)。每主题 8 组、32 个真实 Card；三张设备卡并排，第四张含可编辑 Input 与提交 Button。①无处理覆盖；②、④只在局部将 `--qy-shadow-panel` 设为零尺寸透明投影；③保留 1px 占位但边框透明；④面透明。没有新增库 token、修改 Card 默认或复制基础控件。

首次浏览器核对发现 `shadow-none` 未覆盖实际 panel 投影，②与④仍有默认阴影；改用部位消费的局部变量，最终 computed box-shadow 的所有层均为透明零投影。首次也发现深色主题/白面/透明 Card 中的 Input 文字与半透明内嵌面不匹配；使用现有 `controlClassName` 局部颜色入口修正，最终文字实测通过。早期观测不作为最终对照证据，初次 Card 的原始 computed 样本保留在 `/tmp/qy-batch3-d/browser-initial.json`。

下面每格为「**边线/底；面/底**」，均为 `:1` 比值。「底」是当前组实际承载面。线下先合成 Card 填充，再合成边框 alpha；③无可见描边，不报告一个虚构的边线比值。

| 样式 | 承载面 | 浅色 | 深色 |
|---|---|---|---|
| ① 线+面+阴影 | 页面底 | 1.10；1.08 | 1.23；1.05 |
| ① 线+面+阴影 | 白面 | 1.19；1.00 | 14.66；17.22 |
| ② 线+面 | 页面底 | 1.10；1.08 | 1.23；1.05 |
| ② 线+面 | 白面 | 1.19；1.00 | 14.66；17.22 |
| ③ 面+阴影 | 页面底 | 无线；1.08 | 无线；1.05 |
| ③ 面+阴影 | 白面 | 无线；1.00 | 无线；17.22 |
| ④ 只有线 | 页面底 | 1.19；1.00 | 1.16；1.00 |
| ④ 只有线 | 白面 | 1.19；1.00 | 1.00；1.00 |

实际页面底 computed 浅色为 `color(srgb 0.966253 0.96643 0.966446)`，深色为 `color(srgb 0.0874013 0.087426 0.0874283)`；固定白面为 `oklch(1 0 0)`。Card 填充浅色为白，深色为 `color(srgb 0.105651 0.105679 0.105681)`；默认边框分别为黑 alpha 8% / 白 alpha 6%。同组四张 Card 的实际边框、填充与投影均已采集。页面事实行随主题 class/属性及窗口变化重新测量，等待 600ms 后读取；最终取样在主题切换后等 800ms。

Canvas 转为 sRGB 8-bit 后合成并按相对亮度换算，表格保留两位小数，末位有量化误差。比值不含圆角抗锯齿或模糊投影；阴影的像素强度随位置变化，没有用单一实色比值代替它。静态 Card 的装饰线不自动套用必要控件边界门槛，本表不判定四个候选的优劣；默认阴影的必要性仍为 **UNVERIFIED，待用户裁决**。

普通标题、辅助内容、label、真实 input 值与 Button 内容按实际背景合成：浅色所测最低 **14.50:1**，深色最低 **13.88:1**，均 **PASS**。局部前景修正只影响白面透明组的内容，Card 默认线色仍保留，故其深色白面边线比值真实为 1.00。

## 已运行验证与边界

| 检查 | 状态 | 观察 |
|---|---|---|
| 最终 `pnpm --filter @qingye/ui typecheck` | PASS | exit 0 |
| Button 测试 | PASS | 50/50，包括新增无 process 两例与原开发/生产路径 |
| `vitest run test/button.test.tsx test/style-contract.test.ts` | FAIL | 56 条：55 PASS / 1 FAIL；style-contract 的 STANDARDS→生成 ai/style.md 同步失败 |
| 源规范去重、引用与锚点 | PASS | 无重复对比数值；交付检查与基础层 §16 引用有效。生成同步测试先在副本差异处失败，故另行直接核查去重断言，没有声称整个契约套件通过 |
| 最终 `pnpm --filter docs typecheck` | FAIL | 157 个诊断，含归档组件引用及并行 Toast 内容类型；本任务 `10-card-surface.tsx` 诊断 0，未修改其他文件绕过 |
| 1280×1000 浅深色审查 | PASS | 8 组/主题、32 Card/主题，8 张候选截图已目检，页面无水平溢出 |
| 1100×1000 浅深色补查 | PASS | 页面与本段子节点无超出 2px 的水平内容溢出 |
| 交互与替代路径 | PASS | 第一组更新为杭州网关，其他组不变；白面透明组空白名称阻止提交，恢复有效名称后可提交 |
| 真实 Tab 焦点 | PASS | 深色默认页面底组，Input/按钮均 focus-visible=true；等待 600ms。Input 1px 边框、shadow none、outline none；solid Button border 0，仅 2px inset 信号 |
| 浏览器错误 | PASS（本段运行期） | 最终采集 pageerror/application console.error 为 0；初次导航的既有 favicon.ico 404 与既有密码演示提示仍保留记录，不称全会话零错误 |
| 原断言与范围保存 | PASS | AST 原声明逐字对照、目标 diff 空白检查；只写五个授权文件 |
| 完整 UI 测试、生成同步、build、打包消费者 | NOT_RUN | 局部检查足够本批；生成/构建由主任务统一执行，未改生成物或放宽测试 |
| 390px、实体设备、辅助技术、完整强制颜色/品牌矩阵 | NOT_RUN | 按用户裁定只做桌面，不把本段结果扩成完整无障碍验收 |

### 资源与证据

复用非本批启动的 Vite PID **59950**（PPID 59927，127.0.0.1:5180），保留服务。Playwright CLI 全程一个 `qy-batch3-d` 会话、一张活动页面，主题/截图/宽度串行；daemon PID **56179**，Chrome PID **56180**（PPID 56179），profile `/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/playwright_chromiumdev_profile-wQTNJr`。

已通过现有 CLI `close` 关闭，`list` 显示 no browsers；daemon/browser/记录的 GPU、network、utility、renderer 后代 PID 全部退出，专用 profile 匹配进程为 0。没有重开清理服务器，没有终止用户浏览器或既有 Vite。

交接证据保存在 `/tmp/qy-batch3-d/`；CLI 临时运行日志位于已有的忽略目录 `.playwright-cli/`，未改其他源码或生成物：

- [browser.json](/tmp/qy-batch3-d/browser.json)：最终 64 个 Card computed 样本、文字合成、行为与焦点。
- [浅色①](/tmp/qy-batch3-d/light-1.png)、[②](/tmp/qy-batch3-d/light-2.png)、[③](/tmp/qy-batch3-d/light-3.png)、[④](/tmp/qy-batch3-d/light-4.png)；[深色①](/tmp/qy-batch3-d/dark-1.png)、[②](/tmp/qy-batch3-d/dark-2.png)、[③](/tmp/qy-batch3-d/dark-3.png)、[④](/tmp/qy-batch3-d/dark-4.png)。
- `final-tests.log`、`final-ui-typecheck.log`、`final-docs-typecheck.log`、`standards-links.log`、`assertion-preservation.log`、`desktop-1100.log`、`cleanup.log`：检查与生命周期证据。
