function getDefaultLabelId(id) {
  return id == null ? void 0 : `${id}-label`;
}
function resolveAriaLabelledBy(fieldLabelId, localLabelId) {
  return fieldLabelId ?? localLabelId;
}
export {
  getDefaultLabelId as g,
  resolveAriaLabelledBy as r
};
