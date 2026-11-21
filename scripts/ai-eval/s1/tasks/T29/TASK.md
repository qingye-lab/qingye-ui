# T29 服务器负载

在 `src/ServerLoad.tsx` 实现并导出 `ServerLoad` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type ServerLoadProps = {
  servers: { name: string; load: "低" | "中" | "高" }[];
};
```

## 需求

1. 一个紧凑的列表，每台服务器一行，行内显示服务器名称（`name` 原文）和它的负载等级。
2. 负载等级分为低、中、高三级；高负载需要引起用户注意。

允许修改：`src/ServerLoad.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
