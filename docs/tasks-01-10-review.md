# 任务 1–10 交付与审查

范围是配套任务卡 1–10，基线 `fb8a389`。由三个 GPT-6.1 Sol 子代理分别负责浏览器与 CI、事实与消费台账、AST 与 token 接线，主代理下发边界并复核 diff、原始数据和失败路径。任务 11–40 不在本次交付内。

用户原有 `AGENTS.md` 修改保留，不纳入提交；原有 `audit.mjs` 修改在其基础上修正。没有修改上游原始源码。交付位于 `codex/ui-foundations-01-10` 分支及 [PR #1](https://github.com/qingye-lab/qingye-ui/pull/1)。

## 状态

| 任务 | 实现与选择 | 验收证据 |
|---|---|---|
| 1 审计误报 | 扣除父边框/padding，补偿子负边距，设备像素取整；保留 2px 阈值。Slider 仅接受有结构约束的有限 `1em` 声明；无限纯旋转在零角度测稳定布局，随后恢复 | 23 个浏览器边界用例；接线前 352/352 页零报告，323797ms；2000px 真溢出退出 1；最终全量由 CI 执行 |
| 2 CI | 构建后的 Vite preview，严格端口和就绪探测；安装 Playwright Chromium；PR 全量扫描；失败阻止 pack，Release 同样在发布前拦截 | 本地成功/注入失败/中断收尾均验证；真实 GitHub 故障验证完成，Pack被跳过；最终恢复为88×4，结果见PR #1的verify检查 |
| 3 实现事实 | 自动生成当前清单，另保留首次快照；人工只标注未支持/未验证 | 88 个源码/catalog/dist 组件，57 coss / 31 local；导出由 AST 提取，来源追踪缺项不伪造 |
| 4 消费台账 | JSON 分开存静态路径、运行观测和计算结论；源码变化使旧观测失效 | 首批 Button/Input/Dialog/Select/Card/Table；814 条静态路径，最终62 PASS、0 FAIL/UNVERIFIED、4 NOT_RUN |
| 5 颜色 AST | TypeScript AST 提取 JSX class/style、cn/cva，解析嵌套 arbitrary value | 八个规定正反例、49 个辅助边界与 7 个 conventions 用例通过；145 个动态表达式无法静态确定，明确保留 |
| 6 基线 | 接线前独立 manifest、命令、输出、24 张样本截图和 SHA256 | `baseline/2026-10-01-before-token-wiring/`；截图在本地 test-results，未混入最终截图 |
| 7 三轴 | 品牌属于 `html[data-brand]`，未设置时保持默认；Provider 明暗职责不变 | 挂载与切换单元测试通过；真实 Provider light→dark→light 保留品牌/密度，Button 呈现相应品牌色 |
| 8 尺寸 | control 为桌面外高，窄屏加 4px，Input 内高减两侧边框；粗指针目标独立 | 默认档外高桌面32→35px、窄屏36→39px协调变化；coarse Input/InputGroup保持44px下限 |
| 9 间距排版 | 显式连接布局间距，固定图标/控件几何独立；语义字号类避开既有颜色名称 | spacing 4→2→8px使gap 8→4→16px；12个字号/前景case通过，两主题桌面14px、窄屏16px |
| 10 圆角/焦点/状态 | 混合圆角族；按钮与输入焦点参数独立；分离危险标记、实心填充和填充上文字 | 控件/面板半径与两类focus独立变化；实心危险文字最低5.848:1，实心边界最低3.808:1 |

## 审查中纠正的事实与回归

任务卡把 Input 内部 34/30px 当成外部高度；加上现有边框，其外部早已是 36/32px，无需人为再加 2px。既有 control tokens 的 24/28/32/36/40px 对应桌面档位。ThemeProvider 默认使用 class，显式配置时才使用 data-theme；实测使用与实际页面一致的选择器。

实现审查中修正了 tailwind-merge 对新字号和圆角角色的识别、spacing 缩小时对固定图标/清除按钮空间的侵占，以及危险实心边框在深色下不足 3:1 的问题。最终原始数据复核还发现 `text-input` 同时被用作字号和既有颜色名：编译产物把它生成成颜色，桌面输入仍为 16px。现改为 `text-field-input`，保留公开 `text-input` 颜色和 `--qy-text-input-*` 变量；新增真实 Tailwind 编译与类合并回归验证。发现问题的浏览器批次不作为通过证据，保留原始结果并重测。

## 兼容与视觉变化

- 默认控件外高、粗指针目标、图标尺寸和大多数默认间距保持；修改布局 spacing 会真实改变登记的 padding/gap，不再连带缩放固定图标。
- 拉丁控件文字采用既有角色字距 −0.006em，中文/日文/韩文保持自然字距。CardDescription 行高从 20px 调整为 21px；compact Card gap 接入密度角色。
- 危险实心按钮填充加深，白字保持，边框继续使用原危险标记色。原始白字对比度 light 3.8075:1、dark 3.5254:1 不满足本库要求。
- 自定义品牌若需修改危险实心填充，应覆盖新 `--qy-danger-fill` 和 `--qy-danger-on-fill`；仅覆盖 `--qy-danger` 继续控制状态标记和边框。
- 修复 Item、Calendar booking、OTP verify、Pagination 和 DateRangePicker 五个文档演示的内部越界，并补 favicon。未靠扩大审计阈值或隐藏整个组件消除报告。

## 验证边界

静态路径不是运行时生效承诺；台账 PASS 仅指已记录的探针、部位、状态和环境。其他状态保持 NOT_RUN/UNVERIFIED。未运行 npm 发布、tag Release、生产部署或完整消费端安装矩阵；未声明局部多品牌及所有 Portal 都通过。

本机 managed Chromium 153 约 30 秒退出的原因未查明，本地证据显式使用系统 Chrome 154。原用户 docs server 保留；任务创建的浏览器与 preview 通过各自生命周期关闭。GitHub Ubuntu 使用安装的 managed Chromium，其结果另行记录。

历史失败、被拒绝的测量及初次测试超时记录保留。无限纯旋转的完整周期绘制边界未在稳定布局扫描中验收；平移、缩放、混合动画没有冻结，仍按原检测处理。接线前的零误报率是该次352页观察结果，不是对任何未来布局的保证。

## 本地接线验收

组件库最终全库50个测试文件、299个测试通过；类型检查、库构建、文档构建通过。颜色 AST 的八个规定案例及23个审计边界用例通过。`test-results/ui-foundations-accepted/runtime.json` 记录最终运行时原始数据，源码指纹 `42d2c560332b379a371f7bc8f79f4bb20b439c45da16996a657dd9c976a3a595`；该次运行143669ms，页面/console错误和登记断言失败均为0，浏览器和preview均已关闭。

接线验收的24张截图在 `test-results/ui-foundations-accepted/shots/`，与接线前截图分开。主代理复核原始字号、尺寸、间距、半径、焦点和对比度，并查看Select深色桌面与Input浅色桌面；没有以进程退出0代替各项数据判断。台账4个NOT_RUN是fine指针下不适用的coarse探针，对应coarse环境另有四个通过观测。

真实GitHub故障验证见下；最终恢复配置的全量结果由PR当前verify检查给出，不回写历史基线为全绿。

最后受影响7组件×4变体定向扫描28/28通过、0报告，扫描25864ms；真实Spinner/InputGroup共36次纯旋转规范化有原始关键帧与测量identity记录，用户原有dev server保留。可复查摘要与文件SHA256见 `docs/baseline/2026-10-01-accepted/receipt.json`。

## 真实 CI 门禁

[故障验证运行](https://github.com/qingye-lab/qingye-ui/actions/runs/36879986837)在Ubuntu完成类型检查、299项测试、两项构建和浏览器安装，随后检测2000px注入元素，报告页面1106px/内部1312px越界，Browser audit退出1，Pack被跳过。audit测量2000ms，含preview管理3658ms，工作流589s（其中Ubuntu依赖/浏览器安装419s）；浏览器和preview均正常关闭。收据见 `docs/baseline/2026-10-01-ci-gate-failure/receipt.json`。

最终配置已移除故障注入，恢复88组件×4变体全量审计；[PR #1](https://github.com/qingye-lab/qingye-ui/pull/1)的当前verify检查保存该配置的实际结果和报告。任务没有合并主分支、创建tag/release或部署生产。

## Ubuntu 全量复核后的补充修正

[第一次正常配置全量 CI](https://github.com/qingye-lab/qingye-ui/actions/runs/36881824113)完整测量352组合，308278ms；DateRangePicker 的 states 示例在两个窄屏主题下各有四个 Field 超出父内容盒4px，页面本身没有横向溢出。该批次失败且不作为通过证据，Pack被正确阻止，浏览器已关闭；原始收据见 `docs/baseline/2026-10-01-ci-date-range-failure/receipt.json`。

原因是示例网格在窄屏使用隐式 auto 列，被长日期的最小内容宽度撑开。修正只增加 `grid-cols-1`（`minmax(0, 1fr)`），保留桌面两列；没有修改共享 Field、日期组件或检测阈值。该示例源码在起始基线中已相同，但未把缺少历史 Linux 运行证据的情况标为已证明的旧缺陷。

## 默认安装最新 Release

按补充要求，README、包 README、首页与安装页统一为不指定 tag 的 GitHub CLI 下载，再以 `&&` 连接包管理器安装。下载到稳定文件名 `qingye-ui.tgz`，主动安装/升级时选择最新 Release；保留该文件与 lockfile，使平常依赖安装仍可复现。构建版本展示、包版本和发布权限不变。

在空临时项目中使用现有私有仓库授权，实际下载并安装当前最新 `v0.2.0`，重复执行通过，tarball SHA256与Release资产digest一致。Button、ThemeProvider、ToastProvider、TooltipProvider 的独立入口可导入；直接从根入口导入在此环境因缺少 `recharts` 失败，因此快速开始使用独立入口，未宣称根入口可选依赖隔离通过。收据见 `docs/baseline/2026-10-01-latest-install/receipt.json`。npm/yarn命令和完整消费端构建矩阵没有执行；本次未创建新Release。

补充实测：最新源码指纹 `a92ca5f9fa283c5f4b14b4f93776b28b077efbfd18584c60740ab4320184dde4`。8组日期范围压力场景、原生4变体及窄屏安装页3标签通过；原隐式列在280px容器、18px字号时达到329.84375px，修正后收缩到280px，完整日期文本保留且选择器可开关。安装标签按aria-controls关联面板后确认各自完整命令；初轮误取退出动画中的旧面板已保留为未接受记录。正式台账重测62 PASS、0 FAIL/UNVERIFIED、4 NOT_RUN，browser/preview均关闭，runner104611ms。收据见 `docs/baseline/2026-10-01-date-range-ci-followup/receipt.json`；此前接线与截图证据保留原指纹。

稳定文件名的离线升级验证也通过：仅替换tarball中的测试版本元数据，重跑 `pnpm add ./qingye-ui.tgz` 后确认读取新版本，随后恢复实际发布包；没有发布测试版本。
