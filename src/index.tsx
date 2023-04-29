import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProviders } from 'context';
import { DevTools, loadServer } from 'jira-dev-tool';
import 'antd/dist/reset.css';

loadServer(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>
  );
})



