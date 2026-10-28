import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/zilla-slab/600.css';
import '@fontsource/zilla-slab/700.css';
import './styles.css';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
