using Domain.Enum;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
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

        public Agency GetByUsername(string username)
        {
            return entities.Where(e => e.Username == username).FirstOrDefault();
        }

        public new Agency Get(Guid id)
        {
            return entities.Where(e => e.Id == id)
                .Include(x => x.Telephones)
                .Include(x => x.Estates)
                .FirstOrDefault();
        }
    }
}
