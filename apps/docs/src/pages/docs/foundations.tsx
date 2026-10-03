import { A, Facts, H2, P, PageHeader } from "@/components/prose";

export default function FoundationsPage() {
  return <article><PageHeader title="基础：表达与情境相称" />
    <H2 id="space">空间与密度</H2><P>将相关字段放在同组，不同任务用章节分开；比较字段并排保留，根据正文行长设置阅读区域宽度。切换紧凑模式时减小组内间距，保留必要文字的字号和触摸命中区域。</P><Facts items={[{ term: "关系间隔", detail: "字段、成组字段、任务节与动作行分别调整，避免每处独立设数值。" }, { term: "工作空间", detail: "长正文和输入区域按内容需要安排；空态提供明确入口，示例采用前不进入提交值。" }, { term: "判断余地", detail: "比较与审核保留原值和建议值；不替使用者预先选择所有内容。" }]} /><P>操作 <A href="/docs/patterns/collection">集合与比较</A>、<A href="/docs/patterns/edit">编辑与恢复</A>，再查 <A href="/docs/tokens">实际令牌</A>。</P>
    <H2 id="surface">表面与轮廓</H2><P>给独立对象设置边界；同一任务内的内容用标题、对齐和间距分组。</P><P>在项目主题中覆盖组件实际使用的令牌。品牌、明暗与密度的配置见 <A href="/docs/theming">主题入口</A>；多个控件共用边界时，使用 <A href="/docs/components/input-group">InputGroup</A>。</P>
    <H2 id="type">中文排版</H2><P>中文不额外拉开字距；比较数字、日期与单位时按列对齐。用项目中的长名称、中英混排和标点检查窄容器，确认正文、标签与说明仍能区分。长链接单独换行，避免撑宽正文。</P><P>操作 <A href="/docs/patterns/read">阅读与位置</A>，查看 <A href="/docs/components/typography">排版组件</A>。</P>
    <H2 id="emphasis">颜色与强调</H2><P>阅读时突出正文，比较时并置数据，输入时突出当前字段；任务出现风险时突出停止操作。危险操作使用危险语义；用文字标明状态，品牌色不代替危险或成功提示。检查文字、图标和控件边界与实际背景的对比度，不凭令牌名判断是否达标。</P><P>在 <A href="/docs/patterns/review">审核与取舍</A> 中确认当前范围，在 <A href="/docs/accessibility">无障碍说明</A> 中核对适用要求。</P>
    <H2 id="state">状态与动效</H2><P>正在保存、结果未知与保存成功分别表达。收到取消确认后再显示“已取消”；关闭页面不代表取消任务。用动效呈现已发生的变化；开启“减少动态效果”后，仍须显示状态、操作名称和恢复入口。</P><P>操作 <A href="/docs/patterns/queue">处理队列</A> 的取消和核实，再查 <A href="/docs/motion">动效策略</A>。</P>
  </article>;
}
