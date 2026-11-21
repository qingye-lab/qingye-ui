# T16 计费说明

在 `src/BillingHelp.tsx` 实现并导出无参数的 `BillingHelp` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export function BillingHelp(): JSX.Element;
```

## 需求

1. 显示价格“¥99/月”，旁边有一个只有图标的帮助按钮，可访问名称为“计费说明”。
2. 点击帮助按钮后显示一句说明“按自然月计费，月中升级按天折算”，以及一个链接“查看计费规则”，指向 `/docs/billing`。
3. 用户要能用键盘到达这个链接。

按本库约定选用组件。允许修改：`src/BillingHelp.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
