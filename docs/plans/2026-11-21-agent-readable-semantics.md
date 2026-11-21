# 让 AI 读得懂 Qingye 界面 · 方案

> 状态：**三件事已完成（2026-11-21），两类裁决项待定**，见第七节。用户裁决"都做，先只报告"：三件事都做，检查第一轮只报告、不阻断 CI。
> 执行中的调整：检查不放进会阻断的 `scripts/audit.mjs`，改为独立的 `scripts/name-audit.mjs`，经 `scripts/run-browser-audit.mjs --names` 运行；
> R1（无名称控件）已由 `scripts/axe-audit.mjs` 的 WCAG 规则覆盖，新检查只做 R2、R3。
> 起因：S2-OPEN 验证（`docs/architecture-review/S2_OPEN_Plan_2026-11-21.md` 第七节）后，用户问"不接 ui-sdk，自己做类似效果是否值得"。
> 主 agent 的回答：完整的组件级 AI 接口现在不值得做（架构稿 D-07 仍冻结）；值得做的是一层薄的语义约定与检查。本文件是这层的方案。

## 一、结论

不新增任何 AI 专用的接口、属性或注册表。AI 读界面走的就是无障碍树，所以要做的是：

1. 在指南里补一条**可区分命名**规则：同一处出现的同类控件、同类区域，名称要能互相区分。
2. 在浏览器审计里加一项**可读性检查**：从无障碍树里找出无名称或同名不可区分的可操作控件和区域。
3. 用这项检查把现有组件和官网**过一遍**，发现的缺口当作无障碍缺陷修。

这三件事对读屏用户、自动化测试和 AI 同时有用，不是为 AI 单独加的一套。

## 二、先更正上一轮口头建议里的两条

上一轮回答里列过三条薄层，核对代码后有两条不成立：

| 上一轮说法 | 核对结果 | 处置 |
|---|---|---|
| 组件加载时标出 `aria-busy` | 已经有了：Select、Combobox（`ComboboxSelect`）、Autocomplete、InputGroup、Field、Button、AsyncContent、Skeleton 都按应用给的事实写 `aria-busy` 或 `role="status"`。S2-OPEN 里 A 通道看不到加载状态，是验证包的适配层没暴露，不是 Qingye 缺 | 删去 |
| 危险操作加统一标记 | 与 2026-10-10 用户裁决冲突：Button 不承载警告与后果，确认归 AlertDialog / ConfirmAction。它们打开后是 `alertdialog`，AI 与读屏都能识别 | 删去，不给 Button 加标记 |
| 同名控件可区分 | 成立。`design.md`「名称与状态」只要求名称对应对象和动作，没有要求同处同类可区分；Section 已能用标题自动命名区域，但页面不用 Section 或标题重复时仍会撞名 | 保留，见第三节 |

## 三、要做的三件事

### 1. 指南：可区分命名

加在 `design.md`「名称与状态」一节，约三四句，大意：

- 同一页面里同一类区域（region、navigation、form 等）出现不止一次时，每个都要有名称，且名称不同。
- 同一区域里的同类控件，可访问名称要能区分；跨区域同名可以，前提是所在区域有名称。
- 列表行、表格行里重复出现的操作（如每行一个"删除"），可访问名称要带上它作用的对象，例如"删除 张三"。
  可见文字可以只写"删除"，但可访问名称必须以可见文字开头或包含它（WCAG 2.5.3 Label in Name）。

依据：
- WAI-ARIA APG 地标指南：同一种地标出现多次时，每个都要有唯一名称。
- WCAG 4.1.2（名称、角色、值）与 2.4.6（标题和标签描述主题或用途）。
- Playwright 与 Testing Library 都把"角色 + 可访问名称"作为首选定位方式。名称不可区分时，它们和 AI 一样只能退到下标或结构。
- ui-sdk 自己的 agent-ready 清单第 1 条也是这个要求，说明这条规则不是为 Qingye 特设的。

改完运行 `gen:catalog`，同步到包内指南和 `ai/SKILL.md`。

### 2. 检查：浏览器审计里的可读性检查

在 `scripts/audit.mjs` 现有的 playground 扫描里加一项，读每页的无障碍树（不扫 TSX 源码，符合本仓库"检查器禁止正则扫 TSX"的规则），报告三类问题：

| 编号 | 检查 | 例子 |
|---|---|---|
| R1 | 可操作控件没有可访问名称 | 只有图标的按钮没写名称 |
| R2 | 同一区域内同角色、同名称的可操作控件出现多次 | 一个区块里两个"负责人"下拉框 |
| R3 | 同一种地标出现多次，有的没名称或名称相同 | 两个无名 `section` 都含表单控件 |

- 结果按 `PASS` / `FAIL` / `UNVERIFIED` 报告。弹层未打开时看不到的内容记 `UNVERIFIED`，不当通过。
- 第一轮只报告，不阻断 CI。修完第三步的存量问题后，再由用户决定是否改成门禁。
- 列表行里的重复操作（R2 的常见来源）先人工逐个判断，再决定检查规则是否要给"行内已有对象名"留例外，不预先写豁免。

### 3. 存量排查

用上面的检查扫一遍全部 playground 和官网页面：

- 组件自带的名称问题（如内部按钮缺名称、内置文案重复）算库的缺陷，在组件里修，新文案走 `useUILocale()`。
- demo 与官网页面的问题在页面里修。
- 同时顺带确认一件事：组件的关键状态（选中、展开、无效、禁用、当前值、忙碌）在无障碍树里都读得到。读不到的列出来，逐个判断是不是缺陷，不顺手扩大范围。

## 四、明确不做

- 不加 `data-agent-*` 一类 AI 专用属性，不做组件动作 API、注册表、MCP 或 WebMCP 接入（架构稿 D-07 冻结）。
- 不为 AI 改 Button、Dialog 等组件的职责。确认、权限、防止绕过保存，属于应用和业务层（架构稿 §2.1、§2.3）。
- 敏感字段对 AI 隐藏属于应用的决定。PasswordInput、OtpField 已用浏览器标准属性标出密码和一次性验证码。

## 五、规模与验证

- 指南：一段文字，加上重新生成产物。
- 检查：`audit.mjs` 里加一个检查函数，加上正反例 fixture，每类各至少一个能报出来的反例和一个不误报的正例。
- 存量：数量要等检查跑出来才知道，先报告给用户再修；如果问题集中在少数组件，按组件分组派 worker。
- 收尾验证：用 S2-OPEN 验证包的 C 通道再跑一次，确认没有退化。
- 接模型的效率对比仍然不在本方案内。

## 六、需要用户确认的点

1. 三件事是否都做，还是只先做指南加检查。
2. 可读性检查第一轮只报告、不阻断 CI，是否同意。

## 七、执行结果（2026-11-21）

| 步骤 | 提交 | 结果 |
|---|---|---|
| 指南：可区分命名 | `9f833dcf` | `design.md`「名称与状态」补规则，`gen:catalog` 已同步 |
| 检查：`scripts/name-audit.mjs`（R2、R3） | `deb5d245`、`12fc7812` | 单测进 CI；同名且指向同一 URL 的链接算同一对象（WCAG 2.4.4），无 URL 不享受 |
| 库缺陷：Transfer 在 Field 内条目、全选、筛选同名 | `5f398503` | Field 注入的 `aria-labelledby` 压过 `aria-label`，改为各自的 labelledby |
| demo 与官网页 | `cffa10b9`、`5fe91a25`、`d6022f98` | 行内操作带对象名，重复地标与同名区域改名，样张放进以小节标题命名的 group |

全量扫描（对开发服务器，每批 10 页，`light-desktop`）：playground 114 页 99 PASS、15 FAIL；官网 150 页 128 PASS、22 FAIL；页面 NOT_RUN 为 0（有 5 批在 Chrome 收尾时超时，事后核对无残留进程，不影响页面结果）。英文页未扫。
静止态之外的弹层、菜单、对话框仍是 UNVERIFIED。剩余发现分两类，当时待用户裁决；用户已按推荐裁决，实施见下文「附属按钮改名与样张单列」：

1. **库内附属按钮的名称不带所属字段**（同一区域放两个同类字段即撞名）：Combobox / Autocomplete 的“展开选项”“清除选择”，日期类的“选择日期”“清除日期”及范围、日期时间变体，NumberField 的“增加”“减少”，PasswordInput 的“显示密码”，TagInput 的“添加标签”与“移除 X”，官网 CodeBlock 的“复制代码”，Sidebar 开关的“工作区导航”（两个侧栏各一个），DataTable 内置分页的 `navigation "分页"`（R3）。
   推荐做法与 React Aria 相同：名称 = 动作 + 字段标签（`aria-labelledby="自身id 字段标签id"`，本库 Combobox 的 ChipRemove 已是此写法）。这会改变这些按钮的可访问名称，按精确名称写的测试或脚本须改，属契约变更。
2. **样张 demo**：同一个控件的多种外观或状态并列（Button 的保存、删除、新建设备，CopyButton，Toggle，InputModalityProvider，Composer，基础判断页的“同步”）。推荐保留并在检查器里单列为样张，不改名称，也不预先写豁免。

收尾回归：在 `5fe91a25` 上 `pnpm pack`（prepack 重生成的目录产物即 `d6022f98`；sha256 `de88f64ed29013703435638b2d40a846b685447d7f1ff07fca0228ff0186cb1c`，lockfile integrity 已变，确认装的是新包），
在验证包副本里跑 `pnpm verify`。证据存于验证包 `results-5fe91a25/`（验证包提交 `7d4f567`），`f2db7b2` 的原证据未改动。
探针 PASS；C 通道 O1–O5 全部 PASS；A 通道 O3、O5 PASS，O1、O2、O4 FAIL，与修复前一致。
验证包页面不含 Transfer，本次只说明 Select、Combobox、Input、Dialog 路径没有退化；Transfer 由其单测与 name-audit 覆盖。

### 附属按钮改名与样张单列（2026-11-21，用户裁决「按推荐实施」）

| 步骤 | 提交 | 结果 |
|---|---|---|
| 共用取名：`useAdjunctName`，NumberField、PasswordInput 接入 | `bb151a30` | 名称 = 动作 + 字段标签；字段标签取所在 Field 的 FieldLabel，或调用处给的标签 id；调用方显式给名称时以调用方为准 |
| 检查器单列样张 | `f9416f70` | demo 元数据 `specimen: true` 让该 demo 区域带 `data-specimen`；一条 R2 在其作用域里的同名控件**全部**落在样张区域内才单列，R3 不单列；样张照常计数、所在页仍为 FAIL、`--strict` 照样失败；脚本里没有页面或名称名单 |
| 其余附属按钮 | `248e687a`（`!`，契约变更） | Combobox / Autocomplete 的展开与清除，四个日期组件的日历与清除（范围组件引用范围标签），TagInput 的添加与“移除 X”，Sidebar 开关，CodeBlock 复制，DataTable 分页地标 |

三处没有现成字段标签、由实现者按同一原则定的默认做法：

1. **Sidebar 开关**：调用方没给名称、也没有子元素时，名称跟随所控制的侧栏导航的名称；侧栏导航没名称时仍是“工作区导航”。
2. **CodeBlock 复制**：名称 = 动作 + 代码区域的名称；区域名称是泛称“代码”时只读动作。
3. **DataTable 分页地标**：依次取 `pagination["aria-label"]`、字符串 caption、表格的 `aria-labelledby`、表格的 `aria-label`，都没有时为“分页”。

契约影响：上述按钮的可访问名称变了，按精确旧名称写的测试或脚本须改为按动作开头匹配，或带上字段标签；`getByLabelText(字段标签)` 现在也会命中这些按钮。

全量复扫（同口径，`light-desktop`，每批 10 页）。“改动前”一次是在 `bb151a30` 提交前后的工作区上扫的，NumberField 当时已改好，不在其发现里；它与本节开头的 99/15、128/22 不是同一次扫描，两组数字未对齐，只作前后对照。“改动后”一次晚于全部源码修改：

| 范围 | 改动前 | 改动后 |
|---|---|---|
| playground 114 页 | 100 PASS、14 FAIL，发现 29 条 | 109 PASS、5 FAIL，普通发现 0 条，样张 7 条 |
| 官网 150 页 | 136 PASS、14 FAIL，发现 22 条 | 144 PASS、6 FAIL，普通发现 0 条，样张 8 条 |

改动后剩下的 FAIL 页只含样张：Button（删除、新建设备、保存）、Toggle、Composer、CopyButton、InputModalityProvider，官网另有基础判断页的“同步”。`section` 页第一次扫描时导航被打断（NOT_RUN），单独补扫为 PASS。英文页未扫；弹层、菜单、对话框打开后的状态仍是 UNVERIFIED（这两项随后已补，见下文「遗留的处理」）。

C 通道复验：在 `248e687a` 上 `pnpm pack`（sha256 `23a98185c06520144dcf4a15dd94f9d27b03dc16e0e73942a2c4a502b8d269f9`，lockfile integrity 已变，安装的 `dist/` 含 `adjunct-name.js`），在验证包副本里跑 `pnpm verify`。证据存于验证包 `results-248e687a/`（验证包提交 `872ccc1`），此前证据未改动。
探针 PASS；C 通道 O1–O5 全部 PASS；A 通道 O3、O5 PASS，O1、O2、O4 FAIL，与改名前一致。驱动脚本不按附属按钮名称定位，这次只说明改名没有让这些路径退化。

遗留的处理（2026-11-21，`edd11080`、`578b8fc1`、`02830d4c`）：

- **字段只靠 `aria-label` 或外部 label 命名**：附属按钮在渲染后按字段自己的命名来源取标签，依次为 aria-labelledby → 关联的 `<label>`（有 id 就引用，没有就取文字；包住字段的 label 只取文字）→ aria-label 的文字。覆盖 Combobox、Autocomplete、NumberField、DatePicker、DateTimePicker、PasswordInput、TagInput 与两个范围选择器。NumberField 的 `aria-label` 要写在 `NumberFieldInput` 上，写在根上只落到外层 div。范围选择器只认开始输入框的 `<label>`：开始框上的 `aria-label` 只说明开始框，不能当整段范围的名称。
- **无标题代码块**：复制按钮以代码首行命名，读作“复制代码 pnpm add @qingye_lab/ui”，不再重复“代码：”。
- **DataTable 的 ReactNode caption**：分页取 caption 的文字，读作“分页 订单”。DataTablePattern 根元素的 `aria-label` 仍不作为名称来源：根是通用 div，ARIA 不允许给它命名。
- **日期时间文案**：中文统一为“日期时间”（清除日期时间、选择日期时间、开始日期时间、结束日期时间）。
- **英文页与弹层**：`name-audit.mjs` 加 `--lang en` 与 `--popups`，见 `docs/browser-audit.md`。英文官网首次扫描发现 `/en/components` 与 `/en/docs/components` 各 2 条 R2：分类标题自带的锚点链接与组件卡片链接都叫“Layout”“Typography”，去向不同（中文卡片读作“布局Layout”，未撞名）。处理：标题锚点按附属动作命名为“本节链接 标题”/“Link to section 标题”，标题本身经 aria-labelledby 保持原名，目录不变，外观与交互不变。

复扫（`light-desktop`，每批 8 页）：

| 范围 | 结果 |
|---|---|
| playground 中文 114 页 + 弹层 | 109 PASS、5 FAIL（只含样张 7 条），检查弹层 105 个，普通发现 0 |
| playground 英文 114 页 + 弹层 | 同上 |
| 官网中文 150 页 | 144 PASS、6 FAIL（只含样张 8 条），普通发现 0 |
| 官网英文 150 页 | 锚点改名前 142 PASS、8 FAIL，普通发现 4 条；改名后 144 PASS、6 FAIL，普通发现 0 |
| 官网弹层，中英文各 24 页 | 24 PASS，检查弹层 46 个，普通发现 0 |

官网的弹层扫描只覆盖首页、`/components` 与各示例路由，共 24 页，不是 150 页；组件详情页的弹层由 playground 那一遍覆盖。

当时仍为 UNVERIFIED（随后已处理，见下文「剩余缺口的处理」）：

- 点开后没有新弹层出现的触发器，playground 14 个、官网 5 个（每种语言）：Autocomplete 与 Command 要输入才展开；Select 的只读与 demo 3 的三个“请选择”；TreeSelect 的 4 个，它的弹层可能不是 dialog / menu / listbox 角色，未核实；官网 `/components` 上的 5 个同类触发器。Sidebar 有 1 个触发器静置时不可见。
- 从弹层里再打开的弹层、只靠悬停或键盘打开的弹层、没有 `aria-haspopup` 的触发器。

剩余缺口的处理（2026-11-21）：

`name-audit.mjs --popups` 的开启方式与识别方式重写，细节见 `docs/browser-audit.md`「弹层」一条：

- **没有 `aria-haspopup` 的触发器**：`aria-expanded="false"` 的按钮也算开启器；新出现的内容在单元里或触发器变为 `aria-expanded="true"` 时，按原位展开重读整个单元（`popupExpanded`）。
- **只靠悬停或键盘打开的弹层**：悬停卡片的触发器用悬停打开，右键菜单的区域用右键打开，输入框点击没打开时再按 ArrowDown。
- **弹层里再打开的弹层**：在每个弹层里依次打开它的开启器，查一层（`popupNested`）。
- **点开后没有新弹层出现**：原因是按弹层数量判断，上一个弹层的退场动画会让新弹层“看起来没出现”。改成动作前给可见候选打标记，动作后只取没标记的。候选加上 tree、grid 与 Base UI 的 `data-open`，TreeSelect 由此覆盖。只读和禁用的触发器本来就不该打开，单独计数（`popupSkipped`），不再记为没打开。
- **扫描中途页面关闭**：触发器打开后 `aria-expanded` 改变，按选择器重新定位会找不到它，读取属性等满 30 秒。改为打开前给触发器打上编号标记再定位，读属性限时 1 秒。
- **Sidebar 静置时不可见的触发器**：是只在窄屏出现的抽屉开关。扫描只跑桌面宽度，用 600px 宽单独核对过一次，没有问题；仍记 `popupHidden`。

复扫（`light-desktop`，每批 8 页）：

| 范围 | 之前 | 之后 |
|---|---|---|
| playground 中文 114 页 + 弹层 | 检查弹层 105 个；点开没出现 14 个 | 109 PASS、5 FAIL（只含样张 7 条）；弹层 118 个、弹层内弹层 8 个、原位展开 44 处；点开没出现 3 个；跳过只读 3、禁用 14；普通发现 0 |
| playground 英文 114 页 + 弹层 | 同上 | 同上 |
| 官网中文 150 页（静置） | 144 PASS、6 FAIL（只含样张 8 条） | 不变 |
| 官网英文 150 页（静置） | 144 PASS、6 FAIL | 不变 |
| 官网弹层，中英文各 24 页 | 检查弹层 46 个；点开没出现 5 个 | 24 PASS，弹层 46 个，点开没出现 0 个，普通发现 0 |

剩下 3 个“点开没出现”都是要输入文字才列出结果的搜索框：Cascader 弹层里的两个“搜索”与 Command 的“搜索页面与操作”。扫描不猜输入内容，报告里注明 `input: may open only on a typed query`。

本机环境限制：这台机器上由 Playwright 启动的 Chrome 在启动约 30 秒后会收到外部 SIGTERM（空闲探针在 32 秒断开，Chrome 日志为 `Handling shutdown for signal 15`），不是仓库问题。超过 30 秒的批次后面的页面会记为 NOT_RUN。这次 Chart（中英文）与官网 3 个示例页因此 NOT_RUN，逐页补扫全部 PASS，上表已计入补扫结果。CI 不受影响。

仍为 UNVERIFIED：

- 弹层里第二层以下的弹层；树和表格行的展开；提示框（按定义不含控件）。
- 只在窄屏出现的触发器（侧栏抽屉只核对过一次）。
- 要输入文字才出现结果的搜索框（上面 3 个）。
