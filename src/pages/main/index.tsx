import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { fromEvent, throttleTime } from 'rxjs';

import LazyImportComponent from '@/components/LazyImportComponent';
import ToolBar from '@/components/ToolBar';
import { dsc } from '@/core/style/defaultStyleConfig';

import { Logo, MenuComp } from './MainLayoutComp';
import styles from './index.module.less';

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuHeight, setMenuHeight] = useState(
    document.documentElement.clientHeight
  );
  const defaultMenuTitleHeight = 64;

  useEffect(() => {
    const subscription = fromEvent(window, 'resize')
      .pipe(throttleTime(1000))
      .subscribe(() => {
        const timeoutId = globalThis.setTimeout(() => {
          setMenuHeight(document.documentElement.clientHeight);
        }, 100);
        return () => {
          globalThis.clearTimeout(timeoutId);
        };
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        style={{ height: menuHeight, overflow: 'scroll' }}
        theme="light"
        width={240}
        onCollapse={setCollapsed}
      >
        <Logo inlineCollapsed={collapsed} />
        <MenuComp />
      </Sider>
      <Layout className="site-layout" style={{ backgroundColor: dsc.color.bg }}>
        <ToolBar />
        <div
          className={styles.main}
          style={{
            backgroundColor: dsc.color.bgGray,
            height: menuHeight - defaultMenuTitleHeight,
          }}
        >
          <LazyImportComponent>
            <Outlet />
          </LazyImportComponent>
        </div>
      </Layout>
    </Layout>
  );
}
