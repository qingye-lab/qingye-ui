import { c as createLucideIcon, r as reactExports, V as formatErrorMessage, b2 as clamp, a0 as useMergedRefs, W as useControlled, au as useValueAsRef, a3 as useIsoLayoutEffect, X as useStableCallback, aK as none, aJ as createChangeEventDetails, bM as ios, b4 as addEventListener, Y as useRenderElement, j as jsxRuntimeExports, aH as visuallyHiddenInput, aI as visuallyHidden, bm as activeElement, an as ownerDocument, e7 as wheel, bx as createGenericEventDetails, al as useRefWithInit, e8 as useOnMount, cP as Timeout, ae as useTimeout, ab as NOOP, b0 as getWindow, a2 as useButton, e9 as incrementPress, ea as decrementPress, av as useValueChanged, eb as inputPaste, bD as keyboard, bv as inputClear, bz as inputChange, ec as inputBlur, bN as reactDomExports, dY as mergeCleanups, ed as scrub, bH as gecko, am as getTarget, b3 as webkit, q as useUILocale, e as cn } from "./index-DM02Iz28.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { M as Minus } from "./minus-CRNaljKP.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
import { u as useForcedRerendering } from "./useForcedRerendering-B3yRwVad.js";
import { f as fieldValidityMapping, b as useFieldRootContext, a as useFormContext, u as useLabelableContext } from "./LabelableContext-DO-1KYYg.js";
import { u as useLabelableId } from "./useLabelableId-aT49TJD-.js";
import { g as getFormatter, f as formatNumber } from "./formatNumber-_NNc_BMA.js";
import { u as useRegisterFieldControl } from "./useRegisterFieldControl-KuH2MueO.js";
const __iconNode = [
  ["path", { d: "m18 8 4 4-4 4", key: "1ak13k" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }]
];
const MoveHorizontal = createLucideIcon("move-horizontal", __iconNode);
const NumberFieldRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useNumberFieldRootContext() {
  const context = reactExports.useContext(NumberFieldRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(43));
  }
  return context;
}
const stateAttributesMapping = {
  inputValue: () => null,
  value: () => null,
  ...fieldValidityMapping
};
const HAN_NUMERALS = "零〇一二三四五六七八九";
const NON_ASCII_DIGIT_RE = /[٠-٩۰-۹０-９]/g;
const HAN_RE = /[零〇一二三四五六七八九]/g;
const PERCENTAGES = ["%", "٪", "％", "﹪"];
const PERMILLE = ["‰", "؉"];
const FULLWIDTH_DECIMAL = "．";
const FULLWIDTH_GROUP = "，";
const PERCENT_RE = /[%٪％﹪]/;
const PERMILLE_RE = /[‰؉]/;
const PERCENT_GLOBAL_RE = /[%٪％﹪]/g;
const PERMILLE_GLOBAL_RE = /[‰؉]/g;
const ARABIC_PERSIAN_DETECT_RE = /[٠-٩۰-۹]/;
const HAN_DETECT_RE = /[零〇一二三四五六七八九]/;
const ANY_NUMERAL_DETECT_RE = /[0-9٠-٩۰-۹０-９零〇一二三四五六七八九]/;
function isNumeralChar(char) {
  return ANY_NUMERAL_DETECT_RE.test(char);
}
const BASE_NON_NUMERIC_SYMBOLS = [".", ",", FULLWIDTH_DECIMAL, FULLWIDTH_GROUP, "٫", "٬"];
const SPACE_SEPARATOR_RE = new RegExp("\\p{Zs}", "u");
const FORMAT_CONTROL_DETECT_RE = new RegExp("\\p{Cf}", "u");
const FORMAT_CONTROL_GLOBAL_RE = new RegExp("\\p{Cf}", "gu");
const PLUS_SIGNS_WITH_ASCII = ["+", "＋", "﹢"];
const MINUS_SIGNS_WITH_ASCII = ["-", "−", "－", "‒", "–", "—", "﹣"];
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function shiftDecimal(value, exponentDelta) {
  const [coefficient, exponent = "0"] = String(value).split("e");
  return Number(`${coefficient}e${Number(exponent) + exponentDelta}`);
}
const ANY_MINUS_RE = /[-−－‒–—﹣]/gu;
const ANY_PLUS_RE = /[+＋﹢]/gu;
const ANY_MINUS_DETECT_RE = /[-−－‒–—﹣]/;
const ANY_PLUS_DETECT_RE = /[+＋﹢]/;
const SAMPLE_FORMAT_NUMBER = 11111.1;
function getFormatParts(locale, options) {
  return getFormatter(locale, options).formatToParts(SAMPLE_FORMAT_NUMBER);
}
function getNumberLocaleDetails(locale, options) {
  const parts = getFormatParts(locale, options);
  const result = {};
  parts.forEach((part) => {
    result[part.type] = part.value;
  });
  let decimal = ".";
  getFormatter(locale).formatToParts(0.1).forEach((part) => {
    if (part.type === "decimal") {
      decimal = part.value;
    }
  });
  return {
    ...result,
    decimal
  };
}
function parseNumber(formattedNumber, locale, options) {
  let input = formattedNumber.replace(FORMAT_CONTROL_GLOBAL_RE, "").trim();
  input = input.replace(ANY_MINUS_RE, "-").replace(ANY_PLUS_RE, "+");
  let isNegative = false;
  const takeSign = (match, sign) => {
    if (sign === "-") {
      isNegative = true;
    }
    return "";
  };
  input = input.replace(/([+-])\s*$/, takeSign).replace(/^\s*([+-])/, takeSign);
  let computedLocale = locale;
  if (computedLocale === void 0) {
    if (ARABIC_PERSIAN_DETECT_RE.test(input)) {
      computedLocale = "ar";
    } else if (HAN_DETECT_RE.test(input)) {
      computedLocale = "zh";
    }
  }
  const {
    group,
    decimal,
    currency,
    exponentSeparator
  } = getNumberLocaleDetails(computedLocale, options);
  const unitParts = getFormatter(computedLocale, options).formatToParts(1).filter((p) => p.type === "unit").map((p) => escapeRegExp(p.value));
  const unitRegex = unitParts.length ? new RegExp(unitParts.join("|"), "g") : null;
  let groupRegex = null;
  if (group) {
    const isSpaceGroup = new RegExp("\\p{Zs}", "u").test(group);
    const isApostropheGroup = group === "'" || group === "’";
    if (isSpaceGroup) {
      groupRegex = new RegExp("\\p{Zs}", "gu");
    } else if (isApostropheGroup) {
      groupRegex = /['’]/g;
    } else {
      groupRegex = new RegExp(escapeRegExp(group), "g");
    }
  }
  const replacements = [
    [groupRegex, ""],
    [new RegExp(escapeRegExp(decimal), "g"), "."],
    // Fullwidth/Arabic punctuation
    [/[．٫]/g, "."],
    // FULLWIDTH_DECIMAL, ARABIC DECIMAL SEPARATOR (U+066B)
    [/[，٬]/g, ""],
    // FULLWIDTH_GROUP, ARABIC THOUSANDS SEPARATOR (U+066C)
    // Currency & unit labels
    [currency ? new RegExp(escapeRegExp(currency), "g") : null, ""],
    [unitRegex, ""],
    [PERCENT_GLOBAL_RE, ""],
    [PERMILLE_GLOBAL_RE, ""],
    [exponentSeparator ? new RegExp(escapeRegExp(exponentSeparator), "g") : null, "e"],
    // Numeral systems to ASCII digits
    [NON_ASCII_DIGIT_RE, (ch) => String(ch.charCodeAt(0) % 16)],
    [HAN_RE, (ch) => String(Math.max(HAN_NUMERALS.indexOf(ch) - 1, 0))]
  ];
  let unformatted = replacements.reduce((acc, [regex, replacement]) => {
    return regex ? acc.replace(regex, replacement) : acc;
  }, input);
  const lastDot = unformatted.lastIndexOf(".");
  if (lastDot !== -1) {
    unformatted = `${unformatted.slice(0, lastDot).replace(/\./g, "")}.${unformatted.slice(lastDot + 1).replace(/\./g, "")}`;
  }
  if (/^[-+]?Infinity$/i.test(input) || input.includes("∞")) {
    return null;
  }
  const parseTarget = (isNegative ? "-" : "") + unformatted;
  let num = parseFloat(parseTarget);
  const style = options?.style;
  const isUnitPercent = style === "unit" && options?.unit === "percent";
  const hasPercentSymbol = PERCENT_RE.test(formattedNumber) || style === "percent";
  const hasPermilleSymbol = PERMILLE_RE.test(formattedNumber);
  if (hasPermilleSymbol) {
    num = shiftDecimal(num, -3);
  } else if (!isUnitPercent && hasPercentSymbol) {
    num = shiftDecimal(num, -2);
  }
  if (!Number.isFinite(num)) {
    return null;
  }
  return num;
}
const STEP_EPSILON_FACTOR = 1e-10;
const MAX_FLOATING_POINT_CLEANUP_DELTA = 1e-10;
function hasNumberFormatRoundingOptions(format) {
  return format?.maximumFractionDigits != null || format?.minimumFractionDigits != null || format?.maximumSignificantDigits != null || format?.minimumSignificantDigits != null || format?.roundingIncrement != null || format?.roundingMode != null || format?.roundingPriority != null;
}
function removeFloatingPointErrors(value, format) {
  if (!Number.isFinite(value)) {
    return value;
  }
  if (!hasNumberFormatRoundingOptions(format)) {
    const roundedValue2 = parseFloat(value.toPrecision(15));
    const cleanupDelta = Math.abs(roundedValue2 - value);
    const cleanupTolerance = Math.min(Number.EPSILON * Math.max(1, Math.abs(value)), MAX_FLOATING_POINT_CLEANUP_DELTA);
    return cleanupDelta <= cleanupTolerance ? roundedValue2 : value;
  }
  const formatter = getFormatter("en-US", {
    ...format,
    // These options alter only display decoration, not numeric rounding.
    signDisplay: "auto",
    currencySign: "standard",
    notation: format.notation === "compact" ? "standard" : format.notation,
    useGrouping: false
  });
  const roundedText = formatter.format(value);
  const roundedValue = parseNumber(roundedText, "en-US", format);
  if (roundedValue === null) {
    return value;
  }
  return formatter.format(roundedValue) === roundedText ? roundedValue : value;
}
function snapToStep(value, base, step, nearest) {
  const stepSize = Math.abs(step);
  const direction = Math.sign(step);
  const tolerance = stepSize * STEP_EPSILON_FACTOR * direction;
  const rawSteps = value - base + tolerance;
  if (nearest) {
    return base + Math.round(rawSteps / step) * step;
  }
  const snappedSteps = direction > 0 ? Math.floor(rawSteps / stepSize) : Math.ceil(rawSteps / stepSize);
  return base + snappedSteps * stepSize;
}
function toValidatedNumber(value, step, minWithDefault, maxWithDefault, minWithZeroDefault, format, snapOnStep, small, shouldClamp) {
  if (value === null) {
    return value;
  }
  let nextValue = value;
  if (step != null && snapOnStep && step !== 0) {
    const base = small || minWithDefault === Number.MIN_SAFE_INTEGER ? minWithZeroDefault : minWithDefault;
    nextValue = snapToStep(nextValue, base, step, small);
  }
  if (shouldClamp) {
    nextValue = clamp(nextValue, minWithDefault, maxWithDefault);
  }
  if (step == null && !hasNumberFormatRoundingOptions(format)) {
    return nextValue;
  }
  const roundedValue = removeFloatingPointErrors(nextValue, format);
  return shouldClamp ? clamp(roundedValue, minWithDefault, maxWithDefault) : roundedValue;
}
const NumberFieldRoot = /* @__PURE__ */ reactExports.forwardRef(function NumberFieldRoot2(componentProps, forwardedRef) {
  const {
    id: idProp,
    min,
    max,
    smallStep = 0.1,
    step: stepProp = 1,
    largeStep = 10,
    required = false,
    disabled: disabledProp = false,
    readOnly = false,
    form,
    name: nameProp,
    defaultValue,
    value: valueProp,
    onValueChange: onValueChangeProp,
    onValueCommitted: onValueCommittedProp,
    allowWheelScrub = false,
    snapOnStep = false,
    allowOutOfRange = false,
    format,
    locale,
    render,
    className,
    inputRef: inputRefProp,
    style,
    ...elementProps
  } = componentProps;
  const {
    setDirty,
    validityData,
    disabled: fieldDisabled,
    setFilled,
    name: fieldName,
    state: fieldState,
    validation
  } = useFieldRootContext();
  const {
    clearErrors
  } = useFormContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const step = stepProp === "any" ? 1 : stepProp;
  const [isScrubbing, setIsScrubbing] = reactExports.useState(false);
  const minWithDefault = min ?? Number.MIN_SAFE_INTEGER;
  const maxWithDefault = max ?? Number.MAX_SAFE_INTEGER;
  const minWithZeroDefault = min ?? 0;
  const formatStyle = format?.style;
  const inputRef = reactExports.useRef(null);
  const hiddenInputRef = useMergedRefs(inputRefProp, validation.inputRef);
  const id = useLabelableId({
    id: idProp
  });
  const [valueUnwrapped, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "NumberField",
    state: "value"
  });
  const value = valueUnwrapped ?? null;
  const valueRef = useValueAsRef(value);
  useIsoLayoutEffect(() => {
    setFilled(value !== null);
  }, [setFilled, value]);
  const forceRender = useForcedRerendering();
  const formatOptionsRef = useValueAsRef(format);
  const hasPendingCommitRef = reactExports.useRef(false);
  const onValueCommitted = useStableCallback((nextValue, eventDetails) => {
    hasPendingCommitRef.current = false;
    onValueCommittedProp?.(nextValue, eventDetails);
  });
  const allowInputSyncRef = reactExports.useRef(true);
  const lastChangedValueRef = reactExports.useRef(null);
  const [inputValue, setInputValue] = reactExports.useState(() => formatNumber(value, locale, format));
  const [inputMode, setInputMode] = reactExports.useState("numeric");
  const getAllowedNonNumericKeys = useStableCallback(() => {
    const parts = getFormatParts(locale, format);
    const keys = new Set(BASE_NON_NUMERIC_SYMBOLS);
    const addAll = (chars) => chars.forEach((char) => keys.add(char));
    const decimal = parts.find((part) => part.type === "decimal")?.value ?? getNumberLocaleDetails(locale, format).decimal;
    keys.add(decimal);
    parts.forEach((part) => {
      if (part.type === "integer" || part.type === "fraction" || part.type === "exponentInteger" || part.type === "compact") {
        return;
      }
      addAll(Array.from(part.value));
      if (SPACE_SEPARATOR_RE.test(part.value)) {
        keys.add(" ");
      }
    });
    const allowPercentSymbols = formatStyle === "percent" || formatStyle === "unit" && format?.unit === "percent";
    const allowPermilleSymbols = formatStyle === "percent" || formatStyle === "unit" && format?.unit === "permille";
    if (allowPercentSymbols) {
      addAll(PERCENTAGES);
    }
    if (allowPermilleSymbols) {
      addAll(PERMILLE);
    }
    addAll(PLUS_SIGNS_WITH_ASCII);
    if (minWithDefault < 0 || allowOutOfRange) {
      addAll(MINUS_SIGNS_WITH_ASCII);
    }
    return keys;
  });
  const getStepAmount = useStableCallback((event) => {
    if (event?.altKey) {
      return smallStep;
    }
    if (event?.shiftKey) {
      return largeStep;
    }
    return step;
  });
  const setValue = useStableCallback((unvalidatedValue, details) => {
    const eventWithOptionalKeyState = details.event;
    const dir = details.direction;
    const isInputReason = details.reason.startsWith("input-") || details.reason === none;
    const shouldClampValue = !allowOutOfRange || !isInputReason;
    const validatedValue = toValidatedNumber(unvalidatedValue, dir ? getStepAmount(eventWithOptionalKeyState) * dir : void 0, minWithDefault, maxWithDefault, minWithZeroDefault, formatOptionsRef.current, snapOnStep, eventWithOptionalKeyState?.altKey ?? false, shouldClampValue);
    const shouldFireChange = validatedValue !== value || isInputReason && (unvalidatedValue !== value || allowInputSyncRef.current === false);
    if (shouldFireChange) {
      onValueChangeProp?.(validatedValue, details);
      if (details.isCanceled) {
        return false;
      }
      setValueUnwrapped(validatedValue);
      setDirty(validatedValue !== validityData.initialValue);
      hasPendingCommitRef.current = true;
    }
    lastChangedValueRef.current = validatedValue;
    if (allowInputSyncRef.current) {
      setInputValue(formatNumber(validatedValue, locale, format));
    }
    forceRender();
    return shouldFireChange;
  });
  const incrementValue = useStableCallback((amount, {
    direction,
    currentValue,
    event,
    reason
  }) => {
    const prevValue = currentValue == null ? valueRef.current : currentValue;
    const nativeEvent = event;
    if (typeof prevValue !== "number") {
      return setValue(0, createChangeEventDetails(reason, nativeEvent));
    }
    return setValue(prevValue + amount * direction, createChangeEventDetails(reason, nativeEvent, void 0, {
      direction
    }));
  });
  useIsoLayoutEffect(function syncFormattedInputValueOnValueChange() {
    if (!allowInputSyncRef.current) {
      return;
    }
    const nextInputValue = formatNumber(value, locale, format);
    if (nextInputValue !== inputValue) {
      setInputValue(nextInputValue);
    }
  });
  useIsoLayoutEffect(function setDynamicInputModeForIOS() {
    if (!ios) {
      return;
    }
    let computedInputMode = "text";
    if (minWithDefault >= 0) {
      computedInputMode = "decimal";
    }
    setInputMode(computedInputMode);
  }, [minWithDefault]);
  reactExports.useEffect(function registerElementWheelListener() {
    const element2 = inputRef.current;
    if (disabled || readOnly || !allowWheelScrub || !element2) {
      return void 0;
    }
    function handleWheel(event) {
      if (
        // Allow pinch-zooming.
        event.ctrlKey || activeElement(ownerDocument(inputRef.current)) !== inputRef.current
      ) {
        return;
      }
      event.preventDefault();
      allowInputSyncRef.current = true;
      const amount = getStepAmount(event);
      const changed = incrementValue(amount, {
        direction: event.deltaY > 0 ? -1 : 1,
        event,
        reason: wheel
      });
      if (changed) {
        onValueCommitted(lastChangedValueRef.current, createGenericEventDetails(wheel, event));
      }
    }
    return addEventListener(element2, "wheel", handleWheel);
  }, [allowWheelScrub, incrementValue, disabled, readOnly, getStepAmount, onValueCommitted, lastChangedValueRef, valueRef]);
  const state = reactExports.useMemo(() => ({
    ...fieldState,
    disabled,
    readOnly,
    required,
    value,
    inputValue,
    scrubbing: isScrubbing
  }), [fieldState, disabled, readOnly, required, value, inputValue, isScrubbing]);
  const contextValue = reactExports.useMemo(() => ({
    inputRef,
    minWithDefault,
    maxWithDefault,
    id,
    setValue,
    incrementValue,
    getStepAmount,
    allowInputSyncRef,
    formatOptionsRef,
    valueRef,
    lastChangedValueRef,
    hasPendingCommitRef,
    name,
    nameProp,
    inputMode,
    getAllowedNonNumericKeys,
    min,
    max,
    setInputValue,
    locale,
    setIsScrubbing,
    state,
    onValueCommitted
  }), [inputRef, minWithDefault, maxWithDefault, id, setValue, incrementValue, getStepAmount, formatOptionsRef, valueRef, name, nameProp, inputMode, getAllowedNonNumericKeys, min, max, setInputValue, locale, state, onValueCommitted]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(NumberFieldRootContext.Provider, {
    value: contextValue,
    children: [element, /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      ...validation.getValidationProps(disabled, {
        onFocus() {
          inputRef.current?.focus();
        },
        onChange(event) {
          if (event.nativeEvent.defaultPrevented || disabled || readOnly) {
            return;
          }
          const nextValue = event.currentTarget.valueAsNumber;
          const parsedValue = Number.isNaN(nextValue) ? null : nextValue;
          const details = createChangeEventDetails(none, event.nativeEvent);
          setValue(parsedValue, details);
          clearErrors(name);
          validation.change(lastChangedValueRef.current ?? parsedValue);
        }
      }),
      ref: hiddenInputRef,
      type: "number",
      form,
      name,
      value: value ?? "",
      min,
      max,
      step: stepProp,
      disabled,
      readOnly,
      required,
      "aria-hidden": true,
      tabIndex: -1,
      style: name ? visuallyHiddenInput : visuallyHidden,
      suppressHydrationWarning: true
    })]
  });
});
const NumberFieldGroup$1 = /* @__PURE__ */ reactExports.forwardRef(function NumberFieldGroup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    state
  } = useNumberFieldRootContext();
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: [{
      role: "group"
    }, elementProps],
    stateAttributesMapping
  });
  return element;
});
const EMPTY = 0;
class Interval extends Timeout {
  static create() {
    return new Interval();
  }
  /**
   * Executes `fn` at `delay` interval, clearing any previously scheduled call.
   */
  start(delay, fn) {
    this.clear();
    this.currentId = setInterval(() => {
      fn();
    }, delay);
  }
  clear = () => {
    if (this.currentId !== EMPTY) {
      clearInterval(this.currentId);
      this.currentId = EMPTY;
    }
  };
}
function useInterval() {
  const timeout = useRefWithInit(Interval.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}
const DEFAULT_TICK_DELAY = 60;
const DEFAULT_START_DELAY = 400;
const DEFAULT_SCROLL_DISTANCE = 8;
const TOUCH_TIMEOUT = 50;
const MAX_POINTER_MOVES_AFTER_TOUCH = 3;
function isTouchLikePointerType(pointerType) {
  return pointerType === "touch" || pointerType === "pen";
}
function usePressAndHold(params) {
  const {
    disabled,
    tick,
    onStop,
    tickDelay = DEFAULT_TICK_DELAY,
    startDelay = DEFAULT_START_DELAY,
    scrollDistance = DEFAULT_SCROLL_DISTANCE,
    elementRef
  } = params;
  const startTickTimeout = useTimeout();
  const tickInterval = useInterval();
  const intentionalTouchCheckTimeout = useTimeout();
  const isPressedRef = reactExports.useRef(false);
  const movesAfterTouchRef = reactExports.useRef(0);
  const downCoordsRef = reactExports.useRef({
    x: 0,
    y: 0
  });
  const isTouchingButtonRef = reactExports.useRef(false);
  const ignoreClickRef = reactExports.useRef(false);
  const pointerTypeRef = reactExports.useRef("");
  const unsubscribeFromGlobalContextMenuRef = reactExports.useRef(NOOP);
  const unsubscribeFromGlobalPointerUpRef = reactExports.useRef(NOOP);
  const stopAutoChange = useStableCallback(() => {
    intentionalTouchCheckTimeout.clear();
    startTickTimeout.clear();
    tickInterval.clear();
    unsubscribeFromGlobalContextMenuRef.current();
    movesAfterTouchRef.current = 0;
  });
  function startAutoChange(triggerNativeEvent) {
    stopAutoChange();
    const element = elementRef.current;
    if (!element) {
      return;
    }
    const win = getWindow(element);
    function handleContextMenu(event) {
      event.preventDefault();
    }
    unsubscribeFromGlobalContextMenuRef.current = addEventListener(win, "contextmenu", handleContextMenu);
    unsubscribeFromGlobalPointerUpRef.current();
    unsubscribeFromGlobalPointerUpRef.current = addEventListener(win, "pointerup", (event) => {
      isPressedRef.current = false;
      stopAutoChange();
      onStop?.(event);
    }, {
      once: true
    });
    if (!tick(triggerNativeEvent)) {
      stopAutoChange();
      return;
    }
    startTickTimeout.start(startDelay, () => {
      tickInterval.start(tickDelay, () => {
        if (!tick(triggerNativeEvent)) {
          stopAutoChange();
        }
      });
    });
  }
  reactExports.useEffect(() => () => {
    stopAutoChange();
    unsubscribeFromGlobalPointerUpRef.current();
  }, [stopAutoChange]);
  const pointerHandlers = {
    onTouchStart() {
      isTouchingButtonRef.current = true;
    },
    onTouchEnd() {
      isTouchingButtonRef.current = false;
    },
    onPointerDown(event) {
      if (event.defaultPrevented || event.button || disabled) {
        return;
      }
      pointerTypeRef.current = event.pointerType;
      ignoreClickRef.current = false;
      isPressedRef.current = true;
      downCoordsRef.current = {
        x: event.clientX,
        y: event.clientY
      };
      const isTouchPointer = isTouchLikePointerType(event.pointerType);
      if (!isTouchPointer) {
        event.preventDefault();
        startAutoChange(event.nativeEvent);
      } else {
        intentionalTouchCheckTimeout.start(TOUCH_TIMEOUT, () => {
          const moves = movesAfterTouchRef.current;
          movesAfterTouchRef.current = 0;
          const stillPressed = isPressedRef.current;
          if (stillPressed && moves < MAX_POINTER_MOVES_AFTER_TOUCH) {
            startAutoChange(event.nativeEvent);
            ignoreClickRef.current = true;
          } else {
            ignoreClickRef.current = false;
            stopAutoChange();
          }
        });
      }
    },
    onPointerUp(event) {
      if (isTouchLikePointerType(event.pointerType)) {
        isPressedRef.current = false;
      }
    },
    onPointerMove(event) {
      if (disabled || !isTouchLikePointerType(event.pointerType) || !isPressedRef.current) {
        return;
      }
      movesAfterTouchRef.current += 1;
      const {
        x,
        y
      } = downCoordsRef.current;
      const dx = x - event.clientX;
      const dy = y - event.clientY;
      if (dx ** 2 + dy ** 2 > scrollDistance ** 2) {
        stopAutoChange();
      }
    },
    onMouseEnter(event) {
      if (event.defaultPrevented || disabled || !isPressedRef.current || isTouchingButtonRef.current || isTouchLikePointerType(pointerTypeRef.current)) {
        return;
      }
      startAutoChange(event.nativeEvent);
    },
    onMouseLeave() {
      if (isTouchingButtonRef.current) {
        return;
      }
      stopAutoChange();
    },
    onMouseUp() {
      if (isTouchingButtonRef.current) {
        return;
      }
      stopAutoChange();
    }
  };
  const shouldSkipClick = useStableCallback((event) => {
    if (event.defaultPrevented) {
      return true;
    }
    if (isTouchLikePointerType(pointerTypeRef.current)) {
      return ignoreClickRef.current;
    }
    return event.detail !== 0;
  });
  return {
    pointerHandlers,
    shouldSkipClick
  };
}
const SELECT_NONE_STYLE = {
  WebkitUserSelect: "none",
  userSelect: "none"
};
function useNumberFieldStepperButton(componentProps, forwardedRef, isIncrement) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    allowInputSyncRef,
    formatOptionsRef,
    getStepAmount,
    id,
    incrementValue,
    inputRef,
    maxWithDefault,
    minWithDefault,
    setValue,
    state,
    valueRef,
    locale,
    lastChangedValueRef,
    onValueCommitted
  } = useNumberFieldRootContext();
  const {
    disabled: contextDisabled,
    readOnly,
    value,
    inputValue
  } = state;
  const isAtBoundary = value != null && (isIncrement ? value >= maxWithDefault : value <= minWithDefault);
  const disabled = disabledProp || contextDisabled || isAtBoundary;
  const pressReason = isIncrement ? incrementPress : decrementPress;
  function commitValue(nativeEvent) {
    const shouldCommitInputValue = !allowInputSyncRef.current;
    allowInputSyncRef.current = true;
    if (!shouldCommitInputValue) {
      lastChangedValueRef.current = valueRef.current;
      return;
    }
    const parsedValue = parseNumber(inputValue, locale, formatOptionsRef.current);
    if (parsedValue !== null) {
      const details = createChangeEventDetails(pressReason, nativeEvent);
      setValue(parsedValue, details);
      if (!details.isCanceled) {
        valueRef.current = parsedValue;
      }
    }
  }
  const {
    pointerHandlers,
    shouldSkipClick
  } = usePressAndHold({
    disabled: disabled || readOnly,
    elementRef: inputRef,
    tick(triggerEvent) {
      const amount = getStepAmount(triggerEvent);
      return incrementValue(amount, {
        direction: isIncrement ? 1 : -1,
        event: triggerEvent,
        reason: pressReason
      });
    },
    onStop(nativeEvent) {
      const committed = lastChangedValueRef.current ?? valueRef.current;
      onValueCommitted(committed, createGenericEventDetails(pressReason, nativeEvent));
    }
  });
  const props = {
    disabled,
    "aria-label": isIncrement ? "Increase" : "Decrease",
    "aria-controls": id,
    // Keyboard users shouldn't have access to the buttons, since they can use the input element
    // to change the value. On the other hand, `aria-hidden` is not applied because touch screen
    // readers should be able to use the buttons.
    tabIndex: -1,
    style: SELECT_NONE_STYLE,
    ...pointerHandlers,
    onClick(event) {
      const isDisabled = disabled || readOnly;
      if (event.defaultPrevented || isDisabled || shouldSkipClick(event)) {
        return;
      }
      commitValue(event.nativeEvent);
      const amount = getStepAmount(event);
      const prev = valueRef.current;
      incrementValue(amount, {
        direction: isIncrement ? 1 : -1,
        event: event.nativeEvent,
        reason: pressReason
      });
      const committed = lastChangedValueRef.current ?? valueRef.current;
      if (committed !== prev) {
        onValueCommitted(committed, createGenericEventDetails(pressReason, event.nativeEvent));
      }
    },
    onPointerDown(event) {
      if (event.defaultPrevented || readOnly || event.button || disabled) {
        return;
      }
      commitValue(event.nativeEvent);
      lastChangedValueRef.current = null;
      if (!isTouchLikePointerType(event.pointerType)) {
        inputRef.current?.focus();
      }
      pointerHandlers.onPointerDown(event);
    }
  };
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    // Read-only steppers are exposed as unavailable through button disabled semantics, while
    // `data-readonly` (from `state`) is preserved for styling. `aria-readonly` isn't valid on the
    // `button` role, so it's intentionally not set.
    disabled: disabled || readOnly,
    native: nativeButton,
    focusableWhenDisabled: true
  });
  const buttonState = {
    ...state,
    disabled
  };
  return useRenderElement("button", componentProps, {
    ref: [forwardedRef, buttonRef],
    state: buttonState,
    props: [props, elementProps, getButtonProps],
    stateAttributesMapping
  });
}
const NumberFieldIncrement$1 = /* @__PURE__ */ reactExports.forwardRef(function NumberFieldIncrement2(componentProps, forwardedRef) {
  return useNumberFieldStepperButton(componentProps, forwardedRef, true);
});
const NumberFieldDecrement$1 = /* @__PURE__ */ reactExports.forwardRef(function NumberFieldDecrement2(componentProps, forwardedRef) {
  return useNumberFieldStepperButton(componentProps, forwardedRef, false);
});
const NAVIGATE_KEYS = /* @__PURE__ */ new Set(["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter", "Escape"]);
const NumberFieldInput$1 = /* @__PURE__ */ reactExports.forwardRef(function NumberFieldInput2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    allowInputSyncRef,
    formatOptionsRef,
    getAllowedNonNumericKeys,
    getStepAmount,
    id,
    incrementValue,
    inputMode,
    max,
    min,
    name,
    nameProp,
    setValue,
    state,
    setInputValue,
    locale,
    inputRef,
    onValueCommitted,
    lastChangedValueRef,
    hasPendingCommitRef,
    valueRef
  } = useNumberFieldRootContext();
  const {
    disabled,
    readOnly,
    required,
    value,
    inputValue
  } = state;
  const {
    clearErrors
  } = useFormContext();
  const {
    validationMode,
    setTouched,
    setFocused,
    invalid,
    shouldValidateOnChange,
    validation
  } = useFieldRootContext();
  const {
    labelId
  } = useLabelableContext();
  const hasTouchedInputRef = reactExports.useRef(false);
  const blockRevalidationRef = reactExports.useRef(false);
  const pendingCaretRef = reactExports.useRef(null);
  useRegisterFieldControl(inputRef, id, value, void 0, !disabled, nameProp);
  useIsoLayoutEffect(() => {
    if (pendingCaretRef.current != null) {
      const caret = pendingCaretRef.current;
      pendingCaretRef.current = null;
      inputRef.current?.setSelectionRange(caret, caret);
    }
  });
  useValueChanged(value, () => {
    clearErrors(name);
    if (blockRevalidationRef.current && !shouldValidateOnChange()) {
      blockRevalidationRef.current = false;
      return;
    }
    validation.change(value);
  });
  const inputProps = {
    id,
    required,
    disabled,
    readOnly,
    inputMode,
    value: inputValue,
    type: "text",
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: "false",
    "aria-roledescription": "Number field",
    "aria-invalid": !disabled && invalid ? true : void 0,
    "aria-labelledby": labelId,
    // If the server's locale does not match the client's locale, the formatting may not match,
    // causing a hydration mismatch.
    suppressHydrationWarning: true,
    onFocus(event) {
      if (event.defaultPrevented || disabled) {
        return;
      }
      setFocused(true);
      if (hasTouchedInputRef.current) {
        return;
      }
      hasTouchedInputRef.current = true;
      const target = event.currentTarget;
      const length = target.value.length;
      target.setSelectionRange(length, length);
    },
    onBlur(event) {
      if (event.defaultPrevented || disabled) {
        return;
      }
      setTouched(true);
      setFocused(false);
      if (readOnly) {
        return;
      }
      const hadManualInput = !allowInputSyncRef.current;
      const hadPendingProgrammaticChange = hasPendingCommitRef.current;
      allowInputSyncRef.current = true;
      if (inputValue.trim() === "") {
        const clearDetails = createChangeEventDetails(inputClear, event.nativeEvent);
        setValue(null, clearDetails);
        if (clearDetails.isCanceled) {
          return;
        }
        if (validationMode === "onBlur") {
          validation.commit(null);
        }
        if (hadManualInput || hadPendingProgrammaticChange || value !== null) {
          onValueCommitted(null, createGenericEventDetails(inputClear, event.nativeEvent));
        }
        return;
      }
      const formatOptions = formatOptionsRef.current;
      const parsedValue = parseNumber(inputValue, locale, formatOptions);
      if (parsedValue === null) {
        return;
      }
      const hasRoundingOptions = hasNumberFormatRoundingOptions(formatOptions);
      let committed;
      if (!hadManualInput && !hasRoundingOptions) {
        committed = value;
      } else if (hasRoundingOptions) {
        committed = removeFloatingPointErrors(parsedValue, formatOptions);
      } else {
        committed = parsedValue;
      }
      const nextEventDetails = createGenericEventDetails(inputBlur, event.nativeEvent);
      const shouldUpdateValue = value !== committed;
      const shouldCommit = hadManualInput || shouldUpdateValue || hadPendingProgrammaticChange;
      let committedValue = committed;
      if (shouldUpdateValue) {
        const changeDetails = createChangeEventDetails(inputBlur, event.nativeEvent);
        blockRevalidationRef.current = true;
        setValue(committed, changeDetails);
        if (changeDetails.isCanceled) {
          blockRevalidationRef.current = false;
          return;
        }
        committedValue = lastChangedValueRef.current;
        if (committedValue === value) {
          blockRevalidationRef.current = false;
        }
      }
      if (validationMode === "onBlur") {
        validation.commit(committedValue);
      }
      if (shouldCommit) {
        onValueCommitted(committedValue, nextEventDetails);
      }
      const canonicalText = formatNumber(committedValue, locale, formatOptions);
      if (inputValue !== canonicalText) {
        setInputValue(canonicalText);
      }
    },
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      allowInputSyncRef.current = false;
      const targetValue = event.currentTarget.value;
      if (targetValue.trim() === "") {
        setInputValue(targetValue);
        setValue(null, createChangeEventDetails(inputClear, event.nativeEvent));
        return;
      }
      const allowedNonNumericKeys = getAllowedNonNumericKeys();
      const isValidCharacterString = Array.from(targetValue).every((ch) => isNumeralChar(ch) || ANY_MINUS_DETECT_RE.test(ch) || allowedNonNumericKeys.has(ch) || // Bidi/format controls are stripped by `parseNumber`; don't let them reject the string
      // (RTL locales insert them around exponent/currency signs, e.g. scientific notation).
      FORMAT_CONTROL_DETECT_RE.test(ch));
      if (!isValidCharacterString) {
        return;
      }
      const parsedValue = parseNumber(targetValue, locale, formatOptionsRef.current);
      setInputValue(targetValue);
      if (parsedValue !== null) {
        setValue(parsedValue, createChangeEventDetails(inputChange, event.nativeEvent));
      }
    },
    onKeyDown(event) {
      if (event.defaultPrevented || readOnly || disabled) {
        return;
      }
      const nativeEvent = event.nativeEvent;
      const hadManualInput = !allowInputSyncRef.current;
      const allowedNonNumericKeys = getAllowedNonNumericKeys();
      let isAllowedNonNumericKey = allowedNonNumericKeys.has(event.key);
      const {
        decimal,
        currency,
        percentSign
      } = getNumberLocaleDetails(locale, formatOptionsRef.current);
      const selectionStart = event.currentTarget.selectionStart;
      const selectionEnd = event.currentTarget.selectionEnd;
      const isAllSelected = selectionStart === 0 && selectionEnd === inputValue.length;
      const selectionContainsIndex = (index) => selectionStart != null && selectionEnd != null && index >= selectionStart && index < selectionEnd;
      const signGroups = [[ANY_MINUS_DETECT_RE, ANY_MINUS_RE], [ANY_PLUS_DETECT_RE, ANY_PLUS_RE]];
      signGroups.forEach(([detectRe, globalRe]) => {
        if (detectRe.test(event.key) && Array.from(allowedNonNumericKeys).some((k) => detectRe.test(k))) {
          const existingIndex = inputValue.search(globalRe);
          const isReplacingExisting = existingIndex !== -1 && selectionContainsIndex(existingIndex);
          isAllowedNonNumericKey = !(ANY_MINUS_DETECT_RE.test(inputValue) || ANY_PLUS_DETECT_RE.test(inputValue)) || isAllSelected || isReplacingExisting;
        }
      });
      [decimal, currency, percentSign].forEach((symbol) => {
        if (event.key === symbol) {
          const symbolIndex = inputValue.indexOf(symbol);
          const isSymbolHighlighted = selectionContainsIndex(symbolIndex);
          isAllowedNonNumericKey = symbolIndex === -1 || isAllSelected || isSymbolHighlighted;
        }
      });
      const isNavigateKey = NAVIGATE_KEYS.has(event.key);
      const isStepKey = event.key === "ArrowUp" || event.key === "ArrowDown";
      if (
        // Allow composition events (e.g., pinyin)
        // event.nativeEvent.isComposing does not work in Safari:
        // https://bugs.webkit.org/show_bug.cgi?id=165004
        event.which === 229 || event.altKey && !isStepKey || event.ctrlKey || event.metaKey || isAllowedNonNumericKey || isNumeralChar(event.key) || isNavigateKey
      ) {
        return;
      }
      let boundaryValue = null;
      if (event.key === "Home" && min != null) {
        boundaryValue = min;
      } else if (event.key === "End" && max != null) {
        boundaryValue = max;
      }
      if (event.key.length > 1 && !isStepKey && boundaryValue === null) {
        return;
      }
      const currentValue = hadManualInput ? parseNumber(inputValue, locale, formatOptionsRef.current) : null;
      const amount = getStepAmount(event);
      event.preventDefault();
      event.stopPropagation();
      const commitDetails = createGenericEventDetails(keyboard, nativeEvent);
      let changed = false;
      if (isStepKey || boundaryValue !== null) {
        allowInputSyncRef.current = true;
      }
      if (isStepKey) {
        if (!hadManualInput) {
          lastChangedValueRef.current = valueRef.current;
        }
        changed = incrementValue(amount, {
          direction: event.key === "ArrowUp" ? 1 : -1,
          currentValue,
          event: nativeEvent,
          reason: keyboard
        });
      } else if (boundaryValue !== null) {
        changed = setValue(boundaryValue, createChangeEventDetails(keyboard, nativeEvent));
      }
      if (changed) {
        onValueCommitted(lastChangedValueRef.current, commitDetails);
      }
    },
    onPaste(event) {
      if (event.defaultPrevented || readOnly || disabled) {
        return;
      }
      let pastedData = "";
      try {
        pastedData = event.clipboardData?.getData("text/plain") ?? "";
      } catch {
        return;
      }
      event.preventDefault();
      const input = event.currentTarget;
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;
      const nextText = inputValue.slice(0, selectionStart) + pastedData + inputValue.slice(selectionEnd);
      const parsedValue = parseNumber(nextText, locale, formatOptionsRef.current);
      if (parsedValue !== null) {
        allowInputSyncRef.current = false;
        pendingCaretRef.current = selectionStart + pastedData.length;
        setValue(parsedValue, createChangeEventDetails(inputPaste, event.nativeEvent));
        setInputValue(nextText);
      }
    }
  };
  const element = useRenderElement("input", componentProps, {
    ref: [forwardedRef, inputRef],
    state,
    props: [inputProps, elementProps, (props) => validation.getValidationProps(disabled, props)],
    stateAttributesMapping
  });
  return element;
});
const NumberFieldScrubAreaContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useNumberFieldScrubAreaContext() {
  const context = reactExports.useContext(NumberFieldScrubAreaContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(44));
  }
  return context;
}
function getViewportRect(teleportDistance, scrubAreaEl) {
  const win = getWindow(scrubAreaEl);
  if (teleportDistance != null) {
    const rect = scrubAreaEl.getBoundingClientRect();
    return {
      left: rect.left - teleportDistance / 2,
      top: rect.top - teleportDistance / 2,
      right: rect.right + teleportDistance / 2,
      bottom: rect.bottom + teleportDistance / 2
    };
  }
  const vV = win.visualViewport;
  if (vV) {
    return {
      left: vV.offsetLeft,
      top: vV.offsetTop,
      right: vV.offsetLeft + vV.width,
      bottom: vV.offsetTop + vV.height
    };
  }
  return {
    left: 0,
    top: 0,
    right: win.document.documentElement.clientWidth,
    bottom: win.document.documentElement.clientHeight
  };
}
const SCRUB_AREA_STYLE = {
  touchAction: "none",
  WebkitUserSelect: "none",
  userSelect: "none"
};
const NumberFieldScrubArea$1 = /* @__PURE__ */ reactExports.forwardRef(function NumberFieldScrubArea2(componentProps, forwardedRef) {
  const {
    render,
    className,
    direction = "horizontal",
    pixelSensitivity = 2,
    teleportDistance,
    style,
    ...elementProps
  } = componentProps;
  const {
    state,
    setIsScrubbing: setRootScrubbing,
    inputRef,
    incrementValue,
    allowInputSyncRef,
    getStepAmount,
    onValueCommitted,
    lastChangedValueRef,
    valueRef
  } = useNumberFieldRootContext();
  const {
    disabled,
    readOnly
  } = state;
  const scrubAreaRef = reactExports.useRef(null);
  const isScrubbingRef = reactExports.useRef(false);
  const didMoveRef = reactExports.useRef(false);
  const pointerDownTargetRef = reactExports.useRef(null);
  const scrubAreaCursorRef = reactExports.useRef(null);
  const virtualCursorCoords = reactExports.useRef({
    x: 0,
    y: 0
  });
  const exitPointerLockTimeout = useTimeout();
  const [isTouchInput, setIsTouchInput] = reactExports.useState(false);
  const [isPointerLockDenied, setIsPointerLockDenied] = reactExports.useState(false);
  const [isScrubbing, setIsScrubbing] = reactExports.useState(false);
  function updateCursorTransform(virtualCursor, x, y) {
    const scale = getWindow(virtualCursor).visualViewport?.scale ?? 1;
    virtualCursor.style.transform = `translate3d(${x}px,${y}px,0) scale(${1 / scale})`;
  }
  const onScrub = useStableCallback(({
    movementX,
    movementY
  }) => {
    const virtualCursor = scrubAreaCursorRef.current;
    const scrubAreaEl = scrubAreaRef.current;
    if (!virtualCursor || !scrubAreaEl) {
      return;
    }
    const rect = getViewportRect(teleportDistance, scrubAreaEl);
    const coords = virtualCursorCoords.current;
    const wrap = (coord, halfSize, low, high) => {
      if (coord + halfSize < low) {
        return high - halfSize;
      }
      if (coord + halfSize > high) {
        return low - halfSize;
      }
      return coord;
    };
    const newCoords = {
      x: wrap(Math.round(coords.x + movementX), virtualCursor.offsetWidth / 2, rect.left, rect.right),
      y: wrap(Math.round(coords.y + movementY), virtualCursor.offsetHeight / 2, rect.top, rect.bottom)
    };
    virtualCursorCoords.current = newCoords;
    updateCursorTransform(virtualCursor, newCoords.x, newCoords.y);
  });
  const onScrubbingChange = useStableCallback((scrubbingValue, {
    clientX,
    clientY
  }) => {
    reactDomExports.flushSync(() => {
      setIsScrubbing(scrubbingValue);
      setRootScrubbing(scrubbingValue);
    });
    const virtualCursor = scrubAreaCursorRef.current;
    if (!virtualCursor || !scrubbingValue) {
      return;
    }
    const initialCoords = {
      x: clientX - virtualCursor.offsetWidth / 2,
      y: clientY - virtualCursor.offsetHeight / 2
    };
    virtualCursorCoords.current = initialCoords;
    updateCursorTransform(virtualCursor, initialCoords.x, initialCoords.y);
  });
  reactExports.useEffect(function registerGlobalScrubbingEventListeners() {
    if (!inputRef.current || disabled || readOnly || !isScrubbing) {
      return void 0;
    }
    let cumulativeDelta = 0;
    function handleScrubPointerUp(event) {
      function handler() {
        try {
          ownerDocument(scrubAreaRef.current).exitPointerLock();
        } catch {
        } finally {
          isScrubbingRef.current = false;
          onScrubbingChange(false, event);
          onValueCommitted(lastChangedValueRef.current ?? valueRef.current, createGenericEventDetails(scrub, event));
          const pointerDownTarget = pointerDownTargetRef.current;
          const input = inputRef.current;
          if (!didMoveRef.current && pointerDownTarget != null && input) {
            pointerDownTarget.dispatchEvent(new (getWindow(input)).MouseEvent("click", {
              bubbles: true,
              cancelable: true
            }));
          }
          didMoveRef.current = false;
          pointerDownTargetRef.current = null;
        }
      }
      if (gecko) {
        exitPointerLockTimeout.start(20, handler);
      } else {
        handler();
      }
    }
    function handleScrubPointerMove(event) {
      if (!isScrubbingRef.current) {
        return;
      }
      event.preventDefault();
      onScrub(event);
      const {
        movementX,
        movementY
      } = event;
      cumulativeDelta += direction === "vertical" ? movementY : movementX;
      if (Math.abs(cumulativeDelta) >= pixelSensitivity) {
        cumulativeDelta = 0;
        didMoveRef.current = true;
        const dValue = direction === "vertical" ? -movementY : movementX;
        const stepAmount = getStepAmount(event);
        const rawAmount = dValue * stepAmount;
        if (rawAmount !== 0) {
          allowInputSyncRef.current = true;
          incrementValue(Math.abs(rawAmount), {
            direction: rawAmount >= 0 ? 1 : -1,
            event,
            reason: scrub
          });
        }
      }
    }
    const win = getWindow(inputRef.current);
    const unsubscribe = mergeCleanups(addEventListener(win, "pointerup", handleScrubPointerUp, true), addEventListener(win, "pointermove", handleScrubPointerMove, true));
    return () => {
      exitPointerLockTimeout.clear();
      unsubscribe();
    };
  }, [disabled, readOnly, allowInputSyncRef, incrementValue, isScrubbing, getStepAmount, inputRef, onScrubbingChange, onScrub, direction, pixelSensitivity, lastChangedValueRef, onValueCommitted, valueRef, exitPointerLockTimeout]);
  reactExports.useEffect(() => () => {
    if (isScrubbingRef.current) {
      isScrubbingRef.current = false;
      setRootScrubbing(false);
      try {
        ownerDocument(scrubAreaRef.current).exitPointerLock();
      } catch {
      }
    }
  }, [setRootScrubbing]);
  reactExports.useEffect(function registerScrubberTouchPreventListener() {
    const element2 = scrubAreaRef.current;
    if (!element2 || disabled || readOnly) {
      return void 0;
    }
    function handleTouchStart(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
      }
    }
    return addEventListener(element2, "touchstart", handleTouchStart);
  }, [disabled, readOnly]);
  const defaultProps = {
    role: "presentation",
    style: SCRUB_AREA_STYLE,
    async onPointerDown(event) {
      if (event.defaultPrevented || readOnly || event.button || disabled) {
        return;
      }
      const isTouch = event.pointerType === "touch";
      setIsTouchInput(isTouch);
      if (event.pointerType === "mouse") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      isScrubbingRef.current = true;
      didMoveRef.current = false;
      pointerDownTargetRef.current = getTarget(event.nativeEvent);
      onScrubbingChange(true, event.nativeEvent);
      if (!isTouch && !webkit) {
        try {
          await ownerDocument(scrubAreaRef.current).body.requestPointerLock();
          setIsPointerLockDenied(false);
        } catch (error) {
          setIsPointerLockDenied(true);
        } finally {
          if (isScrubbingRef.current) {
            onScrubbingChange(true, event.nativeEvent);
          }
        }
      }
    }
  };
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, scrubAreaRef],
    state,
    props: [defaultProps, elementProps],
    stateAttributesMapping
  });
  const contextValue = reactExports.useMemo(() => ({
    isScrubbing,
    isTouchInput,
    isPointerLockDenied,
    scrubAreaCursorRef
  }), [isScrubbing, isTouchInput, isPointerLockDenied]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldScrubAreaContext.Provider, {
    value: contextValue,
    children: element
  });
});
const CURSOR_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  pointerEvents: "none"
};
const NumberFieldScrubAreaCursor = /* @__PURE__ */ reactExports.forwardRef(function NumberFieldScrubAreaCursor2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    state
  } = useNumberFieldRootContext();
  const {
    isScrubbing,
    isTouchInput,
    isPointerLockDenied,
    scrubAreaCursorRef
  } = useNumberFieldScrubAreaContext();
  const [domElement, setDomElement] = reactExports.useState(null);
  const shouldRender = isScrubbing && !webkit && !isTouchInput && !isPointerLockDenied;
  const element = useRenderElement("span", componentProps, {
    enabled: shouldRender,
    ref: [forwardedRef, scrubAreaCursorRef, setDomElement],
    state,
    props: [{
      role: "presentation",
      style: CURSOR_STYLE
    }, elementProps],
    stateAttributesMapping
  });
  return element && /* @__PURE__ */ reactDomExports.createPortal(element, ownerDocument(domElement).body);
});
const NumberFieldContext = reactExports.createContext(null);
function NumberField({
  id,
  className,
  size = "default",
  ...props
}) {
  const { code } = useUILocale();
  const generatedId = reactExports.useId();
  const fieldId = id ?? generatedId;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldContext.Provider, { value: { fieldId }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    NumberFieldRoot,
    {
      locale: code,
      className: cn("flex w-full flex-col items-start gap-2", className),
      "data-size": size,
      "data-slot": "number-field",
      id: fieldId,
      ...props
    }
  ) });
}
function NumberFieldGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NumberFieldGroup$1,
    {
      className: cn(
        "relative flex w-full justify-between rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base text-foreground shadow-xs/5 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-within:border-ring focus-within:ring-[3px] has-aria-invalid:border-destructive/36 focus-within:has-aria-invalid:border-destructive/64 focus-within:has-aria-invalid:ring-destructive/16 data-disabled:pointer-events-none data-disabled:opacity-64 sm:text-sm dark:bg-input/32 dark:has-aria-invalid:ring-destructive/24 dark:not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-disabled],:focus-within,[aria-invalid]]:shadow-none",
        className
      ),
      "data-slot": "number-field-group",
      ...props
    }
  );
}
function NumberFieldDecrement({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NumberFieldDecrement$1,
    {
      "aria-label": messages.decrease,
      className: cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-s-[calc(var(--radius-lg)-1px)] in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent data-disabled:pointer-events-none data-readonly:pointer-events-none not-in-data-disabled:data-disabled:*:opacity-40 data-readonly:*:opacity-40",
        className
      ),
      "data-slot": "number-field-decrement",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, {})
    }
  );
}
function NumberFieldIncrement({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NumberFieldIncrement$1,
    {
      "aria-label": messages.increase,
      className: cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-e-[calc(var(--radius-lg)-1px)] in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent data-disabled:pointer-events-none data-readonly:pointer-events-none not-in-data-disabled:data-disabled:*:opacity-40 data-readonly:*:opacity-40",
        className
      ),
      "data-slot": "number-field-increment",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {})
    }
  );
}
function NumberFieldInput({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NumberFieldInput$1,
    {
      "aria-roledescription": messages.numberInput,
      className: cn(
        "h-8.5 pointer-coarse:min-h-[calc(var(--qy-touch-target)-2px)] in-data-[size=lg]:h-9.5 in-data-[size=sm]:h-7.5 w-full min-w-0 grow bg-transparent in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] text-center text-foreground tabular-nums in-data-[size=lg]:leading-9.5 in-data-[size=sm]:leading-7.5 leading-8.5 outline-none sm:h-7.5 sm:in-data-[size=lg]:h-8.5 sm:in-data-[size=sm]:h-6.5 sm:in-data-[size=lg]:leading-8.5 sm:in-data-[size=sm]:leading-8.5 sm:leading-7.5",
        className
      ),
      "data-slot": "number-field-input",
      ...props
    }
  );
}
function NumberFieldScrubArea({
  className,
  label,
  ...props
}) {
  const context = reactExports.useContext(NumberFieldContext);
  if (!context) {
    throw new Error(
      "NumberFieldScrubArea must be used within a NumberField component for accessibility."
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    NumberFieldScrubArea$1,
    {
      className: cn("flex cursor-ew-resize", className),
      "data-slot": "number-field-scrub-area",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "cursor-ew-resize", htmlFor: context.fieldId, children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldScrubAreaCursor, { className: "drop-shadow-[0_1px_2px_var(--color-background)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CursorGrowIcon, {}) })
      ]
    }
  );
}
function CursorGrowIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MoveHorizontal, { "aria-hidden": "true", ...props });
}
export {
  NumberField as N,
  NumberFieldGroup as a,
  NumberFieldDecrement as b,
  NumberFieldInput as c,
  NumberFieldIncrement as d,
  NumberFieldScrubArea as e
};
