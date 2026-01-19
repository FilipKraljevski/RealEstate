using MediatR;
using Repository.Interface;
using Service;
using Service.DTO;
using Service.Email;
using Web.Authorization;

namespace Web.Behaviors
{
    public class TwoFactorBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : TwoFactorAuth<TResponse>
    {
        private readonly ICodeRepository _codeRepository;
        private readonly IEmailService _emailSender;
        private readonly ICodeService codeService;

        public TwoFactorBehavior(ICodeRepository codeRepository, IEmailService emailSender, ICodeService codeService)
        {
            _codeRepository = codeRepository;
            _emailSender = emailSender;
            this.codeService = codeService;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (request.CodeId == Guid.Empty)
            {
                var code = codeService.GenerateCode(request.Email, false);

                var result = new Result<string>(201)
                {
                    Message = "Two‑factor authentication needed",
                    Data = code.Id.ToString()
                };

                return (TResponse)(object)result;
            }
            else if (codeService.UpdateCode(request.CodeId, request.Email, request.Code, false))
            {
                return await next();
            }
            else
            {
                var result = new Result<TResponse>(StatusCodes.Status403Forbidden)
                {
                    Message = "Two‑factor authentication failed",
                    Data = default
                };
                
                return (TResponse)(object)result;
            }
        }
    }
}
