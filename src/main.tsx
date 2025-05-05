import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Renderizar la aplicación
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
