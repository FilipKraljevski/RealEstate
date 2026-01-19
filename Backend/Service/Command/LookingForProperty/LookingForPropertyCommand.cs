using Service.DTO;
using Service.DTO.Request;

namespace Service.Command.LookingForProperty
{
    public class LookingForPropertyCommand : TwoFactorAuth<Result<string>>
    {
        public required LookingForPropertyRequest LookingForPropertyRequest { get; set; }
        public Guid CodeId { get; set; }
        public required string Code { get; set; }
        public required string Email { get; set; }
    }
}
