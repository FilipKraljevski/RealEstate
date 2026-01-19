using AutoMapper;
using Domain.Model;
using MediatR;
using Repository.Interface;
using Service.DTO.Request;
using Service.Image;

namespace Service.Command.SaveEstate
{
    public class SaveEstateCommandHandler : IRequestHandler<SaveEstateCommand, Result<bool>>
    {
        private readonly IEstateRepository estateRepository;
        private readonly IAgencyRepository agencyRepository;
        private readonly ICityRepository cityRepository;
        private readonly IImageService imageService;
        private readonly IMapper mapper;

        public SaveEstateCommandHandler(IEstateRepository estateRepository, IAgencyRepository agencyRepository, ICityRepository cityRepository, IImageService imageService, IMapper mapper)
        {
            this.estateRepository = estateRepository;
            this.agencyRepository = agencyRepository;
            this.cityRepository = cityRepository;
            this.imageService = imageService;
            this.mapper = mapper;
        }

        public async Task<Result<bool>> Handle(SaveEstateCommand request, CancellationToken cancellationToken)
        {
            if(request.SaveEstateRequest.Id == Guid.Empty)
            {
                var estate = mapper.Map<Estate>(request.SaveEstateRequest);

                var agency = agencyRepository.Get(request.UserClaims.Id);

                if (agency == null)
                {
                    return new NotFoundResult<bool>("Not Found: Agency does not exist");
                }

                estate.Agency = agency;
                estate.PublishedDate = DateTime.Now;
                estate.Images = new List<Images>();

                AddCity(estate, request.SaveEstateRequest);

                AddImages(estate, request.SaveEstateRequest.Images);

                estateRepository.Add(estate);
            }
            else
            {
                var existingEstate = estateRepository.Get(request.SaveEstateRequest.Id);

                if(existingEstate == null)
                {
                    return new NotFoundResult<bool>("Not Found: Estate does not exist");
                }

                var imagesToRemove = existingEstate.Images?.Where(i => request.SaveEstateRequest.Images?.Find(x => x.Id == i.Id) == null).Select(x => x.Id).ToList();

                foreach (var image in imagesToRemove)
                {
                    imageService.Remove(image);
                    existingEstate.Images?.Remove(existingEstate.Images.Single(x => x.Id == image));
                }

                var imagesToAdd = request.SaveEstateRequest.Images?.Where(x => x.Id == Guid.Empty).ToList();

                AddImages(existingEstate, imagesToAdd);

                AddCity(existingEstate, request.SaveEstateRequest);

                mapper.Map(request.SaveEstateRequest, existingEstate);

                estateRepository.Update(existingEstate);
            }

            return new OkResult<bool>(true);
        }

        private void AddImages(Estate estate, List<ImageRequest>? imagesRequest)
        {
            if (imagesRequest != null)
            {
                foreach (var image in imagesRequest)
                {
                    var id = Guid.NewGuid();
                    imageService.Add(id, Convert.FromBase64String(image.Content));
                    estate.Images?.Add(new Images { Id = id, Name = image.Name, Estate = estate });
                }
            }
        }

        private void AddCity(Estate estate, SaveEstateRequest request)
        {
            if (estate.City == null || estate.City.Id != request.City.Id)
            {
                if (request.City?.Id != Guid.Empty)
                {
                    var city = cityRepository.Get(request.City.Id);

                    if (city != null)
                    {
                        estate.City = city;
                    };
                }
                else
                {
                    cityRepository.Add(new City { Name = request.City.Name, Country = request.Country });
                }
            }
        }
    }
}
