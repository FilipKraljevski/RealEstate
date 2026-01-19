using Domain.Model;
using Repository.Interface;
using Service.Email;
using System.Security.Cryptography;

namespace Web.Authorization
{
    public class CodeService : ICodeService
    {
        private readonly ICodeRepository _codeRepository;
        private readonly IAgencyRepository _agencyRepository;
        private readonly IEmailService _emailSender;

        public CodeService(ICodeRepository codeRepository, IAgencyRepository agencyRepository, IEmailService emailSender)
        {
            _codeRepository = codeRepository;
            _agencyRepository = agencyRepository;
            _emailSender = emailSender;
        }

        public CodeAuthorization GenerateCode(string username, bool isAgency = true)
        {
            var generated = GenerateSecureNumericCode();
            string body = "The verification code: " + generated;
            var toEmail = isAgency ? _agencyRepository.GetByUsername(username).Email : username;
            _emailSender.SendEmailToUser(toEmail, "Verification Code", body);

            var newCode = new CodeAuthorization
            {
                Code = generated,
                Email = toEmail,
                ExpirationDate = DateTime.Now.AddMinutes(5)
            };

            return _codeRepository.Add(newCode);
        }

        public bool UpdateCode(Guid codeId, string username, string? code, bool isAgency = true)
        {
            var toEmail = isAgency ? _agencyRepository.GetByUsername(username).Email : username;
            var data = _codeRepository.GetWithIdAndEmail(codeId, toEmail);
            var expectedCode = data.Code;
            if (code == data.Code && !data.IsUsed)
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
