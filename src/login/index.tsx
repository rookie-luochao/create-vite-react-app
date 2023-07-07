import { Link } from "react-router-dom";

export function Login() {
  return (
    <div>
      <h3 css={{ fontSize: 24 }}>this is login page</h3>
      <div>
        <Link to="/main/module1">goto module1</Link>
      </div>
      <div
        css={{
          marginTop: 20,
          color: "red",
          fontWeigth: 700,
          fontSize: 24,
        }}
      >
        测试emotion
      </div>
    </div>
  );
}
