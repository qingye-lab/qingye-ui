# 第四批 J：RadioGroup 与 Select

2026-10-03。组件、语义决策、定向用例、四个消费演示与桌面审查情境已从零编写；定向用例、库类型与桌面运行检查 PASS，整站外壳 typecheck 仍 FAIL。

## 范围与阅读记录

开工实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`，HEAD `275d730`（后两条为 `b93bfe4`、`9d51f7a`）。工作区已有大量未提交重写与归档变更；仅处理 J 文件，保留其他工作，没有 commit、checkout、stash、clean、build。

已读 AGENTS.md、根 design.md、STANDARDS.md、foundation、value-adjudication、family-selector、family-form 与 batch2 A/B/C 报告。读取当前已重写的 Input、Checkbox、Field、utils、locale、CSS、测试设置与消费 metadata，核对真实组合入口。库的设计依据只有 design.md；基础层中的数值仍保持选择/预设定位。

没有读取 `qingye-ui-archive/` 组件源码、归档测试、`qingye-provenance-freeze/` 或 Git 中删除前的实现。两个目标组件在开工时已删除，没有读取旧函数体、className 或样式。评估了已安装 **Base UI 1.7.0** 的公共类型，以及其 Radio/RadioGroup/Select 原语的焦点、键盘、占位与序列化行为；这些是无障碍底座，不是归档 Qingye/coss 组件。在线文档当前版本不同，实现仍以安装类型与实际测试为准：[Select](https://base-ui.com/react/components/select)、[Radio Group](https://base-ui.com/react/components/radio-group)。

## 实现与值的归属

先落盘 [语义决策](../decisions/2026-10-03-selectors-rewrite.md)，随后编写：

- `packages/ui/src/components/radio-group.tsx`：RadioGroup、Radio、原语出口。Radio 默认原生按钮，圆形身份、中心选中点、外圈焦点仅变色。
- `packages/ui/src/components/select.tsx`：单值 Select 及 Trigger/Value/Popup/Item/Group/GroupLabel，保留原语出口。Select 与 Input 同档文字、外高、bordered padding 和图标尺寸，窄屏角色照常接线。
- 两份组件测试；`apps/docs/src/content/radio-group/**` 与 `select/**` 各一份 metadata、两份情境演示。
- `apps/docs/src/pages/review/sections/50-selectors.tsx`：东侧摄像头巡检设置；频率并置、区域收起，包含禁用候选、未选区域、应用给出的错误及本页方案。
- 本决策与报告。

Select 触发器、Radio 外圈与可聚焦浮层面板不画外围圈、不加粗边框。浮层通过 `select-popup` 接入现有 motion.css，没有第二套入退场，也没有 z-index / z-50 或新 token。默认无阴影；没有修改 Card。

约 5 项只是需要比较的少量候选的选用建议，不是理念硬阈值。圆形外径使用同档文字行高、中心点取内部边长一半、项间距使用 field-gap、行项使用 control-md-padding 与 space-1，均为选择；已有数值、颜色、圆角、禁用透明度和时长为基础预设，不写作唯一推导。

真实官网消费方仍导入 Radio，保留这一入口，未增加同义别名。执行 `pnpm --filter @qingye/ui gen:index`，由生成器刷新公共导出（同时扫描当时并发新增的组件）；没有手改 src/index.ts。没有 gen:catalog 或改任何其他生成物。

内建占位直接复用 `messages.selectPlaceholder`，新增内建文案为 0。因此没有修改共享 locale 文件，也不会覆盖其他代理新增键。演示内容属于调用方业务情境。

## 测试发现与处置

首次 28 个用例有 5 个失败，逐项处理，没有放宽任何仓库原有断言：

| 初次发现 | 处理与理由 |
|---|---|
| Radio Home/End 不移动 | Base UI Radio 明确 enableHomeAndEndKeys=false；该新增用例原本套用了 Select 契约。改为断言 Radio 保持当前值；Select 首尾导航断言保留并通过，不新增手写 Radio 键盘状态机。 |
| 禁用且已选 Radio 仍在 Tab 顺序 | 默认 span 的原语组合有此行为。Radio 改以公开 render/nativeButton 组合成原生 button，原生禁用退出 Tab；原有跳过断言保留并通过。 |
| Select 方向键高亮禁用项 | 原语有意允许辨认禁用候选。新增用例改为核对该项可高亮、Enter 不提交且不关闭，之后继续移动并选择可用项；点击禁用项也不改变值。没有放宽禁止选取禁用值的契约。 |
| 空字符串值被显示为未选择 | Base UI 1.7 以序列化结果为空判断 placeholder。修正显式空字符串的 Value 名称、Trigger/Value 的占位状态/标记及样式回调；实际选中状态与表单仍由原语拥有。数组、record、分组与显式格式化均有回归断言。 |
| 点击 FieldLabel 后焦点在面板 | FieldLabel 激活原生 trigger，原语打开浮层。新增用例改为断言正确名称、description/error id、打开列表、Esc 回到同一触发器；不强制覆盖合法原语激活行为。 |

随后补充了空值名称来源、显式格式化和受控展开用例。受控/非受控展开分别新建实例，避免测试自身切换控制模式。值受控、非受控、取消变化、空/零/未选、只读/禁用、字段错误与原生 FormData 都有行为断言。

原生 Select 未选与显式空字符串可能都提交 `""`；UI 状态与名称区别仍保留。应用必填规则应基于实际受控值判断，不只看 FormData 的字面空字符串。SelectValue 的空字符串修正要求 items 中有可读 label 或调用方显式格式化；不自行创造名称。

## 已观察的检查

| 检查 | 状态 | 证据 |
|---|---|---|
| 库 typecheck | PASS | `pnpm --filter @qingye/ui typecheck`；最末检查 0 错误。初次并发 Layout/Typography 错误后来消失，本批未改它们。 |
| 两组件定向行为 + conventions | PASS | `vitest run test/radio-group.test.tsx test/select.test.tsx test/conventions.test.ts`；3 文件、38 用例通过（Radio 12、Select 19、AST 约定 7），无最终 stderr。 |
| J 消费文件编译 | PASS | 使用 docs 的原始严格 tsconfig，限定 J 的 7 个入口及其传递依赖，TypeScript noEmit 0 diagnostics。首次临时探针缺少 configFilePath 导致类型库查找失败，已修正探针；未删除配置或过滤 diagnostics。 |
| 整站 typecheck | FAIL | 最末 125 条归档后外壳诊断，仍引用不存在的组件，日志 `/tmp/qy-batch4-j-docs-typecheck.log`。本批新增内容与审查段落无诊断；未修范围外外壳。 |
| J 范围 git diff --check | PASS | 输出为空；新 metadata/demos 另有实际 TypeScript 编译。 |
| 桌面浏览器、焦点与对比 | PASS | 单会话 Chromium，1280×960，浅深色串行；真实 Tab、600ms 后采样、Home/End、方向键、类型搜索、Esc、应用错误/恢复、值保留、五档对齐、200% 文字放大均通过，详见下表。 |
| build / gen:catalog / 发布与正式包消费者 | NOT_RUN | 用户指定由主任务汇总；本批未执行。 |
| 390px / 移动适配 | NOT_RUN | 用户指定本批只做桌面；既有 -narrow 接线保留。 |

日志：`/tmp/qy-batch4-j/tests.log`、`ui-typecheck.log`、`/tmp/qy-batch4-j-consumers-typecheck.log`。浏览器脚本、结果与截图位于 `/tmp/qy-batch4-j/`，没有增加产品入口或生成物。

## 桌面运行证据

`browser.json` 保存完整数据，10 张截图已经目检。测试直接消费当前组件和 authored demo；尺寸 demo 与类型搜索探针临时挂载在同一页面，随后 unmount 并删除临时 DOM。

| 检查 | 结果 |
|---|---|
| 浅/深 Radio 焦点 | 真实 Tab：focus-visible=true，20×20 不变，1px 边框仅变色，box-shadow=none、outline=none。圆点与承载面对比 15.13 / 15.09。 |
| 浅/深 Select 焦点 | 真实 Tab：focus-visible=true，400×32 不变，1px 边框仅变色；invalid 聚焦继续使用危险文字色；无 box-shadow 或外环。 |
| 普通文字、占位、辅助与错误 | 实际背景叠层合成，最小浅色 5.94:1、深色 6.86:1，均按 4.5:1。 |
| 必要外圈/触发器边界 | 最小浅色 3.71:1、深色 4.67:1，均按 3:1。 |
| 候选文字含高亮背景 | 非禁用项最小浅色 17.68:1、深色 12.10:1；勾标实测 16×16，选中北区与高亮西区同时存在。 |
| 键盘 | 方向键改变 Radio 值；Select Home 到北区、End 到西区；真实输入 char 高亮 Charlie；Esc 返回触发器并保留 Alpha，不把高亮提交成值。 |
| 应用失败与恢复 | 区域未选时就地错误，已选每天保留；北区选择后本页方案包含区域与频率；清除再提交失败保留已应用方案。 |
| 几何与长内容 | 页面 scrollWidth=clientWidth=1280，长中英名称可读；200% 文字放大 demo 无水平溢出。 |
| 执行期 pageerror / console.error | 最终成功脚本均为 0。初次打开仍有既有 favicon.ico 404，因此不声称全会话零 console error。 |

| size | Select 与 Input 同外高 | 同字号 / 行高 | 同 bordered 水平内距 | Select 圆角 |
|---|---|---|---|---|
| xs | 24px | 12 / 16px | 9px | 6px |
| sm | 28px | 13 / 18px | 11px | 7px |
| md | 32px | 14 / 20px | 13px | 8px |
| lg | 36px | 16 / 24px | 15px | 8px |
| xl | 40px | 18 / 26px | 15px | 8px |

首次浏览器脚本在列表入场/初始焦点尚未结束时立即发送 End，断言失败；在同一实例等待后 End 成功，随后探针明确等待入场 600ms。临时 demo 动态导入第一次把 Vite 的 CJS default 当作命名导出，createRoot 不存在；修正探针的模块读取后通过。两次都没有更换浏览器、修改组件或放宽行为断言。

长审查页使用现有 scroll-behavior:smooth；连续 Tab 后首次 Radio 采样还在页面滚动途中。独立复查滚动结束后实际焦点 y=510.17、viewport height=960，位于视口内；没有用脚本 focus 触发焦点。该滚动观察记录在 `tab-scroll.log`。

### 浏览器所有权与清理

初查无会话；准备启动时发现 I 正在运行，随后 K 使用资源，直到 CLI list 与相关进程检查均无实例才启动 J。未操纵或关闭 I/K 的会话。

本批只有 `qy-batch4-j`：daemon PID 60688，Chrome PID 60700，父子链及专用 profile 记录于 `processes-start.log`。所有主题、状态、demo 与探针串行在一张活动页面执行。已经用原 CLI 连接显式 close；`cleanup.json` 确认所记录进程、后代与 profile 匹配残留为 0，既有 Vite PID 59950 保留。没有新建清理服务器或广泛杀进程。

## 交接边界

- 来源记录中旧 radio-group.tsx、select.tsx 的派生条目若仍存在，主 agent 可统一移除；本批未改 coss-source.json 或 THIRD_PARTY_NOTICES.md。
- 浮层与其他显式层级并置的遮挡：UNVERIFIED。没有用自然 Portal 顺序冒充所有嵌套浮层都通过。
- 整站外壳、完整品牌/强制颜色/RTL/辅助技术与物理设备矩阵：UNVERIFIED 或 NOT_RUN；不把定向测试当完整验收。
- 视觉基线独立变化：重写圆点与边界、触发器五档、无阴影浮层、选中勾标/高亮分离；不保证保留归档版本外观。本批没有截图基线更新或现有断言迁就。
