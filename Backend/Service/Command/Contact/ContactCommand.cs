using MediatR;
using Service.DTO.Request;

namespace Service.Command.Contact
{
    public class ContactCommand : IRequest<Result<bool>>
    {
        public required ContactRequest ContactRequest { get; set; }
    }
}
