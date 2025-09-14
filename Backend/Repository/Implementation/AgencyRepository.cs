using Domain.Model;
using Repository.Interface;

namespace Repository.Implementation
{
    public class AgencyRepository : Repository<Agency>, IAgencyRepository
    {
        public AgencyRepository(RealEstateDbContext realEstateDbContext) : base(realEstateDbContext)
        {
        }
    }
}
