import { r as reactExports } from "./index-DM02Iz28.js";
const BREAKPOINTS = {
  "2xl": 1536,
  "3xl": 1600,
  "4xl": 2e3,
  lg: 1024,
  md: 800,
  sm: 640,
  xl: 1280
};
function resolveMin(value) {
  const px = typeof value === "number" ? value : BREAKPOINTS[value];
  return `(min-width: ${px}px)`;
}
function resolveMax(value) {
  const px = typeof value === "number" ? value : BREAKPOINTS[value];
  return `(max-width: ${px - 1}px)`;
}
function parseQuery(query) {
  if (typeof query !== "string") {
    const parts2 = [];
    if (query.min != null) parts2.push(resolveMin(query.min));
    if (query.max != null) parts2.push(resolveMax(query.max));
    if (query.pointer === "coarse") parts2.push("(pointer: coarse)");
    if (query.pointer === "fine") parts2.push("(pointer: fine)");
    if (parts2.length === 0) return "(min-width: 0px)";
    return parts2.join(" and ");
  }
  if (query.startsWith("(")) return query;
  const parts = [];
  for (const segment of query.split(":")) {
    if (segment.startsWith("max-")) {
      const bp = segment.slice(4);
      if (bp in BREAKPOINTS) parts.push(resolveMax(bp));
    } else if (segment in BREAKPOINTS) {
      parts.push(resolveMin(segment));
    }
  }
  return parts.length > 0 ? parts.join(" and ") : query;
}
function getServerSnapshot() {
  return false;
}
function useMediaQuery(query) {
  const mediaQuery = parseQuery(query);
  const subscribe = reactExports.useCallback(
    (callback) => {
      if (typeof window === "undefined") return () => {
      };
      const mql = window.matchMedia(mediaQuery);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [mediaQuery]
  );
  const getSnapshot = reactExports.useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(mediaQuery).matches;
  }, [mediaQuery]);
  return reactExports.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
export {
  useMediaQuery as u
};
