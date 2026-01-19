import axios from "axios";
import { url, type BooleanResponse, type Code, type Response } from "./ServiceConfig";
import type { Estate, EstateDetails } from "./DTO/ResponseBody";
import type { EstateFilters, SaveEstate } from "./DTO/RequestBody";

const endpoint = `${url}/Estate`

interface ResponseEstate extends Response {
    data: Estate[]
}

interface ResponseEstateDetails extends Response {
    data: EstateDetails
}

interface SaveEstateWithCode extends Code {
    body: SaveEstate
}

export const getEstates = async (filters: EstateFilters, page: number, size: number) => {
    const data =  await axios
        .post<ResponseEstate>(`${endpoint}?page=${page}&size=${size}`, filters)
        .then(x => x.data);
    return data.data
}

export const getEstateDetails = async (id: string) => {
    const data =  await axios
        .get<ResponseEstateDetails>(`${endpoint}/Details/${id}`)
        .then(x => x.data);
    return data.data
}

export const saveEstate = async ({ body, code }: SaveEstateWithCode) => {
    const data =  await axios
        .post<BooleanResponse>(`${endpoint}/Save`, body, { headers: { Authorization: `Bearer ${code}` } })
        .then(x => x.data);
    return data.data
}

export const deleteEstate = async ({ id, code }: any) => {
    const data = await axios
        .post<BooleanResponse>(`${endpoint}/Delete/${id}`, undefined, { headers: { Authorization: `Bearer ${code}` } })
        .then(x => x.data)
    return data.data
}