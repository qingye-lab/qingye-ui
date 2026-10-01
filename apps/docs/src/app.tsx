import { Route, Routes } from "react-router-dom";
import { PlaygroundPage } from "./pages/playground";

// The site shell (home, docs pages, navigation) is added on top of this.
export function App() {
  return (
    <Routes>
      <Route path="/playground/:slug" element={<PlaygroundPage />} />
      <Route path="*" element={<PlaygroundIndex />} />
    </Routes>
  );
}

function PlaygroundIndex() {
  return <p className="p-8 text-muted-foreground text-sm">文档站建设中。</p>;
}
