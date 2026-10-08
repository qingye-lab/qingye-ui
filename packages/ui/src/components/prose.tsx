"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type ProseProps = useRender.ComponentProps<"article">;

/*
 * 已渲染的 Markdown / 富文本阅读面（design.md「表达九法」；基础层 §1、§3、§6、§7、§8、§19）。
 * 库不解析 Markdown：调用方用任意渲染器（react-markdown、MDX、服务端 HTML）产出原生元素，
 * Prose 只用后代选择器给这些原生元素排版，不改变、也不读取它们的结构或内容。
 *
 * 纸（绘事后素，基础层 §6）：阅读面是一张纸——bg-surface + 清墨容器线（border-border）+
 * rounded-panel，与 Card、Popover、浮层同一边界机制（基础层 §5「Card、Popover、浮层｜清墨
 * 容器线 + 承载面」），不新造一套画法。只用底色一种机制在深色主题下不够：深色 surface 只比
 * background 浅 2% 白（tokens/semantic.css），删去线之后删去检验会失败，所以线不能省；
 * 浅色下底色差异更明显，但同一产品面只用一种边界机制（NG3、NG11），两色主题共用这一条线。
 *
 * 版心（以材为祖）：文字区宽度取 38em。阅读字号（text-reading，1rem）下，中文字体的全角
 * 字面宽度就是 1em，38em 直接表达「一行 38 个汉字」，落在 35–40 字区间中段。纸的内缘复用
 * --qy-panel-padding（面板里的内容先彼此成组，再与边框成组，基础层 §3），不新造内缘值；
 * 纸的外框宽度 = 版心 + 两侧内缘，使 padding 以内真正留出 38em 的文字区，而不是把内缘
 * 算进版心。响应式内缘（窄屏 16px）由该 token 自带，这里不重复声明。
 *
 * 中文排版（材有美）：首行不缩进。疏密有致已经把「这是一段」的分组交给段间距，缩进会用
 * 两种机制重复表达同一件事；现代屏幕长文（公众号、知乎、GitHub 的渲染）普遍不缩进，缩进
 * 是印刷排版的约定，不是屏幕阅读的既有习惯。标点与中英混排不另加字距规则：utilities.css
 * 已对 :lang(zh/ja/ko) 设 letter-spacing: normal，Prose 不重复。
 *
 * 间距（疏密有致，基础层 §3）：段落、列表、引用、代码块、表格这一级「组」统一用组间距
 * --qy-field-group-gap（一材）——基础层 §3 对这个 token 的定义正好是「面板内段落之间」，
 * 直接复用，不新造值。标题与其统领的正文是组内关系（--qy-field-gap，更紧，标题靠近它
 * 统领的内容）；标题与其前内容是组间或节间关系（更松，疏密有致要求级差一眼可辨）：
 * 一、二级标题（h1/h2）前留节间（两材），三、四级标题（h3/h4）前留组间（一材）。
 * 纸内第一个子元素清零 margin-top：纸的内缘已经是「新内容开始」的边界，不需要标题自己的
 * 「新段」间距再叠一层；最后一个子元素清零 margin-bottom，不让纸的下内缘叠加段间距。
 * `:first-child`/`:last-child` 是逐父元素求值的，这条规则对列表项、引用、详情框内部的
 * 首尾块同样成立，不止对纸的直接子元素。
 *
 * 标题层级：长文自有一阶（篇 28/36、节 22/32、小节 18/28、h4 正文加字重），每级约 1.25 倍；此前借界面的 title/chapter 层级读不出来。旧注：h1 读 title（24/32）、h2 读 chapter（20/28）、
 * h3 读 heading（16/24），都是基础层 §8 已有的内容档，不新开尺寸。h4 读 body-strong
 * （14/20，字重 500）：它与 heading 只差 2px（16→14，约 1.14 倍），低于「相邻内容档至少
 * 差 1.2 倍」的门槛，按基础层 §8 的例外——两档字号相差无几时，层级交给墨色与字重，不再
 * 加一档字号——复用已有的 body-strong，不新造 h4 专属尺寸。
 *
 * 强调（墨分五色）：strong 读字重 500（font-medium），与 body-strong、prose-strong 同一
 * 级别——正文语境里的强调用字重中段，600（semibold）留给标题；颜色不变（仍是焦墨），
 * 强调靠字重，不靠另造一级墨。em 只变字体姿态（italic），颜色同样不变。
 *
 * 链接（骨法用笔）：复刻 link.tsx 的 linkClassName——下划线常在，颜色不是唯一的区分方式
 * （WCAG 1.4.1）；下划线平时读重墨（--qy-border-input），悬停与焦点加深为文字本色，不加粗。
 * 不能直接把那个类字符串套进后代选择器（Tailwind 的变体要逐条前缀），所以这里逐条复刻同
 * 一组 token，两处改动需要同步——这是一条有记录的耦合，不是两套互相独立的画法。
 *
 * 列表（骨法用笔、疏密有致）：项目符号与序号不用浏览器默认黑点，改用浓墨
 * （marker:text-muted-foreground）。缩进取一材（20px）：选择，不是推导——它要盖住两位数
 * 序号「10.」的标记宽度（约 9px）加一分间隙，又要落在一个已命名的量上，材是满足这个下限
 * 的最小命名量。marker 的默认外置定位（list-style-position: outside）由浏览器原生处理
 * 续行对齐，不必另写规则。列表项之间留组内间隔（--qy-field-gap），同一列表内的项是同组。
 * 任务列表（GFM）的 ul 上通常带 `contains-task-list` 类（remark-gfm 的既有约定），这里
 * 据此去掉该列表自己的序号/项目符号，避免和勾选框重复；不依赖这个类名的渲染器会看到
 * 符号与勾选框并排——是已知、无害的外观差异，不是功能缺陷。
 *
 * 任务列表勾选框（input，GFM 渲染为 disabled 的静态事实）：不用浏览器默认控件外观
 * （appearance-none），改用标记几何——边长直接读 --qy-marker-size，与库内 Checkbox 的
 * 标记同一个值，未选中读重墨边框，选中读实心焦墨 + ✓ 字形（伪元素内容，css 画不出矢量
 * 图标，用字符近似）。禁用态不降低不透明度：任务是否完成是需要被读到的事实，这里的
 * disabled 对应基础层 §9 的「只读」语义（内容仍要被完整看到），不是「当前不可操作」的
 * 禁用语义，所以不套用按钮类控件的 opacity-64。
 *
 * 引用（骨法用笔）：左侧一道线承担「这段是引来的」边界，线宽统一 1px，不加粗；强弱由
 * 墨色表达，取重墨（--qy-border-input，50%）——引用没有独立的底色或承载面区分它与正文，
 * 线是唯一的边界机制，强度要够；弱一级的清墨（8%）在这里会读不出边界（删去检验：去掉
 * 线，读者分不出引用和正文）。文字读浓墨（66%），比正文略退一级，呼应「这是引文，不是
 * 作者本人的话」；内缘复用组间（--qy-field-group-gap）——引用是独立成块的内容，给它和
 * 面板内缘同一量级的呼吸，不是组内的贴身关系。
 *
 * 行内代码（材有美，「不另写一套」）：逐字复刻 typography.tsx 的 Code 组件规则（清染底、
 * 一分横向留白、等宽字、字号按所在文字的 0.875 倍取整像素）。pre 内的 code 不是行内代码，
 * 单独复位（去掉底色、留白与圆角），代码块的面由 pre 自己承担。
 *
 * 代码块（绘事后素、以材为祖，「不另写一套」）：逐字复刻 code-block.tsx 的 pre 规则——
 * 清染底（bg-muted = --qy-surface-inset）承载等宽字，内缘复用 --qy-panel-padding-sm
 * （组间 − 一分，基础层 §3 对它的定义正好是「内缘比组间少一分」），横向滚动不换行
 * （<pre> 的 UA 默认 white-space: pre 已经不换行，这里显式声明一次防止被其他样式覆盖），
 * 不加阴影。字体由 styles.css 对 `pre` 的全局规则接管，这里不重复声明 font-mono。
 *
 * 表格（骨法用笔，「与库里 Table 同一画法」）：table.tsx 2026-10-07 改为纸承载——
 * TableContainer 另有一层 div 给出 border/rounded-panel/bg-surface，Prose 拿不到那层
 * 包装（渲染器只给出裸 <table>），所以把同一组类直接画在 <table> 自己身上，用
 * overflow-hidden 让表头/表尾的清染底不越过圆角——不用 display:block + overflow-x-auto
 * 的横向滚动技巧，那会让 <table> 退出表格布局，border-collapse/border-spacing 失效，
 * 读者看到的会是两套不同的线。代价：很宽的表格在 Prose 里不会独立横向滚动，只能按单元格
 * 自然换行；这是已知、待决的缺口，见组件报告。表头/表尾清染底、行高、单元格留白、数字列
 * 等宽数字都复刻 table.tsx 当前值。
 *
 * hr（骨法用笔）：清墨横线，前后留节间——分隔号是比段落更强的断点，前后对称。
 *
 * img / figure / figcaption（绘事后素）：图片本身不加框、不加阴影（NG12），只给圆角
 * 读 rounded-item（与最小控件同角，基础层 §4），最大宽度不超出版心。figcaption 读
 * caption 文字档（12/20，浓墨）——它是图片的脚注，不是正文。
 *
 * kbd（材有美，「不另写一套」）：逐字复刻 kbd.tsx 的几何——键帽外高固定 4 分，字按
 * 0.875 倍取整像素，纵向用 (材 − 4 分) / 2 的外加居中于所在文字行，只用清墨线一种机制。
 *
 * details/summary（展开有据）：一个自带边界的可展开块，骨法用笔选边界机制（border，
 * 不叠底色），内缘复用 --qy-panel-padding-sm（与 Popover、Alert 同级——只装一组内容）；
 * summary 是可点击的入口，字重与行内强调同级（font-medium），不单独造一个强调层级。
 *
 * 脚注上标（名实相符）：sup 本身只是抬高位置（浏览器默认 vertical-align），不用额外
 * 处理；sup 里的链接去掉下划线、读浓墨——位置的抬高和尺寸的缩小已经是非颜色的区分信号
 * （满足 WCAG 1.4.1 对「不单靠颜色」的要求），常在的下划线在这么小的字号里只会增加噪音。
 */

const PAPER =
  "w-full max-w-[calc(38em+2*var(--qy-panel-padding))] rounded-panel border border-border bg-surface p-(--qy-panel-padding) text-reading text-foreground [&_:where(p,li,blockquote,dd)]:text-prose";

const RHYTHM = [
  // 组：段落、列表、引用、代码块、表格、分隔线之外的块级内容统一组间距（一材）。
  "[&_:where(p,ul,ol,blockquote,pre,table,figure,details)]:mb-(--qy-field-group-gap)",
  "[&_:where(p,ul,ol,blockquote,pre,table,figure,details):last-child]:mb-0",
  // 纸内首尾各清零一次，避免内缘与标题/段落自己的间距重复叠加。
  "[&>:first-child]:mt-0",
  "[&_blockquote>:first-child]:mt-0",
  "[&_li>:first-child]:mt-0",
  "[&_summary+*]:mt-0",
].join(" ");

const HEADINGS = [
  // 标题读已有内容档，不新开尺寸；h4 与 heading 字号相差无几，按基础层 §8 的例外交给字重。
  // 总标题统领全文，与正文隔一个组间距；小节标题只隔一个组内间隔——层级越高，离正文越远，不倒置。
  "[&_h1]:m-0 [&_h1]:mt-(--qy-section-gap) [&_h1]:mb-(--qy-field-group-gap) [&_h1]:text-prose-h1",
  "[&_h2]:m-0 [&_h2]:mt-(--qy-section-gap) [&_h2]:mb-(--qy-field-gap) [&_h2]:text-prose-h2",
  "[&_h3]:m-0 [&_h3]:mt-(--qy-field-group-gap) [&_h3]:mb-(--qy-field-gap) [&_h3]:text-prose-h3",
  "[&_h4]:m-0 [&_h4]:mt-(--qy-field-group-gap) [&_h4]:mb-(--qy-field-gap) [&_h4]:text-prose-strong",
  "[&_:where(h1,h2,h3,h4):first-child]:mt-0",
].join(" ");

const INLINE = [
  // 强调靠字重中段，不另造一级墨；斜体只变字体姿态。
  "[&_strong]:font-medium",
  "[&_em]:italic",
  // 复刻 link.tsx 的 linkClassName（同一组 token，两处需要同步，见上方大注释）。
  "[&_a]:rounded-marker [&_a]:text-foreground [&_a]:underline [&_a]:decoration-(color:--qy-border-input) [&_a]:[text-decoration-thickness:1px] [&_a]:underline-offset-[round(0.25em,1px)] [&_a]:transition-[text-decoration-color] [&_a]:duration-(--qy-duration-fast) [&_a]:ease-(--qy-ease-out) [&_a]:outline-none",
  "[&_a:hover]:decoration-current [&_a:focus-visible]:decoration-current",
  "[&_a:focus-visible]:ring-inset [&_a:focus-visible]:ring-(length:--qy-focus-quiet-width) [&_a:focus-visible]:ring-ring",
  // 脚注上标：去掉下划线，读浓墨；抬高与缩小已经是非颜色的区分信号。
  "[&_sup_a]:text-muted-foreground [&_sup_a]:no-underline [&_sup_a]:font-medium",
].join(" ");

const LISTS = [
  // 符号/序号用浓墨，不用浏览器默认黑点；缩进取一材（选择，见上方大注释）。
  "[&_ul]:list-disc [&_ol]:list-decimal",
  "[&_ul]:marker:text-muted-foreground [&_ol]:marker:text-muted-foreground [&_ol]:marker:numeric",
  // 只清零顶部外边距：底部外边距由 RHYTHM 的组间距规则拥有，两条规则的选择器字符串不同，
  // cn() 的 tailwind-merge 认不出它们在描述同一个属性，写成 m-0 会在生成的样式表里随机
  // 赢过 mb-(--qy-field-group-gap)（已实测复现）。
  "[&_ul]:mt-0 [&_ol]:mt-0 [&_ul]:pl-(--qy-cai) [&_ol]:pl-(--qy-cai)",
  "[&_li]:m-0 [&_li]:mt-(--qy-field-gap) [&_li:first-child]:mt-0",
  // 嵌套列表紧跟它所属的那一点，不叠加整段的组间距。
  "[&_li>ul]:mb-0 [&_li>ol]:mb-0 [&_li>ul]:mt-(--qy-field-gap) [&_li>ol]:mt-(--qy-field-gap)",
  // GFM 任务列表：去掉该列表自己的符号，避免与勾选框并排重复（约定见上方大注释）。
  "[&_.contains-task-list]:list-none",
].join(" ");

const TASK_CHECKBOX = [
  // 任务列表勾选框：渲染后的 Markdown 里只有 GFM 任务列表会出现 <input>，且恒为
  // type="checkbox"，所以直接选 input，不必再写 [type=checkbox] 这层属性选择器。
  // 边长直接读 --qy-marker-size，与库内 Checkbox 同一个值；窄屏升一等到一材，
  // 外加同它一样的 (材 − 标记) / 2 居中于所在文字行（基础层 §19「按行居中」）。
  "[&_input]:relative [&_input]:inline-block [&_input]:appearance-none [&_input]:shrink-0 [&_input]:align-top",
  "[&_input]:size-(--qy-marker-size-narrow) sm:[&_input]:size-(--qy-marker-size)",
  "[&_input]:my-(--qy-marker-inset-narrow) sm:[&_input]:my-(--qy-marker-inset) [&_input]:me-(--qy-control-content-gap)",
  "[&_input]:rounded-marker [&_input]:border [&_input]:border-input [&_input]:bg-surface",
  "[&_input:checked]:border-transparent [&_input:checked]:bg-primary",
  "[&_input:checked]:before:absolute [&_input:checked]:before:inset-0 [&_input:checked]:before:flex [&_input:checked]:before:items-center [&_input:checked]:before:justify-center",
  "[&_input:checked]:before:content-['✓'] [&_input:checked]:before:text-[0.7em] [&_input:checked]:before:leading-none [&_input:checked]:before:text-primary-foreground",
  // 任务是否完成是需要被读到的事实（基础层 §9「只读」），禁用态不降不透明度。
  "[&_input:disabled]:cursor-default [&_input:disabled]:opacity-100",
].join(" ");

const BLOCKQUOTE =
  // mt-0 only；底部外边距交给 RHYTHM（见 LISTS 顶部注释，同一个坑）。
  "[&_blockquote]:mt-0 [&_blockquote]:border-s [&_blockquote]:border-input [&_blockquote]:ps-(--qy-field-group-gap) [&_blockquote]:text-muted-foreground";

const INLINE_CODE = [
  // 逐字复刻 typography.tsx 的 Code 规则（「不另写一套」）。
  "[&_code]:rounded-marker [&_code]:bg-neutral-soft [&_code]:px-(--qy-fen) [&_code]:font-mono [&_code]:text-[round(0.875em,1px)] [&_code]:[box-decoration-break:clone] [&_code]:wrap-anywhere",
  // pre 内的 code 不是行内代码：复位底色、留白与圆角，面由 pre 自己承担。
  "[&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:wrap-normal [&_pre_code]:[box-decoration-break:unset]",
].join(" ");

const CODE_BLOCK =
  // 逐字复刻 code-block.tsx 的 pre 规则（「不另写一套」）；mt-0 only，理由同 LISTS 顶部注释。
  "[&_pre]:mt-0 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:whitespace-pre [&_pre]:rounded-item [&_pre]:bg-muted [&_pre]:p-(--qy-panel-padding-sm) [&_pre]:text-body [&_pre]:text-foreground [&_pre]:outline-none";

const TABLE = [
  // 复刻 table.tsx 当前值：纸承载 + overflow-hidden 让清染底不越过圆角（见上方大注释
  // 关于横向滚动的取舍）。
  // mt-0 only，理由同 LISTS 顶部注释。
  "[&_table]:mt-0 [&_table]:w-full [&_table]:max-w-full [&_table]:border-separate [&_table]:border-spacing-0 [&_table]:overflow-hidden [&_table]:rounded-panel [&_table]:border [&_table]:border-border [&_table]:bg-surface [&_table]:text-body [&_table]:text-foreground",
  "[&_caption]:px-(--qy-panel-padding) [&_caption]:pt-(--qy-panel-padding-sm) [&_caption]:pb-(--qy-field-gap) [&_caption]:text-start [&_caption]:text-body-strong",
  // 表头/表尾：清染底，高度 = 一材 + 上下各一个组内间隔，不再画线。
  "[&_thead>tr]:h-[calc(var(--qy-cai)+2*var(--qy-field-gap))] [&_thead>tr]:bg-surface-inset [&_thead>tr>*]:border-b-0 [&_thead>tr>*]:py-0",
  "[&_tfoot]:font-medium [&_tfoot>tr]:h-[calc(var(--qy-cai)+2*var(--qy-field-gap))] [&_tfoot>tr]:bg-surface-inset [&_tfoot>tr>*]:border-b-0 [&_tfoot>tr>*]:py-0",
  // 正文行：一个控件高 + 行间清墨线，最后一行没有线。
  "[&_tbody>tr]:h-(--qy-row-default) [&_tbody>tr>*]:border-b [&_tbody>tr>*]:border-border",
  "[&_tbody>tr:last-child>*]:border-b-0 [&_tbody>tr:last-child>*]:pb-(--qy-field-gap)",
  // 单元格：左右各半个组间距，首尾留面板内缘；表头 13px 浓墨，正文焦墨；数字列等宽数字。
  "[&_th]:px-[calc(var(--qy-panel-gap)/2)] [&_td]:px-[calc(var(--qy-panel-gap)/2)]",
  "[&_th:first-child]:ps-(--qy-panel-padding) [&_td:first-child]:ps-(--qy-panel-padding)",
  "[&_th:last-child]:pe-(--qy-panel-padding) [&_td:last-child]:pe-(--qy-panel-padding)",
  "[&_th]:pt-(--qy-field-gap) [&_th]:pb-[calc(var(--qy-field-gap)-1px)] [&_th]:text-start [&_th]:align-middle [&_th]:whitespace-nowrap [&_th]:text-label [&_th]:text-muted-foreground",
  "[&_td]:pt-(--qy-field-gap) [&_td]:pb-[calc(var(--qy-field-gap)-1px)] [&_td]:align-middle",
  "[&_th]:numeric [&_td]:numeric",
  // Markdown 的列对齐（`---:`）常以 align 属性落下；它说的是这一列是数，盖过表头的默认起始对齐。
  "[&_th[align=right]]:text-end [&_td[align=right]]:text-end [&_th[align=center]]:text-center [&_td[align=center]]:text-center",
].join(" ");

const HR =
  // 分隔号比段落更强的断点，前后对称留节间。
  "[&_hr]:my-(--qy-section-gap) [&_hr]:border-border";

const MEDIA = [
  "[&_img]:block [&_img]:max-w-full [&_img]:rounded-item",
  // mt-0 only，理由同 LISTS 顶部注释。
  "[&_figure]:mt-0 [&_figure]:grid [&_figure]:gap-(--qy-field-gap)",
  "[&_figcaption]:text-caption [&_figcaption]:text-muted-foreground",
].join(" ");

const KBD =
  // 逐字复刻 kbd.tsx 的几何（「不另写一套」）。
  "[&_kbd]:inline-flex [&_kbd]:h-[calc(4*var(--qy-fen))] [&_kbd]:min-w-[calc(4*var(--qy-fen))] [&_kbd]:max-w-full [&_kbd]:items-center [&_kbd]:justify-center [&_kbd]:rounded-marker [&_kbd]:border [&_kbd]:border-border [&_kbd]:px-(--qy-kbd-padding-inline) [&_kbd]:align-top [&_kbd]:my-[calc((var(--qy-cai)-4*var(--qy-fen))/2)] [&_kbd]:text-[round(0.875em,1px)] [&_kbd]:leading-none [&_kbd]:font-mono [&_kbd]:text-foreground [&_kbd]:wrap-anywhere";

const DETAILS = [
  // mt-0 only，理由同 LISTS 顶部注释。
  "[&_details]:mt-0 [&_details]:rounded-item [&_details]:border [&_details]:border-border [&_details]:p-(--qy-panel-padding-sm)",
  "[&_summary]:cursor-pointer [&_summary]:font-medium [&_summary]:mb-(--qy-field-gap) [&_summary]:marker:text-muted-foreground",
].join(" ");

/**
 * 已渲染的 Markdown / 富文本阅读面；库不解析 Markdown，调用方用任意渲染器产出原生元素
 * 后放进 Prose，组件只用后代选择器排版。完整推导见上方模块注释。
 */
export function Prose({ render, className, ...props }: ProseProps) {
  return useRender({
    defaultTagName: "article",
    render,
    props: mergeProps({
      "data-slot": "prose",
      className: cn(
        PAPER,
        RHYTHM,
        HEADINGS,
        INLINE,
        LISTS,
        TASK_CHECKBOX,
        BLOCKQUOTE,
        INLINE_CODE,
        CODE_BLOCK,
        TABLE,
        HR,
        MEDIA,
        KBD,
        DETAILS,
        className,
      ),
    }, props),
  });
}
