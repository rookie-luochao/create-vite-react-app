import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { TanStackQueryProvider } from './core/http/TanStackQuery';
import './index.css';
import Router from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <TanStackQueryProvider>
        <Router />
      </TanStackQueryProvider>
    </ConfigProvider>
  </React.StrictMode>
);
