import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';

export default function RouterQueryDemo() {
  const routerAuthDemo = `
    ~~~js
    export const mainRoutes: RouteObject = {
      path: mainLayoutPath,
      element: (
        <ShouldLogon>
          <Main />
        </ShouldLogon>
      ),
      children: pagesRoutes,
    };
    
    function ShouldLogon({ children }: { children: ReactNode }) {
      const loginInfoStorageStr = globalThis.localStorage.getItem(loginInfoStorageKey);
    
      if (!loginInfoStorageStr) {
        return <Navigate to="/login" />;
      }
    
      const loginInfo = (JSON.parse(loginInfoStorageStr) as ILoginInfoStorageState).state.loginInfo;
    
      if (!loginInfo || !loginInfo.expireAt || dayjs().isAfter(dayjs(loginInfo.expireAt))) {
        return <Navigate to="/login" />;
      }
    
      return children;
    }    
    ~~~
  `;

  return (
    <div>
      <Card bordered={false} title="npm包：react-router-toolkit">
        <a
          onClick={() =>
            window.open('https://www.npmjs.com/package/react-router-toolkit')
          }
        >
          查看文档
        </a>
      </Card>
      <Card bordered={false} style={{ marginTop: 12 }} title="路由守卫">
        <ReactMarkdown>{routerAuthDemo}</ReactMarkdown>
      </Card>
    </div>
  );
}
