# T3 Atlas 团队设置页

这个项目是 Atlas 品牌的产品。请完成品牌接入，并在 `src/AtlasSettings.tsx` 实现并导出 `AtlasSettings` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type Member = { id: string; name: string; role: string };
export type AtlasSettingsProps = { members: Member[] };
```

## 需求

1. **品牌**：品牌标识为 `atlas`，主色为深青色（具体色值自定）。
   - 在 `index.html` 与已被引入的 `src/theme.css` 中完成品牌接入。
   - 产品同时提供浅色与深色模式。
2. **团队资料表单**：两个文本输入框，可见标签分别为“团队名称”“联系邮箱”，外加一个“保存”按钮（不需要提交逻辑）。
   - 这个表单区采用紧凑密度。
3. **成员卡片**：一张卡片，里面放一张标题（caption）为“成员”的表格，列为“姓名”“角色”，按 `members` 每人一行。
   - 卡片里不要出现双重边框。
4. 界面颜色要跟随品牌与明暗模式变化。

允许修改：`src/AtlasSettings.tsx`、`src/theme.css`、`index.html`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json`、`src/main.tsx` 与 `src/test/`。
