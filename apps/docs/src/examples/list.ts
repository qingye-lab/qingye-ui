/* 示例清单：总览、查看栏与裸框路由读同一份。uses 是示例实际组合的主要组件（slug），只列读者想去查的那几个。 */
export type ExampleEntry = {
  id: "workspace" | "records" | "booking";
  title: { zh: string; en: string };
  kind: { zh: string; en: string };
  text: { zh: string; en: string };
  uses: string[];
  source: string;
};

export const EXAMPLES: ExampleEntry[] = [
  {
    id: "workspace",
    title: { zh: "青野工作区", en: "Qingye workspace" },
    kind: { zh: "专业工具", en: "Professional tool" },
    text: { zh: "一个数据同步工具的多页工作区：概览指标、集合表格、集合详情、设置与帮助。侧栏可收起，⌘K 搜索集合。", en: "A multi-page workspace for a data sync tool: overview metrics, a collection table, collection details, settings and help. The sidebar collapses; ⌘K searches collections." },
    uses: ["workspace", "sidebar", "data-table", "chart", "command", "stat"],
    source: "apps/docs/src/examples/workspace",
  },
  {
    id: "records",
    title: { zh: "采集记录", en: "Field records" },
    kind: { zh: "列表与详情", en: "List and detail" },
    text: { zh: "表格与详情并置：搜索、排序、跨页选择、切换紧凑密度；备注只保留在本页。", en: "A table beside its detail: search, sorting, selection across pages and a compact density; notes stay on this page only." },
    uses: ["data-table", "description-list", "search-input", "toggle", "textarea"],
    source: "apps/docs/src/content/workspace/demos/03-records.tsx",
  },
  {
    id: "booking",
    title: { zh: "会议室预约", en: "Room booking" },
    kind: { zh: "日常应用", en: "Everyday app" },
    text: { zh: "分步填写：人数受房间容量制约，冲突的房间说明原因；错误原位出现，返回保留草稿，确认后可以撤销。", en: "A step-by-step form: headcount is bounded by room capacity, conflicting rooms say why, errors appear in place, going back keeps the draft, and a booking can be undone." },
    uses: ["steps", "date-picker", "radio-group", "number-field", "field", "alert"],
    source: "apps/docs/src/examples/booking.tsx",
  },
];

export const findExample = (id: string | undefined) => EXAMPLES.find((entry) => entry.id === id);
