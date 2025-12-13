using Domain.Enum;
using Domain.Model;
using Microsoft.AspNetCore.Identity;

namespace Test.Builder
{
    public class AgencyBuilder
    {
        private Guid id = Guid.NewGuid();
        private string name = "Gramada Agency";
        private string description = "Best agency in the world";
        private Country country = Country.Macedonia;
        private string email = "gramada@mail.com";
        private string username = "username123";
        private string password = "password";
        private Guid profilePictureId = Guid.NewGuid();
        private ICollection<Estate> estates = new List<Estate>(); 
        private ICollection<Telephone> telephones = new List<Telephone>();

        public AgencyBuilder()
        {
        }

        public AgencyBuilder WithId(Guid value)
        {
            id = value;
            return this;
        }
        public AgencyBuilder WithEstates(List<Estate> value)
        {
            estates = value;
            return this;
        }
        public AgencyBuilder WithTelephones(List<Telephone> value)
        {
            telephones = value;
            return this;
        }

        public Agency Build()
        {
            var passwordHasher = new PasswordHasher<Agency>();

            var agency =  new Agency
            {
                Id = id,
                Name = name,
                Description = description,
                Country = country,
                Email = email,
                Username = username,
                Password = password,
                ProfilePictureId = profilePictureId,
                Estates = estates,
                Telephones = telephones
            };

            agency.Password = passwordHasher.HashPassword(agency, password);

            return agency;
        }
    }
}
