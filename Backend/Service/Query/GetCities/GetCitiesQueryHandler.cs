using AutoMapper;
using Domain.Enum;
using Domain.Model;
using MediatR;
using Repository.Interface;
using Service.DTO.Response;

namespace Service.Query.GetCities
{
    public class GetCitiesQueryHandler : IRequestHandler<GetCitiesQuery, Result<List<GetCityResponse>>>
    {
        private readonly ICityRepository cityRepository;
        private readonly IMapper mapper;

        public GetCitiesQueryHandler(ICityRepository cityRepository, IMapper mapper)
        {
            this.cityRepository = cityRepository;
            this.mapper = mapper;
        }

        public async Task<Result<List<GetCityResponse>>> Handle(GetCitiesQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<City> cities;

            if (request.Country != Country.None) 
            {
                cities = cityRepository.GetByCountry(request.Country);
            }
            else
            {
                cities = cityRepository.GetAll();
            }

            var mappedCities = mapper.Map<List<GetCityResponse>>(cities);

            return new OkResult<List<GetCityResponse>>(mappedCities);
        }
    }
}
