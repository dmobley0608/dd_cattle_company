import axios from "axios";

export const apiClient = axios.create(
    {
    baseURL: 'https://api.ddcattle.company/'
   
    }
);
const headers =(token)=>{
    return {
    'Authorization': `${token}`,
    
    }
}
export const getHorses = async () => await apiClient.get('horses');
export const getHorseById = async (id) => await apiClient.get(`horses/${id}`)
export const getHorseMedia = async (id) => await apiClient.get(`media/${id}`)

export const getMedicalRecordsByHorseId = async (id)=>await apiClient.get(`medical-records/${id}`)
export const updateMedicalRecord = async(id, record, token)=> await apiClient.put(`medical-records/${id}`, record,{headers:{'Authorization': `${token}`}})
export const addMedicalRecord = async(record, token)=>await apiClient.post('medical-records', record, {headers:{'Authorization': `${token}`}})
export const updateHorseById = async(id, horse, token)=>await apiClient.put(`horses/${id}`, horse, {headers:{'Authorization': `${token}`}})
export const deleteRecordById = async(id, token)=>await apiClient.delete(`medical-records/${id}`,{headers:{'Authorization': `${token}`}})

export const uploadImage = async(horse_id, horse_name,file, token)=>await apiClient.post(`/media/${horse_id}/${horse_name}`, file,  {headers:{'Authorization': `${token}`}})
export const deleteImage = async(asset_id, token)=>await apiClient.delete(`/media/${asset_id}`, {headers:{'Authorization': `${token}`}})
