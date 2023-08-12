import axios from "axios";

export const apiClient = axios.create(
    {
    baseURL: 'https://ddcattle-backend-9cb82b066a36.herokuapp.com/'
    }
);

export const emailLogin = async(email, password)=>apiClient.post('user/login', {email:email, password:password})