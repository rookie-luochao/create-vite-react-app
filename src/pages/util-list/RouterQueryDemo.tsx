import { Card } from 'antd';

export default function RouterQueryDemo() {
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
    </div>
  );
}
