# 内容、数据与基础组件审查记录

日期：2026-10-02。范围：下表 39 个组件、各自公开元数据和示例，以及复制 Hook。开工 HEAD 为 `9d51f7a`，工作区已有其他未提交工作；本轮在分配的文件边界增量修改，没有恢复其他代理或用户改动。上游基线不改写，派生来源由主代理统一登记。

依据根 `design.md`、`STANDARDS.md` 和当前网站消费端裁决，先核对对象语义、数据关系、状态归属、恢复路径与内容容量，再决定是否需要实现变化。所有 39 份 `meta.design` 都写入组件自身的具体用法、避免事项、组合、库与应用归属、响应式容量和修改入口；这些说明供公开设计指南消费，并不增加到示例界面上。

## 实现变化与实际契约

- **CopyButton / useCopyToClipboard**：以前写入期间没有可见等待或请求归属，过期 Promise 可以覆盖较新的结果，卸载后仍可调用成功/错误回调，空字符串被静默跳过。现在每次调用分配请求序号，只有当前且挂载中的请求能反馈；等待期间使用 Button 的 loading 表达并阻止重复点击。值读取函数异常、同步抛错、API 不可用和拒绝均走可恢复失败。空字符串按 `value` 的精确文本契约写入。Hook 新增 `isCopying`，`copyToClipboard` 仍返回 void。当前 CopyButton 额外接受 `loading`，与内部 pending 合并；HEAD 原本排除了此属性，属于可选 API 扩展，不是旧消费者兼容需要。
- **CodeBlock**：旧行号类将整个 code 设为二列网格，却把完整行作为网格子项，交替行会占据不同列。改为每一行自身拥有行号 gutter，并让高亮 inline 节点保持 inline；长行可在代码区滚动，wrap 后续行从正文起点继续。没有原始 `code` 的高亮节点按 `data-line` 拼接换行，保留空行；传入 `code` 时仍原样复制源字符串。
- **DateRangePicker**：此前快捷范围绕过 `disabledDates`，自定义完整范围提交也未统一验证 min/max/excludeDisabled；外部直接关闭受控弹层后半选 anchor 可能残留。现在快捷项与完整提交共用范围规则；端点不可为禁用日，只有调用方指定 `excludeDisabled` 时才拒绝跨过内部禁用日。min/max 按自然日跨度，导航 startMonth/endMonth 不冒充可选边界。非法终点建立新起点并保留正式值，关闭丢弃半选。`calendarProps` 精确为范围模式属性，调用方的日期 hover/focus 回调继续转发。
- **DateTimePicker**：选择日期前修改时间会自动生成今天，“此刻”也能绕过禁用今天的规则。现统一检查实际 `disabledDates`，禁止的今天对应“此刻”和空日期的时间输入不可用；合法的已有日期仍能编辑时间。组件表达本地日期时间，没有扩张为时区预约或服务端有效性校验。
- **Carousel**：旧根容器收到嵌套 Tabs 等控件的方向键会移动幻灯片。现在只有聚焦轮播轨道时方向键归轮播，轨道进入 Tab 序列；嵌套控件保留自己的键盘行为。调用方 onKeyDown 先执行且能阻止默认行为。
- **Tree**：父 treeitem 直接从嵌套 group 得到名称，会夹带全部后代文字。现在使用节点自己的标签与后缀关联 `aria-labelledby`。外部将当前焦点节点禁用时，恢复到可聚焦邻近节点；外部按钮上的焦点不被抢回，选择值不被隐式改写。
- **Resizable**：尺寸为零的面板保留 DOM 和草稿，但加 inert，退出焦点与可访问树。非零折叠侧栏仍可用。这里不增加工作保存、重新挂载或伪造持久化。
- **StatSparkline**：此前过滤缺测再画线，压缩了时间位置，并把缺口连成有数据的趋势。现在非有限值保留其时间槽并断线，每段面积独立闭合；末项缺测不显示最新值圆点。数值、方向与好坏规则继续归应用。
- **ChartContainer / Timeline**：ChartContainer 的显式 id 转发到真实容器，恢复外部标签/定位关系；Timeline 的 time/description/content 用空值判断，保留数值 0。
- **Toast**：长文件名描述能够换行，文字栏允许收缩，图标不挤压文本；含操作的通知在窄屏将操作移到下一行。通知 Promise 和结果来自消费端，不增加模拟“成功”。
- **Badge / Kbd / DatePickerTrigger**：根代理浏览器发现 Badge destructive 白字填色组合不达文字对比要求、Kbd 深色 4.44、日期空值额外 alpha 后约 3.1。Badge 改用既有 destructive-fill/on-fill 角色；Kbd 默认 foreground、按钮内 current 不额外降 alpha；三个日期组件共享的 placeholder 取消 /72。没有更改全局色值或放宽检查阈值。
- **AspectRatio / Carousel 示例**：首个比例示例与内容封面改用仓库已有照片；课程卡片原有未实现播放按钮的装饰删去，照片标题在图外。Carousel 首例由渐变假商品改为照片集，保留真实上一张、下一张、指示点和滑动。没有删除示例视觉，也没有下载新媒体。

## 逐组件处置与验证

“保留”表示读取实现并按本轮边界未发现需要重构的确定缺口，不表示所有状态已验收。表中单测数量为实际观察通过的该文件测试数；未列专属测试的组件没有在本轮伪造新增测试。jsdom 不计算最终 CSS 几何或读屏行为。

| 模块 | 处置及具体设计判断 | 本轮已有/新增验证与边界 |
|---|---|---|
| AspectRatio | 保留有效 ratio 归一化和媒体占位；示例用真实照片说明裁切而非手绘占位或假播放。替代文本归媒体，框架不代替图片语义。 | 源码核对非法 ratio 回落 1、直属媒体尺寸与 render 转发；真实图片加载/裁切交主代理浏览器。无专属单测。 |
| Avatar | 保留 Base UI 图像加载/fallback 原语；人物、组织与在线状态分别表达，fallback 不是独立新身份。 | 核对 root/image/fallback 部位、props 转发和尺寸；图片失败时序、替代文本重复与读屏为 UNVERIFIED。 |
| Badge | 只修 destructive 填色文字角色；标签默认静态 span，需要链接/按钮时使用 render 且由消费端提供行为。状态不能仅由颜色识别。 | 根代理实测旧填色 FAIL，修复已消费既有成对 token；修后实际文字和 hover 对比度待主代理。无专属单测。 |
| Calendar | 保留 DayPicker 选择与键盘原语、locale 和自定义部位。月份导航边界与可选日期不同；范围限制由具体 picker 正确接入。 | 本轮 DatePicker/Range/Time 专属测试间接覆盖真实日历选择与禁用；Calendar 自身全部 caption/多选/读屏状态未逐一验收。 |
| Card | 保留容器、header/content/footer 的视觉部位；避免因为有框就制造另一层信息。标题级别和整卡链接关系由调用方选定。 | 核对 header action 的网格关系、content 容量和 render；无专属单测，长无空格标题与操作窄屏几何待浏览器。 |
| Carousel | 修方向键归属，轨道可聚焦；保留 RTL、可见位置、按钮和 dots 的滚动反馈；首例改真实照片。 | `carousel.test.tsx` 6 PASS，新增嵌套控件方向键不触发轮播，已有轨道按键/位置覆盖；惯性触摸和 CSS snap 仍需浏览器。 |
| Chart | 修 id 转发，保留配置颜色变量和 Recharts 展示层。图形摘要、量纲与缺测事实仍需应用提供。 | `chart.test.tsx` 6 PASS，新增既有容器断言 id，已有配置/tooltip/颜色覆盖；不是图形信息无障碍或所有图形对比度认证。 |
| CodeBlock | 修逐行行号 gutter 与高亮节点复制换行；可复制源与显示源保持关系，滚动区域可聚焦。 | `code-block.test.tsx` 5 PASS，新增多行+空行真实剪贴板参数；行号排列、wrap/横滚、伪元素对比交浏览器。 |
| CopyButton | 修请求等待、结果归属、异常与失败后重试；按钮反馈源自真实 Clipboard Promise，结果用已有 locale。 | `copy-button.test.tsx` 12 PASS：pending 禁止重复、Hook 新请求压过旧失败、卸载抑制结果、空文本、值读取异常恢复等；真实权限提示与系统剪贴板未由子代理测。 |
| DataTable | 保留现有 TanStack 搜索/排序/分页/选择所有权和刷新不卸载行编辑器。受控分页不会替调用方发请求，列可隐藏策略由应用决定。 | `data-table.test.tsx` 11 PASS，包含编辑器草稿/焦点在刷新中存续、外部选择保留搜索、禁用行、中文排序和手动分页；大数据性能和宽表触屏未测。 |
| DatePicker | 仅修共享空值文字角色；已有外部 label 加值关联、清除回焦点、本地自然日隐藏字段维持。 | `date-picker.test.tsx` 7 PASS；不将 required 隐藏字段当原生完整校验方案；字体对比与 popup 几何交主代理。 |
| DateRangePicker | 修所有输入途径同受端点/min/max/excludeDisabled 规则、非法选择恢复和外部关闭放弃半选。正式值与临时选择分开。 | `date-range-picker.test.tsx` 13 PASS，新增快捷绕过、限制+恢复、外部关闭保留正式值、默认允许内部禁用日；DST 各时区设备和读屏未测。 |
| DateTimePicker | 修“此刻”及先输入时间绕过禁用日；已有合法日编辑不被今天禁用连带阻断。保留本地字符串契约。 | `date-time-picker.test.tsx` 6 PASS，新增禁止今天的旁路和已有合法日期恢复路径；原生 time 选择 UI 跨平台未测。 |
| DescriptionList | 保留 dl/dt/dd 和 grid/inline 关系；说明区分零、未知和未填写，复制值由应用给出而非抓装饰文字。 | `description-list.test.tsx` 2 PASS，定义列表与精确复制值；长值的 wrap 和触摸复制命中交浏览器。 |
| Empty | 保留标题/内容/动作组合；把空集合、无匹配、权限缺失区别放在具体内容与有效恢复动作上，不新增通用大段说明。 | `empty.test.tsx` 2 PASS，props 唯一转发、嵌套容器标题尺寸；不是每种业务空态验收。 |
| Frame | 保留嵌套分组轮廓与部位，避免当作有独立业务含义的卡片；共享侧与密度来自真实组合。 | 源码核对 render/slots/嵌套样式；无专属单测，密集表单和两轴主题几何未测。 |
| Item | 保留列表关系与 render 语义，整行链接和独立操作按任务分开；不把视觉 hover 当可点击声明。 | `item.test.tsx` 2 PASS，列表项、独立 Item 与链接转发；嵌套行操作触屏和长描述未测。 |
| Kbd | 修默认文字和按钮内快捷提示额外 alpha；快捷键来自应用实际绑定，不以提示发明行为。 | 根代理旧深色实际 FAIL 4.44，修后 computed 待其复测；无专属单测。 |
| Label | 保留 Base UI label 原语和消费端 htmlFor/id 对应；不会从视觉就推断 required 或字段错误。 | 日期/Resizable 新示例有真实 label；Forms 家族与日期专属测试间接覆盖，Label 未独立进行读屏验收。 |
| Layout | 保留 Stack/Inline/Grid/Text 的间距 token 与多态结构；同一排内对齐、窄屏折行和最小项宽按内容组织。 | `layout.test.tsx` 4 PASS，token gap、as/ref、Text 继承与 Grid 容器列；实际几何需浏览器。 |
| Meter | 保留 Base UI meter 有限区间测量语义，和任务进度分开；值/上下界/低高阈值来自数据。 | 源码核对原语 props 与 label/value 部位；无专属测试，异常上下界和读屏未新增验收。 |
| MotionProvider | 保留 document 输入方式监听与卸载恢复；它区分指针/键盘，不是业务动画状态或请求管理器。 | `motion-provider.test.tsx` 2 PASS，输入切换及旧属性恢复；实际 reduced-motion 视觉节律交主代理。 |
| PageHeader | 保留主标题/描述/返回/操作的关系；返回动作由应用路由负责，标题层级由页面结构决定。 | `page-header.test.tsx` 2 PASS，h1/返回 callback/render 链接；长标题和主次操作在窄屏需浏览器。 |
| Progress | 保留 Base UI progress 的已知/未知进度语义；完成不自动意味着后台任务成功，业务任务 ID 与重试由应用负责。 | 源码核对 Root/Label/Value/Indicator 转发与未知状态；无专属单测，取消/失败任务全链未测。 |
| ProgressCircle | 保留 determinate/indeterminate 的值表达，数字与进度条有可访问名称；视觉圈不替代结果状态。 | `progress-circle.test.tsx` 3 PASS，68/未知/零/自定义 max；svg 实际对比和运动需浏览器。 |
| Resizable | 修零尺寸面板 inert，保留 DOM 草稿与非零折叠栏；拖动尺寸变化不转化为业务保存。 | `resizable.test.tsx` 11 PASS，新增零尺寸 inert 与恢复草稿；已有限制/键盘/RTL/折叠覆盖。jsdom 不执行浏览器 inert Tab 行为。 |
| ScrollArea | 保留 Base UI 视口和滚动条，内容尺寸与上层滚动关系由组合决定，不能以固定高裁掉必要内容。 | 核对 viewport、bars、children 和焦点原语；无专属单测，真实惯性/边缘滚动/长内容待浏览器。 |
| Separator | 保留装饰默认与非装饰语义选择、方向原语；空间已经分组时不额外堆线条。 | 源码核对 orientation/props；无专属单测，组关系由具体页面评估。 |
| Skeleton | 保留无交互占位；只在数据尚未有可见内容时使用，刷新已有工作不应替换编辑器。 | 核对动画部位；DataTable 刷新测试证明现有表格工作保留。通用 Skeleton 没有制造数据或加载完成测试。 |
| Spinner | 保留图形装饰默认及 locale label 选项；等待必须由真实 pending 驱动，与未知进度语义不混淆。 | CopyButton 真实待处理使用 Button loading；Spinner 专属无测试，读屏重复反馈未测。 |
| Stat | 修 Sparkline 缺测时间位置；具体设计明确单位/周期/方向/好坏、零与缺测不同，同级指标保持可比字号。 | `stat.test.tsx` 3 PASS，新增断线几何和末值缺测点；平坦曲线/单位现有覆盖，图形对比及真实数据解释由应用补充。 |
| StatusDot | 保留无可见标签时的本地化隐藏文字；在线/异常不是只靠颜色，pulse 只表达当前动态。 | `status-dot.test.tsx` 2 PASS，隐藏/可见名称与离线不 pulse；实时状态正确性由应用提供。 |
| Table | 保留原生 table/thead/tbody 与容器横向滚动，密度/粘头不破坏数据比较；不把宽表硬改为失去关系的卡片。 | `table.test.tsx` 1 PASS，容器、density、stickyHeader、render/scroll 类；真实列容量和粘头效果需浏览器。 |
| ThemeProvider | 保留单 document 明暗写入、存储/系统/跨 tab 同步；品牌与密度是独立轴，不增加第二套主题状态。 | `theme-provider.test.tsx` 7 PASS，system、存储恢复/非法值/null、属性模式、跨 tab、prepaint；本轮不宣称消费项目主题全部覆盖。 |
| Timeline | 修 0 被 truthy 判断丢弃；保留事件顺序、时间和进度状态部位，连接线不是另一个进度事实。 | `timeline.test.tsx` 3 PASS，新增 time/description/content 数值 0；长时间文本和任意自定义内容交浏览器。 |
| Toast | 修长描述收缩换行和窄屏动作关系；通知只陈述实际结果，长任务与失败记录有持久访问路径。 | `toast.test.tsx` 11 PASS，现有 manager/Promise/操作/定位；新长内容的 CSS 效果只能浏览器确认。 |
| Tree | 修节点名称后代串读与外部禁用焦点恢复；保留选择和展开是不同状态，焦点恢复不改业务选择。 | `tree.test.tsx` 12 PASS，新增外部禁用，名称断言更新；已有箭头/RTL/typeahead/禁用覆盖。实际读屏嵌套层级未测。 |
| Typography | 保留 Heading 语义与视觉尺寸分离、Prose 容量、TextLink 外部语义；公开 API 不再用旧数值冒充当前 token。 | `typography.test.tsx` 3 PASS，标题 level/size、外部链接提示与安全 rel、Prose render；长篇跨脚本文字排版未测。 |
| Alert | 保留已经正确的 icon/title/description/action 与窄屏动作独立行。默认 role=alert 没有偷偷改契约；常驻一般信息由应用选择合宜 role/status/无 live role。 | `alert.test.tsx` 6 PASS，含图标/无图标和动作手机跨度、部位与变体别名；初始 alert 宣告时机及真实网格长内容为 UNVERIFIED。 |

## 实际执行的检查

本轮分批运行 25 个不同的专属测试文件，合计 **142 个不同测试通过**。CopyButton 在最后代码变化后重复执行一次，其重复次数不加进不同测试总数。

- 第一轮修复后：CopyButton、Carousel、Tree、Stat、Resizable、DateRangePicker、DateTimePicker，7 文件 63 PASS。
- Chart、Timeline、Toast，3 文件 20 PASS。
- 最终复制/代码/日期文本变化后：CodeBlock、CopyButton、DatePicker，3 文件 24 PASS，其中 CopyButton 12 为复跑。
- 保留实现的其余专属文件：Alert、DataTable、DescriptionList、Empty、Item、Layout、MotionProvider、PageHeader、ProgressCircle、StatusDot、Table、ThemeProvider、Typography，13 文件 47 PASS。
- `pnpm --filter @qingye/ui typecheck`：最终源码后 exit 0。
- `pnpm --filter docs typecheck`：39 份 metadata 与新示例后 exit 0。

修复前曾运行复制/轮播/树/指标/折叠五文件，44 测试中 33 PASS、11 FAIL，并观察一次值读取异常未处理；该红灯直接证明了其中状态与回退缺口。日期、Toast CSS 和 CodeBlock 布局的缺口来自源码/实际消费者路径分析，本轮不声称所有新测试都先在旧实现上跑红。根代理另提供旧构建实测文字对比证据 `test-results/home-renovation/text-contrast-before.json`；这里不把旧测量当作修复后验收。

## 主代理串行浏览器复核入口

Playground 地址为 `/playground/<slug>`，可用 `?theme=light` / `?theme=dark`；`section[data-demo]` 的值由文件去掉数字前缀生成。以下是可执行场景，不是已通过结论。建议桌面与 390px、浅/深色各核实变化处；主代理可将其最终证据补入整体执行记录。

| 路径及 data-demo | 可访问名称/定位 | 行为与恢复断言 |
|---|---|---|
| `/playground/aspect-ratio`，`basic` / `media-card` | img「阳光穿过林间的树木」及山图 | 图片 naturalWidth > 0；实际外框为 16:9；裁切无拉伸；文字在图外；无假播放入口。 |
| `/playground/carousel`，`default` | region「摄影集」，上一张/下一张与 dots | 4 张真实照片有资源、页码与按钮边界对应实际滚动；触摸拖动和 RTL 按当前实现核实。 |
| `/playground/carousel`，`nested-controls` | region「文章方案」，tablist「文章视图」，tab「摘要」「正文」 | 聚焦轨道方向键移动轮播；聚焦摘要 tab 后方向键变 tab，轮播 scrollLeft 不变；只有真实可见位置驱动 dots。 |
| `/playground/date-range-picker`，`constraints` | button「分析窗口」；presets「9月4日—7日」「9月10日—15日」「整个9月」；日期名含「2026年9月10日」 | 后两快捷项 disabled，合法项可用；10→15 不提交跨禁用范围，15→18 能合法恢复提交；重新打开从 4 选择半段并 Esc，正式范围保留且「结束日期」消失。不要把 min2 理解为含首尾两个日历格。 |
| `/playground/date-time-picker`，`availability` | button「预约时间」；input「时间」；button「此刻」 | 最早可预约明天；初始时间与此刻 disabled，禁用今天不能绕过；选择明天后时间可编辑，选中值保持本地日期。平台原生 time 外观需实际平台核实。 |
| `/playground/resizable`，`draft` | textbox「发布草稿」；button「收起编辑区」「继续编辑」；separator「调整编辑区宽度」 | 修改草稿，收起后面板尺寸0且 inert，Tab 不再落进草稿；继续编辑后原内容保留；separator 键盘可调，非零侧栏不被错误 inert。 |
| `/playground/tree`，`availability` | tree「工作文件」；treeitem「季度报告」「归档记录」；button「暂停报告访问」 | 普通点击外部按钮后焦点仍在按钮。为测外部状态注入，可保持报告节点焦点，DOM `.click()` 外部按钮（不调用 focus）；报告禁用后焦点移到归档记录，选择不随之改变；恢复访问后可再次访问。父节点应仅由自身标签命名。 |
| `/playground/toast`，`long-content` | button「查看导入结果」；Toast action「查看失败记录」；list「失败记录」 | 发出长文件名通知，窄屏文字和 action 不被挤出/截断；action 打开实际 18/29 行错误明细，Toast 关闭后明细仍可见。timeout0 持续直到关闭，不等待假自动成功。 |
| `/playground/code-block`，`header` / `scroll` / `highlighted` | pre `[data-slot=code-block-pre]`；button「复制代码」；`[data-line]` | 各行从上至下排列而非两列交替；长行只在 pre 内横滚，限高纵滚；wrap 后续行与本行正文起点对齐；行号伪元素与背景文字对比；复制原文/空行与显示关系真实。 |
| `/playground/copy-button`，现有各 demo | button「复制」或例中 copyLabel，`[data-status]` | 将 writeText Promise 暂缓，观察 copying/aria-busy/禁用且无重复写入；resolve 后 copied；拒绝后 failed 和可再次操作；真实权限/剪贴板只由浏览器 owner 操作。 |
| `/playground/badge`、`/playground/kbd`、三个日期入口 | Badge destructive 内容、Kbd 快捷键、日期空值 | 在最终构建测实际背景合成对比度 ≥4.5；Badge 可交互 hover 另测，Kbd 按钮内组合另测。此处不将 CSS 类存在视为达标。 |

## 尚未证明的边界

子代理未启动浏览器、未执行完整集成构建/全库静态门禁、未生成源哈希台账、未提交或推送。浏览器复核与共享来源/生成产物由主代理拥有。真实读屏、物理触屏、跨平台原生时间控件、真实异步业务请求和全部自定义主题组合均不能由这轮单测宣布 PASS。没有专属测试的简单原语以源码处置记录与主代理浏览器扫描为当前证据；所有组件均已认真审查，不等于所有状态均已验证。
