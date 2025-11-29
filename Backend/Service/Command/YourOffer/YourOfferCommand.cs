using MediatR;
using Service.DTO;
using Service.DTO.Request;

namespace Service.Command.YourOffer
{
    public class YourOfferCommand :  TwoFactorAuth<Result<bool>>
    {
        public required YourOfferRequest YourOfferRequest { get; set; }
        public Guid CodeId { get; set; }
        public required string Code { get; set; }
        public required string Email { get; set; }
    }
}
