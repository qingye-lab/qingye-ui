# 路线图继续执行记录

依据唯一计划 [重写路线图](../plans/2026-10-03-rewrite-roadmap.md)，起点 `a94e8b4`。设计依据为根 `design.md`；所有实现由 gpt-6.1-sol / xhigh 子代理完成，主代理负责审核、集成及唯一浏览器验收。只记录本轮实际观察，前批证据不重跑、不升级。

## 第六批：表单、值与集合

- 结构作者定向 26 项 PASS，值输入作者初次 31 项 PASS，集合作者 17 项及 Slider 8 项 PASS；Slider 最终调整只确认受影响 3 项。独立审核没有重复这些检查。
- Group 的分发 layer 已从 foundation 纠正为 primitive。
- InputGroup 长附件实际 FAIL：320px 组，短附件时 input 219.75px、scrollWidth 318px；一个长连续附件使输入仅 26px、scrollWidth 374px；增加另一长附件使 scrollWidth 734px。修复只在 InputGroup 的容量与换行边界。作者定向 5 项 PASS，主代理同会话确认：320px 一个/两个长附件 input 318px、scrollWidth 318px；200px 两个长附件 input 198px、scrollWidth 198px。短附件布局保持原值。
- 独立值输入审核确认 TagInput 在带 name 的 Field 下把草稿串入原生 FormData，OTP 不能逐字缩短已有超长值；NumberField 原生 reset 缺口随后由作者最小运行确认。接管作者先观察 3 FAIL / 1 PASS，再修复；最终受影响 8 项 PASS、27 skipped，三值组件定点严格 TS PASS。没有重复初次 31 项。

## 主代理桌面实测

1280 × 960，审查入口 `/review.html`，同一页面串行浅/深主题：

| 边界 | 已观察结果 |
|---|---|
| OTP 点击第二段 | 真实 input 获焦，selection 1–2；替换后仍保留前导零 |
| 原生粘贴 | `001234` 实际粘贴成功；七字符粘贴整次拒绝，已有六字符保留 |
| NumberField 步进 | ArrowUp 0→1；点击增加后 2，焦点仍在输入 |
| TagInput | 新项确认后草稿清空；重复项保持草稿 CSS、集合不增加，并出现真实反馈 |
| Slider | ArrowRight 25→30；只读保持 40；显式 invalid 在真实 range input；轨厚 token 4px→8px 的实际 computed 值随覆写变化 |
| 三个新增审查段 | clientWidth 与 scrollWidth 均为 832，无 pageerror，无水平溢出 |
| 五档文字与尺寸 | OTP / Toggle 外高 24/28/32/36/40px，字号 12/13/14/16/18px；NumberField 初次多 2px，作者修正共同边界内部 padding 后实测外高同为 24/28/32/36/40px |
| 错误文本组合 | 所测 FieldError 浅/深对比约 5.94:1 / 6.86:1；不外推到全部配色或全站 |

浅深截图中 values、selection 已查看，structure 已保存（本地临时证据，不分发）。发现 TagInput 添加动作在短列中折行、Slider dark 抓手透明导致轨道穿透；作者已在各自消费边界修复。主代理最终定向 computed 确认：193px TagInput 输入 99px、动作 84px 宽 / 32px 高、scrollWidth 193px；dark Slider 抓手底面为不透明 `color(srgb 0.105651 0.105679 0.105681)`。InputGroup 动作 demo 补齐 sm 内部尺寸覆写后外高 32px 已确认。截图不等于完整无障碍通过。

## 展示反馈、工具与内容

- 反馈作者最终 25 条不同用例 PASS；Base UI Progress 的默认英文未知值经 owning callback 进入 locale，尾项定向 6 项 PASS。主代理观察零/50/100 的数值与真实轨宽，未知没有 aria-valuenow；本轮刷新确认未知 aria-valuetext 与可见值均为「进行中」。五档圆形外高 24/28/32/36/40px，xs token 覆写到 48px 后真实外高变化。浅深截图已查看，不把这些状态外推到全主题。
- 工具作者首轮 12 项 PASS，删除焦点恢复、disabled 与原生事件只复跑受影响用例。主代理实际 clipboard=`Qingye`；LocaleSwitch 切换后的 Provider 值 en-US，内部复制名称为 Copy；VirtualList End/Home 到第100/1项，滚动与倒序仍保留实际输入草稿和焦点；原生 ScrollArea End 在实际滚动发生后确认。AspectRatio 1/1、3/2、16/9 的几何关系成立。浅深截图已查看。
- 内容作者 28 条不同精准用例及 UI/docs 定点严格 TS PASS。主代理表格 A,C,B→B,C,A 且 aria-sort=descending；已知分页到第2页，未知总数保留 unknown 与调用方显式下一页禁用；Toolbar 默认 disabled 命令可获焦但 Enter 不执行，方向键可达链接与启用命令；CodeBlock 实际写入剪贴板与完整字符串相同。两个桌面主题段宽/scrollWidth=832/832，无 pageerror，截图已查看。
- 浏览器脚本第一次把 Toolbar 默认禁用可获焦误当「应跳过」；公开原语 focusableWhenDisabled 默认 true，与本库测试契约一致。修正验证预期后确认禁用动作不执行，不作为产品缺陷。ScrollArea 第一次同步读取发生在滚动前；改为等待实际 scrollTop 变化，不扩大测试。
- 独立浏览器发现共享 Layout 子项 max-width 默认以较高 specificity 压过调用者 max-w-sm，基础层作者在 owning 默认边界修复；定向 computed 确认见下节。

## 日期与候选输入

作者日期首轮 11 PASS / 1 FAIL 后只确认失败 1 项；候选最终 9 项 PASS，6 源码严格 TS 与 19 个 docs 文件定点 TS PASS。没有声称最后全 21 项再次运行。

主代理同一桌面会话观察：DatePicker 选择后原生 value=`2026-10-09`，Popup 隐藏且 trigger 获焦；DateRange 半程 FormData=[]、应用 disabled，取消不改已确认值，完整确认仅得到 `range.from=2026-10-03`、`range.to=2026-10-05`；DateTime 选日不自动造时间，手填后为无时区文本 `2026-10-03T12:30`。候选查询乙时 FormData 仍为甲，Enter 后才为乙；Autocomplete 自由文本独立进入 `text` 字段。浅深段宽/scrollWidth=832/832、无 pageerror，两个截图已查看。

截图发现 dark Calendar nav SVG 的 color 为前景、fill 却为黑色；作者在公开 components.Chevron 渲染链消费 currentColor，调用者组件优先保持。定向实测稳定后 fill=color=`oklch(0.97 0 0)`、16×16px，局部截图已查看。初次同步读取处于颜色过渡起点，不把过渡中值当最终样式。日期原生图标初图偏黑源于本轮脚本只改主题 class、未同步 colorScheme；已补正主题渲染，不作为组件缺陷或 ThemeProvider 行为验收。日期脚本一次将「和」误写为「与」而超时，修正后上述路径通过；没有重启浏览器。

共享 Layout 修复后定向 computed 确认：batch6-structure 的 max-w-sm 子项与 batch7-feedback 三个同类 Stack 在 832px 父容器下均 width/max-width=384px，默认容量规则不再压过调用者上限。

官网恢复前本轮 `docs typecheck` 仍 FAIL，实际断点是旧 API、已删除组件及已移出 examples/patterns 的引用；不沿用旧 125 条作为当前精确计数，不把这些在途消费端缺口记为 PASS。

## 展开、边缘工作面与共享浮层

基础作者 17 个相关行为/生命周期路径分次 PASS，15 个源入口与 23 个 docs/meta/review 入口定点严格 TS PASS。主代理实测 Accordion/Collapsible 折叠后实际输入保留；Drawer 所属候选 z32 高于父 viewport31，后开启子 Dialog viewport51 高于父面，Escape 先回「内层」再回「left」，父面输入仍保留。HoverCard 键盘 focus 与 Escape 可达，Tab 继续到下一控件。浅深审查段 clientWidth/scrollWidth=832/832，无 pageerror，两个截图已查看；不把手工主题 class 的截图当 ThemeProvider 状态验收。

独立纯安装版 Base UI 浏览器夹具证实：两个并列 Dialog Root，新 Portal 初始关闭且 keepMounted=true 后开启时，data-open 与焦点困住成立，但 Portal 祖先仍 aria-hidden=true/data-base-ui-inert，按名称 dialog 查询为0；keepMounted=false 为1。关闭后的最终焦点能回原入口，早期同步 returned=false 属于未等 effect 的观测错误。此可访问性缺口独立于本库 z 顺序，三个 modal Popup 的公共 Portal 契约已收窄为不保留关闭 DOM；当前真实消费者没有依赖该选项，应用显式持有草稿。库边界定向浏览器确认：JS对象仍携带 keepMounted=true 时，关闭的新面 Portal 不保留DOM；Dialog/AlertDialog/Drawer 新面均按名称可达、aria-modal=true、无隐藏祖先、Tab在面内、viewport41高于旧面31，关闭后返回原入口。第一次库夹具仅引入原始样式而未编译 Tailwind utilities，出现static/zauto；修正夹具导入后确认，不作为库缺陷。

## 导航、命令与集合

作者 26 个不同精准用例与 UI/docs 定点严格 TS PASS，9 个组件的71个 runtime 导出与metadata双向一致。独立审核最小确认 filtered SelectAll 将外部选择误报 mixed，以及 Tree 删除全部条目后焦点落body；owning 修复保留scope外选择、空根盒内焦点与真实归还。公共组合取消事件尾项修前2 FAIL、修后6 PASS；不重复全批。

主代理实测：菜单重排确实变为A在首位；右键动作实际改变同一对象标记；Tabs ArrowRight只换焦点，Enter才激活且返回后输入仍为实际草稿；Tree 跳过禁用B并选择C；Filter 草稿B时仍3项，应用后1项，另改A再取消回B；DataTable 实际升序A/C/B，SelectAll aria-checked=true。浅深段 clientWidth/scrollWidth=832/832、无 pageerror，两个截图已查看。初次脚本假设平台ShiftF10会产生原生contextmenu，当前Chrome没有打开；文档未承诺此快捷键，实际右键与可见Menu提供同源入口，未为脚本预期新增内部键盘处理。

## 确认快照与实际文件

作者两个新组件的14个不同用例取得PASS证据；初次测试中6处断言/each参数错误，只修这些后定向6 PASS/8 skipped，不重复全14。键盘移除实际聚焦项的恢复另先观察2 FAIL（body），owning修复后2 PASS/6 skipped，两个源入口严格TS PASS。元数据/演示的最终静态收尾按作者报告另列。

主代理实测 ConfirmAction：已输入A的批准随版本+1失效；重新阅读清空旧输入，重新输入后仅请求快照v2，弹层继续存在且不宣称完成；返回后原trigger获焦。FileUpload 真实setInputFiles接受txt而拒绝bin；原生new FormData保留原有同名string，并追加实际File accepted.txt（12 bytes），chooser草稿自身没有name。键盘移除末项后焦点回chooser，同一文件可以再次选择；浅深段832/832、无pageerror，截图已查看。表单中额外同名string是任务临时DOM探针，不是demo内容。源组件已齐81，最后carousel/chart2项仍开发中；英文和官网集成尚未完成。

## 生成与验收状态

统一生成快照包含原 20 + 表单14 + 反馈9 + 工具5 + 内容12 = **60**。主代理 `gen:index` PASS（60），库 `build` PASS（catalog 60、严格 TS、CSS 86.1KB）；不重复 build 自带的 typecheck。日志的 0 patterns 是额外模式指南页数量，不代表组件 layer 数。后续日期/浮层源码与回调尾项尚未纳入该构建。全库测试、打包两路径、官网恢复、强制颜色/RTL/缩放仍按计划后续统一处理，不把作者定点 TS 代替这些门禁。

## 浏览器生命周期与工作区保留

浏览器 owner：主代理。启动前 CLI 无会话；本轮 `qy-rewrite` daemon PID 82312，Chrome PID 82313（父 82312），隔离 profile `playwright_chromiumdev_profile-4z3ey7`。唯一活动页面。原生 chooser 的 CLI modal 适配路径失败后，经正常 close 与进程检查确认两个 PID 均退出，CLI list 无浏览器，才转单次 direct Playwright。直接脚本 Node 8779 / Chrome 8781（父 8779），隔离 profile `playwright_chromiumdev_profile-VejjcO`；context/browser 在 finally 正常关闭，process exit 检查 closed=true、remaining=[]。共享 Vite PID 59950（父 npm 59927）在本轮前已运行，本任务仅复用，不拥有也不终止。

最后三项实际渲染：FileUpload 原生 input 焦点后 Space 打开选择器，接受真实 txt 后 FormData 包含 File（21 bytes），原生草稿已清空且无 name；输入内部 82×30、外部 84×32，焦点保留、无导航。Carousel 前进/返回保留原编辑草稿，另外两面 hidden。Chart 实际 marker 8→16px、plot 12em→16em 生效，零值仍有真实点与可见表；纵轴刻度曾被裁切（含负号），作者修复 AxisTick 未转发公开 className 的真实测量链，未加猜测 margin。复核 -1,234 / 123,456,789 浅深完整：figure x305..817，最左刻度309.66；39处实际文本无contrast FAIL，5图形最小浅色3.75、深色6.01。长中英类别与零值 probe 浅深无裁出与页面溢出；原语按碰撞稀疏显示x刻度，完整类别仍在可见表。CSS zoom=2布局放大探针通过，不等同真实浏览器200%或辅助技术验收。三个 playground 无 pageerror/console.error；相关截图已查看。这次成功的直接原生选择不能倒推先前 CLI modal 失败是组件缺陷。

官网实测：1280浅深首页83 cards、client/scroll均1280、无文本contrast FAIL。搜索从/en到InputGroup；首次在URL改变而lazy页未完成时读到旧h1，等待真实新页稳定后activeElement为InputGroup新h1。组合目录与method-6深链接正常，无pageerror/console.error。首页level1默认body档被观察到后，网站作者复用现有chapter档修正识别层级，不新增token或营销文案。

强制颜色与RTL限定回归：真实Tab+500ms采样8个Button；solid/bordered outline2px、offset-2px，quiet outline1px、offset-1px，均focus-visible且没有外扩；不升级完整强制颜色矩阵。Carousel根dir=rtl时ArrowLeft前进第二面、ArrowRight返回第一面。真实辅助技术朗读与任意组合RTL仍未验证。以上直接browser每次串行、finally关闭并process-exit remaining=[]。

入口与 metadata 统一核对均83，gen:index（83）PASS；UI 1.0.0 是本地候选。旧 v0.4.0 临时投影的2份 llms 与80份本轮新增 component Markdown 已定点恢复/移除，保留旧发布快照。下节记录最终集成，前面的60组件快照属于中途证据，不代表最终构建。

## 最终集成（2026-10-04）

- 冻结共享源后 `pnpm install --frozen-lockfile` PASS，无依赖变动；UI build PASS（83组件、严格TS、CSS 88.8KB），docs build PASS，Studio build PASS。复用 build 中的类型检查，没有再跑对应包装命令。docs 主包512.78KB 的Vite提示保留，未为消除警告修改阈值。
- 统一生成中英 design/style/SKILL、83份组件资源、catalog和registry；两README与未发布候选说明核对29条本地链接、19个实际导出。旧v0.4.0投影保留原发布快照。
- 全工作区测试只尝试一次：UI 95文件 / 709用例，706 PASS / 3 FAIL，先于其他包停止。Button registry TS编译在同时构建负载下触发5秒超时；不改实现或超时，单独失败用例981ms PASS。Calendar/DateRangePicker的useRender真实data-slot未被正则识别，改为AST出口检查并补正反例；style检查把English翻译标记错当中文投影条款，改按同源提取器逐语言逐条检查，保留完整源哈希。这两失败及新增AST用例定向3 PASS / 11 skipped。710个现有UI用例已有通过证据，未声称最终完整suite又执行了一遍。
- 其余包仅运行一次：docs 51、tooling31、Studio14项PASS。复用作者Studio preview2、delivery contracts3及facts-ledger负例检查；主代理process-exit4项PASS。具体初次/定向日志在 `/tmp/qy-final-*.log`，不将SKIPPED算作本次重跑通过。
- 新增全局26角色真实computed覆写PASS：Avatar五档24/28/32/36/40→47，ProgressCircle五档同值→47及stroke2→5；StatusDot8→13；Meter/Progress轨8→13；Badge inline6/block1.5→13；Kbd inline4.5/block1.5→13；Slider轨4→9、竖向160→200。浮层document popup10→20、notification5→7、modal backdrop30→60、surface31→34（offset1→4）、owned popup32→37（offset2→7）、nested viewport51→71（step10→20）。逐项看到实际渲染部位变化，不用引用次数代替生效。
- `gen-capabilities` 输出83组件/383tokens，当前输入指纹 `d9b5931f885585526ed0c858f04a44bce140f4e1e935b364703016e3859427b0`；token ledger3018静态路径，旧runtime证据按新指纹失效。基础runtime初次37条recipe均观察实际变化，静态PASS19/UNVERIFIED18，不把CVA/useRender无法精确解析的链升为静态PASS；其余旧探针部位/门槛的收尾另记。
- 最终build桌面审计83×2=166页PASS：无pageerror、console.error、水平及未声明子项溢出。Node29823/Chrome29831（父29823、profile JcYwuJ）由runner独占，preview29788，正常finally退出；remaining=[]，preview closed=true。SIGTERM是runner结束自己preview的正常日志，audit退出0。报告 `test-results/ci-audit/report.json`。
- UI/tooling按标准prepack生成实际tarball于 `/tmp/qy-rewrite-pack/`，含最后README。真实已安装tooling PASS（`test-results/packed-tooling/run-VddNkK/report.json`）：dry-run/应用/重复init、版本独立、theme冲突拒绝、hex/rgb诊断、gate失败及存储报告失效保持UNVERIFIED。安装路径没有workspace alias。

### 最后精准回归与公共资源

- 基础初次runtime的Input外壳16/24不是文字部位，实际inner为14/20；Select的space覆写让五列父容器变窄，外高32→42来自正常文字换行；危险按钮normal边框2.80/2.58并非唯一识别机制。保留这些实测值，只修错误适用条件，组件/样式/取值不变。W3C [1.4.11 Boundaries](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries)说明可见文字辨识入口时普通边框不必承担必要非文本对比，焦点仍需独立核验。
- 主代理仅重跑这三段：Input浅深实际文字档与前景PASS；Select的min-height、padding、字号/行高、边框及图标稳定，值完整、无重叠，32/32/42px全部能由实际内容解释；真实Tab到bordered danger、等实际颜色终点，浅深内外焦点对比6.42/6.53，无外扩、1px线与外高不变，PASS。报告 `test-results/ui-foundations-final/regression.json`，Node55799/Chrome55800（ELBJ5J）closed=true/remaining=[]。合并初次未改部位的证据形成runtime PASS，不声称完整--foundations又执行了一遍。ledger指纹仍匹配、37条实测无需重跑，PASS19/UNVERIFIED18，stale=false。
- 组合初次立即读取Tabs退出前状态，修为等待真正hidden，再保留按名称不可达断言；其后End焦点预期也过时：当前原语与已通过unit均允许禁用Tab可发现，Enter不激活。真实End到历史、aria-disabled=true、名称面保持selected、Home返回，通过；不是给源码添加跳过禁用行为。
- CSS文字容量初次仅翻倍font却冻结leading，TableCaption成为28/20；Range度量越界不能直接证明字形被裁，浅深截图内容仍可辨。主代理与独立审查者查看四张对照图；按真实文字档关系同时翻倍font和numeric leading后为28/40，Range全在承载面、内容完整。检查器现在分别强验这两项倍率，原2px/操作/内容/对比门槛保留，不为gate给Table补padding。最终组合6条行为及浅深×6组合×2文字模式=24容量检查PASS（`test-results/task-patterns/report.json`）。这是CSS文字角色/间距探针，不等同原生浏览器200%或完整辅助技术验收；Node57573/Chrome57588（EkpVht）、preview57548均正常关闭。
- 英文公开资源最终只读复核定位并修复了真实链接缺口：中文style的根guide链接及fragment错误指到ai内部；两语言内部取证链接指向未分发目录。唯一生成源改为可用的公开guide链接，内部来源路径如实标为仓库取证文字，公开准则仍来自根指南。哲学包内链接单独投影为可解析入口，网站保留源正文；catalog分别记录source、package与website实际字节hash。不发布内部执行目录，也不另造规范。完整504条公开prose链接核对文件0缺失，最后两intro锚点已修；相关新增链接正反向与checksum定向2项PASS，逐条规范投影1项PASS。库现有用例数为711，新增一项公共链接检查已有PASS证据，其余已有通过项不重跑。
- 两README/release候选曾误写TooltipContent移除，按实际已接受导出修正保留 TooltipPopup alias；不为说明去改API。完整源码与public元数据83，English非示例正文无中文fallback；例子按原语言保留。当前capabilities源指纹 `ea09ce7235c029a4789108a3b6e0211719a4325ce15cbeb4c306712f3849eeec`。已删除本任务四个layer/chart临时入口，下面列出的原有临时文件继续保留。

### 最终交付关闭

- 进入最后EOF格式收尾前的UI标准prepack PASS，归档为747,219 bytes / 488 files，SHA256 `26e4f60c4326e5e496bfefb263273cbb52f36f59953dc5ced0011d3aa97ea316`。独立只读核对89项英文资源、83份组件源/JS/声明与当时包字节一致，根指南完整copy、STANDARDS源hash及哲学六项hash真实匹配；归档公开正文257个链接，0缺目标、0坏锚点。内部执行文件未分发，不宣称外部URL已验。该实际安装验收归档另保留在 `/tmp/qy-rewrite-pack/before-eof-normalization-qingye-ui-1.0.0.tgz`。
- 四个隔离安装项目实际 install、严格TS、build、浏览器均PASS，全部解析最终tarball且无workspace source alias：Tailwind与预编译CSS各自Button入口/完整组合。Button入口不安装Table/Chart可选peer；完整组合的Registry实际声明、Field/NativeSelect注册关系、原生FormData、草稿取消、Tabs/Tree焦点、Portal、Table/Chart真实零/未知/输入值成立。浅深实际文本记录合计224，FAIL0/UNVERIFIED0，不外推到所有图形/placeholder/禁用对比。首次完整fixture的「单位」未注册FieldControl，是消费fixture缺陷；修复真实注册关系及初值归属，不放宽按名称查询。报告 `test-results/packed-consumers/run-8dd8rv/report.json`。Node66364/Chrome66777（8p33Xg）及四个各自preview均closed，remaining=[]。
- 最后公共资源改动使Studio旧构建catalog快照过时，其compatibility正确拒绝创建iframe，首次textbox超时；记录 `test-results/studio/run-lA47IW/report.json`，浏览器/服务完整关闭。仅重建Studio后，独立只读核对version1.0.0、source `0aa48ee298e10f7ccdd42b4c17a43a5d4b6b4874d5dbea3558bcc40d4fb960e0`、catalog `83085c4f90f4153213261c85b15ec3c3fce4a26ff9ad6b6c0770e1a64b7fa0a7`三项完全匹配；两个fixture available=true。没有改兼容判断、组件或locator来绕过失效。
- Studio最终11条实际流程PASS：双document品牌/草稿/选择/错误独立；各自Select/Menu/Dialog/Toast Portal、打开时主题/密度变化；应用主题写源与CSS；并发source冲突拒绝；导出/导入/重置；实际点击部位与存储报告；属性主题项目；B先A后乱序project响应不替换当前编辑器或写错目标。实际点击是button-content，DOM owner=Button已确认，但精确CVA/useRender静态路径无ledger记录，诊断保持UNVERIFIED/records=[]，不制造影响映射。1100/1600px无溢出，99条实际文本无contrast FAIL/UNVERIFIED；预期409控制台消息单列，其余runtime errors=[]。报告 `test-results/studio/run-mUyTFw/report.json`。Node68741/Chrome68766（NZhHj5）、preview68749正常关闭，remaining=[]；1100px截图已查看。
- docs最终资源/文案重建PASS，保留512.78KB提示。只确认最后变更的桌面路由：首页真实H1消费chapter=22px/28.6px（body16px）、83组件，1280/1280；英文AI的下载href、持久引用及真实clipboard内容全部与English guide一致；中英安装页呈现实际Table/Chart可选peer。七个公开guide/style/Skill/catalog HTTP200且逐字节等于built文件，无runtime errors。报告 `test-results/website-final/report.json`，首页/英文AI截图已查看。Node68389/Chrome68424（5yQhn3）、preview68401均正常关闭；未重复166页或已通过的套件。
- 当前token ledger静态与runtime指纹均为 `73a20848bb6c1154fdbfd98635167ea7dfbf4c2be5a333419f46dcef96b328b1`，PASS19/FAIL0/UNVERIFIED18/NOT_RUN0、stale=false。不因资源链接重pack而重复37条未变角色实测。最终task-owned浏览器/preview进程已退出，共享Vite59950（父59927）仍运行并保留。

提交前新增文件的cached diff检查发现332份生成Markdown与9个demo/review文件末尾多空行。只在唯一组件Markdown生成出口规范一个结尾换行，9份源仅删除EOF空行；无有效代码、规范正文或取值变更。最后标准prepack、docs/Studio构建通过；归档仅166份中英组件Markdown尾部及catalog八份demo的code尾部/对应真实sha变化，其余所有包文件逐字节一致，183份UI JS/CSS/声明完全一致，Studio4份JS/CSS完全一致。因此复用已验收的组件、组合、Studio和四消费项目运行证据，没有再次运行它们或全库suite。

最终归档 `/tmp/qy-rewrite-pack/qingye-ui-1.0.0.tgz` 为747,258 bytes / 488 files，SHA256 `64c2a92922ad39df86d3e8346242d21379af731d8246eabeb3dd92c85af98d52`。capabilities输入指纹为 `5da1857d6da6c5bb62a3016b308a8716de536824fe2b1a6b69286556e41c59ce`；Studio最新catalog指纹 `4eedeb224a047150fd86b9fb9b0f7f359ebc25cb5ea3edae033a1586091cca7e` 与实际JSON一致，source/version未变。docs模块hash因原始示例文本和引用链变化而更新，未将相同文件数量当字节一致。

严格台账指纹对九份demo/review的EOF变化也按原规则失效，因此只刷新原有37条token观测，未跑完整foundations入口或扩展新矩阵。37条全部OBSERVED_CHANGE，errors=[]；静态与runtime指纹 `5fe8022c7df8696899ef4bd4e05cddf849c3cf4aa126e7e9efe08a6895aaab69` 匹配、stale=false，PASS19/FAIL0/UNVERIFIED18/NOT_RUN0。精确静态链无法解析的18条仍保留UNVERIFIED，没有改指纹机制或手填旧观测。报告 `test-results/token-ledger-final/report.json`，浏览器/context/preview正常关闭、remaining=[]。最终cached diff --check通过，共享Vite59950/59927保留；七个原有/其他会话路径不进入提交。

阶段一至六已完成实现与本地交付验收。真实屏幕阅读器、物理设备、IME与原生浏览器200%验收仍未执行；完整强制颜色/任意组合RTL未验证。页面按用户裁决只做桌面。1.0.0仍为未发布候选，远端GitHub CI、发布/tag/push及仓库外归档删除均未执行，阶段七保留明确批准门槛。

以下原有临时文件不纳入实现、提交或清理：`apps/docs/.__vc.html`、`apps/docs/.__vc.tsx`、`apps/docs/.__visual-compare.html`、`apps/docs/.__visual-compare.tsx`、`verify-probes.mjs`。其他会话更新的 provenance 收尾记录保留；来源历史无冻结原文的部分保持 UNVERIFIED。
