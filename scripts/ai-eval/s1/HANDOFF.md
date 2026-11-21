# S1 已收尾（2026-11-21，用户裁决跳过正式矩阵，见裁决第 24 条）

不再继续跑测。框架与冻结 v18（`31e23f345555`）保留作重开基线。v18 相对 v17 只改评分脚本，修复审查发现的问题：同级污染正则原先匹配不到第三轮的嵌套根目录（用新规则回扫第三轮 69 份 transcript，无命中，第三轮结论不变）；污染先于测试结论、超时先于 INVALID；受保护文件评估后放回代理版本，重评不丢证据；冻结范围纳入 `../lib.mjs`、`freeze.mjs`、`r3-batch.sh`。第 23 条建议中的三项库内事项已另行完成（见裁决第 24 条“去向”），本方向无剩余待办。`results/` 不入库。以下为历史交接记录。

# S1 交接：第三轮跑测完成（Codex 线被用户中止；冻结 v17）

更新时间：2026-11-21。结果与结论见裁决第 23 条（`docs/architecture-review/S0_Ruling_2026-11-20.md`）。

## 第三轮跑测摘要
- 冻结 **v17** `fbdd46995e60`：相对 v16 只改 `private/T26.test.tsx` 的 [api] 断言（接受 collapsible）。v16 分数副本在 `results/v16-r3/`。
- 运行脚本 `r3-batch.sh <DN|D0> <codex|opus|sonnet> <次数> <题...>`；根目录 `/private/tmp/qingye-s1-r3/<cond>/<配置>-<题>-<次>`，日志 `/private/tmp/qingye-s1-r3-logs/`（`*.done` 记录退出码）。
- DN：Opus、Sonnet 各 T24–T29、T7 × 3 次，全部有效。除 T29（0/3、0/3）外全过（T26 Sonnet 经 v17 重评）。Codex 只完成 T24–T27 × 5（全过）；T28 第 1 次被杀，INVALID（用户中止）；T28、T29、T7 的 Codex 未跑。
- D0：只补 T29（Opus、Sonnet 各 3 次），全部 FAIL。
- T29 题目缺陷：`severity-mark.md` 与 `meter.md` 对行内级别给出两种推荐，代理按指南选 SeverityMark 却不满足 `role="meter"`。**未修**；需先裁决库文档，再决定改题或改评分。
- 没有接续点：本轮已收尾。若要补 Codex，需要新的用户授权：T28、T29、T7 的 DN × 5，以及 T7 的 D0 对照。

---- 以下为第三轮出题前的旧交接 ----

# S1 交接：第三轮出题完成（T24–T29，冻结 v16，未跑代理）；第二轮运行见下

更新时间：2026-11-21。第三轮出题见 `docs/architecture-review/S0_Ruling_2026-11-20.md` 第 22 条；第二轮运行见第 21 条；前几轮见第 18–20 条。

## 现状

- **冻结 v16（当前）**：指纹 `f4ac4949ca3a`，264 个文件，`node freeze.mjs --verify` 通过，只是本地哈希，未提交。相对 v15：新增 T24–T29；`run.mjs` 在 `--net off` 下给 Codex 追加 9 个 `--disable`。v15 及以前的分数不动。
- **冻结 v15（上一版）**：指纹 `cdca79f047d2`，216 个文件，`node freeze.mjs --verify` 通过。只算了本地哈希，没有提交。
  - v15 只改了 `evaluate.mjs` 第 6 节的污染判定，共三处：
    1. Codex 的 `mcp_tool_call` 计为联网动作。
    2. 同级目录按 `qingye-s1-<名>` 推导。
    3. 只出现在沙箱拒绝行里的同级路径记入 `blockedSiblingAttempts`，不算污染。
  - 本轮运行时用的是 v14，结束后用 v15 串行重评本轮全部 41 次运行；旧轮次 84 次只做了第 6 节对比，判定无变化，结果 JSON 未重写。v14 的评分备份在 `results/v14-n0/`。
- **本轮共 41 次运行，其中有效 38 次**，全部 `scoredWithFreeze` = 15。
  - 运行目录：`/private/tmp/qingye-s1-n0-dn/`、`/private/tmp/qingye-s1-n0-d0/`
  - 日志：`/private/tmp/qingye-s1-n0-logs/`
- **结果**：
  - T19–T22：三配置在 DN 下全部通过，所以没跑 D0。
  - T23（D0 对 DN）：Codex 3/3 对 0/3，Sonnet 降档 3/3 对 0/3，Opus 3/3 对 2/3。
  - T7：Codex D0 3/3 对 DN 1/3；Opus DN 1/1，Sonnet DN 1/1。
  - 所有失败都属于“指南写明，但 DN 下读不到”：T23 是 behavior 类，T7 是 a11y 类。没有发现题目缺陷、评分器缺陷或库缺陷。
- **剔除 3 次**，均已用同一编号补跑：
  - T22 Opus：退出码 143。
  - T23 Opus：外部 SIGTERM，判 INVALID。
  - T23 Codex 第 1 次：经托管连接器联网，判污染。

## 待办（需裁决或另行实施）

1. **Codex 断网漏洞。** `--net off` 下，`codex_apps` 的 `search_service.web_run` 仍能在服务端执行搜索；`web_search="disabled"` 管不到它。需要找到关闭该连接器的配置键，加进 `run.mjs`，然后重新冻结。
2. **禁读清单只是运行开始时的快照。** 运行中新建的同级目录仍然可读：Sonnet 用通配符时会碰到，目前都被拒了。可选两种改法：每格用独立的父目录，或改成动态禁读。
3. **两次外部 SIGTERM 原因未查**（03:07:27–03:07:32 UTC）。
4. **后续出题方向。** 继续出 T7 类题：不提示、通用直觉与约定相反、DN 零明文；每格至少跑 3 次，并增加 Codex low 的样本。T23 类题只用来检验“可查性”。

## 已知坑

- 批量脚本若先 `cd` 到仓库根，清单和日志路径要写绝对路径。
- T16 对计时敏感，不要和其他运行并发。
- 污染下的失败，status 仍记为 FAIL，汇总时要看 `contaminated` 和 `contaminationHits`。（v18 起改判 UNVERIFIED；受影响的 T23 Codex 第 1 次、T7 DN Codex 第 1、2 次已用 v18 重评，汇总本来就已剔除它们，数字不变。）
- `--net off` 时 `~/.gitconfig` 被拒，代理的 git 命令会失败。D0 和 DN 相同，不影响评分。
- zsh 别名会让 cd 重置路径，路径一律写绝对路径。
- 只改 `scripts/ai-eval/s1/**` 与裁决文档；不提交、不切分支。

## 第三轮出题（2026-11-21，已完成，冻结 v16）

**饱和原因：** T19–T22 的 DN 通过来自三处：题面泄漏（“按本库约定”“从合理位置继续”“恰有一种”“服务端执行”）；库源码或相邻组件直接演示规则（TagInput 移焦、SegmentedControl 注释、Button loading）；规则是强模型都知道的通用无障碍常识。T7 拉开差异，是因为 DN 自然解（Tooltip 包住禁用按钮）是主流库的常见好做法，而且 Tooltip 是库里现成的一等组件。

**出题规则：** 1 题面不写约定提示、理由和约束措辞；2 DN 包源码与 .d.ts 注释通读后无明文，相邻组件不演示；3 DN 自然解是主流常见做法，且用的是库里的一等组件；4 冷读者只看那句原文加 TASK.md 能唯一得出参考解；5 测试测用户可感知结果，测试名带分类前缀；6 同一族（信息须持续可见）至多 2 题。8 题是预设，宁少勿凑。

**剔除：** 按钮忙碌（button.tsx 70–71、115–118 明文，且 loading 自动保名，与 T6 重叠）、Switch/Checkbox（switch.tsx 与 .d.ts 写“立即生效的设置”）、StatusDot 未知（status-tone.ts 写明）、Stat 参照期（period 必填）、AlertDialog 默认落点与 Transfer（库默认行为）、Dialog 就地编辑（popover.tsx 19 行有提示且“无需阻断”是主观判断）、DescriptionList 零值与 Steps（自然解是 bug 或取决于数据形状）。

**题目规格（worker 实现，主会话逐题审查）：**

| 题 | 原文出处（D0/D05 包） | DN 自然解 | 目标断言 | 其他错解 | DN 自查 |
|---|---|---|---|---|---|
| T24 归档项目的操作菜单 | ai/v5.4.1/components/menu.md:11「禁用不等于隐藏」 | 归档时不渲染不可用项 | [state] 不可用操作仍列出且不能执行 | enabled-noop（可点但不执行）、自造菜单 | menu.tsx 全注释无此意 |
| T25 任务指派人的资料预览 | hover-card.md:14「关键后果也必须在持续可见的位置可达」、:20 | “已停用”只放在 HoverCard 里 | [a11y] 停用状态无需悬停可见 | title 属性、Tooltip | hover-card.tsx 只有边界注释 |
| T26 套餐变更摘要 | accordion.md Avoid「唯一关键后果仅存在于默认隐藏内容」 | “不可退款”只写在退款分节里 | [a11y] 不可退款无需展开可见 | keepMounted 隐藏面板内 | accordion.tsx 只有布局注释 |
| T27 状态筛选浮层 | popover.md:11「关闭只收起浮层，不代表提交」、:22 | 关闭浮层时应用勾选 | [state] 未点“应用”就关闭不调用 onApply | 每次勾选立即应用 | popover.tsx 无此意 |
| T28 导入进度 | progress.md:11/18「动画和时间不能提供完成事实；0 与 null 不同」、:14 | 按时间推进的假进度 | [state] 导入期间不报告比例 | value=0 | **不满足规则 2，只算可查性**：progress.tsx 9–10、24–33 写了 null 即不定、“不推断进度” |
| T29 服务器负载等级 | meter.md:11、:21「密集列表里的级别用 segments={3} 加 tone，不用 StatusDot」 | StatusDot 或带 tone 的 Badge | [a11y] 等级读作三级中的第几级 | 百分比 Meter | meter.tsx 12 行仅说明 segments 用法，未说替代 StatusDot |

### 出题状态（已完成）

- 主会话逐题审查了 T24–T29 的题面、测试、参考解与错解，改动见裁决第 22 条：
  - T27 第 5 条改为中性陈述；
  - T27 错解注释各自说明；
  - T29 行定位不再限定 listitem；
  - T28 缩进整理。
- DN 零明文复核：只有 T28 命中（`progress.tsx` 注释写了“这里不推断进度”、null 即不定进度），**T28 只算可查性题**，和 T23 一样不计入“未提示作用”。
- 自测：T0–T29 × D0/D05/DN，270 项全部合格（骨架全 FAIL、参考解全 PASS、74 个错解共 222 次运行，失败集合都与声明完全一致）。
- 代理一次都没跑过。

### 第三轮跑测矩阵（下一步）

- **题目**：T24、T25、T26、T27、T29，加对照 T7；T28 照跑，但单独记为可查性，不进“未提示作用”的统计。
- **条件**：D0 与 DN 都 `--net off`，每次运行用新的根目录（fresh root），两条件参数一致。
- **配置与次数**：
  - Codex low：每格至少 5 次；
  - Claude Opus、Claude Sonnet low：每格 3 次。
- **顺序**：先在 DN 下测天花板（全部题 × 三配置）；只对 DN 下有失败的格子再跑 D0。DN 全过的格子说明题目饱和，不跑 D0，回到出题。
- **并发**：T16 不在本轮，若补跑须串行；其余题可按条件分路并发。
- **可比性**：Codex 的断网参数比第 21 条多了 9 个 `--disable`，第三轮的 Codex 数字不和第 21 条直接比。
- **T29 计分**：行定位不认没有每行容器的布局（见下方残余风险），T29 的失败先人工看布局再计分。
- **命令**（一格一次，`<T>`、`<C>`、`<n>` 自填；每次换新的 `--root`）：
  - Codex low：`node run.mjs --task <T> --cond <C> --agent codex --net off --rep <n> --root <新目录>`（模型与 effort 在 `run.mjs` 的 `MODELS` 里固定为 low）
  - Claude Opus：`node run.mjs --task <T> --cond <C> --agent claude --net off --rep <n> --root <新目录>`
  - Claude Sonnet low：再加 `--model claude-sonnet-5-5 --effort low`
  - 正式跑之前可加 `--dry-run 1` 核对命令。
- **事后**：每次运行照常用 `evaluate.mjs` 第 6 节检查污染（含 `mcp_tool_call`）。

### 残余风险（UNVERIFIED）

- T29 的 `rowOf` 取“只含本服务器名称的最外层祖先”；正确解若不给每行套容器（grid 同级单元格、dt/dd），会因布局误判失败。
- 读权限拒绝清单是某一时刻的快照，包结构变化后要重查。
- 早前运行中的 SIGTERM 原因没有调查。
- Codex 的 9 个 `--disable` 只在探针里证实工具未提供给模型，没有在真实题目运行中验证；每题的 DN 自然解是出题者判断，没有用代理验证。
