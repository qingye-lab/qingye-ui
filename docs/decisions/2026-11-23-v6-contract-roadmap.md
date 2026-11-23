# v6 破坏性契约收口路线图

## Status

Proposed（2026-11-23）。本路线图记录 v5 期间因向后兼容约束而暂缓处理的破坏性契约收口项，供 v6 主版本统一规划、实施与编写迁移指南。v5 周期内不得破坏已发布公开 API。

## Context

`@qingye_lab/ui` v5 经过消费端组合补齐与缺口落地，已稳定覆盖 114 个组件。在保持 v5 语义版本兼容的前提下，跨批次演进留下了四类历史不一致或包体积包袱：

1. 日期/时间族 6 件套在空值表示、范围字段名与回调参数个数上存在分裂；
2. 控件与集合级布尔忙碌态存在 `loading` / `busy` / `pending` 三种命名；
3. 仅局部组件使用的重型第三方依赖仍留在直接 `dependencies` 中；
4. 已有 5 个 `UILocaleMessages` 公开键不再被库内任何组件消费，但在 v5 中为避免破坏完整自定义语言包类型而暂保留。

上述四项均为破坏性变更（Breaking Changes），在 v5 中通过文档、规范约束与 `@deprecated` 注解冻结扩散，集中于 v6 一次性收口。

## v6 收口清单

### 1. 日期/时间族 6 件套统一值契约与回调签名

#### 现状核对（v5.5.0）

| 组件 | 当前 `value` 类型 | 空值表达 | 范围字段名 | 当前 `onValueChange` 签名 |
|---|---|---|---|---|
| `DatePicker` | `Date \| undefined` | `undefined` | — | `(value: Date \| undefined, event: React.SyntheticEvent) => void` |
| `DateRangePicker` | `{ from: Date; to: Date } \| undefined` | `undefined` | `{ from, to }` | `(value: DateRangeValue \| undefined, event: React.SyntheticEvent) => void` |
| `DateTimePicker` | `string \| undefined` | `undefined` | — | `(value: string \| undefined, event: React.SyntheticEvent) => void` |
| `DateTimeRangePicker` | `{ from: string; to: string } \| undefined` | `undefined` | `{ from, to }` | `(value: DateTimeRangeValue \| undefined, event: React.SyntheticEvent) => void` |
| `TimeField` | `string \| null \| undefined` | `null` | — | `(value: string \| null) => void` |
| `TimeRangeField` | `{ start: string \| null; end: string \| null } \| undefined` | 端值 `null` | `{ start, end }` | `(value: TimeRangeValue) => void` |

#### v6 目标契约

- **范围结构统一为 `{ from, to }`**：`TimeRangeField` 的 `TimeRangeValue` 从 `{ start, end }` 收敛为 `{ from, to }`，与 `DateRangePicker`、`DateTimeRangePicker` 及 `CalendarDateRange` 保持同一套领域词汇。
- **空值统一为 `undefined`**：`TimeField` 与 `TimeRangeField` 取消 `null` 空值约定，空值与未填端统一表达为 `undefined`（完整清空时范围值本身为 `undefined`，中间草稿与部分填写语义按 `DateRangePicker` / `DateTimeRangePicker` 同一原则审定）。
- **回调签名统一**：6 个组件的 `onValueChange` 统一提供 `(value, event)` 签名（其中 `event` 类型按实际触发源精确标注），消除调用方在同族组件间切换时的签名记忆负担。

### 2. 忙碌态布尔属性统一为 `loading`

#### 现状核对（v5.5.0）

- 已使用 `loading?: boolean`：`Button`、`ConfirmAction`、`SearchInput`、`InputGroup`、`Select`、`Combobox`、`Autocomplete`。
- 仍使用 `busy?: boolean`：`DataTable`、`DataTablePattern`、`PaginationPattern`。
- 仍使用 `pending?: boolean`：`Switch`。

#### v6 目标契约

- 依据 `STANDARDS.md §1` 新增约定，v5 内新组件已统一采用 `loading`；v6 将 `DataTable` / `DataTablePattern` / `PaginationPattern` 的 `busy` 以及 `Switch` 的 `pending` 统一重命名为 `loading`（内部 `aria-busy` / `data-loading` 语义同步核对）。
- `PendingValue` 组件名**保持不变**：它表达的是「写入已发出但结果未知」的独立事实状态（见 `design.md`「名称与状态」），不同于控件布尔忙碌态。

### 3. 重型可选依赖迁入 optional `peerDependencies`

#### 现状核对（v5.5.0）

`packages/ui/package.json` 已将 `@tanstack/react-table` 与 `recharts` 声明为 `peerDependencies`（且 `peerDependenciesMeta.*.optional = true`），但以下两项局部依赖仍在 `dependencies` 中强制安装：

| 依赖 | 实际消费组件 | v6 去向 |
|---|---|---|
| `@daypicker/react` | `Calendar` 及依赖它的日期/日期时间选择器族 | 迁入 `peerDependencies` + `peerDependenciesMeta["@daypicker/react"].optional = true` |
| `@tanstack/react-virtual` | `VirtualList` 及开启虚拟化的 `DataTable` | 迁入 `peerDependencies` + `peerDependenciesMeta["@tanstack/react-virtual"].optional = true` |

#### v6 目标契约

- 与 `@tanstack/react-table`、`recharts` 保持同一分发策略：不消费日期选择器或虚拟滚动的应用无需强制安装 `@daypicker/react` 或 `@tanstack/react-virtual`。
- 配套核验 `packages/ui/scripts/check-pack.mjs`、子路径导入（`@qingye_lab/ui/components/*`）的 tree-shaking 与缺失可选 peer 时的清晰文档说明。

### 4. 移除已标记 `@deprecated` 的死 `UILocaleMessages` 键

以下 5 个公开键在 v5 中已确认在 `packages/ui/src/components/` 中零引用，并全部在 `packages/ui/src/locale.tsx` 中标注 `@deprecated`，计划于 v6 从 `UILocaleMessages`、`zhCN` 与 `enUS` 一并移除：

| 弃用键 | v5 弃用原因 | 消费方迁移方式 |
|---|---|---|
| `paginationSummary` | 5.2.0 起 `PaginationPattern` 改读 `paginationRange`（已知总数）与 `paginationPage`（未知总数） | 改用 `paginationRange` 与 `paginationPage` |
| `inputClear` | `Input` 不内置清空；各类清空按钮已由语义更具体的键承担 | 改用 `clearSearch`、`clearSelection`、`clearDate*` 等对应键 |
| `expand` | 库内展开/折叠控件已改用原语状态与更具体的语义键 | 如有应用自定义按钮，由应用侧文案持有 |
| `lightTheme` | 库内组件不消费；仅文档站示例菜单使用 | 自建主题切换菜单时由应用侧文案持有 |
| `darkTheme` | 库内组件不消费；仅文档站示例菜单使用 | 自建主题切换菜单时由应用侧文案持有 |

## 迁移原则

- v6 发布说明与 `ai/` 分发文档须附逐项 codemod 或明确替换对照表；
- 每项破坏性变更需同步更新组件单测、类型测试、`conventions.test.ts` 与 `check:api` 基线，不在小版本中提前破坏已发布契约。

## Revisit when

开启 v6 开发分支前逐项复核：若 `TimeRangeField` 跨午夜或单端空值在真实业务中有明确不可替代的中间态需求，应在实施第 1 项前通过独立决策文档明确部分填写与提交值的边界。
