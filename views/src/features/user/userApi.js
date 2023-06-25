import axios from "axios";

export const apiClient = axios.create(
    {
    baseURL: 'https://api.ddcattle.company/'
    }
);

export const emailLogin = async(email, password)=>apiClient.post('user/login', {email:email, password:password})