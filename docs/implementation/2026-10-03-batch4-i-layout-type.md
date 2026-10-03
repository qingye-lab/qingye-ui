# Batch 4 I：Layout / Typography 与依赖演示

完成日期：2026-10-03。语义先行的[决策](../decisions/2026-10-03-layout-typography.md)在组件实现之前写入；设计依据仅为根 design.md。基础层、逐值裁决与族文档用于核对角色和约束，具体数值与默认 API 均区分为选择/预设。

## 基线、归属与阅读记录

- 实路径 `/Volumes/SUNSANG 1/Codex/qingye-ui`；开工 HEAD `275d730`，前两提交 `b93bfe4` / `9d51f7a`。
- 工作区有大量已有/并发修改与归档删除。只写本任务指定两个组件、两个测试、六组内容目录、新审查段落、本批决策与报告；另按用户要求运行 gen:index。未提交、checkout、stash、reset 或清理其他改动。
- 读取当前 AGENTS.md、design.md、STANDARDS.md、foundation、value-adjudication、family-layout、family-display、component-layering，以及 batch2 A/B/C 报告作现状参考；不按历史组件数量或行号修改。
- 读取当前 src/text-steps.ts、utils、现有 token 声明、utilities.css、安装版 Base UI useRender/mergeProps 的公开 .d.ts、Vitest setup、docs 类型/配置/入口、指定内容目录与已重写的 Card/Fieldset/Separator。组件值不从这些实现推导。
- **未读取** qingye-ui-archive 下任何组件源码或 provenance-freeze；未读取 Git 历史中的旧组件函数体、className、样式。Layout/Typography 当时不在仓库，没有旧签名可读；根据当前消费调用与设计关系新写。没有读取归档测试或复制旧实现。
- coss-source.json 只用 JSON 递归扫描 Layout/Typography 文件键/路径定位来源记录，不输出实现内容，未找到这两个文件的对应路径；没有修改该文件或 THIRD_PARTY_NOTICES.md。若主任务另有以组件名组织的旧记录，应移除指向旧 Layout/Typography 实现的条目；本批新源码属于 local。其他派生文件的法律声明由主任务统一处置。
- 没有新增内置文案，无需修改共享 locale 文件。未改共享 token、utilities/styles/motion CSS、Card 阴影或浮层层级。

## 实现与明确变化

| 部位 | 最终行为 |
|---|---|
| Layout | 仅 Stack / Inline。gap 为 field、fields、actions、panel、section，实际读取五种既有角色 token；默认 panel/actions 为选择。无数值 gap、Grid、页面骨架或自动围合。 |
| 组合 | useRender + mergeProps、data-slot、ref、原生属性与事件；render 可变为 section/nav/span 等，不新增 as。语言、方向、密度跟随真实祖先，不推断业务语义。 |
| Typography | Heading level=1–6 决定真实标题；step 独立决定视觉档。Text 默认 p/body，可 render 成 span。全部 TextStep 对照 src/text-steps.ts，不增加文字档；公开转出 TextStep 类型。 |
| 文字容量 | min-width:0、max-width:100%、正常换行与 overflow-wrap:anywhere 保留长文本；不默认截断。颜色默认继承。CJK 字距由既有 :lang 规则接管。 |
| 数值 | numeric 仅接既有 tabular-nums；metric 保留其现有规则。不格式化、猜测或把未知写成 0。 |
| 窄屏档 | support/dense/control 接既有 mobile 类，sm 回同名桌面档；未新增窄屏设计或页面适配。 |
| Card / Popover 演示 | 改用新 Layout/Typography，并按关系明确 panel/field/fields/actions。原生账单 table 保留 caption、列标题、行标题及二维比较。Popover 原位备注草稿仍由应用持有。 |
| ThemeProvider 演示 | 现有 Popover + 原生 select；设置页用原生 fieldset/legend/radio。移除 menu/radio-group/segmented-control 依赖，不依赖本批 J/K 的新控件。native select 聚焦只改变 1px 边框色；radio 用 quiet 角色画盒内线。 |
| MotionProvider 演示 | 原生 kbd；保留/继续编辑及优先级表达本页真实状态，不让状态推进依赖动画。移除硬编码颜色样本与设计自述。 |
| 审查段落 | 05-layout-type.tsx 默认导出，自动进入 review.html；真实交接、展开/收起、已阅、零/待核实和完整长文本。未改 DesignReview.tsx 或 review-main.tsx。 |

**API/视觉基线重新定义**：不恢复旧 Layout 数值间距、Grid 或 Typography 旧别名/TextLink；消费方使用 step 和 render。新语义接口只适配任务列出的消费者。整站外壳仍有旧导出引用，单独计为 FAIL；不因类型通过就声称兼容全部既有消费者。没有比较归档样式或更新旧截图基线。

## 测试与探针处置

两个测试文件从零写入，没有改其他测试或读取旧测试断言。Layout 9 条、Typography 12 条，覆盖五种角色 class、默认排列与换行、真实区域/导航语义、render 函数/元素、ref/原生属性/事件、h1–h6 与视觉档分离、所有 canonical 档、辅助色合并、numeric/未知及长中英内容保留。JSDOM 的 class/内容断言不冒充实际几何；实际溢出另用浏览器检查。

新 Typography 用例最初用 `toHaveStyle({color:"inherit"})` 检查属性透传；JSDOM 会把 inherit 解析成 rgb(0,0,0)，因此失败。改为 `aside.style.color === "inherit"`，直接核对原生声明是否透传；保留 render、step、class 与 slot 的全部断言，没有放宽为任意颜色。

第一次测试命令 `pnpm --filter @qingye/ui test -- …` 意外执行全套：31 文件、461 测试，448 PASS / 13 FAIL。其中一条为上述新测试断言，另外 12 条位于当时并行编写的 RadioGroup/Select/Dialog/AlertDialog。没有修改那些文件或断言；这只描述该时点，不能声称它们当前仍失败。后改用 `pnpm --filter @qingye/ui exec vitest run …` 明确限定本任务。

浏览器采集修正两处：纯图标通知按钮有可访问名称而没有 textContent，空演示判据需保留具名原生控件；主题明暗样本通过真实 ThemeProvider setTheme 改变，保持选择与 resolvedTheme 一致。原生 radio 首次实测发现默认 outline-offset=2px，随后修复。临时探针的 Vite WebSocket 被环境阻断，重复动态 import 曾命中修复前模块；最终用带查询标记的源码/CSS URL 重新加载，核对 DOM class 后复测。没有通过修改组件断言隐藏旧模块或外扩焦点。

## 实际运行结果

| 检查 | 状态 | 观察与边界 |
|---|---|---|
| gen:index | PASS | 自动生成 src/index.ts；当时含并行任务共 20 个组件。没有手改入口。 |
| @qingye/ui typecheck | PASS | 最终 `tsc --noEmit` 退出 0。早期曾同时有本批 data-slot 对象类型错误和并行 Dialog/Select 类型错误；本批改为结构化 defaultProps，未改并行文件。 |
| 本任务单元测试 | PASS | 两文件 / 21 条；最终再次运行退出 0。 |
| 相关基础回归 | PASS | 加 text-role-css / foundation-tokens，共四文件 / 33 条。没有改相关断言。 |
| docs typecheck 整站 | FAIL | 最终 125 个诊断；主要为归档组件/旧导出引用。较早快照为 128，不把并发减少归功于本批。 |
| 六个目标内容目录与新审查段落 | PASS | card、popover、theme-provider、motion-provider、layout、typography、05-layout-type 的类型诊断均为 0。 |
| 指定目录归档依赖 | PASS | TypeScript AST检查28个文件、97个import/export/动态import引用：禁止组件导入0、unresolved 0。无 kbd/menu/radio-group/segmented-control/table/Select/Dialog 组件导入；原生 kbd/radio/select/table 使用各自语义。 |
| review.html | PASS | 1280/1100px × 浅/深色，新段落无水平溢出；完整长词不溢出；展开/收起与已阅可逆。四张截图已目检。 |
| 角色真实接线 | PASS | field 8、fields 20、actions 8、panel 16、section 20px；compact panel 12px。逐个局部覆写为31px，computed gap均为31px，随后还原。审查页 panel 独立覆写16→28px也生效。 |
| 标签与视觉档 | PASS | 桌面 h1/heading=16px、h6/title=24px；200%根字号时分别32/48px，标签仍为h1/h6。 |
| 中文、混排、numeric | PASS | 中文 computed tracking=normal；明确 lang=en 的正文为既有−0.084px预设。numeric=tabular-nums；零/待核实分别保留。 |
| 长文本与200%文字 | PASS | 1100px，真实长中文标点与连续英文，浅/深色 × 16/32px根字号；元素与页面均无水平溢出。不是浏览器缩放或物理设备验收。 |
| 辅助文字对比 | PASS | 实际祖先背景合成后浅色7.1178:1、深色8.7277:1；只证明本批 support + muted-foreground 的真实承载组合。 |
| 22个真实演示 | PASS | 1100px桌面浅/深色，逐个单独挂载，无空演示、页面/浮层水平溢出；源码导入与HTTP请求均成功。重点截图已目检。 |
| 相关操作 | PASS | Card关注/保存名称；Popover备注关闭再开草稿保留、显式关闭入口、共享对象与RTL内容；原生主题选择/系统选项；Motion真实Tab输入方式、草稿保留/恢复；订阅/已阅。未声称所有既有控件交互穷尽。 |
| 原生控件焦点 | PASS | 真实Tab，等待≥600ms。radio focus-visible=true，outline-style=none，1px inset shadow；UA未使用的outline-offset仍为2px但不绘制线。SELECT focus-visible=true、边框1px、outline-style=none、box-shadow=none。没有把第一次采集到的Button当Select证据。 |
| 浏览器错误 | PASS / FAIL | 应用pageerror=0、无失败HTTP响应；消费探针有3条Vite WebSocket/本地网络环境console错误（FAIL），最初review有favicon.ico 404。不能宣称全会话控制台零错误。 |
| 修改文件 whitespace | PASS | 指定源码、测试、内容目录 `git diff --check` 退出0。 |
| build / gen:catalog / 发布 | NOT_RUN | 用户要求留给主任务统一处理；未修改 catalog、ai、registry、包内design.md或dist。 |

## 浏览器所有权与证据

开浏览器前：CLI list 无浏览器；进程检查确认既有 Vite PID 59950（PPID 59927），监听127.0.0.1:5180，属于既有任务并保留。全程只用 `qy-batch4-i` 一个CLI会话、一张活动页面；视口、主题、22个示例串行，临时消费探针在同一页面通过路由响应挂载真实源码，未写仓库入口。

- CLI daemon PID 36883（PPID1）；Chrome PID36884（PPID36883）。专用profile `/var/folders/jp/tkxkqws50fsdwv0bh7_9gg8w0000gn/T/playwright_chromiumdev_profile-rrqC1v`。
- 通过当前CLI连接 close；复查 daemon/browser PID 均退出，按专用profile检查子进程残留为0。没有新启清理服务器、广泛kill、关闭用户浏览器或停既有Vite。
- 证据 `/tmp/qy-batch4-i/`：review.json、demos.json、foundation.json、native-focus.json、import-audit.json，对应采集脚本/日志；review浅深色1280/1100截图、内容与原生焦点截图。单元/类型日志为 `/tmp/qy-batch4-i-tests*.log`、`/tmp/qy-batch4-i-{docs,ui}-*.log`。JSON中审查段落width=832指内容宽，另记录viewportWidth=1280/1100，避免将容器宽当视口。

## 剩余边界

| 项 | 状态 |
|---|---|
| 任意页面Portal堆叠遮挡 | UNVERIFIED；本批未新增z-index或z-50，依自然绘制顺序；未扩展为全站叠层保证。 |
| Card默认阴影用途 | UNVERIFIED；保留主任务待裁决状态，本批未修改Card源码。 |
| 完整站点外壳 | FAIL；其旧导出/归档依赖不在本任务文件归属内。 |
| 完整辅助技术、强制颜色、RTL矩阵 | NOT_RUN；原生和render语义单元/浏览器通过不等于辅助技术验收。 |
| 移动端页面、390px截图、物理设备 | NOT_RUN；遵守用户仅做桌面页面的裁决。已有文字mobile接线有class检查，未声称窄屏运行验收。 |
| 所有品牌/图片/未知承载面文字对比 | UNVERIFIED；对比证据仅覆盖本批实际浅深承载。 |
| 全套重新运行、生成副本、打包消费者 | NOT_RUN；意外全套的历史FAIL已记录，不用本批33条代替全库验收。 |

本批没有提交、发布、新增共享token、放宽其他测试或覆盖其他子代理的工作。
