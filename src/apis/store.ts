/* eslint-disable */
// @ts-ignore
import request from 'axios';
import * as API from './types';

/** Returns pet inventories by status Returns a map of status codes to quantities GET /store/inventory */
export async function getInventory(options?: { [key: string]: unknown }) {
  return request<Record<string, unknown>>('/store/inventory', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Place an order for a pet Place a new order in the store POST /store/order */
export async function placeOrder(
  body: API.Order,
  options?: { [key: string]: unknown }
) {
  return request<API.Order>('/store/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Find purchase order by ID For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions. GET /store/order/${param0} */
export async function getOrderById(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getOrderByIdParams,
  options?: { [key: string]: unknown }
) {
  const { orderId: param0, ...queryParams } = params;
  return request<API.Order>(`/store/order/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Delete purchase order by ID For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors DELETE /store/order/${param0} */
export async function deleteOrder(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteOrderParams,
  options?: { [key: string]: unknown }
) {
  const { orderId: param0, ...queryParams } = params;
  return request<unknown>(`/store/order/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
