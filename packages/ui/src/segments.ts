/*
 * 读数轨道的分格（基础层 §9）：离散的量是 n 级，轨道就分 n 格；填充的宽度仍由值决定。
 * 半格的填充与「离散」名实不符，所以值不在格边界上时抛错，而不是取整。
 * 浮点误差容限 1e-6 格：只吸收 (value − min) / (max − min) × n 的除法舍入，远小于一格。
 * 没有值（不确定进度）时没有可填的格，同样抛错。
 */
export function assertSegments(owner: string, segments: number | undefined, value: number | null, min: number, max: number) {
  if (segments === undefined) return;
  if (!Number.isInteger(segments) || segments < 2) throw new RangeError(`${owner} segments must be an integer of 2 or more.`);
  if (value === null) throw new RangeError(`${owner} segments requires a value; an indeterminate progress has no cell to fill.`);
  const cells = (value - min) / (max - min) * segments;
  if (Math.abs(cells - Math.round(cells)) > 1e-6) throw new RangeError(`${owner} value must fall on a segment boundary; a half-filled cell contradicts a discrete scale.`);
}
