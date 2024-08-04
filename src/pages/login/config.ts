import { ILoginInfo } from '@/core/store';

export const defaultLinkPath = '/main/dashboard';

export const defaultUserInfo = {
  username: 'admin',
  password: 'adminadmin',
};

export const defaultLoginInfo = {
  accessToken: '123456',
  name: '张三',
  expireAt: '2030-12-31 23:59:59',
} as ILoginInfo;
