using MediatR;
using Service.DTO.Request;

namespace Service.Command.LookingForProperty
{
    public class LookingForPropertyCommand : IRequest<Result<bool>>
    {
        public required LookingForPropertyRequest LookingForPropertyRequest { get; set; }
    }
}
