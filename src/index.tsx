import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { CreateBrowserRouter } from "../core/router/CreateBrowserRouter";
import { getAppRoutes } from "./routes";

import zhCN from "antd/locale/zh_CN";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <CreateBrowserRouter routes={getAppRoutes()} />
    </ConfigProvider>
  </React.StrictMode>,
);
