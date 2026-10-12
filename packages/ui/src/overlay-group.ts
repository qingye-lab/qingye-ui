/*
 * 候选浮层里的分组（基础层 §3、§18「一致」）：Select、Combobox、Autocomplete 的候选列表是同一种关系，
 * 同一种画法（NG3），一个来源。
 * - 组名：说明「下面几项属于谁」，不是可选之物。辅助字号档、辅助墨色；
 *   水平留白 = md 边框内缘 − 浮层内缩，默认密度下与候选项文字同一条竖线（候选项读 --qy-fill-padding，
 *   紧凑密度下二者不同值，组名不随之降档——沿用 Select 既有写法，未在本次改动）；上方两个间距单位、
 *   下方一个，组名离自己的项近、离上一组远，靠间距而非线读出分组（§3）。这些取值原样来自 SelectGroupLabel，**预设**。
 * - 分隔线：组与组之间需要比间距更强的分界时才用（NG4）；与菜单的分隔线同一画法——一道清墨线，
 *   出血到浮层内缘（抵消列表内缩），上下各留一个浮层内缩。
 */
export const overlayGroupLabelClassName = "min-w-0 px-[calc(var(--qy-control-md-padding-bordered)-var(--qy-overlay-inset))] pt-(--qy-space-2) pb-(--qy-space-1) text-caption text-muted-foreground wrap-break-word";
export const overlaySeparatorClassName = "-mx-(--qy-overlay-inset) my-(--qy-overlay-inset) h-0 border-b border-border";
