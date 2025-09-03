import http from '@/lib/http'

import {
    LoginBodyType,
    LoginResType,
    RegisterBodyType,
    RegisterResType,
    SlideSessionResType
  } from '@/schemaValidations/auth.schema'


const authApiRequest = {
    login: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
    register: (body: RegisterBodyType) =>
      http.post<RegisterResType>('/auth/register', body),
    auth: (body: { sessionToken: string; expiresAt: string }) =>
      http.post('/api/auth', body, {
        baseUrl: ''
      }),
      logout: () => http.post('/api/auth/logout', null, { baseUrl: '' }), 

}

export default authApiRequest;