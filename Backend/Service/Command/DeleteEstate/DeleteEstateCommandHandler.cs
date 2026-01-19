using MediatR;
using Repository.Interface;
using Service.Image;

namespace Service.Command.DeleteEstate
{
    public class DeleteEstateCommandHandler : IRequestHandler<DeleteEstateCommand, Result<Guid>>
    {
        private readonly IEstateRepository estateRepository;
        private readonly IImageService imageService;

        public DeleteEstateCommandHandler(IEstateRepository estateRepository, IImageService imageService)
        {
            this.estateRepository = estateRepository;
            this.imageService = imageService;
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

            foreach (var image in estate.Images)
            {
                imageService.Remove(image.Id);
            }

            estateRepository.Remove(estate);

            return new OkResult<Guid>(request.EstateId);
        }
    }
}
