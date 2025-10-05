using Domain.Enum;

namespace Service.DTO.Request
{
    public class SaveEstateRequest
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public EstateType EstateType { get; set; }
        public PurchaseType PurchaseType { get; set; }
        public Country Country { get; set; }
        public required string Municipality { get; set; }
        public long Area { get; set; }
        public long Price { get; set; }
        public required string Description { get; set; }
        public int YearOfConstruction { get; set; }
        public int? Rooms { get; set; }
        public string? Floor { get; set; }
        public required CityRequest City { get; set; }
        public Guid UpdatedByAgencyId { get; set; } //Updated by for authorization purposes
        public List<ImagesRequest>? Pictures { get; set; }
        public List<AdditionalEstateInfoRequest>? AdditionalEstateInfo { get; set; }
    }

    public class CityRequest //keep in mind might add duplicate
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public Country Country { get; set; }
    }

    public class ImagesRequest
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required byte[] Content { get; set; }
    }

    public class AdditionalEstateInfoRequest
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
    }
}
