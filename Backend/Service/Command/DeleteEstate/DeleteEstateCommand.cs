using MediatR;

namespace Service.Command.DeleteEstate
{
    public class DeleteEstateCommand : IRequest<Result<Guid>>
    {
        public Guid EstateId { get; set; }
    }
}
