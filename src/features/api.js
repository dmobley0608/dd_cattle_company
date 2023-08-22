import axios from "axios";
const url = ()=>{
    if(process.env.REACT_APP_API_BASE_URL === " production"){
        return `/api/`
    }else{
        return "http://localhost:9000/api/"
    }
}
export const apiClient = axios.create(
    {
    baseURL: url()      
    }
);
