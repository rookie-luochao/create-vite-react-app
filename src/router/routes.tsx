/* eslint-disable react-refresh/only-export-components */
import ErrorBoundaryWrapOutlet from '@/core/error-boundary';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import {
  dashboardModuleName,
  loginModuleName,
  mainLayoutModuleName,
  uiListModuleName,
  utilListModuleName,
} from './config';

const Login = lazy(() => import('@/pages/login/index.tsx'));
const MainLayout = lazy(() => import('@/pages/main'));
const Dashboard = lazy(() => import('@/pages/dashboard/index.tsx'));
const UIOne = lazy(() => import('@/pages/ui-list/UIOne.tsx'));
const RequestDemo = lazy(() => import('@/pages/util-list/RequestDemo.tsx'));
const RouterQueryDemo = lazy(() => import('@/pages/util-list/RouterQueryDemo.tsx'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <ErrorBoundaryWrapOutlet />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${loginModuleName}`} />,
      },
      {
        path: loginModuleName,
        id: '登录',
        element: <Login />,
      },
      {
        path: mainLayoutModuleName,
        element: <MainLayout />,
        children: [
          {
            path: dashboardModuleName,
            id: '面板',
            element: <Dashboard />,
          },
          {
            path: uiListModuleName,
            id: 'UI组件',
            children: [
              {
                path: 'icon',
                id: '图标',
                element: <UIOne />,
              },
            ],
          },
          {
            path: utilListModuleName,
            id: '工具',
            children: [
              {
                path: 'request',
                id: '请求示例',
                element: <RequestDemo />,
              },
              {
                path: 'router-toolkit',
                id: '路由工具箱',
                element: <RouterQueryDemo />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
