import axios from "axios";
import type { Contact, LookingForProperty, YourOffer } from "./DTO/RequestBody";
import { url, type BooleanResponse } from "./ServiceConfig";

const endpoint = `${url}/User`

export const sendLookingForProperty = async (body: LookingForProperty) => {
    const data =  await axios
        .post<BooleanResponse>(`${endpoint}/LookingForProperty`, body)
    return data.data
}

export const sendYourOffer = async (body: YourOffer) => {
    const data =  await axios
        .post<BooleanResponse>(`${endpoint}/YourOffer`, body)
    return data.data
}

export const sendContact = async (body: Contact) => {
    const data =  await axios
        .post<BooleanResponse>(`${endpoint}/Contact`, body)
    return data.data
}