import { buttonVariants } from "@qingye_lab/ui/components/button";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Heading, Text } from "@qingye_lab/ui/components/typography";
import { Link } from "@/components/locale-link";
import { useDocumentTitle } from "@/components/prose";
import { SiteFooter } from "@/components/site-footer";
import { useDocsLocale } from "@/lib/docs-locale";
import { installTarget } from "@/lib/site";
import "./home.css";

/*
 * 首页只有三件事：总纲与定位、十五法的名录、开始使用（用户裁决 2026-10-12「less is more」）。
 * 十五法的设计决定与出处都在理念页，首页只给名字与直达的锚点（展开有据：先看见，再深入，可直达）。
 * 版面是一张四栏网格，每栏 16 材（320px）：总纲三句每句五个全角字，64px 一字，正好一栏；
 * 其下各行落在总纲自己的句界上，不另立一套栏线（见 home.css）。
 */
type Copy = { zh: string; en: string };
type Method = { n: number; name: Copy };

const MOTTO: Copy[] = [
  { zh: "器用为本，", en: "Purpose first." },
  { zh: "关系为法，", en: "Relations as method." },
  { zh: "合宜为度。", en: "Fitness as measure." },
];

const USE: Method[] = [
  { n: 1, name: { zh: "名实相符", en: "Semantic fidelity" } },
  { n: 2, name: { zh: "相成相制", en: "Mutual support and restraint" } },
  { n: 3, name: { zh: "布白有用", en: "Purposeful space" } },
  { n: 4, name: { zh: "随境取度", en: "Contextual fitness" } },
  { n: 5, name: { zh: "展开有据", en: "Justified disclosure" } },
  { n: 6, name: { zh: "进退相承", en: "Continuity of progress and retreat" } },
];

const EXPRESSION: Method[] = [
  { n: 7, name: { zh: "以材为祖", en: "Module as ancestor" } },
  { n: 8, name: { zh: "疏密有致", en: "Ordered density" } },
  { n: 9, name: { zh: "墨分五色", en: "Five tones of ink" } },
  { n: 10, name: { zh: "骨法用笔", en: "Bone method of the brush" } },
  { n: 11, name: { zh: "应物象形", en: "Form follows the object" } },
  { n: 12, name: { zh: "经营位置", en: "Composition of placement" } },
  { n: 13, name: { zh: "绘事后素", en: "Plain ground before color" } },
  { n: 14, name: { zh: "气韵生动", en: "Resonant vitality" } },
  { n: 15, name: { zh: "材有美", en: "Respect the material" } },
];

type MethodsProps = { id: string; title: string; role: string; methods: Method[]; pick: (copy: Copy) => string };

/* 一组：第一栏是组名与一行角色说明，二至四栏每栏放一个法名，三个一排。法名是真正的列表，各自去往理念页里自己的锚点。 */
function Methods({ id, title, role, methods, pick }: MethodsProps) {
  return <section aria-labelledby={id} className="home-row home-methods">
    <div>
      <Heading id={id} step="display">{title}</Heading>
      <Text className="home-role text-muted-foreground" step="support">{role}</Text>
    </div>
    <ul className="home-names">
      {methods.map(method => <Text key={method.n} render={<li />} step="display"><Link className={linkClassName} to={`/docs/design-philosophy#method-${method.n}`}>{pick(method.name)}</Link></Text>)}
    </ul>
  </section>;
}

export default function HomePage() {
  useDocumentTitle();
  const locale = useDocsLocale();
  const en = locale === "en";
  const t = (zh: string, english: string) => en ? english : zh;
  const pick = (copy: Copy) => en ? copy.en : copy.zh;
  return <>
    <main className="home site-frame" id="main" tabIndex={-1}>
      <section aria-labelledby="home-title" className="home-hero">
        <Heading className="home-motto" id="home-title" level={1} step="display-xl">{MOTTO.map(line => <span key={line.zh}>{pick(line)}</span>)}</Heading>
        <div className="home-row home-intro">
          <div className="home-intro-text">
            <Text className="home-intro-lede" step="reading">{t("Qingye UI 从中国传统的经典与东方美学中取法。", "Qingye UI takes its methods from Chinese classics and Eastern aesthetics.")}</Text>
            <Text className="text-muted-foreground" step="reading">{t("基于 Base UI 与 Tailwind CSS 4 的 React 组件库。", "A React component library built on Base UI and Tailwind CSS 4.")}</Text>
          </div>
          <div className="home-actions">
            <Link className={buttonVariants({ size: "lg" })} to="/docs/design-philosophy">{t("阅读设计理念", "Read the design philosophy")}</Link>
            <Link className={`${linkClassName} text-reading`} to="/docs/installation">{t("开始使用", "Get started")}</Link>
          </div>
        </div>
      </section>

      <Methods id="home-use" methods={USE} pick={pick} role={t("处理语义、关系与任务", "Semantics, relationships, and tasks")} title={t("器用六法", "Six methods of use")} />
      <Methods id="home-expression" methods={EXPRESSION} pick={pick} role={t("处理尺度、墨色、线、形、位置、表面与动", "Measure, ink, line, shape, placement, surface, and motion")} title={t("表达九法", "Nine methods of expression")} />

      <section aria-labelledby="home-start" className="home-row home-start">
        <Heading id="home-start" step="display">{t("开始使用", "Get started")}</Heading>
        <div className="home-command"><CodeBlock code={`pnpm add ${installTarget}`} /></div>
        <nav aria-label={t("接入资料", "Setup resources")} className="home-start-links text-reading">
          <Link className={linkClassName} to="/docs/installation">{t("安装说明", "Installation")}</Link>
          <a className={linkClassName} download href={en ? "/design.en.md" : "/design.md"}>design.md</a>
          <Link className={linkClassName} to="/docs/ai">{t("AI 使用", "Using AI")}</Link>
        </nav>
      </section>
    </main>
    <SiteFooter />
  </>;
}
