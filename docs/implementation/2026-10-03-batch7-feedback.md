# 第七批展示与反馈执行记录

2026-10-03。范围为 Badge、Avatar、Kbd、StatusDot、Alert、PendingValue、Meter、Progress、ProgressCircle。先写语义关系决策，再从当前 design.md / STANDARDS.md 编写。没有读取归档、冻结组件或 Coss；只使用当前公共组合和 Base UI 的公开可访问原语。

## 文件与实际契约

- `packages/ui/src/components/` 下九个同名 TSX，`packages/ui/test/` 下九个同名行为测试。
- `apps/docs/src/content/<九个组件>/meta.ts` 与 `demos/01-states.tsx`，`apps/docs/src/pages/review/sections/73-batch7-feedback.tsx`（`id=batch7-feedback`）。
- `docs/decisions/2026-10-03-batch7-feedback.md` 与本报告；只在 `packages/ui/tokens/components.css` 追加本批尺寸角色，保留此前 Slider 作者的改动。

Badge 使用原生 span 短标记；强调仅是表达，不伪造成功事实。Kbd 使用原生 kbd 展示实际键位。Avatar 的加载/失败由 Base UI Image 事实决定；整个视觉样本必须有非空 label，fallback 由调用方确定。StatusDot 的可见名称和可访问名称显示同一事实，pending、in-progress、unknown 分开，默认文字复用已有 locale。

Alert 默认静态，不添加 live role；实际宣告由调用方显式传入。PendingValue 必须有对象名称，保留 children 原值（含0），明确结果未知，actions 只容纳应用提供的核实/恢复入口；无请求、计时、猜测完成、默认重试或自动清值。

Meter 是实际测量的 meter，Progress/Circle 是任务的 progressbar。min/max 及其差必须有限且递增，已知 value 必须在闭区间；非法输入抛 RangeError，避免将坏数据夹为有效读数。自审额外覆盖两个有限端点相减溢出为 Infinity 的非法分母。Progress 的 null 才是不定状态，无 aria-valuenow；0 保留实际读数。Circle 复用 Progress 的完整语义和验证，归一到 pathLength=100；不旋转、不承担独立 Spinner。圆内只容纳图形；可见名称及百分比在外部关联，避免固定圆容器挤压文字。

主 agent 实测发现 Base UI 的不定状态默认 ARIA 和 Value 回调占位仍为英文，locale 只处理数字。因此 Root 的公开 getAriaValueText 与 Value 的公开 children 格式化回调按 actualValue===null 使用现有 messages.buttonInProgress，保留数字格式，调用方显式定制优先；Circle 继承同一契约。demo 使用默认 localized Value，不以 formatted 为空猜测不定状态。

属性、事件、ref、render 和 Base UI 公共组合透传；静态展示默认不增加焦点入口。长名称及读数允许换行。Badge/Avatar 如显式 render 为入口，消费既有盒内焦点角色。示例只有控件状态与简单组合，图片为几何样本，无虚构人物或服务结果。

## 本批集中 token

| 修改入口 | 角色与范围 | 初值定位 | 实际消费 |
|---|---|---|---|
| `--qy-avatar-xs…xl` | 五档身份视觉样本外部尺寸 | 引用同名 control 尺寸是默认预设，独立覆写 | Avatar 根 |
| `--qy-progress-circle-xs…xl` | 五档圆进度 SVG 容器 | 引用同名 control 尺寸是默认预设，独立覆写 | ProgressCircle 根 |
| `--qy-progress-circle-stroke` | 圆轨与指示笔画 | 2px 预设；半径减半笔画是边界关系 | 两个 circle 的半径及笔画 |
| `--qy-status-dot-size` | 状态图形直径 | .5rem 预设 | StatusDot indicator |
| `--qy-meter-track-size` | 测量轨厚 | .5rem 预设 | MeterTrack |
| `--qy-progress-track-size` | 任务进度轨厚 | .5rem 预设 | ProgressTrack |
| `--qy-badge-padding-inline/block` | 短标记字形围合 | .5/.125em 预设 | Badge 根 |
| `--qy-kbd-padding-inline/block` | 键位字形围合 | .375/.125em 预设 | Kbd 根 |

共18个变量，静态核对均有对应消费。修改入口为本表变量的集中默认值或项目主题覆写；没有通过全局 spacing 偶然改变固定尺寸，没有新增颜色或 locale。被动图形尺寸不成为触摸目标约定，五档文字采用同名现有角色。动态 computed 及主题覆写仍由主 agent 实测，源码引用不替代运行时接受证据。

## 已观察验证

首次定向 Vitest 一次运行本批九个文件：9 files / 22 tests PASS。StatusDot 收紧可见名称契约后只复跑自身：1 file / 2 tests PASS。有限端点溢出保护后只复跑 Meter / Progress：2 files / 10 tests PASS，其中增加2个不同非法分母用例。null 本地化修复后只复跑 Progress：1 file / 6 tests PASS，其中增加1个中英可见文字/真实 ARIA/Circle 继承/数字格式/调用方定制回归。当前合计25个不同用例：

| 文件 | 不同用例 | 覆盖 |
|---|---:|---|
| badge.test.tsx | 1 | 被动标记与显式链接 render/ref/事件 |
| avatar.test.tsx | 3 | 缺图回退、实际加载/失败切换、空名称拒绝 |
| kbd.test.tsx | 1 | 原生键位和实际名称，无默认动作 |
| status-dot.test.tsx | 2 | 等待/进行/未知各事实，locale 与调用方名称 |
| alert.test.tsx | 2 | 静态无 live，显式宣告与 render/ref |
| pending-value.test.tsx | 3 | 原值0、显式核实、缺值不填0、禁用入口、空对象名 |
| meter.test.tsx | 5 | meter 名称/实际范围/0/单位，NaN/越界/零分母/溢出分母 |
| progress.test.tsx | 6 | 命名0/完成/null，Infinity/越界/零分母/溢出分母，中英不定文字及 ARIA/数字格式/调用方定制 |
| progress-circle.test.tsx | 2 | 相同范围/0/null/ref/外部名称，非法分母 |

定点 TypeScript 三次 PASS（最后一次覆盖 null 本地化代码和 demo）：临时配置 `/tmp/qingye-batch7-feedback-tsconfig.json` 仅列本批28个源码、metadata、demo、review 入口文件，继承 docs 严格规则与公共导入。不运行全库扫描。自审实际新增文件及 token diff，保留别人的 Slider token 与其他 scope 变动。

主 agent 唯一浏览器已观察 Circle 五档外框24/28/32/36/40px，xs 的真实圆 bbox22×22px，圆轨未外扩；Circle-xs token 从24覆写到48实际生效；0/100/null 的 aria-valuenow 合规。其浅深图查看未发现其他当前表达阻塞，但没有据此宣称所有组合的对比度或强制颜色通过。null 文案修复的 jsdom 回归通过，浏览器复查待主 agent。

同次实测发现既有 Layout Stack 的高特异性 `[&>*]:max-w-full` 覆盖子组件 max-w-sm，使进度及结构 demo 实际宽832而非指定384。主 agent 将在下一基础层任务处理默认约束的 owning CSS；本批不改共享 Layout，也不将该宽度误报成本批进度组件契约已验收。

另按主 agent 指示，仅为先前 InputGroup `01-addon.tsx` 的既有内部 Button class 补 `sm:min-h-0`，使短动作服从共同边界内部可用高度；没有改 InputGroup 公共容量契约或新增 API/测试。该 demo computed 由主 agent核实。

## 未运行与交接

- `NOT_RUN`：全库测试、build、生成器、Git 提交/发布；统一生成和集成由主 agent负责。
- `NOT_RUN`：本代理的浏览器；主 agent 已观察的有限圆环几何与 token/ARIA 证据见上文。长文本全面容量、实际对比度、强制颜色及本地化浏览器复查仍未宣称通过。
- 新 locale：无，复用 `statusLabel`、`buttonUnknown`、`buttonInProgress`。
- 本批完成后交回 `packages/ui/tokens/components.css` 串行所有权。
