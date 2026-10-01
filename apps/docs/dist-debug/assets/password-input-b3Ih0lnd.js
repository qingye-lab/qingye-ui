import { c as createLucideIcon, q as useUILocale, r as reactExports, j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon, d as InputGroupButton } from "./input-group-2ApKrTnA.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
const iconClassName = "col-start-1 row-start-1 transition-[opacity,scale] duration-(--qy-duration-fast) ease-(--qy-ease-out)";
function useInheritedDisabled() {
  const ref = reactExports.useRef(null);
  const [disabled, setDisabled] = reactExports.useState(false);
  reactExports.useLayoutEffect(() => {
    const next = Boolean(ref.current?.disabled);
    if (next !== disabled) setDisabled(next);
  });
  return [ref, disabled];
}
function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}
function PasswordInput({
  className,
  size = "default",
  visible: visibleProp,
  defaultVisible = false,
  onVisibleChange,
  showLabel,
  disabled,
  id,
  ref,
  ...props
}) {
  const { messages } = useUILocale();
  const generatedId = reactExports.useId();
  const inputId = id ?? generatedId;
  const [uncontrolled, setUncontrolled] = reactExports.useState(defaultVisible);
  const visible = visibleProp ?? uncontrolled;
  const [inputRef, inheritedDisabled] = useInheritedDisabled();
  const setRefs = reactExports.useMemo(() => mergeRefs(inputRef, ref), [inputRef, ref]);
  const toggle = () => {
    const next = !visible;
    if (visibleProp === void 0) setUncontrolled(next);
    onVisibleChange?.(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputGroupInput,
      {
        autoCapitalize: "none",
        autoCorrect: "off",
        className: "[&_input::-ms-reveal]:hidden",
        disabled,
        id: inputId,
        size,
        spellCheck: false,
        ...props,
        ref: setRefs,
        type: visible ? "text" : "password"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputGroupButton,
      {
        "aria-controls": inputId,
        "aria-label": showLabel ?? messages.showPassword,
        "aria-pressed": visible,
        "data-slot": "password-input-toggle",
        disabled: disabled || inheritedDisabled,
        onClick: toggle,
        size: size === "lg" ? "icon-sm" : "icon-xs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "aria-hidden": "true", className: "grid place-items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Eye,
            {
              className: cn(iconClassName, visible ? "scale-60 opacity-0" : "opacity-80"),
              "data-slot": "password-input-icon"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EyeOff,
            {
              className: cn(iconClassName, visible ? "opacity-80" : "scale-60 opacity-0"),
              "data-slot": "password-input-icon"
            }
          )
        ] })
      }
    ) })
  ] });
}
export {
  PasswordInput as P
};
