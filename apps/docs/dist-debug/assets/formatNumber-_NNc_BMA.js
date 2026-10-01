import { s as stringifyLocale } from "./stringifyLocale-DOx30wH1.js";
const cache = /* @__PURE__ */ new Map();
function getFormatter(locale, options) {
  const optionsString = JSON.stringify({
    locale: stringifyLocale(locale),
    options
  });
  const cachedFormatter = cache.get(optionsString);
  if (cachedFormatter) {
    return cachedFormatter;
  }
  const formatter = new Intl.NumberFormat(locale, options);
  cache.set(optionsString, formatter);
  return formatter;
}
function formatNumber(value, locale, options) {
  if (value == null) {
    return "";
  }
  return getFormatter(locale, options).format(value);
}
export {
  formatNumber as f,
  getFormatter as g
};
