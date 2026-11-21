# T26 套餐变更摘要

在 `src/PlanChange.tsx` 实现并导出 `PlanChange` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type PlanChangeProps = {
  charges: string; // “费用明细”分节的文字
  refundPolicy: string; // “退款规则”分节的文字
  invoice: string; // “发票”分节的文字
  nonRefundable: boolean; // true 表示本次变更生效后不能退款
};
```

## 需求

1. 页面较长，所以“费用明细”“退款规则”“发票”三个分节默认都是收起的；用户可以逐个展开，查看对应分节的文字（文字使用对应属性原文）。每个分节的标题就是上面这三个名称。
2. `nonRefundable` 为 `true` 时，用户要知道这次变更生效后不能退款，文字使用“变更后不可退款”；为 `false` 时不显示这段文字。

允许修改：`src/PlanChange.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
