import { CodeBlock } from "@yanqing/ui";

export const meta = {
  title: "传入已高亮的节点",
  description: "组件不绑定高亮库：把 Shiki 等工具生成的节点作为 children，每行加 data-line 即可使用行号。",
};

const code = `const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log(\`合计 ¥\${total.toFixed(2)}\`);`;

const keyword = "text-[oklch(0.55_0.2_300)] dark:text-[oklch(0.75_0.14_300)]";
const string = "text-[oklch(0.52_0.13_150)] dark:text-[oklch(0.78_0.13_150)]";
const fn = "text-[oklch(0.52_0.17_250)] dark:text-[oklch(0.76_0.12_250)]";
const muted = "text-muted-foreground";

export default function Demo() {
  return (
    <CodeBlock className="w-full" code={code} filename="cart.ts" lineNumbers>
      <span data-line="">
        <span className={keyword}>const</span> total <span className={muted}>=</span> items.<span className={fn}>reduce</span>
        <span className={muted}>(</span>(sum, item) <span className={keyword}>=&gt;</span> sum <span className={muted}>+</span> item.price{" "}
        <span className={muted}>*</span> item.qty, <span className={string}>0</span>
        <span className={muted}>);</span>
      </span>
      <span data-line="">
        console.<span className={fn}>log</span>
        <span className={muted}>(</span>
        <span className={string}>{"`合计 ¥${"}</span>total.<span className={fn}>toFixed</span>(<span className={string}>2</span>)
        <span className={string}>{"}`"}</span>
        <span className={muted}>);</span>
      </span>
    </CodeBlock>
  );
}
