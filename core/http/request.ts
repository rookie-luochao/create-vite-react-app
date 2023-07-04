import axios, { AxiosRequestConfig } from "axios";

// 实际情况从环境变量中读取
const BASE_URL = "https://srv-gin-demo-server---devops.devops-jiahuayun-dev.rockontrol.com";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 超时时间60秒
});

instance.interceptors.response.use((response) => {
  // 统一错误处理
  // data解构
  if (response.data) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }
  return response;
});

instance.interceptors.request.use((config) => {
  // get access token from local storage and set to config.header.Authorization
  // config.headers.Authorization = localStorage.getItem('accessToken');
  return config;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = async <T = any>(url: string, options: AxiosRequestConfig & { requestType?: "json" | "form" } = {}) => {
  // 兼容from data文件上传的情况
  const { requestType, ...rest } = options;
  if (requestType === "form") {
    return await instance.request<T, T>({
      url,
      ...rest,
      headers: {
        ...(rest.headers || {}),
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return await instance.request<T, T>({
      url,
      ...rest,
    });
  }
};

export default request;
