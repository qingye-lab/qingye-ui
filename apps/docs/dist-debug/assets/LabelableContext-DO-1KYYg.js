import { ab as NOOP, aG as EMPTY_OBJECT, r as reactExports, V as formatErrorMessage } from "./index-DM02Iz28.js";
const DEFAULT_VALIDITY_STATE = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
};
const DEFAULT_FIELD_STATE_ATTRIBUTES = {
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false
};
const DEFAULT_FIELD_ROOT_STATE = {
  disabled: false,
  ...DEFAULT_FIELD_STATE_ATTRIBUTES
};
const fieldValidityMapping = {
  valid(value) {
    if (value === null) {
      return null;
    }
    if (value) {
      return {
        "data-valid": ""
      };
    }
    return {
      "data-invalid": ""
    };
  }
};
const DEFAULT_FIELD_ROOT_CONTEXT = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: DEFAULT_VALIDITY_STATE,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: NOOP,
  disabled: void 0,
  setTouched: NOOP,
  setDirty: NOOP,
  setFilled: NOOP,
  setFocused: NOOP,
  validationMode: "onSubmit",
  shouldValidateOnChange: () => false,
  state: DEFAULT_FIELD_ROOT_STATE,
  registerFieldControl: NOOP,
  validation: {
    getValidationProps: (_disabled, props = EMPTY_OBJECT) => props,
    inputRef: {
      current: null
    },
    registeredInputs: /* @__PURE__ */ new Map(),
    registerInput: NOOP,
    getInputControl: () => null,
    commit: async () => {
    },
    change: NOOP
  }
};
const FieldRootContext = /* @__PURE__ */ reactExports.createContext(DEFAULT_FIELD_ROOT_CONTEXT);
function useFieldRootContext(optional = true) {
  const context = reactExports.useContext(FieldRootContext);
  if (context.setValidityData === NOOP && !optional) {
    throw new Error(formatErrorMessage(28));
  }
  return context;
}
const FormContext = /* @__PURE__ */ reactExports.createContext({
  elementRef: {
    current: null
  },
  formRef: {
    current: {
      fields: /* @__PURE__ */ new Map()
    }
  },
  errors: {},
  clearErrors: NOOP,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: false
  }
});
function useFormContext() {
  return reactExports.useContext(FormContext);
}
const LabelableContext = /* @__PURE__ */ reactExports.createContext({
  controlId: void 0,
  registerControlId: NOOP,
  labelId: void 0,
  setLabelId: NOOP,
  messageIds: [],
  setMessageIds: NOOP,
  getDescriptionProps: (externalProps) => externalProps
});
function useLabelableContext() {
  return reactExports.useContext(LabelableContext);
}
export {
  DEFAULT_VALIDITY_STATE as D,
  FieldRootContext as F,
  LabelableContext as L,
  useFormContext as a,
  useFieldRootContext as b,
  DEFAULT_FIELD_STATE_ATTRIBUTES as c,
  DEFAULT_FIELD_ROOT_CONTEXT as d,
  FormContext as e,
  fieldValidityMapping as f,
  useLabelableContext as u
};
