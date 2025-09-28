using MediatR;
using Repository.Interface;

namespace Service.Command.DeleteEstate
{
    public class DeleteEstateCommandHandler : IRequestHandler<DeleteEstateCommand, Result<Guid>>
    {
        private readonly IEstateRepository estateRepository;

        public DeleteEstateCommandHandler(IEstateRepository estateRepository)
        {
            this.estateRepository = estateRepository;
        }

        public async Task<Result<Guid>> Handle(DeleteEstateCommand request, CancellationToken cancellationToken)
        {
            if (request.EstateId == Guid.Empty) 
            {
                return new ErrorResult<Guid>("Error: Estate id not provided or empty");
            }

            var estate = estateRepository.Get(request.EstateId);

            if (estate == null)
            {
                return new NotFoundResult<Guid>("Not Found: Estate does not exist");
            }

            estateRepository.Remove(estate);

            return new OkResult<Guid>(request.EstateId);
        }
    }
}
