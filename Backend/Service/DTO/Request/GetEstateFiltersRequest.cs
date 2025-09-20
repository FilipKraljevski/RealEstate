using Domain.Enum;

namespace Service.DTO.Request
{
    public class GetEstateFiltersRequest
    {
        public PurchaseType? PurchaseType { get; set; }
        public EstateType? EstateType { get; set; }
        public Country? Country { get; set; }
        public Guid? CityId { get; set; }
        public Guid? AgencyId { get; set; }
        public long? FromArea { get; set; }
        public long? ToArea { get; set; }
        public long? FromPrice { get; set; }
        public long? ToPrice { get; set; }
    }
}
