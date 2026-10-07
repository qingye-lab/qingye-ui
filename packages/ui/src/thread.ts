/*
 * 纵向路径的线（Steps、Timeline；基础层 §6「路径」）：一点一线是同一种关系，一个来源（NG3）。
 * - 标记坐在第一行（一材行盒）里，中线与文字行中线重合；标记尺寸 m 由组件写入 --qy-thread-marker。
 * - 标记在行盒内的内缩 t = (材 − m) / 2。线从本项标记下缘起、到下一项标记上缘止，两端各留一分：
 *   上端 = t + m + 分 = (材 + m) / 2 + 分；下端 = 分 − t（t 大于一分时，线伸进下一项的行盒）。
 * - 最后一项没有线。线的颜色由组件按状态给出。
 */
export const threadClassName = "after:absolute after:start-[calc(var(--qy-cai)/2)] after:w-px after:content-[''] after:top-[calc((var(--qy-cai)+var(--qy-thread-marker))/2+var(--qy-fen))] after:bottom-[calc(var(--qy-fen)-(var(--qy-cai)-var(--qy-thread-marker))/2)] last:after:hidden";
