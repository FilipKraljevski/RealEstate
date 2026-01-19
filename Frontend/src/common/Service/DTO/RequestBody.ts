import type { Country } from "../../Domain/Country";
import type { EstateType } from "../../Domain/EstateType";
import type { PurchaseType } from "../../Domain/PurchaseType";

export interface ImageRequest {
    id?: string
    name: string
    content: string 
}

export interface ProfilePicture {
    id?: string
    content?: string 
}

export interface Telephone {
    id?: string
    phoneNumber: string
}

export interface City
{
    id?: string
    name: string
    country: Country
}

export interface AdditionalEstateInfo
{
    id?: string
    name: string
}

//agency
export interface SaveAgency {
    id: string | undefined
    name: string
    description: string
    country: Country
    email: string
    profilePicture: ProfilePicture
    telephones: Telephone[]
}

export interface ChangePassword
{
    agencyId: string
    oldPassword?: string
    newPassword: string
    confirmPassword: string
}

//estate
export interface EstateFilters {
    purchaseType?: PurchaseType
    estateType?: EstateType
    country?: Country
    cityId?: string
    agencyId?: string
    fromArea?: number
    toArea?: number
    fromPrice?: number
    toPrice?: number
}

export interface SaveEstate {
    id: string | undefined
    title: string
    estateType: EstateType
    purchaseType: PurchaseType
    country: Country
    municipality: string
    area: number
    price: number
    description: string
    yearOfConstruction: number
    rooms: number
    floor: string
    city: City
    additionalEstateInfo: AdditionalEstateInfo[]
    images: ImageRequest[]
}

//user
export interface LookingForProperty {
    name: string
    email: string
    message: string
    purchaseType: PurchaseType
    estateType: EstateType
    country: Country
    city: string
    municipality: string
    areaFrom: number
    areaTo: number
    maxPrice: number
    yearOfConstruction: number
    rooms?: number
    floorFrom: number
    floorTo: number
    terrace: boolean
    heating: boolean
    parking: boolean
    elevator: boolean
    basement: boolean
}

export interface YourOffer {
    name: string
    email: string
    message: string
    purchaseType: PurchaseType
    estateType: EstateType
    country: Country
    city: string
    municipality: string
    area: number
    price: number
    yearOfConstruction: number
    rooms?: number
    floorFrom: number
    floorTo: number
    terrace: boolean
    heating: boolean
    parking: boolean
    elevator: boolean
    basement: boolean
    images: ImageRequest[]
}

export interface Contact {
    name: string
    email: string
    subject: string
    body: string
}

export interface Login {
    username: string
    password: string
    codeId: any
    code: string
}