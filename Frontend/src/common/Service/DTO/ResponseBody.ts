import type { Country } from "../../Domain/Country"
import { EstateType } from "../../Domain/EstateType"
import { PurchaseType } from "../../Domain/PurchaseType"

// City
export interface City {
    id: string
    name: string
}

//Agency
export interface AgencyName {
    id: string
    name: string
}

export interface Agency {
    id: string
    name: string
    description: string
    country: Country
    profilePicture: string
}

export interface AgencyDetails {
    id: string
    name: string
    description: string
    country: Country
    email: string
    profilePicture: string
    numberOfEstates: number
    telephones: string[]
}

//Estate
export interface Estate {
    id: string
    title: string
    estateType: EstateType
    purchaseType: PurchaseType
    country: Country
    location: string
    area: number
    price: number
    description: string
    agency: AgencyName
    image: string
}

export interface EstateDetails {
    id: string
    image: string[]
    title: string
    description: string
    estateType: EstateType
    publishedDate: Date
    country: Country
    city: string
    municipality: string
    area: number
    yearOfConstruction: number
    rooms: number
    floor: string
    purchaseType: PurchaseType
    price: number
    additionalEstateInfo: string[]
    agency: AgencyName
}