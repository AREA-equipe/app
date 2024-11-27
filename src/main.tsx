import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import Router from './Router/Router';
import { ThemeProvider } from './contexts/theme-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </StrictMode>,
)
