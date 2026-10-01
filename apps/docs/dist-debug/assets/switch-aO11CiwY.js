import { r as reactExports, V as formatErrorMessage, a0 as useMergedRefs, a1 as useBaseUiId, W as useControlled, a3 as useIsoLayoutEffect, av as useValueChanged, a2 as useButton, aG as EMPTY_OBJECT, Y as useRenderElement, j as jsxRuntimeExports, aH as visuallyHiddenInput, aI as visuallyHidden, aJ as createChangeEventDetails, aK as none, bg as dispatchClickWithModifiers, e as cn } from "./index-DM02Iz28.js";
import { f as fieldValidityMapping, a as useFormContext, b as useFieldRootContext, u as useLabelableContext } from "./LabelableContext-DO-1KYYg.js";
import { u as useRegisterFieldControl } from "./useRegisterFieldControl-KuH2MueO.js";
import { u as useAriaLabelledBy } from "./useAriaLabelledBy-CcCbgu8M.js";
import { u as useLabelableId } from "./useLabelableId-aT49TJD-.js";
const SwitchRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useSwitchRootContext() {
  const context = reactExports.useContext(SwitchRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(63));
  }
  return context;
}
const stateAttributesMapping = {
  ...fieldValidityMapping,
  checked(value) {
    if (value) {
      return {
        "data-checked": ""
      };
    }
    return {
      "data-unchecked": ""
    };
  }
};
const SwitchRoot = /* @__PURE__ */ reactExports.forwardRef(function SwitchRoot2(componentProps, forwardedRef) {
  const {
    checked: checkedProp,
    className,
    defaultChecked,
    "aria-labelledby": ariaLabelledByProp,
    form,
    id: idProp,
    inputRef: externalInputRef,
    name: nameProp,
    nativeButton = false,
    onCheckedChange,
    readOnly = false,
    required = false,
    disabled: disabledProp = false,
    render,
    uncheckedValue,
    value,
    style,
    ...elementProps
  } = componentProps;
  const {
    clearErrors
  } = useFormContext();
  const {
    state: fieldState,
    setTouched,
    setDirty,
    validityData,
    setFilled,
    setFocused,
    validationMode,
    disabled: fieldDisabled,
    name: fieldName,
    validation
  } = useFieldRootContext();
  const {
    labelId
  } = useLabelableContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const inputRef = reactExports.useRef(null);
  const handleInputRef = useMergedRefs(inputRef, externalInputRef, validation.inputRef);
  const switchRef = reactExports.useRef(null);
  const id = useBaseUiId();
  const controlId = useLabelableId({
    id: idProp,
    implicit: false,
    controlRef: switchRef
  });
  const hiddenInputId = nativeButton ? void 0 : controlId;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  useRegisterFieldControl(switchRef, id, checked, void 0, !disabled, nameProp);
  useIsoLayoutEffect(() => {
    if (inputRef.current) {
      setFilled(inputRef.current.checked);
    }
  }, [setFilled]);
  useValueChanged(checked, () => {
    clearErrors(name);
    setDirty(checked !== validityData.initialValue);
    setFilled(checked);
    validation.change(checked);
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId);
  const rootProps = {
    id: nativeButton ? controlId : id,
    role: "switch",
    "aria-checked": checked,
    "aria-readonly": readOnly || void 0,
    "aria-required": required || void 0,
    "aria-labelledby": ariaLabelledBy,
    onFocus() {
      if (!disabled) {
        setFocused(true);
      }
    },
    onBlur() {
      const element2 = inputRef.current;
      if (!element2 || disabled) {
        return;
      }
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(element2.checked);
      }
    },
    onClick(event) {
      if (readOnly || disabled) {
        return;
      }
      event.preventDefault();
      const input = inputRef.current;
      if (!input) {
        return;
      }
      dispatchClickWithModifiers(input, event);
    }
  };
  const inputProps = {
    ...validation.getValidationProps(disabled),
    checked,
    disabled,
    form,
    id: hiddenInputId,
    name,
    required,
    style: name ? visuallyHiddenInput : visuallyHidden,
    tabIndex: -1,
    type: "checkbox",
    "aria-hidden": true,
    ref: handleInputRef,
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      if (readOnly) {
        event.preventDefault();
        return;
      }
      const nextChecked = event.currentTarget.checked;
      const eventDetails = createChangeEventDetails(none, event.nativeEvent);
      onCheckedChange?.(nextChecked, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      setCheckedState(nextChecked);
    },
    onClick(event) {
      event.stopPropagation();
    },
    onFocus() {
      switchRef.current?.focus();
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    ...value !== void 0 ? {
      value
    } : EMPTY_OBJECT
  };
  const state = reactExports.useMemo(() => ({
    ...fieldState,
    checked,
    disabled,
    readOnly,
    required
  }), [fieldState, checked, disabled, readOnly, required]);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [forwardedRef, switchRef, buttonRef],
    props: [rootProps, elementProps, getButtonProps, (props) => validation.getValidationProps(disabled, props)],
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchRootContext.Provider, {
    value: state,
    children: [element, !checked && name && uncheckedValue !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      form,
      name,
      value: uncheckedValue,
      disabled
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      ...inputProps,
      suppressHydrationWarning: true
    })]
  });
});
const SwitchThumb = /* @__PURE__ */ reactExports.forwardRef(function SwitchThumb2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const state = useSwitchRootContext();
  return useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    stateAttributesMapping,
    props: elementProps
  });
});
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SwitchRoot,
    {
      className: cn(
        "touch-target relative inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px outline-none transition-[background-color,box-shadow] duration-200 [--thumb-size:--spacing(5)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:cursor-not-allowed data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-64 sm:[--thumb-size:--spacing(4)]",
        className
      ),
      "data-slot": "switch",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchThumb,
        {
          className: cn(
            "pointer-events-none block aspect-square h-full origin-left in-[[role=switch]:active,[data-slot=label]:active,[data-slot=field-label]:active]:not-data-disabled:scale-x-110 in-[[role=switch]:active,[data-slot=label]:active,[data-slot=field-label]:active]:rounded-[var(--thumb-size)/calc(var(--thumb-size)*1.1)] rounded-(--thumb-size) bg-background shadow-sm/5 will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s] data-checked:origin-[var(--thumb-size)_50%] data-checked:translate-x-[calc(var(--thumb-size)-4px)] rtl:not-data-checked:origin-right rtl:data-checked:origin-left rtl:data-checked:-translate-x-[calc(var(--thumb-size)-4px)]"
          ),
          "data-slot": "switch-thumb"
        }
      )
    }
  );
}
export {
  Switch as S
};
