/*
 * 填值控件的只读与禁用（基础层 §9，骨法用笔）。
 *
 * 重墨线说的是「这里可以编辑」。只读与禁用都不可编辑，线降为清墨；
 * 区别落在面与字上：只读的内容仍是要读的正文 → 纸色、焦墨；
 * 禁用是当前不可操作 → 清染、浓墨。不降整块不透明度：禁用字段的内容常常仍要读到。
 *
 * 同一条规则按控件的 DOM 有三种写法；控件只取适合自己的那一种，不各自另写。
 */

/** 原语在根上写 data-disabled / data-readonly（Select、NumberField 等）。 */
export const fillStateByData = "data-disabled:cursor-not-allowed data-disabled:bg-surface-inset data-disabled:text-muted-foreground data-disabled:border-border data-readonly:border-border";

/**
 * 外框包着真实的编辑成员（InputGroup）：原生 input、textarea，或 Select 的触发器。
 * 外框不自己知道状态，读成员的事实——成员各用各的属性：input/textarea 是 :disabled、:read-only、aria-invalid，
 * Select 触发器是 data-disabled、data-readonly、aria-invalid。
 * 只读选择器排除 aria-hidden 与 type=hidden 的 input：原语为表单提交放的隐藏 input（NumberField、Select 各有）
 * 永远匹配 :read-only，不排除就会让整个外框读成只读。
 * 读不出的状态不画：这里没有「根据内容猜」的分支。
 */
export const fillStateByMember = "has-[input:disabled,textarea:disabled,[data-slot=select-trigger][data-disabled]]:cursor-not-allowed has-[input:disabled,textarea:disabled,[data-slot=select-trigger][data-disabled]]:bg-surface-inset has-[input:disabled,textarea:disabled,[data-slot=select-trigger][data-disabled]]:text-muted-foreground has-[input:disabled,textarea:disabled,[data-slot=select-trigger][data-disabled]]:border-border has-[input:read-only:not(:disabled):not([aria-hidden=true]):not([type=hidden]),textarea:read-only:not(:disabled),[data-slot=select-trigger][data-readonly]]:border-border";

/** 外框边线随成员状态变色：焦点、悬停、无效。与上一条共用同一组成员选择器，所以写在同一处。 */
export const fillStateMemberBorder = "has-[input:focus-visible,textarea:focus-visible,[data-slot=select-trigger]:focus-visible]:border-ring not-has-[input:disabled,textarea:disabled,[data-slot=select-trigger][data-disabled]]:not-has-[input:read-only:not([aria-hidden=true]):not([type=hidden]),textarea:read-only,[data-slot=select-trigger][data-readonly]]:not-has-[input:focus-visible,textarea:focus-visible,[data-slot=select-trigger]:focus-visible]:not-has-[input[aria-invalid=true],textarea[aria-invalid=true],[data-slot=select-trigger][aria-invalid=true]]:hover:border-border-strong has-[input[aria-invalid=true],textarea[aria-invalid=true],[data-slot=select-trigger][aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]:focus-visible,textarea[aria-invalid=true]:focus-visible,[data-slot=select-trigger][aria-invalid=true]:focus-visible]:border-destructive-foreground";

/** 原生元素本身就是编辑边界（Textarea、NativeSelect）。 */
export const fillStateNative = "disabled:cursor-not-allowed disabled:bg-surface-inset disabled:text-muted-foreground disabled:border-border [&[readonly]]:border-border";
