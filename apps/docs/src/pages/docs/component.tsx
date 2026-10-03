import { pageDecisionsFor } from "@/lib/design-guidance";
import { Kbd } from "@qingye/ui/components/kbd";
import { Table, TableContainer, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { use, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { CodeBlock } from "@/components/code-block";
import { DemoFrame } from "@/components/demo";
import { A, Code, H2, H3, P, PageHeader } from "@/components/prose";
import { importSnippet } from "@/lib/highlight";
import { splitTitle } from "@/lib/nav";
import { findComponent, loadDemos, type ComponentEntry, type LoadedDemo } from "@/lib/registry";
import type { ApiPart, KeyboardRow } from "@/lib/types";
import { NotFoundContent } from "../not-found";
import { useDocsLocale } from "@/lib/docs-locale";
import { localizedMeta } from "@/lib/localized-meta";
import { ContentBoundary } from "@/components/content-boundary";
import { PageState } from "@/components/page-state";

const componentCopy = {
  zh: {
    examples: "示例", import: "导入", decisions: "判断", api: "API", keyboard: "键盘交互", notes: "使用建议",
    jump: "跳到 API 与使用建议", prop: "属性", type: "类型", default: "默认值", description: "说明",
    key: "按键", action: "行为", or: "或", noDefault: "无",
    noDemos: "暂无示例", demosFailed: "示例暂时无法加载", browse: "浏览其他组件",
    importBefore: "按组件入口导入只打包这一个文件：", importAfter: "。两种入口的取舍见 ", installation: "安装", importEnd: "。",
    notFound: (slug: string) => `没有名为 “${slug}” 的组件文档。`,
  },
  en: {
    examples: "Examples", import: "Import", decisions: "Decisions", api: "API", keyboard: "Keyboard interactions", notes: "Usage notes",
    jump: "Jump to API and usage notes", prop: "Prop", type: "Type", default: "Default", description: "Description",
    key: "Key", action: "Action", or: "or", noDefault: "None",
    noDemos: "No examples yet", demosFailed: "Examples could not be loaded", browse: "Browse other components",
    importBefore: "Import from the component entry to bundle just this file: ", importAfter: ". Compare the two entry points in ", installation: "Installation", importEnd: ".",
    notFound: (slug: string) => `No component documentation found for “${slug}”.`,
  },
};

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
 * One component page, in reading order.
 *
 * The page opens with the component itself — title, one sentence, then the
 * first live example. What used to sit here was a five-row 使用判断 definition list built by
 * `designFor()`, roughly 600 characters long across the previous catalog; it pushed the
 * component to the third screenful and rendered a Button-level warning
 * ("loading 只表示正在等待，不能当成保存成功") at the same visual weight as a
 * sentence every component repeated. The reference tail below carries what a
 * reader still needs, at the length the component actually has something to
 * say: `decisions` renders as one paragraph and renders nothing when absent.
 *
 * The five synthesized fields are still produced for the catalog — see
 * `gen-catalog.mjs` and `ai/v<version>/components/<name>.md`. Only this page
 * stopped reading them.
 */
function ComponentDoc({ entry }: { entry: ComponentEntry }) {
  const locale = useDocsLocale();
  const text = componentCopy[locale];
  const { zh, en } = splitTitle(entry.title);
  const decisions = pageDecisionsFor(entry, locale);
  return (
    <article>
      <PageHeader
        description={entry.description}
        documentTitle={en ? `${zh} ${en}` : zh}
        title={
          <>
            {zh}
            {en ? <span className="ms-3 align-[0.12em] text-caption text-muted-foreground">{en}</span> : null}
          </>
        }
      />

      <H2 id="examples">{text.examples}</H2>
      <ContentBoundary key={entry.slug} title={text.demosFailed}>
        <Demos slug={entry.slug} />
      </ContentBoundary>

      {referenceAnchor(entry) ? (
        <P className="mt-2 text-body text-muted-foreground">
          <A href={referenceAnchor(entry)}>{text.jump}</A>
        </P>
      ) : null}

      <H2 id="usage">{text.import}</H2>
      <CodeBlock code={importSnippet(entry.exports)} />
      <P className="mt-3 text-body text-muted-foreground">
        {text.importBefore}<Code>@qingye/ui/components/{entry.slug}</Code>{text.importAfter}
        <A href="/docs/installation#per-component">{text.installation}</A>{text.importEnd}
      </P>

      {decisions ? (
        <>
          <H2 id="decisions">{text.decisions}</H2>
          <P>{renderInline(decisions)}</P>
        </>
      ) : null}

      {entry.api.length ? <ApiReference parts={entry.api} /> : null}
      {entry.keyboard?.length ? <KeyboardTable rows={entry.keyboard} /> : null}
      {entry.notes?.length ? (
        <>
          <H2 id="notes">{text.notes}</H2>
          <ul className="my-4 flex max-w-[42rem] flex-col gap-2.5">
            {entry.notes.map((note) => (
              <li className="flex gap-3 text-reading text-foreground/90 leading-[1.75]" key={note}>
                <span aria-hidden="true" className="mt-[0.8em] size-1 shrink-0 rounded-full bg-foreground/40" />
                <span className="text-pretty">{renderInline(note)}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  );
}

/**
 * Where the reference tail starts for this component, or "" when it has none.
 *
 * The jump link exists because the example now comes first: a reader who
 * already knows what the component does wants the API table, and measuring
 * scroll distance by hand is worse than one link. It points at the first
 * section that will actually render, so it never lands on nothing.
 */
function referenceAnchor(entry: ComponentEntry): string {
  if (!entry.api.length && !entry.keyboard?.length && !entry.notes?.length) return "";
  return entry.api.length ? "#api" : entry.keyboard?.length ? "#keyboard" : "#notes";
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
        <section className="mt-8 border-t pt-6 first:mt-5 first:border-t-0 first:pt-0" key={part.name}>
          <H3 className="mt-0 mb-1.5 font-mono text-reading" id={partId(part.name)}>
            {part.name}
          </H3>
          <p className="mb-3 max-w-[42rem] text-pretty text-body text-muted-foreground leading-relaxed">{renderInline(part.description)}</p>
          {part.props?.length ? (
            <TableContainer className="rounded-panel border border-border">
              <Table className="min-w-[36rem] table-fixed" data-density="compact">
                <colgroup>
                  <col className="w-[26%]" />
                  <col className="w-[30%]" />
                  <col className="w-[14%]" />
                  <col />
                </colgroup>
                <TableHeader className="bg-surface-subtle/60 dark:bg-surface/40">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="ps-4 text-caption">{text.prop}</TableHead>
                    <TableHead className="text-caption">{text.type}</TableHead>
                    <TableHead className="text-caption">{text.default}</TableHead>
                    <TableHead className="pe-4 text-caption">{text.description}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {part.props.map((prop) => (
                    <TableRow className="hover:bg-transparent" key={prop.name}>
                      <TableCell className="whitespace-normal py-2.5 ps-4 align-top">
                        <code className="break-words font-mono text-heading text-foreground-strong">{prop.name}</code>
                      </TableCell>
                      <TableCell className="whitespace-normal py-2.5 align-top">
                        <code className="break-words font-mono text-caption text-(--sh-entity) leading-relaxed">{prop.type}</code>
                      </TableCell>
                      <TableCell className="whitespace-normal py-2.5 align-top">
                        {prop.default ? (
                          <code className="break-words font-mono text-caption text-foreground/80">{prop.default}</code>
                        ) : (
                          <span aria-label={text.noDefault} className="text-foreground-subtle">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-normal py-2.5 pe-4 align-top text-heading text-foreground/85 leading-relaxed">
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
    <span className="flex flex-wrap items-center gap-1.5">
      {alternatives.map((alt, i) => (
        <span className="flex items-center gap-1" key={i}>
          {i > 0 ? <span className="me-0.5 text-muted-foreground text-caption">{text.or}</span> : null}
          {alt.split(/\s*\+\s*/).map((key, j) => (
            <span className="flex items-center gap-1" key={j}>
              {j > 0 ? <span className="text-muted-foreground text-caption">+</span> : null}
              <Kbd className="h-6 min-w-6 px-1.5 font-mono text-caption text-foreground/85">{key}</Kbd>
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
          <TableHeader className="bg-surface-subtle/60 dark:bg-surface/40">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[40%] ps-4 text-caption">{text.key}</TableHead>
              <TableHead className="pe-4 text-caption">{text.action}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow className="hover:bg-transparent" key={row.keys}>
                <TableCell className="whitespace-normal py-2.5 ps-4 align-top">
                  <Keys value={row.keys} />
                </TableCell>
                <TableCell className="whitespace-normal py-2.5 pe-4 align-top text-heading text-foreground/85 leading-relaxed">
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
