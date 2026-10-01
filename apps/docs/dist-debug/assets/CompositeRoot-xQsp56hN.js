import { r as reactExports, a0 as useMergedRefs, X as useStableCallback, bO as scrollIntoViewIfNeeded, bP as isListIndexDisabled, bQ as findNonDisabledListIndex, bu as isIndexOutOfListBounds, a3 as useIsoLayoutEffect, bR as HOME, bS as END, bc as COMPOSITE_KEYS, am as getTarget, bT as isNativeInput, bU as getMinListIndex, bV as getMaxListIndex, bW as ARROW_DOWN, bX as ARROW_UP, bY as ARROW_LEFT, bZ as ARROW_RIGHT, b_ as MODIFIER_KEYS, ap as EMPTY_ARRAY$1, aG as EMPTY_OBJECT, aZ as useDirection, Y as useRenderElement, j as jsxRuntimeExports, b$ as CompositeRootContext, Z as CompositeList } from "./index-DM02Iz28.js";
import { i as isElementDisabled } from "./isElementDisabled-2KG8-O4B.js";
const ACTIVE_COMPOSITE_ITEM = "data-composite-item-active";
const EMPTY_ARRAY = [];
function useCompositeRoot(params) {
  const {
    loopFocus = true,
    orientation = "both",
    grid,
    onLoop,
    direction,
    highlightedIndex: externalHighlightedIndex,
    onHighlightedIndexChange: externalSetHighlightedIndex,
    rootRef: externalRef,
    enableHomeAndEndKeys = false,
    stopEventPropagation,
    disabledIndices,
    modifierKeys = EMPTY_ARRAY
  } = params;
  const [internalHighlightedIndex, internalSetHighlightedIndex] = reactExports.useState(0);
  const isGrid = grid != null;
  const rootRef = reactExports.useRef(null);
  const mergedRef = useMergedRefs(rootRef, externalRef);
  const elementsRef = reactExports.useRef([]);
  const hasSetDefaultIndexRef = reactExports.useRef(false);
  const highlightedIndex = externalHighlightedIndex ?? internalHighlightedIndex;
  const onHighlightedIndexChange = useStableCallback((index, shouldScrollIntoView = false) => {
    (externalSetHighlightedIndex ?? internalSetHighlightedIndex)(index);
    if (shouldScrollIntoView) {
      const newActiveItem = elementsRef.current[index];
      scrollIntoViewIfNeeded(rootRef.current, newActiveItem, direction, orientation);
    }
  });
  const onMapChange = useStableCallback((map) => {
    if (map.size === 0 || hasSetDefaultIndexRef.current) {
      return;
    }
    hasSetDefaultIndexRef.current = true;
    const sortedElements = Array.from(map.keys());
    const activeItem = sortedElements.find((compositeElement) => compositeElement?.hasAttribute(ACTIVE_COMPOSITE_ITEM)) ?? null;
    const activeIndex = activeItem ? map.get(activeItem)?.index ?? -1 : -1;
    if (activeIndex !== -1) {
      onHighlightedIndexChange(activeIndex);
    } else if (isListIndexDisabled(sortedElements, highlightedIndex, disabledIndices)) {
      const firstEnabledIndex = findNonDisabledListIndex(sortedElements, {
        disabledIndices
      });
      if (!isIndexOutOfListBounds(sortedElements, firstEnabledIndex)) {
        onHighlightedIndexChange(firstEnabledIndex);
      }
    }
    scrollIntoViewIfNeeded(rootRef.current, activeItem, direction, orientation);
  });
  useIsoLayoutEffect(() => {
    if (disabledIndices == null || externalHighlightedIndex != null || !hasSetDefaultIndexRef.current) {
      return;
    }
    const elements = elementsRef.current;
    if (isListIndexDisabled(elements, highlightedIndex, disabledIndices)) {
      const firstEnabledIndex = findNonDisabledListIndex(elements, {
        disabledIndices
      });
      if (!isIndexOutOfListBounds(elements, firstEnabledIndex)) {
        onHighlightedIndexChange(firstEnabledIndex);
      }
    }
  }, [disabledIndices, externalHighlightedIndex, highlightedIndex, elementsRef, onHighlightedIndexChange]);
  const wrappedOnLoop = useStableCallback((event, prevIndex, nextIndex) => {
    if (!onLoop) {
      return nextIndex;
    }
    return onLoop(event, prevIndex, nextIndex, elementsRef);
  });
  const onKeyDown = useStableCallback((event) => {
    const isHomeOrEnd = event.key === HOME || event.key === END;
    if (!COMPOSITE_KEYS.has(event.key) || !enableHomeAndEndKeys && isHomeOrEnd) {
      return;
    }
    if (isModifierKeySet(event, modifierKeys)) {
      return;
    }
    const element = rootRef.current;
    if (!element) {
      return;
    }
    const isRtl = direction === "rtl";
    const horizontalForwardKey = isRtl ? ARROW_LEFT : ARROW_RIGHT;
    const horizontalBackwardKey = isRtl ? ARROW_RIGHT : ARROW_LEFT;
    const forwardKey = orientation === "vertical" ? ARROW_DOWN : horizontalForwardKey;
    const backwardKey = orientation === "vertical" ? ARROW_UP : horizontalBackwardKey;
    const target = getTarget(event.nativeEvent);
    if (target != null && isNativeInput(target) && !isElementDisabled(target)) {
      const selectionStart = target.selectionStart;
      const selectionEnd = target.selectionEnd;
      const textContent = target.value;
      if (selectionStart == null || event.shiftKey || selectionStart !== selectionEnd) {
        return;
      }
      if (event.key !== backwardKey && selectionStart < textContent.length) {
        return;
      }
      if (event.key !== forwardKey && selectionStart > 0) {
        return;
      }
    }
    let nextIndex = highlightedIndex;
    const minIndex = getMinListIndex(elementsRef, disabledIndices);
    const maxIndex = getMaxListIndex(elementsRef, disabledIndices);
    if (grid != null) {
      nextIndex = grid({
        disabledIndices,
        elementsRef,
        event,
        highlightedIndex,
        loopFocus,
        maxIndex,
        minIndex,
        onLoop: wrappedOnLoop,
        orientation,
        rtl: isRtl
      });
    }
    const isForwardKey = orientation !== "vertical" && event.key === horizontalForwardKey || orientation !== "horizontal" && event.key === ARROW_DOWN;
    const isBackwardKey = orientation !== "vertical" && event.key === horizontalBackwardKey || orientation !== "horizontal" && event.key === ARROW_UP;
    if (enableHomeAndEndKeys) {
      if (event.key === HOME) {
        nextIndex = minIndex;
      } else if (event.key === END) {
        nextIndex = maxIndex;
      }
    }
    if (nextIndex === highlightedIndex && (isForwardKey || isBackwardKey)) {
      if (loopFocus && nextIndex === maxIndex && isForwardKey) {
        nextIndex = minIndex;
        if (onLoop) {
          nextIndex = onLoop(event, highlightedIndex, nextIndex, elementsRef);
        }
      } else if (loopFocus && nextIndex === minIndex && isBackwardKey) {
        nextIndex = maxIndex;
        if (onLoop) {
          nextIndex = onLoop(event, highlightedIndex, nextIndex, elementsRef);
        }
      } else {
        nextIndex = findNonDisabledListIndex(elementsRef.current, {
          startingIndex: nextIndex,
          decrement: isBackwardKey,
          disabledIndices
        });
      }
    }
    if (nextIndex !== highlightedIndex && !isIndexOutOfListBounds(elementsRef.current, nextIndex)) {
      if (stopEventPropagation) {
        event.stopPropagation();
      }
      if (isGrid || isHomeOrEnd || isForwardKey || isBackwardKey) {
        event.preventDefault();
      }
      onHighlightedIndexChange(nextIndex, true);
      queueMicrotask(() => {
        elementsRef.current[nextIndex]?.focus();
      });
    }
  });
  const props = {
    ref: mergedRef,
    onFocus(event) {
      const element = rootRef.current;
      const target = getTarget(event.nativeEvent);
      if (!element || target == null || !isNativeInput(target)) {
        return;
      }
      target.setSelectionRange(0, target.value.length);
    },
    onKeyDown
  };
  return {
    props,
    highlightedIndex,
    onHighlightedIndexChange,
    elementsRef,
    onMapChange,
    relayKeyboardEvent: onKeyDown
  };
}
function isModifierKeySet(event, ignoredModifierKeys) {
  for (const key of MODIFIER_KEYS) {
    if (ignoredModifierKeys.includes(key)) {
      continue;
    }
    if (event.getModifierState(key)) {
      return true;
    }
  }
  return false;
}
function CompositeRoot(componentProps) {
  const {
    render,
    className,
    style,
    refs = EMPTY_ARRAY$1,
    props = EMPTY_ARRAY$1,
    state = EMPTY_OBJECT,
    stateAttributesMapping,
    highlightedIndex: highlightedIndexProp,
    onHighlightedIndexChange: onHighlightedIndexChangeProp,
    orientation,
    grid,
    loopFocus,
    onLoop,
    enableHomeAndEndKeys,
    onMapChange: onMapChangeProp,
    stopEventPropagation = true,
    rootRef,
    disabledIndices,
    modifierKeys,
    highlightItemOnHover = false,
    tag = "div",
    ...elementProps
  } = componentProps;
  const direction = useDirection();
  const {
    props: defaultProps,
    highlightedIndex,
    onHighlightedIndexChange,
    elementsRef,
    onMapChange: onMapChangeUnwrapped,
    relayKeyboardEvent
  } = useCompositeRoot({
    grid,
    loopFocus,
    onLoop,
    orientation,
    highlightedIndex: highlightedIndexProp,
    onHighlightedIndexChange: onHighlightedIndexChangeProp,
    rootRef,
    stopEventPropagation,
    enableHomeAndEndKeys,
    direction,
    disabledIndices,
    modifierKeys
  });
  const element = useRenderElement(tag, componentProps, {
    state,
    ref: refs,
    props: [defaultProps, ...props, elementProps],
    stateAttributesMapping
  });
  const contextValue = reactExports.useMemo(() => ({
    highlightedIndex,
    onHighlightedIndexChange,
    highlightItemOnHover,
    relayKeyboardEvent
  }), [highlightedIndex, onHighlightedIndexChange, highlightItemOnHover, relayKeyboardEvent]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeList, {
      elementsRef,
      onMapChange: (newMap) => {
        onMapChangeProp?.(newMap);
        onMapChangeUnwrapped(newMap);
      },
      children: element
    })
  });
}
export {
  ACTIVE_COMPOSITE_ITEM as A,
  CompositeRoot as C
};
