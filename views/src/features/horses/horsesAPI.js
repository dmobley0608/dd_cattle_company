import axios from "axios";

export const apiClient = axios.create(
    {
    baseURL: 'http://localhost:5000/'
   
    }
);

export const getHorses = async () => await apiClient.get('horses');
export const getHorseById = async (id) => await apiClient.get(`horses/${id}`)
export const getHorseMedia = async (id) => await apiClient.get(`media/${id}`)
export const getMedicalRecordsByHorseId = async (id)=>await apiClient.get(`medical-records/${id}`)

export const updateHorseById = async(id, horse, token)=>await apiClient.put(`/horses/${id}`, horse, {headers:{'Authorization': `${token}`}})

export const uploadImage = async()=>await apiClient.post('/media/Titus')
