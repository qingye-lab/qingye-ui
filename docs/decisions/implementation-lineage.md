# 实现来源谱系

2026-10-02。本文件记录实现来源的架构裁决，以及由此产生的逐文件处置判据。依据为对 `packages/ui/coss-source.json` 与 `packages/ui/upstream/` 的实测。

## 裁决

**保留 coss 作为参考，Base UI 作为行为底座，按需重写；不做大爆炸迁移。**

用户于 2026-10-02 裁定采用本方案（计划文档 D11），并要求一次性按顺序完成全部改造（D12）。

## 实测依据

| 测量项 | 数值 |
|---|---|
| coss 文件数 | 57 |
| `adaptations` 条目 | 272 条；min 1、中位 4、max 12（`button.tsx`、`select.tsx`） |
| 本地 vs upstream 行级重合度 | **平均 87.7%** |
| 行数比 | upstream 7,608 行 → 本地 8,126 行（1.07x） |
| 重合度最高 | `form.tsx` 100%、`popover.tsx` 96%、`separator.tsx` 95%、`tooltip.tsx` 95%、`slider.tsx` 95% |
| 重合度最低 | `checkbox.tsx` 62%、`number-field.tsx` 76%、`pagination.tsx` 78%、`button.tsx` 79% |
| upstream 样式承载行 | 1,529 行（占 21.6%） |
| 对 Base UI 的引用 | 60 个组件文件 |

**关键事实：coss 自身不含状态逻辑。** `upstream/select.tsx` 只导出 `SelectButton`、`SelectTrigger`、`SelectPopup` 等包装部件，不含 `useState`、`useEffect` 或 `createContext`。行为、无障碍、键盘、焦点管理与浮层定位均来自 `@base-ui/react`。

## 三层职责

| 层 | 提供方 | 当前耦合 |
|---|---|---|
| 行为、无障碍、键盘、焦点、浮层定位、IME 边界 | `@base-ui/react@1.7.0` | 60 个组件文件直接依赖 |
| 样式与解剖（class、cva 变体、部件划分） | coss | 87.7% 原样保留 |
| 独立实现（日期族、DataTable、FileUpload、Carousel、Chart 等 31 个） | 本项目 | 不受影响 |

## 为什么不替换 Base UI

Base UI 承担焦点管理、浮层定位与碰撞、ARIA 状态机、roving tabindex、IME 边界与类型化事件契约。这些没有设计取向，属技术事实，不再是需要判断的取舍。自建这一层意味着重新实现 30 个以上 ARIA 模式，收益为零，风险是全站无障碍退步。

`design.md` 已就此写明立场：「是否保留无障碍原语和其他成熟底座另行依据实际能力判断，不因替换外观层而重复发明所有基础交互。」

## 逐文件处置判据

不做全量重写。按实测重合度与改造需求逐文件判定：

| 情形 | 处置 | 代表文件 |
|---|---|---|
| 重合度 > 90%，差异为纯样式 | 保留上游，风险低 | `form`、`popover`、`separator`、`tooltip`、`slider`、`skeleton`、`group` |
| 重合度 < 80% | 重写为纯 Base UI 包装，脱离上游追踪 | `checkbox` 62%、`number-field` 76%、`pagination` 78% |
| 视觉需系统性变更 | 随排版与组件页改造一并脱离 | `button`、`input`、`card`、`dialog`、`select` 等核心 |
| 独立实现 | 不受影响 | 31 个本地组件 |

**脱离动作随视觉改造一并完成，不为架构单独立项。** 触发点是 W1（排版尺度）与 W6（组件页与交互整改）改到哪个文件，就在同一个动作里脱离哪个。

## `adaptations` 记录改造

`coss-source.json` 的每条 `adaptations` 改为二分标注：

- **样式补丁**：视觉、间距、圆角、class 调整。属预期差异，保留即可。
- **行为修正**：改变上游行为、状态语义、键盘路径或可访问表达。这是真正的分叉信号——意味着本项目不同意上游的判断，应优先重写脱离。

二分之后可直接产出「优先重写清单」：`行为修正` 条目多的文件排在前面。

## 影响

- `scripts/check-upstream.mjs` 继续校验上游基线，不因本裁决失效。
- `coss-source.json` 与 `upstream/` 保留，作为比对基线；`AGENTS.md` 规定不得编辑上游基线，不得把复制来源标注为原创。
- 逐文件处置结论写入 `coss-source.json`，与其他改编记录同源。
