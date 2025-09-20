using Domain.Model;
using Repository.Interface;

namespace Repository.Implementation
{
    public class EstateRepository : Repository<Estate>, IEstateRepository
    {
        public EstateRepository(RealEstateDbContext realEstateDbContext) : base(realEstateDbContext)
        {
        }
    }
}
