import axios from "axios";

export const apiClient = axios.create(
    {
    baseURL: `/api/`
    }
);

export const emailLogin = async(email, password)=>apiClient.post('user/login', {email:email, password:password})