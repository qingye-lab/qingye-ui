import { A, Facts, H2, P, PageHeader } from "@/components/prose";

export default function FoundationsPage() {
  return <article><PageHeader title="基础：表达与情境相称" description="先确定任务需要什么关系，再选择空间、表面、排版、强调和状态。" />
    <H2 id="space">空间与密度</H2><P>阅读、比较与输入需要不同的工作容量。相关字段靠近，任务之间分节；比较字段同时在场，阅读正文保留合适行长。紧凑不通过缩小必要文字与命中目标完成。</P><Facts items={[{ term: "关系间隔", detail: "字段、成组字段、任务节与动作行分别调整，避免每处独立设数值。" }, { term: "工作空间", detail: "长正文和输入区域按内容需要安排；空态提供明确入口，示例采用前不进入提交值。" }, { term: "判断余地", detail: "比较与审核保留原值和建议值；不替使用者预先选择所有内容。" }]} /><P>操作 <A href="/docs/patterns/collection">集合与比较</A>、<A href="/docs/patterns/edit">编辑与恢复</A>，再查 <A href="/docs/tokens">实际令牌</A>。</P>
    <H2 id="surface">表面与轮廓</H2><P>独立对象需要边界，共同任务可以通过标题、对齐与间隔组织。开放、围合、内嵌和浮起是表达选择，无需把每一节都套入卡片。控制圆角与面板圆角承担不同部位。</P><P>项目主题集中修改有真实消费的角色。查看 <A href="/docs/theming">主题入口</A> 和 <A href="/docs/components/input-group">共同边界的 InputGroup</A>。</P>
    <H2 id="type">中文排版</H2><P>中文保持自然字距，数字、日期与单位能横向比较。正文、标签、说明各有清楚位置；真实长名称、中英混排和标点应在窄容器中检查。长链接独立换行，不挤压阅读主轴。</P><P>操作 <A href="/docs/patterns/read">阅读与位置</A>，查看 <A href="/docs/components/typography">排版组件</A>。</P>
    <H2 id="emphasis">颜色与强调</H2><P>当前最重要的内容可以是正文、数据、输入或停止操作。危险语义与品牌强调分别考虑；状态同时有文字，颜色不能独自传达事实。真实前景与背景组合需要检查，令牌名称不会自动保证对比度。</P><P>在 <A href="/docs/patterns/review">审核与取舍</A> 中确认当前范围，在 <A href="/docs/accessibility">无障碍说明</A> 中核对适用要求。</P>
    <H2 id="state">状态与动效</H2><P>正在保存、结果未知与保存成功分别表达。取消请求等待确认，关闭页面不代表取消任务。动效只交代真实变化；减少动态效果时，状态、名称与恢复仍成立。</P><P>操作 <A href="/docs/patterns/queue">处理队列</A> 的取消和核实，再查 <A href="/docs/motion">动效策略</A>。品牌、明暗和密度独立，主题不会改变保存、权限或确认条件。</P>
  </article>;
}
