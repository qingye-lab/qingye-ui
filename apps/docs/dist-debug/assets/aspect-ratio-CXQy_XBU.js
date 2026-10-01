import { e as cn, a8 as useRender, a9 as mergeProps } from "./index-DM02Iz28.js";
function AspectRatio({
  ratio = 1,
  className,
  style,
  render,
  ...props
}) {
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  const defaultProps = {
    className: cn(
      "relative w-full *:absolute *:inset-0 *:size-full",
      className
    ),
    "data-ratio": String(safeRatio),
    "data-slot": "aspect-ratio",
    style: { aspectRatio: String(safeRatio), ...style }
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
export {
  AspectRatio as A
};
