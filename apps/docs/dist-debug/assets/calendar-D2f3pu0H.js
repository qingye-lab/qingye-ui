import { cg as React3, r as reactExports, q as useUILocale, e as cn, j as jsxRuntimeExports, c7 as ChevronRight } from "./index-DM02Iz28.js";
import { C as ChevronLeft } from "./chevron-left-CtqcxRzh.js";
import { C as ChevronsUpDown } from "./chevrons-up-down-BLzcfRd-.js";
function tzName(timeZone, date, format2 = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone,
    timeZoneName: format2
  }).format(date).split(/\s/g).slice(2).join(" ");
}
const offsetFormatCache = {};
const offsetCache = {};
function tzOffset(timeZone, date) {
  try {
    const format2 = offsetFormatCache[timeZone] ||= new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "longOffset"
    }).format;
    const offsetStr = format2(date).split("GMT")[1];
    if (offsetStr in offsetCache) return offsetCache[offsetStr];
    return calcOffset(offsetStr, offsetStr.split(":"));
  } catch {
    if (timeZone in offsetCache) return offsetCache[timeZone];
    const captures = timeZone?.match(offsetRe);
    if (captures) return calcOffset(timeZone, captures.slice(1));
    return NaN;
  }
}
const offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(cacheStr, values) {
  const hours = +(values[0] || 0);
  const minutes = +(values[1] || 0);
  const seconds = +(values[2] || 0) / 60;
  return offsetCache[cacheStr] = hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds;
}
class TZDateMini extends Date {
  //#region static
  constructor(...args) {
    super();
    if (args.length > 1 && typeof args[args.length - 1] === "string") {
      this.timeZone = args.pop();
    }
    this.internal = /* @__PURE__ */ new Date();
    if (isNaN(tzOffset(this.timeZone, this))) {
      this.setTime(NaN);
    } else {
      if (!args.length) {
        this.setTime(Date.now());
      } else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) {
        this.setTime(args[0]);
      } else if (typeof args[0] === "string") {
        this.setTime(+new Date(args[0]));
      } else if (args[0] instanceof Date) {
        this.setTime(+args[0]);
      } else {
        this.setTime(+new Date(...args));
        adjustToSystemTZ(this, args);
      }
    }
  }
  static tz(tz, ...args) {
    return args.length ? new TZDateMini(...args, tz) : new TZDateMini(Date.now(), tz);
  }
  //#endregion
  //#region time zone
  withTimeZone(timeZone) {
    return new TZDateMini(+this, timeZone);
  }
  getTimezoneOffset() {
    const offset = -tzOffset(this.timeZone, this);
    return offset > 0 ? Math.floor(offset) : Math.ceil(offset);
  }
  //#endregion
  //#region time
  setTime(_time) {
    Date.prototype.setTime.apply(this, arguments);
    syncToInternal(this);
    return +this;
  }
  //#endregion
  //#region date-fns integration
  [/* @__PURE__ */ Symbol.for("constructDateFrom")](date) {
    return new TZDateMini(+new Date(date), this.timeZone);
  }
  //#endregion
}
const re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
  if (!re.test(method)) return;
  const utcMethod = method.replace(re, "$1UTC");
  if (!TZDateMini.prototype[utcMethod]) return;
  if (method.startsWith("get")) {
    TZDateMini.prototype[method] = function() {
      return this.internal[utcMethod]();
    };
  } else {
    TZDateMini.prototype[method] = function() {
      Date.prototype[utcMethod].apply(this.internal, arguments);
      syncFromInternal(this);
      return +this;
    };
    TZDateMini.prototype[utcMethod] = function() {
      Date.prototype[utcMethod].apply(this, arguments);
      syncToInternal(this);
      return +this;
    };
  }
});
function syncToInternal(date) {
  date.internal.setTime(+date);
  date.internal.setUTCSeconds(date.internal.getUTCSeconds() - // Round after converting minutes to seconds to avoid fractional offset
  // precision errors from historical offsets.
  Math.round(-tzOffset(date.timeZone, date) * 60));
}
function syncFromInternal(date) {
  Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
  Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());
  adjustToSystemTZ(date);
}
function adjustToSystemTZ(date, constructorArgs) {
  const expectedInternalTime = Array.isArray(constructorArgs) ? constructorArgsToInternalTime(constructorArgs) : +date.internal;
  const offsetWithSeconds = tzOffset(date.timeZone, date);
  const offset = offsetWithSeconds > 0 ? Math.floor(offsetWithSeconds) : Math.ceil(offsetWithSeconds);
  const prevHour = /* @__PURE__ */ new Date(+date);
  prevHour.setUTCHours(prevHour.getUTCHours() - 1);
  const systemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
  const prevHourSystemOffset = -(/* @__PURE__ */ new Date(+prevHour)).getTimezoneOffset();
  const systemDSTChange = systemOffset - prevHourSystemOffset;
  let systemOffsetForDiff = systemOffset;
  if (systemDSTChange && systemOffset !== offset) {
    const systemHour = Date.prototype.getHours.apply(date);
    const expectedHour = Array.isArray(constructorArgs) ? constructorArgs[3] || 0 : date.internal.getUTCHours();
    if (systemHour !== expectedHour) {
      const testDate = /* @__PURE__ */ new Date(+date);
      const testOffsetDiff = systemOffset - offset;
      if (testOffsetDiff) testDate.setUTCMinutes(testDate.getUTCMinutes() + testOffsetDiff);
      const testOffsetWithSeconds = tzOffset(date.timeZone, testDate);
      const testOffset = testOffsetWithSeconds > 0 ? Math.floor(testOffsetWithSeconds) : Math.ceil(testOffsetWithSeconds);
      if (testOffset === offset) systemOffsetForDiff = prevHourSystemOffset;
    }
  }
  const offsetDiff = systemOffsetForDiff - offset;
  if (offsetDiff)
    Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);
  const systemDate = /* @__PURE__ */ new Date(+date);
  systemDate.setUTCSeconds(0);
  const systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60;
  const secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60;
  if (secondsOffset || systemSecondsOffset)
    Date.prototype.setUTCSeconds.call(date, Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset);
  const postOffsetWithSeconds = tzOffset(date.timeZone, date);
  const postOffset = postOffsetWithSeconds > 0 ? Math.floor(postOffsetWithSeconds) : Math.ceil(postOffsetWithSeconds);
  const postSystemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
  const postOffsetDiff = postSystemOffset - postOffset;
  const offsetChanged = postOffset !== offset;
  const postDiff = postOffsetDiff - offsetDiff;
  const targetDSTShift = postOffset - offset;
  const postOffsetCandidate = expectedInternalTime - postOffset * 60 * 1e3;
  const normalizedTargetDSTGap = targetDSTShift > 0 && targetInternalTime(date) - expectedInternalTime === targetDSTShift * 60 * 1e3 && targetInternalTime(date, postOffsetCandidate) !== expectedInternalTime;
  if (offsetChanged && postDiff && !normalizedTargetDSTGap) {
    Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);
    const newOffsetWithSeconds = tzOffset(date.timeZone, date);
    const newOffset = newOffsetWithSeconds > 0 ? Math.floor(newOffsetWithSeconds) : Math.ceil(newOffsetWithSeconds);
    const offsetChange = postOffset - newOffset;
    if (offsetChange && postDiff < 0) {
      Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
    }
  }
  syncToInternal(date);
  const expectedTime = constructorArgs ? expectedInternalTime : expectedInternalTime + secondsOffset * 1e3;
  const drift = expectedTime - +date.internal;
  if (drift && Math.abs(drift) < 30 * 60 * 1e3) {
    Date.prototype.setTime.call(date, +date + drift);
    syncToInternal(date);
  }
}
function constructorArgsToInternalTime(args) {
  return Date.UTC(args[0], args.length > 1 ? args[1] : 0, args.length > 2 ? args[2] : 1, ...args.slice(3));
}
function targetInternalTime(date, time) {
  const internal = new Date(time ?? +date);
  internal.setUTCSeconds(internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, internal) * 60));
  return +internal;
}
class TZDate extends TZDateMini {
  //#region static
  static tz(tz, ...args) {
    return args.length ? new TZDate(...args, tz) : new TZDate(Date.now(), tz);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [sign, hours, minutes] = this.tzComponents();
    const tz = `${sign}${hours}:${minutes}`;
    return this.internal.toISOString().slice(0, -1) + tz;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [day, date, month, year] = this.internal.toUTCString().split(" ");
    return `${day?.slice(0, -1)} ${month} ${date} ${year}`;
  }
  toTimeString() {
    const time = this.internal.toUTCString().split(" ")[4];
    const [sign, hours, minutes] = this.tzComponents();
    return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
  }
  toLocaleString(locales, options) {
    return Date.prototype.toLocaleString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  toLocaleDateString(locales, options) {
    return Date.prototype.toLocaleDateString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  toLocaleTimeString(locales, options) {
    return Date.prototype.toLocaleTimeString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const offset = this.getTimezoneOffset();
    const sign = offset > 0 ? "-" : "+";
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
    const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
    return [sign, hours, minutes];
  }
  //#endregion
  withTimeZone(timeZone) {
    return new TZDate(+this, timeZone);
  }
  //#region date-fns integration
  [/* @__PURE__ */ Symbol.for("constructDateFrom")](date) {
    return new TZDate(+new Date(date), this.timeZone);
  }
  //#endregion
}
const millisecondsInWeek = 6048e5;
const millisecondsInDay = 864e5;
const constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date) return new date.constructor(value);
  return new Date(value);
}
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}
function addDays(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) return _date;
  _date.setDate(_date.getDate() + amount);
  return _date;
}
function addMonths(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  const dayOfMonth = _date.getDate();
  const endOfDesiredMonth = constructFrom(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    );
    return _date;
  }
}
let defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function startOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);
  const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}
function addWeeks(date, amount, options) {
  return addDays(date, amount * 7, options);
}
function addYears(date, amount, options) {
  return addMonths(date, amount * 12, options);
}
function max(dates, options) {
  let result;
  let context = options?.in;
  dates.forEach((date) => {
    if (!context && typeof date === "object")
      context = constructFrom.bind(null, date);
    const date_ = toDate(date, context);
    if (!result || result < date_ || isNaN(+date_)) result = date_;
  });
  return constructFrom(context, result || NaN);
}
function min(dates, options) {
  let result;
  let context = options?.in;
  dates.forEach((date) => {
    if (!context && typeof date === "object")
      context = constructFrom.bind(null, date);
    const date_ = toDate(date, context);
    if (!result || result > date_ || isNaN(+date_)) result = date_;
  });
  return constructFrom(context, result || NaN);
}
function isSameDay(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return +startOfDay(dateLeft_) === +startOfDay(dateRight_);
}
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(date) {
  return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}
function differenceInCalendarMonths(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
  return yearsDiff * 12 + monthsDiff;
}
function endOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}
function normalizeInterval(context, interval) {
  const [start, end] = normalizeDates(context, interval.start, interval.end);
  return { start, end };
}
function eachMonthOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  date.setDate(1);
  let step = 1;
  const dates = [];
  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setMonth(date.getMonth() + step);
  }
  return reversed ? dates.reverse() : dates;
}
function startOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function endOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}
function eachYearOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  date.setMonth(0, 1);
  let step = 1;
  const dates = [];
  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setFullYear(date.getFullYear() + step);
  }
  return reversed ? dates.reverse() : dates;
}
function endOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}
function endOfISOWeek(date, options) {
  return endOfWeek(date, { ...options, weekStartsOn: 1 });
}
const formatDistanceLocale$1 = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
const formatDistance$1 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale$1[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
const dateFormats$1 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
const timeFormats$1 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats$1 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong$1 = {
  date: buildFormatLongFn({
    formats: dateFormats$1,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1,
    defaultWidth: "full"
  })
};
const formatRelativeLocale$1 = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
const formatRelative$1 = (token, _date, _baseDate, _options) => formatRelativeLocale$1[token];
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}
const eraValues$1 = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
const quarterValues$1 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
const monthValues$1 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
const dayValues$1 = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
const dayPeriodValues$1 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
const formattingDayPeriodValues$1 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
const ordinalNumber$1 = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
const localize$1 = {
  ordinalNumber: ordinalNumber$1,
  era: buildLocalizeFn({
    values: eraValues$1,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues$1,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$1,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$1,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$1,
    defaultFormattingWidth: "wide"
  })
};
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // [TODO] -- I challenge you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
const matchOrdinalNumberPattern$1 = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern$1 = /\d+/i;
const matchEraPatterns$1 = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
const parseEraPatterns$1 = {
  any: [/^b/i, /^(a|c)/i]
};
const matchQuarterPatterns$1 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
const parseQuarterPatterns$1 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns$1 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
const parseMonthPatterns$1 = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns$1 = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
const parseDayPatterns$1 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
const matchDayPeriodPatterns$1 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
const parseDayPeriodPatterns$1 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
const match$1 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$1,
    parsePattern: parseOrdinalNumberPattern$1,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$1,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$1,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$1,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$1,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$1,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$1,
    defaultParseWidth: "any"
  })
};
const enUS$1 = {
  code: "en-US",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfWeekYear(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}
const lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
const dayPeriodEnum = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
const formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
const dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
const timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
const dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;
const throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  const defaultOptions2 = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions2.locale ?? enUS$1;
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const originalDate = toDate(date, options?.in);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
function getDaysInMonth(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth = constructFrom(_date, 0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}
function getMonth(date, options) {
  return toDate(date, options?.in).getMonth();
}
function getYear(date, options) {
  return toDate(date, options?.in).getFullYear();
}
function isAfter(date, dateToCompare) {
  return +toDate(date) > +toDate(dateToCompare);
}
function isBefore(date, dateToCompare) {
  return +toDate(date) < +toDate(dateToCompare);
}
function isSameWeek(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return +startOfWeek(laterDate_, options) === +startOfWeek(earlierDate_, options);
}
function isSameMonth(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return laterDate_.getFullYear() === earlierDate_.getFullYear() && laterDate_.getMonth() === earlierDate_.getMonth();
}
function isSameYear(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return laterDate_.getFullYear() === earlierDate_.getFullYear();
}
function setMonth(date, month, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const day = _date.getDate();
  const midMonth = constructFrom(date, 0);
  midMonth.setFullYear(year, month, 15);
  midMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(midMonth);
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}
function setYear(date, year, options) {
  const date_ = toDate(date, options?.in);
  if (isNaN(+date_)) return constructFrom(date, NaN);
  date_.setFullYear(year);
  return date_;
}
const FIVE_WEEKS = 5;
const FOUR_WEEKS = 4;
function getBroadcastWeeksInMonth(month, dateLib) {
  const firstDayOfMonth = dateLib.startOfMonth(month);
  const firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7;
  const broadcastStartDate = dateLib.addDays(month, -firstDayOfWeek + 1);
  const lastDateOfLastWeek = dateLib.addDays(broadcastStartDate, FIVE_WEEKS * 7 - 1);
  const numberOfWeeks = dateLib.getMonth(month) === dateLib.getMonth(lastDateOfLastWeek) ? FIVE_WEEKS : FOUR_WEEKS;
  return numberOfWeeks;
}
function startOfBroadcastWeek(date, dateLib) {
  const firstOfMonth = dateLib.startOfMonth(date);
  const dayOfWeek = firstOfMonth.getDay();
  if (dayOfWeek === 1) {
    return firstOfMonth;
  } else if (dayOfWeek === 0) {
    return dateLib.addDays(firstOfMonth, -1 * 6);
  } else {
    return dateLib.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
  }
}
function endOfBroadcastWeek(date, dateLib) {
  const startDate = startOfBroadcastWeek(date, dateLib);
  const numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib);
  const endDate = dateLib.addDays(startDate, numberOfWeeks * 7 - 1);
  return endDate;
}
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "不到 1 秒",
    other: "不到 {{count}} 秒"
  },
  xSeconds: {
    one: "1 秒",
    other: "{{count}} 秒"
  },
  halfAMinute: "半分钟",
  lessThanXMinutes: {
    one: "不到 1 分钟",
    other: "不到 {{count}} 分钟"
  },
  xMinutes: {
    one: "1 分钟",
    other: "{{count}} 分钟"
  },
  xHours: {
    one: "1 小时",
    other: "{{count}} 小时"
  },
  aboutXHours: {
    one: "大约 1 小时",
    other: "大约 {{count}} 小时"
  },
  xDays: {
    one: "1 天",
    other: "{{count}} 天"
  },
  aboutXWeeks: {
    one: "大约 1 个星期",
    other: "大约 {{count}} 个星期"
  },
  xWeeks: {
    one: "1 个星期",
    other: "{{count}} 个星期"
  },
  aboutXMonths: {
    one: "大约 1 个月",
    other: "大约 {{count}} 个月"
  },
  xMonths: {
    one: "1 个月",
    other: "{{count}} 个月"
  },
  aboutXYears: {
    one: "大约 1 年",
    other: "大约 {{count}} 年"
  },
  xYears: {
    one: "1 年",
    other: "{{count}} 年"
  },
  overXYears: {
    one: "超过 1 年",
    other: "超过 {{count}} 年"
  },
  almostXYears: {
    one: "将近 1 年",
    other: "将近 {{count}} 年"
  }
};
const formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "内";
    } else {
      return result + "前";
    }
  }
  return result;
};
const dateFormats = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: "yyyy-MM-dd",
  short: "yy-MM-dd"
};
const timeFormats = {
  full: "zzzz a h:mm:ss",
  long: "z a h:mm:ss",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
const dateTimeFormats = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
function checkWeek(date, baseDate, options) {
  const baseFormat = "eeee p";
  if (isSameWeek(date, baseDate, options)) {
    return baseFormat;
  } else if (date.getTime() > baseDate.getTime()) {
    return "'下个'" + baseFormat;
  }
  return "'上个'" + baseFormat;
}
const formatRelativeLocale = {
  lastWeek: checkWeek,
  // days before yesterday, maybe in this week or last week
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: checkWeek,
  // days after tomorrow, maybe in this week or next week
  other: "PP p"
};
const formatRelative = (token, date, baseDate, options) => {
  const format2 = formatRelativeLocale[token];
  if (typeof format2 === "function") {
    return format2(date, baseDate, options);
  }
  return format2;
};
const eraValues = {
  narrow: ["前", "公元"],
  abbreviated: ["前", "公元"],
  wide: ["公元前", "公元"]
};
const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["第一季", "第二季", "第三季", "第四季"],
  wide: ["第一季度", "第二季度", "第三季度", "第四季度"]
};
const monthValues = {
  narrow: [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二"
  ],
  abbreviated: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ],
  wide: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
  ]
};
const dayValues = {
  narrow: ["日", "一", "二", "三", "四", "五", "六"],
  short: ["日", "一", "二", "三", "四", "五", "六"],
  abbreviated: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};
const dayPeriodValues = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
const formattingDayPeriodValues = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
const ordinalNumber = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  switch (options?.unit) {
    case "date":
      return number.toString() + "日";
    case "hour":
      return number.toString() + "时";
    case "minute":
      return number.toString() + "分";
    case "second":
      return number.toString() + "秒";
    default:
      return "第 " + number.toString();
  }
};
const localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
const matchOrdinalNumberPattern = /^(第\s*)?\d+(日|时|分|秒)?/i;
const parseOrdinalNumberPattern = /\d+/i;
const matchEraPatterns = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
const parseEraPatterns = {
  any: [/^(前)/i, /^(公元)/i]
};
const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻钟/i
};
const parseQuarterPatterns = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
const matchMonthPatterns = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一]?)/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]?|\d|1[0-2])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一]?)月/i
};
const parseMonthPatterns = {
  narrow: [
    /^一/i,
    /^二/i,
    /^三/i,
    /^四/i,
    /^五/i,
    /^六/i,
    /^七/i,
    /^八/i,
    /^九/i,
    /^十(?!(一|二))/i,
    /^十一/i,
    /^十二/i
  ],
  any: [
    /^(一|1(?!\d))/i,
    /^(二|2)/i,
    /^(三|3)/i,
    /^(四|4)/i,
    /^(五|5)/i,
    /^(六|6)/i,
    /^(七|7)/i,
    /^(八|8)/i,
    /^(九|9)/i,
    /^(十(?!(一|二))|10)/i,
    /^(十一|11)/i,
    /^(十二|12)/i
  ]
};
const matchDayPatterns = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^周[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
const parseDayPatterns = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
const matchDayPeriodPatterns = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
};
const parseDayPeriodPatterns = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const zhCN$1 = {
  code: "zh-CN",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const enUS = {
  ...enUS$1,
  labels: {
    labelDayButton: (date, modifiers, options, dateLib) => {
      let formatDate;
      if (dateLib && typeof dateLib.format === "function") {
        formatDate = dateLib.format.bind(dateLib);
      } else {
        formatDate = (d, pattern) => format(d, pattern, { locale: enUS$1, ...options });
      }
      let label = formatDate(date, "PPPP");
      if (modifiers.today)
        label = `Today, ${label}`;
      if (modifiers.selected)
        label = `${label}, selected`;
      return label;
    },
    labelMonthDropdown: "Choose the Month",
    labelNext: "Go to the Next Month",
    labelPrevious: "Go to the Previous Month",
    labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
    labelYearDropdown: "Choose the Year",
    labelGrid: (date, options, dateLib) => {
      let formatDate;
      if (dateLib && typeof dateLib.format === "function") {
        formatDate = dateLib.format.bind(dateLib);
      } else {
        formatDate = (d, pattern) => format(d, pattern, { locale: enUS$1, ...options });
      }
      return formatDate(date, "LLLL yyyy");
    },
    labelGridcell: (date, modifiers, options, dateLib) => {
      let formatDate;
      if (dateLib && typeof dateLib.format === "function") {
        formatDate = dateLib.format.bind(dateLib);
      } else {
        formatDate = (d, pattern) => format(d, pattern, { locale: enUS$1, ...options });
      }
      let label = formatDate(date, "PPPP");
      if (modifiers?.today) {
        label = `Today, ${label}`;
      }
      return label;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (date, options, dateLib) => {
      let formatDate;
      if (dateLib && typeof dateLib.format === "function") {
        formatDate = dateLib.format.bind(dateLib);
      } else {
        formatDate = (d, pattern) => format(d, pattern, { locale: enUS$1, ...options });
      }
      return formatDate(date, "cccc");
    }
  }
};
class DateLib {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(options, overrides) {
    this.today = () => {
      if (this.overrides?.today) {
        return this.overrides.today();
      }
      if (this.options.timeZone) {
        return TZDate.tz(this.options.timeZone);
      }
      const DateCtor = this.options.Date ?? Date;
      return new DateCtor();
    };
    this.newDate = (year, monthIndex, date) => {
      if (this.overrides?.newDate) {
        return this.overrides.newDate(year, monthIndex, date);
      }
      if (this.options.timeZone) {
        return new TZDate(year, monthIndex, date, this.options.timeZone);
      }
      return new Date(year, monthIndex, date);
    };
    this.addDays = (date, amount) => {
      return this.overrides?.addDays ? this.overrides.addDays(date, amount) : addDays(date, amount);
    };
    this.addMonths = (date, amount) => {
      return this.overrides?.addMonths ? this.overrides.addMonths(date, amount) : addMonths(date, amount);
    };
    this.addWeeks = (date, amount) => {
      return this.overrides?.addWeeks ? this.overrides.addWeeks(date, amount) : addWeeks(date, amount);
    };
    this.addYears = (date, amount) => {
      return this.overrides?.addYears ? this.overrides.addYears(date, amount) : addYears(date, amount);
    };
    this.differenceInCalendarDays = (dateLeft, dateRight) => {
      return this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(dateLeft, dateRight) : differenceInCalendarDays(dateLeft, dateRight);
    };
    this.differenceInCalendarMonths = (dateLeft, dateRight) => {
      return this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(dateLeft, dateRight) : differenceInCalendarMonths(dateLeft, dateRight);
    };
    this.eachMonthOfInterval = (interval) => {
      return this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(interval) : eachMonthOfInterval(interval);
    };
    this.eachYearOfInterval = (interval) => {
      const years = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(interval) : eachYearOfInterval(interval);
      const uniqueYears = new Set(years.map((d) => this.getYear(d)));
      if (uniqueYears.size === years.length) {
        return years;
      }
      const yearsArray = [];
      uniqueYears.forEach((y) => {
        yearsArray.push(new Date(y, 0, 1));
      });
      return yearsArray;
    };
    this.endOfBroadcastWeek = (date) => {
      return this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(date) : endOfBroadcastWeek(date, this);
    };
    this.endOfISOWeek = (date) => {
      return this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(date) : endOfISOWeek(date);
    };
    this.endOfMonth = (date) => {
      return this.overrides?.endOfMonth ? this.overrides.endOfMonth(date) : endOfMonth(date);
    };
    this.endOfWeek = (date, options2) => {
      return this.overrides?.endOfWeek ? this.overrides.endOfWeek(date, options2) : endOfWeek(date, this.options);
    };
    this.endOfYear = (date) => {
      return this.overrides?.endOfYear ? this.overrides.endOfYear(date) : endOfYear(date);
    };
    this.format = (date, formatStr, _options) => {
      const formatted = this.overrides?.format ? this.overrides.format(date, formatStr, this.options) : format(date, formatStr, this.options);
      if (this.options.numerals && this.options.numerals !== "latn") {
        return this.replaceDigits(formatted);
      }
      return formatted;
    };
    this.getISOWeek = (date) => {
      return this.overrides?.getISOWeek ? this.overrides.getISOWeek(date) : getISOWeek(date);
    };
    this.getMonth = (date, _options) => {
      return this.overrides?.getMonth ? this.overrides.getMonth(date, this.options) : getMonth(date, this.options);
    };
    this.getYear = (date, _options) => {
      return this.overrides?.getYear ? this.overrides.getYear(date, this.options) : getYear(date, this.options);
    };
    this.getWeek = (date, _options) => {
      return this.overrides?.getWeek ? this.overrides.getWeek(date, this.options) : getWeek(date, this.options);
    };
    this.isAfter = (date, dateToCompare) => {
      return this.overrides?.isAfter ? this.overrides.isAfter(date, dateToCompare) : isAfter(date, dateToCompare);
    };
    this.isBefore = (date, dateToCompare) => {
      return this.overrides?.isBefore ? this.overrides.isBefore(date, dateToCompare) : isBefore(date, dateToCompare);
    };
    this.isDate = (value) => {
      return this.overrides?.isDate ? this.overrides.isDate(value) : isDate(value);
    };
    this.isSameDay = (dateLeft, dateRight) => {
      return this.overrides?.isSameDay ? this.overrides.isSameDay(dateLeft, dateRight) : isSameDay(dateLeft, dateRight);
    };
    this.isSameMonth = (dateLeft, dateRight) => {
      return this.overrides?.isSameMonth ? this.overrides.isSameMonth(dateLeft, dateRight) : isSameMonth(dateLeft, dateRight);
    };
    this.isSameYear = (dateLeft, dateRight) => {
      return this.overrides?.isSameYear ? this.overrides.isSameYear(dateLeft, dateRight) : isSameYear(dateLeft, dateRight);
    };
    this.max = (dates) => {
      return this.overrides?.max ? this.overrides.max(dates) : max(dates);
    };
    this.min = (dates) => {
      return this.overrides?.min ? this.overrides.min(dates) : min(dates);
    };
    this.setMonth = (date, month) => {
      return this.overrides?.setMonth ? this.overrides.setMonth(date, month) : setMonth(date, month);
    };
    this.setYear = (date, year) => {
      return this.overrides?.setYear ? this.overrides.setYear(date, year) : setYear(date, year);
    };
    this.startOfBroadcastWeek = (date, _dateLib) => {
      return this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(date, this) : startOfBroadcastWeek(date, this);
    };
    this.startOfDay = (date) => {
      return this.overrides?.startOfDay ? this.overrides.startOfDay(date) : startOfDay(date);
    };
    this.startOfISOWeek = (date) => {
      return this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(date) : startOfISOWeek(date);
    };
    this.startOfMonth = (date) => {
      return this.overrides?.startOfMonth ? this.overrides.startOfMonth(date) : startOfMonth(date);
    };
    this.startOfWeek = (date, _options) => {
      return this.overrides?.startOfWeek ? this.overrides.startOfWeek(date, this.options) : startOfWeek(date, this.options);
    };
    this.startOfYear = (date) => {
      return this.overrides?.startOfYear ? this.overrides.startOfYear(date) : startOfYear(date);
    };
    this.options = { locale: enUS, ...options };
    this.overrides = overrides;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals = "latn" } = this.options;
    const formatter = new Intl.NumberFormat("en-US", {
      numberingSystem: numerals
    });
    const digitMap = {};
    for (let i = 0; i < 10; i++) {
      digitMap[i.toString()] = formatter.format(i);
    }
    return digitMap;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(input) {
    const digitMap = this.getDigitMap();
    return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(value) {
    return this.replaceDigits(value.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    const code = this.options.locale?.code;
    if (!code) {
      return "month-first";
    }
    return DateLib.yearFirstLocales.has(code) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(date) {
    const { locale, timeZone, numerals } = this.options;
    const localeCode = locale?.code;
    if (localeCode && DateLib.yearFirstLocales.has(localeCode)) {
      try {
        const intl = new Intl.DateTimeFormat(localeCode, {
          month: "long",
          year: "numeric",
          timeZone,
          numberingSystem: numerals
        });
        const formatted = intl.format(date);
        return formatted;
      } catch {
      }
    }
    const pattern = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(date, pattern);
  }
}
DateLib.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
const defaultDateLib = new DateLib();
class CalendarDay {
  constructor(date, displayMonth, dateLib = defaultDateLib) {
    this.date = date;
    this.displayMonth = displayMonth;
    this.outside = Boolean(displayMonth && !dateLib.isSameMonth(date, displayMonth));
    this.dateLib = dateLib;
    this.isoDate = dateLib.format(date, "yyyy-MM-dd");
    this.displayMonthId = dateLib.format(displayMonth, "yyyy-MM");
    this.dateMonthId = dateLib.format(date, "yyyy-MM");
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(day) {
    return this.dateLib.isSameDay(day.date, this.date) && this.dateLib.isSameMonth(day.displayMonth, this.displayMonth);
  }
}
class CalendarMonth {
  constructor(month, weeks) {
    this.date = month;
    this.weeks = weeks;
  }
}
class CalendarWeek {
  constructor(weekNumber, days) {
    this.days = days;
    this.weekNumber = weekNumber;
  }
}
function CaptionLabel(props) {
  return React3.createElement("span", { ...props });
}
function Chevron(props) {
  const { size = 24, orientation = "left", className, style } = props;
  return React3.createElement(
    "svg",
    { className, style, width: size, height: size, viewBox: "0 0 24 24" },
    orientation === "up" && React3.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    orientation === "down" && React3.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    orientation === "left" && React3.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    orientation === "right" && React3.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}
function Day(props) {
  const { day, modifiers, ...tdProps } = props;
  return React3.createElement("td", { ...tdProps });
}
function DayButton(props) {
  const { day, modifiers, ...buttonProps } = props;
  const ref = React3.useRef(null);
  React3.useEffect(() => {
    if (modifiers.focused)
      ref.current?.focus();
  }, [modifiers.focused]);
  return React3.createElement("button", { ref, ...buttonProps });
}
var UI;
(function(UI2) {
  UI2["Root"] = "root";
  UI2["Chevron"] = "chevron";
  UI2["Day"] = "day";
  UI2["DayButton"] = "day_button";
  UI2["CaptionLabel"] = "caption_label";
  UI2["Dropdowns"] = "dropdowns";
  UI2["Dropdown"] = "dropdown";
  UI2["DropdownRoot"] = "dropdown_root";
  UI2["Footer"] = "footer";
  UI2["MonthGrid"] = "month_grid";
  UI2["MonthCaption"] = "month_caption";
  UI2["MonthsDropdown"] = "months_dropdown";
  UI2["Month"] = "month";
  UI2["Months"] = "months";
  UI2["Nav"] = "nav";
  UI2["NextMonthButton"] = "button_next";
  UI2["PreviousMonthButton"] = "button_previous";
  UI2["Week"] = "week";
  UI2["Weeks"] = "weeks";
  UI2["Weekday"] = "weekday";
  UI2["Weekdays"] = "weekdays";
  UI2["WeekNumber"] = "week_number";
  UI2["WeekNumberHeader"] = "week_number_header";
  UI2["YearsDropdown"] = "years_dropdown";
})(UI || (UI = {}));
var DayFlag;
(function(DayFlag2) {
  DayFlag2["disabled"] = "disabled";
  DayFlag2["hidden"] = "hidden";
  DayFlag2["outside"] = "outside";
  DayFlag2["focused"] = "focused";
  DayFlag2["today"] = "today";
})(DayFlag || (DayFlag = {}));
var SelectionState;
(function(SelectionState2) {
  SelectionState2["range_end"] = "range_end";
  SelectionState2["range_middle"] = "range_middle";
  SelectionState2["range_start"] = "range_start";
  SelectionState2["selected"] = "selected";
})(SelectionState || (SelectionState = {}));
var Animation;
(function(Animation2) {
  Animation2["weeks_before_enter"] = "weeks_before_enter";
  Animation2["weeks_before_exit"] = "weeks_before_exit";
  Animation2["weeks_after_enter"] = "weeks_after_enter";
  Animation2["weeks_after_exit"] = "weeks_after_exit";
  Animation2["caption_after_enter"] = "caption_after_enter";
  Animation2["caption_after_exit"] = "caption_after_exit";
  Animation2["caption_before_enter"] = "caption_before_enter";
  Animation2["caption_before_exit"] = "caption_before_exit";
})(Animation || (Animation = {}));
const dayPickerContext = reactExports.createContext(void 0);
function useDayPicker() {
  const context = reactExports.useContext(dayPickerContext);
  if (context === void 0) {
    throw new Error("useDayPicker() must be used within a custom component.");
  }
  return context;
}
function Dropdown(props) {
  const { options, className, ...selectProps } = props;
  const { classNames, components: components2, styles } = useDayPicker();
  const cssClassSelect = [classNames[UI.Dropdown], className].join(" ");
  const selectedOption = options?.find(({ value }) => value === selectProps.value);
  return React3.createElement(
    "span",
    { "data-disabled": selectProps.disabled, className: classNames[UI.DropdownRoot], style: styles?.[UI.DropdownRoot] },
    React3.createElement(components2.Select, { className: cssClassSelect, ...selectProps }, options?.map(({ value, label, disabled }) => React3.createElement(components2.Option, { key: value, value, disabled }, label))),
    React3.createElement(
      "span",
      { className: classNames[UI.CaptionLabel], style: styles?.[UI.CaptionLabel], "aria-hidden": true },
      selectedOption?.label,
      React3.createElement(components2.Chevron, { orientation: "down", size: 18, className: classNames[UI.Chevron], style: styles?.[UI.Chevron] })
    )
  );
}
function DropdownNav(props) {
  return React3.createElement("div", { ...props });
}
function Footer(props) {
  return React3.createElement("div", { ...props });
}
function Month(props) {
  const { calendarMonth, displayIndex, ...divProps } = props;
  return React3.createElement("div", { ...divProps }, props.children);
}
function MonthCaption(props) {
  const { calendarMonth, displayIndex, ...divProps } = props;
  return React3.createElement("div", { ...divProps });
}
function MonthGrid(props) {
  return React3.createElement("table", { ...props });
}
function Months(props) {
  return React3.createElement("div", { ...props });
}
function MonthsDropdown(props) {
  const { components: components2 } = useDayPicker();
  return React3.createElement(components2.Dropdown, { ...props });
}
function Nav(props) {
  const { onPreviousClick, onNextClick, previousMonth, nextMonth, ...navProps } = props;
  const { components: components2, classNames, styles, labels: { labelPrevious: labelPrevious2, labelNext: labelNext2 } } = useDayPicker();
  const handleNextClick = reactExports.useCallback((e) => {
    if (nextMonth) {
      onNextClick?.(e);
    }
  }, [nextMonth, onNextClick]);
  const handlePreviousClick = reactExports.useCallback((e) => {
    if (previousMonth) {
      onPreviousClick?.(e);
    }
  }, [previousMonth, onPreviousClick]);
  return React3.createElement(
    "nav",
    { ...navProps },
    React3.createElement(
      components2.PreviousMonthButton,
      { type: "button", className: classNames[UI.PreviousMonthButton], style: styles?.[UI.PreviousMonthButton], tabIndex: previousMonth ? void 0 : -1, "aria-disabled": previousMonth ? void 0 : true, "aria-label": labelPrevious2(previousMonth), onClick: handlePreviousClick },
      React3.createElement(components2.Chevron, { disabled: previousMonth ? void 0 : true, className: classNames[UI.Chevron], style: styles?.[UI.Chevron], orientation: "left" })
    ),
    React3.createElement(
      components2.NextMonthButton,
      { type: "button", className: classNames[UI.NextMonthButton], style: styles?.[UI.NextMonthButton], tabIndex: nextMonth ? void 0 : -1, "aria-disabled": nextMonth ? void 0 : true, "aria-label": labelNext2(nextMonth), onClick: handleNextClick },
      React3.createElement(components2.Chevron, { disabled: nextMonth ? void 0 : true, orientation: "right", className: classNames[UI.Chevron], style: styles?.[UI.Chevron] })
    )
  );
}
function NextMonthButton(props) {
  return React3.createElement("button", { ...props });
}
function Option(props) {
  return React3.createElement("option", { ...props });
}
function PreviousMonthButton(props) {
  return React3.createElement("button", { ...props });
}
function Root(props) {
  const { rootRef, ...rest } = props;
  return React3.createElement("div", { ...rest, ref: rootRef });
}
function Select(props) {
  return React3.createElement("select", { ...props });
}
function Week(props) {
  const { week, ...trProps } = props;
  return React3.createElement("tr", { ...trProps });
}
function Weekday(props) {
  return React3.createElement("th", { ...props });
}
function Weekdays(props) {
  return React3.createElement(
    "thead",
    { "aria-hidden": true },
    React3.createElement("tr", { ...props })
  );
}
function WeekNumber(props) {
  const { week, ...thProps } = props;
  return React3.createElement("th", { ...thProps });
}
function WeekNumberHeader(props) {
  return React3.createElement("th", { ...props });
}
function Weeks(props) {
  return React3.createElement("tbody", { ...props });
}
function YearsDropdown(props) {
  const { components: components2 } = useDayPicker();
  return React3.createElement(components2.Dropdown, { ...props });
}
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CaptionLabel,
  Chevron,
  Day,
  DayButton,
  Dropdown,
  DropdownNav,
  Footer,
  Month,
  MonthCaption,
  MonthGrid,
  Months,
  MonthsDropdown,
  Nav,
  NextMonthButton,
  Option,
  PreviousMonthButton,
  Root,
  Select,
  Week,
  WeekNumber,
  WeekNumberHeader,
  Weekday,
  Weekdays,
  Weeks,
  YearsDropdown
}, Symbol.toStringTag, { value: "Module" }));
function rangeIncludesDate(range, date, excludeEnds = false, dateLib = defaultDateLib) {
  let { from, to } = range;
  const { differenceInCalendarDays: differenceInCalendarDays2, isSameDay: isSameDay2 } = dateLib;
  if (from && to) {
    const isRangeInverted = differenceInCalendarDays2(to, from) < 0;
    if (isRangeInverted) {
      [from, to] = [to, from];
    }
    const isInRange = differenceInCalendarDays2(date, from) >= (excludeEnds ? 1 : 0) && differenceInCalendarDays2(to, date) >= (excludeEnds ? 1 : 0);
    return isInRange;
  }
  if (!excludeEnds && to) {
    return isSameDay2(to, date);
  }
  if (!excludeEnds && from) {
    return isSameDay2(from, date);
  }
  return false;
}
function isDateInterval(matcher) {
  return Boolean(matcher && typeof matcher === "object" && "before" in matcher && "after" in matcher);
}
function isDateRange(value) {
  return Boolean(value && typeof value === "object" && "from" in value);
}
function isDateAfterType(value) {
  return Boolean(value && typeof value === "object" && "after" in value);
}
function isDateBeforeType(value) {
  return Boolean(value && typeof value === "object" && "before" in value);
}
function isDayOfWeekType(value) {
  return Boolean(value && typeof value === "object" && "dayOfWeek" in value);
}
function isDatesArray(value, dateLib) {
  return Array.isArray(value) && value.every(dateLib.isDate);
}
function dateMatchModifiers(date, matchers, dateLib = defaultDateLib) {
  const matchersArr = !Array.isArray(matchers) ? [matchers] : matchers;
  const { isSameDay: isSameDay2, differenceInCalendarDays: differenceInCalendarDays2, isAfter: isAfter2 } = dateLib;
  return matchersArr.some((matcher) => {
    if (typeof matcher === "boolean") {
      return matcher;
    }
    if (dateLib.isDate(matcher)) {
      return isSameDay2(date, matcher);
    }
    if (isDatesArray(matcher, dateLib)) {
      return matcher.some((matcherDate) => isSameDay2(date, matcherDate));
    }
    if (isDateRange(matcher)) {
      return rangeIncludesDate(matcher, date, false, dateLib);
    }
    if (isDayOfWeekType(matcher)) {
      if (!Array.isArray(matcher.dayOfWeek)) {
        return matcher.dayOfWeek === date.getDay();
      }
      return matcher.dayOfWeek.includes(date.getDay());
    }
    if (isDateInterval(matcher)) {
      const diffBefore = differenceInCalendarDays2(matcher.before, date);
      const diffAfter = differenceInCalendarDays2(matcher.after, date);
      const isDayBefore = diffBefore > 0;
      const isDayAfter = diffAfter < 0;
      const isClosedInterval = isAfter2(matcher.before, matcher.after);
      if (isClosedInterval) {
        return isDayAfter && isDayBefore;
      } else {
        return isDayBefore || isDayAfter;
      }
    }
    if (isDateAfterType(matcher)) {
      return differenceInCalendarDays2(date, matcher.after) > 0;
    }
    if (isDateBeforeType(matcher)) {
      return differenceInCalendarDays2(matcher.before, date) > 0;
    }
    if (typeof matcher === "function") {
      return matcher(date);
    }
    return false;
  });
}
function createGetModifiers(days, props, navStart, navEnd, dateLib) {
  const { disabled, hidden, modifiers, showOutsideDays, broadcastCalendar, today = dateLib.today() } = props;
  const { isSameDay: isSameDay2, isSameMonth: isSameMonth2, startOfMonth: startOfMonth2, isBefore: isBefore2, endOfMonth: endOfMonth2, isAfter: isAfter2 } = dateLib;
  const computedNavStart = navStart && startOfMonth2(navStart);
  const computedNavEnd = navEnd && endOfMonth2(navEnd);
  const internalModifiersMap = {
    [DayFlag.focused]: [],
    [DayFlag.outside]: [],
    [DayFlag.disabled]: [],
    [DayFlag.hidden]: [],
    [DayFlag.today]: []
  };
  const customModifiersMap = {};
  for (const day of days) {
    const { date, displayMonth } = day;
    const isOutside = Boolean(displayMonth && !isSameMonth2(date, displayMonth));
    const isBeforeNavStart = Boolean(computedNavStart && isBefore2(date, computedNavStart));
    const isAfterNavEnd = Boolean(computedNavEnd && isAfter2(date, computedNavEnd));
    const isDisabled = Boolean(disabled && dateMatchModifiers(date, disabled, dateLib));
    const isHidden = Boolean(hidden && dateMatchModifiers(date, hidden, dateLib)) || isBeforeNavStart || isAfterNavEnd || // Broadcast calendar will show outside days as default
    !broadcastCalendar && !showOutsideDays && isOutside || broadcastCalendar && showOutsideDays === false && isOutside;
    const isToday = isSameDay2(date, today);
    if (isOutside)
      internalModifiersMap.outside.push(day);
    if (isDisabled)
      internalModifiersMap.disabled.push(day);
    if (isHidden)
      internalModifiersMap.hidden.push(day);
    if (isToday)
      internalModifiersMap.today.push(day);
    if (modifiers) {
      Object.keys(modifiers).forEach((name) => {
        const modifierValue = modifiers?.[name];
        const isMatch = modifierValue ? dateMatchModifiers(date, modifierValue, dateLib) : false;
        if (!isMatch)
          return;
        if (customModifiersMap[name]) {
          customModifiersMap[name].push(day);
        } else {
          customModifiersMap[name] = [day];
        }
      });
    }
  }
  return (day) => {
    const dayFlags = {
      [DayFlag.focused]: false,
      [DayFlag.disabled]: false,
      [DayFlag.hidden]: false,
      [DayFlag.outside]: false,
      [DayFlag.today]: false
    };
    const customModifiers = {};
    for (const name in internalModifiersMap) {
      const days2 = internalModifiersMap[name];
      dayFlags[name] = days2.some((d) => d === day);
    }
    for (const name in customModifiersMap) {
      customModifiers[name] = customModifiersMap[name].some((d) => d === day);
    }
    return {
      ...dayFlags,
      // custom modifiers should override all the previous ones
      ...customModifiers
    };
  };
}
function getClassNamesForModifiers(modifiers, classNames, modifiersClassNames = {}) {
  const modifierClassNames = Object.entries(modifiers).filter(([, active]) => active === true).reduce((previousValue, [key]) => {
    if (modifiersClassNames[key]) {
      previousValue.push(modifiersClassNames[key]);
    } else if (classNames[DayFlag[key]]) {
      previousValue.push(classNames[DayFlag[key]]);
    } else if (classNames[SelectionState[key]]) {
      previousValue.push(classNames[SelectionState[key]]);
    }
    return previousValue;
  }, [classNames[UI.Day]]);
  return modifierClassNames;
}
function getComponents(customComponents) {
  return {
    ...components,
    ...customComponents
  };
}
function getDataAttributes(props) {
  const dataAttributes = {
    "data-mode": props.mode ?? void 0,
    "data-required": "required" in props ? props.required : void 0,
    "data-multiple-months": props.numberOfMonths && props.numberOfMonths > 1 || void 0,
    "data-week-numbers": props.showWeekNumber || void 0,
    "data-broadcast-calendar": props.broadcastCalendar || void 0,
    "data-nav-layout": props.navLayout || void 0
  };
  Object.entries(props).forEach(([key, val]) => {
    if (key.startsWith("data-")) {
      dataAttributes[key] = val;
    }
  });
  return dataAttributes;
}
function getDefaultClassNames() {
  const classNames = {};
  for (const key in UI) {
    classNames[UI[key]] = `rdp-${UI[key]}`;
  }
  for (const key in DayFlag) {
    classNames[DayFlag[key]] = `rdp-${DayFlag[key]}`;
  }
  for (const key in SelectionState) {
    classNames[SelectionState[key]] = `rdp-${SelectionState[key]}`;
  }
  for (const key in Animation) {
    classNames[Animation[key]] = `rdp-${Animation[key]}`;
  }
  return classNames;
}
function formatCaption(month, options, dateLib) {
  const lib = dateLib ?? new DateLib(options);
  return lib.formatMonthYear(month);
}
function formatDay(date, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(date, "d");
}
function formatMonthDropdown(month, dateLib = defaultDateLib) {
  return dateLib.format(month, "LLLL");
}
function formatWeekdayName(weekday, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(weekday, "cccccc");
}
function formatWeekNumber(weekNumber, dateLib = defaultDateLib) {
  if (weekNumber < 10) {
    return dateLib.formatNumber(`0${weekNumber.toLocaleString()}`);
  }
  return dateLib.formatNumber(`${weekNumber.toLocaleString()}`);
}
function formatWeekNumberHeader() {
  return ``;
}
function formatYearDropdown(year, dateLib = defaultDateLib) {
  return dateLib.format(year, "yyyy");
}
const defaultFormatters = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption,
  formatDay,
  formatMonthDropdown,
  formatWeekNumber,
  formatWeekNumberHeader,
  formatWeekdayName,
  formatYearDropdown
}, Symbol.toStringTag, { value: "Module" }));
function getFormatters(customFormatters) {
  return {
    ...defaultFormatters,
    ...customFormatters
  };
}
function labelDayButton(date, modifiers, options, dateLib) {
  let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
  if (modifiers.today)
    label = `Today, ${label}`;
  if (modifiers.selected)
    label = `${label}, selected`;
  return label;
}
function labelGrid(date, options, dateLib) {
  const lib = dateLib ?? new DateLib(options);
  return lib.formatMonthYear(date);
}
function labelGridcell(date, modifiers, options, dateLib) {
  let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
  if (modifiers?.today) {
    label = `Today, ${label}`;
  }
  return label;
}
function labelMonthDropdown(_options) {
  return "Choose the Month";
}
function labelNav() {
  return "";
}
const defaultLabel = "Go to the Next Month";
function labelNext(_month, _options) {
  return defaultLabel;
}
function labelPrevious(_month) {
  return "Go to the Previous Month";
}
function labelWeekday(date, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(date, "cccc");
}
function labelWeekNumber(weekNumber, _options) {
  return `Week ${weekNumber}`;
}
function labelWeekNumberHeader(_options) {
  return "Week Number";
}
function labelYearDropdown(_options) {
  return "Choose the Year";
}
const defaultLabels = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelDayButton,
  labelGrid,
  labelGridcell,
  labelMonthDropdown,
  labelNav,
  labelNext,
  labelPrevious,
  labelWeekNumber,
  labelWeekNumberHeader,
  labelWeekday,
  labelYearDropdown
}, Symbol.toStringTag, { value: "Module" }));
const resolveLabel = (defaultLabel2, customLabel, localeLabel) => {
  if (customLabel)
    return customLabel;
  if (localeLabel) {
    return typeof localeLabel === "function" ? localeLabel : (..._args) => localeLabel;
  }
  return defaultLabel2;
};
function getLabels(customLabels, options) {
  const localeLabels = options.locale?.labels ?? {};
  return {
    ...defaultLabels,
    ...customLabels ?? {},
    labelDayButton: resolveLabel(labelDayButton, customLabels?.labelDayButton, localeLabels.labelDayButton),
    labelMonthDropdown: resolveLabel(labelMonthDropdown, customLabels?.labelMonthDropdown, localeLabels.labelMonthDropdown),
    labelNext: resolveLabel(labelNext, customLabels?.labelNext, localeLabels.labelNext),
    labelPrevious: resolveLabel(labelPrevious, customLabels?.labelPrevious, localeLabels.labelPrevious),
    labelWeekNumber: resolveLabel(labelWeekNumber, customLabels?.labelWeekNumber, localeLabels.labelWeekNumber),
    labelYearDropdown: resolveLabel(labelYearDropdown, customLabels?.labelYearDropdown, localeLabels.labelYearDropdown),
    labelGrid: resolveLabel(labelGrid, customLabels?.labelGrid, localeLabels.labelGrid),
    labelGridcell: resolveLabel(labelGridcell, customLabels?.labelGridcell, localeLabels.labelGridcell),
    labelNav: resolveLabel(labelNav, customLabels?.labelNav, localeLabels.labelNav),
    labelWeekNumberHeader: resolveLabel(labelWeekNumberHeader, customLabels?.labelWeekNumberHeader, localeLabels.labelWeekNumberHeader),
    labelWeekday: resolveLabel(labelWeekday, customLabels?.labelWeekday, localeLabels.labelWeekday)
  };
}
function getMonthOptions(displayMonth, navStart, navEnd, formatters2, dateLib) {
  const { startOfMonth: startOfMonth2, startOfYear: startOfYear2, endOfYear: endOfYear2, eachMonthOfInterval: eachMonthOfInterval2, getMonth: getMonth2 } = dateLib;
  const months = eachMonthOfInterval2({
    start: startOfYear2(displayMonth),
    end: endOfYear2(displayMonth)
  });
  const options = months.map((month) => {
    const label = formatters2.formatMonthDropdown(month, dateLib);
    const value = getMonth2(month);
    const disabled = navStart && month < startOfMonth2(navStart) || navEnd && month > startOfMonth2(navEnd) || false;
    return { value, label, disabled };
  });
  return options;
}
function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
  let style = { ...styles?.[UI.Day] };
  Object.entries(dayModifiers).filter(([, active]) => active === true).forEach(([modifier]) => {
    style = {
      ...style,
      ...modifiersStyles?.[modifier]
    };
  });
  return style;
}
function getWeekdays(dateLib, ISOWeek, broadcastCalendar, today) {
  const referenceToday = today ?? dateLib.today();
  const start = broadcastCalendar ? dateLib.startOfBroadcastWeek(referenceToday, dateLib) : ISOWeek ? dateLib.startOfISOWeek(referenceToday) : dateLib.startOfWeek(referenceToday);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = dateLib.addDays(start, i);
    days.push(day);
  }
  return days;
}
function getYearOptions(navStart, navEnd, formatters2, dateLib, reverse = false) {
  if (!navStart)
    return void 0;
  if (!navEnd)
    return void 0;
  const { startOfYear: startOfYear2, endOfYear: endOfYear2, eachYearOfInterval: eachYearOfInterval2, getYear: getYear2 } = dateLib;
  const firstNavYear = startOfYear2(navStart);
  const lastNavYear = endOfYear2(navEnd);
  const years = eachYearOfInterval2({ start: firstNavYear, end: lastNavYear });
  if (reverse)
    years.reverse();
  return years.map((year) => {
    const label = formatters2.formatYearDropdown(year, dateLib);
    return {
      value: getYear2(year),
      label,
      disabled: false
    };
  });
}
function createNoonOverrides(timeZone, options = {}) {
  const { weekStartsOn, locale } = options;
  const fallbackWeekStartsOn = weekStartsOn ?? locale?.options?.weekStartsOn ?? 0;
  const toNoonTZDate = (date) => {
    const normalizedDate = typeof date === "number" || typeof date === "string" ? new Date(date) : date;
    return new TZDate(normalizedDate.getFullYear(), normalizedDate.getMonth(), normalizedDate.getDate(), 12, 0, 0, timeZone);
  };
  const toCalendarDate = (date) => {
    const zoned = toNoonTZDate(date);
    return new Date(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => {
      return toNoonTZDate(TZDate.tz(timeZone));
    },
    newDate: (year, monthIndex, date) => {
      return new TZDate(year, monthIndex, date, 12, 0, 0, timeZone);
    },
    startOfDay: (date) => {
      return toNoonTZDate(date);
    },
    startOfWeek: (date, options2) => {
      const base = toNoonTZDate(date);
      const weekStartsOnValue = options2?.weekStartsOn ?? fallbackWeekStartsOn;
      const diff = (base.getDay() - weekStartsOnValue + 7) % 7;
      base.setDate(base.getDate() - diff);
      return base;
    },
    startOfISOWeek: (date) => {
      const base = toNoonTZDate(date);
      const diff = (base.getDay() - 1 + 7) % 7;
      base.setDate(base.getDate() - diff);
      return base;
    },
    startOfMonth: (date) => {
      const base = toNoonTZDate(date);
      base.setDate(1);
      return base;
    },
    startOfYear: (date) => {
      const base = toNoonTZDate(date);
      base.setMonth(0, 1);
      return base;
    },
    endOfWeek: (date, options2) => {
      const base = toNoonTZDate(date);
      const weekStartsOnValue = options2?.weekStartsOn ?? fallbackWeekStartsOn;
      const endDow = (weekStartsOnValue + 6) % 7;
      const diff = (endDow - base.getDay() + 7) % 7;
      base.setDate(base.getDate() + diff);
      return base;
    },
    endOfISOWeek: (date) => {
      const base = toNoonTZDate(date);
      const diff = (7 - base.getDay()) % 7;
      base.setDate(base.getDate() + diff);
      return base;
    },
    endOfMonth: (date) => {
      const base = toNoonTZDate(date);
      base.setMonth(base.getMonth() + 1, 0);
      return base;
    },
    endOfYear: (date) => {
      const base = toNoonTZDate(date);
      base.setMonth(11, 31);
      return base;
    },
    eachMonthOfInterval: (interval) => {
      const start = toNoonTZDate(interval.start);
      const end = toNoonTZDate(interval.end);
      const result = [];
      const cursor = new TZDate(start.getFullYear(), start.getMonth(), 1, 12, 0, 0, timeZone);
      const endKey = end.getFullYear() * 12 + end.getMonth();
      while (cursor.getFullYear() * 12 + cursor.getMonth() <= endKey) {
        result.push(new TZDate(cursor, timeZone));
        cursor.setMonth(cursor.getMonth() + 1, 1);
      }
      return result;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (date, amount) => {
      const base = toNoonTZDate(date);
      base.setDate(base.getDate() + amount);
      return base;
    },
    addWeeks: (date, amount) => {
      const base = toNoonTZDate(date);
      base.setDate(base.getDate() + amount * 7);
      return base;
    },
    addMonths: (date, amount) => {
      const base = toNoonTZDate(date);
      base.setMonth(base.getMonth() + amount);
      return base;
    },
    addYears: (date, amount) => {
      const base = toNoonTZDate(date);
      base.setFullYear(base.getFullYear() + amount);
      return base;
    },
    eachYearOfInterval: (interval) => {
      const start = toNoonTZDate(interval.start);
      const end = toNoonTZDate(interval.end);
      const years = [];
      const cursor = new TZDate(start.getFullYear(), 0, 1, 12, 0, 0, timeZone);
      while (cursor.getFullYear() <= end.getFullYear()) {
        years.push(new TZDate(cursor, timeZone));
        cursor.setFullYear(cursor.getFullYear() + 1, 0, 1);
      }
      return years;
    },
    getWeek: (date, options2) => {
      const base = toCalendarDate(date);
      return getWeek(base, {
        weekStartsOn: options2?.weekStartsOn ?? fallbackWeekStartsOn,
        firstWeekContainsDate: options2?.firstWeekContainsDate ?? locale?.options?.firstWeekContainsDate ?? 1
      });
    },
    getISOWeek: (date) => {
      const base = toCalendarDate(date);
      return getISOWeek(base);
    },
    differenceInCalendarDays: (dateLeft, dateRight) => {
      const left = toCalendarDate(dateLeft);
      const right = toCalendarDate(dateRight);
      return differenceInCalendarDays(left, right);
    },
    differenceInCalendarMonths: (dateLeft, dateRight) => {
      const left = toCalendarDate(dateLeft);
      const right = toCalendarDate(dateRight);
      return differenceInCalendarMonths(left, right);
    }
  };
}
const asHtmlElement = (element) => {
  if (element instanceof HTMLElement)
    return element;
  return null;
};
const queryMonthEls = (element) => [
  ...element.querySelectorAll("[data-animated-month]") ?? []
];
const queryMonthEl = (element) => asHtmlElement(element.querySelector("[data-animated-month]"));
const queryCaptionEl = (element) => asHtmlElement(element.querySelector("[data-animated-caption]"));
const queryWeeksEl = (element) => asHtmlElement(element.querySelector("[data-animated-weeks]"));
const queryNavEl = (element) => asHtmlElement(element.querySelector("[data-animated-nav]"));
const queryWeekdaysEl = (element) => asHtmlElement(element.querySelector("[data-animated-weekdays]"));
function useAnimation(rootElRef, enabled, { classNames, months, focused, dateLib }) {
  const previousRootElSnapshotRef = reactExports.useRef(null);
  const previousMonthsRef = reactExports.useRef(months);
  const animatingRef = reactExports.useRef(false);
  reactExports.useLayoutEffect(() => {
    const previousMonths = previousMonthsRef.current;
    previousMonthsRef.current = months;
    if (!enabled || !rootElRef.current || // safety check because the ref can be set to anything by consumers
    !(rootElRef.current instanceof HTMLElement) || // validation required for the animation to work as expected
    months.length === 0 || previousMonths.length === 0 || months.length !== previousMonths.length) {
      return;
    }
    const isSameMonth2 = dateLib.isSameMonth(months[0].date, previousMonths[0].date);
    const isAfterPreviousMonth = dateLib.isAfter(months[0].date, previousMonths[0].date);
    const captionAnimationClass = isAfterPreviousMonth ? classNames[Animation.caption_after_enter] : classNames[Animation.caption_before_enter];
    const weeksAnimationClass = isAfterPreviousMonth ? classNames[Animation.weeks_after_enter] : classNames[Animation.weeks_before_enter];
    const previousRootElSnapshot = previousRootElSnapshotRef.current;
    const rootElSnapshot = rootElRef.current.cloneNode(true);
    if (rootElSnapshot instanceof HTMLElement) {
      const currentMonthElsSnapshot = queryMonthEls(rootElSnapshot);
      currentMonthElsSnapshot.forEach((currentMonthElSnapshot) => {
        if (!(currentMonthElSnapshot instanceof HTMLElement))
          return;
        const previousMonthElSnapshot = queryMonthEl(currentMonthElSnapshot);
        if (previousMonthElSnapshot && currentMonthElSnapshot.contains(previousMonthElSnapshot)) {
          currentMonthElSnapshot.removeChild(previousMonthElSnapshot);
        }
        const captionEl = queryCaptionEl(currentMonthElSnapshot);
        if (captionEl) {
          captionEl.classList.remove(captionAnimationClass);
        }
        const weeksEl = queryWeeksEl(currentMonthElSnapshot);
        if (weeksEl) {
          weeksEl.classList.remove(weeksAnimationClass);
        }
      });
      previousRootElSnapshotRef.current = rootElSnapshot;
    } else {
      previousRootElSnapshotRef.current = null;
    }
    if (animatingRef.current || isSameMonth2 || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    focused) {
      return;
    }
    const previousMonthEls = previousRootElSnapshot instanceof HTMLElement ? queryMonthEls(previousRootElSnapshot) : [];
    const currentMonthEls = queryMonthEls(rootElRef.current);
    if (currentMonthEls?.every((el) => el instanceof HTMLElement) && previousMonthEls?.every((el) => el instanceof HTMLElement)) {
      animatingRef.current = true;
      rootElRef.current.style.isolation = "isolate";
      const navEl = queryNavEl(rootElRef.current);
      if (navEl) {
        navEl.style.zIndex = "1";
      }
      currentMonthEls.forEach((currentMonthEl, index) => {
        const previousMonthEl = previousMonthEls[index];
        if (!previousMonthEl) {
          return;
        }
        currentMonthEl.style.position = "relative";
        currentMonthEl.style.overflow = "hidden";
        const captionEl = queryCaptionEl(currentMonthEl);
        if (captionEl) {
          captionEl.classList.add(captionAnimationClass);
        }
        const weeksEl = queryWeeksEl(currentMonthEl);
        if (weeksEl) {
          weeksEl.classList.add(weeksAnimationClass);
        }
        const cleanUp = () => {
          animatingRef.current = false;
          if (rootElRef.current) {
            rootElRef.current.style.isolation = "";
          }
          if (navEl) {
            navEl.style.zIndex = "";
          }
          if (captionEl) {
            captionEl.classList.remove(captionAnimationClass);
          }
          if (weeksEl) {
            weeksEl.classList.remove(weeksAnimationClass);
          }
          currentMonthEl.style.position = "";
          currentMonthEl.style.overflow = "";
          if (currentMonthEl.contains(previousMonthEl)) {
            currentMonthEl.removeChild(previousMonthEl);
          }
        };
        previousMonthEl.style.pointerEvents = "none";
        previousMonthEl.style.position = "absolute";
        previousMonthEl.style.overflow = "hidden";
        previousMonthEl.setAttribute("aria-hidden", "true");
        const previousWeekdaysEl = queryWeekdaysEl(previousMonthEl);
        if (previousWeekdaysEl) {
          previousWeekdaysEl.style.opacity = "0";
        }
        const previousCaptionEl = queryCaptionEl(previousMonthEl);
        if (previousCaptionEl) {
          previousCaptionEl.classList.add(isAfterPreviousMonth ? classNames[Animation.caption_before_exit] : classNames[Animation.caption_after_exit]);
          previousCaptionEl.addEventListener("animationend", cleanUp);
        }
        const previousWeeksEl = queryWeeksEl(previousMonthEl);
        if (previousWeeksEl) {
          previousWeeksEl.classList.add(isAfterPreviousMonth ? classNames[Animation.weeks_before_exit] : classNames[Animation.weeks_after_exit]);
        }
        currentMonthEl.insertBefore(previousMonthEl, currentMonthEl.firstChild);
      });
    }
  });
}
function getDates(displayMonths, maxDate, props, dateLib) {
  const firstMonth = displayMonths[0];
  const lastMonth = displayMonths[displayMonths.length - 1];
  const { ISOWeek, fixedWeeks, broadcastCalendar } = props ?? {};
  const { addDays: addDays2, differenceInCalendarDays: differenceInCalendarDays2, differenceInCalendarMonths: differenceInCalendarMonths2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfMonth: endOfMonth2, endOfWeek: endOfWeek2, isAfter: isAfter2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib;
  const startWeekFirstDate = broadcastCalendar ? startOfBroadcastWeek2(firstMonth, dateLib) : ISOWeek ? startOfISOWeek2(firstMonth) : startOfWeek2(firstMonth);
  const displayMonthsWeekEnd = broadcastCalendar ? endOfBroadcastWeek2(lastMonth) : ISOWeek ? endOfISOWeek2(endOfMonth2(lastMonth)) : endOfWeek2(endOfMonth2(lastMonth));
  const constraintWeekEnd = maxDate && (broadcastCalendar ? endOfBroadcastWeek2(maxDate) : ISOWeek ? endOfISOWeek2(maxDate) : endOfWeek2(maxDate));
  const gridEndDate = constraintWeekEnd && isAfter2(displayMonthsWeekEnd, constraintWeekEnd) ? constraintWeekEnd : displayMonthsWeekEnd;
  const nOfDays = differenceInCalendarDays2(gridEndDate, startWeekFirstDate);
  const nOfMonths = differenceInCalendarMonths2(lastMonth, firstMonth) + 1;
  const dates = [];
  for (let i = 0; i <= nOfDays; i++) {
    const date = addDays2(startWeekFirstDate, i);
    dates.push(date);
  }
  const nrOfDaysWithFixedWeeks = broadcastCalendar ? 35 : 42;
  const extraDates = nrOfDaysWithFixedWeeks * nOfMonths;
  if (fixedWeeks && dates.length < extraDates) {
    const daysToAdd = extraDates - dates.length;
    for (let i = 0; i < daysToAdd; i++) {
      const date = addDays2(dates[dates.length - 1], 1);
      dates.push(date);
    }
  }
  return dates;
}
function getDays(calendarMonths) {
  const initialDays = [];
  return calendarMonths.reduce((days, month) => {
    const weekDays = month.weeks.reduce((weekDays2, week) => {
      return weekDays2.concat(week.days.slice());
    }, initialDays.slice());
    return days.concat(weekDays.slice());
  }, initialDays.slice());
}
function getDisplayMonths(firstDisplayedMonth, calendarEndMonth, props, dateLib) {
  const { numberOfMonths = 1 } = props;
  const months = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const month = dateLib.addMonths(firstDisplayedMonth, i);
    if (calendarEndMonth && month > calendarEndMonth) {
      break;
    }
    months.push(month);
  }
  return months;
}
function getInitialMonth(props, navStart, navEnd, dateLib) {
  const { month, defaultMonth, today = dateLib.today(), numberOfMonths = 1 } = props;
  let initialMonth = month || defaultMonth || today;
  const { differenceInCalendarMonths: differenceInCalendarMonths2, addMonths: addMonths2, startOfMonth: startOfMonth2 } = dateLib;
  if (navEnd && differenceInCalendarMonths2(navEnd, initialMonth) < numberOfMonths - 1) {
    const offset = -1 * (numberOfMonths - 1);
    initialMonth = addMonths2(navEnd, offset);
  }
  if (navStart && differenceInCalendarMonths2(initialMonth, navStart) < 0) {
    initialMonth = navStart;
  }
  return startOfMonth2(initialMonth);
}
function getMonths(displayMonths, dates, props, dateLib) {
  const { addDays: addDays2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfMonth: endOfMonth2, endOfWeek: endOfWeek2, getISOWeek: getISOWeek2, getWeek: getWeek2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib;
  const dayPickerMonths = displayMonths.reduce((months, month) => {
    const firstDateOfFirstWeek = props.broadcastCalendar ? startOfBroadcastWeek2(month, dateLib) : props.ISOWeek ? startOfISOWeek2(month) : startOfWeek2(month);
    const lastDateOfLastWeek = props.broadcastCalendar ? endOfBroadcastWeek2(month) : props.ISOWeek ? endOfISOWeek2(endOfMonth2(month)) : endOfWeek2(endOfMonth2(month));
    const monthDates = dates.filter((date) => {
      return date >= firstDateOfFirstWeek && date <= lastDateOfLastWeek;
    });
    const nrOfDaysWithFixedWeeks = props.broadcastCalendar ? 35 : 42;
    if (props.fixedWeeks && monthDates.length < nrOfDaysWithFixedWeeks) {
      const extraDates = dates.filter((date) => {
        const daysToAdd = nrOfDaysWithFixedWeeks - monthDates.length;
        return date > lastDateOfLastWeek && date <= addDays2(lastDateOfLastWeek, daysToAdd);
      });
      monthDates.push(...extraDates);
    }
    const weeks = monthDates.reduce((weeks2, date) => {
      const weekNumber = props.ISOWeek ? getISOWeek2(date) : getWeek2(date);
      const week = weeks2.find((week2) => week2.weekNumber === weekNumber);
      const day = new CalendarDay(date, month, dateLib);
      if (!week) {
        weeks2.push(new CalendarWeek(weekNumber, [day]));
      } else {
        week.days.push(day);
      }
      return weeks2;
    }, []);
    const dayPickerMonth = new CalendarMonth(month, weeks);
    months.push(dayPickerMonth);
    return months;
  }, []);
  if (!props.reverseMonths) {
    return dayPickerMonths;
  } else {
    return dayPickerMonths.reverse();
  }
}
function getNavMonths(props, dateLib) {
  let { startMonth, endMonth } = props;
  const { startOfYear: startOfYear2, startOfDay: startOfDay2, startOfMonth: startOfMonth2, endOfMonth: endOfMonth2, addYears: addYears2, endOfYear: endOfYear2, today } = dateLib;
  const hasYearDropdown = props.captionLayout === "dropdown" || props.captionLayout === "dropdown-years";
  if (startMonth) {
    startMonth = startOfMonth2(startMonth);
  } else if (!startMonth && hasYearDropdown) {
    startMonth = startOfYear2(addYears2(props.today ?? today(), -100));
  }
  if (endMonth) {
    endMonth = endOfMonth2(endMonth);
  } else if (!endMonth && hasYearDropdown) {
    endMonth = endOfYear2(props.today ?? today());
  }
  return [
    startMonth ? startOfDay2(startMonth) : startMonth,
    endMonth ? startOfDay2(endMonth) : endMonth
  ];
}
function getNextMonth(firstDisplayedMonth, calendarEndMonth, options, dateLib) {
  if (options.disableNavigation) {
    return void 0;
  }
  const { pagedNavigation, numberOfMonths = 1 } = options;
  const { startOfMonth: startOfMonth2, addMonths: addMonths2, differenceInCalendarMonths: differenceInCalendarMonths2 } = dateLib;
  const offset = pagedNavigation ? numberOfMonths : 1;
  const month = startOfMonth2(firstDisplayedMonth);
  if (!calendarEndMonth) {
    return addMonths2(month, offset);
  }
  const monthsDiff = differenceInCalendarMonths2(calendarEndMonth, firstDisplayedMonth);
  if (monthsDiff < numberOfMonths) {
    return void 0;
  }
  return addMonths2(month, offset);
}
function getPreviousMonth(firstDisplayedMonth, calendarStartMonth, options, dateLib) {
  if (options.disableNavigation) {
    return void 0;
  }
  const { pagedNavigation, numberOfMonths } = options;
  const { startOfMonth: startOfMonth2, addMonths: addMonths2, differenceInCalendarMonths: differenceInCalendarMonths2 } = dateLib;
  const offset = pagedNavigation ? numberOfMonths ?? 1 : 1;
  const month = startOfMonth2(firstDisplayedMonth);
  if (!calendarStartMonth) {
    return addMonths2(month, -offset);
  }
  const monthsDiff = differenceInCalendarMonths2(month, calendarStartMonth);
  if (monthsDiff <= 0) {
    return void 0;
  }
  return addMonths2(month, -offset);
}
function getWeeks(months) {
  const initialWeeks = [];
  return months.reduce((weeks, month) => {
    return weeks.concat(month.weeks.slice());
  }, initialWeeks.slice());
}
function useControlledValue(defaultValue, controlledValue) {
  const [uncontrolledValue, setValue] = reactExports.useState(defaultValue);
  const value = controlledValue === void 0 ? uncontrolledValue : controlledValue;
  return [value, setValue];
}
function useCalendar(props, dateLib) {
  const [navStart, navEnd] = getNavMonths(props, dateLib);
  const { startOfMonth: startOfMonth2, endOfMonth: endOfMonth2 } = dateLib;
  const initialMonth = getInitialMonth(props, navStart, navEnd, dateLib);
  const [firstMonth, setFirstMonth] = useControlledValue(
    initialMonth,
    // initialMonth is always computed from props.month if provided
    props.month ? initialMonth : void 0
  );
  reactExports.useEffect(() => {
    const newInitialMonth = getInitialMonth(props, navStart, navEnd, dateLib);
    setFirstMonth(newInitialMonth);
  }, [props.timeZone]);
  const { months, weeks, days, previousMonth, nextMonth } = reactExports.useMemo(() => {
    const displayMonths = getDisplayMonths(firstMonth, navEnd, { numberOfMonths: props.numberOfMonths }, dateLib);
    const dates = getDates(displayMonths, props.endMonth ? endOfMonth2(props.endMonth) : void 0, {
      ISOWeek: props.ISOWeek,
      fixedWeeks: props.fixedWeeks,
      broadcastCalendar: props.broadcastCalendar
    }, dateLib);
    const months2 = getMonths(displayMonths, dates, {
      broadcastCalendar: props.broadcastCalendar,
      fixedWeeks: props.fixedWeeks,
      ISOWeek: props.ISOWeek,
      reverseMonths: props.reverseMonths
    }, dateLib);
    const weeks2 = getWeeks(months2);
    const days2 = getDays(months2);
    const previousMonth2 = getPreviousMonth(firstMonth, navStart, props, dateLib);
    const nextMonth2 = getNextMonth(firstMonth, navEnd, props, dateLib);
    return {
      months: months2,
      weeks: weeks2,
      days: days2,
      previousMonth: previousMonth2,
      nextMonth: nextMonth2
    };
  }, [
    dateLib,
    firstMonth.getTime(),
    navEnd?.getTime(),
    navStart?.getTime(),
    props.disableNavigation,
    props.broadcastCalendar,
    props.endMonth?.getTime(),
    props.fixedWeeks,
    props.ISOWeek,
    props.numberOfMonths,
    props.pagedNavigation,
    props.reverseMonths
  ]);
  const { disableNavigation, onMonthChange } = props;
  const isDayInCalendar = (day) => weeks.some((week) => week.days.some((d) => d.isEqualTo(day)));
  const goToMonth = (date) => {
    if (disableNavigation) {
      return;
    }
    let newMonth = startOfMonth2(date);
    if (navStart && newMonth < startOfMonth2(navStart)) {
      newMonth = startOfMonth2(navStart);
    }
    if (navEnd && newMonth > startOfMonth2(navEnd)) {
      newMonth = startOfMonth2(navEnd);
    }
    setFirstMonth(newMonth);
    onMonthChange?.(newMonth);
  };
  const goToDay = (day) => {
    if (isDayInCalendar(day)) {
      return;
    }
    goToMonth(day.date);
  };
  const calendar = {
    months,
    weeks,
    days,
    navStart,
    navEnd,
    previousMonth,
    nextMonth,
    goToMonth,
    goToDay
  };
  return calendar;
}
var FocusTargetPriority;
(function(FocusTargetPriority2) {
  FocusTargetPriority2[FocusTargetPriority2["Today"] = 0] = "Today";
  FocusTargetPriority2[FocusTargetPriority2["Selected"] = 1] = "Selected";
  FocusTargetPriority2[FocusTargetPriority2["LastFocused"] = 2] = "LastFocused";
  FocusTargetPriority2[FocusTargetPriority2["FocusedModifier"] = 3] = "FocusedModifier";
})(FocusTargetPriority || (FocusTargetPriority = {}));
function isFocusableDay(modifiers) {
  return !modifiers[DayFlag.disabled] && !modifiers[DayFlag.hidden] && !modifiers[DayFlag.outside];
}
function calculateFocusTarget(days, getModifiers, isSelected, lastFocused) {
  let focusTarget;
  let foundFocusTargetPriority = -1;
  for (const day of days) {
    const modifiers = getModifiers(day);
    if (isFocusableDay(modifiers)) {
      if (modifiers[DayFlag.focused] && foundFocusTargetPriority < FocusTargetPriority.FocusedModifier) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.FocusedModifier;
      } else if (lastFocused?.isEqualTo(day) && foundFocusTargetPriority < FocusTargetPriority.LastFocused) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.LastFocused;
      } else if (isSelected(day.date) && foundFocusTargetPriority < FocusTargetPriority.Selected) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.Selected;
      } else if (modifiers[DayFlag.today] && foundFocusTargetPriority < FocusTargetPriority.Today) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.Today;
      }
    }
  }
  if (!focusTarget) {
    focusTarget = days.find((day) => isFocusableDay(getModifiers(day)));
  }
  return focusTarget;
}
function getFocusableDate(moveBy, moveDir, refDate, navStart, navEnd, props, dateLib) {
  const { ISOWeek, broadcastCalendar } = props;
  const { addDays: addDays2, addMonths: addMonths2, addWeeks: addWeeks2, addYears: addYears2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfWeek: endOfWeek2, max: max2, min: min2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib;
  const moveFns = {
    day: addDays2,
    week: addWeeks2,
    month: addMonths2,
    year: addYears2,
    startOfWeek: (date) => broadcastCalendar ? startOfBroadcastWeek2(date, dateLib) : ISOWeek ? startOfISOWeek2(date) : startOfWeek2(date),
    endOfWeek: (date) => broadcastCalendar ? endOfBroadcastWeek2(date) : ISOWeek ? endOfISOWeek2(date) : endOfWeek2(date)
  };
  let focusableDate = moveFns[moveBy](refDate, moveDir === "after" ? 1 : -1);
  if (moveDir === "before" && navStart) {
    focusableDate = max2([navStart, focusableDate]);
  } else if (moveDir === "after" && navEnd) {
    focusableDate = min2([navEnd, focusableDate]);
  }
  return focusableDate;
}
function getNextFocus(moveBy, moveDir, refDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt = 0) {
  if (attempt > 365) {
    return void 0;
  }
  const focusableDate = getFocusableDate(moveBy, moveDir, refDay.date, calendarStartMonth, calendarEndMonth, props, dateLib);
  const isDisabled = Boolean(props.disabled && dateMatchModifiers(focusableDate, props.disabled, dateLib));
  const isHidden = Boolean(props.hidden && dateMatchModifiers(focusableDate, props.hidden, dateLib));
  const targetMonth = focusableDate;
  const focusDay = new CalendarDay(focusableDate, targetMonth, dateLib);
  if (!isDisabled && !isHidden) {
    return focusDay;
  }
  return getNextFocus(moveBy, moveDir, focusDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt + 1);
}
function useFocus(props, calendar, getModifiers, isSelected, dateLib) {
  const { autoFocus } = props;
  const [lastFocused, setLastFocused] = reactExports.useState();
  const focusTarget = calculateFocusTarget(calendar.days, getModifiers, isSelected || (() => false), lastFocused);
  const [focusedDay, setFocused] = reactExports.useState(autoFocus ? focusTarget : void 0);
  const blur = () => {
    setLastFocused(focusedDay);
    setFocused(void 0);
  };
  const moveFocus = (moveBy, moveDir) => {
    if (!focusedDay)
      return;
    const nextFocus = getNextFocus(moveBy, moveDir, focusedDay, calendar.navStart, calendar.navEnd, props, dateLib);
    if (!nextFocus)
      return;
    if (props.disableNavigation) {
      const isNextInCalendar = calendar.days.some((day) => day.isEqualTo(nextFocus));
      if (!isNextInCalendar) {
        return;
      }
    }
    calendar.goToDay(nextFocus);
    setFocused(nextFocus);
  };
  const isFocusTarget = (day) => {
    return Boolean(focusTarget?.isEqualTo(day));
  };
  const useFocus2 = {
    isFocusTarget,
    setFocused,
    focused: focusedDay,
    blur,
    moveFocus
  };
  return useFocus2;
}
function useMulti(props, dateLib) {
  const { selected: initiallySelected, required, onSelect } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const { isSameDay: isSameDay2 } = dateLib;
  const isSelected = (date) => {
    return selected?.some((d) => isSameDay2(d, date)) ?? false;
  };
  const { min: min2, max: max2 } = props;
  const select = (triggerDate, modifiers, e) => {
    let newDates = [...selected ?? []];
    if (isSelected(triggerDate)) {
      if (selected?.length === min2) {
        return;
      }
      if (required && selected?.length === 1) {
        return;
      }
      newDates = selected?.filter((d) => !isSameDay2(d, triggerDate));
    } else {
      if (selected?.length === max2) {
        newDates = [triggerDate];
      } else {
        newDates = [...newDates, triggerDate];
      }
    }
    if (!onSelect) {
      setSelected(newDates);
    }
    onSelect?.(newDates, triggerDate, modifiers, e);
    return newDates;
  };
  return {
    selected,
    select,
    isSelected
  };
}
function addToRange(date, initialRange, min2 = 0, max2 = 0, required = false, dateLib = defaultDateLib) {
  const { from, to } = initialRange || {};
  const { isSameDay: isSameDay2, isAfter: isAfter2, isBefore: isBefore2 } = dateLib;
  let range;
  if (!from && !to) {
    range = { from: date, to: min2 > 0 ? void 0 : date };
  } else if (from && !to) {
    if (isSameDay2(from, date)) {
      if (min2 === 0) {
        range = { from, to: date };
      } else if (required) {
        range = { from, to: void 0 };
      } else {
        range = void 0;
      }
    } else if (isBefore2(date, from)) {
      range = { from: date, to: from };
    } else {
      range = { from, to: date };
    }
  } else if (from && to) {
    if (isSameDay2(from, date) && isSameDay2(to, date)) {
      if (required) {
        range = { from, to };
      } else {
        range = void 0;
      }
    } else if (isSameDay2(from, date)) {
      range = { from, to: min2 > 0 ? void 0 : date };
    } else if (isSameDay2(to, date)) {
      range = { from: date, to: min2 > 0 ? void 0 : date };
    } else if (isBefore2(date, from)) {
      range = { from: date, to };
    } else if (isAfter2(date, from)) {
      range = { from, to: date };
    } else if (isAfter2(date, to)) {
      range = { from, to: date };
    } else {
      throw new Error("Invalid range");
    }
  }
  if (range?.from && range?.to) {
    const diff = dateLib.differenceInCalendarDays(range.to, range.from);
    if (max2 > 0 && diff > max2) {
      range = { from: date, to: void 0 };
    } else if (min2 > 1 && diff < min2) {
      range = { from: date, to: void 0 };
    }
  }
  return range;
}
function rangeContainsDayOfWeek(range, dayOfWeek, dateLib = defaultDateLib) {
  const dayOfWeekArr = !Array.isArray(dayOfWeek) ? [dayOfWeek] : dayOfWeek;
  let date = range.from;
  const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
  const totalDaysLimit = Math.min(totalDays, 6);
  for (let i = 0; i <= totalDaysLimit; i++) {
    if (dayOfWeekArr.includes(date.getDay())) {
      return true;
    }
    date = dateLib.addDays(date, 1);
  }
  return false;
}
function rangeOverlaps(rangeLeft, rangeRight, dateLib = defaultDateLib) {
  return rangeIncludesDate(rangeLeft, rangeRight.from, false, dateLib) || rangeIncludesDate(rangeLeft, rangeRight.to, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.from, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.to, false, dateLib);
}
function rangeContainsModifiers(range, modifiers, dateLib = defaultDateLib) {
  const matchers = Array.isArray(modifiers) ? modifiers : [modifiers];
  const nonFunctionMatchers = matchers.filter((matcher) => typeof matcher !== "function");
  const nonFunctionMatchersResult = nonFunctionMatchers.some((matcher) => {
    if (typeof matcher === "boolean")
      return matcher;
    if (dateLib.isDate(matcher)) {
      return rangeIncludesDate(range, matcher, false, dateLib);
    }
    if (isDatesArray(matcher, dateLib)) {
      return matcher.some((date) => rangeIncludesDate(range, date, false, dateLib));
    }
    if (isDateRange(matcher)) {
      if (matcher.from && matcher.to) {
        return rangeOverlaps(range, { from: matcher.from, to: matcher.to }, dateLib);
      }
      return false;
    }
    if (isDayOfWeekType(matcher)) {
      return rangeContainsDayOfWeek(range, matcher.dayOfWeek, dateLib);
    }
    if (isDateInterval(matcher)) {
      const isClosedInterval = dateLib.isAfter(matcher.before, matcher.after);
      if (isClosedInterval) {
        return rangeOverlaps(range, {
          from: dateLib.addDays(matcher.after, 1),
          to: dateLib.addDays(matcher.before, -1)
        }, dateLib);
      }
      return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
    }
    if (isDateAfterType(matcher) || isDateBeforeType(matcher)) {
      return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
    }
    return false;
  });
  if (nonFunctionMatchersResult) {
    return true;
  }
  const functionMatchers = matchers.filter((matcher) => typeof matcher === "function");
  if (functionMatchers.length) {
    let date = range.from;
    const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
    for (let i = 0; i <= totalDays; i++) {
      if (functionMatchers.some((matcher) => matcher(date))) {
        return true;
      }
      date = dateLib.addDays(date, 1);
    }
  }
  return false;
}
function useRange(props, dateLib) {
  const { disabled, excludeDisabled, resetOnSelect, selected: initiallySelected, required, onSelect } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const isSelected = (date) => selected && rangeIncludesDate(selected, date, false, dateLib);
  const select = (triggerDate, modifiers, e) => {
    const { min: min2, max: max2 } = props;
    let newRange;
    if (triggerDate) {
      const selectedFrom = selected?.from;
      const selectedTo = selected?.to;
      const hasFullRange = !!selectedFrom && !!selectedTo;
      const isClickingSingleDayRange = !!selectedFrom && !!selectedTo && dateLib.isSameDay(selectedFrom, selectedTo) && dateLib.isSameDay(triggerDate, selectedFrom);
      if (resetOnSelect && (hasFullRange || !selected?.from)) {
        if (!required && isClickingSingleDayRange) {
          newRange = void 0;
        } else {
          newRange = { from: triggerDate, to: void 0 };
        }
      } else {
        newRange = addToRange(triggerDate, selected, min2, max2, required, dateLib);
      }
    }
    if (excludeDisabled && disabled && newRange?.from && newRange.to) {
      if (rangeContainsModifiers({ from: newRange.from, to: newRange.to }, disabled, dateLib)) {
        newRange.from = triggerDate;
        newRange.to = void 0;
      }
    }
    if (!onSelect) {
      setSelected(newRange);
    }
    onSelect?.(newRange, triggerDate, modifiers, e);
    return newRange;
  };
  return {
    selected,
    select,
    isSelected
  };
}
function useSingle(props, dateLib) {
  const { selected: initiallySelected, required, onSelect } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const { isSameDay: isSameDay2 } = dateLib;
  const isSelected = (compareDate) => {
    return selected ? isSameDay2(selected, compareDate) : false;
  };
  const select = (triggerDate, modifiers, e) => {
    let newDate = triggerDate;
    if (!required && selected && selected && isSameDay2(triggerDate, selected)) {
      newDate = void 0;
    }
    if (!onSelect) {
      setSelected(newDate);
    }
    if (required) {
      onSelect?.(newDate, triggerDate, modifiers, e);
    } else {
      onSelect?.(newDate, triggerDate, modifiers, e);
    }
    return newDate;
  };
  return {
    selected,
    select,
    isSelected
  };
}
function useSelection(props, dateLib) {
  const single = useSingle(props, dateLib);
  const multi = useMulti(props, dateLib);
  const range = useRange(props, dateLib);
  switch (props.mode) {
    case "single":
      return single;
    case "multiple":
      return multi;
    case "range":
      return range;
    default:
      return void 0;
  }
}
function toTimeZone(date, timeZone) {
  if (date instanceof TZDate && date.timeZone === timeZone) {
    return date;
  }
  return new TZDate(date, timeZone);
}
function toZoneNoon(date, timeZone, noonSafe) {
  return toTimeZone(date, timeZone);
}
function convertMatcher(matcher, timeZone, noonSafe) {
  if (typeof matcher === "boolean" || typeof matcher === "function") {
    return matcher;
  }
  if (matcher instanceof Date) {
    return toZoneNoon(matcher, timeZone);
  }
  if (Array.isArray(matcher)) {
    return matcher.map((value) => value instanceof Date ? toZoneNoon(value, timeZone) : value);
  }
  if (isDateRange(matcher)) {
    return {
      ...matcher,
      from: matcher.from ? toTimeZone(matcher.from, timeZone) : matcher.from,
      to: matcher.to ? toTimeZone(matcher.to, timeZone) : matcher.to
    };
  }
  if (isDateInterval(matcher)) {
    return {
      before: toZoneNoon(matcher.before, timeZone),
      after: toZoneNoon(matcher.after, timeZone)
    };
  }
  if (isDateAfterType(matcher)) {
    return {
      after: toZoneNoon(matcher.after, timeZone)
    };
  }
  if (isDateBeforeType(matcher)) {
    return {
      before: toZoneNoon(matcher.before, timeZone)
    };
  }
  return matcher;
}
function convertMatchersToTimeZone(matchers, timeZone, noonSafe) {
  if (!matchers) {
    return matchers;
  }
  if (Array.isArray(matchers)) {
    return matchers.map((matcher) => convertMatcher(matcher, timeZone));
  }
  return convertMatcher(matchers, timeZone);
}
function DayPicker(initialProps) {
  let props = initialProps;
  const timeZone = props.timeZone;
  if (timeZone) {
    props = {
      ...initialProps,
      timeZone
    };
    if (props.today) {
      props.today = toTimeZone(props.today, timeZone);
    }
    if (props.month) {
      props.month = toTimeZone(props.month, timeZone);
    }
    if (props.defaultMonth) {
      props.defaultMonth = toTimeZone(props.defaultMonth, timeZone);
    }
    if (props.startMonth) {
      props.startMonth = toTimeZone(props.startMonth, timeZone);
    }
    if (props.endMonth) {
      props.endMonth = toTimeZone(props.endMonth, timeZone);
    }
    if (props.mode === "single" && props.selected) {
      props.selected = toTimeZone(props.selected, timeZone);
    } else if (props.mode === "multiple" && props.selected) {
      props.selected = props.selected?.map((date) => toTimeZone(date, timeZone));
    } else if (props.mode === "range" && props.selected) {
      props.selected = {
        from: props.selected.from ? toTimeZone(props.selected.from, timeZone) : props.selected.from,
        to: props.selected.to ? toTimeZone(props.selected.to, timeZone) : props.selected.to
      };
    }
    if (props.disabled !== void 0) {
      props.disabled = convertMatchersToTimeZone(props.disabled, timeZone);
    }
    if (props.hidden !== void 0) {
      props.hidden = convertMatchersToTimeZone(props.hidden, timeZone);
    }
    if (props.modifiers) {
      const nextModifiers = {};
      Object.keys(props.modifiers).forEach((key) => {
        nextModifiers[key] = convertMatchersToTimeZone(props.modifiers?.[key], timeZone);
      });
      props.modifiers = nextModifiers;
    }
  }
  const { components: components2, formatters: formatters2, labels, dateLib, locale, classNames } = reactExports.useMemo(() => {
    const locale2 = { ...enUS, ...props.locale };
    const weekStartsOn = props.broadcastCalendar ? 1 : props.weekStartsOn;
    const noonOverrides = props.noonSafe && props.timeZone ? createNoonOverrides(props.timeZone, {
      weekStartsOn,
      locale: locale2
    }) : void 0;
    const overrides = props.dateLib && noonOverrides ? { ...noonOverrides, ...props.dateLib } : props.dateLib ?? noonOverrides;
    const dateLib2 = new DateLib({
      locale: locale2,
      weekStartsOn,
      firstWeekContainsDate: props.firstWeekContainsDate,
      useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: props.useAdditionalDayOfYearTokens,
      timeZone: props.timeZone,
      numerals: props.numerals
    }, overrides);
    return {
      dateLib: dateLib2,
      components: getComponents(props.components),
      formatters: getFormatters(props.formatters),
      labels: getLabels(props.labels, dateLib2.options),
      locale: locale2,
      classNames: { ...getDefaultClassNames(), ...props.classNames }
    };
  }, [
    props.locale,
    props.broadcastCalendar,
    props.weekStartsOn,
    props.firstWeekContainsDate,
    props.useAdditionalWeekYearTokens,
    props.useAdditionalDayOfYearTokens,
    props.timeZone,
    props.numerals,
    props.dateLib,
    props.noonSafe,
    props.components,
    props.formatters,
    props.labels,
    props.classNames
  ]);
  if (!props.today) {
    props = { ...props, today: dateLib.today() };
  }
  const { captionLayout, mode, navLayout, numberOfMonths = 1, onDayBlur, onDayClick, onDayFocus, onDayKeyDown, onDayMouseEnter, onDayMouseLeave, onNextClick, onPrevClick, showWeekNumber, styles } = props;
  const { formatCaption: formatCaption2, formatDay: formatDay2, formatMonthDropdown: formatMonthDropdown2, formatWeekNumber: formatWeekNumber2, formatWeekNumberHeader: formatWeekNumberHeader2, formatWeekdayName: formatWeekdayName2, formatYearDropdown: formatYearDropdown2 } = formatters2;
  const calendar = useCalendar(props, dateLib);
  const { days, months, navStart, navEnd, previousMonth, nextMonth, goToMonth } = calendar;
  const getModifiers = createGetModifiers(days, props, navStart, navEnd, dateLib);
  const { isSelected, select, selected: selectedValue } = useSelection(props, dateLib) ?? {};
  const { blur, focused, isFocusTarget, moveFocus, setFocused } = useFocus(props, calendar, getModifiers, isSelected ?? (() => false), dateLib);
  const { labelDayButton: labelDayButton2, labelGridcell: labelGridcell2, labelGrid: labelGrid2, labelMonthDropdown: labelMonthDropdown2, labelNav: labelNav2, labelPrevious: labelPrevious2, labelNext: labelNext2, labelWeekday: labelWeekday2, labelWeekNumber: labelWeekNumber2, labelWeekNumberHeader: labelWeekNumberHeader2, labelYearDropdown: labelYearDropdown2 } = labels;
  const weekdays = reactExports.useMemo(() => getWeekdays(dateLib, props.ISOWeek, props.broadcastCalendar, props.today), [dateLib, props.ISOWeek, props.broadcastCalendar, props.today]);
  const isInteractive = mode !== void 0 || onDayClick !== void 0;
  const handlePreviousClick = reactExports.useCallback(() => {
    if (!previousMonth)
      return;
    goToMonth(previousMonth);
    onPrevClick?.(previousMonth);
  }, [previousMonth, goToMonth, onPrevClick]);
  const handleNextClick = reactExports.useCallback(() => {
    if (!nextMonth)
      return;
    goToMonth(nextMonth);
    onNextClick?.(nextMonth);
  }, [goToMonth, nextMonth, onNextClick]);
  const handleDayClick = reactExports.useCallback((day, m) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFocused(day);
    if (m.disabled) {
      return;
    }
    select?.(day.date, m, e);
    onDayClick?.(day.date, m, e);
  }, [select, onDayClick, setFocused]);
  const handleDayFocus = reactExports.useCallback((day, m) => (e) => {
    setFocused(day);
    onDayFocus?.(day.date, m, e);
  }, [onDayFocus, setFocused]);
  const handleDayBlur = reactExports.useCallback((day, m) => (e) => {
    blur();
    onDayBlur?.(day.date, m, e);
  }, [blur, onDayBlur]);
  const handleDayKeyDown = reactExports.useCallback((day, modifiers) => (e) => {
    const keyMap = {
      ArrowLeft: [
        e.shiftKey ? "month" : "day",
        props.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        e.shiftKey ? "month" : "day",
        props.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [e.shiftKey ? "year" : "week", "after"],
      ArrowUp: [e.shiftKey ? "year" : "week", "before"],
      PageUp: [e.shiftKey ? "year" : "month", "before"],
      PageDown: [e.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (keyMap[e.key]) {
      e.preventDefault();
      e.stopPropagation();
      const [moveBy, moveDir] = keyMap[e.key];
      moveFocus(moveBy, moveDir);
    }
    onDayKeyDown?.(day.date, modifiers, e);
  }, [moveFocus, onDayKeyDown, props.dir]);
  const handleDayMouseEnter = reactExports.useCallback((day, modifiers) => (e) => {
    onDayMouseEnter?.(day.date, modifiers, e);
  }, [onDayMouseEnter]);
  const handleDayMouseLeave = reactExports.useCallback((day, modifiers) => (e) => {
    onDayMouseLeave?.(day.date, modifiers, e);
  }, [onDayMouseLeave]);
  const handleMonthChange = reactExports.useCallback((date, monthOffset) => (e) => {
    const selectedMonth = Number(e.target.value);
    const month = dateLib.setMonth(dateLib.startOfMonth(date), selectedMonth);
    goToMonth(dateLib.addMonths(month, -monthOffset));
  }, [dateLib, goToMonth]);
  const handleYearChange = reactExports.useCallback((date, monthOffset) => (e) => {
    const selectedYear = Number(e.target.value);
    const month = dateLib.setYear(dateLib.startOfMonth(date), selectedYear);
    goToMonth(dateLib.addMonths(month, -monthOffset));
  }, [dateLib, goToMonth]);
  const { className, style } = reactExports.useMemo(() => ({
    className: [classNames[UI.Root], props.className].filter(Boolean).join(" "),
    style: { ...styles?.[UI.Root], ...props.style }
  }), [classNames, props.className, props.style, styles]);
  const dataAttributes = getDataAttributes(props);
  const getDropdownStyle = (dropdown) => {
    const dropdownStyle = styles?.[UI.Dropdown];
    const specificDropdownStyle = styles?.[dropdown];
    if (!dropdownStyle && !specificDropdownStyle) {
      return void 0;
    }
    return {
      ...dropdownStyle,
      ...specificDropdownStyle
    };
  };
  const rootElRef = reactExports.useRef(null);
  useAnimation(rootElRef, Boolean(props.animate), {
    classNames,
    months,
    focused,
    dateLib
  });
  const contextValue = {
    dayPickerProps: props,
    selected: selectedValue,
    select,
    isSelected,
    months,
    nextMonth,
    previousMonth,
    goToMonth,
    getModifiers,
    components: components2,
    classNames,
    styles,
    labels,
    formatters: formatters2
  };
  return React3.createElement(
    dayPickerContext.Provider,
    { value: contextValue },
    React3.createElement(
      components2.Root,
      { rootRef: props.animate ? rootElRef : void 0, className, style, dir: props.dir, id: props.id, lang: props.lang ?? locale.code, nonce: props.nonce, title: props.title, role: props.role, "aria-label": props["aria-label"], "aria-labelledby": props["aria-labelledby"], ...dataAttributes },
      React3.createElement(
        components2.Months,
        { className: classNames[UI.Months], style: styles?.[UI.Months] },
        !props.hideNavigation && !navLayout && React3.createElement(components2.Nav, { "data-animated-nav": props.animate ? "true" : void 0, className: classNames[UI.Nav], style: styles?.[UI.Nav], "aria-label": labelNav2(), onPreviousClick: handlePreviousClick, onNextClick: handleNextClick, previousMonth, nextMonth }),
        months.map((calendarMonth, displayIndex) => {
          const monthOffset = props.reverseMonths ? months.length - 1 - displayIndex : displayIndex;
          return React3.createElement(
            components2.Month,
            {
              "data-animated-month": props.animate ? "true" : void 0,
              className: classNames[UI.Month],
              style: styles?.[UI.Month],
              // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
              key: displayIndex,
              displayIndex,
              calendarMonth
            },
            navLayout === "around" && !props.hideNavigation && displayIndex === 0 && React3.createElement(
              components2.PreviousMonthButton,
              { type: "button", className: classNames[UI.PreviousMonthButton], style: styles?.[UI.PreviousMonthButton], tabIndex: previousMonth ? void 0 : -1, "aria-disabled": previousMonth ? void 0 : true, "aria-label": labelPrevious2(previousMonth), onClick: handlePreviousClick, "data-animated-button": props.animate ? "true" : void 0 },
              React3.createElement(components2.Chevron, { disabled: previousMonth ? void 0 : true, className: classNames[UI.Chevron], style: styles?.[UI.Chevron], orientation: props.dir === "rtl" ? "right" : "left" })
            ),
            React3.createElement(components2.MonthCaption, { "data-animated-caption": props.animate ? "true" : void 0, className: classNames[UI.MonthCaption], style: styles?.[UI.MonthCaption], calendarMonth, displayIndex }, captionLayout?.startsWith("dropdown") ? React3.createElement(
              components2.DropdownNav,
              { className: classNames[UI.Dropdowns], style: styles?.[UI.Dropdowns] },
              (() => {
                const monthControl = captionLayout === "dropdown" || captionLayout === "dropdown-months" ? React3.createElement(components2.MonthsDropdown, { key: "month", className: classNames[UI.MonthsDropdown], "aria-label": labelMonthDropdown2(), disabled: Boolean(props.disableNavigation), onChange: handleMonthChange(calendarMonth.date, monthOffset), options: getMonthOptions(calendarMonth.date, navStart, navEnd, formatters2, dateLib), style: getDropdownStyle(UI.MonthsDropdown), value: dateLib.getMonth(calendarMonth.date) }) : React3.createElement("span", { key: "month" }, formatMonthDropdown2(calendarMonth.date, dateLib));
                const yearControl = captionLayout === "dropdown" || captionLayout === "dropdown-years" ? React3.createElement(components2.YearsDropdown, { key: "year", className: classNames[UI.YearsDropdown], "aria-label": labelYearDropdown2(dateLib.options), disabled: Boolean(props.disableNavigation), onChange: handleYearChange(calendarMonth.date, monthOffset), options: getYearOptions(navStart, navEnd, formatters2, dateLib, Boolean(props.reverseYears)), style: getDropdownStyle(UI.YearsDropdown), value: dateLib.getYear(calendarMonth.date) }) : React3.createElement("span", { key: "year" }, formatYearDropdown2(calendarMonth.date, dateLib));
                const controls = dateLib.getMonthYearOrder() === "year-first" ? [yearControl, monthControl] : [monthControl, yearControl];
                return controls;
              })(),
              React3.createElement("span", { role: "status", "aria-live": "polite", style: {
                border: 0,
                clip: "rect(0 0 0 0)",
                height: "1px",
                margin: "-1px",
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                width: "1px",
                whiteSpace: "nowrap",
                wordWrap: "normal"
              } }, formatCaption2(calendarMonth.date, dateLib.options, dateLib))
            ) : React3.createElement(components2.CaptionLabel, { className: classNames[UI.CaptionLabel], style: styles?.[UI.CaptionLabel], role: "status", "aria-live": "polite" }, formatCaption2(calendarMonth.date, dateLib.options, dateLib))),
            navLayout === "around" && !props.hideNavigation && displayIndex === numberOfMonths - 1 && React3.createElement(
              components2.NextMonthButton,
              { type: "button", className: classNames[UI.NextMonthButton], style: styles?.[UI.NextMonthButton], tabIndex: nextMonth ? void 0 : -1, "aria-disabled": nextMonth ? void 0 : true, "aria-label": labelNext2(nextMonth), onClick: handleNextClick, "data-animated-button": props.animate ? "true" : void 0 },
              React3.createElement(components2.Chevron, { disabled: nextMonth ? void 0 : true, className: classNames[UI.Chevron], style: styles?.[UI.Chevron], orientation: props.dir === "rtl" ? "left" : "right" })
            ),
            displayIndex === numberOfMonths - 1 && navLayout === "after" && !props.hideNavigation && React3.createElement(components2.Nav, { "data-animated-nav": props.animate ? "true" : void 0, className: classNames[UI.Nav], style: styles?.[UI.Nav], "aria-label": labelNav2(), onPreviousClick: handlePreviousClick, onNextClick: handleNextClick, previousMonth, nextMonth }),
            React3.createElement(
              components2.MonthGrid,
              { role: "grid", "aria-multiselectable": mode === "multiple" || mode === "range", "aria-label": labelGrid2(calendarMonth.date, dateLib.options, dateLib) || void 0, className: classNames[UI.MonthGrid], style: styles?.[UI.MonthGrid] },
              !props.hideWeekdays && React3.createElement(
                components2.Weekdays,
                { "data-animated-weekdays": props.animate ? "true" : void 0, className: classNames[UI.Weekdays], style: styles?.[UI.Weekdays] },
                showWeekNumber && React3.createElement(components2.WeekNumberHeader, { "aria-label": labelWeekNumberHeader2(dateLib.options), className: classNames[UI.WeekNumberHeader], style: styles?.[UI.WeekNumberHeader], scope: "col" }, formatWeekNumberHeader2()),
                weekdays.map((weekday) => React3.createElement(components2.Weekday, { "aria-label": labelWeekday2(weekday, dateLib.options, dateLib), className: classNames[UI.Weekday], key: String(weekday), style: styles?.[UI.Weekday], scope: "col" }, formatWeekdayName2(weekday, dateLib.options, dateLib)))
              ),
              React3.createElement(components2.Weeks, { "data-animated-weeks": props.animate ? "true" : void 0, className: classNames[UI.Weeks], style: styles?.[UI.Weeks] }, calendarMonth.weeks.map((week) => {
                return React3.createElement(
                  components2.Week,
                  { className: classNames[UI.Week], key: week.weekNumber, style: styles?.[UI.Week], week },
                  showWeekNumber && React3.createElement(components2.WeekNumber, { week, style: styles?.[UI.WeekNumber], "aria-label": labelWeekNumber2(week.weekNumber, {
                    locale
                  }), className: classNames[UI.WeekNumber], scope: "row", role: "rowheader" }, formatWeekNumber2(week.weekNumber, dateLib)),
                  week.days.map((day) => {
                    const { date } = day;
                    const modifiers = getModifiers(day);
                    modifiers[DayFlag.focused] = !modifiers.hidden && Boolean(focused?.isEqualTo(day));
                    modifiers[SelectionState.selected] = isSelected?.(date) || modifiers.selected;
                    if (isDateRange(selectedValue)) {
                      const { from, to } = selectedValue;
                      modifiers[SelectionState.range_start] = Boolean(from && to && dateLib.isSameDay(date, from));
                      modifiers[SelectionState.range_end] = Boolean(from && to && dateLib.isSameDay(date, to));
                      modifiers[SelectionState.range_middle] = rangeIncludesDate(selectedValue, date, true, dateLib);
                    }
                    const style2 = getStyleForModifiers(modifiers, styles, props.modifiersStyles);
                    const className2 = getClassNamesForModifiers(modifiers, classNames, props.modifiersClassNames);
                    const ariaLabel = !isInteractive && !modifiers.hidden ? labelGridcell2(date, modifiers, dateLib.options, dateLib) : void 0;
                    return React3.createElement(components2.Day, { key: `${day.isoDate}_${day.displayMonthId}`, day, modifiers, className: className2.join(" "), style: style2, role: "gridcell", "aria-selected": modifiers.selected || void 0, "aria-label": ariaLabel, "data-day": day.isoDate, "data-month": day.outside ? day.dateMonthId : void 0, "data-selected": modifiers.selected || void 0, "data-disabled": modifiers.disabled || void 0, "data-hidden": modifiers.hidden || void 0, "data-outside": day.outside || void 0, "data-focused": modifiers.focused || void 0, "data-today": modifiers.today || void 0 }, !modifiers.hidden && isInteractive ? React3.createElement(components2.DayButton, { className: classNames[UI.DayButton], style: styles?.[UI.DayButton], type: "button", day, modifiers, disabled: !modifiers.focused && modifiers.disabled || void 0, "aria-disabled": modifiers.focused && modifiers.disabled || void 0, tabIndex: isFocusTarget(day) ? 0 : -1, "aria-label": labelDayButton2(date, modifiers, dateLib.options, dateLib), onClick: handleDayClick(day, modifiers), onBlur: handleDayBlur(day, modifiers), onFocus: handleDayFocus(day, modifiers), onKeyDown: handleDayKeyDown(day, modifiers), onMouseEnter: handleDayMouseEnter(day, modifiers), onMouseLeave: handleDayMouseLeave(day, modifiers) }, formatDay2(date, dateLib.options, dateLib)) : !modifiers.hidden && formatDay2(day.date, dateLib.options, dateLib));
                  })
                );
              }))
            )
          );
        })
      ),
      props.footer && React3.createElement(components2.Footer, { className: classNames[UI.Footer], style: styles?.[UI.Footer], role: "status", "aria-live": "polite" }, props.footer)
    )
  );
}
const zhCN = {
  ...zhCN$1,
  labels: {
    labelDayButton: (date, modifiers, options, dateLib) => {
      const lib = dateLib ?? new DateLib(options);
      let label = lib.format(date, "PPPP");
      if (modifiers.today)
        label = `今天，${label}`;
      if (modifiers.selected)
        label = `${label}，已选择`;
      return label;
    },
    labelMonthDropdown: "选择月份",
    labelNext: "前往下个月",
    labelPrevious: "前往上个月",
    labelWeekNumber: (weekNumber) => `第 ${weekNumber} 周`,
    labelYearDropdown: "选择年份",
    labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
    labelGridcell: (date, modifiers, options, dateLib) => {
      const lib = dateLib ?? new DateLib(options);
      let label = lib.format(date, "PPPP");
      if (modifiers?.today) {
        label = `今天，${label}`;
      }
      return label;
    },
    labelNav: "导航栏",
    labelWeekNumberHeader: "周数",
    labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
  }
};
const buttonClassNames = "relative flex size-(--cell-size) text-base sm:text-sm items-center justify-center rounded-lg not-in-data-selected:hover:bg-accent disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  mode = "single",
  locale,
  ...props
}) {
  const { code } = useUILocale();
  const calendarLocale = locale ?? (code === "zh-CN" ? zhCN : enUS);
  const defaultClassNames = {
    button_next: buttonClassNames,
    button_previous: buttonClassNames,
    caption_label: "text-base sm:text-sm font-medium flex items-center gap-2 h-full",
    day: "size-(--cell-size) text-sm py-px",
    day_button: cn(
      buttonClassNames,
      "in-data-disabled:pointer-events-none in-[.range-middle]:rounded-none in-[.range-end:not(.range-start)]:rounded-s-none in-[.range-start:not(.range-end)]:rounded-e-none in-[.range-middle]:in-data-selected:bg-accent in-data-selected:bg-primary in-[.range-middle]:in-data-selected:text-foreground in-data-disabled:text-muted-foreground/72 in-data-outside:text-muted-foreground in-data-selected:in-data-outside:text-primary-foreground in-data-selected:text-primary-foreground in-data-disabled:line-through outline-none in-[[data-selected]:not(.range-middle)]:transition-[border-radius,box-shadow] focus-visible:z-1 focus-visible:ring-[3px] focus-visible:ring-ring/50"
    ),
    dropdown: "absolute bg-popover inset-0 opacity-0",
    dropdown_root: "relative has-focus-visible:border-ring has-focus-visible:ring-ring/24 has-focus-visible:ring-[3px] border border-input bg-background not-dark:bg-clip-padding dark:bg-input/32 shadow-xs/5 rounded-lg px-[calc(--spacing(3)-1px)] h-9 sm:h-8 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-me-1",
    dropdowns: "w-full flex items-center text-base sm:text-sm justify-center h-(--cell-size) gap-1.5 *:[span]:font-medium",
    hidden: "invisible",
    month: "w-full",
    month_caption: "relative mx-(--cell-size) px-1 mb-1 flex h-(--cell-size) items-center justify-center z-2",
    months: "relative -m-0.5 flex flex-col gap-2 sm:flex-row",
    nav: "absolute top-0 flex w-full justify-between z-1",
    outside: "text-muted-foreground data-selected:bg-accent/50 data-selected:text-muted-foreground",
    range_end: "range-end",
    range_middle: "range-middle",
    range_start: "range-start",
    today: "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-1 *:after:size-[3px] *:after:-translate-x-1/2 rtl:*:after:translate-x-1/2 *:after:rounded-full *:after:bg-primary [&[data-selected]:not(.range-middle)>*]:after:bg-background [&[data-disabled]>*]:after:bg-foreground/30",
    week_number: "size-(--cell-size) p-0 text-xs font-medium text-muted-foreground",
    weekday: "size-(--cell-size) p-0 text-xs font-medium text-muted-foreground"
  };
  const mergedClassNames = Object.keys(
    defaultClassNames
  ).reduce(
    (acc, key) => {
      const userClass = classNames?.[key];
      const baseClass = defaultClassNames[key];
      acc[key] = userClass ? cn(baseClass, userClass) : baseClass;
      return acc;
    },
    { ...defaultClassNames }
  );
  const defaultComponents = {
    Chevron: ({
      className: className2,
      orientation,
      ...props2
    }) => {
      if (orientation === "left") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronLeft,
          {
            className: cn(className2, "rtl:rotate-180"),
            ...props2,
            "aria-hidden": "true"
          }
        );
      }
      if (orientation === "right") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronRight,
          {
            className: cn(className2, "rtl:rotate-180"),
            ...props2,
            "aria-hidden": "true"
          }
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChevronsUpDown,
        {
          className: className2,
          ...props2,
          "aria-hidden": "true"
        }
      );
    }
  };
  const mergedComponents = {
    ...defaultComponents,
    ...userComponents
  };
  const dayPickerProps = {
    className: cn(
      "w-fit text-foreground [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(9)] pointer-coarse:[--cell-size:var(--qy-touch-target)]",
      className
    ),
    classNames: mergedClassNames,
    components: mergedComponents,
    "data-slot": "calendar",
    locale: calendarLocale,
    lang: calendarLocale.code,
    mode,
    showOutsideDays,
    ...props
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DayPicker,
    {
      ...dayPickerProps
    }
  );
}
export {
  Calendar as C
};
