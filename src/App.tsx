import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./app.css";
import { HelloGet } from "../src-clients/api/hello";
import { DatePicker, DatePickerProps, Spin } from "antd";
import { useRequest } from "ahooks";

export const App = () => {
  const [count, setCount] = useState(0);

  const { run, refresh, data, loading } = useRequest(HelloGet, {
    manual: true,
  });

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="App">
      <div>
        <a
          onClick={() => {
            run({ name: "zhangsan" });
          }}
        >
          调用接口
        </a>
        <a onClick={refresh} style={{ marginLeft: 6 }}>
          重刷接口
        </a>
      </div>
      <Spin spinning={loading}>
        <div>接口数据：{data?.data}</div>
      </Spin>
      <DatePicker onChange={onChange} />
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="../assets/images/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
};
