import axios from "axios"
import { useAuth } from "../Context/AuthProvider";

export const url = 'https://localhost:44371/api'

const api = axios.create({baseURL: url})

api.interceptors.request.use((config) => {
    const { token } = useAuth();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api

export interface Response {
    statusCode: number,
    message: string
}

export interface BooleanResponse extends Response{
    data: boolean
}

export interface StringResponse extends Response {
    data: string
}

export interface Code {
    code: any
}