using Domain.Enum;
using Domain.Extensions;
using Domain.Model;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Repository.Interface;

namespace Service.Command.ChangePassword
{
    public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Result<bool>>
    {
        private readonly IAgencyRepository agencyRepository;
        private readonly IPasswordHasher<Agency> passwordHasher;

        public ChangePasswordCommandHandler(IAgencyRepository agencyRepository, IPasswordHasher<Agency> passwordHasher)
        {
            this.agencyRepository = agencyRepository;
            this.passwordHasher = passwordHasher;
        }

        public async Task<Result<bool>> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var agencyId = request.ChangePasswordRequest.AgencyId != Guid.Empty ? request.ChangePasswordRequest.AgencyId : request.UserClaims.Id;

            var agency = agencyRepository.Get(agencyId);

            if (agency == null)
            {
                return new NotFoundResult<bool>("Not Found: Agency does not exist");
            }

            if (request.UserClaims.Roles.HasRole(RoleType.Agency))
            {
                var checkOldPassword = passwordHasher.VerifyHashedPassword(agency, agency.Password, request.ChangePasswordRequest.OldPassword ?? "");

                if(checkOldPassword != PasswordVerificationResult.Success)
                {
                    return new ErrorResult<bool>("Error: Old password not correct");
                }
            }

            agency.Password = passwordHasher.HashPassword(agency, request.ChangePasswordRequest.NewPassword);

            agencyRepository.Update(agency);

            return new OkResult<bool>(true);
        }
    }
}
