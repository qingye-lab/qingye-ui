import { c as createLucideIcon, r as reactExports, V as formatErrorMessage, W as useControlled, ap as EMPTY_ARRAY, ac as useTransitionStatus, aq as useOpenInteractionType, al as useRefWithInit, ar as ReactStore, as as useStore, at as usePreviousValue, au as useValueAsRef, X as useStableCallback, a3 as useIsoLayoutEffect, av as useValueChanged, aw as focusOut, ax as outsidePress, ad as useOpenChangeComplete, ay as getMaxScrollOffset, az as normalizeScrollOffset, aA as useFloatingRootContext, aB as useClick, aC as useDismiss, aD as useListNavigation, aE as useTypeahead, a9 as mergeProps, aF as FOCUSABLE_POPUP_PROPS, aG as EMPTY_OBJECT, a0 as useMergedRefs, j as jsxRuntimeExports, aH as visuallyHiddenInput, aI as visuallyHidden, aJ as createChangeEventDetails, aK as none, a2 as useButton, ae as useTimeout, aL as getFloatingFocusElement, Y as useRenderElement, aM as pressableTriggerOpenStateMapping, an as ownerDocument, aN as contains, aO as isMouseWithinBounds, aP as cancelOpen, aQ as triggerOpenStateMapping, aR as FloatingPortal, aS as DROPDOWN_COLLISION_AVOIDANCE, aT as useAnchoredPopupScrollLock, aU as useAnchorPositioning, aV as usePositioner, Z as CompositeList, aW as InternalBackdrop, aX as inertValue, aY as useToolbarRootContext, aZ as useDirection, a_ as useCSPContext, a$ as useAnimationFrame, b0 as getWindow, b1 as SCROLL_EDGE_TOLERANCE_PX, b2 as clamp, b3 as webkit, b4 as addEventListener, b5 as styleDisableScrollbar, b6 as FloatingFocusManager, b7 as platform, b8 as rectToClientRect, b9 as windowResize, _ as transitionStatusMapping, ba as popupStateMapping, bb as getDisabledMountTransitionStyles, bc as COMPOSITE_KEYS, $ as useCompositeListItem, bd as isVirtualClick, be as itemPress, a1 as useBaseUiId, e as cn, C as Check, a7 as cva } from "./index-DM02Iz28.js";
import { C as ChevronsUpDown } from "./chevrons-up-down-BLzcfRd-.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
import { c as compareItemEquality, h as hasNullItemLabel, s as stringifyAsValue, d as defaultItemEquality, f as findItemIndex, u as useOnFirstRender, a as stringifyAsLabel, r as resolveMultipleLabels, b as resolveSelectedLabel, e as removeItem, L as ListboxSeparator } from "./ListboxSeparator-DfAtCXVV.js";
import { i as isElementDisabled } from "./isElementDisabled-2KG8-O4B.js";
import { a as useFormContext, b as useFieldRootContext, u as useLabelableContext, f as fieldValidityMapping } from "./LabelableContext-DO-1KYYg.js";
import { u as useRegisterFieldControl } from "./useRegisterFieldControl-KuH2MueO.js";
import { u as useLabelableId } from "./useLabelableId-aT49TJD-.js";
import { a as areArraysEqual } from "./areArraysEqual-Bigu0Aq6.js";
import { r as resolveAriaLabelledBy } from "./resolveAriaLabelledBy-JxsTST5s.js";
const __iconNode = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode);
const SelectRootContext = /* @__PURE__ */ reactExports.createContext(null);
function useSelectRootContext() {
  const context = reactExports.useContext(SelectRootContext);
  if (context === null) {
    throw new Error(formatErrorMessage(60));
  }
  return context;
}
const selectors = {
  id: (state) => state.id,
  labelId: (state) => state.labelId,
  modal: (state) => state.modal,
  items: (state) => state.items,
  itemToStringLabel: (state) => state.itemToStringLabel,
  isItemEqualToValue: (state) => state.isItemEqualToValue,
  value: (state) => state.value,
  hasSelectedValue: (state) => {
    const {
      value,
      multiple,
      itemToStringValue
    } = state;
    if (value == null) {
      return false;
    }
    if (multiple && Array.isArray(value)) {
      return value.length > 0;
    }
    return stringifyAsValue(value, itemToStringValue) !== "";
  },
  hasNullItemLabel: (state, enabled) => {
    return enabled ? hasNullItemLabel(state.items) : false;
  },
  open: (state) => state.open,
  mounted: (state) => state.mounted,
  forceMount: (state) => state.forceMount,
  transitionStatus: (state) => state.transitionStatus,
  openMethod: (state) => state.openMethod,
  activeIndex: (state) => state.activeIndex,
  selectedIndex: (state) => state.selectedIndex,
  isActive: (state, index) => state.activeIndex === index,
  isSelected: (state, itemValue) => {
    const comparer = state.isItemEqualToValue;
    const storeValue = state.value;
    if (state.multiple) {
      return Array.isArray(storeValue) && storeValue.some((selectedItem) => compareItemEquality(itemValue, selectedItem, comparer));
    }
    return compareItemEquality(itemValue, storeValue, comparer);
  },
  isSelectedByFocus: (state, index) => {
    return state.selectedIndex === index;
  },
  popupProps: (state) => state.popupProps,
  triggerProps: (state) => state.triggerProps,
  triggerElement: (state) => state.triggerElement,
  positionerElement: (state) => state.positionerElement,
  listElement: (state) => state.listElement,
  popupSide: (state) => state.popupSide,
  scrollUpArrowVisible: (state) => state.scrollUpArrowVisible,
  scrollDownArrowVisible: (state) => state.scrollDownArrowVisible,
  hasScrollArrows: (state) => state.hasScrollArrows
};
function SelectRoot(props) {
  const {
    id,
    value: valueProp,
    defaultValue = null,
    onValueChange,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    name: nameProp,
    form,
    autoComplete,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    modal = true,
    actionsRef,
    inputRef,
    onOpenChangeComplete,
    items,
    multiple = false,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue = defaultItemEquality,
    highlightItemOnHover = true,
    children
  } = props;
  const {
    clearErrors
  } = useFormContext();
  const {
    setDirty,
    setTouched,
    setFocused,
    validityData,
    setFilled,
    name: fieldName,
    disabled: fieldDisabled,
    validation,
    validationMode
  } = useFieldRootContext();
  const generatedId = useLabelableId({
    id
  });
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: multiple ? defaultValue ?? EMPTY_ARRAY : defaultValue,
    name: "Select",
    state: "value"
  });
  const [open, setOpenUnwrapped] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: "Select",
    state: "open"
  });
  const listRef = reactExports.useRef([]);
  const labelsRef = reactExports.useRef([]);
  const popupRef = reactExports.useRef(null);
  const scrollHandlerRef = reactExports.useRef(null);
  const scrollArrowsMountedCountRef = reactExports.useRef(0);
  const valueRef = reactExports.useRef(null);
  const valuesRef = reactExports.useRef([]);
  const typingRef = reactExports.useRef(false);
  const firstItemTextRef = reactExports.useRef(null);
  const selectedItemTextRef = reactExports.useRef(null);
  const selectionRef = reactExports.useRef({
    allowSelectedMouseUp: false,
    allowUnselectedMouseUp: false,
    dragY: 0
  });
  const alignItemWithTriggerActiveRef = reactExports.useRef(false);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  const {
    openMethod,
    triggerProps: interactionTypeProps
  } = useOpenInteractionType(open);
  const store = useRefWithInit(() => new ReactStore({
    id: generatedId,
    labelId: void 0,
    modal,
    multiple,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue,
    value,
    open,
    mounted,
    transitionStatus,
    items,
    forceMount: false,
    openMethod: null,
    activeIndex: null,
    selectedIndex: null,
    popupProps: {},
    triggerProps: {},
    triggerElement: null,
    positionerElement: null,
    listElement: null,
    popupSide: null,
    scrollUpArrowVisible: false,
    scrollDownArrowVisible: false,
    hasScrollArrows: false
  })).current;
  const activeIndex = useStore(store, selectors.activeIndex);
  const selectedIndex = useStore(store, selectors.selectedIndex);
  const triggerElement = useStore(store, selectors.triggerElement);
  const positionerElement = useStore(store, selectors.positionerElement);
  const previousOpenMethod = usePreviousValue(openMethod);
  const renderedOpenMethod = openMethod ?? previousOpenMethod;
  const serializedValue = reactExports.useMemo(() => {
    if (multiple) {
      return "";
    }
    return stringifyAsValue(value, itemToStringValue);
  }, [multiple, value, itemToStringValue]);
  const fieldStringValue = reactExports.useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return value.map((currentValue) => stringifyAsValue(currentValue, itemToStringValue));
    }
    return stringifyAsValue(value, itemToStringValue);
  }, [multiple, value, itemToStringValue]);
  const controlRef = useValueAsRef(triggerElement);
  const getStringifiedValueForForm = useStableCallback(() => fieldStringValue);
  useRegisterFieldControl(controlRef, generatedId, value, getStringifiedValueForForm, !disabled, nameProp);
  const initialValueRef = reactExports.useRef(value);
  const hasSelectedValue = multiple ? Array.isArray(value) && value.length > 0 : value != null && serializedValue !== "";
  useIsoLayoutEffect(() => {
    setFilled(hasSelectedValue);
  }, [hasSelectedValue, setFilled]);
  useIsoLayoutEffect(function syncSelectedIndex() {
    let target = value;
    let empty = false;
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      empty = currentValue.length === 0;
      target = currentValue[currentValue.length - 1];
    }
    const index = empty ? -1 : findItemIndex(valuesRef.current, target, isItemEqualToValue);
    const nextIndex = index === -1 ? null : index;
    if (nextIndex === null) {
      selectedItemTextRef.current = null;
    }
    if (open) {
      return;
    }
    store.set("selectedIndex", nextIndex);
  }, [multiple, open, value, isItemEqualToValue, store]);
  function isSelectedValueDirty(currentValue) {
    const initialValue = validityData.initialValue;
    if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
      return !areArraysEqual(currentValue, initialValue, (itemValue, initialItemValue) => compareItemEquality(itemValue, initialItemValue, isItemEqualToValue));
    }
    return currentValue !== initialValue;
  }
  useValueChanged(value, () => {
    clearErrors(name);
    setDirty(isSelectedValueDirty(value));
    validation.change(value);
  });
  const setOpen = useStableCallback((nextOpen, eventDetails) => {
    onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setOpenUnwrapped(nextOpen);
    if (!nextOpen && (eventDetails.reason === focusOut || eventDetails.reason === outsidePress)) {
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(value);
      }
    }
  });
  const handleUnmount = useStableCallback(() => {
    setMounted(false);
    store.update({
      activeIndex: null,
      openMethod: null,
      scrollUpArrowVisible: false,
      scrollDownArrowVisible: false
    });
    onOpenChangeComplete?.(false);
  });
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  reactExports.useImperativeHandle(actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  const setValue = useStableCallback((nextValue, eventDetails) => {
    onValueChange?.(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(nextValue);
  });
  const handleScrollArrowVisibility = useStableCallback((scroller) => {
    const maxScrollTop = getMaxScrollOffset(scroller.scrollHeight, scroller.clientHeight);
    const scrollTop = normalizeScrollOffset(scroller.scrollTop, maxScrollTop);
    const shouldShowUp = scrollTop > 0;
    const shouldShowDown = scrollTop < maxScrollTop;
    store.set("scrollUpArrowVisible", shouldShowUp);
    store.set("scrollDownArrowVisible", shouldShowDown);
  });
  const floatingContext = useFloatingRootContext({
    open,
    onOpenChange: setOpen,
    elements: {
      reference: triggerElement,
      floating: positionerElement
    }
  });
  const click = useClick(floatingContext, {
    enabled: !readOnly && !disabled,
    event: "mousedown"
  });
  const dismiss = useDismiss(floatingContext);
  const listNavigation = useListNavigation(floatingContext, {
    enabled: !readOnly && !disabled,
    listRef,
    activeIndex,
    selectedIndex,
    disabledIndices: EMPTY_ARRAY,
    onNavigate(nextActiveIndex) {
      if (nextActiveIndex === null && !open) {
        return;
      }
      store.set("activeIndex", nextActiveIndex);
    },
    focusItemOnHover: highlightItemOnHover
  });
  const typeahead = useTypeahead(floatingContext, {
    enabled: !readOnly && !disabled && (open || !multiple),
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    // Skip disabled items while matching so typeahead advances to the next selectable item
    // (a click can never select a disabled item and native `<select>` skips them too). Resolve
    // the disabled state from the element via the attribute-only `isElementDisabled` so the
    // hidden, force-mounted items used for closed-trigger typeahead aren't dropped by the
    // `elementsRef`/visibility filter that `disabledIndices` deliberately sidesteps.
    disabledIndices: (index) => isElementDisabled(listRef.current[index]),
    onMatch(index) {
      if (open) {
        store.set("activeIndex", index);
      } else {
        setValue(valuesRef.current[index], createChangeEventDetails(none));
      }
    },
    onTyping(typing) {
      typingRef.current = typing;
    }
  });
  const mergedTriggerProps = reactExports.useMemo(() => mergeProps(typeahead.reference, listNavigation.reference, dismiss.reference, click.reference, interactionTypeProps), [click.reference, typeahead.reference, listNavigation.reference, dismiss.reference, interactionTypeProps]);
  const popupProps = reactExports.useMemo(() => mergeProps(FOCUSABLE_POPUP_PROPS, typeahead.floating, listNavigation.floating, dismiss.floating), [typeahead.floating, listNavigation.floating, dismiss.floating]);
  const itemProps = listNavigation.item ?? EMPTY_OBJECT;
  useOnFirstRender(() => {
    store.update({
      popupProps,
      triggerProps: mergedTriggerProps
    });
  });
  store.useSyncedValues({
    id: generatedId,
    modal,
    multiple,
    value,
    open,
    mounted,
    transitionStatus,
    popupProps,
    triggerProps: mergedTriggerProps,
    items,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue,
    openMethod: renderedOpenMethod
  });
  const contextValue = reactExports.useMemo(() => ({
    store,
    floatingContext,
    required,
    disabled,
    readOnly,
    multiple,
    highlightItemOnHover,
    setValue,
    setOpen,
    listRef,
    popupRef,
    scrollHandlerRef,
    handleScrollArrowVisibility,
    scrollArrowsMountedCountRef,
    itemProps,
    valueRef,
    valuesRef,
    labelsRef,
    typingRef,
    selectionRef,
    firstItemTextRef,
    selectedItemTextRef,
    validation,
    onOpenChangeComplete,
    alignItemWithTriggerActiveRef,
    initialValueRef
  }), [store, floatingContext, required, disabled, readOnly, multiple, highlightItemOnHover, setValue, setOpen, itemProps, validation, onOpenChangeComplete, handleScrollArrowVisibility]);
  const ref = useMergedRefs(inputRef, validation.inputRef);
  const hiddenInputName = multiple ? void 0 : name;
  const hiddenInputs = reactExports.useMemo(() => {
    if (!multiple || !Array.isArray(value) || !name) {
      return null;
    }
    return value.map((v) => {
      const currentSerializedValue = stringifyAsValue(v, itemToStringValue);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        type: "hidden",
        form,
        name,
        value: currentSerializedValue,
        disabled
      }, currentSerializedValue);
    });
  }, [multiple, value, form, name, itemToStringValue, disabled]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectRootContext.Provider, {
    value: contextValue,
    children: [children, /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      ...validation.getValidationProps(disabled, {
        onFocus() {
          store.state.triggerElement?.focus({
            // Supported in Chrome from 144 (January 2026)
            focusVisible: true
          });
        },
        // Handle browser autofill.
        onChange(event) {
          if (event.nativeEvent.defaultPrevented || disabled || readOnly) {
            return;
          }
          const nextValue = event.currentTarget.value;
          const details = createChangeEventDetails(none, event.nativeEvent);
          function handleChange() {
            if (multiple) {
              return;
            }
            const nextValueLower = nextValue.toLowerCase();
            let matchingIndex = valuesRef.current.findIndex((candidate) => stringifyAsValue(candidate, itemToStringValue).toLowerCase() === nextValueLower || stringifyAsLabel(candidate, itemToStringLabel).toLowerCase() === nextValueLower);
            if (matchingIndex === -1) {
              matchingIndex = valuesRef.current.findIndex((_, index) => {
                const renderedLabel = labelsRef.current[index];
                return renderedLabel != null && renderedLabel.toLowerCase() === nextValueLower;
              });
            }
            const matchingValue = valuesRef.current[matchingIndex];
            if (matchingValue != null) {
              setValue(matchingValue, details);
            }
          }
          store.set("forceMount", true);
          queueMicrotask(handleChange);
        }
      }),
      id: generatedId && hiddenInputName == null ? `${generatedId}-hidden-input` : void 0,
      form,
      name: hiddenInputName,
      autoComplete,
      value: serializedValue,
      disabled,
      required: required && !(multiple && hasSelectedValue),
      readOnly,
      ref,
      style: name ? visuallyHiddenInput : visuallyHidden,
      tabIndex: -1,
      "aria-hidden": true,
      suppressHydrationWarning: true
    }), hiddenInputs]
  });
}
const SELECTED_DELAY = 400;
const stateAttributesMapping$2 = {
  ...pressableTriggerOpenStateMapping,
  ...fieldValidityMapping,
  popupSide: (side) => side ? {
    "data-popup-side": side
  } : null,
  value: () => null
};
const SelectTrigger$1 = /* @__PURE__ */ reactExports.forwardRef(function SelectTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    disabled: disabledProp = false,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    setTouched,
    setFocused,
    validationMode,
    state: fieldState,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const {
    labelId: fieldLabelId
  } = useLabelableContext();
  const {
    store,
    setOpen,
    selectionRef,
    validation,
    readOnly,
    required,
    alignItemWithTriggerActiveRef,
    disabled: selectDisabled
  } = useSelectRootContext();
  const disabled = fieldDisabled || selectDisabled || disabledProp;
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const value = useStore(store, selectors.value);
  const triggerProps = useStore(store, selectors.triggerProps);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const popupSideValue = useStore(store, selectors.popupSide);
  const rootId = useStore(store, selectors.id);
  const selectLabelId = useStore(store, selectors.labelId);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const popupSide = mounted && positionerElement ? popupSideValue : null;
  const id = idProp ?? rootId;
  const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, selectLabelId);
  useLabelableId({
    id
  });
  const positionerRef = useValueAsRef(positionerElement);
  const triggerRef = reactExports.useRef(null);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const setTriggerElement = store.useStateSetter("triggerElement");
  const timeoutFocus = useTimeout();
  const timeoutMouseDown = useTimeout();
  const selectedDelayTimeout = useTimeout();
  reactExports.useEffect(() => {
    if (open) {
      selectedDelayTimeout.start(SELECTED_DELAY, () => {
        selectionRef.current.allowUnselectedMouseUp = true;
        selectionRef.current.allowSelectedMouseUp = true;
      });
      return () => {
        selectedDelayTimeout.clear();
      };
    }
    selectionRef.current = {
      allowSelectedMouseUp: false,
      allowUnselectedMouseUp: false,
      dragY: 0
    };
    timeoutMouseDown.clear();
    return void 0;
  }, [open, selectionRef, timeoutMouseDown, selectedDelayTimeout]);
  const mergedProps = mergeProps(triggerProps, {
    id,
    role: "combobox",
    "aria-expanded": open,
    "aria-haspopup": "listbox",
    "aria-controls": open ? listElement?.id ?? getFloatingFocusElement(positionerElement)?.id : void 0,
    "aria-labelledby": ariaLabelledBy,
    "aria-readonly": readOnly || void 0,
    "aria-required": required || void 0,
    tabIndex: disabled ? -1 : 0,
    onFocus(event) {
      setFocused(true);
      if (open && alignItemWithTriggerActiveRef.current) {
        setOpen(false, createChangeEventDetails(none, event.nativeEvent));
      }
      timeoutFocus.start(0, () => {
        store.set("forceMount", true);
      });
    },
    onBlur(event) {
      if (contains(positionerElement, event.relatedTarget)) {
        return;
      }
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(value);
      }
    },
    onMouseDown(event) {
      if (open) {
        return;
      }
      const doc = ownerDocument(event.currentTarget);
      function handleMouseUp(mouseEvent) {
        if (!triggerRef.current) {
          return;
        }
        const mouseUpTarget = mouseEvent.target;
        if (contains(triggerRef.current, mouseUpTarget) || contains(positionerRef.current, mouseUpTarget)) {
          return;
        }
        if (isMouseWithinBounds(mouseEvent, triggerRef.current)) {
          return;
        }
        setOpen(false, createChangeEventDetails(cancelOpen, mouseEvent));
      }
      timeoutMouseDown.start(0, () => {
        doc.addEventListener("mouseup", handleMouseUp, {
          once: true
        });
      });
    }
  }, elementProps, getButtonProps);
  const props = validation.getValidationProps(disabled, mergedProps);
  props.role = "combobox";
  const state = {
    ...fieldState,
    open,
    disabled,
    value,
    readOnly,
    popupSide,
    placeholder: !hasSelectedValue
  };
  return useRenderElement("button", componentProps, {
    ref: [forwardedRef, triggerRef, buttonRef, setTriggerElement],
    state,
    stateAttributesMapping: stateAttributesMapping$2,
    props
  });
});
const stateAttributesMapping$1 = {
  value: () => null
};
const SelectValue$1 = /* @__PURE__ */ reactExports.forwardRef(function SelectValue2(componentProps, forwardedRef) {
  const {
    className,
    render,
    children: childrenProp,
    placeholder,
    style,
    ...elementProps
  } = componentProps;
  const {
    store,
    valueRef
  } = useSelectRootContext();
  const value = useStore(store, selectors.value);
  const items = useStore(store, selectors.items);
  const itemToStringLabel = useStore(store, selectors.itemToStringLabel);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const shouldCheckNullItemLabel = !hasSelectedValue && placeholder != null && childrenProp == null;
  const hasNullLabel = useStore(store, selectors.hasNullItemLabel, shouldCheckNullItemLabel);
  const state = {
    value,
    placeholder: !hasSelectedValue
  };
  let children = null;
  if (typeof childrenProp === "function") {
    children = childrenProp(value);
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (shouldCheckNullItemLabel && !hasNullLabel) {
    children = placeholder;
  } else if (Array.isArray(value)) {
    children = resolveMultipleLabels(value, items, itemToStringLabel);
  } else {
    children = resolveSelectedLabel(value, items, itemToStringLabel);
  }
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [forwardedRef, valueRef],
    props: [{
      children
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping$1
  });
  return element;
});
const SelectIcon = /* @__PURE__ */ reactExports.forwardRef(function SelectIcon2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useSelectRootContext();
  const open = useStore(store, selectors.open);
  const state = {
    open
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: "▼"
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
const SelectPortal = /* @__PURE__ */ reactExports.forwardRef(function SelectPortal2(portalProps, forwardedRef) {
  const {
    store
  } = useSelectRootContext();
  const mounted = useStore(store, selectors.mounted);
  const forceMount = useStore(store, selectors.forceMount);
  const shouldRender = mounted || forceMount;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPortal, {
    ref: forwardedRef,
    ...portalProps
  });
});
const SelectPositionerContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useSelectPositionerContext() {
  const context = reactExports.useContext(SelectPositionerContext);
  if (!context) {
    throw new Error(formatErrorMessage(59));
  }
  return context;
}
function clearStyles(element, originalStyles) {
  if (element) {
    Object.assign(element.style, originalStyles);
  }
}
const LIST_FUNCTIONAL_STYLES = {
  position: "relative",
  maxHeight: "100%",
  overflowX: "hidden",
  overflowY: "auto"
};
const FIXED = {
  position: "fixed"
};
const SelectPositioner = /* @__PURE__ */ reactExports.forwardRef(function SelectPositioner2(componentProps, forwardedRef) {
  const {
    anchor,
    className,
    render,
    // `useAnchorPositioning` applies the same defaults to the undefined values; the names
    // remain destructured to exclude the props from `elementProps`.
    positionMethod,
    side,
    align,
    sideOffset,
    alignOffset,
    collisionBoundary = "clipping-ancestors",
    collisionPadding,
    arrowPadding,
    sticky,
    disableAnchorTracking,
    alignItemWithTrigger = true,
    collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE,
    style,
    ...elementProps
  } = componentProps;
  const {
    store,
    listRef,
    labelsRef,
    alignItemWithTriggerActiveRef,
    selectedItemTextRef,
    valuesRef,
    initialValueRef,
    popupRef,
    setValue,
    floatingContext: floatingRootContext
  } = useSelectRootContext();
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const modal = useStore(store, selectors.modal);
  const value = useStore(store, selectors.value);
  const openMethod = useStore(store, selectors.openMethod);
  const positionerElement = useStore(store, selectors.positionerElement);
  const triggerElement = useStore(store, selectors.triggerElement);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const scrollUpArrowRef = reactExports.useRef(null);
  const scrollDownArrowRef = reactExports.useRef(null);
  const [controlledAlignItemWithTrigger, setControlledAlignItemWithTrigger] = reactExports.useState(alignItemWithTrigger);
  const alignItemWithTriggerActive = mounted && controlledAlignItemWithTrigger && openMethod !== "touch";
  if (!mounted && controlledAlignItemWithTrigger !== alignItemWithTrigger) {
    setControlledAlignItemWithTrigger(alignItemWithTrigger);
  }
  reactExports.useImperativeHandle(alignItemWithTriggerActiveRef, () => alignItemWithTriggerActive);
  useAnchoredPopupScrollLock((alignItemWithTriggerActive || modal) && open, openMethod === "touch", positionerElement, triggerElement);
  const positioning = useAnchorPositioning({
    anchor,
    floatingRootContext,
    positionMethod,
    mounted,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    disableAnchorTracking: disableAnchorTracking ?? alignItemWithTriggerActive,
    collisionAvoidance,
    keepMounted: true
  });
  const renderedSide = alignItemWithTriggerActive ? "none" : positioning.side;
  const positionerStyles = alignItemWithTriggerActive ? FIXED : positioning.positionerStyles;
  const state = {
    open,
    side: renderedSide,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden
  };
  useIsoLayoutEffect(() => {
    store.set("popupSide", positioning.side);
  }, [store, positioning.side]);
  const setPositionerElement = store.useStateSetter("positionerElement");
  const element = usePositioner(componentProps, state, {
    styles: positionerStyles,
    transitionStatus,
    props: elementProps,
    refs: [forwardedRef, setPositionerElement],
    hidden: !mounted,
    inert: !open
  });
  const prevMapSizeRef = reactExports.useRef(0);
  const onMapChange = useStableCallback((map) => {
    if (valuesRef.current.length === 0) {
      return;
    }
    const prevSize = prevMapSizeRef.current;
    prevMapSizeRef.current = map.size;
    if (map.size === prevSize) {
      return;
    }
    const eventDetails = createChangeEventDetails(none);
    if (prevSize !== 0 && !store.state.multiple && value !== null) {
      const selectedValueIndex = findItemIndex(valuesRef.current, value, isItemEqualToValue);
      if (selectedValueIndex === -1) {
        const initialSelectedValue = initialValueRef.current;
        const hasInitial = initialSelectedValue != null && findItemIndex(valuesRef.current, initialSelectedValue, isItemEqualToValue) !== -1;
        const nextValue = hasInitial ? initialSelectedValue : null;
        setValue(nextValue, eventDetails);
        if (nextValue === null) {
          store.set("selectedIndex", null);
          selectedItemTextRef.current = null;
        }
      }
    }
    if (prevSize !== 0 && store.state.multiple && Array.isArray(value)) {
      const nextValue = value.filter((selectedItemValue) => findItemIndex(valuesRef.current, selectedItemValue, isItemEqualToValue) !== -1);
      if (nextValue.length !== value.length) {
        setValue(nextValue, eventDetails);
        if (nextValue.length === 0) {
          store.set("selectedIndex", null);
          selectedItemTextRef.current = null;
        }
      }
    }
    if (open && alignItemWithTriggerActive) {
      store.update({
        scrollUpArrowVisible: false,
        scrollDownArrowVisible: false
      });
      const stylesToClear = {
        height: ""
      };
      clearStyles(positionerElement, stylesToClear);
      clearStyles(popupRef.current, stylesToClear);
    }
  });
  const contextValue = reactExports.useMemo(() => ({
    ...positioning,
    side: renderedSide,
    alignItemWithTriggerActive,
    setControlledAlignItemWithTrigger,
    scrollUpArrowRef,
    scrollDownArrowRef
  }), [positioning, renderedSide, alignItemWithTriggerActive, setControlledAlignItemWithTrigger]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeList, {
    elementsRef: listRef,
    labelsRef,
    onMapChange,
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectPositionerContext.Provider, {
      value: contextValue,
      children: [mounted && modal && /* @__PURE__ */ jsxRuntimeExports.jsx(InternalBackdrop, {
        inert: inertValue(!open),
        cutout: triggerElement
      }), element]
    })
  });
});
const stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
const SelectPopup$1 = /* @__PURE__ */ reactExports.forwardRef(function SelectPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    finalFocus,
    ...elementProps
  } = componentProps;
  const {
    store,
    popupRef,
    onOpenChangeComplete,
    setOpen,
    valueRef,
    firstItemTextRef,
    selectedItemTextRef,
    multiple,
    handleScrollArrowVisibility,
    scrollHandlerRef,
    listRef,
    highlightItemOnHover,
    floatingContext: floatingRootContext
  } = useSelectRootContext();
  const {
    side,
    align,
    alignItemWithTriggerActive,
    isPositioned,
    setControlledAlignItemWithTrigger
  } = useSelectPositionerContext();
  const insideToolbar = useToolbarRootContext(true) != null;
  const direction = useDirection();
  const {
    nonce,
    disableStyleElements
  } = useCSPContext();
  const id = useStore(store, selectors.id);
  const open = useStore(store, selectors.open);
  const openMethod = useStore(store, selectors.openMethod);
  const mounted = useStore(store, selectors.mounted);
  const popupProps = useStore(store, selectors.popupProps);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const triggerElement = useStore(store, selectors.triggerElement);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const reachedMaxHeightRef = reactExports.useRef(false);
  const initialPlacedRef = reactExports.useRef(false);
  const originalPositionerStylesRef = reactExports.useRef({});
  const scrollArrowFrame = useAnimationFrame();
  const handleScroll = useStableCallback((scroller) => {
    if (!positionerElement || !popupRef.current || !initialPlacedRef.current) {
      return;
    }
    const isTopPositioned = positionerElement.style.top === "0px";
    const isBottomPositioned = positionerElement.style.bottom === "0px";
    if (reachedMaxHeightRef.current || !alignItemWithTriggerActive || !isTopPositioned && !isBottomPositioned) {
      handleScrollArrowVisibility(scroller);
      return;
    }
    const scale = getScale(positionerElement);
    const currentHeight = normalizeSize(positionerElement.getBoundingClientRect().height, "y", scale);
    const doc = ownerDocument(positionerElement);
    const win = getWindow(positionerElement);
    const positionerStyles = win.getComputedStyle(positionerElement);
    const marginTop = parseFloat(positionerStyles.marginTop);
    const marginBottom = parseFloat(positionerStyles.marginBottom);
    const maxPopupHeight = getMaxPopupHeight(win.getComputedStyle(popupRef.current));
    const maxAvailableHeight = Math.min(doc.documentElement.clientHeight - marginTop - marginBottom, maxPopupHeight);
    const scrollTop = scroller.scrollTop;
    const maxScrollTop = getMaxScrollTop(scroller);
    let nextScrollTop = null;
    const setHeight = (height) => {
      positionerElement.style.height = `${height}px`;
    };
    const diff = isTopPositioned ? maxScrollTop - scrollTop : scrollTop;
    const nextHeight = Math.min(currentHeight + diff, maxAvailableHeight);
    if (diff <= SCROLL_EDGE_TOLERANCE_PX) {
      const heightDelta = clamp(diff, 0, maxAvailableHeight - currentHeight);
      if (heightDelta > 0) {
        setHeight(currentHeight + heightDelta);
      }
      scroller.scrollTop = isTopPositioned ? maxScrollTop : 0;
      if (maxAvailableHeight - (currentHeight + heightDelta) <= SCROLL_EDGE_TOLERANCE_PX) {
        reachedMaxHeightRef.current = true;
      }
      handleScrollArrowVisibility(scroller);
      return;
    }
    if (maxAvailableHeight - nextHeight > SCROLL_EDGE_TOLERANCE_PX) {
      nextScrollTop = isTopPositioned ? Infinity : 0;
    } else if (isBottomPositioned && scrollTop < maxScrollTop) {
      const overshoot = currentHeight + diff - maxAvailableHeight;
      nextScrollTop = scrollTop - (diff - overshoot);
    }
    const nextPositionerHeight = Math.ceil(nextHeight);
    if (nextPositionerHeight !== 0) {
      setHeight(nextPositionerHeight);
    }
    if (nextScrollTop != null) {
      const target = clamp(nextScrollTop, 0, getMaxScrollTop(scroller));
      if (Math.abs(scroller.scrollTop - target) > SCROLL_EDGE_TOLERANCE_PX) {
        scroller.scrollTop = target;
      }
    }
    if (nextPositionerHeight >= maxAvailableHeight - SCROLL_EDGE_TOLERANCE_PX) {
      reachedMaxHeightRef.current = true;
    }
    handleScrollArrowVisibility(scroller);
  });
  reactExports.useImperativeHandle(scrollHandlerRef, () => handleScroll, [handleScroll]);
  useOpenChangeComplete({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
  });
  const state = {
    open,
    transitionStatus,
    side,
    align
  };
  useIsoLayoutEffect(() => {
    if (!positionerElement || !popupRef.current || Object.keys(originalPositionerStylesRef.current).length) {
      return;
    }
    originalPositionerStylesRef.current = {
      top: positionerElement.style.top || "0",
      left: positionerElement.style.left || "0",
      right: positionerElement.style.right,
      height: positionerElement.style.height,
      bottom: positionerElement.style.bottom,
      minHeight: positionerElement.style.minHeight,
      maxHeight: positionerElement.style.maxHeight,
      marginTop: positionerElement.style.marginTop,
      marginBottom: positionerElement.style.marginBottom
    };
  }, [popupRef, positionerElement]);
  useIsoLayoutEffect(() => {
    if (open || alignItemWithTriggerActive) {
      return;
    }
    initialPlacedRef.current = false;
    reachedMaxHeightRef.current = false;
    clearStyles(positionerElement, originalPositionerStylesRef.current);
  }, [open, alignItemWithTriggerActive, positionerElement, popupRef]);
  useIsoLayoutEffect(() => {
    const popupElement = popupRef.current;
    if (!open || !triggerElement || !positionerElement || !popupElement || alignItemWithTriggerActive && !isPositioned || store.state.transitionStatus === "ending") {
      return;
    }
    initialPlacedRef.current = true;
    popupElement.style.removeProperty("--transform-origin");
    if (!alignItemWithTriggerActive) {
      scrollArrowFrame.request(() => handleScrollArrowVisibility(listElement || popupElement));
      return;
    }
    const restoreTransformStyles = unsetTransformStyles(popupElement);
    try {
      let textElement = selectedItemTextRef.current;
      if (!textElement?.isConnected) {
        const hasSelectedValue = selectors.hasSelectedValue(store.state);
        textElement = !hasSelectedValue && firstItemTextRef.current?.isConnected ? firstItemTextRef.current : null;
      }
      const valueElement = valueRef.current;
      const win = getWindow(positionerElement);
      const positionerStyles = win.getComputedStyle(positionerElement);
      const popupStyles = win.getComputedStyle(popupElement);
      const doc = ownerDocument(triggerElement);
      const scale = getScale(triggerElement);
      const triggerRect = normalizeRect(triggerElement.getBoundingClientRect(), scale);
      const positionerRect = normalizeRect(positionerElement.getBoundingClientRect(), scale);
      const triggerHeight = triggerRect.height;
      const scroller = listElement || popupElement;
      const scrollHeight = scroller.scrollHeight;
      const borderBottom = parseFloat(popupStyles.borderBottomWidth);
      const marginTop = parseFloat(positionerStyles.marginTop) || 10;
      const marginBottom = parseFloat(positionerStyles.marginBottom) || 10;
      const minHeight = parseFloat(positionerStyles.minHeight) || 100;
      const maxPopupHeight = getMaxPopupHeight(popupStyles);
      const paddingLeft = 5;
      const paddingRight = 5;
      const triggerCollisionThreshold = 20;
      const viewportHeight = doc.documentElement.clientHeight - marginTop - marginBottom;
      const viewportWidth = doc.documentElement.clientWidth;
      const availableSpaceBeneathTrigger = viewportHeight - triggerRect.bottom + triggerHeight;
      let textRect;
      let alignedLeft = direction === "rtl" ? triggerRect.right - positionerRect.width : triggerRect.left;
      let offsetY = 0;
      if (textElement && valueElement) {
        const valueRect = normalizeRect(valueElement.getBoundingClientRect(), scale);
        textRect = normalizeRect(textElement.getBoundingClientRect(), scale);
        alignedLeft = positionerRect.left + (direction === "rtl" ? valueRect.right - textRect.right : valueRect.left - textRect.left);
        const valueCenterFromTriggerTop = valueRect.top - triggerRect.top + valueRect.height / 2;
        const textCenterFromPositionerTop = textRect.top - positionerRect.top + textRect.height / 2;
        offsetY = textCenterFromPositionerTop - valueCenterFromTriggerTop;
      }
      const idealHeight = availableSpaceBeneathTrigger + offsetY + marginBottom + borderBottom;
      let height = Math.min(viewportHeight, idealHeight);
      const maxHeight = viewportHeight - marginTop - marginBottom;
      const scrollTop = idealHeight - height;
      const maxRight = viewportWidth - paddingRight;
      positionerElement.style.left = `${clamp(alignedLeft, paddingLeft, maxRight - positionerRect.width)}px`;
      positionerElement.style.height = `${height}px`;
      positionerElement.style.maxHeight = "none";
      positionerElement.style.marginTop = `${marginTop}px`;
      positionerElement.style.marginBottom = `${marginBottom}px`;
      popupElement.style.height = "100%";
      const maxScrollTop = getMaxScrollTop(scroller);
      const isTopPositioned = scrollTop >= maxScrollTop - SCROLL_EDGE_TOLERANCE_PX;
      if (isTopPositioned) {
        height = Math.min(viewportHeight, positionerRect.height) - (scrollTop - maxScrollTop);
      }
      const fallbackToAlignPopupToTrigger = triggerRect.top < triggerCollisionThreshold || triggerRect.bottom > viewportHeight - triggerCollisionThreshold || Math.ceil(height) + SCROLL_EDGE_TOLERANCE_PX < Math.min(scrollHeight, minHeight);
      const isPinchZoomed = (win.visualViewport?.scale ?? 1) !== 1 && webkit;
      if (fallbackToAlignPopupToTrigger || isPinchZoomed) {
        clearStyles(positionerElement, originalPositionerStylesRef.current);
        setControlledAlignItemWithTrigger(false);
        return;
      }
      const initialHeight = Math.max(minHeight, height);
      if (isTopPositioned) {
        const topOffset = Math.max(0, viewportHeight - idealHeight);
        positionerElement.style.top = positionerRect.height >= maxHeight ? "0" : `${topOffset}px`;
        positionerElement.style.height = `${height}px`;
        scroller.scrollTop = getMaxScrollTop(scroller);
      } else {
        positionerElement.style.bottom = "0";
        scroller.scrollTop = scrollTop;
      }
      if (textRect) {
        const popupTop = positionerRect.top;
        const popupHeight = positionerRect.height;
        const textCenterY = textRect.top + textRect.height / 2;
        const clampedY = clamp(popupHeight > 0 ? (textCenterY - popupTop) / popupHeight * 100 : 50, 0, 100);
        popupElement.style.setProperty("--transform-origin", `50% ${clampedY}%`);
      }
      if (initialHeight === viewportHeight || height >= maxPopupHeight) {
        reachedMaxHeightRef.current = true;
      }
      handleScrollArrowVisibility(scroller);
      if (highlightItemOnHover && store.state.selectedIndex === null && store.state.activeIndex === null && listRef.current[0] != null) {
        store.set("activeIndex", 0);
      }
    } finally {
      restoreTransformStyles();
    }
  }, [store, open, positionerElement, triggerElement, valueRef, firstItemTextRef, selectedItemTextRef, popupRef, handleScrollArrowVisibility, alignItemWithTriggerActive, setControlledAlignItemWithTrigger, scrollArrowFrame, listElement, listRef, highlightItemOnHover, direction, isPositioned]);
  reactExports.useEffect(() => {
    if (!alignItemWithTriggerActive || !positionerElement || !open) {
      return void 0;
    }
    const win = getWindow(positionerElement);
    function handleResize(event) {
      setOpen(false, createChangeEventDetails(windowResize, event));
    }
    return addEventListener(win, "resize", handleResize);
  }, [setOpen, alignItemWithTriggerActive, positionerElement, open]);
  const defaultProps = {
    ...listElement ? {
      role: "presentation",
      "aria-orientation": void 0
    } : {
      role: "listbox",
      "aria-multiselectable": multiple || void 0,
      id: `${id}-list`
    },
    onKeyDown(event) {
      if (insideToolbar && COMPOSITE_KEYS.has(event.key)) {
        event.stopPropagation();
      }
    },
    onScroll(event) {
      if (listElement) {
        return;
      }
      handleScroll(event.currentTarget);
    },
    ...alignItemWithTriggerActive && {
      style: listElement ? {
        height: "100%"
      } : LIST_FUNCTIONAL_STYLES
    },
    className: !listElement && alignItemWithTriggerActive ? styleDisableScrollbar.className : void 0
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, popupRef],
    state,
    stateAttributesMapping,
    props: [popupProps, defaultProps, getDisabledMountTransitionStyles(transitionStatus), elementProps]
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [!disableStyleElements && styleDisableScrollbar.getElement(nonce), /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingFocusManager, {
      context: floatingRootContext,
      modal: false,
      disabled: !mounted,
      openInteractionType: openMethod,
      returnFocus: finalFocus,
      restoreFocus: true,
      children: element
    })]
  });
});
function getMaxPopupHeight(popupStyles) {
  const maxHeightStyle = popupStyles.maxHeight;
  return maxHeightStyle.endsWith("px") ? parseFloat(maxHeightStyle) || Infinity : Infinity;
}
function getMaxScrollTop(scroller) {
  return getMaxScrollOffset(scroller.scrollHeight, scroller.clientHeight);
}
function getScale(element) {
  return platform.getScale(element);
}
function normalizeSize(size, axis, scale) {
  return size / scale[axis];
}
function normalizeRect(rect, scale) {
  return rectToClientRect({
    x: normalizeSize(rect.x, "x", scale),
    y: normalizeSize(rect.y, "y", scale),
    width: normalizeSize(rect.width, "x", scale),
    height: normalizeSize(rect.height, "y", scale)
  });
}
const TRANSFORM_STYLE_RESETS = [["transform", "none"], ["scale", "1"], ["translate", "0 0"]];
function unsetTransformStyles(popupElement) {
  const {
    style
  } = popupElement;
  const originalStyles = {};
  for (const [property, value] of TRANSFORM_STYLE_RESETS) {
    originalStyles[property] = style.getPropertyValue(property);
    style.setProperty(property, value, "important");
  }
  return () => {
    for (const [property] of TRANSFORM_STYLE_RESETS) {
      const originalValue = originalStyles[property];
      if (originalValue) {
        style.setProperty(property, originalValue);
      } else {
        style.removeProperty(property);
      }
    }
  };
}
const SelectList = /* @__PURE__ */ reactExports.forwardRef(function SelectList2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store,
    scrollHandlerRef,
    multiple
  } = useSelectRootContext();
  const {
    alignItemWithTriggerActive
  } = useSelectPositionerContext();
  const hasScrollArrows = useStore(store, selectors.hasScrollArrows);
  const openMethod = useStore(store, selectors.openMethod);
  const id = useStore(store, selectors.id);
  const defaultProps = {
    id: `${id}-list`,
    role: "listbox",
    "aria-multiselectable": multiple || void 0,
    onScroll(event) {
      scrollHandlerRef.current?.(event.currentTarget);
    },
    ...alignItemWithTriggerActive && {
      style: LIST_FUNCTIONAL_STYLES
    },
    className: hasScrollArrows && openMethod !== "touch" ? styleDisableScrollbar.className : void 0
  };
  const setListElement = store.useStateSetter("listElement");
  return useRenderElement("div", componentProps, {
    ref: [forwardedRef, setListElement],
    props: [defaultProps, elementProps]
  });
});
const SelectItemContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useSelectItemContext() {
  const context = reactExports.useContext(SelectItemContext);
  if (!context) {
    throw new Error(formatErrorMessage(57));
  }
  return context;
}
const SelectItem$1 = /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef(function SelectItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    value: itemValue = null,
    label,
    disabled: disabledProp = false,
    nativeButton = false,
    ...elementProps
  } = componentProps;
  const textRef = reactExports.useRef(null);
  const listItem = useCompositeListItem({
    guess: true,
    label,
    textRef
  });
  const {
    store,
    itemProps,
    setOpen,
    setValue,
    selectionRef,
    typingRef,
    valuesRef,
    multiple,
    selectedItemTextRef,
    disabled: selectDisabled,
    readOnly
  } = useSelectRootContext();
  const disabled = selectDisabled || disabledProp;
  const highlighted = useStore(store, selectors.isActive, listItem.index);
  const open = useStore(store, selectors.open);
  const selected = useStore(store, selectors.isSelected, itemValue);
  const selectedByFocus = useStore(store, selectors.isSelectedByFocus, listItem.index);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const index = listItem.index;
  const itemRef = reactExports.useRef(null);
  useIsoLayoutEffect(() => {
    const values = valuesRef.current;
    values[index] = itemValue;
    return () => {
      delete values[index];
    };
  }, [index, itemValue, valuesRef]);
  useIsoLayoutEffect(() => {
    const selectedValue = store.state.value;
    let selectedCandidate = selectedValue;
    if (multiple && Array.isArray(selectedValue)) {
      selectedCandidate = selectedValue.length > 0 ? selectedValue[selectedValue.length - 1] : void 0;
    }
    if (selectedCandidate !== void 0 && compareItemEquality(itemValue, selectedCandidate, isItemEqualToValue)) {
      store.set("selectedIndex", index);
      if (textRef.current) {
        selectedItemTextRef.current = textRef.current;
      }
    }
  }, [index, multiple, isItemEqualToValue, store, itemValue, selectedItemTextRef]);
  const pointerTypeRef = reactExports.useRef("mouse");
  const allowMouseSelectionRef = reactExports.useRef(false);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton,
    composite: true
  });
  const state = {
    disabled,
    selected,
    highlighted
  };
  function commitSelection(event) {
    if (selectDisabled || readOnly) {
      return;
    }
    const selectedValue = store.state.value;
    if (multiple) {
      const currentValue = Array.isArray(selectedValue) ? selectedValue : [];
      const nextValue = selected ? removeItem(currentValue, itemValue, isItemEqualToValue) : [...currentValue, itemValue];
      setValue(nextValue, createChangeEventDetails(itemPress, event));
    } else {
      setValue(itemValue, createChangeEventDetails(itemPress, event));
      setOpen(false, createChangeEventDetails(itemPress, event));
    }
  }
  function resetDragMovement() {
    selectionRef.current.dragY = 0;
  }
  const defaultProps = {
    role: "option",
    "aria-selected": selected,
    tabIndex: open && highlighted ? 0 : -1,
    onKeyDown(event) {
      store.set("activeIndex", index);
      if (event.key === " " && typingRef.current) {
        event.preventDefault();
      }
    },
    onClick(event) {
      const isMouseClick = pointerTypeRef.current !== "touch";
      const clickPointerType = event.nativeEvent.pointerType;
      const isVirtualMouseClick = isMouseClick && isVirtualClick(event.nativeEvent) && // Generic no-pointer `detail === 0` clicks stay tied to highlight state. Virtual
      // clicks that carry browser pointer data, including an empty string from assistive
      // technology, can activate unhighlighted items.
      (clickPointerType !== void 0 || highlighted);
      const isInvalidMouseClick = isMouseClick && !isVirtualMouseClick && !allowMouseSelectionRef.current;
      allowMouseSelectionRef.current = false;
      if (disabled || isInvalidMouseClick) {
        return;
      }
      commitSelection(event.nativeEvent);
    },
    onPointerEnter(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onPointerMove(event) {
      if (event.pointerType === "mouse" && event.buttons === 1) {
        const selection = selectionRef.current;
        selection.dragY += event.movementY;
        if (selection.dragY ** 2 >= 64) {
          selection.allowUnselectedMouseUp = true;
        }
      }
    },
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
      allowMouseSelectionRef.current = true;
      resetDragMovement();
    },
    onMouseUp() {
      resetDragMovement();
      if (disabled || pointerTypeRef.current === "touch") {
        return;
      }
      if (allowMouseSelectionRef.current) {
        return;
      }
      const disallowSelectedMouseUp = !selectionRef.current.allowSelectedMouseUp && selected;
      const disallowUnselectedMouseUp = !selectionRef.current.allowUnselectedMouseUp && !selected;
      if (disallowSelectedMouseUp || disallowUnselectedMouseUp) {
        return;
      }
      allowMouseSelectionRef.current = true;
      itemRef.current?.click();
      allowMouseSelectionRef.current = false;
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [buttonRef, forwardedRef, listItem.ref, itemRef],
    state,
    props: [itemProps, defaultProps, elementProps, getButtonProps]
  });
  const contextValue = reactExports.useMemo(() => ({
    selected,
    index,
    textRef,
    selectedByFocus
  }), [selected, index, textRef, selectedByFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemContext.Provider, {
    value: contextValue,
    children: element
  });
}));
const SelectItemIndicator = /* @__PURE__ */ reactExports.forwardRef(function SelectItemIndicator2(componentProps, forwardedRef) {
  const {
    selected
  } = useSelectItemContext();
  const shouldRender = componentProps.keepMounted || selected;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Inner, {
    ...componentProps,
    ref: forwardedRef
  });
});
const Inner = /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef((componentProps, forwardedRef) => {
  const {
    render,
    className,
    style,
    keepMounted,
    ...elementProps
  } = componentProps;
  const {
    selected
  } = useSelectItemContext();
  const indicatorRef = reactExports.useRef(null);
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(selected);
  const state = {
    selected,
    transitionStatus
  };
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, indicatorRef],
    state,
    props: [{
      "aria-hidden": true,
      children: "✔️"
    }, elementProps],
    stateAttributesMapping: transitionStatusMapping
  });
  useOpenChangeComplete({
    open: selected,
    ref: indicatorRef,
    onComplete() {
      if (!selected) {
        setMounted(false);
      }
    }
  });
  return element;
}));
const SelectItemText = /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef(function SelectItemText2(componentProps, forwardedRef) {
  const {
    index,
    textRef,
    selectedByFocus
  } = useSelectItemContext();
  const {
    firstItemTextRef,
    selectedItemTextRef
  } = useSelectRootContext();
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const localRef = reactExports.useCallback((node) => {
    if (!node) {
      return;
    }
    if (index === 0) {
      firstItemTextRef.current = node;
    }
    if (selectedByFocus) {
      selectedItemTextRef.current = node;
    }
  }, [firstItemTextRef, selectedItemTextRef, index, selectedByFocus]);
  const element = useRenderElement("div", componentProps, {
    ref: [localRef, forwardedRef, textRef],
    props: elementProps
  });
  return element;
}));
const SelectScrollArrow = /* @__PURE__ */ reactExports.forwardRef(function SelectScrollArrow2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    direction,
    keepMounted,
    ...elementProps
  } = componentProps;
  const isUp = direction === "up";
  const {
    store,
    popupRef,
    listRef,
    handleScrollArrowVisibility,
    scrollArrowsMountedCountRef
  } = useSelectRootContext();
  const {
    side,
    scrollDownArrowRef,
    scrollUpArrowRef
  } = useSelectPositionerContext();
  const visibleSelector = isUp ? selectors.scrollUpArrowVisible : selectors.scrollDownArrowVisible;
  const stateVisible = useStore(store, visibleSelector);
  const openMethod = useStore(store, selectors.openMethod);
  const visible = stateVisible && openMethod !== "touch";
  const timeout = useTimeout();
  const scrollArrowRef = isUp ? scrollUpArrowRef : scrollDownArrowRef;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(visible);
  useIsoLayoutEffect(() => {
    scrollArrowsMountedCountRef.current += 1;
    store.set("hasScrollArrows", true);
    return () => {
      scrollArrowsMountedCountRef.current = Math.max(0, scrollArrowsMountedCountRef.current - 1);
      if (scrollArrowsMountedCountRef.current === 0) {
        store.set("hasScrollArrows", false);
      }
    };
  }, [store, scrollArrowsMountedCountRef]);
  useOpenChangeComplete({
    open: visible,
    ref: scrollArrowRef,
    onComplete() {
      if (!visible) {
        setMounted(false);
      }
    }
  });
  const state = {
    direction,
    visible,
    side,
    transitionStatus
  };
  const defaultProps = {
    "aria-hidden": true,
    children: isUp ? "▲" : "▼",
    style: {
      position: "absolute"
    },
    onMouseMove(event) {
      if (event.movementX === 0 && event.movementY === 0 || timeout.isStarted()) {
        return;
      }
      store.set("activeIndex", null);
      function scrollNextItem() {
        const scroller = store.state.listElement ?? popupRef.current;
        if (!scroller) {
          return;
        }
        store.set("activeIndex", null);
        handleScrollArrowVisibility(scroller);
        const maxScrollTop = getMaxScrollOffset(scroller.scrollHeight, scroller.clientHeight);
        const scrollTop = normalizeScrollOffset(scroller.scrollTop, maxScrollTop);
        const isScrolledToEdge = scrollTop === (isUp ? 0 : maxScrollTop);
        const items = listRef.current;
        if (scrollTop !== scroller.scrollTop) {
          scroller.scrollTop = scrollTop;
        }
        if (isScrolledToEdge) {
          timeout.clear();
          return;
        }
        if (items.length > 0) {
          const scrollArrowHeight = scrollArrowRef.current?.offsetHeight || 0;
          scroller.scrollTop = getTargetScrollTop(items, isUp, scrollTop, scroller.clientHeight, scrollArrowHeight, maxScrollTop);
        }
        timeout.start(40, scrollNextItem);
      }
      timeout.start(40, scrollNextItem);
    },
    onMouseLeave() {
      timeout.clear();
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, scrollArrowRef],
    state,
    props: [defaultProps, elementProps],
    stateAttributesMapping: transitionStatusMapping
  });
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
function getTargetScrollTop(items, isUp, scrollTop, clientHeight, scrollArrowHeight, maxScrollTop) {
  if (isUp) {
    let firstVisibleIndex = 0;
    const visibleTop = scrollTop + scrollArrowHeight - SCROLL_EDGE_TOLERANCE_PX;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item && item.offsetTop >= visibleTop) {
        firstVisibleIndex = i;
        break;
      }
    }
    const targetIndex2 = Math.max(0, firstVisibleIndex - 1);
    const targetItem2 = items[targetIndex2];
    return targetIndex2 < firstVisibleIndex && targetItem2 ? normalizeScrollOffset(targetItem2.offsetTop - scrollArrowHeight, maxScrollTop) : 0;
  }
  let lastVisibleIndex = items.length - 1;
  const visibleBottom = scrollTop + clientHeight - scrollArrowHeight + SCROLL_EDGE_TOLERANCE_PX;
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (item && item.offsetTop + item.offsetHeight > visibleBottom) {
      lastVisibleIndex = Math.max(0, i - 1);
      break;
    }
  }
  const targetIndex = Math.min(items.length - 1, lastVisibleIndex + 1);
  const targetItem = items[targetIndex];
  return targetIndex > lastVisibleIndex && targetItem ? normalizeScrollOffset(targetItem.offsetTop + targetItem.offsetHeight - clientHeight + scrollArrowHeight, maxScrollTop) : maxScrollTop;
}
const SelectScrollDownArrow = /* @__PURE__ */ reactExports.forwardRef(function SelectScrollDownArrow2(props, forwardedRef) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollArrow, {
    ...props,
    ref: forwardedRef,
    direction: "down"
  });
});
const SelectScrollUpArrow = /* @__PURE__ */ reactExports.forwardRef(function SelectScrollUpArrow2(props, forwardedRef) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollArrow, {
    ...props,
    ref: forwardedRef,
    direction: "up"
  });
});
const SelectGroupContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useSelectGroupContext() {
  const context = reactExports.useContext(SelectGroupContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(56));
  }
  return context;
}
const SelectGroup$1 = /* @__PURE__ */ reactExports.forwardRef(function SelectGroup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const [labelId, setLabelId] = reactExports.useState();
  const contextValue = reactExports.useMemo(() => ({
    labelId,
    setLabelId
  }), [labelId, setLabelId]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      role: "group",
      "aria-labelledby": labelId
    }, elementProps]
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectGroupContext.Provider, {
    value: contextValue,
    children: element
  });
});
const SelectGroupLabel$1 = /* @__PURE__ */ reactExports.forwardRef(function SelectGroupLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    setLabelId
  } = useSelectGroupContext();
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId((currentId) => currentId === id ? void 0 : currentId);
    };
  }, [id, setLabelId]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
const SelectSeparator$1 = ListboxSeparator;
const Select = SelectRoot;
const selectTriggerVariants = cva(
  "relative inline-flex min-h-9 w-full min-w-36 select-none items-center justify-between gap-2 rounded-lg border border-input bg-background not-dark:bg-clip-padding px-[calc(--spacing(3)-1px)] text-start text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 hover:bg-accent/50 data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm dark:bg-input/32 dark:hover:bg-input/64 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-disabled],:focus-visible,[aria-invalid],[data-pressed]]:shadow-none",
  {
    defaultVariants: {
      size: "default"
    },
    variants: {
      size: {
        default: "",
        lg: "min-h-10 sm:min-h-9",
        sm: "min-h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:min-h-7"
      }
    }
  }
);
const selectTriggerIconClassName = "-me-1 size-4.5 opacity-80 sm:size-4";
function SelectTrigger({
  className,
  size = "default",
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SelectTrigger$1,
    {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy ?? (ariaLabel ? "" : void 0),
      className: cn(selectTriggerVariants({ size }), className),
      "data-slot": "select-trigger",
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { "data-slot": "select-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: selectTriggerIconClassName }) })
      ]
    }
  );
}
function SelectValue({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectValue$1,
    {
      className: cn(
        "flex-1 truncate data-placeholder:text-muted-foreground",
        className
      ),
      "data-slot": "select-value",
      ...props
    }
  );
}
function SelectPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  anchor,
  portalProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { ...portalProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectPositioner,
    {
      align,
      alignItemWithTrigger,
      alignOffset,
      anchor,
      className: "z-50 select-none",
      "data-slot": "select-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SelectPopup$1,
        {
          className: "origin-(--transform-origin) text-foreground outline-none",
          "data-slot": "select-popup",
          ...props,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectScrollUpArrow,
              {
                className: "top-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-[calc(var(--radius-lg)-1px)] before:bg-linear-to-b before:from-50% before:from-popover",
                "data-slot": "select-scroll-up-arrow",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "relative size-4.5 sm:size-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-full min-w-(--anchor-width) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectList,
              {
                className: cn(
                  "max-h-(--available-height) overflow-y-auto p-1",
                  className
                ),
                "data-slot": "select-list",
                children
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectScrollDownArrow,
              {
                className: "bottom-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-[calc(var(--radius-lg)-1px)] before:bg-linear-to-t before:from-50% before:from-popover",
                "data-slot": "select-scroll-down-arrow",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "relative size-4.5 sm:size-4" })
              }
            )
          ]
        }
      )
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SelectItem$1,
    {
      className: cn(
        "grid min-h-8 pointer-coarse:min-h-11 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      "data-slot": "select-item",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { className: "col-start-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { "aria-hidden": "true", strokeWidth: 3 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { className: "wrap-anywhere col-start-2 min-w-0", children })
      ]
    }
  );
}
function SelectSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectSeparator$1,
    {
      className: cn("mx-2 my-1 h-px bg-border", className),
      "data-slot": "select-separator",
      ...props
    }
  );
}
function SelectGroup(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectGroup$1, { "data-slot": "select-group", ...props });
}
function SelectGroupLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectGroupLabel$1,
    {
      className: cn("px-2 py-1.5 font-medium text-muted-foreground text-xs", className),
      "data-slot": "select-group-label",
      ...props
    }
  );
}
export {
  Select as S,
  SelectTrigger as a,
  SelectValue as b,
  SelectPopup as c,
  SelectItem as d,
  selectTriggerVariants as e,
  SelectSeparator as f,
  SelectGroup as g,
  SelectGroupLabel as h,
  selectTriggerIconClassName as s
};
