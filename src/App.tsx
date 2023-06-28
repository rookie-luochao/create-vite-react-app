import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./app.css";
import axios from "axios";

export const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const packageID = "d185dc4e-7af8-4157-bb28-e7148273af06?accessUid=1121296677723115523";
    axios.get(
      `https://srv-cloud-native---devops.devops-jiahuayun-dev.rockontrol.com/cloud-native/v1/packages/${packageID}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTIxMjk2Njc3NzIzMTE1NTIzIiwiZXhwIjoxNjg0ODMwNzc4LCJqdGkiOiIxNjYwOTExNjg2MDk5NDEwOTkzIiwiaWF0IjoxNjg0ODI3MTc4LCJpc3MiOiJpZHAucm9ja29udHJvbC5jb20iLCJzdWIiOiJVU0VSIn0.I3DWhCaJxTGWzoHCjNqXP7_yjiRiI0o-U1hwhMNqE0jyisZr3k5spG4908urCvnFF06mNS_bR-kGm2eGGAGtABRinPbD1dOv-4Y3QlhkwcFoQ5Drx71ZC--ByZcx7sLp4nXx-d3YpAUEAHa27DcqQAX-sTjWUJp9iyH_acYT5_w",
        },
      },
    );
  }, []);

  return (
    <div className="App">
      <div>
        <a
          onClick={() => {
            axios({
              method: "post",
              url: "https://srv-cloud-native---devops.devops-jiahuayun-dev.rockontrol.com/cloud-native/v1/packages?accessUid=1121296677723115523",
              data: {
                desc: "部署包描述11111",
                devResponsibleMan: "1121296677723115523",
                opsResponsibleMan: "1121296677723115523",
                packageName: "新创建的部署包11111",
                userGroupName: "devops",
              },
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTIxMjk2Njc3NzIzMTE1NTIzIiwiZXhwIjoxNjg0ODMwNzc4LCJqdGkiOiIxNjYwOTExNjg2MDk5NDEwOTkzIiwiaWF0IjoxNjg0ODI3MTc4LCJpc3MiOiJpZHAucm9ja29udHJvbC5jb20iLCJzdWIiOiJVU0VSIn0.I3DWhCaJxTGWzoHCjNqXP7_yjiRiI0o-U1hwhMNqE0jyisZr3k5spG4908urCvnFF06mNS_bR-kGm2eGGAGtABRinPbD1dOv-4Y3QlhkwcFoQ5Drx71ZC--ByZcx7sLp4nXx-d3YpAUEAHa27DcqQAX-sTjWUJp9iyH_acYT5_w",
              },
            });
          }}
        >
          调用接口
        </a>
      </div>
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
