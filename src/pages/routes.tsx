import { lazy } from "react";
import { uiListRoutes } from "./ui-list/routes";

const Module1 = lazy(() => import("./module1"));
const Module2 = lazy(() => import("./module2"));
const Module3 = lazy(() => import("./module3"));

export const pagesRoutes = [
  {
    path: "module1",
    id: "模块一",
    element: <Module1 />,
  },
  {
    path: "module2/:id",
    id: "模块二",
    element: <Module2 />,
  },
  {
    path: "module3",
    id: "模块三",
    element: <Module3 />,
  },
  uiListRoutes,
];
