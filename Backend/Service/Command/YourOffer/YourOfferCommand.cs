using Service.DTO;
using Service.DTO.Request;

namespace Service.Command.YourOffer
{
    public class YourOfferCommand :  TwoFactorAuth<Result<string>>
    {
        public required YourOfferRequest YourOfferRequest { get; set; }
        public Guid CodeId { get; set; }
        public required string Code { get; set; }
        public required string Email { get; set; }
    }
}
