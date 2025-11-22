import axios from "axios";
import { url, type Response } from "./ServiceConfig";
import type { Agency, AgencyDetails, AgencyName } from "./DTO/ResponseBody";

const endpoint = `${url}/Agency`

interface ResponseAgencyName extends Response {
    data: AgencyName[]
}

interface ResponseAgencies extends Response {
    data: Agency[]
}

interface ResponseAgencyDetails extends Response {
    data: AgencyDetails
}

export const getAgenciesName = async () => {
    const data =  await axios
        .get<ResponseAgencyName>(`${endpoint}/Names`)
        .then(x => x.data);
    return data.data
}

export const getAgencies = async () => {
    const data =  await axios
        .get<ResponseAgencies>(`${endpoint}`)
        .then(x => x.data);
    return data.data
}

export const getAgencyDetails = async (id: string) => {
    const data =  await axios
        .get<ResponseAgencyDetails>(`${endpoint}/Details/${id}`)
        .then(x => x.data);
    return data.data
}