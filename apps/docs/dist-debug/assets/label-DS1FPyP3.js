import { e as cn, a8 as useRender, a9 as mergeProps } from "./index-DM02Iz28.js";
function Label({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4",
      className
    ),
    "data-slot": "label"
  };
  return useRender({
    defaultTagName: "label",
    props: mergeProps(defaultProps, props),
    render
  });
}
export {
  Label as L
};
