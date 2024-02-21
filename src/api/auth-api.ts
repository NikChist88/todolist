import { instance, ResponseType } from "./todolists-api"

export const authAPI = {
  login(data: AuthLoginDataType) {
    return instance.post<ResponseType<{ userId?: number }>>("auth/login", data)
  },

  init() {
    return instance.get<ResponseType<AuthMeDataType>>("auth/me")
  },
  
  logout() {
    return instance.delete<ResponseType>("auth/login")
  },
}

// types
export type AuthLoginDataType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export type AuthMeDataType = {
  id: number
  email: string
  login: string
}