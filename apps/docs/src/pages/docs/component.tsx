import { Badge } from "@qingye/ui/components/badge";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { Kbd } from "@qingye/ui/components/kbd";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { CodeXmlIcon, LayersIcon } from "lucide-react";
import { Component, use, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { CodeBlock } from "@/components/code-block";
import { DemoFrame } from "@/components/demo";
import { A, Code, H2, H3, P, PageHeader } from "@/components/prose";
import { importSnippet } from "@/lib/highlight";
import { splitTitle } from "@/lib/nav";
import { findComponent, loadDemos, type ComponentEntry, type LoadedDemo } from "@/lib/registry";
import { componentSourceUrl } from "@/lib/site";
import type { ApiPart, KeyboardRow } from "@/lib/types";
import { NotFoundContent } from "../not-found";

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

class LoadBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <p className="mt-6 text-muted-foreground text-sm" role="status">
        示例加载失败：<span className="font-mono text-xs">{this.state.error.message}</span>
      </p>
    );
  }
}

export default function ComponentPage() {
  const { slug = "" } = useParams();
  const entry = findComponent(slug);
  if (!entry) return <NotFoundContent detail={`没有名为 “${slug}” 的组件文档。`} />;
  return <ComponentDoc entry={entry} />;
}

function ComponentDoc({ entry }: { entry: ComponentEntry }) {
  const { zh, en } = splitTitle(entry.title);
  return (
    <article>
      <PageHeader
        description={entry.description}
        documentTitle={en ? `${zh} ${en}` : zh}
        title={
          <>
            {zh}
            {en ? <span className="ms-3 font-normal text-[0.6em] text-muted-foreground align-[0.12em]">{en}</span> : null}
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm">
          <Badge size="lg" variant="outline">
            {entry.category}
          </Badge>
          <Badge size="lg" variant="secondary">
            {entry.source === "coss" ? "源自 coss ui" : "本地组件"}
          </Badge>
          <a
            className="focus-ring inline-flex items-center gap-1.5 rounded-sm text-muted-foreground transition-colors hover:text-foreground"
            href={componentSourceUrl(entry.slug)}
            rel="noreferrer"
            target="_blank"
          >
            <CodeXmlIcon aria-hidden="true" className="size-3.5" />
            源码
          </a>
        </div>
      </PageHeader>

      <H2 id="usage">导入</H2>
      <CodeBlock code={importSnippet(entry.exports)} />
      <P className="mt-3 text-[0.875rem] text-muted-foreground">
        也可以按组件入口导入，只打包这一个文件：<Code>@qingye/ui/components/{entry.slug}</Code>
      </P>

      <H2 id="examples">示例</H2>
      <LoadBoundary>
        <Demos slug={entry.slug} />
      </LoadBoundary>

      {entry.api.length ? <ApiReference parts={entry.api} /> : null}
      {entry.keyboard?.length ? <KeyboardTable rows={entry.keyboard} /> : null}
      {entry.notes?.length ? (
        <>
          <H2 id="notes">使用建议</H2>
          <ul className="my-4 flex max-w-[42rem] flex-col gap-2.5">
            {entry.notes.map((note) => (
              <li className="flex gap-3 text-[0.9375rem] text-foreground/90 leading-[1.75]" key={note}>
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

function Demos({ slug }: { slug: string }) {
  const demos = use(demosFor(slug));
  if (!demos.length) {
    return (
      <Empty className="mt-4 rounded-xl border border-dashed py-12 md:py-14">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <LayersIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle className="text-base">示例整理中</EmptyTitle>
          <EmptyDescription>
            这个组件的示例还在编写。可以先阅读下方的 API，或在 <A href="/docs/components">组件总览</A> 中浏览其他组件。
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
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
  return (
    <>
      <H2 id="api">API</H2>
      {parts.map((part) => (
        <section className="mt-8 border-t pt-6 first:mt-5 first:border-t-0 first:pt-0" key={part.name}>
          <H3 className="mt-0 mb-1.5 font-mono font-medium text-[0.9375rem]" id={partId(part.name)}>
            {part.name}
          </H3>
          <p className="mb-3 max-w-[42rem] text-pretty text-[0.875rem] text-muted-foreground leading-relaxed">{renderInline(part.description)}</p>
          {part.props?.length ? (
            <div className="overflow-hidden rounded-xl border">
              <Table className="min-w-[36rem] table-fixed" density="compact">
                <colgroup>
                  <col className="w-[26%]" />
                  <col className="w-[30%]" />
                  <col className="w-[14%]" />
                  <col />
                </colgroup>
                <TableHeader className="bg-surface-subtle/60 dark:bg-surface/40">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="ps-4 text-xs">属性</TableHead>
                    <TableHead className="text-xs">类型</TableHead>
                    <TableHead className="text-xs">默认值</TableHead>
                    <TableHead className="pe-4 text-xs">说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {part.props.map((prop) => (
                    <TableRow className="hover:bg-transparent" key={prop.name}>
                      <TableCell className="whitespace-normal py-2.5 ps-4 align-top">
                        <code className="break-words font-mono font-medium text-[0.8125rem] text-foreground-strong">{prop.name}</code>
                      </TableCell>
                      <TableCell className="whitespace-normal py-2.5 align-top">
                        <code className="break-words font-mono text-[0.75rem] text-(--sh-entity) leading-relaxed">{prop.type}</code>
                      </TableCell>
                      <TableCell className="whitespace-normal py-2.5 align-top">
                        {prop.default ? (
                          <code className="break-words font-mono text-[0.75rem] text-foreground/80">{prop.default}</code>
                        ) : (
                          <span aria-label="无" className="text-foreground-subtle">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-normal py-2.5 pe-4 align-top text-[0.8125rem] text-foreground/85 leading-relaxed">
                        {renderInline(prop.description)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}
        </section>
      ))}
    </>
  );
}

function Keys({ value }: { value: string }) {
  // "Enter / Space" → alternatives; "Shift + Tab" → a chord.
  const alternatives = value.split(/\s+\/\s+|\s*或\s*/);
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      {alternatives.map((alt, i) => (
        <span className="flex items-center gap-1" key={i}>
          {i > 0 ? <span className="me-0.5 text-muted-foreground text-xs">或</span> : null}
          {alt.split(/\s*\+\s*/).map((key, j) => (
            <span className="flex items-center gap-1" key={j}>
              {j > 0 ? <span className="text-muted-foreground text-xs">+</span> : null}
              <Kbd className="h-6 min-w-6 px-1.5 font-mono text-[0.75rem] text-foreground/85">{key}</Kbd>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function KeyboardTable({ rows }: { rows: KeyboardRow[] }) {
  return (
    <>
      <H2 id="keyboard">键盘交互</H2>
      <div className="overflow-hidden rounded-xl border">
        <Table density="compact">
          <TableHeader className="bg-surface-subtle/60 dark:bg-surface/40">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[40%] ps-4 text-xs">按键</TableHead>
              <TableHead className="pe-4 text-xs">行为</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow className="hover:bg-transparent" key={row.keys}>
                <TableCell className="whitespace-normal py-2.5 ps-4 align-top">
                  <Keys value={row.keys} />
                </TableCell>
                <TableCell className="whitespace-normal py-2.5 pe-4 align-top text-[0.8125rem] text-foreground/85 leading-relaxed">
                  {renderInline(row.description)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
