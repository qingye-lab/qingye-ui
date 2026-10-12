# Browser audit gate

`node scripts/audit.mjs --report report.json` scans the current component playgrounds in two serial desktop variants: light and dark at 1100×900. The source content inventory supplies the slugs; the UI package version is the one in `packages/ui/package.json`. Desktop is the current delivery scope; physical touch and mobile acceptance are NOT_RUN. Nonzero exit means page/console errors, page overflow, empty demos, internal overflow, invalid intent declarations, or a harness/cleanup failure. Unknown variants, flags and missing flag values fail before launch.

The detector keeps the existing 2 CSS-pixel boundary threshold. For stable layout measurement, it temporarily fixes only an isolated infinite pure full-turn rotation at its identity start: positive duration, zero delay/iterationStart, replace effect, rotation-only keyframes, no competing effect, and an actual identity transform/rotate check. It restores the original animation time/playback afterward. Mixed translate/scale/opacity effects and static transforms remain measured as rendered. The complete rotation cycle is not a paint-containment acceptance check. Normalized animation keyframes/timing/before-and-measured transforms are recorded in the report. It measures content boxes including borders/padding, compensates computed negative margins, rounds coordinates to device pixels, and walks through display:contents or strict 0×0 visible-overflow sizing wrappers to the nearest real box. It never skips an entire SVG or component. Intentional scroll/hidden containers retain the prior treatment.

Only `data-audit-overflow-inline="1em"` on a text leaf centered by a zero-width flex-column anchor declares the reviewed Slider label intent. It budgets at most that leaf's computed font-size on each inline edge. Unknown values or different structures fail validation. The declaration does not exempt page overflow or overflow beyond its budget.

`node scripts/test-audit.mjs` verifies 23 browser fixtures, including 2px rotated intent, real 3px overflow, negative margins, borders, display:contents, 0×0 wrappers and 2000px overflow beyond the finite declaration. Dedicated fixtures cover 32px pure rotation, rotating 2000px overflow, static translation/scale and mixed translation animation. The 2026-10-01 historical Task 1 evidence is saved under `test-results/ui-audit-task1/`; that version’s final scan measured 352 pages. Those receipts remain historical evidence and do not prove the current rewritten components pass. Current runtime reports must be produced again against the final built package.

CI builds docs, installs managed Playwright Chromium, then runs `node scripts/run-browser-audit.mjs --report test-results/ci-audit/report.json`. This runner owns a strict-port Vite preview on 127.0.0.1:5181, waits for the built HTML and JS asset, propagates audit failure, and closes only its own preview process group. Audit uses one browser and one active tab, closes through finally and SIGINT/SIGTERM handlers, and verifies its owned process tree exited. `UI_AUDIT_PORT` selects another free port. The runner refuses occupied ports and never adopts an unrelated server.

Gate failure can be proved without editing a demo:

```sh
node scripts/run-browser-audit.mjs button --only light-desktop --fixture-overflow --report test-results/ci-audit/failure.json
```

The explicit flag inserts a 2000px element after render through `AUDIT_FIXTURE_OVERFLOW=1`; normal runs do not modify the page. Local built-preview success returned 0, injected overflow returned 1 (page 1106px/internal 1312px), and SIGTERM interruption returned 1. All three closed their browser and preview; JSON/logs/receipt are in `test-results/ci-audit/`. Actual GitHub CI and the tag-triggered Release workflow are **NOT_RUN** at this checkpoint. Release runs the same built-preview browser audit before pack/create, so a finding prevents release creation. No tag or release was created for this local validation.

This macOS host's managed Chromium153 exited around30s without an identified cause. Local browser evidence explicitly used `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'` (154.0.8037.58). The Ubuntu workflow uses its installed managed Chromium; the local workaround is not an assertion about CI runtime.

## Current delivery entries

CI and Release retain separate checks for current composition behavior, computed foundation roles and Studio’s real project tooling:

- `node scripts/run-browser-audit.mjs --patterns` exercises current playgrounds: filter draft/apply/cancel/clear, Tabs retained fields and disabled boundaries, Tree expansion/selection, bulk target/version scope, DataTable zero/sort/stable selection, and native Form cancel/reset with caller errors. Six current compositions retain independent 200% **font-size** and text-spacing overrides, reachable actions, clipping, 2px page bounds and actual text contrast. No deleted business app, simulated service or permission DTO is used.
- `node scripts/run-browser-audit.mjs --foundations` measures real brand axes before/after mount, danger text and bordered-state contrast, input/Select adjunct capacity, control dimensions, spacing stability, radius/focus, and current token recipes on the caller-owned page. Actual computed results and unresolved AST paths remain separate. The runner rejects stale fingerprints; regenerate the current facts before observing, and never carry old observations forward as PASS.
- `node scripts/verify-studio.mjs` keeps independent iframe drafts, selection and explicit errors across theme changes; Select/Menu/Dialog/Toast stay in their owning document. Existing actual import/export/reset/apply, source conflict, late response ownership, nonce and report checks remain. Studio’s 1100/1600 widths test its actual two-document tool layout, not a second full-component matrix.
- `node scripts/verify-packed-consumers.mjs --tgz <candidate.tgz>` installs the tarball into four isolated projects: Tailwind/precompiled × Button subpath/full. Button installs no Table/Chart optional peer; full explicitly supplies TanStack/Recharts. Real brand/CSS height, named Portal and focus return, native FormData, InputGroup border/action, manual Tabs, focused Tree removal and same-source zero/unknown Chart/Table values remain gated. Both desktop themes retain overflow and text contrast checks. Published registry templates typecheck against the installed package; Chinese and English guide files must be present.

The old non-CI `--date-range-proof` entry is explicitly rejected before preview launch. It refers to a historical mobile/obsolete-API fixture; its script and evidence remain available for historical review. Current date components are covered by their actual source regressions and current component audit. Use `node scripts/run-browser-audit.mjs date-picker date-range-picker` for a targeted current render audit.

Preview/browser ownership and cleanup are unchanged. The default 83×2 scan supplies the full render inventory; foundations do not repeat those unchanged screenshots. The package’s standard prepack build remains a freshness safeguard for independent packing; preparation does not disable its lifecycle. No local preparation implies that CI, Release, packed installation or browser acceptance has actually run. See [delivery observations](implementation/2026-10-04-distribution-local-ci.md) for the final observed status.

## Actual GitHub gate proof (historical)

The following paragraph preserves the 2026-10-01 pre-release checkpoint. Later tag executions are recorded by the [Release workflow](https://github.com/qingye-lab/qingye-ui/actions/workflows/release.yml); its historical NOT_RUN status is not a claim about subsequent releases.

The Ubuntu run [36879986837](https://github.com/qingye-lab/qingye-ui/actions/runs/36879986837) executed the injected overflow audit after successful typecheck/tests/build/install. The report contains page overflow1106px and internal overflow1312px; audit returned1, Pack was skipped, and browser/preview both closed. The audit measured2000ms; runner3658ms; full job589s, including419s installing system/browser dependencies. See `docs/baseline/2026-10-01-ci-gate-failure/receipt.json`. The final workflow removes injection and restores88×4; its observed result is attached to the current verify check on [PR1](https://github.com/qingye-lab/qingye-ui/pull/1). The tag-triggered Release execution remains NOT_RUN.

## axe-core 扫描（2026-10-12，尚未接入 CI）

`scripts/axe-audit.mjs` 对每个 playground 页在浅色、深色各注入一次 `axe-core`（根 `package.json` 的 devDependency，4.14.0），页集、浏览器启动与主题切换与 `scripts/audit.mjs` 相同（`browser-runtime.mjs`）。只扫 `[data-playground]` 范围，demo 处于静置态：未打开的弹层、菜单、对话框内部不在覆盖范围内。axe 自动发现的问题只是 WCAG 的一部分，它是补充，不替代人工与键盘检查。

```sh
DOCS_URL=http://localhost:5193 node scripts/axe-audit.mjs [slug…] [--only light-desktop,dark-desktop] [--report file.json] [--contrast]
```

- 规则标签：`wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`。在 4.14.0 里 `wcag22aa` 标签存在，只含 `target-size` 一条规则。
- 退出码：有违例或页面未能扫描时为 1。状态沿用 `PASS` / `FAIL` / `UNVERIFIED` / `NOT_RUN`：违例为 FAIL，axe 的 `incomplete`（无法判定）计入 UNVERIFIED 且不算通过，加载失败记为 NOT_RUN。`DOCS_URL` 缺省与 `audit.mjs` 一致（`http://localhost:5180`）。
- 输出按规则 → 页面 → 节点选择器归并；`--report` 写出全部违例与未判定节点的 JSON。
- **`color-contrast` 默认关闭，`--contrast` 打开。** 先全量跑过一遍：打开后 182 次页面×主题扫描里 0 个违例，257 个节点（9 个页面：chart、scatter-chart、otp-field、scroll-area、virtual-list、toc、table、kbd、file-upload）全部是「无法判定」，原因是 axe 读不出 `color-mix()`、半透明面叠加和 SVG 文字的底色。它没有发现任何本库对比度门禁（`scripts/lib/browser-contrast.mjs`，量合成后的真实颜色）没发现的东西，却让每次运行都停在 UNVERIFIED，所以默认不开；对比度只认本库自己的门禁。

### 首轮结果与处置（`axe-core 4.14.0`，182/182 次扫描）

首轮（2026-10-12）46 个违例节点、7 条规则，浅深两侧相同。同日全部处置：

| 规则 | 页面 | 根因 | 处置 |
|---|---|---|---|
| `aria-toggle-field-name` | checkbox、switch「labels」 | 演示的行文字不是 FieldLabel，控件无名称 | 演示用 `aria-labelledby` 指向行文字 |
| `aria-hidden-focus` | chart「donut」「donut-total」 | Recharts 3 的 Pie 根层默认 `tabindex=0`，落在 `aria-hidden` 绘图区 | `accessibilityLayer={false}` + `rootTabIndex={-1}` |
| `aria-prohibited-attr` | stat「delta」、kbd「states」 | `dd` / `kbd` 上的 `aria-label` | 改为视觉隐藏文字，读出内容不变 |
| `label-content-name-mismatch` | copy-button「sizes」、toggle「pressed」 | 固定名称覆盖可见文字；字母当图标 | 有可见文字时名称跟随文字、动作进描述；换真图标 |
| `select-name` | native-select「density」 | 演示自定 `id` 未进 FieldControl | 演示改用 `FieldControl render` |
| `label` | prose「code-table-tasks」 | 任务项 checkbox 无名称 | 演示用 `aria-labelledby` 指向任务文字 |
| `scrollable-region-focusable` | toc「scroll-spy」 | 演示自建滚动容器不可聚焦 | 改用库内 ScrollArea（具名 region） |

处置后全量：**0 违例**。

### 豁免与未定

- **豁免（脚本内，逐次计数输出 `EXEMPT`）**：tree 中展开的 treeitem 触发 `label-content-name-mismatch`。treeitem 含下一级，axe 把子项文字算作它的可见文字；WCAG 2.5.3 关心的是项自己的可见标签。条件收得很窄：treeitem 已展开、名称由 `aria-labelledby` 指向自己行内（`tree-row` 的直接子标签）、该行文字与名称相同。名称来源改为 `aria-labelledby` 后 axe 仍报，确认是规则对嵌套树的启发式。读屏实机 UNVERIFIED。
- **UNVERIFIED：heatmap `target-size`（2.5.8）**，69 个格。实测格 34.25 × 20px，行距 22px（< 24px，间距例外不成立）。指针在格上只显示读数、不激活任何操作，同样的数值在「数据表」视图里可达，倾向适用「等效」例外；这是判断，未当作通过。
- `color-contrast` 默认关闭：`--contrast` 打开后 0 违例、257 个节点无法判定（`color-mix()`、半透明面、SVG 文字），对比度由本库自己的门禁承担。

接入 CI 的建议：扫描现已零违例，可把 `node scripts/axe-audit.mjs` 放到 `ci.yml` 的 Browser audit 之后（需要 docs 服务；可复用 `run-browser-audit.mjs` 的 preview 管理，当前脚本只读 `DOCS_URL`，尚未与 preview 运行器整合）。
