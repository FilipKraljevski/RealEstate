using Domain.Enum;
using Domain.Model;
using Repository.Interface;

namespace Repository.Implementation
{
    public class AgencyRepository : Repository<Agency>, IAgencyRepository
    {
        public AgencyRepository(RealEstateDbContext realEstateDbContext) : base(realEstateDbContext)
        {
        }

        public IEnumerable<Agency> GetByCountry(Country country)
        {
            return entities.Where(e => e.Country == country);
        }

        public Agency GetByEmail(string email)
        {
            return entities.Where(e => e.Email == email).SingleOrDefault();
        }
    }
}
