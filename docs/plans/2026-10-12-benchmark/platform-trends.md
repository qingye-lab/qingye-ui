# 库整体层面的趋势与平台适配调研（2026-10-12）

调研对象：`/Volumes/SUNSANG 1/Codex/qingye-ui`，`@qingye_lab/ui` v2.0.0（HEAD `a0753db`）。只读：未改仓库、未做 git 操作、未起 dev server。实测产物都放在 scratchpad（`pkgcheck/`、`wf/`）。

## 0. 方法与可信度

- **浏览器支持与 Baseline 日期**：全部取自 `web-features` 3.42.0 的 `data.json`（`https://cdn.jsdelivr.net/npm/web-features/data.json`，浏览器数据最新到 Chrome 155 / Firefox 157 / Safari 27，2026-10-06），个别用 `https://api.webstatus.dev/v1/features/<id>` 交叉核对。未用 caniuse、MDN（未取）。表中「low」= Baseline 新近可用（Newly available），「high」= 广泛可用（Widely available，low 后 30 个月）；`—` = 尚未进 Baseline。
- **包与版本**：`registry.npmjs.org` 的元数据（日期是该版本发布日）。
- **规范与厂商文档**：W3C、react.dev、npm docs 等一手页面，见第 7 节来源表。
- **仓库事实**：grep 计数与文件:行；已实测的见第 2 节（publint、attw、`require()`、npm 证明端点、线上站点）。
- **没取到、因此不下结论**：Material 3、Spectrum 2、Fluent 2、Radix Themes、Open Props 的 token 结构；Ant 的 compact algorithm、MUI density、Spectrum scale（密度轴对照）；React Aria `I18nProvider`（URL 404）；Chakra MCP 页面；Mantine `DirectionProvider`；caniuse/MDN；Next.js 文档。涉及它们的地方标 **未取到**。凭记忆的内容一律标 UNVERIFIED。
- **本库的约束**：下文的「采纳」都尊重 CLAUDE.md 与记忆里的裁决（简洁不是简陋、不做说明书式 UI、组件单一职责、先研究再请库主裁决、测试要自证价值、页面不做移动适配）。

---

## 1. 最值得做的 12 项（按价值/代价排序）

| # | 项 | 一句话理由 | 代价 | 破坏性 |
|---|---|---|---|---|
| 1 | **方向与区域事实贯通**：`UILocale` 带 `dir`，`UILocaleProvider` 内部接 Base UI `DirectionProvider`，Calendar 的 DayPicker 语言/周起始日由 `Intl.Locale` 推出 | 现状是缺陷：全库没有任何 `DirectionProvider`，Calendar 对非 zh 一律给 enUS | 小·中 | 否（增量；默认 zh/en 行为不变） |
| 2 | **发布链**：npm Trusted Publishing(OIDC) + 自动 provenance；`publint` + `attw` 进 CI | 2.0.0 在 npm 上**没有**证明（端点 404），`release.yml` 只建 GitHub Release，npm 发布是手工的 | 小 | 否 |
| 3 | **axe-core 进浏览器审计**：复用现成的 Playwright 审计页集，浅/深各跑一遍 | 全仓库没有任何 axe；可访问性是核心主张，现状只有几何与对比度脚本 | 小 | 否 |
| 4 | **包卫生四件**：修 `styles.css` 头注释里的旧包名；`exports` 加 `default` 条件；不再打包 `ai/v0.4.0`、`ai/v1.0.0`；发 `declarationMap` | 都是已实测的小缺陷，改动各一两行 | 小 | 否（第三项会让旧版 `ai/*` 子路径消失，属极小破坏） |
| 5 | **API 表由类型解析生成**：`gen-catalog` 用 TS 编译器解析 props 类型，替代手写；补 `providers` 事实 | 90/90 组件 `apiStatus: curated-not-type-resolved`、90/90 `providers.status: UNVERIFIED`；这是给 AI 与官网的单一事实源 | 中 | 否 |
| 6 | **AI 入口补齐（不做 MCP）**：`llms-full.txt`；官网每个组件页有 `.md` 备用地址与 `Link` 头；页面「复制为 Markdown」 | 官网是纯客户端渲染，非 JS 抓取到的组件页只有 1970 字节的壳；llms.txt 约定的 `.md` 备用地址缺位 | 小 | 否 |
| 7 | **框架消费矩阵**：打包后的 tarball 增加 Next 16 App Router（RSC+SSR）、React Router 8、TypeScript 7 三种消费者；安装页补「框架」小节与 SSR/CSP 注意事项 | 现有 4 个消费者全是 Vite SPA；安装页没有一处提到 Next/React Router/SSR/`suppressHydrationWarning`/CSP | 中 | 否 |
| 8 | **`prefers-contrast: more` 把墨阶整体上移一档** | 全库 0 处；而本库把全部灰度收敛到 5 个百分数，这是别家要重写一套主题才做到的事，这里是约十行覆写 | 小（需实测对比度） | 否（仅对开启该偏好的用户） |
| 9 | **React Compiler 兼容性**：加 `eslint-plugin-react-hooks` v7 的编译器规则做 CI 检查，README 声明兼容；不发编译产物 | 仓库里没有任何 lint；42 处手写 `useMemo/useCallback` 按 React 官方说法可保留，但「是否兼容」目前没人检查 | 小·中 | 否 |
| 10 | **Vitest 5 + Browser Mode 试点** | 4.0.16 → 5.0.3（2026-09-30）；jsdom 且 `css:false` 看不到 computed 值；上一轮已定试点范围 | 中 | 测试层面：clearMocks、locators 严格等行为变化 |
| 11 | **布局族用 `@container`**（以审计实测的溢出为准，不预先铺开） | 0 处；控件尺寸跟视口（`sm:`）是对的，但 Stat 网格、PageHeader、DescriptionList、FilterBar 的版心由所在容器决定，桌面分栏时就会错位；Baseline 广泛可用 2025-08-14 | 小·中 | 否 |
| 12 | **`light-dark()` + `color-scheme: light dark`**：无 JS 也首帧正确，并合并重复的明暗块 | 现状无 JS/脚本被 CSP 拦时永远是浅色；Baseline low 2024-05-13，按 30 个月规则 2026-11-13 进广泛可用（推算） | 中 | **有行为变化**：未挂 ThemeProvider 的消费者会开始跟随系统明暗 |

排序之外的两件顺手小事（不占名额）：`toast.tsx:130` 的 `100vw/100vh` 改 `100dvw/100dvh`（Baseline high 2025-06-05）；PageHeader/Empty/Alert 等标题档加 `text-balance`（Baseline low 2024-05-13，不支持时自然回落）。

---

## 2. 我在仓库里发现的现有缺陷（均为实测）

| # | 缺陷 | 证据 | 影响 |
|---|---|---|---|
| D1 | `packages/ui/styles.css` 头注释仍写旧包名 `@qingye/ui` | `styles.css:5` `@import "@qingye/ui/styles.css"`，`styles.css:9` `@qingye/ui/ui.css`；该文件随包发布。`@qingye/ui` 在 npm 上 404，`@qingye_lab/ui` 才是真名 | 按注释复制的消费者装不上；CLAUDE.md「已完成」一栏说命名已统一，此处漏了 |
| D2 | 没有方向传递：全库 0 处 `DirectionProvider`/`useDirection`；`UILocale` 只有 `code` 与 `messages` | grep 全仓库（packages、apps、docs）为空。Base UI 文档：`DirectionProvider` 才使其组件按 RTL 行为，且它「不影响 HTML 与 CSS」，门户里的组件要靠它（`https://base-ui.com/react/utils/direction-provider`）。`family-date.md:20`、`family-layout.md:146` 也承认 RTL「未覆盖/验证成本最高」 | RTL 项目里 Slider、Tabs、Menu 等的方向键行为错；`rtl:` 类名只有 6 处 |
| D3 | Calendar 的语言只二选一 | `calendar.tsx:48` 附近 `locale ?? (code.startsWith("zh") ? zhCN : enUS)`；周起始日、月份名都跟着 DayPicker 的 `locale` 走 | `de-DE`、`ja-JP`、`ar` 等拿到的是英文月名与美式周起始日（读屏标签倒是用 `code`，于是同一控件里语言不一致） |
| D4 | 2.0.0 无来源证明；npm 发布不在 CI 里 | `GET https://registry.npmjs.org/-/npm/v1/attestations/@qingye_lab%2fui@2.0.0` → 404；`release.yml` 末步只有 `gh release create`；版本元数据里 `gitHead` 为空 | 供应链信任弱；与 CLAUDE.md「发布后核对 registry」的流程脱节 |
| D5 | 包里夹带历史指南 | tarball 解包 5.5MB，`ai/` 2.98MB，其中 `ai/v1.0.0` 1.31MB、`ai/v0.4.0` 0.18MB；`ai/v2.0.0` 才对应本版 | 每次安装多下 1.5MB 且给 AI 读到过期事实 |
| D6 | `require()` 解析失败 | Node 24.20 实测：`require.resolve('@qingye_lab/ui')` 与 `.../components/button` 均 `ERR_PACKAGE_PATH_NOT_EXPORTED`（`exports` 只有 `types`+`import` 条件） | Jest(CJS)、Node CJS 脚本、部分 SSR 工具链用不了；`import` 与 bundler 解析是好的 |
| D7 | 没有任何 axe | grep `axe-core|jest-axe|vitest-axe` 全仓库为空；`scripts/audit.mjs` 里没有可访问名称/ARIA 检查 | 命名缺失、角色误用只能靠人和单元测试发现 |
| D8 | 官网组件页对非 JS 抓取者是空壳 | `curl https://ui.xflux.cc/components/button` 返回 1970 字节，`<title>Qingye UI</title>`，无 `<h1>`；响应头无 `Link` | AI 抓取与分享预览拿不到内容；llms.txt 虽在，但页面本身无 `.md` 备用地址 |
| D9 | `@qingye/tooling` 无处可装 | npm 上 `@qingye/tooling`、`@qingye_lab/tooling` 均 404；2026-10-08 命名空间决定只迁了 UI 包 | `qingye-ui docs/info/check/theme` 这套本地、与版本一致的事实服务，AI 或用户 `npx` 不到；任何 MCP 的前提也不成立 |
| D10 | `catalog.json` 的 API 表全是手写 | 90/90 `apiStatus: "curated-not-type-resolved"`，90/90 `providers.status: "UNVERIFIED"` | 与源码漂移时无人发现；官网属性表同源 |
| D11 | ThemeProvider/themeScript 不支持严格 CSP | `theme-provider.tsx` 无 `nonce`；`apply()` 里 `document.createElement("style")` 注入过渡抑制样式，会被 `style-src` 无 `'unsafe-inline'` 拦掉；`themeScript()` 是内联脚本，调用方需自己加 nonce 而文档没写 | 严格 CSP 的站点首帧闪烁或主题失效，且静默 |
| D12 | `DateRangePicker` 展示宽度依赖 `field-sizing: content` | `date-range-picker.tsx:31` `min-w-[12em] [field-sizing:content]`；该属性 Baseline low 2026-06-16（Firefox 152、Safari 26.2 才有） | 较旧 Firefox/Safari 上宽度回落到默认值；需要确认回落外观可接受 |

> 实测记录：`publint 0.3.25` 对 2.0.0 tarball 输出 `All good!`；`attw 0.18.5 --profile esm-only` 对 `.` / `./locale` / `./utils` / `./floating-layer` 在 node16(ESM) 与 bundler 下均为绿；`./theme.css` 等 `.css`/`.md` 导出报「Resolution failed」是 attw 对非 JS 资产的误报（它要求类型），不算问题；`node10` 解析下 `./locale`、`./utils` 等子路径失败（`exports`-only 包的常态，未做 `typesVersions`）。

---

## 3. 「采纳」项的实施说明

### 3.1 方向与区域事实贯通（#1）
- **改哪里**：`src/locale.tsx` 给 `UILocale` 加可选 `dir?: "ltr" | "rtl"`，缺省由 `new Intl.Locale(code).getTextInfo().direction` 推出（`Intl.Locale info`：Baseline low 2026-07-21，Chrome 130 / Firefox 153 / Safari 17，`web-features` 的 `intl-locale-info`）；`UILocaleProvider` 内部包一层 `@base-ui/react/direction-provider`；`Calendar` 把 `locale` 改为「调用方传入 → 否则按 `code` 在 `@daypicker/react/locale` 里查 → 查不到才回落 enUS」，并用 `getWeekInfo().firstDay` 设 `weekStartsOn`（同一特征 Baseline 内）。`MotionProvider`/`ThemeProvider` 不动。
- **验收**：①给 `dir="rtl"` + `ar` 渲染 Slider、Tabs、Menu、Calendar，浏览器里用真实键盘验证 ←/→ 语义（单元测试 jsdom 不足以证明）；②`de-DE`、`ja-JP` 的 Calendar 月名与周起始日；③`family-date.md:20` 的「其它历法/RTL」从未验收改为已验收并写明范围。
- **风险**：`Intl.Locale.getTextInfo` 在 2026-07 前的 Firefox 上不存在，需要 `try/catch` 回落到语言前缀表；门户（Dialog/Popover 内容）要实测 `dir` 是否到位，Base UI 页面明确说门户里要靠 `useDirection`。
- **不做**：不引入 `Intl.MessageFormat`/ICU（见第 5 节 MF2），消息仍是函数，复数由语言包作者用 `Intl.PluralRules`（Baseline high 2022-03-19）自理。

### 3.2 发布链（#2）
- **改哪里**：`release.yml` 增加 `permissions: id-token: write` 与 `npm publish --access public`（Node 24 已满足 npm 文档要求的 CLI ≥11.5.1、Node ≥22.14.0）；在 npmjs.com 的包设置里登记 Trusted Publisher（组织/仓库/`release.yml`，npm 保存时不校验，错误到发布时才暴露）；`package.json` 的 `repository.url` 必须与 GitHub 仓库完全一致（现为 `git+https://github.com/qingye-lab/qingye-ui.git`，仓库公开，HTTP 200）。provenance 在公开仓库+公开包+GitHub 托管 runner 下自动生成，无需 `--provenance`。另在 Verify 步骤后加 `npx publint` 与 `attw --profile esm-only`（忽略 `.css/.md` 导出误报，用 `--ignore-rules` 或只检查 JS 子路径）。
- **验收**：发布后 `curl .../attestations/@qingye_lab%2fui@<新版本>` 为 200；npm 页面出现 Provenance 标记；CI 里 publint 为 0 问题。
- **风险**：npm 文档写明：新配置须在 2 天内完成首次成功发布否则过期；已有配置不能编辑只能删了重建；一个包最多 10 个发布者。自托管 runner 不支持。tooling 若也要发，另配一份。
- **相关观察**：changesets（`@changesets/cli` 3.0.3，2026-09-14）对「一个主包 + 一个工具包 + 标签驱动」收益小，不建议引入；改用 GitHub Release 的 `--generate-notes` 加一份发布说明模板（视觉基线变化单列，已是 CLAUDE.md 的规则）。

### 3.3 axe-core 进浏览器审计（#3）
- **改哪里**：新增 `scripts/audit-a11y.mjs`，复用 `browser-runtime.mjs` 的 `withBrowser` 与 `audit.mjs` 同一份 slug 清单，对每个 playground 页注入 `axe-core`（4.14.0，2026-10-05）按浅/深两个主题各跑一次；状态沿用 `PASS/FAIL/UNVERIFIED/NOT_RUN`，`incomplete` 归 `UNVERIFIED`。规则标签要包含 2.2 AA（axe 的 `wcag22aa` 标签，**UNVERIFIED，本轮未核对该标签名**）。接入 `ci.yml` 的 Browser audit 之后。
- **验收**：首次跑完先把现有违规逐条分类（真缺陷/误报/需人工），误报用规则级 `disableRules` 加理由，不批量豁免。
- **风险**：Storybook 官方页自称 axe 最多自动发现约 57% 的 WCAG 问题（引 Deque 研究，`https://storybook.js.org/docs/writing-tests/accessibility-testing`），所以这是补充而不是替代；jsdom 里的对比度规则不可用，必须在真实浏览器里跑。

### 3.4 包卫生（#4）
- `styles.css:5,9` 改包名（手写文件，直接改；`gen-catalog` 不生成它）。
- `package.json` 的 `"."`、`"./components/*"`、`"./locale"` 等 `import` 条件旁加 `default`（或把 `import` 换成 `default`）；`ERR_PACKAGE_PATH_NOT_EXPORTED` 的现象已实测，`require(esm)` 在 Node ≥22.12 默认可用这一点来自 Node 发布说明，**本轮未实测**，改完用 `node -e "require('@qingye_lab/ui/components/button')"` 验。
- `gen-catalog.mjs` 只把当前版本的 `ai/v<当前>` 放进包的 `files`，历史版本留在官网 `public/ai/`（官网已有）。
- `tsconfig.json` 加 `"declarationMap": true`，因为包里本来就带 `src/`，go-to-definition 就能落到 TS 源。
- **验收**：重新 `pnpm pack`，`tar -tzf` 看体积与文件，再跑 `verify-packed-consumers`。

### 3.5 API 表由类型解析（#5）
- **改哪里**：`scripts/gen-catalog.mjs` 已经用 TS AST 抽 `actualExports`（含 `propsType` 与 `signature`），在同一个 Program 里用 `checker` 展开 props 的属性名、类型文本、是否可选、JSDoc 注释，生成 `api[].props`；手写 `meta.ts` 里的 `api` 降为「只写中文说明与英文说明，按属性名合并」。同时给每个组件推出 `providers`（是否读取 `useUILocale`、`useTheme`、Tooltip/Toast Provider 上下文），把 90 个 UNVERIFIED 清零。
- **验收**：`apiStatus` 变为 `type-resolved`；`gen:catalog` 之后官网属性表与源码零漂移；故意改一个 prop 类型，测试应在 `public-guidance.test.ts` 一类的现有门禁里失败。
- **风险**：联合类型、`Base UI` 的 `Primitive.Props<State>` 展开后会很长，要做可读性截断；说明文字仍需人写。

### 3.6 AI 入口补齐（#6）
- **改哪里**：`gen-catalog.mjs` 把 `ai/v2.0.0/components/*.md` 拼成 `llms-full.txt`（Ant 与 Mantine 都有，Mantine 的约 4.6MB；本库 catalog.json 是 1.7MB，拼接后体量相当）；官网 `public/_headers`（Cloudflare Pages）对 `/components/*` 增加 `Link: </ai/v2.0.0/components/$1.md>; rel="alternate"; type="text/markdown"`——**能否按路径带捕获组 UNVERIFIED**，不行就改成构建期为每个组件生成一个静态 `/components/<slug>.md`；每个组件页加一个「复制为 Markdown」按钮（shadcn 的 `Copy Page` 同类）。
- **验收**：`curl -sI https://ui.xflux.cc/components/button` 出现 `Link`；`curl .../components/button.md` 返回 Markdown。
- **与「反对说明书式 UI」的关系**：只加一个动作按钮，不加文字。

### 3.7 框架消费矩阵（#7）
- **改哪里**：`scripts/verify-packed-consumers.mjs` 现有 `style × feature` 四种 Vite 消费者，增加：①Next 16（`next@16.4.0`）App Router，一个服务端页面里 import `Button`、`Card`、`Stat`，一个客户端页面里挂 `ThemeProvider`+`themeScript()`；②React Router 8（`react-router@8.4.0`）框架模式；③在 Vite 消费者上用 `typescript@7.0.2` 跑 `tsc --noEmit`（TS 7 已发布，库仍在 5.9.3，d.ts 兼容性 **UNVERIFIED**）。安装页补一节「框架」：根布局里 `<html suppressHydrationWarning>`、`themeScript` 放在 `<head>` 且带 nonce、`'use client'` 已内置（实测 91/91 组件文件首行带 `"use client"`，所以服务端组件里直接 import 即可，无需再包一层）。
- **验收**：三种消费者 build + 首屏不闪 + 无 hydration 警告；CSP 严格头下主题仍生效。
- **风险**：Next 的 Turbopack 对 `exports` 的 `import`-only 条件的行为需要在 D6 修复后再测。`button-group.tsx`、`corner-mark.tsx` 没有 hooks 却带 `"use client"`，可去掉（纯收益很小，随手做）。

### 3.8 `prefers-contrast: more`（#8）
- **事实**：`prefers-contrast` Baseline high 2024-11-30；全库 0 处。`semantic.css` 里的 `--qy-ink-jiao/nong/zhong/dan/qing`（88/66/50/24/8%）是全部线、面、字灰度的唯一自由量。
- **改哪里**：`semantic.css` 末尾加 `@media (prefers-contrast: more) { :root, .light, .dark, [data-theme] { --qy-ink-qing: …; --qy-ink-dan: …; --qy-ink-zhong: …; } }`，把「清」「淡」「重」各上移一档，**不改线宽、不加形状**（NG9）。取值不凭感觉：用现有 `contrast-check.ts` 的合成方法，容器线、控件边界、凹槽分别达到 3:1，浅深各测。
- **验收**：Chrome 的 `Emulate CSS prefers-contrast: more`（DevTools 渲染面板）下跑 `verify-ui-foundations` 的对比度部分；`foundation-tokens.test.ts` 加一条「偏好开启时所有对比底线仍满足」的计算值断言（基于 contrast-check，不是类名断言）。
- **风险**：是否要做成第四个**轴**（Primer 有 `light-high-contrast`/`dark-high-contrast`；Carbon 是 4 个主题）属于库主裁决；本建议只用媒体查询，不新增轴，不违反「三轴」规则。

### 3.9 React Compiler 兼容性（#9）
- **事实**：编译器 1.0.0 稳定于 2025-10-07；React 官方「编译库」页建议库作者**发布编译后的产物**，仅支持 React 19 的库无需 `react-compiler-runtime`；官方也说已有 `useMemo/useCallback` 保留或谨慎删除，它们是逃生口；`eslint-plugin-react-hooks` 7.1.1（2026-04-17）自带编译器规则。仓库没有 ESLint。
- **改哪里**：根目录最小 `eslint.config.js` 仅启用 `react-hooks` 的 `recommended-latest`，范围限 `packages/ui/src`，CI 里跑；README 加一句「与 React Compiler 兼容」的声明**只有在 lint 零违规后**才写。
- **不做**：不把编译器接进 `tsc` 构建发布编译产物——构建链是 `tsc` 而非 Babel，要改成两段；热点性能在 Base UI 内部；输出随编译器版本变化（React 建议钉死精确版本）。收益小于代价。
- **验收**：lint 零违规，或违规都有注释说明。

### 3.10 Vitest 5 与 Browser Mode 试点（#10）
- **事实**：Vitest 5.0.3（2026-09-30）要求 Vite ≥6.4.0、Node ≥22.12.0（官网 Vite 7.3.0，满足）；破坏性行为：`clearMocks` 默认 true、未 await 的 `resolves/rejects` 断言现在失败、Browser Mode 定位器默认严格；5.0 发布页**没有**说 Browser Mode「稳定」，也没提 `toMatchScreenshot`（上一轮写的「Vitest 4 里已稳定」本轮未重新取到来源，标 UNVERIFIED）。
- **改哪里**：先升到 5.x 跑通 106 个现有测试文件，再按 `2026-10-12-component-optimization.md` 第四节试点：`@vitest/browser-playwright`（5.0.3）+ 一个 `*.browser.test.tsx` 项目，只断言新增几何的 computed 值（读数轨道、轨道选中态）。
- **不做**：Playwright 组件测试——官方页写明旧的 `@playwright/experimental-ct-*` 包已移除，改为 `@playwright/test` 内置的 `mount()` 夹具并称「稳定」（`https://playwright.dev/docs/test-components`），但它要求自己维护一个 gallery 页，而本库的 playground 已经是这个东西；Storybook 10.6.1 的 a11y/Vitest/MCP 插件也不引入，因为会和官网 demo 重复一套。
- **风险**：升级与 Browser Mode 分两次提交，便于归因。

### 3.11 布局族 `@container`（#11）
- **事实**：容器查询（尺寸）Baseline high 2025-08-14；Tailwind 4 内置 `@container` 与 `@md:` 等变体（本轮未单独取该页，**UNVERIFIED**）；全库 0 处，控件用 `sm:` 视口断点是对的（它表达「窄屏升一等」的触控关系，不是版心关系）。
- **改哪里**：只改版心由容器决定的组件：`layout.tsx` 的网格、`page-header.tsx` 的动作区换行、`description-list.tsx` 列数、`stat.tsx` 并排、`filter-bar.tsx`、`toolbar.tsx` 溢出。先用 `audit.mjs` 在 320/480/720px 宽的容器里放这些组件，**有溢出再改**，不预先全量改写。
- **验收**：`audit.mjs` 子元素溢出为 0；浅深各一张整页截图人工对比。
- **风险**：`family-layout.md:146` 已写过「RTL 与容器查询验证成本最高」，需同时验 RTL（见 3.1）。

### 3.12 `light-dark()`（#12）
- **事实**：`color-scheme` high 2024-08-03；`light-dark()` low 2024-05-13（Chrome 123 / Firefox 120 / Safari 17.5），按 30 个月规则 2026-11-13 进广泛可用（推算，`web-features` 对 `color-mix` 的 low→high 间隔即为 30 个月）。
- **改哪里**：`semantic.css` 里明暗只在 `--qy-ink`、`--qy-paper`（深色由背景推出）、遮罩/阴影、状态色、数据系列色上不同，用 `light-dark(a, b)` 写成一份；`:root { color-scheme: light dark }`，`.light`/`.dark`/`[data-theme]` 仅写 `color-scheme`。因为未注册的自定义属性保存的是记号流，`light-dark()` 在使用处按该元素的 `color-scheme` 求值，局部深色区域天然成立（现在靠把整块墨阶规则重复写在 `.light, .dark, [data-theme]` 上实现）。
- **前提**：`contrast-check.ts`、`color-check.ts`、`token-ledger` 的解析要支持 `light-dark()`，否则这些值会被记 UNVERIFIED（`semantic.css` 里已有同类先例：为让检查器能解析，色彩混合特意用 `in srgb`）。
- **行为变化**：缺省不再是「永远浅色」，而是跟随系统。这是视觉基线变化，需在发布说明单列，并给 `ThemeProvider` 加一个 `defaultTheme="light"` 的明确出口（已有）。
- **验收**：禁用 JS 的 Chrome 里，系统深色时首帧即深；`theme-axes.test.tsx` 与 `verify-ui-foundations` 浅/深对比度全量通过。

---

## 4. 上一轮被拒的四项：独立重评

### 4.1 MCP 服务 —— 结论：**不单独做**；把条件写清楚，满足条件再做一个 `mcp` 子命令
**新证据（本轮取到）**
- shadcn：`npx shadcn@latest mcp`，列出/搜索/安装注册表项，支持命名空间和私有注册表（`https://ui.shadcn.com/docs/mcp`；页面未列工具名）。
- MUI：`@mui/mcp`（npm 0.1.7，2026-10-06），文档页列 2 个工具 `useMuiDocs`、`fetchDocs`，页面未说稳定性（`https://mui.com/material-ui/getting-started/mcp/`）。
- Mantine：`@mantine/mcp-server`（搜索/读取文档，默认数据源 `https://mantine.dev/mcp`），另有 `llms.txt`、`llms-full.txt`（约 4.6MB）和技能仓库 `mantinedev/skills`（`https://mantine.dev/guides/llms/`）。
- HeroUI：6 个工具（`list_components`、`get_component_docs`、`get_component_source_code`、`get_component_source_styles`、`get_theme_variables`、`get_docs`），仅支持 v3，stdio，Node ≥22（`https://www.heroui.com/docs/react/getting-started/mcp-server`）。
- Chakra：npm 上有 `@chakra-ui/react-mcp` 2.1.1，最后发布 2025-11-03；页面本轮**未取到**。
- Ant：导航里有 MCP 与 CLI，页面无描述；另有 `llms.txt`、`llms-full.txt`、`design.md`、`llms-semantic.md`、每个组件加 `.md` 的单页（`https://ant.design/docs/react/llms`）。
- Storybook：`@storybook/addon-mcp`，官方页写明 AI 能力处于预览，工具 9 个，另有 `test-run`（`https://storybook.js.org/docs/ai/mcp/overview`）。
- Base UI：`llms.txt` 有，页面未提 MCP。
- 浏览器侧的 WebMCP 是另一回事：2026-10-09 的社区组草案，`document.modelContext.registerTool`，不在 W3C 标准轨道（`https://webmachinelearning.github.io/webmcp/`）；`web-features` 里 `declarative-webmcp`（表单上的 `toolname` 等属性）所有浏览器均无支持。

**判断**
- 各家工具面实质只有四类：列表、读文档、读源码/样式/主题变量、搜索，与上一轮判断一致，且多数是 0.x/预览。上一轮没写的是：它们**都是在线文档的薄包装**，而本库已有更强的本地版本——`@qingye/tooling` 的 `qingye-ui docs/info/check/theme`，读的是项目里**实际安装版本**的 `catalog.json`，这正是 design.md「以安装版为准」的要求。
- 真正的缺口不是 MCP，而是 D9：这套工具没有发布。所以顺序应是：先把 tooling 迁到 `@qingye_lab/tooling` 并发布，再视需要加 `qingye-ui mcp`（stdio，只读，四个工具各对应现有子命令）。在那之前做 MCP 是在一个装不到的包上加薄层。
- 触发条件：tooling 已在 npm；且出现至少一个消费项目的 AI 工作流因为「不能结构化查询 catalog」而出错的记录。

### 4.2 DTCG token JSON —— 结论：**不作为事实源，不做；观察「解析值的单向导出」**
**新证据**
- 格式模块 2025.10 为 Community Group Final Report（2025-10-28），页面自称「considered stable」，**不是 W3C 标准**（`https://www.designtokens.org/tr/2025.10/format/`）。颜色用 `colorSpace`+`components`（+`alpha`、`hex`），没有任何「按比例混合」的表达；引用只能指向整颗 token 或 JSON Pointer；主题/模式在已读部分没有出现（另有独立的 resolver 模块，本轮**未读**，UNVERIFIED）。
- 生态：Primer 的 token 源是 JSON5，用 Style Dictionary 编译，DTCG 仅用于 `$extensions` 元数据，**没有**发布 DTCG 产物（`https://github.com/primer/primitives` README，`@primer/primitives` 11.10.0）；Style Dictionary 5.6.1（2026-10-10）仍在迭代；Google Labs 的 `design.md` 格式（YAML 前置令牌+Markdown 正文，alpha）带 `lint`（含 WCAG 对比度）和 `export`（Tailwind v3 JSON、Tailwind v4 CSS、DTCG），Ant Design 已按该格式发布 `design.md`（`https://github.com/google-labs-code/design.md`）。

**判断**：上一轮「只在接 Figma 时才有用」的理由偏弱；真正的阻碍是**表达力**。本库的 token 的价值在关系（`color-mix(ink 66%, paper)`、`calc(var(--qy-fen) …)`）；DTCG 能存的只有解析后的值，导出等于把「哪条关系决定了它」丢掉，与 CLAUDE.md 的核心要求相反。若将来要进 Figma Variables，做成「由 `token-ledger` 的浏览器实测值单向导出、带 `$extensions.qingye.relation` 指回台账条目」的产物，并明确标注不可回写。当前无消费者，**不做**。

### 4.3 锚点定位 —— 结论：**不采纳（替换浮层定位）**；事实更新，并给出重新评估的触发点
**新证据（`web-features` 3.42.0 + webstatus.dev）**
- 核心子特征 `api.CSSPositionTryDescriptors` 等：Baseline low **2026-01-13**，Chrome 125 / Edge 125 / Firefox 147 / Safari 26。这与上一轮「2026-01 进 Baseline」一致。
- 但整体特征 `anchor-positioning` 在 webstatus 上仍是 **limited**：`position-visibility` 的 `anchors-valid`/`anchors-visible` 只有 Safari 27；`anchor-positioning-transforms` 只有 Chrome 144 与 Safari 27；`anchor-positioning-animations` Firefox 没有。也就是说「能用的核心」和「完整特性集」要分开说。
- Base UI 1.7→1.9 的发布说明里没有任何原生锚点或位置策略变更（`https://base-ui.com/react/overview/releases`；它仍通过自己的定位器提供碰撞与箭头）。

**判断**：替换需要重做翻转、位移、箭头、可用高度（`--available-height`）等，且这是 Base UI 内部的事，换掉等于分叉；用户可见收益为零。本库自己的 CSS 也没有需要锚点的东西。**观察**，触发点：Base UI 宣布提供原生锚点选项。

### 4.4 AI 对话组件 —— 结论：**不采纳**（与上一轮一致，但本轮没有取到能推翻它的新来源）
- 本轮没有逐家取聊天组件文档，所以不假装有新证据。能引用的只有：Base UI 1.7–1.9 的发布说明里没有任何对话/流式原语；shadcn 的 Dialog 页侧栏已分出多个包（`@shadcn/react`、`@shadcn/helpers`）但页面本身没有对话组件（`https://ui.shadcn.com/docs/components/radix/dialog`，只能说明结构，不说明 AI 组件有无）。
- 依据仍是任务：本库的使用方是工作台，没有「消息流/推理/引用」任务；且 CLAUDE.md 记忆里的裁决「一个组件一件事」「没有任务依据不加组件」。
- 有一件与对话相关但不是组件的事值得保留为观察项：流式文本的读屏播报，见第 5 节 `ariaNotify`。

---

## 5. 完整表

列：**项 / 事实与来源 / 支持状态与日期 / 本库现状（文件:行） / 差距 / 代价 / 建议 / 理由**。
来源缩写：WF = web-features 3.42.0 `data.json`；WS = webstatus.dev API；NPM = registry.npmjs.org；URL 见第 7 节。支持列写「Chrome / Firefox / Safari」最低版本。

### 5.1 CSS 平台能力

| 项 | 事实与来源 | 支持状态与日期 | 本库现状 | 差距 | 代价 | 建议 | 理由 |
|---|---|---|---|---|---|---|---|
| `@layer` 分层与消费方覆盖 | WF `cascade-layers` | high 2024-09-14；Chrome 99 / Firefox 97 / Safari 15.4 | 5 处 `@layer base`（`styles.css`、`theme.css`、`tokens/*.css`）；`motion.css`、`utilities.css` 的规则**未分层**（`motion.css:13` 明说「刻意不分层以胜过工具类」）；tooling 生成的主题 CSS 也不分层（`packages/tooling/README.md`）；`dist/ui.css` 各层各出现一次 | 消费方的 Tailwind 工具类（在 `utilities` 层）无法覆盖弹层的过渡、`qy-pressable` 的缩放；消费方的非分层 CSS 可以覆盖 | 小 | 观察，文档化 | 这是设计选择而非缺陷；缺的是文档里一句「覆盖途径：改 token，或在库样式之后写非分层 CSS，不要指望工具类」 |
| `@property` | WF `registered-custom-properties` | low 2024-07-09 | 0 处自有注册；Tailwind 产物里有 39 处（`--tw-*`） | 无 | — | 不采纳 | 本库 token 靠 `color-mix` 在使用处求值，类型化注册只在要动画化 token 本身时才有用，没有这个任务 |
| `color-mix()` | WF `color-mix` | high 2025-11-09 | src 5 + css 31 处；全部 `in srgb`（`semantic.css` 注释：为让检查器能解析） | 感知均匀性不如 `oklab`；受检查器限制 | 中（需先扩检查器） | 观察 | 改插值空间会改变全部派生色，属视觉基线变化，且要先让 `contrast-check.ts` 解析 `oklab`；无用户可见痛点 |
| 相对颜色语法 | WF `relative-color` | low 2024-09-16；Chrome 125 / Firefox 128 / Safari 18 | 0 处 | 无 | — | 不采纳 | `color-mix(…, transparent)` 已覆盖「改透明度」需求 |
| `light-dark()` / `color-scheme` | WF `light-dark`、`color-scheme` | `light-dark` low 2024-05-13（Chrome 123 / Firefox 120 / Safari 17.5）；`color-scheme` high 2024-08-03 | `light-dark` 0；`color-scheme` 由 ThemeProvider 内联写入 `<html style>`（`theme-provider.tsx` `apply()`）并在 `semantic.css` 各主题根声明 | 无 JS/脚本被拦时永远浅色；明暗两整块重复 | 中 | **采纳（#12）** | 见 3.12 |
| OKLCH 与广色域 | WF `oklab`、`color-function`、`color-gamut` | oklab/oklch high 2025-11-09；`color()` high 2023-05-09；`color-gamut` high 2025-08-14 | 原色板 39 处 `oklch()`；数据系列色用十六进制（`primitives.css`，经校验器验证） | 无 | — | 不采纳广色域 | 「墨」色板与沉色颜料无需 P3；而系列色是按 sRGB 校验过 ΔE 的，换色域要重验 |
| `contrast-color()` | WF `contrast-color` | low 2026-04-10；Chrome 147 / Firefox 146 / Safari 26 | 0；品牌方需同时写 `--qy-primary` 与 `--qy-primary-foreground` | 品牌方漏写前景色 | 小 | 观察 | 它只在黑白之间选更高对比，不保证达到 4.5:1，而本库把 4.5:1 作为硬要求；不能替代检查 |
| `@starting-style` / `transition-behavior: allow-discrete` | WF `starting-style`、`transition-behavior` | 均 low 2024-08-06；Chrome 117 / Firefox 129 / Safari 17.4–17.5 | CSS 里 0 处；`data-starting-style` 16 处（由 Base UI 在挂载时写属性） | 无 | — | 不采纳 | 入场由 Base UI 的属性驱动，已被 `motion.css` 统一接管，换成原生是纯重构 |
| `interpolate-size` / `calc-size()` | WF | 均 —；仅 Chrome/Edge 129 | 0 处；展开面板只做淡入淡出（`motion.css` 的 accordion/collapsible） | 无 | — | 不采纳 | 其他引擎不支持；且「展开面板不做高度动画」是 motion.css 里写明的取舍 |
| 锚点定位 | 见 4.3 | 核心 low 2026-01-13；整体 —（Safari 27 才有 anchors-valid/visible） | 0 处；Base UI 定位 | — | 大 | 观察 | 见 4.3 |
| 容器查询与容器单位 | WF `container-queries`、`container-name-queries`、`container-style-queries` | 尺寸 high 2025-08-14；名称 low 2026-05-07；样式 low 2026-05-19（Firefox 151） | 0 处 | 版心由容器定的组件仍看视口 | 小·中 | **采纳（#11）** | 见 3.11；样式查询不需要 |
| `:has()` | WF `has` | high 2026-06-19 | 44 处，主要用于 `Item` 悬停显隐 | 无 | — | 无需动作 | 已广泛可用，现用法正当 |
| `@scope` | WF `scope` | low 2026-03-24；Chrome 143 / Firefox 146 / Safari 26.4 | 0 处 | 无 | — | 不采纳 | 全部选择器已经靠 `data-slot` 命名空间隔离，`@scope` 无增益 |
| 逻辑属性与 RTL | WF `logical-properties`、`dir-pseudo` | high 2024-03-20；`:dir()` high 2026-06-07 | 逻辑类 29 处、物理类 8 处（`toast.tsx:109-114` 与 `drawer.tsx:31` 的 `left/right` 是按名称的物理位置，属有意）；`rtl:` 6 处；无方向传递（D2） | 见 D2/D3 | 小·中 | **采纳（#1）** | 见 3.1 |
| `text-wrap: balance / pretty` | WF `text-wrap-balance`、`text-wrap-pretty` | balance low 2024-05-13；pretty —（Chrome 117 / Safari 26，Firefox 无） | 0 处；STANDARDS §7 写「按任务选择」 | 标题档、空状态标题没有用 | 小 | 采纳（小） | 不支持时自然回落到普通换行，对 CJK 同样有效；只加在标题类，不改正文 |
| `field-sizing` | WF `field-sizing` | low 2026-06-16；Chrome 123 / Firefox 152 / Safari 26.2 | 2 处（`textarea.tsx:62`、`date-range-picker.tsx:31`） | 见 D12 | 小 | 观察，补回落检查 | Textarea 回落为固定行数可接受；DateRangePicker 的宽度回落要看 |
| `scrollbar-gutter` / `scrollbar-color` / `scrollbar-width` | WF | gutter、width low 2024-12-11；color low 2025-12-12（Safari 26.2） | 0 处；ScrollArea 用 Base UI 自绘 | 原生滚动容器（Table、CodeBlock）滚动条与主题不一致 | 小 | 观察 | 设了 `color-scheme` 后原生滚动条已随明暗；色相不统一是外观问题，无任务依据 |
| `prefers-reduced-motion` | WF | high 2022-07-15 | `motion.css` §4 统一接管：去位移与缩放，保留透明度/颜色；另有键盘模态 `MotionProvider` | 无 | — | 无需动作 | 策略完整 |
| `prefers-contrast` | WF `prefers-contrast` | high 2024-11-30 | 0 处 | 墨阶可整体上移 | 小 | **采纳（#8）** | 见 3.8 |
| `prefers-reduced-transparency` | WF | —；仅 Chrome 118/119 | 0 处；本库无毛玻璃，仅线与染用透明叠合 | 无 | — | 不采纳 | 透明叠合是语义表达（「叠在任何纸上读出同一级墨」），不是装饰半透明 |
| `forced-colors` | WF `forced-colors` | high 2025-03-12 | `styles.css` 一处恢复 `outline`（与 `STANDARDS §5` 相符） | 其余策略由另一子代理取证 | — | 见他处 | 策略层：本库「填充已划出范围就不描边」的规则与强制颜色会抹掉背景色冲突，已在上一轮列为取证项 |
| `dvh` / `svh` / `lvh` | WF `viewport-unit-variants` | high 2025-06-05 | 1 处用 `vh/vw`：`toast.tsx:130` | 移动端地址栏伸缩时 Toast 最大高度不准 | 小 | 采纳（顺手） | 一行改动 |
| `accent-color` | WF `accent-color` | —；Safari 26.2 才有 | 0 处 | 无 | — | 不采纳 | 本库自绘复选/单选，原生控件仅 NativeSelect 与原生日期输入 |
| `@media (hover)` / `(pointer)` 一致性 | grep | 特征 id 未在 WF 查到，**UNVERIFIED** | `pointer-coarse:` 23 处、`[@media(hover:hover)]` 在 `item.tsx:38-48`、`utilities.css:20` 用 `@media (pointer: coarse)` | 用法一致：触屏放大靠 pointer，悬停显隐靠 hover | — | 无需动作 | Tailwind 4 的 `hover:` 变体默认是否只在支持悬停的设备生效：**UNVERIFIED**（本轮未取该页），不要写进文档 |
| 打印样式 | grep | — | 0 处 `@media print` | 无 | — | 不采纳 | 工作台，无打印任务 |
| View Transitions | WF `view-transitions`；react.dev 19.3 | low 2025-10-14；Chrome 111 / Firefox 144 / Safari 18；React `<ViewTransition>` 在 19.3（2026-09-09）稳定 | 0 处 | 无 | — | 不采纳（组件）/ 观察（官网路由） | 违反 NG6「用装饰性动效交代状态」；官网路由切换可用但与任务无关 |
| 滚动驱动动画 | WF | —；Chrome 115 / Safari 26 | 0 处 | 无 | — | 不采纳 | 同上 |
| `popover` 属性、Invoker Commands、`dialog closedby` | WF | popover low 2025-01-27；`command`/`commandfor` low 2025-12-12；`closedby` — | 0 处；弹层全由 Base UI | 无 | — | 不采纳 | 与 4.3 同理：换原生等于换掉 Base UI 的行为层 |
| `corner-shape` | WF | —；仅 Chrome 139 | 0 处 | 无 | — | 不采纳 | 与「绘事后素」相反，且半数引擎无 |
| `sibling-index()` | WF `sibling-count` | low 2026-08-18；Chrome 138 / Firefox 154 / Safari 26.2 | `motion.css` 的 stagger 靠调用方设 `--qy-index` | 可去掉手写索引 | 小 | 观察 | 刚进 Baseline，且 stagger 本身受限使用 |
| 自定义 `<select>`（`appearance: base-select`） | WF `customizable-select` | —；Chrome 135 / Safari 27 | NativeSelect 用原生外观 | 无 | — | 观察 | 缺 Firefox |

### 5.2 React 19 与框架适配

| 项 | 事实与来源 | 支持状态与日期 | 本库现状 | 差距 | 代价 | 建议 | 理由 |
|---|---|---|---|---|---|---|---|
| `ref` 作为 prop | react.dev 19 | 稳定 | `forwardRef` 0 处；组件把 `ref` 放进 props（如 `calendar.tsx:13`） | 无 | — | 无需动作 | 已完成 |
| `"use client"` 与 RSC | react.dev 19.3：服务端组件可直接渲染来自 `'use client'` 模块的 Context（2026-09-09） | 稳定 | 91/91 组件文件与 `dist` 产物首行均为 `"use client"`；`index.ts` 是 `export *` 桶文件；`button-group.tsx`、`corner-mark.tsx` 无 hooks 却带指令 | 没有 Next 消费者验证；桶文件在服务端 import 的体积影响未测 | 中 | **采纳（#7）** | 见 3.7 |
| `useId` | react.dev 19.2：默认前缀改为 `_r_`，可用于 `view-transition-name` | 稳定 | 15 处 | 无 | — | 无需动作 | |
| `useOptimistic` / `useActionState` / form actions | react.dev | 稳定 | 0 处；状态归调用方（CLAUDE.md） | 无 API 缺口 | 小 | 观察（文档配方） | 「状态归应用」是设计，库不需要内建；但 `Form`/`Field` 的错误恢复配方可在官网写一份真实示例 |
| `<Activity>` | react.dev 19.2；19.3 仅修 bug 与 RSC 支持 | 稳定 | 0 处 | 隐藏时卸载 effect：本库在 effect 里订阅 `matchMedia`、`ResizeObserver`、`storage` 的组件是否清理正确未测 | 小 | 观察，加一条测试 | 在 `<Activity mode="hidden">` 里挂 Dialog/Tooltip/ThemeProvider 子树，验证无泄漏与恢复可交互（UNVERIFIED） |
| `useEffectEvent` | react.dev 19.2 | 稳定 | 0 处 | 无 | — | 观察 | 随 lint（#9）发现需要的位置再用 |
| React Compiler | react.dev 编译器 1.0（2025-10-07）、编译库页 | 稳定 | 42 处 `useMemo/useCallback` 分布在 24 个文件；无 ESLint | 兼容性无人检查 | 小·中 | **采纳（#9，仅 lint）** | 见 3.9；不发编译产物 |
| StrictMode / 并发安全 | react.dev 19.3：StrictMode 下水合时 effect 双调用 | 稳定 | `floating-layer.tsx` 有模块级可变计数 `activationSerial`（注释称 SSR 渲染保持确定） | 并发下模块级计数是否稳定未测 | 小 | 观察 | 现有测试未覆盖 StrictMode 双调用；可加一条 |
| SSR/水合 | react.dev 19.3 `browser()`、Trusted Types | 稳定 | `ThemeProvider` 首渲染与服务端同选择，再用 effect 读存储（`theme-provider.tsx`）；`themeScript()` 写类；0 处 `suppressHydrationWarning`；`useSyncExternalStore` 2 处 | 官网/安装页未告诉 SSR 项目要在 `<html>` 上加 `suppressHydrationWarning`；Trusted Types 站点上 `dangerouslySetInnerHTML` 的 `themeScript` 需要 TrustedHTML（19.3 起 React 透传，未实测） | 小 | **采纳（#7）** | 文档项 |
| 接入文档：Next App Router / React Router 7+ / TanStack Start | NPM：`next` 16.4.0（2026-10-06）、`react-router` 8.4.0（2026-09-15）、`@tanstack/react-start` 1.168.61（2026-10-10） | — | `installation.tsx` 无任何框架小节（grep 零结果）；消费者验证只有 Vite（`scripts/verify-packed-consumers.mjs` 4 个 Vite 用例） | 无 SSR/RSC 验证，无框架文档 | 中 | **采纳（#7）** | |
| 依赖版本滞后 | NPM | — | React 19.2.1（latest 19.3.0）、Base UI 1.7.0（latest 1.9.0，上一轮已列）、`@daypicker/react` 10.0.1（10.0.2）、`@tanstack/react-table` peer `^8.21.3`（latest 9.2.8）、TypeScript 5.9.3（latest 7.0.2） | `react-table` v9 已发布，peer 范围把 v9 用户挡在外面；是否有破坏性 **UNVERIFIED** | 小 | 观察 | 不盲目放宽 peer；先在消费者矩阵里加 v9 与 TS 7 用例（#7）再定 |

### 5.3 分发与工程

| 项 | 事实与来源 | 支持状态与日期 | 本库现状 | 差距 | 代价 | 建议 | 理由 |
|---|---|---|---|---|---|---|---|
| 仅 ESM 与 `exports` | attw 实测 | — | `exports` 只有 `types`+`import`（`package.json`）；`type: module` | D6：`require` 不可用；`node10` 解析下子路径失败 | 小 | **采纳（#4）** | 加 `default` 条件 |
| 每组件入口与 tree-shaking | 实测 `dist` | — | `dist/components/*.js` 90 个 + `.d.ts`；`sideEffects` 只列 CSS，JS 无副作用，准确 | 桶文件 `index.js` 靠打包器摇树 | — | 无需动作 | 用法 `@qingye_lab/ui/components/<name>` 已是推荐路径 |
| 类型声明质量 | `tsconfig.json` | — | `strict`+`noUncheckedIndexedAccess`+`exactOptionalPropertyTypes`；无 `declarationMap`；`skipLibCheck: true` | go-to-definition 落在 `.d.ts` 而不是随包的 `src` | 小 | **采纳（#4）** | |
| 包体积与依赖划分 | NPM、实测 | tarball 1.04MB，解包 5.49MB，727 个文件；`ui.css` 144KB / gzip 22.7KB | 直接依赖：`@base-ui/react`、`@daypicker/react`、`@tabler/icons-react`、`cva`、`clsx`、`tailwind-merge`；可选 peer：`recharts`、`@tanstack/react-table` | 重依赖划分合理；D5（历史 `ai/`）与 `catalog.json` 1.7MB、`src` 724KB 是体积大头 | 小 | **采纳（#4）** | `catalog.json` 是机器接口，保留；`src` 为 `@source` 扫描所需，保留 |
| CSS 交付 | Tailwind 文档（`@source`、`source(none)`、`@source inline`、node_modules 需显式 `@source`） | — | 两条路径：`styles.css`（`@source "./src"` + `@custom-variant dark`）与预编译 `dist/ui.css`；`build.mjs` 用 `source(none)` 加 `@source inline` 把整条文字档阶梯写进产物 | 与 Tailwind 官方对库的建议一致；D1 注释错 | 小 | 无需动作（修注释） | 预编译产物含 Tailwind preflight，宿主已有重置时会叠加，文档已要求「只导入一个」 |
| shadcn 式注册表 | `https://ui.shadcn.com/docs/registry`、`shadcn` 4.21.4 | — | `registry/registry.json` 3 项（provider、theme、editor），均为区块，依赖 npm 包本体 | 组件本体不走源码复制 | — | 不扩展 | 源码复制会让版本事实在项目里漂移，与「以安装版为准」相悖；现有三项已够 |
| provenance / trusted publishing | npm docs | OIDC：GitHub Actions、GitLab、CircleCI | D4 | 见 3.2 | 小 | **采纳（#2）** | |
| changesets 与发布说明 | NPM `@changesets/cli` 3.0.3 | — | 标签驱动 + `gh release create --generate-notes`；`docs/decisions` | 无变更日志文件 | 小 | 不采纳 changesets；采纳发布说明模板 | 两个包的仓库，changesets 是多余流程 |
| semver 与弃用 | CLAUDE.md 允许破坏性变更；2.0.0 在 1.0.0 后两天发布（NPM time） | — | tooling README：台账里「token 弃用」为 N/A，因为注册表没有权威弃用记录 | 缺弃用机制 | 小 | 观察 | 公开 npm 后，删除公开 API 前至少一个 minor 的 `@deprecated`；目前无需求 |
| 可视化回归 | Playwright 1.64.0；仓库 `playwright-core` 1.63.0 | — | `shot*.mjs`、`audit.mjs`、`align-audit.mjs`；无基线库，`CLAUDE.md`：截图只发现变化 | 无自动基线 | 中 | 观察 | 与「不为通过而批量更新截图」的规则一致；不引入自动基线 |
| 浏览器内测试 | Vitest 5.0.3；Playwright 内置 `mount()` | — | jsdom，`css: false`（`vitest.config.ts`） | 看不到 computed 值 | 中 | **采纳（#10）** | |
| Storybook 9/10 | `storybook` 10.6.1；a11y 插件默认 WCAG 2.0/2.1 A/AA+最佳实践 | — | 无 | 官网 demo 已承担 | 大 | 不采纳 | 会复制一套 demo；axe 直接接浏览器审计即可（#3） |
| axe 在 CI 的位置 | `axe-core` 4.14.0 | — | 无（D7） | | 小 | **采纳（#3）** | |
| `publint` / `attw` | 实测 | publint 0.3.25、attw 0.18.5 | 未接入 CI | | 小 | **采纳（#2）** | 对 2.0.0 实测均无真实问题 |

### 5.4 可访问性标准与实践

| 项 | 事实与来源 | 状态/日期 | 本库现状 | 差距 | 代价 | 建议 | 理由 |
|---|---|---|---|---|---|---|---|
| WCAG 2.2 SC 2.4.11 焦点不被遮挡(AA) | Understanding 页：只要求不被**完全**遮住；常见失败是固定页眉页脚；技术 C43 用 `scroll-padding` | W3C Rec | 本库唯一的常驻浮层是 Toast（`toast.tsx:130` `fixed`）；`toc.tsx:21` 有 `scroll-padding-top`；没有粘性页眉 | Toast 是否可能完全盖住焦点元素 **UNVERIFIED** | 小 | 观察，加审计项 | 在 axe 之外，用键盘遍历页面并让 Toast 弹出，检查焦点元素是否仍有部分可见 |
| 2.4.12/2.4.13（AAA） | 同上 | AAA | 焦点环 2px（`--qy-focus-ring-width`），与 2.4.13 的「至少 2 CSS 像素周长」写法相合，但未声称 | — | — | 不声称 | AAA 不是目标 |
| 2.5.7 拖拽的替代(AA) | Understanding 页：滑块、可排序列表、拖动的轮播要有单指针非拖拽方式；用户代理滚动除外 | AA | Slider 有键盘与点击轨道（Base UI）；Toast 可滑动关闭但有关闭按钮（`closeNotification` 文案）；Drawer 有 `swipe`；`FileUpload` 有「选择文件」按钮（`chooseFiles`）；`locale.tsx` 有 `resize` 文案但 Sidebar 无拖拽调整实现可证 | Drawer 滑动关闭是否有单击出口、Sidebar 是否有拖拽调整 **UNVERIFIED** | 小 | 观察（逐组件对标由另两位子代理做） | 本项仅记录库级结论：没发现违反，也没有系统验证 |
| 2.5.8 目标尺寸(最小)(AA) | Understanding 页：24×24 CSS 像素，有间距/等价/行内/用户代理/必要五项例外 | AA | 控件外高 = 材+n 分，xs = 20+4 = 24px（`components.css` 头注释）；粗指针 44px（`utilities.css` `touch-target`，`--qy-touch-target`） | 无；CLAUDE.md 已写明 44 不是 WCAG 统一最小值 | — | 无需动作 | |
| 3.2.6 一致的帮助、3.3.7 冗余输入 | 属页面/流程级 | A | — | 库无法替应用满足 | — | 不适用 | 可以在官网无障碍页里写一句「由应用负责」 |
| 3.3.8 无障碍认证(最小)(AA) | Understanding 页：不得要求认知功能测试；不阻止粘贴；OTP 要能整体粘贴/被密码管理器填；显示密码有帮助 | AA | `otp-field.tsx:88` `autoComplete="one-time-code"` 与 `:105` `onPaste` 处理；`PasswordInput` 有「显示密码」；`password-input.tsx` 未拦截粘贴 | 无 | — | 无需动作 | |
| WAI-ARIA 1.3 | W3C WD 2026-06-04：`tooltip` 名称禁用；`dialog/alertdialog/form/grid/radiogroup` 不再要求名称；`listbox` 去掉 `aria-expanded`；`combobox` 可调用菜单；新增 ARIANotify 混入；`sectionheader/sectionfooter` | **草案**，规范自称随时可变 | 角色由 Base UI 与本库组件产生；Heatmap 是 `grid` | 与本库「对话框必须有名称」的规则（design 约定）不冲突，规范只是不再强制 | — | 观察 | 草案不进检查规则；`aria-description`、`aria-actions`、`aria-braillelabel` 在该页已读部分**未确认**（UNVERIFIED） |
| APCA / WCAG 3 | WCAG 3 WD 2026-09-10：「不取代 WCAG 2」，「对比度算法尚未确定」 | WD | `contrast-check.ts` 按 WCAG 2 比值 | — | — | **不采纳**并列报告 APCA | 标准自己都没定算法；并列报告会制造两套不一致的门槛 |
| `ariaNotify()` | WF `arianotify` | low 2026-09-14；Chrome 141 / Firefox 150 / Safari 27 | 0 处；Toast/状态用 `role=status|alert`/`aria-live` 共 11 处 | 无真正缺口；可作 progressive enhancement | 小 | 观察 | 它播报的内容**不在 DOM 里**，读屏用户事后无法回读，与 NG7「唯一关键后果不能只存在于会消失的提示里」冲突；需 Permissions Policy 配合。适合流式输出这类瞬时播报，目前无此组件 |
| `inert` | WF | high 2025-10-11 | 0 处 | 无 | — | 不采纳 | 模态由 Base UI 处理 |
| `Intl.Segmenter` | WF | low 2024-04-16 | 0 处 | OTP/TagInput 的「字符数」按 UTF-16 码元还是字素计 **UNVERIFIED** | 小 | 观察 | 有真实数据（含 emoji、组合字符）出错时再改 |
| `Intl.DurationFormat` | WF | low 2025-03-04 | 0 处 | 无时长展示组件 | — | 不采纳 | 无任务 |
| Temporal | WF `temporal` | —；Chrome 144 / Firefox 139，Safari 无 | 0 处；`calendar.tsx` 用本地日期字段助手（`formatLocalDate`/`parseLocalDate`）避免 UTC 偏移 | 无 | — | 不采纳 | 缺 Safari；Vitest 5 的假计时器已能 mock Temporal，说明生态在跟进，等 Baseline |
| ICU MessageFormat 2 | `https://github.com/unicode-org/message-format-wg`：自称「stable part of CLDR」；`intl-messageformat` 12.1.3（2026-10-05）；`messageformat` 4.0.0（2025-11-25） | 规范稳定；`Intl.MessageFormat`(TC39) 阶段**未取到** | 消息是函数 `(n) => string`（`locale.tsx`） | 复数多的语言写起来繁琐但可行（`Intl.PluralRules` high 2022-03-19） | 中 | 不采纳 | 引入消息语法等于增加依赖与翻译协议；函数式消息已足够 |
| 本库 `useUILocale` 与 React Aria / Mantine / Ant 对比 | React Aria `I18nProvider` 页 **404 未取到**；Base UI 有 `DirectionProvider`；shadcn 的 Dialog 页设有 RTL 小节与配置指南 | — | 只有 `code`+`messages`；数字/日期格式靠 `Intl` + `code`；无 `dir`、周起始日、历法、数字系统 | 见 D2/D3 | 小·中 | **采纳（#1）** | 其余（历法、数字系统）无需求时不做 |

### 5.5 主题与 token

| 项 | 事实与来源 | 状态 | 本库现状 | 差距 | 代价 | 建议 | 理由 |
|---|---|---|---|---|---|---|---|
| W3C DTCG 与 `token-ledger` | 4.2 | Final CG Report 2025-10-28，非 W3C 标准 | 台账是浏览器实测值+来源+关系，不是 DTCG | 表达力不够 | 中 | 不采纳 | 见 4.2 |
| 三层 token 的各家做法 | Primer：base+functional 两层、9 个主题（light、light-high-contrast、light-colorblind、light-tritanopia、dark、dark-dimmed、dark-high-contrast、dark-colorblind、dark-tritanopia），源 JSON5 经 Style Dictionary；Carbon v11：角色 token（`$layer-01`、`$text-primary` 等），4 个主题（White、Gray 10/90/100），Sass `with` 配置；Mantine：`data-mantine-color-scheme` 写在 `<html>`，默认 localStorage 键 `mantine-color-scheme`；Radix Themes、Material 3、Spectrum 2、Fluent 2、Open Props、Tailwind 4 `@theme` | 取到的见左 | 本库三层：primitives（原色）、semantic（墨与纸）、components（法度），`theme.css` 头注释；三轴：品牌 `html[data-brand]`、明暗、密度 `data-density` | **未取到**的四家不比较；与已取三家的差别：本库的语义层只有 5 个百分数自由量 | — | 无需动作 | 墨阶设计使「高对比」「色盲」不需要重做一套主题 |
| 高对比主题作为第四轴 | Primer、Carbon 的做法见上 | — | 无 | 见 #8 | 小 | **采纳（媒体查询，不加轴）** | 加轴需库主裁决 |
| 色盲友好主题 | Primer 有 colorblind/tritanopia | — | 数据系列色经 dataviz 校验器：相邻色盲 ΔE ≥ 9（`primitives.css` 注释）；STANDARDS §8「图形状态不能仅靠颜色」 | 状态色红/绿同时出现时仅靠色相的位置 | — | 不采纳独立主题 | 图标+文字已承担；系列色是按色觉缺陷校验过的 |
| 密度轴在别家的实现 | Spectrum scale、Ant compact algorithm、MUI density | — | `data-density="compact"` + 窄屏升一等（`components.css:433-479`） | **未取到**，不比较 | — | — | |
| 偏好持久化与跨标签同步 | Mantine 文档的示例管理器监听 `storage`，默认管理器是否同步页面未说明 | — | `ThemeProvider` 已监听 `storage`（`theme-provider.tsx` "Follow changes made in another tab"）；仅 localStorage，没有 cookie | SSR 无法在服务端渲染正确的 `<html class>` | 小 | 观察，文档配方 | cookie 方案需要框架中间件，库不该内建 |
| 嵌套主题（局部深色） | Carbon 页未讲分区；Mantine 页未讲子树 | — | `semantic.css` 墨阶规则写在每个明暗根上「使局部切换明暗时随该根重算」；门户内容挂到 `body`，不继承局部区域 | `theme-axes.md`：局部品牌/门户未验收 | 中 | 观察 | 无局部深色的真实任务；有则需给门户 `container` 指向区域（Base UI 门户的 `container` 属性 **UNVERIFIED**） |

### 5.6 给 AI 与工具的接口

| 项 | 事实与来源 | 状态/日期 | 本库现状 | 差距 | 代价 | 建议 | 理由 |
|---|---|---|---|---|---|---|---|
| `llms.txt` / `llms-full.txt` | llmstxt.org：提案（v2，2024-09-03，2026-08-10 修改），千站采用，Anthropic/OpenAI/Google 自己的开发者文档也发布，但页面承认**没有证据**助手推理时会读；约定了页面的 `.md` 备用地址与 `rel="alternate"`/`Link` 头；`llms-full.txt` 不在该页，由 Ant、Mantine 实践 | 提案，非标准 | `apps/docs/public/llms.txt`、`llms.en.txt`；`ai/v2.0.0/llms.txt` 列 90 个 `components/*.md`；`robots.txt`+`sitemap.xml`；无 `llms-full.txt`；官网页无 `.md` 备用地址（D8） | 见 #6 | 小 | **采纳（#6）** | |
| MCP 服务 | 4.1 | | 无 | D9 | 中 | 不单独做 | 见 4.1 |
| shadcn registry 与 `components.json` | `https://ui.shadcn.com/docs/registry`：「works with any project type and any framework」；`shadcn mcp` 读取 `components.json` 的 `registries` | | `registry/registry.json` 3 项 | 同上 | — | 不扩展 | |
| Figma Code Connect / Dev Mode MCP | `https://developers.figma.com/docs/code-connect/`：CLI+UI，推荐模板文件（`Button.figma.ts`），需要组织/企业版 Dev 或 Full 席位；`@figma/code-connect` 2.0.1 | | 本库无 Figma 稿（UNVERIFIED） | | | 不采纳 | 没有设计稿源就没有可映射的对象 |
| Storybook MCP | 4.1 | 预览 | 无 Storybook | | | 不采纳 | |
| `AGENTS.md` 约定与规则文件分发 | | | 根目录有 `AGENTS.md`/`CLAUDE.md`；`design.md` 的「在项目中持续使用」段给出可合并片段，`ai/SKILL.md` 同步投影 | 无 Cursor 规则文件 | 小 | 不采纳 | 片段已能被任意代理读取，多一种格式多一份漂移 |
| Google `design.md` 格式 | `https://github.com/google-labs-code/design.md`：alpha；Ant 已发布 | alpha | 根 `design.md` 是中文散文，不含 YAML 令牌块 | 与该格式不互通 | 小 | 观察 | alpha；且本库 token 的价值在关系，YAML 令牌块只存值 |
| WebMCP | 4.1 | 草案 2026-10-09 | | | | 观察 | `Form` 等组件会把 `toolname` 属性当普通 props 透传，届时无需库改动 |
| 现有生成链 | | | `gen-catalog.mjs` → 包内 `design.md`、`catalog.json`、`ai/SKILL.md`、`llms.txt`；`registry/` | 见 D10 | | **采纳（#5）** | |

### 5.7 文档站

| 项 | 优秀库的共同做法 | 本库现状（`apps/docs`） | 差距 | 代价 | 建议 | 理由 |
|---|---|---|---|---|---|---|
| 可复制示例、安装 CLI/手动页签、用法 | shadcn Dialog 页：预览+代码、CLI/手动安装页签、用法、组合树、示例、RTL 小节、API 链接、本页目录、「复制本页」 | 组件页顺序：示例 → 何时用/避免 → 状态归属 → 要点(decisions) → 导入 → 说明 → API → 键盘（`component.tsx:110-365`）；`InstallTabs` | 有 | — | 无需动作 | |
| 属性表自动生成自类型 | 多家（API 表由类型生成，shadcn 此页只链到上游） | 手写 `ApiPart[]`（`types.ts`），D10 | 有缺口 | 中 | **采纳（#5）** | |
| 可访问性小节 | shadcn 此页无；Base UI 有 Accessibility 总览 | 无按组件的「可访问性」节，键盘表有；总览在 `accessibility.tsx` | 部分 | 小 | 观察 | `design` 字段与 `keyboard` 已承载；不为凑结构新开一节 |
| 键盘表 | | `keyboard` 字段 + 表格 | 有 | — | 无需动作 | |
| 「何时用/何时不用」 | | `design.whenToUse/avoid` | 有 | — | 无需动作 | |
| 主题定制器 | | 无站内定制器；本地 `apps/studio`（Theme Studio）+ tooling `theme` 命令 | 站内无 | 大 | 不采纳 | 与「反说明书式 UI」同方向：定制器是工作台，不是文档 |
| 版本切换 | | `public/ai/v0.4.0|v1.0.0|v2.0.0`，站点只显示当前版本 | 无切换 | 小 | 观察 | 只有 3 个版本，旧版是 AI 资料不是站点 |
| 搜索 | | `search.ts` 76 行，站内搜索 | 有 | — | 无需动作 | |
| 暗色、i18n | | 有；中英双语路径 `localePath` | 有 | — | 无需动作 | |
| 可交互 playground / 实时编辑 | | `/playground/<slug>` 展示 demo；不可编辑 | 无编辑 | 大 | 不采纳 | 编辑器会引入第二个运行时；示例可复制已够 |
| Open in StackBlitz / v0 | shadcn 此页未见 | 无 | — | 中 | 不采纳 | 本轮未在被取页面上看到该功能，无依据 |
| 变更日志页 | | 无；发布说明在 GitHub Release | 无 | 小 | 观察 | 单页渲染 GitHub Release 的 Markdown 即可，不写额外文案 |
| 非 JS 可读 / 复制为 Markdown | Ant：每页 `.md`；Mantine：`llms.txt` 指向 `.md` | 客户端渲染（D8）；有 `ai/…/components/*.md` | 缺备用地址 | 小 | **采纳（#6）** | |
| 与「反说明书式 UI」相容性 | | | | | | | #5、#6 只改数据与一个按钮；#7 的安装页「框架」节只写必须动作（`suppressHydrationWarning`、nonce、`themeScript` 位置）与可复制代码，不写设计自述 |

---

## 6. UNVERIFIED / 未取到 汇总

- Tailwind 4 `hover:` 变体是否默认包裹 `@media (hover: hover)`；Tailwind 4 容器查询变体的写法（本轮只取了 `@source` 页）。
- Base UI 门户的 `container` 属性；Base UI 是否计划原生锚点。
- `wcag22aa` 在 axe 4.14 里的标签名。
- Vitest 5 Browser Mode 是否「稳定」、是否带 `toMatchScreenshot`（发布页没写）；上一轮「Vitest 4 里稳定」的来源本轮没重取。
- `require(esm)` 在 Node ≥22.12 对 `default` 条件的行为（已实测的只是当前失败）。
- Cloudflare Pages `_headers` 能否带路径捕获组。
- `@tanstack/react-table` v9 的破坏性；TypeScript 7 对生成的 `.d.ts` 的兼容。
- Drawer 滑动关闭的单击出口、Sidebar 拖拽调整、Toast 是否会完全遮住焦点元素（逐组件对标子代理的范围）。
- 未取到的页面：Material 3、Spectrum 2、Fluent 2、Radix Themes、Open Props、Ant compact algorithm、MUI density、React Aria `I18nProvider`（404）、Chakra MCP 页、Mantine 的方向提供者、caniuse、MDN、Next.js 文档。
- 厂商 MCP 的稳定性：MUI 页未写；HeroUI 页写的包名是 `@heroui/react-mcp`，而 npm 上查到的是 `@heroui/mcp`（1.0.0-alpha.17，2025-09-30），二者关系未核实。
- `web-features` 对「整体 `anchor-positioning` 为 limited」的细分原因，我只看到了子键清单，未看 web.dev 页面如何展示。

## 7. 来源

规范与平台
- web-features 数据：https://cdn.jsdelivr.net/npm/web-features/data.json（3.42.0）；https://github.com/web-platform-dx/web-features
- webstatus.dev：https://api.webstatus.dev/v1/features/anchor-positioning （及 `interpolate-size`、`accent-color`、`text-wrap-pretty`）
- WCAG 2.2 新增准则：https://www.w3.org/TR/WCAG22/#whats-new-in-wcag-2.2
- 2.5.8：https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- 2.4.11：https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
- 2.5.7：https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
- 3.3.8：https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html
- WCAG 3 草案：https://www.w3.org/TR/wcag-3.0/ （WD 2026-09-10）
- WAI-ARIA 1.3：https://www.w3.org/TR/wai-aria-1.3/ （WD 2026-06-04）
- DTCG 2025.10：https://www.designtokens.org/tr/2025.10/format/
- Unicode MF2：https://github.com/unicode-org/message-format-wg
- WebMCP：https://webmachinelearning.github.io/webmcp/

React 与工具
- React 19.2：https://react.dev/blog/2025/10/01/react-19-2
- React 19.3：https://react.dev/blog/2026/09/09/react-19-3
- React Compiler 1.0：https://react.dev/blog/2025/10/07/react-compiler-1
- 编译库：https://react.dev/reference/react-compiler/compiling-libraries
- Base UI 发布页：https://base-ui.com/react/overview/releases
- Base UI DirectionProvider：https://base-ui.com/react/utils/direction-provider
- Base UI llms.txt：https://base-ui.com/llms.txt
- Vitest 5：https://vitest.dev/blog/vitest-5
- Playwright 组件测试：https://playwright.dev/docs/test-components
- Storybook a11y：https://storybook.js.org/docs/writing-tests/accessibility-testing
- Storybook MCP：https://storybook.js.org/docs/ai/mcp/overview
- npm trusted publishing：https://docs.npmjs.com/trusted-publishers
- Tailwind 源检测：https://tailwindcss.com/docs/detecting-classes-in-source-files

AI 与系统
- llms.txt 提案：https://llmstxt.org/
- shadcn MCP：https://ui.shadcn.com/docs/mcp ；registry：https://ui.shadcn.com/docs/registry ；Dialog 页：https://ui.shadcn.com/docs/components/radix/dialog
- MUI MCP：https://mui.com/material-ui/getting-started/mcp/
- Mantine：https://mantine.dev/guides/llms/ ；https://mantine.dev/theming/color-schemes/
- HeroUI MCP：https://www.heroui.com/docs/react/getting-started/mcp-server
- Ant Design AI：https://ant.design/docs/react/llms
- Google design.md：https://github.com/google-labs-code/design.md
- Figma Code Connect：https://developers.figma.com/docs/code-connect/
- Primer primitives：https://github.com/primer/primitives
- Carbon 主题：https://carbondesignsystem.com/elements/themes/overview/

实测（本机）
- `publint 0.3.25` 与 `@arethetypeswrong/cli 0.18.5` 对 npm 2.0.0 tarball；`require.resolve` 在 Node 24.20；`GET registry.npmjs.org/-/npm/v1/attestations/@qingye_lab%2fui@2.0.0` → 404；`curl https://ui.xflux.cc/components/button`；`npm` 元数据中 `@qingye/tooling`、`@qingye_lab/tooling`、`@qingye/ui` 均 404。

## 8. 版本快照（NPM，2026-10-12 前后）

react 19.3.0（2026-09-09）· `@base-ui/react` 1.9.0（2026-10-09）· tailwindcss 4.3.3 · vitest 5.0.3（2026-09-30）· storybook 10.6.1 · axe-core 4.14.0（2026-10-05）· playwright 1.64.0 · publint 0.3.25 · attw 0.18.5 · eslint-plugin-react-hooks 7.1.1 · babel-plugin-react-compiler 1.0.0 · next 16.4.0 · react-router 8.4.0 · typescript 7.0.2（2026-07-08）· `@tanstack/react-table` 9.2.8 · recharts 3.10.1 · `@daypicker/react` 10.0.2 · shadcn 4.21.4 · `@mui/mcp` 0.1.7 · `@mui/material` 9.5.0 · antd 6.6.5 · mantine 9.7.2 · heroui 3.2.6 · `@figma/code-connect` 2.0.1 · style-dictionary 5.6.1 · `@primer/primitives` 11.10.0。
