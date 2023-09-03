// import { HelloGet, HelloPost } from "../api/hello";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DatePicker, DatePickerProps /* , Spin */, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { fromEvent, throttleTime } from "rxjs";
import Sider from "antd/es/layout/Sider";
import { dsc } from "../core/style/defaultStyleConfig";
import { Logo, MenuComp, ToolBar } from "./MainLayoutComp";

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

export function MyMainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuHeight, setMenuHeight] = useState(document.documentElement.clientHeight);
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
        <MenuComp />
      </Sider>
      <Layout className="site-layout" css={{ backgroundColor: dsc.color.bg }}>
        <ToolBar />
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
