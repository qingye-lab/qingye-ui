# 第九批：通用内容与集合 Pattern

依据根 `design.md`、`STANDARDS.md`、`component-layering.md` 与 display/layout 族决策，从任务、原生语义、应用事实和关系独立实现。未读取归档、冻结副本或上游组件实现。这 12 项均为 Pattern；不保存业务对象、不请求数据、不推断路由、排序、完成状态或服务结果。

## 任务与语义

| 组件 | 任务与结构 | 状态归属 |
| --- | --- | --- |
| Breadcrumb | `nav > ol > li` 表达调用方提供的父级路径；Link 是导航，Current 显式 `aria-current=page`。 | 应用提供路径和当前项，不读取历史或 URL。 |
| Steps | `ol > li` 表达有序过程；状态为 upcoming/current/complete/error，当前位置使用 `aria-current=step`。 | 每一项状态均由应用提供；序号不证明完成。 |
| Timeline | `ol > li` 与原生 `time` 表达传入序列及时间。 | 应用提供时间、顺序与内容；库不排序、不补事件。 |
| Table | 原生 table/caption/thead/tbody/tfoot/tr/th/td 保留二维比较，外部容器负责横向容量。 | 应用提供数据、空状态与 `aria-sort`，排序动作是应用的 Button 组合。 |
| Pagination | 有名称的 nav 与列表，当前页由 root page 与 Link page 的相等关系确定。 | 应用提供 page 与 totalPages（数字或 null=未知），以及 previous/next 可用性和导航/更新动作；库不推断末页。 |
| Empty | 通用内容容器显式区分 empty/unknown/not-applicable。 | 应用提供状态、名称、解释及真实可执行入口；库不把未知当作零结果。 |
| Item | 通用条目关系容器，内容、标题、说明与附属动作；Link 保留原生导航。 | 应用决定链接目的与动作；root 默认 div，可 render 为 li 或独立 a，a 内不能放交互动作。 |
| DescriptionList | dl、分组 div、dt、dd 表达名称与值。 | 值作为 ReactNode 原样呈现，零不会被真假判断丢弃。 |
| Stat | dl/dt/dd 组织一个度量及附属说明，值与单位分槽。 | 应用显式提供 known/unknown/not-applicable 状态和值，不推断趋势或统计口径。 |
| PageHeader | header 共置页面名称、上下文与相关动作，Heading 的 level 独立于文字尺度。 | 应用提供任务名称和动作，不自动生成路由、面包屑或维护信息。 |
| Toolbar | Base UI Toolbar 的 root/group/button/link/separator 提供真实键盘成组与禁用行为。 | 库管理方向键焦点；应用提供动作、选中状态与群组名称。 |
| CodeBlock | pre/code 原样展示字符串；复制复用现有 useCopyToClipboard 与 Button。 | 库只报告实际 clipboard 写入结果；应用提供文本、语言名称与回调，不伪造语法高亮。 |

## 关系与逐值处置

- **推导**：Breadcrumb、Steps、Timeline 的原生有序列表来自路径/过程/序列关系；Table 的 th 默认 scope=col，行标题由应用改为 row；DescriptionList/Stat 的 dt/dd 来自名称与值关系。Pagination 当前项来自调用方页码相等，不能推导未知末页。
- **约束**：渲染链转发 ref、ARIA、事件和消费者样式；替换元素须保持相应原生语义。长文本可换行，比较表与代码保留完整宽度并允许横向滚动，不能截掉维度。默认没有卡片外框、阴影或趋势色。
- **选择**：小范围同一对象使用 field-gap；相邻动作使用 action-gap；条目/段落用 panel-gap；章节使用 section-gap。这是已有关系角色的选择，非由文化理念唯一确定。条目占位使用 row-default，表格行内容及内边距仍保持独立；没有引入全局 token。
- **预设**：文字 body/body-strong/support/heading/metric、表面 bg-muted、边界 border-border 与 1px 内焦点均复用基础层预设。表格单元格水平方向用 panel-gap、纵向用 field-gap，是默认紧疏选择；不宣称唯一推导。代码沿用等宽字体、body 文字尺度、panel-padding-sm 内距。时间线无需装饰点/线，步骤无需自动完成色。
- **预设**：导航链接在正文关系中使用 text-body、下划线与盒内 focus ring；独立链接复用已有 touch-target 粗指针命中角色，命令按钮复用 Button 五档几何，不另造命中尺寸。Toolbar 的 group 间距为 panel-gap、动作间距为 action-gap；分隔线只是组界限，禁用仍由成熟原语接管。
- **事实**：内建可访问名称和复制反馈复用当前 locale 现有 key；无新增字符串 key、无业务内建文案。

## 范围与验证

只在本批组件、对应精准测试、meta/demos、75-batch9-content review section 与本批记录中写入。公共 index/catalog、locale/token、总路线图和浏览器由主 agent 统一处理。验证只覆盖原生结构、事实状态、合法 render/事件/ref、焦点与真实复制成功/失败；不以镜像 style 断言代替语义，也不运行全库、build、生成器或浏览器。
