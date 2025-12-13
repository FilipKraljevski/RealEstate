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

        public CodeAuthorization GenerateCode(string username)
        {
            var generated = GenerateSecureNumericCode();
            var agency = _agencyRepository.GetByUsername(username);
            string body = "The verification code: " + generated;
            _emailSender.SendEmailToUser(agency.Email, "Verification Code", body);

            var newCode = new CodeAuthorization
            {
                Code = generated,
                Email = agency.Email,
                ExpirationDate = DateTime.Now.AddMinutes(5)
            };

            return _codeRepository.Add(newCode);
        }

        public bool UpdateCode(Guid codeId, string username, string? code)
        {
            var agency = _agencyRepository.GetByUsername(username);
            var data = _codeRepository.GetWithIdAndEmail(codeId, agency.Email);
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
