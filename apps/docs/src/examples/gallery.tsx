import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFoundContent } from "@/pages/not-found";

const WorkspaceApp = lazy(() => import("./workspace"));

/* 示例的承载：文档站外壳之内，一个固定的框装着正在运行的示例应用。
 * - 站点主导航始终可见，随时回到组件库；应用内的去处由应用自己的侧栏负责，不再另设一条切换条。
 * - 框是一张纸（面板圆角、清墨线），示例在框里滚动，不把站点一起卷走。 */


/** 未知的示例路径：与站点其余页面同一个未找到状态，留在示例框内。 */
function Missing() {
  return <main id="main" tabIndex={-1} className="h-full overflow-y-auto p-(--qy-panel-padding) outline-none"><NotFoundContent /></main>;
}

export default function ExamplesGallery() {
  return <div className="site-frame grid py-(--qy-page-gutter) h-[calc(100dvh-var(--docs-header-height,0px))]">
    <div data-slot="example-frame" className="min-h-0 overflow-hidden rounded-panel border border-border shadow-raised">
      <Suspense>
        <Routes>
          <Route index element={<Navigate to="workspace" replace />} />
          <Route path="workspace/*" element={<WorkspaceApp />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </Suspense>
    </div>
  </div>;
}
