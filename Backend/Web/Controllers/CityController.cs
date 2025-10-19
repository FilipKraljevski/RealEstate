using Domain.Enum;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.DTO.Response;
using Service.Query.GetCities;
using Web.Common;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IMediator mediator;

        public CityController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("{country}")]
        public async Task<ActionResult<Result<List<GetCityResponse>>>> GetCities(Country country) 
        {
            var result = await mediator.Send(new GetCitiesQuery { Country = country });
            return ActionResultMapper.MapResult(result);
        }
    }
}
