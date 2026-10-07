/*
 * 导航线（基础层 §6、§19）：标签页与导航菜单都是「在几个目的地之间走动」，用同一种画法；
 * 分段控件是「选一个值」，用轨道，二者名实不同，画法也不同。
 *
 * - 骨法用笔：一组目的地下面一道清墨基线，说明它们属于同一层。当前项把基线上自己那一段
 *   加深为焦墨——状态只加深已有的线，不新增形，也不加粗。
 * - 墨分五色：未到达的目的地是浓墨，悬停与当前是焦墨。当前项不改字重，避免文字变宽、整排跳动。
 * - 疏密有致：目的地彼此独立，相隔一个组间距；条目高一个控件，跟随密度。
 */
export const navLineListClassName =
  "flex min-w-0 items-stretch gap-(--qy-field-group-gap) border-b border-border";

export const navLineItemClassName =
  "relative -mb-px inline-flex min-h-(--qy-fill-height) min-w-0 shrink-0 cursor-pointer items-center gap-(--qy-control-content-gap) border-b border-transparent text-body text-muted-foreground outline-none transition-[color,border-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) hover:text-foreground focus-visible:ring-inset focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring data-disabled:cursor-not-allowed data-disabled:opacity-64 [&_svg]:size-(--qy-control-md-icon) [&_svg]:shrink-0";

export const navLineCurrentClassName = "border-foreground text-foreground";

/*
 * 导航线·纵向：阅读目录（Toc）与标签页、导航菜单是同一类任务——在几个目的地间走动，
 * 不是选一个值——只是目的地纵向排列时，共享的是左边这条线，不是底边。机制不变：
 * 一条清墨基线贯穿整份列表（画在列表容器上，不随条目间距断开），当前项把自己那一段
 * 加深为焦墨；`navLineCurrentClassName` 只设颜色，横纵通用，直接复用。
 */
export const navLineListClassNameVertical = "flex min-w-0 flex-col border-s border-border";

export const navLineItemClassNameVertical =
  "relative -ms-px block min-w-0 cursor-pointer border-s border-transparent text-support text-muted-foreground outline-none transition-[color,border-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) hover:text-foreground focus-visible:ring-inset focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring wrap-anywhere";
