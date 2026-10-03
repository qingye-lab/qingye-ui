import { Button } from "@qingye/ui/components/button";
import { Component, type ReactNode } from "react";
import { focusPageHeading } from "@/lib/use-route-effects";
import { PageState } from "./page-state";
import { useDocsLocale } from "@/lib/docs-locale";

/** A failed section leaves the rest of the document available. */
export class ContentBoundary extends Component<{ children: ReactNode; title: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <PageState headingLevel={3} role="status" title={this.props.title}>
      <Button onClick={() => {
        focusPageHeading();
        this.setState({ failed: false });
      }} size="sm" variant="quiet"><RetryLabel /></Button>
    </PageState>;
  }
}

function RetryLabel() {
  return <>{useDocsLocale() === "en" ? "Retry" : "重试"}</>;
}
