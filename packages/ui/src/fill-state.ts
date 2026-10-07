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

/** 外框包着一个原生 input（Input、InputGroup）。日期等以只读 input 展示值的控件标 data-picker-display，不算只读。 */
export const fillStateByInput = "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:bg-surface-inset has-[input:disabled]:text-muted-foreground has-[input:disabled]:border-border has-[input:read-only:not(:disabled):not([data-picker-display])]:border-border";

/** 原生元素本身就是编辑边界（Textarea、NativeSelect）。 */
export const fillStateNative = "disabled:cursor-not-allowed disabled:bg-surface-inset disabled:text-muted-foreground disabled:border-border [&[readonly]]:border-border";
