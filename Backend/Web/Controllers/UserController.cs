using MediatR;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Command.Contact;
using Service.Command.LookingForProperty;
using Service.Command.YourOffer;
using Service.DTO.Request;
using Web.Authentication;
using Web.Authorization;
using Web.Common;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly ILoginService loginService;
        private readonly ICodeService codeService;

        public UserController(IMediator mediator, ILoginService loginService, ICodeService codeService)
        {
            this.mediator = mediator;
            this.loginService = loginService;
            this.codeService = codeService;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<Result<bool>>> Login(LoginRequest request)
        {
            if(!loginService.AreCredentialsValid(request.Email, request.Password))
            {
                return Unauthorized();
            }
            if (request.CodeId == Guid.Empty)
            {
                var code = codeService.GenerateCode(request.Email);
                var result = new OkResult<Guid>(code.Id) { StatusCode = 201 };
                return ActionResultMapper.MapResult(result);
            }
            else if (codeService.UpdateCode(request.CodeId, request.Email, request.Code)) 
            {
                var token = loginService.GenerateToken(request.Email);
                var result = new OkResult<string>(token);
                return ActionResultMapper.MapResult(result);
            }
            return Unauthorized();
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
