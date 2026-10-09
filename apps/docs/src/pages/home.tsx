import { buttonVariants } from "@qingye_lab/ui/components/button";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
import { installTarget, repoFile, SITE, tarballTarget } from "@/lib/site";
import "./home.css";

/*
 * 首页展示理念本身，不摆组件：总纲与项目定位 → 文与质 → 器用六法 → 表达九法 → 开始使用。
 * 十五法先以名录出现，选一条再看它的设计决定与出处，原文在理念页（展开有据：先预览，再深入，可直达）。
 * 名录是库里的 Tabs：点击或方向键切换，默认每组第一条。出处与设计决定逐字取自 design.md 的两张方法表（契约测试对照），
 * 不另写格言与口号。
 */
type Copy = { zh: string; en: string };
type Method = { n: number; name: Copy; source: Copy; decision: Copy };

const MOTTO: Copy[] = [
  { zh: "器用为本，", en: "Purpose first." },
  { zh: "关系为法，", en: "Relations as method." },
  { zh: "合宜为度。", en: "Fitness as measure." },
];

const USE: Method[] = [
  { n: 1, name: { zh: "名实相符", en: "Semantic fidelity" }, source: { zh: "《论语·子路》「名不正，则言不顺」", en: "Analects: “If names are not correct, language will not accord”" }, decision: { zh: "名称说明对象、动作和后果；等待、成功、失败、结果未知按真实事件表达", en: "Name the object, action, and consequence; express waiting, success, failure, and unknown results from actual events" } },
  { n: 2, name: { zh: "相成相制", en: "Mutual support and restraint" }, source: { zh: "《素问》君臣佐使", en: "Suwen: sovereign, minister, assistant, envoy" }, decision: { zh: "让内容、说明、操作和保护措施共同完成任务；功能作用与视觉强调分别判断", en: "Let content, explanations, actions, and safeguards complete the task together; judge functional roles separately from visual emphasis" } },
  { n: 3, name: { zh: "布白有用", en: "Purposeful space" }, source: { zh: "《老子》「当其无，有室之用」", en: "Laozi: “Where the room is empty lies its use”" }, decision: { zh: "分别安排关系间隔、可工作的空间与判断余地；保留有用的信息密度", en: "Arrange relationship spacing, working capacity, and room for judgment separately; retain useful information density" } },
  { n: 4, name: { zh: "随境取度", en: "Contextual fitness" }, source: { zh: "《中庸》「君子而时中」", en: "Doctrine of the Mean: “the noble person is timely in the mean”" }, decision: { zh: "按任务选择显著程度、持续时间与是否中断；改变布局时保留正在发生的工作", en: "Choose emphasis, duration, and interruption for the task; preserve active work when changing layouts" } },
  { n: 5, name: { zh: "展开有据", en: "Justified disclosure" }, source: { zh: "园林框景、借景与移步换景", en: "Garden framing, borrowed views, and changing views with each step" }, decision: { zh: "提供有理由的预览与深入，同时支持直接抵达和合理返回", en: "Provide previews and deeper access for a reason, with direct arrival and a reasonable way back" } },
  { n: 6, name: { zh: "进退相承", en: "Continuity of progress and retreat" }, source: { zh: "《易·乾·文言》「知进退存亡而不失其正」", en: "Book of Changes: “knowing advance and retreat, survival and loss, without losing what is right”" }, decision: { zh: "正常、等待、失败、未知、取消与恢复围绕同一对象连续发生", en: "Keep normal work, waiting, failure, uncertainty, cancellation, and recovery tied to the same object" } },
];

const EXPRESSION: Method[] = [
  { n: 7, name: { zh: "以材为祖", en: "Module as ancestor" }, source: { zh: "《营造法式》「凡构屋之制，皆以材为祖」", en: "Yingzao Fashi: “All building begins from the cai module”" }, decision: { zh: "全部几何由一个基本量派生：材是正文的一行，分是材的整除单位；尺寸档与密度只换「等」，各部位同比变化", en: "Derive all geometry from one base measure: the module is one line of body text; the unit divides it. Size steps and density change only the grade, scaling parts together" } },
  { n: 8, name: { zh: "疏密有致", en: "Ordered density" }, source: { zh: "邓石如「疏处可以走马，密处不使透风，常计白以当黑」", en: "Deng Shiru: “Where sparse, a horse may run; where dense, no wind passes; count the white as black”" }, decision: { zh: "间距是分组的第一手段：组内紧、组间松、章节更松，级差一眼可辨；空白与笔墨同样经营", en: "Spacing is the first means of grouping: tight within groups, looser between them, looser still between sections, with steps that read at a glance. Space is composed as carefully as ink" } },
  { n: 9, name: { zh: "墨分五色", en: "Five tones of ink" }, source: { zh: "张彦远「运墨而五色具」", en: "Zhang Yanyuan: “Handle ink and the five colors are present”" }, decision: { zh: "一条有限的中性墨阶承担文字、线与承载面的全部层级；彩色只随语义类别施用；品牌强调色如一方印，少而明确", en: "One limited neutral ink ladder carries the hierarchy of text, lines, and surfaces. Hue is applied only by semantic category; a brand accent acts like a seal, rare and specific" } },
  { n: 10, name: { zh: "骨法用笔", en: "Bone method of the brush" }, source: { zh: "谢赫「骨法用笔」", en: "Xie He: “bone method in using the brush”" }, decision: { zh: "线是结构：只在面无法划出范围时用线；线宽统一，强调靠墨色加浓而不靠加粗；一个范围只用一种边界机制", en: "Lines are structure: draw one only where a surface cannot mark a boundary. Use one line weight; emphasize by deepening ink, not thickening. One boundary mechanism per region" } },
  { n: 11, name: { zh: "应物象形", en: "Form follows the object" }, source: { zh: "谢赫「应物象形」", en: "Xie He: “correspond to the object in depicting form”" }, decision: { zh: "形随物性：方以载事，可操作与可编辑的范围方整而转角有缓；圆以标点，只给点与身份", en: "Square for things that carry work: actionable and editable regions are square with eased corners. Round for points and identities only" } },
  { n: 12, name: { zh: "经营位置", en: "Composition of placement" }, source: { zh: "谢赫「经营位置」", en: "Xie He: “planning placement”" }, decision: { zh: "主次先由位置与留白确立，再施尺寸与墨色；一个视图只有一个君", en: "Establish priority through position and space before size and ink. One sovereign per view" } },
  { n: 13, name: { zh: "绘事后素", en: "Plain ground before color" }, source: { zh: "《论语·八佾》「绘事后素」", en: "Analects: “Painting comes after the plain ground”" }, decision: { zh: "先有素地，后施色彩；表面平净，不用装饰性的渐变、纹理与高光；阴影只表达真实的浮起", en: "A plain ground first, color after. Surfaces stay clean, without decorative gradients, textures, or highlights. Shadows express actual elevation only" } },
  { n: 14, name: { zh: "气韵生动", en: "Resonant vitality" }, source: { zh: "谢赫「气韵生动」", en: "Xie He: “resonance of spirit, vitality of movement”" }, decision: { zh: "动不离位：动效从变化发生处开始，说明来处与去处，可中断；同类变化同一节拍，整体读来贯通", en: "Motion keeps its place: it begins where the change happens, shows origin and destination, and can be interrupted. Similar changes share one rhythm so the whole reads as continuous" } },
  { n: 15, name: { zh: "材有美", en: "Respect the material" }, source: { zh: "《考工记》「材有美」", en: "Kaogongji: “materials have their beauty”" }, decision: { zh: "顺着媒介做：几何落在整像素上；默认系统字体，使中西字面成对；保留平台原生行为", en: "Work with the medium: geometry on whole pixels; system fonts by default so Latin and Chinese faces pair; preserve native platform behavior" } },
];

type MethodsProps = { id: string; title: string; role: string; methods: Method[]; pick: (copy: Copy) => string; fullText: string };

function Methods({ id, title, role, methods, pick, fullText }: MethodsProps) {
  return <section aria-labelledby={id} className="home-methods home-row">
    <div className="home-methods-head">
      <Heading id={id} step="title">{title}</Heading>
      <Text className="text-muted-foreground">{role}</Text>
    </div>
    <Tabs className="home-index" defaultValue={methods[0]?.n}>
      <TabsList aria-labelledby={id} className="home-index-list">
        {methods.map(method => <TabsTab className="home-index-tab text-heading" key={method.n} value={method.n}>{pick(method.name)}</TabsTab>)}
      </TabsList>
      {/* 各条详情叠在同一格里，高度取最长的一条，切换时下文不跳。 */}
      <div className="home-index-panels">
        {methods.map(method => <TabsPanel className="home-index-panel" key={method.n} value={method.n}>
          <Text className="home-method-decision">{pick(method.decision)}{pick({ zh: "。", en: "." })}</Text>
          <Text className="home-index-meta" step="support">
            <span className="home-method-source">{pick(method.source)}</span>
            <Link className={linkClassName} to={`/docs/design-philosophy#method-${method.n}`}>{fullText}</Link>
          </Text>
        </TabsPanel>)}
      </div>
    </Tabs>
  </section>;
}

export default function HomePage() {
  useDocumentTitle();
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => en ? english : zh;
  const pick = (copy: Copy) => en ? copy.en : copy.zh;
  const fullText = t("原文", "Full text");
  return <main className="home site-frame" id="main" tabIndex={-1}>
    <section aria-labelledby="home-title" className="home-hero home-row">
      <Heading id="home-title" level={1} step="display-xl">{MOTTO.map(line => <span key={line.zh}>{pick(line)}</span>)}</Heading>
      <div className="home-intro">
        <Text className="home-intro-lede" step="reading">{t("Qingye UI 从中国传统的经典与东方美学中取法。", "Qingye UI takes its methods from Chinese classics and Eastern aesthetics.")}</Text>
        <Text className="home-intro-fact text-muted-foreground">{en ? <>A React component library built on <span>Base UI</span> and <span>Tailwind CSS 4</span>.</> : <>基于 <span>Base UI</span> 与 <span>Tailwind CSS 4</span> 的 React 组件库。</>}</Text>
        <div className="home-actions">
          <Link className={buttonVariants({ size: "lg" })} to="/docs/design-philosophy">{t("阅读设计理念", "Read the design philosophy")}</Link>
          <Link className={linkClassName} to="/docs/installation">{t("开始使用", "Get started")}</Link>
        </div>
      </div>
    </section>

    <section aria-labelledby="home-substance" className="home-substance home-row">
      <Heading id="home-substance" step="title">{t("文与质", "Substance and form")}</Heading>
      <figure>
        {en
          ? <blockquote><Text step="chapter">When substance exceeds form, the result is crude; when form exceeds substance, the result is clerical. Only when form and substance are in balance is one a person of quality.</Text></blockquote>
          : <blockquote><Text step="chapter">质胜文则野，文胜质则史。</Text><Text step="chapter">文质彬彬，然后君子。</Text></blockquote>}
        <Text className="text-muted-foreground" render={<figcaption />}>{t("——《论语·雍也》", "— The Analects, Yong Ye")}</Text>
      </figure>
      <div className="home-substance-text">
        <Text step="reading">{t("语义与关系是质，表达是文。语义正确而形制粗糙，与外观精致而状态失真，同样不算完成。", "Semantics and relationships are substance; expression is form. Correct semantics with rough form, and refined appearance with false states, are equally unfinished.")}</Text>
        <Text step="reading">{t("质依器用六法，文依表达九法；分别判断，不互相代替。", "Substance follows the six methods of use, form follows the nine methods of expression. Judge them separately; neither substitutes for the other.")}</Text>
      </div>
    </section>

    <Methods fullText={fullText} id="home-use" methods={USE} pick={pick} role={t("处理语义、关系与任务", "Semantics, relationships, and tasks")} title={t("器用六法", "Six methods of use")} />
    <Methods fullText={fullText} id="home-expression" methods={EXPRESSION} pick={pick} role={t("处理尺度、墨色、线、形、位置、表面与动", "Measure, ink, line, shape, placement, surface, and motion")} title={t("表达九法", "Nine methods of expression")} />

    <section aria-labelledby="home-start" className="home-start home-row">
      <div>
        <Heading id="home-start" step="title">{t("开始使用", "Get started")}</Heading>
        <Text className="text-muted-foreground">{t("需要 React 19.2 及以上。", "Requires React 19.2 or later.")}</Text>
      </div>
      <div className="home-start-body">
        <Tabs className="home-install" defaultValue="npm">
          <TabsList aria-label={t("安装方式", "Install from")}>
            <TabsTab value="npm">npm</TabsTab>
            <TabsTab value="tarball">{t("tgz 包", "Tarball")}</TabsTab>
          </TabsList>
          <TabsPanel value="npm"><CodeBlock code={`pnpm add ${installTarget}`} /></TabsPanel>
          <TabsPanel className="home-install-tarball" value="tarball">
            <CodeBlock code={`pnpm add ${tarballTarget}`} />
            <Text className="text-muted-foreground">{t("无法访问 npm 时使用：tgz 文件从 GitHub Release 下载，或在仓库里打包。", "For projects without npm access: download the file from a GitHub Release or pack it from the repository.")}</Text>
          </TabsPanel>
        </Tabs>
        <nav aria-label={t("接入资料", "Setup resources")} className="home-start-links text-body">
          <Link className={linkClassName} to="/docs/installation">{t("安装说明", "Installation")}</Link>
          <a className={linkClassName} download href={en ? "/design.en.md" : "/design.md"}>design.md</a>
          <Link className={linkClassName} to="/docs/ai">{t("AI 使用", "Using AI")}</Link>
        </nav>
      </div>
    </section>

    <footer className="home-footer text-body text-muted-foreground">
      <span>Qingye UI <span className="home-footer-version">{SITE.version}</span></span>
      <nav aria-label={t("项目链接", "Project links")}><Link className={linkClassName} to="/docs/components">{t("组件", "Components")}</Link><a className={linkClassName} href={SITE.repo}>GitHub</a><a className={linkClassName} href={repoFile("LICENSE")}>MIT</a></nav>
    </footer>
  </main>;
}
