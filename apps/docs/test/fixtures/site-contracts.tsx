import { MemoryRouter, useLocation } from "react-router-dom";
import { DocsNav } from "../../src/components/docs-nav";
import { CopyCodeButton } from "../../src/components/copy-code-button";
import { ContentBoundary } from "../../src/components/content-boundary";
import { PageState } from "../../src/components/page-state";
import { SearchTrigger } from "../../src/components/search";
import { useState } from "react";
import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
import { Button } from "@qingye_lab/ui/components/button";
import SearchDialog from "../../src/components/search-dialog";
import ComponentsIndex from "../../src/pages/docs/components-index";
import { useRouteEffects } from "../../src/lib/use-route-effects";
export { loadDemos, demoCount } from "../../src/lib/registry";

function RoutedNav() {
  useRouteEffects();
  const { pathname } = useLocation();
  return <><ScrollArea><DocsNav /></ScrollArea><main tabIndex={-1}><h1>{pathname}</h1></main></>;
}
export const navScene = () => <MemoryRouter initialEntries={["/docs"]}><RoutedNav /></MemoryRouter>;
export const searchScene = () => <MemoryRouter><SearchTrigger /><ComponentsIndex /></MemoryRouter>;
export const copyScene = () => <MemoryRouter><CopyCodeButton value="const answer = 42;" /></MemoryRouter>;
function SearchContent() {
  const [open,setOpen] = useState(false); const location = useLocation();
  return <><Button onClick={() => setOpen(true)}>Open search</Button><SearchDialog open={open} onOpenChange={setOpen} /><main><h1 tabIndex={-1}>{location.pathname}</h1></main></>;
}
export const dialogScene = (pathname = "/docs") => <MemoryRouter initialEntries={[pathname]}><SearchContent /></MemoryRouter>;
export const pageStateScene = () => <PageState headingLevel={1} state="not-applicable" title="页面不存在" />;
function FailingContent({ fail }: { fail: boolean }) {
  if (fail) throw new Error("INTERNAL_STACK_AND_FILENAME");
  return <p>有效示例</p>;
}
export const boundaryScene = (fail: boolean) => <MemoryRouter><main><h1>组件文档</h1><p>仍然有效的文档</p>
  <ContentBoundary title="示例暂时无法显示"><FailingContent fail={fail} /></ContentBoundary>
</main></MemoryRouter>;
