import { bt as getGridNavigatedIndex, bu as isIndexOutOfListBounds, r as reactExports, V as formatErrorMessage, aZ as useDirection, W as useControlled, al as useRefWithInit, ap as EMPTY_ARRAY, X as useStableCallback, as as useStore, au as useValueAsRef, ac as useTransitionStatus, aq as useOpenInteractionType, ad as useOpenChangeComplete, a3 as useIsoLayoutEffect, aK as none, av as useValueChanged, aA as useFloatingRootContext, aB as useClick, aC as useDismiss, aD as useListNavigation, a9 as mergeProps, aF as FOCUSABLE_POPUP_PROPS, aG as EMPTY_OBJECT, a0 as useMergedRefs, j as jsxRuntimeExports, aH as visuallyHiddenInput, aI as visuallyHidden, aJ as createChangeEventDetails, bv as inputClear, bw as Store, ab as NOOP, bx as createGenericEventDetails, by as inputPress, am as getTarget, aN as contains, bz as inputChange, bA as getOverflowAncestors, ao as isHTMLElement, bB as isScrollableY, bC as escapeKey, aw as focusOut, ax as outsidePress, be as itemPress, bD as keyboard, bo as pointer, aM as pressableTriggerOpenStateMapping, ae as useTimeout, aE as useTypeahead, a2 as useButton, Y as useRenderElement, bE as stopEvent, bF as listNavigation, an as ownerDocument, aO as isMouseWithinBounds, aP as cancelOpen, bG as closePress, a1 as useBaseUiId, bH as gecko, bI as android, bJ as isElement, bK as isInteractiveElement, aQ as triggerOpenStateMapping, _ as transitionStatusMapping, bL as clearPress, Z as CompositeList, bM as ios, aR as FloatingPortal, aS as DROPDOWN_COLLISION_AVOIDANCE, aU as useAnchorPositioning, aT as useAnchoredPopupScrollLock, aV as usePositioner, aW as InternalBackdrop, aX as inertValue, b6 as FloatingFocusManager, ba as popupStateMapping, bb as getDisabledMountTransitionStyles, $ as useCompositeListItem, bN as reactDomExports } from "./index-DM02Iz28.js";
import { c as compareItemEquality, h as hasNullItemLabel, a as stringifyAsLabel, d as defaultItemEquality, i as isGroupedItems, s as stringifyAsValue, g as findSelectionIndex, u as useOnFirstRender, j as selectedValueIncludes, e as removeItem, f as findItemIndex } from "./ListboxSeparator-DfAtCXVV.js";
import { a as useFormContext, b as useFieldRootContext, f as fieldValidityMapping, u as useLabelableContext, c as DEFAULT_FIELD_STATE_ATTRIBUTES, F as FieldRootContext, d as DEFAULT_FIELD_ROOT_CONTEXT } from "./LabelableContext-DO-1KYYg.js";
import { u as useRegisterFieldControl } from "./useRegisterFieldControl-KuH2MueO.js";
import { u as useLabelableId } from "./useLabelableId-aT49TJD-.js";
import { s as stringifyLocale } from "./stringifyLocale-DOx30wH1.js";
import { a as areArraysEqual } from "./areArraysEqual-Bigu0Aq6.js";
import { r as resolveAriaLabelledBy } from "./resolveAriaLabelledBy-JxsTST5s.js";
function gridNavigation(event, prevIndex, listRef, orientation, loopFocus, rtl, disabledIndices, minIndex, maxIndex, cols = 2) {
  const nextIndex = getGridNavigatedIndex(listRef.current, {
    event,
    orientation,
    loopFocus,
    rtl,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    // An out-of-range previous index falls back to the first enabled item.
    prevIndex: prevIndex > maxIndex ? minIndex : prevIndex,
    stopEvent: true
  });
  return isIndexOutOfListBounds(listRef.current, nextIndex) ? void 0 : nextIndex;
}
const ComboboxRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
const ComboboxFloatingContext = /* @__PURE__ */ reactExports.createContext(void 0);
const ComboboxDerivedItemsContext = /* @__PURE__ */ reactExports.createContext(void 0);
const ComboboxHasItemsContext = /* @__PURE__ */ reactExports.createContext(false);
const ComboboxInputValueContext = /* @__PURE__ */ reactExports.createContext("");
function useComboboxRootContext() {
  const context = reactExports.useContext(ComboboxRootContext);
  if (!context) {
    throw new Error(formatErrorMessage(22));
  }
  return context;
}
function useComboboxFloatingContext() {
  const context = reactExports.useContext(ComboboxFloatingContext);
  if (!context) {
    throw new Error(formatErrorMessage(23));
  }
  return context;
}
function useComboboxDerivedItemsContext() {
  const context = reactExports.useContext(ComboboxDerivedItemsContext);
  if (!context) {
    throw new Error(formatErrorMessage(24));
  }
  return context;
}
function useComboboxInputValueContext() {
  return reactExports.useContext(ComboboxInputValueContext);
}
function useComboboxHasItemsContext() {
  return reactExports.useContext(ComboboxHasItemsContext);
}
const selectors = {
  id: (state) => state.id,
  labelId: (state) => state.labelId,
  items: (state) => state.items,
  selectedValue: (state) => state.selectedValue,
  hasSelectionChips: (state) => {
    const selectedValue = state.selectedValue;
    return Array.isArray(selectedValue) && selectedValue.length > 0;
  },
  hasSelectedValue: (state) => {
    const {
      selectedValue,
      selectionMode
    } = state;
    if (selectedValue == null) {
      return false;
    }
    if (selectionMode === "multiple" && Array.isArray(selectedValue)) {
      return selectedValue.length > 0;
    }
    return true;
  },
  hasNullItemLabel: (state, enabled) => {
    return enabled ? hasNullItemLabel(state.items) : false;
  },
  open: (state) => state.open,
  mounted: (state) => state.mounted,
  forceMounted: (state) => state.forceMounted,
  inline: (state) => state.inline,
  activeIndex: (state) => state.activeIndex,
  selectedIndex: (state) => state.selectedIndex,
  isActive: (state, index) => state.activeIndex === index,
  isSelected: (state, itemValue) => {
    const comparer = state.isItemEqualToValue;
    const selectedValue = state.selectedValue;
    if (Array.isArray(selectedValue)) {
      return selectedValue.some((selectedItem) => compareItemEquality(itemValue, selectedItem, comparer));
    }
    return compareItemEquality(itemValue, selectedValue, comparer);
  },
  transitionStatus: (state) => state.transitionStatus,
  popupProps: (state) => state.popupProps,
  listProps: (state) => state.listProps,
  inputProps: (state) => state.inputProps,
  triggerProps: (state) => state.triggerProps,
  itemProps: (state) => state.itemProps,
  positionerElement: (state) => state.positionerElement,
  listElement: (state) => state.listElement,
  popupId: (state) => state.popupId,
  triggerElement: (state) => state.triggerElement,
  inputElement: (state) => state.inputElement,
  inputGroupElement: (state) => state.inputGroupElement,
  popupSide: (state) => state.popupSide,
  openMethod: (state) => state.openMethod,
  inputInsidePopup: (state) => state.inputInsidePopup,
  inputOwnsFormValue: (state) => state.inputOwnsFormValue,
  selectionMode: (state) => state.selectionMode,
  name: (state) => state.name,
  form: (state) => state.form,
  disabled: (state) => state.disabled,
  readOnly: (state) => state.readOnly,
  required: (state) => state.required,
  grid: (state) => state.grid,
  virtualized: (state) => state.virtualized,
  itemToStringLabel: (state) => state.itemToStringLabel,
  isItemEqualToValue: (state) => state.isItemEqualToValue,
  modal: (state) => state.modal,
  autoHighlight: (state) => state.autoHighlight
};
function getComboboxPopupId(rootId) {
  return rootId == null ? void 0 : `${rootId}-popup`;
}
function createCollatorItemFilter(collatorFilter, itemToStringLabel) {
  return (item, query) => {
    if (item == null) {
      return false;
    }
    return collatorFilter.contains(item, query, itemToStringLabel);
  };
}
const filterCache = /* @__PURE__ */ new Map();
function getFilter(options = {}) {
  const mergedOptions = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: true,
    ...options
  };
  const cacheKey = `${stringifyLocale(options.locale)}|${JSON.stringify(mergedOptions)}`;
  const cachedFilter = filterCache.get(cacheKey);
  if (cachedFilter) {
    return cachedFilter;
  }
  const collator = new Intl.Collator(options.locale, mergedOptions);
  const filter = {
    contains(item, query, itemToString) {
      if (!query) {
        return true;
      }
      const itemString = stringifyAsLabel(item, itemToString);
      for (let i = 0; i <= itemString.length - query.length; i += 1) {
        if (collator.compare(itemString.slice(i, i + query.length), query) === 0) {
          return true;
        }
      }
      return false;
    },
    startsWith(item, query, itemToString) {
      if (!query) {
        return true;
      }
      const itemString = stringifyAsLabel(item, itemToString);
      return collator.compare(itemString.slice(0, query.length), query) === 0;
    },
    endsWith(item, query, itemToString) {
      if (!query) {
        return true;
      }
      const itemString = stringifyAsLabel(item, itemToString);
      const queryLength = query.length;
      return itemString.length >= queryLength && collator.compare(itemString.slice(itemString.length - queryLength), query) === 0;
    }
  };
  filterCache.set(cacheKey, filter);
  return filter;
}
const useCoreFilter = getFilter;
const NO_ACTIVE_VALUE = /* @__PURE__ */ Symbol("none");
const INITIAL_LAST_HIGHLIGHT = {
  value: NO_ACTIVE_VALUE,
  index: -1
};
function AriaCombobox(props) {
  const {
    id: idProp,
    onOpenChangeComplete: onOpenChangeCompleteProp,
    defaultSelectedValue = null,
    selectedValue: selectedValueProp,
    onSelectedValueChange,
    defaultInputValue: defaultInputValueProp,
    inputValue: inputValueProp,
    open: openProp,
    defaultOpen = false,
    selectionMode,
    onItemHighlighted: onItemHighlightedProp,
    name: nameProp,
    form,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    inputRef: inputRefProp,
    grid = false,
    items,
    filteredItems: filteredItemsProp,
    filter: filterProp,
    openOnInputClick = true,
    autoHighlight = false,
    keepHighlight = false,
    highlightItemOnHover = true,
    loopFocus = true,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue = defaultItemEquality,
    virtualized = false,
    inline: inlineProp = false,
    fillInputOnItemPress = true,
    modal = false,
    limit = -1,
    autoComplete = "list",
    formAutoComplete,
    locale,
    submitOnItemClick = false
  } = props;
  const {
    clearErrors
  } = useFormContext();
  const {
    setDirty,
    validityData,
    setFilled,
    name: fieldName,
    disabled: fieldDisabled,
    setTouched,
    setFocused,
    validationMode,
    validation
  } = useFieldRootContext();
  const direction = useDirection();
  const id = useLabelableId({
    id: idProp
  });
  const collatorFilter = useCoreFilter({
    locale
  });
  const [queryChangedAfterOpen, setQueryChangedAfterOpen] = reactExports.useState(false);
  const [closeQuery, setCloseQuery] = reactExports.useState(null);
  const listRef = reactExports.useRef([]);
  const labelsRef = reactExports.useRef([]);
  const popupRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const startDismissRef = reactExports.useRef(null);
  const endDismissRef = reactExports.useRef(null);
  const emptyRef = reactExports.useRef(null);
  const keyboardActiveRef = reactExports.useRef(true);
  const hadInputClearRef = reactExports.useRef(false);
  const chipsContainerRef = reactExports.useRef(null);
  const clearRef = reactExports.useRef(null);
  const selectionEventRef = reactExports.useRef(null);
  const lastHighlightRef = reactExports.useRef(INITIAL_LAST_HIGHLIGHT);
  const pendingQueryHighlightRef = reactExports.useRef(null);
  const valuesRef = reactExports.useRef([]);
  const pointerDownItemRef = reactExports.useRef(null);
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const multiple = selectionMode === "multiple";
  const single = selectionMode === "single";
  const hasInputValue = inputValueProp !== void 0 || defaultInputValueProp !== void 0;
  const hasItems = items !== void 0;
  const hasFilteredItemsProp = filteredItemsProp !== void 0;
  let autoHighlightMode;
  if (autoHighlight === "always") {
    autoHighlightMode = "always";
  } else {
    autoHighlightMode = autoHighlight ? "input-change" : false;
  }
  const [selectedValue, setSelectedValueUnwrapped] = useControlled({
    controlled: selectedValueProp,
    default: multiple ? defaultSelectedValue ?? EMPTY_ARRAY : defaultSelectedValue,
    name: "Combobox",
    state: "selectedValue"
  });
  const filter = reactExports.useMemo(() => {
    if (filterProp === null) {
      return () => true;
    }
    if (filterProp !== void 0) {
      return filterProp;
    }
    return createCollatorItemFilter(collatorFilter, itemToStringLabel);
  }, [filterProp, collatorFilter, itemToStringLabel]);
  const initialDefaultInputValue = useRefWithInit(() => {
    if (hasInputValue) {
      return defaultInputValueProp ?? "";
    }
    if (single) {
      return stringifyAsLabel(selectedValue, itemToStringLabel);
    }
    return "";
  }).current;
  const [inputValue, setInputValueUnwrapped] = useControlled({
    controlled: inputValueProp,
    default: initialDefaultInputValue,
    name: "Combobox",
    state: "inputValue"
  });
  const [open, setOpenUnwrapped] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: "Combobox",
    state: "open"
  });
  const isGrouped = isGroupedItems(items);
  const query = closeQuery ?? String(inputValue).trim();
  const selectedLabelString = single ? stringifyAsLabel(selectedValue, itemToStringLabel) : "";
  const shouldBypassFiltering = single && !queryChangedAfterOpen && query !== "" && selectedLabelString.length === query.length && collatorFilter.contains(selectedLabelString, query);
  const filterQuery = shouldBypassFiltering ? "" : query;
  const shouldIgnoreExternalFiltering = hasItems && hasFilteredItemsProp && shouldBypassFiltering;
  const flatItems = reactExports.useMemo(() => {
    if (!items) {
      return EMPTY_ARRAY;
    }
    if (isGrouped) {
      return items.flatMap((group) => group.items);
    }
    return items;
  }, [items, isGrouped]);
  const filteredItems = reactExports.useMemo(() => {
    if (filteredItemsProp && !shouldIgnoreExternalFiltering) {
      return filteredItemsProp;
    }
    if (!items) {
      return EMPTY_ARRAY;
    }
    if (isGrouped) {
      const groupedItems = items;
      const resultingGroups = [];
      let currentCount = 0;
      for (const group of groupedItems) {
        if (limit > -1 && currentCount >= limit) {
          break;
        }
        const remainingLimit = limit > -1 ? limit - currentCount : Infinity;
        const itemsToTake = filterQuery === "" ? group.items.slice(0, remainingLimit) : [];
        if (filterQuery !== "") {
          for (const item of group.items) {
            if (itemsToTake.length >= remainingLimit) {
              break;
            }
            if (filter(item, filterQuery, itemToStringLabel)) {
              itemsToTake.push(item);
            }
          }
        }
        if (itemsToTake.length > 0) {
          const newGroup = {
            ...group,
            items: itemsToTake
          };
          resultingGroups.push(newGroup);
          currentCount += itemsToTake.length;
        }
      }
      return resultingGroups;
    }
    if (filterQuery === "") {
      return limit > -1 ? flatItems.slice(0, limit) : (
        // The cast here is done as `flatItems` is readonly.
        // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
        // reference this exact readonly value, creating a mutation risk.
        // However, <Combobox.Item> can never mutate this value as the mutating effect
        // bails early when `items` is provided, and this is only ever returned
        // when `items` is provided due to the early return at the top of this hook.
        flatItems
      );
    }
    const limitedItems = [];
    for (const item of flatItems) {
      if (limit > -1 && limitedItems.length >= limit) {
        break;
      }
      if (filter(item, filterQuery, itemToStringLabel)) {
        limitedItems.push(item);
      }
    }
    return limitedItems;
  }, [filteredItemsProp, shouldIgnoreExternalFiltering, items, isGrouped, filterQuery, limit, filter, itemToStringLabel, flatItems]);
  const flatFilteredItems = reactExports.useMemo(() => {
    if (isGrouped) {
      const groups = filteredItems;
      return groups.flatMap((g) => g.items);
    }
    return filteredItems;
  }, [filteredItems, isGrouped]);
  const store = useRefWithInit(() => {
    let initialSelectedIndex = null;
    if (inlineProp && open && hasItems && selectionMode !== "none") {
      initialSelectedIndex = findSelectionIndex(flatFilteredItems, selectedValue, isItemEqualToValue, multiple);
    }
    return new Store({
      id,
      labelId: void 0,
      selectedValue,
      open,
      items,
      selectionMode,
      listRef,
      labelsRef,
      popupRef,
      emptyRef,
      inputRef,
      startDismissRef,
      endDismissRef,
      keyboardActiveRef,
      chipsContainerRef,
      clearRef,
      valuesRef,
      pointerDownItemRef,
      selectionEventRef,
      name,
      form,
      disabled,
      readOnly,
      required,
      grid,
      virtualized,
      openOnInputClick,
      itemToStringLabel,
      isItemEqualToValue,
      modal,
      autoHighlight: autoHighlightMode,
      submitOnItemClick,
      hasInputValue,
      mounted: false,
      forceMounted: false,
      transitionStatus: "idle",
      inline: inlineProp,
      activeIndex: null,
      selectedIndex: initialSelectedIndex,
      popupProps: {},
      listProps: {},
      inputProps: {},
      triggerProps: {},
      itemProps: EMPTY_OBJECT,
      positionerElement: null,
      listElement: null,
      popupId: void 0,
      triggerElement: null,
      inputElement: null,
      inputGroupElement: null,
      popupSide: null,
      openMethod: null,
      inputInsidePopup: true,
      // Avoid duplicate names in the server HTML. Popup inputs aren't rendered
      // until after hydration, so the hidden input takes over then if needed.
      inputOwnsFormValue: selectionMode === "none",
      // Placeholder callbacks replaced on first render
      onOpenChangeComplete: NOOP,
      setOpen: NOOP,
      setInputValue: NOOP,
      setSelectedValue: NOOP,
      setIndices: NOOP,
      handleSelection: NOOP,
      forceMount: NOOP,
      requestSubmit: NOOP
    });
  }).current;
  const fieldRawValue = selectionMode === "none" ? inputValue : selectedValue;
  const fieldStringValue = reactExports.useMemo(() => {
    if (selectionMode === "none") {
      return fieldRawValue;
    }
    if (Array.isArray(selectedValue)) {
      return selectedValue.map((value) => stringifyAsValue(value, itemToStringValue));
    }
    return stringifyAsValue(selectedValue, itemToStringValue);
  }, [fieldRawValue, itemToStringValue, selectionMode, selectedValue]);
  const onItemHighlighted = useStableCallback(onItemHighlightedProp);
  const onOpenChangeComplete = useStableCallback(onOpenChangeCompleteProp);
  const activeIndex = useStore(store, selectors.activeIndex);
  const selectedIndex = useStore(store, selectors.selectedIndex);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const triggerElement = useStore(store, selectors.triggerElement);
  const inputElement = useStore(store, selectors.inputElement);
  const inputGroupElement = useStore(store, selectors.inputGroupElement);
  const inline = useStore(store, selectors.inline);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const inputOwnsFormValue = useStore(store, selectors.inputOwnsFormValue);
  const triggerRef = useValueAsRef(triggerElement);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  const {
    openMethod,
    triggerProps
  } = useOpenInteractionType(open);
  const getStringifiedValueForForm = useStableCallback(() => fieldStringValue);
  useRegisterFieldControl(inputInsidePopup ? triggerRef : inputRef, id, fieldRawValue, getStringifiedValueForForm, !disabled, nameProp);
  const forceMount = useStableCallback(() => {
    if (items) {
      labelsRef.current = flatFilteredItems.map((item) => stringifyAsLabel(item, itemToStringLabel));
    } else {
      store.set("forceMounted", true);
    }
  });
  const emitHighlight = useStableCallback((value, index, type) => {
    if (index === -1) {
      if (lastHighlightRef.current === INITIAL_LAST_HIGHLIGHT) {
        return;
      }
      lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT;
    } else {
      lastHighlightRef.current = {
        value,
        index
      };
    }
    onItemHighlighted(value, createGenericEventDetails(type, void 0, {
      index
    }));
  });
  const setIndices = useStableCallback((options) => {
    store.update(options);
    const activeIndexOption = options.activeIndex;
    if (activeIndexOption === void 0) {
      return;
    }
    const type = options.type || none;
    if (activeIndexOption === null) {
      emitHighlight(void 0, -1, type);
    } else {
      emitHighlight(valuesRef.current[activeIndexOption], activeIndexOption, type);
    }
  });
  const setInputValue = useStableCallback((next, eventDetails) => {
    hadInputClearRef.current = eventDetails.reason === inputClear;
    props.onInputValueChange?.(next, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    if (eventDetails.reason === inputChange) {
      if (open && closeQuery !== null) {
        setCloseQuery(null);
      }
      const event = eventDetails.event;
      const inputType = event.inputType;
      const isTypedInput = event.type === "compositionend" || inputType != null && inputType !== "" && inputType !== "insertReplacementText";
      if (isTypedInput) {
        const hasQuery = next.trim() !== "";
        if (hasQuery) {
          setQueryChangedAfterOpen(true);
        }
        pendingQueryHighlightRef.current = {
          hasQuery
        };
        const list = store.state.listElement;
        if (!store.state.virtualized && list) {
          const popup = popupRef.current;
          for (const ancestor of getOverflowAncestors(list.firstElementChild ?? list)) {
            if (!isHTMLElement(ancestor) || (popup ? !contains(popup, ancestor) : ancestor.getAttribute("role") === "dialog")) {
              break;
            }
            if (isScrollableY(ancestor)) {
              ancestor.scrollTop = 0;
              break;
            }
          }
        }
        if (hasQuery && autoHighlightMode && store.state.activeIndex == null && (open || inline)) {
          store.set("activeIndex", 0);
        }
      }
    } else if (eventDetails.reason === inputClear && next === "" && store.state.inputInsidePopup) {
      pendingQueryHighlightRef.current = {
        hasQuery: false,
        selection: true
      };
    }
    setInputValueUnwrapped(next);
  });
  const setOpen = useStableCallback((nextOpen, eventDetails) => {
    if (open === nextOpen) {
      return;
    }
    if (eventDetails.reason === escapeKey && hasItems && flatFilteredItems.length === 0 && !emptyRef.current) {
      eventDetails.allowPropagation();
    }
    props.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    if (nextOpen && inputInsidePopup && !inline && closeQuery !== null) {
      setQueryChangedAfterOpen(false);
      setCloseQuery(null);
      if (inputValue !== "" && eventDetails.reason !== inputChange) {
        setInputValue("", createChangeEventDetails(inputClear, eventDetails.event));
      }
    }
    if (!nextOpen && queryChangedAfterOpen) {
      if (single) {
        if (!inline) {
          setCloseQuery(query);
        }
        if (query === "") {
          setQueryChangedAfterOpen(false);
        }
      } else if (multiple) {
        if (!inline) {
          setCloseQuery(query);
        }
        if (inputInsidePopup) {
          setIndices({
            activeIndex: null
          });
        }
        if (!inputInsidePopup || inline) {
          setInputValue("", createChangeEventDetails(inputClear, eventDetails.event));
        }
      }
    }
    setOpenUnwrapped(nextOpen);
    if (!nextOpen && inputInsidePopup && (eventDetails.reason === focusOut || eventDetails.reason === outsidePress)) {
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        const valueToValidate = selectionMode === "none" ? inputValue : selectedValue;
        validation.commit(valueToValidate);
      }
    }
  });
  const setSelectedValue = useStableCallback((nextValue, eventDetails) => {
    onSelectedValueChange?.(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setSelectedValueUnwrapped(nextValue);
    const shouldFillInput = selectionMode === "none" && popupRef.current && fillInputOnItemPress || single && !store.state.inputInsidePopup;
    if (shouldFillInput) {
      setInputValue(stringifyAsLabel(nextValue, itemToStringLabel), createChangeEventDetails(eventDetails.reason, eventDetails.event));
    }
  });
  const handleSelection = useStableCallback((event, itemValue) => {
    const targetEl = getTarget(event);
    const overrideEvent = selectionEventRef.current ?? event;
    selectionEventRef.current = null;
    const eventDetails = createChangeEventDetails(itemPress, overrideEvent);
    const href = targetEl?.closest("a")?.getAttribute("href");
    if (href) {
      if (href.startsWith("#")) {
        setOpen(false, eventDetails);
      }
      return;
    }
    if (multiple) {
      const currentSelectedValue = Array.isArray(selectedValue) ? selectedValue : [];
      const isCurrentlySelected = selectedValueIncludes(currentSelectedValue, itemValue, isItemEqualToValue);
      const nextValue = isCurrentlySelected ? removeItem(currentSelectedValue, itemValue, isItemEqualToValue) : [...currentSelectedValue, itemValue];
      setSelectedValue(nextValue, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      const wasFiltering = inputRef.current ? inputRef.current.value.trim() !== "" : false;
      if (!wasFiltering) {
        return;
      }
      if (store.state.inputInsidePopup) {
        setInputValue("", createChangeEventDetails(inputClear, eventDetails.event));
      } else {
        setOpen(false, eventDetails);
      }
    } else {
      setSelectedValue(itemValue, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      setOpen(false, eventDetails);
    }
  });
  const requestSubmit = useStableCallback(() => {
    const formElement = validation.inputRef.current?.form ?? store.state.inputElement?.form;
    if (formElement && typeof formElement.requestSubmit === "function") {
      formElement.requestSubmit();
    }
  });
  const handleUnmount = useStableCallback(() => {
    setMounted(false);
    onOpenChangeComplete?.(false);
    setQueryChangedAfterOpen(false);
    setCloseQuery(null);
    if (selectionMode === "none") {
      setIndices({
        activeIndex: null,
        selectedIndex: null
      });
    } else {
      setIndices({
        activeIndex: null
      });
    }
    if (multiple && inputRef.current && inputRef.current.value !== "" && !hadInputClearRef.current) {
      setInputValue("", createChangeEventDetails(inputClear));
    }
    if (single) {
      if (store.state.inputInsidePopup) {
        if (inputRef.current && inputRef.current.value !== "") {
          setInputValue("", createChangeEventDetails(inputClear));
        }
      } else {
        const stringVal = stringifyAsLabel(selectedValue, itemToStringLabel);
        if (inputRef.current && inputRef.current.value !== stringVal) {
          const reason = stringVal === "" ? inputClear : none;
          setInputValue(stringVal, createChangeEventDetails(reason));
        }
      }
    }
  });
  const resolvedPopupRef = reactExports.useMemo(() => {
    if (inline && positionerElement) {
      return {
        current: positionerElement.closest('[role="dialog"]')
      };
    }
    return popupRef;
  }, [inline, positionerElement]);
  useOpenChangeComplete({
    enabled: !props.actionsRef,
    open,
    ref: resolvedPopupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  reactExports.useImperativeHandle(props.actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  useIsoLayoutEffect(function syncClosedState() {
    if (open) {
      return;
    }
    pointerDownItemRef.current = null;
    if (selectionMode === "none") {
      return;
    }
    const registry = hasItems ? flatItems : valuesRef.current;
    setIndices({
      selectedIndex: findSelectionIndex(registry, selectedValue, isItemEqualToValue, multiple)
    });
  }, [open, selectedValue, selectionMode, multiple, hasItems, flatItems, isItemEqualToValue, setIndices]);
  useIsoLayoutEffect(() => {
    if (items) {
      valuesRef.current = flatFilteredItems;
      listRef.current.length = flatFilteredItems.length;
    }
  }, [items, flatFilteredItems]);
  useIsoLayoutEffect(() => {
    const pendingHighlight = pendingQueryHighlightRef.current;
    if (pendingHighlight) {
      const listIsNavigable = open || inline || store.state.positionerElement?.hidden === false;
      if (pendingHighlight.hasQuery) {
        if (autoHighlightMode && listIsNavigable) {
          store.set("activeIndex", 0);
        }
        pendingQueryHighlightRef.current = null;
      } else if (String(inputValue).trim() === "") {
        pendingQueryHighlightRef.current = null;
        if (listIsNavigable) {
          const clearedBySelection = pendingHighlight.selection;
          if (autoHighlightMode === "always" && !clearedBySelection && store.state.selectionMode === "none") {
            store.set("activeIndex", 0);
          }
          queueMicrotask(() => {
            if (!store.state.open && !store.state.inline || inputRef.current && inputRef.current.value.trim() !== "") {
              return;
            }
            const currentSelectedValue = store.state.selectedValue;
            const isMultiple = store.state.selectionMode === "multiple";
            const lastSelectedValue = isMultiple && Array.isArray(currentSelectedValue) ? currentSelectedValue[currentSelectedValue.length - 1] : currentSelectedValue;
            const hasSelection = store.state.selectionMode !== "none" && lastSelectedValue != null;
            if (hasSelection || clearedBySelection) {
              const registry = hasItems || hasFilteredItemsProp ? flatFilteredItems : valuesRef.current;
              store.set("activeIndex", hasSelection ? findSelectionIndex(registry, currentSelectedValue, store.state.isItemEqualToValue, isMultiple) : null);
            } else if (autoHighlightMode === "always") {
              store.set("activeIndex", 0);
            }
          });
        }
      }
    }
    if (!open && !inline) {
      return;
    }
    const shouldUseFlatFilteredItems = hasItems || hasFilteredItemsProp;
    const candidateItems = shouldUseFlatFilteredItems ? flatFilteredItems : valuesRef.current;
    const storeActiveIndex = store.state.activeIndex;
    if (storeActiveIndex == null) {
      if (autoHighlightMode === "always" && candidateItems.length > 0) {
        store.set("activeIndex", 0);
        return;
      }
      emitHighlight(void 0, -1, none);
      return;
    }
    if (storeActiveIndex >= candidateItems.length) {
      emitHighlight(void 0, -1, none);
      store.set("activeIndex", null);
      return;
    }
    const itemValue = candidateItems[storeActiveIndex];
    const previouslyHighlightedItemValue = lastHighlightRef.current.value;
    const isSameItem = previouslyHighlightedItemValue !== NO_ACTIVE_VALUE && compareItemEquality(itemValue, previouslyHighlightedItemValue, store.state.isItemEqualToValue);
    if (lastHighlightRef.current.index !== storeActiveIndex || !isSameItem) {
      emitHighlight(itemValue, storeActiveIndex, none);
    }
  }, [
    activeIndex,
    autoHighlightMode,
    emitHighlight,
    hasFilteredItemsProp,
    hasItems,
    flatFilteredItems,
    inline,
    open,
    store,
    // Reruns the effect when the query changes without affecting the deps above, such as
    // clearing the input when no items are filtered out (individually rendered items).
    inputValue
  ]);
  useIsoLayoutEffect(() => {
    if (selectionMode === "none") {
      setFilled(String(inputValue) !== "");
      return;
    }
    setFilled(multiple ? Array.isArray(selectedValue) && selectedValue.length > 0 : selectedValue != null);
  }, [setFilled, selectionMode, inputValue, selectedValue, multiple]);
  reactExports.useEffect(() => {
    if (hasItems && autoHighlightMode && flatFilteredItems.length === 0) {
      setIndices({
        activeIndex: null
      });
    }
  }, [hasItems, autoHighlightMode, flatFilteredItems.length, setIndices]);
  function isSelectedValueDirty(value) {
    const initialValue = validityData.initialValue;
    if (Array.isArray(value) && Array.isArray(initialValue)) {
      return !areArraysEqual(value, initialValue, (itemValue, initialItemValue) => compareItemEquality(itemValue, initialItemValue, isItemEqualToValue));
    }
    return value !== initialValue;
  }
  useValueChanged(query, () => {
    if (!open || query === "" || query === String(initialDefaultInputValue)) {
      return;
    }
    setQueryChangedAfterOpen(true);
  });
  function syncInputToSelectedLabel() {
    const nextInputValue = stringifyAsLabel(selectedValue, itemToStringLabel);
    if (inputValue !== nextInputValue) {
      setInputValue(nextInputValue, createChangeEventDetails(none));
    }
  }
  useValueChanged(selectedValue, () => {
    if (selectionMode === "none") {
      return;
    }
    clearErrors(name);
    setDirty(isSelectedValueDirty(selectedValue));
    validation.change(selectedValue);
    if (single && !hasInputValue && !inputInsidePopup) {
      syncInputToSelectedLabel();
    }
  });
  useValueChanged(inputValue, () => {
    if (selectionMode !== "none") {
      return;
    }
    clearErrors(name);
    setDirty(inputValue !== validityData.initialValue);
    validation.change(inputValue);
  });
  useValueChanged(items, () => {
    if (!single || hasInputValue || inputInsidePopup || queryChangedAfterOpen) {
      return;
    }
    syncInputToSelectedLabel();
  });
  const floatingRootContext = useFloatingRootContext({
    open: inline ? true : open,
    onOpenChange: setOpen,
    elements: {
      reference: inputInsidePopup ? triggerElement : inputElement,
      floating: positionerElement
    }
  });
  const ariaHasPopup = grid ? "grid" : "listbox";
  const expanded = open || inline;
  const ariaExpanded = expanded ? "true" : "false";
  const role = reactExports.useMemo(() => {
    const isPlainInput = inputElement?.tagName === "INPUT";
    const shouldTreatAsInput = inputElement == null || isPlainInput;
    const shouldApplyAria = shouldTreatAsInput || expanded;
    const reference = shouldTreatAsInput ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    if (shouldApplyAria) {
      reference.role = "combobox";
      reference["aria-expanded"] = ariaExpanded;
      reference["aria-haspopup"] = ariaHasPopup;
      reference["aria-controls"] = expanded ? listElement?.id : void 0;
      reference["aria-autocomplete"] = autoComplete;
    }
    return {
      reference,
      floating: {
        role: "presentation"
      }
    };
  }, [inputElement, expanded, ariaExpanded, ariaHasPopup, listElement?.id, autoComplete]);
  const click = useClick(floatingRootContext, {
    enabled: !readOnly && !disabled && openOnInputClick,
    event: "mousedown-only",
    toggle: false,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: inputInsidePopup ? 0 : 100,
    reason: inputPress
  });
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !readOnly && !disabled && !inline,
    outsidePressEvent: {
      mouse: "sloppy",
      // The visual viewport (affected by the mobile software keyboard) can be
      // somewhat small. The user may want to scroll the screen to see more of
      // the popup.
      touch: "intentional"
    },
    // Without a popup, let the Escape key bubble the event up to other popups' handlers.
    bubbles: inline ? true : void 0,
    outsidePress(event) {
      const target = getTarget(event);
      return !contains(triggerElement, target) && !contains(clearRef.current, target) && !contains(chipsContainerRef.current, target) && !contains(inputGroupElement, target);
    }
  });
  const listNavigation2 = useListNavigation(floatingRootContext, {
    enabled: !readOnly && !disabled,
    id,
    listRef,
    activeIndex,
    selectedIndex,
    virtual: true,
    loopFocus,
    allowEscape: loopFocus && !autoHighlightMode,
    focusItemOnOpen: queryChangedAfterOpen || selectionMode === "none" && !autoHighlightMode ? false : "auto",
    focusItemOnHover: highlightItemOnHover,
    resetOnPointerLeave: !keepHighlight,
    orientation: grid ? "horizontal" : void 0,
    rtl: direction === "rtl",
    disabledIndices: EMPTY_ARRAY,
    grid: grid ? gridNavigation : void 0,
    onNavigate(nextActiveIndex, event) {
      if (!event && !open || transitionStatus === "ending") {
        return;
      }
      if (!event) {
        setIndices({
          activeIndex: nextActiveIndex
        });
      } else {
        setIndices({
          activeIndex: nextActiveIndex,
          type: keyboardActiveRef.current ? keyboard : pointer
        });
      }
    }
  });
  const inputProps = reactExports.useMemo(() => mergeProps(listNavigation2.reference, {
    onKeyDown(event) {
      if (grid && store.state.activeIndex == null && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventBaseUIHandler();
      }
    }
  }, dismiss.reference, click.reference, role.reference), [listNavigation2.reference, dismiss.reference, click.reference, role.reference, grid, store]);
  const popupProps = reactExports.useMemo(() => mergeProps(FOCUSABLE_POPUP_PROPS, dismiss.floating), [dismiss.floating]);
  const listProps = reactExports.useMemo(() => mergeProps(listNavigation2.floating, role.floating), [listNavigation2.floating, role.floating]);
  const itemProps = reactExports.useMemo(() => {
    const listNavigationItemProps = listNavigation2.item;
    if (!listNavigationItemProps) {
      return EMPTY_OBJECT;
    }
    return {
      ...listNavigationItemProps,
      onFocus: void 0
    };
  }, [listNavigation2.item]);
  useOnFirstRender(() => {
    store.update({
      inline: inlineProp,
      popupProps,
      listProps,
      inputProps,
      triggerProps,
      itemProps,
      setOpen,
      setInputValue,
      setSelectedValue,
      setIndices,
      handleSelection,
      forceMount,
      requestSubmit,
      onOpenChangeComplete
    });
  });
  useIsoLayoutEffect(() => {
    store.update({
      id,
      selectedValue,
      open,
      mounted,
      transitionStatus,
      items,
      inline: inlineProp,
      popupProps,
      listProps,
      inputProps,
      triggerProps,
      openMethod,
      itemProps,
      selectionMode,
      name,
      form,
      disabled,
      readOnly,
      required,
      grid,
      virtualized,
      openOnInputClick,
      itemToStringLabel,
      modal,
      autoHighlight: autoHighlightMode,
      isItemEqualToValue,
      submitOnItemClick,
      hasInputValue,
      inputOwnsFormValue: selectionMode === "none" && (inlineProp || !store.state.inputInsidePopup)
    });
  }, [store, id, selectedValue, open, mounted, transitionStatus, items, popupProps, listProps, inputProps, itemProps, openMethod, triggerProps, selectionMode, name, disabled, readOnly, required, grid, virtualized, openOnInputClick, itemToStringLabel, modal, isItemEqualToValue, submitOnItemClick, hasInputValue, inlineProp, autoHighlightMode, form]);
  const hiddenInputRef = useMergedRefs(inputRefProp, validation.inputRef);
  const itemsContextValue = reactExports.useMemo(() => ({
    query,
    hasItems,
    filteredItems,
    flatFilteredItems
  }), [query, hasItems, filteredItems, flatFilteredItems]);
  const serializedValue = reactExports.useMemo(() => {
    if (Array.isArray(fieldRawValue)) {
      return "";
    }
    return stringifyAsValue(fieldRawValue, itemToStringValue);
  }, [fieldRawValue, itemToStringValue]);
  const hasMultipleSelection = multiple && Array.isArray(selectedValue) && selectedValue.length > 0;
  const hiddenInputName = multiple || selectionMode === "none" && inputOwnsFormValue ? void 0 : name;
  const hiddenInputs = reactExports.useMemo(() => {
    if (!multiple || !Array.isArray(selectedValue) || !name) {
      return null;
    }
    return selectedValue.map((value) => {
      const currentSerializedValue = stringifyAsValue(value, itemToStringValue);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        type: "hidden",
        form,
        name,
        value: currentSerializedValue,
        disabled
      }, currentSerializedValue);
    });
  }, [multiple, selectedValue, form, name, itemToStringValue, disabled]);
  const children = /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [props.children, /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      ...validation.getValidationProps(disabled, {
        // Move focus when the hidden input is focused.
        onFocus() {
          if (inputInsidePopup) {
            triggerElement?.focus();
            return;
          }
          (inputRef.current || triggerElement)?.focus();
        },
        // Handle browser autofill.
        onChange(event) {
          if (event.nativeEvent.defaultPrevented || disabled || readOnly) {
            return;
          }
          const nextValue = event.currentTarget.value;
          const nextValueLower = nextValue.toLowerCase();
          const details = createChangeEventDetails(none, event.nativeEvent);
          const findSerializedMatchIndex = () => valuesRef.current.findIndex((candidate) => stringifyAsValue(candidate, itemToStringValue).toLowerCase() === nextValueLower || stringifyAsLabel(candidate, itemToStringLabel).toLowerCase() === nextValueLower);
          function handleChange() {
            if (multiple) {
              return;
            }
            if (selectionMode === "none") {
              setInputValue(nextValue, details);
              return;
            }
            let matchingIndex = findSerializedMatchIndex();
            if (matchingIndex === -1) {
              matchingIndex = valuesRef.current.findIndex((_, index) => {
                const renderedLabel = labelsRef.current[index];
                return renderedLabel != null && renderedLabel.toLowerCase() === nextValueLower;
              });
            }
            const matchingValue = matchingIndex === -1 ? void 0 : valuesRef.current[matchingIndex];
            if (matchingValue != null) {
              setSelectedValue?.(matchingValue, details);
            }
          }
          if (single) {
            forceMount();
            if (items && findSerializedMatchIndex() === -1) {
              store.set("forceMounted", true);
            }
          }
          queueMicrotask(handleChange);
        }
      }),
      id: id && hiddenInputName == null ? `${id}-hidden-input` : void 0,
      form,
      name: hiddenInputName,
      autoComplete: formAutoComplete,
      disabled,
      required: required && !hasMultipleSelection,
      readOnly,
      value: serializedValue,
      ref: hiddenInputRef,
      style: hiddenInputName ? visuallyHiddenInput : visuallyHidden,
      tabIndex: -1,
      "aria-hidden": true,
      suppressHydrationWarning: true
    }), hiddenInputs]
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxRootContext.Provider, {
    value: store,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxFloatingContext.Provider, {
      value: floatingRootContext,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxHasItemsContext.Provider, {
        value: hasItems,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxDerivedItemsContext.Provider, {
          value: itemsContextValue,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxInputValueContext.Provider, {
            value: inputValue,
            children
          })
        })
      })
    })
  });
}
const triggerStateAttributesMapping = {
  ...pressableTriggerOpenStateMapping,
  ...fieldValidityMapping,
  popupSide: (side) => side ? {
    "data-popup-side": side
  } : null,
  listEmpty: (empty) => empty ? {
    "data-list-empty": ""
  } : null
};
function usePopupSide(store) {
  const mounted = useStore(store, selectors.mounted);
  const popupSide = useStore(store, selectors.popupSide);
  const positionerElement = useStore(store, selectors.positionerElement);
  return mounted && positionerElement ? popupSide : null;
}
function useListEmpty() {
  return useComboboxDerivedItemsContext().filteredItems.length === 0;
}
function getChipNavigationKeys(direction) {
  return direction === "rtl" ? ["ArrowRight", "ArrowLeft"] : ["ArrowLeft", "ArrowRight"];
}
function getIndexAfterChipRemoval(index, chipCount) {
  const nextIndex = index >= chipCount - 1 ? chipCount - 2 : index;
  return nextIndex >= 0 ? nextIndex : void 0;
}
function clickHighlightedItem(store, activeIndex, nativeEvent) {
  const listItem = store.state.listRef.current[activeIndex];
  if (listItem) {
    store.state.selectionEventRef.current = nativeEvent;
    listItem.click();
    store.state.selectionEventRef.current = null;
  }
}
const ComboboxTrigger = /* @__PURE__ */ reactExports.forwardRef(function ComboboxTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    nativeButton = true,
    disabled: disabledProp = false,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    disabled: fieldDisabled,
    setTouched,
    setFocused,
    validationMode,
    validation
  } = useFieldRootContext();
  const {
    labelId: fieldLabelId
  } = useLabelableContext();
  const store = useComboboxRootContext();
  const selectionMode = useStore(store, selectors.selectionMode);
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const required = useStore(store, selectors.required);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const storedPopupId = useStore(store, selectors.popupId);
  const triggerProps = useStore(store, selectors.triggerProps);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const rootId = useStore(store, selectors.id);
  const comboboxLabelId = useStore(store, selectors.labelId);
  const open = useStore(store, selectors.open);
  const selectedValue = useStore(store, selectors.selectedValue);
  const activeIndex = useStore(store, selectors.activeIndex);
  const selectedIndex = useStore(store, selectors.selectedIndex);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const floatingRootContext = useComboboxFloatingContext();
  const inputValue = useComboboxInputValueContext();
  const focusTimeout = useTimeout();
  const disabled = fieldDisabled || comboboxDisabled || disabledProp;
  const listEmpty = useListEmpty();
  const popupSide = usePopupSide(store);
  useLabelableId({
    id: inputInsidePopup ? idProp : void 0
  });
  const id = inputInsidePopup ? idProp ?? rootId : idProp;
  const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, comboboxLabelId);
  let ariaControls;
  if (open && inputInsidePopup) {
    ariaControls = storedPopupId ?? getComboboxPopupId(rootId);
  } else if (open) {
    ariaControls = listElement?.id;
  }
  const currentPointerTypeRef = reactExports.useRef("");
  function trackPointerType(event) {
    currentPointerTypeRef.current = event.pointerType;
  }
  const {
    reference: triggerTypeaheadProps
  } = useTypeahead(floatingRootContext, {
    enabled: !open && !readOnly && !comboboxDisabled && selectionMode === "single",
    listRef: store.state.labelsRef,
    activeIndex,
    selectedIndex,
    onMatch(index) {
      const nextSelectedValue = store.state.valuesRef.current[index];
      if (nextSelectedValue !== void 0) {
        store.state.setSelectedValue(nextSelectedValue, createChangeEventDetails(none));
      }
    }
  });
  const {
    reference: triggerClickProps
  } = useClick(floatingRootContext, {
    enabled: !readOnly && !comboboxDisabled,
    event: "mousedown"
  });
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    native: nativeButton,
    disabled
  });
  const state = {
    ...fieldState,
    open,
    disabled,
    popupSide,
    listEmpty,
    placeholder: selectionMode === "none" ? false : !hasSelectedValue
  };
  const setTriggerElement = useStableCallback((element2) => {
    store.set("triggerElement", element2);
  });
  const element = useRenderElement("button", componentProps, {
    ref: [forwardedRef, buttonRef, setTriggerElement],
    state,
    props: [triggerProps, triggerClickProps, triggerTypeaheadProps, {
      id,
      tabIndex: inputInsidePopup ? 0 : -1,
      role: inputInsidePopup ? "combobox" : void 0,
      "aria-expanded": open,
      "aria-haspopup": inputInsidePopup ? "dialog" : "listbox",
      "aria-controls": ariaControls,
      "aria-required": inputInsidePopup ? required || void 0 : void 0,
      "aria-labelledby": ariaLabelledBy,
      onPointerDown: trackPointerType,
      onPointerEnter: trackPointerType,
      onFocus() {
        setFocused(true);
        if (disabled || readOnly) {
          return;
        }
        focusTimeout.start(0, store.state.forceMount);
      },
      onBlur(event) {
        if (contains(positionerElement, event.relatedTarget)) {
          return;
        }
        setTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          const valueToValidate = selectionMode === "none" ? inputValue : selectedValue;
          validation.commit(valueToValidate);
        }
      },
      onMouseDown(event) {
        if (disabled || readOnly) {
          return;
        }
        if (!inputInsidePopup) {
          floatingRootContext.set("domReferenceElement", event.currentTarget);
        }
        store.state.forceMount();
        if (currentPointerTypeRef.current !== "touch") {
          store.state.inputRef.current?.focus();
          if (!inputInsidePopup) {
            event.preventDefault();
          }
        }
        if (open) {
          return;
        }
        const doc = ownerDocument(event.currentTarget);
        function handleMouseUp(mouseEvent) {
          const currentTriggerElement = store.state.triggerElement;
          if (!currentTriggerElement) {
            return;
          }
          const mouseUpTarget = getTarget(mouseEvent);
          const positioner = store.state.positionerElement;
          const list = store.state.listElement;
          if (contains(currentTriggerElement, mouseUpTarget) || contains(positioner, mouseUpTarget) || contains(list, mouseUpTarget)) {
            return;
          }
          if (isMouseWithinBounds(mouseEvent, currentTriggerElement)) {
            return;
          }
          store.state.setOpen(false, createChangeEventDetails(cancelOpen, mouseEvent));
        }
        if (inputInsidePopup) {
          doc.addEventListener("mouseup", handleMouseUp, {
            once: true
          });
        }
      },
      onKeyDown(event) {
        if (readOnly) {
          return;
        }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          stopEvent(event);
          store.state.setOpen(true, createChangeEventDetails(listNavigation, event.nativeEvent));
          store.state.inputRef.current?.focus();
        }
      }
    }, validation.getValidationProps(disabled, elementProps), getButtonProps],
    stateAttributesMapping: triggerStateAttributesMapping
  });
  return element;
});
const ComboboxChipsContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useComboboxChipsContext() {
  return reactExports.useContext(ComboboxChipsContext);
}
const ComboboxPositionerContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useComboboxPositionerContext(optional) {
  const context = reactExports.useContext(ComboboxPositionerContext);
  if (context === void 0 && !optional) {
    throw new Error(formatErrorMessage(21));
  }
  return context;
}
const ComboboxInternalDismissButton = /* @__PURE__ */ reactExports.forwardRef(function ComboboxInternalDismissButton2(_, forwardedRef) {
  const store = useComboboxRootContext();
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    native: false
  });
  const mergedRef = useMergedRefs(forwardedRef, buttonRef);
  function handleDismiss(event) {
    store.state.setOpen(false, createChangeEventDetails(closePress, event.nativeEvent, event.currentTarget));
  }
  const dismissProps = getButtonProps({
    onClick: handleDismiss
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
    ref: mergedRef,
    ...dismissProps,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: visuallyHiddenInput
  });
});
const ComboboxInput = /* @__PURE__ */ reactExports.forwardRef(function ComboboxInput2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    disabled: fieldDisabled,
    setTouched,
    setFocused,
    validationMode,
    validation
  } = useFieldRootContext();
  const {
    labelId: fieldLabelId
  } = useLabelableContext();
  const comboboxChipsContext = useComboboxChipsContext();
  const positioning = useComboboxPositionerContext(true);
  const hasPositionerParent = Boolean(positioning);
  const store = useComboboxRootContext();
  const inputValue = useComboboxInputValueContext();
  const direction = useDirection();
  const required = useStore(store, selectors.required);
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const name = useStore(store, selectors.name);
  const form = useStore(store, selectors.form);
  const selectionMode = useStore(store, selectors.selectionMode);
  const autoHighlightMode = useStore(store, selectors.autoHighlight);
  const inputProps = useStore(store, selectors.inputProps);
  const triggerProps = useStore(store, selectors.triggerProps);
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const selectedValue = useStore(store, selectors.selectedValue);
  const rootId = useStore(store, selectors.id);
  const inline = useStore(store, selectors.inline);
  const modal = useStore(store, selectors.modal);
  const autoHighlightEnabled = Boolean(autoHighlightMode);
  const popupSide = usePopupSide(store);
  const disabled = fieldDisabled || comboboxDisabled || disabledProp;
  const listEmpty = useListEmpty();
  const isInsidePopup = hasPositionerParent || inline;
  const focusManagerModal = !isInsidePopup || modal;
  const id = useBaseUiId(idProp ?? (!isInsidePopup ? rootId : void 0));
  const fieldStateForInput = hasPositionerParent ? DEFAULT_FIELD_STATE_ATTRIBUTES : fieldState;
  const [composingValue, setComposingValue] = reactExports.useState(null);
  const isComposingRef = reactExports.useRef(false);
  const lastActiveIndexRef = reactExports.useRef(null);
  const shouldRestoreActiveIndexRef = reactExports.useRef(false);
  const inputOwnsFormValue = selectionMode === "none" && !hasPositionerParent;
  const setInputElement = useStableCallback((element2) => {
    const nextIsInsidePopup = hasPositionerParent || store.state.inline;
    if (nextIsInsidePopup && !store.state.hasInputValue) {
      store.state.setInputValue("", createChangeEventDetails(none));
    }
    store.update({
      inputElement: element2,
      inputInsidePopup: nextIsInsidePopup,
      inputOwnsFormValue
    });
  });
  const validationProps = hasPositionerParent ? elementProps : validation.getValidationProps(disabled, elementProps);
  function clearHighlight() {
    store.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: store.state.keyboardActiveRef.current ? keyboard : pointer
    });
  }
  function markPointerActive() {
    store.state.keyboardActiveRef.current = false;
  }
  const state = {
    ...fieldStateForInput,
    open,
    disabled,
    readOnly,
    popupSide,
    listEmpty
  };
  function handleKeyDown(event) {
    if (!comboboxChipsContext) {
      return void 0;
    }
    let nextIndex;
    const {
      highlightedChipIndex
    } = comboboxChipsContext;
    const renderedChipsCount = comboboxChipsContext.chipsRef.current.length;
    const [previousChipKey, nextChipKey] = getChipNavigationKeys(direction);
    if (highlightedChipIndex !== void 0) {
      if (event.key === previousChipKey) {
        event.preventDefault();
        if (highlightedChipIndex > 0) {
          nextIndex = highlightedChipIndex - 1;
        } else {
          nextIndex = void 0;
        }
      } else if (event.key === nextChipKey) {
        event.preventDefault();
        if (highlightedChipIndex < renderedChipsCount - 1) {
          nextIndex = highlightedChipIndex + 1;
        } else {
          nextIndex = void 0;
        }
      } else if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        nextIndex = getIndexAfterChipRemoval(highlightedChipIndex, selectedValue.length);
        clearHighlight();
      }
      return nextIndex;
    }
    if (event.key === previousChipKey && (event.currentTarget.selectionStart ?? 0) === 0 && selectedValue.length > 0) {
      event.preventDefault();
      nextIndex = renderedChipsCount > 0 ? renderedChipsCount - 1 : void 0;
    }
    return nextIndex;
  }
  const element = useRenderElement("input", componentProps, {
    state,
    ref: [forwardedRef, store.state.inputRef, setInputElement],
    props: [inputProps, triggerProps, {
      value: composingValue ?? inputValue,
      "aria-readonly": readOnly || void 0,
      "aria-required": required || void 0,
      "aria-labelledby": fieldLabelId,
      disabled,
      readOnly,
      required: selectionMode === "none" ? required : void 0,
      form,
      ...inputOwnsFormValue && name && {
        name
      },
      id,
      onFocus() {
        setFocused(true);
        if (!inline || !shouldRestoreActiveIndexRef.current) {
          return;
        }
        shouldRestoreActiveIndexRef.current = false;
        const nextActiveIndex = lastActiveIndexRef.current;
        if (nextActiveIndex == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(store.state.valuesRef.current, nextActiveIndex)) {
          return;
        }
        store.state.setIndices({
          activeIndex: nextActiveIndex
        });
      },
      onBlur() {
        setTouched(true);
        setFocused(false);
        const activeIndex = store.state.activeIndex;
        if (inline && activeIndex !== null && autoHighlightMode !== "always") {
          lastActiveIndexRef.current = activeIndex;
          shouldRestoreActiveIndexRef.current = true;
          store.state.setIndices({
            activeIndex: null
          });
        }
        if (validationMode === "onBlur") {
          const valueToValidate = selectionMode === "none" ? inputValue : selectedValue;
          validation.commit(valueToValidate);
        }
      },
      onCompositionStart(event) {
        if (android) {
          return;
        }
        isComposingRef.current = true;
        setComposingValue(event.currentTarget.value);
      },
      onCompositionEnd(event) {
        isComposingRef.current = false;
        const next = event.currentTarget.value;
        setComposingValue(null);
        store.state.setInputValue(next, createChangeEventDetails(inputChange, event.nativeEvent));
      },
      onChange(event) {
        const nativeEvent = event.nativeEvent;
        const inputType = nativeEvent.inputType;
        const autofillLikeInput = !inputType || inputType === "insertReplacementText";
        const shouldOpenOnInput = isComposingRef.current || !autofillLikeInput;
        function maybeOpenOnInput(trimmed) {
          if (readOnly || disabled || !trimmed || !shouldOpenOnInput) {
            return;
          }
          store.state.setOpen(true, createChangeEventDetails(inputChange, nativeEvent));
          if (!autoHighlightEnabled) {
            clearHighlight();
          }
        }
        if (isComposingRef.current) {
          const nextVal = event.currentTarget.value;
          setComposingValue(nextVal);
          if (nextVal === "" && !store.state.openOnInputClick && !store.state.inputInsidePopup) {
            store.state.setOpen(false, createChangeEventDetails(inputClear, nativeEvent));
          }
          const trimmed = nextVal.trim();
          const shouldMaintainHighlight = autoHighlightEnabled && trimmed !== "";
          maybeOpenOnInput(trimmed);
          if (open && store.state.activeIndex !== null && !shouldMaintainHighlight) {
            clearHighlight();
          }
          return;
        }
        const inputChangeDetails = createChangeEventDetails(inputChange, nativeEvent);
        store.state.setInputValue(event.currentTarget.value, inputChangeDetails);
        if (inputChangeDetails.isCanceled) {
          return;
        }
        const empty = event.currentTarget.value === "";
        const clearDetails = createChangeEventDetails(inputClear, nativeEvent);
        if (empty && !store.state.inputInsidePopup) {
          if (selectionMode === "single") {
            store.state.setSelectedValue(null, clearDetails);
          }
          if (!store.state.openOnInputClick) {
            store.state.setOpen(false, clearDetails);
          }
        }
        maybeOpenOnInput(event.currentTarget.value.trim());
        if (open && store.state.activeIndex !== null && !autoHighlightEnabled) {
          clearHighlight();
        }
      },
      onKeyDown(event) {
        if (disabled || readOnly) {
          return;
        }
        if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
          return;
        }
        store.state.keyboardActiveRef.current = true;
        const input = event.currentTarget;
        const scrollAmount = input.scrollWidth - input.clientWidth;
        const isRTL = direction === "rtl";
        if (event.key === "Home") {
          stopEvent(event);
          const cursor = gecko && isRTL ? input.value.length : 0;
          input.setSelectionRange(cursor, cursor);
          input.scrollLeft = 0;
          return;
        }
        if (event.key === "End") {
          stopEvent(event);
          const cursor = gecko && isRTL ? 0 : input.value.length;
          input.setSelectionRange(cursor, cursor);
          input.scrollLeft = isRTL ? -scrollAmount : scrollAmount;
          return;
        }
        if (!mounted && event.key === "Escape") {
          const isClear = selectionMode === "multiple" && Array.isArray(selectedValue) ? selectedValue.length === 0 : selectedValue === null;
          const details = createChangeEventDetails(escapeKey, event.nativeEvent);
          const value = selectionMode === "multiple" ? [] : null;
          store.state.setInputValue("", details);
          store.state.setSelectedValue(value, details);
          if (!isClear && !store.state.inline && !details.isPropagationAllowed) {
            event.stopPropagation();
          }
          return;
        }
        if (comboboxChipsContext && event.key === "Backspace" && input.value === "" && comboboxChipsContext.highlightedChipIndex === void 0 && Array.isArray(selectedValue) && selectedValue.length > 0) {
          const renderedChipsCount = comboboxChipsContext.chipsRef.current.length;
          const removalIndex = renderedChipsCount > 0 ? renderedChipsCount - 1 : selectedValue.length - 1;
          const newValue = selectedValue.filter((_, index) => index !== removalIndex);
          clearHighlight();
          store.state.setSelectedValue(newValue, createChangeEventDetails(none, event.nativeEvent));
          return;
        }
        const hadHighlightedChip = comboboxChipsContext?.highlightedChipIndex !== void 0;
        const nextIndex = handleKeyDown(event);
        comboboxChipsContext?.setHighlightedChipIndex(nextIndex);
        if (nextIndex !== void 0) {
          comboboxChipsContext?.chipsRef.current[nextIndex]?.focus();
        } else if (hadHighlightedChip) {
          store.state.inputRef.current?.focus();
        }
        if (event.which === 229) {
          return;
        }
        if (event.key === "Enter" && open) {
          const activeIndex = store.state.activeIndex;
          const nativeEvent = event.nativeEvent;
          if (activeIndex === null) {
            if (inline) {
              return;
            }
            store.state.setOpen(false, createChangeEventDetails(none, nativeEvent));
            return;
          }
          stopEvent(event);
          clickHighlightedItem(store, activeIndex, nativeEvent);
        }
      },
      onPointerMove: markPointerActive,
      onPointerDown: markPointerActive
    }, validationProps],
    stateAttributesMapping: triggerStateAttributesMapping
  });
  const renderedInput = hasPositionerParent ? /* @__PURE__ */ jsxRuntimeExports.jsx(FieldRootContext.Provider, {
    value: DEFAULT_FIELD_ROOT_CONTEXT,
    children: element
  }) : element;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [open && focusManagerModal && /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxInternalDismissButton, {
      ref: store.state.startDismissRef
    }), renderedInput]
  });
});
function handleInputPress(event, store, disabled, readOnly, shouldIgnoreTarget) {
  if (event.baseUIHandlerPrevented || readOnly) {
    return;
  }
  const target = getTarget(event.nativeEvent);
  const targetElement = isElement(target) ? target : null;
  if (targetElement !== event.currentTarget && (shouldIgnoreTarget?.(targetElement) || isInteractiveElement(targetElement))) {
    return;
  }
  event.preventDefault();
  if (disabled) {
    return;
  }
  store.state.inputRef.current?.focus();
  if (store.state.openOnInputClick) {
    store.state.setOpen(true, createChangeEventDetails(inputPress, event.nativeEvent));
  }
}
const ComboboxInputGroup = /* @__PURE__ */ reactExports.forwardRef(function ComboboxInputGroup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState
  } = useFieldRootContext();
  const store = useComboboxRootContext();
  const open = useStore(store, selectors.open);
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const selectionMode = useStore(store, selectors.selectionMode);
  const popupSide = usePopupSide(store);
  const disabled = comboboxDisabled;
  const listEmpty = useListEmpty();
  const placeholder = selectionMode === "none" ? false : !hasSelectedValue;
  const state = {
    ...fieldState,
    open,
    disabled,
    readOnly,
    popupSide,
    listEmpty,
    placeholder
  };
  const setInputGroupElement = useStableCallback((element) => {
    store.set("inputGroupElement", element);
  });
  return useRenderElement("div", componentProps, {
    ref: [forwardedRef, setInputGroupElement],
    props: [{
      role: "group",
      onMouseDown(event) {
        handleInputPress(event, store, disabled, readOnly, (target) => {
          return contains(store.state.chipsContainerRef.current, target);
        });
      }
    }, elementProps],
    state,
    stateAttributesMapping: triggerStateAttributesMapping
  });
});
const ComboboxIcon = /* @__PURE__ */ reactExports.forwardRef(function ComboboxIcon2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const element = useRenderElement("span", componentProps, {
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: "▼"
    }, elementProps]
  });
  return element;
});
const stateAttributesMapping$1 = {
  ...transitionStatusMapping,
  ...triggerOpenStateMapping
};
const ComboboxClear = /* @__PURE__ */ reactExports.forwardRef(function ComboboxClear2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    nativeButton = true,
    keepMounted = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    disabled: fieldDisabled
  } = useFieldRootContext();
  const store = useComboboxRootContext();
  const selectionMode = useStore(store, selectors.selectionMode);
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const open = useStore(store, selectors.open);
  const selectedValue = useStore(store, selectors.selectedValue);
  const hasSelectionChips = useStore(store, selectors.hasSelectionChips);
  const inputValue = useComboboxInputValueContext();
  let visible = false;
  if (selectionMode === "none") {
    visible = inputValue !== "";
  } else if (selectionMode === "single") {
    visible = selectedValue != null;
  } else {
    visible = hasSelectionChips;
  }
  const disabled = fieldDisabled || comboboxDisabled || disabledProp;
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    native: nativeButton,
    disabled
  });
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(visible);
  const state = {
    disabled,
    visible,
    open,
    transitionStatus
  };
  useOpenChangeComplete({
    open: visible,
    ref: store.state.clearRef,
    onComplete() {
      if (!visible) {
        setMounted(false);
      }
    }
  });
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef, store.state.clearRef],
    props: [{
      tabIndex: -1,
      children: "x",
      // Avoid stealing focus from the input.
      onMouseDown(event) {
        event.preventDefault();
      },
      onClick(event) {
        if (disabled || readOnly) {
          return;
        }
        const type = store.state.keyboardActiveRef.current ? keyboard : pointer;
        store.state.setInputValue("", createChangeEventDetails(clearPress, event.nativeEvent));
        if (selectionMode !== "none") {
          store.state.setSelectedValue(Array.isArray(selectedValue) ? [] : null, createChangeEventDetails(clearPress, event.nativeEvent));
          store.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type
          });
        } else {
          store.state.setIndices({
            activeIndex: null,
            type
          });
        }
        store.state.inputRef.current?.focus();
      }
    }, elementProps, getButtonProps],
    stateAttributesMapping: stateAttributesMapping$1
  });
  const shouldRender = keepMounted || mounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
const GroupCollectionContext = /* @__PURE__ */ reactExports.createContext(null);
function useGroupCollectionContext() {
  return reactExports.useContext(GroupCollectionContext);
}
function GroupCollectionProvider(props) {
  const {
    children,
    items
  } = props;
  const contextValue = reactExports.useMemo(() => ({
    items
  }), [items]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupCollectionContext.Provider, {
    value: contextValue,
    children
  });
}
function ComboboxCollection(props) {
  const {
    children
  } = props;
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const groupContext = useGroupCollectionContext();
  const itemsToRender = groupContext ? groupContext.items : filteredItems;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, {
    children: itemsToRender.map(children)
  });
}
const ComboboxList = /* @__PURE__ */ reactExports.forwardRef(function ComboboxList2(componentProps, forwardedRef) {
  var _ComboboxCollection;
  const {
    render,
    className,
    style,
    children,
    ...elementProps
  } = componentProps;
  const store = useComboboxRootContext();
  const floatingRootContext = useComboboxFloatingContext();
  const hasPositionerContext = Boolean(useComboboxPositionerContext(true));
  const {
    filteredItems,
    hasItems
  } = useComboboxDerivedItemsContext();
  const selectionMode = useStore(store, selectors.selectionMode);
  const grid = useStore(store, selectors.grid);
  const listProps = useStore(store, selectors.listProps);
  const virtualized = useStore(store, selectors.virtualized);
  const forceMounted = useStore(store, selectors.forceMounted);
  const multiple = selectionMode === "multiple";
  const empty = filteredItems.length === 0;
  const setPositionerElement = useStableCallback((element2) => {
    store.set("positionerElement", element2);
  });
  const setListElement = useStableCallback((element2) => {
    store.set("listElement", element2);
  });
  const resolvedChildren = reactExports.useMemo(() => {
    if (typeof children === "function") {
      return _ComboboxCollection || (_ComboboxCollection = /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxCollection, {
        children
      }));
    }
    return children;
  }, [children]);
  const state = {
    empty
  };
  const floatingId = floatingRootContext.useState("floatingId");
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, setListElement, hasPositionerContext ? null : setPositionerElement],
    props: [listProps, {
      children: resolvedChildren,
      tabIndex: -1,
      id: floatingId,
      role: grid ? "grid" : "listbox",
      "aria-multiselectable": multiple ? "true" : void 0,
      onKeyDown(event) {
        if (store.state.disabled || store.state.readOnly) {
          return;
        }
        if (event.key === "Enter") {
          const activeIndex = store.state.activeIndex;
          if (activeIndex == null) {
            return;
          }
          stopEvent(event);
          clickHighlightedItem(store, activeIndex, event.nativeEvent);
        }
      },
      onKeyDownCapture() {
        store.state.keyboardActiveRef.current = true;
      },
      onPointerMoveCapture() {
        store.state.keyboardActiveRef.current = false;
      }
    }, elementProps]
  });
  if (virtualized) {
    return element;
  }
  const labelsRef = hasItems && !forceMounted ? void 0 : store.state.labelsRef;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeList, {
    elementsRef: store.state.listRef,
    labelsRef,
    children: element
  });
});
const LIVE_REGION_MARKER = "⁠";
const INITIAL_LIVE_REGION_TEXT_MUTATION_RESET_DELAY = 200;
function findLastTextNode(root) {
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let lastTextNode = null;
  while (walker.nextNode()) {
    const textNode = walker.currentNode;
    if (textNode.nodeValue !== "") {
      lastTextNode = textNode;
    }
  }
  return lastTextNode;
}
function useInitialLiveRegionTextMutation() {
  const timeout = useTimeout();
  const rootRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (ios) {
      return void 0;
    }
    const root = rootRef.current;
    if (root == null) {
      return void 0;
    }
    const textNode = findLastTextNode(root);
    if (textNode == null) {
      return void 0;
    }
    const originalValue = textNode.data;
    const markedValue = `${originalValue}${LIVE_REGION_MARKER}`;
    textNode.nodeValue = markedValue;
    timeout.start(INITIAL_LIVE_REGION_TEXT_MUTATION_RESET_DELAY, () => {
      if (textNode.nodeValue === markedValue) {
        textNode.nodeValue = originalValue;
      }
    });
    return () => {
      timeout.clear();
      if (textNode.nodeValue === markedValue) {
        textNode.nodeValue = originalValue;
      }
    };
  }, [rootRef, timeout]);
  return rootRef;
}
const ComboboxStatus = /* @__PURE__ */ reactExports.forwardRef(function ComboboxStatus2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children: childrenProp,
    ...elementProps
  } = componentProps;
  const statusRef = useInitialLiveRegionTextMutation();
  return useRenderElement("div", componentProps, {
    ref: [forwardedRef, statusRef],
    props: [{
      children: childrenProp,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": true
    }, elementProps]
  });
});
const ComboboxPortalContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useComboboxPortalContext() {
  const context = reactExports.useContext(ComboboxPortalContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(20));
  }
  return context;
}
const ComboboxPortal = /* @__PURE__ */ reactExports.forwardRef(function ComboboxPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const store = useComboboxRootContext();
  const mounted = useStore(store, selectors.mounted);
  const forceMounted = useStore(store, selectors.forceMounted);
  const shouldRender = mounted || keepMounted || forceMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
const ComboboxPositioner = /* @__PURE__ */ reactExports.forwardRef(function ComboboxPositioner2(componentProps, forwardedRef) {
  const {
    render,
    className,
    anchor,
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
    disableAnchorTracking = false,
    collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE,
    style: styleProp,
    ...elementProps
  } = componentProps;
  const store = useComboboxRootContext();
  const floatingRootContext = useComboboxFloatingContext();
  const keepMounted = useComboboxPortalContext();
  const modal = useStore(store, selectors.modal);
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const openMethod = useStore(store, selectors.openMethod);
  const positionerElement = useStore(store, selectors.positionerElement);
  const triggerElement = useStore(store, selectors.triggerElement);
  const inputElement = useStore(store, selectors.inputElement);
  const inputGroupElement = useStore(store, selectors.inputGroupElement);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const empty = useListEmpty();
  const resolvedAnchor = anchor ?? (inputInsidePopup ? triggerElement : inputGroupElement ?? inputElement);
  const positioning = useAnchorPositioning({
    anchor: resolvedAnchor,
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
    disableAnchorTracking,
    keepMounted,
    collisionAvoidance,
    lazyFlip: true
  });
  useAnchoredPopupScrollLock(open && modal, openMethod === "touch", positionerElement, triggerElement);
  const state = {
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    empty
  };
  useIsoLayoutEffect(() => {
    store.set("popupSide", positioning.side);
  }, [store, positioning.side]);
  const setPositionerElement = useStableCallback((element2) => {
    store.set("positionerElement", element2);
  });
  const element = usePositioner(componentProps, state, {
    styles: positioning.positionerStyles,
    transitionStatus,
    props: elementProps,
    refs: [forwardedRef, setPositionerElement],
    hidden: !mounted,
    inert: !open
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ComboboxPositionerContext.Provider, {
    value: positioning,
    children: [mounted && modal && /* @__PURE__ */ jsxRuntimeExports.jsx(InternalBackdrop, {
      inert: inertValue(!open),
      cutout: inputGroupElement ?? inputElement ?? triggerElement
    }), element]
  });
});
const stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
const ComboboxPopup = /* @__PURE__ */ reactExports.forwardRef(function ComboboxPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    initialFocus,
    finalFocus,
    ...elementProps
  } = componentProps;
  const store = useComboboxRootContext();
  const positioning = useComboboxPositionerContext();
  const floatingRootContext = useComboboxFloatingContext();
  const mounted = useStore(store, selectors.mounted);
  const open = useStore(store, selectors.open);
  const openMethod = useStore(store, selectors.openMethod);
  const popupProps = useStore(store, selectors.popupProps);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const inputInsidePopup = useStore(store, selectors.inputInsidePopup);
  const inputElement = useStore(store, selectors.inputElement);
  const modal = useStore(store, selectors.modal);
  const rootId = useStore(store, selectors.id);
  const empty = useListEmpty();
  const popupId = elementProps.id ?? (inputInsidePopup ? getComboboxPopupId(rootId) : void 0);
  useIsoLayoutEffect(() => {
    store.set("popupId", store.state.popupRef.current?.id || popupId);
    return () => {
      store.set("popupId", void 0);
    };
  }, [store, popupId]);
  useOpenChangeComplete({
    open,
    ref: store.state.popupRef,
    onComplete() {
      if (open) {
        store.state.onOpenChangeComplete(true);
      }
    }
  });
  const state = {
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    transitionStatus,
    empty
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.state.popupRef],
    props: [popupProps, {
      id: popupId,
      role: inputInsidePopup ? "dialog" : "presentation",
      onFocus(event) {
        const target = getTarget(event.nativeEvent);
        if (openMethod !== "touch" && (contains(store.state.listElement, target) || target === event.currentTarget)) {
          store.state.inputRef.current?.focus();
        }
      }
    }, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping
  });
  const computedDefaultInitialFocus = inputInsidePopup ? (interactionType) => interactionType === "touch" ? store.state.popupRef.current : inputElement : false;
  const resolvedInitialFocus = initialFocus === void 0 ? computedDefaultInitialFocus : initialFocus;
  let resolvedFinalFocus;
  if (finalFocus != null) {
    resolvedFinalFocus = finalFocus;
  } else {
    resolvedFinalFocus = inputInsidePopup ? void 0 : false;
  }
  const focusManagerModal = !inputInsidePopup || modal;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingFocusManager, {
    context: floatingRootContext,
    disabled: !mounted,
    modal: focusManagerModal,
    openInteractionType: openMethod,
    initialFocus: resolvedInitialFocus,
    returnFocus: resolvedFinalFocus,
    getInsideElements: () => [store.state.startDismissRef.current, store.state.endDismissRef.current],
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [element, focusManagerModal && /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxInternalDismissButton, {
        ref: store.state.endDismissRef
      })]
    })
  });
});
const ComboboxGroupContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useComboboxGroupContext() {
  const context = reactExports.useContext(ComboboxGroupContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(18));
  }
  return context;
}
const ComboboxGroup = /* @__PURE__ */ reactExports.forwardRef(function ComboboxGroup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    items,
    ...elementProps
  } = componentProps;
  const [labelId, setLabelId] = reactExports.useState();
  const contextValue = reactExports.useMemo(() => ({
    labelId,
    setLabelId,
    items
  }), [labelId, setLabelId, items]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      role: "group",
      "aria-labelledby": labelId
    }, elementProps]
  });
  const wrappedElement = /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxGroupContext.Provider, {
    value: contextValue,
    children: element
  });
  if (items) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupCollectionProvider, {
      items,
      children: wrappedElement
    });
  }
  return wrappedElement;
});
const ComboboxGroupLabel = /* @__PURE__ */ reactExports.forwardRef(function ComboboxGroupLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    setLabelId
  } = useComboboxGroupContext();
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
const ComboboxItemContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useComboboxItemContext() {
  const context = reactExports.useContext(ComboboxItemContext);
  if (!context) {
    throw new Error(formatErrorMessage(19));
  }
  return context;
}
const ComboboxRowContext = /* @__PURE__ */ reactExports.createContext(false);
function useComboboxRowContext() {
  return reactExports.useContext(ComboboxRowContext);
}
function ComboboxItemInner(props) {
  const {
    componentProps,
    forwardedRef,
    virtualized,
    indexFromFilter
  } = props;
  const {
    render,
    className,
    style,
    value: itemValue = null,
    index: indexProp,
    disabled: disabledProp = false,
    nativeButton = false,
    ...elementProps
  } = componentProps;
  const textRef = reactExports.useRef(null);
  const listItem = useCompositeListItem({
    guess: true,
    index: indexProp,
    textRef
  });
  const store = useComboboxRootContext();
  const isRow = useComboboxRowContext();
  const hasItems = useComboboxHasItemsContext();
  const selectionMode = useStore(store, selectors.selectionMode);
  const rootDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const disabled = rootDisabled || disabledProp;
  const selectable = selectionMode !== "none";
  const index = indexProp ?? indexFromFilter ?? listItem.index;
  const hasRegistered = index !== -1;
  const rootId = useStore(store, selectors.id);
  const highlighted = useStore(store, selectors.isActive, index);
  const matchesSelectedValue = useStore(store, selectors.isSelected, itemValue);
  const itemProps = useStore(store, selectors.itemProps);
  const itemRef = reactExports.useRef(null);
  const id = rootId != null && hasRegistered ? `${rootId}-${index}` : void 0;
  const selected = matchesSelectedValue && selectable;
  useIsoLayoutEffect(() => {
    const shouldRun = hasRegistered && (virtualized || indexProp != null);
    if (!shouldRun) {
      return void 0;
    }
    const list = store.state.listRef.current;
    list[index] = itemRef.current;
    return () => {
      delete list[index];
    };
  }, [hasRegistered, virtualized, index, indexProp, store]);
  useIsoLayoutEffect(() => {
    if (!hasRegistered || hasItems) {
      return void 0;
    }
    const visibleMap = store.state.valuesRef.current;
    visibleMap[index] = itemValue;
    return () => {
      delete visibleMap[index];
    };
  }, [hasRegistered, hasItems, index, itemValue, store]);
  useIsoLayoutEffect(() => {
    if (!hasRegistered || hasItems) {
      return;
    }
    const selectedValue = store.state.selectedValue;
    const lastSelectedValue = Array.isArray(selectedValue) ? selectedValue[selectedValue.length - 1] : selectedValue;
    if (compareItemEquality(itemValue, lastSelectedValue, isItemEqualToValue)) {
      store.set("selectedIndex", index);
    }
  }, [hasRegistered, hasItems, store, index, itemValue, isItemEqualToValue]);
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
  function commitSelection(nativeEvent) {
    function selectItem() {
      store.state.handleSelection(nativeEvent, itemValue);
    }
    if (store.state.submitOnItemClick) {
      reactDomExports.flushSync(selectItem);
      store.state.requestSubmit();
    } else {
      selectItem();
    }
  }
  const defaultProps = {
    id,
    role: isRow ? "gridcell" : "option",
    "aria-selected": selectable ? selected : void 0,
    // Focusable items steal focus from the input upon mouseup.
    // Warn if the user renders a natively focusable element like `<button>`,
    // as it should be a `<div>` instead.
    tabIndex: void 0,
    onPointerDownCapture(event) {
      if (event.isPrimary) {
        store.state.pointerDownItemRef.current = event.currentTarget;
      }
      event.preventDefault();
    },
    onMouseDown(event) {
      event.preventDefault();
    },
    onClick(event) {
      if (disabled || readOnly) {
        return;
      }
      commitSelection(event.nativeEvent);
    },
    onMouseUp(event) {
      const pointerStartedOnItem = store.state.pointerDownItemRef.current === event.currentTarget;
      store.state.pointerDownItemRef.current = null;
      if (disabled || readOnly || event.button !== 0 || pointerStartedOnItem || !highlighted) {
        return;
      }
      commitSelection(event.nativeEvent);
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [buttonRef, forwardedRef, listItem.ref, itemRef],
    state,
    props: [itemProps, defaultProps, elementProps, getButtonProps]
  });
  const contextValue = reactExports.useMemo(() => ({
    selected,
    textRef
  }), [selected, textRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItemContext.Provider, {
    value: contextValue,
    children: element
  });
}
function ComboboxItemVirtualizedIndex(props) {
  const {
    componentProps,
    forwardedRef
  } = props;
  const store = useComboboxRootContext();
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const {
    flatFilteredItems
  } = useComboboxDerivedItemsContext();
  const indexFromFilter = findItemIndex(flatFilteredItems, componentProps.value ?? null, isItemEqualToValue);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItemInner, {
    componentProps,
    forwardedRef,
    virtualized: true,
    indexFromFilter
  });
}
const ComboboxItem = /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef(function ComboboxItem2(componentProps, forwardedRef) {
  const store = useComboboxRootContext();
  const virtualized = useStore(store, selectors.virtualized);
  if (virtualized && componentProps.index == null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItemVirtualizedIndex, {
      componentProps,
      forwardedRef
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItemInner, {
    componentProps,
    forwardedRef,
    virtualized,
    indexFromFilter: void 0
  });
}));
const ComboboxEmpty = /* @__PURE__ */ reactExports.forwardRef(function ComboboxEmpty2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children: childrenProp,
    ...elementProps
  } = componentProps;
  const {
    filteredItems
  } = useComboboxDerivedItemsContext();
  const store = useComboboxRootContext();
  const emptyRef = useInitialLiveRegionTextMutation();
  const children = filteredItems.length === 0 ? childrenProp : null;
  return useRenderElement("div", componentProps, {
    ref: [forwardedRef, store.state.emptyRef, emptyRef],
    props: [{
      children,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": true
    }, elementProps]
  });
});
export {
  AriaCombobox as A,
  ComboboxTrigger as C,
  ComboboxInputGroup as a,
  ComboboxItem as b,
  ComboboxCollection as c,
  ComboboxInput as d,
  ComboboxIcon as e,
  ComboboxEmpty as f,
  ComboboxList as g,
  ComboboxGroup as h,
  ComboboxGroupLabel as i,
  ComboboxClear as j,
  ComboboxPortal as k,
  ComboboxPositioner as l,
  ComboboxPopup as m,
  ComboboxStatus as n,
  useComboboxRootContext as o,
  useComboboxItemContext as p,
  ComboboxChipsContext as q,
  handleInputPress as r,
  selectors as s,
  useComboboxChipsContext as t,
  useCoreFilter as u,
  getIndexAfterChipRemoval as v,
  getChipNavigationKeys as w
};
