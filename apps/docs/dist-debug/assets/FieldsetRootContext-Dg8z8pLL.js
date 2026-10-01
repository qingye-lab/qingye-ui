import { r as reactExports, V as formatErrorMessage } from "./index-DM02Iz28.js";
const FieldsetRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useFieldsetRootContext(optional = false) {
  const context = reactExports.useContext(FieldsetRootContext);
  if (!context && !optional) {
    throw new Error(formatErrorMessage(86));
  }
  return context;
}
export {
  FieldsetRootContext as F,
  useFieldsetRootContext as u
};
