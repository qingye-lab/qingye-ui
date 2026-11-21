// 测试环境补丁，只补 jsdom 缺的浏览器构造函数，不改变题目语义。
// 2026-11-20 起（冻结 v11）：jsdom 没有 PointerEvent，而 Base UI 处理"原生 label 点击转发给按钮式控件"时
// 会 new PointerEvent，导致合法写法（Radio 包在 <label> 里）在测试里点击失效。真实浏览器都有该构造函数。
if (typeof window !== "undefined" && !("PointerEvent" in window)) {
  class PointerEventPolyfill extends MouseEvent {
    readonly pointerId: number; readonly pointerType: string; readonly isPrimary: boolean;
    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerId = init.pointerId ?? 1; this.pointerType = init.pointerType ?? "mouse"; this.isPrimary = init.isPrimary ?? true;
    }
  }
  Object.defineProperty(window, "PointerEvent", { value: PointerEventPolyfill, configurable: true, writable: true });
}
