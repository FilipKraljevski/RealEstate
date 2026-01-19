using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Repository.Interface;

namespace Repository.Implementation
{
    public class EstateRepository : Repository<Estate>, IEstateRepository
    {
        public EstateRepository(RealEstateDbContext realEstateDbContext) : base(realEstateDbContext)
        {
        }

        public new Estate Get(Guid id)
        {
            return entities.Where(e => e.Id == id)
                .Include(x => x.Agency)
                .Include(x => x.City)
                .Include(x => x.AdditionalEstateInfo)
                .Include(x => x.Images)
                .FirstOrDefault();
        }

        public new IQueryable<Estate> GetAsQueryable()
        {
            return entities
                .Include(x => x.Agency)
                .Include(x => x.City)
                .Include(x => x.AdditionalEstateInfo)
                .Include(x => x.Images);
        }
    }
}
