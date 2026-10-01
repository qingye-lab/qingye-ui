import { a1 as useBaseUiId, r as reactExports, al as useRefWithInit, X as useStableCallback, j as jsxRuntimeExports, am as getTarget, an as ownerDocument, ao as isHTMLElement, a3 as useIsoLayoutEffect, Y as useRenderElement, ac as useTransitionStatus, ad as useOpenChangeComplete, _ as transitionStatusMapping, e as cn } from "./index-DM02Iz28.js";
import { S as Separator } from "./separator-CcYO5Zxi.js";
import { u as useLabelableContext, L as LabelableContext, a as useFormContext, D as DEFAULT_VALIDITY_STATE, F as FieldRootContext, f as fieldValidityMapping, b as useFieldRootContext } from "./LabelableContext-DO-1KYYg.js";
import { u as useFieldsetRootContext } from "./FieldsetRootContext-Dg8z8pLL.js";
import { g as getCombinedFieldValidityData, u as useFieldValidation } from "./useFieldValidation-CDOPo50V.js";
import { u as useRegisteredLabelId } from "./useRegisteredLabelId-CQd8UikR.js";
import { u as useFieldItemContext } from "./FieldItemContext-DnsCt0VY.js";
const LabelableProvider = function LabelableProvider2(props) {
  const defaultId = useBaseUiId();
  const initialControlId = props.controlId === void 0 ? defaultId : props.controlId;
  const [controlId, setControlIdState] = reactExports.useState(initialControlId);
  const [labelId, setLabelId] = reactExports.useState(props.labelId);
  const [messageIds, setMessageIds] = reactExports.useState([]);
  const registrationsRef = useRefWithInit(() => /* @__PURE__ */ new Map());
  const {
    messageIds: parentMessageIds
  } = useLabelableContext();
  const registerControlId = useStableCallback((source, nextId) => {
    const registrations = registrationsRef.current;
    if (nextId === void 0) {
      registrations.delete(source);
      return;
    }
    registrations.set(source, nextId);
    setControlIdState((prev) => {
      if (registrations.size === 0) {
        return void 0;
      }
      let nextControlId;
      for (const id of registrations.values()) {
        if (prev !== void 0 && id === prev) {
          return prev;
        }
        if (nextControlId === void 0) {
          nextControlId = id;
        }
      }
      return nextControlId;
    });
  });
  const getDescriptionProps = reactExports.useCallback((externalProps) => {
    const ids = externalProps["aria-describedby"] ? externalProps["aria-describedby"].split(" ") : [];
    ids.push(...parentMessageIds, ...messageIds);
    return {
      ...externalProps,
      "aria-describedby": Array.from(new Set(ids)).join(" ") || void 0
    };
  }, [parentMessageIds, messageIds]);
  const contextValue = reactExports.useMemo(() => ({
    controlId,
    registerControlId,
    labelId,
    setLabelId,
    messageIds,
    setMessageIds,
    getDescriptionProps
  }), [controlId, registerControlId, labelId, setLabelId, messageIds, setMessageIds, getDescriptionProps]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LabelableContext.Provider, {
    value: contextValue,
    children: props.children
  });
};
function useLabel(params = {}) {
  const {
    id: idProp,
    fallbackControlId,
    native = false,
    setLabelId: setLabelIdProp,
    focusControl: focusControlProp
  } = params;
  const {
    controlId: contextControlId,
    setLabelId: setContextLabelId
  } = useLabelableContext();
  const syncLabelId = useStableCallback((nextLabelId) => {
    setContextLabelId(nextLabelId);
    setLabelIdProp?.(nextLabelId);
  });
  const id = useRegisteredLabelId(idProp, syncLabelId);
  const resolvedControlId = contextControlId ?? fallbackControlId;
  function focusControl(event) {
    if (focusControlProp) {
      focusControlProp(event, resolvedControlId);
      return;
    }
    if (!resolvedControlId) {
      return;
    }
    const controlElement = ownerDocument(event.currentTarget).getElementById(resolvedControlId);
    if (isHTMLElement(controlElement)) {
      focusElementWithVisible(controlElement);
    }
  }
  function handleInteraction(event) {
    const target = getTarget(event.nativeEvent);
    if (target?.closest("button,input,select,textarea")) {
      return;
    }
    if (!event.defaultPrevented && event.detail > 1) {
      event.preventDefault();
    }
    if (native) {
      return;
    }
    focusControl(event);
  }
  return native ? {
    id,
    htmlFor: resolvedControlId ?? void 0,
    onMouseDown: handleInteraction
  } : {
    id,
    onClick: handleInteraction,
    onPointerDown(event) {
      event.preventDefault();
    }
  };
}
function focusElementWithVisible(element) {
  element.focus({
    // Available from Chrome 144+ (January 2026).
    // Safari and Firefox already support it.
    focusVisible: true
  });
}
function useFieldControlRegistration(params) {
  const {
    commit,
    invalid,
    markedDirtyRef,
    name,
    setRegisteredFieldName,
    registeredFieldIdRef,
    setValidityData,
    validityData
  } = params;
  const {
    formRef
  } = useFormContext();
  const activeFieldControlSourceRef = reactExports.useRef(null);
  const registrationRef = reactExports.useRef(null);
  const initialValueCapturedRef = reactExports.useRef(false);
  const getValueForForm = useStableCallback(() => {
    const registration = registrationRef.current;
    if (!registration) {
      return void 0;
    }
    if (registration.getValue) {
      return registration.getValue();
    }
    return registration.value;
  });
  function getRegistrationValue(registration) {
    return registration.value === void 0 ? getValueForForm() : registration.value;
  }
  const validate = useStableCallback(() => {
    const registration = registrationRef.current;
    markedDirtyRef.current = true;
    if (!registration) {
      commit(validityData.value);
      return;
    }
    commit(getRegistrationValue(registration));
  });
  function refreshRegistration() {
    const registration = registrationRef.current;
    if (!registration || !registration.id) {
      return;
    }
    formRef.current.fields.set(registration.id, {
      getValue: getValueForForm,
      name: name ?? registration.name,
      controlRef: registration.controlRef,
      validityData: getCombinedFieldValidityData(validityData, invalid),
      validate
    });
  }
  function deleteRegistration(id = registrationRef.current?.id) {
    if (id) {
      formRef.current.fields.delete(id);
    }
  }
  function captureInitialValue(registration) {
    if (initialValueCapturedRef.current) {
      return;
    }
    initialValueCapturedRef.current = true;
    const initialValue = getRegistrationValue(registration);
    setValidityData((prev) => prev.initialValue === initialValue ? prev : {
      ...prev,
      initialValue
    });
  }
  useIsoLayoutEffect(() => {
    const registration = registrationRef.current;
    if (!registration || !registration.id) {
      return;
    }
    setRegisteredFieldName(name ? void 0 : registration.name);
    formRef.current.fields.set(registration.id, {
      getValue: getValueForForm,
      name: name ?? registration.name,
      controlRef: registration.controlRef,
      validityData: getCombinedFieldValidityData(validityData, invalid),
      validate
    });
  }, [formRef, getValueForForm, invalid, name, setRegisteredFieldName, validate, validityData]);
  useIsoLayoutEffect(() => {
    const fields = formRef.current.fields;
    return () => {
      const id = registrationRef.current?.id;
      if (id) {
        fields.delete(id);
      }
    };
  }, [formRef]);
  const register = useStableCallback((source, registration) => {
    if (!registration) {
      if (activeFieldControlSourceRef.current === source) {
        activeFieldControlSourceRef.current = null;
        deleteRegistration();
        registrationRef.current = null;
        setRegisteredFieldName(void 0);
        registeredFieldIdRef.current = void 0;
      }
      return;
    }
    const previousId = registrationRef.current?.id;
    activeFieldControlSourceRef.current = source;
    registrationRef.current = registration;
    if (!name) {
      setRegisteredFieldName(registration.name);
    }
    registeredFieldIdRef.current = registration.id;
    if (previousId && previousId !== registration.id) {
      deleteRegistration(previousId);
    }
    captureInitialValue(registration);
    refreshRegistration();
  });
  return [validate, register];
}
const FieldRootInner = /* @__PURE__ */ reactExports.forwardRef(function FieldRootInner2(componentProps, forwardedRef) {
  const {
    errors,
    validationMode: formValidationMode,
    submitAttemptedRef
  } = useFormContext();
  const {
    render,
    className,
    validate: validateProp,
    validationDebounceTime = 0,
    validationMode = formValidationMode,
    name,
    disabled: disabledProp = false,
    invalid: invalidProp,
    dirty: dirtyProp,
    touched: touchedProp,
    actionsRef,
    style,
    ...elementProps
  } = componentProps;
  const disabledFieldset = useFieldsetRootContext(true)?.disabled;
  const validate = useStableCallback(validateProp || (() => null));
  const disabled = disabledFieldset || disabledProp;
  const [touchedState, setTouchedUnwrapped] = reactExports.useState(false);
  const [dirtyState, setDirtyUnwrapped] = reactExports.useState(false);
  const [filled, setFilled] = reactExports.useState(false);
  const [focused, setFocused] = reactExports.useState(false);
  const dirty = dirtyProp ?? dirtyState;
  const touched = touchedProp ?? touchedState;
  const markedDirtyRef = reactExports.useRef(dirty);
  const registeredFieldIdRef = reactExports.useRef(void 0);
  const [registeredFieldName, setRegisteredFieldName] = reactExports.useState();
  const effectiveName = name ?? registeredFieldName;
  useIsoLayoutEffect(() => {
    if (dirtyProp !== void 0) {
      markedDirtyRef.current = dirtyProp;
    }
  }, [dirtyProp]);
  const setDirty = useStableCallback((value) => {
    if (dirtyProp !== void 0) {
      return;
    }
    if (value) {
      markedDirtyRef.current = true;
    }
    setDirtyUnwrapped(value);
  });
  const setTouched = useStableCallback((value) => {
    if (touchedProp !== void 0) {
      return;
    }
    setTouchedUnwrapped(value);
  });
  const shouldValidateOnChange = useStableCallback(() => validationMode === "onChange" || validationMode === "onSubmit" && submitAttemptedRef.current);
  const formError = effectiveName && Object.hasOwn(errors, effectiveName) ? errors[effectiveName] : null;
  const hasFormError = !!(Array.isArray(formError) ? formError.length : formError);
  const invalid = invalidProp === true || hasFormError;
  const [validityData, setValidityData] = reactExports.useState({
    state: DEFAULT_VALIDITY_STATE,
    error: "",
    errors: [],
    value: null,
    initialValue: null
  });
  const valid = !invalid && (disabled ? null : validityData.state.valid);
  const state = reactExports.useMemo(() => ({
    disabled,
    touched,
    dirty,
    valid,
    filled,
    focused
  }), [disabled, touched, dirty, valid, filled, focused]);
  const validation = useFieldValidation({
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid,
    markedDirtyRef,
    state,
    shouldValidateOnChange,
    registeredFieldIdRef
  });
  const [validateFieldControl, registerFieldControl] = useFieldControlRegistration({
    commit: validation.commit,
    invalid,
    markedDirtyRef,
    name,
    setRegisteredFieldName,
    registeredFieldIdRef,
    setValidityData,
    validityData
  });
  reactExports.useImperativeHandle(actionsRef, () => ({
    validate: validateFieldControl
  }), [validateFieldControl]);
  const contextValue = reactExports.useMemo(() => ({
    invalid,
    name: effectiveName,
    validityData,
    setValidityData,
    disabled,
    setTouched,
    setDirty,
    setFilled,
    setFocused,
    validationMode,
    shouldValidateOnChange,
    state,
    registerFieldControl,
    validation
  }), [invalid, effectiveName, validityData, disabled, setTouched, setDirty, setFilled, setFocused, validationMode, shouldValidateOnChange, state, registerFieldControl, validation]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FieldRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
const FieldRoot = /* @__PURE__ */ reactExports.forwardRef(function FieldRoot2(componentProps, forwardedRef) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LabelableProvider, {
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldRootInner, {
      ...componentProps,
      ref: forwardedRef
    })
  });
});
const FieldLabel$1 = /* @__PURE__ */ reactExports.forwardRef(function FieldLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    nativeLabel = true,
    ...elementProps
  } = componentProps;
  const fieldRootContext = useFieldRootContext(false);
  const fieldItemContext = useFieldItemContext();
  const {
    labelId
  } = useLabelableContext();
  const state = {
    ...fieldRootContext.state,
    disabled: fieldRootContext.disabled || fieldItemContext.disabled
  };
  const labelRef = reactExports.useRef(null);
  const labelProps = useLabel({
    id: labelId ?? idProp,
    native: nativeLabel
  });
  const element = useRenderElement("label", componentProps, {
    ref: [forwardedRef, labelRef],
    state,
    props: [labelProps, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
const stateAttributesMapping = {
  ...fieldValidityMapping,
  ...transitionStatusMapping
};
const FieldError$1 = /* @__PURE__ */ reactExports.forwardRef(function FieldError2(componentProps, forwardedRef) {
  const {
    render,
    id: idProp,
    className,
    match,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const {
    validityData,
    state: fieldState,
    name
  } = useFieldRootContext(false);
  const {
    setMessageIds
  } = useLabelableContext();
  const {
    errors
  } = useFormContext();
  const formError = name && Object.hasOwn(errors, name) ? errors[name] : null;
  const hasFormError = !!(Array.isArray(formError) ? formError.length : formError);
  const hasSpecificMatch = typeof match === "string";
  let rendered = false;
  if (match === true) {
    rendered = true;
  } else if (fieldState.disabled) {
    rendered = false;
  } else if (hasSpecificMatch) {
    rendered = Boolean(validityData.state[match]);
  } else {
    rendered = hasFormError || validityData.state.valid === false;
  }
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  useIsoLayoutEffect(() => {
    if (!rendered || !id) {
      return void 0;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [rendered, id, setMessageIds]);
  const errorRef = reactExports.useRef(null);
  const [lastRenderedMessage, setLastRenderedMessage] = reactExports.useState(null);
  const [lastRenderedMessageKey, setLastRenderedMessageKey] = reactExports.useState(null);
  let error = validityData.error;
  if (!hasSpecificMatch && hasFormError) {
    error = formError;
  } else if (validityData.errors.length > 1) {
    error = validityData.errors;
  }
  let errorMessage = error;
  if (Array.isArray(error)) {
    errorMessage = error.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", {
      children: error.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", {
        children: message
      }, message))
    }) : error[0];
  }
  const errorKey = Array.isArray(error) ? JSON.stringify(error) : error;
  if (rendered && errorKey !== lastRenderedMessageKey) {
    setLastRenderedMessageKey(errorKey);
    setLastRenderedMessage(errorMessage);
  }
  useOpenChangeComplete({
    open: rendered,
    ref: errorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  const state = {
    ...fieldState,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, errorRef],
    state,
    props: [{
      id,
      children: rendered ? errorMessage : lastRenderedMessage
    }, elementProps],
    stateAttributesMapping,
    enabled: mounted
  });
  if (!mounted) {
    return null;
  }
  return element;
});
const FieldDescription$1 = /* @__PURE__ */ reactExports.forwardRef(function FieldDescription2(componentProps, forwardedRef) {
  const {
    render,
    id: idProp,
    className,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const fieldRootContext = useFieldRootContext(false);
  const fieldItemContext = useFieldItemContext();
  const {
    setMessageIds
  } = useLabelableContext();
  const state = {
    ...fieldRootContext.state,
    disabled: fieldRootContext.disabled || fieldItemContext.disabled
  };
  useIsoLayoutEffect(() => {
    if (!id) {
      return void 0;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [id, setMessageIds]);
  const element = useRenderElement("p", componentProps, {
    ref: forwardedRef,
    state,
    props: [{
      id
    }, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
const FieldContext = reactExports.createContext(false);
function Field({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FieldContext.Provider, { value: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    FieldRoot,
    {
      className: cn(
        "group/field flex gap-2",
        orientation === "vertical" ? "flex-col items-start" : "flex-row items-center gap-3 has-[>[data-slot=field-content]]:items-start [&>[data-slot=field-content]]:flex-1 has-[>[data-slot=field-content]]:*:data-[slot=checkbox]:mt-px has-[>[data-slot=field-content]]:*:data-[slot=radio]:mt-px",
        className
      ),
      "data-orientation": orientation,
      "data-slot": "field",
      ...props
    }
  ) });
}
function FieldGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex w-full flex-col gap-5", className),
      "data-slot": "field-group",
      ...props
    }
  );
}
function FieldContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex min-w-0 flex-col gap-1", className),
      "data-slot": "field-content",
      ...props
    }
  );
}
function FieldTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex w-fit items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4",
        className
      ),
      "data-slot": "field-title",
      ...props
    }
  );
}
function FieldSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("relative flex h-5 items-center", className),
      "data-slot": "field-separator",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "absolute inset-x-0 top-1/2" }),
        children ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative mx-auto bg-background px-2 text-muted-foreground text-xs", children }) : null
      ]
    }
  );
}
function FieldLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FieldLabel$1,
    {
      className: cn(
        "inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground data-disabled:opacity-64 sm:text-sm/4",
        className
      ),
      "data-slot": "field-label",
      ...props
    }
  );
}
function FieldDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FieldDescription$1,
    {
      className: cn("text-muted-foreground text-xs", className),
      "data-slot": "field-description",
      ...props
    }
  );
}
const fieldErrorClassName = "text-destructive-foreground text-xs transition-[opacity,translate] duration-(--qy-duration-fast) ease-(--qy-ease-out) data-ending-style:duration-(--qy-duration-press) data-starting-style:-translate-y-0.5 data-starting-style:opacity-0 data-ending-style:opacity-0 [&_ul]:ms-4 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-0.5";
function FieldError({
  className,
  children,
  errors,
  match,
  ...props
}) {
  const inField = reactExports.useContext(FieldContext);
  const content = reactExports.useMemo(() => {
    if (children) return children;
    const messages = [
      ...new Set((errors ?? []).map((error) => error?.message).filter(Boolean))
    ];
    if (messages.length > 1) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: message }, message)) });
    }
    return messages[0];
  }, [children, errors]);
  if (!inField) {
    if (!content) return null;
    const { render: _render, style, ...rest } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(fieldErrorClassName, typeof className === "string" ? className : void 0),
        "data-slot": "field-error",
        style: typeof style === "function" ? void 0 : style,
        ...rest,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FieldError$1,
    {
      className: typeof className === "function" ? (state) => cn(fieldErrorClassName, className(state)) : cn(fieldErrorClassName, className),
      "data-slot": "field-error",
      match: match ?? (content ? true : void 0),
      ...props,
      ...content ? { children: content } : null
    }
  );
}
export {
  Field as F,
  FieldLabel as a,
  FieldDescription as b,
  FieldContent as c,
  FieldError as d,
  FieldSeparator as e,
  FieldGroup as f,
  FieldTitle as g
};
