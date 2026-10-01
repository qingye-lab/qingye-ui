import { r as reactExports, a1 as useBaseUiId, a3 as useIsoLayoutEffect } from "./index-DM02Iz28.js";
function useAriaLabelledBy(explicitAriaLabelledBy, labelId, labelSourceRef, enableFallback = true, labelSourceId) {
  const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = reactExports.useState();
  const generatedLabelId = useBaseUiId(labelSourceId ? `${labelSourceId}-label` : void 0);
  const ariaLabelledBy = explicitAriaLabelledBy ?? labelId ?? fallbackAriaLabelledBy;
  useIsoLayoutEffect(() => {
    const nextAriaLabelledBy = explicitAriaLabelledBy || labelId || !enableFallback ? void 0 : getAriaLabelledBy(labelSourceRef.current, generatedLabelId);
    if (fallbackAriaLabelledBy !== nextAriaLabelledBy) {
      setFallbackAriaLabelledBy(nextAriaLabelledBy);
    }
  });
  return ariaLabelledBy;
}
function getAriaLabelledBy(labelSource, generatedLabelId) {
  const label = findAssociatedLabel(labelSource);
  if (!label) {
    return void 0;
  }
  if (!label.id && generatedLabelId) {
    label.id = generatedLabelId;
  }
  return label.id || void 0;
}
function findAssociatedLabel(labelSource) {
  if (!labelSource) {
    return void 0;
  }
  const parent = labelSource.parentElement;
  if (parent && parent.tagName === "LABEL") {
    return parent;
  }
  const controlId = labelSource.id;
  if (controlId) {
    const nextSibling = labelSource.nextElementSibling;
    if (nextSibling && nextSibling.htmlFor === controlId) {
      return nextSibling;
    }
  }
  const labels = labelSource.labels;
  return labels && labels[0];
}
export {
  useAriaLabelledBy as u
};
