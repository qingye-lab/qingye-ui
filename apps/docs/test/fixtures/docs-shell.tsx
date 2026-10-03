import { Button } from "@qingye/ui/components/button";
import { useRef } from "react";
import { MemoryRouter } from "react-router-dom";
import { DemoFrame } from "../../src/components/demo";
import { H2, H3 } from "../../src/components/prose";
import { TableOfContents } from "../../src/components/toc";
export { focusPageHeading, scrollToHash } from "../../src/lib/use-route-effects";

function Article({ title }: { title: string }) {
  const article = useRef<HTMLDivElement>(null);
  return <>
    <main ref={article}>
      <h1>Button 按钮</h1>
      <H2 id="examples">示例</H2>
      <DemoFrame slug="button" demo={{ id: "long-name", source: "const demo = true;", meta: { title }, default: () => <Button>示例内容</Button> }} />
      <H3 id="api-button">Button</H3>
    </main>
    <TableOfContents container={article} />
  </>;
}

export const articleScene = (title: string) => <MemoryRouter><Article title={title} /></MemoryRouter>;
