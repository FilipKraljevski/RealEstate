import { queryOptions } from "@tanstack/react-query";
import { getEstateDetails } from "../Service/EstateService";
import { getAgencies, getAgencyDetails } from "../Service/AgencyService";

export const estateDetailsQueryOptions = (id: string) => queryOptions({
    queryKey: ["estateDetails", id], 
    queryFn:() =>  getEstateDetails(id) 
})

export const agenciesQueryOptions = () => queryOptions({
    queryKey: ['agencies'],
    queryFn: () => getAgencies(),
})

export const agencyDetailsQueryOptions = (id: string) => queryOptions({
    queryKey: ['agencyDetails', id],
    queryFn: () => getAgencyDetails(id),
})

