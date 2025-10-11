using Domain.UserClaims;
using MediatR;
using Service.DTO.Request;

namespace Service.Command.ChangePassword
{
    public class ChangePasswordCommand : IRequest<Result<bool>>
    {
        public required ChangePasswordRequest ChangePasswordRequest { get; set; }
        public required UserClaims UserClaims { get; set; }
    }
}
