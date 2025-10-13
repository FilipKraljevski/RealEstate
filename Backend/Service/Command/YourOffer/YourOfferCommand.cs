using MediatR;
using Service.DTO.Request;

namespace Service.Command.YourOffer
{
    public class YourOfferCommand : IRequest<Result<bool>>
    {
        public required YourOfferRequest YourOfferRequest { get; set; }
    }
}
