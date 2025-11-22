import type { Country } from "../../Domain/Country";
import type { EstateType } from "../../Domain/EstateType";
import type { PurchaseType } from "../../Domain/PurchaseType";

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