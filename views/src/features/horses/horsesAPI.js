import axios from "axios";

export const apiClient = axios.create(
    {
    baseURL: 'http://localhost:5000/'
    }
);

export const getHorses = async () => await apiClient.get('horses');
export const getHorseById = async (id) => await apiClient.get(`horses/${id}`)
export const getHorseImages = async (name) => await apiClient.get(`horses/images/${name}`)
export const getMedicalRecordsByHorseId = async (id)=>await apiClient.get(`medical-records/horse/${id}`)
