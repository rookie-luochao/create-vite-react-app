import { Link } from "react-router-dom";
import { useLoginStore } from "../../core/store";

export function Login() {
  const { loginInfo, updateLoginInfo, clear } = useLoginStore((state) => state);

  return (
    <div>
      <h3 css={{ fontSize: 24 }}>this is login page</h3>
      <div>
        <Link to="/main/module1">goto module1</Link>
      </div>
      token: {loginInfo?.accessToken}
      <div>
        {loginInfo ? (
          <a onClick={clear}>注销登录</a>
        ) : (
          <a
            css={{
              marginTop: 20,
              color: "red",
              fontWeigth: 700,
              fontSize: 24,
            }}
            onClick={() => {
              updateLoginInfo({ accessToken: "123" });
            }}
          >
            登录
          </a>
        )}
      </div>
    </div>
  );
}
