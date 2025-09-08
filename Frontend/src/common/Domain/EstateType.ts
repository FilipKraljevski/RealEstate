export enum EstateType {
    House = 1,
    Apartment = 2,
    Office = 3,
    Shop = 4,
    Warehouse = 5,
    Land = 6
}

export const showRoomField = (estateType: EstateType) => {
    switch(estateType){
        case EstateType.House:
        case EstateType.Apartment:
            return true
        default:
            return false
    }
}