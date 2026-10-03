import { buttonVariants } from "@qingye/ui/components/button";
import { PageState } from "@/components/page-state";
import type { ComponentType } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { DashboardDemo, MailDemo, StudioDemo, type DemoProps } from "../examples";
import { DEFAULT_EXAMPLE_SLUG, EXAMPLES, ExampleWorkspaceSwitcher, type ExampleSlug } from "../examples/metadata";
import { useDocumentTitle } from "../components/prose";

const DEMOS = {
  dashboard: DashboardDemo,
  mail: MailDemo,
  studio: StudioDemo,
} satisfies Record<ExampleSlug, ComponentType<DemoProps>>;

export default function ExamplePage() {
  const { slug } = useParams();
  const example = slug === undefined ? EXAMPLES[0] : EXAMPLES.find((item) => item.slug === slug);
  const Demo = example ? DEMOS[example.slug] : undefined;
  useDocumentTitle(example?.title ?? "工作区不存在");

  if (slug === undefined) return <Navigate to={DEFAULT_EXAMPLE_SLUG} replace />;

  return (
    <main id="main" tabIndex={-1} className="example-page">
      <ExampleWorkspaceSwitcher current={example?.slug} />
      <div className="example-page-frame">
        {Demo ? <Demo /> : (
          <PageState headingLevel={1} title="工作区不存在">
            <Link
              className={buttonVariants({ variant: "quiet", className: "justify-self-start" })}
              to={`../${DEFAULT_EXAMPLE_SLUG}`}
              relative="path"
            >
              返回工作台
            </Link>
          </PageState>
        )}
      </div>
    </main>
  );
}

// Both existing route imports resolve to the same product entry.
export { ExamplePage as ExamplesPage };
