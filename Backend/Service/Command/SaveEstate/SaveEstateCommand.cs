using Domain.UserClaims;
using MediatR;
using Service.DTO;
using Service.DTO.Request;

namespace Service.Command.SaveEstate
{
    public class SaveEstateCommand : IIdentityRequest, IRequest<Result<bool>>
    {
        public required SaveEstateRequest SaveEstateRequest { get; set; }

        public required UserClaims UserClaims { get; set; }
    }
}
