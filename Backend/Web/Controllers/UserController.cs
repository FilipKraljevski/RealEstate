using MediatR;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Command.Contact;
using Service.Command.LookingForProperty;
using Service.Command.YourOffer;
using Service.DTO.Request;
using Web.Common;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator mediator;

        public UserController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("Contact")]
        public async Task<ActionResult<Result<bool>>> Contact(ContactRequest contactRequest)
        {
            var result = await mediator.Send(new ContactCommand { ContactRequest = contactRequest });
            return ActionResultMapper.MapResult(result);
        }

        [HttpPost("LookingForProperty")]
        public async Task<ActionResult<Result<bool>>> LookingForProperty(LookingForPropertyRequest lookingForPropertyRequest)
        {
            var result = await mediator.Send(new LookingForPropertyCommand { LookingForPropertyRequest = lookingForPropertyRequest, 
                Code = lookingForPropertyRequest.Code, Email = lookingForPropertyRequest.Email, CodeId = lookingForPropertyRequest.CodeId });
            return ActionResultMapper.MapResult(result);
        }

        [HttpPost("YourOffer")]
        public async Task<ActionResult<Result<bool>>> YourOffer(YourOfferRequest yourOfferRequest)
        {
            var result = await mediator.Send(new YourOfferCommand { YourOfferRequest = yourOfferRequest,
                Code = yourOfferRequest.Code, Email = yourOfferRequest.Email, CodeId = yourOfferRequest.CodeId });
            return ActionResultMapper.MapResult(result);
        }
    }
}
