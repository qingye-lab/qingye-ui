import { _ as transitionStatusMapping, r as reactExports, V as formatErrorMessage, ab as NOOP, a0 as useMergedRefs, a3 as useIsoLayoutEffect, a1 as useBaseUiId, a2 as useButton, aG as EMPTY_OBJECT, Y as useRenderElement, j as jsxRuntimeExports, br as CompositeItem, aH as visuallyHiddenInput, aI as visuallyHidden, bg as dispatchClickWithModifiers, aJ as createChangeEventDetails, aK as none, W as useControlled, X as useStableCallback, av as useValueChanged, bs as SHIFT, aN as contains } from "./index-DM02Iz28.js";
import { f as fieldValidityMapping, b as useFieldRootContext, u as useLabelableContext, a as useFormContext } from "./LabelableContext-DO-1KYYg.js";
import { A as ACTIVE_COMPOSITE_ITEM, C as CompositeRoot } from "./CompositeRoot-xQsp56hN.js";
import { u as useFieldItemContext } from "./FieldItemContext-DnsCt0VY.js";
import { u as useAriaLabelledBy } from "./useAriaLabelledBy-CcCbgu8M.js";
import { u as useLabelableId } from "./useLabelableId-aT49TJD-.js";
import { s as serializeValue } from "./serializeValue-BLvnTy3o.js";
import { u as useRegisterFieldControl } from "./useRegisterFieldControl-KuH2MueO.js";
import { i as isEligibleInput } from "./useFieldValidation-CDOPo50V.js";
import { u as useFieldsetRootContext } from "./FieldsetRootContext-Dg8z8pLL.js";
const stateAttributesMapping = {
  checked(value) {
    if (value) {
      return {
        "data-checked": ""
      };
    }
    return {
      "data-unchecked": ""
    };
  },
  ...transitionStatusMapping,
  ...fieldValidityMapping
};
const RadioGroupContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useRadioGroupContext() {
  return reactExports.useContext(RadioGroupContext);
}
const RadioRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useRadioRootContext() {
  const value = reactExports.useContext(RadioRootContext);
  if (value === void 0) {
    throw new Error(formatErrorMessage(52));
  }
  return value;
}
const RadioRoot = /* @__PURE__ */ reactExports.forwardRef(function RadioRoot2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    readOnly: readOnlyProp = false,
    required: requiredProp = false,
    "aria-labelledby": ariaLabelledByProp,
    value,
    inputRef: inputRefProp,
    nativeButton = false,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  const groupContext = useRadioGroupContext();
  const {
    disabled: disabledGroup,
    readOnly: readOnlyGroup,
    required: requiredGroup,
    form: formGroup,
    checkedValue,
    touched = false,
    validation,
    name,
    setCheckedValue = NOOP,
    setTouched = NOOP,
    registerInputRef = NOOP
  } = groupContext ?? {};
  const {
    setTouched: setFieldTouched,
    setFilled,
    state: fieldState,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const fieldItemContext = useFieldItemContext();
  const {
    labelId,
    getDescriptionProps
  } = useLabelableContext();
  const disabled = fieldDisabled || fieldItemContext.disabled || disabledGroup || disabledProp;
  const readOnly = readOnlyGroup || readOnlyProp;
  const required = requiredGroup || requiredProp;
  const form = formGroup;
  const checked = groupContext ? checkedValue === value : value === "";
  const radioRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const registerFieldInput = validation?.registerInput;
  const registerInput = reactExports.useCallback((element2) => registerFieldInput?.(element2, {
    controlRef: radioRef,
    value: void 0
  }), [registerFieldInput]);
  const mergedInputRef = useMergedRefs(inputRefProp, inputRef, registerInputRef, registerInput);
  useIsoLayoutEffect(() => {
    if (inputRef.current?.checked) {
      setFilled(true);
    }
  }, [setFilled]);
  useIsoLayoutEffect(() => {
    if (!inputRef.current) {
      return;
    }
    if (disabled && checked) {
      registerInputRef(null);
      return;
    }
    registerInputRef(inputRef.current);
  }, [checked, disabled, registerInputRef]);
  const id = useBaseUiId();
  const inputId = useLabelableId({
    id: idProp,
    implicit: false,
    controlRef: radioRef
  });
  const hiddenInputId = nativeButton ? void 0 : inputId;
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId);
  const rootProps = {
    role: "radio",
    "aria-checked": checked,
    "aria-labelledby": ariaLabelledBy,
    [ACTIVE_COMPOSITE_ITEM]: checked ? "" : void 0,
    id: nativeButton ? inputId : id,
    onKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
    onClick(event) {
      if (event.defaultPrevented || disabled || readOnly) {
        return;
      }
      event.preventDefault();
      const input = inputRef.current;
      if (!input) {
        return;
      }
      dispatchClickWithModifiers(input, event);
    },
    onFocus(event) {
      if (event.defaultPrevented || disabled || readOnly || !touched) {
        return;
      }
      inputRef.current?.click();
      setTouched(false);
    }
  };
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton,
    composite: false
  });
  const inputProps = {
    type: "radio",
    ref: mergedInputRef,
    form,
    id: hiddenInputId,
    name,
    tabIndex: -1,
    style: name ? visuallyHiddenInput : visuallyHidden,
    "aria-hidden": true,
    ...value !== void 0 ? {
      value: serializeValue(value)
    } : EMPTY_OBJECT,
    disabled,
    checked,
    required,
    readOnly,
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      if (disabled || readOnly || value === void 0) {
        return;
      }
      const details = createChangeEventDetails(none, event.nativeEvent);
      setCheckedValue(value, details);
      if (details.isCanceled) {
        return;
      }
      setFieldTouched(true);
    },
    onClick(event) {
      event.stopPropagation();
    },
    onFocus() {
      radioRef.current?.focus();
    }
  };
  const state = reactExports.useMemo(() => ({
    ...fieldState,
    required,
    disabled,
    readOnly,
    checked
  }), [fieldState, disabled, readOnly, checked, required]);
  const contextValue = state;
  const isRadioGroup = groupContext !== void 0;
  const refs = [forwardedRef, radioRef, buttonRef];
  const props = [rootProps, elementProps, getButtonProps, getDescriptionProps, validation ? (validationProps) => validation.getValidationProps(disabled, validationProps) : EMPTY_OBJECT];
  const element = useRenderElement("span", componentProps, {
    enabled: !isRadioGroup,
    state,
    ref: refs,
    props,
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioRootContext.Provider, {
    value: contextValue,
    children: [isRadioGroup ? /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeItem, {
      tag: "span",
      render,
      className,
      style,
      state,
      refs,
      props,
      stateAttributesMapping
    }) : element, /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      ...inputProps,
      suppressHydrationWarning: true
    })]
  });
});
const MODIFIER_KEYS = [SHIFT];
const RadioGroup = /* @__PURE__ */ reactExports.forwardRef(function RadioGroup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp,
    readOnly,
    required,
    onValueChange: onValueChangeProp,
    value: externalValue,
    defaultValue,
    form,
    name: nameProp,
    inputRef: inputRefProp,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  const {
    setTouched: setFieldTouched,
    setFocused,
    validationMode,
    name: fieldName,
    disabled: fieldDisabled,
    state: fieldState,
    validation,
    setDirty,
    setFilled,
    validityData
  } = useFieldRootContext();
  const {
    labelId
  } = useLabelableContext();
  const {
    clearErrors,
    elementRef
  } = useFormContext();
  const fieldsetContext = useFieldsetRootContext(true);
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const id = useBaseUiId(idProp);
  const [checkedValue, setCheckedValueUnwrapped] = useControlled({
    controlled: externalValue,
    default: defaultValue,
    name: "RadioGroup",
    state: "value"
  });
  const [touched, setTouched] = reactExports.useState(false);
  const setCheckedValue = useStableCallback((value, eventDetails) => {
    onValueChangeProp?.(value, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setCheckedValueUnwrapped(value);
  });
  const getInputControl = validation.getInputControl;
  const controlRef = reactExports.useMemo(() => ({
    get current() {
      return getInputControl();
    }
  }), [getInputControl]);
  const groupInputRef = reactExports.useRef(null);
  const firstEnabledInputRef = reactExports.useRef(null);
  function setInputRef(hiddenInput) {
    let cleanup = void 0;
    if (inputRefProp) {
      if (typeof inputRefProp === "function") {
        cleanup = inputRefProp(hiddenInput);
      } else {
        inputRefProp.current = hiddenInput;
      }
    }
    groupInputRef.current = hiddenInput;
    return cleanup;
  }
  const registerInputRef = useStableCallback((input) => {
    if (!input || input.disabled) {
      return void 0;
    }
    if (!firstEnabledInputRef.current) {
      firstEnabledInputRef.current = input;
    }
    const currentInput = groupInputRef.current;
    const cleanup = input.checked || currentInput == null || currentInput.disabled ? setInputRef(input) : void 0;
    return () => {
      if (firstEnabledInputRef.current === input) {
        firstEnabledInputRef.current = null;
      }
      if (groupInputRef.current === input) {
        if (cleanup) {
          cleanup();
          groupInputRef.current = null;
        } else {
          void setInputRef(null);
        }
      } else {
        cleanup?.();
      }
    };
  });
  const getFormValue = useStableCallback(() => {
    const formElement = elementRef.current;
    if (!formElement) {
      return checkedValue ?? null;
    }
    for (const input of validation.registeredInputs.keys()) {
      if (input.checked && isEligibleInput(input, formElement)) {
        return checkedValue ?? null;
      }
    }
    return null;
  });
  useRegisterFieldControl(controlRef, id, checkedValue ?? null, getFormValue, !disabled, nameProp);
  useValueChanged(checkedValue, () => {
    clearErrors(name);
    setDirty(checkedValue !== validityData.initialValue);
    setFilled(checkedValue != null);
    validation.change(checkedValue);
    const fallbackInput = firstEnabledInputRef.current;
    if (checkedValue == null && fallbackInput && !fallbackInput.disabled) {
      void setInputRef(fallbackInput);
    }
  });
  const ariaLabelledby = labelId ?? fieldsetContext?.legendId;
  const state = {
    ...fieldState,
    disabled: disabled ?? false,
    required: required ?? false,
    readOnly: readOnly ?? false
  };
  const contextValue = reactExports.useMemo(() => ({
    checkedValue,
    disabled,
    form,
    validation,
    name,
    readOnly,
    registerInputRef,
    required,
    setCheckedValue,
    setTouched,
    touched
  }), [checkedValue, disabled, form, validation, name, readOnly, registerInputRef, required, setCheckedValue, setTouched, touched]);
  const defaultProps = {
    id: idProp,
    role: "radiogroup",
    "aria-required": required || void 0,
    "aria-disabled": disabled || void 0,
    "aria-readonly": readOnly || void 0,
    "aria-labelledby": ariaLabelledby,
    onFocus() {
      setFocused(true);
    },
    onBlur(event) {
      if (!contains(event.currentTarget, event.relatedTarget)) {
        setFieldTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          validation.commit(checkedValue);
        }
      }
    },
    onKeyDownCapture(event) {
      if (event.key.startsWith("Arrow")) {
        setTouched(true);
        setFocused(true);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeRoot, {
      render,
      className,
      style,
      state,
      props: [defaultProps, elementProps, (props) => validation.getValidationProps(disabled ?? false, props)],
      refs: [forwardedRef],
      stateAttributesMapping: fieldValidityMapping,
      enableHomeAndEndKeys: false,
      modifierKeys: MODIFIER_KEYS
    })
  });
});
export {
  RadioGroup as R,
  RadioRoot as a,
  stateAttributesMapping as s,
  useRadioRootContext as u
};
