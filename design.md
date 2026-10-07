# Qingye UI 设计指南

**器用为本，关系为法，合宜为度。**

这份文件帮助人和 AI 作出界面设计决定。它说明如何命名、组织、呈现和承接任务，不是组件 API 清单，也不表示文中提到的能力已经实现。使用组件时，仍需读取当前安装版本的类型、文档和示例。

Qingye UI 从中国传统的经典与东方美学中取法：思想给出判断的次序，造物给出尺度的法度，书画与园林给出疏密、墨色、线与位置的经营。**取其法，不取其形**——文化参与具体判断，界面不使用传统图案、仿古字体或印章卷轴一类装饰。专业工具、内容展示与日常应用可以有不同面貌。

设计理念决定目标，实现来源服从目标。本库组件为原创实现，依据本文件、`STANDARDS.md` 与无障碍原语的公共 API 编写。是否使用无障碍原语和其他成熟底座另行依据实际能力判断，不因替换外观层而重复发明所有基础交互。

## 开始设计前

先从需求与现有项目中确定以下信息。能查到的事实自行查证，仅在缺失信息影响正确性时询问用户。

- 人要完成什么；阅读、比较、创作、暂停、拒绝与退出都可以是目标。
- 当前对象、操作范围和真实状态是什么；什么结果算完成。
- 哪些内容必须同时出现，哪些可以按需展开。
- 哪些输入、选择、位置和已完成工作需要保留，保留到什么时候。
- 当前可用的组件、公共组合、项目主题和验证命令是什么。

不要通过新增按钮、更多层级或文化术语，补足本来不存在的需求。

## 三件事的顺序

任何界面决定都按这个顺序做，不跳步。

**先定语义，再定关系，最后定表达。** 语义是对象、动作、范围与真实状态；关系是它与其他内容、操作、说明和保护之间的相互支持与制约；表达是表面、强调、尺寸与动效。跳过前两步直接选外观，是把设计当成装饰。

**表达服从判断，判断服从任务。** 没有任务依据的差异应收敛；有任务依据的差异必须保留。参考实现、流行样式与个人偏好在任务依据面前不作数。

**能组合解决的不增加配置，能复用关系的不新增组件。** 《老子》：「少则得，多则惑。」每多一个属性、变体或组件，就多一个需要判断的决策。设计系统的主要价值是消除无价值决策，而不是提供更多可能。

**文质彬彬。** 语义与关系是质，表达是文。《论语·雍也》：「质胜文则野，文胜质则史。」语义正确而形制粗糙，与外观精致而状态失真，同样不算完成。两者各有方法：质依下文的器用六法，文依表达九法；分别判断，不互相代替。

## 总纲与取法

| 总纲 | 出处 | 含义 |
|---|---|---|
| 器用为本 | 《易·系辞》「形而下者谓之器」；《考工记》以「良」论器 | 组件是器，先成其用。语义、状态与可达不成立，形制不予讨论 |
| 关系为法 | 《老子》「有无相生，难易相成，长短相形，高下相倾」 | 大小、轻重、疏密只在相互比较中成立。要突出一处，先减弱它周围的，而不是继续加强它自己 |
| 合宜为度 | 《考工记》「天有时，地有气，材有美，工有巧，合此四者，然后可以为良」；《园冶》「巧于因借，精在体宜」 | 好坏看是否合于情境、环境、媒介与工艺，不看是否用尽。组件从所在环境承接密度、明暗、方向与语言，不让调用方逐个配置 |

一条传统方法进入本指南，须同时满足三条：**有出处**，能指出原文或公认手法；**能生成**，能作出一个判断或决定一类取值；**能检验**，给出可观察的判据。缺一条不收。不取的东西：传统纹样与图案装饰、仿古与书法字体用于界面文字、印章卷轴宣纸一类元素、以五行方位附会配色、内容本身不是竖排时的竖排。

## 器用六法

器用六法处理语义、关系与任务。方法用于作判断，不用于命名样式，也不保证出现在每个组件里。普通组件只采用相关方法；完整任务检查六类问题。方法名称不是 HTML/ARIA `role`，也不是主题参数。

| 方法 | 出处 | 设计决定 | 应避免的结果 |
|---|---|---|---|
| 名实相符 | 《论语·子路》「名不正，则言不顺」 | 名称说明对象、动作和后果；等待、成功、失败、结果未知按真实事件表达 | 所有动作都叫“确定”；请求发出就显示“已保存” |
| 相成相制 | 《素问》君臣佐使 | 让内容、说明、操作和保护措施共同完成任务；功能作用与视觉强调分别判断 | 固定四级按钮；异常时仍弱化停止操作；每处重复警告 |
| 布白有用 | 《老子》「当其无，有室之用」 | 分别安排关系间隔、可工作的空间与判断余地；保留有用的信息密度 | 每段都套卡片；为了留白藏比较列；示例自动成为提交内容 |
| 随境取度 | 《中庸》「君子而时中」 | 按任务选择显著程度、持续时间与是否中断；改变布局时保留正在发生的工作 | 所有错误只用 Toast；所有结果都弹窗；输入中突然重排并丢失焦点 |
| 展开有据 | 园林框景、借景与移步换景 | 提供有理由的预览与深入，同时支持直接抵达和合理返回 | 高频任务必须逐层探索；关键后果只在 Tooltip 中；直达详情无法返回 |
| 进退相承 | 《易·乾·文言》「知进退存亡而不失其正」 | 正常、等待、失败、未知、取消与恢复围绕同一对象连续发生 | 失败清空草稿；关闭窗口被称为撤销成功；业务完成依赖动画结束 |

## 表达九法

表达九法处理尺度、墨色、线、形、位置、表面与动，是「三件事的顺序」里第三步的方法。它们决定一类取值从哪里来，而不只给出风格方向；具体数值记录在基础层，并注明来源。

| 方法 | 出处 | 设计决定 | 应避免的结果 |
|---|---|---|---|
| 以材为祖 | 《营造法式》「凡构屋之制，皆以材为祖」 | 全部几何由一个基本量派生：材是正文的一行，分是材的整除单位；尺寸档与密度只换「等」，各部位同比变化 | 每个控件各定一套尺寸；放大容器连带放大其中内容的字号 |
| 疏密有致 | 邓石如「疏处可以走马，密处不使透风，常计白以当黑」 | 间距是分组的第一手段：组内紧、组间松、章节更松，级差一眼可辨；空白与笔墨同样经营 | 间距平均分布；靠线和卡片补救本该由间距表达的分组 |
| 墨分五色 | 张彦远「运墨而五色具」；谢赫「随类赋彩」 | 一条有限的中性墨阶承担文字、线与承载面的全部层级；彩色只随语义类别施用；品牌强调色如一方印，少而明确 | 墨阶外另造灰；用彩色装饰或区分无语义的东西 |
| 骨法用笔 | 谢赫「骨法用笔」 | 线是结构：只在面无法划出范围时用线；线宽统一，强调靠墨色加浓而不靠加粗；一个范围只用一种边界机制 | 填充之外再描边；焦点加粗或外扩一圈；线、底色与阴影叠加表达同一范围 |
| 应物象形 | 谢赫「应物象形」 | 形随物性：方以载事，可操作与可编辑的范围方整而转角有缓；圆以标点，只给点与身份；同一轮廓等距内缩时内外同心 | 圆角大小随手取；方轮廓里放不同心的圆；以新增形状表达状态 |
| 经营位置 | 谢赫「经营位置」；书法章法与行气 | 主次先由位置与留白确立，再施尺寸与墨色；一个视图只有一个君；同一行同高、同基线，边缘落在少数对齐线上 | 靠颜色和尺寸堆出重点；同一行控件高低不齐 |
| 绘事后素 | 《论语·八佾》「绘事后素」 | 先有素地，后施色彩；表面平净，不用装饰性的渐变、纹理与高光；阴影只表达真实的浮起；正常状态不铺无事实的灰底 | 同一平面加阴影；正常状态铺灰底；用质感代替比例 |
| 气韵生动 | 谢赫「气韵生动」 | 动不离位：动效从变化发生处开始，说明来处与去处，可中断；同类变化同一节拍，整体读来贯通 | 与位置无关的装饰动效；同类过渡各用各的时长 |
| 材有美 | 《考工记》「材有美」 | 顺着媒介做：几何落在整像素上；默认系统字体，使中西字面成对；保留平台原生行为；中文排版用真实标点与混排检查 | 半像素边与模糊线；外加拉丁字体使同一行出现两套 x 高度；覆盖平台的可访问行为 |

**屋有大小，人无大小。** 材分制给房屋分等，住在里面的人身高不变。尺寸档与密度换的是控件与间距的「等」；人要读的内容文字由阅读需要决定，不随容器缩放。按钮名称是按钮本身的一部分，可以随按钮的等变化；输入值、选项与正文是内容，不随之变化。

基础层的质量看自由值的数量：材、分与少数比例由人选定，其余几何都应能写成材与分的关系，并说明系数由哪条关系决定。说不出关系的值只能标为预设，并应逐步收敛。

## 系统分层

组件库不止是组件集合。同一份判断要能被设计师、开发者、AI 和使用它的人共同执行，因此按职责分五层。分层决定一个东西属于库、项目还是应用，也决定它该以什么粒度被复用。

| 层 | 回答的问题 | 内容 | 归属 |
|---|---|---|---|
| Foundation | 什么决定不能随意违反 | 语义 token、排版角色、间距、圆角、表面、动效、密度、方向、焦点与无障碍底线 | 本库 |
| Primitive | 什么是最小稳定交互语义 | 不能继续拆分而不破坏其交互语义的单位；同时具备语义、解剖、行为、状态、可访问和组合入口 | 本库 |
| Pattern | 反复出现的用户问题怎样解决 | 由多个原语组成的稳定交互结构；内部可以有状态推进、空态、错误恢复与结果呈现 | 本库提供契约，具体组合可在项目层实现 |
| Capability | 一项完整业务能力怎样形成 | 涉及数据、校验、业务规则与外部系统的完整能力 | 项目或产品，不进本库 |
| Experience | 这些同时出现时还成立吗 | 真实页面、真实数据、真实密度、真实错误与真实操作链 | 项目或产品，用本库验收 |

判断一个东西该放在哪一层，问它是否在没有业务对象时仍然成立。成立，属于 Foundation、Primitive 或 Pattern；不成立，属于 Capability 或 Experience。

**本库不含业务逻辑**：不发请求、不读路由、不依赖会话、不判断权限。能力层需要这些，因此它不属于本库。把业务状态塞进样式层，或把基础控件复制到多个页面，都是归属错误。

Pattern 是比 Primitive 更值得沉淀的资产：`Button`、`Select`、`Dialog` 会持续商品化，而“筛选条件怎样叠加、可见、清除”、“上传失败怎样恢复”这类问题不会。但 Pattern 不等于页面——它仍然是可复用的交互结构，不是某次需求的成品。

各层的完整判据与当前组件归属见 `docs/decisions/component-layering.md`。

## 可执行的协议

本库不只提供源码，还提供让设计判断可被查询和执行的规则。人、AI、测试和运行时读同一份事实，因此下列内容都是协议的一部分，而不是附带文档：

| 内容 | 作用 |
|---|---|
| Code | 真实实现，唯一的事实来源 |
| Tokens | 设计决策的具名入口，不是颜色数值表 |
| Semantic | 对象、动作、状态与后果的定义 |
| Rules | 什么时候可以、什么时候不可以，以及判据 |
| Contracts | 组件与模式的输入、状态、状态归属和可访问契约 |
| Examples | 组件的状态与简单组合；不编排业务流程或虚构数据 |
| Skills | 交给 AI 的任务入口与约束 |
| Registry | 可分发资源的清单与结构 |
| Validation | 类型、行为、对比度、几何和人工目视的实测证据 |

**机器可读的判据比界面文案更重要。** 一份组件文档必须让读者回答：它是什么、什么时候该用、什么时候不该用、有什么替代、有哪些状态、谁拥有这些状态、有哪些失败方式。只写“有一个 Dialog”是不够的——必须能回答“什么时候不该用 Dialog，该用什么替代”。

协议化不改变人的判断权。规则用于指出可执行的边界，不能替代对真实任务的理解；规则之间冲突时，指出具体差异并按本文件的方法重新判断，不静默覆盖。

## 按情境

默认值随情形变化，不取中间值，也不在所有情形使用同一强度。

| 情形 | 可以改变 | 必须保持 |
|---|---|---|
| 阅读转为比较 | 信息并置、列呈现、内容宽度 | 对象含义与来源 |
| 正常转为失败 | 反馈显著性、可用恢复动作 | 草稿、对象身份、未受影响内容 |
| 指针转为触摸 | 命中区域、可见入口 | 任务与控制语义 |
| 宽屏转为窄屏 | 承载方式、换行、部分摘要 | 已输入内容、选中范围、返回线索 |
| 用户选择紧凑 | 关系间距、控件的外高与留白、辅助信息呈现 | 内容文字的字号、可读性、焦点、触摸目标、必要说明 |
| 内容需要比较 | 表格与并置 | 比较所需的二维关系 |
| 内容彼此独立 | 卡片与围合 | 独立对象的边界 |

随境取度是上下文适配，不只是响应式。上下文包括视口、可用空间、输入方式、键盘、减少动态效果、对比、语言、方向、内容密度与用户能力。同一个意图在不同环境下可以有不同的承载方式——桌面用弹出层、窄屏用整屏面板、密集界面用紧凑入口——但**语义、能力与可预期性必须一致**。改变外形不是适配；保持一致才能成立。

## 君臣佐使：一个界面里的操作关系

这个方法处理的是同一界面内操作的相互关系，不是全局组件分类，也不要求任何组件套用这些名称。

| 角色 | 在界面中的含义 |
|---|---|
| 君 | 当前任务的主要意图 |
| 臣 | 支持主要任务完成 |
| 佐 | 防误操作、异常、风险与修正 |
| 使 | 引导下一步与去向 |

例如删除账号：君是删除本身；臣说明影响；佐包含危险提示、确认输入与不可逆说明；使提供取消与返回入口。判断时检查佐的位置是否与风险相称，以及使是否真实存在。

一个视图只有一个君。君的地位先由位置与留白确立（经营位置），再由尺寸与墨色加强；两个同等强调的入口并列，说明主意图还没有定。

## 把关系落实到界面

方法说明怎样判断；本节说明判断落在界面的哪些地方。

### 名称与状态

动作使用清楚的动词和必要对象。区分保存草稿、发布、归档、移出集合和永久删除。批量操作说明范围；确认针对当前对象、版本和变更内容。

Label、说明、示例和错误分别表达自己的事实。Placeholder 不能独自承担字段名称。未知、不适用、空值与零不得为了版面整齐混成一种显示。

让结构、内容和状态承担解释。界面文案用于识别对象、说明必要后果、帮助修正与继续；删去重复标签、显然的操作说明和“这个界面如何设计”的自述。不要给每个控件、区块或空白都配一段描述。必要帮助按需出现，文档按阅读任务组织；简洁不应删掉字段名称、关键后果或错误恢复。

Tabs 切换面板，Select 选择值，Menu 执行命令，Progress 表达进度，Meter 表达测量值。先确定语义，再选择外观。

状态不是互斥的一串皮肤，可以同时存在（选中且有焦点、展开且无效、加载且禁用），组件必须说明组合时的优先顺序。每个状态都要回答：**谁拥有它，用户凭什么知道它真的发生了。** 动画是证据的增强，不是证据本身。

| 状态归属 | 谁负责 |
|---|---|
| 指针、焦点、按下、展开、临时选择 | 组件与无障碍原语 |
| 选中、无效、当前项 | 组件，可由应用受控 |
| 加载、失败、空态、部分成功 | 应用决定事实，组件负责表达 |
| 权限、审批、版本、持久化 | 应用 |

组件不得推断它不掌握的事实。没有结果事实时点击保存，不能自称成功。

### 空间与表面

围绕共同任务组织字段和操作。卡片用于需要独立边界的对象；阅读与设置分节也可以由标题、对齐和间距组织。开放、围合、内嵌与浮起是选择，不要求新增四个组件。

比较任务保留必要的二维关系。紧凑可以收紧关系间距，但不能机械缩小文字和触摸目标。空态留出明确入口，内容到来后让位；已有内容刷新时保留仍然有效的工作面。

使用项目已有的角色 token 和布局组合。仅当某种关系需要独立调整且已有明确消费部位时，才增加 token。结构性的 `0`、百分比、`fr`、正常 flex/grid 和真实数据值不必 token 化。

### 强调与内容

核心可以是正文、图像、数据、输入区域或保护动作。按当前任务安排层级，保留必要差异；“克制”不要求所有内容浅淡，“疏”也不要求所有页面低密度。

现代影像和鲜明表达可以使用。中文排版检查真实标点、混排、长标签与字体回退；不能以仿古字体或一条字距规则代替这些检查。

### 变化与恢复

正常流程之外，设计慢响应、原位错误、部分成功、返回、放弃与重新进入。写入结果未知时先如实表达，再按应用能力核实或恢复；不要猜测服务端没有执行。

关闭界面、取消编辑、请求取消后台任务、撤销已保存动作分别定义后果。取消请求发出不等于取消已经完成。与权限撤回或敏感信息相关时，明确哪些工作必须清除，不能无条件永久保留。

动效说明真实变化，允许中断；减少动态效果后名称、状态、输入和退出仍然可用。

### 视觉基调

视觉不通过中国元素表达，而是通过关系表达，方法见表达九法。落到一个界面上，它们读出来是：内容开放而操作有界；组内紧密而组间舒展；用间距成组而不靠万物卡片；以墨阶分层而彩色稀少；轮廓方整而转角有缓；状态只改变已有的属性；动不离位。

## 设计契约

上文的六种方法说明怎样判断；本节是可直接执行的判据。评审时逐条核对，每条都给出可观察的结果，不依赖感受。

### 必须

满足事实正确、状态真实与可访问底线之后，才谈表达。

- **名称对应真实的对象、动作与结果。** 等待、成功、失败与结果未知分别表达；不先于事实宣布结果。
- **状态有明确归属。** 本地展开与持久选择分开；草稿、范围、版本与异步结果由应用持有，界面如实表达而不代为推断。
- **可访问行为不被破坏。** 键盘可达、可访问名称、可见焦点、真实前景背景对比、窄屏与放大文字下可用、减少动态效果后任务仍成立。
- **主题三轴不混用。** 品牌写 `data-brand`，明暗写 `light`/`dark` 或 `data-theme`，密度写 `data-density`。主题改变视觉，不改变权限、保存策略或操作范围。
- **文字长度不影响结构。** 长标题、长标签、中英混排、放大文字与切换语言之后，分组、层级与操作位置仍然成立。
- **判断可被机器读到的部分必须写下来。** 组件与模式的用途、禁用条件、替代方案、状态与状态归属，不能只存在于人的记忆或界面文案里。

### 禁止

以下做法没有可接受的表达理由。没有找到更好的做法，不构成使用它们的理由。

| # | 禁止 | 判据 |
|---|---|---|
| NG1 | 复述标题或相邻元素已经表达的内容 | 删掉该句后，读者做错事或找不到东西的概率不变 |
| NG2 | 把本来有主次的信息平铺为等权 | 去掉装饰后，读者说不出哪一项是当前重点 |
| NG3 | 在同一产品面上混用互不相干的设计语言 | 同一控件在两个页面使用不同的圆角、重量或间距逻辑 |
| NG4 | 用卡片围合没有独立身份的内容 | 去掉边框后内容关系不变 |
| NG5 | 标题上方加 kicker 或 eyebrow | 该行不承载识别、决策或错误恢复所需的信息 |
| NG6 | 用装饰性动效交代状态，或让任务结果依赖动画结束 | 关闭动画后，状态不可理解或任务无法完成 |
| NG7 | 让唯一的关键后果只存在于会消失的提示里 | 提示消失后无法再确认该后果 |
| NG8 | 在界面文案里解释自身的设计或实现 | 该句描述的是做法本身，而非对象、后果或恢复方式 |
| NG9 | 以新增形状表达状态：外扩的焦点圈、加粗的边框、随状态改变的尺寸 | 状态切换前后，元素的外缘或尺寸发生变化 |
| NG10 | 使用没有语义类别的彩色 | 去掉该色相后，读者失去的不是危险、警示、成功、信息、数据系列或品牌中的任何一类 |
| NG11 | 用两种以上机制重复划出同一个范围 | 去掉其中一种（线、底色或阴影）后，范围仍然清楚 |
| NG12 | 装饰性表面：渐变、纹理、同一平面上的阴影 | 删去后理解、层次与操作都不变 |

### 文案

界面文字说明读者看不见的东西，然后停下。

1. **写事实。** 参数、数值、状态名称、权限与不可逆后果、必要的区分（取消请求不等于取消完成）。
2. **不复述。** 见 NG1。标题、预览和相邻元素已经说清的，不重复。
3. **不铺陈。** 一个句子里不出现两组以上并列的抽象名词。
4. **主语是真实事物。** 人、界面元素或具体对象，不用抽象名词作主语。
5. **不写元陈述。** 不说「接下来讲什么」，直接讲它。
6. **不用格言收尾。** 段落末句应当承载信息，而非脱离上文仍然成立的判断。
7. **说该怎样。** 说明取舍时给出实际做法，不只陈述不该怎样。
8. **不用无判据的形容词。** 优雅、现代、强大、高级一类词，没有可观察的对应物就不写。

教程、安装步骤、错误恢复与权限说明属于必要的引导，应当写清楚，不受此节限制。

### 判据

**一、删去检验。** 删掉某个元素后，理解、执行、保护或协调是否受损。若无损，应删除。若同一作用已有可靠机制，不重复添加。

**二、分工检验。** 功能作用与视觉强调分别判断。执行动作未必是最强元素；异常时停止可能优先，阅读时正文可能优先，批量操作前范围核对可能优先。

**三、变化检验。** 调整表达时，正在进行的输入、选择与位置不应被打断；改变布局不应当作「自适应」的表现。

**四、来源检验。** 界面外观的差异应有可指出的理由：任务、状态、条件或项目身份。找不到理由的差异，应收敛为同一决定。

**五、归属检验。** 每项改动能落在公共组件库、项目设计层、应用或开发工具之一。不把业务状态塞进样式层，也不把基础控件复制到多个页面。

**六、证据检验。** 声称状态已发生、对比度达标、键盘可用或行为正确时，给出实际运行的检查。没有证据的能力记为未验证，不记为通过。

**七、灰度检验。** 把界面转为灰度，层级与状态仍然可读；状态不只靠色相表达。

**八、疏密检验。** 去掉所有线与底色，分组仍然读得出来；组内、组间、章节三级间距逐级拉开，同一关系在全库只有一个间距值。

**九、行气检验。** 同一行的元素外高一致、文字同基线；一个区块的对齐线可以数出来，并且数量少。

**十、分格检验。** 每个几何值都能写成材与分的关系，并指出系数由哪条关系决定；每个值记录来源：锚点、派生或裁决。《礼记·月令》：「物勒工名，以考其诚。」

## 明确修改归属

| 层 | 应负责的内容 |
|---|---|
| 公共组件库 | 组件语义、基础交互、公共解剖、基础状态、可访问行为和角色 token |
| 项目设计层 | 品牌主题、重复任务组合、第三方视觉适配和明确的项目变体 |
| 应用 | 路由、权限、草稿、版本、异步结果、保存、重试、撤销和持久化 |
| 开发工具 | 查询真实能力、定位改动归属、诊断问题和记录验证证据 |

优先复用当前属性和组合，再调整集中主题或项目组合；确有公共缺口时扩展共享实现。不要复制基础控件到多个页面，也不要要求 UI 组件保证服务端幂等或权限安全。

品牌、明暗和密度相互独立。主题改变视觉，不改变保存策略、确认条件、操作范围或权限。共享组件的更新通过版本升级进入消费项目。

## 人和 AI 的交付检查

- 代码使用当前版本真实存在的导出与属性；没有把提案命令当作现有工具。
- 正常路径与相关失败、取消或恢复路径可操作；状态来源和归属清楚。
- 对象、范围、草稿、焦点和返回依据在约定情境下保持有效。
- 键盘、可访问名称、真实前景背景对比、窄屏、长文本和减少动态效果均按影响检查。
- 普通大小的文字，包括辅助文字，一般至少达到 4.5:1；大文本和必要非文本分别适用对应要求。44px 是本库触屏目标，不是所有场景的 WCAG AA 统一门槛。[文字对比说明](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [目标尺寸说明](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- 源码检查、浏览器行为、辅助技术检查和人工视觉判断分别报告。模拟输入法事件不等于真实中文输入法实测；截图也不证明完整无障碍通过。
- 使用 `PASS`、`FAIL`、`UNVERIFIED`、`NOT_RUN`；确实不适用时使用 `N/A` 并解释。没有能力或没有测试不能记作通过。

交付说明简要回答：改变了什么判断，修改落在哪一层，保留了什么工作，验证了哪些状态，还有什么未验证。不要用“更东方”“更高级”或模型自评分代替证据。

每项实质设计变更都应能连接到一个真实任务、相关方法、具体取舍和可观察结果。若设计只剩传统装饰，或为了沿用参考组件而隐藏必要反馈、弱化退出、牺牲比较与内容容量，应重新设计；不能通过补一段文化解释使它合格。

本文件不改变用户授权、项目协作规则或发布权限。若项目规范与本指南有实质冲突，先指出具体差异；不静默覆盖既有契约。

<!-- qingye:project-adoption:start -->
## 在项目中持续使用

接入 `@qingye/ui` 时，把方法与真实 API 的引用留在项目的 `AGENTS.md` 和 `design.md`，后续任务沿用。以下片段合并到已有文件，保留原有规则和项目事实，遵守项目指导文件的写入权限；本指南不授权自动修改其他仓库或覆盖文件。合并时查明并记录项目集中主题、公共组合和验证命令的实际入口；尚不存在的入口如实注明。

若已安装版本尚未包含本指南，可把下载文件保存为 `docs/qingye-design.md`，并将下方片段中的指南路径改为该路径；组件 API 仍按已安装的包核对。

项目 `AGENTS.md`：

```md
## Qingye UI

- 界面设计先读本项目 design.md 与 node_modules/@qingye/ui/design.md，依据器用六法判断任务、语义、结构和状态，依据表达九法决定尺度、墨色、线、形与位置。
- 实现前核对已安装 @qingye/ui 的 package.json、catalog.json、声明和相关示例；交互控件复用共享包，项目负责主题与公共组合，应用负责权限、草稿、请求和结果。
- 验证正常与相关失败、取消或恢复路径，并按影响检查键盘、可访问名称、对比度、窄屏和长文本；仅报告实际运行的检查。
```

项目 `design.md`：

```md
## Qingye UI 方法

器用为本，关系为法，合宜为度。具体判断依据 node_modules/@qingye/ui/design.md：器用六法（名实相符、相成相制、布白有用、随境取度、展开有据、进退相承）处理任务与语义，表达九法（以材为祖、疏密有致、墨分五色、骨法用笔、应物象形、经营位置、绘事后素、气韵生动、材有美）处理尺度与形制；普通组件采用相关方法，完整任务检查全部问题。

组件能力以本项目已安装 @qingye/ui 的 catalog.json、类型和示例为准。品牌、明暗、密度独立；集中主题、公共组合和验证命令在本文件记录实际入口，变更时更新。
```

包升级后仍读取安装版指南和声明；网站资料用于发现，不能替代本地版本事实。其他技术栈可把完整指南保存为项目文档并引用该路径，采用设计方法，但须另行验证平台语义，不能假定本库 API 可用。

<!-- qingye:project-adoption:end -->

## 交给 AI 的任务入口

先完成上面的项目引用，再把具体任务交给 AI。若使用 `@qingye/ui`，同时提供当前安装版本或允许 AI 在项目中读取。

```text
请依据 design.md 完成这次界面任务，并遵守项目现有协作规则。
先读取当前实现、组件 API、主题入口与公共组合，再确定改动。
围绕真实对象、操作范围、状态 owner 和需要保留的工作设计。
让正常、失败、取消和返回形成完整任务；只采用相关的设计方法。
在授权范围内实现并验证，说明修改归属、实际证据和未验证范围。
```

<!-- qingye:translation:en:start source-sha256=8ca9acfdc1af08019109913a8008b555bf0cdad57a8a09f2a59b69058625ae31 -->
# Qingye UI Design Guide

**Purpose first. Relationships guide the form. Fitness sets the measure.**

This guide helps people and AI make interface decisions. It explains how to name, organize, present, and support tasks. It is neither an API inventory nor a claim that every capability mentioned here is implemented. Read the types, documentation, and examples for the currently installed version before using a component.

Qingye UI takes its methods from Chinese classics and Eastern aesthetics: philosophy orders judgments, craft supplies a system of measure, and calligraphy, painting, and gardens supply the handling of density, ink, line, and placement. **Take the method, not the motif.** Culture informs concrete judgments; interfaces use no traditional patterns, antique typefaces, seals, scrolls, or similar decoration. Professional tools, content displays, and everyday applications can look different.

The design basis determines the goal; implementation choices serve it. Components in this library are original implementations written from this guide, `STANDARDS.md`, and the public APIs of accessibility primitives. Decide whether to use such primitives or another mature foundation by its actual capabilities. Replacing presentation does not require reinventing every basic interaction.

## Before designing

Establish these facts from the requirements and current project. Verify what can be found; ask only when missing information affects correctness.

- What the person needs to accomplish. Reading, comparing, creating, pausing, declining, and leaving can all be goals.
- The current object, action scope, and actual state; what counts as completion.
- What must appear together and what can be revealed on demand.
- Which inputs, selections, positions, and completed work must persist, and for how long.
- Available components, public compositions, project themes, and verification commands.

Extra buttons, deeper hierarchies, and cultural terminology cannot create a missing requirement.

## The order of decisions

Make every interface decision in this order, without skipping a step.

**Establish semantics, then relationships, then expression.** Semantics identify objects, actions, scope, and actual state. Relationships describe how content, actions, explanations, and safeguards support and constrain each other. Expression concerns surfaces, emphasis, dimensions, and motion. Choosing appearance before the first two steps treats design as decoration.

**Expression serves judgment; judgment serves the task.** Converge differences with no task basis; retain differences the task requires. A reference implementation, popular style, or personal preference cannot override that basis.

**Use composition before adding configuration, and reuse relationships before adding components.** Laozi: "With little, one gains; with much, one is confused." Every prop, variant, or component introduces another decision. A design system removes decisions with no value rather than multiplying possibilities.

**Substance and form in balance (文质彬彬).** Semantics and relationships are substance; expression is form. The Analects: "When substance exceeds form, the result is crude; when form exceeds substance, the result is clerical." Correct semantics with rough form, and refined appearance with false states, are equally unfinished. Each side has its methods: substance follows the six methods of use, form follows the nine methods of expression. Judge them separately; neither substitutes for the other.

## Principles and sources

| Principle | Source | Meaning |
|---|---|---|
| Purpose first (器用为本) | *Book of Changes*: "What is below form is called the vessel"; *Kaogongji* judges a vessel by whether it is good | A component is a vessel; its use comes first. Without semantics, states, and reachability, form is not discussed |
| Relationships guide the form (关系为法) | Laozi: "Being and nonbeing produce each other … long and short shape each other, high and low lean on each other" | Size, weight, and density exist only by comparison. To bring one thing forward, first quiet what surrounds it rather than amplifying it further |
| Fitness sets the measure (合宜为度) | *Kaogongji*: "Heaven has its seasons, earth its energies, materials their beauty, craft its skill; combine these four and the work is good"; *Yuanye*: "skill in borrowing, precision in fitness" | Quality means fitting context, environment, medium, and craft, not exhausting every means. Components inherit density, appearance, direction, and language from their surroundings instead of requiring per-call configuration |

A traditional method enters this guide only when it meets three conditions: **a source**, an identifiable text or recognized technique; **generation**, it makes a judgment or determines a class of values; **a test**, an observable criterion. Anything missing one is excluded. Not borrowed: traditional patterns as decoration, antique or calligraphic typefaces for interface text, seals, scrolls, paper textures, palettes justified by the five phases or directions, and vertical text unless the content itself is vertical.

## Six methods of use

The six methods of use address semantics, relationships, and tasks. They guide judgment; they are neither style names nor requirements for every component. Ordinary components use relevant methods; a complete task checks all six questions. Their names are not HTML/ARIA roles or theme parameters. The Chinese names remain canonical.

| Method | Source | Design decision | Avoid |
|---|---|---|---|
| 名实相符 Semantic fidelity | Analects: "If names are not correct, language will not accord" | Name the object, action, and consequence; express waiting, success, failure, and unknown results from actual events | Calling every action Confirm; announcing Saved when a request was only sent |
| 相成相制 Mutual support and restraint | *Suwen*: sovereign, minister, assistant, envoy | Let content, explanations, actions, and safeguards complete the task together; judge functional roles separately from visual emphasis | Fixed button hierarchies; weakening Stop during a failure; repeating warnings everywhere |
| 布白有用 Purposeful space | Laozi: "Where the room is empty lies its use" | Arrange relationship spacing, working capacity, and room for judgment separately; retain useful information density | Wrapping every section in a card; hiding comparison columns for whitespace; submitting examples automatically |
| 随境取度 Contextual fitness | *Doctrine of the Mean*: "the noble person is timely in the mean" | Choose emphasis, duration, and interruption for the task; preserve active work when changing layouts | Putting every error in a Toast or every result in a dialog; losing focus through rearrangement while typing |
| 展开有据 Justified disclosure | Garden framing, borrowed views, and changing views with each step | Provide previews and deeper access for a reason, with direct arrival and a reasonable way back | Making frequent tasks require layered exploration; putting critical consequences only in a Tooltip; details with no return path |
| 进退相承 Continuity of progress and retreat | *Book of Changes*: "knowing advance and retreat, survival and loss, without losing what is right" | Keep normal work, waiting, failure, uncertainty, cancellation, and recovery tied to the same object | Clearing drafts after failure; calling window closure successful cancellation; making completion depend on an animation |

## Nine methods of expression

The nine methods of expression address measure, ink, line, shape, placement, surface, and motion: the third step in the order of decisions. They determine where a class of values comes from rather than only suggesting a style. Concrete values live in the foundation layer with their sources.

| Method | Source | Design decision | Avoid |
|---|---|---|---|
| 以材为祖 Module as ancestor | *Yingzao Fashi*: "All building begins from the cai module" | Derive all geometry from one base measure: the module is one line of body text; the unit divides it. Size steps and density change only the grade, scaling parts together | A separate size table per control; enlarging a container and the type of its content with it |
| 疏密有致 Ordered density | Deng Shiru: "Where sparse, a horse may run; where dense, no wind passes; count the white as black" | Spacing is the first means of grouping: tight within groups, looser between them, looser still between sections, with steps that read at a glance. Space is composed as carefully as ink | Evenly distributed spacing; lines and cards repairing groups that spacing should express |
| 墨分五色 Five tones of ink | Zhang Yanyuan: "Handle ink and the five colors are present"; Xie He: "apply color by category" | One limited neutral ink ladder carries the hierarchy of text, lines, and surfaces. Hue is applied only by semantic category; a brand accent acts like a seal, rare and specific | Extra grays outside the ladder; hue used as decoration or to separate things without meaning |
| 骨法用笔 Bone method of the brush | Xie He: "bone method in using the brush" | Lines are structure: draw one only where a surface cannot mark a boundary. Use one line weight; emphasize by deepening ink, not thickening. One boundary mechanism per region | Outlining a filled shape; thickened or outward focus rings; line, fill, and shadow restating one boundary |
| 应物象形 Form follows the object | Xie He: "correspond to the object in depicting form" | Square for things that carry work: actionable and editable regions are square with eased corners. Round for points and identities only. Equal insets of one contour stay concentric | Arbitrary radii; nonconcentric rounds inside square contours; new shapes expressing state |
| 经营位置 Composition of placement | Xie He: "planning placement"; calligraphic layout and line flow | Establish priority through position and space before size and ink. One sovereign per view. Items in a row share height and baseline; edges fall on few alignment lines | Building emphasis by piling color and size; uneven control heights within a row |
| 绘事后素 Plain ground before color | Analects: "Painting comes after the plain ground" | A plain ground first, color after. Surfaces stay clean, without decorative gradients, textures, or highlights. Shadows express actual elevation only; normal states carry no factless gray fill | Shadows within one plane; gray fills on normal states; texture standing in for proportion |
| 气韵生动 Resonant vitality | Xie He: "resonance of spirit, vitality of movement" | Motion keeps its place: it begins where the change happens, shows origin and destination, and can be interrupted. Similar changes share one rhythm so the whole reads as continuous | Decorative motion unrelated to position; similar transitions with unrelated durations |
| 材有美 Respect the material | *Kaogongji*: "materials have their beauty" | Work with the medium: geometry on whole pixels; system fonts by default so Latin and Chinese faces pair; preserve native platform behavior; check Chinese typesetting with real punctuation and mixed scripts | Half-pixel edges and blurred lines; an added Latin face producing two x-heights in one line; overriding platform accessibility |

**The house has grades; people do not.** The module system grades buildings while their occupants keep their height. Size steps and density change the grade of controls and spacing; the content text people read is set by reading needs and does not scale with its container. A button's name is part of the button and may follow its grade; input values, options, and body text are content and do not.

The quality of a foundation is measured by its number of free values. People choose the module, the unit, and a few ratios; every other dimension should be expressible through them, with the relationship that sets each coefficient. A value without such a relationship can only be recorded as a preset and should converge over time.

## System layers

A component library is more than a set of components. Designers, developers, AI, and users must be able to act on the same judgments. Five responsibility layers determine whether something belongs to the library, project, or application, and the granularity at which it should be reused.

| Layer | Question | Contents | Owner |
|---|---|---|---|
| Foundation | Which decisions must not be casually violated? | Semantic tokens, typography roles, spacing, radii, surfaces, motion, density, direction, focus, and accessibility requirements | This library |
| Primitive | What is the smallest stable interaction meaning? | A unit that cannot be split further without breaking its interaction semantics; semantics, anatomy, behavior, state, accessibility, and composition entries together | This library |
| Pattern | How is a recurring user problem resolved? | A stable structure composed from primitives; it may include state progression, empty states, error recovery, and result presentation | The library supplies contracts; projects may implement specific compositions |
| Capability | How is a complete business capability formed? | Data, validation, business rules, and external systems | Project or product |
| Experience | Does it hold when everything appears together? | Real pages, data, density, errors, and action chains | Project or product, accepted with this library |

Ask whether a thing still makes sense without a business object. If it does, it belongs to Foundation, Primitive, or Pattern. Otherwise it belongs to Capability or Experience.

**The library contains no business logic:** it sends no requests, reads no routes, depends on no sessions, and determines no permissions. Capabilities need these responsibilities and belong elsewhere. Putting business states into styles or copying foundation controls between pages assigns ownership incorrectly.

Patterns are particularly valuable reusable assets. `Button`, `Select`, and `Dialog` continue to become commodities; how filters accumulate, stay visible, and clear, or how failed uploads recover, remains a design problem. A Pattern is still a reusable interaction structure, rather than a finished page for one requirement.

Complete criteria and current component ownership are in `docs/decisions/component-layering.md`.

## Executable protocols

The library provides source and rules that make design judgments queryable and actionable. People, AI, tests, and runtime behavior read the same facts. Each item is part of the protocol:

| Content | Purpose |
|---|---|
| Code | Actual implementation; the authority for facts |
| Tokens | Named entries for design decisions, rather than a table of color values |
| Semantic | Definitions of objects, actions, states, and consequences |
| Rules | When something is allowed or disallowed, with criteria |
| Contracts | Inputs, states, ownership, and accessibility contracts for components and patterns |
| Examples | Component states and simple compositions; no orchestrated business flows or invented data |
| Skills | Task entries and constraints for AI |
| Registry | An inventory and structure for distributed resources |
| Validation | Observed evidence for types, behavior, contrast, geometry, and human visual review |

**Machine-readable criteria matter more than interface prose.** A component reference must explain what it is, when to use it, when to avoid it, alternatives, states, state ownership, and failure modes. Listing a Dialog is insufficient; explain when another mechanism should replace it.

Protocols preserve human judgment. Rules describe actionable boundaries without replacing the understanding of a real task. When rules conflict, identify the difference and reconsider with this guide's methods instead of silently overriding them.

## Context

Defaults change with the situation; they are neither averages nor one strength applied everywhere.

| Situation | May change | Must remain |
|---|---|---|
| Reading becomes comparison | Side-by-side information, columns, content width | Object meaning and source |
| Normal work becomes failure | Feedback emphasis and recovery actions | Drafts, object identity, unaffected content |
| Pointer becomes touch | Hit areas and visible entries | Task and control semantics |
| Wide screen becomes narrow | Container, wrapping, selected summaries | Input, selected scope, clues for returning |
| A user chooses compact density | Relationship spacing, control heights and padding, supporting information | Content type size, readability, focus, touch targets, necessary explanations |
| Content needs comparison | Tables and juxtaposition | Required two-dimensional relationships |
| Content is independent | Cards and enclosure | Independent object boundaries |

随境取度 concerns context beyond responsiveness: viewport, available space, input method, keyboard, reduced motion, contrast, language, direction, content density, and user abilities. One intent may use a popup on desktop, a full-screen panel in a narrow space, and a compact entry in a dense interface. **Semantics, capabilities, and predictability must stay consistent.** A change of shape alone does not constitute adaptation.

## 君臣佐使: relationships among actions

This method describes actions within one interface. It is neither a global component taxonomy nor a naming requirement.

| Role | Meaning in the interface |
|---|---|
| 君 | The main intent of the current task |
| 臣 | Support for completing the main task |
| 佐 | Safeguards, exceptional conditions, risks, and corrections |
| 使 | Direction toward the next step and a way out |

For account deletion, deletion is 君; explaining the impact is 臣; danger notices, confirmation input, and irreversible consequences are 佐; cancel and return are 使. Check whether safeguards sit proportionately to the risk and whether the way out actually exists.

A view has one 君. Its position and surrounding space establish it first (composition of placement); size and ink reinforce it. Two equally emphasized entries side by side mean the main intent is not yet decided.

## Applying relationships to interfaces

The methods explain how to judge. These are the places those judgments affect an interface.

### Names and states

Use clear verbs and necessary objects. Distinguish saving a draft, publishing, archiving, removing from a collection, and permanently deleting. Bulk actions state their scope; confirmation concerns the current object, version, and changes.

Labels, explanations, examples, and errors each express their own facts. A placeholder cannot be a field's sole name. Unknown, inapplicable, empty, and zero must not merge for visual tidiness.

Let structure, content, and state explain what they can. Interface text identifies objects, explains necessary consequences, and supports correction and continuation. Remove repeated labels, obvious instructions, and descriptions of the interface's design. Avoid a paragraph for every control, section, or blank space. Reveal necessary help when needed and organize documentation for its reading task. Concision must retain field names, critical consequences, and error recovery.

Tabs switch panels, Select chooses a value, Menu runs commands, Progress expresses progress, and Meter expresses a measurement. Determine semantics before appearance.

States can coexist: selected and focused, expanded and invalid, loading and disabled. Explain precedence when they combine. Every state must answer: **who owns it, and what lets a user know it has actually happened?** Animation strengthens evidence; it cannot establish the fact.

| State ownership | Responsibility |
|---|---|
| Pointer, focus, pressed, open, temporary selection | Components and accessibility primitives |
| Selected, invalid, current item | Components, optionally controlled by the application |
| Loading, failure, empty, partial success | The application determines facts; components present them |
| Permissions, approval, versions, persistence | Application |

Components cannot infer facts they do not have. Clicking Save without an outcome fact cannot establish success.

### Space and surfaces

Group fields and actions around a shared task. Cards serve objects needing independent boundaries. Headings, alignment, and spacing can organize reading and settings. Open, enclosed, inset, and raised are choices, not four required new components.

Comparison retains necessary two-dimensional relationships. Compact density may tighten relationship spacing but cannot mechanically shrink text and touch targets. Empty states make an entry clear and yield when content arrives. Refreshes retain still-valid working space.

Use existing role tokens and layout compositions. Add a token only when a relationship needs independent adjustment and has a clear consumer. Structural `0`, percentages, `fr`, ordinary flex/grid, and actual data values do not require tokens.

### Emphasis and content

The core may be text, an image, data, an input area, or a safeguard. Set hierarchy for the current task while retaining necessary differences. Restraint does not mean every element must be faint; space does not mean every page must have low density.

Modern imagery and vivid expression are allowed. Check actual Chinese punctuation, mixed scripts, long labels, and font fallback. An antique typeface or one tracking rule cannot replace these checks.

### Change and recovery

Design slow responses, in-place errors, partial success, return, abandonment, and re-entry as well as the normal path. Express an unknown write outcome accurately, then verify or recover within the application's capabilities. Do not assume the server did nothing.

Define separate consequences for closing an interface, canceling editing, requesting background cancellation, and undoing a saved action. Sending a cancellation request does not confirm cancellation. When permissions are revoked or sensitive information is involved, identify work that must be cleared rather than retaining everything forever.

Motion explains actual changes and permits interruption. With reduced motion, names, states, inputs, and exits must remain usable.

### Visual character

Relationships carry the character without Chinese decoration; the methods are the nine methods of expression. In an interface they read as open content with bounded actions; tight groups with generous space between them; grouping by spacing rather than universal cards; hierarchy by ink tones with rare hue; square contours with eased corners; states that change only existing properties; motion that keeps its place.

## Design contract

The six methods guide judgment. This section supplies directly actionable criteria. Review each one against an observable result rather than a feeling.

### Required

Establish correct facts, truthful states, and accessibility before expression.

- **Names match actual objects, actions, and outcomes.** Waiting, success, failure, and unknown results remain distinct. Never announce an outcome before the fact.
- **States have explicit owners.** Separate local disclosure from persistent selection. Applications own drafts, scope, versions, and asynchronous outcomes; interfaces present them accurately.
- **Accessible behavior stays intact.** Keyboard access, names, visible focus, actual foreground/background contrast, narrow layouts, enlarged text, and reduced motion must support the task.
- **The three theme axes stay independent.** Brand uses `data-brand`; appearance uses `light`/`dark` or `data-theme`; density uses `data-density`. Themes do not change permission, save policy, or action scope.
- **Text length preserves structure.** Grouping, hierarchy, and action positions must hold with long titles, labels, mixed scripts, enlarged text, and changed languages.
- **Record judgments machines can read.** Uses, unavailable conditions, alternatives, states, and ownership for components and patterns must exist beyond memory and interface copy.

### Bans

These practices have no acceptable presentation rationale. Lack of a better solution does not justify them.

| # | Ban | Observable criterion |
|---|---|---|
| NG1 | Repeat content already expressed by a heading or neighbor | Removing the sentence does not change the likelihood of a wrong action or missing information |
| NG2 | Flatten information with real priorities into equal emphasis | Without decoration, the reader cannot identify the current focus |
| NG3 | Mix unrelated design languages on one product surface | The same control uses different radius, weight, or spacing logic across pages |
| NG4 | Enclose content with no independent identity in cards | Removing the border leaves the content relationship unchanged |
| NG5 | Add a kicker or eyebrow above a heading | It carries no information needed for identification, a decision, or error recovery |
| NG6 | Explain states through decorative motion, or make completion depend on animation | Turning animation off makes a state unclear or a task impossible |
| NG7 | Put a critical consequence solely in a disappearing hint | Once the hint disappears, the consequence cannot be checked |
| NG8 | Explain the interface's design or implementation in interface copy | The sentence describes a technique rather than the object, consequence, or recovery |
| NG9 | Express state by adding shape: outward focus rings, thickened borders, dimensions that change with state | The element's outer edge or dimensions differ before and after the state change |
| NG10 | Use hue without a semantic category | Removing the hue loses none of danger, warning, success, information, a data series, or brand |
| NG11 | Mark one region with more than one mechanism | Removing one of line, fill, or shadow leaves the region equally clear |
| NG12 | Decorative surfaces: gradients, textures, shadows within one plane | Removing them leaves understanding, layering, and operation unchanged |

### Copy

Explain what the reader cannot see, then stop.

1. **Write facts:** parameters, values, state names, permissions, irreversible consequences, and necessary distinctions such as cancellation requested versus completed.
2. **Do not repeat:** NG1 applies to information already clear from headings, previews, or neighbors.
3. **Avoid sprawling abstractions:** a sentence should not contain more than two groups of parallel abstract nouns.
4. **Use real subjects:** people, interface elements, or specific objects rather than abstract nouns.
5. **State the content directly:** skip announcements of what will be discussed next.
6. **Do not end with a maxim:** the final sentence carries information that belongs to the paragraph.
7. **Give the actual approach:** explain the tradeoff through what to do, rather than only what to avoid.
8. **Avoid adjectives without criteria:** elegant, modern, powerful, or premium need observable counterparts to be useful.

Tutorials, installation steps, error recovery, and permission explanations are necessary guidance; explain them fully.

### Tests of judgment

**1. Removal.** Does removing an element harm understanding, execution, protection, or coordination? If not, remove it. Do not duplicate an already reliable mechanism.

**2. Division of roles.** Judge functional role separately from visual emphasis. The executing action need not be strongest; Stop may take priority in an exception, body text during reading, and scope review before bulk work.

**3. Change.** Changing expression must preserve ongoing input, selection, and position. Rearranging a layout alone is not adaptation.

**4. Source.** Differences in appearance need an identifiable reason: task, state, conditions, or project identity. Converge differences without a reason.

**5. Ownership.** Assign each change to the public library, project design layer, application, or development tooling. Keep business state out of styles and shared foundation controls out of page copies.

**6. Evidence.** Claims about states, contrast, keyboard access, and correct behavior need observed checks. Record unsupported claims as unverified rather than passed.

**7. Grayscale.** In grayscale, hierarchy and states remain readable; no state depends on hue alone.

**8. Density.** With every line and fill removed, groups remain readable; spacing widens step by step within groups, between groups, and between sections, and one relationship uses one spacing value across the library.

**9. Line flow.** Items in one row share outer height and text baseline; a block's alignment lines are countable and few.

**10. Module.** Every dimension is expressible through the module and unit, with the relationship that sets its coefficient; every value records its source as anchor, derivation, or ruling. *Book of Rites*: "Inscribe the maker's name on the object, to examine its sincerity."

## Assigning changes

| Layer | Responsibility |
|---|---|
| Public component library | Component semantics, basic interactions, public anatomy, basic states, accessible behavior, and role tokens |
| Project design layer | Brand themes, recurring task compositions, third-party visual adaptation, and explicit project variants |
| Application | Routing, permissions, drafts, versions, asynchronous outcomes, saving, retrying, undoing, and persistence |
| Development tooling | Querying actual capabilities, locating ownership, diagnosing problems, and recording evidence |

Reuse current props and compositions first, then adjust the central theme or project compositions. Extend the shared implementation for actual public gaps. Avoid page copies of foundation controls and expecting a UI component to guarantee server idempotency or permission security.

Brand, appearance, and density are independent. A theme changes presentation without changing save policy, confirmation conditions, action scope, or permission. Shared component updates reach consumers through package upgrades.

## Delivery checks for people and AI

- Code uses exports and props that exist in the current version, without treating proposed commands as available tools.
- Normal and relevant failure, cancellation, or recovery paths work; state sources and ownership are clear.
- Objects, scope, drafts, focus, and the basis for returning remain valid in agreed contexts.
- Check keyboard access, names, actual foreground/background contrast, narrow layouts, long text, and reduced motion according to impact.
- Normal text, including supporting text, generally requires at least 4.5:1; large text and necessary non-text content use their applicable requirements. The library's 44px touch target is not a universal WCAG AA threshold. [Text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Report source checks, browser behavior, assistive technology, and human visual review separately. Simulated IME events do not establish real Chinese IME behavior; screenshots do not establish complete accessibility acceptance.
- Use `PASS`, `FAIL`, `UNVERIFIED`, and `NOT_RUN`. Use `N/A` only with a reason. Missing capabilities or checks never count as a pass.

Delivery notes briefly state the changed judgment, owning layer, retained work, verified states, and remaining gaps. Cultural adjectives and a model's self-rating cannot replace evidence.

Every substantial design change connects a real task, a relevant method, a specific tradeoff, and an observable result. Redesign if only traditional decoration remains, or preserving a reference component hides necessary feedback, weakens exits, or sacrifices comparison and content capacity. Adding cultural prose cannot make it acceptable.

This document changes no user authorization, collaboration rules, or release permissions. Identify material conflicts with project rules before deciding; preserve established contracts unless an authorized change resolves the conflict.

<!-- qingye:project-adoption:en:start -->
## Continued use in a project

When adopting `@qingye/ui`, keep references to the methods and actual APIs in the project's `AGENTS.md` and `design.md` for later tasks. Merge these snippets into existing files, preserving rules and project facts and respecting permission to edit guidance. This guide does not authorize automatic edits to other repositories or file replacement. Find and record actual entries for the central theme, public compositions, and verification commands; state clearly when an entry does not exist.

If the installed package lacks this guide, save the download as `docs/qingye-design.md` and replace the guide paths below. Continue checking APIs against the installed package.

Project `AGENTS.md`:

```md
## Qingye UI

- Before interface work, read this project's design.md and node_modules/@qingye/ui/design.en.md. Use the six methods of use to judge the task, semantics, structure, and states, and the nine methods of expression to decide measure, ink, line, shape, and placement.
- Before implementation, check the installed @qingye/ui package.json, catalog.json, declarations, and related examples. Reuse shared interactive controls; the project owns themes and public compositions, and the application owns permissions, drafts, requests, and outcomes.
- Verify normal and relevant failure, cancellation, or recovery paths. Check keyboard access, names, contrast, narrow layouts, and long text according to impact. Report only observed checks.
```

Project `design.md`:

```md
## Qingye UI methods

Purpose first. Relationships guide the form. Fitness sets the measure. From node_modules/@qingye/ui/design.en.md, the six methods of use (名实相符, 相成相制, 布白有用, 随境取度, 展开有据, 进退相承) address tasks and semantics; the nine methods of expression (以材为祖, 疏密有致, 墨分五色, 骨法用笔, 应物象形, 经营位置, 绘事后素, 气韵生动, 材有美) address measure and form. Ordinary components use relevant methods; complete tasks check every question. The Chinese method names remain canonical.

Component capabilities come from the installed @qingye/ui catalog.json, types, and examples. Brand, appearance, and density are independent. Record actual entries for the central theme, public compositions, and verification commands here, and keep them current.
```

After upgrades, read the installed guide and declarations again. Website resources help discovery but cannot replace local version facts. Other stacks may save this guide in project documentation and apply its methods, but must verify platform semantics separately; these React APIs cannot be assumed to apply.

<!-- qingye:project-adoption:en:end -->

## Giving a task to AI

Establish the project references above before giving a specific task to AI. When using `@qingye/ui`, supply the installed version or allow it to read that version from the project.

```text
Complete this interface task from design.md while following the project's collaboration rules.
Read the current implementation, component APIs, theme entry, and public compositions before deciding changes.
Design around real objects, action scope, state owners, and work that must remain available.
Connect normal work, failure, cancellation, and return into a complete task; use relevant design methods.
Implement and verify within the authorized scope, and report ownership, actual evidence, and unverified areas.
```
<!-- qingye:translation:en:end -->
