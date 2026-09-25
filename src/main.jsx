import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { captureUtm } from './lib/tracking.js';
// Self-hosted: no request to Google Fonts, and only the latin file is ever
// downloaded (the other subsets are behind unicode-range).
import '@fontsource-variable/dm-sans/wght.css';
import './index.css';

captureUtm();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);
