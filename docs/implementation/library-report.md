# Qingye UI 库侧实施与模块处置报告

日期：2026-10-02。范围：W00 库侧事实核对、W03 代表家族与公共缺口、W05 C001–C088 逐项处置。基线 HEAD：`f0de47747040dfe98d58598c0b5039bf2baed0ba`。用户最新决定将视觉定稿后置；本轮不采用三张已拒绝图片。

库侧已冻结，实际15个改动文件列表保存在JSON的changedFiles中。

完整逐项事实与来源指纹在 [library-module-review.json](library-module-review.json)。该 JSON 是内部实施证据，不进入包或公开网站。源码、jsdom、浏览器、辅助技术与人工视觉分别记录；88项均保留 UNVERIFIED 的完整C验收状态，不能把本报告的AST/单元测试结果当作全场景运行时通过。

## 实际修改与设计取舍

| 公共 owner | 真实任务 → 方法 → 取舍 → 结果 |
|---|---|
| Field / FieldGroup | 编辑多个字段 → M3/M4 → 字段内部与同段字段关系独立于控件高度/触摸目标 → 真正消费 `--qy-field-gap` 与 `--qy-field-group-gap`，默认仍8/20px，横向label/control仍12px。 |
| InputGroup | 点击前缀且调用方需要监听事件 → M2 → caller事件与共同外框聚焦协作、preventDefault可取消 → 不再因传入onMouseDown丢掉聚焦；子按钮仍自己获得焦点，不提交form；补InputGroupText slot。 |
| FileUpload | 重选满额队列中的文件、部分拒绝、继续恢复 → M1/M6 → 已有文件不再占一个新槽位；错误完整可读 → 去重先于限制，一次onReject报告真实新拒绝；受控列表只提案，按钮关联说明；长单文件错误换行。 |
| DataTable | 搜索中外部选择改变、已有数据刷新 → M3/M4/M6 → 搜索及工具仍常驻，bulk行按真实内容增高；刷新保留现有工作面 → 搜索draft/focus保持；loading仅data为空时用Skeleton；已有行内编辑不卸载。 |
| Tree | 未载入的惰性父节点、删除/外部折叠当前节点 → M1/M5/M6 → 结构声明与加载状态分开；恢复当前上下文但不抢树外焦点 → 可选hasChildren与受控展开兼容；优先可见父、再邻项、空树返回自身。 |
| TagInput | 重复标签或校验反馈 → M1/M4 → 持续说明与一次播报分工 → 去掉第二个live region，保留稳定polite播报与aria-describedby关联。 |

`--qy-action-gap` 默认 `var(--qy-space-2)`：DataTable 批量动作行已消费；docs owner 的 `apps/docs/src/patterns/patterns.css` 中 `.qy-task-actions` / `.qy-reading-nav` 同时消费。`--qy-section-gap` 继续由现有定义和任务recipe使用，不新增同义token。实际computed值由root浏览器验证，本轮只确认源码转发/消费链。

## 可观察的外观与兼容影响

- DataTable 选中后新增正常文档流的批量动作行，搜索/过滤工具保持可见，长批量动作可换行；表格相对旧overlay组合会随选择多占一行。此变化是明确的布局改动。
- DataTable `loading` 保留已有data对应行并标 `aria-busy`；初始空data仍显示Skeleton。调用方若要隐藏旧查询数据，应由它传入相应data，而不是依赖刷新清掉现有工作。
- FileUpload 长错误可增高行，不再被单行truncate隐藏。按钮式description现在属于可访问说明。
- Field 新关系角色接入后，改变global space-2/space-5仍会通过默认值影响间距，也可独立改新角色。默认控件高度、内尺寸、粗指针命中区及主题三轴未重写。
- TreeNode.hasChildren是可选、加法API，旧children数组规则仍成立；组件未增加数据请求、缓存或异步结果状态。它让无children的父节点也可通过展开回调发出意图。
- 组件文件无新增/删除，index集合仍88，不需要gen:index。未修改package.json、lockfile、upstream基线、apps实现或主覆盖表；无提交/推送/发布。

## coss 四个代表家族裁决

| 家族 | 来源与裁决 | 未通过替换来假造的能力 |
|---|---|---|
| Button / Group | coss派生视觉与Base UI/useRender仍可表达短/长动作、明确名称、受控busy和接合关系，继续保留。别名ButtonGroup直接回到Group。 | 业务批准、重复提交去重、接缝和触屏几何不能从源码继承宣称通过。 |
| Input / InputGroup / Field | coss外框/后代选择器仍承担公共边界，Base UI承担输入/Field语义；真实事件合并缺陷与关系入口在owner修复。未因选择器长就整套重写。 | IME、长附加内容和computed token仍需当前构建浏览器证据。 |
| Card / Frame / Layout | coss表面组合加本地Layout允许开放/围合/内嵌，并非强制每段Card；现API足以承载工作台和阅读。 | 卡片嵌套任务、阅读宽度和焦点裁切由recipe实际场景证明。 |
| Dialog / Sheet / Popover | coss视觉组合与Base UI原语提供名称、open/close、焦点及Portal基础；保留成熟底座，应用持有草稿与取消后果。 | 关闭窗口不等于取消后台任务；双document主题及焦点循环不能由jsdom冒称浏览器通过。 |

来源分类：88模块中55个为登记的coss派生模块、31个为本地组合、2个为纯别名。只修改两个coss登记文件（Field、InputGroup），adaptations与adaptedSha256已同步；upstream目录未改。此结论说明当前适用，不形成永久贴近上游的承诺。新理念优先，未来有可复现的结构限制时可在共享owner自建。

## Tree 可选扩展决定

**状态：已实现，待root独立审查。**

- Context：C053要求惰性展开、原位恢复与删除后合理焦点。旧实现仅以children.length判断父节点，且重新计算tabStop没有迁移被删除节点的实际焦点。
- Evidence：新夹具在旧实现失败3项（无children父节点无aria-expanded、删除child/root焦点落body）；现有受控展开和selection测试仍通过。
- Decision：增加TreeNode.hasChildren?:boolean，旧children规则仍有效。加载/error/retry为应用owner；仅旧焦点节点已移出DOM且document.activeElement为body时恢复，优先仍可见父级、邻项，空树可聚焦。
- Alternatives considered：伪造占位children会把加载/错误当成假节点；无条件focus会抢走外部工作；只改tabIndex不能修复实际丢焦点。因此采用显式结构声明与有条件恢复。
- Consequences：旧使用者无需迁移，新的可选声明需文档/meta同步。实际focus不等于selection；恢复不发onValueChange。没有持久数据变化、依赖变化或远程副作用。
- Verification：受控惰性展开、children到来、删除child/root、外部折叠、空树、外部焦点不抢回及主动离开后blur到body不恢复陈旧焦点的jsdom夹具通过；真实浏览器与读屏仍NOT_RUN。
- Revisit when：真实浏览器在shadow DOM/跨document聚焦表现异常，或应用需要多选/异步API时，重新查实际owner；不通过添加业务缓存扩展这个结构字段。

## 已执行验证

| 命令/检查 | 观察结果 | 证明边界 |
|---|---|---|
| pnpm --filter @qingye/ui test（基线） | PASS，50文件299测试 | 当前基线既有组件/静态断言。 |
| 首批新增回归（修前） | FAIL，5项 | InputGroup callback、FileUpload duplicate/description、DataTable隐藏toolbar/卸载editor。 |
| Tree新增回归（修前） | FAIL，3项 | 惰性父节点语义、删除child/root实际焦点。 |
| Tree陈旧焦点反例（首修后、补修前） | FAIL，1项 | 用户先离开树再blur到body，删除旧节点会抢回焦点；补onBlur清除记录后最终全库PASS。 |
| TagInput重复反馈断言（修前） | FAIL，1项 | 同notice存在两个polite live region。 |
| pnpm --filter @qingye/ui test test/input-group.test.tsx test/file-upload.test.tsx test/data-table.test.tsx test/field.test.tsx | PASS，4文件34测试 | 首批修复及既有alternate/controlled路径。 |
| pnpm --filter @qingye/ui test test/tree.test.tsx test/data-table.test.tsx --reporter=dot | PASS，2文件19测试 | Tree追加修复和DataTable loading true→false保留editor。 |
| pnpm --filter @qingye/ui test --reporter=dot（最终） | PASS，51文件314测试，16.00秒 | 包括7个Tree新增场景；含真实失败的回归和全量库静态AST颜色检查。 |
| pnpm --filter @qingye/ui typecheck（最终） | PASS | 库源码类型契约；不代表外观无影响。 |
| 88逐文件TypeScript AST与index集合核对 | PASS，88项无漏项；55 coss /31本地 /2别名 | 解析、导出、来源、slot、token引用及sha记录；不把源码当运行时。 |
| coss两项改动指纹核对 | PASS | adaptedSha256对应实际本地文件，upstream只读。 |
| git diff --check（分配边界） | PASS | 无空白差错。 |

没有在本worker启动浏览器或E2E runner。library build未运行，因为它会触发catalog生成、跨越此worker独占边界；root负责联合构建、catalog、capabilities/token-ledger以及包消费。最终新增input-group.test.tsx位于未跟踪文件清单，不能漏入后续交付。

## 88项处置清单

每项sourcePath、源码指纹、AST事实、直接测试文件、完整C预期、应用owner和具体待验证部位见JSON。下表的直接测试表示该文件实际断言已运行；不表示整个C场景、间接依赖或全部交互已覆盖。

| ID | 模块/owner | 处置 | 具体理由 | 已执行与剩余 |
|---|---|---|---|---|
| C001 | button | 保留现实现并补证据边界 | 保留受控loading、稳定children与Base UI render合并，操作含义不由variant推导。 | 3个直接测试文件已执行；浏览器 NOT_RUN |
| C002 | button-group → group | 保留现实现并补证据边界 | 保留纯重导出：ButtonGroup与Group是同一实现，不新增副本。 | 无直接行为测试；浏览器 NOT_RUN |
| C003 | toggle | 保留现实现并补证据边界 | 保留Base UI pressed选择语义和外部受控状态，不把pressed等同保存。 | 无直接行为测试；浏览器 NOT_RUN |
| C004 | toggle-group | 保留现实现并补证据边界 | 保留Base UI单/多选及受控约束；使用pressed语义，未换成Tabs。 | 无直接行为测试；浏览器 NOT_RUN |
| C005 | toolbar | 保留现实现并补证据边界 | 保留Base UI工具组原语与字段透传；DataTable已移除选择时遮挡查询的组合缺陷。 | 无直接行为测试；浏览器 NOT_RUN |
| C006 | copy-button | 保留现实现并补证据边界 | 保留原文值回调与Clipboard拒绝路径；复制成功只在writeText完成后表达。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C007 | command | 保留现实现并补证据边界 | 保留Autocomplete查询原语及Dialog承载；命令执行仍由调用方事件触发。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C008 | kbd | 保留现实现并补证据边界 | 保留语义kbd与KbdGroup；它是提示而非快捷键注册器。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C009 | input | 保留现实现并补证据边界 | 保留单一外框、Base UI输入语义和响应式控件内外尺寸。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C010 | input-group | 修复或接通公共关系 | 修复addon调用方事件覆盖内建聚焦；尊重preventDefault，交互子动作不被重定向；补text slot。 | 2个直接测试文件已执行；浏览器 NOT_RUN |
| C011 | textarea | 保留现实现并补证据边界 | 保留Field.Control接入、原生textarea属性与内容容量，切换承载不由组件清草稿。 | 无直接行为测试；浏览器 NOT_RUN |
| C012 | search-input | 保留现实现并补证据边界 | 保留查询value/defaultValue和明确clear，Escape先清查询再向外层传播。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C013 | password-input | 保留现实现并补证据边界 | 保留visibility独立受控/非受控值、稳定pressed标签和继承disabled。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C014 | number-field | 保留现实现并补证据边界 | 保留Base UI数字编辑与null语义，不新增空值归零转换；步长、范围及format透传。 | 无直接行为测试；浏览器 NOT_RUN |
| C015 | otp-field | 保留现实现并补证据边界 | 保留Base UI整体编码、粘贴与输入语义；分格只是表示。 | 无直接行为测试；浏览器 NOT_RUN |
| C016 | tag-input | 修复或接通公共关系 | 保留IME防误提交与tag/draft区分；修复同一notice的双live region，保留单一稳定播报和描述关联。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C017 | field | 修复或接通公共关系 | 将内部关系与同段字段关系分别接--qy-field-gap/--qy-field-group-gap；默认仍8/20px，横向label/control保留独立关系。 | 4个直接测试文件已执行；浏览器 NOT_RUN |
| C018 | fieldset | 保留现实现并补证据边界 | 保留原生fieldset/legend和disabled组语义，问题式legend不会改变字段身份。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C019 | form | 保留现实现并补证据边界 | 保留Base UI原生提交与外部errors接入；不从超时推断保存失败。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C020 | label | 保留现实现并补证据边界 | 保留原生label和render属性合并，可见标签不依赖placeholder。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C021 | checkbox | 保留现实现并补证据边界 | 保留checked/indeterminate基础语义和Base UI状态。 | 无直接行为测试；浏览器 NOT_RUN |
| C022 | checkbox-group | 保留现实现并补证据边界 | 保留Base UI受控组与字段集成，不擅自选全查询或跨页对象。 | 无直接行为测试；浏览器 NOT_RUN |
| C023 | radio-group | 保留现实现并补证据边界 | 保留Base UI互斥与无默认值配置，推荐内容不自动变选择。 | 无直接行为测试；浏览器 NOT_RUN |
| C024 | switch | 保留现实现并补证据边界 | 保留即时本地checked与Base UI开关语义，不冒充服务端保存。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C025 | slider | 保留现实现并补证据边界 | 保留Base UI范围、步长、多thumb和数值输出；非拖动点击由原语处理。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C026 | select | 保留现实现并补证据边界 | 保留Base UI高亮与已提交值分离、disabled跳过和原语命名空间。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C027 | native-select | 保留现实现并补证据边界 | 保留浏览器原生select、label/Field集成与disabled，不承诺跨设备同一popup外观。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C028 | combobox | 保留现实现并补证据边界 | 保留查询、候选、高亮与已选值的Base UI状态及chips/clear/status部件。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C029 | autocomplete | 保留现实现并补证据边界 | 保留自由输入及Base UI建议查询，关闭建议不会强制接收首项。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C030 | segmented-control | 保留现实现并补证据边界 | 保留共享样式模块供Tabs/Toggle等消费；它不导出虚构Root或发明统一选择语义。 | 无直接行为测试；浏览器 NOT_RUN |
| C031 | calendar | 保留现实现并补证据边界 | 保留DayPicker日期身份、locale/firstWeek等配置与状态class入口，不重新实现日期算法。 | 无直接行为测试；浏览器 NOT_RUN |
| C032 | date-picker | 保留现实现并补证据边界 | 保留严格本地ISO日期解析与清空；不会把歧义字符串猜为有效日期。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C033 | date-range-picker | 保留现实现并补证据边界 | 保留pending起点与apply后的值分离；关闭丢弃pending的现有契约明确，不冒称保存。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C034 | date-time-picker | 保留现实现并补证据边界 | 保留local datetime字符串与Date格式器；没有虚构内置IANA时区能力。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C035 | item | 保留现实现并补证据边界 | 保留默认静态row与render链接扩展；选择框、主链接、菜单由真实任务组合。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C036 | card | 保留现实现并补证据边界 | 保留静态Card及可组合header/panel/footer；表面边界不是自动可点击或必须卡片化。 | 无直接行为测试；浏览器 NOT_RUN |
| C037 | frame | 保留现实现并补证据边界 | 保留开放框架与独立FramePanel边界，不为阅读文本强加多层Card。 | 无直接行为测试；浏览器 NOT_RUN |
| C038 | group | 保留现实现并补证据边界 | 保留接合关系和独立child语义，别名回到相同owner。 | 无直接行为测试；浏览器 NOT_RUN |
| C039 | layout | 保留现实现并补证据边界 | 保留Stack/Inline/Grid/Text的角色间距和响应式grid；允许必要结构HTML。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C040 | separator | 保留现实现并补证据边界 | 保留Base UI decorative/语义分隔与orientation透传，边界职责由使用处决定。 | 无直接行为测试；浏览器 NOT_RUN |
| C041 | resizable | 保留现实现并补证据边界 | 保留受控尺寸、键盘及非拖动公开resize能力；不卸载panel内容。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C042 | scroll-area | 保留现实现并补证据边界 | 保留Base UI viewport/content/scrollbar与原生滚动能力，不重做全局滚动控制。 | 无直接行为测试；浏览器 NOT_RUN |
| C043 | aspect-ratio | 保留现实现并补证据边界 | 保留相对比例容量和render插槽；媒体真实尺寸/失败属于children。 | 无直接行为测试；浏览器 NOT_RUN |
| C044 | page-header | 保留现实现并补证据边界 | 保留身份内容、返回与actions分解以及默认flex换行，不固定每页同一构图。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C045 | sidebar | 保留现实现并补证据边界 | 保留受控展开、mobile Sheet承载、路由无关的active入口与名称locale。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C046 | navigation-menu | 保留现实现并补证据边界 | 保留Base UI站点导航link语义与浮层，不套用应用命令Menu。 | 无直接行为测试；浏览器 NOT_RUN |
| C047 | breadcrumb | 保留现实现并补证据边界 | 保留语义nav/当前page与可组合ellipsis，ellipsis不虚构历史。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C048 | tabs | 保留现实现并补证据边界 | 保留Base UI activationMode等透传，焦点与selection可通过手动激活分开。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C049 | accordion | 保留现实现并补证据边界 | 保留Base UI单/多开配置和标题-panel关联，不改原语键盘模型。 | 无直接行为测试；浏览器 NOT_RUN |
| C050 | disclosure | 保留现实现并补证据边界 | 保留Collapsible原语与就近触发/Panel，补充信息不强制路由深入。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C051 | collapsible | 保留现实现并补证据边界 | 保留Base UI受控open和Panel解剖；外部折叠焦点要求需浏览器验证，源码不当通过。 | 无直接行为测试；浏览器 NOT_RUN |
| C052 | pagination | 保留现实现并补证据边界 | 保留可组合link及current页语义，不假造未知总数的末页。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C053 | tree | 修复或接通公共关系 | 新增可选hasChildren供惰性父节点准确表达；修复删除/外部折叠焦点丢失，优先父/邻项，外部焦点不抢回。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C054 | dialog | 保留现实现并补证据边界 | 保留Base UI modal、名称、close和Portal；长表单Panel保留独立工作区。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C055 | alert-dialog | 保留现实现并补证据边界 | 保留alertdialog语义与明确取消/确认part；无持久approved业务布尔状态。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C056 | sheet | 保留现实现并补证据边界 | 保留Dialog原语和side承载，响应式改变载体的draft在应用。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C057 | drawer | 保留现实现并补证据边界 | 保留Drawer原语和可见Close，滑动不是唯一关闭方式。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C058 | popover | 保留现实现并补证据边界 | 保留交互Popover、Title/Description/Close和定位，避免Tooltip承担任务。 | 无直接行为测试；浏览器 NOT_RUN |
| C059 | menu | 保留现实现并补证据边界 | 保留Base UI命令/disabled/submenu模型及shadcn别名。 | 无直接行为测试；浏览器 NOT_RUN |
| C060 | context-menu | 保留现实现并补证据边界 | 保留ContextMenu原语和Menu同族部件，不把右键当唯一业务入口。 | 无直接行为测试；浏览器 NOT_RUN |
| C061 | menubar | 保留现实现并补证据边界 | 保留Base UI顶层键盘模型，并复用menu各部件而非复制实现。 | 无直接行为测试；浏览器 NOT_RUN |
| C062 | tooltip | 保留现实现并补证据边界 | 保留Base UI短说明Provider/trigger/popup；不把风险文案或按钮藏进tooltip。 | 无直接行为测试；浏览器 NOT_RUN |
| C063 | hover-card → preview-card | 保留现实现并补证据边界 | 保留纯重导出到preview-card，summary不是唯一详情入口。 | 无直接行为测试；浏览器 NOT_RUN |
| C064 | preview-card | 保留现实现并补证据边界 | 保留Base UI预览卡和可组合内容，不把模糊当权限保护。 | 无直接行为测试；浏览器 NOT_RUN |
| C065 | table | 保留现实现并补证据边界 | 保留语义table二维关系、行密度和overflow-x容器；长单元格可按列覆盖wrapping。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C066 | data-table | 修复或接通公共关系 | 修复selection覆盖toolbar及loading卸载已有行；保留稳定ID、跨页ids/当前rows区分和受控状态。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C067 | description-list | 保留现实现并补证据边界 | 保留dl/dt/dd关系、原文copyValue和可换行值；没有把不同缺值归为0。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C068 | typography | 保留现实现并补证据边界 | 保留Heading level与视觉size分离、中文lang字距策略和Prose阅读排版。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C069 | stat | 保留现实现并补证据边界 | 保留value children与单位/description关系，unknown可提供明确文本；涨跌可inverse/custom label。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C070 | chart | 保留现实现并补证据边界 | 保留Recharts成熟底座、config和legend/tooltip适配；不自行生成业务数据。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C071 | code-block | 保留现实现并补证据边界 | 保留原文code与精确复制、wrap/scroll和工具区，不用装饰改写文本。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C072 | badge | 保留现实现并补证据边界 | 保留静态分类标记与render扩展；交互语义须显式选择实际按钮/链接。 | 无直接行为测试；浏览器 NOT_RUN |
| C073 | status-dot | 保留现实现并补证据边界 | 保留文本/locale等价状态和pulse可停；neutral可配待核实label，不把unknown当online。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C074 | alert | 保留现实现并补证据边界 | 保留持久就近title/description/action与role覆盖能力；视觉variant不决定是否assertive。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C075 | toast | 保留现实现并补证据边界 | 保留Base UI manager add/update和locale/close，不抢业务焦点。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C076 | empty | 保留现实现并补证据边界 | 保留可组合说明和入口，不内建一个暂无数据包办无权限/失败。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C077 | skeleton | 保留现实现并补证据边界 | 保留装饰占位与集中motion；DataTable刷新现保留实际工作。 | 无直接行为测试；浏览器 NOT_RUN |
| C078 | spinner | 保留现实现并补证据边界 | 保留loading可访问名称与decorative override；没有伪造进度或业务成功。 | 无直接行为测试；浏览器 NOT_RUN |
| C079 | file-upload | 修复或接通公共关系 | 修复满额duplicate误拒绝、button description关联与错误截断；保留controlled proposal、progress/error/actions。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C080 | progress | 保留现实现并补证据边界 | 保留Base UI number/null阶段进度与Label；null是真实未知进度，100不自动等于业务成功。 | 无直接行为测试；浏览器 NOT_RUN |
| C081 | progress-circle | 保留现实现并补证据边界 | 保留min/max归一、null/非有限值未知处理与getAriaValueText；小尺寸可配外部标签。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C082 | meter | 保留现实现并补证据边界 | 保留Meter测量语义、min/max和格式，不把测量值复用成进度。 | 无直接行为测试；浏览器 NOT_RUN |
| C083 | steps | 保留现实现并补证据边界 | 保留显式item.status覆盖current派生，可让已访问步骤保持upcoming；访问回调不改完成事实。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C084 | timeline | 保留现实现并补证据边界 | 保留稳定id、可选time/dateTime及人工顺序，不给未知时间补假日期。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C085 | avatar | 保留现实现并补证据边界 | 保留Base UI图像加载/fallback，调用方提供对象身份/alt策略。 | 无直接行为测试；浏览器 NOT_RUN |
| C086 | carousel | 保留现实现并补证据边界 | 保留受控index、dots直达、键盘和可选autoplay pause行为。 | 1个直接测试文件已执行；浏览器 NOT_RUN |
| C087 | theme-provider | 保留现实现并补证据边界 | 保留documentElement主题写入、class/attribute配置与brand/density独立。 | 2个直接测试文件已执行；浏览器 NOT_RUN |
| C088 | motion-provider | 保留现实现并补证据边界 | 保留输入方式监听与集中motion策略，不以animationend更新业务结果。 | 1个直接测试文件已执行；浏览器 NOT_RUN |

## 剩余运行时证据

root需在当前构建验证：Field默认/品牌/compact的实际gap与控件/触摸尺寸互不串改；InputGroup invalid与child焦点外框；DataTable长bulk动作390px换行、选中与刷新实际焦点；FileUpload长错误与actions容量；Tree真实DOM删除/折叠和焦点离开；两document主题+Portal以及相关前景/背景对比。

所有模块的真实中文输入法、实际移动软键盘、真实系统文件选择器和辅助技术播报仍按适用边界NOT_RUN。人工视觉定稿后置，不能由这次单元测试收口Q05/Q06，也不能把旧352页扫描宣称成当前改造的新验收。

## 根审查补修：reduced-motion 的 Input 主题文字过渡

root 的最终打包消费浏览器检查在 `prefers-reduced-motion: reduce` 下发现真实失败：light → dark 后两个有值 Input 的前景仍为 `oklab(0.145 0 0)`，暗背景约 RGB(28.396, 28.396, 28.396)，对比度 1.1667:1，低于普通文字 4.5:1。失败证据保留在 `test-results/packed-consumers/run-8ri0hv/report.json`，不能以此前类型/单元测试通过覆盖此发现。

根因是 `motion.css` 的 reduced 分支把所有 slot 的 transition-property 扩为包含 color，而 Input 既有 autofill 策略只设 `background-color 5000000s`；长 duration 随过渡列表被用于文字颜色，导致主题切换后文字极慢变化。此次只在公共 motion owner 的 reduced 分支增加 `input[data-slot="input"]` 覆盖，保留仅 background-color 过渡。其具体性至少等于前面的通用 slot 规则，且位于其后；原时长、autofill 策略、主题 token、Input 源码/props 和其它控件的 reduced 规则保持不变。Input 的文字颜色不再加入这个极长过渡，背景策略仍由原组件负责。

本子任务验证：PostCSS 解析与限定分支/规则顺序/声明检查 PASS；确认既有 autofill 长背景过渡仍在 Input 源码、非 reduced 内容未改变；限定文件 diff-check PASS。没有启动浏览器；修复后的最终 tar 对比度与主题切换运行时结果仍由 root 使用原失败断言复验，本段不将其记为 PASS。AI 试验使用 root 已冻结的 `scripts/ai-eval/target-ui`，此次产品 CSS 修复未编辑其目标或资料。
