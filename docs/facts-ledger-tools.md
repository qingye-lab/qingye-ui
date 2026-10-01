# 当前能力与 token 台账生成

在仓库根运行：

```sh
node scripts/gen-capabilities.mjs --baseline-once
node scripts/token-ledger.mjs
node scripts/lib/facts-ledger.test.mjs
```

`--baseline-once` 只用于第一次保留初始 snapshot；已有 snapshot 时拒绝覆写。后续只用 `node scripts/gen-capabilities.mjs` 重生成 current。能力的实际 exports 来自 TypeScript module symbol，value/type/alias 分开；metadata 仍读取既有 meta.ts，usage exports 不是完整公开 API。人工限制只编辑 `current-capabilities.annotations.json`，不能手改生成 JSON 或 Markdown。

JSON 的 `revision` 只是生成时的 HEAD 基线，不表示全部事实已包含在该提交中；生成器读取实际工作区内容，输入指纹才标识本次事实来源。未提交的源码变化也会进入 current，不能把 HEAD 标签当作干净工作区证明。

无 dist 的干净 checkout 仍能生成源码清单，dist 标 `NOT_RUN`；有 dist 仅说明文件存在，不声明打包验证通过。当前内部文档未改变发布包 files；公开 catalog 仍沿用既有生成器。

运行时测量由已有浏览器 owner 在已有 page 上串行调用，模块不会启动浏览器或创建 context/tab：

```js
import { readFileSync } from 'node:fs';
import { runTokenLedgerProbe } from './scripts/token-ledger-runtime.mjs';
const ledger = JSON.parse(readFileSync('docs/token-ledger.json', 'utf8'));
const measured = await runTokenLedgerProbe(page, {
  ledger,
  baseURL: 'http://localhost:5180',
  onProgress: ({ completed, observation }) => console.log(completed, observation.id, observation.observation)
});
```

先生成静态台账再测量。台账包含 `static`、`runtime`、`computation` 三部分，终端/UI 读取同一 JSON；探针 recipes 描述实验，不是另一份 consumer 索引。指纹包括全部库源码、文档源码/demos/CSS、依赖锁文件、文档初始 HTML、存在的 Vite 配置和测量脚本。任一输入变化后旧运行时证据保留但标 stale/`NOT_RUN`，须重生成并重测。后续任务 7–10 接通 token 后，当前引用数与台账随之更新，初始 snapshot 保留。

首批组标签 panel 指真实 Card/CardPanel，`sourceComponent=card`，路由 `/playground/card`；没有虚构 Panel 导出。Input 的内层与外层分别测量，Select/ Dialog 的 Portal 部位使用文档级选择器。粗指针探针要求已有 context 真正报告 `(pointer: coarse)`；普通 mobile viewport 不等于粗指针，缺少条件时记录未观测，不启动替代浏览器。

文档站当前 ThemeProvider 默认写 html 的 `.light/.dark` class，探针默认验证该模式和 `color-scheme`；如果另一个消费页面明确使用属性模式，传 `themeAttribute: 'data-theme'`。相反的 class 或旧 data-theme 一律视为冲突。每条观察记录实际主题标记，ID 包含真实 pointer 和宽高；fine/coarse context 可由 browser owner 串行调用 `probeIds` 子集，保留各自证据，不相互覆盖。模块在导航前跳过不符合 pointer 条件的触摸实验。

`OBSERVED_CHANGE` 是计算属性发生变化，`OBSERVED_NO_CHANGE` 是有效注入后这组测量值不变，`NOT_OBSERVED` 是目标、状态或注入未验证。只有静态匹配与真实观测一致的已测 case 可标 `PASS`；两层冲突、注入未生效或异常标 `UNVERIFIED`，未测组合不继承通过。无影响 PASS 只证明该 probe 的 measured non-effect，不能声称全组件都不消费。

静态解析只支持平衡括号的 custom-property 声明、TS AST 可读 class literal 和列明的 utility families。保留条件/转发来源；不模拟完整 CSS cascade，不把动态表达式推测成事实。JSON schema 是结构契约，不替代运行时证据。
