import axios from "axios";

export const apiClient = axios.create(
    {
    baseURL: 'http://localhost:9000/'
    }
);

export const emailLogin = async(email, password)=>apiClient.post('user/login', {email:email, password:password})