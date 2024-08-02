import type { GenerateServiceProps } from "openapi-ts-request";

export default [
  {
    schemaPath: "https://petstore3.swagger.io/api/v3/openapi.json",
    serversPath: "./src/apis",
  },
] as GenerateServiceProps[];
