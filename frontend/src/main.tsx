import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppProvider from './AppProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
);
