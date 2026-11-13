import React from 'react';
import ReactDOM from 'react-dom/client';
// Open Sans: fonte oficial da marca do IF (Manual da Marca 2015, pág. 16).
// Servida pelo próprio site (pacote Fontsource), sem chamar o Google Fonts.
import '@fontsource-variable/open-sans';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
