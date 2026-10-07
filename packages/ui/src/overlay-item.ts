/*
 * 浮层里的条目（基础层 §4、§6、§8）：候选项（Select、Combobox、Autocomplete）与菜单项是同一种关系——
 * 浮层纸上的一行可选之物。一种几何，一个来源（NG3）。
 * - 圆角按浮层同心换算（浮层圆角 − 内缩）；高亮是指针或键盘位置，用清墨底，与选中（尾部对勾）可同时出现。
 * - 禁用沿用命令类预设 opacity-64（基础层 §9「只读与禁用」）。
 */
export const overlayItemClassName = "min-w-0 cursor-default gap-(--qy-field-gap) rounded-(--qy-radius-overlay-item) outline-none data-highlighted:bg-accent data-disabled:cursor-not-allowed data-disabled:opacity-64";

/*
 * 候选项：值是内容，字号与触发器相同，不因容器或密度改变（用户裁决 2026-10-05）；行高跟随填值控件的角色层，随密度降档。
 * 文字起点与触发器文字同一条竖线：水平留白 = 填值内缘 − 浮层内缩。
 * 上下留白 = (填值外高 − 行高) / 2：一行时正好一个填值控件高，折行时上下留白不变。
 */
export const candidateItemClassName = "min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height) px-[calc(var(--qy-fill-padding)-var(--qy-overlay-inset))] py-[calc((var(--qy-fill-height-narrow)-var(--qy-text-control-md-mobile-leading))/2)] sm:py-[calc((var(--qy-fill-height)-var(--qy-text-control-md-leading))/2)] text-control-md-mobile sm:text-control-md whitespace-normal wrap-break-word pointer-coarse:min-h-(--qy-touch-target)";

/*
 * 候选列表为空时（随境取度）：浮层里不放整块 Empty，那句话坐在第一项的位置上——
 * 同一起点、同一行高、同一字号，浓墨。Empty 与 List 并列放在浮层里，所以外边距补上列表的内缩；
 * 有候选时元素为空，不占任何空间（不改 display，保留原语的播报）。
 */
export const candidateEmptyClassName = "text-control-md-mobile sm:text-control-md text-muted-foreground wrap-break-word not-empty:m-(--qy-overlay-inset) not-empty:px-[calc(var(--qy-fill-padding)-var(--qy-overlay-inset))] not-empty:py-[calc((var(--qy-fill-height-narrow)-var(--qy-text-control-md-mobile-leading))/2)] sm:not-empty:py-[calc((var(--qy-fill-height)-var(--qy-text-control-md-leading))/2)]";
