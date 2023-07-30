import axios from "axios";

export const apiClient = axios.create(
    {
    baseURL: `http://localhost:${process.env.REACT_APP_PORT}/api/`
    }
);

export const emailLogin = async(email, password)=>apiClient.post('user/login', {email:email, password:password})