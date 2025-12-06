using Domain.Model;
using Repository.Interface;
using Service.Email;
using System.Security.Cryptography;

namespace Web.Authorization
{
    public class CodeService : ICodeService
    {
        private readonly ICodeRepository _codeRepository;
        private readonly IEmailService _emailSender;

        public CodeService(ICodeRepository codeRepository, IEmailService emailSender)
        {
            _codeRepository = codeRepository;
            _emailSender = emailSender;
        }

        public CodeAuthorization GenerateCode(string email)
        {
            var generated = GenerateSecureNumericCode();
            string body = "The verification code: " + generated;
            _emailSender.SendEmailToUser(email, "Verification Code", body);

            var newCode = new CodeAuthorization
            {
                Code = generated,
                Email = email,
                ExpirationDate = DateTime.Now.AddMinutes(5)
            };

            return _codeRepository.Add(newCode);
        }

        public bool UpdateCode(Guid codeId, string email, string? code)
        {
            var data = _codeRepository.GetWithIdAndEamil(codeId, email);
            var expectedCode = data.Code;
            if (code == expectedCode)
            {
                var updated = data;
                updated.IsUsed = true;
                _codeRepository.Update(updated);
                return true;
            }
            return false;
        }

        private static string GenerateSecureNumericCode(int length = 6)
        {
            var bytes = new byte[length];
            RandomNumberGenerator.Fill(bytes);
            var code = string.Concat(bytes.Select(b => (b % 10).ToString()));
            return code;
        }
    }
}
