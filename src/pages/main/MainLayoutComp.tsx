import {
  BuildOutlined,
  DashboardOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { find } from 'lodash-es';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Dictionary, parseQueryString } from 'react-router-toolkit';

import LogoMiniIcon from '@/assets/images/logo-mini.svg';
import LogoIcon from '@/assets/images/logo.svg';
import {
  dashboardModuleName,
  mainLayoutModuleName,
  uiListModuleName,
  utilListModuleName,
} from '@/router/config';
import routes from '@/router/routes';

import styles from './index.module.less';
import { getMenus } from './utils';

export const globalHiddenInMenuParentPath = 'globalHiddenInMenuParentPath';

export function MenuComp() {
  const defaultMenuActivePath = `/${mainLayoutModuleName}/${dashboardModuleName}`;
  const [menuActivePath, setMenuActivePath] = useState([defaultMenuActivePath]);
  const pathname = document.location.pathname;
  const menuOpenKey = pathname
    ? pathname
        .split('/')
        .slice(0, pathname.split('/').length - 1)
        .join('/')
    : '';

  useEffect(() => {
    if (pathname) {
      const query = document.location.search;
      let queryObj;
      let menuActivePath = pathname;

      if (query) {
        queryObj = parseQueryString(query);
      }

      if (queryObj && queryObj[globalHiddenInMenuParentPath]) {
        menuActivePath = queryObj[globalHiddenInMenuParentPath] as string;
      }

      setMenuActivePath([menuActivePath]);
    }
  }, [pathname]);

  const menuItems = useMemo(() => {
    const mainRoutes = find(
      routes[0].children,
      (route) => route.path === mainLayoutModuleName
    );
    const moduleNameToIconMap = {
      [dashboardModuleName]: <DashboardOutlined />,
      [uiListModuleName]: <BuildOutlined />,
      [utilListModuleName]: <ToolOutlined />,
    } as Dictionary<ReactNode>;

    return getMenus({
      routes: mainRoutes?.children || [],
      moduleNameToIconMap,
      to: `/${mainLayoutModuleName}`,
    });
  }, []);

  return (
    <Menu
      defaultOpenKeys={[menuOpenKey]}
      items={menuItems}
      mode="inline"
      selectedKeys={menuActivePath}
      theme="light"
      onSelect={({ key }) => {
        setMenuActivePath([key]);
      }}
    />
  );
}

export const Logo = ({ inlineCollapsed }: { inlineCollapsed?: boolean }) => {
  return (
    <div className={styles.logo}>
      <img alt="logo" src={inlineCollapsed ? LogoMiniIcon : LogoIcon} />
    </div>
  );
};
