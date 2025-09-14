using Domain.Enum;
using MediatR;
using Service.DTO.Response;

namespace Service.Query.GetCities
{
    public class GetCitiesQuery : IRequest<Result<List<GetCityResponse>>>
    {
        public Country Country { get; set; }
    }
}
