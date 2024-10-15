import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useLoginInfoStore } from '@/core/store';
import { flexCenterOpts } from '@/core/style/utils';

import { defaultLinkPath, defaultLoginInfo, defaultUserInfo } from './config';
import styles from './index.module.less';

interface ILogin {
  username: string;
  password: string;
  remember?: boolean;
}

export default function Login() {
  const { updateLoginInfo } = useLoginInfoStore((state) => state);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: ILogin) => {
    if (
      values.username === defaultUserInfo.username &&
      values.password === defaultUserInfo.password
    ) {
      updateLoginInfo(defaultLoginInfo);
      navigate(defaultLinkPath);
    } else {
      message.warning('用户名或密码错误，请检查！');
    }
  };

  return (
    <div
      className={styles.login}
      style={{
        ...flexCenterOpts(),
        height: globalThis.document.documentElement.clientHeight,
      }}
    >
      <Form
        form={form}
        name="login"
        style={{ width: 356 }}
        initialValues={{
          username: defaultUserInfo.username,
          password: defaultUserInfo.password,
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            placeholder={defaultUserInfo.username}
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            placeholder={defaultUserInfo.password}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item noStyle name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a style={{ float: 'right' }}>Forgot password</a>
        </Form.Item>
        <Form.Item>
          <Button
            className="login-form-button"
            htmlType="submit"
            style={{ width: '100%' }}
            type="primary"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}
