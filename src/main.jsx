import React from 'react';
import ReactDOM from 'react-dom/client';
// Fonte Inter servida pelo próprio site (pacote Fontsource), sem chamar o Google Fonts.
import '@fontsource-variable/inter';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
