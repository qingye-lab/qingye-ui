import { r as reactExports, V as formatErrorMessage, a1 as useBaseUiId, al as useRefWithInit, a2 as useButton, W as useControlled, a3 as useIsoLayoutEffect, ab as NOOP, a0 as useMergedRefs, av as useValueChanged, a9 as mergeProps, aG as EMPTY_OBJECT, Y as useRenderElement, j as jsxRuntimeExports, bg as dispatchClickWithModifiers, b0 as getWindow, aH as visuallyHiddenInput, aI as visuallyHidden, aJ as createChangeEventDetails, aK as none, ac as useTransitionStatus, ad as useOpenChangeComplete, _ as transitionStatusMapping } from "./index-DM02Iz28.js";
import { f as fieldValidityMapping, a as useFormContext, b as useFieldRootContext, u as useLabelableContext } from "./LabelableContext-DO-1KYYg.js";
import { u as useRegisterFieldControl } from "./useRegisterFieldControl-KuH2MueO.js";
import { u as useFieldItemContext } from "./FieldItemContext-DnsCt0VY.js";
import { u as useAriaLabelledBy } from "./useAriaLabelledBy-CcCbgu8M.js";
function getDefaultFormSubmitter(form) {
  if (!form) {
    return null;
  }
  for (const candidate of form.elements) {
    const tagName = candidate.tagName;
    if (tagName === "BUTTON" || tagName === "INPUT") {
      const button = candidate;
      if (button.type === "submit") {
        return button;
      }
    }
  }
  return null;
}
function getCheckboxStateAttributesMapping(state) {
  return {
    checked(value) {
      if (state.indeterminate) {
        return {};
      }
      if (value) {
        return {
          "data-checked": ""
        };
      }
      return {
        "data-unchecked": ""
      };
    },
    ...fieldValidityMapping
  };
}
const CheckboxGroupContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useCheckboxGroupContext() {
  return reactExports.useContext(CheckboxGroupContext);
}
const CheckboxRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useCheckboxRootContext() {
  const context = reactExports.useContext(CheckboxRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(14));
  }
  return context;
}
const PARENT_CHECKBOX = "data-parent";
const CheckboxRoot = /* @__PURE__ */ reactExports.forwardRef(function CheckboxRoot2(componentProps, forwardedRef) {
  const {
    checked: checkedProp,
    className,
    defaultChecked = false,
    "aria-labelledby": ariaLabelledByProp,
    disabled: disabledProp = false,
    form,
    id: idProp,
    indeterminate = false,
    inputRef: inputRefProp,
    name: nameProp,
    onCheckedChange,
    parent = false,
    readOnly = false,
    render,
    required = false,
    uncheckedValue,
    value: valueProp,
    nativeButton = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    clearErrors
  } = useFormContext();
  const {
    disabled: rootDisabled,
    name: fieldName,
    setDirty,
    setFilled,
    setFocused,
    setTouched,
    state: fieldState,
    validationMode,
    validityData,
    validation: localValidation
  } = useFieldRootContext();
  const fieldItemContext = useFieldItemContext();
  const {
    labelId,
    controlId,
    registerControlId,
    getDescriptionProps
  } = useLabelableContext();
  const groupContext = useCheckboxGroupContext();
  const parentContext = groupContext?.allValues === void 0 ? void 0 : groupContext.parent;
  const isGroupedWithParent = parentContext !== void 0;
  const disabled = rootDisabled || fieldItemContext.disabled || groupContext?.disabled || disabledProp;
  const name = fieldName ?? nameProp;
  const value = valueProp ?? name;
  const id = useBaseUiId();
  const generatedInputId = useBaseUiId();
  let inputId = idProp || controlId;
  if (isGroupedWithParent) {
    if (parent) {
      inputId = generatedInputId;
    } else if (value !== void 0) {
      inputId = `${parentContext.id}-${value}`;
    } else {
      inputId ||= generatedInputId;
    }
  }
  let groupProps = {};
  if (isGroupedWithParent) {
    if (parent) {
      groupProps = parentContext.getParentProps();
    } else if (value !== void 0) {
      groupProps = parentContext.getChildProps(value);
    }
  }
  const {
    checked: groupChecked = checkedProp,
    indeterminate: groupIndeterminate = indeterminate,
    onCheckedChange: groupOnChange,
    ...otherGroupProps
  } = groupProps;
  const groupValue = groupContext?.value;
  const controlRef = reactExports.useRef(null);
  const controlSourceRef = useRefWithInit(() => /* @__PURE__ */ Symbol());
  const hasRegisteredRef = reactExports.useRef(false);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const validation = groupContext?.validation ?? localValidation;
  const [checked, setCheckedState] = useControlled({
    controlled: value !== void 0 && groupValue !== void 0 && !parent ? groupValue.includes(value) : groupChecked,
    default: defaultChecked,
    name: "Checkbox",
    state: "checked"
  });
  const computedChecked = isGroupedWithParent ? Boolean(groupChecked) : checked;
  const computedIndeterminate = isGroupedWithParent ? groupIndeterminate || indeterminate : indeterminate;
  useIsoLayoutEffect(() => {
    if (registerControlId === NOOP) {
      return void 0;
    }
    hasRegisteredRef.current = true;
    registerControlId(controlSourceRef.current, inputId);
    return void 0;
  }, [inputId, registerControlId, controlSourceRef]);
  reactExports.useEffect(() => {
    const controlSource = controlSourceRef.current;
    return () => {
      if (!hasRegisteredRef.current || registerControlId === NOOP) {
        return;
      }
      hasRegisteredRef.current = false;
      registerControlId(controlSource, void 0);
    };
  }, [registerControlId, controlSourceRef]);
  useRegisterFieldControl(controlRef, id, checked, void 0, !groupContext && !disabled, nameProp);
  const inputRef = reactExports.useRef(null);
  const registerFieldInput = validation.registerInput;
  const registeredInputValue = groupContext ? value : void 0;
  const registerInput = reactExports.useCallback((element2) => registerFieldInput(element2, {
    controlRef,
    value: registeredInputValue
  }), [registerFieldInput, registeredInputValue]);
  const mergedInputRef = useMergedRefs(inputRefProp, inputRef, parent ? void 0 : registerInput);
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, inputId ?? void 0);
  useIsoLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = computedIndeterminate;
      if (checked) {
        setFilled(true);
      }
    }
  }, [checked, computedIndeterminate, setFilled]);
  useValueChanged(checked, () => {
    if (groupContext) {
      return;
    }
    clearErrors(name);
    setFilled(checked);
    setDirty(checked !== validityData.initialValue);
    validation.change(checked);
  });
  const inputProps = mergeProps(
    {
      checked,
      disabled,
      form,
      // parent checkboxes unset `name` to be excluded from form submission
      name: parent ? void 0 : name,
      // Set `id` to stop Chrome warning about an unassociated input.
      // When using a native button, the `id` is applied to the button instead.
      id: nativeButton ? void 0 : inputId ?? void 0,
      required,
      ref: mergedInputRef,
      style: name ? visuallyHiddenInput : visuallyHidden,
      tabIndex: -1,
      type: "checkbox",
      "aria-hidden": true,
      onChange(event) {
        if (event.nativeEvent.defaultPrevented) {
          return;
        }
        if (readOnly) {
          event.preventDefault();
          return;
        }
        const nextChecked = event.currentTarget.checked;
        const details = createChangeEventDetails(none, event.nativeEvent);
        onCheckedChange?.(nextChecked, details);
        if (details.isCanceled) {
          return;
        }
        groupOnChange?.(nextChecked, details);
        if (details.isCanceled) {
          return;
        }
        setCheckedState(nextChecked);
        if (value !== void 0 && groupContext !== void 0 && !parent && !isGroupedWithParent) {
          const nextGroupValue = nextChecked ? [...groupContext.value, value] : groupContext.value.filter((item) => item !== value);
          groupContext.setValue(nextGroupValue, details);
        }
      },
      onClick(event) {
        event.stopPropagation();
      },
      onFocus() {
        controlRef.current?.focus();
      }
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    valueProp !== void 0 ? {
      value: (groupContext ? checked && valueProp : valueProp) || ""
    } : EMPTY_OBJECT,
    getDescriptionProps,
    (props) => validation.getValidationProps(disabled, props)
  );
  reactExports.useEffect(() => {
    if (!parentContext || value === void 0) {
      return void 0;
    }
    const disabledStates = parentContext.disabledStatesRef.current;
    disabledStates.set(value, disabled);
    return () => {
      disabledStates.delete(value);
    };
  }, [parentContext, disabled, value]);
  const state = reactExports.useMemo(() => ({
    ...fieldState,
    checked: computedChecked,
    disabled,
    readOnly,
    required,
    indeterminate: computedIndeterminate
  }), [fieldState, computedChecked, disabled, readOnly, required, computedIndeterminate]);
  const stateAttributesMapping = getCheckboxStateAttributesMapping(state);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [buttonRef, controlRef, forwardedRef],
    props: [{
      id: nativeButton ? inputId ?? void 0 : id,
      role: "checkbox",
      "aria-checked": computedIndeterminate ? "mixed" : computedChecked,
      "aria-readonly": readOnly || void 0,
      "aria-required": required || void 0,
      "aria-labelledby": ariaLabelledBy,
      [PARENT_CHECKBOX]: parent ? "" : void 0,
      onFocus() {
        if (!disabled) {
          setFocused(true);
        }
      },
      onBlur() {
        const inputEl = inputRef.current;
        if (!inputEl) {
          return;
        }
        setTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          validation.commit(groupContext ? groupValue : inputEl.checked);
        }
      },
      onKeyDown(event) {
        if (event.key !== "Enter") {
          return;
        }
        event.preventBaseUIHandler();
        if (event.defaultPrevented) {
          return;
        }
        const formToSubmit = inputRef.current?.form ?? null;
        const currentTarget = event.currentTarget;
        const nativeEvent = event.nativeEvent;
        const originalPreventDefault = event.preventDefault;
        const originalNativePreventDefault = nativeEvent.preventDefault;
        let preventDefaultCalledAfterPropagation = false;
        event.preventDefault = () => {
          preventDefaultCalledAfterPropagation = true;
          originalPreventDefault.call(event);
        };
        nativeEvent.preventDefault = () => {
          preventDefaultCalledAfterPropagation = true;
          originalNativePreventDefault.call(nativeEvent);
        };
        originalNativePreventDefault.call(nativeEvent);
        getWindow(currentTarget).queueMicrotask(() => {
          event.preventDefault = originalPreventDefault;
          nativeEvent.preventDefault = originalNativePreventDefault;
          if (!preventDefaultCalledAfterPropagation) {
            getDefaultFormSubmitter(formToSubmit)?.click();
          }
        });
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
    }, elementProps, otherGroupProps, getButtonProps, getDescriptionProps, (props) => validation.getValidationProps(disabled, props)],
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CheckboxRootContext.Provider, {
    value: state,
    children: [element, !checked && !groupContext && name && !parent && uncheckedValue !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
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
const CheckboxIndicator = /* @__PURE__ */ reactExports.forwardRef(function CheckboxIndicator2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const rootState = useCheckboxRootContext();
  const rendered = rootState.checked || rootState.indeterminate;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  const indicatorRef = reactExports.useRef(null);
  const state = {
    ...rootState,
    transitionStatus
  };
  useOpenChangeComplete({
    open: rendered,
    ref: indicatorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  const baseStateAttributesMapping = getCheckboxStateAttributesMapping(rootState);
  const stateAttributesMapping = {
    ...baseStateAttributesMapping,
    ...transitionStatusMapping
  };
  const shouldRender = keepMounted || mounted;
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, indicatorRef],
    state,
    stateAttributesMapping,
    props: elementProps
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
export {
  CheckboxRoot as C,
  CheckboxIndicator as a,
  CheckboxGroupContext as b
};
