import { generateService } from "@umijs/openapi";

generateService({
  // 实际schemaPath从环境变量读取
  schemaPath: 'https://srv-gin-demo-server---devops.devops-jiahuayun-dev.rockontrol.com/gin-demo-server',
  serversPath: './src',
  requestImportStatement: `/// <reference types="./typings.d.ts" />\nimport request from "@request"`,
  namespace: 'CloudNativeApi',
});
