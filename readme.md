# React + TypeScript + Vite + Pnpm + Zustand + React-Query + OpenAPI-TS-Request + Docker

该模板可以帮助您在 Vite 中使用 React 和 TypeScript 进行开发web应用.

#### 概览

- 搭建一个web应用开发脚手架，最大限度使用社区优秀开源方案
- 支持自动根据 openapi 生成ts、request client、mock服务等等, [openapi格式参考](https://swagger.io/blog/news/whats-new-in-openapi-3-0/)
- 支持前端工程化
- 支持前端容器化(需要安装 docker 环境)
- 同步接口请求状态，实现自动loading
- 支持接口联动，方便跨任意组件刷新相关联的接口，而无需依赖 store 共享状态，无需垮多级组件传入回调函数
- 支持容器化变量注入，无需前端配置文件写死，方便通过 k8s 动态注入
- 后续支持更好用的modal，更好用的form

#### 核心技术

- 打包编译 - [vite](https://github.com/vitejs/vite)
- 包管理 - [pnpm](https://github.com/pnpm/pnpm)
- 编程语言 - [typescript](https://github.com/microsoft/TypeScript)
- 前端框架 - [react](https://github.com/facebook/react)
- 路由 - [react-router](https://github.com/remix-run/react-router)
- UI组件库 - [antd](https://github.com/ant-design/ant-design)
- cssinjs(不考虑性能开销) - [emotion](https://github.com/emotion-js/emotion)
- 全局数据共享 - [zustand](https://github.com/pmndrs/zustand)
- 自动生成api - [openapi-ts-request](https://github.com/openapi-ui/openapi-ts-request)
- 网络请求 - [axios](https://github.com/axios/axios)
- 数据请求利器 - [react-query](https://github.com/TanStack/query)
- 错误边界 - [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- 前端日志(暂未集成) - [sentry-javascript](https://github.com/getsentry/sentry-javascript)
- hack - [babel](https://github.com/babel/babel)
- 代码检查 - [eslint](https://github.com/eslint/eslint)
- ts代码检查插件 - [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- 代码美化 - [prettier](https://github.com/prettier/prettier)
- git钩子 - [husky](https://github.com/typicode/husky)
- commit格式化 -[commitlint](https://github.com/conventional-changelog/commitlint)

#### 技术说明

- 自动生成接口请求相关 ts 代码(openapi-ts-request): 后端接入 apifox 后，前端可以根据 openapi 文件自动生成请求客户端，支持 axios、uniapp.request等等客户端，接口相关联的 ts 类型，[文档地址](https://github.com/openapi-ui/openapi-ts-request)
- 数据共享使用zustand，各个数据都支持建立单一仓库，开发和性能体验更好，[文档地址](https://zustand-demo.pmnd.rs)
- 接口调用使用 react-query 进行增强，主要用于接口调用状态同步，多接口跨组件联动，[文档地址](https://tanstack.com/query/latest)
- 路由(react-router-dom): 自身默认支持错误边界功能，我觉得 react-error-boundary 更好用点，所以用hack绕过了 react-router-dom 的错误边界(ps: react-router-dom 暂时不支持参数禁用它自带的错误边界)，[文档地址](https://reactrouter.com/en/main)
- 组件库使用 antd 组件库，[文档地址](https://ant.design/components/overview-cn)

#### 快速开始

```bash
// 下载包
pnpm install
# or make install

// 启动
npm run dev
# or make dev
```

#### 其他常用命令

```bash
// 打包
npm run build
# or make build

// 拉取openapi=>自动生成api request
npm run openapi
# or make openapi

// 制作docker镜像
make docker-build

// 运行docker镜像
make docker-run

// 制作docker镜像 and 运行docker镜像
make docker-build-run
```

#### 注意事项

- 如果遇到git commit无法触发husky的情况，则需要手动执行一遍`npm run prepare`

#### 基于openapi自动获取api请求函数，配置如下

```js
// openapi-ts-request.config.ts

// 示例代码
import type { GenerateServiceProps } from "openapi-ts-request";

export default [
  {
    schemaPath: "https://petstore3.swagger.io/api/v3/openapi.json",
    serversPath: "./src/apis",
  },
] as GenerateServiceProps[];
```

#### 应用配置

```ts
// src/config.ts

// 一级path, 例如：openapi
export const urlPath = '';

// 项目基本变量配置
const appConfig: IConfig = {
  // 应用名称, 例如：react-app
  appName: '',
  // 网络请求的域名，例如：https://host
  baseURL: '',
  // 发布版本，例如：0000000-0.0.1
  version: '',
  // 代码环境，例如：demo, staging, online
  env: '',
};
```

#### 环境变量

- 项目 dev 环境变量配置在`src/config.ts`
- 项目 prod 环境变量配置在`.env.production`，详情参考：[vite环境变量](https://cn.vitejs.dev/guide/env-and-mode.html)
- 项目 prod 环境变量也可以使用容器变量 ARG，我们会读取容器变量并注入到前端meta标签的content里面，目前html文件提供了两个mate标签(env、app_config)接收变量，格式详情参考：`index.html` 和 `src/core/http/config.ts`

#### 调用接口(react-query), 支持自动loading和接口请求联动

```js
// HelloGet是一个基于axios的promise请求
export async function HelloGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Api.HelloGetParams,
  options?: { [key: string]: any },
) {
  return request<Api.HelloResp>('/gin-demo-server/api/v1/hello', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// 自动调用接口获取数据
const { data, isLoading } = useQuery({
  queryKey: ["hello", name],
  queryFn: () => {
    return HelloGet({ name: name });
  },
});

export async function HelloPost(body: Api.HelloPostParam, options?: { [key: string]: any }) {
  return request<Api.HelloResp>('/gin-demo-server/api/v1/hello', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 提交编辑数据
const { mutate, isLoading } = useMutation({
  mutationFn: HelloPost,
  onSuccess(data) {
    setName(data?.data || "");
  },
  onError() {
    // 清除queryKey为hello的接口数据缓存，自动重新获取接口数据
    queryClient.invalidateQueries({ queryKey: ['hello'] });
  }
})

mutate({ name: "lisi" });

```
