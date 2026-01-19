import axios from "axios";
import type { Contact, Login, LookingForProperty, YourOffer } from "./DTO/RequestBody";
import { url, type BooleanResponse, type StringResponse } from "./ServiceConfig";

const endpoint = `${url}/User`

export const sendLookingForProperty = async (body: LookingForProperty) => {
    const data =  await axios
        .post<StringResponse>(`${endpoint}/LookingForProperty`, body)
    return data.data
}

export const sendYourOffer = async (body: YourOffer) => {
    const data =  await axios
        .post<StringResponse>(`${endpoint}/YourOffer`, body)
    return data.data
}

export const sendContact = async (body: Contact) => {
    const data =  await axios
        .post<BooleanResponse | StringResponse>(`${endpoint}/Contact`, body)
    return data.data
}

export const login = async (body: Login) => {
    const data = await axios
        .post<StringResponse>(`${endpoint}/Login`, body, { headers: {} })
    return data.data
}