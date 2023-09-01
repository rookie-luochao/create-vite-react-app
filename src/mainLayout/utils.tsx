import { ReactNode } from "react";
import { Dictionary } from "../core/router/utils";
import { find, map, startsWith } from "lodash-es";
import { Menu } from "antd";
import { Link, RouteObject } from "react-router-dom";
import { mainLayoutPath } from "./routes";

const { Item, SubMenu } = Menu;

export const getMenus = ({
  routes,
  modulePathToIconMap,
  to,
}: {
  routes: RouteObject[];
  modulePathToIconMap?: Dictionary<ReactNode>;
  to?: string;
}) => {
  const mainRoutes = find(routes[0].children, (route) => route.path === mainLayoutPath);
  console.log("555", mainRoutes);

  return map(mainRoutes?.children, (item) => {
    if (item?.children?.length) {
      return (
        <SubMenu key={item.path} title={item.id} icon={item.path && modulePathToIconMap?.[item.path]}>
          {getMenus({
            routes: item.children,
            to: `${startsWith(to, "/") ? to : `/${to}`}/${item.path}`,
          })}
        </SubMenu>
      );
    }

    return (
      <Item key={item.path}>
        <Link to={`${to}/${item.path}`}>{item.id}</Link>
      </Item>
    );
  });
};
