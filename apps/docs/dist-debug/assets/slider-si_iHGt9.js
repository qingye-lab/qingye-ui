import { b2 as clamp, r as reactExports, V as formatErrorMessage, a1 as useBaseUiId, X as useStableCallback, W as useControlled, aK as none, av as useValueChanged, aJ as createChangeEventDetails, bD as keyboard, bz as inputChange, bx as createGenericEventDetails, a3 as useIsoLayoutEffect, bm as activeElement, an as ownerDocument, aN as contains, Y as useRenderElement, j as jsxRuntimeExports, Z as CompositeList, aZ as useDirection, b0 as getWindow, au as useValueAsRef, am as getTarget, a$ as useAnimationFrame, b4 as addEventListener, bJ as isElement, c1 as drag, c2 as trackPress, $ as useCompositeListItem, a9 as mergeProps, aI as visuallyHidden, a0 as useMergedRefs, bc as COMPOSITE_KEYS, c3 as PAGE_UP, c4 as PAGE_DOWN, bR as HOME, bS as END, bY as ARROW_LEFT, bW as ARROW_DOWN, bZ as ARROW_RIGHT, bX as ARROW_UP, c5 as matchesFocusVisible, q as useUILocale, e as cn } from "./index-DM02Iz28.js";
import { a as areArraysEqual } from "./areArraysEqual-Bigu0Aq6.js";
import { f as fieldValidityMapping, a as useFormContext, b as useFieldRootContext, u as useLabelableContext } from "./LabelableContext-DO-1KYYg.js";
import { u as useRegisterFieldControl } from "./useRegisterFieldControl-KuH2MueO.js";
import { g as getDefaultLabelId, r as resolveAriaLabelledBy } from "./resolveAriaLabelledBy-JxsTST5s.js";
import { v as valueToPercent } from "./valueToPercent-B3zKfIMz.js";
import { u as useIsHydrating, P as PrehydrationScript, s as script } from "./PrehydrationScript-DonLZqUI.js";
import { f as formatNumber } from "./formatNumber-_NNc_BMA.js";
import { u as useLabelableId } from "./useLabelableId-aT49TJD-.js";
function asc(a, b) {
  return a - b;
}
function getSliderValue(valueInput, index, min, max, range, values) {
  const clamped = clamp(valueInput, min, max);
  if (!range) {
    return clamped;
  }
  const output = values.slice();
  output[index] = clamp(clamped, values[index - 1] ?? -Infinity, values[index + 1] ?? Infinity);
  return output.sort(asc);
}
function validateMinimumDistance(values, step, minStepsBetweenValues) {
  if (!Array.isArray(values)) {
    return true;
  }
  const minDistance = step * minStepsBetweenValues;
  for (let i = 0; i < values.length - 1; i += 1) {
    if (!(Math.abs(values[i] - values[i + 1]) >= minDistance)) {
      return false;
    }
  }
  return true;
}
const nullMapping = () => null;
const sliderStateAttributesMapping = {
  activeThumbIndex: nullMapping,
  max: nullMapping,
  min: nullMapping,
  minStepsBetweenValues: nullMapping,
  step: nullMapping,
  values: nullMapping,
  ...fieldValidityMapping
};
const SliderRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useSliderRootContext() {
  const context = reactExports.useContext(SliderRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(62));
  }
  return context;
}
function areValuesEqual(newValue, oldValue) {
  return newValue === oldValue || Array.isArray(newValue) && Array.isArray(oldValue) && areArraysEqual(newValue, oldValue);
}
const SliderRoot = /* @__PURE__ */ reactExports.forwardRef(function SliderRoot2(componentProps, forwardedRef) {
  const {
    "aria-labelledby": ariaLabelledByProp,
    className,
    defaultValue,
    disabled: disabledProp = false,
    id: idProp,
    format,
    largeStep = 10,
    locale,
    render,
    max = 100,
    min = 0,
    minStepsBetweenValues = 0,
    form,
    name: nameProp,
    onValueChange: onValueChangeProp,
    onValueCommitted: onValueCommittedProp,
    orientation = "horizontal",
    step = 1,
    thumbCollisionBehavior = "push",
    thumbAlignment = "center",
    value: valueProp,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const defaultLabelId = getDefaultLabelId(id);
  const onValueChange = useStableCallback(onValueChangeProp);
  const onValueCommitted = useStableCallback(onValueCommittedProp);
  const {
    clearErrors
  } = useFormContext();
  const {
    state: fieldState,
    disabled: fieldDisabled,
    name: fieldName,
    setTouched,
    setDirty,
    validityData,
    validation
  } = useFieldRootContext();
  const {
    labelId: fieldLabelId
  } = useLabelableContext();
  const [labelId, setLabelId] = reactExports.useState();
  const ariaLabelledby = ariaLabelledByProp ?? resolveAriaLabelledBy(fieldLabelId, labelId);
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const [valueUnwrapped, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue ?? min,
    name: "Slider"
  });
  const sliderRef = reactExports.useRef(null);
  const controlRef = reactExports.useRef(null);
  const thumbRefs = reactExports.useRef([]);
  const pressedThumbCenterOffsetRef = reactExports.useRef(null);
  const pressedThumbIndexRef = reactExports.useRef(-1);
  const pressedValuesRef = reactExports.useRef(null);
  const lastChangeReasonRef = reactExports.useRef(none);
  const [active, setActiveState] = reactExports.useState(-1);
  const [lastUsedThumbIndex, setLastUsedThumbIndex] = reactExports.useState(-1);
  const [dragging, setDragging] = reactExports.useState(false);
  const [thumbMap, setThumbMap] = reactExports.useState(() => /* @__PURE__ */ new Map());
  const [indicatorPosition, setIndicatorPosition] = reactExports.useState([void 0, void 0]);
  const setActive = useStableCallback((value) => {
    setActiveState(value);
    if (value !== -1) {
      setLastUsedThumbIndex(value);
    }
  });
  const registerFieldControlRef = useStableCallback((element2) => {
    if (element2) {
      controlRef.current = element2;
    }
  });
  const range = Array.isArray(valueUnwrapped);
  const values = reactExports.useMemo(() => {
    if (!range) {
      return [clamp(valueUnwrapped, min, max)];
    }
    return valueUnwrapped.map((value) => clamp(value, min, max)).sort(asc);
  }, [max, min, range, valueUnwrapped]);
  const fieldValue = range ? values : values[0];
  useRegisterFieldControl(validation.inputRef, id, fieldValue, void 0, !disabled, nameProp);
  useValueChanged(fieldValue, () => {
    clearErrors(name);
    validation.change(fieldValue);
    const initialValue = validityData.initialValue;
    let isDirty;
    if (Array.isArray(fieldValue) && Array.isArray(initialValue)) {
      isDirty = !areArraysEqual(fieldValue, initialValue);
    } else {
      isDirty = fieldValue !== initialValue;
    }
    setDirty(isDirty);
  });
  const setValue = useStableCallback((newValue, details) => {
    if (Number.isNaN(newValue) || areValuesEqual(newValue, valueUnwrapped)) {
      return false;
    }
    const nativeEvent = details.event;
    const EventConstructor = nativeEvent.constructor;
    const clonedEvent = new EventConstructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: {
        value: newValue,
        name
      }
    });
    details.event = clonedEvent;
    onValueChange(newValue, details);
    if (details.isCanceled) {
      return false;
    }
    lastChangeReasonRef.current = details.reason;
    setValueUnwrapped(newValue);
    return true;
  });
  const handleInputChange = useStableCallback((valueInput, index, event) => {
    const newValue = getSliderValue(valueInput, index, min, max, range, values);
    if (validateMinimumDistance(newValue, step, minStepsBetweenValues)) {
      const reason = "key" in event ? keyboard : inputChange;
      const applied = setValue(newValue, createChangeEventDetails(reason, event.nativeEvent, void 0, {
        activeThumbIndex: index
      }));
      setTouched(true);
      if (applied) {
        onValueCommitted(newValue, createGenericEventDetails(reason, event.nativeEvent));
      }
    }
  });
  useIsoLayoutEffect(() => {
    if (!disabled) {
      return;
    }
    const activeEl = activeElement(ownerDocument(sliderRef.current));
    if (contains(sliderRef.current, activeEl)) {
      activeEl.blur();
    }
    if (active !== -1) {
      setActive(-1);
    }
  }, [active, disabled, setActive]);
  const state = reactExports.useMemo(() => ({
    ...fieldState,
    activeThumbIndex: active,
    disabled,
    dragging,
    orientation,
    max,
    min,
    minStepsBetweenValues,
    step,
    values
  }), [fieldState, active, disabled, dragging, max, min, minStepsBetweenValues, orientation, step, values]);
  const contextValue = reactExports.useMemo(() => ({
    active,
    controlRef,
    disabled,
    dragging,
    validation,
    format,
    handleInputChange,
    indicatorPosition,
    inset: thumbAlignment !== "center",
    labelId: ariaLabelledby,
    rootLabelId: defaultLabelId,
    largeStep,
    lastUsedThumbIndex,
    lastChangeReasonRef,
    form,
    locale,
    max,
    min,
    minStepsBetweenValues,
    name,
    onValueCommitted,
    orientation,
    pressedThumbCenterOffsetRef,
    pressedThumbIndexRef,
    pressedValuesRef,
    registerFieldControlRef,
    renderBeforeHydration: thumbAlignment === "edge",
    setActive,
    setDragging,
    setIndicatorPosition,
    setLabelId,
    setValue,
    state,
    step,
    thumbCollisionBehavior,
    thumbMap,
    thumbRefs,
    values
  }), [active, ariaLabelledby, defaultLabelId, disabled, dragging, validation, format, handleInputChange, indicatorPosition, largeStep, lastUsedThumbIndex, form, locale, max, min, minStepsBetweenValues, name, onValueCommitted, orientation, registerFieldControlRef, setActive, setValue, state, step, thumbCollisionBehavior, thumbAlignment, thumbMap, values]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, sliderRef],
    props: [{
      "aria-labelledby": ariaLabelledby,
      id,
      role: "group"
    }, elementProps, (props) => validation.getValidationProps(disabled, props)],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SliderRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeList, {
      elementsRef: thumbRefs,
      onMapChange: setThumbMap,
      children: element
    })
  });
});
const SliderValue$1 = /* @__PURE__ */ reactExports.forwardRef(function SliderValue2(componentProps, forwardedRef) {
  const {
    "aria-live": ariaLive = "off",
    render,
    className,
    children,
    style,
    ...elementProps
  } = componentProps;
  const {
    thumbMap,
    state,
    values,
    format,
    locale
  } = useSliderRootContext();
  const outputFor = Array.from(thumbMap.values(), ({
    inputId
  }) => inputId).join(" ").trim() || void 0;
  const formattedValues = reactExports.useMemo(() => values.map((v) => formatNumber(v, locale, format)), [format, locale, values]);
  const defaultDisplayValue = formattedValues.join(" – ");
  const element = useRenderElement("output", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      // off by default because it will keep announcing when the slider is being dragged
      // and also when the value is changing (but not yet committed)
      "aria-live": ariaLive,
      children: typeof children === "function" ? children(formattedValues, values) : defaultDisplayValue,
      htmlFor: outputFor
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
function getMidpoint(element, vertical) {
  const rect = element.getBoundingClientRect();
  return vertical ? (rect.top + rect.bottom) / 2 : (rect.left + rect.right) / 2;
}
function getDecimalPrecision(num) {
  if (num === 0) {
    return 0;
  }
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(Math.max(getDecimalPrecision(step), getDecimalPrecision(min))));
}
function getPushedThumbValues(values, index, nextValue, min, max, step, minStepsBetweenValues, initialValues) {
  const nextValues = values.slice();
  const minValueDifference = step * minStepsBetweenValues;
  const lastIndex = nextValues.length - 1;
  const baseInitialValues = initialValues ?? values;
  const indexMin = min + index * minValueDifference;
  const indexMax = max - (lastIndex - index) * minValueDifference;
  nextValues[index] = clamp(nextValue, indexMin, indexMax);
  for (let i = index + 1; i <= lastIndex; i += 1) {
    const minAllowed = nextValues[i - 1] + minValueDifference;
    const maxAllowed = max - (lastIndex - i) * minValueDifference;
    const initialValue = baseInitialValues[i];
    let candidate = Math.max(nextValues[i], minAllowed);
    if (initialValue < candidate) {
      candidate = Math.max(initialValue, minAllowed);
    }
    nextValues[i] = clamp(candidate, minAllowed, maxAllowed);
  }
  for (let i = index - 1; i >= 0; i -= 1) {
    const maxAllowed = nextValues[i + 1] - minValueDifference;
    const minAllowed = min + i * minValueDifference;
    const initialValue = baseInitialValues[i];
    let candidate = Math.min(nextValues[i], maxAllowed);
    if (initialValue > candidate) {
      candidate = Math.min(initialValue, maxAllowed);
    }
    nextValues[i] = clamp(candidate, minAllowed, maxAllowed);
  }
  for (let i = 0; i <= lastIndex; i += 1) {
    nextValues[i] = Number(nextValues[i].toFixed(12));
  }
  return nextValues;
}
function resolveThumbCollision(behavior, values, currentValues, initialValues, pressedIndex, nextValue, min, max, step, minStepsBetweenValues) {
  const activeValues = currentValues ?? values;
  const baselineValues = initialValues ?? values;
  const range = activeValues.length > 1;
  if (!range) {
    return {
      value: nextValue,
      thumbIndex: 0,
      didSwap: false
    };
  }
  const minValueDifference = step * minStepsBetweenValues;
  if (behavior === "push") {
    return {
      value: getPushedThumbValues(activeValues, pressedIndex, nextValue, min, max, step, minStepsBetweenValues),
      thumbIndex: pressedIndex,
      didSwap: false
    };
  }
  const candidateValues = activeValues.slice();
  const previousNeighbor = candidateValues[pressedIndex - 1];
  const nextNeighbor = candidateValues[pressedIndex + 1];
  const lowerBound = previousNeighbor != null ? previousNeighbor + minValueDifference : min;
  const upperBound = nextNeighbor != null ? nextNeighbor - minValueDifference : max;
  const pressedValueAfterClamp = Number(clamp(nextValue, lowerBound, upperBound).toFixed(12));
  candidateValues[pressedIndex] = pressedValueAfterClamp;
  switch (behavior) {
    case "swap": {
      const pressedInitialValue = activeValues[pressedIndex];
      const epsilon = 1e-7;
      const movingForward = nextValue > pressedInitialValue;
      const movingBackward = nextValue < pressedInitialValue;
      const shouldSwapForward = movingForward && nextNeighbor != null && nextValue >= nextNeighbor - epsilon;
      const shouldSwapBackward = movingBackward && previousNeighbor != null && nextValue <= previousNeighbor + epsilon;
      if (!shouldSwapForward && !shouldSwapBackward) {
        return {
          value: candidateValues,
          thumbIndex: pressedIndex,
          didSwap: false
        };
      }
      const targetIndex = shouldSwapForward ? pressedIndex + 1 : pressedIndex - 1;
      const initialValuesForPush = candidateValues.map((_, index) => {
        if (index === pressedIndex) {
          return pressedValueAfterClamp;
        }
        const baseline = baselineValues[index];
        if (baseline != null) {
          return baseline;
        }
        return activeValues[index];
      });
      let nextValueForTarget = nextValue;
      if (shouldSwapForward) {
        nextValueForTarget = Math.max(nextValue, candidateValues[targetIndex]);
      } else {
        nextValueForTarget = Math.min(nextValue, candidateValues[targetIndex]);
      }
      const adjustedValues = getPushedThumbValues(candidateValues, targetIndex, nextValueForTarget, min, max, step, minStepsBetweenValues, initialValuesForPush);
      const neighborIndex = shouldSwapForward ? targetIndex - 1 : targetIndex + 1;
      const previousValue = adjustedValues[neighborIndex - 1];
      const nextValueAfter = adjustedValues[neighborIndex + 1];
      let neighborLowerBound = previousValue != null ? previousValue + minValueDifference : min;
      neighborLowerBound = Math.max(neighborLowerBound, min + neighborIndex * minValueDifference);
      let neighborUpperBound = nextValueAfter != null ? nextValueAfter - minValueDifference : max;
      neighborUpperBound = Math.min(neighborUpperBound, max - (adjustedValues.length - 1 - neighborIndex) * minValueDifference);
      const restoredValue = clamp(pressedValueAfterClamp, neighborLowerBound, neighborUpperBound);
      adjustedValues[neighborIndex] = Number(restoredValue.toFixed(12));
      return {
        value: adjustedValues,
        thumbIndex: targetIndex,
        didSwap: true
      };
    }
    case "none":
    default: {
      return {
        value: candidateValues,
        thumbIndex: pressedIndex,
        didSwap: false
      };
    }
  }
}
const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
function getControlOffset(styles, vertical) {
  if (!styles) {
    return {
      start: 0,
      end: 0
    };
  }
  function parseSize(value) {
    const parsed = value != null ? parseFloat(value) : 0;
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  const start = !vertical ? "InlineStart" : "Top";
  const end = !vertical ? "InlineEnd" : "Bottom";
  return {
    start: parseSize(styles[`border${start}Width`]) + parseSize(styles[`padding${start}`]),
    end: parseSize(styles[`border${end}Width`]) + parseSize(styles[`padding${end}`])
  };
}
function getFingerCoords(event, touchIdRef) {
  if (touchIdRef.current != null && event.changedTouches) {
    const touchEvent = event;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return null;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
const SliderControl = /* @__PURE__ */ reactExports.forwardRef(function SliderControl2(componentProps, forwardedRef) {
  const {
    render: renderProp,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    disabled,
    dragging,
    inset,
    lastChangeReasonRef,
    max,
    min,
    minStepsBetweenValues,
    onValueCommitted,
    orientation,
    pressedThumbCenterOffsetRef,
    pressedThumbIndexRef,
    pressedValuesRef,
    registerFieldControlRef,
    renderBeforeHydration,
    setActive,
    setDragging,
    setValue,
    state,
    step,
    thumbCollisionBehavior,
    thumbRefs,
    values
  } = useSliderRootContext();
  const direction = useDirection();
  const range = values.length > 1;
  const vertical = orientation === "vertical";
  const controlRef = reactExports.useRef(null);
  const stylesRef = reactExports.useRef(null);
  const setStylesRef = useStableCallback((element2) => {
    if (element2 && stylesRef.current == null) {
      stylesRef.current = getWindow(element2).getComputedStyle(element2);
    }
  });
  const touchIdRef = reactExports.useRef(null);
  const moveCountRef = reactExports.useRef(0);
  const insetThumbOffsetRef = reactExports.useRef(0);
  const currentInteractionValueRef = reactExports.useRef(null);
  const latestValuesRef = useValueAsRef(values);
  function getThumbInput(el) {
    return el?.querySelector('input[type="range"]');
  }
  function updatePressedThumb(nextIndex) {
    pressedThumbIndexRef.current = nextIndex;
    if (!thumbRefs.current[nextIndex]) {
      pressedThumbCenterOffsetRef.current = null;
    }
  }
  function resetPressedThumb() {
    pressedThumbIndexRef.current = -1;
    pressedThumbCenterOffsetRef.current = null;
  }
  function isTargetDisabledThumb(target) {
    if (!isElement(target)) {
      return false;
    }
    return thumbRefs.current.some((thumbEl) => {
      if (!isElement(thumbEl) || !contains(thumbEl, target)) {
        return false;
      }
      return getThumbInput(thumbEl)?.disabled === true;
    });
  }
  function getFingerState(fingerCoords) {
    const control = controlRef.current;
    const thumbIndex = pressedThumbIndexRef.current;
    if (!control || thumbIndex < 0 || thumbIndex >= values.length) {
      if (thumbIndex >= values.length) {
        currentInteractionValueRef.current = null;
      }
      return null;
    }
    const {
      width,
      height,
      bottom,
      left,
      right
    } = control.getBoundingClientRect();
    const controlOffset = getControlOffset(stylesRef.current, vertical);
    const insetThumbOffset = insetThumbOffsetRef.current;
    const controlSize = (vertical ? height : width) - controlOffset.start - controlOffset.end - insetThumbOffset * 2;
    const thumbCenterOffset = pressedThumbCenterOffsetRef.current ?? 0;
    const fingerX = fingerCoords.x - thumbCenterOffset;
    const fingerY = fingerCoords.y - thumbCenterOffset;
    const valueSize = vertical ? bottom - fingerY - controlOffset.end : (direction === "rtl" ? right - fingerX : fingerX - left) - controlOffset.start;
    const valueRescaled = clamp((valueSize - insetThumbOffset) / controlSize, 0, 1);
    let newValue = (max - min) * valueRescaled + min;
    newValue = roundValueToStep(newValue, step, min);
    newValue = clamp(newValue, min, max);
    if (!range) {
      return {
        value: newValue,
        thumbIndex,
        didSwap: false
      };
    }
    return resolveThumbCollision(thumbCollisionBehavior, values, latestValuesRef.current, pressedValuesRef.current, thumbIndex, newValue, min, max, step, minStepsBetweenValues);
  }
  function startPressing(fingerCoords) {
    pressedValuesRef.current = range ? values.slice() : null;
    currentInteractionValueRef.current = null;
    latestValuesRef.current = values;
    const pressedThumbIndex = pressedThumbIndexRef.current;
    let closestThumbIndex = pressedThumbIndex;
    if (pressedThumbIndex > -1 && pressedThumbIndex < values.length) {
      if (values[pressedThumbIndex] === max) {
        let candidateIndex = pressedThumbIndex;
        while (candidateIndex > 0 && values[candidateIndex - 1] === max) {
          candidateIndex -= 1;
        }
        closestThumbIndex = candidateIndex;
      }
    } else {
      const axis = !vertical ? "x" : "y";
      let minDistance;
      closestThumbIndex = -1;
      for (let i = 0; i < thumbRefs.current.length; i += 1) {
        const thumbEl = thumbRefs.current[i];
        if (isElement(thumbEl) && !getThumbInput(thumbEl)?.disabled) {
          const midpoint = getMidpoint(thumbEl, vertical);
          const distance = Math.abs(fingerCoords[axis] - midpoint);
          if (minDistance === void 0 || distance <= minDistance) {
            closestThumbIndex = i;
            minDistance = distance;
          }
        }
      }
    }
    if (closestThumbIndex > -1 && closestThumbIndex !== pressedThumbIndex) {
      updatePressedThumb(closestThumbIndex);
    }
    if (inset) {
      const thumbEl = thumbRefs.current[closestThumbIndex];
      if (isElement(thumbEl)) {
        const thumbRect = thumbEl.getBoundingClientRect();
        const side = !vertical ? "width" : "height";
        insetThumbOffsetRef.current = thumbRect[side] / 2;
      }
    }
  }
  function focusThumb(thumbIndex) {
    const input = getThumbInput(thumbRefs.current?.[thumbIndex]);
    if (!input) {
      return;
    }
    input.focus({
      preventScroll: true,
      // Prevent pointer-driven focus rings in browsers that support this option.
      // Supported in Chrome from 144+.
      focusVisible: false
    });
  }
  function setValueFromPointer(finger, reason, nativeEvent) {
    const applied = setValue(finger.value, createChangeEventDetails(reason, nativeEvent, void 0, {
      activeThumbIndex: finger.thumbIndex
    }));
    if (applied) {
      currentInteractionValueRef.current = finger.value;
      latestValuesRef.current = Array.isArray(finger.value) ? finger.value : [finger.value];
      if (finger.didSwap) {
        updatePressedThumb(finger.thumbIndex);
        focusThumb(finger.thumbIndex);
      }
    }
    return applied;
  }
  const handleTouchMove = useStableCallback((nativeEvent) => {
    const fingerCoords = getFingerCoords(nativeEvent, touchIdRef);
    if (fingerCoords == null) {
      return;
    }
    moveCountRef.current += 1;
    if (nativeEvent.type === "pointermove" && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    const finger = getFingerState(fingerCoords);
    if (finger == null) {
      return;
    }
    if (validateMinimumDistance(finger.value, step, minStepsBetweenValues)) {
      if (!dragging && moveCountRef.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
        setDragging(true);
      }
      setValueFromPointer(finger, drag, nativeEvent);
    }
  });
  const handleTouchEnd = useStableCallback((nativeEvent) => {
    setActive(-1);
    setDragging(false);
    pressedThumbCenterOffsetRef.current = null;
    const interactionValue = currentInteractionValueRef.current;
    if (Array.isArray(interactionValue) && interactionValue.length !== values.length) {
      currentInteractionValueRef.current = null;
    }
    if (currentInteractionValueRef.current != null) {
      const commitReason = lastChangeReasonRef.current;
      onValueCommitted(currentInteractionValueRef.current, createGenericEventDetails(commitReason, nativeEvent));
    }
    if ("pointerType" in nativeEvent && controlRef.current?.hasPointerCapture(nativeEvent.pointerId)) {
      controlRef.current?.releasePointerCapture(nativeEvent.pointerId);
    }
    pressedThumbIndexRef.current = -1;
    touchIdRef.current = null;
    stopListening();
  });
  const handleTouchStart = useStableCallback((nativeEvent) => {
    if (disabled) {
      return;
    }
    if (isTargetDisabledThumb(getTarget(nativeEvent))) {
      resetPressedThumb();
      return;
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch == null) {
      return;
    }
    touchIdRef.current = touch.identifier;
    const fingerCoords = {
      x: touch.clientX,
      y: touch.clientY
    };
    startPressing(fingerCoords);
    const finger = getFingerState(fingerCoords);
    if (finger == null) {
      return;
    }
    focusThumb(finger.thumbIndex);
    setValueFromPointer(finger, trackPress, nativeEvent);
    moveCountRef.current = 0;
    const doc = ownerDocument(controlRef.current);
    doc.addEventListener("touchmove", handleTouchMove, {
      passive: true
    });
    doc.addEventListener("touchend", handleTouchEnd, {
      passive: true
    });
  });
  const stopListening = useStableCallback(() => {
    const doc = ownerDocument(controlRef.current);
    doc.removeEventListener("pointermove", handleTouchMove);
    doc.removeEventListener("pointerup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
    pressedValuesRef.current = null;
    currentInteractionValueRef.current = null;
  });
  const focusFrame = useAnimationFrame();
  reactExports.useEffect(() => {
    const control = controlRef.current;
    if (!control) {
      return () => stopListening();
    }
    const unsubscribeTouchStart = addEventListener(control, "touchstart", handleTouchStart, {
      passive: true
    });
    return () => {
      unsubscribeTouchStart();
      focusFrame.cancel();
      stopListening();
    };
  }, [stopListening, handleTouchStart, controlRef, focusFrame]);
  reactExports.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, registerFieldControlRef, controlRef, setStylesRef],
    props: [{
      ["data-base-ui-slider-control"]: renderBeforeHydration ? "" : void 0,
      onPointerDown(event) {
        const control = controlRef.current;
        const target = getTarget(event.nativeEvent);
        if (!control || disabled || event.defaultPrevented || !isElement(target) || // Only handle left clicks
        event.button !== 0) {
          return;
        }
        if (isTargetDisabledThumb(target)) {
          resetPressedThumb();
          return;
        }
        const fingerCoords = {
          x: event.clientX,
          y: event.clientY
        };
        startPressing(fingerCoords);
        const finger = getFingerState(fingerCoords);
        if (finger == null) {
          return;
        }
        const pressedOnFocusedThumb = contains(thumbRefs.current[finger.thumbIndex], activeElement(ownerDocument(control)));
        if (pressedOnFocusedThumb) {
          event.preventDefault();
        } else {
          focusFrame.request(() => {
            focusThumb(finger.thumbIndex);
          });
        }
        setDragging(true);
        const pressedOnAnyThumb = pressedThumbCenterOffsetRef.current != null;
        if (!pressedOnAnyThumb) {
          setValueFromPointer(finger, trackPress, event.nativeEvent);
        }
        if (event.nativeEvent.pointerId) {
          control.setPointerCapture(event.nativeEvent.pointerId);
        }
        moveCountRef.current = 0;
        const doc = ownerDocument(control);
        doc.addEventListener("pointermove", handleTouchMove, {
          passive: true
        });
        doc.addEventListener("pointerup", handleTouchEnd, {
          once: true
        });
      }
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
const SliderTrack = /* @__PURE__ */ reactExports.forwardRef(function SliderTrack2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    state
  } = useSliderRootContext();
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      style: {
        position: "relative"
      }
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
var _PrehydrationScript;
const ALL_KEYS = /* @__PURE__ */ new Set([...COMPOSITE_KEYS, PAGE_UP, PAGE_DOWN]);
function getDefaultAriaValueText(values, index, format, locale) {
  if (index < 0) {
    return void 0;
  }
  if (values.length === 2) {
    return `${formatNumber(values[index], locale, format)} ${index === 0 ? "start" : "end"} range`;
  }
  return format ? formatNumber(values[index], locale, format) : void 0;
}
function getNewValue(thumbValue, increment, direction, min, max) {
  const value = thumbValue + increment * direction;
  const roundedValue = Number(value.toFixed(Math.max(getDecimalPrecision(thumbValue), getDecimalPrecision(increment), getDecimalPrecision(min))));
  return clamp(roundedValue, min, max);
}
const SliderThumb = /* @__PURE__ */ reactExports.forwardRef(function SliderThumb2(componentProps, forwardedRef) {
  const {
    render,
    children: childrenProp,
    className,
    "aria-describedby": ariaDescribedByProp,
    "aria-label": ariaLabelProp,
    "aria-labelledby": ariaLabelledByProp,
    "aria-valuetext": ariaValueTextProp,
    disabled: disabledProp = false,
    getAriaLabel: getAriaLabelProp,
    getAriaValueText: getAriaValueTextProp,
    id: idProp,
    index: indexProp,
    inputRef: inputRefProp,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    onKeyDown: onKeyDownProp,
    tabIndex: tabIndexProp,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const {
    active: activeIndex,
    lastUsedThumbIndex,
    controlRef,
    disabled: contextDisabled,
    validation,
    format,
    handleInputChange,
    inset,
    labelId,
    largeStep,
    locale,
    max,
    min,
    minStepsBetweenValues,
    form,
    name,
    orientation,
    pressedThumbCenterOffsetRef,
    pressedThumbIndexRef,
    renderBeforeHydration,
    setActive,
    setIndicatorPosition,
    state,
    step,
    thumbRefs,
    values: sliderValues
  } = useSliderRootContext();
  const direction = useDirection();
  const disabled = disabledProp || contextDisabled;
  const range = sliderValues.length > 1;
  const vertical = orientation === "vertical";
  const rtl = direction === "rtl";
  const {
    setTouched,
    setFocused,
    validationMode
  } = useFieldRootContext();
  const thumbRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const restoringFocusVisibleRef = reactExports.useRef(false);
  const handleFocusProp = useStableCallback((event) => {
    if (restoringFocusVisibleRef.current) {
      return;
    }
    onFocusProp?.(event);
  });
  const handleBlurProp = useStableCallback((event) => {
    if (restoringFocusVisibleRef.current) {
      return;
    }
    onBlurProp?.(event);
  });
  const defaultInputId = useBaseUiId();
  const labelableId = useLabelableId();
  const inputId = range ? defaultInputId : labelableId;
  const thumbMetadata = reactExports.useMemo(() => ({
    inputId
  }), [inputId]);
  const {
    ref: listItemRef,
    index: compositeIndex
  } = useCompositeListItem({
    metadata: thumbMetadata
  });
  const index = !range ? 0 : indexProp ?? compositeIndex;
  const last = index === sliderValues.length - 1;
  const thumbValue = sliderValues[index];
  const thumbValuePercent = valueToPercent(thumbValue, min, max);
  const [positionPercent, setPositionPercent] = reactExports.useState();
  const isHydrating = useIsHydrating();
  const safeLastUsedThumbIndex = lastUsedThumbIndex >= 0 && lastUsedThumbIndex < sliderValues.length ? lastUsedThumbIndex : -1;
  const getInsetPosition = useStableCallback(() => {
    const control = controlRef.current;
    const thumb = thumbRef.current;
    if (!control || !thumb) {
      return;
    }
    const thumbRect = thumb.getBoundingClientRect();
    const controlRect = control.getBoundingClientRect();
    const side = vertical ? "height" : "width";
    const controlSize = controlRect[side] - thumbRect[side];
    const thumbOffsetFromControlEdge = thumbRect[side] / 2 + controlSize * thumbValuePercent / 100;
    const nextPositionPercent = thumbOffsetFromControlEdge / controlRect[side] * 100;
    const nextInsetPosition = Number.isFinite(nextPositionPercent) ? nextPositionPercent : void 0;
    setPositionPercent(nextInsetPosition);
    if (index === 0) {
      setIndicatorPosition((prevPosition) => [nextInsetPosition, prevPosition[1]]);
    } else if (last) {
      setIndicatorPosition((prevPosition) => [prevPosition[0], nextInsetPosition]);
    }
  });
  useIsoLayoutEffect(() => {
    if (inset) {
      queueMicrotask(getInsetPosition);
    }
  }, [getInsetPosition, inset]);
  useIsoLayoutEffect(() => {
    if (inset) {
      getInsetPosition();
    }
  }, [getInsetPosition, inset, thumbValuePercent]);
  useIsoLayoutEffect(() => {
    if (!inset) {
      return void 0;
    }
    const control = controlRef.current;
    const thumb = thumbRef.current;
    if (!control || !thumb) {
      return void 0;
    }
    const ResizeObserverCtor = getWindow(control).ResizeObserver;
    if (typeof ResizeObserverCtor !== "function") {
      return void 0;
    }
    const resizeObserver = new ResizeObserverCtor(getInsetPosition);
    resizeObserver.observe(control);
    resizeObserver.observe(thumb);
    return () => {
      resizeObserver.disconnect();
    };
  }, [controlRef, getInsetPosition, inset]);
  const startEdge = vertical ? "bottom" : "insetInlineStart";
  const crossOffsetProperty = vertical ? "left" : "top";
  let zIndex;
  if (range) {
    if (activeIndex === index) {
      zIndex = 2;
    } else if (safeLastUsedThumbIndex === index) {
      zIndex = 1;
    }
  } else if (activeIndex === index) {
    zIndex = 1;
  }
  let thumbStyle;
  if (!inset && !Number.isFinite(thumbValuePercent)) {
    thumbStyle = visuallyHidden;
  } else {
    thumbStyle = {
      position: "absolute",
      [startEdge]: inset ? "var(--position)" : `${thumbValuePercent}%`,
      [crossOffsetProperty]: "50%",
      translate: `${(vertical || !rtl ? -1 : 1) * 50}% ${(vertical ? 1 : -1) * 50}%`,
      zIndex,
      ...inset && {
        ["--position"]: `${positionPercent ?? 0}%`,
        visibility: renderBeforeHydration && isHydrating || positionPercent === void 0 ? "hidden" : void 0
      }
    };
  }
  let cssWritingMode;
  if (vertical) {
    cssWritingMode = rtl ? "vertical-rl" : "vertical-lr";
  }
  const ariaLabel = typeof getAriaLabelProp === "function" ? getAriaLabelProp(index) : ariaLabelProp;
  const inputProps = mergeProps({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledByProp ?? (ariaLabel == null ? labelId : void 0),
    "aria-describedby": ariaDescribedByProp,
    "aria-orientation": orientation,
    "aria-valuenow": thumbValue,
    "aria-valuetext": typeof getAriaValueTextProp === "function" ? getAriaValueTextProp(formatNumber(thumbValue, locale, format), thumbValue, index) : ariaValueTextProp ?? getDefaultAriaValueText(sliderValues, index, format, locale),
    disabled,
    form,
    id: inputId,
    max,
    min,
    name,
    onChange(event) {
      handleInputChange(event.currentTarget.valueAsNumber, index, event);
    },
    onFocus(event) {
      const isRestoringFocusVisible = restoringFocusVisibleRef.current;
      restoringFocusVisibleRef.current = false;
      setActive(index);
      setFocused(true);
      if (isRestoringFocusVisible) {
        event.stopPropagation();
      }
    },
    onBlur(event) {
      if (restoringFocusVisibleRef.current) {
        event.stopPropagation();
        return;
      }
      setActive(-1);
      if (thumbRefs.current.some((thumb) => contains(thumb, event.relatedTarget))) {
        return;
      }
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(getSliderValue(thumbValue, index, min, max, range, sliderValues));
      }
    },
    onKeyDown(event) {
      if (event.defaultPrevented) {
        return;
      }
      if (!ALL_KEYS.has(event.key)) {
        return;
      }
      if (COMPOSITE_KEYS.has(event.key)) {
        event.stopPropagation();
      }
      let newValue = null;
      let direction2 = 0;
      let increment = event.shiftKey ? largeStep : step;
      const roundedValue = roundValueToStep(thumbValue, step, min);
      switch (event.key) {
        case ARROW_UP:
          direction2 = 1;
          break;
        case ARROW_RIGHT:
          direction2 = rtl ? -1 : 1;
          break;
        case ARROW_DOWN:
          direction2 = -1;
          break;
        case ARROW_LEFT:
          direction2 = rtl ? 1 : -1;
          break;
        case PAGE_UP:
          increment = largeStep;
          direction2 = 1;
          break;
        case PAGE_DOWN:
          increment = largeStep;
          direction2 = -1;
          break;
        case END:
          newValue = range && Number.isFinite(sliderValues[index + 1]) ? sliderValues[index + 1] - step * minStepsBetweenValues : max;
          break;
        case HOME:
          newValue = range && Number.isFinite(sliderValues[index - 1]) ? sliderValues[index - 1] + step * minStepsBetweenValues : min;
          break;
      }
      if (direction2 !== 0) {
        newValue = getNewValue(roundedValue, increment, direction2, min, max);
      }
      if (newValue !== null) {
        const input = event.currentTarget;
        if (!matchesFocusVisible(input)) {
          restoringFocusVisibleRef.current = true;
          input.blur();
          input.focus({
            preventScroll: true,
            // Show `:focus-visible` after keyboard interaction, even if the
            // thumb was previously focused by a pointer.
            focusVisible: true
          });
        }
        handleInputChange(newValue, index, event);
        event.preventDefault();
      }
    },
    step,
    style: {
      ...visuallyHidden,
      // So that VoiceOver's focus indicator matches the thumb's dimensions
      width: "100%",
      height: "100%",
      writingMode: cssWritingMode
    },
    tabIndex: tabIndexProp,
    type: "range",
    value: thumbValue ?? ""
  }, (props) => validation.getValidationProps(disabled, props), {
    onFocus: handleFocusProp,
    onBlur: handleBlurProp,
    onKeyDown: onKeyDownProp
  });
  const mergedInputRef = useMergedRefs(inputRef, validation.inputRef, inputRefProp);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, listItemRef, thumbRef],
    props: [{
      ["data-index"]: index,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
        children: [childrenProp, /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          ref: mergedInputRef,
          ...inputProps,
          suppressHydrationWarning: true
        }), inset && last && renderBeforeHydration && (_PrehydrationScript || (_PrehydrationScript = /* @__PURE__ */ jsxRuntimeExports.jsx(PrehydrationScript, {
          script
        })))]
      }),
      id,
      onPointerDown(event) {
        if (disabled) {
          return;
        }
        pressedThumbIndexRef.current = index;
        const midpoint = getMidpoint(event.currentTarget, vertical);
        pressedThumbCenterOffsetRef.current = (vertical ? event.clientY : event.clientX) - midpoint;
      },
      style: thumbStyle,
      suppressHydrationWarning: renderBeforeHydration || void 0
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
function getIndicatorStyles(vertical, range, inset, start, end, forceHidden) {
  const styles = {
    visibility: forceHidden || inset && (start === void 0 || range && end === void 0) ? "hidden" : void 0,
    position: vertical ? "absolute" : "relative",
    [vertical ? "width" : "height"]: "inherit"
  };
  let startValue = `${start ?? 0}%`;
  let sizeValue = `${(end ?? 0) - (start ?? 0)}%`;
  if (inset) {
    styles["--start-position"] = startValue;
    startValue = "var(--start-position)";
    if (range) {
      styles["--relative-size"] = sizeValue;
      sizeValue = "var(--relative-size)";
    }
  }
  styles[vertical ? "bottom" : "insetInlineStart"] = range ? startValue : 0;
  styles[vertical ? "height" : "width"] = range ? sizeValue : startValue;
  return styles;
}
const SliderIndicator = /* @__PURE__ */ reactExports.forwardRef(function SliderIndicator2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style: styleProp,
    ...elementProps
  } = componentProps;
  const {
    indicatorPosition,
    inset,
    max,
    min,
    orientation,
    renderBeforeHydration,
    state,
    values
  } = useSliderRootContext();
  const isHydrating = useIsHydrating();
  const vertical = orientation === "vertical";
  const range = values.length > 1;
  const style = getIndicatorStyles(vertical, range, inset, inset ? indicatorPosition[0] : valueToPercent(values[0], min, max), inset ? indicatorPosition[1] : valueToPercent(values[values.length - 1], min, max), inset && renderBeforeHydration && isHydrating);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      ["data-base-ui-slider-indicator"]: renderBeforeHydration ? "" : void 0,
      style,
      suppressHydrationWarning: renderBeforeHydration || void 0
    }, elementProps],
    stateAttributesMapping: sliderStateAttributesMapping
  });
  return element;
});
function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  getAriaLabel,
  getAriaValueText,
  locale,
  ...props
}) {
  const { code } = useUILocale();
  const _values = reactExports.useMemo(() => {
    if (value !== void 0) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== void 0) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min];
  }, [value, defaultValue, min]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SliderRoot,
    {
      className: cn("data-[orientation=horizontal]:w-full", className),
      defaultValue,
      locale: locale ?? code,
      max,
      min,
      thumbAlignment: "edge",
      value,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SliderControl,
          {
            className: "relative flex touch-none select-none before:absolute data-[orientation=horizontal]:before:inset-x-0 data-[orientation=horizontal]:before:-inset-y-2 data-[orientation=vertical]:before:inset-y-0 data-[orientation=vertical]:before:-inset-x-2 pointer-coarse:data-[orientation=horizontal]:before:-inset-y-5 pointer-coarse:data-[orientation=vertical]:before:-inset-x-5 data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64",
            "data-slot": "slider-control",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              SliderTrack,
              {
                className: "relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5",
                "data-slot": "slider-track",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SliderIndicator,
                    {
                      className: "select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5",
                      "data-slot": "slider-indicator"
                    }
                  ),
                  Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SliderThumb,
                    {
                      className: "block size-5 shrink-0 select-none rounded-full border border-input bg-white not-dark:bg-clip-padding shadow-xs/5 outline-none transition-[box-shadow,scale] before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 data-dragging:scale-120 sm:size-4 dark:border-background dark:has-focus-visible:ring-ring/48 [:has(*:focus-visible),[data-dragging]]:shadow-none",
                      "data-slot": "slider-thumb",
                      getAriaLabel: getAriaLabel ?? null,
                      getAriaValueText: getAriaValueText ?? (_values.length > 1 ? (formatted) => formatted : null),
                      index
                    },
                    String(index)
                  ))
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function SliderValue({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SliderValue$1,
    {
      className: cn("flex justify-end text-sm", className),
      "data-slot": "slider-value",
      ...props
    }
  );
}
export {
  Slider as S,
  SliderValue as a
};
