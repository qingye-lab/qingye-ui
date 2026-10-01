import { r as reactExports, X as useStableCallback, av as useValueChanged, Y as useRenderElement, aG as EMPTY_OBJECT, j as jsxRuntimeExports, bx as createGenericEventDetails, aK as none } from "./index-DM02Iz28.js";
import { e as FormContext } from "./LabelableContext-DO-1KYYg.js";
const Form$1 = /* @__PURE__ */ reactExports.forwardRef(function Form2(componentProps, forwardedRef) {
  const {
    render,
    className,
    validationMode = "onSubmit",
    errors: externalErrors,
    onSubmit,
    onFormSubmit,
    actionsRef,
    style,
    ...elementProps
  } = componentProps;
  const formRef = reactExports.useRef({
    fields: /* @__PURE__ */ new Map()
  });
  const elementRef = reactExports.useRef(null);
  const submittedRef = reactExports.useRef(false);
  const submitAttemptedRef = reactExports.useRef(false);
  const focusFirstInvalid = useStableCallback(() => {
    let hasInvalid = false;
    let firstControl = null;
    for (const field of formRef.current.fields.values()) {
      if (field.validityData.state.valid !== false) {
        continue;
      }
      hasInvalid = true;
      const control = field.controlRef.current;
      if (control && (!firstControl || comesBeforeInSameTree(control, firstControl))) {
        firstControl = control;
      }
    }
    if (firstControl) {
      firstControl.focus();
      if (firstControl.tagName === "INPUT") {
        firstControl.select();
      }
      return true;
    }
    return hasInvalid;
  });
  const [errors, setErrors] = reactExports.useState(externalErrors);
  useValueChanged(externalErrors, () => {
    setErrors(externalErrors);
  });
  reactExports.useEffect(() => {
    if (!submittedRef.current) {
      return;
    }
    submittedRef.current = false;
    focusFirstInvalid();
  }, [errors, focusFirstInvalid]);
  reactExports.useImperativeHandle(actionsRef, () => ({
    validate(fieldName) {
      if (fieldName) {
        Array.from(formRef.current.fields.values()).find((field) => field.name === fieldName)?.validate();
      } else {
        formRef.current.fields.forEach((field) => {
          field.validate();
        });
      }
    }
  }), []);
  const element = useRenderElement("form", componentProps, {
    ref: [forwardedRef, elementRef],
    props: [{
      noValidate: true,
      onSubmit(event) {
        submitAttemptedRef.current = true;
        formRef.current.fields.forEach((field) => {
          field.validate();
        });
        if (focusFirstInvalid()) {
          event.preventDefault();
          return;
        }
        submittedRef.current = true;
        onSubmit?.(event);
        if (onFormSubmit) {
          event.preventDefault();
          const formValues = {};
          formRef.current.fields.forEach((field) => {
            if (field.name) {
              formValues[field.name] = field.getValue();
            }
          });
          onFormSubmit(formValues, createGenericEventDetails(none, event.nativeEvent));
        }
      }
    }, elementProps]
  });
  const clearErrors = useStableCallback((name) => {
    if (name && errors && Object.hasOwn(errors, name)) {
      const nextErrors = {
        ...errors
      };
      delete nextErrors[name];
      setErrors(nextErrors);
    }
  });
  const contextValue = reactExports.useMemo(() => ({
    elementRef,
    formRef,
    validationMode,
    errors: errors ?? EMPTY_OBJECT,
    clearErrors,
    submitAttemptedRef
  }), [formRef, validationMode, errors, clearErrors]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormContext.Provider, {
    value: contextValue,
    children: element
  });
});
function comesBeforeInSameTree(element, reference) {
  const position = element.compareDocumentPosition(reference);
  return (position & Node.DOCUMENT_POSITION_DISCONNECTED) === 0 && (position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
}
function Form({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form$1, { className, "data-slot": "form", ...props });
}
export {
  Form as F
};
