
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './hooks/use-theme'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark">
    <App />
  </ThemeProvider>
);
