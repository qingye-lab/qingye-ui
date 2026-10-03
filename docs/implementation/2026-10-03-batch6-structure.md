# 第六批结构与原生表单执行记录

## 范围与来源

执行基线 HEAD `a94e8b4`。初始来源收尾文档与本地核查文件保持原样；并行代理的组件、token、locale、计划等改动未回退或覆盖。设计依据为根 `design.md`、`STANDARDS.md`、基础层与表单/动作族。先写 `docs/decisions/2026-10-03-batch6-structure.md`，再编写实现。未读取仓库外归档、冻结或 Coss 实现。

六个新文件：

- `packages/ui/src/components/label.tsx`
- `packages/ui/src/components/form.tsx`
- `packages/ui/src/components/input-group.tsx`
- `packages/ui/src/components/native-select.tsx`
- `packages/ui/src/components/button-group.tsx`
- `packages/ui/src/components/group.tsx`

对应六个 `packages/ui/test/<name>.test.tsx`、六组 `apps/docs/src/content/<name>/meta.ts` 与 12 个 demo 一并新增。按主 agent 扩展职责新增 `apps/docs/src/pages/review/sections/70-batch6-structure.tsx`（`id=batch6-structure`），复用这 12 个 demo。`family-form.md` 只修改 Form 定位的一行。未修改 index、生成副本、tokens、locale、既有组件或共享 review 入口；未提交 Git 或发布。

## 关键契约

- Label 是真实 label；支持 htmlFor、原生嵌套、事件/ref/render。Field 内继续使用 FieldLabel。
- Form 是原生 form 的 useRender / mergeProps 组合。没有自动校验上下文、errors 聚合、请求、成功推断或草稿策略。原生 onSubmit / onReset 支持取消；FormData 保留单值与多值。noValidate 是调用方的显式平台选择。
- InputGroupInput 直接组合当前 Input unstyled / nativeInput 出口；Field 名称、描述、显式 invalid、禁用、只读和实际值继续走同一链。只有根有编辑边界，静态附件不插入 tab 序、不重定向焦点。附件动作复用 Button，默认 demo 以 min-h-0 / self-stretch 适配边框内可用高度。
- NativeSelect 保留真实 select、option、optgroup、multiple、disabled、required、原生 size 与原生表单数据。controlSize 独立读取五档外高和同名文字；多值/多行保留平台列表容量。单值可用 FieldControl render 组合，多值不套用输入原语的字符串注册协议。
- Group 复用 Inline / Stack，只组织方向与既有间隔；默认无角色和围合。ButtonGroup 默认 group 角色与 action-gap，保持每个动作的名称、焦点、状态与独立禁用；不建立选择或工具栏行为。
- 外观读取既有角色；无新增公共 token 或内置文案。`--qy-input-group-padding` 是局部的现有五档 padding 转发变量，不引入新数值或独立修改角色。容量追修另选 4em 普通文本编辑窗口，下文如实记录为局部预设。

## 实际验证

| 检查 | 结果 | 证据边界 |
|---|---|---|
| 首次精准 Vitest | FAIL：22 通过、3 失败 | Form 初版的 Base UI 原语自动 validate / noValidate / 未尊重 onSubmit 取消，与当前显式 Field 契约冲突；空 FieldError 不消费原语 errors。其余五组件 20 项通过 |
| 原生 Form 精准回归 | PASS：6 / 6 | 真实单值/多值 FormData；显式就地错误及失败后草稿；平台 constraint validation；noValidate 与取消；正常/取消 reset；原生事件/render/ref |
| ButtonGroup / InputGroup 最终精准回归 | PASS：8 / 8 | 自审追加调用方 data-slot 透传与附件长文本容量类后，仅重跑实际修改部位 |
| 最终行为测试覆盖 | PASS：六文件共 26 项 | Label 3、Form 6、InputGroup 5、NativeSelect 6、ButtonGroup 3、Group 3；没有把初版失败计为最终成功 |
| InputGroup 容量追修精准回归 | PASS：5 / 5 | 两个长连续附件仍保留输入名称/描述和唯一真实字段 FormData；未用 CSS 镜像断言冒充几何验收 |
| InputGroup 容量浏览器复测（主 agent） | PASS | 320px 短附件、单侧长附件、双侧长附件以及 200px 双长附件，输入仍可编辑且无水平溢出 |
| git diff --check | PASS | 只证明已跟踪差异无空白错误，不代表运行/视觉通过 |
| 全库 tests / typecheck / build / generators | NOT_RUN | 主 agent 统一集成；本代理只跑相关行为测试 |
| 浏览器焦点、computed 尺寸与对比、长文本、触屏目标、平台移动选择器 | UNVERIFIED | 未启动浏览器，由任务唯一浏览器 owner 统一验证 |

运行命令：

```sh
pnpm --filter @qingye/ui exec vitest run test/label.test.tsx test/form.test.tsx test/input-group.test.tsx test/native-select.test.tsx test/button-group.test.tsx test/group.test.tsx
pnpm --filter @qingye/ui exec vitest run test/form.test.tsx
pnpm --filter @qingye/ui exec vitest run test/button-group.test.tsx test/input-group.test.tsx
pnpm --filter @qingye/ui exec vitest run test/input-group.test.tsx
```

## 取舍与实际外观边界

Form 自动协议的失败导致正式采用原生平台提交；不是通过调整测试期待来保留不符当前契约的实现。族文档 Proposed 的错误聚合不产生兼容义务；当前应用继续显式管理错误，六个新组件没有恢复归档 API 的义务。

Group / ButtonGroup 采用开放间隔，不把独立成员合成单一轮廓；NativeSelect 保留平台箭头与菜单；InputGroup 只画一条共同编辑边界。这些是本轮重新选择的表达机制。外高、配色、圆角与时长仍为基础层预设/选择，未声称由理念唯一推导。浅深色真实叠层与焦点不外扩尚待主 agent 浏览器验收。

主 agent 追加浏览器证据确认 InputGroup 初版长附件 `FAIL`：320px 根中，一侧长连续附件使输入只剩 26px padding、scrollWidth 374px，两侧同样附件时 scrollWidth 734px。根因是附件 shrink-0 拒绝收缩，独立 100% 上限不能分配编辑容量。

只在 InputGroup owning CSS 修正：附件可收缩/任意长词断行，根按 DOM 顺序换行，输入保留 `min(100%, 2 × 当前 bordered padding + 4em)` 的普通文本编辑容量。4em 如实记录为本组件容量选择/预设，不新增全局 token 或 API。正常短组合仍可同行；长附件或整体不足时增长共同结构的高度。精准语义用例已修改为两个长附件，5 项通过。

主 agent 复用同一浏览器会话确认修复 `PASS`：320px 短附件 input 219.75px / scrollWidth 318px（与初版正常路径一致）；单侧长附件 input 318px / scrollWidth 318px；双侧长附件 input 318px / scrollWidth 318px；200px 双侧长附件 input 198px / scrollWidth 198px。所测组合无水平溢出，按 DOM 顺序断行。完整焦点/对比、搜索/密码内部附件以及辅助技术检查仍不从该容量证据外推。
