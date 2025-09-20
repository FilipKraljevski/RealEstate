using Domain.Enum;

namespace Service.DTO.Response
{
    public class GetEstateResponse
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public EstateType EstateType { get; set; }
        public PurchaseType PurchaseType { get; set; }
        public Country Country { get; set; }
        public required string Location { get; set; }
        public long Area { get; set; }
        public long Price { get; set; }
        public required string Description { get; set; }
        public required GetAgencyNameResponse Agency { get; set; }
        public byte[]? Image { get; set; }
    }
}
