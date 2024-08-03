import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useLoginInfoStore } from '@/core/store';
import { flexAlignItemCenterOpts, flexCenterOpts } from '@/core/style/utils';

import IconDown from '../Icon/IconDown';
import UserName from '../UserName';

export default function ToolBar() {
  const navigate = useNavigate();
  const { clear } = useLoginInfoStore((state) => state);

  return (
    <div
      style={{
        ...flexAlignItemCenterOpts({ justifyContent: 'flex-end' }),
        padding: 12,
        height: 64,
        backgroundColor: '#fff',
      }}
    >
      <div style={flexCenterOpts()}>
        <UserName />
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: '退出登录',
                onClick() {
                  clear();
                  navigate('/login');
                },
              },
            ],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <IconDown />
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
