import { c0 as shimExports, ab as NOOP, a_ as useCSPContext, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
const script = "";
function subscribe() {
  return NOOP;
}
function getSnapshot() {
  return false;
}
function getServerSnapshot() {
  return true;
}
function useIsHydrating() {
  return shimExports.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
function PrehydrationScript(props) {
  const {
    script: script2
  } = props;
  const {
    nonce
  } = useCSPContext();
  const isHydrating = useIsHydrating();
  if (!isHydrating) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
    nonce,
    dangerouslySetInnerHTML: {
      __html: script2
    },
    suppressHydrationWarning: true
  });
}
export {
  PrehydrationScript as P,
  script as s,
  useIsHydrating as u
};
