# T17 提交申请

在 `src/ApplyForm.tsx` 实现并导出 `ApplyForm` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type ApplyFormProps = {
  submit: (reason: string) => Promise<{ id: string }>; // 成功时返回申请编号；失败时 reject
};
```

## 需求

1. 可见标签为“申请理由”的多行输入框，和名称为“提交申请”的按钮；点击按钮调用 `submit(理由)`。
2. 提交成功后，按本库约定在这一区域告知结局“申请已提交”，并给出去向：名称为“查看申请”的链接，指向 `/applications/<id>`。
3. 提交失败时，告知用户失败（用读屏的用户也要立刻得知）；已填写的理由保留，可以再次提交。

允许修改：`src/ApplyForm.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
