using Domain.UserClaims;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Command.DeleteEstate;
using Service.Command.SaveEstate;
using Service.DTO.Request;
using Service.DTO.Response;
using Service.Query.GetEstateDetails;
using Service.Query.GetEstates;
using Web.Common;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstateController : ControllerBase
    {
        private readonly IMediator mediator;

        public EstateController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Result<List<GetEstateResponse>>>> GetEstates(GetEstateFiltersRequest estateFiltersRequest, int page, int size)
        {
            var result = await mediator.Send(new GetEstatesQuery { Filters = estateFiltersRequest, Page = page, Size = size });
            return ActionResultMapper.MapResult(result);
        }

        [HttpGet("Details/{id}")]
        public async Task<ActionResult<Result<GetEstateDetailsResponse>>> GetEstateDetails(Guid id)
        {
            var result = await mediator.Send(new GetEstateDetailsQuery { EstateId = id });
            return ActionResultMapper.MapResult(result);
        }

        [HttpPost("Save")]
        [Authorize]
        public async Task<ActionResult<Result<bool>>> SaveEstate(SaveEstateRequest saveEstateRequest)
        {
            var userClaims = new UserClaims(); //This is for test, we will get this from the logged in user
            var result = await mediator.Send(new SaveEstateCommand { SaveEstateRequest = saveEstateRequest, UserClaims = userClaims });
            return ActionResultMapper.MapResult(result);
        }

        [HttpPost("Delete/{id}")]
        [Authorize]
        public async Task<ActionResult<Result<Guid>>> DeleteEstate(Guid id)
        {
            var result = await mediator.Send(new DeleteEstateCommand { EstateId = id});
            return ActionResultMapper.MapResult(result);
        }
    }
}
