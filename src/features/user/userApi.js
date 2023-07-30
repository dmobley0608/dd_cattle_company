import axios from "axios";

export const apiClient = axios.create(
    {
    baseURL: `http://localhost:${process.env.PORT}/`
    }
);

export const emailLogin = async(email, password)=>apiClient.post('user/login', {email:email, password:password})