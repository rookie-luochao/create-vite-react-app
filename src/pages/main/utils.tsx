import { MenuProps } from 'antd';
import { map, startsWith } from 'lodash-es';
import { ReactNode } from 'react';
import { Link, RouteObject } from 'react-router-dom';
import { Dictionary } from 'react-router-toolkit';

type MenuItem = Required<MenuProps>['items'][number];

export const getMenus = ({
  routes,
  moduleNameToIconMap = {},
  to = '',
}: {
  routes: RouteObject[];
  moduleNameToIconMap?: Dictionary<ReactNode>;
  to?: string;
}) => {
  return map(routes, (item): MenuItem => {
    if (item?.children?.length) {
      const baseRoutePath = `${startsWith(to, '/') ? to : `/${to}`}/${item.path}`;

      return {
        key: baseRoutePath,
        label: item.id || '',
        icon: item.path && moduleNameToIconMap?.[item.path],
        children: item.children ? getMenus({ routes: item.children, to: baseRoutePath }) : undefined,
      };
    }

    const routePath = `${startsWith(to, '/') ? to : `/${to}`}/${item.path}`;

    return {
      key: routePath,
      label: <Link to={routePath}>{item.id}</Link>,
      icon: item.path && moduleNameToIconMap?.[item.path],
    };
  });
};
