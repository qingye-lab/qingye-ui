import { e as cn, a8 as useRender, a9 as mergeProps } from "./index-DM02Iz28.js";
function Card({
  className,
  render,
  size = "default",
  ...props
}) {
  const defaultProps = {
    className: cn(
      "[--card-spacing:var(--qy-panel-padding)] [--card-gap:--spacing(4)] data-[size=sm]:[--card-spacing:var(--qy-panel-padding-sm)] data-[size=sm]:[--card-gap:--spacing(3)]",
      "relative flex flex-col rounded-2xl border bg-card not-dark:bg-clip-padding text-card-foreground shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      className
    ),
    "data-size": size,
    "data-slot": "card"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardFrame({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "relative flex flex-col rounded-2xl border bg-card not-dark:bg-clip-padding text-card-foreground shadow-xs/5 [--clip-bottom:-1rem] [--clip-top:-1rem] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72 before:shadow-[0_1px_--theme(--color-black/4%)] has-data-[slot=table-container]:overflow-hidden *:data-[slot=card]:-m-px *:data-[slot=table-container]:-m-px *:data-[slot=table-container]:w-[calc(100%+2px)] *:not-first:data-[slot=card]:rounded-t-xl *:not-last:data-[slot=card]:rounded-b-xl *:data-[slot=card]:bg-clip-padding *:data-[slot=card]:shadow-none *:data-[slot=card]:before:hidden *:not-first:data-[slot=card]:before:rounded-t-[calc(var(--radius-xl)-1px)] *:not-last:data-[slot=card]:before:rounded-b-[calc(var(--radius-xl)-1px)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] *:data-[slot=card]:[clip-path:inset(var(--clip-top)_1px_var(--clip-bottom)_1px_round_calc(var(--radius-2xl)-1px))] *:data-[slot=card]:last:[--clip-bottom:1px] *:data-[slot=card]:first:[--clip-top:1px]",
      className
    ),
    "data-slot": "card-frame"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardFrameHeader({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "relative flex grid auto-rows-min grid-rows-[auto_auto] flex-col items-start gap-x-4 px-6 py-4 has-data-[slot=card-frame-action]:grid-cols-[1fr_auto]",
      className
    ),
    "data-slot": "card-frame-header"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardFrameTitle({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("self-center font-semibold text-sm", className),
    "data-slot": "card-frame-title"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardFrameDescription({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("self-center text-muted-foreground text-sm", className),
    "data-slot": "card-frame-description"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardFrameAction({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "col-start-2 nth-3:row-span-2 nth-3:row-start-1 inline-flex self-center justify-self-end",
      className
    ),
    "data-slot": "card-frame-action"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardFrameFooter({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("px-6 py-4", className),
    "data-slot": "card-frame-footer"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardHeader({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-(--card-spacing) in-[[data-slot=card]:has(>[data-slot=card-panel])]:pb-(--card-gap) has-data-[slot=card-action]:grid-cols-[1fr_auto]",
      className
    ),
    "data-slot": "card-header"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardTitle({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("font-heading font-semibold text-lg leading-none", className),
    "data-slot": "card-title"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardDescription({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("text-muted-foreground text-sm", className),
    "data-slot": "card-description"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardAction({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "col-start-2 row-span-2 row-start-1 inline-flex self-start justify-self-end",
      className
    ),
    "data-slot": "card-action"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardPanel({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex-1 p-(--card-spacing) in-[[data-slot=card]:has(>[data-slot=card-header]:not(.border-b))]:pt-0 in-[[data-slot=card]:has(>[data-slot=card-footer]:not(.border-t))]:pb-0",
      className
    ),
    "data-slot": "card-panel"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function CardFooter({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex items-center p-(--card-spacing) in-[[data-slot=card]:has(>[data-slot=card-panel])]:pt-(--card-gap)",
      className
    ),
    "data-slot": "card-footer"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
export {
  Card as C,
  CardHeader as a,
  CardTitle as b,
  CardDescription as c,
  CardPanel as d,
  CardFooter as e,
  CardAction as f,
  CardFrame as g,
  CardFrameHeader as h,
  CardFrameTitle as i,
  CardFrameDescription as j,
  CardFrameAction as k,
  CardFrameFooter as l
};
