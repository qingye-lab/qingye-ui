import { r as reactExports, V as formatErrorMessage, W as useControlled, au as useValueAsRef, a3 as useIsoLayoutEffect, X as useStableCallback, av as useValueChanged, bz as inputChange, eb as inputPaste, bx as createGenericEventDetails, aN as contains, Y as useRenderElement, j as jsxRuntimeExports, Z as CompositeList, aH as visuallyHiddenInput, aI as visuallyHidden, aJ as createChangeEventDetails, an as ownerDocument, $ as useCompositeListItem, aZ as useDirection, bE as stopEvent, bv as inputClear, bD as keyboard, e as cn, bf as Separator } from "./index-DM02Iz28.js";
import { S as Separator$1 } from "./separator-CcYO5Zxi.js";
import { f as fieldValidityMapping, b as useFieldRootContext, a as useFormContext, u as useLabelableContext } from "./LabelableContext-DO-1KYYg.js";
import { u as useRegisterFieldControl } from "./useRegisterFieldControl-KuH2MueO.js";
import { u as useAriaLabelledBy } from "./useAriaLabelledBy-CcCbgu8M.js";
import { u as useLabelableId } from "./useLabelableId-aT49TJD-.js";
const OTPFieldRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useOTPFieldRootContext() {
  const context = reactExports.useContext(OTPFieldRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(98));
  }
  return context;
}
function getOTPFieldInputState(state, value, index) {
  return {
    ...state,
    value,
    index,
    filled: value !== ""
  };
}
const rootStateAttributesMapping = {
  value: () => null,
  length: () => null,
  ...fieldValidityMapping
};
const inputStateAttributesMapping = {
  value: () => null,
  index: () => null,
  ...fieldValidityMapping
};
const OTP_VALIDATION_CONFIG = {
  numeric: {
    slotPattern: "\\d{1}",
    getRootPattern: (length) => `\\d{${length}}`,
    regexp: /[^\d]/g,
    inputMode: "numeric"
  },
  alpha: {
    slotPattern: "[a-zA-Z]{1}",
    getRootPattern: (length) => `[a-zA-Z]{${length}}`,
    regexp: /[^a-zA-Z]/g,
    inputMode: "text"
  },
  alphanumeric: {
    slotPattern: "[a-zA-Z0-9]{1}",
    getRootPattern: (length) => `[a-zA-Z0-9]{${length}}`,
    regexp: /[^a-zA-Z0-9]/g,
    inputMode: "text"
  }
};
function getOTPValidationConfig(validationType) {
  if (validationType === "none") {
    return null;
  }
  return OTP_VALIDATION_CONFIG[validationType];
}
function stripOTPWhitespace(value) {
  return (value ?? "").replace(/\s/g, "");
}
function applyOTPValidation(value, validation) {
  return validation ? value.replace(validation.regexp, "") : value;
}
function normalizeOTPValueWithDetails(value, length, validationType, normalizeValue) {
  const strippedValue = stripOTPWhitespace(value);
  const validation = getOTPValidationConfig(validationType);
  let normalizedValue = applyOTPValidation(strippedValue, validation);
  let didRejectCharacters = strippedValue.length > normalizedValue.length;
  if (normalizeValue) {
    const customNormalizedValue = normalizeValue(normalizedValue);
    didRejectCharacters ||= normalizedValue.length > customNormalizedValue.length;
    normalizedValue = applyOTPValidation(customNormalizedValue, validation);
    didRejectCharacters ||= customNormalizedValue.length > normalizedValue.length;
  }
  const maxLength = length < 0 ? 0 : length;
  const normalizedCharacters = Array.from(normalizedValue);
  return [normalizedCharacters.slice(0, maxLength).join(""), didRejectCharacters || normalizedCharacters.length > maxLength];
}
function normalizeOTPValue(value, length, validationType, normalizeValue) {
  return normalizeOTPValueWithDetails(value, length, validationType, normalizeValue)[0];
}
function replaceOTPValue(currentValue, index, nextValue, length, validationType, normalizeValue) {
  const normalizedValue = normalizeOTPValue(nextValue, length, validationType, normalizeValue);
  const prefix = currentValue.slice(0, index);
  const suffix = currentValue.slice(index + normalizedValue.length);
  return normalizeOTPValue(`${prefix}${normalizedValue}${suffix}`, length, validationType, normalizeValue);
}
function removeOTPCharacter(currentValue, index) {
  if (index < 0 || index >= currentValue.length) {
    return currentValue;
  }
  return `${currentValue.slice(0, index)}${currentValue.slice(index + 1)}`;
}
const OTPFieldRoot = /* @__PURE__ */ reactExports.forwardRef(function OTPFieldRoot2(componentProps, forwardedRef) {
  const {
    "aria-describedby": ariaDescribedByProp,
    "aria-labelledby": ariaLabelledByProp,
    id: idProp,
    autoComplete = "one-time-code",
    defaultValue,
    value: valueProp,
    onValueChange,
    onValueComplete: onValueCompleteProp,
    form,
    length,
    autoSubmit = false,
    mask = false,
    inputMode: inputModeProp,
    validationType = "numeric",
    normalizeValue,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    name: nameProp,
    onValueInvalid,
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    setDirty,
    validityData,
    disabled: fieldDisabled,
    setFilled,
    invalid,
    name: fieldName,
    state: fieldState,
    validation,
    validationMode,
    setFocused,
    setTouched
  } = useFieldRootContext();
  const {
    clearErrors
  } = useFormContext();
  const {
    getDescriptionProps,
    labelId
  } = useLabelableContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const [valueUnwrapped, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "OTPField",
    state: "value"
  });
  const rootRef = reactExports.useRef(null);
  const inputRefs = reactExports.useRef([]);
  const pendingFocusRef = reactExports.useRef(null);
  const pendingCompleteValueRef = reactExports.useRef(null);
  const firstInputRef = reactExports.useMemo(() => ({
    get current() {
      return inputRefs.current[0] ?? null;
    }
  }), []);
  const id = useLabelableId({
    id: idProp
  });
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, firstInputRef, true, id);
  const inputAriaLabelledBy = ariaLabelledByProp == null ? ariaLabelledBy : void 0;
  const fieldDescriptionProps = getDescriptionProps({});
  const ariaDescribedBy = mergeAriaIds(ariaDescribedByProp, fieldDescriptionProps["aria-describedby"]);
  const validationConfig = getOTPValidationConfig(validationType);
  const pattern = validationConfig?.slotPattern;
  const hiddenInputPattern = validationConfig?.getRootPattern(length);
  const inputMode = inputModeProp ?? validationConfig?.inputMode;
  const hasValidLength = Number.isInteger(length) && length > 0;
  const value = normalizeOTPValue(valueUnwrapped, length, validationType, normalizeValue);
  const valueRef = useValueAsRef(value);
  const filled = value !== "";
  const [inputCount, setInputCount] = reactExports.useState(0);
  const [focusedIndex, setFocusedIndex] = reactExports.useState(() => Math.min(value.length, length - 1));
  const [focused, setFocusedState] = reactExports.useState(false);
  const activeIndex = focused ? Math.min(focusedIndex, Math.max(length - 1, 0)) : Math.min(value.length, length - 1);
  useIsoLayoutEffect(() => {
    setFilled(filled);
  }, [filled, setFilled]);
  useRegisterFieldControl(firstInputRef, id, value, void 0, !disabled, nameProp);
  const focusInput = useStableCallback((index) => {
    const targetIndex = Math.min(Math.max(index, 0), Math.max(inputRefs.current.length - 1, 0));
    const target = inputRefs.current[targetIndex];
    target?.focus();
    target?.select();
  });
  const queueFocusInput = useStableCallback((index, nextValue) => {
    pendingFocusRef.current = {
      index,
      value: nextValue
    };
  });
  function requestSubmit() {
    let formElement = validation.inputRef.current?.form ?? inputRefs.current[0]?.form ?? null;
    if (form) {
      const associatedElement = ownerDocument(rootRef.current).getElementById(form);
      if (associatedElement?.tagName === "FORM") {
        formElement = associatedElement;
      }
    }
    if (formElement && typeof formElement.requestSubmit === "function") {
      formElement.requestSubmit();
    }
  }
  function completeValue(completedValue, eventDetails) {
    onValueCompleteProp?.(completedValue, eventDetails);
    if (autoSubmit) {
      requestSubmit();
    }
  }
  useValueChanged(value, () => {
    clearErrors(name);
    setDirty(value !== validityData.initialValue);
    validation.change(value);
    const pendingFocus = pendingFocusRef.current;
    if (pendingFocus != null) {
      pendingFocusRef.current = null;
      if (pendingFocus.value === value) {
        focusInput(pendingFocus.index);
      }
    }
    const pendingCompleteValue = pendingCompleteValueRef.current;
    if (pendingCompleteValue != null) {
      pendingCompleteValueRef.current = null;
      if (pendingCompleteValue.value === value) {
        completeValue(value, pendingCompleteValue.eventDetails);
      }
    }
  });
  const setValue = useStableCallback((nextValue, details) => {
    const normalizedValue = normalizeOTPValue(nextValue, length, validationType, normalizeValue);
    const canComplete = details.reason === inputChange || details.reason === inputPaste;
    const completeEventDetails = canComplete && normalizedValue.length === length && (valueRef.current.length !== length || details.reason === inputPaste) ? createGenericEventDetails(details.reason, details.event) : null;
    if (normalizedValue === valueRef.current) {
      if (completeEventDetails != null) {
        completeValue(normalizedValue, completeEventDetails);
      }
      return null;
    }
    onValueChange?.(normalizedValue, details);
    if (details.isCanceled) {
      return null;
    }
    setValueUnwrapped(normalizedValue);
    if (completeEventDetails != null) {
      pendingCompleteValueRef.current = {
        value: normalizedValue,
        eventDetails: completeEventDetails
      };
    } else if (normalizedValue.length !== length) {
      pendingCompleteValueRef.current = null;
    }
    return normalizedValue;
  });
  const reportValueInvalid = useStableCallback((invalidValue, details) => {
    onValueInvalid?.(invalidValue, details);
  });
  const handleInputFocus = useStableCallback((index, event) => {
    if (index > valueRef.current.length) {
      focusInput(Math.min(valueRef.current.length, length - 1));
      return;
    }
    setFocusedIndex(index);
    setFocusedState(true);
    setFocused(true);
    event.currentTarget.select();
  });
  const handleInputBlur = useStableCallback((event) => {
    if (contains(rootRef.current, event.relatedTarget)) {
      return;
    }
    setTouched(true);
    setFocusedState(false);
    setFocused(false);
    if (validationMode === "onBlur") {
      validation.commit(valueRef.current);
    }
  });
  const getInputId = reactExports.useCallback((index) => {
    if (id == null) {
      return void 0;
    }
    return index === 0 ? id : `${id}-${index + 1}`;
  }, [id]);
  const state = reactExports.useMemo(() => ({
    ...fieldState,
    complete: value.length === length,
    disabled,
    filled,
    focused,
    length,
    readOnly,
    required,
    value
  }), [disabled, fieldState, filled, focused, length, readOnly, required, value]);
  const contextValue = reactExports.useMemo(() => ({
    autoComplete,
    activeIndex,
    disabled,
    form,
    focusInput,
    queueFocusInput,
    getInputId,
    handleInputBlur,
    handleInputFocus,
    inputMode,
    inputAriaLabelledBy,
    invalid,
    length,
    mask,
    pattern,
    reportValueInvalid,
    readOnly,
    required,
    normalizeValue,
    setValue,
    state,
    validationType,
    value
  }), [activeIndex, autoComplete, disabled, focusInput, form, getInputId, handleInputBlur, handleInputFocus, inputMode, inputAriaLabelledBy, invalid, length, mask, pattern, queueFocusInput, readOnly, reportValueInvalid, required, normalizeValue, setValue, state, validationType, value]);
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, rootRef],
    state,
    props: [{
      role: "group",
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy
    }, elementProps],
    stateAttributesMapping: rootStateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeList, {
    elementsRef: inputRefs,
    onMapChange: (newMap) => {
      setInputCount(newMap.size);
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(OTPFieldRootContext.Provider, {
      value: contextValue,
      children: [element, hasValidLength && /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        ...validation.getValidationProps(disabled, {
          onFocus() {
            focusInput(0);
          },
          onChange(event) {
            if (event.nativeEvent.defaultPrevented || disabled || readOnly) {
              return;
            }
            const rawValue = event.currentTarget.value;
            const [normalizedValue, didRejectCharacters] = normalizeOTPValueWithDetails(rawValue, length, validationType, normalizeValue);
            if (didRejectCharacters) {
              reportValueInvalid(rawValue, createGenericEventDetails(inputChange, event.nativeEvent));
            }
            const committedValue = setValue(normalizedValue, createChangeEventDetails(inputChange, event.nativeEvent));
            if (committedValue != null && committedValue !== "") {
              queueFocusInput(committedValue.length - 1, committedValue);
            }
          }
        }),
        ref: validation.inputRef,
        type: "text",
        id: id && name == null ? `${id}-hidden-input` : void 0,
        form,
        name,
        value,
        autoComplete,
        inputMode,
        minLength: length,
        maxLength: length,
        pattern: hiddenInputPattern,
        disabled,
        readOnly,
        required,
        "aria-hidden": true,
        tabIndex: -1,
        style: name ? visuallyHiddenInput : visuallyHidden
      })]
    })
  });
});
function mergeAriaIds(...values) {
  const ids = values.flatMap((value) => value?.split(/\s+/).filter(Boolean) ?? []);
  return ids.length > 0 ? Array.from(new Set(ids)).join(" ") : void 0;
}
const OTPFieldInput$1 = /* @__PURE__ */ reactExports.forwardRef(function OTPFieldInput2(componentProps, forwardedRef) {
  const {
    "aria-label": externalAriaLabel,
    "aria-labelledby": externalAriaLabelledBy,
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    activeIndex,
    autoComplete,
    disabled,
    form,
    focusInput,
    queueFocusInput,
    getInputId,
    handleInputBlur,
    handleInputFocus,
    inputMode,
    inputAriaLabelledBy,
    invalid,
    length,
    mask,
    pattern,
    reportValueInvalid,
    readOnly,
    required,
    normalizeValue,
    setValue,
    state,
    validationType,
    value
  } = useOTPFieldRootContext();
  const {
    ref: listItemRef,
    index
  } = useCompositeListItem({
    guess: true
  });
  const inputRef = reactExports.useRef(null);
  const direction = useDirection();
  const slotValue = value[index] ?? "";
  const inputState = getOTPFieldInputState(state, slotValue, index);
  const slotAriaLabel = externalAriaLabel;
  const inheritedLabel = externalAriaLabelledBy ?? inputAriaLabelledBy;
  const ariaLabel = index === 0 ? void 0 : slotAriaLabel;
  const inputProps = {
    id: getInputId(index),
    value: slotValue,
    type: mask ? "password" : "text",
    inputMode,
    autoComplete: index === 0 ? autoComplete : "off",
    autoCorrect: "off",
    spellCheck: "false",
    enterKeyHint: index === length - 1 ? "done" : "next",
    // Only the first slot has a max length to avoid password manager bubbles appearing after later inputs.
    maxLength: index === 0 ? length : void 0,
    tabIndex: activeIndex === index ? 0 : -1,
    disabled,
    form,
    pattern,
    readOnly,
    required,
    "aria-labelledby": ariaLabel == null ? inheritedLabel : void 0,
    "aria-invalid": !disabled && invalid ? true : void 0,
    "aria-label": ariaLabel,
    onMouseDown(event) {
      if (event.defaultPrevented || disabled) {
        return;
      }
      event.preventDefault();
      focusInput(index);
    },
    onFocus(event) {
      if (event.defaultPrevented || disabled) {
        return;
      }
      handleInputFocus(index, event);
    },
    onBlur(event) {
      if (event.defaultPrevented) {
        return;
      }
      handleInputBlur(event);
    },
    onChange(event) {
      if (event.defaultPrevented || disabled || readOnly) {
        return;
      }
      const rawValue = event.currentTarget.value;
      const [nextDigits, didRejectCharacters] = normalizeOTPValueWithDetails(rawValue, length, validationType, normalizeValue);
      if (didRejectCharacters) {
        reportValueInvalid(rawValue, createGenericEventDetails(inputChange, event.nativeEvent));
      }
      if (nextDigits === "") {
        if (rawValue === "") {
          setValue(removeOTPCharacter(value, index), createChangeEventDetails(inputClear, event.nativeEvent));
        } else if (slotValue !== "") {
          event.currentTarget.value = slotValue;
          event.currentTarget.select();
        }
        return;
      }
      const nextValue = replaceOTPValue(value, index, nextDigits, length, validationType, normalizeValue);
      const committedValue = setValue(nextValue, createChangeEventDetails(inputChange, event.nativeEvent));
      if (committedValue != null) {
        const nextInput = Math.min(index + nextDigits.length, length - 1);
        queueFocusInput(nextInput, committedValue);
      }
    },
    onKeyDown(event) {
      if (event.defaultPrevented || disabled) {
        return;
      }
      const firstIndex = 0;
      const lastIndex = Math.max(length - 1, firstIndex);
      const endTargetIndex = Math.min(value.length, lastIndex);
      const hasBoundaryModifier = (event.ctrlKey || event.metaKey) && !event.altKey;
      const isRtl = direction === "rtl";
      const previousKey = isRtl ? "ArrowRight" : "ArrowLeft";
      const nextKey = isRtl ? "ArrowLeft" : "ArrowRight";
      if (event.key === previousKey) {
        stopEvent(event);
        focusInput(hasBoundaryModifier ? firstIndex : Math.max(firstIndex, index - 1));
        return;
      }
      if (event.key === nextKey) {
        stopEvent(event);
        focusInput(hasBoundaryModifier ? endTargetIndex : Math.min(lastIndex, index + 1));
        return;
      }
      if (event.key === "Home" || event.key === "ArrowUp") {
        stopEvent(event);
        focusInput(firstIndex);
        return;
      }
      if (event.key === "End" || event.key === "ArrowDown") {
        stopEvent(event);
        focusInput(endTargetIndex);
        return;
      }
      if (readOnly) {
        return;
      }
      function setKeyboardValue(nextValue, targetIndex) {
        const committedValue = setValue(nextValue, createChangeEventDetails(keyboard, event.nativeEvent));
        if (committedValue != null) {
          queueFocusInput(targetIndex, committedValue);
        }
      }
      if (event.key === "Backspace" && hasBoundaryModifier) {
        stopEvent(event);
        setKeyboardValue("", firstIndex);
        return;
      }
      if (event.key === "Delete") {
        stopEvent(event);
        setKeyboardValue(removeOTPCharacter(value, index), index);
        return;
      }
      const inputValue = event.currentTarget.value;
      const fullSelection = event.currentTarget.selectionStart === 0 && event.currentTarget.selectionEnd === inputValue.length;
      if (event.key.length === 1 && fullSelection && slotValue === event.key) {
        stopEvent(event);
        if (index < length - 1) {
          focusInput(index + 1);
        }
        return;
      }
      if (event.key === "Backspace") {
        stopEvent(event);
        const targetIndex = Math.max(firstIndex, index - 1);
        const deleteIndex = slotValue === "" ? targetIndex : index;
        setKeyboardValue(removeOTPCharacter(value, deleteIndex), targetIndex);
      }
    },
    onPaste(event) {
      if (event.defaultPrevented || disabled || readOnly) {
        return;
      }
      let rawValue = "";
      try {
        rawValue = event.clipboardData?.getData("text/plain") ?? "";
      } catch {
        return;
      }
      event.preventDefault();
      const [nextDigits, didRejectCharacters] = normalizeOTPValueWithDetails(rawValue, length, validationType, normalizeValue);
      if (didRejectCharacters) {
        reportValueInvalid(rawValue, createGenericEventDetails(inputPaste, event.nativeEvent));
      }
      if (nextDigits === "") {
        return;
      }
      const committedValue = setValue(replaceOTPValue(value, index, nextDigits, length, validationType, normalizeValue), createChangeEventDetails(inputPaste, event.nativeEvent));
      if (committedValue != null) {
        const nextInput = Math.min(index + nextDigits.length, length - 1);
        queueFocusInput(nextInput, committedValue);
      }
    }
  };
  const element = useRenderElement("input", componentProps, {
    ref: [forwardedRef, listItemRef, inputRef],
    state: inputState,
    props: [inputProps, elementProps],
    stateAttributesMapping: inputStateAttributesMapping
  });
  return element;
});
function OTPField({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    OTPFieldRoot,
    {
      className: cn(
        "flex items-center gap-2 has-disabled:opacity-64 has-disabled:**:data-[slot=otp-field-input]:shadow-none has-disabled:**:data-[slot=otp-field-input]:before:shadow-none!",
        className
      ),
      "data-size": size,
      "data-slot": "otp-field",
      ...props
    }
  );
}
function OTPFieldInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    OTPFieldInput$1,
    {
      className: cn(
        "relative in-[[data-slot=otp-field][data-size=lg]]:size-10 size-9 min-w-0 rounded-lg border border-input bg-background not-dark:bg-clip-padding text-center in-[[data-slot=otp-field][data-size=lg]]:text-lg text-base text-foreground in-[[data-slot=otp-field][data-size=lg]]:leading-10 leading-9 shadow-xs/5 outline-none placeholder:text-muted-foreground/72 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-focus-visible:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:z-10 focus-visible:border-ring focus-visible:shadow-none focus-visible:ring-[3px] focus-visible:ring-ring/24 aria-invalid:border-destructive/36 aria-invalid:shadow-none aria-invalid:focus-visible:border-destructive/64 aria-invalid:focus-visible:ring-destructive/16 sm:in-[[data-slot=otp-field][data-size=lg]]:size-9 sm:size-8 sm:in-[[data-slot=otp-field][data-size=lg]]:text-base sm:text-sm sm:in-[[data-slot=otp-field][data-size=lg]]:leading-9 sm:leading-8 dark:bg-input/32 dark:aria-invalid:focus-visible:ring-destructive/24 dark:not-focus-visible:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className
      ),
      "data-slot": "otp-field-input",
      spellCheck: false,
      ...props
    }
  );
}
function OTPFieldSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator,
    {
      render: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Separator$1,
        {
          className: cn(
            "rounded-full bg-input data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-3",
            className
          ),
          orientation: "horizontal",
          ...props
        }
      )
    }
  );
}
export {
  OTPField as O,
  OTPFieldInput as a,
  OTPFieldSeparator as b
};
