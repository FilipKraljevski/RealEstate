using MediatR;
using Service.DTO.Request;

namespace Service.Command.SaveProfile
{
    public class SaveAgencyCommand : IRequest<Result<bool>>
    {
        public required SaveAgencyRequest SaveAgencyRequest { get; set; }
    }
}
