import * as React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@qingye_lab/ui/components/button";
import "./style.css";

function App() {
  const [count, setCount] = React.useState(0);
  return <main>
    <h1>独立按钮入口</h1>
    <Button id="counter" onClick={() => setCount((value) => value + 1)}>已操作 {count} 次</Button>
  </main>;
}
createRoot(document.getElementById("root")!).render(<App />);
