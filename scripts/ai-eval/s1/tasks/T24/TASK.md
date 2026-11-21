# T24 归档项目的操作菜单

在 `src/ProjectActions.tsx` 实现并导出 `ProjectActions` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type ProjectActionsProps = {
  archived: boolean; // 项目是否已归档
  onRename: () => void;
  onTransfer: () => void;
  onCopyLink: () => void;
};
```

## 需求

1. 一个名称为“项目操作”的按钮，点击后打开菜单。菜单里有三项：“重命名”“转交负责人”“复制链接”，点击后分别调用 `onRename()`、`onTransfer()`、`onCopyLink()`。
2. 项目已归档（`archived` 为 `true`）时，不能重命名、不能转交负责人；“复制链接”始终可用。

允许修改：`src/ProjectActions.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
