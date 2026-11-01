/*
 * 按钮类控件的五档几何，Button 与 ButtonGroupText 共用（同一组成员同高、同边线，不各写一份）。
 *
 * 基础层 §1、§2、§8：位置选择尺寸与文字档，图标只是形态；留白由基础层换算。
 * 每档使用同名的文字档，高度与字号同步增长 —— 只涨高度不涨字号会让多出的
 * 空间全部变成纵向空白，文字占比反而下降（lg 曾用 md 的文字档，
 * 每侧留白由 6 跳到 8，文字占比从 62.5% 掉到 55.6%，比 xl 还低）。
 * xl 曾取 lg 的文字档，同一病因（每侧 8px），现在有自己的一档。
 */
export const controlSizes = {
  xs: "rounded-xs min-h-(--qy-control-xs-narrow) text-control-xs-mobile sm:min-h-(--qy-control-xs) sm:text-control-xs [&_svg]:size-(--qy-control-xs-icon-narrow) sm:[&_svg]:size-(--qy-control-xs-icon)",
  sm: "rounded-sm min-h-(--qy-control-sm-narrow) text-control-sm-mobile sm:min-h-(--qy-control-sm) sm:text-control-sm [&_svg]:size-(--qy-control-sm-icon-narrow) sm:[&_svg]:size-(--qy-control-sm-icon)",
  // md 与填值控件同行出现（工具条、筛选条、表单动作），二者的关系是「同高」。因此 md 的
  // 几何读填值控件角色层而不是固定档位：默认密度下取值与原 md 完全相同，紧凑密度下随
  // 输入框一起收紧——否则同一行里输入 28px、按钮 32px，外缘对不齐（评审 2026-10-05）。
  // 文字仍是 md 文字档，与填值控件一样「紧凑只收几何，不缩文字」。其余四档是位置的显式
  // 选择，不随密度改变。
  md: "rounded-(--qy-fill-radius) min-h-(--qy-fill-height-narrow) text-control-md-mobile sm:min-h-(--qy-fill-height) sm:text-control-md [&_svg]:size-(--qy-fill-icon-narrow) sm:[&_svg]:size-(--qy-fill-icon)",
  lg: "rounded-control min-h-(--qy-control-lg-narrow) text-control-lg-mobile sm:min-h-(--qy-control-lg) sm:text-control-lg [&_svg]:size-(--qy-control-lg-icon-narrow) sm:[&_svg]:size-(--qy-control-lg-icon)",
  xl: "rounded-control min-h-(--qy-control-xl-narrow) text-control-xl-mobile sm:min-h-(--qy-control-xl) sm:text-control-xl [&_svg]:size-(--qy-control-xl-icon-narrow) sm:[&_svg]:size-(--qy-control-xl-icon)",
} as const;

export type ControlSize = keyof typeof controlSizes;

/** 带边线（bordered）时文字形的横向留白：边线占去一道线宽，留白取各档的 bordered 值；md 读填值控件的留白，与 Input 同起点。 */
export const borderedPadding = {
  xs: "px-(--qy-control-xs-padding-bordered)",
  sm: "px-(--qy-control-sm-padding-bordered)",
  md: "px-(--qy-fill-padding)",
  lg: "px-(--qy-control-lg-padding-bordered)",
  xl: "px-(--qy-control-xl-padding-bordered)",
} as const satisfies Record<ControlSize, string>;
