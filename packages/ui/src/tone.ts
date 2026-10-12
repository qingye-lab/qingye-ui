/*
 * 状态类别（随类赋彩，基础层 §7）：彩色只表达危险、警示、成功、信息这几类事实。
 * 类别由调用方声明，组件不从数值猜好坏；色相之外必须另有文字、格数或位置承担同一事实（灰度检验）。
 *
 * 类别与 Badge 的 BadgeTone 是同一组值；同一类别同一色相。图形里的线与填充取「图形」一档
 * （--qy-*-graphic），不取文字色（--qy-*-foreground）：文字色按「纸上读字 4.5:1」定明度，
 * 没有为四色并排的色觉可分、也没有为压在读数凹槽上留余地。取值与理由见 semantic.css。
 */
export type Tone = "danger" | "warning" | "success" | "info";

export const TONES: readonly Tone[] = ["danger", "warning", "success", "info"];

/** 供 SVG 的 fill / stroke 与行内 style 使用的颜色。 */
export const toneColor: Record<Tone, string> = {
  danger: "var(--qy-danger-graphic)",
  warning: "var(--qy-warning-graphic)",
  success: "var(--qy-success-graphic)",
  info: "var(--qy-info-graphic)",
};

/** 供 HTML 元素的填充使用的类名。 */
export const toneFillClassName: Record<Tone, string> = {
  danger: "bg-danger-graphic",
  warning: "bg-warning-graphic",
  success: "bg-success-graphic",
  info: "bg-info-graphic",
};

export function assertTone(tone: unknown, owner: string): asserts tone is Tone | undefined {
  if (tone !== undefined && !TONES.includes(tone as Tone)) throw new RangeError(`${owner} tone must be one of ${TONES.join(", ")}.`);
}
