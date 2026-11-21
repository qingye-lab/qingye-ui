# T12 存储用量

在 `src/StorageUsage.tsx` 实现并导出 `StorageUsage` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type StorageUsageProps = {
  usedGb: number | null; // 已用容量（GB）；null 表示暂时无法得知用量
  totalGb: number;       // 总容量（GB）
};
```

## 需求

1. 显示名称为“存储空间”的用量读数：已用 / 总量（GB），并带一条图形条表示占比。例如 `usedGb=42`、`totalGb=100` 时读数写作“42 / 100 GB”。
2. `usedGb` 为 `null` 时，显示文字“用量未知”。
3. 按本库约定选择表达这个读数的部件，并保证读屏用户也能读到名称与数值。

允许修改：`src/StorageUsage.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
