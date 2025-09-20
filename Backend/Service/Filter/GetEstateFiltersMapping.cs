using Domain.Model;
using Service.DTO.Request;
using Service.Filter;
using System.Linq.Expressions;

namespace Service.FilterMapping
{
    public class GetEstateFiltersMapping : IFilterMapping<GetEstateFiltersRequest, Estate>
    {
        public Dictionary<string, Func<GetEstateFiltersRequest, object?, Expression<Func<Estate, bool>>>> GetMappings()
        {
            return new() 
            {            
                { nameof(GetEstateFiltersRequest.PurchaseType), (f, v) => e => e.PurchaseType == f.PurchaseType },
                { nameof(GetEstateFiltersRequest.EstateType),   (f, v) => e => e.EstateType == f.EstateType },
                { nameof(GetEstateFiltersRequest.Country),      (f, v) => e => e.Country == f.Country },
                { nameof(GetEstateFiltersRequest.CityId),       (f, v) => e => e.City != null && e.City.Id == f.CityId },
                { nameof(GetEstateFiltersRequest.AgencyId),     (f, v) => e => e.Agency.Id == f.AgencyId },
                { nameof(GetEstateFiltersRequest.FromArea),     (f, v) => e => e.Area >= f.FromArea },
                { nameof(GetEstateFiltersRequest.ToArea),       (f, v) => e => e.Area <= f.ToArea },
                { nameof(GetEstateFiltersRequest.FromPrice),    (f, v) => e => e.Price >= f.FromPrice },
                { nameof(GetEstateFiltersRequest.ToPrice),      (f, v) => e => e.Price <= f.ToPrice }
            };
        }
    }
}
