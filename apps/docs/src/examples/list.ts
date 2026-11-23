/* 示例清单：总览、查看栏与裸框路由读同一份。uses 只列示例真正围绕任务组合的主要组件（slug）。 */
export type ExampleEntry = {
  id: "workspace" | "records" | "booking" | "review";
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
    text: {
      zh: "团队管理员在这里创建数据集合、触发同步并跟进结果。",
      en: "An admin creates data collections, runs syncs and follows the results.",
    },
    uses: ["workspace", "sidebar", "data-table", "stat", "chart", "command", "drawer", "dialog"],
    source: "apps/docs/src/examples/workspace",
  },
  {
    id: "records",
    title: { zh: "采集记录", en: "Field records" },
    kind: { zh: "列表与详情", en: "List and detail" },
    text: {
      zh: "现场核查员在这里筛选采集记录并批量复核。",
      en: "A field reviewer filters collected records and verifies them in bulk.",
    },
    uses: ["data-table", "bulk-action-bar", "search-input", "tabs", "image-preview", "timeline", "tag-input", "file-trigger"],
    source: "apps/docs/src/examples/records.tsx",
  },
  {
    id: "booking",
    title: { zh: "会议室预约", en: "Room booking" },
    kind: { zh: "日常应用", en: "Everyday app" },
    text: {
      zh: "同事在这里挑选时段和人数，预约一间会议室。",
      en: "A colleague picks a time and headcount and books a meeting room.",
    },
    uses: ["steps", "date-picker", "time-field", "combobox", "segmented-control", "number-field", "result", "checkbox-group"],
    source: "apps/docs/src/examples/booking.tsx",
  },
  {
    id: "review",
    title: { zh: "变更审阅台", en: "Change review" },
    kind: { zh: "工程审阅", en: "Code review" },
    text: {
      zh: "工程师在这里逐文件审阅变更并留下评论。",
      en: "An engineer reviews a change file by file and leaves comments.",
    },
    uses: ["resizable", "filter-bar", "context-menu", "collapsible", "composer", "timeline", "progress", "alert-dialog"],
    source: "apps/docs/src/examples/review.tsx",
  },
];

export const findExample = (id: string | undefined) => EXAMPLES.find((entry) => entry.id === id);
