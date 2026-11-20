# T2 线索来源筛选

在 `src/SourceFilterTable.tsx` 实现并导出 `SourceFilterTable` 组件与列定义 `columns`，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type Source = { id: string; name: string };
export type Lead = { id: string; name: string; sourceId: string; sourceName: string; status: "进行中" | "已暂停" };
export type SourceFilterTableProps = { leads: Lead[]; sources: Source[] };
export const columns; // 列定义数组，类型改成你所用表格组件的列类型
```

## 需求

1. **来源筛选**：可见标签为“来源”的单选下拉。
   - 第一项是“全部来源”，初始选中它，控件上显示“全部来源”这几个字。
   - 其后按 `sources` 列出各来源。选中某个来源后，表格只显示 `sourceId` 等于它的线索。
   - 再选回“全部来源”，恢复显示全部线索。
2. **线索表格**：表格标题（caption）为“线索”，展示筛选后的线索，每行一条，列依次为：
   - `id: "name"`，表头“名称”，显示 `name`，作为行标题；
   - `id: "source"`，表头“来源”，显示 `sourceName`；
   - `id: "status"`，表头“状态”，显示 `status`。
   - 没有线索时显示“没有线索”。
3. **列宽**（写在导出的 `columns` 上）：
   - 名称往往很长：表格变宽时，名称列分到的宽度是其它可伸缩列的两倍，最窄 160px；
   - 状态只有三个字，状态列刚好容纳内容即可，不随表格变宽；
   - 来源列用默认宽度。

允许修改：`src/SourceFilterTable.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
