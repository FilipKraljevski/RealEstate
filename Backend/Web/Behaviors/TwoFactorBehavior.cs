using MediatR;
using Repository.Interface;
using Service;
using Service.DTO;
using Service.Email;
using System.Security.Cryptography;

namespace Web.Behaviors
{
    public class TwoFactorBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : TwoFactorAuth<TResponse>
    {
        private readonly ICodeRepository _codeRepository;
        private readonly IEmailService _emailSender;

        public TwoFactorBehavior(ICodeRepository codeRepository, IEmailService emailSender)
        {
            _codeRepository = codeRepository;
            _emailSender = emailSender;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
                var data = _codeRepository.GetWithIdAndEamil(request.CodeId, request.Email);
                var expectedCode = data.Code;

                if (request.Code == expectedCode)
                {
                    var updated = data;
                    updated.IsUsed = true;
                    _codeRepository.Update(updated);

                    return await next();
                }
                else if (request.GetHashCode != null)
                {
                    var result = new Result<TResponse>(StatusCodes.Status403Forbidden)
                    {
                        Message = "Two‑factor authentication failed",
                        Data = default
                    };

                    return (TResponse)(object)result;
                }
                else
                {
                    string body = "The verification code: " + GenerateSecureNumericCode();
                    _emailSender.SendEmailToUser(request.Email, "Verification Code", body);

                    var result = new Result<object>(200)
                    {
                        Message = "Two‑factor authentication needed",
                        Data = data.Id
                    };

                    return (TResponse)(object)result;
                }
        }

        public static string GenerateSecureNumericCode(int length = 6)
        {
            var bytes = new byte[length];
            RandomNumberGenerator.Fill(bytes);
            var code = string.Concat(bytes.Select(b => (b % 10).ToString()));
            return code;
        }
    }
}
