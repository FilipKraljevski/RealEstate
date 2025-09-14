using Domain.Enum;
using Domain.Model;
using Repository.Interface;

namespace Repository.Implementation
{
    public class CityRepository : Repository<City>, ICityRepository
    {
        public CityRepository(RealEstateDbContext realEstateDbContext) : base(realEstateDbContext)
        {
        }

        public IEnumerable<City> GetByCountry(Country country)
        {
            return entities.Where(c => c.Country == country);
        }
    }
}
