import { ae as useTimeout, r as reactExports, al as useRefWithInit, X as useStableCallback, a9 as mergeProps, aG as EMPTY_OBJECT } from "./index-DM02Iz28.js";
import { a as useFormContext, u as useLabelableContext, D as DEFAULT_VALIDITY_STATE } from "./LabelableContext-DO-1KYYg.js";
function getCombinedFieldValidityData(validityData, invalid) {
  return {
    ...validityData,
    state: {
      ...validityData.state,
      valid: !invalid && validityData.state.valid
    }
  };
}
const validityKeys = Object.keys(DEFAULT_VALIDITY_STATE);
function isEligibleInput(input, formElement) {
  if (input.matches(":disabled")) {
    return false;
  }
  if (!formElement || input.form === formElement) {
    return true;
  }
  return input.form === null && !input.hasAttribute("form");
}
function findRepresentativeInput(inputs, formElement) {
  let fallback = null;
  for (const input of inputs.keys()) {
    if (!isEligibleInput(input, formElement)) {
      continue;
    }
    if (!input.validity.valid) {
      return input;
    }
    fallback ??= input;
  }
  return fallback;
}
function clearCustomValidity(element, inputs) {
  for (const input of inputs.keys()) {
    input.setCustomValidity("");
  }
  element?.setCustomValidity("");
}
function useFieldValidation(params) {
  const {
    elementRef,
    formRef
  } = useFormContext();
  const {
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid,
    markedDirtyRef,
    state,
    shouldValidateOnChange,
    registeredFieldIdRef
  } = params;
  const {
    controlId,
    getDescriptionProps
  } = useLabelableContext();
  const timeout = useTimeout();
  const inputRef = reactExports.useRef(null);
  const registeredInputs = useRefWithInit(() => /* @__PURE__ */ new Map()).current;
  const validationCommitIdRef = reactExports.useRef(0);
  const registerInput = reactExports.useCallback((element, registration) => {
    registeredInputs.set(element, registration);
    return () => {
      registeredInputs.delete(element);
    };
  }, [registeredInputs]);
  const getInputControl = useStableCallback(() => {
    const element = findRepresentativeInput(registeredInputs, elementRef.current);
    return element && registeredInputs.get(element)?.controlRef.current || null;
  });
  const commit = useStableCallback(async (value, revalidate = false) => {
    validationCommitIdRef.current += 1;
    const validationCommitId = validationCommitIdRef.current;
    function updateRegisteredFieldValidity(nextValidityData2, externalInvalid = invalid) {
      const fieldId = registeredFieldIdRef.current ?? controlId;
      if (fieldId == null) {
        return;
      }
      const currentFieldData = formRef.current.fields.get(fieldId);
      if (!currentFieldData) {
        return;
      }
      const validityDataWithFormErrors = getCombinedFieldValidityData(nextValidityData2, externalInvalid);
      formRef.current.fields.set(fieldId, {
        ...currentFieldData,
        validityData: validityDataWithFormErrors
      });
    }
    function publishAllValid(input, externalInvalid) {
      const nextValidityData2 = {
        value,
        state: {
          ...DEFAULT_VALIDITY_STATE,
          valid: true
        },
        error: "",
        errors: [],
        initialValue: validityData.initialValue
      };
      clearCustomValidity(input, registeredInputs);
      updateRegisteredFieldValidity(nextValidityData2, externalInvalid);
      setValidityData(nextValidityData2);
    }
    const element = registeredInputs.size > 0 ? findRepresentativeInput(registeredInputs, elementRef.current) : inputRef.current;
    if (revalidate) {
      if (state.valid !== false || !element) {
        return;
      }
      const currentNativeValidity = element.validity;
      if (!currentNativeValidity.valueMissing) {
        publishAllValid(element, false);
        return;
      }
      for (const key of validityKeys) {
        if (key !== "valid" && key !== "valueMissing" && key !== "customError" && currentNativeValidity[key]) {
          return;
        }
      }
    }
    function getState(el) {
      const computedState = validityKeys.reduce((acc, key) => {
        acc[key] = el.validity[key];
        return acc;
      }, {});
      let hasOnlyValueMissingError = false;
      for (const key of validityKeys) {
        if (key === "valid") {
          continue;
        }
        if (key === "valueMissing" && computedState[key]) {
          hasOnlyValueMissingError = true;
        } else if (computedState[key]) {
          return computedState;
        }
      }
      if (hasOnlyValueMissingError && !markedDirtyRef.current) {
        computedState.valid = true;
        computedState.valueMissing = false;
      }
      return computedState;
    }
    timeout.clear();
    let result = null;
    let validationErrors = [];
    const nextState = element ? getState(element) : {
      ...DEFAULT_VALIDITY_STATE,
      valid: true
    };
    let defaultValidationMessage;
    const isValidatingOnChange = shouldValidateOnChange();
    if (element && element.validationMessage && !isValidatingOnChange) {
      defaultValidationMessage = element.validationMessage;
      validationErrors = [element.validationMessage];
    } else {
      const formValues = Array.from(formRef.current.fields.values()).reduce((acc, field) => {
        if (field.name) {
          acc[field.name] = field.getValue();
        }
        return acc;
      }, {});
      const resultOrPromise = validate(value, formValues);
      if (typeof resultOrPromise === "object" && resultOrPromise !== null && "then" in resultOrPromise) {
        result = await resultOrPromise;
        if (validationCommitId !== validationCommitIdRef.current) {
          return;
        }
      } else {
        result = resultOrPromise;
      }
      if (result !== null) {
        nextState.valid = false;
        nextState.customError = true;
        if (Array.isArray(result)) {
          validationErrors = result;
          element?.setCustomValidity(result.join("\n"));
        } else if (result) {
          validationErrors = [result];
          element?.setCustomValidity(result);
        }
      } else if (isValidatingOnChange) {
        clearCustomValidity(element, registeredInputs);
        nextState.customError = false;
        if (element && element.validationMessage) {
          defaultValidationMessage = element.validationMessage;
          validationErrors = [element.validationMessage];
        } else if ((!element || element.validity.valid) && !nextState.valid) {
          nextState.valid = true;
        }
      }
    }
    const nextValidityData = {
      value,
      state: nextState,
      error: defaultValidationMessage ?? (Array.isArray(result) ? result[0] : result ?? ""),
      errors: validationErrors,
      initialValue: validityData.initialValue
    };
    updateRegisteredFieldValidity(nextValidityData);
    setValidityData(nextValidityData);
  });
  const change = useStableCallback((value) => {
    timeout.clear();
    const validateOnChange = shouldValidateOnChange();
    if (validateOnChange && value !== "" && validationDebounceTime) {
      validationCommitIdRef.current += 1;
      timeout.start(validationDebounceTime, () => {
        commit(value);
      });
    } else {
      commit(value, !validateOnChange);
    }
  });
  const getValidationProps = reactExports.useCallback((disabled, externalProps = {}) => mergeProps(getDescriptionProps(externalProps), state.valid === false && !state.disabled && !disabled ? {
    "aria-invalid": true
  } : EMPTY_OBJECT), [getDescriptionProps, state.disabled, state.valid]);
  return reactExports.useMemo(() => ({
    getValidationProps,
    inputRef,
    registeredInputs,
    registerInput,
    getInputControl,
    commit,
    change
  }), [getValidationProps, registeredInputs, registerInput, getInputControl, commit, change]);
}
export {
  getCombinedFieldValidityData as g,
  isEligibleInput as i,
  useFieldValidation as u
};
