import { notification } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';

import {
  ILoginInfoStorageState,
  defaultLoginInfoStorage,
  loginInfoStorageKey,
} from '../store';
import { envs } from './config';

const BASE_URL = envs.baseURL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 超时时间120秒
});

instance.interceptors.response.use(
  (response) => {
    // data解构
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // 统一错误处理
    if (error.response.status >= 300) {
      notification.error({
        message: error.response.data?.msg,
        duration: 2,
      });
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use((config) => {
  const loginInfoStorageStr =
    globalThis.localStorage.getItem(loginInfoStorageKey);
  const loginInfoStorage = loginInfoStorageStr
    ? (JSON.parse(loginInfoStorageStr) as ILoginInfoStorageState)
    : defaultLoginInfoStorage;

  if (loginInfoStorage.state.loginInfo) {
    config.headers.Authorization = loginInfoStorage.state.loginInfo.accessToken;
  }

  return config;
});

const request = async <T = unknown>(
  url: string,
  options: AxiosRequestConfig = {}
) => {
  return await instance.request<T, T>({
    url,
    ...options,
  });
};

export default request;
