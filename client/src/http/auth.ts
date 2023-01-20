import { ILoginDataRequest, IRegisterDataRequest } from './interfaces'

import { $host } from './index'

export async function login(params: ILoginDataRequest) {
  const { data } = await $host.post('api/auth/login', params)
  return data
}

export async function register(params: IRegisterDataRequest) {
  const { data } = await $host.post('api/auth/register', params)
  return data
}
