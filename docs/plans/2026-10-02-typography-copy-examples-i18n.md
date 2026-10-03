# 排版、文案、示例与双语改造计划

**性质：** 已获用户确认执行范围的实施计划。用户已就 D01–D07 作出裁决，并授权其余事项按主 agent 建议定稿（见 §5）。
**日期：** 2026-10-02
**前序：** [设计系统改造计划](2026-10-02-design-system-renovation.md)、[官网作为第一方消费端](../decisions/website-as-consumer.md)
**依据：** 根 `design.md`、公开理念 v2、内部资料 00–05 v2.1、仓库实际源码、2026-10-02 全站审查。

---

## 0. 用户已确认的裁决

| 编号 | 裁决 | 约束 |
|---|---|---|
| D01 | 示例应用（dashboard / mail / studio）纳入改造范围 | 不得只改官网主站而放过示例 |
| D02 | 全项目文案需审查，反对 AI 腔，要求更高质量的文字 | 覆盖 88 份 meta、381 条 demo 描述、页面、散文 |
| D03 | 标题下无必要的描述性文字要删 | 教程引导、安装步骤、错误恢复属必要，保留 |
| D04 | 翻译由 AI 高质量产出，要求严谨专业 | 六种方法用英文在前、括号保留中文 |
| D05 | 「使用组件」清单无价值；示例间切换繁琐 | 需重构示例的进入与切换方式 |
| D06 | 文案标准由主 agent 制定 | 见 W0.3 |
| D07 | **文字不应导致系统错乱** | 排版必须提供承载力：长标题、长标签、中文无空格换行、双语切换均不得破坏布局 |
| D08 | **全站设计、交互与布局须系统审查** | 不得只审文案与 token；组件语义、交互路径、状态矩阵、布局、示例应用均在范围内（见 §1.8 与 W6） |
| D09 | 改造阶段可用 codex CLI（GPT-6.1 sol / xhigh）并行子代理；质量不足时改用 sonnet 5.5 | 复杂子系统按家族下发，主 agent 审核集成 |
| D10 | 组件页以 coss UI 的信息架构为参照 | 预览先于设计说明；页头不保留维护者向 badge；「使用判断」按 R3 处置 |
| D11 | **实现来源采用 B 方案**：保留 coss 作为参考，Base UI 作为行为底座，按需重写；不做大爆炸迁移 | 判据与依据见 §1.9 |
| D12 | **一次性按顺序完成全部工作包**，不试点、不分批、不增量 | 取消原 R4 试点安排；执行顺序见 §2.0 |

D07 是硬要求，优先于本文任何视觉取舍：文案与排版是两条独立工作线，不得以「先定文案再定排版」为由推迟排版。

**已按主 agent 建议定稿（用户授权）：** R1、R2、R3、R5 见 §6。定稿项可直接实施，不需再次确认。原 R4（3 个组件试点）经 D12 取消。

---

## 1. 已核实事实

本节全部为实测数据，测量命令与结果可复现。不构成对已实现能力的声明。

### 1.1 排版

| 测量项 | 数值 |
|---|---|
| 库定义语义字号 | display-lg 2.5rem / display 2rem / title 1.125rem / heading 0.8125rem / body 0.875rem / label 0.8125rem / caption 0.75rem（`packages/ui/tokens/components.css:17-30`） |
| 站点使用 Tailwind 字面级 | `text-sm` 138 次、`text-xs` 124 次、`text-base` 12 次、`text-2xl` 5 次、`text-xl` 1 次、`text-lg` 1 次 |
| 站点使用任意值字号 | `text-[0.8125rem]` 12、`text-[0.9375rem]` 10、`text-[0.875rem]` 10、`text-[0.75rem]` 7、`text-[2rem]` 2、`text-[1.75rem]` 2、`text-[1.0625rem]` 2、`text-[1rem]` 1、`text-[1.3125rem]` 1 |
| 站点字重分布 | `font-medium` 109、`font-semibold` 25、`font-normal` 21 |
| 库内字重分布 | `font-medium` 66、`font-semibold` 16、`font-normal` 4 |

**判断：** 语义级字号与 Tailwind 字面级并行使用，站点侧约 262 处走字面级、41 处走任意值。`text-[0.8125rem]` 与 `heading`、`label` 同值；`text-[0.875rem]` 与 `body` 同值；`text-[0.75rem]` 与 `caption` 同值。同一数值存在多种写法。字重层面 `font-medium` 占约 70%，各级标题、标签、按钮、导航共用同一重量。

### 1.2 文案

| 测量项 | 数值 |
|---|---|
| `meta.ts` 总量 | 227,265 字符 / 6,520 行 |
| `design{}` 块 | 54,433 字符，**min 538 / max 697 / avg 619**，88/88 全部落在 159 字符带宽内 |
| `description` | 4,897 字符，avg 56 |
| `notes[]` | 15,231 字符（85 份） |
| `api[]` | 55,345 字符（1,008 条 prop） |
| demo 文件 | 414 个，381 个带 `meta.description`，合计 11,182 字符，中位 27，**无一条超过 100** |
| demo 描述类型 | 纯设计评述 12 条；操作说明型 75 条；含 prop/代码标记 44 条 |
| 重复 demo 描述 | `variant=` ×7、`orientation=` ×3、`无效、只读与禁用。` ×3、`不传子元素时自动渲染轨道与指示条…` ×2 |
| `H2` 紧跟 `<p>` | 38 处（`introduction` 4、`installation` 3、`theming` 5、`tokens` 7、`motion` 6、`i18n` 3、`accessibility` 2、`foundations` 5、`ai` 3） |
| `PageHeader` 带 `description` | 13 个页面 |
| JSX 直接相邻的标题+描述 | 12 处 |

### 1.3 兜底模板（新组件与 AI 读取路径会命中）

`apps/docs/src/lib/design-guidance.ts`：

- `stateOwner.library`（`:30`）——全库逐字相同的单一字符串
- `responsive` 两条、`customization` 两条（`:33-34`）——全库逐字相同
- `whenToUse`（`:24`）——直接 `= [meta.description]` 回显
- 仅 `avoid` 与 `composition` 有差异；仅 4 个 slug 有专门规则（`button`、`table`/`data-table`、`toast`、`theme-provider`，`:40-43`）

88 份 meta 均手写 `design{}` 覆盖，故当前站点不受影响；但新组件与读取 `catalog.json` 的一方会拿到该模板。

### 1.4 示例应用

| 测量项 | 数值 |
|---|---|
| 文件与规模 | `dashboard.tsx` 96 行、`mail.tsx` 66 行、`studio.tsx` 62 行、`shared.tsx` 46 行、`examples.css` 199 行 |
| 硬编码非 4 倍数间距 | `.example-sidebar` padding `22px 14px`、`.mail-list-header` padding `24px 21px 18px`、`.mail-reader-toolbar` padding `18px 25px 12px`、`.studio-toolbar` gap `20px` / margin `25px`、`.mail-message-list` gap `5px` 等 |
| docs chrome | `.example-page-bar`（返回条 + 标题 + 查看源码）、`.example-page-note`（演示数据说明 + 组件清单） |
| 切换路径 | 索引页 `/examples` → 卡片 → 详情页 `/examples/:slug`；详情页顶部有返回条 |

### 1.5 国际化

| 测量项 | 数值 |
|---|---|
| 库内 locale | 82 键，`zhCN` 与 `enUS` 1:1 零漂移；`UILocale.code` 为 `"zh-CN" \| "en-US"` 联合类型（`packages/ui/src/locale.tsx:35`） |
| 消费 locale 的组件 | 36 / 88 |
| 官网 Provider | **未挂载** `UILocaleProvider`；仅 `pages/docs/i18n.tsx:38` 演示页局部挂载 |
| `<html lang>` | `apps/docs/index.html:2` 硬编码 `zh-CN`；**`packages/ui/src/components/data-table.tsx:271` 已读取该值做排序** |
| 待翻译 CJK 总量 | 约 79,964 字符（meta 44,674 + demo 22,548 + 页面 9,300 + 模式 3,090 + 示例 1,800，加散文与 `ai/**`） |
| i18n 依赖 | 未安装任何（无 i18next / formatjs / lingui；`pnpm-lock.yaml` 零匹配） |
| 路由 | 扁平路由表，无语言段；`site.ts:11-20`、`nav.ts:85` 硬拼绝对路径；`search.ts:6,18,28` 以 path 作身份键；`use-route-effects.ts:4` session 滚动键 |

### 1.6 生成链

`packages/ui/scripts/gen-catalog.mjs` 是唯一上游：写出 `packages/ui/catalog.json`、`apps/docs/public/catalog.json`（`:163-164`）、`design.md` 两处（`:165-166`）、`public/design-philosophy.md`（`:167`）、`packages/ui/ai/**` 与 `apps/docs/public/ai/**`（`bothAi`，`:170,195-206`）、`public/llms.txt`（`:198`）、`registry/*`（`:216-219`）。缺 adoption 块即硬失败（`:27`）。

**约束：** 任何新增公开资料必须经此链生成，不得手工维护副本（`AGENTS.md` 规则）。

### 1.7 反证：不应改动之处

以下经核实为真实实现，改造中不得因「减少文案」而削弱：

- `patterns/queue.tsx:16,25,28` —— transferring / processing / `too-late` 为三个独立状态
- `patterns/review.tsx:18-20` —— 确认绑定 `scopeKey(version, selected)`，范围变化即失效
- `patterns/detail.tsx:15` —— 校验 `location.state.from` 后才提供「返回原集合」
- `patterns/edit.tsx` —— 草稿保留、结果待核实、撤销期限为真实状态机
- `patterns/*.tsx` 中的教程式引导（如「先操作正常路径，再重放相关异常」）属 D03 定义的**必要引导**，保留

### 1.8 全站设计、交互与布局审查（D08）

2026-10-02 以 7 路独立透镜并行审查、每项经 3 路对抗复核（怀疑者 / 复现者 / 标准核对者，2-of-3 通过），覆盖：

| 透镜 | 范围 |
|---|---|
| A1 语义与状态 | 组件源码与 meta 的命名、异步状态、disabled/readOnly/invalid 区分、aria 与可见文案一致性 |
| A2 交互与键盘 | 焦点管理与返回、声明的键盘行为与实际实现是否一致、无键盘路径的仅点击控件、IME 合成输入 |
| A3 状态矩阵 | 等待/失败/结果未知/取消请求/取消完成/过晚取消/部分成功/过期响应/只读/无权限/空 |
| A4 布局与响应式 | 间距关系、卡片围合滥用、文本容器固定高度、水平溢出、断点间隙、密度路径 |
| A5 示例应用 | 三个示例是否像产品、导航成本、信息层级、状态可达性、非 token 间距 |
| A6 外壳与一致性 | H1 处理、定位信息重复、导航成本、复制/主题/搜索是否复用同一实现 |
| A7 无障碍与对比度 | 令牌配对的实际比值、可访问名称、焦点可见性、减少动态效果 |

**结论与缺陷清单见 §3。** 审查方法为只读，未修改任何文件；浏览器未能验证的部分标为 `UNVERIFIED`。

#### 1.8.1 组件页信息架构（D10，与 coss UI 对比）

以 coss UI 的 Button 页为参照，当前组件页的结构差异：

| 项 | coss UI | 当前实现 |
|---|---|---|
| 首屏 | 标题 → 一句话 → 大预览 | 标题 + 描述 → **「使用判断」五项定义列表** |
| 组件首次出现 | 第一屏 | 需滚过约 600 字符设计散文（第三屏） |
| 页头附件 | 无 | `通用`、`源自 coss ui`、`源码` 三个 badge 与链接 |
| 预览区 | 独立卡片，留白充分 | 无独立预览区，依赖示例区 |
| 侧栏 | 短名，主次清楚 | 88 项平铺，中英混排且有截断（`分段控件 Segmented Contro…`） |
| 导入 | 单一写法 | 两种写法并列，读者需自行取舍（`@qingye/ui` 与 `@qingye/ui/components/button`） |

**判断：** 差异不来自缺什么，而来自**做多了**。每一块单独成立，加总后把组件本身挤到第三屏。这与 D02、D03 同源：缺少「什么该说、什么该删」的判据，因而只能全说。处置见 R3。

### 1.9 实现来源谱系（D11 依据）

对 `packages/ui/coss-source.json` 与 `packages/ui/upstream/` 的实测：

| 测量项 | 数值 |
|---|---|
| coss 文件数 | 57 |
| `adaptations` 条目 | 272 条；min 1、中位 4、max 12（`button.tsx`、`select.tsx`） |
| **本地 vs upstream 行级重合度** | **平均 87.7%** |
| 行数比 | upstream 7,608 行 → 本地 8,126 行（**1.07x**） |
| 重合度最高 | `form.tsx` 100%、`popover.tsx` 96%、`separator.tsx` 95%、`tooltip.tsx` 95%、`slider.tsx` 95% |
| 重合度最低 | `checkbox.tsx` 62%、`number-field.tsx` 76%、`pagination.tsx` 78%、`button.tsx` 79% |
| upstream 样式承载行 | 1,529 行（21.6%）；其余为部件划分与透传 |
| 对 Base UI 的引用 | 60 个组件文件；`merge-props` 14 次、`use-render` 13 次，其余原语各 1–3 次 |

**判断：** 57 个 coss 文件全部仍是上游代码加补丁，无一被重写（最高改动幅度 38%）。coss 自身不含状态逻辑——`upstream/select.tsx` 只导出 `SelectButton`/`SelectTrigger`/`SelectPopup` 等包装部件，无 `useState`/`useEffect`/`createContext`；行为、无障碍与浮层定位均来自 Base UI。

三层职责：

| 层 | 提供方 | 耦合 |
|---|---|---|
| 行为、无障碍、键盘、焦点、浮层定位、IME 边界 | `@base-ui/react@1.7.0` | 60 个文件直接依赖 |
| 样式与解剖（class、cva 变体、部件划分） | coss | 87.7% 原样保留 |
| 独立实现（日期族、DataTable、FileUpload、Carousel、Chart 等 31 个） | 本项目 | 不受影响 |

**结论（D11）：** 真正待决的不是「是否继续用 coss」，而是「是否继续维护一层 87.7% 相同的上游副本」。因行为层本就在 Base UI，脱离 coss 需重写的仅为 1,529 行样式承载代码，而非 16,010 行全部。

**不采用完全自建（含替换 Base UI）：** Base UI 承担焦点管理、浮层定位与碰撞、ARIA 状态机、roving tabindex、IME 边界与类型化事件契约，这些无设计取向，属技术事实。`design.md` 已写明「是否保留无障碍原语和其他成熟底座另行依据实际能力判断，不因替换外观层而重复发明所有基础交互」。

**脱离判据：** 按文件处置，不追全量。

| 情形 | 处置 |
|---|---|
| 重合度 > 90% 且差异为纯样式（`popover`、`form`、`separator`、`tooltip`、`slider`、`skeleton`、`group`） | 保留上游，风险低 |
| 重合度 < 80%（`checkbox` 62%、`number-field` 76%、`pagination` 78%） | 重写为纯 Base UI 包装，脱离上游追踪 |
| 视觉需系统性变更（Button、Input、Card、Dialog 等核心） | 随 W1/W6 改视觉时一并脱离 |
| 31 个本地组件 | 不受影响 |

**不做大爆炸迁移：** 脱离动作随 W1/W6 的视觉改造一并完成，不为架构单独立项。

**`coss-source.json` 记录改造：** 每条 `adaptations` 明确标注「样式补丁」或「行为修正」。行为修正意味着与上游行为分歧，是真正的分叉信号，优先重写；样式补丁属预期差异。

---

## 2. 工作包

### 2.0 执行序列（D12：一次性按顺序完成，不试点、不分批）

工作包之间存在真实的先后依赖（详见 §2.1），因此按序列执行，而非并行。每个工作包完成后即进入下一个，全部完成后统一交付。

| 序 | 工作包 | 内容 | 依赖 |
|---|---|---|---|
| 1 | **W0 契约层** | `design.md` 机器可读契约块；文案标准八条；来源谱系记录改造 | 无 |
| 2 | **W1 排版尺度** | 语义级唯一；字重绑定；清 262 处字面级与 41 处任意值；承载力验证 | W0 判据 |
| 3 | **W6 组件页与交互整改** | 页面结构、侧栏、键盘与状态缺口、布局缺陷（含 §5 缺陷清单） | W0、W1 |
| 4 | **W2 文案重写** | 88 份 meta、381 条 demo 描述、13 个页面、4 篇散文 | W0 标准、W1 尺度、W6 结构 |
| 5 | **W3 示例应用改造** | 三示例产品化、导航合并、尺寸角色纳入 token | W1、W6 |
| 6 | **W4 双语** | 8 万 CJK 字符、`/en/` 路由、生成器 `-en` 变体 | W2、W3 定稿后 |
| 7 | **W5 AI 设计指导资产** | 短/中/长三层投递；修 `files` 字段；并入同构规则 | W0、W4 |

**顺序理由：** 排版尺度决定文案的字号与行长（W1→W2）；组件页结构决定文案所处的容器（W6→W2）；文案与示例定稿后翻译才不会作废（W2、W3→W4）。W0 是全部工作包的判据来源。

**并行的例外（D09）：** 单个工作包内部可按独立边界并行下发子代理（如 W2 按组件家族、W3 按示例、W4 按文案面），但工作包之间严格按序。

### 2.1 依赖关系

```
W0 契约
  └─> W1 排版尺度
        └─> W6 组件页与交互整改
              └─> W2 文案重写
                    └─> W3 示例应用改造
                          └─> W4 双语
                                └─> W5 AI 设计指导资产
```

### W0 · 契约层（地基）

**产物：** `design.md` 内新增机器可读契约块，四分类。单一来源，不改用手工副本。

| 类 | 内容 |
|---|---|
| 必须 | 语义真实、状态归属、可访问性底线、主题三轴不混用 |
| 禁止 | 见 W0.1–W0.2 |
| 按情境 | 触发条件式（何时展开、何时打断、何时表格取代卡片） |
| 判据 | 两方案并列时的取舍依据 |

#### W0.1 三条新禁令（经核实全仓库、全部已发布产物、本机设计 Skill 均不存在）

1. 不复述标题与相邻元素已表达的内容
2. 不把所有信息平铺为等权
3. 不混用设计语言

#### W0.2 可移植的同类规则（来自本机 `impeccable` Skill，筛选后并入，标注来源）

`~/.claude/skills/impeccable/reference/craft-floor.md:19` 的 `Refuse` 清单中与本法典同构项：等大卡片网格作为页面结构、标题上方 kicker/eyebrow（该项原文为明令禁止）、章节编号（除非序列本身携带信息）、装饰性渐变文字、玻璃拟态作装饰、彩色左边框、用 emoji 代替图标体系。`reference/distill.md:43-79`（信息架构简化）、`reference/clarify.md:20-80`（文案轴）。

**并入方式：** 选取与本法典不冲突者，逐条标注来源与并入理由；不整段照搬。

#### W0.3 文案标准（D06，主 agent 制定）

**总则：文字说明读者看不见的东西，然后停下。**

| # | 禁止 | 可判别据 |
|---|---|---|
| 1 | 复述相邻元素 | 删掉后读者做错事或找不到东西的概率不变 |
| 2 | 对偶铺陈 | 一句中出现两组以上四项式并列 |
| 3 | 抽象名词作主语 | 主语不是人、界面元素或真实对象 |
| 4 | 元陈述 | 该句在描述「接下来讲什么」而非讲它 |
| 5 | 格言收尾 | 段落末句抽象且脱离上文仍成立 |
| 6 | 规则式取代描述 | 只说不该怎样，未说该怎样 |
| 7 | 自述 | 文本在解释自身的设计或实现 |
| 8 | 形容词代替事实 | 出现无判据修饰（优雅、现代、强大） |

**必须保留：** 参数与数值、读者不做错事就必须知道的信息、状态名称、权限与不可逆后果、事实区分（取消请求 ≠ 取消完成）。安装步骤、教程引导、错误恢复属此类。

**例外：** `design-philosophy` 为论述文，允许成篇论证，八条仍适用。

#### W0.4 验收

- `design.md` 与生成的 `packages/ui/design.md`、`apps/docs/public/design.md` 契约块同源（扩展现有 `packages/ui/test/public-guidance.test.ts:11-39` 的哈希断言）。
- 契约块中的每条禁令附可观察判据；无判据者不入契约。

---

### W1 · 排版尺度与承载力

#### W1.1 规格（候选，待用户确认）

**目标：** 语义级唯一。站点代码不再出现 `text-sm` / `text-xs` / `text-[…]` 形式的层级决定。

| 语义级 | 字号 | 绑定字重 | 用途 |
|---|---|---|---|
| display-lg | 2.5rem | semibold | 首页标题 |
| display | 2rem | semibold | 页面 H1 |
| title | 1.125rem | semibold | 区块 H2 |
| heading | 0.8125rem | semibold | 小节 H3、卡片标题 |
| body | 0.875rem | normal | 正文 |
| label | 0.8125rem | medium | 控件标签、导航项 |
| caption | 0.75rem | normal | 辅助说明 |

**说明：** 上表字重为候选值，需实际渲染比对后确认；`label` 用 medium、`heading` 用 semibold 是为了让「控件标签」与「小标题」在视觉上分开——这是当前 `font-medium` 占 70% 所掩盖的层级。

#### W1.2 承载力（D07 落实）

排版必须保证文字长度变化不破坏结构。要求：

| 情形 | 要求 |
|---|---|
| 长标题 | 容器不塌、不挤压相邻元素、不在词中断行 |
| 长标签 / 长按钮名 | 控件外框随内容增高（`patterns.css:11-14` 已有先例），不裁切 |
| 中文无空格长串 | 正常换行，`overflow-wrap: anywhere` 仅用于确实无分隔点的标识符 |
| 中英混排 | 标点、行高、字距分别检查；`utilities.css:44` 的 `:lang(zh)` 字距重置已有，英文加入后需重测 |
| 双语切换 | 同一布局在两种语言下均成立；英文通常更长，中文更密 |
| 用户放大文字 | 不依赖固定高度裁字 |

**方式：** 以 `ch` / `rem` 为约束单位，不以像素写死文本容器高度；必要时用 `min-block-size` 而非 `block-size`。

#### W1.3 清理

- 站点 262 处 Tailwind 字面级 → 语义级
- 站点 41 处任意值字号 → 语义级（`text-[0.8125rem]`→`heading` 或 `label`，`text-[0.875rem]`→`body`，`text-[0.75rem]`→`caption`）
- 冲突处理：语义级与字面级并存处逐一判断是层级决定还是局部调整

#### W1.4 验收

- `scripts/` 新增检查：站点源码中不出现 `text-(xs|sm|base|lg|xl|2xl|3xl)` 与 `text-[…rem]`（存量清零后启用）
- 结构常量与运行数据不受影响
- 深浅两色、桌面与窄屏、中英双语下的长文本实测截图
- 报告区分 `PASS` / `FAIL` / `UNVERIFIED` / `NOT_RUN`

---

### W2 · 文案重写

#### W2.1 各面处置

| 面 | 处置 | 目标 |
|---|---|---|
| `design{}` 五件套（`component.tsx:89-90` 渲染） | 拆掉 `何时使用/避免/相关方法/状态归属/响应与调整` 字段标签，改为该组件真有差异的判断；**允许为空** | 54,433 → 预计 ≤15,000 字符 |
| 方法标签 | 改为声明式：挂一个方法必须附「它改变了哪个决定」 | 现 59/88 挂名实相符，无区分度 |
| 兜底模板 `design-guidance.ts:24,30,33-34` | 删除或改为显式标注「未提供具体判断」，不伪造内容 | 消除逐字相同的伪内容 |
| demo 描述 381 条 | 判据：看懂预览的人不需要这句就删；保留状态机、失败分支、权限 | 381 → 预计 ≤80 |
| `PageHeader.description` 13 处 | 逐处判：保留信息型，删复述型 | 预计保留 5–7 |
| `H2` + `<p>` 38 处 | 同上；重点处理 `tokens.tsx` 与 `theming.tsx` 的互相复述 | 需逐处核对 |
| 页面文案 | 按 W0.3 八条重写 `introduction`、`foundations`、`patterns`、`design-philosophy`、`ai` | 全量 |
| 模式页自述 | 删「本文为 Qingye UI 的合成阅读示例」类；保留教程式引导 | 见 §1.7 |

#### W2.2 验收

- 每条删除须说明删除理由（属八条中哪一条）
- 被删文案若承载信息，改为由结构、状态或示例承担，不得静默丢失
- 无新增无判据修饰词

---

### W3 · 示例应用与导航

#### W3.1 结构改造（D05）

| 现状 | 改造方向 |
|---|---|
| `/examples` 索引页（卡片 + 组件清单 + 脚注） | 删除索引层；`/examples` 落到默认示例 |
| 详情页 `.example-page-bar`（返回条 + 标题 + 查看源码） | 移除，改为产品级外壳内的切换 |
| 三示例各自入口 | 共用工作区切换（顶端），一次点击直达 |
| `.example-page-note` 演示数据说明 | 移入必要位置或删除 |
| 「使用组件」清单 | 删除（D05：无价值） |
| 首页三个入口 | 保留，改为进入真实可操作界面 |

**要求：** 示例呈现为可用产品，而非被展示的文档。此方向与 `design.md:9`「专业工具、内容展示与日常应用可以有不同面貌」一致。

#### W3.2 样式改造

- `.example-sidebar`、`.mail-*-toolbar`、`.studio-toolbar`、`.example-page-bar` 等硬编码像素纳入库的尺寸角色与 `--qy-space-*`
- 示例内文字层级纳入 W1.1 语义级
- 示例不得绕过公共组件另造基础控件（`AGENTS.md` 规则）

#### W3.3 验收

- 三个示例在桌面 / 窄屏、浅色 / 深色下的截图
- 键盘路径、焦点管理、长文本实测
- 现有 `scripts/verify-*` 任务夹具继续通过；失败的须如实报告

---

### W4 · 双语

#### W4.1 方法译名（D04，已定）

英文在前，括号保留中文：

| 中文 | 英文 |
|---|---|
| 名实相符 | Match Names to Facts |
| 相成相制 | Mutual Completion and Restraint |
| 布白有用 | Make Blank Space Work |
| 随境取度 | Take Measure from Context |
| 展开有据 | Open with Reason |
| 进退相承 | Continue What Follows |

来源简注中的古典出处使用各文本既有学术译法，与方法名分开（方法名为当代设计表述）。

#### W4.2 架构

| 层 | 做法 | 理由 |
|---|---|---|
| 库内 UI 文案 | 已有 82 键零漂移，复用；`UILocale.code` 联合类型放宽为 `string` | 避免库成为语言集合的权威 |
| 官网 Provider | `main.tsx` 提供者栈挂载 `UILocaleProvider`（现未挂载） | 现 `theme-menu`、`copy-code-button` 读中文默认值 |
| 路由 | `/en/...` 第二棵路由树；`site.ts`、`nav.ts`、`search.ts`、`use-route-effects.ts` 感知语言 | 硬拼绝对路径与 path 身份键需一并处理 |
| `<html lang>` | 随语言切换；**`data-table.tsx:271` 已读取该值做排序** | 不同步将导致英文站按中文排序 |
| 元数据 | 并列字段 `titleEn` / `descriptionEn`（含 demo 元数据） | 文档正文是内容而非 UI 文案，不引运行期 i18n 框架 |
| 生成产物 | `gen-catalog.mjs` 输出 `-en` 变体：`design.en.md`、`llms.en.txt`、`ai/en/v*/**` | 双语声明须覆盖外部工具按路径读取的文件 |
| 散文 | `introduction.md`、`philosophy.md` 英文版 | 现无任何英文对应物 |

**不引入 i18n 库。** 理由是文档正文属内容，注入式方案会把翻译散进 JSX。

#### W4.3 验收

- 中英两套路由的完整性（导航、搜索、面包屑、上/下页、滚动恢复）
- `<html lang>` 与排序行为一致
- 生成产物两侧同名、同结构
- 翻译质量由用户抽检；未抽检部分标 `UNVERIFIED`

---

### W5 · AI 设计指导资产

| 断点 | 处置 |
|---|---|
| `avoid` 列是仓库最丰富约束集，但无组件 `.md`、`llms.txt` 行或 registry 项复述 | 生成器让三者在各自位置复述相关禁令 |
| `catalog.json` 只存方法名，`designGuide` 仅 `{file, hash}` | 补入方法定义与文案标准 |
| `patterns/*.md` 无设计章节，仅源码转储 | 增加设计判断章节 |
| 「说明书式」「不要平铺」「不要混用」仅在 `AGENTS.md:28` 与 `docs/decisions/website-as-consumer.md:8`，**二者均不在 `package.json` 的 `files` 内** | 移至随包分发的 `design.md` 契约块 |
| `STANDARDS.md` 145 行约束不在 `files` 内 | 并入随包分发的位置，或修改 `files` |
| `design-philosophy.md` 已发布，但 `llms.txt` 不列、`SKILL.md` 不链 | 补入索引与链接 |
| `patterns/read.md:23` 的真判断埋在 TSX 字符串内 | 提取为可读正文 |

**分层投递：** 短层（`ai/SKILL.md`，≤40 行禁令 + 一条「先读契约」）、中层（完整契约与可观察判据）、长层（`design.md` 与 `design-philosophy.md` 论证）。

### W6 · 组件页与交互整改（D08、D10）

依赖 W0 判据与 W1 尺度，与 W2、W3 并行。

| 子项 | 内容 | 依据 |
|---|---|---|
| W6.1 | 组件页信息架构改为 coss 顺序：预览先于设计说明；删除页头维护者向 badge（`通用`、`源自 coss ui`、`源码`）；「使用判断」按 R3 处置 | D10、§1.8.1 |
| W6.2 | 导入写法收敛为单一推荐写法，另一种移入安装文档 | §1.8.1 |
| W6.3 | 侧栏：88 项平铺改为有主次的组织；中文截断消除（`分段控件 Segmented Contro…`） | A6 |
| W6.4 | 按 §3 缺陷清单逐项处置 A1–A7 的确认缺陷 | §3 |
| W6.5 | 交互与状态：补齐缺失的键盘路径、焦点返回与状态表达 | A2、A3 |
| W6.6 | 布局：消除固定文本容器高度、无止境的卡片围合、断点间隙 | A4 |

**下发方式（D09）：** 按组件家族划分独立边界，复杂子系统（DataTable 列状态、日期族、覆盖层族）可用 codex CLI + GPT-6.1 sol/xhigh 并行执行；主 agent 审核集成。质量不达标时改用 sonnet 5.5。

**禁止：** 不得为通过检查把散落值机械改名成新 token；不得为减少文案而削弱 §1.7 列出的真实状态机与引导。

---

---

## 3. 与既有约束的关系

- 本计划包含破坏性变更（视觉基线、文案存量、示例结构）。`AGENTS.md` 已授权大幅调整与重构；破坏外观约定须在提交说明中显式写出。
- 视觉基线变化单独列出，不藏在 refactor 名义下；截图差异用于**发现变化**，不自动判定好坏；不得为让测试通过而更新全部截图。
- 不得为通过检查把散落值机械改名成新 token；新增 token 须说明角色、作用范围、修改入口。
- 组件固定几何尺寸须有自己的尺寸角色，不依赖全局 spacing 放大。
- 检查器须用 AST，不得只用正则扫整份 TSX。诊断区分 `PASS` / `FAIL` / `UNVERIFIED` / `NOT_RUN`。
- 移动端比桌面端高 4px、`sm:` 回到桌面尺寸是既有约定，不得统一掉。
- 44px 是本库触屏目标，**不得声称是 WCAG 2.2 AA 统一最小值**（2.5.8 基础为 24×24px）。

---

## 4. 完成标准

- W0：契约块同源校验通过，每条禁令有可观察判据
- W1：站点无字面级字号与任意值字号；长文本、双语、放大文字下结构不塌（D07）
- W2：`design{}` 与 demo 描述按标准收敛；每条删除有理由；无信息静默丢失
- W3：三示例为可用产品形态，导航一次可达，尺寸角色纳入 token
- W4：中英路由完整，`<html lang>` 与排序一致，生成产物双语
- W5：约束可达于 npm 包、网站与 registry；`ai/**`、`llms.txt`、`catalog.json` 同源
- W6：§5 缺陷清单中的确认项逐条处置；组件页预览先于设计说明；侧栏无中文截断；键盘与状态缺口补齐

**未验证范围须显式列出。** 本文档所述测量仅证明对应源码状态；不证明运行时表现、真机、读屏器或真实中文输入法验收。

---

## 5. 审查结论

2026-10-02 全站审查，7 路独立透镜并行发现，每项经 3 路对抗复核（怀疑者 / 复现者 / 标准核对者，2-of-3 通过）。

**发现 91 项：critical 4、high 22、medium 46、low 19。**

复核中另有 99 项被否证，未计入。否证理由包括：缺陷在最近提交中已修、属已文档化的取舍、或该行为由 Base UI 提供而非本库。

| 透镜 | 发现数 |
|---|---|
| A1 语义与状态 | 14 |
| A2 交互与键盘 | 11 |
| A3 状态矩阵 | 12 |
| A4 布局与响应式 | 13 |
| A5 示例应用 | 15 |
| A6 外壳与一致性 | 12 |
| A7 无障碍与对比度 | 14 |

### 5.1 严重缺陷（critical / high）

| # | 严重度 | 透镜 | 缺陷 | 位置 |
|---|---|---|---|---|
| C1 | critical | A5 | 三个示例被注册成文档页的两个路由分支，切换一次要走三步且不可寻址 | `apps/docs/src/pages/examples.tsx:10`, `apps/docs/src/pages/examples.tsx:15`, `apps/docs/src/pages/examples.tsx:24`, `apps/docs/src/app.tsx:34`, `apps/docs/src/app.tsx:35`, `apps/docs/src/examples/metadata.tsx:4` |
| C2 | critical | A5 | 示例外壳复用 Sidebar collapsible="none"，键盘用户在 899px 断点被留在已隐藏的导航里 | `apps/docs/src/examples/shared.tsx:24`, `apps/docs/src/examples/examples.css:140`, `apps/docs/src/examples/examples.css:141`, `apps/docs/src/examples/shared.tsx:34`, `apps/docs/src/examples/examples.css:138` |
| C3 | critical | A1 | DataTable silently discards the per-row selection predicate, making every row selectable | `packages/ui/src/components/data-table.tsx:116`, `packages/ui/src/components/data-table.tsx:235`, `packages/ui/src/components/data-table.tsx:300`, `apps/docs/src/content/data-table/demos/02-selection.tsx:82` |
| C4 | critical | A4 | Mail example sets a viewport-derived height that outruns the 720px demo frame and is clipped | `apps/docs/src/examples/examples.css:51`, `apps/docs/src/examples/examples.css:52`, `apps/docs/src/examples/examples.css:114`, `apps/docs/src/examples/examples.css:144`, `apps/docs/src/examples/shared.tsx:23` |
| C5 | high | A5 | 详情页与页脚是文档 chrome，且「查看源码」用裸 <a> 触发整页重载 | `apps/docs/src/pages/examples.tsx:24`, `apps/docs/src/examples/metadata.tsx:17` |
| C6 | high | A5 | mail 示例用视口公式撑高，而正文容器高度以 CSS 变量写死，放大文字时预算必然算错 | `apps/docs/src/examples/examples.css:51`, `apps/docs/src/examples/examples.css:3`, `apps/docs/src/examples/examples.css:89`, `apps/docs/src/examples/examples.css:90`, `apps/docs/src/examples/examples.css:144`, `apps/docs/src/examples/examples.css:52` |
| C7 | high | A5 | 邮件阅读器对每封旧邮件显示同一个日期「2026 年 9 月 30 日」 | `apps/docs/src/examples/mail.tsx:62`, `apps/docs/src/examples/mail.tsx:26`, `apps/docs/src/examples/mail.tsx:28` |
| C8 | high | A5 | 邮件列表与阅读器共用 selected，搜索结果被替换后阅读器仍显示已不在列表中的那封信 | `apps/docs/src/examples/mail.tsx:43`, `apps/docs/src/examples/mail.tsx:58`, `apps/docs/src/examples/mail.tsx:42` |
| C9 | high | A1 | DateTimePicker ignores readOnly on its own time input and on the "now" button | `packages/ui/src/components/date-time-picker.tsx:127`, `packages/ui/src/components/date-time-picker.tsx:183-196`, `packages/ui/src/components/date-time-picker.tsx:199-208` |
| C10 | high | A1 | CopyButton keeps the stale "Copy" accessible name after a failure changes the visible label | `packages/ui/src/components/copy-button.tsx:111`, `packages/ui/src/components/copy-button.tsx:149`, `packages/ui/src/components/copy-button.tsx:93` |
| C11 | high | A1 | SearchInput's loading state is announced as the field's own status, with no busy semantics on the input | `packages/ui/src/components/search-input.tsx:110`, `packages/ui/src/components/spinner.tsx:16-20`, `apps/docs/src/content/search-input/demos/04-states.tsx:8` |
| C12 | high | A1 | Steps marks a failed step as aria-current="step", announcing the error as progress | `packages/ui/src/components/steps.tsx:116`, `packages/ui/src/components/steps.tsx:150`, `packages/ui/src/components/steps.tsx:131` |
| C13 | high | A3 | FileUpload names a per-file error slot that cannot express retry or in-flight state, and deleting the file is the only exit | `packages/ui/src/components/file-upload.tsx:56`, `packages/ui/src/components/file-upload.tsx:58`, `packages/ui/src/components/file-upload.tsx:359-435` |
| C14 | high | A3 | Progress rendered from a known transfer percentage cannot be distinguished from a processing step that has no measurable progress | `packages/ui/src/components/file-upload.tsx:391-407`, `packages/ui/src/components/progress.tsx:60-75`, `apps/docs/src/patterns/queue.tsx:31` |
| C15 | high | A3 | DataTable collapses refresh failure, refresh success, and "no rows" into one empty cell, so a failed request reads as a true empty result | `packages/ui/src/components/data-table.tsx:131-134`, `packages/ui/src/components/data-table.tsx:460-500`, `packages/ui/src/components/data-table.tsx:515` |
| C16 | high | A6 | Three separate implementations of the page H1, none using the library's semantic display scale | `apps/docs/src/components/prose.tsx:33`, `apps/docs/src/pages/not-found.tsx:13`, `apps/docs/src/pages/home.css:4`, `apps/docs/src/pages/playground.tsx:35` |
| C17 | high | A4 | Table cells are whitespace-nowrap at a fixed row height, so long labels can neither wrap nor grow the row | `packages/ui/src/components/table.tsx:129`, `packages/ui/src/components/table.tsx:148`, `apps/docs/src/pages/docs/component.tsx:169`, `apps/docs/src/examples/examples.css:37` |
| C18 | high | A4 | Compact density shrinks type and icons instead of tightening relationships | `packages/ui/src/components/timeline.tsx:52`, `packages/ui/src/components/timeline.tsx:217`, `packages/ui/src/components/timeline.tsx:143`, `packages/ui/tokens/components.css:154-160`, `packages/ui/src/components/table.tsx:47` |
| C19 | high | A4 | Compact density silently overrides the mobile layout inside one stylesheet | `packages/ui/tokens/components.css:145-151`, `packages/ui/tokens/components.css:154-160`, `apps/docs/src/pages/docs/theming.tsx:151` |
| C20 | high | A4 | Six example classes referenced by the three example apps have no rule in examples.css | `apps/docs/src/examples/dashboard.tsx:74`, `apps/docs/src/examples/dashboard.tsx:83`, `apps/docs/src/examples/dashboard.tsx:85`, `apps/docs/src/examples/dashboard.tsx:89`, `apps/docs/src/examples/mail.tsx:62`, `apps/docs/src/examples/examples.css` |
| C21 | high | A4 | Home gallery forces every preview into a 280px box at .84 scale inside cards that range from 326px to 1400px | `apps/docs/src/pages/home.css:8`, `apps/docs/src/pages/home.css:19`, `apps/docs/src/pages/home.css:20`, `apps/docs/src/pages/home.css:21`, `apps/docs/src/pages/home.css:25`, `apps/docs/src/pages/home.css:28`, `apps/docs/src/pages/home.css:36` |
| C22 | high | A2 | Accordion meta claims ↑/↓ and Home/End header navigation that no layer implements | `apps/docs/src/content/accordion/meta.ts:78-79`, `packages/ui/src/components/accordion.tsx:13`, `packages/ui/src/components/accordion.tsx:44-51` |
| C23 | high | A2 | Steps documents ←/→, Home/End, Enter/Space unconditionally but they exist only when onStepClick is passed | `packages/ui/src/components/steps.tsx:76-78`, `packages/ui/src/components/steps.tsx:193-208`, `apps/docs/src/content/steps/meta.ts:62-67` |
| C24 | high | A7 | Light `--qy-foreground-subtle` is 72% alpha and lands at 3.11:1 on white — below 4.5:1 for normal text | `packages/ui/tokens/semantic.css:40`, `packages/ui/theme.css:141`, `apps/docs/src/components/prose.tsx:90`, `apps/docs/src/components/docs-nav.tsx:47`, `apps/docs/src/pages/docs/component.tsx:197`, `apps/docs/src/pages/docs/tokens.tsx:197` |
| C25 | high | A7 | Dark `--qy-foreground-subtle` is 3.41:1 on `--qy-surface` — same 72%-alpha mechanism, fails in both themes | `packages/ui/tokens/semantic.css:112`, `packages/ui/tokens/semantic.css:99` |
| C26 | high | A7 | Light `--qy-ring` (neutral-400) is 2.59:1 on white and the global default outline halves it to 1.54:1 | `packages/ui/tokens/semantic.css:48`, `packages/ui/styles.css:25`, `packages/ui/src/components/segmented-control.tsx:24` |

### 5.2 中等与轻微（medium / low）

共 65 项，含位置与证据，见下方分组。

| # | 严重度 | 透镜 | 缺陷 |
|---|---|---|---|
| C27 | medium | A5 | 工具栏「按月/按周/按季度」改变的是取样区间，却与「运行中项目」「完成率」并列，金额还在被月份乘数缩放 |
| C28 | medium | A5 | mail 示例缺空/失败/权限状态，回复接收人会落到自己身上 |
| C29 | medium | A5 | studio 搜索区分大小写，与其余两个示例的搜索语义不一致 |
| C30 | medium | A5 | 示例外壳的尺寸全部是硬编码像素，既有 --qy-space-* 完全未使用，且存在死选择器 |
| C31 | medium | A5 | 侧栏导航用 listitem 承载按钮，切换 section 后焦点留在已替换内容里的旧按钮上 |
| C32 | medium | A5 | mail 的回复草稿在取消、切换文件夹和刷新时静默清除 |
| C33 | medium | A5 | 看板区两处数值与界面自身宣称的对象和范围不符 |
| C34 | medium | A5 | studio 的计数与操作说明在错误状态下说反，且删除入口缺失 |
| C35 | medium | A1 | ProgressCircle forces value=null when the caller passes a non-finite number, mislabelling a real value as indeterminate |
| C36 | medium | A1 | FileUpload rejects a file into a visible error list without ever marking the control invalid |
| C37 | medium | A1 | NumberField blanks aria-labelledby with an empty string when a label is supplied |
| C38 | medium | A1 | Alert hardcodes role="alert", so a persistent inline callout is announced assertively on every render |
| C39 | medium | A1 | Timeline status is carried by colour alone; the marker is hidden from assistive technology with no text substitute |
| C40 | medium | A3 | FileUpload's total upload failure surfaces as a bare percentage and, once inside a form, its only recovery is removing the file |
| C41 | medium | A3 | TagInput's per-tag `validate` error cannot be attributed to a specific tag, and its message slot is overwritten by the next tag's rejection |
| C42 | medium | A3 | Spinner's translated accessible name is overwritten by every call site that passes `aria-hidden`, including Button's own loading indicator |
| C43 | medium | A3 | DateTimePicker offers cancel-late semantics that DatePicker and DateRangePicker cannot express, and the three date controls disagree on read-only |
| C44 | medium | A3 | Input and Textarea accept `readOnly` with no visual or structural distinction from an editable field beyond the native attribute |
| C45 | medium | A3 | DataTable exposes a server-side data mode with no stale-response or in-flight-cancellation contract, so an out-of-order page response silently wins |
| C46 | medium | A3 | Toast's `loading` type is a permanent-looking spinner with no unknown/TTL contract, and the library documents it as settling through `update` |
| C47 | medium | A3 | Alert hard-codes `role="alert"` for every variant, so success and info messages interrupt the screen reader |
| C48 | medium | A6 | The same semantic heading level renders at two different sizes in the docs article column |
| C49 | medium | A6 | Focus return after navigation targets `main h1`, which the home and examples surfaces do not have inside `main` |
| C50 | medium | A6 | Sidebar nav item truncates despite a fixed 240px column, hiding the distinguishing English name |
| C51 | medium | A6 | Component identity is presented in three orderings across sidebar, gallery, index and page title |
| C52 | medium | A6 | Demo section headings are H3 but never enter the TOC or search, so a page's demos have no address |
| C53 | medium | A6 | The examples surface is rendered by two different shells with two different H1 scales and no current-location cue |
| C54 | medium | A4 | Demo preview panel pads 24px/40px around content while its own chrome bar pads 4px |
| C55 | medium | A4 | Docs article column shrinks by 207px when the table of contents appears at 1280px |
| C56 | medium | A4 | Compact timeline ships in docs and thumbnails and the descriptions drop below the body ramp |
| C57 | medium | A4 | Mail reader toolbar and attachment card carry one-off paddings and a fixed 120px textarea |
| C58 | medium | A4 | Página de índice de ejemplos: grid, gaps y padding fuera de escala y sin punto intermedio |
| C59 | medium | A4 | Dos de las tres páginas de ejemplo usan rejillas con columnas mínimas fijas que no caben en sus propios puntos de corte |
| C60 | medium | A4 | Cards used as the default container for panels, stat tiles and client tiles that have no independent identity |
| C61 | medium | A2 | Steps puts aria-current on the inner button while the parent li loses it, so neither element carries the current step for AT |
| C62 | medium | A2 | ResizableHandle reports aria-valuemin/aria-valuemax that Home/End cannot actually reach |
| C63 | medium | A2 | Tree's keydown entry guard drops every event when the treeitem has no data-id, including Home/End |
| C64 | medium | A2 | Tree typeahead has no compositionend path, so IME-composed text is dropped or mis-accumulated |
| C65 | medium | A2 | Carousel documents Tab reaching slides and the focused slide scrolling into view; no source path performs it |
| C66 | medium | A2 | Toolbar documents Home/End but Base UI's Toolbar root does not enable them |
| C67 | medium | A7 | Dark control borders fail 3:1 — `--qy-border-input` is 1.25:1 and `--qy-border-strong` 1.43:1 on dark surfaces |
| C68 | medium | A7 | Light chart series 2 and 3 are 2.46:1 and 2.15:1 on white; `--qy-warning` is 2.15:1 where it is a solid mark |
| C69 | medium | A7 | `Button` loading state combines `disabled` with `data-loading:text-transparent` — the accessible name is preserved but the control is removed from the tab order |
| C70 | medium | A7 | `StatusDot` neutral and offline states multiply alpha onto the already-alpha muted token |
| C71 | medium | A7 | Calendar disabled and outside days stack `text-muted-foreground/72` on `disabled:opacity-64`, reaching 1.96:1 light / 2.15:1 dark |
| C72 | medium | A7 | `TableHead` never sets `scope`, so no header-to-cell association exists for the table primitives |
| C73 | low | A5 | 示例索引页与详情页把「实验性」当成说明文字，两处页面文案互相重复 |
| C74 | low | A1 | SearchInput falls back to a placeholder as the only field label, contradicting design.md and its own notes |
| C75 | low | A1 | DateTimePicker offers no per-day rejection: a click on an excluded day silently does nothing |
| C76 | low | A1 | DateRangePicker's clear button is named with the generic "Clear" key |
| C77 | low | A1 | StatusDot's documented label default is never applied when the caller overrides the render target |
| C78 | low | A3 | StatusDot, Badge, Steps and Timeline supply no vocabulary for the waiting, in-flight or unknown states the guide names |
| C79 | low | A6 | Copy-to-clipboard exists twice: the site's own button and the library's `CopyButton` |
| C80 | low | A6 | Three surfaces implement "search", and the header trigger omits the collapsed search affordance entirely on touch |
| C81 | low | A6 | Fixture/harness affordances and internal error text are exposed in the reading surface |
| C82 | low | A6 | The demo viewer scales to 414 demos by mounting all of them, and every demo keeps its code string in memory |
| C83 | low | A6 | Page-level empty and error states are implemented three different ways |
| C84 | low | A2 | Pagination's disabled link keeps role="link" while dropping href, so it stays announced as a link it is not |
| C85 | low | A2 | ResizableHandle keeps two redundant spellings of the horizontal ArrowLeft case |
| C86 | low | A2 | TagInput's comma-commit path reuses the paste delimiter on typed input, so a lone trailing comma drops the caret position |
| C87 | low | A7 | `--qy-foreground-muted` on dark `--qy-surface-raised` is 4.79:1 — closest dark pair to the limit, no margin for the alpha variants layered on it |
| C88 | low | A7 | `Spinner` renders `role="status"` with a locale label, but is used as an `aria-hidden` decoration inside Button |
| C89 | low | A7 | `--qy-sidebar-ring` is neutral-400 in both themes — 2.48:1 on the light sidebar, and the sidebar is where focus lands first |
| C90 | low | A7 | No source-level contrast check exists, so every ratio above is currently unenforced |
| C91 | low | A7 | Focus visibility is complete where it matters, but the two outlined controls keep `outline` as their only ring |

### 5.3 处置

本次审查确认项已按文件边界分组下发修复（见 §2 W6），每组配独立复核。


---

## 6. 已定稿事项（用户授权主 agent 定稿）

原 Q01–Q05 按以下结论定稿，可直接实施，不需再次确认。

| 编号 | 定稿结论 | 理由 |
|---|---|---|
| R1 | **采用 §W1.1 的字号与字重表**：display-lg 2.5rem/semibold、display 2rem/semibold、title 1.125rem/semibold、heading 0.8125rem/semibold、body 0.875rem/normal、label 0.8125rem/medium、caption 0.75rem/normal | 语义级唯一；`label` 用 medium 与 `heading` 用 semibold 是为了让控件标签与小标题在视觉上分开，这是当前 `font-medium` 占 70% 所掩盖的层级。实施后按 R6 复核 |
| R2 | **删除示例索引层**：`/examples` 直接落到默认示例；移除 `.example-page-bar`、`.example-page-note`、「查看源码」、组件清单；三示例共用工作区切换 | D05；示例应为可用产品而非被展示的文档 |
| R3 | **`design{}` 空则不渲染该块**；保留有实质差异的判断（如 Button 的 loading 语义），删除与 `description` 回显的部分 | D03；字段标签本身即设计自述 |
| R4 | ~~先以 3 个代表组件试点~~ **经 D12 取消**：不做试点，按 §2.0 序列一次性完成全部工作包 | 用户要求一次性完成，接受无试点带来的返工风险 |
| R5 | **组件页按 R3 + §1.8.1 改结构**：预览先于设计说明；删除页头三个 badge；导入收敛为单一写法 | D10 |
| R5.1 | **实现来源按 §1.9 处置**：按文件判据决定保留上游或重写为纯 Base UI 包装，随 W1/W6 视觉改造一并完成 | D11 |
| R5.2 | **`coss-source.json` 的 `adaptations` 改为二分**：标注「样式补丁」或「行为修正」；行为修正优先重写 | §1.9 |

### R6 · 需在实施中复核，不预先定稿

| 项 | 复核方式 |
|---|---|
| R1 的字重取值 | 实际渲染比对后再确认；`heading` 是否应降为 medium |
| 组件页「使用判断」的最终呈现 | 随 W6 实施后核对；无试点缓冲，须在 W6 完成时整体复核 |
| 双语下字重与字距 | `utilities.css:44` 的 `:lang(zh)` 重置已有；英文加入后重测 |
| §1.9 的逐文件处置结论 | 按实测重合度逐文件判定，结论写入 `coss-source.json` |

---

*本计划不构成对外能力承诺。文档版本不代表软件版本。*
