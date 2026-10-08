import { METHODS, methodsFor } from "@/lib/design-guidance";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { Table, TableContainer, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { use, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { CodeBlock } from "@/components/code-block";
import { DemoFrame } from "@/components/demo";
import { A, Code, H2, H3, P, PageHeader, Ul } from "@/components/prose";
import { importSnippet } from "@/lib/highlight";
import { splitTitle } from "@/lib/nav";
import { findComponent, loadDemos, type ComponentEntry, type LoadedDemo } from "@/lib/registry";
import type { ApiPart, KeyboardRow } from "@/lib/types";
import { NotFoundContent } from "../not-found";
import { useDocsLocale } from "@/lib/docs-locale";
import { localizedMeta } from "@/lib/localized-meta";
import { ContentBoundary } from "@/components/content-boundary";
import { PageState } from "@/components/page-state";
import "./component.css";

const componentCopy = {
  zh: {
    layer: "层", methods: "方法", exports: "导出", separator: "、",
    examples: "示例", when: "何时使用", use: "适用", avoid: "不适用",
    state: "状态归属", library: "组件负责", application: "应用负责",
    decisions: "设计决定", import: "导入", api: "API", keyboard: "键盘交互", notes: "使用建议",
    prop: "属性", type: "类型", default: "默认值", description: "说明",
    key: "按键", action: "行为", or: "或", noDefault: "无",
    noDemos: "暂无示例", demosFailed: "示例暂时无法加载", browse: "浏览其他组件",
    importBefore: "按组件入口导入只打包这一个文件：", importAfter: "。两种入口的取舍见 ", installation: "安装", importEnd: "。",
    notFound: (slug: string) => `没有名为 “${slug}” 的组件文档。`,
  },
  en: {
    layer: "Layer", methods: "Methods", exports: "Exports", separator: ", ",
    examples: "Examples", when: "When to use", use: "Use for", avoid: "Not for",
    state: "State ownership", library: "Handled by the component", application: "Handled by your application",
    decisions: "Decisions", import: "Import", api: "API", keyboard: "Keyboard interactions", notes: "Usage notes",
    prop: "Prop", type: "Type", default: "Default", description: "Description",
    key: "Key", action: "Action", or: "or", noDefault: "None",
    noDemos: "No examples yet", demosFailed: "Examples could not be loaded", browse: "Browse other components",
    importBefore: "Import from the component entry to bundle just this file: ", importAfter: ". Compare the two entry points in ", installation: "Installation", importEnd: ".",
    notFound: (slug: string) => `No component documentation found for “${slug}”.`,
  },
};

/** design.md 系统分层 names the layers in English in both languages. */
const LAYER_NAMES = { foundation: "Foundation", primitive: "Primitive", pattern: "Pattern" } as const;

const cache = new Map<string, Promise<LoadedDemo[]>>();

/** Suspends until the demos are loaded, so navigation keeps the old page meanwhile. */
function demosFor(slug: string): Promise<LoadedDemo[]> {
  let promise = cache.get(slug);
  if (!promise) {
    promise = loadDemos(slug);
    promise.catch(() => cache.delete(slug));
    cache.set(slug, promise);
  }
  return promise;
}

export default function ComponentPage() {
  const { slug = "" } = useParams();
  const locale = useDocsLocale();
  const found = findComponent(slug);
  const entry = found ? localizedMeta(found, locale) : undefined;
  if (!entry) return <NotFoundContent detail={componentCopy[locale].notFound(slug)} />;
  return <ComponentDoc entry={entry} />;
}

/**
 * One component page, in reading order: what it is, the live examples, when it fits and when it
 * does not, who holds which state, what a reader would get wrong, then the reference tail.
 *
 * Every section reads authored metadata only. `designFor()` still synthesizes category defaults for
 * the catalog (`gen-catalog.mjs`); this page renders nothing where a component has nothing of its
 * own to say, so a section's presence is itself information. `pageDecisionsFor()` is not used here
 * because its fallback (avoid + application ownership) is already shown in its own sections.
 */
function ComponentDoc({ entry }: { entry: ComponentEntry }) {
  const locale = useDocsLocale();
  const text = componentCopy[locale];
  const { zh, en } = splitTitle(entry.title);
  const design = entry.design ?? {};
  const use = clean(design.whenToUse);
  const avoid = clean(design.avoid);
  const library = clean(design.stateOwner?.library);
  const application = clean(design.stateOwner?.application);
  const decisions = entry.decisions?.trim() ?? "";
  return (
    <article>
      <PageHeader
        description={entry.description}
        documentTitle={en ? `${zh} ${en}` : zh}
        title={
          <>
            {zh}
            {en ? <span className="component-title-en" lang="en">{en}</span> : null}
          </>
        }
      >
        <Facts entry={entry} />
      </PageHeader>

      <H2 id="examples">{text.examples}</H2>
      <ContentBoundary key={entry.slug} title={text.demosFailed}>
        <Demos slug={entry.slug} />
      </ContentBoundary>

      {use.length || avoid.length ? (
        <>
          <H2 id="when">{text.when}</H2>
          <Pairs columns={[[text.use, use], [text.avoid, avoid]]} />
        </>
      ) : null}

      {library.length || application.length ? (
        <>
          <H2 id="state">{text.state}</H2>
          <Pairs columns={[[text.library, library], [text.application, application]]} />
        </>
      ) : null}

      {decisions ? (
        <>
          <H2 id="decisions">{text.decisions}</H2>
          <P>{renderInline(decisions)}</P>
        </>
      ) : null}

      <H2 id="import">{text.import}</H2>
      <CodeBlock code={importSnippet(entry.exports)} />
      <P className="mt-(--qy-field-gap) text-body text-muted-foreground">
        {text.importBefore}<Code>@qingye_lab/ui/components/{entry.slug}</Code>{text.importAfter}
        <A href="/docs/installation#per-component">{text.installation}</A>
        {text.importEnd}
      </P>

      {entry.api.length ? <ApiReference parts={entry.api} /> : null}
      {entry.keyboard?.length ? <KeyboardTable rows={entry.keyboard} /> : null}
      {entry.notes?.length ? (
        <>
          <H2 id="notes">{text.notes}</H2>
          <Ul>
            {entry.notes.map((note) => (
              <li className="text-pretty" key={note}>{renderInline(note)}</li>
            ))}
          </Ul>
        </>
      ) : null}
    </article>
  );
}

const clean = (items: string[] | undefined) => (items ?? []).map((item) => item.trim()).filter(Boolean);

/** Layer, methods and export count, each only when the metadata states it. */
function Facts({ entry }: { entry: ComponentEntry }) {
  const locale = useDocsLocale();
  const text = componentCopy[locale];
  const localized = methodsFor(locale);
  const methods = (entry.design?.methods ?? [])
    .map((name) => localized[METHODS.findIndex((method) => method.name === name)])
    .filter((method): method is (typeof localized)[number] => Boolean(method));
  const layer = entry.layer ? LAYER_NAMES[entry.layer] : undefined;
  if (!layer && !methods.length && !entry.exports.length) return null;
  return (
    <dl className="component-facts">
      {layer ? (
        <div>
          <dt>{text.layer}</dt>
          <dd lang="en">{layer}</dd>
        </div>
      ) : null}
      {methods.length ? (
        <div>
          <dt>{text.methods}</dt>
          <dd>
            {methods.map((method, index) => (
              <span key={method.href}>
                {index ? text.separator : null}
                <A href={method.href}>{method.name.replace(/\s*（[^）]*）$/, "")}</A>
              </span>
            ))}
          </dd>
        </div>
      ) : null}
      {entry.exports.length ? (
        <div>
          <dt>{text.exports}</dt>
          <dd className="numeric">{entry.exports.length}</dd>
        </div>
      ) : null}
    </dl>
  );
}

/** Two authored lists read side by side; an empty side is left out rather than filled. */
function Pairs({ columns }: { columns: [string, string[]][] }) {
  const shown = columns.filter(([, items]) => items.length);
  return (
    <div className="component-pairs">
      {shown.map(([label, items]) => (
        <section key={label}>
          <h3>{label}</h3>
          <ul>
            {items.map((item) => (
              <li key={item}>{renderInline(item)}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Demos({ slug }: { slug: string }) {
  const locale = useDocsLocale();
  const text = componentCopy[locale];
  const demos = use(demosFor(slug));
  if (!demos.length) {
    return (
      <PageState state="empty" headingLevel={3} title={text.noDemos}>
        <A href="/docs/components">{text.browse}</A>
      </PageState>
    );
  }
  return (
    <div>
      {demos.map((demo) => (
        <DemoFrame demo={demo} key={demo.id} slug={slug} />
      ))}
    </div>
  );
}

/** Wraps `code spans` in meta text (descriptions and notes) as inline code. */
function renderInline(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) =>
    part.startsWith("`") && part.endsWith("`") && part.length > 2 ? <Code key={index}>{part.slice(1, -1)}</Code> : part,
  );
}

const partId = (name: string) => `api-${name.replace(/[^A-Za-z0-9]+/g, "-").toLowerCase()}`;

function ApiReference({ parts }: { parts: ApiPart[] }) {
  const locale = useDocsLocale();
  const text = componentCopy[locale];
  return (
    <>
      <H2 id="api">{text.api}</H2>
      {parts.map((part) => (
        <section className="mt-(--qy-section-gap) [h2+&]:mt-(--qy-space-4)" key={part.name}>
          <H3 className="mt-0 mb-(--qy-field-gap) font-mono text-reading" id={partId(part.name)}>
            {part.name}
          </H3>
          <p className="mb-(--qy-space-3) max-w-(--docs-measure) text-pretty text-body text-muted-foreground">{renderInline(part.description)}</p>
          {part.props?.length ? (
            <TableContainer className="rounded-panel border border-border">
              <Table className="min-w-[36rem] table-fixed" data-density="compact">
                <colgroup>
                  <col className="w-[26%]" />
                  <col className="w-[30%]" />
                  <col className="w-[14%]" />
                  <col />
                </colgroup>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-caption">{text.prop}</TableHead>
                    <TableHead className="text-caption">{text.type}</TableHead>
                    <TableHead className="text-caption">{text.default}</TableHead>
                    <TableHead className="text-caption">{text.description}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {part.props.map((prop) => (
                    <TableRow className="hover:bg-transparent" key={prop.name}>
                      <TableCell className="whitespace-normal align-top">
                        <code className="break-words font-mono text-body-strong text-foreground-strong">{prop.name}</code>
                      </TableCell>
                      <TableCell className="whitespace-normal align-top">
                        <code className="break-words font-mono text-caption text-(--sh-entity)">{prop.type}</code>
                      </TableCell>
                      <TableCell className="whitespace-normal align-top">
                        {prop.default ? (
                          <code className="break-words font-mono text-caption text-muted-foreground">{prop.default}</code>
                        ) : (
                          <span aria-label={text.noDefault} className="text-foreground-subtle">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-normal align-top text-body text-foreground">
                        {renderInline(prop.description)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </section>
      ))}
    </>
  );
}

function Keys({ value }: { value: string }) {
  const locale = useDocsLocale();
  const text = componentCopy[locale];
  // "Enter / Space" → alternatives; "Shift + Tab" → a chord.
  const alternatives = value.split(/\s+\/\s+|\s*或\s*/);
  return (
    <span className="flex flex-wrap items-center gap-(--qy-space-2)">
      {alternatives.map((alt, i) => (
        <span className="flex items-center gap-(--qy-space-1)" key={i}>
          {i > 0 ? <span className="text-muted-foreground text-caption">{text.or}</span> : null}
          {alt.split(/\s*\+\s*/).map((key, j) => (
            <span className="flex items-center gap-(--qy-space-1)" key={j}>
              {j > 0 ? <span className="text-muted-foreground text-caption">+</span> : null}
              <Kbd>{key}</Kbd>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function KeyboardTable({ rows }: { rows: KeyboardRow[] }) {
  const locale = useDocsLocale();
  const text = componentCopy[locale];
  return (
    <>
      <H2 id="keyboard">{text.keyboard}</H2>
      <TableContainer className="rounded-panel border border-border">
        <Table data-density="compact">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[40%] text-caption">{text.key}</TableHead>
              <TableHead className="text-caption">{text.action}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow className="hover:bg-transparent" key={row.keys}>
                <TableCell className="whitespace-normal align-top">
                  <Keys value={row.keys} />
                </TableCell>
                <TableCell className="whitespace-normal align-top text-body text-foreground">
                  {renderInline(row.description)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
