import { apiClient } from "../api"

export const emailLogin = async(email, password)=>apiClient.post('user/login', {email:email, password:password})
export const userVarifaction = async()=>apiClient.get('/verify-user')
export const emailRegister = async(email,password)=>apiClient.post('user/register', {email, password})
export const checkUserSession = async()=>apiClient.get('verify-user')
export const userLogout = ()=> apiClient.get('user/logout')