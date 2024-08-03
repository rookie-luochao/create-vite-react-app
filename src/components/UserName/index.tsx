import { Avatar } from 'antd';

import { useLoginInfoStore } from '@/core/store';
import { dsc } from '@/core/style/defaultStyleConfig';

export default function UserName() {
  const { loginInfo } = useLoginInfoStore((state) => state);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        shape="square"
        style={{
          backgroundColor: dsc.color.primary,
          verticalAlign: 'middle',
          borderRadius: 4,
        }}
      >
        {loginInfo?.name?.slice(0, 1)}
      </Avatar>
      {loginInfo ? (
        <div
          style={{
            color: dsc.color.text,
            fontSize: dsc.fontSize.s,
            padding: '0em 0.6em',
          }}
        >
          {loginInfo?.name}
        </div>
      ) : null}
    </div>
  );
}
