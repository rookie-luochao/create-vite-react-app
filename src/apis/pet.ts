/* eslint-disable */
// @ts-ignore
import request from 'axios';
import * as API from './types';

/** Update an existing pet Update an existing pet by Id PUT /pet */
export async function updatePet(
  body: API.Pet,
  options?: { [key: string]: unknown }
) {
  return request<API.Pet>('/pet', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Add a new pet to the store Add a new pet to the store POST /pet */
export async function addPet(
  body: API.Pet,
  options?: { [key: string]: unknown }
) {
  return request<API.Pet>('/pet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Find pet by ID Returns a single pet GET /pet/${param0} */
export async function getPetById(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getPetByIdParams,
  options?: { [key: string]: unknown }
) {
  const { petId: param0, ...queryParams } = params;
  return request<API.Pet>(`/pet/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Updates a pet in the store with form data POST /pet/${param0} */
export async function updatePetWithForm(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.updatePetWithFormParams,
  options?: { [key: string]: unknown }
) {
  const { petId: param0, ...queryParams } = params;
  return request<unknown>(`/pet/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Deletes a pet DELETE /pet/${param0} */
export async function deletePet(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deletePetParams,
  options?: { [key: string]: unknown }
) {
  const { petId: param0, ...queryParams } = params;
  return request<unknown>(`/pet/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** uploads an image POST /pet/${param0}/uploadImage */
export async function uploadFile(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.uploadFileParams,
  body: string,
  options?: { [key: string]: unknown }
) {
  const { petId: param0, ...queryParams } = params;
  return request<API.ApiResponse>(`/pet/${param0}/uploadImage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    params: {
      ...queryParams,
    },
    data: body,
    ...(options || {}),
  });
}

/** Finds Pets by status Multiple status values can be provided with comma separated strings GET /pet/findByStatus */
export async function findPetsByStatus(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.findPetsByStatusParams,
  options?: { [key: string]: unknown }
) {
  return request<API.Pet[]>('/pet/findByStatus', {
    method: 'GET',
    params: {
      // status has a default value: available
      status: 'available',
      ...params,
    },
    ...(options || {}),
  });
}

/** Finds Pets by tags Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. GET /pet/findByTags */
export async function findPetsByTags(
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.findPetsByTagsParams,
  options?: { [key: string]: unknown }
) {
  return request<API.Pet[]>('/pet/findByTags', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
