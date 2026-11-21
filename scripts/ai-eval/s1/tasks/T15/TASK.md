# T15 最近登录时间

在 `src/LastSignIn.tsx` 实现并导出 `LastSignIn` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type LastSignInProps = {
  at: Date;  // 最近一次登录的时刻
  now: Date; // 当前时刻，由调用方给定（测试里是固定值）
};
```

## 需求

1. 显示文字“最近登录”，后面跟相对说法，例如“3 分钟前”。
2. 需要核对的用户要能读到确切的时间（日期与时刻）。

按本库约定。允许修改：`src/LastSignIn.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
