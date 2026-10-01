import { r as reactExports, a1 as useBaseUiId, W as useControlled, a2 as useButton, Y as useRenderElement, j as jsxRuntimeExports, br as CompositeItem, aJ as createChangeEventDetails, aK as none, e as cn, a7 as cva } from "./index-DM02Iz28.js";
const ToggleGroupContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useToggleGroupContext() {
  return reactExports.useContext(ToggleGroupContext);
}
const Toggle$1 = /* @__PURE__ */ reactExports.forwardRef(function Toggle2(componentProps, forwardedRef) {
  const {
    className,
    defaultPressed: defaultPressedProp = false,
    disabled: disabledProp = false,
    form,
    // never participates in form validation
    onPressedChange,
    pressed: pressedProp,
    render,
    type,
    // cannot change button type
    value: valueProp,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const value = useBaseUiId(valueProp || void 0);
  const groupContext = useToggleGroupContext();
  const groupValue = groupContext?.value ?? [];
  const defaultPressed = groupContext ? void 0 : defaultPressedProp;
  const disabled = (disabledProp || groupContext?.disabled) ?? false;
  const [pressed, setPressedState] = useControlled({
    controlled: groupContext ? value !== void 0 && groupValue.indexOf(value) > -1 : pressedProp,
    default: defaultPressed,
    name: "Toggle",
    state: "pressed"
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const state = {
    disabled,
    pressed
  };
  const refs = [buttonRef, forwardedRef];
  const props = [{
    "aria-pressed": pressed,
    onClick(event) {
      const nextPressed = !pressed;
      const details = createChangeEventDetails(none, event.nativeEvent);
      onPressedChange?.(nextPressed, details);
      if (details.isCanceled) {
        return;
      }
      if (value) {
        groupContext?.setGroupValue?.(value, nextPressed, details);
      }
      if (details.isCanceled) {
        return;
      }
      setPressedState(nextPressed);
    }
  }, elementProps, getButtonProps];
  const element = useRenderElement("button", componentProps, {
    enabled: !groupContext,
    state,
    ref: refs,
    props
  });
  const itemMetadata = reactExports.useMemo(() => ({
    disabled,
    focusableWhenDisabled: false
  }), [disabled]);
  if (groupContext) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeItem, {
      tag: "button",
      render,
      className,
      style,
      metadata: itemMetadata,
      state,
      refs,
      props
    });
  }
  return element;
});
const toggleVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-base text-foreground outline-none transition-[box-shadow,background-color,color] duration-(--qy-duration-fast) ease-(--qy-ease-out) before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 data-pressed:bg-input/64 data-pressed:text-accent-foreground sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default"
    },
    variants: {
      size: {
        default: "h-9 min-w-9 px-[calc(--spacing(2)-1px)] sm:h-8 sm:min-w-8",
        lg: "h-10 min-w-10 px-[calc(--spacing(2.5)-1px)] sm:h-9 sm:min-w-9",
        sm: "h-8 min-w-8 px-[calc(--spacing(1.5)-1px)] sm:h-7 sm:min-w-7"
      },
      variant: {
        default: "border-transparent",
        outline: "border-input bg-background not-dark:bg-clip-padding shadow-xs/5 not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] dark:bg-input/32 dark:data-pressed:bg-input dark:hover:bg-input/64 dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] dark:not-disabled:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/2%)] [:disabled,:active,[data-pressed]]:shadow-none"
      }
    }
  }
);
function Toggle({
  className,
  variant,
  size,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toggle$1,
    {
      className: cn(toggleVariants({ className, size, variant })),
      "data-slot": "toggle",
      ...props
    }
  );
}
export {
  ToggleGroupContext as T,
  Toggle as a,
  Toggle$1 as b
};
