using MediatR;
using Microsoft.AspNetCore.Mvc;
using Service.DTO.Response;
using Service;
using Service.Query.GetAgencies;
using Web.Common;
using Service.Query.GetAgenciesNames;
using Service.Query.GetAgencyDetails;
using Service.Command.SaveProfile;
using Service.DTO.Request;
using Service.Command.ChangePassword;
using Domain.UserClaims;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgencyController : ControllerBase
    {
        private readonly IMediator mediator;

        public AgencyController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<Result<List<GetAgencyResponse>>>> GetAgencies()
        {
            var result = await mediator.Send(new GetAgenciesQuery());
            return ActionResultMapper.MapResult(result);
        }

        [HttpGet("Names")]
        public async Task<ActionResult<Result<List<GetAgencyNameResponse>>>> GetAgenciesNames()
        {
            var result = await mediator.Send(new GetAgenciesNamesQuery());
            return ActionResultMapper.MapResult(result);
        }

        [HttpGet("Details/{id}")]
        public async Task<ActionResult<Result<GetAgencyDetailsResponse>>> GetAgencyDetails(Guid id)
        {
            var result = await mediator.Send(new GetAgencyDetailsQuery { AgencyId = id });
            return ActionResultMapper.MapResult(result);
        }

        [HttpPost("Save")]
        [Authorize]
        public async Task<ActionResult<Result<bool>>> SaveAgency(SaveAgencyRequest saveAgencyRequest)
        {
            var result = await mediator.Send(new SaveAgencyCommand { SaveAgencyRequest = saveAgencyRequest });
            return ActionResultMapper.MapResult(result);
        }

        [HttpPost("ChangePassword")]
        [Authorize]
        public async Task<ActionResult<Result<bool>>> ChangePassword(ChangePasswordRequest changePasswordRequest)
        {
            //var userClaims = new UserClaims(); //This is for test, we will get this from the logged in user
            var result = await mediator.Send(new ChangePasswordCommand { ChangePasswordRequest = changePasswordRequest });
            return ActionResultMapper.MapResult(result);
        }
    }
}
