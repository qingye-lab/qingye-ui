import { createRoot } from 'react-dom/client';
import '@qingye_lab/ui/styles.css';
import './theme.css';

function App() {
  return <main>Hello</main>;
}

createRoot(document.getElementById('root')!).render(<App />);
