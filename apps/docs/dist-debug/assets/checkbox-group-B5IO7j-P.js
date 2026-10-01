import { r as reactExports, a1 as useBaseUiId, ap as EMPTY_ARRAY, X as useStableCallback, W as useControlled, av as useValueChanged, Y as useRenderElement, j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
import { b as CheckboxGroupContext } from "./CheckboxIndicator-CqP__vRN.js";
import { i as isEligibleInput } from "./useFieldValidation-CDOPo50V.js";
import { b as useFieldRootContext, u as useLabelableContext, a as useFormContext, f as fieldValidityMapping } from "./LabelableContext-DO-1KYYg.js";
import { u as useRegisterFieldControl } from "./useRegisterFieldControl-KuH2MueO.js";
import { a as areArraysEqual } from "./areArraysEqual-Bigu0Aq6.js";
function useCheckboxGroupParent(params) {
  const {
    allValues = EMPTY_ARRAY,
    value,
    onValueChange: onValueChangeProp
  } = params;
  const uncontrolledStateRef = reactExports.useRef(value);
  const disabledStatesRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const [status, setStatus] = reactExports.useState("mixed");
  const id = useBaseUiId();
  const checked = value.length === allValues.length;
  const indeterminate = value.length !== allValues.length && value.length > 0;
  const onValueChange = useStableCallback(onValueChangeProp);
  const getParentProps = reactExports.useCallback(() => ({
    id,
    indeterminate,
    checked,
    // TODO: custom `id` on child checkboxes breaks this
    // https://github.com/mui/base-ui/issues/2691
    "aria-controls": allValues.map((v) => `${id}-${v}`).join(" "),
    onCheckedChange(_, eventDetails) {
      const uncontrolledState = uncontrolledStateRef.current;
      const none = allValues.filter((v) => disabledStatesRef.current.get(v) && uncontrolledState.includes(v));
      const all = allValues.filter((v) => !disabledStatesRef.current.get(v) || uncontrolledState.includes(v));
      const allOnOrOff = uncontrolledState.length === all.length || uncontrolledState.length === 0;
      if (allOnOrOff) {
        if (value.length === all.length) {
          onValueChange(none, eventDetails);
        } else {
          onValueChange(all, eventDetails);
        }
        return;
      }
      let nextStatus = "mixed";
      let nextValue = uncontrolledState;
      if (status === "mixed") {
        nextStatus = "on";
        nextValue = all;
      } else if (status === "on") {
        nextStatus = "off";
        nextValue = none;
      }
      onValueChange(nextValue, eventDetails);
      if (!eventDetails.isCanceled) {
        setStatus(nextStatus);
      }
    }
  }), [allValues, checked, id, indeterminate, onValueChange, status, value.length]);
  const getChildProps = reactExports.useCallback((childValue) => ({
    checked: value.includes(childValue),
    onCheckedChange(nextChecked, eventDetails) {
      const newValue = value.slice();
      if (nextChecked) {
        newValue.push(childValue);
      } else {
        newValue.splice(newValue.indexOf(childValue), 1);
      }
      onValueChange(newValue, eventDetails);
      if (!eventDetails.isCanceled) {
        uncontrolledStateRef.current = newValue;
        setStatus("mixed");
      }
    }
  }), [onValueChange, value]);
  return reactExports.useMemo(() => ({
    id,
    getParentProps,
    getChildProps,
    disabledStatesRef
  }), [id, getParentProps, getChildProps]);
}
const CheckboxGroup$1 = /* @__PURE__ */ reactExports.forwardRef(function CheckboxGroup2(componentProps, forwardedRef) {
  const {
    allValues,
    className,
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    id: idProp,
    onValueChange,
    render,
    value: externalValue,
    style,
    ...elementProps
  } = componentProps;
  const {
    disabled: fieldDisabled,
    name: fieldName,
    state: fieldState,
    validation,
    setFilled,
    setDirty,
    validityData
  } = useFieldRootContext();
  const {
    labelId,
    getDescriptionProps
  } = useLabelableContext();
  const {
    clearErrors,
    elementRef
  } = useFormContext();
  const disabled = fieldDisabled || disabledProp;
  const defaultValue = defaultValueProp ?? EMPTY_ARRAY;
  const [value = EMPTY_ARRAY, setValueUnwrapped] = useControlled({
    controlled: externalValue,
    default: defaultValue,
    name: "CheckboxGroup",
    state: "value"
  });
  const setValue = useStableCallback((v, eventDetails) => {
    onValueChange?.(v, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(v);
  });
  const parent = useCheckboxGroupParent({
    allValues,
    value,
    onValueChange: setValue
  });
  const id = useBaseUiId(idProp);
  const getInputControl = validation.getInputControl;
  const controlRef = reactExports.useMemo(() => ({
    get current() {
      return getInputControl();
    }
  }), [getInputControl]);
  const getFormValue = useStableCallback(() => {
    const formElement = elementRef.current;
    if (!formElement) {
      return value;
    }
    const successfulValues = /* @__PURE__ */ new Set();
    for (const [input, registration] of validation.registeredInputs) {
      if (registration.value !== void 0 && input.checked && isEligibleInput(input, formElement)) {
        successfulValues.add(registration.value);
      }
    }
    return value.filter((inputValue) => successfulValues.has(inputValue));
  });
  useRegisterFieldControl(controlRef, id, value, getFormValue, !!fieldName && !disabled, fieldName);
  useValueChanged(value, () => {
    if (fieldName) {
      clearErrors(fieldName);
    }
    const initialValue = Array.isArray(validityData.initialValue) ? validityData.initialValue : EMPTY_ARRAY;
    setFilled(value.length > 0);
    setDirty(!areArraysEqual(value, initialValue));
    validation.change(value);
  });
  const state = {
    ...fieldState,
    disabled
  };
  const contextValue = reactExports.useMemo(() => ({
    allValues,
    value,
    setValue,
    parent,
    disabled,
    validation
  }), [allValues, value, setValue, parent, disabled, validation]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      id: idProp,
      role: "group",
      "aria-labelledby": labelId
    }, elementProps, getDescriptionProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupContext.Provider, {
    value: contextValue,
    children: element
  });
});
function CheckboxGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxGroup$1,
    {
      className: cn("flex flex-col items-start gap-3", className),
      "data-slot": "checkbox-group",
      ...props
    }
  );
}
export {
  CheckboxGroup as C
};
