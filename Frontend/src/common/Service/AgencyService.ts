import axios from "axios";
import { url, type BooleanResponse, type Response, type Code } from "./ServiceConfig";
import type { Agency, AgencyDetails, AgencyName } from "./DTO/ResponseBody";
import type { ChangePassword, SaveAgency } from "./DTO/RequestBody";

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

interface SaveAgencyWithCode extends Code {
    body: SaveAgency
}

interface ChangePasswordWithCode extends Code {
    body: ChangePassword
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

export const saveAgency = async ({ body, code }: SaveAgencyWithCode) => {
    const data =  await axios
        .post<BooleanResponse>(`${endpoint}/Save`, body, { headers: { Authorization: `Bearer ${code}` } })
        .then(x => x.data);
    return data.data
}

export const changePassword = async ({ body, code }: ChangePasswordWithCode) => {
    const data =  await axios
        .post<BooleanResponse>(`${endpoint}/ChangePassword`, body, { headers: { Authorization: `Bearer ${code}` } })
        .then(x => x.data);
    return data.data
}