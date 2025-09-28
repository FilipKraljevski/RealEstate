using Domain.Enum;

namespace Service.DTO.Response
{
    public class GetEstateDetailsResponse
    {
        public Guid Id { get; set; }
        public List<string>? Images { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public EstateType EstateType { get; set; }
        public DateTime PublishedDate { get; set; }
        public Country Country { get; set; }
        public required string City { get; set; }
        public required string Municipality { get; set; }
        public long Area { get; set; }
        public int YearOfConstruction { get; set; }
        public int? Rooms { get; set; }
        public string? Floor { get; set; }
        public PurchaseType PurchaseType { get; set; }
        public long Price { get; set; }
        public List<string>? AdditionalEstateInfo { get; set; }
        public required GetAgencyNameResponse Agency {  get; set; }
    }
}
