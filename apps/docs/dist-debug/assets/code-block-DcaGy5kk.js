import { q as useUILocale, r as reactExports, j as jsxRuntimeExports, T as Tooltip, v as TooltipTrigger, C as Check, B as Button, e as cn, w as TooltipPopup, t as toastManager } from "./index-DM02Iz28.js";
import { C as Copy } from "./copy-CMgYpHr5.js";
const TokenTypes = (
  /** @type {const} */
  "identifier keyword string class property entity jsxliterals sign comment break space".split(" ")
);
const [
  T_IDENTIFIER,
  T_KEYWORD,
  T_STRING,
  T_CLASS,
  T_PROPERTY,
  T_ENTITY,
  T_JSX_LITERALS,
  T_SIGN,
  T_COMMENT,
  T_BREAK,
  T_SPACE
] = TokenTypes.map((_, index) => index);
({
  TokenMap: new Map(TokenTypes.map((type, index) => [type, index]))
});
function assemble(value, tokens) {
  const lines = [];
  let lineIndex = 0;
  const lineTokens = [];
  let lastWasBreak = false;
  function flushLine(tokens2) {
    lines.push({
      index: lineIndex++,
      value: tokens2.map(([, tokenValue]) => tokenValue).join(""),
      tokens: tokens2.map(([type, tokenValue]) => ({
        type: TokenTypes[type],
        value: tokenValue
      })),
      annotations: []
    });
  }
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const [type, value2] = token;
    if (type !== T_BREAK) {
      if (value2.includes("\n")) {
        const values = value2.split("\n");
        for (let part = 0; part < values.length; part++) {
          lineTokens.push([type, values[part]]);
          if (part < values.length - 1) {
            flushLine(lineTokens);
            lineTokens.length = 0;
          }
        }
      } else {
        lineTokens.push(token);
      }
      lastWasBreak = false;
    } else {
      if (lastWasBreak) flushLine([]);
      else {
        flushLine(lineTokens);
        lineTokens.length = 0;
      }
      if (index === tokens.length - 1) flushLine([]);
      lastWasBreak = true;
    }
  }
  if (lineTokens.length) flushLine(lineTokens);
  return { value, lines };
}
function render(parsed, options) {
  {
    return parsed.lines.map((line) => {
      const className = `sh__line${line.annotations.map((annotation) => ` sh__line--${annotation}`).join("")}`;
      const children = line.tokens.map(({ type, value }) => `<span class="sh__token--${type}" style="color:var(--sh-${type})">${encode(value)}</span>`).join("");
      return `<span class="${encode(className)}">${children}</span>`;
    }).join("\n");
  }
}
const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
const encode = (value) => value.replace(/[&<>"']/g, (character) => entities[character]);
const signs = new Set("+-*/%=!&|^~?:.,;()[]{}<>#@\\".split(""));
const noComment = () => 0;
const isWord$1 = (value) => value === "_" || value === "$" || /[\p{L}\p{N}]/u.test(value);
function isQuotedKey(code, index) {
  while (index < code.length && /\s/.test(code[index])) index++;
  return code[index] === ":";
}
function tokenize$3(code, options) {
  if (typeof options?.tokenize === "function") return options.tokenize(code, options);
  const keywords2 = options?.keywords || /* @__PURE__ */ new Set();
  const typeKeywords = options?.typeKeywords || /* @__PURE__ */ new Set();
  const onCommentStart2 = options?.onCommentStart || noComment;
  const onCommentEnd2 = options?.onCommentEnd || noComment;
  const normalize = options?.caseInsensitive ? (value) => value.toLowerCase() : (value) => value;
  const tokens = [];
  let lastSignificant = "";
  function append(type, value) {
    if (!value) return;
    tokens.push([type, value]);
    if (type !== T_SPACE && type !== T_BREAK) lastSignificant = value;
  }
  for (let i = 0; i < code.length; ) {
    const curr = code[i];
    const next = code[i + 1];
    const commentType = onCommentStart2(curr, next, i, code);
    if (commentType) {
      const start = i++;
      while (i < code.length) {
        if (onCommentEnd2(code[i - 1], code[i], i, code, start) == commentType) {
          i++;
          break;
        }
        i++;
      }
      append(T_COMMENT, code.slice(start, i));
      continue;
    }
    const literalLength = options?.onLiteral?.(curr, i, code);
    if (literalLength) {
      append(T_STRING, code.slice(i, i + literalLength));
      i += literalLength;
      continue;
    }
    if (typeof options?.onQuote === "function" && curr === "'") {
      const length = options.onQuote(curr, i, code);
      if (typeof length === "number" && length >= 1) {
        append(T_IDENTIFIER, code.slice(i, i + length));
        i += length;
        continue;
      }
    }
    if (curr === '"' || curr === "'" || options?.templateStrings && curr === "`") {
      const quote = curr;
      const start = i++;
      while (i < code.length) {
        if (code[i] === "\\") {
          i++;
        } else if (code[i] === quote) {
          i++;
          break;
        }
        i++;
      }
      const value = code.slice(start, i);
      append(options?.quotedKeys && isQuotedKey(code, i) ? T_PROPERTY : T_STRING, value);
      continue;
    }
    if (curr === "\n") {
      append(T_BREAK, curr);
      i++;
      continue;
    }
    if (/[^\S\r\n]/.test(curr)) {
      const start = i++;
      while (i < code.length && /[^\S\r\n]/.test(code[i])) i++;
      append(T_SPACE, code.slice(start, i));
      continue;
    }
    if (isWord$1(curr)) {
      const start = i++;
      while (i < code.length && isWord$1(code[i])) i++;
      if (/^\d/.test(curr) && code[i] === "." && /\d/.test(code[i + 1] || "")) {
        i++;
        while (i < code.length && isWord$1(code[i])) i++;
      }
      const value = code.slice(start, i);
      const normalized = normalize(value);
      const type = typeKeywords.has(normalized) ? T_CLASS : keywords2.has(normalized) ? T_KEYWORD : lastSignificant === "." ? T_PROPERTY : /^\d/.test(value) || value === "null" || new RegExp("^\\p{Lu}", "u").test(value) ? T_CLASS : T_IDENTIFIER;
      append(type, value);
      continue;
    }
    if (signs.has(curr)) {
      append(T_SIGN, curr);
      i++;
      continue;
    }
    append(T_STRING, curr);
    i++;
  }
  return tokens;
}
function parse(code, options) {
  const parsed = assemble(code, tokenize$3(code, options));
  if (options?.annotateLine) {
    for (const line of parsed.lines) options.annotateLine(line);
  }
  return parsed;
}
const keywords$1 = /* @__PURE__ */ new Set([
  // css keywords like @media, @import, @keyframes, etc.
  "@media",
  "@import",
  "@keyframes",
  "@font-face",
  "@supports",
  "@page",
  "@counter-style",
  "@font-feature-values",
  "@viewport",
  "@counter-style",
  "@font-feature-values",
  "@document"
]);
const onCommentStart$1 = (currentChar, nextChar) => {
  return "/*" === currentChar + nextChar ? 1 : 0;
};
const onCommentEnd$1 = (prevChar, currChar) => {
  return "*/" === prevChar + currChar ? 1 : 0;
};
const onLiteral = (curr, index, code) => {
  if (curr !== "#") return 0;
  return code.slice(index).match(/^#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])/i)?.[0].length || 0;
};
const isIgnored = (type) => type === T_SPACE || type === T_BREAK || type === T_COMMENT;
const isPropertyPart = ([type, value]) => type === T_IDENTIFIER || type === T_CLASS || type === T_SIGN && value === "-";
const isNamePart = ([type]) => type === T_IDENTIFIER || type === T_CLASS || type === T_PROPERTY;
const isNameStart = (token) => isNamePart(token) && !/^\d/.test(token[1]);
const isHyphen = ([type, value]) => type === T_SIGN && value === "-";
const mergeDashedNames = (tokens) => {
  for (let index = 0; index < tokens.length; index++) {
    let firstWord = index;
    let end = index;
    if (isHyphen(tokens[end])) {
      while (tokens[end] && isHyphen(tokens[end])) end++;
      if (!tokens[end] || !isNameStart(tokens[end])) continue;
      firstWord = end++;
    } else if (isNameStart(tokens[end])) {
      end++;
    } else {
      continue;
    }
    let dashed = firstWord > index;
    while (tokens[end] && isHyphen(tokens[end])) {
      const hyphenStart = end;
      while (tokens[end] && isHyphen(tokens[end])) end++;
      if (!tokens[end] || !isNamePart(tokens[end])) {
        end = hyphenStart;
        break;
      }
      dashed = true;
      end++;
    }
    if (!dashed) continue;
    const name = tokens.slice(index, end).map(([, value]) => value).join("");
    tokens.splice(index, end - index, [tokens[firstWord][0], name]);
  }
};
const opensBlock = (tokens, start) => {
  let parentheses = 0;
  let brackets = 0;
  for (let index = start; index < tokens.length; index++) {
    const [type, value] = tokens[index];
    if (type !== T_SIGN) continue;
    if (value === "(") parentheses++;
    else if (value === ")") parentheses--;
    else if (value === "[") brackets++;
    else if (value === "]") brackets--;
    else if (!parentheses && !brackets && value === "{") return true;
    else if (!parentheses && !brackets && (value === ";" || value === "}")) return false;
  }
  return false;
};
const tokenize$2 = (code, options) => {
  const tokens = tokenize$3(code, { ...options, tokenize: void 0 });
  mergeDashedNames(tokens);
  let blockDepth = 0;
  let declarationStart = false;
  for (let index = 0; index < tokens.length; index++) {
    const [type, value] = tokens[index];
    if (type === T_SIGN && value === "{") {
      blockDepth++;
      declarationStart = true;
      continue;
    }
    if (type === T_SIGN && value === "}") {
      blockDepth--;
      declarationStart = false;
      continue;
    }
    if (type === T_SIGN && value === ";") {
      declarationStart = blockDepth > 0;
      continue;
    }
    if (!declarationStart || isIgnored(type)) continue;
    const propertyStart = index;
    let propertyEnd = index;
    while (propertyEnd < tokens.length && isPropertyPart(tokens[propertyEnd])) {
      propertyEnd++;
    }
    let colon = propertyEnd;
    while (colon < tokens.length && isIgnored(tokens[colon][0])) colon++;
    if (propertyEnd > propertyStart && tokens[colon]?.[0] === T_SIGN && tokens[colon][1] === ":" && !opensBlock(tokens, colon + 1)) {
      const property = tokens.slice(propertyStart, propertyEnd).map(([, part]) => part).join("");
      tokens.splice(propertyStart, propertyEnd - propertyStart, [T_PROPERTY, property]);
    }
    declarationStart = false;
  }
  return tokens;
};
const css = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  keywords: keywords$1,
  onCommentEnd: onCommentEnd$1,
  onCommentStart: onCommentStart$1,
  onLiteral,
  tokenize: tokenize$2
}, Symbol.toStringTag, { value: "Module" }));
const onCommentStart = (currentChar) => currentChar === "#" ? 1 : 0;
const onCommentEnd = (_prevChar, currChar) => currChar === "\n" ? 1 : 0;
const keywords = /* @__PURE__ */ new Set([
  "case",
  "coproc",
  "do",
  "done",
  "elif",
  "else",
  "esac",
  "export",
  "fi",
  "for",
  "function",
  "if",
  "in",
  "local",
  "readonly",
  "return",
  "select",
  "then",
  "time",
  "until",
  "while"
]);
const shell = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  keywords,
  onCommentEnd,
  onCommentStart
}, Symbol.toStringTag, { value: "Module" }));
const JSXBrackets = /* @__PURE__ */ new Set(["<", ">", "{", "}", "[", "]"]);
const Keywords_Js = /* @__PURE__ */ new Set([
  "for",
  "do",
  "while",
  "if",
  "else",
  "return",
  "function",
  "var",
  "let",
  "const",
  "true",
  "false",
  "undefined",
  "this",
  "new",
  "delete",
  "typeof",
  "in",
  "instanceof",
  "void",
  "break",
  "continue",
  "switch",
  "case",
  "default",
  "throw",
  "try",
  "catch",
  "finally",
  "debugger",
  "with",
  "yield",
  "async",
  "await",
  "class",
  "extends",
  "super",
  "import",
  "export",
  "from",
  "static"
]);
const Keywords_Ts = /* @__PURE__ */ new Set([
  ...Keywords_Js,
  "type",
  "interface",
  "enum",
  "implements",
  "readonly",
  "abstract",
  "declare",
  "namespace",
  "module",
  "private",
  "protected",
  "public",
  "override",
  "keyof",
  "infer",
  "is",
  "asserts",
  "satisfies",
  "as",
  "unknown",
  "never",
  "any",
  "number",
  "string",
  "boolean",
  "bigint",
  "symbol",
  "object"
]);
const Signs = /* @__PURE__ */ new Set([
  "+",
  "-",
  "*",
  "/",
  "%",
  "=",
  "!",
  "&",
  "|",
  "^",
  "~",
  "!",
  "?",
  ":",
  ".",
  ",",
  ";",
  `'`,
  '"',
  ".",
  "(",
  ")",
  "[",
  "]",
  "#",
  "@",
  "\\",
  ...JSXBrackets
]);
const DefaultOptions = {
  keywords: Keywords_Js,
  onCommentStart: isCommentStart_Js,
  onCommentEnd: isCommentEnd_Js,
  jsx: true,
  regex: true,
  templateStrings: true
};
function resolveHighlightOptions(options) {
  return {
    ...DefaultOptions,
    ...options
  };
}
function isLikelyTypeScript(code) {
  let tsScore = 0;
  if (/\binterface\s+[A-Za-z_$][\w$]*/.test(code)) tsScore += 2;
  if (/\btype\s+[A-Za-z_$][\w$]*\s*=/.test(code)) tsScore += 2;
  if (/\benum\s+[A-Za-z_$][\w$]*/.test(code)) tsScore += 2;
  if (/\b(?:implements|readonly|declare|namespace|satisfies|infer|keyof|asserts)\b/.test(code)) tsScore += 2;
  if (/:\s*[A-Za-z_$][\w$]*(?:<[^>\n]+>)?(?:\[\])?(?=\s*[,)=;{])/m.test(code)) tsScore += 1;
  if (/\b(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*:\s*/.test(code)) tsScore += 1;
  if (/\)\s*:\s*[A-Za-z_$][\w$]*(?:<[^>\n]+>)?(?:\[\])?\s*(?:=>|\{)/.test(code)) tsScore += 1;
  return tsScore >= 2;
}
function isTypeParameterListStart(code, startIndex) {
  if (code[startIndex] !== "<") return false;
  let depth = 0;
  let sawIdentifierStart = false;
  for (let i = startIndex; i < code.length; i++) {
    const ch = code[i];
    if (ch === "<") {
      depth++;
      continue;
    }
    if (ch === ">") {
      depth--;
      if (depth === 0) {
        let next = i + 1;
        while (next < code.length && /\s/.test(code[next])) next++;
        if (!(sawIdentifierStart && code[next] === "(")) return false;
        const tail = code.slice(next, next + 320);
        return /\)\s*(?::[\s\S]{0,120}?)?=>/.test(tail);
      }
      continue;
    }
    if (depth === 0) continue;
    if (/[$A-Za-z_]/.test(ch)) {
      sawIdentifierStart = true;
      continue;
    }
    if (/[\s,\.\=\?\:\|\&\[\]]/.test(ch)) continue;
    return false;
  }
  return false;
}
function isSpaces(str) {
  return /^[^\S\r\n]+$/g.test(str);
}
function isSign(ch) {
  return Signs.has(ch);
}
function isWord(chr) {
  return /^[\w$\u0080-\uffff]+$/.test(chr || "");
}
function isCls(str) {
  return /^[0-9A-Z\p{Lu}]/u.test(str) || str === "null";
}
function isAlpha(chr) {
  return /^[a-zA-Z]$/.test(chr);
}
function isIdentifierChar(chr) {
  return /^[$_A-Za-z\u0080-\uffff]$/.test(chr || "");
}
function isIdentifier(str) {
  return isIdentifierChar(str[0]) && isWord(str);
}
function isStrTemplateChr(chr) {
  return chr === "`";
}
function isSingleQuotes(chr) {
  return chr === '"' || chr === "'";
}
function isCommentStart_Js(curr, next) {
  const str = curr + next;
  if (str === "/*") return 2;
  return str === "//" ? 1 : 0;
}
function isCommentEnd_Js(prev, curr) {
  return prev + curr === "*/" ? 2 : curr === "\n" ? 1 : 0;
}
function isRegexStart(str) {
  return str[0] === "/" && !isCommentStart_Js(str[0], str[1]);
}
function isPropertyKey(code, quoteEnd) {
  let i = quoteEnd + 1;
  while (i < code.length && /\s/.test(code[i])) i++;
  return code[i] === ":";
}
function tokenize$1(code, options) {
  const mergedOptions = resolveHighlightOptions(options);
  const hasCustomKeywords = mergedOptions.keywords !== DefaultOptions.keywords;
  const isTs = typeof mergedOptions.typescript === "boolean" ? mergedOptions.typescript : isLikelyTypeScript(code);
  const resolvedKeywords = hasCustomKeywords ? mergedOptions.keywords : isTs ? Keywords_Ts : Keywords_Js;
  const {
    onCommentStart: onCommentStart2,
    onCommentEnd: onCommentEnd2
  } = mergedOptions;
  const resolvedTypeKeywords = mergedOptions.typeKeywords instanceof Set ? mergedOptions.typeKeywords : null;
  const supportsJsx = mergedOptions.jsx !== false;
  const supportsRegex = mergedOptions.regex !== false;
  const supportsTemplateStrings = mergedOptions.templateStrings !== false;
  const normalizeKeyword = mergedOptions.caseInsensitive ? (token) => token.toLowerCase() : (token) => token;
  const isTemplateQuote = (chr) => supportsTemplateStrings && isStrTemplateChr(chr);
  let current = "";
  let type = -1;
  let last = [-1, ""];
  let beforeLast = [-2, ""];
  const tokens = [];
  let __jsxEnter = false;
  let __jsxTag = 0;
  let __jsxExprDepth = 0;
  let __jsxTagExpr = 0;
  let __jsxStack = 0;
  const __jsxChild = () => __jsxEnter && !__jsxExprDepth && !__jsxTag;
  const inJsxTag = () => __jsxTag;
  const inJsxLiterals = () => __jsxChild() && __jsxStack;
  let __strQuote = null;
  let __strTokenStart = 0;
  let __regexQuoteStart = false;
  let __strTemplateExprStack = 0;
  let __strTemplateQuoteStack = 0;
  const inStringQuotes = () => __strQuote !== null;
  const inRegexQuotes = () => __regexQuoteStart;
  const inStrTemplateLiterals = () => __strTemplateQuoteStack > __strTemplateExprStack;
  const inStrTemplateExpr = () => __strTemplateQuoteStack > 0 && __strTemplateQuoteStack === __strTemplateExprStack;
  const inStringContent = () => inStringQuotes() || inStrTemplateLiterals();
  function classify(token) {
    const isLineBreak = token === "\n";
    if (inJsxTag()) {
      if (inStringQuotes()) {
        return T_STRING;
      }
      const [, lastToken] = last;
      if (isIdentifier(token)) {
        if (lastToken === "<" || lastToken === "</")
          return T_ENTITY;
        if (!__jsxTagExpr && /^\s+$/.test(tokens[tokens.length - 1]?.[1] || ""))
          return T_PROPERTY;
      }
    }
    const isJsxLiterals = inJsxLiterals();
    if (isJsxLiterals) return T_JSX_LITERALS;
    if (inStringQuotes() || inStrTemplateLiterals()) {
      return T_STRING;
    } else if (resolvedTypeKeywords && resolvedTypeKeywords.has(normalizeKeyword(token))) {
      return last[1] === "." ? T_IDENTIFIER : T_CLASS;
    } else if (resolvedKeywords.has(normalizeKeyword(token))) {
      return last[1] === "." ? T_IDENTIFIER : T_KEYWORD;
    } else if (isLineBreak) {
      return T_BREAK;
    } else if (isSpaces(token)) {
      return T_SPACE;
    } else if (token.split("").every(isSign)) {
      return T_SIGN;
    } else if (isCls(token)) {
      return inJsxTag() && !__jsxTagExpr ? T_IDENTIFIER : T_CLASS;
    } else {
      if (isIdentifier(token)) {
        const isLastPropDot = last[1] === "." && isIdentifier(beforeLast[1]);
        if (!inStringContent() && !isLastPropDot) return T_IDENTIFIER;
        if (isLastPropDot) return T_PROPERTY;
      }
      return T_STRING;
    }
  }
  const append = (type_, token_) => {
    if (token_) {
      current = token_;
    }
    if (current) {
      type = typeof type_ === "number" ? type_ : classify(current);
      const pair = [type, current];
      if (type !== T_SPACE && type !== T_BREAK) {
        beforeLast = last;
        last = pair;
      }
      if (inJsxTag() && type === T_SIGN) {
        if (current === "{") __jsxTagExpr++;
        if (current === "}") __jsxTagExpr--;
      }
      tokens.push(pair);
    }
    current = "";
  };
  for (let i = 0; i < code.length; i++) {
    const curr = code[i];
    const prev = code[i - 1];
    const next = code[i + 1];
    const p_c = prev + curr;
    const c_n = curr + next;
    if (typeof mergedOptions.onQuote === "function" && curr === "'" && !inStringQuotes() && !inJsxLiterals() && !inStrTemplateLiterals()) {
      const rawLen = mergedOptions.onQuote(curr, i, code);
      if (typeof rawLen === "number" && rawLen >= 1 && !Number.isNaN(rawLen)) {
        const len = Math.min(rawLen, code.length - i);
        const end = i + len;
        append();
        current = code.slice(i, end);
        append(T_IDENTIFIER);
        i = end - 1;
        continue;
      }
    }
    if (isSingleQuotes(curr) && !inJsxLiterals() && !inStrTemplateLiterals()) {
      append();
      let isStringClose = false;
      if (__strQuote && curr === __strQuote) {
        __strQuote = null;
        isStringClose = true;
      } else if (!__strQuote) {
        __strQuote = curr;
        __strTokenStart = tokens.length;
      }
      append(T_STRING, curr);
      if (mergedOptions.quotedKeys && isStringClose && isPropertyKey(code, i)) {
        for (let tokenIndex = __strTokenStart; tokenIndex < tokens.length; tokenIndex++) {
          tokens[tokenIndex][0] = T_PROPERTY;
        }
      }
      continue;
    }
    if (isTemplateQuote(curr)) {
      append();
      __strTemplateQuoteStack += inStrTemplateLiterals() ? -1 : 1;
      append(T_STRING, curr);
      continue;
    }
    if (inStrTemplateLiterals()) {
      if (c_n === "${") {
        __strTemplateExprStack++;
        append(T_STRING);
        append(T_SIGN, c_n);
        i++;
        continue;
      }
    }
    if (inStrTemplateExpr() && curr === "}") {
      append();
      __strTemplateExprStack--;
      append(T_SIGN, curr);
      continue;
    }
    if (__jsxChild()) {
      if (curr === "{") {
        append();
        append(T_SIGN, curr);
        __jsxExprDepth = 1;
        continue;
      }
    }
    if (__jsxEnter) {
      if (!__jsxTag && curr === "<") {
        append();
        if (next === "/") {
          __jsxTag = 2;
          current = c_n;
          i++;
        } else {
          __jsxTag = 1;
          current = curr;
        }
        append(T_SIGN);
        continue;
      }
      if (__jsxTag) {
        if (curr === ">" && !"/=".includes(prev)) {
          append();
          if (__jsxTag === 1) {
            __jsxTag = 0;
            __jsxStack++;
          } else {
            __jsxTag = 0;
            __jsxEnter = false;
          }
          append(T_SIGN, curr);
          continue;
        }
        if (c_n === "/>" || c_n === "</") {
          if (current !== "<" && current !== "/") {
            append();
          }
          if (c_n === "/>") {
            __jsxTag = 0;
          } else {
            __jsxStack--;
          }
          if (!__jsxStack)
            __jsxEnter = false;
          current = c_n;
          i++;
          append(T_SIGN);
          continue;
        }
        if (curr === "<") {
          append();
          current = curr;
          append(T_SIGN);
          continue;
        }
        if (curr === "-" && current && !inStringContent() && !inJsxLiterals()) {
          let end = i + 1;
          while (end < code.length && /[$\w-]/.test(code[end])) end++;
          append(T_PROPERTY, current + code.slice(i, end));
          i = end - 1;
          continue;
        }
        if (next === "=" && !inStringContent()) {
          if (!isSpaces(curr)) {
            if (isSpaces(current)) {
              append();
            }
            const prop = current + curr;
            if (isIdentifier(prop)) {
              append(T_PROPERTY, prop);
              continue;
            }
          }
        }
      }
    }
    if (supportsJsx && !__jsxTag && (curr === "<" && isIdentifierChar(next) || c_n === "</")) {
      let prevNonSpace = i - 1;
      while (prevNonSpace >= 0 && /\s/.test(code[prevNonSpace])) prevNonSpace--;
      const prevChar = prevNonSpace >= 0 ? code[prevNonSpace] : "";
      const [lastType, lastTok] = last;
      let typeArgFromPending = false;
      let jsxFromPending = false;
      if (current && !isSpaces(current)) {
        const w = current;
        if (isCls(w) || w === "true" || w === "false") {
          typeArgFromPending = true;
        } else if (resolvedKeywords.has(w) && isIdentifier(w)) {
          jsxFromPending = true;
        } else if (isIdentifier(w)) {
          typeArgFromPending = true;
        }
      }
      const isTsTypeArgStart = curr === "<" && /[$\w\]\)]/.test(prevChar) && (typeArgFromPending || !jsxFromPending && (lastType === T_IDENTIFIER || lastType === T_CLASS || lastType === T_SIGN && (lastTok === ")" || lastTok === "]")));
      const isTsGenericStart = curr === "<" && isTypeParameterListStart(code, i);
      if (!isTsTypeArgStart && !isTsGenericStart) {
        __jsxTag = next === "/" ? 2 : 1;
      }
      if (curr === "<" && (next === "/" || isAlpha(next))) {
        if (!isTsTypeArgStart && !isTsGenericStart && !inStringContent() && !inJsxLiterals() && !inRegexQuotes()) {
          __jsxEnter = true;
        }
      }
    }
    const isQuotationChar = isSingleQuotes(curr) || isTemplateQuote(curr);
    const isStringTemplateLiterals = inStrTemplateLiterals();
    const isRegexChar = supportsRegex && !__jsxEnter && isRegexStart(c_n);
    const isJsxLiterals = inJsxLiterals();
    if (isQuotationChar || isStringTemplateLiterals || isSingleQuotes(__strQuote)) {
      current += curr;
      if (curr === "\\") current += code[++i] || "";
    } else if (isRegexChar) {
      append();
      const [lastType, lastToken] = last;
      if (isRegexChar && lastType !== -1 && !(lastType === T_SIGN && ")" !== lastToken || lastType === T_COMMENT)) {
        current = curr;
        append();
        continue;
      }
      __regexQuoteStart = true;
      const start = i++;
      let foundClose = false;
      let inCharClass = false;
      for (; i < code.length && code[i] !== "\n"; i++) {
        const ch = code[i];
        if (ch === "\\") {
          if (code[i + 1] === "\n") break;
          i++;
          continue;
        }
        if (ch === "[") inCharClass = true;
        if (ch === "]") inCharClass = false;
        if (ch === "/" && !inCharClass) {
          foundClose = true;
          while (/^[a-z]$/.test(code[i + 1])) {
            i++;
          }
          break;
        }
      }
      __regexQuoteStart = false;
      if (start !== i && foundClose) {
        current = code.slice(start, i + 1);
        append(T_STRING);
      } else {
        current = curr;
        append();
        i = start;
      }
    } else if (onCommentStart2(curr, next, i, code)) {
      append();
      const start = i;
      const startCommentType = onCommentStart2(curr, next, i, code);
      if (startCommentType) {
        for (; i < code.length; i++) {
          const endCommentType = onCommentEnd2(code[i - 1], code[i], i, code);
          if (endCommentType == startCommentType) break;
        }
      }
      current = code.slice(start, i + 1);
      append(T_COMMENT);
    } else if (curr === " " || curr === "\n") {
      if (curr === " " && (isSpaces(current) || !current || isJsxLiterals)) {
        let end = i + 1;
        while (code[end] === " ") end++;
        current += code.slice(i, end);
        i = end - 1;
        if (code[end] === "<") {
          append();
        }
      } else {
        append();
        current = curr;
        append();
      }
    } else {
      if (__jsxExprDepth && curr === "}") {
        append();
        current = curr;
        append();
        __jsxExprDepth--;
      } else if (
        // it's jsx literals and is not a jsx bracket
        isJsxLiterals && !JSXBrackets.has(curr) || // it's template literal content (including quotes)
        inStrTemplateLiterals() || // same type char as previous one in current token
        (isWord(curr) === isWord(current[current.length - 1]) || __jsxChild()) && !Signs.has(curr)
      ) {
        current += curr;
      } else {
        if (p_c === "</") {
          current = p_c;
        }
        append();
        if (p_c !== "</") {
          current = curr;
        }
        if (c_n === "</" || c_n === "/>") {
          current = c_n;
          append();
          i++;
        } else if (JSXBrackets.has(curr)) append();
      }
      if (__jsxExprDepth && curr === "{") __jsxExprDepth++;
    }
  }
  append();
  return tokens;
}
const tokenize = (code, options) => tokenize$1(code, {
  ...options,
  typescript: true
});
const typescript = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  tokenize
}, Symbol.toStringTag, { value: "Module" }));
const notJs = { jsx: false, regex: false, templateStrings: false };
const configs = {
  tsx: typescript,
  // JSX mode tokenises tags and attributes, which is what the HTML snippets need.
  html: typescript,
  css: { ...css, ...notJs },
  shell: { ...shell, ...notJs }
};
const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function highlight(code, lang = "tsx") {
  if (lang === "text") {
    return code.split("\n").map((line) => `<span class="sh__line">${escape(line)}</span>`).join("\n");
  }
  return render(parse(code, configs[lang]));
}
function cleanDemoSource(source) {
  let code = source.replace(/^import type \{[^}]*\}\s+from\s+["']@\/lib\/types["'];?\n/m, "");
  const start = code.search(/^export const meta\b/m);
  if (start >= 0) {
    const open = code.indexOf("{", start);
    let depth = 0;
    let end = -1;
    let quote = null;
    for (let i = open; i >= 0 && i < code.length; i++) {
      const ch = code[i];
      if (quote) {
        if (ch === "\\") i++;
        else if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") quote = ch;
      else if (ch === "{") depth++;
      else if (ch === "}" && --depth === 0) {
        end = i + 1;
        break;
      }
    }
    if (end > 0) {
      const tail = code.slice(end).match(/^[^\n]*\n?/)?.[0] ?? "";
      code = code.slice(0, start) + code.slice(end + tail.length);
    }
  }
  return code.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
function importSnippet(names, from = "@yanqing/ui") {
  const one = `import { ${names.join(", ")} } from "${from}";`;
  if (one.length <= 72 || names.length < 2) return one;
  return `import {
${names.map((name) => `  ${name},`).join("\n")}
} from "${from}";`;
}
function CopyCodeButton({ value, className }) {
  const { messages } = useUILocale();
  const [copied, setCopied] = reactExports.useState(false);
  const timer = reactExports.useRef(void 0);
  reactExports.useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      toastManager.add({ title: messages.copyError, type: "error" });
    }
  };
  const label = copied ? messages.copied : messages.copyCode;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TooltipTrigger,
        {
          render: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "aria-label": label,
              className: cn("text-muted-foreground hover:text-foreground", className),
              onClick: copy,
              size: "icon-sm",
              variant: "ghost"
            }
          ),
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipPopup, { children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-live": "polite", className: "sr-only", children: copied ? messages.copied : "" })
  ] });
}
function CodeView({
  code,
  lang = "tsx",
  wrap = false,
  className
}) {
  const html = reactExports.useMemo(() => highlight(code.replace(/\n$/, ""), lang), [code, lang]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "pre",
    {
      className: cn(
        "docs-code focus-ring overflow-x-auto px-4 py-3.5 [scrollbar-width:thin]",
        wrap && "whitespace-pre-wrap [overflow-wrap:anywhere]",
        className
      ),
      dangerouslySetInnerHTML: { __html: `<code>${html}</code>` },
      tabIndex: 0
    }
  );
}
function CodeBlock({
  code,
  lang = "tsx",
  title,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: cn("group/code relative my-5 min-w-0 overflow-hidden rounded-xl border bg-surface-subtle dark:bg-surface", className), children: [
    title ? /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "flex h-10 items-center justify-between gap-2 border-b ps-4 pe-1.5 text-muted-foreground text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCodeButton, { value: code })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute end-1.5 top-1.5 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCodeButton, { className: "bg-surface-subtle dark:bg-surface", value: code }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeView, { className: title ? void 0 : "pe-12", code, lang })
  ] });
}
export {
  CopyCodeButton as C,
  CodeView as a,
  CodeBlock as b,
  cleanDemoSource as c,
  importSnippet as i
};
