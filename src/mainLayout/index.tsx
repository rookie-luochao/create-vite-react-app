// import "./index.css";
// import { HelloGet, HelloPost } from "../api/hello";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { DatePicker, DatePickerProps, Dropdown /* , Spin */, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { Dictionary, parseQueryString } from "../core/router/utils";
import { fromEvent, throttleTime } from "rxjs";
import Sider from "antd/es/layout/Sider";
import { dsc } from "../core/style/defaultStyleConfig";
import { IconDown, Logo, UserName } from "./MainLayoutComp";
import { flexCenterOpts } from "../core/style/utils";
import { uiListModuleName, uiListModuleNameDefaultPath } from "../pages/ui-list/routes";
import { BuildOutlined } from "@ant-design/icons";
import { getMenus } from "./utils";
import { appRoutes } from "../routes";

export function MainLayout() {
  // const queryClient = useQueryClient();
  const [count, setCount] = useState(0);
  // const [name, setName] = useState("zhangshan");

  // const { data } = useQuery({
  //   queryKey: ["hello", name],
  //   queryFn: () => {
  //     return HelloGet({ name: name });
  //   },
  // });

  // const { isLoading, mutate } = useMutation({
  //   mutationFn: HelloPost,
  //   onSuccess(data) {
  //     setName(data?.data || "");
  //   },
  //   onError() {
  //     queryClient.invalidateQueries({ queryKey: ['hello'] });
  //   }
  // })

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="App">
      {/* <Spin spinning={isLoading}>
        {data?.data}
      </Spin> */}
      {/* <div>
        <a
          onClick={() => {
            mutate({ name: "lisi" });
          }}
        >
          调用接口
        </a>
      </div> */}
      <DatePicker onChange={onChange} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <Outlet />
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export const globalHiddenInMenuParentPath = "globalHiddenInMenuParentPath";

export function MyMainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuHeight, setMenuHeight] = useState(document.documentElement.clientHeight);

  const [menuActivePath, setMenuActivePath] = useState([`${uiListModuleName}${uiListModuleNameDefaultPath}`]);
  const pathname = document.location.pathname;
  const menuOpenKey = !!pathname && pathname.split("/")[1] ? `${pathname.split("/")[1]}` : uiListModuleName;
  const defaultMenuTitleHeight = 64;

  useEffect(() => {
    const subscription = fromEvent(window, "resize")
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

  useEffect(() => {
    if (pathname) {
      const query = document.location.search;
      let queryObj;
      let menuActivePath = pathname;
      if (query) {
        queryObj = parseQueryString(query);
      }
      if (queryObj && queryObj[globalHiddenInMenuParentPath]) {
        menuActivePath = queryObj[globalHiddenInMenuParentPath];
      }
      setMenuActivePath([menuActivePath]);
    }
  }, [pathname]);

  const modulePathToIconMap = {
    [uiListModuleName]: <BuildOutlined />,
  } as Dictionary<ReactNode>;

  return (
    <Layout>
      <Sider
        theme={"light"}
        width={240}
        css={{ height: menuHeight, overflow: "scroll" }}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Logo inlineCollapsed={collapsed} />
        <Menu
          theme={"light"}
          mode="inline"
          selectedKeys={menuActivePath}
          defaultOpenKeys={[`/${menuOpenKey}`]}
          onSelect={({ key }) => {
            setMenuActivePath([key]);
          }}
        >
          {getMenus({
            routes: appRoutes,
            modulePathToIconMap,
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout" css={{ backgroundColor: dsc.color.bg }}>
        <div
          css={{
            padding: 12,
            height: 64,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div css={flexCenterOpts()}>
            <UserName />
            <Dropdown menu={{ items: [{ key: "1", label: "退出登录" }] }}>
              <a onClick={(e) => e.preventDefault()}>
                <IconDown />
              </a>
            </Dropdown>
          </div>
        </div>
        <div
          css={{
            padding: 24,
            backgroundColor: dsc.color.bgGray,
            overflow: "scroll",
            height: menuHeight - defaultMenuTitleHeight,
            borderRadius: "10px 0 0",
          }}
        >
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
}
