# Batch 3 E：Tooltip 与两个 hooks 重写

2026-10-03。工作区实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`，开工 HEAD `275d730`，前两条提交为 `b93bfe4`、`9d51f7a`。工作区已有大量并行重写、删除与生成副本变更，按 E 的文件边界增量工作；未提交、checkout、stash 或清理其他人的改动。

## 依据与读取边界

先读 AGENTS.md、design.md、STANDARDS.md、foundation、value-adjudication、family-overlay 与上一批 A/B/C 报告，再写[本批决策](../decisions/2026-10-03-tooltip-hooks-rewrite.md)，之后重写代码。design.md 是唯一设计依据；基础层当前数值作为已明示的选择/预设使用，不称唯一推导。

通过 TypeScript AST 与类型检查器只提取三个旧文件的导出名、参数类型、类型别名与推断的公开结果类型；没有输出或阅读函数体、className 或样式。参数绑定模式的提取额外输出了 TooltipPopup 的位置默认值与复制 timeout 默认值，已在决策中如实记录；它们没有用于推导设计值。Breakpoint 的公开字面量联合经类型检查器展开，未读取旧断点常量。没有读取归档组件源码、归档测试或 provenance freeze。

另读本地安装 Base UI 1.7 的 Tooltip 公共声明及可访问交互实现，核对它是否真的提供本任务所需能力；没有使用其外观示例的值。[Base UI 公共文档](https://base-ui.com/react/components/tooltip)与 [WCAG 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)仅用于原语和无障碍行为核对。

## 实现与视觉基线

- Tooltip 的既有导出与 props 类型保持兼容，TooltipContent 别名保留。TooltipProvider 直接提供原语的共享 delay/closeDelay/timeout；键盘聚焦即时显示，指针首次600ms、连续窗口400ms、关闭0ms均明确标为原语预设。
- Base UI 1.7 没有 role=tooltip/aria-describedby。包装补足关联，保留调用方描述，只有当前触发者得到当前提示的 ID；关闭即移除提示关联和可访问树内容。MutationObserver 随 ref 卸载清理，外部对象 ref、React 19 callback ref cleanup、render、事件与状态 className 透传。
- disableHoverablePopup 始终 false，trackCursorAxis=both 归一为 none，防止原语关闭可悬停通路。两项类型保留、行为约束在 metadata 和决策明确写出；不是静默维持旧行为。提示不承载唯一名称、关键后果或可交互内容，直接 render 的原生 disabled 控件同时停用提示，避免只有鼠标入口；render 函数/自定义控件的内部禁用由调用方同步 Trigger.disabled。禁用原因须持续可见。
- 裸 Trigger 默认复用 quiet Button，避免另造焦点、尺寸和触摸命中样式。显式 render 的真实控件继续拥有这些表达。
- **新视觉基线**：提示读 surface-raised/foreground、shadow-raised、rounded-overlay，删除局部阴影与伪元素高光。短文本读 sm 控件几何及同名文字，垂直内距由外高与行高换算，保留 -narrow/+4px 接线。默认位置 top/center、偏移0/0。入退参数只由 motion.css 提供。共享 payload 即时切换，不再让旧内容通过 Viewport 同时进入可访问描述。
- **z 序边界**：当前 tokens/theme 没有 z-index token，本批没有制造新 token 或写 z-50，依赖 Portal 正常绘制顺序 auto。任意带正 z-index 的祖先/遮挡组合仍需集中基础层决定与验收；不宣称任意堆叠环境通过。
- useMediaQuery 的服务端/hydration 首帧 false，客户端读真实快照；不存在 matchMedia 时 false。useSyncExternalStore 处理订阅、换查询和清理，保留字符串、具名断点、区间、对象与 useIsMobile。断点数值及 useIsMobile 的 width<768 定位为查询预设，max 使用严格小于阈值。
- useCopyToClipboard 在 writeText resolve 之后才报告成功；权限拒绝、不可用、同步异常分别走 onError，不采用未经验证的降级复制。新请求清除旧成功计时器；只有最新仍挂载的请求更新状态及回调。timeout=2000ms 是反馈复位选择；调用返回 void 的公开签名保留。

没有新增 token 或内置 UI 文案，locale 文件未修改。Hook 内的 Error 是传给 onError 的诊断异常；恢复文字由消费示例持有。没有改生成物、来源记录、入口聚合文件、DesignReview 或 review-main。

## 消费内容

新增 `20-tooltip.tsx` 自动追加到 `/review.html`。使用现有 Button、Tooltip 与 useCopyToClipboard 的真实 API；没有复制基础控件。五个 demo 已消除已归档 Kbd/ToggleGroup 引用：文字格式、最近编辑、实际 Ctrl+B/⌘B 格式操作、段落对齐与复制地址。

复制成功来自真实 Clipboard API；“尝试复制（权限拒绝）”在一次同步调用内临时提供拒绝 Promise，随后在 finally 原样恢复 clipboard 属性。失败文字留在地址旁，地址仍可选中手动复制，再次正常尝试可恢复。没有预先显示成功或把模拟成功当系统复制。

## 测试与断言处置

新增三个任务测试文件，16 Tooltip + 15 media-query + 13 copy，共44个执行用例。没有改任何既有测试断言、skip 或阈值。

新增测试编写期间的修正均保留最终行为断言：

| 首轮发现 | 处置与理由 |
|---|---|
| SSR 将 window/navigator 置空，影响清理与后续用例 | 在 SSR 用例 finally 恢复全局；没有取消无 window/clipboard 的断言 |
| userEvent.hover 配合 fake timers 等待超时 | 延迟用例用 mouseEnter+mouseMove 触发原语真实 rest-delay 分支；599ms不出现/600ms出现、19ms不出现/20ms出现断言保留。真实指针通路另由浏览器验 |
| 没有 role/aria-describedby | 修复包装层，不改测试查询为无语义 div |
| 关闭中的旧 Popup 仍进入可访问树 | 包装在 data-open 消失时 aria-hidden=true，未放宽唯一 tooltip 的查询 |
| 共享 Viewport 让可访问描述同时包含旧、新 payload | 删除非必要 Viewport，保留当前描述恰为新 payload 的断言 |

## 已执行检查

| 检查 | 状态 | 观察 |
|---|---|---|
| 三个任务测试 | PASS | 3文件、44用例；键盘、Esc、ARIA、禁用、Provider延迟/覆盖、共享handle、透传、SSR/hydration、订阅清理、成功/失败/交叠/卸载 |
| conventions + color-check | PASS | 2文件、56用例，未改检查器或放宽断言 |
| `pnpm --filter @qingye/ui typecheck` | PASS | 最终0错误。初次并行 Checkbox 文件类型错误已在其自身任务中消失，本批未改该文件 |
| 本批 docs 源码定向编译 | PASS | 按 docs 配置解析真实库源码，7个入口、0 diagnostics；不读旧 dist，不生成 |
| `pnpm --filter docs typecheck` | FAIL | 156个范围外错误，主要为归档后的模块/页面缺席；Tooltip内容、审查段落与两个hooks诊断为0 |
| 决策链接与范围 whitespace | PASS | 5个本地链接均存在；git diff --check 无输出 |
| 桌面浏览器 | PASS | 1280×960，浅深色、真实Tab/Esc、指针延迟/可悬停、快捷键、真实剪贴板、拒绝/恢复、长文、四个方向与reduce；详见下文 |
| build/gen:catalog/正式包与发布 | NOT_RUN | 按用户约束由主agent统一执行 |
| 390px/物理设备 | NOT_RUN | 当前用户裁决仅桌面审查，不新增窄屏工作 |
| 辅助技术朗读与任意堆叠/品牌组合 | UNVERIFIED | 单元关联与默认主题观察不替代这些验收 |

日志与临时浏览器脚本留在 `/tmp/qy-batch3-e/`；没有向范围外仓库目录写验证产物。

## 桌面运行证据与浏览器所有权

使用 playwright 技能的 CLI。先发现 D、随后 F 的会话占用，未新开并行浏览器。CLI list 确认没有浏览器、进程扫描确认旧会话已退出后，才启动 E。始终一个 `qy-batch3-e` 会话、一张活动页面；主题、状态与临时消费者串行。

| 观察 | 状态 | 实测 |
|---|---|---|
| 真正的键盘焦点 | PASS | Tab 从标题后的顺序进入；两色均 focus-visible=true。等待600ms后控件32×32px，前后几何不变，border=0、outline=none，仅1px inset线 |
| 名称、说明、Esc | PASS | 名称来自按钮 aria-label，描述只关联当前提示；Esc关闭并保留焦点，提示ID从 aria-describedby 移除 |
| 指针与持续阅读 | PASS | 共享窗口结束后，首次hover的200ms仍未出现，累计700ms已出现；从触发者移动到提示中心，1000ms仍在；相邻提示80ms内切换，Esc可关闭 |
| 可悬停硬约束 | PASS | 同页临时消费者显式传 disableHoverablePopup=true、trackCursorAxis=both，仍可移入并阅读800ms；长中英文本无自身溢出 |
| 真实快捷键 | PASS | Ctrl+B 与按钮点击都改变真实 aria-pressed/预览格式；没有只展示快捷键而不实现动作 |
| 成功、拒绝与恢复 | PASS | 正常复制后，系统clipboard.readText()为完整GitHub地址；拒绝入口显示未复制与手动复制依据，原clipboard已恢复，再次正常复制成功 |
| 四个方向示例 | PASS | top/right/bottom/left 实际 data-side 与请求一致；点击对应文档按钮后 aria-pressed 和预览同步。第一个指针提示 transition-duration=0.14s，后续共享窗口即时0s |
| 媒体订阅与reduce | PASS | min1100匹配true；切换reduce后媒体输出由true:false变true:true，提示scale=none，文字与Esc仍成立 |
| 默认文字对比 | PASS | 提示普通文字浅色19.80:1、深色14.24:1，均按4.5:1判断 |
| 必要焦点信号 | PASS | quiet内线与实际承载面浅色14.00:1、深色12.21:1，均≥3:1 |
| token实际消费 | PASS | 默认提示13px文字、28px高、5px/12px内距、12px圆角。临时改overlay圆角18px、sm外高40px、水平内距20px、raised面rgb240与shadow none，实得18px/40px/11px 20px/rgb240/none；随后原样恢复 |
| 几何与目检 | PASS | 1280px视口，页面实际宽1265px（滚动条），审查段落scrollWidth=clientWidth=832px；浅深色及成功/拒绝截图已目检 |
| pageerror/执行期资源与console | PASS | 完整成功脚本pageErrors/consoleErrors/requestFailed/HTTP>=400均0；首次打开另有既有favicon.ico 404，未将全会话console标为0 |

两次初步探针也如实保留：首轮从点击后立即Shift+Tab/Tab进入，等提示超时，原因没有独立定位；随后在同一会话、两色重演同一路径均重新展开，最终复核为PASS，不据此宣称已定位首轮瞬态原因。另一轮把刚关闭的键盘提示与首次hover连在同一个Provider即时窗口内，正确地观察到立即展开；探针等待该400ms窗口结束再测首次延迟，保留200ms不出现的断言，没有修改延迟策略或放宽行为条件。最初locator截图裁掉提示越出section的部分，最终取景扩到真实提示和段落共同边界；这只改采集范围，没有改组件布局。

证据：`/tmp/qy-batch3-e/browser.json`、`capture.json`、`directions.json`，四张最终截图 `review-light.png`、`review-dark.png`、`copy-success.png`、`copy-denied.png`。所有临时消费节点都在finally卸载；没有创建仓库外观副本或独立浏览器。

- daemon PID 84463（PPID1），Chrome PID84475（PPID84463），专用profile `/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/playwright_chromiumdev_profile-Ya99OE`。
- 使用原有CLI连接显式close。记录的8个daemon/browser/子进程及profile匹配进程全部退出，残留0；未广泛kill，也未另起清理服务器。
- 原有Vite PID59950非本批启动，保持运行。生命周期记录见 `lifecycle-before.json` / `lifecycle-after.json`。
- 任意z-index遮挡、品牌组合、实际辅助技术朗读与首轮瞬态超时原因仍为UNVERIFIED；本批没有390px验证。

## 来源记录交接

主 agent 应删除 `packages/ui/coss-source.json` 中以下**记录**（按 file 匹配，数组序号会随并行删除变化）：

| 位置 | file | 上游路径 |
|---|---|---|
| components | src/components/tooltip.tsx | apps/ui/registry/default/ui/tooltip.tsx |
| components | src/hooks/use-copy-to-clipboard.ts | apps/ui/registry/default/hooks/use-copy-to-clipboard.ts |
| components | src/hooks/use-media-query.ts | apps/ui/registry/default/hooks/use-media-query.ts |
| adaptationSummary.behaviourPriority | src/components/tooltip.tsx | 该对象整条删除 |
| adaptationSummary.behaviourPriority | src/hooks/use-copy-to-clipboard.ts | 该对象整条删除 |

本批没有删除或修改 coss-source.json / THIRD_PARTY_NOTICES.md。三个目标源码文件头无上游声明。

当前扫描原始输出（其他批次已同步重写剩余文件，此观测只证明扫描时点）：

```text
$ grep -rl THIRD_PARTY_NOTICES packages/ui/src
（stdout 为空；exit 1，表示没有匹配文件）
```

扫描没有匹配不代表可自行删除法律文件；来源台账与分发声明由主 agent 合并核对。
