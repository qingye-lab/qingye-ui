# 批次 2 · C：Field / Fieldset / Separator

2026-10-03。**本批实现与定向验收 PASS；全仓仍有生成物同步与已接受的 docs 外壳失败。**

先落盘的语义、导出理由、数值来源与 API 取舍见 [决策](../decisions/2026-10-03-field-family-rewrite.md)。本批独立重写三个文件，不复原归档实现。

## 边界与阅读记录

开工执行 `pwd -P`、`git log --oneline -3`、`git status --short`。实际目录为 `/Volumes/SUNSANG 1/Codex/qingye-ui`，HEAD 为 `275d730`，前两提交为 `b93bfe4`、`9d51f7a`。工作区有大量已有及并发修改；只写本任务列出的三个组件、三个测试、三组内容目录、coss-source.json 的目标记录，以及本批决策/报告。未提交、checkout、stash、重置或清理其他改动。

| 读取 | 目的与限制 |
|---|---|
| 当前 `AGENTS.md`、根 `design.md`、`STANDARDS.md` | 工作规则、设计方法与实现规范；不是历史版本的行号。 |
| `2026-10-03-value-adjudication.md`、`2026-10-03-archive-pending-rewrite.md`、`2026-10-03-foundation.md`、`2026-10-03-family-form.md` | 区分关系要求与预设，核实状态归属和归档边界。 |
| 三个旧文件的导出/函数名列表、TypeScript AST 提取的参数类型与 type/export 声明 | 保持当前消费 API；未输出或读取函数体、className、style、实现表达式。写代码时直接覆盖三个旧文件。 |
| `DesignReview.tsx`、`FocusFallback.tsx`、Input 内容目录、三个目标内容目录、文档元数据类型 | 核实消费者的 Field、FieldLabel、FieldDescription、FieldTitle、FieldError 和方向用法；清除演示的已归档控件依赖。 |
| 当前已重写的 Input、utils、文字档清单、token 声明、manifest、Vitest setup 与 Input 测试相关片段 | 控件注册、nativeInput 组合、样式合并与现有角色接线；未从旧样式推导新值。 |
| 安装版 Base UI Field.Root/Error/Control、Fieldset.Root/Legend、Separator、useRender、mergeProps、Form 的公开 `.d.ts`；官方公共 API / Forms / mergeProps 文档 | 判断注册、命名、错误关联、受控状态与 render/ref。未读取这些原语实现或示例 CSS。在线文档为 1.8.0，安装版为 1.7.0，以安装声明和运行探针为准。 |
| 归档的 `tests/field.test.tsx` | 用户明确允许的例外：只对照本库测试的契约意图。未读取归档中的组件源码，未读取 provenance-freeze。 |
| 仓库内 coss-source.json | 只识别、删除三个重写文件的来源记录，保留其他记录与历史汇总。 |

生成物不归本批：未运行 build、gen:catalog 或修改 catalog、ai、registry、包内 design.md、dist。组件文件名没有增删，未运行 gen:index。没有新增组件内置文案，无需改 locale 文件。

## 实现与明确变化

- Field、FieldLabel、FieldDescription、FieldItem、FieldError 使用 Base UI 对应原语；FieldControl/FieldValidity 直接转出。FieldGroup/FieldContent/FieldTitle/FieldSeparator 支持 useRender、ref、原生属性与调用方样式合并。
- 错误内容不会推出 invalid。children 优先于 errors；空项和空白跳过、重复文案合并、多条用列表；空内容不产生节点或 aria-describedby。FieldTitle 是非 label 的事实标题，保留自命名控件与未知/不适用场景。
- **API 删除**：FieldSet/FieldLegend 别名没有独立用途，改用 Fieldset/FieldsetLegend；Field 的 validate、validationMode、validationDebounceTime、actionsRef 自动校验入口删除。需要完整原语校验时使用 FieldPrimitive 的完整组合。
- 原语探针首次 FAIL：`invalid=false + validationMode=onBlur` 仍会从原生格式约束设置 aria-invalid=true。最终 Field 固定原语默认 onSubmit 时机，并在 native invalid 捕获阶段调用公开的 preventBaseUIHandler；调用方处理器仍执行，不取消浏览器默认动作或事件传播。原生 validity 仍可供应用读取。
- Fieldset 默认使用真实 legend，保留 render 替换与 Base UI aria-labelledby；本身不加围合。浏览器首次发现 flex gap=20px 时 legend→第一字段仍为 0；修复由组根给直接子 legend 接同一个 field-group-gap，复测为 20px。
- Separator 默认 role=separator；decorative 使用 role=presentation、aria-hidden=true。带文字的 FieldSeparator 由文字说明关系，两侧线为装饰。
- **视觉基线重新定义**：字段组统一消费 field-group-gap，Legend 默认真实 legend 并按用途选择文字档，分隔采用强边界角色。8px/20px、文字档和颜色是已有预设；1px 分隔线是表达选择，不写成理念的唯一推导。未新增 token、圆角、表面或动效。没有比较旧组件样式或更新截图基线，因此不声称具体旧取值的差异已被验证；本批截图记录新基线。

## 用例处置：没有放宽断言

新 `field.test.tsx` 对照归档的 11 条意图，未覆盖或改写归档文件。其余已存在测试文件未修改。

| 原用例/本批探针 | 处置理由与对应证据 |
|---|---|
| 显式错误关联、列表去重、单条错误、空列表、字段外内容 | 保留，并补充说明+错误同时关联、空白内容不产生节点、children 优先、render/ref 和样式覆盖。 |
| 空 FieldError 自动读取 Form errors | 按本次“内容只由调用方提供”的契约改成空内容不渲染；具名服务端错误由应用显式传内容与 invalid，不恢复已归档 Form。 |
| 原语按 valueMissing/typeMismatch 自动校验并聚焦 | 应用在原生 form 中读取 validity，再传 invalid/错误；浏览器测空值、格式失败与纠正恢复。FieldError match=false 的隐藏关联仍有断言，完整自动校验保留在原语出口。 |
| Switch 横向关联 | 用 FieldControl + 原生 checkbox 表达同一标签、说明、激活契约；没有导入已归档 Switch。 |
| FieldSet/FieldLegend 别名测试 | 改验 canonical Fieldset/FieldsetLegend、真实 legend、可访问分组名及整体禁用；别名按决策删除，没有假定其仍导出。 |
| 新 no-inference 测试最初使用 validationMode=onBlur | 发现原语自动推断后删除这项公开属性。测试 fixture 改用最终 Field API；“原生值无效而 aria-invalid 不变、无错误内容”的断言原样保留，另加 native invalid 事件与调用方处理器断言。 |
| 浏览器脚本采集错误 | Vite 预构建 React DOM 为 default 导出；错误文字查询需限定 probe，避免隐藏审查页的同文案；长标签替换后按稳定 input.name 查草稿。修复采集方式，没有删除或放宽成功条件。 |

## 已运行的检查

| 检查 | 结果 | 实际观察 |
|---|---|---|
| 开工 `pnpm --filter @qingye/ui typecheck` | PASS | 修改前无错误。 |
| 开工 `pnpm --filter @qingye/ui test` | PASS | 15 文件 / 203 测试；仅为该时点基线。 |
| 最终 `pnpm --filter @qingye/ui typecheck` | PASS | 最终源码无错误。并发阶段曾出现 Button 模块/process 错误，后续消失；没有修改 Button 解决它们。 |
| 最终三个任务测试 | PASS | field 19、fieldset 5、separator 4，共 28 条；包含正常、失败、空内容、替代原生控件及属性/样式透传。 |
| 最终 `pnpm --filter @qingye/ui test` | FAIL | 19 文件、284 测试：283 PASS / 1 FAIL。唯一失败为 style-contract 的 STANDARDS→ai/style.md 投影不同步；本批按约定不改生成物或断言。 |
| `pnpm --filter docs typecheck` | FAIL | 169 个错误，主要为站点引用已归档组件/页面；本批 field/fieldset/separator 内容目录错误为 0。未将整个 docs 标为通过。 |
| coss-source.json 删除范围 | PASS | 对删除前文本重演目标对象删除后，整份文本与当前文件逐字相等；JSON 可解析。删除三条主来源记录及 Field 的一条 behaviourPriority 引用，其他原文不变。 |
| 上游声明 grep | PASS | 当前恰好 4 个文件，见下方原始输出。 |
| review.html 与 FocusFallback | PASS | 审查页八个 Field 正常，FocusFallback 的设备名称仍可查询；未依赖已失效的站点外壳。 |
| 浅/深色 × 1280/390px | PASS | 四组审查页、四组临时消费探针；全部无水平溢出。截图均已目检。 |
| 应用控制的错误与恢复 | PASS | 空邮箱、格式错误就地显示；草稿保留；错误 id 与说明进入 aria-describedby；纠正后 invalid 清除、值保留；错误列表清空；checkbox 标签激活成功。 |
| 键盘 | PASS | 真实 keyboard.press(Tab) 进入设备名称：focus-visible=true、label.for 对应输入 id；等待 ≥600ms 后 borderWidth=1px、boxShadow=none，未加外环。 |
| token 实际消费 | PASS | 默认字段 gap=8px，fieldset gap 和 legend 实际间隔=20px。局部将 field-gap 改为12px、field-group-gap 改为24px后，真实 label→control=12px、legend→field=24px；随后还原。 |
| 长文本 | PASS | 390px 下中英长名称/legend 换行，无文字或页面溢出，已输入值仍保留。 |
| 普通与辅助文字对比 | PASS | 实际承载面合成后，浅色最低7.12:1、深色最低8.73:1；错误标签/错误文字浅色5.94:1、深色6.86:1。均按普通文字4.5:1检查。 |
| 分隔线 | PASS | 实际强边界与承载面浅色4.52:1、深色5.29:1；横线1px高、竖线有实际高度；semantic/decorative 两种树语义有单元断言。 |
| 本批浏览器执行期 pageerror / application console.error | PASS | 完整成功脚本记录均为0。**初次加载曾有既有 /favicon.ico 404**；不是零条全会话 console error，不改范围外入口或假称此项已修。 |

### 来源扫描原始输出

```text
$ grep -l THIRD_PARTY_NOTICES packages/ui/src -r
packages/ui/src/components/tooltip.tsx
packages/ui/src/components/toast.tsx
packages/ui/src/hooks/use-copy-to-clipboard.ts
packages/ui/src/hooks/use-media-query.ts
```

三个目标文件头已没有上游声明，剩余四个文件仍需随包保留来源声明。本批没有删除 THIRD_PARTY_NOTICES.md 或修改其他来源项。

## 浏览器所有权与证据

看到另一批的 `qy-batch2-b` 会话时未启动新浏览器；其关闭、CLI list 显示无浏览器且相关进程检查没有实例后才启动本批。全程一个 `qy-batch2-c` 会话、一张活动页面，视口/主题/状态串行。

- 会话服务 PID 25707（PPID 1），Chrome PID 25711（PPID 25707），专用临时 profile `/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/playwright_chromiumdev_profile-EUS0Vw`。
- 既有 Vite PID 59950（PPID 59927），监听127.0.0.1:5180，非本批启动，保留。
- 已通过现有 CLI 连接执行 close。复查服务/浏览器 PID 均退出，按该 profile 检查子进程残留为0；未启动新的清理服务器、未使用广泛 kill。
- 临时消费探针由 review.html 同一页面动态加载本批真实 demo/source，未向仓库增加独立入口或复制组件样式。额外标题只用于证据定位，不是产品页面改动。

证据留在 `/tmp/qy-batch2-c/`，未写入范围外的仓库目录：

- `browser.json`、`error-contrast.json`：完整几何、关联、颜色合成、状态与控制台记录。
- `review-{light,dark}-{1280,390}.png`：真实审查页字段区域；`demos-{light,dark}-{1280,390}.png`：真实消费示例组合；`error-{light,dark}-390.png`：调用方错误和长名称。
- `final-ui-test.log`、`final-docs-typecheck.log`、`coss-source.before.json`：测试/类型检查及来源删除边界。

## 尚未验证或不在本批

| 项 | 状态与边界 |
|---|---|
| catalog/ai/registry/dist 的最终重建、打包消费者与发布 | NOT_RUN；由主任务汇总后统一执行。源码元数据已改为 local，当前生成副本不可据此宣称已同步。 |
| 完整 docs 外壳恢复 | FAIL；已接受的归档后边界，本批内容目录无新增类型错误。 |
| 真实辅助技术朗读、物理移动设备、完整强制颜色/RTL/放大矩阵 | NOT_RUN；不把 Chromium 390px 视口当实体设备验收。 |
| 完整 Base UI Form 自动校验与应用管理 Field 混合 | UNVERIFIED；本批提供调用方管理的 Field 与完整 FieldPrimitive 两个清楚的状态归属，不宣称任意混合均受控。 |
| 其他品牌/图片/未知承载面上的对比 | UNVERIFIED；对比证据只适用于本次实际浅深色组合。 |

本批没有提交或发布，也没有为生成物同步而放宽任何已有测试。
