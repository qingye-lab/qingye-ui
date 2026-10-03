# 第四批 K：Dialog / AlertDialog

## 范围、来源与保存边界

日期 2026-10-03，实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`。开工 HEAD `275d730`，随后两条为 `b93bfe4`、`9d51f7a`；工作区已有大量并发重写、删除与新文件。保留所有既有工作，不 commit/checkout/stash/reset/clean。

K 从零写入 dialog.tsx、alert-dialog.tsx、各自测试和内容目录、新审查段落 60-dialogs.tsx、[决策](../decisions/2026-10-03-dialogs-rewrite.md)及本报告。`src/index.ts` 只通过 `pnpm --filter @qingye/ui gen:index` 更新（执行时扫描到 20 个组件，含并发任务新增文件）。没有修改 motion.css、locale/en-US、DesignReview/review-main、来源记录或生成副本；没有 build/gen:catalog。

读取了 AGENTS.md、根 design.md、STANDARDS、foundation、value-adjudication、family-overlay/action 和上一批 A/B/C 报告。实现接线读取当前已重写 Button、Popover、Fieldset、utils、locale、token/motion 声明、文档类型与审查入口，以及当前官网邀请表单的消费名称。没有读取归档组件、归档测试或 provenance-freeze，也没有通过 Git 读取旧组件函数体/样式；Git diff 仅做 stat/numstat/check，不以 HEAD 旧实现作为设计来源。

无障碍底座核对使用安装版 Base UI 1.7.0 的 Dialog/AlertDialog Root、Popup、Portal、Backdrop、Viewport、Trigger、Close 与 useRender 公共声明、[官方 Dialog](https://base-ui.com/react/components/dialog)、[官方 AlertDialog](https://base-ui.com/react/components/alert-dialog)的 API/行为说明。官方页面当前为 1.8.0，执行以本地 1.7.0 和运行证据为准。诊断遮罩归位时额外读取安装版原语的 DialogPopup.js 中 returnFocus 转发、useDialogRoot.js 中 outsidePress 配置、FloatingFocusManager.js 中 preventScroll 能力探测与归位分支；没有取用示例 CSS 或外观数值。

两份新元数据为 source:local。主 agent 汇总来源清理时，应删除仍存在的 dialog.tsx / alert-dialog.tsx 派生来源条目及其行为引用；K 不修改 coss-source.json 或 THIRD_PARTY_NOTICES.md，也不宣称其他文件的法律分发义务消失。

## 实现与外观基线

- Dialog 固定 modal=true；AlertDialog 使用原语的完整阻断与禁止外部点击关闭。两个 Popup 显式写 aria-modal=true；安装版原语未自行写入该属性，不能以原语默认阻断代替声明。
- Dialog 默认进入首控件（触摸进入面板），可显式指定字段。AlertDialog 默认进入面板，测试把危险按钮排第一仍不默认聚焦它。initialFocus/finalFocus 类型不提供 false/void 返回出口。Esc 和 Close 返回实际触发者；触发者删除后由应用给上级。
- Popup 组合 Portal/Backdrop/Viewport，以内容固有宽度和视口上限承载，长内容内部滚动；无 size 变体、默认固定宽度或 z-index。Header/Panel/Footer 对应官网已有邀请表单消费，原生结构与 useRender/ref 仍可组合。
- Trigger/Close 默认组合本库 Button；DialogClose 复用已有 locale.close。AlertDialogClose 要求应用提供选择内容；没有新增内置文案，locale 文件无插入。
- 面板使用 rounded-overlay、surface-raised、shadow-overlay、1px border-strong；聚焦 border-ring 只变色、不加粗，不增加焦点内外环。内缘/内容/动作读 panel-padding/panel-gap/field-gap/action-gap。机制是本批选择，数值仍是既有预设，不写成理念唯一推导。
- **新视觉基线**：强边界、浮起表面与遮罩、内容固有宽度和滚动承载替代已归档外观契约。未读取/比较旧样式，不声称具体像素差异已验；没有更新截图基线。
- **motion.css 无改动**：新组件使用已经登记的 dialog-popup/backdrop、alert-dialog-popup/backdrop。现有进入 220ms、退出 140ms、桌面起止 scale .98 和 reduce 移除位移/缩放由共享策略唯一拥有；这些值为预设。

## 审查情境

60-dialogs 自动接到 review.html，只做桌面。它复用两份真实 demo，不再另写基础控件。

“编辑设备名称”：savedName、draft、error 和 open 都在应用组件持有。关闭/重开保留本页草稿；“放弃草稿”明确重置为 savedName；空白保存失败保留输入；保存只写本页状态，刷新后不承诺持久化。

“永久删除杭州网关”：持续工作面保留 GW-HZ-01、当前版本和不可逆后果，入口与确认按钮分别通过 aria-describedby 关联在场说明。打开捕获 reviewedVersion；完整输入“杭州网关”才能提交。载入下一版记录后，提交拒绝旧版本；重新核对清空旧确认，关闭不执行删除或宣称撤销。删除只移除本页记录，触发者随之移除后返回设备列表标题；不把本地样例当作服务端版本/权限保证。

## 测试与诊断处置

25 条新行为用例（Dialog 14、AlertDialog 11）覆盖进入/返回、Esc、明确关闭、遮罩、受控/非受控、标题/说明、aria-modal、焦点困住、嵌套、草稿、共享触发 payload、Portal 上下文、render/ref/style/class/事件、locale 与 callback-ref cleanup。没有修改既有断言或归档测试。

初次新断言的处置：

| 发现 | 修复与断言 |
|---|---|
| 原语没有输出 aria-modal | 组件显式声明 true；四条单层/嵌套断言保留，不改成“没有属性也通过” |
| Tab 短暂落在内部焦点守卫 | 用 waitFor 等待原来要求的同一控件，未接受守卫/背景作为成功 |
| jsdom 不读取 focus options.preventScroll，遮罩归位被原语能力分支抑制 | 仅该测试补读取选项的浏览器能力探针，仍调用真实 HTMLElement.focus；try/finally 恢复 spy。原焦点断言保留，并明确测应用给出的 finalFocus |
| 曾尝试在生产 Backdrop 上阻止 mousedown 默认行为 | 核实环境根因后已移除；生产不因 jsdom 缺口改变关闭或事件契约 |
| 第一条测试命令 `pnpm ... test -- files` 实际跑了全套 | 当时 461 条、448 PASS/13 FAIL，含 7 条 K 初稿失败及并发 RadioGroup/Select/Typography 失败；这不是最终全套结论。改用 `pnpm --filter @qingye/ui exec vitest run files` 精确执行，不改范围外测试 |

## 已观察检查

| 检查 | 结果 | 边界 |
|---|---|---|
| 两个组件行为测试 | PASS | 25/25；原始日志 `/tmp/qy-batch4-k/unit.log` |
| 库 typecheck | PASS | `/tmp/qy-batch4-k/typecheck.log`；初稿本任务错误已修，并发 Layout/Select/Typography 错误后续消失，K 未改那些文件 |
| conventions + style-contract | PASS | 13/13；`/tmp/qy-batch4-k/conventions.log` |
| docs typecheck | FAIL | 127 个归档依赖/其他页面错误；K 内容目录和 60-dialogs 错误 0，未将完整官网标为通过 |
| 本任务 whitespace check | PASS | `git diff --check -- <K 范围>` |
| 桌面浅深色与 reduce 交互 | PASS | 1280×900，一会话一标签页串行；78 项，见 browser.json |
| 桌面嵌套/长内容 | PASS | 11 项；子层 Esc 只关闭子层并归位，父层继续阻断；长内容几何受视口限制，见 nested.json |
| 桌面表达/入退 | PASS | 4 项；进入 0.22s、退出 ending-style 实测 0.14s；Dialog 可用动作文字对比通过，见 presentation.json |

## 浏览器运行证据与清理

确认 qy-batch4-i 已关闭、相关 Chrome/profile 进程退出后才启动 K；没有接管或关闭别的任务会话。使用 Playwright CLI skill 的 qy-batch4-k，会话服务 PID 52672（PPID 1）、Chrome PID 52673（PPID 52672），专用 profile `/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/playwright_chromiumdev_profile-736iL1`。全程一标签页，浅/深/reduce 与临时探针串行；既有 Vite PID 59950（PPID 59927）监听 5180，K 未启动或停止它。

共 **93 项桌面观察 PASS**（78 + 11 + 4），材料位于 `/tmp/qy-batch4-k/`：browser.json、nested.json、presentation.json、对应执行脚本/log、ownership.json，以及 review/dialog/alert 的 light/dark 六张截图。截图已逐张目检，无更新已有基线。临时嵌套/长工单节点在 finally 卸载并移除。

| 实际情境 | 观察 |
|---|---|
| 打开与退出 | 真实 Tab 到触发者、Enter 打开；Dialog 进入名称字段，AlertDialog 进入面板且 focus-visible=true。Esc/明确选择返回触发者；删除入口移除后返回设备列表标题 |
| 阻断 | 两主题 aria-modal=true；反复 Tab 留在当前层，页面 wheel 不改变 scrollY，body overflow=hidden。背景按钮被 aria-hidden，坐标命中被浮层截获；关闭后阻断标记移除 |
| **inert 的准确机制** | 安装版原语在 #root 写 data-base-ui-inert，原生 root.inert 仍为 false、root pointer-events 仍为 auto。背景的实际不可操作由 ARIA 隐藏、焦点管理和 Backdrop/Viewport 截获共同承担；没有把原生 inert 属性记为 PASS，也没有额外手写背景状态 |
| 遮罩 | Dialog 点击遮罩收起并回到触发者；AlertDialog 点击后继续打开，无选择事实被生成 |
| 草稿 | 关闭保留“滨江网关”，重开继续；空白保存被拒并保留；“放弃草稿”才回到 savedName；保存更新本页名称 |
| 删除保护与恢复 | 对象名未满足时提交禁用；载入 v18 后 v17 确认被拒，原输入仍在；重新核对才清空旧确认；提交删除仅改变本页对象，结果持续在列表中 |
| 嵌套 | 子层 AlertDialog 聚焦面板，Tab 不离开子层；Esc 返回子层入口，父层仍 aria-modal=true；再次 Esc 返回外部入口 |
| 内容宽度和容量 | 编辑面板 316px、删除决定约 530.91px，没有共用固定宽度。长工单约 581.30×852px，视口内缘 24px；内部 clientHeight=850、scrollHeight=1718、overflow-y:auto。这证明滚动承载的几何，不外推所有任务容量 |
| 面板边界与焦点 | 两主题边框均 1px，聚焦仅改为 ring；outline-style:none，shadow 仍为既有 overlay 角色。普通边界相对内侧表面：浅 4.61:1 / 深 4.97:1；聚焦边界浅 15.13:1 / 深 10.47:1，无新增焦点圈 |
| 普通/辅助文字 | 标题、说明、字段标签相对真实浮起承载面最低：浅 7.69:1 / 深 7.49:1。Dialog 可用动作文字最低浅 14.50:1 / 深 13.88:1；禁用动作未按可用文字验收 |
| 动效 | 进入 .22s，真实 ending-style 退出 .14s；reduce 不含 scale/translate 过渡，仍可完成版本拒绝、重新核对与删除/归位 |
| 错误 | 主交互成功脚本 pageerror=0、console.error=0。初始开页已有 favicon.ico 404；初次取色探针有 Canvas 性能 warning，后改 willReadFrequently。未声称整个会话零控制台记录 |

浏览器初次取证曾把 root.inert / root pointer-events:none 当作必须形式，导致探针 FAIL；查看真实 DOM 与坐标命中后改为验证原语实际机制（背景 ARIA 隐藏、命中截获、焦点与滚动），未改变组件或放宽背景不可操作要求。Tab 的瞬时焦点守卫与单元环境相同，浏览器也等 ≥600ms 后检查原来的面板内落点，不接受守卫或背景作为通过。

最后通过原有 CLI 连接 close；核对 9 个记录中的会话/Chrome/子进程及专用 profile 全部退出，残留 0。Vite 仍在；没有另起清理服务、广泛 kill 或删除共享缓存。

## 待汇总边界

catalog/AI/registry/包内指南/dist、打包消费者、发布：NOT_RUN，主任务统一执行。移动演示/390px/实体设备：NOT_RUN，按当前用户桌面裁决。高 z-index 宿主、Popover/Toast 同时浮起的遮挡：UNVERIFIED，层级尚待用户裁决，不新增 token 或 z-50。真实辅助技术朗读、完整强制颜色/RTL/200% 矩阵：NOT_RUN；单元 Portal 上下文不是这些运行验收。
