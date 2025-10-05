using Domain.UserClaims;
using MediatR;
using Service.DTO.Request;

namespace Service.Command.SaveEstate
{
    public class SaveEstateCommand : IRequest<Result<bool>>
    {
        public required SaveEstateRequest SaveEstateRequest { get; set; }

        public required UserClaims UserClaims { get; set; }
    }
}
