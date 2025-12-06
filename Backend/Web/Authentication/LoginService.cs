using Domain.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Repository.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Web.Authentication
{
    public class LoginService : ILoginService
    {
        private readonly IConfiguration configuration;
        private readonly IPasswordHasher<Agency> passwordHasher;
        private readonly IAgencyRepository agencyRepository;

        public LoginService(IConfiguration configuration, IPasswordHasher<Agency> passwordHasher, IAgencyRepository agencyRepository)
        {
            this.configuration = configuration;
            this.passwordHasher = passwordHasher;
            this.agencyRepository = agencyRepository;
        }

        public bool AreCredentialsValid(string email, string password)
        {
            var agency = agencyRepository.GetByEmail(email);
            if (agency == null) 
            {
                return false;
            }

            var isPasswordMatching = passwordHasher.VerifyHashedPassword(agency, agency.Password, password);

            if(isPasswordMatching != PasswordVerificationResult.Success)
            {
                return false;
            }

            return true;
        }

        public string GenerateToken(string email)
        {
            var agency = agencyRepository.GetByEmail(email);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, agency.Id.ToString()),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, agency.Roles.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.RsaSha256);

            var token = new JwtSecurityToken(issuer: configuration["Jwt:Issuer"], audience: configuration["Jwt:Audience"],
                claims: claims, expires: DateTime.Now.AddMinutes(15), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
