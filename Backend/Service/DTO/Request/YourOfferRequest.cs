using Domain.Enum;

namespace Service.DTO.Request
{
    public class YourOfferRequest : TwoFactorAuth
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Message { get; set; }
        public PurchaseType PurchaseType { get; set; }
        public EstateType EstateType { get; set; }
        public Country Country { get; set; }
        public required string City { get; set; }
        public required string Municipality { get; set; }
        public long Area { get; set; }
        public long Price { get; set; }
        public int YearOfConstruction { get; set; }
        public int? Rooms { get; set; }
        public int FloorFrom { get; set; }
        public int FloorTo { get; set; }
        public bool Terrace { get; set; }
        public bool Heating { get; set; }
        public bool Parking { get; set; }
        public bool Elevator { get; set; }
        public bool Basement { get; set; }
        public required List<YourOfferImagesRequest> Images { get; set; }
    }

    public class YourOfferImagesRequest
    {
        public required string Name { get; set; }
        public required byte[] Content { get; set; }
    }
}
