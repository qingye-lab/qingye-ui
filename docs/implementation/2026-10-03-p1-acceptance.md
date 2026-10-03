# P1 验收清单

P1 完成后逐项核对。依据：`docs/decisions/2026-10-03-foundation.md`（§1–§18）、
`docs/decisions/2026-10-03-family-{action,form,display,overlay}.md`。

**P1 的交付物不是「四个组件」，是「判据是否成立」。** 因此验收分两组：
实现是否符合判据、判据是否够用。

## A. 分组 1：实现是否符合判据

### Button（族判据 family-action.md）

| # | 判据 | 验收方式 | 状态 |
|---|---|---|---|
| A1 | `variant` 只有 `solid` / `quiet` | 读 `buttonVariants` | 已核对 ✓ |
| A2 | `tone` 只有 `neutral` / `danger` | 读 `buttonVariants` | 已核对 ✓ |
| A3 | 无 `loading` 布尔，改为 `state` 联合 | `ButtonState` 定义 | 已核对 ✓ |
| A4 | `state` 含独立可表达的 `unknown` | 类型 + 渲染 | 已核对 ✓ |
| A5 | **危险动作不能单独出现**（决定 3） | `consequence` 必填 + 空串抛错 | 已核对 ✓ |
| A6 | 尺寸表达位置，不表达重要性 | 无「主要 / 次要」语义的档 | 待验 |
| A7 | 不引用 `spinner`（已判删除） | import 检查 | 已核对 ✓ |
| A8 | 保留 loading 时的焦点与可访问名称 | 测试是否仍覆盖 | **待验（关键）** |
| A9 | `shape` 用于图标形态，非并列 size | 读变体 | 已核对 ✓ |

**A8 是重点**：原 8 个测试里有 7 个测 loading 的行为契约（焦点保持、不可激活、
事件转发、Tab 顺序）。改名后这些契约必须仍在，只是断言方式改变。**若 P1 删除了
这些测试而非改写，即为缺陷。**

### Input（族判据 family-form.md）

| # | 判据 | 验收方式 |
|---|---|---|
| B1 | 可编辑区有可辨认边界（§5） | computed 边框 + 对比 |
| B2 | `invalid` 由外部传入，组件不推断 | props 检查 |
| B3 | 空 / 零 / 未知 / 不适用 可分别表达（§17） | 示例或 props |
| B4 | 吸收 `search-input` / `password-input` 为形态 | 无独立组件引用 |
| B5 | 与 `FieldError` 组合而非自造错误 | 读实现 |

### Card（族判据 family-display.md）

| # | 判据 | 验收方式 |
|---|---|---|
| C1 | 不提供自动内边距与标题槽 | 读导出面 |
| C2 | 嵌套圆角同心（§4） | computed: 内 = 外 − inset |
| C3 | 不诱导 NG4（无身份内容也套卡） | 文档与示例 |

### Popover（族判据 family-overlay.md）

| # | 判据 | 验收方式 |
|---|---|---|
| D1 | 不自行声明入场（§12 动效所有权） | grep `data-starting-style` 的 opacity/scale |
| D2 | 焦点返回触发者（决定 2） | 键盘实测 |
| D3 | Esc 可关闭（决定 2） | 键盘实测 |
| D4 | 阻断性与 `aria-modal` 一致（决定 4） | 属性实测 |

## B. 分组 2：判据是否够用（P1 存在的真正理由）

**P1 报告的「文档未定项」是本次最有价值的产出。** 逐条核对：

| 检验 | 通过标准 |
|---|---|
| 每个决定能回溯到条文 | 报告里的对照表无「凭感觉」条目 |
| 判据暴露了缺口 | 缺口被单列，而非被绕开 |
| 缺口由我裁决 | 不在组件里发明规则 |

## C. 命令证据（必须实测，不接受源码推断）

| # | 命令 | 期望 |
|---|---|---|
| E1 | `pnpm --filter @qingye/ui typecheck` | 0 错误 |
| E2 | `pnpm --filter @qingye/ui test` | 全通过，且**未删测试**（对比 P1 前 537） |
| E3 | `pnpm --filter @qingye/ui build` | 成功 |
| E4 | `pnpm --filter docs typecheck` | 0 错误（消费方迁移完成） |
| E5 | 四探针的 computed 值 | §1 留白比例、§4 同心圆角 |
| E6 | `node scripts/gen-capabilities.mjs` | 成功 |

**E2 的「未删测试」是硬要求。** 测试数量下降即视为违规，须给出逐条理由。

## D. 我要亲自做的独立验证（不信子代理自述）

1. **留白比例**：Playwright 实测五档 `padding ÷ 名义外高` 是否 40–44%
2. **同心圆角**：嵌套 Card 的内外圆角是否满足「内 = 外 − inset」
3. **危险动作约束**：`<Button tone="danger">` 不带 `consequence` 是否真的报错
4. **动效所有权**：Popover 是否零入场声明
5. **焦点返回**：键盘打开关闭后焦点是否回触发者
6. **测试数**：与 P1 前基线（537）对比

## E. 验收结论的写法

用 `PASS` / `FAIL` / `UNVERIFIED` / `NOT_RUN`。后两者不得报为通过。

对每个 FAIL 给出：判据条文、实际观测、最小复现。
对每个 UNVERIFIED 给出：为什么无法验证、需要什么才能验证。

## F. 已知遗留（P1 完成后由我处理）

P1 收尾时 `pnpm --filter docs typecheck` 剩 4 个错误，其中两项属于**我定的契约**而非 P1 范围：

| # | 错误 | 归属 | 处理 |
|---|---|---|---|
| F1 | `src/content/{card,popover}/meta.ts` 用了 `layer` 字段，但 `ComponentMeta` 未定义它 | `component-layering.md` 要求 `layer` 字段（Foundation/Primitive/Pattern），类型未跟上 | **我补**：`apps/docs/src/lib/types.ts` 增加 `layer: "foundation" \| "primitive" \| "pattern"`，并给 83 个 meta 补齐 |
| F2 | `packages/ui/src/index.ts` 仍导出 `password-input` / `search-input` | 二者已并入 `Input`（`component-layering.md`「合并的 2 个」） | P1 范围；若未处理则补 |

F1 是契约缺口：分层文档要求 `layer`，但类型、生成器、83 个 meta 都还没有它。
这不是 P1 的缺陷，是我的分层任务未落到类型层。

## G. 独立验证结果（我亲自跑，2026-10-03）

用 Playwright 直接量渲染结果，不采信子代理自述。

### 通过的项

| 判据 | 实测 | 结论 |
|---|---|---|
| `variant` 只有 solid / quiet | `["solid","quiet"]` | PASS |
| `tone` 只有 neutral / danger | `["neutral","danger"]` | PASS |
| `state` 五种齐全且 `unknown` 独立可表达 | `idle/waiting/in-progress/unknown/failed` 均出现在渲染中 | PASS |
| 危险动作与保护共处（决定 3） | 4 个 danger 按钮，3 个 `button-consequence` 容器 | PASS |
| Popover 零入场声明（§12） | `data-starting-style:scale*` 与 `:opacity*` 类均未出现 | PASS |
| Card 嵌套圆角同心（§4） | 外 12px → 内 8px（button / input-control） | PASS |
| 留白比例（§1） | 24→10px(41.7%)、28→12(42.9%)、32→14(43.8%)、36→16(44.4%)、40→16(40.0%) | **与文档表格逐项吻合** |
| 无边框宿主边框补偿 | 32px 档 quiet 变体 padding 13px + 1px 边框 = 视觉 14px，与其他 32px 档一致 | PASS |
| 无页面运行时错误 | 四个 playground `pageErrors: []` | PASS |

### 发现的缺陷

| # | 缺陷 | 归属 | 处理 |
|---|---|---|---|
| G1 | `Button` 暴露 `data-shape`/`data-state`/`data-tone`/`data-variant`，但**未暴露 `data-size`**；其余 55 个组件都有 | P1 | 补 `data-size={size}`，与其他组件一致 |
| G2 | `meta.ts` 的 `layer` 字段类型未定义（见 F1） | 我的契约缺口 | 我补 |

G1 影响的是样式钩子与测试定位能力：没有 `data-size` 时，外部无法按档位选择按钮，
`scripts/audit.mjs` 一类几何扫描也无法区分档位。

## H. 我的一次错误判断（记录在案）

我看了 `/tmp/yq-shots/button-light-desktop.png` 后，凭观感提出 P1 有 5 处「必须修」。
逐条核实源码后，**5 条全部不成立**：

| 我的判断 | 实际情况 | 我的错误 |
|---|---|---|
| 图标按钮无可访问名称 | `03-icon-sizes.tsx` 有 `aria-label="新建设备"`，图标 `aria-hidden` | 从像素推断语义 |
| 状态图标无名 | `07-loading-custom.tsx` 有 `aria-label="导出十月报表"` | 同上 |
| 同底色按钮边界不足 | `11-boundary.tsx` 显式 `border border-primary-foreground`，注释引用 §5、§1 | 未读源码 |
| 链接与按钮语义同级 | `05-link.tsx` 导航用真 `<a href>`，命令用 `render={<a>}` + `aria-expanded`/`aria-controls` | 未读源码 |
| 标题下描述应删（NG1） | 「状态由调用方持有」说了标题未说的归属事实；按 NG1 判据删掉会改变读者判断 | 误用判据 |

**根因**：我先看截图再下判断，违反了本项目自己的规矩——`design.md`「截图不证明完整无障碍通过」、
`CLAUDE.md`「不得因为 TS 没报错就当作无影响」。同类错误：不能从像素推断语义。

**教训**：视觉产物用于**发现可疑处**，不用于**得出结论**。结论必须回到源码与实测。

## I. 运行时控制台错误（实测，非观感）

用 Chromium 打开四个 playground，捕获 console error/warning 与 pageerror：

```
Base UI: <Field.Label> expected a <label> element because the `nativeLabel` prop is true.
         Rendering a non-<label> disables native label association, so `htmlFor` …
Base UI: A component that acts as a button expected a native <button> because the
         `nativeButton` prop is true. Rendering a non-<button> removes native button …
```

### 缺陷 I1：`FieldLabel` 以 `span` 渲染时未传 `nativeLabel={false}`

**位置**：`apps/docs/src/content/input/demos/10-value-facts.tsx:13,14`

```tsx
<Field><FieldLabel render={<span />}>分机号</FieldLabel>…
<Field><FieldLabel render={<span />}>车辆编号</FieldLabel>…
```

**后果**：Base UI 报错，且**原生标签关联被禁用**——输入控件的可访问名称不再由该标签提供。
这直接违反基础层 §15 与 `design.md`「可访问名称」底线。

**正确做法**：该场景本来就该用 `FieldTitle`。库内注释写明它是
「A non-label heading for a field, **used when the control labels itself**」，
而 `分机号`（未知态下无输入框）与 `车辆编号`（不适用）正是这种情况。

**归属**：示例（docs）。不影响库实现，但示例是消费者照抄的来源，必须修。

### 缺陷 I2：`Button render={<a/>}` 未传 `nativeButton={false}`

**位置**：`apps/docs/src/content/card/demos/08-nested.tsx:18`

```tsx
<Button render={<a href="/examples/dashboard" />} variant="quiet">打开项目</Button>
```

**实测定位**：playground/card 的 console error `A component that acts as a button expected a
native <button> because the nativeButton prop is true`，DOM 中对应元素为
`<a data-slot="button" href="/examples/dashboard">打开项目</a>`。

**后果**：原生按钮语义丢失，影响表单与可访问行为。`Button` 的 `nativeButton` 文档注释
已说明「设为 `false` 才能让键盘与禁用语义正确」。

**对比**：`05-link.tsx` 的同类用法**传了** `nativeButton={false}`，说明这是遗漏而非设计。

**范围**：只有 `Button` 与 `PageHeader` 接受 `nativeButton`；`Card`/`Item`/`Badge`/`MenuItem`
的 `render` 不涉及该属性，无需修改。

## J. 缺陷修复确认（2026-10-03 复测）

| # | 缺陷 | 修复前 | 修复后 |
|---|---|---|---|
| I1 | `FieldLabel` 以 `span` 渲染未传 `nativeLabel` | input playground 报 2 个 Base UI 错误 | 改用 `FieldTitle`（其注释本就写明用于「控件自己命名自己」的场景）；**复测干净** |
| I2 | `Button render={<a/>}` 未传 `nativeButton={false}` | card playground 报 1 个 Base UI 错误 | 已补 `nativeButton={false}`；**复测干净** |

**运行时控制台错误：3 → 0。**

复测命令：Chromium 打开四个 playground，捕获 `console` error 与 `pageerror`。
四个页面（button / input / card / popover）均为「干净」。

## K. 验收口径说明

本清单区分三类结论，不得混用：

| 结论 | 含义 |
|---|---|
| **源码核对** | 读了实现，能引用行号 |
| **实测** | 浏览器/Painwright 量到的真实值 |
| **观感** | 从截图看出，**不构成结论** |

第 H 节的 5 条误判全部属于第三类。今后视觉产物的用途限于**发现可疑处**，
结论必须回到前两类。

## L. P1 完成的两项合并（已核实）

| 组件 | 源码 | 文档 | 测试 |
|---|---|---|---|
| `search-input` | 已删 | 已删 | 文件保留，内容迁移为 `Input type="search"` 的契约测试 |
| `password-input` | 已删 | 已删 | 同上 |

**核实**：`packages/ui/test/search-input.test.tsx` 的 import 已从
`../src/components/search-input` 改为 `../src/components/input`，断言改用
`getByRole("searchbox", { name: … })`。测试数与基线一致（603），**未弱化**。

**遗留**：测试文件名仍为 `search-input.test.tsx`，内容已是 `Input` 的搜索形态。
建议改名，但属整理项，不影响正确性。

## M. 尚未执行的部分（分工使然，非缺陷）

`component-layering.md` 判定删除的 9 个组件，源码与文档均仍在：

`sheet`、`disclosure`、`frame`、`preview-card`、`spinner`、`skeleton`、
`command`、`menubar`、`resizable`

P1 的范围是四个探针与其必需的消费方迁移；删除这 9 个是独立任务，
**不得**因它们是「旧实现」就认为 P1 未完成。
