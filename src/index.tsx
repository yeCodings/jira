import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { loadDevTools } from 'jira-dev-tool';
import { AppProviders } from 'context';
import 'antd/dist/reset.css';
import './index.css';

loadDevTools(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <AppProviders>
      <App />
    </AppProviders>
  );
})



