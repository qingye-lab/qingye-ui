import type { ComponentDesign, ComponentMeta } from "./types";

export const METHODS = [
  { name: "名实相符", decision: "名称说明对象、动作与真实结果。", example: "保存超时后显示结果待核实，输入继续保留。", avoid: "请求发出就宣布已保存。", href: "/docs/patterns/edit" },
  { name: "相成相制", decision: "内容、操作、说明与保护共同完成任务。", example: "审核范围改变后重新确认；停止可以成为当下重点。", avoid: "把保护动作永远放在最弱的位置。", href: "/docs/patterns/review" },
  { name: "布白有用", decision: "关系间隔、工作容量与判断余地分别安排。", example: "比较字段同时保留，正文给阅读留出空间。", avoid: "为了低密度删掉比较列，或把示例自动变成输入。", href: "/docs/patterns/collection" },
  { name: "随境取度", decision: "按任务选择显著程度、持续时间和是否中断。", example: "字段错误原位出现，长阅读以正文为主。", avoid: "所有错误只用短暂通知，所有结果都弹窗。", href: "/docs/patterns/read" },
  { name: "展开有据", decision: "深入有理由，直接抵达与合理返回并存。", example: "详情保留明确对象；直达有稳定的上级入口。", avoid: "重要后果只藏在 Tooltip，返回依赖不存在的历史。", href: "/docs/patterns/detail" },
  { name: "进退相承", decision: "等待、失败、未知、取消与恢复围绕同一对象。", example: "取消请求与已取消分开，批量只重试失败项。", avoid: "关闭窗口就称为取消后台任务。", href: "/docs/patterns/queue" },
] as const;

const categoryMethods: Record<string, string[]> = {
  通用: ["名实相符", "相成相制", "随境取度"], 表单: ["名实相符", "布白有用", "进退相承"],
  日期与时间: ["名实相符", "展开有据", "进退相承"], 数据展示: ["名实相符", "布白有用", "展开有据"],
  反馈: ["名实相符", "随境取度", "进退相承"], 浮层: ["相成相制", "展开有据", "进退相承"],
  导航: ["名实相符", "展开有据", "进退相承"], 布局: ["相成相制", "布白有用", "随境取度"],
  排版: ["名实相符", "布白有用", "随境取度"], 工具: ["相成相制", "随境取度"],
};

/** The site and catalog generator both consume this function. */
export function designFor(meta: ComponentMeta, slug: string): ComponentDesign {
  const isInput = ["表单", "日期与时间"].includes(meta.category);
  const isOverlay = meta.category === "浮层";
  const design: ComponentDesign = {
    methods: categoryMethods[meta.category] ?? ["名实相符"],
    whenToUse: [meta.description],
    avoid: [isInput ? "不能仅用 placeholder 代替名称；失败后不要无故清空输入。" : isOverlay ? "不要把唯一的关键后果藏在临时浮层；直达与返回都需要成立。" : "不要让样式替代语义；空值、未知与零分别表达。"],
    composition: meta.api.map((part) => `${part.name}：${part.description}`),
    stateOwner: {
      library: ["当前导出和属性定义的基础交互、可访问语义与样式。"],
      application: [isInput ? "对象、草稿、校验业务规则、版本与保存结果。" : "数据、权限、动作范围、异步结果与持久化。"],
    },
    responsive: ["窄容器保留必要内容与可达操作；布局改变时保留对象、输入和焦点。"],
    customization: ["先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。", "品牌、明暗和密度分别配置，主题不改变权限或保存策略。"],
    ...meta.design,
  };
  if (slug === "button") {
    design.whenToUse = ["执行名称明确的动作。当前最重要的动作可以是保存，也可以是停止或返回。"];
    design.avoid = ["不要把所有操作都叫确定；视觉样式不能隐式授权或决定风险。"];
  }
  if (slug === "table" || slug === "data-table") design.avoid = ["比较任务不应在窄屏直接删除关键列；保留二维关系，并给横向阅读清楚入口。"];
  if (slug === "toast") design.avoid = ["不要只在会消失的通知里表达需要修正的错误或唯一操作入口。"];
  if (slug === "theme-provider") design.stateOwner.application = ["文档级主题偏好与保存位置由宿主配置；品牌写 data-brand，密度写 data-density。"];
  return design;
}
