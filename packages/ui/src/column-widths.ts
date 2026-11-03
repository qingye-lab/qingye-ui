/** 一列的宽度声明：写了 grow 的列按权重分剩余空间并受 min/max 约束；其余列占 base。 */
export type ColumnTrack =
  | { base: number; grow?: undefined }
  | { grow: number; min: number; max: number };

/**
 * 把容器宽度分给各列，算法与 flex 的「冻结后重分」相同：按权重试分，违反上下限的一方先冻结在界上，余量回到其它列重分。
 * 放不下时下限优先，总宽超过容器（由容器横向滚动）；所有弹性列都到上限时不强行铺满，总宽停在各列之和。
 * 弹性列取整，余下的不足一列一像素的部分给最后一个未到界的弹性列，总宽恰好等于容器。
 */
export function resolveColumnWidths(tracks: readonly ColumnTrack[], available: number): number[] {
  const widths = tracks.map(track => track.grow === undefined ? track.base : 0);
  let open = tracks.flatMap((track, index) => track.grow === undefined ? [] : [{ index, grow: track.grow, min: track.min, max: track.max }]);
  let free = available - widths.reduce((sum, width) => sum + width, 0);
  let last: number | undefined;
  while (open.length > 0) {
    const total = open.reduce((sum, track) => sum + track.grow, 0);
    const offers = open.map(track => {
      const target = free * track.grow / total;
      return { track, target, width: Math.min(track.max, Math.max(track.min, target)) };
    });
    const violation = offers.reduce((sum, offer) => sum + offer.width - offer.target, 0);
    const frozen = Math.abs(violation) < 0.001 ? offers : offers.filter(offer => violation > 0 ? offer.width > offer.target : offer.width < offer.target);
    for (const { track, width } of frozen) {
      widths[track.index] = Math.floor(width);
      free -= width;
    }
    if (frozen === offers) last = open[open.length - 1]!.index;
    open = open.filter(track => !frozen.some(offer => offer.track === track));
  }
  if (last !== undefined) widths[last]! += Math.max(0, available - widths.reduce((sum, width) => sum + width, 0));
  return widths;
}
