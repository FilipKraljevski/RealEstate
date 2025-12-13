using Domain.UserClaims;
using MediatR;
using Service.DTO;
using Service.DTO.Request;

namespace Service.Command.ChangePassword
{
    public class ChangePasswordCommand : IIdentityRequest, IRequest<Result<bool>>
    {
        public required ChangePasswordRequest ChangePasswordRequest { get; set; }
        public UserClaims UserClaims { get; set; }
    }
}
