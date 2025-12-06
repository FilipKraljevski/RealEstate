using Domain.UserClaims;

namespace Service.DTO
{
    public interface IIdentityRequest
    {
        public UserClaims UserClaims { get; set;  }
    }
}
