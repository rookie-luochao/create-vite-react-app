import { Module1 } from "./module1";
import { Module2 } from "./module2";
import { Module3 } from "./module3";

export const pagesRoutes = [
  {
    path: "module1",
    element: <Module1 />,
  },
  {
    path: "module2/:id",
    element: <Module2 />,
  },
  {
    path: "module3",
    element: <Module3 />,
  },
];
