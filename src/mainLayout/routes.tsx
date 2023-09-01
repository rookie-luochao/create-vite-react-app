import { MyMainLayout } from "./index";
import { pagesRoutes } from "../pages/routes";

export const mainLayoutPath = "main";

export const mainRoutes = {
  path: mainLayoutPath,
  element: <MyMainLayout />,
  children: pagesRoutes,
};
