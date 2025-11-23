import type { Country } from "../Domain/Country";
import axios from 'axios'
import { url, type Response } from "./ServiceConfig";
import type { City } from "./DTO/ResponseBody";

const endpoint = `${url}/City`

interface ResponseCity extends Response {
    data: City[]
}

export const getCities = async (countryId: Country) => {
    const data =  await axios
        .get<ResponseCity>(`${endpoint}/${countryId}`)
        .then(x => x.data);
    return data.data
}