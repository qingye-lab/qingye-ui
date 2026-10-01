import { r as reactExports, ch as clsx, ci as withSelectorExports, cj as requireReact, bN as reactDomExports, ck as getDefaultExportFromCjs, cl as React4, j as jsxRuntimeExports, e as cn, q as useUILocale } from "./index-DM02Iz28.js";
var EventKeys = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function isEventKey(key) {
  if (typeof key !== "string") {
    return false;
  }
  var allowedEventKeys = EventKeys;
  return allowedEventKeys.includes(key);
}
var SVGElementPropKeys = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it, and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
];
var SVGElementPropKeySet = new Set(SVGElementPropKeys);
function isSvgElementPropKey(key) {
  if (typeof key !== "string") {
    return false;
  }
  return SVGElementPropKeySet.has(key);
}
function isDataAttribute(key) {
  return typeof key === "string" && key.startsWith("data-");
}
function svgPropertiesNoEvents(obj) {
  if (typeof obj !== "object" || obj === null) {
    return {};
  }
  var result = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isSvgElementPropKey(key) || isDataAttribute(key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
function svgPropertiesNoEventsFromUnknown(input) {
  if (input == null) {
    return null;
  }
  if (/* @__PURE__ */ reactExports.isValidElement(input) && typeof input.props === "object" && input.props !== null) {
    var p = input.props;
    return svgPropertiesNoEvents(p);
  }
  if (typeof input === "object" && !Array.isArray(input)) {
    return svgPropertiesNoEvents(input);
  }
  return null;
}
function svgPropertiesAndEvents(obj) {
  var result = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isSvgElementPropKey(key) || isDataAttribute(key) || isEventKey(key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
function svgPropertiesAndEventsFromUnknown(input) {
  if (input == null) {
    return null;
  }
  if (/* @__PURE__ */ reactExports.isValidElement(input)) {
    return svgPropertiesAndEvents(input.props);
  }
  if (typeof input === "object" && !Array.isArray(input)) {
    return svgPropertiesAndEvents(input);
  }
  return null;
}
var _excluded$s = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function _extends$v() {
  return _extends$v = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$v.apply(null, arguments);
}
function _objectWithoutProperties$s(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$s(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$s(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var Surface = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var children = props.children, width = props.width, height = props.height, viewBox = props.viewBox, className = props.className, style = props.style, title = props.title, desc = props.desc, others = _objectWithoutProperties$s(props, _excluded$s);
  var svgView = viewBox || {
    width,
    height,
    x: 0,
    y: 0
  };
  var layerClass = clsx("recharts-surface", className);
  return /* @__PURE__ */ reactExports.createElement("svg", _extends$v({}, svgPropertiesAndEvents(others), {
    className: layerClass,
    width,
    height,
    style,
    viewBox: "".concat(svgView.x, " ").concat(svgView.y, " ").concat(svgView.width, " ").concat(svgView.height),
    ref
  }), /* @__PURE__ */ reactExports.createElement("title", null, title), /* @__PURE__ */ reactExports.createElement("desc", null, desc), children);
});
var _excluded$r = ["children", "className"];
function _extends$u() {
  return _extends$u = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$u.apply(null, arguments);
}
function _objectWithoutProperties$r(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$r(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$r(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var Layer = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var children = props.children, className = props.className, others = _objectWithoutProperties$r(props, _excluded$r);
  var layerClass = clsx("recharts-layer", className);
  return /* @__PURE__ */ reactExports.createElement("g", _extends$u({
    className: layerClass
  }, svgPropertiesAndEvents(others), {
    ref
  }), children);
});
function isUnsafeProperty(key) {
  return key === "__proto__";
}
const regexIsDeepProp$1 = /\.|(\[(?:[^[\]]*|(["'])(?:(?!\2)[^\\]|\\.)*?\2)\])/;
function isDeepKey(key) {
  switch (typeof key) {
    case "number":
    case "symbol":
      return false;
    case "string":
      if (key === "" || key.startsWith(".") || key.endsWith(".")) return false;
      return regexIsDeepProp$1.test(key);
    default:
      return false;
  }
}
function toKey(value) {
  if (typeof value === "string" || typeof value === "symbol") return value;
  if (Object.is(value?.valueOf?.(), -0)) return "-0";
  return String(value);
}
function isSymbol(value) {
  return typeof value === "symbol" || value instanceof Symbol;
}
function toString$1(value) {
  if (value == null) return "";
  return baseToString(value);
}
function baseToString(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(baseToString).join(",");
  if (isSymbol(value)) return value.toString();
  const result = value + "";
  if (result === "0" && Object.is(Number(value), -0)) return "-0";
  return result;
}
function toPath(deepKey) {
  if (Array.isArray(deepKey)) return deepKey.map(toKey);
  if (typeof deepKey === "symbol") return [deepKey];
  deepKey = toString$1(deepKey);
  const result = [];
  const length = deepKey.length;
  if (length === 0) return result;
  let index = 0;
  let key = "";
  let quoteChar = "";
  let bracket = false;
  let bracketHadQuote = false;
  const bracketNumberRegex = /^-?\d+(?:\.\d+)?$/;
  if (deepKey.charCodeAt(0) === 46) result.push("");
  while (index < length) {
    const char = deepKey[index];
    if (quoteChar) if (char === "\\" && index + 1 < length) {
      index++;
      key += deepKey[index];
    } else if (char === quoteChar) quoteChar = "";
    else key += char;
    else if (bracket) if (char === '"' || char === "'") {
      quoteChar = char;
      bracketHadQuote = true;
    } else if (char === "]") {
      bracket = false;
      if (!bracketHadQuote && key.includes(".") && !bracketNumberRegex.test(key)) {
        const segments = key.split(".");
        for (let i = 0; i < segments.length; i++) if (segments[i] !== "") result.push(segments[i]);
      } else result.push(key);
      key = "";
    } else key += char;
    else if (char === "[") {
      bracket = true;
      bracketHadQuote = false;
      if (key) {
        result.push(key);
        key = "";
      }
    } else if (char === ".") {
      if (key) {
        result.push(key);
        key = "";
      }
      const next = deepKey[index + 1];
      if (next === void 0 || next === ".") result.push("");
    } else key += char;
    index++;
  }
  if (key) result.push(key);
  return result;
}
function get$1(object2, path, defaultValue) {
  if (object2 == null) return defaultValue;
  switch (typeof path) {
    case "string": {
      if (isUnsafeProperty(path)) return defaultValue;
      const result = object2[path];
      if (result === void 0) if (isDeepKey(path) && !Object.hasOwn(object2, path)) return get$1(object2, toPath(path), defaultValue);
      else return defaultValue;
      return result;
    }
    case "number":
    case "symbol": {
      if (typeof path === "number") path = toKey(path);
      const result = object2[path];
      if (result === void 0) return defaultValue;
      return result;
    }
    default: {
      if (Array.isArray(path)) return getWithPath(object2, path, defaultValue);
      if (Object.is(path?.valueOf(), -0)) path = "-0";
      else path = String(path);
      if (isUnsafeProperty(path)) return defaultValue;
      const result = object2[path];
      if (result === void 0) return defaultValue;
      return result;
    }
  }
}
function getWithPath(object2, path, defaultValue) {
  if (path.length === 0) return defaultValue;
  let current2 = object2;
  for (let index = 0; index < path.length; index++) {
    if (current2 == null) return defaultValue;
    if (isUnsafeProperty(path[index])) return defaultValue;
    current2 = current2[path[index]];
  }
  if (current2 === void 0) return defaultValue;
  return current2;
}
var defaultRoundPrecision = 4;
function round$1(num) {
  var roundPrecision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultRoundPrecision;
  var factor = 10 ** roundPrecision;
  var rounded = Math.round(num * factor) / factor;
  if (Object.is(rounded, -0)) {
    return 0;
  }
  return rounded;
}
function roundTemplateLiteral(strings) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  return strings.reduce((result, string2, i) => {
    var value = values[i - 1];
    if (typeof value === "string") {
      return result + value + string2;
    }
    if (value !== void 0) {
      return result + round$1(value) + string2;
    }
    return result + string2;
  }, "");
}
var mathSign = (value) => {
  if (value === 0) {
    return 0;
  }
  if (value > 0) {
    return 1;
  }
  return -1;
};
var isNan = (value) => {
  return typeof value == "number" && value != +value;
};
var isPercent = (value) => typeof value === "string" && value.length > 1 && value.indexOf("%") === value.length - 1;
var isNumber = (value) => (typeof value === "number" || value instanceof Number) && !isNan(value);
var isNumOrStr = (value) => isNumber(value) || typeof value === "string";
var idCounter = 0;
var uniqueId = (prefix2) => {
  var id = ++idCounter;
  return "".concat(prefix2 || "").concat(id);
};
var getPercentValue = function getPercentValue2(percent, totalValue) {
  var defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var validate = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (!isNumber(percent) && typeof percent !== "string") {
    return defaultValue;
  }
  var value;
  if (isPercent(percent)) {
    if (totalValue == null) {
      return defaultValue;
    }
    var index = percent.indexOf("%");
    value = totalValue * parseFloat(percent.slice(0, index)) / 100;
  } else {
    value = +percent;
  }
  if (isNan(value)) {
    value = defaultValue;
  }
  if (validate && totalValue != null && value > totalValue) {
    value = totalValue;
  }
  return value;
};
var hasDuplicate = (ary2) => {
  if (!Array.isArray(ary2)) {
    return false;
  }
  var len = ary2.length;
  var cache = {};
  for (var i = 0; i < len; i++) {
    if (!cache[String(ary2[i])]) {
      cache[String(ary2[i])] = true;
    } else {
      return true;
    }
  }
  return false;
};
function interpolate$1(start, end, animationElapsedTime) {
  if (isNumber(start) && isNumber(end)) {
    return round$1(start + animationElapsedTime * (end - start));
  }
  return end;
}
function findEntryInArray(ary2, specifiedKey, specifiedValue) {
  if (!ary2 || !ary2.length) {
    return void 0;
  }
  return ary2.find((entry) => entry && (typeof specifiedKey === "function" ? specifiedKey(entry) : get$1(entry, specifiedKey)) === specifiedValue);
}
var isNullish = (value) => {
  return value === null || typeof value === "undefined";
};
var upperFirst = (value) => {
  if (isNullish(value)) {
    return value;
  }
  return "".concat(value.charAt(0).toUpperCase()).concat(value.slice(1));
};
function isNotNil(value) {
  return value != null;
}
function noop$5() {
}
function cartesianViewBoxToTrapezoid(box) {
  if (!box) {
    return void 0;
  }
  return {
    x: box.x,
    y: box.y,
    upperWidth: "upperWidth" in box ? box.upperWidth : box.width,
    lowerWidth: "lowerWidth" in box ? box.lowerWidth : box.width,
    width: box.width,
    height: box.height
  };
}
function ownKeys$I(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$I(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$I(Object(t), true).forEach(function(r2) {
      _defineProperty$L(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$I(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$L(e, r, t) {
  return (r = _toPropertyKey$L(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$L(t) {
  var i = _toPrimitive$L(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$L(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var getCartesianPosition = (options) => {
  var viewBox = options.viewBox, position = options.position, _options$offset = options.offset, offset = _options$offset === void 0 ? 0 : _options$offset, parentViewBoxFromOptions = options.parentViewBox, clamp = options.clamp;
  var _cartesianViewBoxToTr = cartesianViewBoxToTrapezoid(viewBox), x2 = _cartesianViewBoxToTr.x, y2 = _cartesianViewBoxToTr.y, height = _cartesianViewBoxToTr.height, upperWidth = _cartesianViewBoxToTr.upperWidth, lowerWidth = _cartesianViewBoxToTr.lowerWidth;
  var upperX = x2;
  var lowerX = x2 + (upperWidth - lowerWidth) / 2;
  var middleX = (upperX + lowerX) / 2;
  var midHeightWidth = (upperWidth + lowerWidth) / 2;
  var centerX = upperX + upperWidth / 2;
  var verticalSign = height >= 0 ? 1 : -1;
  var verticalOffset = verticalSign * offset;
  var verticalEnd = verticalSign > 0 ? "end" : "start";
  var verticalStart = verticalSign > 0 ? "start" : "end";
  var horizontalSign = upperWidth >= 0 ? 1 : -1;
  var horizontalOffset = horizontalSign * offset;
  var horizontalEnd = horizontalSign > 0 ? "end" : "start";
  var horizontalStart = horizontalSign > 0 ? "start" : "end";
  var parentViewBox = parentViewBoxFromOptions;
  if (position === "top") {
    var result = {
      x: upperX + upperWidth / 2,
      y: y2 - verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalEnd
    };
    if (clamp && parentViewBox) {
      result.height = Math.max(y2 - parentViewBox.y, 0);
      result.width = upperWidth;
    }
    return result;
  }
  if (position === "bottom") {
    var _result = {
      x: lowerX + lowerWidth / 2,
      y: y2 + height + verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalStart
    };
    if (clamp && parentViewBox) {
      _result.height = Math.max(parentViewBox.y + parentViewBox.height - (y2 + height), 0);
      _result.width = lowerWidth;
    }
    return _result;
  }
  if (position === "left") {
    var _result2 = {
      x: middleX - horizontalOffset,
      y: y2 + height / 2,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: "middle"
    };
    if (clamp && parentViewBox) {
      _result2.width = Math.max(_result2.x - parentViewBox.x, 0);
      _result2.height = height;
    }
    return _result2;
  }
  if (position === "right") {
    var _result3 = {
      x: middleX + midHeightWidth + horizontalOffset,
      y: y2 + height / 2,
      horizontalAnchor: horizontalStart,
      verticalAnchor: "middle"
    };
    if (clamp && parentViewBox) {
      _result3.width = Math.max(parentViewBox.x + parentViewBox.width - _result3.x, 0);
      _result3.height = height;
    }
    return _result3;
  }
  var sizeAttrs = clamp && parentViewBox ? {
    width: midHeightWidth,
    height
  } : {};
  if (position === "insideLeft") {
    return _objectSpread$I({
      x: middleX + horizontalOffset,
      y: y2 + height / 2,
      horizontalAnchor: horizontalStart,
      verticalAnchor: "middle"
    }, sizeAttrs);
  }
  if (position === "insideRight") {
    return _objectSpread$I({
      x: middleX + midHeightWidth - horizontalOffset,
      y: y2 + height / 2,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: "middle"
    }, sizeAttrs);
  }
  if (position === "insideTop") {
    return _objectSpread$I({
      x: upperX + upperWidth / 2,
      y: y2 + verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideBottom") {
    return _objectSpread$I({
      x: lowerX + lowerWidth / 2,
      y: y2 + height - verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === "insideTopLeft") {
    return _objectSpread$I({
      x: upperX + horizontalOffset,
      y: y2 + verticalOffset,
      horizontalAnchor: horizontalStart,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideTopRight") {
    return _objectSpread$I({
      x: upperX + upperWidth - horizontalOffset,
      y: y2 + verticalOffset,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideBottomLeft") {
    return _objectSpread$I({
      x: lowerX + horizontalOffset,
      y: y2 + height - verticalOffset,
      horizontalAnchor: horizontalStart,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === "insideBottomRight") {
    return _objectSpread$I({
      x: lowerX + lowerWidth - horizontalOffset,
      y: y2 + height - verticalOffset,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (!!position && typeof position === "object" && (isNumber(position.x) || isPercent(position.x)) && (isNumber(position.y) || isPercent(position.y))) {
    return _objectSpread$I({
      x: x2 + getPercentValue(position.x, midHeightWidth),
      y: y2 + getPercentValue(position.y, height),
      horizontalAnchor: "end",
      verticalAnchor: "end"
    }, sizeAttrs);
  }
  return _objectSpread$I({
    x: centerX,
    y: y2 + height / 2,
    horizontalAnchor: "middle",
    verticalAnchor: "middle"
  }, sizeAttrs);
};
var absolutePositions = ["top", "left", "right", "bottom"];
function isOutsidePosition(position) {
  if (position == null) {
    return false;
  }
  if (typeof position === "object") {
    return true;
  }
  return absolutePositions.includes(position);
}
var LegendPortalContext = /* @__PURE__ */ reactExports.createContext(null);
var useLegendPortal = () => reactExports.useContext(LegendPortalContext);
function constant$1(x2) {
  return function constant2() {
    return x2;
  };
}
const cos = Math.cos;
const sin = Math.sin;
const sqrt$1 = Math.sqrt;
const pi$1 = Math.PI;
const tau$1 = 2 * pi$1;
const pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  const k2 = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k2) / k2 + strings[i];
    }
  };
}
class Path {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x2, y2) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x2, y2) {
    this._append`L${this._x1 = +x2},${this._y1 = +y2}`;
  }
  quadraticCurveTo(x1, y1, x2, y2) {
    this._append`Q${+x1},${+y1},${this._x1 = +x2},${this._y1 = +y2}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x3, y3) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x3},${this._y1 = +y3}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    if (r < 0) throw new Error(`negative radius: ${r}`);
    let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    } else if (!(l01_2 > epsilon)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    } else {
      let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }
      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x2, y2, r, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
    if (r < 0) throw new Error(`negative radius: ${r}`);
    let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._append`L${x0},${y0}`;
    }
    if (!r) return;
    if (da < 0) da = da % tau + tau;
    if (da > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x2 - dx},${y2 - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    } else if (da > epsilon) {
      this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x2 + r * Math.cos(a1)},${this._y1 = y2 + r * Math.sin(a1)}`;
    }
  }
  rect(x2, y2, w, h) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
}
function withPath(shape) {
  let digits = 3;
  shape.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };
  return () => new Path(digits);
}
function array(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function curveLinear(context) {
  return new Linear(context);
}
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}
function shapeLine(x$1, y$1) {
  var defined2 = constant$1(true), context = null, curve = curveLinear, output = null, path = withPath(line);
  x$1 = typeof x$1 === "function" ? x$1 : x$1 === void 0 ? x : constant$1(x$1);
  y$1 = typeof y$1 === "function" ? y$1 : y$1 === void 0 ? y : constant$1(y$1);
  function line(data) {
    var i, n = (data = array(data)).length, d, defined0 = false, buffer;
    if (context == null) output = curve(buffer = path());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined2(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  line.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$1(+_), line) : x$1;
  };
  line.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$1(+_), line) : y$1;
  };
  line.defined = function(_) {
    return arguments.length ? (defined2 = typeof _ === "function" ? _ : constant$1(!!_), line) : defined2;
  };
  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };
  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };
  return line;
}
function shapeArea(x0, y0, y1) {
  var x1 = null, defined2 = constant$1(true), context = null, curve = curveLinear, output = null, path = withPath(area);
  x0 = typeof x0 === "function" ? x0 : x0 === void 0 ? x : constant$1(+x0);
  y0 = typeof y0 === "function" ? y0 : y0 === void 0 ? constant$1(0) : constant$1(+y0);
  y1 = typeof y1 === "function" ? y1 : y1 === void 0 ? y : constant$1(+y1);
  function area(data) {
    var i, j, k2, n = (data = array(data)).length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
    if (context == null) output = curve(buffer = path());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined2(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k2 = i - 1; k2 >= j; --k2) {
            output.point(x0z[k2], y0z[k2]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  function arealine() {
    return shapeLine().defined(defined2).curve(curve).context(context);
  }
  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), x1 = null, area) : x0;
  };
  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), area) : x0;
  };
  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : x1;
  };
  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), y1 = null, area) : y0;
  };
  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), area) : y0;
  };
  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : y1;
  };
  area.lineX0 = area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };
  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };
  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };
  area.defined = function(_) {
    return arguments.length ? (defined2 = typeof _ === "function" ? _ : constant$1(!!_), area) : defined2;
  };
  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };
  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };
  return area;
}
class Bump {
  constructor(context, x2) {
    this._context = context;
    this._x = x2;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line) this._context.lineTo(x2, y2);
        else this._context.moveTo(x2, y2);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x2) / 2, this._y0, this._x0, y2, x2, y2);
        else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y2) / 2, x2, this._y0, x2, y2);
        break;
      }
    }
    this._x0 = x2, this._y0 = y2;
  }
}
function bumpX(context) {
  return new Bump(context, true);
}
function bumpY(context) {
  return new Bump(context, false);
}
const symbolCircle = {
  draw(context, size) {
    const r = sqrt$1(size / pi$1);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau$1);
  }
};
const symbolCross = {
  draw(context, size) {
    const r = sqrt$1(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};
const tan30 = sqrt$1(1 / 3);
const tan30_2 = tan30 * 2;
const symbolDiamond = {
  draw(context, size) {
    const y2 = sqrt$1(size / tan30_2);
    const x2 = y2 * tan30;
    context.moveTo(0, -y2);
    context.lineTo(x2, 0);
    context.lineTo(0, y2);
    context.lineTo(-x2, 0);
    context.closePath();
  }
};
const symbolSquare = {
  draw(context, size) {
    const w = sqrt$1(size);
    const x2 = -w / 2;
    context.rect(x2, x2, w, w);
  }
};
const ka = 0.8908130915292852;
const kr = sin(pi$1 / 10) / sin(7 * pi$1 / 10);
const kx = sin(tau$1 / 10) * kr;
const ky = -cos(tau$1 / 10) * kr;
const symbolStar = {
  draw(context, size) {
    const r = sqrt$1(size * ka);
    const x2 = kx * r;
    const y2 = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x2, y2);
    for (let i = 1; i < 5; ++i) {
      const a2 = tau$1 * i / 5;
      const c2 = cos(a2);
      const s2 = sin(a2);
      context.lineTo(s2 * r, -c2 * r);
      context.lineTo(c2 * x2 - s2 * y2, s2 * x2 + c2 * y2);
    }
    context.closePath();
  }
};
const sqrt3 = sqrt$1(3);
const symbolTriangle = {
  draw(context, size) {
    const y2 = -sqrt$1(size / (sqrt3 * 3));
    context.moveTo(0, y2 * 2);
    context.lineTo(-sqrt3 * y2, -y2);
    context.lineTo(sqrt3 * y2, -y2);
    context.closePath();
  }
};
const c = -0.5;
const s = sqrt$1(3) / 2;
const k = 1 / sqrt$1(12);
const a = (k / 2 + 1) * 3;
const symbolWye = {
  draw(context, size) {
    const r = sqrt$1(size / a);
    const x0 = r / 2, y0 = r * k;
    const x1 = x0, y1 = r * k + r;
    const x2 = -x1, y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};
function Symbol$1(type, size) {
  let context = null, path = withPath(symbol);
  type = typeof type === "function" ? type : constant$1(type || symbolCircle);
  size = typeof size === "function" ? size : constant$1(size === void 0 ? 64 : +size);
  function symbol() {
    let buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }
  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant$1(_), symbol) : type;
  };
  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant$1(+_), symbol) : size;
  };
  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };
  return symbol;
}
function noop$4() {
}
function point$2(that, x2, y2) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x2) / 6,
    (that._y0 + 4 * that._y1 + y2) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point$2(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        point$2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function curveBasis(context) {
  return new Basis(context);
}
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop$4,
  areaEnd: noop$4,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x2, this._y2 = y2;
        break;
      case 1:
        this._point = 2;
        this._x3 = x2, this._y3 = y2;
        break;
      case 2:
        this._point = 3;
        this._x4 = x2, this._y4 = y2;
        this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
        break;
      default:
        point$2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function curveBasisClosed(context) {
  return new BasisClosed(context);
}
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point$2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function curveBasisOpen(context) {
  return new BasisOpen(context);
}
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop$4,
  areaEnd: noop$4,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) this._context.lineTo(x2, y2);
    else this._point = 1, this._context.moveTo(x2, y2);
  }
};
function curveLinearClosed(context) {
  return new LinearClosed(context);
}
function sign(x2) {
  return x2 < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}
function point$1(that, t02, t12) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t02, x1 - dx, y1 - dx * t12, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point$1(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    var t12 = NaN;
    x2 = +x2, y2 = +y2;
    if (x2 === this._x1 && y2 === this._y1) return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point$1(this, slope2(this, t12 = slope3(this, x2, y2)), t12);
        break;
      default:
        point$1(this, this._t0, t12 = slope3(this, x2, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t12;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
  MonotoneX.prototype.point.call(this, y2, x2);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x2, y2) {
    this._context.moveTo(y2, x2);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x2, y2) {
    this._context.lineTo(y2, x2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
  }
};
function monotoneX(context) {
  return new MonotoneX(context);
}
function monotoneY(context) {
  return new MonotoneY(context);
}
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, n = x2.length;
    if (n) {
      this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
      if (n === 2) {
        this._context.lineTo(x2[1], y2[1]);
      } else {
        var px = controlPoints(x2), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
function controlPoints(x2) {
  var i, n = x2.length - 1, m, a2 = new Array(n), b = new Array(n), r = new Array(n);
  a2[0] = 0, b[0] = 2, r[0] = x2[0] + 2 * x2[1];
  for (i = 1; i < n - 1; ++i) a2[i] = 1, b[i] = 4, r[i] = 4 * x2[i] + 2 * x2[i + 1];
  a2[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x2[n - 1] + x2[n];
  for (i = 1; i < n; ++i) m = a2[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a2[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a2[i] = (r[i] - a2[i + 1]) / b[i];
  b[n - 1] = (x2[n] + a2[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x2[i + 1] - a2[i + 1];
  return [a2, b];
}
function curveNatural(context) {
  return new Natural(context);
}
function Step(context, t) {
  this._context = context;
  this._t = t;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y2);
          this._context.lineTo(x2, y2);
        } else {
          var x1 = this._x * (1 - this._t) + x2 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y2);
        }
        break;
      }
    }
    this._x = x2, this._y = y2;
  }
};
function curveStep(context) {
  return new Step(context, 0.5);
}
function stepBefore(context) {
  return new Step(context, 0);
}
function stepAfter(context) {
  return new Step(context, 1);
}
function stackOffsetNone(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}
function stackOrderNone(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}
function stackValue(d, key) {
  return d[key];
}
function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}
function shapeStack() {
  var keys = constant$1([]), order = stackOrderNone, offset = stackOffsetNone, value = stackValue;
  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries), i, n = sz.length, j = -1, oz;
    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }
    for (i = 0, oz = array(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$1(Array.from(_)), stack) : keys;
  };
  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), stack) : value;
  };
  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? stackOrderNone : typeof _ === "function" ? _ : constant$1(Array.from(_)), stack) : order;
  };
  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? stackOffsetNone : _, stack) : offset;
  };
  return stack;
}
function stackOffsetExpand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y2; j < m; ++j) {
    for (y2 = i = 0; i < n; ++i) y2 += series[i][j][1] || 0;
    if (y2) for (i = 0; i < n; ++i) series[i][j][1] /= y2;
  }
  stackOffsetNone(series, order);
}
function stackOffsetSilhouette(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y2 = 0; i < n; ++i) y2 += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y2 / 2;
  }
  stackOffsetNone(series, order);
}
function stackOffsetWiggle(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y2 = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]], sij0 = si[j][1] || 0, sij1 = si[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
      for (var k2 = 0; k2 < i; ++k2) {
        var sk = series[order[k2]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y2;
    if (s1) y2 -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y2;
  stackOffsetNone(series, order);
}
var _excluded$q = ["type", "size", "sizeType"];
function _extends$t() {
  return _extends$t = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$t.apply(null, arguments);
}
function ownKeys$H(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$H(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$H(Object(t), true).forEach(function(r2) {
      _defineProperty$K(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$H(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$K(e, r, t) {
  return (r = _toPropertyKey$K(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$K(t) {
  var i = _toPrimitive$K(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$K(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$q(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$q(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$q(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var symbolFactories = {
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
};
var RADIAN$1 = Math.PI / 180;
var getSymbolFactory = (type) => {
  var name = "symbol".concat(upperFirst(type));
  return symbolFactories[name] || symbolCircle;
};
var calculateAreaSize = (size, sizeType, type) => {
  if (sizeType === "area") {
    return size;
  }
  switch (type) {
    case "cross":
      return 5 * size * size / 9;
    case "diamond":
      return 0.5 * size * size / Math.sqrt(3);
    case "square":
      return size * size;
    case "star": {
      var angle = 18 * RADIAN$1;
      return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.tan(angle) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * size * size / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * size * size / 8;
    default:
      return Math.PI * size * size / 4;
  }
};
var registerSymbol = (key, factory) => {
  symbolFactories["symbol".concat(upperFirst(key))] = factory;
};
var Symbols = (_ref2) => {
  var _ref$type = _ref2.type, type = _ref$type === void 0 ? "circle" : _ref$type, _ref$size = _ref2.size, size = _ref$size === void 0 ? 64 : _ref$size, _ref$sizeType = _ref2.sizeType, sizeType = _ref$sizeType === void 0 ? "area" : _ref$sizeType, rest = _objectWithoutProperties$q(_ref2, _excluded$q);
  var props = _objectSpread$H(_objectSpread$H({}, rest), {}, {
    type,
    size,
    sizeType
  });
  var realType = "circle";
  if (typeof type === "string") {
    realType = type;
  }
  var getPath2 = () => {
    var symbolFactory = getSymbolFactory(realType);
    var symbol = Symbol$1().type(symbolFactory).size(calculateAreaSize(size, sizeType, realType));
    var s2 = symbol();
    if (s2 === null) {
      return void 0;
    }
    return s2;
  };
  var className = props.className, cx = props.cx, cy = props.cy;
  var filteredProps = svgPropertiesAndEvents(props);
  if (isNumber(cx) && isNumber(cy) && isNumber(size)) {
    return /* @__PURE__ */ reactExports.createElement("path", _extends$t({}, filteredProps, {
      className: clsx("recharts-symbols", className),
      transform: "translate(".concat(cx, ", ").concat(cy, ")"),
      d: getPath2()
    }));
  }
  return null;
};
Symbols.registerSymbol = registerSymbol;
var isPolarCoordinate = (c2) => {
  return "radius" in c2 && "startAngle" in c2 && "endAngle" in c2;
};
var adaptEventHandlers = (props, newHandler) => {
  if (!props || typeof props === "function" || typeof props === "boolean") {
    return null;
  }
  var inputProps = props;
  if (/* @__PURE__ */ reactExports.isValidElement(props)) {
    inputProps = props.props;
  }
  if (typeof inputProps !== "object" && typeof inputProps !== "function") {
    return null;
  }
  var out = {};
  Object.keys(inputProps).forEach((key) => {
    if (isEventKey(key) && typeof inputProps[key] === "function") {
      out[key] = ((e) => inputProps[key](inputProps, e));
    }
  });
  return out;
};
var getEventHandlerOfChild = (originalHandler, data, index) => (e) => {
  originalHandler(data, index, e);
  return null;
};
var adaptEventsOfChild = (props, data, index) => {
  if (props === null || typeof props !== "object" && typeof props !== "function") {
    return null;
  }
  var out = null;
  Object.keys(props).forEach((key) => {
    var item = props[key];
    if (isEventKey(key) && typeof item === "function") {
      if (!out) out = {};
      out[key] = getEventHandlerOfChild(item, data, index);
    }
  });
  return out;
};
function ownKeys$G(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$G(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$G(Object(t), true).forEach(function(r2) {
      _defineProperty$J(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$G(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$J(e, r, t) {
  return (r = _toPropertyKey$J(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$J(t) {
  var i = _toPrimitive$J(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$J(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function resolveDefaultProps(realProps, defaultProps) {
  var resolvedProps = _objectSpread$G({}, realProps);
  var dp = defaultProps;
  var keys = Object.keys(defaultProps);
  var withDefaults = keys.reduce((acc, key) => {
    if (acc[key] === void 0 && dp[key] !== void 0) {
      acc[key] = dp[key];
    }
    return acc;
  }, resolvedProps);
  return withDefaults;
}
function _extends$s() {
  return _extends$s = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$s.apply(null, arguments);
}
function ownKeys$F(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$F(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$F(Object(t), true).forEach(function(r2) {
      _defineProperty$I(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$F(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$I(e, r, t) {
  return (r = _toPropertyKey$I(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$I(t) {
  var i = _toPrimitive$I(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$I(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var SIZE = 32;
var defaultLegendContentDefaultProps = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  layout: "horizontal",
  verticalAlign: "middle",
  labelStyle: {}
};
function getStrokeDasharray$1(input) {
  if (typeof input === "object" && input !== null && "strokeDasharray" in input) {
    return String(input.strokeDasharray);
  }
  return void 0;
}
function Icon(_ref2) {
  var data = _ref2.data, iconType = _ref2.iconType, inactiveColor = _ref2.inactiveColor;
  var halfSize = SIZE / 2;
  var sixthSize = SIZE / 6;
  var thirdSize = SIZE / 3;
  var color2 = data.inactive ? inactiveColor : data.color;
  var preferredIcon = iconType !== null && iconType !== void 0 ? iconType : data.type;
  if (preferredIcon === "none") {
    return null;
  }
  if (preferredIcon === "plainline") {
    return /* @__PURE__ */ reactExports.createElement("line", {
      strokeWidth: 4,
      fill: "none",
      stroke: color2,
      strokeDasharray: getStrokeDasharray$1(data.payload),
      x1: 0,
      y1: halfSize,
      x2: SIZE,
      y2: halfSize,
      className: "recharts-legend-icon"
    });
  }
  if (preferredIcon === "line") {
    return /* @__PURE__ */ reactExports.createElement("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: color2,
      d: "M0,".concat(halfSize, "h").concat(thirdSize, "\n            A").concat(sixthSize, ",").concat(sixthSize, ",0,1,1,").concat(2 * thirdSize, ",").concat(halfSize, "\n            H").concat(SIZE, "M").concat(2 * thirdSize, ",").concat(halfSize, "\n            A").concat(sixthSize, ",").concat(sixthSize, ",0,1,1,").concat(thirdSize, ",").concat(halfSize),
      className: "recharts-legend-icon"
    });
  }
  if (preferredIcon === "rect") {
    return /* @__PURE__ */ reactExports.createElement("path", {
      stroke: "none",
      fill: color2,
      d: "M0,".concat(SIZE / 8, "h").concat(SIZE, "v").concat(SIZE * 3 / 4, "h").concat(-SIZE, "z"),
      className: "recharts-legend-icon"
    });
  }
  if (/* @__PURE__ */ reactExports.isValidElement(data.legendIcon)) {
    var iconProps = _objectSpread$F({}, data);
    delete iconProps.legendIcon;
    return /* @__PURE__ */ reactExports.cloneElement(data.legendIcon, iconProps);
  }
  return /* @__PURE__ */ reactExports.createElement(Symbols, {
    fill: color2,
    cx: halfSize,
    cy: halfSize,
    size: SIZE,
    sizeType: "diameter",
    type: preferredIcon
  });
}
function Items(props) {
  var payload = props.payload, iconSize = props.iconSize, layout = props.layout, formatter = props.formatter, inactiveColor = props.inactiveColor, iconType = props.iconType, labelStyle = props.labelStyle;
  var viewBox = {
    x: 0,
    y: 0,
    width: SIZE,
    height: SIZE
  };
  var itemStyle = {
    display: layout === "horizontal" ? "inline-block" : "block",
    marginRight: 10,
    whiteSpace: "nowrap"
  };
  var svgStyle = {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 4
  };
  return payload.map((entry, i) => {
    var _finalLabelStyle$whit, _finalLabelStyle$over;
    var finalFormatter = entry.formatter || formatter;
    var className = clsx({
      "recharts-legend-item": true,
      ["legend-item-".concat(i)]: true,
      inactive: entry.inactive
    });
    if (entry.type === "none") {
      return null;
    }
    var finalLabelStyle = typeof labelStyle === "object" ? _objectSpread$F({}, labelStyle) : {};
    finalLabelStyle.color = entry.inactive ? inactiveColor : finalLabelStyle.color || entry.color;
    (_finalLabelStyle$whit = finalLabelStyle.whiteSpace) !== null && _finalLabelStyle$whit !== void 0 ? _finalLabelStyle$whit : finalLabelStyle.whiteSpace = "normal";
    (_finalLabelStyle$over = finalLabelStyle.overflowWrap) !== null && _finalLabelStyle$over !== void 0 ? _finalLabelStyle$over : finalLabelStyle.overflowWrap = "break-word";
    var finalValue = finalFormatter ? finalFormatter(entry.value, entry, i) : entry.value;
    return /* @__PURE__ */ reactExports.createElement("li", _extends$s({
      className,
      style: itemStyle,
      key: "legend-item-".concat(i)
    }, adaptEventsOfChild(props, entry, i)), /* @__PURE__ */ reactExports.createElement(Surface, {
      width: iconSize,
      height: iconSize,
      viewBox,
      style: svgStyle,
      "aria-label": entry.value == null ? "legend icon" : "".concat(entry.value, " legend icon")
    }, /* @__PURE__ */ reactExports.createElement(Icon, {
      data: entry,
      iconType,
      inactiveColor
    })), /* @__PURE__ */ reactExports.createElement("span", {
      className: "recharts-legend-item-text",
      style: finalLabelStyle
    }, finalValue));
  });
}
var DefaultLegendContent = (outsideProps) => {
  var props = resolveDefaultProps(outsideProps, defaultLegendContentDefaultProps);
  var payload = props.payload, layout = props.layout, align = props.align;
  if (!payload || !payload.length) {
    return null;
  }
  var finalStyle = {
    padding: 0,
    margin: 0,
    textAlign: layout === "horizontal" ? align : "left"
  };
  return /* @__PURE__ */ reactExports.createElement("ul", {
    className: "recharts-default-legend",
    style: finalStyle
  }, /* @__PURE__ */ reactExports.createElement(Items, _extends$s({}, props, {
    payload
  })));
};
function uniqBy$1(arr, mapper) {
  const map2 = /* @__PURE__ */ new Map();
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = mapper(item, i, arr);
    if (!map2.has(key)) map2.set(key, item);
  }
  return Array.from(map2.values());
}
function ary(func, n) {
  return function(...args) {
    return func.apply(this, args.slice(0, n));
  };
}
function identity$3(x2) {
  return x2;
}
function isLength(value) {
  return Number.isSafeInteger(value) && value >= 0;
}
function isArrayLike(value) {
  return value != null && typeof value !== "function" && isLength(value.length);
}
function property(path) {
  return function(object2) {
    return get$1(object2, path);
  };
}
function isPrimitive(value) {
  return value == null || typeof value !== "object" && typeof value !== "function";
}
function isTypedArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}
function getSymbols(object2) {
  return Object.getOwnPropertySymbols(object2).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object2, symbol));
}
function getTag(value) {
  if (value == null) return value === void 0 ? "[object Undefined]" : "[object Null]";
  return Object.prototype.toString.call(value);
}
const regexpTag = "[object RegExp]";
const stringTag = "[object String]";
const numberTag = "[object Number]";
const booleanTag = "[object Boolean]";
const argumentsTag = "[object Arguments]";
const symbolTag = "[object Symbol]";
const dateTag = "[object Date]";
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const functionTag = "[object Function]";
const arrayBufferTag = "[object ArrayBuffer]";
const objectTag = "[object Object]";
const errorTag = "[object Error]";
const dataViewTag = "[object DataView]";
const uint8ArrayTag = "[object Uint8Array]";
const uint8ClampedArrayTag = "[object Uint8ClampedArray]";
const uint16ArrayTag = "[object Uint16Array]";
const uint32ArrayTag = "[object Uint32Array]";
const bigUint64ArrayTag = "[object BigUint64Array]";
const int8ArrayTag = "[object Int8Array]";
const int16ArrayTag = "[object Int16Array]";
const int32ArrayTag = "[object Int32Array]";
const bigInt64ArrayTag = "[object BigInt64Array]";
const float32ArrayTag = "[object Float32Array]";
const float64ArrayTag = "[object Float64Array]";
const globalThis_ = typeof globalThis === "object" && globalThis || typeof window === "object" && window || typeof self === "object" && self || typeof global === "object" && global || /* @__PURE__ */ (function() {
  return this;
})();
function isBuffer(x2) {
  return typeof globalThis_.Buffer !== "undefined" && globalThis_.Buffer.isBuffer(x2);
}
function cloneDeepWith$1(obj, cloneValue) {
  return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), cloneValue);
}
function cloneDeepWithImpl(valueToClone, keyToClone, objectToClone, stack = /* @__PURE__ */ new Map(), cloneValue = void 0) {
  const cloned = cloneValue?.(valueToClone, keyToClone, objectToClone, stack);
  if (cloned !== void 0) return cloned;
  if (isPrimitive(valueToClone)) return valueToClone;
  if (stack.has(valueToClone)) return stack.get(valueToClone);
  if (Array.isArray(valueToClone)) {
    const result = new Array(valueToClone.length);
    stack.set(valueToClone, result);
    for (let i = 0; i < valueToClone.length; i++) result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
    if (Object.hasOwn(valueToClone, "index")) result.index = valueToClone.index;
    if (Object.hasOwn(valueToClone, "input")) result.input = valueToClone.input;
    return result;
  }
  if (valueToClone instanceof Date) return new Date(valueToClone.getTime());
  if (valueToClone instanceof RegExp) {
    const result = new RegExp(valueToClone.source, valueToClone.flags);
    result.lastIndex = valueToClone.lastIndex;
    return result;
  }
  if (valueToClone instanceof Map) {
    const result = /* @__PURE__ */ new Map();
    stack.set(valueToClone, result);
    for (const [key, value] of valueToClone) result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue));
    return result;
  }
  if (valueToClone instanceof Set) {
    const result = /* @__PURE__ */ new Set();
    stack.set(valueToClone, result);
    for (const value of valueToClone) result.add(cloneDeepWithImpl(value, void 0, objectToClone, stack, cloneValue));
    return result;
  }
  if (isBuffer(valueToClone)) return valueToClone.subarray();
  if (isTypedArray(valueToClone)) {
    const result = new (Object.getPrototypeOf(valueToClone)).constructor(valueToClone.length);
    stack.set(valueToClone, result);
    for (let i = 0; i < valueToClone.length; i++) result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && valueToClone instanceof SharedArrayBuffer) return valueToClone.slice(0);
  if (valueToClone instanceof DataView) {
    const result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (typeof File !== "undefined" && valueToClone instanceof File) {
    const result = new File([valueToClone], valueToClone.name, { type: valueToClone.type });
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (typeof Blob !== "undefined" && valueToClone instanceof Blob) {
    const result = new Blob([valueToClone], { type: valueToClone.type });
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof Error) {
    const result = structuredClone(valueToClone);
    stack.set(valueToClone, result);
    result.message = valueToClone.message;
    result.name = valueToClone.name;
    result.stack = valueToClone.stack;
    result.cause = valueToClone.cause;
    result.constructor = valueToClone.constructor;
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof Boolean) {
    const result = new Boolean(valueToClone.valueOf());
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof Number) {
    const result = new Number(valueToClone.valueOf());
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof String) {
    const result = new String(valueToClone.valueOf());
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (typeof valueToClone === "object" && isCloneableObject(valueToClone)) {
    const result = Object.create(Object.getPrototypeOf(valueToClone));
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  return valueToClone;
}
function copyProperties(target, source, objectToClone = target, stack, cloneValue) {
  const keys = [...Object.keys(source), ...getSymbols(source)];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    if (descriptor == null || descriptor.writable) target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue);
  }
}
function isCloneableObject(object2) {
  switch (getTag(object2)) {
    case argumentsTag:
    case arrayTag:
    case arrayBufferTag:
    case dataViewTag:
    case booleanTag:
    case dateTag:
    case float32ArrayTag:
    case float64ArrayTag:
    case int8ArrayTag:
    case int16ArrayTag:
    case int32ArrayTag:
    case mapTag:
    case numberTag:
    case objectTag:
    case regexpTag:
    case setTag:
    case stringTag:
    case symbolTag:
    case uint8ArrayTag:
    case uint8ClampedArrayTag:
    case uint16ArrayTag:
    case uint32ArrayTag:
      return true;
    default:
      return false;
  }
}
function cloneDeep$1(obj) {
  return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), void 0);
}
function eq(value, other) {
  return value === other || Number.isNaN(value) && Number.isNaN(other);
}
function isObject(value) {
  return value !== null && (typeof value === "object" || typeof value === "function");
}
function isMatchWith(target, source, compare) {
  if (typeof compare !== "function") return isMatchWith(target, source, () => void 0);
  return isMatchWithInternal(target, source, function doesMatch(objValue, srcValue, key, object2, source2, stack) {
    const isEqual2 = compare(objValue, srcValue, key, object2, source2, stack);
    if (isEqual2 !== void 0) return Boolean(isEqual2);
    return isMatchWithInternal(objValue, srcValue, doesMatch, stack, false);
  }, /* @__PURE__ */ new Map(), true);
}
function isMatchWithInternal(target, source, compare, stack, isRoot = false) {
  if (source === target) return true;
  switch (typeof source) {
    case "object":
      return isObjectMatch(target, source, compare, stack, isRoot);
    case "function":
      if (Object.keys(source).length > 0) return isMatchWithInternal(target, { ...source }, compare, stack, isRoot);
      return eq(target, source);
    default:
      if (!isObject(target)) return eq(target, source);
      if (isRoot) {
        if (typeof source === "string") return source === "";
        return true;
      }
      return eq(target, source);
  }
}
function isObjectMatch(target, source, compare, stack, isRoot = false) {
  if (source == null) return true;
  if (Array.isArray(source)) return isArrayMatch(target, source, compare, stack);
  if (source instanceof Map) return isMapMatch(target, source, compare, stack);
  if (source instanceof Set) return isSetMatch(target, source, compare, stack);
  const keys = Object.keys(source);
  if (target == null) return isRoot && keys.length === 0;
  if (isRoot) {
    if (isPrimitive(target)) target = Object(target);
  } else {
    const tag = getTag(target);
    if (tag !== "[object Object]" && tag !== "[object Arguments]") return false;
  }
  if (keys.length === 0) return true;
  if (stack?.has(source)) return stack.get(source) === target;
  stack?.set(source, target);
  try {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!(key in target)) return false;
      if (source[key] === void 0 && target[key] !== void 0) return false;
      if (source[key] === null && target[key] !== null) return false;
      if (!compare(target[key], source[key], key, target, source, stack)) return false;
    }
    return true;
  } finally {
    stack?.delete(source);
  }
}
function isMapMatch(target, source, compare, stack) {
  if (source.size === 0) return true;
  if (!(target instanceof Map)) return false;
  for (const [key, sourceValue] of source.entries()) if (compare(target.get(key), sourceValue, key, target, source, stack) === false) return false;
  return true;
}
function isArrayMatch(target, source, compare, stack) {
  if (source.length === 0) return true;
  if (!Array.isArray(target)) return false;
  const countedIndex = /* @__PURE__ */ new Set();
  for (let i = 0; i < source.length; i++) {
    const sourceItem = source[i];
    let found = false;
    for (let j = 0; j < target.length; j++) {
      if (countedIndex.has(j)) continue;
      const targetItem = target[j];
      let matches2 = false;
      if (compare(targetItem, sourceItem, i, target, source, stack)) matches2 = true;
      if (matches2) {
        countedIndex.add(j);
        found = true;
        break;
      }
    }
    if (!found) return false;
  }
  return true;
}
function isSetMatch(target, source, compare, stack) {
  if (source.size === 0) return true;
  if (!(target instanceof Set)) return false;
  return isArrayMatch([...target], [...source], compare, stack);
}
function isMatch(target, source) {
  return isMatchWith(target, source, () => void 0);
}
function matches(source) {
  source = cloneDeep$1(source);
  return (target) => {
    return isMatch(target, source);
  };
}
function cloneDeepWith(obj, customizer) {
  return cloneDeepWith$1(obj, (value, key, object2, stack) => {
    if (typeof obj !== "object") return;
    if (getTag(obj) === "[object Object]" && typeof obj.constructor !== "function") {
      const result = {};
      stack.set(obj, result);
      copyProperties(result, obj, object2, stack);
      return result;
    }
    switch (Object.prototype.toString.call(obj)) {
      case numberTag:
      case stringTag:
      case booleanTag: {
        const result = new obj.constructor(obj?.valueOf());
        copyProperties(result, obj);
        return result;
      }
      case argumentsTag: {
        const result = {};
        copyProperties(result, obj);
        result.length = obj.length;
        result[Symbol.iterator] = obj[Symbol.iterator];
        return result;
      }
      default:
        return;
    }
  });
}
function cloneDeep(obj) {
  return cloneDeepWith(obj);
}
const IS_UNSIGNED_INTEGER = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length = Number.MAX_SAFE_INTEGER) {
  switch (typeof value) {
    case "number":
      return Number.isInteger(value) && value >= 0 && value < length;
    case "symbol":
      return false;
    case "string":
      return IS_UNSIGNED_INTEGER.test(value);
  }
}
function isArguments(value) {
  return value !== null && typeof value === "object" && getTag(value) === "[object Arguments]";
}
function has$1(object2, path) {
  let resolvedPath;
  if (Array.isArray(path)) resolvedPath = path;
  else if (typeof path === "string" && isDeepKey(path) && !(path in Object(object2))) resolvedPath = toPath(path);
  else resolvedPath = [path];
  if (resolvedPath.length === 0) return false;
  let current2 = object2;
  for (let i = 0; i < resolvedPath.length; i++) {
    const key = toKey(resolvedPath[i]);
    if (current2 == null || !Object.hasOwn(current2, key)) {
      if (!((Array.isArray(current2) || isArguments(current2)) && isIndex(key) && Number(key) < current2.length)) return false;
    }
    current2 = current2[key];
  }
  return true;
}
function matchesProperty(property2, source) {
  switch (typeof property2) {
    case "object":
      if (Object.is(property2?.valueOf(), -0)) property2 = "-0";
      break;
    case "number":
      property2 = toKey(property2);
      break;
  }
  source = cloneDeep(source);
  return function(target) {
    const result = get$1(target, property2);
    if (result === void 0) return has$1(target, property2);
    if (source === void 0) return result === void 0;
    return isMatch(result, source);
  };
}
function iteratee(value) {
  if (value == null) return identity$3;
  switch (typeof value) {
    case "function":
      return value;
    case "object":
      if (Array.isArray(value) && value.length === 2) return matchesProperty(value[0], value[1]);
      return matches(value);
    default:
      return property(value);
  }
}
function normalizeZero(value) {
  return value === 0 ? 0 : value;
}
function uniqBy(array2, iteratee$1 = identity$3) {
  if (!isArrayLike(array2)) return [];
  return uniqBy$1(Array.from(array2), ary(iteratee(iteratee$1), 1)).map(normalizeZero);
}
function getUniqPayload(payload, option, defaultUniqBy2) {
  if (option === true) {
    return uniqBy(payload, defaultUniqBy2);
  }
  if (typeof option === "function") {
    return uniqBy(payload, option);
  }
  return payload;
}
var RechartsReduxContext = /* @__PURE__ */ reactExports.createContext(null);
var noopDispatch = (a2) => a2;
var useAppDispatch = () => {
  var context = reactExports.useContext(RechartsReduxContext);
  if (context) {
    return context.store.dispatch;
  }
  return noopDispatch;
};
var noop$3 = () => {
};
var addNestedSubNoop = () => noop$3;
var refEquality = (a2, b) => a2 === b;
function useAppSelector(selector) {
  var context = reactExports.useContext(RechartsReduxContext);
  var outOfContextSelector = reactExports.useMemo(() => {
    if (!context) {
      return noop$3;
    }
    return (state) => {
      if (state == null) {
        return void 0;
      }
      return selector(state);
    };
  }, [context, selector]);
  return withSelectorExports.useSyncExternalStoreWithSelector(context ? context.subscription.addNestedSub : addNestedSubNoop, context ? context.store.getState : noop$3, context ? context.store.getState : noop$3, outOfContextSelector, refEquality);
}
function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
  if (typeof func !== "function") {
    throw new TypeError(errorMessage);
  }
}
function assertIsArrayOfFunctions(array2, errorMessage = `expected all items to be functions, instead received the following types: `) {
  if (!array2.every((item) => typeof item === "function")) {
    const itemTypes = array2.map(
      (item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item
    ).join(", ");
    throw new TypeError(`${errorMessage}[${itemTypes}]`);
  }
}
var ensureIsArray = (item) => {
  return Array.isArray(item) ? item : [item];
};
function getDependencies(createSelectorArgs) {
  const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
  assertIsArrayOfFunctions(
    dependencies,
    `createSelector expects all input-selectors to be functions, but received the following types: `
  );
  return dependencies;
}
function collectInputSelectorResults(dependencies, inputSelectorArgs) {
  const inputSelectorResults = [];
  const { length } = dependencies;
  for (let i = 0; i < length; i++) {
    inputSelectorResults.push(dependencies[i].apply(null, inputSelectorArgs));
  }
  return inputSelectorResults;
}
var StrongRef = class {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value;
  }
};
var getWeakRef = () => typeof WeakRef === "undefined" ? StrongRef : WeakRef;
var Ref = /* @__PURE__ */ getWeakRef();
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
  return {
    s: UNTERMINATED,
    v: void 0,
    o: null,
    p: null
  };
}
function maybeDeref(r) {
  if (r instanceof Ref) {
    return r.deref();
  }
  return r;
}
function weakMapMemoize(func, options = {}) {
  let fnNode = createCacheNode();
  const { resultEqualityCheck } = options;
  let lastResult2;
  let resultsCount = 0;
  function memoized() {
    let cacheNode = fnNode;
    const { length } = arguments;
    for (let i = 0, l = length; i < l; i++) {
      const arg = arguments[i];
      if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
        let objectCache = cacheNode.o;
        if (objectCache === null) {
          cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
        }
        const objectNode = objectCache.get(arg);
        if (objectNode === void 0) {
          cacheNode = createCacheNode();
          objectCache.set(arg, cacheNode);
        } else {
          cacheNode = objectNode;
        }
      } else {
        let primitiveCache = cacheNode.p;
        if (primitiveCache === null) {
          cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
        }
        const primitiveNode = primitiveCache.get(arg);
        if (primitiveNode === void 0) {
          cacheNode = createCacheNode();
          primitiveCache.set(arg, cacheNode);
        } else {
          cacheNode = primitiveNode;
        }
      }
    }
    const terminatedNode = cacheNode;
    let result;
    if (cacheNode.s === TERMINATED) {
      result = cacheNode.v;
    } else {
      result = func.apply(null, arguments);
      resultsCount++;
      if (resultEqualityCheck) {
        const lastResultValue = maybeDeref(lastResult2);
        if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
          result = lastResultValue;
          resultsCount !== 0 && resultsCount--;
        }
        const needsWeakRef = typeof result === "object" && result !== null || typeof result === "function";
        lastResult2 = needsWeakRef ? /* @__PURE__ */ new Ref(result) : result;
      }
    }
    terminatedNode.s = TERMINATED;
    terminatedNode.v = result;
    return result;
  }
  memoized.clearCache = () => {
    fnNode = createCacheNode();
    memoized.resetResultsCount();
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}
function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
  const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
    memoize: memoizeOrOptions,
    memoizeOptions: memoizeOptionsFromArgs
  } : memoizeOrOptions;
  const createSelector2 = (...createSelectorArgs) => {
    let recomputations = 0;
    let dependencyRecomputations = 0;
    let lastResult2;
    let directlyPassedOptions = {};
    let resultFunc = createSelectorArgs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = createSelectorArgs.pop();
    }
    assertIsFunction(
      resultFunc,
      `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
    );
    const combinedOptions = {
      ...createSelectorCreatorOptions,
      ...directlyPassedOptions
    };
    const {
      memoize,
      memoizeOptions = [],
      argsMemoize = weakMapMemoize,
      argsMemoizeOptions = []
    } = combinedOptions;
    const finalMemoizeOptions = ensureIsArray(memoizeOptions);
    const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
    const dependencies = getDependencies(createSelectorArgs);
    const memoizedResultFunc = memoize(function recomputationWrapper() {
      recomputations++;
      return resultFunc.apply(
        null,
        arguments
      );
    }, ...finalMemoizeOptions);
    const selector = argsMemoize(function dependenciesChecker() {
      dependencyRecomputations++;
      const inputSelectorResults = collectInputSelectorResults(
        dependencies,
        arguments
      );
      lastResult2 = memoizedResultFunc.apply(null, inputSelectorResults);
      return lastResult2;
    }, ...finalArgsMemoizeOptions);
    return Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      dependencyRecomputations: () => dependencyRecomputations,
      resetDependencyRecomputations: () => {
        dependencyRecomputations = 0;
      },
      lastResult: () => lastResult2,
      recomputations: () => recomputations,
      resetRecomputations: () => {
        recomputations = 0;
      },
      memoize,
      argsMemoize
    });
  };
  Object.assign(createSelector2, {
    withTypes: () => createSelector2
  });
  return createSelector2;
}
var createSelector = /* @__PURE__ */ createSelectorCreator(weakMapMemoize);
function flatten(arr, depth = 1) {
  const result = [];
  const flooredDepth = Math.floor(depth);
  const recursive = (arr2, currentDepth) => {
    for (let i = 0; i < arr2.length; i++) {
      const item = arr2[i];
      if (Array.isArray(item) && currentDepth < flooredDepth) recursive(item, currentDepth + 1);
      else result.push(item);
    }
  };
  recursive(arr, 0);
  return result;
}
function isIterateeCall(value, index, object2) {
  if (!isObject(object2)) return false;
  if (typeof index === "number" && isArrayLike(object2) && isIndex(index) && index < object2.length || typeof index === "string" && index in object2) return eq(object2[index], value);
  return false;
}
function getPriority(a2) {
  if (typeof a2 === "symbol") return 1;
  if (a2 === null) return 2;
  if (a2 === void 0) return 3;
  if (a2 !== a2) return 4;
  return 0;
}
const compareValues = (a2, b, order) => {
  if (a2 !== b) {
    const aPriority = getPriority(a2);
    const bPriority = getPriority(b);
    if (aPriority === bPriority && aPriority === 0) {
      if (a2 < b) return order === "desc" ? 1 : -1;
      if (a2 > b) return order === "desc" ? -1 : 1;
    }
    return order === "desc" ? bPriority - aPriority : aPriority - bPriority;
  }
  return 0;
};
const regexIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const regexIsPlainProp = /^\w*$/;
function isKey(value, object2) {
  if (Array.isArray(value)) return false;
  if (typeof value === "number" || typeof value === "boolean" || value == null || isSymbol(value)) return true;
  return typeof value === "string" && (regexIsPlainProp.test(value) || !regexIsDeepProp.test(value)) || object2 != null;
}
function orderBy(collection, criteria, orders, guard) {
  if (collection == null) return [];
  orders = orders;
  if (!Array.isArray(collection)) collection = isArrayLike(collection) ? Array.from(collection) : Object.values(collection);
  if (!Array.isArray(criteria)) criteria = criteria == null ? [null] : [criteria];
  if (criteria.length === 0) criteria = [null];
  if (!Array.isArray(orders)) orders = orders == null ? [] : [orders];
  orders = orders.map((order) => String(order));
  const getValueByNestedPath = (object2, path) => {
    let target = object2;
    let index = 0;
    for (; index < path.length && target != null; ++index) target = target[path[index]];
    return index > 0 && index === path.length ? target : void 0;
  };
  const getValueByCriterion = (criterion, object2) => {
    if (criterion == null) return object2;
    if (object2 == null) return;
    if (typeof criterion === "object" && "key" in criterion) {
      if (Object.hasOwn(object2, criterion.key)) return object2[criterion.key];
      return getValueByNestedPath(object2, criterion.path);
    }
    if (typeof criterion === "function") return criterion(object2);
    if (Array.isArray(criterion)) return getValueByNestedPath(object2, criterion);
    return object2[criterion];
  };
  const preparedCriteria = criteria.map((criterion) => {
    if (Array.isArray(criterion) && criterion.length === 1) criterion = criterion[0];
    if (criterion == null || typeof criterion === "function" || Array.isArray(criterion) || isKey(criterion)) return criterion;
    return {
      key: criterion,
      path: toPath(criterion)
    };
  });
  return collection.map((item) => ({
    original: item,
    criteria: preparedCriteria.map((criterion) => getValueByCriterion(criterion, item))
  })).slice().sort((a2, b) => {
    for (let i = 0; i < preparedCriteria.length; i++) {
      const comparedResult = compareValues(a2.criteria[i], b.criteria[i], orders[i]);
      if (comparedResult !== 0) return comparedResult;
    }
    return 0;
  }).map((item) => item.original);
}
function sortBy$1(collection, ...criteria) {
  const length = criteria.length;
  if (length > 1 && isIterateeCall(collection, criteria[0], criteria[1])) criteria = [];
  else if (length > 2 && isIterateeCall(criteria[0], criteria[1], criteria[2])) criteria = [criteria[0]];
  return orderBy(collection, flatten(criteria), ["asc"]);
}
var selectLegendSettings = (state) => state.legend.settings;
var selectLegendSize = (state) => state.legend.size;
var selectAllLegendPayload2DArray = (state) => state.legend.payload;
var selectLegendPayload = createSelector([selectAllLegendPayload2DArray, selectLegendSettings], (payloads, _ref2) => {
  var itemSorter = _ref2.itemSorter;
  var flat = payloads.flat(1);
  return itemSorter ? sortBy$1(flat, itemSorter) : flat;
});
function useLegendPayload() {
  return useAppSelector(selectLegendPayload);
}
function _slicedToArray$m(r, e) {
  return _arrayWithHoles$m(r) || _iterableToArrayLimit$m(r, e) || _unsupportedIterableToArray$m(r, e) || _nonIterableRest$m();
}
function _nonIterableRest$m() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$m(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$m(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$m(r, a2) : void 0;
  }
}
function _arrayLikeToArray$m(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$m(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$m(r) {
  if (Array.isArray(r)) return r;
}
var EPS = 1;
function hasSignificantChange(a2, b) {
  return Math.abs(a2.height - b.height) > EPS || Math.abs(a2.left - b.left) > EPS || Math.abs(a2.top - b.top) > EPS || Math.abs(a2.width - b.width) > EPS;
}
function readElementOffset(node) {
  var rect = node.getBoundingClientRect();
  return {
    height: rect.height,
    left: rect.left,
    top: rect.top,
    width: rect.width
  };
}
function useElementOffset() {
  var extraDependencies = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var _useState = reactExports.useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }), _useState2 = _slicedToArray$m(_useState, 2), lastBoundingBox = _useState2[0], setLastBoundingBox = _useState2[1];
  var observerRef = reactExports.useRef(null);
  var lastBoundingBoxRef = reactExports.useRef(lastBoundingBox);
  lastBoundingBoxRef.current = lastBoundingBox;
  var updateBoundingBox = reactExports.useCallback(
    (node) => {
      if (observerRef.current != null) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (node != null) {
        var box = readElementOffset(node);
        if (hasSignificantChange(box, lastBoundingBoxRef.current)) {
          setLastBoundingBox(box);
        }
        if (typeof ResizeObserver !== "undefined") {
          var observer = new ResizeObserver(() => {
            var newBox = readElementOffset(node);
            if (hasSignificantChange(newBox, lastBoundingBoxRef.current)) {
              setLastBoundingBox(newBox);
            }
          });
          observer.observe(node);
          observerRef.current = observer;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...extraDependencies]
  );
  reactExports.useEffect(() => {
    return () => {
      var _observerRef$current;
      (_observerRef$current = observerRef.current) === null || _observerRef$current === void 0 || _observerRef$current.disconnect();
    };
  }, []);
  return [lastBoundingBox, updateBoundingBox];
}
function formatProdErrorMessage$1(code) {
  return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
var $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var symbol_observable_default = $$observable;
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var ActionTypes = {
  INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
var actionTypes_default = ActionTypes;
function isPlainObject$2(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error(formatProdErrorMessage$1(2));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(formatProdErrorMessage$1(0));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(formatProdErrorMessage$1(1));
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = /* @__PURE__ */ new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = /* @__PURE__ */ new Map();
      currentListeners.forEach((listener2, key) => {
        nextListeners.set(key, listener2);
      });
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(3));
    }
    return currentState;
  }
  function subscribe(listener2) {
    if (typeof listener2 !== "function") {
      throw new Error(formatProdErrorMessage$1(4));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(5));
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener2);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage$1(6));
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject$2(action)) {
      throw new Error(formatProdErrorMessage$1(7));
    }
    if (typeof action.type === "undefined") {
      throw new Error(formatProdErrorMessage$1(8));
    }
    if (typeof action.type !== "string") {
      throw new Error(formatProdErrorMessage$1(17));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(9));
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = currentListeners = nextListeners;
    listeners.forEach((listener2) => {
      listener2();
    });
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(formatProdErrorMessage$1(10));
    }
    currentReducer = nextReducer;
    dispatch({
      type: actionTypes_default.REPLACE
    });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(formatProdErrorMessage$1(11));
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      },
      [symbol_observable_default]() {
        return this;
      }
    };
  }
  dispatch({
    type: actionTypes_default.INIT
  });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable_default]: observable
  };
  return store;
}
function assertReducerShape(reducers2) {
  Object.keys(reducers2).forEach((key) => {
    const reducer = reducers2[key];
    const initialState2 = reducer(void 0, {
      type: actionTypes_default.INIT
    });
    if (typeof initialState2 === "undefined") {
      throw new Error(formatProdErrorMessage$1(12));
    }
    if (typeof reducer(void 0, {
      type: actionTypes_default.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(formatProdErrorMessage$1(13));
    }
  });
}
function combineReducers(reducers2) {
  const reducerKeys = Object.keys(reducers2);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers2[key] === "function") {
      finalReducers[key] = reducers2[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        action && action.type;
        throw new Error(formatProdErrorMessage$1(14));
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a2, b) => (...args) => a2(b(...args)));
}
function applyMiddleware(...middlewares) {
  return (createStore2) => (reducer, preloadedState) => {
    const store = createStore2(reducer, preloadedState);
    let dispatch = () => {
      throw new Error(formatProdErrorMessage$1(15));
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}
function isAction(action) {
  return isPlainObject$2(action) && "type" in action && typeof action.type === "string";
}
var NOTHING = /* @__PURE__ */ Symbol.for("immer-nothing");
var DRAFTABLE = /* @__PURE__ */ Symbol.for("immer-draftable");
var DRAFT_STATE = /* @__PURE__ */ Symbol.for("immer-state");
function die(error, ...args) {
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var O = Object;
var getPrototypeOf = O.getPrototypeOf;
var CONSTRUCTOR = "constructor";
var PROTOTYPE = "prototype";
var CONFIGURABLE = "configurable";
var ENUMERABLE = "enumerable";
var WRITABLE = "writable";
var VALUE = "value";
var isDraft = (value) => !!value && !!value[DRAFT_STATE];
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject$1(value) || isArray(value) || !!value[DRAFTABLE] || !!value[CONSTRUCTOR]?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject$1(value) {
  if (!value || !isObjectish(value))
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null || proto === O[PROTOTYPE])
    return true;
  const Ctor = O.hasOwnProperty.call(proto, CONSTRUCTOR) && proto[CONSTRUCTOR];
  if (Ctor === Object)
    return true;
  if (!isFunction(Ctor))
    return false;
  let ctorString = cachedCtorStrings.get(Ctor);
  if (ctorString === void 0) {
    ctorString = Function.toString.call(Ctor);
    cachedCtorStrings.set(Ctor, ctorString);
  }
  return ctorString === objectCtorString;
}
function each(obj, iter, strict = true) {
  if (getArchtype(obj) === 0) {
    const keys = strict ? Reflect.ownKeys(obj) : O.keys(obj);
    keys.forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
var has = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.has(prop) : O[PROTOTYPE].hasOwnProperty.call(thing, prop);
var get = (thing, prop, type = getArchtype(thing)) => (
  // @ts-ignore
  type === 2 ? thing.get(prop) : thing[prop]
);
var set = (thing, propOrOldValue, value, type = getArchtype(thing)) => {
  if (type === 2)
    thing.set(propOrOldValue, value);
  else if (type === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
};
function is$1(x2, y2) {
  if (x2 === y2) {
    return x2 !== 0 || 1 / x2 === 1 / y2;
  } else {
    return x2 !== x2 && y2 !== y2;
  }
}
var isArray = Array.isArray;
var isMap = (target) => target instanceof Map;
var isSet = (target) => target instanceof Set;
var isObjectish = (target) => typeof target === "object";
var isFunction = (target) => typeof target === "function";
var isBoolean$1 = (target) => typeof target === "boolean";
function isArrayIndex(value) {
  const n = +value;
  return Number.isInteger(n) && String(n) === value;
}
var latest = (state) => state.copy_ || state.base_;
var getFinalValue = (state) => state.modified_ ? state.copy_ : state.base_;
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (isArray(base))
    return Array[PROTOTYPE].slice.call(base);
  const isPlain = isPlainObject$1(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = O.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc[WRITABLE] === false) {
        desc[WRITABLE] = true;
        desc[CONFIGURABLE] = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          [CONFIGURABLE]: true,
          [WRITABLE]: true,
          // could live with !!desc.set as well here...
          [ENUMERABLE]: desc[ENUMERABLE],
          [VALUE]: base[key]
        };
    }
    return O.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = O.create(proto);
    return O.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    O.defineProperties(obj, {
      set: dontMutateMethodOverride,
      add: dontMutateMethodOverride,
      clear: dontMutateMethodOverride,
      delete: dontMutateMethodOverride
    });
  }
  O.freeze(obj);
  if (deep)
    each(
      obj,
      (_key, value) => {
        freeze(value, true);
      },
      false
    );
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
var dontMutateMethodOverride = {
  [VALUE]: dontMutateFrozenCollections
};
function isFrozen(obj) {
  if (obj === null || !isObjectish(obj))
    return true;
  return O.isFrozen(obj);
}
var PluginMapSet = "MapSet";
var PluginPatches = "Patches";
var PluginArrayMethods = "ArrayMethods";
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var isPluginLoaded = (pluginKey) => !!plugins[pluginKey];
var currentScope;
var getCurrentScope = () => currentScope;
var createScope = (parent_, immer_) => ({
  drafts_: [],
  parent_,
  immer_,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: true,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: isPluginLoaded(PluginMapSet) ? getPlugin(PluginMapSet) : void 0,
  arrayMethodsPlugin_: isPluginLoaded(PluginArrayMethods) ? getPlugin(PluginArrayMethods) : void 0
});
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    scope.patchPlugin_ = getPlugin(PluginPatches);
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
var enterScope = (immer2) => currentScope = createScope(currentScope, immer2);
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
    }
    const { patchPlugin_ } = scope;
    if (patchPlugin_) {
      patchPlugin_.generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope
      );
    }
  } else {
    result = finalize(scope, baseDraft);
  }
  maybeFreeze(scope, result, true);
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    const finalValue = handleValue(value, rootScope.handledSet_, rootScope);
    return finalValue;
  }
  if (!isSameScope(state, rootScope)) {
    return value;
  }
  if (!state.modified_) {
    return state.base_;
  }
  if (!state.finalized_) {
    const { callbacks_ } = state;
    if (callbacks_) {
      while (callbacks_.length > 0) {
        const callback = callbacks_.pop();
        callback(rootScope);
      }
    }
    generatePatchesAndFinalize(state, rootScope);
  }
  return state.copy_;
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function markStateFinalized(state) {
  state.finalized_ = true;
  state.scope_.unfinalizedDrafts_--;
}
var isSameScope = (state, rootScope) => state.scope_ === rootScope;
var EMPTY_LOCATIONS_RESULT = [];
function updateDraftInParent(parent, draftValue, finalizedValue, originalKey) {
  const parentCopy = latest(parent);
  const parentType = parent.type_;
  if (originalKey !== void 0) {
    const currentValue = get(parentCopy, originalKey, parentType);
    if (currentValue === draftValue) {
      set(parentCopy, originalKey, finalizedValue, parentType);
      return;
    }
  }
  if (!parent.draftLocations_) {
    const draftLocations = parent.draftLocations_ = /* @__PURE__ */ new Map();
    each(parentCopy, (key, value) => {
      if (isDraft(value)) {
        const keys = draftLocations.get(value) || [];
        keys.push(key);
        draftLocations.set(value, keys);
      }
    });
  }
  const locations = parent.draftLocations_.get(draftValue) ?? EMPTY_LOCATIONS_RESULT;
  for (const location of locations) {
    set(parentCopy, location, finalizedValue, parentType);
  }
}
function registerChildFinalizationCallback(parent, child, key) {
  parent.callbacks_.push(function childCleanup(rootScope) {
    const state = child;
    if (!state || !isSameScope(state, rootScope)) {
      return;
    }
    rootScope.mapSetPlugin_?.fixSetContents(state);
    const finalizedValue = getFinalValue(state);
    updateDraftInParent(parent, state.draft_ ?? state, finalizedValue, key);
    generatePatchesAndFinalize(state, rootScope);
  });
}
function generatePatchesAndFinalize(state, rootScope) {
  const shouldFinalize = state.modified_ && !state.finalized_ && (state.type_ === 3 || state.type_ === 1 && state.allIndicesReassigned_ || (state.assigned_?.size ?? 0) > 0);
  if (shouldFinalize) {
    const { patchPlugin_ } = rootScope;
    if (patchPlugin_) {
      const basePath = patchPlugin_.getPath(state);
      if (basePath) {
        patchPlugin_.generatePatches_(state, basePath, rootScope);
      }
    }
    markStateFinalized(state);
  }
}
function handleCrossReference(target, key, value) {
  const { scope_ } = target;
  if (isDraft(value)) {
    const state = value[DRAFT_STATE];
    if (isSameScope(state, scope_)) {
      state.callbacks_.push(function crossReferenceCleanup() {
        prepareCopy(target);
        const finalizedValue = getFinalValue(state);
        updateDraftInParent(target, value, finalizedValue, key);
      });
    }
  } else if (isDraftable(value)) {
    target.callbacks_.push(function nestedDraftCleanup() {
      const targetCopy = latest(target);
      if (target.type_ === 3) {
        if (targetCopy.has(value)) {
          handleValue(value, scope_.handledSet_, scope_);
        }
      } else {
        if (get(targetCopy, key, target.type_) === value) {
          if (scope_.drafts_.length > 1 && (target.assigned_.get(key) ?? false) === true && target.copy_) {
            handleValue(
              get(target.copy_, key, target.type_),
              scope_.handledSet_,
              scope_
            );
          }
        }
      }
    });
  }
}
function handleValue(target, handledSet, rootScope) {
  if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
    return target;
  }
  if (isDraft(target) || handledSet.has(target) || !isDraftable(target) || isFrozen(target)) {
    return target;
  }
  handledSet.add(target);
  each(target, (key, value) => {
    if (isDraft(value)) {
      const state = value[DRAFT_STATE];
      if (isSameScope(state, rootScope)) {
        const updatedValue = getFinalValue(state);
        set(target, key, updatedValue, target.type_);
        markStateFinalized(state);
      }
    } else if (isDraftable(value)) {
      handleValue(value, handledSet, rootScope);
    }
  });
  return target;
}
function createProxyProxy(base, parent) {
  const baseIsArray = isArray(base);
  const state = {
    type_: baseIsArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: void 0,
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: void 0
  };
  let target = state;
  let traps = objectTraps;
  if (baseIsArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return [proxy, state];
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    let arrayPlugin = state.scope_.arrayMethodsPlugin_;
    const isArrayWithStringProp = state.type_ === 1 && typeof prop === "string";
    if (isArrayWithStringProp) {
      if (arrayPlugin?.isArrayOperationMethod(prop)) {
        return arrayPlugin.createMethodInterceptor(state, prop);
      }
    }
    const source = latest(state);
    if (!has(source, prop, state.type_)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (isArrayWithStringProp && state.operationMethod && arrayPlugin?.isMutatingArrayMethod(
      state.operationMethod
    ) && isArrayIndex(prop)) {
      return value;
    }
    if (value === peek(state.base_, prop) || isRelocatedBaseRef(state, prop, value)) {
      prepareCopy(state);
      const childKey = state.type_ === 1 ? +prop : prop;
      const childDraft = createProxy(state.scope_, value, state, childKey);
      return state.copy_[childKey] = childDraft;
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_.set(prop, false);
        return true;
      }
      if (is$1(value, current2) && (value !== void 0 || has(state.base_, prop, state.type_)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || has(state.copy_, prop, state.type_)) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_.set(prop, true);
    handleCrossReference(state, prop, value);
    return true;
  },
  deleteProperty(state, prop) {
    prepareCopy(state);
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_.set(prop, false);
      markChanged(state);
    } else {
      state.assigned_.delete(prop);
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      [WRITABLE]: true,
      [CONFIGURABLE]: state.type_ !== 1 || prop !== "length",
      [ENUMERABLE]: desc[ENUMERABLE],
      [VALUE]: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
for (let key in objectTraps) {
  let fn = objectTraps[key];
  arrayTraps[key] = function() {
    const args = arguments;
    args[0] = args[0][0];
    return fn.apply(this, args);
  };
}
arrayTraps.deleteProperty = function(state, prop) {
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function isRelocatedBaseRef(state, prop, value) {
  if (state.type_ !== 1 || !state.allIndicesReassigned_ || state.assigned_?.get(prop) || !isDraftable(value) || value[DRAFT_STATE]) {
    return false;
  }
  return state.baseRefs_.has(value);
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? VALUE in desc ? desc[VALUE] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.assigned_ = /* @__PURE__ */ new Map();
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config2) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.useStrictIteration_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (isFunction(base) && !isFunction(recipe)) {
        const defaultBase = recipe;
        recipe = base;
        const self2 = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self2.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (!isFunction(recipe))
        die(6);
      if (patchListener !== void 0 && !isFunction(patchListener))
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(scope, base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || !isObjectish(base)) {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin(PluginPatches).generateReplacementPatches_(base, result, {
            patches_: p,
            inversePatches_: ip
          });
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (isFunction(base)) {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (isBoolean$1(config2?.autoFreeze))
      this.setAutoFreeze(config2.autoFreeze);
    if (isBoolean$1(config2?.useStrictShallowCopy))
      this.setUseStrictShallowCopy(config2.useStrictShallowCopy);
    if (isBoolean$1(config2?.useStrictIteration))
      this.setUseStrictIteration(config2.useStrictIteration);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(scope, base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(value) {
    this.useStrictIteration_ = value;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin(PluginPatches).applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(rootScope, value, parent, key) {
  const [draft, state] = isMap(value) ? getPlugin(PluginMapSet).proxyMap_(value, parent) : isSet(value) ? getPlugin(PluginMapSet).proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent?.scope_ ?? getCurrentScope();
  scope.drafts_.push(draft);
  state.callbacks_ = parent?.callbacks_ ?? [];
  state.key_ = key;
  if (parent && key !== void 0) {
    registerChildFinalizationCallback(parent, state, key);
  } else {
    state.callbacks_.push(function rootDraftCleanup(rootScope2) {
      rootScope2.mapSetPlugin_?.fixSetContents(state);
      const { patchPlugin_ } = rootScope2;
      if (state.modified_ && patchPlugin_) {
        patchPlugin_.generatePatches_(state, [], rootScope2);
      }
    });
  }
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy2;
  let strict = true;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy2 = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    strict = state.scope_.immer_.shouldUseStrictIteration();
  } else {
    copy2 = shallowCopy(value, true);
  }
  each(
    copy2,
    (key, childValue) => {
      set(copy2, key, currentImpl(childValue));
    },
    strict
  );
  if (state) {
    state.finalized_ = false;
  }
  return copy2;
}
var _globalIterator = globalThis.Iterator;
typeof _globalIterator?.from === "function";
var immer = new Immer2();
var produce = immer.produce;
var castDraft = (value) => value;
function createThunkMiddleware(extraArgument) {
  const middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
  return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;
const composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0) return void 0;
  if (typeof arguments[0] === "object") return compose;
  return compose.apply(null, arguments);
};
function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if (prepareAction) {
      let prepared = prepareAction(...args);
      if (!prepared) throw new Error(formatProdErrorMessage(0));
      return {
        type,
        payload: prepared.payload,
        ..."meta" in prepared && { meta: prepared.meta },
        ..."error" in prepared && { error: prepared.error }
      };
    }
    return {
      type,
      payload: args[0]
    };
  }
  actionCreator.toString = () => `${type}`;
  actionCreator.type = type;
  actionCreator.match = (action) => isAction(action) && action.type === type;
  return actionCreator;
}
var Tuple = class Tuple2 extends Array {
  constructor(...items) {
    super(...items);
    Object.setPrototypeOf(this, Tuple2.prototype);
  }
  static get [Symbol.species]() {
    return Tuple2;
  }
  concat(...arr) {
    return super.concat.apply(this, arr);
  }
  prepend(...arr) {
    if (arr.length === 1 && Array.isArray(arr[0])) return new Tuple2(...arr[0].concat(this));
    return new Tuple2(...arr.concat(this));
  }
};
function freezeDraftable(val) {
  return isDraftable(val) ? produce(val, () => {
  }) : val;
}
function getOrInsertComputed(map2, key, compute) {
  if (map2.has(key)) return map2.get(key);
  return map2.set(key, compute(key)).get(key);
}
function isBoolean(x2) {
  return typeof x2 === "boolean";
}
const buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
  const { thunk: thunk$1 = true, immutableCheck = true, serializableCheck = true, actionCreatorCheck = true } = options ?? {};
  let middlewareArray = new Tuple();
  if (thunk$1) {
    if (isBoolean(thunk$1)) middlewareArray.push(thunk);
    else middlewareArray.push(withExtraArgument(thunk$1.extraArgument));
  }
  return middlewareArray;
};
const SHOULD_AUTOBATCH = "RTK_autoBatch";
const prepareAutoBatched = () => (payload) => ({
  payload,
  meta: { [SHOULD_AUTOBATCH]: true }
});
const createQueueWithTimer = (timeout) => {
  return (notify) => {
    setTimeout(notify, timeout);
  };
};
const createRafWithFallbackTimer = (raf, timeout) => {
  return (notify) => {
    let called = false;
    let rafId2;
    let timerId;
    const callback = () => {
      if (called) return;
      called = true;
      cancelAnimationFrame(rafId2);
      clearTimeout(timerId);
      notify();
    };
    rafId2 = raf(callback);
    timerId = setTimeout(callback, timeout);
  };
};
const autoBatchEnhancer = (options = { type: "raf" }) => (next) => (...args) => {
  const store = next(...args);
  let notifying = true;
  let shouldNotifyAtEndOfTick = false;
  let notificationQueued = false;
  const listeners = /* @__PURE__ */ new Set();
  const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? typeof window !== "undefined" && window.requestAnimationFrame ? createRafWithFallbackTimer(window.requestAnimationFrame, 100) : createQueueWithTimer(10) : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
  const notifyListeners = () => {
    notificationQueued = false;
    if (shouldNotifyAtEndOfTick) {
      shouldNotifyAtEndOfTick = false;
      listeners.forEach((l) => l());
    }
  };
  return Object.assign({}, store, {
    subscribe(listener2) {
      const wrappedListener = () => notifying && listener2();
      const unsubscribe = store.subscribe(wrappedListener);
      listeners.add(listener2);
      return () => {
        unsubscribe();
        listeners.delete(listener2);
      };
    },
    dispatch(action) {
      try {
        notifying = !action?.meta?.[SHOULD_AUTOBATCH];
        shouldNotifyAtEndOfTick = !notifying;
        if (shouldNotifyAtEndOfTick) {
          if (!notificationQueued) {
            notificationQueued = true;
            queueCallback(notifyListeners);
          }
        }
        return store.dispatch(action);
      } finally {
        notifying = true;
      }
    }
  });
};
const buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
  const { autoBatch = true } = options ?? {};
  let enhancerArray = new Tuple(middlewareEnhancer);
  if (autoBatch) enhancerArray.push(autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0));
  return enhancerArray;
};
function configureStore(options) {
  const getDefaultMiddleware = buildGetDefaultMiddleware();
  const { reducer = void 0, middleware, devTools = true, preloadedState = void 0, enhancers = void 0 } = options || {};
  let rootReducer2;
  if (typeof reducer === "function") rootReducer2 = reducer;
  else if (isPlainObject$2(reducer)) rootReducer2 = combineReducers(reducer);
  else throw new Error(formatProdErrorMessage(1));
  let finalMiddleware;
  if (typeof middleware === "function") {
    finalMiddleware = middleware(getDefaultMiddleware);
  } else finalMiddleware = getDefaultMiddleware();
  let finalCompose = compose;
  if (devTools) finalCompose = composeWithDevTools({
    trace: false,
    ...typeof devTools === "object" && devTools
  });
  const middlewareEnhancer = applyMiddleware(...finalMiddleware);
  const getDefaultEnhancers = buildGetDefaultEnhancers(middlewareEnhancer);
  let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
  const composedEnhancer = finalCompose(...storeEnhancers);
  return createStore(rootReducer2, preloadedState, composedEnhancer);
}
function executeReducerBuilderCallback(builderCallback) {
  const actionsMap = {};
  const actionMatchers = [];
  let defaultCaseReducer;
  const builder = {
    addCase(typeOrActionCreator, reducer) {
      const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (!type) throw new Error(formatProdErrorMessage(28));
      if (type in actionsMap) throw new Error(formatProdErrorMessage(29));
      actionsMap[type] = reducer;
      return builder;
    },
    addAsyncThunk(asyncThunk, reducers2) {
      if (reducers2.pending) actionsMap[asyncThunk.pending.type] = reducers2.pending;
      if (reducers2.rejected) actionsMap[asyncThunk.rejected.type] = reducers2.rejected;
      if (reducers2.fulfilled) actionsMap[asyncThunk.fulfilled.type] = reducers2.fulfilled;
      if (reducers2.settled) actionMatchers.push({
        matcher: asyncThunk.settled,
        reducer: reducers2.settled
      });
      return builder;
    },
    addMatcher(matcher, reducer) {
      actionMatchers.push({
        matcher,
        reducer
      });
      return builder;
    },
    addDefaultCase(reducer) {
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [
    actionsMap,
    actionMatchers,
    defaultCaseReducer
  ];
}
function isStateFunction(x2) {
  return typeof x2 === "function";
}
function createReducer(initialState2, mapOrBuilderCallback) {
  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
  let getInitialState;
  if (isStateFunction(initialState2)) getInitialState = () => freezeDraftable(initialState2());
  else {
    const frozenInitialState = freezeDraftable(initialState2);
    getInitialState = () => frozenInitialState;
  }
  function reducer(state = getInitialState(), action) {
    let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({ matcher }) => matcher(action)).map(({ reducer: reducer2 }) => reducer2)];
    if (caseReducers.filter((cr) => !!cr).length === 0) caseReducers = [finalDefaultCaseReducer];
    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === void 0) return previousState;
          return result;
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) return previousState;
            throw new Error(formatProdErrorMessage(9));
          }
          return result;
        } else return produce(previousState, (draft) => {
          return caseReducer(draft, action);
        });
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}
let urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
let nanoid = (size = 21) => {
  let id = "";
  let i = size;
  while (i--) id += urlAlphabet[Math.random() * 64 | 0];
  return id;
};
const asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function getType(slice, actionKey) {
  return `${slice}/${actionKey}`;
}
function buildCreateSlice({ creators } = {}) {
  const cAT = creators?.asyncThunk?.[asyncThunkSymbol];
  return function createSlice2(options) {
    const { name, reducerPath = name } = options;
    if (!name) throw new Error(formatProdErrorMessage(11));
    const reducers2 = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
    const reducerNames = Object.keys(reducers2);
    const context = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    };
    const contextMethods = {
      addCase(typeOrActionCreator, reducer2) {
        const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
        if (!type) throw new Error(formatProdErrorMessage(12));
        if (type in context.sliceCaseReducersByType) throw new Error(formatProdErrorMessage(13));
        context.sliceCaseReducersByType[type] = reducer2;
        return contextMethods;
      },
      addMatcher(matcher, reducer2) {
        context.sliceMatchers.push({
          matcher,
          reducer: reducer2
        });
        return contextMethods;
      },
      exposeAction(name2, actionCreator) {
        context.actionCreators[name2] = actionCreator;
        return contextMethods;
      },
      exposeCaseReducer(name2, reducer2) {
        context.sliceCaseReducersByName[name2] = reducer2;
        return contextMethods;
      }
    };
    reducerNames.forEach((reducerName) => {
      const reducerDefinition = reducers2[reducerName];
      const reducerDetails = {
        reducerName,
        type: getType(name, reducerName),
        createNotation: typeof options.reducers === "function"
      };
      if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
      else handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
    });
    function buildReducer() {
      const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
      const finalCaseReducers = {
        ...extraReducers,
        ...context.sliceCaseReducersByType
      };
      return createReducer(options.initialState, (builder) => {
        for (let key in finalCaseReducers) builder.addCase(key, finalCaseReducers[key]);
        for (let sM of context.sliceMatchers) builder.addMatcher(sM.matcher, sM.reducer);
        for (let m of actionMatchers) builder.addMatcher(m.matcher, m.reducer);
        if (defaultCaseReducer) builder.addDefaultCase(defaultCaseReducer);
      });
    }
    const selectSelf = (state) => state;
    const injectedSelectorCache = /* @__PURE__ */ new Map();
    const injectedStateCache = /* @__PURE__ */ new WeakMap();
    let _reducer;
    function reducer(state, action) {
      if (!_reducer) _reducer = buildReducer();
      return _reducer(state, action);
    }
    function getInitialState() {
      if (!_reducer) _reducer = buildReducer();
      return _reducer.getInitialState();
    }
    function makeSelectorProps(reducerPath2, injected = false) {
      function selectSlice(state) {
        let sliceState = state[reducerPath2];
        if (typeof sliceState === "undefined") {
          if (injected) sliceState = getOrInsertComputed(injectedStateCache, selectSlice, getInitialState);
        }
        return sliceState;
      }
      function getSelectors(selectState = selectSelf) {
        return getOrInsertComputed(getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap()), selectState, () => {
          const map2 = {};
          for (const [name2, selector] of Object.entries(options.selectors ?? {})) map2[name2] = wrapSelector(selector, selectState, () => getOrInsertComputed(injectedStateCache, selectState, getInitialState), injected);
          return map2;
        });
      }
      return {
        reducerPath: reducerPath2,
        getSelectors,
        get selectors() {
          return getSelectors(selectSlice);
        },
        selectSlice
      };
    }
    const slice = {
      name,
      reducer,
      actions: context.actionCreators,
      caseReducers: context.sliceCaseReducersByName,
      getInitialState,
      ...makeSelectorProps(reducerPath),
      injectInto(injectable, { reducerPath: pathOpt, ...config2 } = {}) {
        const newReducerPath = pathOpt ?? reducerPath;
        injectable.inject({
          reducerPath: newReducerPath,
          reducer
        }, config2);
        return {
          ...slice,
          ...makeSelectorProps(newReducerPath, true)
        };
      }
    };
    return slice;
  };
}
function wrapSelector(selector, selectState, getInitialState, injected) {
  function wrapper(rootState, ...args) {
    let sliceState = selectState(rootState);
    if (typeof sliceState === "undefined") {
      if (injected) sliceState = getInitialState();
    }
    return selector(sliceState, ...args);
  }
  wrapper.unwrapped = selector;
  return wrapper;
}
const createSlice = /* @__PURE__ */ buildCreateSlice();
function buildReducerCreators() {
  function asyncThunk(payloadCreator, config2) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator,
      ...config2
    };
  }
  asyncThunk.withTypes = () => asyncThunk;
  return {
    reducer(caseReducer) {
      return Object.assign({ [caseReducer.name](...args) {
        return caseReducer(...args);
      } }[caseReducer.name], { _reducerDefinitionType: "reducer" });
    },
    preparedReducer(prepare, reducer) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare,
        reducer
      };
    },
    asyncThunk
  };
}
function handleNormalReducerDefinition({ type, reducerName, createNotation }, maybeReducerWithPrepare, context) {
  let caseReducer;
  let prepareCallback;
  if ("reducer" in maybeReducerWithPrepare) {
    if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) throw new Error(formatProdErrorMessage(17));
    caseReducer = maybeReducerWithPrepare.reducer;
    prepareCallback = maybeReducerWithPrepare.prepare;
  } else caseReducer = maybeReducerWithPrepare;
  context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "asyncThunk";
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "reducerWithPrepare";
}
function handleThunkCaseReducerDefinition({ type, reducerName }, reducerDefinition, context, cAT) {
  if (!cAT) throw new Error(formatProdErrorMessage(18));
  const { payloadCreator, fulfilled, pending, rejected, settled, options } = reducerDefinition;
  const thunk2 = cAT(type, payloadCreator, options);
  context.exposeAction(reducerName, thunk2);
  if (fulfilled) context.addCase(thunk2.fulfilled, fulfilled);
  if (pending) context.addCase(thunk2.pending, pending);
  if (rejected) context.addCase(thunk2.rejected, rejected);
  if (settled) context.addMatcher(thunk2.settled, settled);
  context.exposeCaseReducer(reducerName, {
    fulfilled: fulfilled || noop$1,
    pending: pending || noop$1,
    rejected: rejected || noop$1,
    settled: settled || noop$1
  });
}
function noop$1() {
}
const task = "task";
const listener = "listener";
const completed = "completed";
const cancelled = "cancelled";
const taskCancelled = `task-${cancelled}`;
const taskCompleted = `task-${completed}`;
const listenerCancelled = `${listener}-${cancelled}`;
const listenerCompleted = `${listener}-${completed}`;
var TaskAbortError = class {
  code;
  name = "TaskAbortError";
  message;
  constructor(code) {
    this.code = code;
    this.message = `${task} ${cancelled} (reason: ${code})`;
  }
};
const assertFunction = (func, expected) => {
  if (typeof func !== "function") throw new TypeError(formatProdErrorMessage(32));
};
const noop$2 = () => {
};
const catchRejection = (promise, onError = noop$2) => {
  promise.catch(onError);
  return promise;
};
const addAbortSignalListener = (abortSignal, callback) => {
  abortSignal.addEventListener("abort", callback, { once: true });
  return () => abortSignal.removeEventListener("abort", callback);
};
const validateActive = (signal) => {
  if (signal.aborted) throw new TaskAbortError(signal.reason);
};
function raceWithSignal(signal, promise) {
  let cleanup = noop$2;
  return new Promise((resolve, reject) => {
    const notifyRejection = () => reject(new TaskAbortError(signal.reason));
    if (signal.aborted) {
      notifyRejection();
      return;
    }
    cleanup = addAbortSignalListener(signal, notifyRejection);
    promise.finally(() => cleanup()).then(resolve, reject);
  }).finally(() => {
    cleanup = noop$2;
  });
}
const runTask = async (task2, cleanUp) => {
  try {
    await Promise.resolve();
    return {
      status: "ok",
      value: await task2()
    };
  } catch (error) {
    return {
      status: error instanceof TaskAbortError ? "cancelled" : "rejected",
      error
    };
  } finally {
    cleanUp?.();
  }
};
const createPause = (signal) => {
  return (promise) => {
    return catchRejection(raceWithSignal(signal, promise).then((output) => {
      validateActive(signal);
      return output;
    }));
  };
};
const createDelay = (signal) => {
  const pause = createPause(signal);
  return (timeoutMs) => {
    return pause(new Promise((resolve) => setTimeout(resolve, timeoutMs)));
  };
};
const { assign } = Object;
const INTERNAL_NIL_TOKEN = {};
const alm = "listenerMiddleware";
const createFork = (parentAbortSignal, parentBlockingPromises) => {
  const linkControllers = (controller) => addAbortSignalListener(parentAbortSignal, () => controller.abort(parentAbortSignal.reason));
  return (taskExecutor, opts) => {
    assertFunction(taskExecutor);
    const childAbortController = new AbortController();
    linkControllers(childAbortController);
    const result = runTask(async () => {
      validateActive(parentAbortSignal);
      validateActive(childAbortController.signal);
      const result2 = await taskExecutor({
        pause: createPause(childAbortController.signal),
        delay: createDelay(childAbortController.signal),
        signal: childAbortController.signal
      });
      validateActive(childAbortController.signal);
      return result2;
    }, () => childAbortController.abort(taskCompleted));
    if (opts?.autoJoin) parentBlockingPromises.push(result.catch(noop$2));
    return {
      result: createPause(parentAbortSignal)(result),
      cancel() {
        childAbortController.abort(taskCancelled);
      }
    };
  };
};
const createTakePattern = (startListening, signal) => {
  const take = async (predicate, timeout) => {
    validateActive(signal);
    let unsubscribe = () => {
    };
    const promises = [new Promise((resolve, reject) => {
      let stopListening = startListening({
        predicate,
        effect: (action, listenerApi) => {
          listenerApi.unsubscribe();
          resolve([
            action,
            listenerApi.getState(),
            listenerApi.getOriginalState()
          ]);
        }
      });
      unsubscribe = () => {
        stopListening();
        reject();
      };
    })];
    if (timeout != null) promises.push(new Promise((resolve) => setTimeout(resolve, timeout, null)));
    try {
      const output = await raceWithSignal(signal, Promise.race(promises));
      validateActive(signal);
      return output;
    } finally {
      unsubscribe();
    }
  };
  return ((predicate, timeout) => catchRejection(take(predicate, timeout)));
};
const getListenerEntryPropsFrom = (options) => {
  let { type, actionCreator, matcher, predicate, effect } = options;
  if (type) predicate = createAction(type).match;
  else if (actionCreator) {
    type = actionCreator.type;
    predicate = actionCreator.match;
  } else if (matcher) predicate = matcher;
  else if (predicate) ;
  else throw new Error(formatProdErrorMessage(21));
  assertFunction(effect);
  return {
    predicate,
    type,
    effect
  };
};
const createListenerEntry = /* @__PURE__ */ assign((options) => {
  const { type, predicate, effect } = getListenerEntryPropsFrom(options);
  return {
    id: nanoid(),
    effect,
    type,
    predicate,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(formatProdErrorMessage(22));
    }
  };
}, { withTypes: () => createListenerEntry });
const findListenerEntry = (listenerMap, options) => {
  const { type, effect, predicate } = getListenerEntryPropsFrom(options);
  return Array.from(listenerMap.values()).find((entry) => {
    return (typeof type === "string" ? entry.type === type : entry.predicate === predicate) && entry.effect === effect;
  });
};
const cancelActiveListeners = (entry) => {
  entry.pending.forEach((controller) => {
    controller.abort(listenerCancelled);
  });
};
const createClearListenerMiddleware = (listenerMap, executingListeners) => {
  return () => {
    for (const listener2 of executingListeners.keys()) cancelActiveListeners(listener2);
    listenerMap.clear();
  };
};
const safelyNotifyError = (errorHandler, errorToNotify, errorInfo) => {
  try {
    errorHandler(errorToNotify, errorInfo);
  } catch (errorHandlerError) {
    setTimeout(() => {
      throw errorHandlerError;
    }, 0);
  }
};
const addListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/add`), { withTypes: () => addListener });
const clearAllListeners = /* @__PURE__ */ createAction(`${alm}/removeAll`);
const removeListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/remove`), { withTypes: () => removeListener });
const defaultErrorHandler = (...args) => {
  console.error(`${alm}/error`, ...args);
};
const createListenerMiddleware = (middlewareOptions = {}) => {
  const listenerMap = /* @__PURE__ */ new Map();
  const executingListeners = /* @__PURE__ */ new Map();
  const trackExecutingListener = (entry) => {
    const count = executingListeners.get(entry) ?? 0;
    executingListeners.set(entry, count + 1);
  };
  const untrackExecutingListener = (entry) => {
    const count = executingListeners.get(entry) ?? 1;
    if (count === 1) executingListeners.delete(entry);
    else executingListeners.set(entry, count - 1);
  };
  const { extra, onError = defaultErrorHandler } = middlewareOptions;
  assertFunction(onError);
  const insertEntry = (entry) => {
    entry.unsubscribe = () => listenerMap.delete(entry.id);
    listenerMap.set(entry.id, entry);
    return (cancelOptions) => {
      entry.unsubscribe();
      if (cancelOptions?.cancelActive) cancelActiveListeners(entry);
    };
  };
  const startListening = ((options) => {
    const entry = findListenerEntry(listenerMap, options) ?? createListenerEntry(options);
    return insertEntry(entry);
  });
  assign(startListening, { withTypes: () => startListening });
  const stopListening = (options) => {
    const entry = findListenerEntry(listenerMap, options);
    if (entry) {
      entry.unsubscribe();
      if (options.cancelActive) cancelActiveListeners(entry);
    }
    return !!entry;
  };
  assign(stopListening, { withTypes: () => stopListening });
  const notifyListener = async (entry, action, api, getOriginalState) => {
    const internalTaskController = new AbortController();
    const take = createTakePattern(startListening, internalTaskController.signal);
    const autoJoinPromises = [];
    try {
      entry.pending.add(internalTaskController);
      trackExecutingListener(entry);
      await Promise.resolve(entry.effect(action, assign({}, api, {
        getOriginalState,
        condition: (predicate, timeout) => take(predicate, timeout).then(Boolean),
        take,
        delay: createDelay(internalTaskController.signal),
        pause: createPause(internalTaskController.signal),
        extra,
        signal: internalTaskController.signal,
        fork: createFork(internalTaskController.signal, autoJoinPromises),
        unsubscribe: entry.unsubscribe,
        subscribe: () => {
          listenerMap.set(entry.id, entry);
        },
        cancelActiveListeners: () => {
          entry.pending.forEach((controller, _, set2) => {
            if (controller !== internalTaskController) {
              controller.abort(listenerCancelled);
              set2.delete(controller);
            }
          });
        },
        cancel: () => {
          internalTaskController.abort(listenerCancelled);
          entry.pending.delete(internalTaskController);
        },
        throwIfCancelled: () => {
          validateActive(internalTaskController.signal);
        }
      })));
    } catch (listenerError) {
      if (!(listenerError instanceof TaskAbortError)) safelyNotifyError(onError, listenerError, { raisedBy: "effect" });
    } finally {
      await Promise.all(autoJoinPromises);
      internalTaskController.abort(listenerCompleted);
      untrackExecutingListener(entry);
      entry.pending.delete(internalTaskController);
    }
  };
  const clearListenerMiddleware = createClearListenerMiddleware(listenerMap, executingListeners);
  const middleware = (api) => (next) => (action) => {
    if (!isAction(action)) return next(action);
    if (addListener.match(action)) return startListening(action.payload);
    if (clearAllListeners.match(action)) {
      clearListenerMiddleware();
      return;
    }
    if (removeListener.match(action)) return stopListening(action.payload);
    let originalState = api.getState();
    const getOriginalState = () => {
      if (originalState === INTERNAL_NIL_TOKEN) throw new Error(formatProdErrorMessage(23));
      return originalState;
    };
    let result;
    try {
      result = next(action);
      if (listenerMap.size > 0) {
        const currentState = api.getState();
        const listenerEntries = Array.from(listenerMap.values());
        for (const entry of listenerEntries) {
          let runListener = false;
          try {
            runListener = entry.predicate(action, currentState, originalState);
          } catch (predicateError) {
            runListener = false;
            safelyNotifyError(onError, predicateError, { raisedBy: "predicate" });
          }
          if (!runListener) continue;
          notifyListener(entry, action, api, getOriginalState);
        }
      }
    } finally {
      originalState = INTERNAL_NIL_TOKEN;
    }
    return result;
  };
  return {
    middleware,
    startListening,
    stopListening,
    clearListeners: clearListenerMiddleware
  };
};
function formatProdErrorMessage(code) {
  return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
var initialState$d = {
  layoutType: "horizontal",
  width: 0,
  height: 0,
  margin: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  scale: 1
};
var chartLayoutSlice = createSlice({
  name: "chartLayout",
  initialState: initialState$d,
  reducers: {
    setLayout(state, action) {
      state.layoutType = action.payload;
    },
    setChartSize(state, action) {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    setMargin(state, action) {
      var _action$payload$top, _action$payload$right, _action$payload$botto, _action$payload$left;
      state.margin.top = (_action$payload$top = action.payload.top) !== null && _action$payload$top !== void 0 ? _action$payload$top : 0;
      state.margin.right = (_action$payload$right = action.payload.right) !== null && _action$payload$right !== void 0 ? _action$payload$right : 0;
      state.margin.bottom = (_action$payload$botto = action.payload.bottom) !== null && _action$payload$botto !== void 0 ? _action$payload$botto : 0;
      state.margin.left = (_action$payload$left = action.payload.left) !== null && _action$payload$left !== void 0 ? _action$payload$left : 0;
    },
    setScale(state, action) {
      state.scale = action.payload;
    }
  }
});
var _chartLayoutSlice$act = chartLayoutSlice.actions, setMargin = _chartLayoutSlice$act.setMargin, setLayout = _chartLayoutSlice$act.setLayout, setChartSize = _chartLayoutSlice$act.setChartSize, setScale = _chartLayoutSlice$act.setScale;
var chartLayoutReducer = chartLayoutSlice.reducer;
function getSliced(arr, startIndex, endIndex) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  if (arr && startIndex + endIndex !== 0) {
    return arr.slice(startIndex, endIndex + 1);
  }
  return arr;
}
function isWellBehavedNumber(n) {
  return Number.isFinite(n);
}
function isPositiveNumber(n) {
  return typeof n === "number" && n > 0 && Number.isFinite(n);
}
function ownKeys$E(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$E(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$E(Object(t), true).forEach(function(r2) {
      _defineProperty$H(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$E(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$H(e, r, t) {
  return (r = _toPropertyKey$H(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$H(t) {
  var i = _toPrimitive$H(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$H(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getValueByDataKey(obj, dataKey, defaultValue) {
  if (isNullish(obj) || isNullish(dataKey)) {
    return defaultValue;
  }
  if (isNumOrStr(dataKey)) {
    return get$1(obj, dataKey, defaultValue);
  }
  if (typeof dataKey === "function") {
    return dataKey(obj);
  }
  return defaultValue;
}
var appendOffsetOfLegend = (offset, legendSettings, legendSize) => {
  if (legendSettings && legendSize) {
    var boxWidth = legendSize.width, boxHeight = legendSize.height;
    var align = legendSettings.align, verticalAlign = legendSettings.verticalAlign, layout = legendSettings.layout, position = legendSettings.position, _legendSettings$offse = legendSettings.offset, legendOffset = _legendSettings$offse === void 0 ? 0 : _legendSettings$offse;
    if (position != null) {
      if (isOutsidePosition(position)) {
        if (position === "top" && isNumber(offset.top)) {
          return _objectSpread$E(_objectSpread$E({}, offset), {}, {
            top: offset.top + (boxHeight || 0) + legendOffset
          });
        }
        if (position === "bottom" && isNumber(offset.bottom)) {
          return _objectSpread$E(_objectSpread$E({}, offset), {}, {
            bottom: offset.bottom + (boxHeight || 0) + legendOffset
          });
        }
        if (position === "left" && isNumber(offset.left)) {
          return _objectSpread$E(_objectSpread$E({}, offset), {}, {
            left: offset.left + (boxWidth || 0) + legendOffset
          });
        }
        if (position === "right" && isNumber(offset.right)) {
          return _objectSpread$E(_objectSpread$E({}, offset), {}, {
            right: offset.right + (boxWidth || 0) + legendOffset
          });
        }
      }
      return offset;
    }
    if ((layout === "vertical" || layout === "horizontal" && verticalAlign === "middle") && align !== "center" && isNumber(offset[align])) {
      return _objectSpread$E(_objectSpread$E({}, offset), {}, {
        [align]: offset[align] + (boxWidth || 0)
      });
    }
    if ((layout === "horizontal" || layout === "vertical" && align === "center") && verticalAlign !== "middle" && isNumber(offset[verticalAlign])) {
      return _objectSpread$E(_objectSpread$E({}, offset), {}, {
        [verticalAlign]: offset[verticalAlign] + (boxHeight || 0)
      });
    }
  }
  return offset;
};
var isCategoricalAxis = (layout, axisType) => layout === "horizontal" && axisType === "xAxis" || layout === "vertical" && axisType === "yAxis" || layout === "centric" && axisType === "angleAxis" || layout === "radial" && axisType === "radiusAxis";
var getCoordinatesOfGrid = (ticks2, minValue, maxValue, syncWithTicks) => {
  if (syncWithTicks) {
    return ticks2.map((entry) => entry.coordinate);
  }
  var hasMin, hasMax;
  var values = ticks2.map((entry) => {
    if (entry.coordinate === minValue) {
      hasMin = true;
    }
    if (entry.coordinate === maxValue) {
      hasMax = true;
    }
    return entry.coordinate;
  });
  if (!hasMin) {
    values.push(minValue);
  }
  if (!hasMax) {
    values.push(maxValue);
  }
  return values;
};
var getTicksOfAxis = (axis, isGrid, isAll) => {
  if (!axis) {
    return null;
  }
  var duplicateDomain = axis.duplicateDomain, type = axis.type, range2 = axis.range, scale = axis.scale, realScaleType = axis.realScaleType, isCategorical = axis.isCategorical, categoricalDomain = axis.categoricalDomain, tickCount = axis.tickCount, ticks2 = axis.ticks, niceTicks = axis.niceTicks, axisType = axis.axisType;
  if (!scale) {
    return null;
  }
  var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && range2 && range2.length >= 2 ? mathSign(range2[0] - range2[1]) * 2 * offset : offset;
  if (ticks2 || niceTicks) {
    var result = (ticks2 || niceTicks || []).map((entry, index) => {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      var scaled = scale.map(scaleContent);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: scaled + offset,
        value: entry,
        offset,
        index
      };
    }).filter(isNotNil);
    return result;
  }
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  if (scale.ticks && true && tickCount != null) {
    return scale.ticks(tickCount).map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use Date as an index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var truncateByDomain = (value, domain) => {
  if (!domain || domain.length !== 2 || !isNumber(domain[0]) || !isNumber(domain[1])) {
    return value;
  }
  var minValue = Math.min(domain[0], domain[1]);
  var maxValue = Math.max(domain[0], domain[1]);
  var result = [value[0], value[1]];
  if (!isNumber(value[0]) || value[0] < minValue) {
    result[0] = minValue;
  }
  if (!isNumber(value[1]) || value[1] > maxValue) {
    result[1] = maxValue;
  }
  if (result[0] > maxValue) {
    result[0] = maxValue;
  }
  if (result[1] < minValue) {
    result[1] = minValue;
  }
  return result;
};
var offsetSign = (series) => {
  var _series$;
  var n = series.length;
  if (n <= 0) {
    return;
  }
  var m = (_series$ = series[0]) === null || _series$ === void 0 ? void 0 : _series$.length;
  if (m == null || m <= 0) {
    return;
  }
  for (var j = 0; j < m; ++j) {
    var positive = 0;
    var negative = 0;
    for (var i = 0; i < n; ++i) {
      var row = series[i];
      var col = row === null || row === void 0 ? void 0 : row[j];
      if (col == null) {
        continue;
      }
      var series1 = col[1];
      var series0 = col[0];
      var value = isNan(series1) ? series0 : series1;
      if (value >= 0) {
        col[0] = positive;
        positive += value;
        col[1] = positive;
      } else {
        col[0] = negative;
        negative += value;
        col[1] = negative;
      }
    }
  }
};
var offsetPositive = (series) => {
  var _series$2;
  var n = series.length;
  if (n <= 0) {
    return;
  }
  var m = (_series$2 = series[0]) === null || _series$2 === void 0 ? void 0 : _series$2.length;
  if (m == null || m <= 0) {
    return;
  }
  for (var j = 0; j < m; ++j) {
    var positive = 0;
    for (var i = 0; i < n; ++i) {
      var row = series[i];
      var col = row === null || row === void 0 ? void 0 : row[j];
      if (col == null) {
        continue;
      }
      var value = isNan(col[1]) ? col[0] : col[1];
      if (value >= 0) {
        col[0] = positive;
        positive += value;
        col[1] = positive;
      } else {
        col[0] = 0;
        col[1] = 0;
      }
    }
  }
};
var STACK_OFFSET_MAP = {
  sign: offsetSign,
  // @ts-expect-error definitelytyped types are incorrect
  expand: stackOffsetExpand,
  // @ts-expect-error definitelytyped types are incorrect
  none: stackOffsetNone,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: stackOffsetSilhouette,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: stackOffsetWiggle,
  positive: offsetPositive
};
var getStackedData = (data, dataKeys, offsetType) => {
  var _STACK_OFFSET_MAP$off;
  var offsetAccessor = (_STACK_OFFSET_MAP$off = STACK_OFFSET_MAP[offsetType]) !== null && _STACK_OFFSET_MAP$off !== void 0 ? _STACK_OFFSET_MAP$off : stackOffsetNone;
  var stack = shapeStack().keys(dataKeys).value((d, key) => Number(getValueByDataKey(d, key, 0))).order(stackOrderNone).offset(offsetAccessor);
  var result = stack(data);
  result.forEach((series, seriesIndex) => {
    series.forEach((point2, pointIndex) => {
      var value = getValueByDataKey(data[pointIndex], dataKeys[seriesIndex], 0);
      if (Array.isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1])) {
        point2[0] = value[0];
        point2[1] = value[1];
      }
    });
  });
  return result;
};
function getNormalizedStackId(publicStackId) {
  return publicStackId == null ? void 0 : String(publicStackId);
}
function getCateCoordinateOfLine(_ref2) {
  var axis = _ref2.axis, ticks2 = _ref2.ticks, bandSize = _ref2.bandSize, entry = _ref2.entry, index = _ref2.index, dataKey = _ref2.dataKey;
  if (axis.type === "category") {
    if (!axis.allowDuplicatedCategory && axis.dataKey && !isNullish(entry[axis.dataKey])) {
      var matchedTick = findEntryInArray(ticks2, "value", entry[axis.dataKey]);
      if (matchedTick) {
        return matchedTick.coordinate + bandSize / 2;
      }
    }
    return ticks2 !== null && ticks2 !== void 0 && ticks2[index] ? ticks2[index].coordinate + bandSize / 2 : null;
  }
  var value = getValueByDataKey(entry, !isNullish(dataKey) ? dataKey : axis.dataKey);
  var scaled = axis.scale.map(value);
  if (!isNumber(scaled)) {
    return null;
  }
  return scaled;
}
var getCateCoordinateOfBar = (_ref2) => {
  var axis = _ref2.axis, ticks2 = _ref2.ticks, offset = _ref2.offset, bandSize = _ref2.bandSize, entry = _ref2.entry, index = _ref2.index;
  if (axis.type === "category") {
    return ticks2[index] ? ticks2[index].coordinate + offset : null;
  }
  var value = getValueByDataKey(entry, axis.dataKey, axis.scale.domain()[index]);
  if (isNullish(value)) {
    return null;
  }
  var scaled = axis.scale.map(value);
  if (!isNumber(scaled)) {
    return null;
  }
  return scaled - bandSize / 2 + offset;
};
var getBaseValueOfBar = (_ref3) => {
  var numericAxis = _ref3.numericAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var minValue = Math.min(domain[0], domain[1]);
    var maxValue = Math.max(domain[0], domain[1]);
    if (minValue <= 0 && maxValue >= 0) {
      return 0;
    }
    if (maxValue < 0) {
      return maxValue;
    }
    return minValue;
  }
  return domain[0];
};
var getDomainOfSingle = (data) => {
  var flat = data.flat(2).filter(isNumber);
  return [Math.min(...flat), Math.max(...flat)];
};
var makeDomainFinite = (domain) => {
  return [domain[0] === Infinity ? 0 : domain[0], domain[1] === -Infinity ? 0 : domain[1]];
};
var getDomainOfStackGroups = (stackGroups, startIndex, endIndex) => {
  if (stackGroups == null || Object.keys(stackGroups).length === 0) {
    return void 0;
  }
  return makeDomainFinite(Object.keys(stackGroups).reduce((result, stackId) => {
    var group = stackGroups[stackId];
    if (!group) {
      return result;
    }
    var stackedData = group.stackedData;
    var domain = stackedData.reduce((res, entry) => {
      var sliced = getSliced(entry, startIndex, endIndex);
      var s2 = getDomainOfSingle(sliced);
      if (!isWellBehavedNumber(s2[0]) || !isWellBehavedNumber(s2[1])) {
        return res;
      }
      return [Math.min(res[0], s2[0]), Math.max(res[1], s2[1])];
    }, [Infinity, -Infinity]);
    return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
  }, [Infinity, -Infinity]));
};
var MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var getBandSizeOfAxis = (axis, ticks2, isBar) => {
  if (axis && axis.scale && axis.scale.bandwidth) {
    var bandWidth = axis.scale.bandwidth();
    if (!isBar || bandWidth > 0) {
      return bandWidth;
    }
  }
  if (axis && ticks2 && ticks2.length >= 2) {
    var orderedTicks = sortBy$1(ticks2, (o) => o.coordinate);
    var gaps = [];
    var maxGap = 0;
    for (var i = 1, len = orderedTicks.length; i < len; i++) {
      var _orderedTicks$i, _orderedTicks;
      var gap = (((_orderedTicks$i = orderedTicks[i]) === null || _orderedTicks$i === void 0 ? void 0 : _orderedTicks$i.coordinate) || 0) - (((_orderedTicks = orderedTicks[i - 1]) === null || _orderedTicks === void 0 ? void 0 : _orderedTicks.coordinate) || 0);
      gaps.push(gap);
      maxGap = Math.max(gap, maxGap);
    }
    var minMeaningfulGap = maxGap * 1e-4;
    var bandSize = Infinity;
    for (var _gap of gaps) {
      if (_gap > minMeaningfulGap) {
        bandSize = Math.min(_gap, bandSize);
      }
    }
    return bandSize === Infinity ? 0 : bandSize;
  }
  return isBar ? void 0 : 0;
};
function getTooltipEntry(_ref4) {
  var tooltipEntrySettings = _ref4.tooltipEntrySettings, dataKey = _ref4.dataKey, payload = _ref4.payload, value = _ref4.value, name = _ref4.name;
  return _objectSpread$E(_objectSpread$E({}, tooltipEntrySettings), {}, {
    dataKey,
    payload,
    value,
    name
  });
}
function getTooltipNameProp(nameFromItem, dataKey) {
  if (nameFromItem != null) {
    return String(nameFromItem);
  }
  if (typeof dataKey === "string") {
    return dataKey;
  }
  return void 0;
}
var calculateCartesianTooltipPos = (coordinate, layout) => {
  if (layout === "horizontal") {
    return coordinate.relativeX;
  }
  if (layout === "vertical") {
    return coordinate.relativeY;
  }
  return void 0;
};
var calculatePolarTooltipPos = (rangeObj, layout) => {
  if (layout === "centric") {
    return rangeObj.angle;
  }
  return rangeObj.radius;
};
var selectChartWidth = (state) => state.layout.width;
var selectChartHeight = (state) => state.layout.height;
var selectContainerScale = (state) => state.layout.scale;
var selectMargin = (state) => state.layout.margin;
var selectAllXAxes = createSelector((state) => state.cartesianAxis.xAxis, (xAxisMap) => {
  return Object.values(xAxisMap);
});
var selectAllYAxes = createSelector((state) => state.cartesianAxis.yAxis, (yAxisMap) => {
  return Object.values(yAxisMap);
});
var DATA_ITEM_INDEX_ATTRIBUTE_NAME = "data-recharts-item-index";
var DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME = "data-recharts-item-id";
var DEFAULT_Y_AXIS_WIDTH = 60;
var DEFAULT_X_AXIS_HEIGHT = 30;
function ownKeys$D(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$D(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$D(Object(t), true).forEach(function(r2) {
      _defineProperty$G(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$D(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$G(e, r, t) {
  return (r = _toPropertyKey$G(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$G(t) {
  var i = _toPrimitive$G(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$G(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var selectBrushHeight = (state) => state.brush.height;
function selectLeftAxesOffset(state) {
  var yAxes = selectAllYAxes(state);
  return yAxes.reduce((result, entry) => {
    if (entry.orientation === "left" && !entry.mirror && !entry.hide) {
      var width = typeof entry.width === "number" ? entry.width : DEFAULT_Y_AXIS_WIDTH;
      return result + width;
    }
    return result;
  }, 0);
}
function selectRightAxesOffset(state) {
  var yAxes = selectAllYAxes(state);
  return yAxes.reduce((result, entry) => {
    if (entry.orientation === "right" && !entry.mirror && !entry.hide) {
      var width = typeof entry.width === "number" ? entry.width : DEFAULT_Y_AXIS_WIDTH;
      return result + width;
    }
    return result;
  }, 0);
}
function selectTopAxesOffset(state) {
  var xAxes = selectAllXAxes(state);
  return xAxes.reduce((result, entry) => {
    if (entry.orientation === "top" && !entry.mirror && !entry.hide) {
      var height = typeof entry.height === "number" ? entry.height : DEFAULT_X_AXIS_HEIGHT;
      return result + height;
    }
    return result;
  }, 0);
}
function selectBottomAxesOffset(state) {
  var xAxes = selectAllXAxes(state);
  return xAxes.reduce((result, entry) => {
    if (entry.orientation === "bottom" && !entry.mirror && !entry.hide) {
      var height = typeof entry.height === "number" ? entry.height : DEFAULT_X_AXIS_HEIGHT;
      return result + height;
    }
    return result;
  }, 0);
}
var selectChartOffsetInternal = createSelector([selectChartWidth, selectChartHeight, selectMargin, selectBrushHeight, selectLeftAxesOffset, selectRightAxesOffset, selectTopAxesOffset, selectBottomAxesOffset, selectLegendSettings, selectLegendSize], (chartWidth, chartHeight, margin, brushHeight, leftAxesOffset, rightAxesOffset, topAxesOffset, bottomAxesOffset, legendSettings, legendSize) => {
  var offsetH = {
    left: (margin.left || 0) + leftAxesOffset,
    right: (margin.right || 0) + rightAxesOffset
  };
  var offsetV = {
    top: (margin.top || 0) + topAxesOffset,
    bottom: (margin.bottom || 0) + bottomAxesOffset
  };
  var offset = _objectSpread$D(_objectSpread$D({}, offsetV), offsetH);
  var brushBottom = offset.bottom;
  offset.bottom += brushHeight;
  offset = appendOffsetOfLegend(offset, legendSettings, legendSize);
  var offsetWidth = chartWidth - offset.left - offset.right;
  var offsetHeight = chartHeight - offset.top - offset.bottom;
  return _objectSpread$D(_objectSpread$D({
    brushBottom
  }, offset), {}, {
    // never return negative values for height and width
    width: Math.max(offsetWidth, 0),
    height: Math.max(offsetHeight, 0)
  });
});
var selectChartViewBox = createSelector(selectChartOffsetInternal, (offset) => ({
  x: offset.left,
  y: offset.top,
  width: offset.width,
  height: offset.height
}));
var selectAxisViewBox = createSelector(selectChartWidth, selectChartHeight, (width, height) => ({
  x: 0,
  y: 0,
  width,
  height
}));
var PanoramaContext = /* @__PURE__ */ reactExports.createContext(null);
var useIsPanorama = () => reactExports.useContext(PanoramaContext) != null;
var selectBrushSettings = (state) => state.brush;
var selectBrushDimensions = createSelector([selectBrushSettings, selectChartOffsetInternal, selectMargin], (brushSettings, offset, margin) => ({
  height: brushSettings.height,
  x: isNumber(brushSettings.x) ? brushSettings.x : offset.left,
  y: isNumber(brushSettings.y) ? brushSettings.y : offset.top + offset.height + offset.brushBottom - ((margin === null || margin === void 0 ? void 0 : margin.bottom) || 0),
  width: isNumber(brushSettings.width) ? brushSettings.width : offset.width
}));
function debounce$1(func, debounceMs, { signal, edges } = {}) {
  let pendingThis = void 0;
  let pendingArgs = null;
  const leading = edges != null && edges.includes("leading");
  const trailing = edges == null || edges.includes("trailing");
  const invoke = () => {
    if (pendingArgs !== null) {
      func.apply(pendingThis, pendingArgs);
      pendingThis = void 0;
      pendingArgs = null;
    }
  };
  const onTimerEnd = () => {
    if (trailing) invoke();
    cancel();
  };
  let timeoutId2 = null;
  const schedule = () => {
    if (timeoutId2 != null) clearTimeout(timeoutId2);
    timeoutId2 = setTimeout(() => {
      timeoutId2 = null;
      onTimerEnd();
    }, debounceMs);
  };
  const cancelTimer = () => {
    if (timeoutId2 !== null) {
      clearTimeout(timeoutId2);
      timeoutId2 = null;
    }
  };
  const cancel = () => {
    cancelTimer();
    pendingThis = void 0;
    pendingArgs = null;
  };
  const flush = () => {
    invoke();
  };
  const debounced = function(...args) {
    if (signal?.aborted) return;
    pendingThis = this;
    pendingArgs = args;
    const isFirstCall = timeoutId2 == null;
    schedule();
    if (leading && isFirstCall) invoke();
  };
  debounced.schedule = schedule;
  debounced.cancel = cancel;
  debounced.flush = flush;
  signal?.addEventListener("abort", cancel, { once: true });
  return debounced;
}
function debounce(func, debounceMs = 0, options = {}) {
  if (typeof options !== "object") options = {};
  const { leading = false, trailing = true, maxWait } = options;
  const edges = Array(2);
  if (leading) edges[0] = "leading";
  if (trailing) edges[1] = "trailing";
  let result = void 0;
  let pendingAt = null;
  const _debounced = debounce$1(function(...args) {
    result = func.apply(this, args);
    pendingAt = null;
  }, debounceMs, { edges });
  const debounced = function(...args) {
    if (maxWait != null) {
      if (pendingAt === null) pendingAt = Date.now();
      if (Date.now() - pendingAt >= maxWait) {
        if (leading || trailing) result = func.apply(this, args);
        pendingAt = Date.now();
        _debounced.cancel();
        _debounced.schedule();
        return result;
      }
    }
    _debounced.apply(this, args);
    return result;
  };
  const flush = () => {
    _debounced.flush();
    return result;
  };
  debounced.cancel = _debounced.cancel;
  debounced.flush = flush;
  return debounced;
}
function throttle(func, throttleMs = 0, options = {}) {
  const { leading = true, trailing = true } = options;
  return debounce(func, throttleMs, {
    leading,
    maxWait: throttleMs,
    trailing
  });
}
var warn = function warn2(condition, format2) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  if (typeof console !== "undefined" && console.warn) {
    if (format2 === void 0) {
      console.warn("LogUtils requires an error message argument");
    }
    if (!condition) {
      if (format2 === void 0) {
        console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var argIndex = 0;
        console.warn(format2.replace(/%s/g, () => args[argIndex++]));
      }
    }
  }
};
var defaultResponsiveContainerProps = {
  width: "100%",
  height: "100%",
  debounce: 0,
  minWidth: 0,
  initialDimension: {
    width: -1,
    height: -1
  }
};
var calculateChartDimensions = (containerWidth, containerHeight, props) => {
  var _props$width = props.width, width = _props$width === void 0 ? defaultResponsiveContainerProps.width : _props$width, _props$height = props.height, height = _props$height === void 0 ? defaultResponsiveContainerProps.height : _props$height, aspect = props.aspect, maxHeight = props.maxHeight;
  var calculatedWidth = isPercent(width) ? containerWidth : Number(width);
  var calculatedHeight = isPercent(height) ? containerHeight : Number(height);
  if (aspect && aspect > 0) {
    if (calculatedWidth) {
      calculatedHeight = calculatedWidth / aspect;
    } else if (calculatedHeight) {
      calculatedWidth = calculatedHeight * aspect;
    }
    if (maxHeight && calculatedHeight != null && calculatedHeight > maxHeight) {
      calculatedHeight = maxHeight;
    }
  }
  return {
    calculatedWidth,
    calculatedHeight
  };
};
var bothOverflow = {
  width: 0,
  height: 0,
  overflow: "visible"
};
var overflowX = {
  width: 0,
  overflowX: "visible"
};
var overflowY = {
  height: 0,
  overflowY: "visible"
};
var noStyle = {};
var getInnerDivStyle = (props) => {
  var width = props.width, height = props.height;
  var isWidthPercent = isPercent(width);
  var isHeightPercent = isPercent(height);
  if (isWidthPercent && isHeightPercent) {
    return bothOverflow;
  }
  if (isWidthPercent) {
    return overflowX;
  }
  if (isHeightPercent) {
    return overflowY;
  }
  return noStyle;
};
function getDefaultWidthAndHeight(_ref2) {
  var width = _ref2.width, height = _ref2.height, aspect = _ref2.aspect;
  var calculatedWidth = width;
  var calculatedHeight = height;
  if (calculatedWidth === void 0 && calculatedHeight === void 0) {
    calculatedWidth = defaultResponsiveContainerProps.width;
    calculatedHeight = defaultResponsiveContainerProps.height;
  } else if (calculatedWidth === void 0) {
    calculatedWidth = aspect && aspect > 0 ? void 0 : defaultResponsiveContainerProps.width;
  } else if (calculatedHeight === void 0) {
    calculatedHeight = aspect && aspect > 0 ? void 0 : defaultResponsiveContainerProps.height;
  }
  return {
    width: calculatedWidth,
    height: calculatedHeight
  };
}
var _excluded$p = ["aspect", "initialDimension", "width", "height", "minWidth", "minHeight", "maxHeight", "children", "debounce", "id", "className", "onResize", "style"];
function _extends$r() {
  return _extends$r = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$r.apply(null, arguments);
}
function ownKeys$C(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$C(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$C(Object(t), true).forEach(function(r2) {
      _defineProperty$F(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$C(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$F(e, r, t) {
  return (r = _toPropertyKey$F(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$F(t) {
  var i = _toPrimitive$F(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$F(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$l(r, e) {
  return _arrayWithHoles$l(r) || _iterableToArrayLimit$l(r, e) || _unsupportedIterableToArray$l(r, e) || _nonIterableRest$l();
}
function _nonIterableRest$l() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$l(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$l(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$l(r, a2) : void 0;
  }
}
function _arrayLikeToArray$l(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$l(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$l(r) {
  if (Array.isArray(r)) return r;
}
function _objectWithoutProperties$p(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$p(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$p(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var ResponsiveContainerContext = /* @__PURE__ */ reactExports.createContext(defaultResponsiveContainerProps.initialDimension);
function isAcceptableSize(size) {
  return isPositiveNumber(size.width) && isPositiveNumber(size.height);
}
function ResponsiveContainerContextProvider(_ref2) {
  var children = _ref2.children, width = _ref2.width, height = _ref2.height;
  var size = reactExports.useMemo(() => ({
    width,
    height
  }), [width, height]);
  if (!isAcceptableSize(size)) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ResponsiveContainerContext.Provider, {
    value: size
  }, children);
}
var useResponsiveContainerContext = () => reactExports.useContext(ResponsiveContainerContext);
var SizeDetectorContainer = /* @__PURE__ */ reactExports.forwardRef((_ref2, ref) => {
  var aspect = _ref2.aspect, _ref2$initialDimensio = _ref2.initialDimension, initialDimension = _ref2$initialDimensio === void 0 ? defaultResponsiveContainerProps.initialDimension : _ref2$initialDimensio, width = _ref2.width, height = _ref2.height, _ref2$minWidth = _ref2.minWidth, minWidth = _ref2$minWidth === void 0 ? defaultResponsiveContainerProps.minWidth : _ref2$minWidth, minHeight = _ref2.minHeight, maxHeight = _ref2.maxHeight, children = _ref2.children, _ref2$debounce = _ref2.debounce, debounce2 = _ref2$debounce === void 0 ? defaultResponsiveContainerProps.debounce : _ref2$debounce, id = _ref2.id, className = _ref2.className, onResize = _ref2.onResize, _ref2$style = _ref2.style, style = _ref2$style === void 0 ? {} : _ref2$style, others = _objectWithoutProperties$p(_ref2, _excluded$p);
  var containerRef = reactExports.useRef(null);
  var onResizeRef = reactExports.useRef();
  onResizeRef.current = onResize;
  reactExports.useImperativeHandle(ref, () => containerRef.current);
  var _useState = reactExports.useState({
    containerWidth: initialDimension.width,
    containerHeight: initialDimension.height
  }), _useState2 = _slicedToArray$l(_useState, 2), sizes = _useState2[0], setSizes = _useState2[1];
  var setContainerSize = reactExports.useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  reactExports.useEffect(() => {
    if (containerRef.current == null || typeof ResizeObserver === "undefined") {
      return noop$5;
    }
    var callback = (entries) => {
      var _onResizeRef$current;
      var entry = entries[0];
      if (entry == null) {
        return;
      }
      var _entry$contentRect = entry.contentRect, containerWidth3 = _entry$contentRect.width, containerHeight3 = _entry$contentRect.height;
      setContainerSize(containerWidth3, containerHeight3);
      (_onResizeRef$current = onResizeRef.current) === null || _onResizeRef$current === void 0 || _onResizeRef$current.call(onResizeRef, containerWidth3, containerHeight3);
    };
    if (debounce2 > 0) {
      callback = throttle(callback, debounce2, {
        trailing: true,
        leading: false
      });
    }
    var observer = new ResizeObserver(callback);
    var _containerRef$current = containerRef.current.getBoundingClientRect(), containerWidth2 = _containerRef$current.width, containerHeight2 = _containerRef$current.height;
    setContainerSize(containerWidth2, containerHeight2);
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [setContainerSize, debounce2]);
  var containerWidth = sizes.containerWidth, containerHeight = sizes.containerHeight;
  warn(!aspect || aspect > 0, "The aspect(%s) must be greater than zero.", aspect);
  var _calculateChartDimens = calculateChartDimensions(containerWidth, containerHeight, {
    width,
    height,
    aspect,
    maxHeight
  }), calculatedWidth = _calculateChartDimens.calculatedWidth, calculatedHeight = _calculateChartDimens.calculatedHeight;
  warn(containerWidth < 0 || containerHeight < 0 || calculatedWidth != null && calculatedWidth > 0 || calculatedHeight != null && calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
  return /* @__PURE__ */ reactExports.createElement("div", _extends$r({
    id: id ? "".concat(id) : void 0,
    className: clsx("recharts-responsive-container", className),
    style: _objectSpread$C(_objectSpread$C({}, style), {}, {
      width,
      height,
      minWidth,
      minHeight,
      maxHeight
    }),
    ref: containerRef
  }, others), /* @__PURE__ */ reactExports.createElement("div", {
    style: getInnerDivStyle({
      width,
      height
    })
  }, /* @__PURE__ */ reactExports.createElement(ResponsiveContainerContextProvider, {
    width: calculatedWidth,
    height: calculatedHeight
  }, children)));
});
var ResponsiveContainer = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var responsiveContainerContext = useResponsiveContainerContext();
  if (isPositiveNumber(responsiveContainerContext.width) && isPositiveNumber(responsiveContainerContext.height)) {
    return props.children;
  }
  var _getDefaultWidthAndHe = getDefaultWidthAndHeight({
    width: props.width,
    height: props.height,
    aspect: props.aspect
  }), width = _getDefaultWidthAndHe.width, height = _getDefaultWidthAndHe.height;
  var _calculateChartDimens2 = calculateChartDimensions(void 0, void 0, {
    width,
    height,
    aspect: props.aspect,
    maxHeight: props.maxHeight
  }), calculatedWidth = _calculateChartDimens2.calculatedWidth, calculatedHeight = _calculateChartDimens2.calculatedHeight;
  if (isNumber(calculatedWidth) && isNumber(calculatedHeight)) {
    return /* @__PURE__ */ reactExports.createElement(ResponsiveContainerContextProvider, {
      width: calculatedWidth,
      height: calculatedHeight
    }, props.children);
  }
  return /* @__PURE__ */ reactExports.createElement(SizeDetectorContainer, _extends$r({}, props, {
    width,
    height,
    ref
  }));
});
var useViewBox = () => {
  var _useAppSelector;
  var panorama = useIsPanorama();
  var rootViewBox = useAppSelector(selectChartViewBox);
  var brushDimensions = useAppSelector(selectBrushDimensions);
  var brushPadding = (_useAppSelector = useAppSelector(selectBrushSettings)) === null || _useAppSelector === void 0 ? void 0 : _useAppSelector.padding;
  if (!panorama || !brushDimensions || !brushPadding) {
    return rootViewBox;
  }
  return {
    width: brushDimensions.width - brushPadding.left - brushPadding.right,
    height: brushDimensions.height - brushPadding.top - brushPadding.bottom,
    x: brushPadding.left,
    y: brushPadding.top
  };
};
var manyComponentsThrowErrorsIfOffsetIsUndefined = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
};
var useOffsetInternal = () => {
  var _useAppSelector2;
  return (_useAppSelector2 = useAppSelector(selectChartOffsetInternal)) !== null && _useAppSelector2 !== void 0 ? _useAppSelector2 : manyComponentsThrowErrorsIfOffsetIsUndefined;
};
var useChartWidth = () => {
  return useAppSelector(selectChartWidth);
};
var useChartHeight = () => {
  return useAppSelector(selectChartHeight);
};
var useMargin = () => {
  return useAppSelector((state) => state.layout.margin);
};
var selectChartLayout = (state) => state.layout.layoutType;
var useChartLayout = () => useAppSelector(selectChartLayout);
var useCartesianChartLayout = () => {
  var layout = useChartLayout();
  if (layout === "horizontal" || layout === "vertical") {
    return layout;
  }
  return void 0;
};
var selectPolarChartLayout = (state) => {
  var layout = state.layout.layoutType;
  if (layout === "centric" || layout === "radial") {
    return layout;
  }
  return void 0;
};
var usePolarChartLayout = () => {
  return useAppSelector(selectPolarChartLayout);
};
var useIsInChartContext = () => {
  var layout = useChartLayout();
  return layout !== void 0;
};
var ReportChartSize = (props) => {
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  var widthFromProps = props.width, heightFromProps = props.height;
  var responsiveContainerCalculations = useResponsiveContainerContext();
  var width = widthFromProps;
  var height = heightFromProps;
  if (responsiveContainerCalculations) {
    width = responsiveContainerCalculations.width > 0 ? responsiveContainerCalculations.width : widthFromProps;
    height = responsiveContainerCalculations.height > 0 ? responsiveContainerCalculations.height : heightFromProps;
  }
  reactExports.useEffect(() => {
    if (!isPanorama && isPositiveNumber(width) && isPositiveNumber(height)) {
      dispatch(setChartSize({
        width,
        height
      }));
    }
  }, [dispatch, isPanorama, width, height]);
  return null;
};
var initialState$c = {
  settings: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
    itemSorter: "value",
    position: void 0,
    offset: 0
  },
  size: {
    width: 0,
    height: 0
  },
  payload: []
};
var legendSlice = createSlice({
  name: "legend",
  initialState: initialState$c,
  reducers: {
    setLegendSize(state, action) {
      state.size.width = action.payload.width;
      state.size.height = action.payload.height;
    },
    setLegendSettings(state, action) {
      state.settings.align = action.payload.align;
      state.settings.layout = action.payload.layout;
      state.settings.verticalAlign = action.payload.verticalAlign;
      state.settings.itemSorter = action.payload.itemSorter;
      state.settings.position = action.payload.position;
      state.settings.offset = action.payload.offset;
    },
    addLegendPayload: {
      reducer(state, action) {
        state.payload.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    replaceLegendPayload: {
      reducer(state, action) {
        var _action$payload = action.payload, prev = _action$payload.prev, next = _action$payload.next;
        var index = current(state).payload.indexOf(castDraft(prev));
        if (index > -1) {
          state.payload[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeLegendPayload: {
      reducer(state, action) {
        var index = current(state).payload.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.payload.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    }
  }
});
var _legendSlice$actions = legendSlice.actions, setLegendSize = _legendSlice$actions.setLegendSize, setLegendSettings = _legendSlice$actions.setLegendSettings, addLegendPayload = _legendSlice$actions.addLegendPayload, replaceLegendPayload = _legendSlice$actions.replaceLegendPayload, removeLegendPayload = _legendSlice$actions.removeLegendPayload;
var legendReducer = legendSlice.reducer;
var withSelector = { exports: {} };
var useSyncExternalStoreWithSelector_production = {};
var hasRequiredUseSyncExternalStoreWithSelector_production;
function requireUseSyncExternalStoreWithSelector_production() {
  if (hasRequiredUseSyncExternalStoreWithSelector_production) return useSyncExternalStoreWithSelector_production;
  hasRequiredUseSyncExternalStoreWithSelector_production = 1;
  var React = requireReact();
  function is2(x2, y2) {
    return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
  }
  var objectIs = "function" === typeof Object.is ? Object.is : is2, useSyncExternalStore = React.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
  useSyncExternalStoreWithSelector_production.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual2) {
    var instRef = useRef(null);
    if (null === instRef.current) {
      var inst = { hasValue: false, value: null };
      instRef.current = inst;
    } else inst = instRef.current;
    instRef = useMemo(
      function() {
        function memoizedSelector(nextSnapshot) {
          if (!hasMemo) {
            hasMemo = true;
            memoizedSnapshot = nextSnapshot;
            nextSnapshot = selector(nextSnapshot);
            if (void 0 !== isEqual2 && inst.hasValue) {
              var currentSelection = inst.value;
              if (isEqual2(currentSelection, nextSnapshot))
                return memoizedSelection = currentSelection;
            }
            return memoizedSelection = nextSnapshot;
          }
          currentSelection = memoizedSelection;
          if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
          var nextSelection = selector(nextSnapshot);
          if (void 0 !== isEqual2 && isEqual2(currentSelection, nextSelection))
            return memoizedSnapshot = nextSnapshot, currentSelection;
          memoizedSnapshot = nextSnapshot;
          return memoizedSelection = nextSelection;
        }
        var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
        return [
          function() {
            return memoizedSelector(getSnapshot());
          },
          null === maybeGetServerSnapshot ? void 0 : function() {
            return memoizedSelector(maybeGetServerSnapshot());
          }
        ];
      },
      [getSnapshot, getServerSnapshot, selector, isEqual2]
    );
    var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
    useEffect(
      function() {
        inst.hasValue = true;
        inst.value = value;
      },
      [value]
    );
    useDebugValue(value);
    return value;
  };
  return useSyncExternalStoreWithSelector_production;
}
var hasRequiredWithSelector;
function requireWithSelector() {
  if (hasRequiredWithSelector) return withSelector.exports;
  hasRequiredWithSelector = 1;
  {
    withSelector.exports = requireUseSyncExternalStoreWithSelector_production();
  }
  return withSelector.exports;
}
requireWithSelector();
function defaultNoopBatch(callback) {
  callback();
}
function createListenerCollection() {
  let first = null;
  let last = null;
  return {
    clear() {
      first = null;
      last = null;
    },
    notify() {
      defaultNoopBatch(() => {
        let listener2 = first;
        while (listener2) {
          listener2.callback();
          listener2 = listener2.next;
        }
      });
    },
    get() {
      const listeners = [];
      let listener2 = first;
      while (listener2) {
        listeners.push(listener2);
        listener2 = listener2.next;
      }
      return listeners;
    },
    subscribe(callback) {
      let isSubscribed = true;
      const listener2 = last = {
        callback,
        next: null,
        prev: last
      };
      if (listener2.prev) {
        listener2.prev.next = listener2;
      } else {
        first = listener2;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null) return;
        isSubscribed = false;
        if (listener2.next) {
          listener2.next.prev = listener2.prev;
        } else {
          last = listener2.prev;
        }
        if (listener2.prev) {
          listener2.prev.next = listener2.next;
        } else {
          first = listener2.next;
        }
      };
    }
  };
}
var nullListeners = {
  notify() {
  },
  get: () => []
};
function createSubscription(store, parentSub) {
  let unsubscribe;
  let listeners = nullListeners;
  let subscriptionsAmount = 0;
  let selfSubscribed = false;
  function addNestedSub(listener2) {
    trySubscribe();
    const cleanupListener = listeners.subscribe(listener2);
    let removed = false;
    return () => {
      if (!removed) {
        removed = true;
        cleanupListener();
        tryUnsubscribe();
      }
    };
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return selfSubscribed;
  }
  function trySubscribe() {
    subscriptionsAmount++;
    if (!unsubscribe) {
      unsubscribe = store.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    subscriptionsAmount--;
    if (unsubscribe && subscriptionsAmount === 0) {
      unsubscribe();
      unsubscribe = void 0;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  function trySubscribeSelf() {
    if (!selfSubscribed) {
      selfSubscribed = true;
      trySubscribe();
    }
  }
  function tryUnsubscribeSelf() {
    if (selfSubscribed) {
      selfSubscribed = false;
      tryUnsubscribe();
    }
  }
  const subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe: trySubscribeSelf,
    tryUnsubscribe: tryUnsubscribeSelf,
    getListeners: () => listeners
  };
  return subscription;
}
var canUseDOM = () => !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isDOM = /* @__PURE__ */ canUseDOM();
var isRunningInReactNative = () => typeof navigator !== "undefined" && navigator.product === "ReactNative";
var isReactNative = /* @__PURE__ */ isRunningInReactNative();
var getUseIsomorphicLayoutEffect = () => isDOM || isReactNative ? reactExports.useLayoutEffect : reactExports.useEffect;
var useIsomorphicLayoutEffect = /* @__PURE__ */ getUseIsomorphicLayoutEffect();
function is(x2, y2) {
  if (x2 === y2) {
    return x2 !== 0 || y2 !== 0 || 1 / x2 === 1 / y2;
  } else {
    return x2 !== x2 && y2 !== y2;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}
var ContextKey = /* @__PURE__ */ Symbol.for(`react-redux-context`);
var gT = typeof globalThis !== "undefined" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function getContext() {
  if (!reactExports.createContext) return {};
  const contextMap = gT[ContextKey] ??= /* @__PURE__ */ new Map();
  let realContext = contextMap.get(reactExports.createContext);
  if (!realContext) {
    realContext = reactExports.createContext(
      null
    );
    contextMap.set(reactExports.createContext, realContext);
  }
  return realContext;
}
var ReactReduxContext = /* @__PURE__ */ getContext();
function Provider(providerProps) {
  const { children, context, serverState, store } = providerProps;
  const contextValue = reactExports.useMemo(() => {
    const subscription = createSubscription(store);
    const baseContextValue = {
      store,
      subscription,
      getServerState: serverState ? () => serverState : void 0
    };
    {
      return baseContextValue;
    }
  }, [store, serverState]);
  const previousState = reactExports.useMemo(() => store.getState(), [store]);
  useIsomorphicLayoutEffect(() => {
    const { subscription } = contextValue;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();
    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = void 0;
    };
  }, [contextValue, previousState]);
  const Context = context || ReactReduxContext;
  return /* @__PURE__ */ reactExports.createElement(Context.Provider, { value: contextValue }, children);
}
var Provider_default = Provider;
var propsToShallowCompare = /* @__PURE__ */ new Set([
  "axisLine",
  "tickLine",
  "activeBar",
  "activeDot",
  "activeLabel",
  "activeShape",
  "allowEscapeViewBox",
  "background",
  "cursor",
  "dot",
  "label",
  "line",
  "margin",
  "padding",
  "position",
  "shape",
  "style",
  "tick",
  "wrapperStyle",
  // radius can be an array of 4 numbers, easy to compare shallowly
  "radius",
  "throttledEvents"
]);
function sameValueZero(x2, y2) {
  if (x2 == null && y2 == null) {
    return true;
  }
  if (typeof x2 === "number" && typeof y2 === "number") {
    return x2 === y2 || x2 !== x2 && y2 !== y2;
  }
  return x2 === y2;
}
function propsAreEqual(prevProps, nextProps) {
  var allKeys = /* @__PURE__ */ new Set([...Object.keys(prevProps), ...Object.keys(nextProps)]);
  for (var key of allKeys) {
    if (propsToShallowCompare.has(key)) {
      if (prevProps[key] == null && nextProps[key] == null) {
        continue;
      }
      if (!shallowEqual(prevProps[key], nextProps[key])) {
        return false;
      }
    } else if (!sameValueZero(prevProps[key], nextProps[key])) {
      return false;
    }
  }
  return true;
}
var selectLegendArea = createSelector([selectChartWidth, selectChartHeight, selectMargin], (chartWidth, chartHeight, margin) => {
  return {
    x: margin.left || 0,
    y: margin.top || 0,
    width: Math.max(chartWidth - (margin.left || 0) - (margin.right || 0), 0),
    height: Math.max(chartHeight - (margin.top || 0) - (margin.bottom || 0), 0)
  };
});
function cartesianPositionToCSSTranslate(horizontalPosition, verticalPosition) {
  var _verticalValues$verti;
  if (horizontalPosition === "start" && verticalPosition === "start") {
    return "";
  }
  var horizontalValues = {
    start: "0",
    middle: "-50%",
    end: "-100%"
  };
  var verticalValues = {
    start: "0",
    middle: "-50%",
    end: "-100%"
  };
  var x2 = horizontalPosition === "inherit" ? "0" : horizontalValues[horizontalPosition];
  var y2 = (_verticalValues$verti = verticalValues[verticalPosition]) !== null && _verticalValues$verti !== void 0 ? _verticalValues$verti : "0";
  return "translate(".concat(x2, ", ").concat(y2, ")");
}
var _excluded$o = ["contextPayload"];
function _extends$q() {
  return _extends$q = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$q.apply(null, arguments);
}
function _slicedToArray$k(r, e) {
  return _arrayWithHoles$k(r) || _iterableToArrayLimit$k(r, e) || _unsupportedIterableToArray$k(r, e) || _nonIterableRest$k();
}
function _nonIterableRest$k() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$k(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$k(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$k(r, a2) : void 0;
  }
}
function _arrayLikeToArray$k(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$k(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$k(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys$B(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$B(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$B(Object(t), true).forEach(function(r2) {
      _defineProperty$E(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$B(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$E(e, r, t) {
  return (r = _toPropertyKey$E(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$E(t) {
  var i = _toPrimitive$E(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$E(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$o(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$o(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$o(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function defaultUniqBy$1(entry) {
  return entry.value;
}
function LegendContent(props) {
  var contextPayload = props.contextPayload, otherProps = _objectWithoutProperties$o(props, _excluded$o);
  var finalPayload = getUniqPayload(contextPayload, props.payloadUniqBy, defaultUniqBy$1);
  var contentProps = _objectSpread$B(_objectSpread$B({}, otherProps), {}, {
    payload: finalPayload
  });
  if (/* @__PURE__ */ reactExports.isValidElement(props.content)) {
    return /* @__PURE__ */ reactExports.cloneElement(props.content, contentProps);
  }
  if (typeof props.content === "function") {
    return /* @__PURE__ */ reactExports.createElement(props.content, contentProps);
  }
  return /* @__PURE__ */ reactExports.createElement(DefaultLegendContent, contentProps);
}
function getLayoutForPosition(position) {
  if (position === "left" || position === "right" || position === "insideLeft" || position === "insideRight") {
    return "vertical";
  }
  return "horizontal";
}
function selectPositionViewBox(state, position) {
  if (position == null) {
    return null;
  }
  return isOutsidePosition(position) ? selectLegendArea(state) : selectChartViewBox(state);
}
function getOutsidePositionOffset(position, offset, box) {
  if (position === "top") {
    return {
      top: box.height + offset
    };
  }
  if (position === "bottom") {
    return {
      top: -box.height - offset
    };
  }
  if (position === "left") {
    return {
      left: box.width + offset
    };
  }
  if (position === "right") {
    return {
      left: -box.width - offset
    };
  }
  return {};
}
function getDefaultPosition(style, props, margin, chartWidth, chartHeight, box) {
  var layout = props.layout, align = props.align, verticalAlign = props.verticalAlign;
  var hPos, vPos;
  if (!style || (style.left === void 0 || style.left === null) && (style.right === void 0 || style.right === null)) {
    if (align === "center" && layout === "vertical") {
      hPos = {
        left: ((chartWidth || 0) - box.width) / 2
      };
    } else {
      hPos = align === "right" ? {
        right: margin && margin.right || 0
      } : {
        left: margin && margin.left || 0
      };
    }
  }
  if (!style || (style.top === void 0 || style.top === null) && (style.bottom === void 0 || style.bottom === null)) {
    if (verticalAlign === "middle") {
      vPos = {
        top: ((chartHeight || 0) - box.height) / 2
      };
    } else {
      vPos = verticalAlign === "bottom" ? {
        bottom: margin && margin.bottom || 0
      } : {
        top: margin && margin.top || 0
      };
    }
  }
  return _objectSpread$B(_objectSpread$B({}, hPos), vPos);
}
function LegendSettingsDispatcher(_ref2) {
  var align = _ref2.align, layout = _ref2.layout, verticalAlign = _ref2.verticalAlign, itemSorter = _ref2.itemSorter, position = _ref2.position, offset = _ref2.offset;
  var dispatch = useAppDispatch();
  reactExports.useLayoutEffect(() => {
    dispatch(setLegendSettings({
      align,
      layout,
      verticalAlign,
      itemSorter,
      position,
      offset
    }));
  }, [dispatch, align, layout, verticalAlign, itemSorter, position, offset]);
  return null;
}
function LegendSizeDispatcher(_ref2) {
  var width = _ref2.width, height = _ref2.height;
  var dispatch = useAppDispatch();
  reactExports.useLayoutEffect(() => {
    dispatch(setLegendSize({
      width,
      height
    }));
  }, [dispatch, width, height]);
  reactExports.useLayoutEffect(() => {
    return () => {
      dispatch(setLegendSize({
        width: 0,
        height: 0
      }));
    };
  }, [dispatch]);
  return null;
}
function getWidthOrHeight(layout, height, width, maxWidth) {
  if (layout === "vertical" && height != null) {
    return {
      height
    };
  }
  if (layout === "horizontal") {
    return {
      width: width || maxWidth
    };
  }
  return null;
}
var legendDefaultProps = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  itemSorter: "value",
  labelStyle: {},
  layout: "auto",
  verticalAlign: "bottom",
  offset: 0
};
function LegendImpl(outsideProps) {
  var _props$offset, _props$offset2, _positionViewBox$widt, _positionViewBox$widt2, _positionViewBox$heig, _positionViewBox$heig2, _outsidePositionOffse, _outsidePositionOffse2;
  var props = resolveDefaultProps(outsideProps, legendDefaultProps);
  var layout = outsideProps.layout && outsideProps.layout !== "auto" ? outsideProps.layout : getLayoutForPosition(props.position);
  var contextPayload = useLegendPayload();
  var legendPortalFromContext = useLegendPortal();
  var margin = useMargin();
  var positionViewBox = useAppSelector((state) => selectPositionViewBox(state, props.position));
  var widthFromProps = props.width, heightFromProps = props.height, wrapperStyle = props.wrapperStyle, portalFromProps = props.portal;
  var shouldReportDimensions = portalFromProps == null && (props.position == null || isOutsidePosition(props.position));
  var _useElementOffset = useElementOffset([contextPayload]), _useElementOffset2 = _slicedToArray$k(_useElementOffset, 2), lastBoundingBox = _useElementOffset2[0], updateBoundingBox = _useElementOffset2[1];
  var chartWidth = useChartWidth();
  var chartHeight = useChartHeight();
  if (chartWidth == null || chartHeight == null || props.position != null && positionViewBox == null) {
    return null;
  }
  var maxWidth = chartWidth - ((margin === null || margin === void 0 ? void 0 : margin.left) || 0) - ((margin === null || margin === void 0 ? void 0 : margin.right) || 0);
  var widthOrHeight = getWidthOrHeight(layout, heightFromProps, widthFromProps, maxWidth);
  var positionResult = props.position == null ? null : getCartesianPosition({
    /*
     * When calculating the position we use two different view boxes.
     * Inside positions use the plot area; outside positions use the margin-inset
     * chart area, placing the Legend beyond any axes.
     */
    viewBox: positionViewBox !== null && positionViewBox !== void 0 ? positionViewBox : {
      x: 0,
      y: 0,
      width: chartWidth,
      height: chartHeight
    },
    position: props.position,
    offset: (_props$offset = props.offset) !== null && _props$offset !== void 0 ? _props$offset : 0
  });
  var outsidePositionOffset = getOutsidePositionOffset(props.position, (_props$offset2 = props.offset) !== null && _props$offset2 !== void 0 ? _props$offset2 : 0, lastBoundingBox);
  var positionMaxWidth = layout === "vertical" ? ((_positionViewBox$widt = positionViewBox === null || positionViewBox === void 0 ? void 0 : positionViewBox.width) !== null && _positionViewBox$widt !== void 0 ? _positionViewBox$widt : 0) / 2 : (_positionViewBox$widt2 = positionViewBox === null || positionViewBox === void 0 ? void 0 : positionViewBox.width) !== null && _positionViewBox$widt2 !== void 0 ? _positionViewBox$widt2 : 0;
  var positionMaxHeight = layout === "horizontal" ? ((_positionViewBox$heig = positionViewBox === null || positionViewBox === void 0 ? void 0 : positionViewBox.height) !== null && _positionViewBox$heig !== void 0 ? _positionViewBox$heig : 0) / 2 : (_positionViewBox$heig2 = positionViewBox === null || positionViewBox === void 0 ? void 0 : positionViewBox.height) !== null && _positionViewBox$heig2 !== void 0 ? _positionViewBox$heig2 : 0;
  var positionStyle = positionResult ? {
    width: "max-content",
    height: "max-content",
    maxWidth: positionMaxWidth,
    maxHeight: positionMaxHeight,
    overflowY: "auto",
    top: positionResult.y + ((_outsidePositionOffse = outsidePositionOffset.top) !== null && _outsidePositionOffse !== void 0 ? _outsidePositionOffse : 0),
    left: positionResult.x + ((_outsidePositionOffse2 = outsidePositionOffset.left) !== null && _outsidePositionOffse2 !== void 0 ? _outsidePositionOffse2 : 0),
    transform: cartesianPositionToCSSTranslate(positionResult.horizontalAnchor, positionResult.verticalAnchor)
  } : getDefaultPosition(wrapperStyle, props, margin, chartWidth, chartHeight, lastBoundingBox);
  var outerStyle = portalFromProps ? wrapperStyle : _objectSpread$B(_objectSpread$B({
    position: "absolute",
    width: (widthOrHeight === null || widthOrHeight === void 0 ? void 0 : widthOrHeight.width) || widthFromProps || "auto",
    height: (widthOrHeight === null || widthOrHeight === void 0 ? void 0 : widthOrHeight.height) || heightFromProps || "auto"
  }, positionStyle), wrapperStyle);
  var legendPortal = portalFromProps !== null && portalFromProps !== void 0 ? portalFromProps : legendPortalFromContext;
  if (legendPortal == null || contextPayload == null) {
    return null;
  }
  var legendElement = /* @__PURE__ */ reactExports.createElement("div", {
    className: "recharts-legend-wrapper",
    style: outerStyle,
    ref: updateBoundingBox
  }, /* @__PURE__ */ reactExports.createElement(LegendSettingsDispatcher, {
    layout,
    align: props.align,
    verticalAlign: props.verticalAlign,
    itemSorter: props.itemSorter,
    position: props.position,
    offset: props.offset
  }), shouldReportDimensions && /* @__PURE__ */ reactExports.createElement(LegendSizeDispatcher, lastBoundingBox), /* @__PURE__ */ reactExports.createElement(LegendContent, _extends$q({}, props, {
    layout
  }, widthOrHeight, {
    margin,
    chartWidth,
    chartHeight,
    contextPayload
  })));
  return /* @__PURE__ */ reactDomExports.createPortal(legendElement, legendPortal);
}
var Legend = /* @__PURE__ */ reactExports.memo(LegendImpl, propsAreEqual);
Legend.displayName = "Legend";
function _extends$p() {
  return _extends$p = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$p.apply(null, arguments);
}
function ownKeys$A(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$A(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$A(Object(t), true).forEach(function(r2) {
      _defineProperty$D(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$A(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$D(e, r, t) {
  return (r = _toPropertyKey$D(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$D(t) {
  var i = _toPrimitive$D(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$D(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$j(r, e) {
  return _arrayWithHoles$j(r) || _iterableToArrayLimit$j(r, e) || _unsupportedIterableToArray$j(r, e) || _nonIterableRest$j();
}
function _nonIterableRest$j() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$j(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$j(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$j(r, a2) : void 0;
  }
}
function _arrayLikeToArray$j(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$j(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$j(r) {
  if (Array.isArray(r)) return r;
}
function defaultFormatter(value) {
  return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? value.join(" ~ ") : value;
}
var defaultDefaultTooltipContentProps = {
  separator: " : ",
  contentStyle: {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  },
  itemStyle: {
    display: "block",
    paddingTop: 4,
    paddingBottom: 4,
    color: "#000"
  },
  labelStyle: {},
  accessibilityLayer: false
};
function lodashLikeSortBy(array2, itemSorter) {
  if (itemSorter == null) {
    return array2;
  }
  return sortBy$1(array2, itemSorter);
}
var DefaultTooltipContent = (props) => {
  var _props$separator = props.separator, separator = _props$separator === void 0 ? defaultDefaultTooltipContentProps.separator : _props$separator, contentStyle = props.contentStyle, itemStyle = props.itemStyle, _props$labelStyle = props.labelStyle, labelStyle = _props$labelStyle === void 0 ? defaultDefaultTooltipContentProps.labelStyle : _props$labelStyle, payload = props.payload, formatter = props.formatter, itemSorter = props.itemSorter, wrapperClassName = props.wrapperClassName, labelClassName = props.labelClassName, label = props.label, labelFormatter = props.labelFormatter, _props$accessibilityL = props.accessibilityLayer, accessibilityLayer = _props$accessibilityL === void 0 ? defaultDefaultTooltipContentProps.accessibilityLayer : _props$accessibilityL;
  var renderContent2 = () => {
    if (payload && payload.length) {
      var listStyle = {
        padding: 0,
        margin: 0
      };
      var sortedPayload = lodashLikeSortBy(payload, itemSorter);
      var items = sortedPayload.map((entry, i) => {
        if (!entry || entry.type === "none") {
          return null;
        }
        var finalFormatter = entry.formatter || formatter || defaultFormatter;
        var value = entry.value, name = entry.name;
        var finalValue = value;
        var finalName = name;
        if (finalFormatter) {
          var formatted = finalFormatter(value, name, entry, i, payload);
          if (Array.isArray(formatted)) {
            var _formatted = _slicedToArray$j(formatted, 2);
            finalValue = _formatted[0];
            finalName = _formatted[1];
          } else if (formatted != null) {
            finalValue = formatted;
          } else {
            return null;
          }
        }
        var finalItemStyle = _objectSpread$A(_objectSpread$A({}, defaultDefaultTooltipContentProps.itemStyle), {}, {
          color: entry.color || defaultDefaultTooltipContentProps.itemStyle.color
        }, itemStyle);
        return /* @__PURE__ */ reactExports.createElement("li", {
          className: "recharts-tooltip-item",
          key: "tooltip-item-".concat(i),
          style: finalItemStyle
        }, isNumOrStr(finalName) ? /* @__PURE__ */ reactExports.createElement("span", {
          className: "recharts-tooltip-item-name"
        }, finalName) : null, isNumOrStr(finalName) ? /* @__PURE__ */ reactExports.createElement("span", {
          className: "recharts-tooltip-item-separator"
        }, separator) : null, /* @__PURE__ */ reactExports.createElement("span", {
          className: "recharts-tooltip-item-value"
        }, finalValue), /* @__PURE__ */ reactExports.createElement("span", {
          className: "recharts-tooltip-item-unit"
        }, entry.unit || ""));
      });
      return /* @__PURE__ */ reactExports.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: listStyle
      }, items);
    }
    return null;
  };
  var finalStyle = _objectSpread$A(_objectSpread$A({}, defaultDefaultTooltipContentProps.contentStyle), contentStyle);
  var finalLabelStyle = _objectSpread$A({
    margin: 0
  }, labelStyle);
  var hasLabel = !isNullish(label);
  var finalLabel = hasLabel ? label : "";
  var wrapperCN = clsx("recharts-default-tooltip", wrapperClassName);
  var labelCN = clsx("recharts-tooltip-label", labelClassName);
  if (hasLabel && labelFormatter && payload !== void 0 && payload !== null) {
    finalLabel = labelFormatter(label, payload);
  }
  var accessibilityAttributes = accessibilityLayer ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ reactExports.createElement("div", _extends$p({
    className: wrapperCN,
    style: finalStyle
  }, accessibilityAttributes), /* @__PURE__ */ reactExports.createElement("p", {
    className: labelCN,
    style: finalLabelStyle
  }, /* @__PURE__ */ reactExports.isValidElement(finalLabel) ? finalLabel : "".concat(finalLabel)), renderContent2());
};
var CSS_CLASS_PREFIX = "recharts-tooltip-wrapper";
var TOOLTIP_HIDDEN = {
  visibility: "hidden"
};
function getTooltipCSSClassName(_ref2) {
  var coordinate = _ref2.coordinate, translateX = _ref2.translateX, translateY = _ref2.translateY;
  return clsx(CSS_CLASS_PREFIX, {
    ["".concat(CSS_CLASS_PREFIX, "-right")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x,
    ["".concat(CSS_CLASS_PREFIX, "-left")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x,
    ["".concat(CSS_CLASS_PREFIX, "-bottom")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y,
    ["".concat(CSS_CLASS_PREFIX, "-top")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y
  });
}
function getTooltipTranslateXY(_ref2) {
  var allowEscapeViewBox = _ref2.allowEscapeViewBox, coordinate = _ref2.coordinate, key = _ref2.key, offset = _ref2.offset, position = _ref2.position, reverseDirection = _ref2.reverseDirection, tooltipDimension = _ref2.tooltipDimension, viewBox = _ref2.viewBox, viewBoxDimension = _ref2.viewBoxDimension;
  if (position && isNumber(position[key])) {
    return position[key];
  }
  var negative = coordinate[key] - tooltipDimension - (offset > 0 ? offset : 0);
  var positive = coordinate[key] + offset;
  if (allowEscapeViewBox[key]) {
    return reverseDirection[key] ? negative : positive;
  }
  var viewBoxKey = viewBox[key];
  if (viewBoxKey == null) {
    return 0;
  }
  if (reverseDirection[key]) {
    var _tooltipBoundary = negative;
    var _viewBoxBoundary = viewBoxKey;
    if (_tooltipBoundary < _viewBoxBoundary) {
      return Math.max(positive, viewBoxKey);
    }
    return Math.max(negative, viewBoxKey);
  }
  if (viewBoxDimension == null) {
    return 0;
  }
  var tooltipBoundary = positive + tooltipDimension;
  var viewBoxBoundary = viewBoxKey + viewBoxDimension;
  if (tooltipBoundary > viewBoxBoundary) {
    return Math.max(negative, viewBoxKey);
  }
  return Math.max(positive, viewBoxKey);
}
function getTransformStyle(_ref3) {
  var translateX = _ref3.translateX, translateY = _ref3.translateY, useTranslate3d = _ref3.useTranslate3d;
  return {
    transform: useTranslate3d ? "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0)") : "translate(".concat(translateX, "px, ").concat(translateY, "px)")
  };
}
function getTooltipTranslate(_ref4) {
  var allowEscapeViewBox = _ref4.allowEscapeViewBox, coordinate = _ref4.coordinate, offsetTop = _ref4.offsetTop, offsetLeft = _ref4.offsetLeft, position = _ref4.position, reverseDirection = _ref4.reverseDirection, tooltipBox = _ref4.tooltipBox, useTranslate3d = _ref4.useTranslate3d, viewBox = _ref4.viewBox;
  var cssProperties, translateX, translateY;
  if (tooltipBox && tooltipBox.height > 0 && tooltipBox.width > 0 && coordinate) {
    translateX = getTooltipTranslateXY({
      allowEscapeViewBox,
      coordinate,
      key: "x",
      offset: offsetLeft,
      position,
      reverseDirection,
      tooltipDimension: tooltipBox.width,
      viewBox,
      viewBoxDimension: viewBox.width
    });
    translateY = getTooltipTranslateXY({
      allowEscapeViewBox,
      coordinate,
      key: "y",
      offset: offsetTop,
      position,
      reverseDirection,
      tooltipDimension: tooltipBox.height,
      viewBox,
      viewBoxDimension: viewBox.height
    });
    cssProperties = getTransformStyle({
      translateX,
      translateY,
      useTranslate3d
    });
  } else {
    cssProperties = TOOLTIP_HIDDEN;
  }
  return {
    cssProperties,
    cssClasses: getTooltipCSSClassName({
      translateX,
      translateY,
      coordinate
    })
  };
}
var parseIsSsrByDefault = () => !(typeof window !== "undefined" && window.document && Boolean(window.document.createElement) && window.setTimeout);
var Global = {
  isSsr: parseIsSsrByDefault()
};
function _slicedToArray$i(r, e) {
  return _arrayWithHoles$i(r) || _iterableToArrayLimit$i(r, e) || _unsupportedIterableToArray$i(r, e) || _nonIterableRest$i();
}
function _nonIterableRest$i() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$i(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$i(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$i(r, a2) : void 0;
  }
}
function _arrayLikeToArray$i(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$i(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$i(r) {
  if (Array.isArray(r)) return r;
}
function usePrefersReducedMotion() {
  var _useState = reactExports.useState(() => {
    if (Global.isSsr) {
      return false;
    }
    if (!window.matchMedia) {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }), _useState2 = _slicedToArray$i(_useState, 2), prefersReducedMotion = _useState2[0], setPrefersReducedMotion = _useState2[1];
  reactExports.useEffect(() => {
    if (!window.matchMedia) {
      return;
    }
    var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  return prefersReducedMotion;
}
function ownKeys$z(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$z(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$z(Object(t), true).forEach(function(r2) {
      _defineProperty$C(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$z(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$C(e, r, t) {
  return (r = _toPropertyKey$C(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$C(t) {
  var i = _toPrimitive$C(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$C(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$h(r, e) {
  return _arrayWithHoles$h(r) || _iterableToArrayLimit$h(r, e) || _unsupportedIterableToArray$h(r, e) || _nonIterableRest$h();
}
function _nonIterableRest$h() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$h(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$h(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$h(r, a2) : void 0;
  }
}
function _arrayLikeToArray$h(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$h(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$h(r) {
  if (Array.isArray(r)) return r;
}
function resolveTransitionProperty(args) {
  if (args.prefersReducedMotion && args.isAnimationActive === "auto") {
    return void 0;
  }
  if (args.isAnimationActive && args.active) {
    var easing = typeof args.animationEasing === "string" ? args.animationEasing : "ease";
    return "transform ".concat(args.animationDuration, "ms ").concat(easing);
  }
  return void 0;
}
function TooltipBoundingBoxImpl(props) {
  var _props$coordinate3, _props$coordinate4, _props$coordinate$x2, _props$coordinate5, _props$coordinate$y2, _props$coordinate6;
  var prefersReducedMotion = usePrefersReducedMotion();
  var _React$useState = reactExports.useState(() => ({
    dismissed: false,
    dismissedAtCoordinate: {
      x: 0,
      y: 0
    }
  })), _React$useState2 = _slicedToArray$h(_React$useState, 2), state = _React$useState2[0], setState = _React$useState2[1];
  reactExports.useEffect(() => {
    var handleKeyDown = (event) => {
      if (event.key === "Escape") {
        var _props$coordinate$x, _props$coordinate, _props$coordinate$y, _props$coordinate2;
        setState({
          dismissed: true,
          dismissedAtCoordinate: {
            x: (_props$coordinate$x = (_props$coordinate = props.coordinate) === null || _props$coordinate === void 0 ? void 0 : _props$coordinate.x) !== null && _props$coordinate$x !== void 0 ? _props$coordinate$x : 0,
            y: (_props$coordinate$y = (_props$coordinate2 = props.coordinate) === null || _props$coordinate2 === void 0 ? void 0 : _props$coordinate2.y) !== null && _props$coordinate$y !== void 0 ? _props$coordinate$y : 0
          }
        });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [(_props$coordinate3 = props.coordinate) === null || _props$coordinate3 === void 0 ? void 0 : _props$coordinate3.x, (_props$coordinate4 = props.coordinate) === null || _props$coordinate4 === void 0 ? void 0 : _props$coordinate4.y]);
  if (state.dismissed && (((_props$coordinate$x2 = (_props$coordinate5 = props.coordinate) === null || _props$coordinate5 === void 0 ? void 0 : _props$coordinate5.x) !== null && _props$coordinate$x2 !== void 0 ? _props$coordinate$x2 : 0) !== state.dismissedAtCoordinate.x || ((_props$coordinate$y2 = (_props$coordinate6 = props.coordinate) === null || _props$coordinate6 === void 0 ? void 0 : _props$coordinate6.y) !== null && _props$coordinate$y2 !== void 0 ? _props$coordinate$y2 : 0) !== state.dismissedAtCoordinate.y)) {
    setState(_objectSpread$z(_objectSpread$z({}, state), {}, {
      dismissed: false
    }));
  }
  var _getTooltipTranslate = getTooltipTranslate({
    allowEscapeViewBox: props.allowEscapeViewBox,
    coordinate: props.coordinate,
    offsetLeft: typeof props.offset === "number" ? props.offset : props.offset.x,
    offsetTop: typeof props.offset === "number" ? props.offset : props.offset.y,
    position: props.position,
    reverseDirection: props.reverseDirection,
    tooltipBox: props.lastBoundingBox,
    useTranslate3d: props.useTranslate3d,
    viewBox: props.viewBox
  }), cssClasses = _getTooltipTranslate.cssClasses, cssProperties = _getTooltipTranslate.cssProperties;
  var positionStyle = props.hasPortalFromProps ? {} : _objectSpread$z(_objectSpread$z({
    transition: resolveTransitionProperty({
      prefersReducedMotion,
      isAnimationActive: props.isAnimationActive,
      active: props.active,
      animationDuration: props.animationDuration,
      animationEasing: props.animationEasing
    })
  }, cssProperties), {}, {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0
  });
  var outerStyle = _objectSpread$z(_objectSpread$z({}, positionStyle), {}, {
    visibility: !state.dismissed && props.active && props.hasPayload ? "visible" : "hidden"
  }, props.wrapperStyle);
  return /* @__PURE__ */ reactExports.createElement("div", {
    // @ts-expect-error TypeScript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
    xmlns: "http://www.w3.org/1999/xhtml",
    tabIndex: -1,
    className: cssClasses,
    style: outerStyle,
    ref: props.innerRef
  }, props.children);
}
var TooltipBoundingBox = /* @__PURE__ */ reactExports.memo(TooltipBoundingBoxImpl);
var useAccessibilityLayer = () => {
  var _useAppSelector;
  return (_useAppSelector = useAppSelector((state) => state.rootProps.accessibilityLayer)) !== null && _useAppSelector !== void 0 ? _useAppSelector : true;
};
function _extends$o() {
  return _extends$o = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$o.apply(null, arguments);
}
function ownKeys$y(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$y(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$y(Object(t), true).forEach(function(r2) {
      _defineProperty$B(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$y(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$B(e, r, t) {
  return (r = _toPropertyKey$B(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$B(t) {
  var i = _toPrimitive$B(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$B(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var CURVE_FACTORIES = {
  curveBasisClosed,
  curveBasisOpen,
  curveBasis,
  curveBumpX: bumpX,
  curveBumpY: bumpY,
  curveLinearClosed,
  curveLinear,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural,
  curveStep,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore
};
var defined = (p) => isWellBehavedNumber(p.x) && isWellBehavedNumber(p.y);
var areaDefined = (d) => d.base != null && defined(d.base) && defined(d);
var getX = (p) => p.x;
var getY = (p) => p.y;
var getCurveFactory = (type, layout) => {
  if (typeof type === "function") {
    return type;
  }
  var name = "curve".concat(upperFirst(type));
  if ((name === "curveMonotone" || name === "curveBump") && layout) {
    var factory = CURVE_FACTORIES["".concat(name).concat(layout === "vertical" ? "Y" : "X")];
    if (factory) {
      return factory;
    }
  }
  return CURVE_FACTORIES[name] || curveLinear;
};
var defaultCurveProps = {
  connectNulls: false,
  type: "linear"
};
var getPath$1 = (_ref2) => {
  var _ref$type = _ref2.type, type = _ref$type === void 0 ? defaultCurveProps.type : _ref$type, _ref$points = _ref2.points, points = _ref$points === void 0 ? [] : _ref$points, baseLine = _ref2.baseLine, layout = _ref2.layout, _ref$connectNulls = _ref2.connectNulls, connectNulls = _ref$connectNulls === void 0 ? defaultCurveProps.connectNulls : _ref$connectNulls;
  var curveFactory = getCurveFactory(type, layout);
  var formatPoints = connectNulls ? points.filter(defined) : points;
  if (Array.isArray(baseLine)) {
    var _lineFunction;
    var areaPoints = points.map((entry, index) => _objectSpread$y(_objectSpread$y({}, entry), {}, {
      base: baseLine[index]
    }));
    if (layout === "vertical") {
      _lineFunction = shapeArea().y(getY).x1(getX).x0((d) => d.base.x);
    } else {
      _lineFunction = shapeArea().x(getX).y1(getY).y0((d) => d.base.y);
    }
    var _nullableLineFunction = _lineFunction.defined(areaDefined).curve(curveFactory);
    var finalPoints = connectNulls ? areaPoints.filter(areaDefined) : areaPoints;
    return _nullableLineFunction(finalPoints);
  }
  var lineFunction;
  if (layout === "vertical" && isNumber(baseLine)) {
    lineFunction = shapeArea().y(getY).x1(getX).x0(baseLine);
  } else if (isNumber(baseLine)) {
    lineFunction = shapeArea().x(getX).y1(getY).y0(baseLine);
  } else {
    lineFunction = shapeLine().x(getX).y(getY);
  }
  var nullableLineFunction = lineFunction.defined(defined).curve(curveFactory);
  return nullableLineFunction(formatPoints);
};
var Curve = (props) => {
  var className = props.className, points = props.points, path = props.path, pathRef = props.pathRef;
  var layout = useChartLayout();
  if ((!points || !points.length) && !path) {
    return null;
  }
  var getPathInput = {
    type: props.type,
    points: props.points,
    baseLine: props.baseLine,
    layout: props.layout || layout,
    connectNulls: props.connectNulls
  };
  var realPath = points && points.length ? getPath$1(getPathInput) : path;
  return /* @__PURE__ */ reactExports.createElement("path", _extends$o({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
    className: clsx("recharts-curve", className),
    d: realPath === null ? void 0 : realPath,
    ref: pathRef
  }));
};
var _excluded$n = ["x", "y", "top", "left", "width", "height", "className"];
function _extends$n() {
  return _extends$n = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$n.apply(null, arguments);
}
function ownKeys$x(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$x(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$x(Object(t), true).forEach(function(r2) {
      _defineProperty$A(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$x(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$A(e, r, t) {
  return (r = _toPropertyKey$A(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$A(t) {
  var i = _toPrimitive$A(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$A(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$n(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$n(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$n(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var getPath = (x2, y2, width, height, top, left) => {
  return "M".concat(x2, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y2, "h").concat(width);
};
var Cross = (_ref2) => {
  var _ref$x = _ref2.x, x2 = _ref$x === void 0 ? 0 : _ref$x, _ref$y = _ref2.y, y2 = _ref$y === void 0 ? 0 : _ref$y, _ref$top = _ref2.top, top = _ref$top === void 0 ? 0 : _ref$top, _ref$left = _ref2.left, left = _ref$left === void 0 ? 0 : _ref$left, _ref$width = _ref2.width, width = _ref$width === void 0 ? 0 : _ref$width, _ref$height = _ref2.height, height = _ref$height === void 0 ? 0 : _ref$height, className = _ref2.className, rest = _objectWithoutProperties$n(_ref2, _excluded$n);
  var props = _objectSpread$x({
    x: x2,
    y: y2,
    top,
    left,
    width,
    height
  }, rest);
  if (!isNumber(x2) || !isNumber(y2) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left)) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("path", _extends$n({}, svgPropertiesAndEvents(props), {
    className: clsx("recharts-cross", className),
    d: getPath(x2, y2, width, height, top, left)
  }));
};
function getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize) {
  var halfSize = tooltipAxisBandSize / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: layout === "horizontal" ? activeCoordinate.x - halfSize : offset.left + 0.5,
    y: layout === "horizontal" ? offset.top + 0.5 : activeCoordinate.y - halfSize,
    width: layout === "horizontal" ? tooltipAxisBandSize : offset.width - 1,
    height: layout === "horizontal" ? offset.height - 1 : tooltipAxisBandSize
  };
}
var ACCURACY = 1e-4;
var cubicBezierFactor = (c1, c2) => [0, 3 * c1, 3 * c2 - 6 * c1, 3 * c1 - 3 * c2 + 1];
var evaluatePolynomial = (params, animationElapsedTime) => params.map((param, i) => param * animationElapsedTime ** i).reduce((pre, curr) => pre + curr);
var cubicBezier = (c1, c2) => (animationElapsedTime) => {
  var params = cubicBezierFactor(c1, c2);
  return evaluatePolynomial(params, animationElapsedTime);
};
var derivativeCubicBezier = (c1, c2) => (animationElapsedTime) => {
  var params = cubicBezierFactor(c1, c2);
  var newParams = [...params.map((param, i) => param * i).slice(1), 0];
  return evaluatePolynomial(newParams, animationElapsedTime);
};
var parseCubicBezier = (easing) => {
  var _easingParts$;
  var easingParts = easing.split("(");
  if (easingParts.length !== 2 || easingParts[0] !== "cubic-bezier") {
    return null;
  }
  var numbers2 = (_easingParts$ = easingParts[1]) === null || _easingParts$ === void 0 || (_easingParts$ = _easingParts$.split(")")[0]) === null || _easingParts$ === void 0 ? void 0 : _easingParts$.split(",");
  if (numbers2 == null || numbers2.length !== 4) {
    return null;
  }
  var coords = numbers2.map((x2) => parseFloat(x2));
  return [coords[0], coords[1], coords[2], coords[3]];
};
var getBezierCoordinates = function getBezierCoordinates2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length === 1) {
    switch (args[0]) {
      case "linear":
        return [0, 0, 1, 1];
      case "ease":
        return [0.25, 0.1, 0.25, 1];
      case "ease-in":
        return [0.42, 0, 1, 1];
      case "ease-out":
        return [0.42, 0, 0.58, 1];
      case "ease-in-out":
        return [0, 0, 0.58, 1];
      default: {
        var easing = parseCubicBezier(args[0]);
        if (easing) {
          return easing;
        }
      }
    }
  }
  if (args.length === 4) {
    return args;
  }
  return [0, 0, 1, 1];
};
var createBezierEasing = (x1, y1, x2, y2) => {
  var curveX = cubicBezier(x1, x2);
  var curveY = cubicBezier(y1, y2);
  var derCurveX = derivativeCubicBezier(x1, x2);
  var rangeValue = (value) => {
    if (value > 1) {
      return 1;
    }
    if (value < 0) {
      return 0;
    }
    return value;
  };
  var bezier = (_animationElapsedTime) => {
    var animationElapsedTime = _animationElapsedTime > 1 ? 1 : _animationElapsedTime;
    var x3 = animationElapsedTime;
    for (var i = 0; i < 8; ++i) {
      var evalT = curveX(x3) - animationElapsedTime;
      var derVal = derCurveX(x3);
      if (Math.abs(evalT - animationElapsedTime) < ACCURACY || derVal < ACCURACY) {
        return curveY(x3);
      }
      x3 = rangeValue(x3 - evalT / derVal);
    }
    return curveY(x3);
  };
  bezier.isStepper = false;
  return bezier;
};
var configBezier = function configBezier2() {
  return createBezierEasing(...getBezierCoordinates(...arguments));
};
var createSpringEasing = function createSpringEasing2() {
  var config2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _config$stiff = config2.stiff, stiff = _config$stiff === void 0 ? 100 : _config$stiff, _config$damping = config2.damping, damping = _config$damping === void 0 ? 8 : _config$damping, _config$dt = config2.dt, dt = _config$dt === void 0 ? 16.67 : _config$dt;
  var destX = 1;
  var positions = [0];
  var currX = 0;
  var currV = 0;
  var maxIterations = 1e4;
  var iterations = 0;
  while (iterations < maxIterations) {
    var FSpring = -(currX - destX) * stiff;
    var FDamping = currV * damping;
    currV += (FSpring - FDamping) * dt / 1e3;
    currX += currV * dt / 1e3;
    positions.push(currX);
    if (Math.abs(currX - destX) < ACCURACY && Math.abs(currV) < ACCURACY) {
      break;
    }
    iterations++;
  }
  positions[positions.length - 1] = destX;
  var maxIndex = positions.length - 1;
  return (t) => {
    var _positions$index, _positions, _positions$index2;
    if (t <= 0) return 0;
    if (t >= 1) return destX;
    var exactFrame = t * maxIndex;
    var index = Math.floor(exactFrame);
    var fraction = exactFrame - index;
    return ((_positions$index = positions[index]) !== null && _positions$index !== void 0 ? _positions$index : 0) + (((_positions = positions[index + 1]) !== null && _positions !== void 0 ? _positions : 0) - ((_positions$index2 = positions[index]) !== null && _positions$index2 !== void 0 ? _positions$index2 : 0)) * fraction;
  };
};
var createEasingFunction = (easing) => {
  if (typeof easing === "string") {
    switch (easing) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return configBezier(easing);
      case "spring":
        return createSpringEasing();
      default:
        if (easing.split("(")[0] === "cubic-bezier") {
          return configBezier(easing);
        }
    }
  }
  if (typeof easing === "function") {
    return easing;
  }
  return null;
};
var animationControllerImpl = (timeoutController, animationHandle, listener2) => {
  var cancellable;
  var nextUpdate = (now) => {
    var timeRemaining = animationHandle.tick(now);
    if (animationHandle.getState() === "active") {
      listener2(animationHandle.getInterpolated());
      if (animationHandle.getProgress() === 1) {
        animationHandle.complete();
        cancellable = void 0;
        return;
      }
      cancellable = timeoutController.setTimeout(nextUpdate, timeRemaining);
      return;
    }
    cancellable = timeoutController.setTimeout(nextUpdate, timeRemaining);
  };
  cancellable = timeoutController.setTimeout(nextUpdate, 0);
  return () => {
    var _cancellable;
    return (_cancellable = cancellable) === null || _cancellable === void 0 ? void 0 : _cancellable();
  };
};
var AnimationControllerContext = /* @__PURE__ */ reactExports.createContext(animationControllerImpl);
AnimationControllerContext.Provider;
function useAnimationController(animationControllerFromProps) {
  var animationControllerFromContext = reactExports.useContext(AnimationControllerContext);
  return reactExports.useMemo(() => animationControllerFromProps !== null && animationControllerFromProps !== void 0 ? animationControllerFromProps : animationControllerFromContext, [animationControllerFromProps, animationControllerFromContext]);
}
function _defineProperty$z(e, r, t) {
  return (r = _toPropertyKey$z(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$z(t) {
  var i = _toPrimitive$z(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$z(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var INIT = "init";
var PENDING = "pending";
var ACTIVE = "active";
var COMPLETED = "completed";
function duration(time2) {
  return Math.max(0, time2);
}
class RechartsAnimation {
  /**
   * Returns the absolute time after the animationBegin delay has been completed,
   * and when the animationDuration started ticking.
   */
  getAnimationStartedTime() {
    return this.animationStartedTime;
  }
  /**
   * Returns the absolute time of when the animation began - now it will wait for {animationBegin} ms before the transition starts
   */
  getBeginStartedTime() {
    return this.beginStartedTime;
  }
  constructor(param) {
    var _param$onAnimationSta;
    _defineProperty$z(this, "state", INIT);
    this.animationId = param.animationId;
    this.onAnimationEnd = param.onAnimationEnd;
    this.animationDuration = duration(param.animationDuration);
    this.animationBegin = duration(param.animationBegin);
    this.progress = 0;
    this.from = param.from;
    this.to = param.to;
    this.easing = param.easing;
    (_param$onAnimationSta = param.onAnimationStart) === null || _param$onAnimationSta === void 0 || _param$onAnimationSta.call(param);
  }
  /**
   * Returns the state machine current state
   * - `init`:       animation had just been created. It immediately calls `onAnimationStart`
   * - `pending`:    animation is now paused for `animationBegin` milliseconds until the transition begins
   * - `active`:     animation is transitioning items on screen
   * - `completed`:  animation has completed its transition and executed `onAnimationEnd`.
   *                 This state is final and the animation is no longer allowed to transition to other states.
   */
  getState() {
    return this.state;
  }
  /**
   * Returns the easing input or function
   */
  getEasing() {
    return this.easing;
  }
  /**
   * Returns the configuration - the duration of the transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */
  getAnimationDuration() {
    return this.animationDuration;
  }
  /**
   * Sets the current time of the animation. The animation sets its internal state and progress accordingly.
   * This is current, absolute time; not additive!
   * This allows you to essentially "travel back in time" based on the value you pass in here.
   *
   * Returns the (relative) time remaining until the current activity is over.
   * Meaning: if the state is in a middle of a delay, returns the time left until the delay is finished.
   * If the state is in the middle of a transition, returns time left until that transition is complete.
   * This is useful because it's the same number you can take and put into setTimeout(fn, X)
   * as that's how much time we need to wait until the next state transition happens.
   */
  tick(now) {
    if (this.getState() === INIT) {
      this.state = PENDING;
      this.beginStartedTime = now;
      return this.animationBegin;
    }
    if (this.getState() === PENDING) {
      if (this.beginStartedTime == null) {
        throw new Error();
      }
      var _timeElapsed = now - this.beginStartedTime;
      if (_timeElapsed >= this.animationBegin) {
        this.state = ACTIVE;
        this.animationStartedTime = now;
        return this.nextAnimationUpdate(0);
      }
      return duration(this.animationBegin - _timeElapsed);
    }
    if (this.getState() === ACTIVE) {
      if (this.animationStartedTime == null) {
        throw new Error();
      }
      var _timeElapsed2 = now - this.animationStartedTime;
      this.setProgress(_timeElapsed2 / this.animationDuration);
      return this.nextAnimationUpdate(_timeElapsed2);
    }
    return 0;
  }
  setProgress(newProgress) {
    this.progress = Math.min(1, Math.max(0, newProgress));
  }
  /**
   * Returns an abstract "progress" which is number between 0 and 1 which shows the distance of transition.
   * This progress depends on the animation state:
   * - `init`: 0
   * - `pending`: 0
   * - `active`: transitioning between [0, 1] based on the time elapsed
   * - `completed`: 1
   *
   * The progress is hard-capped to be between 0 and 1 (inclusive) to avoid overshooting caused by coarse timers.
   * For this reason, the easing function must be applied _after_ this animation state,
   * so that one has a chance to construct dynamic "overshoot" animations.
   *
   * The progress is linear with time.
   * If you wish for easing, use `getInterpolated()` instead.
   */
  getProgress() {
    return this.progress;
  }
  /**
   * Completes the animation. Completed animation:
   * - cannot be manipulated anymore
   * - its progress is set to 1
   * - tick function doesn't do anything
   * - getState() always returns 'completed'
   */
  complete() {
    this.progress = 1;
    if (this.state === "active") {
      var _this$onAnimationEnd;
      (_this$onAnimationEnd = this.onAnimationEnd) === null || _this$onAnimationEnd === void 0 || _this$onAnimationEnd.call(this);
    }
    this.state = COMPLETED;
  }
  /**
   * Returns the starting value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static starting value
   */
  getFrom() {
    return this.from;
  }
  /**
   * Returns the end value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static end value
   */
  getTo() {
    return this.to;
  }
  /**
   * Unique identifier of an animation
   */
  getAnimationId() {
    return this.animationId;
  }
  /**
   * Returns the configuration - the duration of delay in between animation initialization, and transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */
  getAnimationBegin() {
    return this.animationBegin;
  }
  /**
   * Returns value of the transition at the current time.
   * The exact details differ based on the animation type
   */
  /**
   * Returns the duration of time of when the controller should ask for the next update
   */
}
class JavascriptAnimation extends RechartsAnimation {
  // eslint-disable-next-line class-methods-use-this
  nextAnimationUpdate() {
    return 0;
  }
  /**
   * Returns value of the animation after its easing function had been applied.
   * This value, unlike getProgress(), can escape the [0..1] range
   * because this is entirely within the easing function control. Spring typically does this.
   */
  getInterpolated() {
    return this.easing(interpolate$1(this.getFrom(), this.getTo(), this.getProgress()));
  }
}
class RequestAnimationFrameTimeoutController {
  setTimeout(callback) {
    var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var startTime = performance.now();
    var requestId = null;
    var executeCallback = (now) => {
      if (now - startTime >= delay) {
        callback(now);
      } else {
        requestId = requestAnimationFrame(executeCallback);
      }
    };
    requestId = requestAnimationFrame(executeCallback);
    return () => {
      if (requestId != null) {
        cancelAnimationFrame(requestId);
      }
    };
  }
}
function _slicedToArray$g(r, e) {
  return _arrayWithHoles$g(r) || _iterableToArrayLimit$g(r, e) || _unsupportedIterableToArray$g(r, e) || _nonIterableRest$g();
}
function _nonIterableRest$g() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$g(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$g(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$g(r, a2) : void 0;
  }
}
function _arrayLikeToArray$g(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$g(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$g(r) {
  if (Array.isArray(r)) return r;
}
var defaultJavascriptAnimateProps = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: true,
  canBegin: true,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
};
var from = 0;
var to = 1;
function JavascriptAnimate(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultJavascriptAnimateProps);
  var animationId = props.animationId, isActiveProp = props.isActive, canBegin = props.canBegin, duration2 = props.duration, easing = props.easing, begin = props.begin, onAnimationEnd = props.onAnimationEnd, onAnimationStart = props.onAnimationStart, children = props.children;
  var prefersReducedMotion = usePrefersReducedMotion();
  var isActive = isActiveProp === "auto" ? !Global.isSsr && !prefersReducedMotion : isActiveProp;
  var animationController = useAnimationController(props.animationController);
  var _useState = reactExports.useState(isActive ? from : to), _useState2 = _slicedToArray$g(_useState, 2), style = _useState2[0], setStyle = _useState2[1];
  reactExports.useEffect(() => {
    if (!isActive) {
      setStyle(to);
    }
  }, [isActive]);
  reactExports.useEffect(() => {
    var easingFunction = createEasingFunction(easing);
    if (!isActive || !canBegin || easingFunction == null) {
      return noop$5;
    }
    var timeoutController = new RequestAnimationFrameTimeoutController();
    var animation = new JavascriptAnimation({
      animationId,
      easing: easingFunction,
      animationDuration: duration2,
      animationBegin: begin,
      onAnimationStart,
      onAnimationEnd,
      from,
      to
    });
    return animationController(timeoutController, animation, setStyle);
  }, [animationController, animationId, isActive, canBegin, duration2, easing, begin, onAnimationStart, onAnimationEnd]);
  return children(Number(style));
}
function useAnimationId(input) {
  var prefix2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-";
  var animationId = reactExports.useRef(uniqueId(prefix2));
  var prevProps = reactExports.useRef(input);
  if (prevProps.current !== input) {
    animationId.current = uniqueId(prefix2);
    prevProps.current = input;
  }
  return animationId.current;
}
var getDashCase = (name) => name.replace(/([A-Z])/g, (v) => "-".concat(v.toLowerCase()));
var getTransitionVal = (props, duration2, easing) => props.map((prop) => "".concat(getDashCase(prop), " ").concat(duration2, "ms ").concat(easing)).join(",");
var _excluded$m = ["radius"], _excluded2$c = ["radius"];
var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5$1, _templateObject6$1, _templateObject7$1, _templateObject8, _templateObject9, _templateObject0;
function ownKeys$w(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$w(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$w(Object(t), true).forEach(function(r2) {
      _defineProperty$y(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$w(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$y(e, r, t) {
  return (r = _toPropertyKey$y(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$y(t) {
  var i = _toPrimitive$y(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$y(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$m() {
  return _extends$m = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$m.apply(null, arguments);
}
function _objectWithoutProperties$m(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$m(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$m(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _slicedToArray$f(r, e) {
  return _arrayWithHoles$f(r) || _iterableToArrayLimit$f(r, e) || _unsupportedIterableToArray$f(r, e) || _nonIterableRest$f();
}
function _nonIterableRest$f() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$f(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$f(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$f(r, a2) : void 0;
  }
}
function _arrayLikeToArray$f(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$f(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$f(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral$1(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var getRectanglePath = (x2, y2, width, height, radius) => {
  var roundedWidth = round$1(width);
  var roundedHeight = round$1(height);
  var maxRadius = Math.min(Math.abs(roundedWidth) / 2, Math.abs(roundedHeight) / 2);
  var ySign = roundedHeight >= 0 ? 1 : -1;
  var xSign = roundedWidth >= 0 ? 1 : -1;
  var clockWise = roundedHeight >= 0 && roundedWidth >= 0 || roundedHeight < 0 && roundedWidth < 0 ? 1 : 0;
  var path;
  if (maxRadius > 0 && Array.isArray(radius)) {
    var newRadius = [0, 0, 0, 0];
    for (var i = 0, len = 4; i < len; i++) {
      var _radius$i;
      var r = (_radius$i = radius[i]) !== null && _radius$i !== void 0 ? _radius$i : 0;
      newRadius[i] = r > maxRadius ? maxRadius : r;
    }
    path = roundTemplateLiteral(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1(["M", ",", ""])), x2, y2 + ySign * newRadius[0]);
    if (newRadius[0] > 0) {
      path += roundTemplateLiteral(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral$1(["A ", ",", ",0,0,", ",", ",", ""])), newRadius[0], newRadius[0], clockWise, x2 + xSign * newRadius[0], y2);
    }
    path += roundTemplateLiteral(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral$1(["L ", ",", ""])), x2 + width - xSign * newRadius[1], y2);
    if (newRadius[1] > 0) {
      path += roundTemplateLiteral(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral$1(["A ", ",", ",0,0,", ",\n        ", ",", ""])), newRadius[1], newRadius[1], clockWise, x2 + width, y2 + ySign * newRadius[1]);
    }
    path += roundTemplateLiteral(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteral$1(["L ", ",", ""])), x2 + width, y2 + height - ySign * newRadius[2]);
    if (newRadius[2] > 0) {
      path += roundTemplateLiteral(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteral$1(["A ", ",", ",0,0,", ",\n        ", ",", ""])), newRadius[2], newRadius[2], clockWise, x2 + width - xSign * newRadius[2], y2 + height);
    }
    path += roundTemplateLiteral(_templateObject7$1 || (_templateObject7$1 = _taggedTemplateLiteral$1(["L ", ",", ""])), x2 + xSign * newRadius[3], y2 + height);
    if (newRadius[3] > 0) {
      path += roundTemplateLiteral(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral$1(["A ", ",", ",0,0,", ",\n        ", ",", ""])), newRadius[3], newRadius[3], clockWise, x2, y2 + height - ySign * newRadius[3]);
    }
    path += "Z";
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    var _newRadius = Math.min(maxRadius, radius);
    path = roundTemplateLiteral(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral$1(["M ", ",", "\n            A ", ",", ",0,0,", ",", ",", "\n            L ", ",", "\n            A ", ",", ",0,0,", ",", ",", "\n            L ", ",", "\n            A ", ",", ",0,0,", ",", ",", "\n            L ", ",", "\n            A ", ",", ",0,0,", ",", ",", " Z"])), x2, y2 + ySign * _newRadius, _newRadius, _newRadius, clockWise, x2 + xSign * _newRadius, y2, x2 + width - xSign * _newRadius, y2, _newRadius, _newRadius, clockWise, x2 + width, y2 + ySign * _newRadius, x2 + width, y2 + height - ySign * _newRadius, _newRadius, _newRadius, clockWise, x2 + width - xSign * _newRadius, y2 + height, x2 + xSign * _newRadius, y2 + height, _newRadius, _newRadius, clockWise, x2, y2 + height - ySign * _newRadius);
  } else {
    path = roundTemplateLiteral(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral$1(["M ", ",", " h ", " v ", " h ", " Z"])), x2, y2, width, height, -width);
  }
  return path;
};
var defaultRectangleProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 0,
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
};
var Rectangle = (rectangleProps) => {
  var props = resolveDefaultProps(rectangleProps, defaultRectangleProps);
  var pathRef = reactExports.useRef(null);
  var _useState = reactExports.useState(-1), _useState2 = _slicedToArray$f(_useState, 2), totalLength = _useState2[0], setTotalLength = _useState2[1];
  reactExports.useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      try {
        var pathTotalLength = pathRef.current.getTotalLength();
        if (pathTotalLength) {
          setTotalLength(pathTotalLength);
        }
      } catch (_unused) {
      }
    }
  }, []);
  var x2 = props.x, y2 = props.y, width = props.width, height = props.height, radius = props.radius, className = props.className;
  var animationEasing = props.animationEasing, animationDuration = props.animationDuration, animationBegin = props.animationBegin, isAnimationActive = props.isAnimationActive, isUpdateAnimationActive = props.isUpdateAnimationActive;
  var prevWidthRef = reactExports.useRef(width);
  var prevHeightRef = reactExports.useRef(height);
  var prevXRef = reactExports.useRef(x2);
  var prevYRef = reactExports.useRef(y2);
  var animationIdInput = reactExports.useMemo(() => ({
    x: x2,
    y: y2,
    width,
    height,
    radius
  }), [x2, y2, width, height, radius]);
  var animationId = useAnimationId(animationIdInput, "rectangle-");
  if (x2 !== +x2 || y2 !== +y2 || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }
  var layerClass = clsx("recharts-rectangle", className);
  if (!isUpdateAnimationActive) {
    var _svgPropertiesAndEven = svgPropertiesAndEvents(props);
    _svgPropertiesAndEven.radius;
    var otherPathProps = _objectWithoutProperties$m(_svgPropertiesAndEven, _excluded$m);
    return /* @__PURE__ */ reactExports.createElement("path", _extends$m({}, otherPathProps, {
      x: round$1(x2),
      y: round$1(y2),
      width: round$1(width),
      height: round$1(height),
      radius: typeof radius === "number" ? radius : void 0,
      className: layerClass,
      d: getRectanglePath(x2, y2, width, height, radius)
    }));
  }
  var prevWidth = prevWidthRef.current;
  var prevHeight = prevHeightRef.current;
  var prevX = prevXRef.current;
  var prevY = prevYRef.current;
  var from2 = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
  var to2 = "".concat(totalLength, "px ").concat(totalLength, "px");
  var transition = getTransitionVal(["strokeDasharray"], animationDuration, typeof animationEasing === "string" ? animationEasing : defaultRectangleProps.animationEasing);
  return /* @__PURE__ */ reactExports.createElement(JavascriptAnimate, {
    animationId,
    key: animationId,
    canBegin: totalLength > 0,
    duration: animationDuration,
    easing: animationEasing,
    isActive: isUpdateAnimationActive,
    begin: animationBegin
  }, (animationElapsedTime) => {
    var currWidth = interpolate$1(prevWidth, width, animationElapsedTime);
    var currHeight = interpolate$1(prevHeight, height, animationElapsedTime);
    var currX = interpolate$1(prevX, x2, animationElapsedTime);
    var currY = interpolate$1(prevY, y2, animationElapsedTime);
    if (pathRef.current) {
      prevWidthRef.current = currWidth;
      prevHeightRef.current = currHeight;
      prevXRef.current = currX;
      prevYRef.current = currY;
    }
    var animationStyle;
    if (!isAnimationActive) {
      animationStyle = {
        strokeDasharray: to2
      };
    } else if (animationElapsedTime > 0) {
      animationStyle = {
        transition,
        strokeDasharray: to2
      };
    } else {
      animationStyle = {
        strokeDasharray: from2
      };
    }
    var _svgPropertiesAndEven2 = svgPropertiesAndEvents(props);
    _svgPropertiesAndEven2.radius;
    var otherPathProps2 = _objectWithoutProperties$m(_svgPropertiesAndEven2, _excluded2$c);
    return /* @__PURE__ */ reactExports.createElement("path", _extends$m({}, otherPathProps2, {
      radius: typeof radius === "number" ? radius : void 0,
      className: layerClass,
      d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
      ref: pathRef,
      style: _objectSpread$w(_objectSpread$w({}, animationStyle), props.style)
    }));
  });
};
function ownKeys$v(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$v(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$v(Object(t), true).forEach(function(r2) {
      _defineProperty$x(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$v(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$x(e, r, t) {
  return (r = _toPropertyKey$x(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$x(t) {
  var i = _toPrimitive$x(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$x(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var RADIAN = Math.PI / 180;
var radianToDegree = (angleInRadian) => angleInRadian * 180 / Math.PI;
var polarToCartesian = (cx, cy, radius, angle) => ({
  x: cx + Math.cos(-RADIAN * angle) * radius,
  y: cy + Math.sin(-RADIAN * angle) * radius
});
var getMaxRadius = function getMaxRadius2(width, height) {
  var offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(width - (offset.left || 0) - (offset.right || 0)), Math.abs(height - (offset.top || 0) - (offset.bottom || 0))) / 2;
};
var distanceBetweenPoints = (point2, anotherPoint) => {
  var x1 = point2.x, y1 = point2.y;
  var x2 = anotherPoint.x, y2 = anotherPoint.y;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
var getAngleOfPoint = (_ref2, _ref22) => {
  var x2 = _ref2.x, y2 = _ref2.y;
  var cx = _ref22.cx, cy = _ref22.cy;
  var radius = distanceBetweenPoints({
    x: x2,
    y: y2
  }, {
    x: cx,
    y: cy
  });
  if (radius <= 0) {
    return {
      radius,
      angle: 0
    };
  }
  var cos2 = (x2 - cx) / radius;
  var angleInRadian = Math.acos(cos2);
  if (y2 > cy) {
    angleInRadian = 2 * Math.PI - angleInRadian;
  }
  return {
    radius,
    angle: radianToDegree(angleInRadian),
    angleInRadian
  };
};
var formatAngleOfSector = (_ref3) => {
  var startAngle = _ref3.startAngle, endAngle = _ref3.endAngle;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min2 = Math.min(startCnt, endCnt);
  return {
    startAngle: startAngle - min2 * 360,
    endAngle: endAngle - min2 * 360
  };
};
var reverseFormatAngleOfSector = (angle, _ref4) => {
  var startAngle = _ref4.startAngle, endAngle = _ref4.endAngle;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min2 = Math.min(startCnt, endCnt);
  return angle + min2 * 360;
};
var inRangeOfSector = (_ref5, viewBox) => {
  var x2 = _ref5.relativeX, y2 = _ref5.relativeY;
  var _getAngleOfPoint = getAngleOfPoint({
    x: x2,
    y: y2
  }, viewBox), radius = _getAngleOfPoint.radius, angle = _getAngleOfPoint.angle;
  var innerRadius = viewBox.innerRadius, outerRadius = viewBox.outerRadius;
  if (radius < innerRadius || radius > outerRadius) {
    return null;
  }
  if (radius === 0) {
    return null;
  }
  var _formatAngleOfSector = formatAngleOfSector(viewBox), startAngle = _formatAngleOfSector.startAngle, endAngle = _formatAngleOfSector.endAngle;
  var formatAngle = angle;
  var inRange;
  if (startAngle <= endAngle) {
    while (formatAngle > endAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < startAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= startAngle && formatAngle <= endAngle;
  } else {
    while (formatAngle > startAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < endAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= endAngle && formatAngle <= startAngle;
  }
  if (inRange) {
    return _objectSpread$v(_objectSpread$v({}, viewBox), {}, {
      radius,
      angle: reverseFormatAngleOfSector(formatAngle, viewBox)
    });
  }
  return null;
};
function getRadialCursorPoints(activeCoordinate) {
  var cx = activeCoordinate.cx, cy = activeCoordinate.cy, radius = activeCoordinate.radius, startAngle = activeCoordinate.startAngle, endAngle = activeCoordinate.endAngle;
  var startPoint = polarToCartesian(cx, cy, radius, startAngle);
  var endPoint = polarToCartesian(cx, cy, radius, endAngle);
  return {
    points: [startPoint, endPoint],
    cx,
    cy,
    radius,
    startAngle,
    endAngle
  };
}
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _extends$l() {
  return _extends$l = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$l.apply(null, arguments);
}
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var getDeltaAngle$1 = (startAngle, endAngle) => {
  var sign2 = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);
  return sign2 * deltaAngle;
};
var getTangentCircle = (_ref2) => {
  var cx = _ref2.cx, cy = _ref2.cy, radius = _ref2.radius, angle = _ref2.angle, sign2 = _ref2.sign, isExternal = _ref2.isExternal, cornerRadius = _ref2.cornerRadius, cornerIsExternal = _ref2.cornerIsExternal;
  var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
  var theta = Math.asin(cornerRadius / centerRadius) / RADIAN;
  var centerAngle = cornerIsExternal ? angle : angle + sign2 * theta;
  var center = polarToCartesian(cx, cy, centerRadius, centerAngle);
  var circleTangency = polarToCartesian(cx, cy, radius, centerAngle);
  var lineTangencyAngle = cornerIsExternal ? angle - sign2 * theta : angle;
  var lineTangency = polarToCartesian(cx, cy, centerRadius * Math.cos(theta * RADIAN), lineTangencyAngle);
  return {
    center,
    circleTangency,
    lineTangency,
    theta
  };
};
var getSectorPath = (_ref2) => {
  var cx = _ref2.cx, cy = _ref2.cy, innerRadius = _ref2.innerRadius, outerRadius = _ref2.outerRadius, startAngle = _ref2.startAngle, endAngle = _ref2.endAngle;
  var angle = getDeltaAngle$1(startAngle, endAngle);
  var tempEndAngle = startAngle + angle;
  var outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle);
  var outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle);
  var path = roundTemplateLiteral(_templateObject || (_templateObject = _taggedTemplateLiteral(["M ", ",", "\n    A ", ",", ",0,\n    ", ",", ",\n    ", ",", "\n  "])), outerStartPoint.x, outerStartPoint.y, outerRadius, outerRadius, +(Math.abs(angle) > 180), +(startAngle > tempEndAngle), outerEndPoint.x, outerEndPoint.y);
  if (innerRadius > 0) {
    var innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle);
    var innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle);
    path += roundTemplateLiteral(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["L ", ",", "\n            A ", ",", ",0,\n            ", ",", ",\n            ", ",", " Z"])), innerEndPoint.x, innerEndPoint.y, innerRadius, innerRadius, +(Math.abs(angle) > 180), +(startAngle <= tempEndAngle), innerStartPoint.x, innerStartPoint.y);
  } else {
    path += roundTemplateLiteral(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["L ", ",", " Z"])), cx, cy);
  }
  return path;
};
var getSectorWithCorner = (_ref3) => {
  var cx = _ref3.cx, cy = _ref3.cy, innerRadius = _ref3.innerRadius, outerRadius = _ref3.outerRadius, cornerRadius = _ref3.cornerRadius, forceCornerRadius = _ref3.forceCornerRadius, cornerIsExternal = _ref3.cornerIsExternal, startAngle = _ref3.startAngle, endAngle = _ref3.endAngle;
  var sign2 = mathSign(endAngle - startAngle);
  var _getTangentCircle = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: startAngle,
    sign: sign2,
    cornerRadius,
    cornerIsExternal
  }), soct = _getTangentCircle.circleTangency, solt = _getTangentCircle.lineTangency, sot = _getTangentCircle.theta;
  var _getTangentCircle2 = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: endAngle,
    sign: -sign2,
    cornerRadius,
    cornerIsExternal
  }), eoct = _getTangentCircle2.circleTangency, eolt = _getTangentCircle2.lineTangency, eot = _getTangentCircle2.theta;
  var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
  if (outerArcAngle < 0) {
    if (forceCornerRadius) {
      return roundTemplateLiteral(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["M ", ",", "\n        a", ",", ",0,0,1,", ",0\n        a", ",", ",0,0,1,", ",0\n      "])), solt.x, solt.y, cornerRadius, cornerRadius, cornerRadius * 2, cornerRadius, cornerRadius, -cornerRadius * 2);
    }
    return getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    });
  }
  var path = roundTemplateLiteral(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["M ", ",", "\n    A", ",", ",0,0,", ",", ",", "\n    A", ",", ",0,", ",", ",", ",", "\n    A", ",", ",0,0,", ",", ",", "\n  "])), solt.x, solt.y, cornerRadius, cornerRadius, +(sign2 < 0), soct.x, soct.y, outerRadius, outerRadius, +(outerArcAngle > 180), +(sign2 < 0), eoct.x, eoct.y, cornerRadius, cornerRadius, +(sign2 < 0), eolt.x, eolt.y);
  if (innerRadius > 0) {
    var _getTangentCircle3 = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: startAngle,
      sign: sign2,
      isExternal: true,
      cornerRadius,
      cornerIsExternal
    }), sict = _getTangentCircle3.circleTangency, silt = _getTangentCircle3.lineTangency, sit = _getTangentCircle3.theta;
    var _getTangentCircle4 = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: endAngle,
      sign: -sign2,
      isExternal: true,
      cornerRadius,
      cornerIsExternal
    }), eict = _getTangentCircle4.circleTangency, eilt = _getTangentCircle4.lineTangency, eit = _getTangentCircle4.theta;
    var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
    if (innerArcAngle < 0 && cornerRadius === 0) {
      return "".concat(path, "L").concat(cx, ",").concat(cy, "Z");
    }
    path += roundTemplateLiteral(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["L", ",", "\n      A", ",", ",0,0,", ",", ",", "\n      A", ",", ",0,", ",", ",", ",", "\n      A", ",", ",0,0,", ",", ",", "Z"])), eilt.x, eilt.y, cornerRadius, cornerRadius, +(sign2 < 0), eict.x, eict.y, innerRadius, innerRadius, +(innerArcAngle > 180), +(sign2 > 0), sict.x, sict.y, cornerRadius, cornerRadius, +(sign2 < 0), silt.x, silt.y);
  } else {
    path += roundTemplateLiteral(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["L", ",", "Z"])), cx, cy);
  }
  return path;
};
var defaultSectorProps = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: false,
  cornerIsExternal: false
};
var Sector = (sectorProps) => {
  var props = resolveDefaultProps(sectorProps, defaultSectorProps);
  var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, cornerRadius = props.cornerRadius, forceCornerRadius = props.forceCornerRadius, cornerIsExternal = props.cornerIsExternal, startAngle = props.startAngle, endAngle = props.endAngle, className = props.className;
  if (outerRadius < innerRadius || startAngle === endAngle) {
    return null;
  }
  var layerClass = clsx("recharts-sector", className);
  var deltaRadius = outerRadius - innerRadius;
  var cr = getPercentValue(cornerRadius, deltaRadius, 0, true);
  var path;
  if (cr > 0 && Math.abs(startAngle - endAngle) < 360) {
    path = getSectorWithCorner({
      cx,
      cy,
      innerRadius,
      outerRadius,
      cornerRadius: Math.min(cr, deltaRadius / 2),
      forceCornerRadius,
      cornerIsExternal,
      startAngle,
      endAngle
    });
  } else {
    path = getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    });
  }
  return /* @__PURE__ */ reactExports.createElement("path", _extends$l({}, svgPropertiesAndEvents(props), {
    className: layerClass,
    d: path
  }));
};
function getCursorPoints(layout, activeCoordinate, offset) {
  if (layout === "horizontal") {
    return [{
      x: activeCoordinate.x,
      y: offset.top
    }, {
      x: activeCoordinate.x,
      y: offset.top + offset.height
    }];
  }
  if (layout === "vertical") {
    return [{
      x: offset.left,
      y: activeCoordinate.y
    }, {
      x: offset.left + offset.width,
      y: activeCoordinate.y
    }];
  }
  if (isPolarCoordinate(activeCoordinate)) {
    if (layout === "centric") {
      var cx = activeCoordinate.cx, cy = activeCoordinate.cy, innerRadius = activeCoordinate.innerRadius, outerRadius = activeCoordinate.outerRadius, angle = activeCoordinate.angle;
      var innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
      var outerPoint = polarToCartesian(cx, cy, outerRadius, angle);
      return [{
        x: innerPoint.x,
        y: innerPoint.y
      }, {
        x: outerPoint.x,
        y: outerPoint.y
      }];
    }
    return getRadialCursorPoints(activeCoordinate);
  }
  return void 0;
}
function toNumber(value) {
  if (isSymbol(value)) return NaN;
  return Number(value);
}
function toFinite(value) {
  if (!value) return value === 0 ? value : 0;
  value = toNumber(value);
  if (value === Infinity || value === -Infinity) return (value < 0 ? -1 : 1) * Number.MAX_VALUE;
  return value === value ? value : 0;
}
function range$1(start, end, step) {
  if (step && typeof step !== "number" && isIterateeCall(start, end, step)) end = step = void 0;
  start = toFinite(start);
  if (end === void 0) {
    end = start;
    start = 0;
  } else end = toFinite(end);
  step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);
  for (let index = 0; index < length; index++) {
    result[index] = start;
    start += step;
  }
  return result;
}
var selectChartDataWithIndexes = (state) => state.chartData;
var selectChartDataAndAlwaysIgnoreIndexes = createSelector([selectChartDataWithIndexes], (dataState) => {
  var dataEndIndex = dataState.chartData != null ? dataState.chartData.length - 1 : 0;
  return {
    chartData: dataState.chartData,
    computedData: dataState.computedData,
    dataEndIndex,
    dataStartIndex: 0
  };
});
var selectChartDataWithIndexesIfNotInPanoramaPosition4 = (state, _unused1, _unused2, isPanorama) => {
  if (isPanorama) {
    return selectChartDataAndAlwaysIgnoreIndexes(state);
  }
  return selectChartDataWithIndexes(state);
};
var selectChartDataWithIndexesIfNotInPanoramaPosition3 = (state, _unused1, isPanorama) => {
  if (isPanorama) {
    return selectChartDataAndAlwaysIgnoreIndexes(state);
  }
  return selectChartDataWithIndexes(state);
};
var selectChartDataSliceIfNotInPanorama = createSelector([selectChartDataWithIndexesIfNotInPanoramaPosition4], (_ref2) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
var selectChartDataSliceIgnoringIndexes = createSelector([selectChartDataAndAlwaysIgnoreIndexes], (_ref2) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
var selectChartDataSliceWithIndexes = createSelector([selectChartDataWithIndexes], (_ref3) => {
  var chartData = _ref3.chartData, dataStartIndex = _ref3.dataStartIndex, dataEndIndex = _ref3.dataEndIndex;
  return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
function _slicedToArray$e(r, e) {
  return _arrayWithHoles$e(r) || _iterableToArrayLimit$e(r, e) || _unsupportedIterableToArray$e(r, e) || _nonIterableRest$e();
}
function _nonIterableRest$e() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$e(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$e(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$e(r, a2) : void 0;
  }
}
function _arrayLikeToArray$e(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$e(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$e(r) {
  if (Array.isArray(r)) return r;
}
function isWellFormedNumberDomain(v) {
  if (Array.isArray(v) && v.length === 2) {
    var _v = _slicedToArray$e(v, 2), min2 = _v[0], max2 = _v[1];
    if (isWellBehavedNumber(min2) && isWellBehavedNumber(max2)) {
      return true;
    }
  }
  return false;
}
function extendDomain(providedDomain, boundaryDomain, allowDataOverflow) {
  if (allowDataOverflow) {
    return providedDomain;
  }
  return [Math.min(providedDomain[0], boundaryDomain[0]), Math.max(providedDomain[1], boundaryDomain[1])];
}
function numericalDomainSpecifiedWithoutRequiringData(userDomain, allowDataOverflow) {
  if (!allowDataOverflow) {
    return void 0;
  }
  if (typeof userDomain === "function") {
    return void 0;
  }
  if (Array.isArray(userDomain) && userDomain.length === 2) {
    var _userDomain = _slicedToArray$e(userDomain, 2), providedMin = _userDomain[0], providedMax = _userDomain[1];
    var finalMin, finalMax;
    if (isWellBehavedNumber(providedMin)) {
      finalMin = providedMin;
    } else if (typeof providedMin === "function") {
      return void 0;
    }
    if (isWellBehavedNumber(providedMax)) {
      finalMax = providedMax;
    } else if (typeof providedMax === "function") {
      return void 0;
    }
    var candidate = [finalMin, finalMax];
    if (isWellFormedNumberDomain(candidate)) {
      return candidate;
    }
  }
  return void 0;
}
function parseNumericalUserDomain(userDomain, dataDomain, allowDataOverflow) {
  if (!allowDataOverflow && dataDomain == null) {
    return void 0;
  }
  if (typeof userDomain === "function" && dataDomain != null) {
    try {
      var result = userDomain(dataDomain, allowDataOverflow);
      if (isWellFormedNumberDomain(result)) {
        return extendDomain(result, dataDomain, allowDataOverflow);
      }
    } catch (_unused) {
    }
  }
  if (Array.isArray(userDomain) && userDomain.length === 2) {
    var _userDomain2 = _slicedToArray$e(userDomain, 2), providedMin = _userDomain2[0], providedMax = _userDomain2[1];
    var finalMin, finalMax;
    if (providedMin === "auto") {
      if (dataDomain != null) {
        finalMin = Math.min(...dataDomain);
      }
    } else if (isNumber(providedMin)) {
      finalMin = providedMin;
    } else if (typeof providedMin === "function") {
      try {
        if (dataDomain != null) {
          finalMin = providedMin(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0]);
        }
      } catch (_unused2) {
      }
    } else if (typeof providedMin === "string" && MIN_VALUE_REG.test(providedMin)) {
      var match = MIN_VALUE_REG.exec(providedMin);
      if (match == null || match[1] == null || dataDomain == null) {
        finalMin = void 0;
      } else {
        var value = +match[1];
        finalMin = dataDomain[0] - value;
      }
    } else {
      finalMin = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0];
    }
    if (providedMax === "auto") {
      if (dataDomain != null) {
        finalMax = Math.max(...dataDomain);
      }
    } else if (isNumber(providedMax)) {
      finalMax = providedMax;
    } else if (typeof providedMax === "function") {
      try {
        if (dataDomain != null) {
          finalMax = providedMax(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1]);
        }
      } catch (_unused3) {
      }
    } else if (typeof providedMax === "string" && MAX_VALUE_REG.test(providedMax)) {
      var _match = MAX_VALUE_REG.exec(providedMax);
      if (_match == null || _match[1] == null || dataDomain == null) {
        finalMax = void 0;
      } else {
        var _value = +_match[1];
        finalMax = dataDomain[1] + _value;
      }
    } else {
      finalMax = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1];
    }
    var candidate = [finalMin, finalMax];
    if (isWellFormedNumberDomain(candidate)) {
      if (dataDomain == null) {
        return candidate;
      }
      return extendDomain(candidate, dataDomain, allowDataOverflow);
    }
  }
  return void 0;
}
var MAX_DIGITS = 1e9, defaults = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, Decimal, external = true, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", exponentOutOfRange = decimalError + "Exponent out of range: ", mathfloor = Math.floor, mathpow = Math.pow, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ONE, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, MAX_E = mathfloor(MAX_SAFE_INTEGER / LOG_BASE), P = {};
P.absoluteValue = P.abs = function() {
  var x2 = new this.constructor(this);
  if (x2.s) x2.s = 1;
  return x2;
};
P.comparedTo = P.cmp = function(y2) {
  var i, j, xdL, ydL, x2 = this;
  y2 = new x2.constructor(y2);
  if (x2.s !== y2.s) return x2.s || -y2.s;
  if (x2.e !== y2.e) return x2.e > y2.e ^ x2.s < 0 ? 1 : -1;
  xdL = x2.d.length;
  ydL = y2.d.length;
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (x2.d[i] !== y2.d[i]) return x2.d[i] > y2.d[i] ^ x2.s < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ x2.s < 0 ? 1 : -1;
};
P.decimalPlaces = P.dp = function() {
  var x2 = this, w = x2.d.length - 1, dp = (w - x2.e) * LOG_BASE;
  w = x2.d[w];
  if (w) for (; w % 10 == 0; w /= 10) dp--;
  return dp < 0 ? 0 : dp;
};
P.dividedBy = P.div = function(y2) {
  return divide(this, new this.constructor(y2));
};
P.dividedToIntegerBy = P.idiv = function(y2) {
  var x2 = this, Ctor = x2.constructor;
  return round(divide(x2, new Ctor(y2), 0, 1), Ctor.precision);
};
P.equals = P.eq = function(y2) {
  return !this.cmp(y2);
};
P.exponent = function() {
  return getBase10Exponent(this);
};
P.greaterThan = P.gt = function(y2) {
  return this.cmp(y2) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y2) {
  return this.cmp(y2) >= 0;
};
P.isInteger = P.isint = function() {
  return this.e > this.d.length - 2;
};
P.isNegative = P.isneg = function() {
  return this.s < 0;
};
P.isPositive = P.ispos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return this.s === 0;
};
P.lessThan = P.lt = function(y2) {
  return this.cmp(y2) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y2) {
  return this.cmp(y2) < 1;
};
P.logarithm = P.log = function(base) {
  var r, x2 = this, Ctor = x2.constructor, pr = Ctor.precision, wpr = pr + 5;
  if (base === void 0) {
    base = new Ctor(10);
  } else {
    base = new Ctor(base);
    if (base.s < 1 || base.eq(ONE)) throw Error(decimalError + "NaN");
  }
  if (x2.s < 1) throw Error(decimalError + (x2.s ? "NaN" : "-Infinity"));
  if (x2.eq(ONE)) return new Ctor(0);
  external = false;
  r = divide(ln(x2, wpr), ln(base, wpr), wpr);
  external = true;
  return round(r, pr);
};
P.minus = P.sub = function(y2) {
  var x2 = this;
  y2 = new x2.constructor(y2);
  return x2.s == y2.s ? subtract(x2, y2) : add(x2, (y2.s = -y2.s, y2));
};
P.modulo = P.mod = function(y2) {
  var q, x2 = this, Ctor = x2.constructor, pr = Ctor.precision;
  y2 = new Ctor(y2);
  if (!y2.s) throw Error(decimalError + "NaN");
  if (!x2.s) return round(new Ctor(x2), pr);
  external = false;
  q = divide(x2, y2, 0, 1).times(y2);
  external = true;
  return x2.minus(q);
};
P.naturalExponential = P.exp = function() {
  return exp(this);
};
P.naturalLogarithm = P.ln = function() {
  return ln(this);
};
P.negated = P.neg = function() {
  var x2 = new this.constructor(this);
  x2.s = -x2.s || 0;
  return x2;
};
P.plus = P.add = function(y2) {
  var x2 = this;
  y2 = new x2.constructor(y2);
  return x2.s == y2.s ? add(x2, y2) : subtract(x2, (y2.s = -y2.s, y2));
};
P.precision = P.sd = function(z) {
  var e, sd, w, x2 = this;
  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
  e = getBase10Exponent(x2) + 1;
  w = x2.d.length - 1;
  sd = w * LOG_BASE + 1;
  w = x2.d[w];
  if (w) {
    for (; w % 10 == 0; w /= 10) sd--;
    for (w = x2.d[0]; w >= 10; w /= 10) sd++;
  }
  return z && e > sd ? e : sd;
};
P.squareRoot = P.sqrt = function() {
  var e, n, pr, r, s2, t, wpr, x2 = this, Ctor = x2.constructor;
  if (x2.s < 1) {
    if (!x2.s) return new Ctor(0);
    throw Error(decimalError + "NaN");
  }
  e = getBase10Exponent(x2);
  external = false;
  s2 = Math.sqrt(+x2);
  if (s2 == 0 || s2 == 1 / 0) {
    n = digitsToString(x2.d);
    if ((n.length + e) % 2 == 0) n += "0";
    s2 = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
    if (s2 == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s2.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s2.toString());
  }
  pr = Ctor.precision;
  s2 = wpr = pr + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x2, t, wpr + 2)).times(0.5);
    if (digitsToString(t.d).slice(0, wpr) === (n = digitsToString(r.d)).slice(0, wpr)) {
      n = n.slice(wpr - 3, wpr + 1);
      if (s2 == wpr && n == "4999") {
        round(t, pr + 1, 0);
        if (t.times(t).eq(x2)) {
          r = t;
          break;
        }
      } else if (n != "9999") {
        break;
      }
      wpr += 4;
    }
  }
  external = true;
  return round(r, pr);
};
P.times = P.mul = function(y2) {
  var carry, e, i, k2, r, rL, t, xdL, ydL, x2 = this, Ctor = x2.constructor, xd = x2.d, yd = (y2 = new Ctor(y2)).d;
  if (!x2.s || !y2.s) return new Ctor(0);
  y2.s *= x2.s;
  e = x2.e + y2.e;
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--; ) r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k2 = xdL + i; k2 > i; ) {
      t = r[k2] + yd[i] * xd[k2 - i - 1] + carry;
      r[k2--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k2] = (r[k2] + carry) % BASE | 0;
  }
  for (; !r[--rL]; ) r.pop();
  if (carry) ++e;
  else r.shift();
  y2.d = r;
  y2.e = e;
  return external ? round(y2, Ctor.precision) : y2;
};
P.toDecimalPlaces = P.todp = function(dp, rm) {
  var x2 = this, Ctor = x2.constructor;
  x2 = new Ctor(x2);
  if (dp === void 0) return x2;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);
  return round(x2, dp + getBase10Exponent(x2) + 1, rm);
};
P.toExponential = function(dp, rm) {
  var str, x2 = this, Ctor = x2.constructor;
  if (dp === void 0) {
    str = toString(x2, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    x2 = round(new Ctor(x2), dp + 1, rm);
    str = toString(x2, true, dp + 1);
  }
  return str;
};
P.toFixed = function(dp, rm) {
  var str, y2, x2 = this, Ctor = x2.constructor;
  if (dp === void 0) return toString(x2);
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);
  y2 = round(new Ctor(x2), dp + getBase10Exponent(x2) + 1, rm);
  str = toString(y2.abs(), false, dp + getBase10Exponent(y2) + 1);
  return x2.isneg() && !x2.isZero() ? "-" + str : str;
};
P.toInteger = P.toint = function() {
  var x2 = this, Ctor = x2.constructor;
  return round(new Ctor(x2), getBase10Exponent(x2) + 1, Ctor.rounding);
};
P.toNumber = function() {
  return +this;
};
P.toPower = P.pow = function(y2) {
  var e, k2, pr, r, sign2, yIsInt, x2 = this, Ctor = x2.constructor, guard = 12, yn = +(y2 = new Ctor(y2));
  if (!y2.s) return new Ctor(ONE);
  x2 = new Ctor(x2);
  if (!x2.s) {
    if (y2.s < 1) throw Error(decimalError + "Infinity");
    return x2;
  }
  if (x2.eq(ONE)) return x2;
  pr = Ctor.precision;
  if (y2.eq(ONE)) return round(x2, pr);
  e = y2.e;
  k2 = y2.d.length - 1;
  yIsInt = e >= k2;
  sign2 = x2.s;
  if (!yIsInt) {
    if (sign2 < 0) throw Error(decimalError + "NaN");
  } else if ((k2 = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = new Ctor(ONE);
    e = Math.ceil(pr / LOG_BASE + 4);
    external = false;
    for (; ; ) {
      if (k2 % 2) {
        r = r.times(x2);
        truncate(r.d, e);
      }
      k2 = mathfloor(k2 / 2);
      if (k2 === 0) break;
      x2 = x2.times(x2);
      truncate(x2.d, e);
    }
    external = true;
    return y2.s < 0 ? new Ctor(ONE).div(r) : round(r, pr);
  }
  sign2 = sign2 < 0 && y2.d[Math.max(e, k2)] & 1 ? -1 : 1;
  x2.s = 1;
  external = false;
  r = y2.times(ln(x2, pr + guard));
  external = true;
  r = exp(r);
  r.s = sign2;
  return r;
};
P.toPrecision = function(sd, rm) {
  var e, str, x2 = this, Ctor = x2.constructor;
  if (sd === void 0) {
    e = getBase10Exponent(x2);
    str = toString(x2, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    x2 = round(new Ctor(x2), sd, rm);
    e = getBase10Exponent(x2);
    str = toString(x2, sd <= e || e <= Ctor.toExpNeg, sd);
  }
  return str;
};
P.toSignificantDigits = P.tosd = function(sd, rm) {
  var x2 = this, Ctor = x2.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  }
  return round(new Ctor(x2), sd, rm);
};
P.toString = P.valueOf = P.val = P.toJSON = P[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
  var x2 = this, e = getBase10Exponent(x2), Ctor = x2.constructor;
  return toString(x2, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
};
function add(x2, y2) {
  var carry, d, e, i, k2, len, xd, yd, Ctor = x2.constructor, pr = Ctor.precision;
  if (!x2.s || !y2.s) {
    if (!y2.s) y2 = new Ctor(x2);
    return external ? round(y2, pr) : y2;
  }
  xd = x2.d;
  yd = y2.d;
  k2 = x2.e;
  e = y2.e;
  xd = xd.slice();
  i = k2 - e;
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k2;
      len = xd.length;
    }
    k2 = Math.ceil(pr / LOG_BASE);
    len = k2 > len ? k2 + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }
    d.reverse();
    for (; i--; ) d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }
  for (len = xd.length; xd[--len] == 0; ) xd.pop();
  y2.d = xd;
  y2.e = e;
  return external ? round(y2, pr) : y2;
}
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function digitsToString(d) {
  var i, k2, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k2 = LOG_BASE - ws.length;
      if (k2) str += getZeroString(k2);
      str += ws;
    }
    w = d[i];
    ws = w + "";
    k2 = LOG_BASE - ws.length;
    if (k2) str += getZeroString(k2);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; ) w /= 10;
  return str + w;
}
var divide = /* @__PURE__ */ (function() {
  function multiplyInteger(x2, k2) {
    var temp, carry = 0, i = x2.length;
    for (x2 = x2.slice(); i--; ) {
      temp = x2[i] * k2 + carry;
      x2[i] = temp % BASE | 0;
      carry = temp / BASE | 0;
    }
    if (carry) x2.unshift(carry);
    return x2;
  }
  function compare(a2, b, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a2[i] != b[i]) {
          r = a2[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract2(a2, b, aL) {
    var i = 0;
    for (; aL--; ) {
      a2[aL] -= i;
      i = a2[aL] < b[aL] ? 1 : 0;
      a2[aL] = i * BASE + a2[aL] - b[aL];
    }
    for (; !a2[0] && a2.length > 1; ) a2.shift();
  }
  return function(x2, y2, pr, dp) {
    var cmp, e, i, k2, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x2.constructor, sign2 = x2.s == y2.s ? 1 : -1, xd = x2.d, yd = y2.d;
    if (!x2.s) return new Ctor(x2);
    if (!y2.s) throw Error(decimalError + "Division by zero");
    e = x2.e - y2.e;
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign2);
    qd = q.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); ) ++i;
    if (yd[i] > (xd[i] || 0)) --e;
    if (pr == null) {
      sd = pr = Ctor.precision;
    } else if (dp) {
      sd = pr + (getBase10Exponent(x2) - getBase10Exponent(y2)) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) return new Ctor(0);
    sd = sd / LOG_BASE + 2 | 0;
    i = 0;
    if (yL == 1) {
      k2 = 0;
      yd = yd[0];
      sd++;
      for (; (i < xL || k2) && sd--; i++) {
        t = k2 * BASE + (xd[i] || 0);
        qd[i] = t / yd | 0;
        k2 = t % yd | 0;
      }
    } else {
      k2 = BASE / (yd[0] + 1) | 0;
      if (k2 > 1) {
        yd = multiplyInteger(yd, k2);
        xd = multiplyInteger(xd, k2);
        yL = yd.length;
        xL = xd.length;
      }
      xi = yL;
      rem = xd.slice(0, yL);
      remL = rem.length;
      for (; remL < yL; ) rem[remL++] = 0;
      yz = yd.slice();
      yz.unshift(0);
      yd0 = yd[0];
      if (yd[1] >= BASE / 2) ++yd0;
      do {
        k2 = 0;
        cmp = compare(yd, rem, yL, remL);
        if (cmp < 0) {
          rem0 = rem[0];
          if (yL != remL) rem0 = rem0 * BASE + (rem[1] || 0);
          k2 = rem0 / yd0 | 0;
          if (k2 > 1) {
            if (k2 >= BASE) k2 = BASE - 1;
            prod = multiplyInteger(yd, k2);
            prodL = prod.length;
            remL = rem.length;
            cmp = compare(prod, rem, prodL, remL);
            if (cmp == 1) {
              k2--;
              subtract2(prod, yL < prodL ? yz : yd, prodL);
            }
          } else {
            if (k2 == 0) cmp = k2 = 1;
            prod = yd.slice();
          }
          prodL = prod.length;
          if (prodL < remL) prod.unshift(0);
          subtract2(rem, prod, remL);
          if (cmp == -1) {
            remL = rem.length;
            cmp = compare(yd, rem, yL, remL);
            if (cmp < 1) {
              k2++;
              subtract2(rem, yL < remL ? yz : yd, remL);
            }
          }
          remL = rem.length;
        } else if (cmp === 0) {
          k2++;
          rem = [0];
        }
        qd[i++] = k2;
        if (cmp && rem[0]) {
          rem[remL++] = xd[xi] || 0;
        } else {
          rem = [xd[xi]];
          remL = 1;
        }
      } while ((xi++ < xL || rem[0] !== void 0) && sd--);
    }
    if (!qd[0]) qd.shift();
    q.e = e;
    return round(q, dp ? pr + getBase10Exponent(q) + 1 : pr);
  };
})();
function exp(x2, sd) {
  var denominator, guard, pow2, sum, t, wpr, i = 0, k2 = 0, Ctor = x2.constructor, pr = Ctor.precision;
  if (getBase10Exponent(x2) > 16) throw Error(exponentOutOfRange + getBase10Exponent(x2));
  if (!x2.s) return new Ctor(ONE);
  {
    external = false;
    wpr = pr;
  }
  t = new Ctor(0.03125);
  while (x2.abs().gte(0.1)) {
    x2 = x2.times(t);
    k2 += 5;
  }
  guard = Math.log(mathpow(2, k2)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum = new Ctor(ONE);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = round(pow2.times(x2), wpr);
    denominator = denominator.times(++i);
    t = sum.plus(divide(pow2, denominator, wpr));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      while (k2--) sum = round(sum.times(sum), wpr);
      Ctor.precision = pr;
      return sd == null ? (external = true, round(sum, pr)) : sum;
    }
    sum = t;
  }
}
function getBase10Exponent(x2) {
  var e = x2.e * LOG_BASE, w = x2.d[0];
  for (; w >= 10; w /= 10) e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > Ctor.LN10.sd()) {
    external = true;
    if (pr) Ctor.precision = pr;
    throw Error(decimalError + "LN10 precision limit exceeded");
  }
  return round(new Ctor(Ctor.LN10), sd);
}
function getZeroString(k2) {
  var zs = "";
  for (; k2--; ) zs += "0";
  return zs;
}
function ln(y2, sd) {
  var c2, c0, denominator, e, numerator, sum, t, wpr, x2, n = 1, guard = 10, x3 = y2, xd = x3.d, Ctor = x3.constructor, pr = Ctor.precision;
  if (x3.s < 1) throw Error(decimalError + (x3.s ? "NaN" : "-Infinity"));
  if (x3.eq(ONE)) return new Ctor(0);
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  if (x3.eq(10)) {
    if (sd == null) external = true;
    return getLn10(Ctor, wpr);
  }
  wpr += guard;
  Ctor.precision = wpr;
  c2 = digitsToString(xd);
  c0 = c2.charAt(0);
  e = getBase10Exponent(x3);
  if (Math.abs(e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c2.charAt(1) > 3) {
      x3 = x3.times(y2);
      c2 = digitsToString(x3.d);
      c0 = c2.charAt(0);
      n++;
    }
    e = getBase10Exponent(x3);
    if (c0 > 1) {
      x3 = new Ctor("0." + c2);
      e++;
    } else {
      x3 = new Ctor(c0 + "." + c2.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x3 = ln(new Ctor(c0 + "." + c2.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? (external = true, round(x3, pr)) : x3;
  }
  sum = numerator = x3 = divide(x3.minus(ONE), x3.plus(ONE), wpr);
  x2 = round(x3.times(x3), wpr);
  denominator = 3;
  for (; ; ) {
    numerator = round(numerator.times(x2), wpr);
    t = sum.plus(divide(numerator, new Ctor(denominator), wpr));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      sum = sum.times(2);
      if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum = divide(sum, new Ctor(n), wpr);
      Ctor.precision = pr;
      return sd == null ? (external = true, round(sum, pr)) : sum;
    }
    sum = t;
    denominator += 2;
  }
}
function parseDecimal(x2, str) {
  var e, i, len;
  if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0) e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; ) ++i;
  for (len = str.length; str.charCodeAt(len - 1) === 48; ) --len;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    e = e - i - 1;
    x2.e = mathfloor(e / LOG_BASE);
    x2.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0) i += LOG_BASE;
    if (i < len) {
      if (i) x2.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; ) x2.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; ) str += "0";
    x2.d.push(+str);
    if (external && (x2.e > MAX_E || x2.e < -MAX_E)) throw Error(exponentOutOfRange + e);
  } else {
    x2.s = 0;
    x2.e = 0;
    x2.d = [0];
  }
  return x2;
}
function round(x2, sd, rm) {
  var i, j, k2, n, rd, doRound, w, xdi, xd = x2.d;
  for (n = 1, k2 = xd[0]; k2 >= 10; k2 /= 10) n++;
  i = sd - n;
  if (i < 0) {
    i += LOG_BASE;
    j = sd;
    w = xd[xdi = 0];
  } else {
    xdi = Math.ceil((i + 1) / LOG_BASE);
    k2 = xd.length;
    if (xdi >= k2) return x2;
    w = k2 = xd[xdi];
    for (n = 1; k2 >= 10; k2 /= 10) n++;
    i %= LOG_BASE;
    j = i - LOG_BASE + n;
  }
  if (rm !== void 0) {
    k2 = mathpow(10, n - j - 1);
    rd = w / k2 % 10 | 0;
    doRound = sd < 0 || xd[xdi + 1] !== void 0 || w % k2;
    doRound = rm < 4 ? (rd || doRound) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || doRound || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
    (i > 0 ? j > 0 ? w / mathpow(10, n - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x2.s < 0 ? 8 : 7));
  }
  if (sd < 1 || !xd[0]) {
    if (doRound) {
      k2 = getBase10Exponent(x2);
      xd.length = 1;
      sd = sd - k2 - 1;
      xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
      x2.e = mathfloor(-sd / LOG_BASE) || 0;
    } else {
      xd.length = 1;
      xd[0] = x2.e = x2.s = 0;
    }
    return x2;
  }
  if (i == 0) {
    xd.length = xdi;
    k2 = 1;
    xdi--;
  } else {
    xd.length = xdi + 1;
    k2 = mathpow(10, LOG_BASE - i);
    xd[xdi] = j > 0 ? (w / mathpow(10, n - j) % mathpow(10, j) | 0) * k2 : 0;
  }
  if (doRound) {
    for (; ; ) {
      if (xdi == 0) {
        if ((xd[0] += k2) == BASE) {
          xd[0] = 1;
          ++x2.e;
        }
        break;
      } else {
        xd[xdi] += k2;
        if (xd[xdi] != BASE) break;
        xd[xdi--] = 0;
        k2 = 1;
      }
    }
  }
  for (i = xd.length; xd[--i] === 0; ) xd.pop();
  if (external && (x2.e > MAX_E || x2.e < -MAX_E)) {
    throw Error(exponentOutOfRange + getBase10Exponent(x2));
  }
  return x2;
}
function subtract(x2, y2) {
  var d, e, i, j, k2, len, xd, xe, xLTy, yd, Ctor = x2.constructor, pr = Ctor.precision;
  if (!x2.s || !y2.s) {
    if (y2.s) y2.s = -y2.s;
    else y2 = new Ctor(x2);
    return external ? round(y2, pr) : y2;
  }
  xd = x2.d;
  yd = y2.d;
  e = y2.e;
  xe = x2.e;
  xd = xd.slice();
  k2 = xe - e;
  if (k2) {
    xLTy = k2 < 0;
    if (xLTy) {
      d = xd;
      k2 = -k2;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k2 > i) {
      k2 = i;
      d.length = 1;
    }
    d.reverse();
    for (i = k2; i--; ) d.push(0);
    d.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy) len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k2 = 0;
  }
  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y2.s = -y2.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
  for (i = yd.length; i > k2; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; ) xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; ) xd.pop();
  for (; xd[0] === 0; xd.shift()) --e;
  if (!xd[0]) return new Ctor(0);
  y2.d = xd;
  y2.e = e;
  return external ? round(y2, pr) : y2;
}
function toString(x2, isExp, sd) {
  var k2, e = getBase10Exponent(x2), str = digitsToString(x2.d), len = str.length;
  if (isExp) {
    if (sd && (k2 = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k2);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (e < 0 ? "e" : "e+") + e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k2 = sd - len) > 0) str += getZeroString(k2);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k2 = sd - e - 1) > 0) str = str + "." + getZeroString(k2);
  } else {
    if ((k2 = e + 1) < len) str = str.slice(0, k2) + "." + str.slice(k2);
    if (sd && (k2 = sd - len) > 0) {
      if (e + 1 === len) str += ".";
      str += getZeroString(k2);
    }
  }
  return x2.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function clone(obj) {
  var i, p, ps;
  function Decimal2(value) {
    var x2 = this;
    if (!(x2 instanceof Decimal2)) return new Decimal2(value);
    x2.constructor = Decimal2;
    if (value instanceof Decimal2) {
      x2.s = value.s;
      x2.e = value.e;
      x2.d = (value = value.d) ? value.slice() : value;
      return;
    }
    if (typeof value === "number") {
      if (value * 0 !== 0) {
        throw Error(invalidArgument + value);
      }
      if (value > 0) {
        x2.s = 1;
      } else if (value < 0) {
        value = -value;
        x2.s = -1;
      } else {
        x2.s = 0;
        x2.e = 0;
        x2.d = [0];
        return;
      }
      if (value === ~~value && value < 1e7) {
        x2.e = 0;
        x2.d = [value];
        return;
      }
      return parseDecimal(x2, value.toString());
    } else if (typeof value !== "string") {
      throw Error(invalidArgument + value);
    }
    if (value.charCodeAt(0) === 45) {
      value = value.slice(1);
      x2.s = -1;
    } else {
      x2.s = 1;
    }
    if (isDecimal.test(value)) parseDecimal(x2, value);
    else throw Error(invalidArgument + value);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.clone = clone;
  Decimal2.config = Decimal2.set = config;
  if (obj === void 0) obj = {};
  if (obj) {
    ps = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"];
    for (i = 0; i < ps.length; ) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
  }
  Decimal2.config(obj);
  return Decimal2;
}
function config(obj) {
  if (!obj || typeof obj !== "object") {
    throw Error(decimalError + "Object expected");
  }
  var i, p, v, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (i = 0; i < ps.length; i += 3) {
    if ((v = obj[p = ps[i]]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
      else throw Error(invalidArgument + p + ": " + v);
    }
  }
  if ((v = obj[p = "LN10"]) !== void 0) {
    if (v == Math.LN10) this[p] = new this(v);
    else throw Error(invalidArgument + p + ": " + v);
  }
  return this;
}
var Decimal = clone(defaults);
ONE = new Decimal(1);
const Decimal$1 = Decimal;
function getDigitCount(value) {
  var result;
  if (value === 0) {
    result = 1;
  } else {
    result = Math.floor(new Decimal$1(value).abs().log(10).toNumber()) + 1;
  }
  return result;
}
function rangeStep(start, end, step) {
  var num = new Decimal$1(start);
  var i = 0;
  var result = [];
  while (num.lt(end) && i < 1e5) {
    result.push(num.toNumber());
    num = num.add(step);
    i++;
  }
  return result;
}
function _slicedToArray$d(r, e) {
  return _arrayWithHoles$d(r) || _iterableToArrayLimit$d(r, e) || _unsupportedIterableToArray$d(r, e) || _nonIterableRest$d();
}
function _nonIterableRest$d() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$d(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$d(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$d(r, a2) : void 0;
  }
}
function _arrayLikeToArray$d(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$d(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$d(r) {
  if (Array.isArray(r)) return r;
}
var getValidInterval = (_ref2) => {
  var _ref22 = _slicedToArray$d(_ref2, 2), min2 = _ref22[0], max2 = _ref22[1];
  var validMin = min2, validMax = max2;
  if (min2 > max2) {
    validMin = max2;
    validMax = min2;
  }
  return [validMin, validMax];
};
var getAdaptiveStep = (roughStep, allowDecimals, correctionFactor) => {
  if (roughStep.lte(0)) {
    return new Decimal$1(0);
  }
  var digitCount = getDigitCount(roughStep.toNumber());
  var digitCountValue = new Decimal$1(10).pow(digitCount);
  var stepRatio = roughStep.div(digitCountValue);
  var stepRatioScale = digitCount !== 1 ? 0.05 : 0.1;
  var amendStepRatio = new Decimal$1(Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale);
  var formatStep = amendStepRatio.mul(digitCountValue);
  return allowDecimals ? new Decimal$1(formatStep.toNumber()) : new Decimal$1(Math.ceil(formatStep.toNumber()));
};
var getSnap125Step = (roughStep, allowDecimals, correctionFactor) => {
  var _NICE_STEPS$niceIdx;
  if (roughStep.lte(0)) {
    return new Decimal$1(0);
  }
  var NICE_STEPS = [1, 2, 2.5, 5];
  var roughNum = roughStep.toNumber();
  var exponent2 = Math.floor(new Decimal$1(roughNum).abs().log(10).toNumber());
  var magnitude = new Decimal$1(10).pow(exponent2);
  var normalized = roughStep.div(magnitude).toNumber();
  var niceIdx = NICE_STEPS.findIndex((s2) => s2 >= normalized - 1e-10);
  if (niceIdx === -1) {
    magnitude = magnitude.mul(10);
    niceIdx = 0;
  }
  niceIdx += correctionFactor;
  if (niceIdx >= NICE_STEPS.length) {
    var extraMag = Math.floor(niceIdx / NICE_STEPS.length);
    niceIdx %= NICE_STEPS.length;
    magnitude = magnitude.mul(new Decimal$1(10).pow(extraMag));
  }
  var niceStep = (_NICE_STEPS$niceIdx = NICE_STEPS[niceIdx]) !== null && _NICE_STEPS$niceIdx !== void 0 ? _NICE_STEPS$niceIdx : 1;
  var formatStep = new Decimal$1(niceStep).mul(magnitude);
  return allowDecimals ? formatStep : new Decimal$1(Math.ceil(formatStep.toNumber()));
};
var getTickOfSingleValue = (value, tickCount, allowDecimals) => {
  var step = new Decimal$1(1);
  var middle = new Decimal$1(value);
  if (!middle.isint() && allowDecimals) {
    var absVal = Math.abs(value);
    if (absVal < 1) {
      step = new Decimal$1(10).pow(getDigitCount(value) - 1);
      middle = new Decimal$1(Math.floor(middle.div(step).toNumber())).mul(step);
    } else if (absVal > 1) {
      middle = new Decimal$1(Math.floor(value));
    }
  } else if (value === 0) {
    middle = new Decimal$1(Math.floor((tickCount - 1) / 2));
  } else if (!allowDecimals) {
    middle = new Decimal$1(Math.floor(value));
  }
  var middleIndex = Math.floor((tickCount - 1) / 2);
  var ticks2 = [];
  for (var i = 0; i < tickCount; i++) {
    ticks2.push(middle.add(new Decimal$1(i - middleIndex).mul(step)).toNumber());
  }
  return ticks2;
};
var _calculateStep = function calculateStep(min2, max2, tickCount, allowDecimals) {
  var correctionFactor = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  var stepFn = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : getAdaptiveStep;
  if (!Number.isFinite((max2 - min2) / (tickCount - 1))) {
    return {
      step: new Decimal$1(0),
      tickMin: new Decimal$1(0),
      tickMax: new Decimal$1(0)
    };
  }
  var step = stepFn(new Decimal$1(max2).sub(min2).div(tickCount - 1), allowDecimals, correctionFactor);
  var middle;
  if (min2 <= 0 && max2 >= 0) {
    middle = new Decimal$1(0);
  } else {
    middle = new Decimal$1(min2).add(max2).div(2);
    middle = middle.sub(new Decimal$1(middle).mod(step));
  }
  var belowCount = Math.ceil(middle.sub(min2).div(step).toNumber());
  var upCount = Math.ceil(new Decimal$1(max2).sub(middle).div(step).toNumber());
  var scaleCount = belowCount + upCount + 1;
  if (scaleCount > tickCount) {
    return _calculateStep(min2, max2, tickCount, allowDecimals, correctionFactor + 1, stepFn);
  }
  if (scaleCount < tickCount) {
    upCount = max2 > 0 ? upCount + (tickCount - scaleCount) : upCount;
    belowCount = max2 > 0 ? belowCount : belowCount + (tickCount - scaleCount);
  }
  return {
    step,
    tickMin: middle.sub(new Decimal$1(belowCount).mul(step)),
    tickMax: middle.add(new Decimal$1(upCount).mul(step))
  };
};
var getNiceTickValues = function getNiceTickValues2(_ref3) {
  var _ref4 = _slicedToArray$d(_ref3, 2), min2 = _ref4[0], max2 = _ref4[1];
  var tickCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6;
  var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var niceTicksMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto";
  var count = Math.max(tickCount, 2);
  var _getValidInterval = getValidInterval([min2, max2]), _getValidInterval2 = _slicedToArray$d(_getValidInterval, 2), cormin = _getValidInterval2[0], cormax = _getValidInterval2[1];
  if (cormin === -Infinity || cormax === Infinity) {
    var _values = cormax === Infinity ? [cormin, ...Array(tickCount - 1).fill(Infinity)] : [...Array(tickCount - 1).fill(-Infinity), cormax];
    return min2 > max2 ? _values.reverse() : _values;
  }
  if (cormin === cormax) {
    return getTickOfSingleValue(cormin, tickCount, allowDecimals);
  }
  var stepFn = niceTicksMode === "snap125" ? getSnap125Step : getAdaptiveStep;
  var _calculateStep2 = _calculateStep(cormin, cormax, count, allowDecimals, 0, stepFn), step = _calculateStep2.step, tickMin = _calculateStep2.tickMin, tickMax = _calculateStep2.tickMax;
  var values = rangeStep(tickMin, tickMax.add(new Decimal$1(0.1).mul(step)), step);
  return min2 > max2 ? values.reverse() : values;
};
var getTickValuesFixedDomain = function getTickValuesFixedDomain2(_ref5, tickCount) {
  var _ref6 = _slicedToArray$d(_ref5, 2), min2 = _ref6[0], max2 = _ref6[1];
  var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var niceTicksMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto";
  var _getValidInterval3 = getValidInterval([min2, max2]), _getValidInterval4 = _slicedToArray$d(_getValidInterval3, 2), cormin = _getValidInterval4[0], cormax = _getValidInterval4[1];
  if (cormin === -Infinity || cormax === Infinity) {
    return [min2, max2];
  }
  if (cormin === cormax) {
    return [cormin];
  }
  var stepFn = niceTicksMode === "snap125" ? getSnap125Step : getAdaptiveStep;
  var count = Math.max(tickCount, 2);
  var step = stepFn(new Decimal$1(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
  var values = [...rangeStep(new Decimal$1(cormin), new Decimal$1(cormax), step), cormax];
  if (allowDecimals === false) {
    values = values.map((value) => Math.round(value));
    var last = values.length - 1;
    if (last > 0 && values[last] === values[last - 1]) {
      values = values.slice(0, last);
    }
  }
  return min2 > max2 ? values.reverse() : values;
};
var selectRootMaxBarSize = (state) => state.rootProps.maxBarSize;
var selectBarGap = (state) => state.rootProps.barGap;
var selectBarCategoryGap = (state) => state.rootProps.barCategoryGap;
var selectRootBarSize = (state) => state.rootProps.barSize;
var selectStackOffsetType = (state) => state.rootProps.stackOffset;
var selectReverseStackOrder = (state) => state.rootProps.reverseStackOrder;
var selectChartName = (state) => state.options.chartName;
var selectSyncId = (state) => state.rootProps.syncId;
var selectSyncMethod = (state) => state.rootProps.syncMethod;
var selectEventEmitter = (state) => state.options.eventEmitter;
var selectChartBaseValue = (state) => state.rootProps.baseValue;
var DefaultZIndexes = {
  /**
   * CartesianGrid and PolarGrid
   */
  grid: -100,
  /**
   * Background of Bar and RadialBar.
   * This is not visible by default but can be enabled by setting background={true} on Bar or RadialBar.
   */
  barBackground: -50,
  /*
   * other chart elements or custom elements without specific zIndex
   * render in here, at zIndex 0
   */
  /**
   * Area, Pie, Radar, and ReferenceArea
   */
  area: 100,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area. CursorRectangle is a rectangle box.
   * It renders below bar so that in a stacked bar chart the cursor rectangle does not hide the other bars.
   */
  cursorRectangle: 200,
  /**
   * Bar and RadialBar
   */
  bar: 300,
  /**
   * Line and ReferenceLine, and ErrorBor
   */
  line: 400,
  /**
   * XAxis and YAxis and PolarAngleAxis and PolarRadiusAxis ticks and lines and children
   */
  axis: 500,
  /**
   * Scatter and ReferenceDot,
   * and Dots of Line and Area and Radar if they have dot=true
   */
  scatter: 600,
  /**
   * Hovering over a Bar or RadialBar renders a highlight rectangle
   */
  activeBar: 1e3,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area, usually a cross or a box.
   * CursorLine is a line cursor rendered in Line, Area, Scatter, Radar charts.
   * It renders above the Line and Scatter so that it is always visible.
   * It renders below active dot so that the dot is always visible and shows the current point.
   * We're also assuming that the active dot is small enough that it does not fully cover the cursor line.
   *
   * This also applies to the radial cursor in RadialBarChart.
   */
  cursorLine: 1100,
  /**
   * Hovering over a Point in Line, Area, Scatter, Radar renders a highlight dot
   */
  activeDot: 1200,
  /**
   * LabelList and Label, including Axis labels
   */
  label: 2e3
};
var defaultPolarAngleAxisProps = {
  allowDecimals: false,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  allowDataOverflow: false,
  angleAxisId: 0,
  reversed: false,
  scale: "auto",
  tick: true,
  type: "auto"
};
var defaultPolarRadiusAxisProps = {
  allowDataOverflow: false,
  allowDecimals: false,
  allowDuplicatedCategory: true,
  includeHidden: false,
  radiusAxisId: 0,
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  type: "auto"
};
var combineAxisRangeWithReverse = (axisSettings, axisRange) => {
  if (!axisSettings || !axisRange) {
    return void 0;
  }
  if (axisSettings !== null && axisSettings !== void 0 && axisSettings.reversed) {
    return [axisRange[1], axisRange[0]];
  }
  return axisRange;
};
function getAxisTypeBasedOnLayout(layout, axisType, axisDomainType) {
  if (axisDomainType !== "auto") {
    return axisDomainType;
  }
  if (layout == null) {
    return void 0;
  }
  return isCategoricalAxis(layout, axisType) ? "category" : "number";
}
function ownKeys$u(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$u(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$u(Object(t), true).forEach(function(r2) {
      _defineProperty$w(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$u(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$w(e, r, t) {
  return (r = _toPropertyKey$w(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$w(t) {
  var i = _toPrimitive$w(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$w(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var implicitAngleAxis = {
  allowDataOverflow: defaultPolarAngleAxisProps.allowDataOverflow,
  allowDecimals: defaultPolarAngleAxisProps.allowDecimals,
  allowDuplicatedCategory: false,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarAngleAxisProps.angleAxisId,
  includeHidden: false,
  name: void 0,
  reversed: defaultPolarAngleAxisProps.reversed,
  scale: defaultPolarAngleAxisProps.scale,
  tick: defaultPolarAngleAxisProps.tick,
  tickCount: void 0,
  ticks: void 0,
  type: defaultPolarAngleAxisProps.type,
  unit: void 0,
  niceTicks: "auto"
};
var implicitRadiusAxis = {
  allowDataOverflow: defaultPolarRadiusAxisProps.allowDataOverflow,
  allowDecimals: defaultPolarRadiusAxisProps.allowDecimals,
  allowDuplicatedCategory: defaultPolarRadiusAxisProps.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarRadiusAxisProps.radiusAxisId,
  includeHidden: defaultPolarRadiusAxisProps.includeHidden,
  name: void 0,
  reversed: defaultPolarRadiusAxisProps.reversed,
  scale: defaultPolarRadiusAxisProps.scale,
  tick: defaultPolarRadiusAxisProps.tick,
  tickCount: defaultPolarRadiusAxisProps.tickCount,
  ticks: void 0,
  type: defaultPolarRadiusAxisProps.type,
  unit: void 0,
  niceTicks: "auto"
};
var selectAngleAxisNoDefaults = (state, angleAxisId) => {
  if (angleAxisId == null) {
    return void 0;
  }
  return state.polarAxis.angleAxis[angleAxisId];
};
var selectAngleAxis = createSelector([selectAngleAxisNoDefaults, selectPolarChartLayout], (angleAxisSettings, layout) => {
  var _getAxisTypeBasedOnLa;
  if (angleAxisSettings != null) {
    return angleAxisSettings;
  }
  var evaluatedType = (_getAxisTypeBasedOnLa = getAxisTypeBasedOnLayout(layout, "angleAxis", implicitAngleAxis.type)) !== null && _getAxisTypeBasedOnLa !== void 0 ? _getAxisTypeBasedOnLa : "category";
  return _objectSpread$u(_objectSpread$u({}, implicitAngleAxis), {}, {
    type: evaluatedType
  });
});
var selectRadiusAxisNoDefaults = (state, radiusAxisId) => {
  return state.polarAxis.radiusAxis[radiusAxisId];
};
var selectRadiusAxis = createSelector([selectRadiusAxisNoDefaults, selectPolarChartLayout], (radiusAxisSettings, layout) => {
  var _getAxisTypeBasedOnLa2;
  if (radiusAxisSettings != null) {
    return radiusAxisSettings;
  }
  var evaluatedType = (_getAxisTypeBasedOnLa2 = getAxisTypeBasedOnLayout(layout, "radiusAxis", implicitRadiusAxis.type)) !== null && _getAxisTypeBasedOnLa2 !== void 0 ? _getAxisTypeBasedOnLa2 : "category";
  return _objectSpread$u(_objectSpread$u({}, implicitRadiusAxis), {}, {
    type: evaluatedType
  });
});
var selectPolarOptions = (state) => state.polarOptions;
var selectMaxRadius = createSelector([selectChartWidth, selectChartHeight, selectChartOffsetInternal], getMaxRadius);
var selectInnerRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
  if (polarChartOptions == null) {
    return void 0;
  }
  return getPercentValue(polarChartOptions.innerRadius, maxRadius, 0);
});
var selectOuterRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
  if (polarChartOptions == null) {
    return void 0;
  }
  return getPercentValue(polarChartOptions.outerRadius, maxRadius, maxRadius * 0.8);
});
var combineAngleAxisRange = (polarOptions) => {
  if (polarOptions == null) {
    return [0, 0];
  }
  var startAngle = polarOptions.startAngle, endAngle = polarOptions.endAngle;
  return [startAngle, endAngle];
};
var selectAngleAxisRange = createSelector([selectPolarOptions], combineAngleAxisRange);
createSelector([selectAngleAxis, selectAngleAxisRange], combineAxisRangeWithReverse);
var selectRadiusAxisRange = createSelector([selectMaxRadius, selectInnerRadius, selectOuterRadius], (maxRadius, innerRadius, outerRadius) => {
  if (maxRadius == null || innerRadius == null || outerRadius == null) {
    return void 0;
  }
  return [innerRadius, outerRadius];
});
createSelector([selectRadiusAxis, selectRadiusAxisRange], combineAxisRangeWithReverse);
var selectPolarViewBox = createSelector([selectChartLayout, selectPolarOptions, selectInnerRadius, selectOuterRadius, selectChartWidth, selectChartHeight], (layout, polarOptions, innerRadius, outerRadius, width, height) => {
  if (layout !== "centric" && layout !== "radial" || polarOptions == null || innerRadius == null || outerRadius == null) {
    return void 0;
  }
  var cx = polarOptions.cx, cy = polarOptions.cy, startAngle = polarOptions.startAngle, endAngle = polarOptions.endAngle;
  return {
    cx: getPercentValue(cx, width, width / 2),
    cy: getPercentValue(cy, height, height / 2),
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    clockWise: false
    // this property look useful, why not use it?
  };
});
var pickAxisType = (_state, axisType) => axisType;
var pickAxisId = (_state, _axisType, axisId) => axisId;
function getStackSeriesIdentifier(graphicalItem) {
  return graphicalItem === null || graphicalItem === void 0 ? void 0 : graphicalItem.id;
}
function combineDisplayedStackedData(stackedGraphicalItems, _ref2, tooltipAxisSettings) {
  var _ref$chartData = _ref2.chartData, chartData = _ref$chartData === void 0 ? [] : _ref$chartData;
  var allowDuplicatedCategory = tooltipAxisSettings.allowDuplicatedCategory, tooltipDataKey = tooltipAxisSettings.dataKey;
  var knownItemsByDataKey = /* @__PURE__ */ new Map();
  stackedGraphicalItems.forEach((item) => {
    var _item$data;
    var resolvedData = (_item$data = item.data) !== null && _item$data !== void 0 ? _item$data : chartData;
    if (resolvedData == null || resolvedData.length === 0) {
      return;
    }
    var stackIdentifier = getStackSeriesIdentifier(item);
    resolvedData.forEach((entry, index) => {
      var tooltipValue = tooltipDataKey == null || allowDuplicatedCategory ? index : String(getValueByDataKey(entry, tooltipDataKey, null));
      var numericValue = getValueByDataKey(entry, item.dataKey, 0);
      var curr;
      if (knownItemsByDataKey.has(tooltipValue)) {
        curr = knownItemsByDataKey.get(tooltipValue);
      } else {
        curr = {};
      }
      Object.assign(curr, {
        [stackIdentifier]: numericValue
      });
      knownItemsByDataKey.set(tooltipValue, curr);
    });
  });
  return Array.from(knownItemsByDataKey.values());
}
function isStacked(graphicalItem) {
  return "stackId" in graphicalItem && graphicalItem.stackId != null && graphicalItem.dataKey != null;
}
var numberDomainEqualityCheck = (a2, b) => {
  if (a2 === b) {
    return true;
  }
  if (a2 == null || b == null) {
    return false;
  }
  return a2[0] === b[0] && a2[1] === b[1];
};
function emptyArraysAreEqualCheck(a2, b) {
  if (Array.isArray(a2) && Array.isArray(b) && a2.length === 0 && b.length === 0) {
    return true;
  }
  return a2 === b;
}
function arrayContentsAreEqualCheck(a2, b) {
  if (a2.length === b.length) {
    for (var i = 0; i < a2.length; i++) {
      if (a2[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}
var selectTooltipAxisType = (state) => {
  var layout = selectChartLayout(state);
  if (layout === "horizontal") {
    return "xAxis";
  }
  if (layout === "vertical") {
    return "yAxis";
  }
  if (layout === "centric") {
    return "angleAxis";
  }
  return "radiusAxis";
};
var selectTooltipAxisId = (state) => state.tooltip.settings.axisId;
function rechartsScaleFactory(d3Scale) {
  if (d3Scale == null) {
    return void 0;
  }
  var ticksFn = d3Scale.ticks;
  var bandwidthFn = d3Scale.bandwidth;
  var d3Range = d3Scale.range();
  var range2 = [Math.min(...d3Range), Math.max(...d3Range)];
  return {
    domain: () => d3Scale.domain(),
    range: (function(_range) {
      function range3() {
        return _range.apply(this, arguments);
      }
      range3.toString = function() {
        return _range.toString();
      };
      return range3;
    })(() => range2),
    rangeMin: () => range2[0],
    rangeMax: () => range2[1],
    isInRange(value) {
      var first = range2[0];
      var last = range2[1];
      return first <= last ? value >= first && value <= last : value >= last && value <= first;
    },
    bandwidth: bandwidthFn ? () => bandwidthFn.call(d3Scale) : void 0,
    ticks: ticksFn ? (count) => ticksFn.call(d3Scale, count) : void 0,
    map: (input, options) => {
      var baseValue = d3Scale(input);
      if (baseValue == null) {
        return void 0;
      }
      if (d3Scale.bandwidth && options !== null && options !== void 0 && options.position) {
        var bandWidth = d3Scale.bandwidth();
        switch (options.position) {
          case "middle":
            baseValue += bandWidth / 2;
            break;
          case "end":
            baseValue += bandWidth;
            break;
        }
      }
      return baseValue;
    }
  };
}
var combineCheckedDomain = (realScaleType, axisDomain) => {
  if (axisDomain == null) {
    return void 0;
  }
  switch (realScaleType) {
    case "linear": {
      if (!isWellFormedNumberDomain(axisDomain)) {
        var min2, max2;
        for (var i = 0; i < axisDomain.length; i++) {
          var value = axisDomain[i];
          if (!isWellBehavedNumber(value)) {
            continue;
          }
          if (min2 === void 0 || value < min2) {
            min2 = value;
          }
          if (max2 === void 0 || value > max2) {
            max2 = value;
          }
        }
        if (min2 !== void 0 && max2 !== void 0) {
          return [min2, max2];
        }
        return void 0;
      }
      return axisDomain;
    }
    default:
      return axisDomain;
  }
};
function ascending(a2, b) {
  return a2 == null || b == null ? NaN : a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}
function descending(a2, b) {
  return a2 == null || b == null ? NaN : b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}
function bisector(f) {
  let compare1, compare2, delta;
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x2) => ascending(f(d), x2);
    delta = (d, x2) => f(d) - x2;
  } else {
    compare1 = f === ascending || f === descending ? f : zero$1;
    compare2 = f;
    delta = f;
  }
  function left(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a2, x2, lo = 0, hi = a2.length) {
    const i = left(a2, x2, lo, hi - 1);
    return i > lo && delta(a2[i - 1], x2) > -delta(a2[i], x2) ? i - 1 : i;
  }
  return { left, center, right };
}
function zero$1() {
  return 0;
}
function number$2(x2) {
  return x2 === null ? NaN : +x2;
}
function* numbers(values, valueof) {
  {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}
const ascendingBisect = bisector(ascending);
const bisectRight = ascendingBisect.right;
bisector(number$2).center;
class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries != null) for (const [key2, value] of entries) this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}
function compareDefined(compare = ascending) {
  if (compare === ascending) return ascendingDefined;
  if (typeof compare !== "function") throw new TypeError("compare is not a function");
  return (a2, b) => {
    const x2 = compare(a2, b);
    if (x2 || x2 === 0) return x2;
    return (compare(b, b) === 0) - (compare(a2, a2) === 0);
  };
}
function ascendingDefined(a2, b) {
  return (a2 == null || !(a2 >= a2)) - (b == null || !(b >= b)) || (a2 < b ? -1 : a2 > b ? 1 : 0);
}
const e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}
function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks2 = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) * inc;
  }
  return ticks2;
}
function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}
function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}
function max(values, valueof) {
  let max2;
  {
    for (const value of values) {
      if (value != null && (max2 < value || max2 === void 0 && value >= value)) {
        max2 = value;
      }
    }
  }
  return max2;
}
function min(values, valueof) {
  let min2;
  {
    for (const value of values) {
      if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
        min2 = value;
      }
    }
  }
  return min2;
}
function quickselect(array2, k2, left = 0, right = Infinity, compare) {
  k2 = Math.floor(k2);
  left = Math.floor(Math.max(0, left));
  right = Math.floor(Math.min(array2.length - 1, right));
  if (!(left <= k2 && k2 <= right)) return array2;
  compare = compare === void 0 ? ascendingDefined : compareDefined(compare);
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k2 - left + 1;
      const z = Math.log(n);
      const s2 = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s2 * (n - s2) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k2 - m * s2 / n + sd));
      const newRight = Math.min(right, Math.floor(k2 + (n - m) * s2 / n + sd));
      quickselect(array2, k2, newLeft, newRight, compare);
    }
    const t = array2[k2];
    let i = left;
    let j = right;
    swap(array2, left, k2);
    if (compare(array2[right], t) > 0) swap(array2, left, right);
    while (i < j) {
      swap(array2, i, j), ++i, --j;
      while (compare(array2[i], t) < 0) ++i;
      while (compare(array2[j], t) > 0) --j;
    }
    if (compare(array2[left], t) === 0) swap(array2, left, j);
    else ++j, swap(array2, j, right);
    if (j <= k2) left = j + 1;
    if (k2 <= j) right = j - 1;
  }
  return array2;
}
function swap(array2, i, j) {
  const t = array2[i];
  array2[i] = array2[j];
  array2[j] = t;
}
function quantile$1(values, p, valueof) {
  values = Float64Array.from(numbers(values));
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return min(values);
  if (p >= 1) return max(values);
  var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = max(quickselect(values, i0).subarray(0, i0 + 1)), value1 = min(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}
function quantileSorted(values, p, valueof = number$2) {
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values), value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}
function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start + i * step;
  }
  return range2;
}
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}
function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      if (typeof domain === "function") this.interpolator(domain);
      else this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function") this.interpolator(interpolator);
      else this.range(interpolator);
      break;
    }
  }
  return this;
}
const implicit = /* @__PURE__ */ Symbol("implicit");
function ordinal() {
  var index = new InternMap(), domain = [], range2 = [], unknown = implicit;
  function scale(d) {
    let i = index.get(d);
    if (i === void 0) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range2[i % range2.length];
  }
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), scale) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return scale;
}
function band() {
  var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round2 = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n = domain().length, reverse = r1 < r0, start = reverse ? r1 : r0, stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round2) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round2) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range(n).map(function(i) {
      return start + step * i;
    });
    return ordinalRange(reverse ? values.reverse() : values);
  }
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };
  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round2 = true, rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step;
  };
  scale.round = function(_) {
    return arguments.length ? (round2 = !!_, rescale()) : round2;
  };
  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };
  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };
  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };
  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };
  scale.copy = function() {
    return band(domain(), [r0, r1]).round(round2).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return initRange.apply(rescale(), arguments);
}
function pointish(scale) {
  var copy2 = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = function() {
    return pointish(copy2());
  };
  return scale;
}
function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a2) {
  if (a2 <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb$1(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define(Rgb, rgb$1, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a2 = clampa(this.opacity);
  return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s2, l, a2) {
  if (a2 <= 0) h = s2 = l = NaN;
  else if (l <= 0 || l >= 1) h = s2 = NaN;
  else if (s2 <= 0) h = NaN;
  return new Hsl(h, s2, l, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s2 = max2 - min2, l = (max2 + min2) / 2;
  if (s2) {
    if (r === max2) h = (g - b) / s2 + (g < b) * 6;
    else if (g === max2) h = (b - r) / s2 + 2;
    else h = (r - g) / s2 + 4;
    s2 /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s2 = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s2, l, o.opacity);
}
function hsl(h, s2, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s2, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s2, l, opacity) {
  this.h = +h;
  this.s = +s2;
  this.l = +l;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s2, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
const constant = (x2) => () => x2;
function linear$1(a2, d) {
  return function(t) {
    return a2 + t * d;
  };
}
function exponential(a2, b, y2) {
  return a2 = Math.pow(a2, y2), b = Math.pow(b, y2) - a2, y2 = 1 / y2, function(t) {
    return Math.pow(a2 + t * b, y2);
  };
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a2, b) {
    return b - a2 ? exponential(a2, b, y2) : constant(isNaN(a2) ? b : a2);
  };
}
function nogamma(a2, b) {
  var d = b - a2;
  return d ? linear$1(a2, d) : constant(isNaN(a2) ? b : a2);
}
const rgb = (function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb2(start, end) {
    var r = color2((start = rgb$1(start)).r, (end = rgb$1(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
})(1);
function numberArray(a2, b) {
  if (!b) b = [];
  var n = a2 ? Math.min(b.length, a2.length) : 0, c2 = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i) c2[i] = a2[i] * (1 - t) + b[i] * t;
    return c2;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}
function genericArray(a2, b) {
  var nb = b ? b.length : 0, na = a2 ? Math.min(nb, a2.length) : 0, x2 = new Array(na), c2 = new Array(nb), i;
  for (i = 0; i < na; ++i) x2[i] = interpolate(a2[i], b[i]);
  for (; i < nb; ++i) c2[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i) c2[i] = x2[i](t);
    return c2;
  };
}
function date$1(a2, b) {
  var d = /* @__PURE__ */ new Date();
  return a2 = +a2, b = +b, function(t) {
    return d.setTime(a2 * (1 - t) + b * t), d;
  };
}
function interpolateNumber(a2, b) {
  return a2 = +a2, b = +b, function(t) {
    return a2 * (1 - t) + b * t;
  };
}
function object(a2, b) {
  var i = {}, c2 = {}, k2;
  if (a2 === null || typeof a2 !== "object") a2 = {};
  if (b === null || typeof b !== "object") b = {};
  for (k2 in b) {
    if (k2 in a2) {
      i[k2] = interpolate(a2[k2], b[k2]);
    } else {
      c2[k2] = b[k2];
    }
  }
  return function(t) {
    for (k2 in i) c2[k2] = i[k2](t);
    return c2;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string(a2, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s2 = [], q = [];
  a2 = a2 + "", b = b + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s2[i]) s2[i] += bs;
      else s2[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s2[i]) s2[i] += bm;
      else s2[++i] = bm;
    } else {
      s2[++i] = null;
      q.push({ i, x: interpolateNumber(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s2[i]) s2[i] += bs;
    else s2[++i] = bs;
  }
  return s2.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s2[(o = q[i2]).i] = o.x(t);
    return s2.join("");
  });
}
function interpolate(a2, b) {
  var t = typeof b, c2;
  return b == null || t === "boolean" ? constant(b) : (t === "number" ? interpolateNumber : t === "string" ? (c2 = color(b)) ? (b = c2, rgb) : string : b instanceof color ? rgb : b instanceof Date ? date$1 : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a2, b);
}
function interpolateRound(a2, b) {
  return a2 = +a2, b = +b, function(t) {
    return Math.round(a2 * (1 - t) + b * t);
  };
}
function piecewise(interpolate$12, values) {
  if (values === void 0) values = interpolate$12, interpolate$12 = interpolate;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate$12(v, v = values[++i]);
  return function(t) {
    var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i2](t - i2);
  };
}
function constants(x2) {
  return function() {
    return x2;
  };
}
function number$1(x2) {
  return +x2;
}
var unit = [0, 1];
function identity$2(x2) {
  return x2;
}
function normalize(a2, b) {
  return (b -= a2 = +a2) ? function(x2) {
    return (x2 - a2) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a2, b) {
  var t;
  if (a2 > b) t = a2, a2 = b, b = t;
  return function(x2) {
    return Math.max(a2, Math.min(b, x2));
  };
}
function bimap(domain, range2, interpolate2) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate2(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate2(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range2, interpolate2) {
  var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate2(range2[i], range2[i + 1]);
  }
  return function(x2) {
    var i2 = bisectRight(domain, x2, 1, j) - 1;
    return r[i2](d[i2](x2));
  };
}
function copy$1(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer$2() {
  var domain = unit, range2 = unit, interpolate$12 = interpolate, transform, untransform, unknown, clamp = identity$2, piecewise2, output, input;
  function rescale() {
    var n = Math.min(domain.length, range2.length);
    if (clamp !== identity$2) clamp = clamper(domain[0], domain[n - 1]);
    piecewise2 = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise2(domain.map(transform), range2, interpolate$12)))(transform(clamp(x2)));
  }
  scale.invert = function(y2) {
    return clamp(untransform((input || (input = piecewise2(range2, domain.map(transform), interpolateNumber)))(y2)));
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return range2 = Array.from(_), interpolate$12 = interpolateRound, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$2, rescale()) : clamp !== identity$2;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$12 = _, rescale()) : interpolate$12;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer$2()(identity$2, identity$2);
}
function formatDecimal(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p) {
  if (!isFinite(x2) || x2 === 0) return null;
  var i = (x2 = p ? x2.toExponential(p - 1) : x2.toExponential()).indexOf("e"), coefficient = x2.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i + 1)
  ];
}
function exponent(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}
function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}
function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function formatTrim(s2) {
  out: for (var n = s2.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s2[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s2[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
}
var prefixExponent;
function formatPrefixAuto(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d) return prefixExponent = void 0, x2.toPrecision(p);
  var coefficient = d[0], exponent2 = d[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p + i - 1))[0];
}
function formatRounded(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d) return x2 + "";
  var coefficient = d[0], exponent2 = d[1];
  return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
}
const formatTypes = {
  "%": (x2, p) => (x2 * 100).toFixed(p),
  "b": (x2) => Math.round(x2).toString(2),
  "c": (x2) => x2 + "",
  "d": formatDecimal,
  "e": (x2, p) => x2.toExponential(p),
  "f": (x2, p) => x2.toFixed(p),
  "g": (x2, p) => x2.toPrecision(p),
  "o": (x2) => Math.round(x2).toString(8),
  "p": (x2, p) => formatRounded(x2 * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x2) => Math.round(x2).toString(16).toUpperCase(),
  "x": (x2) => Math.round(x2).toString(16)
};
function identity$1(x2) {
  return x2;
}
var map = Array.prototype.map, prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function formatLocale$1(locale2) {
  var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity$1 : formatGroup(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity$1 : formatNumerals(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "−" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
  function newFormat(specifier, options) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n") comma = true, type = "g";
    else if (!formatTypes[type]) precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero2 || fill === "0" && align === "=") zero2 = true, fill = "0", align = "=";
    var prefix2 = (options && options.prefix !== void 0 ? options.prefix : "") + (symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : ""), suffix2 = (symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "") + (options && options.suffix !== void 0 ? options.suffix : "");
    var formatType = formatTypes[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix2, valueSuffix = suffix2, i, n, c2;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim(value);
        if (valueNegative && +value === 0 && sign2 !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type === "s" && !isNaN(value) && prefixExponent !== void 0 ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c2 = value.charCodeAt(i), 48 > c2 || c2 > 57) {
              valueSuffix = (c2 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2) value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3, k2 = Math.pow(10, -e), f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier), { suffix: prefixes[8 + e / 3] });
    return function(value2) {
      return f(k2 * value2);
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}
var locale$1;
var format;
var formatPrefix;
defaultLocale$1({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  format = locale$1.format;
  formatPrefix = locale$1.formatPrefix;
  return locale$1;
}
function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}
function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}
function precisionRound(step, max2) {
  step = Math.abs(step), max2 = Math.abs(max2) - step;
  return Math.max(0, exponent(max2) - exponent(step)) + 1;
}
function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function(count) {
    if (count == null) count = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear() {
  var scale = continuous();
  scale.copy = function() {
    return copy$1(scale, linear());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}
function identity(domain) {
  var unknown;
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : x2;
  }
  scale.invert = scale;
  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = Array.from(_, number$1), scale) : domain.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return identity(domain).unknown(unknown);
  };
  domain = arguments.length ? Array.from(domain, number$1) : [0, 1];
  return linearish(scale);
}
function nice(domain, interval) {
  domain = domain.slice();
  var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t;
  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }
  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}
function transformLog(x2) {
  return Math.log(x2);
}
function transformExp(x2) {
  return Math.exp(x2);
}
function transformLogn(x2) {
  return -Math.log(-x2);
}
function transformExpn(x2) {
  return -Math.exp(-x2);
}
function pow10(x2) {
  return isFinite(x2) ? +("1e" + x2) : x2 < 0 ? 0 : x2;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : (x2) => Math.pow(base, x2);
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), (x2) => Math.log(x2) / base);
}
function reflect(f) {
  return (x2, k2) => -f(-x2, k2);
}
function loggish(transform) {
  const scale = transform(transformLog, transformExp);
  const domain = scale.domain;
  let base = 10;
  let logs;
  let pows;
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }
  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.ticks = (count) => {
    const d = domain();
    let u = d[0];
    let v = d[d.length - 1];
    const r = v < u;
    if (r) [u, v] = [v, u];
    let i = logs(u);
    let j = logs(v);
    let k2;
    let t;
    const n = count == null ? 10 : +count;
    let z = [];
    if (!(base % 1) && j - i < n) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u > 0) for (; i <= j; ++i) {
        for (k2 = 1; k2 < base; ++k2) {
          t = i < 0 ? k2 / pows(-i) : k2 * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      else for (; i <= j; ++i) {
        for (k2 = base - 1; k2 >= 1; --k2) {
          t = i > 0 ? k2 / pows(-i) : k2 * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      if (z.length * 2 < n) z = ticks(u, v, n);
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }
    return r ? z.reverse() : z;
  };
  scale.tickFormat = (count, specifier) => {
    if (count == null) count = 10;
    if (specifier == null) specifier = base === 10 ? "s" : ",";
    if (typeof specifier !== "function") {
      if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null) specifier.trim = true;
      specifier = format(specifier);
    }
    if (count === Infinity) return specifier;
    const k2 = Math.max(1, base * count / scale.ticks().length);
    return (d) => {
      let i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k2 ? specifier(d) : "";
    };
  };
  scale.nice = () => {
    return domain(nice(domain(), {
      floor: (x2) => pows(Math.floor(logs(x2))),
      ceil: (x2) => pows(Math.ceil(logs(x2)))
    }));
  };
  return scale;
}
function log() {
  const scale = loggish(transformer$2()).domain([1, 10]);
  scale.copy = () => copy$1(scale, log()).base(scale.base());
  initRange.apply(scale, arguments);
  return scale;
}
function transformSymlog(c2) {
  return function(x2) {
    return Math.sign(x2) * Math.log1p(Math.abs(x2 / c2));
  };
}
function transformSymexp(c2) {
  return function(x2) {
    return Math.sign(x2) * Math.expm1(Math.abs(x2)) * c2;
  };
}
function symlogish(transform) {
  var c2 = 1, scale = transform(transformSymlog(c2), transformSymexp(c2));
  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c2 = +_), transformSymexp(c2)) : c2;
  };
  return linearish(scale);
}
function symlog() {
  var scale = symlogish(transformer$2());
  scale.copy = function() {
    return copy$1(scale, symlog()).constant(scale.constant());
  };
  return initRange.apply(scale, arguments);
}
function transformPow(exponent2) {
  return function(x2) {
    return x2 < 0 ? -Math.pow(-x2, exponent2) : Math.pow(x2, exponent2);
  };
}
function transformSqrt(x2) {
  return x2 < 0 ? -Math.sqrt(-x2) : Math.sqrt(x2);
}
function transformSquare(x2) {
  return x2 < 0 ? -x2 * x2 : x2 * x2;
}
function powish(transform) {
  var scale = transform(identity$2, identity$2), exponent2 = 1;
  function rescale() {
    return exponent2 === 1 ? transform(identity$2, identity$2) : exponent2 === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent2), transformPow(1 / exponent2));
  }
  scale.exponent = function(_) {
    return arguments.length ? (exponent2 = +_, rescale()) : exponent2;
  };
  return linearish(scale);
}
function pow() {
  var scale = powish(transformer$2());
  scale.copy = function() {
    return copy$1(scale, pow()).exponent(scale.exponent());
  };
  initRange.apply(scale, arguments);
  return scale;
}
function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}
function square(x2) {
  return Math.sign(x2) * x2 * x2;
}
function unsquare(x2) {
  return Math.sign(x2) * Math.sqrt(Math.abs(x2));
}
function radial() {
  var squared = continuous(), range2 = [0, 1], round2 = false, unknown;
  function scale(x2) {
    var y2 = unsquare(squared(x2));
    return isNaN(y2) ? unknown : round2 ? Math.round(y2) : y2;
  }
  scale.invert = function(y2) {
    return squared.invert(square(y2));
  };
  scale.domain = function(_) {
    return arguments.length ? (squared.domain(_), scale) : squared.domain();
  };
  scale.range = function(_) {
    return arguments.length ? (squared.range((range2 = Array.from(_, number$1)).map(square)), scale) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return scale.range(_).round(true);
  };
  scale.round = function(_) {
    return arguments.length ? (round2 = !!_, scale) : round2;
  };
  scale.clamp = function(_) {
    return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return radial(squared.domain(), range2).round(round2).clamp(squared.clamp()).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}
function quantile() {
  var domain = [], range2 = [], thresholds = [], unknown;
  function rescale() {
    var i = 0, n = Math.max(1, range2.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = quantileSorted(domain, i / n);
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : range2[bisectRight(thresholds, x2)];
  }
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending);
    return rescale();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.quantiles = function() {
    return thresholds.slice();
  };
  scale.copy = function() {
    return quantile().domain(domain).range(range2).unknown(unknown);
  };
  return initRange.apply(scale, arguments);
}
function quantize() {
  var x0 = 0, x1 = 1, n = 1, domain = [0.5], range2 = [0, 1], unknown;
  function scale(x2) {
    return x2 != null && x2 <= x2 ? range2[bisectRight(domain, x2, 0, n)] : unknown;
  }
  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }
  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
  };
  scale.range = function(_) {
    return arguments.length ? (n = (range2 = Array.from(_)).length - 1, rescale()) : range2.slice();
  };
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };
  scale.thresholds = function() {
    return domain.slice();
  };
  scale.copy = function() {
    return quantize().domain([x0, x1]).range(range2).unknown(unknown);
  };
  return initRange.apply(linearish(scale), arguments);
}
function threshold() {
  var domain = [0.5], range2 = [0, 1], unknown, n = 1;
  function scale(x2) {
    return x2 != null && x2 <= x2 ? range2[bisectRight(domain, x2, 0, n)] : unknown;
  }
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range2.length - 1), scale) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), n = Math.min(domain.length, range2.length - 1), scale) : range2.slice();
  };
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return [domain[i - 1], domain[i]];
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return threshold().domain(domain).range(range2).unknown(unknown);
  };
  return initRange.apply(scale, arguments);
}
const t0 = /* @__PURE__ */ new Date(), t1 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval.floor = (date2) => {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval.ceil = (date2) => {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = (date2) => {
    const d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = (date2, step) => {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval.range = (start, stop, step) => {
    const range2 = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range2;
    let previous;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range2;
  };
  interval.filter = (test) => {
    return timeInterval((date2) => {
      if (date2 >= date2) while (floori(date2), !test(date2)) date2.setTime(date2 - 1);
    }, (date2, step) => {
      if (date2 >= date2) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date2, -1), !test(date2)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date2, 1), !test(date2)) {
          }
        }
      }
    });
  };
  if (count) {
    interval.count = (start, end) => {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };
    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? (d) => field(d) % step === 0 : (d) => interval.count(0, d) % step === 0);
    };
  }
  return interval;
}
const millisecond = timeInterval(() => {
}, (date2, step) => {
  date2.setTime(+date2 + step);
}, (start, end) => {
  return end - start;
});
millisecond.every = (k2) => {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0)) return null;
  if (!(k2 > 1)) return millisecond;
  return timeInterval((date2) => {
    date2.setTime(Math.floor(date2 / k2) * k2);
  }, (date2, step) => {
    date2.setTime(+date2 + step * k2);
  }, (start, end) => {
    return (end - start) / k2;
  });
};
millisecond.range;
const durationSecond = 1e3;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;
const second = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds());
}, (date2, step) => {
  date2.setTime(+date2 + step * durationSecond);
}, (start, end) => {
  return (end - start) / durationSecond;
}, (date2) => {
  return date2.getUTCSeconds();
});
second.range;
const timeMinute = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date2) => {
  return date2.getMinutes();
});
timeMinute.range;
const utcMinute = timeInterval((date2) => {
  date2.setUTCSeconds(0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date2) => {
  return date2.getUTCMinutes();
});
utcMinute.range;
const timeHour = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date2) => {
  return date2.getHours();
});
timeHour.range;
const utcHour = timeInterval((date2) => {
  date2.setUTCMinutes(0, 0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date2) => {
  return date2.getUTCHours();
});
utcHour.range;
const timeDay = timeInterval(
  (date2) => date2.setHours(0, 0, 0, 0),
  (date2, step) => date2.setDate(date2.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  (date2) => date2.getDate() - 1
);
timeDay.range;
const utcDay = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date2) => {
  return date2.getUTCDate() - 1;
});
utcDay.range;
const unixDay = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date2) => {
  return Math.floor(date2 / durationDay);
});
unixDay.range;
function timeWeekday(i) {
  return timeInterval((date2) => {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i) % 7);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setDate(date2.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
const timeSunday = timeWeekday(0);
const timeMonday = timeWeekday(1);
const timeTuesday = timeWeekday(2);
const timeWednesday = timeWeekday(3);
const timeThursday = timeWeekday(4);
const timeFriday = timeWeekday(5);
const timeSaturday = timeWeekday(6);
timeSunday.range;
timeMonday.range;
timeTuesday.range;
timeWednesday.range;
timeThursday.range;
timeFriday.range;
timeSaturday.range;
function utcWeekday(i) {
  return timeInterval((date2) => {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}
const utcSunday = utcWeekday(0);
const utcMonday = utcWeekday(1);
const utcTuesday = utcWeekday(2);
const utcWednesday = utcWeekday(3);
const utcThursday = utcWeekday(4);
const utcFriday = utcWeekday(5);
const utcSaturday = utcWeekday(6);
utcSunday.range;
utcMonday.range;
utcTuesday.range;
utcWednesday.range;
utcThursday.range;
utcFriday.range;
utcSaturday.range;
const timeMonth = timeInterval((date2) => {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setMonth(date2.getMonth() + step);
}, (start, end) => {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date2) => {
  return date2.getMonth();
});
timeMonth.range;
const utcMonth = timeInterval((date2) => {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, (start, end) => {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date2) => {
  return date2.getUTCMonth();
});
utcMonth.range;
const timeYear = timeInterval((date2) => {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setFullYear(date2.getFullYear() + step);
}, (start, end) => {
  return end.getFullYear() - start.getFullYear();
}, (date2) => {
  return date2.getFullYear();
});
timeYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setFullYear(Math.floor(date2.getFullYear() / k2) * k2);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setFullYear(date2.getFullYear() + step * k2);
  });
};
timeYear.range;
const utcYear = timeInterval((date2) => {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, (start, end) => {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, (date2) => {
  return date2.getUTCFullYear();
});
utcYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k2) * k2);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k2);
  });
};
utcYear.range;
function ticker(year, month, week, day, hour, minute) {
  const tickIntervals = [
    [second, 1, durationSecond],
    [second, 5, 5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute, 1, durationMinute],
    [minute, 5, 5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [hour, 1, durationHour],
    [hour, 3, 3 * durationHour],
    [hour, 6, 6 * durationHour],
    [hour, 12, 12 * durationHour],
    [day, 1, durationDay],
    [day, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month, 1, durationMonth],
    [month, 3, 3 * durationMonth],
    [year, 1, durationYear]
  ];
  function ticks2(start, stop, count) {
    const reverse = stop < start;
    if (reverse) [start, stop] = [stop, start];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
    const ticks3 = interval ? interval.range(start, +stop + 1) : [];
    return reverse ? ticks3.reverse() : ticks3;
  }
  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count;
    const i = bisector(([, , step2]) => step2).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
    if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }
  return [ticks2, tickInterval];
}
const [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
const [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date2.setFullYear(d.y);
    return date2;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date2.setUTCFullYear(d.y);
    return date2;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y2, m, d) {
  return { y: y2, m, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale2) {
  var locale_dateTime = locale2.dateTime, locale_date = locale2.date, locale_time = locale2.time, locale_periods = locale2.periods, locale_weekdays = locale2.days, locale_shortWeekdays = locale2.shortDays, locale_months = locale2.months, locale_shortMonths = locale2.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date2) {
      var string2 = [], i = -1, j = 0, n = specifier.length, c2, pad2, format2;
      if (!(date2 instanceof Date)) date2 = /* @__PURE__ */ new Date(+date2);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string2.push(specifier.slice(j, i));
          if ((pad2 = pads[c2 = specifier.charAt(++i)]) != null) c2 = specifier.charAt(++i);
          else pad2 = c2 === "e" ? " " : "0";
          if (format2 = formats2[c2]) c2 = format2(date2, pad2);
          string2.push(c2);
          j = i + 1;
        }
      }
      string2.push(specifier.slice(j, i));
      return string2.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string2) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string2 += "", 0), week, day;
      if (i != string2.length) return null;
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d)) d.Z = 0;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0) d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string2, j) {
    var i = 0, n = specifier.length, m = string2.length, c2, parse;
    while (i < n) {
      if (j >= m) return -1;
      c2 = specifier.charCodeAt(i++);
      if (c2 === 37) {
        c2 = specifier.charAt(i++);
        parse = parses[c2 in pads ? specifier.charAt(i++) : c2];
        if (!parse || (j = parse(d, string2, j)) < 0) return -1;
      } else if (c2 != string2.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string2, i) {
    var n = periodRe.exec(string2.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string2, i) {
    var n = shortWeekdayRe.exec(string2.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string2, i) {
    var n = weekdayRe.exec(string2.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string2, i) {
    var n = shortMonthRe.exec(string2.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string2, i) {
    var n = monthRe.exec(string2.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string2, i) {
    return parseSpecifier(d, locale_dateTime, string2, i);
  }
  function parseLocaleDate(d, string2, i) {
    return parseSpecifier(d, locale_date, string2, i);
  }
  function parseLocaleTime(d, string2, i) {
    return parseSpecifier(d, locale_time, string2, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" }, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign2 = value < 0 ? "-" : "", string2 = (sign2 ? -value : value) + "", length = string2.length;
  return sign2 + (length < width ? new Array(width - length + 1).join(fill) + string2 : string2);
}
function requote(s2) {
  return s2.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string2, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string2.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string2, i) {
  var n = numberRe.exec(string2.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string2, i) {
  var n = percentRe.exec(string2.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string2, i) {
  var n = numberRe.exec(string2.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string2, i) {
  var n = numberRe.exec(string2.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}
var locale;
var timeFormat;
var utcFormat;
defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale(definition) {
  locale = formatLocale(definition);
  timeFormat = locale.format;
  locale.parse;
  utcFormat = locale.utcFormat;
  locale.utcParse;
  return locale;
}
function date(t) {
  return new Date(t);
}
function number(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function calendar(ticks2, tickInterval, year, month, week, day, hour, minute, second2, format2) {
  var scale = continuous(), invert = scale.invert, domain = scale.domain;
  var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear2 = format2("%Y");
  function tickFormat2(date2) {
    return (second2(date2) < date2 ? formatMillisecond : minute(date2) < date2 ? formatSecond : hour(date2) < date2 ? formatMinute : day(date2) < date2 ? formatHour : month(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year(date2) < date2 ? formatMonth : formatYear2)(date2);
  }
  scale.invert = function(y2) {
    return new Date(invert(y2));
  };
  scale.domain = function(_) {
    return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
  };
  scale.ticks = function(interval) {
    var d = domain();
    return ticks2(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };
  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat2 : format2(specifier);
  };
  scale.nice = function(interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice(d, interval)) : scale;
  };
  scale.copy = function() {
    return copy$1(scale, calendar(ticks2, tickInterval, year, month, week, day, hour, minute, second2, format2));
  };
  return scale;
}
function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function transformer$1() {
  var x0 = 0, x1 = 1, t02, t12, k10, transform, interpolator = identity$2, clamp = false, unknown;
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : interpolator(k10 === 0 ? 0.5 : (x2 = (transform(x2) - t02) * k10, clamp ? Math.max(0, Math.min(1, x2)) : x2));
  }
  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, t02 = transform(x0 = +x0), t12 = transform(x1 = +x1), k10 = t02 === t12 ? 0 : 1 / (t12 - t02), scale) : [x0, x1];
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  function range2(interpolate2) {
    return function(_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate2(r0, r1), scale) : [interpolator(0), interpolator(1)];
    };
  }
  scale.range = range2(interpolate);
  scale.rangeRound = range2(interpolateRound);
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t) {
    transform = t, t02 = t(x0), t12 = t(x1), k10 = t02 === t12 ? 0 : 1 / (t12 - t02);
    return scale;
  };
}
function copy(source, target) {
  return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}
function sequential() {
  var scale = linearish(transformer$1()(identity$2));
  scale.copy = function() {
    return copy(scale, sequential());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialLog() {
  var scale = loggish(transformer$1()).domain([1, 10]);
  scale.copy = function() {
    return copy(scale, sequentialLog()).base(scale.base());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialSymlog() {
  var scale = symlogish(transformer$1());
  scale.copy = function() {
    return copy(scale, sequentialSymlog()).constant(scale.constant());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialPow() {
  var scale = powish(transformer$1());
  scale.copy = function() {
    return copy(scale, sequentialPow()).exponent(scale.exponent());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}
function sequentialQuantile() {
  var domain = [], interpolator = identity$2;
  function scale(x2) {
    if (x2 != null && !isNaN(x2 = +x2)) return interpolator((bisectRight(domain, x2, 1) - 1) / (domain.length - 1));
  }
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending);
    return scale;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  scale.range = function() {
    return domain.map((d, i) => interpolator(i / (domain.length - 1)));
  };
  scale.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (_, i) => quantile$1(domain, i / n));
  };
  scale.copy = function() {
    return sequentialQuantile(interpolator).domain(domain);
  };
  return initInterpolator.apply(scale, arguments);
}
function transformer() {
  var x0 = 0, x1 = 0.5, x2 = 1, s2 = 1, t02, t12, t2, k10, k21, interpolator = identity$2, transform, clamp = false, unknown;
  function scale(x3) {
    return isNaN(x3 = +x3) ? unknown : (x3 = 0.5 + ((x3 = +transform(x3)) - t12) * (s2 * x3 < s2 * t12 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x3)) : x3));
  }
  scale.domain = function(_) {
    return arguments.length ? ([x0, x1, x2] = _, t02 = transform(x0 = +x0), t12 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t02 === t12 ? 0 : 0.5 / (t12 - t02), k21 = t12 === t2 ? 0 : 0.5 / (t2 - t12), s2 = t12 < t02 ? -1 : 1, scale) : [x0, x1, x2];
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  function range2(interpolate2) {
    return function(_) {
      var r0, r1, r2;
      return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate2, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
    };
  }
  scale.range = range2(interpolate);
  scale.rangeRound = range2(interpolateRound);
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t) {
    transform = t, t02 = t(x0), t12 = t(x1), t2 = t(x2), k10 = t02 === t12 ? 0 : 0.5 / (t12 - t02), k21 = t12 === t2 ? 0 : 0.5 / (t2 - t12), s2 = t12 < t02 ? -1 : 1;
    return scale;
  };
}
function diverging() {
  var scale = linearish(transformer()(identity$2));
  scale.copy = function() {
    return copy(scale, diverging());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingLog() {
  var scale = loggish(transformer()).domain([0.1, 1, 10]);
  scale.copy = function() {
    return copy(scale, divergingLog()).base(scale.base());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingSymlog() {
  var scale = symlogish(transformer());
  scale.copy = function() {
    return copy(scale, divergingSymlog()).constant(scale.constant());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingPow() {
  var scale = powish(transformer());
  scale.copy = function() {
    return copy(scale, divergingPow()).exponent(scale.exponent());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}
const d3Scales = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: band,
  scaleDiverging: diverging,
  scaleDivergingLog: divergingLog,
  scaleDivergingPow: divergingPow,
  scaleDivergingSqrt: divergingSqrt,
  scaleDivergingSymlog: divergingSymlog,
  scaleIdentity: identity,
  scaleImplicit: implicit,
  scaleLinear: linear,
  scaleLog: log,
  scaleOrdinal: ordinal,
  scalePoint: point,
  scalePow: pow,
  scaleQuantile: quantile,
  scaleQuantize: quantize,
  scaleRadial: radial,
  scaleSequential: sequential,
  scaleSequentialLog: sequentialLog,
  scaleSequentialPow: sequentialPow,
  scaleSequentialQuantile: sequentialQuantile,
  scaleSequentialSqrt: sequentialSqrt,
  scaleSequentialSymlog: sequentialSymlog,
  scaleSqrt: sqrt,
  scaleSymlog: symlog,
  scaleThreshold: threshold,
  scaleTime: time,
  scaleUtc: utcTime,
  tickFormat
}, Symbol.toStringTag, { value: "Module" }));
function getD3ScaleFromType(realScaleType) {
  var scales = d3Scales;
  if (realScaleType in scales && typeof scales[realScaleType] === "function") {
    return scales[realScaleType]();
  }
  var name = "scale".concat(upperFirst(realScaleType));
  if (name in scales && typeof scales[name] === "function") {
    return scales[name]();
  }
  return void 0;
}
function combineConfiguredScaleInternal(scale, axisDomain, axisRange) {
  if (typeof scale === "function") {
    return scale.copy().domain(axisDomain).range(axisRange);
  }
  if (scale == null) {
    return void 0;
  }
  var d3ScaleFunction = getD3ScaleFromType(scale);
  if (d3ScaleFunction == null) {
    return void 0;
  }
  d3ScaleFunction.domain(axisDomain).range(axisRange);
  return d3ScaleFunction;
}
function combineConfiguredScale(axis, realScaleType, axisDomain, axisRange) {
  if (axisDomain == null || axisRange == null) {
    return void 0;
  }
  if (typeof axis.scale === "function") {
    return combineConfiguredScaleInternal(axis.scale, axisDomain, axisRange);
  }
  return combineConfiguredScaleInternal(realScaleType, axisDomain, axisRange);
}
function getD3ScaleName(name) {
  return "scale".concat(upperFirst(name));
}
function isSupportedScaleName(name) {
  return getD3ScaleName(name) in d3Scales;
}
var combineRealScaleType = (axisConfig, hasBar, chartType) => {
  if (axisConfig == null) {
    return void 0;
  }
  var scale = axisConfig.scale, type = axisConfig.type;
  if (scale === "auto") {
    if (type === "category" && chartType && (chartType.indexOf("LineChart") >= 0 || chartType.indexOf("AreaChart") >= 0 || chartType.indexOf("ComposedChart") >= 0 && !hasBar)) {
      return "point";
    }
    if (type === "category") {
      return "band";
    }
    return "linear";
  }
  if (typeof scale === "string") {
    return isSupportedScaleName(scale) ? scale : "point";
  }
  return void 0;
};
function bisect(haystack, needle) {
  var lo = 0;
  var hi = haystack.length;
  var ascending2 = haystack[0] < haystack[haystack.length - 1];
  while (lo < hi) {
    var mid = Math.floor((lo + hi) / 2);
    if (ascending2 ? haystack[mid] < needle : haystack[mid] > needle) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}
function createCategoricalInverse(scale, allDataPointsOnAxis) {
  if (!scale) {
    return void 0;
  }
  var domain = allDataPointsOnAxis !== null && allDataPointsOnAxis !== void 0 ? allDataPointsOnAxis : scale.domain();
  var pixelPositions = domain.map((d) => {
    var _scale;
    return (_scale = scale(d)) !== null && _scale !== void 0 ? _scale : 0;
  });
  var range2 = scale.range();
  if (domain.length === 0 || range2.length < 2) {
    return void 0;
  }
  return (pixelValue) => {
    var _pixelPositions, _pixelPositions$index;
    var index = bisect(pixelPositions, pixelValue);
    if (index <= 0) {
      return domain[0];
    }
    if (index >= domain.length) {
      return domain[domain.length - 1];
    }
    var leftPixel = (_pixelPositions = pixelPositions[index - 1]) !== null && _pixelPositions !== void 0 ? _pixelPositions : 0;
    var rightPixel = (_pixelPositions$index = pixelPositions[index]) !== null && _pixelPositions$index !== void 0 ? _pixelPositions$index : 0;
    if (Math.abs(pixelValue - leftPixel) <= Math.abs(pixelValue - rightPixel)) {
      return domain[index - 1];
    }
    return domain[index];
  };
}
function combineInverseScaleFunction(configuredScale) {
  if (configuredScale == null) {
    return void 0;
  }
  if ("invert" in configuredScale && typeof configuredScale.invert === "function") {
    return configuredScale.invert.bind(configuredScale);
  }
  return createCategoricalInverse(configuredScale, void 0);
}
function ownKeys$t(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$t(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$t(Object(t), true).forEach(function(r2) {
      _defineProperty$v(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$t(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$v(e, r, t) {
  return (r = _toPropertyKey$v(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$v(t) {
  var i = _toPrimitive$v(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$v(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$c(r, e) {
  return _arrayWithHoles$c(r) || _iterableToArrayLimit$c(r, e) || _unsupportedIterableToArray$c(r, e) || _nonIterableRest$c();
}
function _nonIterableRest$c() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$c(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$c(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$c(r, a2) : void 0;
  }
}
function _arrayLikeToArray$c(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$c(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$c(r) {
  if (Array.isArray(r)) return r;
}
var defaultNumericDomain = [0, "auto"];
var implicitXAxis = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  angle: 0,
  dataKey: void 0,
  domain: void 0,
  height: 30,
  hide: true,
  id: 0,
  includeHidden: false,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: false,
  name: void 0,
  orientation: "bottom",
  padding: {
    left: 0,
    right: 0
  },
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "category",
  unit: void 0,
  niceTicks: "auto"
};
var selectXAxisSettingsNoDefaults = (state, axisId) => {
  return state.cartesianAxis.xAxis[axisId];
};
var selectXAxisSettings = (state, axisId) => {
  var axis = selectXAxisSettingsNoDefaults(state, axisId);
  if (axis == null) {
    return implicitXAxis;
  }
  return axis;
};
var implicitYAxis = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  angle: 0,
  dataKey: void 0,
  domain: defaultNumericDomain,
  hide: true,
  id: 0,
  includeHidden: false,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: false,
  name: void 0,
  orientation: "left",
  padding: {
    top: 0,
    bottom: 0
  },
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0,
  niceTicks: "auto",
  width: DEFAULT_Y_AXIS_WIDTH
};
var selectYAxisSettingsNoDefaults = (state, axisId) => {
  return state.cartesianAxis.yAxis[axisId];
};
var selectYAxisSettings = (state, axisId) => {
  var axis = selectYAxisSettingsNoDefaults(state, axisId);
  if (axis == null) {
    return implicitYAxis;
  }
  return axis;
};
var implicitZAxis = {
  domain: [0, "auto"],
  includeHidden: false,
  reversed: false,
  allowDataOverflow: false,
  allowDuplicatedCategory: false,
  dataKey: void 0,
  id: 0,
  name: "",
  range: [64, 64],
  scale: "auto",
  type: "number",
  unit: ""
};
var selectZAxisSettings = (state, axisId) => {
  var axis = state.cartesianAxis.zAxis[axisId];
  if (axis == null) {
    return implicitZAxis;
  }
  return axis;
};
var selectBaseAxis = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    case "zAxis": {
      return selectZAxisSettings(state, axisId);
    }
    case "angleAxis": {
      return selectAngleAxis(state, axisId);
    }
    case "radiusAxis": {
      return selectRadiusAxis(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectCartesianAxisSettings = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectRenderableAxisSettings = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    case "angleAxis": {
      return selectAngleAxis(state, axisId);
    }
    case "radiusAxis": {
      return selectRadiusAxis(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectHasBar = (state) => state.graphicalItems.cartesianItems.some((item) => item.type === "bar") || state.graphicalItems.polarItems.some((item) => item.type === "radialBar");
function itemAxisPredicate(axisType, axisId) {
  return (item) => {
    switch (axisType) {
      case "xAxis":
        return "xAxisId" in item && item.xAxisId === axisId;
      case "yAxis":
        return "yAxisId" in item && item.yAxisId === axisId;
      case "zAxis":
        return "zAxisId" in item && item.zAxisId === axisId;
      case "angleAxis":
        return "angleAxisId" in item && item.angleAxisId === axisId;
      case "radiusAxis":
        return "radiusAxisId" in item && item.radiusAxisId === axisId;
      default:
        return false;
    }
  };
}
var selectUnfilteredCartesianItems = (state) => state.graphicalItems.cartesianItems;
var selectAxisPredicate$1 = createSelector([pickAxisType, pickAxisId], itemAxisPredicate);
var combineGraphicalItemsSettings = (graphicalItems, axisSettings, axisPredicate) => graphicalItems.filter(axisPredicate).filter((item) => {
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.includeHidden) === true) {
    return true;
  }
  return !item.hide;
});
var selectCartesianItemsSettings = createSelector([selectUnfilteredCartesianItems, selectBaseAxis, selectAxisPredicate$1], combineGraphicalItemsSettings, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var selectStackedCartesianItemsSettings = createSelector([selectCartesianItemsSettings], (cartesianItems) => {
  return cartesianItems.filter((item) => item.type === "area" || item.type === "bar").filter(isStacked);
});
var filterGraphicalNotStackedItems = (cartesianItems) => cartesianItems.filter((item) => !("stackId" in item) || item.stackId === void 0);
var selectCartesianItemsSettingsExceptStacked = createSelector([selectCartesianItemsSettings], filterGraphicalNotStackedItems);
var combineGraphicalItemsData = (cartesianItems) => cartesianItems.map((item) => item.data).filter(Boolean).flat(1);
var selectAnyCartesianItemsUsesChartData = createSelector([selectCartesianItemsSettings], (items) => items.some((item) => !item.data));
var selectCartesianGraphicalItemsData = createSelector([selectCartesianItemsSettings], combineGraphicalItemsData, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var combineDisplayedData = (graphicalItemsData, _ref2) => {
  var _ref$chartData = _ref2.chartData, chartData = _ref$chartData === void 0 ? [] : _ref$chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  if (graphicalItemsData.length > 0) {
    return graphicalItemsData;
  }
  return chartData.slice(dataStartIndex, dataEndIndex + 1);
};
var selectDisplayedData$1 = createSelector([selectCartesianGraphicalItemsData, selectChartDataWithIndexesIfNotInPanoramaPosition4], combineDisplayedData);
var combineAppliedValues = (data, axisSettings, items) => {
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) {
    return data.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey)
    }));
  }
  if (items.length > 0) {
    return items.map((item) => item.dataKey).flatMap((dataKey) => data.map((entry) => ({
      value: getValueByDataKey(entry, dataKey)
    })));
  }
  return data.map((entry) => ({
    value: entry
  }));
};
var combineAllAppliedValues = (displayedData, axisSettings, items, _ref2, anyItemUsesChartData, graphicalItemsData) => {
  var _ref2$chartData = _ref2.chartData, chartData = _ref2$chartData === void 0 ? [] : _ref2$chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  var appliedValues = combineAppliedValues(displayedData, axisSettings, items);
  if (anyItemUsesChartData && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null && graphicalItemsData.length > 0) {
    var chartDataSlice2 = chartData.slice(dataStartIndex, dataEndIndex + 1);
    var chartAppliedValues = chartDataSlice2.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey)
    })).filter((av) => av.value != null);
    return [...chartAppliedValues, ...appliedValues];
  }
  return appliedValues;
};
var selectAllAppliedValues = createSelector([selectDisplayedData$1, selectBaseAxis, selectCartesianItemsSettings, selectChartDataWithIndexesIfNotInPanoramaPosition4, selectAnyCartesianItemsUsesChartData, selectCartesianGraphicalItemsData], combineAllAppliedValues);
function makeNumber(val) {
  if (isNumOrStr(val) || val instanceof Date) {
    var n = Number(val);
    if (isWellBehavedNumber(n)) {
      return n;
    }
  }
  return void 0;
}
function makeDomain(val) {
  if (Array.isArray(val)) {
    var attempt = [makeNumber(val[0]), makeNumber(val[1])];
    if (isWellFormedNumberDomain(attempt)) {
      return attempt;
    }
    return void 0;
  }
  var n = makeNumber(val);
  if (n == null) {
    return void 0;
  }
  return [n, n];
}
function onlyAllowNumbers(data) {
  return data.map(makeNumber).filter(isNotNil);
}
function sortBy(a2, b) {
  var aNum = makeNumber(a2);
  var bNum = makeNumber(b);
  if (aNum == null && bNum == null) {
    return 0;
  }
  if (aNum == null) {
    return -1;
  }
  if (bNum == null) {
    return 1;
  }
  return aNum - bNum;
}
var selectSortedDataPoints = createSelector([selectAllAppliedValues], (appliedData) => {
  return appliedData === null || appliedData === void 0 ? void 0 : appliedData.map((item) => item.value).sort(sortBy);
});
function isErrorBarRelevantForAxisType(axisType, errorBar) {
  switch (axisType) {
    case "xAxis":
      return errorBar.direction === "x";
    case "yAxis":
      return errorBar.direction === "y";
    default:
      return false;
  }
}
function getErrorDomainByDataKey(entry, appliedValue, relevantErrorBars) {
  if (!relevantErrorBars) {
    return [];
  }
  if (!relevantErrorBars.length) {
    return [];
  }
  var appliedNumericValue;
  if (typeof appliedValue === "number" && !isNan(appliedValue)) {
    appliedNumericValue = appliedValue;
  } else if (Array.isArray(appliedValue)) {
    var numericRangeValues = onlyAllowNumbers(appliedValue);
    if (numericRangeValues.length > 0) {
      appliedNumericValue = Math.max(...numericRangeValues);
    }
  }
  if (appliedNumericValue == null) {
    return [];
  }
  return onlyAllowNumbers(relevantErrorBars.flatMap((eb) => {
    var errorValue = getValueByDataKey(entry, eb.dataKey);
    var lowBound, highBound;
    if (Array.isArray(errorValue)) {
      var _errorValue = _slicedToArray$c(errorValue, 2);
      lowBound = _errorValue[0];
      highBound = _errorValue[1];
    } else {
      lowBound = highBound = errorValue;
    }
    if (!isWellBehavedNumber(lowBound) || !isWellBehavedNumber(highBound)) {
      return void 0;
    }
    return [appliedNumericValue - lowBound, appliedNumericValue + highBound];
  }));
}
var selectTooltipAxis = (state) => {
  var axisType = selectTooltipAxisType(state);
  var axisId = selectTooltipAxisId(state);
  return selectRenderableAxisSettings(state, axisType, axisId);
};
var selectTooltipAxisDataKey = createSelector([selectTooltipAxis], (axis) => axis === null || axis === void 0 ? void 0 : axis.dataKey);
var selectDisplayedStackedData = createSelector([selectStackedCartesianItemsSettings, selectChartDataWithIndexesIfNotInPanoramaPosition4, selectTooltipAxis], combineDisplayedStackedData);
var combineStackGroups = (displayedData, items, stackOffsetType, reverseStackOrder) => {
  var initialItemsGroups = {};
  var itemsGroup = items.reduce((acc, item) => {
    if (item.stackId == null) {
      return acc;
    }
    var stack = acc[item.stackId];
    if (stack == null) {
      stack = [];
    }
    stack.push(item);
    acc[item.stackId] = stack;
    return acc;
  }, initialItemsGroups);
  return Object.fromEntries(Object.entries(itemsGroup).map((_ref3) => {
    var _ref4 = _slicedToArray$c(_ref3, 2), stackId = _ref4[0], graphicalItems = _ref4[1];
    var orderedGraphicalItems = reverseStackOrder ? [...graphicalItems].reverse() : graphicalItems;
    var dataKeys = orderedGraphicalItems.map(getStackSeriesIdentifier);
    return [stackId, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: getStackedData(displayedData, dataKeys, stackOffsetType),
      graphicalItems: orderedGraphicalItems
    }];
  }));
};
var selectStackGroups = createSelector([selectDisplayedStackedData, selectStackedCartesianItemsSettings, selectStackOffsetType, selectReverseStackOrder], combineStackGroups);
var combineDomainOfStackGroups = (stackGroups, _ref5, axisType, domainFromUserPreference) => {
  var dataStartIndex = _ref5.dataStartIndex, dataEndIndex = _ref5.dataEndIndex;
  if (domainFromUserPreference != null) {
    return void 0;
  }
  if (axisType === "zAxis") {
    return void 0;
  }
  return getDomainOfStackGroups(stackGroups, dataStartIndex, dataEndIndex);
};
var selectAllowsDataOverflow = createSelector([selectBaseAxis], (axisSettings) => axisSettings.allowDataOverflow);
var getDomainDefinition = (axisSettings) => {
  var _axisSettings$domain;
  if (axisSettings == null || !("domain" in axisSettings)) {
    return defaultNumericDomain;
  }
  if (axisSettings.domain != null) {
    return axisSettings.domain;
  }
  if ("ticks" in axisSettings && axisSettings.ticks != null) {
    if (axisSettings.type === "number") {
      var allValues = onlyAllowNumbers(axisSettings.ticks);
      return [Math.min(...allValues), Math.max(...allValues)];
    }
    if (axisSettings.type === "category") {
      return axisSettings.ticks.map(String);
    }
  }
  return (_axisSettings$domain = axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.domain) !== null && _axisSettings$domain !== void 0 ? _axisSettings$domain : defaultNumericDomain;
};
var selectDomainDefinition = createSelector([selectBaseAxis], getDomainDefinition);
var selectDomainFromUserPreference = createSelector([selectDomainDefinition, selectAllowsDataOverflow], numericalDomainSpecifiedWithoutRequiringData);
var selectDomainOfStackGroups = createSelector([selectStackGroups, selectChartDataWithIndexes, pickAxisType, selectDomainFromUserPreference], combineDomainOfStackGroups, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var selectAllErrorBarSettings = (state) => state.errorBars;
var combineRelevantErrorBarSettings = (cartesianItemsSettings, allErrorBarSettings, axisType) => {
  return cartesianItemsSettings.flatMap((item) => {
    return allErrorBarSettings[item.id];
  }).filter(Boolean).filter((e) => {
    return isErrorBarRelevantForAxisType(axisType, e);
  });
};
var mergeDomains = function mergeDomains2() {
  for (var _len = arguments.length, domains = new Array(_len), _key = 0; _key < _len; _key++) {
    domains[_key] = arguments[_key];
  }
  var allDomains = domains.filter(Boolean);
  if (allDomains.length === 0) {
    return void 0;
  }
  var allValues = allDomains.flat();
  var min2 = Math.min(...allValues);
  var max2 = Math.max(...allValues);
  return [min2, max2];
};
var combineDomainOfAllAppliedNumericalValuesIncludingErrorValues = function combineDomainOfAllAppliedNumericalValuesIncludingErrorValues2(displayedData, axisSettings, items, errorBars, axisType) {
  var chartDataSlice2 = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
  var lowerEnd, upperEnd;
  if (items.length > 0) {
    items.forEach((item) => {
      var _errorBars$item$id;
      var itemData = item.data != null ? [...item.data] : chartDataSlice2;
      var relevantErrorBars = (_errorBars$item$id = errorBars[item.id]) === null || _errorBars$item$id === void 0 ? void 0 : _errorBars$item$id.filter((errorBar) => isErrorBarRelevantForAxisType(axisType, errorBar));
      itemData.forEach((entry) => {
        var _axisSettings$dataKey;
        var valueByDataKey = getValueByDataKey(entry, (_axisSettings$dataKey = axisSettings.dataKey) !== null && _axisSettings$dataKey !== void 0 ? _axisSettings$dataKey : item.dataKey);
        var errorDomain = getErrorDomainByDataKey(entry, valueByDataKey, relevantErrorBars);
        if (errorDomain.length >= 2) {
          var localLower = Math.min(...errorDomain);
          var localUpper = Math.max(...errorDomain);
          if (lowerEnd == null || localLower < lowerEnd) {
            lowerEnd = localLower;
          }
          if (upperEnd == null || localUpper > upperEnd) {
            upperEnd = localUpper;
          }
        }
        var dataValueDomain = makeDomain(valueByDataKey);
        if (dataValueDomain != null) {
          lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
          upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
        }
      });
    });
  }
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null && items.length === 0) {
    displayedData.forEach((item) => {
      var dataValueDomain = makeDomain(getValueByDataKey(item, axisSettings.dataKey));
      if (dataValueDomain != null) {
        lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
        upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
      }
    });
  }
  if (isWellBehavedNumber(lowerEnd) && isWellBehavedNumber(upperEnd)) {
    return [lowerEnd, upperEnd];
  }
  return void 0;
};
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1 = createSelector([selectDisplayedData$1, selectBaseAxis, selectCartesianItemsSettingsExceptStacked, selectAllErrorBarSettings, pickAxisType, selectChartDataSliceIfNotInPanorama], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
function onlyAllowNumbersAndStringsAndDates(item) {
  var value = item.value;
  if (isNumOrStr(value) || value instanceof Date) {
    return value;
  }
  return void 0;
}
var computeDomainOfTypeCategory = (allDataSquished, axisSettings, isCategorical) => {
  var categoricalDomain = allDataSquished.map(onlyAllowNumbersAndStringsAndDates).filter((v) => v != null);
  if (isCategorical && (axisSettings.dataKey == null || axisSettings.allowDuplicatedCategory && hasDuplicate(categoricalDomain))) {
    return range$1(0, allDataSquished.length);
  }
  if (axisSettings.allowDuplicatedCategory) {
    return categoricalDomain;
  }
  return Array.from(new Set(categoricalDomain));
};
var selectReferenceDots = (state) => state.referenceElements.dots;
var filterReferenceElements = (elements, axisType, axisId) => {
  return elements.filter((el) => el.ifOverflow === "extendDomain").filter((el) => {
    if (axisType === "xAxis") {
      return el.xAxisId === axisId;
    }
    return el.yAxisId === axisId;
  });
};
var selectReferenceDotsByAxis = createSelector([selectReferenceDots, pickAxisType, pickAxisId], filterReferenceElements);
var selectReferenceAreas = (state) => state.referenceElements.areas;
var selectReferenceAreasByAxis = createSelector([selectReferenceAreas, pickAxisType, pickAxisId], filterReferenceElements);
var selectReferenceLines = (state) => state.referenceElements.lines;
var selectReferenceLinesByAxis = createSelector([selectReferenceLines, pickAxisType, pickAxisId], filterReferenceElements);
var combineDotsDomain = (dots, axisType) => {
  if (dots == null) {
    return void 0;
  }
  var allCoords = onlyAllowNumbers(dots.map((dot) => axisType === "xAxis" ? dot.x : dot.y));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceDotsDomain = createSelector(selectReferenceDotsByAxis, pickAxisType, combineDotsDomain);
var combineAreasDomain = (areas, axisType) => {
  if (areas == null) {
    return void 0;
  }
  var allCoords = onlyAllowNumbers(areas.flatMap((area) => [axisType === "xAxis" ? area.x1 : area.y1, axisType === "xAxis" ? area.x2 : area.y2]));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceAreasDomain = createSelector([selectReferenceAreasByAxis, pickAxisType], combineAreasDomain);
function extractXCoordinates(line) {
  var _line$segment;
  if (line.x != null) {
    return onlyAllowNumbers([line.x]);
  }
  var segmentCoordinates = (_line$segment = line.segment) === null || _line$segment === void 0 ? void 0 : _line$segment.map((s2) => s2.x);
  if (segmentCoordinates == null || segmentCoordinates.length === 0) {
    return [];
  }
  return onlyAllowNumbers(segmentCoordinates);
}
function extractYCoordinates(line) {
  var _line$segment2;
  if (line.y != null) {
    return onlyAllowNumbers([line.y]);
  }
  var segmentCoordinates = (_line$segment2 = line.segment) === null || _line$segment2 === void 0 ? void 0 : _line$segment2.map((s2) => s2.y);
  if (segmentCoordinates == null || segmentCoordinates.length === 0) {
    return [];
  }
  return onlyAllowNumbers(segmentCoordinates);
}
var combineLinesDomain = (lines, axisType) => {
  if (lines == null) {
    return void 0;
  }
  var allCoords = lines.flatMap((line) => axisType === "xAxis" ? extractXCoordinates(line) : extractYCoordinates(line));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceLinesDomain = createSelector([selectReferenceLinesByAxis, pickAxisType], combineLinesDomain);
var selectReferenceElementsDomain = createSelector(selectReferenceDotsDomain, selectReferenceLinesDomain, selectReferenceAreasDomain, (dotsDomain, linesDomain, areasDomain) => {
  return mergeDomains(dotsDomain, areasDomain, linesDomain);
});
var combineNumericalDomain = (axisSettings, domainDefinition, domainFromUserPreference, domainOfStackGroups, dataAndErrorBarsDomain, referenceElementsDomain, layout, axisType, numericTicksDomain) => {
  if (domainFromUserPreference != null) {
    return domainFromUserPreference;
  }
  var shouldIncludeDomainOfStackGroups = layout === "vertical" && axisType === "xAxis" || layout === "horizontal" && axisType === "yAxis";
  var mergedDomains = shouldIncludeDomainOfStackGroups ? mergeDomains(domainOfStackGroups, referenceElementsDomain, dataAndErrorBarsDomain) : mergeDomains(referenceElementsDomain, dataAndErrorBarsDomain);
  var parsedDomain = parseNumericalUserDomain(domainDefinition, mergedDomains, axisSettings.allowDataOverflow);
  if (parsedDomain != null) {
    return parsedDomain;
  }
  if (axisSettings.allowDataOverflow && mergedDomains == null && numericTicksDomain != null) {
    return numericTicksDomain;
  }
  return parsedDomain;
};
var combineNumericTicksDomain = (axisSettings) => {
  if (axisSettings == null || axisSettings.type !== "number" || !("ticks" in axisSettings) || axisSettings.ticks == null) {
    return void 0;
  }
  var numericTicks = onlyAllowNumbers(axisSettings.ticks);
  if (numericTicks.length === 0) {
    return void 0;
  }
  return [Math.min(...numericTicks), Math.max(...numericTicks)];
};
var selectNumericTicksDomain = createSelector([selectBaseAxis], combineNumericTicksDomain, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var selectNumericalDomain = createSelector([selectBaseAxis, selectDomainDefinition, selectDomainFromUserPreference, selectDomainOfStackGroups, selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1, selectReferenceElementsDomain, selectChartLayout, pickAxisType, selectNumericTicksDomain], combineNumericalDomain, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var expandDomain = [0, 1];
var combineAxisDomain = (axisSettings, layout, displayedData, allAppliedValues, stackOffsetType, axisType, numericalDomain) => {
  if ((axisSettings == null || displayedData == null || displayedData.length === 0) && numericalDomain === void 0) {
    return void 0;
  }
  var dataKey = axisSettings.dataKey, type = axisSettings.type;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (isCategorical && dataKey == null) {
    var _displayedData$length;
    return range$1(0, (_displayedData$length = displayedData === null || displayedData === void 0 ? void 0 : displayedData.length) !== null && _displayedData$length !== void 0 ? _displayedData$length : 0);
  }
  if (type === "category") {
    return computeDomainOfTypeCategory(allAppliedValues, axisSettings, isCategorical);
  }
  if (stackOffsetType === "expand" && !isCategorical) {
    return expandDomain;
  }
  return numericalDomain;
};
var selectAxisDomain = createSelector([selectBaseAxis, selectChartLayout, selectDisplayedData$1, selectAllAppliedValues, selectStackOffsetType, pickAxisType, selectNumericalDomain], combineAxisDomain);
var selectRealScaleType = createSelector([selectBaseAxis, selectHasBar, selectChartName], combineRealScaleType);
var combineNiceTicks = (axisDomain, axisSettings, realScaleType) => {
  var niceTicks = axisSettings.niceTicks;
  if (niceTicks === "none") {
    return void 0;
  }
  var domainDefinition = getDomainDefinition(axisSettings);
  var hasDomainAutoKeyword = Array.isArray(domainDefinition) && (domainDefinition[0] === "auto" || domainDefinition[1] === "auto");
  if ((niceTicks === "snap125" || niceTicks === "adaptive") && axisSettings != null && axisSettings.tickCount && isWellFormedNumberDomain(axisDomain)) {
    if (hasDomainAutoKeyword) {
      return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, niceTicks);
    }
    if (axisSettings.type === "number") {
      return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, niceTicks);
    }
  }
  if (niceTicks === "auto" && realScaleType === "linear" && axisSettings != null && axisSettings.tickCount) {
    if (hasDomainAutoKeyword && isWellFormedNumberDomain(axisDomain)) {
      return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, "adaptive");
    }
    if (axisSettings.type === "number" && isWellFormedNumberDomain(axisDomain)) {
      return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, "adaptive");
    }
  }
  return void 0;
};
var selectNiceTicks = createSelector([selectAxisDomain, selectRenderableAxisSettings, selectRealScaleType], combineNiceTicks);
var combineAxisDomainWithNiceTicks = (axisSettings, domain, niceTicks, axisType) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    axisType !== "angleAxis" && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.type) === "number" && isWellFormedNumberDomain(domain) && Array.isArray(niceTicks) && niceTicks.length > 0
  ) {
    var _niceTicks$, _niceTicks;
    var minFromDomain = domain[0];
    var minFromTicks = (_niceTicks$ = niceTicks[0]) !== null && _niceTicks$ !== void 0 ? _niceTicks$ : 0;
    var maxFromDomain = domain[1];
    var maxFromTicks = (_niceTicks = niceTicks[niceTicks.length - 1]) !== null && _niceTicks !== void 0 ? _niceTicks : 0;
    return [Math.min(minFromDomain, minFromTicks), Math.max(maxFromDomain, maxFromTicks)];
  }
  return domain;
};
var selectAxisDomainIncludingNiceTicks = createSelector([selectBaseAxis, selectAxisDomain, selectNiceTicks, pickAxisType], combineAxisDomainWithNiceTicks);
var selectSmallestDistanceBetweenValues = createSelector(selectAllAppliedValues, selectBaseAxis, (allDataSquished, axisSettings) => {
  if (!axisSettings || axisSettings.type !== "number") {
    return void 0;
  }
  var smallestDistanceBetweenValues = Infinity;
  var sortedValues = Array.from(onlyAllowNumbers(allDataSquished.map((d) => d.value))).sort((a2, b) => a2 - b);
  var first = sortedValues[0];
  var last = sortedValues[sortedValues.length - 1];
  if (first == null || last == null) {
    return Infinity;
  }
  var diff = last - first;
  if (diff === 0) {
    return Infinity;
  }
  for (var i = 0; i < sortedValues.length - 1; i++) {
    var curr = sortedValues[i];
    var next = sortedValues[i + 1];
    if (curr == null || next == null) {
      continue;
    }
    var distance = next - curr;
    smallestDistanceBetweenValues = Math.min(smallestDistanceBetweenValues, distance);
  }
  return smallestDistanceBetweenValues / diff;
});
var selectCalculatedPadding = createSelector(selectSmallestDistanceBetweenValues, selectChartLayout, selectBarCategoryGap, selectChartOffsetInternal, (_1, _2, _3, _4, padding) => padding, (smallestDistanceInPercent, layout, barCategoryGap, offset, padding) => {
  if (!isWellBehavedNumber(smallestDistanceInPercent)) {
    return 0;
  }
  var rangeWidth = layout === "vertical" ? offset.height : offset.width;
  if (padding === "gap") {
    return smallestDistanceInPercent * rangeWidth / 2;
  }
  if (padding === "no-gap") {
    var gap = getPercentValue(barCategoryGap, smallestDistanceInPercent * rangeWidth);
    var halfBand = smallestDistanceInPercent * rangeWidth / 2;
    return halfBand - gap - (halfBand - gap) / rangeWidth * gap;
  }
  return 0;
});
var selectCalculatedXAxisPadding = (state, axisId, isPanorama) => {
  var xAxisSettings = selectXAxisSettings(state, axisId);
  if (xAxisSettings == null || typeof xAxisSettings.padding !== "string") {
    return 0;
  }
  return selectCalculatedPadding(state, "xAxis", axisId, isPanorama, xAxisSettings.padding);
};
var selectCalculatedYAxisPadding = (state, axisId, isPanorama) => {
  var yAxisSettings = selectYAxisSettings(state, axisId);
  if (yAxisSettings == null || typeof yAxisSettings.padding !== "string") {
    return 0;
  }
  return selectCalculatedPadding(state, "yAxis", axisId, isPanorama, yAxisSettings.padding);
};
var selectXAxisPadding = createSelector(selectXAxisSettings, selectCalculatedXAxisPadding, (xAxisSettings, calculated) => {
  var _padding$left, _padding$right;
  if (xAxisSettings == null) {
    return {
      left: 0,
      right: 0
    };
  }
  var padding = xAxisSettings.padding;
  if (typeof padding === "string") {
    return {
      left: calculated,
      right: calculated
    };
  }
  return {
    left: ((_padding$left = padding.left) !== null && _padding$left !== void 0 ? _padding$left : 0) + calculated,
    right: ((_padding$right = padding.right) !== null && _padding$right !== void 0 ? _padding$right : 0) + calculated
  };
});
var selectYAxisPadding = createSelector(selectYAxisSettings, selectCalculatedYAxisPadding, (yAxisSettings, calculated) => {
  var _padding$top, _padding$bottom;
  if (yAxisSettings == null) {
    return {
      top: 0,
      bottom: 0
    };
  }
  var padding = yAxisSettings.padding;
  if (typeof padding === "string") {
    return {
      top: calculated,
      bottom: calculated
    };
  }
  return {
    top: ((_padding$top = padding.top) !== null && _padding$top !== void 0 ? _padding$top : 0) + calculated,
    bottom: ((_padding$bottom = padding.bottom) !== null && _padding$bottom !== void 0 ? _padding$bottom : 0) + calculated
  };
});
var selectXAxisRange = createSelector([selectChartOffsetInternal, selectXAxisPadding, selectBrushDimensions, selectBrushSettings, (_state, _axisId, isPanorama) => isPanorama], (offset, padding, brushDimensions, _ref6, isPanorama) => {
  var brushPadding = _ref6.padding;
  if (isPanorama) {
    return [brushPadding.left, brushDimensions.width - brushPadding.right];
  }
  return [offset.left + padding.left, offset.left + offset.width - padding.right];
});
var selectYAxisRange = createSelector([selectChartOffsetInternal, selectChartLayout, selectYAxisPadding, selectBrushDimensions, selectBrushSettings, (_state, _axisId, isPanorama) => isPanorama], (offset, layout, padding, brushDimensions, _ref7, isPanorama) => {
  var brushPadding = _ref7.padding;
  if (isPanorama) {
    return [brushDimensions.height - brushPadding.bottom, brushPadding.top];
  }
  if (layout === "horizontal") {
    return [offset.top + offset.height - padding.bottom, offset.top + padding.top];
  }
  return [offset.top + padding.top, offset.top + offset.height - padding.bottom];
});
var selectAxisRange = (state, axisType, axisId, isPanorama) => {
  var _selectZAxisSettings;
  switch (axisType) {
    case "xAxis":
      return selectXAxisRange(state, axisId, isPanorama);
    case "yAxis":
      return selectYAxisRange(state, axisId, isPanorama);
    case "zAxis":
      return (_selectZAxisSettings = selectZAxisSettings(state, axisId)) === null || _selectZAxisSettings === void 0 ? void 0 : _selectZAxisSettings.range;
    case "angleAxis":
      return selectAngleAxisRange(state);
    case "radiusAxis":
      return selectRadiusAxisRange(state, axisId);
    default:
      return void 0;
  }
};
var selectAxisRangeWithReverse = createSelector([selectBaseAxis, selectAxisRange], combineAxisRangeWithReverse);
var selectCheckedAxisDomain = createSelector([selectRealScaleType, selectAxisDomainIncludingNiceTicks], combineCheckedDomain);
var selectConfiguredScale = createSelector([selectBaseAxis, selectRealScaleType, selectCheckedAxisDomain, selectAxisRangeWithReverse], combineConfiguredScale);
var combineCategoricalDomain = (layout, appliedValues, axis, axisType) => {
  if (axis == null || axis.dataKey == null) {
    return void 0;
  }
  var type = axis.type, scale = axis.scale;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (isCategorical && (type === "number" || scale !== "auto")) {
    return appliedValues.map((d) => d.value);
  }
  return void 0;
};
var selectCategoricalDomain = createSelector([selectChartLayout, selectAllAppliedValues, selectRenderableAxisSettings, pickAxisType], combineCategoricalDomain);
var selectAxisScale = createSelector([selectConfiguredScale], rechartsScaleFactory);
createSelector([selectConfiguredScale], combineInverseScaleFunction);
createSelector([selectConfiguredScale, selectSortedDataPoints], createCategoricalInverse);
createSelector([selectCartesianItemsSettings, selectAllErrorBarSettings, pickAxisType], combineRelevantErrorBarSettings);
function compareIds(a2, b) {
  if (a2.id < b.id) {
    return -1;
  }
  if (a2.id > b.id) {
    return 1;
  }
  return 0;
}
var pickAxisOrientation = (_state, orientation) => orientation;
var pickMirror = (_state, _orientation, mirror) => mirror;
var selectAllXAxesWithOffsetType = createSelector(selectAllXAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var selectAllYAxesWithOffsetType = createSelector(selectAllYAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var getXAxisSize = (offset, axisSettings) => {
  var height = typeof axisSettings.height === "number" ? axisSettings.height : DEFAULT_X_AXIS_HEIGHT;
  return {
    width: offset.width,
    height
  };
};
var getYAxisSize = (offset, axisSettings) => {
  var width = typeof axisSettings.width === "number" ? axisSettings.width : DEFAULT_Y_AXIS_WIDTH;
  return {
    width,
    height: offset.height
  };
};
var selectXAxisSize = createSelector(selectChartOffsetInternal, selectXAxisSettings, getXAxisSize);
var combineXAxisPositionStartingPoint = (offset, orientation, chartHeight) => {
  switch (orientation) {
    case "top":
      return offset.top;
    case "bottom":
      return chartHeight - offset.bottom;
    default:
      return 0;
  }
};
var combineYAxisPositionStartingPoint = (offset, orientation, chartWidth) => {
  switch (orientation) {
    case "left":
      return offset.left;
    case "right":
      return chartWidth - offset.right;
    default:
      return 0;
  }
};
var selectAllXAxesOffsetSteps = createSelector(selectChartHeight, selectChartOffsetInternal, selectAllXAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartHeight, offset, allAxesWithSameOffsetType, orientation, mirror) => {
  var steps = {};
  var position;
  allAxesWithSameOffsetType.forEach((axis) => {
    var axisSize = getXAxisSize(offset, axis);
    if (position == null) {
      position = combineXAxisPositionStartingPoint(offset, orientation, chartHeight);
    }
    var needSpace = orientation === "top" && !mirror || orientation === "bottom" && mirror;
    steps[axis.id] = position - Number(needSpace) * axisSize.height;
    position += (needSpace ? -1 : 1) * axisSize.height;
  });
  return steps;
});
var selectAllYAxesOffsetSteps = createSelector(selectChartWidth, selectChartOffsetInternal, selectAllYAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartWidth, offset, allAxesWithSameOffsetType, orientation, mirror) => {
  var steps = {};
  var position;
  allAxesWithSameOffsetType.forEach((axis) => {
    var axisSize = getYAxisSize(offset, axis);
    if (position == null) {
      position = combineYAxisPositionStartingPoint(offset, orientation, chartWidth);
    }
    var needSpace = orientation === "left" && !mirror || orientation === "right" && mirror;
    steps[axis.id] = position - Number(needSpace) * axisSize.width;
    position += (needSpace ? -1 : 1) * axisSize.width;
  });
  return steps;
});
var selectXAxisOffsetSteps = (state, axisId) => {
  var axisSettings = selectXAxisSettings(state, axisId);
  if (axisSettings == null) {
    return void 0;
  }
  return selectAllXAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectXAxisPosition = createSelector([selectChartOffsetInternal, selectXAxisSettings, selectXAxisOffsetSteps, (_, axisId) => axisId], (offset, axisSettings, allSteps, axisId) => {
  if (axisSettings == null) {
    return void 0;
  }
  var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
  if (stepOfThisAxis == null) {
    return {
      x: offset.left,
      y: 0
    };
  }
  return {
    x: offset.left,
    y: stepOfThisAxis
  };
});
var selectYAxisOffsetSteps = (state, axisId) => {
  var axisSettings = selectYAxisSettings(state, axisId);
  if (axisSettings == null) {
    return void 0;
  }
  return selectAllYAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectYAxisPosition = createSelector([selectChartOffsetInternal, selectYAxisSettings, selectYAxisOffsetSteps, (_, axisId) => axisId], (offset, axisSettings, allSteps, axisId) => {
  if (axisSettings == null) {
    return void 0;
  }
  var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
  if (stepOfThisAxis == null) {
    return {
      x: 0,
      y: offset.top
    };
  }
  return {
    x: stepOfThisAxis,
    y: offset.top
  };
});
var selectYAxisSize = createSelector(selectChartOffsetInternal, selectYAxisSettings, (offset, axisSettings) => {
  var width = typeof axisSettings.width === "number" ? axisSettings.width : DEFAULT_Y_AXIS_WIDTH;
  return {
    width,
    height: offset.height
  };
});
var selectCartesianAxisSize = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSize(state, axisId).width;
    }
    case "yAxis": {
      return selectYAxisSize(state, axisId).height;
    }
    default: {
      return void 0;
    }
  }
};
var combineDuplicateDomain = (chartLayout, appliedValues, axis, axisType) => {
  if (axis == null) {
    return void 0;
  }
  var allowDuplicatedCategory = axis.allowDuplicatedCategory, type = axis.type, dataKey = axis.dataKey;
  var isCategorical = isCategoricalAxis(chartLayout, axisType);
  var allData = appliedValues.map((av) => av.value);
  var validData = allData.filter((v) => v != null);
  if (dataKey && isCategorical && type === "category" && allowDuplicatedCategory && hasDuplicate(validData)) {
    return allData;
  }
  return void 0;
};
var selectDuplicateDomain = createSelector([selectChartLayout, selectAllAppliedValues, selectBaseAxis, pickAxisType], combineDuplicateDomain);
var selectAxisPropsNeededForCartesianGridTicksGenerator = createSelector([selectChartLayout, selectCartesianAxisSettings, selectRealScaleType, selectAxisScale, selectDuplicateDomain, selectCategoricalDomain, selectAxisRange, selectNiceTicks, pickAxisType], (layout, axis, realScaleType, scale, duplicateDomain, categoricalDomain, axisRange, niceTicks, axisType) => {
  if (axis == null) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  return {
    angle: axis.angle,
    interval: axis.interval,
    minTickGap: axis.minTickGap,
    orientation: axis.orientation,
    tick: axis.tick,
    tickCount: axis.tickCount,
    tickFormatter: axis.tickFormatter,
    ticks: axis.ticks,
    type: axis.type,
    unit: axis.unit,
    axisType,
    categoricalDomain,
    duplicateDomain,
    isCategorical,
    niceTicks,
    range: axisRange,
    realScaleType,
    scale
  };
});
var combineAxisTicks = (layout, axis, realScaleType, scale, niceTicks, axisRange, duplicateDomain, categoricalDomain, axisType) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  var type = axis.type, ticks2 = axis.ticks, tickCount = axis.tickCount;
  var offsetForBand = (
    // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
    realScaleType === "scaleBand" && typeof scale.bandwidth === "function" ? scale.bandwidth() / 2 : 2
  );
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && axisRange != null && axisRange.length >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
  var ticksOrNiceTicks = ticks2 || niceTicks;
  if (ticksOrNiceTicks) {
    return ticksOrNiceTicks.map((entry, index) => {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      var scaled = scale.map(scaleContent);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        index,
        coordinate: scaled + offset,
        value: entry,
        offset
      };
    }).filter(isNotNil);
  }
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  if (scale.ticks) {
    return scale.ticks(tickCount).map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use Date as index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var selectTicksOfAxis = createSelector([selectChartLayout, selectRenderableAxisSettings, selectRealScaleType, selectAxisScale, selectNiceTicks, selectAxisRange, selectDuplicateDomain, selectCategoricalDomain, pickAxisType], combineAxisTicks);
var combineGraphicalItemTicks = (layout, axis, scale, axisRange, duplicateDomain, categoricalDomain, axisType) => {
  if (axis == null || scale == null || axisRange == null || axisRange[0] === axisRange[1]) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  var tickCount = axis.tickCount;
  var offset = 0;
  offset = axisType === "angleAxis" && (axisRange === null || axisRange === void 0 ? void 0 : axisRange.length) >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  if (scale.ticks) {
    return scale.ticks(tickCount).map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use unknown as index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var selectTicksOfGraphicalItem = createSelector([selectChartLayout, selectRenderableAxisSettings, selectAxisScale, selectAxisRange, selectDuplicateDomain, selectCategoricalDomain, pickAxisType], combineGraphicalItemTicks);
var selectAxisWithScale = createSelector(selectBaseAxis, selectAxisScale, (axis, scale) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  return _objectSpread$t(_objectSpread$t({}, axis), {}, {
    scale
  });
});
var selectZAxisConfiguredScale = createSelector([selectBaseAxis, selectRealScaleType, selectAxisDomain, selectAxisRangeWithReverse], combineConfiguredScale);
var selectZAxisScale = createSelector([selectZAxisConfiguredScale], rechartsScaleFactory);
createSelector((state, _axisType, axisId) => selectZAxisSettings(state, axisId), selectZAxisScale, (axis, scale) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  return _objectSpread$t(_objectSpread$t({}, axis), {}, {
    scale
  });
});
var selectChartDirection = createSelector([selectChartLayout, selectAllXAxes, selectAllYAxes], (layout, allXAxes, allYAxes) => {
  switch (layout) {
    case "horizontal": {
      return allXAxes.some((axis) => axis.reversed) ? "right-to-left" : "left-to-right";
    }
    case "vertical": {
      return allYAxes.some((axis) => axis.reversed) ? "bottom-to-top" : "top-to-bottom";
    }
    // TODO: make this better. For now, right arrow triggers "forward", left arrow "back"
    // however, the tooltip moves an unintuitive direction because of how the indices are rendered
    case "centric":
    case "radial": {
      return "left-to-right";
    }
    default: {
      return void 0;
    }
  }
});
var selectRenderedTicksOfAxis = (state, axisType, axisId) => {
  var _state$renderedTicks$;
  return (_state$renderedTicks$ = state.renderedTicks[axisType]) === null || _state$renderedTicks$ === void 0 ? void 0 : _state$renderedTicks$[axisId];
};
createSelector([selectRenderedTicksOfAxis], (ticks2) => {
  if (!ticks2 || ticks2.length === 0) {
    return void 0;
  }
  return (pixelValue) => {
    var _closestTick;
    var minDistance = Infinity;
    var closestTick = ticks2[0];
    for (var tick of ticks2) {
      var distance = Math.abs(tick.coordinate - pixelValue);
      if (distance < minDistance) {
        minDistance = distance;
        closestTick = tick;
      }
    }
    return (_closestTick = closestTick) === null || _closestTick === void 0 ? void 0 : _closestTick.value;
  };
});
var selectDefaultTooltipEventType = (state) => state.options.defaultTooltipEventType;
var selectValidateTooltipEventTypes = (state) => state.options.validateTooltipEventTypes;
function combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes) {
  if (shared == null) {
    return defaultTooltipEventType;
  }
  var eventType = shared ? "axis" : "item";
  if (validateTooltipEventTypes == null) {
    return defaultTooltipEventType;
  }
  return validateTooltipEventTypes.includes(eventType) ? eventType : defaultTooltipEventType;
}
function selectTooltipEventType$1(state, shared) {
  var defaultTooltipEventType = selectDefaultTooltipEventType(state);
  var validateTooltipEventTypes = selectValidateTooltipEventTypes(state);
  return combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes);
}
function useTooltipEventType(shared) {
  return useAppSelector((state) => selectTooltipEventType$1(state, shared));
}
var combineActiveLabel = (tooltipTicks, activeIndex) => {
  var _tooltipTicks$n;
  var n = Number(activeIndex);
  if (isNan(n) || activeIndex == null) {
    return void 0;
  }
  return n >= 0 ? tooltipTicks === null || tooltipTicks === void 0 || (_tooltipTicks$n = tooltipTicks[n]) === null || _tooltipTicks$n === void 0 ? void 0 : _tooltipTicks$n.value : void 0;
};
var selectTooltipSettings = (state) => state.tooltip.settings;
var noInteraction = {
  active: false,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
};
var initialState$b = {
  itemInteraction: {
    click: noInteraction,
    hover: noInteraction
  },
  axisInteraction: {
    click: noInteraction,
    hover: noInteraction
  },
  keyboardInteraction: noInteraction,
  syncInteraction: {
    active: false,
    index: null,
    dataKey: void 0,
    label: void 0,
    coordinate: void 0,
    sourceViewBox: void 0,
    graphicalItemId: void 0
  },
  tooltipItemPayloads: [],
  settings: {
    shared: void 0,
    trigger: "hover",
    axisId: 0,
    active: false,
    defaultIndex: void 0
  }
};
var tooltipSlice = createSlice({
  name: "tooltip",
  initialState: initialState$b,
  reducers: {
    addTooltipEntrySettings: {
      reducer(state, action) {
        state.tooltipItemPayloads.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    replaceTooltipEntrySettings: {
      reducer(state, action) {
        var _action$payload = action.payload, prev = _action$payload.prev, next = _action$payload.next;
        var index = current(state).tooltipItemPayloads.indexOf(castDraft(prev));
        if (index > -1) {
          state.tooltipItemPayloads[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeTooltipEntrySettings: {
      reducer(state, action) {
        var index = current(state).tooltipItemPayloads.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.tooltipItemPayloads.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    },
    setTooltipSettingsState(state, action) {
      state.settings = action.payload;
    },
    setActiveMouseOverItemIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.keyboardInteraction.active = false;
      state.itemInteraction.hover.active = true;
      state.itemInteraction.hover.index = action.payload.activeIndex;
      state.itemInteraction.hover.dataKey = action.payload.activeDataKey;
      state.itemInteraction.hover.graphicalItemId = action.payload.activeGraphicalItemId;
      state.itemInteraction.hover.coordinate = action.payload.activeCoordinate;
    },
    mouseLeaveChart(state) {
      state.itemInteraction.hover.active = false;
      state.axisInteraction.hover.active = false;
    },
    mouseLeaveItem(state) {
      state.itemInteraction.hover.active = false;
    },
    setActiveClickItemIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.itemInteraction.click.active = true;
      state.keyboardInteraction.active = false;
      state.itemInteraction.click.index = action.payload.activeIndex;
      state.itemInteraction.click.dataKey = action.payload.activeDataKey;
      state.itemInteraction.click.graphicalItemId = action.payload.activeGraphicalItemId;
      state.itemInteraction.click.coordinate = action.payload.activeCoordinate;
    },
    setMouseOverAxisIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.axisInteraction.hover.active = true;
      state.keyboardInteraction.active = false;
      state.axisInteraction.hover.index = action.payload.activeIndex;
      state.axisInteraction.hover.dataKey = action.payload.activeDataKey;
      state.axisInteraction.hover.coordinate = action.payload.activeCoordinate;
    },
    setMouseClickAxisIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.keyboardInteraction.active = false;
      state.axisInteraction.click.active = true;
      state.axisInteraction.click.index = action.payload.activeIndex;
      state.axisInteraction.click.dataKey = action.payload.activeDataKey;
      state.axisInteraction.click.coordinate = action.payload.activeCoordinate;
    },
    setSyncInteraction(state, action) {
      state.syncInteraction = action.payload;
    },
    setKeyboardInteraction(state, action) {
      state.keyboardInteraction.active = action.payload.active;
      state.keyboardInteraction.index = action.payload.activeIndex;
      state.keyboardInteraction.coordinate = action.payload.activeCoordinate;
    }
  }
});
var _tooltipSlice$actions = tooltipSlice.actions, addTooltipEntrySettings = _tooltipSlice$actions.addTooltipEntrySettings, replaceTooltipEntrySettings = _tooltipSlice$actions.replaceTooltipEntrySettings, removeTooltipEntrySettings = _tooltipSlice$actions.removeTooltipEntrySettings, setTooltipSettingsState = _tooltipSlice$actions.setTooltipSettingsState, setActiveMouseOverItemIndex = _tooltipSlice$actions.setActiveMouseOverItemIndex, mouseLeaveItem = _tooltipSlice$actions.mouseLeaveItem, mouseLeaveChart = _tooltipSlice$actions.mouseLeaveChart, setActiveClickItemIndex = _tooltipSlice$actions.setActiveClickItemIndex, setMouseOverAxisIndex = _tooltipSlice$actions.setMouseOverAxisIndex, setMouseClickAxisIndex = _tooltipSlice$actions.setMouseClickAxisIndex, setSyncInteraction = _tooltipSlice$actions.setSyncInteraction, setKeyboardInteraction = _tooltipSlice$actions.setKeyboardInteraction;
var tooltipReducer = tooltipSlice.reducer;
function ownKeys$s(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$s(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$s(Object(t), true).forEach(function(r2) {
      _defineProperty$u(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$s(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$u(e, r, t) {
  return (r = _toPropertyKey$u(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$u(t) {
  var i = _toPrimitive$u(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$u(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger) {
  if (tooltipEventType === "axis") {
    if (trigger === "click") {
      return tooltipState.axisInteraction.click;
    }
    return tooltipState.axisInteraction.hover;
  }
  if (trigger === "click") {
    return tooltipState.itemInteraction.click;
  }
  return tooltipState.itemInteraction.hover;
}
function hasBeenActivePreviously(tooltipInteractionState) {
  return tooltipInteractionState.index != null;
}
var combineTooltipInteractionState = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
  if (tooltipEventType == null) {
    return noInteraction;
  }
  var appropriateMouseInteraction = chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger);
  if (appropriateMouseInteraction == null) {
    return noInteraction;
  }
  if (appropriateMouseInteraction.active) {
    return appropriateMouseInteraction;
  }
  if (tooltipState.keyboardInteraction.active) {
    return tooltipState.keyboardInteraction;
  }
  if (tooltipState.syncInteraction.active && tooltipState.syncInteraction.index != null) {
    return tooltipState.syncInteraction;
  }
  var activeFromProps = tooltipState.settings.active === true;
  if (hasBeenActivePreviously(appropriateMouseInteraction)) {
    if (activeFromProps) {
      return _objectSpread$s(_objectSpread$s({}, appropriateMouseInteraction), {}, {
        active: true
      });
    }
  } else if (defaultIndex != null) {
    return {
      active: true,
      coordinate: void 0,
      dataKey: void 0,
      index: defaultIndex,
      graphicalItemId: void 0
    };
  }
  return _objectSpread$s(_objectSpread$s({}, noInteraction), {}, {
    coordinate: appropriateMouseInteraction.coordinate
  });
};
function toFiniteNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : void 0;
  }
  if (value instanceof Date) {
    var numericValue = value.valueOf();
    return Number.isFinite(numericValue) ? numericValue : void 0;
  }
  var parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : void 0;
}
function isValueWithinNumberDomain(value, domain) {
  var numericValue = toFiniteNumber(value);
  var lowerBound = domain[0];
  var upperBound = domain[1];
  if (numericValue === void 0) {
    return false;
  }
  var min2 = Math.min(lowerBound, upperBound);
  var max2 = Math.max(lowerBound, upperBound);
  return numericValue >= min2 && numericValue <= max2;
}
function isValueWithinDomain(entry, axisDataKey, domain) {
  if (domain == null || axisDataKey == null) {
    return true;
  }
  var value = getValueByDataKey(entry, axisDataKey);
  if (value == null) {
    return true;
  }
  if (!isWellFormedNumberDomain(domain)) {
    return true;
  }
  return isValueWithinNumberDomain(value, domain);
}
var combineActiveTooltipIndex = (tooltipInteraction, chartData, axisDataKey, domain) => {
  var desiredIndex = tooltipInteraction === null || tooltipInteraction === void 0 ? void 0 : tooltipInteraction.index;
  if (desiredIndex == null) {
    return null;
  }
  var indexAsNumber = Number(desiredIndex);
  if (!isWellBehavedNumber(indexAsNumber)) {
    return desiredIndex;
  }
  var lowerLimit = 0;
  var upperLimit = Infinity;
  if (chartData.length > 0) {
    upperLimit = chartData.length - 1;
  }
  var clampedIndex = Math.max(lowerLimit, Math.min(indexAsNumber, upperLimit));
  var entry = chartData[clampedIndex];
  if (entry == null) {
    return String(clampedIndex);
  }
  if (!isValueWithinDomain(entry, axisDataKey, domain)) {
    return null;
  }
  return String(clampedIndex);
};
var combineCoordinateForDefaultIndex = (width, height, layout, offset, tooltipTicks, defaultIndex, tooltipConfigurations) => {
  if (defaultIndex == null) {
    return void 0;
  }
  var firstConfiguration = tooltipConfigurations[0];
  var maybePosition = firstConfiguration === null || firstConfiguration === void 0 ? void 0 : firstConfiguration.getPosition(defaultIndex);
  if (maybePosition != null) {
    return maybePosition;
  }
  var tick = tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks[Number(defaultIndex)];
  if (!tick) {
    return void 0;
  }
  switch (layout) {
    case "horizontal": {
      return {
        x: tick.coordinate,
        y: (offset.top + height) / 2
      };
    }
    default: {
      return {
        x: (offset.left + width) / 2,
        y: tick.coordinate
      };
    }
  }
};
var combineTooltipPayloadConfigurations = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
  if (tooltipEventType === "axis") {
    return tooltipState.tooltipItemPayloads;
  }
  if (tooltipState.tooltipItemPayloads.length === 0) {
    return [];
  }
  var filterByGraphicalItemId;
  if (trigger === "hover") {
    filterByGraphicalItemId = tooltipState.itemInteraction.hover.graphicalItemId;
  } else {
    filterByGraphicalItemId = tooltipState.itemInteraction.click.graphicalItemId;
  }
  if (tooltipState.syncInteraction.active && filterByGraphicalItemId == null) {
    return tooltipState.tooltipItemPayloads;
  }
  if (filterByGraphicalItemId == null && (defaultIndex != null || tooltipState.keyboardInteraction.active)) {
    var firstItemPayload = tooltipState.tooltipItemPayloads[0];
    if (firstItemPayload != null) {
      return [firstItemPayload];
    }
    return [];
  }
  return tooltipState.tooltipItemPayloads.filter((tpc) => {
    var _tpc$settings;
    return ((_tpc$settings = tpc.settings) === null || _tpc$settings === void 0 ? void 0 : _tpc$settings.graphicalItemId) === filterByGraphicalItemId;
  });
};
var selectTooltipPayloadSearcher = (state) => state.options.tooltipPayloadSearcher;
var selectTooltipState = (state) => state.tooltip;
function ownKeys$r(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$r(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$r(Object(t), true).forEach(function(r2) {
      _defineProperty$t(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$r(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$t(e, r, t) {
  return (r = _toPropertyKey$t(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$t(t) {
  var i = _toPrimitive$t(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$t(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function parseName(value) {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  return void 0;
}
function parseUnit(value) {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  return void 0;
}
function parseDataKey(value) {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  if (typeof value === "function") {
    return (obj) => value(obj);
  }
  return void 0;
}
function parseColor(value) {
  if (typeof value === "string") {
    return value;
  }
  return void 0;
}
function parseTooltipPayloadItem(item) {
  if (item == null || typeof item !== "object") {
    return void 0;
  }
  var name = "name" in item ? parseName(item.name) : void 0;
  var unit2 = "unit" in item ? parseUnit(item.unit) : void 0;
  var dataKey = "dataKey" in item ? parseDataKey(item.dataKey) : void 0;
  var payload = "payload" in item ? item.payload : void 0;
  var color2 = "color" in item ? parseColor(item.color) : void 0;
  var fill = "fill" in item ? parseColor(item.fill) : void 0;
  return {
    name,
    unit: unit2,
    dataKey,
    payload,
    color: color2,
    fill
  };
}
function selectFinalData(dataDefinedOnItem, dataDefinedOnChart) {
  if (dataDefinedOnItem != null) {
    return dataDefinedOnItem;
  }
  return dataDefinedOnChart;
}
var combineTooltipPayload = (tooltipPayloadConfigurations, activeIndex, chartDataState, tooltipAxisDataKey, activeLabel, tooltipPayloadSearcher, tooltipEventType) => {
  if (activeIndex == null || tooltipPayloadSearcher == null) {
    return void 0;
  }
  var chartData = chartDataState.chartData, computedData = chartDataState.computedData, dataStartIndex = chartDataState.dataStartIndex, dataEndIndex = chartDataState.dataEndIndex;
  var init = [];
  return tooltipPayloadConfigurations.reduce((agg, _ref2) => {
    var _settings$dataKey;
    var dataDefinedOnItem = _ref2.dataDefinedOnItem, settings = _ref2.settings;
    var finalData = selectFinalData(dataDefinedOnItem, chartData);
    var sliced = Array.isArray(finalData) ? getSliced(finalData, dataStartIndex, dataEndIndex) : finalData;
    var finalDataKey = (_settings$dataKey = settings === null || settings === void 0 ? void 0 : settings.dataKey) !== null && _settings$dataKey !== void 0 ? _settings$dataKey : tooltipAxisDataKey;
    var finalNameKey = settings === null || settings === void 0 ? void 0 : settings.nameKey;
    var tooltipPayload;
    if (tooltipAxisDataKey && Array.isArray(sliced) && /*
     * findEntryInArray won't work for Scatter because Scatter provides an array of arrays
     * as tooltip payloads and findEntryInArray is not prepared to handle that.
     * Sad but also ScatterChart only allows 'item' tooltipEventType
     * and also this is only a problem if there are multiple Scatters and each has its own data array
     * so let's fix that some other time.
     */
    !Array.isArray(sliced[0]) && /*
     * If the tooltipEventType is 'axis', we should search for the dataKey in the sliced data
     * because thanks to allowDuplicatedCategory=false, the order of elements in the array
     * no longer matches the order of elements in the original data
     * and so we need to search by the active dataKey + label rather than by index.
     *
     * The same happens if multiple graphical items are present in the chart
     * and each of them has its own data array. Those arrays get concatenated
     * and again the tooltip index no longer matches the original data.
     *
     * On the other hand the tooltipEventType 'item' should always search by index
     * because we get the index from interacting over the individual elements
     * which is always accurate, irrespective of the allowDuplicatedCategory setting.
     */
    tooltipEventType === "axis") {
      tooltipPayload = findEntryInArray(sliced, tooltipAxisDataKey, activeLabel);
      if (tooltipPayload == null) {
        tooltipPayload = tooltipPayloadSearcher(sliced, activeIndex, computedData, finalNameKey);
      }
    } else {
      tooltipPayload = tooltipPayloadSearcher(sliced, activeIndex, computedData, finalNameKey);
    }
    if (Array.isArray(tooltipPayload)) {
      tooltipPayload.forEach((item) => {
        var _parsedItem$color, _parsedItem$fill;
        var parsedItem = parseTooltipPayloadItem(item);
        var itemName = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.name;
        var itemDataKey = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.dataKey;
        var itemPayload = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.payload;
        var newSettings = _objectSpread$r(_objectSpread$r({}, settings), {}, {
          name: itemName,
          unit: parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.unit,
          // Preserve item-level color/fill from graphical items.
          color: (_parsedItem$color = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.color) !== null && _parsedItem$color !== void 0 ? _parsedItem$color : settings === null || settings === void 0 ? void 0 : settings.color,
          fill: (_parsedItem$fill = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.fill) !== null && _parsedItem$fill !== void 0 ? _parsedItem$fill : settings === null || settings === void 0 ? void 0 : settings.fill
        });
        agg.push(getTooltipEntry({
          tooltipEntrySettings: newSettings,
          dataKey: itemDataKey,
          payload: itemPayload,
          value: getValueByDataKey(itemPayload, itemDataKey),
          name: itemName == null ? void 0 : String(itemName)
        }));
      });
    } else {
      var _getValueByDataKey;
      agg.push(getTooltipEntry({
        tooltipEntrySettings: settings,
        dataKey: finalDataKey,
        payload: tooltipPayload,
        // getValueByDataKey does not validate the output type
        value: getValueByDataKey(tooltipPayload, finalDataKey),
        // getValueByDataKey does not validate the output type
        name: (_getValueByDataKey = getValueByDataKey(tooltipPayload, finalNameKey)) !== null && _getValueByDataKey !== void 0 ? _getValueByDataKey : settings === null || settings === void 0 ? void 0 : settings.name
      }));
    }
    return agg;
  }, init);
};
var selectTooltipAxisRealScaleType = createSelector([selectTooltipAxis, selectHasBar, selectChartName], combineRealScaleType);
var selectAllUnfilteredGraphicalItems = createSelector([(state) => state.graphicalItems.cartesianItems, (state) => state.graphicalItems.polarItems], (cartesianItems, polarItems) => [...cartesianItems, ...polarItems]);
var selectTooltipAxisPredicate = createSelector([selectTooltipAxisType, selectTooltipAxisId], itemAxisPredicate);
var selectAllGraphicalItemsSettings = createSelector([selectAllUnfilteredGraphicalItems, selectTooltipAxis, selectTooltipAxisPredicate], combineGraphicalItemsSettings, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var selectAllStackedGraphicalItemsSettings = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipGraphicalItemsData = createSelector([selectAllGraphicalItemsSettings], combineGraphicalItemsData, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var selectAnyTooltipItemUsesChartData = createSelector([selectAllGraphicalItemsSettings], (items) => items.some((item) => !item.data));
var selectTooltipDisplayedData = createSelector([selectTooltipGraphicalItemsData, selectChartDataWithIndexes], combineDisplayedData);
var selectTooltipStackedData = createSelector([selectAllStackedGraphicalItemsSettings, selectChartDataWithIndexes, selectTooltipAxis], combineDisplayedStackedData);
var selectAllTooltipAppliedValues = createSelector([selectTooltipDisplayedData, selectTooltipAxis, selectAllGraphicalItemsSettings, selectChartDataWithIndexes, selectAnyTooltipItemUsesChartData, selectTooltipGraphicalItemsData], combineAllAppliedValues);
var selectTooltipAxisDomainDefinition = createSelector([selectTooltipAxis], getDomainDefinition);
var selectTooltipDataOverflow = createSelector([selectTooltipAxis], (axisSettings) => axisSettings.allowDataOverflow);
var selectTooltipDomainFromUserPreferences = createSelector([selectTooltipAxisDomainDefinition, selectTooltipDataOverflow], numericalDomainSpecifiedWithoutRequiringData);
var selectAllStackedGraphicalItems = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipStackGroups = createSelector([selectTooltipStackedData, selectAllStackedGraphicalItems, selectStackOffsetType, selectReverseStackOrder], combineStackGroups);
var selectTooltipDomainOfStackGroups = createSelector([selectTooltipStackGroups, selectChartDataWithIndexes, selectTooltipAxisType, selectTooltipDomainFromUserPreferences], combineDomainOfStackGroups);
var selectTooltipItemsSettingsExceptStacked = createSelector([selectAllGraphicalItemsSettings], filterGraphicalNotStackedItems);
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues = createSelector([selectTooltipDisplayedData, selectTooltipAxis, selectTooltipItemsSettingsExceptStacked, selectAllErrorBarSettings, selectTooltipAxisType, selectChartDataSliceWithIndexes], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var selectReferenceDotsByTooltipAxis = createSelector([selectReferenceDots, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceDotsDomain = createSelector([selectReferenceDotsByTooltipAxis, selectTooltipAxisType], combineDotsDomain);
var selectReferenceAreasByTooltipAxis = createSelector([selectReferenceAreas, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceAreasDomain = createSelector([selectReferenceAreasByTooltipAxis, selectTooltipAxisType], combineAreasDomain);
var selectReferenceLinesByTooltipAxis = createSelector([selectReferenceLines, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceLinesDomain = createSelector([selectReferenceLinesByTooltipAxis, selectTooltipAxisType], combineLinesDomain);
var selectTooltipReferenceElementsDomain = createSelector([selectTooltipReferenceDotsDomain, selectTooltipReferenceLinesDomain, selectTooltipReferenceAreasDomain], mergeDomains);
var selectTooltipNumericalDomain = createSelector([selectTooltipAxis, selectTooltipAxisDomainDefinition, selectTooltipDomainFromUserPreferences, selectTooltipDomainOfStackGroups, selectDomainOfAllAppliedNumericalValuesIncludingErrorValues, selectTooltipReferenceElementsDomain, selectChartLayout, selectTooltipAxisType], combineNumericalDomain);
var selectTooltipAxisDomain = createSelector([selectTooltipAxis, selectChartLayout, selectTooltipDisplayedData, selectAllTooltipAppliedValues, selectStackOffsetType, selectTooltipAxisType, selectTooltipNumericalDomain], combineAxisDomain);
var selectTooltipNiceTicks = createSelector([selectTooltipAxisDomain, selectTooltipAxis, selectTooltipAxisRealScaleType], combineNiceTicks);
var selectTooltipAxisDomainIncludingNiceTicks = createSelector([selectTooltipAxis, selectTooltipAxisDomain, selectTooltipNiceTicks, selectTooltipAxisType], combineAxisDomainWithNiceTicks);
var selectTooltipAxisRange = (state) => {
  var axisType = selectTooltipAxisType(state);
  var axisId = selectTooltipAxisId(state);
  var isPanorama = false;
  return selectAxisRange(state, axisType, axisId, isPanorama);
};
var selectTooltipAxisRangeWithReverse = createSelector([selectTooltipAxis, selectTooltipAxisRange], combineAxisRangeWithReverse);
var selectTooltipConfiguredScale = createSelector([selectTooltipAxis, selectTooltipAxisRealScaleType, selectTooltipAxisDomainIncludingNiceTicks, selectTooltipAxisRangeWithReverse], combineConfiguredScale);
var selectTooltipAxisScale = createSelector([selectTooltipConfiguredScale], rechartsScaleFactory);
var selectTooltipDuplicateDomain = createSelector([selectChartLayout, selectAllTooltipAppliedValues, selectTooltipAxis, selectTooltipAxisType], combineDuplicateDomain);
var selectTooltipCategoricalDomain = createSelector([selectChartLayout, selectAllTooltipAppliedValues, selectTooltipAxis, selectTooltipAxisType], combineCategoricalDomain);
var combineTicksOfTooltipAxis = (layout, axis, realScaleType, scale, range2, duplicateDomain, categoricalDomain, axisType) => {
  if (!axis) {
    return void 0;
  }
  var type = axis.type;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (!scale) {
    return void 0;
  }
  var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && range2 != null && (range2 === null || range2 === void 0 ? void 0 : range2.length) >= 2 ? mathSign(range2[0] - range2[1]) * 2 * offset : offset;
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use Date as an index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var selectTooltipAxisTicks = createSelector([selectChartLayout, selectTooltipAxis, selectTooltipAxisRealScaleType, selectTooltipAxisScale, selectTooltipAxisRange, selectTooltipDuplicateDomain, selectTooltipCategoricalDomain, selectTooltipAxisType], combineTicksOfTooltipAxis);
var selectTooltipEventType = createSelector([selectDefaultTooltipEventType, selectValidateTooltipEventTypes, selectTooltipSettings], (defaultTooltipEventType, validateTooltipEventType, settings) => combineTooltipEventType(settings.shared, defaultTooltipEventType, validateTooltipEventType));
var selectTooltipTrigger = (state) => state.tooltip.settings.trigger;
var selectDefaultIndex = (state) => state.tooltip.settings.defaultIndex;
var selectTooltipInteractionState$1 = createSelector([selectTooltipState, selectTooltipEventType, selectTooltipTrigger, selectDefaultIndex], combineTooltipInteractionState);
var selectActiveTooltipIndex = createSelector([selectTooltipInteractionState$1, selectTooltipDisplayedData, selectTooltipAxisDataKey, selectTooltipAxisDomain], combineActiveTooltipIndex);
var selectActiveLabel$1 = createSelector([selectTooltipAxisTicks, selectActiveTooltipIndex], combineActiveLabel);
var selectActiveTooltipDataKey = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
  if (!tooltipInteraction) {
    return void 0;
  }
  return tooltipInteraction.dataKey;
});
var selectActiveTooltipGraphicalItemId = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
  if (!tooltipInteraction) {
    return void 0;
  }
  return tooltipInteraction.graphicalItemId;
});
var selectTooltipPayloadConfigurations$1 = createSelector([selectTooltipState, selectTooltipEventType, selectTooltipTrigger, selectDefaultIndex], combineTooltipPayloadConfigurations);
var selectTooltipCoordinateForDefaultIndex = createSelector([selectChartWidth, selectChartHeight, selectChartLayout, selectChartOffsetInternal, selectTooltipAxisTicks, selectDefaultIndex, selectTooltipPayloadConfigurations$1], combineCoordinateForDefaultIndex);
var selectActiveTooltipCoordinate = createSelector([selectTooltipInteractionState$1, selectTooltipCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
  if (tooltipInteractionState !== null && tooltipInteractionState !== void 0 && tooltipInteractionState.coordinate) {
    return tooltipInteractionState.coordinate;
  }
  return defaultIndexCoordinate;
});
var selectIsTooltipActive$1 = createSelector([selectTooltipInteractionState$1], (tooltipInteractionState) => {
  var _tooltipInteractionSt;
  return (_tooltipInteractionSt = tooltipInteractionState === null || tooltipInteractionState === void 0 ? void 0 : tooltipInteractionState.active) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : false;
});
var selectActiveTooltipPayload = createSelector([selectTooltipPayloadConfigurations$1, selectActiveTooltipIndex, selectChartDataWithIndexes, selectTooltipAxisDataKey, selectActiveLabel$1, selectTooltipPayloadSearcher, selectTooltipEventType], combineTooltipPayload);
var selectActiveTooltipDataPoints = createSelector([selectActiveTooltipPayload], (payload) => {
  if (payload == null) {
    return void 0;
  }
  var dataPoints = payload.map((p) => p.payload).filter((p) => p != null);
  return Array.from(new Set(dataPoints));
});
function ownKeys$q(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$q(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$q(Object(t), true).forEach(function(r2) {
      _defineProperty$s(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$q(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$s(e, r, t) {
  return (r = _toPropertyKey$s(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$s(t) {
  var i = _toPrimitive$s(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$s(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var useTooltipAxis = () => useAppSelector(selectTooltipAxis);
var useTooltipAxisBandSize = () => {
  var tooltipAxis = useTooltipAxis();
  var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
  var tooltipAxisScale = useAppSelector(selectTooltipAxisScale);
  if (!tooltipAxis || !tooltipAxisScale) {
    return getBandSizeOfAxis(void 0, tooltipTicks);
  }
  return getBandSizeOfAxis(_objectSpread$q(_objectSpread$q({}, tooltipAxis), {}, {
    scale: tooltipAxisScale
  }), tooltipTicks);
};
function ownKeys$p(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$p(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$p(Object(t), true).forEach(function(r2) {
      _defineProperty$r(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$p(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$r(e, r, t) {
  return (r = _toPropertyKey$r(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$r(t) {
  var i = _toPrimitive$r(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$r(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var getActiveCartesianCoordinate = (layout, tooltipTicks, activeIndex, pointer) => {
  var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
  if (entry) {
    if (layout === "horizontal") {
      return {
        x: entry.coordinate,
        y: pointer.relativeY
      };
    }
    if (layout === "vertical") {
      return {
        x: pointer.relativeX,
        y: entry.coordinate
      };
    }
  }
  return {
    x: 0,
    y: 0
  };
};
var getActivePolarCoordinate = (layout, tooltipTicks, activeIndex, rangeObj) => {
  var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
  if (entry) {
    if (layout === "centric") {
      var _angle = entry.coordinate;
      var _radius = rangeObj.radius;
      return _objectSpread$p(_objectSpread$p(_objectSpread$p({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, _radius, _angle)), {}, {
        angle: _angle,
        radius: _radius
      });
    }
    var radius = entry.coordinate;
    var angle = rangeObj.angle;
    return _objectSpread$p(_objectSpread$p(_objectSpread$p({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, radius, angle)), {}, {
      angle,
      radius
    });
  }
  return {
    angle: 0,
    clockWise: false,
    cx: 0,
    cy: 0,
    endAngle: 0,
    innerRadius: 0,
    outerRadius: 0,
    radius: 0,
    startAngle: 0,
    x: 0,
    y: 0
  };
};
function isInCartesianRange(pointer, offset) {
  var x2 = pointer.relativeX, y2 = pointer.relativeY;
  return x2 >= offset.left && x2 <= offset.left + offset.width && y2 >= offset.top && y2 <= offset.top + offset.height;
}
var calculateActiveTickIndex = (coordinate, ticks2, unsortedTicks, axisType, range2) => {
  var _ticks$length;
  var len = (_ticks$length = ticks2 === null || ticks2 === void 0 ? void 0 : ticks2.length) !== null && _ticks$length !== void 0 ? _ticks$length : 0;
  if (len <= 1 || coordinate == null) {
    return 0;
  }
  if (axisType === "angleAxis" && range2 != null && Math.abs(Math.abs(range2[1] - range2[0]) - 360) <= 1e-6) {
    var span = range2[1] - range2[0];
    var isInside = (lowerLimit, upperLimit, inclusiveLower) => [coordinate, coordinate + span, coordinate - span].some((c2) => (inclusiveLower ? c2 >= lowerLimit : c2 > lowerLimit) && c2 <= upperLimit);
    for (var i = 0; i < len; i++) {
      var _unsortedTicks, _unsortedTicks2, _unsortedTicks$i, _unsortedTicks$, _unsortedTicks3;
      var before = i > 0 ? (_unsortedTicks = unsortedTicks[i - 1]) === null || _unsortedTicks === void 0 ? void 0 : _unsortedTicks.coordinate : (_unsortedTicks2 = unsortedTicks[len - 1]) === null || _unsortedTicks2 === void 0 ? void 0 : _unsortedTicks2.coordinate;
      var cur = (_unsortedTicks$i = unsortedTicks[i]) === null || _unsortedTicks$i === void 0 ? void 0 : _unsortedTicks$i.coordinate;
      var after = i >= len - 1 ? (_unsortedTicks$ = unsortedTicks[0]) === null || _unsortedTicks$ === void 0 ? void 0 : _unsortedTicks$.coordinate : (_unsortedTicks3 = unsortedTicks[i + 1]) === null || _unsortedTicks3 === void 0 ? void 0 : _unsortedTicks3.coordinate;
      var sameDirectionCoord = void 0;
      if (before == null || cur == null || after == null) {
        continue;
      }
      if (mathSign(cur - before) !== mathSign(after - cur)) {
        var diffInterval = [];
        if (mathSign(after - cur) === mathSign(range2[1] - range2[0])) {
          sameDirectionCoord = after;
          var curInRange = cur + range2[1] - range2[0];
          diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
          diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
        } else {
          sameDirectionCoord = before;
          var afterInRange = after + range2[1] - range2[0];
          diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
          diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
        }
        var sameInterval = [Math.min(cur, (sameDirectionCoord + cur) / 2), Math.max(cur, (sameDirectionCoord + cur) / 2)];
        if (isInside(sameInterval[0], sameInterval[1], false) || isInside(diffInterval[0], diffInterval[1], true)) {
          var _unsortedTicks$i2;
          return (_unsortedTicks$i2 = unsortedTicks[i]) === null || _unsortedTicks$i2 === void 0 ? void 0 : _unsortedTicks$i2.index;
        }
      } else {
        var minValue = Math.min(before, after);
        var maxValue = Math.max(before, after);
        if (isInside((minValue + cur) / 2, (maxValue + cur) / 2, false)) {
          var _unsortedTicks$i3;
          return (_unsortedTicks$i3 = unsortedTicks[i]) === null || _unsortedTicks$i3 === void 0 ? void 0 : _unsortedTicks$i3.index;
        }
      }
    }
  } else if (ticks2) {
    for (var _i = 0; _i < len; _i++) {
      var curr = ticks2[_i];
      if (curr == null) {
        continue;
      }
      var next = ticks2[_i + 1];
      var prev = ticks2[_i - 1];
      if (_i === 0 && next != null && coordinate <= (curr.coordinate + next.coordinate) / 2) {
        return curr.index;
      }
      if (_i === len - 1 && prev != null && coordinate > (curr.coordinate + prev.coordinate) / 2) {
        return curr.index;
      }
      if (_i > 0 && _i < len - 1 && prev != null && next != null && coordinate > (curr.coordinate + prev.coordinate) / 2 && coordinate <= (curr.coordinate + next.coordinate) / 2) {
        return curr.index;
      }
    }
  }
  return -1;
};
var useChartName = () => {
  return useAppSelector(selectChartName);
};
var pickTooltipEventType = (_state, tooltipEventType) => tooltipEventType;
var pickTrigger = (_state, _tooltipEventType, trigger) => trigger;
var pickDefaultIndex = (_state, _tooltipEventType, _trigger, defaultIndex) => defaultIndex;
var selectOrderedTooltipTicks = createSelector(selectTooltipAxisTicks, (ticks2) => sortBy$1(ticks2, (o) => o.coordinate));
var selectTooltipInteractionState = createSelector([selectTooltipState, pickTooltipEventType, pickTrigger, pickDefaultIndex], combineTooltipInteractionState);
var selectActiveIndex = createSelector([selectTooltipInteractionState, selectTooltipDisplayedData, selectTooltipAxisDataKey, selectTooltipAxisDomain], combineActiveTooltipIndex);
var selectTooltipDataKey = (state, tooltipEventType, trigger) => {
  if (tooltipEventType == null) {
    return void 0;
  }
  var tooltipState = selectTooltipState(state);
  if (tooltipEventType === "axis") {
    if (trigger === "hover") {
      return tooltipState.axisInteraction.hover.dataKey;
    }
    return tooltipState.axisInteraction.click.dataKey;
  }
  if (trigger === "hover") {
    return tooltipState.itemInteraction.hover.dataKey;
  }
  return tooltipState.itemInteraction.click.dataKey;
};
var selectTooltipPayloadConfigurations = createSelector([selectTooltipState, pickTooltipEventType, pickTrigger, pickDefaultIndex], combineTooltipPayloadConfigurations);
var selectCoordinateForDefaultIndex = createSelector([selectChartWidth, selectChartHeight, selectChartLayout, selectChartOffsetInternal, selectTooltipAxisTicks, pickDefaultIndex, selectTooltipPayloadConfigurations], combineCoordinateForDefaultIndex);
var selectActiveCoordinate = createSelector([selectTooltipInteractionState, selectCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
  var _tooltipInteractionSt;
  return (_tooltipInteractionSt = tooltipInteractionState.coordinate) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : defaultIndexCoordinate;
});
var selectActiveLabel = createSelector([selectTooltipAxisTicks, selectActiveIndex], combineActiveLabel);
var selectTooltipPayload = createSelector([selectTooltipPayloadConfigurations, selectActiveIndex, selectChartDataWithIndexes, selectTooltipAxisDataKey, selectActiveLabel, selectTooltipPayloadSearcher, pickTooltipEventType], combineTooltipPayload);
var selectIsTooltipActive = createSelector([selectTooltipInteractionState, selectActiveIndex], (tooltipInteractionState, activeIndex) => {
  return {
    isActive: tooltipInteractionState.active && activeIndex != null,
    activeIndex
  };
});
var combineActiveCartesianProps = (chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
  if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) {
    return void 0;
  }
  if (!isInCartesianRange(chartEvent, offset)) {
    return void 0;
  }
  var pos = calculateCartesianTooltipPos(chartEvent, layout);
  var activeIndex = calculateActiveTickIndex(pos, orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
  var activeCoordinate = getActiveCartesianCoordinate(layout, tooltipTicks, activeIndex, chartEvent);
  return {
    activeIndex: String(activeIndex),
    activeCoordinate
  };
};
var combineActivePolarProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks) => {
  if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks || !polarViewBox) {
    return void 0;
  }
  var rangeObj = inRangeOfSector(chartEvent, polarViewBox);
  if (!rangeObj) {
    return void 0;
  }
  var pos = calculatePolarTooltipPos(rangeObj, layout);
  var activeIndex = calculateActiveTickIndex(pos, orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
  var activeCoordinate = getActivePolarCoordinate(layout, tooltipTicks, activeIndex, rangeObj);
  return {
    activeIndex: String(activeIndex),
    activeCoordinate
  };
};
var combineActiveProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
  if (!chartEvent || !layout || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) {
    return void 0;
  }
  if (layout === "horizontal" || layout === "vertical") {
    return combineActiveCartesianProps(chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset);
  }
  return combineActivePolarProps(chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks);
};
var selectZIndexPortalElement = createSelector((state) => state.zIndex.zIndexMap, (_, zIndex) => zIndex, (_, _zIndex, isPanorama) => isPanorama, (zIndexMap, zIndex, isPanorama) => {
  if (zIndex == null) {
    return void 0;
  }
  var entry = zIndexMap[zIndex];
  if (entry == null) {
    return void 0;
  }
  if (isPanorama) {
    return entry.panoramaElement;
  }
  return entry.element;
});
var selectAllRegisteredZIndexes = createSelector((state) => state.zIndex.zIndexMap, (zIndexMap) => {
  var allNumbers = Object.keys(zIndexMap).map((zIndexStr) => parseInt(zIndexStr, 10)).concat(Object.values(DefaultZIndexes));
  var uniqueNumbers = Array.from(new Set(allNumbers));
  return uniqueNumbers.sort((a2, b) => a2 - b);
}, {
  memoizeOptions: {
    resultEqualityCheck: arrayContentsAreEqualCheck
  }
});
function ownKeys$o(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$o(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$o(Object(t), true).forEach(function(r2) {
      _defineProperty$q(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$o(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$q(e, r, t) {
  return (r = _toPropertyKey$q(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$q(t) {
  var i = _toPrimitive$q(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$q(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var seed = {};
var initialState$a = {
  zIndexMap: Object.values(DefaultZIndexes).reduce((acc, current2) => _objectSpread$o(_objectSpread$o({}, acc), {}, {
    [current2]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), seed)
};
var defaultZIndexSet = new Set(Object.values(DefaultZIndexes));
function isDefaultZIndex(zIndex) {
  return defaultZIndexSet.has(zIndex);
}
var zIndexSlice = createSlice({
  name: "zIndex",
  initialState: initialState$a,
  reducers: {
    registerZIndexPortal: {
      reducer: (state, action) => {
        var zIndex = action.payload.zIndex;
        if (state.zIndexMap[zIndex]) {
          state.zIndexMap[zIndex].consumers += 1;
        } else {
          state.zIndexMap[zIndex] = {
            consumers: 1,
            element: void 0,
            panoramaElement: void 0
          };
        }
      },
      prepare: prepareAutoBatched()
    },
    unregisterZIndexPortal: {
      reducer: (state, action) => {
        var zIndex = action.payload.zIndex;
        if (state.zIndexMap[zIndex]) {
          state.zIndexMap[zIndex].consumers -= 1;
          if (state.zIndexMap[zIndex].consumers <= 0 && !isDefaultZIndex(zIndex)) {
            delete state.zIndexMap[zIndex];
          }
        }
      },
      prepare: prepareAutoBatched()
    },
    registerZIndexPortalElement: {
      reducer: (state, action) => {
        var _action$payload = action.payload, zIndex = _action$payload.zIndex, element = _action$payload.element, isPanorama = _action$payload.isPanorama;
        if (state.zIndexMap[zIndex]) {
          if (isPanorama) {
            state.zIndexMap[zIndex].panoramaElement = castDraft(element);
          } else {
            state.zIndexMap[zIndex].element = castDraft(element);
          }
        } else {
          state.zIndexMap[zIndex] = {
            consumers: 0,
            element: isPanorama ? void 0 : castDraft(element),
            panoramaElement: isPanorama ? castDraft(element) : void 0
          };
        }
      },
      prepare: prepareAutoBatched()
    },
    unregisterZIndexPortalElement: {
      reducer: (state, action) => {
        var zIndex = action.payload.zIndex;
        if (state.zIndexMap[zIndex]) {
          if (action.payload.isPanorama) {
            state.zIndexMap[zIndex].panoramaElement = void 0;
          } else {
            state.zIndexMap[zIndex].element = void 0;
          }
        }
      },
      prepare: prepareAutoBatched()
    }
  }
});
var _zIndexSlice$actions = zIndexSlice.actions, registerZIndexPortal = _zIndexSlice$actions.registerZIndexPortal, unregisterZIndexPortal = _zIndexSlice$actions.unregisterZIndexPortal, registerZIndexPortalElement = _zIndexSlice$actions.registerZIndexPortalElement, unregisterZIndexPortalElement = _zIndexSlice$actions.unregisterZIndexPortalElement;
var zIndexReducer = zIndexSlice.reducer;
function ZIndexLayer(_ref2) {
  var zIndex = _ref2.zIndex, children = _ref2.children;
  var isInChartContext = useIsInChartContext();
  var shouldRenderInPortal = isInChartContext && zIndex !== void 0 && zIndex !== 0;
  var isPanorama = useIsPanorama();
  var lastPortalElementRef = reactExports.useRef(void 0);
  var registeredZIndexesRef = reactExports.useRef(/* @__PURE__ */ new Set());
  var dispatch = useAppDispatch();
  var portalElement = useAppSelector((state) => selectZIndexPortalElement(state, zIndex, isPanorama));
  reactExports.useLayoutEffect(() => {
    if (!shouldRenderInPortal) {
      var registered = registeredZIndexesRef.current;
      registered.forEach((z) => {
        dispatch(unregisterZIndexPortal({
          zIndex: z
        }));
      });
      registered.clear();
      lastPortalElementRef.current = void 0;
      return;
    }
    if (!registeredZIndexesRef.current.has(zIndex)) {
      dispatch(registerZIndexPortal({
        zIndex
      }));
      registeredZIndexesRef.current.add(zIndex);
    }
    if (portalElement) {
      lastPortalElementRef.current = portalElement;
      var _registered = registeredZIndexesRef.current;
      _registered.forEach((z) => {
        if (z !== zIndex) {
          dispatch(unregisterZIndexPortal({
            zIndex: z
          }));
          _registered.delete(z);
        }
      });
    }
  }, [dispatch, zIndex, shouldRenderInPortal, portalElement]);
  reactExports.useLayoutEffect(() => {
    var registered = registeredZIndexesRef.current;
    return () => {
      registered.forEach((z) => {
        dispatch(unregisterZIndexPortal({
          zIndex: z
        }));
      });
      registered.clear();
    };
  }, [dispatch]);
  if (!shouldRenderInPortal) {
    return children;
  }
  var targetElement = portalElement !== null && portalElement !== void 0 ? portalElement : lastPortalElementRef.current;
  if (!targetElement) {
    return null;
  }
  return /* @__PURE__ */ reactDomExports.createPortal(children, targetElement);
}
function _extends$k() {
  return _extends$k = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$k.apply(null, arguments);
}
function ownKeys$n(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$n(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$n(Object(t), true).forEach(function(r2) {
      _defineProperty$p(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$n(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$p(e, r, t) {
  return (r = _toPropertyKey$p(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$p(t) {
  var i = _toPrimitive$p(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$p(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function RenderCursor(_ref2) {
  var cursor = _ref2.cursor, cursorComp = _ref2.cursorComp, cursorProps = _ref2.cursorProps;
  if (/* @__PURE__ */ reactExports.isValidElement(cursor)) {
    return /* @__PURE__ */ reactExports.cloneElement(cursor, cursorProps);
  }
  return /* @__PURE__ */ reactExports.createElement(cursorComp, cursorProps);
}
function CursorInternal(props) {
  var _props$zIndex;
  var coordinate = props.coordinate, payload = props.payload, index = props.index, offset = props.offset, tooltipAxisBandSize = props.tooltipAxisBandSize, layout = props.layout, cursor = props.cursor, tooltipEventType = props.tooltipEventType, chartName = props.chartName;
  var activeCoordinate = coordinate;
  var activePayload = payload;
  var activeTooltipIndex = index;
  if (!cursor || !activeCoordinate || chartName !== "ScatterChart" && tooltipEventType !== "axis") {
    return null;
  }
  var restProps, cursorComp, preferredZIndex;
  if (chartName === "ScatterChart") {
    restProps = activeCoordinate;
    cursorComp = Cross;
    preferredZIndex = DefaultZIndexes.cursorLine;
  } else if (chartName === "BarChart") {
    restProps = getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize);
    cursorComp = Rectangle;
    preferredZIndex = DefaultZIndexes.cursorRectangle;
  } else if (layout === "radial" && isPolarCoordinate(activeCoordinate)) {
    var _getRadialCursorPoint = getRadialCursorPoints(activeCoordinate), cx = _getRadialCursorPoint.cx, cy = _getRadialCursorPoint.cy, radius = _getRadialCursorPoint.radius, startAngle = _getRadialCursorPoint.startAngle, endAngle = _getRadialCursorPoint.endAngle;
    restProps = {
      cx,
      cy,
      startAngle,
      endAngle,
      innerRadius: radius,
      outerRadius: radius
    };
    cursorComp = Sector;
    preferredZIndex = DefaultZIndexes.cursorLine;
  } else {
    restProps = {
      points: getCursorPoints(layout, activeCoordinate, offset)
    };
    cursorComp = Curve;
    preferredZIndex = DefaultZIndexes.cursorLine;
  }
  var extraClassName = typeof cursor === "object" && "className" in cursor ? cursor.className : void 0;
  var cursorProps = _objectSpread$n(_objectSpread$n(_objectSpread$n(_objectSpread$n({
    stroke: "#ccc",
    pointerEvents: "none"
  }, offset), restProps), svgPropertiesNoEventsFromUnknown(cursor)), {}, {
    payload: activePayload,
    payloadIndex: activeTooltipIndex,
    className: clsx("recharts-tooltip-cursor", extraClassName)
  });
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: (_props$zIndex = props.zIndex) !== null && _props$zIndex !== void 0 ? _props$zIndex : preferredZIndex
  }, /* @__PURE__ */ reactExports.createElement(RenderCursor, {
    cursor,
    cursorComp,
    cursorProps
  }));
}
function Cursor(props) {
  var tooltipAxisBandSize = useTooltipAxisBandSize();
  var offset = useOffsetInternal();
  var layout = useChartLayout();
  var chartName = useChartName();
  if (tooltipAxisBandSize == null || offset == null || layout == null || chartName == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(CursorInternal, _extends$k({}, props, {
    offset,
    layout,
    tooltipAxisBandSize,
    chartName
  }));
}
var TooltipPortalContext = /* @__PURE__ */ reactExports.createContext(null);
var useTooltipPortal = () => reactExports.useContext(TooltipPortalContext);
var eventemitter3 = { exports: {} };
var hasRequiredEventemitter3;
function requireEventemitter3() {
  if (hasRequiredEventemitter3) return eventemitter3.exports;
  hasRequiredEventemitter3 = 1;
  (function(module) {
    var has2 = Object.prototype.hasOwnProperty, prefix2 = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix2 = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener2(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener2 = new EE(fn, context || emitter, once), evt = prefix2 ? prefix2 + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener2, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener2);
      else emitter._events[evt] = [emitter._events[evt], listener2];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has2.call(events, name)) names.push(prefix2 ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix2 ? prefix2 + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix2 ? prefix2 + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix2 ? prefix2 + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener2(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener2(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener2(event, fn, context, once) {
      var evt = prefix2 ? prefix2 + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix2 ? prefix2 + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix2;
    EventEmitter2.EventEmitter = EventEmitter2;
    {
      module.exports = EventEmitter2;
    }
  })(eventemitter3);
  return eventemitter3.exports;
}
var eventemitter3Exports = requireEventemitter3();
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
var eventCenter = new EventEmitter();
var TOOLTIP_SYNC_EVENT = "recharts.syncEvent.tooltip";
var BRUSH_SYNC_EVENT = "recharts.syncEvent.brush";
var arrayTooltipSearcher = (data, strIndex) => {
  if (!strIndex) return void 0;
  if (!Array.isArray(data)) return void 0;
  var numIndex = Number.parseInt(strIndex, 10);
  if (isNan(numIndex)) {
    return void 0;
  }
  return data[numIndex];
};
var initialState$9 = {
  chartName: "",
  tooltipPayloadSearcher: () => void 0,
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
};
var optionsSlice = createSlice({
  name: "options",
  initialState: initialState$9,
  reducers: {
    createEventEmitter: (state) => {
      if (state.eventEmitter == null) {
        state.eventEmitter = /* @__PURE__ */ Symbol("rechartsEventEmitter");
      }
    }
  }
});
var optionsReducer = optionsSlice.reducer;
var createEventEmitter = optionsSlice.actions.createEventEmitter;
function selectSynchronisedTooltipState(state) {
  return state.tooltip.syncInteraction;
}
var initialChartDataState = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
};
var chartDataSlice = createSlice({
  name: "chartData",
  initialState: initialChartDataState,
  reducers: {
    setChartData(state, action) {
      state.chartData = castDraft(action.payload);
      if (action.payload == null) {
        state.dataStartIndex = 0;
        state.dataEndIndex = 0;
        return;
      }
      if (action.payload.length > 0 && state.dataEndIndex !== action.payload.length - 1) {
        state.dataEndIndex = action.payload.length - 1;
      }
    },
    setComputedData(state, action) {
      state.computedData = action.payload;
    },
    setDataStartEndIndexes(state, action) {
      var _action$payload = action.payload, startIndex = _action$payload.startIndex, endIndex = _action$payload.endIndex;
      if (startIndex != null) {
        state.dataStartIndex = startIndex;
      }
      if (endIndex != null) {
        state.dataEndIndex = endIndex;
      }
    }
  }
});
var _chartDataSlice$actio = chartDataSlice.actions, setChartData = _chartDataSlice$actio.setChartData, setDataStartEndIndexes = _chartDataSlice$actio.setDataStartEndIndexes;
_chartDataSlice$actio.setComputedData;
var chartDataReducer = chartDataSlice.reducer;
var _excluded$l = ["x", "y"];
function ownKeys$m(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$m(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$m(Object(t), true).forEach(function(r2) {
      _defineProperty$o(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$m(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$o(e, r, t) {
  return (r = _toPropertyKey$o(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$o(t) {
  var i = _toPrimitive$o(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$o(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$l(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$l(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$l(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function useTooltipSyncEventsListener() {
  var mySyncId = useAppSelector(selectSyncId);
  var myEventEmitter = useAppSelector(selectEventEmitter);
  var dispatch = useAppDispatch();
  var syncMethod = useAppSelector(selectSyncMethod);
  var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
  var layout = useChartLayout();
  var viewBox = useViewBox();
  var className = useAppSelector((state) => state.rootProps.className);
  reactExports.useEffect(() => {
    if (mySyncId == null) {
      return noop$5;
    }
    var listener2 = (incomingSyncId, action, emitter) => {
      if (myEventEmitter === emitter) {
        return;
      }
      if (mySyncId !== incomingSyncId) {
        return;
      }
      if (action.payload.active === false) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0,
          sourceViewBox: void 0,
          graphicalItemId: void 0
        }));
        return;
      }
      if (syncMethod === "index") {
        var _action$payload;
        if (viewBox && action !== null && action !== void 0 && (_action$payload = action.payload) !== null && _action$payload !== void 0 && _action$payload.coordinate && action.payload.sourceViewBox) {
          var _action$payload$coord = action.payload.coordinate, _x = _action$payload$coord.x, _y = _action$payload$coord.y, otherCoordinateProps = _objectWithoutProperties$l(_action$payload$coord, _excluded$l);
          var _action$payload$sourc = action.payload.sourceViewBox, sourceX = _action$payload$sourc.x, sourceY = _action$payload$sourc.y, sourceWidth = _action$payload$sourc.width, sourceHeight = _action$payload$sourc.height;
          var scaledCoordinate = _objectSpread$m(_objectSpread$m({}, otherCoordinateProps), {}, {
            x: viewBox.x + (sourceWidth ? (_x - sourceX) / sourceWidth : 0) * viewBox.width,
            y: viewBox.y + (sourceHeight ? (_y - sourceY) / sourceHeight : 0) * viewBox.height
          });
          dispatch(_objectSpread$m(_objectSpread$m({}, action), {}, {
            payload: _objectSpread$m(_objectSpread$m({}, action.payload), {}, {
              coordinate: scaledCoordinate
            })
          }));
        } else {
          dispatch(action);
        }
        return;
      }
      if (tooltipTicks == null) {
        return;
      }
      var activeTick;
      if (typeof syncMethod === "function") {
        var syncMethodParam = {
          activeTooltipIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
          isTooltipActive: action.payload.active,
          activeIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
          activeLabel: action.payload.label,
          activeDataKey: action.payload.dataKey,
          activeCoordinate: action.payload.coordinate
        };
        var activeTooltipIndex = syncMethod(tooltipTicks, syncMethodParam);
        activeTick = tooltipTicks[activeTooltipIndex];
      } else if (syncMethod === "value") {
        activeTick = tooltipTicks.find((tick) => String(tick.value) === action.payload.label);
      }
      var coordinate = action.payload.coordinate;
      if (coordinate == null || viewBox == null) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0,
          sourceViewBox: void 0,
          graphicalItemId: void 0
        }));
        return;
      }
      if (activeTick == null) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0,
          sourceViewBox: action.payload.sourceViewBox,
          graphicalItemId: void 0
        }));
        return;
      }
      var x2 = coordinate.x, y2 = coordinate.y;
      var validateChartX = Math.min(x2, viewBox.x + viewBox.width);
      var validateChartY = Math.min(y2, viewBox.y + viewBox.height);
      var activeCoordinate = {
        x: layout === "horizontal" ? activeTick.coordinate : validateChartX,
        y: layout === "horizontal" ? validateChartY : activeTick.coordinate
      };
      var syncAction = setSyncInteraction({
        active: action.payload.active,
        coordinate: activeCoordinate,
        dataKey: action.payload.dataKey,
        index: String(activeTick.index),
        label: action.payload.label,
        sourceViewBox: action.payload.sourceViewBox,
        graphicalItemId: action.payload.graphicalItemId
      });
      dispatch(syncAction);
    };
    eventCenter.on(TOOLTIP_SYNC_EVENT, listener2);
    return () => {
      eventCenter.off(TOOLTIP_SYNC_EVENT, listener2);
    };
  }, [className, dispatch, myEventEmitter, mySyncId, syncMethod, tooltipTicks, layout, viewBox]);
}
function useBrushSyncEventsListener() {
  var mySyncId = useAppSelector(selectSyncId);
  var myEventEmitter = useAppSelector(selectEventEmitter);
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    if (mySyncId == null) {
      return noop$5;
    }
    var listener2 = (incomingSyncId, action, emitter) => {
      if (myEventEmitter === emitter) {
        return;
      }
      if (mySyncId === incomingSyncId) {
        dispatch(setDataStartEndIndexes(action));
      }
    };
    eventCenter.on(BRUSH_SYNC_EVENT, listener2);
    return () => {
      eventCenter.off(BRUSH_SYNC_EVENT, listener2);
    };
  }, [dispatch, myEventEmitter, mySyncId]);
}
function useSynchronisedEventsFromOtherCharts() {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(createEventEmitter());
  }, [dispatch]);
  useTooltipSyncEventsListener();
  useBrushSyncEventsListener();
}
function useTooltipChartSynchronisation(tooltipEventType, trigger, activeCoordinate, activeLabel, activeIndex, isTooltipActive) {
  var activeDataKey = useAppSelector((state) => selectTooltipDataKey(state, tooltipEventType, trigger));
  var activeGraphicalItemId = useAppSelector(selectActiveTooltipGraphicalItemId);
  var eventEmitterSymbol = useAppSelector(selectEventEmitter);
  var syncId = useAppSelector(selectSyncId);
  var syncMethod = useAppSelector(selectSyncMethod);
  var tooltipState = useAppSelector(selectSynchronisedTooltipState);
  var isReceivingSynchronisation = (tooltipState === null || tooltipState === void 0 ? void 0 : tooltipState.sourceViewBox) != null;
  var viewBox = useViewBox();
  reactExports.useEffect(() => {
    if (isReceivingSynchronisation) {
      return;
    }
    if (syncId == null) {
      return;
    }
    if (eventEmitterSymbol == null) {
      return;
    }
    var syncAction = setSyncInteraction({
      active: isTooltipActive,
      coordinate: activeCoordinate,
      dataKey: activeDataKey,
      index: activeIndex,
      label: typeof activeLabel === "number" ? String(activeLabel) : activeLabel,
      sourceViewBox: viewBox,
      graphicalItemId: activeGraphicalItemId
    });
    eventCenter.emit(TOOLTIP_SYNC_EVENT, syncId, syncAction, eventEmitterSymbol);
  }, [isReceivingSynchronisation, activeCoordinate, activeDataKey, activeGraphicalItemId, activeIndex, activeLabel, eventEmitterSymbol, syncId, syncMethod, isTooltipActive, viewBox]);
}
function ownKeys$l(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$l(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$l(Object(t), true).forEach(function(r2) {
      _defineProperty$n(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$l(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$n(e, r, t) {
  return (r = _toPropertyKey$n(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$n(t) {
  var i = _toPrimitive$n(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$n(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$b(r, e) {
  return _arrayWithHoles$b(r) || _iterableToArrayLimit$b(r, e) || _unsupportedIterableToArray$b(r, e) || _nonIterableRest$b();
}
function _nonIterableRest$b() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$b(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$b(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$b(r, a2) : void 0;
  }
}
function _arrayLikeToArray$b(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$b(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$b(r) {
  if (Array.isArray(r)) return r;
}
function defaultUniqBy(entry) {
  return entry.dataKey;
}
function renderContent(content, props) {
  if (/* @__PURE__ */ reactExports.isValidElement(content)) {
    return /* @__PURE__ */ reactExports.cloneElement(content, props);
  }
  if (typeof content === "function") {
    return /* @__PURE__ */ reactExports.createElement(content, props);
  }
  return /* @__PURE__ */ reactExports.createElement(DefaultTooltipContent, props);
}
var emptyPayload = [];
var defaultTooltipProps = {
  allowEscapeViewBox: {
    x: false,
    y: false
  },
  animationDuration: 400,
  animationEasing: "ease",
  axisId: 0,
  contentStyle: {},
  cursor: true,
  filterNull: true,
  includeHidden: false,
  isAnimationActive: "auto",
  itemSorter: "name",
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: false,
    y: false
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: false,
  wrapperStyle: {}
};
function Tooltip(outsideProps) {
  var _useAppSelector, _ref2;
  var props = resolveDefaultProps(outsideProps, defaultTooltipProps);
  var activeFromProps = props.active, allowEscapeViewBox = props.allowEscapeViewBox, animationDuration = props.animationDuration, animationEasing = props.animationEasing, content = props.content, filterNull = props.filterNull, isAnimationActive = props.isAnimationActive, offset = props.offset, payloadUniqBy = props.payloadUniqBy, position = props.position, reverseDirection = props.reverseDirection, useTranslate3d = props.useTranslate3d, wrapperStyle = props.wrapperStyle, cursor = props.cursor, shared = props.shared, trigger = props.trigger, defaultIndex = props.defaultIndex, portalFromProps = props.portal, axisId = props.axisId;
  var dispatch = useAppDispatch();
  var defaultIndexAsString = typeof defaultIndex === "number" ? String(defaultIndex) : defaultIndex;
  reactExports.useEffect(() => {
    dispatch(setTooltipSettingsState({
      shared,
      trigger,
      axisId,
      active: activeFromProps,
      defaultIndex: defaultIndexAsString
    }));
  }, [dispatch, shared, trigger, axisId, activeFromProps, defaultIndexAsString]);
  var viewBox = useViewBox();
  var accessibilityLayer = useAccessibilityLayer();
  var tooltipEventType = useTooltipEventType(shared);
  var _ref3 = (_useAppSelector = useAppSelector((state) => selectIsTooltipActive(state, tooltipEventType, trigger, defaultIndexAsString))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {}, activeIndex = _ref3.activeIndex, isActive = _ref3.isActive;
  var payloadFromRedux = useAppSelector((state) => selectTooltipPayload(state, tooltipEventType, trigger, defaultIndexAsString));
  var labelFromRedux = useAppSelector((state) => selectActiveLabel(state, tooltipEventType, trigger, defaultIndexAsString));
  var coordinate = useAppSelector((state) => selectActiveCoordinate(state, tooltipEventType, trigger, defaultIndexAsString));
  var payload = payloadFromRedux;
  var tooltipPortalFromContext = useTooltipPortal();
  var finalIsActive = (_ref2 = activeFromProps !== null && activeFromProps !== void 0 ? activeFromProps : isActive) !== null && _ref2 !== void 0 ? _ref2 : false;
  var _useElementOffset = useElementOffset([payload, finalIsActive]), _useElementOffset2 = _slicedToArray$b(_useElementOffset, 2), lastBoundingBox = _useElementOffset2[0], updateBoundingBox = _useElementOffset2[1];
  var finalLabel = tooltipEventType === "axis" ? labelFromRedux : void 0;
  useTooltipChartSynchronisation(tooltipEventType, trigger, coordinate, finalLabel, activeIndex, finalIsActive);
  var tooltipPortal = portalFromProps !== null && portalFromProps !== void 0 ? portalFromProps : tooltipPortalFromContext;
  if (tooltipPortal == null || viewBox == null || tooltipEventType == null) {
    return null;
  }
  var finalPayload = payload !== null && payload !== void 0 ? payload : emptyPayload;
  if (!finalIsActive) {
    finalPayload = emptyPayload;
  }
  if (filterNull && finalPayload.length) {
    finalPayload = getUniqPayload(finalPayload.filter((entry) => entry.value != null && (entry.hide !== true || props.includeHidden)), payloadUniqBy, defaultUniqBy);
  }
  var hasPayload = finalPayload.length > 0;
  var tooltipContentProps = _objectSpread$l(_objectSpread$l({}, props), {}, {
    payload: finalPayload,
    label: finalLabel,
    active: finalIsActive,
    activeIndex,
    coordinate,
    accessibilityLayer
  });
  var tooltipElement = /* @__PURE__ */ reactExports.createElement(TooltipBoundingBox, {
    allowEscapeViewBox,
    animationDuration,
    animationEasing,
    isAnimationActive,
    active: finalIsActive,
    coordinate,
    hasPayload,
    offset,
    position,
    reverseDirection,
    useTranslate3d,
    viewBox,
    wrapperStyle,
    lastBoundingBox,
    innerRef: updateBoundingBox,
    hasPortalFromProps: Boolean(portalFromProps)
  }, renderContent(content, tooltipContentProps));
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactDomExports.createPortal(tooltipElement, tooltipPortal), finalIsActive && /* @__PURE__ */ reactExports.createElement(Cursor, {
    cursor,
    tooltipEventType,
    coordinate,
    payload: finalPayload,
    index: activeIndex
  }));
}
var Cell = (_props) => null;
Cell.displayName = "Cell";
function _defineProperty$m(e, r, t) {
  return (r = _toPropertyKey$m(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$m(t) {
  var i = _toPrimitive$m(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$m(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
class LRUCache {
  constructor(maxSize) {
    _defineProperty$m(this, "cache", /* @__PURE__ */ new Map());
    this.maxSize = maxSize;
  }
  get(key) {
    var value = this.cache.get(key);
    if (value !== void 0) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      var firstKey = this.cache.keys().next().value;
      if (firstKey != null) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function ownKeys$k(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$k(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$k(Object(t), true).forEach(function(r2) {
      _defineProperty$l(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$k(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$l(e, r, t) {
  return (r = _toPropertyKey$l(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$l(t) {
  var i = _toPrimitive$l(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$l(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultConfig = {
  cacheSize: 2e3,
  enableCache: true
};
var currentConfig = _objectSpread$k({}, defaultConfig);
var stringCache = new LRUCache(currentConfig.cacheSize);
var SPAN_STYLE = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
};
var MEASUREMENT_SPAN_ID = "recharts_measurement_span";
function createCacheKey(text, style) {
  var fontSize = style.fontSize || "";
  var fontFamily = style.fontFamily || "";
  var fontWeight = style.fontWeight || "";
  var fontStyle = style.fontStyle || "";
  var letterSpacing = style.letterSpacing || "";
  var textTransform = style.textTransform || "";
  return "".concat(text, "|").concat(fontSize, "|").concat(fontFamily, "|").concat(fontWeight, "|").concat(fontStyle, "|").concat(letterSpacing, "|").concat(textTransform);
}
var measureTextWithDOM = (text, style) => {
  try {
    var measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
    if (!measurementSpan) {
      measurementSpan = document.createElement("span");
      measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
      measurementSpan.setAttribute("aria-hidden", "true");
      document.body.appendChild(measurementSpan);
    }
    Object.assign(measurementSpan.style, SPAN_STYLE, style);
    measurementSpan.textContent = "".concat(text);
    var rect = measurementSpan.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  } catch (_unused) {
    return {
      width: 0,
      height: 0
    };
  }
};
var getStringSize = function getStringSize2(text) {
  var style = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (text === void 0 || text === null || Global.isSsr) {
    return {
      width: 0,
      height: 0
    };
  }
  if (!currentConfig.enableCache) {
    return measureTextWithDOM(text, style);
  }
  var cacheKey = createCacheKey(text, style);
  var cachedResult = stringCache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }
  var result = measureTextWithDOM(text, style);
  stringCache.set(cacheKey, result);
  return result;
};
var _DecimalCSS;
function _slicedToArray$a(r, e) {
  return _arrayWithHoles$a(r) || _iterableToArrayLimit$a(r, e) || _unsupportedIterableToArray$a(r, e) || _nonIterableRest$a();
}
function _nonIterableRest$a() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$a(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$a(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$a(r, a2) : void 0;
  }
}
function _arrayLikeToArray$a(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$a(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$a(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty$k(e, r, t) {
  return (r = _toPropertyKey$k(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$k(t) {
  var i = _toPrimitive$k(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$k(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var MULTIPLY_OR_DIVIDE_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var ADD_OR_SUBTRACT_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var CSS_LENGTH_UNIT_REGEX = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/;
var NUM_SPLIT_REGEX = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/;
var CONVERSION_RATES = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
};
var FIXED_CSS_LENGTH_UNITS = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function isSupportedUnit(unit2) {
  return FIXED_CSS_LENGTH_UNITS.includes(unit2);
}
var STR_NAN = "NaN";
function convertToPx(value, unit2) {
  return value * CONVERSION_RATES[unit2];
}
class DecimalCSS {
  static parse(str) {
    var _NUM_SPLIT_REGEX$exec;
    var _ref2 = (_NUM_SPLIT_REGEX$exec = NUM_SPLIT_REGEX.exec(str)) !== null && _NUM_SPLIT_REGEX$exec !== void 0 ? _NUM_SPLIT_REGEX$exec : [], _ref22 = _slicedToArray$a(_ref2, 3), numStr = _ref22[1], unit2 = _ref22[2];
    if (numStr == null) {
      return DecimalCSS.NaN;
    }
    return new DecimalCSS(parseFloat(numStr), unit2 !== null && unit2 !== void 0 ? unit2 : "");
  }
  constructor(num, unit2) {
    this.num = num;
    this.unit = unit2;
    this.num = num;
    this.unit = unit2;
    if (isNan(num)) {
      this.unit = "";
    }
    if (unit2 !== "" && !CSS_LENGTH_UNIT_REGEX.test(unit2)) {
      this.num = NaN;
      this.unit = "";
    }
    if (isSupportedUnit(unit2)) {
      this.num = convertToPx(num, unit2);
      this.unit = "px";
    }
  }
  add(other) {
    if (this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num + other.num, this.unit);
  }
  subtract(other) {
    if (this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num - other.num, this.unit);
  }
  multiply(other) {
    if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num * other.num, this.unit || other.unit);
  }
  divide(other) {
    if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num / other.num, this.unit || other.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return isNan(this.num);
  }
}
_DecimalCSS = DecimalCSS;
_defineProperty$k(DecimalCSS, "NaN", new _DecimalCSS(NaN, ""));
function calculateArithmetic(expr) {
  if (expr == null || expr.includes(STR_NAN)) {
    return STR_NAN;
  }
  var newExpr = expr;
  while (newExpr.includes("*") || newExpr.includes("/")) {
    var _MULTIPLY_OR_DIVIDE_R;
    var _ref3 = (_MULTIPLY_OR_DIVIDE_R = MULTIPLY_OR_DIVIDE_REGEX.exec(newExpr)) !== null && _MULTIPLY_OR_DIVIDE_R !== void 0 ? _MULTIPLY_OR_DIVIDE_R : [], _ref4 = _slicedToArray$a(_ref3, 4), leftOperand = _ref4[1], operator = _ref4[2], rightOperand = _ref4[3];
    var lTs = DecimalCSS.parse(leftOperand !== null && leftOperand !== void 0 ? leftOperand : "");
    var rTs = DecimalCSS.parse(rightOperand !== null && rightOperand !== void 0 ? rightOperand : "");
    var result = operator === "*" ? lTs.multiply(rTs) : lTs.divide(rTs);
    if (result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(MULTIPLY_OR_DIVIDE_REGEX, result.toString());
  }
  while (newExpr.includes("+") || /.-\d+(?:\.\d+)?/.test(newExpr)) {
    var _ADD_OR_SUBTRACT_REGE;
    var _ref5 = (_ADD_OR_SUBTRACT_REGE = ADD_OR_SUBTRACT_REGEX.exec(newExpr)) !== null && _ADD_OR_SUBTRACT_REGE !== void 0 ? _ADD_OR_SUBTRACT_REGE : [], _ref6 = _slicedToArray$a(_ref5, 4), _leftOperand = _ref6[1], _operator = _ref6[2], _rightOperand = _ref6[3];
    var _lTs = DecimalCSS.parse(_leftOperand !== null && _leftOperand !== void 0 ? _leftOperand : "");
    var _rTs = DecimalCSS.parse(_rightOperand !== null && _rightOperand !== void 0 ? _rightOperand : "");
    var _result = _operator === "+" ? _lTs.add(_rTs) : _lTs.subtract(_rTs);
    if (_result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(ADD_OR_SUBTRACT_REGEX, _result.toString());
  }
  return newExpr;
}
var PARENTHESES_REGEX = /\(([^()]*)\)/;
function calculateParentheses(expr) {
  var newExpr = expr;
  var match;
  while ((match = PARENTHESES_REGEX.exec(newExpr)) != null) {
    var _match = match, _match2 = _slicedToArray$a(_match, 2), parentheticalExpression = _match2[1];
    newExpr = newExpr.replace(PARENTHESES_REGEX, calculateArithmetic(parentheticalExpression));
  }
  return newExpr;
}
function evaluateExpression(expression) {
  var newExpr = expression.replace(/\s+/g, "");
  newExpr = calculateParentheses(newExpr);
  newExpr = calculateArithmetic(newExpr);
  return newExpr;
}
function safeEvaluateExpression(expression) {
  try {
    return evaluateExpression(expression);
  } catch (_unused) {
    return STR_NAN;
  }
}
function reduceCSSCalc(expression) {
  var result = safeEvaluateExpression(expression.slice(5, -1));
  if (result === STR_NAN) {
    return "";
  }
  return result;
}
var _excluded$k = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], _excluded2$b = ["dx", "dy", "angle", "className", "breakAll"];
function _extends$j() {
  return _extends$j = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$j.apply(null, arguments);
}
function _objectWithoutProperties$k(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$k(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$k(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _slicedToArray$9(r, e) {
  return _arrayWithHoles$9(r) || _iterableToArrayLimit$9(r, e) || _unsupportedIterableToArray$9(r, e) || _nonIterableRest$9();
}
function _nonIterableRest$9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$9(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$9(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$9(r, a2) : void 0;
  }
}
function _arrayLikeToArray$9(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$9(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$9(r) {
  if (Array.isArray(r)) return r;
}
var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
var calculateWordWidths = (_ref2) => {
  var children = _ref2.children, breakAll = _ref2.breakAll, style = _ref2.style;
  try {
    var words = [];
    if (!isNullish(children)) {
      if (breakAll) {
        words = children.toString().split("");
      } else {
        words = children.toString().split(BREAKING_SPACES);
      }
    }
    var wordsWithComputedWidth = words.map((word) => ({
      word,
      width: getStringSize(word, style).width
    }));
    var spaceWidth = breakAll ? 0 : getStringSize(" ", style).width;
    return {
      wordsWithComputedWidth,
      spaceWidth
    };
  } catch (_unused) {
    return null;
  }
};
function isValidTextAnchor(value) {
  return value === "start" || value === "middle" || value === "end" || value === "inherit";
}
function isRenderableText(val) {
  return isNullish(val) || typeof val === "string" || typeof val === "number" || typeof val === "boolean";
}
var calculate = (words, lineWidth, spaceWidth, scaleToFit) => words.reduce((result, _ref2) => {
  var word = _ref2.word, width = _ref2.width;
  var currentLine = result[result.length - 1];
  if (currentLine && width != null && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
    currentLine.words.push(word);
    currentLine.width += width + spaceWidth;
  } else {
    var newLine = {
      words: [word],
      width
    };
    result.push(newLine);
  }
  return result;
}, []);
var findLongestLine = (words) => words.reduce((a2, b) => a2.width > b.width ? a2 : b);
var suffix = "…";
var checkOverflow = (text, index, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit) => {
  var tempText = text.slice(0, index);
  var words = calculateWordWidths({
    breakAll,
    style,
    children: tempText + suffix
  });
  if (!words) {
    return [false, []];
  }
  var result = calculate(words.wordsWithComputedWidth, lineWidth, spaceWidth, scaleToFit);
  var doesOverflow = result.length > maxLines || findLongestLine(result).width > Number(lineWidth);
  return [doesOverflow, result];
};
var calculateWordsByLines = (_ref3, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) => {
  var maxLines = _ref3.maxLines, children = _ref3.children, style = _ref3.style, breakAll = _ref3.breakAll;
  var shouldLimitLines = isNumber(maxLines);
  var text = String(children);
  var originalResult = calculate(initialWordsWithComputedWith, lineWidth, spaceWidth, scaleToFit);
  if (!shouldLimitLines || scaleToFit) {
    return originalResult;
  }
  var overflows = originalResult.length > maxLines || findLongestLine(originalResult).width > Number(lineWidth);
  if (!overflows) {
    return originalResult;
  }
  var start = 0;
  var end = text.length - 1;
  var iterations = 0;
  var trimmedResult;
  while (start <= end && iterations <= text.length - 1) {
    var middle = Math.floor((start + end) / 2);
    var prev = middle - 1;
    var _checkOverflow = checkOverflow(text, prev, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit), _checkOverflow2 = _slicedToArray$9(_checkOverflow, 2), doesPrevOverflow = _checkOverflow2[0], result = _checkOverflow2[1];
    var _checkOverflow3 = checkOverflow(text, middle, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit), _checkOverflow4 = _slicedToArray$9(_checkOverflow3, 1), doesMiddleOverflow = _checkOverflow4[0];
    if (!doesPrevOverflow && !doesMiddleOverflow) {
      start = middle + 1;
    }
    if (doesPrevOverflow && doesMiddleOverflow) {
      end = middle - 1;
    }
    if (!doesPrevOverflow && doesMiddleOverflow) {
      trimmedResult = result;
      break;
    }
    iterations++;
  }
  return trimmedResult || originalResult;
};
var getWordsWithoutCalculate = (children) => {
  var words = !isNullish(children) ? children.toString().split(BREAKING_SPACES) : [];
  return [{
    words,
    width: void 0
  }];
};
var getWordsByLines = (_ref4) => {
  var width = _ref4.width, scaleToFit = _ref4.scaleToFit, children = _ref4.children, style = _ref4.style, breakAll = _ref4.breakAll, maxLines = _ref4.maxLines;
  if ((width || scaleToFit) && !Global.isSsr) {
    var wordsWithComputedWidth, spaceWidth;
    var wordWidths = calculateWordWidths({
      breakAll,
      children,
      style
    });
    if (wordWidths) {
      var wcw = wordWidths.wordsWithComputedWidth, sw = wordWidths.spaceWidth;
      wordsWithComputedWidth = wcw;
      spaceWidth = sw;
    } else {
      return getWordsWithoutCalculate(children);
    }
    return calculateWordsByLines({
      breakAll,
      children,
      maxLines,
      style
    }, wordsWithComputedWidth, spaceWidth, width, Boolean(scaleToFit));
  }
  return getWordsWithoutCalculate(children);
};
var DEFAULT_FILL = "#808080";
var textDefaultProps = {
  angle: 0,
  breakAll: false,
  // Magic number from d3
  capHeight: "0.71em",
  fill: DEFAULT_FILL,
  lineHeight: "1em",
  scaleToFit: false,
  textAnchor: "start",
  // Maintain compat with existing charts / default SVG behavior
  verticalAnchor: "end",
  x: 0,
  y: 0
};
var Text = /* @__PURE__ */ reactExports.forwardRef((outsideProps, ref) => {
  var _resolveDefaultProps = resolveDefaultProps(outsideProps, textDefaultProps), propsX = _resolveDefaultProps.x, propsY = _resolveDefaultProps.y, lineHeight = _resolveDefaultProps.lineHeight, capHeight = _resolveDefaultProps.capHeight, fill = _resolveDefaultProps.fill, scaleToFit = _resolveDefaultProps.scaleToFit, textAnchor = _resolveDefaultProps.textAnchor, verticalAnchor = _resolveDefaultProps.verticalAnchor, props = _objectWithoutProperties$k(_resolveDefaultProps, _excluded$k);
  var wordsByLines = reactExports.useMemo(() => {
    return getWordsByLines({
      breakAll: props.breakAll,
      children: props.children,
      maxLines: props.maxLines,
      scaleToFit,
      style: props.style,
      width: props.width
    });
  }, [props.breakAll, props.children, props.maxLines, scaleToFit, props.style, props.width]);
  var dx = props.dx, dy = props.dy, angle = props.angle, className = props.className, breakAll = props.breakAll, textProps = _objectWithoutProperties$k(props, _excluded2$b);
  if (!isNumOrStr(propsX) || !isNumOrStr(propsY) || wordsByLines.length === 0) {
    return null;
  }
  var x2 = Number(propsX) + (isNumber(dx) ? dx : 0);
  var y2 = Number(propsY) + (isNumber(dy) ? dy : 0);
  if (!isWellBehavedNumber(x2) || !isWellBehavedNumber(y2)) {
    return null;
  }
  var startDy;
  switch (verticalAnchor) {
    case "start":
      startDy = reduceCSSCalc("calc(".concat(capHeight, ")"));
      break;
    case "middle":
      startDy = reduceCSSCalc("calc(".concat((wordsByLines.length - 1) / 2, " * -").concat(lineHeight, " + (").concat(capHeight, " / 2))"));
      break;
    default:
      startDy = reduceCSSCalc("calc(".concat(wordsByLines.length - 1, " * -").concat(lineHeight, ")"));
      break;
  }
  var transforms = [];
  var firstLine = wordsByLines[0];
  if (scaleToFit && firstLine != null) {
    var lineWidth = firstLine.width;
    var width = props.width;
    transforms.push("scale(".concat(isNumber(width) && isNumber(lineWidth) ? width / lineWidth : 1, ")"));
  }
  if (angle) {
    transforms.push("rotate(".concat(angle, ", ").concat(x2, ", ").concat(y2, ")"));
  }
  if (transforms.length) {
    textProps.transform = transforms.join(" ");
  }
  return /* @__PURE__ */ reactExports.createElement("text", _extends$j({}, svgPropertiesAndEvents(textProps), {
    ref,
    x: x2,
    y: y2,
    className: clsx("recharts-text", className),
    textAnchor,
    fill: fill.includes("url") ? DEFAULT_FILL : fill
  }), wordsByLines.map((line, index) => {
    var words = line.words.join(breakAll ? "" : " ");
    return (
      // duplicate words will cause duplicate keys which is why we add the array index here
      /* @__PURE__ */ reactExports.createElement("tspan", {
        x: x2,
        dy: index === 0 ? startDy : lineHeight,
        key: "".concat(words, "-").concat(index)
      }, words)
    );
  }));
});
Text.displayName = "Text";
var _excluded$j = ["labelRef"], _excluded2$a = ["content"];
function _objectWithoutProperties$j(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$j(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$j(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$j(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$j(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$j(Object(t), true).forEach(function(r2) {
      _defineProperty$j(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$j(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$j(e, r, t) {
  return (r = _toPropertyKey$j(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$j(t) {
  var i = _toPrimitive$j(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$j(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$i() {
  return _extends$i = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$i.apply(null, arguments);
}
var CartesianLabelContext = /* @__PURE__ */ reactExports.createContext(null);
var CartesianLabelContextProvider = (_ref2) => {
  var x2 = _ref2.x, y2 = _ref2.y, upperWidth = _ref2.upperWidth, lowerWidth = _ref2.lowerWidth, width = _ref2.width, height = _ref2.height, children = _ref2.children;
  var viewBox = reactExports.useMemo(() => ({
    x: x2,
    y: y2,
    upperWidth,
    lowerWidth,
    width,
    height
  }), [x2, y2, upperWidth, lowerWidth, width, height]);
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelContext.Provider, {
    value: viewBox
  }, children);
};
var useCartesianLabelContext = () => {
  var labelChildContext = reactExports.useContext(CartesianLabelContext);
  var chartContext = useViewBox();
  return labelChildContext || (chartContext ? cartesianViewBoxToTrapezoid(chartContext) : void 0);
};
var PolarLabelContext = /* @__PURE__ */ reactExports.createContext(null);
var PolarLabelContextProvider = (_ref2) => {
  var cx = _ref2.cx, cy = _ref2.cy, innerRadius = _ref2.innerRadius, outerRadius = _ref2.outerRadius, startAngle = _ref2.startAngle, endAngle = _ref2.endAngle, clockWise = _ref2.clockWise, children = _ref2.children;
  var viewBox = reactExports.useMemo(() => ({
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    clockWise
  }), [cx, cy, innerRadius, outerRadius, startAngle, endAngle, clockWise]);
  return /* @__PURE__ */ reactExports.createElement(PolarLabelContext.Provider, {
    value: viewBox
  }, children);
};
var usePolarLabelContext = () => {
  var labelChildContext = reactExports.useContext(PolarLabelContext);
  var chartContext = useAppSelector(selectPolarViewBox);
  return labelChildContext || chartContext;
};
var getLabel = (props) => {
  var value = props.value, formatter = props.formatter;
  var label = isNullish(props.children) ? value : props.children;
  if (typeof formatter === "function") {
    return formatter(label);
  }
  return label;
};
var isLabelContentAFunction = (content) => {
  return content != null && typeof content === "function";
};
var getDeltaAngle = (startAngle, endAngle) => {
  var sign2 = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign2 * deltaAngle;
};
var renderRadialLabel = (labelProps, position, label, attrs, viewBox) => {
  var offset = labelProps.offset, className = labelProps.className;
  var cx = viewBox.cx, cy = viewBox.cy, innerRadius = viewBox.innerRadius, outerRadius = viewBox.outerRadius, startAngle = viewBox.startAngle, endAngle = viewBox.endAngle, clockWise = viewBox.clockWise;
  var radius = (innerRadius + outerRadius) / 2;
  var deltaAngle = getDeltaAngle(startAngle, endAngle);
  var sign2 = deltaAngle >= 0 ? 1 : -1;
  var labelAngle, direction;
  switch (position) {
    case "insideStart":
      labelAngle = startAngle + sign2 * offset;
      direction = clockWise;
      break;
    case "insideEnd":
      labelAngle = endAngle - sign2 * offset;
      direction = !clockWise;
      break;
    case "end":
      labelAngle = endAngle + sign2 * offset;
      direction = clockWise;
      break;
    default:
      throw new Error("Unsupported position ".concat(position));
  }
  direction = deltaAngle <= 0 ? direction : !direction;
  var startPoint = polarToCartesian(cx, cy, radius, labelAngle);
  var endPoint = polarToCartesian(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359);
  var path = "M".concat(startPoint.x, ",").concat(startPoint.y, "\n    A").concat(radius, ",").concat(radius, ",0,1,").concat(direction ? 0 : 1, ",\n    ").concat(endPoint.x, ",").concat(endPoint.y);
  var id = isNullish(labelProps.id) ? uniqueId("recharts-radial-line-") : labelProps.id;
  return /* @__PURE__ */ reactExports.createElement("text", _extends$i({}, attrs, {
    dominantBaseline: "central",
    className: clsx("recharts-radial-bar-label", className)
  }), /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("path", {
    id,
    d: path
  })), /* @__PURE__ */ reactExports.createElement("textPath", {
    xlinkHref: "#".concat(id)
  }, label));
};
var getAttrsOfPolarLabel = (viewBox, offset, position) => {
  var cx = viewBox.cx, cy = viewBox.cy, innerRadius = viewBox.innerRadius, outerRadius = viewBox.outerRadius, startAngle = viewBox.startAngle, endAngle = viewBox.endAngle;
  var midAngle = (startAngle + endAngle) / 2;
  if (position === "outside") {
    var _polarToCartesian = polarToCartesian(cx, cy, outerRadius + offset, midAngle), _x = _polarToCartesian.x, _y = _polarToCartesian.y;
    return {
      x: _x,
      y: _y,
      textAnchor: _x >= cx ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (position === "center") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  }
  if (position === "centerTop") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  }
  if (position === "centerBottom") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  }
  var r = (innerRadius + outerRadius) / 2;
  var _polarToCartesian2 = polarToCartesian(cx, cy, r, midAngle), x2 = _polarToCartesian2.x, y2 = _polarToCartesian2.y;
  return {
    x: x2,
    y: y2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
};
var isPolar = (viewBox) => viewBox != null && "cx" in viewBox && isNumber(viewBox.cx);
var defaultLabelProps = {
  angle: 0,
  offset: 5,
  zIndex: DefaultZIndexes.label,
  position: "middle",
  textBreakAll: false
};
function polarViewBoxToTrapezoid(viewBox) {
  if (!isPolar(viewBox)) {
    return viewBox;
  }
  var cx = viewBox.cx, cy = viewBox.cy, outerRadius = viewBox.outerRadius;
  var diameter = outerRadius * 2;
  return {
    x: cx - outerRadius,
    y: cy - outerRadius,
    width: diameter,
    upperWidth: diameter,
    lowerWidth: diameter,
    height: diameter
  };
}
function Label(outerProps) {
  var _positionAttrs, _positionAttrs2;
  var props = resolveDefaultProps(outerProps, defaultLabelProps);
  var viewBoxFromProps = props.viewBox, parentViewBox = props.parentViewBox, position = props.position, value = props.value, children = props.children, content = props.content, _props$className = props.className, className = _props$className === void 0 ? "" : _props$className, textBreakAll = props.textBreakAll, labelRef = props.labelRef;
  var polarViewBox = usePolarLabelContext();
  var cartesianViewBox = useCartesianLabelContext();
  var resolvedViewBox = position === "center" ? cartesianViewBox : polarViewBox !== null && polarViewBox !== void 0 ? polarViewBox : cartesianViewBox;
  var viewBox, label, positionAttrs;
  if (viewBoxFromProps == null) {
    viewBox = resolvedViewBox;
  } else if (isPolar(viewBoxFromProps)) {
    viewBox = viewBoxFromProps;
  } else {
    viewBox = cartesianViewBoxToTrapezoid(viewBoxFromProps);
  }
  var cartesianBox = polarViewBoxToTrapezoid(viewBox);
  if (!viewBox || isNullish(value) && isNullish(children) && !/* @__PURE__ */ reactExports.isValidElement(content) && typeof content !== "function") {
    return null;
  }
  var isRadialPolarLabel = isPolar(viewBox) && (position === "insideStart" || position === "insideEnd" || position === "end");
  if (isPolar(viewBox)) {
    if (!isRadialPolarLabel) {
      positionAttrs = getAttrsOfPolarLabel(viewBox, props.offset, props.position);
    }
  } else if (cartesianBox) {
    var cartesianResult = getCartesianPosition({
      viewBox: cartesianBox,
      position,
      offset: props.offset,
      parentViewBox: isPolar(parentViewBox) ? void 0 : parentViewBox,
      clamp: true
    });
    positionAttrs = _objectSpread$j(_objectSpread$j({
      x: cartesianResult.x,
      y: cartesianResult.y,
      textAnchor: cartesianResult.horizontalAnchor,
      verticalAnchor: cartesianResult.verticalAnchor
    }, cartesianResult.width !== void 0 ? {
      width: cartesianResult.width
    } : {}), cartesianResult.height !== void 0 ? {
      height: cartesianResult.height
    } : {});
  }
  var propsWithViewBox = _objectSpread$j(_objectSpread$j(_objectSpread$j(_objectSpread$j({}, ((_positionAttrs = positionAttrs) === null || _positionAttrs === void 0 ? void 0 : _positionAttrs.x) !== void 0 ? {
    x: positionAttrs.x
  } : {}), ((_positionAttrs2 = positionAttrs) === null || _positionAttrs2 === void 0 ? void 0 : _positionAttrs2.y) !== void 0 ? {
    y: positionAttrs.y
  } : {}), props), {}, {
    viewBox
  });
  if (/* @__PURE__ */ reactExports.isValidElement(content)) {
    propsWithViewBox.labelRef;
    var propsWithoutLabelRef = _objectWithoutProperties$j(propsWithViewBox, _excluded$j);
    return /* @__PURE__ */ reactExports.cloneElement(content, propsWithoutLabelRef);
  }
  if (typeof content === "function") {
    propsWithViewBox.content;
    var propsForContent = _objectWithoutProperties$j(propsWithViewBox, _excluded2$a);
    label = /* @__PURE__ */ reactExports.createElement(content, propsForContent);
    if (/* @__PURE__ */ reactExports.isValidElement(label)) {
      return label;
    }
  } else {
    label = getLabel(props);
  }
  var attrs = svgPropertiesAndEvents(props);
  if (isRadialPolarLabel && isPolar(viewBox)) {
    return renderRadialLabel(props, position, label, attrs, viewBox);
  }
  if (positionAttrs == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ reactExports.createElement(Text, _extends$i({
    ref: labelRef,
    className: clsx("recharts-label", className)
  }, attrs, positionAttrs, {
    /*
     * textAnchor is decided by default based on the `position`
     * but we allow overriding via props for precise control.
     */
    textAnchor: isValidTextAnchor(attrs.textAnchor) ? attrs.textAnchor : positionAttrs.textAnchor,
    breakAll: textBreakAll
  }), label));
}
Label.displayName = "Label";
var parseLabel = (label, viewBox, labelRef) => {
  if (!label) {
    return null;
  }
  var commonProps = {
    viewBox,
    labelRef
  };
  if (label === true) {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$i({
      key: "label-implicit"
    }, commonProps));
  }
  if (isNumOrStr(label)) {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$i({
      key: "label-implicit",
      value: label
    }, commonProps));
  }
  if (/* @__PURE__ */ reactExports.isValidElement(label)) {
    if (label.type === Label) {
      return /* @__PURE__ */ reactExports.cloneElement(label, _objectSpread$j({
        key: "label-implicit"
      }, commonProps));
    }
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$i({
      key: "label-implicit",
      content: label
    }, commonProps));
  }
  if (isLabelContentAFunction(label)) {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$i({
      key: "label-implicit",
      content: label
    }, commonProps));
  }
  if (label && typeof label === "object") {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$i({}, label, {
      key: "label-implicit"
    }, commonProps));
  }
  return null;
};
function CartesianLabelFromLabelProp(_ref3) {
  var label = _ref3.label, labelRef = _ref3.labelRef;
  var viewBox = useCartesianLabelContext();
  return parseLabel(label, viewBox, labelRef) || null;
}
var _excluded$i = ["valueAccessor"], _excluded2$9 = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function _extends$h() {
  return _extends$h = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$h.apply(null, arguments);
}
function _objectWithoutProperties$i(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$i(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$i(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var defaultAccessor = (entry) => {
  var val = Array.isArray(entry.value) ? entry.value[entry.value.length - 1] : entry.value;
  if (isRenderableText(val)) {
    return val;
  }
  return void 0;
};
var CartesianLabelListContext = /* @__PURE__ */ reactExports.createContext(void 0);
var CartesianLabelListContextProvider = CartesianLabelListContext.Provider;
var PolarLabelListContext = /* @__PURE__ */ reactExports.createContext(void 0);
var PolarLabelListContextProvider = PolarLabelListContext.Provider;
function useCartesianLabelListContext() {
  return reactExports.useContext(CartesianLabelListContext);
}
function usePolarLabelListContext() {
  return reactExports.useContext(PolarLabelListContext);
}
function LabelList(_ref2) {
  var _ref$valueAccessor = _ref2.valueAccessor, valueAccessor = _ref$valueAccessor === void 0 ? defaultAccessor : _ref$valueAccessor, restProps = _objectWithoutProperties$i(_ref2, _excluded$i);
  var dataKey = restProps.dataKey;
  restProps.clockWise;
  var id = restProps.id, textBreakAll = restProps.textBreakAll, zIndex = restProps.zIndex, others = _objectWithoutProperties$i(restProps, _excluded2$9);
  var cartesianData = useCartesianLabelListContext();
  var polarData = usePolarLabelListContext();
  var data = cartesianData || polarData;
  if (!data || !data.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: zIndex !== null && zIndex !== void 0 ? zIndex : DefaultZIndexes.label
  }, /* @__PURE__ */ reactExports.createElement(Layer, {
    className: "recharts-label-list"
  }, data.map((entry, index) => {
    var _restProps$fill;
    var value = isNullish(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry.payload, dataKey);
    var idProps = isNullish(id) ? {} : {
      id: "".concat(id, "-").concat(index)
    };
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$h({
      key: "label-".concat(index)
    }, svgPropertiesAndEvents(entry), others, idProps, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (_restProps$fill = restProps.fill) !== null && _restProps$fill !== void 0 ? _restProps$fill : entry.fill,
      parentViewBox: entry.parentViewBox,
      value,
      textBreakAll,
      viewBox: entry.viewBox,
      index,
      zIndex: 0
    }));
  })));
}
LabelList.displayName = "LabelList";
function LabelListFromLabelProp(_ref2) {
  var label = _ref2.label;
  if (!label) {
    return null;
  }
  if (label === true) {
    return /* @__PURE__ */ reactExports.createElement(LabelList, {
      key: "labelList-implicit"
    });
  }
  if (/* @__PURE__ */ reactExports.isValidElement(label) || isLabelContentAFunction(label)) {
    return /* @__PURE__ */ reactExports.createElement(LabelList, {
      key: "labelList-implicit",
      content: label
    });
  }
  if (typeof label === "object") {
    return /* @__PURE__ */ reactExports.createElement(LabelList, _extends$h({
      key: "labelList-implicit"
    }, label, {
      type: String(label.type)
    }));
  }
  return null;
}
function _extends$g() {
  return _extends$g = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$g.apply(null, arguments);
}
var Dot = (props) => {
  var cx = props.cx, cy = props.cy, r = props.r, className = props.className;
  var layerClass = clsx("recharts-dot", className);
  if (isNumber(cx) && isNumber(cy) && isNumber(r)) {
    return /* @__PURE__ */ reactExports.createElement("circle", _extends$g({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
      className: layerClass,
      cx,
      cy,
      r
    }));
  }
  return null;
};
var selectUnfilteredPolarItems = (state) => state.graphicalItems.polarItems;
var selectAxisPredicate = createSelector([pickAxisType, pickAxisId], itemAxisPredicate);
var selectPolarItemsSettings = createSelector([selectUnfilteredPolarItems, selectBaseAxis, selectAxisPredicate], combineGraphicalItemsSettings);
var selectPolarGraphicalItemsData = createSelector([selectPolarItemsSettings], combineGraphicalItemsData);
var selectPolarDisplayedData = createSelector([selectPolarGraphicalItemsData, selectChartDataAndAlwaysIgnoreIndexes], combineDisplayedData);
var selectPolarAppliedValues = createSelector([selectPolarDisplayedData, selectBaseAxis, selectPolarItemsSettings], combineAppliedValues);
createSelector([selectPolarDisplayedData, selectBaseAxis, selectPolarItemsSettings], (data, axisSettings, items) => {
  if (items.length > 0) {
    return data.flatMap((entry) => {
      return items.flatMap((item) => {
        var _axisSettings$dataKey;
        var valueByDataKey = getValueByDataKey(entry, (_axisSettings$dataKey = axisSettings.dataKey) !== null && _axisSettings$dataKey !== void 0 ? _axisSettings$dataKey : item.dataKey);
        return {
          value: valueByDataKey,
          errorDomain: []
          // polar charts do not have error bars
        };
      });
    }).filter(Boolean);
  }
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) {
    return data.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey),
      errorDomain: []
    }));
  }
  return data.map((entry) => ({
    value: entry,
    errorDomain: []
  }));
});
var unsupportedInPolarChart = () => void 0;
var selectDomainOfAllPolarAppliedNumericalValues = createSelector([selectPolarDisplayedData, selectBaseAxis, selectPolarItemsSettings, selectAllErrorBarSettings, pickAxisType, selectChartDataSliceIgnoringIndexes], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues);
var selectPolarNumericalDomain = createSelector([selectBaseAxis, selectDomainDefinition, selectDomainFromUserPreference, unsupportedInPolarChart, selectDomainOfAllPolarAppliedNumericalValues, unsupportedInPolarChart, selectChartLayout, pickAxisType], combineNumericalDomain);
var selectPolarAxisDomain = createSelector([selectBaseAxis, selectChartLayout, selectPolarDisplayedData, selectPolarAppliedValues, selectStackOffsetType, pickAxisType, selectPolarNumericalDomain], combineAxisDomain);
var selectPolarNiceTicks = createSelector([selectPolarAxisDomain, selectRenderableAxisSettings, selectRealScaleType], combineNiceTicks);
var selectPolarAxisDomainIncludingNiceTicks = createSelector([selectBaseAxis, selectPolarAxisDomain, selectPolarNiceTicks, pickAxisType], combineAxisDomainWithNiceTicks);
createSelector([selectRealScaleType, selectPolarAxisDomainIncludingNiceTicks], combineCheckedDomain);
var initialState$8 = {
  radiusAxis: {},
  angleAxis: {}
};
var polarAxisSlice = createSlice({
  name: "polarAxis",
  initialState: initialState$8,
  reducers: {
    addRadiusAxis(state, action) {
      state.radiusAxis[action.payload.id] = castDraft(action.payload);
    },
    removeRadiusAxis(state, action) {
      delete state.radiusAxis[action.payload.id];
    },
    addAngleAxis(state, action) {
      state.angleAxis[action.payload.id] = castDraft(action.payload);
    },
    removeAngleAxis(state, action) {
      delete state.angleAxis[action.payload.id];
    }
  }
});
var _polarAxisSlice$actio = polarAxisSlice.actions;
_polarAxisSlice$actio.addRadiusAxis;
_polarAxisSlice$actio.removeRadiusAxis;
_polarAxisSlice$actio.addAngleAxis;
_polarAxisSlice$actio.removeAngleAxis;
var polarAxisReducer = polarAxisSlice.reducer;
function getClassNameFromUnknown(u) {
  if (u && typeof u === "object" && "className" in u && typeof u.className === "string") {
    return u.className;
  }
  return "";
}
function ownKeys$i(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$i(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$i(Object(t), true).forEach(function(r2) {
      _defineProperty$i(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$i(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$i(e, r, t) {
  return (r = _toPropertyKey$i(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$i(t) {
  var i = _toPrimitive$i(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$i(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var pickId = (_state, id) => id;
var selectSynchronisedPieSettings = createSelector([selectUnfilteredPolarItems, pickId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "pie").find((item) => item.id === id));
var emptyArray = [];
var pickCells$1 = (_state, _id, cells) => {
  if ((cells === null || cells === void 0 ? void 0 : cells.length) === 0) {
    return emptyArray;
  }
  return cells;
};
var selectDisplayedData = createSelector([selectChartDataAndAlwaysIgnoreIndexes, selectSynchronisedPieSettings, pickCells$1], (_ref2, pieSettings, cells) => {
  var chartData = _ref2.chartData;
  if (pieSettings == null) {
    return void 0;
  }
  var displayedData;
  if ((pieSettings === null || pieSettings === void 0 ? void 0 : pieSettings.data) != null && pieSettings.data.length > 0) {
    displayedData = pieSettings.data;
  } else {
    displayedData = chartData;
  }
  if ((!displayedData || !displayedData.length) && cells != null) {
    displayedData = cells.map((cell) => _objectSpread$i(_objectSpread$i({}, pieSettings.presentationProps), cell.props));
  }
  if (displayedData == null) {
    return void 0;
  }
  return displayedData;
});
var selectPieLegend = createSelector([selectDisplayedData, selectSynchronisedPieSettings, pickCells$1], (displayedData, pieSettings, cells) => {
  if (displayedData == null || pieSettings == null) {
    return void 0;
  }
  return displayedData.map((entry, i) => {
    var _cells$i;
    var name = getValueByDataKey(entry, pieSettings.nameKey, pieSettings.name);
    var color2;
    if (cells !== null && cells !== void 0 && (_cells$i = cells[i]) !== null && _cells$i !== void 0 && (_cells$i = _cells$i.props) !== null && _cells$i !== void 0 && _cells$i.fill) {
      color2 = cells[i].props.fill;
    } else if (typeof entry === "object" && entry != null && "fill" in entry) {
      color2 = entry.fill;
    } else {
      color2 = pieSettings.fill;
    }
    return {
      value: getTooltipNameProp(name, pieSettings.dataKey),
      dataKey: pieSettings.dataKey,
      color: color2,
      // @ts-expect-error Legend payload.payload says it wants objects but our data can be unknown
      payload: entry,
      type: pieSettings.legendType
    };
  });
});
var selectPieSectors = createSelector([selectDisplayedData, selectSynchronisedPieSettings, pickCells$1, selectChartOffsetInternal], (displayedData, pieSettings, cells, offset) => {
  if (pieSettings == null || displayedData == null) {
    return void 0;
  }
  return computePieSectors({
    offset,
    pieSettings,
    displayedData,
    cells
  });
});
var reactIs = { exports: {} };
var reactIs_production = {};
var hasRequiredReactIs_production;
function requireReactIs_production() {
  if (hasRequiredReactIs_production) return reactIs_production;
  hasRequiredReactIs_production = 1;
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_VIEW_TRANSITION_TYPE = /* @__PURE__ */ Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
  function typeOf(object2) {
    if ("object" === typeof object2 && null !== object2) {
      var $$typeof = object2.$$typeof;
      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          switch (object2 = object2.type, object2) {
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
            case REACT_SUSPENSE_LIST_TYPE:
            case REACT_VIEW_TRANSITION_TYPE:
              return object2;
            default:
              switch (object2 = object2 && object2.$$typeof, object2) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                  return object2;
                case REACT_CONSUMER_TYPE:
                  return object2;
                default:
                  return $$typeof;
              }
          }
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }
  }
  reactIs_production.ContextConsumer = REACT_CONSUMER_TYPE;
  reactIs_production.ContextProvider = REACT_CONTEXT_TYPE;
  reactIs_production.Element = REACT_ELEMENT_TYPE;
  reactIs_production.ForwardRef = REACT_FORWARD_REF_TYPE;
  reactIs_production.Fragment = REACT_FRAGMENT_TYPE;
  reactIs_production.Lazy = REACT_LAZY_TYPE;
  reactIs_production.Memo = REACT_MEMO_TYPE;
  reactIs_production.Portal = REACT_PORTAL_TYPE;
  reactIs_production.Profiler = REACT_PROFILER_TYPE;
  reactIs_production.StrictMode = REACT_STRICT_MODE_TYPE;
  reactIs_production.Suspense = REACT_SUSPENSE_TYPE;
  reactIs_production.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
  reactIs_production.isContextConsumer = function(object2) {
    return typeOf(object2) === REACT_CONSUMER_TYPE;
  };
  reactIs_production.isContextProvider = function(object2) {
    return typeOf(object2) === REACT_CONTEXT_TYPE;
  };
  reactIs_production.isElement = function(object2) {
    return "object" === typeof object2 && null !== object2 && object2.$$typeof === REACT_ELEMENT_TYPE;
  };
  reactIs_production.isForwardRef = function(object2) {
    return typeOf(object2) === REACT_FORWARD_REF_TYPE;
  };
  reactIs_production.isFragment = function(object2) {
    return typeOf(object2) === REACT_FRAGMENT_TYPE;
  };
  reactIs_production.isLazy = function(object2) {
    return typeOf(object2) === REACT_LAZY_TYPE;
  };
  reactIs_production.isMemo = function(object2) {
    return typeOf(object2) === REACT_MEMO_TYPE;
  };
  reactIs_production.isPortal = function(object2) {
    return typeOf(object2) === REACT_PORTAL_TYPE;
  };
  reactIs_production.isProfiler = function(object2) {
    return typeOf(object2) === REACT_PROFILER_TYPE;
  };
  reactIs_production.isStrictMode = function(object2) {
    return typeOf(object2) === REACT_STRICT_MODE_TYPE;
  };
  reactIs_production.isSuspense = function(object2) {
    return typeOf(object2) === REACT_SUSPENSE_TYPE;
  };
  reactIs_production.isSuspenseList = function(object2) {
    return typeOf(object2) === REACT_SUSPENSE_LIST_TYPE;
  };
  reactIs_production.isValidElementType = function(type) {
    return "string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_VIEW_TRANSITION_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE || void 0 !== type.getModuleId) ? true : false;
  };
  reactIs_production.typeOf = typeOf;
  return reactIs_production;
}
var hasRequiredReactIs;
function requireReactIs() {
  if (hasRequiredReactIs) return reactIs.exports;
  hasRequiredReactIs = 1;
  {
    reactIs.exports = /* @__PURE__ */ requireReactIs_production();
  }
  return reactIs.exports;
}
var reactIsExports = /* @__PURE__ */ requireReactIs();
var getDisplayName = (Comp) => {
  if (typeof Comp === "string") {
    return Comp;
  }
  if (!Comp) {
    return "";
  }
  return Comp.displayName || Comp.name || "Component";
};
var lastChildren = null;
var lastResult = null;
var toArray = (children) => {
  if (children === lastChildren && Array.isArray(lastResult)) {
    return lastResult;
  }
  var result = [];
  reactExports.Children.forEach(children, (child) => {
    if (isNullish(child)) return;
    if (reactIsExports.isFragment(child)) {
      result = result.concat(toArray(child.props.children));
    } else {
      result.push(child);
    }
  });
  lastResult = result;
  lastChildren = children;
  return result;
};
function findAllByType(children, type) {
  var result = [];
  var types = [];
  if (Array.isArray(type)) {
    types = type.map((t) => getDisplayName(t));
  } else {
    types = [getDisplayName(type)];
  }
  toArray(children).forEach((child) => {
    var childType = get$1(child, "type.displayName") || get$1(child, "type.name");
    if (childType && types.indexOf(childType) !== -1) {
      result.push(child);
    }
  });
  return result;
}
var isClipDot = (dot) => {
  if (dot && typeof dot === "object" && "clipDot" in dot) {
    return Boolean(dot.clipDot);
  }
  return true;
};
function ownKeys$h(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$h(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$h(Object(t), true).forEach(function(r2) {
      _defineProperty$h(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$h(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$h(e, r, t) {
  return (r = _toPropertyKey$h(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$h(t) {
  var i = _toPrimitive$h(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$h(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function mergeShapeProps(option, props) {
  return _objectSpread$h(_objectSpread$h({}, props), option);
}
function getPropsFromShapeOption(option) {
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    return option.props;
  }
  return option;
}
function renderWithShapeElement(option, props) {
  return /* @__PURE__ */ reactExports.cloneElement(option, mergeShapeProps(getPropsFromShapeOption(option), props));
}
function getShapeIndex(shapeProps) {
  if (!("index" in shapeProps)) {
    return void 0;
  }
  var index = shapeProps.index;
  return typeof index === "number" || typeof index === "string" ? index : void 0;
}
function isActiveShape(shapeProps) {
  return "isActive" in shapeProps && shapeProps.isActive === true;
}
function Shape(_ref2) {
  var option = _ref2.option, DefaultShape = _ref2.DefaultShape, shapeProps = _ref2.shapeProps, _ref$activeClassName = _ref2.activeClassName, activeClassName = _ref$activeClassName === void 0 ? "recharts-active-shape" : _ref$activeClassName, _ref$inActiveClassNam = _ref2.inActiveClassName, inActiveClassName = _ref$inActiveClassNam === void 0 ? "recharts-shape" : _ref$inActiveClassNam;
  var index = getShapeIndex(shapeProps);
  var shape;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    shape = renderWithShapeElement(option, shapeProps);
  } else if (option === DefaultShape) {
    shape = /* @__PURE__ */ reactExports.createElement(DefaultShape, shapeProps);
  } else if (typeof option === "function") {
    shape = option(shapeProps, index);
  } else if (typeof option === "object") {
    shape = /* @__PURE__ */ reactExports.createElement(DefaultShape, mergeShapeProps(option, shapeProps));
  } else {
    shape = /* @__PURE__ */ reactExports.createElement(DefaultShape, shapeProps);
  }
  if (isActiveShape(shapeProps)) {
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      className: activeClassName
    }, shape);
  }
  return /* @__PURE__ */ reactExports.createElement(Layer, {
    className: inActiveClassName
  }, shape);
}
var useMouseEnterItemDispatch = (onMouseEnterFromProps, dataKey, graphicalItemId) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseEnterFromProps === null || onMouseEnterFromProps === void 0 || onMouseEnterFromProps(data, index, event);
    dispatch(setActiveMouseOverItemIndex({
      activeIndex: String(index),
      activeDataKey: dataKey,
      activeCoordinate: data.tooltipPosition,
      activeGraphicalItemId: graphicalItemId
    }));
  };
};
var useMouseLeaveItemDispatch = (onMouseLeaveFromProps) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseLeaveFromProps === null || onMouseLeaveFromProps === void 0 || onMouseLeaveFromProps(data, index, event);
    dispatch(mouseLeaveItem());
  };
};
var useMouseClickItemDispatch = (onMouseClickFromProps, dataKey, graphicalItemId) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseClickFromProps === null || onMouseClickFromProps === void 0 || onMouseClickFromProps(data, index, event);
    dispatch(setActiveClickItemIndex({
      activeIndex: String(index),
      activeDataKey: dataKey,
      activeCoordinate: data.tooltipPosition,
      activeGraphicalItemId: graphicalItemId
    }));
  };
};
function SetTooltipEntrySettings(_ref2) {
  var tooltipEntrySettings = _ref2.tooltipEntrySettings;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  var prevSettingsRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (isPanorama) {
      return;
    }
    if (prevSettingsRef.current === null) {
      dispatch(addTooltipEntrySettings(tooltipEntrySettings));
    } else if (prevSettingsRef.current !== tooltipEntrySettings) {
      dispatch(replaceTooltipEntrySettings({
        prev: prevSettingsRef.current,
        next: tooltipEntrySettings
      }));
    }
    prevSettingsRef.current = tooltipEntrySettings;
  }, [tooltipEntrySettings, dispatch, isPanorama]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevSettingsRef.current) {
        dispatch(removeTooltipEntrySettings(prevSettingsRef.current));
        prevSettingsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function SetLegendPayload(_ref2) {
  var legendPayload = _ref2.legendPayload;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  var prevPayloadRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (isPanorama) {
      return;
    }
    if (prevPayloadRef.current === null) {
      dispatch(addLegendPayload(legendPayload));
    } else if (prevPayloadRef.current !== legendPayload) {
      dispatch(replaceLegendPayload({
        prev: prevPayloadRef.current,
        next: legendPayload
      }));
    }
    prevPayloadRef.current = legendPayload;
  }, [dispatch, isPanorama, legendPayload]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevPayloadRef.current) {
        dispatch(removeLegendPayload(prevPayloadRef.current));
        prevPayloadRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function SetPolarLegendPayload(_ref2) {
  var legendPayload = _ref2.legendPayload;
  var dispatch = useAppDispatch();
  var layout = useAppSelector(selectChartLayout);
  var prevPayloadRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (layout !== "centric" && layout !== "radial") {
      return;
    }
    if (prevPayloadRef.current === null) {
      dispatch(addLegendPayload(legendPayload));
    } else if (prevPayloadRef.current !== legendPayload) {
      dispatch(replaceLegendPayload({
        prev: prevPayloadRef.current,
        next: legendPayload
      }));
    }
    prevPayloadRef.current = legendPayload;
  }, [dispatch, layout, legendPayload]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevPayloadRef.current) {
        dispatch(removeLegendPayload(prevPayloadRef.current));
        prevPayloadRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function _slicedToArray$8(r, e) {
  return _arrayWithHoles$8(r) || _iterableToArrayLimit$8(r, e) || _unsupportedIterableToArray$8(r, e) || _nonIterableRest$8();
}
function _nonIterableRest$8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$8(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$8(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$8(r, a2) : void 0;
  }
}
function _arrayLikeToArray$8(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$8(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$8(r) {
  if (Array.isArray(r)) return r;
}
var matchByIndex = "index";
var matchAppend = "append";
function tagAlignedItems(alignedPrevItems, nextItems) {
  var removedPrevItems = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  var tagged = [];
  for (var prev of removedPrevItems) {
    tagged.push({
      status: "removed",
      prev
    });
  }
  for (var i = 0; i < nextItems.length; i++) {
    var _prev = alignedPrevItems[i];
    var next = nextItems[i];
    if (_prev != null) {
      tagged.push({
        status: "matched",
        prev: _prev,
        next
      });
    } else {
      tagged.push({
        status: "added",
        next
      });
    }
  }
  return tagged;
}
function matchByIndexImpl(prevItems, nextItems) {
  var factor = prevItems.length / nextItems.length;
  var alignedPrevItems = nextItems.map((_, i) => prevItems[Math.floor(i * factor)]);
  return tagAlignedItems(alignedPrevItems, nextItems);
}
function matchAppendImpl(prevItems, nextItems) {
  var alignedPrevItems = nextItems.map((_, i) => prevItems[i]);
  return tagAlignedItems(alignedPrevItems, nextItems);
}
function buildPrevKeyMap(prevItems, matchBy) {
  var prevMap = /* @__PURE__ */ new Map();
  for (var i = 0; i < prevItems.length; i++) {
    var _item = prevItems[i];
    if (_item == null) continue;
    var key = matchBy(_item, i);
    if (key != null && !prevMap.has(key)) {
      prevMap.set(key, _item);
    }
  }
  return prevMap;
}
function matchByKey(prevItems, nextItems, matchBy) {
  var prevMap = buildPrevKeyMap(prevItems, matchBy);
  var matchedKeys = /* @__PURE__ */ new Set();
  var alignedPrevItems = nextItems.map((next, i) => {
    var key2 = matchBy(next, i);
    if (key2 != null) {
      var prev = prevMap.get(key2);
      if (prev !== void 0) {
        matchedKeys.add(key2);
        return prev;
      }
    }
    return void 0;
  });
  var removedPrevItems = [];
  for (var _ref3 of prevMap) {
    var _ref2 = _slicedToArray$8(_ref3, 2);
    var key = _ref2[0];
    var _item2 = _ref2[1];
    if (!matchedKeys.has(key)) {
      removedPrevItems.push(_item2);
    }
  }
  return tagAlignedItems(alignedPrevItems, nextItems, removedPrevItems);
}
function matchAnimationItems(prevItems, nextItems, matchBy) {
  if (nextItems == null) {
    return null;
  }
  if (prevItems == null) {
    return nextItems.map((next) => ({
      status: "added",
      next
    }));
  }
  if (matchBy === matchByIndex) {
    return matchByIndexImpl(prevItems, nextItems);
  }
  if (matchBy === matchAppend) {
    return matchAppendImpl(prevItems, nextItems);
  }
  return matchByKey(prevItems, nextItems, matchBy);
}
function useAnimationStartSnapshot(animationInput, previousValueRef) {
  var previousAnimationInputRef = reactExports.useRef(animationInput);
  var startValueRef = reactExports.useRef(previousValueRef.current);
  var isReadyToCommitRef = reactExports.useRef(true);
  if (previousAnimationInputRef.current !== animationInput) {
    previousAnimationInputRef.current = animationInput;
    startValueRef.current = previousValueRef.current;
    isReadyToCommitRef.current = false;
  }
  var syncStepValue = reactExports.useCallback(function(stepValue, animationElapsedTime) {
    var canCommit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (animationElapsedTime === 0) {
      isReadyToCommitRef.current = true;
      return;
    }
    if (animationElapsedTime === 1) {
      startValueRef.current = stepValue;
    }
    if (animationElapsedTime > 0 && isReadyToCommitRef.current && canCommit) {
      previousValueRef.current = stepValue;
    }
  }, [previousValueRef]);
  return {
    startValue: startValueRef.current,
    syncStepValue
  };
}
function _slicedToArray$7(r, e) {
  return _arrayWithHoles$7(r) || _iterableToArrayLimit$7(r, e) || _unsupportedIterableToArray$7(r, e) || _nonIterableRest$7();
}
function _nonIterableRest$7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$7(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$7(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$7(r, a2) : void 0;
  }
}
function _arrayLikeToArray$7(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$7(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$7(r) {
  if (Array.isArray(r)) return r;
}
function useAnimationCallbacks(onAnimationStart, onAnimationEnd) {
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray$7(_useState, 2), isAnimating = _useState2[0], setIsAnimating = _useState2[1];
  var handleAnimationStart = reactExports.useCallback(() => {
    if (typeof onAnimationStart === "function") {
      onAnimationStart();
    }
    setIsAnimating(true);
  }, [onAnimationStart]);
  var handleAnimationEnd = reactExports.useCallback(() => {
    if (typeof onAnimationEnd === "function") {
      onAnimationEnd();
    }
    setIsAnimating(false);
  }, [onAnimationEnd]);
  return {
    isAnimating,
    handleAnimationStart,
    handleAnimationEnd
  };
}
function AnimatedItems(props) {
  var _animationStartItems$;
  var animationInput = props.animationInput, animationIdPrefix = props.animationIdPrefix, items = props.items, previousItemsRef = props.previousItemsRef, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, onAnimationStart = props.onAnimationStart, onAnimationEnd = props.onAnimationEnd, animationInterpolateFn = props.animationInterpolateFn, animationMatchBy = props.animationMatchBy, shouldUpdatePreviousRef = props.shouldUpdatePreviousRef, children = props.children, layout = props.layout;
  var animationId = useAnimationId(animationInput, animationIdPrefix);
  var animationStartItems = useAnimationStartSnapshot(animationId, previousItemsRef);
  var rawPrevItems = (_animationStartItems$ = animationStartItems.startValue) !== null && _animationStartItems$ !== void 0 ? _animationStartItems$ : null;
  var animationItems = matchAnimationItems(rawPrevItems, items, animationMatchBy !== null && animationMatchBy !== void 0 ? animationMatchBy : matchByIndex);
  return /* @__PURE__ */ reactExports.createElement(JavascriptAnimate, {
    animationId,
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    onAnimationEnd,
    onAnimationStart,
    key: animationId
  }, (animationElapsedTime) => {
    var isEntrance = rawPrevItems == null;
    var stepData = items == null ? items : animationInterpolateFn(animationItems, animationElapsedTime, layout);
    var canUpdate = shouldUpdatePreviousRef ? shouldUpdatePreviousRef(animationElapsedTime) : animationElapsedTime > 0;
    animationStartItems.syncStepValue(stepData, animationElapsedTime, canUpdate);
    if (stepData == null) {
      return null;
    }
    return children(stepData, animationElapsedTime, isEntrance);
  });
}
var _ref;
function _slicedToArray$6(r, e) {
  return _arrayWithHoles$6(r) || _iterableToArrayLimit$6(r, e) || _unsupportedIterableToArray$6(r, e) || _nonIterableRest$6();
}
function _nonIterableRest$6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$6(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$6(r, a2) : void 0;
  }
}
function _arrayLikeToArray$6(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$6(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$6(r) {
  if (Array.isArray(r)) return r;
}
var useIdFallback = () => {
  var _React$useState = reactExports.useState(() => uniqueId("uid-")), _React$useState2 = _slicedToArray$6(_React$useState, 1), id = _React$useState2[0];
  return id;
};
var useId = (_ref = React4["useId".toString()]) !== null && _ref !== void 0 ? _ref : useIdFallback;
function useUniqueId(prefix2, customId) {
  var generatedId = useId();
  if (customId) {
    return customId;
  }
  return prefix2 ? "".concat(prefix2, "-").concat(generatedId) : generatedId;
}
var GraphicalItemIdContext = /* @__PURE__ */ reactExports.createContext(void 0);
var RegisterGraphicalItemId = (_ref2) => {
  var id = _ref2.id, type = _ref2.type, children = _ref2.children;
  var resolvedId = useUniqueId("recharts-".concat(type), id);
  return /* @__PURE__ */ reactExports.createElement(GraphicalItemIdContext.Provider, {
    value: resolvedId
  }, children(resolvedId));
};
var initialState$7 = {
  cartesianItems: [],
  polarItems: []
};
var graphicalItemsSlice = createSlice({
  name: "graphicalItems",
  initialState: initialState$7,
  reducers: {
    addCartesianGraphicalItem: {
      reducer(state, action) {
        state.cartesianItems.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    replaceCartesianGraphicalItem: {
      reducer(state, action) {
        var _action$payload = action.payload, prev = _action$payload.prev, next = _action$payload.next;
        var index = current(state).cartesianItems.indexOf(castDraft(prev));
        if (index > -1) {
          state.cartesianItems[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeCartesianGraphicalItem: {
      reducer(state, action) {
        var index = current(state).cartesianItems.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.cartesianItems.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    },
    addPolarGraphicalItem: {
      reducer(state, action) {
        state.polarItems.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    removePolarGraphicalItem: {
      reducer(state, action) {
        var index = current(state).polarItems.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.polarItems.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    },
    replacePolarGraphicalItem: {
      reducer(state, action) {
        var _action$payload2 = action.payload, prev = _action$payload2.prev, next = _action$payload2.next;
        var index = current(state).polarItems.indexOf(castDraft(prev));
        if (index > -1) {
          state.polarItems[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    }
  }
});
var _graphicalItemsSlice$ = graphicalItemsSlice.actions, addCartesianGraphicalItem = _graphicalItemsSlice$.addCartesianGraphicalItem, replaceCartesianGraphicalItem = _graphicalItemsSlice$.replaceCartesianGraphicalItem, removeCartesianGraphicalItem = _graphicalItemsSlice$.removeCartesianGraphicalItem, addPolarGraphicalItem = _graphicalItemsSlice$.addPolarGraphicalItem, removePolarGraphicalItem = _graphicalItemsSlice$.removePolarGraphicalItem, replacePolarGraphicalItem = _graphicalItemsSlice$.replacePolarGraphicalItem;
var graphicalItemsReducer = graphicalItemsSlice.reducer;
var SetCartesianGraphicalItemImpl = (props) => {
  var dispatch = useAppDispatch();
  var prevPropsRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (prevPropsRef.current === null) {
      dispatch(addCartesianGraphicalItem(props));
    } else if (prevPropsRef.current !== props) {
      dispatch(replaceCartesianGraphicalItem({
        prev: prevPropsRef.current,
        next: props
      }));
    }
    prevPropsRef.current = props;
  }, [dispatch, props]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevPropsRef.current) {
        dispatch(removeCartesianGraphicalItem(prevPropsRef.current));
        prevPropsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
};
var SetCartesianGraphicalItem = /* @__PURE__ */ reactExports.memo(SetCartesianGraphicalItemImpl);
var SetPolarGraphicalItemImpl = (props) => {
  var dispatch = useAppDispatch();
  var prevPropsRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (prevPropsRef.current === null) {
      dispatch(addPolarGraphicalItem(props));
    } else if (prevPropsRef.current !== props) {
      dispatch(replacePolarGraphicalItem({
        prev: prevPropsRef.current,
        next: props
      }));
    }
    prevPropsRef.current = props;
  }, [dispatch, props]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevPropsRef.current) {
        dispatch(removePolarGraphicalItem(prevPropsRef.current));
        prevPropsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
};
var SetPolarGraphicalItem = /* @__PURE__ */ reactExports.memo(SetPolarGraphicalItemImpl);
var _excluded$h = ["key"], _excluded2$8 = ["onMouseEnter", "onClick", "onMouseLeave"], _excluded3$5 = ["id"], _excluded4$2 = ["id"];
function _extends$f() {
  return _extends$f = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$f.apply(null, arguments);
}
function _objectWithoutProperties$h(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$h(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$h(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$g(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$g(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$g(Object(t), true).forEach(function(r2) {
      _defineProperty$g(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$g(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$g(e, r, t) {
  return (r = _toPropertyKey$g(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$g(t) {
  var i = _toPrimitive$g(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$g(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultPieSectorShape = Sector;
function SetPiePayloadLegend(props) {
  var cells = reactExports.useMemo(() => findAllByType(props.children, Cell), [props.children]);
  var legendPayload = useAppSelector((state) => selectPieLegend(state, props.id, cells));
  if (legendPayload == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(SetPolarLegendPayload, {
    legendPayload
  });
}
function getActiveShapeFill(activeShape) {
  if (activeShape == null || typeof activeShape === "boolean" || typeof activeShape === "function") {
    return void 0;
  }
  if (/* @__PURE__ */ reactExports.isValidElement(activeShape)) {
    var _activeShape$props;
    var _fill = (_activeShape$props = activeShape.props) === null || _activeShape$props === void 0 ? void 0 : _activeShape$props.fill;
    return typeof _fill === "string" ? _fill : void 0;
  }
  var fill = activeShape.fill;
  return typeof fill === "string" ? fill : void 0;
}
var SetPieTooltipEntrySettings = /* @__PURE__ */ reactExports.memo((_ref2) => {
  var dataKey = _ref2.dataKey, nameKey = _ref2.nameKey, sectors = _ref2.sectors, stroke = _ref2.stroke, strokeWidth = _ref2.strokeWidth, fill = _ref2.fill, name = _ref2.name, hide = _ref2.hide, tooltipType = _ref2.tooltipType, formatter = _ref2.formatter, id = _ref2.id, activeShape = _ref2.activeShape;
  var activeShapeFill = getActiveShapeFill(activeShape);
  var tooltipDataDefinedOnItem = sectors.map((sector) => {
    var sectorTooltipPayload = sector.tooltipPayload;
    if (activeShapeFill == null || sectorTooltipPayload == null) {
      return sectorTooltipPayload;
    }
    return sectorTooltipPayload.map((item) => _objectSpread$g(_objectSpread$g({}, item), {}, {
      color: activeShapeFill,
      fill: activeShapeFill
    }));
  });
  var tooltipEntrySettings = {
    dataDefinedOnItem: tooltipDataDefinedOnItem,
    getPosition: (index) => {
      var _sectors$Number;
      return (_sectors$Number = sectors[Number(index)]) === null || _sectors$Number === void 0 ? void 0 : _sectors$Number.tooltipPosition;
    },
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: fill,
      unit: "",
      // why doesn't Pie support unit?
      formatter,
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
var getTextAnchor = (x2, cx) => {
  if (x2 > cx) {
    return "start";
  }
  if (x2 < cx) {
    return "end";
  }
  return "middle";
};
var getOuterRadius = (dataPoint, outerRadius, maxPieRadius) => {
  if (typeof outerRadius === "function") {
    return getPercentValue(outerRadius(dataPoint), maxPieRadius, maxPieRadius * 0.8);
  }
  return getPercentValue(outerRadius, maxPieRadius, maxPieRadius * 0.8);
};
var parseCoordinateOfPie = (pieSettings, offset, dataPoint) => {
  var top = offset.top, left = offset.left, width = offset.width, height = offset.height;
  var maxPieRadius = getMaxRadius(width, height);
  var cx = left + getPercentValue(pieSettings.cx, width, width / 2);
  var cy = top + getPercentValue(pieSettings.cy, height, height / 2);
  var innerRadius = getPercentValue(pieSettings.innerRadius, maxPieRadius, 0);
  var outerRadius = getOuterRadius(dataPoint, pieSettings.outerRadius, maxPieRadius);
  var maxRadius = pieSettings.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx,
    cy,
    innerRadius,
    outerRadius,
    maxRadius
  };
};
var parseDeltaAngle = (startAngle, endAngle) => {
  var sign2 = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign2 * deltaAngle;
};
var renderLabelLineItem = (option, props) => {
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    return /* @__PURE__ */ reactExports.cloneElement(option, props);
  }
  if (typeof option === "function") {
    return option(props);
  }
  var className = clsx("recharts-pie-label-line", typeof option !== "boolean" ? option.className : "");
  props.key;
  var otherProps = _objectWithoutProperties$h(props, _excluded$h);
  return /* @__PURE__ */ reactExports.createElement(Curve, _extends$f({}, otherProps, {
    type: "linear",
    className
  }));
};
var renderLabelItem = (option, props, value) => {
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    return /* @__PURE__ */ reactExports.cloneElement(option, props);
  }
  var label = value;
  if (typeof option === "function") {
    label = option(props);
    if (/* @__PURE__ */ reactExports.isValidElement(label)) {
      return label;
    }
  }
  var className = clsx("recharts-pie-label-text", getClassNameFromUnknown(option));
  return /* @__PURE__ */ reactExports.createElement(Text, _extends$f({}, props, {
    alignmentBaseline: "middle",
    className
  }), label);
};
function PieLabels(_ref2) {
  var sectors = _ref2.sectors, props = _ref2.props, showLabels = _ref2.showLabels;
  var label = props.label, labelLine = props.labelLine, dataKey = props.dataKey;
  if (!showLabels || !label || !sectors) {
    return null;
  }
  var pieProps = svgPropertiesNoEvents(props);
  var customLabelProps = svgPropertiesNoEventsFromUnknown(label);
  var customLabelLineProps = svgPropertiesNoEventsFromUnknown(labelLine);
  var offsetRadius = typeof label === "object" && "offsetRadius" in label && typeof label.offsetRadius === "number" && label.offsetRadius || 20;
  var labels = sectors.map((entry, i) => {
    var midAngle = (entry.startAngle + entry.endAngle) / 2;
    var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
    var labelProps = _objectSpread$g(_objectSpread$g(_objectSpread$g(_objectSpread$g({}, pieProps), entry), {}, {
      // @ts-expect-error customLabelProps is contributing unknown props
      stroke: "none"
    }, customLabelProps), {}, {
      index: i,
      textAnchor: getTextAnchor(endPoint.x, entry.cx)
    }, endPoint);
    var lineProps = _objectSpread$g(_objectSpread$g(_objectSpread$g(_objectSpread$g({}, pieProps), entry), {}, {
      // @ts-expect-error customLabelLineProps is contributing unknown props
      fill: "none",
      // @ts-expect-error customLabelLineProps is contributing unknown props
      stroke: entry.fill
    }, customLabelLineProps), {}, {
      index: i,
      points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint],
      key: "line"
    });
    return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
      zIndex: DefaultZIndexes.label,
      key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
    }, /* @__PURE__ */ reactExports.createElement(Layer, null, labelLine && renderLabelLineItem(labelLine, lineProps), renderLabelItem(label, labelProps, getValueByDataKey(entry, dataKey))));
  });
  return /* @__PURE__ */ reactExports.createElement(Layer, {
    className: "recharts-pie-labels"
  }, labels);
}
function PieLabelList(_ref3) {
  var sectors = _ref3.sectors, props = _ref3.props, showLabels = _ref3.showLabels;
  var label = props.label;
  if (typeof label === "object" && label != null && "position" in label) {
    return /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
      label
    });
  }
  return /* @__PURE__ */ reactExports.createElement(PieLabels, {
    sectors,
    props,
    showLabels
  });
}
function PieSectors(props) {
  var sectors = props.sectors, activeShape = props.activeShape, inactiveShapeProp = props.inactiveShape, allOtherPieProps = props.allOtherPieProps, shape = props.shape, id = props.id, animationElapsedTime = props.animationElapsedTime, isAnimating = props.isAnimating, isEntrance = props.isEntrance;
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataKey = useAppSelector(selectActiveTooltipDataKey);
  var activeGraphicalItemId = useAppSelector(selectActiveTooltipGraphicalItemId);
  var onMouseEnterFromProps = allOtherPieProps.onMouseEnter, onItemClickFromProps = allOtherPieProps.onClick, onMouseLeaveFromProps = allOtherPieProps.onMouseLeave, restOfAllOtherProps = _objectWithoutProperties$h(allOtherPieProps, _excluded2$8);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, allOtherPieProps.dataKey, id);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, allOtherPieProps.dataKey, id);
  if (sectors == null || sectors.length === 0) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, sectors.map((entry, i) => {
    if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
    var graphicalItemMatches = activeGraphicalItemId == null || activeGraphicalItemId === id;
    var isActive = String(i) === activeIndex && (activeDataKey == null || allOtherPieProps.dataKey === activeDataKey) && graphicalItemMatches;
    var inactiveShape = activeIndex ? inactiveShapeProp : null;
    var sectorOptions = activeShape && isActive ? activeShape : inactiveShape;
    var sectorProps = _objectSpread$g(_objectSpread$g({}, entry), {}, {
      stroke: entry.stroke,
      tabIndex: -1,
      index: i,
      isActive,
      animationElapsedTime,
      isAnimating,
      isEntrance,
      [DATA_ITEM_INDEX_ATTRIBUTE_NAME]: i,
      [DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME]: id
    });
    return /* @__PURE__ */ reactExports.createElement(Layer, _extends$f({
      key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i),
      tabIndex: -1,
      className: "recharts-pie-sector"
    }, adaptEventsOfChild(restOfAllOtherProps, entry, i), {
      onMouseEnter: onMouseEnterFromContext(entry, i),
      onMouseLeave: onMouseLeaveFromContext(entry, i),
      onClick: onClickFromContext(entry, i)
    }), /* @__PURE__ */ reactExports.createElement(Shape, {
      option: sectorOptions !== null && sectorOptions !== void 0 ? sectorOptions : shape,
      DefaultShape: defaultPieSectorShape,
      shapeProps: sectorProps
    }));
  }));
}
function computePieSectors(_ref4) {
  var _pieSettings$paddingA;
  var pieSettings = _ref4.pieSettings, displayedData = _ref4.displayedData, cells = _ref4.cells, offset = _ref4.offset;
  var cornerRadius = pieSettings.cornerRadius, startAngle = pieSettings.startAngle, endAngle = pieSettings.endAngle, dataKey = pieSettings.dataKey, nameKey = pieSettings.nameKey, tooltipType = pieSettings.tooltipType;
  var minAngle = Math.abs(pieSettings.minAngle);
  var deltaAngle = parseDeltaAngle(startAngle, endAngle);
  var absDeltaAngle = Math.abs(deltaAngle);
  var paddingAngle = displayedData.length <= 1 ? 0 : (_pieSettings$paddingA = pieSettings.paddingAngle) !== null && _pieSettings$paddingA !== void 0 ? _pieSettings$paddingA : 0;
  var notZeroItemCount = displayedData.filter((entry) => getValueByDataKey(entry, dataKey, 0) !== 0).length;
  var totalPaddingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
  var sum = displayedData.reduce((result, entry) => {
    var val = getValueByDataKey(entry, dataKey, 0);
    return result + (isNumber(val) ? val : 0);
  }, 0);
  var needsMinAngleAdjustment = minAngle > 0 && sum > 0 && displayedData.some((entry) => {
    var val = getValueByDataKey(entry, dataKey, 0);
    var percent = (isNumber(val) ? val : 0) / sum;
    return val !== 0 && percent * absDeltaAngle < minAngle;
  });
  var effectiveMinAngle = needsMinAngleAdjustment ? minAngle : 0;
  var realTotalAngle = absDeltaAngle - notZeroItemCount * effectiveMinAngle - totalPaddingAngle;
  var sectors;
  if (sum > 0) {
    var prev;
    sectors = displayedData.map((entry, i) => {
      var val = getValueByDataKey(entry, dataKey, 0);
      var name = getValueByDataKey(entry, nameKey, i);
      var coordinate = parseCoordinateOfPie(pieSettings, offset, entry);
      var percent = (isNumber(val) ? val : 0) / sum;
      var tempStartAngle;
      var entryWithCellInfo = _objectSpread$g(_objectSpread$g({}, entry), cells && cells[i] && cells[i].props);
      var sectorColor = entryWithCellInfo != null && "fill" in entryWithCellInfo && typeof entryWithCellInfo.fill === "string" ? entryWithCellInfo.fill : pieSettings.fill;
      if (i) {
        tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
      } else {
        tempStartAngle = startAngle;
      }
      var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? effectiveMinAngle : 0) + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name,
        value: val,
        payload: entryWithCellInfo,
        dataKey,
        type: tooltipType,
        color: sectorColor,
        fill: sectorColor,
        graphicalItemId: pieSettings.id
      }];
      var tooltipPosition = polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread$g(_objectSpread$g(_objectSpread$g(_objectSpread$g({}, pieSettings.presentationProps), {}, {
        percent,
        cornerRadius: typeof cornerRadius === "string" ? parseFloat(cornerRadius) : cornerRadius,
        name,
        tooltipPayload,
        midAngle,
        middleRadius,
        tooltipPosition
      }, entryWithCellInfo), coordinate), {}, {
        value: val,
        dataKey,
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entryWithCellInfo,
        paddingAngle: val !== 0 ? mathSign(deltaAngle) * paddingAngle : 0
      });
      return prev;
    });
  }
  return sectors;
}
function PieLabelListProvider(_ref5) {
  var showLabels = _ref5.showLabels, sectors = _ref5.sectors, children = _ref5.children;
  var labelListEntries = reactExports.useMemo(() => {
    if (!showLabels || !sectors) {
      return [];
    }
    return sectors.map((entry) => ({
      value: entry.value,
      payload: entry.payload,
      clockWise: false,
      parentViewBox: void 0,
      viewBox: {
        cx: entry.cx,
        cy: entry.cy,
        innerRadius: entry.innerRadius,
        outerRadius: entry.outerRadius,
        startAngle: entry.startAngle,
        endAngle: entry.endAngle,
        clockWise: false
      },
      fill: entry.fill
    }));
  }, [sectors, showLabels]);
  return /* @__PURE__ */ reactExports.createElement(PolarLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
var defaultPieAnimateItems = (items, animationElapsedTime) => {
  if (items == null) return [];
  var stepData = [];
  var firstNonRemoved = items.find((item) => item.status !== "removed");
  var curAngle = firstNonRemoved ? firstNonRemoved.next.startAngle : 0;
  items.forEach((item, index) => {
    if (item.status === "removed") return;
    var paddingAngle = index > 0 ? get$1(item.next, "paddingAngle", 0) : 0;
    if (item.status === "matched") {
      var angle = interpolate$1(item.prev.endAngle - item.prev.startAngle, item.next.endAngle - item.next.startAngle, animationElapsedTime);
      var latest2 = _objectSpread$g(_objectSpread$g({}, item.next), {}, {
        startAngle: curAngle + paddingAngle,
        endAngle: curAngle + angle + paddingAngle
      });
      stepData.push(latest2);
      curAngle = latest2.endAngle;
    } else {
      var deltaAngle = interpolate$1(0, item.next.endAngle - item.next.startAngle, animationElapsedTime);
      var _latest = _objectSpread$g(_objectSpread$g({}, item.next), {}, {
        startAngle: curAngle + paddingAngle,
        endAngle: curAngle + deltaAngle + paddingAngle
      });
      stepData.push(_latest);
      curAngle = _latest.endAngle;
    }
  });
  return stepData;
};
function SectorsWithAnimation(_ref6) {
  var _firstSector$cx, _firstSector$cy, _firstSector$innerRad, _firstSector$outerRad;
  var props = _ref6.props, previousSectorsRef = _ref6.previousSectorsRef, id = _ref6.id;
  var sectors = props.sectors, activeShape = props.activeShape, inactiveShape = props.inactiveShape, animationInterpolateFn = props.animationInterpolateFn;
  var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
  var layout = usePolarChartLayout();
  if (layout == null) return null;
  var firstSector = sectors[0];
  return /* @__PURE__ */ reactExports.createElement(PieLabelListProvider, {
    showLabels: !isAnimating,
    sectors
  }, /* @__PURE__ */ reactExports.createElement(AnimatedItems, {
    animationInput: props,
    animationIdPrefix: "recharts-pie-",
    items: sectors,
    previousItemsRef: previousSectorsRef,
    isAnimationActive: props.isAnimationActive,
    animationBegin: props.animationBegin,
    animationDuration: props.animationDuration,
    animationEasing: props.animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    animationInterpolateFn,
    animationMatchBy: props.animationMatchBy,
    layout
  }, (stepData, animationElapsedTime, isEntrance) => /* @__PURE__ */ reactExports.createElement(Layer, null, /* @__PURE__ */ reactExports.createElement(PieSectors, {
    sectors: stepData,
    activeShape,
    inactiveShape,
    allOtherPieProps: props,
    shape: props.shape,
    id,
    animationElapsedTime,
    isAnimating: isAnimating || animationElapsedTime < 1,
    isEntrance
  }))), /* @__PURE__ */ reactExports.createElement(PieLabelList, {
    showLabels: !isAnimating,
    sectors,
    props
  }), /* @__PURE__ */ reactExports.createElement(PolarLabelContextProvider, {
    cx: (_firstSector$cx = firstSector === null || firstSector === void 0 ? void 0 : firstSector.cx) !== null && _firstSector$cx !== void 0 ? _firstSector$cx : 0,
    cy: (_firstSector$cy = firstSector === null || firstSector === void 0 ? void 0 : firstSector.cy) !== null && _firstSector$cy !== void 0 ? _firstSector$cy : 0,
    innerRadius: (_firstSector$innerRad = firstSector === null || firstSector === void 0 ? void 0 : firstSector.innerRadius) !== null && _firstSector$innerRad !== void 0 ? _firstSector$innerRad : 0,
    outerRadius: (_firstSector$outerRad = firstSector === null || firstSector === void 0 ? void 0 : firstSector.outerRadius) !== null && _firstSector$outerRad !== void 0 ? _firstSector$outerRad : 0,
    startAngle: props.startAngle,
    endAngle: props.endAngle,
    clockWise: false
  }, props.children));
}
var defaultPieProps = {
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  animationInterpolateFn: defaultPieAnimateItems,
  animationMatchBy: matchAppend,
  cx: "50%",
  cy: "50%",
  dataKey: "value",
  endAngle: 360,
  fill: "#808080",
  hide: false,
  innerRadius: 0,
  isAnimationActive: "auto",
  label: false,
  labelLine: true,
  legendType: "rect",
  minAngle: 0,
  nameKey: "name",
  outerRadius: "80%",
  paddingAngle: 0,
  rootTabIndex: 0,
  shape: defaultPieSectorShape,
  startAngle: 0,
  stroke: "#fff",
  zIndex: DefaultZIndexes.area
};
function PieImpl(props) {
  var id = props.id, propsWithoutId = _objectWithoutProperties$h(props, _excluded3$5);
  var hide = props.hide, className = props.className, rootTabIndex = props.rootTabIndex;
  var cells = reactExports.useMemo(() => findAllByType(props.children, Cell), [props.children]);
  var sectors = useAppSelector((state) => selectPieSectors(state, id, cells));
  var previousSectorsRef = reactExports.useRef(null);
  var layerClass = clsx("recharts-pie", className);
  if (hide || sectors == null) {
    previousSectorsRef.current = null;
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      tabIndex: rootTabIndex,
      className: layerClass
    });
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ reactExports.createElement(SetPieTooltipEntrySettings, {
    dataKey: props.dataKey,
    nameKey: props.nameKey,
    sectors,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    tooltipType: props.tooltipType,
    formatter: props.formatter,
    id,
    activeShape: props.activeShape
  }), /* @__PURE__ */ reactExports.createElement(Layer, {
    tabIndex: rootTabIndex,
    className: layerClass
  }, /* @__PURE__ */ reactExports.createElement(SectorsWithAnimation, {
    props: _objectSpread$g(_objectSpread$g({}, propsWithoutId), {}, {
      sectors
    }),
    previousSectorsRef,
    id
  })));
}
function PieFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultPieProps);
  var externalId = props.id, propsWithoutId = _objectWithoutProperties$h(props, _excluded4$2);
  var presentationProps = svgPropertiesNoEvents(propsWithoutId);
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: externalId,
    type: "pie"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetPolarGraphicalItem, {
    type: "pie",
    id,
    data: propsWithoutId.data,
    dataKey: propsWithoutId.dataKey,
    hide: propsWithoutId.hide,
    angleAxisId: 0,
    radiusAxisId: 0,
    name: propsWithoutId.name,
    nameKey: propsWithoutId.nameKey,
    tooltipType: propsWithoutId.tooltipType,
    legendType: propsWithoutId.legendType,
    fill: propsWithoutId.fill,
    cx: propsWithoutId.cx,
    cy: propsWithoutId.cy,
    startAngle: propsWithoutId.startAngle,
    endAngle: propsWithoutId.endAngle,
    paddingAngle: propsWithoutId.paddingAngle,
    minAngle: propsWithoutId.minAngle,
    innerRadius: propsWithoutId.innerRadius,
    outerRadius: propsWithoutId.outerRadius,
    cornerRadius: propsWithoutId.cornerRadius,
    presentationProps,
    maxRadius: props.maxRadius
  }), /* @__PURE__ */ reactExports.createElement(SetPiePayloadLegend, _extends$f({}, propsWithoutId, {
    id
  })), /* @__PURE__ */ reactExports.createElement(PieImpl, _extends$f({}, propsWithoutId, {
    id
  }))));
}
var Pie = PieFn;
Pie.displayName = "Pie";
var _excluded$g = ["points"];
function ownKeys$f(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$f(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$f(Object(t), true).forEach(function(r2) {
      _defineProperty$f(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$f(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$f(e, r, t) {
  return (r = _toPropertyKey$f(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$f(t) {
  var i = _toPrimitive$f(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$f(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$e() {
  return _extends$e = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$e.apply(null, arguments);
}
function _objectWithoutProperties$g(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$g(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$g(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function DotItem(_ref2) {
  var option = _ref2.option, dotProps = _ref2.dotProps, className = _ref2.className;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    return /* @__PURE__ */ reactExports.cloneElement(option, dotProps);
  }
  if (typeof option === "function") {
    return option(dotProps);
  }
  var finalClassName = clsx(className, typeof option !== "boolean" ? option.className : "");
  var _ref22 = dotProps !== null && dotProps !== void 0 ? dotProps : {};
  _ref22.points;
  var props = _objectWithoutProperties$g(_ref22, _excluded$g);
  return /* @__PURE__ */ reactExports.createElement(Dot, _extends$e({}, props, {
    className: finalClassName
  }));
}
function shouldRenderDots(points, dot) {
  if (points == null) {
    return false;
  }
  if (dot) {
    return true;
  }
  return points.length === 1;
}
function Dots(_ref3) {
  var points = _ref3.points, dot = _ref3.dot, className = _ref3.className, dotClassName = _ref3.dotClassName, dataKey = _ref3.dataKey, baseProps = _ref3.baseProps, needClip = _ref3.needClip, clipPathId = _ref3.clipPathId, _ref3$zIndex = _ref3.zIndex, zIndex = _ref3$zIndex === void 0 ? DefaultZIndexes.scatter : _ref3$zIndex;
  if (!shouldRenderDots(points, dot)) {
    return null;
  }
  var clipDot = isClipDot(dot);
  var customDotProps = svgPropertiesAndEventsFromUnknown(dot);
  var dots = points.map((entry, i) => {
    var _entry$x, _entry$y;
    var dotProps = _objectSpread$f(_objectSpread$f(_objectSpread$f({
      r: 3
    }, baseProps), customDotProps), {}, {
      index: i,
      cx: (_entry$x = entry.x) !== null && _entry$x !== void 0 ? _entry$x : void 0,
      cy: (_entry$y = entry.y) !== null && _entry$y !== void 0 ? _entry$y : void 0,
      dataKey,
      value: entry.value,
      payload: entry.payload,
      points
    });
    return /* @__PURE__ */ reactExports.createElement(DotItem, {
      key: "dot-".concat(i),
      option: dot,
      dotProps,
      className: dotClassName
    });
  });
  var layerProps = {};
  if (needClip && clipPathId != null) {
    layerProps.clipPath = "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")");
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex
  }, /* @__PURE__ */ reactExports.createElement(Layer, _extends$e({
    className
  }, layerProps), dots));
}
function ownKeys$e(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$e(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$e(Object(t), true).forEach(function(r2) {
      _defineProperty$e(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$e(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$e(e, r, t) {
  return (r = _toPropertyKey$e(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$e(t) {
  var i = _toPrimitive$e(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$e(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultAxisId = 0;
var initialState$6 = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
};
var cartesianAxisSlice = createSlice({
  name: "cartesianAxis",
  initialState: initialState$6,
  reducers: {
    addXAxis: {
      reducer(state, action) {
        state.xAxis[action.payload.id] = castDraft(action.payload);
      },
      prepare: prepareAutoBatched()
    },
    replaceXAxis: {
      reducer(state, action) {
        var _action$payload = action.payload, prev = _action$payload.prev, next = _action$payload.next;
        if (state.xAxis[prev.id] !== void 0) {
          if (prev.id !== next.id) {
            delete state.xAxis[prev.id];
          }
          state.xAxis[next.id] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeXAxis: {
      reducer(state, action) {
        delete state.xAxis[action.payload.id];
      },
      prepare: prepareAutoBatched()
    },
    addYAxis: {
      reducer(state, action) {
        state.yAxis[action.payload.id] = castDraft(action.payload);
      },
      prepare: prepareAutoBatched()
    },
    replaceYAxis: {
      reducer(state, action) {
        var _action$payload2 = action.payload, prev = _action$payload2.prev, next = _action$payload2.next;
        if (state.yAxis[prev.id] !== void 0) {
          if (prev.id !== next.id) {
            delete state.yAxis[prev.id];
          }
          state.yAxis[next.id] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeYAxis: {
      reducer(state, action) {
        delete state.yAxis[action.payload.id];
      },
      prepare: prepareAutoBatched()
    },
    addZAxis: {
      reducer(state, action) {
        state.zAxis[action.payload.id] = castDraft(action.payload);
      },
      prepare: prepareAutoBatched()
    },
    replaceZAxis: {
      reducer(state, action) {
        var _action$payload3 = action.payload, prev = _action$payload3.prev, next = _action$payload3.next;
        if (state.zAxis[prev.id] !== void 0) {
          if (prev.id !== next.id) {
            delete state.zAxis[prev.id];
          }
          state.zAxis[next.id] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeZAxis: {
      reducer(state, action) {
        delete state.zAxis[action.payload.id];
      },
      prepare: prepareAutoBatched()
    },
    updateYAxisWidth(state, action) {
      var _action$payload4 = action.payload, id = _action$payload4.id, width = _action$payload4.width;
      var axis = state.yAxis[id];
      if (axis) {
        var _history$;
        var history = axis.widthHistory || [];
        if (history.length === 3 && history[0] === history[2] && width === history[1] && width !== axis.width && Math.abs(width - ((_history$ = history[0]) !== null && _history$ !== void 0 ? _history$ : 0)) <= 1) {
          return;
        }
        var newHistory = [...history, width].slice(-3);
        state.yAxis[id] = _objectSpread$e(_objectSpread$e({}, axis), {}, {
          width,
          widthHistory: newHistory
        });
      }
    },
    updateXAxisHeight(state, action) {
      var _action$payload5 = action.payload, id = _action$payload5.id, height = _action$payload5.height;
      var axis = state.xAxis[id];
      if (axis) {
        var _history$2;
        var history = axis.heightHistory || [];
        if (history.length === 3 && history[0] === history[2] && height === history[1] && height !== axis.height && Math.abs(height - ((_history$2 = history[0]) !== null && _history$2 !== void 0 ? _history$2 : 0)) <= 1) {
          return;
        }
        var newHistory = [...history, height].slice(-3);
        state.xAxis[id] = _objectSpread$e(_objectSpread$e({}, axis), {}, {
          height,
          heightHistory: newHistory
        });
      }
    }
  }
});
var _cartesianAxisSlice$a = cartesianAxisSlice.actions, addXAxis = _cartesianAxisSlice$a.addXAxis, replaceXAxis = _cartesianAxisSlice$a.replaceXAxis, removeXAxis = _cartesianAxisSlice$a.removeXAxis, addYAxis = _cartesianAxisSlice$a.addYAxis, replaceYAxis = _cartesianAxisSlice$a.replaceYAxis, removeYAxis = _cartesianAxisSlice$a.removeYAxis;
_cartesianAxisSlice$a.addZAxis;
_cartesianAxisSlice$a.replaceZAxis;
_cartesianAxisSlice$a.removeZAxis;
var updateYAxisWidth = _cartesianAxisSlice$a.updateYAxisWidth, updateXAxisHeight = _cartesianAxisSlice$a.updateXAxisHeight;
var cartesianAxisReducer = cartesianAxisSlice.reducer;
var selectChartOffset = createSelector([selectChartOffsetInternal], (offsetInternal) => {
  return {
    top: offsetInternal.top,
    bottom: offsetInternal.bottom,
    left: offsetInternal.left,
    right: offsetInternal.right
  };
});
var selectPlotArea = createSelector([selectChartOffset, selectChartWidth, selectChartHeight], (offset, chartWidth, chartHeight) => {
  if (!offset || chartWidth == null || chartHeight == null) {
    return void 0;
  }
  return {
    x: offset.left,
    y: offset.top,
    width: Math.max(0, chartWidth - offset.left - offset.right),
    height: Math.max(0, chartHeight - offset.top - offset.bottom)
  };
});
var usePlotArea = () => {
  return useAppSelector(selectPlotArea);
};
var useActiveTooltipDataPoints = () => {
  return useAppSelector(selectActiveTooltipDataPoints);
};
function ownKeys$d(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$d(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$d(Object(t), true).forEach(function(r2) {
      _defineProperty$d(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$d(e, r, t) {
  return (r = _toPropertyKey$d(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$d(t) {
  var i = _toPrimitive$d(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$d(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var ActivePoint = (_ref2) => {
  var point2 = _ref2.point, childIndex = _ref2.childIndex, mainColor = _ref2.mainColor, activeDot = _ref2.activeDot, dataKey = _ref2.dataKey, clipPath = _ref2.clipPath;
  if (activeDot === false || point2.x == null || point2.y == null) {
    return null;
  }
  var dotPropsTyped = {
    index: childIndex,
    dataKey,
    cx: point2.x,
    cy: point2.y,
    r: 4,
    fill: mainColor !== null && mainColor !== void 0 ? mainColor : "none",
    strokeWidth: 2,
    stroke: "#fff",
    payload: point2.payload,
    value: point2.value
  };
  var dotProps = _objectSpread$d(_objectSpread$d(_objectSpread$d({}, dotPropsTyped), svgPropertiesNoEventsFromUnknown(activeDot)), adaptEventHandlers(activeDot));
  var dot;
  if (/* @__PURE__ */ reactExports.isValidElement(activeDot)) {
    dot = /* @__PURE__ */ reactExports.cloneElement(activeDot, dotProps);
  } else if (typeof activeDot === "function") {
    dot = activeDot(dotProps);
  } else {
    dot = /* @__PURE__ */ reactExports.createElement(Dot, dotProps);
  }
  return /* @__PURE__ */ reactExports.createElement(Layer, {
    className: "recharts-active-dot",
    clipPath
  }, dot);
};
function ActivePoints(_ref2) {
  var points = _ref2.points, mainColor = _ref2.mainColor, activeDot = _ref2.activeDot, itemDataKey = _ref2.itemDataKey, clipPath = _ref2.clipPath, _ref2$zIndex = _ref2.zIndex, zIndex = _ref2$zIndex === void 0 ? DefaultZIndexes.activeDot : _ref2$zIndex;
  var activeTooltipIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataPoints = useActiveTooltipDataPoints();
  if (points == null || activeDataPoints == null) {
    return null;
  }
  var activePoint = points.find((p) => activeDataPoints.includes(p.payload));
  if (isNullish(activePoint)) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex
  }, /* @__PURE__ */ reactExports.createElement(ActivePoint, {
    point: activePoint,
    childIndex: Number(activeTooltipIndex),
    mainColor,
    dataKey: itemDataKey,
    activeDot,
    clipPath
  }));
}
function _slicedToArray$5(r, e) {
  return _arrayWithHoles$5(r) || _iterableToArrayLimit$5(r, e) || _unsupportedIterableToArray$5(r, e) || _nonIterableRest$5();
}
function _nonIterableRest$5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$5(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$5(r, a2) : void 0;
  }
}
function _arrayLikeToArray$5(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$5(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$5(r) {
  if (Array.isArray(r)) return r;
}
var getBarSize = (globalSize, totalSize, selfSize) => {
  var barSize = selfSize !== null && selfSize !== void 0 ? selfSize : globalSize;
  if (isNullish(barSize)) {
    return void 0;
  }
  return getPercentValue(barSize, totalSize, 0);
};
var combineBarSizeList = (allBars, globalSize, totalSize) => {
  var initialValue = {};
  var stackedBars = allBars.filter(isStacked);
  var unstackedBars = allBars.filter((b) => b.stackId == null);
  var groupByStack = stackedBars.reduce((acc, bar) => {
    var s2 = acc[bar.stackId];
    if (s2 == null) {
      s2 = [];
    }
    s2.push(bar);
    acc[bar.stackId] = s2;
    return acc;
  }, initialValue);
  var stackedSizeList = Object.entries(groupByStack).map((_ref2) => {
    var _bars$;
    var _ref22 = _slicedToArray$5(_ref2, 2), stackId = _ref22[0], bars = _ref22[1];
    var dataKeys = bars.map((b) => b.dataKey);
    var barSize = getBarSize(globalSize, totalSize, (_bars$ = bars[0]) === null || _bars$ === void 0 ? void 0 : _bars$.barSize);
    return {
      stackId,
      dataKeys,
      barSize
    };
  });
  var unstackedSizeList = unstackedBars.map((b) => {
    var dataKeys = [b.dataKey].filter((dk) => dk != null);
    var barSize = getBarSize(globalSize, totalSize, b.barSize);
    return {
      stackId: void 0,
      dataKeys,
      barSize
    };
  });
  return [...stackedSizeList, ...unstackedSizeList];
};
function ownKeys$c(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$c(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$c(Object(t), true).forEach(function(r2) {
      _defineProperty$c(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$c(e, r, t) {
  return (r = _toPropertyKey$c(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$c(t) {
  var i = _toPrimitive$c(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$c(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getBarPositions(barGap, barCategoryGap, bandSize, sizeList, maxBarSize) {
  var _sizeList$;
  var len = sizeList.length;
  if (len < 1) {
    return void 0;
  }
  var realBarGap = getPercentValue(barGap, bandSize, 0, true);
  var result;
  var initialValue = [];
  if (isWellBehavedNumber((_sizeList$ = sizeList[0]) === null || _sizeList$ === void 0 ? void 0 : _sizeList$.barSize)) {
    var useFull = false;
    var fullBarSize = bandSize / len;
    var sum = sizeList.reduce((res, entry) => res + (entry.barSize || 0), 0);
    sum += (len - 1) * realBarGap;
    if (sum >= bandSize) {
      sum -= (len - 1) * realBarGap;
      realBarGap = 0;
    }
    if (sum >= bandSize && fullBarSize > 0) {
      useFull = true;
      fullBarSize *= 0.9;
      sum = len * fullBarSize;
    }
    var offset = Math.round((bandSize - sum) / 2);
    var prev = {
      offset: offset - realBarGap,
      size: 0
    };
    result = sizeList.reduce((res, entry) => {
      var _entry$barSize;
      var newPosition = {
        stackId: entry.stackId,
        dataKeys: entry.dataKeys,
        position: {
          offset: prev.offset + prev.size + realBarGap,
          size: useFull ? fullBarSize : (_entry$barSize = entry.barSize) !== null && _entry$barSize !== void 0 ? _entry$barSize : 0
        }
      };
      var newRes = [...res, newPosition];
      prev = newPosition.position;
      return newRes;
    }, initialValue);
  } else {
    var _offset = getPercentValue(barCategoryGap, bandSize, 0, true);
    if (bandSize - 2 * _offset - (len - 1) * realBarGap <= 0) {
      realBarGap = 0;
    }
    var originalSize = (bandSize - 2 * _offset - (len - 1) * realBarGap) / len;
    if (originalSize > 1) {
      originalSize = Math.round(originalSize);
    }
    var size = isWellBehavedNumber(maxBarSize) ? Math.min(originalSize, maxBarSize) : originalSize;
    result = sizeList.reduce((res, entry, i) => [...res, {
      stackId: entry.stackId,
      dataKeys: entry.dataKeys,
      position: {
        offset: _offset + len * (originalSize - size) / 2 + (size + realBarGap) * i,
        size
      }
    }], initialValue);
  }
  return result;
}
var combineAllBarPositions = (sizeList, globalMaxBarSize, barGap, barCategoryGap, barBandSize, bandSize, childMaxBarSize) => {
  var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
  var allBarPositions = getBarPositions(barGap, barCategoryGap, barBandSize !== bandSize ? barBandSize : bandSize, sizeList, maxBarSize);
  if (barBandSize !== bandSize && allBarPositions != null) {
    allBarPositions = allBarPositions.map((pos) => _objectSpread$c(_objectSpread$c({}, pos), {}, {
      position: _objectSpread$c(_objectSpread$c({}, pos.position), {}, {
        offset: pos.position.offset - barBandSize / 2
      })
    }));
  }
  return allBarPositions;
};
var combineStackedData = (stackGroups, barSettings) => {
  var stackSeriesIdentifier = getStackSeriesIdentifier(barSettings);
  if (!stackGroups || stackSeriesIdentifier == null || barSettings == null) {
    return void 0;
  }
  var stackId = barSettings.stackId;
  if (stackId == null) {
    return void 0;
  }
  var stackGroup = stackGroups[stackId];
  if (!stackGroup) {
    return void 0;
  }
  var stackedData = stackGroup.stackedData;
  if (!stackedData) {
    return void 0;
  }
  return stackedData.find((sd) => sd.key === stackSeriesIdentifier);
};
var combineBarPosition = (allBarPositions, barSettings) => {
  if (allBarPositions == null || barSettings == null) {
    return void 0;
  }
  var position = allBarPositions.find((p) => p.stackId === barSettings.stackId && barSettings.dataKey != null && p.dataKeys.includes(barSettings.dataKey));
  if (position == null) {
    return void 0;
  }
  return position.position;
};
function getZIndexFromUnknown(input, defaultZIndex) {
  if (input && typeof input === "object" && "zIndex" in input && typeof input.zIndex === "number" && isWellBehavedNumber(input.zIndex)) {
    return input.zIndex;
  }
  return defaultZIndex;
}
var ChartDataContextProvider = (props) => {
  var chartData = props.chartData;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  reactExports.useEffect(() => {
    if (isPanorama) {
      return () => {
      };
    }
    dispatch(setChartData(chartData));
    return () => {
      dispatch(setChartData(void 0));
    };
  }, [chartData, dispatch, isPanorama]);
  return null;
};
var initialState$5 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};
var brushSlice = createSlice({
  name: "brush",
  initialState: initialState$5,
  reducers: {
    setBrushSettings(_state, action) {
      if (action.payload == null) {
        return initialState$5;
      }
      return action.payload;
    }
  }
});
brushSlice.actions.setBrushSettings;
var brushReducer = brushSlice.reducer;
function normalizeAngle(angle) {
  return (angle % 180 + 180) % 180;
}
var getAngledRectangleWidth = function getAngledRectangleWidth2(_ref4) {
  var width = _ref4.width, height = _ref4.height;
  var angle = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var normalizedAngle = normalizeAngle(angle);
  var angleRadians = normalizedAngle * Math.PI / 180;
  var angleThreshold = Math.atan(height / width);
  var angledWidth = angleRadians > angleThreshold && angleRadians < Math.PI - angleThreshold ? height / Math.sin(angleRadians) : width / Math.cos(angleRadians);
  return Math.abs(angledWidth);
};
var initialState$4 = {
  dots: [],
  areas: [],
  lines: []
};
var referenceElementsSlice = createSlice({
  name: "referenceElements",
  initialState: initialState$4,
  reducers: {
    addDot: (state, action) => {
      state.dots.push(action.payload);
    },
    removeDot: (state, action) => {
      var index = current(state).dots.findIndex((dot) => dot === action.payload);
      if (index !== -1) {
        state.dots.splice(index, 1);
      }
    },
    addArea: (state, action) => {
      state.areas.push(action.payload);
    },
    removeArea: (state, action) => {
      var index = current(state).areas.findIndex((area) => area === action.payload);
      if (index !== -1) {
        state.areas.splice(index, 1);
      }
    },
    addLine: (state, action) => {
      state.lines.push(castDraft(action.payload));
    },
    removeLine: (state, action) => {
      var index = current(state).lines.findIndex((line) => line === action.payload);
      if (index !== -1) {
        state.lines.splice(index, 1);
      }
    }
  }
});
var _referenceElementsSli = referenceElementsSlice.actions;
_referenceElementsSli.addDot;
_referenceElementsSli.removeDot;
_referenceElementsSli.addArea;
_referenceElementsSli.removeArea;
_referenceElementsSli.addLine;
_referenceElementsSli.removeLine;
var referenceElementsReducer = referenceElementsSlice.reducer;
function _slicedToArray$4(r, e) {
  return _arrayWithHoles$4(r) || _iterableToArrayLimit$4(r, e) || _unsupportedIterableToArray$4(r, e) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$4(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$4(r, a2) : void 0;
  }
}
function _arrayLikeToArray$4(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$4(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$4(r) {
  if (Array.isArray(r)) return r;
}
var ClipPathIdContext = /* @__PURE__ */ reactExports.createContext(void 0);
var ClipPathProvider = (_ref2) => {
  var children = _ref2.children;
  var _useState = reactExports.useState("".concat(uniqueId("recharts"), "-clip")), _useState2 = _slicedToArray$4(_useState, 1), clipPathId = _useState2[0];
  var plotArea = usePlotArea();
  if (plotArea == null) {
    return null;
  }
  var x2 = plotArea.x, y2 = plotArea.y, width = plotArea.width, height = plotArea.height;
  return /* @__PURE__ */ reactExports.createElement(ClipPathIdContext.Provider, {
    value: clipPathId
  }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("clipPath", {
    id: clipPathId
  }, /* @__PURE__ */ reactExports.createElement("rect", {
    x: x2,
    y: y2,
    height,
    width
  }))), children);
};
function noop() {
}
function isPlainObject(value) {
  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  if (!(proto === null || proto === Object.prototype || Object.getPrototypeOf(proto) === null)) return false;
  return Object.prototype.toString.call(value) === "[object Object]";
}
function isEqualWith(a2, b, areValuesEqual) {
  return isEqualWithImpl(a2, b, void 0, void 0, void 0, void 0, areValuesEqual);
}
function isEqualWithImpl(a2, b, property2, aParent, bParent, stack, areValuesEqual) {
  const result = areValuesEqual(a2, b, property2, aParent, bParent, stack);
  if (result !== void 0) return result;
  if (typeof a2 === typeof b) switch (typeof a2) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return a2 === b;
    case "number":
      return a2 === b || Object.is(a2, b);
    case "function":
      return a2 === b;
    case "object":
      return areObjectsEqual(a2, b, stack, areValuesEqual);
  }
  return areObjectsEqual(a2, b, stack, areValuesEqual);
}
function areObjectsEqual(a2, b, stack, areValuesEqual) {
  if (Object.is(a2, b)) return true;
  let aTag = getTag(a2);
  let bTag = getTag(b);
  if (aTag === "[object Arguments]") aTag = objectTag;
  if (bTag === "[object Arguments]") bTag = objectTag;
  if (aTag !== bTag) return false;
  switch (aTag) {
    case stringTag:
      return a2.toString() === b.toString();
    case numberTag:
      return eq(a2.valueOf(), b.valueOf());
    case booleanTag:
    case dateTag:
    case symbolTag:
      return Object.is(a2.valueOf(), b.valueOf());
    case regexpTag:
      return a2.source === b.source && a2.flags === b.flags;
    case functionTag:
      return a2 === b;
  }
  stack = stack ?? /* @__PURE__ */ new Map();
  const aStack = stack.get(a2);
  const bStack = stack.get(b);
  if (aStack != null && bStack != null) return aStack === b;
  stack.set(a2, b);
  stack.set(b, a2);
  try {
    switch (aTag) {
      case mapTag:
        if (a2.size !== b.size) return false;
        for (const [key, value] of a2.entries()) if (!b.has(key) || !isEqualWithImpl(value, b.get(key), key, a2, b, stack, areValuesEqual)) return false;
        return true;
      case setTag: {
        if (a2.size !== b.size) return false;
        const aValues = Array.from(a2.values());
        const bValues = Array.from(b.values());
        for (let i = 0; i < aValues.length; i++) {
          const aValue = aValues[i];
          const index = bValues.findIndex((bValue) => {
            return isEqualWithImpl(aValue, bValue, void 0, a2, b, stack, areValuesEqual);
          });
          if (index === -1) return false;
          bValues.splice(index, 1);
        }
        return true;
      }
      case arrayTag:
      case uint8ArrayTag:
      case uint8ClampedArrayTag:
      case uint16ArrayTag:
      case uint32ArrayTag:
      case bigUint64ArrayTag:
      case int8ArrayTag:
      case int16ArrayTag:
      case int32ArrayTag:
      case bigInt64ArrayTag:
      case float32ArrayTag:
      case float64ArrayTag:
        if (isBuffer(a2) !== isBuffer(b)) return false;
        if (a2.length !== b.length) return false;
        for (let i = 0; i < a2.length; i++) if (!isEqualWithImpl(a2[i], b[i], i, a2, b, stack, areValuesEqual)) return false;
        return true;
      case arrayBufferTag:
        if (a2.byteLength !== b.byteLength) return false;
        return areObjectsEqual(new Uint8Array(a2), new Uint8Array(b), stack, areValuesEqual);
      case dataViewTag:
        if (a2.byteLength !== b.byteLength || a2.byteOffset !== b.byteOffset) return false;
        return areObjectsEqual(new Uint8Array(a2), new Uint8Array(b), stack, areValuesEqual);
      case errorTag:
        return a2.name === b.name && a2.message === b.message;
      case objectTag: {
        if (!(areObjectsEqual(a2.constructor, b.constructor, stack, areValuesEqual) || isPlainObject(a2) && isPlainObject(b))) return false;
        const aKeys = [...Object.keys(a2), ...getSymbols(a2)];
        const bKeys = [...Object.keys(b), ...getSymbols(b)];
        if (aKeys.length !== bKeys.length) return false;
        for (let i = 0; i < aKeys.length; i++) {
          const propKey = aKeys[i];
          const aProp = a2[propKey];
          if (!Object.hasOwn(b, propKey)) return false;
          const bProp = b[propKey];
          if (!isEqualWithImpl(aProp, bProp, propKey, a2, b, stack, areValuesEqual)) return false;
        }
        return true;
      }
      default:
        return false;
    }
  } finally {
    stack.delete(a2);
    stack.delete(b);
  }
}
function isEqual(a2, b) {
  return isEqualWith(a2, b, noop);
}
function getEveryNth(array2, n) {
  if (n < 1) {
    return [];
  }
  if (n === 1) {
    return array2;
  }
  var result = [];
  for (var i = 0; i < array2.length; i += n) {
    var item = array2[i];
    if (item !== void 0) {
      result.push(item);
    }
  }
  return result;
}
function getAngledTickWidth(contentSize, unitSize, angle) {
  var size = {
    width: contentSize.width + unitSize.width,
    height: contentSize.height + unitSize.height
  };
  return getAngledRectangleWidth(size, angle);
}
function getTickBoundaries(viewBox, sign2, sizeKey) {
  var isWidth = sizeKey === "width";
  var x2 = viewBox.x, y2 = viewBox.y, width = viewBox.width, height = viewBox.height;
  if (sign2 === 1) {
    return {
      start: isWidth ? x2 : y2,
      end: isWidth ? x2 + width : y2 + height
    };
  }
  return {
    start: isWidth ? x2 + width : y2 + height,
    end: isWidth ? x2 : y2
  };
}
function isVisible(sign2, tickPosition, getSize, start, end) {
  if (sign2 * tickPosition < sign2 * start || sign2 * tickPosition > sign2 * end) {
    return false;
  }
  var size = getSize();
  return sign2 * (tickPosition - sign2 * size / 2 - start) >= 0 && sign2 * (tickPosition + sign2 * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks2, interval) {
  return getEveryNth(ticks2, interval + 1);
}
function getEquidistantTicks(sign2, boundaries, getTickSize, ticks2, minTickGap) {
  var result = (ticks2 || []).slice();
  var initialStart = boundaries.start, end = boundaries.end;
  var index = 0;
  var stepsize = 1;
  var start = initialStart;
  var _loop = function _loop2() {
    var entry = ticks2 === null || ticks2 === void 0 ? void 0 : ticks2[index];
    if (entry === void 0) {
      return {
        v: getEveryNth(ticks2, stepsize)
      };
    }
    var i = index;
    var size;
    var getSize = () => {
      if (size === void 0) {
        size = getTickSize(entry, i);
      }
      return size;
    };
    var tickCoord = entry.coordinate;
    var isShow = index === 0 || isVisible(sign2, tickCoord, getSize, start, end);
    if (!isShow) {
      index = 0;
      start = initialStart;
      stepsize += 1;
    }
    if (isShow) {
      start = tickCoord + sign2 * (getSize() / 2 + minTickGap);
      index += stepsize;
    }
  }, _ret;
  while (stepsize <= result.length) {
    _ret = _loop();
    if (_ret) return _ret.v;
  }
  return [];
}
function getEquidistantPreserveEndTicks(sign2, boundaries, getTickSize, ticks2, minTickGap) {
  var result = (ticks2 || []).slice();
  var len = result.length;
  if (len === 0) {
    return [];
  }
  var initialStart = boundaries.start, end = boundaries.end;
  for (var stepsize = 1; stepsize <= len; stepsize++) {
    var offset = (len - 1) % stepsize;
    var start = initialStart;
    var ok = true;
    var _loop2 = function _loop22() {
      var entry = ticks2[index];
      if (entry == null) {
        return 0;
      }
      var i = index;
      var size;
      var getSize = () => {
        if (size === void 0) {
          size = getTickSize(entry, i);
        }
        return size;
      };
      var tickCoord = entry.coordinate;
      var isShow = index === offset || isVisible(sign2, tickCoord, getSize, start, end);
      if (!isShow) {
        ok = false;
        return 1;
      }
      if (isShow) {
        start = tickCoord + sign2 * (getSize() / 2 + minTickGap);
      }
    }, _ret2;
    for (var index = offset; index < len; index += stepsize) {
      _ret2 = _loop2();
      if (_ret2 === 0) continue;
      if (_ret2 === 1) break;
    }
    if (ok) {
      var finalTicks = [];
      for (var _index = offset; _index < len; _index += stepsize) {
        var tick = ticks2[_index];
        if (tick != null) {
          finalTicks.push(tick);
        }
      }
      return finalTicks;
    }
  }
  return [];
}
function ownKeys$b(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$b(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$b(Object(t), true).forEach(function(r2) {
      _defineProperty$b(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$b(e, r, t) {
  return (r = _toPropertyKey$b(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$b(t) {
  var i = _toPrimitive$b(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$b(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getTicksEnd(sign2, boundaries, getTickSize, ticks2, minTickGap) {
  var result = (ticks2 || []).slice();
  var len = result.length;
  var start = boundaries.start;
  var end = boundaries.end;
  var _loop = function _loop2(i2) {
    var initialEntry = result[i2];
    if (initialEntry == null) {
      return 1;
    }
    var entry = initialEntry;
    var size;
    var getSize = () => {
      if (size === void 0) {
        size = getTickSize(initialEntry, i2);
      }
      return size;
    };
    if (i2 === len - 1) {
      var gap = sign2 * (entry.coordinate + sign2 * getSize() / 2 - end);
      result[i2] = entry = _objectSpread$b(_objectSpread$b({}, entry), {}, {
        tickCoord: gap > 0 ? entry.coordinate - gap * sign2 : entry.coordinate
      });
    } else {
      result[i2] = entry = _objectSpread$b(_objectSpread$b({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    if (entry.tickCoord != null) {
      var isShow = isVisible(sign2, entry.tickCoord, getSize, start, end);
      if (isShow) {
        end = entry.tickCoord - sign2 * (getSize() / 2 + minTickGap);
        result[i2] = _objectSpread$b(_objectSpread$b({}, entry), {}, {
          isShow: true
        });
      }
    }
  };
  for (var i = len - 1; i >= 0; i--) {
    if (_loop(i)) continue;
  }
  return result;
}
function getTicksStart(sign2, boundaries, getTickSize, ticks2, minTickGap, preserveEnd) {
  var result = (ticks2 || []).slice();
  var len = result.length;
  var start = boundaries.start, end = boundaries.end;
  if (preserveEnd) {
    var tail = ticks2[len - 1];
    if (tail != null) {
      var tailSize = getTickSize(tail, len - 1);
      var tailGap = sign2 * (tail.coordinate + sign2 * tailSize / 2 - end);
      result[len - 1] = tail = _objectSpread$b(_objectSpread$b({}, tail), {}, {
        tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign2 : tail.coordinate
      });
      if (tail.tickCoord != null) {
        var isTailShow = isVisible(sign2, tail.tickCoord, () => tailSize, start, end);
        if (isTailShow) {
          end = tail.tickCoord - sign2 * (tailSize / 2 + minTickGap);
          result[len - 1] = _objectSpread$b(_objectSpread$b({}, tail), {}, {
            isShow: true
          });
        }
      }
    }
  }
  var count = preserveEnd ? len - 1 : len;
  var _loop2 = function _loop22(i2) {
    var initialEntry = result[i2];
    if (initialEntry == null) {
      return 1;
    }
    var entry = initialEntry;
    var size;
    var getSize = () => {
      if (size === void 0) {
        size = getTickSize(initialEntry, i2);
      }
      return size;
    };
    if (i2 === 0) {
      var gap = sign2 * (entry.coordinate - sign2 * getSize() / 2 - start);
      result[i2] = entry = _objectSpread$b(_objectSpread$b({}, entry), {}, {
        tickCoord: gap < 0 ? entry.coordinate - gap * sign2 : entry.coordinate
      });
    } else {
      result[i2] = entry = _objectSpread$b(_objectSpread$b({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    if (entry.tickCoord != null) {
      var isShow = isVisible(sign2, entry.tickCoord, getSize, start, end);
      if (isShow) {
        start = entry.tickCoord + sign2 * (getSize() / 2 + minTickGap);
        result[i2] = _objectSpread$b(_objectSpread$b({}, entry), {}, {
          isShow: true
        });
      }
    }
  };
  for (var i = 0; i < count; i++) {
    if (_loop2(i)) continue;
  }
  return result;
}
function getTicks(props, fontSize, letterSpacing) {
  var tick = props.tick, ticks2 = props.ticks, viewBox = props.viewBox, minTickGap = props.minTickGap, orientation = props.orientation, interval = props.interval, tickFormatter = props.tickFormatter, unit2 = props.unit, angle = props.angle;
  if (!ticks2 || !ticks2.length || !tick) {
    return [];
  }
  if (isNumber(interval) || Global.isSsr) {
    var _getNumberIntervalTic;
    return (_getNumberIntervalTic = getNumberIntervalTicks(ticks2, isNumber(interval) ? interval : 0)) !== null && _getNumberIntervalTic !== void 0 ? _getNumberIntervalTic : [];
  }
  var candidates = [];
  var sizeKey = orientation === "top" || orientation === "bottom" ? "width" : "height";
  var unitSize = unit2 && sizeKey === "width" ? getStringSize(unit2, {
    fontSize,
    letterSpacing
  }) : {
    width: 0,
    height: 0
  };
  var getTickSize = (content, index) => {
    var value = typeof tickFormatter === "function" ? tickFormatter(content.value, index) : content.value;
    return sizeKey === "width" ? getAngledTickWidth(getStringSize(value, {
      fontSize,
      letterSpacing
    }), unitSize, angle) : getStringSize(value, {
      fontSize,
      letterSpacing
    })[sizeKey];
  };
  var tick0 = ticks2[0];
  var tick1 = ticks2[1];
  var sign2 = ticks2.length >= 2 && tick0 != null && tick1 != null ? mathSign(tick1.coordinate - tick0.coordinate) : 1;
  var boundaries = getTickBoundaries(viewBox, sign2, sizeKey);
  if (interval === "equidistantPreserveStart") {
    return getEquidistantTicks(sign2, boundaries, getTickSize, ticks2, minTickGap);
  }
  if (interval === "equidistantPreserveEnd") {
    return getEquidistantPreserveEndTicks(sign2, boundaries, getTickSize, ticks2, minTickGap);
  }
  if (interval === "preserveStart" || interval === "preserveStartEnd") {
    candidates = getTicksStart(sign2, boundaries, getTickSize, ticks2, minTickGap, interval === "preserveStartEnd");
  } else {
    candidates = getTicksEnd(sign2, boundaries, getTickSize, ticks2, minTickGap);
  }
  return candidates.filter((entry) => entry.isShow);
}
var getCalculatedYAxisWidth = (_ref2) => {
  var ticks2 = _ref2.ticks, label = _ref2.label, _ref$labelGapWithTick = _ref2.labelGapWithTick, labelGapWithTick = _ref$labelGapWithTick, _ref$tickSize = _ref2.tickSize, tickSize = _ref$tickSize === void 0 ? 0 : _ref$tickSize, _ref$tickMargin = _ref2.tickMargin, tickMargin = _ref$tickMargin === void 0 ? 0 : _ref$tickMargin;
  var maxTickWidth = 0;
  if (ticks2) {
    Array.from(ticks2).forEach((tickNode) => {
      if (tickNode) {
        var bbox = tickNode.getBoundingClientRect();
        if (bbox.width > maxTickWidth) {
          maxTickWidth = bbox.width;
        }
      }
    });
    var labelWidth = label ? label.getBoundingClientRect().width : 0;
    var tickWidth = tickSize + tickMargin;
    var updatedYAxisWidth = maxTickWidth + tickWidth + labelWidth + (label ? labelGapWithTick : 0);
    return Math.round(updatedYAxisWidth);
  }
  return 0;
};
var getCalculatedXAxisHeight = (_ref2) => {
  var ticks2 = _ref2.ticks, label = _ref2.label, _ref$labelGapWithTick = _ref2.labelGapWithTick, labelGapWithTick = _ref$labelGapWithTick, _ref$tickSize = _ref2.tickSize, tickSize = _ref$tickSize === void 0 ? 0 : _ref$tickSize, _ref$tickMargin = _ref2.tickMargin, tickMargin = _ref$tickMargin === void 0 ? 0 : _ref$tickMargin;
  var maxTickHeight = 0;
  if (ticks2) {
    Array.from(ticks2).forEach((tickNode) => {
      if (tickNode) {
        var bbox = tickNode.getBoundingClientRect();
        if (bbox.height > maxTickHeight) {
          maxTickHeight = bbox.height;
        }
      }
    });
    var labelHeight = label ? label.getBoundingClientRect().height : 0;
    var tickHeight = tickSize + tickMargin;
    var updatedXAxisHeight = maxTickHeight + tickHeight + labelHeight + (label ? labelGapWithTick : 0);
    return Math.round(updatedXAxisHeight);
  }
  return 0;
};
var initialState$3 = {
  xAxis: {},
  yAxis: {}
};
var renderedTicksSlice = createSlice({
  name: "renderedTicks",
  initialState: initialState$3,
  reducers: {
    setRenderedTicks: (state, action) => {
      var _action$payload = action.payload, axisType = _action$payload.axisType, axisId = _action$payload.axisId, ticks2 = _action$payload.ticks;
      state[axisType][axisId] = castDraft(ticks2);
    },
    removeRenderedTicks: (state, action) => {
      var _action$payload2 = action.payload, axisType = _action$payload2.axisType, axisId = _action$payload2.axisId;
      delete state[axisType][axisId];
    }
  }
});
var _renderedTicksSlice$a = renderedTicksSlice.actions, setRenderedTicks = _renderedTicksSlice$a.setRenderedTicks, removeRenderedTicks = _renderedTicksSlice$a.removeRenderedTicks;
var renderedTicksReducer = renderedTicksSlice.reducer;
var _excluded$f = ["axisLine", "width", "height", "className", "hide", "ticks", "axisType", "axisId"];
function _slicedToArray$3(r, e) {
  return _arrayWithHoles$3(r) || _iterableToArrayLimit$3(r, e) || _unsupportedIterableToArray$3(r, e) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$3(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a2) : void 0;
  }
}
function _arrayLikeToArray$3(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$3(r) {
  if (Array.isArray(r)) return r;
}
function _objectWithoutProperties$f(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$f(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$f(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _extends$d() {
  return _extends$d = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$d.apply(null, arguments);
}
function ownKeys$a(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$a(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$a(Object(t), true).forEach(function(r2) {
      _defineProperty$a(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$a(e, r, t) {
  return (r = _toPropertyKey$a(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$a(t) {
  var i = _toPrimitive$a(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$a(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultCartesianAxisProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: true,
  axisLine: true,
  tick: true,
  mirror: false,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd",
  zIndex: DefaultZIndexes.axis
};
function AxisLine(axisLineProps) {
  var x2 = axisLineProps.x, y2 = axisLineProps.y, width = axisLineProps.width, height = axisLineProps.height, orientation = axisLineProps.orientation, mirror = axisLineProps.mirror, axisLine = axisLineProps.axisLine, otherSvgProps = axisLineProps.otherSvgProps;
  if (!axisLine) {
    return null;
  }
  var props = _objectSpread$a(_objectSpread$a(_objectSpread$a({}, otherSvgProps), svgPropertiesNoEvents(axisLine)), {}, {
    fill: "none"
  });
  if (orientation === "top" || orientation === "bottom") {
    var needHeight = +(orientation === "top" && !mirror || orientation === "bottom" && mirror);
    props = _objectSpread$a(_objectSpread$a({}, props), {}, {
      x1: x2,
      y1: y2 + needHeight * height,
      x2: x2 + width,
      y2: y2 + needHeight * height
    });
  } else {
    var needWidth = +(orientation === "left" && !mirror || orientation === "right" && mirror);
    props = _objectSpread$a(_objectSpread$a({}, props), {}, {
      x1: x2 + needWidth * width,
      y1: y2,
      x2: x2 + needWidth * width,
      y2: y2 + height
    });
  }
  return /* @__PURE__ */ reactExports.createElement("line", _extends$d({}, props, {
    className: clsx("recharts-cartesian-axis-line", get$1(axisLine, "className"))
  }));
}
function getTickLineCoord(data, x2, y2, width, height, orientation, tickSize, mirror, tickMargin) {
  var x1, x22, y1, y22, tx, ty;
  var sign2 = mirror ? -1 : 1;
  var finalTickSize = data.tickSize || tickSize;
  var tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
  switch (orientation) {
    case "top":
      x1 = x22 = data.coordinate;
      y22 = y2 + +!mirror * height;
      y1 = y22 - sign2 * finalTickSize;
      ty = y1 - sign2 * tickMargin;
      tx = tickCoord;
      break;
    case "left":
      y1 = y22 = data.coordinate;
      x22 = x2 + +!mirror * width;
      x1 = x22 - sign2 * finalTickSize;
      tx = x1 - sign2 * tickMargin;
      ty = tickCoord;
      break;
    case "right":
      y1 = y22 = data.coordinate;
      x22 = x2 + +mirror * width;
      x1 = x22 + sign2 * finalTickSize;
      tx = x1 + sign2 * tickMargin;
      ty = tickCoord;
      break;
    default:
      x1 = x22 = data.coordinate;
      y22 = y2 + +mirror * height;
      y1 = y22 + sign2 * finalTickSize;
      ty = y1 + sign2 * tickMargin;
      tx = tickCoord;
      break;
  }
  return {
    line: {
      x1,
      y1,
      x2: x22,
      y2: y22
    },
    tick: {
      x: tx,
      y: ty
    }
  };
}
function getTickTextAnchor(orientation, mirror) {
  switch (orientation) {
    case "left":
      return mirror ? "start" : "end";
    case "right":
      return mirror ? "end" : "start";
    default:
      return "middle";
  }
}
function getTickVerticalAnchor(orientation, mirror) {
  switch (orientation) {
    case "left":
    case "right":
      return "middle";
    case "top":
      return mirror ? "start" : "end";
    default:
      return mirror ? "end" : "start";
  }
}
function TickItem(props) {
  var option = props.option, tickProps = props.tickProps, value = props.value;
  var tickItem;
  var combinedClassName = clsx(tickProps.className, "recharts-cartesian-axis-tick-value");
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    tickItem = /* @__PURE__ */ reactExports.cloneElement(option, _objectSpread$a(_objectSpread$a({}, tickProps), {}, {
      className: combinedClassName
    }));
  } else if (typeof option === "function") {
    tickItem = option(_objectSpread$a(_objectSpread$a({}, tickProps), {}, {
      className: combinedClassName
    }));
  } else {
    var className = "recharts-cartesian-axis-tick-value";
    if (typeof option !== "boolean") {
      className = clsx(className, getClassNameFromUnknown(option));
    }
    tickItem = /* @__PURE__ */ reactExports.createElement(Text, _extends$d({}, tickProps, {
      className
    }), value);
  }
  return tickItem;
}
function RenderedTicksReporter(_ref2) {
  var ticks2 = _ref2.ticks, axisType = _ref2.axisType, axisId = _ref2.axisId;
  var dispatch = useAppDispatch();
  var lastDispatchedTicksRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (axisId == null || axisType == null) {
      return;
    }
    var tickItems = ticks2.map((tick) => ({
      value: tick.value,
      coordinate: tick.coordinate,
      offset: tick.offset,
      index: tick.index
    }));
    var last = lastDispatchedTicksRef.current;
    if (last != null && last.axisId === axisId && last.axisType === axisType && isEqual(last.ticks, tickItems)) {
      return;
    }
    lastDispatchedTicksRef.current = {
      ticks: tickItems,
      axisId,
      axisType
    };
    dispatch(setRenderedTicks({
      ticks: tickItems,
      axisId,
      axisType
    }));
  }, [dispatch, ticks2, axisId, axisType]);
  reactExports.useEffect(() => {
    if (axisId == null || axisType == null) {
      return noop$5;
    }
    return () => {
      dispatch(removeRenderedTicks({
        axisId,
        axisType
      }));
    };
  }, [dispatch, axisId, axisType]);
  return null;
}
var Ticks = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _props$ticks = props.ticks, ticks2 = _props$ticks === void 0 ? [] : _props$ticks, tick = props.tick, tickLine = props.tickLine, stroke = props.stroke, tickFormatter = props.tickFormatter, unit2 = props.unit, padding = props.padding, tickTextProps = props.tickTextProps, orientation = props.orientation, mirror = props.mirror, x2 = props.x, y2 = props.y, width = props.width, height = props.height, tickSize = props.tickSize, tickMargin = props.tickMargin, fontSize = props.fontSize, letterSpacing = props.letterSpacing, getTicksConfig = props.getTicksConfig, events = props.events, axisType = props.axisType, axisId = props.axisId;
  var finalTicks = getTicks(_objectSpread$a(_objectSpread$a({}, getTicksConfig), {}, {
    ticks: ticks2
  }), fontSize, letterSpacing);
  var axisProps = svgPropertiesNoEvents(getTicksConfig);
  var customTickProps = svgPropertiesNoEventsFromUnknown(tick);
  var textAnchor = isValidTextAnchor(axisProps.textAnchor) ? axisProps.textAnchor : getTickTextAnchor(orientation, mirror);
  var verticalAnchor = getTickVerticalAnchor(orientation, mirror);
  var tickLinePropsObject = {};
  if (typeof tickLine === "object") {
    tickLinePropsObject = tickLine;
  }
  var tickLineProps = _objectSpread$a(_objectSpread$a({}, axisProps), {}, {
    fill: "none"
  }, tickLinePropsObject);
  var tickLineCoords = finalTicks.map((entry) => _objectSpread$a({
    entry
  }, getTickLineCoord(entry, x2, y2, width, height, orientation, tickSize, mirror, tickMargin)));
  var tickLines = tickLineCoords.map((_ref2) => {
    var entry = _ref2.entry, lineCoord = _ref2.line;
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      className: "recharts-cartesian-axis-tick",
      key: "tick-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
    }, tickLine && /* @__PURE__ */ reactExports.createElement("line", _extends$d({}, tickLineProps, lineCoord, {
      className: clsx("recharts-cartesian-axis-tick-line", get$1(tickLine, "className"))
    })));
  });
  var tickLabels = tickLineCoords.map((_ref3, i) => {
    var _ref4, _tickTextProps$angle;
    var entry = _ref3.entry, tickCoord = _ref3.tick;
    var tickProps = _objectSpread$a(_objectSpread$a(_objectSpread$a(_objectSpread$a({
      verticalAnchor
    }, axisProps), {}, {
      textAnchor,
      stroke: "none",
      fill: stroke
    }, tickCoord), {}, {
      index: i,
      payload: entry,
      visibleTicksCount: finalTicks.length,
      tickFormatter,
      padding
    }, tickTextProps), {}, {
      angle: (_ref4 = (_tickTextProps$angle = tickTextProps === null || tickTextProps === void 0 ? void 0 : tickTextProps.angle) !== null && _tickTextProps$angle !== void 0 ? _tickTextProps$angle : axisProps.angle) !== null && _ref4 !== void 0 ? _ref4 : 0
    });
    var finalTickProps = _objectSpread$a(_objectSpread$a({}, tickProps), customTickProps);
    return /* @__PURE__ */ reactExports.createElement(Layer, _extends$d({
      className: "recharts-cartesian-axis-tick-label",
      key: "tick-label-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
    }, adaptEventsOfChild(events, entry, i)), tick && /* @__PURE__ */ reactExports.createElement(TickItem, {
      option: tick,
      tickProps: finalTickProps,
      value: "".concat(typeof tickFormatter === "function" ? tickFormatter(entry.value, i) : entry.value).concat(unit2 || "")
    }));
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-axis-ticks recharts-".concat(axisType, "-ticks")
  }, /* @__PURE__ */ reactExports.createElement(RenderedTicksReporter, {
    ticks: finalTicks,
    axisId,
    axisType
  }), tickLabels.length > 0 && /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: DefaultZIndexes.label
  }, /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-axis-tick-labels recharts-".concat(axisType, "-tick-labels"),
    ref
  }, tickLabels)), tickLines.length > 0 && /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-axis-tick-lines recharts-".concat(axisType, "-tick-lines")
  }, tickLines));
});
var CartesianAxisComponent = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var axisLine = props.axisLine, width = props.width, height = props.height, className = props.className, hide = props.hide, ticks2 = props.ticks, axisType = props.axisType, axisId = props.axisId, rest = _objectWithoutProperties$f(props, _excluded$f);
  var _useState = reactExports.useState(""), _useState2 = _slicedToArray$3(_useState, 2), fontSize = _useState2[0], setFontSize = _useState2[1];
  var _useState3 = reactExports.useState(""), _useState4 = _slicedToArray$3(_useState3, 2), letterSpacing = _useState4[0], setLetterSpacing = _useState4[1];
  var tickRefs = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    getCalculatedWidth: () => {
      var _props$labelRef;
      return getCalculatedYAxisWidth({
        ticks: tickRefs.current,
        label: (_props$labelRef = props.labelRef) === null || _props$labelRef === void 0 ? void 0 : _props$labelRef.current,
        labelGapWithTick: 5,
        tickSize: props.tickSize,
        tickMargin: props.tickMargin
      });
    },
    getCalculatedHeight: () => {
      var _props$labelRef2;
      return getCalculatedXAxisHeight({
        ticks: tickRefs.current,
        label: (_props$labelRef2 = props.labelRef) === null || _props$labelRef2 === void 0 ? void 0 : _props$labelRef2.current,
        labelGapWithTick: 5,
        tickSize: props.tickSize,
        tickMargin: props.tickMargin
      });
    }
  }));
  var layerRef = reactExports.useCallback((el) => {
    if (el) {
      var tickNodes = el.getElementsByClassName("recharts-cartesian-axis-tick-value");
      tickRefs.current = tickNodes;
      var tick = tickNodes[0];
      if (tick) {
        var computedStyle = window.getComputedStyle(tick);
        var calculatedFontSize = computedStyle.fontSize;
        var calculatedLetterSpacing = computedStyle.letterSpacing;
        if (calculatedFontSize !== fontSize || calculatedLetterSpacing !== letterSpacing) {
          setFontSize(calculatedFontSize);
          setLetterSpacing(calculatedLetterSpacing);
        }
      }
    }
  }, [fontSize, letterSpacing]);
  if (hide) {
    return null;
  }
  if (width != null && width <= 0 || height != null && height <= 0) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ reactExports.createElement(Layer, {
    className: clsx("recharts-cartesian-axis", className)
  }, /* @__PURE__ */ reactExports.createElement(AxisLine, {
    x: props.x,
    y: props.y,
    width,
    height,
    orientation: props.orientation,
    mirror: props.mirror,
    axisLine,
    otherSvgProps: svgPropertiesNoEvents(props)
  }), /* @__PURE__ */ reactExports.createElement(Ticks, {
    ref: layerRef,
    axisType,
    events: rest,
    fontSize,
    getTicksConfig: props,
    height: props.height,
    letterSpacing,
    mirror: props.mirror,
    orientation: props.orientation,
    padding: props.padding,
    stroke: props.stroke,
    tick: props.tick,
    tickFormatter: props.tickFormatter,
    tickLine: props.tickLine,
    tickMargin: props.tickMargin,
    tickSize: props.tickSize,
    tickTextProps: props.tickTextProps,
    ticks: ticks2,
    unit: props.unit,
    width: props.width,
    x: props.x,
    y: props.y,
    axisId
  }), /* @__PURE__ */ reactExports.createElement(CartesianLabelContextProvider, {
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    lowerWidth: props.width,
    upperWidth: props.width
  }, /* @__PURE__ */ reactExports.createElement(CartesianLabelFromLabelProp, {
    label: props.label,
    labelRef: props.labelRef
  }), props.children)));
});
var CartesianAxis = /* @__PURE__ */ reactExports.forwardRef((outsideProps, ref) => {
  var props = resolveDefaultProps(outsideProps, defaultCartesianAxisProps);
  return /* @__PURE__ */ reactExports.createElement(CartesianAxisComponent, _extends$d({}, props, {
    ref
  }));
});
CartesianAxis.displayName = "CartesianAxis";
var legacyTheme = {
  grid: {
    stroke: "#ccc",
    fill: "none"
  }
};
var RechartsThemeContext = /* @__PURE__ */ reactExports.createContext(legacyTheme);
RechartsThemeContext.Provider;
var useRechartsTheme = () => reactExports.useContext(RechartsThemeContext);
var _excluded$e = ["x1", "y1", "x2", "y2", "key"], _excluded2$7 = ["offset"], _excluded3$4 = ["xAxisId", "yAxisId"], _excluded4$1 = ["xAxisId", "yAxisId"];
function ownKeys$9(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$9(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$9(Object(t), true).forEach(function(r2) {
      _defineProperty$9(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$9(e, r, t) {
  return (r = _toPropertyKey$9(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$9(t) {
  var i = _toPrimitive$9(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$9(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$c() {
  return _extends$c = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$c.apply(null, arguments);
}
function _objectWithoutProperties$e(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$e(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$e(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var Background = (props) => {
  var fill = props.fill;
  if (!fill || fill === "none") {
    return null;
  }
  var fillOpacity = props.fillOpacity, x2 = props.x, y2 = props.y, width = props.width, height = props.height, ry = props.ry;
  return /* @__PURE__ */ reactExports.createElement("rect", {
    x: x2,
    y: y2,
    ry,
    width,
    height,
    stroke: "none",
    fill,
    fillOpacity,
    className: "recharts-cartesian-grid-bg"
  });
};
function LineItem(_ref2) {
  var option = _ref2.option, lineItemProps = _ref2.lineItemProps;
  var lineItem;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    lineItem = /* @__PURE__ */ reactExports.cloneElement(option, lineItemProps);
  } else if (typeof option === "function") {
    lineItem = option(lineItemProps);
  } else {
    var _svgPropertiesNoEvent;
    var x1 = lineItemProps.x1, y1 = lineItemProps.y1, x2 = lineItemProps.x2, y2 = lineItemProps.y2, key = lineItemProps.key, others = _objectWithoutProperties$e(lineItemProps, _excluded$e);
    var _ref22 = (_svgPropertiesNoEvent = svgPropertiesNoEvents(others)) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {};
    _ref22.offset;
    var restOfFilteredProps = _objectWithoutProperties$e(_ref22, _excluded2$7);
    var strokeDasharray = Array.isArray(restOfFilteredProps.strokeDasharray) ? restOfFilteredProps.strokeDasharray.join(",") : restOfFilteredProps.strokeDasharray;
    lineItem = /* @__PURE__ */ reactExports.createElement("line", _extends$c({}, restOfFilteredProps, {
      strokeDasharray,
      x1,
      y1,
      x2,
      y2,
      fill: "none",
      key
    }));
  }
  return lineItem;
}
function HorizontalGridLines(props) {
  var x2 = props.x, width = props.width, _props$horizontal = props.horizontal, horizontal = _props$horizontal === void 0 ? true : _props$horizontal, horizontalPoints = props.horizontalPoints;
  if (!horizontal || !horizontalPoints || !horizontalPoints.length) {
    return null;
  }
  props.xAxisId;
  props.yAxisId;
  var otherLineItemProps = _objectWithoutProperties$e(props, _excluded3$4);
  var items = horizontalPoints.map((entry, i) => {
    var lineItemProps = _objectSpread$9(_objectSpread$9({}, otherLineItemProps), {}, {
      x1: x2,
      y1: entry,
      x2: x2 + width,
      y2: entry,
      key: "line-".concat(i),
      index: i
    });
    return /* @__PURE__ */ reactExports.createElement(LineItem, {
      key: "line-".concat(i),
      option: horizontal,
      lineItemProps
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, items);
}
function VerticalGridLines(props) {
  var y2 = props.y, height = props.height, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? true : _props$vertical, verticalPoints = props.verticalPoints;
  if (!vertical || !verticalPoints || !verticalPoints.length) {
    return null;
  }
  props.xAxisId;
  props.yAxisId;
  var otherLineItemProps = _objectWithoutProperties$e(props, _excluded4$1);
  var items = verticalPoints.map((entry, i) => {
    var lineItemProps = _objectSpread$9(_objectSpread$9({}, otherLineItemProps), {}, {
      x1: entry,
      y1: y2,
      x2: entry,
      y2: y2 + height,
      key: "line-".concat(i),
      index: i
    });
    return /* @__PURE__ */ reactExports.createElement(LineItem, {
      option: vertical,
      lineItemProps,
      key: "line-".concat(i)
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, items);
}
function HorizontalStripes(props) {
  var horizontalFill = props.horizontalFill, fillOpacity = props.fillOpacity, x2 = props.x, y2 = props.y, width = props.width, height = props.height, horizontalPoints = props.horizontalPoints, _props$horizontal2 = props.horizontal, horizontal = _props$horizontal2 === void 0 ? true : _props$horizontal2;
  if (!horizontal || !horizontalFill || !horizontalFill.length || horizontalPoints == null) {
    return null;
  }
  var roundedSortedHorizontalPoints = horizontalPoints.map((e) => Math.round(e + y2 - y2)).sort((a2, b) => a2 - b);
  if (y2 !== roundedSortedHorizontalPoints[0]) {
    roundedSortedHorizontalPoints.unshift(0);
  }
  var items = roundedSortedHorizontalPoints.map((entry, i) => {
    var nextPoint = roundedSortedHorizontalPoints[i + 1];
    var lastStripe = nextPoint == null;
    var lineHeight = lastStripe ? y2 + height - entry : nextPoint - entry;
    if (lineHeight <= 0) {
      return null;
    }
    var colorIndex = i % horizontalFill.length;
    return /* @__PURE__ */ reactExports.createElement("rect", {
      key: "react-".concat(i),
      y: entry,
      x: x2,
      height: lineHeight,
      width,
      stroke: "none",
      fill: horizontalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, items);
}
function VerticalStripes(props) {
  var _props$vertical2 = props.vertical, vertical = _props$vertical2 === void 0 ? true : _props$vertical2, verticalFill = props.verticalFill, fillOpacity = props.fillOpacity, x2 = props.x, y2 = props.y, width = props.width, height = props.height, verticalPoints = props.verticalPoints;
  if (!vertical || !verticalFill || !verticalFill.length) {
    return null;
  }
  var roundedSortedVerticalPoints = verticalPoints.map((e) => Math.round(e + x2 - x2)).sort((a2, b) => a2 - b);
  if (x2 !== roundedSortedVerticalPoints[0]) {
    roundedSortedVerticalPoints.unshift(0);
  }
  var items = roundedSortedVerticalPoints.map((entry, i) => {
    var nextPoint = roundedSortedVerticalPoints[i + 1];
    var lastStripe = nextPoint == null;
    var lineWidth = lastStripe ? x2 + width - entry : nextPoint - entry;
    if (lineWidth <= 0) {
      return null;
    }
    var colorIndex = i % verticalFill.length;
    return /* @__PURE__ */ reactExports.createElement("rect", {
      key: "react-".concat(i),
      x: entry,
      y: y2,
      width: lineWidth,
      height,
      stroke: "none",
      fill: verticalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, items);
}
var defaultVerticalCoordinatesGenerator = (_ref3, syncWithTicks) => {
  var xAxis = _ref3.xAxis, width = _ref3.width, height = _ref3.height, offset = _ref3.offset;
  return getCoordinatesOfGrid(getTicks(_objectSpread$9(_objectSpread$9(_objectSpread$9({}, defaultCartesianAxisProps), xAxis), {}, {
    ticks: getTicksOfAxis(xAxis),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = (_ref4, syncWithTicks) => {
  var yAxis = _ref4.yAxis, width = _ref4.width, height = _ref4.height, offset = _ref4.offset;
  return getCoordinatesOfGrid(getTicks(_objectSpread$9(_objectSpread$9(_objectSpread$9({}, defaultCartesianAxisProps), yAxis), {}, {
    ticks: getTicksOfAxis(yAxis),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultCartesianGridProps = {
  horizontal: true,
  vertical: true,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: [],
  xAxisId: 0,
  yAxisId: 0,
  syncWithTicks: false,
  zIndex: DefaultZIndexes.grid
};
function CartesianGrid(props) {
  var _propsIncludingDefaul, _propsIncludingDefaul2, _propsIncludingDefaul3, _propsIncludingDefaul4, _propsIncludingDefaul5, _propsIncludingDefaul6;
  var chartWidth = useChartWidth();
  var chartHeight = useChartHeight();
  var offset = useOffsetInternal();
  var propsIncludingDefaults = _objectSpread$9(_objectSpread$9({}, resolveDefaultProps(props, defaultCartesianGridProps)), {}, {
    x: isNumber(props.x) ? props.x : offset.left,
    y: isNumber(props.y) ? props.y : offset.top,
    width: isNumber(props.width) ? props.width : offset.width,
    height: isNumber(props.height) ? props.height : offset.height
  });
  var xAxisId = propsIncludingDefaults.xAxisId, yAxisId = propsIncludingDefaults.yAxisId, x2 = propsIncludingDefaults.x, y2 = propsIncludingDefaults.y, width = propsIncludingDefaults.width, height = propsIncludingDefaults.height, syncWithTicks = propsIncludingDefaults.syncWithTicks, horizontalValues = propsIncludingDefaults.horizontalValues, verticalValues = propsIncludingDefaults.verticalValues;
  var isPanorama = useIsPanorama();
  var xAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "xAxis", xAxisId, isPanorama));
  var yAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "yAxis", yAxisId, isPanorama));
  var theme = useRechartsTheme();
  var themeProps = {
    stroke: (_propsIncludingDefaul = propsIncludingDefaults.stroke) !== null && _propsIncludingDefaul !== void 0 ? _propsIncludingDefaul : theme.grid.stroke,
    strokeWidth: (_propsIncludingDefaul2 = propsIncludingDefaults.strokeWidth) !== null && _propsIncludingDefaul2 !== void 0 ? _propsIncludingDefaul2 : theme.grid.strokeWidth,
    strokeOpacity: (_propsIncludingDefaul3 = propsIncludingDefaults.strokeOpacity) !== null && _propsIncludingDefaul3 !== void 0 ? _propsIncludingDefaul3 : theme.grid.strokeOpacity,
    strokeDasharray: (_propsIncludingDefaul4 = propsIncludingDefaults.strokeDasharray) !== null && _propsIncludingDefaul4 !== void 0 ? _propsIncludingDefaul4 : theme.grid.strokeDasharray
  };
  if (!isPositiveNumber(width) || !isPositiveNumber(height) || !isNumber(x2) || !isNumber(y2)) {
    return null;
  }
  var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
  var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
  var horizontalPoints = propsIncludingDefaults.horizontalPoints, verticalPoints = propsIncludingDefaults.verticalPoints;
  if ((!horizontalPoints || !horizontalPoints.length) && typeof horizontalCoordinatesGenerator === "function") {
    var isHorizontalValues = horizontalValues && horizontalValues.length;
    var generatorResult = horizontalCoordinatesGenerator({
      yAxis: yAxis ? _objectSpread$9(_objectSpread$9({}, yAxis), {}, {
        ticks: isHorizontalValues ? horizontalValues : yAxis.ticks
      }) : void 0,
      width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
      height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
      offset
    }, isHorizontalValues ? true : syncWithTicks);
    warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof generatorResult, "]"));
    if (Array.isArray(generatorResult)) {
      horizontalPoints = generatorResult;
    }
  }
  if ((!verticalPoints || !verticalPoints.length) && typeof verticalCoordinatesGenerator === "function") {
    var isVerticalValues = verticalValues && verticalValues.length;
    var _generatorResult = verticalCoordinatesGenerator({
      xAxis: xAxis ? _objectSpread$9(_objectSpread$9({}, xAxis), {}, {
        ticks: isVerticalValues ? verticalValues : xAxis.ticks
      }) : void 0,
      width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
      height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
      offset
    }, isVerticalValues ? true : syncWithTicks);
    warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof _generatorResult, "]"));
    if (Array.isArray(_generatorResult)) {
      verticalPoints = _generatorResult;
    }
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: propsIncludingDefaults.zIndex
  }, /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ reactExports.createElement(Background, {
    fill: (_propsIncludingDefaul5 = propsIncludingDefaults.fill) !== null && _propsIncludingDefaul5 !== void 0 ? _propsIncludingDefaul5 : theme.grid.fill,
    fillOpacity: (_propsIncludingDefaul6 = propsIncludingDefaults.fillOpacity) !== null && _propsIncludingDefaul6 !== void 0 ? _propsIncludingDefaul6 : theme.grid.fillOpacity,
    x: propsIncludingDefaults.x,
    y: propsIncludingDefaults.y,
    width: propsIncludingDefaults.width,
    height: propsIncludingDefaults.height,
    ry: propsIncludingDefaults.ry
  }), /* @__PURE__ */ reactExports.createElement(HorizontalStripes, _extends$c({}, propsIncludingDefaults, {
    horizontalPoints
  })), /* @__PURE__ */ reactExports.createElement(VerticalStripes, _extends$c({}, propsIncludingDefaults, {
    verticalPoints
  })), /* @__PURE__ */ reactExports.createElement(HorizontalGridLines, _extends$c({}, propsIncludingDefaults, themeProps, {
    offset,
    horizontalPoints,
    xAxis,
    yAxis
  })), /* @__PURE__ */ reactExports.createElement(VerticalGridLines, _extends$c({}, propsIncludingDefaults, themeProps, {
    offset,
    verticalPoints,
    xAxis,
    yAxis
  }))));
}
CartesianGrid.displayName = "CartesianGrid";
var _excluded$d = ["animationElapsedTime", "isAnimating", "isEntrance", "visibleLength", "strokeDasharray", "connectNulls"];
function _extends$b() {
  return _extends$b = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$b.apply(null, arguments);
}
function _objectWithoutProperties$d(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$d(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$d(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function getTotalLength$1(path) {
  try {
    return path && path.getTotalLength && path.getTotalLength() || 0;
  } catch (_unused) {
    return 0;
  }
}
function generateSimpleStrokeDasharray(totalLength, length) {
  return "".concat(length, "px ").concat(totalLength, "px");
}
function normalizeDashPattern(lines) {
  return lines.length % 2 !== 0 ? [...lines, ...lines] : lines;
}
function repeat(lines, count) {
  var result = [];
  for (var i = 0; i < count; ++i) {
    result.push(...lines);
  }
  return result;
}
function getStrokeDasharray(length, totalLength, lines) {
  var normalizedLines = normalizeDashPattern(lines);
  var lineLength = normalizedLines.reduce((pre, next) => pre + next, 0);
  if (!lineLength) {
    return generateSimpleStrokeDasharray(totalLength, length);
  }
  var count = Math.floor(length / lineLength);
  var remainLength = length % lineLength;
  var remainLines = [];
  for (var i = 0, sum = 0; i < normalizedLines.length; sum += (_normalizedLines$i = normalizedLines[i]) !== null && _normalizedLines$i !== void 0 ? _normalizedLines$i : 0, ++i) {
    var _normalizedLines$i;
    var lineValue = normalizedLines[i];
    if (lineValue != null && sum + lineValue > remainLength) {
      remainLines = [...normalizedLines.slice(0, i), remainLength - sum];
      break;
    }
  }
  var emptyLines = remainLines.length % 2 === 0 ? [0, totalLength] : [totalLength];
  return [...repeat(normalizedLines, count), ...remainLines, ...emptyLines].map((line) => "".concat(line, "px")).join(", ");
}
function computeAnimatedStrokeDasharray(userStrokeDasharray, totalLength, visibleLength) {
  if (userStrokeDasharray) {
    var lines = "".concat(userStrokeDasharray).split(/[,\s]+/gim).map((num) => parseFloat(num));
    return getStrokeDasharray(visibleLength, totalLength, lines);
  }
  return generateSimpleStrokeDasharray(totalLength, visibleLength);
}
function LineDrawShape(props) {
  props.animationElapsedTime;
  props.isAnimating;
  props.isEntrance;
  var visibleLength = props.visibleLength, userStrokeDasharray = props.strokeDasharray, connectNulls = props.connectNulls, curveProps = _objectWithoutProperties$d(props, _excluded$d);
  var finalConnectNulls = connectNulls !== null && connectNulls !== void 0 ? connectNulls : false;
  var strokeDasharray;
  if (visibleLength != null) {
    var _pathRef$current;
    var pathRef = curveProps.pathRef;
    var totalLength = getTotalLength$1((_pathRef$current = pathRef === null || pathRef === void 0 ? void 0 : pathRef.current) !== null && _pathRef$current !== void 0 ? _pathRef$current : null);
    strokeDasharray = computeAnimatedStrokeDasharray(userStrokeDasharray, totalLength, visibleLength);
  } else if (userStrokeDasharray != null) {
    strokeDasharray = String(userStrokeDasharray);
  }
  return /* @__PURE__ */ reactExports.createElement(Curve, _extends$b({}, curveProps, {
    connectNulls: finalConnectNulls,
    strokeDasharray
  }));
}
function useAnimatedLineLength(points) {
  var startingLengthRef = reactExports.useRef(0);
  var maxAnimatedLengthRef = reactExports.useRef(0);
  var reachedFullRef = reactExports.useRef(false);
  var prevPointsRef = reactExports.useRef(points);
  if (prevPointsRef.current !== points) {
    startingLengthRef.current = maxAnimatedLengthRef.current;
    prevPointsRef.current = points;
  }
  return reactExports.useCallback((animationElapsedTime, totalLength) => {
    if (reachedFullRef.current) {
      return null;
    }
    var visibleLength = Math.min(round$1(startingLengthRef.current + animationElapsedTime * totalLength), totalLength);
    if (animationElapsedTime > 0 && totalLength > 0) {
      maxAnimatedLengthRef.current = Math.max(maxAnimatedLengthRef.current, visibleLength);
      if (visibleLength >= totalLength) {
        reachedFullRef.current = true;
        return null;
      }
    }
    return visibleLength;
  }, []);
}
var initialState$2 = {};
var errorBarSlice = createSlice({
  name: "errorBars",
  initialState: initialState$2,
  reducers: {
    addErrorBar: (state, action) => {
      var _action$payload = action.payload, itemId = _action$payload.itemId, errorBar = _action$payload.errorBar;
      if (!state[itemId]) {
        state[itemId] = [];
      }
      state[itemId].push(errorBar);
    },
    replaceErrorBar: (state, action) => {
      var _action$payload2 = action.payload, itemId = _action$payload2.itemId, prev = _action$payload2.prev, next = _action$payload2.next;
      if (state[itemId]) {
        state[itemId] = state[itemId].map((e) => e.dataKey === prev.dataKey && e.direction === prev.direction ? next : e);
      }
    },
    removeErrorBar: (state, action) => {
      var _action$payload3 = action.payload, itemId = _action$payload3.itemId, errorBar = _action$payload3.errorBar;
      if (state[itemId]) {
        state[itemId] = state[itemId].filter((e) => e.dataKey !== errorBar.dataKey || e.direction !== errorBar.direction);
      }
    }
  }
});
var _errorBarSlice$action = errorBarSlice.actions;
_errorBarSlice$action.addErrorBar;
_errorBarSlice$action.replaceErrorBar;
_errorBarSlice$action.removeErrorBar;
var errorBarReducer = errorBarSlice.reducer;
var _excluded$c = ["children"];
function _objectWithoutProperties$c(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$c(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$c(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var initialContextState = {
  data: [],
  xAxisId: "xAxis-0",
  yAxisId: "yAxis-0",
  dataPointFormatter: () => ({
    x: 0,
    y: 0,
    value: 0
  }),
  errorBarOffset: 0
};
var ErrorBarContext = /* @__PURE__ */ reactExports.createContext(initialContextState);
function SetErrorBarContext(props) {
  var children = props.children, rest = _objectWithoutProperties$c(props, _excluded$c);
  return /* @__PURE__ */ reactExports.createElement(ErrorBarContext.Provider, {
    value: rest
  }, children);
}
function useNeedsClip(xAxisId, yAxisId) {
  var _xAxis$allowDataOverf, _yAxis$allowDataOverf;
  var xAxis = useAppSelector((state) => selectXAxisSettings(state, xAxisId));
  var yAxis = useAppSelector((state) => selectYAxisSettings(state, yAxisId));
  var needClipX = (_xAxis$allowDataOverf = xAxis === null || xAxis === void 0 ? void 0 : xAxis.allowDataOverflow) !== null && _xAxis$allowDataOverf !== void 0 ? _xAxis$allowDataOverf : implicitXAxis.allowDataOverflow;
  var needClipY = (_yAxis$allowDataOverf = yAxis === null || yAxis === void 0 ? void 0 : yAxis.allowDataOverflow) !== null && _yAxis$allowDataOverf !== void 0 ? _yAxis$allowDataOverf : implicitYAxis.allowDataOverflow;
  var needClip = needClipX || needClipY;
  return {
    needClip,
    needClipX,
    needClipY
  };
}
function GraphicalItemClipPath(_ref2) {
  var xAxisId = _ref2.xAxisId, yAxisId = _ref2.yAxisId, clipPathId = _ref2.clipPathId;
  var plotArea = usePlotArea();
  var _useNeedsClip = useNeedsClip(xAxisId, yAxisId), needClipX = _useNeedsClip.needClipX, needClipY = _useNeedsClip.needClipY, needClip = _useNeedsClip.needClip;
  var xAxisRange = useAppSelector((state) => selectXAxisRange(state, xAxisId, false));
  var yAxisRange = useAppSelector((state) => selectYAxisRange(state, yAxisId, false));
  if (!needClip || !plotArea) {
    return null;
  }
  var x2 = plotArea.x, y2 = plotArea.y, width = plotArea.width, height = plotArea.height;
  var clipX = needClipX && xAxisRange ? Math.min(xAxisRange[0], xAxisRange[1]) : x2 - width / 2;
  var clipY = needClipY && yAxisRange ? Math.min(yAxisRange[0], yAxisRange[1]) : y2 - height / 2;
  var clipWidth = needClipX && xAxisRange ? Math.abs(xAxisRange[1] - xAxisRange[0]) : width * 2;
  var clipHeight = needClipY && yAxisRange ? Math.abs(yAxisRange[1] - yAxisRange[0]) : height * 2;
  return /* @__PURE__ */ reactExports.createElement("clipPath", {
    id: "clipPath-".concat(clipPathId)
  }, /* @__PURE__ */ reactExports.createElement("rect", {
    x: clipX,
    y: clipY,
    width: clipWidth,
    height: clipHeight
  }));
}
var selectXAxisWithScale$2 = (state, xAxisId, _yAxisId, isPanorama) => selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
var selectXAxisTicks$2 = (state, xAxisId, _yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
var selectYAxisWithScale$2 = (state, _xAxisId, yAxisId, isPanorama) => selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
var selectYAxisTicks$2 = (state, _xAxisId, yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
var selectBandSize$1 = createSelector([selectChartLayout, selectXAxisWithScale$2, selectYAxisWithScale$2, selectXAxisTicks$2, selectYAxisTicks$2], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
  if (isCategoricalAxis(layout, "xAxis")) {
    return getBandSizeOfAxis(xAxis, xAxisTicks, false);
  }
  return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickLineId = (_state, _xAxisId, _yAxisId, _isPanorama, id) => id;
function isLineSettings(item) {
  return item.type === "line";
}
var selectSynchronisedLineSettings = createSelector([selectUnfilteredCartesianItems, pickLineId], (graphicalItems, id) => graphicalItems.filter(isLineSettings).find((x2) => x2.id === id));
var selectLinePoints = createSelector([selectChartLayout, selectXAxisWithScale$2, selectYAxisWithScale$2, selectXAxisTicks$2, selectYAxisTicks$2, selectSynchronisedLineSettings, selectBandSize$1, selectChartDataWithIndexesIfNotInPanoramaPosition4], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, lineSettings, bandSize, _ref2) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  if (lineSettings == null || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null || layout !== "horizontal" && layout !== "vertical") {
    return void 0;
  }
  var dataKey = lineSettings.dataKey, data = lineSettings.data;
  var displayedData;
  if (data != null && data.length > 0) {
    displayedData = data;
  } else {
    displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
  }
  if (displayedData == null) {
    return void 0;
  }
  return computeLinePoints({
    layout,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    dataKey,
    bandSize,
    displayedData
  });
});
function getRadiusAndStrokeWidthFromDot(dot) {
  var props = svgPropertiesNoEventsFromUnknown(dot);
  var defaultR = 3;
  var defaultStrokeWidth = 2;
  if (props != null) {
    var r = props.r, strokeWidth = props.strokeWidth;
    var realR = Number(r);
    var realStrokeWidth = Number(strokeWidth);
    if (Number.isNaN(realR) || realR < 0) {
      realR = defaultR;
    }
    if (Number.isNaN(realStrokeWidth) || realStrokeWidth < 0) {
      realStrokeWidth = defaultStrokeWidth;
    }
    return {
      r: realR,
      strokeWidth: realStrokeWidth
    };
  }
  return {
    r: defaultR,
    strokeWidth: defaultStrokeWidth
  };
}
var _excluded$b = ["id"], _excluded2$6 = ["type", "layout", "connectNulls", "needClip", "shape", "strokeDasharray"], _excluded3$3 = ["activeDot", "animateNewValues", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "hide", "isAnimationActive", "label", "legendType", "xAxisId", "yAxisId", "id"];
function _extends$a() {
  return _extends$a = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$a.apply(null, arguments);
}
function _objectWithoutProperties$b(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$b(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$b(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$8(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$8(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$8(Object(t), true).forEach(function(r2) {
      _defineProperty$8(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$8(e, r, t) {
  return (r = _toPropertyKey$8(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$8(t) {
  var i = _toPrimitive$8(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$8(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getTotalLength(mainCurve) {
  try {
    return mainCurve && mainCurve.getTotalLength && mainCurve.getTotalLength() || 0;
  } catch (_unused) {
    return 0;
  }
}
function averageShift(items) {
  var total = 0;
  var count = 0;
  for (var item of items) {
    if (item.status === "matched" && item.prev.x != null && item.next.x != null) {
      total += item.next.x - item.prev.x;
      count++;
    }
  }
  return count > 0 ? total / count : 0;
}
var defaultLineAnimateItems = (items, animationElapsedTime) => {
  if (items == null) {
    return [];
  }
  if (animationElapsedTime === 1) return items.flatMap((item2) => item2.status === "removed" ? [] : [item2.next]);
  var shift = averageShift(items);
  var result = [];
  for (var item of items) {
    if (item.status === "matched") {
      result.push(_objectSpread$8(_objectSpread$8({}, item.next), {}, {
        x: interpolate$1(item.prev.x, item.next.x, animationElapsedTime),
        y: interpolate$1(item.prev.y, item.next.y, animationElapsedTime)
      }));
    } else if (item.status === "added") {
      if (item.next.x != null) {
        var entryX = item.next.x - shift;
        result.push(_objectSpread$8(_objectSpread$8({}, item.next), {}, {
          x: interpolate$1(entryX, item.next.x, animationElapsedTime),
          y: item.next.y
        }));
      } else {
        result.push(item.next);
      }
    } else if (item.status === "removed") {
      if (item.prev.x != null) {
        var exitX = item.prev.x + shift;
        result.push(_objectSpread$8(_objectSpread$8({}, item.prev), {}, {
          x: interpolate$1(item.prev.x, exitX, animationElapsedTime),
          y: item.prev.y
        }));
      }
    }
  }
  return result;
};
var defaultLineProps = {
  activeDot: true,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  animationInterpolateFn: defaultLineAnimateItems,
  animationMatchBy: matchByIndex,
  connectNulls: false,
  dot: true,
  fill: "#fff",
  hide: false,
  isAnimationActive: "auto",
  label: false,
  legendType: "line",
  shape: LineDrawShape,
  stroke: "#3182bd",
  strokeWidth: 1,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: DefaultZIndexes.line,
  type: "linear"
};
var computeLegendPayloadFromAreaData$1 = (props) => {
  var dataKey = props.dataKey, name = props.name, stroke = props.stroke, legendType = props.legendType, hide = props.hide;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: stroke,
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
var SetLineTooltipEntrySettings = /* @__PURE__ */ reactExports.memo((_ref2) => {
  var dataKey = _ref2.dataKey, data = _ref2.data, stroke = _ref2.stroke, strokeWidth = _ref2.strokeWidth, fill = _ref2.fill, name = _ref2.name, hide = _ref2.hide, unit2 = _ref2.unit, formatter = _ref2.formatter, tooltipType = _ref2.tooltipType, id = _ref2.id;
  var tooltipEntrySettings = {
    dataDefinedOnItem: data,
    getPosition: noop$5,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: void 0,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: stroke,
      unit: unit2,
      formatter,
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
function LineDotsWrapper(_ref2) {
  var clipPathId = _ref2.clipPathId, points = _ref2.points, props = _ref2.props;
  var dot = props.dot, dataKey = props.dataKey, needClip = props.needClip;
  props.id;
  var propsWithoutId = _objectWithoutProperties$b(props, _excluded$b);
  var lineProps = svgPropertiesNoEvents(propsWithoutId);
  return /* @__PURE__ */ reactExports.createElement(Dots, {
    points,
    dot,
    className: "recharts-line-dots",
    dotClassName: "recharts-line-dot",
    dataKey,
    baseProps: lineProps,
    needClip,
    clipPathId
  });
}
function LineLabelListProvider(_ref3) {
  var showLabels = _ref3.showLabels, children = _ref3.children, points = _ref3.points;
  var labelListEntries = reactExports.useMemo(() => {
    return points === null || points === void 0 ? void 0 : points.map((point2) => {
      var _point$x, _point$y;
      var viewBox = {
        x: (_point$x = point2.x) !== null && _point$x !== void 0 ? _point$x : 0,
        y: (_point$y = point2.y) !== null && _point$y !== void 0 ? _point$y : 0,
        width: 0,
        lowerWidth: 0,
        upperWidth: 0,
        height: 0
      };
      return _objectSpread$8(_objectSpread$8({}, viewBox), {}, {
        value: point2.value,
        payload: point2.payload,
        viewBox,
        /*
         * Line is not passing parentViewBox to the LabelList so the labels can escape - looks like a bug, should we pass parentViewBox?
         * Or should this just be the root chart viewBox?
         */
        parentViewBox: void 0,
        fill: void 0
      });
    });
  }, [points]);
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
function StaticCurve(_ref4) {
  var clipPathId = _ref4.clipPathId, pathRef = _ref4.pathRef, points = _ref4.points, props = _ref4.props, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance, visibleLength = _ref4.visibleLength;
  var type = props.type, layout = props.layout, connectNulls = props.connectNulls, needClip = props.needClip, shape = props.shape, strokeDasharray = props.strokeDasharray, others = _objectWithoutProperties$b(props, _excluded2$6);
  var curveProps = _objectSpread$8(_objectSpread$8({}, svgPropertiesAndEvents(others)), {}, {
    fill: "none",
    className: "recharts-line-curve",
    clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0,
    points,
    type,
    layout,
    connectNulls,
    strokeDasharray: strokeDasharray !== null && strokeDasharray !== void 0 ? strokeDasharray : props.strokeDasharray,
    pathRef,
    animationElapsedTime,
    isAnimating,
    isEntrance: props.animateNewValues ? isEntrance : false,
    visibleLength
  });
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /* @__PURE__ */ reactExports.createElement(Shape, {
    option: shape,
    DefaultShape: defaultLineProps.shape,
    shapeProps: curveProps
  }), /* @__PURE__ */ reactExports.createElement(LineDotsWrapper, {
    points,
    clipPathId,
    props
  }));
}
function CurveWithAnimation(_ref5) {
  var clipPathId = _ref5.clipPathId, props = _ref5.props, pathRef = _ref5.pathRef, previousPointsRef = _ref5.previousPointsRef;
  var points = props.points, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn, layout = props.layout;
  var totalLength = getTotalLength(pathRef.current);
  var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
  var showLabels = !isAnimating;
  var getVisibleLength = useAnimatedLineLength(points);
  var shouldUpdatePreviousRef = reactExports.useCallback((animationElapsedTime) => animationElapsedTime > 0 && totalLength > 0, [totalLength]);
  return /* @__PURE__ */ reactExports.createElement(LineLabelListProvider, {
    points,
    showLabels
  }, props.children, /* @__PURE__ */ reactExports.createElement(AnimatedItems, {
    animationInput: points,
    animationIdPrefix: "recharts-line-",
    items: points,
    previousItemsRef: previousPointsRef,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    animationInterpolateFn,
    animationMatchBy,
    shouldUpdatePreviousRef,
    layout
  }, (stepData, animationElapsedTime, isEntrance) => {
    var animationActive = isAnimating || animationElapsedTime < 1;
    var visibleLength = animationActive ? getVisibleLength(animationElapsedTime, totalLength) : null;
    return /* @__PURE__ */ reactExports.createElement(StaticCurve, {
      props,
      points: stepData,
      clipPathId,
      pathRef,
      animationElapsedTime,
      isAnimating: animationActive,
      isEntrance,
      visibleLength
    });
  }), /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
    label: props.label
  }));
}
function RenderCurve(_ref6) {
  var clipPathId = _ref6.clipPathId, props = _ref6.props;
  var previousPointsRef = reactExports.useRef(null);
  var pathRef = reactExports.useRef(null);
  return /* @__PURE__ */ reactExports.createElement(CurveWithAnimation, {
    props,
    clipPathId,
    previousPointsRef,
    pathRef
  });
}
var errorBarDataPointFormatter$1 = (dataPoint, dataKey) => {
  var _dataPoint$x, _dataPoint$y;
  return {
    x: (_dataPoint$x = dataPoint.x) !== null && _dataPoint$x !== void 0 ? _dataPoint$x : void 0,
    y: (_dataPoint$y = dataPoint.y) !== null && _dataPoint$y !== void 0 ? _dataPoint$y : void 0,
    value: dataPoint.value,
    // getValueByDataKey does not validate the output type
    errorVal: getValueByDataKey(dataPoint.payload, dataKey)
  };
};
class LineWithState extends reactExports.Component {
  render() {
    var _this$props = this.props, hide = _this$props.hide, dot = _this$props.dot, points = _this$props.points, className = _this$props.className, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, top = _this$props.top, left = _this$props.left, width = _this$props.width, height = _this$props.height, id = _this$props.id, needClip = _this$props.needClip, zIndex = _this$props.zIndex;
    if (hide) {
      return null;
    }
    var layerClass = clsx("recharts-line", className);
    var clipPathId = id;
    var _getRadiusAndStrokeWi = getRadiusAndStrokeWidthFromDot(dot), r = _getRadiusAndStrokeWi.r, strokeWidth = _getRadiusAndStrokeWi.strokeWidth;
    var clipDot = isClipDot(dot);
    var dotSize = r * 2 + strokeWidth;
    var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : void 0;
    return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
      zIndex
    }, /* @__PURE__ */ reactExports.createElement(Layer, {
      className: layerClass
    }, needClip && /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement(GraphicalItemClipPath, {
      clipPathId,
      xAxisId,
      yAxisId
    }), !clipDot && /* @__PURE__ */ reactExports.createElement("clipPath", {
      id: "clipPath-dots-".concat(clipPathId)
    }, /* @__PURE__ */ reactExports.createElement("rect", {
      x: left - dotSize / 2,
      y: top - dotSize / 2,
      width: width + dotSize,
      height: height + dotSize
    }))), /* @__PURE__ */ reactExports.createElement(SetErrorBarContext, {
      xAxisId,
      yAxisId,
      data: points,
      dataPointFormatter: errorBarDataPointFormatter$1,
      errorBarOffset: 0
    }, /* @__PURE__ */ reactExports.createElement(RenderCurve, {
      props: this.props,
      clipPathId
    }))), /* @__PURE__ */ reactExports.createElement(ActivePoints, {
      activeDot: this.props.activeDot,
      points,
      mainColor: this.props.stroke,
      itemDataKey: this.props.dataKey,
      clipPath: activePointsClipPath
    }));
  }
}
function LineImpl(props) {
  var _resolveDefaultProps = resolveDefaultProps(props, defaultLineProps), activeDot = _resolveDefaultProps.activeDot, animateNewValues = _resolveDefaultProps.animateNewValues, animationBegin = _resolveDefaultProps.animationBegin, animationDuration = _resolveDefaultProps.animationDuration, animationEasing = _resolveDefaultProps.animationEasing, connectNulls = _resolveDefaultProps.connectNulls, dot = _resolveDefaultProps.dot, hide = _resolveDefaultProps.hide, isAnimationActive = _resolveDefaultProps.isAnimationActive, label = _resolveDefaultProps.label, legendType = _resolveDefaultProps.legendType, xAxisId = _resolveDefaultProps.xAxisId, yAxisId = _resolveDefaultProps.yAxisId, id = _resolveDefaultProps.id, everythingElse = _objectWithoutProperties$b(_resolveDefaultProps, _excluded3$3);
  var _useNeedsClip = useNeedsClip(xAxisId, yAxisId), needClip = _useNeedsClip.needClip;
  var plotArea = usePlotArea();
  var layout = useChartLayout();
  var isPanorama = useIsPanorama();
  var points = useAppSelector((state) => selectLinePoints(state, xAxisId, yAxisId, isPanorama, id));
  if (layout !== "horizontal" && layout !== "vertical" || points == null || plotArea == null) {
    return null;
  }
  var height = plotArea.height, width = plotArea.width, left = plotArea.x, top = plotArea.y;
  return /* @__PURE__ */ reactExports.createElement(LineWithState, _extends$a({}, everythingElse, {
    id,
    connectNulls,
    dot,
    activeDot,
    animateNewValues,
    animationBegin,
    animationDuration,
    animationEasing,
    isAnimationActive,
    hide,
    label,
    legendType,
    xAxisId,
    yAxisId,
    points,
    layout,
    height,
    width,
    left,
    top,
    needClip
  }));
}
function computeLinePoints(_ref7) {
  var layout = _ref7.layout, xAxis = _ref7.xAxis, yAxis = _ref7.yAxis, xAxisTicks = _ref7.xAxisTicks, yAxisTicks = _ref7.yAxisTicks, dataKey = _ref7.dataKey, bandSize = _ref7.bandSize, displayedData = _ref7.displayedData;
  return displayedData.map((entry, index) => {
    var value = getValueByDataKey(entry, dataKey);
    if (layout === "horizontal") {
      var _x = getCateCoordinateOfLine({
        axis: xAxis,
        ticks: xAxisTicks,
        bandSize,
        entry,
        index
      });
      var _y = isNullish(value) ? null : yAxis.scale.map(value);
      return {
        x: _x,
        y: _y !== null && _y !== void 0 ? _y : null,
        value,
        payload: entry
      };
    }
    var x2 = isNullish(value) ? null : xAxis.scale.map(value);
    var y2 = getCateCoordinateOfLine({
      axis: yAxis,
      ticks: yAxisTicks,
      bandSize,
      entry,
      index
    });
    if (x2 == null || y2 == null) {
      return null;
    }
    return {
      x: x2,
      y: y2,
      value,
      payload: entry
    };
  }).filter(Boolean);
}
function LineFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultLineProps);
  var isPanorama = useIsPanorama();
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "line"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetLegendPayload, {
    legendPayload: computeLegendPayloadFromAreaData$1(props)
  }), /* @__PURE__ */ reactExports.createElement(SetLineTooltipEntrySettings, {
    dataKey: props.dataKey,
    data: props.data,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    unit: props.unit,
    formatter: props.formatter,
    tooltipType: props.tooltipType,
    id
  }), /* @__PURE__ */ reactExports.createElement(SetCartesianGraphicalItem, {
    type: "line",
    id,
    data: props.data,
    xAxisId: props.xAxisId,
    yAxisId: props.yAxisId,
    zAxisId: 0,
    dataKey: props.dataKey,
    hide: props.hide,
    isPanorama
  }), /* @__PURE__ */ reactExports.createElement(LineImpl, _extends$a({}, props, {
    id
  }))));
}
var Line = /* @__PURE__ */ reactExports.memo(LineFn, propsAreEqual);
Line.displayName = "Line";
function selectXAxisIdFromGraphicalItemId(state, id) {
  var _state$graphicalItems, _state$graphicalItems2;
  return (_state$graphicalItems = (_state$graphicalItems2 = state.graphicalItems.cartesianItems.find((item) => item.id === id)) === null || _state$graphicalItems2 === void 0 ? void 0 : _state$graphicalItems2.xAxisId) !== null && _state$graphicalItems !== void 0 ? _state$graphicalItems : defaultAxisId;
}
function selectYAxisIdFromGraphicalItemId(state, id) {
  var _state$graphicalItems3, _state$graphicalItems4;
  return (_state$graphicalItems3 = (_state$graphicalItems4 = state.graphicalItems.cartesianItems.find((item) => item.id === id)) === null || _state$graphicalItems4 === void 0 ? void 0 : _state$graphicalItems4.yAxisId) !== null && _state$graphicalItems3 !== void 0 ? _state$graphicalItems3 : defaultAxisId;
}
var selectXAxisWithScale$1 = (state, graphicalItemId, isPanorama) => selectAxisWithScale(state, "xAxis", selectXAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectXAxisTicks$1 = (state, graphicalItemId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", selectXAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectYAxisWithScale$1 = (state, graphicalItemId, isPanorama) => selectAxisWithScale(state, "yAxis", selectYAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectYAxisTicks$1 = (state, graphicalItemId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", selectYAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectBandSize = createSelector([selectChartLayout, selectXAxisWithScale$1, selectYAxisWithScale$1, selectXAxisTicks$1, selectYAxisTicks$1], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
  if (isCategoricalAxis(layout, "xAxis")) {
    return getBandSizeOfAxis(xAxis, xAxisTicks, false);
  }
  return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickAreaId = (_state, id) => id;
var selectSynchronisedAreaSettings = createSelector([selectUnfilteredCartesianItems, pickAreaId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "area").find((item) => item.id === id));
var selectNumericalAxisType = (state) => {
  var layout = selectChartLayout(state);
  var isXAxisCategorical = isCategoricalAxis(layout, "xAxis");
  return isXAxisCategorical ? "yAxis" : "xAxis";
};
var selectNumericalAxisIdFromGraphicalItemId = (state, graphicalItemId) => {
  var axisType = selectNumericalAxisType(state);
  if (axisType === "yAxis") {
    return selectYAxisIdFromGraphicalItemId(state, graphicalItemId);
  }
  return selectXAxisIdFromGraphicalItemId(state, graphicalItemId);
};
var selectNumericalAxisStackGroups = (state, graphicalItemId, isPanorama) => selectStackGroups(state, selectNumericalAxisType(state), selectNumericalAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectGraphicalItemStackedData = createSelector([selectSynchronisedAreaSettings, selectNumericalAxisStackGroups], (areaSettings, stackGroups) => {
  var _stackGroups$stackId;
  if (areaSettings == null || stackGroups == null) {
    return void 0;
  }
  var stackId = areaSettings.stackId;
  var stackSeriesIdentifier = getStackSeriesIdentifier(areaSettings);
  if (stackId == null || stackSeriesIdentifier == null) {
    return void 0;
  }
  var groups = (_stackGroups$stackId = stackGroups[stackId]) === null || _stackGroups$stackId === void 0 ? void 0 : _stackGroups$stackId.stackedData;
  var found = groups === null || groups === void 0 ? void 0 : groups.find((v) => v.key === stackSeriesIdentifier);
  if (found == null) {
    return void 0;
  }
  return found.map((item) => [item[0], item[1]]);
});
var selectStackDataKeys = createSelector([selectSynchronisedAreaSettings, selectNumericalAxisStackGroups], (areaSettings, stackGroups) => {
  if (areaSettings == null || areaSettings.stackId == null || stackGroups == null) {
    return void 0;
  }
  var group = stackGroups[areaSettings.stackId];
  if (group == null) {
    return void 0;
  }
  return group.graphicalItems.map((item) => item.dataKey).filter(isNotNil);
});
var selectArea = createSelector([selectChartLayout, selectXAxisWithScale$1, selectYAxisWithScale$1, selectXAxisTicks$1, selectYAxisTicks$1, selectGraphicalItemStackedData, selectChartDataWithIndexesIfNotInPanoramaPosition3, selectBandSize, selectSynchronisedAreaSettings, selectChartBaseValue, selectStackDataKeys], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, _ref2, bandSize, areaSettings, chartBaseValue, stackDataKeys) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  if (areaSettings == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null) {
    return void 0;
  }
  var data = areaSettings.data;
  var displayedData;
  if (data && data.length > 0) {
    displayedData = data;
  } else {
    displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
  }
  if (displayedData == null) {
    return void 0;
  }
  return computeArea({
    layout,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    dataStartIndex,
    areaSettings,
    stackedData,
    displayedData,
    chartBaseValue,
    bandSize,
    stackDataKeys
  });
});
var _excluded$a = ["animationElapsedTime", "isAnimating", "isEntrance", "layout", "isRange", "stroke", "connectNulls"], _excluded2$5 = ["id", "baseLine"];
function _extends$9() {
  return _extends$9 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$9.apply(null, arguments);
}
function _objectWithoutProperties$a(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$a(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$a(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function HorizontalClipRect(_ref2) {
  var _points$, _points;
  var alpha = _ref2.alpha, baseLine = _ref2.baseLine, points = _ref2.points, strokeWidth = _ref2.strokeWidth;
  var startX = (_points$ = points[0]) === null || _points$ === void 0 ? void 0 : _points$.x;
  var endX = (_points = points[points.length - 1]) === null || _points === void 0 ? void 0 : _points.x;
  if (!isWellBehavedNumber(startX) || !isWellBehavedNumber(endX)) {
    return null;
  }
  var width = alpha * Math.abs(startX - endX);
  var maxY = Math.max(...points.map((entry) => entry.y || 0));
  if (isNumber(baseLine)) {
    maxY = Math.max(baseLine, maxY);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxY = Math.max(...baseLine.map((entry) => entry.y || 0), maxY);
  }
  if (isNumber(maxY)) {
    return /* @__PURE__ */ reactExports.createElement("rect", {
      x: startX < endX ? startX : startX - width,
      y: 0,
      width,
      height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
    });
  }
  return null;
}
function VerticalClipRect(_ref2) {
  var _points$2, _points2;
  var alpha = _ref2.alpha, baseLine = _ref2.baseLine, points = _ref2.points, strokeWidth = _ref2.strokeWidth;
  var startY = (_points$2 = points[0]) === null || _points$2 === void 0 ? void 0 : _points$2.y;
  var endY = (_points2 = points[points.length - 1]) === null || _points2 === void 0 ? void 0 : _points2.y;
  if (!isWellBehavedNumber(startY) || !isWellBehavedNumber(endY)) {
    return null;
  }
  var height = alpha * Math.abs(startY - endY);
  var maxX = Math.max(...points.map((entry) => entry.x || 0));
  if (isNumber(baseLine)) {
    maxX = Math.max(baseLine, maxX);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxX = Math.max(...baseLine.map((entry) => entry.x || 0), maxX);
  }
  if (isNumber(maxX)) {
    return /* @__PURE__ */ reactExports.createElement("rect", {
      x: 0,
      y: startY < endY ? startY : startY - height,
      width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
      height: Math.floor(height)
    });
  }
  return null;
}
function RevealClipRect(_ref3) {
  var alpha = _ref3.alpha, layout = _ref3.layout, points = _ref3.points, baseLine = _ref3.baseLine, strokeWidth = _ref3.strokeWidth;
  if (layout === "vertical") {
    return /* @__PURE__ */ reactExports.createElement(VerticalClipRect, {
      alpha,
      points,
      baseLine,
      strokeWidth
    });
  }
  return /* @__PURE__ */ reactExports.createElement(HorizontalClipRect, {
    alpha,
    points,
    baseLine,
    strokeWidth
  });
}
function AreaRevealShape(props) {
  var _props$animationElaps = props.animationElapsedTime, animationElapsedTime = _props$animationElaps === void 0 ? 1 : _props$animationElaps, _props$isAnimating = props.isAnimating, isAnimating = _props$isAnimating === void 0 ? false : _props$isAnimating, _props$isEntrance = props.isEntrance, isEntrance = _props$isEntrance === void 0 ? false : _props$isEntrance, layoutProp = props.layout, isRange = props.isRange, stroke = props.stroke, connectNulls = props.connectNulls, restProps = _objectWithoutProperties$a(props, _excluded$a);
  var layout = layoutProp === "vertical" ? "vertical" : "horizontal";
  var finalConnectNulls = connectNulls !== null && connectNulls !== void 0 ? connectNulls : false;
  var clipId = useId();
  var id = restProps.id, baseLine = restProps.baseLine, propsWithoutIdBaseline = _objectWithoutProperties$a(restProps, _excluded2$5);
  var strokeSvgProps = svgPropertiesNoEvents(propsWithoutIdBaseline);
  var fillCurve = /* @__PURE__ */ reactExports.createElement(Curve, _extends$9({}, restProps, {
    id,
    baseLine,
    connectNulls: finalConnectNulls,
    stroke: "none",
    className: "recharts-area-area",
    layout
  }));
  var strokeCurve = stroke !== "none" && /* @__PURE__ */ reactExports.createElement(Curve, _extends$9({}, strokeSvgProps, {
    className: "recharts-area-curve",
    layout,
    type: restProps.type,
    connectNulls: finalConnectNulls,
    fill: "none",
    stroke,
    points: restProps.points
  }));
  var baselineCurve = stroke !== "none" && isRange && Array.isArray(baseLine) && /* @__PURE__ */ reactExports.createElement(Curve, _extends$9({}, strokeSvgProps, {
    className: "recharts-area-curve",
    layout,
    type: restProps.type,
    connectNulls: finalConnectNulls,
    fill: "none",
    stroke,
    points: baseLine
  }));
  if (isEntrance && (isAnimating || animationElapsedTime < 1)) {
    var _restProps$points;
    return /* @__PURE__ */ reactExports.createElement(Layer, null, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("clipPath", {
      id: clipId
    }, /* @__PURE__ */ reactExports.createElement(RevealClipRect, {
      alpha: animationElapsedTime,
      points: (_restProps$points = restProps.points) !== null && _restProps$points !== void 0 ? _restProps$points : [],
      baseLine,
      layout,
      strokeWidth: restProps.strokeWidth
    }))), /* @__PURE__ */ reactExports.createElement(Layer, {
      clipPath: "url(#".concat(clipId, ")")
    }, fillCurve, strokeCurve, baselineCurve));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, fillCurve, strokeCurve, baselineCurve);
}
var _excluded$9 = ["id"], _excluded2$4 = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function _extends$8() {
  return _extends$8 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$8.apply(null, arguments);
}
function _objectWithoutProperties$9(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$9(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$9(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$7(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$7(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$7(Object(t), true).forEach(function(r2) {
      _defineProperty$7(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$7(e, r, t) {
  return (r = _toPropertyKey$7(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$7(t) {
  var i = _toPrimitive$7(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$7(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultAreaAnimateItems = (items, animationElapsedTime) => {
  if (items == null) {
    return [];
  }
  if (animationElapsedTime === 1) {
    return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
  }
  return items.flatMap((item) => {
    if (item.status === "matched") {
      return [_objectSpread$7(_objectSpread$7({}, item.next), {}, {
        x: interpolate$1(item.prev.x, item.next.x, animationElapsedTime),
        y: interpolate$1(item.prev.y, item.next.y, animationElapsedTime)
      })];
    }
    if (item.status === "added") {
      return [item.next];
    }
    return [];
  });
};
var defaultAreaProps = {
  activeDot: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  animationMatchBy: matchByIndex,
  animationInterpolateFn: defaultAreaAnimateItems,
  connectNulls: false,
  dot: false,
  fill: "#3182bd",
  fillOpacity: 0.6,
  hide: false,
  isAnimationActive: "auto",
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  type: "linear",
  label: false,
  shape: AreaRevealShape,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: DefaultZIndexes.area
};
function getLegendItemColor(stroke, fill) {
  return stroke && stroke !== "none" ? stroke : fill;
}
var computeLegendPayloadFromAreaData = (props) => {
  var dataKey = props.dataKey, name = props.name, stroke = props.stroke, fill = props.fill, legendType = props.legendType, hide = props.hide;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: getLegendItemColor(stroke, fill),
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
var SetAreaTooltipEntrySettings = /* @__PURE__ */ reactExports.memo((_ref2) => {
  var dataKey = _ref2.dataKey, data = _ref2.data, stroke = _ref2.stroke, strokeWidth = _ref2.strokeWidth, fill = _ref2.fill, name = _ref2.name, hide = _ref2.hide, unit2 = _ref2.unit, formatter = _ref2.formatter, tooltipType = _ref2.tooltipType, id = _ref2.id;
  var tooltipEntrySettings = {
    dataDefinedOnItem: data,
    getPosition: noop$5,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: void 0,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: getLegendItemColor(stroke, fill),
      unit: unit2,
      formatter,
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
function AreaDotsWrapper(_ref2) {
  var clipPathId = _ref2.clipPathId, points = _ref2.points, props = _ref2.props;
  var needClip = props.needClip, dot = props.dot, dataKey = props.dataKey;
  var areaProps = svgPropertiesNoEvents(props);
  return /* @__PURE__ */ reactExports.createElement(Dots, {
    points,
    dot,
    className: "recharts-area-dots",
    dotClassName: "recharts-area-dot",
    dataKey,
    baseProps: areaProps,
    needClip,
    clipPathId
  });
}
function AreaLabelListProvider(_ref3) {
  var showLabels = _ref3.showLabels, children = _ref3.children, points = _ref3.points;
  var labelListEntries = points.map((point2) => {
    var _point$x, _point$y;
    var viewBox = {
      x: (_point$x = point2.x) !== null && _point$x !== void 0 ? _point$x : 0,
      y: (_point$y = point2.y) !== null && _point$y !== void 0 ? _point$y : 0,
      width: 0,
      lowerWidth: 0,
      upperWidth: 0,
      height: 0
    };
    return _objectSpread$7(_objectSpread$7({}, viewBox), {}, {
      value: point2.value,
      payload: point2.payload,
      parentViewBox: void 0,
      viewBox,
      fill: void 0
    });
  });
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
function StaticArea(_ref4) {
  var points = _ref4.points, baseLine = _ref4.baseLine, needClip = _ref4.needClip, clipPathId = _ref4.clipPathId, props = _ref4.props, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance;
  var layout = props.layout, type = props.type, stroke = props.stroke, connectNulls = props.connectNulls, isRange = props.isRange, shape = props.shape;
  var id = props.id, propsWithoutId = _objectWithoutProperties$9(props, _excluded$9);
  var propsWithEvents = svgPropertiesAndEvents(propsWithoutId);
  var curveProps = _objectSpread$7(_objectSpread$7({}, propsWithEvents), {}, {
    id,
    points,
    connectNulls,
    type,
    baseLine,
    layout,
    stroke,
    isRange,
    animationElapsedTime,
    isAnimating,
    isEntrance
  });
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /* @__PURE__ */ reactExports.createElement(Layer, {
    clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0
  }, /* @__PURE__ */ reactExports.createElement(Shape, {
    option: shape,
    DefaultShape: defaultAreaProps.shape,
    shapeProps: curveProps
  })), /* @__PURE__ */ reactExports.createElement(AreaDotsWrapper, {
    points,
    props: propsWithoutId,
    clipPathId
  }));
}
function interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime) {
  if (isNumber(baseLine)) {
    var previousNumberBaseLine = isNumber(prevBaseLine) ? prevBaseLine : void 0;
    return interpolate$1(previousNumberBaseLine, baseLine, animationElapsedTime);
  }
  if (isNullish(baseLine) || isNan(baseLine)) {
    var _previousNumberBaseLine = isNumber(prevBaseLine) ? prevBaseLine : void 0;
    return interpolate$1(_previousNumberBaseLine, 0, animationElapsedTime);
  }
  return baseLine;
}
function AreaWithAnimation(_ref5) {
  var needClip = _ref5.needClip, clipPathId = _ref5.clipPathId, props = _ref5.props, previousPointsRef = _ref5.previousPointsRef, previousBaselineRef = _ref5.previousBaselineRef;
  var points = props.points, baseLine = props.baseLine, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn;
  var animationInput = reactExports.useMemo(() => ({
    points,
    baseLine
  }), [points, baseLine]);
  var baseLineAnimationState = useAnimationStartSnapshot(animationInput, previousBaselineRef);
  var layout = useCartesianChartLayout();
  var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
  var prevBaseLine = baseLineAnimationState.startValue;
  if (layout == null) {
    return null;
  }
  var baseLineAnimationItems;
  if (Array.isArray(baseLine) && Array.isArray(prevBaseLine)) {
    baseLineAnimationItems = matchAnimationItems(prevBaseLine, baseLine, animationMatchBy);
  } else if (Array.isArray(baseLine)) {
    baseLineAnimationItems = matchAnimationItems(null, baseLine, animationMatchBy);
  } else {
    baseLineAnimationItems = null;
  }
  return /* @__PURE__ */ reactExports.createElement(AnimatedItems, {
    animationInput,
    animationIdPrefix: "recharts-area-",
    items: points,
    previousItemsRef: previousPointsRef,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    animationInterpolateFn,
    animationMatchBy,
    layout
  }, (stepPoints, animationElapsedTime, isEntrance) => {
    var stepBaseLine;
    if (animationElapsedTime === 1) {
      stepBaseLine = baseLine;
    } else if (Array.isArray(baseLine)) {
      stepBaseLine = animationInterpolateFn(baseLineAnimationItems, animationElapsedTime, layout);
    } else {
      stepBaseLine = isEntrance ? baseLine : interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime);
    }
    baseLineAnimationState.syncStepValue(stepBaseLine, animationElapsedTime);
    return /* @__PURE__ */ reactExports.createElement(AreaLabelListProvider, {
      showLabels: !isAnimating,
      points
    }, props.children, /* @__PURE__ */ reactExports.createElement(StaticArea, {
      points: stepPoints,
      baseLine: stepBaseLine,
      needClip,
      clipPathId,
      props,
      animationElapsedTime,
      isAnimating: isAnimating || animationElapsedTime < 1,
      isEntrance
    }), /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
      label: props.label
    }));
  });
}
function RenderArea(_ref6) {
  var needClip = _ref6.needClip, clipPathId = _ref6.clipPathId, props = _ref6.props;
  var previousPointsRef = reactExports.useRef(null);
  var previousBaselineRef = reactExports.useRef();
  return /* @__PURE__ */ reactExports.createElement(AreaWithAnimation, {
    needClip,
    clipPathId,
    props,
    previousPointsRef,
    previousBaselineRef
  });
}
class AreaWithState extends reactExports.PureComponent {
  render() {
    var _this$props = this.props, hide = _this$props.hide, dot = _this$props.dot, points = _this$props.points, className = _this$props.className, top = _this$props.top, left = _this$props.left, needClip = _this$props.needClip, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, width = _this$props.width, height = _this$props.height, id = _this$props.id, baseLine = _this$props.baseLine, zIndex = _this$props.zIndex;
    if (hide) {
      return null;
    }
    var layerClass = clsx("recharts-area", className);
    var clipPathId = id;
    var _getRadiusAndStrokeWi = getRadiusAndStrokeWidthFromDot(dot), r = _getRadiusAndStrokeWi.r, strokeWidth = _getRadiusAndStrokeWi.strokeWidth;
    var clipDot = isClipDot(dot);
    var dotSize = r * 2 + strokeWidth;
    var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : void 0;
    return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
      zIndex
    }, /* @__PURE__ */ reactExports.createElement(Layer, {
      className: layerClass
    }, needClip && /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement(GraphicalItemClipPath, {
      clipPathId,
      xAxisId,
      yAxisId
    }), !clipDot && /* @__PURE__ */ reactExports.createElement("clipPath", {
      id: "clipPath-dots-".concat(clipPathId)
    }, /* @__PURE__ */ reactExports.createElement("rect", {
      x: left - dotSize / 2,
      y: top - dotSize / 2,
      width: width + dotSize,
      height: height + dotSize
    }))), /* @__PURE__ */ reactExports.createElement(RenderArea, {
      needClip,
      clipPathId,
      props: this.props
    })), /* @__PURE__ */ reactExports.createElement(ActivePoints, {
      points,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: activePointsClipPath
    }), this.props.isRange && Array.isArray(baseLine) && /* @__PURE__ */ reactExports.createElement(ActivePoints, {
      points: baseLine,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: activePointsClipPath
    }));
  }
}
function AreaImpl(props) {
  var _useAppSelector;
  var activeDot = props.activeDot, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, connectNulls = props.connectNulls, dot = props.dot, fill = props.fill, fillOpacity = props.fillOpacity, hide = props.hide, isAnimationActive = props.isAnimationActive, legendType = props.legendType, stroke = props.stroke, xAxisId = props.xAxisId, yAxisId = props.yAxisId, everythingElse = _objectWithoutProperties$9(props, _excluded2$4);
  var layout = useChartLayout();
  var chartName = useChartName();
  var _useNeedsClip = useNeedsClip(xAxisId, yAxisId), needClip = _useNeedsClip.needClip;
  var isPanorama = useIsPanorama();
  var _ref7 = (_useAppSelector = useAppSelector((state) => selectArea(state, props.id, isPanorama))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {}, points = _ref7.points, isRange = _ref7.isRange, baseLine = _ref7.baseLine;
  var plotArea = usePlotArea();
  if (layout !== "horizontal" && layout !== "vertical" || plotArea == null) {
    return null;
  }
  if (chartName !== "AreaChart" && chartName !== "ComposedChart") {
    return null;
  }
  var height = plotArea.height, width = plotArea.width, left = plotArea.x, top = plotArea.y;
  if (!points || !points.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(AreaWithState, _extends$8({}, everythingElse, {
    activeDot,
    animationBegin,
    animationDuration,
    animationEasing,
    baseLine,
    connectNulls,
    dot,
    fill,
    fillOpacity,
    height,
    hide,
    layout,
    isAnimationActive,
    isRange,
    legendType,
    needClip,
    points,
    stroke,
    width,
    left,
    top,
    xAxisId,
    yAxisId
  }));
}
var getBaseValue = (layout, chartBaseValue, itemBaseValue, xAxis, yAxis) => {
  var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
  if (isNumber(baseValue)) {
    return baseValue;
  }
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var domainMax = Math.max(domain[0], domain[1]);
    var domainMin = Math.min(domain[0], domain[1]);
    if (baseValue === "dataMin") {
      return domainMin;
    }
    if (baseValue === "dataMax") {
      return domainMax;
    }
    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
  }
  if (baseValue === "dataMin") {
    return domain[0];
  }
  if (baseValue === "dataMax") {
    return domain[1];
  }
  return domain[0];
};
function computeArea(_ref8) {
  var _ref8$areaSettings = _ref8.areaSettings, connectNulls = _ref8$areaSettings.connectNulls, itemBaseValue = _ref8$areaSettings.baseValue, dataKey = _ref8$areaSettings.dataKey, stackedData = _ref8.stackedData, layout = _ref8.layout, chartBaseValue = _ref8.chartBaseValue, xAxis = _ref8.xAxis, yAxis = _ref8.yAxis, displayedData = _ref8.displayedData, dataStartIndex = _ref8.dataStartIndex, xAxisTicks = _ref8.xAxisTicks, yAxisTicks = _ref8.yAxisTicks, bandSize = _ref8.bandSize, stackDataKeys = _ref8.stackDataKeys;
  var hasStack = stackedData && stackedData.length;
  var baseValue = getBaseValue(layout, chartBaseValue, itemBaseValue, xAxis, yAxis);
  var isHorizontalLayout = layout === "horizontal";
  var isRange = false;
  var points = displayedData.map((entry, index) => {
    var _valueAsArray$, _valueAsArray, _xAxis$scale$map;
    var valueAsArray;
    if (hasStack) {
      valueAsArray = stackedData[dataStartIndex + index];
    } else {
      var _rawValue = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(_rawValue)) {
        valueAsArray = [baseValue, _rawValue];
      } else {
        valueAsArray = _rawValue;
        isRange = true;
      }
    }
    var value1 = (_valueAsArray$ = (_valueAsArray = valueAsArray) === null || _valueAsArray === void 0 ? void 0 : _valueAsArray[1]) !== null && _valueAsArray$ !== void 0 ? _valueAsArray$ : null;
    var rawValue = getValueByDataKey(entry, dataKey);
    var wholeStackIsNull = hasStack && rawValue == null && stackDataKeys != null && stackDataKeys.length > 0 && stackDataKeys.every((key) => getValueByDataKey(entry, key) == null);
    var isBreakPoint = value1 == null || hasStack && !connectNulls && rawValue == null || wholeStackIsNull;
    if (isHorizontalLayout) {
      var _yAxis$scale$map;
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isBreakPoint ? null : (_yAxis$scale$map = yAxis.scale.map(value1)) !== null && _yAxis$scale$map !== void 0 ? _yAxis$scale$map : null,
        value: valueAsArray,
        payload: entry
      };
    }
    return {
      x: isBreakPoint ? null : (_xAxis$scale$map = xAxis.scale.map(value1)) !== null && _xAxis$scale$map !== void 0 ? _xAxis$scale$map : null,
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value: valueAsArray,
      payload: entry
    };
  });
  var baseLine;
  if (hasStack || isRange) {
    baseLine = points.map((entry) => {
      var _xAxis$scale$map2;
      var x2 = Array.isArray(entry.value) ? entry.value[0] : null;
      if (isHorizontalLayout) {
        var _yAxis$scale$map2;
        return {
          x: entry.x,
          y: x2 != null && entry.y != null ? (_yAxis$scale$map2 = yAxis.scale.map(x2)) !== null && _yAxis$scale$map2 !== void 0 ? _yAxis$scale$map2 : null : null,
          payload: entry.payload
        };
      }
      return {
        x: x2 != null ? (_xAxis$scale$map2 = xAxis.scale.map(x2)) !== null && _xAxis$scale$map2 !== void 0 ? _xAxis$scale$map2 : null : null,
        y: entry.y,
        payload: entry.payload
      };
    });
  } else {
    baseLine = isHorizontalLayout ? yAxis.scale.map(baseValue) : xAxis.scale.map(baseValue);
  }
  return {
    points,
    baseLine: baseLine !== null && baseLine !== void 0 ? baseLine : 0,
    isRange
  };
}
function AreaFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultAreaProps);
  var isPanorama = useIsPanorama();
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "area"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetLegendPayload, {
    legendPayload: computeLegendPayloadFromAreaData(props)
  }), /* @__PURE__ */ reactExports.createElement(SetAreaTooltipEntrySettings, {
    dataKey: props.dataKey,
    data: props.data,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    unit: props.unit,
    formatter: props.formatter,
    tooltipType: props.tooltipType,
    id
  }), /* @__PURE__ */ reactExports.createElement(SetCartesianGraphicalItem, {
    type: "area",
    id,
    data: props.data,
    dataKey: props.dataKey,
    xAxisId: props.xAxisId,
    yAxisId: props.yAxisId,
    zAxisId: 0,
    stackId: getNormalizedStackId(props.stackId),
    hide: props.hide,
    barSize: void 0,
    baseValue: props.baseValue,
    isPanorama,
    connectNulls: props.connectNulls
  }), /* @__PURE__ */ reactExports.createElement(AreaImpl, _extends$8({}, props, {
    id
  }))));
}
var Area = /* @__PURE__ */ reactExports.memo(AreaFn, propsAreEqual);
Area.displayName = "Area";
var prefix = "Invariant failed";
function invariant(condition, message) {
  {
    throw new Error(prefix);
  }
}
var _excluded$8 = ["option"];
function _objectWithoutProperties$8(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$8(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$8(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var defaultBarShape = Rectangle;
function BarRectangle(_ref2) {
  var option = _ref2.option, shapeProps = _objectWithoutProperties$8(_ref2, _excluded$8);
  return /* @__PURE__ */ reactExports.createElement(Shape, {
    option,
    DefaultShape: defaultBarShape,
    shapeProps,
    activeClassName: "recharts-active-bar",
    inActiveClassName: "recharts-inactive-bar"
  });
}
var minPointSizeCallback = function minPointSizeCallback2(minPointSize) {
  var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return (value, index) => {
    if (isNumber(minPointSize)) return minPointSize;
    var isValueNumberOrNil = isNumber(value) || isNullish(value);
    if (isValueNumberOrNil) {
      return minPointSize(value, index);
    }
    !isValueNumberOrNil ? invariant() : void 0;
    return defaultValue;
  };
};
var pickIsPanorama = (_state, _id, isPanorama) => isPanorama;
var pickBarId = (_state, id) => id;
var selectSynchronisedBarSettings = createSelector([selectUnfilteredCartesianItems, pickBarId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "bar").find((item) => item.id === id));
var selectMaxBarSize = createSelector([selectSynchronisedBarSettings], (barSettings) => barSettings === null || barSettings === void 0 ? void 0 : barSettings.maxBarSize);
var pickCells = (_state, _id, _isPanorama, cells) => cells;
var selectAllVisibleBars = createSelector([selectChartLayout, selectUnfilteredCartesianItems, selectXAxisIdFromGraphicalItemId, selectYAxisIdFromGraphicalItemId, pickIsPanorama], (layout, allItems, xAxisId, yAxisId, isPanorama) => allItems.filter((i) => {
  if (layout === "horizontal") {
    return i.xAxisId === xAxisId;
  }
  return i.yAxisId === yAxisId;
}).filter((i) => i.isPanorama === isPanorama).filter((i) => i.hide === false).filter((i) => i.type === "bar"));
var selectBarStackGroups = (state, id, isPanorama) => {
  var layout = selectChartLayout(state);
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null || yAxisId == null) {
    return void 0;
  }
  if (layout === "horizontal") {
    return selectStackGroups(state, "yAxis", yAxisId, isPanorama);
  }
  return selectStackGroups(state, "xAxis", xAxisId, isPanorama);
};
var selectBarCartesianAxisSize = (state, id) => {
  var layout = selectChartLayout(state);
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null || yAxisId == null) {
    return void 0;
  }
  if (layout === "horizontal") {
    return selectCartesianAxisSize(state, "xAxis", xAxisId);
  }
  return selectCartesianAxisSize(state, "yAxis", yAxisId);
};
var selectBarSizeList = createSelector([selectAllVisibleBars, selectRootBarSize, selectBarCartesianAxisSize], combineBarSizeList);
var selectBarBandSize = (state, id, isPanorama) => {
  var _ref2, _getBandSizeOfAxis;
  var barSettings = selectSynchronisedBarSettings(state, id);
  if (barSettings == null) {
    return 0;
  }
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null || yAxisId == null) {
    return 0;
  }
  var layout = selectChartLayout(state);
  var globalMaxBarSize = selectRootMaxBarSize(state);
  var childMaxBarSize = barSettings.maxBarSize;
  var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
  var axis, ticks2;
  if (layout === "horizontal") {
    axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
    ticks2 = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
  } else {
    axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
    ticks2 = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
  }
  return (_ref2 = (_getBandSizeOfAxis = getBandSizeOfAxis(axis, ticks2, true)) !== null && _getBandSizeOfAxis !== void 0 ? _getBandSizeOfAxis : maxBarSize) !== null && _ref2 !== void 0 ? _ref2 : 0;
};
var selectAxisBandSize = (state, id, isPanorama) => {
  var layout = selectChartLayout(state);
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null || yAxisId == null) {
    return void 0;
  }
  var axis, ticks2;
  if (layout === "horizontal") {
    axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
    ticks2 = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
  } else {
    axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
    ticks2 = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
  }
  return getBandSizeOfAxis(axis, ticks2);
};
var selectAllBarPositions = createSelector([selectBarSizeList, selectRootMaxBarSize, selectBarGap, selectBarCategoryGap, selectBarBandSize, selectAxisBandSize, selectMaxBarSize], combineAllBarPositions);
var selectXAxisWithScale = (state, id, isPanorama) => {
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null) {
    return void 0;
  }
  return selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
};
var selectYAxisWithScale = (state, id, isPanorama) => {
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (yAxisId == null) {
    return void 0;
  }
  return selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
};
var selectXAxisTicks = (state, id, isPanorama) => {
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null) {
    return void 0;
  }
  return selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
};
var selectYAxisTicks = (state, id, isPanorama) => {
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (yAxisId == null) {
    return void 0;
  }
  return selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
};
var selectBarPosition = createSelector([selectAllBarPositions, selectSynchronisedBarSettings], combineBarPosition);
var selectStackedDataOfItem = createSelector([selectBarStackGroups, selectSynchronisedBarSettings], combineStackedData);
var selectBarRectangles = createSelector([selectChartOffsetInternal, selectAxisViewBox, selectXAxisWithScale, selectYAxisWithScale, selectXAxisTicks, selectYAxisTicks, selectBarPosition, selectChartLayout, selectChartDataWithIndexesIfNotInPanoramaPosition3, selectAxisBandSize, selectStackedDataOfItem, selectSynchronisedBarSettings, pickCells], (offset, axisViewBox, xAxis, yAxis, xAxisTicks, yAxisTicks, pos, layout, _ref2, bandSize, stackedData, barSettings, cells) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  if (barSettings == null || pos == null || axisViewBox == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || bandSize == null) {
    return void 0;
  }
  var data = barSettings.data;
  var displayedData;
  if (data != null && data.length > 0) {
    displayedData = data;
  } else {
    displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
  }
  if (displayedData == null) {
    return void 0;
  }
  return computeBarRectangles({
    layout,
    barSettings,
    pos,
    parentViewBox: axisViewBox,
    bandSize,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    stackedData,
    displayedData,
    offset,
    cells,
    dataStartIndex
  });
});
var _excluded$7 = ["index"];
function _extends$7() {
  return _extends$7 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$7.apply(null, arguments);
}
function _objectWithoutProperties$7(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$7(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$7(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var BarStackContext = /* @__PURE__ */ reactExports.createContext(void 0);
var useStackId = (childStackId) => {
  var stackSettings = reactExports.useContext(BarStackContext);
  if (stackSettings != null) {
    return stackSettings.stackId;
  }
  if (childStackId == null) {
    return void 0;
  }
  return getNormalizedStackId(childStackId);
};
var getClipPathId = (stackId, index) => {
  return "recharts-bar-stack-clip-path-".concat(stackId, "-").concat(index);
};
var useBarStackClipPathUrl = (index) => {
  var barStackContext = reactExports.useContext(BarStackContext);
  if (barStackContext == null) {
    return void 0;
  }
  var stackId = barStackContext.stackId;
  return "url(#".concat(getClipPathId(stackId, index), ")");
};
var BarStackClipLayer = (_ref2) => {
  var index = _ref2.index, rest = _objectWithoutProperties$7(_ref2, _excluded$7);
  var clipPathUrl = useBarStackClipPathUrl(index);
  return /* @__PURE__ */ reactExports.createElement(Layer, _extends$7({
    className: "recharts-bar-stack-layer",
    clipPath: clipPathUrl
  }, rest));
};
var _excluded$6 = ["onMouseEnter", "onMouseLeave", "onClick"], _excluded2$3 = ["value", "background", "tooltipPosition"], _excluded3$2 = ["id"], _excluded4 = ["onMouseEnter", "onClick", "onMouseLeave"];
function _slicedToArray$2(r, e) {
  return _arrayWithHoles$2(r) || _iterableToArrayLimit$2(r, e) || _unsupportedIterableToArray$2(r, e) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$2(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a2) : void 0;
  }
}
function _arrayLikeToArray$2(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$2(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$2(r) {
  if (Array.isArray(r)) return r;
}
function _extends$6() {
  return _extends$6 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$6.apply(null, arguments);
}
function ownKeys$6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$6(Object(t), true).forEach(function(r2) {
      _defineProperty$6(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$6(e, r, t) {
  return (r = _toPropertyKey$6(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$6(t) {
  var i = _toPrimitive$6(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$6(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$6(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$6(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$6(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var computeLegendPayloadFromBarData = (props) => {
  var dataKey = props.dataKey, name = props.name, fill = props.fill, legendType = props.legendType, hide = props.hide;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: fill,
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
var SetBarTooltipEntrySettings = /* @__PURE__ */ reactExports.memo((_ref2) => {
  var dataKey = _ref2.dataKey, stroke = _ref2.stroke, strokeWidth = _ref2.strokeWidth, fill = _ref2.fill, name = _ref2.name, hide = _ref2.hide, unit2 = _ref2.unit, formatter = _ref2.formatter, tooltipType = _ref2.tooltipType, id = _ref2.id;
  var tooltipEntrySettings = {
    dataDefinedOnItem: void 0,
    getPosition: noop$5,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: void 0,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: fill,
      unit: unit2,
      formatter,
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
function BarBackground(props) {
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var data = props.data, dataKey = props.dataKey, backgroundFromProps = props.background, allOtherBarProps = props.allOtherBarProps;
  var onMouseEnterFromProps = allOtherBarProps.onMouseEnter, onMouseLeaveFromProps = allOtherBarProps.onMouseLeave, onItemClickFromProps = allOtherBarProps.onClick, restOfAllOtherProps = _objectWithoutProperties$6(allOtherBarProps, _excluded$6);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey, allOtherBarProps.id);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey, allOtherBarProps.id);
  if (!backgroundFromProps || data == null) {
    return null;
  }
  var backgroundProps = svgPropertiesNoEventsFromUnknown(backgroundFromProps);
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: getZIndexFromUnknown(backgroundFromProps, DefaultZIndexes.barBackground)
  }, data.map((entry, i) => {
    entry.value;
    var backgroundFromDataEntry = entry.background;
    entry.tooltipPosition;
    var rest = _objectWithoutProperties$6(entry, _excluded2$3);
    if (!backgroundFromDataEntry) {
      return null;
    }
    var onMouseEnter = onMouseEnterFromContext(entry, entry.originalDataIndex);
    var onMouseLeave = onMouseLeaveFromContext(entry, entry.originalDataIndex);
    var onClick = onClickFromContext(entry, entry.originalDataIndex);
    var barRectangleProps = _objectSpread$6(_objectSpread$6(_objectSpread$6(_objectSpread$6(_objectSpread$6({
      option: backgroundFromProps,
      isActive: String(entry.originalDataIndex) === activeIndex
    }, rest), {}, {
      // @ts-expect-error backgroundProps is contributing unknown props
      fill: "#eee"
    }, backgroundFromDataEntry), backgroundProps), adaptEventsOfChild(restOfAllOtherProps, entry, i)), {}, {
      onMouseEnter,
      onMouseLeave,
      onClick,
      dataKey,
      index: i,
      className: "recharts-bar-background-rectangle"
    });
    return /* @__PURE__ */ reactExports.createElement(BarRectangle, _extends$6({
      key: "background-bar-".concat(i)
    }, barRectangleProps));
  }));
}
function BarLabelListProvider(_ref2) {
  var showLabels = _ref2.showLabels, children = _ref2.children, rects = _ref2.rects;
  var labelListEntries = rects === null || rects === void 0 ? void 0 : rects.map((entry) => {
    var viewBox = {
      x: entry.x,
      y: entry.y,
      width: entry.width,
      lowerWidth: entry.width,
      upperWidth: entry.width,
      height: entry.height
    };
    return _objectSpread$6(_objectSpread$6({}, viewBox), {}, {
      value: entry.value,
      payload: entry.payload,
      parentViewBox: entry.parentViewBox,
      viewBox,
      fill: entry.fill
    });
  });
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
function BarRectangleWithActiveState(props) {
  var shape = props.shape, activeBar = props.activeBar, baseProps = props.baseProps, entry = props.entry, index = props.index, dataKey = props.dataKey;
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataKey = useAppSelector(selectActiveTooltipDataKey);
  var isActive = activeBar && String(entry.originalDataIndex) === activeIndex && (activeDataKey == null || dataKey === activeDataKey);
  var isAnotherBarActive = activeIndex != null && (String(entry.originalDataIndex) !== activeIndex || activeDataKey != null && dataKey !== activeDataKey);
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray$2(_useState, 2), stayInLayer = _useState2[0], setStayInLayer = _useState2[1];
  var _useState3 = reactExports.useState(false), _useState4 = _slicedToArray$2(_useState3, 2), hasMountedActive = _useState4[0], setHasMountedActive = _useState4[1];
  reactExports.useEffect(() => {
    var rafId2;
    if (isActive) {
      setStayInLayer(true);
      rafId2 = requestAnimationFrame(() => {
        setHasMountedActive(true);
      });
    } else {
      setHasMountedActive(false);
      if (isAnotherBarActive) {
        setStayInLayer(false);
      }
    }
    return () => {
      cancelAnimationFrame(rafId2);
    };
  }, [isActive, isAnotherBarActive]);
  var handleTransitionEnd = reactExports.useCallback(() => {
    if (!isActive) {
      setStayInLayer(false);
    }
  }, [isActive]);
  var isVisuallyActive = isActive && hasMountedActive;
  var shouldRenderInLayer = isActive || stayInLayer;
  var option;
  if (isActive) {
    if (activeBar === true) {
      option = shape;
    } else {
      option = activeBar;
    }
  } else {
    option = shape;
  }
  var content = /* @__PURE__ */ reactExports.createElement(BarRectangle, _extends$6({}, baseProps, {
    name: String(baseProps.name)
  }, entry, {
    isActive: isVisuallyActive,
    option,
    index,
    dataKey,
    animationElapsedTime: props.animationElapsedTime,
    isAnimating: props.isAnimating,
    isEntrance: props.isEntrance,
    onTransitionEnd: handleTransitionEnd
  }));
  if (shouldRenderInLayer) {
    return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
      zIndex: DefaultZIndexes.activeBar
    }, /* @__PURE__ */ reactExports.createElement(BarStackClipLayer, {
      index: entry.originalDataIndex
    }, content));
  }
  return content;
}
function BarRectangleNeverActive(props) {
  var shape = props.shape, baseProps = props.baseProps, entry = props.entry, index = props.index, dataKey = props.dataKey;
  return /* @__PURE__ */ reactExports.createElement(BarRectangle, _extends$6({}, baseProps, {
    name: String(baseProps.name)
  }, entry, {
    isActive: false,
    option: shape,
    index,
    dataKey,
    animationElapsedTime: props.animationElapsedTime,
    isAnimating: props.isAnimating,
    isEntrance: props.isEntrance
  }));
}
function BarRectangles(_ref3) {
  var _svgPropertiesNoEvent;
  var data = _ref3.data, props = _ref3.props, animationElapsedTime = _ref3.animationElapsedTime, isAnimating = _ref3.isAnimating, isEntrance = _ref3.isEntrance;
  var _ref4 = (_svgPropertiesNoEvent = svgPropertiesNoEvents(props)) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {}, id = _ref4.id, baseProps = _objectWithoutProperties$6(_ref4, _excluded3$2);
  var shape = props.shape, dataKey = props.dataKey, activeBar = props.activeBar;
  var onMouseEnterFromProps = props.onMouseEnter, onItemClickFromProps = props.onClick, onMouseLeaveFromProps = props.onMouseLeave, restOfAllOtherProps = _objectWithoutProperties$6(props, _excluded4);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey, id);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey, id);
  if (!data) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, data.map((entry, i) => {
    return /* @__PURE__ */ reactExports.createElement(BarStackClipLayer, _extends$6({
      index: entry.originalDataIndex,
      key: "rectangle-".concat(entry === null || entry === void 0 ? void 0 : entry.x, "-").concat(entry === null || entry === void 0 ? void 0 : entry.y, "-").concat(entry === null || entry === void 0 ? void 0 : entry.value, "-").concat(i),
      className: "recharts-bar-rectangle"
    }, adaptEventsOfChild(restOfAllOtherProps, entry, i), {
      onMouseEnter: onMouseEnterFromContext(entry, entry.originalDataIndex),
      onMouseLeave: onMouseLeaveFromContext(entry, entry.originalDataIndex),
      onClick: onClickFromContext(entry, entry.originalDataIndex)
    }), activeBar ? /* @__PURE__ */ reactExports.createElement(BarRectangleWithActiveState, {
      shape,
      activeBar,
      baseProps,
      entry,
      index: i,
      dataKey,
      animationElapsedTime,
      isAnimating,
      isEntrance
    }) : (
      /*
       * If the `activeBar` prop is falsy, then let's call the variant without hooks.
       * Using the `selectActiveTooltipIndex` selector is usually fast
       * but in charts with large-ish amount of data even the few nanoseconds add up to a noticeable jank.
       * If the activeBar is false then we don't need to know which index is active - because we won't use it anyway.
       * So let's just skip the hooks altogether. That way, React can skip rendering the component,
       * and can skip the tree reconciliation for its children too.
       * Because we can't call hooks conditionally, we need to have a separate component for that.
       */
      /* @__PURE__ */ reactExports.createElement(BarRectangleNeverActive, {
        shape,
        baseProps,
        entry,
        index: i,
        dataKey,
        animationElapsedTime,
        isAnimating,
        isEntrance
      })
    ));
  }));
}
var defaultBarAnimateItems = (items, animationElapsedTime, layout) => {
  if (items == null) return [];
  if (animationElapsedTime === 1) {
    return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
  }
  return items.flatMap((item) => {
    if (item.status === "removed") {
      if (layout === "horizontal") {
        return [_objectSpread$6(_objectSpread$6({}, item.prev), {}, {
          height: interpolate$1(item.prev.height, 0, animationElapsedTime),
          y: interpolate$1(item.prev.y, item.prev.y + item.prev.height, animationElapsedTime)
        })];
      }
      return [_objectSpread$6(_objectSpread$6({}, item.prev), {}, {
        width: interpolate$1(item.prev.width, 0, animationElapsedTime)
      })];
    }
    if (item.status === "matched") {
      return [_objectSpread$6(_objectSpread$6({}, item.next), {}, {
        x: interpolate$1(item.prev.x, item.next.x, animationElapsedTime),
        y: interpolate$1(item.prev.y, item.next.y, animationElapsedTime),
        width: interpolate$1(item.prev.width, item.next.width, animationElapsedTime),
        height: interpolate$1(item.prev.height, item.next.height, animationElapsedTime)
      })];
    }
    var next = item.next;
    if (layout === "horizontal") {
      return [_objectSpread$6(_objectSpread$6({}, next), {}, {
        height: interpolate$1(0, next.height, animationElapsedTime),
        y: interpolate$1(next.stackedBarStart, next.y, animationElapsedTime)
      })];
    }
    return [_objectSpread$6(_objectSpread$6({}, next), {}, {
      width: interpolate$1(0, next.width, animationElapsedTime),
      x: interpolate$1(next.stackedBarStart, next.x, animationElapsedTime)
    })];
  });
};
function RectanglesWithAnimation(_ref5) {
  var props = _ref5.props, previousRectanglesRef = _ref5.previousRectanglesRef;
  var data = props.data, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationInterpolateFn = props.animationInterpolateFn, layout = props.layout;
  var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
  return /* @__PURE__ */ reactExports.createElement(BarLabelListProvider, {
    showLabels: !isAnimating,
    rects: data
  }, /* @__PURE__ */ reactExports.createElement(AnimatedItems, {
    animationInput: data,
    animationIdPrefix: "recharts-bar-",
    items: data,
    previousItemsRef: previousRectanglesRef,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    animationInterpolateFn,
    animationMatchBy: props.animationMatchBy,
    layout
  }, (stepData, animationElapsedTime, isEntrance) => /* @__PURE__ */ reactExports.createElement(Layer, null, /* @__PURE__ */ reactExports.createElement(BarRectangles, {
    props,
    data: stepData,
    animationElapsedTime,
    isAnimating: isAnimating || animationElapsedTime < 1,
    isEntrance
  }))), /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
    label: props.label
  }), props.children);
}
function RenderRectangles(props) {
  var previousRectanglesRef = reactExports.useRef(null);
  return /* @__PURE__ */ reactExports.createElement(RectanglesWithAnimation, {
    previousRectanglesRef,
    props
  });
}
var defaultMinPointSize = 0;
var errorBarDataPointFormatter = (dataPoint, dataKey) => {
  var value = Array.isArray(dataPoint.value) ? dataPoint.value[1] : dataPoint.value;
  return {
    x: dataPoint.x,
    y: dataPoint.y,
    value,
    // getValueByDataKey does not validate the output type
    errorVal: getValueByDataKey(dataPoint, dataKey)
  };
};
class BarWithState extends reactExports.PureComponent {
  render() {
    var _this$props = this.props, hide = _this$props.hide, data = _this$props.data, dataKey = _this$props.dataKey, className = _this$props.className, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, needClip = _this$props.needClip, background = _this$props.background, id = _this$props.id;
    if (hide || data == null) {
      return null;
    }
    var layerClass = clsx("recharts-bar", className);
    var clipPathId = id;
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      className: layerClass,
      id
    }, needClip && /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement(GraphicalItemClipPath, {
      clipPathId,
      xAxisId,
      yAxisId
    })), /* @__PURE__ */ reactExports.createElement(Layer, {
      className: "recharts-bar-rectangles",
      clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0
    }, /* @__PURE__ */ reactExports.createElement(BarBackground, {
      data,
      dataKey,
      background,
      allOtherBarProps: this.props
    }), /* @__PURE__ */ reactExports.createElement(RenderRectangles, this.props)));
  }
}
var defaultBarProps = {
  activeBar: false,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease",
  animationInterpolateFn: defaultBarAnimateItems,
  animationMatchBy: matchAppend,
  background: false,
  hide: false,
  isAnimationActive: "auto",
  label: false,
  legendType: "rect",
  minPointSize: defaultMinPointSize,
  shape: defaultBarShape,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: DefaultZIndexes.bar
};
function BarImpl(props) {
  var xAxisId = props.xAxisId, yAxisId = props.yAxisId, hide = props.hide, legendType = props.legendType, minPointSize = props.minPointSize, activeBar = props.activeBar, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, isAnimationActive = props.isAnimationActive;
  var _useNeedsClip = useNeedsClip(xAxisId, yAxisId), needClip = _useNeedsClip.needClip;
  var layout = useChartLayout();
  var isPanorama = useIsPanorama();
  var cells = findAllByType(props.children, Cell);
  var rects = useAppSelector((state) => selectBarRectangles(state, props.id, isPanorama, cells));
  if (layout !== "vertical" && layout !== "horizontal") {
    return null;
  }
  var errorBarOffset;
  var firstDataPoint = rects === null || rects === void 0 ? void 0 : rects[0];
  if (firstDataPoint == null || firstDataPoint.height == null || firstDataPoint.width == null) {
    errorBarOffset = 0;
  } else {
    errorBarOffset = layout === "vertical" ? firstDataPoint.height / 2 : firstDataPoint.width / 2;
  }
  return /* @__PURE__ */ reactExports.createElement(SetErrorBarContext, {
    xAxisId,
    yAxisId,
    data: rects,
    dataPointFormatter: errorBarDataPointFormatter,
    errorBarOffset
  }, /* @__PURE__ */ reactExports.createElement(BarWithState, _extends$6({}, props, {
    layout,
    needClip,
    data: rects,
    xAxisId,
    yAxisId,
    hide,
    legendType,
    minPointSize,
    activeBar,
    animationBegin,
    animationDuration,
    animationEasing,
    isAnimationActive
  })));
}
function computeBarRectangles(_ref6) {
  var layout = _ref6.layout, _ref6$barSettings = _ref6.barSettings, dataKey = _ref6$barSettings.dataKey, minPointSizeProp = _ref6$barSettings.minPointSize, hasCustomShape = _ref6$barSettings.hasCustomShape, pos = _ref6.pos, bandSize = _ref6.bandSize, xAxis = _ref6.xAxis, yAxis = _ref6.yAxis, xAxisTicks = _ref6.xAxisTicks, yAxisTicks = _ref6.yAxisTicks, stackedData = _ref6.stackedData, displayedData = _ref6.displayedData, offset = _ref6.offset, cells = _ref6.cells, parentViewBox = _ref6.parentViewBox, dataStartIndex = _ref6.dataStartIndex;
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
  var baseValue = getBaseValueOfBar({
    numericAxis
  });
  var stackedBarStart = numericAxis.scale.map(baseValue);
  return displayedData.map((entry, index) => {
    var value, x2, y2, width, height, background;
    if (stackedData) {
      var untruncatedValue = stackedData[index + dataStartIndex];
      if (untruncatedValue == null) {
        return null;
      }
      value = truncateByDomain(untruncatedValue, stackedDomain);
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      }
    }
    var minPointSize = minPointSizeCallback(minPointSizeProp, defaultMinPointSize)(value[1], index);
    if (layout === "horizontal") {
      var _ref7;
      var baseValueScale = yAxis.scale.map(value[0]);
      var currentValueScale = yAxis.scale.map(value[1]);
      if (baseValueScale == null || currentValueScale == null) {
        return null;
      }
      x2 = getCateCoordinateOfBar({
        axis: xAxis,
        ticks: xAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      y2 = (_ref7 = currentValueScale !== null && currentValueScale !== void 0 ? currentValueScale : baseValueScale) !== null && _ref7 !== void 0 ? _ref7 : void 0;
      width = pos.size;
      var computedHeight = baseValueScale - currentValueScale;
      height = isNan(computedHeight) ? 0 : computedHeight;
      background = {
        x: x2,
        y: offset.top,
        width,
        height: offset.height
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
        var delta = mathSign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
        y2 -= delta;
        height += delta;
      }
    } else {
      var _baseValueScale = xAxis.scale.map(value[0]);
      var _currentValueScale = xAxis.scale.map(value[1]);
      if (_baseValueScale == null || _currentValueScale == null) {
        return null;
      }
      x2 = _baseValueScale;
      y2 = getCateCoordinateOfBar({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      width = _currentValueScale - _baseValueScale;
      height = pos.size;
      background = {
        x: offset.left,
        y: y2,
        width: offset.width,
        height
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
        var _delta = mathSign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
        width += _delta;
      }
    }
    if (x2 == null || y2 == null || width == null || height == null || !hasCustomShape && (width === 0 || height === 0)) {
      return null;
    }
    var barRectangleItem = _objectSpread$6(_objectSpread$6({}, entry), {}, {
      stackedBarStart,
      x: x2,
      y: y2,
      width,
      height,
      value: stackedData ? value : value[1],
      payload: entry,
      background,
      tooltipPosition: {
        x: x2 + width / 2,
        y: y2 + height / 2
      },
      parentViewBox,
      originalDataIndex: index
    }, cells && cells[index] && cells[index].props);
    return barRectangleItem;
  }).filter(Boolean);
}
function BarFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultBarProps);
  var stackId = useStackId(props.stackId);
  var isPanorama = useIsPanorama();
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "bar"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetLegendPayload, {
    legendPayload: computeLegendPayloadFromBarData(props)
  }), /* @__PURE__ */ reactExports.createElement(SetBarTooltipEntrySettings, {
    dataKey: props.dataKey,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    unit: props.unit,
    formatter: props.formatter,
    tooltipType: props.tooltipType,
    id
  }), /* @__PURE__ */ reactExports.createElement(SetCartesianGraphicalItem, {
    type: "bar",
    id,
    data: void 0,
    xAxisId: props.xAxisId,
    yAxisId: props.yAxisId,
    zAxisId: 0,
    dataKey: props.dataKey,
    stackId,
    hide: props.hide,
    barSize: props.barSize,
    minPointSize: props.minPointSize,
    maxBarSize: props.maxBarSize,
    isPanorama,
    hasCustomShape: props.shape != null && props.shape !== defaultBarShape
  }), /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ reactExports.createElement(BarImpl, _extends$6({}, props, {
    id
  })))));
}
var Bar = /* @__PURE__ */ reactExports.memo(BarFn, propsAreEqual);
Bar.displayName = "Bar";
var _excluded$5 = ["domain", "range"], _excluded2$2 = ["domain", "range"];
function _objectWithoutProperties$5(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$5(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$5(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function shortArraysAreEqual(arr1, arr2) {
  if (arr1 === arr2) {
    return true;
  }
  if (Array.isArray(arr1) && arr1.length === 2 && Array.isArray(arr2) && arr2.length === 2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }
  return false;
}
function axisPropsAreEqual(prevProps, nextProps) {
  if (prevProps === nextProps) {
    return true;
  }
  var prevDomain = prevProps.domain, prevRange = prevProps.range, prevRest = _objectWithoutProperties$5(prevProps, _excluded$5);
  var nextDomain = nextProps.domain, nextRange = nextProps.range, nextRest = _objectWithoutProperties$5(nextProps, _excluded2$2);
  if (!shortArraysAreEqual(prevDomain, nextDomain)) {
    return false;
  }
  if (!shortArraysAreEqual(prevRange, nextRange)) {
    return false;
  }
  return propsAreEqual(prevRest, nextRest);
}
var _excluded$4 = ["type"], _excluded2$1 = ["dangerouslySetInnerHTML", "ticks", "scale"], _excluded3$1 = ["id", "scale"];
function _extends$5() {
  return _extends$5 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$5.apply(null, arguments);
}
function ownKeys$5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t), true).forEach(function(r2) {
      _defineProperty$5(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$5(e, r, t) {
  return (r = _toPropertyKey$5(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$5(t) {
  var i = _toPrimitive$5(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$5(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$4(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$4(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$4(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function SetXAxisSettings(props) {
  var dispatch = useAppDispatch();
  var prevSettingsRef = reactExports.useRef(null);
  var layout = useCartesianChartLayout();
  var typeFromProps = props.type, restProps = _objectWithoutProperties$4(props, _excluded$4);
  var evaluatedType = getAxisTypeBasedOnLayout(layout, "xAxis", typeFromProps);
  var settings = reactExports.useMemo(() => {
    if (evaluatedType == null) {
      return void 0;
    }
    return _objectSpread$5(_objectSpread$5({}, restProps), {}, {
      type: evaluatedType
    });
  }, [restProps, evaluatedType]);
  reactExports.useLayoutEffect(() => {
    if (settings == null) {
      return;
    }
    if (prevSettingsRef.current === null) {
      dispatch(addXAxis(settings));
    } else if (prevSettingsRef.current !== settings) {
      dispatch(replaceXAxis({
        prev: prevSettingsRef.current,
        next: settings
      }));
    }
    prevSettingsRef.current = settings;
  }, [settings, dispatch]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevSettingsRef.current) {
        dispatch(removeXAxis(prevSettingsRef.current));
        prevSettingsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
var XAxisImpl = (props) => {
  var xAxisId = props.xAxisId, className = props.className, height = props.height, label = props.label;
  var cartesianAxisRef = reactExports.useRef(null);
  var labelRef = reactExports.useRef(null);
  var viewBox = useAppSelector(selectAxisViewBox);
  var isPanorama = useIsPanorama();
  var dispatch = useAppDispatch();
  var axisType = "xAxis";
  var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, xAxisId, isPanorama));
  var axisSize = useAppSelector((state) => selectXAxisSize(state, xAxisId));
  var position = useAppSelector((state) => selectXAxisPosition(state, xAxisId));
  var synchronizedSettings = useAppSelector((state) => selectXAxisSettingsNoDefaults(state, xAxisId));
  reactExports.useLayoutEffect(() => {
    if (height !== "auto" || !axisSize || isLabelContentAFunction(label) || /* @__PURE__ */ reactExports.isValidElement(label) || synchronizedSettings == null) {
      return;
    }
    var axisComponent = cartesianAxisRef.current;
    if (!axisComponent) {
      return;
    }
    var updatedXAxisHeight = axisComponent.getCalculatedHeight();
    if (Math.round(axisSize.height) !== Math.round(updatedXAxisHeight)) {
      dispatch(updateXAxisHeight({
        id: xAxisId,
        height: updatedXAxisHeight
      }));
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    cartesianTickItems,
    axisSize,
    dispatch,
    label,
    xAxisId,
    height,
    synchronizedSettings
  ]);
  if (axisSize == null || position == null || synchronizedSettings == null) {
    return null;
  }
  props.dangerouslySetInnerHTML;
  props.ticks;
  props.scale;
  var allOtherProps = _objectWithoutProperties$4(props, _excluded2$1);
  synchronizedSettings.id;
  synchronizedSettings.scale;
  var restSynchronizedSettings = _objectWithoutProperties$4(synchronizedSettings, _excluded3$1);
  return /* @__PURE__ */ reactExports.createElement(CartesianAxis, _extends$5({}, allOtherProps, restSynchronizedSettings, {
    ref: cartesianAxisRef,
    labelRef,
    x: position.x,
    y: position.y,
    width: axisSize.width,
    height: axisSize.height,
    className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
    viewBox,
    ticks: cartesianTickItems,
    axisType,
    axisId: xAxisId
  }));
};
var xAxisDefaultProps = {
  allowDataOverflow: implicitXAxis.allowDataOverflow,
  allowDecimals: implicitXAxis.allowDecimals,
  allowDuplicatedCategory: implicitXAxis.allowDuplicatedCategory,
  angle: implicitXAxis.angle,
  axisLine: defaultCartesianAxisProps.axisLine,
  height: implicitXAxis.height,
  hide: false,
  includeHidden: implicitXAxis.includeHidden,
  interval: implicitXAxis.interval,
  label: false,
  minTickGap: implicitXAxis.minTickGap,
  mirror: implicitXAxis.mirror,
  orientation: implicitXAxis.orientation,
  padding: implicitXAxis.padding,
  reversed: implicitXAxis.reversed,
  scale: implicitXAxis.scale,
  tick: implicitXAxis.tick,
  tickCount: implicitXAxis.tickCount,
  tickLine: defaultCartesianAxisProps.tickLine,
  tickSize: defaultCartesianAxisProps.tickSize,
  type: implicitXAxis.type,
  niceTicks: implicitXAxis.niceTicks,
  xAxisId: 0
};
var XAxisSettingsDispatcher = (outsideProps) => {
  var props = resolveDefaultProps(outsideProps, xAxisDefaultProps);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetXAxisSettings, {
    allowDataOverflow: props.allowDataOverflow,
    allowDecimals: props.allowDecimals,
    allowDuplicatedCategory: props.allowDuplicatedCategory,
    angle: props.angle,
    dataKey: props.dataKey,
    domain: props.domain,
    height: props.height,
    hide: props.hide,
    id: props.xAxisId,
    includeHidden: props.includeHidden,
    interval: props.interval,
    minTickGap: props.minTickGap,
    mirror: props.mirror,
    name: props.name,
    orientation: props.orientation,
    padding: props.padding,
    reversed: props.reversed,
    scale: props.scale,
    tick: props.tick,
    tickCount: props.tickCount,
    tickFormatter: props.tickFormatter,
    ticks: props.ticks,
    type: props.type,
    unit: props.unit,
    niceTicks: props.niceTicks
  }), /* @__PURE__ */ reactExports.createElement(XAxisImpl, props));
};
var XAxis = /* @__PURE__ */ reactExports.memo(XAxisSettingsDispatcher, axisPropsAreEqual);
XAxis.displayName = "XAxis";
var _excluded$3 = ["type"], _excluded2 = ["dangerouslySetInnerHTML", "ticks", "scale"], _excluded3 = ["id", "scale"];
function _extends$4() {
  return _extends$4 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$4.apply(null, arguments);
}
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$4(e, r, t) {
  return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$4(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$3(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$3(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$3(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function SetYAxisSettings(props) {
  var dispatch = useAppDispatch();
  var prevSettingsRef = reactExports.useRef(null);
  var layout = useCartesianChartLayout();
  var typeFromProps = props.type, restProps = _objectWithoutProperties$3(props, _excluded$3);
  var evaluatedType = getAxisTypeBasedOnLayout(layout, "yAxis", typeFromProps);
  var settings = reactExports.useMemo(() => {
    if (evaluatedType == null) {
      return void 0;
    }
    return _objectSpread$4(_objectSpread$4({}, restProps), {}, {
      type: evaluatedType
    });
  }, [evaluatedType, restProps]);
  reactExports.useLayoutEffect(() => {
    if (settings == null) {
      return;
    }
    if (prevSettingsRef.current === null) {
      dispatch(addYAxis(settings));
    } else if (prevSettingsRef.current !== settings) {
      dispatch(replaceYAxis({
        prev: prevSettingsRef.current,
        next: settings
      }));
    }
    prevSettingsRef.current = settings;
  }, [settings, dispatch]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevSettingsRef.current) {
        dispatch(removeYAxis(prevSettingsRef.current));
        prevSettingsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function YAxisImpl(props) {
  var yAxisId = props.yAxisId, className = props.className, width = props.width, label = props.label;
  var cartesianAxisRef = reactExports.useRef(null);
  var labelRef = reactExports.useRef(null);
  var viewBox = useAppSelector(selectAxisViewBox);
  var isPanorama = useIsPanorama();
  var dispatch = useAppDispatch();
  var axisType = "yAxis";
  var axisSize = useAppSelector((state) => selectYAxisSize(state, yAxisId));
  var position = useAppSelector((state) => selectYAxisPosition(state, yAxisId));
  var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, yAxisId, isPanorama));
  var synchronizedSettings = useAppSelector((state) => selectYAxisSettingsNoDefaults(state, yAxisId));
  reactExports.useLayoutEffect(() => {
    if (width !== "auto" || !axisSize || isLabelContentAFunction(label) || /* @__PURE__ */ reactExports.isValidElement(label) || synchronizedSettings == null) {
      return;
    }
    var axisComponent = cartesianAxisRef.current;
    if (!axisComponent) {
      return;
    }
    var updatedYAxisWidth = axisComponent.getCalculatedWidth();
    if (Math.round(axisSize.width) !== Math.round(updatedYAxisWidth)) {
      dispatch(updateYAxisWidth({
        id: yAxisId,
        width: updatedYAxisWidth
      }));
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    cartesianTickItems,
    axisSize,
    dispatch,
    label,
    yAxisId,
    width,
    synchronizedSettings
  ]);
  if (axisSize == null || position == null || synchronizedSettings == null) {
    return null;
  }
  props.dangerouslySetInnerHTML;
  props.ticks;
  props.scale;
  var allOtherProps = _objectWithoutProperties$3(props, _excluded2);
  synchronizedSettings.id;
  synchronizedSettings.scale;
  var restSynchronizedSettings = _objectWithoutProperties$3(synchronizedSettings, _excluded3);
  return /* @__PURE__ */ reactExports.createElement(CartesianAxis, _extends$4({}, allOtherProps, restSynchronizedSettings, {
    ref: cartesianAxisRef,
    labelRef,
    x: position.x,
    y: position.y,
    tickTextProps: width === "auto" ? {
      width: void 0
    } : {
      width
    },
    width: axisSize.width,
    height: axisSize.height,
    className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
    viewBox,
    ticks: cartesianTickItems,
    axisType,
    axisId: yAxisId
  }));
}
var yAxisDefaultProps = {
  allowDataOverflow: implicitYAxis.allowDataOverflow,
  allowDecimals: implicitYAxis.allowDecimals,
  allowDuplicatedCategory: implicitYAxis.allowDuplicatedCategory,
  angle: implicitYAxis.angle,
  axisLine: defaultCartesianAxisProps.axisLine,
  hide: false,
  includeHidden: implicitYAxis.includeHidden,
  interval: implicitYAxis.interval,
  label: false,
  minTickGap: implicitYAxis.minTickGap,
  mirror: implicitYAxis.mirror,
  orientation: implicitYAxis.orientation,
  padding: implicitYAxis.padding,
  reversed: implicitYAxis.reversed,
  scale: implicitYAxis.scale,
  tick: implicitYAxis.tick,
  tickCount: implicitYAxis.tickCount,
  tickLine: defaultCartesianAxisProps.tickLine,
  tickSize: defaultCartesianAxisProps.tickSize,
  type: implicitYAxis.type,
  niceTicks: implicitYAxis.niceTicks,
  width: implicitYAxis.width,
  yAxisId: 0
};
var YAxisSettingsDispatcher = (outsideProps) => {
  var props = resolveDefaultProps(outsideProps, yAxisDefaultProps);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetYAxisSettings, {
    interval: props.interval,
    id: props.yAxisId,
    scale: props.scale,
    type: props.type,
    domain: props.domain,
    allowDataOverflow: props.allowDataOverflow,
    dataKey: props.dataKey,
    allowDuplicatedCategory: props.allowDuplicatedCategory,
    allowDecimals: props.allowDecimals,
    tickCount: props.tickCount,
    padding: props.padding,
    includeHidden: props.includeHidden,
    reversed: props.reversed,
    ticks: props.ticks,
    width: props.width,
    orientation: props.orientation,
    mirror: props.mirror,
    hide: props.hide,
    unit: props.unit,
    name: props.name,
    angle: props.angle,
    minTickGap: props.minTickGap,
    tick: props.tick,
    tickFormatter: props.tickFormatter,
    niceTicks: props.niceTicks
  }), /* @__PURE__ */ reactExports.createElement(YAxisImpl, props));
};
var YAxis = /* @__PURE__ */ reactExports.memo(YAxisSettingsDispatcher, axisPropsAreEqual);
YAxis.displayName = "YAxis";
var pickChartPointer = (_state, chartPointer) => chartPointer;
var selectActivePropsFromChartPointer = createSelector([pickChartPointer, selectChartLayout, selectPolarViewBox, selectTooltipAxisType, selectTooltipAxisRangeWithReverse, selectTooltipAxisTicks, selectOrderedTooltipTicks, selectChartOffsetInternal], combineActiveProps);
function isSvgPointer(pointer) {
  return "getBBox" in pointer.currentTarget && typeof pointer.currentTarget.getBBox === "function";
}
function getRelativeCoordinate(event) {
  var rect = event.currentTarget.getBoundingClientRect();
  var scaleX, scaleY;
  if (isSvgPointer(event)) {
    var bbox = event.currentTarget.getBBox();
    scaleX = bbox.width > 0 ? rect.width / bbox.width : 1;
    scaleY = bbox.height > 0 ? rect.height / bbox.height : 1;
  } else {
    var element = event.currentTarget;
    scaleX = element.offsetWidth > 0 ? rect.width / element.offsetWidth : 1;
    scaleY = element.offsetHeight > 0 ? rect.height / element.offsetHeight : 1;
  }
  var getCoordinates = (clientX, clientY) => ({
    /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */
    relativeX: Math.round((clientX - rect.left) / scaleX),
    relativeY: Math.round((clientY - rect.top) / scaleY)
  });
  if ("touches" in event) {
    return Array.from(event.touches).map((touch) => getCoordinates(touch.clientX, touch.clientY));
  }
  return getCoordinates(event.clientX, event.clientY);
}
var mouseClickAction = createAction("mouseClick");
var mouseClickMiddleware = createListenerMiddleware();
mouseClickMiddleware.startListening({
  actionCreator: mouseClickAction,
  effect: (action, listenerApi) => {
    var mousePointer = action.payload;
    var activeProps = selectActivePropsFromChartPointer(listenerApi.getState(), getRelativeCoordinate(mousePointer));
    if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
      listenerApi.dispatch(setMouseClickAxisIndex({
        activeIndex: activeProps.activeIndex,
        activeDataKey: void 0,
        activeCoordinate: activeProps.activeCoordinate
      }));
    }
  }
});
var mouseMoveAction = createAction("mouseMove");
var mouseMoveMiddleware = createListenerMiddleware();
var rafId$2 = null;
var timeoutId$2 = null;
var latestChartPointer = null;
mouseMoveMiddleware.startListening({
  actionCreator: mouseMoveAction,
  effect: (action, listenerApi) => {
    var mousePointer = action.payload;
    var state = listenerApi.getState();
    var _state$eventSettings = state.eventSettings, throttleDelay = _state$eventSettings.throttleDelay, throttledEvents = _state$eventSettings.throttledEvents;
    var isThrottled = throttledEvents === "all" || (throttledEvents === null || throttledEvents === void 0 ? void 0 : throttledEvents.includes("mousemove"));
    if (rafId$2 !== null) {
      cancelAnimationFrame(rafId$2);
      rafId$2 = null;
    }
    if (timeoutId$2 !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(timeoutId$2);
      timeoutId$2 = null;
    }
    latestChartPointer = getRelativeCoordinate(mousePointer);
    var callback = () => {
      var currentState = listenerApi.getState();
      var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
      if (!latestChartPointer) {
        rafId$2 = null;
        timeoutId$2 = null;
        return;
      }
      if (tooltipEventType === "axis") {
        var activeProps = selectActivePropsFromChartPointer(currentState, latestChartPointer);
        if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
          listenerApi.dispatch(setMouseOverAxisIndex({
            activeIndex: activeProps.activeIndex,
            activeDataKey: void 0,
            activeCoordinate: activeProps.activeCoordinate
          }));
        } else {
          listenerApi.dispatch(mouseLeaveChart());
        }
      }
      rafId$2 = null;
      timeoutId$2 = null;
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      rafId$2 = requestAnimationFrame(callback);
    } else if (typeof throttleDelay === "number") {
      if (timeoutId$2 === null) {
        timeoutId$2 = setTimeout(callback, throttleDelay);
      }
    }
  }
});
function reduxDevtoolsJsonStringifyReplacer(key, value) {
  if (value instanceof HTMLElement) {
    return "HTMLElement <".concat(value.tagName, ' class="').concat(value.className, '">');
  }
  if (value === window) {
    return "global.window";
  }
  if (key === "children" && typeof value === "object" && value !== null) {
    return "<<CHILDREN>>";
  }
  return value;
}
var initialState$1 = {
  accessibilityLayer: true,
  barCategoryGap: "10%",
  barGap: 4,
  barSize: void 0,
  className: void 0,
  maxBarSize: void 0,
  stackOffset: "none",
  syncId: void 0,
  syncMethod: "index",
  baseValue: void 0,
  reverseStackOrder: false
};
var rootPropsSlice = createSlice({
  name: "rootProps",
  initialState: initialState$1,
  reducers: {
    updateOptions: (state, action) => {
      var _action$payload$barGa;
      state.accessibilityLayer = action.payload.accessibilityLayer;
      state.barCategoryGap = action.payload.barCategoryGap;
      state.barGap = (_action$payload$barGa = action.payload.barGap) !== null && _action$payload$barGa !== void 0 ? _action$payload$barGa : initialState$1.barGap;
      state.barSize = action.payload.barSize;
      state.maxBarSize = action.payload.maxBarSize;
      state.stackOffset = action.payload.stackOffset;
      state.syncId = action.payload.syncId;
      state.syncMethod = action.payload.syncMethod;
      state.className = action.payload.className;
      state.baseValue = action.payload.baseValue;
      state.reverseStackOrder = action.payload.reverseStackOrder;
    }
  }
});
var rootPropsReducer = rootPropsSlice.reducer;
var updateOptions = rootPropsSlice.actions.updateOptions;
var initialState = null;
var reducers = {
  updatePolarOptions: (state, action) => {
    if (state === null) {
      return action.payload;
    }
    state.startAngle = action.payload.startAngle;
    state.endAngle = action.payload.endAngle;
    state.cx = action.payload.cx;
    state.cy = action.payload.cy;
    state.innerRadius = action.payload.innerRadius;
    state.outerRadius = action.payload.outerRadius;
    return state;
  }
};
var polarOptionsSlice = createSlice({
  name: "polarOptions",
  initialState,
  reducers
});
var updatePolarOptions = polarOptionsSlice.actions.updatePolarOptions;
var polarOptionsReducer = polarOptionsSlice.reducer;
var keyDownAction = createAction("keyDown");
var focusAction = createAction("focus");
var blurAction = createAction("blur");
var keyboardEventsMiddleware = createListenerMiddleware();
var rafId$1 = null;
var timeoutId$1 = null;
var latestKeyboardActionPayload = null;
keyboardEventsMiddleware.startListening({
  actionCreator: keyDownAction,
  effect: (action, listenerApi) => {
    latestKeyboardActionPayload = action.payload;
    if (rafId$1 !== null) {
      cancelAnimationFrame(rafId$1);
      rafId$1 = null;
    }
    var state = listenerApi.getState();
    var _state$eventSettings = state.eventSettings, throttleDelay = _state$eventSettings.throttleDelay, throttledEvents = _state$eventSettings.throttledEvents;
    var isThrottled = throttledEvents === "all" || throttledEvents.includes("keydown");
    if (timeoutId$1 !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(timeoutId$1);
      timeoutId$1 = null;
    }
    var callback = () => {
      try {
        var currentState = listenerApi.getState();
        var accessibilityLayerIsActive = currentState.rootProps.accessibilityLayer !== false;
        if (!accessibilityLayerIsActive) {
          return;
        }
        var keyboardInteraction = currentState.tooltip.keyboardInteraction;
        var key = latestKeyboardActionPayload;
        if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Enter") {
          return;
        }
        var resolvedIndex = combineActiveTooltipIndex(keyboardInteraction, selectTooltipDisplayedData(currentState), selectTooltipAxisDataKey(currentState), selectTooltipAxisDomain(currentState));
        var currentIndex = resolvedIndex == null ? -1 : Number(resolvedIndex);
        var isOutsideDomain = !Number.isFinite(currentIndex) || currentIndex < 0;
        var tooltipTicks = selectTooltipAxisTicks(currentState);
        var displayedData = selectTooltipDisplayedData(currentState);
        var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
        if (key === "Enter") {
          if (isOutsideDomain) {
            return;
          }
          var _coordinate = selectCoordinateForDefaultIndex(currentState, tooltipEventType, "hover", String(keyboardInteraction.index));
          listenerApi.dispatch(setKeyboardInteraction({
            active: !keyboardInteraction.active,
            activeIndex: keyboardInteraction.index,
            activeCoordinate: _coordinate
          }));
          return;
        }
        var direction = selectChartDirection(currentState);
        var directionMultiplier = direction === "left-to-right" ? 1 : -1;
        var movement = key === "ArrowRight" ? 1 : -1;
        var nextIndex;
        if (isOutsideDomain) {
          var axisDataKey = selectTooltipAxisDataKey(currentState);
          var domain = selectTooltipAxisDomain(currentState);
          var effectiveMovement = movement * directionMultiplier;
          var mkInteraction = (i2) => ({
            active: false,
            index: String(i2),
            dataKey: void 0,
            graphicalItemId: void 0,
            coordinate: void 0
          });
          nextIndex = -1;
          if (effectiveMovement > 0) {
            for (var i = 0; i < displayedData.length; i++) {
              if (combineActiveTooltipIndex(mkInteraction(i), displayedData, axisDataKey, domain) != null) {
                nextIndex = i;
                break;
              }
            }
          } else {
            for (var _i = displayedData.length - 1; _i >= 0; _i--) {
              if (combineActiveTooltipIndex(mkInteraction(_i), displayedData, axisDataKey, domain) != null) {
                nextIndex = _i;
                break;
              }
            }
          }
          if (nextIndex < 0) {
            return;
          }
        } else {
          nextIndex = currentIndex + movement * directionMultiplier;
          var dataLength = (tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks.length) || displayedData.length;
          if (dataLength === 0 || nextIndex >= dataLength || nextIndex < 0) {
            return;
          }
        }
        var coordinate = selectCoordinateForDefaultIndex(currentState, tooltipEventType, "hover", String(nextIndex));
        listenerApi.dispatch(setKeyboardInteraction({
          active: true,
          activeIndex: nextIndex.toString(),
          activeCoordinate: coordinate
        }));
      } finally {
        rafId$1 = null;
        timeoutId$1 = null;
      }
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      rafId$1 = requestAnimationFrame(callback);
    } else if (typeof throttleDelay === "number") {
      if (timeoutId$1 === null) {
        callback();
        latestKeyboardActionPayload = null;
        timeoutId$1 = setTimeout(() => {
          if (latestKeyboardActionPayload) {
            callback();
          } else {
            timeoutId$1 = null;
            rafId$1 = null;
          }
        }, throttleDelay);
      }
    }
  }
});
keyboardEventsMiddleware.startListening({
  actionCreator: focusAction,
  effect: (_action, listenerApi) => {
    var state = listenerApi.getState();
    var accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false;
    if (!accessibilityLayerIsActive) {
      return;
    }
    var keyboardInteraction = state.tooltip.keyboardInteraction;
    if (keyboardInteraction.active) {
      return;
    }
    if (keyboardInteraction.index == null) {
      var nextIndex = "0";
      var tooltipEventType = selectTooltipEventType$1(state, state.tooltip.settings.shared);
      var coordinate = selectCoordinateForDefaultIndex(state, tooltipEventType, "hover", String(nextIndex));
      listenerApi.dispatch(setKeyboardInteraction({
        active: true,
        activeIndex: nextIndex,
        activeCoordinate: coordinate
      }));
    }
  }
});
keyboardEventsMiddleware.startListening({
  actionCreator: blurAction,
  effect: (_action, listenerApi) => {
    var state = listenerApi.getState();
    var accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false;
    if (!accessibilityLayerIsActive) {
      return;
    }
    var keyboardInteraction = state.tooltip.keyboardInteraction;
    if (keyboardInteraction.active) {
      listenerApi.dispatch(setKeyboardInteraction({
        active: false,
        activeIndex: keyboardInteraction.index,
        activeCoordinate: keyboardInteraction.coordinate
      }));
    }
  }
});
function createEventProxy(reactEvent) {
  reactEvent.persist();
  var currentTarget = reactEvent.currentTarget;
  return new Proxy(reactEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return currentTarget;
      }
      var value = Reflect.get(target, prop);
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  });
}
var externalEventAction = createAction("externalEvent");
var externalEventsMiddleware = createListenerMiddleware();
var rafIdMap = /* @__PURE__ */ new Map();
var timeoutIdMap = /* @__PURE__ */ new Map();
var latestEventMap = /* @__PURE__ */ new Map();
externalEventsMiddleware.startListening({
  actionCreator: externalEventAction,
  effect: (action, listenerApi) => {
    var _action$payload = action.payload, handler = _action$payload.handler, reactEvent = _action$payload.reactEvent;
    if (handler == null) {
      return;
    }
    var eventType = reactEvent.type;
    var eventProxy = createEventProxy(reactEvent);
    latestEventMap.set(eventType, {
      handler,
      reactEvent: eventProxy
    });
    var existingRafId = rafIdMap.get(eventType);
    if (existingRafId !== void 0) {
      cancelAnimationFrame(existingRafId);
      rafIdMap.delete(eventType);
    }
    var state = listenerApi.getState();
    var _state$eventSettings = state.eventSettings, throttleDelay = _state$eventSettings.throttleDelay, throttledEvents = _state$eventSettings.throttledEvents;
    var eventListAsString = throttledEvents;
    var isThrottled = eventListAsString === "all" || (eventListAsString === null || eventListAsString === void 0 ? void 0 : eventListAsString.includes(eventType));
    var existingTimeoutId = timeoutIdMap.get(eventType);
    if (existingTimeoutId !== void 0 && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(existingTimeoutId);
      timeoutIdMap.delete(eventType);
    }
    var callback = () => {
      var latestAction = latestEventMap.get(eventType);
      try {
        if (!latestAction) {
          return;
        }
        var latestHandler = latestAction.handler, latestEvent = latestAction.reactEvent;
        var currentState = listenerApi.getState();
        var nextState = {
          activeCoordinate: selectActiveTooltipCoordinate(currentState),
          activeDataKey: selectActiveTooltipDataKey(currentState),
          activeIndex: selectActiveTooltipIndex(currentState),
          activeLabel: selectActiveLabel$1(currentState),
          activeTooltipIndex: selectActiveTooltipIndex(currentState),
          isTooltipActive: selectIsTooltipActive$1(currentState)
        };
        if (latestHandler) {
          latestHandler(nextState, latestEvent);
        }
      } finally {
        rafIdMap.delete(eventType);
        timeoutIdMap.delete(eventType);
        latestEventMap.delete(eventType);
      }
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      var rafId2 = requestAnimationFrame(callback);
      rafIdMap.set(eventType, rafId2);
    } else if (typeof throttleDelay === "number") {
      if (!timeoutIdMap.has(eventType)) {
        callback();
        var timeoutId2 = setTimeout(callback, throttleDelay);
        timeoutIdMap.set(eventType, timeoutId2);
      }
    } else {
      callback();
    }
  }
});
var selectAllTooltipPayloadConfiguration = createSelector([selectTooltipState], (tooltipState) => tooltipState.tooltipItemPayloads);
var selectTooltipCoordinate = createSelector([selectAllTooltipPayloadConfiguration, (_state, tooltipIndex) => tooltipIndex, (_state, _tooltipIndex, graphicalItemId) => graphicalItemId], (allTooltipConfigurations, tooltipIndex, graphicalItemId) => {
  if (tooltipIndex == null) {
    return void 0;
  }
  var mostRelevantTooltipConfiguration = allTooltipConfigurations.find((tooltipConfiguration) => {
    return tooltipConfiguration.settings.graphicalItemId === graphicalItemId;
  });
  if (mostRelevantTooltipConfiguration == null) {
    return void 0;
  }
  var getPosition = mostRelevantTooltipConfiguration.getPosition;
  if (getPosition == null) {
    return void 0;
  }
  return getPosition(tooltipIndex);
});
var touchEventAction = createAction("touchMove");
var touchEventMiddleware = createListenerMiddleware();
var rafId = null;
var timeoutId = null;
var latestChartPointers = null;
var latestTouchEvent = null;
touchEventMiddleware.startListening({
  actionCreator: touchEventAction,
  effect: (action, listenerApi) => {
    var touchEvent = action.payload;
    if (touchEvent.touches == null || touchEvent.touches.length === 0) {
      return;
    }
    latestTouchEvent = createEventProxy(touchEvent);
    var state = listenerApi.getState();
    var _state$eventSettings = state.eventSettings, throttleDelay = _state$eventSettings.throttleDelay, throttledEvents = _state$eventSettings.throttledEvents;
    var isThrottled = throttledEvents === "all" || throttledEvents.includes("touchmove");
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (timeoutId !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    latestChartPointers = Array.from(touchEvent.touches).map((touch) => getRelativeCoordinate({
      clientX: touch.clientX,
      clientY: touch.clientY,
      currentTarget: touchEvent.currentTarget
    }));
    var callback = () => {
      if (latestTouchEvent == null) {
        return;
      }
      var currentState = listenerApi.getState();
      var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
      if (tooltipEventType === "axis") {
        var _latestChartPointers;
        var latestTouchPointer = (_latestChartPointers = latestChartPointers) === null || _latestChartPointers === void 0 ? void 0 : _latestChartPointers[0];
        if (latestTouchPointer == null) {
          rafId = null;
          timeoutId = null;
          return;
        }
        var activeProps = selectActivePropsFromChartPointer(currentState, latestTouchPointer);
        if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
          listenerApi.dispatch(setMouseOverAxisIndex({
            activeIndex: activeProps.activeIndex,
            activeDataKey: void 0,
            activeCoordinate: activeProps.activeCoordinate
          }));
        }
      } else if (tooltipEventType === "item") {
        var _target$getAttribute;
        var touch = latestTouchEvent.touches[0];
        if (document.elementFromPoint == null || touch == null) {
          return;
        }
        var target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!target || !target.getAttribute) {
          return;
        }
        var itemIndex = target.getAttribute(DATA_ITEM_INDEX_ATTRIBUTE_NAME);
        var graphicalItemId = (_target$getAttribute = target.getAttribute(DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME)) !== null && _target$getAttribute !== void 0 ? _target$getAttribute : void 0;
        var settings = selectAllGraphicalItemsSettings(currentState).find((item) => item.id === graphicalItemId);
        if (itemIndex == null || settings == null || graphicalItemId == null) {
          return;
        }
        var dataKey = settings.dataKey;
        var coordinate = selectTooltipCoordinate(currentState, itemIndex, graphicalItemId);
        listenerApi.dispatch(setActiveMouseOverItemIndex({
          activeDataKey: dataKey,
          activeIndex: itemIndex,
          activeCoordinate: coordinate,
          activeGraphicalItemId: graphicalItemId
        }));
      }
      rafId = null;
      timeoutId = null;
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      rafId = requestAnimationFrame(callback);
    } else if (typeof throttleDelay === "number") {
      if (timeoutId === null) {
        callback();
        latestTouchEvent = null;
        timeoutId = setTimeout(() => {
          if (latestTouchEvent) {
            callback();
          } else {
            timeoutId = null;
            rafId = null;
          }
        }, throttleDelay);
      }
    }
  }
});
var initialEventSettingsState = {
  throttleDelay: "raf",
  throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"]
};
var eventSettingsSlice = createSlice({
  name: "eventSettings",
  initialState: initialEventSettingsState,
  reducers: {
    setEventSettings: (state, action) => {
      if (action.payload.throttleDelay != null) {
        state.throttleDelay = action.payload.throttleDelay;
      }
      if (action.payload.throttledEvents != null) {
        state.throttledEvents = castDraft(action.payload.throttledEvents);
      }
    }
  }
});
var setEventSettings = eventSettingsSlice.actions.setEventSettings;
var eventSettingsReducer = eventSettingsSlice.reducer;
var rootReducer = combineReducers({
  brush: brushReducer,
  cartesianAxis: cartesianAxisReducer,
  chartData: chartDataReducer,
  errorBars: errorBarReducer,
  eventSettings: eventSettingsReducer,
  graphicalItems: graphicalItemsReducer,
  layout: chartLayoutReducer,
  legend: legendReducer,
  options: optionsReducer,
  polarAxis: polarAxisReducer,
  polarOptions: polarOptionsReducer,
  referenceElements: referenceElementsReducer,
  renderedTicks: renderedTicksReducer,
  rootProps: rootPropsReducer,
  tooltip: tooltipReducer,
  zIndex: zIndexReducer
});
var createRechartsStore = function createRechartsStore2(preloadedState) {
  var chartName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return configureStore({
    reducer: rootReducer,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (getDefaultMiddleware) => {
      var _process$env$NODE_ENV;
      return getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: !["commonjs", "es6", "production"].includes((_process$env$NODE_ENV = "es6") !== null && _process$env$NODE_ENV !== void 0 ? _process$env$NODE_ENV : "")
      }).concat([mouseClickMiddleware.middleware, mouseMoveMiddleware.middleware, keyboardEventsMiddleware.middleware, externalEventsMiddleware.middleware, touchEventMiddleware.middleware]);
    },
    /*
     * I can't find out how to satisfy typescript here.
     * We return `EnhancerArray<[StoreEnhancer<{}, {}>, StoreEnhancer]>` from this function,
     * but the types say we should return `EnhancerArray<StoreEnhancer<{}, {}>`.
     * Looks like it's badly inferred generics, but it won't allow me to provide the correct type manually either.
     * So let's just ignore the error for now.
     */
    // @ts-expect-error mismatched generics
    enhancers: (getDefaultEnhancers) => {
      var enhancers = getDefaultEnhancers;
      if (typeof getDefaultEnhancers === "function") {
        enhancers = getDefaultEnhancers();
      }
      return enhancers.concat(autoBatchEnhancer({
        type: "raf"
      }));
    },
    devTools: {
      serialize: {
        replacer: reduxDevtoolsJsonStringifyReplacer
      },
      name: "recharts-".concat(chartName)
    }
  });
};
function RechartsStoreProvider(_ref2) {
  var preloadedState = _ref2.preloadedState, children = _ref2.children, reduxStoreName = _ref2.reduxStoreName;
  var isPanorama = useIsPanorama();
  var storeRef = reactExports.useRef(null);
  if (isPanorama) {
    return children;
  }
  if (storeRef.current == null) {
    storeRef.current = createRechartsStore(preloadedState, reduxStoreName);
  }
  var nonNullContext = RechartsReduxContext;
  return /* @__PURE__ */ reactExports.createElement(Provider_default, {
    context: nonNullContext,
    store: storeRef.current
  }, children);
}
function ReportMainChartPropsImpl(_ref2) {
  var layout = _ref2.layout, margin = _ref2.margin;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  reactExports.useEffect(() => {
    if (!isPanorama) {
      dispatch(setLayout(layout));
      dispatch(setMargin(margin));
    }
  }, [dispatch, isPanorama, layout, margin]);
  return null;
}
var ReportMainChartProps = /* @__PURE__ */ reactExports.memo(ReportMainChartPropsImpl, propsAreEqual);
function ReportChartProps(props) {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(updateOptions(props));
  }, [dispatch, props]);
  return null;
}
var ReportEventSettingsImpl = (props) => {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(setEventSettings(props));
  }, [dispatch, props]);
  return null;
};
var ReportEventSettings = /* @__PURE__ */ reactExports.memo(ReportEventSettingsImpl, propsAreEqual);
function ZIndexSvgPortal(_ref2) {
  var zIndex = _ref2.zIndex, isPanorama = _ref2.isPanorama;
  var ref = reactExports.useRef(null);
  var dispatch = useAppDispatch();
  reactExports.useLayoutEffect(() => {
    if (ref.current) {
      dispatch(registerZIndexPortalElement({
        zIndex,
        element: ref.current,
        isPanorama
      }));
    }
    return () => {
      dispatch(unregisterZIndexPortalElement({
        zIndex,
        isPanorama
      }));
    };
  }, [dispatch, zIndex, isPanorama]);
  return /* @__PURE__ */ reactExports.createElement("g", {
    tabIndex: -1,
    ref,
    className: "recharts-zIndex-layer_".concat(zIndex)
  });
}
function AllZIndexPortals(_ref2) {
  var children = _ref2.children, isPanorama = _ref2.isPanorama;
  var allRegisteredZIndexes = useAppSelector(selectAllRegisteredZIndexes);
  if (!allRegisteredZIndexes || allRegisteredZIndexes.length === 0) {
    return children;
  }
  var allNegativeZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex < 0);
  var allPositiveZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex > 0);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, allNegativeZIndexes.map((zIndex) => /* @__PURE__ */ reactExports.createElement(ZIndexSvgPortal, {
    key: zIndex,
    zIndex,
    isPanorama
  })), children, allPositiveZIndexes.map((zIndex) => /* @__PURE__ */ reactExports.createElement(ZIndexSvgPortal, {
    key: zIndex,
    zIndex,
    isPanorama
  })));
}
var _excluded$2 = ["children"];
function _objectWithoutProperties$2(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$2(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$2(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _extends$3() {
  return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$3.apply(null, arguments);
}
var FULL_WIDTH_AND_HEIGHT = {
  width: "100%",
  height: "100%",
  /*
   * display: block is necessary here because the default for an SVG is display: inline,
   * which in some browsers (Chrome) adds a little bit of extra space above and below the SVG
   * to make space for the descender of letters like "g" and "y". This throws off the height calculation
   * and causes the container to grow indefinitely on each render with responsive=true.
   * Display: block removes that extra space.
   *
   * Interestingly, Firefox does not have this problem, but it doesn't hurt to add the style anyway.
   */
  display: "block"
};
var MainChartSurface = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = useChartWidth();
  var height = useChartHeight();
  var hasAccessibilityLayer = useAccessibilityLayer();
  if (!isPositiveNumber(width) || !isPositiveNumber(height)) {
    return null;
  }
  var children = props.children, otherAttributes = props.otherAttributes, title = props.title, desc = props.desc;
  var tabIndex, role;
  if (otherAttributes != null) {
    if (typeof otherAttributes.tabIndex === "number") {
      tabIndex = otherAttributes.tabIndex;
    } else {
      tabIndex = hasAccessibilityLayer ? 0 : void 0;
    }
    if (typeof otherAttributes.role === "string") {
      role = otherAttributes.role;
    } else {
      role = hasAccessibilityLayer ? "application" : void 0;
    }
  }
  return /* @__PURE__ */ reactExports.createElement(Surface, _extends$3({}, otherAttributes, {
    title,
    desc,
    role,
    tabIndex,
    width,
    height,
    style: FULL_WIDTH_AND_HEIGHT,
    ref
  }), children);
});
var BrushPanoramaSurface = (_ref2) => {
  var children = _ref2.children;
  var brushDimensions = useAppSelector(selectBrushDimensions);
  if (!brushDimensions) {
    return null;
  }
  var width = brushDimensions.width, height = brushDimensions.height, y2 = brushDimensions.y, x2 = brushDimensions.x;
  return /* @__PURE__ */ reactExports.createElement(Surface, {
    width,
    height,
    x: x2,
    y: y2
  }, children);
};
var RootSurface = /* @__PURE__ */ reactExports.forwardRef((_ref2, ref) => {
  var children = _ref2.children, rest = _objectWithoutProperties$2(_ref2, _excluded$2);
  var isPanorama = useIsPanorama();
  if (isPanorama) {
    return /* @__PURE__ */ reactExports.createElement(BrushPanoramaSurface, null, /* @__PURE__ */ reactExports.createElement(AllZIndexPortals, {
      isPanorama: true
    }, children));
  }
  return /* @__PURE__ */ reactExports.createElement(MainChartSurface, _extends$3({
    ref
  }, rest), /* @__PURE__ */ reactExports.createElement(AllZIndexPortals, {
    isPanorama: false
  }, children));
});
function _slicedToArray$1(r, e) {
  return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a2) : void 0;
  }
}
function _arrayLikeToArray$1(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$1(r) {
  if (Array.isArray(r)) return r;
}
function useReportScale() {
  var dispatch = useAppDispatch();
  var _useState = reactExports.useState(null), _useState2 = _slicedToArray$1(_useState, 2), ref = _useState2[0], setRef = _useState2[1];
  var scale = useAppSelector(selectContainerScale);
  reactExports.useEffect(() => {
    if (ref == null) {
      return;
    }
    var rect = ref.getBoundingClientRect();
    var newScale = rect.width / ref.offsetWidth;
    if (isWellBehavedNumber(newScale) && newScale !== scale) {
      dispatch(setScale(newScale));
    }
  }, [ref, dispatch, scale]);
  return setRef;
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(e, r, t) {
  return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$2() {
  return _extends$2 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$2.apply(null, arguments);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
  }
}
function _arrayLikeToArray(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a2 = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
var EventSynchronizer = () => {
  useSynchronisedEventsFromOtherCharts();
  return null;
};
function getNumberOrZero(value) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    var parsed = parseFloat(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return 0;
}
var ResponsiveDiv = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _props$style, _props$style2;
  var observerRef = reactExports.useRef(null);
  var _useState = reactExports.useState({
    containerWidth: getNumberOrZero((_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.width),
    containerHeight: getNumberOrZero((_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.height)
  }), _useState2 = _slicedToArray(_useState, 2), sizes = _useState2[0], setSizes = _useState2[1];
  var setContainerSize = reactExports.useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  var innerRef = reactExports.useCallback((node) => {
    if (typeof ref === "function") {
      ref(node);
    }
    if (observerRef.current != null) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (node != null && typeof ResizeObserver !== "undefined") {
      var _node$getBoundingClie = node.getBoundingClientRect(), containerWidth = _node$getBoundingClie.width, containerHeight = _node$getBoundingClie.height;
      setContainerSize(containerWidth, containerHeight);
      var callback = (entries) => {
        var entry = entries[0];
        if (entry == null) {
          return;
        }
        var _entry$contentRect = entry.contentRect, width = _entry$contentRect.width, height = _entry$contentRect.height;
        setContainerSize(width, height);
      };
      var observer = new ResizeObserver(callback);
      observer.observe(node);
      observerRef.current = observer;
    }
  }, [ref, setContainerSize]);
  reactExports.useEffect(() => {
    return () => {
      var observer = observerRef.current;
      if (observer != null) {
        observer.disconnect();
      }
    };
  }, [setContainerSize]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
    width: sizes.containerWidth,
    height: sizes.containerHeight
  }), /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref: innerRef
  }, props)));
});
var ReadSizeOnceDiv = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = props.width, height = props.height;
  var _useState3 = reactExports.useState({
    containerWidth: getNumberOrZero(width),
    containerHeight: getNumberOrZero(height)
  }), _useState4 = _slicedToArray(_useState3, 2), sizes = _useState4[0], setSizes = _useState4[1];
  var setContainerSize = reactExports.useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  var innerRef = reactExports.useCallback((node) => {
    if (typeof ref === "function") {
      ref(node);
    }
    if (node != null) {
      var _node$getBoundingClie2 = node.getBoundingClientRect(), containerWidth = _node$getBoundingClie2.width, containerHeight = _node$getBoundingClie2.height;
      setContainerSize(containerWidth, containerHeight);
    }
  }, [ref, setContainerSize]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
    width: sizes.containerWidth,
    height: sizes.containerHeight
  }), /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref: innerRef
  }, props)));
});
var StaticDiv = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = props.width, height = props.height;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
    width,
    height
  }), /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref
  }, props)));
});
var NonResponsiveDiv = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = props.width, height = props.height;
  if (typeof width === "string" || typeof height === "string") {
    return /* @__PURE__ */ reactExports.createElement(ReadSizeOnceDiv, _extends$2({}, props, {
      ref
    }));
  }
  if (typeof width === "number" && typeof height === "number") {
    return /* @__PURE__ */ reactExports.createElement(StaticDiv, _extends$2({}, props, {
      width,
      height,
      ref
    }));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
    width,
    height
  }), /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref
  }, props)));
});
function getWrapperDivComponent(responsive) {
  return responsive ? ResponsiveDiv : NonResponsiveDiv;
}
var RechartsWrapper = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var children = props.children, className = props.className, heightFromProps = props.height, onClick = props.onClick, onContextMenu = props.onContextMenu, onDoubleClick = props.onDoubleClick, onMouseDown = props.onMouseDown, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave, onMouseMove = props.onMouseMove, onMouseUp = props.onMouseUp, onTouchEnd = props.onTouchEnd, onTouchMove = props.onTouchMove, onTouchStart = props.onTouchStart, style = props.style, widthFromProps = props.width, responsive = props.responsive, _props$dispatchTouchE = props.dispatchTouchEvents, dispatchTouchEvents = _props$dispatchTouchE === void 0 ? true : _props$dispatchTouchE;
  var containerRef = reactExports.useRef(null);
  var dispatch = useAppDispatch();
  var _useState5 = reactExports.useState(null), _useState6 = _slicedToArray(_useState5, 2), tooltipPortal = _useState6[0], setTooltipPortal = _useState6[1];
  var _useState7 = reactExports.useState(null), _useState8 = _slicedToArray(_useState7, 2), legendPortal = _useState8[0], setLegendPortal = _useState8[1];
  var setScaleRef = useReportScale();
  var responsiveContainerCalculations = useResponsiveContainerContext();
  var width = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.width) > 0 ? responsiveContainerCalculations.width : widthFromProps;
  var height = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.height) > 0 ? responsiveContainerCalculations.height : heightFromProps;
  var innerRef = reactExports.useCallback((node) => {
    setScaleRef(node);
    if (typeof ref === "function") {
      ref(node);
    }
    setTooltipPortal(node);
    setLegendPortal(node);
    if (node != null) {
      containerRef.current = node;
    }
  }, [setScaleRef, ref, setTooltipPortal, setLegendPortal]);
  var myOnClick = reactExports.useCallback((e) => {
    dispatch(mouseClickAction(e));
    dispatch(externalEventAction({
      handler: onClick,
      reactEvent: e
    }));
  }, [dispatch, onClick]);
  var myOnMouseEnter = reactExports.useCallback((e) => {
    dispatch(mouseMoveAction(e));
    dispatch(externalEventAction({
      handler: onMouseEnter,
      reactEvent: e
    }));
  }, [dispatch, onMouseEnter]);
  var myOnMouseLeave = reactExports.useCallback((e) => {
    dispatch(mouseLeaveChart());
    dispatch(externalEventAction({
      handler: onMouseLeave,
      reactEvent: e
    }));
  }, [dispatch, onMouseLeave]);
  var myOnMouseMove = reactExports.useCallback((e) => {
    dispatch(mouseMoveAction(e));
    dispatch(externalEventAction({
      handler: onMouseMove,
      reactEvent: e
    }));
  }, [dispatch, onMouseMove]);
  var onFocus = reactExports.useCallback(() => {
    dispatch(focusAction());
  }, [dispatch]);
  var onBlur = reactExports.useCallback(() => {
    dispatch(blurAction());
  }, [dispatch]);
  var onKeyDown = reactExports.useCallback((e) => {
    dispatch(keyDownAction(e.key));
  }, [dispatch]);
  var myOnContextMenu = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onContextMenu,
      reactEvent: e
    }));
  }, [dispatch, onContextMenu]);
  var myOnDoubleClick = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onDoubleClick,
      reactEvent: e
    }));
  }, [dispatch, onDoubleClick]);
  var myOnMouseDown = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onMouseDown,
      reactEvent: e
    }));
  }, [dispatch, onMouseDown]);
  var myOnMouseUp = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onMouseUp,
      reactEvent: e
    }));
  }, [dispatch, onMouseUp]);
  var myOnTouchStart = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onTouchStart,
      reactEvent: e
    }));
  }, [dispatch, onTouchStart]);
  var myOnTouchMove = reactExports.useCallback((e) => {
    if (dispatchTouchEvents) {
      dispatch(touchEventAction(e));
    }
    dispatch(externalEventAction({
      handler: onTouchMove,
      reactEvent: e
    }));
  }, [dispatch, dispatchTouchEvents, onTouchMove]);
  var myOnTouchEnd = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onTouchEnd,
      reactEvent: e
    }));
  }, [dispatch, onTouchEnd]);
  var WrapperDiv = getWrapperDivComponent(responsive);
  return /* @__PURE__ */ reactExports.createElement(TooltipPortalContext.Provider, {
    value: tooltipPortal
  }, /* @__PURE__ */ reactExports.createElement(LegendPortalContext.Provider, {
    value: legendPortal
  }, /* @__PURE__ */ reactExports.createElement(WrapperDiv, {
    width: width !== null && width !== void 0 ? width : style === null || style === void 0 ? void 0 : style.width,
    height: height !== null && height !== void 0 ? height : style === null || style === void 0 ? void 0 : style.height,
    className: clsx("recharts-wrapper", className),
    style: _objectSpread$3({
      position: "relative",
      cursor: "default",
      width,
      height
    }, style),
    onClick: myOnClick,
    onContextMenu: myOnContextMenu,
    onDoubleClick: myOnDoubleClick,
    onFocus,
    onBlur,
    onKeyDown,
    onMouseDown: myOnMouseDown,
    onMouseEnter: myOnMouseEnter,
    onMouseLeave: myOnMouseLeave,
    onMouseMove: myOnMouseMove,
    onMouseUp: myOnMouseUp,
    onTouchEnd: myOnTouchEnd,
    onTouchMove: myOnTouchMove,
    onTouchStart: myOnTouchStart,
    ref: innerRef
  }, /* @__PURE__ */ reactExports.createElement(EventSynchronizer, null), children)));
});
var _excluded$1 = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function _objectWithoutProperties$1(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$1(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$1(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var CategoricalChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = props.width, height = props.height, responsive = props.responsive, children = props.children, className = props.className, style = props.style, compact = props.compact, title = props.title, desc = props.desc, others = _objectWithoutProperties$1(props, _excluded$1);
  var attrs = svgPropertiesNoEvents(others);
  if (compact) {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
      width,
      height
    }), /* @__PURE__ */ reactExports.createElement(RootSurface, {
      otherAttributes: attrs,
      title,
      desc
    }, children));
  }
  return /* @__PURE__ */ reactExports.createElement(RechartsWrapper, {
    className,
    style,
    width,
    height,
    responsive: responsive !== null && responsive !== void 0 ? responsive : false,
    onClick: props.onClick,
    onMouseLeave: props.onMouseLeave,
    onMouseEnter: props.onMouseEnter,
    onMouseMove: props.onMouseMove,
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
    onContextMenu: props.onContextMenu,
    onDoubleClick: props.onDoubleClick,
    onTouchStart: props.onTouchStart,
    onTouchMove: props.onTouchMove,
    onTouchEnd: props.onTouchEnd
  }, /* @__PURE__ */ reactExports.createElement(RootSurface, {
    otherAttributes: attrs,
    title,
    desc,
    ref
  }, /* @__PURE__ */ reactExports.createElement(ClipPathProvider, null, children)));
});
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$1.apply(null, arguments);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(e, r, t) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultMargin$1 = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
};
var defaultCartesianChartProps = _objectSpread$2({
  accessibilityLayer: true,
  barCategoryGap: "10%",
  barGap: 4,
  layout: "horizontal",
  margin: defaultMargin$1,
  responsive: false,
  reverseStackOrder: false,
  stackOffset: "none",
  syncMethod: "index"
}, initialEventSettingsState);
var CartesianChart = /* @__PURE__ */ reactExports.forwardRef(function CartesianChart2(props, ref) {
  var _categoricalChartProp;
  var rootChartProps = resolveDefaultProps(props.categoricalChartProps, defaultCartesianChartProps);
  var chartName = props.chartName, defaultTooltipEventType = props.defaultTooltipEventType, validateTooltipEventTypes = props.validateTooltipEventTypes, tooltipPayloadSearcher = props.tooltipPayloadSearcher, categoricalChartProps = props.categoricalChartProps;
  var options = {
    chartName,
    defaultTooltipEventType,
    validateTooltipEventTypes,
    tooltipPayloadSearcher,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ reactExports.createElement(RechartsStoreProvider, {
    preloadedState: {
      options
    },
    reduxStoreName: (_categoricalChartProp = categoricalChartProps.id) !== null && _categoricalChartProp !== void 0 ? _categoricalChartProp : chartName
  }, /* @__PURE__ */ reactExports.createElement(ChartDataContextProvider, {
    chartData: categoricalChartProps.data
  }), /* @__PURE__ */ reactExports.createElement(ReportMainChartProps, {
    layout: rootChartProps.layout,
    margin: rootChartProps.margin
  }), /* @__PURE__ */ reactExports.createElement(ReportEventSettings, {
    throttleDelay: rootChartProps.throttleDelay,
    throttledEvents: rootChartProps.throttledEvents
  }), /* @__PURE__ */ reactExports.createElement(ReportChartProps, {
    baseValue: rootChartProps.baseValue,
    accessibilityLayer: rootChartProps.accessibilityLayer,
    barCategoryGap: rootChartProps.barCategoryGap,
    maxBarSize: rootChartProps.maxBarSize,
    stackOffset: rootChartProps.stackOffset,
    barGap: rootChartProps.barGap,
    barSize: rootChartProps.barSize,
    syncId: rootChartProps.syncId,
    syncMethod: rootChartProps.syncMethod,
    className: rootChartProps.className,
    reverseStackOrder: rootChartProps.reverseStackOrder
  }), /* @__PURE__ */ reactExports.createElement(CategoricalChart, _extends$1({}, rootChartProps, {
    ref
  })));
});
var allowedTooltipTypes$3 = ["axis"];
var LineChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  return /* @__PURE__ */ reactExports.createElement(CartesianChart, {
    chartName: "LineChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: allowedTooltipTypes$3,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: props,
    ref
  });
});
var allowedTooltipTypes$2 = ["axis", "item"];
var BarChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  return /* @__PURE__ */ reactExports.createElement(CartesianChart, {
    chartName: "BarChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: allowedTooltipTypes$2,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: props,
    ref
  });
});
function ReportPolarOptions(props) {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(updatePolarOptions(props));
  }, [dispatch, props]);
  return null;
}
var _excluded = ["layout"];
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultMargin = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
};
var defaultPolarChartProps = _objectSpread$1({
  accessibilityLayer: true,
  stackOffset: "none",
  barCategoryGap: "10%",
  barGap: 4,
  margin: defaultMargin,
  reverseStackOrder: false,
  syncMethod: "index",
  layout: "radial",
  responsive: false,
  cx: "50%",
  cy: "50%",
  innerRadius: 0,
  outerRadius: "80%"
}, initialEventSettingsState);
var PolarChart = /* @__PURE__ */ reactExports.forwardRef(function PolarChart2(props, ref) {
  var _polarChartProps$id;
  var polarChartProps = resolveDefaultProps(props.categoricalChartProps, defaultPolarChartProps);
  var layout = polarChartProps.layout, otherCategoricalProps = _objectWithoutProperties(polarChartProps, _excluded);
  var chartName = props.chartName, defaultTooltipEventType = props.defaultTooltipEventType, validateTooltipEventTypes = props.validateTooltipEventTypes, tooltipPayloadSearcher = props.tooltipPayloadSearcher;
  var options = {
    chartName,
    defaultTooltipEventType,
    validateTooltipEventTypes,
    tooltipPayloadSearcher,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ reactExports.createElement(RechartsStoreProvider, {
    preloadedState: {
      options
    },
    reduxStoreName: (_polarChartProps$id = polarChartProps.id) !== null && _polarChartProps$id !== void 0 ? _polarChartProps$id : chartName
  }, /* @__PURE__ */ reactExports.createElement(ChartDataContextProvider, {
    chartData: polarChartProps.data
  }), /* @__PURE__ */ reactExports.createElement(ReportMainChartProps, {
    layout,
    margin: polarChartProps.margin
  }), /* @__PURE__ */ reactExports.createElement(ReportEventSettings, {
    throttleDelay: polarChartProps.throttleDelay,
    throttledEvents: polarChartProps.throttledEvents
  }), /* @__PURE__ */ reactExports.createElement(ReportChartProps, {
    baseValue: void 0,
    accessibilityLayer: polarChartProps.accessibilityLayer,
    barCategoryGap: polarChartProps.barCategoryGap,
    maxBarSize: polarChartProps.maxBarSize,
    stackOffset: polarChartProps.stackOffset,
    barGap: polarChartProps.barGap,
    barSize: polarChartProps.barSize,
    syncId: polarChartProps.syncId,
    syncMethod: polarChartProps.syncMethod,
    className: polarChartProps.className,
    reverseStackOrder: polarChartProps.reverseStackOrder
  }), /* @__PURE__ */ reactExports.createElement(ReportPolarOptions, {
    cx: polarChartProps.cx,
    cy: polarChartProps.cy,
    startAngle: polarChartProps.startAngle,
    endAngle: polarChartProps.endAngle,
    innerRadius: polarChartProps.innerRadius,
    outerRadius: polarChartProps.outerRadius
  }), /* @__PURE__ */ reactExports.createElement(CategoricalChart, _extends({}, otherCategoricalProps, {
    ref
  })));
});
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var allowedTooltipTypes$1 = ["item"];
var defaultPieChartProps = _objectSpread(_objectSpread({}, defaultPolarChartProps), {}, {
  layout: "centric",
  startAngle: 0,
  endAngle: 360
});
var PieChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var propsWithDefaults = resolveDefaultProps(props, defaultPieChartProps);
  return /* @__PURE__ */ reactExports.createElement(PolarChart, {
    chartName: "PieChart",
    defaultTooltipEventType: "item",
    validateTooltipEventTypes: allowedTooltipTypes$1,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: propsWithDefaults,
    ref
  });
});
var allowedTooltipTypes = ["axis"];
var AreaChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  return /* @__PURE__ */ reactExports.createElement(CartesianChart, {
    chartName: "AreaChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: allowedTooltipTypes,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: props,
    ref
  });
});
const RechartsPrimitive = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Area,
  AreaChart,
  AreaRevealShape,
  Bar,
  BarChart,
  CartesianAxis,
  CartesianGrid,
  Cell,
  Cross,
  Curve,
  DefaultLegendContent,
  DefaultTooltipContent,
  DefaultZIndexes,
  Dot,
  Global,
  JavascriptAnimation,
  Label,
  LabelList,
  Layer,
  Legend,
  Line,
  LineChart,
  LineDrawShape,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Sector,
  Surface,
  Symbols,
  Text,
  Tooltip,
  XAxis,
  YAxis,
  ZIndexLayer,
  getNiceTickValues,
  getRelativeCoordinate,
  interpolate: interpolate$1,
  legacyTheme,
  matchAppend,
  matchByIndex,
  useActiveTooltipDataPoints,
  useCartesianChartLayout,
  useChartHeight,
  useChartLayout,
  useChartWidth,
  useMargin,
  usePlotArea,
  usePolarChartLayout
}, Symbol.toStringTag, { value: "Module" }));
const THEMES = {
  dark: ':is(.dark, [data-theme="dark"])',
  light: ""
};
const ChartContext = reactExports.createContext(null);
function useChart() {
  const context = reactExports.useContext(ChartContext);
  if (!context) {
    throw new Error("Chart parts must be used within <ChartContainer />");
  }
  return context;
}
function fallbackColor(position) {
  return position < 5 ? `var(--chart-${position + 1})` : "var(--color-muted-foreground)";
}
function colorVariables(config2) {
  const style = {};
  Object.entries(config2).forEach(([key, item], position) => {
    if (item.theme) return;
    style[`--color-${key}`] = item.color ?? fallbackColor(position);
  });
  return style;
}
function ChartStyle({
  id,
  config: config2
}) {
  const themed = Object.entries(config2).filter(([, item]) => item.theme);
  if (!themed.length) return null;
  const css = Object.entries(THEMES).map(([theme, scope]) => {
    const declarations = themed.map(([key, item]) => {
      const color2 = item.theme?.[theme];
      return color2 ? `  --color-${key}: ${color2};` : null;
    }).filter(Boolean).join("\n");
    return `${scope ? `${scope} ` : ""}[data-chart="${id}"] {
${declarations}
}`;
  }).join("\n");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: { __html: css } });
}
function ChartContainer({
  id,
  className,
  style,
  children,
  config: config2,
  initialDimension = { height: 200, width: 320 },
  ...props
}) {
  const uniqueId2 = reactExports.useId();
  const chartId = `chart-${(id ?? uniqueId2).replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const context = reactExports.useMemo(() => ({ config: config2 }), [config2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContext.Provider, { value: context, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex aspect-video min-w-0 justify-center rounded-md text-xs outline-none",
        // Axes and grid: hairlines in the border colour, muted figures.
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-axis-tick_text]:tabular-nums [&_.recharts-polar-angle-axis-tick_text]:fill-muted-foreground [&_.recharts-polar-radius-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-cartesian-axis-line[stroke='#666']]:stroke-border-strong [&_.recharts-cartesian-axis-tick-line[stroke='#666']]:stroke-border-strong [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border-strong",
        // Hover: a hairline crosshair on lines and areas, a faint band on bars.
        "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border-strong [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
        // Dots and slices are ringed in the surface colour instead of white.
        "[&_.recharts-dot[stroke='#fff']]:stroke-card [&_.recharts-sector[stroke='#fff']]:stroke-card",
        "[&_.recharts-label]:fill-muted-foreground [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
        // Recharts' keyboard layer focuses the surface; show it like any control.
        "has-[.recharts-surface:focus-visible]:ring-2 has-[.recharts-surface:focus-visible]:ring-ring has-[.recharts-surface:focus-visible]:ring-offset-1 has-[.recharts-surface:focus-visible]:ring-offset-background",
        className
      ),
      "data-chart": chartId,
      "data-slot": "chart",
      style: { ...colorVariables(config2), ...style },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartStyle, { config: config2, id: chartId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResponsiveContainer,
          {
            initialDimension,
            children
          }
        )
      ]
    }
  ) });
}
const ChartTooltip = Tooltip;
function resolveConfigKey(config2, payload, key) {
  if (typeof payload !== "object" || payload === null) return key;
  const record = payload;
  const inner = typeof record.payload === "object" && record.payload !== null ? record.payload : void 0;
  const candidate = typeof record[key] === "string" ? record[key] : inner && typeof inner[key] === "string" ? inner[key] : void 0;
  return candidate !== void 0 && candidate in config2 ? candidate : key;
}
function getPayloadConfig(config2, payload, key) {
  return config2[resolveConfigKey(config2, payload, key)];
}
function orderByConfig(config2, items, keyOf) {
  const order = Object.keys(config2);
  const rank = (item) => {
    const position = order.indexOf(keyOf(item));
    return position === -1 ? order.length : position;
  };
  return items.map((item, index) => ({ index, item, rank: rank(item) })).sort((a2, b) => a2.rank - b.rank || a2.index - b.index).map((entry) => entry.item);
}
function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  formatter,
  className,
  labelClassName,
  hideLabel = false,
  hideIndicator = false,
  indicator = "dot",
  nameKey,
  labelKey,
  color: color2,
  valueFormatter
}) {
  const { config: config2 } = useChart();
  const { code } = useUILocale();
  if (!active || !payload?.length) return null;
  const itemKey = (item) => `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
  const items = orderByConfig(
    config2,
    payload.filter((item) => item.type !== "none"),
    (item) => resolveConfigKey(config2, item, itemKey(item))
  );
  const [first] = items;
  let heading = null;
  if (!hideLabel && first) {
    const key = `${labelKey ?? first.dataKey ?? first.name ?? "value"}`;
    const itemConfig = getPayloadConfig(config2, first, key);
    const value = !labelKey && typeof label === "string" ? config2[label]?.label ?? label : itemConfig?.label ?? label;
    const content = labelFormatter ? labelFormatter(value, payload) : value;
    if (content !== void 0 && content !== null && content !== "") {
      heading = /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn("font-medium text-foreground", labelClassName),
          "data-slot": "chart-tooltip-label",
          children: content
        }
      );
    }
  }
  const nestLabel = items.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "relative grid min-w-32 items-start gap-1.5 rounded-lg border bg-popover not-dark:bg-clip-padding px-2.5 py-2 text-popover-foreground text-xs shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className
      ),
      "data-slot": "chart-tooltip",
      children: [
        nestLabel ? null : heading,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-1.5", children: items.map((item, index) => {
          const itemConfig = getPayloadConfig(config2, item, itemKey(item));
          const indicatorColor = color2 ?? item.payload?.fill ?? item.color;
          const name = itemConfig?.label ?? item.name;
          const hasValue = item.value !== void 0 && item.value !== null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "flex w-full flex-wrap gap-2 [&>svg]:size-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" ? "items-center" : "items-stretch"
              ),
              "data-slot": "chart-tooltip-item",
              children: formatter && hasValue && item.name !== void 0 ? formatter(
                item.value,
                item.name,
                item,
                index,
                payload
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(itemConfig.icon, {}) : hideIndicator ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--indicator) bg-(--indicator)",
                      indicator === "dot" && "size-2",
                      indicator === "line" && "w-1",
                      indicator === "dashed" && "w-0 border-[1.5px] border-dashed bg-transparent",
                      nestLabel && indicator === "dashed" && "my-0.5"
                    ),
                    "data-slot": "chart-tooltip-indicator",
                    style: { "--indicator": indicatorColor }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between gap-4 leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                        nestLabel ? heading : null,
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: name })
                      ] }),
                      hasValue ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground tabular-nums", children: [
                        valueFormatter ? valueFormatter(
                          item.value,
                          `${item.name ?? ""}`,
                          item
                        ) : typeof item.value === "number" ? item.value.toLocaleString(code) : `${item.value}`,
                        item.unit ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ms-0.5 font-normal text-muted-foreground", children: item.unit }) : null
                      ] }) : null
                    ]
                  }
                )
              ] })
            },
            `${item.dataKey ?? item.name ?? index}`
          );
        }) })
      ]
    }
  );
}
const ChartLegend = Legend;
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}) {
  const { config: config2 } = useChart();
  if (!payload?.length) return null;
  const legendKey = (item) => `${nameKey ?? item.dataKey ?? "value"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      "data-slot": "chart-legend",
      children: orderByConfig(
        config2,
        payload.filter((item) => item.type !== "none"),
        (item) => resolveConfigKey(config2, item, legendKey(item))
      ).map((item, index) => {
        const itemConfig = getPayloadConfig(config2, item, legendKey(item));
        const isLine = item.type === "line" || item.type === "plainline";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 text-muted-foreground [&>svg]:size-3",
            "data-slot": "chart-legend-item",
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsxRuntimeExports.jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: cn(
                    "shrink-0",
                    isLine ? "h-0.5 w-3 rounded-full" : "size-2 rounded-[2px]"
                  ),
                  style: { backgroundColor: item.color }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: itemConfig?.label ?? item.value })
            ]
          },
          `${item.value ?? index}`
        );
      })
    }
  );
}
export {
  ChartContainer as C,
  RechartsPrimitive as R,
  ChartTooltip as a,
  ChartTooltipContent as b,
  ChartLegend as c,
  ChartLegendContent as d
};
