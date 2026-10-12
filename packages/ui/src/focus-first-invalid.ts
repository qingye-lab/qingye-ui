/*
 * 提交失败后，把焦点交给第一个有问题的字段（基础层 §9：无效是调用方声明或浏览器约束的事实，
 * 本函数只读事实、不产生事实；它不改 Form 的默认行为，由应用在设置完 `invalid` 之后调用）。
 *
 * 「有问题」的判据（文档顺序，取第一个；范围是 form 的子树加上用 `form` 属性挂到它名下、却放在子树外的控件）：
 * - 带 `aria-invalid="true"` 的元素——本库的 Field.invalid 把它写在**用户看得见、也聚得上焦的那个部件**上
 *   （Input、Select 触发器、Checkbox/Switch/Radio 的标记、Slider 的滑块 input、OtpField 的输入……）；
 * - 或原生 `:invalid` 的 input / select / textarea（`:user-invalid` 要求用户先交互过，提交失败时恰恰没有，故用 `:invalid`）。
 *
 * 「落点」的判据：焦点交给**键盘本来就能走到的那个部件**，所以候选必须满足
 * tabIndex ≥ 0、未禁用（`:disabled`、`aria-disabled`）、不在 aria-hidden / inert 里、实际可见。
 * 本库「真实输入隐藏」的部件（Checkbox、Switch、Select、NumberField 的原生副本）都是 aria-hidden + tabindex=-1，
 * 因此自动被排除，不会聚到一个 1×1 的看不见的 input 上；
 * 仅有原生 `:invalid`、可见部件没写 aria-invalid 时（如 `required` 的 Checkbox），回到隐藏 input 所在的同一个字段里，
 * 取那个字段第一个键盘可达的部件。
 * 不可聚焦的容器写了 aria-invalid（RadioGroup、Slider 根）时，落在它里面第一个键盘可达的部件
 * （RadioGroup 里是 roving 的那一个：已选的，或第一个）。
 */
const CONTROL = "input, select, textarea";
const REACHABLE = "a[href], button, input, select, textarea, summary, [tabindex], [contenteditable=''], [contenteditable='true']";

function visible(element: HTMLElement): boolean {
  const checker = (element as HTMLElement & { checkVisibility?: (options?: { visibilityProperty?: boolean }) => boolean }).checkVisibility;
  if (typeof checker === "function") return checker.call(element, { visibilityProperty: true });
  // 没有 checkVisibility（旧环境、jsdom）：逐层看 hidden 属性与 display / visibility。
  for (let node: HTMLElement | null = element; node; node = node.parentElement) {
    if (node.hidden) return false;
    const style = node.ownerDocument.defaultView?.getComputedStyle(node);
    if (style && (style.display === "none" || (node === element && style.visibility === "hidden"))) return false;
  }
  return true;
}

function reachable(element: HTMLElement): boolean {
  if (element.tabIndex < 0) return false;
  if (element.matches(":disabled") || element.closest("[aria-disabled='true'], [aria-hidden='true'], [inert]")) return false;
  return visible(element);
}

function firstReachableIn(root: Element): HTMLElement | undefined {
  return Array.from(root.querySelectorAll<HTMLElement>(REACHABLE)).find(reachable);
}

/** 隐藏的原生 input 所在的那一个字段：优先 Field 根，其次最近的 fieldset，否则不猜。 */
function fieldOf(control: Element): Element | null {
  return control.closest("[data-slot='field']");
}

function target(candidate: HTMLElement): HTMLElement | undefined {
  if (reachable(candidate)) return candidate;
  if (candidate.matches(CONTROL) && (candidate.tabIndex < 0 || candidate.closest("[aria-hidden='true']"))) {
    // 隐藏的原生副本：回到它的字段，找可见部件。
    if (candidate.matches(":disabled")) return undefined;
    const field = fieldOf(candidate);
    return field ? firstReachableIn(field) : undefined;
  }
  // 不可聚焦的声明者（RadioGroup、Slider 根）：落在它里面。
  if (candidate.matches("[aria-invalid='true']") && !candidate.matches(CONTROL)) return firstReachableIn(candidate);
  return undefined;
}

/**
 * 按文档顺序聚焦 `form` 里第一个无效的字段，并把它滚进视野；找到返回 `true`，没有可落焦的无效字段返回 `false`。
 * 只读 DOM 事实，不改任何状态，也不校验：调用方先设置 `Field.invalid`（或让浏览器约束校验失败）再调用。
 */
export function focusFirstInvalid(form: HTMLFormElement): boolean {
  const selector = `[aria-invalid="true"], :is(${CONTROL}):invalid`;
  // 用 `form="id"` 关联、却放在 <form> 之外的控件不在 querySelectorAll 的范围里，从 form.elements 补上，再按文档顺序排。
  const outside = Array.from(form.elements).filter((element): element is HTMLElement => element instanceof HTMLElement && !form.contains(element) && element.matches(selector));
  const candidates = [...form.querySelectorAll<HTMLElement>(selector), ...outside]
    .sort((a, b) => a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
  for (const candidate of candidates) {
    const element = target(candidate);
    if (!element) continue;
    // focusVisible：提交按钮被点击后脚本落焦，按钮类部件（Select 触发器、Checkbox……）默认不会显示焦点信号；
    // 支持该选项的引擎里显式要求显示，不支持的引擎忽略它。
    element.focus({ focusVisible: true } as FocusOptions);
    if (element.ownerDocument.activeElement !== element && !element.contains(element.ownerDocument.activeElement)) continue;
    element.scrollIntoView({ block: "nearest" });
    return true;
  }
  return false;
}
